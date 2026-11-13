import "ace-code/src/test/mockdom";
import {expect} from "chai";
import {MessageChannel, MessagePort} from "node:worker_threads";
import * as lsp from "vscode-languageserver-protocol";
import {BrowserMessageReader, BrowserMessageWriter, createProtocolConnection} from "vscode-languageserver-protocol/browser";
import {LanguageClient} from "./language-client";
import {LanguageProvider} from "../language-provider";
import {ServiceManager} from "./service-manager";
import {MockWorker} from "../misc/mock-worker";
import {LanguageClientConfig} from "../types/language-service";

function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>(done => resolve = done);
    return {promise, resolve};
}

describe('LSP workspace compatibility', () => {
    const disposables: (() => void | Promise<void>)[] = [];

    afterEach(async () => {
        for (const dispose of disposables.splice(0).reverse()) {
            await dispose();
        }
    });

    function createServer(capabilities: lsp.ServerCapabilities = {}, initialization?: Promise<void>) {
        const {port1, port2} = new MessageChannel();
        // Use Node's message events: Ace's mock DOM replaces the global Event class.
        function asWorker(port: MessagePort) {
            const worker = new MockWorker();
            worker.postMessage = data => port.postMessage(data);
            port.on('message', data => worker.onmessage({data}));
            return worker;
        }
        const messages: any[] = [];
        port1.on('message', data => messages.push(data));
        const serverWorker = asWorker(port1);
        const clientWorker = asWorker(port2);
        const server = createProtocolConnection(
            new BrowserMessageReader(serverWorker),
            new BrowserMessageWriter(serverWorker)
        );
        const initializeParams: lsp.InitializeParams[] = [];
        server.onRequest('initialize', async (params: lsp.InitializeParams) => {
            initializeParams.push(params);
            await initialization;
            return {capabilities};
        });
        server.onRequest('test/barrier', () => null);
        server.listen();
        disposables.push(() => {
            server.dispose();
            port1.close();
            port2.close();
        });
        function nextMessage(method: string) {
            return new Promise<any>(resolve => {
                const listener = (message: any) => {
                    if (message.method === method) {
                        port1.off('message', listener);
                        resolve(message);
                    }
                };
                port1.on('message', listener);
            });
        }
        const config: LanguageClientConfig = {
            type: 'webworker',
            worker: clientWorker,
            modes: 'text',
            module: () => ({LanguageClient})
        };
        return {server, config, messages, initializeParams, nextMessage};
    }

    function connect(workspaceUri?: string, capabilities: lsp.ServerCapabilities = {}, initialization?: Promise<void>) {
        const harness = createServer(capabilities, initialization);
        const ready = harness.nextMessage('initialized');
        const client = new LanguageClient(harness.config, {postMessage() {}}, workspaceUri);
        disposables.push(() => client.dispose());
        return {...harness, client, ready};
    }

    const folderCapabilities = {
        workspace: {workspaceFolders: {supported: true, changeNotifications: true}}
    };

    it('sends matching legacy and modern roots, decoding names and filesystem paths', async () => {
        const harness = connect('file:///workspace/my%20project/');
        await harness.ready;
        const params = harness.initializeParams[0];
        expect(params.rootUri).to.equal('file:///workspace/my%20project/');
        expect(params.rootPath!.replace(/\\/g, '/')).to.equal('/workspace/my project/');
        expect(params.workspaceFolders).to.deep.equal([
            {uri: params.rootUri, name: 'my project'}
        ]);
        expect(params.capabilities.workspace?.workspaceFolders).to.equal(true);
    });

    it('sends null roots and answers folder requests when no workspace is open', async () => {
        const harness = connect();
        await harness.ready;
        expect(harness.initializeParams[0]).to.include({rootUri: null, rootPath: null, workspaceFolders: null});
        expect(await harness.server.sendRequest('workspace/workspaceFolders')).to.equal(null);
    });

    it('keeps non-file roots as URIs without inventing a filesystem path', async () => {
        const harness = connect('vscode-remote://host/workspace/project');
        await harness.ready;
        expect(harness.initializeParams[0]).to.include({
            rootUri: 'vscode-remote://host/workspace/project', rootPath: null
        });
    });

    it('sends folder replacement as a notification with the old folder removed', async () => {
        const harness = connect('file:///workspace/old', folderCapabilities);
        await harness.ready;
        const changed = harness.nextMessage('workspace/didChangeWorkspaceFolders');
        harness.client.setWorkspace('file:///workspace/new');
        const message = await changed;
        expect(message).not.to.have.property('id');
        expect(message.params).to.deep.equal({event: {
            added: [{uri: 'file:///workspace/new', name: 'new'}],
            removed: [{uri: 'file:///workspace/old', name: 'old'}]
        }});
        expect(await harness.server.sendRequest('workspace/workspaceFolders')).to.deep.equal([
            {uri: 'file:///workspace/new', name: 'new'}
        ]);
        harness.client.setWorkspace('file:///workspace/new');
        await harness.client.sendRequest('test/barrier');
        expect(harness.messages.filter(message => message.method === 'workspace/didChangeWorkspaceFolders')).to.have.length(1);
    });

    it('adds the first folder without reporting a removed folder', async () => {
        const harness = connect(undefined, folderCapabilities);
        await harness.ready;
        const changed = harness.nextMessage('workspace/didChangeWorkspaceFolders');
        harness.client.setWorkspace('file:///workspace/project');
        expect((await changed).params.event).to.deep.equal({
            added: [{uri: 'file:///workspace/project', name: 'project'}], removed: []
        });
    });

    it('honors string notification registrations and their removal', async () => {
        const harness = connect('file:///workspace/old', {
            workspace: {workspaceFolders: {supported: true, changeNotifications: 'folders'}}
        });
        await harness.ready;
        const changed = harness.nextMessage('workspace/didChangeWorkspaceFolders');
        harness.client.setWorkspace('file:///workspace/new');
        await changed;
        await harness.server.sendRequest('client/unregisterCapability', {
            unregisterations: [{id: 'folders', method: 'workspace/didChangeWorkspaceFolders'}]
        });
        const reinitialized = harness.nextMessage('initialized');
        harness.client.setWorkspace('file:///workspace/last');
        await reinitialized;
        expect(harness.initializeParams[1].rootUri).to.equal('file:///workspace/last');
    });

    it('supports dynamic registration and unregistration for folder changes', async () => {
        const harness = connect('file:///workspace/old');
        await harness.ready;
        await harness.server.sendRequest('client/registerCapability', {
            registrations: [{id: 'folders', method: 'workspace/didChangeWorkspaceFolders'}]
        });
        const changed = harness.nextMessage('workspace/didChangeWorkspaceFolders');
        harness.client.setWorkspace('file:///workspace/new');
        await changed;
        expect(harness.initializeParams).to.have.length(1);
        await harness.server.sendRequest('client/unregisterCapability', {
            unregisterations: [{id: 'folders', method: 'workspace/didChangeWorkspaceFolders'}]
        });
        const reinitialized = harness.nextMessage('initialized');
        harness.client.setWorkspace('file:///workspace/last');
        await reinitialized;
        expect(harness.initializeParams[1].rootUri).to.equal('file:///workspace/last');
    });

    it('coalesces folder changes during initialization and opens documents after initialized', async () => {
        const initialization = deferred<void>();
        const harness = connect('file:///workspace/old', folderCapabilities, initialization.promise);
        harness.client.setWorkspace('file:///workspace/intermediate');
        harness.client.setWorkspace('file:///workspace/new');
        harness.client.addDocument({uri: 'file:///workspace/new/test.txt', languageId: 'text', version: 1, text: 'test'});
        harness.client.setValue({uri: 'file:///workspace/new/test.txt', version: 2}, 'updated');
        harness.client.applyDeltas({uri: 'file:///workspace/new/test.txt', version: 3}, [{
            range: {start: {line: 0, character: 7}, end: {line: 0, character: 7}}, text: '!'
        }]);
        const changed = harness.nextMessage('workspace/didChangeWorkspaceFolders');
        const opened = harness.nextMessage('textDocument/didOpen');
        initialization.resolve();
        expect((await changed).params.event).to.deep.equal({
            added: [{uri: 'file:///workspace/new', name: 'new'}],
            removed: [{uri: 'file:///workspace/old', name: 'old'}]
        });
        expect((await opened).params.textDocument).to.include({text: 'updated!', version: 3});
        const methods = harness.messages.map(message => message.method);
        expect(methods.indexOf('textDocument/didOpen')).to.be.greaterThan(methods.indexOf('initialized'));
        expect(methods.filter(method => method === 'workspace/didChangeWorkspaceFolders')).to.have.length(1);
        expect(methods).not.to.include('textDocument/didChange');
    });

    it('preserves documents and options through the legacy reconnect fallback', async () => {
        const harness = connect('file:///workspace/old');
        await harness.ready;
        const document = {uri: 'file:///workspace/old/test.txt', languageId: 'text', version: 1, text: 'test'};
        const opened = harness.nextMessage('textDocument/didOpen');
        harness.client.addDocument(document);
        harness.client.setOptions(document.uri, {customOption: true});
        await opened;
        const reinitialized = harness.nextMessage('initialized');
        const reopened = harness.nextMessage('textDocument/didOpen');
        harness.client.setWorkspace('file:///workspace/new');
        await reinitialized;
        expect((await reopened).params.textDocument).to.deep.equal(document);
        expect(harness.initializeParams[1].rootUri).to.equal('file:///workspace/new');
        expect(harness.client.getDocument(document.uri).getText()).to.equal('test');
        expect(harness.client.options[document.uri]).to.deep.equal({customOption: true});
    });

    it('does not send duplicate opens when a queued workspace change reconnects', async () => {
        const initialization = deferred<void>();
        const harness = connect('file:///workspace/old', {}, initialization.promise);
        harness.client.setWorkspace('file:///workspace/new');
        harness.client.addDocument({uri: 'file:///workspace/new/test.txt', languageId: 'text', version: 1, text: 'test'});
        const opened = harness.nextMessage('textDocument/didOpen');
        initialization.resolve();
        await opened;
        await harness.client.sendRequest('test/barrier');
        expect(harness.initializeParams).to.have.length(2);
        expect(harness.messages.filter(message => message.method === 'textDocument/didOpen')).to.have.length(1);
        const methods = harness.messages.map(message => message.method);
        expect(methods.indexOf('textDocument/didOpen')).to.be.greaterThan(methods.lastIndexOf('initialized'));
    });

    it('forwards workspacePath from the provider into the first server initialization', async () => {
        const harness = createServer();
        const clientWorker = new MockWorker(true);
        const managerWorker = new MockWorker(true);
        clientWorker.setEmitter(managerWorker);
        managerWorker.setEmitter(clientWorker);
        disposables.push(() => {
            clientWorker.removeAllListeners();
            managerWorker.removeAllListeners();
        });
        const manager = new ServiceManager(managerWorker);
        manager.registerServer('test', harness.config);
        const provider = LanguageProvider.create(clientWorker, {workspacePath: '/workspace/project'});
        const initialized = harness.nextMessage('initialized');
        await manager.addDocument({uri: 'file:///workspace/project/test.txt', version: 1}, 'test', 'ace/mode/text');
        disposables.push(() => manager.$services.test.serviceInstance!.dispose());
        await initialized;
        expect(harness.initializeParams[0].rootUri).to.equal('file:///workspace/project');
        expect(manager.workspaceUri).to.equal(provider.workspaceUri);
        // Equivalent paths must not trigger a second workspace update.
        let updates = 0;
        managerWorker.on('message', () => updates++);
        provider.changeWorkspaceFolder('/workspace/project');
        expect(updates).to.equal(0);
    });
});
