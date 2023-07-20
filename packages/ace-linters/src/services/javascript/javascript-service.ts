import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import {Linter} from "./lib";
import {toDiagnostics} from "./eslint-converters";
import {JavascriptServiceOptions, LanguageService} from "../../types/language-service";

export class JavascriptService extends BaseService<JavascriptServiceOptions> implements LanguageService {
    $service;
    $defaultEnv = {
        browser: true,
        amd: true,
        builtin: true,
        node: true,
        jasmine: false,
        mocha: true,
        es6: true,
        jquery: false,
        meteor: false,
    };

    $defaultParserOptions = {
        ecmaFeatures: {
            globalReturn: true, // allow return statements in the global scope
            jsx: true, // enable JSX
            experimentalObjectRestSpread: true,
        },
        allowImportExportEverywhere: true,
        allowAwaitOutsideFunction: true,
        ecmaVersion: 12
    };

    $defaultRules = {
        "handle-callback-err": 1,
        "no-debugger": 3,
        "no-undef": 1,
        "no-inner-declarations": [1, "functions"],
        "no-native-reassign": 1,
        "no-new-func": 1,
        "no-new-wrappers": 1,
        "no-cond-assign": [1, "except-parens"],
        "no-dupe-keys": 3,
        "no-eval": 1,
        "no-func-assign": 1,
        "no-extra-semi": 3,
        "no-invalid-regexp": 1,
        "no-irregular-whitespace": 3,
        "no-negated-in-lhs": 1,
        "no-regex-spaces": 3,
        "quote-props": 0,
        "no-unreachable": 1,
        "use-isnan": 2,
        "valid-typeof": 1,
        "no-redeclare": 3,
        "no-with": 1,
        "radix": 3,
        "no-delete-var": 2,
        "no-label-var": 3,
        "no-console": 0,
        "no-shadow-restricted-names": 2,
        "no-new-require": 2
    };

    constructor(mode: string) {
        super(mode);
        this.$service = new Linter();
    }

    get config() {
        var config = {
            rules: this.globalOptions.rules ?? this.$defaultRules,
            env: this.globalOptions.env ?? this.$defaultEnv,
            globals: this.globalOptions.globals ?? {},
            parserOptions: this.globalOptions.parserOptions ?? this.$defaultParserOptions
        };
        if (config.parserOptions.ecmaVersion == null) config.parserOptions.ecmaVersion = 8;
        if (config.parserOptions.ecmaFeatures == null)
            config.parserOptions.ecmaFeatures = this.$defaultParserOptions.ecmaFeatures;
        if (config.parserOptions.ecmaFeatures.experimentalObjectRestSpread == null)
            config.parserOptions.ecmaFeatures.experimentalObjectRestSpread = true;

        return config;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value)
            return [];

        try {
            var messages = this.$service.verify(value, this.config);
        } catch (e) {
            console.error(e.stack);
            return [];
        }
        return toDiagnostics(messages, this.optionsToFilterDiagnostics);
    }

}
