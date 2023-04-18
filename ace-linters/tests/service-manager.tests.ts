import {expect} from "chai";
import {MockWorker} from "./mock-worker";
import {ServiceManager} from "../services/service-manager";
import {BaseService} from "../services/base-service";

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
            module: () => import("../services/css/css-service"),
            className: "CssService",
            modes: "css"
        };

        manager.registerService("css", cssService);

        expect(manager["$services"]["css"]).contains(cssService);
    });

    describe('initialisation of service', () => {
        it('should correctly initialise service', async () => {
            await manager["$getServiceInstanceByMode"]("css");
            expect(manager["$services"]["css"].serviceInstance).instanceOf(BaseService);
        });
        it('should not init non registered service', async () => {
            await manager["$getServiceInstanceByMode"]("php");
            expect(manager["$services"]).not.haveOwnProperty("php");
        });
    });

    describe('addDocument', () => {

        it('should correctly add document', async () => {
            await manager.addDocument(doc, doc.value, "ace/mode/css");
            expect(manager["$sessionIDToMode"][doc.uri]).equal("css");
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri).getText()).equal(doc.value);
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
        it('should remove document from one service and add to another', async () => {
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri)).exist;

            const jsonService = {
                module: () => import("../services/json/json-service"),
                className: "JsonService",
                modes: "json"
            };
            manager.registerService("json", jsonService);

            await manager.changeDocumentMode(doc, doc.value, "ace/mode/json", {});
            expect(manager["$services"]["css"].serviceInstance.getDocument(doc.uri)).not.exist;
            expect(manager["$services"]["json"].serviceInstance.getDocument(doc.uri)).exist;
        });
    });

});
