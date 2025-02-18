"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5678],{

/***/ 26087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(76439);

/***/ }),

/***/ 76439:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageConnection = exports.BrowserMessageWriter = exports.BrowserMessageReader = void 0;
const ril_1 = __webpack_require__(54615);
// Install the browser runtime abstract.
ril_1.default.install();
const api_1 = __webpack_require__(53281);
__exportStar(__webpack_require__(53281), exports);
class BrowserMessageReader extends api_1.AbstractMessageReader {
    constructor(port) {
        super();
        this._onData = new api_1.Emitter();
        this._messageListener = (event) => {
            this._onData.fire(event.data);
        };
        port.addEventListener('error', (event) => this.fireError(event));
        port.onmessage = this._messageListener;
    }
    listen(callback) {
        return this._onData.event(callback);
    }
}
exports.BrowserMessageReader = BrowserMessageReader;
class BrowserMessageWriter extends api_1.AbstractMessageWriter {
    constructor(port) {
        super();
        this.port = port;
        this.errorCount = 0;
        port.addEventListener('error', (event) => this.fireError(event));
    }
    write(msg) {
        try {
            this.port.postMessage(msg);
            return Promise.resolve();
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
    }
}
exports.BrowserMessageWriter = BrowserMessageWriter;
function createMessageConnection(reader, writer, logger, options) {
    if (logger === undefined) {
        logger = api_1.NullLogger;
    }
    if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return (0, api_1.createMessageConnection)(reader, writer, logger, options);
}
exports.createMessageConnection = createMessageConnection;


/***/ }),

/***/ 54615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __webpack_require__(53281);
class MessageBuffer extends api_1.AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        super(encoding);
        this.asciiDecoder = new TextDecoder('ascii');
    }
    emptyBuffer() {
        return MessageBuffer.emptyBuffer;
    }
    fromString(value, _encoding) {
        return (new TextEncoder()).encode(value);
    }
    toString(value, encoding) {
        if (encoding === 'ascii') {
            return this.asciiDecoder.decode(value);
        }
        else {
            return (new TextDecoder(encoding)).decode(value);
        }
    }
    asNative(buffer, length) {
        if (length === undefined) {
            return buffer;
        }
        else {
            return buffer.slice(0, length);
        }
    }
    allocNative(length) {
        return new Uint8Array(length);
    }
}
MessageBuffer.emptyBuffer = new Uint8Array(0);
class ReadableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
        this._onData = new api_1.Emitter();
        this._messageListener = (event) => {
            const blob = event.data;
            blob.arrayBuffer().then((buffer) => {
                this._onData.fire(new Uint8Array(buffer));
            }, () => {
                (0, api_1.RAL)().console.error(`Converting blob to array buffer failed.`);
            });
        };
        this.socket.addEventListener('message', this._messageListener);
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    onData(listener) {
        return this._onData.event(listener);
    }
}
class WritableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return api_1.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    write(data, encoding) {
        if (typeof data === 'string') {
            if (encoding !== undefined && encoding !== 'utf-8') {
                throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
            }
            this.socket.send(data);
        }
        else {
            this.socket.send(data);
        }
        return Promise.resolve();
    }
    end() {
        this.socket.close();
    }
}
const _textEncoder = new TextEncoder();
const _ril = Object.freeze({
    messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
    }),
    applicationJson: Object.freeze({
        encoder: Object.freeze({
            name: 'application/json',
            encode: (msg, options) => {
                if (options.charset !== 'utf-8') {
                    throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
                }
                return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, undefined, 0)));
            }
        }),
        decoder: Object.freeze({
            name: 'application/json',
            decode: (buffer, options) => {
                if (!(buffer instanceof Uint8Array)) {
                    throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
                }
                return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
            }
        })
    }),
    stream: Object.freeze({
        asReadableStream: (socket) => new ReadableStreamWrapper(socket),
        asWritableStream: (socket) => new WritableStreamWrapper(socket)
    }),
    console: console,
    timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
            const handle = setTimeout(callback, ms, ...args);
            return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
            const handle = setTimeout(callback, 0, ...args);
            return { dispose: () => clearTimeout(handle) };
        },
        setInterval(callback, ms, ...args) {
            const handle = setInterval(callback, ms, ...args);
            return { dispose: () => clearInterval(handle) };
        },
    })
});
function RIL() {
    return _ril;
}
(function (RIL) {
    function install() {
        api_1.RAL.install(_ril);
    }
    RIL.install = install;
})(RIL || (RIL = {}));
exports["default"] = RIL;


/***/ }),

/***/ 53281:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="../../typings/thenable.d.ts" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = void 0;
const messages_1 = __webpack_require__(96177);
Object.defineProperty(exports, "Message", ({ enumerable: true, get: function () { return messages_1.Message; } }));
Object.defineProperty(exports, "RequestType", ({ enumerable: true, get: function () { return messages_1.RequestType; } }));
Object.defineProperty(exports, "RequestType0", ({ enumerable: true, get: function () { return messages_1.RequestType0; } }));
Object.defineProperty(exports, "RequestType1", ({ enumerable: true, get: function () { return messages_1.RequestType1; } }));
Object.defineProperty(exports, "RequestType2", ({ enumerable: true, get: function () { return messages_1.RequestType2; } }));
Object.defineProperty(exports, "RequestType3", ({ enumerable: true, get: function () { return messages_1.RequestType3; } }));
Object.defineProperty(exports, "RequestType4", ({ enumerable: true, get: function () { return messages_1.RequestType4; } }));
Object.defineProperty(exports, "RequestType5", ({ enumerable: true, get: function () { return messages_1.RequestType5; } }));
Object.defineProperty(exports, "RequestType6", ({ enumerable: true, get: function () { return messages_1.RequestType6; } }));
Object.defineProperty(exports, "RequestType7", ({ enumerable: true, get: function () { return messages_1.RequestType7; } }));
Object.defineProperty(exports, "RequestType8", ({ enumerable: true, get: function () { return messages_1.RequestType8; } }));
Object.defineProperty(exports, "RequestType9", ({ enumerable: true, get: function () { return messages_1.RequestType9; } }));
Object.defineProperty(exports, "ResponseError", ({ enumerable: true, get: function () { return messages_1.ResponseError; } }));
Object.defineProperty(exports, "ErrorCodes", ({ enumerable: true, get: function () { return messages_1.ErrorCodes; } }));
Object.defineProperty(exports, "NotificationType", ({ enumerable: true, get: function () { return messages_1.NotificationType; } }));
Object.defineProperty(exports, "NotificationType0", ({ enumerable: true, get: function () { return messages_1.NotificationType0; } }));
Object.defineProperty(exports, "NotificationType1", ({ enumerable: true, get: function () { return messages_1.NotificationType1; } }));
Object.defineProperty(exports, "NotificationType2", ({ enumerable: true, get: function () { return messages_1.NotificationType2; } }));
Object.defineProperty(exports, "NotificationType3", ({ enumerable: true, get: function () { return messages_1.NotificationType3; } }));
Object.defineProperty(exports, "NotificationType4", ({ enumerable: true, get: function () { return messages_1.NotificationType4; } }));
Object.defineProperty(exports, "NotificationType5", ({ enumerable: true, get: function () { return messages_1.NotificationType5; } }));
Object.defineProperty(exports, "NotificationType6", ({ enumerable: true, get: function () { return messages_1.NotificationType6; } }));
Object.defineProperty(exports, "NotificationType7", ({ enumerable: true, get: function () { return messages_1.NotificationType7; } }));
Object.defineProperty(exports, "NotificationType8", ({ enumerable: true, get: function () { return messages_1.NotificationType8; } }));
Object.defineProperty(exports, "NotificationType9", ({ enumerable: true, get: function () { return messages_1.NotificationType9; } }));
Object.defineProperty(exports, "ParameterStructures", ({ enumerable: true, get: function () { return messages_1.ParameterStructures; } }));
const linkedMap_1 = __webpack_require__(93352);
Object.defineProperty(exports, "LinkedMap", ({ enumerable: true, get: function () { return linkedMap_1.LinkedMap; } }));
Object.defineProperty(exports, "LRUCache", ({ enumerable: true, get: function () { return linkedMap_1.LRUCache; } }));
Object.defineProperty(exports, "Touch", ({ enumerable: true, get: function () { return linkedMap_1.Touch; } }));
const disposable_1 = __webpack_require__(34019);
Object.defineProperty(exports, "Disposable", ({ enumerable: true, get: function () { return disposable_1.Disposable; } }));
const events_1 = __webpack_require__(62676);
Object.defineProperty(exports, "Event", ({ enumerable: true, get: function () { return events_1.Event; } }));
Object.defineProperty(exports, "Emitter", ({ enumerable: true, get: function () { return events_1.Emitter; } }));
const cancellation_1 = __webpack_require__(59850);
Object.defineProperty(exports, "CancellationTokenSource", ({ enumerable: true, get: function () { return cancellation_1.CancellationTokenSource; } }));
Object.defineProperty(exports, "CancellationToken", ({ enumerable: true, get: function () { return cancellation_1.CancellationToken; } }));
const sharedArrayCancellation_1 = __webpack_require__(74996);
Object.defineProperty(exports, "SharedArraySenderStrategy", ({ enumerable: true, get: function () { return sharedArrayCancellation_1.SharedArraySenderStrategy; } }));
Object.defineProperty(exports, "SharedArrayReceiverStrategy", ({ enumerable: true, get: function () { return sharedArrayCancellation_1.SharedArrayReceiverStrategy; } }));
const messageReader_1 = __webpack_require__(59085);
Object.defineProperty(exports, "MessageReader", ({ enumerable: true, get: function () { return messageReader_1.MessageReader; } }));
Object.defineProperty(exports, "AbstractMessageReader", ({ enumerable: true, get: function () { return messageReader_1.AbstractMessageReader; } }));
Object.defineProperty(exports, "ReadableStreamMessageReader", ({ enumerable: true, get: function () { return messageReader_1.ReadableStreamMessageReader; } }));
const messageWriter_1 = __webpack_require__(23193);
Object.defineProperty(exports, "MessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.MessageWriter; } }));
Object.defineProperty(exports, "AbstractMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.AbstractMessageWriter; } }));
Object.defineProperty(exports, "WriteableStreamMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.WriteableStreamMessageWriter; } }));
const messageBuffer_1 = __webpack_require__(89244);
Object.defineProperty(exports, "AbstractMessageBuffer", ({ enumerable: true, get: function () { return messageBuffer_1.AbstractMessageBuffer; } }));
const connection_1 = __webpack_require__(90577);
Object.defineProperty(exports, "ConnectionStrategy", ({ enumerable: true, get: function () { return connection_1.ConnectionStrategy; } }));
Object.defineProperty(exports, "ConnectionOptions", ({ enumerable: true, get: function () { return connection_1.ConnectionOptions; } }));
Object.defineProperty(exports, "NullLogger", ({ enumerable: true, get: function () { return connection_1.NullLogger; } }));
Object.defineProperty(exports, "createMessageConnection", ({ enumerable: true, get: function () { return connection_1.createMessageConnection; } }));
Object.defineProperty(exports, "ProgressToken", ({ enumerable: true, get: function () { return connection_1.ProgressToken; } }));
Object.defineProperty(exports, "ProgressType", ({ enumerable: true, get: function () { return connection_1.ProgressType; } }));
Object.defineProperty(exports, "Trace", ({ enumerable: true, get: function () { return connection_1.Trace; } }));
Object.defineProperty(exports, "TraceValues", ({ enumerable: true, get: function () { return connection_1.TraceValues; } }));
Object.defineProperty(exports, "TraceFormat", ({ enumerable: true, get: function () { return connection_1.TraceFormat; } }));
Object.defineProperty(exports, "SetTraceNotification", ({ enumerable: true, get: function () { return connection_1.SetTraceNotification; } }));
Object.defineProperty(exports, "LogTraceNotification", ({ enumerable: true, get: function () { return connection_1.LogTraceNotification; } }));
Object.defineProperty(exports, "ConnectionErrors", ({ enumerable: true, get: function () { return connection_1.ConnectionErrors; } }));
Object.defineProperty(exports, "ConnectionError", ({ enumerable: true, get: function () { return connection_1.ConnectionError; } }));
Object.defineProperty(exports, "CancellationReceiverStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationReceiverStrategy; } }));
Object.defineProperty(exports, "CancellationSenderStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationSenderStrategy; } }));
Object.defineProperty(exports, "CancellationStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationStrategy; } }));
Object.defineProperty(exports, "MessageStrategy", ({ enumerable: true, get: function () { return connection_1.MessageStrategy; } }));
const ral_1 = __webpack_require__(47209);
exports.RAL = ral_1.default;


/***/ }),

/***/ 59850:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationTokenSource = exports.CancellationToken = void 0;
const ral_1 = __webpack_require__(47209);
const Is = __webpack_require__(78585);
const events_1 = __webpack_require__(62676);
var CancellationToken;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
    });
    function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken.None
            || candidate === CancellationToken.Cancelled
            || (Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
    }
    CancellationToken.is = is;
})(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
const shortcutEvent = Object.freeze(function (callback, context) {
    const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
    return { dispose() { handle.dispose(); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    }
}
class CancellationTokenSource {
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else {
            this._token.cancel();
        }
    }
    dispose() {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;


/***/ }),

/***/ 90577:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageConnection = exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
const ral_1 = __webpack_require__(47209);
const Is = __webpack_require__(78585);
const messages_1 = __webpack_require__(96177);
const linkedMap_1 = __webpack_require__(93352);
const events_1 = __webpack_require__(62676);
const cancellation_1 = __webpack_require__(59850);
var CancelNotification;
(function (CancelNotification) {
    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
})(CancelNotification || (CancelNotification = {}));
var ProgressToken;
(function (ProgressToken) {
    function is(value) {
        return typeof value === 'string' || typeof value === 'number';
    }
    ProgressToken.is = is;
})(ProgressToken || (exports.ProgressToken = ProgressToken = {}));
var ProgressNotification;
(function (ProgressNotification) {
    ProgressNotification.type = new messages_1.NotificationType('$/progress');
})(ProgressNotification || (ProgressNotification = {}));
class ProgressType {
    constructor() {
    }
}
exports.ProgressType = ProgressType;
var StarRequestHandler;
(function (StarRequestHandler) {
    function is(value) {
        return Is.func(value);
    }
    StarRequestHandler.is = is;
})(StarRequestHandler || (StarRequestHandler = {}));
exports.NullLogger = Object.freeze({
    error: () => { },
    warn: () => { },
    info: () => { },
    log: () => { }
});
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Compact"] = 2] = "Compact";
    Trace[Trace["Verbose"] = 3] = "Verbose";
})(Trace || (exports.Trace = Trace = {}));
var TraceValues;
(function (TraceValues) {
    /**
     * Turn tracing off.
     */
    TraceValues.Off = 'off';
    /**
     * Trace messages only.
     */
    TraceValues.Messages = 'messages';
    /**
     * Compact message tracing.
     */
    TraceValues.Compact = 'compact';
    /**
     * Verbose message tracing.
     */
    TraceValues.Verbose = 'verbose';
})(TraceValues || (exports.TraceValues = TraceValues = {}));
(function (Trace) {
    function fromString(value) {
        if (!Is.string(value)) {
            return Trace.Off;
        }
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'compact':
                return Trace.Compact;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
    function toString(value) {
        switch (value) {
            case Trace.Off:
                return 'off';
            case Trace.Messages:
                return 'messages';
            case Trace.Compact:
                return 'compact';
            case Trace.Verbose:
                return 'verbose';
            default:
                return 'off';
        }
    }
    Trace.toString = toString;
})(Trace || (exports.Trace = Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
(function (TraceFormat) {
    function fromString(value) {
        if (!Is.string(value)) {
            return TraceFormat.Text;
        }
        value = value.toLowerCase();
        if (value === 'json') {
            return TraceFormat.JSON;
        }
        else {
            return TraceFormat.Text;
        }
    }
    TraceFormat.fromString = fromString;
})(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages_1.NotificationType('$/setTrace');
})(SetTraceNotification || (exports.SetTraceNotification = SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages_1.NotificationType('$/logTrace');
})(LogTraceNotification || (exports.LogTraceNotification = LogTraceNotification = {}));
var ConnectionErrors;
(function (ConnectionErrors) {
    /**
     * The connection is closed.
     */
    ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
    /**
     * The connection got disposed.
     */
    ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
    /**
     * The connection is already in listening mode.
     */
    ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
})(ConnectionErrors || (exports.ConnectionErrors = ConnectionErrors = {}));
class ConnectionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}
exports.ConnectionError = ConnectionError;
var ConnectionStrategy;
(function (ConnectionStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy.is = is;
})(ConnectionStrategy || (exports.ConnectionStrategy = ConnectionStrategy = {}));
var IdCancellationReceiverStrategy;
(function (IdCancellationReceiverStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === undefined || candidate.kind === 'id') && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    IdCancellationReceiverStrategy.is = is;
})(IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
var RequestCancellationReceiverStrategy;
(function (RequestCancellationReceiverStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && candidate.kind === 'request' && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    RequestCancellationReceiverStrategy.is = is;
})(RequestCancellationReceiverStrategy || (exports.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
var CancellationReceiverStrategy;
(function (CancellationReceiverStrategy) {
    CancellationReceiverStrategy.Message = Object.freeze({
        createCancellationTokenSource(_) {
            return new cancellation_1.CancellationTokenSource();
        }
    });
    function is(value) {
        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
    }
    CancellationReceiverStrategy.is = is;
})(CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
var CancellationSenderStrategy;
(function (CancellationSenderStrategy) {
    CancellationSenderStrategy.Message = Object.freeze({
        sendCancellation(conn, id) {
            return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) { }
    });
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
    }
    CancellationSenderStrategy.is = is;
})(CancellationSenderStrategy || (exports.CancellationSenderStrategy = CancellationSenderStrategy = {}));
var CancellationStrategy;
(function (CancellationStrategy) {
    CancellationStrategy.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
    });
    function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
    }
    CancellationStrategy.is = is;
})(CancellationStrategy || (exports.CancellationStrategy = CancellationStrategy = {}));
var MessageStrategy;
(function (MessageStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.handleMessage);
    }
    MessageStrategy.is = is;
})(MessageStrategy || (exports.MessageStrategy = MessageStrategy = {}));
var ConnectionOptions;
(function (ConnectionOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
    }
    ConnectionOptions.is = is;
})(ConnectionOptions || (exports.ConnectionOptions = ConnectionOptions = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["New"] = 1] = "New";
    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
})(ConnectionState || (ConnectionState = {}));
function createMessageConnection(messageReader, messageWriter, _logger, options) {
    const logger = _logger !== undefined ? _logger : exports.NullLogger;
    let sequenceNumber = 0;
    let notificationSequenceNumber = 0;
    let unknownResponseSequenceNumber = 0;
    const version = '2.0';
    let starRequestHandler = undefined;
    const requestHandlers = new Map();
    let starNotificationHandler = undefined;
    const notificationHandlers = new Map();
    const progressHandlers = new Map();
    let timer;
    let messageQueue = new linkedMap_1.LinkedMap();
    let responsePromises = new Map();
    let knownCanceledRequests = new Set();
    let requestTokens = new Map();
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    const errorEmitter = new events_1.Emitter();
    const closeEmitter = new events_1.Emitter();
    const unhandledNotificationEmitter = new events_1.Emitter();
    const unhandledProgressEmitter = new events_1.Emitter();
    const disposeEmitter = new events_1.Emitter();
    const cancellationStrategy = (options && options.cancellationStrategy) ? options.cancellationStrategy : CancellationStrategy.Message;
    function createRequestQueueKey(id) {
        if (id === null) {
            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return 'req-' + id.toString();
    }
    function createResponseQueueKey(id) {
        if (id === null) {
            return 'res-unknown-' + (++unknownResponseSequenceNumber).toString();
        }
        else {
            return 'res-' + id.toString();
        }
    }
    function createNotificationQueueKey() {
        return 'not-' + (++notificationSequenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
            queue.set(createRequestQueueKey(message.id), message);
        }
        else if (messages_1.Message.isResponse(message)) {
            queue.set(createResponseQueueKey(message.id), message);
        }
        else {
            queue.set(createNotificationQueueKey(), message);
        }
    }
    function cancelUndispatched(_message) {
        return undefined;
    }
    function isListening() {
        return state === ConnectionState.Listening;
    }
    function isClosed() {
        return state === ConnectionState.Closed;
    }
    function isDisposed() {
        return state === ConnectionState.Disposed;
    }
    function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
            state = ConnectionState.Closed;
            closeEmitter.fire(undefined);
        }
        // If the connection is disposed don't sent close events.
    }
    function readErrorHandler(error) {
        errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
        errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
            return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(() => {
            timer = undefined;
            processMessageQueue();
        });
    }
    function handleMessage(message) {
        if (messages_1.Message.isRequest(message)) {
            handleRequest(message);
        }
        else if (messages_1.Message.isNotification(message)) {
            handleNotification(message);
        }
        else if (messages_1.Message.isResponse(message)) {
            handleResponse(message);
        }
        else {
            handleInvalidMessage(message);
        }
    }
    function processMessageQueue() {
        if (messageQueue.size === 0) {
            return;
        }
        const message = messageQueue.shift();
        try {
            const messageStrategy = options?.messageStrategy;
            if (MessageStrategy.is(messageStrategy)) {
                messageStrategy.handleMessage(message, handleMessage);
            }
            else {
                handleMessage(message);
            }
        }
        finally {
            triggerMessageQueue();
        }
    }
    const callback = (message) => {
        try {
            // We have received a cancellation message. Check if the message is still in the queue
            // and cancel it if allowed to do so.
            if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
                const cancelId = message.params.id;
                const key = createRequestQueueKey(cancelId);
                const toCancel = messageQueue.get(key);
                if (messages_1.Message.isRequest(toCancel)) {
                    const strategy = options?.connectionStrategy;
                    const response = (strategy && strategy.cancelUndispatched) ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                    if (response && (response.error !== undefined || response.result !== undefined)) {
                        messageQueue.delete(key);
                        requestTokens.delete(cancelId);
                        response.id = toCancel.id;
                        traceSendingResponse(response, message.method, Date.now());
                        messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                        return;
                    }
                }
                const cancellationToken = requestTokens.get(cancelId);
                // The request is already running. Cancel the token
                if (cancellationToken !== undefined) {
                    cancellationToken.cancel();
                    traceReceivedNotification(message);
                    return;
                }
                else {
                    // Remember the cancel but still queue the message to
                    // clean up state in process message.
                    knownCanceledRequests.add(cancelId);
                }
            }
            addMessageToQueue(messageQueue, message);
        }
        finally {
            triggerMessageQueue();
        }
    };
    function handleRequest(requestMessage) {
        if (isDisposed()) {
            // we return here silently since we fired an event when the
            // connection got disposed.
            return;
        }
        function reply(resultOrError, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id
            };
            if (resultOrError instanceof messages_1.ResponseError) {
                message.error = resultOrError.toJson();
            }
            else {
                message.result = resultOrError === undefined ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replyError(error, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                error: error.toJson()
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replySuccess(result, method, startTime) {
            // The JSON RPC defines that a response must either have a result or an error
            // So we can't treat undefined as a valid response result.
            if (result === undefined) {
                result = null;
            }
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                result: result
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
            type = element.type;
            requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
            const tokenKey = requestMessage.id ?? String(Date.now()); //
            const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver)
                ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey)
                : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
                cancellationSource.cancel();
            }
            if (requestMessage.id !== null) {
                requestTokens.set(tokenKey, cancellationSource);
            }
            try {
                let handlerResult;
                if (requestHandler) {
                    if (requestMessage.params === undefined) {
                        if (type !== undefined && type.numberOfParams !== 0) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(cancellationSource.token);
                    }
                    else if (Array.isArray(requestMessage.params)) {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byName) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
                    }
                }
                else if (starRequestHandler) {
                    handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                }
                const promise = handlerResult;
                if (!handlerResult) {
                    requestTokens.delete(tokenKey);
                    replySuccess(handlerResult, requestMessage.method, startTime);
                }
                else if (promise.then) {
                    promise.then((resultOrError) => {
                        requestTokens.delete(tokenKey);
                        reply(resultOrError, requestMessage.method, startTime);
                    }, error => {
                        requestTokens.delete(tokenKey);
                        if (error instanceof messages_1.ResponseError) {
                            replyError(error, requestMessage.method, startTime);
                        }
                        else if (error && Is.string(error.message)) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                        }
                        else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                        }
                    });
                }
                else {
                    requestTokens.delete(tokenKey);
                    reply(handlerResult, requestMessage.method, startTime);
                }
            }
            catch (error) {
                requestTokens.delete(tokenKey);
                if (error instanceof messages_1.ResponseError) {
                    reply(error, requestMessage.method, startTime);
                }
                else if (error && Is.string(error.message)) {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                }
                else {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
            }
        }
        else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
    }
    function handleResponse(responseMessage) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        if (responseMessage.id === null) {
            if (responseMessage.error) {
                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
            }
            else {
                logger.error(`Received response message without id. No further error information provided.`);
            }
        }
        else {
            const key = responseMessage.id;
            const responsePromise = responsePromises.get(key);
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise !== undefined) {
                responsePromises.delete(key);
                try {
                    if (responseMessage.error) {
                        const error = responseMessage.error;
                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                    }
                    else if (responseMessage.result !== undefined) {
                        responsePromise.resolve(responseMessage.result);
                    }
                    else {
                        throw new Error('Should never happen.');
                    }
                }
                catch (error) {
                    if (error.message) {
                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                    }
                    else {
                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                    }
                }
            }
        }
    }
    function handleNotification(message) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        let type = undefined;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            knownCanceledRequests.delete(cancelId);
            traceReceivedNotification(message);
            return;
        }
        else {
            const element = notificationHandlers.get(message.method);
            if (element) {
                notificationHandler = element.handler;
                type = element.type;
            }
        }
        if (notificationHandler || starNotificationHandler) {
            try {
                traceReceivedNotification(message);
                if (notificationHandler) {
                    if (message.params === undefined) {
                        if (type !== undefined) {
                            if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                            }
                        }
                        notificationHandler();
                    }
                    else if (Array.isArray(message.params)) {
                        // There are JSON-RPC libraries that send progress message as positional params although
                        // specified as named. So convert them if this is the case.
                        const params = message.params;
                        if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                            notificationHandler({ token: params[0], value: params[1] });
                        }
                        else {
                            if (type !== undefined) {
                                if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                                }
                                if (type.numberOfParams !== message.params.length) {
                                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                                }
                            }
                            notificationHandler(...params);
                        }
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                            logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                        }
                        notificationHandler(message.params);
                    }
                }
                else if (starNotificationHandler) {
                    starNotificationHandler(message.method, message.params);
                }
            }
            catch (error) {
                if (error.message) {
                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                }
                else {
                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                }
            }
        }
        else {
            unhandledNotificationEmitter.fire(message);
        }
    }
    function handleInvalidMessage(message) {
        if (!message) {
            logger.error('Received empty message.');
            return;
        }
        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
        // Test whether we find an id to reject the promise
        const responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
            const key = responseMessage.id;
            const responseHandler = responsePromises.get(key);
            if (responseHandler) {
                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
            }
        }
    }
    function stringifyTrace(params) {
        if (params === undefined || params === null) {
            return undefined;
        }
        switch (trace) {
            case Trace.Verbose:
                return JSON.stringify(params, null, 4);
            case Trace.Compact:
                return JSON.stringify(params);
            default:
                return undefined;
        }
    }
    function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                data = `Params: ${stringifyTrace(message.params)}\n\n`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('send-request', message);
        }
    }
    function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.params) {
                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('send-notification', message);
        }
    }
    function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.error && message.error.data) {
                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        }
        else {
            logLSPMessage('send-response', message);
        }
    }
    function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                data = `Params: ${stringifyTrace(message.params)}\n\n`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('receive-request', message);
        }
    }
    function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.params) {
                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('receive-notification', message);
        }
    }
    function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.error && message.error.data) {
                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            if (responsePromise) {
                const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            }
            else {
                tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
        }
        else {
            logLSPMessage('receive-response', message);
        }
    }
    function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
            return;
        }
        const lspMessage = {
            isLSPMessage: true,
            type,
            message,
            timestamp: Date.now()
        };
        tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
        if (isClosed()) {
            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
        }
        if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
        }
    }
    function throwIfListening() {
        if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
        }
    }
    function throwIfNotListening() {
        if (!isListening()) {
            throw new Error('Call listen() first.');
        }
    }
    function undefinedToNull(param) {
        if (param === undefined) {
            return null;
        }
        else {
            return param;
        }
    }
    function nullToUndefined(param) {
        if (param === null) {
            return undefined;
        }
        else {
            return param;
        }
    }
    function isNamedParam(param) {
        return param !== undefined && param !== null && !Array.isArray(param) && typeof param === 'object';
    }
    function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
            case messages_1.ParameterStructures.auto:
                if (isNamedParam(param)) {
                    return nullToUndefined(param);
                }
                else {
                    return [undefinedToNull(param)];
                }
            case messages_1.ParameterStructures.byName:
                if (!isNamedParam(param)) {
                    throw new Error(`Received parameters by name but param is not an object literal.`);
                }
                return nullToUndefined(param);
            case messages_1.ParameterStructures.byPosition:
                return [undefinedToNull(param)];
            default:
                throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
    }
    function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
            case 0:
                result = undefined;
                break;
            case 1:
                result = computeSingleParam(type.parameterStructures, params[0]);
                break;
            default:
                result = [];
                for (let i = 0; i < params.length && i < numberOfParams; i++) {
                    result.push(undefinedToNull(params[i]));
                }
                if (params.length < numberOfParams) {
                    for (let i = params.length; i < numberOfParams; i++) {
                        result.push(null);
                    }
                }
                break;
        }
        return result;
    }
    const connection = {
        sendNotification: (type, ...args) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (Is.string(type)) {
                method = type;
                const first = args[0];
                let paramStart = 0;
                let parameterStructures = messages_1.ParameterStructures.auto;
                if (messages_1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
            }
            const notificationMessage = {
                jsonrpc: version,
                method: method,
                params: messageParams
            };
            traceSendingNotification(notificationMessage);
            return messageWriter.write(notificationMessage).catch((error) => {
                logger.error(`Sending notification failed.`);
                throw error;
            });
        },
        onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            let method;
            if (Is.func(type)) {
                starNotificationHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    method = type;
                    notificationHandlers.set(type, { type: undefined, handler });
                }
                else {
                    method = type.method;
                    notificationHandlers.set(type.method, { type, handler });
                }
            }
            return {
                dispose: () => {
                    if (method !== undefined) {
                        notificationHandlers.delete(method);
                    }
                    else {
                        starNotificationHandler = undefined;
                    }
                }
            };
        },
        onProgress: (_type, token, handler) => {
            if (progressHandlers.has(token)) {
                throw new Error(`Progress handler for token ${token} already registered`);
            }
            progressHandlers.set(token, handler);
            return {
                dispose: () => {
                    progressHandlers.delete(token);
                }
            };
        },
        sendProgress: (_type, token, value) => {
            // This should not await but simple return to ensure that we don't have another
            // async scheduling. Otherwise one send could overtake another send.
            return connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = undefined;
            if (Is.string(type)) {
                method = type;
                const first = args[0];
                const last = args[args.length - 1];
                let paramStart = 0;
                let parameterStructures = messages_1.ParameterStructures.auto;
                if (messages_1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                if (cancellation_1.CancellationToken.is(last)) {
                    paramEnd = paramEnd - 1;
                    token = last;
                }
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
                const numberOfParams = type.numberOfParams;
                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
            }
            const id = sequenceNumber++;
            let disposable;
            if (token) {
                disposable = token.onCancellationRequested(() => {
                    const p = cancellationStrategy.sender.sendCancellation(connection, id);
                    if (p === undefined) {
                        logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                        return Promise.resolve();
                    }
                    else {
                        return p.catch(() => {
                            logger.log(`Sending cancellation messages for id ${id} failed`);
                        });
                    }
                });
            }
            const requestMessage = {
                jsonrpc: version,
                id: id,
                method: method,
                params: messageParams
            };
            traceSendingRequest(requestMessage);
            if (typeof cancellationStrategy.sender.enableCancellation === 'function') {
                cancellationStrategy.sender.enableCancellation(requestMessage);
            }
            return new Promise(async (resolve, reject) => {
                const resolveWithCleanup = (r) => {
                    resolve(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable?.dispose();
                };
                const rejectWithCleanup = (r) => {
                    reject(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable?.dispose();
                };
                const responsePromise = { method: method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
                try {
                    await messageWriter.write(requestMessage);
                    responsePromises.set(id, responsePromise);
                }
                catch (error) {
                    logger.error(`Sending request failed.`);
                    // Writing the message failed. So we need to reject the promise.
                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : 'Unknown reason'));
                    throw error;
                }
            });
        },
        onRequest: (type, handler) => {
            throwIfClosedOrDisposed();
            let method = null;
            if (StarRequestHandler.is(type)) {
                method = undefined;
                starRequestHandler = type;
            }
            else if (Is.string(type)) {
                method = null;
                if (handler !== undefined) {
                    method = type;
                    requestHandlers.set(type, { handler: handler, type: undefined });
                }
            }
            else {
                if (handler !== undefined) {
                    method = type.method;
                    requestHandlers.set(type.method, { type, handler });
                }
            }
            return {
                dispose: () => {
                    if (method === null) {
                        return;
                    }
                    if (method !== undefined) {
                        requestHandlers.delete(method);
                    }
                    else {
                        starRequestHandler = undefined;
                    }
                }
            };
        },
        hasPendingResponse: () => {
            return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
            let _sendNotification = false;
            let _traceFormat = TraceFormat.Text;
            if (sendNotificationOrTraceOptions !== undefined) {
                if (Is.boolean(sendNotificationOrTraceOptions)) {
                    _sendNotification = sendNotificationOrTraceOptions;
                }
                else {
                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
                tracer = undefined;
            }
            else {
                tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
                await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
            messageWriter.end();
        },
        dispose: () => {
            if (isDisposed()) {
                return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(undefined);
            const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, 'Pending response rejected since connection got disposed');
            for (const promise of responsePromises.values()) {
                promise.reject(error);
            }
            responsePromises = new Map();
            requestTokens = new Map();
            knownCanceledRequests = new Set();
            messageQueue = new linkedMap_1.LinkedMap();
            // Test for backwards compatibility
            if (Is.func(messageWriter.dispose)) {
                messageWriter.dispose();
            }
            if (Is.func(messageReader.dispose)) {
                messageReader.dispose();
            }
        },
        listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader.listen(callback);
        },
        inspect: () => {
            // eslint-disable-next-line no-console
            (0, ral_1.default)().console.log('inspect');
        }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : undefined);
    });
    connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
            handler(params.value);
        }
        else {
            unhandledProgressEmitter.fire(params);
        }
    });
    return connection;
}
exports.createMessageConnection = createMessageConnection;


/***/ }),

/***/ 34019:
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Disposable = void 0;
var Disposable;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
})(Disposable || (exports.Disposable = Disposable = {}));


/***/ }),

/***/ 62676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emitter = exports.Event = void 0;
const ral_1 = __webpack_require__(47209);
var Event;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(Event || (exports.Event = Event = {}));
class CallbackList {
    add(callback, context = null, bucket) {
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: () => this.remove(callback, context) });
        }
    }
    remove(callback, context = null) {
        if (!this._callbacks) {
            return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    }
    invoke(...args) {
        if (!this._callbacks) {
            return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
            try {
                ret.push(callbacks[i].apply(contexts[i], args));
            }
            catch (e) {
                // eslint-disable-next-line no-console
                (0, ral_1.default)().console.error(e);
            }
        }
        return ret;
    }
    isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
        this._callbacks = undefined;
        this._contexts = undefined;
    }
}
class Emitter {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                if (!this._callbacks) {
                    this._callbacks = new CallbackList();
                }
                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                    this._options.onFirstListenerAdd(this);
                }
                this._callbacks.add(listener, thisArgs);
                const result = {
                    dispose: () => {
                        if (!this._callbacks) {
                            // disposable is disposed after emitter is disposed.
                            return;
                        }
                        this._callbacks.remove(listener, thisArgs);
                        result.dispose = Emitter._noop;
                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                            this._options.onLastListenerRemove(this);
                        }
                    }
                };
                if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        if (this._callbacks) {
            this._callbacks.invoke.call(this._callbacks, event);
        }
    }
    dispose() {
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
    }
}
exports.Emitter = Emitter;
Emitter._noop = function () { };


/***/ }),

/***/ 78585:
/***/ ((__unused_webpack_module, exports) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;


/***/ }),

/***/ 93352:
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LRUCache = exports.LinkedMap = exports.Touch = void 0;
var Touch;
(function (Touch) {
    Touch.None = 0;
    Touch.First = 1;
    Touch.AsOld = Touch.First;
    Touch.Last = 2;
    Touch.AsNew = Touch.Last;
})(Touch || (exports.Touch = Touch = {}));
class LinkedMap {
    constructor() {
        this[_a] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        return this._head?.value;
    }
    get last() {
        return this._tail?.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== Touch.None) {
            this.touch(item, touch);
        }
        return item.value;
    }
    set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.First:
                    this.addItemFirst(item);
                    break;
                case Touch.Last:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: [current.key, current.value], done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happened if size === 1 which is handle
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happened if size === 1 which is handle
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== Touch.First && touch !== Touch.Last)) {
            return;
        }
        if (touch === Touch.First) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === Touch.Last) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
            this.set(key, value);
        }
    }
}
exports.LinkedMap = LinkedMap;
class LRUCache extends LinkedMap {
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
    }
    get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, Touch.None);
    }
    set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    }
}
exports.LRUCache = LRUCache;


/***/ }),

/***/ 89244:
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractMessageBuffer = void 0;
const CR = 13;
const LF = 10;
const CRLF = '\r\n';
class AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
    }
    get encoding() {
        return this._encoding;
    }
    append(chunk) {
        const toAppend = typeof chunk === 'string' ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
    }
    tryReadHeaders(lowerCaseKeys = false) {
        if (this._chunks.length === 0) {
            return undefined;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
            const chunk = this._chunks[chunkIndex];
            offset = 0;
            column: while (offset < chunk.length) {
                const value = chunk[offset];
                switch (value) {
                    case CR:
                        switch (state) {
                            case 0:
                                state = 1;
                                break;
                            case 2:
                                state = 3;
                                break;
                            default:
                                state = 0;
                        }
                        break;
                    case LF:
                        switch (state) {
                            case 1:
                                state = 2;
                                break;
                            case 3:
                                state = 4;
                                offset++;
                                break row;
                            default:
                                state = 0;
                        }
                        break;
                    default:
                        state = 0;
                }
                offset++;
            }
            chunkBytesRead += chunk.byteLength;
            chunkIndex++;
        }
        if (state !== 4) {
            return undefined;
        }
        // The buffer contains the two CRLF at the end. So we will
        // have two empty lines after the split at the end as well.
        const buffer = this._read(chunkBytesRead + offset);
        const result = new Map();
        const headers = this.toString(buffer, 'ascii').split(CRLF);
        if (headers.length < 2) {
            return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
            const header = headers[i];
            const index = header.indexOf(':');
            if (index === -1) {
                throw new Error(`Message header must separate key and value using ':'\n${header}`);
            }
            const key = header.substr(0, index);
            const value = header.substr(index + 1).trim();
            result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
    }
    tryReadBody(length) {
        if (this._totalLength < length) {
            return undefined;
        }
        return this._read(length);
    }
    get numberOfBytes() {
        return this._totalLength;
    }
    _read(byteCount) {
        if (byteCount === 0) {
            return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
            throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
            // super fast path, precisely first chunk must be returned
            const chunk = this._chunks[0];
            this._chunks.shift();
            this._totalLength -= byteCount;
            return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
            // fast path, the reading is entirely within the first chunk
            const chunk = this._chunks[0];
            const result = this.asNative(chunk, byteCount);
            this._chunks[0] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            return result;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
            const chunk = this._chunks[chunkIndex];
            if (chunk.byteLength > byteCount) {
                // this chunk will survive
                const chunkPart = chunk.slice(0, byteCount);
                result.set(chunkPart, resultOffset);
                resultOffset += byteCount;
                this._chunks[chunkIndex] = chunk.slice(byteCount);
                this._totalLength -= byteCount;
                byteCount -= byteCount;
            }
            else {
                // this chunk will be entirely read
                result.set(chunk, resultOffset);
                resultOffset += chunk.byteLength;
                this._chunks.shift();
                this._totalLength -= chunk.byteLength;
                byteCount -= chunk.byteLength;
            }
        }
        return result;
    }
}
exports.AbstractMessageBuffer = AbstractMessageBuffer;


/***/ }),

/***/ 59085:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
const ral_1 = __webpack_require__(47209);
const Is = __webpack_require__(78585);
const events_1 = __webpack_require__(62676);
const semaphore_1 = __webpack_require__(16704);
var MessageReader;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
            Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(MessageReader || (exports.MessageReader = MessageReader = {}));
class AbstractMessageReader {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error) {
        this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
        return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageReader = AbstractMessageReader;
var ResolvedMessageReaderOptions;
(function (ResolvedMessageReaderOptions) {
    function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = new Map();
        if (options === undefined || typeof options === 'string') {
            charset = options ?? 'utf-8';
        }
        else {
            charset = options.charset ?? 'utf-8';
            if (options.contentDecoder !== undefined) {
                contentDecoder = options.contentDecoder;
                contentDecoders.set(contentDecoder.name, contentDecoder);
            }
            if (options.contentDecoders !== undefined) {
                for (const decoder of options.contentDecoders) {
                    contentDecoders.set(decoder.name, decoder);
                }
            }
            if (options.contentTypeDecoder !== undefined) {
                contentTypeDecoder = options.contentTypeDecoder;
                contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
            }
            if (options.contentTypeDecoders !== undefined) {
                for (const decoder of options.contentTypeDecoders) {
                    contentTypeDecoders.set(decoder.name, decoder);
                }
            }
        }
        if (contentTypeDecoder === undefined) {
            contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
    }
    ResolvedMessageReaderOptions.fromOptions = fromOptions;
})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
class ReadableStreamMessageReader extends AbstractMessageReader {
    constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 10000;
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.readSemaphore = new semaphore_1.Semaphore(1);
    }
    set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
        return this._partialMessageTimeout;
    }
    listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = undefined;
        this.callback = callback;
        const result = this.readable.onData((data) => {
            this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
    }
    onData(data) {
        try {
            this.buffer.append(data);
            while (true) {
                if (this.nextMessageLength === -1) {
                    const headers = this.buffer.tryReadHeaders(true);
                    if (!headers) {
                        return;
                    }
                    const contentLength = headers.get('content-length');
                    if (!contentLength) {
                        this.fireError(new Error(`Header must provide a Content-Length property.\n${JSON.stringify(Object.fromEntries(headers))}`));
                        return;
                    }
                    const length = parseInt(contentLength);
                    if (isNaN(length)) {
                        this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
                        return;
                    }
                    this.nextMessageLength = length;
                }
                const body = this.buffer.tryReadBody(this.nextMessageLength);
                if (body === undefined) {
                    /** We haven't received the full message yet. */
                    this.setPartialMessageTimer();
                    return;
                }
                this.clearPartialMessageTimer();
                this.nextMessageLength = -1;
                // Make sure that we convert one received message after the
                // other. Otherwise it could happen that a decoding of a second
                // smaller message finished before the decoding of a first larger
                // message and then we would deliver the second message first.
                this.readSemaphore.lock(async () => {
                    const bytes = this.options.contentDecoder !== undefined
                        ? await this.options.contentDecoder.decode(body)
                        : body;
                    const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
                    this.callback(message);
                }).catch((error) => {
                    this.fireError(error);
                });
            }
        }
        catch (error) {
            this.fireError(error);
        }
    }
    clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
            this.partialMessageTimer.dispose();
            this.partialMessageTimer = undefined;
        }
    }
    setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
            return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
            this.partialMessageTimer = undefined;
            if (token === this.messageToken) {
                this.firePartialMessage({ messageToken: token, waitingTime: timeout });
                this.setPartialMessageTimer();
            }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
}
exports.ReadableStreamMessageReader = ReadableStreamMessageReader;


/***/ }),

/***/ 23193:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
const ral_1 = __webpack_require__(47209);
const Is = __webpack_require__(78585);
const semaphore_1 = __webpack_require__(16704);
const events_1 = __webpack_require__(62676);
const ContentLength = 'Content-Length: ';
const CRLF = '\r\n';
var MessageWriter;
(function (MessageWriter) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) &&
            Is.func(candidate.onError) && Is.func(candidate.write);
    }
    MessageWriter.is = is;
})(MessageWriter || (exports.MessageWriter = MessageWriter = {}));
class AbstractMessageWriter {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
var ResolvedMessageWriterOptions;
(function (ResolvedMessageWriterOptions) {
    function fromOptions(options) {
        if (options === undefined || typeof options === 'string') {
            return { charset: options ?? 'utf-8', contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        }
        else {
            return { charset: options.charset ?? 'utf-8', contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
    }
    ResolvedMessageWriterOptions.fromOptions = fromOptions;
})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
class WriteableStreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
    }
    async write(msg) {
        return this.writeSemaphore.lock(async () => {
            const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
                if (this.options.contentEncoder !== undefined) {
                    return this.options.contentEncoder.encode(buffer);
                }
                else {
                    return buffer;
                }
            });
            return payload.then((buffer) => {
                const headers = [];
                headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
                headers.push(CRLF);
                return this.doWrite(msg, headers, buffer);
            }, (error) => {
                this.fireError(error);
                throw error;
            });
        });
    }
    async doWrite(msg, headers, data) {
        try {
            await this.writable.write(headers.join(''), 'ascii');
            return this.writable.write(data);
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
        this.writable.end();
    }
}
exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;


/***/ }),

/***/ 96177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
const is = __webpack_require__(78585);
/**
 * Predefined error codes.
 */
var ErrorCodes;
(function (ErrorCodes) {
    // Defined by JSON RPC
    ErrorCodes.ParseError = -32700;
    ErrorCodes.InvalidRequest = -32600;
    ErrorCodes.MethodNotFound = -32601;
    ErrorCodes.InvalidParams = -32602;
    ErrorCodes.InternalError = -32603;
    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeStart = -32099;
    /** @deprecated use  jsonrpcReservedErrorRangeStart */
    ErrorCodes.serverErrorStart = -32099;
    /**
     * An error occurred when write a message to the transport layer.
     */
    ErrorCodes.MessageWriteError = -32099;
    /**
     * An error occurred when reading a message from the transport layer.
     */
    ErrorCodes.MessageReadError = -32098;
    /**
     * The connection got disposed or lost and all pending responses got
     * rejected.
     */
    ErrorCodes.PendingResponseRejected = -32097;
    /**
     * The connection is inactive and a use of it failed.
     */
    ErrorCodes.ConnectionInactive = -32096;
    /**
     * Error code indicating that a server received a notification or
     * request before the server has received the `initialize` request.
     */
    ErrorCodes.ServerNotInitialized = -32002;
    ErrorCodes.UnknownErrorCode = -32001;
    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeEnd = -32000;
    /** @deprecated use  jsonrpcReservedErrorRangeEnd */
    ErrorCodes.serverErrorEnd = -32000;
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
/**
 * An error object return in a response in case a request
 * has failed.
 */
class ResponseError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
        const result = {
            code: this.code,
            message: this.message
        };
        if (this.data !== undefined) {
            result.data = this.data;
        }
        return result;
    }
}
exports.ResponseError = ResponseError;
class ParameterStructures {
    constructor(kind) {
        this.kind = kind;
    }
    static is(value) {
        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
    }
    toString() {
        return this.kind;
    }
}
exports.ParameterStructures = ParameterStructures;
/**
 * The parameter structure is automatically inferred on the number of parameters
 * and the parameter type in case of a single param.
 */
ParameterStructures.auto = new ParameterStructures('auto');
/**
 * Forces `byPosition` parameter structure. This is useful if you have a single
 * parameter which has a literal type.
 */
ParameterStructures.byPosition = new ParameterStructures('byPosition');
/**
 * Forces `byName` parameter structure. This is only useful when having a single
 * parameter. The library will report errors if used with a different number of
 * parameters.
 */
ParameterStructures.byName = new ParameterStructures('byName');
/**
 * An abstract implementation of a MessageType.
 */
class AbstractMessageSignature {
    constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
    }
    get parameterStructures() {
        return ParameterStructures.auto;
    }
}
exports.AbstractMessageSignature = AbstractMessageSignature;
/**
 * Classes to type request response pairs
 */
class RequestType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.RequestType0 = RequestType0;
class RequestType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType = RequestType;
class RequestType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType1 = RequestType1;
class RequestType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.RequestType2 = RequestType2;
class RequestType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.RequestType3 = RequestType3;
class RequestType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.RequestType4 = RequestType4;
class RequestType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.RequestType5 = RequestType5;
class RequestType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.RequestType6 = RequestType6;
class RequestType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.RequestType7 = RequestType7;
class RequestType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.RequestType8 = RequestType8;
class RequestType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.RequestType9 = RequestType9;
class NotificationType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType = NotificationType;
class NotificationType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.NotificationType0 = NotificationType0;
class NotificationType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType1 = NotificationType1;
class NotificationType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.NotificationType2 = NotificationType2;
class NotificationType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.NotificationType3 = NotificationType3;
class NotificationType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.NotificationType4 = NotificationType4;
class NotificationType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.NotificationType5 = NotificationType5;
class NotificationType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.NotificationType6 = NotificationType6;
class NotificationType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.NotificationType7 = NotificationType7;
class NotificationType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.NotificationType8 = NotificationType8;
class NotificationType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.NotificationType9 = NotificationType9;
var Message;
(function (Message) {
    /**
     * Tests if the given message is a request message
     */
    function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }
    Message.isRequest = isRequest;
    /**
     * Tests if the given message is a notification message
     */
    function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
    }
    Message.isNotification = isNotification;
    /**
     * Tests if the given message is a response message
     */
    function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }
    Message.isResponse = isResponse;
})(Message || (exports.Message = Message = {}));


/***/ }),

/***/ 47209:
/***/ ((__unused_webpack_module, exports) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
let _ral;
function RAL() {
    if (_ral === undefined) {
        throw new Error(`No runtime abstraction layer installed`);
    }
    return _ral;
}
(function (RAL) {
    function install(ral) {
        if (ral === undefined) {
            throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
    }
    RAL.install = install;
})(RAL || (RAL = {}));
exports["default"] = RAL;


/***/ }),

/***/ 16704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Semaphore = void 0;
const ral_1 = __webpack_require__(47209);
class Semaphore {
    constructor(capacity = 1) {
        if (capacity <= 0) {
            throw new Error('Capacity must be greater than 0');
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
    }
    lock(thunk) {
        return new Promise((resolve, reject) => {
            this._waiting.push({ thunk, resolve, reject });
            this.runNext();
        });
    }
    get active() {
        return this._active;
    }
    runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
            throw new Error(`To many thunks active`);
        }
        try {
            const result = next.thunk();
            if (result instanceof Promise) {
                result.then((value) => {
                    this._active--;
                    next.resolve(value);
                    this.runNext();
                }, (err) => {
                    this._active--;
                    next.reject(err);
                    this.runNext();
                });
            }
            else {
                this._active--;
                next.resolve(result);
                this.runNext();
            }
        }
        catch (err) {
            this._active--;
            next.reject(err);
            this.runNext();
        }
    }
}
exports.Semaphore = Semaphore;


/***/ }),

/***/ 74996:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = void 0;
const cancellation_1 = __webpack_require__(59850);
var CancellationState;
(function (CancellationState) {
    CancellationState.Continue = 0;
    CancellationState.Cancelled = 1;
})(CancellationState || (CancellationState = {}));
class SharedArraySenderStrategy {
    constructor() {
        this.buffers = new Map();
    }
    enableCancellation(request) {
        if (request.id === null) {
            return;
        }
        const buffer = new SharedArrayBuffer(4);
        const data = new Int32Array(buffer, 0, 1);
        data[0] = CancellationState.Continue;
        this.buffers.set(request.id, buffer);
        request.$cancellationData = buffer;
    }
    async sendCancellation(_conn, id) {
        const buffer = this.buffers.get(id);
        if (buffer === undefined) {
            return;
        }
        const data = new Int32Array(buffer, 0, 1);
        Atomics.store(data, 0, CancellationState.Cancelled);
    }
    cleanup(id) {
        this.buffers.delete(id);
    }
    dispose() {
        this.buffers.clear();
    }
}
exports.SharedArraySenderStrategy = SharedArraySenderStrategy;
class SharedArrayBufferCancellationToken {
    constructor(buffer) {
        this.data = new Int32Array(buffer, 0, 1);
    }
    get isCancellationRequested() {
        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
    }
    get onCancellationRequested() {
        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
    }
}
class SharedArrayBufferCancellationTokenSource {
    constructor(buffer) {
        this.token = new SharedArrayBufferCancellationToken(buffer);
    }
    cancel() {
    }
    dispose() {
    }
}
class SharedArrayReceiverStrategy {
    constructor() {
        this.kind = 'request';
    }
    createCancellationTokenSource(request) {
        const buffer = request.$cancellationData;
        if (buffer === undefined) {
            return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
    }
}
exports.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;


/***/ }),

/***/ 85678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(54512);

/***/ }),

/***/ 54512:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProtocolConnection = void 0;
const browser_1 = __webpack_require__(26087);
__exportStar(__webpack_require__(26087), exports);
__exportStar(__webpack_require__(98766), exports);
function createProtocolConnection(reader, writer, logger, options) {
    return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;


/***/ }),

/***/ 98766:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LSPErrorCodes = exports.createProtocolConnection = void 0;
__exportStar(__webpack_require__(76439), exports);
__exportStar(__webpack_require__(46203), exports);
__exportStar(__webpack_require__(90372), exports);
__exportStar(__webpack_require__(91560), exports);
var connection_1 = __webpack_require__(41580);
Object.defineProperty(exports, "createProtocolConnection", ({ enumerable: true, get: function () { return connection_1.createProtocolConnection; } }));
var LSPErrorCodes;
(function (LSPErrorCodes) {
    /**
    * This is the start range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeStart = -32899;
    /**
     * A request failed but it was syntactically correct, e.g the
     * method name was known and the parameters were valid. The error
     * message should contain human readable information about why
     * the request failed.
     *
     * @since 3.17.0
     */
    LSPErrorCodes.RequestFailed = -32803;
    /**
     * The server cancelled the request. This error code should
     * only be used for requests that explicitly support being
     * server cancellable.
     *
     * @since 3.17.0
     */
    LSPErrorCodes.ServerCancelled = -32802;
    /**
     * The server detected that the content of a document got
     * modified outside normal conditions. A server should
     * NOT send this error code if it detects a content change
     * in it unprocessed messages. The result even computed
     * on an older state might still be useful for the client.
     *
     * If a client decides that a result is not of any use anymore
     * the client should cancel the request.
     */
    LSPErrorCodes.ContentModified = -32801;
    /**
     * The client has canceled a request and a server as detected
     * the cancel.
     */
    LSPErrorCodes.RequestCancelled = -32800;
    /**
    * This is the end range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeEnd = -32800;
})(LSPErrorCodes || (exports.LSPErrorCodes = LSPErrorCodes = {}));


/***/ }),

/***/ 41580:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProtocolConnection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(76439);
function createProtocolConnection(input, output, logger, options) {
    if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;


/***/ }),

/***/ 90372:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(76439);
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["clientToServer"] = "clientToServer";
    MessageDirection["serverToClient"] = "serverToClient";
    MessageDirection["both"] = "both";
})(MessageDirection || (exports.MessageDirection = MessageDirection = {}));
class RegistrationType {
    constructor(method) {
        this.method = method;
    }
}
exports.RegistrationType = RegistrationType;
class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
    constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;
class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
    constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
}
exports.ProtocolNotificationType = ProtocolNotificationType;


/***/ }),

/***/ 48765:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to result a `CallHierarchyItem` in a document at a given position.
 * Can be used as an input to an incoming or outgoing call hierarchy.
 *
 * @since 3.16.0
 */
var CallHierarchyPrepareRequest;
(function (CallHierarchyPrepareRequest) {
    CallHierarchyPrepareRequest.method = 'textDocument/prepareCallHierarchy';
    CallHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest.method);
})(CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
/**
 * A request to resolve the incoming calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */
var CallHierarchyIncomingCallsRequest;
(function (CallHierarchyIncomingCallsRequest) {
    CallHierarchyIncomingCallsRequest.method = 'callHierarchy/incomingCalls';
    CallHierarchyIncomingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyIncomingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest.method);
})(CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
/**
 * A request to resolve the outgoing calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */
var CallHierarchyOutgoingCallsRequest;
(function (CallHierarchyOutgoingCallsRequest) {
    CallHierarchyOutgoingCallsRequest.method = 'callHierarchy/outgoingCalls';
    CallHierarchyOutgoingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyOutgoingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest.method);
})(CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));


/***/ }),

/***/ 77672:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to list all color symbols found in a given text document. The request's
 * parameter is of type {@link DocumentColorParams} the
 * response is of type {@link ColorInformation ColorInformation[]} or a Thenable
 * that resolves to such.
 */
var DocumentColorRequest;
(function (DocumentColorRequest) {
    DocumentColorRequest.method = 'textDocument/documentColor';
    DocumentColorRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentColorRequest.type = new messages_1.ProtocolRequestType(DocumentColorRequest.method);
})(DocumentColorRequest || (exports.DocumentColorRequest = DocumentColorRequest = {}));
/**
 * A request to list all presentation for a color. The request's
 * parameter is of type {@link ColorPresentationParams} the
 * response is of type {@link ColorInformation ColorInformation[]} or a Thenable
 * that resolves to such.
 */
var ColorPresentationRequest;
(function (ColorPresentationRequest) {
    ColorPresentationRequest.method = 'textDocument/colorPresentation';
    ColorPresentationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ColorPresentationRequest.type = new messages_1.ProtocolRequestType(ColorPresentationRequest.method);
})(ColorPresentationRequest || (exports.ColorPresentationRequest = ColorPresentationRequest = {}));


/***/ }),

/***/ 41660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationRequest = void 0;
const messages_1 = __webpack_require__(90372);
//---- Get Configuration request ----
/**
 * The 'workspace/configuration' request is sent from the server to the client to fetch a certain
 * configuration setting.
 *
 * This pull model replaces the old push model were the client signaled configuration change via an
 * event. If the server still needs to react to configuration changes (since the server caches the
 * result of `workspace/configuration` requests) the server should register for an empty configuration
 * change event and empty the cache if such an event is received.
 */
var ConfigurationRequest;
(function (ConfigurationRequest) {
    ConfigurationRequest.method = 'workspace/configuration';
    ConfigurationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ConfigurationRequest.type = new messages_1.ProtocolRequestType(ConfigurationRequest.method);
})(ConfigurationRequest || (exports.ConfigurationRequest = ConfigurationRequest = {}));


/***/ }),

/***/ 46914:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeclarationRequest = void 0;
const messages_1 = __webpack_require__(90372);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type {@link TextDocumentPositionParams}
 * the response is of type {@link Declaration} or a typed array of {@link DeclarationLink}
 * or a Thenable that resolves to such.
 */
var DeclarationRequest;
(function (DeclarationRequest) {
    DeclarationRequest.method = 'textDocument/declaration';
    DeclarationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DeclarationRequest.type = new messages_1.ProtocolRequestType(DeclarationRequest.method);
})(DeclarationRequest || (exports.DeclarationRequest = DeclarationRequest = {}));


/***/ }),

/***/ 26011:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = void 0;
const vscode_jsonrpc_1 = __webpack_require__(76439);
const Is = __webpack_require__(38598);
const messages_1 = __webpack_require__(90372);
/**
 * @since 3.17.0
 */
var DiagnosticServerCancellationData;
(function (DiagnosticServerCancellationData) {
    function is(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.retriggerRequest);
    }
    DiagnosticServerCancellationData.is = is;
})(DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
/**
 * The document diagnostic report kinds.
 *
 * @since 3.17.0
 */
var DocumentDiagnosticReportKind;
(function (DocumentDiagnosticReportKind) {
    /**
     * A diagnostic report with a full
     * set of problems.
     */
    DocumentDiagnosticReportKind.Full = 'full';
    /**
     * A report indicating that the last
     * returned report is still accurate.
     */
    DocumentDiagnosticReportKind.Unchanged = 'unchanged';
})(DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
/**
 * The document diagnostic request definition.
 *
 * @since 3.17.0
 */
var DocumentDiagnosticRequest;
(function (DocumentDiagnosticRequest) {
    DocumentDiagnosticRequest.method = 'textDocument/diagnostic';
    DocumentDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentDiagnosticRequest.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest.method);
    DocumentDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
})(DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
/**
 * The workspace diagnostic request definition.
 *
 * @since 3.17.0
 */
var WorkspaceDiagnosticRequest;
(function (WorkspaceDiagnosticRequest) {
    WorkspaceDiagnosticRequest.method = 'workspace/diagnostic';
    WorkspaceDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceDiagnosticRequest.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest.method);
    WorkspaceDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
})(WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
/**
 * The diagnostic refresh request definition.
 *
 * @since 3.17.0
 */
var DiagnosticRefreshRequest;
(function (DiagnosticRefreshRequest) {
    DiagnosticRefreshRequest.method = `workspace/diagnostic/refresh`;
    DiagnosticRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    DiagnosticRefreshRequest.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest.method);
})(DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));


/***/ }),

/***/ 69840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A pattern kind describing if a glob pattern matches a file a folder or
 * both.
 *
 * @since 3.16.0
 */
var FileOperationPatternKind;
(function (FileOperationPatternKind) {
    /**
     * The pattern matches a file only.
     */
    FileOperationPatternKind.file = 'file';
    /**
     * The pattern matches a folder only.
     */
    FileOperationPatternKind.folder = 'folder';
})(FileOperationPatternKind || (exports.FileOperationPatternKind = FileOperationPatternKind = {}));
/**
 * The will create files request is sent from the client to the server before files are actually
 * created as long as the creation is triggered from within the client.
 *
 * The request can return a `WorkspaceEdit` which will be applied to workspace before the
 * files are created. Hence the `WorkspaceEdit` can not manipulate the content of the file
 * to be created.
 *
 * @since 3.16.0
 */
var WillCreateFilesRequest;
(function (WillCreateFilesRequest) {
    WillCreateFilesRequest.method = 'workspace/willCreateFiles';
    WillCreateFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillCreateFilesRequest.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest.method);
})(WillCreateFilesRequest || (exports.WillCreateFilesRequest = WillCreateFilesRequest = {}));
/**
 * The did create files notification is sent from the client to the server when
 * files were created from within the client.
 *
 * @since 3.16.0
 */
var DidCreateFilesNotification;
(function (DidCreateFilesNotification) {
    DidCreateFilesNotification.method = 'workspace/didCreateFiles';
    DidCreateFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCreateFilesNotification.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification.method);
})(DidCreateFilesNotification || (exports.DidCreateFilesNotification = DidCreateFilesNotification = {}));
/**
 * The will rename files request is sent from the client to the server before files are actually
 * renamed as long as the rename is triggered from within the client.
 *
 * @since 3.16.0
 */
var WillRenameFilesRequest;
(function (WillRenameFilesRequest) {
    WillRenameFilesRequest.method = 'workspace/willRenameFiles';
    WillRenameFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillRenameFilesRequest.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest.method);
})(WillRenameFilesRequest || (exports.WillRenameFilesRequest = WillRenameFilesRequest = {}));
/**
 * The did rename files notification is sent from the client to the server when
 * files were renamed from within the client.
 *
 * @since 3.16.0
 */
var DidRenameFilesNotification;
(function (DidRenameFilesNotification) {
    DidRenameFilesNotification.method = 'workspace/didRenameFiles';
    DidRenameFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidRenameFilesNotification.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification.method);
})(DidRenameFilesNotification || (exports.DidRenameFilesNotification = DidRenameFilesNotification = {}));
/**
 * The will delete files request is sent from the client to the server before files are actually
 * deleted as long as the deletion is triggered from within the client.
 *
 * @since 3.16.0
 */
var DidDeleteFilesNotification;
(function (DidDeleteFilesNotification) {
    DidDeleteFilesNotification.method = 'workspace/didDeleteFiles';
    DidDeleteFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidDeleteFilesNotification.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification.method);
})(DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
/**
 * The did delete files notification is sent from the client to the server when
 * files were deleted from within the client.
 *
 * @since 3.16.0
 */
var WillDeleteFilesRequest;
(function (WillDeleteFilesRequest) {
    WillDeleteFilesRequest.method = 'workspace/willDeleteFiles';
    WillDeleteFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillDeleteFilesRequest.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest.method);
})(WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));


/***/ }),

/***/ 2874:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide folding ranges in a document. The request's
 * parameter is of type {@link FoldingRangeParams}, the
 * response is of type {@link FoldingRangeList} or a Thenable
 * that resolves to such.
 */
var FoldingRangeRequest;
(function (FoldingRangeRequest) {
    FoldingRangeRequest.method = 'textDocument/foldingRange';
    FoldingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    FoldingRangeRequest.type = new messages_1.ProtocolRequestType(FoldingRangeRequest.method);
})(FoldingRangeRequest || (exports.FoldingRangeRequest = FoldingRangeRequest = {}));
/**
 * @since 3.18.0
 * @proposed
 */
var FoldingRangeRefreshRequest;
(function (FoldingRangeRefreshRequest) {
    FoldingRangeRefreshRequest.method = `workspace/foldingRange/refresh`;
    FoldingRangeRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    FoldingRangeRefreshRequest.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest.method);
})(FoldingRangeRefreshRequest || (exports.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));


/***/ }),

/***/ 39574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImplementationRequest = void 0;
const messages_1 = __webpack_require__(90372);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the implementation locations of a symbol at a given text
 * document position. The request's parameter is of type {@link TextDocumentPositionParams}
 * the response is of type {@link Definition} or a Thenable that resolves to such.
 */
var ImplementationRequest;
(function (ImplementationRequest) {
    ImplementationRequest.method = 'textDocument/implementation';
    ImplementationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ImplementationRequest.type = new messages_1.ProtocolRequestType(ImplementationRequest.method);
})(ImplementationRequest || (exports.ImplementationRequest = ImplementationRequest = {}));


/***/ }),

/***/ 77752:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide inlay hints in a document. The request's parameter is of
 * type {@link InlayHintsParams}, the response is of type
 * {@link InlayHint InlayHint[]} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlayHintRequest;
(function (InlayHintRequest) {
    InlayHintRequest.method = 'textDocument/inlayHint';
    InlayHintRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintRequest.type = new messages_1.ProtocolRequestType(InlayHintRequest.method);
})(InlayHintRequest || (exports.InlayHintRequest = InlayHintRequest = {}));
/**
 * A request to resolve additional properties for an inlay hint.
 * The request's parameter is of type {@link InlayHint}, the response is
 * of type {@link InlayHint} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlayHintResolveRequest;
(function (InlayHintResolveRequest) {
    InlayHintResolveRequest.method = 'inlayHint/resolve';
    InlayHintResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintResolveRequest.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest.method);
})(InlayHintResolveRequest || (exports.InlayHintResolveRequest = InlayHintResolveRequest = {}));
/**
 * @since 3.17.0
 */
var InlayHintRefreshRequest;
(function (InlayHintRefreshRequest) {
    InlayHintRefreshRequest.method = `workspace/inlayHint/refresh`;
    InlayHintRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    InlayHintRefreshRequest.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest.method);
})(InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));


/***/ }),

/***/ 13307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineCompletionRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide inline completions in a document. The request's parameter is of
 * type {@link InlineCompletionParams}, the response is of type
 * {@link InlineCompletion InlineCompletion[]} or a Thenable that resolves to such.
 *
 * @since 3.18.0
 * @proposed
 */
var InlineCompletionRequest;
(function (InlineCompletionRequest) {
    InlineCompletionRequest.method = 'textDocument/inlineCompletion';
    InlineCompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineCompletionRequest.type = new messages_1.ProtocolRequestType(InlineCompletionRequest.method);
})(InlineCompletionRequest || (exports.InlineCompletionRequest = InlineCompletionRequest = {}));


/***/ }),

/***/ 63124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineValueRefreshRequest = exports.InlineValueRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide inline values in a document. The request's parameter is of
 * type {@link InlineValueParams}, the response is of type
 * {@link InlineValue InlineValue[]} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlineValueRequest;
(function (InlineValueRequest) {
    InlineValueRequest.method = 'textDocument/inlineValue';
    InlineValueRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineValueRequest.type = new messages_1.ProtocolRequestType(InlineValueRequest.method);
})(InlineValueRequest || (exports.InlineValueRequest = InlineValueRequest = {}));
/**
 * @since 3.17.0
 */
var InlineValueRefreshRequest;
(function (InlineValueRefreshRequest) {
    InlineValueRefreshRequest.method = `workspace/inlineValue/refresh`;
    InlineValueRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    InlineValueRefreshRequest.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest.method);
})(InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));


/***/ }),

/***/ 91560:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = void 0;
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangesFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = void 0;
exports.InlineCompletionRequest = exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(90372);
const vscode_languageserver_types_1 = __webpack_require__(46203);
const Is = __webpack_require__(38598);
const protocol_implementation_1 = __webpack_require__(39574);
Object.defineProperty(exports, "ImplementationRequest", ({ enumerable: true, get: function () { return protocol_implementation_1.ImplementationRequest; } }));
const protocol_typeDefinition_1 = __webpack_require__(68461);
Object.defineProperty(exports, "TypeDefinitionRequest", ({ enumerable: true, get: function () { return protocol_typeDefinition_1.TypeDefinitionRequest; } }));
const protocol_workspaceFolder_1 = __webpack_require__(99935);
Object.defineProperty(exports, "WorkspaceFoldersRequest", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.WorkspaceFoldersRequest; } }));
Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification; } }));
const protocol_configuration_1 = __webpack_require__(41660);
Object.defineProperty(exports, "ConfigurationRequest", ({ enumerable: true, get: function () { return protocol_configuration_1.ConfigurationRequest; } }));
const protocol_colorProvider_1 = __webpack_require__(77672);
Object.defineProperty(exports, "DocumentColorRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.DocumentColorRequest; } }));
Object.defineProperty(exports, "ColorPresentationRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.ColorPresentationRequest; } }));
const protocol_foldingRange_1 = __webpack_require__(2874);
Object.defineProperty(exports, "FoldingRangeRequest", ({ enumerable: true, get: function () { return protocol_foldingRange_1.FoldingRangeRequest; } }));
Object.defineProperty(exports, "FoldingRangeRefreshRequest", ({ enumerable: true, get: function () { return protocol_foldingRange_1.FoldingRangeRefreshRequest; } }));
const protocol_declaration_1 = __webpack_require__(46914);
Object.defineProperty(exports, "DeclarationRequest", ({ enumerable: true, get: function () { return protocol_declaration_1.DeclarationRequest; } }));
const protocol_selectionRange_1 = __webpack_require__(33487);
Object.defineProperty(exports, "SelectionRangeRequest", ({ enumerable: true, get: function () { return protocol_selectionRange_1.SelectionRangeRequest; } }));
const protocol_progress_1 = __webpack_require__(32687);
Object.defineProperty(exports, "WorkDoneProgress", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgress; } }));
Object.defineProperty(exports, "WorkDoneProgressCreateRequest", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCreateRequest; } }));
Object.defineProperty(exports, "WorkDoneProgressCancelNotification", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCancelNotification; } }));
const protocol_callHierarchy_1 = __webpack_require__(48765);
Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyPrepareRequest; } }));
const protocol_semanticTokens_1 = __webpack_require__(72478);
Object.defineProperty(exports, "TokenFormat", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.TokenFormat; } }));
Object.defineProperty(exports, "SemanticTokensRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRequest; } }));
Object.defineProperty(exports, "SemanticTokensDeltaRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensDeltaRequest; } }));
Object.defineProperty(exports, "SemanticTokensRangeRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRangeRequest; } }));
Object.defineProperty(exports, "SemanticTokensRefreshRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRefreshRequest; } }));
Object.defineProperty(exports, "SemanticTokensRegistrationType", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRegistrationType; } }));
const protocol_showDocument_1 = __webpack_require__(80908);
Object.defineProperty(exports, "ShowDocumentRequest", ({ enumerable: true, get: function () { return protocol_showDocument_1.ShowDocumentRequest; } }));
const protocol_linkedEditingRange_1 = __webpack_require__(35316);
Object.defineProperty(exports, "LinkedEditingRangeRequest", ({ enumerable: true, get: function () { return protocol_linkedEditingRange_1.LinkedEditingRangeRequest; } }));
const protocol_fileOperations_1 = __webpack_require__(69840);
Object.defineProperty(exports, "FileOperationPatternKind", ({ enumerable: true, get: function () { return protocol_fileOperations_1.FileOperationPatternKind; } }));
Object.defineProperty(exports, "DidCreateFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidCreateFilesNotification; } }));
Object.defineProperty(exports, "WillCreateFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillCreateFilesRequest; } }));
Object.defineProperty(exports, "DidRenameFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidRenameFilesNotification; } }));
Object.defineProperty(exports, "WillRenameFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillRenameFilesRequest; } }));
Object.defineProperty(exports, "DidDeleteFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidDeleteFilesNotification; } }));
Object.defineProperty(exports, "WillDeleteFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillDeleteFilesRequest; } }));
const protocol_moniker_1 = __webpack_require__(9047);
Object.defineProperty(exports, "UniquenessLevel", ({ enumerable: true, get: function () { return protocol_moniker_1.UniquenessLevel; } }));
Object.defineProperty(exports, "MonikerKind", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerKind; } }));
Object.defineProperty(exports, "MonikerRequest", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerRequest; } }));
const protocol_typeHierarchy_1 = __webpack_require__(50645);
Object.defineProperty(exports, "TypeHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest; } }));
Object.defineProperty(exports, "TypeHierarchySubtypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest; } }));
Object.defineProperty(exports, "TypeHierarchySupertypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest; } }));
const protocol_inlineValue_1 = __webpack_require__(63124);
Object.defineProperty(exports, "InlineValueRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRequest; } }));
Object.defineProperty(exports, "InlineValueRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRefreshRequest; } }));
const protocol_inlayHint_1 = __webpack_require__(77752);
Object.defineProperty(exports, "InlayHintRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRequest; } }));
Object.defineProperty(exports, "InlayHintResolveRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintResolveRequest; } }));
Object.defineProperty(exports, "InlayHintRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRefreshRequest; } }));
const protocol_diagnostic_1 = __webpack_require__(26011);
Object.defineProperty(exports, "DiagnosticServerCancellationData", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticServerCancellationData; } }));
Object.defineProperty(exports, "DocumentDiagnosticReportKind", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticReportKind; } }));
Object.defineProperty(exports, "DocumentDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticRequest; } }));
Object.defineProperty(exports, "WorkspaceDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.WorkspaceDiagnosticRequest; } }));
Object.defineProperty(exports, "DiagnosticRefreshRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticRefreshRequest; } }));
const protocol_notebook_1 = __webpack_require__(53557);
Object.defineProperty(exports, "NotebookCellKind", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCellKind; } }));
Object.defineProperty(exports, "ExecutionSummary", ({ enumerable: true, get: function () { return protocol_notebook_1.ExecutionSummary; } }));
Object.defineProperty(exports, "NotebookCell", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCell; } }));
Object.defineProperty(exports, "NotebookDocument", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookDocument; } }));
Object.defineProperty(exports, "NotebookDocumentSyncRegistrationType", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookDocumentSyncRegistrationType; } }));
Object.defineProperty(exports, "DidOpenNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidOpenNotebookDocumentNotification; } }));
Object.defineProperty(exports, "NotebookCellArrayChange", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCellArrayChange; } }));
Object.defineProperty(exports, "DidChangeNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidChangeNotebookDocumentNotification; } }));
Object.defineProperty(exports, "DidSaveNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidSaveNotebookDocumentNotification; } }));
Object.defineProperty(exports, "DidCloseNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidCloseNotebookDocumentNotification; } }));
const protocol_inlineCompletion_1 = __webpack_require__(13307);
Object.defineProperty(exports, "InlineCompletionRequest", ({ enumerable: true, get: function () { return protocol_inlineCompletion_1.InlineCompletionRequest; } }));
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * The TextDocumentFilter namespace provides helper functions to work with
 * {@link TextDocumentFilter} literals.
 *
 * @since 3.17.0
 */
var TextDocumentFilter;
(function (TextDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.string(candidate) || (Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
    }
    TextDocumentFilter.is = is;
})(TextDocumentFilter || (exports.TextDocumentFilter = TextDocumentFilter = {}));
/**
 * The NotebookDocumentFilter namespace provides helper functions to work with
 * {@link NotebookDocumentFilter} literals.
 *
 * @since 3.17.0
 */
var NotebookDocumentFilter;
(function (NotebookDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
    }
    NotebookDocumentFilter.is = is;
})(NotebookDocumentFilter || (exports.NotebookDocumentFilter = NotebookDocumentFilter = {}));
/**
 * The NotebookCellTextDocumentFilter namespace provides helper functions to work with
 * {@link NotebookCellTextDocumentFilter} literals.
 *
 * @since 3.17.0
 */
var NotebookCellTextDocumentFilter;
(function (NotebookCellTextDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate)
            && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook))
            && (candidate.language === undefined || Is.string(candidate.language));
    }
    NotebookCellTextDocumentFilter.is = is;
})(NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
/**
 * The DocumentSelector namespace provides helper functions to work with
 * {@link DocumentSelector}s.
 */
var DocumentSelector;
(function (DocumentSelector) {
    function is(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        for (let elem of value) {
            if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
                return false;
            }
        }
        return true;
    }
    DocumentSelector.is = is;
})(DocumentSelector || (exports.DocumentSelector = DocumentSelector = {}));
/**
 * The `client/registerCapability` request is sent from the server to the client to register a new capability
 * handler on the client side.
 */
var RegistrationRequest;
(function (RegistrationRequest) {
    RegistrationRequest.method = 'client/registerCapability';
    RegistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    RegistrationRequest.type = new messages_1.ProtocolRequestType(RegistrationRequest.method);
})(RegistrationRequest || (exports.RegistrationRequest = RegistrationRequest = {}));
/**
 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
 * handler on the client side.
 */
var UnregistrationRequest;
(function (UnregistrationRequest) {
    UnregistrationRequest.method = 'client/unregisterCapability';
    UnregistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    UnregistrationRequest.type = new messages_1.ProtocolRequestType(UnregistrationRequest.method);
})(UnregistrationRequest || (exports.UnregistrationRequest = UnregistrationRequest = {}));
var ResourceOperationKind;
(function (ResourceOperationKind) {
    /**
     * Supports creating new files and folders.
     */
    ResourceOperationKind.Create = 'create';
    /**
     * Supports renaming existing files and folders.
     */
    ResourceOperationKind.Rename = 'rename';
    /**
     * Supports deleting existing files and folders.
     */
    ResourceOperationKind.Delete = 'delete';
})(ResourceOperationKind || (exports.ResourceOperationKind = ResourceOperationKind = {}));
var FailureHandlingKind;
(function (FailureHandlingKind) {
    /**
     * Applying the workspace change is simply aborted if one of the changes provided
     * fails. All operations executed before the failing operation stay executed.
     */
    FailureHandlingKind.Abort = 'abort';
    /**
     * All operations are executed transactional. That means they either all
     * succeed or no changes at all are applied to the workspace.
     */
    FailureHandlingKind.Transactional = 'transactional';
    /**
     * If the workspace edit contains only textual file changes they are executed transactional.
     * If resource changes (create, rename or delete file) are part of the change the failure
     * handling strategy is abort.
     */
    FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
    /**
     * The client tries to undo the operations already executed. But there is no
     * guarantee that this is succeeding.
     */
    FailureHandlingKind.Undo = 'undo';
})(FailureHandlingKind || (exports.FailureHandlingKind = FailureHandlingKind = {}));
/**
 * A set of predefined position encoding kinds.
 *
 * @since 3.17.0
 */
var PositionEncodingKind;
(function (PositionEncodingKind) {
    /**
     * Character offsets count UTF-8 code units (e.g. bytes).
     */
    PositionEncodingKind.UTF8 = 'utf-8';
    /**
     * Character offsets count UTF-16 code units.
     *
     * This is the default and must always be supported
     * by servers
     */
    PositionEncodingKind.UTF16 = 'utf-16';
    /**
     * Character offsets count UTF-32 code units.
     *
     * Implementation note: these are the same as Unicode codepoints,
     * so this `PositionEncodingKind` may also be used for an
     * encoding-agnostic representation of character offsets.
     */
    PositionEncodingKind.UTF32 = 'utf-32';
})(PositionEncodingKind || (exports.PositionEncodingKind = PositionEncodingKind = {}));
/**
 * The StaticRegistrationOptions namespace provides helper functions to work with
 * {@link StaticRegistrationOptions} literals.
 */
var StaticRegistrationOptions;
(function (StaticRegistrationOptions) {
    function hasId(value) {
        const candidate = value;
        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
    }
    StaticRegistrationOptions.hasId = hasId;
})(StaticRegistrationOptions || (exports.StaticRegistrationOptions = StaticRegistrationOptions = {}));
/**
 * The TextDocumentRegistrationOptions namespace provides helper functions to work with
 * {@link TextDocumentRegistrationOptions} literals.
 */
var TextDocumentRegistrationOptions;
(function (TextDocumentRegistrationOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
    }
    TextDocumentRegistrationOptions.is = is;
})(TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
/**
 * The WorkDoneProgressOptions namespace provides helper functions to work with
 * {@link WorkDoneProgressOptions} literals.
 */
var WorkDoneProgressOptions;
(function (WorkDoneProgressOptions) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === undefined || Is.boolean(candidate.workDoneProgress));
    }
    WorkDoneProgressOptions.is = is;
    function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.workDoneProgress);
    }
    WorkDoneProgressOptions.hasWorkDoneProgress = hasWorkDoneProgress;
})(WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
/**
 * The initialize request is sent from the client to the server.
 * It is sent once as the request after starting up the server.
 * The requests parameter is of type {@link InitializeParams}
 * the response if of type {@link InitializeResult} of a Thenable that
 * resolves to such.
 */
var InitializeRequest;
(function (InitializeRequest) {
    InitializeRequest.method = 'initialize';
    InitializeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializeRequest.type = new messages_1.ProtocolRequestType(InitializeRequest.method);
})(InitializeRequest || (exports.InitializeRequest = InitializeRequest = {}));
/**
 * Known error codes for an `InitializeErrorCodes`;
 */
var InitializeErrorCodes;
(function (InitializeErrorCodes) {
    /**
     * If the protocol version provided by the client can't be handled by the server.
     *
     * @deprecated This initialize error got replaced by client capabilities. There is
     * no version handshake in version 3.0x
     */
    InitializeErrorCodes.unknownProtocolVersion = 1;
})(InitializeErrorCodes || (exports.InitializeErrorCodes = InitializeErrorCodes = {}));
/**
 * The initialized notification is sent from the client to the
 * server after the client is fully initialized and the server
 * is allowed to send requests from the server to the client.
 */
var InitializedNotification;
(function (InitializedNotification) {
    InitializedNotification.method = 'initialized';
    InitializedNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializedNotification.type = new messages_1.ProtocolNotificationType(InitializedNotification.method);
})(InitializedNotification || (exports.InitializedNotification = InitializedNotification = {}));
//---- Shutdown Method ----
/**
 * A shutdown request is sent from the client to the server.
 * It is sent once when the client decides to shutdown the
 * server. The only notification that is sent after a shutdown request
 * is the exit event.
 */
var ShutdownRequest;
(function (ShutdownRequest) {
    ShutdownRequest.method = 'shutdown';
    ShutdownRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ShutdownRequest.type = new messages_1.ProtocolRequestType0(ShutdownRequest.method);
})(ShutdownRequest || (exports.ShutdownRequest = ShutdownRequest = {}));
//---- Exit Notification ----
/**
 * The exit event is sent from the client to the server to
 * ask the server to exit its process.
 */
var ExitNotification;
(function (ExitNotification) {
    ExitNotification.method = 'exit';
    ExitNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    ExitNotification.type = new messages_1.ProtocolNotificationType0(ExitNotification.method);
})(ExitNotification || (exports.ExitNotification = ExitNotification = {}));
/**
 * The configuration change notification is sent from the client to the server
 * when the client's configuration has changed. The notification contains
 * the changed configuration as defined by the language client.
 */
var DidChangeConfigurationNotification;
(function (DidChangeConfigurationNotification) {
    DidChangeConfigurationNotification.method = 'workspace/didChangeConfiguration';
    DidChangeConfigurationNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeConfigurationNotification.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification.method);
})(DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
//---- Message show and log notifications ----
/**
 * The message type
 */
var MessageType;
(function (MessageType) {
    /**
     * An error message.
     */
    MessageType.Error = 1;
    /**
     * A warning message.
     */
    MessageType.Warning = 2;
    /**
     * An information message.
     */
    MessageType.Info = 3;
    /**
     * A log message.
     */
    MessageType.Log = 4;
    /**
     * A debug message.
     *
     * @since 3.18.0
     */
    MessageType.Debug = 5;
})(MessageType || (exports.MessageType = MessageType = {}));
/**
 * The show message notification is sent from a server to a client to ask
 * the client to display a particular message in the user interface.
 */
var ShowMessageNotification;
(function (ShowMessageNotification) {
    ShowMessageNotification.method = 'window/showMessage';
    ShowMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageNotification.type = new messages_1.ProtocolNotificationType(ShowMessageNotification.method);
})(ShowMessageNotification || (exports.ShowMessageNotification = ShowMessageNotification = {}));
/**
 * The show message request is sent from the server to the client to show a message
 * and a set of options actions to the user.
 */
var ShowMessageRequest;
(function (ShowMessageRequest) {
    ShowMessageRequest.method = 'window/showMessageRequest';
    ShowMessageRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageRequest.type = new messages_1.ProtocolRequestType(ShowMessageRequest.method);
})(ShowMessageRequest || (exports.ShowMessageRequest = ShowMessageRequest = {}));
/**
 * The log message notification is sent from the server to the client to ask
 * the client to log a particular message.
 */
var LogMessageNotification;
(function (LogMessageNotification) {
    LogMessageNotification.method = 'window/logMessage';
    LogMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    LogMessageNotification.type = new messages_1.ProtocolNotificationType(LogMessageNotification.method);
})(LogMessageNotification || (exports.LogMessageNotification = LogMessageNotification = {}));
//---- Telemetry notification
/**
 * The telemetry event notification is sent from the server to the client to ask
 * the client to log telemetry data.
 */
var TelemetryEventNotification;
(function (TelemetryEventNotification) {
    TelemetryEventNotification.method = 'telemetry/event';
    TelemetryEventNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    TelemetryEventNotification.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification.method);
})(TelemetryEventNotification || (exports.TelemetryEventNotification = TelemetryEventNotification = {}));
/**
 * Defines how the host (editor) should sync
 * document changes to the language server.
 */
var TextDocumentSyncKind;
(function (TextDocumentSyncKind) {
    /**
     * Documents should not be synced at all.
     */
    TextDocumentSyncKind.None = 0;
    /**
     * Documents are synced by always sending the full content
     * of the document.
     */
    TextDocumentSyncKind.Full = 1;
    /**
     * Documents are synced by sending the full content on open.
     * After that only incremental updates to the document are
     * send.
     */
    TextDocumentSyncKind.Incremental = 2;
})(TextDocumentSyncKind || (exports.TextDocumentSyncKind = TextDocumentSyncKind = {}));
/**
 * The document open notification is sent from the client to the server to signal
 * newly opened text documents. The document's truth is now managed by the client
 * and the server must not try to read the document's truth using the document's
 * uri. Open in this sense means it is managed by the client. It doesn't necessarily
 * mean that its content is presented in an editor. An open notification must not
 * be sent more than once without a corresponding close notification send before.
 * This means open and close notification must be balanced and the max open count
 * is one.
 */
var DidOpenTextDocumentNotification;
(function (DidOpenTextDocumentNotification) {
    DidOpenTextDocumentNotification.method = 'textDocument/didOpen';
    DidOpenTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification.method);
})(DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
var TextDocumentContentChangeEvent;
(function (TextDocumentContentChangeEvent) {
    /**
     * Checks whether the information describes a delta event.
     */
    function isIncremental(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    }
    TextDocumentContentChangeEvent.isIncremental = isIncremental;
    /**
     * Checks whether the information describes a full replacement event.
     */
    function isFull(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    }
    TextDocumentContentChangeEvent.isFull = isFull;
})(TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
/**
 * The document change notification is sent from the client to the server to signal
 * changes to a text document.
 */
var DidChangeTextDocumentNotification;
(function (DidChangeTextDocumentNotification) {
    DidChangeTextDocumentNotification.method = 'textDocument/didChange';
    DidChangeTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
})(DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
/**
 * The document close notification is sent from the client to the server when
 * the document got closed in the client. The document's truth now exists where
 * the document's uri points to (e.g. if the document's uri is a file uri the
 * truth now exists on disk). As with the open notification the close notification
 * is about managing the document's content. Receiving a close notification
 * doesn't mean that the document was open in an editor before. A close
 * notification requires a previous open notification to be sent.
 */
var DidCloseTextDocumentNotification;
(function (DidCloseTextDocumentNotification) {
    DidCloseTextDocumentNotification.method = 'textDocument/didClose';
    DidCloseTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification.method);
})(DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
/**
 * The document save notification is sent from the client to the server when
 * the document got saved in the client.
 */
var DidSaveTextDocumentNotification;
(function (DidSaveTextDocumentNotification) {
    DidSaveTextDocumentNotification.method = 'textDocument/didSave';
    DidSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
})(DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));
/**
 * A document will save notification is sent from the client to the server before
 * the document is actually saved.
 */
var WillSaveTextDocumentNotification;
(function (WillSaveTextDocumentNotification) {
    WillSaveTextDocumentNotification.method = 'textDocument/willSave';
    WillSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
})(WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
/**
 * A document will save request is sent from the client to the server before
 * the document is actually saved. The request can return an array of TextEdits
 * which will be applied to the text document before it is saved. Please note that
 * clients might drop results if computing the text edits took too long or if a
 * server constantly fails on this request. This is done to keep the save fast and
 * reliable.
 */
var WillSaveTextDocumentWaitUntilRequest;
(function (WillSaveTextDocumentWaitUntilRequest) {
    WillSaveTextDocumentWaitUntilRequest.method = 'textDocument/willSaveWaitUntil';
    WillSaveTextDocumentWaitUntilRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentWaitUntilRequest.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest.method);
})(WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
/**
 * The watched files notification is sent from the client to the server when
 * the client detects changes to file watched by the language client.
 */
var DidChangeWatchedFilesNotification;
(function (DidChangeWatchedFilesNotification) {
    DidChangeWatchedFilesNotification.method = 'workspace/didChangeWatchedFiles';
    DidChangeWatchedFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWatchedFilesNotification.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification.method);
})(DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
/**
 * The file event type
 */
var FileChangeType;
(function (FileChangeType) {
    /**
     * The file got created.
     */
    FileChangeType.Created = 1;
    /**
     * The file got changed.
     */
    FileChangeType.Changed = 2;
    /**
     * The file got deleted.
     */
    FileChangeType.Deleted = 3;
})(FileChangeType || (exports.FileChangeType = FileChangeType = {}));
var RelativePattern;
(function (RelativePattern) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
    }
    RelativePattern.is = is;
})(RelativePattern || (exports.RelativePattern = RelativePattern = {}));
var WatchKind;
(function (WatchKind) {
    /**
     * Interested in create events.
     */
    WatchKind.Create = 1;
    /**
     * Interested in change events
     */
    WatchKind.Change = 2;
    /**
     * Interested in delete events
     */
    WatchKind.Delete = 4;
})(WatchKind || (exports.WatchKind = WatchKind = {}));
/**
 * Diagnostics notification are sent from the server to the client to signal
 * results of validation runs.
 */
var PublishDiagnosticsNotification;
(function (PublishDiagnosticsNotification) {
    PublishDiagnosticsNotification.method = 'textDocument/publishDiagnostics';
    PublishDiagnosticsNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    PublishDiagnosticsNotification.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification.method);
})(PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
/**
 * How a completion was triggered
 */
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    /**
     * Completion was triggered by typing an identifier (24x7 code
     * complete), manual invocation (e.g Ctrl+Space) or via API.
     */
    CompletionTriggerKind.Invoked = 1;
    /**
     * Completion was triggered by a trigger character specified by
     * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
     */
    CompletionTriggerKind.TriggerCharacter = 2;
    /**
     * Completion was re-triggered as current completion list is incomplete
     */
    CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
})(CompletionTriggerKind || (exports.CompletionTriggerKind = CompletionTriggerKind = {}));
/**
 * Request to request completion at a given text document position. The request's
 * parameter is of type {@link TextDocumentPosition} the response
 * is of type {@link CompletionItem CompletionItem[]} or {@link CompletionList}
 * or a Thenable that resolves to such.
 *
 * The request can delay the computation of the {@link CompletionItem.detail `detail`}
 * and {@link CompletionItem.documentation `documentation`} properties to the `completionItem/resolve`
 * request. However, properties that are needed for the initial sorting and filtering, like `sortText`,
 * `filterText`, `insertText`, and `textEdit`, must not be changed during resolve.
 */
var CompletionRequest;
(function (CompletionRequest) {
    CompletionRequest.method = 'textDocument/completion';
    CompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionRequest.type = new messages_1.ProtocolRequestType(CompletionRequest.method);
})(CompletionRequest || (exports.CompletionRequest = CompletionRequest = {}));
/**
 * Request to resolve additional information for a given completion item.The request's
 * parameter is of type {@link CompletionItem} the response
 * is of type {@link CompletionItem} or a Thenable that resolves to such.
 */
var CompletionResolveRequest;
(function (CompletionResolveRequest) {
    CompletionResolveRequest.method = 'completionItem/resolve';
    CompletionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionResolveRequest.type = new messages_1.ProtocolRequestType(CompletionResolveRequest.method);
})(CompletionResolveRequest || (exports.CompletionResolveRequest = CompletionResolveRequest = {}));
/**
 * Request to request hover information at a given text document position. The request's
 * parameter is of type {@link TextDocumentPosition} the response is of
 * type {@link Hover} or a Thenable that resolves to such.
 */
var HoverRequest;
(function (HoverRequest) {
    HoverRequest.method = 'textDocument/hover';
    HoverRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    HoverRequest.type = new messages_1.ProtocolRequestType(HoverRequest.method);
})(HoverRequest || (exports.HoverRequest = HoverRequest = {}));
/**
 * How a signature help was triggered.
 *
 * @since 3.15.0
 */
var SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    /**
     * Signature help was invoked manually by the user or by a command.
     */
    SignatureHelpTriggerKind.Invoked = 1;
    /**
     * Signature help was triggered by a trigger character.
     */
    SignatureHelpTriggerKind.TriggerCharacter = 2;
    /**
     * Signature help was triggered by the cursor moving or by the document content changing.
     */
    SignatureHelpTriggerKind.ContentChange = 3;
})(SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
var SignatureHelpRequest;
(function (SignatureHelpRequest) {
    SignatureHelpRequest.method = 'textDocument/signatureHelp';
    SignatureHelpRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SignatureHelpRequest.type = new messages_1.ProtocolRequestType(SignatureHelpRequest.method);
})(SignatureHelpRequest || (exports.SignatureHelpRequest = SignatureHelpRequest = {}));
/**
 * A request to resolve the definition location of a symbol at a given text
 * document position. The request's parameter is of type {@link TextDocumentPosition}
 * the response is of either type {@link Definition} or a typed array of
 * {@link DefinitionLink} or a Thenable that resolves to such.
 */
var DefinitionRequest;
(function (DefinitionRequest) {
    DefinitionRequest.method = 'textDocument/definition';
    DefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DefinitionRequest.type = new messages_1.ProtocolRequestType(DefinitionRequest.method);
})(DefinitionRequest || (exports.DefinitionRequest = DefinitionRequest = {}));
/**
 * A request to resolve project-wide references for the symbol denoted
 * by the given text document position. The request's parameter is of
 * type {@link ReferenceParams} the response is of type
 * {@link Location Location[]} or a Thenable that resolves to such.
 */
var ReferencesRequest;
(function (ReferencesRequest) {
    ReferencesRequest.method = 'textDocument/references';
    ReferencesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ReferencesRequest.type = new messages_1.ProtocolRequestType(ReferencesRequest.method);
})(ReferencesRequest || (exports.ReferencesRequest = ReferencesRequest = {}));
/**
 * Request to resolve a {@link DocumentHighlight} for a given
 * text document position. The request's parameter is of type {@link TextDocumentPosition}
 * the request response is an array of type {@link DocumentHighlight}
 * or a Thenable that resolves to such.
 */
var DocumentHighlightRequest;
(function (DocumentHighlightRequest) {
    DocumentHighlightRequest.method = 'textDocument/documentHighlight';
    DocumentHighlightRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentHighlightRequest.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest.method);
})(DocumentHighlightRequest || (exports.DocumentHighlightRequest = DocumentHighlightRequest = {}));
/**
 * A request to list all symbols found in a given text document. The request's
 * parameter is of type {@link TextDocumentIdentifier} the
 * response is of type {@link SymbolInformation SymbolInformation[]} or a Thenable
 * that resolves to such.
 */
var DocumentSymbolRequest;
(function (DocumentSymbolRequest) {
    DocumentSymbolRequest.method = 'textDocument/documentSymbol';
    DocumentSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentSymbolRequest.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest.method);
})(DocumentSymbolRequest || (exports.DocumentSymbolRequest = DocumentSymbolRequest = {}));
/**
 * A request to provide commands for the given text document and range.
 */
var CodeActionRequest;
(function (CodeActionRequest) {
    CodeActionRequest.method = 'textDocument/codeAction';
    CodeActionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionRequest.type = new messages_1.ProtocolRequestType(CodeActionRequest.method);
})(CodeActionRequest || (exports.CodeActionRequest = CodeActionRequest = {}));
/**
 * Request to resolve additional information for a given code action.The request's
 * parameter is of type {@link CodeAction} the response
 * is of type {@link CodeAction} or a Thenable that resolves to such.
 */
var CodeActionResolveRequest;
(function (CodeActionResolveRequest) {
    CodeActionResolveRequest.method = 'codeAction/resolve';
    CodeActionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionResolveRequest.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest.method);
})(CodeActionResolveRequest || (exports.CodeActionResolveRequest = CodeActionResolveRequest = {}));
/**
 * A request to list project-wide symbols matching the query string given
 * by the {@link WorkspaceSymbolParams}. The response is
 * of type {@link SymbolInformation SymbolInformation[]} or a Thenable that
 * resolves to such.
 *
 * @since 3.17.0 - support for WorkspaceSymbol in the returned data. Clients
 *  need to advertise support for WorkspaceSymbols via the client capability
 *  `workspace.symbol.resolveSupport`.
 *
 */
var WorkspaceSymbolRequest;
(function (WorkspaceSymbolRequest) {
    WorkspaceSymbolRequest.method = 'workspace/symbol';
    WorkspaceSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest.method);
})(WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
/**
 * A request to resolve the range inside the workspace
 * symbol's location.
 *
 * @since 3.17.0
 */
var WorkspaceSymbolResolveRequest;
(function (WorkspaceSymbolResolveRequest) {
    WorkspaceSymbolResolveRequest.method = 'workspaceSymbol/resolve';
    WorkspaceSymbolResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolResolveRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest.method);
})(WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
/**
 * A request to provide code lens for the given text document.
 */
var CodeLensRequest;
(function (CodeLensRequest) {
    CodeLensRequest.method = 'textDocument/codeLens';
    CodeLensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensRequest.type = new messages_1.ProtocolRequestType(CodeLensRequest.method);
})(CodeLensRequest || (exports.CodeLensRequest = CodeLensRequest = {}));
/**
 * A request to resolve a command for a given code lens.
 */
var CodeLensResolveRequest;
(function (CodeLensResolveRequest) {
    CodeLensResolveRequest.method = 'codeLens/resolve';
    CodeLensResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensResolveRequest.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest.method);
})(CodeLensResolveRequest || (exports.CodeLensResolveRequest = CodeLensResolveRequest = {}));
/**
 * A request to refresh all code actions
 *
 * @since 3.16.0
 */
var CodeLensRefreshRequest;
(function (CodeLensRefreshRequest) {
    CodeLensRefreshRequest.method = `workspace/codeLens/refresh`;
    CodeLensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    CodeLensRefreshRequest.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest.method);
})(CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
/**
 * A request to provide document links
 */
var DocumentLinkRequest;
(function (DocumentLinkRequest) {
    DocumentLinkRequest.method = 'textDocument/documentLink';
    DocumentLinkRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkRequest.type = new messages_1.ProtocolRequestType(DocumentLinkRequest.method);
})(DocumentLinkRequest || (exports.DocumentLinkRequest = DocumentLinkRequest = {}));
/**
 * Request to resolve additional information for a given document link. The request's
 * parameter is of type {@link DocumentLink} the response
 * is of type {@link DocumentLink} or a Thenable that resolves to such.
 */
var DocumentLinkResolveRequest;
(function (DocumentLinkResolveRequest) {
    DocumentLinkResolveRequest.method = 'documentLink/resolve';
    DocumentLinkResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkResolveRequest.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest.method);
})(DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
/**
 * A request to format a whole document.
 */
var DocumentFormattingRequest;
(function (DocumentFormattingRequest) {
    DocumentFormattingRequest.method = 'textDocument/formatting';
    DocumentFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest.method);
})(DocumentFormattingRequest || (exports.DocumentFormattingRequest = DocumentFormattingRequest = {}));
/**
 * A request to format a range in a document.
 */
var DocumentRangeFormattingRequest;
(function (DocumentRangeFormattingRequest) {
    DocumentRangeFormattingRequest.method = 'textDocument/rangeFormatting';
    DocumentRangeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest.method);
})(DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
/**
 * A request to format ranges in a document.
 *
 * @since 3.18.0
 * @proposed
 */
var DocumentRangesFormattingRequest;
(function (DocumentRangesFormattingRequest) {
    DocumentRangesFormattingRequest.method = 'textDocument/rangesFormatting';
    DocumentRangesFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangesFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest.method);
})(DocumentRangesFormattingRequest || (exports.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
/**
 * A request to format a document on type.
 */
var DocumentOnTypeFormattingRequest;
(function (DocumentOnTypeFormattingRequest) {
    DocumentOnTypeFormattingRequest.method = 'textDocument/onTypeFormatting';
    DocumentOnTypeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentOnTypeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
})(DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
//---- Rename ----------------------------------------------
var PrepareSupportDefaultBehavior;
(function (PrepareSupportDefaultBehavior) {
    /**
     * The client's default behavior is to select the identifier
     * according the to language's syntax rule.
     */
    PrepareSupportDefaultBehavior.Identifier = 1;
})(PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
/**
 * A request to rename a symbol.
 */
var RenameRequest;
(function (RenameRequest) {
    RenameRequest.method = 'textDocument/rename';
    RenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    RenameRequest.type = new messages_1.ProtocolRequestType(RenameRequest.method);
})(RenameRequest || (exports.RenameRequest = RenameRequest = {}));
/**
 * A request to test and perform the setup necessary for a rename.
 *
 * @since 3.16 - support for default behavior
 */
var PrepareRenameRequest;
(function (PrepareRenameRequest) {
    PrepareRenameRequest.method = 'textDocument/prepareRename';
    PrepareRenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    PrepareRenameRequest.type = new messages_1.ProtocolRequestType(PrepareRenameRequest.method);
})(PrepareRenameRequest || (exports.PrepareRenameRequest = PrepareRenameRequest = {}));
/**
 * A request send from the client to the server to execute a command. The request might return
 * a workspace edit which the client will apply to the workspace.
 */
var ExecuteCommandRequest;
(function (ExecuteCommandRequest) {
    ExecuteCommandRequest.method = 'workspace/executeCommand';
    ExecuteCommandRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ExecuteCommandRequest.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest.method);
})(ExecuteCommandRequest || (exports.ExecuteCommandRequest = ExecuteCommandRequest = {}));
/**
 * A request sent from the server to the client to modified certain resources.
 */
var ApplyWorkspaceEditRequest;
(function (ApplyWorkspaceEditRequest) {
    ApplyWorkspaceEditRequest.method = 'workspace/applyEdit';
    ApplyWorkspaceEditRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ApplyWorkspaceEditRequest.type = new messages_1.ProtocolRequestType('workspace/applyEdit');
})(ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));


/***/ }),

/***/ 35316:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkedEditingRangeRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide ranges that can be edited together.
 *
 * @since 3.16.0
 */
var LinkedEditingRangeRequest;
(function (LinkedEditingRangeRequest) {
    LinkedEditingRangeRequest.method = 'textDocument/linkedEditingRange';
    LinkedEditingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    LinkedEditingRangeRequest.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest.method);
})(LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));


/***/ }),

/***/ 9047:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * Moniker uniqueness level to define scope of the moniker.
 *
 * @since 3.16.0
 */
var UniquenessLevel;
(function (UniquenessLevel) {
    /**
     * The moniker is only unique inside a document
     */
    UniquenessLevel.document = 'document';
    /**
     * The moniker is unique inside a project for which a dump got created
     */
    UniquenessLevel.project = 'project';
    /**
     * The moniker is unique inside the group to which a project belongs
     */
    UniquenessLevel.group = 'group';
    /**
     * The moniker is unique inside the moniker scheme.
     */
    UniquenessLevel.scheme = 'scheme';
    /**
     * The moniker is globally unique
     */
    UniquenessLevel.global = 'global';
})(UniquenessLevel || (exports.UniquenessLevel = UniquenessLevel = {}));
/**
 * The moniker kind.
 *
 * @since 3.16.0
 */
var MonikerKind;
(function (MonikerKind) {
    /**
     * The moniker represent a symbol that is imported into a project
     */
    MonikerKind.$import = 'import';
    /**
     * The moniker represents a symbol that is exported from a project
     */
    MonikerKind.$export = 'export';
    /**
     * The moniker represents a symbol that is local to a project (e.g. a local
     * variable of a function, a class not visible outside the project, ...)
     */
    MonikerKind.local = 'local';
})(MonikerKind || (exports.MonikerKind = MonikerKind = {}));
/**
 * A request to get the moniker of a symbol at a given text document position.
 * The request parameter is of type {@link TextDocumentPositionParams}.
 * The response is of type {@link Moniker Moniker[]} or `null`.
 */
var MonikerRequest;
(function (MonikerRequest) {
    MonikerRequest.method = 'textDocument/moniker';
    MonikerRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    MonikerRequest.type = new messages_1.ProtocolRequestType(MonikerRequest.method);
})(MonikerRequest || (exports.MonikerRequest = MonikerRequest = {}));


/***/ }),

/***/ 53557:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = void 0;
const vscode_languageserver_types_1 = __webpack_require__(46203);
const Is = __webpack_require__(38598);
const messages_1 = __webpack_require__(90372);
/**
 * A notebook cell kind.
 *
 * @since 3.17.0
 */
var NotebookCellKind;
(function (NotebookCellKind) {
    /**
     * A markup-cell is formatted source that is used for display.
     */
    NotebookCellKind.Markup = 1;
    /**
     * A code-cell is source code.
     */
    NotebookCellKind.Code = 2;
    function is(value) {
        return value === 1 || value === 2;
    }
    NotebookCellKind.is = is;
})(NotebookCellKind || (exports.NotebookCellKind = NotebookCellKind = {}));
var ExecutionSummary;
(function (ExecutionSummary) {
    function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
            result.success = success;
        }
        return result;
    }
    ExecutionSummary.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === undefined || Is.boolean(candidate.success));
    }
    ExecutionSummary.is = is;
    function equals(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
    }
    ExecutionSummary.equals = equals;
})(ExecutionSummary || (exports.ExecutionSummary = ExecutionSummary = {}));
var NotebookCell;
(function (NotebookCell) {
    function create(kind, document) {
        return { kind, document };
    }
    NotebookCell.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) &&
            (candidate.metadata === undefined || Is.objectLiteral(candidate.metadata));
    }
    NotebookCell.is = is;
    function diff(one, two) {
        const result = new Set();
        if (one.document !== two.document) {
            result.add('document');
        }
        if (one.kind !== two.kind) {
            result.add('kind');
        }
        if (one.executionSummary !== two.executionSummary) {
            result.add('executionSummary');
        }
        if ((one.metadata !== undefined || two.metadata !== undefined) && !equalsMetadata(one.metadata, two.metadata)) {
            result.add('metadata');
        }
        if ((one.executionSummary !== undefined || two.executionSummary !== undefined) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
            result.add('executionSummary');
        }
        return result;
    }
    NotebookCell.diff = diff;
    function equalsMetadata(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        if (typeof one !== typeof other) {
            return false;
        }
        if (typeof one !== 'object') {
            return false;
        }
        const oneArray = Array.isArray(one);
        const otherArray = Array.isArray(other);
        if (oneArray !== otherArray) {
            return false;
        }
        if (oneArray && otherArray) {
            if (one.length !== other.length) {
                return false;
            }
            for (let i = 0; i < one.length; i++) {
                if (!equalsMetadata(one[i], other[i])) {
                    return false;
                }
            }
        }
        if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
            const oneKeys = Object.keys(one);
            const otherKeys = Object.keys(other);
            if (oneKeys.length !== otherKeys.length) {
                return false;
            }
            oneKeys.sort();
            otherKeys.sort();
            if (!equalsMetadata(oneKeys, otherKeys)) {
                return false;
            }
            for (let i = 0; i < oneKeys.length; i++) {
                const prop = oneKeys[i];
                if (!equalsMetadata(one[prop], other[prop])) {
                    return false;
                }
            }
        }
        return true;
    }
})(NotebookCell || (exports.NotebookCell = NotebookCell = {}));
var NotebookDocument;
(function (NotebookDocument) {
    function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
    }
    NotebookDocument.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
    }
    NotebookDocument.is = is;
})(NotebookDocument || (exports.NotebookDocument = NotebookDocument = {}));
var NotebookDocumentSyncRegistrationType;
(function (NotebookDocumentSyncRegistrationType) {
    NotebookDocumentSyncRegistrationType.method = 'notebookDocument/sync';
    NotebookDocumentSyncRegistrationType.messageDirection = messages_1.MessageDirection.clientToServer;
    NotebookDocumentSyncRegistrationType.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType.method);
})(NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
/**
 * A notification sent when a notebook opens.
 *
 * @since 3.17.0
 */
var DidOpenNotebookDocumentNotification;
(function (DidOpenNotebookDocumentNotification) {
    DidOpenNotebookDocumentNotification.method = 'notebookDocument/didOpen';
    DidOpenNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification.method);
    DidOpenNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
var NotebookCellArrayChange;
(function (NotebookCellArrayChange) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === undefined || Is.typedArray(candidate.cells, NotebookCell.is));
    }
    NotebookCellArrayChange.is = is;
    function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== undefined) {
            result.cells = cells;
        }
        return result;
    }
    NotebookCellArrayChange.create = create;
})(NotebookCellArrayChange || (exports.NotebookCellArrayChange = NotebookCellArrayChange = {}));
var DidChangeNotebookDocumentNotification;
(function (DidChangeNotebookDocumentNotification) {
    DidChangeNotebookDocumentNotification.method = 'notebookDocument/didChange';
    DidChangeNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification.method);
    DidChangeNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
/**
 * A notification sent when a notebook document is saved.
 *
 * @since 3.17.0
 */
var DidSaveNotebookDocumentNotification;
(function (DidSaveNotebookDocumentNotification) {
    DidSaveNotebookDocumentNotification.method = 'notebookDocument/didSave';
    DidSaveNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification.method);
    DidSaveNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
/**
 * A notification sent when a notebook closes.
 *
 * @since 3.17.0
 */
var DidCloseNotebookDocumentNotification;
(function (DidCloseNotebookDocumentNotification) {
    DidCloseNotebookDocumentNotification.method = 'notebookDocument/didClose';
    DidCloseNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification.method);
    DidCloseNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));


/***/ }),

/***/ 32687:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
const vscode_jsonrpc_1 = __webpack_require__(76439);
const messages_1 = __webpack_require__(90372);
var WorkDoneProgress;
(function (WorkDoneProgress) {
    WorkDoneProgress.type = new vscode_jsonrpc_1.ProgressType();
    function is(value) {
        return value === WorkDoneProgress.type;
    }
    WorkDoneProgress.is = is;
})(WorkDoneProgress || (exports.WorkDoneProgress = WorkDoneProgress = {}));
/**
 * The `window/workDoneProgress/create` request is sent from the server to the client to initiate progress
 * reporting from the server.
 */
var WorkDoneProgressCreateRequest;
(function (WorkDoneProgressCreateRequest) {
    WorkDoneProgressCreateRequest.method = 'window/workDoneProgress/create';
    WorkDoneProgressCreateRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkDoneProgressCreateRequest.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest.method);
})(WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
/**
 * The `window/workDoneProgress/cancel` notification is sent from  the client to the server to cancel a progress
 * initiated on the server side.
 */
var WorkDoneProgressCancelNotification;
(function (WorkDoneProgressCancelNotification) {
    WorkDoneProgressCancelNotification.method = 'window/workDoneProgress/cancel';
    WorkDoneProgressCancelNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkDoneProgressCancelNotification.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification.method);
})(WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));


/***/ }),

/***/ 33487:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectionRangeRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to provide selection ranges in a document. The request's
 * parameter is of type {@link SelectionRangeParams}, the
 * response is of type {@link SelectionRange SelectionRange[]} or a Thenable
 * that resolves to such.
 */
var SelectionRangeRequest;
(function (SelectionRangeRequest) {
    SelectionRangeRequest.method = 'textDocument/selectionRange';
    SelectionRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SelectionRangeRequest.type = new messages_1.ProtocolRequestType(SelectionRangeRequest.method);
})(SelectionRangeRequest || (exports.SelectionRangeRequest = SelectionRangeRequest = {}));


/***/ }),

/***/ 72478:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
const messages_1 = __webpack_require__(90372);
//------- 'textDocument/semanticTokens' -----
var TokenFormat;
(function (TokenFormat) {
    TokenFormat.Relative = 'relative';
})(TokenFormat || (exports.TokenFormat = TokenFormat = {}));
var SemanticTokensRegistrationType;
(function (SemanticTokensRegistrationType) {
    SemanticTokensRegistrationType.method = 'textDocument/semanticTokens';
    SemanticTokensRegistrationType.type = new messages_1.RegistrationType(SemanticTokensRegistrationType.method);
})(SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRequest;
(function (SemanticTokensRequest) {
    SemanticTokensRequest.method = 'textDocument/semanticTokens/full';
    SemanticTokensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
    SemanticTokensRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRequest || (exports.SemanticTokensRequest = SemanticTokensRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensDeltaRequest;
(function (SemanticTokensDeltaRequest) {
    SemanticTokensDeltaRequest.method = 'textDocument/semanticTokens/full/delta';
    SemanticTokensDeltaRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensDeltaRequest.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest.method);
    SemanticTokensDeltaRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRangeRequest;
(function (SemanticTokensRangeRequest) {
    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
    SemanticTokensRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
    SemanticTokensRangeRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRefreshRequest;
(function (SemanticTokensRefreshRequest) {
    SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
    SemanticTokensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    SemanticTokensRefreshRequest.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
})(SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));


/***/ }),

/***/ 80908:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowDocumentRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to show a document. This request might open an
 * external program depending on the value of the URI to open.
 * For example a request to open `https://code.visualstudio.com/`
 * will very likely open the URI in a WEB browser.
 *
 * @since 3.16.0
*/
var ShowDocumentRequest;
(function (ShowDocumentRequest) {
    ShowDocumentRequest.method = 'window/showDocument';
    ShowDocumentRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowDocumentRequest.type = new messages_1.ProtocolRequestType(ShowDocumentRequest.method);
})(ShowDocumentRequest || (exports.ShowDocumentRequest = ShowDocumentRequest = {}));


/***/ }),

/***/ 68461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeDefinitionRequest = void 0;
const messages_1 = __webpack_require__(90372);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type {@link TextDocumentPositionParams}
 * the response is of type {@link Definition} or a Thenable that resolves to such.
 */
var TypeDefinitionRequest;
(function (TypeDefinitionRequest) {
    TypeDefinitionRequest.method = 'textDocument/typeDefinition';
    TypeDefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeDefinitionRequest.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest.method);
})(TypeDefinitionRequest || (exports.TypeDefinitionRequest = TypeDefinitionRequest = {}));


/***/ }),

/***/ 50645:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * A request to result a `TypeHierarchyItem` in a document at a given position.
 * Can be used as an input to a subtypes or supertypes type hierarchy.
 *
 * @since 3.17.0
 */
var TypeHierarchyPrepareRequest;
(function (TypeHierarchyPrepareRequest) {
    TypeHierarchyPrepareRequest.method = 'textDocument/prepareTypeHierarchy';
    TypeHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest.method);
})(TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
/**
 * A request to resolve the supertypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */
var TypeHierarchySupertypesRequest;
(function (TypeHierarchySupertypesRequest) {
    TypeHierarchySupertypesRequest.method = 'typeHierarchy/supertypes';
    TypeHierarchySupertypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySupertypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest.method);
})(TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
/**
 * A request to resolve the subtypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */
var TypeHierarchySubtypesRequest;
(function (TypeHierarchySubtypesRequest) {
    TypeHierarchySubtypesRequest.method = 'typeHierarchy/subtypes';
    TypeHierarchySubtypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySubtypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest.method);
})(TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));


/***/ }),

/***/ 99935:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
const messages_1 = __webpack_require__(90372);
/**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */
var WorkspaceFoldersRequest;
(function (WorkspaceFoldersRequest) {
    WorkspaceFoldersRequest.method = 'workspace/workspaceFolders';
    WorkspaceFoldersRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkspaceFoldersRequest.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest.method);
})(WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
/**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */
var DidChangeWorkspaceFoldersNotification;
(function (DidChangeWorkspaceFoldersNotification) {
    DidChangeWorkspaceFoldersNotification.method = 'workspace/didChangeWorkspaceFolders';
    DidChangeWorkspaceFoldersNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWorkspaceFoldersNotification.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification.method);
})(DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));


/***/ }),

/***/ 38598:
/***/ ((__unused_webpack_module, exports) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.objectLiteral = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function objectLiteral(value) {
    // Strictly speaking class instances pass this check as well. Since the LSP
    // doesn't use classes we ignore this for now. If we do we need to add something
    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
    return value !== null && typeof value === 'object';
}
exports.objectLiteral = objectLiteral;


/***/ }),

/***/ 46203:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnnotatedTextEdit: () => (/* binding */ AnnotatedTextEdit),
/* harmony export */   ChangeAnnotation: () => (/* binding */ ChangeAnnotation),
/* harmony export */   ChangeAnnotationIdentifier: () => (/* binding */ ChangeAnnotationIdentifier),
/* harmony export */   CodeAction: () => (/* binding */ CodeAction),
/* harmony export */   CodeActionContext: () => (/* binding */ CodeActionContext),
/* harmony export */   CodeActionKind: () => (/* binding */ CodeActionKind),
/* harmony export */   CodeActionTriggerKind: () => (/* binding */ CodeActionTriggerKind),
/* harmony export */   CodeDescription: () => (/* binding */ CodeDescription),
/* harmony export */   CodeLens: () => (/* binding */ CodeLens),
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   ColorInformation: () => (/* binding */ ColorInformation),
/* harmony export */   ColorPresentation: () => (/* binding */ ColorPresentation),
/* harmony export */   Command: () => (/* binding */ Command),
/* harmony export */   CompletionItem: () => (/* binding */ CompletionItem),
/* harmony export */   CompletionItemKind: () => (/* binding */ CompletionItemKind),
/* harmony export */   CompletionItemLabelDetails: () => (/* binding */ CompletionItemLabelDetails),
/* harmony export */   CompletionItemTag: () => (/* binding */ CompletionItemTag),
/* harmony export */   CompletionList: () => (/* binding */ CompletionList),
/* harmony export */   CreateFile: () => (/* binding */ CreateFile),
/* harmony export */   DeleteFile: () => (/* binding */ DeleteFile),
/* harmony export */   Diagnostic: () => (/* binding */ Diagnostic),
/* harmony export */   DiagnosticRelatedInformation: () => (/* binding */ DiagnosticRelatedInformation),
/* harmony export */   DiagnosticSeverity: () => (/* binding */ DiagnosticSeverity),
/* harmony export */   DiagnosticTag: () => (/* binding */ DiagnosticTag),
/* harmony export */   DocumentHighlight: () => (/* binding */ DocumentHighlight),
/* harmony export */   DocumentHighlightKind: () => (/* binding */ DocumentHighlightKind),
/* harmony export */   DocumentLink: () => (/* binding */ DocumentLink),
/* harmony export */   DocumentSymbol: () => (/* binding */ DocumentSymbol),
/* harmony export */   DocumentUri: () => (/* binding */ DocumentUri),
/* harmony export */   EOL: () => (/* binding */ EOL),
/* harmony export */   FoldingRange: () => (/* binding */ FoldingRange),
/* harmony export */   FoldingRangeKind: () => (/* binding */ FoldingRangeKind),
/* harmony export */   FormattingOptions: () => (/* binding */ FormattingOptions),
/* harmony export */   Hover: () => (/* binding */ Hover),
/* harmony export */   InlayHint: () => (/* binding */ InlayHint),
/* harmony export */   InlayHintKind: () => (/* binding */ InlayHintKind),
/* harmony export */   InlayHintLabelPart: () => (/* binding */ InlayHintLabelPart),
/* harmony export */   InlineCompletionContext: () => (/* binding */ InlineCompletionContext),
/* harmony export */   InlineCompletionItem: () => (/* binding */ InlineCompletionItem),
/* harmony export */   InlineCompletionList: () => (/* binding */ InlineCompletionList),
/* harmony export */   InlineCompletionTriggerKind: () => (/* binding */ InlineCompletionTriggerKind),
/* harmony export */   InlineValueContext: () => (/* binding */ InlineValueContext),
/* harmony export */   InlineValueEvaluatableExpression: () => (/* binding */ InlineValueEvaluatableExpression),
/* harmony export */   InlineValueText: () => (/* binding */ InlineValueText),
/* harmony export */   InlineValueVariableLookup: () => (/* binding */ InlineValueVariableLookup),
/* harmony export */   InsertReplaceEdit: () => (/* binding */ InsertReplaceEdit),
/* harmony export */   InsertTextFormat: () => (/* binding */ InsertTextFormat),
/* harmony export */   InsertTextMode: () => (/* binding */ InsertTextMode),
/* harmony export */   Location: () => (/* binding */ Location),
/* harmony export */   LocationLink: () => (/* binding */ LocationLink),
/* harmony export */   MarkedString: () => (/* binding */ MarkedString),
/* harmony export */   MarkupContent: () => (/* binding */ MarkupContent),
/* harmony export */   MarkupKind: () => (/* binding */ MarkupKind),
/* harmony export */   OptionalVersionedTextDocumentIdentifier: () => (/* binding */ OptionalVersionedTextDocumentIdentifier),
/* harmony export */   ParameterInformation: () => (/* binding */ ParameterInformation),
/* harmony export */   Position: () => (/* binding */ Position),
/* harmony export */   Range: () => (/* binding */ Range),
/* harmony export */   RenameFile: () => (/* binding */ RenameFile),
/* harmony export */   SelectedCompletionInfo: () => (/* binding */ SelectedCompletionInfo),
/* harmony export */   SelectionRange: () => (/* binding */ SelectionRange),
/* harmony export */   SemanticTokenModifiers: () => (/* binding */ SemanticTokenModifiers),
/* harmony export */   SemanticTokenTypes: () => (/* binding */ SemanticTokenTypes),
/* harmony export */   SemanticTokens: () => (/* binding */ SemanticTokens),
/* harmony export */   SignatureInformation: () => (/* binding */ SignatureInformation),
/* harmony export */   StringValue: () => (/* binding */ StringValue),
/* harmony export */   SymbolInformation: () => (/* binding */ SymbolInformation),
/* harmony export */   SymbolKind: () => (/* binding */ SymbolKind),
/* harmony export */   SymbolTag: () => (/* binding */ SymbolTag),
/* harmony export */   TextDocument: () => (/* binding */ TextDocument),
/* harmony export */   TextDocumentEdit: () => (/* binding */ TextDocumentEdit),
/* harmony export */   TextDocumentIdentifier: () => (/* binding */ TextDocumentIdentifier),
/* harmony export */   TextDocumentItem: () => (/* binding */ TextDocumentItem),
/* harmony export */   TextEdit: () => (/* binding */ TextEdit),
/* harmony export */   URI: () => (/* binding */ URI),
/* harmony export */   VersionedTextDocumentIdentifier: () => (/* binding */ VersionedTextDocumentIdentifier),
/* harmony export */   WorkspaceChange: () => (/* binding */ WorkspaceChange),
/* harmony export */   WorkspaceEdit: () => (/* binding */ WorkspaceEdit),
/* harmony export */   WorkspaceFolder: () => (/* binding */ WorkspaceFolder),
/* harmony export */   WorkspaceSymbol: () => (/* binding */ WorkspaceSymbol),
/* harmony export */   integer: () => (/* binding */ integer),
/* harmony export */   uinteger: () => (/* binding */ uinteger)
/* harmony export */ });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

var DocumentUri;
(function (DocumentUri) {
    function is(value) {
        return typeof value === 'string';
    }
    DocumentUri.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI;
(function (URI) {
    function is(value) {
        return typeof value === 'string';
    }
    URI.is = is;
})(URI || (URI = {}));
var integer;
(function (integer) {
    integer.MIN_VALUE = -2147483648;
    integer.MAX_VALUE = 2147483647;
    function is(value) {
        return typeof value === 'number' && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
    }
    integer.is = is;
})(integer || (integer = {}));
var uinteger;
(function (uinteger) {
    uinteger.MIN_VALUE = 0;
    uinteger.MAX_VALUE = 2147483647;
    function is(value) {
        return typeof value === 'number' && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
    }
    uinteger.is = is;
})(uinteger || (uinteger = {}));
/**
 * The Position namespace provides helper functions to work with
 * {@link Position} literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
        }
        return { line, character };
    }
    Position.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Position} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * {@link Range} literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Range} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * {@link Location} literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri, range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Location} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * {@link LocationLink} literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the {@link LocationLink} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && Range.is(candidate.targetSelectionRange)
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * {@link Color} literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red,
            green,
            blue,
            alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Color} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1)
            && Is.numberRange(candidate.green, 0, 1)
            && Is.numberRange(candidate.blue, 0, 1)
            && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * {@link ColorInformation} literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range,
            color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * {@link ColorPresentation} literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label,
            textEdit,
            additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * A set of predefined range kinds.
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind.Comment = 'comment';
    /**
     * Folding range for an import or include
     */
    FoldingRangeKind.Imports = 'imports';
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind.Region = 'region';
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * {@link FoldingRange} literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
        const result = {
            startLine,
            endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        if (Is.defined(collapsedText)) {
            result.collapsedText = collapsedText;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the {@link FoldingRange} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * {@link DiagnosticRelatedInformation} literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location,
            message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */
var CodeDescription;
(function (CodeDescription) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.href);
    }
    CodeDescription.is = is;
})(CodeDescription || (CodeDescription = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * {@link Diagnostic} literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        let result = { range, message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Diagnostic} interface.
     */
    function is(value) {
        var _a;
        let candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.undefined(candidate.codeDescription) || (Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * {@link Command} literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command, ...args) {
        let result = { title, command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Command} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range, newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
    function create(label, needsConfirmation, description) {
        const result = { label };
        if (needsConfirmation !== undefined) {
            result.needsConfirmation = needsConfirmation;
        }
        if (description !== undefined) {
            result.description = description;
        }
        return result;
    }
    ChangeAnnotation.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) &&
            (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
    function is(value) {
        const candidate = value;
        return Is.string(candidate);
    }
    ChangeAnnotationIdentifier.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit) {
    /**
     * Creates an annotated replace text edit.
     *
     * @param range The range of text to be replaced.
     * @param newText The new text.
     * @param annotation The annotation.
     */
    function replace(range, newText, annotation) {
        return { range, newText, annotationId: annotation };
    }
    AnnotatedTextEdit.replace = replace;
    /**
     * Creates an annotated insert text edit.
     *
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     * @param annotation The annotation.
     */
    function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText, annotationId: annotation };
    }
    AnnotatedTextEdit.insert = insert;
    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */
    function del(range, annotation) {
        return { range, newText: '', annotationId: annotation };
    }
    AnnotatedTextEdit.del = del;
    function is(value) {
        const candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument, edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        let candidate = value;
        return Is.defined(candidate)
            && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options, annotation) {
        let result = {
            kind: 'create',
            uri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        let candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options, annotation) {
        let result = {
            kind: 'rename',
            oldUri,
            newUri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        let candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options, annotation) {
        let result = {
            kind: 'delete',
            uri
        };
        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        let candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        let candidate = value;
        return candidate &&
            (candidate.changes !== undefined || candidate.documentChanges !== undefined) &&
            (candidate.documentChanges === undefined || candidate.documentChanges.every((change) => {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
class TextEditChangeImpl {
    constructor(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
    }
    insert(position, newText, annotation) {
        let edit;
        let id;
        if (annotation === undefined) {
            edit = TextEdit.insert(position, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.insert(position, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    }
    replace(range, newText, annotation) {
        let edit;
        let id;
        if (annotation === undefined) {
            edit = TextEdit.replace(range, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.replace(range, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    }
    delete(range, annotation) {
        let edit;
        let id;
        if (annotation === undefined) {
            edit = TextEdit.del(range);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.del(range, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    }
    add(edit) {
        this.edits.push(edit);
    }
    all() {
        return this.edits;
    }
    clear() {
        this.edits.splice(0, this.edits.length);
    }
    assertChangeAnnotations(value) {
        if (value === undefined) {
            throw new Error(`Text edit change is not configured to manage change annotations.`);
        }
    }
}
/**
 * A helper class
 */
class ChangeAnnotations {
    constructor(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
    }
    all() {
        return this._annotations;
    }
    get size() {
        return this._size;
    }
    manage(idOrAnnotation, annotation) {
        let id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
            id = idOrAnnotation;
        }
        else {
            id = this.nextId();
            annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
            throw new Error(`Id ${id} is already in use.`);
        }
        if (annotation === undefined) {
            throw new Error(`No annotation provided for id ${id}`);
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
    }
    nextId() {
        this._counter++;
        return this._counter.toString();
    }
}
/**
 * A workspace change helps constructing changes to a workspace.
 */
class WorkspaceChange {
    constructor(workspaceEdit) {
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach((change) => {
                    if (TextDocumentEdit.is(change)) {
                        const textEditChange = new TextEditChangeImpl(change.edits, this._changeAnnotations);
                        this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach((key) => {
                    const textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    this._textEditChanges[key] = textEditChange;
                });
            }
        }
        else {
            this._workspaceEdit = {};
        }
    }
    /**
     * Returns the underlying {@link WorkspaceEdit} literal
     * use to be returned from a workspace edit operation like rename.
     */
    get edit() {
        this.initDocumentChanges();
        if (this._changeAnnotations !== undefined) {
            if (this._changeAnnotations.size === 0) {
                this._workspaceEdit.changeAnnotations = undefined;
            }
            else {
                this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            }
        }
        return this._workspaceEdit;
    }
    getTextEditChange(key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === undefined) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            const textDocument = { uri: key.uri, version: key.version };
            let result = this._textEditChanges[textDocument.uri];
            if (!result) {
                const edits = [];
                const textDocumentEdit = {
                    textDocument,
                    edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            this.initChanges();
            if (this._workspaceEdit.changes === undefined) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            let result = this._textEditChanges[key];
            if (!result) {
                let edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    }
    initDocumentChanges() {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._changeAnnotations = new ChangeAnnotations();
            this._workspaceEdit.documentChanges = [];
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
    }
    initChanges() {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._workspaceEdit.changes = Object.create(null);
        }
    }
    createFile(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === undefined) {
            operation = CreateFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    }
    renameFile(oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === undefined) {
            operation = RenameFile.create(oldUri, newUri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    }
    deleteFile(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === undefined) {
            operation = DeleteFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    }
}
/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * {@link TextDocumentIdentifier} literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link TextDocumentIdentifier} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * {@link VersionedTextDocumentIdentifier} literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */
    function create(uri, version) {
        return { uri, version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link VersionedTextDocumentIdentifier} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
 * {@link OptionalVersionedTextDocumentIdentifier} literals.
 */
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier) {
    /**
     * Creates a new OptionalVersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */
    function create(uri, version) {
        return { uri, version };
    }
    OptionalVersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link OptionalVersionedTextDocumentIdentifier} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * {@link TextDocumentItem} literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri, languageId, version, text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
    /**
     * Checks whether the given value is a value of the {@link MarkupKind} type.
     */
    function is(value) {
        const candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the {@link MarkupContent} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
var CompletionItemTag;
(function (CompletionItemTag) {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */
var InsertReplaceEdit;
(function (InsertReplaceEdit) {
    /**
     * Creates a new insert / replace edit
     */
    function create(newText, insert, replace) {
        return { newText, insert, replace };
    }
    InsertReplaceEdit.create = create;
    /**
     * Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
     */
    function is(value) {
        const candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
    }
    InsertReplaceEdit.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
var InsertTextMode;
(function (InsertTextMode) {
    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */
    InsertTextMode.asIs = 1;
    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */
    InsertTextMode.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function (CompletionItemLabelDetails) {
    function is(value) {
        const candidate = value;
        return candidate && (Is.string(candidate.detail) || candidate.detail === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    CompletionItemLabelDetails.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the {@link MarkedString} type.
     */
    function is(value) {
        const candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the {@link Hover} interface.
     */
    function is(value) {
        let candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * {@link ParameterInformation} literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label, documentation } : { label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * {@link SignatureInformation} literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation, ...parameters) {
        let result = { label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * {@link DocumentHighlight} literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     * @param kind The highlight kind
     */
    function create(range, kind) {
        let result = { range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 *
 * @since 3.16
 */
var SymbolTag;
(function (SymbolTag) {
    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */
    SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        let result = {
            name,
            kind,
            location: { uri, range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function (WorkspaceSymbol) {
    /**
     * Create a new workspace symbol.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param uri The resource of the location of the symbol.
     * @param range An options range of the location.
     * @returns A WorkspaceSymbol.
     */
    function create(name, kind, uri, range) {
        return range !== undefined
            ? { name, kind, location: { uri, range } }
            : { name, kind, location: { uri } };
    }
    WorkspaceSymbol.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        let result = {
            name,
            detail,
            kind,
            range,
            selectionRange
        };
        if (children !== undefined) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the {@link DocumentSymbol} interface.
     */
    function is(value) {
        let candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === undefined || Is.string(candidate.detail)) &&
            (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) &&
            (candidate.children === undefined || Array.isArray(candidate.children)) &&
            (candidate.tags === undefined || Array.isArray(candidate.tags));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Empty kind.
     */
    CodeActionKind.Empty = '';
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */
    CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The reason why code actions were requested.
 *
 * @since 3.17.0
 */
var CodeActionTriggerKind;
(function (CodeActionTriggerKind) {
    /**
     * Code actions were explicitly requested by the user or by an extension.
     */
    CodeActionTriggerKind.Invoked = 1;
    /**
     * Code actions were requested automatically.
     *
     * This typically happens when current selection in a file changes, but can
     * also be triggered when file content changes.
     */
    CodeActionTriggerKind.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * {@link CodeActionContext} literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only, triggerKind) {
        let result = { diagnostics };
        if (only !== undefined && only !== null) {
            result.only = only;
        }
        if (triggerKind !== undefined && triggerKind !== null) {
            result.triggerKind = triggerKind;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the {@link CodeActionContext} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is)
            && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string))
            && (candidate.triggerKind === undefined || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, kindOrCommandOrEdit, kind) {
        let result = { title };
        let checkKind = true;
        if (typeof kindOrCommandOrEdit === 'string') {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
        }
        else if (Command.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
        }
        else {
            result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        let candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === undefined || Is.string(candidate.kind)) &&
            (candidate.edit !== undefined || candidate.command !== undefined) &&
            (candidate.command === undefined || Command.is(candidate.command)) &&
            (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) &&
            (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * {@link CodeLens} literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        let result = { range };
        if (Is.defined(data)) {
            result.data = data;
        }
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the {@link CodeLens} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * {@link FormattingOptions} literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize, insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the {@link FormattingOptions} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * The DocumentLink namespace provides helper functions to work with
 * {@link DocumentLink} literals.
 */
var DocumentLink;
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range, target, data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the {@link DocumentLink} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range, parent };
    }
    SelectionRange.create = create;
    function is(value) {
        let candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
/**
 * A set of predefined token types. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenTypes;
(function (SemanticTokenTypes) {
    SemanticTokenTypes["namespace"] = "namespace";
    /**
     * Represents a generic type. Acts as a fallback for types which can't be mapped to
     * a specific type like class or enum.
     */
    SemanticTokenTypes["type"] = "type";
    SemanticTokenTypes["class"] = "class";
    SemanticTokenTypes["enum"] = "enum";
    SemanticTokenTypes["interface"] = "interface";
    SemanticTokenTypes["struct"] = "struct";
    SemanticTokenTypes["typeParameter"] = "typeParameter";
    SemanticTokenTypes["parameter"] = "parameter";
    SemanticTokenTypes["variable"] = "variable";
    SemanticTokenTypes["property"] = "property";
    SemanticTokenTypes["enumMember"] = "enumMember";
    SemanticTokenTypes["event"] = "event";
    SemanticTokenTypes["function"] = "function";
    SemanticTokenTypes["method"] = "method";
    SemanticTokenTypes["macro"] = "macro";
    SemanticTokenTypes["keyword"] = "keyword";
    SemanticTokenTypes["modifier"] = "modifier";
    SemanticTokenTypes["comment"] = "comment";
    SemanticTokenTypes["string"] = "string";
    SemanticTokenTypes["number"] = "number";
    SemanticTokenTypes["regexp"] = "regexp";
    SemanticTokenTypes["operator"] = "operator";
    /**
     * @since 3.17.0
     */
    SemanticTokenTypes["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
/**
 * A set of predefined token modifiers. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenModifiers;
(function (SemanticTokenModifiers) {
    SemanticTokenModifiers["declaration"] = "declaration";
    SemanticTokenModifiers["definition"] = "definition";
    SemanticTokenModifiers["readonly"] = "readonly";
    SemanticTokenModifiers["static"] = "static";
    SemanticTokenModifiers["deprecated"] = "deprecated";
    SemanticTokenModifiers["abstract"] = "abstract";
    SemanticTokenModifiers["async"] = "async";
    SemanticTokenModifiers["modification"] = "modification";
    SemanticTokenModifiers["documentation"] = "documentation";
    SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
/**
 * @since 3.16.0
 */
var SemanticTokens;
(function (SemanticTokens) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.resultId === undefined || typeof candidate.resultId === 'string') &&
            Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === 'number');
    }
    SemanticTokens.is = is;
})(SemanticTokens || (SemanticTokens = {}));
/**
 * The InlineValueText namespace provides functions to deal with InlineValueTexts.
 *
 * @since 3.17.0
 */
var InlineValueText;
(function (InlineValueText) {
    /**
     * Creates a new InlineValueText literal.
     */
    function create(range, text) {
        return { range, text };
    }
    InlineValueText.create = create;
    function is(value) {
        const candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
    }
    InlineValueText.is = is;
})(InlineValueText || (InlineValueText = {}));
/**
 * The InlineValueVariableLookup namespace provides functions to deal with InlineValueVariableLookups.
 *
 * @since 3.17.0
 */
var InlineValueVariableLookup;
(function (InlineValueVariableLookup) {
    /**
     * Creates a new InlineValueText literal.
     */
    function create(range, variableName, caseSensitiveLookup) {
        return { range, variableName, caseSensitiveLookup };
    }
    InlineValueVariableLookup.create = create;
    function is(value) {
        const candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup)
            && (Is.string(candidate.variableName) || candidate.variableName === undefined);
    }
    InlineValueVariableLookup.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
/**
 * The InlineValueEvaluatableExpression namespace provides functions to deal with InlineValueEvaluatableExpression.
 *
 * @since 3.17.0
 */
var InlineValueEvaluatableExpression;
(function (InlineValueEvaluatableExpression) {
    /**
     * Creates a new InlineValueEvaluatableExpression literal.
     */
    function create(range, expression) {
        return { range, expression };
    }
    InlineValueEvaluatableExpression.create = create;
    function is(value) {
        const candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range)
            && (Is.string(candidate.expression) || candidate.expression === undefined);
    }
    InlineValueEvaluatableExpression.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
/**
 * The InlineValueContext namespace provides helper functions to work with
 * {@link InlineValueContext} literals.
 *
 * @since 3.17.0
 */
var InlineValueContext;
(function (InlineValueContext) {
    /**
     * Creates a new InlineValueContext literal.
     */
    function create(frameId, stoppedLocation) {
        return { frameId, stoppedLocation };
    }
    InlineValueContext.create = create;
    /**
     * Checks whether the given literal conforms to the {@link InlineValueContext} interface.
     */
    function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Range.is(value.stoppedLocation);
    }
    InlineValueContext.is = is;
})(InlineValueContext || (InlineValueContext = {}));
/**
 * Inlay hint kinds.
 *
 * @since 3.17.0
 */
var InlayHintKind;
(function (InlayHintKind) {
    /**
     * An inlay hint that for a type annotation.
     */
    InlayHintKind.Type = 1;
    /**
     * An inlay hint that is for a parameter.
     */
    InlayHintKind.Parameter = 2;
    function is(value) {
        return value === 1 || value === 2;
    }
    InlayHintKind.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function (InlayHintLabelPart) {
    function create(value) {
        return { value };
    }
    InlayHintLabelPart.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate)
            && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip))
            && (candidate.location === undefined || Location.is(candidate.location))
            && (candidate.command === undefined || Command.is(candidate.command));
    }
    InlayHintLabelPart.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function (InlayHint) {
    function create(position, label, kind) {
        const result = { position, label };
        if (kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    InlayHint.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.position)
            && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is))
            && (candidate.kind === undefined || InlayHintKind.is(candidate.kind))
            && (candidate.textEdits === undefined) || Is.typedArray(candidate.textEdits, TextEdit.is)
            && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip))
            && (candidate.paddingLeft === undefined || Is.boolean(candidate.paddingLeft))
            && (candidate.paddingRight === undefined || Is.boolean(candidate.paddingRight));
    }
    InlayHint.is = is;
})(InlayHint || (InlayHint = {}));
var StringValue;
(function (StringValue) {
    function createSnippet(value) {
        return { kind: 'snippet', value };
    }
    StringValue.createSnippet = createSnippet;
})(StringValue || (StringValue = {}));
var InlineCompletionItem;
(function (InlineCompletionItem) {
    function create(insertText, filterText, range, command) {
        return { insertText, filterText, range, command };
    }
    InlineCompletionItem.create = create;
})(InlineCompletionItem || (InlineCompletionItem = {}));
var InlineCompletionList;
(function (InlineCompletionList) {
    function create(items) {
        return { items };
    }
    InlineCompletionList.create = create;
})(InlineCompletionList || (InlineCompletionList = {}));
/**
 * Describes how an {@link InlineCompletionItemProvider inline completion provider} was triggered.
 *
 * @since 3.18.0
 * @proposed
 */
var InlineCompletionTriggerKind;
(function (InlineCompletionTriggerKind) {
    /**
     * Completion was triggered explicitly by a user gesture.
     */
    InlineCompletionTriggerKind.Invoked = 0;
    /**
     * Completion was triggered automatically while editing.
     */
    InlineCompletionTriggerKind.Automatic = 1;
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
var SelectedCompletionInfo;
(function (SelectedCompletionInfo) {
    function create(range, text) {
        return { range, text };
    }
    SelectedCompletionInfo.create = create;
})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
var InlineCompletionContext;
(function (InlineCompletionContext) {
    function create(triggerKind, selectedCompletionInfo) {
        return { triggerKind, selectedCompletionInfo };
    }
    InlineCompletionContext.create = create;
})(InlineCompletionContext || (InlineCompletionContext = {}));
var WorkspaceFolder;
(function (WorkspaceFolder) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
    }
    WorkspaceFolder.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
const EOL = ['\n', '\r\n', '\r'];
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId The document's language Id.
     * @param version The document's version.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the {@link ITextDocument} interface.
     */
    function is(value) {
        let candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        let text = document.getText();
        let sortedEdits = mergeSort(edits, (a, b) => {
            let diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        let lastModifiedOffset = text.length;
        for (let i = sortedEdits.length - 1; i >= 0; i--) {
            let e = sortedEdits[i];
            let startOffset = document.offsetAt(e.range.start);
            let endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        const p = (data.length / 2) | 0;
        const left = data.slice(0, p);
        const right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        let leftIdx = 0;
        let rightIdx = 0;
        let i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            let ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
class FullTextDocument {
    constructor(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    get uri() {
        return this._uri;
    }
    get languageId() {
        return this._languageId;
    }
    get version() {
        return this._version;
    }
    getText(range) {
        if (range) {
            let start = this.offsetAt(range.start);
            let end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    }
    update(event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    }
    getLineOffsets() {
        if (this._lineOffsets === undefined) {
            let lineOffsets = [];
            let text = this._content;
            let isLineStart = true;
            for (let i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                let ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    }
    positionAt(offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        let lineOffsets = this.getLineOffsets();
        let low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        let line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    }
    offsetAt(position) {
        let lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        let lineOffset = lineOffsets[position.line];
        let nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    }
    get lineCount() {
        return this.getLineOffsets().length;
    }
}
var Is;
(function (Is) {
    const toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function numberRange(value, min, max) {
        return toString.call(value) === '[object Number]' && min <= value && value <= max;
    }
    Is.numberRange = numberRange;
    function integer(value) {
        return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
    }
    Is.integer = integer;
    function uinteger(value) {
        return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
    }
    Is.uinteger = uinteger;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0hBQW9I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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0JBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9icm93c2VyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2Jyb3dzZXIvbWFpbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9icm93c2VyL3JpbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vYXBpLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9jYW5jZWxsYXRpb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2Nvbm5lY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2Rpc3Bvc2FibGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vaXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2xpbmtlZE1hcC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vbWVzc2FnZUJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vbWVzc2FnZVJlYWRlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vbWVzc2FnZVdyaXRlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vbWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL3JhbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vc2VtYXBob3JlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9zaGFyZWRBcnJheUNhbmNlbGxhdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9icm93c2VyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9icm93c2VyL21haW4uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9jb25uZWN0aW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vbWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5jYWxsSGllcmFyY2h5LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuY29sb3JQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmNvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5kZWNsYXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmRpYWdub3N0aWMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5maWxlT3BlcmF0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmZvbGRpbmdSYW5nZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuaW5sYXlIaW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuaW5saW5lQ29tcGxldGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmlubGluZVZhbHVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5saW5rZWRFZGl0aW5nUmFuZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5tb25pa2VyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wubm90ZWJvb2suanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLnNlbGVjdGlvblJhbmdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuc2VtYW50aWNUb2tlbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5zaG93RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC50eXBlRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLnR5cGVIaWVyYXJjaHkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC53b3Jrc3BhY2VGb2xkZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi91dGlscy9pcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9saWIvZXNtL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYnJvd3Nlci9tYWluJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24gPSBleHBvcnRzLkJyb3dzZXJNZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5Ccm93c2VyTWVzc2FnZVJlYWRlciA9IHZvaWQgMDtcbmNvbnN0IHJpbF8xID0gcmVxdWlyZShcIi4vcmlsXCIpO1xuLy8gSW5zdGFsbCB0aGUgYnJvd3NlciBydW50aW1lIGFic3RyYWN0LlxucmlsXzEuZGVmYXVsdC5pbnN0YWxsKCk7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpLCBleHBvcnRzKTtcbmNsYXNzIEJyb3dzZXJNZXNzYWdlUmVhZGVyIGV4dGVuZHMgYXBpXzEuQWJzdHJhY3RNZXNzYWdlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3J0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX29uRGF0YSA9IG5ldyBhcGlfMS5FbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25EYXRhLmZpcmUoZXZlbnQuZGF0YSk7XG4gICAgICAgIH07XG4gICAgICAgIHBvcnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZlbnQpID0+IHRoaXMuZmlyZUVycm9yKGV2ZW50KSk7XG4gICAgICAgIHBvcnQub25tZXNzYWdlID0gdGhpcy5fbWVzc2FnZUxpc3RlbmVyO1xuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uRGF0YS5ldmVudChjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5Ccm93c2VyTWVzc2FnZVJlYWRlciA9IEJyb3dzZXJNZXNzYWdlUmVhZGVyO1xuY2xhc3MgQnJvd3Nlck1lc3NhZ2VXcml0ZXIgZXh0ZW5kcyBhcGlfMS5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBvcnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy5lcnJvckNvdW50ID0gMDtcbiAgICAgICAgcG9ydC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4gdGhpcy5maXJlRXJyb3IoZXZlbnQpKTtcbiAgICB9XG4gICAgd3JpdGUobXNnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIG1zZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtc2cpIHtcbiAgICAgICAgdGhpcy5lcnJvckNvdW50Kys7XG4gICAgICAgIHRoaXMuZmlyZUVycm9yKGVycm9yLCBtc2csIHRoaXMuZXJyb3JDb3VudCk7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICB9XG59XG5leHBvcnRzLkJyb3dzZXJNZXNzYWdlV3JpdGVyID0gQnJvd3Nlck1lc3NhZ2VXcml0ZXI7XG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlQ29ubmVjdGlvbihyZWFkZXIsIHdyaXRlciwgbG9nZ2VyLCBvcHRpb25zKSB7XG4gICAgaWYgKGxvZ2dlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlciA9IGFwaV8xLk51bGxMb2dnZXI7XG4gICAgfVxuICAgIGlmIChhcGlfMS5Db25uZWN0aW9uU3RyYXRlZ3kuaXMob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgY29ubmVjdGlvblN0cmF0ZWd5OiBvcHRpb25zIH07XG4gICAgfVxuICAgIHJldHVybiAoMCwgYXBpXzEuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24pKHJlYWRlciwgd3JpdGVyLCBsb2dnZXIsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGNyZWF0ZU1lc3NhZ2VDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpO1xuY2xhc3MgTWVzc2FnZUJ1ZmZlciBleHRlbmRzIGFwaV8xLkFic3RyYWN0TWVzc2FnZUJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoZW5jb2RpbmcgPSAndXRmLTgnKSB7XG4gICAgICAgIHN1cGVyKGVuY29kaW5nKTtcbiAgICAgICAgdGhpcy5hc2NpaURlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ2FzY2lpJyk7XG4gICAgfVxuICAgIGVtcHR5QnVmZmVyKCkge1xuICAgICAgICByZXR1cm4gTWVzc2FnZUJ1ZmZlci5lbXB0eUJ1ZmZlcjtcbiAgICB9XG4gICAgZnJvbVN0cmluZyh2YWx1ZSwgX2VuY29kaW5nKSB7XG4gICAgICAgIHJldHVybiAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKHZhbHVlLCBlbmNvZGluZykge1xuICAgICAgICBpZiAoZW5jb2RpbmcgPT09ICdhc2NpaScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzY2lpRGVjb2Rlci5kZWNvZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVGV4dERlY29kZXIoZW5jb2RpbmcpKS5kZWNvZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzTmF0aXZlKGJ1ZmZlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXIuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbGxvY05hdGl2ZShsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgfVxufVxuTWVzc2FnZUJ1ZmZlci5lbXB0eUJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDApO1xuY2xhc3MgUmVhZGFibGVTdHJlYW1XcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihzb2NrZXQpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICAgIHRoaXMuX29uRGF0YSA9IG5ldyBhcGlfMS5FbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBibG9iLmFycmF5QnVmZmVyKCkudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25EYXRhLmZpcmUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgKDAsIGFwaV8xLlJBTCkoKS5jb25zb2xlLmVycm9yKGBDb252ZXJ0aW5nIGJsb2IgdG8gYXJyYXkgYnVmZmVyIGZhaWxlZC5gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5fbWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgb25DbG9zZShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIGFwaV8xLkRpc3Bvc2FibGUuY3JlYXRlKCgpID0+IHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25FcnJvcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIGFwaV8xLkRpc3Bvc2FibGUuY3JlYXRlKCgpID0+IHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25FbmQobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZW5kJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25EYXRhKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkRhdGEuZXZlbnQobGlzdGVuZXIpO1xuICAgIH1cbn1cbmNsYXNzIFdyaXRhYmxlU3RyZWFtV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3Ioc29ja2V0KSB7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIH1cbiAgICBvbkNsb3NlKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICBvbkVycm9yKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICBvbkVuZChsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlbmQnLCBsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiBhcGlfMS5EaXNwb3NhYmxlLmNyZWF0ZSgoKSA9PiB0aGlzLnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmQnLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICB3cml0ZShkYXRhLCBlbmNvZGluZykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiBlbmNvZGluZyAhPT0gJ3V0Zi04Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW4gYSBCcm93c2VyIGVudmlyb25tZW50cyBvbmx5IHV0Zi04IHRleHQgZW5jb2RpbmcgaXMgc3VwcG9ydGVkLiBCdXQgZ290IGVuY29kaW5nOiAke2VuY29kaW5nfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgfVxufVxuY29uc3QgX3RleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5jb25zdCBfcmlsID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgbWVzc2FnZUJ1ZmZlcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGNyZWF0ZTogKGVuY29kaW5nKSA9PiBuZXcgTWVzc2FnZUJ1ZmZlcihlbmNvZGluZylcbiAgICB9KSxcbiAgICBhcHBsaWNhdGlvbkpzb246IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBlbmNvZGVyOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIG5hbWU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIGVuY29kZTogKG1zZywgb3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgIT09ICd1dGYtOCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbiBhIEJyb3dzZXIgZW52aXJvbm1lbnRzIG9ubHkgdXRmLTggdGV4dCBlbmNvZGluZyBpcyBzdXBwb3J0ZWQuIEJ1dCBnb3QgZW5jb2Rpbmc6ICR7b3B0aW9ucy5jaGFyc2V0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF90ZXh0RW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkobXNnLCB1bmRlZmluZWQsIDApKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZWNvZGVyOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIG5hbWU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIGRlY29kZTogKGJ1ZmZlciwgb3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW4gYSBCcm93c2VyIGVudmlyb25tZW50cyBvbmx5IFVpbnQ4QXJyYXlzIGFyZSBzdXBwb3J0ZWQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShuZXcgVGV4dERlY29kZXIob3B0aW9ucy5jaGFyc2V0KS5kZWNvZGUoYnVmZmVyKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pLFxuICAgIHN0cmVhbTogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGFzUmVhZGFibGVTdHJlYW06IChzb2NrZXQpID0+IG5ldyBSZWFkYWJsZVN0cmVhbVdyYXBwZXIoc29ja2V0KSxcbiAgICAgICAgYXNXcml0YWJsZVN0cmVhbTogKHNvY2tldCkgPT4gbmV3IFdyaXRhYmxlU3RyZWFtV3JhcHBlcihzb2NrZXQpXG4gICAgfSksXG4gICAgY29uc29sZTogY29uc29sZSxcbiAgICB0aW1lcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcywgLi4uYXJncyk7XG4gICAgICAgICAgICByZXR1cm4geyBkaXNwb3NlOiAoKSA9PiBjbGVhclRpbWVvdXQoaGFuZGxlKSB9O1xuICAgICAgICB9LFxuICAgICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2ssIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIDAsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGlzcG9zZTogKCkgPT4gY2xlYXJUaW1lb3V0KGhhbmRsZSkgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIG1zLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRJbnRlcnZhbChjYWxsYmFjaywgbXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGlzcG9zZTogKCkgPT4gY2xlYXJJbnRlcnZhbChoYW5kbGUpIH07XG4gICAgICAgIH0sXG4gICAgfSlcbn0pO1xuZnVuY3Rpb24gUklMKCkge1xuICAgIHJldHVybiBfcmlsO1xufVxuKGZ1bmN0aW9uIChSSUwpIHtcbiAgICBmdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgICAgICBhcGlfMS5SQUwuaW5zdGFsbChfcmlsKTtcbiAgICB9XG4gICAgUklMLmluc3RhbGwgPSBpbnN0YWxsO1xufSkoUklMIHx8IChSSUwgPSB7fSkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUklMO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy90aGVuYWJsZS5kLnRzXCIgLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUHJvZ3Jlc3NUeXBlID0gZXhwb3J0cy5Qcm9ncmVzc1Rva2VuID0gZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGV4cG9ydHMuTnVsbExvZ2dlciA9IGV4cG9ydHMuQ29ubmVjdGlvbk9wdGlvbnMgPSBleHBvcnRzLkNvbm5lY3Rpb25TdHJhdGVneSA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlQnVmZmVyID0gZXhwb3J0cy5Xcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIgPSBleHBvcnRzLk1lc3NhZ2VXcml0ZXIgPSBleHBvcnRzLlJlYWRhYmxlU3RyZWFtTWVzc2FnZVJlYWRlciA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlUmVhZGVyID0gZXhwb3J0cy5NZXNzYWdlUmVhZGVyID0gZXhwb3J0cy5TaGFyZWRBcnJheVJlY2VpdmVyU3RyYXRlZ3kgPSBleHBvcnRzLlNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblRva2VuID0gZXhwb3J0cy5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZSA9IGV4cG9ydHMuRW1pdHRlciA9IGV4cG9ydHMuRXZlbnQgPSBleHBvcnRzLkRpc3Bvc2FibGUgPSBleHBvcnRzLkxSVUNhY2hlID0gZXhwb3J0cy5Ub3VjaCA9IGV4cG9ydHMuTGlua2VkTWFwID0gZXhwb3J0cy5QYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlOSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTggPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU3ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTUgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU0ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMyA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTIgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGUxID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuRXJyb3JDb2RlcyA9IGV4cG9ydHMuUmVzcG9uc2VFcnJvciA9IGV4cG9ydHMuUmVxdWVzdFR5cGU5ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTggPSBleHBvcnRzLlJlcXVlc3RUeXBlNyA9IGV4cG9ydHMuUmVxdWVzdFR5cGU2ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTUgPSBleHBvcnRzLlJlcXVlc3RUeXBlNCA9IGV4cG9ydHMuUmVxdWVzdFR5cGUzID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTIgPSBleHBvcnRzLlJlcXVlc3RUeXBlMSA9IGV4cG9ydHMuUmVxdWVzdFR5cGUwID0gZXhwb3J0cy5SZXF1ZXN0VHlwZSA9IGV4cG9ydHMuTWVzc2FnZSA9IGV4cG9ydHMuUkFMID0gdm9pZCAwO1xuZXhwb3J0cy5NZXNzYWdlU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblN0cmF0ZWd5ID0gZXhwb3J0cy5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneSA9IGV4cG9ydHMuQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuQ29ubmVjdGlvbkVycm9yID0gZXhwb3J0cy5Db25uZWN0aW9uRXJyb3JzID0gZXhwb3J0cy5Mb2dUcmFjZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuU2V0VHJhY2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlRyYWNlRm9ybWF0ID0gZXhwb3J0cy5UcmFjZVZhbHVlcyA9IGV4cG9ydHMuVHJhY2UgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZXNzYWdlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk1lc3NhZ2U7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlMFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTA7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGUxOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGUyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlMjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlM1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGU0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGU1XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlNTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlNlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTY7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTdcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGU3OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGU4XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlODsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlOVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXNwb25zZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFcnJvckNvZGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLkVycm9yQ29kZXM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlMFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlMDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGUxXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGUxOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZTJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlM1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlMzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGU0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZTVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlNlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlNjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGU3XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU3OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZThcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTg7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlOVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlOTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBhcmFtZXRlclN0cnVjdHVyZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlczsgfSB9KTtcbmNvbnN0IGxpbmtlZE1hcF8xID0gcmVxdWlyZShcIi4vbGlua2VkTWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTGlua2VkTWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsaW5rZWRNYXBfMS5MaW5rZWRNYXA7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMUlVDYWNoZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGlua2VkTWFwXzEuTFJVQ2FjaGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUb3VjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGlua2VkTWFwXzEuVG91Y2g7IH0gfSk7XG5jb25zdCBkaXNwb3NhYmxlXzEgPSByZXF1aXJlKFwiLi9kaXNwb3NhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRGlzcG9zYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzcG9zYWJsZV8xLkRpc3Bvc2FibGU7IH0gfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50c1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBldmVudHNfMS5FdmVudDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVtaXR0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV2ZW50c18xLkVtaXR0ZXI7IH0gfSk7XG5jb25zdCBjYW5jZWxsYXRpb25fMSA9IHJlcXVpcmUoXCIuL2NhbmNlbGxhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblRva2VuU291cmNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblRva2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlbjsgfSB9KTtcbmNvbnN0IHNoYXJlZEFycmF5Q2FuY2VsbGF0aW9uXzEgPSByZXF1aXJlKFwiLi9zaGFyZWRBcnJheUNhbmNlbGxhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNoYXJlZEFycmF5Q2FuY2VsbGF0aW9uXzEuU2hhcmVkQXJyYXlTZW5kZXJTdHJhdGVneTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2hhcmVkQXJyYXlDYW5jZWxsYXRpb25fMS5TaGFyZWRBcnJheVJlY2VpdmVyU3RyYXRlZ3k7IH0gfSk7XG5jb25zdCBtZXNzYWdlUmVhZGVyXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlUmVhZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWVzc2FnZVJlYWRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZVJlYWRlcl8xLk1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VSZWFkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VSZWFkZXJfMS5BYnN0cmFjdE1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VSZWFkZXJfMS5SZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5jb25zdCBtZXNzYWdlV3JpdGVyXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlV3JpdGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWVzc2FnZVdyaXRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZVdyaXRlcl8xLk1lc3NhZ2VXcml0ZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VXcml0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VXcml0ZXJfMS5BYnN0cmFjdE1lc3NhZ2VXcml0ZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlV3JpdGVyXzEuV3JpdGVhYmxlU3RyZWFtTWVzc2FnZVdyaXRlcjsgfSB9KTtcbmNvbnN0IG1lc3NhZ2VCdWZmZXJfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VCdWZmZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VCdWZmZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VCdWZmZXJfMS5BYnN0cmFjdE1lc3NhZ2VCdWZmZXI7IH0gfSk7XG5jb25zdCBjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9jb25uZWN0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29ubmVjdGlvblN0cmF0ZWd5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ29ubmVjdGlvblN0cmF0ZWd5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29ubmVjdGlvbk9wdGlvbnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5Db25uZWN0aW9uT3B0aW9uczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk51bGxMb2dnZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5OdWxsTG9nZ2VyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlByb2dyZXNzVG9rZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5Qcm9ncmVzc1Rva2VuOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJvZ3Jlc3NUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuUHJvZ3Jlc3NUeXBlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHJhY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5UcmFjZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRyYWNlVmFsdWVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuVHJhY2VWYWx1ZXM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUcmFjZUZvcm1hdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdGlvbl8xLlRyYWNlRm9ybWF0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2V0VHJhY2VOb3RpZmljYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5TZXRUcmFjZU5vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxvZ1RyYWNlTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuTG9nVHJhY2VOb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb25uZWN0aW9uRXJyb3JzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ29ubmVjdGlvbkVycm9yczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbm5lY3Rpb25FcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdGlvbl8xLkNvbm5lY3Rpb25FcnJvcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5DYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblN0cmF0ZWd5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ2FuY2VsbGF0aW9uU3RyYXRlZ3k7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZXNzYWdlU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5NZXNzYWdlU3RyYXRlZ3k7IH0gfSk7XG5jb25zdCByYWxfMSA9IHJlcXVpcmUoXCIuL3JhbFwiKTtcbmV4cG9ydHMuUkFMID0gcmFsXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhbmNlbGxhdGlvblRva2VuU291cmNlID0gZXhwb3J0cy5DYW5jZWxsYXRpb25Ub2tlbiA9IHZvaWQgMDtcbmNvbnN0IHJhbF8xID0gcmVxdWlyZShcIi4vcmFsXCIpO1xuY29uc3QgSXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xudmFyIENhbmNlbGxhdGlvblRva2VuO1xuKGZ1bmN0aW9uIChDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIENhbmNlbGxhdGlvblRva2VuLk5vbmUgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IGZhbHNlLFxuICAgICAgICBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZDogZXZlbnRzXzEuRXZlbnQuTm9uZVxuICAgIH0pO1xuICAgIENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZCA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZDogdHJ1ZSxcbiAgICAgICAgb25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IGV2ZW50c18xLkV2ZW50Lk5vbmVcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoY2FuZGlkYXRlID09PSBDYW5jZWxsYXRpb25Ub2tlbi5Ob25lXG4gICAgICAgICAgICB8fCBjYW5kaWRhdGUgPT09IENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZFxuICAgICAgICAgICAgfHwgKElzLmJvb2xlYW4oY2FuZGlkYXRlLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKSAmJiAhIWNhbmRpZGF0ZS5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZCkpO1xuICAgIH1cbiAgICBDYW5jZWxsYXRpb25Ub2tlbi5pcyA9IGlzO1xufSkoQ2FuY2VsbGF0aW9uVG9rZW4gfHwgKGV4cG9ydHMuQ2FuY2VsbGF0aW9uVG9rZW4gPSBDYW5jZWxsYXRpb25Ub2tlbiA9IHt9KSk7XG5jb25zdCBzaG9ydGN1dEV2ZW50ID0gT2JqZWN0LmZyZWV6ZShmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBjb25zdCBoYW5kbGUgPSAoMCwgcmFsXzEuZGVmYXVsdCkoKS50aW1lci5zZXRUaW1lb3V0KGNhbGxiYWNrLmJpbmQoY29udGV4dCksIDApO1xuICAgIHJldHVybiB7IGRpc3Bvc2UoKSB7IGhhbmRsZS5kaXNwb3NlKCk7IH0gfTtcbn0pO1xuY2xhc3MgTXV0YWJsZVRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5fZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIuZmlyZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FuY2VsbGVkO1xuICAgIH1cbiAgICBnZXQgb25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0NhbmNlbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNob3J0Y3V0RXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9lbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZW1pdHRlci5ldmVudDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdHRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIENhbmNlbGxhdGlvblRva2VuU291cmNlIHtcbiAgICBnZXQgdG9rZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5fdG9rZW4pIHtcbiAgICAgICAgICAgIC8vIGJlIGxhenkgYW5kIGNyZWF0ZSB0aGUgdG9rZW4gb25seSB3aGVuXG4gICAgICAgICAgICAvLyBhY3R1YWxseSBuZWVkZWRcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuID0gbmV3IE11dGFibGVUb2tlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbjtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Rva2VuKSB7XG4gICAgICAgICAgICAvLyBzYXZlIGFuIG9iamVjdCBieSByZXR1cm5pbmcgdGhlIGRlZmF1bHRcbiAgICAgICAgICAgIC8vIGNhbmNlbGxlZCB0b2tlbiB3aGVuIGNhbmNlbGxhdGlvbiBoYXBwZW5zXG4gICAgICAgICAgICAvLyBiZWZvcmUgc29tZW9uZSBhc2tzIGZvciB0aGUgdG9rZW5cbiAgICAgICAgICAgIHRoaXMuX3Rva2VuID0gQ2FuY2VsbGF0aW9uVG9rZW4uQ2FuY2VsbGVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdG9rZW4uY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2tlbikge1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRvIGluaXRpYWxpemUgd2l0aCBhbiBlbXB0eSB0b2tlbiBpZiB3ZSBoYWQgbm9uZVxuICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBDYW5jZWxsYXRpb25Ub2tlbi5Ob25lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3Rva2VuIGluc3RhbmNlb2YgTXV0YWJsZVRva2VuKSB7XG4gICAgICAgICAgICAvLyBhY3R1YWxseSBkaXNwb3NlXG4gICAgICAgICAgICB0aGlzLl90b2tlbi5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNhbmNlbGxhdGlvblRva2VuU291cmNlID0gQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24gPSBleHBvcnRzLkNvbm5lY3Rpb25PcHRpb25zID0gZXhwb3J0cy5NZXNzYWdlU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblN0cmF0ZWd5ID0gZXhwb3J0cy5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneSA9IGV4cG9ydHMuQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuUmVxdWVzdENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSBleHBvcnRzLklkQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuQ29ubmVjdGlvblN0cmF0ZWd5ID0gZXhwb3J0cy5Db25uZWN0aW9uRXJyb3IgPSBleHBvcnRzLkNvbm5lY3Rpb25FcnJvcnMgPSBleHBvcnRzLkxvZ1RyYWNlTm90aWZpY2F0aW9uID0gZXhwb3J0cy5TZXRUcmFjZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuVHJhY2VGb3JtYXQgPSBleHBvcnRzLlRyYWNlVmFsdWVzID0gZXhwb3J0cy5UcmFjZSA9IGV4cG9ydHMuTnVsbExvZ2dlciA9IGV4cG9ydHMuUHJvZ3Jlc3NUeXBlID0gZXhwb3J0cy5Qcm9ncmVzc1Rva2VuID0gdm9pZCAwO1xuY29uc3QgcmFsXzEgPSByZXF1aXJlKFwiLi9yYWxcIik7XG5jb25zdCBJcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuY29uc3QgbGlua2VkTWFwXzEgPSByZXF1aXJlKFwiLi9saW5rZWRNYXBcIik7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50c1wiKTtcbmNvbnN0IGNhbmNlbGxhdGlvbl8xID0gcmVxdWlyZShcIi4vY2FuY2VsbGF0aW9uXCIpO1xudmFyIENhbmNlbE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoQ2FuY2VsTm90aWZpY2F0aW9uKSB7XG4gICAgQ2FuY2VsTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlKCckL2NhbmNlbFJlcXVlc3QnKTtcbn0pKENhbmNlbE5vdGlmaWNhdGlvbiB8fCAoQ2FuY2VsTm90aWZpY2F0aW9uID0ge30pKTtcbnZhciBQcm9ncmVzc1Rva2VuO1xuKGZ1bmN0aW9uIChQcm9ncmVzc1Rva2VuKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICB9XG4gICAgUHJvZ3Jlc3NUb2tlbi5pcyA9IGlzO1xufSkoUHJvZ3Jlc3NUb2tlbiB8fCAoZXhwb3J0cy5Qcm9ncmVzc1Rva2VuID0gUHJvZ3Jlc3NUb2tlbiA9IHt9KSk7XG52YXIgUHJvZ3Jlc3NOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFByb2dyZXNzTm90aWZpY2F0aW9uKSB7XG4gICAgUHJvZ3Jlc3NOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGUoJyQvcHJvZ3Jlc3MnKTtcbn0pKFByb2dyZXNzTm90aWZpY2F0aW9uIHx8IChQcm9ncmVzc05vdGlmaWNhdGlvbiA9IHt9KSk7XG5jbGFzcyBQcm9ncmVzc1R5cGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvZ3Jlc3NUeXBlID0gUHJvZ3Jlc3NUeXBlO1xudmFyIFN0YXJSZXF1ZXN0SGFuZGxlcjtcbihmdW5jdGlvbiAoU3RhclJlcXVlc3RIYW5kbGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIElzLmZ1bmModmFsdWUpO1xuICAgIH1cbiAgICBTdGFyUmVxdWVzdEhhbmRsZXIuaXMgPSBpcztcbn0pKFN0YXJSZXF1ZXN0SGFuZGxlciB8fCAoU3RhclJlcXVlc3RIYW5kbGVyID0ge30pKTtcbmV4cG9ydHMuTnVsbExvZ2dlciA9IE9iamVjdC5mcmVlemUoe1xuICAgIGVycm9yOiAoKSA9PiB7IH0sXG4gICAgd2FybjogKCkgPT4geyB9LFxuICAgIGluZm86ICgpID0+IHsgfSxcbiAgICBsb2c6ICgpID0+IHsgfVxufSk7XG52YXIgVHJhY2U7XG4oZnVuY3Rpb24gKFRyYWNlKSB7XG4gICAgVHJhY2VbVHJhY2VbXCJPZmZcIl0gPSAwXSA9IFwiT2ZmXCI7XG4gICAgVHJhY2VbVHJhY2VbXCJNZXNzYWdlc1wiXSA9IDFdID0gXCJNZXNzYWdlc1wiO1xuICAgIFRyYWNlW1RyYWNlW1wiQ29tcGFjdFwiXSA9IDJdID0gXCJDb21wYWN0XCI7XG4gICAgVHJhY2VbVHJhY2VbXCJWZXJib3NlXCJdID0gM10gPSBcIlZlcmJvc2VcIjtcbn0pKFRyYWNlIHx8IChleHBvcnRzLlRyYWNlID0gVHJhY2UgPSB7fSkpO1xudmFyIFRyYWNlVmFsdWVzO1xuKGZ1bmN0aW9uIChUcmFjZVZhbHVlcykge1xuICAgIC8qKlxuICAgICAqIFR1cm4gdHJhY2luZyBvZmYuXG4gICAgICovXG4gICAgVHJhY2VWYWx1ZXMuT2ZmID0gJ29mZic7XG4gICAgLyoqXG4gICAgICogVHJhY2UgbWVzc2FnZXMgb25seS5cbiAgICAgKi9cbiAgICBUcmFjZVZhbHVlcy5NZXNzYWdlcyA9ICdtZXNzYWdlcyc7XG4gICAgLyoqXG4gICAgICogQ29tcGFjdCBtZXNzYWdlIHRyYWNpbmcuXG4gICAgICovXG4gICAgVHJhY2VWYWx1ZXMuQ29tcGFjdCA9ICdjb21wYWN0JztcbiAgICAvKipcbiAgICAgKiBWZXJib3NlIG1lc3NhZ2UgdHJhY2luZy5cbiAgICAgKi9cbiAgICBUcmFjZVZhbHVlcy5WZXJib3NlID0gJ3ZlcmJvc2UnO1xufSkoVHJhY2VWYWx1ZXMgfHwgKGV4cG9ydHMuVHJhY2VWYWx1ZXMgPSBUcmFjZVZhbHVlcyA9IHt9KSk7XG4oZnVuY3Rpb24gKFRyYWNlKSB7XG4gICAgZnVuY3Rpb24gZnJvbVN0cmluZyh2YWx1ZSkge1xuICAgICAgICBpZiAoIUlzLnN0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBUcmFjZS5PZmY7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlICdvZmYnOlxuICAgICAgICAgICAgICAgIHJldHVybiBUcmFjZS5PZmY7XG4gICAgICAgICAgICBjYXNlICdtZXNzYWdlcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYWNlLk1lc3NhZ2VzO1xuICAgICAgICAgICAgY2FzZSAnY29tcGFjdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYWNlLkNvbXBhY3Q7XG4gICAgICAgICAgICBjYXNlICd2ZXJib3NlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhY2UuVmVyYm9zZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYWNlLk9mZjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBUcmFjZS5mcm9tU3RyaW5nID0gZnJvbVN0cmluZztcbiAgICBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFRyYWNlLk9mZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ29mZic7XG4gICAgICAgICAgICBjYXNlIFRyYWNlLk1lc3NhZ2VzOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbWVzc2FnZXMnO1xuICAgICAgICAgICAgY2FzZSBUcmFjZS5Db21wYWN0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnY29tcGFjdCc7XG4gICAgICAgICAgICBjYXNlIFRyYWNlLlZlcmJvc2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZXJib3NlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdvZmYnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFRyYWNlLnRvU3RyaW5nID0gdG9TdHJpbmc7XG59KShUcmFjZSB8fCAoZXhwb3J0cy5UcmFjZSA9IFRyYWNlID0ge30pKTtcbnZhciBUcmFjZUZvcm1hdDtcbihmdW5jdGlvbiAoVHJhY2VGb3JtYXQpIHtcbiAgICBUcmFjZUZvcm1hdFtcIlRleHRcIl0gPSBcInRleHRcIjtcbiAgICBUcmFjZUZvcm1hdFtcIkpTT05cIl0gPSBcImpzb25cIjtcbn0pKFRyYWNlRm9ybWF0IHx8IChleHBvcnRzLlRyYWNlRm9ybWF0ID0gVHJhY2VGb3JtYXQgPSB7fSkpO1xuKGZ1bmN0aW9uIChUcmFjZUZvcm1hdCkge1xuICAgIGZ1bmN0aW9uIGZyb21TdHJpbmcodmFsdWUpIHtcbiAgICAgICAgaWYgKCFJcy5zdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJhY2VGb3JtYXQuSlNPTjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBUcmFjZUZvcm1hdC5UZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFRyYWNlRm9ybWF0LmZyb21TdHJpbmcgPSBmcm9tU3RyaW5nO1xufSkoVHJhY2VGb3JtYXQgfHwgKGV4cG9ydHMuVHJhY2VGb3JtYXQgPSBUcmFjZUZvcm1hdCA9IHt9KSk7XG52YXIgU2V0VHJhY2VOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFNldFRyYWNlTm90aWZpY2F0aW9uKSB7XG4gICAgU2V0VHJhY2VOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGUoJyQvc2V0VHJhY2UnKTtcbn0pKFNldFRyYWNlTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlNldFRyYWNlTm90aWZpY2F0aW9uID0gU2V0VHJhY2VOb3RpZmljYXRpb24gPSB7fSkpO1xudmFyIExvZ1RyYWNlTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChMb2dUcmFjZU5vdGlmaWNhdGlvbikge1xuICAgIExvZ1RyYWNlTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlKCckL2xvZ1RyYWNlJyk7XG59KShMb2dUcmFjZU5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5Mb2dUcmFjZU5vdGlmaWNhdGlvbiA9IExvZ1RyYWNlTm90aWZpY2F0aW9uID0ge30pKTtcbnZhciBDb25uZWN0aW9uRXJyb3JzO1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uRXJyb3JzKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbm5lY3Rpb24gaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25FcnJvcnNbQ29ubmVjdGlvbkVycm9yc1tcIkNsb3NlZFwiXSA9IDFdID0gXCJDbG9zZWRcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgY29ubmVjdGlvbiBnb3QgZGlzcG9zZWQuXG4gICAgICovXG4gICAgQ29ubmVjdGlvbkVycm9yc1tDb25uZWN0aW9uRXJyb3JzW1wiRGlzcG9zZWRcIl0gPSAyXSA9IFwiRGlzcG9zZWRcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIGxpc3RlbmluZyBtb2RlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25FcnJvcnNbQ29ubmVjdGlvbkVycm9yc1tcIkFscmVhZHlMaXN0ZW5pbmdcIl0gPSAzXSA9IFwiQWxyZWFkeUxpc3RlbmluZ1wiO1xufSkoQ29ubmVjdGlvbkVycm9ycyB8fCAoZXhwb3J0cy5Db25uZWN0aW9uRXJyb3JzID0gQ29ubmVjdGlvbkVycm9ycyA9IHt9KSk7XG5jbGFzcyBDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIENvbm5lY3Rpb25FcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29ubmVjdGlvbkVycm9yID0gQ29ubmVjdGlvbkVycm9yO1xudmFyIENvbm5lY3Rpb25TdHJhdGVneTtcbihmdW5jdGlvbiAoQ29ubmVjdGlvblN0cmF0ZWd5KSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuZnVuYyhjYW5kaWRhdGUuY2FuY2VsVW5kaXNwYXRjaGVkKTtcbiAgICB9XG4gICAgQ29ubmVjdGlvblN0cmF0ZWd5LmlzID0gaXM7XG59KShDb25uZWN0aW9uU3RyYXRlZ3kgfHwgKGV4cG9ydHMuQ29ubmVjdGlvblN0cmF0ZWd5ID0gQ29ubmVjdGlvblN0cmF0ZWd5ID0ge30pKTtcbnZhciBJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3k7XG4oZnVuY3Rpb24gKElkQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIChjYW5kaWRhdGUua2luZCA9PT0gdW5kZWZpbmVkIHx8IGNhbmRpZGF0ZS5raW5kID09PSAnaWQnKSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5jcmVhdGVDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSkgJiYgKGNhbmRpZGF0ZS5kaXNwb3NlID09PSB1bmRlZmluZWQgfHwgSXMuZnVuYyhjYW5kaWRhdGUuZGlzcG9zZSkpO1xuICAgIH1cbiAgICBJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMgPSBpcztcbn0pKElkQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSB8fCAoZXhwb3J0cy5JZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSBJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSB7fSkpO1xudmFyIFJlcXVlc3RDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5O1xuKGZ1bmN0aW9uIChSZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAncmVxdWVzdCcgJiYgSXMuZnVuYyhjYW5kaWRhdGUuY3JlYXRlQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UpICYmIChjYW5kaWRhdGUuZGlzcG9zZSA9PT0gdW5kZWZpbmVkIHx8IElzLmZ1bmMoY2FuZGlkYXRlLmRpc3Bvc2UpKTtcbiAgICB9XG4gICAgUmVxdWVzdENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMgPSBpcztcbn0pKFJlcXVlc3RDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5IHx8IChleHBvcnRzLlJlcXVlc3RDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5ID0gUmVxdWVzdENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSB7fSkpO1xudmFyIENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3k7XG4oZnVuY3Rpb24gKENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kpIHtcbiAgICBDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5Lk1lc3NhZ2UgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgY3JlYXRlQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UoXykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIElkQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneS5pcyh2YWx1ZSkgfHwgUmVxdWVzdENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXModmFsdWUpO1xuICAgIH1cbiAgICBDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5LmlzID0gaXM7XG59KShDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5IHx8IChleHBvcnRzLkNhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSBDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5ID0ge30pKTtcbnZhciBDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneTtcbihmdW5jdGlvbiAoQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3kpIHtcbiAgICBDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneS5NZXNzYWdlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIHNlbmRDYW5jZWxsYXRpb24oY29ubiwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25uLnNlbmROb3RpZmljYXRpb24oQ2FuY2VsTm90aWZpY2F0aW9uLnR5cGUsIHsgaWQgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFudXAoXykgeyB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuZnVuYyhjYW5kaWRhdGUuc2VuZENhbmNlbGxhdGlvbikgJiYgSXMuZnVuYyhjYW5kaWRhdGUuY2xlYW51cCk7XG4gICAgfVxuICAgIENhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5LmlzID0gaXM7XG59KShDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneSB8fCAoZXhwb3J0cy5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneSA9IENhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5ID0ge30pKTtcbnZhciBDYW5jZWxsYXRpb25TdHJhdGVneTtcbihmdW5jdGlvbiAoQ2FuY2VsbGF0aW9uU3RyYXRlZ3kpIHtcbiAgICBDYW5jZWxsYXRpb25TdHJhdGVneS5NZXNzYWdlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIHJlY2VpdmVyOiBDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5Lk1lc3NhZ2UsXG4gICAgICAgIHNlbmRlcjogQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3kuTWVzc2FnZVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMoY2FuZGlkYXRlLnJlY2VpdmVyKSAmJiBDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneS5pcyhjYW5kaWRhdGUuc2VuZGVyKTtcbiAgICB9XG4gICAgQ2FuY2VsbGF0aW9uU3RyYXRlZ3kuaXMgPSBpcztcbn0pKENhbmNlbGxhdGlvblN0cmF0ZWd5IHx8IChleHBvcnRzLkNhbmNlbGxhdGlvblN0cmF0ZWd5ID0gQ2FuY2VsbGF0aW9uU3RyYXRlZ3kgPSB7fSkpO1xudmFyIE1lc3NhZ2VTdHJhdGVneTtcbihmdW5jdGlvbiAoTWVzc2FnZVN0cmF0ZWd5KSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuZnVuYyhjYW5kaWRhdGUuaGFuZGxlTWVzc2FnZSk7XG4gICAgfVxuICAgIE1lc3NhZ2VTdHJhdGVneS5pcyA9IGlzO1xufSkoTWVzc2FnZVN0cmF0ZWd5IHx8IChleHBvcnRzLk1lc3NhZ2VTdHJhdGVneSA9IE1lc3NhZ2VTdHJhdGVneSA9IHt9KSk7XG52YXIgQ29ubmVjdGlvbk9wdGlvbnM7XG4oZnVuY3Rpb24gKENvbm5lY3Rpb25PcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgKENhbmNlbGxhdGlvblN0cmF0ZWd5LmlzKGNhbmRpZGF0ZS5jYW5jZWxsYXRpb25TdHJhdGVneSkgfHwgQ29ubmVjdGlvblN0cmF0ZWd5LmlzKGNhbmRpZGF0ZS5jb25uZWN0aW9uU3RyYXRlZ3kpIHx8IE1lc3NhZ2VTdHJhdGVneS5pcyhjYW5kaWRhdGUubWVzc2FnZVN0cmF0ZWd5KSk7XG4gICAgfVxuICAgIENvbm5lY3Rpb25PcHRpb25zLmlzID0gaXM7XG59KShDb25uZWN0aW9uT3B0aW9ucyB8fCAoZXhwb3J0cy5Db25uZWN0aW9uT3B0aW9ucyA9IENvbm5lY3Rpb25PcHRpb25zID0ge30pKTtcbnZhciBDb25uZWN0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKENvbm5lY3Rpb25TdGF0ZSkge1xuICAgIENvbm5lY3Rpb25TdGF0ZVtDb25uZWN0aW9uU3RhdGVbXCJOZXdcIl0gPSAxXSA9IFwiTmV3XCI7XG4gICAgQ29ubmVjdGlvblN0YXRlW0Nvbm5lY3Rpb25TdGF0ZVtcIkxpc3RlbmluZ1wiXSA9IDJdID0gXCJMaXN0ZW5pbmdcIjtcbiAgICBDb25uZWN0aW9uU3RhdGVbQ29ubmVjdGlvblN0YXRlW1wiQ2xvc2VkXCJdID0gM10gPSBcIkNsb3NlZFwiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtDb25uZWN0aW9uU3RhdGVbXCJEaXNwb3NlZFwiXSA9IDRdID0gXCJEaXNwb3NlZFwiO1xufSkoQ29ubmVjdGlvblN0YXRlIHx8IChDb25uZWN0aW9uU3RhdGUgPSB7fSkpO1xuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24obWVzc2FnZVJlYWRlciwgbWVzc2FnZVdyaXRlciwgX2xvZ2dlciwgb3B0aW9ucykge1xuICAgIGNvbnN0IGxvZ2dlciA9IF9sb2dnZXIgIT09IHVuZGVmaW5lZCA/IF9sb2dnZXIgOiBleHBvcnRzLk51bGxMb2dnZXI7XG4gICAgbGV0IHNlcXVlbmNlTnVtYmVyID0gMDtcbiAgICBsZXQgbm90aWZpY2F0aW9uU2VxdWVuY2VOdW1iZXIgPSAwO1xuICAgIGxldCB1bmtub3duUmVzcG9uc2VTZXF1ZW5jZU51bWJlciA9IDA7XG4gICAgY29uc3QgdmVyc2lvbiA9ICcyLjAnO1xuICAgIGxldCBzdGFyUmVxdWVzdEhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVxdWVzdEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgIGxldCBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBub3RpZmljYXRpb25IYW5kbGVycyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBwcm9ncmVzc0hhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgIGxldCB0aW1lcjtcbiAgICBsZXQgbWVzc2FnZVF1ZXVlID0gbmV3IGxpbmtlZE1hcF8xLkxpbmtlZE1hcCgpO1xuICAgIGxldCByZXNwb25zZVByb21pc2VzID0gbmV3IE1hcCgpO1xuICAgIGxldCBrbm93bkNhbmNlbGVkUmVxdWVzdHMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IHJlcXVlc3RUb2tlbnMgPSBuZXcgTWFwKCk7XG4gICAgbGV0IHRyYWNlID0gVHJhY2UuT2ZmO1xuICAgIGxldCB0cmFjZUZvcm1hdCA9IFRyYWNlRm9ybWF0LlRleHQ7XG4gICAgbGV0IHRyYWNlcjtcbiAgICBsZXQgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuTmV3O1xuICAgIGNvbnN0IGVycm9yRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgY29uc3QgY2xvc2VFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCB1bmhhbmRsZWROb3RpZmljYXRpb25FbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCB1bmhhbmRsZWRQcm9ncmVzc0VtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgIGNvbnN0IGRpc3Bvc2VFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCBjYW5jZWxsYXRpb25TdHJhdGVneSA9IChvcHRpb25zICYmIG9wdGlvbnMuY2FuY2VsbGF0aW9uU3RyYXRlZ3kpID8gb3B0aW9ucy5jYW5jZWxsYXRpb25TdHJhdGVneSA6IENhbmNlbGxhdGlvblN0cmF0ZWd5Lk1lc3NhZ2U7XG4gICAgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdFF1ZXVlS2V5KGlkKSB7XG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBzZW5kIHJlcXVlc3RzIHdpdGggaWQgbnVsbCBzaW5jZSB0aGUgcmVzcG9uc2UgY2FuJ3QgYmUgY29ycmVsYXRlZC5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3JlcS0nICsgaWQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUmVzcG9uc2VRdWV1ZUtleShpZCkge1xuICAgICAgICBpZiAoaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAncmVzLXVua25vd24tJyArICgrK3Vua25vd25SZXNwb25zZVNlcXVlbmNlTnVtYmVyKS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdyZXMtJyArIGlkLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uUXVldWVLZXkoKSB7XG4gICAgICAgIHJldHVybiAnbm90LScgKyAoKytub3RpZmljYXRpb25TZXF1ZW5jZU51bWJlcikudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkTWVzc2FnZVRvUXVldWUocXVldWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1JlcXVlc3QobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHF1ZXVlLnNldChjcmVhdGVSZXF1ZXN0UXVldWVLZXkobWVzc2FnZS5pZCksIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1Jlc3BvbnNlKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBxdWV1ZS5zZXQoY3JlYXRlUmVzcG9uc2VRdWV1ZUtleShtZXNzYWdlLmlkKSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBxdWV1ZS5zZXQoY3JlYXRlTm90aWZpY2F0aW9uUXVldWVLZXkoKSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuY2VsVW5kaXNwYXRjaGVkKF9tZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlzdGVuaW5nKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5MaXN0ZW5pbmc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQ2xvc2VkKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5DbG9zZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkRpc3Bvc2VkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9zZUhhbmRsZXIoKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLk5ldyB8fCBzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkxpc3RlbmluZykge1xuICAgICAgICAgICAgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ2xvc2VkO1xuICAgICAgICAgICAgY2xvc2VFbWl0dGVyLmZpcmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBpcyBkaXNwb3NlZCBkb24ndCBzZW50IGNsb3NlIGV2ZW50cy5cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEVycm9ySGFuZGxlcihlcnJvcikge1xuICAgICAgICBlcnJvckVtaXR0ZXIuZmlyZShbZXJyb3IsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdyaXRlRXJyb3JIYW5kbGVyKGRhdGEpIHtcbiAgICAgICAgZXJyb3JFbWl0dGVyLmZpcmUoZGF0YSk7XG4gICAgfVxuICAgIG1lc3NhZ2VSZWFkZXIub25DbG9zZShjbG9zZUhhbmRsZXIpO1xuICAgIG1lc3NhZ2VSZWFkZXIub25FcnJvcihyZWFkRXJyb3JIYW5kbGVyKTtcbiAgICBtZXNzYWdlV3JpdGVyLm9uQ2xvc2UoY2xvc2VIYW5kbGVyKTtcbiAgICBtZXNzYWdlV3JpdGVyLm9uRXJyb3Iod3JpdGVFcnJvckhhbmRsZXIpO1xuICAgIGZ1bmN0aW9uIHRyaWdnZXJNZXNzYWdlUXVldWUoKSB7XG4gICAgICAgIGlmICh0aW1lciB8fCBtZXNzYWdlUXVldWUuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVyID0gKDAsIHJhbF8xLmRlZmF1bHQpKCkudGltZXIuc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcHJvY2Vzc01lc3NhZ2VRdWV1ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlc18xLk1lc3NhZ2UuaXNSZXF1ZXN0KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc05vdGlmaWNhdGlvbihtZXNzYWdlKSkge1xuICAgICAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1Jlc3BvbnNlKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBoYW5kbGVSZXNwb25zZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZUludmFsaWRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb2Nlc3NNZXNzYWdlUXVldWUoKSB7XG4gICAgICAgIGlmIChtZXNzYWdlUXVldWUuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlUXVldWUuc2hpZnQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VTdHJhdGVneSA9IG9wdGlvbnM/Lm1lc3NhZ2VTdHJhdGVneTtcbiAgICAgICAgICAgIGlmIChNZXNzYWdlU3RyYXRlZ3kuaXMobWVzc2FnZVN0cmF0ZWd5KSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VTdHJhdGVneS5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UsIGhhbmRsZU1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyaWdnZXJNZXNzYWdlUXVldWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjYWxsYmFjayA9IChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGEgY2FuY2VsbGF0aW9uIG1lc3NhZ2UuIENoZWNrIGlmIHRoZSBtZXNzYWdlIGlzIHN0aWxsIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgLy8gYW5kIGNhbmNlbCBpdCBpZiBhbGxvd2VkIHRvIGRvIHNvLlxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc05vdGlmaWNhdGlvbihtZXNzYWdlKSAmJiBtZXNzYWdlLm1ldGhvZCA9PT0gQ2FuY2VsTm90aWZpY2F0aW9uLnR5cGUubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsSWQgPSBtZXNzYWdlLnBhcmFtcy5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBjcmVhdGVSZXF1ZXN0UXVldWVLZXkoY2FuY2VsSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvQ2FuY2VsID0gbWVzc2FnZVF1ZXVlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc18xLk1lc3NhZ2UuaXNSZXF1ZXN0KHRvQ2FuY2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJhdGVneSA9IG9wdGlvbnM/LmNvbm5lY3Rpb25TdHJhdGVneTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSAoc3RyYXRlZ3kgJiYgc3RyYXRlZ3kuY2FuY2VsVW5kaXNwYXRjaGVkKSA/IHN0cmF0ZWd5LmNhbmNlbFVuZGlzcGF0Y2hlZCh0b0NhbmNlbCwgY2FuY2VsVW5kaXNwYXRjaGVkKSA6IGNhbmNlbFVuZGlzcGF0Y2hlZCh0b0NhbmNlbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiAocmVzcG9uc2UuZXJyb3IgIT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5yZXN1bHQgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VRdWV1ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuZGVsZXRlKGNhbmNlbElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmlkID0gdG9DYW5jZWwuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZVNlbmRpbmdSZXNwb25zZShyZXNwb25zZSwgbWVzc2FnZS5tZXRob2QsIERhdGUubm93KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShyZXNwb25zZSkuY2F0Y2goKCkgPT4gbG9nZ2VyLmVycm9yKGBTZW5kaW5nIHJlc3BvbnNlIGZvciBjYW5jZWxlZCBtZXNzYWdlIGZhaWxlZC5gKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsbGF0aW9uVG9rZW4gPSByZXF1ZXN0VG9rZW5zLmdldChjYW5jZWxJZCk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3QgaXMgYWxyZWFkeSBydW5uaW5nLiBDYW5jZWwgdGhlIHRva2VuXG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlUmVjZWl2ZWROb3RpZmljYXRpb24obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjYW5jZWwgYnV0IHN0aWxsIHF1ZXVlIHRoZSBtZXNzYWdlIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIHVwIHN0YXRlIGluIHByb2Nlc3MgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAga25vd25DYW5jZWxlZFJlcXVlc3RzLmFkZChjYW5jZWxJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkTWVzc2FnZVRvUXVldWUobWVzc2FnZVF1ZXVlLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyaWdnZXJNZXNzYWdlUXVldWUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChyZXF1ZXN0TWVzc2FnZSkge1xuICAgICAgICBpZiAoaXNEaXNwb3NlZCgpKSB7XG4gICAgICAgICAgICAvLyB3ZSByZXR1cm4gaGVyZSBzaWxlbnRseSBzaW5jZSB3ZSBmaXJlZCBhbiBldmVudCB3aGVuIHRoZVxuICAgICAgICAgICAgLy8gY29ubmVjdGlvbiBnb3QgZGlzcG9zZWQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVwbHkocmVzdWx0T3JFcnJvciwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2UuaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmVzdWx0T3JFcnJvciBpbnN0YW5jZW9mIG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IgPSByZXN1bHRPckVycm9yLnRvSnNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yZXN1bHQgPSByZXN1bHRPckVycm9yID09PSB1bmRlZmluZWQgPyBudWxsIDogcmVzdWx0T3JFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyYWNlU2VuZGluZ1Jlc3BvbnNlKG1lc3NhZ2UsIG1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgIG1lc3NhZ2VXcml0ZXIud3JpdGUobWVzc2FnZSkuY2F0Y2goKCkgPT4gbG9nZ2VyLmVycm9yKGBTZW5kaW5nIHJlc3BvbnNlIGZhaWxlZC5gKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVwbHlFcnJvcihlcnJvciwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLnRvSnNvbigpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShtZXNzYWdlKS5jYXRjaCgoKSA9PiBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgcmVzcG9uc2UgZmFpbGVkLmApKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXBseVN1Y2Nlc3MocmVzdWx0LCBtZXRob2QsIHN0YXJ0VGltZSkge1xuICAgICAgICAgICAgLy8gVGhlIEpTT04gUlBDIGRlZmluZXMgdGhhdCBhIHJlc3BvbnNlIG11c3QgZWl0aGVyIGhhdmUgYSByZXN1bHQgb3IgYW4gZXJyb3JcbiAgICAgICAgICAgIC8vIFNvIHdlIGNhbid0IHRyZWF0IHVuZGVmaW5lZCBhcyBhIHZhbGlkIHJlc3BvbnNlIHJlc3VsdC5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIGpzb25ycGM6IHZlcnNpb24sXG4gICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShtZXNzYWdlKS5jYXRjaCgoKSA9PiBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgcmVzcG9uc2UgZmFpbGVkLmApKTtcbiAgICAgICAgfVxuICAgICAgICB0cmFjZVJlY2VpdmVkUmVxdWVzdChyZXF1ZXN0TWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXF1ZXN0SGFuZGxlcnMuZ2V0KHJlcXVlc3RNZXNzYWdlLm1ldGhvZCk7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBsZXQgcmVxdWVzdEhhbmRsZXI7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgICAgICAgICAgcmVxdWVzdEhhbmRsZXIgPSBlbGVtZW50LmhhbmRsZXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKHJlcXVlc3RIYW5kbGVyIHx8IHN0YXJSZXF1ZXN0SGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgdG9rZW5LZXkgPSByZXF1ZXN0TWVzc2FnZS5pZCA/PyBTdHJpbmcoRGF0ZS5ub3coKSk7IC8vXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxsYXRpb25Tb3VyY2UgPSBJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMoY2FuY2VsbGF0aW9uU3RyYXRlZ3kucmVjZWl2ZXIpXG4gICAgICAgICAgICAgICAgPyBjYW5jZWxsYXRpb25TdHJhdGVneS5yZWNlaXZlci5jcmVhdGVDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSh0b2tlbktleSlcbiAgICAgICAgICAgICAgICA6IGNhbmNlbGxhdGlvblN0cmF0ZWd5LnJlY2VpdmVyLmNyZWF0ZUNhbmNlbGxhdGlvblRva2VuU291cmNlKHJlcXVlc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0TWVzc2FnZS5pZCAhPT0gbnVsbCAmJiBrbm93bkNhbmNlbGVkUmVxdWVzdHMuaGFzKHJlcXVlc3RNZXNzYWdlLmlkKSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblNvdXJjZS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0TWVzc2FnZS5pZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuc2V0KHRva2VuS2V5LCBjYW5jZWxsYXRpb25Tb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlclJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RNZXNzYWdlLnBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUubnVtYmVyT2ZQYXJhbXMgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludmFsaWRQYXJhbXMsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBkZWZpbmVzICR7dHlwZS5udW1iZXJPZlBhcmFtc30gcGFyYW1zIGJ1dCByZWNlaXZlZCBub25lLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlclJlc3VsdCA9IHJlcXVlc3RIYW5kbGVyKGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXF1ZXN0TWVzc2FnZS5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUucGFyYW1ldGVyU3RydWN0dXJlcyA9PT0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGx5RXJyb3IobmV3IG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcihtZXNzYWdlc18xLkVycm9yQ29kZXMuSW52YWxpZFBhcmFtcywgYFJlcXVlc3QgJHtyZXF1ZXN0TWVzc2FnZS5tZXRob2R9IGRlZmluZXMgcGFyYW1ldGVycyBieSBuYW1lIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uYCksIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyUmVzdWx0ID0gcmVxdWVzdEhhbmRsZXIoLi4ucmVxdWVzdE1lc3NhZ2UucGFyYW1zLCBjYW5jZWxsYXRpb25Tb3VyY2UudG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLnBhcmFtZXRlclN0cnVjdHVyZXMgPT09IG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5ieVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnZhbGlkUGFyYW1zLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZGVmaW5lcyBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IG5hbWVgKSwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJSZXN1bHQgPSByZXF1ZXN0SGFuZGxlcihyZXF1ZXN0TWVzc2FnZS5wYXJhbXMsIGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhclJlcXVlc3RIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJSZXN1bHQgPSBzdGFyUmVxdWVzdEhhbmRsZXIocmVxdWVzdE1lc3NhZ2UubWV0aG9kLCByZXF1ZXN0TWVzc2FnZS5wYXJhbXMsIGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBoYW5kbGVyUmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmICghaGFuZGxlclJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VG9rZW5zLmRlbGV0ZSh0b2tlbktleSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5U3VjY2VzcyhoYW5kbGVyUmVzdWx0LCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb21pc2UudGhlbikge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3VsdE9yRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuZGVsZXRlKHRva2VuS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGx5KHJlc3VsdE9yRXJyb3IsIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihlcnJvciwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXJyb3IgJiYgSXMuc3RyaW5nKGVycm9yLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZmFpbGVkIHdpdGggbWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBmYWlsZWQgdW5leHBlY3RlZGx5IHdpdGhvdXQgcHJvdmlkaW5nIGFueSBkZXRhaWxzLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXBseShoYW5kbGVyUmVzdWx0LCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXBseShlcnJvciwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlcnJvciAmJiBJcy5zdHJpbmcoZXJyb3IubWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZmFpbGVkIHdpdGggbWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBmYWlsZWQgdW5leHBlY3RlZGx5IHdpdGhvdXQgcHJvdmlkaW5nIGFueSBkZXRhaWxzLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5NZXRob2ROb3RGb3VuZCwgYFVuaGFuZGxlZCBtZXRob2QgJHtyZXF1ZXN0TWVzc2FnZS5tZXRob2R9YCksIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZU1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGlzRGlzcG9zZWQoKSkge1xuICAgICAgICAgICAgLy8gU2VlIGhhbmRsZSByZXF1ZXN0LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFJlY2VpdmVkIHJlc3BvbnNlIG1lc3NhZ2Ugd2l0aG91dCBpZDogRXJyb3IgaXM6IFxcbiR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2VNZXNzYWdlLmVycm9yLCB1bmRlZmluZWQsIDQpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBSZWNlaXZlZCByZXNwb25zZSBtZXNzYWdlIHdpdGhvdXQgaWQuIE5vIGZ1cnRoZXIgZXJyb3IgaW5mb3JtYXRpb24gcHJvdmlkZWQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSByZXNwb25zZU1lc3NhZ2UuaWQ7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVByb21pc2UgPSByZXNwb25zZVByb21pc2VzLmdldChrZXkpO1xuICAgICAgICAgICAgdHJhY2VSZWNlaXZlZFJlc3BvbnNlKHJlc3BvbnNlTWVzc2FnZSwgcmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlTWVzc2FnZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSByZXNwb25zZU1lc3NhZ2UuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2UucmVqZWN0KG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IoZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSwgZXJyb3IuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZS5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VQcm9taXNlLnJlc29sdmUocmVzcG9uc2VNZXNzYWdlLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBuZXZlciBoYXBwZW4uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFJlc3BvbnNlIGhhbmRsZXIgJyR7cmVzcG9uc2VQcm9taXNlLm1ldGhvZH0nIGZhaWxlZCB3aXRoIG1lc3NhZ2U6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgUmVzcG9uc2UgaGFuZGxlciAnJHtyZXNwb25zZVByb21pc2UubWV0aG9kfScgZmFpbGVkIHVuZXhwZWN0ZWRseS5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVOb3RpZmljYXRpb24obWVzc2FnZSkge1xuICAgICAgICBpZiAoaXNEaXNwb3NlZCgpKSB7XG4gICAgICAgICAgICAvLyBTZWUgaGFuZGxlIHJlcXVlc3QuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBub3RpZmljYXRpb25IYW5kbGVyO1xuICAgICAgICBpZiAobWVzc2FnZS5tZXRob2QgPT09IENhbmNlbE5vdGlmaWNhdGlvbi50eXBlLm1ldGhvZCkge1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsSWQgPSBtZXNzYWdlLnBhcmFtcy5pZDtcbiAgICAgICAgICAgIGtub3duQ2FuY2VsZWRSZXF1ZXN0cy5kZWxldGUoY2FuY2VsSWQpO1xuICAgICAgICAgICAgdHJhY2VSZWNlaXZlZE5vdGlmaWNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBub3RpZmljYXRpb25IYW5kbGVycy5nZXQobWVzc2FnZS5tZXRob2QpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVyID0gZWxlbWVudC5oYW5kbGVyO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbkhhbmRsZXIgfHwgc3Rhck5vdGlmaWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdHJhY2VSZWNlaXZlZE5vdGlmaWNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5wYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm51bWJlck9mUGFyYW1zICE9PSAwICYmIHR5cGUucGFyYW1ldGVyU3RydWN0dXJlcyAhPT0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYE5vdGlmaWNhdGlvbiAke21lc3NhZ2UubWV0aG9kfSBkZWZpbmVzICR7dHlwZS5udW1iZXJPZlBhcmFtc30gcGFyYW1zIGJ1dCByZWNlaXZlZCBub25lLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UucGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIEpTT04tUlBDIGxpYnJhcmllcyB0aGF0IHNlbmQgcHJvZ3Jlc3MgbWVzc2FnZSBhcyBwb3NpdGlvbmFsIHBhcmFtcyBhbHRob3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkIGFzIG5hbWVkLiBTbyBjb252ZXJ0IHRoZW0gaWYgdGhpcyBpcyB0aGUgY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG1lc3NhZ2UucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWV0aG9kID09PSBQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLm1ldGhvZCAmJiBwYXJhbXMubGVuZ3RoID09PSAyICYmIFByb2dyZXNzVG9rZW4uaXMocGFyYW1zWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIoeyB0b2tlbjogcGFyYW1zWzBdLCB2YWx1ZTogcGFyYW1zWzFdIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZS5wYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYE5vdGlmaWNhdGlvbiAke21lc3NhZ2UubWV0aG9kfSBkZWZpbmVzIHBhcmFtZXRlcnMgYnkgbmFtZSBidXQgcmVjZWl2ZWQgcGFyYW1ldGVycyBieSBwb3NpdGlvbmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm51bWJlck9mUGFyYW1zICE9PSBtZXNzYWdlLnBhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgTm90aWZpY2F0aW9uICR7bWVzc2FnZS5tZXRob2R9IGRlZmluZXMgJHt0eXBlLm51bWJlck9mUGFyYW1zfSBwYXJhbXMgYnV0IHJlY2VpdmVkICR7cGFyYW1zLmxlbmd0aH0gYXJndW1lbnRzYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlciguLi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLnBhcmFtZXRlclN0cnVjdHVyZXMgPT09IG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5ieVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBOb3RpZmljYXRpb24gJHttZXNzYWdlLm1ldGhvZH0gZGVmaW5lcyBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IG5hbWVgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIobWVzc2FnZS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXJOb3RpZmljYXRpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJOb3RpZmljYXRpb25IYW5kbGVyKG1lc3NhZ2UubWV0aG9kLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBOb3RpZmljYXRpb24gaGFuZGxlciAnJHttZXNzYWdlLm1ldGhvZH0nIGZhaWxlZCB3aXRoIG1lc3NhZ2U6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgTm90aWZpY2F0aW9uIGhhbmRsZXIgJyR7bWVzc2FnZS5tZXRob2R9JyBmYWlsZWQgdW5leHBlY3RlZGx5LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVuaGFuZGxlZE5vdGlmaWNhdGlvbkVtaXR0ZXIuZmlyZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVJbnZhbGlkTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdSZWNlaXZlZCBlbXB0eSBtZXNzYWdlLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5lcnJvcihgUmVjZWl2ZWQgbWVzc2FnZSB3aGljaCBpcyBuZWl0aGVyIGEgcmVzcG9uc2Ugbm9yIGEgbm90aWZpY2F0aW9uIG1lc3NhZ2U6XFxuJHtKU09OLnN0cmluZ2lmeShtZXNzYWdlLCBudWxsLCA0KX1gKTtcbiAgICAgICAgLy8gVGVzdCB3aGV0aGVyIHdlIGZpbmQgYW4gaWQgdG8gcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmIChJcy5zdHJpbmcocmVzcG9uc2VNZXNzYWdlLmlkKSB8fCBJcy5udW1iZXIocmVzcG9uc2VNZXNzYWdlLmlkKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gcmVzcG9uc2VNZXNzYWdlLmlkO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VIYW5kbGVyID0gcmVzcG9uc2VQcm9taXNlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZUhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUhhbmRsZXIucmVqZWN0KG5ldyBFcnJvcignVGhlIHJlY2VpdmVkIHJlc3BvbnNlIGhhcyBuZWl0aGVyIGEgcmVzdWx0IG5vciBhbiBlcnJvciBwcm9wZXJ0eS4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5VHJhY2UocGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCB8fCBwYXJhbXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0cmFjZSkge1xuICAgICAgICAgICAgY2FzZSBUcmFjZS5WZXJib3NlOlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbXMsIG51bGwsIDQpO1xuICAgICAgICAgICAgY2FzZSBUcmFjZS5Db21wYWN0OlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlU2VuZGluZ1JlcXVlc3QobWVzc2FnZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLk9mZiB8fCAhdHJhY2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlRm9ybWF0ID09PSBUcmFjZUZvcm1hdC5UZXh0KSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICgodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpICYmIG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGBQYXJhbXM6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5wYXJhbXMpfVxcblxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZXIubG9nKGBTZW5kaW5nIHJlcXVlc3QgJyR7bWVzc2FnZS5tZXRob2R9IC0gKCR7bWVzc2FnZS5pZH0pJy5gLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0xTUE1lc3NhZ2UoJ3NlbmQtcmVxdWVzdCcsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlU2VuZGluZ05vdGlmaWNhdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gVHJhY2UuT2ZmIHx8ICF0cmFjZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhY2VGb3JtYXQgPT09IFRyYWNlRm9ybWF0LlRleHQpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5WZXJib3NlIHx8IHRyYWNlID09PSBUcmFjZS5Db21wYWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBgUGFyYW1zOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UucGFyYW1zKX1cXG5cXG5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICdObyBwYXJhbWV0ZXJzIHByb3ZpZGVkLlxcblxcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgU2VuZGluZyBub3RpZmljYXRpb24gJyR7bWVzc2FnZS5tZXRob2R9Jy5gLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0xTUE1lc3NhZ2UoJ3NlbmQtbm90aWZpY2F0aW9uJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFjZUZvcm1hdCA9PT0gVHJhY2VGb3JtYXQuVGV4dCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciAmJiBtZXNzYWdlLmVycm9yLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBFcnJvciBkYXRhOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UuZXJyb3IuZGF0YSl9XFxuXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBSZXN1bHQ6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5yZXN1bHQpfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5lcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gJ05vIHJlc3VsdCByZXR1cm5lZC5cXG5cXG4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgU2VuZGluZyByZXNwb25zZSAnJHttZXRob2R9IC0gKCR7bWVzc2FnZS5pZH0pJy4gUHJvY2Vzc2luZyByZXF1ZXN0IHRvb2sgJHtEYXRlLm5vdygpIC0gc3RhcnRUaW1lfW1zYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdzZW5kLXJlc3BvbnNlJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhY2VSZWNlaXZlZFJlcXVlc3QobWVzc2FnZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLk9mZiB8fCAhdHJhY2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlRm9ybWF0ID09PSBUcmFjZUZvcm1hdC5UZXh0KSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICgodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpICYmIG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGBQYXJhbXM6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5wYXJhbXMpfVxcblxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZXIubG9nKGBSZWNlaXZlZCByZXF1ZXN0ICcke21lc3NhZ2UubWV0aG9kfSAtICgke21lc3NhZ2UuaWR9KScuYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLXJlcXVlc3QnLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFjZVJlY2VpdmVkTm90aWZpY2F0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlciB8fCBtZXNzYWdlLm1ldGhvZCA9PT0gTG9nVHJhY2VOb3RpZmljYXRpb24udHlwZS5tZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhY2VGb3JtYXQgPT09IFRyYWNlRm9ybWF0LlRleHQpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5WZXJib3NlIHx8IHRyYWNlID09PSBUcmFjZS5Db21wYWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBgUGFyYW1zOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UucGFyYW1zKX1cXG5cXG5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICdObyBwYXJhbWV0ZXJzIHByb3ZpZGVkLlxcblxcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgUmVjZWl2ZWQgbm90aWZpY2F0aW9uICcke21lc3NhZ2UubWV0aG9kfScuYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLW5vdGlmaWNhdGlvbicsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlUmVjZWl2ZWRSZXNwb25zZShtZXNzYWdlLCByZXNwb25zZVByb21pc2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFjZUZvcm1hdCA9PT0gVHJhY2VGb3JtYXQuVGV4dCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciAmJiBtZXNzYWdlLmVycm9yLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBFcnJvciBkYXRhOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UuZXJyb3IuZGF0YSl9XFxuXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBSZXN1bHQ6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5yZXN1bHQpfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5lcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gJ05vIHJlc3VsdCByZXR1cm5lZC5cXG5cXG4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbWVzc2FnZS5lcnJvciA/IGAgUmVxdWVzdCBmYWlsZWQ6ICR7bWVzc2FnZS5lcnJvci5tZXNzYWdlfSAoJHttZXNzYWdlLmVycm9yLmNvZGV9KS5gIDogJyc7XG4gICAgICAgICAgICAgICAgdHJhY2VyLmxvZyhgUmVjZWl2ZWQgcmVzcG9uc2UgJyR7cmVzcG9uc2VQcm9taXNlLm1ldGhvZH0gLSAoJHttZXNzYWdlLmlkfSknIGluICR7RGF0ZS5ub3coKSAtIHJlc3BvbnNlUHJvbWlzZS50aW1lclN0YXJ0fW1zLiR7ZXJyb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIubG9nKGBSZWNlaXZlZCByZXNwb25zZSAke21lc3NhZ2UuaWR9IHdpdGhvdXQgYWN0aXZlIHJlc3BvbnNlIHByb21pc2UuYCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLXJlc3BvbnNlJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbG9nTFNQTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghdHJhY2VyIHx8IHRyYWNlID09PSBUcmFjZS5PZmYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsc3BNZXNzYWdlID0ge1xuICAgICAgICAgICAgaXNMU1BNZXNzYWdlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgfTtcbiAgICAgICAgdHJhY2VyLmxvZyhsc3BNZXNzYWdlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGhyb3dJZkNsb3NlZE9yRGlzcG9zZWQoKSB7XG4gICAgICAgIGlmIChpc0Nsb3NlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQ29ubmVjdGlvbkVycm9yKENvbm5lY3Rpb25FcnJvcnMuQ2xvc2VkLCAnQ29ubmVjdGlvbiBpcyBjbG9zZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzcG9zZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IENvbm5lY3Rpb25FcnJvcihDb25uZWN0aW9uRXJyb3JzLkRpc3Bvc2VkLCAnQ29ubmVjdGlvbiBpcyBkaXNwb3NlZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0aHJvd0lmTGlzdGVuaW5nKCkge1xuICAgICAgICBpZiAoaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IENvbm5lY3Rpb25FcnJvcihDb25uZWN0aW9uRXJyb3JzLkFscmVhZHlMaXN0ZW5pbmcsICdDb25uZWN0aW9uIGlzIGFscmVhZHkgbGlzdGVuaW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdGhyb3dJZk5vdExpc3RlbmluZygpIHtcbiAgICAgICAgaWYgKCFpc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGwgbGlzdGVuKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdW5kZWZpbmVkVG9OdWxsKHBhcmFtKSB7XG4gICAgICAgIGlmIChwYXJhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBudWxsVG9VbmRlZmluZWQocGFyYW0pIHtcbiAgICAgICAgaWYgKHBhcmFtID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTmFtZWRQYXJhbShwYXJhbSkge1xuICAgICAgICByZXR1cm4gcGFyYW0gIT09IHVuZGVmaW5lZCAmJiBwYXJhbSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShwYXJhbSkgJiYgdHlwZW9mIHBhcmFtID09PSAnb2JqZWN0JztcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZVNpbmdsZVBhcmFtKHBhcmFtZXRlclN0cnVjdHVyZXMsIHBhcmFtKSB7XG4gICAgICAgIHN3aXRjaCAocGFyYW1ldGVyU3RydWN0dXJlcykge1xuICAgICAgICAgICAgY2FzZSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bzpcbiAgICAgICAgICAgICAgICBpZiAoaXNOYW1lZFBhcmFtKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFRvVW5kZWZpbmVkKHBhcmFtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbdW5kZWZpbmVkVG9OdWxsKHBhcmFtKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lOlxuICAgICAgICAgICAgICAgIGlmICghaXNOYW1lZFBhcmFtKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlY2VpdmVkIHBhcmFtZXRlcnMgYnkgbmFtZSBidXQgcGFyYW0gaXMgbm90IGFuIG9iamVjdCBsaXRlcmFsLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFRvVW5kZWZpbmVkKHBhcmFtKTtcbiAgICAgICAgICAgIGNhc2UgbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5UG9zaXRpb246XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRUb051bGwocGFyYW0pXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtZXRlciBzdHJ1Y3R1cmUgJHtwYXJhbWV0ZXJTdHJ1Y3R1cmVzLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZU1lc3NhZ2VQYXJhbXModHlwZSwgcGFyYW1zKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFyYW1zID0gdHlwZS5udW1iZXJPZlBhcmFtcztcbiAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb21wdXRlU2luZ2xlUGFyYW0odHlwZS5wYXJhbWV0ZXJTdHJ1Y3R1cmVzLCBwYXJhbXNbMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGggJiYgaSA8IG51bWJlck9mUGFyYW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkVG9OdWxsKHBhcmFtc1tpXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA8IG51bWJlck9mUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBwYXJhbXMubGVuZ3RoOyBpIDwgbnVtYmVyT2ZQYXJhbXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHtcbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbjogKHR5cGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbXM7XG4gICAgICAgICAgICBpZiAoSXMuc3RyaW5nKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtU3RhcnQgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG87XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5pcyhmaXJzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1TdGFydCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlclN0cnVjdHVyZXMgPSBmaXJzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtRW5kID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSBwYXJhbUVuZCAtIHBhcmFtU3RhcnQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXMgPSBjb21wdXRlU2luZ2xlUGFyYW0ocGFyYW1ldGVyU3RydWN0dXJlcywgYXJnc1twYXJhbVN0YXJ0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCAke251bWJlck9mUGFyYW1zfSBwYXJhbWV0ZXJzIGZvciAnYnkgTmFtZScgbm90aWZpY2F0aW9uIHBhcmFtZXRlciBzdHJ1Y3R1cmUuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gYXJncy5zbGljZShwYXJhbVN0YXJ0LCBwYXJhbUVuZCkubWFwKHZhbHVlID0+IHVuZGVmaW5lZFRvTnVsbCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYXJncztcbiAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlLm1ldGhvZDtcbiAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gY29tcHV0ZU1lc3NhZ2VQYXJhbXModHlwZSwgcGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1lc3NhZ2VQYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFjZVNlbmRpbmdOb3RpZmljYXRpb24obm90aWZpY2F0aW9uTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZVdyaXRlci53cml0ZShub3RpZmljYXRpb25NZXNzYWdlKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgbm90aWZpY2F0aW9uIGZhaWxlZC5gKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk5vdGlmaWNhdGlvbjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgaWYgKElzLmZ1bmModHlwZSkpIHtcbiAgICAgICAgICAgICAgICBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKElzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVycy5zZXQodHlwZSwgeyB0eXBlOiB1bmRlZmluZWQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlLm1ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlcnMuc2V0KHR5cGUubWV0aG9kLCB7IHR5cGUsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlcnMuZGVsZXRlKG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG9uUHJvZ3Jlc3M6IChfdHlwZSwgdG9rZW4sIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0hhbmRsZXJzLmhhcyh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb2dyZXNzIGhhbmRsZXIgZm9yIHRva2VuICR7dG9rZW59IGFscmVhZHkgcmVnaXN0ZXJlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3NIYW5kbGVycy5zZXQodG9rZW4sIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzSGFuZGxlcnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBzZW5kUHJvZ3Jlc3M6IChfdHlwZSwgdG9rZW4sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCBub3QgYXdhaXQgYnV0IHNpbXBsZSByZXR1cm4gdG8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgaGF2ZSBhbm90aGVyXG4gICAgICAgICAgICAvLyBhc3luYyBzY2hlZHVsaW5nLiBPdGhlcndpc2Ugb25lIHNlbmQgY291bGQgb3ZlcnRha2UgYW5vdGhlciBzZW5kLlxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uc2VuZE5vdGlmaWNhdGlvbihQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLCB7IHRva2VuLCB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25VbmhhbmRsZWRQcm9ncmVzczogdW5oYW5kbGVkUHJvZ3Jlc3NFbWl0dGVyLmV2ZW50LFxuICAgICAgICBzZW5kUmVxdWVzdDogKHR5cGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB0aHJvd0lmTm90TGlzdGVuaW5nKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbXM7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoSXMuc3RyaW5nKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1TdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtZXRlclN0cnVjdHVyZXMgPSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bztcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmlzKGZpcnN0KSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbVN0YXJ0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyU3RydWN0dXJlcyA9IGZpcnN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1FbmQgPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uXzEuQ2FuY2VsbGF0aW9uVG9rZW4uaXMobGFzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1FbmQgPSBwYXJhbUVuZCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gbGFzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSBwYXJhbUVuZCAtIHBhcmFtU3RhcnQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXMgPSBjb21wdXRlU2luZ2xlUGFyYW0ocGFyYW1ldGVyU3RydWN0dXJlcywgYXJnc1twYXJhbVN0YXJ0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCAke251bWJlck9mUGFyYW1zfSBwYXJhbWV0ZXJzIGZvciAnYnkgTmFtZScgcmVxdWVzdCBwYXJhbWV0ZXIgc3RydWN0dXJlLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyA9IGFyZ3Muc2xpY2UocGFyYW1TdGFydCwgcGFyYW1FbmQpLm1hcCh2YWx1ZSA9PiB1bmRlZmluZWRUb051bGwodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZS5tZXRob2Q7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyA9IGNvbXB1dGVNZXNzYWdlUGFyYW1zKHR5cGUsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSB0eXBlLm51bWJlck9mUGFyYW1zO1xuICAgICAgICAgICAgICAgIHRva2VuID0gY2FuY2VsbGF0aW9uXzEuQ2FuY2VsbGF0aW9uVG9rZW4uaXMocGFyYW1zW251bWJlck9mUGFyYW1zXSkgPyBwYXJhbXNbbnVtYmVyT2ZQYXJhbXNdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaWQgPSBzZXF1ZW5jZU51bWJlcisrO1xuICAgICAgICAgICAgbGV0IGRpc3Bvc2FibGU7XG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlID0gdG9rZW4ub25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gY2FuY2VsbGF0aW9uU3RyYXRlZ3kuc2VuZGVyLnNlbmRDYW5jZWxsYXRpb24oY29ubmVjdGlvbiwgaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZWNlaXZlZCBubyBwcm9taXNlIGZyb20gY2FuY2VsbGF0aW9uIHN0cmF0ZWd5IHdoZW4gY2FuY2VsbGluZyBpZCAke2lkfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFNlbmRpbmcgY2FuY2VsbGF0aW9uIG1lc3NhZ2VzIGZvciBpZCAke2lkfSBmYWlsZWRgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBqc29ucnBjOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1lc3NhZ2VQYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFjZVNlbmRpbmdSZXF1ZXN0KHJlcXVlc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FuY2VsbGF0aW9uU3RyYXRlZ3kuc2VuZGVyLmVuYWJsZUNhbmNlbGxhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblN0cmF0ZWd5LnNlbmRlci5lbmFibGVDYW5jZWxsYXRpb24ocmVxdWVzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlV2l0aENsZWFudXAgPSAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25TdHJhdGVneS5zZW5kZXIuY2xlYW51cChpZCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGU/LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlamVjdFdpdGhDbGVhbnVwID0gKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25TdHJhdGVneS5zZW5kZXIuY2xlYW51cChpZCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGU/LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlUHJvbWlzZSA9IHsgbWV0aG9kOiBtZXRob2QsIHRpbWVyU3RhcnQ6IERhdGUubm93KCksIHJlc29sdmU6IHJlc29sdmVXaXRoQ2xlYW51cCwgcmVqZWN0OiByZWplY3RXaXRoQ2xlYW51cCB9O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2VXcml0ZXIud3JpdGUocmVxdWVzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2VzLnNldChpZCwgcmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgU2VuZGluZyByZXF1ZXN0IGZhaWxlZC5gKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JpdGluZyB0aGUgbWVzc2FnZSBmYWlsZWQuIFNvIHdlIG5lZWQgdG8gcmVqZWN0IHRoZSBwcm9taXNlLlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2UucmVqZWN0KG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLk1lc3NhZ2VXcml0ZUVycm9yLCBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIHJlYXNvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVxdWVzdDogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChTdGFyUmVxdWVzdEhhbmRsZXIuaXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc3RhclJlcXVlc3RIYW5kbGVyID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKElzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SGFuZGxlcnMuc2V0KHR5cGUsIHsgaGFuZGxlcjogaGFuZGxlciwgdHlwZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZS5tZXRob2Q7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIYW5kbGVycy5zZXQodHlwZS5tZXRob2QsIHsgdHlwZSwgaGFuZGxlciB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEhhbmRsZXJzLmRlbGV0ZShtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhclJlcXVlc3RIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFzUGVuZGluZ1Jlc3BvbnNlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VQcm9taXNlcy5zaXplID4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2U6IGFzeW5jIChfdmFsdWUsIF90cmFjZXIsIHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgbGV0IF9zZW5kTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgX3RyYWNlRm9ybWF0ID0gVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgICAgIGlmIChzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChJcy5ib29sZWFuKHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbmROb3RpZmljYXRpb24gPSBzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfc2VuZE5vdGlmaWNhdGlvbiA9IHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucy5zZW5kTm90aWZpY2F0aW9uIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBfdHJhY2VGb3JtYXQgPSBzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnMudHJhY2VGb3JtYXQgfHwgVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZSA9IF92YWx1ZTtcbiAgICAgICAgICAgIHRyYWNlRm9ybWF0ID0gX3RyYWNlRm9ybWF0O1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYpIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIgPSBfdHJhY2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9zZW5kTm90aWZpY2F0aW9uICYmICFpc0Nsb3NlZCgpICYmICFpc0Rpc3Bvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjb25uZWN0aW9uLnNlbmROb3RpZmljYXRpb24oU2V0VHJhY2VOb3RpZmljYXRpb24udHlwZSwgeyB2YWx1ZTogVHJhY2UudG9TdHJpbmcoX3ZhbHVlKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25FcnJvcjogZXJyb3JFbWl0dGVyLmV2ZW50LFxuICAgICAgICBvbkNsb3NlOiBjbG9zZUVtaXR0ZXIuZXZlbnQsXG4gICAgICAgIG9uVW5oYW5kbGVkTm90aWZpY2F0aW9uOiB1bmhhbmRsZWROb3RpZmljYXRpb25FbWl0dGVyLmV2ZW50LFxuICAgICAgICBvbkRpc3Bvc2U6IGRpc3Bvc2VFbWl0dGVyLmV2ZW50LFxuICAgICAgICBlbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VXcml0ZXIuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0Rpc3Bvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5EaXNwb3NlZDtcbiAgICAgICAgICAgIGRpc3Bvc2VFbWl0dGVyLmZpcmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcihtZXNzYWdlc18xLkVycm9yQ29kZXMuUGVuZGluZ1Jlc3BvbnNlUmVqZWN0ZWQsICdQZW5kaW5nIHJlc3BvbnNlIHJlamVjdGVkIHNpbmNlIGNvbm5lY3Rpb24gZ290IGRpc3Bvc2VkJyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcmVzcG9uc2VQcm9taXNlcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICByZXF1ZXN0VG9rZW5zID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAga25vd25DYW5jZWxlZFJlcXVlc3RzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgbWVzc2FnZVF1ZXVlID0gbmV3IGxpbmtlZE1hcF8xLkxpbmtlZE1hcCgpO1xuICAgICAgICAgICAgLy8gVGVzdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIGlmIChJcy5mdW5jKG1lc3NhZ2VXcml0ZXIuZGlzcG9zZSkpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlV3JpdGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChJcy5mdW5jKG1lc3NhZ2VSZWFkZXIuZGlzcG9zZSkpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlUmVhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuOiAoKSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmQ2xvc2VkT3JEaXNwb3NlZCgpO1xuICAgICAgICAgICAgdGhyb3dJZkxpc3RlbmluZygpO1xuICAgICAgICAgICAgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuTGlzdGVuaW5nO1xuICAgICAgICAgICAgbWVzc2FnZVJlYWRlci5saXN0ZW4oY2FsbGJhY2spO1xuICAgICAgICB9LFxuICAgICAgICBpbnNwZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgKDAsIHJhbF8xLmRlZmF1bHQpKCkuY29uc29sZS5sb2coJ2luc3BlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29ubmVjdGlvbi5vbk5vdGlmaWNhdGlvbihMb2dUcmFjZU5vdGlmaWNhdGlvbi50eXBlLCAocGFyYW1zKSA9PiB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gVHJhY2UuT2ZmIHx8ICF0cmFjZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2ZXJib3NlID0gdHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3Q7XG4gICAgICAgIHRyYWNlci5sb2cocGFyYW1zLm1lc3NhZ2UsIHZlcmJvc2UgPyBwYXJhbXMudmVyYm9zZSA6IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgY29ubmVjdGlvbi5vbk5vdGlmaWNhdGlvbihQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLCAocGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9ncmVzc0hhbmRsZXJzLmdldChwYXJhbXMudG9rZW4pO1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlcihwYXJhbXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdW5oYW5kbGVkUHJvZ3Jlc3NFbWl0dGVyLmZpcmUocGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25uZWN0aW9uO1xufVxuZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGNyZWF0ZU1lc3NhZ2VDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlzcG9zYWJsZSA9IHZvaWQgMDtcbnZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3Bvc2U6IGZ1bmNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChleHBvcnRzLkRpc3Bvc2FibGUgPSBEaXNwb3NhYmxlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FbWl0dGVyID0gZXhwb3J0cy5FdmVudCA9IHZvaWQgMDtcbmNvbnN0IHJhbF8xID0gcmVxdWlyZShcIi4vcmFsXCIpO1xudmFyIEV2ZW50O1xuKGZ1bmN0aW9uIChFdmVudCkge1xuICAgIGNvbnN0IF9kaXNwb3NhYmxlID0geyBkaXNwb3NlKCkgeyB9IH07XG4gICAgRXZlbnQuTm9uZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9kaXNwb3NhYmxlOyB9O1xufSkoRXZlbnQgfHwgKGV4cG9ydHMuRXZlbnQgPSBFdmVudCA9IHt9KSk7XG5jbGFzcyBDYWxsYmFja0xpc3Qge1xuICAgIGFkZChjYWxsYmFjaywgY29udGV4dCA9IG51bGwsIGJ1Y2tldCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gW107XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVja2V0KSkge1xuICAgICAgICAgICAgYnVja2V0LnB1c2goeyBkaXNwb3NlOiAoKSA9PiB0aGlzLnJlbW92ZShjYWxsYmFjaywgY29udGV4dCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlKGNhbGxiYWNrLCBjb250ZXh0ID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmb3VuZENhbGxiYWNrV2l0aERpZmZlcmVudENvbnRleHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrc1tpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29udGV4dHNbaV0gPT09IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiBjb250ZXh0IG1hdGNoID0+IHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kQ2FsbGJhY2tXaXRoRGlmZmVyZW50Q29udGV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb3VuZENhbGxiYWNrV2l0aERpZmZlcmVudENvbnRleHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBhZGRpbmcgYSBsaXN0ZW5lciB3aXRoIGEgY29udGV4dCwgeW91IHNob3VsZCByZW1vdmUgaXQgd2l0aCB0aGUgc2FtZSBjb250ZXh0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXQgPSBbXSwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLnNsaWNlKDApLCBjb250ZXh0cyA9IHRoaXMuX2NvbnRleHRzLnNsaWNlKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKGNhbGxiYWNrc1tpXS5hcHBseShjb250ZXh0c1tpXSwgYXJncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgICAgICgwLCByYWxfMS5kZWZhdWx0KSgpLmNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9jYWxsYmFja3MgfHwgdGhpcy5fY2FsbGJhY2tzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9jb250ZXh0cyA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5jbGFzcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihfb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX29wdGlvbnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciB0aGUgcHVibGljIHRvIGFsbG93IHRvIHN1YnNjcmliZVxuICAgICAqIHRvIGV2ZW50cyBmcm9tIHRoaXMgRW1pdHRlclxuICAgICAqL1xuICAgIGdldCBldmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ldmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSAobGlzdGVuZXIsIHRoaXNBcmdzLCBkaXNwb3NhYmxlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IG5ldyBDYWxsYmFja0xpc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5vbkZpcnN0TGlzdGVuZXJBZGQgJiYgdGhpcy5fY2FsbGJhY2tzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uRmlyc3RMaXN0ZW5lckFkZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLmFkZChsaXN0ZW5lciwgdGhpc0FyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwb3NhYmxlIGlzIGRpc3Bvc2VkIGFmdGVyIGVtaXR0ZXIgaXMgZGlzcG9zZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnJlbW92ZShsaXN0ZW5lciwgdGhpc0FyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRpc3Bvc2UgPSBFbWl0dGVyLl9ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5vbkxhc3RMaXN0ZW5lclJlbW92ZSAmJiB0aGlzLl9jYWxsYmFja3MuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkxhc3RMaXN0ZW5lclJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGlzcG9zYWJsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUbyBiZSBrZXB0IHByaXZhdGUgdG8gZmlyZSBhbiBldmVudCB0b1xuICAgICAqIHN1YnNjcmliZXJzXG4gICAgICovXG4gICAgZmlyZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MuaW52b2tlLmNhbGwodGhpcy5fY2FsbGJhY2tzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRW1pdHRlciA9IEVtaXR0ZXI7XG5FbWl0dGVyLl9ub29wID0gZnVuY3Rpb24gKCkgeyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0cmluZ0FycmF5ID0gZXhwb3J0cy5hcnJheSA9IGV4cG9ydHMuZnVuYyA9IGV4cG9ydHMuZXJyb3IgPSBleHBvcnRzLm51bWJlciA9IGV4cG9ydHMuc3RyaW5nID0gZXhwb3J0cy5ib29sZWFuID0gdm9pZCAwO1xuZnVuY3Rpb24gYm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG59XG5leHBvcnRzLmJvb2xlYW4gPSBib29sZWFuO1xuZnVuY3Rpb24gc3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59XG5leHBvcnRzLnN0cmluZyA9IHN0cmluZztcbmZ1bmN0aW9uIG51bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHZhbHVlIGluc3RhbmNlb2YgTnVtYmVyO1xufVxuZXhwb3J0cy5udW1iZXIgPSBudW1iZXI7XG5mdW5jdGlvbiBlcnJvcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yO1xufVxuZXhwb3J0cy5lcnJvciA9IGVycm9yO1xuZnVuY3Rpb24gZnVuYyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmZ1bmMgPSBmdW5jO1xuZnVuY3Rpb24gYXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5leHBvcnRzLmFycmF5ID0gYXJyYXk7XG5mdW5jdGlvbiBzdHJpbmdBcnJheSh2YWx1ZSkge1xuICAgIHJldHVybiBhcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoZWxlbSA9PiBzdHJpbmcoZWxlbSkpO1xufVxuZXhwb3J0cy5zdHJpbmdBcnJheSA9IHN0cmluZ0FycmF5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTFJVQ2FjaGUgPSBleHBvcnRzLkxpbmtlZE1hcCA9IGV4cG9ydHMuVG91Y2ggPSB2b2lkIDA7XG52YXIgVG91Y2g7XG4oZnVuY3Rpb24gKFRvdWNoKSB7XG4gICAgVG91Y2guTm9uZSA9IDA7XG4gICAgVG91Y2guRmlyc3QgPSAxO1xuICAgIFRvdWNoLkFzT2xkID0gVG91Y2guRmlyc3Q7XG4gICAgVG91Y2guTGFzdCA9IDI7XG4gICAgVG91Y2guQXNOZXcgPSBUb3VjaC5MYXN0O1xufSkoVG91Y2ggfHwgKGV4cG9ydHMuVG91Y2ggPSBUb3VjaCA9IHt9KSk7XG5jbGFzcyBMaW5rZWRNYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzW19hXSA9ICdMaW5rZWRNYXAnO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2hlYWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3RhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fdGFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlKys7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5faGVhZCAmJiAhdGhpcy5fdGFpbDtcbiAgICB9XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkPy52YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWlsPy52YWx1ZTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5LCB0b3VjaCA9IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX21hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b3VjaCAhPT0gVG91Y2guTm9uZSkge1xuICAgICAgICAgICAgdGhpcy50b3VjaChpdGVtLCB0b3VjaCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlLCB0b3VjaCA9IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9tYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodG91Y2ggIT09IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoKGl0ZW0sIHRvdWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSB7IGtleSwgdmFsdWUsIG5leHQ6IHVuZGVmaW5lZCwgcHJldmlvdXM6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgc3dpdGNoICh0b3VjaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgVG91Y2guTm9uZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUb3VjaC5GaXJzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtRmlyc3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVG91Y2guTGFzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KGtleSwgaXRlbSk7XG4gICAgICAgICAgICB0aGlzLl9zaXplKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5yZW1vdmUoa2V5KTtcbiAgICB9XG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuX3NpemUtLTtcbiAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHNoaWZ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgJiYgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkIHx8ICF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICB0aGlzLl9tYXAuZGVsZXRlKGl0ZW0ua2V5KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLl9zaXplLS07XG4gICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkO1xuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja2ZuLmJpbmQodGhpc0FyZykoY3VycmVudC52YWx1ZSwgY3VycmVudC5rZXksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tmbihjdXJyZW50LnZhbHVlLCBjdXJyZW50LmtleSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMaW5rZWRNYXAgZ290IG1vZGlmaWVkIGR1cmluZyBpdGVyYXRpb24uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZDtcbiAgICAgICAgY29uc3QgaXRlcmF0b3IgPSB7XG4gICAgICAgICAgICBbU3ltYm9sLml0ZXJhdG9yXTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExpbmtlZE1hcCBnb3QgbW9kaWZpZWQgZHVyaW5nIGl0ZXJhdGlvbi5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB2YWx1ZTogY3VycmVudC5rZXksIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkO1xuICAgICAgICBjb25zdCBpdGVyYXRvciA9IHtcbiAgICAgICAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTGlua2VkTWFwIGdvdCBtb2RpZmllZCBkdXJpbmcgaXRlcmF0aW9uLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHZhbHVlOiBjdXJyZW50LnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgIH1cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIGNvbnN0IGl0ZXJhdG9yID0ge1xuICAgICAgICAgICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMaW5rZWRNYXAgZ290IG1vZGlmaWVkIGR1cmluZyBpdGVyYXRpb24uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdmFsdWU6IFtjdXJyZW50LmtleSwgY3VycmVudC52YWx1ZV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIFsoX2EgPSBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC5pdGVyYXRvcildKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfVxuICAgIHRyaW1PbGQobmV3U2l6ZSkge1xuICAgICAgICBpZiAobmV3U2l6ZSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3U2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZDtcbiAgICAgICAgbGV0IGN1cnJlbnRTaXplID0gdGhpcy5zaXplO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50U2l6ZSA+IG5ld1NpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5kZWxldGUoY3VycmVudC5rZXkpO1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnRTaXplLS07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGVhZCA9IGN1cnJlbnQ7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjdXJyZW50U2l6ZTtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucHJldmlvdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICB9XG4gICAgYWRkSXRlbUZpcnN0KGl0ZW0pIHtcbiAgICAgICAgLy8gRmlyc3QgdGltZSBJbnNlcnRcbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkICYmICF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5faGVhZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXZpb3VzID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oZWFkID0gaXRlbTtcbiAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICB9XG4gICAgYWRkSXRlbUxhc3QoaXRlbSkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lIEluc2VydFxuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgJiYgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5wcmV2aW91cyA9IHRoaXMuX3RhaWw7XG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtO1xuICAgICAgICB0aGlzLl9zdGF0ZSsrO1xuICAgIH1cbiAgICByZW1vdmVJdGVtKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQgJiYgaXRlbSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbSA9PT0gdGhpcy5faGVhZCkge1xuICAgICAgICAgICAgLy8gVGhpcyBjYW4gb25seSBoYXBwZW5lZCBpZiBzaXplID09PSAxIHdoaWNoIGlzIGhhbmRsZVxuICAgICAgICAgICAgLy8gYnkgdGhlIGNhc2UgYWJvdmUuXG4gICAgICAgICAgICBpZiAoIWl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldmlvdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZW0gPT09IHRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuZWQgaWYgc2l6ZSA9PT0gMSB3aGljaCBpcyBoYW5kbGVcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBjYXNlIGFib3ZlLlxuICAgICAgICAgICAgaWYgKCFpdGVtLnByZXZpb3VzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0ucHJldmlvdXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gaXRlbS5wcmV2aW91cztcbiAgICAgICAgICAgIGlmICghbmV4dCB8fCAhcHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpdGVtLnByZXZpb3VzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9zdGF0ZSsrO1xuICAgIH1cbiAgICB0b3VjaChpdGVtLCB0b3VjaCkge1xuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgfHwgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaXN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0b3VjaCAhPT0gVG91Y2guRmlyc3QgJiYgdG91Y2ggIT09IFRvdWNoLkxhc3QpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdWNoID09PSBUb3VjaC5GaXJzdCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICAgICAgLy8gVW5saW5rIHRoZSBpdGVtXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzIG11c3QgYmUgZGVmaW5lZCBzaW5jZSBpdGVtIHdhcyBub3QgaGVhZCBidXQgaXMgdGFpbFxuICAgICAgICAgICAgICAgIC8vIFNvIHRoZXJlIGFyZSBtb3JlIHRoYW4gb24gaXRlbSBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWlsID0gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBCb3RoIG5leHQgYW5kIHByZXZpb3VzIGFyZSBub3QgdW5kZWZpbmVkIHNpbmNlIGl0ZW0gd2FzIG5laXRoZXIgaGVhZCBub3IgdGFpbC5cbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIG5vZGUgYXQgaGVhZFxuICAgICAgICAgICAgaXRlbS5wcmV2aW91cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXZpb3VzID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaCA9PT0gVG91Y2guTGFzdCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICAgICAgLy8gVW5saW5rIHRoZSBpdGVtLlxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBuZXh0IG11c3QgYmUgZGVmaW5lZCBzaW5jZSBpdGVtIHdhcyBub3QgdGFpbCBidXQgaXMgaGVhZFxuICAgICAgICAgICAgICAgIC8vIFNvIHRoZXJlIGFyZSBtb3JlIHRoYW4gb24gaXRlbSBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFkID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEJvdGggbmV4dCBhbmQgcHJldmlvdXMgYXJlIG5vdCB1bmRlZmluZWQgc2luY2UgaXRlbSB3YXMgbmVpdGhlciBoZWFkIG5vciB0YWlsLlxuICAgICAgICAgICAgICAgIG5leHQucHJldmlvdXMgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGl0ZW0ucHJldmlvdXMgPSB0aGlzLl90YWlsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBmcm9tSlNPTihkYXRhKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkxpbmtlZE1hcCA9IExpbmtlZE1hcDtcbmNsYXNzIExSVUNhY2hlIGV4dGVuZHMgTGlua2VkTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihsaW1pdCwgcmF0aW8gPSAxKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgIHRoaXMuX3JhdGlvID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcmF0aW8pLCAxKTtcbiAgICB9XG4gICAgZ2V0IGxpbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGltaXQ7XG4gICAgfVxuICAgIHNldCBsaW1pdChsaW1pdCkge1xuICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICB0aGlzLmNoZWNrVHJpbSgpO1xuICAgIH1cbiAgICBnZXQgcmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXRpbztcbiAgICB9XG4gICAgc2V0IHJhdGlvKHJhdGlvKSB7XG4gICAgICAgIHRoaXMuX3JhdGlvID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcmF0aW8pLCAxKTtcbiAgICAgICAgdGhpcy5jaGVja1RyaW0oKTtcbiAgICB9XG4gICAgZ2V0KGtleSwgdG91Y2ggPSBUb3VjaC5Bc05ldykge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSwgdG91Y2gpO1xuICAgIH1cbiAgICBwZWVrKGtleSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSwgVG91Y2guTm9uZSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLnNldChrZXksIHZhbHVlLCBUb3VjaC5MYXN0KTtcbiAgICAgICAgdGhpcy5jaGVja1RyaW0oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNoZWNrVHJpbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+IHRoaXMuX2xpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnRyaW1PbGQoTWF0aC5yb3VuZCh0aGlzLl9saW1pdCAqIHRoaXMuX3JhdGlvKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkxSVUNhY2hlID0gTFJVQ2FjaGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VCdWZmZXIgPSB2b2lkIDA7XG5jb25zdCBDUiA9IDEzO1xuY29uc3QgTEYgPSAxMDtcbmNvbnN0IENSTEYgPSAnXFxyXFxuJztcbmNsYXNzIEFic3RyYWN0TWVzc2FnZUJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoZW5jb2RpbmcgPSAndXRmLTgnKSB7XG4gICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgIHRoaXMuX2NodW5rcyA9IFtdO1xuICAgICAgICB0aGlzLl90b3RhbExlbmd0aCA9IDA7XG4gICAgfVxuICAgIGdldCBlbmNvZGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY29kaW5nO1xuICAgIH1cbiAgICBhcHBlbmQoY2h1bmspIHtcbiAgICAgICAgY29uc3QgdG9BcHBlbmQgPSB0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnID8gdGhpcy5mcm9tU3RyaW5nKGNodW5rLCB0aGlzLl9lbmNvZGluZykgOiBjaHVuaztcbiAgICAgICAgdGhpcy5fY2h1bmtzLnB1c2godG9BcHBlbmQpO1xuICAgICAgICB0aGlzLl90b3RhbExlbmd0aCArPSB0b0FwcGVuZC5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICB0cnlSZWFkSGVhZGVycyhsb3dlckNhc2VLZXlzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NodW5rcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXRlID0gMDtcbiAgICAgICAgbGV0IGNodW5rSW5kZXggPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGNodW5rQnl0ZXNSZWFkID0gMDtcbiAgICAgICAgcm93OiB3aGlsZSAoY2h1bmtJbmRleCA8IHRoaXMuX2NodW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fY2h1bmtzW2NodW5rSW5kZXhdO1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIGNvbHVtbjogd2hpbGUgKG9mZnNldCA8IGNodW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2h1bmtbb2Zmc2V0XTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ1I6XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBMRjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayByb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2h1bmtCeXRlc1JlYWQgKz0gY2h1bmsuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgIGNodW5rSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUgIT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGJ1ZmZlciBjb250YWlucyB0aGUgdHdvIENSTEYgYXQgdGhlIGVuZC4gU28gd2Ugd2lsbFxuICAgICAgICAvLyBoYXZlIHR3byBlbXB0eSBsaW5lcyBhZnRlciB0aGUgc3BsaXQgYXQgdGhlIGVuZCBhcyB3ZWxsLlxuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9yZWFkKGNodW5rQnl0ZXNSZWFkICsgb2Zmc2V0KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy50b1N0cmluZyhidWZmZXIsICdhc2NpaScpLnNwbGl0KENSTEYpO1xuICAgICAgICBpZiAoaGVhZGVycy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlcnNbaV07XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGhlYWRlci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlIGhlYWRlciBtdXN0IHNlcGFyYXRlIGtleSBhbmQgdmFsdWUgdXNpbmcgJzonXFxuJHtoZWFkZXJ9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBoZWFkZXIuc3Vic3RyKDAsIGluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaGVhZGVyLnN1YnN0cihpbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQobG93ZXJDYXNlS2V5cyA/IGtleS50b0xvd2VyQ2FzZSgpIDoga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdHJ5UmVhZEJvZHkobGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl90b3RhbExlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZChsZW5ndGgpO1xuICAgIH1cbiAgICBnZXQgbnVtYmVyT2ZCeXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsTGVuZ3RoO1xuICAgIH1cbiAgICBfcmVhZChieXRlQ291bnQpIHtcbiAgICAgICAgaWYgKGJ5dGVDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlCdWZmZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZUNvdW50ID4gdGhpcy5fdG90YWxMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlYWQgc28gbWFueSBieXRlcyFgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2h1bmtzWzBdLmJ5dGVMZW5ndGggPT09IGJ5dGVDb3VudCkge1xuICAgICAgICAgICAgLy8gc3VwZXIgZmFzdCBwYXRoLCBwcmVjaXNlbHkgZmlyc3QgY2h1bmsgbXVzdCBiZSByZXR1cm5lZFxuICAgICAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLl9jaHVua3NbMF07XG4gICAgICAgICAgICB0aGlzLl9jaHVua3Muc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsTGVuZ3RoIC09IGJ5dGVDb3VudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzTmF0aXZlKGNodW5rKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2h1bmtzWzBdLmJ5dGVMZW5ndGggPiBieXRlQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGZhc3QgcGF0aCwgdGhlIHJlYWRpbmcgaXMgZW50aXJlbHkgd2l0aGluIHRoZSBmaXJzdCBjaHVua1xuICAgICAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLl9jaHVua3NbMF07XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmFzTmF0aXZlKGNodW5rLCBieXRlQ291bnQpO1xuICAgICAgICAgICAgdGhpcy5fY2h1bmtzWzBdID0gY2h1bmsuc2xpY2UoYnl0ZUNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsTGVuZ3RoIC09IGJ5dGVDb3VudDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hbGxvY05hdGl2ZShieXRlQ291bnQpO1xuICAgICAgICBsZXQgcmVzdWx0T2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGNodW5rSW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoYnl0ZUNvdW50ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLl9jaHVua3NbY2h1bmtJbmRleF07XG4gICAgICAgICAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCA+IGJ5dGVDb3VudCkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgY2h1bmsgd2lsbCBzdXJ2aXZlXG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmtQYXJ0ID0gY2h1bmsuc2xpY2UoMCwgYnl0ZUNvdW50KTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGNodW5rUGFydCwgcmVzdWx0T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICByZXN1bHRPZmZzZXQgKz0gYnl0ZUNvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX2NodW5rc1tjaHVua0luZGV4XSA9IGNodW5rLnNsaWNlKGJ5dGVDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxMZW5ndGggLT0gYnl0ZUNvdW50O1xuICAgICAgICAgICAgICAgIGJ5dGVDb3VudCAtPSBieXRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGNodW5rIHdpbGwgYmUgZW50aXJlbHkgcmVhZFxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoY2h1bmssIHJlc3VsdE9mZnNldCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0T2Zmc2V0ICs9IGNodW5rLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2h1bmtzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxMZW5ndGggLT0gY2h1bmsuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICBieXRlQ291bnQgLT0gY2h1bmsuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlQnVmZmVyID0gQWJzdHJhY3RNZXNzYWdlQnVmZmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlYWRhYmxlU3RyZWFtTWVzc2FnZVJlYWRlciA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlUmVhZGVyID0gZXhwb3J0cy5NZXNzYWdlUmVhZGVyID0gdm9pZCAwO1xuY29uc3QgcmFsXzEgPSByZXF1aXJlKFwiLi9yYWxcIik7XG5jb25zdCBJcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiLi9ldmVudHNcIik7XG5jb25zdCBzZW1hcGhvcmVfMSA9IHJlcXVpcmUoXCIuL3NlbWFwaG9yZVwiKTtcbnZhciBNZXNzYWdlUmVhZGVyO1xuKGZ1bmN0aW9uIChNZXNzYWdlUmVhZGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLmZ1bmMoY2FuZGlkYXRlLmxpc3RlbikgJiYgSXMuZnVuYyhjYW5kaWRhdGUuZGlzcG9zZSkgJiZcbiAgICAgICAgICAgIElzLmZ1bmMoY2FuZGlkYXRlLm9uRXJyb3IpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9uQ2xvc2UpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9uUGFydGlhbE1lc3NhZ2UpO1xuICAgIH1cbiAgICBNZXNzYWdlUmVhZGVyLmlzID0gaXM7XG59KShNZXNzYWdlUmVhZGVyIHx8IChleHBvcnRzLk1lc3NhZ2VSZWFkZXIgPSBNZXNzYWdlUmVhZGVyID0ge30pKTtcbmNsYXNzIEFic3RyYWN0TWVzc2FnZVJlYWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgICAgICB0aGlzLnBhcnRpYWxNZXNzYWdlRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBnZXQgb25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JFbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBmaXJlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvckVtaXR0ZXIuZmlyZSh0aGlzLmFzRXJyb3IoZXJyb3IpKTtcbiAgICB9XG4gICAgZ2V0IG9uQ2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb3NlRW1pdHRlci5ldmVudDtcbiAgICB9XG4gICAgZmlyZUNsb3NlKCkge1xuICAgICAgICB0aGlzLmNsb3NlRW1pdHRlci5maXJlKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGdldCBvblBhcnRpYWxNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWFsTWVzc2FnZUVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIGZpcmVQYXJ0aWFsTWVzc2FnZShpbmZvKSB7XG4gICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VFbWl0dGVyLmZpcmUoaW5mbyk7XG4gICAgfVxuICAgIGFzRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYFJlYWRlciByZWNlaXZlZCBlcnJvci4gUmVhc29uOiAke0lzLnN0cmluZyhlcnJvci5tZXNzYWdlKSA/IGVycm9yLm1lc3NhZ2UgOiAndW5rbm93bid9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkFic3RyYWN0TWVzc2FnZVJlYWRlciA9IEFic3RyYWN0TWVzc2FnZVJlYWRlcjtcbnZhciBSZXNvbHZlZE1lc3NhZ2VSZWFkZXJPcHRpb25zO1xuKGZ1bmN0aW9uIChSZXNvbHZlZE1lc3NhZ2VSZWFkZXJPcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gZnJvbU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgY2hhcnNldDtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgbGV0IGNvbnRlbnREZWNvZGVyO1xuICAgICAgICBjb25zdCBjb250ZW50RGVjb2RlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBjb250ZW50VHlwZURlY29kZXI7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlRGVjb2RlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjaGFyc2V0ID0gb3B0aW9ucyA/PyAndXRmLTgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldCA/PyAndXRmLTgnO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGVudERlY29kZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnREZWNvZGVyID0gb3B0aW9ucy5jb250ZW50RGVjb2RlcjtcbiAgICAgICAgICAgICAgICBjb250ZW50RGVjb2RlcnMuc2V0KGNvbnRlbnREZWNvZGVyLm5hbWUsIGNvbnRlbnREZWNvZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRlbnREZWNvZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZWNvZGVyIG9mIG9wdGlvbnMuY29udGVudERlY29kZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnREZWNvZGVycy5zZXQoZGVjb2Rlci5uYW1lLCBkZWNvZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250ZW50VHlwZURlY29kZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlciA9IG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVyO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlcnMuc2V0KGNvbnRlbnRUeXBlRGVjb2Rlci5uYW1lLCBjb250ZW50VHlwZURlY29kZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZWNvZGVyIG9mIG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZURlY29kZXJzLnNldChkZWNvZGVyLm5hbWUsIGRlY29kZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudFR5cGVEZWNvZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlciA9ICgwLCByYWxfMS5kZWZhdWx0KSgpLmFwcGxpY2F0aW9uSnNvbi5kZWNvZGVyO1xuICAgICAgICAgICAgY29udGVudFR5cGVEZWNvZGVycy5zZXQoY29udGVudFR5cGVEZWNvZGVyLm5hbWUsIGNvbnRlbnRUeXBlRGVjb2Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgY2hhcnNldCwgY29udGVudERlY29kZXIsIGNvbnRlbnREZWNvZGVycywgY29udGVudFR5cGVEZWNvZGVyLCBjb250ZW50VHlwZURlY29kZXJzIH07XG4gICAgfVxuICAgIFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMuZnJvbU9wdGlvbnMgPSBmcm9tT3B0aW9ucztcbn0pKFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMgfHwgKFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMgPSB7fSkpO1xuY2xhc3MgUmVhZGFibGVTdHJlYW1NZXNzYWdlUmVhZGVyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkYWJsZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJlYWRhYmxlID0gcmVhZGFibGU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMuZnJvbU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gKDAsIHJhbF8xLmRlZmF1bHQpKCkubWVzc2FnZUJ1ZmZlci5jcmVhdGUodGhpcy5vcHRpb25zLmNoYXJzZXQpO1xuICAgICAgICB0aGlzLl9wYXJ0aWFsTWVzc2FnZVRpbWVvdXQgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5uZXh0TWVzc2FnZUxlbmd0aCA9IC0xO1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb2tlbiA9IDA7XG4gICAgICAgIHRoaXMucmVhZFNlbWFwaG9yZSA9IG5ldyBzZW1hcGhvcmVfMS5TZW1hcGhvcmUoMSk7XG4gICAgfVxuICAgIHNldCBwYXJ0aWFsTWVzc2FnZVRpbWVvdXQodGltZW91dCkge1xuICAgICAgICB0aGlzLl9wYXJ0aWFsTWVzc2FnZVRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cbiAgICBnZXQgcGFydGlhbE1lc3NhZ2VUaW1lb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydGlhbE1lc3NhZ2VUaW1lb3V0O1xuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5uZXh0TWVzc2FnZUxlbmd0aCA9IC0xO1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb2tlbiA9IDA7XG4gICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnJlYWRhYmxlLm9uRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlYWRhYmxlLm9uRXJyb3IoKGVycm9yKSA9PiB0aGlzLmZpcmVFcnJvcihlcnJvcikpO1xuICAgICAgICB0aGlzLnJlYWRhYmxlLm9uQ2xvc2UoKCkgPT4gdGhpcy5maXJlQ2xvc2UoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5leHRNZXNzYWdlTGVuZ3RoID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5idWZmZXIudHJ5UmVhZEhlYWRlcnModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBoZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihuZXcgRXJyb3IoYEhlYWRlciBtdXN0IHByb3ZpZGUgYSBDb250ZW50LUxlbmd0aCBwcm9wZXJ0eS5cXG4ke0pTT04uc3RyaW5naWZ5KE9iamVjdC5mcm9tRW50cmllcyhoZWFkZXJzKSl9YCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHBhcnNlSW50KGNvbnRlbnRMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4obGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlRXJyb3IobmV3IEVycm9yKGBDb250ZW50LUxlbmd0aCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyLiBHb3QgJHtjb250ZW50TGVuZ3RofWApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRNZXNzYWdlTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5idWZmZXIudHJ5UmVhZEJvZHkodGhpcy5uZXh0TWVzc2FnZUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvKiogV2UgaGF2ZW4ndCByZWNlaXZlZCB0aGUgZnVsbCBtZXNzYWdlIHlldC4gKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJ0aWFsTWVzc2FnZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhcnRpYWxNZXNzYWdlVGltZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRNZXNzYWdlTGVuZ3RoID0gLTE7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgd2UgY29udmVydCBvbmUgcmVjZWl2ZWQgbWVzc2FnZSBhZnRlciB0aGVcbiAgICAgICAgICAgICAgICAvLyBvdGhlci4gT3RoZXJ3aXNlIGl0IGNvdWxkIGhhcHBlbiB0aGF0IGEgZGVjb2Rpbmcgb2YgYSBzZWNvbmRcbiAgICAgICAgICAgICAgICAvLyBzbWFsbGVyIG1lc3NhZ2UgZmluaXNoZWQgYmVmb3JlIHRoZSBkZWNvZGluZyBvZiBhIGZpcnN0IGxhcmdlclxuICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2UgYW5kIHRoZW4gd2Ugd291bGQgZGVsaXZlciB0aGUgc2Vjb25kIG1lc3NhZ2UgZmlyc3QuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkU2VtYXBob3JlLmxvY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBieXRlcyA9IHRoaXMub3B0aW9ucy5jb250ZW50RGVjb2RlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGF3YWl0IHRoaXMub3B0aW9ucy5jb250ZW50RGVjb2Rlci5kZWNvZGUoYm9keSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYm9keTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMub3B0aW9ucy5jb250ZW50VHlwZURlY29kZXIuZGVjb2RlKGJ5dGVzLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJQYXJ0aWFsTWVzc2FnZVRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJ0aWFsTWVzc2FnZVRpbWVyKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxNZXNzYWdlVGltZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsTWVzc2FnZVRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFBhcnRpYWxNZXNzYWdlVGltZXIoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJQYXJ0aWFsTWVzc2FnZVRpbWVyKCk7XG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWFsTWVzc2FnZVRpbWVvdXQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VUaW1lciA9ICgwLCByYWxfMS5kZWZhdWx0KSgpLnRpbWVyLnNldFRpbWVvdXQoKHRva2VuLCB0aW1lb3V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxNZXNzYWdlVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMubWVzc2FnZVRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlUGFydGlhbE1lc3NhZ2UoeyBtZXNzYWdlVG9rZW46IHRva2VuLCB3YWl0aW5nVGltZTogdGltZW91dCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcnRpYWxNZXNzYWdlVGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5fcGFydGlhbE1lc3NhZ2VUaW1lb3V0LCB0aGlzLm1lc3NhZ2VUb2tlbiwgdGhpcy5fcGFydGlhbE1lc3NhZ2VUaW1lb3V0KTtcbiAgICB9XG59XG5leHBvcnRzLlJlYWRhYmxlU3RyZWFtTWVzc2FnZVJlYWRlciA9IFJlYWRhYmxlU3RyZWFtTWVzc2FnZVJlYWRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIgPSBleHBvcnRzLk1lc3NhZ2VXcml0ZXIgPSB2b2lkIDA7XG5jb25zdCByYWxfMSA9IHJlcXVpcmUoXCIuL3JhbFwiKTtcbmNvbnN0IElzID0gcmVxdWlyZShcIi4vaXNcIik7XG5jb25zdCBzZW1hcGhvcmVfMSA9IHJlcXVpcmUoXCIuL3NlbWFwaG9yZVwiKTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuY29uc3QgQ29udGVudExlbmd0aCA9ICdDb250ZW50LUxlbmd0aDogJztcbmNvbnN0IENSTEYgPSAnXFxyXFxuJztcbnZhciBNZXNzYWdlV3JpdGVyO1xuKGZ1bmN0aW9uIChNZXNzYWdlV3JpdGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLmZ1bmMoY2FuZGlkYXRlLmRpc3Bvc2UpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9uQ2xvc2UpICYmXG4gICAgICAgICAgICBJcy5mdW5jKGNhbmRpZGF0ZS5vbkVycm9yKSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS53cml0ZSk7XG4gICAgfVxuICAgIE1lc3NhZ2VXcml0ZXIuaXMgPSBpcztcbn0pKE1lc3NhZ2VXcml0ZXIgfHwgKGV4cG9ydHMuTWVzc2FnZVdyaXRlciA9IE1lc3NhZ2VXcml0ZXIgPSB7fSkpO1xuY2xhc3MgQWJzdHJhY3RNZXNzYWdlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lcnJvckVtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNsb3NlRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBnZXQgb25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JFbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBmaXJlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGNvdW50KSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmZpcmUoW3RoaXMuYXNFcnJvcihlcnJvciksIG1lc3NhZ2UsIGNvdW50XSk7XG4gICAgfVxuICAgIGdldCBvbkNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9zZUVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIGZpcmVDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZmlyZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBhc0Vycm9yKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBXcml0ZXIgcmVjZWl2ZWQgZXJyb3IuIFJlYXNvbjogJHtJcy5zdHJpbmcoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDogJ3Vua25vd24nfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIgPSBBYnN0cmFjdE1lc3NhZ2VXcml0ZXI7XG52YXIgUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucztcbihmdW5jdGlvbiAoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIGZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGNoYXJzZXQ6IG9wdGlvbnMgPz8gJ3V0Zi04JywgY29udGVudFR5cGVFbmNvZGVyOiAoMCwgcmFsXzEuZGVmYXVsdCkoKS5hcHBsaWNhdGlvbkpzb24uZW5jb2RlciB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgY2hhcnNldDogb3B0aW9ucy5jaGFyc2V0ID8/ICd1dGYtOCcsIGNvbnRlbnRFbmNvZGVyOiBvcHRpb25zLmNvbnRlbnRFbmNvZGVyLCBjb250ZW50VHlwZUVuY29kZXI6IG9wdGlvbnMuY29udGVudFR5cGVFbmNvZGVyID8/ICgwLCByYWxfMS5kZWZhdWx0KSgpLmFwcGxpY2F0aW9uSnNvbi5lbmNvZGVyIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucy5mcm9tT3B0aW9ucyA9IGZyb21PcHRpb25zO1xufSkoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucyB8fCAoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucyA9IHt9KSk7XG5jbGFzcyBXcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih3cml0YWJsZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gd3JpdGFibGU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFJlc29sdmVkTWVzc2FnZVdyaXRlck9wdGlvbnMuZnJvbU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XG4gICAgICAgIHRoaXMud3JpdGVTZW1hcGhvcmUgPSBuZXcgc2VtYXBob3JlXzEuU2VtYXBob3JlKDEpO1xuICAgICAgICB0aGlzLndyaXRhYmxlLm9uRXJyb3IoKGVycm9yKSA9PiB0aGlzLmZpcmVFcnJvcihlcnJvcikpO1xuICAgICAgICB0aGlzLndyaXRhYmxlLm9uQ2xvc2UoKCkgPT4gdGhpcy5maXJlQ2xvc2UoKSk7XG4gICAgfVxuICAgIGFzeW5jIHdyaXRlKG1zZykge1xuICAgICAgICByZXR1cm4gdGhpcy53cml0ZVNlbWFwaG9yZS5sb2NrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLm9wdGlvbnMuY29udGVudFR5cGVFbmNvZGVyLmVuY29kZShtc2csIHRoaXMub3B0aW9ucykudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50RW5jb2RlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29udGVudEVuY29kZXIuZW5jb2RlKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChDb250ZW50TGVuZ3RoLCBidWZmZXIuYnl0ZUxlbmd0aC50b1N0cmluZygpLCBDUkxGKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goQ1JMRik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9Xcml0ZShtc2csIGhlYWRlcnMsIGJ1ZmZlcik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGRvV3JpdGUobXNnLCBoZWFkZXJzLCBkYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLndyaXRhYmxlLndyaXRlKGhlYWRlcnMuam9pbignJyksICdhc2NpaScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGFibGUud3JpdGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBtc2cpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVFcnJvcihlcnJvciwgbXNnKSB7XG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCsrO1xuICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvciwgbXNnLCB0aGlzLmVycm9yQ291bnQpO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUuZW5kKCk7XG4gICAgfVxufVxuZXhwb3J0cy5Xcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyID0gV3JpdGVhYmxlU3RyZWFtTWVzc2FnZVdyaXRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXNzYWdlID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlOSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTggPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU3ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTUgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU0ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMyA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTIgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGUxID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuUmVxdWVzdFR5cGU5ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTggPSBleHBvcnRzLlJlcXVlc3RUeXBlNyA9IGV4cG9ydHMuUmVxdWVzdFR5cGU2ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTUgPSBleHBvcnRzLlJlcXVlc3RUeXBlNCA9IGV4cG9ydHMuUmVxdWVzdFR5cGUzID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTIgPSBleHBvcnRzLlJlcXVlc3RUeXBlMSA9IGV4cG9ydHMuUmVxdWVzdFR5cGUgPSBleHBvcnRzLlJlcXVlc3RUeXBlMCA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlID0gZXhwb3J0cy5QYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gZXhwb3J0cy5SZXNwb25zZUVycm9yID0gZXhwb3J0cy5FcnJvckNvZGVzID0gdm9pZCAwO1xuY29uc3QgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbi8qKlxuICogUHJlZGVmaW5lZCBlcnJvciBjb2Rlcy5cbiAqL1xudmFyIEVycm9yQ29kZXM7XG4oZnVuY3Rpb24gKEVycm9yQ29kZXMpIHtcbiAgICAvLyBEZWZpbmVkIGJ5IEpTT04gUlBDXG4gICAgRXJyb3JDb2Rlcy5QYXJzZUVycm9yID0gLTMyNzAwO1xuICAgIEVycm9yQ29kZXMuSW52YWxpZFJlcXVlc3QgPSAtMzI2MDA7XG4gICAgRXJyb3JDb2Rlcy5NZXRob2ROb3RGb3VuZCA9IC0zMjYwMTtcbiAgICBFcnJvckNvZGVzLkludmFsaWRQYXJhbXMgPSAtMzI2MDI7XG4gICAgRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yID0gLTMyNjAzO1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIHN0YXJ0IHJhbmdlIG9mIEpTT04gUlBDIHJlc2VydmVkIGVycm9yIGNvZGVzLlxuICAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLiBObyBhcHBsaWNhdGlvbiBlcnJvciBjb2RlcyBzaG91bGRcbiAgICAgKiBiZSBkZWZpbmVkIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgcmFuZ2UuIEZvciBiYWNrd2FyZHNcbiAgICAgKiBjb21wYXRpYmlsaXR5IHRoZSBgU2VydmVyTm90SW5pdGlhbGl6ZWRgIGFuZCB0aGUgYFVua25vd25FcnJvckNvZGVgXG4gICAgICogYXJlIGxlZnQgaW4gdGhlIHJhbmdlLlxuICAgICAqXG4gICAgICogQHNpbmNlIDMuMTYuMFxuICAgICovXG4gICAgRXJyb3JDb2Rlcy5qc29ucnBjUmVzZXJ2ZWRFcnJvclJhbmdlU3RhcnQgPSAtMzIwOTk7XG4gICAgLyoqIEBkZXByZWNhdGVkIHVzZSAganNvbnJwY1Jlc2VydmVkRXJyb3JSYW5nZVN0YXJ0ICovXG4gICAgRXJyb3JDb2Rlcy5zZXJ2ZXJFcnJvclN0YXJ0ID0gLTMyMDk5O1xuICAgIC8qKlxuICAgICAqIEFuIGVycm9yIG9jY3VycmVkIHdoZW4gd3JpdGUgYSBtZXNzYWdlIHRvIHRoZSB0cmFuc3BvcnQgbGF5ZXIuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5NZXNzYWdlV3JpdGVFcnJvciA9IC0zMjA5OTtcbiAgICAvKipcbiAgICAgKiBBbiBlcnJvciBvY2N1cnJlZCB3aGVuIHJlYWRpbmcgYSBtZXNzYWdlIGZyb20gdGhlIHRyYW5zcG9ydCBsYXllci5cbiAgICAgKi9cbiAgICBFcnJvckNvZGVzLk1lc3NhZ2VSZWFkRXJyb3IgPSAtMzIwOTg7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbm5lY3Rpb24gZ290IGRpc3Bvc2VkIG9yIGxvc3QgYW5kIGFsbCBwZW5kaW5nIHJlc3BvbnNlcyBnb3RcbiAgICAgKiByZWplY3RlZC5cbiAgICAgKi9cbiAgICBFcnJvckNvZGVzLlBlbmRpbmdSZXNwb25zZVJlamVjdGVkID0gLTMyMDk3O1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25uZWN0aW9uIGlzIGluYWN0aXZlIGFuZCBhIHVzZSBvZiBpdCBmYWlsZWQuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5Db25uZWN0aW9uSW5hY3RpdmUgPSAtMzIwOTY7XG4gICAgLyoqXG4gICAgICogRXJyb3IgY29kZSBpbmRpY2F0aW5nIHRoYXQgYSBzZXJ2ZXIgcmVjZWl2ZWQgYSBub3RpZmljYXRpb24gb3JcbiAgICAgKiByZXF1ZXN0IGJlZm9yZSB0aGUgc2VydmVyIGhhcyByZWNlaXZlZCB0aGUgYGluaXRpYWxpemVgIHJlcXVlc3QuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5TZXJ2ZXJOb3RJbml0aWFsaXplZCA9IC0zMjAwMjtcbiAgICBFcnJvckNvZGVzLlVua25vd25FcnJvckNvZGUgPSAtMzIwMDE7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZW5kIHJhbmdlIG9mIEpTT04gUlBDIHJlc2VydmVkIGVycm9yIGNvZGVzLlxuICAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLlxuICAgICAqXG4gICAgICogQHNpbmNlIDMuMTYuMFxuICAgICovXG4gICAgRXJyb3JDb2Rlcy5qc29ucnBjUmVzZXJ2ZWRFcnJvclJhbmdlRW5kID0gLTMyMDAwO1xuICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgIGpzb25ycGNSZXNlcnZlZEVycm9yUmFuZ2VFbmQgKi9cbiAgICBFcnJvckNvZGVzLnNlcnZlckVycm9yRW5kID0gLTMyMDAwO1xufSkoRXJyb3JDb2RlcyB8fCAoZXhwb3J0cy5FcnJvckNvZGVzID0gRXJyb3JDb2RlcyA9IHt9KSk7XG4vKipcbiAqIEFuIGVycm9yIG9iamVjdCByZXR1cm4gaW4gYSByZXNwb25zZSBpbiBjYXNlIGEgcmVxdWVzdFxuICogaGFzIGZhaWxlZC5cbiAqL1xuY2xhc3MgUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBtZXNzYWdlLCBkYXRhKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSBpcy5udW1iZXIoY29kZSkgPyBjb2RlIDogRXJyb3JDb2Rlcy5Vbmtub3duRXJyb3JDb2RlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgUmVzcG9uc2VFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbiAgICB0b0pzb24oKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5SZXNwb25zZUVycm9yID0gUmVzcG9uc2VFcnJvcjtcbmNsYXNzIFBhcmFtZXRlclN0cnVjdHVyZXMge1xuICAgIGNvbnN0cnVjdG9yKGtpbmQpIHtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICB9XG4gICAgc3RhdGljIGlzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvIHx8IHZhbHVlID09PSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSB8fCB2YWx1ZSA9PT0gUGFyYW1ldGVyU3RydWN0dXJlcy5ieVBvc2l0aW9uO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2luZDtcbiAgICB9XG59XG5leHBvcnRzLlBhcmFtZXRlclN0cnVjdHVyZXMgPSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuLyoqXG4gKiBUaGUgcGFyYW1ldGVyIHN0cnVjdHVyZSBpcyBhdXRvbWF0aWNhbGx5IGluZmVycmVkIG9uIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuICogYW5kIHRoZSBwYXJhbWV0ZXIgdHlwZSBpbiBjYXNlIG9mIGEgc2luZ2xlIHBhcmFtLlxuICovXG5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG8gPSBuZXcgUGFyYW1ldGVyU3RydWN0dXJlcygnYXV0bycpO1xuLyoqXG4gKiBGb3JjZXMgYGJ5UG9zaXRpb25gIHBhcmFtZXRlciBzdHJ1Y3R1cmUuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSBoYXZlIGEgc2luZ2xlXG4gKiBwYXJhbWV0ZXIgd2hpY2ggaGFzIGEgbGl0ZXJhbCB0eXBlLlxuICovXG5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5UG9zaXRpb24gPSBuZXcgUGFyYW1ldGVyU3RydWN0dXJlcygnYnlQb3NpdGlvbicpO1xuLyoqXG4gKiBGb3JjZXMgYGJ5TmFtZWAgcGFyYW1ldGVyIHN0cnVjdHVyZS4gVGhpcyBpcyBvbmx5IHVzZWZ1bCB3aGVuIGhhdmluZyBhIHNpbmdsZVxuICogcGFyYW1ldGVyLiBUaGUgbGlicmFyeSB3aWxsIHJlcG9ydCBlcnJvcnMgaWYgdXNlZCB3aXRoIGEgZGlmZmVyZW50IG51bWJlciBvZlxuICogcGFyYW1ldGVycy5cbiAqL1xuUGFyYW1ldGVyU3RydWN0dXJlcy5ieU5hbWUgPSBuZXcgUGFyYW1ldGVyU3RydWN0dXJlcygnYnlOYW1lJyk7XG4vKipcbiAqIEFuIGFic3RyYWN0IGltcGxlbWVudGF0aW9uIG9mIGEgTWVzc2FnZVR5cGUuXG4gKi9cbmNsYXNzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBudW1iZXJPZlBhcmFtcykge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5udW1iZXJPZlBhcmFtcyA9IG51bWJlck9mUGFyYW1zO1xuICAgIH1cbiAgICBnZXQgcGFyYW1ldGVyU3RydWN0dXJlcygpIHtcbiAgICAgICAgcmV0dXJuIFBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bztcbiAgICB9XG59XG5leHBvcnRzLkFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSA9IEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZTtcbi8qKlxuICogQ2xhc3NlcyB0byB0eXBlIHJlcXVlc3QgcmVzcG9uc2UgcGFpcnNcbiAqL1xuY2xhc3MgUmVxdWVzdFR5cGUwIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAwKTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlMCA9IFJlcXVlc3RUeXBlMDtcbmNsYXNzIFJlcXVlc3RUeXBlIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMSk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBfcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBhcmFtZXRlclN0cnVjdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGUgPSBSZXF1ZXN0VHlwZTtcbmNsYXNzIFJlcXVlc3RUeXBlMSBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBfcGFyYW1ldGVyU3RydWN0dXJlcyA9IFBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bykge1xuICAgICAgICBzdXBlcihtZXRob2QsIDEpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gX3BhcmFtZXRlclN0cnVjdHVyZXM7XG4gICAgfVxuICAgIGdldCBwYXJhbWV0ZXJTdHJ1Y3R1cmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlMSA9IFJlcXVlc3RUeXBlMTtcbmNsYXNzIFJlcXVlc3RUeXBlMiBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMik7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTIgPSBSZXF1ZXN0VHlwZTI7XG5jbGFzcyBSZXF1ZXN0VHlwZTMgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDMpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGUzID0gUmVxdWVzdFR5cGUzO1xuY2xhc3MgUmVxdWVzdFR5cGU0IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA0KTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlNCA9IFJlcXVlc3RUeXBlNDtcbmNsYXNzIFJlcXVlc3RUeXBlNSBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgNSk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTUgPSBSZXF1ZXN0VHlwZTU7XG5jbGFzcyBSZXF1ZXN0VHlwZTYgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDYpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGU2ID0gUmVxdWVzdFR5cGU2O1xuY2xhc3MgUmVxdWVzdFR5cGU3IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA3KTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlNyA9IFJlcXVlc3RUeXBlNztcbmNsYXNzIFJlcXVlc3RUeXBlOCBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgOCk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTggPSBSZXF1ZXN0VHlwZTg7XG5jbGFzcyBSZXF1ZXN0VHlwZTkgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDkpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGU5ID0gUmVxdWVzdFR5cGU5O1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZSBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBfcGFyYW1ldGVyU3RydWN0dXJlcyA9IFBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bykge1xuICAgICAgICBzdXBlcihtZXRob2QsIDEpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gX3BhcmFtZXRlclN0cnVjdHVyZXM7XG4gICAgfVxuICAgIGdldCBwYXJhbWV0ZXJTdHJ1Y3R1cmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGUgPSBOb3RpZmljYXRpb25UeXBlO1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTAgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDApO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTAgPSBOb3RpZmljYXRpb25UeXBlMDtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGUxIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMSk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBfcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBhcmFtZXRlclN0cnVjdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTEgPSBOb3RpZmljYXRpb25UeXBlMTtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGUyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAyKTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGUyID0gTm90aWZpY2F0aW9uVHlwZTI7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlMyBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMyk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMyA9IE5vdGlmaWNhdGlvblR5cGUzO1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTQgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDQpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTQgPSBOb3RpZmljYXRpb25UeXBlNDtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGU1IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA1KTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGU1ID0gTm90aWZpY2F0aW9uVHlwZTU7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlNiBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgNik7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNiA9IE5vdGlmaWNhdGlvblR5cGU2O1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTcgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDcpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTcgPSBOb3RpZmljYXRpb25UeXBlNztcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGU4IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA4KTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGU4ID0gTm90aWZpY2F0aW9uVHlwZTg7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlOSBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgOSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlOSA9IE5vdGlmaWNhdGlvblR5cGU5O1xudmFyIE1lc3NhZ2U7XG4oZnVuY3Rpb24gKE1lc3NhZ2UpIHtcbiAgICAvKipcbiAgICAgKiBUZXN0cyBpZiB0aGUgZ2l2ZW4gbWVzc2FnZSBpcyBhIHJlcXVlc3QgbWVzc2FnZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUmVxdWVzdChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgaXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXRob2QpICYmIChpcy5zdHJpbmcoY2FuZGlkYXRlLmlkKSB8fCBpcy5udW1iZXIoY2FuZGlkYXRlLmlkKSk7XG4gICAgfVxuICAgIE1lc3NhZ2UuaXNSZXF1ZXN0ID0gaXNSZXF1ZXN0O1xuICAgIC8qKlxuICAgICAqIFRlc3RzIGlmIHRoZSBnaXZlbiBtZXNzYWdlIGlzIGEgbm90aWZpY2F0aW9uIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc05vdGlmaWNhdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgaXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXRob2QpICYmIG1lc3NhZ2UuaWQgPT09IHZvaWQgMDtcbiAgICB9XG4gICAgTWVzc2FnZS5pc05vdGlmaWNhdGlvbiA9IGlzTm90aWZpY2F0aW9uO1xuICAgIC8qKlxuICAgICAqIFRlc3RzIGlmIHRoZSBnaXZlbiBtZXNzYWdlIGlzIGEgcmVzcG9uc2UgbWVzc2FnZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUmVzcG9uc2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIChjYW5kaWRhdGUucmVzdWx0ICE9PSB2b2lkIDAgfHwgISFjYW5kaWRhdGUuZXJyb3IpICYmIChpcy5zdHJpbmcoY2FuZGlkYXRlLmlkKSB8fCBpcy5udW1iZXIoY2FuZGlkYXRlLmlkKSB8fCBjYW5kaWRhdGUuaWQgPT09IG51bGwpO1xuICAgIH1cbiAgICBNZXNzYWdlLmlzUmVzcG9uc2UgPSBpc1Jlc3BvbnNlO1xufSkoTWVzc2FnZSB8fCAoZXhwb3J0cy5NZXNzYWdlID0gTWVzc2FnZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBfcmFsO1xuZnVuY3Rpb24gUkFMKCkge1xuICAgIGlmIChfcmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBydW50aW1lIGFic3RyYWN0aW9uIGxheWVyIGluc3RhbGxlZGApO1xuICAgIH1cbiAgICByZXR1cm4gX3JhbDtcbn1cbihmdW5jdGlvbiAoUkFMKSB7XG4gICAgZnVuY3Rpb24gaW5zdGFsbChyYWwpIHtcbiAgICAgICAgaWYgKHJhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHJ1bnRpbWUgYWJzdHJhY3Rpb24gbGF5ZXIgcHJvdmlkZWRgKTtcbiAgICAgICAgfVxuICAgICAgICBfcmFsID0gcmFsO1xuICAgIH1cbiAgICBSQUwuaW5zdGFsbCA9IGluc3RhbGw7XG59KShSQUwgfHwgKFJBTCA9IHt9KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSQUw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VtYXBob3JlID0gdm9pZCAwO1xuY29uc3QgcmFsXzEgPSByZXF1aXJlKFwiLi9yYWxcIik7XG5jbGFzcyBTZW1hcGhvcmUge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMSkge1xuICAgICAgICBpZiAoY2FwYWNpdHkgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYXBhY2l0eSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gMDtcbiAgICAgICAgdGhpcy5fd2FpdGluZyA9IFtdO1xuICAgIH1cbiAgICBsb2NrKHRodW5rKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl93YWl0aW5nLnB1c2goeyB0aHVuaywgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5ydW5OZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgYWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICAgIH1cbiAgICBydW5OZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fd2FpdGluZy5sZW5ndGggPT09IDAgfHwgdGhpcy5fYWN0aXZlID09PSB0aGlzLl9jYXBhY2l0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICgwLCByYWxfMS5kZWZhdWx0KSgpLnRpbWVyLnNldEltbWVkaWF0ZSgoKSA9PiB0aGlzLmRvUnVuTmV4dCgpKTtcbiAgICB9XG4gICAgZG9SdW5OZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fd2FpdGluZy5sZW5ndGggPT09IDAgfHwgdGhpcy5fYWN0aXZlID09PSB0aGlzLl9jYXBhY2l0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHQgPSB0aGlzLl93YWl0aW5nLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSsrO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlID4gdGhpcy5fY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVG8gbWFueSB0aHVua3MgYWN0aXZlYCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5leHQudGh1bmsoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZS0tO1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bk5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZS0tO1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bk5leHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZS0tO1xuICAgICAgICAgICAgICAgIG5leHQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMucnVuTmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZS0tO1xuICAgICAgICAgICAgbmV4dC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHRoaXMucnVuTmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TZW1hcGhvcmUgPSBTZW1hcGhvcmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2hhcmVkQXJyYXlSZWNlaXZlclN0cmF0ZWd5ID0gZXhwb3J0cy5TaGFyZWRBcnJheVNlbmRlclN0cmF0ZWd5ID0gdm9pZCAwO1xuY29uc3QgY2FuY2VsbGF0aW9uXzEgPSByZXF1aXJlKFwiLi9jYW5jZWxsYXRpb25cIik7XG52YXIgQ2FuY2VsbGF0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKENhbmNlbGxhdGlvblN0YXRlKSB7XG4gICAgQ2FuY2VsbGF0aW9uU3RhdGUuQ29udGludWUgPSAwO1xuICAgIENhbmNlbGxhdGlvblN0YXRlLkNhbmNlbGxlZCA9IDE7XG59KShDYW5jZWxsYXRpb25TdGF0ZSB8fCAoQ2FuY2VsbGF0aW9uU3RhdGUgPSB7fSkpO1xuY2xhc3MgU2hhcmVkQXJyYXlTZW5kZXJTdHJhdGVneSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZW5hYmxlQ2FuY2VsbGF0aW9uKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBidWZmZXIgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoNCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgSW50MzJBcnJheShidWZmZXIsIDAsIDEpO1xuICAgICAgICBkYXRhWzBdID0gQ2FuY2VsbGF0aW9uU3RhdGUuQ29udGludWU7XG4gICAgICAgIHRoaXMuYnVmZmVycy5zZXQocmVxdWVzdC5pZCwgYnVmZmVyKTtcbiAgICAgICAgcmVxdWVzdC4kY2FuY2VsbGF0aW9uRGF0YSA9IGJ1ZmZlcjtcbiAgICB9XG4gICAgYXN5bmMgc2VuZENhbmNlbGxhdGlvbihfY29ubiwgaWQpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXJzLmdldChpZCk7XG4gICAgICAgIGlmIChidWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgSW50MzJBcnJheShidWZmZXIsIDAsIDEpO1xuICAgICAgICBBdG9taWNzLnN0b3JlKGRhdGEsIDAsIENhbmNlbGxhdGlvblN0YXRlLkNhbmNlbGxlZCk7XG4gICAgfVxuICAgIGNsZWFudXAoaWQpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzLmRlbGV0ZShpZCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5jbGVhcigpO1xuICAgIH1cbn1cbmV4cG9ydHMuU2hhcmVkQXJyYXlTZW5kZXJTdHJhdGVneSA9IFNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3k7XG5jbGFzcyBTaGFyZWRBcnJheUJ1ZmZlckNhbmNlbGxhdGlvblRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihidWZmZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCAwLCAxKTtcbiAgICB9XG4gICAgZ2V0IGlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKCkge1xuICAgICAgICByZXR1cm4gQXRvbWljcy5sb2FkKHRoaXMuZGF0YSwgMCkgPT09IENhbmNlbGxhdGlvblN0YXRlLkNhbmNlbGxlZDtcbiAgICB9XG4gICAgZ2V0IG9uQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbmNlbGxhdGlvbiBvdmVyIFNoYXJlZEFycmF5QnVmZmVyIGRvZXNuJ3Qgc3VwcG9ydCBjYW5jZWxsYXRpb24gZXZlbnRzYCk7XG4gICAgfVxufVxuY2xhc3MgU2hhcmVkQXJyYXlCdWZmZXJDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoYnVmZmVyKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXJDYW5jZWxsYXRpb25Ub2tlbihidWZmZXIpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgfVxufVxuY2xhc3MgU2hhcmVkQXJyYXlSZWNlaXZlclN0cmF0ZWd5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5raW5kID0gJ3JlcXVlc3QnO1xuICAgIH1cbiAgICBjcmVhdGVDYW5jZWxsYXRpb25Ub2tlblNvdXJjZShyZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHJlcXVlc3QuJGNhbmNlbGxhdGlvbkRhdGE7XG4gICAgICAgIGlmIChidWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2hhcmVkQXJyYXlCdWZmZXJDYW5jZWxsYXRpb25Ub2tlblNvdXJjZShidWZmZXIpO1xuICAgIH1cbn1cbmV4cG9ydHMuU2hhcmVkQXJyYXlSZWNlaXZlclN0cmF0ZWd5ID0gU2hhcmVkQXJyYXlSZWNlaXZlclN0cmF0ZWd5O1xuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYnJvd3Nlci9tYWluJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gdm9pZCAwO1xuY29uc3QgYnJvd3Nlcl8xID0gcmVxdWlyZShcInZzY29kZS1qc29ucnBjL2Jyb3dzZXJcIik7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcInZzY29kZS1qc29ucnBjL2Jyb3dzZXJcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpLCBleHBvcnRzKTtcbmZ1bmN0aW9uIGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbihyZWFkZXIsIHdyaXRlciwgbG9nZ2VyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuICgwLCBicm93c2VyXzEuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24pKHJlYWRlciwgd3JpdGVyLCBsb2dnZXIsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5jcmVhdGVQcm90b2NvbENvbm5lY3Rpb24gPSBjcmVhdGVQcm90b2NvbENvbm5lY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5MU1BFcnJvckNvZGVzID0gZXhwb3J0cy5jcmVhdGVQcm90b2NvbENvbm5lY3Rpb24gPSB2b2lkIDA7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcInZzY29kZS1qc29ucnBjXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwidnNjb2RlLWxhbmd1YWdlc2VydmVyLXR5cGVzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tZXNzYWdlc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcHJvdG9jb2xcIiksIGV4cG9ydHMpO1xudmFyIGNvbm5lY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2Nvbm5lY3Rpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVQcm90b2NvbENvbm5lY3Rpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5jcmVhdGVQcm90b2NvbENvbm5lY3Rpb247IH0gfSk7XG52YXIgTFNQRXJyb3JDb2RlcztcbihmdW5jdGlvbiAoTFNQRXJyb3JDb2Rlcykge1xuICAgIC8qKlxuICAgICogVGhpcyBpcyB0aGUgc3RhcnQgcmFuZ2Ugb2YgTFNQIHJlc2VydmVkIGVycm9yIGNvZGVzLlxuICAgICogSXQgZG9lc24ndCBkZW5vdGUgYSByZWFsIGVycm9yIGNvZGUuXG4gICAgKlxuICAgICogQHNpbmNlIDMuMTYuMFxuICAgICovXG4gICAgTFNQRXJyb3JDb2Rlcy5sc3BSZXNlcnZlZEVycm9yUmFuZ2VTdGFydCA9IC0zMjg5OTtcbiAgICAvKipcbiAgICAgKiBBIHJlcXVlc3QgZmFpbGVkIGJ1dCBpdCB3YXMgc3ludGFjdGljYWxseSBjb3JyZWN0LCBlLmcgdGhlXG4gICAgICogbWV0aG9kIG5hbWUgd2FzIGtub3duIGFuZCB0aGUgcGFyYW1ldGVycyB3ZXJlIHZhbGlkLiBUaGUgZXJyb3JcbiAgICAgKiBtZXNzYWdlIHNob3VsZCBjb250YWluIGh1bWFuIHJlYWRhYmxlIGluZm9ybWF0aW9uIGFib3V0IHdoeVxuICAgICAqIHRoZSByZXF1ZXN0IGZhaWxlZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAzLjE3LjBcbiAgICAgKi9cbiAgICBMU1BFcnJvckNvZGVzLlJlcXVlc3RGYWlsZWQgPSAtMzI4MDM7XG4gICAgLyoqXG4gICAgICogVGhlIHNlcnZlciBjYW5jZWxsZWQgdGhlIHJlcXVlc3QuIFRoaXMgZXJyb3IgY29kZSBzaG91bGRcbiAgICAgKiBvbmx5IGJlIHVzZWQgZm9yIHJlcXVlc3RzIHRoYXQgZXhwbGljaXRseSBzdXBwb3J0IGJlaW5nXG4gICAgICogc2VydmVyIGNhbmNlbGxhYmxlLlxuICAgICAqXG4gICAgICogQHNpbmNlIDMuMTcuMFxuICAgICAqL1xuICAgIExTUEVycm9yQ29kZXMuU2VydmVyQ2FuY2VsbGVkID0gLTMyODAyO1xuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2ZXIgZGV0ZWN0ZWQgdGhhdCB0aGUgY29udGVudCBvZiBhIGRvY3VtZW50IGdvdFxuICAgICAqIG1vZGlmaWVkIG91dHNpZGUgbm9ybWFsIGNvbmRpdGlvbnMuIEEgc2VydmVyIHNob3VsZFxuICAgICAqIE5PVCBzZW5kIHRoaXMgZXJyb3IgY29kZSBpZiBpdCBkZXRlY3RzIGEgY29udGVudCBjaGFuZ2VcbiAgICAgKiBpbiBpdCB1bnByb2Nlc3NlZCBtZXNzYWdlcy4gVGhlIHJlc3VsdCBldmVuIGNvbXB1dGVkXG4gICAgICogb24gYW4gb2xkZXIgc3RhdGUgbWlnaHQgc3RpbGwgYmUgdXNlZnVsIGZvciB0aGUgY2xpZW50LlxuICAgICAqXG4gICAgICogSWYgYSBjbGllbnQgZGVjaWRlcyB0aGF0IGEgcmVzdWx0IGlzIG5vdCBvZiBhbnkgdXNlIGFueW1vcmVcbiAgICAgKiB0aGUgY2xpZW50IHNob3VsZCBjYW5jZWwgdGhlIHJlcXVlc3QuXG4gICAgICovXG4gICAgTFNQRXJyb3JDb2Rlcy5Db250ZW50TW9kaWZpZWQgPSAtMzI4MDE7XG4gICAgLyoqXG4gICAgICogVGhlIGNsaWVudCBoYXMgY2FuY2VsZWQgYSByZXF1ZXN0IGFuZCBhIHNlcnZlciBhcyBkZXRlY3RlZFxuICAgICAqIHRoZSBjYW5jZWwuXG4gICAgICovXG4gICAgTFNQRXJyb3JDb2Rlcy5SZXF1ZXN0Q2FuY2VsbGVkID0gLTMyODAwO1xuICAgIC8qKlxuICAgICogVGhpcyBpcyB0aGUgZW5kIHJhbmdlIG9mIExTUCByZXNlcnZlZCBlcnJvciBjb2Rlcy5cbiAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLlxuICAgICpcbiAgICAqIEBzaW5jZSAzLjE2LjBcbiAgICAqL1xuICAgIExTUEVycm9yQ29kZXMubHNwUmVzZXJ2ZWRFcnJvclJhbmdlRW5kID0gLTMyODAwO1xufSkoTFNQRXJyb3JDb2RlcyB8fCAoZXhwb3J0cy5MU1BFcnJvckNvZGVzID0gTFNQRXJyb3JDb2RlcyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gdm9pZCAwO1xuY29uc3QgdnNjb2RlX2pzb25ycGNfMSA9IHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwY1wiKTtcbmZ1bmN0aW9uIGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbihpbnB1dCwgb3V0cHV0LCBsb2dnZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodnNjb2RlX2pzb25ycGNfMS5Db25uZWN0aW9uU3RyYXRlZ3kuaXMob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgY29ubmVjdGlvblN0cmF0ZWd5OiBvcHRpb25zIH07XG4gICAgfVxuICAgIHJldHVybiAoMCwgdnNjb2RlX2pzb25ycGNfMS5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbikoaW5wdXQsIG91dHB1dCwgbG9nZ2VyLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuUHJvdG9jb2xSZXF1ZXN0VHlwZSA9IGV4cG9ydHMuUHJvdG9jb2xSZXF1ZXN0VHlwZTAgPSBleHBvcnRzLlJlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLk1lc3NhZ2VEaXJlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB2c2NvZGVfanNvbnJwY18xID0gcmVxdWlyZShcInZzY29kZS1qc29ucnBjXCIpO1xudmFyIE1lc3NhZ2VEaXJlY3Rpb247XG4oZnVuY3Rpb24gKE1lc3NhZ2VEaXJlY3Rpb24pIHtcbiAgICBNZXNzYWdlRGlyZWN0aW9uW1wiY2xpZW50VG9TZXJ2ZXJcIl0gPSBcImNsaWVudFRvU2VydmVyXCI7XG4gICAgTWVzc2FnZURpcmVjdGlvbltcInNlcnZlclRvQ2xpZW50XCJdID0gXCJzZXJ2ZXJUb0NsaWVudFwiO1xuICAgIE1lc3NhZ2VEaXJlY3Rpb25bXCJib3RoXCJdID0gXCJib3RoXCI7XG59KShNZXNzYWdlRGlyZWN0aW9uIHx8IChleHBvcnRzLk1lc3NhZ2VEaXJlY3Rpb24gPSBNZXNzYWdlRGlyZWN0aW9uID0ge30pKTtcbmNsYXNzIFJlZ2lzdHJhdGlvblR5cGUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG59XG5leHBvcnRzLlJlZ2lzdHJhdGlvblR5cGUgPSBSZWdpc3RyYXRpb25UeXBlO1xuY2xhc3MgUHJvdG9jb2xSZXF1ZXN0VHlwZTAgZXh0ZW5kcyB2c2NvZGVfanNvbnJwY18xLlJlcXVlc3RUeXBlMCB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm90b2NvbFJlcXVlc3RUeXBlMCA9IFByb3RvY29sUmVxdWVzdFR5cGUwO1xuY2xhc3MgUHJvdG9jb2xSZXF1ZXN0VHlwZSBleHRlbmRzIHZzY29kZV9qc29ucnBjXzEuUmVxdWVzdFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIHZzY29kZV9qc29ucnBjXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5ieU5hbWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvdG9jb2xSZXF1ZXN0VHlwZSA9IFByb3RvY29sUmVxdWVzdFR5cGU7XG5jbGFzcyBQcm90b2NvbE5vdGlmaWNhdGlvblR5cGUwIGV4dGVuZHMgdnNjb2RlX2pzb25ycGNfMS5Ob3RpZmljYXRpb25UeXBlMCB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUwID0gUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlMDtcbmNsYXNzIFByb3RvY29sTm90aWZpY2F0aW9uVHlwZSBleHRlbmRzIHZzY29kZV9qc29ucnBjXzEuTm90aWZpY2F0aW9uVHlwZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgdnNjb2RlX2pzb25ycGNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUgPSBQcm90b2NvbE5vdGlmaWNhdGlvblR5cGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIFR5cGVGb3gsIE1pY3Jvc29mdCBhbmQgb3RoZXJzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QgPSBleHBvcnRzLkNhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzdWx0IGEgYENhbGxIaWVyYXJjaHlJdGVtYCBpbiBhIGRvY3VtZW50IGF0IGEgZ2l2ZW4gcG9zaXRpb24uXG4gKiBDYW4gYmUgdXNlZCBhcyBhbiBpbnB1dCB0byBhbiBpbmNvbWluZyBvciBvdXRnb2luZyBjYWxsIGhpZXJhcmNoeS5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBDYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCkge1xuICAgIENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3ByZXBhcmVDYWxsSGllcmFyY2h5JztcbiAgICBDYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBDYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0Lm1ldGhvZCk7XG59KShDYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QgfHwgKGV4cG9ydHMuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0ID0gQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgdGhlIGluY29taW5nIGNhbGxzIGZvciBhIGdpdmVuIGBDYWxsSGllcmFyY2h5SXRlbWAuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChDYWxsSGllcmFyY2h5SW5jb21pbmdDYWxsc1JlcXVlc3QpIHtcbiAgICBDYWxsSGllcmFyY2h5SW5jb21pbmdDYWxsc1JlcXVlc3QubWV0aG9kID0gJ2NhbGxIaWVyYXJjaHkvaW5jb21pbmdDYWxscyc7XG4gICAgQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdC5tZXRob2QpO1xufSkoQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0IHx8IChleHBvcnRzLkNhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBvdXRnb2luZyBjYWxscyBmb3IgYSBnaXZlbiBgQ2FsbEhpZXJhcmNoeUl0ZW1gLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdDtcbihmdW5jdGlvbiAoQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0KSB7XG4gICAgQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0Lm1ldGhvZCA9ICdjYWxsSGllcmFyY2h5L291dGdvaW5nQ2FsbHMnO1xuICAgIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QubWV0aG9kKTtcbn0pKENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdCB8fCAoZXhwb3J0cy5DYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QgPSBDYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRDb2xvclJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBsaXN0IGFsbCBjb2xvciBzeW1ib2xzIGZvdW5kIGluIGEgZ2l2ZW4gdGV4dCBkb2N1bWVudC4gVGhlIHJlcXVlc3Qnc1xuICogcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIERvY3VtZW50Q29sb3JQYXJhbXN9IHRoZVxuICogcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbiBDb2xvckluZm9ybWF0aW9uW119IG9yIGEgVGhlbmFibGVcbiAqIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIERvY3VtZW50Q29sb3JSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudENvbG9yUmVxdWVzdCkge1xuICAgIERvY3VtZW50Q29sb3JSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvZG9jdW1lbnRDb2xvcic7XG4gICAgRG9jdW1lbnRDb2xvclJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudENvbG9yUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEb2N1bWVudENvbG9yUmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRDb2xvclJlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRDb2xvclJlcXVlc3QgPSBEb2N1bWVudENvbG9yUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBsaXN0IGFsbCBwcmVzZW50YXRpb24gZm9yIGEgY29sb3IuIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBDb2xvclByZXNlbnRhdGlvblBhcmFtc30gdGhlXG4gKiByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBDb2xvckluZm9ybWF0aW9uIENvbG9ySW5mb3JtYXRpb25bXX0gb3IgYSBUaGVuYWJsZVxuICogdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChDb2xvclByZXNlbnRhdGlvblJlcXVlc3QpIHtcbiAgICBDb2xvclByZXNlbnRhdGlvblJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9jb2xvclByZXNlbnRhdGlvbic7XG4gICAgQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdCA9IENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29uZmlndXJhdGlvblJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vLy0tLS0gR2V0IENvbmZpZ3VyYXRpb24gcmVxdWVzdCAtLS0tXG4vKipcbiAqIFRoZSAnd29ya3NwYWNlL2NvbmZpZ3VyYXRpb24nIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byBmZXRjaCBhIGNlcnRhaW5cbiAqIGNvbmZpZ3VyYXRpb24gc2V0dGluZy5cbiAqXG4gKiBUaGlzIHB1bGwgbW9kZWwgcmVwbGFjZXMgdGhlIG9sZCBwdXNoIG1vZGVsIHdlcmUgdGhlIGNsaWVudCBzaWduYWxlZCBjb25maWd1cmF0aW9uIGNoYW5nZSB2aWEgYW5cbiAqIGV2ZW50LiBJZiB0aGUgc2VydmVyIHN0aWxsIG5lZWRzIHRvIHJlYWN0IHRvIGNvbmZpZ3VyYXRpb24gY2hhbmdlcyAoc2luY2UgdGhlIHNlcnZlciBjYWNoZXMgdGhlXG4gKiByZXN1bHQgb2YgYHdvcmtzcGFjZS9jb25maWd1cmF0aW9uYCByZXF1ZXN0cykgdGhlIHNlcnZlciBzaG91bGQgcmVnaXN0ZXIgZm9yIGFuIGVtcHR5IGNvbmZpZ3VyYXRpb25cbiAqIGNoYW5nZSBldmVudCBhbmQgZW1wdHkgdGhlIGNhY2hlIGlmIHN1Y2ggYW4gZXZlbnQgaXMgcmVjZWl2ZWQuXG4gKi9cbnZhciBDb25maWd1cmF0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29uZmlndXJhdGlvblJlcXVlc3QpIHtcbiAgICBDb25maWd1cmF0aW9uUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL2NvbmZpZ3VyYXRpb24nO1xuICAgIENvbmZpZ3VyYXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgQ29uZmlndXJhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29uZmlndXJhdGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKENvbmZpZ3VyYXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLkNvbmZpZ3VyYXRpb25SZXF1ZXN0ID0gQ29uZmlndXJhdGlvblJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRlY2xhcmF0aW9uUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8vIEB0cy1pZ25vcmU6IHRvIGF2b2lkIGlubGluaW5nIExvY2F0aW9uTGluayBhcyBkeW5hbWljIGltcG9ydFxubGV0IF9fbm9EeW5hbWljSW1wb3J0O1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSB0aGUgdHlwZSBkZWZpbml0aW9uIGxvY2F0aW9ucyBvZiBhIHN5bWJvbCBhdCBhIGdpdmVuIHRleHRcbiAqIGRvY3VtZW50IHBvc2l0aW9uLiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBUZXh0RG9jdW1lbnRQb3NpdGlvblBhcmFtc31cbiAqIHRoZSByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBEZWNsYXJhdGlvbn0gb3IgYSB0eXBlZCBhcnJheSBvZiB7QGxpbmsgRGVjbGFyYXRpb25MaW5rfVxuICogb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBEZWNsYXJhdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKERlY2xhcmF0aW9uUmVxdWVzdCkge1xuICAgIERlY2xhcmF0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2RlY2xhcmF0aW9uJztcbiAgICBEZWNsYXJhdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEZWNsYXJhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRGVjbGFyYXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShEZWNsYXJhdGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuRGVjbGFyYXRpb25SZXF1ZXN0ID0gRGVjbGFyYXRpb25SZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudERpYWdub3N0aWNSZXBvcnRLaW5kID0gZXhwb3J0cy5EaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YSA9IHZvaWQgMDtcbmNvbnN0IHZzY29kZV9qc29ucnBjXzEgPSByZXF1aXJlKFwidnNjb2RlLWpzb25ycGNcIik7XG5jb25zdCBJcyA9IHJlcXVpcmUoXCIuL3V0aWxzL2lzXCIpO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YTtcbihmdW5jdGlvbiAoRGlhZ25vc3RpY1NlcnZlckNhbmNlbGxhdGlvbkRhdGEpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5ib29sZWFuKGNhbmRpZGF0ZS5yZXRyaWdnZXJSZXF1ZXN0KTtcbiAgICB9XG4gICAgRGlhZ25vc3RpY1NlcnZlckNhbmNlbGxhdGlvbkRhdGEuaXMgPSBpcztcbn0pKERpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhIHx8IChleHBvcnRzLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhID0gRGlhZ25vc3RpY1NlcnZlckNhbmNlbGxhdGlvbkRhdGEgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZG9jdW1lbnQgZGlhZ25vc3RpYyByZXBvcnQga2luZHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZDtcbihmdW5jdGlvbiAoRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZCkge1xuICAgIC8qKlxuICAgICAqIEEgZGlhZ25vc3RpYyByZXBvcnQgd2l0aCBhIGZ1bGxcbiAgICAgKiBzZXQgb2YgcHJvYmxlbXMuXG4gICAgICovXG4gICAgRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZC5GdWxsID0gJ2Z1bGwnO1xuICAgIC8qKlxuICAgICAqIEEgcmVwb3J0IGluZGljYXRpbmcgdGhhdCB0aGUgbGFzdFxuICAgICAqIHJldHVybmVkIHJlcG9ydCBpcyBzdGlsbCBhY2N1cmF0ZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudERpYWdub3N0aWNSZXBvcnRLaW5kLlVuY2hhbmdlZCA9ICd1bmNoYW5nZWQnO1xufSkoRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZCB8fCAoZXhwb3J0cy5Eb2N1bWVudERpYWdub3N0aWNSZXBvcnRLaW5kID0gRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBkb2N1bWVudCBkaWFnbm9zdGljIHJlcXVlc3QgZGVmaW5pdGlvbi5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2RpYWdub3N0aWMnO1xuICAgIERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QubWV0aG9kKTtcbiAgICBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0LnBhcnRpYWxSZXN1bHQgPSBuZXcgdnNjb2RlX2pzb25ycGNfMS5Qcm9ncmVzc1R5cGUoKTtcbn0pKERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdCA9IERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBUaGUgd29ya3NwYWNlIGRpYWdub3N0aWMgcmVxdWVzdCBkZWZpbml0aW9uLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChXb3Jrc3BhY2VEaWFnbm9zdGljUmVxdWVzdCkge1xuICAgIFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0Lm1ldGhvZCA9ICd3b3Jrc3BhY2UvZGlhZ25vc3RpYyc7XG4gICAgV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXb3Jrc3BhY2VEaWFnbm9zdGljUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShXb3Jrc3BhY2VEaWFnbm9zdGljUmVxdWVzdC5tZXRob2QpO1xuICAgIFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0LnBhcnRpYWxSZXN1bHQgPSBuZXcgdnNjb2RlX2pzb25ycGNfMS5Qcm9ncmVzc1R5cGUoKTtcbn0pKFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0IHx8IChleHBvcnRzLldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0ID0gV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlhZ25vc3RpYyByZWZyZXNoIHJlcXVlc3QgZGVmaW5pdGlvbi5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3Q7XG4oZnVuY3Rpb24gKERpYWdub3N0aWNSZWZyZXNoUmVxdWVzdCkge1xuICAgIERpYWdub3N0aWNSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL2RpYWdub3N0aWMvcmVmcmVzaGA7XG4gICAgRGlhZ25vc3RpY1JlZnJlc2hSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgRGlhZ25vc3RpY1JlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QubWV0aG9kKTtcbn0pKERpYWdub3N0aWNSZWZyZXNoUmVxdWVzdCB8fCAoZXhwb3J0cy5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSBEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldpbGxEZWxldGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCA9IGV4cG9ydHMuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLldpbGxDcmVhdGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSBwYXR0ZXJuIGtpbmQgZGVzY3JpYmluZyBpZiBhIGdsb2IgcGF0dGVybiBtYXRjaGVzIGEgZmlsZSBhIGZvbGRlciBvclxuICogYm90aC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBGaWxlT3BlcmF0aW9uUGF0dGVybktpbmQ7XG4oZnVuY3Rpb24gKEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXR0ZXJuIG1hdGNoZXMgYSBmaWxlIG9ubHkuXG4gICAgICovXG4gICAgRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kLmZpbGUgPSAnZmlsZSc7XG4gICAgLyoqXG4gICAgICogVGhlIHBhdHRlcm4gbWF0Y2hlcyBhIGZvbGRlciBvbmx5LlxuICAgICAqL1xuICAgIEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZC5mb2xkZXIgPSAnZm9sZGVyJztcbn0pKEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCB8fCAoZXhwb3J0cy5GaWxlT3BlcmF0aW9uUGF0dGVybktpbmQgPSBGaWxlT3BlcmF0aW9uUGF0dGVybktpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgd2lsbCBjcmVhdGUgZmlsZXMgcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIGJlZm9yZSBmaWxlcyBhcmUgYWN0dWFsbHlcbiAqIGNyZWF0ZWQgYXMgbG9uZyBhcyB0aGUgY3JlYXRpb24gaXMgdHJpZ2dlcmVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogVGhlIHJlcXVlc3QgY2FuIHJldHVybiBhIGBXb3Jrc3BhY2VFZGl0YCB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gd29ya3NwYWNlIGJlZm9yZSB0aGVcbiAqIGZpbGVzIGFyZSBjcmVhdGVkLiBIZW5jZSB0aGUgYFdvcmtzcGFjZUVkaXRgIGNhbiBub3QgbWFuaXB1bGF0ZSB0aGUgY29udGVudCBvZiB0aGUgZmlsZVxuICogdG8gYmUgY3JlYXRlZC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0KSB7XG4gICAgV2lsbENyZWF0ZUZpbGVzUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL3dpbGxDcmVhdGVGaWxlcyc7XG4gICAgV2lsbENyZWF0ZUZpbGVzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFdpbGxDcmVhdGVGaWxlc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoV2lsbENyZWF0ZUZpbGVzUmVxdWVzdC5tZXRob2QpO1xufSkoV2lsbENyZWF0ZUZpbGVzUmVxdWVzdCB8fCAoZXhwb3J0cy5XaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0ID0gV2lsbENyZWF0ZUZpbGVzUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBkaWQgY3JlYXRlIGZpbGVzIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHdoZW5cbiAqIGZpbGVzIHdlcmUgY3JlYXRlZCBmcm9tIHdpdGhpbiB0aGUgY2xpZW50LlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIERpZENyZWF0ZUZpbGVzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbikge1xuICAgIERpZENyZWF0ZUZpbGVzTm90aWZpY2F0aW9uLm1ldGhvZCA9ICd3b3Jrc3BhY2UvZGlkQ3JlYXRlRmlsZXMnO1xuICAgIERpZENyZWF0ZUZpbGVzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24gPSBEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSB3aWxsIHJlbmFtZSBmaWxlcyByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgYmVmb3JlIGZpbGVzIGFyZSBhY3R1YWxseVxuICogcmVuYW1lZCBhcyBsb25nIGFzIHRoZSByZW5hbWUgaXMgdHJpZ2dlcmVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgV2lsbFJlbmFtZUZpbGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCkge1xuICAgIFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS93aWxsUmVuYW1lRmlsZXMnO1xuICAgIFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsUmVuYW1lRmlsZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QgfHwgKGV4cG9ydHMuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCA9IFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlkIHJlbmFtZSBmaWxlcyBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB3aGVuXG4gKiBmaWxlcyB3ZXJlIHJlbmFtZWQgZnJvbSB3aXRoaW4gdGhlIGNsaWVudC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkUmVuYW1lRmlsZXNOb3RpZmljYXRpb24pIHtcbiAgICBEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QgPSAnd29ya3NwYWNlL2RpZFJlbmFtZUZpbGVzJztcbiAgICBEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkUmVuYW1lRmlsZXNOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uID0gRGlkUmVuYW1lRmlsZXNOb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgd2lsbCBkZWxldGUgZmlsZXMgcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIGJlZm9yZSBmaWxlcyBhcmUgYWN0dWFsbHlcbiAqIGRlbGV0ZWQgYXMgbG9uZyBhcyB0aGUgZGVsZXRpb24gaXMgdHJpZ2dlcmVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uKSB7XG4gICAgRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb24ubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWREZWxldGVGaWxlcyc7XG4gICAgRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWREZWxldGVGaWxlc05vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShEaWREZWxldGVGaWxlc05vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWREZWxldGVGaWxlc05vdGlmaWNhdGlvbiA9IERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRpZCBkZWxldGUgZmlsZXMgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgd2hlblxuICogZmlsZXMgd2VyZSBkZWxldGVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgV2lsbERlbGV0ZUZpbGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoV2lsbERlbGV0ZUZpbGVzUmVxdWVzdCkge1xuICAgIFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS93aWxsRGVsZXRlRmlsZXMnO1xuICAgIFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsRGVsZXRlRmlsZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFdpbGxEZWxldGVGaWxlc1JlcXVlc3QgfHwgKGV4cG9ydHMuV2lsbERlbGV0ZUZpbGVzUmVxdWVzdCA9IFdpbGxEZWxldGVGaWxlc1JlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRm9sZGluZ1JhbmdlUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLkZvbGRpbmdSYW5nZVJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGZvbGRpbmcgcmFuZ2VzIGluIGEgZG9jdW1lbnQuIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBGb2xkaW5nUmFuZ2VQYXJhbXN9LCB0aGVcbiAqIHJlc3BvbnNlIGlzIG9mIHR5cGUge0BsaW5rIEZvbGRpbmdSYW5nZUxpc3R9IG9yIGEgVGhlbmFibGVcbiAqIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIEZvbGRpbmdSYW5nZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKEZvbGRpbmdSYW5nZVJlcXVlc3QpIHtcbiAgICBGb2xkaW5nUmFuZ2VSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvZm9sZGluZ1JhbmdlJztcbiAgICBGb2xkaW5nUmFuZ2VSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRm9sZGluZ1JhbmdlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShGb2xkaW5nUmFuZ2VSZXF1ZXN0Lm1ldGhvZCk7XG59KShGb2xkaW5nUmFuZ2VSZXF1ZXN0IHx8IChleHBvcnRzLkZvbGRpbmdSYW5nZVJlcXVlc3QgPSBGb2xkaW5nUmFuZ2VSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQHNpbmNlIDMuMTguMFxuICogQHByb3Bvc2VkXG4gKi9cbnZhciBGb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdDtcbihmdW5jdGlvbiAoRm9sZGluZ1JhbmdlUmVmcmVzaFJlcXVlc3QpIHtcbiAgICBGb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL2ZvbGRpbmdSYW5nZS9yZWZyZXNoYDtcbiAgICBGb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIEZvbGRpbmdSYW5nZVJlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChGb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdC5tZXRob2QpO1xufSkoRm9sZGluZ1JhbmdlUmVmcmVzaFJlcXVlc3QgfHwgKGV4cG9ydHMuRm9sZGluZ1JhbmdlUmVmcmVzaFJlcXVlc3QgPSBGb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW1wbGVtZW50YXRpb25SZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLy8gQHRzLWlnbm9yZTogdG8gYXZvaWQgaW5saW5pbmcgTG9jYXRpb25MaW5rIGFzIGR5bmFtaWMgaW1wb3J0XG5sZXQgX19ub0R5bmFtaWNJbXBvcnQ7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBpbXBsZW1lbnRhdGlvbiBsb2NhdGlvbnMgb2YgYSBzeW1ib2wgYXQgYSBnaXZlbiB0ZXh0XG4gKiBkb2N1bWVudCBwb3NpdGlvbi4gVGhlIHJlcXVlc3QncyBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgVGV4dERvY3VtZW50UG9zaXRpb25QYXJhbXN9XG4gKiB0aGUgcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgRGVmaW5pdGlvbn0gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBJbXBsZW1lbnRhdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKEltcGxlbWVudGF0aW9uUmVxdWVzdCkge1xuICAgIEltcGxlbWVudGF0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2ltcGxlbWVudGF0aW9uJztcbiAgICBJbXBsZW1lbnRhdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbXBsZW1lbnRhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSW1wbGVtZW50YXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShJbXBsZW1lbnRhdGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuSW1wbGVtZW50YXRpb25SZXF1ZXN0ID0gSW1wbGVtZW50YXRpb25SZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklubGF5SGludFJlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5JbmxheUhpbnRSZXNvbHZlUmVxdWVzdCA9IGV4cG9ydHMuSW5sYXlIaW50UmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHByb3ZpZGUgaW5sYXkgaGludHMgaW4gYSBkb2N1bWVudC4gVGhlIHJlcXVlc3QncyBwYXJhbWV0ZXIgaXMgb2ZcbiAqIHR5cGUge0BsaW5rIElubGF5SGludHNQYXJhbXN9LCB0aGUgcmVzcG9uc2UgaXMgb2YgdHlwZVxuICoge0BsaW5rIElubGF5SGludCBJbmxheUhpbnRbXX0gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgSW5sYXlIaW50UmVxdWVzdDtcbihmdW5jdGlvbiAoSW5sYXlIaW50UmVxdWVzdCkge1xuICAgIElubGF5SGludFJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9pbmxheUhpbnQnO1xuICAgIElubGF5SGludFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbmxheUhpbnRSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKElubGF5SGludFJlcXVlc3QubWV0aG9kKTtcbn0pKElubGF5SGludFJlcXVlc3QgfHwgKGV4cG9ydHMuSW5sYXlIaW50UmVxdWVzdCA9IElubGF5SGludFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZm9yIGFuIGlubGF5IGhpbnQuXG4gKiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBJbmxheUhpbnR9LCB0aGUgcmVzcG9uc2UgaXNcbiAqIG9mIHR5cGUge0BsaW5rIElubGF5SGludH0gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgSW5sYXlIaW50UmVzb2x2ZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKElubGF5SGludFJlc29sdmVSZXF1ZXN0KSB7XG4gICAgSW5sYXlIaW50UmVzb2x2ZVJlcXVlc3QubWV0aG9kID0gJ2lubGF5SGludC9yZXNvbHZlJztcbiAgICBJbmxheUhpbnRSZXNvbHZlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIElubGF5SGludFJlc29sdmVSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKElubGF5SGludFJlc29sdmVSZXF1ZXN0Lm1ldGhvZCk7XG59KShJbmxheUhpbnRSZXNvbHZlUmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxheUhpbnRSZXNvbHZlUmVxdWVzdCA9IElubGF5SGludFJlc29sdmVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3Q7XG4oZnVuY3Rpb24gKElubGF5SGludFJlZnJlc2hSZXF1ZXN0KSB7XG4gICAgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWV0aG9kID0gYHdvcmtzcGFjZS9pbmxheUhpbnQvcmVmcmVzaGA7XG4gICAgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBJbmxheUhpbnRSZWZyZXNoUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZTAoSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWV0aG9kKTtcbn0pKElubGF5SGludFJlZnJlc2hSZXF1ZXN0IHx8IChleHBvcnRzLklubGF5SGludFJlZnJlc2hSZXF1ZXN0ID0gSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5saW5lQ29tcGxldGlvblJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGlubGluZSBjb21wbGV0aW9ucyBpbiBhIGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZlxuICogdHlwZSB7QGxpbmsgSW5saW5lQ29tcGxldGlvblBhcmFtc30sIHRoZSByZXNwb25zZSBpcyBvZiB0eXBlXG4gKiB7QGxpbmsgSW5saW5lQ29tcGxldGlvbiBJbmxpbmVDb21wbGV0aW9uW119IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICpcbiAqIEBzaW5jZSAzLjE4LjBcbiAqIEBwcm9wb3NlZFxuICovXG52YXIgSW5saW5lQ29tcGxldGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKElubGluZUNvbXBsZXRpb25SZXF1ZXN0KSB7XG4gICAgSW5saW5lQ29tcGxldGlvblJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9pbmxpbmVDb21wbGV0aW9uJztcbiAgICBJbmxpbmVDb21wbGV0aW9uUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIElubGluZUNvbXBsZXRpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKElubGluZUNvbXBsZXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShJbmxpbmVDb21wbGV0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxpbmVDb21wbGV0aW9uUmVxdWVzdCA9IElubGluZUNvbXBsZXRpb25SZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLklubGluZVZhbHVlUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHByb3ZpZGUgaW5saW5lIHZhbHVlcyBpbiBhIGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZlxuICogdHlwZSB7QGxpbmsgSW5saW5lVmFsdWVQYXJhbXN9LCB0aGUgcmVzcG9uc2UgaXMgb2YgdHlwZVxuICoge0BsaW5rIElubGluZVZhbHVlIElubGluZVZhbHVlW119IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIElubGluZVZhbHVlUmVxdWVzdDtcbihmdW5jdGlvbiAoSW5saW5lVmFsdWVSZXF1ZXN0KSB7XG4gICAgSW5saW5lVmFsdWVSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvaW5saW5lVmFsdWUnO1xuICAgIElubGluZVZhbHVlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIElubGluZVZhbHVlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShJbmxpbmVWYWx1ZVJlcXVlc3QubWV0aG9kKTtcbn0pKElubGluZVZhbHVlUmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxpbmVWYWx1ZVJlcXVlc3QgPSBJbmxpbmVWYWx1ZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0O1xuKGZ1bmN0aW9uIChJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0KSB7XG4gICAgSW5saW5lVmFsdWVSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL2lubGluZVZhbHVlL3JlZnJlc2hgO1xuICAgIElubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0Lm1ldGhvZCk7XG59KShJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0IHx8IChleHBvcnRzLklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QgPSBJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3Jrc3BhY2VTeW1ib2xSZXF1ZXN0ID0gZXhwb3J0cy5Db2RlQWN0aW9uUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkNvZGVBY3Rpb25SZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudFN5bWJvbFJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50SGlnaGxpZ2h0UmVxdWVzdCA9IGV4cG9ydHMuUmVmZXJlbmNlc1JlcXVlc3QgPSBleHBvcnRzLkRlZmluaXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5TaWduYXR1cmVIZWxwUmVxdWVzdCA9IGV4cG9ydHMuU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kID0gZXhwb3J0cy5Ib3ZlclJlcXVlc3QgPSBleHBvcnRzLkNvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCA9IGV4cG9ydHMuQ29tcGxldGlvblJlcXVlc3QgPSBleHBvcnRzLkNvbXBsZXRpb25UcmlnZ2VyS2luZCA9IGV4cG9ydHMuUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5XYXRjaEtpbmQgPSBleHBvcnRzLlJlbGF0aXZlUGF0dGVybiA9IGV4cG9ydHMuRmlsZUNoYW5nZVR5cGUgPSBleHBvcnRzLkRpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0ID0gZXhwb3J0cy5XaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuVGV4dERvY3VtZW50U2F2ZVJlYXNvbiA9IGV4cG9ydHMuRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50ID0gZXhwb3J0cy5EaWRPcGVuVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRTeW5jS2luZCA9IGV4cG9ydHMuVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkxvZ01lc3NhZ2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlNob3dNZXNzYWdlUmVxdWVzdCA9IGV4cG9ydHMuU2hvd01lc3NhZ2VOb3RpZmljYXRpb24gPSBleHBvcnRzLk1lc3NhZ2VUeXBlID0gZXhwb3J0cy5EaWRDaGFuZ2VDb25maWd1cmF0aW9uTm90aWZpY2F0aW9uID0gZXhwb3J0cy5FeGl0Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5TaHV0ZG93blJlcXVlc3QgPSBleHBvcnRzLkluaXRpYWxpemVkTm90aWZpY2F0aW9uID0gZXhwb3J0cy5Jbml0aWFsaXplRXJyb3JDb2RlcyA9IGV4cG9ydHMuSW5pdGlhbGl6ZVJlcXVlc3QgPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NPcHRpb25zID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zID0gZXhwb3J0cy5TdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zID0gZXhwb3J0cy5Qb3NpdGlvbkVuY29kaW5nS2luZCA9IGV4cG9ydHMuRmFpbHVyZUhhbmRsaW5nS2luZCA9IGV4cG9ydHMuUmVzb3VyY2VPcGVyYXRpb25LaW5kID0gZXhwb3J0cy5VbnJlZ2lzdHJhdGlvblJlcXVlc3QgPSBleHBvcnRzLlJlZ2lzdHJhdGlvblJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50U2VsZWN0b3IgPSBleHBvcnRzLk5vdGVib29rQ2VsbFRleHREb2N1bWVudEZpbHRlciA9IGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudEZpbHRlciA9IGV4cG9ydHMuVGV4dERvY3VtZW50RmlsdGVyID0gdm9pZCAwO1xuZXhwb3J0cy5Nb25pa2VyUmVxdWVzdCA9IGV4cG9ydHMuTW9uaWtlcktpbmQgPSBleHBvcnRzLlVuaXF1ZW5lc3NMZXZlbCA9IGV4cG9ydHMuV2lsbERlbGV0ZUZpbGVzUmVxdWVzdCA9IGV4cG9ydHMuRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLldpbGxSZW5hbWVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkRpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5XaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0ID0gZXhwb3J0cy5EaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kID0gZXhwb3J0cy5MaW5rZWRFZGl0aW5nUmFuZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TaG93RG9jdW1lbnRSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZXF1ZXN0ID0gZXhwb3J0cy5Ub2tlbkZvcm1hdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0ID0gZXhwb3J0cy5DYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QgPSBleHBvcnRzLkNhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QgPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3MgPSBleHBvcnRzLlNlbGVjdGlvblJhbmdlUmVxdWVzdCA9IGV4cG9ydHMuRGVjbGFyYXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Gb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdCA9IGV4cG9ydHMuRm9sZGluZ1JhbmdlUmVxdWVzdCA9IGV4cG9ydHMuQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudENvbG9yUmVxdWVzdCA9IGV4cG9ydHMuQ29uZmlndXJhdGlvblJlcXVlc3QgPSBleHBvcnRzLkRpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24gPSBleHBvcnRzLldvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0ID0gZXhwb3J0cy5UeXBlRGVmaW5pdGlvblJlcXVlc3QgPSBleHBvcnRzLkltcGxlbWVudGF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdCA9IGV4cG9ydHMuRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0ID0gZXhwb3J0cy5QcmVwYXJlUmVuYW1lUmVxdWVzdCA9IGV4cG9ydHMuUmVuYW1lUmVxdWVzdCA9IGV4cG9ydHMuUHJlcGFyZVN1cHBvcnREZWZhdWx0QmVoYXZpb3IgPSBleHBvcnRzLkRvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50UmFuZ2VzRm9ybWF0dGluZ1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50TGlua1JlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QgPSB2b2lkIDA7XG5leHBvcnRzLklubGluZUNvbXBsZXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5EaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5Ob3RlYm9va0NlbGxBcnJheUNoYW5nZSA9IGV4cG9ydHMuRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLk5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZSA9IGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudCA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsID0gZXhwb3J0cy5FeGVjdXRpb25TdW1tYXJ5ID0gZXhwb3J0cy5Ob3RlYm9va0NlbGxLaW5kID0gZXhwb3J0cy5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudERpYWdub3N0aWNSZXBvcnRLaW5kID0gZXhwb3J0cy5EaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YSA9IGV4cG9ydHMuSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLklubGF5SGludFJlc29sdmVSZXF1ZXN0ID0gZXhwb3J0cy5JbmxheUhpbnRSZXF1ZXN0ID0gZXhwb3J0cy5JbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5JbmxpbmVWYWx1ZVJlcXVlc3QgPSBleHBvcnRzLlR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdCA9IGV4cG9ydHMuVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdCA9IGV4cG9ydHMuVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuY29uc3QgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEgPSByZXF1aXJlKFwidnNjb2RlLWxhbmd1YWdlc2VydmVyLXR5cGVzXCIpO1xuY29uc3QgSXMgPSByZXF1aXJlKFwiLi91dGlscy9pc1wiKTtcbmNvbnN0IHByb3RvY29sX2ltcGxlbWVudGF0aW9uXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5pbXBsZW1lbnRhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkltcGxlbWVudGF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfaW1wbGVtZW50YXRpb25fMS5JbXBsZW1lbnRhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF90eXBlRGVmaW5pdGlvbl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wudHlwZURlZmluaXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUeXBlRGVmaW5pdGlvblJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3R5cGVEZWZpbml0aW9uXzEuVHlwZURlZmluaXRpb25SZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfd29ya3NwYWNlRm9sZGVyXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC53b3Jrc3BhY2VGb2xkZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfd29ya3NwYWNlRm9sZGVyXzEuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF93b3Jrc3BhY2VGb2xkZXJfMS5EaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uOyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfY29uZmlndXJhdGlvbl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuY29uZmlndXJhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbmZpZ3VyYXRpb25SZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jb25maWd1cmF0aW9uXzEuQ29uZmlndXJhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9jb2xvclByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5jb2xvclByb3ZpZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRG9jdW1lbnRDb2xvclJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2NvbG9yUHJvdmlkZXJfMS5Eb2N1bWVudENvbG9yUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfY29sb3JQcm92aWRlcl8xLkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2ZvbGRpbmdSYW5nZV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuZm9sZGluZ1JhbmdlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRm9sZGluZ1JhbmdlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZm9sZGluZ1JhbmdlXzEuRm9sZGluZ1JhbmdlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkZvbGRpbmdSYW5nZVJlZnJlc2hSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9mb2xkaW5nUmFuZ2VfMS5Gb2xkaW5nUmFuZ2VSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2RlY2xhcmF0aW9uXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5kZWNsYXJhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRlY2xhcmF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGVjbGFyYXRpb25fMS5EZWNsYXJhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9zZWxlY3Rpb25SYW5nZV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuc2VsZWN0aW9uUmFuZ2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZWxlY3Rpb25SYW5nZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbGVjdGlvblJhbmdlXzEuU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfcHJvZ3Jlc3NfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnByb2dyZXNzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV29ya0RvbmVQcm9ncmVzc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfcHJvZ3Jlc3NfMS5Xb3JrRG9uZVByb2dyZXNzOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3Byb2dyZXNzXzEuV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9wcm9ncmVzc18xLldvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb247IH0gfSk7XG5jb25zdCBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5jYWxsSGllcmFyY2h5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnNlbWFudGljVG9rZW5zXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVG9rZW5Gb3JtYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuVG9rZW5Gb3JtYXQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZW1hbnRpY1Rva2Vuc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMS5TZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMS5TZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGU7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9zaG93RG9jdW1lbnRfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnNob3dEb2N1bWVudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNob3dEb2N1bWVudFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3Nob3dEb2N1bWVudF8xLlNob3dEb2N1bWVudFJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9saW5rZWRFZGl0aW5nUmFuZ2VfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmxpbmtlZEVkaXRpbmdSYW5nZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2xpbmtlZEVkaXRpbmdSYW5nZV8xLkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuZmlsZU9wZXJhdGlvbnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGaWxlT3BlcmF0aW9uUGF0dGVybktpbmRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xLldpbGxDcmVhdGVGaWxlc1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZmlsZU9wZXJhdGlvbnNfMS5EaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldpbGxSZW5hbWVGaWxlc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2lsbERlbGV0ZUZpbGVzUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZmlsZU9wZXJhdGlvbnNfMS5XaWxsRGVsZXRlRmlsZXNSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfbW9uaWtlcl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wubW9uaWtlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlVuaXF1ZW5lc3NMZXZlbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbW9uaWtlcl8xLlVuaXF1ZW5lc3NMZXZlbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1vbmlrZXJLaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9tb25pa2VyXzEuTW9uaWtlcktpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNb25pa2VyUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbW9uaWtlcl8xLk1vbmlrZXJSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfdHlwZUhpZXJhcmNoeV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wudHlwZUhpZXJhcmNoeVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfdHlwZUhpZXJhcmNoeV8xLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3R5cGVIaWVyYXJjaHlfMS5UeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF90eXBlSGllcmFyY2h5XzEuVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfaW5saW5lVmFsdWVfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmlubGluZVZhbHVlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5saW5lVmFsdWVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxpbmVWYWx1ZV8xLklubGluZVZhbHVlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2lubGluZVZhbHVlXzEuSW5saW5lVmFsdWVSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2lubGF5SGludF8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuaW5sYXlIaW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5sYXlIaW50UmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfaW5sYXlIaW50XzEuSW5sYXlIaW50UmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGF5SGludFJlc29sdmVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxheUhpbnRfMS5JbmxheUhpbnRSZXNvbHZlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGF5SGludFJlZnJlc2hSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxheUhpbnRfMS5JbmxheUhpbnRSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2RpYWdub3N0aWNfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmRpYWdub3N0aWNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGlhZ25vc3RpY18xLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGlhZ25vc3RpY18xLkRvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9kaWFnbm9zdGljXzEuRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9kaWFnbm9zdGljXzEuV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2RpYWdub3N0aWNfMS5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9ub3RlYm9va18xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wubm90ZWJvb2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RlYm9va0NlbGxLaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLk5vdGVib29rQ2VsbEtpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFeGVjdXRpb25TdW1tYXJ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkV4ZWN1dGlvblN1bW1hcnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RlYm9va0NlbGxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX25vdGVib29rXzEuTm90ZWJvb2tDZWxsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tEb2N1bWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5Ob3RlYm9va0RvY3VtZW50OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLk5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX25vdGVib29rXzEuTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2U7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkRpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5EaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5EaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247IH0gfSk7XG5jb25zdCBwcm90b2NvbF9pbmxpbmVDb21wbGV0aW9uXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5pbmxpbmVDb21wbGV0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5saW5lQ29tcGxldGlvblJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2lubGluZUNvbXBsZXRpb25fMS5JbmxpbmVDb21wbGV0aW9uUmVxdWVzdDsgfSB9KTtcbi8vIEB0cy1pZ25vcmU6IHRvIGF2b2lkIGlubGluaW5nIExvY2F0aW9uTGluayBhcyBkeW5hbWljIGltcG9ydFxubGV0IF9fbm9EeW5hbWljSW1wb3J0O1xuLyoqXG4gKiBUaGUgVGV4dERvY3VtZW50RmlsdGVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIFRleHREb2N1bWVudEZpbHRlcn0gbGl0ZXJhbHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgVGV4dERvY3VtZW50RmlsdGVyO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRGaWx0ZXIpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLnN0cmluZyhjYW5kaWRhdGUpIHx8IChJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnNjaGVtZSkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5wYXR0ZXJuKSk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudEZpbHRlci5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50RmlsdGVyIHx8IChleHBvcnRzLlRleHREb2N1bWVudEZpbHRlciA9IFRleHREb2N1bWVudEZpbHRlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBOb3RlYm9va0RvY3VtZW50RmlsdGVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIE5vdGVib29rRG9jdW1lbnRGaWx0ZXJ9IGxpdGVyYWxzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIE5vdGVib29rRG9jdW1lbnRGaWx0ZXI7XG4oZnVuY3Rpb24gKE5vdGVib29rRG9jdW1lbnRGaWx0ZXIpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5ub3RlYm9va1R5cGUpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuc2NoZW1lKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnBhdHRlcm4pKTtcbiAgICB9XG4gICAgTm90ZWJvb2tEb2N1bWVudEZpbHRlci5pcyA9IGlzO1xufSkoTm90ZWJvb2tEb2N1bWVudEZpbHRlciB8fCAoZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50RmlsdGVyID0gTm90ZWJvb2tEb2N1bWVudEZpbHRlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyfSBsaXRlcmFscy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXI7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbFRleHREb2N1bWVudEZpbHRlcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5ub3RlYm9vaykgfHwgTm90ZWJvb2tEb2N1bWVudEZpbHRlci5pcyhjYW5kaWRhdGUubm90ZWJvb2spKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5sYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2UpKTtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyLmlzID0gaXM7XG59KShOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIgfHwgKGV4cG9ydHMuTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyID0gTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyID0ge30pKTtcbi8qKlxuICogVGhlIERvY3VtZW50U2VsZWN0b3IgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgRG9jdW1lbnRTZWxlY3Rvcn1zLlxuICovXG52YXIgRG9jdW1lbnRTZWxlY3RvcjtcbihmdW5jdGlvbiAoRG9jdW1lbnRTZWxlY3Rvcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIUlzLnN0cmluZyhlbGVtKSAmJiAhVGV4dERvY3VtZW50RmlsdGVyLmlzKGVsZW0pICYmICFOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIuaXMoZWxlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIERvY3VtZW50U2VsZWN0b3IuaXMgPSBpcztcbn0pKERvY3VtZW50U2VsZWN0b3IgfHwgKGV4cG9ydHMuRG9jdW1lbnRTZWxlY3RvciA9IERvY3VtZW50U2VsZWN0b3IgPSB7fSkpO1xuLyoqXG4gKiBUaGUgYGNsaWVudC9yZWdpc3RlckNhcGFiaWxpdHlgIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byByZWdpc3RlciBhIG5ldyBjYXBhYmlsaXR5XG4gKiBoYW5kbGVyIG9uIHRoZSBjbGllbnQgc2lkZS5cbiAqL1xudmFyIFJlZ2lzdHJhdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKFJlZ2lzdHJhdGlvblJlcXVlc3QpIHtcbiAgICBSZWdpc3RyYXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICdjbGllbnQvcmVnaXN0ZXJDYXBhYmlsaXR5JztcbiAgICBSZWdpc3RyYXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgUmVnaXN0cmF0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShSZWdpc3RyYXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShSZWdpc3RyYXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLlJlZ2lzdHJhdGlvblJlcXVlc3QgPSBSZWdpc3RyYXRpb25SZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGBjbGllbnQvdW5yZWdpc3RlckNhcGFiaWxpdHlgIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byB1bnJlZ2lzdGVyIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNhcGFiaWxpdHlcbiAqIGhhbmRsZXIgb24gdGhlIGNsaWVudCBzaWRlLlxuICovXG52YXIgVW5yZWdpc3RyYXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChVbnJlZ2lzdHJhdGlvblJlcXVlc3QpIHtcbiAgICBVbnJlZ2lzdHJhdGlvblJlcXVlc3QubWV0aG9kID0gJ2NsaWVudC91bnJlZ2lzdGVyQ2FwYWJpbGl0eSc7XG4gICAgVW5yZWdpc3RyYXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgVW5yZWdpc3RyYXRpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFVucmVnaXN0cmF0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoVW5yZWdpc3RyYXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLlVucmVnaXN0cmF0aW9uUmVxdWVzdCA9IFVucmVnaXN0cmF0aW9uUmVxdWVzdCA9IHt9KSk7XG52YXIgUmVzb3VyY2VPcGVyYXRpb25LaW5kO1xuKGZ1bmN0aW9uIChSZXNvdXJjZU9wZXJhdGlvbktpbmQpIHtcbiAgICAvKipcbiAgICAgKiBTdXBwb3J0cyBjcmVhdGluZyBuZXcgZmlsZXMgYW5kIGZvbGRlcnMuXG4gICAgICovXG4gICAgUmVzb3VyY2VPcGVyYXRpb25LaW5kLkNyZWF0ZSA9ICdjcmVhdGUnO1xuICAgIC8qKlxuICAgICAqIFN1cHBvcnRzIHJlbmFtaW5nIGV4aXN0aW5nIGZpbGVzIGFuZCBmb2xkZXJzLlxuICAgICAqL1xuICAgIFJlc291cmNlT3BlcmF0aW9uS2luZC5SZW5hbWUgPSAncmVuYW1lJztcbiAgICAvKipcbiAgICAgKiBTdXBwb3J0cyBkZWxldGluZyBleGlzdGluZyBmaWxlcyBhbmQgZm9sZGVycy5cbiAgICAgKi9cbiAgICBSZXNvdXJjZU9wZXJhdGlvbktpbmQuRGVsZXRlID0gJ2RlbGV0ZSc7XG59KShSZXNvdXJjZU9wZXJhdGlvbktpbmQgfHwgKGV4cG9ydHMuUmVzb3VyY2VPcGVyYXRpb25LaW5kID0gUmVzb3VyY2VPcGVyYXRpb25LaW5kID0ge30pKTtcbnZhciBGYWlsdXJlSGFuZGxpbmdLaW5kO1xuKGZ1bmN0aW9uIChGYWlsdXJlSGFuZGxpbmdLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQXBwbHlpbmcgdGhlIHdvcmtzcGFjZSBjaGFuZ2UgaXMgc2ltcGx5IGFib3J0ZWQgaWYgb25lIG9mIHRoZSBjaGFuZ2VzIHByb3ZpZGVkXG4gICAgICogZmFpbHMuIEFsbCBvcGVyYXRpb25zIGV4ZWN1dGVkIGJlZm9yZSB0aGUgZmFpbGluZyBvcGVyYXRpb24gc3RheSBleGVjdXRlZC5cbiAgICAgKi9cbiAgICBGYWlsdXJlSGFuZGxpbmdLaW5kLkFib3J0ID0gJ2Fib3J0JztcbiAgICAvKipcbiAgICAgKiBBbGwgb3BlcmF0aW9ucyBhcmUgZXhlY3V0ZWQgdHJhbnNhY3Rpb25hbC4gVGhhdCBtZWFucyB0aGV5IGVpdGhlciBhbGxcbiAgICAgKiBzdWNjZWVkIG9yIG5vIGNoYW5nZXMgYXQgYWxsIGFyZSBhcHBsaWVkIHRvIHRoZSB3b3Jrc3BhY2UuXG4gICAgICovXG4gICAgRmFpbHVyZUhhbmRsaW5nS2luZC5UcmFuc2FjdGlvbmFsID0gJ3RyYW5zYWN0aW9uYWwnO1xuICAgIC8qKlxuICAgICAqIElmIHRoZSB3b3Jrc3BhY2UgZWRpdCBjb250YWlucyBvbmx5IHRleHR1YWwgZmlsZSBjaGFuZ2VzIHRoZXkgYXJlIGV4ZWN1dGVkIHRyYW5zYWN0aW9uYWwuXG4gICAgICogSWYgcmVzb3VyY2UgY2hhbmdlcyAoY3JlYXRlLCByZW5hbWUgb3IgZGVsZXRlIGZpbGUpIGFyZSBwYXJ0IG9mIHRoZSBjaGFuZ2UgdGhlIGZhaWx1cmVcbiAgICAgKiBoYW5kbGluZyBzdHJhdGVneSBpcyBhYm9ydC5cbiAgICAgKi9cbiAgICBGYWlsdXJlSGFuZGxpbmdLaW5kLlRleHRPbmx5VHJhbnNhY3Rpb25hbCA9ICd0ZXh0T25seVRyYW5zYWN0aW9uYWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQgdHJpZXMgdG8gdW5kbyB0aGUgb3BlcmF0aW9ucyBhbHJlYWR5IGV4ZWN1dGVkLiBCdXQgdGhlcmUgaXMgbm9cbiAgICAgKiBndWFyYW50ZWUgdGhhdCB0aGlzIGlzIHN1Y2NlZWRpbmcuXG4gICAgICovXG4gICAgRmFpbHVyZUhhbmRsaW5nS2luZC5VbmRvID0gJ3VuZG8nO1xufSkoRmFpbHVyZUhhbmRsaW5nS2luZCB8fCAoZXhwb3J0cy5GYWlsdXJlSGFuZGxpbmdLaW5kID0gRmFpbHVyZUhhbmRsaW5nS2luZCA9IHt9KSk7XG4vKipcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgcG9zaXRpb24gZW5jb2Rpbmcga2luZHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgUG9zaXRpb25FbmNvZGluZ0tpbmQ7XG4oZnVuY3Rpb24gKFBvc2l0aW9uRW5jb2RpbmdLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQ2hhcmFjdGVyIG9mZnNldHMgY291bnQgVVRGLTggY29kZSB1bml0cyAoZS5nLiBieXRlcykuXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGOCA9ICd1dGYtOCc7XG4gICAgLyoqXG4gICAgICogQ2hhcmFjdGVyIG9mZnNldHMgY291bnQgVVRGLTE2IGNvZGUgdW5pdHMuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHRoZSBkZWZhdWx0IGFuZCBtdXN0IGFsd2F5cyBiZSBzdXBwb3J0ZWRcbiAgICAgKiBieSBzZXJ2ZXJzXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGMTYgPSAndXRmLTE2JztcbiAgICAvKipcbiAgICAgKiBDaGFyYWN0ZXIgb2Zmc2V0cyBjb3VudCBVVEYtMzIgY29kZSB1bml0cy5cbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGU6IHRoZXNlIGFyZSB0aGUgc2FtZSBhcyBVbmljb2RlIGNvZGVwb2ludHMsXG4gICAgICogc28gdGhpcyBgUG9zaXRpb25FbmNvZGluZ0tpbmRgIG1heSBhbHNvIGJlIHVzZWQgZm9yIGFuXG4gICAgICogZW5jb2RpbmctYWdub3N0aWMgcmVwcmVzZW50YXRpb24gb2YgY2hhcmFjdGVyIG9mZnNldHMuXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGMzIgPSAndXRmLTMyJztcbn0pKFBvc2l0aW9uRW5jb2RpbmdLaW5kIHx8IChleHBvcnRzLlBvc2l0aW9uRW5jb2RpbmdLaW5kID0gUG9zaXRpb25FbmNvZGluZ0tpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBTdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zfSBsaXRlcmFscy5cbiAqL1xudmFyIFN0YXRpY1JlZ2lzdHJhdGlvbk9wdGlvbnM7XG4oZnVuY3Rpb24gKFN0YXRpY1JlZ2lzdHJhdGlvbk9wdGlvbnMpIHtcbiAgICBmdW5jdGlvbiBoYXNJZCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmlkKSAmJiBjYW5kaWRhdGUuaWQubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucy5oYXNJZCA9IGhhc0lkO1xufSkoU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucyB8fCAoZXhwb3J0cy5TdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zID0gU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucyA9IHt9KSk7XG4vKipcbiAqIFRoZSBUZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnN9IGxpdGVyYWxzLlxuICovXG52YXIgVGV4dERvY3VtZW50UmVnaXN0cmF0aW9uT3B0aW9ucztcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50UmVnaXN0cmF0aW9uT3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIChjYW5kaWRhdGUuZG9jdW1lbnRTZWxlY3RvciA9PT0gbnVsbCB8fCBEb2N1bWVudFNlbGVjdG9yLmlzKGNhbmRpZGF0ZS5kb2N1bWVudFNlbGVjdG9yKSk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMuaXMgPSBpcztcbn0pKFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMgfHwgKGV4cG9ydHMuVGV4dERvY3VtZW50UmVnaXN0cmF0aW9uT3B0aW9ucyA9IFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgV29ya0RvbmVQcm9ncmVzc09wdGlvbnN9IGxpdGVyYWxzLlxuICovXG52YXIgV29ya0RvbmVQcm9ncmVzc09wdGlvbnM7XG4oZnVuY3Rpb24gKFdvcmtEb25lUHJvZ3Jlc3NPcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgKGNhbmRpZGF0ZS53b3JrRG9uZVByb2dyZXNzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUud29ya0RvbmVQcm9ncmVzcykpO1xuICAgIH1cbiAgICBXb3JrRG9uZVByb2dyZXNzT3B0aW9ucy5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGhhc1dvcmtEb25lUHJvZ3Jlc3ModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuYm9vbGVhbihjYW5kaWRhdGUud29ya0RvbmVQcm9ncmVzcyk7XG4gICAgfVxuICAgIFdvcmtEb25lUHJvZ3Jlc3NPcHRpb25zLmhhc1dvcmtEb25lUHJvZ3Jlc3MgPSBoYXNXb3JrRG9uZVByb2dyZXNzO1xufSkoV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgfHwgKGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgPSBXb3JrRG9uZVByb2dyZXNzT3B0aW9ucyA9IHt9KSk7XG4vKipcbiAqIFRoZSBpbml0aWFsaXplIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cbiAqIEl0IGlzIHNlbnQgb25jZSBhcyB0aGUgcmVxdWVzdCBhZnRlciBzdGFydGluZyB1cCB0aGUgc2VydmVyLlxuICogVGhlIHJlcXVlc3RzIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBJbml0aWFsaXplUGFyYW1zfVxuICogdGhlIHJlc3BvbnNlIGlmIG9mIHR5cGUge0BsaW5rIEluaXRpYWxpemVSZXN1bHR9IG9mIGEgVGhlbmFibGUgdGhhdFxuICogcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIEluaXRpYWxpemVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChJbml0aWFsaXplUmVxdWVzdCkge1xuICAgIEluaXRpYWxpemVSZXF1ZXN0Lm1ldGhvZCA9ICdpbml0aWFsaXplJztcbiAgICBJbml0aWFsaXplUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIEluaXRpYWxpemVSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKEluaXRpYWxpemVSZXF1ZXN0Lm1ldGhvZCk7XG59KShJbml0aWFsaXplUmVxdWVzdCB8fCAoZXhwb3J0cy5Jbml0aWFsaXplUmVxdWVzdCA9IEluaXRpYWxpemVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogS25vd24gZXJyb3IgY29kZXMgZm9yIGFuIGBJbml0aWFsaXplRXJyb3JDb2Rlc2A7XG4gKi9cbnZhciBJbml0aWFsaXplRXJyb3JDb2RlcztcbihmdW5jdGlvbiAoSW5pdGlhbGl6ZUVycm9yQ29kZXMpIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgcHJvdG9jb2wgdmVyc2lvbiBwcm92aWRlZCBieSB0aGUgY2xpZW50IGNhbid0IGJlIGhhbmRsZWQgYnkgdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFRoaXMgaW5pdGlhbGl6ZSBlcnJvciBnb3QgcmVwbGFjZWQgYnkgY2xpZW50IGNhcGFiaWxpdGllcy4gVGhlcmUgaXNcbiAgICAgKiBubyB2ZXJzaW9uIGhhbmRzaGFrZSBpbiB2ZXJzaW9uIDMuMHhcbiAgICAgKi9cbiAgICBJbml0aWFsaXplRXJyb3JDb2Rlcy51bmtub3duUHJvdG9jb2xWZXJzaW9uID0gMTtcbn0pKEluaXRpYWxpemVFcnJvckNvZGVzIHx8IChleHBvcnRzLkluaXRpYWxpemVFcnJvckNvZGVzID0gSW5pdGlhbGl6ZUVycm9yQ29kZXMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgaW5pdGlhbGl6ZWQgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZVxuICogc2VydmVyIGFmdGVyIHRoZSBjbGllbnQgaXMgZnVsbHkgaW5pdGlhbGl6ZWQgYW5kIHRoZSBzZXJ2ZXJcbiAqIGlzIGFsbG93ZWQgdG8gc2VuZCByZXF1ZXN0cyBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudC5cbiAqL1xudmFyIEluaXRpYWxpemVkTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChJbml0aWFsaXplZE5vdGlmaWNhdGlvbikge1xuICAgIEluaXRpYWxpemVkTm90aWZpY2F0aW9uLm1ldGhvZCA9ICdpbml0aWFsaXplZCc7XG4gICAgSW5pdGlhbGl6ZWROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbml0aWFsaXplZE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKEluaXRpYWxpemVkTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShJbml0aWFsaXplZE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5Jbml0aWFsaXplZE5vdGlmaWNhdGlvbiA9IEluaXRpYWxpemVkTm90aWZpY2F0aW9uID0ge30pKTtcbi8vLS0tLSBTaHV0ZG93biBNZXRob2QgLS0tLVxuLyoqXG4gKiBBIHNodXRkb3duIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cbiAqIEl0IGlzIHNlbnQgb25jZSB3aGVuIHRoZSBjbGllbnQgZGVjaWRlcyB0byBzaHV0ZG93biB0aGVcbiAqIHNlcnZlci4gVGhlIG9ubHkgbm90aWZpY2F0aW9uIHRoYXQgaXMgc2VudCBhZnRlciBhIHNodXRkb3duIHJlcXVlc3RcbiAqIGlzIHRoZSBleGl0IGV2ZW50LlxuICovXG52YXIgU2h1dGRvd25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChTaHV0ZG93blJlcXVlc3QpIHtcbiAgICBTaHV0ZG93blJlcXVlc3QubWV0aG9kID0gJ3NodXRkb3duJztcbiAgICBTaHV0ZG93blJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBTaHV0ZG93blJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUwKFNodXRkb3duUmVxdWVzdC5tZXRob2QpO1xufSkoU2h1dGRvd25SZXF1ZXN0IHx8IChleHBvcnRzLlNodXRkb3duUmVxdWVzdCA9IFNodXRkb3duUmVxdWVzdCA9IHt9KSk7XG4vLy0tLS0gRXhpdCBOb3RpZmljYXRpb24gLS0tLVxuLyoqXG4gKiBUaGUgZXhpdCBldmVudCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHRvXG4gKiBhc2sgdGhlIHNlcnZlciB0byBleGl0IGl0cyBwcm9jZXNzLlxuICovXG52YXIgRXhpdE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRXhpdE5vdGlmaWNhdGlvbikge1xuICAgIEV4aXROb3RpZmljYXRpb24ubWV0aG9kID0gJ2V4aXQnO1xuICAgIEV4aXROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBFeGl0Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUwKEV4aXROb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKEV4aXROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRXhpdE5vdGlmaWNhdGlvbiA9IEV4aXROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgY29uZmlndXJhdGlvbiBjaGFuZ2Ugbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXJcbiAqIHdoZW4gdGhlIGNsaWVudCdzIGNvbmZpZ3VyYXRpb24gaGFzIGNoYW5nZWQuIFRoZSBub3RpZmljYXRpb24gY29udGFpbnNcbiAqIHRoZSBjaGFuZ2VkIGNvbmZpZ3VyYXRpb24gYXMgZGVmaW5lZCBieSB0aGUgbGFuZ3VhZ2UgY2xpZW50LlxuICovXG52YXIgRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24ubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWRDaGFuZ2VDb25maWd1cmF0aW9uJztcbiAgICBEaWRDaGFuZ2VDb25maWd1cmF0aW9uTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbiA9IERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24gPSB7fSkpO1xuLy8tLS0tIE1lc3NhZ2Ugc2hvdyBhbmQgbG9nIG5vdGlmaWNhdGlvbnMgLS0tLVxuLyoqXG4gKiBUaGUgbWVzc2FnZSB0eXBlXG4gKi9cbnZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBBbiBlcnJvciBtZXNzYWdlLlxuICAgICAqL1xuICAgIE1lc3NhZ2VUeXBlLkVycm9yID0gMTtcbiAgICAvKipcbiAgICAgKiBBIHdhcm5pbmcgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBNZXNzYWdlVHlwZS5XYXJuaW5nID0gMjtcbiAgICAvKipcbiAgICAgKiBBbiBpbmZvcm1hdGlvbiBtZXNzYWdlLlxuICAgICAqL1xuICAgIE1lc3NhZ2VUeXBlLkluZm8gPSAzO1xuICAgIC8qKlxuICAgICAqIEEgbG9nIG1lc3NhZ2UuXG4gICAgICovXG4gICAgTWVzc2FnZVR5cGUuTG9nID0gNDtcbiAgICAvKipcbiAgICAgKiBBIGRlYnVnIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMy4xOC4wXG4gICAgICovXG4gICAgTWVzc2FnZVR5cGUuRGVidWcgPSA1O1xufSkoTWVzc2FnZVR5cGUgfHwgKGV4cG9ydHMuTWVzc2FnZVR5cGUgPSBNZXNzYWdlVHlwZSA9IHt9KSk7XG4vKipcbiAqIFRoZSBzaG93IG1lc3NhZ2Ugbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSBhIHNlcnZlciB0byBhIGNsaWVudCB0byBhc2tcbiAqIHRoZSBjbGllbnQgdG8gZGlzcGxheSBhIHBhcnRpY3VsYXIgbWVzc2FnZSBpbiB0aGUgdXNlciBpbnRlcmZhY2UuXG4gKi9cbnZhciBTaG93TWVzc2FnZU5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoU2hvd01lc3NhZ2VOb3RpZmljYXRpb24pIHtcbiAgICBTaG93TWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QgPSAnd2luZG93L3Nob3dNZXNzYWdlJztcbiAgICBTaG93TWVzc2FnZU5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIFNob3dNZXNzYWdlTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoU2hvd01lc3NhZ2VOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKFNob3dNZXNzYWdlTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlNob3dNZXNzYWdlTm90aWZpY2F0aW9uID0gU2hvd01lc3NhZ2VOb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgc2hvdyBtZXNzYWdlIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byBzaG93IGEgbWVzc2FnZVxuICogYW5kIGEgc2V0IG9mIG9wdGlvbnMgYWN0aW9ucyB0byB0aGUgdXNlci5cbiAqL1xudmFyIFNob3dNZXNzYWdlUmVxdWVzdDtcbihmdW5jdGlvbiAoU2hvd01lc3NhZ2VSZXF1ZXN0KSB7XG4gICAgU2hvd01lc3NhZ2VSZXF1ZXN0Lm1ldGhvZCA9ICd3aW5kb3cvc2hvd01lc3NhZ2VSZXF1ZXN0JztcbiAgICBTaG93TWVzc2FnZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBTaG93TWVzc2FnZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoU2hvd01lc3NhZ2VSZXF1ZXN0Lm1ldGhvZCk7XG59KShTaG93TWVzc2FnZVJlcXVlc3QgfHwgKGV4cG9ydHMuU2hvd01lc3NhZ2VSZXF1ZXN0ID0gU2hvd01lc3NhZ2VSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGxvZyBtZXNzYWdlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIGFza1xuICogdGhlIGNsaWVudCB0byBsb2cgYSBwYXJ0aWN1bGFyIG1lc3NhZ2UuXG4gKi9cbnZhciBMb2dNZXNzYWdlTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChMb2dNZXNzYWdlTm90aWZpY2F0aW9uKSB7XG4gICAgTG9nTWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QgPSAnd2luZG93L2xvZ01lc3NhZ2UnO1xuICAgIExvZ01lc3NhZ2VOb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBMb2dNZXNzYWdlTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoTG9nTWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoTG9nTWVzc2FnZU5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5Mb2dNZXNzYWdlTm90aWZpY2F0aW9uID0gTG9nTWVzc2FnZU5vdGlmaWNhdGlvbiA9IHt9KSk7XG4vLy0tLS0gVGVsZW1ldHJ5IG5vdGlmaWNhdGlvblxuLyoqXG4gKiBUaGUgdGVsZW1ldHJ5IGV2ZW50IG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIGFza1xuICogdGhlIGNsaWVudCB0byBsb2cgdGVsZW1ldHJ5IGRhdGEuXG4gKi9cbnZhciBUZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24pIHtcbiAgICBUZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbi5tZXRob2QgPSAndGVsZW1ldHJ5L2V2ZW50JztcbiAgICBUZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIFRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKFRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uID0gVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBEZWZpbmVzIGhvdyB0aGUgaG9zdCAoZWRpdG9yKSBzaG91bGQgc3luY1xuICogZG9jdW1lbnQgY2hhbmdlcyB0byB0aGUgbGFuZ3VhZ2Ugc2VydmVyLlxuICovXG52YXIgVGV4dERvY3VtZW50U3luY0tpbmQ7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudFN5bmNLaW5kKSB7XG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRzIHNob3VsZCBub3QgYmUgc3luY2VkIGF0IGFsbC5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTeW5jS2luZC5Ob25lID0gMDtcbiAgICAvKipcbiAgICAgKiBEb2N1bWVudHMgYXJlIHN5bmNlZCBieSBhbHdheXMgc2VuZGluZyB0aGUgZnVsbCBjb250ZW50XG4gICAgICogb2YgdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIFRleHREb2N1bWVudFN5bmNLaW5kLkZ1bGwgPSAxO1xuICAgIC8qKlxuICAgICAqIERvY3VtZW50cyBhcmUgc3luY2VkIGJ5IHNlbmRpbmcgdGhlIGZ1bGwgY29udGVudCBvbiBvcGVuLlxuICAgICAqIEFmdGVyIHRoYXQgb25seSBpbmNyZW1lbnRhbCB1cGRhdGVzIHRvIHRoZSBkb2N1bWVudCBhcmVcbiAgICAgKiBzZW5kLlxuICAgICAqL1xuICAgIFRleHREb2N1bWVudFN5bmNLaW5kLkluY3JlbWVudGFsID0gMjtcbn0pKFRleHREb2N1bWVudFN5bmNLaW5kIHx8IChleHBvcnRzLlRleHREb2N1bWVudFN5bmNLaW5kID0gVGV4dERvY3VtZW50U3luY0tpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZG9jdW1lbnQgb3BlbiBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB0byBzaWduYWxcbiAqIG5ld2x5IG9wZW5lZCB0ZXh0IGRvY3VtZW50cy4gVGhlIGRvY3VtZW50J3MgdHJ1dGggaXMgbm93IG1hbmFnZWQgYnkgdGhlIGNsaWVudFxuICogYW5kIHRoZSBzZXJ2ZXIgbXVzdCBub3QgdHJ5IHRvIHJlYWQgdGhlIGRvY3VtZW50J3MgdHJ1dGggdXNpbmcgdGhlIGRvY3VtZW50J3NcbiAqIHVyaS4gT3BlbiBpbiB0aGlzIHNlbnNlIG1lYW5zIGl0IGlzIG1hbmFnZWQgYnkgdGhlIGNsaWVudC4gSXQgZG9lc24ndCBuZWNlc3NhcmlseVxuICogbWVhbiB0aGF0IGl0cyBjb250ZW50IGlzIHByZXNlbnRlZCBpbiBhbiBlZGl0b3IuIEFuIG9wZW4gbm90aWZpY2F0aW9uIG11c3Qgbm90XG4gKiBiZSBzZW50IG1vcmUgdGhhbiBvbmNlIHdpdGhvdXQgYSBjb3JyZXNwb25kaW5nIGNsb3NlIG5vdGlmaWNhdGlvbiBzZW5kIGJlZm9yZS5cbiAqIFRoaXMgbWVhbnMgb3BlbiBhbmQgY2xvc2Ugbm90aWZpY2F0aW9uIG11c3QgYmUgYmFsYW5jZWQgYW5kIHRoZSBtYXggb3BlbiBjb3VudFxuICogaXMgb25lLlxuICovXG52YXIgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRPcGVuJztcbiAgICBEaWRPcGVuVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xudmFyIFRleHREb2N1bWVudENvbnRlbnRDaGFuZ2VFdmVudDtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50KSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGluZm9ybWF0aW9uIGRlc2NyaWJlcyBhIGRlbHRhIGV2ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzSW5jcmVtZW50YWwoZXZlbnQpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IGV2ZW50O1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICE9PSB1bmRlZmluZWQgJiYgY2FuZGlkYXRlICE9PSBudWxsICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlLnRleHQgPT09ICdzdHJpbmcnICYmIGNhbmRpZGF0ZS5yYW5nZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLnJhbmdlTGVuZ3RoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGNhbmRpZGF0ZS5yYW5nZUxlbmd0aCA9PT0gJ251bWJlcicpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQuaXNJbmNyZW1lbnRhbCA9IGlzSW5jcmVtZW50YWw7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGluZm9ybWF0aW9uIGRlc2NyaWJlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgZXZlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNGdWxsKGV2ZW50KSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSBldmVudDtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZS50ZXh0ID09PSAnc3RyaW5nJyAmJiBjYW5kaWRhdGUucmFuZ2UgPT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUucmFuZ2VMZW5ndGggPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50LmlzRnVsbCA9IGlzRnVsbDtcbn0pKFRleHREb2N1bWVudENvbnRlbnRDaGFuZ2VFdmVudCB8fCAoZXhwb3J0cy5UZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQgPSBUZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZG9jdW1lbnQgY2hhbmdlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHRvIHNpZ25hbFxuICogY2hhbmdlcyB0byBhIHRleHQgZG9jdW1lbnQuXG4gKi9cbnZhciBEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QgPSAndGV4dERvY3VtZW50L2RpZENoYW5nZSc7XG4gICAgRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IGNsb3NlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHdoZW5cbiAqIHRoZSBkb2N1bWVudCBnb3QgY2xvc2VkIGluIHRoZSBjbGllbnQuIFRoZSBkb2N1bWVudCdzIHRydXRoIG5vdyBleGlzdHMgd2hlcmVcbiAqIHRoZSBkb2N1bWVudCdzIHVyaSBwb2ludHMgdG8gKGUuZy4gaWYgdGhlIGRvY3VtZW50J3MgdXJpIGlzIGEgZmlsZSB1cmkgdGhlXG4gKiB0cnV0aCBub3cgZXhpc3RzIG9uIGRpc2spLiBBcyB3aXRoIHRoZSBvcGVuIG5vdGlmaWNhdGlvbiB0aGUgY2xvc2Ugbm90aWZpY2F0aW9uXG4gKiBpcyBhYm91dCBtYW5hZ2luZyB0aGUgZG9jdW1lbnQncyBjb250ZW50LiBSZWNlaXZpbmcgYSBjbG9zZSBub3RpZmljYXRpb25cbiAqIGRvZXNuJ3QgbWVhbiB0aGF0IHRoZSBkb2N1bWVudCB3YXMgb3BlbiBpbiBhbiBlZGl0b3IgYmVmb3JlLiBBIGNsb3NlXG4gKiBub3RpZmljYXRpb24gcmVxdWlyZXMgYSBwcmV2aW91cyBvcGVuIG5vdGlmaWNhdGlvbiB0byBiZSBzZW50LlxuICovXG52YXIgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZENsb3NlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRDbG9zZSc7XG4gICAgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENsb3NlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShEaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IERpZENsb3NlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IHNhdmUgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgd2hlblxuICogdGhlIGRvY3VtZW50IGdvdCBzYXZlZCBpbiB0aGUgY2xpZW50LlxuICovXG52YXIgRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRTYXZlJztcbiAgICBEaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IERpZFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBSZXByZXNlbnRzIHJlYXNvbnMgd2h5IGEgdGV4dCBkb2N1bWVudCBpcyBzYXZlZC5cbiAqL1xudmFyIFRleHREb2N1bWVudFNhdmVSZWFzb247XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudFNhdmVSZWFzb24pIHtcbiAgICAvKipcbiAgICAgKiBNYW51YWxseSB0cmlnZ2VyZWQsIGUuZy4gYnkgdGhlIHVzZXIgcHJlc3Npbmcgc2F2ZSwgYnkgc3RhcnRpbmcgZGVidWdnaW5nLFxuICAgICAqIG9yIGJ5IGFuIEFQSSBjYWxsLlxuICAgICAqL1xuICAgIFRleHREb2N1bWVudFNhdmVSZWFzb24uTWFudWFsID0gMTtcbiAgICAvKipcbiAgICAgKiBBdXRvbWF0aWMgYWZ0ZXIgYSBkZWxheS5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTYXZlUmVhc29uLkFmdGVyRGVsYXkgPSAyO1xuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIGVkaXRvciBsb3N0IGZvY3VzLlxuICAgICAqL1xuICAgIFRleHREb2N1bWVudFNhdmVSZWFzb24uRm9jdXNPdXQgPSAzO1xufSkoVGV4dERvY3VtZW50U2F2ZVJlYXNvbiB8fCAoZXhwb3J0cy5UZXh0RG9jdW1lbnRTYXZlUmVhc29uID0gVGV4dERvY3VtZW50U2F2ZVJlYXNvbiA9IHt9KSk7XG4vKipcbiAqIEEgZG9jdW1lbnQgd2lsbCBzYXZlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIGJlZm9yZVxuICogdGhlIGRvY3VtZW50IGlzIGFjdHVhbGx5IHNhdmVkLlxuICovXG52YXIgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFdpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC93aWxsU2F2ZSc7XG4gICAgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKFdpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShXaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5XaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IFdpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogQSBkb2N1bWVudCB3aWxsIHNhdmUgcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIGJlZm9yZVxuICogdGhlIGRvY3VtZW50IGlzIGFjdHVhbGx5IHNhdmVkLiBUaGUgcmVxdWVzdCBjYW4gcmV0dXJuIGFuIGFycmF5IG9mIFRleHRFZGl0c1xuICogd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSB0ZXh0IGRvY3VtZW50IGJlZm9yZSBpdCBpcyBzYXZlZC4gUGxlYXNlIG5vdGUgdGhhdFxuICogY2xpZW50cyBtaWdodCBkcm9wIHJlc3VsdHMgaWYgY29tcHV0aW5nIHRoZSB0ZXh0IGVkaXRzIHRvb2sgdG9vIGxvbmcgb3IgaWYgYVxuICogc2VydmVyIGNvbnN0YW50bHkgZmFpbHMgb24gdGhpcyByZXF1ZXN0LiBUaGlzIGlzIGRvbmUgdG8ga2VlcCB0aGUgc2F2ZSBmYXN0IGFuZFxuICogcmVsaWFibGUuXG4gKi9cbnZhciBXaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3Q7XG4oZnVuY3Rpb24gKFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdCkge1xuICAgIFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3dpbGxTYXZlV2FpdFVudGlsJztcbiAgICBXaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0Lm1ldGhvZCk7XG59KShXaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3QgfHwgKGV4cG9ydHMuV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0ID0gV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIHdhdGNoZWQgZmlsZXMgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgd2hlblxuICogdGhlIGNsaWVudCBkZXRlY3RzIGNoYW5nZXMgdG8gZmlsZSB3YXRjaGVkIGJ5IHRoZSBsYW5ndWFnZSBjbGllbnQuXG4gKi9cbnZhciBEaWRDaGFuZ2VXYXRjaGVkRmlsZXNOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QgPSAnd29ya3NwYWNlL2RpZENoYW5nZVdhdGNoZWRGaWxlcyc7XG4gICAgRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShEaWRDaGFuZ2VXYXRjaGVkRmlsZXNOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uID0gRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGZpbGUgZXZlbnQgdHlwZVxuICovXG52YXIgRmlsZUNoYW5nZVR5cGU7XG4oZnVuY3Rpb24gKEZpbGVDaGFuZ2VUeXBlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGNyZWF0ZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuQ3JlYXRlZCA9IDE7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGNoYW5nZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuQ2hhbmdlZCA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGRlbGV0ZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuRGVsZXRlZCA9IDM7XG59KShGaWxlQ2hhbmdlVHlwZSB8fCAoZXhwb3J0cy5GaWxlQ2hhbmdlVHlwZSA9IEZpbGVDaGFuZ2VUeXBlID0ge30pKTtcbnZhciBSZWxhdGl2ZVBhdHRlcm47XG4oZnVuY3Rpb24gKFJlbGF0aXZlUGF0dGVybikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmICh2c2NvZGVfbGFuZ3VhZ2VzZXJ2ZXJfdHlwZXNfMS5VUkkuaXMoY2FuZGlkYXRlLmJhc2VVcmkpIHx8IHZzY29kZV9sYW5ndWFnZXNlcnZlcl90eXBlc18xLldvcmtzcGFjZUZvbGRlci5pcyhjYW5kaWRhdGUuYmFzZVVyaSkpICYmIElzLnN0cmluZyhjYW5kaWRhdGUucGF0dGVybik7XG4gICAgfVxuICAgIFJlbGF0aXZlUGF0dGVybi5pcyA9IGlzO1xufSkoUmVsYXRpdmVQYXR0ZXJuIHx8IChleHBvcnRzLlJlbGF0aXZlUGF0dGVybiA9IFJlbGF0aXZlUGF0dGVybiA9IHt9KSk7XG52YXIgV2F0Y2hLaW5kO1xuKGZ1bmN0aW9uIChXYXRjaEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBJbnRlcmVzdGVkIGluIGNyZWF0ZSBldmVudHMuXG4gICAgICovXG4gICAgV2F0Y2hLaW5kLkNyZWF0ZSA9IDE7XG4gICAgLyoqXG4gICAgICogSW50ZXJlc3RlZCBpbiBjaGFuZ2UgZXZlbnRzXG4gICAgICovXG4gICAgV2F0Y2hLaW5kLkNoYW5nZSA9IDI7XG4gICAgLyoqXG4gICAgICogSW50ZXJlc3RlZCBpbiBkZWxldGUgZXZlbnRzXG4gICAgICovXG4gICAgV2F0Y2hLaW5kLkRlbGV0ZSA9IDQ7XG59KShXYXRjaEtpbmQgfHwgKGV4cG9ydHMuV2F0Y2hLaW5kID0gV2F0Y2hLaW5kID0ge30pKTtcbi8qKlxuICogRGlhZ25vc3RpY3Mgbm90aWZpY2F0aW9uIGFyZSBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIHNpZ25hbFxuICogcmVzdWx0cyBvZiB2YWxpZGF0aW9uIHJ1bnMuXG4gKi9cbnZhciBQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbikge1xuICAgIFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbi5tZXRob2QgPSAndGV4dERvY3VtZW50L3B1Ymxpc2hEaWFnbm9zdGljcyc7XG4gICAgUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uID0gUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogSG93IGEgY29tcGxldGlvbiB3YXMgdHJpZ2dlcmVkXG4gKi9cbnZhciBDb21wbGV0aW9uVHJpZ2dlcktpbmQ7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25UcmlnZ2VyS2luZCkge1xuICAgIC8qKlxuICAgICAqIENvbXBsZXRpb24gd2FzIHRyaWdnZXJlZCBieSB0eXBpbmcgYW4gaWRlbnRpZmllciAoMjR4NyBjb2RlXG4gICAgICogY29tcGxldGUpLCBtYW51YWwgaW52b2NhdGlvbiAoZS5nIEN0cmwrU3BhY2UpIG9yIHZpYSBBUEkuXG4gICAgICovXG4gICAgQ29tcGxldGlvblRyaWdnZXJLaW5kLkludm9rZWQgPSAxO1xuICAgIC8qKlxuICAgICAqIENvbXBsZXRpb24gd2FzIHRyaWdnZXJlZCBieSBhIHRyaWdnZXIgY2hhcmFjdGVyIHNwZWNpZmllZCBieVxuICAgICAqIHRoZSBgdHJpZ2dlckNoYXJhY3RlcnNgIHByb3BlcnRpZXMgb2YgdGhlIGBDb21wbGV0aW9uUmVnaXN0cmF0aW9uT3B0aW9uc2AuXG4gICAgICovXG4gICAgQ29tcGxldGlvblRyaWdnZXJLaW5kLlRyaWdnZXJDaGFyYWN0ZXIgPSAyO1xuICAgIC8qKlxuICAgICAqIENvbXBsZXRpb24gd2FzIHJlLXRyaWdnZXJlZCBhcyBjdXJyZW50IGNvbXBsZXRpb24gbGlzdCBpcyBpbmNvbXBsZXRlXG4gICAgICovXG4gICAgQ29tcGxldGlvblRyaWdnZXJLaW5kLlRyaWdnZXJGb3JJbmNvbXBsZXRlQ29tcGxldGlvbnMgPSAzO1xufSkoQ29tcGxldGlvblRyaWdnZXJLaW5kIHx8IChleHBvcnRzLkNvbXBsZXRpb25UcmlnZ2VyS2luZCA9IENvbXBsZXRpb25UcmlnZ2VyS2luZCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVxdWVzdCBjb21wbGV0aW9uIGF0IGEgZ2l2ZW4gdGV4dCBkb2N1bWVudCBwb3NpdGlvbi4gVGhlIHJlcXVlc3Qnc1xuICogcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIFRleHREb2N1bWVudFBvc2l0aW9ufSB0aGUgcmVzcG9uc2VcbiAqIGlzIG9mIHR5cGUge0BsaW5rIENvbXBsZXRpb25JdGVtIENvbXBsZXRpb25JdGVtW119IG9yIHtAbGluayBDb21wbGV0aW9uTGlzdH1cbiAqIG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICpcbiAqIFRoZSByZXF1ZXN0IGNhbiBkZWxheSB0aGUgY29tcHV0YXRpb24gb2YgdGhlIHtAbGluayBDb21wbGV0aW9uSXRlbS5kZXRhaWwgYGRldGFpbGB9XG4gKiBhbmQge0BsaW5rIENvbXBsZXRpb25JdGVtLmRvY3VtZW50YXRpb24gYGRvY3VtZW50YXRpb25gfSBwcm9wZXJ0aWVzIHRvIHRoZSBgY29tcGxldGlvbkl0ZW0vcmVzb2x2ZWBcbiAqIHJlcXVlc3QuIEhvd2V2ZXIsIHByb3BlcnRpZXMgdGhhdCBhcmUgbmVlZGVkIGZvciB0aGUgaW5pdGlhbCBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcsIGxpa2UgYHNvcnRUZXh0YCxcbiAqIGBmaWx0ZXJUZXh0YCwgYGluc2VydFRleHRgLCBhbmQgYHRleHRFZGl0YCwgbXVzdCBub3QgYmUgY2hhbmdlZCBkdXJpbmcgcmVzb2x2ZS5cbiAqL1xudmFyIENvbXBsZXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uUmVxdWVzdCkge1xuICAgIENvbXBsZXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvY29tcGxldGlvbic7XG4gICAgQ29tcGxldGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBDb21wbGV0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb21wbGV0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoQ29tcGxldGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuQ29tcGxldGlvblJlcXVlc3QgPSBDb21wbGV0aW9uUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVzb2x2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciBhIGdpdmVuIGNvbXBsZXRpb24gaXRlbS5UaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgQ29tcGxldGlvbkl0ZW19IHRoZSByZXNwb25zZVxuICogaXMgb2YgdHlwZSB7QGxpbmsgQ29tcGxldGlvbkl0ZW19IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kID0gJ2NvbXBsZXRpb25JdGVtL3Jlc29sdmUnO1xuICAgIENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCB8fCAoZXhwb3J0cy5Db21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QgPSBDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBSZXF1ZXN0IHRvIHJlcXVlc3QgaG92ZXIgaW5mb3JtYXRpb24gYXQgYSBnaXZlbiB0ZXh0IGRvY3VtZW50IHBvc2l0aW9uLiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgVGV4dERvY3VtZW50UG9zaXRpb259IHRoZSByZXNwb25zZSBpcyBvZlxuICogdHlwZSB7QGxpbmsgSG92ZXJ9IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgSG92ZXJSZXF1ZXN0O1xuKGZ1bmN0aW9uIChIb3ZlclJlcXVlc3QpIHtcbiAgICBIb3ZlclJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9ob3Zlcic7XG4gICAgSG92ZXJSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgSG92ZXJSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKEhvdmVyUmVxdWVzdC5tZXRob2QpO1xufSkoSG92ZXJSZXF1ZXN0IHx8IChleHBvcnRzLkhvdmVyUmVxdWVzdCA9IEhvdmVyUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEhvdyBhIHNpZ25hdHVyZSBoZWxwIHdhcyB0cmlnZ2VyZWQuXG4gKlxuICogQHNpbmNlIDMuMTUuMFxuICovXG52YXIgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kO1xuKGZ1bmN0aW9uIChTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQpIHtcbiAgICAvKipcbiAgICAgKiBTaWduYXR1cmUgaGVscCB3YXMgaW52b2tlZCBtYW51YWxseSBieSB0aGUgdXNlciBvciBieSBhIGNvbW1hbmQuXG4gICAgICovXG4gICAgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kLkludm9rZWQgPSAxO1xuICAgIC8qKlxuICAgICAqIFNpZ25hdHVyZSBoZWxwIHdhcyB0cmlnZ2VyZWQgYnkgYSB0cmlnZ2VyIGNoYXJhY3Rlci5cbiAgICAgKi9cbiAgICBTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQuVHJpZ2dlckNoYXJhY3RlciA9IDI7XG4gICAgLyoqXG4gICAgICogU2lnbmF0dXJlIGhlbHAgd2FzIHRyaWdnZXJlZCBieSB0aGUgY3Vyc29yIG1vdmluZyBvciBieSB0aGUgZG9jdW1lbnQgY29udGVudCBjaGFuZ2luZy5cbiAgICAgKi9cbiAgICBTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQuQ29udGVudENoYW5nZSA9IDM7XG59KShTaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQgfHwgKGV4cG9ydHMuU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kID0gU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kID0ge30pKTtcbnZhciBTaWduYXR1cmVIZWxwUmVxdWVzdDtcbihmdW5jdGlvbiAoU2lnbmF0dXJlSGVscFJlcXVlc3QpIHtcbiAgICBTaWduYXR1cmVIZWxwUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NpZ25hdHVyZUhlbHAnO1xuICAgIFNpZ25hdHVyZUhlbHBSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgU2lnbmF0dXJlSGVscFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoU2lnbmF0dXJlSGVscFJlcXVlc3QubWV0aG9kKTtcbn0pKFNpZ25hdHVyZUhlbHBSZXF1ZXN0IHx8IChleHBvcnRzLlNpZ25hdHVyZUhlbHBSZXF1ZXN0ID0gU2lnbmF0dXJlSGVscFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSB0aGUgZGVmaW5pdGlvbiBsb2NhdGlvbiBvZiBhIHN5bWJvbCBhdCBhIGdpdmVuIHRleHRcbiAqIGRvY3VtZW50IHBvc2l0aW9uLiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBUZXh0RG9jdW1lbnRQb3NpdGlvbn1cbiAqIHRoZSByZXNwb25zZSBpcyBvZiBlaXRoZXIgdHlwZSB7QGxpbmsgRGVmaW5pdGlvbn0gb3IgYSB0eXBlZCBhcnJheSBvZlxuICoge0BsaW5rIERlZmluaXRpb25MaW5rfSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIERlZmluaXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChEZWZpbml0aW9uUmVxdWVzdCkge1xuICAgIERlZmluaXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvZGVmaW5pdGlvbic7XG4gICAgRGVmaW5pdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEZWZpbml0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEZWZpbml0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoRGVmaW5pdGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuRGVmaW5pdGlvblJlcXVlc3QgPSBEZWZpbml0aW9uUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHByb2plY3Qtd2lkZSByZWZlcmVuY2VzIGZvciB0aGUgc3ltYm9sIGRlbm90ZWRcbiAqIGJ5IHRoZSBnaXZlbiB0ZXh0IGRvY3VtZW50IHBvc2l0aW9uLiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZlxuICogdHlwZSB7QGxpbmsgUmVmZXJlbmNlUGFyYW1zfSB0aGUgcmVzcG9uc2UgaXMgb2YgdHlwZVxuICoge0BsaW5rIExvY2F0aW9uIExvY2F0aW9uW119IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgUmVmZXJlbmNlc1JlcXVlc3Q7XG4oZnVuY3Rpb24gKFJlZmVyZW5jZXNSZXF1ZXN0KSB7XG4gICAgUmVmZXJlbmNlc1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9yZWZlcmVuY2VzJztcbiAgICBSZWZlcmVuY2VzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFJlZmVyZW5jZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFJlZmVyZW5jZXNSZXF1ZXN0Lm1ldGhvZCk7XG59KShSZWZlcmVuY2VzUmVxdWVzdCB8fCAoZXhwb3J0cy5SZWZlcmVuY2VzUmVxdWVzdCA9IFJlZmVyZW5jZXNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogUmVxdWVzdCB0byByZXNvbHZlIGEge0BsaW5rIERvY3VtZW50SGlnaGxpZ2h0fSBmb3IgYSBnaXZlblxuICogdGV4dCBkb2N1bWVudCBwb3NpdGlvbi4gVGhlIHJlcXVlc3QncyBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgVGV4dERvY3VtZW50UG9zaXRpb259XG4gKiB0aGUgcmVxdWVzdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiB0eXBlIHtAbGluayBEb2N1bWVudEhpZ2hsaWdodH1cbiAqIG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodFJlcXVlc3QpIHtcbiAgICBEb2N1bWVudEhpZ2hsaWdodFJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudEhpZ2hsaWdodCc7XG4gICAgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50SGlnaGxpZ2h0UmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50SGlnaGxpZ2h0UmVxdWVzdCA9IERvY3VtZW50SGlnaGxpZ2h0UmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBsaXN0IGFsbCBzeW1ib2xzIGZvdW5kIGluIGEgZ2l2ZW4gdGV4dCBkb2N1bWVudC4gVGhlIHJlcXVlc3Qnc1xuICogcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIFRleHREb2N1bWVudElkZW50aWZpZXJ9IHRoZVxuICogcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgU3ltYm9sSW5mb3JtYXRpb24gU3ltYm9sSW5mb3JtYXRpb25bXX0gb3IgYSBUaGVuYWJsZVxuICogdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgRG9jdW1lbnRTeW1ib2xSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudFN5bWJvbFJlcXVlc3QpIHtcbiAgICBEb2N1bWVudFN5bWJvbFJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudFN5bWJvbCc7XG4gICAgRG9jdW1lbnRTeW1ib2xSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRTeW1ib2xSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50U3ltYm9sUmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRTeW1ib2xSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50U3ltYm9sUmVxdWVzdCA9IERvY3VtZW50U3ltYm9sUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGNvbW1hbmRzIGZvciB0aGUgZ2l2ZW4gdGV4dCBkb2N1bWVudCBhbmQgcmFuZ2UuXG4gKi9cbnZhciBDb2RlQWN0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29kZUFjdGlvblJlcXVlc3QpIHtcbiAgICBDb2RlQWN0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2NvZGVBY3Rpb24nO1xuICAgIENvZGVBY3Rpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgQ29kZUFjdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29kZUFjdGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKENvZGVBY3Rpb25SZXF1ZXN0IHx8IChleHBvcnRzLkNvZGVBY3Rpb25SZXF1ZXN0ID0gQ29kZUFjdGlvblJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBSZXF1ZXN0IHRvIHJlc29sdmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgYSBnaXZlbiBjb2RlIGFjdGlvbi5UaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgQ29kZUFjdGlvbn0gdGhlIHJlc3BvbnNlXG4gKiBpcyBvZiB0eXBlIHtAbGluayBDb2RlQWN0aW9ufSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29kZUFjdGlvblJlc29sdmVSZXF1ZXN0KSB7XG4gICAgQ29kZUFjdGlvblJlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICdjb2RlQWN0aW9uL3Jlc29sdmUnO1xuICAgIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb2RlQWN0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdCB8fCAoZXhwb3J0cy5Db2RlQWN0aW9uUmVzb2x2ZVJlcXVlc3QgPSBDb2RlQWN0aW9uUmVzb2x2ZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gbGlzdCBwcm9qZWN0LXdpZGUgc3ltYm9scyBtYXRjaGluZyB0aGUgcXVlcnkgc3RyaW5nIGdpdmVuXG4gKiBieSB0aGUge0BsaW5rIFdvcmtzcGFjZVN5bWJvbFBhcmFtc30uIFRoZSByZXNwb25zZSBpc1xuICogb2YgdHlwZSB7QGxpbmsgU3ltYm9sSW5mb3JtYXRpb24gU3ltYm9sSW5mb3JtYXRpb25bXX0gb3IgYSBUaGVuYWJsZSB0aGF0XG4gKiByZXNvbHZlcyB0byBzdWNoLlxuICpcbiAqIEBzaW5jZSAzLjE3LjAgLSBzdXBwb3J0IGZvciBXb3Jrc3BhY2VTeW1ib2wgaW4gdGhlIHJldHVybmVkIGRhdGEuIENsaWVudHNcbiAqICBuZWVkIHRvIGFkdmVydGlzZSBzdXBwb3J0IGZvciBXb3Jrc3BhY2VTeW1ib2xzIHZpYSB0aGUgY2xpZW50IGNhcGFiaWxpdHlcbiAqICBgd29ya3NwYWNlLnN5bWJvbC5yZXNvbHZlU3VwcG9ydGAuXG4gKlxuICovXG52YXIgV29ya3NwYWNlU3ltYm9sUmVxdWVzdDtcbihmdW5jdGlvbiAoV29ya3NwYWNlU3ltYm9sUmVxdWVzdCkge1xuICAgIFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS9zeW1ib2wnO1xuICAgIFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXb3Jrc3BhY2VTeW1ib2xSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QubWV0aG9kKTtcbn0pKFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QgfHwgKGV4cG9ydHMuV29ya3NwYWNlU3ltYm9sUmVxdWVzdCA9IFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSB0aGUgcmFuZ2UgaW5zaWRlIHRoZSB3b3Jrc3BhY2VcbiAqIHN5bWJvbCdzIGxvY2F0aW9uLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFdvcmtzcGFjZVN5bWJvbFJlc29sdmVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdCkge1xuICAgIFdvcmtzcGFjZVN5bWJvbFJlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICd3b3Jrc3BhY2VTeW1ib2wvcmVzb2x2ZSc7XG4gICAgV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdC5tZXRob2QpO1xufSkoV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QgfHwgKGV4cG9ydHMuV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QgPSBXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGNvZGUgbGVucyBmb3IgdGhlIGdpdmVuIHRleHQgZG9jdW1lbnQuXG4gKi9cbnZhciBDb2RlTGVuc1JlcXVlc3Q7XG4oZnVuY3Rpb24gKENvZGVMZW5zUmVxdWVzdCkge1xuICAgIENvZGVMZW5zUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2NvZGVMZW5zJztcbiAgICBDb2RlTGVuc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBDb2RlTGVuc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29kZUxlbnNSZXF1ZXN0Lm1ldGhvZCk7XG59KShDb2RlTGVuc1JlcXVlc3QgfHwgKGV4cG9ydHMuQ29kZUxlbnNSZXF1ZXN0ID0gQ29kZUxlbnNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgYSBjb21tYW5kIGZvciBhIGdpdmVuIGNvZGUgbGVucy5cbiAqL1xudmFyIENvZGVMZW5zUmVzb2x2ZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKENvZGVMZW5zUmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICdjb2RlTGVucy9yZXNvbHZlJztcbiAgICBDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgQ29kZUxlbnNSZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0Lm1ldGhvZCk7XG59KShDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLkNvZGVMZW5zUmVzb2x2ZVJlcXVlc3QgPSBDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlZnJlc2ggYWxsIGNvZGUgYWN0aW9uc1xuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIENvZGVMZW5zUmVmcmVzaFJlcXVlc3Q7XG4oZnVuY3Rpb24gKENvZGVMZW5zUmVmcmVzaFJlcXVlc3QpIHtcbiAgICBDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0Lm1ldGhvZCA9IGB3b3Jrc3BhY2UvY29kZUxlbnMvcmVmcmVzaGA7XG4gICAgQ29kZUxlbnNSZWZyZXNoUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIENvZGVMZW5zUmVmcmVzaFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUwKENvZGVMZW5zUmVmcmVzaFJlcXVlc3QubWV0aG9kKTtcbn0pKENvZGVMZW5zUmVmcmVzaFJlcXVlc3QgfHwgKGV4cG9ydHMuQ29kZUxlbnNSZWZyZXNoUmVxdWVzdCA9IENvZGVMZW5zUmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBkb2N1bWVudCBsaW5rc1xuICovXG52YXIgRG9jdW1lbnRMaW5rUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRMaW5rUmVxdWVzdCkge1xuICAgIERvY3VtZW50TGlua1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudExpbmsnO1xuICAgIERvY3VtZW50TGlua1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudExpbmtSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50TGlua1JlcXVlc3QubWV0aG9kKTtcbn0pKERvY3VtZW50TGlua1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRMaW5rUmVxdWVzdCA9IERvY3VtZW50TGlua1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBSZXF1ZXN0IHRvIHJlc29sdmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgYSBnaXZlbiBkb2N1bWVudCBsaW5rLiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgRG9jdW1lbnRMaW5rfSB0aGUgcmVzcG9uc2VcbiAqIGlzIG9mIHR5cGUge0BsaW5rIERvY3VtZW50TGlua30gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBEb2N1bWVudExpbmtSZXNvbHZlUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBEb2N1bWVudExpbmtSZXNvbHZlUmVxdWVzdC5tZXRob2QgPSAnZG9jdW1lbnRMaW5rL3Jlc29sdmUnO1xuICAgIERvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKERvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0ID0gRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gZm9ybWF0IGEgd2hvbGUgZG9jdW1lbnQuXG4gKi9cbnZhciBEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2Zvcm1hdHRpbmcnO1xuICAgIERvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QubWV0aG9kKTtcbn0pKERvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdCA9IERvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gZm9ybWF0IGEgcmFuZ2UgaW4gYSBkb2N1bWVudC5cbiAqL1xudmFyIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcmFuZ2VGb3JtYXR0aW5nJztcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0ID0gRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIGZvcm1hdCByYW5nZXMgaW4gYSBkb2N1bWVudC5cbiAqXG4gKiBAc2luY2UgMy4xOC4wXG4gKiBAcHJvcG9zZWRcbiAqL1xudmFyIERvY3VtZW50UmFuZ2VzRm9ybWF0dGluZ1JlcXVlc3Q7XG4oZnVuY3Rpb24gKERvY3VtZW50UmFuZ2VzRm9ybWF0dGluZ1JlcXVlc3QpIHtcbiAgICBEb2N1bWVudFJhbmdlc0Zvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcmFuZ2VzRm9ybWF0dGluZyc7XG4gICAgRG9jdW1lbnRSYW5nZXNGb3JtYXR0aW5nUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERvY3VtZW50UmFuZ2VzRm9ybWF0dGluZ1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRSYW5nZXNGb3JtYXR0aW5nUmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRSYW5nZXNGb3JtYXR0aW5nUmVxdWVzdCB8fCAoZXhwb3J0cy5Eb2N1bWVudFJhbmdlc0Zvcm1hdHRpbmdSZXF1ZXN0ID0gRG9jdW1lbnRSYW5nZXNGb3JtYXR0aW5nUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBmb3JtYXQgYSBkb2N1bWVudCBvbiB0eXBlLlxuICovXG52YXIgRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdCkge1xuICAgIERvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9vblR5cGVGb3JtYXR0aW5nJztcbiAgICBEb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QgPSBEb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0ID0ge30pKTtcbi8vLS0tLSBSZW5hbWUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudmFyIFByZXBhcmVTdXBwb3J0RGVmYXVsdEJlaGF2aW9yO1xuKGZ1bmN0aW9uIChQcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQncyBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHNlbGVjdCB0aGUgaWRlbnRpZmllclxuICAgICAqIGFjY29yZGluZyB0aGUgdG8gbGFuZ3VhZ2UncyBzeW50YXggcnVsZS5cbiAgICAgKi9cbiAgICBQcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvci5JZGVudGlmaWVyID0gMTtcbn0pKFByZXBhcmVTdXBwb3J0RGVmYXVsdEJlaGF2aW9yIHx8IChleHBvcnRzLlByZXBhcmVTdXBwb3J0RGVmYXVsdEJlaGF2aW9yID0gUHJlcGFyZVN1cHBvcnREZWZhdWx0QmVoYXZpb3IgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVuYW1lIGEgc3ltYm9sLlxuICovXG52YXIgUmVuYW1lUmVxdWVzdDtcbihmdW5jdGlvbiAoUmVuYW1lUmVxdWVzdCkge1xuICAgIFJlbmFtZVJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9yZW5hbWUnO1xuICAgIFJlbmFtZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBSZW5hbWVSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFJlbmFtZVJlcXVlc3QubWV0aG9kKTtcbn0pKFJlbmFtZVJlcXVlc3QgfHwgKGV4cG9ydHMuUmVuYW1lUmVxdWVzdCA9IFJlbmFtZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gdGVzdCBhbmQgcGVyZm9ybSB0aGUgc2V0dXAgbmVjZXNzYXJ5IGZvciBhIHJlbmFtZS5cbiAqXG4gKiBAc2luY2UgMy4xNiAtIHN1cHBvcnQgZm9yIGRlZmF1bHQgYmVoYXZpb3JcbiAqL1xudmFyIFByZXBhcmVSZW5hbWVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChQcmVwYXJlUmVuYW1lUmVxdWVzdCkge1xuICAgIFByZXBhcmVSZW5hbWVSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcHJlcGFyZVJlbmFtZSc7XG4gICAgUHJlcGFyZVJlbmFtZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBQcmVwYXJlUmVuYW1lUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShQcmVwYXJlUmVuYW1lUmVxdWVzdC5tZXRob2QpO1xufSkoUHJlcGFyZVJlbmFtZVJlcXVlc3QgfHwgKGV4cG9ydHMuUHJlcGFyZVJlbmFtZVJlcXVlc3QgPSBQcmVwYXJlUmVuYW1lUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCBzZW5kIGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHRvIGV4ZWN1dGUgYSBjb21tYW5kLiBUaGUgcmVxdWVzdCBtaWdodCByZXR1cm5cbiAqIGEgd29ya3NwYWNlIGVkaXQgd2hpY2ggdGhlIGNsaWVudCB3aWxsIGFwcGx5IHRvIHRoZSB3b3Jrc3BhY2UuXG4gKi9cbnZhciBFeGVjdXRlQ29tbWFuZFJlcXVlc3Q7XG4oZnVuY3Rpb24gKEV4ZWN1dGVDb21tYW5kUmVxdWVzdCkge1xuICAgIEV4ZWN1dGVDb21tYW5kUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL2V4ZWN1dGVDb21tYW5kJztcbiAgICBFeGVjdXRlQ29tbWFuZFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBFeGVjdXRlQ29tbWFuZFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0Lm1ldGhvZCk7XG59KShFeGVjdXRlQ29tbWFuZFJlcXVlc3QgfHwgKGV4cG9ydHMuRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0ID0gRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gbW9kaWZpZWQgY2VydGFpbiByZXNvdXJjZXMuXG4gKi9cbnZhciBBcHBseVdvcmtzcGFjZUVkaXRSZXF1ZXN0O1xuKGZ1bmN0aW9uIChBcHBseVdvcmtzcGFjZUVkaXRSZXF1ZXN0KSB7XG4gICAgQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL2FwcGx5RWRpdCc7XG4gICAgQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIEFwcGx5V29ya3NwYWNlRWRpdFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoJ3dvcmtzcGFjZS9hcHBseUVkaXQnKTtcbn0pKEFwcGx5V29ya3NwYWNlRWRpdFJlcXVlc3QgfHwgKGV4cG9ydHMuQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdCA9IEFwcGx5V29ya3NwYWNlRWRpdFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHByb3ZpZGUgcmFuZ2VzIHRoYXQgY2FuIGJlIGVkaXRlZCB0b2dldGhlci5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBMaW5rZWRFZGl0aW5nUmFuZ2VSZXF1ZXN0O1xuKGZ1bmN0aW9uIChMaW5rZWRFZGl0aW5nUmFuZ2VSZXF1ZXN0KSB7XG4gICAgTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2xpbmtlZEVkaXRpbmdSYW5nZSc7XG4gICAgTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIExpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdC5tZXRob2QpO1xufSkoTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCB8fCAoZXhwb3J0cy5MaW5rZWRFZGl0aW5nUmFuZ2VSZXF1ZXN0ID0gTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTW9uaWtlclJlcXVlc3QgPSBleHBvcnRzLk1vbmlrZXJLaW5kID0gZXhwb3J0cy5VbmlxdWVuZXNzTGV2ZWwgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIE1vbmlrZXIgdW5pcXVlbmVzcyBsZXZlbCB0byBkZWZpbmUgc2NvcGUgb2YgdGhlIG1vbmlrZXIuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgVW5pcXVlbmVzc0xldmVsO1xuKGZ1bmN0aW9uIChVbmlxdWVuZXNzTGV2ZWwpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciBpcyBvbmx5IHVuaXF1ZSBpbnNpZGUgYSBkb2N1bWVudFxuICAgICAqL1xuICAgIFVuaXF1ZW5lc3NMZXZlbC5kb2N1bWVudCA9ICdkb2N1bWVudCc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgaXMgdW5pcXVlIGluc2lkZSBhIHByb2plY3QgZm9yIHdoaWNoIGEgZHVtcCBnb3QgY3JlYXRlZFxuICAgICAqL1xuICAgIFVuaXF1ZW5lc3NMZXZlbC5wcm9qZWN0ID0gJ3Byb2plY3QnO1xuICAgIC8qKlxuICAgICAqIFRoZSBtb25pa2VyIGlzIHVuaXF1ZSBpbnNpZGUgdGhlIGdyb3VwIHRvIHdoaWNoIGEgcHJvamVjdCBiZWxvbmdzXG4gICAgICovXG4gICAgVW5pcXVlbmVzc0xldmVsLmdyb3VwID0gJ2dyb3VwJztcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciBpcyB1bmlxdWUgaW5zaWRlIHRoZSBtb25pa2VyIHNjaGVtZS5cbiAgICAgKi9cbiAgICBVbmlxdWVuZXNzTGV2ZWwuc2NoZW1lID0gJ3NjaGVtZSc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgaXMgZ2xvYmFsbHkgdW5pcXVlXG4gICAgICovXG4gICAgVW5pcXVlbmVzc0xldmVsLmdsb2JhbCA9ICdnbG9iYWwnO1xufSkoVW5pcXVlbmVzc0xldmVsIHx8IChleHBvcnRzLlVuaXF1ZW5lc3NMZXZlbCA9IFVuaXF1ZW5lc3NMZXZlbCA9IHt9KSk7XG4vKipcbiAqIFRoZSBtb25pa2VyIGtpbmQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgTW9uaWtlcktpbmQ7XG4oZnVuY3Rpb24gKE1vbmlrZXJLaW5kKSB7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgcmVwcmVzZW50IGEgc3ltYm9sIHRoYXQgaXMgaW1wb3J0ZWQgaW50byBhIHByb2plY3RcbiAgICAgKi9cbiAgICBNb25pa2VyS2luZC4kaW1wb3J0ID0gJ2ltcG9ydCc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgcmVwcmVzZW50cyBhIHN5bWJvbCB0aGF0IGlzIGV4cG9ydGVkIGZyb20gYSBwcm9qZWN0XG4gICAgICovXG4gICAgTW9uaWtlcktpbmQuJGV4cG9ydCA9ICdleHBvcnQnO1xuICAgIC8qKlxuICAgICAqIFRoZSBtb25pa2VyIHJlcHJlc2VudHMgYSBzeW1ib2wgdGhhdCBpcyBsb2NhbCB0byBhIHByb2plY3QgKGUuZy4gYSBsb2NhbFxuICAgICAqIHZhcmlhYmxlIG9mIGEgZnVuY3Rpb24sIGEgY2xhc3Mgbm90IHZpc2libGUgb3V0c2lkZSB0aGUgcHJvamVjdCwgLi4uKVxuICAgICAqL1xuICAgIE1vbmlrZXJLaW5kLmxvY2FsID0gJ2xvY2FsJztcbn0pKE1vbmlrZXJLaW5kIHx8IChleHBvcnRzLk1vbmlrZXJLaW5kID0gTW9uaWtlcktpbmQgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gZ2V0IHRoZSBtb25pa2VyIG9mIGEgc3ltYm9sIGF0IGEgZ2l2ZW4gdGV4dCBkb2N1bWVudCBwb3NpdGlvbi5cbiAqIFRoZSByZXF1ZXN0IHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBUZXh0RG9jdW1lbnRQb3NpdGlvblBhcmFtc30uXG4gKiBUaGUgcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgTW9uaWtlciBNb25pa2VyW119IG9yIGBudWxsYC5cbiAqL1xudmFyIE1vbmlrZXJSZXF1ZXN0O1xuKGZ1bmN0aW9uIChNb25pa2VyUmVxdWVzdCkge1xuICAgIE1vbmlrZXJSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvbW9uaWtlcic7XG4gICAgTW9uaWtlclJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBNb25pa2VyUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShNb25pa2VyUmVxdWVzdC5tZXRob2QpO1xufSkoTW9uaWtlclJlcXVlc3QgfHwgKGV4cG9ydHMuTW9uaWtlclJlcXVlc3QgPSBNb25pa2VyUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2UgPSBleHBvcnRzLkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLk5vdGVib29rRG9jdW1lbnQgPSBleHBvcnRzLk5vdGVib29rQ2VsbCA9IGV4cG9ydHMuRXhlY3V0aW9uU3VtbWFyeSA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsS2luZCA9IHZvaWQgMDtcbmNvbnN0IHZzY29kZV9sYW5ndWFnZXNlcnZlcl90eXBlc18xID0gcmVxdWlyZShcInZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlc1wiKTtcbmNvbnN0IElzID0gcmVxdWlyZShcIi4vdXRpbHMvaXNcIik7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgbm90ZWJvb2sgY2VsbCBraW5kLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIE5vdGVib29rQ2VsbEtpbmQ7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBIG1hcmt1cC1jZWxsIGlzIGZvcm1hdHRlZCBzb3VyY2UgdGhhdCBpcyB1c2VkIGZvciBkaXNwbGF5LlxuICAgICAqL1xuICAgIE5vdGVib29rQ2VsbEtpbmQuTWFya3VwID0gMTtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUtY2VsbCBpcyBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBOb3RlYm9va0NlbGxLaW5kLkNvZGUgPSAyO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gMjtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsS2luZC5pcyA9IGlzO1xufSkoTm90ZWJvb2tDZWxsS2luZCB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGxLaW5kID0gTm90ZWJvb2tDZWxsS2luZCA9IHt9KSk7XG52YXIgRXhlY3V0aW9uU3VtbWFyeTtcbihmdW5jdGlvbiAoRXhlY3V0aW9uU3VtbWFyeSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShleGVjdXRpb25PcmRlciwgc3VjY2Vzcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IGV4ZWN1dGlvbk9yZGVyIH07XG4gICAgICAgIGlmIChzdWNjZXNzID09PSB0cnVlIHx8IHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IHN1Y2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgRXhlY3V0aW9uU3VtbWFyeS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEudWludGVnZXIuaXMoY2FuZGlkYXRlLmV4ZWN1dGlvbk9yZGVyKSAmJiAoY2FuZGlkYXRlLnN1Y2Nlc3MgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5zdWNjZXNzKSk7XG4gICAgfVxuICAgIEV4ZWN1dGlvblN1bW1hcnkuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBlcXVhbHMob25lLCBvdGhlcikge1xuICAgICAgICBpZiAob25lID09PSBvdGhlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZSA9PT0gbnVsbCB8fCBvbmUgPT09IHVuZGVmaW5lZCB8fCBvdGhlciA9PT0gbnVsbCB8fCBvdGhlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9uZS5leGVjdXRpb25PcmRlciA9PT0gb3RoZXIuZXhlY3V0aW9uT3JkZXIgJiYgb25lLnN1Y2Nlc3MgPT09IG90aGVyLnN1Y2Nlc3M7XG4gICAgfVxuICAgIEV4ZWN1dGlvblN1bW1hcnkuZXF1YWxzID0gZXF1YWxzO1xufSkoRXhlY3V0aW9uU3VtbWFyeSB8fCAoZXhwb3J0cy5FeGVjdXRpb25TdW1tYXJ5ID0gRXhlY3V0aW9uU3VtbWFyeSA9IHt9KSk7XG52YXIgTm90ZWJvb2tDZWxsO1xuKGZ1bmN0aW9uIChOb3RlYm9va0NlbGwpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoa2luZCwgZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHsga2luZCwgZG9jdW1lbnQgfTtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBOb3RlYm9va0NlbGxLaW5kLmlzKGNhbmRpZGF0ZS5raW5kKSAmJiB2c2NvZGVfbGFuZ3VhZ2VzZXJ2ZXJfdHlwZXNfMS5Eb2N1bWVudFVyaS5pcyhjYW5kaWRhdGUuZG9jdW1lbnQpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLm1ldGFkYXRhID09PSB1bmRlZmluZWQgfHwgSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUubWV0YWRhdGEpKTtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gZGlmZihvbmUsIHR3bykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlmIChvbmUuZG9jdW1lbnQgIT09IHR3by5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmVzdWx0LmFkZCgnZG9jdW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lLmtpbmQgIT09IHR3by5raW5kKSB7XG4gICAgICAgICAgICByZXN1bHQuYWRkKCdraW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZS5leGVjdXRpb25TdW1tYXJ5ICE9PSB0d28uZXhlY3V0aW9uU3VtbWFyeSkge1xuICAgICAgICAgICAgcmVzdWx0LmFkZCgnZXhlY3V0aW9uU3VtbWFyeScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob25lLm1ldGFkYXRhICE9PSB1bmRlZmluZWQgfHwgdHdvLm1ldGFkYXRhICE9PSB1bmRlZmluZWQpICYmICFlcXVhbHNNZXRhZGF0YShvbmUubWV0YWRhdGEsIHR3by5tZXRhZGF0YSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hZGQoJ21ldGFkYXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChvbmUuZXhlY3V0aW9uU3VtbWFyeSAhPT0gdW5kZWZpbmVkIHx8IHR3by5leGVjdXRpb25TdW1tYXJ5ICE9PSB1bmRlZmluZWQpICYmICFFeGVjdXRpb25TdW1tYXJ5LmVxdWFscyhvbmUuZXhlY3V0aW9uU3VtbWFyeSwgdHdvLmV4ZWN1dGlvblN1bW1hcnkpKSB7XG4gICAgICAgICAgICByZXN1bHQuYWRkKCdleGVjdXRpb25TdW1tYXJ5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsLmRpZmYgPSBkaWZmO1xuICAgIGZ1bmN0aW9uIGVxdWFsc01ldGFkYXRhKG9uZSwgb3RoZXIpIHtcbiAgICAgICAgaWYgKG9uZSA9PT0gb3RoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmUgPT09IG51bGwgfHwgb25lID09PSB1bmRlZmluZWQgfHwgb3RoZXIgPT09IG51bGwgfHwgb3RoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb25lICE9PSB0eXBlb2Ygb3RoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9uZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbmVBcnJheSA9IEFycmF5LmlzQXJyYXkob25lKTtcbiAgICAgICAgY29uc3Qgb3RoZXJBcnJheSA9IEFycmF5LmlzQXJyYXkob3RoZXIpO1xuICAgICAgICBpZiAob25lQXJyYXkgIT09IG90aGVyQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lQXJyYXkgJiYgb3RoZXJBcnJheSkge1xuICAgICAgICAgICAgaWYgKG9uZS5sZW5ndGggIT09IG90aGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHNNZXRhZGF0YShvbmVbaV0sIG90aGVyW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5vYmplY3RMaXRlcmFsKG9uZSkgJiYgSXMub2JqZWN0TGl0ZXJhbChvdGhlcikpIHtcbiAgICAgICAgICAgIGNvbnN0IG9uZUtleXMgPSBPYmplY3Qua2V5cyhvbmUpO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJLZXlzID0gT2JqZWN0LmtleXMob3RoZXIpO1xuICAgICAgICAgICAgaWYgKG9uZUtleXMubGVuZ3RoICE9PSBvdGhlcktleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25lS2V5cy5zb3J0KCk7XG4gICAgICAgICAgICBvdGhlcktleXMuc29ydCgpO1xuICAgICAgICAgICAgaWYgKCFlcXVhbHNNZXRhZGF0YShvbmVLZXlzLCBvdGhlcktleXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbmVLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcCA9IG9uZUtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHNNZXRhZGF0YShvbmVbcHJvcF0sIG90aGVyW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pKE5vdGVib29rQ2VsbCB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGwgPSBOb3RlYm9va0NlbGwgPSB7fSkpO1xudmFyIE5vdGVib29rRG9jdW1lbnQ7XG4oZnVuY3Rpb24gKE5vdGVib29rRG9jdW1lbnQpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBub3RlYm9va1R5cGUsIHZlcnNpb24sIGNlbGxzKSB7XG4gICAgICAgIHJldHVybiB7IHVyaSwgbm90ZWJvb2tUeXBlLCB2ZXJzaW9uLCBjZWxscyB9O1xuICAgIH1cbiAgICBOb3RlYm9va0RvY3VtZW50LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEuaW50ZWdlci5pcyhjYW5kaWRhdGUudmVyc2lvbikgJiYgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuY2VsbHMsIE5vdGVib29rQ2VsbC5pcyk7XG4gICAgfVxuICAgIE5vdGVib29rRG9jdW1lbnQuaXMgPSBpcztcbn0pKE5vdGVib29rRG9jdW1lbnQgfHwgKGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudCA9IE5vdGVib29rRG9jdW1lbnQgPSB7fSkpO1xudmFyIE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZTtcbihmdW5jdGlvbiAoTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlKSB7XG4gICAgTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZCA9ICdub3RlYm9va0RvY3VtZW50L3N5bmMnO1xuICAgIE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZS5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZS50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUmVnaXN0cmF0aW9uVHlwZShOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUubWV0aG9kKTtcbn0pKE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZSB8fCAoZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUgPSBOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIG5vdGlmaWNhdGlvbiBzZW50IHdoZW4gYSBub3RlYm9vayBvcGVucy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24pIHtcbiAgICBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QgPSAnbm90ZWJvb2tEb2N1bWVudC9kaWRPcGVuJztcbiAgICBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbiAgICBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5yZWdpc3RyYXRpb25NZXRob2QgPSBOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUubWV0aG9kO1xufSkoRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IHt9KSk7XG52YXIgTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2U7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEudWludGVnZXIuaXMoY2FuZGlkYXRlLnN0YXJ0KSAmJiB2c2NvZGVfbGFuZ3VhZ2VzZXJ2ZXJfdHlwZXNfMS51aW50ZWdlci5pcyhjYW5kaWRhdGUuZGVsZXRlQ291bnQpICYmIChjYW5kaWRhdGUuY2VsbHMgPT09IHVuZGVmaW5lZCB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5jZWxscywgTm90ZWJvb2tDZWxsLmlzKSk7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXJ0LCBkZWxldGVDb3VudCwgY2VsbHMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyBzdGFydCwgZGVsZXRlQ291bnQgfTtcbiAgICAgICAgaWYgKGNlbGxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jZWxscyA9IGNlbGxzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlIHx8IChleHBvcnRzLk5vdGVib29rQ2VsbEFycmF5Q2hhbmdlID0gTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2UgPSB7fSkpO1xudmFyIERpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24pIHtcbiAgICBEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICdub3RlYm9va0RvY3VtZW50L2RpZENoYW5nZSc7XG4gICAgRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG4gICAgRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5yZWdpc3RyYXRpb25NZXRob2QgPSBOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUubWV0aG9kO1xufSkoRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IHt9KSk7XG4vKipcbiAqIEEgbm90aWZpY2F0aW9uIHNlbnQgd2hlbiBhIG5vdGVib29rIGRvY3VtZW50IGlzIHNhdmVkLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICdub3RlYm9va0RvY3VtZW50L2RpZFNhdmUnO1xuICAgIERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkU2F2ZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QpO1xuICAgIERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLnJlZ2lzdHJhdGlvbk1ldGhvZCA9IE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZS5tZXRob2Q7XG59KShEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogQSBub3RpZmljYXRpb24gc2VudCB3aGVuIGEgbm90ZWJvb2sgY2xvc2VzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIERpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICdub3RlYm9va0RvY3VtZW50L2RpZENsb3NlJztcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ucmVnaXN0cmF0aW9uTWV0aG9kID0gTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKERpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0ID0gZXhwb3J0cy5Xb3JrRG9uZVByb2dyZXNzID0gdm9pZCAwO1xuY29uc3QgdnNjb2RlX2pzb25ycGNfMSA9IHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwY1wiKTtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbnZhciBXb3JrRG9uZVByb2dyZXNzO1xuKGZ1bmN0aW9uIChXb3JrRG9uZVByb2dyZXNzKSB7XG4gICAgV29ya0RvbmVQcm9ncmVzcy50eXBlID0gbmV3IHZzY29kZV9qc29ucnBjXzEuUHJvZ3Jlc3NUeXBlKCk7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBXb3JrRG9uZVByb2dyZXNzLnR5cGU7XG4gICAgfVxuICAgIFdvcmtEb25lUHJvZ3Jlc3MuaXMgPSBpcztcbn0pKFdvcmtEb25lUHJvZ3Jlc3MgfHwgKGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzcyA9IFdvcmtEb25lUHJvZ3Jlc3MgPSB7fSkpO1xuLyoqXG4gKiBUaGUgYHdpbmRvdy93b3JrRG9uZVByb2dyZXNzL2NyZWF0ZWAgcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIGluaXRpYXRlIHByb2dyZXNzXG4gKiByZXBvcnRpbmcgZnJvbSB0aGUgc2VydmVyLlxuICovXG52YXIgV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKFdvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0KSB7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QubWV0aG9kID0gJ3dpbmRvdy93b3JrRG9uZVByb2dyZXNzL2NyZWF0ZSc7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBXb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShXb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdC5tZXRob2QpO1xufSkoV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QgfHwgKGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QgPSBXb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBgd2luZG93L3dvcmtEb25lUHJvZ3Jlc3MvY2FuY2VsYCBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tICB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgdG8gY2FuY2VsIGEgcHJvZ3Jlc3NcbiAqIGluaXRpYXRlZCBvbiB0aGUgc2VydmVyIHNpZGUuXG4gKi9cbnZhciBXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uKSB7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbi5tZXRob2QgPSAnd2luZG93L3dvcmtEb25lUHJvZ3Jlc3MvY2FuY2VsJztcbiAgICBXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKFdvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKFdvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbiA9IFdvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBzZWxlY3Rpb24gcmFuZ2VzIGluIGEgZG9jdW1lbnQuIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBTZWxlY3Rpb25SYW5nZVBhcmFtc30sIHRoZVxuICogcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgU2VsZWN0aW9uUmFuZ2UgU2VsZWN0aW9uUmFuZ2VbXX0gb3IgYSBUaGVuYWJsZVxuICogdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0O1xuKGZ1bmN0aW9uIChTZWxlY3Rpb25SYW5nZVJlcXVlc3QpIHtcbiAgICBTZWxlY3Rpb25SYW5nZVJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9zZWxlY3Rpb25SYW5nZSc7XG4gICAgU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNlbGVjdGlvblJhbmdlUmVxdWVzdC5tZXRob2QpO1xufSkoU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0IHx8IChleHBvcnRzLlNlbGVjdGlvblJhbmdlUmVxdWVzdCA9IFNlbGVjdGlvblJhbmdlUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZSA9IGV4cG9ydHMuVG9rZW5Gb3JtYXQgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vLy0tLS0tLS0gJ3RleHREb2N1bWVudC9zZW1hbnRpY1Rva2VucycgLS0tLS1cbnZhciBUb2tlbkZvcm1hdDtcbihmdW5jdGlvbiAoVG9rZW5Gb3JtYXQpIHtcbiAgICBUb2tlbkZvcm1hdC5SZWxhdGl2ZSA9ICdyZWxhdGl2ZSc7XG59KShUb2tlbkZvcm1hdCB8fCAoZXhwb3J0cy5Ub2tlbkZvcm1hdCA9IFRva2VuRm9ybWF0ID0ge30pKTtcbnZhciBTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGU7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZSkge1xuICAgIFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZS5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbWFudGljVG9rZW5zJztcbiAgICBTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUudHlwZSA9IG5ldyBtZXNzYWdlc18xLlJlZ2lzdHJhdGlvblR5cGUoU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZCk7XG59KShTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUgfHwgKGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlID0gU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlID0ge30pKTtcbi8qKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgU2VtYW50aWNUb2tlbnNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChTZW1hbnRpY1Rva2Vuc1JlcXVlc3QpIHtcbiAgICBTZW1hbnRpY1Rva2Vuc1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9zZW1hbnRpY1Rva2Vucy9mdWxsJztcbiAgICBTZW1hbnRpY1Rva2Vuc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBTZW1hbnRpY1Rva2Vuc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoU2VtYW50aWNUb2tlbnNSZXF1ZXN0Lm1ldGhvZCk7XG4gICAgU2VtYW50aWNUb2tlbnNSZXF1ZXN0LnJlZ2lzdHJhdGlvbk1ldGhvZCA9IFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZS5tZXRob2Q7XG59KShTZW1hbnRpY1Rva2Vuc1JlcXVlc3QgfHwgKGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZXF1ZXN0ID0gU2VtYW50aWNUb2tlbnNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0KSB7XG4gICAgU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9zZW1hbnRpY1Rva2Vucy9mdWxsL2RlbHRhJztcbiAgICBTZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0Lm1ldGhvZCk7XG4gICAgU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QucmVnaXN0cmF0aW9uTWV0aG9kID0gU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0IHx8IChleHBvcnRzLlNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0ID0gU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdDtcbihmdW5jdGlvbiAoU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QpIHtcbiAgICBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbWFudGljVG9rZW5zL3JhbmdlJztcbiAgICBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0Lm1ldGhvZCk7XG4gICAgU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QucmVnaXN0cmF0aW9uTWV0aG9kID0gU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0IHx8IChleHBvcnRzLlNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0ID0gU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0O1xuKGZ1bmN0aW9uIChTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0KSB7XG4gICAgU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL3NlbWFudGljVG9rZW5zL3JlZnJlc2hgO1xuICAgIFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0Lm1ldGhvZCk7XG59KShTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0IHx8IChleHBvcnRzLlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QgPSBTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TaG93RG9jdW1lbnRSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gc2hvdyBhIGRvY3VtZW50LiBUaGlzIHJlcXVlc3QgbWlnaHQgb3BlbiBhblxuICogZXh0ZXJuYWwgcHJvZ3JhbSBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIHRoZSBVUkkgdG8gb3Blbi5cbiAqIEZvciBleGFtcGxlIGEgcmVxdWVzdCB0byBvcGVuIGBodHRwczovL2NvZGUudmlzdWFsc3R1ZGlvLmNvbS9gXG4gKiB3aWxsIHZlcnkgbGlrZWx5IG9wZW4gdGhlIFVSSSBpbiBhIFdFQiBicm93c2VyLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiovXG52YXIgU2hvd0RvY3VtZW50UmVxdWVzdDtcbihmdW5jdGlvbiAoU2hvd0RvY3VtZW50UmVxdWVzdCkge1xuICAgIFNob3dEb2N1bWVudFJlcXVlc3QubWV0aG9kID0gJ3dpbmRvdy9zaG93RG9jdW1lbnQnO1xuICAgIFNob3dEb2N1bWVudFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBTaG93RG9jdW1lbnRSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNob3dEb2N1bWVudFJlcXVlc3QubWV0aG9kKTtcbn0pKFNob3dEb2N1bWVudFJlcXVlc3QgfHwgKGV4cG9ydHMuU2hvd0RvY3VtZW50UmVxdWVzdCA9IFNob3dEb2N1bWVudFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8vIEB0cy1pZ25vcmU6IHRvIGF2b2lkIGlubGluaW5nIExvY2F0aW9MaW5rIGFzIGR5bmFtaWMgaW1wb3J0XG5sZXQgX19ub0R5bmFtaWNJbXBvcnQ7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSB0eXBlIGRlZmluaXRpb24gbG9jYXRpb25zIG9mIGEgc3ltYm9sIGF0IGEgZ2l2ZW4gdGV4dFxuICogZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIFRleHREb2N1bWVudFBvc2l0aW9uUGFyYW1zfVxuICogdGhlIHJlc3BvbnNlIGlzIG9mIHR5cGUge0BsaW5rIERlZmluaXRpb259IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgVHlwZURlZmluaXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChUeXBlRGVmaW5pdGlvblJlcXVlc3QpIHtcbiAgICBUeXBlRGVmaW5pdGlvblJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC90eXBlRGVmaW5pdGlvbic7XG4gICAgVHlwZURlZmluaXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgVHlwZURlZmluaXRpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFR5cGVEZWZpbml0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoVHlwZURlZmluaXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLlR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IFR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIFR5cGVGb3gsIE1pY3Jvc29mdCBhbmQgb3RoZXJzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0ID0gZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QgPSBleHBvcnRzLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc3VsdCBhIGBUeXBlSGllcmFyY2h5SXRlbWAgaW4gYSBkb2N1bWVudCBhdCBhIGdpdmVuIHBvc2l0aW9uLlxuICogQ2FuIGJlIHVzZWQgYXMgYW4gaW5wdXQgdG8gYSBzdWJ0eXBlcyBvciBzdXBlcnR5cGVzIHR5cGUgaGllcmFyY2h5LlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdDtcbihmdW5jdGlvbiAoVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0KSB7XG4gICAgVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcHJlcGFyZVR5cGVIaWVyYXJjaHknO1xuICAgIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShUeXBlSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QubWV0aG9kKTtcbn0pKFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCB8fCAoZXhwb3J0cy5UeXBlSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QgPSBUeXBlSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSB0aGUgc3VwZXJ0eXBlcyBmb3IgYSBnaXZlbiBgVHlwZUhpZXJhcmNoeUl0ZW1gLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0KSB7XG4gICAgVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0Lm1ldGhvZCA9ICd0eXBlSGllcmFyY2h5L3N1cGVydHlwZXMnO1xuICAgIFR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShUeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdCB8fCAoZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QgPSBUeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSB0aGUgc3VidHlwZXMgZm9yIGEgZ2l2ZW4gYFR5cGVIaWVyYXJjaHlJdGVtYC5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBUeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChUeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0KSB7XG4gICAgVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdC5tZXRob2QgPSAndHlwZUhpZXJhcmNoeS9zdWJ0eXBlcyc7XG4gICAgVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdC5tZXRob2QpO1xufSkoVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdCB8fCAoZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0ID0gVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIFRoZSBgd29ya3NwYWNlL3dvcmtzcGFjZUZvbGRlcnNgIGlzIHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gZmV0Y2ggdGhlIG9wZW4gd29ya3NwYWNlIGZvbGRlcnMuXG4gKi9cbnZhciBXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdDtcbihmdW5jdGlvbiAoV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QpIHtcbiAgICBXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL3dvcmtzcGFjZUZvbGRlcnMnO1xuICAgIFdvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUwKFdvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0Lm1ldGhvZCk7XG59KShXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdCB8fCAoZXhwb3J0cy5Xb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdCA9IFdvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGB3b3Jrc3BhY2UvZGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc2Agbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgd2hlbiB0aGUgd29ya3NwYWNlXG4gKiBmb2xkZXIgY29uZmlndXJhdGlvbiBjaGFuZ2VzLlxuICovXG52YXIgRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24ubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzJztcbiAgICBEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbiA9IERpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24gPSB7fSkpO1xuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYmplY3RMaXRlcmFsID0gZXhwb3J0cy50eXBlZEFycmF5ID0gZXhwb3J0cy5zdHJpbmdBcnJheSA9IGV4cG9ydHMuYXJyYXkgPSBleHBvcnRzLmZ1bmMgPSBleHBvcnRzLmVycm9yID0gZXhwb3J0cy5udW1iZXIgPSBleHBvcnRzLnN0cmluZyA9IGV4cG9ydHMuYm9vbGVhbiA9IHZvaWQgMDtcbmZ1bmN0aW9uIGJvb2xlYW4odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xufVxuZXhwb3J0cy5ib29sZWFuID0gYm9vbGVhbjtcbmZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG5mdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcjtcbn1cbmV4cG9ydHMubnVtYmVyID0gbnVtYmVyO1xuZnVuY3Rpb24gZXJyb3IodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvcjtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbmZ1bmN0aW9uIGZ1bmModmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5mdW5jID0gZnVuYztcbmZ1bmN0aW9uIGFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuZXhwb3J0cy5hcnJheSA9IGFycmF5O1xuZnVuY3Rpb24gc3RyaW5nQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gYXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGVsZW0gPT4gc3RyaW5nKGVsZW0pKTtcbn1cbmV4cG9ydHMuc3RyaW5nQXJyYXkgPSBzdHJpbmdBcnJheTtcbmZ1bmN0aW9uIHR5cGVkQXJyYXkodmFsdWUsIGNoZWNrKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGNoZWNrKTtcbn1cbmV4cG9ydHMudHlwZWRBcnJheSA9IHR5cGVkQXJyYXk7XG5mdW5jdGlvbiBvYmplY3RMaXRlcmFsKHZhbHVlKSB7XG4gICAgLy8gU3RyaWN0bHkgc3BlYWtpbmcgY2xhc3MgaW5zdGFuY2VzIHBhc3MgdGhpcyBjaGVjayBhcyB3ZWxsLiBTaW5jZSB0aGUgTFNQXG4gICAgLy8gZG9lc24ndCB1c2UgY2xhc3NlcyB3ZSBpZ25vcmUgdGhpcyBmb3Igbm93LiBJZiB3ZSBkbyB3ZSBuZWVkIHRvIGFkZCBzb21ldGhpbmdcbiAgICAvLyBsaWtlIHRoaXM6IGBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKHgpKSA9PT0gbnVsbGBcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcbn1cbmV4cG9ydHMub2JqZWN0TGl0ZXJhbCA9IG9iamVjdExpdGVyYWw7XG4iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIERvY3VtZW50VXJpO1xuKGZ1bmN0aW9uIChEb2N1bWVudFVyaSkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH1cbiAgICBEb2N1bWVudFVyaS5pcyA9IGlzO1xufSkoRG9jdW1lbnRVcmkgfHwgKERvY3VtZW50VXJpID0ge30pKTtcbmV4cG9ydCB2YXIgVVJJO1xuKGZ1bmN0aW9uIChVUkkpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgVVJJLmlzID0gaXM7XG59KShVUkkgfHwgKFVSSSA9IHt9KSk7XG5leHBvcnQgdmFyIGludGVnZXI7XG4oZnVuY3Rpb24gKGludGVnZXIpIHtcbiAgICBpbnRlZ2VyLk1JTl9WQUxVRSA9IC0yMTQ3NDgzNjQ4O1xuICAgIGludGVnZXIuTUFYX1ZBTFVFID0gMjE0NzQ4MzY0NztcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpbnRlZ2VyLk1JTl9WQUxVRSA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSBpbnRlZ2VyLk1BWF9WQUxVRTtcbiAgICB9XG4gICAgaW50ZWdlci5pcyA9IGlzO1xufSkoaW50ZWdlciB8fCAoaW50ZWdlciA9IHt9KSk7XG5leHBvcnQgdmFyIHVpbnRlZ2VyO1xuKGZ1bmN0aW9uICh1aW50ZWdlcikge1xuICAgIHVpbnRlZ2VyLk1JTl9WQUxVRSA9IDA7XG4gICAgdWludGVnZXIuTUFYX1ZBTFVFID0gMjE0NzQ4MzY0NztcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB1aW50ZWdlci5NSU5fVkFMVUUgPD0gdmFsdWUgJiYgdmFsdWUgPD0gdWludGVnZXIuTUFYX1ZBTFVFO1xuICAgIH1cbiAgICB1aW50ZWdlci5pcyA9IGlzO1xufSkodWludGVnZXIgfHwgKHVpbnRlZ2VyID0ge30pKTtcbi8qKlxuICogVGhlIFBvc2l0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIFBvc2l0aW9ufSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFBvc2l0aW9uIGxpdGVyYWwgZnJvbSB0aGUgZ2l2ZW4gbGluZSBhbmQgY2hhcmFjdGVyLlxuICAgICAqIEBwYXJhbSBsaW5lIFRoZSBwb3NpdGlvbidzIGxpbmUuXG4gICAgICogQHBhcmFtIGNoYXJhY3RlciBUaGUgcG9zaXRpb24ncyBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxpbmUsIGNoYXJhY3Rlcikge1xuICAgICAgICBpZiAobGluZSA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgbGluZSA9IHVpbnRlZ2VyLk1BWF9WQUxVRTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSB1aW50ZWdlci5NQVhfVkFMVUU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbGluZSwgY2hhcmFjdGVyIH07XG4gICAgfVxuICAgIFBvc2l0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIFBvc2l0aW9ufSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5saW5lKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUuY2hhcmFjdGVyKTtcbiAgICB9XG4gICAgUG9zaXRpb24uaXMgPSBpcztcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBSYW5nZSBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBSYW5nZX0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG9uZSwgdHdvLCB0aHJlZSwgZm91cikge1xuICAgICAgICBpZiAoSXMudWludGVnZXIob25lKSAmJiBJcy51aW50ZWdlcih0d28pICYmIElzLnVpbnRlZ2VyKHRocmVlKSAmJiBJcy51aW50ZWdlcihmb3VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IFBvc2l0aW9uLmNyZWF0ZShvbmUsIHR3byksIGVuZDogUG9zaXRpb24uY3JlYXRlKHRocmVlLCBmb3VyKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFBvc2l0aW9uLmlzKG9uZSkgJiYgUG9zaXRpb24uaXModHdvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IG9uZSwgZW5kOiB0d28gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmFuZ2UjY3JlYXRlIGNhbGxlZCB3aXRoIGludmFsaWQgYXJndW1lbnRzWyR7b25lfSwgJHt0d299LCAke3RocmVlfSwgJHtmb3VyfV1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSYW5nZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBSYW5nZX0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBQb3NpdGlvbi5pcyhjYW5kaWRhdGUuc3RhcnQpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5lbmQpO1xuICAgIH1cbiAgICBSYW5nZS5pcyA9IGlzO1xufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcbi8qKlxuICogVGhlIExvY2F0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIExvY2F0aW9ufSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBMb2NhdGlvbjtcbihmdW5jdGlvbiAoTG9jYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTG9jYXRpb24gbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBsb2NhdGlvbidzIHVyaS5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIGxvY2F0aW9uJ3MgcmFuZ2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpLCByYW5nZSB9O1xuICAgIH1cbiAgICBMb2NhdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBMb2NhdGlvbn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIChJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS51cmkpKTtcbiAgICB9XG4gICAgTG9jYXRpb24uaXMgPSBpcztcbn0pKExvY2F0aW9uIHx8IChMb2NhdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBMb2NhdGlvbkxpbmsgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgTG9jYXRpb25MaW5rfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBMb2NhdGlvbkxpbms7XG4oZnVuY3Rpb24gKExvY2F0aW9uTGluaykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMb2NhdGlvbkxpbmsgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0VXJpIFRoZSBkZWZpbml0aW9uJ3MgdXJpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRSYW5nZSBUaGUgZnVsbCByYW5nZSBvZiB0aGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0U2VsZWN0aW9uUmFuZ2UgVGhlIHNwYW4gb2YgdGhlIHN5bWJvbCBkZWZpbml0aW9uIGF0IHRoZSB0YXJnZXQuXG4gICAgICogQHBhcmFtIG9yaWdpblNlbGVjdGlvblJhbmdlIFRoZSBzcGFuIG9mIHRoZSBzeW1ib2wgYmVpbmcgZGVmaW5lZCBpbiB0aGUgb3JpZ2luYXRpbmcgc291cmNlIGZpbGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRhcmdldFVyaSwgdGFyZ2V0UmFuZ2UsIHRhcmdldFNlbGVjdGlvblJhbmdlLCBvcmlnaW5TZWxlY3Rpb25SYW5nZSkge1xuICAgICAgICByZXR1cm4geyB0YXJnZXRVcmksIHRhcmdldFJhbmdlLCB0YXJnZXRTZWxlY3Rpb25SYW5nZSwgb3JpZ2luU2VsZWN0aW9uUmFuZ2UgfTtcbiAgICB9XG4gICAgTG9jYXRpb25MaW5rLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIExvY2F0aW9uTGlua30gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUudGFyZ2V0UmFuZ2UpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudGFyZ2V0VXJpKVxuICAgICAgICAgICAgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnRhcmdldFNlbGVjdGlvblJhbmdlKVxuICAgICAgICAgICAgJiYgKFJhbmdlLmlzKGNhbmRpZGF0ZS5vcmlnaW5TZWxlY3Rpb25SYW5nZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5vcmlnaW5TZWxlY3Rpb25SYW5nZSkpO1xuICAgIH1cbiAgICBMb2NhdGlvbkxpbmsuaXMgPSBpcztcbn0pKExvY2F0aW9uTGluayB8fCAoTG9jYXRpb25MaW5rID0ge30pKTtcbi8qKlxuICogVGhlIENvbG9yIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIENvbG9yfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb2xvcjtcbihmdW5jdGlvbiAoQ29sb3IpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENvbG9yIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWQsXG4gICAgICAgICAgICBncmVlbixcbiAgICAgICAgICAgIGJsdWUsXG4gICAgICAgICAgICBhbHBoYSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29sb3IuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgQ29sb3J9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUucmVkLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmdyZWVuLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmJsdWUsIDAsIDEpXG4gICAgICAgICAgICAmJiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUuYWxwaGEsIDAsIDEpO1xuICAgIH1cbiAgICBDb2xvci5pcyA9IGlzO1xufSkoQ29sb3IgfHwgKENvbG9yID0ge30pKTtcbi8qKlxuICogVGhlIENvbG9ySW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3JJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoQ29sb3JJbmZvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29sb3JJbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICAgY29sb3IsXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbG9ySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgQ29sb3IuaXMoY2FuZGlkYXRlLmNvbG9yKTtcbiAgICB9XG4gICAgQ29sb3JJbmZvcm1hdGlvbi5pcyA9IGlzO1xufSkoQ29sb3JJbmZvcm1hdGlvbiB8fCAoQ29sb3JJbmZvcm1hdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2xvciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBDb2xvclByZXNlbnRhdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3JQcmVzZW50YXRpb247XG4oZnVuY3Rpb24gKENvbG9yUHJlc2VudGF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2xvckluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCB0ZXh0RWRpdCwgYWRkaXRpb25hbFRleHRFZGl0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICB0ZXh0RWRpdCxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0RWRpdHMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbG9yUHJlc2VudGF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIENvbG9ySW5mb3JtYXRpb259IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGV4dEVkaXQpIHx8IFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzLCBUZXh0RWRpdC5pcykpO1xuICAgIH1cbiAgICBDb2xvclByZXNlbnRhdGlvbi5pcyA9IGlzO1xufSkoQ29sb3JQcmVzZW50YXRpb24gfHwgKENvbG9yUHJlc2VudGF0aW9uID0ge30pKTtcbi8qKlxuICogQSBzZXQgb2YgcHJlZGVmaW5lZCByYW5nZSBraW5kcy5cbiAqL1xuZXhwb3J0IHZhciBGb2xkaW5nUmFuZ2VLaW5kO1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2VLaW5kKSB7XG4gICAgLyoqXG4gICAgICogRm9sZGluZyByYW5nZSBmb3IgYSBjb21tZW50XG4gICAgICovXG4gICAgRm9sZGluZ1JhbmdlS2luZC5Db21tZW50ID0gJ2NvbW1lbnQnO1xuICAgIC8qKlxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGFuIGltcG9ydCBvciBpbmNsdWRlXG4gICAgICovXG4gICAgRm9sZGluZ1JhbmdlS2luZC5JbXBvcnRzID0gJ2ltcG9ydHMnO1xuICAgIC8qKlxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGEgcmVnaW9uIChlLmcuIGAjcmVnaW9uYClcbiAgICAgKi9cbiAgICBGb2xkaW5nUmFuZ2VLaW5kLlJlZ2lvbiA9ICdyZWdpb24nO1xufSkoRm9sZGluZ1JhbmdlS2luZCB8fCAoRm9sZGluZ1JhbmdlS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBmb2xkaW5nIHJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIEZvbGRpbmdSYW5nZX0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgRm9sZGluZ1JhbmdlO1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2UpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvbGRpbmdSYW5nZSBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShzdGFydExpbmUsIGVuZExpbmUsIHN0YXJ0Q2hhcmFjdGVyLCBlbmRDaGFyYWN0ZXIsIGtpbmQsIGNvbGxhcHNlZFRleHQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgc3RhcnRMaW5lLFxuICAgICAgICAgICAgZW5kTGluZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChzdGFydENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydENoYXJhY3RlciA9IHN0YXJ0Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGVuZENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmRDaGFyYWN0ZXIgPSBlbmRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQoa2luZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChjb2xsYXBzZWRUZXh0KSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvbGxhcHNlZFRleHQgPSBjb2xsYXBzZWRUZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEZvbGRpbmdSYW5nZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBGb2xkaW5nUmFuZ2V9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRMaW5lKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRMaW5lKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuc3RhcnRDaGFyYWN0ZXIpIHx8IElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5zdGFydENoYXJhY3RlcikpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5lbmRDaGFyYWN0ZXIpIHx8IElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5lbmRDaGFyYWN0ZXIpKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUua2luZCkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5raW5kKSk7XG4gICAgfVxuICAgIEZvbGRpbmdSYW5nZS5pcyA9IGlzO1xufSkoRm9sZGluZ1JhbmdlIHx8IChGb2xkaW5nUmFuZ2UgPSB7fSkpO1xuLyoqXG4gKiBUaGUgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9ufSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxvY2F0aW9uLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9ufSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIExvY2F0aW9uLmlzKGNhbmRpZGF0ZS5sb2NhdGlvbikgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXNzYWdlKTtcbiAgICB9XG4gICAgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbi5pcyA9IGlzO1xufSkoRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiB8fCAoRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBkaWFnbm9zdGljJ3Mgc2V2ZXJpdHkuXG4gKi9cbmV4cG9ydCB2YXIgRGlhZ25vc3RpY1NldmVyaXR5O1xuKGZ1bmN0aW9uIChEaWFnbm9zdGljU2V2ZXJpdHkpIHtcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGFuIGVycm9yLlxuICAgICAqL1xuICAgIERpYWdub3N0aWNTZXZlcml0eS5FcnJvciA9IDE7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhIHdhcm5pbmcuXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmcgPSAyO1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYW4gaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5LkluZm9ybWF0aW9uID0gMztcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGEgaGludC5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuSGludCA9IDQ7XG59KShEaWFnbm9zdGljU2V2ZXJpdHkgfHwgKERpYWdub3N0aWNTZXZlcml0eSA9IHt9KSk7XG4vKipcbiAqIFRoZSBkaWFnbm9zdGljIHRhZ3MuXG4gKlxuICogQHNpbmNlIDMuMTUuMFxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWNUYWc7XG4oZnVuY3Rpb24gKERpYWdub3N0aWNUYWcpIHtcbiAgICAvKipcbiAgICAgKiBVbnVzZWQgb3IgdW5uZWNlc3NhcnkgY29kZS5cbiAgICAgKlxuICAgICAqIENsaWVudHMgYXJlIGFsbG93ZWQgdG8gcmVuZGVyIGRpYWdub3N0aWNzIHdpdGggdGhpcyB0YWcgZmFkZWQgb3V0IGluc3RlYWQgb2YgaGF2aW5nXG4gICAgICogYW4gZXJyb3Igc3F1aWdnbGUuXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1RhZy5Vbm5lY2Vzc2FyeSA9IDE7XG4gICAgLyoqXG4gICAgICogRGVwcmVjYXRlZCBvciBvYnNvbGV0ZSBjb2RlLlxuICAgICAqXG4gICAgICogQ2xpZW50cyBhcmUgYWxsb3dlZCB0byByZW5kZXJlZCBkaWFnbm9zdGljcyB3aXRoIHRoaXMgdGFnIHN0cmlrZSB0aHJvdWdoLlxuICAgICAqL1xuICAgIERpYWdub3N0aWNUYWcuRGVwcmVjYXRlZCA9IDI7XG59KShEaWFnbm9zdGljVGFnIHx8IChEaWFnbm9zdGljVGFnID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVEZXNjcmlwdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aCBkZXNjcmlwdGlvbnMgZm9yIGRpYWdub3N0aWMgY29kZXMuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG5leHBvcnQgdmFyIENvZGVEZXNjcmlwdGlvbjtcbihmdW5jdGlvbiAoQ29kZURlc2NyaXB0aW9uKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5ocmVmKTtcbiAgICB9XG4gICAgQ29kZURlc2NyaXB0aW9uLmlzID0gaXM7XG59KShDb2RlRGVzY3JpcHRpb24gfHwgKENvZGVEZXNjcmlwdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBEaWFnbm9zdGljIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIERpYWdub3N0aWN9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWM7XG4oZnVuY3Rpb24gKERpYWdub3N0aWMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERpYWdub3N0aWMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgICAgICBsZXQgcmVzdWx0ID0geyByYW5nZSwgbWVzc2FnZSB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChzZXZlcml0eSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXZlcml0eSA9IHNldmVyaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGNvZGUpKSB7XG4gICAgICAgICAgICByZXN1bHQuY29kZSA9IGNvZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQoc291cmNlKSkge1xuICAgICAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChyZWxhdGVkSW5mb3JtYXRpb24pKSB7XG4gICAgICAgICAgICByZXN1bHQucmVsYXRlZEluZm9ybWF0aW9uID0gcmVsYXRlZEluZm9ybWF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIERpYWdub3N0aWMuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgRGlhZ25vc3RpY30gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpXG4gICAgICAgICAgICAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm1lc3NhZ2UpXG4gICAgICAgICAgICAmJiAoSXMubnVtYmVyKGNhbmRpZGF0ZS5zZXZlcml0eSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zZXZlcml0eSkpXG4gICAgICAgICAgICAmJiAoSXMuaW50ZWdlcihjYW5kaWRhdGUuY29kZSkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5jb2RlKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvZGUpKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29kZURlc2NyaXB0aW9uKSB8fCAoSXMuc3RyaW5nKChfYSA9IGNhbmRpZGF0ZS5jb2RlRGVzY3JpcHRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ocmVmKSkpXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5zb3VyY2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUuc291cmNlKSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLnJlbGF0ZWRJbmZvcm1hdGlvbikgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUucmVsYXRlZEluZm9ybWF0aW9uLCBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uLmlzKSk7XG4gICAgfVxuICAgIERpYWdub3N0aWMuaXMgPSBpcztcbn0pKERpYWdub3N0aWMgfHwgKERpYWdub3N0aWMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tbWFuZCBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBDb21tYW5kfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb21tYW5kO1xuKGZ1bmN0aW9uIChDb21tYW5kKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb21tYW5kIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBjb21tYW5kLCAuLi5hcmdzKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7IHRpdGxlLCBjb21tYW5kIH07XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGFyZ3MpICYmIGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0LmFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgQ29tbWFuZC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb21tYW5kfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudGl0bGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUuY29tbWFuZCk7XG4gICAgfVxuICAgIENvbW1hbmQuaXMgPSBpcztcbn0pKENvbW1hbmQgfHwgKENvbW1hbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgcmVwbGFjZSxcbiAqIGluc2VydCBhbmQgZGVsZXRlIGVkaXRzIG1vcmUgZWFzaWx5LlxuICovXG5leHBvcnQgdmFyIFRleHRFZGl0O1xuKGZ1bmN0aW9uIChUZXh0RWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXBsYWNlIHRleHQgZWRpdC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRleHQgdG8gYmUgcmVwbGFjZWQuXG4gICAgICogQHBhcmFtIG5ld1RleHQgVGhlIG5ldyB0ZXh0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlcGxhY2UocmFuZ2UsIG5ld1RleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2UsIG5ld1RleHQgfTtcbiAgICB9XG4gICAgVGV4dEVkaXQucmVwbGFjZSA9IHJlcGxhY2U7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnNlcnQgdGV4dCBlZGl0LlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gdG8gaW5zZXJ0IHRoZSB0ZXh0IGF0LlxuICAgICAqIEBwYXJhbSBuZXdUZXh0IFRoZSB0ZXh0IHRvIGJlIGluc2VydGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluc2VydChwb3NpdGlvbiwgbmV3VGV4dCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogeyBzdGFydDogcG9zaXRpb24sIGVuZDogcG9zaXRpb24gfSwgbmV3VGV4dCB9O1xuICAgIH1cbiAgICBUZXh0RWRpdC5pbnNlcnQgPSBpbnNlcnQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRlbGV0ZSB0ZXh0IGVkaXQuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0ZXh0IHRvIGJlIGRlbGV0ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVsKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlLCBuZXdUZXh0OiAnJyB9O1xuICAgIH1cbiAgICBUZXh0RWRpdC5kZWwgPSBkZWw7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICYmIElzLnN0cmluZyhjYW5kaWRhdGUubmV3VGV4dClcbiAgICAgICAgICAgICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSk7XG4gICAgfVxuICAgIFRleHRFZGl0LmlzID0gaXM7XG59KShUZXh0RWRpdCB8fCAoVGV4dEVkaXQgPSB7fSkpO1xuZXhwb3J0IHZhciBDaGFuZ2VBbm5vdGF0aW9uO1xuKGZ1bmN0aW9uIChDaGFuZ2VBbm5vdGF0aW9uKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCBuZWVkc0NvbmZpcm1hdGlvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyBsYWJlbCB9O1xuICAgICAgICBpZiAobmVlZHNDb25maXJtYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0Lm5lZWRzQ29uZmlybWF0aW9uID0gbmVlZHNDb25maXJtYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUubGFiZWwpICYmXG4gICAgICAgICAgICAoSXMuYm9vbGVhbihjYW5kaWRhdGUubmVlZHNDb25maXJtYXRpb24pIHx8IGNhbmRpZGF0ZS5uZWVkc0NvbmZpcm1hdGlvbiA9PT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgKElzLnN0cmluZyhjYW5kaWRhdGUuZGVzY3JpcHRpb24pIHx8IGNhbmRpZGF0ZS5kZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgQ2hhbmdlQW5ub3RhdGlvbi5pcyA9IGlzO1xufSkoQ2hhbmdlQW5ub3RhdGlvbiB8fCAoQ2hhbmdlQW5ub3RhdGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyO1xuKGZ1bmN0aW9uIChDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZSk7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzID0gaXM7XG59KShDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllciB8fCAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIgPSB7fSkpO1xuZXhwb3J0IHZhciBBbm5vdGF0ZWRUZXh0RWRpdDtcbihmdW5jdGlvbiAoQW5ub3RhdGVkVGV4dEVkaXQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFubm90YXRlZCByZXBsYWNlIHRleHQgZWRpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSByZXBsYWNlZC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgbmV3IHRleHQuXG4gICAgICogQHBhcmFtIGFubm90YXRpb24gVGhlIGFubm90YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4geyByYW5nZSwgbmV3VGV4dCwgYW5ub3RhdGlvbklkOiBhbm5vdGF0aW9uIH07XG4gICAgfVxuICAgIEFubm90YXRlZFRleHRFZGl0LnJlcGxhY2UgPSByZXBsYWNlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYW5ub3RhdGVkIGluc2VydCB0ZXh0IGVkaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgdGV4dCBhdC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgdGV4dCB0byBiZSBpbnNlcnRlZC5cbiAgICAgKiBAcGFyYW0gYW5ub3RhdGlvbiBUaGUgYW5ub3RhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGFubm90YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHsgc3RhcnQ6IHBvc2l0aW9uLCBlbmQ6IHBvc2l0aW9uIH0sIG5ld1RleHQsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICAgIH1cbiAgICBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQgPSBpbnNlcnQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhbm5vdGF0ZWQgZGVsZXRlIHRleHQgZWRpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSBkZWxldGVkLlxuICAgICAqIEBwYXJhbSBhbm5vdGF0aW9uIFRoZSBhbm5vdGF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlbChyYW5nZSwgYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4geyByYW5nZSwgbmV3VGV4dDogJycsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICAgIH1cbiAgICBBbm5vdGF0ZWRUZXh0RWRpdC5kZWwgPSBkZWw7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBUZXh0RWRpdC5pcyhjYW5kaWRhdGUpICYmIChDaGFuZ2VBbm5vdGF0aW9uLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgICB9XG4gICAgQW5ub3RhdGVkVGV4dEVkaXQuaXMgPSBpcztcbn0pKEFubm90YXRlZFRleHRFZGl0IHx8IChBbm5vdGF0ZWRUZXh0RWRpdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBUZXh0RG9jdW1lbnRFZGl0IG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlXG4gKiBhbiBlZGl0IHRoYXQgbWFuaXB1bGF0ZXMgYSB0ZXh0IGRvY3VtZW50LlxuICovXG5leHBvcnQgdmFyIFRleHREb2N1bWVudEVkaXQ7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudEVkaXQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBUZXh0RG9jdW1lbnRFZGl0YFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0ZXh0RG9jdW1lbnQsIGVkaXRzKSB7XG4gICAgICAgIHJldHVybiB7IHRleHREb2N1bWVudCwgZWRpdHMgfTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RWRpdC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoY2FuZGlkYXRlLnRleHREb2N1bWVudClcbiAgICAgICAgICAgICYmIEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLmVkaXRzKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RWRpdC5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50RWRpdCB8fCAoVGV4dERvY3VtZW50RWRpdCA9IHt9KSk7XG5leHBvcnQgdmFyIENyZWF0ZUZpbGU7XG4oZnVuY3Rpb24gKENyZWF0ZUZpbGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBvcHRpb25zLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgICAgICBraW5kOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIHVyaVxuICAgICAgICB9O1xuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIChvcHRpb25zLm92ZXJ3cml0ZSAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuaWdub3JlSWZFeGlzdHMgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQuYW5ub3RhdGlvbklkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDcmVhdGVGaWxlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09ICdjcmVhdGUnICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgKChjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSkpICYmIChjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cyA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMpKSkpICYmIChjYW5kaWRhdGUuYW5ub3RhdGlvbklkID09PSB1bmRlZmluZWQgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoY2FuZGlkYXRlLmFubm90YXRpb25JZCkpO1xuICAgIH1cbiAgICBDcmVhdGVGaWxlLmlzID0gaXM7XG59KShDcmVhdGVGaWxlIHx8IChDcmVhdGVGaWxlID0ge30pKTtcbmV4cG9ydCB2YXIgUmVuYW1lRmlsZTtcbihmdW5jdGlvbiAoUmVuYW1lRmlsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShvbGRVcmksIG5ld1VyaSwgb3B0aW9ucywgYW5ub3RhdGlvbikge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2luZDogJ3JlbmFtZScsXG4gICAgICAgICAgICBvbGRVcmksXG4gICAgICAgICAgICBuZXdVcmlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiAob3B0aW9ucy5vdmVyd3JpdGUgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmlnbm9yZUlmRXhpc3RzICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFubm90YXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgUmVuYW1lRmlsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAncmVuYW1lJyAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm9sZFVyaSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uZXdVcmkpICYmIChjYW5kaWRhdGUub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAoKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlKSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cykpKSkgJiYgKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQgPT09IHVuZGVmaW5lZCB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gICAgfVxuICAgIFJlbmFtZUZpbGUuaXMgPSBpcztcbn0pKFJlbmFtZUZpbGUgfHwgKFJlbmFtZUZpbGUgPSB7fSkpO1xuZXhwb3J0IHZhciBEZWxldGVGaWxlO1xuKGZ1bmN0aW9uIChEZWxldGVGaWxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgb3B0aW9ucywgYW5ub3RhdGlvbikge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2luZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICB1cmlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiAob3B0aW9ucy5yZWN1cnNpdmUgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmlnbm9yZUlmTm90RXhpc3RzICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFubm90YXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgRGVsZXRlRmlsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAnZGVsZXRlJyAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICgoY2FuZGlkYXRlLm9wdGlvbnMucmVjdXJzaXZlID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5yZWN1cnNpdmUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmTm90RXhpc3RzKSkpKSAmJiAoY2FuZGlkYXRlLmFubm90YXRpb25JZCA9PT0gdW5kZWZpbmVkIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgICB9XG4gICAgRGVsZXRlRmlsZS5pcyA9IGlzO1xufSkoRGVsZXRlRmlsZSB8fCAoRGVsZXRlRmlsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFdvcmtzcGFjZUVkaXQ7XG4oZnVuY3Rpb24gKFdvcmtzcGFjZUVkaXQpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuY2hhbmdlcyAhPT0gdW5kZWZpbmVkIHx8IGNhbmRpZGF0ZS5kb2N1bWVudENoYW5nZXMgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQgfHwgY2FuZGlkYXRlLmRvY3VtZW50Q2hhbmdlcy5ldmVyeSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKElzLnN0cmluZyhjaGFuZ2Uua2luZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENyZWF0ZUZpbGUuaXMoY2hhbmdlKSB8fCBSZW5hbWVGaWxlLmlzKGNoYW5nZSkgfHwgRGVsZXRlRmlsZS5pcyhjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHREb2N1bWVudEVkaXQuaXMoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuICAgIFdvcmtzcGFjZUVkaXQuaXMgPSBpcztcbn0pKFdvcmtzcGFjZUVkaXQgfHwgKFdvcmtzcGFjZUVkaXQgPSB7fSkpO1xuY2xhc3MgVGV4dEVkaXRDaGFuZ2VJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcihlZGl0cywgY2hhbmdlQW5ub3RhdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lZGl0cyA9IGVkaXRzO1xuICAgICAgICB0aGlzLmNoYW5nZUFubm90YXRpb25zID0gY2hhbmdlQW5ub3RhdGlvbnM7XG4gICAgfVxuICAgIGluc2VydChwb3NpdGlvbiwgbmV3VGV4dCwgYW5ub3RhdGlvbikge1xuICAgICAgICBsZXQgZWRpdDtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0ID0gVGV4dEVkaXQuaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgaWQgPSBhbm5vdGF0aW9uO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0Lmluc2VydChwb3NpdGlvbiwgbmV3VGV4dCwgYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFzc2VydENoYW5nZUFubm90YXRpb25zKHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgaWQgPSB0aGlzLmNoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgYW5ub3RhdGlvbikge1xuICAgICAgICBsZXQgZWRpdDtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0ID0gVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgbmV3VGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5yZXBsYWNlKHJhbmdlLCBuZXdUZXh0LCBhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Q2hhbmdlQW5ub3RhdGlvbnModGhpcy5jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICBpZCA9IHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0LnJlcGxhY2UocmFuZ2UsIG5ld1RleHQsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlKHJhbmdlLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIGxldCBlZGl0O1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXQgPSBUZXh0RWRpdC5kZWwocmFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBpZCA9IGFubm90YXRpb247XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQuZGVsKHJhbmdlLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Q2hhbmdlQW5ub3RhdGlvbnModGhpcy5jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICBpZCA9IHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0LmRlbChyYW5nZSwgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChlZGl0KTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGQoZWRpdCkge1xuICAgICAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgfVxuICAgIGFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdHM7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmVkaXRzLnNwbGljZSgwLCB0aGlzLmVkaXRzLmxlbmd0aCk7XG4gICAgfVxuICAgIGFzc2VydENoYW5nZUFubm90YXRpb25zKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRleHQgZWRpdCBjaGFuZ2UgaXMgbm90IGNvbmZpZ3VyZWQgdG8gbWFuYWdlIGNoYW5nZSBhbm5vdGF0aW9ucy5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBoZWxwZXIgY2xhc3NcbiAqL1xuY2xhc3MgQ2hhbmdlQW5ub3RhdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKGFubm90YXRpb25zKSB7XG4gICAgICAgIHRoaXMuX2Fubm90YXRpb25zID0gYW5ub3RhdGlvbnMgPT09IHVuZGVmaW5lZCA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiBhbm5vdGF0aW9ucztcbiAgICAgICAgdGhpcy5fY291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgIH1cbiAgICBhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbm5vdGF0aW9ucztcbiAgICB9XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBtYW5hZ2UoaWRPckFubm90YXRpb24sIGFubm90YXRpb24pIHtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoaWRPckFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBpZCA9IGlkT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IGlkT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hbm5vdGF0aW9uc1tpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJZCAke2lkfSBpcyBhbHJlYWR5IGluIHVzZS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGFubm90YXRpb24gcHJvdmlkZWQgZm9yIGlkICR7aWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5ub3RhdGlvbnNbaWRdID0gYW5ub3RhdGlvbjtcbiAgICAgICAgdGhpcy5fc2l6ZSsrO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIG5leHRJZCgpIHtcbiAgICAgICAgdGhpcy5fY291bnRlcisrO1xuICAgICAgICByZXR1cm4gdGhpcy5fY291bnRlci50b1N0cmluZygpO1xuICAgIH1cbn1cbi8qKlxuICogQSB3b3Jrc3BhY2UgY2hhbmdlIGhlbHBzIGNvbnN0cnVjdGluZyBjaGFuZ2VzIHRvIGEgd29ya3NwYWNlLlxuICovXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcih3b3Jrc3BhY2VFZGl0KSB7XG4gICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQgPSB3b3Jrc3BhY2VFZGl0O1xuICAgICAgICAgICAgaWYgKHdvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMgPSBuZXcgQ2hhbmdlQW5ub3RhdGlvbnMod29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLmFsbCgpO1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLmZvckVhY2goKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVGV4dERvY3VtZW50RWRpdC5pcyhjaGFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RWRpdENoYW5nZSA9IG5ldyBUZXh0RWRpdENoYW5nZUltcGwoY2hhbmdlLmVkaXRzLCB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNbY2hhbmdlLnRleHREb2N1bWVudC51cmldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdvcmtzcGFjZUVkaXQuY2hhbmdlcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHdvcmtzcGFjZUVkaXQuY2hhbmdlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRFZGl0Q2hhbmdlID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbCh3b3Jrc3BhY2VFZGl0LmNoYW5nZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0ge307XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdW5kZXJseWluZyB7QGxpbmsgV29ya3NwYWNlRWRpdH0gbGl0ZXJhbFxuICAgICAqIHVzZSB0byBiZSByZXR1cm5lZCBmcm9tIGEgd29ya3NwYWNlIGVkaXQgb3BlcmF0aW9uIGxpa2UgcmVuYW1lLlxuICAgICAqL1xuICAgIGdldCBlZGl0KCkge1xuICAgICAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZUFubm90YXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya3NwYWNlRWRpdDtcbiAgICB9XG4gICAgZ2V0VGV4dEVkaXRDaGFuZ2Uoa2V5KSB7XG4gICAgICAgIGlmIChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0ZXh0RG9jdW1lbnQgPSB7IHVyaToga2V5LnVyaSwgdmVyc2lvbjoga2V5LnZlcnNpb24gfTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl90ZXh0RWRpdENoYW5nZXNbdGV4dERvY3VtZW50LnVyaV07XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dERvY3VtZW50RWRpdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dERvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBlZGl0c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaCh0ZXh0RG9jdW1lbnRFZGl0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKGVkaXRzLCB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW3RleHREb2N1bWVudC51cmldID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIG5vcm1hbCB0ZXh0IGVkaXQgY2hhbmdlcy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGVkaXRzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzW2tleV0gPSBlZGl0cztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKGVkaXRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdERvY3VtZW50Q2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQgJiYgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFubm90YXRpb25zID0gbmV3IENoYW5nZUFubm90YXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLmFsbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXRDaGFuZ2VzKCkge1xuICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVGaWxlKHVyaSwgb3B0aW9uc09yQW5ub3RhdGlvbiwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFubm90YXRpb247XG4gICAgICAgIGlmIChDaGFuZ2VBbm5vdGF0aW9uLmlzKG9wdGlvbnNPckFubm90YXRpb24pIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKG9wdGlvbnNPckFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBhbm5vdGF0aW9uID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcGVyYXRpb247XG4gICAgICAgIGxldCBpZDtcbiAgICAgICAgaWYgKGFubm90YXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikgPyBhbm5vdGF0aW9uIDogdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmFtZUZpbGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhbm5vdGF0aW9uO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3BlcmF0aW9uO1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IFJlbmFtZUZpbGUuY3JlYXRlKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikgPyBhbm5vdGF0aW9uIDogdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gUmVuYW1lRmlsZS5jcmVhdGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnMsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5wdXNoKG9wZXJhdGlvbik7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlRmlsZSh1cmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhbm5vdGF0aW9uO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3BlcmF0aW9uO1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IERlbGV0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZCA9IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pID8gYW5ub3RhdGlvbiA6IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IERlbGV0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucywgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2gob3BlcmF0aW9uKTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgVGV4dERvY3VtZW50SWRlbnRpZmllcn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50SWRlbnRpZmllcjtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50SWRlbnRpZmllcikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgVGV4dERvY3VtZW50SWRlbnRpZmllciBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmkpIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpIH07XG4gICAgfVxuICAgIFRleHREb2N1bWVudElkZW50aWZpZXIuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgVGV4dERvY3VtZW50SWRlbnRpZmllcn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudElkZW50aWZpZXIuaXMgPSBpcztcbn0pKFRleHREb2N1bWVudElkZW50aWZpZXIgfHwgKFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uIChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIGRvY3VtZW50J3MgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCB2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiB7IHVyaSwgdmVyc2lvbiB9O1xuICAgIH1cbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJ9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIElzLmludGVnZXIoY2FuZGlkYXRlLnZlcnNpb24pO1xuICAgIH1cbiAgICBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzID0gaXM7XG59KShWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyID0ge30pKTtcbi8qKlxuICogVGhlIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJ9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcjtcbihmdW5jdGlvbiAoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgZG9jdW1lbnQncyB2ZXJzaW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpLCB2ZXJzaW9uIH07XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJ9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUudmVyc2lvbiA9PT0gbnVsbCB8fCBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSk7XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dERvY3VtZW50SXRlbSBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBUZXh0RG9jdW1lbnRJdGVtfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnRJdGVtO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRJdGVtKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBUZXh0RG9jdW1lbnRJdGVtIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIGxhbmd1YWdlSWQgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgZG9jdW1lbnQncyB2ZXJzaW9uIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgZG9jdW1lbnQncyB0ZXh0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCB0ZXh0IH07XG4gICAgfVxuICAgIFRleHREb2N1bWVudEl0ZW0uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgVGV4dERvY3VtZW50SXRlbX0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYW5ndWFnZUlkKSAmJiBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRleHQpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRJdGVtLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRJdGVtIHx8IChUZXh0RG9jdW1lbnRJdGVtID0ge30pKTtcbi8qKlxuICogRGVzY3JpYmVzIHRoZSBjb250ZW50IHR5cGUgdGhhdCBhIGNsaWVudCBzdXBwb3J0cyBpbiB2YXJpb3VzXG4gKiByZXN1bHQgbGl0ZXJhbHMgbGlrZSBgSG92ZXJgLCBgUGFyYW1ldGVySW5mb2Agb3IgYENvbXBsZXRpb25JdGVtYC5cbiAqXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGBNYXJrdXBLaW5kc2AgbXVzdCBub3Qgc3RhcnQgd2l0aCBhIGAkYC4gVGhpcyBraW5kc1xuICogYXJlIHJlc2VydmVkIGZvciBpbnRlcm5hbCB1c2FnZS5cbiAqL1xuZXhwb3J0IHZhciBNYXJrdXBLaW5kO1xuKGZ1bmN0aW9uIChNYXJrdXBLaW5kKSB7XG4gICAgLyoqXG4gICAgICogUGxhaW4gdGV4dCBpcyBzdXBwb3J0ZWQgYXMgYSBjb250ZW50IGZvcm1hdFxuICAgICAqL1xuICAgIE1hcmt1cEtpbmQuUGxhaW5UZXh0ID0gJ3BsYWludGV4dCc7XG4gICAgLyoqXG4gICAgICogTWFya2Rvd24gaXMgc3VwcG9ydGVkIGFzIGEgY29udGVudCBmb3JtYXRcbiAgICAgKi9cbiAgICBNYXJrdXBLaW5kLk1hcmtkb3duID0gJ21hcmtkb3duJztcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSB2YWx1ZSBvZiB0aGUge0BsaW5rIE1hcmt1cEtpbmR9IHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgPT09IE1hcmt1cEtpbmQuUGxhaW5UZXh0IHx8IGNhbmRpZGF0ZSA9PT0gTWFya3VwS2luZC5NYXJrZG93bjtcbiAgICB9XG4gICAgTWFya3VwS2luZC5pcyA9IGlzO1xufSkoTWFya3VwS2luZCB8fCAoTWFya3VwS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIE1hcmt1cENvbnRlbnQ7XG4oZnVuY3Rpb24gKE1hcmt1cENvbnRlbnQpIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIHtAbGluayBNYXJrdXBDb250ZW50fSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKHZhbHVlKSAmJiBNYXJrdXBLaW5kLmlzKGNhbmRpZGF0ZS5raW5kKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnZhbHVlKTtcbiAgICB9XG4gICAgTWFya3VwQ29udGVudC5pcyA9IGlzO1xufSkoTWFya3VwQ29udGVudCB8fCAoTWFya3VwQ29udGVudCA9IHt9KSk7XG4vKipcbiAqIFRoZSBraW5kIG9mIGEgY29tcGxldGlvbiBlbnRyeS5cbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbUtpbmQ7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtS2luZCkge1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5UZXh0ID0gMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuTWV0aG9kID0gMjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24gPSAzO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Db25zdHJ1Y3RvciA9IDQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkID0gNTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGUgPSA2O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5DbGFzcyA9IDc7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkludGVyZmFjZSA9IDg7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLk1vZHVsZSA9IDk7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5ID0gMTA7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlVuaXQgPSAxMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVmFsdWUgPSAxMjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRW51bSA9IDEzO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkID0gMTQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQgPSAxNTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29sb3IgPSAxNjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRmlsZSA9IDE3O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5SZWZlcmVuY2UgPSAxODtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRm9sZGVyID0gMTk7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkVudW1NZW1iZXIgPSAyMDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29uc3RhbnQgPSAyMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuU3RydWN0ID0gMjI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkV2ZW50ID0gMjM7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLk9wZXJhdG9yID0gMjQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlR5cGVQYXJhbWV0ZXIgPSAyNTtcbn0pKENvbXBsZXRpb25JdGVtS2luZCB8fCAoQ29tcGxldGlvbkl0ZW1LaW5kID0ge30pKTtcbi8qKlxuICogRGVmaW5lcyB3aGV0aGVyIHRoZSBpbnNlcnQgdGV4dCBpbiBhIGNvbXBsZXRpb24gaXRlbSBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXNcbiAqIHBsYWluIHRleHQgb3IgYSBzbmlwcGV0LlxuICovXG5leHBvcnQgdmFyIEluc2VydFRleHRGb3JtYXQ7XG4oZnVuY3Rpb24gKEluc2VydFRleHRGb3JtYXQpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcHJpbWFyeSB0ZXh0IHRvIGJlIGluc2VydGVkIGlzIHRyZWF0ZWQgYXMgYSBwbGFpbiBzdHJpbmcuXG4gICAgICovXG4gICAgSW5zZXJ0VGV4dEZvcm1hdC5QbGFpblRleHQgPSAxO1xuICAgIC8qKlxuICAgICAqIFRoZSBwcmltYXJ5IHRleHQgdG8gYmUgaW5zZXJ0ZWQgaXMgdHJlYXRlZCBhcyBhIHNuaXBwZXQuXG4gICAgICpcbiAgICAgKiBBIHNuaXBwZXQgY2FuIGRlZmluZSB0YWIgc3RvcHMgYW5kIHBsYWNlaG9sZGVycyB3aXRoIGAkMWAsIGAkMmBcbiAgICAgKiBhbmQgYCR7Mzpmb299YC4gYCQwYCBkZWZpbmVzIHRoZSBmaW5hbCB0YWIgc3RvcCwgaXQgZGVmYXVsdHMgdG9cbiAgICAgKiB0aGUgZW5kIG9mIHRoZSBzbmlwcGV0LiBQbGFjZWhvbGRlcnMgd2l0aCBlcXVhbCBpZGVudGlmaWVycyBhcmUgbGlua2VkLFxuICAgICAqIHRoYXQgaXMgdHlwaW5nIGluIG9uZSB3aWxsIHVwZGF0ZSBvdGhlcnMgdG9vLlxuICAgICAqXG4gICAgICogU2VlIGFsc286IGh0dHBzOi8vbWljcm9zb2Z0LmdpdGh1Yi5pby9sYW5ndWFnZS1zZXJ2ZXItcHJvdG9jb2wvc3BlY2lmaWNhdGlvbnMvc3BlY2lmaWNhdGlvbi1jdXJyZW50LyNzbmlwcGV0X3N5bnRheFxuICAgICAqL1xuICAgIEluc2VydFRleHRGb3JtYXQuU25pcHBldCA9IDI7XG59KShJbnNlcnRUZXh0Rm9ybWF0IHx8IChJbnNlcnRUZXh0Rm9ybWF0ID0ge30pKTtcbi8qKlxuICogQ29tcGxldGlvbiBpdGVtIHRhZ3MgYXJlIGV4dHJhIGFubm90YXRpb25zIHRoYXQgdHdlYWsgdGhlIHJlbmRlcmluZyBvZiBhIGNvbXBsZXRpb25cbiAqIGl0ZW0uXG4gKlxuICogQHNpbmNlIDMuMTUuMFxuICovXG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtVGFnO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbVRhZykge1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIGNvbXBsZXRpb24gYXMgb2Jzb2xldGUsIHVzdWFsbHkgdXNpbmcgYSBzdHJpa2Utb3V0LlxuICAgICAqL1xuICAgIENvbXBsZXRpb25JdGVtVGFnLkRlcHJlY2F0ZWQgPSAxO1xufSkoQ29tcGxldGlvbkl0ZW1UYWcgfHwgKENvbXBsZXRpb25JdGVtVGFnID0ge30pKTtcbi8qKlxuICogVGhlIEluc2VydFJlcGxhY2VFZGl0IG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIGluc2VydCAvIHJlcGxhY2UgZWRpdHMuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG5leHBvcnQgdmFyIEluc2VydFJlcGxhY2VFZGl0O1xuKGZ1bmN0aW9uIChJbnNlcnRSZXBsYWNlRWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zZXJ0IC8gcmVwbGFjZSBlZGl0XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5ld1RleHQsIGluc2VydCwgcmVwbGFjZSkge1xuICAgICAgICByZXR1cm4geyBuZXdUZXh0LCBpbnNlcnQsIHJlcGxhY2UgfTtcbiAgICB9XG4gICAgSW5zZXJ0UmVwbGFjZUVkaXQuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgSW5zZXJ0UmVwbGFjZUVkaXR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1RleHQpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5pbnNlcnQpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yZXBsYWNlKTtcbiAgICB9XG4gICAgSW5zZXJ0UmVwbGFjZUVkaXQuaXMgPSBpcztcbn0pKEluc2VydFJlcGxhY2VFZGl0IHx8IChJbnNlcnRSZXBsYWNlRWRpdCA9IHt9KSk7XG4vKipcbiAqIEhvdyB3aGl0ZXNwYWNlIGFuZCBpbmRlbnRhdGlvbiBpcyBoYW5kbGVkIGR1cmluZyBjb21wbGV0aW9uXG4gKiBpdGVtIGluc2VydGlvbi5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbmV4cG9ydCB2YXIgSW5zZXJ0VGV4dE1vZGU7XG4oZnVuY3Rpb24gKEluc2VydFRleHRNb2RlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGluc2VydGlvbiBvciByZXBsYWNlIHN0cmluZ3MgaXMgdGFrZW4gYXMgaXQgaXMuIElmIHRoZVxuICAgICAqIHZhbHVlIGlzIG11bHRpIGxpbmUgdGhlIGxpbmVzIGJlbG93IHRoZSBjdXJzb3Igd2lsbCBiZVxuICAgICAqIGluc2VydGVkIHVzaW5nIHRoZSBpbmRlbnRhdGlvbiBkZWZpbmVkIGluIHRoZSBzdHJpbmcgdmFsdWUuXG4gICAgICogVGhlIGNsaWVudCB3aWxsIG5vdCBhcHBseSBhbnkga2luZCBvZiBhZGp1c3RtZW50cyB0byB0aGVcbiAgICAgKiBzdHJpbmcuXG4gICAgICovXG4gICAgSW5zZXJ0VGV4dE1vZGUuYXNJcyA9IDE7XG4gICAgLyoqXG4gICAgICogVGhlIGVkaXRvciBhZGp1c3RzIGxlYWRpbmcgd2hpdGVzcGFjZSBvZiBuZXcgbGluZXMgc28gdGhhdFxuICAgICAqIHRoZXkgbWF0Y2ggdGhlIGluZGVudGF0aW9uIHVwIHRvIHRoZSBjdXJzb3Igb2YgdGhlIGxpbmUgZm9yXG4gICAgICogd2hpY2ggdGhlIGl0ZW0gaXMgYWNjZXB0ZWQuXG4gICAgICpcbiAgICAgKiBDb25zaWRlciBhIGxpbmUgbGlrZSB0aGlzOiA8MnRhYnM+PGN1cnNvcj48M3RhYnM+Zm9vLiBBY2NlcHRpbmcgYVxuICAgICAqIG11bHRpIGxpbmUgY29tcGxldGlvbiBpdGVtIGlzIGluZGVudGVkIHVzaW5nIDIgdGFicyBhbmQgYWxsXG4gICAgICogZm9sbG93aW5nIGxpbmVzIGluc2VydGVkIHdpbGwgYmUgaW5kZW50ZWQgdXNpbmcgMiB0YWJzIGFzIHdlbGwuXG4gICAgICovXG4gICAgSW5zZXJ0VGV4dE1vZGUuYWRqdXN0SW5kZW50YXRpb24gPSAyO1xufSkoSW5zZXJ0VGV4dE1vZGUgfHwgKEluc2VydFRleHRNb2RlID0ge30pKTtcbmV4cG9ydCB2YXIgQ29tcGxldGlvbkl0ZW1MYWJlbERldGFpbHM7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtTGFiZWxEZXRhaWxzKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUuZGV0YWlsKSB8fCBjYW5kaWRhdGUuZGV0YWlsID09PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5kZXNjcmlwdGlvbikgfHwgY2FuZGlkYXRlLmRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBDb21wbGV0aW9uSXRlbUxhYmVsRGV0YWlscy5pcyA9IGlzO1xufSkoQ29tcGxldGlvbkl0ZW1MYWJlbERldGFpbHMgfHwgKENvbXBsZXRpb25JdGVtTGFiZWxEZXRhaWxzID0ge30pKTtcbi8qKlxuICogVGhlIENvbXBsZXRpb25JdGVtIG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoXG4gKiBjb21wbGV0aW9uIGl0ZW1zLlxuICovXG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbXBsZXRpb24gaXRlbSBhbmQgc2VlZCBpdCB3aXRoIGEgbGFiZWwuXG4gICAgICogQHBhcmFtIGxhYmVsIFRoZSBjb21wbGV0aW9uIGl0ZW0ncyBsYWJlbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCkge1xuICAgICAgICByZXR1cm4geyBsYWJlbCB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uSXRlbS5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uSXRlbSB8fCAoQ29tcGxldGlvbkl0ZW0gPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tcGxldGlvbkxpc3QgbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGhcbiAqIGNvbXBsZXRpb24gbGlzdHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkxpc3Q7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25MaXN0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb21wbGV0aW9uIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGNvbXBsZXRpb24gaXRlbXMuXG4gICAgICogQHBhcmFtIGlzSW5jb21wbGV0ZSBUaGUgbGlzdCBpcyBub3QgY29tcGxldGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGl0ZW1zLCBpc0luY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIHsgaXRlbXM6IGl0ZW1zID8gaXRlbXMgOiBbXSwgaXNJbmNvbXBsZXRlOiAhIWlzSW5jb21wbGV0ZSB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uTGlzdCB8fCAoQ29tcGxldGlvbkxpc3QgPSB7fSkpO1xuZXhwb3J0IHZhciBNYXJrZWRTdHJpbmc7XG4oZnVuY3Rpb24gKE1hcmtlZFN0cmluZykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXJrZWQgc3RyaW5nIGZyb20gcGxhaW4gdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbGFpblRleHQgVGhlIHBsYWluIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZnJvbVBsYWluVGV4dChwbGFpblRleHQpIHtcbiAgICAgICAgcmV0dXJuIHBsYWluVGV4dC5yZXBsYWNlKC9bXFxcXGAqX3t9W1xcXSgpIytcXC0uIV0vZywgJ1xcXFwkJicpOyAvLyBlc2NhcGUgbWFya2Rvd24gc3ludGF4IHRva2VuczogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC9wcm9qZWN0cy9tYXJrZG93bi9zeW50YXgjYmFja3NsYXNoXG4gICAgfVxuICAgIE1hcmtlZFN0cmluZy5mcm9tUGxhaW5UZXh0ID0gZnJvbVBsYWluVGV4dDtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIHtAbGluayBNYXJrZWRTdHJpbmd9IHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5zdHJpbmcoY2FuZGlkYXRlKSB8fCAoSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2UpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudmFsdWUpKTtcbiAgICB9XG4gICAgTWFya2VkU3RyaW5nLmlzID0gaXM7XG59KShNYXJrZWRTdHJpbmcgfHwgKE1hcmtlZFN0cmluZyA9IHt9KSk7XG5leHBvcnQgdmFyIEhvdmVyO1xuKGZ1bmN0aW9uIChIb3Zlcikge1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBjb25mb3JtcyB0byB0aGUge0BsaW5rIEhvdmVyfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gISFjYW5kaWRhdGUgJiYgSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIChNYXJrdXBDb250ZW50LmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHxcbiAgICAgICAgICAgIE1hcmtlZFN0cmluZy5pcyhjYW5kaWRhdGUuY29udGVudHMpIHx8XG4gICAgICAgICAgICBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5jb250ZW50cywgTWFya2VkU3RyaW5nLmlzKSkgJiYgKHZhbHVlLnJhbmdlID09PSB1bmRlZmluZWQgfHwgUmFuZ2UuaXModmFsdWUucmFuZ2UpKTtcbiAgICB9XG4gICAgSG92ZXIuaXMgPSBpcztcbn0pKEhvdmVyIHx8IChIb3ZlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBQYXJhbWV0ZXJJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBQYXJhbWV0ZXJJbmZvcm1hdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUGFyYW1ldGVySW5mb3JtYXRpb247XG4oZnVuY3Rpb24gKFBhcmFtZXRlckluZm9ybWF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBwYXJhbWV0ZXIgaW5mb3JtYXRpb24gbGl0ZXJhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYWJlbCBBIGxhYmVsIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRhdGlvbiBBIGRvYyBzdHJpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCBkb2N1bWVudGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudGF0aW9uID8geyBsYWJlbCwgZG9jdW1lbnRhdGlvbiB9IDogeyBsYWJlbCB9O1xuICAgIH1cbiAgICBQYXJhbWV0ZXJJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG59KShQYXJhbWV0ZXJJbmZvcm1hdGlvbiB8fCAoUGFyYW1ldGVySW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgU2lnbmF0dXJlSW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgU2lnbmF0dXJlSW5mb3JtYXRpb259IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFNpZ25hdHVyZUluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChTaWduYXR1cmVJbmZvcm1hdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCwgZG9jdW1lbnRhdGlvbiwgLi4ucGFyYW1ldGVycykge1xuICAgICAgICBsZXQgcmVzdWx0ID0geyBsYWJlbCB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChkb2N1bWVudGF0aW9uKSkge1xuICAgICAgICAgICAgcmVzdWx0LmRvY3VtZW50YXRpb24gPSBkb2N1bWVudGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHBhcmFtZXRlcnMpKSB7XG4gICAgICAgICAgICByZXN1bHQucGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucGFyYW1ldGVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIFNpZ25hdHVyZUluZm9ybWF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFNpZ25hdHVyZUluZm9ybWF0aW9uIHx8IChTaWduYXR1cmVJbmZvcm1hdGlvbiA9IHt9KSk7XG4vKipcbiAqIEEgZG9jdW1lbnQgaGlnaGxpZ2h0IGtpbmQuXG4gKi9cbmV4cG9ydCB2YXIgRG9jdW1lbnRIaWdobGlnaHRLaW5kO1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBIHRleHR1YWwgb2NjdXJyZW5jZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuVGV4dCA9IDE7XG4gICAgLyoqXG4gICAgICogUmVhZC1hY2Nlc3Mgb2YgYSBzeW1ib2wsIGxpa2UgcmVhZGluZyBhIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZC5SZWFkID0gMjtcbiAgICAvKipcbiAgICAgKiBXcml0ZS1hY2Nlc3Mgb2YgYSBzeW1ib2wsIGxpa2Ugd3JpdGluZyB0byBhIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIERvY3VtZW50SGlnaGxpZ2h0S2luZC5Xcml0ZSA9IDM7XG59KShEb2N1bWVudEhpZ2hsaWdodEtpbmQgfHwgKERvY3VtZW50SGlnaGxpZ2h0S2luZCA9IHt9KSk7XG4vKipcbiAqIERvY3VtZW50SGlnaGxpZ2h0IG5hbWVzcGFjZSB0byBwcm92aWRlIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgRG9jdW1lbnRIaWdobGlnaHR9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0O1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIERvY3VtZW50SGlnaGxpZ2h0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIHRoZSBoaWdobGlnaHQgYXBwbGllcyB0by5cbiAgICAgKiBAcGFyYW0ga2luZCBUaGUgaGlnaGxpZ2h0IGtpbmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGtpbmQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHsgcmFuZ2UgfTtcbiAgICAgICAgaWYgKElzLm51bWJlcihraW5kKSkge1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIERvY3VtZW50SGlnaGxpZ2h0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKERvY3VtZW50SGlnaGxpZ2h0IHx8IChEb2N1bWVudEhpZ2hsaWdodCA9IHt9KSk7XG4vKipcbiAqIEEgc3ltYm9sIGtpbmQuXG4gKi9cbmV4cG9ydCB2YXIgU3ltYm9sS2luZDtcbihmdW5jdGlvbiAoU3ltYm9sS2luZCkge1xuICAgIFN5bWJvbEtpbmQuRmlsZSA9IDE7XG4gICAgU3ltYm9sS2luZC5Nb2R1bGUgPSAyO1xuICAgIFN5bWJvbEtpbmQuTmFtZXNwYWNlID0gMztcbiAgICBTeW1ib2xLaW5kLlBhY2thZ2UgPSA0O1xuICAgIFN5bWJvbEtpbmQuQ2xhc3MgPSA1O1xuICAgIFN5bWJvbEtpbmQuTWV0aG9kID0gNjtcbiAgICBTeW1ib2xLaW5kLlByb3BlcnR5ID0gNztcbiAgICBTeW1ib2xLaW5kLkZpZWxkID0gODtcbiAgICBTeW1ib2xLaW5kLkNvbnN0cnVjdG9yID0gOTtcbiAgICBTeW1ib2xLaW5kLkVudW0gPSAxMDtcbiAgICBTeW1ib2xLaW5kLkludGVyZmFjZSA9IDExO1xuICAgIFN5bWJvbEtpbmQuRnVuY3Rpb24gPSAxMjtcbiAgICBTeW1ib2xLaW5kLlZhcmlhYmxlID0gMTM7XG4gICAgU3ltYm9sS2luZC5Db25zdGFudCA9IDE0O1xuICAgIFN5bWJvbEtpbmQuU3RyaW5nID0gMTU7XG4gICAgU3ltYm9sS2luZC5OdW1iZXIgPSAxNjtcbiAgICBTeW1ib2xLaW5kLkJvb2xlYW4gPSAxNztcbiAgICBTeW1ib2xLaW5kLkFycmF5ID0gMTg7XG4gICAgU3ltYm9sS2luZC5PYmplY3QgPSAxOTtcbiAgICBTeW1ib2xLaW5kLktleSA9IDIwO1xuICAgIFN5bWJvbEtpbmQuTnVsbCA9IDIxO1xuICAgIFN5bWJvbEtpbmQuRW51bU1lbWJlciA9IDIyO1xuICAgIFN5bWJvbEtpbmQuU3RydWN0ID0gMjM7XG4gICAgU3ltYm9sS2luZC5FdmVudCA9IDI0O1xuICAgIFN5bWJvbEtpbmQuT3BlcmF0b3IgPSAyNTtcbiAgICBTeW1ib2xLaW5kLlR5cGVQYXJhbWV0ZXIgPSAyNjtcbn0pKFN5bWJvbEtpbmQgfHwgKFN5bWJvbEtpbmQgPSB7fSkpO1xuLyoqXG4gKiBTeW1ib2wgdGFncyBhcmUgZXh0cmEgYW5ub3RhdGlvbnMgdGhhdCB0d2VhayB0aGUgcmVuZGVyaW5nIG9mIGEgc3ltYm9sLlxuICpcbiAqIEBzaW5jZSAzLjE2XG4gKi9cbmV4cG9ydCB2YXIgU3ltYm9sVGFnO1xuKGZ1bmN0aW9uIChTeW1ib2xUYWcpIHtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBzeW1ib2wgYXMgb2Jzb2xldGUsIHVzdWFsbHkgdXNpbmcgYSBzdHJpa2Utb3V0LlxuICAgICAqL1xuICAgIFN5bWJvbFRhZy5EZXByZWNhdGVkID0gMTtcbn0pKFN5bWJvbFRhZyB8fCAoU3ltYm9sVGFnID0ge30pKTtcbmV4cG9ydCB2YXIgU3ltYm9sSW5mb3JtYXRpb247XG4oZnVuY3Rpb24gKFN5bWJvbEluZm9ybWF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzeW1ib2wgaW5mb3JtYXRpb24gbGl0ZXJhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIHJlc291cmNlIG9mIHRoZSBsb2NhdGlvbiBvZiBzeW1ib2wuXG4gICAgICogQHBhcmFtIGNvbnRhaW5lck5hbWUgVGhlIG5hbWUgb2YgdGhlIHN5bWJvbCBjb250YWluaW5nIHRoZSBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIGtpbmQsIHJhbmdlLCB1cmksIGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbG9jYXRpb246IHsgdXJpLCByYW5nZSB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb250YWluZXJOYW1lKSB7XG4gICAgICAgICAgICByZXN1bHQuY29udGFpbmVyTmFtZSA9IGNvbnRhaW5lck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgU3ltYm9sSW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xufSkoU3ltYm9sSW5mb3JtYXRpb24gfHwgKFN5bWJvbEluZm9ybWF0aW9uID0ge30pKTtcbmV4cG9ydCB2YXIgV29ya3NwYWNlU3ltYm9sO1xuKGZ1bmN0aW9uIChXb3Jrc3BhY2VTeW1ib2wpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd29ya3NwYWNlIHN5bWJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSByZXNvdXJjZSBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgQW4gb3B0aW9ucyByYW5nZSBvZiB0aGUgbG9jYXRpb24uXG4gICAgICogQHJldHVybnMgQSBXb3Jrc3BhY2VTeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIGtpbmQsIHVyaSwgcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8geyBuYW1lLCBraW5kLCBsb2NhdGlvbjogeyB1cmksIHJhbmdlIH0gfVxuICAgICAgICAgICAgOiB7IG5hbWUsIGtpbmQsIGxvY2F0aW9uOiB7IHVyaSB9IH07XG4gICAgfVxuICAgIFdvcmtzcGFjZVN5bWJvbC5jcmVhdGUgPSBjcmVhdGU7XG59KShXb3Jrc3BhY2VTeW1ib2wgfHwgKFdvcmtzcGFjZVN5bWJvbCA9IHt9KSk7XG5leHBvcnQgdmFyIERvY3VtZW50U3ltYm9sO1xuKGZ1bmN0aW9uIChEb2N1bWVudFN5bWJvbCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc3ltYm9sIGluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBkZXRhaWwgVGhlIGRldGFpbCBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBzZWxlY3Rpb25SYW5nZSBUaGUgc2VsZWN0aW9uUmFuZ2Ugb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gY2hpbGRyZW4gQ2hpbGRyZW4gb2YgdGhlIHN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwgZGV0YWlsLCBraW5kLCByYW5nZSwgc2VsZWN0aW9uUmFuZ2UsIGNoaWxkcmVuKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgZGV0YWlsLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2VcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIERvY3VtZW50U3ltYm9sLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIERvY3VtZW50U3ltYm9sfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmXG4gICAgICAgICAgICBJcy5zdHJpbmcoY2FuZGlkYXRlLm5hbWUpICYmIElzLm51bWJlcihjYW5kaWRhdGUua2luZCkgJiZcbiAgICAgICAgICAgIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnNlbGVjdGlvblJhbmdlKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kZXRhaWwgPT09IHVuZGVmaW5lZCB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmRldGFpbCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRlcHJlY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5kZXByZWNhdGVkKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuY2hpbGRyZW4gPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5jaGlsZHJlbikpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLnRhZ3MgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS50YWdzKSk7XG4gICAgfVxuICAgIERvY3VtZW50U3ltYm9sLmlzID0gaXM7XG59KShEb2N1bWVudFN5bWJvbCB8fCAoRG9jdW1lbnRTeW1ib2wgPSB7fSkpO1xuLyoqXG4gKiBBIHNldCBvZiBwcmVkZWZpbmVkIGNvZGUgYWN0aW9uIGtpbmRzXG4gKi9cbmV4cG9ydCB2YXIgQ29kZUFjdGlvbktpbmQ7XG4oZnVuY3Rpb24gKENvZGVBY3Rpb25LaW5kKSB7XG4gICAgLyoqXG4gICAgICogRW1wdHkga2luZC5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5FbXB0eSA9ICcnO1xuICAgIC8qKlxuICAgICAqIEJhc2Uga2luZCBmb3IgcXVpY2tmaXggYWN0aW9uczogJ3F1aWNrZml4J1xuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlF1aWNrRml4ID0gJ3F1aWNrZml4JztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHJlZmFjdG9yaW5nIGFjdGlvbnM6ICdyZWZhY3RvcidcbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5SZWZhY3RvciA9ICdyZWZhY3Rvcic7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBleHRyYWN0aW9uIGFjdGlvbnM6ICdyZWZhY3Rvci5leHRyYWN0J1xuICAgICAqXG4gICAgICogRXhhbXBsZSBleHRyYWN0IGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIEV4dHJhY3QgbWV0aG9kXG4gICAgICogLSBFeHRyYWN0IGZ1bmN0aW9uXG4gICAgICogLSBFeHRyYWN0IHZhcmlhYmxlXG4gICAgICogLSBFeHRyYWN0IGludGVyZmFjZSBmcm9tIGNsYXNzXG4gICAgICogLSAuLi5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5SZWZhY3RvckV4dHJhY3QgPSAncmVmYWN0b3IuZXh0cmFjdCc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBpbmxpbmUgYWN0aW9uczogJ3JlZmFjdG9yLmlubGluZSdcbiAgICAgKlxuICAgICAqIEV4YW1wbGUgaW5saW5lIGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIElubGluZSBmdW5jdGlvblxuICAgICAqIC0gSW5saW5lIHZhcmlhYmxlXG4gICAgICogLSBJbmxpbmUgY29uc3RhbnRcbiAgICAgKiAtIC4uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9ySW5saW5lID0gJ3JlZmFjdG9yLmlubGluZSc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyByZXdyaXRlIGFjdGlvbnM6ICdyZWZhY3Rvci5yZXdyaXRlJ1xuICAgICAqXG4gICAgICogRXhhbXBsZSByZXdyaXRlIGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIENvbnZlcnQgSmF2YVNjcmlwdCBmdW5jdGlvbiB0byBjbGFzc1xuICAgICAqIC0gQWRkIG9yIHJlbW92ZSBwYXJhbWV0ZXJcbiAgICAgKiAtIEVuY2Fwc3VsYXRlIGZpZWxkXG4gICAgICogLSBNYWtlIG1ldGhvZCBzdGF0aWNcbiAgICAgKiAtIE1vdmUgbWV0aG9kIHRvIGJhc2UgY2xhc3NcbiAgICAgKiAtIC4uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yUmV3cml0ZSA9ICdyZWZhY3Rvci5yZXdyaXRlJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHNvdXJjZSBhY3Rpb25zOiBgc291cmNlYFxuICAgICAqXG4gICAgICogU291cmNlIGNvZGUgYWN0aW9ucyBhcHBseSB0byB0aGUgZW50aXJlIGZpbGUuXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuU291cmNlID0gJ3NvdXJjZSc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciBhbiBvcmdhbml6ZSBpbXBvcnRzIHNvdXJjZSBhY3Rpb246IGBzb3VyY2Uub3JnYW5pemVJbXBvcnRzYFxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlNvdXJjZU9yZ2FuaXplSW1wb3J0cyA9ICdzb3VyY2Uub3JnYW5pemVJbXBvcnRzJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIGF1dG8tZml4IHNvdXJjZSBhY3Rpb25zOiBgc291cmNlLmZpeEFsbGAuXG4gICAgICpcbiAgICAgKiBGaXggYWxsIGFjdGlvbnMgYXV0b21hdGljYWxseSBmaXggZXJyb3JzIHRoYXQgaGF2ZSBhIGNsZWFyIGZpeCB0aGF0IGRvIG5vdCByZXF1aXJlIHVzZXIgaW5wdXQuXG4gICAgICogVGhleSBzaG91bGQgbm90IHN1cHByZXNzIGVycm9ycyBvciBwZXJmb3JtIHVuc2FmZSBmaXhlcyBzdWNoIGFzIGdlbmVyYXRpbmcgbmV3IHR5cGVzIG9yIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMy4xNS4wXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuU291cmNlRml4QWxsID0gJ3NvdXJjZS5maXhBbGwnO1xufSkoQ29kZUFjdGlvbktpbmQgfHwgKENvZGVBY3Rpb25LaW5kID0ge30pKTtcbi8qKlxuICogVGhlIHJlYXNvbiB3aHkgY29kZSBhY3Rpb25zIHdlcmUgcmVxdWVzdGVkLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xuZXhwb3J0IHZhciBDb2RlQWN0aW9uVHJpZ2dlcktpbmQ7XG4oZnVuY3Rpb24gKENvZGVBY3Rpb25UcmlnZ2VyS2luZCkge1xuICAgIC8qKlxuICAgICAqIENvZGUgYWN0aW9ucyB3ZXJlIGV4cGxpY2l0bHkgcmVxdWVzdGVkIGJ5IHRoZSB1c2VyIG9yIGJ5IGFuIGV4dGVuc2lvbi5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uVHJpZ2dlcktpbmQuSW52b2tlZCA9IDE7XG4gICAgLyoqXG4gICAgICogQ29kZSBhY3Rpb25zIHdlcmUgcmVxdWVzdGVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICpcbiAgICAgKiBUaGlzIHR5cGljYWxseSBoYXBwZW5zIHdoZW4gY3VycmVudCBzZWxlY3Rpb24gaW4gYSBmaWxlIGNoYW5nZXMsIGJ1dCBjYW5cbiAgICAgKiBhbHNvIGJlIHRyaWdnZXJlZCB3aGVuIGZpbGUgY29udGVudCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25UcmlnZ2VyS2luZC5BdXRvbWF0aWMgPSAyO1xufSkoQ29kZUFjdGlvblRyaWdnZXJLaW5kIHx8IChDb2RlQWN0aW9uVHJpZ2dlcktpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29kZUFjdGlvbkNvbnRleHQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgQ29kZUFjdGlvbkNvbnRleHR9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVBY3Rpb25Db250ZXh0O1xuKGZ1bmN0aW9uIChDb2RlQWN0aW9uQ29udGV4dCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUFjdGlvbkNvbnRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlhZ25vc3RpY3MsIG9ubHksIHRyaWdnZXJLaW5kKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7IGRpYWdub3N0aWNzIH07XG4gICAgICAgIGlmIChvbmx5ICE9PSB1bmRlZmluZWQgJiYgb25seSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0Lm9ubHkgPSBvbmx5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmlnZ2VyS2luZCAhPT0gdW5kZWZpbmVkICYmIHRyaWdnZXJLaW5kICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXN1bHQudHJpZ2dlcktpbmQgPSB0cmlnZ2VyS2luZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb2RlQWN0aW9uQ29udGV4dH0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5kaWFnbm9zdGljcywgRGlhZ25vc3RpYy5pcylcbiAgICAgICAgICAgICYmIChjYW5kaWRhdGUub25seSA9PT0gdW5kZWZpbmVkIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLm9ubHksIElzLnN0cmluZykpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnRyaWdnZXJLaW5kID09PSB1bmRlZmluZWQgfHwgY2FuZGlkYXRlLnRyaWdnZXJLaW5kID09PSBDb2RlQWN0aW9uVHJpZ2dlcktpbmQuSW52b2tlZCB8fCBjYW5kaWRhdGUudHJpZ2dlcktpbmQgPT09IENvZGVBY3Rpb25UcmlnZ2VyS2luZC5BdXRvbWF0aWMpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5pcyA9IGlzO1xufSkoQ29kZUFjdGlvbkNvbnRleHQgfHwgKENvZGVBY3Rpb25Db250ZXh0ID0ge30pKTtcbmV4cG9ydCB2YXIgQ29kZUFjdGlvbjtcbihmdW5jdGlvbiAoQ29kZUFjdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0aXRsZSwga2luZE9yQ29tbWFuZE9yRWRpdCwga2luZCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0geyB0aXRsZSB9O1xuICAgICAgICBsZXQgY2hlY2tLaW5kID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBraW5kT3JDb21tYW5kT3JFZGl0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY2hlY2tLaW5kID0gZmFsc2U7XG4gICAgICAgICAgICByZXN1bHQua2luZCA9IGtpbmRPckNvbW1hbmRPckVkaXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ29tbWFuZC5pcyhraW5kT3JDb21tYW5kT3JFZGl0KSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvbW1hbmQgPSBraW5kT3JDb21tYW5kT3JFZGl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmVkaXQgPSBraW5kT3JDb21tYW5kT3JFZGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja0tpbmQgJiYga2luZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQua2luZCA9IGtpbmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgQ29kZUFjdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLnN0cmluZyhjYW5kaWRhdGUudGl0bGUpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRpYWdub3N0aWNzID09PSB1bmRlZmluZWQgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuZGlhZ25vc3RpY3MsIERpYWdub3N0aWMuaXMpKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5raW5kID09PSB1bmRlZmluZWQgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5raW5kKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuZWRpdCAhPT0gdW5kZWZpbmVkIHx8IGNhbmRpZGF0ZS5jb21tYW5kICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmNvbW1hbmQgPT09IHVuZGVmaW5lZCB8fCBDb21tYW5kLmlzKGNhbmRpZGF0ZS5jb21tYW5kKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuaXNQcmVmZXJyZWQgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5pc1ByZWZlcnJlZCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmVkaXQgPT09IHVuZGVmaW5lZCB8fCBXb3Jrc3BhY2VFZGl0LmlzKGNhbmRpZGF0ZS5lZGl0KSk7XG4gICAgfVxuICAgIENvZGVBY3Rpb24uaXMgPSBpcztcbn0pKENvZGVBY3Rpb24gfHwgKENvZGVBY3Rpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29kZUxlbnMgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgQ29kZUxlbnN9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVMZW5zO1xuKGZ1bmN0aW9uIChDb2RlTGVucykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUxlbnMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHsgcmFuZ2UgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoZGF0YSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDb2RlTGVucy5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb2RlTGVuc30gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvbW1hbmQpIHx8IENvbW1hbmQuaXMoY2FuZGlkYXRlLmNvbW1hbmQpKTtcbiAgICB9XG4gICAgQ29kZUxlbnMuaXMgPSBpcztcbn0pKENvZGVMZW5zIHx8IChDb2RlTGVucyA9IHt9KSk7XG4vKipcbiAqIFRoZSBGb3JtYXR0aW5nT3B0aW9ucyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBGb3JtYXR0aW5nT3B0aW9uc30gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgRm9ybWF0dGluZ09wdGlvbnM7XG4oZnVuY3Rpb24gKEZvcm1hdHRpbmdPcHRpb25zKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBGb3JtYXR0aW5nT3B0aW9ucyBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0YWJTaXplLCBpbnNlcnRTcGFjZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgdGFiU2l6ZSwgaW5zZXJ0U3BhY2VzIH07XG4gICAgfVxuICAgIEZvcm1hdHRpbmdPcHRpb25zLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIEZvcm1hdHRpbmdPcHRpb25zfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS50YWJTaXplKSAmJiBJcy5ib29sZWFuKGNhbmRpZGF0ZS5pbnNlcnRTcGFjZXMpO1xuICAgIH1cbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5pcyA9IGlzO1xufSkoRm9ybWF0dGluZ09wdGlvbnMgfHwgKEZvcm1hdHRpbmdPcHRpb25zID0ge30pKTtcbi8qKlxuICogVGhlIERvY3VtZW50TGluayBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBEb2N1bWVudExpbmt9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50TGluaztcbihmdW5jdGlvbiAoRG9jdW1lbnRMaW5rKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEb2N1bWVudExpbmsgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHRhcmdldCwgZGF0YSkge1xuICAgICAgICByZXR1cm4geyByYW5nZSwgdGFyZ2V0LCBkYXRhIH07XG4gICAgfVxuICAgIERvY3VtZW50TGluay5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBEb2N1bWVudExpbmt9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS50YXJnZXQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUudGFyZ2V0KSk7XG4gICAgfVxuICAgIERvY3VtZW50TGluay5pcyA9IGlzO1xufSkoRG9jdW1lbnRMaW5rIHx8IChEb2N1bWVudExpbmsgPSB7fSkpO1xuLyoqXG4gKiBUaGUgU2VsZWN0aW9uUmFuZ2UgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byB3b3JrIHdpdGhcbiAqIFNlbGVjdGlvblJhbmdlIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFNlbGVjdGlvblJhbmdlO1xuKGZ1bmN0aW9uIChTZWxlY3Rpb25SYW5nZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU2VsZWN0aW9uUmFuZ2VcbiAgICAgKiBAcGFyYW0gcmFuZ2UgdGhlIHJhbmdlLlxuICAgICAqIEBwYXJhbSBwYXJlbnQgYW4gb3B0aW9uYWwgcGFyZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgcGFyZW50KSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlLCBwYXJlbnQgfTtcbiAgICB9XG4gICAgU2VsZWN0aW9uUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIChjYW5kaWRhdGUucGFyZW50ID09PSB1bmRlZmluZWQgfHwgU2VsZWN0aW9uUmFuZ2UuaXMoY2FuZGlkYXRlLnBhcmVudCkpO1xuICAgIH1cbiAgICBTZWxlY3Rpb25SYW5nZS5pcyA9IGlzO1xufSkoU2VsZWN0aW9uUmFuZ2UgfHwgKFNlbGVjdGlvblJhbmdlID0ge30pKTtcbi8qKlxuICogQSBzZXQgb2YgcHJlZGVmaW5lZCB0b2tlbiB0eXBlcy4gVGhpcyBzZXQgaXMgbm90IGZpeGVkXG4gKiBhbiBjbGllbnRzIGNhbiBzcGVjaWZ5IGFkZGl0aW9uYWwgdG9rZW4gdHlwZXMgdmlhIHRoZVxuICogY29ycmVzcG9uZGluZyBjbGllbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBTZW1hbnRpY1Rva2VuVHlwZXM7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5UeXBlcykge1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcIm5hbWVzcGFjZVwiXSA9IFwibmFtZXNwYWNlXCI7XG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50cyBhIGdlbmVyaWMgdHlwZS4gQWN0cyBhcyBhIGZhbGxiYWNrIGZvciB0eXBlcyB3aGljaCBjYW4ndCBiZSBtYXBwZWQgdG9cbiAgICAgKiBhIHNwZWNpZmljIHR5cGUgbGlrZSBjbGFzcyBvciBlbnVtLlxuICAgICAqL1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInR5cGVcIl0gPSBcInR5cGVcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJjbGFzc1wiXSA9IFwiY2xhc3NcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJlbnVtXCJdID0gXCJlbnVtXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiaW50ZXJmYWNlXCJdID0gXCJpbnRlcmZhY2VcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJzdHJ1Y3RcIl0gPSBcInN0cnVjdFwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInR5cGVQYXJhbWV0ZXJcIl0gPSBcInR5cGVQYXJhbWV0ZXJcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJwYXJhbWV0ZXJcIl0gPSBcInBhcmFtZXRlclwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInZhcmlhYmxlXCJdID0gXCJ2YXJpYWJsZVwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInByb3BlcnR5XCJdID0gXCJwcm9wZXJ0eVwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcImVudW1NZW1iZXJcIl0gPSBcImVudW1NZW1iZXJcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJldmVudFwiXSA9IFwiZXZlbnRcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJmdW5jdGlvblwiXSA9IFwiZnVuY3Rpb25cIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJtZXRob2RcIl0gPSBcIm1ldGhvZFwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcIm1hY3JvXCJdID0gXCJtYWNyb1wiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcImtleXdvcmRcIl0gPSBcImtleXdvcmRcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJtb2RpZmllclwiXSA9IFwibW9kaWZpZXJcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJjb21tZW50XCJdID0gXCJjb21tZW50XCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wic3RyaW5nXCJdID0gXCJzdHJpbmdcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJudW1iZXJcIl0gPSBcIm51bWJlclwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInJlZ2V4cFwiXSA9IFwicmVnZXhwXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wib3BlcmF0b3JcIl0gPSBcIm9wZXJhdG9yXCI7XG4gICAgLyoqXG4gICAgICogQHNpbmNlIDMuMTcuMFxuICAgICAqL1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcImRlY29yYXRvclwiXSA9IFwiZGVjb3JhdG9yXCI7XG59KShTZW1hbnRpY1Rva2VuVHlwZXMgfHwgKFNlbWFudGljVG9rZW5UeXBlcyA9IHt9KSk7XG4vKipcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgdG9rZW4gbW9kaWZpZXJzLiBUaGlzIHNldCBpcyBub3QgZml4ZWRcbiAqIGFuIGNsaWVudHMgY2FuIHNwZWNpZnkgYWRkaXRpb25hbCB0b2tlbiB0eXBlcyB2aWEgdGhlXG4gKiBjb3JyZXNwb25kaW5nIGNsaWVudCBjYXBhYmlsaXRpZXMuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG5leHBvcnQgdmFyIFNlbWFudGljVG9rZW5Nb2RpZmllcnM7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5Nb2RpZmllcnMpIHtcbiAgICBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzW1wiZGVjbGFyYXRpb25cIl0gPSBcImRlY2xhcmF0aW9uXCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImRlZmluaXRpb25cIl0gPSBcImRlZmluaXRpb25cIjtcbiAgICBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzW1wicmVhZG9ubHlcIl0gPSBcInJlYWRvbmx5XCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcInN0YXRpY1wiXSA9IFwic3RhdGljXCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImRlcHJlY2F0ZWRcIl0gPSBcImRlcHJlY2F0ZWRcIjtcbiAgICBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzW1wiYWJzdHJhY3RcIl0gPSBcImFic3RyYWN0XCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImFzeW5jXCJdID0gXCJhc3luY1wiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJtb2RpZmljYXRpb25cIl0gPSBcIm1vZGlmaWNhdGlvblwiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJkb2N1bWVudGF0aW9uXCJdID0gXCJkb2N1bWVudGF0aW9uXCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImRlZmF1bHRMaWJyYXJ5XCJdID0gXCJkZWZhdWx0TGlicmFyeVwiO1xufSkoU2VtYW50aWNUb2tlbk1vZGlmaWVycyB8fCAoU2VtYW50aWNUb2tlbk1vZGlmaWVycyA9IHt9KSk7XG4vKipcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBTZW1hbnRpY1Rva2VucztcbihmdW5jdGlvbiAoU2VtYW50aWNUb2tlbnMpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiAoY2FuZGlkYXRlLnJlc3VsdElkID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGNhbmRpZGF0ZS5yZXN1bHRJZCA9PT0gJ3N0cmluZycpICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5kYXRhKSAmJiAoY2FuZGlkYXRlLmRhdGEubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBjYW5kaWRhdGUuZGF0YVswXSA9PT0gJ251bWJlcicpO1xuICAgIH1cbiAgICBTZW1hbnRpY1Rva2Vucy5pcyA9IGlzO1xufSkoU2VtYW50aWNUb2tlbnMgfHwgKFNlbWFudGljVG9rZW5zID0ge30pKTtcbi8qKlxuICogVGhlIElubGluZVZhbHVlVGV4dCBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aCBJbmxpbmVWYWx1ZVRleHRzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xuZXhwb3J0IHZhciBJbmxpbmVWYWx1ZVRleHQ7XG4oZnVuY3Rpb24gKElubGluZVZhbHVlVGV4dCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSW5saW5lVmFsdWVUZXh0IGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCB0ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlLCB0ZXh0IH07XG4gICAgfVxuICAgIElubGluZVZhbHVlVGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgIT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUgIT09IG51bGwgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRleHQpO1xuICAgIH1cbiAgICBJbmxpbmVWYWx1ZVRleHQuaXMgPSBpcztcbn0pKElubGluZVZhbHVlVGV4dCB8fCAoSW5saW5lVmFsdWVUZXh0ID0ge30pKTtcbi8qKlxuICogVGhlIElubGluZVZhbHVlVmFyaWFibGVMb29rdXAgbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGggSW5saW5lVmFsdWVWYXJpYWJsZUxvb2t1cHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIElubGluZVZhbHVlVmFyaWFibGVMb29rdXA7XG4oZnVuY3Rpb24gKElubGluZVZhbHVlVmFyaWFibGVMb29rdXApIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IElubGluZVZhbHVlVGV4dCBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgdmFyaWFibGVOYW1lLCBjYXNlU2Vuc2l0aXZlTG9va3VwKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlLCB2YXJpYWJsZU5hbWUsIGNhc2VTZW5zaXRpdmVMb29rdXAgfTtcbiAgICB9XG4gICAgSW5saW5lVmFsdWVWYXJpYWJsZUxvb2t1cC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgIT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUgIT09IG51bGwgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiBJcy5ib29sZWFuKGNhbmRpZGF0ZS5jYXNlU2Vuc2l0aXZlTG9va3VwKVxuICAgICAgICAgICAgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUudmFyaWFibGVOYW1lKSB8fCBjYW5kaWRhdGUudmFyaWFibGVOYW1lID09PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwLmlzID0gaXM7XG59KShJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwIHx8IChJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwID0ge30pKTtcbi8qKlxuICogVGhlIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uIG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xuZXhwb3J0IHZhciBJbmxpbmVWYWx1ZUV2YWx1YXRhYmxlRXhwcmVzc2lvbjtcbihmdW5jdGlvbiAoSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBleHByZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlLCBleHByZXNzaW9uIH07XG4gICAgfVxuICAgIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5leHByZXNzaW9uKSB8fCBjYW5kaWRhdGUuZXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24uaXMgPSBpcztcbn0pKElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uIHx8IChJbmxpbmVWYWx1ZUV2YWx1YXRhYmxlRXhwcmVzc2lvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBJbmxpbmVWYWx1ZUNvbnRleHQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgSW5saW5lVmFsdWVDb250ZXh0fSBsaXRlcmFscy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbmV4cG9ydCB2YXIgSW5saW5lVmFsdWVDb250ZXh0O1xuKGZ1bmN0aW9uIChJbmxpbmVWYWx1ZUNvbnRleHQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IElubGluZVZhbHVlQ29udGV4dCBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShmcmFtZUlkLCBzdG9wcGVkTG9jYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgZnJhbWVJZCwgc3RvcHBlZExvY2F0aW9uIH07XG4gICAgfVxuICAgIElubGluZVZhbHVlQ29udGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBJbmxpbmVWYWx1ZUNvbnRleHR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyh2YWx1ZS5zdG9wcGVkTG9jYXRpb24pO1xuICAgIH1cbiAgICBJbmxpbmVWYWx1ZUNvbnRleHQuaXMgPSBpcztcbn0pKElubGluZVZhbHVlQ29udGV4dCB8fCAoSW5saW5lVmFsdWVDb250ZXh0ID0ge30pKTtcbi8qKlxuICogSW5sYXkgaGludCBraW5kcy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbmV4cG9ydCB2YXIgSW5sYXlIaW50S2luZDtcbihmdW5jdGlvbiAoSW5sYXlIaW50S2luZCkge1xuICAgIC8qKlxuICAgICAqIEFuIGlubGF5IGhpbnQgdGhhdCBmb3IgYSB0eXBlIGFubm90YXRpb24uXG4gICAgICovXG4gICAgSW5sYXlIaW50S2luZC5UeXBlID0gMTtcbiAgICAvKipcbiAgICAgKiBBbiBpbmxheSBoaW50IHRoYXQgaXMgZm9yIGEgcGFyYW1ldGVyLlxuICAgICAqL1xuICAgIElubGF5SGludEtpbmQuUGFyYW1ldGVyID0gMjtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDEgfHwgdmFsdWUgPT09IDI7XG4gICAgfVxuICAgIElubGF5SGludEtpbmQuaXMgPSBpcztcbn0pKElubGF5SGludEtpbmQgfHwgKElubGF5SGludEtpbmQgPSB7fSkpO1xuZXhwb3J0IHZhciBJbmxheUhpbnRMYWJlbFBhcnQ7XG4oZnVuY3Rpb24gKElubGF5SGludExhYmVsUGFydCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgIH1cbiAgICBJbmxheUhpbnRMYWJlbFBhcnQuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnRvb2x0aXAgPT09IHVuZGVmaW5lZCB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRvb2x0aXApIHx8IE1hcmt1cENvbnRlbnQuaXMoY2FuZGlkYXRlLnRvb2x0aXApKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5sb2NhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IExvY2F0aW9uLmlzKGNhbmRpZGF0ZS5sb2NhdGlvbikpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLmNvbW1hbmQgPT09IHVuZGVmaW5lZCB8fCBDb21tYW5kLmlzKGNhbmRpZGF0ZS5jb21tYW5kKSk7XG4gICAgfVxuICAgIElubGF5SGludExhYmVsUGFydC5pcyA9IGlzO1xufSkoSW5sYXlIaW50TGFiZWxQYXJ0IHx8IChJbmxheUhpbnRMYWJlbFBhcnQgPSB7fSkpO1xuZXhwb3J0IHZhciBJbmxheUhpbnQ7XG4oZnVuY3Rpb24gKElubGF5SGludCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShwb3NpdGlvbiwgbGFiZWwsIGtpbmQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyBwb3NpdGlvbiwgbGFiZWwgfTtcbiAgICAgICAgaWYgKGtpbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIElubGF5SGludC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgUG9zaXRpb24uaXMoY2FuZGlkYXRlLnBvc2l0aW9uKVxuICAgICAgICAgICAgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUubGFiZWwpIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmxhYmVsLCBJbmxheUhpbnRMYWJlbFBhcnQuaXMpKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5raW5kID09PSB1bmRlZmluZWQgfHwgSW5sYXlIaW50S2luZC5pcyhjYW5kaWRhdGUua2luZCkpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnRleHRFZGl0cyA9PT0gdW5kZWZpbmVkKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS50ZXh0RWRpdHMsIFRleHRFZGl0LmlzKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS50b29sdGlwID09PSB1bmRlZmluZWQgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS50b29sdGlwKSB8fCBNYXJrdXBDb250ZW50LmlzKGNhbmRpZGF0ZS50b29sdGlwKSlcbiAgICAgICAgICAgICYmIChjYW5kaWRhdGUucGFkZGluZ0xlZnQgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5wYWRkaW5nTGVmdCkpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnBhZGRpbmdSaWdodCA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLnBhZGRpbmdSaWdodCkpO1xuICAgIH1cbiAgICBJbmxheUhpbnQuaXMgPSBpcztcbn0pKElubGF5SGludCB8fCAoSW5sYXlIaW50ID0ge30pKTtcbmV4cG9ydCB2YXIgU3RyaW5nVmFsdWU7XG4oZnVuY3Rpb24gKFN0cmluZ1ZhbHVlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlU25pcHBldCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4geyBraW5kOiAnc25pcHBldCcsIHZhbHVlIH07XG4gICAgfVxuICAgIFN0cmluZ1ZhbHVlLmNyZWF0ZVNuaXBwZXQgPSBjcmVhdGVTbmlwcGV0O1xufSkoU3RyaW5nVmFsdWUgfHwgKFN0cmluZ1ZhbHVlID0ge30pKTtcbmV4cG9ydCB2YXIgSW5saW5lQ29tcGxldGlvbkl0ZW07XG4oZnVuY3Rpb24gKElubGluZUNvbXBsZXRpb25JdGVtKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGluc2VydFRleHQsIGZpbHRlclRleHQsIHJhbmdlLCBjb21tYW5kKSB7XG4gICAgICAgIHJldHVybiB7IGluc2VydFRleHQsIGZpbHRlclRleHQsIHJhbmdlLCBjb21tYW5kIH07XG4gICAgfVxuICAgIElubGluZUNvbXBsZXRpb25JdGVtLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKElubGluZUNvbXBsZXRpb25JdGVtIHx8IChJbmxpbmVDb21wbGV0aW9uSXRlbSA9IHt9KSk7XG5leHBvcnQgdmFyIElubGluZUNvbXBsZXRpb25MaXN0O1xuKGZ1bmN0aW9uIChJbmxpbmVDb21wbGV0aW9uTGlzdCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShpdGVtcykge1xuICAgICAgICByZXR1cm4geyBpdGVtcyB9O1xuICAgIH1cbiAgICBJbmxpbmVDb21wbGV0aW9uTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShJbmxpbmVDb21wbGV0aW9uTGlzdCB8fCAoSW5saW5lQ29tcGxldGlvbkxpc3QgPSB7fSkpO1xuLyoqXG4gKiBEZXNjcmliZXMgaG93IGFuIHtAbGluayBJbmxpbmVDb21wbGV0aW9uSXRlbVByb3ZpZGVyIGlubGluZSBjb21wbGV0aW9uIHByb3ZpZGVyfSB3YXMgdHJpZ2dlcmVkLlxuICpcbiAqIEBzaW5jZSAzLjE4LjBcbiAqIEBwcm9wb3NlZFxuICovXG5leHBvcnQgdmFyIElubGluZUNvbXBsZXRpb25UcmlnZ2VyS2luZDtcbihmdW5jdGlvbiAoSW5saW5lQ29tcGxldGlvblRyaWdnZXJLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQ29tcGxldGlvbiB3YXMgdHJpZ2dlcmVkIGV4cGxpY2l0bHkgYnkgYSB1c2VyIGdlc3R1cmUuXG4gICAgICovXG4gICAgSW5saW5lQ29tcGxldGlvblRyaWdnZXJLaW5kLkludm9rZWQgPSAwO1xuICAgIC8qKlxuICAgICAqIENvbXBsZXRpb24gd2FzIHRyaWdnZXJlZCBhdXRvbWF0aWNhbGx5IHdoaWxlIGVkaXRpbmcuXG4gICAgICovXG4gICAgSW5saW5lQ29tcGxldGlvblRyaWdnZXJLaW5kLkF1dG9tYXRpYyA9IDE7XG59KShJbmxpbmVDb21wbGV0aW9uVHJpZ2dlcktpbmQgfHwgKElubGluZUNvbXBsZXRpb25UcmlnZ2VyS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIFNlbGVjdGVkQ29tcGxldGlvbkluZm87XG4oZnVuY3Rpb24gKFNlbGVjdGVkQ29tcGxldGlvbkluZm8pIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2UsIHRleHQgfTtcbiAgICB9XG4gICAgU2VsZWN0ZWRDb21wbGV0aW9uSW5mby5jcmVhdGUgPSBjcmVhdGU7XG59KShTZWxlY3RlZENvbXBsZXRpb25JbmZvIHx8IChTZWxlY3RlZENvbXBsZXRpb25JbmZvID0ge30pKTtcbmV4cG9ydCB2YXIgSW5saW5lQ29tcGxldGlvbkNvbnRleHQ7XG4oZnVuY3Rpb24gKElubGluZUNvbXBsZXRpb25Db250ZXh0KSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHRyaWdnZXJLaW5kLCBzZWxlY3RlZENvbXBsZXRpb25JbmZvKSB7XG4gICAgICAgIHJldHVybiB7IHRyaWdnZXJLaW5kLCBzZWxlY3RlZENvbXBsZXRpb25JbmZvIH07XG4gICAgfVxuICAgIElubGluZUNvbXBsZXRpb25Db250ZXh0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKElubGluZUNvbXBsZXRpb25Db250ZXh0IHx8IChJbmxpbmVDb21wbGV0aW9uQ29udGV4dCA9IHt9KSk7XG5leHBvcnQgdmFyIFdvcmtzcGFjZUZvbGRlcjtcbihmdW5jdGlvbiAoV29ya3NwYWNlRm9sZGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgVVJJLmlzKGNhbmRpZGF0ZS51cmkpICYmIElzLnN0cmluZyhjYW5kaWRhdGUubmFtZSk7XG4gICAgfVxuICAgIFdvcmtzcGFjZUZvbGRlci5pcyA9IGlzO1xufSkoV29ya3NwYWNlRm9sZGVyIHx8IChXb3Jrc3BhY2VGb2xkZXIgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IEVPTCA9IFsnXFxuJywgJ1xcclxcbicsICdcXHInXTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHRoZSB0ZXh0IGRvY3VtZW50IGZyb20gdGhlIG5ldyB2c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdGV4dGRvY3VtZW50IHBhY2thZ2UuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50O1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IElUZXh0RG9jdW1lbnQgbGl0ZXJhbCBmcm9tIHRoZSBnaXZlbiB1cmkgYW5kIGNvbnRlbnQuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIGxhbmd1YWdlSWQgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgSWQuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIGRvY3VtZW50J3MgdmVyc2lvbi5cbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZG9jdW1lbnQncyBjb250ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBJVGV4dERvY3VtZW50fSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5sYW5ndWFnZUlkKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlSWQpKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUubGluZUNvdW50KVxuICAgICAgICAgICAgJiYgSXMuZnVuYyhjYW5kaWRhdGUuZ2V0VGV4dCkgJiYgSXMuZnVuYyhjYW5kaWRhdGUucG9zaXRpb25BdCkgJiYgSXMuZnVuYyhjYW5kaWRhdGUub2Zmc2V0QXQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnQuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBhcHBseUVkaXRzKGRvY3VtZW50LCBlZGl0cykge1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmdldFRleHQoKTtcbiAgICAgICAgbGV0IHNvcnRlZEVkaXRzID0gbWVyZ2VTb3J0KGVkaXRzLCAoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBhLnJhbmdlLnN0YXJ0LmxpbmUgLSBiLnJhbmdlLnN0YXJ0LmxpbmU7XG4gICAgICAgICAgICBpZiAoZGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciAtIGIucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbGFzdE1vZGlmaWVkT2Zmc2V0ID0gdGV4dC5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSBzb3J0ZWRFZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IGUgPSBzb3J0ZWRFZGl0c1tpXTtcbiAgICAgICAgICAgIGxldCBzdGFydE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgbGV0IGVuZE9mZnNldCA9IGRvY3VtZW50Lm9mZnNldEF0KGUucmFuZ2UuZW5kKTtcbiAgICAgICAgICAgIGlmIChlbmRPZmZzZXQgPD0gbGFzdE1vZGlmaWVkT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0T2Zmc2V0KSArIGUubmV3VGV4dCArIHRleHQuc3Vic3RyaW5nKGVuZE9mZnNldCwgdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdmVybGFwcGluZyBlZGl0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0TW9kaWZpZWRPZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50LmFwcGx5RWRpdHMgPSBhcHBseUVkaXRzO1xuICAgIGZ1bmN0aW9uIG1lcmdlU29ydChkYXRhLCBjb21wYXJlKSB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAvLyBzb3J0ZWRcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHAgPSAoZGF0YS5sZW5ndGggLyAyKSB8IDA7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBkYXRhLnNsaWNlKDAsIHApO1xuICAgICAgICBjb25zdCByaWdodCA9IGRhdGEuc2xpY2UocCk7XG4gICAgICAgIG1lcmdlU29ydChsZWZ0LCBjb21wYXJlKTtcbiAgICAgICAgbWVyZ2VTb3J0KHJpZ2h0LCBjb21wYXJlKTtcbiAgICAgICAgbGV0IGxlZnRJZHggPSAwO1xuICAgICAgICBsZXQgcmlnaHRJZHggPSAwO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChsZWZ0SWR4IDwgbGVmdC5sZW5ndGggJiYgcmlnaHRJZHggPCByaWdodC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCByZXQgPSBjb21wYXJlKGxlZnRbbGVmdElkeF0sIHJpZ2h0W3JpZ2h0SWR4XSk7XG4gICAgICAgICAgICBpZiAocmV0IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBzbWFsbGVyX2VxdWFsIC0+IHRha2UgbGVmdCB0byBwcmVzZXJ2ZSBvcmRlclxuICAgICAgICAgICAgICAgIGRhdGFbaSsrXSA9IGxlZnRbbGVmdElkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGdyZWF0ZXIgLT4gdGFrZSByaWdodFxuICAgICAgICAgICAgICAgIGRhdGFbaSsrXSA9IHJpZ2h0W3JpZ2h0SWR4KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChsZWZ0SWR4IDwgbGVmdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbaSsrXSA9IGxlZnRbbGVmdElkeCsrXTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAocmlnaHRJZHggPCByaWdodC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGFbaSsrXSA9IHJpZ2h0W3JpZ2h0SWR4KytdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn0pKFRleHREb2N1bWVudCB8fCAoVGV4dERvY3VtZW50ID0ge30pKTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHRoZSB0ZXh0IGRvY3VtZW50IGZyb20gdGhlIG5ldyB2c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdGV4dGRvY3VtZW50IHBhY2thZ2UuXG4gKi9cbmNsYXNzIEZ1bGxUZXh0RG9jdW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCkge1xuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlSWQgPSBsYW5ndWFnZUlkO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJpO1xuICAgIH1cbiAgICBnZXQgbGFuZ3VhZ2VJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlSWQ7XG4gICAgfVxuICAgIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0VGV4dChyYW5nZSkge1xuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMub2Zmc2V0QXQocmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMub2Zmc2V0QXQocmFuZ2UuZW5kKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG4gICAgdXBkYXRlKGV2ZW50LCB2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBldmVudC50ZXh0O1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5fbGluZU9mZnNldHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGdldExpbmVPZmZzZXRzKCkge1xuICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGxpbmVPZmZzZXRzID0gW107XG4gICAgICAgICAgICBsZXQgdGV4dCA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICBsZXQgaXNMaW5lU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGluZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjaCA9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gKGNoID09PSAnXFxyJyB8fCBjaCA9PT0gJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNMaW5lU3RhcnQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGluZU9mZnNldHMucHVzaCh0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IGxpbmVPZmZzZXRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcbiAgICB9XG4gICAgcG9zaXRpb25BdChvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoTWF0aC5taW4ob2Zmc2V0LCB0aGlzLl9jb250ZW50Lmxlbmd0aCksIDApO1xuICAgICAgICBsZXQgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XG4gICAgICAgIGxldCBsb3cgPSAwLCBoaWdoID0gbGluZU9mZnNldHMubGVuZ3RoO1xuICAgICAgICBpZiAoaGlnaCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZSgwLCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICAgICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgICAgICAgIGlmIChsaW5lT2Zmc2V0c1ttaWRdID4gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG93IGlzIHRoZSBsZWFzdCB4IGZvciB3aGljaCB0aGUgbGluZSBvZmZzZXQgaXMgbGFyZ2VyIHRoYW4gdGhlIGN1cnJlbnQgb2Zmc2V0XG4gICAgICAgIC8vIG9yIGFycmF5Lmxlbmd0aCBpZiBubyBsaW5lIG9mZnNldCBpcyBsYXJnZXIgdGhhbiB0aGUgY3VycmVudCBvZmZzZXRcbiAgICAgICAgbGV0IGxpbmUgPSBsb3cgLSAxO1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uY3JlYXRlKGxpbmUsIG9mZnNldCAtIGxpbmVPZmZzZXRzW2xpbmVdKTtcbiAgICB9XG4gICAgb2Zmc2V0QXQocG9zaXRpb24pIHtcbiAgICAgICAgbGV0IGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgICAgICBpZiAocG9zaXRpb24ubGluZSA+PSBsaW5lT2Zmc2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3NpdGlvbi5saW5lIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmVPZmZzZXQgPSBsaW5lT2Zmc2V0c1twb3NpdGlvbi5saW5lXTtcbiAgICAgICAgbGV0IG5leHRMaW5lT2Zmc2V0ID0gKHBvc2l0aW9uLmxpbmUgKyAxIDwgbGluZU9mZnNldHMubGVuZ3RoKSA/IGxpbmVPZmZzZXRzW3Bvc2l0aW9uLmxpbmUgKyAxXSA6IHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obGluZU9mZnNldCArIHBvc2l0aW9uLmNoYXJhY3RlciwgbmV4dExpbmVPZmZzZXQpLCBsaW5lT2Zmc2V0KTtcbiAgICB9XG4gICAgZ2V0IGxpbmVDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZU9mZnNldHMoKS5sZW5ndGg7XG4gICAgfVxufVxudmFyIElzO1xuKGZ1bmN0aW9uIChJcykge1xuICAgIGNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICBmdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBJcy5kZWZpbmVkID0gZGVmaW5lZDtcbiAgICBmdW5jdGlvbiB1bmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIElzLnVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBmdW5jdGlvbiBib29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG4gICAgfVxuICAgIElzLmJvb2xlYW4gPSBib29sZWFuO1xuICAgIGZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIH1cbiAgICBJcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgZnVuY3Rpb24gbnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG4gICAgfVxuICAgIElzLm51bWJlciA9IG51bWJlcjtcbiAgICBmdW5jdGlvbiBudW1iZXJSYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiBtaW4gPD0gdmFsdWUgJiYgdmFsdWUgPD0gbWF4O1xuICAgIH1cbiAgICBJcy5udW1iZXJSYW5nZSA9IG51bWJlclJhbmdlO1xuICAgIGZ1bmN0aW9uIGludGVnZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAtMjE0NzQ4MzY0OCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSAyMTQ3NDgzNjQ3O1xuICAgIH1cbiAgICBJcy5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICBmdW5jdGlvbiB1aW50ZWdlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmIDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gMjE0NzQ4MzY0NztcbiAgICB9XG4gICAgSXMudWludGVnZXIgPSB1aW50ZWdlcjtcbiAgICBmdW5jdGlvbiBmdW5jKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gICAgSXMuZnVuYyA9IGZ1bmM7XG4gICAgZnVuY3Rpb24gb2JqZWN0TGl0ZXJhbCh2YWx1ZSkge1xuICAgICAgICAvLyBTdHJpY3RseSBzcGVha2luZyBjbGFzcyBpbnN0YW5jZXMgcGFzcyB0aGlzIGNoZWNrIGFzIHdlbGwuIFNpbmNlIHRoZSBMU1BcbiAgICAgICAgLy8gZG9lc24ndCB1c2UgY2xhc3NlcyB3ZSBpZ25vcmUgdGhpcyBmb3Igbm93LiBJZiB3ZSBkbyB3ZSBuZWVkIHRvIGFkZCBzb21ldGhpbmdcbiAgICAgICAgLy8gbGlrZSB0aGlzOiBgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSkgPT09IG51bGxgXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xuICAgIH1cbiAgICBJcy5vYmplY3RMaXRlcmFsID0gb2JqZWN0TGl0ZXJhbDtcbiAgICBmdW5jdGlvbiB0eXBlZEFycmF5KHZhbHVlLCBjaGVjaykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoY2hlY2spO1xuICAgIH1cbiAgICBJcy50eXBlZEFycmF5ID0gdHlwZWRBcnJheTtcbn0pKElzIHx8IChJcyA9IHt9KSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=