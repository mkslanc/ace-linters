import {parse, ParseError} from "@babel/parser";
import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {JsOptions, ScopesAnalyzer} from "./eslint-rules/scopes-analyzer";
import globals from "globals";

const DEFAULT_OPTIONS: JsOptions = {
    "no-unused-vars": true,
    "no-undef": true,
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: {
        ecmaFeatures: {
            globalReturn: true,
            jsx: true,
            experimentalObjectRestSpread: true,
        },
        allowImportExportEverywhere: true,
        allowAwaitOutsideFunction: true,
    },
    globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.amd,
        ...globals.mocha,
        ...globals.es2015,
        ...globals.builtin,
    },
    jsx: true,
};

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
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
            parserOptions: {
                ...DEFAULT_OPTIONS.parserOptions,
                ...options?.parserOptions,
                ecmaFeatures: {
                    ...DEFAULT_OPTIONS.parserOptions?.ecmaFeatures,
                    ...options?.parserOptions?.ecmaFeatures,
                },
            },
            globals: {
                ...DEFAULT_OPTIONS.globals,
                ...options?.globals,
            },
            env: {
                ...options?.env,
            },
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
            if (this.options.jsx ?? this.options.parserOptions?.ecmaFeatures?.jsx) {
                plugins.push("jsx");
            }
            const parserOptions = {
                sourceType: this.options.sourceType,
                errorRecovery: true,
                plugins: plugins as any,
                ranges: true,
                strictMode: true,
            } as any;

            if (this.options.parserOptions?.allowImportExportEverywhere !== undefined) {
                parserOptions.allowImportExportEverywhere = this.options.parserOptions.allowImportExportEverywhere;
            }

            if (this.options.sourceType !== "commonjs"
                && this.options.parserOptions?.allowAwaitOutsideFunction !== undefined) {
                parserOptions.allowAwaitOutsideFunction = this.options.parserOptions.allowAwaitOutsideFunction;
            }

            if (this.options.sourceType !== "commonjs" && this.options.parserOptions?.ecmaFeatures?.globalReturn) {
                parserOptions.allowReturnOutsideFunction = true;
            }

            ast = parse(value, parserOptions);

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
