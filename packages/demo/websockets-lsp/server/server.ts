import fs from "fs";
import {WebSocketServer} from 'ws';
import * as http from 'http';
import {fileURLToPath, URL} from 'url';
import * as net from 'net';
import express from 'express';
import * as rpc from 'vscode-ws-jsonrpc';
// @ts-ignore
import * as jsonServer from 'vscode-json-languageserver/out/jsonServer.js'
import requestLight from "request-light";
import vscodeUri from "vscode-uri";
import {createConnection} from 'vscode-languageserver/lib/node/main.js';
import path from 'path';

export function startLanguageServer(webSocket: rpc.IWebSocket) {
    const messageReader = new rpc.WebSocketMessageReader(webSocket);
    const messageWriter = new rpc.WebSocketMessageWriter(webSocket);
    const connection = createConnection(messageReader, messageWriter);
    jsonServer.startServer(connection, {
        file: getFileService(),
        http: getHTTPService(),
        configureHttpRequests: requestLight.configure
    });
}

function getHTTPService() {
    return {
        getContent(uri: any) {
            const headers = {'Accept-Encoding': 'gzip, deflate'};
            return requestLight.xhr({url: uri, followRedirects: 5, headers}).then(response => {
                return response.responseText;
            }, (error) => {
                return Promise.reject(error.responseText || requestLight.getErrorStatusDescription(error.status) || error.toString());
            });
        }
    };
}

function getFileService() {
    return {
        getContent(location: any) {
            return new Promise((resolve, reject) => {
                const uri = vscodeUri.URI.parse(location);
                fs.readFile(uri.fsPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    };
}

const serverFilePath = fileURLToPath(import.meta.url);
const serverDir = path.dirname(serverFilePath);

process.on('uncaughtException', (err: any) => {
    console.error('Uncaught Exception: ', err.toString());
    if (err.stack) {
        console.error(err.stack);
    }
});

const app = express();
app.use(express.static(serverDir));
const server = app.listen(3000);

const webSocketServer = new WebSocketServer({
    noServer: true,
    perMessageDeflate: false
});
server.on('upgrade', (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
    const baseURL = `http://${request.headers.host}/`;
    const pathname = request.url ? new URL(request.url, baseURL).pathname : undefined;
    if (pathname === '/exampleServer') {
        webSocketServer.handleUpgrade(request, socket, head, webSocket => {
            const socket: rpc.IWebSocket = {
                send: content => webSocket.send(content, error => {
                    if (error) {
                        throw error;
                    }
                }),
                onMessage: cb => webSocket.on('message', cb),
                onError: cb => webSocket.on('error', cb),
                onClose: cb => webSocket.on('close', cb),
                dispose: () => webSocket.close()
            };
            if (webSocket.readyState === webSocket.OPEN) {
                startLanguageServer(socket);
            } else {
                webSocket.on('open', () => startLanguageServer(socket));
            }
        });
    }
});

