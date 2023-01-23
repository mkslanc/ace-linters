import {
    createProtocolConnection,
    BrowserMessageReader,
    BrowserMessageWriter,
} from "vscode-languageserver-protocol/browser";
import {
    CompletionRequest,
    CompletionResolveRequest,
    DidChangeTextDocumentNotification,
    DidOpenTextDocumentNotification,
    InitializeRequest,
    InitializeResult,
    TextDocumentSyncKind,
    CompletionItem,
    DidOpenTextDocumentParams,
    DidChangeTextDocumentParams,
    CompletionParams,
    PublishDiagnosticsNotification,
    Diagnostic,
    TextDocument
} from "vscode-languageserver-protocol";
import {RustService} from "./rust-service/rust_service";

const worker: Worker = self as any;
const conn = createProtocolConnection(
    new BrowserMessageReader(worker),
    new BrowserMessageWriter(worker)
);

let rustService = new RustService("rust");

conn.onRequest(InitializeRequest.type, (_params): InitializeResult => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
            },
            hoverProvider: false,
            documentFormattingProvider: false,
            documentRangeFormattingProvider: false
        },
    };
});

conn.onNotification(
    DidOpenTextDocumentNotification.type,
    async (params: DidOpenTextDocumentParams) => {
        await rustService.init(params.textDocument.text);
        rustService.addDocument(params.textDocument);
        doValidation(params.textDocument);
    }
);

conn.onNotification(
    DidChangeTextDocumentNotification.type,
    (params: DidChangeTextDocumentParams) => {
        rustService.applyDeltas(params.textDocument, params.contentChanges);
        doValidation(params.textDocument);
    }
);

conn.onRequest(CompletionRequest.type, async (params: CompletionParams) => {
    return rustService.doComplete(
        params.textDocument, params.position
    );
});

conn.onRequest(CompletionResolveRequest.type, async (item: CompletionItem) => {
    return rustService.doResolve(item);
});

async function doValidation(document) {
    let diagnostics = await rustService.doValidation(document);
    sendDiagnostics(document, diagnostics);
}

function sendDiagnostics(document: TextDocument, diagnostics: Diagnostic[]): void {
    conn.sendNotification(PublishDiagnosticsNotification.type, {
        uri: document.uri, diagnostics
    })
}

conn.listen();
