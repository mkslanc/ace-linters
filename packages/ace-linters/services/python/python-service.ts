import {BaseService} from "../base-service";
import {AceLinters} from "../../types";
import * as lsp from "vscode-languageserver-protocol";
import init, {
    check,
    defaultSettings,
} from "./pkg";
import {toDiagnostics} from "./python-converters";
import PythonServiceOptions = AceLinters.PythonServiceOptions;

export class PythonService extends BaseService<PythonServiceOptions> implements AceLinters.LanguageService {
    $service;
    initOutput;

    constructor(mode: string) {
        super(mode);
    }
    
    async init() {
        this.initOutput = await init();
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value)
            return [];
        if (!this.initOutput) {
            await init();
        }
        let options = this.getOption(document.uri, "configuration") ?? defaultSettings();
        let diagnostics = check(value, options);
        return toDiagnostics(diagnostics);
    }
}
