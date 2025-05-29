import {expect} from "chai";
import {MockWorker} from "../../src/misc/mock-worker";
import {ServiceManager} from "../../src/services/service-manager";
import {BaseService} from "../../src/services/base-service";

describe('ServiceManager tests', () => {
    let manager: ServiceManager;
    let doc = {
        uri: "css.textDocument",
        version: 0,
        value: "body {padding: 0}"
    }
    let secondDoc = {
        uri: "some.textDocument",
        version: 0,
        value: "body {padding: 0}"
    }

    before(() => {
        let ctx = new MockWorker();
        manager = new ServiceManager(ctx);

        const cssService = {
            features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
            module: () => import("../../src/services/css/css-service"),
            className: "CssService",
            modes: "css"
        };
        const htmlService = {
            features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
            module: () => import("../../src/services/html/html-service"),
            className: "HtmlService",
            modes: "css"
        };

        manager.registerService("css", cssService);
        manager.registerService("html", htmlService);

        expect(manager["$services"]["css"]).contains(cssService);
        expect(manager["$services"]["html"]).contains(htmlService);
    });

    describe('initialisation of service', () => {
        it('should correctly initialise service', async () => {
            await manager["$getServicesInstancesByMode"]("css");
            expect(manager["$services"]["css"].serviceInstance).instanceOf(BaseService);
        });
        it('should not init non registered service', async () => {
            await manager["$getServicesInstancesByMode"]("php");
            expect(manager["$services"]).not.haveOwnProperty("php");
        });
    });

    describe('addDocument', () => {

        it('should correctly add document to all linked services', async () => {
            await manager.addDocument(doc, doc.value, "ace/mode/css");
            expect(manager["$sessionIDToMode"][doc.uri]).equal("css");
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri).getText()).equal(doc.value);
            expect(manager["$services"]["html"].serviceInstance.getDocument(doc.uri).getText()).equal(doc.value);
        });

        it('should not add document with wrong mode', async () => {
            await manager.addDocument(secondDoc, secondDoc.value, "something");
            expect(manager["$sessionIDToMode"][secondDoc.uri]).undefined;
        });

        it('should not add document with missing service', async () => {
            await manager.addDocument(secondDoc, secondDoc.value, "ace/mode/php");
            expect(manager["$sessionIDToMode"][secondDoc.uri]).undefined;
        });
    });

    describe('changeDocumentMode', () => {
        it('should remove document from linked services and add to another', async () => {
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri)).exist;
            expect(manager["$services"]["html"].serviceInstance.getDocument(doc.uri)).exist;

            const jsonService = {
                features: {completion: true, completionResolve: true, diagnostics: true, format: true, hover: true},
                module: () => import("../../src/services/json/json-service"),
                className: "JsonService",
                modes: "json"
            };
            manager.registerService("json", jsonService);

            await manager.changeDocumentMode(doc, doc.value, "ace/mode/json", {});
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri)).not.exist;
            expect(manager["$services"]["html"].serviceInstance.getDocument(doc.uri)).not.exist;
            expect(manager["$services"]["json"].serviceInstance.getDocument(doc.uri)).exist;
        });
    });


    describe('set features state', () => {
        it('should enable all default features', () => {
            const expectedFeatures = {
                codeAction: true,
                hover: true,
                inlineCompletion: true,
                completion: true,
                completionResolve: true,
                format: true,
                diagnostics: true,
                documentHighlight: true,
                executeCommand: true,
                signatureHelp: true,
                semanticTokens: true,
            };
            
            manager.configureFeatures("css");
            let features = manager.$services["css"].features;
            expect(features).deep.equal(expectedFeatures);
        });

        it('should set specific features', () => {
            const featuresToSet = {
                hover: false,
                completion: false,
                completionResolve: true,
                format: true,
                diagnostics: true
            };
            manager.configureFeatures("css", featuresToSet);
            let features = manager.$services["css"].features;
            expect(features).deep.equal(featuresToSet);
        });
    });

});
