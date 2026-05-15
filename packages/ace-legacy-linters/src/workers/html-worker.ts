import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {HTMLHint} from 'htmlhint';
import {Ruleset} from "htmlhint/dist/core/types";

export class HtmlWorker extends Mirror {
    parser;

    defaultValidationOptions: Ruleset = {
        "attr-no-duplication": true,
        "body-no-duplicates": true,
        "head-body-descendents-html": true,
        "head-no-duplicates": true,
        "head-valid-children": true,
        "html-no-duplicates": true,
        "html-root-node": true,
        "html-valid-children": true,
        "html-valid-children-order": true,
        "img-src-required": true,
        "invalid-attribute-char": true,
        "nested-paragraphs": true,
        "spec-char-escape": true,
        "src-not-empty": true,
        "tag-pair": true
    }

    validationOptions: Ruleset;

    constructor(sender) {
        super(sender);

        this.setTimeout(500);

        this.parser = HTMLHint;
    }

    setOptions(options: {context?, validationOptions: Ruleset}) {
        if (options && options.context) { //legacy options
            delete options.context;
        }

        this.validationOptions = options.validationOptions;
    };

    onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        try {
            let options = this.validationOptions ?? this.defaultValidationOptions;
            errors = this.parser.verify(value, options).map(el => {
                return {
                    row: el.line - 1,
                    column: el.col - 1,
                    text: el.message,
                    type: el.type === "error" ? "error" : el.type === "warning" ? "warning" : "info",
                };

            })
        } catch(e) {
            console.error(e);
        }
        this.sender.emit("error", errors);
    }
}