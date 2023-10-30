"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5224],{

/***/ 81169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(39054);

/***/ }),

/***/ 39054:
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
const ril_1 = __webpack_require__(25669);
// Install the browser runtime abstract.
ril_1.default.install();
const api_1 = __webpack_require__(23870);
__exportStar(__webpack_require__(23870), exports);
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

/***/ 25669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __webpack_require__(23870);
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

/***/ 23870:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="../../typings/thenable.d.ts" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = void 0;
const messages_1 = __webpack_require__(20839);
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
const linkedMap_1 = __webpack_require__(96184);
Object.defineProperty(exports, "LinkedMap", ({ enumerable: true, get: function () { return linkedMap_1.LinkedMap; } }));
Object.defineProperty(exports, "LRUCache", ({ enumerable: true, get: function () { return linkedMap_1.LRUCache; } }));
Object.defineProperty(exports, "Touch", ({ enumerable: true, get: function () { return linkedMap_1.Touch; } }));
const disposable_1 = __webpack_require__(83911);
Object.defineProperty(exports, "Disposable", ({ enumerable: true, get: function () { return disposable_1.Disposable; } }));
const events_1 = __webpack_require__(27135);
Object.defineProperty(exports, "Event", ({ enumerable: true, get: function () { return events_1.Event; } }));
Object.defineProperty(exports, "Emitter", ({ enumerable: true, get: function () { return events_1.Emitter; } }));
const cancellation_1 = __webpack_require__(13881);
Object.defineProperty(exports, "CancellationTokenSource", ({ enumerable: true, get: function () { return cancellation_1.CancellationTokenSource; } }));
Object.defineProperty(exports, "CancellationToken", ({ enumerable: true, get: function () { return cancellation_1.CancellationToken; } }));
const sharedArrayCancellation_1 = __webpack_require__(98211);
Object.defineProperty(exports, "SharedArraySenderStrategy", ({ enumerable: true, get: function () { return sharedArrayCancellation_1.SharedArraySenderStrategy; } }));
Object.defineProperty(exports, "SharedArrayReceiverStrategy", ({ enumerable: true, get: function () { return sharedArrayCancellation_1.SharedArrayReceiverStrategy; } }));
const messageReader_1 = __webpack_require__(56525);
Object.defineProperty(exports, "MessageReader", ({ enumerable: true, get: function () { return messageReader_1.MessageReader; } }));
Object.defineProperty(exports, "AbstractMessageReader", ({ enumerable: true, get: function () { return messageReader_1.AbstractMessageReader; } }));
Object.defineProperty(exports, "ReadableStreamMessageReader", ({ enumerable: true, get: function () { return messageReader_1.ReadableStreamMessageReader; } }));
const messageWriter_1 = __webpack_require__(96654);
Object.defineProperty(exports, "MessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.MessageWriter; } }));
Object.defineProperty(exports, "AbstractMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.AbstractMessageWriter; } }));
Object.defineProperty(exports, "WriteableStreamMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.WriteableStreamMessageWriter; } }));
const messageBuffer_1 = __webpack_require__(75530);
Object.defineProperty(exports, "AbstractMessageBuffer", ({ enumerable: true, get: function () { return messageBuffer_1.AbstractMessageBuffer; } }));
const connection_1 = __webpack_require__(61343);
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
const ral_1 = __webpack_require__(30147);
exports.RAL = ral_1.default;


/***/ }),

/***/ 13881:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationTokenSource = exports.CancellationToken = void 0;
const ral_1 = __webpack_require__(30147);
const Is = __webpack_require__(67574);
const events_1 = __webpack_require__(27135);
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
})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
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

/***/ 61343:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageConnection = exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
const ral_1 = __webpack_require__(30147);
const Is = __webpack_require__(67574);
const messages_1 = __webpack_require__(20839);
const linkedMap_1 = __webpack_require__(96184);
const events_1 = __webpack_require__(27135);
const cancellation_1 = __webpack_require__(13881);
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
})(ProgressToken = exports.ProgressToken || (exports.ProgressToken = {}));
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
})(Trace = exports.Trace || (exports.Trace = {}));
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
})(TraceValues = exports.TraceValues || (exports.TraceValues = {}));
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
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
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
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages_1.NotificationType('$/setTrace');
})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages_1.NotificationType('$/logTrace');
})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
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
})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
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
})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
var IdCancellationReceiverStrategy;
(function (IdCancellationReceiverStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === undefined || candidate.kind === 'id') && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    IdCancellationReceiverStrategy.is = is;
})(IdCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = {}));
var RequestCancellationReceiverStrategy;
(function (RequestCancellationReceiverStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && candidate.kind === 'request' && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    RequestCancellationReceiverStrategy.is = is;
})(RequestCancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy || (exports.RequestCancellationReceiverStrategy = {}));
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
})(CancellationReceiverStrategy = exports.CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = {}));
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
})(CancellationSenderStrategy = exports.CancellationSenderStrategy || (exports.CancellationSenderStrategy = {}));
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
})(CancellationStrategy = exports.CancellationStrategy || (exports.CancellationStrategy = {}));
var MessageStrategy;
(function (MessageStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.handleMessage);
    }
    MessageStrategy.is = is;
})(MessageStrategy = exports.MessageStrategy || (exports.MessageStrategy = {}));
var ConnectionOptions;
(function (ConnectionOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
    }
    ConnectionOptions.is = is;
})(ConnectionOptions = exports.ConnectionOptions || (exports.ConnectionOptions = {}));
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

/***/ 83911:
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
})(Disposable = exports.Disposable || (exports.Disposable = {}));


/***/ }),

/***/ 27135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emitter = exports.Event = void 0;
const ral_1 = __webpack_require__(30147);
var Event;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(Event = exports.Event || (exports.Event = {}));
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

/***/ 67574:
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

/***/ 96184:
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
})(Touch = exports.Touch || (exports.Touch = {}));
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

/***/ 75530:
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
                throw new Error('Message header must separate key and value using :');
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

/***/ 56525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
const ral_1 = __webpack_require__(30147);
const Is = __webpack_require__(67574);
const events_1 = __webpack_require__(27135);
const semaphore_1 = __webpack_require__(80142);
var MessageReader;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
            Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(MessageReader = exports.MessageReader || (exports.MessageReader = {}));
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
        this.buffer.append(data);
        while (true) {
            if (this.nextMessageLength === -1) {
                const headers = this.buffer.tryReadHeaders(true);
                if (!headers) {
                    return;
                }
                const contentLength = headers.get('content-length');
                if (!contentLength) {
                    this.fireError(new Error('Header must provide a Content-Length property.'));
                    return;
                }
                const length = parseInt(contentLength);
                if (isNaN(length)) {
                    this.fireError(new Error('Content-Length value must be a number.'));
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

/***/ 96654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
const ral_1 = __webpack_require__(30147);
const Is = __webpack_require__(67574);
const semaphore_1 = __webpack_require__(80142);
const events_1 = __webpack_require__(27135);
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
})(MessageWriter = exports.MessageWriter || (exports.MessageWriter = {}));
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

/***/ 20839:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
const is = __webpack_require__(67574);
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
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
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
})(Message = exports.Message || (exports.Message = {}));


/***/ }),

/***/ 30147:
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

/***/ 80142:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Semaphore = void 0;
const ral_1 = __webpack_require__(30147);
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

/***/ 98211:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = void 0;
const cancellation_1 = __webpack_require__(13881);
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

/***/ 5224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(10152);

/***/ }),

/***/ 10152:
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
const browser_1 = __webpack_require__(81169);
__exportStar(__webpack_require__(81169), exports);
__exportStar(__webpack_require__(51661), exports);
function createProtocolConnection(reader, writer, logger, options) {
    return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;


/***/ }),

/***/ 51661:
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
__exportStar(__webpack_require__(39054), exports);
__exportStar(__webpack_require__(91674), exports);
__exportStar(__webpack_require__(66140), exports);
__exportStar(__webpack_require__(10542), exports);
var connection_1 = __webpack_require__(73767);
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
})(LSPErrorCodes = exports.LSPErrorCodes || (exports.LSPErrorCodes = {}));


/***/ }),

/***/ 73767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProtocolConnection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(39054);
function createProtocolConnection(input, output, logger, options) {
    if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;


/***/ }),

/***/ 66140:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(39054);
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["clientToServer"] = "clientToServer";
    MessageDirection["serverToClient"] = "serverToClient";
    MessageDirection["both"] = "both";
})(MessageDirection = exports.MessageDirection || (exports.MessageDirection = {}));
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

/***/ 51552:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(CallHierarchyPrepareRequest = exports.CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = {}));
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
})(CallHierarchyIncomingCallsRequest = exports.CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = {}));
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
})(CallHierarchyOutgoingCallsRequest = exports.CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = {}));


/***/ }),

/***/ 79891:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(DocumentColorRequest = exports.DocumentColorRequest || (exports.DocumentColorRequest = {}));
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
})(ColorPresentationRequest = exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {}));


/***/ }),

/***/ 85934:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(ConfigurationRequest = exports.ConfigurationRequest || (exports.ConfigurationRequest = {}));


/***/ }),

/***/ 40764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeclarationRequest = void 0;
const messages_1 = __webpack_require__(66140);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Declaration}
 * or a typed array of {@link DeclarationLink} or a Thenable that resolves
 * to such.
 */
var DeclarationRequest;
(function (DeclarationRequest) {
    DeclarationRequest.method = 'textDocument/declaration';
    DeclarationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DeclarationRequest.type = new messages_1.ProtocolRequestType(DeclarationRequest.method);
})(DeclarationRequest = exports.DeclarationRequest || (exports.DeclarationRequest = {}));


/***/ }),

/***/ 79824:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = void 0;
const vscode_jsonrpc_1 = __webpack_require__(39054);
const Is = __webpack_require__(69533);
const messages_1 = __webpack_require__(66140);
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
})(DiagnosticServerCancellationData = exports.DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = {}));
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
})(DocumentDiagnosticReportKind = exports.DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = {}));
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
})(DocumentDiagnosticRequest = exports.DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = {}));
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
})(WorkspaceDiagnosticRequest = exports.WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = {}));
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
})(DiagnosticRefreshRequest = exports.DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = {}));


/***/ }),

/***/ 37846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
const messages_1 = __webpack_require__(66140);
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
})(FileOperationPatternKind = exports.FileOperationPatternKind || (exports.FileOperationPatternKind = {}));
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
})(WillCreateFilesRequest = exports.WillCreateFilesRequest || (exports.WillCreateFilesRequest = {}));
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
})(DidCreateFilesNotification = exports.DidCreateFilesNotification || (exports.DidCreateFilesNotification = {}));
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
})(WillRenameFilesRequest = exports.WillRenameFilesRequest || (exports.WillRenameFilesRequest = {}));
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
})(DidRenameFilesNotification = exports.DidRenameFilesNotification || (exports.DidRenameFilesNotification = {}));
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
})(DidDeleteFilesNotification = exports.DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = {}));
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
})(WillDeleteFilesRequest = exports.WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = {}));


/***/ }),

/***/ 13394:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoldingRangeRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(FoldingRangeRequest = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {}));


/***/ }),

/***/ 82122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImplementationRequest = void 0;
const messages_1 = __webpack_require__(66140);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the implementation locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Definition} or a
 * Thenable that resolves to such.
 */
var ImplementationRequest;
(function (ImplementationRequest) {
    ImplementationRequest.method = 'textDocument/implementation';
    ImplementationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ImplementationRequest.type = new messages_1.ProtocolRequestType(ImplementationRequest.method);
})(ImplementationRequest = exports.ImplementationRequest || (exports.ImplementationRequest = {}));


/***/ }),

/***/ 29999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(InlayHintRequest = exports.InlayHintRequest || (exports.InlayHintRequest = {}));
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
})(InlayHintResolveRequest = exports.InlayHintResolveRequest || (exports.InlayHintResolveRequest = {}));
/**
 * @since 3.17.0
 */
var InlayHintRefreshRequest;
(function (InlayHintRefreshRequest) {
    InlayHintRefreshRequest.method = `workspace/inlayHint/refresh`;
    InlayHintRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    InlayHintRefreshRequest.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest.method);
})(InlayHintRefreshRequest = exports.InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = {}));


/***/ }),

/***/ 55246:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineValueRefreshRequest = exports.InlineValueRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(InlineValueRequest = exports.InlineValueRequest || (exports.InlineValueRequest = {}));
/**
 * @since 3.17.0
 */
var InlineValueRefreshRequest;
(function (InlineValueRefreshRequest) {
    InlineValueRefreshRequest.method = `workspace/inlineValue/refresh`;
    InlineValueRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    InlineValueRefreshRequest.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest.method);
})(InlineValueRefreshRequest = exports.InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = {}));


/***/ }),

/***/ 10542:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = void 0;
exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = void 0;
exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = void 0;
const messages_1 = __webpack_require__(66140);
const vscode_languageserver_types_1 = __webpack_require__(91674);
const Is = __webpack_require__(69533);
const protocol_implementation_1 = __webpack_require__(82122);
Object.defineProperty(exports, "ImplementationRequest", ({ enumerable: true, get: function () { return protocol_implementation_1.ImplementationRequest; } }));
const protocol_typeDefinition_1 = __webpack_require__(71589);
Object.defineProperty(exports, "TypeDefinitionRequest", ({ enumerable: true, get: function () { return protocol_typeDefinition_1.TypeDefinitionRequest; } }));
const protocol_workspaceFolder_1 = __webpack_require__(98744);
Object.defineProperty(exports, "WorkspaceFoldersRequest", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.WorkspaceFoldersRequest; } }));
Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification; } }));
const protocol_configuration_1 = __webpack_require__(85934);
Object.defineProperty(exports, "ConfigurationRequest", ({ enumerable: true, get: function () { return protocol_configuration_1.ConfigurationRequest; } }));
const protocol_colorProvider_1 = __webpack_require__(79891);
Object.defineProperty(exports, "DocumentColorRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.DocumentColorRequest; } }));
Object.defineProperty(exports, "ColorPresentationRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.ColorPresentationRequest; } }));
const protocol_foldingRange_1 = __webpack_require__(13394);
Object.defineProperty(exports, "FoldingRangeRequest", ({ enumerable: true, get: function () { return protocol_foldingRange_1.FoldingRangeRequest; } }));
const protocol_declaration_1 = __webpack_require__(40764);
Object.defineProperty(exports, "DeclarationRequest", ({ enumerable: true, get: function () { return protocol_declaration_1.DeclarationRequest; } }));
const protocol_selectionRange_1 = __webpack_require__(5206);
Object.defineProperty(exports, "SelectionRangeRequest", ({ enumerable: true, get: function () { return protocol_selectionRange_1.SelectionRangeRequest; } }));
const protocol_progress_1 = __webpack_require__(21862);
Object.defineProperty(exports, "WorkDoneProgress", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgress; } }));
Object.defineProperty(exports, "WorkDoneProgressCreateRequest", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCreateRequest; } }));
Object.defineProperty(exports, "WorkDoneProgressCancelNotification", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCancelNotification; } }));
const protocol_callHierarchy_1 = __webpack_require__(51552);
Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyPrepareRequest; } }));
const protocol_semanticTokens_1 = __webpack_require__(39434);
Object.defineProperty(exports, "TokenFormat", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.TokenFormat; } }));
Object.defineProperty(exports, "SemanticTokensRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRequest; } }));
Object.defineProperty(exports, "SemanticTokensDeltaRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensDeltaRequest; } }));
Object.defineProperty(exports, "SemanticTokensRangeRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRangeRequest; } }));
Object.defineProperty(exports, "SemanticTokensRefreshRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRefreshRequest; } }));
Object.defineProperty(exports, "SemanticTokensRegistrationType", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRegistrationType; } }));
const protocol_showDocument_1 = __webpack_require__(75726);
Object.defineProperty(exports, "ShowDocumentRequest", ({ enumerable: true, get: function () { return protocol_showDocument_1.ShowDocumentRequest; } }));
const protocol_linkedEditingRange_1 = __webpack_require__(26305);
Object.defineProperty(exports, "LinkedEditingRangeRequest", ({ enumerable: true, get: function () { return protocol_linkedEditingRange_1.LinkedEditingRangeRequest; } }));
const protocol_fileOperations_1 = __webpack_require__(37846);
Object.defineProperty(exports, "FileOperationPatternKind", ({ enumerable: true, get: function () { return protocol_fileOperations_1.FileOperationPatternKind; } }));
Object.defineProperty(exports, "DidCreateFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidCreateFilesNotification; } }));
Object.defineProperty(exports, "WillCreateFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillCreateFilesRequest; } }));
Object.defineProperty(exports, "DidRenameFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidRenameFilesNotification; } }));
Object.defineProperty(exports, "WillRenameFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillRenameFilesRequest; } }));
Object.defineProperty(exports, "DidDeleteFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidDeleteFilesNotification; } }));
Object.defineProperty(exports, "WillDeleteFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillDeleteFilesRequest; } }));
const protocol_moniker_1 = __webpack_require__(73443);
Object.defineProperty(exports, "UniquenessLevel", ({ enumerable: true, get: function () { return protocol_moniker_1.UniquenessLevel; } }));
Object.defineProperty(exports, "MonikerKind", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerKind; } }));
Object.defineProperty(exports, "MonikerRequest", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerRequest; } }));
const protocol_typeHierarchy_1 = __webpack_require__(83693);
Object.defineProperty(exports, "TypeHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest; } }));
Object.defineProperty(exports, "TypeHierarchySubtypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest; } }));
Object.defineProperty(exports, "TypeHierarchySupertypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest; } }));
const protocol_inlineValue_1 = __webpack_require__(55246);
Object.defineProperty(exports, "InlineValueRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRequest; } }));
Object.defineProperty(exports, "InlineValueRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRefreshRequest; } }));
const protocol_inlayHint_1 = __webpack_require__(29999);
Object.defineProperty(exports, "InlayHintRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRequest; } }));
Object.defineProperty(exports, "InlayHintResolveRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintResolveRequest; } }));
Object.defineProperty(exports, "InlayHintRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRefreshRequest; } }));
const protocol_diagnostic_1 = __webpack_require__(79824);
Object.defineProperty(exports, "DiagnosticServerCancellationData", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticServerCancellationData; } }));
Object.defineProperty(exports, "DocumentDiagnosticReportKind", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticReportKind; } }));
Object.defineProperty(exports, "DocumentDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticRequest; } }));
Object.defineProperty(exports, "WorkspaceDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.WorkspaceDiagnosticRequest; } }));
Object.defineProperty(exports, "DiagnosticRefreshRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticRefreshRequest; } }));
const protocol_notebook_1 = __webpack_require__(47169);
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
        return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
    }
    TextDocumentFilter.is = is;
})(TextDocumentFilter = exports.TextDocumentFilter || (exports.TextDocumentFilter = {}));
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
})(NotebookDocumentFilter = exports.NotebookDocumentFilter || (exports.NotebookDocumentFilter = {}));
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
})(NotebookCellTextDocumentFilter = exports.NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = {}));
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
})(DocumentSelector = exports.DocumentSelector || (exports.DocumentSelector = {}));
/**
 * The `client/registerCapability` request is sent from the server to the client to register a new capability
 * handler on the client side.
 */
var RegistrationRequest;
(function (RegistrationRequest) {
    RegistrationRequest.method = 'client/registerCapability';
    RegistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    RegistrationRequest.type = new messages_1.ProtocolRequestType(RegistrationRequest.method);
})(RegistrationRequest = exports.RegistrationRequest || (exports.RegistrationRequest = {}));
/**
 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
 * handler on the client side.
 */
var UnregistrationRequest;
(function (UnregistrationRequest) {
    UnregistrationRequest.method = 'client/unregisterCapability';
    UnregistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    UnregistrationRequest.type = new messages_1.ProtocolRequestType(UnregistrationRequest.method);
})(UnregistrationRequest = exports.UnregistrationRequest || (exports.UnregistrationRequest = {}));
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
})(ResourceOperationKind = exports.ResourceOperationKind || (exports.ResourceOperationKind = {}));
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
})(FailureHandlingKind = exports.FailureHandlingKind || (exports.FailureHandlingKind = {}));
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
})(PositionEncodingKind = exports.PositionEncodingKind || (exports.PositionEncodingKind = {}));
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
})(StaticRegistrationOptions = exports.StaticRegistrationOptions || (exports.StaticRegistrationOptions = {}));
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
})(TextDocumentRegistrationOptions = exports.TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = {}));
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
})(WorkDoneProgressOptions = exports.WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = {}));
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
})(InitializeRequest = exports.InitializeRequest || (exports.InitializeRequest = {}));
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
})(InitializeErrorCodes = exports.InitializeErrorCodes || (exports.InitializeErrorCodes = {}));
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
})(InitializedNotification = exports.InitializedNotification || (exports.InitializedNotification = {}));
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
})(ShutdownRequest = exports.ShutdownRequest || (exports.ShutdownRequest = {}));
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
})(ExitNotification = exports.ExitNotification || (exports.ExitNotification = {}));
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
})(DidChangeConfigurationNotification = exports.DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = {}));
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
})(MessageType = exports.MessageType || (exports.MessageType = {}));
/**
 * The show message notification is sent from a server to a client to ask
 * the client to display a particular message in the user interface.
 */
var ShowMessageNotification;
(function (ShowMessageNotification) {
    ShowMessageNotification.method = 'window/showMessage';
    ShowMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageNotification.type = new messages_1.ProtocolNotificationType(ShowMessageNotification.method);
})(ShowMessageNotification = exports.ShowMessageNotification || (exports.ShowMessageNotification = {}));
/**
 * The show message request is sent from the server to the client to show a message
 * and a set of options actions to the user.
 */
var ShowMessageRequest;
(function (ShowMessageRequest) {
    ShowMessageRequest.method = 'window/showMessageRequest';
    ShowMessageRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageRequest.type = new messages_1.ProtocolRequestType(ShowMessageRequest.method);
})(ShowMessageRequest = exports.ShowMessageRequest || (exports.ShowMessageRequest = {}));
/**
 * The log message notification is sent from the server to the client to ask
 * the client to log a particular message.
 */
var LogMessageNotification;
(function (LogMessageNotification) {
    LogMessageNotification.method = 'window/logMessage';
    LogMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    LogMessageNotification.type = new messages_1.ProtocolNotificationType(LogMessageNotification.method);
})(LogMessageNotification = exports.LogMessageNotification || (exports.LogMessageNotification = {}));
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
})(TelemetryEventNotification = exports.TelemetryEventNotification || (exports.TelemetryEventNotification = {}));
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
})(TextDocumentSyncKind = exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {}));
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
})(DidOpenTextDocumentNotification = exports.DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = {}));
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
})(TextDocumentContentChangeEvent = exports.TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = {}));
/**
 * The document change notification is sent from the client to the server to signal
 * changes to a text document.
 */
var DidChangeTextDocumentNotification;
(function (DidChangeTextDocumentNotification) {
    DidChangeTextDocumentNotification.method = 'textDocument/didChange';
    DidChangeTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
})(DidChangeTextDocumentNotification = exports.DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = {}));
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
})(DidCloseTextDocumentNotification = exports.DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = {}));
/**
 * The document save notification is sent from the client to the server when
 * the document got saved in the client.
 */
var DidSaveTextDocumentNotification;
(function (DidSaveTextDocumentNotification) {
    DidSaveTextDocumentNotification.method = 'textDocument/didSave';
    DidSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
})(DidSaveTextDocumentNotification = exports.DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = {}));
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
})(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
/**
 * A document will save notification is sent from the client to the server before
 * the document is actually saved.
 */
var WillSaveTextDocumentNotification;
(function (WillSaveTextDocumentNotification) {
    WillSaveTextDocumentNotification.method = 'textDocument/willSave';
    WillSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
})(WillSaveTextDocumentNotification = exports.WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = {}));
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
})(WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = {}));
/**
 * The watched files notification is sent from the client to the server when
 * the client detects changes to file watched by the language client.
 */
var DidChangeWatchedFilesNotification;
(function (DidChangeWatchedFilesNotification) {
    DidChangeWatchedFilesNotification.method = 'workspace/didChangeWatchedFiles';
    DidChangeWatchedFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWatchedFilesNotification.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification.method);
})(DidChangeWatchedFilesNotification = exports.DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = {}));
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
})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
var RelativePattern;
(function (RelativePattern) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
    }
    RelativePattern.is = is;
})(RelativePattern = exports.RelativePattern || (exports.RelativePattern = {}));
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
})(WatchKind = exports.WatchKind || (exports.WatchKind = {}));
/**
 * Diagnostics notification are sent from the server to the client to signal
 * results of validation runs.
 */
var PublishDiagnosticsNotification;
(function (PublishDiagnosticsNotification) {
    PublishDiagnosticsNotification.method = 'textDocument/publishDiagnostics';
    PublishDiagnosticsNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    PublishDiagnosticsNotification.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification.method);
})(PublishDiagnosticsNotification = exports.PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = {}));
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
})(CompletionTriggerKind = exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
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
})(CompletionRequest = exports.CompletionRequest || (exports.CompletionRequest = {}));
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
})(CompletionResolveRequest = exports.CompletionResolveRequest || (exports.CompletionResolveRequest = {}));
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
})(HoverRequest = exports.HoverRequest || (exports.HoverRequest = {}));
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
})(SignatureHelpTriggerKind = exports.SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = {}));
var SignatureHelpRequest;
(function (SignatureHelpRequest) {
    SignatureHelpRequest.method = 'textDocument/signatureHelp';
    SignatureHelpRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SignatureHelpRequest.type = new messages_1.ProtocolRequestType(SignatureHelpRequest.method);
})(SignatureHelpRequest = exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {}));
/**
 * A request to resolve the definition location of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the response is of either type {@link Definition}
 * or a typed array of {@link DefinitionLink} or a Thenable that resolves
 * to such.
 */
var DefinitionRequest;
(function (DefinitionRequest) {
    DefinitionRequest.method = 'textDocument/definition';
    DefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DefinitionRequest.type = new messages_1.ProtocolRequestType(DefinitionRequest.method);
})(DefinitionRequest = exports.DefinitionRequest || (exports.DefinitionRequest = {}));
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
})(ReferencesRequest = exports.ReferencesRequest || (exports.ReferencesRequest = {}));
/**
 * Request to resolve a {@link DocumentHighlight} for a given
 * text document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the request response is of type [DocumentHighlight[]]
 * (#DocumentHighlight) or a Thenable that resolves to such.
 */
var DocumentHighlightRequest;
(function (DocumentHighlightRequest) {
    DocumentHighlightRequest.method = 'textDocument/documentHighlight';
    DocumentHighlightRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentHighlightRequest.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest.method);
})(DocumentHighlightRequest = exports.DocumentHighlightRequest || (exports.DocumentHighlightRequest = {}));
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
})(DocumentSymbolRequest = exports.DocumentSymbolRequest || (exports.DocumentSymbolRequest = {}));
/**
 * A request to provide commands for the given text document and range.
 */
var CodeActionRequest;
(function (CodeActionRequest) {
    CodeActionRequest.method = 'textDocument/codeAction';
    CodeActionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionRequest.type = new messages_1.ProtocolRequestType(CodeActionRequest.method);
})(CodeActionRequest = exports.CodeActionRequest || (exports.CodeActionRequest = {}));
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
})(CodeActionResolveRequest = exports.CodeActionResolveRequest || (exports.CodeActionResolveRequest = {}));
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
})(WorkspaceSymbolRequest = exports.WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = {}));
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
})(WorkspaceSymbolResolveRequest = exports.WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = {}));
/**
 * A request to provide code lens for the given text document.
 */
var CodeLensRequest;
(function (CodeLensRequest) {
    CodeLensRequest.method = 'textDocument/codeLens';
    CodeLensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensRequest.type = new messages_1.ProtocolRequestType(CodeLensRequest.method);
})(CodeLensRequest = exports.CodeLensRequest || (exports.CodeLensRequest = {}));
/**
 * A request to resolve a command for a given code lens.
 */
var CodeLensResolveRequest;
(function (CodeLensResolveRequest) {
    CodeLensResolveRequest.method = 'codeLens/resolve';
    CodeLensResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensResolveRequest.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest.method);
})(CodeLensResolveRequest = exports.CodeLensResolveRequest || (exports.CodeLensResolveRequest = {}));
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
})(CodeLensRefreshRequest = exports.CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = {}));
/**
 * A request to provide document links
 */
var DocumentLinkRequest;
(function (DocumentLinkRequest) {
    DocumentLinkRequest.method = 'textDocument/documentLink';
    DocumentLinkRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkRequest.type = new messages_1.ProtocolRequestType(DocumentLinkRequest.method);
})(DocumentLinkRequest = exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {}));
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
})(DocumentLinkResolveRequest = exports.DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = {}));
/**
 * A request to to format a whole document.
 */
var DocumentFormattingRequest;
(function (DocumentFormattingRequest) {
    DocumentFormattingRequest.method = 'textDocument/formatting';
    DocumentFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest.method);
})(DocumentFormattingRequest = exports.DocumentFormattingRequest || (exports.DocumentFormattingRequest = {}));
/**
 * A request to to format a range in a document.
 */
var DocumentRangeFormattingRequest;
(function (DocumentRangeFormattingRequest) {
    DocumentRangeFormattingRequest.method = 'textDocument/rangeFormatting';
    DocumentRangeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest.method);
})(DocumentRangeFormattingRequest = exports.DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = {}));
/**
 * A request to format a document on type.
 */
var DocumentOnTypeFormattingRequest;
(function (DocumentOnTypeFormattingRequest) {
    DocumentOnTypeFormattingRequest.method = 'textDocument/onTypeFormatting';
    DocumentOnTypeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentOnTypeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
})(DocumentOnTypeFormattingRequest = exports.DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = {}));
//---- Rename ----------------------------------------------
var PrepareSupportDefaultBehavior;
(function (PrepareSupportDefaultBehavior) {
    /**
     * The client's default behavior is to select the identifier
     * according the to language's syntax rule.
     */
    PrepareSupportDefaultBehavior.Identifier = 1;
})(PrepareSupportDefaultBehavior = exports.PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = {}));
/**
 * A request to rename a symbol.
 */
var RenameRequest;
(function (RenameRequest) {
    RenameRequest.method = 'textDocument/rename';
    RenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    RenameRequest.type = new messages_1.ProtocolRequestType(RenameRequest.method);
})(RenameRequest = exports.RenameRequest || (exports.RenameRequest = {}));
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
})(PrepareRenameRequest = exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {}));
/**
 * A request send from the client to the server to execute a command. The request might return
 * a workspace edit which the client will apply to the workspace.
 */
var ExecuteCommandRequest;
(function (ExecuteCommandRequest) {
    ExecuteCommandRequest.method = 'workspace/executeCommand';
    ExecuteCommandRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ExecuteCommandRequest.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest.method);
})(ExecuteCommandRequest = exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {}));
/**
 * A request sent from the server to the client to modified certain resources.
 */
var ApplyWorkspaceEditRequest;
(function (ApplyWorkspaceEditRequest) {
    ApplyWorkspaceEditRequest.method = 'workspace/applyEdit';
    ApplyWorkspaceEditRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ApplyWorkspaceEditRequest.type = new messages_1.ProtocolRequestType('workspace/applyEdit');
})(ApplyWorkspaceEditRequest = exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {}));


/***/ }),

/***/ 26305:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkedEditingRangeRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(LinkedEditingRangeRequest = exports.LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = {}));


/***/ }),

/***/ 73443:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
const messages_1 = __webpack_require__(66140);
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
})(UniquenessLevel = exports.UniquenessLevel || (exports.UniquenessLevel = {}));
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
})(MonikerKind = exports.MonikerKind || (exports.MonikerKind = {}));
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
})(MonikerRequest = exports.MonikerRequest || (exports.MonikerRequest = {}));


/***/ }),

/***/ 47169:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = void 0;
const vscode_languageserver_types_1 = __webpack_require__(91674);
const Is = __webpack_require__(69533);
const messages_1 = __webpack_require__(66140);
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
})(NotebookCellKind = exports.NotebookCellKind || (exports.NotebookCellKind = {}));
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
})(ExecutionSummary = exports.ExecutionSummary || (exports.ExecutionSummary = {}));
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
})(NotebookCell = exports.NotebookCell || (exports.NotebookCell = {}));
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
})(NotebookDocument = exports.NotebookDocument || (exports.NotebookDocument = {}));
var NotebookDocumentSyncRegistrationType;
(function (NotebookDocumentSyncRegistrationType) {
    NotebookDocumentSyncRegistrationType.method = 'notebookDocument/sync';
    NotebookDocumentSyncRegistrationType.messageDirection = messages_1.MessageDirection.clientToServer;
    NotebookDocumentSyncRegistrationType.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType.method);
})(NotebookDocumentSyncRegistrationType = exports.NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = {}));
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
})(DidOpenNotebookDocumentNotification = exports.DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = {}));
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
})(NotebookCellArrayChange = exports.NotebookCellArrayChange || (exports.NotebookCellArrayChange = {}));
var DidChangeNotebookDocumentNotification;
(function (DidChangeNotebookDocumentNotification) {
    DidChangeNotebookDocumentNotification.method = 'notebookDocument/didChange';
    DidChangeNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification.method);
    DidChangeNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidChangeNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = {}));
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
})(DidSaveNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = {}));
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
})(DidCloseNotebookDocumentNotification = exports.DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = {}));


/***/ }),

/***/ 21862:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
const vscode_jsonrpc_1 = __webpack_require__(39054);
const messages_1 = __webpack_require__(66140);
var WorkDoneProgress;
(function (WorkDoneProgress) {
    WorkDoneProgress.type = new vscode_jsonrpc_1.ProgressType();
    function is(value) {
        return value === WorkDoneProgress.type;
    }
    WorkDoneProgress.is = is;
})(WorkDoneProgress = exports.WorkDoneProgress || (exports.WorkDoneProgress = {}));
/**
 * The `window/workDoneProgress/create` request is sent from the server to the client to initiate progress
 * reporting from the server.
 */
var WorkDoneProgressCreateRequest;
(function (WorkDoneProgressCreateRequest) {
    WorkDoneProgressCreateRequest.method = 'window/workDoneProgress/create';
    WorkDoneProgressCreateRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkDoneProgressCreateRequest.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest.method);
})(WorkDoneProgressCreateRequest = exports.WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = {}));
/**
 * The `window/workDoneProgress/cancel` notification is sent from  the client to the server to cancel a progress
 * initiated on the server side.
 */
var WorkDoneProgressCancelNotification;
(function (WorkDoneProgressCancelNotification) {
    WorkDoneProgressCancelNotification.method = 'window/workDoneProgress/cancel';
    WorkDoneProgressCancelNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkDoneProgressCancelNotification.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification.method);
})(WorkDoneProgressCancelNotification = exports.WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = {}));


/***/ }),

/***/ 5206:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectionRangeRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(SelectionRangeRequest = exports.SelectionRangeRequest || (exports.SelectionRangeRequest = {}));


/***/ }),

/***/ 39434:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
const messages_1 = __webpack_require__(66140);
//------- 'textDocument/semanticTokens' -----
var TokenFormat;
(function (TokenFormat) {
    TokenFormat.Relative = 'relative';
})(TokenFormat = exports.TokenFormat || (exports.TokenFormat = {}));
var SemanticTokensRegistrationType;
(function (SemanticTokensRegistrationType) {
    SemanticTokensRegistrationType.method = 'textDocument/semanticTokens';
    SemanticTokensRegistrationType.type = new messages_1.RegistrationType(SemanticTokensRegistrationType.method);
})(SemanticTokensRegistrationType = exports.SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRequest;
(function (SemanticTokensRequest) {
    SemanticTokensRequest.method = 'textDocument/semanticTokens/full';
    SemanticTokensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
    SemanticTokensRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRequest = exports.SemanticTokensRequest || (exports.SemanticTokensRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensDeltaRequest;
(function (SemanticTokensDeltaRequest) {
    SemanticTokensDeltaRequest.method = 'textDocument/semanticTokens/full/delta';
    SemanticTokensDeltaRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensDeltaRequest.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest.method);
    SemanticTokensDeltaRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensDeltaRequest = exports.SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRangeRequest;
(function (SemanticTokensRangeRequest) {
    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
    SemanticTokensRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
    SemanticTokensRangeRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRangeRequest = exports.SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRefreshRequest;
(function (SemanticTokensRefreshRequest) {
    SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
    SemanticTokensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    SemanticTokensRefreshRequest.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
})(SemanticTokensRefreshRequest = exports.SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = {}));


/***/ }),

/***/ 75726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowDocumentRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(ShowDocumentRequest = exports.ShowDocumentRequest || (exports.ShowDocumentRequest = {}));


/***/ }),

/***/ 71589:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeDefinitionRequest = void 0;
const messages_1 = __webpack_require__(66140);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Definition} or a
 * Thenable that resolves to such.
 */
var TypeDefinitionRequest;
(function (TypeDefinitionRequest) {
    TypeDefinitionRequest.method = 'textDocument/typeDefinition';
    TypeDefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeDefinitionRequest.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest.method);
})(TypeDefinitionRequest = exports.TypeDefinitionRequest || (exports.TypeDefinitionRequest = {}));


/***/ }),

/***/ 83693:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(66140);
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
})(TypeHierarchyPrepareRequest = exports.TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = {}));
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
})(TypeHierarchySupertypesRequest = exports.TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = {}));
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
})(TypeHierarchySubtypesRequest = exports.TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = {}));


/***/ }),

/***/ 98744:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
const messages_1 = __webpack_require__(66140);
/**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */
var WorkspaceFoldersRequest;
(function (WorkspaceFoldersRequest) {
    WorkspaceFoldersRequest.method = 'workspace/workspaceFolders';
    WorkspaceFoldersRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkspaceFoldersRequest.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest.method);
})(WorkspaceFoldersRequest = exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {}));
/**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */
var DidChangeWorkspaceFoldersNotification;
(function (DidChangeWorkspaceFoldersNotification) {
    DidChangeWorkspaceFoldersNotification.method = 'workspace/didChangeWorkspaceFolders';
    DidChangeWorkspaceFoldersNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWorkspaceFoldersNotification.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification.method);
})(DidChangeWorkspaceFoldersNotification = exports.DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = {}));


/***/ }),

/***/ 69533:
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

/***/ 91674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony export */   SelectionRange: () => (/* binding */ SelectionRange),
/* harmony export */   SemanticTokenModifiers: () => (/* binding */ SemanticTokenModifiers),
/* harmony export */   SemanticTokenTypes: () => (/* binding */ SemanticTokenTypes),
/* harmony export */   SemanticTokens: () => (/* binding */ SemanticTokens),
/* harmony export */   SignatureInformation: () => (/* binding */ SignatureInformation),
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
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Position} interface.
     */
    function is(value) {
        var candidate = value;
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
            throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Range} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Location} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the {@link LocationLink} interface.
     */
    function is(value) {
        var candidate = value;
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
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the {@link Color} interface.
     */
    function is(value) {
        var candidate = value;
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
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */
    function is(value) {
        var candidate = value;
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
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */
    function is(value) {
        var candidate = value;
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
        var result = {
            startLine: startLine,
            endLine: endLine
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
        var candidate = value;
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
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
     */
    function is(value) {
        var candidate = value;
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
        var candidate = value;
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
        var result = { range: range, message: message };
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
        var candidate = value;
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
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
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
        var candidate = value;
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
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
    function create(label, needsConfirmation, description) {
        var result = { label: label };
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
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) &&
            (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
    function is(value) {
        var candidate = value;
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
        return { range: range, newText: newText, annotationId: annotation };
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
        return { range: { start: position, end: position }, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.insert = insert;
    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */
    function del(range, annotation) {
        return { range: range, newText: '', annotationId: annotation };
    }
    AnnotatedTextEdit.del = del;
    function is(value) {
        var candidate = value;
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
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'create',
            uri: uri
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
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options, annotation) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
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
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'delete',
            uri: uri
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
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== undefined || candidate.documentChanges !== undefined) &&
            (candidate.documentChanges === undefined || candidate.documentChanges.every(function (change) {
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
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText, annotation) {
        var edit;
        var id;
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
    };
    TextEditChangeImpl.prototype.replace = function (range, newText, annotation) {
        var edit;
        var id;
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
    };
    TextEditChangeImpl.prototype.delete = function (range, annotation) {
        var edit;
        var id;
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
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    TextEditChangeImpl.prototype.assertChangeAnnotations = function (value) {
        if (value === undefined) {
            throw new Error("Text edit change is not configured to manage change annotations.");
        }
    };
    return TextEditChangeImpl;
}());
/**
 * A helper class
 */
var ChangeAnnotations = /** @class */ (function () {
    function ChangeAnnotations(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
    }
    ChangeAnnotations.prototype.all = function () {
        return this._annotations;
    };
    Object.defineProperty(ChangeAnnotations.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    ChangeAnnotations.prototype.manage = function (idOrAnnotation, annotation) {
        var id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
            id = idOrAnnotation;
        }
        else {
            id = this.nextId();
            annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
            throw new Error("Id ".concat(id, " is already in use."));
        }
        if (annotation === undefined) {
            throw new Error("No annotation provided for id ".concat(id));
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
    };
    ChangeAnnotations.prototype.nextId = function () {
        this._counter++;
        return this._counter.toString();
    };
    return ChangeAnnotations;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
        else {
            this._workspaceEdit = {};
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying {@link WorkspaceEdit} literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === undefined) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = { uri: key.uri, version: key.version };
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
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
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.initDocumentChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._changeAnnotations = new ChangeAnnotations();
            this._workspaceEdit.documentChanges = [];
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
    };
    WorkspaceChange.prototype.initChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._workspaceEdit.changes = Object.create(null);
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
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
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
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
    };
    WorkspaceChange.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
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
    };
    return WorkspaceChange;
}());

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
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link TextDocumentIdentifier} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link VersionedTextDocumentIdentifier} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { uri: uri, version: version };
    }
    OptionalVersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the {@link OptionalVersionedTextDocumentIdentifier} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
     */
    function is(value) {
        var candidate = value;
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
        var candidate = value;
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
        var candidate = value;
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
        return { newText: newText, insert: insert, replace: replace };
    }
    InsertReplaceEdit.create = create;
    /**
     * Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
     */
    function is(value) {
        var candidate = value;
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
        var candidate = value;
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
        return { label: label };
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
        var candidate = value;
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
        var candidate = value;
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
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * {@link SignatureInformation} literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
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
        var result = { range: range };
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
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
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
            ? { name: name, kind: kind, location: { uri: uri, range: range } }
            : { name: name, kind: kind, location: { uri: uri } };
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
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
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
        var candidate = value;
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
        var result = { diagnostics: diagnostics };
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
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is)
            && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string))
            && (candidate.triggerKind === undefined || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, kindOrCommandOrEdit, kind) {
        var result = { title: title };
        var checkKind = true;
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
        var candidate = value;
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
        var result = { range: range };
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
        var candidate = value;
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
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the {@link FormattingOptions} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the {@link DocumentLink} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { range: range, parent: parent };
    }
    SelectionRange.create = create;
    function is(value) {
        var candidate = value;
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
        var candidate = value;
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
        return { range: range, text: text };
    }
    InlineValueText.create = create;
    function is(value) {
        var candidate = value;
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
        return { range: range, variableName: variableName, caseSensitiveLookup: caseSensitiveLookup };
    }
    InlineValueVariableLookup.create = create;
    function is(value) {
        var candidate = value;
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
        return { range: range, expression: expression };
    }
    InlineValueEvaluatableExpression.create = create;
    function is(value) {
        var candidate = value;
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
        return { frameId: frameId, stoppedLocation: stoppedLocation };
    }
    InlineValueContext.create = create;
    /**
     * Checks whether the given literal conforms to the {@link InlineValueContext} interface.
     */
    function is(value) {
        var candidate = value;
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
        return { value: value };
    }
    InlayHintLabelPart.create = create;
    function is(value) {
        var candidate = value;
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
        var result = { position: position, label: label };
        if (kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    InlayHint.create = create;
    function is(value) {
        var candidate = value;
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
var WorkspaceFolder;
(function (WorkspaceFolder) {
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
    }
    WorkspaceFolder.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var EOL = ['\n', '\r\n', '\r'];
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
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
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
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
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
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
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
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvSEFBb0gsdUJBQXVCLFVBQVUscUJBQXFCO0FBQzFLO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7Ozs7QUM3WUg7QUFDYjtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscUJBQXFCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdCQUFnQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9icm93c2VyL21haW4uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvYnJvd3Nlci9yaWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vY2FuY2VsbGF0aW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9jb25uZWN0aW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9kaXNwb3NhYmxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL2lzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9saW5rZWRNYXAuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL21lc3NhZ2VCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL21lc3NhZ2VSZWFkZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL21lc3NhZ2VXcml0ZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL21lc3NhZ2VzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWpzb25ycGMvbGliL2NvbW1vbi9yYWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtanNvbnJwYy9saWIvY29tbW9uL3NlbWFwaG9yZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1qc29ucnBjL2xpYi9jb21tb24vc2hhcmVkQXJyYXlDYW5jZWxsYXRpb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvYnJvd3Nlci9tYWluLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vYXBpLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vY29ubmVjdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL21lc3NhZ2VzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuY2FsbEhpZXJhcmNoeS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmNvbG9yUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5jb25maWd1cmF0aW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuZGVjbGFyYXRpb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5kaWFnbm9zdGljLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuZmlsZU9wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5mb2xkaW5nUmFuZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmlubGF5SGludC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLmlubGluZVZhbHVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5saW5rZWRFZGl0aW5nUmFuZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5tb25pa2VyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wubm90ZWJvb2suanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLnNlbGVjdGlvblJhbmdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvdnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2xpYi9jb21tb24vcHJvdG9jb2wuc2VtYW50aWNUb2tlbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC5zaG93RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC50eXBlRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9saWIvY29tbW9uL3Byb3RvY29sLnR5cGVIaWVyYXJjaHkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi9wcm90b2NvbC53b3Jrc3BhY2VGb2xkZXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvbGliL2NvbW1vbi91dGlscy9pcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9saWIvZXNtL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYnJvd3Nlci9tYWluJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24gPSBleHBvcnRzLkJyb3dzZXJNZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5Ccm93c2VyTWVzc2FnZVJlYWRlciA9IHZvaWQgMDtcbmNvbnN0IHJpbF8xID0gcmVxdWlyZShcIi4vcmlsXCIpO1xuLy8gSW5zdGFsbCB0aGUgYnJvd3NlciBydW50aW1lIGFic3RyYWN0LlxucmlsXzEuZGVmYXVsdC5pbnN0YWxsKCk7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpLCBleHBvcnRzKTtcbmNsYXNzIEJyb3dzZXJNZXNzYWdlUmVhZGVyIGV4dGVuZHMgYXBpXzEuQWJzdHJhY3RNZXNzYWdlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3J0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX29uRGF0YSA9IG5ldyBhcGlfMS5FbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25EYXRhLmZpcmUoZXZlbnQuZGF0YSk7XG4gICAgICAgIH07XG4gICAgICAgIHBvcnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZlbnQpID0+IHRoaXMuZmlyZUVycm9yKGV2ZW50KSk7XG4gICAgICAgIHBvcnQub25tZXNzYWdlID0gdGhpcy5fbWVzc2FnZUxpc3RlbmVyO1xuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uRGF0YS5ldmVudChjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5Ccm93c2VyTWVzc2FnZVJlYWRlciA9IEJyb3dzZXJNZXNzYWdlUmVhZGVyO1xuY2xhc3MgQnJvd3Nlck1lc3NhZ2VXcml0ZXIgZXh0ZW5kcyBhcGlfMS5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBvcnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy5lcnJvckNvdW50ID0gMDtcbiAgICAgICAgcG9ydC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4gdGhpcy5maXJlRXJyb3IoZXZlbnQpKTtcbiAgICB9XG4gICAgd3JpdGUobXNnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIG1zZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtc2cpIHtcbiAgICAgICAgdGhpcy5lcnJvckNvdW50Kys7XG4gICAgICAgIHRoaXMuZmlyZUVycm9yKGVycm9yLCBtc2csIHRoaXMuZXJyb3JDb3VudCk7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICB9XG59XG5leHBvcnRzLkJyb3dzZXJNZXNzYWdlV3JpdGVyID0gQnJvd3Nlck1lc3NhZ2VXcml0ZXI7XG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlQ29ubmVjdGlvbihyZWFkZXIsIHdyaXRlciwgbG9nZ2VyLCBvcHRpb25zKSB7XG4gICAgaWYgKGxvZ2dlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlciA9IGFwaV8xLk51bGxMb2dnZXI7XG4gICAgfVxuICAgIGlmIChhcGlfMS5Db25uZWN0aW9uU3RyYXRlZ3kuaXMob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgY29ubmVjdGlvblN0cmF0ZWd5OiBvcHRpb25zIH07XG4gICAgfVxuICAgIHJldHVybiAoMCwgYXBpXzEuY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24pKHJlYWRlciwgd3JpdGVyLCBsb2dnZXIsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGNyZWF0ZU1lc3NhZ2VDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBpXCIpO1xuY2xhc3MgTWVzc2FnZUJ1ZmZlciBleHRlbmRzIGFwaV8xLkFic3RyYWN0TWVzc2FnZUJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoZW5jb2RpbmcgPSAndXRmLTgnKSB7XG4gICAgICAgIHN1cGVyKGVuY29kaW5nKTtcbiAgICAgICAgdGhpcy5hc2NpaURlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ2FzY2lpJyk7XG4gICAgfVxuICAgIGVtcHR5QnVmZmVyKCkge1xuICAgICAgICByZXR1cm4gTWVzc2FnZUJ1ZmZlci5lbXB0eUJ1ZmZlcjtcbiAgICB9XG4gICAgZnJvbVN0cmluZyh2YWx1ZSwgX2VuY29kaW5nKSB7XG4gICAgICAgIHJldHVybiAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKHZhbHVlLCBlbmNvZGluZykge1xuICAgICAgICBpZiAoZW5jb2RpbmcgPT09ICdhc2NpaScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzY2lpRGVjb2Rlci5kZWNvZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChuZXcgVGV4dERlY29kZXIoZW5jb2RpbmcpKS5kZWNvZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzTmF0aXZlKGJ1ZmZlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXIuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbGxvY05hdGl2ZShsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgfVxufVxuTWVzc2FnZUJ1ZmZlci5lbXB0eUJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDApO1xuY2xhc3MgUmVhZGFibGVTdHJlYW1XcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihzb2NrZXQpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICAgIHRoaXMuX29uRGF0YSA9IG5ldyBhcGlfMS5FbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBibG9iLmFycmF5QnVmZmVyKCkudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25EYXRhLmZpcmUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgKDAsIGFwaV8xLlJBTCkoKS5jb25zb2xlLmVycm9yKGBDb252ZXJ0aW5nIGJsb2IgdG8gYXJyYXkgYnVmZmVyIGZhaWxlZC5gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5fbWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgb25DbG9zZShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIGFwaV8xLkRpc3Bvc2FibGUuY3JlYXRlKCgpID0+IHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25FcnJvcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIGFwaV8xLkRpc3Bvc2FibGUuY3JlYXRlKCgpID0+IHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25FbmQobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZW5kJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kJywgbGlzdGVuZXIpKTtcbiAgICB9XG4gICAgb25EYXRhKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkRhdGEuZXZlbnQobGlzdGVuZXIpO1xuICAgIH1cbn1cbmNsYXNzIFdyaXRhYmxlU3RyZWFtV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3Ioc29ja2V0KSB7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIH1cbiAgICBvbkNsb3NlKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICBvbkVycm9yKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gYXBpXzEuRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICBvbkVuZChsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlbmQnLCBsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiBhcGlfMS5EaXNwb3NhYmxlLmNyZWF0ZSgoKSA9PiB0aGlzLnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmQnLCBsaXN0ZW5lcikpO1xuICAgIH1cbiAgICB3cml0ZShkYXRhLCBlbmNvZGluZykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiBlbmNvZGluZyAhPT0gJ3V0Zi04Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW4gYSBCcm93c2VyIGVudmlyb25tZW50cyBvbmx5IHV0Zi04IHRleHQgZW5jb2RpbmcgaXMgc3VwcG9ydGVkLiBCdXQgZ290IGVuY29kaW5nOiAke2VuY29kaW5nfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgfVxufVxuY29uc3QgX3RleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5jb25zdCBfcmlsID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgbWVzc2FnZUJ1ZmZlcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGNyZWF0ZTogKGVuY29kaW5nKSA9PiBuZXcgTWVzc2FnZUJ1ZmZlcihlbmNvZGluZylcbiAgICB9KSxcbiAgICBhcHBsaWNhdGlvbkpzb246IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBlbmNvZGVyOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIG5hbWU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIGVuY29kZTogKG1zZywgb3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgIT09ICd1dGYtOCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbiBhIEJyb3dzZXIgZW52aXJvbm1lbnRzIG9ubHkgdXRmLTggdGV4dCBlbmNvZGluZyBpcyBzdXBwb3J0ZWQuIEJ1dCBnb3QgZW5jb2Rpbmc6ICR7b3B0aW9ucy5jaGFyc2V0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF90ZXh0RW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkobXNnLCB1bmRlZmluZWQsIDApKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZWNvZGVyOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIG5hbWU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIGRlY29kZTogKGJ1ZmZlciwgb3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW4gYSBCcm93c2VyIGVudmlyb25tZW50cyBvbmx5IFVpbnQ4QXJyYXlzIGFyZSBzdXBwb3J0ZWQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShuZXcgVGV4dERlY29kZXIob3B0aW9ucy5jaGFyc2V0KS5kZWNvZGUoYnVmZmVyKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pLFxuICAgIHN0cmVhbTogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGFzUmVhZGFibGVTdHJlYW06IChzb2NrZXQpID0+IG5ldyBSZWFkYWJsZVN0cmVhbVdyYXBwZXIoc29ja2V0KSxcbiAgICAgICAgYXNXcml0YWJsZVN0cmVhbTogKHNvY2tldCkgPT4gbmV3IFdyaXRhYmxlU3RyZWFtV3JhcHBlcihzb2NrZXQpXG4gICAgfSksXG4gICAgY29uc29sZTogY29uc29sZSxcbiAgICB0aW1lcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcywgLi4uYXJncyk7XG4gICAgICAgICAgICByZXR1cm4geyBkaXNwb3NlOiAoKSA9PiBjbGVhclRpbWVvdXQoaGFuZGxlKSB9O1xuICAgICAgICB9LFxuICAgICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2ssIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIDAsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGlzcG9zZTogKCkgPT4gY2xlYXJUaW1lb3V0KGhhbmRsZSkgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIG1zLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRJbnRlcnZhbChjYWxsYmFjaywgbXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGlzcG9zZTogKCkgPT4gY2xlYXJJbnRlcnZhbChoYW5kbGUpIH07XG4gICAgICAgIH0sXG4gICAgfSlcbn0pO1xuZnVuY3Rpb24gUklMKCkge1xuICAgIHJldHVybiBfcmlsO1xufVxuKGZ1bmN0aW9uIChSSUwpIHtcbiAgICBmdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgICAgICBhcGlfMS5SQUwuaW5zdGFsbChfcmlsKTtcbiAgICB9XG4gICAgUklMLmluc3RhbGwgPSBpbnN0YWxsO1xufSkoUklMIHx8IChSSUwgPSB7fSkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUklMO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy90aGVuYWJsZS5kLnRzXCIgLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUHJvZ3Jlc3NUeXBlID0gZXhwb3J0cy5Qcm9ncmVzc1Rva2VuID0gZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGV4cG9ydHMuTnVsbExvZ2dlciA9IGV4cG9ydHMuQ29ubmVjdGlvbk9wdGlvbnMgPSBleHBvcnRzLkNvbm5lY3Rpb25TdHJhdGVneSA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlQnVmZmVyID0gZXhwb3J0cy5Xcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIgPSBleHBvcnRzLk1lc3NhZ2VXcml0ZXIgPSBleHBvcnRzLlJlYWRhYmxlU3RyZWFtTWVzc2FnZVJlYWRlciA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlUmVhZGVyID0gZXhwb3J0cy5NZXNzYWdlUmVhZGVyID0gZXhwb3J0cy5TaGFyZWRBcnJheVJlY2VpdmVyU3RyYXRlZ3kgPSBleHBvcnRzLlNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblRva2VuID0gZXhwb3J0cy5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZSA9IGV4cG9ydHMuRW1pdHRlciA9IGV4cG9ydHMuRXZlbnQgPSBleHBvcnRzLkRpc3Bvc2FibGUgPSBleHBvcnRzLkxSVUNhY2hlID0gZXhwb3J0cy5Ub3VjaCA9IGV4cG9ydHMuTGlua2VkTWFwID0gZXhwb3J0cy5QYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlOSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTggPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU3ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTUgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU0ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMyA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTIgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGUxID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuRXJyb3JDb2RlcyA9IGV4cG9ydHMuUmVzcG9uc2VFcnJvciA9IGV4cG9ydHMuUmVxdWVzdFR5cGU5ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTggPSBleHBvcnRzLlJlcXVlc3RUeXBlNyA9IGV4cG9ydHMuUmVxdWVzdFR5cGU2ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTUgPSBleHBvcnRzLlJlcXVlc3RUeXBlNCA9IGV4cG9ydHMuUmVxdWVzdFR5cGUzID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTIgPSBleHBvcnRzLlJlcXVlc3RUeXBlMSA9IGV4cG9ydHMuUmVxdWVzdFR5cGUwID0gZXhwb3J0cy5SZXF1ZXN0VHlwZSA9IGV4cG9ydHMuTWVzc2FnZSA9IGV4cG9ydHMuUkFMID0gdm9pZCAwO1xuZXhwb3J0cy5NZXNzYWdlU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblN0cmF0ZWd5ID0gZXhwb3J0cy5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneSA9IGV4cG9ydHMuQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuQ29ubmVjdGlvbkVycm9yID0gZXhwb3J0cy5Db25uZWN0aW9uRXJyb3JzID0gZXhwb3J0cy5Mb2dUcmFjZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuU2V0VHJhY2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlRyYWNlRm9ybWF0ID0gZXhwb3J0cy5UcmFjZVZhbHVlcyA9IGV4cG9ydHMuVHJhY2UgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZXNzYWdlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk1lc3NhZ2U7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlMFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTA7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGUxOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGUyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlMjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlM1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGU0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGU1XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlNTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlNlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTY7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0VHlwZTdcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUmVxdWVzdFR5cGU3OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVxdWVzdFR5cGU4XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlcXVlc3RUeXBlODsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcXVlc3RUeXBlOVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5SZXF1ZXN0VHlwZTk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXNwb25zZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFcnJvckNvZGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLkVycm9yQ29kZXM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlMFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlMDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGUxXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGUxOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZTJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlM1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlMzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGU0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZTVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlNlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlNjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblR5cGU3XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGU3OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uVHlwZThcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZTg7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25UeXBlOVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlOTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBhcmFtZXRlclN0cnVjdHVyZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlczsgfSB9KTtcbmNvbnN0IGxpbmtlZE1hcF8xID0gcmVxdWlyZShcIi4vbGlua2VkTWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTGlua2VkTWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsaW5rZWRNYXBfMS5MaW5rZWRNYXA7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMUlVDYWNoZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGlua2VkTWFwXzEuTFJVQ2FjaGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUb3VjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGlua2VkTWFwXzEuVG91Y2g7IH0gfSk7XG5jb25zdCBkaXNwb3NhYmxlXzEgPSByZXF1aXJlKFwiLi9kaXNwb3NhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRGlzcG9zYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzcG9zYWJsZV8xLkRpc3Bvc2FibGU7IH0gfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50c1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV2ZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBldmVudHNfMS5FdmVudDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVtaXR0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV2ZW50c18xLkVtaXR0ZXI7IH0gfSk7XG5jb25zdCBjYW5jZWxsYXRpb25fMSA9IHJlcXVpcmUoXCIuL2NhbmNlbGxhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblRva2VuU291cmNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblRva2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYW5jZWxsYXRpb25fMS5DYW5jZWxsYXRpb25Ub2tlbjsgfSB9KTtcbmNvbnN0IHNoYXJlZEFycmF5Q2FuY2VsbGF0aW9uXzEgPSByZXF1aXJlKFwiLi9zaGFyZWRBcnJheUNhbmNlbGxhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNoYXJlZEFycmF5Q2FuY2VsbGF0aW9uXzEuU2hhcmVkQXJyYXlTZW5kZXJTdHJhdGVneTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2hhcmVkQXJyYXlDYW5jZWxsYXRpb25fMS5TaGFyZWRBcnJheVJlY2VpdmVyU3RyYXRlZ3k7IH0gfSk7XG5jb25zdCBtZXNzYWdlUmVhZGVyXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlUmVhZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWVzc2FnZVJlYWRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZVJlYWRlcl8xLk1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VSZWFkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VSZWFkZXJfMS5BYnN0cmFjdE1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VSZWFkZXJfMS5SZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXI7IH0gfSk7XG5jb25zdCBtZXNzYWdlV3JpdGVyXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlV3JpdGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWVzc2FnZVdyaXRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVzc2FnZVdyaXRlcl8xLk1lc3NhZ2VXcml0ZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VXcml0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VXcml0ZXJfMS5BYnN0cmFjdE1lc3NhZ2VXcml0ZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXNzYWdlV3JpdGVyXzEuV3JpdGVhYmxlU3RyZWFtTWVzc2FnZVdyaXRlcjsgfSB9KTtcbmNvbnN0IG1lc3NhZ2VCdWZmZXJfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VCdWZmZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBYnN0cmFjdE1lc3NhZ2VCdWZmZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lc3NhZ2VCdWZmZXJfMS5BYnN0cmFjdE1lc3NhZ2VCdWZmZXI7IH0gfSk7XG5jb25zdCBjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9jb25uZWN0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29ubmVjdGlvblN0cmF0ZWd5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ29ubmVjdGlvblN0cmF0ZWd5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29ubmVjdGlvbk9wdGlvbnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5Db25uZWN0aW9uT3B0aW9uczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk51bGxMb2dnZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5OdWxsTG9nZ2VyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlByb2dyZXNzVG9rZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5Qcm9ncmVzc1Rva2VuOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJvZ3Jlc3NUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuUHJvZ3Jlc3NUeXBlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHJhY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5UcmFjZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRyYWNlVmFsdWVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuVHJhY2VWYWx1ZXM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUcmFjZUZvcm1hdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdGlvbl8xLlRyYWNlRm9ybWF0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2V0VHJhY2VOb3RpZmljYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5TZXRUcmFjZU5vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxvZ1RyYWNlTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuTG9nVHJhY2VOb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb25uZWN0aW9uRXJyb3JzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ29ubmVjdGlvbkVycm9yczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbm5lY3Rpb25FcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdGlvbl8xLkNvbm5lY3Rpb25FcnJvcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5DYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5DYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNhbmNlbGxhdGlvblN0cmF0ZWd5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuQ2FuY2VsbGF0aW9uU3RyYXRlZ3k7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNZXNzYWdlU3RyYXRlZ3lcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3Rpb25fMS5NZXNzYWdlU3RyYXRlZ3k7IH0gfSk7XG5jb25zdCByYWxfMSA9IHJlcXVpcmUoXCIuL3JhbFwiKTtcbmV4cG9ydHMuUkFMID0gcmFsXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhbmNlbGxhdGlvblRva2VuU291cmNlID0gZXhwb3J0cy5DYW5jZWxsYXRpb25Ub2tlbiA9IHZvaWQgMDtcbmNvbnN0IHJhbF8xID0gcmVxdWlyZShcIi4vcmFsXCIpO1xuY29uc3QgSXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xudmFyIENhbmNlbGxhdGlvblRva2VuO1xuKGZ1bmN0aW9uIChDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIENhbmNlbGxhdGlvblRva2VuLk5vbmUgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IGZhbHNlLFxuICAgICAgICBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZDogZXZlbnRzXzEuRXZlbnQuTm9uZVxuICAgIH0pO1xuICAgIENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZCA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZDogdHJ1ZSxcbiAgICAgICAgb25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQ6IGV2ZW50c18xLkV2ZW50Lk5vbmVcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoY2FuZGlkYXRlID09PSBDYW5jZWxsYXRpb25Ub2tlbi5Ob25lXG4gICAgICAgICAgICB8fCBjYW5kaWRhdGUgPT09IENhbmNlbGxhdGlvblRva2VuLkNhbmNlbGxlZFxuICAgICAgICAgICAgfHwgKElzLmJvb2xlYW4oY2FuZGlkYXRlLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKSAmJiAhIWNhbmRpZGF0ZS5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZCkpO1xuICAgIH1cbiAgICBDYW5jZWxsYXRpb25Ub2tlbi5pcyA9IGlzO1xufSkoQ2FuY2VsbGF0aW9uVG9rZW4gPSBleHBvcnRzLkNhbmNlbGxhdGlvblRva2VuIHx8IChleHBvcnRzLkNhbmNlbGxhdGlvblRva2VuID0ge30pKTtcbmNvbnN0IHNob3J0Y3V0RXZlbnQgPSBPYmplY3QuZnJlZXplKGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGNvbnN0IGhhbmRsZSA9ICgwLCByYWxfMS5kZWZhdWx0KSgpLnRpbWVyLnNldFRpbWVvdXQoY2FsbGJhY2suYmluZChjb250ZXh0KSwgMCk7XG4gICAgcmV0dXJuIHsgZGlzcG9zZSgpIHsgaGFuZGxlLmRpc3Bvc2UoKTsgfSB9O1xufSk7XG5jbGFzcyBNdXRhYmxlVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdHRlci5maXJlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNDYW5jZWxsZWQ7XG4gICAgfVxuICAgIGdldCBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvcnRjdXRFdmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2VtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fZW1pdHRlcikge1xuICAgICAgICAgICAgdGhpcy5fZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0dGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2Uge1xuICAgIGdldCB0b2tlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2tlbikge1xuICAgICAgICAgICAgLy8gYmUgbGF6eSBhbmQgY3JlYXRlIHRoZSB0b2tlbiBvbmx5IHdoZW5cbiAgICAgICAgICAgIC8vIGFjdHVhbGx5IG5lZWRlZFxuICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBuZXcgTXV0YWJsZVRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdG9rZW4pIHtcbiAgICAgICAgICAgIC8vIHNhdmUgYW4gb2JqZWN0IGJ5IHJldHVybmluZyB0aGUgZGVmYXVsdFxuICAgICAgICAgICAgLy8gY2FuY2VsbGVkIHRva2VuIHdoZW4gY2FuY2VsbGF0aW9uIGhhcHBlbnNcbiAgICAgICAgICAgIC8vIGJlZm9yZSBzb21lb25lIGFza3MgZm9yIHRoZSB0b2tlblxuICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBDYW5jZWxsYXRpb25Ub2tlbi5DYW5jZWxsZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90b2tlbi5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Rva2VuKSB7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdG8gaW5pdGlhbGl6ZSB3aXRoIGFuIGVtcHR5IHRva2VuIGlmIHdlIGhhZCBub25lXG4gICAgICAgICAgICB0aGlzLl90b2tlbiA9IENhbmNlbGxhdGlvblRva2VuLk5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdG9rZW4gaW5zdGFuY2VvZiBNdXRhYmxlVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIGFjdHVhbGx5IGRpc3Bvc2VcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UgPSBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGV4cG9ydHMuQ29ubmVjdGlvbk9wdGlvbnMgPSBleHBvcnRzLk1lc3NhZ2VTdHJhdGVneSA9IGV4cG9ydHMuQ2FuY2VsbGF0aW9uU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5ID0gZXhwb3J0cy5DYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5ID0gZXhwb3J0cy5SZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuSWRDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5ID0gZXhwb3J0cy5Db25uZWN0aW9uU3RyYXRlZ3kgPSBleHBvcnRzLkNvbm5lY3Rpb25FcnJvciA9IGV4cG9ydHMuQ29ubmVjdGlvbkVycm9ycyA9IGV4cG9ydHMuTG9nVHJhY2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlNldFRyYWNlTm90aWZpY2F0aW9uID0gZXhwb3J0cy5UcmFjZUZvcm1hdCA9IGV4cG9ydHMuVHJhY2VWYWx1ZXMgPSBleHBvcnRzLlRyYWNlID0gZXhwb3J0cy5OdWxsTG9nZ2VyID0gZXhwb3J0cy5Qcm9ncmVzc1R5cGUgPSBleHBvcnRzLlByb2dyZXNzVG9rZW4gPSB2b2lkIDA7XG5jb25zdCByYWxfMSA9IHJlcXVpcmUoXCIuL3JhbFwiKTtcbmNvbnN0IElzID0gcmVxdWlyZShcIi4vaXNcIik7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG5jb25zdCBsaW5rZWRNYXBfMSA9IHJlcXVpcmUoXCIuL2xpbmtlZE1hcFwiKTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuY29uc3QgY2FuY2VsbGF0aW9uXzEgPSByZXF1aXJlKFwiLi9jYW5jZWxsYXRpb25cIik7XG52YXIgQ2FuY2VsTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChDYW5jZWxOb3RpZmljYXRpb24pIHtcbiAgICBDYW5jZWxOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLk5vdGlmaWNhdGlvblR5cGUoJyQvY2FuY2VsUmVxdWVzdCcpO1xufSkoQ2FuY2VsTm90aWZpY2F0aW9uIHx8IChDYW5jZWxOb3RpZmljYXRpb24gPSB7fSkpO1xudmFyIFByb2dyZXNzVG9rZW47XG4oZnVuY3Rpb24gKFByb2dyZXNzVG9rZW4pIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICAgIH1cbiAgICBQcm9ncmVzc1Rva2VuLmlzID0gaXM7XG59KShQcm9ncmVzc1Rva2VuID0gZXhwb3J0cy5Qcm9ncmVzc1Rva2VuIHx8IChleHBvcnRzLlByb2dyZXNzVG9rZW4gPSB7fSkpO1xudmFyIFByb2dyZXNzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChQcm9ncmVzc05vdGlmaWNhdGlvbikge1xuICAgIFByb2dyZXNzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Ob3RpZmljYXRpb25UeXBlKCckL3Byb2dyZXNzJyk7XG59KShQcm9ncmVzc05vdGlmaWNhdGlvbiB8fCAoUHJvZ3Jlc3NOb3RpZmljYXRpb24gPSB7fSkpO1xuY2xhc3MgUHJvZ3Jlc3NUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG59XG5leHBvcnRzLlByb2dyZXNzVHlwZSA9IFByb2dyZXNzVHlwZTtcbnZhciBTdGFyUmVxdWVzdEhhbmRsZXI7XG4oZnVuY3Rpb24gKFN0YXJSZXF1ZXN0SGFuZGxlcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBJcy5mdW5jKHZhbHVlKTtcbiAgICB9XG4gICAgU3RhclJlcXVlc3RIYW5kbGVyLmlzID0gaXM7XG59KShTdGFyUmVxdWVzdEhhbmRsZXIgfHwgKFN0YXJSZXF1ZXN0SGFuZGxlciA9IHt9KSk7XG5leHBvcnRzLk51bGxMb2dnZXIgPSBPYmplY3QuZnJlZXplKHtcbiAgICBlcnJvcjogKCkgPT4geyB9LFxuICAgIHdhcm46ICgpID0+IHsgfSxcbiAgICBpbmZvOiAoKSA9PiB7IH0sXG4gICAgbG9nOiAoKSA9PiB7IH1cbn0pO1xudmFyIFRyYWNlO1xuKGZ1bmN0aW9uIChUcmFjZSkge1xuICAgIFRyYWNlW1RyYWNlW1wiT2ZmXCJdID0gMF0gPSBcIk9mZlwiO1xuICAgIFRyYWNlW1RyYWNlW1wiTWVzc2FnZXNcIl0gPSAxXSA9IFwiTWVzc2FnZXNcIjtcbiAgICBUcmFjZVtUcmFjZVtcIkNvbXBhY3RcIl0gPSAyXSA9IFwiQ29tcGFjdFwiO1xuICAgIFRyYWNlW1RyYWNlW1wiVmVyYm9zZVwiXSA9IDNdID0gXCJWZXJib3NlXCI7XG59KShUcmFjZSA9IGV4cG9ydHMuVHJhY2UgfHwgKGV4cG9ydHMuVHJhY2UgPSB7fSkpO1xudmFyIFRyYWNlVmFsdWVzO1xuKGZ1bmN0aW9uIChUcmFjZVZhbHVlcykge1xuICAgIC8qKlxuICAgICAqIFR1cm4gdHJhY2luZyBvZmYuXG4gICAgICovXG4gICAgVHJhY2VWYWx1ZXMuT2ZmID0gJ29mZic7XG4gICAgLyoqXG4gICAgICogVHJhY2UgbWVzc2FnZXMgb25seS5cbiAgICAgKi9cbiAgICBUcmFjZVZhbHVlcy5NZXNzYWdlcyA9ICdtZXNzYWdlcyc7XG4gICAgLyoqXG4gICAgICogQ29tcGFjdCBtZXNzYWdlIHRyYWNpbmcuXG4gICAgICovXG4gICAgVHJhY2VWYWx1ZXMuQ29tcGFjdCA9ICdjb21wYWN0JztcbiAgICAvKipcbiAgICAgKiBWZXJib3NlIG1lc3NhZ2UgdHJhY2luZy5cbiAgICAgKi9cbiAgICBUcmFjZVZhbHVlcy5WZXJib3NlID0gJ3ZlcmJvc2UnO1xufSkoVHJhY2VWYWx1ZXMgPSBleHBvcnRzLlRyYWNlVmFsdWVzIHx8IChleHBvcnRzLlRyYWNlVmFsdWVzID0ge30pKTtcbihmdW5jdGlvbiAoVHJhY2UpIHtcbiAgICBmdW5jdGlvbiBmcm9tU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIGlmICghSXMuc3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFRyYWNlLk9mZjtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ29mZic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYWNlLk9mZjtcbiAgICAgICAgICAgIGNhc2UgJ21lc3NhZ2VzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhY2UuTWVzc2FnZXM7XG4gICAgICAgICAgICBjYXNlICdjb21wYWN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhY2UuQ29tcGFjdDtcbiAgICAgICAgICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiBUcmFjZS5WZXJib3NlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhY2UuT2ZmO1xuICAgICAgICB9XG4gICAgfVxuICAgIFRyYWNlLmZyb21TdHJpbmcgPSBmcm9tU3RyaW5nO1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgVHJhY2UuT2ZmOlxuICAgICAgICAgICAgICAgIHJldHVybiAnb2ZmJztcbiAgICAgICAgICAgIGNhc2UgVHJhY2UuTWVzc2FnZXM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtZXNzYWdlcyc7XG4gICAgICAgICAgICBjYXNlIFRyYWNlLkNvbXBhY3Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjb21wYWN0JztcbiAgICAgICAgICAgIGNhc2UgVHJhY2UuVmVyYm9zZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlcmJvc2UnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ29mZic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgVHJhY2UudG9TdHJpbmcgPSB0b1N0cmluZztcbn0pKFRyYWNlID0gZXhwb3J0cy5UcmFjZSB8fCAoZXhwb3J0cy5UcmFjZSA9IHt9KSk7XG52YXIgVHJhY2VGb3JtYXQ7XG4oZnVuY3Rpb24gKFRyYWNlRm9ybWF0KSB7XG4gICAgVHJhY2VGb3JtYXRbXCJUZXh0XCJdID0gXCJ0ZXh0XCI7XG4gICAgVHJhY2VGb3JtYXRbXCJKU09OXCJdID0gXCJqc29uXCI7XG59KShUcmFjZUZvcm1hdCA9IGV4cG9ydHMuVHJhY2VGb3JtYXQgfHwgKGV4cG9ydHMuVHJhY2VGb3JtYXQgPSB7fSkpO1xuKGZ1bmN0aW9uIChUcmFjZUZvcm1hdCkge1xuICAgIGZ1bmN0aW9uIGZyb21TdHJpbmcodmFsdWUpIHtcbiAgICAgICAgaWYgKCFJcy5zdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJhY2VGb3JtYXQuSlNPTjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBUcmFjZUZvcm1hdC5UZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFRyYWNlRm9ybWF0LmZyb21TdHJpbmcgPSBmcm9tU3RyaW5nO1xufSkoVHJhY2VGb3JtYXQgPSBleHBvcnRzLlRyYWNlRm9ybWF0IHx8IChleHBvcnRzLlRyYWNlRm9ybWF0ID0ge30pKTtcbnZhciBTZXRUcmFjZU5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoU2V0VHJhY2VOb3RpZmljYXRpb24pIHtcbiAgICBTZXRUcmFjZU5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZSgnJC9zZXRUcmFjZScpO1xufSkoU2V0VHJhY2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlNldFRyYWNlTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlNldFRyYWNlTm90aWZpY2F0aW9uID0ge30pKTtcbnZhciBMb2dUcmFjZU5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoTG9nVHJhY2VOb3RpZmljYXRpb24pIHtcbiAgICBMb2dUcmFjZU5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuTm90aWZpY2F0aW9uVHlwZSgnJC9sb2dUcmFjZScpO1xufSkoTG9nVHJhY2VOb3RpZmljYXRpb24gPSBleHBvcnRzLkxvZ1RyYWNlTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkxvZ1RyYWNlTm90aWZpY2F0aW9uID0ge30pKTtcbnZhciBDb25uZWN0aW9uRXJyb3JzO1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uRXJyb3JzKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbm5lY3Rpb24gaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25FcnJvcnNbQ29ubmVjdGlvbkVycm9yc1tcIkNsb3NlZFwiXSA9IDFdID0gXCJDbG9zZWRcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgY29ubmVjdGlvbiBnb3QgZGlzcG9zZWQuXG4gICAgICovXG4gICAgQ29ubmVjdGlvbkVycm9yc1tDb25uZWN0aW9uRXJyb3JzW1wiRGlzcG9zZWRcIl0gPSAyXSA9IFwiRGlzcG9zZWRcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIGxpc3RlbmluZyBtb2RlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25FcnJvcnNbQ29ubmVjdGlvbkVycm9yc1tcIkFscmVhZHlMaXN0ZW5pbmdcIl0gPSAzXSA9IFwiQWxyZWFkeUxpc3RlbmluZ1wiO1xufSkoQ29ubmVjdGlvbkVycm9ycyA9IGV4cG9ydHMuQ29ubmVjdGlvbkVycm9ycyB8fCAoZXhwb3J0cy5Db25uZWN0aW9uRXJyb3JzID0ge30pKTtcbmNsYXNzIENvbm5lY3Rpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQ29ubmVjdGlvbkVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db25uZWN0aW9uRXJyb3IgPSBDb25uZWN0aW9uRXJyb3I7XG52YXIgQ29ubmVjdGlvblN0cmF0ZWd5O1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uU3RyYXRlZ3kpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5jYW5jZWxVbmRpc3BhdGNoZWQpO1xuICAgIH1cbiAgICBDb25uZWN0aW9uU3RyYXRlZ3kuaXMgPSBpcztcbn0pKENvbm5lY3Rpb25TdHJhdGVneSA9IGV4cG9ydHMuQ29ubmVjdGlvblN0cmF0ZWd5IHx8IChleHBvcnRzLkNvbm5lY3Rpb25TdHJhdGVneSA9IHt9KSk7XG52YXIgSWRDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5O1xuKGZ1bmN0aW9uIChJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoY2FuZGlkYXRlLmtpbmQgPT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUua2luZCA9PT0gJ2lkJykgJiYgSXMuZnVuYyhjYW5kaWRhdGUuY3JlYXRlQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UpICYmIChjYW5kaWRhdGUuZGlzcG9zZSA9PT0gdW5kZWZpbmVkIHx8IElzLmZ1bmMoY2FuZGlkYXRlLmRpc3Bvc2UpKTtcbiAgICB9XG4gICAgSWRDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5LmlzID0gaXM7XG59KShJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSBleHBvcnRzLklkQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSB8fCAoZXhwb3J0cy5JZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSB7fSkpO1xudmFyIFJlcXVlc3RDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5O1xuKGZ1bmN0aW9uIChSZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAncmVxdWVzdCcgJiYgSXMuZnVuYyhjYW5kaWRhdGUuY3JlYXRlQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UpICYmIChjYW5kaWRhdGUuZGlzcG9zZSA9PT0gdW5kZWZpbmVkIHx8IElzLmZ1bmMoY2FuZGlkYXRlLmRpc3Bvc2UpKTtcbiAgICB9XG4gICAgUmVxdWVzdENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMgPSBpcztcbn0pKFJlcXVlc3RDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5ID0gZXhwb3J0cy5SZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSB8fCAoZXhwb3J0cy5SZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IHt9KSk7XG52YXIgQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneTtcbihmdW5jdGlvbiAoQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSkge1xuICAgIENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuTWVzc2FnZSA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBjcmVhdGVDYW5jZWxsYXRpb25Ub2tlblNvdXJjZShfKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGNhbmNlbGxhdGlvbl8xLkNhbmNlbGxhdGlvblRva2VuU291cmNlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSWRDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5LmlzKHZhbHVlKSB8fCBSZXF1ZXN0Q2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneS5pcyh2YWx1ZSk7XG4gICAgfVxuICAgIENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMgPSBpcztcbn0pKENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kgfHwgKGV4cG9ydHMuQ2FuY2VsbGF0aW9uUmVjZWl2ZXJTdHJhdGVneSA9IHt9KSk7XG52YXIgQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3k7XG4oZnVuY3Rpb24gKENhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5KSB7XG4gICAgQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3kuTWVzc2FnZSA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBzZW5kQ2FuY2VsbGF0aW9uKGNvbm4sIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ubi5zZW5kTm90aWZpY2F0aW9uKENhbmNlbE5vdGlmaWNhdGlvbi50eXBlLCB7IGlkIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhbnVwKF8pIHsgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLmZ1bmMoY2FuZGlkYXRlLnNlbmRDYW5jZWxsYXRpb24pICYmIElzLmZ1bmMoY2FuZGlkYXRlLmNsZWFudXApO1xuICAgIH1cbiAgICBDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneS5pcyA9IGlzO1xufSkoQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3kgPSBleHBvcnRzLkNhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5IHx8IChleHBvcnRzLkNhbmNlbGxhdGlvblNlbmRlclN0cmF0ZWd5ID0ge30pKTtcbnZhciBDYW5jZWxsYXRpb25TdHJhdGVneTtcbihmdW5jdGlvbiAoQ2FuY2VsbGF0aW9uU3RyYXRlZ3kpIHtcbiAgICBDYW5jZWxsYXRpb25TdHJhdGVneS5NZXNzYWdlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIHJlY2VpdmVyOiBDYW5jZWxsYXRpb25SZWNlaXZlclN0cmF0ZWd5Lk1lc3NhZ2UsXG4gICAgICAgIHNlbmRlcjogQ2FuY2VsbGF0aW9uU2VuZGVyU3RyYXRlZ3kuTWVzc2FnZVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMoY2FuZGlkYXRlLnJlY2VpdmVyKSAmJiBDYW5jZWxsYXRpb25TZW5kZXJTdHJhdGVneS5pcyhjYW5kaWRhdGUuc2VuZGVyKTtcbiAgICB9XG4gICAgQ2FuY2VsbGF0aW9uU3RyYXRlZ3kuaXMgPSBpcztcbn0pKENhbmNlbGxhdGlvblN0cmF0ZWd5ID0gZXhwb3J0cy5DYW5jZWxsYXRpb25TdHJhdGVneSB8fCAoZXhwb3J0cy5DYW5jZWxsYXRpb25TdHJhdGVneSA9IHt9KSk7XG52YXIgTWVzc2FnZVN0cmF0ZWd5O1xuKGZ1bmN0aW9uIChNZXNzYWdlU3RyYXRlZ3kpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5oYW5kbGVNZXNzYWdlKTtcbiAgICB9XG4gICAgTWVzc2FnZVN0cmF0ZWd5LmlzID0gaXM7XG59KShNZXNzYWdlU3RyYXRlZ3kgPSBleHBvcnRzLk1lc3NhZ2VTdHJhdGVneSB8fCAoZXhwb3J0cy5NZXNzYWdlU3RyYXRlZ3kgPSB7fSkpO1xudmFyIENvbm5lY3Rpb25PcHRpb25zO1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uT3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIChDYW5jZWxsYXRpb25TdHJhdGVneS5pcyhjYW5kaWRhdGUuY2FuY2VsbGF0aW9uU3RyYXRlZ3kpIHx8IENvbm5lY3Rpb25TdHJhdGVneS5pcyhjYW5kaWRhdGUuY29ubmVjdGlvblN0cmF0ZWd5KSB8fCBNZXNzYWdlU3RyYXRlZ3kuaXMoY2FuZGlkYXRlLm1lc3NhZ2VTdHJhdGVneSkpO1xuICAgIH1cbiAgICBDb25uZWN0aW9uT3B0aW9ucy5pcyA9IGlzO1xufSkoQ29ubmVjdGlvbk9wdGlvbnMgPSBleHBvcnRzLkNvbm5lY3Rpb25PcHRpb25zIHx8IChleHBvcnRzLkNvbm5lY3Rpb25PcHRpb25zID0ge30pKTtcbnZhciBDb25uZWN0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKENvbm5lY3Rpb25TdGF0ZSkge1xuICAgIENvbm5lY3Rpb25TdGF0ZVtDb25uZWN0aW9uU3RhdGVbXCJOZXdcIl0gPSAxXSA9IFwiTmV3XCI7XG4gICAgQ29ubmVjdGlvblN0YXRlW0Nvbm5lY3Rpb25TdGF0ZVtcIkxpc3RlbmluZ1wiXSA9IDJdID0gXCJMaXN0ZW5pbmdcIjtcbiAgICBDb25uZWN0aW9uU3RhdGVbQ29ubmVjdGlvblN0YXRlW1wiQ2xvc2VkXCJdID0gM10gPSBcIkNsb3NlZFwiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtDb25uZWN0aW9uU3RhdGVbXCJEaXNwb3NlZFwiXSA9IDRdID0gXCJEaXNwb3NlZFwiO1xufSkoQ29ubmVjdGlvblN0YXRlIHx8IChDb25uZWN0aW9uU3RhdGUgPSB7fSkpO1xuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUNvbm5lY3Rpb24obWVzc2FnZVJlYWRlciwgbWVzc2FnZVdyaXRlciwgX2xvZ2dlciwgb3B0aW9ucykge1xuICAgIGNvbnN0IGxvZ2dlciA9IF9sb2dnZXIgIT09IHVuZGVmaW5lZCA/IF9sb2dnZXIgOiBleHBvcnRzLk51bGxMb2dnZXI7XG4gICAgbGV0IHNlcXVlbmNlTnVtYmVyID0gMDtcbiAgICBsZXQgbm90aWZpY2F0aW9uU2VxdWVuY2VOdW1iZXIgPSAwO1xuICAgIGxldCB1bmtub3duUmVzcG9uc2VTZXF1ZW5jZU51bWJlciA9IDA7XG4gICAgY29uc3QgdmVyc2lvbiA9ICcyLjAnO1xuICAgIGxldCBzdGFyUmVxdWVzdEhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVxdWVzdEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgIGxldCBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBub3RpZmljYXRpb25IYW5kbGVycyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBwcm9ncmVzc0hhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgIGxldCB0aW1lcjtcbiAgICBsZXQgbWVzc2FnZVF1ZXVlID0gbmV3IGxpbmtlZE1hcF8xLkxpbmtlZE1hcCgpO1xuICAgIGxldCByZXNwb25zZVByb21pc2VzID0gbmV3IE1hcCgpO1xuICAgIGxldCBrbm93bkNhbmNlbGVkUmVxdWVzdHMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IHJlcXVlc3RUb2tlbnMgPSBuZXcgTWFwKCk7XG4gICAgbGV0IHRyYWNlID0gVHJhY2UuT2ZmO1xuICAgIGxldCB0cmFjZUZvcm1hdCA9IFRyYWNlRm9ybWF0LlRleHQ7XG4gICAgbGV0IHRyYWNlcjtcbiAgICBsZXQgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuTmV3O1xuICAgIGNvbnN0IGVycm9yRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgY29uc3QgY2xvc2VFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCB1bmhhbmRsZWROb3RpZmljYXRpb25FbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCB1bmhhbmRsZWRQcm9ncmVzc0VtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgIGNvbnN0IGRpc3Bvc2VFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICBjb25zdCBjYW5jZWxsYXRpb25TdHJhdGVneSA9IChvcHRpb25zICYmIG9wdGlvbnMuY2FuY2VsbGF0aW9uU3RyYXRlZ3kpID8gb3B0aW9ucy5jYW5jZWxsYXRpb25TdHJhdGVneSA6IENhbmNlbGxhdGlvblN0cmF0ZWd5Lk1lc3NhZ2U7XG4gICAgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdFF1ZXVlS2V5KGlkKSB7XG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBzZW5kIHJlcXVlc3RzIHdpdGggaWQgbnVsbCBzaW5jZSB0aGUgcmVzcG9uc2UgY2FuJ3QgYmUgY29ycmVsYXRlZC5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3JlcS0nICsgaWQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUmVzcG9uc2VRdWV1ZUtleShpZCkge1xuICAgICAgICBpZiAoaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAncmVzLXVua25vd24tJyArICgrK3Vua25vd25SZXNwb25zZVNlcXVlbmNlTnVtYmVyKS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdyZXMtJyArIGlkLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uUXVldWVLZXkoKSB7XG4gICAgICAgIHJldHVybiAnbm90LScgKyAoKytub3RpZmljYXRpb25TZXF1ZW5jZU51bWJlcikudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkTWVzc2FnZVRvUXVldWUocXVldWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1JlcXVlc3QobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHF1ZXVlLnNldChjcmVhdGVSZXF1ZXN0UXVldWVLZXkobWVzc2FnZS5pZCksIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1Jlc3BvbnNlKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBxdWV1ZS5zZXQoY3JlYXRlUmVzcG9uc2VRdWV1ZUtleShtZXNzYWdlLmlkKSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBxdWV1ZS5zZXQoY3JlYXRlTm90aWZpY2F0aW9uUXVldWVLZXkoKSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuY2VsVW5kaXNwYXRjaGVkKF9tZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTGlzdGVuaW5nKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5MaXN0ZW5pbmc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQ2xvc2VkKCkge1xuICAgICAgICByZXR1cm4gc3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5DbG9zZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkRpc3Bvc2VkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9zZUhhbmRsZXIoKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLk5ldyB8fCBzdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkxpc3RlbmluZykge1xuICAgICAgICAgICAgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ2xvc2VkO1xuICAgICAgICAgICAgY2xvc2VFbWl0dGVyLmZpcmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBpcyBkaXNwb3NlZCBkb24ndCBzZW50IGNsb3NlIGV2ZW50cy5cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEVycm9ySGFuZGxlcihlcnJvcikge1xuICAgICAgICBlcnJvckVtaXR0ZXIuZmlyZShbZXJyb3IsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdyaXRlRXJyb3JIYW5kbGVyKGRhdGEpIHtcbiAgICAgICAgZXJyb3JFbWl0dGVyLmZpcmUoZGF0YSk7XG4gICAgfVxuICAgIG1lc3NhZ2VSZWFkZXIub25DbG9zZShjbG9zZUhhbmRsZXIpO1xuICAgIG1lc3NhZ2VSZWFkZXIub25FcnJvcihyZWFkRXJyb3JIYW5kbGVyKTtcbiAgICBtZXNzYWdlV3JpdGVyLm9uQ2xvc2UoY2xvc2VIYW5kbGVyKTtcbiAgICBtZXNzYWdlV3JpdGVyLm9uRXJyb3Iod3JpdGVFcnJvckhhbmRsZXIpO1xuICAgIGZ1bmN0aW9uIHRyaWdnZXJNZXNzYWdlUXVldWUoKSB7XG4gICAgICAgIGlmICh0aW1lciB8fCBtZXNzYWdlUXVldWUuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVyID0gKDAsIHJhbF8xLmRlZmF1bHQpKCkudGltZXIuc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcHJvY2Vzc01lc3NhZ2VRdWV1ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlc18xLk1lc3NhZ2UuaXNSZXF1ZXN0KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc05vdGlmaWNhdGlvbihtZXNzYWdlKSkge1xuICAgICAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc1Jlc3BvbnNlKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBoYW5kbGVSZXNwb25zZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZUludmFsaWRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb2Nlc3NNZXNzYWdlUXVldWUoKSB7XG4gICAgICAgIGlmIChtZXNzYWdlUXVldWUuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlUXVldWUuc2hpZnQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VTdHJhdGVneSA9IG9wdGlvbnM/Lm1lc3NhZ2VTdHJhdGVneTtcbiAgICAgICAgICAgIGlmIChNZXNzYWdlU3RyYXRlZ3kuaXMobWVzc2FnZVN0cmF0ZWd5KSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VTdHJhdGVneS5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UsIGhhbmRsZU1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyaWdnZXJNZXNzYWdlUXVldWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjYWxsYmFjayA9IChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGEgY2FuY2VsbGF0aW9uIG1lc3NhZ2UuIENoZWNrIGlmIHRoZSBtZXNzYWdlIGlzIHN0aWxsIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgLy8gYW5kIGNhbmNlbCBpdCBpZiBhbGxvd2VkIHRvIGRvIHNvLlxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzXzEuTWVzc2FnZS5pc05vdGlmaWNhdGlvbihtZXNzYWdlKSAmJiBtZXNzYWdlLm1ldGhvZCA9PT0gQ2FuY2VsTm90aWZpY2F0aW9uLnR5cGUubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsSWQgPSBtZXNzYWdlLnBhcmFtcy5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBjcmVhdGVSZXF1ZXN0UXVldWVLZXkoY2FuY2VsSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvQ2FuY2VsID0gbWVzc2FnZVF1ZXVlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc18xLk1lc3NhZ2UuaXNSZXF1ZXN0KHRvQ2FuY2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJhdGVneSA9IG9wdGlvbnM/LmNvbm5lY3Rpb25TdHJhdGVneTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSAoc3RyYXRlZ3kgJiYgc3RyYXRlZ3kuY2FuY2VsVW5kaXNwYXRjaGVkKSA/IHN0cmF0ZWd5LmNhbmNlbFVuZGlzcGF0Y2hlZCh0b0NhbmNlbCwgY2FuY2VsVW5kaXNwYXRjaGVkKSA6IGNhbmNlbFVuZGlzcGF0Y2hlZCh0b0NhbmNlbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiAocmVzcG9uc2UuZXJyb3IgIT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5yZXN1bHQgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VRdWV1ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuZGVsZXRlKGNhbmNlbElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmlkID0gdG9DYW5jZWwuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZVNlbmRpbmdSZXNwb25zZShyZXNwb25zZSwgbWVzc2FnZS5tZXRob2QsIERhdGUubm93KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShyZXNwb25zZSkuY2F0Y2goKCkgPT4gbG9nZ2VyLmVycm9yKGBTZW5kaW5nIHJlc3BvbnNlIGZvciBjYW5jZWxlZCBtZXNzYWdlIGZhaWxlZC5gKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsbGF0aW9uVG9rZW4gPSByZXF1ZXN0VG9rZW5zLmdldChjYW5jZWxJZCk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3QgaXMgYWxyZWFkeSBydW5uaW5nLiBDYW5jZWwgdGhlIHRva2VuXG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlUmVjZWl2ZWROb3RpZmljYXRpb24obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjYW5jZWwgYnV0IHN0aWxsIHF1ZXVlIHRoZSBtZXNzYWdlIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIHVwIHN0YXRlIGluIHByb2Nlc3MgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAga25vd25DYW5jZWxlZFJlcXVlc3RzLmFkZChjYW5jZWxJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkTWVzc2FnZVRvUXVldWUobWVzc2FnZVF1ZXVlLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyaWdnZXJNZXNzYWdlUXVldWUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChyZXF1ZXN0TWVzc2FnZSkge1xuICAgICAgICBpZiAoaXNEaXNwb3NlZCgpKSB7XG4gICAgICAgICAgICAvLyB3ZSByZXR1cm4gaGVyZSBzaWxlbnRseSBzaW5jZSB3ZSBmaXJlZCBhbiBldmVudCB3aGVuIHRoZVxuICAgICAgICAgICAgLy8gY29ubmVjdGlvbiBnb3QgZGlzcG9zZWQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVwbHkocmVzdWx0T3JFcnJvciwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2UuaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmVzdWx0T3JFcnJvciBpbnN0YW5jZW9mIG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IgPSByZXN1bHRPckVycm9yLnRvSnNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yZXN1bHQgPSByZXN1bHRPckVycm9yID09PSB1bmRlZmluZWQgPyBudWxsIDogcmVzdWx0T3JFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyYWNlU2VuZGluZ1Jlc3BvbnNlKG1lc3NhZ2UsIG1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgIG1lc3NhZ2VXcml0ZXIud3JpdGUobWVzc2FnZSkuY2F0Y2goKCkgPT4gbG9nZ2VyLmVycm9yKGBTZW5kaW5nIHJlc3BvbnNlIGZhaWxlZC5gKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVwbHlFcnJvcihlcnJvciwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLnRvSnNvbigpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShtZXNzYWdlKS5jYXRjaCgoKSA9PiBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgcmVzcG9uc2UgZmFpbGVkLmApKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXBseVN1Y2Nlc3MocmVzdWx0LCBtZXRob2QsIHN0YXJ0VGltZSkge1xuICAgICAgICAgICAgLy8gVGhlIEpTT04gUlBDIGRlZmluZXMgdGhhdCBhIHJlc3BvbnNlIG11c3QgZWl0aGVyIGhhdmUgYSByZXN1bHQgb3IgYW4gZXJyb3JcbiAgICAgICAgICAgIC8vIFNvIHdlIGNhbid0IHRyZWF0IHVuZGVmaW5lZCBhcyBhIHZhbGlkIHJlc3BvbnNlIHJlc3VsdC5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIGpzb25ycGM6IHZlcnNpb24sXG4gICAgICAgICAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgbWVzc2FnZVdyaXRlci53cml0ZShtZXNzYWdlKS5jYXRjaCgoKSA9PiBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgcmVzcG9uc2UgZmFpbGVkLmApKTtcbiAgICAgICAgfVxuICAgICAgICB0cmFjZVJlY2VpdmVkUmVxdWVzdChyZXF1ZXN0TWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXF1ZXN0SGFuZGxlcnMuZ2V0KHJlcXVlc3RNZXNzYWdlLm1ldGhvZCk7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBsZXQgcmVxdWVzdEhhbmRsZXI7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgICAgICAgICAgcmVxdWVzdEhhbmRsZXIgPSBlbGVtZW50LmhhbmRsZXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKHJlcXVlc3RIYW5kbGVyIHx8IHN0YXJSZXF1ZXN0SGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgdG9rZW5LZXkgPSByZXF1ZXN0TWVzc2FnZS5pZCA/PyBTdHJpbmcoRGF0ZS5ub3coKSk7IC8vXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxsYXRpb25Tb3VyY2UgPSBJZENhbmNlbGxhdGlvblJlY2VpdmVyU3RyYXRlZ3kuaXMoY2FuY2VsbGF0aW9uU3RyYXRlZ3kucmVjZWl2ZXIpXG4gICAgICAgICAgICAgICAgPyBjYW5jZWxsYXRpb25TdHJhdGVneS5yZWNlaXZlci5jcmVhdGVDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSh0b2tlbktleSlcbiAgICAgICAgICAgICAgICA6IGNhbmNlbGxhdGlvblN0cmF0ZWd5LnJlY2VpdmVyLmNyZWF0ZUNhbmNlbGxhdGlvblRva2VuU291cmNlKHJlcXVlc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0TWVzc2FnZS5pZCAhPT0gbnVsbCAmJiBrbm93bkNhbmNlbGVkUmVxdWVzdHMuaGFzKHJlcXVlc3RNZXNzYWdlLmlkKSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblNvdXJjZS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0TWVzc2FnZS5pZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuc2V0KHRva2VuS2V5LCBjYW5jZWxsYXRpb25Tb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlclJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RNZXNzYWdlLnBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUubnVtYmVyT2ZQYXJhbXMgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludmFsaWRQYXJhbXMsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBkZWZpbmVzICR7dHlwZS5udW1iZXJPZlBhcmFtc30gcGFyYW1zIGJ1dCByZWNlaXZlZCBub25lLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlclJlc3VsdCA9IHJlcXVlc3RIYW5kbGVyKGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXF1ZXN0TWVzc2FnZS5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUucGFyYW1ldGVyU3RydWN0dXJlcyA9PT0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGx5RXJyb3IobmV3IG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcihtZXNzYWdlc18xLkVycm9yQ29kZXMuSW52YWxpZFBhcmFtcywgYFJlcXVlc3QgJHtyZXF1ZXN0TWVzc2FnZS5tZXRob2R9IGRlZmluZXMgcGFyYW1ldGVycyBieSBuYW1lIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uYCksIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyUmVzdWx0ID0gcmVxdWVzdEhhbmRsZXIoLi4ucmVxdWVzdE1lc3NhZ2UucGFyYW1zLCBjYW5jZWxsYXRpb25Tb3VyY2UudG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLnBhcmFtZXRlclN0cnVjdHVyZXMgPT09IG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5ieVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnZhbGlkUGFyYW1zLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZGVmaW5lcyBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IG5hbWVgKSwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJSZXN1bHQgPSByZXF1ZXN0SGFuZGxlcihyZXF1ZXN0TWVzc2FnZS5wYXJhbXMsIGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhclJlcXVlc3RIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJSZXN1bHQgPSBzdGFyUmVxdWVzdEhhbmRsZXIocmVxdWVzdE1lc3NhZ2UubWV0aG9kLCByZXF1ZXN0TWVzc2FnZS5wYXJhbXMsIGNhbmNlbGxhdGlvblNvdXJjZS50b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBoYW5kbGVyUmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmICghaGFuZGxlclJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VG9rZW5zLmRlbGV0ZSh0b2tlbktleSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5U3VjY2VzcyhoYW5kbGVyUmVzdWx0LCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb21pc2UudGhlbikge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3VsdE9yRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUb2tlbnMuZGVsZXRlKHRva2VuS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGx5KHJlc3VsdE9yRXJyb3IsIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihlcnJvciwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXJyb3IgJiYgSXMuc3RyaW5nKGVycm9yLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZmFpbGVkIHdpdGggbWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBmYWlsZWQgdW5leHBlY3RlZGx5IHdpdGhvdXQgcHJvdmlkaW5nIGFueSBkZXRhaWxzLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXBseShoYW5kbGVyUmVzdWx0LCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFRva2Vucy5kZWxldGUodG9rZW5LZXkpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXBseShlcnJvciwgcmVxdWVzdE1lc3NhZ2UubWV0aG9kLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlcnJvciAmJiBJcy5zdHJpbmcoZXJyb3IubWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgUmVxdWVzdCAke3JlcXVlc3RNZXNzYWdlLm1ldGhvZH0gZmFpbGVkIHdpdGggbWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXBseUVycm9yKG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBSZXF1ZXN0ICR7cmVxdWVzdE1lc3NhZ2UubWV0aG9kfSBmYWlsZWQgdW5leHBlY3RlZGx5IHdpdGhvdXQgcHJvdmlkaW5nIGFueSBkZXRhaWxzLmApLCByZXF1ZXN0TWVzc2FnZS5tZXRob2QsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwbHlFcnJvcihuZXcgbWVzc2FnZXNfMS5SZXNwb25zZUVycm9yKG1lc3NhZ2VzXzEuRXJyb3JDb2Rlcy5NZXRob2ROb3RGb3VuZCwgYFVuaGFuZGxlZCBtZXRob2QgJHtyZXF1ZXN0TWVzc2FnZS5tZXRob2R9YCksIHJlcXVlc3RNZXNzYWdlLm1ldGhvZCwgc3RhcnRUaW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZU1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGlzRGlzcG9zZWQoKSkge1xuICAgICAgICAgICAgLy8gU2VlIGhhbmRsZSByZXF1ZXN0LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFJlY2VpdmVkIHJlc3BvbnNlIG1lc3NhZ2Ugd2l0aG91dCBpZDogRXJyb3IgaXM6IFxcbiR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2VNZXNzYWdlLmVycm9yLCB1bmRlZmluZWQsIDQpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBSZWNlaXZlZCByZXNwb25zZSBtZXNzYWdlIHdpdGhvdXQgaWQuIE5vIGZ1cnRoZXIgZXJyb3IgaW5mb3JtYXRpb24gcHJvdmlkZWQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSByZXNwb25zZU1lc3NhZ2UuaWQ7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVByb21pc2UgPSByZXNwb25zZVByb21pc2VzLmdldChrZXkpO1xuICAgICAgICAgICAgdHJhY2VSZWNlaXZlZFJlc3BvbnNlKHJlc3BvbnNlTWVzc2FnZSwgcmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlTWVzc2FnZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSByZXNwb25zZU1lc3NhZ2UuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2UucmVqZWN0KG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IoZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSwgZXJyb3IuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZS5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VQcm9taXNlLnJlc29sdmUocmVzcG9uc2VNZXNzYWdlLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBuZXZlciBoYXBwZW4uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFJlc3BvbnNlIGhhbmRsZXIgJyR7cmVzcG9uc2VQcm9taXNlLm1ldGhvZH0nIGZhaWxlZCB3aXRoIG1lc3NhZ2U6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgUmVzcG9uc2UgaGFuZGxlciAnJHtyZXNwb25zZVByb21pc2UubWV0aG9kfScgZmFpbGVkIHVuZXhwZWN0ZWRseS5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVOb3RpZmljYXRpb24obWVzc2FnZSkge1xuICAgICAgICBpZiAoaXNEaXNwb3NlZCgpKSB7XG4gICAgICAgICAgICAvLyBTZWUgaGFuZGxlIHJlcXVlc3QuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBub3RpZmljYXRpb25IYW5kbGVyO1xuICAgICAgICBpZiAobWVzc2FnZS5tZXRob2QgPT09IENhbmNlbE5vdGlmaWNhdGlvbi50eXBlLm1ldGhvZCkge1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsSWQgPSBtZXNzYWdlLnBhcmFtcy5pZDtcbiAgICAgICAgICAgIGtub3duQ2FuY2VsZWRSZXF1ZXN0cy5kZWxldGUoY2FuY2VsSWQpO1xuICAgICAgICAgICAgdHJhY2VSZWNlaXZlZE5vdGlmaWNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBub3RpZmljYXRpb25IYW5kbGVycy5nZXQobWVzc2FnZS5tZXRob2QpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVyID0gZWxlbWVudC5oYW5kbGVyO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbkhhbmRsZXIgfHwgc3Rhck5vdGlmaWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdHJhY2VSZWNlaXZlZE5vdGlmaWNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5wYXJhbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm51bWJlck9mUGFyYW1zICE9PSAwICYmIHR5cGUucGFyYW1ldGVyU3RydWN0dXJlcyAhPT0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYE5vdGlmaWNhdGlvbiAke21lc3NhZ2UubWV0aG9kfSBkZWZpbmVzICR7dHlwZS5udW1iZXJPZlBhcmFtc30gcGFyYW1zIGJ1dCByZWNlaXZlZCBub25lLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UucGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIEpTT04tUlBDIGxpYnJhcmllcyB0aGF0IHNlbmQgcHJvZ3Jlc3MgbWVzc2FnZSBhcyBwb3NpdGlvbmFsIHBhcmFtcyBhbHRob3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkIGFzIG5hbWVkLiBTbyBjb252ZXJ0IHRoZW0gaWYgdGhpcyBpcyB0aGUgY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG1lc3NhZ2UucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWV0aG9kID09PSBQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLm1ldGhvZCAmJiBwYXJhbXMubGVuZ3RoID09PSAyICYmIFByb2dyZXNzVG9rZW4uaXMocGFyYW1zWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIoeyB0b2tlbjogcGFyYW1zWzBdLCB2YWx1ZTogcGFyYW1zWzFdIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZS5wYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYE5vdGlmaWNhdGlvbiAke21lc3NhZ2UubWV0aG9kfSBkZWZpbmVzIHBhcmFtZXRlcnMgYnkgbmFtZSBidXQgcmVjZWl2ZWQgcGFyYW1ldGVycyBieSBwb3NpdGlvbmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLm51bWJlck9mUGFyYW1zICE9PSBtZXNzYWdlLnBhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgTm90aWZpY2F0aW9uICR7bWVzc2FnZS5tZXRob2R9IGRlZmluZXMgJHt0eXBlLm51bWJlck9mUGFyYW1zfSBwYXJhbXMgYnV0IHJlY2VpdmVkICR7cGFyYW1zLmxlbmd0aH0gYXJndW1lbnRzYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlciguLi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLnBhcmFtZXRlclN0cnVjdHVyZXMgPT09IG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5ieVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBOb3RpZmljYXRpb24gJHttZXNzYWdlLm1ldGhvZH0gZGVmaW5lcyBwYXJhbWV0ZXJzIGJ5IHBvc2l0aW9uIGJ1dCByZWNlaXZlZCBwYXJhbWV0ZXJzIGJ5IG5hbWVgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkhhbmRsZXIobWVzc2FnZS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXJOb3RpZmljYXRpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJOb3RpZmljYXRpb25IYW5kbGVyKG1lc3NhZ2UubWV0aG9kLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBOb3RpZmljYXRpb24gaGFuZGxlciAnJHttZXNzYWdlLm1ldGhvZH0nIGZhaWxlZCB3aXRoIG1lc3NhZ2U6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgTm90aWZpY2F0aW9uIGhhbmRsZXIgJyR7bWVzc2FnZS5tZXRob2R9JyBmYWlsZWQgdW5leHBlY3RlZGx5LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVuaGFuZGxlZE5vdGlmaWNhdGlvbkVtaXR0ZXIuZmlyZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVJbnZhbGlkTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdSZWNlaXZlZCBlbXB0eSBtZXNzYWdlLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5lcnJvcihgUmVjZWl2ZWQgbWVzc2FnZSB3aGljaCBpcyBuZWl0aGVyIGEgcmVzcG9uc2Ugbm9yIGEgbm90aWZpY2F0aW9uIG1lc3NhZ2U6XFxuJHtKU09OLnN0cmluZ2lmeShtZXNzYWdlLCBudWxsLCA0KX1gKTtcbiAgICAgICAgLy8gVGVzdCB3aGV0aGVyIHdlIGZpbmQgYW4gaWQgdG8gcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmIChJcy5zdHJpbmcocmVzcG9uc2VNZXNzYWdlLmlkKSB8fCBJcy5udW1iZXIocmVzcG9uc2VNZXNzYWdlLmlkKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gcmVzcG9uc2VNZXNzYWdlLmlkO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VIYW5kbGVyID0gcmVzcG9uc2VQcm9taXNlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZUhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUhhbmRsZXIucmVqZWN0KG5ldyBFcnJvcignVGhlIHJlY2VpdmVkIHJlc3BvbnNlIGhhcyBuZWl0aGVyIGEgcmVzdWx0IG5vciBhbiBlcnJvciBwcm9wZXJ0eS4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5VHJhY2UocGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMgPT09IHVuZGVmaW5lZCB8fCBwYXJhbXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0cmFjZSkge1xuICAgICAgICAgICAgY2FzZSBUcmFjZS5WZXJib3NlOlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbXMsIG51bGwsIDQpO1xuICAgICAgICAgICAgY2FzZSBUcmFjZS5Db21wYWN0OlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlU2VuZGluZ1JlcXVlc3QobWVzc2FnZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLk9mZiB8fCAhdHJhY2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlRm9ybWF0ID09PSBUcmFjZUZvcm1hdC5UZXh0KSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICgodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpICYmIG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGBQYXJhbXM6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5wYXJhbXMpfVxcblxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZXIubG9nKGBTZW5kaW5nIHJlcXVlc3QgJyR7bWVzc2FnZS5tZXRob2R9IC0gKCR7bWVzc2FnZS5pZH0pJy5gLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0xTUE1lc3NhZ2UoJ3NlbmQtcmVxdWVzdCcsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlU2VuZGluZ05vdGlmaWNhdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gVHJhY2UuT2ZmIHx8ICF0cmFjZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhY2VGb3JtYXQgPT09IFRyYWNlRm9ybWF0LlRleHQpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5WZXJib3NlIHx8IHRyYWNlID09PSBUcmFjZS5Db21wYWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBgUGFyYW1zOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UucGFyYW1zKX1cXG5cXG5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICdObyBwYXJhbWV0ZXJzIHByb3ZpZGVkLlxcblxcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgU2VuZGluZyBub3RpZmljYXRpb24gJyR7bWVzc2FnZS5tZXRob2R9Jy5gLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0xTUE1lc3NhZ2UoJ3NlbmQtbm90aWZpY2F0aW9uJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhY2VTZW5kaW5nUmVzcG9uc2UobWVzc2FnZSwgbWV0aG9kLCBzdGFydFRpbWUpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFjZUZvcm1hdCA9PT0gVHJhY2VGb3JtYXQuVGV4dCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciAmJiBtZXNzYWdlLmVycm9yLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBFcnJvciBkYXRhOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UuZXJyb3IuZGF0YSl9XFxuXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBSZXN1bHQ6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5yZXN1bHQpfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5lcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gJ05vIHJlc3VsdCByZXR1cm5lZC5cXG5cXG4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgU2VuZGluZyByZXNwb25zZSAnJHttZXRob2R9IC0gKCR7bWVzc2FnZS5pZH0pJy4gUHJvY2Vzc2luZyByZXF1ZXN0IHRvb2sgJHtEYXRlLm5vdygpIC0gc3RhcnRUaW1lfW1zYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdzZW5kLXJlc3BvbnNlJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhY2VSZWNlaXZlZFJlcXVlc3QobWVzc2FnZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLk9mZiB8fCAhdHJhY2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlRm9ybWF0ID09PSBUcmFjZUZvcm1hdC5UZXh0KSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICgodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpICYmIG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGBQYXJhbXM6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5wYXJhbXMpfVxcblxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZXIubG9nKGBSZWNlaXZlZCByZXF1ZXN0ICcke21lc3NhZ2UubWV0aG9kfSAtICgke21lc3NhZ2UuaWR9KScuYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLXJlcXVlc3QnLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0cmFjZVJlY2VpdmVkTm90aWZpY2F0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlciB8fCBtZXNzYWdlLm1ldGhvZCA9PT0gTG9nVHJhY2VOb3RpZmljYXRpb24udHlwZS5tZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhY2VGb3JtYXQgPT09IFRyYWNlRm9ybWF0LlRleHQpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5WZXJib3NlIHx8IHRyYWNlID09PSBUcmFjZS5Db21wYWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBgUGFyYW1zOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UucGFyYW1zKX1cXG5cXG5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICdObyBwYXJhbWV0ZXJzIHByb3ZpZGVkLlxcblxcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhY2VyLmxvZyhgUmVjZWl2ZWQgbm90aWZpY2F0aW9uICcke21lc3NhZ2UubWV0aG9kfScuYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLW5vdGlmaWNhdGlvbicsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYWNlUmVjZWl2ZWRSZXNwb25zZShtZXNzYWdlLCByZXNwb25zZVByb21pc2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYgfHwgIXRyYWNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFjZUZvcm1hdCA9PT0gVHJhY2VGb3JtYXQuVGV4dCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvciAmJiBtZXNzYWdlLmVycm9yLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBFcnJvciBkYXRhOiAke3N0cmluZ2lmeVRyYWNlKG1lc3NhZ2UuZXJyb3IuZGF0YSl9XFxuXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGBSZXN1bHQ6ICR7c3RyaW5naWZ5VHJhY2UobWVzc2FnZS5yZXN1bHQpfVxcblxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5lcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gJ05vIHJlc3VsdCByZXR1cm5lZC5cXG5cXG4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbWVzc2FnZS5lcnJvciA/IGAgUmVxdWVzdCBmYWlsZWQ6ICR7bWVzc2FnZS5lcnJvci5tZXNzYWdlfSAoJHttZXNzYWdlLmVycm9yLmNvZGV9KS5gIDogJyc7XG4gICAgICAgICAgICAgICAgdHJhY2VyLmxvZyhgUmVjZWl2ZWQgcmVzcG9uc2UgJyR7cmVzcG9uc2VQcm9taXNlLm1ldGhvZH0gLSAoJHttZXNzYWdlLmlkfSknIGluICR7RGF0ZS5ub3coKSAtIHJlc3BvbnNlUHJvbWlzZS50aW1lclN0YXJ0fW1zLiR7ZXJyb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIubG9nKGBSZWNlaXZlZCByZXNwb25zZSAke21lc3NhZ2UuaWR9IHdpdGhvdXQgYWN0aXZlIHJlc3BvbnNlIHByb21pc2UuYCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dMU1BNZXNzYWdlKCdyZWNlaXZlLXJlc3BvbnNlJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbG9nTFNQTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghdHJhY2VyIHx8IHRyYWNlID09PSBUcmFjZS5PZmYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsc3BNZXNzYWdlID0ge1xuICAgICAgICAgICAgaXNMU1BNZXNzYWdlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgfTtcbiAgICAgICAgdHJhY2VyLmxvZyhsc3BNZXNzYWdlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGhyb3dJZkNsb3NlZE9yRGlzcG9zZWQoKSB7XG4gICAgICAgIGlmIChpc0Nsb3NlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQ29ubmVjdGlvbkVycm9yKENvbm5lY3Rpb25FcnJvcnMuQ2xvc2VkLCAnQ29ubmVjdGlvbiBpcyBjbG9zZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzcG9zZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IENvbm5lY3Rpb25FcnJvcihDb25uZWN0aW9uRXJyb3JzLkRpc3Bvc2VkLCAnQ29ubmVjdGlvbiBpcyBkaXNwb3NlZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0aHJvd0lmTGlzdGVuaW5nKCkge1xuICAgICAgICBpZiAoaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IENvbm5lY3Rpb25FcnJvcihDb25uZWN0aW9uRXJyb3JzLkFscmVhZHlMaXN0ZW5pbmcsICdDb25uZWN0aW9uIGlzIGFscmVhZHkgbGlzdGVuaW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdGhyb3dJZk5vdExpc3RlbmluZygpIHtcbiAgICAgICAgaWYgKCFpc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGwgbGlzdGVuKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdW5kZWZpbmVkVG9OdWxsKHBhcmFtKSB7XG4gICAgICAgIGlmIChwYXJhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBudWxsVG9VbmRlZmluZWQocGFyYW0pIHtcbiAgICAgICAgaWYgKHBhcmFtID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTmFtZWRQYXJhbShwYXJhbSkge1xuICAgICAgICByZXR1cm4gcGFyYW0gIT09IHVuZGVmaW5lZCAmJiBwYXJhbSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShwYXJhbSkgJiYgdHlwZW9mIHBhcmFtID09PSAnb2JqZWN0JztcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZVNpbmdsZVBhcmFtKHBhcmFtZXRlclN0cnVjdHVyZXMsIHBhcmFtKSB7XG4gICAgICAgIHN3aXRjaCAocGFyYW1ldGVyU3RydWN0dXJlcykge1xuICAgICAgICAgICAgY2FzZSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bzpcbiAgICAgICAgICAgICAgICBpZiAoaXNOYW1lZFBhcmFtKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFRvVW5kZWZpbmVkKHBhcmFtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbdW5kZWZpbmVkVG9OdWxsKHBhcmFtKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lOlxuICAgICAgICAgICAgICAgIGlmICghaXNOYW1lZFBhcmFtKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlY2VpdmVkIHBhcmFtZXRlcnMgYnkgbmFtZSBidXQgcGFyYW0gaXMgbm90IGFuIG9iamVjdCBsaXRlcmFsLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFRvVW5kZWZpbmVkKHBhcmFtKTtcbiAgICAgICAgICAgIGNhc2UgbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5UG9zaXRpb246XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRUb051bGwocGFyYW0pXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtZXRlciBzdHJ1Y3R1cmUgJHtwYXJhbWV0ZXJTdHJ1Y3R1cmVzLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZU1lc3NhZ2VQYXJhbXModHlwZSwgcGFyYW1zKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGNvbnN0IG51bWJlck9mUGFyYW1zID0gdHlwZS5udW1iZXJPZlBhcmFtcztcbiAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb21wdXRlU2luZ2xlUGFyYW0odHlwZS5wYXJhbWV0ZXJTdHJ1Y3R1cmVzLCBwYXJhbXNbMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGggJiYgaSA8IG51bWJlck9mUGFyYW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkVG9OdWxsKHBhcmFtc1tpXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA8IG51bWJlck9mUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBwYXJhbXMubGVuZ3RoOyBpIDwgbnVtYmVyT2ZQYXJhbXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHtcbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbjogKHR5cGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbXM7XG4gICAgICAgICAgICBpZiAoSXMuc3RyaW5nKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtU3RhcnQgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gbWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG87XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzXzEuUGFyYW1ldGVyU3RydWN0dXJlcy5pcyhmaXJzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1TdGFydCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlclN0cnVjdHVyZXMgPSBmaXJzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtRW5kID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSBwYXJhbUVuZCAtIHBhcmFtU3RhcnQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXMgPSBjb21wdXRlU2luZ2xlUGFyYW0ocGFyYW1ldGVyU3RydWN0dXJlcywgYXJnc1twYXJhbVN0YXJ0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCAke251bWJlck9mUGFyYW1zfSBwYXJhbWV0ZXJzIGZvciAnYnkgTmFtZScgbm90aWZpY2F0aW9uIHBhcmFtZXRlciBzdHJ1Y3R1cmUuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gYXJncy5zbGljZShwYXJhbVN0YXJ0LCBwYXJhbUVuZCkubWFwKHZhbHVlID0+IHVuZGVmaW5lZFRvTnVsbCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYXJncztcbiAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlLm1ldGhvZDtcbiAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gY29tcHV0ZU1lc3NhZ2VQYXJhbXModHlwZSwgcGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAganNvbnJwYzogdmVyc2lvbixcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1lc3NhZ2VQYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFjZVNlbmRpbmdOb3RpZmljYXRpb24obm90aWZpY2F0aW9uTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZVdyaXRlci53cml0ZShub3RpZmljYXRpb25NZXNzYWdlKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYFNlbmRpbmcgbm90aWZpY2F0aW9uIGZhaWxlZC5gKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk5vdGlmaWNhdGlvbjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgaWYgKElzLmZ1bmModHlwZSkpIHtcbiAgICAgICAgICAgICAgICBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKElzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25IYW5kbGVycy5zZXQodHlwZSwgeyB0eXBlOiB1bmRlZmluZWQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlLm1ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlcnMuc2V0KHR5cGUubWV0aG9kLCB7IHR5cGUsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uSGFuZGxlcnMuZGVsZXRlKG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFyTm90aWZpY2F0aW9uSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG9uUHJvZ3Jlc3M6IChfdHlwZSwgdG9rZW4sIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0hhbmRsZXJzLmhhcyh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb2dyZXNzIGhhbmRsZXIgZm9yIHRva2VuICR7dG9rZW59IGFscmVhZHkgcmVnaXN0ZXJlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3NIYW5kbGVycy5zZXQodG9rZW4sIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzSGFuZGxlcnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBzZW5kUHJvZ3Jlc3M6IChfdHlwZSwgdG9rZW4sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCBub3QgYXdhaXQgYnV0IHNpbXBsZSByZXR1cm4gdG8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgaGF2ZSBhbm90aGVyXG4gICAgICAgICAgICAvLyBhc3luYyBzY2hlZHVsaW5nLiBPdGhlcndpc2Ugb25lIHNlbmQgY291bGQgb3ZlcnRha2UgYW5vdGhlciBzZW5kLlxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uc2VuZE5vdGlmaWNhdGlvbihQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLCB7IHRva2VuLCB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25VbmhhbmRsZWRQcm9ncmVzczogdW5oYW5kbGVkUHJvZ3Jlc3NFbWl0dGVyLmV2ZW50LFxuICAgICAgICBzZW5kUmVxdWVzdDogKHR5cGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB0aHJvd0lmTm90TGlzdGVuaW5nKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbXM7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoSXMuc3RyaW5nKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1TdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtZXRlclN0cnVjdHVyZXMgPSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYXV0bztcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmlzKGZpcnN0KSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbVN0YXJ0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyU3RydWN0dXJlcyA9IGZpcnN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1FbmQgPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uXzEuQ2FuY2VsbGF0aW9uVG9rZW4uaXMobGFzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1FbmQgPSBwYXJhbUVuZCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gbGFzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSBwYXJhbUVuZCAtIHBhcmFtU3RhcnQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXJPZlBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXMgPSBjb21wdXRlU2luZ2xlUGFyYW0ocGFyYW1ldGVyU3RydWN0dXJlcywgYXJnc1twYXJhbVN0YXJ0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJTdHJ1Y3R1cmVzID09PSBtZXNzYWdlc18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCAke251bWJlck9mUGFyYW1zfSBwYXJhbWV0ZXJzIGZvciAnYnkgTmFtZScgcmVxdWVzdCBwYXJhbWV0ZXIgc3RydWN0dXJlLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyA9IGFyZ3Muc2xpY2UocGFyYW1TdGFydCwgcGFyYW1FbmQpLm1hcCh2YWx1ZSA9PiB1bmRlZmluZWRUb051bGwodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZS5tZXRob2Q7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyA9IGNvbXB1dGVNZXNzYWdlUGFyYW1zKHR5cGUsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZQYXJhbXMgPSB0eXBlLm51bWJlck9mUGFyYW1zO1xuICAgICAgICAgICAgICAgIHRva2VuID0gY2FuY2VsbGF0aW9uXzEuQ2FuY2VsbGF0aW9uVG9rZW4uaXMocGFyYW1zW251bWJlck9mUGFyYW1zXSkgPyBwYXJhbXNbbnVtYmVyT2ZQYXJhbXNdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaWQgPSBzZXF1ZW5jZU51bWJlcisrO1xuICAgICAgICAgICAgbGV0IGRpc3Bvc2FibGU7XG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlID0gdG9rZW4ub25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gY2FuY2VsbGF0aW9uU3RyYXRlZ3kuc2VuZGVyLnNlbmRDYW5jZWxsYXRpb24oY29ubmVjdGlvbiwgaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZWNlaXZlZCBubyBwcm9taXNlIGZyb20gY2FuY2VsbGF0aW9uIHN0cmF0ZWd5IHdoZW4gY2FuY2VsbGluZyBpZCAke2lkfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFNlbmRpbmcgY2FuY2VsbGF0aW9uIG1lc3NhZ2VzIGZvciBpZCAke2lkfSBmYWlsZWRgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBqc29ucnBjOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1lc3NhZ2VQYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFjZVNlbmRpbmdSZXF1ZXN0KHJlcXVlc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FuY2VsbGF0aW9uU3RyYXRlZ3kuc2VuZGVyLmVuYWJsZUNhbmNlbGxhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblN0cmF0ZWd5LnNlbmRlci5lbmFibGVDYW5jZWxsYXRpb24ocmVxdWVzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlV2l0aENsZWFudXAgPSAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25TdHJhdGVneS5zZW5kZXIuY2xlYW51cChpZCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGU/LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlamVjdFdpdGhDbGVhbnVwID0gKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25TdHJhdGVneS5zZW5kZXIuY2xlYW51cChpZCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGU/LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlUHJvbWlzZSA9IHsgbWV0aG9kOiBtZXRob2QsIHRpbWVyU3RhcnQ6IERhdGUubm93KCksIHJlc29sdmU6IHJlc29sdmVXaXRoQ2xlYW51cCwgcmVqZWN0OiByZWplY3RXaXRoQ2xlYW51cCB9O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2VXcml0ZXIud3JpdGUocmVxdWVzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2VzLnNldChpZCwgcmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgU2VuZGluZyByZXF1ZXN0IGZhaWxlZC5gKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JpdGluZyB0aGUgbWVzc2FnZSBmYWlsZWQuIFNvIHdlIG5lZWQgdG8gcmVqZWN0IHRoZSBwcm9taXNlLlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVByb21pc2UucmVqZWN0KG5ldyBtZXNzYWdlc18xLlJlc3BvbnNlRXJyb3IobWVzc2FnZXNfMS5FcnJvckNvZGVzLk1lc3NhZ2VXcml0ZUVycm9yLCBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIHJlYXNvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVxdWVzdDogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZDbG9zZWRPckRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChTdGFyUmVxdWVzdEhhbmRsZXIuaXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc3RhclJlcXVlc3RIYW5kbGVyID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKElzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SGFuZGxlcnMuc2V0KHR5cGUsIHsgaGFuZGxlcjogaGFuZGxlciwgdHlwZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gdHlwZS5tZXRob2Q7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIYW5kbGVycy5zZXQodHlwZS5tZXRob2QsIHsgdHlwZSwgaGFuZGxlciB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEhhbmRsZXJzLmRlbGV0ZShtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhclJlcXVlc3RIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFzUGVuZGluZ1Jlc3BvbnNlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VQcm9taXNlcy5zaXplID4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2U6IGFzeW5jIChfdmFsdWUsIF90cmFjZXIsIHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgbGV0IF9zZW5kTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgX3RyYWNlRm9ybWF0ID0gVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgICAgIGlmIChzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChJcy5ib29sZWFuKHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbmROb3RpZmljYXRpb24gPSBzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfc2VuZE5vdGlmaWNhdGlvbiA9IHNlbmROb3RpZmljYXRpb25PclRyYWNlT3B0aW9ucy5zZW5kTm90aWZpY2F0aW9uIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBfdHJhY2VGb3JtYXQgPSBzZW5kTm90aWZpY2F0aW9uT3JUcmFjZU9wdGlvbnMudHJhY2VGb3JtYXQgfHwgVHJhY2VGb3JtYXQuVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjZSA9IF92YWx1ZTtcbiAgICAgICAgICAgIHRyYWNlRm9ybWF0ID0gX3RyYWNlRm9ybWF0O1xuICAgICAgICAgICAgaWYgKHRyYWNlID09PSBUcmFjZS5PZmYpIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIgPSBfdHJhY2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9zZW5kTm90aWZpY2F0aW9uICYmICFpc0Nsb3NlZCgpICYmICFpc0Rpc3Bvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjb25uZWN0aW9uLnNlbmROb3RpZmljYXRpb24oU2V0VHJhY2VOb3RpZmljYXRpb24udHlwZSwgeyB2YWx1ZTogVHJhY2UudG9TdHJpbmcoX3ZhbHVlKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25FcnJvcjogZXJyb3JFbWl0dGVyLmV2ZW50LFxuICAgICAgICBvbkNsb3NlOiBjbG9zZUVtaXR0ZXIuZXZlbnQsXG4gICAgICAgIG9uVW5oYW5kbGVkTm90aWZpY2F0aW9uOiB1bmhhbmRsZWROb3RpZmljYXRpb25FbWl0dGVyLmV2ZW50LFxuICAgICAgICBvbkRpc3Bvc2U6IGRpc3Bvc2VFbWl0dGVyLmV2ZW50LFxuICAgICAgICBlbmQ6ICgpID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VXcml0ZXIuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0Rpc3Bvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5EaXNwb3NlZDtcbiAgICAgICAgICAgIGRpc3Bvc2VFbWl0dGVyLmZpcmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IG1lc3NhZ2VzXzEuUmVzcG9uc2VFcnJvcihtZXNzYWdlc18xLkVycm9yQ29kZXMuUGVuZGluZ1Jlc3BvbnNlUmVqZWN0ZWQsICdQZW5kaW5nIHJlc3BvbnNlIHJlamVjdGVkIHNpbmNlIGNvbm5lY3Rpb24gZ290IGRpc3Bvc2VkJyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcmVzcG9uc2VQcm9taXNlcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICByZXF1ZXN0VG9rZW5zID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAga25vd25DYW5jZWxlZFJlcXVlc3RzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgbWVzc2FnZVF1ZXVlID0gbmV3IGxpbmtlZE1hcF8xLkxpbmtlZE1hcCgpO1xuICAgICAgICAgICAgLy8gVGVzdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIGlmIChJcy5mdW5jKG1lc3NhZ2VXcml0ZXIuZGlzcG9zZSkpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlV3JpdGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChJcy5mdW5jKG1lc3NhZ2VSZWFkZXIuZGlzcG9zZSkpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlUmVhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuOiAoKSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmQ2xvc2VkT3JEaXNwb3NlZCgpO1xuICAgICAgICAgICAgdGhyb3dJZkxpc3RlbmluZygpO1xuICAgICAgICAgICAgc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuTGlzdGVuaW5nO1xuICAgICAgICAgICAgbWVzc2FnZVJlYWRlci5saXN0ZW4oY2FsbGJhY2spO1xuICAgICAgICB9LFxuICAgICAgICBpbnNwZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgKDAsIHJhbF8xLmRlZmF1bHQpKCkuY29uc29sZS5sb2coJ2luc3BlY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29ubmVjdGlvbi5vbk5vdGlmaWNhdGlvbihMb2dUcmFjZU5vdGlmaWNhdGlvbi50eXBlLCAocGFyYW1zKSA9PiB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gVHJhY2UuT2ZmIHx8ICF0cmFjZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2ZXJib3NlID0gdHJhY2UgPT09IFRyYWNlLlZlcmJvc2UgfHwgdHJhY2UgPT09IFRyYWNlLkNvbXBhY3Q7XG4gICAgICAgIHRyYWNlci5sb2cocGFyYW1zLm1lc3NhZ2UsIHZlcmJvc2UgPyBwYXJhbXMudmVyYm9zZSA6IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgY29ubmVjdGlvbi5vbk5vdGlmaWNhdGlvbihQcm9ncmVzc05vdGlmaWNhdGlvbi50eXBlLCAocGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBwcm9ncmVzc0hhbmRsZXJzLmdldChwYXJhbXMudG9rZW4pO1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlcihwYXJhbXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdW5oYW5kbGVkUHJvZ3Jlc3NFbWl0dGVyLmZpcmUocGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25uZWN0aW9uO1xufVxuZXhwb3J0cy5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbiA9IGNyZWF0ZU1lc3NhZ2VDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlzcG9zYWJsZSA9IHZvaWQgMDtcbnZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3Bvc2U6IGZ1bmNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlID0gZXhwb3J0cy5EaXNwb3NhYmxlIHx8IChleHBvcnRzLkRpc3Bvc2FibGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVtaXR0ZXIgPSBleHBvcnRzLkV2ZW50ID0gdm9pZCAwO1xuY29uc3QgcmFsXzEgPSByZXF1aXJlKFwiLi9yYWxcIik7XG52YXIgRXZlbnQ7XG4oZnVuY3Rpb24gKEV2ZW50KSB7XG4gICAgY29uc3QgX2Rpc3Bvc2FibGUgPSB7IGRpc3Bvc2UoKSB7IH0gfTtcbiAgICBFdmVudC5Ob25lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Rpc3Bvc2FibGU7IH07XG59KShFdmVudCA9IGV4cG9ydHMuRXZlbnQgfHwgKGV4cG9ydHMuRXZlbnQgPSB7fSkpO1xuY2xhc3MgQ2FsbGJhY2tMaXN0IHtcbiAgICBhZGQoY2FsbGJhY2ssIGNvbnRleHQgPSBudWxsLCBidWNrZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX2NvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1Y2tldCkpIHtcbiAgICAgICAgICAgIGJ1Y2tldC5wdXNoKHsgZGlzcG9zZTogKCkgPT4gdGhpcy5yZW1vdmUoY2FsbGJhY2ssIGNvbnRleHQpIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZShjYWxsYmFjaywgY29udGV4dCA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZm91bmRDYWxsYmFja1dpdGhEaWZmZXJlbnRDb250ZXh0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl9jYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsYmFja3NbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbnRleHRzW2ldID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYgY29udGV4dCBtYXRjaCA9PiByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZENhbGxiYWNrV2l0aERpZmZlcmVudENvbnRleHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm91bmRDYWxsYmFja1dpdGhEaWZmZXJlbnRDb250ZXh0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1doZW4gYWRkaW5nIGEgbGlzdGVuZXIgd2l0aCBhIGNvbnRleHQsIHlvdSBzaG91bGQgcmVtb3ZlIGl0IHdpdGggdGhlIHNhbWUgY29udGV4dCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZSguLi5hcmdzKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0ID0gW10sIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5zbGljZSgwKSwgY29udGV4dHMgPSB0aGlzLl9jb250ZXh0cy5zbGljZSgwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXQucHVzaChjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dHNbaV0sIGFyZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAoMCwgcmFsXzEuZGVmYXVsdCkoKS5jb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fY2FsbGJhY2tzIHx8IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggPT09IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fY29udGV4dHMgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuY2xhc3MgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoX29wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9vcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3IgdGhlIHB1YmxpYyB0byBhbGxvdyB0byBzdWJzY3JpYmVcbiAgICAgKiB0byBldmVudHMgZnJvbSB0aGlzIEVtaXR0ZXJcbiAgICAgKi9cbiAgICBnZXQgZXZlbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gKGxpc3RlbmVyLCB0aGlzQXJncywgZGlzcG9zYWJsZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSBuZXcgQ2FsbGJhY2tMaXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMub25GaXJzdExpc3RlbmVyQWRkICYmIHRoaXMuX2NhbGxiYWNrcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkZpcnN0TGlzdGVuZXJBZGQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcy5hZGQobGlzdGVuZXIsIHRoaXNBcmdzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcG9zYWJsZSBpcyBkaXNwb3NlZCBhZnRlciBlbWl0dGVyIGlzIGRpc3Bvc2VkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcy5yZW1vdmUobGlzdGVuZXIsIHRoaXNBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwb3NlID0gRW1pdHRlci5fbm9vcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMub25MYXN0TGlzdGVuZXJSZW1vdmUgJiYgdGhpcy5fY2FsbGJhY2tzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25MYXN0TGlzdGVuZXJSZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRpc3Bvc2FibGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NhYmxlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG8gYmUga2VwdCBwcml2YXRlIHRvIGZpcmUgYW4gZXZlbnQgdG9cbiAgICAgKiBzdWJzY3JpYmVyc1xuICAgICAqL1xuICAgIGZpcmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLmludm9rZS5jYWxsKHRoaXMuX2NhbGxiYWNrcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkVtaXR0ZXIgPSBFbWl0dGVyO1xuRW1pdHRlci5fbm9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdHJpbmdBcnJheSA9IGV4cG9ydHMuYXJyYXkgPSBleHBvcnRzLmZ1bmMgPSBleHBvcnRzLmVycm9yID0gZXhwb3J0cy5udW1iZXIgPSBleHBvcnRzLnN0cmluZyA9IGV4cG9ydHMuYm9vbGVhbiA9IHZvaWQgMDtcbmZ1bmN0aW9uIGJvb2xlYW4odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xufVxuZXhwb3J0cy5ib29sZWFuID0gYm9vbGVhbjtcbmZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG5mdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcjtcbn1cbmV4cG9ydHMubnVtYmVyID0gbnVtYmVyO1xuZnVuY3Rpb24gZXJyb3IodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvcjtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbmZ1bmN0aW9uIGZ1bmModmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5mdW5jID0gZnVuYztcbmZ1bmN0aW9uIGFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuZXhwb3J0cy5hcnJheSA9IGFycmF5O1xuZnVuY3Rpb24gc3RyaW5nQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gYXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGVsZW0gPT4gc3RyaW5nKGVsZW0pKTtcbn1cbmV4cG9ydHMuc3RyaW5nQXJyYXkgPSBzdHJpbmdBcnJheTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxSVUNhY2hlID0gZXhwb3J0cy5MaW5rZWRNYXAgPSBleHBvcnRzLlRvdWNoID0gdm9pZCAwO1xudmFyIFRvdWNoO1xuKGZ1bmN0aW9uIChUb3VjaCkge1xuICAgIFRvdWNoLk5vbmUgPSAwO1xuICAgIFRvdWNoLkZpcnN0ID0gMTtcbiAgICBUb3VjaC5Bc09sZCA9IFRvdWNoLkZpcnN0O1xuICAgIFRvdWNoLkxhc3QgPSAyO1xuICAgIFRvdWNoLkFzTmV3ID0gVG91Y2guTGFzdDtcbn0pKFRvdWNoID0gZXhwb3J0cy5Ub3VjaCB8fCAoZXhwb3J0cy5Ub3VjaCA9IHt9KSk7XG5jbGFzcyBMaW5rZWRNYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzW19hXSA9ICdMaW5rZWRNYXAnO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2hlYWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3RhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fdGFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlKys7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5faGVhZCAmJiAhdGhpcy5fdGFpbDtcbiAgICB9XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkPy52YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWlsPy52YWx1ZTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5LCB0b3VjaCA9IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX21hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b3VjaCAhPT0gVG91Y2guTm9uZSkge1xuICAgICAgICAgICAgdGhpcy50b3VjaChpdGVtLCB0b3VjaCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlLCB0b3VjaCA9IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9tYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodG91Y2ggIT09IFRvdWNoLk5vbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoKGl0ZW0sIHRvdWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSB7IGtleSwgdmFsdWUsIG5leHQ6IHVuZGVmaW5lZCwgcHJldmlvdXM6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgc3dpdGNoICh0b3VjaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgVG91Y2guTm9uZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBUb3VjaC5GaXJzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtRmlyc3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVG91Y2guTGFzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtTGFzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KGtleSwgaXRlbSk7XG4gICAgICAgICAgICB0aGlzLl9zaXplKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5yZW1vdmUoa2V5KTtcbiAgICB9XG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuX3NpemUtLTtcbiAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHNoaWZ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgJiYgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkIHx8ICF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICB0aGlzLl9tYXAuZGVsZXRlKGl0ZW0ua2V5KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLl9zaXplLS07XG4gICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkO1xuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja2ZuLmJpbmQodGhpc0FyZykoY3VycmVudC52YWx1ZSwgY3VycmVudC5rZXksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tmbihjdXJyZW50LnZhbHVlLCBjdXJyZW50LmtleSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMaW5rZWRNYXAgZ290IG1vZGlmaWVkIGR1cmluZyBpdGVyYXRpb24uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZDtcbiAgICAgICAgY29uc3QgaXRlcmF0b3IgPSB7XG4gICAgICAgICAgICBbU3ltYm9sLml0ZXJhdG9yXTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExpbmtlZE1hcCBnb3QgbW9kaWZpZWQgZHVyaW5nIGl0ZXJhdGlvbi5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB2YWx1ZTogY3VycmVudC5rZXksIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkO1xuICAgICAgICBjb25zdCBpdGVyYXRvciA9IHtcbiAgICAgICAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTGlua2VkTWFwIGdvdCBtb2RpZmllZCBkdXJpbmcgaXRlcmF0aW9uLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHZhbHVlOiBjdXJyZW50LnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgIH1cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIGNvbnN0IGl0ZXJhdG9yID0ge1xuICAgICAgICAgICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMaW5rZWRNYXAgZ290IG1vZGlmaWVkIGR1cmluZyBpdGVyYXRpb24uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdmFsdWU6IFtjdXJyZW50LmtleSwgY3VycmVudC52YWx1ZV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIFsoX2EgPSBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC5pdGVyYXRvcildKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfVxuICAgIHRyaW1PbGQobmV3U2l6ZSkge1xuICAgICAgICBpZiAobmV3U2l6ZSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3U2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZDtcbiAgICAgICAgbGV0IGN1cnJlbnRTaXplID0gdGhpcy5zaXplO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50U2l6ZSA+IG5ld1NpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5kZWxldGUoY3VycmVudC5rZXkpO1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnRTaXplLS07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGVhZCA9IGN1cnJlbnQ7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjdXJyZW50U2l6ZTtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucHJldmlvdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICB9XG4gICAgYWRkSXRlbUZpcnN0KGl0ZW0pIHtcbiAgICAgICAgLy8gRmlyc3QgdGltZSBJbnNlcnRcbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkICYmICF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5faGVhZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXZpb3VzID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oZWFkID0gaXRlbTtcbiAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICB9XG4gICAgYWRkSXRlbUxhc3QoaXRlbSkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lIEluc2VydFxuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgJiYgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5wcmV2aW91cyA9IHRoaXMuX3RhaWw7XG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtO1xuICAgICAgICB0aGlzLl9zdGF0ZSsrO1xuICAgIH1cbiAgICByZW1vdmVJdGVtKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQgJiYgaXRlbSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbSA9PT0gdGhpcy5faGVhZCkge1xuICAgICAgICAgICAgLy8gVGhpcyBjYW4gb25seSBoYXBwZW5lZCBpZiBzaXplID09PSAxIHdoaWNoIGlzIGhhbmRsZVxuICAgICAgICAgICAgLy8gYnkgdGhlIGNhc2UgYWJvdmUuXG4gICAgICAgICAgICBpZiAoIWl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldmlvdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZW0gPT09IHRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuZWQgaWYgc2l6ZSA9PT0gMSB3aGljaCBpcyBoYW5kbGVcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBjYXNlIGFib3ZlLlxuICAgICAgICAgICAgaWYgKCFpdGVtLnByZXZpb3VzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0ucHJldmlvdXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gaXRlbS5wcmV2aW91cztcbiAgICAgICAgICAgIGlmICghbmV4dCB8fCAhcHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpdGVtLnByZXZpb3VzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9zdGF0ZSsrO1xuICAgIH1cbiAgICB0b3VjaChpdGVtLCB0b3VjaCkge1xuICAgICAgICBpZiAoIXRoaXMuX2hlYWQgfHwgIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaXN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0b3VjaCAhPT0gVG91Y2guRmlyc3QgJiYgdG91Y2ggIT09IFRvdWNoLkxhc3QpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdWNoID09PSBUb3VjaC5GaXJzdCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICAgICAgLy8gVW5saW5rIHRoZSBpdGVtXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzIG11c3QgYmUgZGVmaW5lZCBzaW5jZSBpdGVtIHdhcyBub3QgaGVhZCBidXQgaXMgdGFpbFxuICAgICAgICAgICAgICAgIC8vIFNvIHRoZXJlIGFyZSBtb3JlIHRoYW4gb24gaXRlbSBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWlsID0gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBCb3RoIG5leHQgYW5kIHByZXZpb3VzIGFyZSBub3QgdW5kZWZpbmVkIHNpbmNlIGl0ZW0gd2FzIG5laXRoZXIgaGVhZCBub3IgdGFpbC5cbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIG5vZGUgYXQgaGVhZFxuICAgICAgICAgICAgaXRlbS5wcmV2aW91cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXZpb3VzID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b3VjaCA9PT0gVG91Y2guTGFzdCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBpdGVtLnByZXZpb3VzO1xuICAgICAgICAgICAgLy8gVW5saW5rIHRoZSBpdGVtLlxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBuZXh0IG11c3QgYmUgZGVmaW5lZCBzaW5jZSBpdGVtIHdhcyBub3QgdGFpbCBidXQgaXMgaGVhZFxuICAgICAgICAgICAgICAgIC8vIFNvIHRoZXJlIGFyZSBtb3JlIHRoYW4gb24gaXRlbSBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFkID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEJvdGggbmV4dCBhbmQgcHJldmlvdXMgYXJlIG5vdCB1bmRlZmluZWQgc2luY2UgaXRlbSB3YXMgbmVpdGhlciBoZWFkIG5vciB0YWlsLlxuICAgICAgICAgICAgICAgIG5leHQucHJldmlvdXMgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0ubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGl0ZW0ucHJldmlvdXMgPSB0aGlzLl90YWlsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gaXRlbTtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBmcm9tSlNPTihkYXRhKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkxpbmtlZE1hcCA9IExpbmtlZE1hcDtcbmNsYXNzIExSVUNhY2hlIGV4dGVuZHMgTGlua2VkTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihsaW1pdCwgcmF0aW8gPSAxKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgIHRoaXMuX3JhdGlvID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcmF0aW8pLCAxKTtcbiAgICB9XG4gICAgZ2V0IGxpbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGltaXQ7XG4gICAgfVxuICAgIHNldCBsaW1pdChsaW1pdCkge1xuICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICB0aGlzLmNoZWNrVHJpbSgpO1xuICAgIH1cbiAgICBnZXQgcmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXRpbztcbiAgICB9XG4gICAgc2V0IHJhdGlvKHJhdGlvKSB7XG4gICAgICAgIHRoaXMuX3JhdGlvID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcmF0aW8pLCAxKTtcbiAgICAgICAgdGhpcy5jaGVja1RyaW0oKTtcbiAgICB9XG4gICAgZ2V0KGtleSwgdG91Y2ggPSBUb3VjaC5Bc05ldykge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSwgdG91Y2gpO1xuICAgIH1cbiAgICBwZWVrKGtleSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSwgVG91Y2guTm9uZSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLnNldChrZXksIHZhbHVlLCBUb3VjaC5MYXN0KTtcbiAgICAgICAgdGhpcy5jaGVja1RyaW0oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNoZWNrVHJpbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+IHRoaXMuX2xpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnRyaW1PbGQoTWF0aC5yb3VuZCh0aGlzLl9saW1pdCAqIHRoaXMuX3JhdGlvKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkxSVUNhY2hlID0gTFJVQ2FjaGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VCdWZmZXIgPSB2b2lkIDA7XG5jb25zdCBDUiA9IDEzO1xuY29uc3QgTEYgPSAxMDtcbmNvbnN0IENSTEYgPSAnXFxyXFxuJztcbmNsYXNzIEFic3RyYWN0TWVzc2FnZUJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoZW5jb2RpbmcgPSAndXRmLTgnKSB7XG4gICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgIHRoaXMuX2NodW5rcyA9IFtdO1xuICAgICAgICB0aGlzLl90b3RhbExlbmd0aCA9IDA7XG4gICAgfVxuICAgIGdldCBlbmNvZGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY29kaW5nO1xuICAgIH1cbiAgICBhcHBlbmQoY2h1bmspIHtcbiAgICAgICAgY29uc3QgdG9BcHBlbmQgPSB0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnID8gdGhpcy5mcm9tU3RyaW5nKGNodW5rLCB0aGlzLl9lbmNvZGluZykgOiBjaHVuaztcbiAgICAgICAgdGhpcy5fY2h1bmtzLnB1c2godG9BcHBlbmQpO1xuICAgICAgICB0aGlzLl90b3RhbExlbmd0aCArPSB0b0FwcGVuZC5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICB0cnlSZWFkSGVhZGVycyhsb3dlckNhc2VLZXlzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NodW5rcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXRlID0gMDtcbiAgICAgICAgbGV0IGNodW5rSW5kZXggPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGNodW5rQnl0ZXNSZWFkID0gMDtcbiAgICAgICAgcm93OiB3aGlsZSAoY2h1bmtJbmRleCA8IHRoaXMuX2NodW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fY2h1bmtzW2NodW5rSW5kZXhdO1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIGNvbHVtbjogd2hpbGUgKG9mZnNldCA8IGNodW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2h1bmtbb2Zmc2V0XTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ1I6XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBMRjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayByb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2h1bmtCeXRlc1JlYWQgKz0gY2h1bmsuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgIGNodW5rSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUgIT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGJ1ZmZlciBjb250YWlucyB0aGUgdHdvIENSTEYgYXQgdGhlIGVuZC4gU28gd2Ugd2lsbFxuICAgICAgICAvLyBoYXZlIHR3byBlbXB0eSBsaW5lcyBhZnRlciB0aGUgc3BsaXQgYXQgdGhlIGVuZCBhcyB3ZWxsLlxuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9yZWFkKGNodW5rQnl0ZXNSZWFkICsgb2Zmc2V0KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy50b1N0cmluZyhidWZmZXIsICdhc2NpaScpLnNwbGl0KENSTEYpO1xuICAgICAgICBpZiAoaGVhZGVycy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlcnNbaV07XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGhlYWRlci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXNzYWdlIGhlYWRlciBtdXN0IHNlcGFyYXRlIGtleSBhbmQgdmFsdWUgdXNpbmcgOicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qga2V5ID0gaGVhZGVyLnN1YnN0cigwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGhlYWRlci5zdWJzdHIoaW5kZXggKyAxKS50cmltKCk7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGxvd2VyQ2FzZUtleXMgPyBrZXkudG9Mb3dlckNhc2UoKSA6IGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRyeVJlYWRCb2R5KGxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5fdG90YWxMZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWQobGVuZ3RoKTtcbiAgICB9XG4gICAgZ2V0IG51bWJlck9mQnl0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbExlbmd0aDtcbiAgICB9XG4gICAgX3JlYWQoYnl0ZUNvdW50KSB7XG4gICAgICAgIGlmIChieXRlQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtcHR5QnVmZmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVDb3VudCA+IHRoaXMuX3RvdGFsTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZWFkIHNvIG1hbnkgYnl0ZXMhYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NodW5rc1swXS5ieXRlTGVuZ3RoID09PSBieXRlQ291bnQpIHtcbiAgICAgICAgICAgIC8vIHN1cGVyIGZhc3QgcGF0aCwgcHJlY2lzZWx5IGZpcnN0IGNodW5rIG11c3QgYmUgcmV0dXJuZWRcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fY2h1bmtzWzBdO1xuICAgICAgICAgICAgdGhpcy5fY2h1bmtzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLl90b3RhbExlbmd0aCAtPSBieXRlQ291bnQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc05hdGl2ZShjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NodW5rc1swXS5ieXRlTGVuZ3RoID4gYnl0ZUNvdW50KSB7XG4gICAgICAgICAgICAvLyBmYXN0IHBhdGgsIHRoZSByZWFkaW5nIGlzIGVudGlyZWx5IHdpdGhpbiB0aGUgZmlyc3QgY2h1bmtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fY2h1bmtzWzBdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hc05hdGl2ZShjaHVuaywgYnl0ZUNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX2NodW5rc1swXSA9IGNodW5rLnNsaWNlKGJ5dGVDb3VudCk7XG4gICAgICAgICAgICB0aGlzLl90b3RhbExlbmd0aCAtPSBieXRlQ291bnQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuYWxsb2NOYXRpdmUoYnl0ZUNvdW50KTtcbiAgICAgICAgbGV0IHJlc3VsdE9mZnNldCA9IDA7XG4gICAgICAgIGxldCBjaHVua0luZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGJ5dGVDb3VudCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fY2h1bmtzW2NodW5rSW5kZXhdO1xuICAgICAgICAgICAgaWYgKGNodW5rLmJ5dGVMZW5ndGggPiBieXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGNodW5rIHdpbGwgc3Vydml2ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rUGFydCA9IGNodW5rLnNsaWNlKDAsIGJ5dGVDb3VudCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChjaHVua1BhcnQsIHJlc3VsdE9mZnNldCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0T2Zmc2V0ICs9IGJ5dGVDb3VudDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaHVua3NbY2h1bmtJbmRleF0gPSBjaHVuay5zbGljZShieXRlQ291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdGFsTGVuZ3RoIC09IGJ5dGVDb3VudDtcbiAgICAgICAgICAgICAgICBieXRlQ291bnQgLT0gYnl0ZUNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBjaHVuayB3aWxsIGJlIGVudGlyZWx5IHJlYWRcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGNodW5rLCByZXN1bHRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdE9mZnNldCArPSBjaHVuay5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NodW5rcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdGFsTGVuZ3RoIC09IGNodW5rLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICAgICAgYnl0ZUNvdW50IC09IGNodW5rLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLkFic3RyYWN0TWVzc2FnZUJ1ZmZlciA9IEFic3RyYWN0TWVzc2FnZUJ1ZmZlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5SZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXIgPSBleHBvcnRzLkFic3RyYWN0TWVzc2FnZVJlYWRlciA9IGV4cG9ydHMuTWVzc2FnZVJlYWRlciA9IHZvaWQgMDtcbmNvbnN0IHJhbF8xID0gcmVxdWlyZShcIi4vcmFsXCIpO1xuY29uc3QgSXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuY29uc3Qgc2VtYXBob3JlXzEgPSByZXF1aXJlKFwiLi9zZW1hcGhvcmVcIik7XG52YXIgTWVzc2FnZVJlYWRlcjtcbihmdW5jdGlvbiAoTWVzc2FnZVJlYWRlcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5saXN0ZW4pICYmIElzLmZ1bmMoY2FuZGlkYXRlLmRpc3Bvc2UpICYmXG4gICAgICAgICAgICBJcy5mdW5jKGNhbmRpZGF0ZS5vbkVycm9yKSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5vbkNsb3NlKSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5vblBhcnRpYWxNZXNzYWdlKTtcbiAgICB9XG4gICAgTWVzc2FnZVJlYWRlci5pcyA9IGlzO1xufSkoTWVzc2FnZVJlYWRlciA9IGV4cG9ydHMuTWVzc2FnZVJlYWRlciB8fCAoZXhwb3J0cy5NZXNzYWdlUmVhZGVyID0ge30pKTtcbmNsYXNzIEFic3RyYWN0TWVzc2FnZVJlYWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyID0gbmV3IGV2ZW50c18xLkVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgICAgICB0aGlzLnBhcnRpYWxNZXNzYWdlRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBnZXQgb25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JFbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBmaXJlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvckVtaXR0ZXIuZmlyZSh0aGlzLmFzRXJyb3IoZXJyb3IpKTtcbiAgICB9XG4gICAgZ2V0IG9uQ2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb3NlRW1pdHRlci5ldmVudDtcbiAgICB9XG4gICAgZmlyZUNsb3NlKCkge1xuICAgICAgICB0aGlzLmNsb3NlRW1pdHRlci5maXJlKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGdldCBvblBhcnRpYWxNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWFsTWVzc2FnZUVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIGZpcmVQYXJ0aWFsTWVzc2FnZShpbmZvKSB7XG4gICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VFbWl0dGVyLmZpcmUoaW5mbyk7XG4gICAgfVxuICAgIGFzRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYFJlYWRlciByZWNlaXZlZCBlcnJvci4gUmVhc29uOiAke0lzLnN0cmluZyhlcnJvci5tZXNzYWdlKSA/IGVycm9yLm1lc3NhZ2UgOiAndW5rbm93bid9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkFic3RyYWN0TWVzc2FnZVJlYWRlciA9IEFic3RyYWN0TWVzc2FnZVJlYWRlcjtcbnZhciBSZXNvbHZlZE1lc3NhZ2VSZWFkZXJPcHRpb25zO1xuKGZ1bmN0aW9uIChSZXNvbHZlZE1lc3NhZ2VSZWFkZXJPcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gZnJvbU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgY2hhcnNldDtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgbGV0IGNvbnRlbnREZWNvZGVyO1xuICAgICAgICBjb25zdCBjb250ZW50RGVjb2RlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBjb250ZW50VHlwZURlY29kZXI7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlRGVjb2RlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjaGFyc2V0ID0gb3B0aW9ucyA/PyAndXRmLTgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldCA/PyAndXRmLTgnO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGVudERlY29kZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnREZWNvZGVyID0gb3B0aW9ucy5jb250ZW50RGVjb2RlcjtcbiAgICAgICAgICAgICAgICBjb250ZW50RGVjb2RlcnMuc2V0KGNvbnRlbnREZWNvZGVyLm5hbWUsIGNvbnRlbnREZWNvZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRlbnREZWNvZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZWNvZGVyIG9mIG9wdGlvbnMuY29udGVudERlY29kZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnREZWNvZGVycy5zZXQoZGVjb2Rlci5uYW1lLCBkZWNvZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250ZW50VHlwZURlY29kZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlciA9IG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVyO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlcnMuc2V0KGNvbnRlbnRUeXBlRGVjb2Rlci5uYW1lLCBjb250ZW50VHlwZURlY29kZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZWNvZGVyIG9mIG9wdGlvbnMuY29udGVudFR5cGVEZWNvZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZURlY29kZXJzLnNldChkZWNvZGVyLm5hbWUsIGRlY29kZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudFR5cGVEZWNvZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlRGVjb2RlciA9ICgwLCByYWxfMS5kZWZhdWx0KSgpLmFwcGxpY2F0aW9uSnNvbi5kZWNvZGVyO1xuICAgICAgICAgICAgY29udGVudFR5cGVEZWNvZGVycy5zZXQoY29udGVudFR5cGVEZWNvZGVyLm5hbWUsIGNvbnRlbnRUeXBlRGVjb2Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgY2hhcnNldCwgY29udGVudERlY29kZXIsIGNvbnRlbnREZWNvZGVycywgY29udGVudFR5cGVEZWNvZGVyLCBjb250ZW50VHlwZURlY29kZXJzIH07XG4gICAgfVxuICAgIFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMuZnJvbU9wdGlvbnMgPSBmcm9tT3B0aW9ucztcbn0pKFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMgfHwgKFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMgPSB7fSkpO1xuY2xhc3MgUmVhZGFibGVTdHJlYW1NZXNzYWdlUmVhZGVyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkYWJsZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJlYWRhYmxlID0gcmVhZGFibGU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFJlc29sdmVkTWVzc2FnZVJlYWRlck9wdGlvbnMuZnJvbU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gKDAsIHJhbF8xLmRlZmF1bHQpKCkubWVzc2FnZUJ1ZmZlci5jcmVhdGUodGhpcy5vcHRpb25zLmNoYXJzZXQpO1xuICAgICAgICB0aGlzLl9wYXJ0aWFsTWVzc2FnZVRpbWVvdXQgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5uZXh0TWVzc2FnZUxlbmd0aCA9IC0xO1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb2tlbiA9IDA7XG4gICAgICAgIHRoaXMucmVhZFNlbWFwaG9yZSA9IG5ldyBzZW1hcGhvcmVfMS5TZW1hcGhvcmUoMSk7XG4gICAgfVxuICAgIHNldCBwYXJ0aWFsTWVzc2FnZVRpbWVvdXQodGltZW91dCkge1xuICAgICAgICB0aGlzLl9wYXJ0aWFsTWVzc2FnZVRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cbiAgICBnZXQgcGFydGlhbE1lc3NhZ2VUaW1lb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydGlhbE1lc3NhZ2VUaW1lb3V0O1xuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5uZXh0TWVzc2FnZUxlbmd0aCA9IC0xO1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb2tlbiA9IDA7XG4gICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnJlYWRhYmxlLm9uRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlYWRhYmxlLm9uRXJyb3IoKGVycm9yKSA9PiB0aGlzLmZpcmVFcnJvcihlcnJvcikpO1xuICAgICAgICB0aGlzLnJlYWRhYmxlLm9uQ2xvc2UoKCkgPT4gdGhpcy5maXJlQ2xvc2UoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLmFwcGVuZChkYXRhKTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRNZXNzYWdlTGVuZ3RoID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmJ1ZmZlci50cnlSZWFkSGVhZGVycyh0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50TGVuZ3RoID0gaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZUVycm9yKG5ldyBFcnJvcignSGVhZGVyIG11c3QgcHJvdmlkZSBhIENvbnRlbnQtTGVuZ3RoIHByb3BlcnR5LicpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChjb250ZW50TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihuZXcgRXJyb3IoJ0NvbnRlbnQtTGVuZ3RoIHZhbHVlIG11c3QgYmUgYSBudW1iZXIuJykpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dE1lc3NhZ2VMZW5ndGggPSBsZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5idWZmZXIudHJ5UmVhZEJvZHkodGhpcy5uZXh0TWVzc2FnZUxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLyoqIFdlIGhhdmVuJ3QgcmVjZWl2ZWQgdGhlIGZ1bGwgbWVzc2FnZSB5ZXQuICovXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJ0aWFsTWVzc2FnZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jbGVhclBhcnRpYWxNZXNzYWdlVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dE1lc3NhZ2VMZW5ndGggPSAtMTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGNvbnZlcnQgb25lIHJlY2VpdmVkIG1lc3NhZ2UgYWZ0ZXIgdGhlXG4gICAgICAgICAgICAvLyBvdGhlci4gT3RoZXJ3aXNlIGl0IGNvdWxkIGhhcHBlbiB0aGF0IGEgZGVjb2Rpbmcgb2YgYSBzZWNvbmRcbiAgICAgICAgICAgIC8vIHNtYWxsZXIgbWVzc2FnZSBmaW5pc2hlZCBiZWZvcmUgdGhlIGRlY29kaW5nIG9mIGEgZmlyc3QgbGFyZ2VyXG4gICAgICAgICAgICAvLyBtZXNzYWdlIGFuZCB0aGVuIHdlIHdvdWxkIGRlbGl2ZXIgdGhlIHNlY29uZCBtZXNzYWdlIGZpcnN0LlxuICAgICAgICAgICAgdGhpcy5yZWFkU2VtYXBob3JlLmxvY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5vcHRpb25zLmNvbnRlbnREZWNvZGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCB0aGlzLm9wdGlvbnMuY29udGVudERlY29kZXIuZGVjb2RlKGJvZHkpXG4gICAgICAgICAgICAgICAgICAgIDogYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgdGhpcy5vcHRpb25zLmNvbnRlbnRUeXBlRGVjb2Rlci5kZWNvZGUoYnl0ZXMsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhtZXNzYWdlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyUGFydGlhbE1lc3NhZ2VUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucGFydGlhbE1lc3NhZ2VUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsTWVzc2FnZVRpbWVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucGFydGlhbE1lc3NhZ2VUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRQYXJ0aWFsTWVzc2FnZVRpbWVyKCkge1xuICAgICAgICB0aGlzLmNsZWFyUGFydGlhbE1lc3NhZ2VUaW1lcigpO1xuICAgICAgICBpZiAodGhpcy5fcGFydGlhbE1lc3NhZ2VUaW1lb3V0IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcnRpYWxNZXNzYWdlVGltZXIgPSAoMCwgcmFsXzEuZGVmYXVsdCkoKS50aW1lci5zZXRUaW1lb3V0KCh0b2tlbiwgdGltZW91dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsTWVzc2FnZVRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRva2VuID09PSB0aGlzLm1lc3NhZ2VUb2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZVBhcnRpYWxNZXNzYWdlKHsgbWVzc2FnZVRva2VuOiB0b2tlbiwgd2FpdGluZ1RpbWU6IHRpbWVvdXQgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJ0aWFsTWVzc2FnZVRpbWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuX3BhcnRpYWxNZXNzYWdlVGltZW91dCwgdGhpcy5tZXNzYWdlVG9rZW4sIHRoaXMuX3BhcnRpYWxNZXNzYWdlVGltZW91dCk7XG4gICAgfVxufVxuZXhwb3J0cy5SZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXIgPSBSZWFkYWJsZVN0cmVhbU1lc3NhZ2VSZWFkZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV3JpdGVhYmxlU3RyZWFtTWVzc2FnZVdyaXRlciA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5NZXNzYWdlV3JpdGVyID0gdm9pZCAwO1xuY29uc3QgcmFsXzEgPSByZXF1aXJlKFwiLi9yYWxcIik7XG5jb25zdCBJcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuY29uc3Qgc2VtYXBob3JlXzEgPSByZXF1aXJlKFwiLi9zZW1hcGhvcmVcIik7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50c1wiKTtcbmNvbnN0IENvbnRlbnRMZW5ndGggPSAnQ29udGVudC1MZW5ndGg6ICc7XG5jb25zdCBDUkxGID0gJ1xcclxcbic7XG52YXIgTWVzc2FnZVdyaXRlcjtcbihmdW5jdGlvbiAoTWVzc2FnZVdyaXRlcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGxldCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5kaXNwb3NlKSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5vbkNsb3NlKSAmJlxuICAgICAgICAgICAgSXMuZnVuYyhjYW5kaWRhdGUub25FcnJvcikgJiYgSXMuZnVuYyhjYW5kaWRhdGUud3JpdGUpO1xuICAgIH1cbiAgICBNZXNzYWdlV3JpdGVyLmlzID0gaXM7XG59KShNZXNzYWdlV3JpdGVyID0gZXhwb3J0cy5NZXNzYWdlV3JpdGVyIHx8IChleHBvcnRzLk1lc3NhZ2VXcml0ZXIgPSB7fSkpO1xuY2xhc3MgQWJzdHJhY3RNZXNzYWdlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lcnJvckVtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNsb3NlRW1pdHRlciA9IG5ldyBldmVudHNfMS5FbWl0dGVyKCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBnZXQgb25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JFbWl0dGVyLmV2ZW50O1xuICAgIH1cbiAgICBmaXJlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGNvdW50KSB7XG4gICAgICAgIHRoaXMuZXJyb3JFbWl0dGVyLmZpcmUoW3RoaXMuYXNFcnJvcihlcnJvciksIG1lc3NhZ2UsIGNvdW50XSk7XG4gICAgfVxuICAgIGdldCBvbkNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9zZUVtaXR0ZXIuZXZlbnQ7XG4gICAgfVxuICAgIGZpcmVDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbG9zZUVtaXR0ZXIuZmlyZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBhc0Vycm9yKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBXcml0ZXIgcmVjZWl2ZWQgZXJyb3IuIFJlYXNvbjogJHtJcy5zdHJpbmcoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDogJ3Vua25vd24nfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5BYnN0cmFjdE1lc3NhZ2VXcml0ZXIgPSBBYnN0cmFjdE1lc3NhZ2VXcml0ZXI7XG52YXIgUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucztcbihmdW5jdGlvbiAoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIGZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGNoYXJzZXQ6IG9wdGlvbnMgPz8gJ3V0Zi04JywgY29udGVudFR5cGVFbmNvZGVyOiAoMCwgcmFsXzEuZGVmYXVsdCkoKS5hcHBsaWNhdGlvbkpzb24uZW5jb2RlciB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgY2hhcnNldDogb3B0aW9ucy5jaGFyc2V0ID8/ICd1dGYtOCcsIGNvbnRlbnRFbmNvZGVyOiBvcHRpb25zLmNvbnRlbnRFbmNvZGVyLCBjb250ZW50VHlwZUVuY29kZXI6IG9wdGlvbnMuY29udGVudFR5cGVFbmNvZGVyID8/ICgwLCByYWxfMS5kZWZhdWx0KSgpLmFwcGxpY2F0aW9uSnNvbi5lbmNvZGVyIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucy5mcm9tT3B0aW9ucyA9IGZyb21PcHRpb25zO1xufSkoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucyB8fCAoUmVzb2x2ZWRNZXNzYWdlV3JpdGVyT3B0aW9ucyA9IHt9KSk7XG5jbGFzcyBXcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlV3JpdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih3cml0YWJsZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gd3JpdGFibGU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFJlc29sdmVkTWVzc2FnZVdyaXRlck9wdGlvbnMuZnJvbU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XG4gICAgICAgIHRoaXMud3JpdGVTZW1hcGhvcmUgPSBuZXcgc2VtYXBob3JlXzEuU2VtYXBob3JlKDEpO1xuICAgICAgICB0aGlzLndyaXRhYmxlLm9uRXJyb3IoKGVycm9yKSA9PiB0aGlzLmZpcmVFcnJvcihlcnJvcikpO1xuICAgICAgICB0aGlzLndyaXRhYmxlLm9uQ2xvc2UoKCkgPT4gdGhpcy5maXJlQ2xvc2UoKSk7XG4gICAgfVxuICAgIGFzeW5jIHdyaXRlKG1zZykge1xuICAgICAgICByZXR1cm4gdGhpcy53cml0ZVNlbWFwaG9yZS5sb2NrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLm9wdGlvbnMuY29udGVudFR5cGVFbmNvZGVyLmVuY29kZShtc2csIHRoaXMub3B0aW9ucykudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50RW5jb2RlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29udGVudEVuY29kZXIuZW5jb2RlKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChDb250ZW50TGVuZ3RoLCBidWZmZXIuYnl0ZUxlbmd0aC50b1N0cmluZygpLCBDUkxGKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goQ1JMRik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9Xcml0ZShtc2csIGhlYWRlcnMsIGJ1ZmZlcik7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGRvV3JpdGUobXNnLCBoZWFkZXJzLCBkYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLndyaXRhYmxlLndyaXRlKGhlYWRlcnMuam9pbignJyksICdhc2NpaScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGFibGUud3JpdGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBtc2cpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVFcnJvcihlcnJvciwgbXNnKSB7XG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCsrO1xuICAgICAgICB0aGlzLmZpcmVFcnJvcihlcnJvciwgbXNnLCB0aGlzLmVycm9yQ291bnQpO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUuZW5kKCk7XG4gICAgfVxufVxuZXhwb3J0cy5Xcml0ZWFibGVTdHJlYW1NZXNzYWdlV3JpdGVyID0gV3JpdGVhYmxlU3RyZWFtTWVzc2FnZVdyaXRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXNzYWdlID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlOSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTggPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU3ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTUgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGU0ID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMyA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTIgPSBleHBvcnRzLk5vdGlmaWNhdGlvblR5cGUxID0gZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuUmVxdWVzdFR5cGU5ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTggPSBleHBvcnRzLlJlcXVlc3RUeXBlNyA9IGV4cG9ydHMuUmVxdWVzdFR5cGU2ID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTUgPSBleHBvcnRzLlJlcXVlc3RUeXBlNCA9IGV4cG9ydHMuUmVxdWVzdFR5cGUzID0gZXhwb3J0cy5SZXF1ZXN0VHlwZTIgPSBleHBvcnRzLlJlcXVlc3RUeXBlMSA9IGV4cG9ydHMuUmVxdWVzdFR5cGUgPSBleHBvcnRzLlJlcXVlc3RUeXBlMCA9IGV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlID0gZXhwb3J0cy5QYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gZXhwb3J0cy5SZXNwb25zZUVycm9yID0gZXhwb3J0cy5FcnJvckNvZGVzID0gdm9pZCAwO1xuY29uc3QgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbi8qKlxuICogUHJlZGVmaW5lZCBlcnJvciBjb2Rlcy5cbiAqL1xudmFyIEVycm9yQ29kZXM7XG4oZnVuY3Rpb24gKEVycm9yQ29kZXMpIHtcbiAgICAvLyBEZWZpbmVkIGJ5IEpTT04gUlBDXG4gICAgRXJyb3JDb2Rlcy5QYXJzZUVycm9yID0gLTMyNzAwO1xuICAgIEVycm9yQ29kZXMuSW52YWxpZFJlcXVlc3QgPSAtMzI2MDA7XG4gICAgRXJyb3JDb2Rlcy5NZXRob2ROb3RGb3VuZCA9IC0zMjYwMTtcbiAgICBFcnJvckNvZGVzLkludmFsaWRQYXJhbXMgPSAtMzI2MDI7XG4gICAgRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yID0gLTMyNjAzO1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIHN0YXJ0IHJhbmdlIG9mIEpTT04gUlBDIHJlc2VydmVkIGVycm9yIGNvZGVzLlxuICAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLiBObyBhcHBsaWNhdGlvbiBlcnJvciBjb2RlcyBzaG91bGRcbiAgICAgKiBiZSBkZWZpbmVkIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgcmFuZ2UuIEZvciBiYWNrd2FyZHNcbiAgICAgKiBjb21wYXRpYmlsaXR5IHRoZSBgU2VydmVyTm90SW5pdGlhbGl6ZWRgIGFuZCB0aGUgYFVua25vd25FcnJvckNvZGVgXG4gICAgICogYXJlIGxlZnQgaW4gdGhlIHJhbmdlLlxuICAgICAqXG4gICAgICogQHNpbmNlIDMuMTYuMFxuICAgICovXG4gICAgRXJyb3JDb2Rlcy5qc29ucnBjUmVzZXJ2ZWRFcnJvclJhbmdlU3RhcnQgPSAtMzIwOTk7XG4gICAgLyoqIEBkZXByZWNhdGVkIHVzZSAganNvbnJwY1Jlc2VydmVkRXJyb3JSYW5nZVN0YXJ0ICovXG4gICAgRXJyb3JDb2Rlcy5zZXJ2ZXJFcnJvclN0YXJ0ID0gLTMyMDk5O1xuICAgIC8qKlxuICAgICAqIEFuIGVycm9yIG9jY3VycmVkIHdoZW4gd3JpdGUgYSBtZXNzYWdlIHRvIHRoZSB0cmFuc3BvcnQgbGF5ZXIuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5NZXNzYWdlV3JpdGVFcnJvciA9IC0zMjA5OTtcbiAgICAvKipcbiAgICAgKiBBbiBlcnJvciBvY2N1cnJlZCB3aGVuIHJlYWRpbmcgYSBtZXNzYWdlIGZyb20gdGhlIHRyYW5zcG9ydCBsYXllci5cbiAgICAgKi9cbiAgICBFcnJvckNvZGVzLk1lc3NhZ2VSZWFkRXJyb3IgPSAtMzIwOTg7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbm5lY3Rpb24gZ290IGRpc3Bvc2VkIG9yIGxvc3QgYW5kIGFsbCBwZW5kaW5nIHJlc3BvbnNlcyBnb3RcbiAgICAgKiByZWplY3RlZC5cbiAgICAgKi9cbiAgICBFcnJvckNvZGVzLlBlbmRpbmdSZXNwb25zZVJlamVjdGVkID0gLTMyMDk3O1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25uZWN0aW9uIGlzIGluYWN0aXZlIGFuZCBhIHVzZSBvZiBpdCBmYWlsZWQuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5Db25uZWN0aW9uSW5hY3RpdmUgPSAtMzIwOTY7XG4gICAgLyoqXG4gICAgICogRXJyb3IgY29kZSBpbmRpY2F0aW5nIHRoYXQgYSBzZXJ2ZXIgcmVjZWl2ZWQgYSBub3RpZmljYXRpb24gb3JcbiAgICAgKiByZXF1ZXN0IGJlZm9yZSB0aGUgc2VydmVyIGhhcyByZWNlaXZlZCB0aGUgYGluaXRpYWxpemVgIHJlcXVlc3QuXG4gICAgICovXG4gICAgRXJyb3JDb2Rlcy5TZXJ2ZXJOb3RJbml0aWFsaXplZCA9IC0zMjAwMjtcbiAgICBFcnJvckNvZGVzLlVua25vd25FcnJvckNvZGUgPSAtMzIwMDE7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgZW5kIHJhbmdlIG9mIEpTT04gUlBDIHJlc2VydmVkIGVycm9yIGNvZGVzLlxuICAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLlxuICAgICAqXG4gICAgICogQHNpbmNlIDMuMTYuMFxuICAgICovXG4gICAgRXJyb3JDb2Rlcy5qc29ucnBjUmVzZXJ2ZWRFcnJvclJhbmdlRW5kID0gLTMyMDAwO1xuICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgIGpzb25ycGNSZXNlcnZlZEVycm9yUmFuZ2VFbmQgKi9cbiAgICBFcnJvckNvZGVzLnNlcnZlckVycm9yRW5kID0gLTMyMDAwO1xufSkoRXJyb3JDb2RlcyA9IGV4cG9ydHMuRXJyb3JDb2RlcyB8fCAoZXhwb3J0cy5FcnJvckNvZGVzID0ge30pKTtcbi8qKlxuICogQW4gZXJyb3Igb2JqZWN0IHJldHVybiBpbiBhIHJlc3BvbnNlIGluIGNhc2UgYSByZXF1ZXN0XG4gKiBoYXMgZmFpbGVkLlxuICovXG5jbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvZGUsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9IGlzLm51bWJlcihjb2RlKSA/IGNvZGUgOiBFcnJvckNvZGVzLlVua25vd25FcnJvckNvZGU7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBSZXNwb25zZUVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuICAgIHRvSnNvbigpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLlJlc3BvbnNlRXJyb3IgPSBSZXNwb25zZUVycm9yO1xuY2xhc3MgUGFyYW1ldGVyU3RydWN0dXJlcyB7XG4gICAgY29uc3RydWN0b3Ioa2luZCkge1xuICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgIH1cbiAgICBzdGF0aWMgaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG8gfHwgdmFsdWUgPT09IFBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lIHx8IHZhbHVlID09PSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5UG9zaXRpb247XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5raW5kO1xuICAgIH1cbn1cbmV4cG9ydHMuUGFyYW1ldGVyU3RydWN0dXJlcyA9IFBhcmFtZXRlclN0cnVjdHVyZXM7XG4vKipcbiAqIFRoZSBwYXJhbWV0ZXIgc3RydWN0dXJlIGlzIGF1dG9tYXRpY2FsbHkgaW5mZXJyZWQgb24gdGhlIG51bWJlciBvZiBwYXJhbWV0ZXJzXG4gKiBhbmQgdGhlIHBhcmFtZXRlciB0eXBlIGluIGNhc2Ugb2YgYSBzaW5nbGUgcGFyYW0uXG4gKi9cblBhcmFtZXRlclN0cnVjdHVyZXMuYXV0byA9IG5ldyBQYXJhbWV0ZXJTdHJ1Y3R1cmVzKCdhdXRvJyk7XG4vKipcbiAqIEZvcmNlcyBgYnlQb3NpdGlvbmAgcGFyYW1ldGVyIHN0cnVjdHVyZS4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IGhhdmUgYSBzaW5nbGVcbiAqIHBhcmFtZXRlciB3aGljaCBoYXMgYSBsaXRlcmFsIHR5cGUuXG4gKi9cblBhcmFtZXRlclN0cnVjdHVyZXMuYnlQb3NpdGlvbiA9IG5ldyBQYXJhbWV0ZXJTdHJ1Y3R1cmVzKCdieVBvc2l0aW9uJyk7XG4vKipcbiAqIEZvcmNlcyBgYnlOYW1lYCBwYXJhbWV0ZXIgc3RydWN0dXJlLiBUaGlzIGlzIG9ubHkgdXNlZnVsIHdoZW4gaGF2aW5nIGEgc2luZ2xlXG4gKiBwYXJhbWV0ZXIuIFRoZSBsaWJyYXJ5IHdpbGwgcmVwb3J0IGVycm9ycyBpZiB1c2VkIHdpdGggYSBkaWZmZXJlbnQgbnVtYmVyIG9mXG4gKiBwYXJhbWV0ZXJzLlxuICovXG5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSA9IG5ldyBQYXJhbWV0ZXJTdHJ1Y3R1cmVzKCdieU5hbWUnKTtcbi8qKlxuICogQW4gYWJzdHJhY3QgaW1wbGVtZW50YXRpb24gb2YgYSBNZXNzYWdlVHlwZS5cbiAqL1xuY2xhc3MgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIG51bWJlck9mUGFyYW1zKSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLm51bWJlck9mUGFyYW1zID0gbnVtYmVyT2ZQYXJhbXM7XG4gICAgfVxuICAgIGdldCBwYXJhbWV0ZXJTdHJ1Y3R1cmVzKCkge1xuICAgICAgICByZXR1cm4gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvO1xuICAgIH1cbn1cbmV4cG9ydHMuQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlID0gQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlO1xuLyoqXG4gKiBDbGFzc2VzIHRvIHR5cGUgcmVxdWVzdCByZXNwb25zZSBwYWlyc1xuICovXG5jbGFzcyBSZXF1ZXN0VHlwZTAgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDApO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGUwID0gUmVxdWVzdFR5cGUwO1xuY2xhc3MgUmVxdWVzdFR5cGUgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG8pIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAxKTtcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyU3RydWN0dXJlcyA9IF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbiAgICBnZXQgcGFyYW1ldGVyU3RydWN0dXJlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXM7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZSA9IFJlcXVlc3RUeXBlO1xuY2xhc3MgUmVxdWVzdFR5cGUxIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMSk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBfcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBhcmFtZXRlclN0cnVjdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGUxID0gUmVxdWVzdFR5cGUxO1xuY2xhc3MgUmVxdWVzdFR5cGUyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAyKTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlMiA9IFJlcXVlc3RUeXBlMjtcbmNsYXNzIFJlcXVlc3RUeXBlMyBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMyk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTMgPSBSZXF1ZXN0VHlwZTM7XG5jbGFzcyBSZXF1ZXN0VHlwZTQgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDQpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGU0ID0gUmVxdWVzdFR5cGU0O1xuY2xhc3MgUmVxdWVzdFR5cGU1IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA1KTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlNSA9IFJlcXVlc3RUeXBlNTtcbmNsYXNzIFJlcXVlc3RUeXBlNiBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgNik7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTYgPSBSZXF1ZXN0VHlwZTY7XG5jbGFzcyBSZXF1ZXN0VHlwZTcgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDcpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFR5cGU3ID0gUmVxdWVzdFR5cGU3O1xuY2xhc3MgUmVxdWVzdFR5cGU4IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA4KTtcbiAgICB9XG59XG5leHBvcnRzLlJlcXVlc3RUeXBlOCA9IFJlcXVlc3RUeXBlODtcbmNsYXNzIFJlcXVlc3RUeXBlOSBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgOSk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXF1ZXN0VHlwZTkgPSBSZXF1ZXN0VHlwZTk7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzID0gUGFyYW1ldGVyU3RydWN0dXJlcy5hdXRvKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMSk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBfcGFyYW1ldGVyU3RydWN0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBhcmFtZXRlclN0cnVjdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZSA9IE5vdGlmaWNhdGlvblR5cGU7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlMCBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgMCk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMCA9IE5vdGlmaWNhdGlvblR5cGUwO1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTEgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgX3BhcmFtZXRlclN0cnVjdHVyZXMgPSBQYXJhbWV0ZXJTdHJ1Y3R1cmVzLmF1dG8pIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAxKTtcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyU3RydWN0dXJlcyA9IF9wYXJhbWV0ZXJTdHJ1Y3R1cmVzO1xuICAgIH1cbiAgICBnZXQgcGFyYW1ldGVyU3RydWN0dXJlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlclN0cnVjdHVyZXM7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlMSA9IE5vdGlmaWNhdGlvblR5cGUxO1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTIgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDIpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTIgPSBOb3RpZmljYXRpb25UeXBlMjtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGUzIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCAzKTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGUzID0gTm90aWZpY2F0aW9uVHlwZTM7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlNCBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgNCk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNCA9IE5vdGlmaWNhdGlvblR5cGU0O1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTUgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTUgPSBOb3RpZmljYXRpb25UeXBlNTtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGU2IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA2KTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGU2ID0gTm90aWZpY2F0aW9uVHlwZTY7XG5jbGFzcyBOb3RpZmljYXRpb25UeXBlNyBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVNpZ25hdHVyZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgNyk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25UeXBlNyA9IE5vdGlmaWNhdGlvblR5cGU3O1xuY2xhc3MgTm90aWZpY2F0aW9uVHlwZTggZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VTaWduYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcihtZXRob2QsIDgpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm90aWZpY2F0aW9uVHlwZTggPSBOb3RpZmljYXRpb25UeXBlODtcbmNsYXNzIE5vdGlmaWNhdGlvblR5cGU5IGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCA5KTtcbiAgICB9XG59XG5leHBvcnRzLk5vdGlmaWNhdGlvblR5cGU5ID0gTm90aWZpY2F0aW9uVHlwZTk7XG52YXIgTWVzc2FnZTtcbihmdW5jdGlvbiAoTWVzc2FnZSkge1xuICAgIC8qKlxuICAgICAqIFRlc3RzIGlmIHRoZSBnaXZlbiBtZXNzYWdlIGlzIGEgcmVxdWVzdCBtZXNzYWdlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNSZXF1ZXN0KG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBpcy5zdHJpbmcoY2FuZGlkYXRlLm1ldGhvZCkgJiYgKGlzLnN0cmluZyhjYW5kaWRhdGUuaWQpIHx8IGlzLm51bWJlcihjYW5kaWRhdGUuaWQpKTtcbiAgICB9XG4gICAgTWVzc2FnZS5pc1JlcXVlc3QgPSBpc1JlcXVlc3Q7XG4gICAgLyoqXG4gICAgICogVGVzdHMgaWYgdGhlIGdpdmVuIG1lc3NhZ2UgaXMgYSBub3RpZmljYXRpb24gbWVzc2FnZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTm90aWZpY2F0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBpcy5zdHJpbmcoY2FuZGlkYXRlLm1ldGhvZCkgJiYgbWVzc2FnZS5pZCA9PT0gdm9pZCAwO1xuICAgIH1cbiAgICBNZXNzYWdlLmlzTm90aWZpY2F0aW9uID0gaXNOb3RpZmljYXRpb247XG4gICAgLyoqXG4gICAgICogVGVzdHMgaWYgdGhlIGdpdmVuIG1lc3NhZ2UgaXMgYSByZXNwb25zZSBtZXNzYWdlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNSZXNwb25zZShtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgKGNhbmRpZGF0ZS5yZXN1bHQgIT09IHZvaWQgMCB8fCAhIWNhbmRpZGF0ZS5lcnJvcikgJiYgKGlzLnN0cmluZyhjYW5kaWRhdGUuaWQpIHx8IGlzLm51bWJlcihjYW5kaWRhdGUuaWQpIHx8IGNhbmRpZGF0ZS5pZCA9PT0gbnVsbCk7XG4gICAgfVxuICAgIE1lc3NhZ2UuaXNSZXNwb25zZSA9IGlzUmVzcG9uc2U7XG59KShNZXNzYWdlID0gZXhwb3J0cy5NZXNzYWdlIHx8IChleHBvcnRzLk1lc3NhZ2UgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5sZXQgX3JhbDtcbmZ1bmN0aW9uIFJBTCgpIHtcbiAgICBpZiAoX3JhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcnVudGltZSBhYnN0cmFjdGlvbiBsYXllciBpbnN0YWxsZWRgKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yYWw7XG59XG4oZnVuY3Rpb24gKFJBTCkge1xuICAgIGZ1bmN0aW9uIGluc3RhbGwocmFsKSB7XG4gICAgICAgIGlmIChyYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBydW50aW1lIGFic3RyYWN0aW9uIGxheWVyIHByb3ZpZGVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgX3JhbCA9IHJhbDtcbiAgICB9XG4gICAgUkFMLmluc3RhbGwgPSBpbnN0YWxsO1xufSkoUkFMIHx8IChSQUwgPSB7fSkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUkFMO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlbWFwaG9yZSA9IHZvaWQgMDtcbmNvbnN0IHJhbF8xID0gcmVxdWlyZShcIi4vcmFsXCIpO1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEpIHtcbiAgICAgICAgaWYgKGNhcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FwYWNpdHkgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IDA7XG4gICAgICAgIHRoaXMuX3dhaXRpbmcgPSBbXTtcbiAgICB9XG4gICAgbG9jayh0aHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fd2FpdGluZy5wdXNoKHsgdGh1bmssIHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMucnVuTmV4dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgICB9XG4gICAgcnVuTmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhaXRpbmcubGVuZ3RoID09PSAwIHx8IHRoaXMuX2FjdGl2ZSA9PT0gdGhpcy5fY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAoMCwgcmFsXzEuZGVmYXVsdCkoKS50aW1lci5zZXRJbW1lZGlhdGUoKCkgPT4gdGhpcy5kb1J1bk5leHQoKSk7XG4gICAgfVxuICAgIGRvUnVuTmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhaXRpbmcubGVuZ3RoID09PSAwIHx8IHRoaXMuX2FjdGl2ZSA9PT0gdGhpcy5fY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy5fd2FpdGluZy5zaGlmdCgpO1xuICAgICAgICB0aGlzLl9hY3RpdmUrKztcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSA+IHRoaXMuX2NhcGFjaXR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRvIG1hbnkgdGh1bmtzIGFjdGl2ZWApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXh0LnRodW5rKCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUtLTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5OZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUtLTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5OZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUtLTtcbiAgICAgICAgICAgICAgICBuZXh0LnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bk5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmUtLTtcbiAgICAgICAgICAgIG5leHQucmVqZWN0KGVycik7XG4gICAgICAgICAgICB0aGlzLnJ1bk5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtYXBob3JlID0gU2VtYXBob3JlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneSA9IGV4cG9ydHMuU2hhcmVkQXJyYXlTZW5kZXJTdHJhdGVneSA9IHZvaWQgMDtcbmNvbnN0IGNhbmNlbGxhdGlvbl8xID0gcmVxdWlyZShcIi4vY2FuY2VsbGF0aW9uXCIpO1xudmFyIENhbmNlbGxhdGlvblN0YXRlO1xuKGZ1bmN0aW9uIChDYW5jZWxsYXRpb25TdGF0ZSkge1xuICAgIENhbmNlbGxhdGlvblN0YXRlLkNvbnRpbnVlID0gMDtcbiAgICBDYW5jZWxsYXRpb25TdGF0ZS5DYW5jZWxsZWQgPSAxO1xufSkoQ2FuY2VsbGF0aW9uU3RhdGUgfHwgKENhbmNlbGxhdGlvblN0YXRlID0ge30pKTtcbmNsYXNzIFNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGVuYWJsZUNhbmNlbGxhdGlvbihyZXF1ZXN0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmlkID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnVmZmVyID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDQpO1xuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCAwLCAxKTtcbiAgICAgICAgZGF0YVswXSA9IENhbmNlbGxhdGlvblN0YXRlLkNvbnRpbnVlO1xuICAgICAgICB0aGlzLmJ1ZmZlcnMuc2V0KHJlcXVlc3QuaWQsIGJ1ZmZlcik7XG4gICAgICAgIHJlcXVlc3QuJGNhbmNlbGxhdGlvbkRhdGEgPSBidWZmZXI7XG4gICAgfVxuICAgIGFzeW5jIHNlbmRDYW5jZWxsYXRpb24oX2Nvbm4sIGlkKSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVycy5nZXQoaWQpO1xuICAgICAgICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCAwLCAxKTtcbiAgICAgICAgQXRvbWljcy5zdG9yZShkYXRhLCAwLCBDYW5jZWxsYXRpb25TdGF0ZS5DYW5jZWxsZWQpO1xuICAgIH1cbiAgICBjbGVhbnVwKGlkKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5kZWxldGUoaWQpO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMuY2xlYXIoKTtcbiAgICB9XG59XG5leHBvcnRzLlNoYXJlZEFycmF5U2VuZGVyU3RyYXRlZ3kgPSBTaGFyZWRBcnJheVNlbmRlclN0cmF0ZWd5O1xuY2xhc3MgU2hhcmVkQXJyYXlCdWZmZXJDYW5jZWxsYXRpb25Ub2tlbiB7XG4gICAgY29uc3RydWN0b3IoYnVmZmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBJbnQzMkFycmF5KGJ1ZmZlciwgMCwgMSk7XG4gICAgfVxuICAgIGdldCBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIEF0b21pY3MubG9hZCh0aGlzLmRhdGEsIDApID09PSBDYW5jZWxsYXRpb25TdGF0ZS5DYW5jZWxsZWQ7XG4gICAgfVxuICAgIGdldCBvbkNhbmNlbGxhdGlvblJlcXVlc3RlZCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5jZWxsYXRpb24gb3ZlciBTaGFyZWRBcnJheUJ1ZmZlciBkb2Vzbid0IHN1cHBvcnQgY2FuY2VsbGF0aW9uIGV2ZW50c2ApO1xuICAgIH1cbn1cbmNsYXNzIFNoYXJlZEFycmF5QnVmZmVyQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKGJ1ZmZlcikge1xuICAgICAgICB0aGlzLnRva2VuID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyQ2FuY2VsbGF0aW9uVG9rZW4oYnVmZmVyKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgIH1cbn1cbmNsYXNzIFNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMua2luZCA9ICdyZXF1ZXN0JztcbiAgICB9XG4gICAgY3JlYXRlQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UocmVxdWVzdCkge1xuICAgICAgICBjb25zdCBidWZmZXIgPSByZXF1ZXN0LiRjYW5jZWxsYXRpb25EYXRhO1xuICAgICAgICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgY2FuY2VsbGF0aW9uXzEuQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNoYXJlZEFycmF5QnVmZmVyQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UoYnVmZmVyKTtcbiAgICB9XG59XG5leHBvcnRzLlNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneSA9IFNoYXJlZEFycmF5UmVjZWl2ZXJTdHJhdGVneTtcbiIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2Jyb3dzZXIvbWFpbicpOyIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbiA9IHZvaWQgMDtcbmNvbnN0IGJyb3dzZXJfMSA9IHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwYy9icm93c2VyXCIpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwYy9icm93c2VyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi4vY29tbW9uL2FwaVwiKSwgZXhwb3J0cyk7XG5mdW5jdGlvbiBjcmVhdGVQcm90b2NvbENvbm5lY3Rpb24ocmVhZGVyLCB3cml0ZXIsIGxvZ2dlciwgb3B0aW9ucykge1xuICAgIHJldHVybiAoMCwgYnJvd3Nlcl8xLmNyZWF0ZU1lc3NhZ2VDb25uZWN0aW9uKShyZWFkZXIsIHdyaXRlciwgbG9nZ2VyLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTFNQRXJyb3JDb2RlcyA9IGV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gdm9pZCAwO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwY1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcInZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbWVzc2FnZXNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3Byb3RvY29sXCIpLCBleHBvcnRzKTtcbnZhciBjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9jb25uZWN0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0aW9uXzEuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uOyB9IH0pO1xudmFyIExTUEVycm9yQ29kZXM7XG4oZnVuY3Rpb24gKExTUEVycm9yQ29kZXMpIHtcbiAgICAvKipcbiAgICAqIFRoaXMgaXMgdGhlIHN0YXJ0IHJhbmdlIG9mIExTUCByZXNlcnZlZCBlcnJvciBjb2Rlcy5cbiAgICAqIEl0IGRvZXNuJ3QgZGVub3RlIGEgcmVhbCBlcnJvciBjb2RlLlxuICAgICpcbiAgICAqIEBzaW5jZSAzLjE2LjBcbiAgICAqL1xuICAgIExTUEVycm9yQ29kZXMubHNwUmVzZXJ2ZWRFcnJvclJhbmdlU3RhcnQgPSAtMzI4OTk7XG4gICAgLyoqXG4gICAgICogQSByZXF1ZXN0IGZhaWxlZCBidXQgaXQgd2FzIHN5bnRhY3RpY2FsbHkgY29ycmVjdCwgZS5nIHRoZVxuICAgICAqIG1ldGhvZCBuYW1lIHdhcyBrbm93biBhbmQgdGhlIHBhcmFtZXRlcnMgd2VyZSB2YWxpZC4gVGhlIGVycm9yXG4gICAgICogbWVzc2FnZSBzaG91bGQgY29udGFpbiBodW1hbiByZWFkYWJsZSBpbmZvcm1hdGlvbiBhYm91dCB3aHlcbiAgICAgKiB0aGUgcmVxdWVzdCBmYWlsZWQuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMy4xNy4wXG4gICAgICovXG4gICAgTFNQRXJyb3JDb2Rlcy5SZXF1ZXN0RmFpbGVkID0gLTMyODAzO1xuICAgIC8qKlxuICAgICAqIFRoZSBzZXJ2ZXIgY2FuY2VsbGVkIHRoZSByZXF1ZXN0LiBUaGlzIGVycm9yIGNvZGUgc2hvdWxkXG4gICAgICogb25seSBiZSB1c2VkIGZvciByZXF1ZXN0cyB0aGF0IGV4cGxpY2l0bHkgc3VwcG9ydCBiZWluZ1xuICAgICAqIHNlcnZlciBjYW5jZWxsYWJsZS5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAzLjE3LjBcbiAgICAgKi9cbiAgICBMU1BFcnJvckNvZGVzLlNlcnZlckNhbmNlbGxlZCA9IC0zMjgwMjtcbiAgICAvKipcbiAgICAgKiBUaGUgc2VydmVyIGRldGVjdGVkIHRoYXQgdGhlIGNvbnRlbnQgb2YgYSBkb2N1bWVudCBnb3RcbiAgICAgKiBtb2RpZmllZCBvdXRzaWRlIG5vcm1hbCBjb25kaXRpb25zLiBBIHNlcnZlciBzaG91bGRcbiAgICAgKiBOT1Qgc2VuZCB0aGlzIGVycm9yIGNvZGUgaWYgaXQgZGV0ZWN0cyBhIGNvbnRlbnQgY2hhbmdlXG4gICAgICogaW4gaXQgdW5wcm9jZXNzZWQgbWVzc2FnZXMuIFRoZSByZXN1bHQgZXZlbiBjb21wdXRlZFxuICAgICAqIG9uIGFuIG9sZGVyIHN0YXRlIG1pZ2h0IHN0aWxsIGJlIHVzZWZ1bCBmb3IgdGhlIGNsaWVudC5cbiAgICAgKlxuICAgICAqIElmIGEgY2xpZW50IGRlY2lkZXMgdGhhdCBhIHJlc3VsdCBpcyBub3Qgb2YgYW55IHVzZSBhbnltb3JlXG4gICAgICogdGhlIGNsaWVudCBzaG91bGQgY2FuY2VsIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIExTUEVycm9yQ29kZXMuQ29udGVudE1vZGlmaWVkID0gLTMyODAxO1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQgaGFzIGNhbmNlbGVkIGEgcmVxdWVzdCBhbmQgYSBzZXJ2ZXIgYXMgZGV0ZWN0ZWRcbiAgICAgKiB0aGUgY2FuY2VsLlxuICAgICAqL1xuICAgIExTUEVycm9yQ29kZXMuUmVxdWVzdENhbmNlbGxlZCA9IC0zMjgwMDtcbiAgICAvKipcbiAgICAqIFRoaXMgaXMgdGhlIGVuZCByYW5nZSBvZiBMU1AgcmVzZXJ2ZWQgZXJyb3IgY29kZXMuXG4gICAgKiBJdCBkb2Vzbid0IGRlbm90ZSBhIHJlYWwgZXJyb3IgY29kZS5cbiAgICAqXG4gICAgKiBAc2luY2UgMy4xNi4wXG4gICAgKi9cbiAgICBMU1BFcnJvckNvZGVzLmxzcFJlc2VydmVkRXJyb3JSYW5nZUVuZCA9IC0zMjgwMDtcbn0pKExTUEVycm9yQ29kZXMgPSBleHBvcnRzLkxTUEVycm9yQ29kZXMgfHwgKGV4cG9ydHMuTFNQRXJyb3JDb2RlcyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gdm9pZCAwO1xuY29uc3QgdnNjb2RlX2pzb25ycGNfMSA9IHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwY1wiKTtcbmZ1bmN0aW9uIGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbihpbnB1dCwgb3V0cHV0LCBsb2dnZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodnNjb2RlX2pzb25ycGNfMS5Db25uZWN0aW9uU3RyYXRlZ3kuaXMob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgY29ubmVjdGlvblN0cmF0ZWd5OiBvcHRpb25zIH07XG4gICAgfVxuICAgIHJldHVybiAoMCwgdnNjb2RlX2pzb25ycGNfMS5jcmVhdGVNZXNzYWdlQ29ubmVjdGlvbikoaW5wdXQsIG91dHB1dCwgbG9nZ2VyLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uID0gY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZSA9IGV4cG9ydHMuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlMCA9IGV4cG9ydHMuUHJvdG9jb2xSZXF1ZXN0VHlwZSA9IGV4cG9ydHMuUHJvdG9jb2xSZXF1ZXN0VHlwZTAgPSBleHBvcnRzLlJlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLk1lc3NhZ2VEaXJlY3Rpb24gPSB2b2lkIDA7XG5jb25zdCB2c2NvZGVfanNvbnJwY18xID0gcmVxdWlyZShcInZzY29kZS1qc29ucnBjXCIpO1xudmFyIE1lc3NhZ2VEaXJlY3Rpb247XG4oZnVuY3Rpb24gKE1lc3NhZ2VEaXJlY3Rpb24pIHtcbiAgICBNZXNzYWdlRGlyZWN0aW9uW1wiY2xpZW50VG9TZXJ2ZXJcIl0gPSBcImNsaWVudFRvU2VydmVyXCI7XG4gICAgTWVzc2FnZURpcmVjdGlvbltcInNlcnZlclRvQ2xpZW50XCJdID0gXCJzZXJ2ZXJUb0NsaWVudFwiO1xuICAgIE1lc3NhZ2VEaXJlY3Rpb25bXCJib3RoXCJdID0gXCJib3RoXCI7XG59KShNZXNzYWdlRGlyZWN0aW9uID0gZXhwb3J0cy5NZXNzYWdlRGlyZWN0aW9uIHx8IChleHBvcnRzLk1lc3NhZ2VEaXJlY3Rpb24gPSB7fSkpO1xuY2xhc3MgUmVnaXN0cmF0aW9uVHlwZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVnaXN0cmF0aW9uVHlwZSA9IFJlZ2lzdHJhdGlvblR5cGU7XG5jbGFzcyBQcm90b2NvbFJlcXVlc3RUeXBlMCBleHRlbmRzIHZzY29kZV9qc29ucnBjXzEuUmVxdWVzdFR5cGUwIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3RvY29sUmVxdWVzdFR5cGUwID0gUHJvdG9jb2xSZXF1ZXN0VHlwZTA7XG5jbGFzcyBQcm90b2NvbFJlcXVlc3RUeXBlIGV4dGVuZHMgdnNjb2RlX2pzb25ycGNfMS5SZXF1ZXN0VHlwZSB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kKSB7XG4gICAgICAgIHN1cGVyKG1ldGhvZCwgdnNjb2RlX2pzb25ycGNfMS5QYXJhbWV0ZXJTdHJ1Y3R1cmVzLmJ5TmFtZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm90b2NvbFJlcXVlc3RUeXBlID0gUHJvdG9jb2xSZXF1ZXN0VHlwZTtcbmNsYXNzIFByb3RvY29sTm90aWZpY2F0aW9uVHlwZTAgZXh0ZW5kcyB2c2NvZGVfanNvbnJwY18xLk5vdGlmaWNhdGlvblR5cGUwIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZTAgPSBQcm90b2NvbE5vdGlmaWNhdGlvblR5cGUwO1xuY2xhc3MgUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlIGV4dGVuZHMgdnNjb2RlX2pzb25ycGNfMS5Ob3RpZmljYXRpb25UeXBlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QpIHtcbiAgICAgICAgc3VwZXIobWV0aG9kLCB2c2NvZGVfanNvbnJwY18xLlBhcmFtZXRlclN0cnVjdHVyZXMuYnlOYW1lKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZSA9IFByb3RvY29sTm90aWZpY2F0aW9uVHlwZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgVHlwZUZveCwgTWljcm9zb2Z0IGFuZCBvdGhlcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0ID0gZXhwb3J0cy5DYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXN1bHQgYSBgQ2FsbEhpZXJhcmNoeUl0ZW1gIGluIGEgZG9jdW1lbnQgYXQgYSBnaXZlbiBwb3NpdGlvbi5cbiAqIENhbiBiZSB1c2VkIGFzIGFuIGlucHV0IHRvIGFuIGluY29taW5nIG9yIG91dGdvaW5nIGNhbGwgaGllcmFyY2h5LlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdDtcbihmdW5jdGlvbiAoQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0KSB7XG4gICAgQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcHJlcGFyZUNhbGxIaWVyYXJjaHknO1xuICAgIENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDYWxsSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QubWV0aG9kKTtcbn0pKENhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0IHx8IChleHBvcnRzLkNhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBpbmNvbWluZyBjYWxscyBmb3IgYSBnaXZlbiBgQ2FsbEhpZXJhcmNoeUl0ZW1gLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdDtcbihmdW5jdGlvbiAoQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0KSB7XG4gICAgQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0Lm1ldGhvZCA9ICdjYWxsSGllcmFyY2h5L2luY29taW5nQ2FsbHMnO1xuICAgIENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDYWxsSGllcmFyY2h5SW5jb21pbmdDYWxsc1JlcXVlc3QubWV0aG9kKTtcbn0pKENhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0IHx8IChleHBvcnRzLkNhbGxIaWVyYXJjaHlJbmNvbWluZ0NhbGxzUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBvdXRnb2luZyBjYWxscyBmb3IgYSBnaXZlbiBgQ2FsbEhpZXJhcmNoeUl0ZW1gLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdDtcbihmdW5jdGlvbiAoQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0KSB7XG4gICAgQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0Lm1ldGhvZCA9ICdjYWxsSGllcmFyY2h5L291dGdvaW5nQ2FsbHMnO1xuICAgIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDYWxsSGllcmFyY2h5T3V0Z29pbmdDYWxsc1JlcXVlc3QubWV0aG9kKTtcbn0pKENhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0IHx8IChleHBvcnRzLkNhbGxIaWVyYXJjaHlPdXRnb2luZ0NhbGxzUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudENvbG9yUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIGxpc3QgYWxsIGNvbG9yIHN5bWJvbHMgZm91bmQgaW4gYSBnaXZlbiB0ZXh0IGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgRG9jdW1lbnRDb2xvclBhcmFtc30gdGhlXG4gKiByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBDb2xvckluZm9ybWF0aW9uIENvbG9ySW5mb3JtYXRpb25bXX0gb3IgYSBUaGVuYWJsZVxuICogdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgRG9jdW1lbnRDb2xvclJlcXVlc3Q7XG4oZnVuY3Rpb24gKERvY3VtZW50Q29sb3JSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnRDb2xvclJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudENvbG9yJztcbiAgICBEb2N1bWVudENvbG9yUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERvY3VtZW50Q29sb3JSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50Q29sb3JSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudENvbG9yUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRDb2xvclJlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRDb2xvclJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gbGlzdCBhbGwgcHJlc2VudGF0aW9uIGZvciBhIGNvbG9yLiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgQ29sb3JQcmVzZW50YXRpb25QYXJhbXN9IHRoZVxuICogcmVzcG9uc2UgaXMgb2YgdHlwZSB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbiBDb2xvckluZm9ybWF0aW9uW119IG9yIGEgVGhlbmFibGVcbiAqIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0KSB7XG4gICAgQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvY29sb3JQcmVzZW50YXRpb24nO1xuICAgIENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb2xvclByZXNlbnRhdGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKENvbG9yUHJlc2VudGF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29uZmlndXJhdGlvblJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vLy0tLS0gR2V0IENvbmZpZ3VyYXRpb24gcmVxdWVzdCAtLS0tXG4vKipcbiAqIFRoZSAnd29ya3NwYWNlL2NvbmZpZ3VyYXRpb24nIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byBmZXRjaCBhIGNlcnRhaW5cbiAqIGNvbmZpZ3VyYXRpb24gc2V0dGluZy5cbiAqXG4gKiBUaGlzIHB1bGwgbW9kZWwgcmVwbGFjZXMgdGhlIG9sZCBwdXNoIG1vZGVsIHdlcmUgdGhlIGNsaWVudCBzaWduYWxlZCBjb25maWd1cmF0aW9uIGNoYW5nZSB2aWEgYW5cbiAqIGV2ZW50LiBJZiB0aGUgc2VydmVyIHN0aWxsIG5lZWRzIHRvIHJlYWN0IHRvIGNvbmZpZ3VyYXRpb24gY2hhbmdlcyAoc2luY2UgdGhlIHNlcnZlciBjYWNoZXMgdGhlXG4gKiByZXN1bHQgb2YgYHdvcmtzcGFjZS9jb25maWd1cmF0aW9uYCByZXF1ZXN0cykgdGhlIHNlcnZlciBzaG91bGQgcmVnaXN0ZXIgZm9yIGFuIGVtcHR5IGNvbmZpZ3VyYXRpb25cbiAqIGNoYW5nZSBldmVudCBhbmQgZW1wdHkgdGhlIGNhY2hlIGlmIHN1Y2ggYW4gZXZlbnQgaXMgcmVjZWl2ZWQuXG4gKi9cbnZhciBDb25maWd1cmF0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29uZmlndXJhdGlvblJlcXVlc3QpIHtcbiAgICBDb25maWd1cmF0aW9uUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL2NvbmZpZ3VyYXRpb24nO1xuICAgIENvbmZpZ3VyYXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgQ29uZmlndXJhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29uZmlndXJhdGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKENvbmZpZ3VyYXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Db25maWd1cmF0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5Db25maWd1cmF0aW9uUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVjbGFyYXRpb25SZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLy8gQHRzLWlnbm9yZTogdG8gYXZvaWQgaW5saW5pbmcgTG9jYXRpb25MaW5rIGFzIGR5bmFtaWMgaW1wb3J0XG5sZXQgX19ub0R5bmFtaWNJbXBvcnQ7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSB0eXBlIGRlZmluaXRpb24gbG9jYXRpb25zIG9mIGEgc3ltYm9sIGF0IGEgZ2l2ZW4gdGV4dFxuICogZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mIHR5cGUgW1RleHREb2N1bWVudFBvc2l0aW9uUGFyYW1zXVxuICogKCNUZXh0RG9jdW1lbnRQb3NpdGlvblBhcmFtcykgdGhlIHJlc3BvbnNlIGlzIG9mIHR5cGUge0BsaW5rIERlY2xhcmF0aW9ufVxuICogb3IgYSB0eXBlZCBhcnJheSBvZiB7QGxpbmsgRGVjbGFyYXRpb25MaW5rfSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXNcbiAqIHRvIHN1Y2guXG4gKi9cbnZhciBEZWNsYXJhdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKERlY2xhcmF0aW9uUmVxdWVzdCkge1xuICAgIERlY2xhcmF0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2RlY2xhcmF0aW9uJztcbiAgICBEZWNsYXJhdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEZWNsYXJhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRGVjbGFyYXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShEZWNsYXJhdGlvblJlcXVlc3QgPSBleHBvcnRzLkRlY2xhcmF0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5EZWNsYXJhdGlvblJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpYWdub3N0aWNSZWZyZXNoUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQgPSBleHBvcnRzLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhID0gdm9pZCAwO1xuY29uc3QgdnNjb2RlX2pzb25ycGNfMSA9IHJlcXVpcmUoXCJ2c2NvZGUtanNvbnJwY1wiKTtcbmNvbnN0IElzID0gcmVxdWlyZShcIi4vdXRpbHMvaXNcIik7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIERpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhO1xuKGZ1bmN0aW9uIChEaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YSkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLmJvb2xlYW4oY2FuZGlkYXRlLnJldHJpZ2dlclJlcXVlc3QpO1xuICAgIH1cbiAgICBEaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YS5pcyA9IGlzO1xufSkoRGlhZ25vc3RpY1NlcnZlckNhbmNlbGxhdGlvbkRhdGEgPSBleHBvcnRzLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhIHx8IChleHBvcnRzLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhID0ge30pKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IGRpYWdub3N0aWMgcmVwb3J0IGtpbmRzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIERvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQ7XG4oZnVuY3Rpb24gKERvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBIGRpYWdub3N0aWMgcmVwb3J0IHdpdGggYSBmdWxsXG4gICAgICogc2V0IG9mIHByb2JsZW1zLlxuICAgICAqL1xuICAgIERvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQuRnVsbCA9ICdmdWxsJztcbiAgICAvKipcbiAgICAgKiBBIHJlcG9ydCBpbmRpY2F0aW5nIHRoYXQgdGhlIGxhc3RcbiAgICAgKiByZXR1cm5lZCByZXBvcnQgaXMgc3RpbGwgYWNjdXJhdGUuXG4gICAgICovXG4gICAgRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZC5VbmNoYW5nZWQgPSAndW5jaGFuZ2VkJztcbn0pKERvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQgfHwgKGV4cG9ydHMuRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBkb2N1bWVudCBkaWFnbm9zdGljIHJlcXVlc3QgZGVmaW5pdGlvbi5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2RpYWdub3N0aWMnO1xuICAgIERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QubWV0aG9kKTtcbiAgICBEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0LnBhcnRpYWxSZXN1bHQgPSBuZXcgdnNjb2RlX2pzb25ycGNfMS5Qcm9ncmVzc1R5cGUoKTtcbn0pKERvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSB3b3Jrc3BhY2UgZGlhZ25vc3RpYyByZXF1ZXN0IGRlZmluaXRpb24uXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3Q7XG4oZnVuY3Rpb24gKFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0KSB7XG4gICAgV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWFnbm9zdGljJztcbiAgICBXb3Jrc3BhY2VEaWFnbm9zdGljUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0Lm1ldGhvZCk7XG4gICAgV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QucGFydGlhbFJlc3VsdCA9IG5ldyB2c2NvZGVfanNvbnJwY18xLlByb2dyZXNzVHlwZSgpO1xufSkoV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0IHx8IChleHBvcnRzLldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGRpYWdub3N0aWMgcmVmcmVzaCByZXF1ZXN0IGRlZmluaXRpb24uXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgRGlhZ25vc3RpY1JlZnJlc2hSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QpIHtcbiAgICBEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QubWV0aG9kID0gYHdvcmtzcGFjZS9kaWFnbm9zdGljL3JlZnJlc2hgO1xuICAgIERpYWdub3N0aWNSZWZyZXNoUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIERpYWdub3N0aWNSZWZyZXNoUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZTAoRGlhZ25vc3RpY1JlZnJlc2hSZXF1ZXN0Lm1ldGhvZCk7XG59KShEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLkRpYWdub3N0aWNSZWZyZXNoUmVxdWVzdCB8fCAoZXhwb3J0cy5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldpbGxEZWxldGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCA9IGV4cG9ydHMuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLldpbGxDcmVhdGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSBwYXR0ZXJuIGtpbmQgZGVzY3JpYmluZyBpZiBhIGdsb2IgcGF0dGVybiBtYXRjaGVzIGEgZmlsZSBhIGZvbGRlciBvclxuICogYm90aC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBGaWxlT3BlcmF0aW9uUGF0dGVybktpbmQ7XG4oZnVuY3Rpb24gKEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXR0ZXJuIG1hdGNoZXMgYSBmaWxlIG9ubHkuXG4gICAgICovXG4gICAgRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kLmZpbGUgPSAnZmlsZSc7XG4gICAgLyoqXG4gICAgICogVGhlIHBhdHRlcm4gbWF0Y2hlcyBhIGZvbGRlciBvbmx5LlxuICAgICAqL1xuICAgIEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZC5mb2xkZXIgPSAnZm9sZGVyJztcbn0pKEZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCA9IGV4cG9ydHMuRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kIHx8IChleHBvcnRzLkZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSB3aWxsIGNyZWF0ZSBmaWxlcyByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgYmVmb3JlIGZpbGVzIGFyZSBhY3R1YWxseVxuICogY3JlYXRlZCBhcyBsb25nIGFzIHRoZSBjcmVhdGlvbiBpcyB0cmlnZ2VyZWQgZnJvbSB3aXRoaW4gdGhlIGNsaWVudC5cbiAqXG4gKiBUaGUgcmVxdWVzdCBjYW4gcmV0dXJuIGEgYFdvcmtzcGFjZUVkaXRgIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB3b3Jrc3BhY2UgYmVmb3JlIHRoZVxuICogZmlsZXMgYXJlIGNyZWF0ZWQuIEhlbmNlIHRoZSBgV29ya3NwYWNlRWRpdGAgY2FuIG5vdCBtYW5pcHVsYXRlIHRoZSBjb250ZW50IG9mIHRoZSBmaWxlXG4gKiB0byBiZSBjcmVhdGVkLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIFdpbGxDcmVhdGVGaWxlc1JlcXVlc3Q7XG4oZnVuY3Rpb24gKFdpbGxDcmVhdGVGaWxlc1JlcXVlc3QpIHtcbiAgICBXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0Lm1ldGhvZCA9ICd3b3Jrc3BhY2Uvd2lsbENyZWF0ZUZpbGVzJztcbiAgICBXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgV2lsbENyZWF0ZUZpbGVzUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0Lm1ldGhvZCk7XG59KShXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0ID0gZXhwb3J0cy5XaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0IHx8IChleHBvcnRzLldpbGxDcmVhdGVGaWxlc1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlkIGNyZWF0ZSBmaWxlcyBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB3aGVuXG4gKiBmaWxlcyB3ZXJlIGNyZWF0ZWQgZnJvbSB3aXRoaW4gdGhlIGNsaWVudC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24pIHtcbiAgICBEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QgPSAnd29ya3NwYWNlL2RpZENyZWF0ZUZpbGVzJztcbiAgICBEaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZENyZWF0ZUZpbGVzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZENyZWF0ZUZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRDcmVhdGVGaWxlc05vdGlmaWNhdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSB3aWxsIHJlbmFtZSBmaWxlcyByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgYmVmb3JlIGZpbGVzIGFyZSBhY3R1YWxseVxuICogcmVuYW1lZCBhcyBsb25nIGFzIHRoZSByZW5hbWUgaXMgdHJpZ2dlcmVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgV2lsbFJlbmFtZUZpbGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCkge1xuICAgIFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS93aWxsUmVuYW1lRmlsZXMnO1xuICAgIFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsUmVuYW1lRmlsZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFdpbGxSZW5hbWVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLldpbGxSZW5hbWVGaWxlc1JlcXVlc3QgfHwgKGV4cG9ydHMuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBkaWQgcmVuYW1lIGZpbGVzIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHdoZW5cbiAqIGZpbGVzIHdlcmUgcmVuYW1lZCBmcm9tIHdpdGhpbiB0aGUgY2xpZW50LlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIERpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbikge1xuICAgIERpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uLm1ldGhvZCA9ICd3b3Jrc3BhY2UvZGlkUmVuYW1lRmlsZXMnO1xuICAgIERpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkUmVuYW1lRmlsZXNOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkUmVuYW1lRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZFJlbmFtZUZpbGVzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIHdpbGwgZGVsZXRlIGZpbGVzIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciBiZWZvcmUgZmlsZXMgYXJlIGFjdHVhbGx5XG4gKiBkZWxldGVkIGFzIGxvbmcgYXMgdGhlIGRlbGV0aW9uIGlzIHRyaWdnZXJlZCBmcm9tIHdpdGhpbiB0aGUgY2xpZW50LlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWREZWxldGVGaWxlc05vdGlmaWNhdGlvbikge1xuICAgIERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uLm1ldGhvZCA9ICd3b3Jrc3BhY2UvZGlkRGVsZXRlRmlsZXMnO1xuICAgIERpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWREZWxldGVGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkRGVsZXRlRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRpZCBkZWxldGUgZmlsZXMgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgd2hlblxuICogZmlsZXMgd2VyZSBkZWxldGVkIGZyb20gd2l0aGluIHRoZSBjbGllbnQuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgV2lsbERlbGV0ZUZpbGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoV2lsbERlbGV0ZUZpbGVzUmVxdWVzdCkge1xuICAgIFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWV0aG9kID0gJ3dvcmtzcGFjZS93aWxsRGVsZXRlRmlsZXMnO1xuICAgIFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsRGVsZXRlRmlsZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFdpbGxEZWxldGVGaWxlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFdpbGxEZWxldGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLldpbGxEZWxldGVGaWxlc1JlcXVlc3QgfHwgKGV4cG9ydHMuV2lsbERlbGV0ZUZpbGVzUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Gb2xkaW5nUmFuZ2VSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBmb2xkaW5nIHJhbmdlcyBpbiBhIGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgRm9sZGluZ1JhbmdlUGFyYW1zfSwgdGhlXG4gKiByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBGb2xkaW5nUmFuZ2VMaXN0fSBvciBhIFRoZW5hYmxlXG4gKiB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBGb2xkaW5nUmFuZ2VSZXF1ZXN0O1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2VSZXF1ZXN0KSB7XG4gICAgRm9sZGluZ1JhbmdlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2ZvbGRpbmdSYW5nZSc7XG4gICAgRm9sZGluZ1JhbmdlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIEZvbGRpbmdSYW5nZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRm9sZGluZ1JhbmdlUmVxdWVzdC5tZXRob2QpO1xufSkoRm9sZGluZ1JhbmdlUmVxdWVzdCA9IGV4cG9ydHMuRm9sZGluZ1JhbmdlUmVxdWVzdCB8fCAoZXhwb3J0cy5Gb2xkaW5nUmFuZ2VSZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbXBsZW1lbnRhdGlvblJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vLyBAdHMtaWdub3JlOiB0byBhdm9pZCBpbmxpbmluZyBMb2NhdGlvbkxpbmsgYXMgZHluYW1pYyBpbXBvcnRcbmxldCBfX25vRHluYW1pY0ltcG9ydDtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgdGhlIGltcGxlbWVudGF0aW9uIGxvY2F0aW9ucyBvZiBhIHN5bWJvbCBhdCBhIGdpdmVuIHRleHRcbiAqIGRvY3VtZW50IHBvc2l0aW9uLiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZiB0eXBlIFtUZXh0RG9jdW1lbnRQb3NpdGlvblBhcmFtc11cbiAqICgjVGV4dERvY3VtZW50UG9zaXRpb25QYXJhbXMpIHRoZSByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBEZWZpbml0aW9ufSBvciBhXG4gKiBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBJbXBsZW1lbnRhdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKEltcGxlbWVudGF0aW9uUmVxdWVzdCkge1xuICAgIEltcGxlbWVudGF0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2ltcGxlbWVudGF0aW9uJztcbiAgICBJbXBsZW1lbnRhdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbXBsZW1lbnRhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSW1wbGVtZW50YXRpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShJbXBsZW1lbnRhdGlvblJlcXVlc3QgPSBleHBvcnRzLkltcGxlbWVudGF0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5JbXBsZW1lbnRhdGlvblJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLklubGF5SGludFJlc29sdmVSZXF1ZXN0ID0gZXhwb3J0cy5JbmxheUhpbnRSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBpbmxheSBoaW50cyBpbiBhIGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzIHBhcmFtZXRlciBpcyBvZlxuICogdHlwZSB7QGxpbmsgSW5sYXlIaW50c1BhcmFtc30sIHRoZSByZXNwb25zZSBpcyBvZiB0eXBlXG4gKiB7QGxpbmsgSW5sYXlIaW50IElubGF5SGludFtdfSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBJbmxheUhpbnRSZXF1ZXN0O1xuKGZ1bmN0aW9uIChJbmxheUhpbnRSZXF1ZXN0KSB7XG4gICAgSW5sYXlIaW50UmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2lubGF5SGludCc7XG4gICAgSW5sYXlIaW50UmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIElubGF5SGludFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSW5sYXlIaW50UmVxdWVzdC5tZXRob2QpO1xufSkoSW5sYXlIaW50UmVxdWVzdCA9IGV4cG9ydHMuSW5sYXlIaW50UmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxheUhpbnRSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZvciBhbiBpbmxheSBoaW50LlxuICogVGhlIHJlcXVlc3QncyBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgSW5sYXlIaW50fSwgdGhlIHJlc3BvbnNlIGlzXG4gKiBvZiB0eXBlIHtAbGluayBJbmxheUhpbnR9IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIElubGF5SGludFJlc29sdmVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChJbmxheUhpbnRSZXNvbHZlUmVxdWVzdCkge1xuICAgIElubGF5SGludFJlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICdpbmxheUhpbnQvcmVzb2x2ZSc7XG4gICAgSW5sYXlIaW50UmVzb2x2ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbmxheUhpbnRSZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShJbmxheUhpbnRSZXNvbHZlUmVxdWVzdC5tZXRob2QpO1xufSkoSW5sYXlIaW50UmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLklubGF5SGludFJlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLklubGF5SGludFJlc29sdmVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3Q7XG4oZnVuY3Rpb24gKElubGF5SGludFJlZnJlc2hSZXF1ZXN0KSB7XG4gICAgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWV0aG9kID0gYHdvcmtzcGFjZS9pbmxheUhpbnQvcmVmcmVzaGA7XG4gICAgSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBJbmxheUhpbnRSZWZyZXNoUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZTAoSW5sYXlIaW50UmVmcmVzaFJlcXVlc3QubWV0aG9kKTtcbn0pKElubGF5SGludFJlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5JbmxheUhpbnRSZWZyZXNoUmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxheUhpbnRSZWZyZXNoUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5JbmxpbmVWYWx1ZVJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGlubGluZSB2YWx1ZXMgaW4gYSBkb2N1bWVudC4gVGhlIHJlcXVlc3QncyBwYXJhbWV0ZXIgaXMgb2ZcbiAqIHR5cGUge0BsaW5rIElubGluZVZhbHVlUGFyYW1zfSwgdGhlIHJlc3BvbnNlIGlzIG9mIHR5cGVcbiAqIHtAbGluayBJbmxpbmVWYWx1ZSBJbmxpbmVWYWx1ZVtdfSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBJbmxpbmVWYWx1ZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKElubGluZVZhbHVlUmVxdWVzdCkge1xuICAgIElubGluZVZhbHVlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2lubGluZVZhbHVlJztcbiAgICBJbmxpbmVWYWx1ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbmxpbmVWYWx1ZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSW5saW5lVmFsdWVSZXF1ZXN0Lm1ldGhvZCk7XG59KShJbmxpbmVWYWx1ZVJlcXVlc3QgPSBleHBvcnRzLklubGluZVZhbHVlUmVxdWVzdCB8fCAoZXhwb3J0cy5JbmxpbmVWYWx1ZVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0O1xuKGZ1bmN0aW9uIChJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0KSB7XG4gICAgSW5saW5lVmFsdWVSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL2lubGluZVZhbHVlL3JlZnJlc2hgO1xuICAgIElubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0Lm1ldGhvZCk7XG59KShJbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5JbmxpbmVWYWx1ZVJlZnJlc2hSZXF1ZXN0IHx8IChleHBvcnRzLklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldvcmtzcGFjZVN5bWJvbFJlcXVlc3QgPSBleHBvcnRzLkNvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdCA9IGV4cG9ydHMuQ29kZUFjdGlvblJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50U3ltYm9sUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0ID0gZXhwb3J0cy5SZWZlcmVuY2VzUmVxdWVzdCA9IGV4cG9ydHMuRGVmaW5pdGlvblJlcXVlc3QgPSBleHBvcnRzLlNpZ25hdHVyZUhlbHBSZXF1ZXN0ID0gZXhwb3J0cy5TaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQgPSBleHBvcnRzLkhvdmVyUmVxdWVzdCA9IGV4cG9ydHMuQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0ID0gZXhwb3J0cy5Db21wbGV0aW9uUmVxdWVzdCA9IGV4cG9ydHMuQ29tcGxldGlvblRyaWdnZXJLaW5kID0gZXhwb3J0cy5QdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24gPSBleHBvcnRzLldhdGNoS2luZCA9IGV4cG9ydHMuUmVsYXRpdmVQYXR0ZXJuID0gZXhwb3J0cy5GaWxlQ2hhbmdlVHlwZSA9IGV4cG9ydHMuRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5XaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3QgPSBleHBvcnRzLldpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRTYXZlUmVhc29uID0gZXhwb3J0cy5EaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQgPSBleHBvcnRzLkRpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLlRleHREb2N1bWVudFN5bmNLaW5kID0gZXhwb3J0cy5UZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTG9nTWVzc2FnZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuU2hvd01lc3NhZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TaG93TWVzc2FnZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTWVzc2FnZVR5cGUgPSBleHBvcnRzLkRpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24gPSBleHBvcnRzLkV4aXROb3RpZmljYXRpb24gPSBleHBvcnRzLlNodXRkb3duUmVxdWVzdCA9IGV4cG9ydHMuSW5pdGlhbGl6ZWROb3RpZmljYXRpb24gPSBleHBvcnRzLkluaXRpYWxpemVFcnJvckNvZGVzID0gZXhwb3J0cy5Jbml0aWFsaXplUmVxdWVzdCA9IGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgPSBleHBvcnRzLlRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMgPSBleHBvcnRzLlN0YXRpY1JlZ2lzdHJhdGlvbk9wdGlvbnMgPSBleHBvcnRzLlBvc2l0aW9uRW5jb2RpbmdLaW5kID0gZXhwb3J0cy5GYWlsdXJlSGFuZGxpbmdLaW5kID0gZXhwb3J0cy5SZXNvdXJjZU9wZXJhdGlvbktpbmQgPSBleHBvcnRzLlVucmVnaXN0cmF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuUmVnaXN0cmF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRTZWxlY3RvciA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyID0gZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50RmlsdGVyID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRGaWx0ZXIgPSB2b2lkIDA7XG5leHBvcnRzLlR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QgPSBleHBvcnRzLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IGV4cG9ydHMuTW9uaWtlclJlcXVlc3QgPSBleHBvcnRzLk1vbmlrZXJLaW5kID0gZXhwb3J0cy5VbmlxdWVuZXNzTGV2ZWwgPSBleHBvcnRzLldpbGxEZWxldGVGaWxlc1JlcXVlc3QgPSBleHBvcnRzLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5XaWxsUmVuYW1lRmlsZXNSZXF1ZXN0ID0gZXhwb3J0cy5EaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV2lsbENyZWF0ZUZpbGVzUmVxdWVzdCA9IGV4cG9ydHMuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb24gPSBleHBvcnRzLkZpbGVPcGVyYXRpb25QYXR0ZXJuS2luZCA9IGV4cG9ydHMuTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCA9IGV4cG9ydHMuU2hvd0RvY3VtZW50UmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmVxdWVzdCA9IGV4cG9ydHMuVG9rZW5Gb3JtYXQgPSBleHBvcnRzLkNhbGxIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IGV4cG9ydHMuQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0ID0gZXhwb3J0cy5DYWxsSGllcmFyY2h5SW5jb21pbmdDYWxsc1JlcXVlc3QgPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0ID0gZXhwb3J0cy5Xb3JrRG9uZVByb2dyZXNzID0gZXhwb3J0cy5TZWxlY3Rpb25SYW5nZVJlcXVlc3QgPSBleHBvcnRzLkRlY2xhcmF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuRm9sZGluZ1JhbmdlUmVxdWVzdCA9IGV4cG9ydHMuQ29sb3JQcmVzZW50YXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudENvbG9yUmVxdWVzdCA9IGV4cG9ydHMuQ29uZmlndXJhdGlvblJlcXVlc3QgPSBleHBvcnRzLkRpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24gPSBleHBvcnRzLldvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0ID0gZXhwb3J0cy5UeXBlRGVmaW5pdGlvblJlcXVlc3QgPSBleHBvcnRzLkltcGxlbWVudGF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdCA9IGV4cG9ydHMuRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0ID0gZXhwb3J0cy5QcmVwYXJlUmVuYW1lUmVxdWVzdCA9IGV4cG9ydHMuUmVuYW1lUmVxdWVzdCA9IGV4cG9ydHMuUHJlcGFyZVN1cHBvcnREZWZhdWx0QmVoYXZpb3IgPSBleHBvcnRzLkRvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50TGlua1JlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QgPSB2b2lkIDA7XG5leHBvcnRzLkRpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkU2F2ZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLk5vdGVib29rQ2VsbEFycmF5Q2hhbmdlID0gZXhwb3J0cy5EaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlID0gZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50ID0gZXhwb3J0cy5Ob3RlYm9va0NlbGwgPSBleHBvcnRzLkV4ZWN1dGlvblN1bW1hcnkgPSBleHBvcnRzLk5vdGVib29rQ2VsbEtpbmQgPSBleHBvcnRzLkRpYWdub3N0aWNSZWZyZXNoUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQgPSBleHBvcnRzLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhID0gZXhwb3J0cy5JbmxheUhpbnRSZWZyZXNoUmVxdWVzdCA9IGV4cG9ydHMuSW5sYXlIaW50UmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLklubGF5SGludFJlcXVlc3QgPSBleHBvcnRzLklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLklubGluZVZhbHVlUmVxdWVzdCA9IGV4cG9ydHMuVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuY29uc3QgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEgPSByZXF1aXJlKFwidnNjb2RlLWxhbmd1YWdlc2VydmVyLXR5cGVzXCIpO1xuY29uc3QgSXMgPSByZXF1aXJlKFwiLi91dGlscy9pc1wiKTtcbmNvbnN0IHByb3RvY29sX2ltcGxlbWVudGF0aW9uXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5pbXBsZW1lbnRhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkltcGxlbWVudGF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfaW1wbGVtZW50YXRpb25fMS5JbXBsZW1lbnRhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF90eXBlRGVmaW5pdGlvbl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wudHlwZURlZmluaXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUeXBlRGVmaW5pdGlvblJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3R5cGVEZWZpbml0aW9uXzEuVHlwZURlZmluaXRpb25SZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfd29ya3NwYWNlRm9sZGVyXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC53b3Jrc3BhY2VGb2xkZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfd29ya3NwYWNlRm9sZGVyXzEuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF93b3Jrc3BhY2VGb2xkZXJfMS5EaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uOyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfY29uZmlndXJhdGlvbl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuY29uZmlndXJhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbmZpZ3VyYXRpb25SZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jb25maWd1cmF0aW9uXzEuQ29uZmlndXJhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9jb2xvclByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5jb2xvclByb3ZpZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRG9jdW1lbnRDb2xvclJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2NvbG9yUHJvdmlkZXJfMS5Eb2N1bWVudENvbG9yUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfY29sb3JQcm92aWRlcl8xLkNvbG9yUHJlc2VudGF0aW9uUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2ZvbGRpbmdSYW5nZV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuZm9sZGluZ1JhbmdlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRm9sZGluZ1JhbmdlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZm9sZGluZ1JhbmdlXzEuRm9sZGluZ1JhbmdlUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2RlY2xhcmF0aW9uXzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5kZWNsYXJhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRlY2xhcmF0aW9uUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGVjbGFyYXRpb25fMS5EZWNsYXJhdGlvblJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9zZWxlY3Rpb25SYW5nZV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuc2VsZWN0aW9uUmFuZ2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZWxlY3Rpb25SYW5nZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbGVjdGlvblJhbmdlXzEuU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfcHJvZ3Jlc3NfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnByb2dyZXNzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV29ya0RvbmVQcm9ncmVzc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfcHJvZ3Jlc3NfMS5Xb3JrRG9uZVByb2dyZXNzOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3Byb2dyZXNzXzEuV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9wcm9ncmVzc18xLldvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb247IH0gfSk7XG5jb25zdCBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEgPSByZXF1aXJlKFwiLi9wcm90b2NvbC5jYWxsSGllcmFyY2h5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeUluY29taW5nQ2FsbHNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeU91dGdvaW5nQ2FsbHNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9jYWxsSGllcmFyY2h5XzEuQ2FsbEhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnNlbWFudGljVG9rZW5zXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVG9rZW5Gb3JtYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuVG9rZW5Gb3JtYXQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZW1hbnRpY1Rva2Vuc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMS5TZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3NlbWFudGljVG9rZW5zXzEuU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfc2VtYW50aWNUb2tlbnNfMS5TZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGU7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9zaG93RG9jdW1lbnRfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLnNob3dEb2N1bWVudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNob3dEb2N1bWVudFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3Nob3dEb2N1bWVudF8xLlNob3dEb2N1bWVudFJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9saW5rZWRFZGl0aW5nUmFuZ2VfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmxpbmtlZEVkaXRpbmdSYW5nZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2xpbmtlZEVkaXRpbmdSYW5nZV8xLkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuZmlsZU9wZXJhdGlvbnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGaWxlT3BlcmF0aW9uUGF0dGVybktpbmRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuRmlsZU9wZXJhdGlvblBhdHRlcm5LaW5kOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuRGlkQ3JlYXRlRmlsZXNOb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJXaWxsQ3JlYXRlRmlsZXNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xLldpbGxDcmVhdGVGaWxlc1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZmlsZU9wZXJhdGlvbnNfMS5EaWRSZW5hbWVGaWxlc05vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldpbGxSZW5hbWVGaWxlc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2ZpbGVPcGVyYXRpb25zXzEuV2lsbFJlbmFtZUZpbGVzUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9maWxlT3BlcmF0aW9uc18xLkRpZERlbGV0ZUZpbGVzTm90aWZpY2F0aW9uOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2lsbERlbGV0ZUZpbGVzUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZmlsZU9wZXJhdGlvbnNfMS5XaWxsRGVsZXRlRmlsZXNSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfbW9uaWtlcl8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wubW9uaWtlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlVuaXF1ZW5lc3NMZXZlbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbW9uaWtlcl8xLlVuaXF1ZW5lc3NMZXZlbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1vbmlrZXJLaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9tb25pa2VyXzEuTW9uaWtlcktpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNb25pa2VyUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbW9uaWtlcl8xLk1vbmlrZXJSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfdHlwZUhpZXJhcmNoeV8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wudHlwZUhpZXJhcmNoeVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfdHlwZUhpZXJhcmNoeV8xLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX3R5cGVIaWVyYXJjaHlfMS5UeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF90eXBlSGllcmFyY2h5XzEuVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0OyB9IH0pO1xuY29uc3QgcHJvdG9jb2xfaW5saW5lVmFsdWVfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmlubGluZVZhbHVlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5saW5lVmFsdWVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxpbmVWYWx1ZV8xLklubGluZVZhbHVlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGluZVZhbHVlUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2lubGluZVZhbHVlXzEuSW5saW5lVmFsdWVSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2lubGF5SGludF8xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wuaW5sYXlIaW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5sYXlIaW50UmVxdWVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfaW5sYXlIaW50XzEuSW5sYXlIaW50UmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGF5SGludFJlc29sdmVSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxheUhpbnRfMS5JbmxheUhpbnRSZXNvbHZlUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIklubGF5SGludFJlZnJlc2hSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9pbmxheUhpbnRfMS5JbmxheUhpbnRSZWZyZXNoUmVxdWVzdDsgfSB9KTtcbmNvbnN0IHByb3RvY29sX2RpYWdub3N0aWNfMSA9IHJlcXVpcmUoXCIuL3Byb3RvY29sLmRpYWdub3N0aWNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWFnbm9zdGljU2VydmVyQ2FuY2VsbGF0aW9uRGF0YVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGlhZ25vc3RpY18xLkRpYWdub3N0aWNTZXJ2ZXJDYW5jZWxsYXRpb25EYXRhOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRG9jdW1lbnREaWFnbm9zdGljUmVwb3J0S2luZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfZGlhZ25vc3RpY18xLkRvY3VtZW50RGlhZ25vc3RpY1JlcG9ydEtpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudERpYWdub3N0aWNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9kaWFnbm9zdGljXzEuRG9jdW1lbnREaWFnbm9zdGljUmVxdWVzdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldvcmtzcGFjZURpYWdub3N0aWNSZXF1ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9kaWFnbm9zdGljXzEuV29ya3NwYWNlRGlhZ25vc3RpY1JlcXVlc3Q7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWFnbm9zdGljUmVmcmVzaFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX2RpYWdub3N0aWNfMS5EaWFnbm9zdGljUmVmcmVzaFJlcXVlc3Q7IH0gfSk7XG5jb25zdCBwcm90b2NvbF9ub3RlYm9va18xID0gcmVxdWlyZShcIi4vcHJvdG9jb2wubm90ZWJvb2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RlYm9va0NlbGxLaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLk5vdGVib29rQ2VsbEtpbmQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFeGVjdXRpb25TdW1tYXJ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkV4ZWN1dGlvblN1bW1hcnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RlYm9va0NlbGxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX25vdGVib29rXzEuTm90ZWJvb2tDZWxsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tEb2N1bWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5Ob3RlYm9va0RvY3VtZW50OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLk5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3RvY29sX25vdGVib29rXzEuTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2U7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm90b2NvbF9ub3RlYm9va18xLkRpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5EaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdG9jb2xfbm90ZWJvb2tfMS5EaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247IH0gfSk7XG4vLyBAdHMtaWdub3JlOiB0byBhdm9pZCBpbmxpbmluZyBMb2NhdGlvbkxpbmsgYXMgZHluYW1pYyBpbXBvcnRcbmxldCBfX25vRHluYW1pY0ltcG9ydDtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudEZpbHRlciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBUZXh0RG9jdW1lbnRGaWx0ZXJ9IGxpdGVyYWxzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFRleHREb2N1bWVudEZpbHRlcjtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50RmlsdGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnNjaGVtZSkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5wYXR0ZXJuKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RmlsdGVyLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRGaWx0ZXIgPSBleHBvcnRzLlRleHREb2N1bWVudEZpbHRlciB8fCAoZXhwb3J0cy5UZXh0RG9jdW1lbnRGaWx0ZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgTm90ZWJvb2tEb2N1bWVudEZpbHRlciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBOb3RlYm9va0RvY3VtZW50RmlsdGVyfSBsaXRlcmFscy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBOb3RlYm9va0RvY3VtZW50RmlsdGVyO1xuKGZ1bmN0aW9uIChOb3RlYm9va0RvY3VtZW50RmlsdGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUubm90ZWJvb2tUeXBlKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnNjaGVtZSkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5wYXR0ZXJuKSk7XG4gICAgfVxuICAgIE5vdGVib29rRG9jdW1lbnRGaWx0ZXIuaXMgPSBpcztcbn0pKE5vdGVib29rRG9jdW1lbnRGaWx0ZXIgPSBleHBvcnRzLk5vdGVib29rRG9jdW1lbnRGaWx0ZXIgfHwgKGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudEZpbHRlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyfSBsaXRlcmFscy5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXI7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbFRleHREb2N1bWVudEZpbHRlcikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5ub3RlYm9vaykgfHwgTm90ZWJvb2tEb2N1bWVudEZpbHRlci5pcyhjYW5kaWRhdGUubm90ZWJvb2spKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5sYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2UpKTtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsVGV4dERvY3VtZW50RmlsdGVyLmlzID0gaXM7XG59KShOb3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIgPSBleHBvcnRzLk5vdGVib29rQ2VsbFRleHREb2N1bWVudEZpbHRlciB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGxUZXh0RG9jdW1lbnRGaWx0ZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgRG9jdW1lbnRTZWxlY3RvciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBEb2N1bWVudFNlbGVjdG9yfXMuXG4gKi9cbnZhciBEb2N1bWVudFNlbGVjdG9yO1xuKGZ1bmN0aW9uIChEb2N1bWVudFNlbGVjdG9yKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGVsZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghSXMuc3RyaW5nKGVsZW0pICYmICFUZXh0RG9jdW1lbnRGaWx0ZXIuaXMoZWxlbSkgJiYgIU5vdGVib29rQ2VsbFRleHREb2N1bWVudEZpbHRlci5pcyhlbGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgRG9jdW1lbnRTZWxlY3Rvci5pcyA9IGlzO1xufSkoRG9jdW1lbnRTZWxlY3RvciA9IGV4cG9ydHMuRG9jdW1lbnRTZWxlY3RvciB8fCAoZXhwb3J0cy5Eb2N1bWVudFNlbGVjdG9yID0ge30pKTtcbi8qKlxuICogVGhlIGBjbGllbnQvcmVnaXN0ZXJDYXBhYmlsaXR5YCByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gcmVnaXN0ZXIgYSBuZXcgY2FwYWJpbGl0eVxuICogaGFuZGxlciBvbiB0aGUgY2xpZW50IHNpZGUuXG4gKi9cbnZhciBSZWdpc3RyYXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChSZWdpc3RyYXRpb25SZXF1ZXN0KSB7XG4gICAgUmVnaXN0cmF0aW9uUmVxdWVzdC5tZXRob2QgPSAnY2xpZW50L3JlZ2lzdGVyQ2FwYWJpbGl0eSc7XG4gICAgUmVnaXN0cmF0aW9uUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIFJlZ2lzdHJhdGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoUmVnaXN0cmF0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoUmVnaXN0cmF0aW9uUmVxdWVzdCA9IGV4cG9ydHMuUmVnaXN0cmF0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5SZWdpc3RyYXRpb25SZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGBjbGllbnQvdW5yZWdpc3RlckNhcGFiaWxpdHlgIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byB1bnJlZ2lzdGVyIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNhcGFiaWxpdHlcbiAqIGhhbmRsZXIgb24gdGhlIGNsaWVudCBzaWRlLlxuICovXG52YXIgVW5yZWdpc3RyYXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChVbnJlZ2lzdHJhdGlvblJlcXVlc3QpIHtcbiAgICBVbnJlZ2lzdHJhdGlvblJlcXVlc3QubWV0aG9kID0gJ2NsaWVudC91bnJlZ2lzdGVyQ2FwYWJpbGl0eSc7XG4gICAgVW5yZWdpc3RyYXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgVW5yZWdpc3RyYXRpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFVucmVnaXN0cmF0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoVW5yZWdpc3RyYXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5VbnJlZ2lzdHJhdGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuVW5yZWdpc3RyYXRpb25SZXF1ZXN0ID0ge30pKTtcbnZhciBSZXNvdXJjZU9wZXJhdGlvbktpbmQ7XG4oZnVuY3Rpb24gKFJlc291cmNlT3BlcmF0aW9uS2luZCkge1xuICAgIC8qKlxuICAgICAqIFN1cHBvcnRzIGNyZWF0aW5nIG5ldyBmaWxlcyBhbmQgZm9sZGVycy5cbiAgICAgKi9cbiAgICBSZXNvdXJjZU9wZXJhdGlvbktpbmQuQ3JlYXRlID0gJ2NyZWF0ZSc7XG4gICAgLyoqXG4gICAgICogU3VwcG9ydHMgcmVuYW1pbmcgZXhpc3RpbmcgZmlsZXMgYW5kIGZvbGRlcnMuXG4gICAgICovXG4gICAgUmVzb3VyY2VPcGVyYXRpb25LaW5kLlJlbmFtZSA9ICdyZW5hbWUnO1xuICAgIC8qKlxuICAgICAqIFN1cHBvcnRzIGRlbGV0aW5nIGV4aXN0aW5nIGZpbGVzIGFuZCBmb2xkZXJzLlxuICAgICAqL1xuICAgIFJlc291cmNlT3BlcmF0aW9uS2luZC5EZWxldGUgPSAnZGVsZXRlJztcbn0pKFJlc291cmNlT3BlcmF0aW9uS2luZCA9IGV4cG9ydHMuUmVzb3VyY2VPcGVyYXRpb25LaW5kIHx8IChleHBvcnRzLlJlc291cmNlT3BlcmF0aW9uS2luZCA9IHt9KSk7XG52YXIgRmFpbHVyZUhhbmRsaW5nS2luZDtcbihmdW5jdGlvbiAoRmFpbHVyZUhhbmRsaW5nS2luZCkge1xuICAgIC8qKlxuICAgICAqIEFwcGx5aW5nIHRoZSB3b3Jrc3BhY2UgY2hhbmdlIGlzIHNpbXBseSBhYm9ydGVkIGlmIG9uZSBvZiB0aGUgY2hhbmdlcyBwcm92aWRlZFxuICAgICAqIGZhaWxzLiBBbGwgb3BlcmF0aW9ucyBleGVjdXRlZCBiZWZvcmUgdGhlIGZhaWxpbmcgb3BlcmF0aW9uIHN0YXkgZXhlY3V0ZWQuXG4gICAgICovXG4gICAgRmFpbHVyZUhhbmRsaW5nS2luZC5BYm9ydCA9ICdhYm9ydCc7XG4gICAgLyoqXG4gICAgICogQWxsIG9wZXJhdGlvbnMgYXJlIGV4ZWN1dGVkIHRyYW5zYWN0aW9uYWwuIFRoYXQgbWVhbnMgdGhleSBlaXRoZXIgYWxsXG4gICAgICogc3VjY2VlZCBvciBubyBjaGFuZ2VzIGF0IGFsbCBhcmUgYXBwbGllZCB0byB0aGUgd29ya3NwYWNlLlxuICAgICAqL1xuICAgIEZhaWx1cmVIYW5kbGluZ0tpbmQuVHJhbnNhY3Rpb25hbCA9ICd0cmFuc2FjdGlvbmFsJztcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgd29ya3NwYWNlIGVkaXQgY29udGFpbnMgb25seSB0ZXh0dWFsIGZpbGUgY2hhbmdlcyB0aGV5IGFyZSBleGVjdXRlZCB0cmFuc2FjdGlvbmFsLlxuICAgICAqIElmIHJlc291cmNlIGNoYW5nZXMgKGNyZWF0ZSwgcmVuYW1lIG9yIGRlbGV0ZSBmaWxlKSBhcmUgcGFydCBvZiB0aGUgY2hhbmdlIHRoZSBmYWlsdXJlXG4gICAgICogaGFuZGxpbmcgc3RyYXRlZ3kgaXMgYWJvcnQuXG4gICAgICovXG4gICAgRmFpbHVyZUhhbmRsaW5nS2luZC5UZXh0T25seVRyYW5zYWN0aW9uYWwgPSAndGV4dE9ubHlUcmFuc2FjdGlvbmFsJztcbiAgICAvKipcbiAgICAgKiBUaGUgY2xpZW50IHRyaWVzIHRvIHVuZG8gdGhlIG9wZXJhdGlvbnMgYWxyZWFkeSBleGVjdXRlZC4gQnV0IHRoZXJlIGlzIG5vXG4gICAgICogZ3VhcmFudGVlIHRoYXQgdGhpcyBpcyBzdWNjZWVkaW5nLlxuICAgICAqL1xuICAgIEZhaWx1cmVIYW5kbGluZ0tpbmQuVW5kbyA9ICd1bmRvJztcbn0pKEZhaWx1cmVIYW5kbGluZ0tpbmQgPSBleHBvcnRzLkZhaWx1cmVIYW5kbGluZ0tpbmQgfHwgKGV4cG9ydHMuRmFpbHVyZUhhbmRsaW5nS2luZCA9IHt9KSk7XG4vKipcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgcG9zaXRpb24gZW5jb2Rpbmcga2luZHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgUG9zaXRpb25FbmNvZGluZ0tpbmQ7XG4oZnVuY3Rpb24gKFBvc2l0aW9uRW5jb2RpbmdLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQ2hhcmFjdGVyIG9mZnNldHMgY291bnQgVVRGLTggY29kZSB1bml0cyAoZS5nLiBieXRlcykuXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGOCA9ICd1dGYtOCc7XG4gICAgLyoqXG4gICAgICogQ2hhcmFjdGVyIG9mZnNldHMgY291bnQgVVRGLTE2IGNvZGUgdW5pdHMuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHRoZSBkZWZhdWx0IGFuZCBtdXN0IGFsd2F5cyBiZSBzdXBwb3J0ZWRcbiAgICAgKiBieSBzZXJ2ZXJzXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGMTYgPSAndXRmLTE2JztcbiAgICAvKipcbiAgICAgKiBDaGFyYWN0ZXIgb2Zmc2V0cyBjb3VudCBVVEYtMzIgY29kZSB1bml0cy5cbiAgICAgKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGU6IHRoZXNlIGFyZSB0aGUgc2FtZSBhcyBVbmljb2RlIGNvZGVwb2ludHMsXG4gICAgICogc28gdGhpcyBgUG9zaXRpb25FbmNvZGluZ0tpbmRgIG1heSBhbHNvIGJlIHVzZWQgZm9yIGFuXG4gICAgICogZW5jb2RpbmctYWdub3N0aWMgcmVwcmVzZW50YXRpb24gb2YgY2hhcmFjdGVyIG9mZnNldHMuXG4gICAgICovXG4gICAgUG9zaXRpb25FbmNvZGluZ0tpbmQuVVRGMzIgPSAndXRmLTMyJztcbn0pKFBvc2l0aW9uRW5jb2RpbmdLaW5kID0gZXhwb3J0cy5Qb3NpdGlvbkVuY29kaW5nS2luZCB8fCAoZXhwb3J0cy5Qb3NpdGlvbkVuY29kaW5nS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBTdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIFN0YXRpY1JlZ2lzdHJhdGlvbk9wdGlvbnN9IGxpdGVyYWxzLlxuICovXG52YXIgU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucztcbihmdW5jdGlvbiAoU3RhdGljUmVnaXN0cmF0aW9uT3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIGhhc0lkKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLnN0cmluZyhjYW5kaWRhdGUuaWQpICYmIGNhbmRpZGF0ZS5pZC5sZW5ndGggPiAwO1xuICAgIH1cbiAgICBTdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zLmhhc0lkID0gaGFzSWQ7XG59KShTdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zID0gZXhwb3J0cy5TdGF0aWNSZWdpc3RyYXRpb25PcHRpb25zIHx8IChleHBvcnRzLlN0YXRpY1JlZ2lzdHJhdGlvbk9wdGlvbnMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dERvY3VtZW50UmVnaXN0cmF0aW9uT3B0aW9ucyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBUZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zfSBsaXRlcmFscy5cbiAqL1xudmFyIFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnM7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoY2FuZGlkYXRlLmRvY3VtZW50U2VsZWN0b3IgPT09IG51bGwgfHwgRG9jdW1lbnRTZWxlY3Rvci5pcyhjYW5kaWRhdGUuZG9jdW1lbnRTZWxlY3RvcikpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zLmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRSZWdpc3RyYXRpb25PcHRpb25zIHx8IChleHBvcnRzLlRleHREb2N1bWVudFJlZ2lzdHJhdGlvbk9wdGlvbnMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgV29ya0RvbmVQcm9ncmVzc09wdGlvbnN9IGxpdGVyYWxzLlxuICovXG52YXIgV29ya0RvbmVQcm9ncmVzc09wdGlvbnM7XG4oZnVuY3Rpb24gKFdvcmtEb25lUHJvZ3Jlc3NPcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgKGNhbmRpZGF0ZS53b3JrRG9uZVByb2dyZXNzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUud29ya0RvbmVQcm9ncmVzcykpO1xuICAgIH1cbiAgICBXb3JrRG9uZVByb2dyZXNzT3B0aW9ucy5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGhhc1dvcmtEb25lUHJvZ3Jlc3ModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuYm9vbGVhbihjYW5kaWRhdGUud29ya0RvbmVQcm9ncmVzcyk7XG4gICAgfVxuICAgIFdvcmtEb25lUHJvZ3Jlc3NPcHRpb25zLmhhc1dvcmtEb25lUHJvZ3Jlc3MgPSBoYXNXb3JrRG9uZVByb2dyZXNzO1xufSkoV29ya0RvbmVQcm9ncmVzc09wdGlvbnMgPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NPcHRpb25zIHx8IChleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NPcHRpb25zID0ge30pKTtcbi8qKlxuICogVGhlIGluaXRpYWxpemUgcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyLlxuICogSXQgaXMgc2VudCBvbmNlIGFzIHRoZSByZXF1ZXN0IGFmdGVyIHN0YXJ0aW5nIHVwIHRoZSBzZXJ2ZXIuXG4gKiBUaGUgcmVxdWVzdHMgcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIEluaXRpYWxpemVQYXJhbXN9XG4gKiB0aGUgcmVzcG9uc2UgaWYgb2YgdHlwZSB7QGxpbmsgSW5pdGlhbGl6ZVJlc3VsdH0gb2YgYSBUaGVuYWJsZSB0aGF0XG4gKiByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgSW5pdGlhbGl6ZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKEluaXRpYWxpemVSZXF1ZXN0KSB7XG4gICAgSW5pdGlhbGl6ZVJlcXVlc3QubWV0aG9kID0gJ2luaXRpYWxpemUnO1xuICAgIEluaXRpYWxpemVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgSW5pdGlhbGl6ZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSW5pdGlhbGl6ZVJlcXVlc3QubWV0aG9kKTtcbn0pKEluaXRpYWxpemVSZXF1ZXN0ID0gZXhwb3J0cy5Jbml0aWFsaXplUmVxdWVzdCB8fCAoZXhwb3J0cy5Jbml0aWFsaXplUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEtub3duIGVycm9yIGNvZGVzIGZvciBhbiBgSW5pdGlhbGl6ZUVycm9yQ29kZXNgO1xuICovXG52YXIgSW5pdGlhbGl6ZUVycm9yQ29kZXM7XG4oZnVuY3Rpb24gKEluaXRpYWxpemVFcnJvckNvZGVzKSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHByb3RvY29sIHZlcnNpb24gcHJvdmlkZWQgYnkgdGhlIGNsaWVudCBjYW4ndCBiZSBoYW5kbGVkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBUaGlzIGluaXRpYWxpemUgZXJyb3IgZ290IHJlcGxhY2VkIGJ5IGNsaWVudCBjYXBhYmlsaXRpZXMuIFRoZXJlIGlzXG4gICAgICogbm8gdmVyc2lvbiBoYW5kc2hha2UgaW4gdmVyc2lvbiAzLjB4XG4gICAgICovXG4gICAgSW5pdGlhbGl6ZUVycm9yQ29kZXMudW5rbm93blByb3RvY29sVmVyc2lvbiA9IDE7XG59KShJbml0aWFsaXplRXJyb3JDb2RlcyA9IGV4cG9ydHMuSW5pdGlhbGl6ZUVycm9yQ29kZXMgfHwgKGV4cG9ydHMuSW5pdGlhbGl6ZUVycm9yQ29kZXMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgaW5pdGlhbGl6ZWQgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZVxuICogc2VydmVyIGFmdGVyIHRoZSBjbGllbnQgaXMgZnVsbHkgaW5pdGlhbGl6ZWQgYW5kIHRoZSBzZXJ2ZXJcbiAqIGlzIGFsbG93ZWQgdG8gc2VuZCByZXF1ZXN0cyBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudC5cbiAqL1xudmFyIEluaXRpYWxpemVkTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChJbml0aWFsaXplZE5vdGlmaWNhdGlvbikge1xuICAgIEluaXRpYWxpemVkTm90aWZpY2F0aW9uLm1ldGhvZCA9ICdpbml0aWFsaXplZCc7XG4gICAgSW5pdGlhbGl6ZWROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBJbml0aWFsaXplZE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKEluaXRpYWxpemVkTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShJbml0aWFsaXplZE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuSW5pdGlhbGl6ZWROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuSW5pdGlhbGl6ZWROb3RpZmljYXRpb24gPSB7fSkpO1xuLy8tLS0tIFNodXRkb3duIE1ldGhvZCAtLS0tXG4vKipcbiAqIEEgc2h1dGRvd24gcmVxdWVzdCBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyLlxuICogSXQgaXMgc2VudCBvbmNlIHdoZW4gdGhlIGNsaWVudCBkZWNpZGVzIHRvIHNodXRkb3duIHRoZVxuICogc2VydmVyLiBUaGUgb25seSBub3RpZmljYXRpb24gdGhhdCBpcyBzZW50IGFmdGVyIGEgc2h1dGRvd24gcmVxdWVzdFxuICogaXMgdGhlIGV4aXQgZXZlbnQuXG4gKi9cbnZhciBTaHV0ZG93blJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNodXRkb3duUmVxdWVzdCkge1xuICAgIFNodXRkb3duUmVxdWVzdC5tZXRob2QgPSAnc2h1dGRvd24nO1xuICAgIFNodXRkb3duUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFNodXRkb3duUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZTAoU2h1dGRvd25SZXF1ZXN0Lm1ldGhvZCk7XG59KShTaHV0ZG93blJlcXVlc3QgPSBleHBvcnRzLlNodXRkb3duUmVxdWVzdCB8fCAoZXhwb3J0cy5TaHV0ZG93blJlcXVlc3QgPSB7fSkpO1xuLy8tLS0tIEV4aXQgTm90aWZpY2F0aW9uIC0tLS1cbi8qKlxuICogVGhlIGV4aXQgZXZlbnQgaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB0b1xuICogYXNrIHRoZSBzZXJ2ZXIgdG8gZXhpdCBpdHMgcHJvY2Vzcy5cbiAqL1xudmFyIEV4aXROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKEV4aXROb3RpZmljYXRpb24pIHtcbiAgICBFeGl0Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICdleGl0JztcbiAgICBFeGl0Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRXhpdE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlMChFeGl0Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShFeGl0Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5FeGl0Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkV4aXROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgY29uZmlndXJhdGlvbiBjaGFuZ2Ugbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXJcbiAqIHdoZW4gdGhlIGNsaWVudCdzIGNvbmZpZ3VyYXRpb24gaGFzIGNoYW5nZWQuIFRoZSBub3RpZmljYXRpb24gY29udGFpbnNcbiAqIHRoZSBjaGFuZ2VkIGNvbmZpZ3VyYXRpb24gYXMgZGVmaW5lZCBieSB0aGUgbGFuZ3VhZ2UgY2xpZW50LlxuICovXG52YXIgRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24ubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWRDaGFuZ2VDb25maWd1cmF0aW9uJztcbiAgICBEaWRDaGFuZ2VDb25maWd1cmF0aW9uTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24gPSBleHBvcnRzLkRpZENoYW5nZUNvbmZpZ3VyYXRpb25Ob3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlQ29uZmlndXJhdGlvbk5vdGlmaWNhdGlvbiA9IHt9KSk7XG4vLy0tLS0gTWVzc2FnZSBzaG93IGFuZCBsb2cgbm90aWZpY2F0aW9ucyAtLS0tXG4vKipcbiAqIFRoZSBtZXNzYWdlIHR5cGVcbiAqL1xudmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uIChNZXNzYWdlVHlwZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGVycm9yIG1lc3NhZ2UuXG4gICAgICovXG4gICAgTWVzc2FnZVR5cGUuRXJyb3IgPSAxO1xuICAgIC8qKlxuICAgICAqIEEgd2FybmluZyBtZXNzYWdlLlxuICAgICAqL1xuICAgIE1lc3NhZ2VUeXBlLldhcm5pbmcgPSAyO1xuICAgIC8qKlxuICAgICAqIEFuIGluZm9ybWF0aW9uIG1lc3NhZ2UuXG4gICAgICovXG4gICAgTWVzc2FnZVR5cGUuSW5mbyA9IDM7XG4gICAgLyoqXG4gICAgICogQSBsb2cgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBNZXNzYWdlVHlwZS5Mb2cgPSA0O1xufSkoTWVzc2FnZVR5cGUgPSBleHBvcnRzLk1lc3NhZ2VUeXBlIHx8IChleHBvcnRzLk1lc3NhZ2VUeXBlID0ge30pKTtcbi8qKlxuICogVGhlIHNob3cgbWVzc2FnZSBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIGEgc2VydmVyIHRvIGEgY2xpZW50IHRvIGFza1xuICogdGhlIGNsaWVudCB0byBkaXNwbGF5IGEgcGFydGljdWxhciBtZXNzYWdlIGluIHRoZSB1c2VyIGludGVyZmFjZS5cbiAqL1xudmFyIFNob3dNZXNzYWdlTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChTaG93TWVzc2FnZU5vdGlmaWNhdGlvbikge1xuICAgIFNob3dNZXNzYWdlTm90aWZpY2F0aW9uLm1ldGhvZCA9ICd3aW5kb3cvc2hvd01lc3NhZ2UnO1xuICAgIFNob3dNZXNzYWdlTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgU2hvd01lc3NhZ2VOb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShTaG93TWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoU2hvd01lc3NhZ2VOb3RpZmljYXRpb24gPSBleHBvcnRzLlNob3dNZXNzYWdlTm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlNob3dNZXNzYWdlTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIHNob3cgbWVzc2FnZSByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gc2hvdyBhIG1lc3NhZ2VcbiAqIGFuZCBhIHNldCBvZiBvcHRpb25zIGFjdGlvbnMgdG8gdGhlIHVzZXIuXG4gKi9cbnZhciBTaG93TWVzc2FnZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNob3dNZXNzYWdlUmVxdWVzdCkge1xuICAgIFNob3dNZXNzYWdlUmVxdWVzdC5tZXRob2QgPSAnd2luZG93L3Nob3dNZXNzYWdlUmVxdWVzdCc7XG4gICAgU2hvd01lc3NhZ2VSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgU2hvd01lc3NhZ2VSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNob3dNZXNzYWdlUmVxdWVzdC5tZXRob2QpO1xufSkoU2hvd01lc3NhZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TaG93TWVzc2FnZVJlcXVlc3QgfHwgKGV4cG9ydHMuU2hvd01lc3NhZ2VSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogVGhlIGxvZyBtZXNzYWdlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIGFza1xuICogdGhlIGNsaWVudCB0byBsb2cgYSBwYXJ0aWN1bGFyIG1lc3NhZ2UuXG4gKi9cbnZhciBMb2dNZXNzYWdlTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChMb2dNZXNzYWdlTm90aWZpY2F0aW9uKSB7XG4gICAgTG9nTWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QgPSAnd2luZG93L2xvZ01lc3NhZ2UnO1xuICAgIExvZ01lc3NhZ2VOb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBMb2dNZXNzYWdlTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoTG9nTWVzc2FnZU5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoTG9nTWVzc2FnZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTG9nTWVzc2FnZU5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5Mb2dNZXNzYWdlTm90aWZpY2F0aW9uID0ge30pKTtcbi8vLS0tLSBUZWxlbWV0cnkgbm90aWZpY2F0aW9uXG4vKipcbiAqIFRoZSB0ZWxlbWV0cnkgZXZlbnQgbm90aWZpY2F0aW9uIGlzIHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gYXNrXG4gKiB0aGUgY2xpZW50IHRvIGxvZyB0ZWxlbWV0cnkgZGF0YS5cbiAqL1xudmFyIFRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChUZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbikge1xuICAgIFRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICd0ZWxlbWV0cnkvZXZlbnQnO1xuICAgIFRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShUZWxlbWV0cnlFdmVudE5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoVGVsZW1ldHJ5RXZlbnROb3RpZmljYXRpb24gPSBleHBvcnRzLlRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLlRlbGVtZXRyeUV2ZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogRGVmaW5lcyBob3cgdGhlIGhvc3QgKGVkaXRvcikgc2hvdWxkIHN5bmNcbiAqIGRvY3VtZW50IGNoYW5nZXMgdG8gdGhlIGxhbmd1YWdlIHNlcnZlci5cbiAqL1xudmFyIFRleHREb2N1bWVudFN5bmNLaW5kO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRTeW5jS2luZCkge1xuICAgIC8qKlxuICAgICAqIERvY3VtZW50cyBzaG91bGQgbm90IGJlIHN5bmNlZCBhdCBhbGwuXG4gICAgICovXG4gICAgVGV4dERvY3VtZW50U3luY0tpbmQuTm9uZSA9IDA7XG4gICAgLyoqXG4gICAgICogRG9jdW1lbnRzIGFyZSBzeW5jZWQgYnkgYWx3YXlzIHNlbmRpbmcgdGhlIGZ1bGwgY29udGVudFxuICAgICAqIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTeW5jS2luZC5GdWxsID0gMTtcbiAgICAvKipcbiAgICAgKiBEb2N1bWVudHMgYXJlIHN5bmNlZCBieSBzZW5kaW5nIHRoZSBmdWxsIGNvbnRlbnQgb24gb3Blbi5cbiAgICAgKiBBZnRlciB0aGF0IG9ubHkgaW5jcmVtZW50YWwgdXBkYXRlcyB0byB0aGUgZG9jdW1lbnQgYXJlXG4gICAgICogc2VuZC5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTeW5jS2luZC5JbmNyZW1lbnRhbCA9IDI7XG59KShUZXh0RG9jdW1lbnRTeW5jS2luZCA9IGV4cG9ydHMuVGV4dERvY3VtZW50U3luY0tpbmQgfHwgKGV4cG9ydHMuVGV4dERvY3VtZW50U3luY0tpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZG9jdW1lbnQgb3BlbiBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB0byBzaWduYWxcbiAqIG5ld2x5IG9wZW5lZCB0ZXh0IGRvY3VtZW50cy4gVGhlIGRvY3VtZW50J3MgdHJ1dGggaXMgbm93IG1hbmFnZWQgYnkgdGhlIGNsaWVudFxuICogYW5kIHRoZSBzZXJ2ZXIgbXVzdCBub3QgdHJ5IHRvIHJlYWQgdGhlIGRvY3VtZW50J3MgdHJ1dGggdXNpbmcgdGhlIGRvY3VtZW50J3NcbiAqIHVyaS4gT3BlbiBpbiB0aGlzIHNlbnNlIG1lYW5zIGl0IGlzIG1hbmFnZWQgYnkgdGhlIGNsaWVudC4gSXQgZG9lc24ndCBuZWNlc3NhcmlseVxuICogbWVhbiB0aGF0IGl0cyBjb250ZW50IGlzIHByZXNlbnRlZCBpbiBhbiBlZGl0b3IuIEFuIG9wZW4gbm90aWZpY2F0aW9uIG11c3Qgbm90XG4gKiBiZSBzZW50IG1vcmUgdGhhbiBvbmNlIHdpdGhvdXQgYSBjb3JyZXNwb25kaW5nIGNsb3NlIG5vdGlmaWNhdGlvbiBzZW5kIGJlZm9yZS5cbiAqIFRoaXMgbWVhbnMgb3BlbiBhbmQgY2xvc2Ugbm90aWZpY2F0aW9uIG11c3QgYmUgYmFsYW5jZWQgYW5kIHRoZSBtYXggb3BlbiBjb3VudFxuICogaXMgb25lLlxuICovXG52YXIgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRPcGVuJztcbiAgICBEaWRPcGVuVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IHt9KSk7XG52YXIgVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50O1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQpIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgaW5mb3JtYXRpb24gZGVzY3JpYmVzIGEgZGVsdGEgZXZlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNJbmNyZW1lbnRhbChldmVudCkge1xuICAgICAgICBsZXQgY2FuZGlkYXRlID0gZXZlbnQ7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgIT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjYW5kaWRhdGUudGV4dCA9PT0gJ3N0cmluZycgJiYgY2FuZGlkYXRlLnJhbmdlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUucmFuZ2VMZW5ndGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY2FuZGlkYXRlLnJhbmdlTGVuZ3RoID09PSAnbnVtYmVyJyk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudENvbnRlbnRDaGFuZ2VFdmVudC5pc0luY3JlbWVudGFsID0gaXNJbmNyZW1lbnRhbDtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgaW5mb3JtYXRpb24gZGVzY3JpYmVzIGEgZnVsbCByZXBsYWNlbWVudCBldmVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Z1bGwoZXZlbnQpIHtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IGV2ZW50O1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICE9PSB1bmRlZmluZWQgJiYgY2FuZGlkYXRlICE9PSBudWxsICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlLnRleHQgPT09ICdzdHJpbmcnICYmIGNhbmRpZGF0ZS5yYW5nZSA9PT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZS5yYW5nZUxlbmd0aCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQuaXNGdWxsID0gaXNGdWxsO1xufSkoVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50ID0gZXhwb3J0cy5UZXh0RG9jdW1lbnRDb250ZW50Q2hhbmdlRXZlbnQgfHwgKGV4cG9ydHMuVGV4dERvY3VtZW50Q29udGVudENoYW5nZUV2ZW50ID0ge30pKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IGNoYW5nZSBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB0byBzaWduYWxcbiAqIGNoYW5nZXMgdG8gYSB0ZXh0IGRvY3VtZW50LlxuICovXG52YXIgRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24pIHtcbiAgICBEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRDaGFuZ2UnO1xuICAgIERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IGNsb3NlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHdoZW5cbiAqIHRoZSBkb2N1bWVudCBnb3QgY2xvc2VkIGluIHRoZSBjbGllbnQuIFRoZSBkb2N1bWVudCdzIHRydXRoIG5vdyBleGlzdHMgd2hlcmVcbiAqIHRoZSBkb2N1bWVudCdzIHVyaSBwb2ludHMgdG8gKGUuZy4gaWYgdGhlIGRvY3VtZW50J3MgdXJpIGlzIGEgZmlsZSB1cmkgdGhlXG4gKiB0cnV0aCBub3cgZXhpc3RzIG9uIGRpc2spLiBBcyB3aXRoIHRoZSBvcGVuIG5vdGlmaWNhdGlvbiB0aGUgY2xvc2Ugbm90aWZpY2F0aW9uXG4gKiBpcyBhYm91dCBtYW5hZ2luZyB0aGUgZG9jdW1lbnQncyBjb250ZW50LiBSZWNlaXZpbmcgYSBjbG9zZSBub3RpZmljYXRpb25cbiAqIGRvZXNuJ3QgbWVhbiB0aGF0IHRoZSBkb2N1bWVudCB3YXMgb3BlbiBpbiBhbiBlZGl0b3IgYmVmb3JlLiBBIGNsb3NlXG4gKiBub3RpZmljYXRpb24gcmVxdWlyZXMgYSBwcmV2aW91cyBvcGVuIG5vdGlmaWNhdGlvbiB0byBiZSBzZW50LlxuICovXG52YXIgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZENsb3NlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC9kaWRDbG9zZSc7XG4gICAgRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENsb3NlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShEaWRDbG9zZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2xvc2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgZG9jdW1lbnQgc2F2ZSBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB3aGVuXG4gKiB0aGUgZG9jdW1lbnQgZ290IHNhdmVkIGluIHRoZSBjbGllbnQuXG4gKi9cbnZhciBEaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QgPSAndGV4dERvY3VtZW50L2RpZFNhdmUnO1xuICAgIERpZFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogUmVwcmVzZW50cyByZWFzb25zIHdoeSBhIHRleHQgZG9jdW1lbnQgaXMgc2F2ZWQuXG4gKi9cbnZhciBUZXh0RG9jdW1lbnRTYXZlUmVhc29uO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRTYXZlUmVhc29uKSB7XG4gICAgLyoqXG4gICAgICogTWFudWFsbHkgdHJpZ2dlcmVkLCBlLmcuIGJ5IHRoZSB1c2VyIHByZXNzaW5nIHNhdmUsIGJ5IHN0YXJ0aW5nIGRlYnVnZ2luZyxcbiAgICAgKiBvciBieSBhbiBBUEkgY2FsbC5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTYXZlUmVhc29uLk1hbnVhbCA9IDE7XG4gICAgLyoqXG4gICAgICogQXV0b21hdGljIGFmdGVyIGEgZGVsYXkuXG4gICAgICovXG4gICAgVGV4dERvY3VtZW50U2F2ZVJlYXNvbi5BZnRlckRlbGF5ID0gMjtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBlZGl0b3IgbG9zdCBmb2N1cy5cbiAgICAgKi9cbiAgICBUZXh0RG9jdW1lbnRTYXZlUmVhc29uLkZvY3VzT3V0ID0gMztcbn0pKFRleHREb2N1bWVudFNhdmVSZWFzb24gPSBleHBvcnRzLlRleHREb2N1bWVudFNhdmVSZWFzb24gfHwgKGV4cG9ydHMuVGV4dERvY3VtZW50U2F2ZVJlYXNvbiA9IHt9KSk7XG4vKipcbiAqIEEgZG9jdW1lbnQgd2lsbCBzYXZlIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIGJlZm9yZVxuICogdGhlIGRvY3VtZW50IGlzIGFjdHVhbGx5IHNhdmVkLlxuICovXG52YXIgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFdpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ3RleHREb2N1bWVudC93aWxsU2F2ZSc7XG4gICAgV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBXaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKFdpbGxTYXZlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShXaWxsU2F2ZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuV2lsbFNhdmVUZXh0RG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBBIGRvY3VtZW50IHdpbGwgc2F2ZSByZXF1ZXN0IGlzIHNlbnQgZnJvbSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgYmVmb3JlXG4gKiB0aGUgZG9jdW1lbnQgaXMgYWN0dWFsbHkgc2F2ZWQuIFRoZSByZXF1ZXN0IGNhbiByZXR1cm4gYW4gYXJyYXkgb2YgVGV4dEVkaXRzXG4gKiB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHRleHQgZG9jdW1lbnQgYmVmb3JlIGl0IGlzIHNhdmVkLiBQbGVhc2Ugbm90ZSB0aGF0XG4gKiBjbGllbnRzIG1pZ2h0IGRyb3AgcmVzdWx0cyBpZiBjb21wdXRpbmcgdGhlIHRleHQgZWRpdHMgdG9vayB0b28gbG9uZyBvciBpZiBhXG4gKiBzZXJ2ZXIgY29uc3RhbnRseSBmYWlscyBvbiB0aGlzIHJlcXVlc3QuIFRoaXMgaXMgZG9uZSB0byBrZWVwIHRoZSBzYXZlIGZhc3QgYW5kXG4gKiByZWxpYWJsZS5cbiAqL1xudmFyIFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdDtcbihmdW5jdGlvbiAoV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0KSB7XG4gICAgV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvd2lsbFNhdmVXYWl0VW50aWwnO1xuICAgIFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShXaWxsU2F2ZVRleHREb2N1bWVudFdhaXRVbnRpbFJlcXVlc3QubWV0aG9kKTtcbn0pKFdpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdCA9IGV4cG9ydHMuV2lsbFNhdmVUZXh0RG9jdW1lbnRXYWl0VW50aWxSZXF1ZXN0IHx8IChleHBvcnRzLldpbGxTYXZlVGV4dERvY3VtZW50V2FpdFVudGlsUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSB3YXRjaGVkIGZpbGVzIG5vdGlmaWNhdGlvbiBpcyBzZW50IGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHdoZW5cbiAqIHRoZSBjbGllbnQgZGV0ZWN0cyBjaGFuZ2VzIHRvIGZpbGUgd2F0Y2hlZCBieSB0aGUgbGFuZ3VhZ2UgY2xpZW50LlxuICovXG52YXIgRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRDaGFuZ2VXYXRjaGVkRmlsZXNOb3RpZmljYXRpb24pIHtcbiAgICBEaWRDaGFuZ2VXYXRjaGVkRmlsZXNOb3RpZmljYXRpb24ubWV0aG9kID0gJ3dvcmtzcGFjZS9kaWRDaGFuZ2VXYXRjaGVkRmlsZXMnO1xuICAgIERpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZVdhdGNoZWRGaWxlc05vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDaGFuZ2VXYXRjaGVkRmlsZXNOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuRGlkQ2hhbmdlV2F0Y2hlZEZpbGVzTm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGZpbGUgZXZlbnQgdHlwZVxuICovXG52YXIgRmlsZUNoYW5nZVR5cGU7XG4oZnVuY3Rpb24gKEZpbGVDaGFuZ2VUeXBlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGNyZWF0ZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuQ3JlYXRlZCA9IDE7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGNoYW5nZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuQ2hhbmdlZCA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgZ290IGRlbGV0ZWQuXG4gICAgICovXG4gICAgRmlsZUNoYW5nZVR5cGUuRGVsZXRlZCA9IDM7XG59KShGaWxlQ2hhbmdlVHlwZSA9IGV4cG9ydHMuRmlsZUNoYW5nZVR5cGUgfHwgKGV4cG9ydHMuRmlsZUNoYW5nZVR5cGUgPSB7fSkpO1xudmFyIFJlbGF0aXZlUGF0dGVybjtcbihmdW5jdGlvbiAoUmVsYXRpdmVQYXR0ZXJuKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgKHZzY29kZV9sYW5ndWFnZXNlcnZlcl90eXBlc18xLlVSSS5pcyhjYW5kaWRhdGUuYmFzZVVyaSkgfHwgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEuV29ya3NwYWNlRm9sZGVyLmlzKGNhbmRpZGF0ZS5iYXNlVXJpKSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5wYXR0ZXJuKTtcbiAgICB9XG4gICAgUmVsYXRpdmVQYXR0ZXJuLmlzID0gaXM7XG59KShSZWxhdGl2ZVBhdHRlcm4gPSBleHBvcnRzLlJlbGF0aXZlUGF0dGVybiB8fCAoZXhwb3J0cy5SZWxhdGl2ZVBhdHRlcm4gPSB7fSkpO1xudmFyIFdhdGNoS2luZDtcbihmdW5jdGlvbiAoV2F0Y2hLaW5kKSB7XG4gICAgLyoqXG4gICAgICogSW50ZXJlc3RlZCBpbiBjcmVhdGUgZXZlbnRzLlxuICAgICAqL1xuICAgIFdhdGNoS2luZC5DcmVhdGUgPSAxO1xuICAgIC8qKlxuICAgICAqIEludGVyZXN0ZWQgaW4gY2hhbmdlIGV2ZW50c1xuICAgICAqL1xuICAgIFdhdGNoS2luZC5DaGFuZ2UgPSAyO1xuICAgIC8qKlxuICAgICAqIEludGVyZXN0ZWQgaW4gZGVsZXRlIGV2ZW50c1xuICAgICAqL1xuICAgIFdhdGNoS2luZC5EZWxldGUgPSA0O1xufSkoV2F0Y2hLaW5kID0gZXhwb3J0cy5XYXRjaEtpbmQgfHwgKGV4cG9ydHMuV2F0Y2hLaW5kID0ge30pKTtcbi8qKlxuICogRGlhZ25vc3RpY3Mgbm90aWZpY2F0aW9uIGFyZSBzZW50IGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50IHRvIHNpZ25hbFxuICogcmVzdWx0cyBvZiB2YWxpZGF0aW9uIHJ1bnMuXG4gKi9cbnZhciBQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbikge1xuICAgIFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbi5tZXRob2QgPSAndGV4dERvY3VtZW50L3B1Ymxpc2hEaWFnbm9zdGljcyc7XG4gICAgUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLm1ldGhvZCk7XG59KShQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24gPSBleHBvcnRzLlB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5QdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBIb3cgYSBjb21wbGV0aW9uIHdhcyB0cmlnZ2VyZWRcbiAqL1xudmFyIENvbXBsZXRpb25UcmlnZ2VyS2luZDtcbihmdW5jdGlvbiAoQ29tcGxldGlvblRyaWdnZXJLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQ29tcGxldGlvbiB3YXMgdHJpZ2dlcmVkIGJ5IHR5cGluZyBhbiBpZGVudGlmaWVyICgyNHg3IGNvZGVcbiAgICAgKiBjb21wbGV0ZSksIG1hbnVhbCBpbnZvY2F0aW9uIChlLmcgQ3RybCtTcGFjZSkgb3IgdmlhIEFQSS5cbiAgICAgKi9cbiAgICBDb21wbGV0aW9uVHJpZ2dlcktpbmQuSW52b2tlZCA9IDE7XG4gICAgLyoqXG4gICAgICogQ29tcGxldGlvbiB3YXMgdHJpZ2dlcmVkIGJ5IGEgdHJpZ2dlciBjaGFyYWN0ZXIgc3BlY2lmaWVkIGJ5XG4gICAgICogdGhlIGB0cmlnZ2VyQ2hhcmFjdGVyc2AgcHJvcGVydGllcyBvZiB0aGUgYENvbXBsZXRpb25SZWdpc3RyYXRpb25PcHRpb25zYC5cbiAgICAgKi9cbiAgICBDb21wbGV0aW9uVHJpZ2dlcktpbmQuVHJpZ2dlckNoYXJhY3RlciA9IDI7XG4gICAgLyoqXG4gICAgICogQ29tcGxldGlvbiB3YXMgcmUtdHJpZ2dlcmVkIGFzIGN1cnJlbnQgY29tcGxldGlvbiBsaXN0IGlzIGluY29tcGxldGVcbiAgICAgKi9cbiAgICBDb21wbGV0aW9uVHJpZ2dlcktpbmQuVHJpZ2dlckZvckluY29tcGxldGVDb21wbGV0aW9ucyA9IDM7XG59KShDb21wbGV0aW9uVHJpZ2dlcktpbmQgPSBleHBvcnRzLkNvbXBsZXRpb25UcmlnZ2VyS2luZCB8fCAoZXhwb3J0cy5Db21wbGV0aW9uVHJpZ2dlcktpbmQgPSB7fSkpO1xuLyoqXG4gKiBSZXF1ZXN0IHRvIHJlcXVlc3QgY29tcGxldGlvbiBhdCBhIGdpdmVuIHRleHQgZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBUZXh0RG9jdW1lbnRQb3NpdGlvbn0gdGhlIHJlc3BvbnNlXG4gKiBpcyBvZiB0eXBlIHtAbGluayBDb21wbGV0aW9uSXRlbSBDb21wbGV0aW9uSXRlbVtdfSBvciB7QGxpbmsgQ29tcGxldGlvbkxpc3R9XG4gKiBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqXG4gKiBUaGUgcmVxdWVzdCBjYW4gZGVsYXkgdGhlIGNvbXB1dGF0aW9uIG9mIHRoZSB7QGxpbmsgQ29tcGxldGlvbkl0ZW0uZGV0YWlsIGBkZXRhaWxgfVxuICogYW5kIHtAbGluayBDb21wbGV0aW9uSXRlbS5kb2N1bWVudGF0aW9uIGBkb2N1bWVudGF0aW9uYH0gcHJvcGVydGllcyB0byB0aGUgYGNvbXBsZXRpb25JdGVtL3Jlc29sdmVgXG4gKiByZXF1ZXN0LiBIb3dldmVyLCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5lZWRlZCBmb3IgdGhlIGluaXRpYWwgc29ydGluZyBhbmQgZmlsdGVyaW5nLCBsaWtlIGBzb3J0VGV4dGAsXG4gKiBgZmlsdGVyVGV4dGAsIGBpbnNlcnRUZXh0YCwgYW5kIGB0ZXh0RWRpdGAsIG11c3Qgbm90IGJlIGNoYW5nZWQgZHVyaW5nIHJlc29sdmUuXG4gKi9cbnZhciBDb21wbGV0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29tcGxldGlvblJlcXVlc3QpIHtcbiAgICBDb21wbGV0aW9uUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2NvbXBsZXRpb24nO1xuICAgIENvbXBsZXRpb25SZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgQ29tcGxldGlvblJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29tcGxldGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKENvbXBsZXRpb25SZXF1ZXN0ID0gZXhwb3J0cy5Db21wbGV0aW9uUmVxdWVzdCB8fCAoZXhwb3J0cy5Db21wbGV0aW9uUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVzb2x2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciBhIGdpdmVuIGNvbXBsZXRpb24gaXRlbS5UaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgQ29tcGxldGlvbkl0ZW19IHRoZSByZXNwb25zZVxuICogaXMgb2YgdHlwZSB7QGxpbmsgQ29tcGxldGlvbkl0ZW19IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kID0gJ2NvbXBsZXRpb25JdGVtL3Jlc29sdmUnO1xuICAgIENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCA9IGV4cG9ydHMuQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLkNvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVxdWVzdCBob3ZlciBpbmZvcm1hdGlvbiBhdCBhIGdpdmVuIHRleHQgZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBUZXh0RG9jdW1lbnRQb3NpdGlvbn0gdGhlIHJlc3BvbnNlIGlzIG9mXG4gKiB0eXBlIHtAbGluayBIb3Zlcn0gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBIb3ZlclJlcXVlc3Q7XG4oZnVuY3Rpb24gKEhvdmVyUmVxdWVzdCkge1xuICAgIEhvdmVyUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2hvdmVyJztcbiAgICBIb3ZlclJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBIb3ZlclJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoSG92ZXJSZXF1ZXN0Lm1ldGhvZCk7XG59KShIb3ZlclJlcXVlc3QgPSBleHBvcnRzLkhvdmVyUmVxdWVzdCB8fCAoZXhwb3J0cy5Ib3ZlclJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBIb3cgYSBzaWduYXR1cmUgaGVscCB3YXMgdHJpZ2dlcmVkLlxuICpcbiAqIEBzaW5jZSAzLjE1LjBcbiAqL1xudmFyIFNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZDtcbihmdW5jdGlvbiAoU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kKSB7XG4gICAgLyoqXG4gICAgICogU2lnbmF0dXJlIGhlbHAgd2FzIGludm9rZWQgbWFudWFsbHkgYnkgdGhlIHVzZXIgb3IgYnkgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIFNpZ25hdHVyZUhlbHBUcmlnZ2VyS2luZC5JbnZva2VkID0gMTtcbiAgICAvKipcbiAgICAgKiBTaWduYXR1cmUgaGVscCB3YXMgdHJpZ2dlcmVkIGJ5IGEgdHJpZ2dlciBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kLlRyaWdnZXJDaGFyYWN0ZXIgPSAyO1xuICAgIC8qKlxuICAgICAqIFNpZ25hdHVyZSBoZWxwIHdhcyB0cmlnZ2VyZWQgYnkgdGhlIGN1cnNvciBtb3Zpbmcgb3IgYnkgdGhlIGRvY3VtZW50IGNvbnRlbnQgY2hhbmdpbmcuXG4gICAgICovXG4gICAgU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kLkNvbnRlbnRDaGFuZ2UgPSAzO1xufSkoU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kID0gZXhwb3J0cy5TaWduYXR1cmVIZWxwVHJpZ2dlcktpbmQgfHwgKGV4cG9ydHMuU2lnbmF0dXJlSGVscFRyaWdnZXJLaW5kID0ge30pKTtcbnZhciBTaWduYXR1cmVIZWxwUmVxdWVzdDtcbihmdW5jdGlvbiAoU2lnbmF0dXJlSGVscFJlcXVlc3QpIHtcbiAgICBTaWduYXR1cmVIZWxwUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NpZ25hdHVyZUhlbHAnO1xuICAgIFNpZ25hdHVyZUhlbHBSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgU2lnbmF0dXJlSGVscFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoU2lnbmF0dXJlSGVscFJlcXVlc3QubWV0aG9kKTtcbn0pKFNpZ25hdHVyZUhlbHBSZXF1ZXN0ID0gZXhwb3J0cy5TaWduYXR1cmVIZWxwUmVxdWVzdCB8fCAoZXhwb3J0cy5TaWduYXR1cmVIZWxwUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBkZWZpbml0aW9uIGxvY2F0aW9uIG9mIGEgc3ltYm9sIGF0IGEgZ2l2ZW4gdGV4dFxuICogZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mIHR5cGUgW1RleHREb2N1bWVudFBvc2l0aW9uXVxuICogKCNUZXh0RG9jdW1lbnRQb3NpdGlvbikgdGhlIHJlc3BvbnNlIGlzIG9mIGVpdGhlciB0eXBlIHtAbGluayBEZWZpbml0aW9ufVxuICogb3IgYSB0eXBlZCBhcnJheSBvZiB7QGxpbmsgRGVmaW5pdGlvbkxpbmt9IG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlc1xuICogdG8gc3VjaC5cbiAqL1xudmFyIERlZmluaXRpb25SZXF1ZXN0O1xuKGZ1bmN0aW9uIChEZWZpbml0aW9uUmVxdWVzdCkge1xuICAgIERlZmluaXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvZGVmaW5pdGlvbic7XG4gICAgRGVmaW5pdGlvblJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEZWZpbml0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEZWZpbml0aW9uUmVxdWVzdC5tZXRob2QpO1xufSkoRGVmaW5pdGlvblJlcXVlc3QgPSBleHBvcnRzLkRlZmluaXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLkRlZmluaXRpb25SZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgcHJvamVjdC13aWRlIHJlZmVyZW5jZXMgZm9yIHRoZSBzeW1ib2wgZGVub3RlZFxuICogYnkgdGhlIGdpdmVuIHRleHQgZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mXG4gKiB0eXBlIHtAbGluayBSZWZlcmVuY2VQYXJhbXN9IHRoZSByZXNwb25zZSBpcyBvZiB0eXBlXG4gKiB7QGxpbmsgTG9jYXRpb24gTG9jYXRpb25bXX0gb3IgYSBUaGVuYWJsZSB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBSZWZlcmVuY2VzUmVxdWVzdDtcbihmdW5jdGlvbiAoUmVmZXJlbmNlc1JlcXVlc3QpIHtcbiAgICBSZWZlcmVuY2VzUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3JlZmVyZW5jZXMnO1xuICAgIFJlZmVyZW5jZXNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgUmVmZXJlbmNlc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoUmVmZXJlbmNlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFJlZmVyZW5jZXNSZXF1ZXN0ID0gZXhwb3J0cy5SZWZlcmVuY2VzUmVxdWVzdCB8fCAoZXhwb3J0cy5SZWZlcmVuY2VzUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVzb2x2ZSBhIHtAbGluayBEb2N1bWVudEhpZ2hsaWdodH0gZm9yIGEgZ2l2ZW5cbiAqIHRleHQgZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mIHR5cGUgW1RleHREb2N1bWVudFBvc2l0aW9uXVxuICogKCNUZXh0RG9jdW1lbnRQb3NpdGlvbikgdGhlIHJlcXVlc3QgcmVzcG9uc2UgaXMgb2YgdHlwZSBbRG9jdW1lbnRIaWdobGlnaHRbXV1cbiAqICgjRG9jdW1lbnRIaWdobGlnaHQpIG9yIGEgVGhlbmFibGUgdGhhdCByZXNvbHZlcyB0byBzdWNoLlxuICovXG52YXIgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodFJlcXVlc3QpIHtcbiAgICBEb2N1bWVudEhpZ2hsaWdodFJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudEhpZ2hsaWdodCc7XG4gICAgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50SGlnaGxpZ2h0UmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudEhpZ2hsaWdodFJlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRIaWdobGlnaHRSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIGxpc3QgYWxsIHN5bWJvbHMgZm91bmQgaW4gYSBnaXZlbiB0ZXh0IGRvY3VtZW50LiBUaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgVGV4dERvY3VtZW50SWRlbnRpZmllcn0gdGhlXG4gKiByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBTeW1ib2xJbmZvcm1hdGlvbiBTeW1ib2xJbmZvcm1hdGlvbltdfSBvciBhIFRoZW5hYmxlXG4gKiB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBEb2N1bWVudFN5bWJvbFJlcXVlc3Q7XG4oZnVuY3Rpb24gKERvY3VtZW50U3ltYm9sUmVxdWVzdCkge1xuICAgIERvY3VtZW50U3ltYm9sUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2RvY3VtZW50U3ltYm9sJztcbiAgICBEb2N1bWVudFN5bWJvbFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudFN5bWJvbFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRTeW1ib2xSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudFN5bWJvbFJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50U3ltYm9sUmVxdWVzdCB8fCAoZXhwb3J0cy5Eb2N1bWVudFN5bWJvbFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBjb21tYW5kcyBmb3IgdGhlIGdpdmVuIHRleHQgZG9jdW1lbnQgYW5kIHJhbmdlLlxuICovXG52YXIgQ29kZUFjdGlvblJlcXVlc3Q7XG4oZnVuY3Rpb24gKENvZGVBY3Rpb25SZXF1ZXN0KSB7XG4gICAgQ29kZUFjdGlvblJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9jb2RlQWN0aW9uJztcbiAgICBDb2RlQWN0aW9uUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvZGVBY3Rpb25SZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKENvZGVBY3Rpb25SZXF1ZXN0Lm1ldGhvZCk7XG59KShDb2RlQWN0aW9uUmVxdWVzdCA9IGV4cG9ydHMuQ29kZUFjdGlvblJlcXVlc3QgfHwgKGV4cG9ydHMuQ29kZUFjdGlvblJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBSZXF1ZXN0IHRvIHJlc29sdmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgYSBnaXZlbiBjb2RlIGFjdGlvbi5UaGUgcmVxdWVzdCdzXG4gKiBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgQ29kZUFjdGlvbn0gdGhlIHJlc3BvbnNlXG4gKiBpcyBvZiB0eXBlIHtAbGluayBDb2RlQWN0aW9ufSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29kZUFjdGlvblJlc29sdmVSZXF1ZXN0KSB7XG4gICAgQ29kZUFjdGlvblJlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICdjb2RlQWN0aW9uL3Jlc29sdmUnO1xuICAgIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShDb2RlQWN0aW9uUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKENvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdCA9IGV4cG9ydHMuQ29kZUFjdGlvblJlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLkNvZGVBY3Rpb25SZXNvbHZlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBsaXN0IHByb2plY3Qtd2lkZSBzeW1ib2xzIG1hdGNoaW5nIHRoZSBxdWVyeSBzdHJpbmcgZ2l2ZW5cbiAqIGJ5IHRoZSB7QGxpbmsgV29ya3NwYWNlU3ltYm9sUGFyYW1zfS4gVGhlIHJlc3BvbnNlIGlzXG4gKiBvZiB0eXBlIHtAbGluayBTeW1ib2xJbmZvcm1hdGlvbiBTeW1ib2xJbmZvcm1hdGlvbltdfSBvciBhIFRoZW5hYmxlIHRoYXRcbiAqIHJlc29sdmVzIHRvIHN1Y2guXG4gKlxuICogQHNpbmNlIDMuMTcuMCAtIHN1cHBvcnQgZm9yIFdvcmtzcGFjZVN5bWJvbCBpbiB0aGUgcmV0dXJuZWQgZGF0YS4gQ2xpZW50c1xuICogIG5lZWQgdG8gYWR2ZXJ0aXNlIHN1cHBvcnQgZm9yIFdvcmtzcGFjZVN5bWJvbHMgdmlhIHRoZSBjbGllbnQgY2FwYWJpbGl0eVxuICogIGB3b3Jrc3BhY2Uuc3ltYm9sLnJlc29sdmVTdXBwb3J0YC5cbiAqXG4gKi9cbnZhciBXb3Jrc3BhY2VTeW1ib2xSZXF1ZXN0O1xuKGZ1bmN0aW9uIChXb3Jrc3BhY2VTeW1ib2xSZXF1ZXN0KSB7XG4gICAgV29ya3NwYWNlU3ltYm9sUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL3N5bWJvbCc7XG4gICAgV29ya3NwYWNlU3ltYm9sUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFdvcmtzcGFjZVN5bWJvbFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoV29ya3NwYWNlU3ltYm9sUmVxdWVzdC5tZXRob2QpO1xufSkoV29ya3NwYWNlU3ltYm9sUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlU3ltYm9sUmVxdWVzdCB8fCAoZXhwb3J0cy5Xb3Jrc3BhY2VTeW1ib2xSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgdGhlIHJhbmdlIGluc2lkZSB0aGUgd29ya3NwYWNlXG4gKiBzeW1ib2wncyBsb2NhdGlvbi5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdDtcbihmdW5jdGlvbiAoV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QpIHtcbiAgICBXb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlU3ltYm9sL3Jlc29sdmUnO1xuICAgIFdvcmtzcGFjZVN5bWJvbFJlc29sdmVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoV29ya3NwYWNlU3ltYm9sUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKFdvcmtzcGFjZVN5bWJvbFJlc29sdmVSZXF1ZXN0ID0gZXhwb3J0cy5Xb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdCB8fCAoZXhwb3J0cy5Xb3Jrc3BhY2VTeW1ib2xSZXNvbHZlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIGNvZGUgbGVucyBmb3IgdGhlIGdpdmVuIHRleHQgZG9jdW1lbnQuXG4gKi9cbnZhciBDb2RlTGVuc1JlcXVlc3Q7XG4oZnVuY3Rpb24gKENvZGVMZW5zUmVxdWVzdCkge1xuICAgIENvZGVMZW5zUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L2NvZGVMZW5zJztcbiAgICBDb2RlTGVuc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBDb2RlTGVuc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoQ29kZUxlbnNSZXF1ZXN0Lm1ldGhvZCk7XG59KShDb2RlTGVuc1JlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVxdWVzdCB8fCAoZXhwb3J0cy5Db2RlTGVuc1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcmVzb2x2ZSBhIGNvbW1hbmQgZm9yIGEgZ2l2ZW4gY29kZSBsZW5zLlxuICovXG52YXIgQ29kZUxlbnNSZXNvbHZlUmVxdWVzdDtcbihmdW5jdGlvbiAoQ29kZUxlbnNSZXNvbHZlUmVxdWVzdCkge1xuICAgIENvZGVMZW5zUmVzb2x2ZVJlcXVlc3QubWV0aG9kID0gJ2NvZGVMZW5zL3Jlc29sdmUnO1xuICAgIENvZGVMZW5zUmVzb2x2ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBDb2RlTGVuc1Jlc29sdmVSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKENvZGVMZW5zUmVzb2x2ZVJlcXVlc3QubWV0aG9kKTtcbn0pKENvZGVMZW5zUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkNvZGVMZW5zUmVzb2x2ZVJlcXVlc3QgfHwgKGV4cG9ydHMuQ29kZUxlbnNSZXNvbHZlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZWZyZXNoIGFsbCBjb2RlIGFjdGlvbnNcbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0O1xuKGZ1bmN0aW9uIChDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0KSB7XG4gICAgQ29kZUxlbnNSZWZyZXNoUmVxdWVzdC5tZXRob2QgPSBgd29ya3NwYWNlL2NvZGVMZW5zL3JlZnJlc2hgO1xuICAgIENvZGVMZW5zUmVmcmVzaFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5zZXJ2ZXJUb0NsaWVudDtcbiAgICBDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlMChDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0Lm1ldGhvZCk7XG59KShDb2RlTGVuc1JlZnJlc2hSZXF1ZXN0ID0gZXhwb3J0cy5Db2RlTGVuc1JlZnJlc2hSZXF1ZXN0IHx8IChleHBvcnRzLkNvZGVMZW5zUmVmcmVzaFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gcHJvdmlkZSBkb2N1bWVudCBsaW5rc1xuICovXG52YXIgRG9jdW1lbnRMaW5rUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRMaW5rUmVxdWVzdCkge1xuICAgIERvY3VtZW50TGlua1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9kb2N1bWVudExpbmsnO1xuICAgIERvY3VtZW50TGlua1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudExpbmtSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKERvY3VtZW50TGlua1JlcXVlc3QubWV0aG9kKTtcbn0pKERvY3VtZW50TGlua1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50TGlua1JlcXVlc3QgfHwgKGV4cG9ydHMuRG9jdW1lbnRMaW5rUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFJlcXVlc3QgdG8gcmVzb2x2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciBhIGdpdmVuIGRvY3VtZW50IGxpbmsuIFRoZSByZXF1ZXN0J3NcbiAqIHBhcmFtZXRlciBpcyBvZiB0eXBlIHtAbGluayBEb2N1bWVudExpbmt9IHRoZSByZXNwb25zZVxuICogaXMgb2YgdHlwZSB7QGxpbmsgRG9jdW1lbnRMaW5rfSBvciBhIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIERvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChEb2N1bWVudExpbmtSZXNvbHZlUmVxdWVzdCkge1xuICAgIERvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0Lm1ldGhvZCA9ICdkb2N1bWVudExpbmsvcmVzb2x2ZSc7XG4gICAgRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudExpbmtSZXNvbHZlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEb2N1bWVudExpbmtSZXNvbHZlUmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRMaW5rUmVzb2x2ZVJlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50TGlua1Jlc29sdmVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHRvIGZvcm1hdCBhIHdob2xlIGRvY3VtZW50LlxuICovXG52YXIgRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdCkge1xuICAgIERvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9mb3JtYXR0aW5nJztcbiAgICBEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRG9jdW1lbnRGb3JtYXR0aW5nUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0ID0gZXhwb3J0cy5Eb2N1bWVudEZvcm1hdHRpbmdSZXF1ZXN0IHx8IChleHBvcnRzLkRvY3VtZW50Rm9ybWF0dGluZ1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gdG8gZm9ybWF0IGEgcmFuZ2UgaW4gYSBkb2N1bWVudC5cbiAqL1xudmFyIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdDtcbihmdW5jdGlvbiAoRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0KSB7XG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcmFuZ2VGb3JtYXR0aW5nJztcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCk7XG59KShEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QgPSBleHBvcnRzLkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdCB8fCAoZXhwb3J0cy5Eb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3QgdG8gZm9ybWF0IGEgZG9jdW1lbnQgb24gdHlwZS5cbiAqL1xudmFyIERvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3Q7XG4oZnVuY3Rpb24gKERvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QpIHtcbiAgICBEb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvb25UeXBlRm9ybWF0dGluZyc7XG4gICAgRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERvY3VtZW50T25UeXBlRm9ybWF0dGluZ1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdC5tZXRob2QpO1xufSkoRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdCA9IGV4cG9ydHMuRG9jdW1lbnRPblR5cGVGb3JtYXR0aW5nUmVxdWVzdCB8fCAoZXhwb3J0cy5Eb2N1bWVudE9uVHlwZUZvcm1hdHRpbmdSZXF1ZXN0ID0ge30pKTtcbi8vLS0tLSBSZW5hbWUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudmFyIFByZXBhcmVTdXBwb3J0RGVmYXVsdEJlaGF2aW9yO1xuKGZ1bmN0aW9uIChQcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQncyBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHNlbGVjdCB0aGUgaWRlbnRpZmllclxuICAgICAqIGFjY29yZGluZyB0aGUgdG8gbGFuZ3VhZ2UncyBzeW50YXggcnVsZS5cbiAgICAgKi9cbiAgICBQcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvci5JZGVudGlmaWVyID0gMTtcbn0pKFByZXBhcmVTdXBwb3J0RGVmYXVsdEJlaGF2aW9yID0gZXhwb3J0cy5QcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvciB8fCAoZXhwb3J0cy5QcmVwYXJlU3VwcG9ydERlZmF1bHRCZWhhdmlvciA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZW5hbWUgYSBzeW1ib2wuXG4gKi9cbnZhciBSZW5hbWVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChSZW5hbWVSZXF1ZXN0KSB7XG4gICAgUmVuYW1lUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3JlbmFtZSc7XG4gICAgUmVuYW1lUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFJlbmFtZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoUmVuYW1lUmVxdWVzdC5tZXRob2QpO1xufSkoUmVuYW1lUmVxdWVzdCA9IGV4cG9ydHMuUmVuYW1lUmVxdWVzdCB8fCAoZXhwb3J0cy5SZW5hbWVSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHRlc3QgYW5kIHBlcmZvcm0gdGhlIHNldHVwIG5lY2Vzc2FyeSBmb3IgYSByZW5hbWUuXG4gKlxuICogQHNpbmNlIDMuMTYgLSBzdXBwb3J0IGZvciBkZWZhdWx0IGJlaGF2aW9yXG4gKi9cbnZhciBQcmVwYXJlUmVuYW1lUmVxdWVzdDtcbihmdW5jdGlvbiAoUHJlcGFyZVJlbmFtZVJlcXVlc3QpIHtcbiAgICBQcmVwYXJlUmVuYW1lUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3ByZXBhcmVSZW5hbWUnO1xuICAgIFByZXBhcmVSZW5hbWVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgUHJlcGFyZVJlbmFtZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoUHJlcGFyZVJlbmFtZVJlcXVlc3QubWV0aG9kKTtcbn0pKFByZXBhcmVSZW5hbWVSZXF1ZXN0ID0gZXhwb3J0cy5QcmVwYXJlUmVuYW1lUmVxdWVzdCB8fCAoZXhwb3J0cy5QcmVwYXJlUmVuYW1lUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCBzZW5kIGZyb20gdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHRvIGV4ZWN1dGUgYSBjb21tYW5kLiBUaGUgcmVxdWVzdCBtaWdodCByZXR1cm5cbiAqIGEgd29ya3NwYWNlIGVkaXQgd2hpY2ggdGhlIGNsaWVudCB3aWxsIGFwcGx5IHRvIHRoZSB3b3Jrc3BhY2UuXG4gKi9cbnZhciBFeGVjdXRlQ29tbWFuZFJlcXVlc3Q7XG4oZnVuY3Rpb24gKEV4ZWN1dGVDb21tYW5kUmVxdWVzdCkge1xuICAgIEV4ZWN1dGVDb21tYW5kUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL2V4ZWN1dGVDb21tYW5kJztcbiAgICBFeGVjdXRlQ29tbWFuZFJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBFeGVjdXRlQ29tbWFuZFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoRXhlY3V0ZUNvbW1hbmRSZXF1ZXN0Lm1ldGhvZCk7XG59KShFeGVjdXRlQ29tbWFuZFJlcXVlc3QgPSBleHBvcnRzLkV4ZWN1dGVDb21tYW5kUmVxdWVzdCB8fCAoZXhwb3J0cy5FeGVjdXRlQ29tbWFuZFJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBBIHJlcXVlc3Qgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byBtb2RpZmllZCBjZXJ0YWluIHJlc291cmNlcy5cbiAqL1xudmFyIEFwcGx5V29ya3NwYWNlRWRpdFJlcXVlc3Q7XG4oZnVuY3Rpb24gKEFwcGx5V29ya3NwYWNlRWRpdFJlcXVlc3QpIHtcbiAgICBBcHBseVdvcmtzcGFjZUVkaXRSZXF1ZXN0Lm1ldGhvZCA9ICd3b3Jrc3BhY2UvYXBwbHlFZGl0JztcbiAgICBBcHBseVdvcmtzcGFjZUVkaXRSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZSgnd29ya3NwYWNlL2FwcGx5RWRpdCcpO1xufSkoQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdCA9IGV4cG9ydHMuQXBwbHlXb3Jrc3BhY2VFZGl0UmVxdWVzdCB8fCAoZXhwb3J0cy5BcHBseVdvcmtzcGFjZUVkaXRSZXF1ZXN0ID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIHJhbmdlcyB0aGF0IGNhbiBiZSBlZGl0ZWQgdG9nZXRoZXIuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdDtcbihmdW5jdGlvbiAoTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCkge1xuICAgIExpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QubWV0aG9kID0gJ3RleHREb2N1bWVudC9saW5rZWRFZGl0aW5nUmFuZ2UnO1xuICAgIExpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBMaW5rZWRFZGl0aW5nUmFuZ2VSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKExpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QubWV0aG9kKTtcbn0pKExpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QgPSBleHBvcnRzLkxpbmtlZEVkaXRpbmdSYW5nZVJlcXVlc3QgfHwgKGV4cG9ydHMuTGlua2VkRWRpdGluZ1JhbmdlUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTW9uaWtlclJlcXVlc3QgPSBleHBvcnRzLk1vbmlrZXJLaW5kID0gZXhwb3J0cy5VbmlxdWVuZXNzTGV2ZWwgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIE1vbmlrZXIgdW5pcXVlbmVzcyBsZXZlbCB0byBkZWZpbmUgc2NvcGUgb2YgdGhlIG1vbmlrZXIuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG52YXIgVW5pcXVlbmVzc0xldmVsO1xuKGZ1bmN0aW9uIChVbmlxdWVuZXNzTGV2ZWwpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciBpcyBvbmx5IHVuaXF1ZSBpbnNpZGUgYSBkb2N1bWVudFxuICAgICAqL1xuICAgIFVuaXF1ZW5lc3NMZXZlbC5kb2N1bWVudCA9ICdkb2N1bWVudCc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgaXMgdW5pcXVlIGluc2lkZSBhIHByb2plY3QgZm9yIHdoaWNoIGEgZHVtcCBnb3QgY3JlYXRlZFxuICAgICAqL1xuICAgIFVuaXF1ZW5lc3NMZXZlbC5wcm9qZWN0ID0gJ3Byb2plY3QnO1xuICAgIC8qKlxuICAgICAqIFRoZSBtb25pa2VyIGlzIHVuaXF1ZSBpbnNpZGUgdGhlIGdyb3VwIHRvIHdoaWNoIGEgcHJvamVjdCBiZWxvbmdzXG4gICAgICovXG4gICAgVW5pcXVlbmVzc0xldmVsLmdyb3VwID0gJ2dyb3VwJztcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciBpcyB1bmlxdWUgaW5zaWRlIHRoZSBtb25pa2VyIHNjaGVtZS5cbiAgICAgKi9cbiAgICBVbmlxdWVuZXNzTGV2ZWwuc2NoZW1lID0gJ3NjaGVtZSc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgaXMgZ2xvYmFsbHkgdW5pcXVlXG4gICAgICovXG4gICAgVW5pcXVlbmVzc0xldmVsLmdsb2JhbCA9ICdnbG9iYWwnO1xufSkoVW5pcXVlbmVzc0xldmVsID0gZXhwb3J0cy5VbmlxdWVuZXNzTGV2ZWwgfHwgKGV4cG9ydHMuVW5pcXVlbmVzc0xldmVsID0ge30pKTtcbi8qKlxuICogVGhlIG1vbmlrZXIga2luZC5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBNb25pa2VyS2luZDtcbihmdW5jdGlvbiAoTW9uaWtlcktpbmQpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciByZXByZXNlbnQgYSBzeW1ib2wgdGhhdCBpcyBpbXBvcnRlZCBpbnRvIGEgcHJvamVjdFxuICAgICAqL1xuICAgIE1vbmlrZXJLaW5kLiRpbXBvcnQgPSAnaW1wb3J0JztcbiAgICAvKipcbiAgICAgKiBUaGUgbW9uaWtlciByZXByZXNlbnRzIGEgc3ltYm9sIHRoYXQgaXMgZXhwb3J0ZWQgZnJvbSBhIHByb2plY3RcbiAgICAgKi9cbiAgICBNb25pa2VyS2luZC4kZXhwb3J0ID0gJ2V4cG9ydCc7XG4gICAgLyoqXG4gICAgICogVGhlIG1vbmlrZXIgcmVwcmVzZW50cyBhIHN5bWJvbCB0aGF0IGlzIGxvY2FsIHRvIGEgcHJvamVjdCAoZS5nLiBhIGxvY2FsXG4gICAgICogdmFyaWFibGUgb2YgYSBmdW5jdGlvbiwgYSBjbGFzcyBub3QgdmlzaWJsZSBvdXRzaWRlIHRoZSBwcm9qZWN0LCAuLi4pXG4gICAgICovXG4gICAgTW9uaWtlcktpbmQubG9jYWwgPSAnbG9jYWwnO1xufSkoTW9uaWtlcktpbmQgPSBleHBvcnRzLk1vbmlrZXJLaW5kIHx8IChleHBvcnRzLk1vbmlrZXJLaW5kID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIGdldCB0aGUgbW9uaWtlciBvZiBhIHN5bWJvbCBhdCBhIGdpdmVuIHRleHQgZG9jdW1lbnQgcG9zaXRpb24uXG4gKiBUaGUgcmVxdWVzdCBwYXJhbWV0ZXIgaXMgb2YgdHlwZSB7QGxpbmsgVGV4dERvY3VtZW50UG9zaXRpb25QYXJhbXN9LlxuICogVGhlIHJlc3BvbnNlIGlzIG9mIHR5cGUge0BsaW5rIE1vbmlrZXIgTW9uaWtlcltdfSBvciBgbnVsbGAuXG4gKi9cbnZhciBNb25pa2VyUmVxdWVzdDtcbihmdW5jdGlvbiAoTW9uaWtlclJlcXVlc3QpIHtcbiAgICBNb25pa2VyUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L21vbmlrZXInO1xuICAgIE1vbmlrZXJSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgTW9uaWtlclJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoTW9uaWtlclJlcXVlc3QubWV0aG9kKTtcbn0pKE1vbmlrZXJSZXF1ZXN0ID0gZXhwb3J0cy5Nb25pa2VyUmVxdWVzdCB8fCAoZXhwb3J0cy5Nb25pa2VyUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2UgPSBleHBvcnRzLkRpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLk5vdGVib29rRG9jdW1lbnQgPSBleHBvcnRzLk5vdGVib29rQ2VsbCA9IGV4cG9ydHMuRXhlY3V0aW9uU3VtbWFyeSA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsS2luZCA9IHZvaWQgMDtcbmNvbnN0IHZzY29kZV9sYW5ndWFnZXNlcnZlcl90eXBlc18xID0gcmVxdWlyZShcInZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlc1wiKTtcbmNvbnN0IElzID0gcmVxdWlyZShcIi4vdXRpbHMvaXNcIik7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgbm90ZWJvb2sgY2VsbCBraW5kLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIE5vdGVib29rQ2VsbEtpbmQ7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBIG1hcmt1cC1jZWxsIGlzIGZvcm1hdHRlZCBzb3VyY2UgdGhhdCBpcyB1c2VkIGZvciBkaXNwbGF5LlxuICAgICAqL1xuICAgIE5vdGVib29rQ2VsbEtpbmQuTWFya3VwID0gMTtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUtY2VsbCBpcyBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBOb3RlYm9va0NlbGxLaW5kLkNvZGUgPSAyO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gMjtcbiAgICB9XG4gICAgTm90ZWJvb2tDZWxsS2luZC5pcyA9IGlzO1xufSkoTm90ZWJvb2tDZWxsS2luZCA9IGV4cG9ydHMuTm90ZWJvb2tDZWxsS2luZCB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGxLaW5kID0ge30pKTtcbnZhciBFeGVjdXRpb25TdW1tYXJ5O1xuKGZ1bmN0aW9uIChFeGVjdXRpb25TdW1tYXJ5KSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGV4ZWN1dGlvbk9yZGVyLCBzdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgZXhlY3V0aW9uT3JkZXIgfTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MgPT09IHRydWUgfHwgc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdWNjZXNzID0gc3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBFeGVjdXRpb25TdW1tYXJ5LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiB2c2NvZGVfbGFuZ3VhZ2VzZXJ2ZXJfdHlwZXNfMS51aW50ZWdlci5pcyhjYW5kaWRhdGUuZXhlY3V0aW9uT3JkZXIpICYmIChjYW5kaWRhdGUuc3VjY2VzcyA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLnN1Y2Nlc3MpKTtcbiAgICB9XG4gICAgRXhlY3V0aW9uU3VtbWFyeS5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGVxdWFscyhvbmUsIG90aGVyKSB7XG4gICAgICAgIGlmIChvbmUgPT09IG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lID09PSBudWxsIHx8IG9uZSA9PT0gdW5kZWZpbmVkIHx8IG90aGVyID09PSBudWxsIHx8IG90aGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb25lLmV4ZWN1dGlvbk9yZGVyID09PSBvdGhlci5leGVjdXRpb25PcmRlciAmJiBvbmUuc3VjY2VzcyA9PT0gb3RoZXIuc3VjY2VzcztcbiAgICB9XG4gICAgRXhlY3V0aW9uU3VtbWFyeS5lcXVhbHMgPSBlcXVhbHM7XG59KShFeGVjdXRpb25TdW1tYXJ5ID0gZXhwb3J0cy5FeGVjdXRpb25TdW1tYXJ5IHx8IChleHBvcnRzLkV4ZWN1dGlvblN1bW1hcnkgPSB7fSkpO1xudmFyIE5vdGVib29rQ2VsbDtcbihmdW5jdGlvbiAoTm90ZWJvb2tDZWxsKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGtpbmQsIGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiB7IGtpbmQsIGRvY3VtZW50IH07XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgTm90ZWJvb2tDZWxsS2luZC5pcyhjYW5kaWRhdGUua2luZCkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEuRG9jdW1lbnRVcmkuaXMoY2FuZGlkYXRlLmRvY3VtZW50KSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5tZXRhZGF0YSA9PT0gdW5kZWZpbmVkIHx8IElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlLm1ldGFkYXRhKSk7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbC5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGRpZmYob25lLCB0d28pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBpZiAob25lLmRvY3VtZW50ICE9PSB0d28uZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hZGQoJ2RvY3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZS5raW5kICE9PSB0d28ua2luZCkge1xuICAgICAgICAgICAgcmVzdWx0LmFkZCgna2luZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmUuZXhlY3V0aW9uU3VtbWFyeSAhPT0gdHdvLmV4ZWN1dGlvblN1bW1hcnkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hZGQoJ2V4ZWN1dGlvblN1bW1hcnknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9uZS5tZXRhZGF0YSAhPT0gdW5kZWZpbmVkIHx8IHR3by5tZXRhZGF0YSAhPT0gdW5kZWZpbmVkKSAmJiAhZXF1YWxzTWV0YWRhdGEob25lLm1ldGFkYXRhLCB0d28ubWV0YWRhdGEpKSB7XG4gICAgICAgICAgICByZXN1bHQuYWRkKCdtZXRhZGF0YScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob25lLmV4ZWN1dGlvblN1bW1hcnkgIT09IHVuZGVmaW5lZCB8fCB0d28uZXhlY3V0aW9uU3VtbWFyeSAhPT0gdW5kZWZpbmVkKSAmJiAhRXhlY3V0aW9uU3VtbWFyeS5lcXVhbHMob25lLmV4ZWN1dGlvblN1bW1hcnksIHR3by5leGVjdXRpb25TdW1tYXJ5KSkge1xuICAgICAgICAgICAgcmVzdWx0LmFkZCgnZXhlY3V0aW9uU3VtbWFyeScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbC5kaWZmID0gZGlmZjtcbiAgICBmdW5jdGlvbiBlcXVhbHNNZXRhZGF0YShvbmUsIG90aGVyKSB7XG4gICAgICAgIGlmIChvbmUgPT09IG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lID09PSBudWxsIHx8IG9uZSA9PT0gdW5kZWZpbmVkIHx8IG90aGVyID09PSBudWxsIHx8IG90aGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9uZSAhPT0gdHlwZW9mIG90aGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvbmUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb25lQXJyYXkgPSBBcnJheS5pc0FycmF5KG9uZSk7XG4gICAgICAgIGNvbnN0IG90aGVyQXJyYXkgPSBBcnJheS5pc0FycmF5KG90aGVyKTtcbiAgICAgICAgaWYgKG9uZUFycmF5ICE9PSBvdGhlckFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZUFycmF5ICYmIG90aGVyQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChvbmUubGVuZ3RoICE9PSBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzTWV0YWRhdGEob25lW2ldLCBvdGhlcltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMub2JqZWN0TGl0ZXJhbChvbmUpICYmIElzLm9iamVjdExpdGVyYWwob3RoZXIpKSB7XG4gICAgICAgICAgICBjb25zdCBvbmVLZXlzID0gT2JqZWN0LmtleXMob25lKTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyS2V5cyA9IE9iamVjdC5rZXlzKG90aGVyKTtcbiAgICAgICAgICAgIGlmIChvbmVLZXlzLmxlbmd0aCAhPT0gb3RoZXJLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uZUtleXMuc29ydCgpO1xuICAgICAgICAgICAgb3RoZXJLZXlzLnNvcnQoKTtcbiAgICAgICAgICAgIGlmICghZXF1YWxzTWV0YWRhdGEob25lS2V5cywgb3RoZXJLZXlzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSBvbmVLZXlzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzTWV0YWRhdGEob25lW3Byb3BdLCBvdGhlcltwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KShOb3RlYm9va0NlbGwgPSBleHBvcnRzLk5vdGVib29rQ2VsbCB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGwgPSB7fSkpO1xudmFyIE5vdGVib29rRG9jdW1lbnQ7XG4oZnVuY3Rpb24gKE5vdGVib29rRG9jdW1lbnQpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBub3RlYm9va1R5cGUsIHZlcnNpb24sIGNlbGxzKSB7XG4gICAgICAgIHJldHVybiB7IHVyaSwgbm90ZWJvb2tUeXBlLCB2ZXJzaW9uLCBjZWxscyB9O1xuICAgIH1cbiAgICBOb3RlYm9va0RvY3VtZW50LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEuaW50ZWdlci5pcyhjYW5kaWRhdGUudmVyc2lvbikgJiYgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuY2VsbHMsIE5vdGVib29rQ2VsbC5pcyk7XG4gICAgfVxuICAgIE5vdGVib29rRG9jdW1lbnQuaXMgPSBpcztcbn0pKE5vdGVib29rRG9jdW1lbnQgPSBleHBvcnRzLk5vdGVib29rRG9jdW1lbnQgfHwgKGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudCA9IHt9KSk7XG52YXIgTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlO1xuKGZ1bmN0aW9uIChOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUpIHtcbiAgICBOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUubWV0aG9kID0gJ25vdGVib29rRG9jdW1lbnQvc3luYyc7XG4gICAgTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5SZWdpc3RyYXRpb25UeXBlKE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZS5tZXRob2QpO1xufSkoTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlID0gZXhwb3J0cy5Ob3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUgfHwgKGV4cG9ydHMuTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlID0ge30pKTtcbi8qKlxuICogQSBub3RpZmljYXRpb24gc2VudCB3aGVuIGEgbm90ZWJvb2sgb3BlbnMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb247XG4oZnVuY3Rpb24gKERpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ25vdGVib29rRG9jdW1lbnQvZGlkT3Blbic7XG4gICAgRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCk7XG4gICAgRGlkT3Blbk5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ucmVnaXN0cmF0aW9uTWV0aG9kID0gTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKERpZE9wZW5Ob3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRPcGVuTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IHt9KSk7XG52YXIgTm90ZWJvb2tDZWxsQXJyYXlDaGFuZ2U7XG4oZnVuY3Rpb24gKE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgdnNjb2RlX2xhbmd1YWdlc2VydmVyX3R5cGVzXzEudWludGVnZXIuaXMoY2FuZGlkYXRlLnN0YXJ0KSAmJiB2c2NvZGVfbGFuZ3VhZ2VzZXJ2ZXJfdHlwZXNfMS51aW50ZWdlci5pcyhjYW5kaWRhdGUuZGVsZXRlQ291bnQpICYmIChjYW5kaWRhdGUuY2VsbHMgPT09IHVuZGVmaW5lZCB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5jZWxscywgTm90ZWJvb2tDZWxsLmlzKSk7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXJ0LCBkZWxldGVDb3VudCwgY2VsbHMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyBzdGFydCwgZGVsZXRlQ291bnQgfTtcbiAgICAgICAgaWYgKGNlbGxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jZWxscyA9IGNlbGxzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKE5vdGVib29rQ2VsbEFycmF5Q2hhbmdlID0gZXhwb3J0cy5Ob3RlYm9va0NlbGxBcnJheUNoYW5nZSB8fCAoZXhwb3J0cy5Ob3RlYm9va0NlbGxBcnJheUNoYW5nZSA9IHt9KSk7XG52YXIgRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbikge1xuICAgIERpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kID0gJ25vdGVib29rRG9jdW1lbnQvZGlkQ2hhbmdlJztcbiAgICBEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgRGlkQ2hhbmdlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKERpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbiAgICBEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLnJlZ2lzdHJhdGlvbk1ldGhvZCA9IE5vdGVib29rRG9jdW1lbnRTeW5jUmVnaXN0cmF0aW9uVHlwZS5tZXRob2Q7XG59KShEaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5EaWRDaGFuZ2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZENoYW5nZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBBIG5vdGlmaWNhdGlvbiBzZW50IHdoZW4gYSBub3RlYm9vayBkb2N1bWVudCBpcyBzYXZlZC5cbiAqXG4gKiBAc2luY2UgMy4xNy4wXG4gKi9cbnZhciBEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkU2F2ZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24pIHtcbiAgICBEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXRob2QgPSAnbm90ZWJvb2tEb2N1bWVudC9kaWRTYXZlJztcbiAgICBEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIERpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkU2F2ZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbiAgICBEaWRTYXZlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbi5yZWdpc3RyYXRpb25NZXRob2QgPSBOb3RlYm9va0RvY3VtZW50U3luY1JlZ2lzdHJhdGlvblR5cGUubWV0aG9kO1xufSkoRGlkU2F2ZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24gPSBleHBvcnRzLkRpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZFNhdmVOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uID0ge30pKTtcbi8qKlxuICogQSBub3RpZmljYXRpb24gc2VudCB3aGVuIGEgbm90ZWJvb2sgY2xvc2VzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIERpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbjtcbihmdW5jdGlvbiAoRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uKSB7XG4gICAgRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uLm1ldGhvZCA9ICdub3RlYm9va0RvY3VtZW50L2RpZENsb3NlJztcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24udHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sTm90aWZpY2F0aW9uVHlwZShEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ubWV0aG9kKTtcbiAgICBEaWRDbG9zZU5vdGVib29rRG9jdW1lbnROb3RpZmljYXRpb24ucmVnaXN0cmF0aW9uTWV0aG9kID0gTm90ZWJvb2tEb2N1bWVudFN5bmNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKERpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2xvc2VOb3RlYm9va0RvY3VtZW50Tm90aWZpY2F0aW9uIHx8IChleHBvcnRzLkRpZENsb3NlTm90ZWJvb2tEb2N1bWVudE5vdGlmaWNhdGlvbiA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QgPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3MgPSB2b2lkIDA7XG5jb25zdCB2c2NvZGVfanNvbnJwY18xID0gcmVxdWlyZShcInZzY29kZS1qc29ucnBjXCIpO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xudmFyIFdvcmtEb25lUHJvZ3Jlc3M7XG4oZnVuY3Rpb24gKFdvcmtEb25lUHJvZ3Jlc3MpIHtcbiAgICBXb3JrRG9uZVByb2dyZXNzLnR5cGUgPSBuZXcgdnNjb2RlX2pzb25ycGNfMS5Qcm9ncmVzc1R5cGUoKTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IFdvcmtEb25lUHJvZ3Jlc3MudHlwZTtcbiAgICB9XG4gICAgV29ya0RvbmVQcm9ncmVzcy5pcyA9IGlzO1xufSkoV29ya0RvbmVQcm9ncmVzcyA9IGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzcyB8fCAoZXhwb3J0cy5Xb3JrRG9uZVByb2dyZXNzID0ge30pKTtcbi8qKlxuICogVGhlIGB3aW5kb3cvd29ya0RvbmVQcm9ncmVzcy9jcmVhdGVgIHJlcXVlc3QgaXMgc2VudCBmcm9tIHRoZSBzZXJ2ZXIgdG8gdGhlIGNsaWVudCB0byBpbml0aWF0ZSBwcm9ncmVzc1xuICogcmVwb3J0aW5nIGZyb20gdGhlIHNlcnZlci5cbiAqL1xudmFyIFdvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0O1xuKGZ1bmN0aW9uIChXb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdCkge1xuICAgIFdvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0Lm1ldGhvZCA9ICd3aW5kb3cvd29ya0RvbmVQcm9ncmVzcy9jcmVhdGUnO1xuICAgIFdvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoV29ya0RvbmVQcm9ncmVzc0NyZWF0ZVJlcXVlc3QubWV0aG9kKTtcbn0pKFdvcmtEb25lUHJvZ3Jlc3NDcmVhdGVSZXF1ZXN0ID0gZXhwb3J0cy5Xb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdCB8fCAoZXhwb3J0cy5Xb3JrRG9uZVByb2dyZXNzQ3JlYXRlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBgd2luZG93L3dvcmtEb25lUHJvZ3Jlc3MvY2FuY2VsYCBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tICB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgdG8gY2FuY2VsIGEgcHJvZ3Jlc3NcbiAqIGluaXRpYXRlZCBvbiB0aGUgc2VydmVyIHNpZGUuXG4gKi9cbnZhciBXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uKSB7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbi5tZXRob2QgPSAnd2luZG93L3dvcmtEb25lUHJvZ3Jlc3MvY2FuY2VsJztcbiAgICBXb3JrRG9uZVByb2dyZXNzQ2FuY2VsTm90aWZpY2F0aW9uLm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbi50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xOb3RpZmljYXRpb25UeXBlKFdvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24ubWV0aG9kKTtcbn0pKFdvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gPSBleHBvcnRzLldvcmtEb25lUHJvZ3Jlc3NDYW5jZWxOb3RpZmljYXRpb24gfHwgKGV4cG9ydHMuV29ya0RvbmVQcm9ncmVzc0NhbmNlbE5vdGlmaWNhdGlvbiA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZWxlY3Rpb25SYW5nZVJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIEEgcmVxdWVzdCB0byBwcm92aWRlIHNlbGVjdGlvbiByYW5nZXMgaW4gYSBkb2N1bWVudC4gVGhlIHJlcXVlc3Qnc1xuICogcGFyYW1ldGVyIGlzIG9mIHR5cGUge0BsaW5rIFNlbGVjdGlvblJhbmdlUGFyYW1zfSwgdGhlXG4gKiByZXNwb25zZSBpcyBvZiB0eXBlIHtAbGluayBTZWxlY3Rpb25SYW5nZSBTZWxlY3Rpb25SYW5nZVtdfSBvciBhIFRoZW5hYmxlXG4gKiB0aGF0IHJlc29sdmVzIHRvIHN1Y2guXG4gKi9cbnZhciBTZWxlY3Rpb25SYW5nZVJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNlbGVjdGlvblJhbmdlUmVxdWVzdCkge1xuICAgIFNlbGVjdGlvblJhbmdlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbGVjdGlvblJhbmdlJztcbiAgICBTZWxlY3Rpb25SYW5nZVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBTZWxlY3Rpb25SYW5nZVJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUoU2VsZWN0aW9uUmFuZ2VSZXF1ZXN0Lm1ldGhvZCk7XG59KShTZWxlY3Rpb25SYW5nZVJlcXVlc3QgPSBleHBvcnRzLlNlbGVjdGlvblJhbmdlUmVxdWVzdCB8fCAoZXhwb3J0cy5TZWxlY3Rpb25SYW5nZVJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLlRva2VuRm9ybWF0ID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xuLy8tLS0tLS0tICd0ZXh0RG9jdW1lbnQvc2VtYW50aWNUb2tlbnMnIC0tLS0tXG52YXIgVG9rZW5Gb3JtYXQ7XG4oZnVuY3Rpb24gKFRva2VuRm9ybWF0KSB7XG4gICAgVG9rZW5Gb3JtYXQuUmVsYXRpdmUgPSAncmVsYXRpdmUnO1xufSkoVG9rZW5Gb3JtYXQgPSBleHBvcnRzLlRva2VuRm9ybWF0IHx8IChleHBvcnRzLlRva2VuRm9ybWF0ID0ge30pKTtcbnZhciBTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGU7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZSkge1xuICAgIFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZS5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbWFudGljVG9rZW5zJztcbiAgICBTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUudHlwZSA9IG5ldyBtZXNzYWdlc18xLlJlZ2lzdHJhdGlvblR5cGUoU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZCk7XG59KShTZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZSB8fCAoZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JlZ2lzdHJhdGlvblR5cGUgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBTZW1hbnRpY1Rva2Vuc1JlcXVlc3Q7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zUmVxdWVzdCkge1xuICAgIFNlbWFudGljVG9rZW5zUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbWFudGljVG9rZW5zL2Z1bGwnO1xuICAgIFNlbWFudGljVG9rZW5zUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFNlbWFudGljVG9rZW5zUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShTZW1hbnRpY1Rva2Vuc1JlcXVlc3QubWV0aG9kKTtcbiAgICBTZW1hbnRpY1Rva2Vuc1JlcXVlc3QucmVnaXN0cmF0aW9uTWV0aG9kID0gU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKFNlbWFudGljVG9rZW5zUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZXF1ZXN0IHx8IChleHBvcnRzLlNlbWFudGljVG9rZW5zUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0O1xuKGZ1bmN0aW9uIChTZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdCkge1xuICAgIFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvc2VtYW50aWNUb2tlbnMvZnVsbC9kZWx0YSc7XG4gICAgU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBTZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShTZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdC5tZXRob2QpO1xuICAgIFNlbWFudGljVG9rZW5zRGVsdGFSZXF1ZXN0LnJlZ2lzdHJhdGlvbk1ldGhvZCA9IFNlbWFudGljVG9rZW5zUmVnaXN0cmF0aW9uVHlwZS5tZXRob2Q7XG59KShTZW1hbnRpY1Rva2Vuc0RlbHRhUmVxdWVzdCA9IGV4cG9ydHMuU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QgfHwgKGV4cG9ydHMuU2VtYW50aWNUb2tlbnNEZWx0YVJlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbnZhciBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdDtcbihmdW5jdGlvbiAoU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QpIHtcbiAgICBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdC5tZXRob2QgPSAndGV4dERvY3VtZW50L3NlbWFudGljVG9rZW5zL3JhbmdlJztcbiAgICBTZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0Lm1ldGhvZCk7XG4gICAgU2VtYW50aWNUb2tlbnNSYW5nZVJlcXVlc3QucmVnaXN0cmF0aW9uTWV0aG9kID0gU2VtYW50aWNUb2tlbnNSZWdpc3RyYXRpb25UeXBlLm1ldGhvZDtcbn0pKFNlbWFudGljVG9rZW5zUmFuZ2VSZXF1ZXN0ID0gZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdCB8fCAoZXhwb3J0cy5TZW1hbnRpY1Rva2Vuc1JhbmdlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xudmFyIFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QpIHtcbiAgICBTZW1hbnRpY1Rva2Vuc1JlZnJlc2hSZXF1ZXN0Lm1ldGhvZCA9IGB3b3Jrc3BhY2Uvc2VtYW50aWNUb2tlbnMvcmVmcmVzaGA7XG4gICAgU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLnNlcnZlclRvQ2xpZW50O1xuICAgIFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUwKFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QubWV0aG9kKTtcbn0pKFNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QgPSBleHBvcnRzLlNlbWFudGljVG9rZW5zUmVmcmVzaFJlcXVlc3QgfHwgKGV4cG9ydHMuU2VtYW50aWNUb2tlbnNSZWZyZXNoUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2hvd0RvY3VtZW50UmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHNob3cgYSBkb2N1bWVudC4gVGhpcyByZXF1ZXN0IG1pZ2h0IG9wZW4gYW5cbiAqIGV4dGVybmFsIHByb2dyYW0gZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSBvZiB0aGUgVVJJIHRvIG9wZW4uXG4gKiBGb3IgZXhhbXBsZSBhIHJlcXVlc3QgdG8gb3BlbiBgaHR0cHM6Ly9jb2RlLnZpc3VhbHN0dWRpby5jb20vYFxuICogd2lsbCB2ZXJ5IGxpa2VseSBvcGVuIHRoZSBVUkkgaW4gYSBXRUIgYnJvd3Nlci5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4qL1xudmFyIFNob3dEb2N1bWVudFJlcXVlc3Q7XG4oZnVuY3Rpb24gKFNob3dEb2N1bWVudFJlcXVlc3QpIHtcbiAgICBTaG93RG9jdW1lbnRSZXF1ZXN0Lm1ldGhvZCA9ICd3aW5kb3cvc2hvd0RvY3VtZW50JztcbiAgICBTaG93RG9jdW1lbnRSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgU2hvd0RvY3VtZW50UmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShTaG93RG9jdW1lbnRSZXF1ZXN0Lm1ldGhvZCk7XG59KShTaG93RG9jdW1lbnRSZXF1ZXN0ID0gZXhwb3J0cy5TaG93RG9jdW1lbnRSZXF1ZXN0IHx8IChleHBvcnRzLlNob3dEb2N1bWVudFJlcXVlc3QgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8vIEB0cy1pZ25vcmU6IHRvIGF2b2lkIGlubGluaW5nIExvY2F0aW9MaW5rIGFzIGR5bmFtaWMgaW1wb3J0XG5sZXQgX19ub0R5bmFtaWNJbXBvcnQ7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSB0eXBlIGRlZmluaXRpb24gbG9jYXRpb25zIG9mIGEgc3ltYm9sIGF0IGEgZ2l2ZW4gdGV4dFxuICogZG9jdW1lbnQgcG9zaXRpb24uIFRoZSByZXF1ZXN0J3MgcGFyYW1ldGVyIGlzIG9mIHR5cGUgW1RleHREb2N1bWVudFBvc2l0aW9uUGFyYW1zXVxuICogKCNUZXh0RG9jdW1lbnRQb3NpdGlvblBhcmFtcykgdGhlIHJlc3BvbnNlIGlzIG9mIHR5cGUge0BsaW5rIERlZmluaXRpb259IG9yIGFcbiAqIFRoZW5hYmxlIHRoYXQgcmVzb2x2ZXMgdG8gc3VjaC5cbiAqL1xudmFyIFR5cGVEZWZpbml0aW9uUmVxdWVzdDtcbihmdW5jdGlvbiAoVHlwZURlZmluaXRpb25SZXF1ZXN0KSB7XG4gICAgVHlwZURlZmluaXRpb25SZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvdHlwZURlZmluaXRpb24nO1xuICAgIFR5cGVEZWZpbml0aW9uUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFR5cGVEZWZpbml0aW9uUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShUeXBlRGVmaW5pdGlvblJlcXVlc3QubWV0aG9kKTtcbn0pKFR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IGV4cG9ydHMuVHlwZURlZmluaXRpb25SZXF1ZXN0IHx8IChleHBvcnRzLlR5cGVEZWZpbml0aW9uUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIFR5cGVGb3gsIE1pY3Jvc29mdCBhbmQgb3RoZXJzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0ID0gZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QgPSBleHBvcnRzLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc3VsdCBhIGBUeXBlSGllcmFyY2h5SXRlbWAgaW4gYSBkb2N1bWVudCBhdCBhIGdpdmVuIHBvc2l0aW9uLlxuICogQ2FuIGJlIHVzZWQgYXMgYW4gaW5wdXQgdG8gYSBzdWJ0eXBlcyBvciBzdXBlcnR5cGVzIHR5cGUgaGllcmFyY2h5LlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xudmFyIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdDtcbihmdW5jdGlvbiAoVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0KSB7XG4gICAgVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0Lm1ldGhvZCA9ICd0ZXh0RG9jdW1lbnQvcHJlcGFyZVR5cGVIaWVyYXJjaHknO1xuICAgIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC5tZXNzYWdlRGlyZWN0aW9uID0gbWVzc2FnZXNfMS5NZXNzYWdlRGlyZWN0aW9uLmNsaWVudFRvU2VydmVyO1xuICAgIFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdC50eXBlID0gbmV3IG1lc3NhZ2VzXzEuUHJvdG9jb2xSZXF1ZXN0VHlwZShUeXBlSGllcmFyY2h5UHJlcGFyZVJlcXVlc3QubWV0aG9kKTtcbn0pKFR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IGV4cG9ydHMuVHlwZUhpZXJhcmNoeVByZXBhcmVSZXF1ZXN0IHx8IChleHBvcnRzLlR5cGVIaWVyYXJjaHlQcmVwYXJlUmVxdWVzdCA9IHt9KSk7XG4vKipcbiAqIEEgcmVxdWVzdCB0byByZXNvbHZlIHRoZSBzdXBlcnR5cGVzIGZvciBhIGdpdmVuIGBUeXBlSGllcmFyY2h5SXRlbWAuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0O1xuKGZ1bmN0aW9uIChUeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QpIHtcbiAgICBUeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QubWV0aG9kID0gJ3R5cGVIaWVyYXJjaHkvc3VwZXJ0eXBlcyc7XG4gICAgVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uY2xpZW50VG9TZXJ2ZXI7XG4gICAgVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFR5cGVIaWVyYXJjaHlTdXBlcnR5cGVzUmVxdWVzdC5tZXRob2QpO1xufSkoVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0ID0gZXhwb3J0cy5UeXBlSGllcmFyY2h5U3VwZXJ0eXBlc1JlcXVlc3QgfHwgKGV4cG9ydHMuVHlwZUhpZXJhcmNoeVN1cGVydHlwZXNSZXF1ZXN0ID0ge30pKTtcbi8qKlxuICogQSByZXF1ZXN0IHRvIHJlc29sdmUgdGhlIHN1YnR5cGVzIGZvciBhIGdpdmVuIGBUeXBlSGllcmFyY2h5SXRlbWAuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG52YXIgVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdDtcbihmdW5jdGlvbiAoVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdCkge1xuICAgIFR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QubWV0aG9kID0gJ3R5cGVIaWVyYXJjaHkvc3VidHlwZXMnO1xuICAgIFR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBUeXBlSGllcmFyY2h5U3VidHlwZXNSZXF1ZXN0LnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbFJlcXVlc3RUeXBlKFR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QubWV0aG9kKTtcbn0pKFR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QgPSBleHBvcnRzLlR5cGVIaWVyYXJjaHlTdWJ0eXBlc1JlcXVlc3QgfHwgKGV4cG9ydHMuVHlwZUhpZXJhcmNoeVN1YnR5cGVzUmVxdWVzdCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG4vKipcbiAqIFRoZSBgd29ya3NwYWNlL3dvcmtzcGFjZUZvbGRlcnNgIGlzIHNlbnQgZnJvbSB0aGUgc2VydmVyIHRvIHRoZSBjbGllbnQgdG8gZmV0Y2ggdGhlIG9wZW4gd29ya3NwYWNlIGZvbGRlcnMuXG4gKi9cbnZhciBXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdDtcbihmdW5jdGlvbiAoV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QpIHtcbiAgICBXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdC5tZXRob2QgPSAnd29ya3NwYWNlL3dvcmtzcGFjZUZvbGRlcnMnO1xuICAgIFdvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0Lm1lc3NhZ2VEaXJlY3Rpb24gPSBtZXNzYWdlc18xLk1lc3NhZ2VEaXJlY3Rpb24uc2VydmVyVG9DbGllbnQ7XG4gICAgV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QudHlwZSA9IG5ldyBtZXNzYWdlc18xLlByb3RvY29sUmVxdWVzdFR5cGUwKFdvcmtzcGFjZUZvbGRlcnNSZXF1ZXN0Lm1ldGhvZCk7XG59KShXb3Jrc3BhY2VGb2xkZXJzUmVxdWVzdCA9IGV4cG9ydHMuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QgfHwgKGV4cG9ydHMuV29ya3NwYWNlRm9sZGVyc1JlcXVlc3QgPSB7fSkpO1xuLyoqXG4gKiBUaGUgYHdvcmtzcGFjZS9kaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzYCBub3RpZmljYXRpb24gaXMgc2VudCBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlciB3aGVuIHRoZSB3b3Jrc3BhY2VcbiAqIGZvbGRlciBjb25maWd1cmF0aW9uIGNoYW5nZXMuXG4gKi9cbnZhciBEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uO1xuKGZ1bmN0aW9uIChEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uKSB7XG4gICAgRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbi5tZXRob2QgPSAnd29ya3NwYWNlL2RpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnMnO1xuICAgIERpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnNOb3RpZmljYXRpb24ubWVzc2FnZURpcmVjdGlvbiA9IG1lc3NhZ2VzXzEuTWVzc2FnZURpcmVjdGlvbi5jbGllbnRUb1NlcnZlcjtcbiAgICBEaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uLnR5cGUgPSBuZXcgbWVzc2FnZXNfMS5Qcm90b2NvbE5vdGlmaWNhdGlvblR5cGUoRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbi5tZXRob2QpO1xufSkoRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbiA9IGV4cG9ydHMuRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVyc05vdGlmaWNhdGlvbiB8fCAoZXhwb3J0cy5EaWRDaGFuZ2VXb3Jrc3BhY2VGb2xkZXJzTm90aWZpY2F0aW9uID0ge30pKTtcbiIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub2JqZWN0TGl0ZXJhbCA9IGV4cG9ydHMudHlwZWRBcnJheSA9IGV4cG9ydHMuc3RyaW5nQXJyYXkgPSBleHBvcnRzLmFycmF5ID0gZXhwb3J0cy5mdW5jID0gZXhwb3J0cy5lcnJvciA9IGV4cG9ydHMubnVtYmVyID0gZXhwb3J0cy5zdHJpbmcgPSBleHBvcnRzLmJvb2xlYW4gPSB2b2lkIDA7XG5mdW5jdGlvbiBib29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbn1cbmV4cG9ydHMuYm9vbGVhbiA9IGJvb2xlYW47XG5mdW5jdGlvbiBzdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn1cbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nO1xuZnVuY3Rpb24gbnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdmFsdWUgaW5zdGFuY2VvZiBOdW1iZXI7XG59XG5leHBvcnRzLm51bWJlciA9IG51bWJlcjtcbmZ1bmN0aW9uIGVycm9yKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRXJyb3I7XG59XG5leHBvcnRzLmVycm9yID0gZXJyb3I7XG5mdW5jdGlvbiBmdW5jKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuZnVuYyA9IGZ1bmM7XG5mdW5jdGlvbiBhcnJheSh2YWx1ZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cbmV4cG9ydHMuYXJyYXkgPSBhcnJheTtcbmZ1bmN0aW9uIHN0cmluZ0FycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGFycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShlbGVtID0+IHN0cmluZyhlbGVtKSk7XG59XG5leHBvcnRzLnN0cmluZ0FycmF5ID0gc3RyaW5nQXJyYXk7XG5mdW5jdGlvbiB0eXBlZEFycmF5KHZhbHVlLCBjaGVjaykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShjaGVjayk7XG59XG5leHBvcnRzLnR5cGVkQXJyYXkgPSB0eXBlZEFycmF5O1xuZnVuY3Rpb24gb2JqZWN0TGl0ZXJhbCh2YWx1ZSkge1xuICAgIC8vIFN0cmljdGx5IHNwZWFraW5nIGNsYXNzIGluc3RhbmNlcyBwYXNzIHRoaXMgY2hlY2sgYXMgd2VsbC4gU2luY2UgdGhlIExTUFxuICAgIC8vIGRvZXNuJ3QgdXNlIGNsYXNzZXMgd2UgaWdub3JlIHRoaXMgZm9yIG5vdy4gSWYgd2UgZG8gd2UgbmVlZCB0byBhZGQgc29tZXRoaW5nXG4gICAgLy8gbGlrZSB0aGlzOiBgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSkgPT09IG51bGxgXG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG59XG5leHBvcnRzLm9iamVjdExpdGVyYWwgPSBvYmplY3RMaXRlcmFsO1xuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IHZhciBEb2N1bWVudFVyaTtcbihmdW5jdGlvbiAoRG9jdW1lbnRVcmkpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgRG9jdW1lbnRVcmkuaXMgPSBpcztcbn0pKERvY3VtZW50VXJpIHx8IChEb2N1bWVudFVyaSA9IHt9KSk7XG5leHBvcnQgdmFyIFVSSTtcbihmdW5jdGlvbiAoVVJJKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIFVSSS5pcyA9IGlzO1xufSkoVVJJIHx8IChVUkkgPSB7fSkpO1xuZXhwb3J0IHZhciBpbnRlZ2VyO1xuKGZ1bmN0aW9uIChpbnRlZ2VyKSB7XG4gICAgaW50ZWdlci5NSU5fVkFMVUUgPSAtMjE0NzQ4MzY0ODtcbiAgICBpbnRlZ2VyLk1BWF9WQUxVRSA9IDIxNDc0ODM2NDc7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaW50ZWdlci5NSU5fVkFMVUUgPD0gdmFsdWUgJiYgdmFsdWUgPD0gaW50ZWdlci5NQVhfVkFMVUU7XG4gICAgfVxuICAgIGludGVnZXIuaXMgPSBpcztcbn0pKGludGVnZXIgfHwgKGludGVnZXIgPSB7fSkpO1xuZXhwb3J0IHZhciB1aW50ZWdlcjtcbihmdW5jdGlvbiAodWludGVnZXIpIHtcbiAgICB1aW50ZWdlci5NSU5fVkFMVUUgPSAwO1xuICAgIHVpbnRlZ2VyLk1BWF9WQUxVRSA9IDIxNDc0ODM2NDc7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdWludGVnZXIuTUlOX1ZBTFVFIDw9IHZhbHVlICYmIHZhbHVlIDw9IHVpbnRlZ2VyLk1BWF9WQUxVRTtcbiAgICB9XG4gICAgdWludGVnZXIuaXMgPSBpcztcbn0pKHVpbnRlZ2VyIHx8ICh1aW50ZWdlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBQb3NpdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBQb3NpdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUG9zaXRpb247XG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBQb3NpdGlvbiBsaXRlcmFsIGZyb20gdGhlIGdpdmVuIGxpbmUgYW5kIGNoYXJhY3Rlci5cbiAgICAgKiBAcGFyYW0gbGluZSBUaGUgcG9zaXRpb24ncyBsaW5lLlxuICAgICAqIEBwYXJhbSBjaGFyYWN0ZXIgVGhlIHBvc2l0aW9uJ3MgY2hhcmFjdGVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsaW5lLCBjaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYgKGxpbmUgPT09IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgICAgIGxpbmUgPSB1aW50ZWdlci5NQVhfVkFMVUU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gdWludGVnZXIuTUFYX1ZBTFVFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGxpbmU6IGxpbmUsIGNoYXJhY3RlcjogY2hhcmFjdGVyIH07XG4gICAgfVxuICAgIFBvc2l0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIFBvc2l0aW9ufSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5saW5lKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUuY2hhcmFjdGVyKTtcbiAgICB9XG4gICAgUG9zaXRpb24uaXMgPSBpcztcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBSYW5nZSBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBSYW5nZX0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG9uZSwgdHdvLCB0aHJlZSwgZm91cikge1xuICAgICAgICBpZiAoSXMudWludGVnZXIob25lKSAmJiBJcy51aW50ZWdlcih0d28pICYmIElzLnVpbnRlZ2VyKHRocmVlKSAmJiBJcy51aW50ZWdlcihmb3VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IFBvc2l0aW9uLmNyZWF0ZShvbmUsIHR3byksIGVuZDogUG9zaXRpb24uY3JlYXRlKHRocmVlLCBmb3VyKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFBvc2l0aW9uLmlzKG9uZSkgJiYgUG9zaXRpb24uaXModHdvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IG9uZSwgZW5kOiB0d28gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJhbmdlI2NyZWF0ZSBjYWxsZWQgd2l0aCBpbnZhbGlkIGFyZ3VtZW50c1tcIi5jb25jYXQob25lLCBcIiwgXCIpLmNvbmNhdCh0d28sIFwiLCBcIikuY29uY2F0KHRocmVlLCBcIiwgXCIpLmNvbmNhdChmb3VyLCBcIl1cIikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJhbmdlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIFJhbmdlfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5zdGFydCkgJiYgUG9zaXRpb24uaXMoY2FuZGlkYXRlLmVuZCk7XG4gICAgfVxuICAgIFJhbmdlLmlzID0gaXM7XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuLyoqXG4gKiBUaGUgTG9jYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgTG9jYXRpb259IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIExvY2F0aW9uO1xuKGZ1bmN0aW9uIChMb2NhdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMb2NhdGlvbiBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGxvY2F0aW9uJ3MgdXJpLlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgbG9jYXRpb24ncyByYW5nZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCByYW5nZSkge1xuICAgICAgICByZXR1cm4geyB1cmk6IHVyaSwgcmFuZ2U6IHJhbmdlIH07XG4gICAgfVxuICAgIExvY2F0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIExvY2F0aW9ufSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnVyaSkpO1xuICAgIH1cbiAgICBMb2NhdGlvbi5pcyA9IGlzO1xufSkoTG9jYXRpb24gfHwgKExvY2F0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIExvY2F0aW9uTGluayBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBMb2NhdGlvbkxpbmt9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIExvY2F0aW9uTGluaztcbihmdW5jdGlvbiAoTG9jYXRpb25MaW5rKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIExvY2F0aW9uTGluayBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB0YXJnZXRVcmkgVGhlIGRlZmluaXRpb24ncyB1cmkuXG4gICAgICogQHBhcmFtIHRhcmdldFJhbmdlIFRoZSBmdWxsIHJhbmdlIG9mIHRoZSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB0YXJnZXRTZWxlY3Rpb25SYW5nZSBUaGUgc3BhbiBvZiB0aGUgc3ltYm9sIGRlZmluaXRpb24gYXQgdGhlIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gb3JpZ2luU2VsZWN0aW9uUmFuZ2UgVGhlIHNwYW4gb2YgdGhlIHN5bWJvbCBiZWluZyBkZWZpbmVkIGluIHRoZSBvcmlnaW5hdGluZyBzb3VyY2UgZmlsZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodGFyZ2V0VXJpLCB0YXJnZXRSYW5nZSwgdGFyZ2V0U2VsZWN0aW9uUmFuZ2UsIG9yaWdpblNlbGVjdGlvblJhbmdlKSB7XG4gICAgICAgIHJldHVybiB7IHRhcmdldFVyaTogdGFyZ2V0VXJpLCB0YXJnZXRSYW5nZTogdGFyZ2V0UmFuZ2UsIHRhcmdldFNlbGVjdGlvblJhbmdlOiB0YXJnZXRTZWxlY3Rpb25SYW5nZSwgb3JpZ2luU2VsZWN0aW9uUmFuZ2U6IG9yaWdpblNlbGVjdGlvblJhbmdlIH07XG4gICAgfVxuICAgIExvY2F0aW9uTGluay5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBMb2NhdGlvbkxpbmt9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnRhcmdldFJhbmdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldFVyaSlcbiAgICAgICAgICAgICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS50YXJnZXRTZWxlY3Rpb25SYW5nZSlcbiAgICAgICAgICAgICYmIChSYW5nZS5pcyhjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpKTtcbiAgICB9XG4gICAgTG9jYXRpb25MaW5rLmlzID0gaXM7XG59KShMb2NhdGlvbkxpbmsgfHwgKExvY2F0aW9uTGluayA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2xvciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBDb2xvcn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3I7XG4oZnVuY3Rpb24gKENvbG9yKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2xvciBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVkOiByZWQsXG4gICAgICAgICAgICBncmVlbjogZ3JlZW4sXG4gICAgICAgICAgICBibHVlOiBibHVlLFxuICAgICAgICAgICAgYWxwaGE6IGFscGhhLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBDb2xvci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb2xvcn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUucmVkLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmdyZWVuLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmJsdWUsIDAsIDEpXG4gICAgICAgICAgICAmJiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUuYWxwaGEsIDAsIDEpO1xuICAgIH1cbiAgICBDb2xvci5pcyA9IGlzO1xufSkoQ29sb3IgfHwgKENvbG9yID0ge30pKTtcbi8qKlxuICogVGhlIENvbG9ySW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3JJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoQ29sb3JJbmZvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29sb3JJbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29sb3JJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb2xvckluZm9ybWF0aW9ufSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgQ29sb3IuaXMoY2FuZGlkYXRlLmNvbG9yKTtcbiAgICB9XG4gICAgQ29sb3JJbmZvcm1hdGlvbi5pcyA9IGlzO1xufSkoQ29sb3JJbmZvcm1hdGlvbiB8fCAoQ29sb3JJbmZvcm1hdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2xvciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBDb2xvclByZXNlbnRhdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3JQcmVzZW50YXRpb247XG4oZnVuY3Rpb24gKENvbG9yUHJlc2VudGF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2xvckluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCB0ZXh0RWRpdCwgYWRkaXRpb25hbFRleHRFZGl0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgdGV4dEVkaXQ6IHRleHRFZGl0LFxuICAgICAgICAgICAgYWRkaXRpb25hbFRleHRFZGl0czogYWRkaXRpb25hbFRleHRFZGl0cyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29sb3JQcmVzZW50YXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgQ29sb3JJbmZvcm1hdGlvbn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGV4dEVkaXQpIHx8IFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzLCBUZXh0RWRpdC5pcykpO1xuICAgIH1cbiAgICBDb2xvclByZXNlbnRhdGlvbi5pcyA9IGlzO1xufSkoQ29sb3JQcmVzZW50YXRpb24gfHwgKENvbG9yUHJlc2VudGF0aW9uID0ge30pKTtcbi8qKlxuICogQSBzZXQgb2YgcHJlZGVmaW5lZCByYW5nZSBraW5kcy5cbiAqL1xuZXhwb3J0IHZhciBGb2xkaW5nUmFuZ2VLaW5kO1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2VLaW5kKSB7XG4gICAgLyoqXG4gICAgICogRm9sZGluZyByYW5nZSBmb3IgYSBjb21tZW50XG4gICAgICovXG4gICAgRm9sZGluZ1JhbmdlS2luZC5Db21tZW50ID0gJ2NvbW1lbnQnO1xuICAgIC8qKlxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGFuIGltcG9ydCBvciBpbmNsdWRlXG4gICAgICovXG4gICAgRm9sZGluZ1JhbmdlS2luZC5JbXBvcnRzID0gJ2ltcG9ydHMnO1xuICAgIC8qKlxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGEgcmVnaW9uIChlLmcuIGAjcmVnaW9uYClcbiAgICAgKi9cbiAgICBGb2xkaW5nUmFuZ2VLaW5kLlJlZ2lvbiA9ICdyZWdpb24nO1xufSkoRm9sZGluZ1JhbmdlS2luZCB8fCAoRm9sZGluZ1JhbmdlS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBmb2xkaW5nIHJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIEZvbGRpbmdSYW5nZX0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgRm9sZGluZ1JhbmdlO1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2UpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvbGRpbmdSYW5nZSBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShzdGFydExpbmUsIGVuZExpbmUsIHN0YXJ0Q2hhcmFjdGVyLCBlbmRDaGFyYWN0ZXIsIGtpbmQsIGNvbGxhcHNlZFRleHQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHN0YXJ0TGluZTogc3RhcnRMaW5lLFxuICAgICAgICAgICAgZW5kTGluZTogZW5kTGluZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChzdGFydENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydENoYXJhY3RlciA9IHN0YXJ0Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGVuZENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmRDaGFyYWN0ZXIgPSBlbmRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQoa2luZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChjb2xsYXBzZWRUZXh0KSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvbGxhcHNlZFRleHQgPSBjb2xsYXBzZWRUZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEZvbGRpbmdSYW5nZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBGb2xkaW5nUmFuZ2V9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLnN0YXJ0TGluZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLnN0YXJ0TGluZSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLnN0YXJ0Q2hhcmFjdGVyKSB8fCBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRDaGFyYWN0ZXIpKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSB8fCBJcy51aW50ZWdlcihjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmtpbmQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUua2luZCkpO1xuICAgIH1cbiAgICBGb2xkaW5nUmFuZ2UuaXMgPSBpcztcbn0pKEZvbGRpbmdSYW5nZSB8fCAoRm9sZGluZ1JhbmdlID0ge30pKTtcbi8qKlxuICogVGhlIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsb2NhdGlvbiwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb259IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgTG9jYXRpb24uaXMoY2FuZGlkYXRlLmxvY2F0aW9uKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm1lc3NhZ2UpO1xuICAgIH1cbiAgICBEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uLmlzID0gaXM7XG59KShEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uIHx8IChEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIGRpYWdub3N0aWMncyBzZXZlcml0eS5cbiAqL1xuZXhwb3J0IHZhciBEaWFnbm9zdGljU2V2ZXJpdHk7XG4oZnVuY3Rpb24gKERpYWdub3N0aWNTZXZlcml0eSkge1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yID0gMTtcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGEgd2FybmluZy5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZyA9IDI7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhbiBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuSW5mb3JtYXRpb24gPSAzO1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYSBoaW50LlxuICAgICAqL1xuICAgIERpYWdub3N0aWNTZXZlcml0eS5IaW50ID0gNDtcbn0pKERpYWdub3N0aWNTZXZlcml0eSB8fCAoRGlhZ25vc3RpY1NldmVyaXR5ID0ge30pKTtcbi8qKlxuICogVGhlIGRpYWdub3N0aWMgdGFncy5cbiAqXG4gKiBAc2luY2UgMy4xNS4wXG4gKi9cbmV4cG9ydCB2YXIgRGlhZ25vc3RpY1RhZztcbihmdW5jdGlvbiAoRGlhZ25vc3RpY1RhZykge1xuICAgIC8qKlxuICAgICAqIFVudXNlZCBvciB1bm5lY2Vzc2FyeSBjb2RlLlxuICAgICAqXG4gICAgICogQ2xpZW50cyBhcmUgYWxsb3dlZCB0byByZW5kZXIgZGlhZ25vc3RpY3Mgd2l0aCB0aGlzIHRhZyBmYWRlZCBvdXQgaW5zdGVhZCBvZiBoYXZpbmdcbiAgICAgKiBhbiBlcnJvciBzcXVpZ2dsZS5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljVGFnLlVubmVjZXNzYXJ5ID0gMTtcbiAgICAvKipcbiAgICAgKiBEZXByZWNhdGVkIG9yIG9ic29sZXRlIGNvZGUuXG4gICAgICpcbiAgICAgKiBDbGllbnRzIGFyZSBhbGxvd2VkIHRvIHJlbmRlcmVkIGRpYWdub3N0aWNzIHdpdGggdGhpcyB0YWcgc3RyaWtlIHRocm91Z2guXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1RhZy5EZXByZWNhdGVkID0gMjtcbn0pKERpYWdub3N0aWNUYWcgfHwgKERpYWdub3N0aWNUYWcgPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29kZURlc2NyaXB0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIGRlc2NyaXB0aW9ucyBmb3IgZGlhZ25vc3RpYyBjb2Rlcy5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbmV4cG9ydCB2YXIgQ29kZURlc2NyaXB0aW9uO1xuKGZ1bmN0aW9uIChDb2RlRGVzY3JpcHRpb24pIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5ocmVmKTtcbiAgICB9XG4gICAgQ29kZURlc2NyaXB0aW9uLmlzID0gaXM7XG59KShDb2RlRGVzY3JpcHRpb24gfHwgKENvZGVEZXNjcmlwdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBEaWFnbm9zdGljIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIERpYWdub3N0aWN9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWM7XG4oZnVuY3Rpb24gKERpYWdub3N0aWMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERpYWdub3N0aWMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0geyByYW5nZTogcmFuZ2UsIG1lc3NhZ2U6IG1lc3NhZ2UgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoc2V2ZXJpdHkpKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V2ZXJpdHkgPSBzZXZlcml0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChjb2RlKSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQocmVsYXRlZEluZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgcmVzdWx0LnJlbGF0ZWRJbmZvcm1hdGlvbiA9IHJlbGF0ZWRJbmZvcm1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBEaWFnbm9zdGljLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIERpYWdub3N0aWN9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKVxuICAgICAgICAgICAgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKVxuICAgICAgICAgICAgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5tZXNzYWdlKVxuICAgICAgICAgICAgJiYgKElzLm51bWJlcihjYW5kaWRhdGUuc2V2ZXJpdHkpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUuc2V2ZXJpdHkpKVxuICAgICAgICAgICAgJiYgKElzLmludGVnZXIoY2FuZGlkYXRlLmNvZGUpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuY29kZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5jb2RlKSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvZGVEZXNjcmlwdGlvbikgfHwgKElzLnN0cmluZygoX2EgPSBjYW5kaWRhdGUuY29kZURlc2NyaXB0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaHJlZikpKVxuICAgICAgICAgICAgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUuc291cmNlKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnNvdXJjZSkpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5yZWxhdGVkSW5mb3JtYXRpb24pIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLnJlbGF0ZWRJbmZvcm1hdGlvbiwgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbi5pcykpO1xuICAgIH1cbiAgICBEaWFnbm9zdGljLmlzID0gaXM7XG59KShEaWFnbm9zdGljIHx8IChEaWFnbm9zdGljID0ge30pKTtcbi8qKlxuICogVGhlIENvbW1hbmQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgQ29tbWFuZH0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tbWFuZDtcbihmdW5jdGlvbiAoQ29tbWFuZCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29tbWFuZCBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0aXRsZSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0geyB0aXRsZTogdGl0bGUsIGNvbW1hbmQ6IGNvbW1hbmQgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoYXJncykgJiYgYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQuYXJndW1lbnRzID0gYXJncztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDb21tYW5kLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIENvbW1hbmR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5jb21tYW5kKTtcbiAgICB9XG4gICAgQ29tbWFuZC5pcyA9IGlzO1xufSkoQ29tbWFuZCB8fCAoQ29tbWFuZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBUZXh0RWRpdCBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9uIHRvIGNyZWF0ZSByZXBsYWNlLFxuICogaW5zZXJ0IGFuZCBkZWxldGUgZWRpdHMgbW9yZSBlYXNpbHkuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dEVkaXQ7XG4oZnVuY3Rpb24gKFRleHRFZGl0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHJlcGxhY2UgdGV4dCBlZGl0LlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSByZXBsYWNlZC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgbmV3IHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIG5ld1RleHQ6IG5ld1RleHQgfTtcbiAgICB9XG4gICAgVGV4dEVkaXQucmVwbGFjZSA9IHJlcGxhY2U7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnNlcnQgdGV4dCBlZGl0LlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gdG8gaW5zZXJ0IHRoZSB0ZXh0IGF0LlxuICAgICAqIEBwYXJhbSBuZXdUZXh0IFRoZSB0ZXh0IHRvIGJlIGluc2VydGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluc2VydChwb3NpdGlvbiwgbmV3VGV4dCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogeyBzdGFydDogcG9zaXRpb24sIGVuZDogcG9zaXRpb24gfSwgbmV3VGV4dDogbmV3VGV4dCB9O1xuICAgIH1cbiAgICBUZXh0RWRpdC5pbnNlcnQgPSBpbnNlcnQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRlbGV0ZSB0ZXh0IGVkaXQuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0ZXh0IHRvIGJlIGRlbGV0ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVsKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiByYW5nZSwgbmV3VGV4dDogJycgfTtcbiAgICB9XG4gICAgVGV4dEVkaXQuZGVsID0gZGVsO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKVxuICAgICAgICAgICAgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uZXdUZXh0KVxuICAgICAgICAgICAgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKTtcbiAgICB9XG4gICAgVGV4dEVkaXQuaXMgPSBpcztcbn0pKFRleHRFZGl0IHx8IChUZXh0RWRpdCA9IHt9KSk7XG5leHBvcnQgdmFyIENoYW5nZUFubm90YXRpb247XG4oZnVuY3Rpb24gKENoYW5nZUFubm90YXRpb24pIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIG5lZWRzQ29uZmlybWF0aW9uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0geyBsYWJlbDogbGFiZWwgfTtcbiAgICAgICAgaWYgKG5lZWRzQ29uZmlybWF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5uZWVkc0NvbmZpcm1hdGlvbiA9IG5lZWRzQ29uZmlybWF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDaGFuZ2VBbm5vdGF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYWJlbCkgJiZcbiAgICAgICAgICAgIChJcy5ib29sZWFuKGNhbmRpZGF0ZS5uZWVkc0NvbmZpcm1hdGlvbikgfHwgY2FuZGlkYXRlLm5lZWRzQ29uZmlybWF0aW9uID09PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5kZXNjcmlwdGlvbikgfHwgY2FuZGlkYXRlLmRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBDaGFuZ2VBbm5vdGF0aW9uLmlzID0gaXM7XG59KShDaGFuZ2VBbm5vdGF0aW9uIHx8IChDaGFuZ2VBbm5vdGF0aW9uID0ge30pKTtcbmV4cG9ydCB2YXIgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXI7XG4oZnVuY3Rpb24gKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZSk7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzID0gaXM7XG59KShDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllciB8fCAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIgPSB7fSkpO1xuZXhwb3J0IHZhciBBbm5vdGF0ZWRUZXh0RWRpdDtcbihmdW5jdGlvbiAoQW5ub3RhdGVkVGV4dEVkaXQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFubm90YXRlZCByZXBsYWNlIHRleHQgZWRpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSByZXBsYWNlZC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgbmV3IHRleHQuXG4gICAgICogQHBhcmFtIGFubm90YXRpb24gVGhlIGFubm90YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIG5ld1RleHQ6IG5ld1RleHQsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICAgIH1cbiAgICBBbm5vdGF0ZWRUZXh0RWRpdC5yZXBsYWNlID0gcmVwbGFjZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFubm90YXRlZCBpbnNlcnQgdGV4dCBlZGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIHRleHQgYXQuXG4gICAgICogQHBhcmFtIG5ld1RleHQgVGhlIHRleHQgdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICogQHBhcmFtIGFubm90YXRpb24gVGhlIGFubm90YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiB7IHN0YXJ0OiBwb3NpdGlvbiwgZW5kOiBwb3NpdGlvbiB9LCBuZXdUZXh0OiBuZXdUZXh0LCBhbm5vdGF0aW9uSWQ6IGFubm90YXRpb24gfTtcbiAgICB9XG4gICAgQW5ub3RhdGVkVGV4dEVkaXQuaW5zZXJ0ID0gaW5zZXJ0O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYW5ub3RhdGVkIGRlbGV0ZSB0ZXh0IGVkaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRleHQgdG8gYmUgZGVsZXRlZC5cbiAgICAgKiBAcGFyYW0gYW5ub3RhdGlvbiBUaGUgYW5ub3RhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWwocmFuZ2UsIGFubm90YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCBuZXdUZXh0OiAnJywgYW5ub3RhdGlvbklkOiBhbm5vdGF0aW9uIH07XG4gICAgfVxuICAgIEFubm90YXRlZFRleHRFZGl0LmRlbCA9IGRlbDtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBUZXh0RWRpdC5pcyhjYW5kaWRhdGUpICYmIChDaGFuZ2VBbm5vdGF0aW9uLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgICB9XG4gICAgQW5ub3RhdGVkVGV4dEVkaXQuaXMgPSBpcztcbn0pKEFubm90YXRlZFRleHRFZGl0IHx8IChBbm5vdGF0ZWRUZXh0RWRpdCA9IHt9KSk7XG4vKipcbiAqIFRoZSBUZXh0RG9jdW1lbnRFZGl0IG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlXG4gKiBhbiBlZGl0IHRoYXQgbWFuaXB1bGF0ZXMgYSB0ZXh0IGRvY3VtZW50LlxuICovXG5leHBvcnQgdmFyIFRleHREb2N1bWVudEVkaXQ7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudEVkaXQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBUZXh0RG9jdW1lbnRFZGl0YFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0ZXh0RG9jdW1lbnQsIGVkaXRzKSB7XG4gICAgICAgIHJldHVybiB7IHRleHREb2N1bWVudDogdGV4dERvY3VtZW50LCBlZGl0czogZWRpdHMgfTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RWRpdC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoY2FuZGlkYXRlLnRleHREb2N1bWVudClcbiAgICAgICAgICAgICYmIEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLmVkaXRzKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50RWRpdC5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50RWRpdCB8fCAoVGV4dERvY3VtZW50RWRpdCA9IHt9KSk7XG5leHBvcnQgdmFyIENyZWF0ZUZpbGU7XG4oZnVuY3Rpb24gKENyZWF0ZUZpbGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBvcHRpb25zLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBraW5kOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIHVyaTogdXJpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgKG9wdGlvbnMub3ZlcndyaXRlICE9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5pZ25vcmVJZkV4aXN0cyAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hbm5vdGF0aW9uSWQgPSBhbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENyZWF0ZUZpbGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBjYW5kaWRhdGUua2luZCA9PT0gJ2NyZWF0ZScgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAoKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlKSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cykpKSkgJiYgKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQgPT09IHVuZGVmaW5lZCB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gICAgfVxuICAgIENyZWF0ZUZpbGUuaXMgPSBpcztcbn0pKENyZWF0ZUZpbGUgfHwgKENyZWF0ZUZpbGUgPSB7fSkpO1xuZXhwb3J0IHZhciBSZW5hbWVGaWxlO1xuKGZ1bmN0aW9uIChSZW5hbWVGaWxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBraW5kOiAncmVuYW1lJyxcbiAgICAgICAgICAgIG9sZFVyaTogb2xkVXJpLFxuICAgICAgICAgICAgbmV3VXJpOiBuZXdVcmlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiAob3B0aW9ucy5vdmVyd3JpdGUgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmlnbm9yZUlmRXhpc3RzICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFubm90YXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgUmVuYW1lRmlsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAncmVuYW1lJyAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm9sZFVyaSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uZXdVcmkpICYmIChjYW5kaWRhdGUub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAoKGNhbmRpZGF0ZS5vcHRpb25zLm92ZXJ3cml0ZSA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlKSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZkV4aXN0cykpKSkgJiYgKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQgPT09IHVuZGVmaW5lZCB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gICAgfVxuICAgIFJlbmFtZUZpbGUuaXMgPSBpcztcbn0pKFJlbmFtZUZpbGUgfHwgKFJlbmFtZUZpbGUgPSB7fSkpO1xuZXhwb3J0IHZhciBEZWxldGVGaWxlO1xuKGZ1bmN0aW9uIChEZWxldGVGaWxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgb3B0aW9ucywgYW5ub3RhdGlvbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2luZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICB1cmk6IHVyaVxuICAgICAgICB9O1xuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIChvcHRpb25zLnJlY3Vyc2l2ZSAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQuYW5ub3RhdGlvbklkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBEZWxldGVGaWxlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09ICdkZWxldGUnICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgKChjYW5kaWRhdGUub3B0aW9ucy5yZWN1cnNpdmUgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLnJlY3Vyc2l2ZSkpICYmIChjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZk5vdEV4aXN0cyA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZOb3RFeGlzdHMpKSkpICYmIChjYW5kaWRhdGUuYW5ub3RhdGlvbklkID09PSB1bmRlZmluZWQgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoY2FuZGlkYXRlLmFubm90YXRpb25JZCkpO1xuICAgIH1cbiAgICBEZWxldGVGaWxlLmlzID0gaXM7XG59KShEZWxldGVGaWxlIHx8IChEZWxldGVGaWxlID0ge30pKTtcbmV4cG9ydCB2YXIgV29ya3NwYWNlRWRpdDtcbihmdW5jdGlvbiAoV29ya3NwYWNlRWRpdCkge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5jaGFuZ2VzICE9PSB1bmRlZmluZWQgfHwgY2FuZGlkYXRlLmRvY3VtZW50Q2hhbmdlcyAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzLmV2ZXJ5KGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoSXMuc3RyaW5nKGNoYW5nZS5raW5kKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ3JlYXRlRmlsZS5pcyhjaGFuZ2UpIHx8IFJlbmFtZUZpbGUuaXMoY2hhbmdlKSB8fCBEZWxldGVGaWxlLmlzKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dERvY3VtZW50RWRpdC5pcyhjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG4gICAgV29ya3NwYWNlRWRpdC5pcyA9IGlzO1xufSkoV29ya3NwYWNlRWRpdCB8fCAoV29ya3NwYWNlRWRpdCA9IHt9KSk7XG52YXIgVGV4dEVkaXRDaGFuZ2VJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cywgY2hhbmdlQW5ub3RhdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lZGl0cyA9IGVkaXRzO1xuICAgICAgICB0aGlzLmNoYW5nZUFubm90YXRpb25zID0gY2hhbmdlQW5ub3RhdGlvbnM7XG4gICAgfVxuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciBlZGl0O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXQgPSBUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBpZCA9IGFubm90YXRpb247XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQuaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0LCBhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Q2hhbmdlQW5ub3RhdGlvbnModGhpcy5jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICBpZCA9IHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0Lmluc2VydChwb3NpdGlvbiwgbmV3VGV4dCwgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChlZGl0KTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKHJhbmdlLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciBlZGl0O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXQgPSBUZXh0RWRpdC5yZXBsYWNlKHJhbmdlLCBuZXdUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgaWQgPSBhbm5vdGF0aW9uO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0LnJlcGxhY2UocmFuZ2UsIG5ld1RleHQsIGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyh0aGlzLmNoYW5nZUFubm90YXRpb25zKTtcbiAgICAgICAgICAgIGlkID0gdGhpcy5jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChlZGl0KTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocmFuZ2UsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIGVkaXQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgaWYgKGFubm90YXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWRpdCA9IFRleHRFZGl0LmRlbChyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5kZWwocmFuZ2UsIGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyh0aGlzLmNoYW5nZUFubm90YXRpb25zKTtcbiAgICAgICAgICAgIGlkID0gdGhpcy5jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQuZGVsKHJhbmdlLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlZGl0KSB7XG4gICAgICAgIHRoaXMuZWRpdHMucHVzaChlZGl0KTtcbiAgICB9O1xuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0cztcbiAgICB9O1xuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWRpdHMuc3BsaWNlKDAsIHRoaXMuZWRpdHMubGVuZ3RoKTtcbiAgICB9O1xuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuYXNzZXJ0Q2hhbmdlQW5ub3RhdGlvbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRleHQgZWRpdCBjaGFuZ2UgaXMgbm90IGNvbmZpZ3VyZWQgdG8gbWFuYWdlIGNoYW5nZSBhbm5vdGF0aW9ucy5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUZXh0RWRpdENoYW5nZUltcGw7XG59KCkpO1xuLyoqXG4gKiBBIGhlbHBlciBjbGFzc1xuICovXG52YXIgQ2hhbmdlQW5ub3RhdGlvbnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hhbmdlQW5ub3RhdGlvbnMoYW5ub3RhdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucyA9PT0gdW5kZWZpbmVkID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IGFubm90YXRpb25zO1xuICAgICAgICB0aGlzLl9jb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb25zLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbm5vdGF0aW9ucztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaGFuZ2VBbm5vdGF0aW9ucy5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDaGFuZ2VBbm5vdGF0aW9ucy5wcm90b3R5cGUubWFuYWdlID0gZnVuY3Rpb24gKGlkT3JBbm5vdGF0aW9uLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgaWYgKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGlkT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgaWQgPSBpZE9yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gdGhpcy5uZXh0SWQoKTtcbiAgICAgICAgICAgIGFubm90YXRpb24gPSBpZE9yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYW5ub3RhdGlvbnNbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklkIFwiLmNvbmNhdChpZCwgXCIgaXMgYWxyZWFkeSBpbiB1c2UuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhbm5vdGF0aW9uIHByb3ZpZGVkIGZvciBpZCBcIi5jb25jYXQoaWQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbm5vdGF0aW9uc1tpZF0gPSBhbm5vdGF0aW9uO1xuICAgICAgICB0aGlzLl9zaXplKys7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIENoYW5nZUFubm90YXRpb25zLnByb3RvdHlwZS5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvdW50ZXIrKztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50ZXIudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiBDaGFuZ2VBbm5vdGF0aW9ucztcbn0oKSk7XG4vKipcbiAqIEEgd29ya3NwYWNlIGNoYW5nZSBoZWxwcyBjb25zdHJ1Y3RpbmcgY2hhbmdlcyB0byBhIHdvcmtzcGFjZS5cbiAqL1xudmFyIFdvcmtzcGFjZUNoYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXb3Jrc3BhY2VDaGFuZ2Uod29ya3NwYWNlRWRpdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBpZiAod29ya3NwYWNlRWRpdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0gd29ya3NwYWNlRWRpdDtcbiAgICAgICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFubm90YXRpb25zID0gbmV3IENoYW5nZUFubm90YXRpb25zKHdvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgICAgICAgICB3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRleHREb2N1bWVudEVkaXQuaXMoY2hhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRFZGl0Q2hhbmdlID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChjaGFuZ2UuZWRpdHMsIF90aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2NoYW5nZS50ZXh0RG9jdW1lbnQudXJpXSA9IHRleHRFZGl0Q2hhbmdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dEVkaXRDaGFuZ2UgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKHdvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0ge307XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUsIFwiZWRpdFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIHtAbGluayBXb3Jrc3BhY2VFZGl0fSBsaXRlcmFsXG4gICAgICAgICAqIHVzZSB0byBiZSByZXR1cm5lZCBmcm9tIGEgd29ya3NwYWNlIGVkaXQgb3BlcmF0aW9uIGxpa2UgcmVuYW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoYW5nZUFubm90YXRpb25zLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd29ya3NwYWNlRWRpdDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUuZ2V0VGV4dEVkaXRDaGFuZ2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGV4dERvY3VtZW50ID0geyB1cmk6IGtleS51cmksIHZlcnNpb246IGtleS52ZXJzaW9uIH07XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW3RleHREb2N1bWVudC51cmldO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdHMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dERvY3VtZW50RWRpdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dERvY3VtZW50OiB0ZXh0RG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRzOiBlZGl0c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaCh0ZXh0RG9jdW1lbnRFZGl0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKGVkaXRzLCB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW3RleHREb2N1bWVudC51cmldID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIG5vcm1hbCB0ZXh0IGVkaXQgY2hhbmdlcy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzW2tleV0gPSBlZGl0cztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKGVkaXRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXNba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUuaW5pdERvY3VtZW50Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQgJiYgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFubm90YXRpb25zID0gbmV3IENoYW5nZUFubm90YXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VBbm5vdGF0aW9ucyA9IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLmFsbCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmluaXRDaGFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgV29ya3NwYWNlQ2hhbmdlLnByb3RvdHlwZS5jcmVhdGVGaWxlID0gZnVuY3Rpb24gKHVyaSwgb3B0aW9uc09yQW5ub3RhdGlvbiwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXREb2N1bWVudENoYW5nZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIGVkaXQgaXMgbm90IGNvbmZpZ3VyZWQgZm9yIGRvY3VtZW50IGNoYW5nZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFubm90YXRpb247XG4gICAgICAgIGlmIChDaGFuZ2VBbm5vdGF0aW9uLmlzKG9wdGlvbnNPckFubm90YXRpb24pIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKG9wdGlvbnNPckFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBhbm5vdGF0aW9uID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcGVyYXRpb247XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgaWYgKGFubm90YXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikgPyBhbm5vdGF0aW9uIDogdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gQ3JlYXRlRmlsZS5jcmVhdGUodXJpLCBvcHRpb25zLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLnJlbmFtZUZpbGUgPSBmdW5jdGlvbiAob2xkVXJpLCBuZXdVcmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbm5vdGF0aW9uO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlcmF0aW9uO1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IFJlbmFtZUZpbGUuY3JlYXRlKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkID0gQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikgPyBhbm5vdGF0aW9uIDogdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMubWFuYWdlKGFubm90YXRpb24pO1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gUmVuYW1lRmlsZS5jcmVhdGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnMsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5wdXNoKG9wZXJhdGlvbik7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUuZGVsZXRlRmlsZSA9IGZ1bmN0aW9uICh1cmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbm5vdGF0aW9uO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlcmF0aW9uO1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IERlbGV0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZCA9IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pID8gYW5ub3RhdGlvbiA6IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IERlbGV0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucywgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2gob3BlcmF0aW9uKTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFdvcmtzcGFjZUNoYW5nZTtcbn0oKSk7XG5leHBvcnQgeyBXb3Jrc3BhY2VDaGFuZ2UgfTtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgVGV4dERvY3VtZW50SWRlbnRpZmllcn0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50SWRlbnRpZmllcjtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50SWRlbnRpZmllcikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgVGV4dERvY3VtZW50SWRlbnRpZmllciBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmkpIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpOiB1cmkgfTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBUZXh0RG9jdW1lbnRJZGVudGlmaWVyfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50SWRlbnRpZmllciB8fCAoVGV4dERvY3VtZW50SWRlbnRpZmllciA9IHt9KSk7XG4vKipcbiAqIFRoZSBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJ9IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXI7XG4oZnVuY3Rpb24gKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgZG9jdW1lbnQncyB2ZXJzaW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpOiB1cmksIHZlcnNpb246IHZlcnNpb24gfTtcbiAgICB9XG4gICAgVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKTtcbiAgICB9XG4gICAgVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciB8fCAoVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciA9IHt9KSk7XG4vKipcbiAqIFRoZSBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXI7XG4oZnVuY3Rpb24gKE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIGRvY3VtZW50J3MgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCB2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCB2ZXJzaW9uOiB2ZXJzaW9uIH07XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJ9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUudmVyc2lvbiA9PT0gbnVsbCB8fCBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSk7XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dERvY3VtZW50SXRlbSBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBUZXh0RG9jdW1lbnRJdGVtfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnRJdGVtO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRJdGVtKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBUZXh0RG9jdW1lbnRJdGVtIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIGxhbmd1YWdlSWQgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgZG9jdW1lbnQncyB2ZXJzaW9uIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgZG9jdW1lbnQncyB0ZXh0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpOiB1cmksIGxhbmd1YWdlSWQ6IGxhbmd1YWdlSWQsIHZlcnNpb246IHZlcnNpb24sIHRleHQ6IHRleHQgfTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SXRlbS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBUZXh0RG9jdW1lbnRJdGVtfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlSWQpICYmIElzLmludGVnZXIoY2FuZGlkYXRlLnZlcnNpb24pICYmIElzLnN0cmluZyhjYW5kaWRhdGUudGV4dCk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudEl0ZW0uaXMgPSBpcztcbn0pKFRleHREb2N1bWVudEl0ZW0gfHwgKFRleHREb2N1bWVudEl0ZW0gPSB7fSkpO1xuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGNvbnRlbnQgdHlwZSB0aGF0IGEgY2xpZW50IHN1cHBvcnRzIGluIHZhcmlvdXNcbiAqIHJlc3VsdCBsaXRlcmFscyBsaWtlIGBIb3ZlcmAsIGBQYXJhbWV0ZXJJbmZvYCBvciBgQ29tcGxldGlvbkl0ZW1gLlxuICpcbiAqIFBsZWFzZSBub3RlIHRoYXQgYE1hcmt1cEtpbmRzYCBtdXN0IG5vdCBzdGFydCB3aXRoIGEgYCRgLiBUaGlzIGtpbmRzXG4gKiBhcmUgcmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzYWdlLlxuICovXG5leHBvcnQgdmFyIE1hcmt1cEtpbmQ7XG4oZnVuY3Rpb24gKE1hcmt1cEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBQbGFpbiB0ZXh0IGlzIHN1cHBvcnRlZCBhcyBhIGNvbnRlbnQgZm9ybWF0XG4gICAgICovXG4gICAgTWFya3VwS2luZC5QbGFpblRleHQgPSAncGxhaW50ZXh0JztcbiAgICAvKipcbiAgICAgKiBNYXJrZG93biBpcyBzdXBwb3J0ZWQgYXMgYSBjb250ZW50IGZvcm1hdFxuICAgICAqL1xuICAgIE1hcmt1cEtpbmQuTWFya2Rvd24gPSAnbWFya2Rvd24nO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHZhbHVlIG9mIHRoZSB7QGxpbmsgTWFya3VwS2luZH0gdHlwZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgPT09IE1hcmt1cEtpbmQuUGxhaW5UZXh0IHx8IGNhbmRpZGF0ZSA9PT0gTWFya3VwS2luZC5NYXJrZG93bjtcbiAgICB9XG4gICAgTWFya3VwS2luZC5pcyA9IGlzO1xufSkoTWFya3VwS2luZCB8fCAoTWFya3VwS2luZCA9IHt9KSk7XG5leHBvcnQgdmFyIE1hcmt1cENvbnRlbnQ7XG4oZnVuY3Rpb24gKE1hcmt1cENvbnRlbnQpIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIHtAbGluayBNYXJrdXBDb250ZW50fSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbCh2YWx1ZSkgJiYgTWFya3VwS2luZC5pcyhjYW5kaWRhdGUua2luZCkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS52YWx1ZSk7XG4gICAgfVxuICAgIE1hcmt1cENvbnRlbnQuaXMgPSBpcztcbn0pKE1hcmt1cENvbnRlbnQgfHwgKE1hcmt1cENvbnRlbnQgPSB7fSkpO1xuLyoqXG4gKiBUaGUga2luZCBvZiBhIGNvbXBsZXRpb24gZW50cnkuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkl0ZW1LaW5kO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbUtpbmQpIHtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVGV4dCA9IDE7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLk1ldGhvZCA9IDI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uID0gMztcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29uc3RydWN0b3IgPSA0O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5GaWVsZCA9IDU7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlZhcmlhYmxlID0gNjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ2xhc3MgPSA3O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5JbnRlcmZhY2UgPSA4O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGUgPSA5O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eSA9IDEwO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Vbml0ID0gMTE7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlID0gMTI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkVudW0gPSAxMztcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCA9IDE0O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0ID0gMTU7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkNvbG9yID0gMTY7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZpbGUgPSAxNztcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuUmVmZXJlbmNlID0gMTg7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZvbGRlciA9IDE5O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5FbnVtTWVtYmVyID0gMjA7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0YW50ID0gMjE7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlN0cnVjdCA9IDIyO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5FdmVudCA9IDIzO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5PcGVyYXRvciA9IDI0O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5UeXBlUGFyYW1ldGVyID0gMjU7XG59KShDb21wbGV0aW9uSXRlbUtpbmQgfHwgKENvbXBsZXRpb25JdGVtS2luZCA9IHt9KSk7XG4vKipcbiAqIERlZmluZXMgd2hldGhlciB0aGUgaW5zZXJ0IHRleHQgaW4gYSBjb21wbGV0aW9uIGl0ZW0gc2hvdWxkIGJlIGludGVycHJldGVkIGFzXG4gKiBwbGFpbiB0ZXh0IG9yIGEgc25pcHBldC5cbiAqL1xuZXhwb3J0IHZhciBJbnNlcnRUZXh0Rm9ybWF0O1xuKGZ1bmN0aW9uIChJbnNlcnRUZXh0Rm9ybWF0KSB7XG4gICAgLyoqXG4gICAgICogVGhlIHByaW1hcnkgdGV4dCB0byBiZSBpbnNlcnRlZCBpcyB0cmVhdGVkIGFzIGEgcGxhaW4gc3RyaW5nLlxuICAgICAqL1xuICAgIEluc2VydFRleHRGb3JtYXQuUGxhaW5UZXh0ID0gMTtcbiAgICAvKipcbiAgICAgKiBUaGUgcHJpbWFyeSB0ZXh0IHRvIGJlIGluc2VydGVkIGlzIHRyZWF0ZWQgYXMgYSBzbmlwcGV0LlxuICAgICAqXG4gICAgICogQSBzbmlwcGV0IGNhbiBkZWZpbmUgdGFiIHN0b3BzIGFuZCBwbGFjZWhvbGRlcnMgd2l0aCBgJDFgLCBgJDJgXG4gICAgICogYW5kIGAkezM6Zm9vfWAuIGAkMGAgZGVmaW5lcyB0aGUgZmluYWwgdGFiIHN0b3AsIGl0IGRlZmF1bHRzIHRvXG4gICAgICogdGhlIGVuZCBvZiB0aGUgc25pcHBldC4gUGxhY2Vob2xkZXJzIHdpdGggZXF1YWwgaWRlbnRpZmllcnMgYXJlIGxpbmtlZCxcbiAgICAgKiB0aGF0IGlzIHR5cGluZyBpbiBvbmUgd2lsbCB1cGRhdGUgb3RoZXJzIHRvby5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvOiBodHRwczovL21pY3Jvc29mdC5naXRodWIuaW8vbGFuZ3VhZ2Utc2VydmVyLXByb3RvY29sL3NwZWNpZmljYXRpb25zL3NwZWNpZmljYXRpb24tY3VycmVudC8jc25pcHBldF9zeW50YXhcbiAgICAgKi9cbiAgICBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQgPSAyO1xufSkoSW5zZXJ0VGV4dEZvcm1hdCB8fCAoSW5zZXJ0VGV4dEZvcm1hdCA9IHt9KSk7XG4vKipcbiAqIENvbXBsZXRpb24gaXRlbSB0YWdzIGFyZSBleHRyYSBhbm5vdGF0aW9ucyB0aGF0IHR3ZWFrIHRoZSByZW5kZXJpbmcgb2YgYSBjb21wbGV0aW9uXG4gKiBpdGVtLlxuICpcbiAqIEBzaW5jZSAzLjE1LjBcbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbVRhZztcbihmdW5jdGlvbiAoQ29tcGxldGlvbkl0ZW1UYWcpIHtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBjb21wbGV0aW9uIGFzIG9ic29sZXRlLCB1c3VhbGx5IHVzaW5nIGEgc3RyaWtlLW91dC5cbiAgICAgKi9cbiAgICBDb21wbGV0aW9uSXRlbVRhZy5EZXByZWNhdGVkID0gMTtcbn0pKENvbXBsZXRpb25JdGVtVGFnIHx8IChDb21wbGV0aW9uSXRlbVRhZyA9IHt9KSk7XG4vKipcbiAqIFRoZSBJbnNlcnRSZXBsYWNlRWRpdCBuYW1lc3BhY2UgcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGRlYWwgd2l0aCBpbnNlcnQgLyByZXBsYWNlIGVkaXRzLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBJbnNlcnRSZXBsYWNlRWRpdDtcbihmdW5jdGlvbiAoSW5zZXJ0UmVwbGFjZUVkaXQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc2VydCAvIHJlcGxhY2UgZWRpdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShuZXdUZXh0LCBpbnNlcnQsIHJlcGxhY2UpIHtcbiAgICAgICAgcmV0dXJuIHsgbmV3VGV4dDogbmV3VGV4dCwgaW5zZXJ0OiBpbnNlcnQsIHJlcGxhY2U6IHJlcGxhY2UgfTtcbiAgICB9XG4gICAgSW5zZXJ0UmVwbGFjZUVkaXQuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgSW5zZXJ0UmVwbGFjZUVkaXR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5uZXdUZXh0KSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUuaW5zZXJ0KSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmVwbGFjZSk7XG4gICAgfVxuICAgIEluc2VydFJlcGxhY2VFZGl0LmlzID0gaXM7XG59KShJbnNlcnRSZXBsYWNlRWRpdCB8fCAoSW5zZXJ0UmVwbGFjZUVkaXQgPSB7fSkpO1xuLyoqXG4gKiBIb3cgd2hpdGVzcGFjZSBhbmQgaW5kZW50YXRpb24gaXMgaGFuZGxlZCBkdXJpbmcgY29tcGxldGlvblxuICogaXRlbSBpbnNlcnRpb24uXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG5leHBvcnQgdmFyIEluc2VydFRleHRNb2RlO1xuKGZ1bmN0aW9uIChJbnNlcnRUZXh0TW9kZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBpbnNlcnRpb24gb3IgcmVwbGFjZSBzdHJpbmdzIGlzIHRha2VuIGFzIGl0IGlzLiBJZiB0aGVcbiAgICAgKiB2YWx1ZSBpcyBtdWx0aSBsaW5lIHRoZSBsaW5lcyBiZWxvdyB0aGUgY3Vyc29yIHdpbGwgYmVcbiAgICAgKiBpbnNlcnRlZCB1c2luZyB0aGUgaW5kZW50YXRpb24gZGVmaW5lZCBpbiB0aGUgc3RyaW5nIHZhbHVlLlxuICAgICAqIFRoZSBjbGllbnQgd2lsbCBub3QgYXBwbHkgYW55IGtpbmQgb2YgYWRqdXN0bWVudHMgdG8gdGhlXG4gICAgICogc3RyaW5nLlxuICAgICAqL1xuICAgIEluc2VydFRleHRNb2RlLmFzSXMgPSAxO1xuICAgIC8qKlxuICAgICAqIFRoZSBlZGl0b3IgYWRqdXN0cyBsZWFkaW5nIHdoaXRlc3BhY2Ugb2YgbmV3IGxpbmVzIHNvIHRoYXRcbiAgICAgKiB0aGV5IG1hdGNoIHRoZSBpbmRlbnRhdGlvbiB1cCB0byB0aGUgY3Vyc29yIG9mIHRoZSBsaW5lIGZvclxuICAgICAqIHdoaWNoIHRoZSBpdGVtIGlzIGFjY2VwdGVkLlxuICAgICAqXG4gICAgICogQ29uc2lkZXIgYSBsaW5lIGxpa2UgdGhpczogPDJ0YWJzPjxjdXJzb3I+PDN0YWJzPmZvby4gQWNjZXB0aW5nIGFcbiAgICAgKiBtdWx0aSBsaW5lIGNvbXBsZXRpb24gaXRlbSBpcyBpbmRlbnRlZCB1c2luZyAyIHRhYnMgYW5kIGFsbFxuICAgICAqIGZvbGxvd2luZyBsaW5lcyBpbnNlcnRlZCB3aWxsIGJlIGluZGVudGVkIHVzaW5nIDIgdGFicyBhcyB3ZWxsLlxuICAgICAqL1xuICAgIEluc2VydFRleHRNb2RlLmFkanVzdEluZGVudGF0aW9uID0gMjtcbn0pKEluc2VydFRleHRNb2RlIHx8IChJbnNlcnRUZXh0TW9kZSA9IHt9KSk7XG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtTGFiZWxEZXRhaWxzO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbUxhYmVsRGV0YWlscykge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS5kZXRhaWwpIHx8IGNhbmRpZGF0ZS5kZXRhaWwgPT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgIChJcy5zdHJpbmcoY2FuZGlkYXRlLmRlc2NyaXB0aW9uKSB8fCBjYW5kaWRhdGUuZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIENvbXBsZXRpb25JdGVtTGFiZWxEZXRhaWxzLmlzID0gaXM7XG59KShDb21wbGV0aW9uSXRlbUxhYmVsRGV0YWlscyB8fCAoQ29tcGxldGlvbkl0ZW1MYWJlbERldGFpbHMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tcGxldGlvbkl0ZW0gbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGhcbiAqIGNvbXBsZXRpb24gaXRlbXMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkl0ZW07XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcGxldGlvbiBpdGVtIGFuZCBzZWVkIGl0IHdpdGggYSBsYWJlbC5cbiAgICAgKiBAcGFyYW0gbGFiZWwgVGhlIGNvbXBsZXRpb24gaXRlbSdzIGxhYmVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBsYWJlbCB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uSXRlbS5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uSXRlbSB8fCAoQ29tcGxldGlvbkl0ZW0gPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tcGxldGlvbkxpc3QgbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGhcbiAqIGNvbXBsZXRpb24gbGlzdHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkxpc3Q7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25MaXN0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb21wbGV0aW9uIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGNvbXBsZXRpb24gaXRlbXMuXG4gICAgICogQHBhcmFtIGlzSW5jb21wbGV0ZSBUaGUgbGlzdCBpcyBub3QgY29tcGxldGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGl0ZW1zLCBpc0luY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIHsgaXRlbXM6IGl0ZW1zID8gaXRlbXMgOiBbXSwgaXNJbmNvbXBsZXRlOiAhIWlzSW5jb21wbGV0ZSB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uTGlzdCB8fCAoQ29tcGxldGlvbkxpc3QgPSB7fSkpO1xuZXhwb3J0IHZhciBNYXJrZWRTdHJpbmc7XG4oZnVuY3Rpb24gKE1hcmtlZFN0cmluZykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXJrZWQgc3RyaW5nIGZyb20gcGxhaW4gdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbGFpblRleHQgVGhlIHBsYWluIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZnJvbVBsYWluVGV4dChwbGFpblRleHQpIHtcbiAgICAgICAgcmV0dXJuIHBsYWluVGV4dC5yZXBsYWNlKC9bXFxcXGAqX3t9W1xcXSgpIytcXC0uIV0vZywgJ1xcXFwkJicpOyAvLyBlc2NhcGUgbWFya2Rvd24gc3ludGF4IHRva2VuczogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC9wcm9qZWN0cy9tYXJrZG93bi9zeW50YXgjYmFja3NsYXNoXG4gICAgfVxuICAgIE1hcmtlZFN0cmluZy5mcm9tUGxhaW5UZXh0ID0gZnJvbVBsYWluVGV4dDtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIHtAbGluayBNYXJrZWRTdHJpbmd9IHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZSkgfHwgKElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnZhbHVlKSk7XG4gICAgfVxuICAgIE1hcmtlZFN0cmluZy5pcyA9IGlzO1xufSkoTWFya2VkU3RyaW5nIHx8IChNYXJrZWRTdHJpbmcgPSB7fSkpO1xuZXhwb3J0IHZhciBIb3ZlcjtcbihmdW5jdGlvbiAoSG92ZXIpIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIHtAbGluayBIb3Zlcn0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuICEhY2FuZGlkYXRlICYmIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiAoTWFya3VwQ29udGVudC5pcyhjYW5kaWRhdGUuY29udGVudHMpIHx8XG4gICAgICAgICAgICBNYXJrZWRTdHJpbmcuaXMoY2FuZGlkYXRlLmNvbnRlbnRzKSB8fFxuICAgICAgICAgICAgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuY29udGVudHMsIE1hcmtlZFN0cmluZy5pcykpICYmICh2YWx1ZS5yYW5nZSA9PT0gdW5kZWZpbmVkIHx8IFJhbmdlLmlzKHZhbHVlLnJhbmdlKSk7XG4gICAgfVxuICAgIEhvdmVyLmlzID0gaXM7XG59KShIb3ZlciB8fCAoSG92ZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgUGFyYW1ldGVySW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgUGFyYW1ldGVySW5mb3JtYXRpb259IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFBhcmFtZXRlckluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChQYXJhbWV0ZXJJbmZvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcGFyYW1ldGVyIGluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGFiZWwgQSBsYWJlbCBzdHJpbmcuXG4gICAgICogQHBhcmFtIGRvY3VtZW50YXRpb24gQSBkb2Mgc3RyaW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCwgZG9jdW1lbnRhdGlvbikge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnRhdGlvbiA/IHsgbGFiZWw6IGxhYmVsLCBkb2N1bWVudGF0aW9uOiBkb2N1bWVudGF0aW9uIH0gOiB7IGxhYmVsOiBsYWJlbCB9O1xuICAgIH1cbiAgICBQYXJhbWV0ZXJJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG59KShQYXJhbWV0ZXJJbmZvcm1hdGlvbiB8fCAoUGFyYW1ldGVySW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgU2lnbmF0dXJlSW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgU2lnbmF0dXJlSW5mb3JtYXRpb259IGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFNpZ25hdHVyZUluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChTaWduYXR1cmVJbmZvcm1hdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCwgZG9jdW1lbnRhdGlvbikge1xuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgcGFyYW1ldGVyc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0geyBsYWJlbDogbGFiZWwgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoZG9jdW1lbnRhdGlvbikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kb2N1bWVudGF0aW9uID0gZG9jdW1lbnRhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChwYXJhbWV0ZXJzKSkge1xuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBTaWduYXR1cmVJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG59KShTaWduYXR1cmVJbmZvcm1hdGlvbiB8fCAoU2lnbmF0dXJlSW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBBIGRvY3VtZW50IGhpZ2hsaWdodCBraW5kLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0S2luZDtcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHRLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQSB0ZXh0dWFsIG9jY3VycmVuY2UuXG4gICAgICovXG4gICAgRG9jdW1lbnRIaWdobGlnaHRLaW5kLlRleHQgPSAxO1xuICAgIC8qKlxuICAgICAqIFJlYWQtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHJlYWRpbmcgYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuUmVhZCA9IDI7XG4gICAgLyoqXG4gICAgICogV3JpdGUtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHdyaXRpbmcgdG8gYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuV3JpdGUgPSAzO1xufSkoRG9jdW1lbnRIaWdobGlnaHRLaW5kIHx8IChEb2N1bWVudEhpZ2hsaWdodEtpbmQgPSB7fSkpO1xuLyoqXG4gKiBEb2N1bWVudEhpZ2hsaWdodCBuYW1lc3BhY2UgdG8gcHJvdmlkZSBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIERvY3VtZW50SGlnaGxpZ2h0fSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBEb2N1bWVudEhpZ2hsaWdodDtcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBEb2N1bWVudEhpZ2hsaWdodCBvYmplY3QuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0aGUgaGlnaGxpZ2h0IGFwcGxpZXMgdG8uXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGhpZ2hsaWdodCBraW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBraW5kKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSB9O1xuICAgICAgICBpZiAoSXMubnVtYmVyKGtpbmQpKSB7XG4gICAgICAgICAgICByZXN1bHQua2luZCA9IGtpbmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgRG9jdW1lbnRIaWdobGlnaHQuY3JlYXRlID0gY3JlYXRlO1xufSkoRG9jdW1lbnRIaWdobGlnaHQgfHwgKERvY3VtZW50SGlnaGxpZ2h0ID0ge30pKTtcbi8qKlxuICogQSBzeW1ib2wga2luZC5cbiAqL1xuZXhwb3J0IHZhciBTeW1ib2xLaW5kO1xuKGZ1bmN0aW9uIChTeW1ib2xLaW5kKSB7XG4gICAgU3ltYm9sS2luZC5GaWxlID0gMTtcbiAgICBTeW1ib2xLaW5kLk1vZHVsZSA9IDI7XG4gICAgU3ltYm9sS2luZC5OYW1lc3BhY2UgPSAzO1xuICAgIFN5bWJvbEtpbmQuUGFja2FnZSA9IDQ7XG4gICAgU3ltYm9sS2luZC5DbGFzcyA9IDU7XG4gICAgU3ltYm9sS2luZC5NZXRob2QgPSA2O1xuICAgIFN5bWJvbEtpbmQuUHJvcGVydHkgPSA3O1xuICAgIFN5bWJvbEtpbmQuRmllbGQgPSA4O1xuICAgIFN5bWJvbEtpbmQuQ29uc3RydWN0b3IgPSA5O1xuICAgIFN5bWJvbEtpbmQuRW51bSA9IDEwO1xuICAgIFN5bWJvbEtpbmQuSW50ZXJmYWNlID0gMTE7XG4gICAgU3ltYm9sS2luZC5GdW5jdGlvbiA9IDEyO1xuICAgIFN5bWJvbEtpbmQuVmFyaWFibGUgPSAxMztcbiAgICBTeW1ib2xLaW5kLkNvbnN0YW50ID0gMTQ7XG4gICAgU3ltYm9sS2luZC5TdHJpbmcgPSAxNTtcbiAgICBTeW1ib2xLaW5kLk51bWJlciA9IDE2O1xuICAgIFN5bWJvbEtpbmQuQm9vbGVhbiA9IDE3O1xuICAgIFN5bWJvbEtpbmQuQXJyYXkgPSAxODtcbiAgICBTeW1ib2xLaW5kLk9iamVjdCA9IDE5O1xuICAgIFN5bWJvbEtpbmQuS2V5ID0gMjA7XG4gICAgU3ltYm9sS2luZC5OdWxsID0gMjE7XG4gICAgU3ltYm9sS2luZC5FbnVtTWVtYmVyID0gMjI7XG4gICAgU3ltYm9sS2luZC5TdHJ1Y3QgPSAyMztcbiAgICBTeW1ib2xLaW5kLkV2ZW50ID0gMjQ7XG4gICAgU3ltYm9sS2luZC5PcGVyYXRvciA9IDI1O1xuICAgIFN5bWJvbEtpbmQuVHlwZVBhcmFtZXRlciA9IDI2O1xufSkoU3ltYm9sS2luZCB8fCAoU3ltYm9sS2luZCA9IHt9KSk7XG4vKipcbiAqIFN5bWJvbCB0YWdzIGFyZSBleHRyYSBhbm5vdGF0aW9ucyB0aGF0IHR3ZWFrIHRoZSByZW5kZXJpbmcgb2YgYSBzeW1ib2wuXG4gKlxuICogQHNpbmNlIDMuMTZcbiAqL1xuZXhwb3J0IHZhciBTeW1ib2xUYWc7XG4oZnVuY3Rpb24gKFN5bWJvbFRhZykge1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIHN5bWJvbCBhcyBvYnNvbGV0ZSwgdXN1YWxseSB1c2luZyBhIHN0cmlrZS1vdXQuXG4gICAgICovXG4gICAgU3ltYm9sVGFnLkRlcHJlY2F0ZWQgPSAxO1xufSkoU3ltYm9sVGFnIHx8IChTeW1ib2xUYWcgPSB7fSkpO1xuZXhwb3J0IHZhciBTeW1ib2xJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoU3ltYm9sSW5mb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHN5bWJvbCBpbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGhlIGxvY2F0aW9uIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgcmVzb3VyY2Ugb2YgdGhlIGxvY2F0aW9uIG9mIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gY29udGFpbmVyTmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sIGNvbnRhaW5pbmcgdGhlIHN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwga2luZCwgcmFuZ2UsIHVyaSwgY29udGFpbmVyTmFtZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgICAgICBsb2NhdGlvbjogeyB1cmk6IHVyaSwgcmFuZ2U6IHJhbmdlIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb250YWluZXJOYW1lID0gY29udGFpbmVyTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBTeW1ib2xJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG59KShTeW1ib2xJbmZvcm1hdGlvbiB8fCAoU3ltYm9sSW5mb3JtYXRpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBXb3Jrc3BhY2VTeW1ib2w7XG4oZnVuY3Rpb24gKFdvcmtzcGFjZVN5bWJvbCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3b3Jrc3BhY2Ugc3ltYm9sLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIHJlc291cmNlIG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSByYW5nZSBBbiBvcHRpb25zIHJhbmdlIG9mIHRoZSBsb2NhdGlvbi5cbiAgICAgKiBAcmV0dXJucyBBIFdvcmtzcGFjZVN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwga2luZCwgdXJpLCByYW5nZSkge1xuICAgICAgICByZXR1cm4gcmFuZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB7IG5hbWU6IG5hbWUsIGtpbmQ6IGtpbmQsIGxvY2F0aW9uOiB7IHVyaTogdXJpLCByYW5nZTogcmFuZ2UgfSB9XG4gICAgICAgICAgICA6IHsgbmFtZTogbmFtZSwga2luZDoga2luZCwgbG9jYXRpb246IHsgdXJpOiB1cmkgfSB9O1xuICAgIH1cbiAgICBXb3Jrc3BhY2VTeW1ib2wuY3JlYXRlID0gY3JlYXRlO1xufSkoV29ya3NwYWNlU3ltYm9sIHx8IChXb3Jrc3BhY2VTeW1ib2wgPSB7fSkpO1xuZXhwb3J0IHZhciBEb2N1bWVudFN5bWJvbDtcbihmdW5jdGlvbiAoRG9jdW1lbnRTeW1ib2wpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHN5bWJvbCBpbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gZGV0YWlsIFRoZSBkZXRhaWwgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gc2VsZWN0aW9uUmFuZ2UgVGhlIHNlbGVjdGlvblJhbmdlIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIGNoaWxkcmVuIENoaWxkcmVuIG9mIHRoZSBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIGRldGFpbCwga2luZCwgcmFuZ2UsIHNlbGVjdGlvblJhbmdlLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGRldGFpbDogZGV0YWlsLFxuICAgICAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgIHNlbGVjdGlvblJhbmdlOiBzZWxlY3Rpb25SYW5nZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgRG9jdW1lbnRTeW1ib2wuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgRG9jdW1lbnRTeW1ib2x9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiZcbiAgICAgICAgICAgIElzLnN0cmluZyhjYW5kaWRhdGUubmFtZSkgJiYgSXMubnVtYmVyKGNhbmRpZGF0ZS5raW5kKSAmJlxuICAgICAgICAgICAgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUuc2VsZWN0aW9uUmFuZ2UpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRldGFpbCA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUuZGV0YWlsKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuZGVwcmVjYXRlZCA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLmRlcHJlY2F0ZWQpKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5jaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLmNoaWxkcmVuKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUudGFncyA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLnRhZ3MpKTtcbiAgICB9XG4gICAgRG9jdW1lbnRTeW1ib2wuaXMgPSBpcztcbn0pKERvY3VtZW50U3ltYm9sIHx8IChEb2N1bWVudFN5bWJvbCA9IHt9KSk7XG4vKipcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgY29kZSBhY3Rpb24ga2luZHNcbiAqL1xuZXhwb3J0IHZhciBDb2RlQWN0aW9uS2luZDtcbihmdW5jdGlvbiAoQ29kZUFjdGlvbktpbmQpIHtcbiAgICAvKipcbiAgICAgKiBFbXB0eSBraW5kLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLkVtcHR5ID0gJyc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciBxdWlja2ZpeCBhY3Rpb25zOiAncXVpY2tmaXgnXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuUXVpY2tGaXggPSAncXVpY2tmaXgnO1xuICAgIC8qKlxuICAgICAqIEJhc2Uga2luZCBmb3IgcmVmYWN0b3JpbmcgYWN0aW9uczogJ3JlZmFjdG9yJ1xuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yID0gJ3JlZmFjdG9yJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHJlZmFjdG9yaW5nIGV4dHJhY3Rpb24gYWN0aW9uczogJ3JlZmFjdG9yLmV4dHJhY3QnXG4gICAgICpcbiAgICAgKiBFeGFtcGxlIGV4dHJhY3QgYWN0aW9uczpcbiAgICAgKlxuICAgICAqIC0gRXh0cmFjdCBtZXRob2RcbiAgICAgKiAtIEV4dHJhY3QgZnVuY3Rpb25cbiAgICAgKiAtIEV4dHJhY3QgdmFyaWFibGVcbiAgICAgKiAtIEV4dHJhY3QgaW50ZXJmYWNlIGZyb20gY2xhc3NcbiAgICAgKiAtIC4uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yRXh0cmFjdCA9ICdyZWZhY3Rvci5leHRyYWN0JztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHJlZmFjdG9yaW5nIGlubGluZSBhY3Rpb25zOiAncmVmYWN0b3IuaW5saW5lJ1xuICAgICAqXG4gICAgICogRXhhbXBsZSBpbmxpbmUgYWN0aW9uczpcbiAgICAgKlxuICAgICAqIC0gSW5saW5lIGZ1bmN0aW9uXG4gICAgICogLSBJbmxpbmUgdmFyaWFibGVcbiAgICAgKiAtIElubGluZSBjb25zdGFudFxuICAgICAqIC0gLi4uXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuUmVmYWN0b3JJbmxpbmUgPSAncmVmYWN0b3IuaW5saW5lJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHJlZmFjdG9yaW5nIHJld3JpdGUgYWN0aW9uczogJ3JlZmFjdG9yLnJld3JpdGUnXG4gICAgICpcbiAgICAgKiBFeGFtcGxlIHJld3JpdGUgYWN0aW9uczpcbiAgICAgKlxuICAgICAqIC0gQ29udmVydCBKYXZhU2NyaXB0IGZ1bmN0aW9uIHRvIGNsYXNzXG4gICAgICogLSBBZGQgb3IgcmVtb3ZlIHBhcmFtZXRlclxuICAgICAqIC0gRW5jYXBzdWxhdGUgZmllbGRcbiAgICAgKiAtIE1ha2UgbWV0aG9kIHN0YXRpY1xuICAgICAqIC0gTW92ZSBtZXRob2QgdG8gYmFzZSBjbGFzc1xuICAgICAqIC0gLi4uXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuUmVmYWN0b3JSZXdyaXRlID0gJ3JlZmFjdG9yLnJld3JpdGUnO1xuICAgIC8qKlxuICAgICAqIEJhc2Uga2luZCBmb3Igc291cmNlIGFjdGlvbnM6IGBzb3VyY2VgXG4gICAgICpcbiAgICAgKiBTb3VyY2UgY29kZSBhY3Rpb25zIGFwcGx5IHRvIHRoZSBlbnRpcmUgZmlsZS5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5Tb3VyY2UgPSAnc291cmNlJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIGFuIG9yZ2FuaXplIGltcG9ydHMgc291cmNlIGFjdGlvbjogYHNvdXJjZS5vcmdhbml6ZUltcG9ydHNgXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuU291cmNlT3JnYW5pemVJbXBvcnRzID0gJ3NvdXJjZS5vcmdhbml6ZUltcG9ydHMnO1xuICAgIC8qKlxuICAgICAqIEJhc2Uga2luZCBmb3IgYXV0by1maXggc291cmNlIGFjdGlvbnM6IGBzb3VyY2UuZml4QWxsYC5cbiAgICAgKlxuICAgICAqIEZpeCBhbGwgYWN0aW9ucyBhdXRvbWF0aWNhbGx5IGZpeCBlcnJvcnMgdGhhdCBoYXZlIGEgY2xlYXIgZml4IHRoYXQgZG8gbm90IHJlcXVpcmUgdXNlciBpbnB1dC5cbiAgICAgKiBUaGV5IHNob3VsZCBub3Qgc3VwcHJlc3MgZXJyb3JzIG9yIHBlcmZvcm0gdW5zYWZlIGZpeGVzIHN1Y2ggYXMgZ2VuZXJhdGluZyBuZXcgdHlwZXMgb3IgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAzLjE1LjBcbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5Tb3VyY2VGaXhBbGwgPSAnc291cmNlLmZpeEFsbCc7XG59KShDb2RlQWN0aW9uS2luZCB8fCAoQ29kZUFjdGlvbktpbmQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgcmVhc29uIHdoeSBjb2RlIGFjdGlvbnMgd2VyZSByZXF1ZXN0ZWQuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIENvZGVBY3Rpb25UcmlnZ2VyS2luZDtcbihmdW5jdGlvbiAoQ29kZUFjdGlvblRyaWdnZXJLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQ29kZSBhY3Rpb25zIHdlcmUgZXhwbGljaXRseSByZXF1ZXN0ZWQgYnkgdGhlIHVzZXIgb3IgYnkgYW4gZXh0ZW5zaW9uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25UcmlnZ2VyS2luZC5JbnZva2VkID0gMTtcbiAgICAvKipcbiAgICAgKiBDb2RlIGFjdGlvbnMgd2VyZSByZXF1ZXN0ZWQgYXV0b21hdGljYWxseS5cbiAgICAgKlxuICAgICAqIFRoaXMgdHlwaWNhbGx5IGhhcHBlbnMgd2hlbiBjdXJyZW50IHNlbGVjdGlvbiBpbiBhIGZpbGUgY2hhbmdlcywgYnV0IGNhblxuICAgICAqIGFsc28gYmUgdHJpZ2dlcmVkIHdoZW4gZmlsZSBjb250ZW50IGNoYW5nZXMuXG4gICAgICovXG4gICAgQ29kZUFjdGlvblRyaWdnZXJLaW5kLkF1dG9tYXRpYyA9IDI7XG59KShDb2RlQWN0aW9uVHJpZ2dlcktpbmQgfHwgKENvZGVBY3Rpb25UcmlnZ2VyS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2RlQWN0aW9uQ29udGV4dCBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIHtAbGluayBDb2RlQWN0aW9uQ29udGV4dH0gbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29kZUFjdGlvbkNvbnRleHQ7XG4oZnVuY3Rpb24gKENvZGVBY3Rpb25Db250ZXh0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2RlQWN0aW9uQ29udGV4dCBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaWFnbm9zdGljcywgb25seSwgdHJpZ2dlcktpbmQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgZGlhZ25vc3RpY3M6IGRpYWdub3N0aWNzIH07XG4gICAgICAgIGlmIChvbmx5ICE9PSB1bmRlZmluZWQgJiYgb25seSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0Lm9ubHkgPSBvbmx5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmlnZ2VyS2luZCAhPT0gdW5kZWZpbmVkICYmIHRyaWdnZXJLaW5kICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXN1bHQudHJpZ2dlcktpbmQgPSB0cmlnZ2VyS2luZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBDb2RlQWN0aW9uQ29udGV4dH0gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5kaWFnbm9zdGljcywgRGlhZ25vc3RpYy5pcylcbiAgICAgICAgICAgICYmIChjYW5kaWRhdGUub25seSA9PT0gdW5kZWZpbmVkIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLm9ubHksIElzLnN0cmluZykpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnRyaWdnZXJLaW5kID09PSB1bmRlZmluZWQgfHwgY2FuZGlkYXRlLnRyaWdnZXJLaW5kID09PSBDb2RlQWN0aW9uVHJpZ2dlcktpbmQuSW52b2tlZCB8fCBjYW5kaWRhdGUudHJpZ2dlcktpbmQgPT09IENvZGVBY3Rpb25UcmlnZ2VyS2luZC5BdXRvbWF0aWMpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5pcyA9IGlzO1xufSkoQ29kZUFjdGlvbkNvbnRleHQgfHwgKENvZGVBY3Rpb25Db250ZXh0ID0ge30pKTtcbmV4cG9ydCB2YXIgQ29kZUFjdGlvbjtcbihmdW5jdGlvbiAoQ29kZUFjdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0aXRsZSwga2luZE9yQ29tbWFuZE9yRWRpdCwga2luZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0geyB0aXRsZTogdGl0bGUgfTtcbiAgICAgICAgdmFyIGNoZWNrS2luZCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Yga2luZE9yQ29tbWFuZE9yRWRpdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNoZWNrS2luZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kT3JDb21tYW5kT3JFZGl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENvbW1hbmQuaXMoa2luZE9yQ29tbWFuZE9yRWRpdCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb21tYW5kID0ga2luZE9yQ29tbWFuZE9yRWRpdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lZGl0ID0ga2luZE9yQ29tbWFuZE9yRWRpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2tLaW5kICYmIGtpbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvZGVBY3Rpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRpdGxlKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kaWFnbm9zdGljcyA9PT0gdW5kZWZpbmVkIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmRpYWdub3N0aWNzLCBEaWFnbm9zdGljLmlzKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUua2luZCA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUua2luZCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmVkaXQgIT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUuY29tbWFuZCAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5jb21tYW5kID09PSB1bmRlZmluZWQgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmlzUHJlZmVycmVkID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUuaXNQcmVmZXJyZWQpKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5lZGl0ID09PSB1bmRlZmluZWQgfHwgV29ya3NwYWNlRWRpdC5pcyhjYW5kaWRhdGUuZWRpdCkpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uLmlzID0gaXM7XG59KShDb2RlQWN0aW9uIHx8IChDb2RlQWN0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVMZW5zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIENvZGVMZW5zfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb2RlTGVucztcbihmdW5jdGlvbiAoQ29kZUxlbnMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENvZGVMZW5zIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCBkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHJhbmdlOiByYW5nZSB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChkYXRhKSkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvZGVMZW5zLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIENvZGVMZW5zfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29tbWFuZCkgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpO1xuICAgIH1cbiAgICBDb2RlTGVucy5pcyA9IGlzO1xufSkoQ29kZUxlbnMgfHwgKENvZGVMZW5zID0ge30pKTtcbi8qKlxuICogVGhlIEZvcm1hdHRpbmdPcHRpb25zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIEZvcm1hdHRpbmdPcHRpb25zfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBGb3JtYXR0aW5nT3B0aW9ucztcbihmdW5jdGlvbiAoRm9ybWF0dGluZ09wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvcm1hdHRpbmdPcHRpb25zIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRhYlNpemUsIGluc2VydFNwYWNlcykge1xuICAgICAgICByZXR1cm4geyB0YWJTaXplOiB0YWJTaXplLCBpbnNlcnRTcGFjZXM6IGluc2VydFNwYWNlcyB9O1xuICAgIH1cbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBGb3JtYXR0aW5nT3B0aW9uc30gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUudGFiU2l6ZSkgJiYgSXMuYm9vbGVhbihjYW5kaWRhdGUuaW5zZXJ0U3BhY2VzKTtcbiAgICB9XG4gICAgRm9ybWF0dGluZ09wdGlvbnMuaXMgPSBpcztcbn0pKEZvcm1hdHRpbmdPcHRpb25zIHx8IChGb3JtYXR0aW5nT3B0aW9ucyA9IHt9KSk7XG4vKipcbiAqIFRoZSBEb2N1bWVudExpbmsgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgRG9jdW1lbnRMaW5rfSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBEb2N1bWVudExpbms7XG4oZnVuY3Rpb24gKERvY3VtZW50TGluaykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRG9jdW1lbnRMaW5rIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJhbmdlLCB0YXJnZXQsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCB0YXJnZXQ6IHRhcmdldCwgZGF0YTogZGF0YSB9O1xuICAgIH1cbiAgICBEb2N1bWVudExpbmsuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSB7QGxpbmsgRG9jdW1lbnRMaW5rfSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGFyZ2V0KSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRhcmdldCkpO1xuICAgIH1cbiAgICBEb2N1bWVudExpbmsuaXMgPSBpcztcbn0pKERvY3VtZW50TGluayB8fCAoRG9jdW1lbnRMaW5rID0ge30pKTtcbi8qKlxuICogVGhlIFNlbGVjdGlvblJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb24gdG8gd29yayB3aXRoXG4gKiBTZWxlY3Rpb25SYW5nZSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBTZWxlY3Rpb25SYW5nZTtcbihmdW5jdGlvbiAoU2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNlbGVjdGlvblJhbmdlXG4gICAgICogQHBhcmFtIHJhbmdlIHRoZSByYW5nZS5cbiAgICAgKiBAcGFyYW0gcGFyZW50IGFuIG9wdGlvbmFsIHBhcmVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHBhcmVudCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIHBhcmVudDogcGFyZW50IH07XG4gICAgfVxuICAgIFNlbGVjdGlvblJhbmdlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoY2FuZGlkYXRlLnBhcmVudCA9PT0gdW5kZWZpbmVkIHx8IFNlbGVjdGlvblJhbmdlLmlzKGNhbmRpZGF0ZS5wYXJlbnQpKTtcbiAgICB9XG4gICAgU2VsZWN0aW9uUmFuZ2UuaXMgPSBpcztcbn0pKFNlbGVjdGlvblJhbmdlIHx8IChTZWxlY3Rpb25SYW5nZSA9IHt9KSk7XG4vKipcbiAqIEEgc2V0IG9mIHByZWRlZmluZWQgdG9rZW4gdHlwZXMuIFRoaXMgc2V0IGlzIG5vdCBmaXhlZFxuICogYW4gY2xpZW50cyBjYW4gc3BlY2lmeSBhZGRpdGlvbmFsIHRva2VuIHR5cGVzIHZpYSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgY2xpZW50IGNhcGFiaWxpdGllcy5cbiAqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbmV4cG9ydCB2YXIgU2VtYW50aWNUb2tlblR5cGVzO1xuKGZ1bmN0aW9uIChTZW1hbnRpY1Rva2VuVHlwZXMpIHtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJuYW1lc3BhY2VcIl0gPSBcIm5hbWVzcGFjZVwiO1xuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgYSBnZW5lcmljIHR5cGUuIEFjdHMgYXMgYSBmYWxsYmFjayBmb3IgdHlwZXMgd2hpY2ggY2FuJ3QgYmUgbWFwcGVkIHRvXG4gICAgICogYSBzcGVjaWZpYyB0eXBlIGxpa2UgY2xhc3Mgb3IgZW51bS5cbiAgICAgKi9cbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJ0eXBlXCJdID0gXCJ0eXBlXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiY2xhc3NcIl0gPSBcImNsYXNzXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiZW51bVwiXSA9IFwiZW51bVwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcImludGVyZmFjZVwiXSA9IFwiaW50ZXJmYWNlXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wic3RydWN0XCJdID0gXCJzdHJ1Y3RcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJ0eXBlUGFyYW1ldGVyXCJdID0gXCJ0eXBlUGFyYW1ldGVyXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wicGFyYW1ldGVyXCJdID0gXCJwYXJhbWV0ZXJcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJ2YXJpYWJsZVwiXSA9IFwidmFyaWFibGVcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJwcm9wZXJ0eVwiXSA9IFwicHJvcGVydHlcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJlbnVtTWVtYmVyXCJdID0gXCJlbnVtTWVtYmVyXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiZXZlbnRcIl0gPSBcImV2ZW50XCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiZnVuY3Rpb25cIl0gPSBcImZ1bmN0aW9uXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wibWV0aG9kXCJdID0gXCJtZXRob2RcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJtYWNyb1wiXSA9IFwibWFjcm9cIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJrZXl3b3JkXCJdID0gXCJrZXl3b3JkXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wibW9kaWZpZXJcIl0gPSBcIm1vZGlmaWVyXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wiY29tbWVudFwiXSA9IFwiY29tbWVudFwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcInN0cmluZ1wiXSA9IFwic3RyaW5nXCI7XG4gICAgU2VtYW50aWNUb2tlblR5cGVzW1wibnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJyZWdleHBcIl0gPSBcInJlZ2V4cFwiO1xuICAgIFNlbWFudGljVG9rZW5UeXBlc1tcIm9wZXJhdG9yXCJdID0gXCJvcGVyYXRvclwiO1xuICAgIC8qKlxuICAgICAqIEBzaW5jZSAzLjE3LjBcbiAgICAgKi9cbiAgICBTZW1hbnRpY1Rva2VuVHlwZXNbXCJkZWNvcmF0b3JcIl0gPSBcImRlY29yYXRvclwiO1xufSkoU2VtYW50aWNUb2tlblR5cGVzIHx8IChTZW1hbnRpY1Rva2VuVHlwZXMgPSB7fSkpO1xuLyoqXG4gKiBBIHNldCBvZiBwcmVkZWZpbmVkIHRva2VuIG1vZGlmaWVycy4gVGhpcyBzZXQgaXMgbm90IGZpeGVkXG4gKiBhbiBjbGllbnRzIGNhbiBzcGVjaWZ5IGFkZGl0aW9uYWwgdG9rZW4gdHlwZXMgdmlhIHRoZVxuICogY29ycmVzcG9uZGluZyBjbGllbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzO1xuKGZ1bmN0aW9uIChTZW1hbnRpY1Rva2VuTW9kaWZpZXJzKSB7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImRlY2xhcmF0aW9uXCJdID0gXCJkZWNsYXJhdGlvblwiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJkZWZpbml0aW9uXCJdID0gXCJkZWZpbml0aW9uXCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcInJlYWRvbmx5XCJdID0gXCJyZWFkb25seVwiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJzdGF0aWNcIl0gPSBcInN0YXRpY1wiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJkZXByZWNhdGVkXCJdID0gXCJkZXByZWNhdGVkXCI7XG4gICAgU2VtYW50aWNUb2tlbk1vZGlmaWVyc1tcImFic3RyYWN0XCJdID0gXCJhYnN0cmFjdFwiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJhc3luY1wiXSA9IFwiYXN5bmNcIjtcbiAgICBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzW1wibW9kaWZpY2F0aW9uXCJdID0gXCJtb2RpZmljYXRpb25cIjtcbiAgICBTZW1hbnRpY1Rva2VuTW9kaWZpZXJzW1wiZG9jdW1lbnRhdGlvblwiXSA9IFwiZG9jdW1lbnRhdGlvblwiO1xuICAgIFNlbWFudGljVG9rZW5Nb2RpZmllcnNbXCJkZWZhdWx0TGlicmFyeVwiXSA9IFwiZGVmYXVsdExpYnJhcnlcIjtcbn0pKFNlbWFudGljVG9rZW5Nb2RpZmllcnMgfHwgKFNlbWFudGljVG9rZW5Nb2RpZmllcnMgPSB7fSkpO1xuLyoqXG4gKiBAc2luY2UgMy4xNi4wXG4gKi9cbmV4cG9ydCB2YXIgU2VtYW50aWNUb2tlbnM7XG4oZnVuY3Rpb24gKFNlbWFudGljVG9rZW5zKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIChjYW5kaWRhdGUucmVzdWx0SWQgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY2FuZGlkYXRlLnJlc3VsdElkID09PSAnc3RyaW5nJykgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlLmRhdGEpICYmIChjYW5kaWRhdGUuZGF0YS5sZW5ndGggPT09IDAgfHwgdHlwZW9mIGNhbmRpZGF0ZS5kYXRhWzBdID09PSAnbnVtYmVyJyk7XG4gICAgfVxuICAgIFNlbWFudGljVG9rZW5zLmlzID0gaXM7XG59KShTZW1hbnRpY1Rva2VucyB8fCAoU2VtYW50aWNUb2tlbnMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgSW5saW5lVmFsdWVUZXh0IG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIElubGluZVZhbHVlVGV4dHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIElubGluZVZhbHVlVGV4dDtcbihmdW5jdGlvbiAoSW5saW5lVmFsdWVUZXh0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBJbmxpbmVWYWx1ZVRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCB0ZXh0OiB0ZXh0IH07XG4gICAgfVxuICAgIElubGluZVZhbHVlVGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICE9PSB1bmRlZmluZWQgJiYgY2FuZGlkYXRlICE9PSBudWxsICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50ZXh0KTtcbiAgICB9XG4gICAgSW5saW5lVmFsdWVUZXh0LmlzID0gaXM7XG59KShJbmxpbmVWYWx1ZVRleHQgfHwgKElubGluZVZhbHVlVGV4dCA9IHt9KSk7XG4vKipcbiAqIFRoZSBJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwIG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIElubGluZVZhbHVlVmFyaWFibGVMb29rdXBzLlxuICpcbiAqIEBzaW5jZSAzLjE3LjBcbiAqL1xuZXhwb3J0IHZhciBJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwO1xuKGZ1bmN0aW9uIChJbmxpbmVWYWx1ZVZhcmlhYmxlTG9va3VwKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBJbmxpbmVWYWx1ZVRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHZhcmlhYmxlTmFtZSwgY2FzZVNlbnNpdGl2ZUxvb2t1cCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIHZhcmlhYmxlTmFtZTogdmFyaWFibGVOYW1lLCBjYXNlU2Vuc2l0aXZlTG9va3VwOiBjYXNlU2Vuc2l0aXZlTG9va3VwIH07XG4gICAgfVxuICAgIElubGluZVZhbHVlVmFyaWFibGVMb29rdXAuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIElzLmJvb2xlYW4oY2FuZGlkYXRlLmNhc2VTZW5zaXRpdmVMb29rdXApXG4gICAgICAgICAgICAmJiAoSXMuc3RyaW5nKGNhbmRpZGF0ZS52YXJpYWJsZU5hbWUpIHx8IGNhbmRpZGF0ZS52YXJpYWJsZU5hbWUgPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIElubGluZVZhbHVlVmFyaWFibGVMb29rdXAuaXMgPSBpcztcbn0pKElubGluZVZhbHVlVmFyaWFibGVMb29rdXAgfHwgKElubGluZVZhbHVlVmFyaWFibGVMb29rdXAgPSB7fSkpO1xuLyoqXG4gKiBUaGUgSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24gbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGggSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24uXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uO1xuKGZ1bmN0aW9uIChJbmxpbmVWYWx1ZUV2YWx1YXRhYmxlRXhwcmVzc2lvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24gbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGV4cHJlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCBleHByZXNzaW9uOiBleHByZXNzaW9uIH07XG4gICAgfVxuICAgIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgIT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUgIT09IG51bGwgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKVxuICAgICAgICAgICAgJiYgKElzLnN0cmluZyhjYW5kaWRhdGUuZXhwcmVzc2lvbikgfHwgY2FuZGlkYXRlLmV4cHJlc3Npb24gPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIElubGluZVZhbHVlRXZhbHVhdGFibGVFeHByZXNzaW9uLmlzID0gaXM7XG59KShJbmxpbmVWYWx1ZUV2YWx1YXRhYmxlRXhwcmVzc2lvbiB8fCAoSW5saW5lVmFsdWVFdmFsdWF0YWJsZUV4cHJlc3Npb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgSW5saW5lVmFsdWVDb250ZXh0IG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICoge0BsaW5rIElubGluZVZhbHVlQ29udGV4dH0gbGl0ZXJhbHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIElubGluZVZhbHVlQ29udGV4dDtcbihmdW5jdGlvbiAoSW5saW5lVmFsdWVDb250ZXh0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBJbmxpbmVWYWx1ZUNvbnRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoZnJhbWVJZCwgc3RvcHBlZExvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB7IGZyYW1lSWQ6IGZyYW1lSWQsIHN0b3BwZWRMb2NhdGlvbjogc3RvcHBlZExvY2F0aW9uIH07XG4gICAgfVxuICAgIElubGluZVZhbHVlQ29udGV4dC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIHtAbGluayBJbmxpbmVWYWx1ZUNvbnRleHR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXModmFsdWUuc3RvcHBlZExvY2F0aW9uKTtcbiAgICB9XG4gICAgSW5saW5lVmFsdWVDb250ZXh0LmlzID0gaXM7XG59KShJbmxpbmVWYWx1ZUNvbnRleHQgfHwgKElubGluZVZhbHVlQ29udGV4dCA9IHt9KSk7XG4vKipcbiAqIElubGF5IGhpbnQga2luZHMuXG4gKlxuICogQHNpbmNlIDMuMTcuMFxuICovXG5leHBvcnQgdmFyIElubGF5SGludEtpbmQ7XG4oZnVuY3Rpb24gKElubGF5SGludEtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBBbiBpbmxheSBoaW50IHRoYXQgZm9yIGEgdHlwZSBhbm5vdGF0aW9uLlxuICAgICAqL1xuICAgIElubGF5SGludEtpbmQuVHlwZSA9IDE7XG4gICAgLyoqXG4gICAgICogQW4gaW5sYXkgaGludCB0aGF0IGlzIGZvciBhIHBhcmFtZXRlci5cbiAgICAgKi9cbiAgICBJbmxheUhpbnRLaW5kLlBhcmFtZXRlciA9IDI7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAxIHx8IHZhbHVlID09PSAyO1xuICAgIH1cbiAgICBJbmxheUhpbnRLaW5kLmlzID0gaXM7XG59KShJbmxheUhpbnRLaW5kIHx8IChJbmxheUhpbnRLaW5kID0ge30pKTtcbmV4cG9ydCB2YXIgSW5sYXlIaW50TGFiZWxQYXJ0O1xuKGZ1bmN0aW9uIChJbmxheUhpbnRMYWJlbFBhcnQpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlIH07XG4gICAgfVxuICAgIElubGF5SGludExhYmVsUGFydC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnRvb2x0aXAgPT09IHVuZGVmaW5lZCB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLnRvb2x0aXApIHx8IE1hcmt1cENvbnRlbnQuaXMoY2FuZGlkYXRlLnRvb2x0aXApKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5sb2NhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IExvY2F0aW9uLmlzKGNhbmRpZGF0ZS5sb2NhdGlvbikpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLmNvbW1hbmQgPT09IHVuZGVmaW5lZCB8fCBDb21tYW5kLmlzKGNhbmRpZGF0ZS5jb21tYW5kKSk7XG4gICAgfVxuICAgIElubGF5SGludExhYmVsUGFydC5pcyA9IGlzO1xufSkoSW5sYXlIaW50TGFiZWxQYXJ0IHx8IChJbmxheUhpbnRMYWJlbFBhcnQgPSB7fSkpO1xuZXhwb3J0IHZhciBJbmxheUhpbnQ7XG4oZnVuY3Rpb24gKElubGF5SGludCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShwb3NpdGlvbiwgbGFiZWwsIGtpbmQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgcG9zaXRpb246IHBvc2l0aW9uLCBsYWJlbDogbGFiZWwgfTtcbiAgICAgICAgaWYgKGtpbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIElubGF5SGludC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5wb3NpdGlvbilcbiAgICAgICAgICAgICYmIChJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5sYWJlbCwgSW5sYXlIaW50TGFiZWxQYXJ0LmlzKSlcbiAgICAgICAgICAgICYmIChjYW5kaWRhdGUua2luZCA9PT0gdW5kZWZpbmVkIHx8IElubGF5SGludEtpbmQuaXMoY2FuZGlkYXRlLmtpbmQpKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS50ZXh0RWRpdHMgPT09IHVuZGVmaW5lZCkgfHwgSXMudHlwZWRBcnJheShjYW5kaWRhdGUudGV4dEVkaXRzLCBUZXh0RWRpdC5pcylcbiAgICAgICAgICAgICYmIChjYW5kaWRhdGUudG9vbHRpcCA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUudG9vbHRpcCkgfHwgTWFya3VwQ29udGVudC5pcyhjYW5kaWRhdGUudG9vbHRpcCkpXG4gICAgICAgICAgICAmJiAoY2FuZGlkYXRlLnBhZGRpbmdMZWZ0ID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUucGFkZGluZ0xlZnQpKVxuICAgICAgICAgICAgJiYgKGNhbmRpZGF0ZS5wYWRkaW5nUmlnaHQgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5wYWRkaW5nUmlnaHQpKTtcbiAgICB9XG4gICAgSW5sYXlIaW50LmlzID0gaXM7XG59KShJbmxheUhpbnQgfHwgKElubGF5SGludCA9IHt9KSk7XG5leHBvcnQgdmFyIFdvcmtzcGFjZUZvbGRlcjtcbihmdW5jdGlvbiAoV29ya3NwYWNlRm9sZGVyKSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFVSSS5pcyhjYW5kaWRhdGUudXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5hbWUpO1xuICAgIH1cbiAgICBXb3Jrc3BhY2VGb2xkZXIuaXMgPSBpcztcbn0pKFdvcmtzcGFjZUZvbGRlciB8fCAoV29ya3NwYWNlRm9sZGVyID0ge30pKTtcbmV4cG9ydCB2YXIgRU9MID0gWydcXG4nLCAnXFxyXFxuJywgJ1xcciddO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgdGhlIHRleHQgZG9jdW1lbnQgZnJvbSB0aGUgbmV3IHZzY29kZS1sYW5ndWFnZXNlcnZlci10ZXh0ZG9jdW1lbnQgcGFja2FnZS5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnQ7XG4oZnVuY3Rpb24gKFRleHREb2N1bWVudCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSVRleHREb2N1bWVudCBsaXRlcmFsIGZyb20gdGhlIGdpdmVuIHVyaSBhbmQgY29udGVudC5cbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VJZCBUaGUgZG9jdW1lbnQncyBsYW5ndWFnZSBJZC5cbiAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgZG9jdW1lbnQncyB2ZXJzaW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkb2N1bWVudCdzIGNvbnRlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCkge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bGxUZXh0RG9jdW1lbnQodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCBjb250ZW50KTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUge0BsaW5rIElUZXh0RG9jdW1lbnR9IGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmxhbmd1YWdlSWQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2VJZCkpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS5saW5lQ291bnQpXG4gICAgICAgICAgICAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5nZXRUZXh0KSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5wb3NpdGlvbkF0KSAmJiBJcy5mdW5jKGNhbmRpZGF0ZS5vZmZzZXRBdCkgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIFRleHREb2N1bWVudC5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGFwcGx5RWRpdHMoZG9jdW1lbnQsIGVkaXRzKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuZ2V0VGV4dCgpO1xuICAgICAgICB2YXIgc29ydGVkRWRpdHMgPSBtZXJnZVNvcnQoZWRpdHMsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IGEucmFuZ2Uuc3RhcnQubGluZSAtIGIucmFuZ2Uuc3RhcnQubGluZTtcbiAgICAgICAgICAgIGlmIChkaWZmID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyIC0gYi5yYW5nZS5zdGFydC5jaGFyYWN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsYXN0TW9kaWZpZWRPZmZzZXQgPSB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IHNvcnRlZEVkaXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHNvcnRlZEVkaXRzW2ldO1xuICAgICAgICAgICAgdmFyIHN0YXJ0T2Zmc2V0ID0gZG9jdW1lbnQub2Zmc2V0QXQoZS5yYW5nZS5zdGFydCk7XG4gICAgICAgICAgICB2YXIgZW5kT2Zmc2V0ID0gZG9jdW1lbnQub2Zmc2V0QXQoZS5yYW5nZS5lbmQpO1xuICAgICAgICAgICAgaWYgKGVuZE9mZnNldCA8PSBsYXN0TW9kaWZpZWRPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgc3RhcnRPZmZzZXQpICsgZS5uZXdUZXh0ICsgdGV4dC5zdWJzdHJpbmcoZW5kT2Zmc2V0LCB0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXBwaW5nIGVkaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RNb2RpZmllZE9mZnNldCA9IHN0YXJ0T2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnQuYXBwbHlFZGl0cyA9IGFwcGx5RWRpdHM7XG4gICAgZnVuY3Rpb24gbWVyZ2VTb3J0KGRhdGEsIGNvbXBhcmUpIHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIC8vIHNvcnRlZFxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSAoZGF0YS5sZW5ndGggLyAyKSB8IDA7XG4gICAgICAgIHZhciBsZWZ0ID0gZGF0YS5zbGljZSgwLCBwKTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gZGF0YS5zbGljZShwKTtcbiAgICAgICAgbWVyZ2VTb3J0KGxlZnQsIGNvbXBhcmUpO1xuICAgICAgICBtZXJnZVNvcnQocmlnaHQsIGNvbXBhcmUpO1xuICAgICAgICB2YXIgbGVmdElkeCA9IDA7XG4gICAgICAgIHZhciByaWdodElkeCA9IDA7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCAmJiByaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IGNvbXBhcmUobGVmdFtsZWZ0SWR4XSwgcmlnaHRbcmlnaHRJZHhdKTtcbiAgICAgICAgICAgIGlmIChyZXQgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHNtYWxsZXJfZXF1YWwgLT4gdGFrZSBsZWZ0IHRvIHByZXNlcnZlIG9yZGVyXG4gICAgICAgICAgICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciAtPiB0YWtlIHJpZ2h0XG4gICAgICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVtpKytdID0gbGVmdFtsZWZ0SWR4KytdO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChyaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufSkoVGV4dERvY3VtZW50IHx8IChUZXh0RG9jdW1lbnQgPSB7fSkpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgdGhlIHRleHQgZG9jdW1lbnQgZnJvbSB0aGUgbmV3IHZzY29kZS1sYW5ndWFnZXNlcnZlci10ZXh0ZG9jdW1lbnQgcGFja2FnZS5cbiAqL1xudmFyIEZ1bGxUZXh0RG9jdW1lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRnVsbFRleHREb2N1bWVudCh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fdXJpID0gdXJpO1xuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gbGFuZ3VhZ2VJZDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcInVyaVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJsYW5ndWFnZUlkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VJZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZSwgXCJ2ZXJzaW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLmVuZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZXZlbnQsIHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGV2ZW50LnRleHQ7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLmdldExpbmVPZmZzZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGxpbmVPZmZzZXRzID0gW107XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB2YXIgaXNMaW5lU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGluZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjaCA9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlzTGluZVN0YXJ0ID0gKGNoID09PSAnXFxyJyB8fCBjaCA9PT0gJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgaSArIDEgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJBdChpICsgMSkgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNMaW5lU3RhcnQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGluZU9mZnNldHMucHVzaCh0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IGxpbmVPZmZzZXRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLnBvc2l0aW9uQXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCwgdGhpcy5fY29udGVudC5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgICAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGxpbmVPZmZzZXRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGhpZ2ggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5jcmVhdGUoMCwgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgICAgICAgICBpZiAobGluZU9mZnNldHNbbWlkXSA+IG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGxvdyBpcyB0aGUgbGVhc3QgeCBmb3Igd2hpY2ggdGhlIGxpbmUgb2Zmc2V0IGlzIGxhcmdlciB0aGFuIHRoZSBjdXJyZW50IG9mZnNldFxuICAgICAgICAvLyBvciBhcnJheS5sZW5ndGggaWYgbm8gbGluZSBvZmZzZXQgaXMgbGFyZ2VyIHRoYW4gdGhlIGN1cnJlbnQgb2Zmc2V0XG4gICAgICAgIHZhciBsaW5lID0gbG93IC0gMTtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZShsaW5lLCBvZmZzZXQgLSBsaW5lT2Zmc2V0c1tsaW5lXSk7XG4gICAgfTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS5vZmZzZXRBdCA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICB2YXIgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XG4gICAgICAgIGlmIChwb3NpdGlvbi5saW5lID49IGxpbmVPZmZzZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc2l0aW9uLmxpbmUgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZU9mZnNldCA9IGxpbmVPZmZzZXRzW3Bvc2l0aW9uLmxpbmVdO1xuICAgICAgICB2YXIgbmV4dExpbmVPZmZzZXQgPSAocG9zaXRpb24ubGluZSArIDEgPCBsaW5lT2Zmc2V0cy5sZW5ndGgpID8gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZSArIDFdIDogdGhpcy5fY29udGVudC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihsaW5lT2Zmc2V0ICsgcG9zaXRpb24uY2hhcmFjdGVyLCBuZXh0TGluZU9mZnNldCksIGxpbmVPZmZzZXQpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcImxpbmVDb3VudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZU9mZnNldHMoKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gRnVsbFRleHREb2N1bWVudDtcbn0oKSk7XG52YXIgSXM7XG4oZnVuY3Rpb24gKElzKSB7XG4gICAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICBmdW5jdGlvbiBkZWZpbmVkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBJcy5kZWZpbmVkID0gZGVmaW5lZDtcbiAgICBmdW5jdGlvbiB1bmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIElzLnVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBmdW5jdGlvbiBib29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG4gICAgfVxuICAgIElzLmJvb2xlYW4gPSBib29sZWFuO1xuICAgIGZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIH1cbiAgICBJcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgZnVuY3Rpb24gbnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG4gICAgfVxuICAgIElzLm51bWJlciA9IG51bWJlcjtcbiAgICBmdW5jdGlvbiBudW1iZXJSYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiBtaW4gPD0gdmFsdWUgJiYgdmFsdWUgPD0gbWF4O1xuICAgIH1cbiAgICBJcy5udW1iZXJSYW5nZSA9IG51bWJlclJhbmdlO1xuICAgIGZ1bmN0aW9uIGludGVnZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAtMjE0NzQ4MzY0OCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSAyMTQ3NDgzNjQ3O1xuICAgIH1cbiAgICBJcy5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICBmdW5jdGlvbiB1aW50ZWdlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmIDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gMjE0NzQ4MzY0NztcbiAgICB9XG4gICAgSXMudWludGVnZXIgPSB1aW50ZWdlcjtcbiAgICBmdW5jdGlvbiBmdW5jKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gICAgSXMuZnVuYyA9IGZ1bmM7XG4gICAgZnVuY3Rpb24gb2JqZWN0TGl0ZXJhbCh2YWx1ZSkge1xuICAgICAgICAvLyBTdHJpY3RseSBzcGVha2luZyBjbGFzcyBpbnN0YW5jZXMgcGFzcyB0aGlzIGNoZWNrIGFzIHdlbGwuIFNpbmNlIHRoZSBMU1BcbiAgICAgICAgLy8gZG9lc24ndCB1c2UgY2xhc3NlcyB3ZSBpZ25vcmUgdGhpcyBmb3Igbm93LiBJZiB3ZSBkbyB3ZSBuZWVkIHRvIGFkZCBzb21ldGhpbmdcbiAgICAgICAgLy8gbGlrZSB0aGlzOiBgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSkgPT09IG51bGxgXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xuICAgIH1cbiAgICBJcy5vYmplY3RMaXRlcmFsID0gb2JqZWN0TGl0ZXJhbDtcbiAgICBmdW5jdGlvbiB0eXBlZEFycmF5KHZhbHVlLCBjaGVjaykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoY2hlY2spO1xuICAgIH1cbiAgICBJcy50eXBlZEFycmF5ID0gdHlwZWRBcnJheTtcbn0pKElzIHx8IChJcyA9IHt9KSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=