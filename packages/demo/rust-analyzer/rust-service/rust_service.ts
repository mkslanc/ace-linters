import init, {initThreadPool, WorldState} from './pkg';
// @ts-ignore
import fake_std from './fake_std.rs';
// @ts-ignore
import fake_core from './fake_core.rs';
// @ts-ignore
import fake_alloc from './fake_alloc.rs';
import {BaseService} from 'ace-linters/services/base-service';
import * as lsp from "vscode-languageserver-protocol";
import {AceLinters} from "ace-linters";
import {toCompletions, toDiagnostics, toHover} from "./type_converters/converters";

export class RustService extends BaseService implements AceLinters.LanguageService {
    $service: WorldState;

    constructor(mode: string) {
        super(mode);
    }

    async init(value: string) {
        await init();
        await initThreadPool(navigator.hardwareConcurrency)

        this.$service = new WorldState();
        this.$service.init(value, fake_std, fake_core, fake_alloc);
    }

    async doHover(identifier: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.Hover | null> {
        let document = this.getDocumentValue(identifier.uri);
        if (!document) {
            return;
        }
        await this.$service.update(document);
        let hover;
        try {
            hover = this.$service.hover(position.line, position.character);
        } catch (e) {
        }
        return toHover(hover);
    }

    async doValidation(identifier: lsp.TextDocumentIdentifier) {
        let document = this.getDocumentValue(identifier.uri)
        if (!document) {
            return [];
        }
        let res = await this.$service.update(document);

        return toDiagnostics(res.diagnostics);
    }

    async doComplete(identifier: lsp.TextDocumentIdentifier, position: lsp.Position): Promise<lsp.CompletionItem[] | lsp.CompletionList | null> {
        let document = this.getDocumentValue(identifier.uri)
        if (!document) {
            return null;
        }
        await this.$service.update(document);
        let completions = await this.$service.completions(position.line, position.character);
        return toCompletions(completions);
    }

    async doResolve(item: lsp.CompletionItem): Promise<lsp.CompletionItem> {
        return item;
    }
}
