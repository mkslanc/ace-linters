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
    HoverRequest,
    HoverParams,
    InitializeRequest,
    InitializeResult,
    TextDocumentSyncKind,
    CompletionItem,
    DidOpenTextDocumentParams,
    DidChangeTextDocumentParams,
    CompletionParams,
    DocumentRangeFormattingRequest,
    DocumentRangeFormattingParams,
    PublishDiagnosticsNotification,
    Diagnostic,
    TextDocument
} from "vscode-languageserver-protocol";
import {JsonService} from "ace-linters/json-service";

const worker: Worker = self as any;
const conn = createProtocolConnection(
    new BrowserMessageReader(worker),
    new BrowserMessageWriter(worker)
);

let jsonService = new JsonService("json");
conn.onRequest(InitializeRequest.type, (_params): InitializeResult => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
            },
            hoverProvider: true,
        },
    };
});
conn.onNotification(
    DidOpenTextDocumentNotification.type,
    (params: DidOpenTextDocumentParams) => {
        jsonService.addDocument(params.textDocument);
        doValidation(params.textDocument);
    }
);
conn.onNotification(
    DidChangeTextDocumentNotification.type,
    (params: DidChangeTextDocumentParams) => {
        jsonService.applyDeltas(params.textDocument, params.contentChanges);
        doValidation(params.textDocument);
    }
);
conn.onRequest(CompletionRequest.type, async (params: CompletionParams) => {
    return jsonService.doComplete(
        params.textDocument, params.position
    );
});
conn.onRequest(HoverRequest.type, async (params: HoverParams) => {
    return jsonService.doHover(params.textDocument, params.position);
});
conn.onRequest(CompletionResolveRequest.type, async (item: CompletionItem) => {
    return jsonService.doResolve(item);
});
conn.onRequest(DocumentRangeFormattingRequest.type, async (params: DocumentRangeFormattingParams) => {
    return jsonService.format(params.textDocument, params.range, params.options);
});

conn.listen();

async function doValidation(document) {
    let diagnostics = await jsonService.doValidation(document);
    sendDiagnostics(document, diagnostics);
}

function sendDiagnostics(document: TextDocument, diagnostics: Diagnostic[]): void {
    conn.sendNotification(PublishDiagnosticsNotification.type, {
        uri: document.uri, diagnostics
    })
}
