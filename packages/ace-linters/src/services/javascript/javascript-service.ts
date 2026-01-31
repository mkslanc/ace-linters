import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import {Linter} from "./lib";
import {toDiagnostics} from "./eslint-converters";
import {JavascriptServiceOptions, LanguageService} from "../../types/language-service";
import globals from "globals";
import {mergeObjects} from "../../utils";

export class JavascriptService extends BaseService<JavascriptServiceOptions> implements LanguageService {
  private $service;
  private config: JavascriptServiceOptions;

  $languageOptions: JavascriptServiceOptions['languageOptions'] = {
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
  };

  $rules: JavascriptServiceOptions['rules'] = {
    "handle-callback-err": 1,
    "no-debugger": 2,
    "no-undef": 1,
    "no-inner-declarations": [1, "functions"],
    "no-native-reassign": 1,
    "no-new-func": 1,
    "no-new-wrappers": 1,
    "no-cond-assign": [1, "except-parens"],
    "no-dupe-keys": 2,
    "no-eval": 1,
    "no-func-assign": 1,
    "no-extra-semi": 2,
    "no-invalid-regexp": 1,
    "no-irregular-whitespace": 2,
    "no-negated-in-lhs": 1,
    "no-regex-spaces": 2,
    "quote-props": 0,
    "no-unreachable": 1,
    "use-isnan": 2,
    "valid-typeof": 1,
    "no-redeclare": 2,
    "no-with": 1,
    "radix": 2,
    "no-delete-var": 2,
    "no-label-var": 2,
    "no-console": 0,
    "no-shadow-restricted-names": 2,
    "no-new-require": 2,
  };

  serviceCapabilities = {
    diagnosticProvider: {
      interFileDependencies: true,
      workspaceDiagnostics: true
    }
  }

  constructor(mode: string) {
    super(mode);
    this.$service = new Linter({
      configType: "flat",
    });
    this.initConfig();
  }

  initConfig() {
    this.config = {};
    const languageOptions = mergeObjects(this.globalOptions?.languageOptions, this.$languageOptions);
    const rules = mergeObjects(this.globalOptions?.rules, this.$rules);

    this.config.languageOptions = languageOptions;
    this.config.rules = rules;
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

  setGlobalOptions(options: JavascriptServiceOptions) {
    super.setGlobalOptions(options);
    this.initConfig();
  }

}
