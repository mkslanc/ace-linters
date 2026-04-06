import {parse, ParseError} from "@babel/parser";
import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {JsOptions, ScopesAnalyzer} from "./eslint-rules/scopes-analyzer";

export class JavaScriptWorker extends Mirror {
    options: JsOptions;
    analyzer: ScopesAnalyzer

    constructor(sender) {
        super(sender);
        this.setTimeout(500);
        this.setOptions();
        this.analyzer = new ScopesAnalyzer(this.options);
    }

    setOptions(options?: JsOptions) {
        this.options = options || {
            "no-unused-vars": true,
            "no-undef": true,
            sourceType: "unambiguous",
            jsx: true
        };
        if (this.analyzer) {
            this.analyzer.setOptions(this.options);
        }
    }

    onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];
        let ast;
        try {
            var plugins = ["estree"]
            if (this.options.jsx) {
                plugins.push("jsx");
            }
            ast = parse(value, {
                sourceType: this.options.sourceType,
                errorRecovery: true,
                plugins: plugins as any,
                ranges: true,
                strictMode: true,
                allowReturnOutsideFunction: true,
            });

            errors = ast.errors?.map(err => ({
                row: err.loc.line - 1,
                column: err.loc.column,
                text: err.message,
                type: "error",
            }));
        } catch (e) {
            if ((e as ParseError) instanceof SyntaxError) {
                var syntaxError: Ace.Annotation = {
                    row: e.loc.line - 1,
                    column: e.loc.column,
                    text: e.message,
                    type: "error",
                };
                errors.push(syntaxError);
            } else {
                console.error(e);
            }
        }

        try {
            if (ast && ast.program) {
                const result = this.analyzer.analyze(ast.program);
                errors = [...errors, ...result];
            }
        } catch (e) {
            console.warn(e);
        }
        this.sender.emit("annotate", errors);
    }
}