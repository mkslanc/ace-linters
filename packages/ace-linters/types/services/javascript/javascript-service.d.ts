import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { JavascriptServiceOptions, LanguageService } from "../../types/language-service";
export declare class JavascriptService extends BaseService<JavascriptServiceOptions> implements LanguageService {
    $service: any;
    $defaultEnv: {
        browser: boolean;
        amd: boolean;
        builtin: boolean;
        node: boolean;
        jasmine: boolean;
        mocha: boolean;
        es6: boolean;
        jquery: boolean;
        meteor: boolean;
    };
    $defaultParserOptions: {
        ecmaFeatures: {
            globalReturn: boolean;
            jsx: boolean;
            experimentalObjectRestSpread: boolean;
        };
        allowImportExportEverywhere: boolean;
        allowAwaitOutsideFunction: boolean;
        ecmaVersion: number;
    };
    $defaultRules: {
        "handle-callback-err": number;
        "no-debugger": number;
        "no-undef": number;
        "no-inner-declarations": (string | number)[];
        "no-native-reassign": number;
        "no-new-func": number;
        "no-new-wrappers": number;
        "no-cond-assign": (string | number)[];
        "no-dupe-keys": number;
        "no-eval": number;
        "no-func-assign": number;
        "no-extra-semi": number;
        "no-invalid-regexp": number;
        "no-irregular-whitespace": number;
        "no-negated-in-lhs": number;
        "no-regex-spaces": number;
        "quote-props": number;
        "no-unreachable": number;
        "use-isnan": number;
        "valid-typeof": number;
        "no-redeclare": number;
        "no-with": number;
        radix: number;
        "no-delete-var": number;
        "no-label-var": number;
        "no-console": number;
        "no-shadow-restricted-names": number;
        "no-new-require": number;
    };
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
    get config(): {
        rules: {
            [rule: string]: any;
        } | {
            "handle-callback-err": number;
            "no-debugger": number;
            "no-undef": number;
            "no-inner-declarations": (string | number)[];
            "no-native-reassign": number;
            "no-new-func": number;
            "no-new-wrappers": number;
            "no-cond-assign": (string | number)[];
            "no-dupe-keys": number;
            "no-eval": number;
            "no-func-assign": number;
            "no-extra-semi": number;
            "no-invalid-regexp": number;
            "no-irregular-whitespace": number;
            "no-negated-in-lhs": number;
            "no-regex-spaces": number;
            "quote-props": number;
            "no-unreachable": number;
            "use-isnan": number;
            "valid-typeof": number;
            "no-redeclare": number;
            "no-with": number;
            radix: number;
            "no-delete-var": number;
            "no-label-var": number;
            "no-console": number;
            "no-shadow-restricted-names": number;
            "no-new-require": number;
        };
        env: {
            [name: string]: boolean;
        } | {
            browser: boolean;
            amd: boolean;
            builtin: boolean;
            node: boolean;
            jasmine: boolean;
            mocha: boolean;
            es6: boolean;
            jquery: boolean;
            meteor: boolean;
        };
        globals: {
            [name: string]: boolean | "off" | "readonly" | "readable" | "writable" | "writeable";
        };
        parserOptions: {
            [option: string]: any;
        } | {
            ecmaFeatures: {
                globalReturn: boolean;
                jsx: boolean;
                experimentalObjectRestSpread: boolean;
            };
            allowImportExportEverywhere: boolean;
            allowAwaitOutsideFunction: boolean;
            ecmaVersion: number;
        };
    };
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
