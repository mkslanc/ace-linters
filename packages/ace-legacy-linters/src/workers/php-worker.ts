import {Mirror} from "../mirror";

import {Engine} from "php-parser";

export class PhpWorker extends Mirror {
    parser: Engine;
    inlinePhp: boolean = false;

    constructor(sender) {
        super(sender);

        this.setTimeout(500);

        this.parser = new Engine({
            parser: {
                extractDoc: false,
                suppressErrors: true,
            },
            ast: {
                withPositions: false,
                withSource: false,
            },
            lexer: {
                all_tokens: false,
                comment_tokens: false,
                mode_eval: false,
                asp_tags: false,
                short_tags: true,
            },
        });
    }

    setOptions(opts) {
        this.inlinePhp = opts && opts.inline;
    }

    onUpdate() {
        var value = this.doc.getValue();
        var errors = [];

        try {
            let result;
            if (this.inlinePhp) {
                result = this.parser.parseEval(value);
            } else {
                result = this.parser.parseCode(value, "foo.php");
            }
            if (result && result.errors) {
                errors = result.errors.map((el) => {
                    return {
                        row: el.line - 1,
                        column: null,
                        text: el.message,
                        type: "error",
                    };
                });
            }
        } catch (e) {
            console.error(e);
        }

        this.sender.emit("annotate", errors);
    }
}