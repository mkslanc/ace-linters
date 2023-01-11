import {BaseService} from "../base-service";
import * as lua from "luaparse";

export class LuaService extends BaseService {
    $service;

    constructor(mode: string) {
        super(mode);
        this.$service = lua;
    }

    $getDocument(sessionID: string) {
        let documentValue = this.getDocumentValue(sessionID);
        return documentValue;
    }

    async doValidation(sessionID: string) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let errors = [];
        try {
            this.$service.parse(document);
        } catch (e) {
            if (e instanceof this.$service.SyntaxError) {
                errors.push({
                    row: e.line - 1,
                    column: e.column,
                    text: e.message,
                    type: "error"
                });
            }
        }
        return errors;
    }

}