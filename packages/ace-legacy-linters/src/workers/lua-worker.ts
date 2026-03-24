import * as lua from "luaparse";
import {Mirror} from "../mirror";
import {Ace} from "ace-code";

export class LuaWorker extends Mirror {
    parser;

    constructor(sender) {
        super(sender);

        this.setTimeout(500);

        this.parser = lua;
    }

    onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        try {
            this.parser.parse(value);
        } catch(e) {
            if (e instanceof this.parser.SyntaxError) {
                errors.push({
                    row: e.line - 1,
                    column: e.column,
                    text: e.message,
                    type: "error"
                });
            }
        }
        this.sender.emit("annotate", errors);
    }
}