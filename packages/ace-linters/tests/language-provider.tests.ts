import ace from "ace-code";
import "ace-code/src/test/mockdom";
//@ts-ignore
window["self"] = {};

import {LanguageProvider} from "../language-provider";
import {Mode} from "ace-code/src/mode/json";
import {expect} from "chai";
import {MockWorker} from "./mock-worker";
import {ServiceManager} from "../services/service-manager";

describe('LanguageProvider tests', () => {
    let editorEl;
    let editor;
    let languageProvider: LanguageProvider;
    let client, ctx;

    before(() => {
        editorEl = document.createElement('div');
        editor = ace.edit(editorEl, {
            value: '{"property": "value"}',
            mode: new Mode()
        });

        client = new MockWorker();
        ctx = new MockWorker();
        client.setEmitter(ctx);
        ctx.setEmitter(client);

        let manager = new ServiceManager(ctx);
        manager.registerService("json", {
            module: () => import("../services/json/json-service"),
            className: "JsonService",
            modes: "json"
        });

        // @ts-ignore
        languageProvider = LanguageProvider.create(client);
        languageProvider.registerEditor(editor);
        expect(languageProvider['$editors']).contain(editor);
    });

    it('should set schema for json service', (done) => {
        setTimeout(() => {
            expect(editor.session.$annotations.length).to.equal(1);
            done()
        }, 1000);
        languageProvider.setOptions(editor.session, {schemaUri: "basicSchema.json"});
        languageProvider.setGlobalOptions("json", {
            schemas: [
                {
                    uri: "basicSchema.json",
                    schema:
                        `{
  "type": "object",
  "description": "basic json object",
  "properties": {
    "property": {
      "type": "string",
      "minLength": 8,
      "maxLength": 50
    }
  }
}`
                }
            ]
        })
    });

    it('should format', (done) => {
        setTimeout(() => {
            expect(editor.getValue()).to.equal("{\n" +
                "    \"property\": \"value\"\n" +
                "}");
            done()
        }, 100);
        languageProvider.format();
    });

    after(() => {
        client.removeAllListeners();
        ctx.removeAllListeners();
    });
});
