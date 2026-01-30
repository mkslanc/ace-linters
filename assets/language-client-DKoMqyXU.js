import { D as __commonJSMin, j as __toESM, r as require_main$1, t as BaseService } from "./base-service-CtWdb5FQ.js";
import { t as MessageType } from "./webworker-BeICsEMZ.js";
var require_ral = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	let _ral;
	function RAL() {
		if (_ral === void 0) throw new Error(`No runtime abstraction layer installed`);
		return _ral;
	}
	(function(RAL$1) {
		function install(ral) {
			if (ral === void 0) throw new Error(`No runtime abstraction layer provided`);
			_ral = ral;
		}
		RAL$1.install = install;
	})(RAL || (RAL = {}));
	exports.default = RAL;
}));
var require_is = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
	function boolean(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean;
	function string(value) {
		return typeof value === "string" || value instanceof String;
	}
	exports.string = string;
	function number(value) {
		return typeof value === "number" || value instanceof Number;
	}
	exports.number = number;
	function error(value) {
		return value instanceof Error;
	}
	exports.error = error;
	function func(value) {
		return typeof value === "function";
	}
	exports.func = func;
	function array(value) {
		return Array.isArray(value);
	}
	exports.array = array;
	function stringArray(value) {
		return array(value) && value.every((elem) => string(elem));
	}
	exports.stringArray = stringArray;
}));
var require_events = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Emitter = exports.Event = void 0;
	const ral_1$6 = require_ral();
	var Event$1;
	(function(Event$2) {
		const _disposable = { dispose() {} };
		Event$2.None = function() {
			return _disposable;
		};
	})(Event$1 || (exports.Event = Event$1 = {}));
	var CallbackList = class {
		add(callback, context = null, bucket) {
			if (!this._callbacks) {
				this._callbacks = [];
				this._contexts = [];
			}
			this._callbacks.push(callback);
			this._contexts.push(context);
			if (Array.isArray(bucket)) bucket.push({ dispose: () => this.remove(callback, context) });
		}
		remove(callback, context = null) {
			if (!this._callbacks) return;
			let foundCallbackWithDifferentContext = false;
			for (let i = 0, len = this._callbacks.length; i < len; i++) if (this._callbacks[i] === callback) if (this._contexts[i] === context) {
				this._callbacks.splice(i, 1);
				this._contexts.splice(i, 1);
				return;
			} else foundCallbackWithDifferentContext = true;
			if (foundCallbackWithDifferentContext) throw new Error("When adding a listener with a context, you should remove it with the same context");
		}
		invoke(...args) {
			if (!this._callbacks) return [];
			const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
			for (let i = 0, len = callbacks.length; i < len; i++) try {
				ret.push(callbacks[i].apply(contexts[i], args));
			} catch (e) {
				(0, ral_1$6.default)().console.error(e);
			}
			return ret;
		}
		isEmpty() {
			return !this._callbacks || this._callbacks.length === 0;
		}
		dispose() {
			this._callbacks = void 0;
			this._contexts = void 0;
		}
	};
	var Emitter = class Emitter {
		constructor(_options) {
			this._options = _options;
		}
		get event() {
			if (!this._event) this._event = (listener, thisArgs, disposables) => {
				if (!this._callbacks) this._callbacks = new CallbackList();
				if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) this._options.onFirstListenerAdd(this);
				this._callbacks.add(listener, thisArgs);
				const result = { dispose: () => {
					if (!this._callbacks) return;
					this._callbacks.remove(listener, thisArgs);
					result.dispose = Emitter._noop;
					if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) this._options.onLastListenerRemove(this);
				} };
				if (Array.isArray(disposables)) disposables.push(result);
				return result;
			};
			return this._event;
		}
		fire(event) {
			if (this._callbacks) this._callbacks.invoke.call(this._callbacks, event);
		}
		dispose() {
			if (this._callbacks) {
				this._callbacks.dispose();
				this._callbacks = void 0;
			}
		}
	};
	exports.Emitter = Emitter;
	Emitter._noop = function() {};
}));
var require_semaphore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Semaphore = void 0;
	const ral_1$5 = require_ral();
	var Semaphore = class {
		constructor(capacity = 1) {
			if (capacity <= 0) throw new Error("Capacity must be greater than 0");
			this._capacity = capacity;
			this._active = 0;
			this._waiting = [];
		}
		lock(thunk) {
			return new Promise((resolve, reject) => {
				this._waiting.push({
					thunk,
					resolve,
					reject
				});
				this.runNext();
			});
		}
		get active() {
			return this._active;
		}
		runNext() {
			if (this._waiting.length === 0 || this._active === this._capacity) return;
			(0, ral_1$5.default)().timer.setImmediate(() => this.doRunNext());
		}
		doRunNext() {
			if (this._waiting.length === 0 || this._active === this._capacity) return;
			const next = this._waiting.shift();
			this._active++;
			if (this._active > this._capacity) throw new Error(`To many thunks active`);
			try {
				const result = next.thunk();
				if (result instanceof Promise) result.then((value) => {
					this._active--;
					next.resolve(value);
					this.runNext();
				}, (err) => {
					this._active--;
					next.reject(err);
					this.runNext();
				});
				else {
					this._active--;
					next.resolve(result);
					this.runNext();
				}
			} catch (err) {
				this._active--;
				next.reject(err);
				this.runNext();
			}
		}
	};
	exports.Semaphore = Semaphore;
}));
var require_messageReader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
	const ral_1$4 = require_ral();
	const Is$3 = require_is();
	const events_1$4 = require_events();
	const semaphore_1$1 = require_semaphore();
	var MessageReader;
	(function(MessageReader$1) {
		function is$1(value) {
			let candidate = value;
			return candidate && Is$3.func(candidate.listen) && Is$3.func(candidate.dispose) && Is$3.func(candidate.onError) && Is$3.func(candidate.onClose) && Is$3.func(candidate.onPartialMessage);
		}
		MessageReader$1.is = is$1;
	})(MessageReader || (exports.MessageReader = MessageReader = {}));
	var AbstractMessageReader$1 = class {
		constructor() {
			this.errorEmitter = new events_1$4.Emitter();
			this.closeEmitter = new events_1$4.Emitter();
			this.partialMessageEmitter = new events_1$4.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error$1) {
			this.errorEmitter.fire(this.asError(error$1));
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(void 0);
		}
		get onPartialMessage() {
			return this.partialMessageEmitter.event;
		}
		firePartialMessage(info) {
			this.partialMessageEmitter.fire(info);
		}
		asError(error$1) {
			if (error$1 instanceof Error) return error$1;
			else return /* @__PURE__ */ new Error(`Reader received error. Reason: ${Is$3.string(error$1.message) ? error$1.message : "unknown"}`);
		}
	};
	exports.AbstractMessageReader = AbstractMessageReader$1;
	var ResolvedMessageReaderOptions;
	(function(ResolvedMessageReaderOptions$1) {
		function fromOptions(options) {
			let charset;
			let contentDecoder;
			const contentDecoders = /* @__PURE__ */ new Map();
			let contentTypeDecoder;
			const contentTypeDecoders = /* @__PURE__ */ new Map();
			if (options === void 0 || typeof options === "string") charset = options ?? "utf-8";
			else {
				charset = options.charset ?? "utf-8";
				if (options.contentDecoder !== void 0) {
					contentDecoder = options.contentDecoder;
					contentDecoders.set(contentDecoder.name, contentDecoder);
				}
				if (options.contentDecoders !== void 0) for (const decoder of options.contentDecoders) contentDecoders.set(decoder.name, decoder);
				if (options.contentTypeDecoder !== void 0) {
					contentTypeDecoder = options.contentTypeDecoder;
					contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
				}
				if (options.contentTypeDecoders !== void 0) for (const decoder of options.contentTypeDecoders) contentTypeDecoders.set(decoder.name, decoder);
			}
			if (contentTypeDecoder === void 0) {
				contentTypeDecoder = (0, ral_1$4.default)().applicationJson.decoder;
				contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
			}
			return {
				charset,
				contentDecoder,
				contentDecoders,
				contentTypeDecoder,
				contentTypeDecoders
			};
		}
		ResolvedMessageReaderOptions$1.fromOptions = fromOptions;
	})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
	var ReadableStreamMessageReader = class extends AbstractMessageReader$1 {
		constructor(readable, options) {
			super();
			this.readable = readable;
			this.options = ResolvedMessageReaderOptions.fromOptions(options);
			this.buffer = (0, ral_1$4.default)().messageBuffer.create(this.options.charset);
			this._partialMessageTimeout = 1e4;
			this.nextMessageLength = -1;
			this.messageToken = 0;
			this.readSemaphore = new semaphore_1$1.Semaphore(1);
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
			this.partialMessageTimer = void 0;
			this.callback = callback;
			const result = this.readable.onData((data) => {
				this.onData(data);
			});
			this.readable.onError((error$1) => this.fireError(error$1));
			this.readable.onClose(() => this.fireClose());
			return result;
		}
		onData(data) {
			try {
				this.buffer.append(data);
				while (true) {
					if (this.nextMessageLength === -1) {
						const headers = this.buffer.tryReadHeaders(true);
						if (!headers) return;
						const contentLength = headers.get("content-length");
						if (!contentLength) {
							this.fireError(/* @__PURE__ */ new Error(`Header must provide a Content-Length property.\n${JSON.stringify(Object.fromEntries(headers))}`));
							return;
						}
						const length = parseInt(contentLength);
						if (isNaN(length)) {
							this.fireError(/* @__PURE__ */ new Error(`Content-Length value must be a number. Got ${contentLength}`));
							return;
						}
						this.nextMessageLength = length;
					}
					const body = this.buffer.tryReadBody(this.nextMessageLength);
					if (body === void 0) {
						this.setPartialMessageTimer();
						return;
					}
					this.clearPartialMessageTimer();
					this.nextMessageLength = -1;
					this.readSemaphore.lock(async () => {
						const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
						const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
						this.callback(message);
					}).catch((error$1) => {
						this.fireError(error$1);
					});
				}
			} catch (error$1) {
				this.fireError(error$1);
			}
		}
		clearPartialMessageTimer() {
			if (this.partialMessageTimer) {
				this.partialMessageTimer.dispose();
				this.partialMessageTimer = void 0;
			}
		}
		setPartialMessageTimer() {
			this.clearPartialMessageTimer();
			if (this._partialMessageTimeout <= 0) return;
			this.partialMessageTimer = (0, ral_1$4.default)().timer.setTimeout((token, timeout) => {
				this.partialMessageTimer = void 0;
				if (token === this.messageToken) {
					this.firePartialMessage({
						messageToken: token,
						waitingTime: timeout
					});
					this.setPartialMessageTimer();
				}
			}, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
		}
	};
	exports.ReadableStreamMessageReader = ReadableStreamMessageReader;
}));
var import_messageReader = require_messageReader();
var WebSocketMessageReader = class extends import_messageReader.AbstractMessageReader {
	socket;
	state = "initial";
	callback;
	events = [];
	constructor(socket) {
		super();
		this.socket = socket;
		this.socket.onMessage((message) => this.readMessage(message));
		this.socket.onError((error$1) => this.fireError(error$1));
		this.socket.onClose((code, reason) => {
			if (code !== 1e3) {
				const error$1 = {
					name: "" + code,
					message: `Error during socket reconnect: code = ${code}, reason = ${reason}`
				};
				this.fireError(error$1);
			}
			this.fireClose();
		});
	}
	listen(callback) {
		if (this.state === "initial") {
			this.state = "listening";
			this.callback = callback;
			while (this.events.length !== 0) {
				const event = this.events.pop();
				if (event.message !== void 0) this.readMessage(event.message);
				else if (event.error !== void 0) this.fireError(event.error);
				else this.fireClose();
			}
		}
		return { dispose: () => {
			if (this.callback === callback) {
				this.state = "initial";
				this.callback = void 0;
			}
		} };
	}
	dispose() {
		super.dispose();
		this.state = "initial";
		this.callback = void 0;
		this.events.splice(0, this.events.length);
	}
	readMessage(message) {
		if (this.state === "initial") this.events.splice(0, 0, { message });
		else if (this.state === "listening") try {
			const data = JSON.parse(message);
			this.callback(data);
		} catch (err) {
			const error$1 = {
				name: "400",
				message: `Error during message parsing, reason = ${typeof err === "object" ? err.message : "unknown"}`
			};
			this.fireError(error$1);
		}
	}
	fireError(error$1) {
		if (this.state === "initial") this.events.splice(0, 0, { error: error$1 });
		else if (this.state === "listening") super.fireError(error$1);
	}
	fireClose() {
		if (this.state === "initial") this.events.splice(0, 0, {});
		else if (this.state === "listening") super.fireClose();
		this.state = "closed";
	}
};
var require_messageWriter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
	const ral_1$3 = require_ral();
	const Is$2 = require_is();
	const semaphore_1 = require_semaphore();
	const events_1$3 = require_events();
	const ContentLength = "Content-Length: ";
	const CRLF$1 = "\r\n";
	var MessageWriter;
	(function(MessageWriter$1) {
		function is$1(value) {
			let candidate = value;
			return candidate && Is$2.func(candidate.dispose) && Is$2.func(candidate.onClose) && Is$2.func(candidate.onError) && Is$2.func(candidate.write);
		}
		MessageWriter$1.is = is$1;
	})(MessageWriter || (exports.MessageWriter = MessageWriter = {}));
	var AbstractMessageWriter$1 = class {
		constructor() {
			this.errorEmitter = new events_1$3.Emitter();
			this.closeEmitter = new events_1$3.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error$1, message, count) {
			this.errorEmitter.fire([
				this.asError(error$1),
				message,
				count
			]);
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(void 0);
		}
		asError(error$1) {
			if (error$1 instanceof Error) return error$1;
			else return /* @__PURE__ */ new Error(`Writer received error. Reason: ${Is$2.string(error$1.message) ? error$1.message : "unknown"}`);
		}
	};
	exports.AbstractMessageWriter = AbstractMessageWriter$1;
	var ResolvedMessageWriterOptions;
	(function(ResolvedMessageWriterOptions$1) {
		function fromOptions(options) {
			if (options === void 0 || typeof options === "string") return {
				charset: options ?? "utf-8",
				contentTypeEncoder: (0, ral_1$3.default)().applicationJson.encoder
			};
			else return {
				charset: options.charset ?? "utf-8",
				contentEncoder: options.contentEncoder,
				contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1$3.default)().applicationJson.encoder
			};
		}
		ResolvedMessageWriterOptions$1.fromOptions = fromOptions;
	})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
	var WriteableStreamMessageWriter = class extends AbstractMessageWriter$1 {
		constructor(writable, options) {
			super();
			this.writable = writable;
			this.options = ResolvedMessageWriterOptions.fromOptions(options);
			this.errorCount = 0;
			this.writeSemaphore = new semaphore_1.Semaphore(1);
			this.writable.onError((error$1) => this.fireError(error$1));
			this.writable.onClose(() => this.fireClose());
		}
		async write(msg) {
			return this.writeSemaphore.lock(async () => {
				return this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
					if (this.options.contentEncoder !== void 0) return this.options.contentEncoder.encode(buffer);
					else return buffer;
				}).then((buffer) => {
					const headers = [];
					headers.push(ContentLength, buffer.byteLength.toString(), CRLF$1);
					headers.push(CRLF$1);
					return this.doWrite(msg, headers, buffer);
				}, (error$1) => {
					this.fireError(error$1);
					throw error$1;
				});
			});
		}
		async doWrite(msg, headers, data) {
			try {
				await this.writable.write(headers.join(""), "ascii");
				return this.writable.write(data);
			} catch (error$1) {
				this.handleError(error$1, msg);
				return Promise.reject(error$1);
			}
		}
		handleError(error$1, msg) {
			this.errorCount++;
			this.fireError(error$1, msg, this.errorCount);
		}
		end() {
			this.writable.end();
		}
	};
	exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
}));
var import_messageWriter = require_messageWriter();
var WebSocketMessageWriter = class extends import_messageWriter.AbstractMessageWriter {
	errorCount = 0;
	socket;
	constructor(socket) {
		super();
		this.socket = socket;
	}
	end() {}
	async write(msg) {
		try {
			const content = JSON.stringify(msg);
			this.socket.send(content);
		} catch (e) {
			this.errorCount++;
			this.fireError(e, msg, this.errorCount);
		}
	}
};
var require_messages = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
	const is = require_is();
	var ErrorCodes;
	(function(ErrorCodes$1) {
		ErrorCodes$1.ParseError = -32700;
		ErrorCodes$1.InvalidRequest = -32600;
		ErrorCodes$1.MethodNotFound = -32601;
		ErrorCodes$1.InvalidParams = -32602;
		ErrorCodes$1.InternalError = -32603;
		ErrorCodes$1.jsonrpcReservedErrorRangeStart = -32099;
		ErrorCodes$1.serverErrorStart = -32099;
		ErrorCodes$1.MessageWriteError = -32099;
		ErrorCodes$1.MessageReadError = -32098;
		ErrorCodes$1.PendingResponseRejected = -32097;
		ErrorCodes$1.ConnectionInactive = -32096;
		ErrorCodes$1.ServerNotInitialized = -32002;
		ErrorCodes$1.UnknownErrorCode = -32001;
		ErrorCodes$1.jsonrpcReservedErrorRangeEnd = -32e3;
		ErrorCodes$1.serverErrorEnd = -32e3;
	})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
	exports.ResponseError = class ResponseError extends Error {
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
			if (this.data !== void 0) result.data = this.data;
			return result;
		}
	};
	var ParameterStructures = class ParameterStructures {
		constructor(kind) {
			this.kind = kind;
		}
		static is(value) {
			return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
		}
		toString() {
			return this.kind;
		}
	};
	exports.ParameterStructures = ParameterStructures;
	ParameterStructures.auto = new ParameterStructures("auto");
	ParameterStructures.byPosition = new ParameterStructures("byPosition");
	ParameterStructures.byName = new ParameterStructures("byName");
	var AbstractMessageSignature = class {
		constructor(method, numberOfParams) {
			this.method = method;
			this.numberOfParams = numberOfParams;
		}
		get parameterStructures() {
			return ParameterStructures.auto;
		}
	};
	exports.AbstractMessageSignature = AbstractMessageSignature;
	var RequestType0 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 0);
		}
	};
	exports.RequestType0 = RequestType0;
	var RequestType = class extends AbstractMessageSignature {
		constructor(method, _parameterStructures = ParameterStructures.auto) {
			super(method, 1);
			this._parameterStructures = _parameterStructures;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	};
	exports.RequestType = RequestType;
	var RequestType1 = class extends AbstractMessageSignature {
		constructor(method, _parameterStructures = ParameterStructures.auto) {
			super(method, 1);
			this._parameterStructures = _parameterStructures;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	};
	exports.RequestType1 = RequestType1;
	var RequestType2 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 2);
		}
	};
	exports.RequestType2 = RequestType2;
	var RequestType3 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 3);
		}
	};
	exports.RequestType3 = RequestType3;
	var RequestType4 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 4);
		}
	};
	exports.RequestType4 = RequestType4;
	var RequestType5 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 5);
		}
	};
	exports.RequestType5 = RequestType5;
	var RequestType6 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 6);
		}
	};
	exports.RequestType6 = RequestType6;
	var RequestType7 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 7);
		}
	};
	exports.RequestType7 = RequestType7;
	var RequestType8 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 8);
		}
	};
	exports.RequestType8 = RequestType8;
	var RequestType9 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 9);
		}
	};
	exports.RequestType9 = RequestType9;
	var NotificationType = class extends AbstractMessageSignature {
		constructor(method, _parameterStructures = ParameterStructures.auto) {
			super(method, 1);
			this._parameterStructures = _parameterStructures;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	};
	exports.NotificationType = NotificationType;
	var NotificationType0 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 0);
		}
	};
	exports.NotificationType0 = NotificationType0;
	var NotificationType1 = class extends AbstractMessageSignature {
		constructor(method, _parameterStructures = ParameterStructures.auto) {
			super(method, 1);
			this._parameterStructures = _parameterStructures;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	};
	exports.NotificationType1 = NotificationType1;
	var NotificationType2 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 2);
		}
	};
	exports.NotificationType2 = NotificationType2;
	var NotificationType3 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 3);
		}
	};
	exports.NotificationType3 = NotificationType3;
	var NotificationType4 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 4);
		}
	};
	exports.NotificationType4 = NotificationType4;
	var NotificationType5 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 5);
		}
	};
	exports.NotificationType5 = NotificationType5;
	var NotificationType6 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 6);
		}
	};
	exports.NotificationType6 = NotificationType6;
	var NotificationType7 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 7);
		}
	};
	exports.NotificationType7 = NotificationType7;
	var NotificationType8 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 8);
		}
	};
	exports.NotificationType8 = NotificationType8;
	var NotificationType9 = class extends AbstractMessageSignature {
		constructor(method) {
			super(method, 9);
		}
	};
	exports.NotificationType9 = NotificationType9;
	var Message;
	(function(Message$1) {
		function isRequest(message) {
			const candidate = message;
			return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
		}
		Message$1.isRequest = isRequest;
		function isNotification(message) {
			const candidate = message;
			return candidate && is.string(candidate.method) && message.id === void 0;
		}
		Message$1.isNotification = isNotification;
		function isResponse(message) {
			const candidate = message;
			return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
		}
		Message$1.isResponse = isResponse;
	})(Message || (exports.Message = Message = {}));
}));
var require_linkedMap = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LRUCache = exports.LinkedMap = exports.Touch = void 0;
	var Touch;
	(function(Touch$1) {
		Touch$1.None = 0;
		Touch$1.First = 1;
		Touch$1.AsOld = Touch$1.First;
		Touch$1.Last = 2;
		Touch$1.AsNew = Touch$1.Last;
	})(Touch || (exports.Touch = Touch = {}));
	var LinkedMap = class {
		constructor() {
			this[_a] = "LinkedMap";
			this._map = /* @__PURE__ */ new Map();
			this._head = void 0;
			this._tail = void 0;
			this._size = 0;
			this._state = 0;
		}
		clear() {
			this._map.clear();
			this._head = void 0;
			this._tail = void 0;
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
			if (!item) return;
			if (touch !== Touch.None) this.touch(item, touch);
			return item.value;
		}
		set(key, value, touch = Touch.None) {
			let item = this._map.get(key);
			if (item) {
				item.value = value;
				if (touch !== Touch.None) this.touch(item, touch);
			} else {
				item = {
					key,
					value,
					next: void 0,
					previous: void 0
				};
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
			if (!item) return;
			this._map.delete(key);
			this.removeItem(item);
			this._size--;
			return item.value;
		}
		shift() {
			if (!this._head && !this._tail) return;
			if (!this._head || !this._tail) throw new Error("Invalid list");
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
				if (thisArg) callbackfn.bind(thisArg)(current.value, current.key, this);
				else callbackfn(current.value, current.key, this);
				if (this._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
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
					if (this._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
					if (current) {
						const result = {
							value: current.key,
							done: false
						};
						current = current.next;
						return result;
					} else return {
						value: void 0,
						done: true
					};
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
					if (this._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
					if (current) {
						const result = {
							value: current.value,
							done: false
						};
						current = current.next;
						return result;
					} else return {
						value: void 0,
						done: true
					};
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
					if (this._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
					if (current) {
						const result = {
							value: [current.key, current.value],
							done: false
						};
						current = current.next;
						return result;
					} else return {
						value: void 0,
						done: true
					};
				}
			};
			return iterator;
		}
		[(_a = Symbol.toStringTag, Symbol.iterator)]() {
			return this.entries();
		}
		trimOld(newSize) {
			if (newSize >= this.size) return;
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
			if (current) current.previous = void 0;
			this._state++;
		}
		addItemFirst(item) {
			if (!this._head && !this._tail) this._tail = item;
			else if (!this._head) throw new Error("Invalid list");
			else {
				item.next = this._head;
				this._head.previous = item;
			}
			this._head = item;
			this._state++;
		}
		addItemLast(item) {
			if (!this._head && !this._tail) this._head = item;
			else if (!this._tail) throw new Error("Invalid list");
			else {
				item.previous = this._tail;
				this._tail.next = item;
			}
			this._tail = item;
			this._state++;
		}
		removeItem(item) {
			if (item === this._head && item === this._tail) {
				this._head = void 0;
				this._tail = void 0;
			} else if (item === this._head) {
				if (!item.next) throw new Error("Invalid list");
				item.next.previous = void 0;
				this._head = item.next;
			} else if (item === this._tail) {
				if (!item.previous) throw new Error("Invalid list");
				item.previous.next = void 0;
				this._tail = item.previous;
			} else {
				const next = item.next;
				const previous = item.previous;
				if (!next || !previous) throw new Error("Invalid list");
				next.previous = previous;
				previous.next = next;
			}
			item.next = void 0;
			item.previous = void 0;
			this._state++;
		}
		touch(item, touch) {
			if (!this._head || !this._tail) throw new Error("Invalid list");
			if (touch !== Touch.First && touch !== Touch.Last) return;
			if (touch === Touch.First) {
				if (item === this._head) return;
				const next = item.next;
				const previous = item.previous;
				if (item === this._tail) {
					previous.next = void 0;
					this._tail = previous;
				} else {
					next.previous = previous;
					previous.next = next;
				}
				item.previous = void 0;
				item.next = this._head;
				this._head.previous = item;
				this._head = item;
				this._state++;
			} else if (touch === Touch.Last) {
				if (item === this._tail) return;
				const next = item.next;
				const previous = item.previous;
				if (item === this._head) {
					next.previous = void 0;
					this._head = next;
				} else {
					next.previous = previous;
					previous.next = next;
				}
				item.next = void 0;
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
			for (const [key, value] of data) this.set(key, value);
		}
	};
	exports.LinkedMap = LinkedMap;
	var LRUCache = class extends LinkedMap {
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
			if (this.size > this._limit) this.trimOld(Math.round(this._limit * this._ratio));
		}
	};
	exports.LRUCache = LRUCache;
}));
var require_disposable = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Disposable = void 0;
	var Disposable;
	(function(Disposable$1) {
		function create(func$1) {
			return { dispose: func$1 };
		}
		Disposable$1.create = create;
	})(Disposable || (exports.Disposable = Disposable = {}));
}));
var require_cancellation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CancellationTokenSource = exports.CancellationToken = void 0;
	const ral_1$2 = require_ral();
	const Is$1 = require_is();
	const events_1$2 = require_events();
	var CancellationToken;
	(function(CancellationToken$1) {
		CancellationToken$1.None = Object.freeze({
			isCancellationRequested: false,
			onCancellationRequested: events_1$2.Event.None
		});
		CancellationToken$1.Cancelled = Object.freeze({
			isCancellationRequested: true,
			onCancellationRequested: events_1$2.Event.None
		});
		function is$1(value) {
			const candidate = value;
			return candidate && (candidate === CancellationToken$1.None || candidate === CancellationToken$1.Cancelled || Is$1.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
		}
		CancellationToken$1.is = is$1;
	})(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
	const shortcutEvent = Object.freeze(function(callback, context) {
		const handle = (0, ral_1$2.default)().timer.setTimeout(callback.bind(context), 0);
		return { dispose() {
			handle.dispose();
		} };
	});
	var MutableToken = class {
		constructor() {
			this._isCancelled = false;
		}
		cancel() {
			if (!this._isCancelled) {
				this._isCancelled = true;
				if (this._emitter) {
					this._emitter.fire(void 0);
					this.dispose();
				}
			}
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			if (this._isCancelled) return shortcutEvent;
			if (!this._emitter) this._emitter = new events_1$2.Emitter();
			return this._emitter.event;
		}
		dispose() {
			if (this._emitter) {
				this._emitter.dispose();
				this._emitter = void 0;
			}
		}
	};
	var CancellationTokenSource = class {
		get token() {
			if (!this._token) this._token = new MutableToken();
			return this._token;
		}
		cancel() {
			if (!this._token) this._token = CancellationToken.Cancelled;
			else this._token.cancel();
		}
		dispose() {
			if (!this._token) this._token = CancellationToken.None;
			else if (this._token instanceof MutableToken) this._token.dispose();
		}
	};
	exports.CancellationTokenSource = CancellationTokenSource;
}));
var require_sharedArrayCancellation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = void 0;
	const cancellation_1$2 = require_cancellation();
	var CancellationState;
	(function(CancellationState$1) {
		CancellationState$1.Continue = 0;
		CancellationState$1.Cancelled = 1;
	})(CancellationState || (CancellationState = {}));
	var SharedArraySenderStrategy = class {
		constructor() {
			this.buffers = /* @__PURE__ */ new Map();
		}
		enableCancellation(request) {
			if (request.id === null) return;
			const buffer = new SharedArrayBuffer(4);
			const data = new Int32Array(buffer, 0, 1);
			data[0] = CancellationState.Continue;
			this.buffers.set(request.id, buffer);
			request.$cancellationData = buffer;
		}
		async sendCancellation(_conn, id) {
			const buffer = this.buffers.get(id);
			if (buffer === void 0) return;
			const data = new Int32Array(buffer, 0, 1);
			Atomics.store(data, 0, CancellationState.Cancelled);
		}
		cleanup(id) {
			this.buffers.delete(id);
		}
		dispose() {
			this.buffers.clear();
		}
	};
	exports.SharedArraySenderStrategy = SharedArraySenderStrategy;
	var SharedArrayBufferCancellationToken = class {
		constructor(buffer) {
			this.data = new Int32Array(buffer, 0, 1);
		}
		get isCancellationRequested() {
			return Atomics.load(this.data, 0) === CancellationState.Cancelled;
		}
		get onCancellationRequested() {
			throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
		}
	};
	var SharedArrayBufferCancellationTokenSource = class {
		constructor(buffer) {
			this.token = new SharedArrayBufferCancellationToken(buffer);
		}
		cancel() {}
		dispose() {}
	};
	var SharedArrayReceiverStrategy = class {
		constructor() {
			this.kind = "request";
		}
		createCancellationTokenSource(request) {
			const buffer = request.$cancellationData;
			if (buffer === void 0) return new cancellation_1$2.CancellationTokenSource();
			return new SharedArrayBufferCancellationTokenSource(buffer);
		}
	};
	exports.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
}));
var require_messageBuffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AbstractMessageBuffer = void 0;
	const CR = 13;
	const LF = 10;
	const CRLF = "\r\n";
	var AbstractMessageBuffer = class {
		constructor(encoding = "utf-8") {
			this._encoding = encoding;
			this._chunks = [];
			this._totalLength = 0;
		}
		get encoding() {
			return this._encoding;
		}
		append(chunk) {
			const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
			this._chunks.push(toAppend);
			this._totalLength += toAppend.byteLength;
		}
		tryReadHeaders(lowerCaseKeys = false) {
			if (this._chunks.length === 0) return;
			let state = 0;
			let chunkIndex = 0;
			let offset = 0;
			let chunkBytesRead = 0;
			row: while (chunkIndex < this._chunks.length) {
				const chunk = this._chunks[chunkIndex];
				offset = 0;
				column: while (offset < chunk.length) {
					switch (chunk[offset]) {
						case CR:
							switch (state) {
								case 0:
									state = 1;
									break;
								case 2:
									state = 3;
									break;
								default: state = 0;
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
								default: state = 0;
							}
							break;
						default: state = 0;
					}
					offset++;
				}
				chunkBytesRead += chunk.byteLength;
				chunkIndex++;
			}
			if (state !== 4) return;
			const buffer = this._read(chunkBytesRead + offset);
			const result = /* @__PURE__ */ new Map();
			const headers = this.toString(buffer, "ascii").split(CRLF);
			if (headers.length < 2) return result;
			for (let i = 0; i < headers.length - 2; i++) {
				const header = headers[i];
				const index = header.indexOf(":");
				if (index === -1) throw new Error(`Message header must separate key and value using ':'\n${header}`);
				const key = header.substr(0, index);
				const value = header.substr(index + 1).trim();
				result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
			}
			return result;
		}
		tryReadBody(length) {
			if (this._totalLength < length) return;
			return this._read(length);
		}
		get numberOfBytes() {
			return this._totalLength;
		}
		_read(byteCount) {
			if (byteCount === 0) return this.emptyBuffer();
			if (byteCount > this._totalLength) throw new Error(`Cannot read so many bytes!`);
			if (this._chunks[0].byteLength === byteCount) {
				const chunk = this._chunks[0];
				this._chunks.shift();
				this._totalLength -= byteCount;
				return this.asNative(chunk);
			}
			if (this._chunks[0].byteLength > byteCount) {
				const chunk = this._chunks[0];
				const result$1 = this.asNative(chunk, byteCount);
				this._chunks[0] = chunk.slice(byteCount);
				this._totalLength -= byteCount;
				return result$1;
			}
			const result = this.allocNative(byteCount);
			let resultOffset = 0;
			let chunkIndex = 0;
			while (byteCount > 0) {
				const chunk = this._chunks[chunkIndex];
				if (chunk.byteLength > byteCount) {
					const chunkPart = chunk.slice(0, byteCount);
					result.set(chunkPart, resultOffset);
					resultOffset += byteCount;
					this._chunks[chunkIndex] = chunk.slice(byteCount);
					this._totalLength -= byteCount;
					byteCount -= byteCount;
				} else {
					result.set(chunk, resultOffset);
					resultOffset += chunk.byteLength;
					this._chunks.shift();
					this._totalLength -= chunk.byteLength;
					byteCount -= chunk.byteLength;
				}
			}
			return result;
		}
	};
	exports.AbstractMessageBuffer = AbstractMessageBuffer;
}));
var require_connection = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessageConnection = exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
	const ral_1$1 = require_ral();
	const Is = require_is();
	const messages_1$1 = require_messages();
	const linkedMap_1$1 = require_linkedMap();
	const events_1$1 = require_events();
	const cancellation_1$1 = require_cancellation();
	var CancelNotification;
	(function(CancelNotification$1) {
		CancelNotification$1.type = new messages_1$1.NotificationType("$/cancelRequest");
	})(CancelNotification || (CancelNotification = {}));
	var ProgressToken;
	(function(ProgressToken$1) {
		function is$1(value) {
			return typeof value === "string" || typeof value === "number";
		}
		ProgressToken$1.is = is$1;
	})(ProgressToken || (exports.ProgressToken = ProgressToken = {}));
	var ProgressNotification;
	(function(ProgressNotification$1) {
		ProgressNotification$1.type = new messages_1$1.NotificationType("$/progress");
	})(ProgressNotification || (ProgressNotification = {}));
	var ProgressType = class {
		constructor() {}
	};
	exports.ProgressType = ProgressType;
	var StarRequestHandler;
	(function(StarRequestHandler$1) {
		function is$1(value) {
			return Is.func(value);
		}
		StarRequestHandler$1.is = is$1;
	})(StarRequestHandler || (StarRequestHandler = {}));
	exports.NullLogger = Object.freeze({
		error: () => {},
		warn: () => {},
		info: () => {},
		log: () => {}
	});
	var Trace;
	(function(Trace$1) {
		Trace$1[Trace$1["Off"] = 0] = "Off";
		Trace$1[Trace$1["Messages"] = 1] = "Messages";
		Trace$1[Trace$1["Compact"] = 2] = "Compact";
		Trace$1[Trace$1["Verbose"] = 3] = "Verbose";
	})(Trace || (exports.Trace = Trace = {}));
	var TraceValues;
	(function(TraceValues$1) {
		TraceValues$1.Off = "off";
		TraceValues$1.Messages = "messages";
		TraceValues$1.Compact = "compact";
		TraceValues$1.Verbose = "verbose";
	})(TraceValues || (exports.TraceValues = TraceValues = {}));
	(function(Trace$1) {
		function fromString(value) {
			if (!Is.string(value)) return Trace$1.Off;
			value = value.toLowerCase();
			switch (value) {
				case "off": return Trace$1.Off;
				case "messages": return Trace$1.Messages;
				case "compact": return Trace$1.Compact;
				case "verbose": return Trace$1.Verbose;
				default: return Trace$1.Off;
			}
		}
		Trace$1.fromString = fromString;
		function toString(value) {
			switch (value) {
				case Trace$1.Off: return "off";
				case Trace$1.Messages: return "messages";
				case Trace$1.Compact: return "compact";
				case Trace$1.Verbose: return "verbose";
				default: return "off";
			}
		}
		Trace$1.toString = toString;
	})(Trace || (exports.Trace = Trace = {}));
	var TraceFormat;
	(function(TraceFormat$1) {
		TraceFormat$1["Text"] = "text";
		TraceFormat$1["JSON"] = "json";
	})(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
	(function(TraceFormat$1) {
		function fromString(value) {
			if (!Is.string(value)) return TraceFormat$1.Text;
			value = value.toLowerCase();
			if (value === "json") return TraceFormat$1.JSON;
			else return TraceFormat$1.Text;
		}
		TraceFormat$1.fromString = fromString;
	})(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
	var SetTraceNotification;
	(function(SetTraceNotification$1) {
		SetTraceNotification$1.type = new messages_1$1.NotificationType("$/setTrace");
	})(SetTraceNotification || (exports.SetTraceNotification = SetTraceNotification = {}));
	var LogTraceNotification;
	(function(LogTraceNotification$1) {
		LogTraceNotification$1.type = new messages_1$1.NotificationType("$/logTrace");
	})(LogTraceNotification || (exports.LogTraceNotification = LogTraceNotification = {}));
	var ConnectionErrors;
	(function(ConnectionErrors$1) {
		ConnectionErrors$1[ConnectionErrors$1["Closed"] = 1] = "Closed";
		ConnectionErrors$1[ConnectionErrors$1["Disposed"] = 2] = "Disposed";
		ConnectionErrors$1[ConnectionErrors$1["AlreadyListening"] = 3] = "AlreadyListening";
	})(ConnectionErrors || (exports.ConnectionErrors = ConnectionErrors = {}));
	var ConnectionError = class ConnectionError extends Error {
		constructor(code, message) {
			super(message);
			this.code = code;
			Object.setPrototypeOf(this, ConnectionError.prototype);
		}
	};
	exports.ConnectionError = ConnectionError;
	var ConnectionStrategy;
	(function(ConnectionStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && Is.func(candidate.cancelUndispatched);
		}
		ConnectionStrategy$1.is = is$1;
	})(ConnectionStrategy || (exports.ConnectionStrategy = ConnectionStrategy = {}));
	var IdCancellationReceiverStrategy;
	(function(IdCancellationReceiverStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
		}
		IdCancellationReceiverStrategy$1.is = is$1;
	})(IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
	var RequestCancellationReceiverStrategy;
	(function(RequestCancellationReceiverStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
		}
		RequestCancellationReceiverStrategy$1.is = is$1;
	})(RequestCancellationReceiverStrategy || (exports.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
	var CancellationReceiverStrategy;
	(function(CancellationReceiverStrategy$1) {
		CancellationReceiverStrategy$1.Message = Object.freeze({ createCancellationTokenSource(_) {
			return new cancellation_1$1.CancellationTokenSource();
		} });
		function is$1(value) {
			return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
		}
		CancellationReceiverStrategy$1.is = is$1;
	})(CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
	var CancellationSenderStrategy;
	(function(CancellationSenderStrategy$1) {
		CancellationSenderStrategy$1.Message = Object.freeze({
			sendCancellation(conn, id) {
				return conn.sendNotification(CancelNotification.type, { id });
			},
			cleanup(_) {}
		});
		function is$1(value) {
			const candidate = value;
			return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
		}
		CancellationSenderStrategy$1.is = is$1;
	})(CancellationSenderStrategy || (exports.CancellationSenderStrategy = CancellationSenderStrategy = {}));
	var CancellationStrategy;
	(function(CancellationStrategy$1) {
		CancellationStrategy$1.Message = Object.freeze({
			receiver: CancellationReceiverStrategy.Message,
			sender: CancellationSenderStrategy.Message
		});
		function is$1(value) {
			const candidate = value;
			return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
		}
		CancellationStrategy$1.is = is$1;
	})(CancellationStrategy || (exports.CancellationStrategy = CancellationStrategy = {}));
	var MessageStrategy;
	(function(MessageStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && Is.func(candidate.handleMessage);
		}
		MessageStrategy$1.is = is$1;
	})(MessageStrategy || (exports.MessageStrategy = MessageStrategy = {}));
	var ConnectionOptions;
	(function(ConnectionOptions$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
		}
		ConnectionOptions$1.is = is$1;
	})(ConnectionOptions || (exports.ConnectionOptions = ConnectionOptions = {}));
	var ConnectionState;
	(function(ConnectionState$1) {
		ConnectionState$1[ConnectionState$1["New"] = 1] = "New";
		ConnectionState$1[ConnectionState$1["Listening"] = 2] = "Listening";
		ConnectionState$1[ConnectionState$1["Closed"] = 3] = "Closed";
		ConnectionState$1[ConnectionState$1["Disposed"] = 4] = "Disposed";
	})(ConnectionState || (ConnectionState = {}));
	function createMessageConnection$2(messageReader, messageWriter, _logger, options) {
		const logger = _logger !== void 0 ? _logger : exports.NullLogger;
		let sequenceNumber = 0;
		let notificationSequenceNumber = 0;
		let unknownResponseSequenceNumber = 0;
		const version = "2.0";
		let starRequestHandler = void 0;
		const requestHandlers = /* @__PURE__ */ new Map();
		let starNotificationHandler = void 0;
		const notificationHandlers = /* @__PURE__ */ new Map();
		const progressHandlers = /* @__PURE__ */ new Map();
		let timer;
		let messageQueue = new linkedMap_1$1.LinkedMap();
		let responsePromises = /* @__PURE__ */ new Map();
		let knownCanceledRequests = /* @__PURE__ */ new Set();
		let requestTokens = /* @__PURE__ */ new Map();
		let trace = Trace.Off;
		let traceFormat = TraceFormat.Text;
		let tracer;
		let state = ConnectionState.New;
		const errorEmitter = new events_1$1.Emitter();
		const closeEmitter = new events_1$1.Emitter();
		const unhandledNotificationEmitter = new events_1$1.Emitter();
		const unhandledProgressEmitter = new events_1$1.Emitter();
		const disposeEmitter = new events_1$1.Emitter();
		const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
		function createRequestQueueKey(id) {
			if (id === null) throw new Error(`Can't send requests with id null since the response can't be correlated.`);
			return "req-" + id.toString();
		}
		function createResponseQueueKey(id) {
			if (id === null) return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
			else return "res-" + id.toString();
		}
		function createNotificationQueueKey() {
			return "not-" + (++notificationSequenceNumber).toString();
		}
		function addMessageToQueue(queue, message) {
			if (messages_1$1.Message.isRequest(message)) queue.set(createRequestQueueKey(message.id), message);
			else if (messages_1$1.Message.isResponse(message)) queue.set(createResponseQueueKey(message.id), message);
			else queue.set(createNotificationQueueKey(), message);
		}
		function cancelUndispatched(_message) {}
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
				closeEmitter.fire(void 0);
			}
		}
		function readErrorHandler(error$1) {
			errorEmitter.fire([
				error$1,
				void 0,
				void 0
			]);
		}
		function writeErrorHandler(data) {
			errorEmitter.fire(data);
		}
		messageReader.onClose(closeHandler);
		messageReader.onError(readErrorHandler);
		messageWriter.onClose(closeHandler);
		messageWriter.onError(writeErrorHandler);
		function triggerMessageQueue() {
			if (timer || messageQueue.size === 0) return;
			timer = (0, ral_1$1.default)().timer.setImmediate(() => {
				timer = void 0;
				processMessageQueue();
			});
		}
		function handleMessage(message) {
			if (messages_1$1.Message.isRequest(message)) handleRequest(message);
			else if (messages_1$1.Message.isNotification(message)) handleNotification(message);
			else if (messages_1$1.Message.isResponse(message)) handleResponse(message);
			else handleInvalidMessage(message);
		}
		function processMessageQueue() {
			if (messageQueue.size === 0) return;
			const message = messageQueue.shift();
			try {
				const messageStrategy = options?.messageStrategy;
				if (MessageStrategy.is(messageStrategy)) messageStrategy.handleMessage(message, handleMessage);
				else handleMessage(message);
			} finally {
				triggerMessageQueue();
			}
		}
		const callback = (message) => {
			try {
				if (messages_1$1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
					const cancelId = message.params.id;
					const key = createRequestQueueKey(cancelId);
					const toCancel = messageQueue.get(key);
					if (messages_1$1.Message.isRequest(toCancel)) {
						const strategy = options?.connectionStrategy;
						const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
						if (response && (response.error !== void 0 || response.result !== void 0)) {
							messageQueue.delete(key);
							requestTokens.delete(cancelId);
							response.id = toCancel.id;
							traceSendingResponse(response, message.method, Date.now());
							messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
							return;
						}
					}
					const cancellationToken = requestTokens.get(cancelId);
					if (cancellationToken !== void 0) {
						cancellationToken.cancel();
						traceReceivedNotification(message);
						return;
					} else knownCanceledRequests.add(cancelId);
				}
				addMessageToQueue(messageQueue, message);
			} finally {
				triggerMessageQueue();
			}
		};
		function handleRequest(requestMessage) {
			if (isDisposed()) return;
			function reply(resultOrError, method, startTime$1) {
				const message = {
					jsonrpc: version,
					id: requestMessage.id
				};
				if (resultOrError instanceof messages_1$1.ResponseError) message.error = resultOrError.toJson();
				else message.result = resultOrError === void 0 ? null : resultOrError;
				traceSendingResponse(message, method, startTime$1);
				messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
			}
			function replyError(error$1, method, startTime$1) {
				const message = {
					jsonrpc: version,
					id: requestMessage.id,
					error: error$1.toJson()
				};
				traceSendingResponse(message, method, startTime$1);
				messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
			}
			function replySuccess(result, method, startTime$1) {
				if (result === void 0) result = null;
				const message = {
					jsonrpc: version,
					id: requestMessage.id,
					result
				};
				traceSendingResponse(message, method, startTime$1);
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
				const tokenKey = requestMessage.id ?? String(Date.now());
				const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
				if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) cancellationSource.cancel();
				if (requestMessage.id !== null) requestTokens.set(tokenKey, cancellationSource);
				try {
					let handlerResult;
					if (requestHandler) if (requestMessage.params === void 0) {
						if (type !== void 0 && type.numberOfParams !== 0) {
							replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
							return;
						}
						handlerResult = requestHandler(cancellationSource.token);
					} else if (Array.isArray(requestMessage.params)) {
						if (type !== void 0 && type.parameterStructures === messages_1$1.ParameterStructures.byName) {
							replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
							return;
						}
						handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
					} else {
						if (type !== void 0 && type.parameterStructures === messages_1$1.ParameterStructures.byPosition) {
							replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
							return;
						}
						handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
					}
					else if (starRequestHandler) handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
					const promise = handlerResult;
					if (!handlerResult) {
						requestTokens.delete(tokenKey);
						replySuccess(handlerResult, requestMessage.method, startTime);
					} else if (promise.then) promise.then((resultOrError) => {
						requestTokens.delete(tokenKey);
						reply(resultOrError, requestMessage.method, startTime);
					}, (error$1) => {
						requestTokens.delete(tokenKey);
						if (error$1 instanceof messages_1$1.ResponseError) replyError(error$1, requestMessage.method, startTime);
						else if (error$1 && Is.string(error$1.message)) replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error$1.message}`), requestMessage.method, startTime);
						else replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
					});
					else {
						requestTokens.delete(tokenKey);
						reply(handlerResult, requestMessage.method, startTime);
					}
				} catch (error$1) {
					requestTokens.delete(tokenKey);
					if (error$1 instanceof messages_1$1.ResponseError) reply(error$1, requestMessage.method, startTime);
					else if (error$1 && Is.string(error$1.message)) replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error$1.message}`), requestMessage.method, startTime);
					else replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
				}
			} else replyError(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
		}
		function handleResponse(responseMessage) {
			if (isDisposed()) return;
			if (responseMessage.id === null) if (responseMessage.error) logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, void 0, 4)}`);
			else logger.error(`Received response message without id. No further error information provided.`);
			else {
				const key = responseMessage.id;
				const responsePromise = responsePromises.get(key);
				traceReceivedResponse(responseMessage, responsePromise);
				if (responsePromise !== void 0) {
					responsePromises.delete(key);
					try {
						if (responseMessage.error) {
							const error$1 = responseMessage.error;
							responsePromise.reject(new messages_1$1.ResponseError(error$1.code, error$1.message, error$1.data));
						} else if (responseMessage.result !== void 0) responsePromise.resolve(responseMessage.result);
						else throw new Error("Should never happen.");
					} catch (error$1) {
						if (error$1.message) logger.error(`Response handler '${responsePromise.method}' failed with message: ${error$1.message}`);
						else logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
					}
				}
			}
		}
		function handleNotification(message) {
			if (isDisposed()) return;
			let type = void 0;
			let notificationHandler;
			if (message.method === CancelNotification.type.method) {
				const cancelId = message.params.id;
				knownCanceledRequests.delete(cancelId);
				traceReceivedNotification(message);
				return;
			} else {
				const element = notificationHandlers.get(message.method);
				if (element) {
					notificationHandler = element.handler;
					type = element.type;
				}
			}
			if (notificationHandler || starNotificationHandler) try {
				traceReceivedNotification(message);
				if (notificationHandler) if (message.params === void 0) {
					if (type !== void 0) {
						if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1$1.ParameterStructures.byName) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
					}
					notificationHandler();
				} else if (Array.isArray(message.params)) {
					const params = message.params;
					if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) notificationHandler({
						token: params[0],
						value: params[1]
					});
					else {
						if (type !== void 0) {
							if (type.parameterStructures === messages_1$1.ParameterStructures.byName) logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
							if (type.numberOfParams !== message.params.length) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
						}
						notificationHandler(...params);
					}
				} else {
					if (type !== void 0 && type.parameterStructures === messages_1$1.ParameterStructures.byPosition) logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
					notificationHandler(message.params);
				}
				else if (starNotificationHandler) starNotificationHandler(message.method, message.params);
			} catch (error$1) {
				if (error$1.message) logger.error(`Notification handler '${message.method}' failed with message: ${error$1.message}`);
				else logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
			}
			else unhandledNotificationEmitter.fire(message);
		}
		function handleInvalidMessage(message) {
			if (!message) {
				logger.error("Received empty message.");
				return;
			}
			logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
			const responseMessage = message;
			if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
				const key = responseMessage.id;
				const responseHandler = responsePromises.get(key);
				if (responseHandler) responseHandler.reject(/* @__PURE__ */ new Error("The received response has neither a result nor an error property."));
			}
		}
		function stringifyTrace(params) {
			if (params === void 0 || params === null) return;
			switch (trace) {
				case Trace.Verbose: return JSON.stringify(params, null, 4);
				case Trace.Compact: return JSON.stringify(params);
				default: return;
			}
		}
		function traceSendingRequest(message) {
			if (trace === Trace.Off || !tracer) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) data = `Params: ${stringifyTrace(message.params)}\n\n`;
				tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
			} else logLSPMessage("send-request", message);
		}
		function traceSendingNotification(message) {
			if (trace === Trace.Off || !tracer) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if (trace === Trace.Verbose || trace === Trace.Compact) if (message.params) data = `Params: ${stringifyTrace(message.params)}\n\n`;
				else data = "No parameters provided.\n\n";
				tracer.log(`Sending notification '${message.method}'.`, data);
			} else logLSPMessage("send-notification", message);
		}
		function traceSendingResponse(message, method, startTime) {
			if (trace === Trace.Off || !tracer) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if (trace === Trace.Verbose || trace === Trace.Compact) {
					if (message.error && message.error.data) data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
					else if (message.result) data = `Result: ${stringifyTrace(message.result)}\n\n`;
					else if (message.error === void 0) data = "No result returned.\n\n";
				}
				tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
			} else logLSPMessage("send-response", message);
		}
		function traceReceivedRequest(message) {
			if (trace === Trace.Off || !tracer) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) data = `Params: ${stringifyTrace(message.params)}\n\n`;
				tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
			} else logLSPMessage("receive-request", message);
		}
		function traceReceivedNotification(message) {
			if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if (trace === Trace.Verbose || trace === Trace.Compact) if (message.params) data = `Params: ${stringifyTrace(message.params)}\n\n`;
				else data = "No parameters provided.\n\n";
				tracer.log(`Received notification '${message.method}'.`, data);
			} else logLSPMessage("receive-notification", message);
		}
		function traceReceivedResponse(message, responsePromise) {
			if (trace === Trace.Off || !tracer) return;
			if (traceFormat === TraceFormat.Text) {
				let data = void 0;
				if (trace === Trace.Verbose || trace === Trace.Compact) {
					if (message.error && message.error.data) data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
					else if (message.result) data = `Result: ${stringifyTrace(message.result)}\n\n`;
					else if (message.error === void 0) data = "No result returned.\n\n";
				}
				if (responsePromise) {
					const error$1 = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
					tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error$1}`, data);
				} else tracer.log(`Received response ${message.id} without active response promise.`, data);
			} else logLSPMessage("receive-response", message);
		}
		function logLSPMessage(type, message) {
			if (!tracer || trace === Trace.Off) return;
			const lspMessage = {
				isLSPMessage: true,
				type,
				message,
				timestamp: Date.now()
			};
			tracer.log(lspMessage);
		}
		function throwIfClosedOrDisposed() {
			if (isClosed()) throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
			if (isDisposed()) throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
		}
		function throwIfListening() {
			if (isListening()) throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
		}
		function throwIfNotListening() {
			if (!isListening()) throw new Error("Call listen() first.");
		}
		function undefinedToNull(param) {
			if (param === void 0) return null;
			else return param;
		}
		function nullToUndefined(param) {
			if (param === null) return;
			else return param;
		}
		function isNamedParam(param) {
			return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
		}
		function computeSingleParam(parameterStructures, param) {
			switch (parameterStructures) {
				case messages_1$1.ParameterStructures.auto: if (isNamedParam(param)) return nullToUndefined(param);
				else return [undefinedToNull(param)];
				case messages_1$1.ParameterStructures.byName:
					if (!isNamedParam(param)) throw new Error(`Received parameters by name but param is not an object literal.`);
					return nullToUndefined(param);
				case messages_1$1.ParameterStructures.byPosition: return [undefinedToNull(param)];
				default: throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
			}
		}
		function computeMessageParams(type, params) {
			let result;
			const numberOfParams = type.numberOfParams;
			switch (numberOfParams) {
				case 0:
					result = void 0;
					break;
				case 1:
					result = computeSingleParam(type.parameterStructures, params[0]);
					break;
				default:
					result = [];
					for (let i = 0; i < params.length && i < numberOfParams; i++) result.push(undefinedToNull(params[i]));
					if (params.length < numberOfParams) for (let i = params.length; i < numberOfParams; i++) result.push(null);
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
					let parameterStructures = messages_1$1.ParameterStructures.auto;
					if (messages_1$1.ParameterStructures.is(first)) {
						paramStart = 1;
						parameterStructures = first;
					}
					let paramEnd = args.length;
					const numberOfParams = paramEnd - paramStart;
					switch (numberOfParams) {
						case 0:
							messageParams = void 0;
							break;
						case 1:
							messageParams = computeSingleParam(parameterStructures, args[paramStart]);
							break;
						default:
							if (parameterStructures === messages_1$1.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
							messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
							break;
					}
				} else {
					const params = args;
					method = type.method;
					messageParams = computeMessageParams(type, params);
				}
				const notificationMessage = {
					jsonrpc: version,
					method,
					params: messageParams
				};
				traceSendingNotification(notificationMessage);
				return messageWriter.write(notificationMessage).catch((error$1) => {
					logger.error(`Sending notification failed.`);
					throw error$1;
				});
			},
			onNotification: (type, handler) => {
				throwIfClosedOrDisposed();
				let method;
				if (Is.func(type)) starNotificationHandler = type;
				else if (handler) if (Is.string(type)) {
					method = type;
					notificationHandlers.set(type, {
						type: void 0,
						handler
					});
				} else {
					method = type.method;
					notificationHandlers.set(type.method, {
						type,
						handler
					});
				}
				return { dispose: () => {
					if (method !== void 0) notificationHandlers.delete(method);
					else starNotificationHandler = void 0;
				} };
			},
			onProgress: (_type, token, handler) => {
				if (progressHandlers.has(token)) throw new Error(`Progress handler for token ${token} already registered`);
				progressHandlers.set(token, handler);
				return { dispose: () => {
					progressHandlers.delete(token);
				} };
			},
			sendProgress: (_type, token, value) => {
				return connection.sendNotification(ProgressNotification.type, {
					token,
					value
				});
			},
			onUnhandledProgress: unhandledProgressEmitter.event,
			sendRequest: (type, ...args) => {
				throwIfClosedOrDisposed();
				throwIfNotListening();
				let method;
				let messageParams;
				let token = void 0;
				if (Is.string(type)) {
					method = type;
					const first = args[0];
					const last = args[args.length - 1];
					let paramStart = 0;
					let parameterStructures = messages_1$1.ParameterStructures.auto;
					if (messages_1$1.ParameterStructures.is(first)) {
						paramStart = 1;
						parameterStructures = first;
					}
					let paramEnd = args.length;
					if (cancellation_1$1.CancellationToken.is(last)) {
						paramEnd = paramEnd - 1;
						token = last;
					}
					const numberOfParams = paramEnd - paramStart;
					switch (numberOfParams) {
						case 0:
							messageParams = void 0;
							break;
						case 1:
							messageParams = computeSingleParam(parameterStructures, args[paramStart]);
							break;
						default:
							if (parameterStructures === messages_1$1.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
							messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
							break;
					}
				} else {
					const params = args;
					method = type.method;
					messageParams = computeMessageParams(type, params);
					const numberOfParams = type.numberOfParams;
					token = cancellation_1$1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
				}
				const id = sequenceNumber++;
				let disposable;
				if (token) disposable = token.onCancellationRequested(() => {
					const p = cancellationStrategy.sender.sendCancellation(connection, id);
					if (p === void 0) {
						logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
						return Promise.resolve();
					} else return p.catch(() => {
						logger.log(`Sending cancellation messages for id ${id} failed`);
					});
				});
				const requestMessage = {
					jsonrpc: version,
					id,
					method,
					params: messageParams
				};
				traceSendingRequest(requestMessage);
				if (typeof cancellationStrategy.sender.enableCancellation === "function") cancellationStrategy.sender.enableCancellation(requestMessage);
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
					const responsePromise = {
						method,
						timerStart: Date.now(),
						resolve: resolveWithCleanup,
						reject: rejectWithCleanup
					};
					try {
						responsePromises.set(id, responsePromise);
						await messageWriter.write(requestMessage);
					} catch (error$1) {
						responsePromises.delete(id);
						responsePromise.reject(new messages_1$1.ResponseError(messages_1$1.ErrorCodes.MessageWriteError, error$1.message ? error$1.message : "Unknown reason"));
						logger.error(`Sending request failed.`);
						throw error$1;
					}
				});
			},
			onRequest: (type, handler) => {
				throwIfClosedOrDisposed();
				let method = null;
				if (StarRequestHandler.is(type)) {
					method = void 0;
					starRequestHandler = type;
				} else if (Is.string(type)) {
					method = null;
					if (handler !== void 0) {
						method = type;
						requestHandlers.set(type, {
							handler,
							type: void 0
						});
					}
				} else if (handler !== void 0) {
					method = type.method;
					requestHandlers.set(type.method, {
						type,
						handler
					});
				}
				return { dispose: () => {
					if (method === null) return;
					if (method !== void 0) requestHandlers.delete(method);
					else starRequestHandler = void 0;
				} };
			},
			hasPendingResponse: () => {
				return responsePromises.size > 0;
			},
			trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
				let _sendNotification = false;
				let _traceFormat = TraceFormat.Text;
				if (sendNotificationOrTraceOptions !== void 0) if (Is.boolean(sendNotificationOrTraceOptions)) _sendNotification = sendNotificationOrTraceOptions;
				else {
					_sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
					_traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
				}
				trace = _value;
				traceFormat = _traceFormat;
				if (trace === Trace.Off) tracer = void 0;
				else tracer = _tracer;
				if (_sendNotification && !isClosed() && !isDisposed()) await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
			},
			onError: errorEmitter.event,
			onClose: closeEmitter.event,
			onUnhandledNotification: unhandledNotificationEmitter.event,
			onDispose: disposeEmitter.event,
			end: () => {
				messageWriter.end();
			},
			dispose: () => {
				if (isDisposed()) return;
				state = ConnectionState.Disposed;
				disposeEmitter.fire(void 0);
				const error$1 = new messages_1$1.ResponseError(messages_1$1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
				for (const promise of responsePromises.values()) promise.reject(error$1);
				responsePromises = /* @__PURE__ */ new Map();
				requestTokens = /* @__PURE__ */ new Map();
				knownCanceledRequests = /* @__PURE__ */ new Set();
				messageQueue = new linkedMap_1$1.LinkedMap();
				if (Is.func(messageWriter.dispose)) messageWriter.dispose();
				if (Is.func(messageReader.dispose)) messageReader.dispose();
			},
			listen: () => {
				throwIfClosedOrDisposed();
				throwIfListening();
				state = ConnectionState.Listening;
				messageReader.listen(callback);
			},
			inspect: () => {
				(0, ral_1$1.default)().console.log("inspect");
			}
		};
		connection.onNotification(LogTraceNotification.type, (params) => {
			if (trace === Trace.Off || !tracer) return;
			const verbose = trace === Trace.Verbose || trace === Trace.Compact;
			tracer.log(params.message, verbose ? params.verbose : void 0);
		});
		connection.onNotification(ProgressNotification.type, (params) => {
			const handler = progressHandlers.get(params.token);
			if (handler) handler(params.value);
			else unhandledProgressEmitter.fire(params);
		});
		return connection;
	}
	exports.createMessageConnection = createMessageConnection$2;
}));
var require_api = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
	exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = void 0;
	const messages_1 = require_messages();
	Object.defineProperty(exports, "Message", {
		enumerable: true,
		get: function() {
			return messages_1.Message;
		}
	});
	Object.defineProperty(exports, "RequestType", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType;
		}
	});
	Object.defineProperty(exports, "RequestType0", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType0;
		}
	});
	Object.defineProperty(exports, "RequestType1", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType1;
		}
	});
	Object.defineProperty(exports, "RequestType2", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType2;
		}
	});
	Object.defineProperty(exports, "RequestType3", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType3;
		}
	});
	Object.defineProperty(exports, "RequestType4", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType4;
		}
	});
	Object.defineProperty(exports, "RequestType5", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType5;
		}
	});
	Object.defineProperty(exports, "RequestType6", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType6;
		}
	});
	Object.defineProperty(exports, "RequestType7", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType7;
		}
	});
	Object.defineProperty(exports, "RequestType8", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType8;
		}
	});
	Object.defineProperty(exports, "RequestType9", {
		enumerable: true,
		get: function() {
			return messages_1.RequestType9;
		}
	});
	Object.defineProperty(exports, "ResponseError", {
		enumerable: true,
		get: function() {
			return messages_1.ResponseError;
		}
	});
	Object.defineProperty(exports, "ErrorCodes", {
		enumerable: true,
		get: function() {
			return messages_1.ErrorCodes;
		}
	});
	Object.defineProperty(exports, "NotificationType", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType;
		}
	});
	Object.defineProperty(exports, "NotificationType0", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType0;
		}
	});
	Object.defineProperty(exports, "NotificationType1", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType1;
		}
	});
	Object.defineProperty(exports, "NotificationType2", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType2;
		}
	});
	Object.defineProperty(exports, "NotificationType3", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType3;
		}
	});
	Object.defineProperty(exports, "NotificationType4", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType4;
		}
	});
	Object.defineProperty(exports, "NotificationType5", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType5;
		}
	});
	Object.defineProperty(exports, "NotificationType6", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType6;
		}
	});
	Object.defineProperty(exports, "NotificationType7", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType7;
		}
	});
	Object.defineProperty(exports, "NotificationType8", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType8;
		}
	});
	Object.defineProperty(exports, "NotificationType9", {
		enumerable: true,
		get: function() {
			return messages_1.NotificationType9;
		}
	});
	Object.defineProperty(exports, "ParameterStructures", {
		enumerable: true,
		get: function() {
			return messages_1.ParameterStructures;
		}
	});
	const linkedMap_1 = require_linkedMap();
	Object.defineProperty(exports, "LinkedMap", {
		enumerable: true,
		get: function() {
			return linkedMap_1.LinkedMap;
		}
	});
	Object.defineProperty(exports, "LRUCache", {
		enumerable: true,
		get: function() {
			return linkedMap_1.LRUCache;
		}
	});
	Object.defineProperty(exports, "Touch", {
		enumerable: true,
		get: function() {
			return linkedMap_1.Touch;
		}
	});
	const disposable_1 = require_disposable();
	Object.defineProperty(exports, "Disposable", {
		enumerable: true,
		get: function() {
			return disposable_1.Disposable;
		}
	});
	const events_1 = require_events();
	Object.defineProperty(exports, "Event", {
		enumerable: true,
		get: function() {
			return events_1.Event;
		}
	});
	Object.defineProperty(exports, "Emitter", {
		enumerable: true,
		get: function() {
			return events_1.Emitter;
		}
	});
	const cancellation_1 = require_cancellation();
	Object.defineProperty(exports, "CancellationTokenSource", {
		enumerable: true,
		get: function() {
			return cancellation_1.CancellationTokenSource;
		}
	});
	Object.defineProperty(exports, "CancellationToken", {
		enumerable: true,
		get: function() {
			return cancellation_1.CancellationToken;
		}
	});
	const sharedArrayCancellation_1 = require_sharedArrayCancellation();
	Object.defineProperty(exports, "SharedArraySenderStrategy", {
		enumerable: true,
		get: function() {
			return sharedArrayCancellation_1.SharedArraySenderStrategy;
		}
	});
	Object.defineProperty(exports, "SharedArrayReceiverStrategy", {
		enumerable: true,
		get: function() {
			return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
		}
	});
	const messageReader_1 = require_messageReader();
	Object.defineProperty(exports, "MessageReader", {
		enumerable: true,
		get: function() {
			return messageReader_1.MessageReader;
		}
	});
	Object.defineProperty(exports, "AbstractMessageReader", {
		enumerable: true,
		get: function() {
			return messageReader_1.AbstractMessageReader;
		}
	});
	Object.defineProperty(exports, "ReadableStreamMessageReader", {
		enumerable: true,
		get: function() {
			return messageReader_1.ReadableStreamMessageReader;
		}
	});
	const messageWriter_1 = require_messageWriter();
	Object.defineProperty(exports, "MessageWriter", {
		enumerable: true,
		get: function() {
			return messageWriter_1.MessageWriter;
		}
	});
	Object.defineProperty(exports, "AbstractMessageWriter", {
		enumerable: true,
		get: function() {
			return messageWriter_1.AbstractMessageWriter;
		}
	});
	Object.defineProperty(exports, "WriteableStreamMessageWriter", {
		enumerable: true,
		get: function() {
			return messageWriter_1.WriteableStreamMessageWriter;
		}
	});
	const messageBuffer_1 = require_messageBuffer();
	Object.defineProperty(exports, "AbstractMessageBuffer", {
		enumerable: true,
		get: function() {
			return messageBuffer_1.AbstractMessageBuffer;
		}
	});
	const connection_1 = require_connection();
	Object.defineProperty(exports, "ConnectionStrategy", {
		enumerable: true,
		get: function() {
			return connection_1.ConnectionStrategy;
		}
	});
	Object.defineProperty(exports, "ConnectionOptions", {
		enumerable: true,
		get: function() {
			return connection_1.ConnectionOptions;
		}
	});
	Object.defineProperty(exports, "NullLogger", {
		enumerable: true,
		get: function() {
			return connection_1.NullLogger;
		}
	});
	Object.defineProperty(exports, "createMessageConnection", {
		enumerable: true,
		get: function() {
			return connection_1.createMessageConnection;
		}
	});
	Object.defineProperty(exports, "ProgressToken", {
		enumerable: true,
		get: function() {
			return connection_1.ProgressToken;
		}
	});
	Object.defineProperty(exports, "ProgressType", {
		enumerable: true,
		get: function() {
			return connection_1.ProgressType;
		}
	});
	Object.defineProperty(exports, "Trace", {
		enumerable: true,
		get: function() {
			return connection_1.Trace;
		}
	});
	Object.defineProperty(exports, "TraceValues", {
		enumerable: true,
		get: function() {
			return connection_1.TraceValues;
		}
	});
	Object.defineProperty(exports, "TraceFormat", {
		enumerable: true,
		get: function() {
			return connection_1.TraceFormat;
		}
	});
	Object.defineProperty(exports, "SetTraceNotification", {
		enumerable: true,
		get: function() {
			return connection_1.SetTraceNotification;
		}
	});
	Object.defineProperty(exports, "LogTraceNotification", {
		enumerable: true,
		get: function() {
			return connection_1.LogTraceNotification;
		}
	});
	Object.defineProperty(exports, "ConnectionErrors", {
		enumerable: true,
		get: function() {
			return connection_1.ConnectionErrors;
		}
	});
	Object.defineProperty(exports, "ConnectionError", {
		enumerable: true,
		get: function() {
			return connection_1.ConnectionError;
		}
	});
	Object.defineProperty(exports, "CancellationReceiverStrategy", {
		enumerable: true,
		get: function() {
			return connection_1.CancellationReceiverStrategy;
		}
	});
	Object.defineProperty(exports, "CancellationSenderStrategy", {
		enumerable: true,
		get: function() {
			return connection_1.CancellationSenderStrategy;
		}
	});
	Object.defineProperty(exports, "CancellationStrategy", {
		enumerable: true,
		get: function() {
			return connection_1.CancellationStrategy;
		}
	});
	Object.defineProperty(exports, "MessageStrategy", {
		enumerable: true,
		get: function() {
			return connection_1.MessageStrategy;
		}
	});
	exports.RAL = require_ral().default;
}));
var require_ril = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const api_1$1 = require_api();
	var MessageBuffer = class MessageBuffer extends api_1$1.AbstractMessageBuffer {
		constructor(encoding = "utf-8") {
			super(encoding);
			this.asciiDecoder = new TextDecoder("ascii");
		}
		emptyBuffer() {
			return MessageBuffer.emptyBuffer;
		}
		fromString(value, _encoding) {
			return new TextEncoder().encode(value);
		}
		toString(value, encoding) {
			if (encoding === "ascii") return this.asciiDecoder.decode(value);
			else return new TextDecoder(encoding).decode(value);
		}
		asNative(buffer, length) {
			if (length === void 0) return buffer;
			else return buffer.slice(0, length);
		}
		allocNative(length) {
			return new Uint8Array(length);
		}
	};
	MessageBuffer.emptyBuffer = new Uint8Array(0);
	var ReadableStreamWrapper = class {
		constructor(socket) {
			this.socket = socket;
			this._onData = new api_1$1.Emitter();
			this._messageListener = (event) => {
				event.data.arrayBuffer().then((buffer) => {
					this._onData.fire(new Uint8Array(buffer));
				}, () => {
					(0, api_1$1.RAL)().console.error(`Converting blob to array buffer failed.`);
				});
			};
			this.socket.addEventListener("message", this._messageListener);
		}
		onClose(listener) {
			this.socket.addEventListener("close", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("close", listener));
		}
		onError(listener) {
			this.socket.addEventListener("error", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("error", listener));
		}
		onEnd(listener) {
			this.socket.addEventListener("end", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("end", listener));
		}
		onData(listener) {
			return this._onData.event(listener);
		}
	};
	var WritableStreamWrapper = class {
		constructor(socket) {
			this.socket = socket;
		}
		onClose(listener) {
			this.socket.addEventListener("close", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("close", listener));
		}
		onError(listener) {
			this.socket.addEventListener("error", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("error", listener));
		}
		onEnd(listener) {
			this.socket.addEventListener("end", listener);
			return api_1$1.Disposable.create(() => this.socket.removeEventListener("end", listener));
		}
		write(data, encoding) {
			if (typeof data === "string") {
				if (encoding !== void 0 && encoding !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
				this.socket.send(data);
			} else this.socket.send(data);
			return Promise.resolve();
		}
		end() {
			this.socket.close();
		}
	};
	const _textEncoder = new TextEncoder();
	const _ril = Object.freeze({
		messageBuffer: Object.freeze({ create: (encoding) => new MessageBuffer(encoding) }),
		applicationJson: Object.freeze({
			encoder: Object.freeze({
				name: "application/json",
				encode: (msg, options) => {
					if (options.charset !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
					return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, void 0, 0)));
				}
			}),
			decoder: Object.freeze({
				name: "application/json",
				decode: (buffer, options) => {
					if (!(buffer instanceof Uint8Array)) throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
					return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
				}
			})
		}),
		stream: Object.freeze({
			asReadableStream: (socket) => new ReadableStreamWrapper(socket),
			asWritableStream: (socket) => new WritableStreamWrapper(socket)
		}),
		console,
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
			}
		})
	});
	function RIL() {
		return _ril;
	}
	(function(RIL$1) {
		function install() {
			api_1$1.RAL.install(_ril);
		}
		RIL$1.install = install;
	})(RIL || (RIL = {}));
	exports.default = RIL;
}));
var import_main$1 = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessageConnection = exports.BrowserMessageWriter = exports.BrowserMessageReader = void 0;
	require_ril().default.install();
	const api_1 = require_api();
	__exportStar(require_api(), exports);
	var BrowserMessageReader$1 = class extends api_1.AbstractMessageReader {
		constructor(port) {
			super();
			this._onData = new api_1.Emitter();
			this._messageListener = (event) => {
				this._onData.fire(event.data);
			};
			port.addEventListener("error", (event) => this.fireError(event));
			port.onmessage = this._messageListener;
		}
		listen(callback) {
			return this._onData.event(callback);
		}
	};
	exports.BrowserMessageReader = BrowserMessageReader$1;
	var BrowserMessageWriter$1 = class extends api_1.AbstractMessageWriter {
		constructor(port) {
			super();
			this.port = port;
			this.errorCount = 0;
			port.addEventListener("error", (event) => this.fireError(event));
		}
		write(msg) {
			try {
				this.port.postMessage(msg);
				return Promise.resolve();
			} catch (error$1) {
				this.handleError(error$1, msg);
				return Promise.reject(error$1);
			}
		}
		handleError(error$1, msg) {
			this.errorCount++;
			this.fireError(error$1, msg, this.errorCount);
		}
		end() {}
	};
	exports.BrowserMessageWriter = BrowserMessageWriter$1;
	function createMessageConnection$1(reader, writer, logger, options) {
		if (logger === void 0) logger = api_1.NullLogger;
		if (api_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
		return (0, api_1.createMessageConnection)(reader, writer, logger, options);
	}
	exports.createMessageConnection = createMessageConnection$1;
})))();
function createWebSocketConnection(socket, logger) {
	const connection = (0, import_main$1.createMessageConnection)(new WebSocketMessageReader(socket), new WebSocketMessageWriter(socket), logger);
	connection.onClose(() => connection.dispose());
	return connection;
}
var ConsoleLogger = class {
	error(message) {
		console.error(message);
	}
	warn(message) {
		console.warn(message);
	}
	info(message) {
		console.info(message);
	}
	log(message) {
		console.log(message);
	}
	debug(message) {
		console.debug(message);
	}
};
function listen(options) {
	const { webSocket, onConnection } = options;
	const logger = options.logger || new ConsoleLogger();
	webSocket.onopen = () => {
		onConnection(createWebSocketConnection(toSocket(webSocket), logger));
	};
}
function toSocket(webSocket) {
	return {
		send: (content) => webSocket.send(content),
		onMessage: (cb) => {
			webSocket.onmessage = (event) => cb(event.data);
		},
		onError: (cb) => {
			webSocket.onerror = (event) => {
				if (Object.hasOwn(event, "message")) cb(event.message);
			};
		},
		onClose: (cb) => {
			webSocket.onclose = (event) => cb(event.code, event.reason);
		},
		dispose: () => webSocket.close()
	};
}
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_main$1();
}));
var import_main = /* @__PURE__ */ __toESM(require_main$1());
var import_browser = require_browser();
var LanguageClient = class extends BaseService {
	constructor(serverData, ctx, workspaceUri) {
		super(serverData.modes, workspaceUri);
		this.isConnected = false;
		this.isInitialized = false;
		this.requestsQueue = [];
		this.callbackId = 0;
		this.callbacks = {};
		this.ctx = ctx;
		this.serverData = serverData;
		this.$connect();
	}
	$connect() {
		switch (this.serverData.type) {
			case "webworker":
				if ("worker" in this.serverData) this.$connectWorker(this.serverData.worker, this.serverData.initializationOptions);
				else throw new Error("No worker provided");
				break;
			case "socket":
				if ("socket" in this.serverData) {
					this.socket = this.serverData.socket;
					this.$connectSocket(this.serverData.initializationOptions);
				} else throw new Error("No socketUrl provided");
				break;
			default: throw new Error("Unknown server type: " + this.serverData.type);
		}
	}
	$connectSocket(initializationOptions) {
		listen({
			webSocket: this.socket,
			onConnection: (connection) => {
				this.$initConnection(connection, initializationOptions);
			}
		});
		if (this.socket.readyState === WebSocket.OPEN) this.socket.dispatchEvent(new Event("open"));
	}
	$connectWorker(worker, initializationOptions) {
		const connection = (0, import_browser.createProtocolConnection)(new import_browser.BrowserMessageReader(worker), new import_browser.BrowserMessageWriter(worker));
		this.$initConnection(connection, initializationOptions);
	}
	$initConnection(connection, initializationOptions) {
		connection.listen();
		this.isConnected = true;
		this.connection = connection;
		this.sendInitialize(initializationOptions);
		this.connection.onNotification("textDocument/publishDiagnostics", (result) => {
			let postMessage = {
				"type": MessageType.validate,
				"documentUri": result.uri,
				"value": result.diagnostics
			};
			this.ctx.postMessage(postMessage);
		});
		this.connection.onNotification("window/showMessage", (params) => {
			this.showLog(params);
		});
		this.connection.onNotification("window/logMessage", (params) => {
			this.showLog(params);
		});
		this.connection.onNotification("$/logTrace", (params) => {
			this.showTrace(params);
		});
		this.connection.onRequest("window/showMessageRequest", (params) => {
			this.showLog(params);
		});
		this.connection.onRequest("workspace/configuration", (params) => {
			console.log(params);
		});
		this.connection.onRequest("client/registerCapability", (params) => {
			params.registrations.forEach((registration) => {
				this.registerCapability(registration);
			});
			return null;
		});
		this.connection.onRequest("client/unregisterCapability", (params) => {
			params.unregisterations.forEach((unregistration) => {
				this.unregisterCapability(unregistration);
			});
			return null;
		});
		this.connection.onRequest("workspace/applyEdit", async (params) => {
			return new Promise((resolve, reject) => {
				const callbackId = this.callbackId++;
				this.callbacks[callbackId] = (result) => {
					if (result.applied) resolve(result);
					else reject(new Error(result.failureReason));
				};
				let postMessage = {
					"type": MessageType.applyEdit,
					"serviceName": this.serviceName,
					"value": params.edit,
					"callbackId": callbackId
				};
				this.ctx.postMessage(postMessage);
			});
		});
		this.connection.onRequest("window/showDocument", (params) => {
			return new Promise((resolve, reject) => {
				const callbackId = this.callbackId++;
				this.callbacks[callbackId] = (result) => {
					resolve(result);
				};
				let postMessage = {
					"type": MessageType.showDocument,
					"serviceName": this.serviceName,
					...params
				};
				this.ctx.postMessage(postMessage);
			});
		});
		this.connection.onError((e) => {
			throw e;
		});
		this.connection.onClose(() => {
			this.isConnected = false;
		});
	}
	async $reconnect() {
		Object.values(this.documents).forEach((document) => this.removeDocument(document));
		await this.dispose();
		this.$connect();
	}
	sendAppliedResult(result, callbackId) {
		if (!this.isConnected || !this.callbacks[callbackId]) return;
		this.callbacks[callbackId](result);
	}
	sendResponse(callbackId, args) {
		if (!this.isConnected || !this.callbacks[callbackId]) return;
		this.callbacks[callbackId](args);
	}
	showLog(params) {
		switch (params.type) {
			case 1:
				console.error(params.message);
				break;
			case 2:
				console.warn(params.message);
				break;
			case 3:
				console.info(params.message);
				break;
			case 4:
			default:
				console.log(params.message);
				break;
		}
	}
	showTrace(params) {
		console.log(params.message);
		if (params.verbose) console.log(params.verbose);
	}
	addDocument(document) {
		if (this.getDocument(document.uri)) {
			console.warn(document.uri + " already exists");
			return;
		}
		super.addDocument(document);
		const textDocumentMessage = { textDocument: document };
		this.enqueueIfNotConnected(() => this.connection.sendNotification("textDocument/didOpen", textDocumentMessage));
	}
	enqueueIfNotConnected(callback) {
		if (!this.isConnected || !this.isInitialized) this.requestsQueue.push(callback);
		else callback();
	}
	removeDocument(document) {
		super.removeDocument(document);
		this.enqueueIfNotConnected(() => this.connection.sendNotification("textDocument/didClose", { textDocument: { uri: document.uri } }));
	}
	async dispose() {
		this.connection?.dispose();
	}
	async closeConnection() {
		if (!this.connection) return;
		try {
			Object.values(this.callbacks).forEach((callback) => {
				if (typeof callback === "function") callback({ error: "Connection closed" });
			});
			this.callbacks = {};
			if (this.isConnected) {
				await this.connection.sendRequest("shutdown");
				await this.connection.sendNotification("exit");
			}
			await this.dispose();
			if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) this.socket.close();
			this.isConnected = false;
		} catch (error$1) {
			console.error("Error closing connection:", error$1);
			this.isConnected = false;
			if (this.socket && this.socket.readyState !== WebSocket.CLOSED) this.socket.close();
		}
	}
	sendInitialize(initializationOptions) {
		if (!this.isConnected) return;
		const message = {
			capabilities: this.clientCapabilities,
			initializationOptions,
			processId: null,
			rootUri: null
		};
		if (this.workspaceUri) message.workspaceFolders = [this.workspaceFolder];
		this.connection.sendRequest("initialize", message).then((params) => {
			this.isInitialized = true;
			this.serviceCapabilities = params.capabilities;
			const serviceName = this.serviceName;
			Object.keys(this.documents).forEach((documentUri) => {
				const postMessage = {
					"type": MessageType.capabilitiesChange,
					"value": { [serviceName]: this.serviceCapabilities },
					documentUri
				};
				this.ctx.postMessage(postMessage);
			});
			this.connection.sendNotification("initialized", {}).then(() => {
				this.connection.sendNotification("workspace/didChangeConfiguration", { settings: {} });
				this.requestsQueue.forEach((requestCallback) => requestCallback());
				this.requestsQueue = [];
			});
		});
	}
	applyDeltas(identifier, deltas) {
		super.applyDeltas(identifier, deltas);
		if (!this.isConnected || !this.serviceCapabilities) return;
		if (this.serviceCapabilities?.textDocumentSync === import_main.TextDocumentSyncKind.None) return;
		if (this.serviceCapabilities?.textDocumentSync !== import_main.TextDocumentSyncKind.Incremental) return this.setValue(identifier, this.getDocument(identifier.uri).getText());
		const textDocumentChange = {
			textDocument: {
				uri: identifier.uri,
				version: identifier.version
			},
			contentChanges: deltas
		};
		this.connection.sendNotification("textDocument/didChange", textDocumentChange);
	}
	setValue(identifier, value) {
		super.setValue(identifier, value);
		if (!this.isConnected) return;
		if (this.serviceCapabilities?.textDocumentSync === import_main.TextDocumentSyncKind.None) return;
		const textDocumentChange = {
			textDocument: {
				uri: identifier.uri,
				version: identifier.version
			},
			contentChanges: [{ text: value }]
		};
		this.connection.sendNotification("textDocument/didChange", textDocumentChange);
	}
	async doHover(document, position) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.hoverProvider) return null;
		let options = {
			textDocument: { uri: document.uri },
			position
		};
		return this.connection.sendRequest("textDocument/hover", options);
	}
	async doComplete(document, position) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.completionProvider) return null;
		let options = {
			textDocument: { uri: document.uri },
			position
		};
		return this.connection.sendRequest("textDocument/completion", options);
	}
	async doInlineComplete(document, position) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.inlineCompletionProvider) return null;
		let options = {
			textDocument: {
				uri: document.uri,
				version: document.version
			},
			position,
			context: { triggerKind: 1 }
		};
		return this.connection.sendRequest("textDocument/inlineCompletion", options);
	}
	async doResolve(item) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.completionProvider?.resolveProvider) return null;
		return this.connection.sendRequest("completionItem/resolve", item["item"]);
	}
	async doValidation(document) {
		return [];
	}
	async format(document, range, format) {
		if (!this.isInitialized) return [];
		if (!(this.serviceCapabilities && (this.serviceCapabilities.documentRangeFormattingProvider || this.serviceCapabilities.documentFormattingProvider))) return [];
		if (!this.serviceCapabilities.documentRangeFormattingProvider) {
			let options = {
				textDocument: { uri: document.uri },
				options: format
			};
			return this.connection.sendRequest("textDocument/formatting", options);
		} else {
			let options = {
				textDocument: { uri: document.uri },
				options: format,
				range
			};
			return this.connection.sendRequest("textDocument/rangeFormatting", options);
		}
	}
	setGlobalOptions(options) {
		super.setGlobalOptions(options);
		const configChanges = { settings: options };
		this.enqueueIfNotConnected(() => this.connection.sendNotification("workspace/didChangeConfiguration", configChanges));
	}
	setWorkspace(workspaceUri) {
		super.setWorkspace(workspaceUri);
		this.enqueueIfNotConnected(() => {
			if (!this.serviceCapabilities?.workspace?.workspaceFolders?.changeNotifications) return this.$reconnect();
			const message = {
				added: [this.workspaceFolder],
				removed: []
			};
			return this.connection.sendRequest("workspace/didChangeWorkspaceFolders", message);
		});
	}
	get workspaceFolder() {
		let workspaceUri = this.workspaceUri;
		return {
			uri: workspaceUri,
			name: workspaceUri.split("/").pop()
		};
	}
	async findDocumentHighlights(document, position) {
		if (!this.isInitialized) return [];
		if (!this.serviceCapabilities?.documentHighlightProvider) return [];
		let options = {
			textDocument: { uri: document.uri },
			position
		};
		return this.connection.sendRequest("textDocument/documentHighlight", options);
	}
	async provideSignatureHelp(document, position) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.signatureHelpProvider) return null;
		let options = {
			textDocument: { uri: document.uri },
			position
		};
		return this.connection.sendRequest("textDocument/signatureHelp", options);
	}
	async getSemanticTokens(document, range) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.semanticTokensProvider) return null;
		if (!this.serviceCapabilities.semanticTokensProvider.range) {
			let options = { textDocument: { uri: document.uri } };
			return this.connection.sendRequest("textDocument/semanticTokens/full", options);
		} else {
			let options = {
				textDocument: { uri: document.uri },
				range
			};
			return this.connection.sendRequest("textDocument/semanticTokens/range", options);
		}
	}
	async getCodeActions(document, range, context) {
		if (!this.isInitialized) return null;
		if (!this.serviceCapabilities?.codeActionProvider) return null;
		let options = {
			textDocument: { uri: document.uri },
			range,
			context
		};
		return this.connection.sendRequest("textDocument/codeAction", options);
	}
	executeCommand(command, args) {
		if (!this.isInitialized) return Promise.resolve(null);
		if (!this.serviceCapabilities?.executeCommandProvider || !this.serviceCapabilities?.executeCommandProvider.commands.includes(command)) return Promise.resolve(null);
		let options = {
			command,
			arguments: args
		};
		return this.connection.sendRequest("workspace/executeCommand", options);
	}
	sendRequest(name, args) {
		if (args === void 0 || args === null) return this.connection.sendRequest(name);
		return this.connection.sendRequest(name, args);
	}
	registerCapability(registration) {
		if (!this.serviceCapabilities) this.serviceCapabilities = {};
		switch (registration.method) {
			case "textDocument/diagnostic":
				if (this.clientCapabilities.textDocument?.diagnostic?.dynamicRegistration) this.serviceCapabilities.diagnosticProvider = registration.registerOptions;
				break;
			case "textDocument/hover":
				if (this.clientCapabilities.textDocument?.hover?.dynamicRegistration) this.serviceCapabilities.hoverProvider = registration.registerOptions || true;
				break;
			case "textDocument/formatting":
			case "textDocument/rangeFormatting":
				if (this.clientCapabilities.textDocument?.formatting?.dynamicRegistration) if (registration.method === "textDocument/formatting") this.serviceCapabilities.documentFormattingProvider = registration.registerOptions || true;
				else this.serviceCapabilities.documentRangeFormattingProvider = registration.registerOptions || true;
				break;
			case "textDocument/completion":
				if (this.clientCapabilities.textDocument?.completion?.dynamicRegistration) this.serviceCapabilities.completionProvider = registration.registerOptions;
				break;
			case "textDocument/signatureHelp":
				if (this.clientCapabilities.textDocument?.signatureHelp?.dynamicRegistration) this.serviceCapabilities.signatureHelpProvider = registration.registerOptions;
				break;
			case "textDocument/documentHighlight":
				if (this.clientCapabilities.textDocument?.documentHighlight?.dynamicRegistration) this.serviceCapabilities.documentHighlightProvider = registration.registerOptions || true;
				break;
			case "textDocument/semanticTokens/full":
			case "textDocument/semanticTokens/range":
				if (this.clientCapabilities.textDocument?.semanticTokens?.dynamicRegistration) this.serviceCapabilities.semanticTokensProvider = registration.registerOptions;
				break;
			case "textDocument/codeAction":
				if (this.clientCapabilities.textDocument?.codeAction?.dynamicRegistration) this.serviceCapabilities.codeActionProvider = registration.registerOptions || true;
				break;
			case "textDocument/inlineCompletion":
				if (this.clientCapabilities.textDocument?.inlineCompletion?.dynamicRegistration) this.serviceCapabilities.inlineCompletionProvider = registration.registerOptions || true;
				break;
			case "workspace/executeCommand":
				if (this.clientCapabilities.workspace?.executeCommand?.dynamicRegistration) this.serviceCapabilities.executeCommandProvider = registration.registerOptions;
				break;
			default: console.warn(`Unhandled dynamic capability registration: ${registration.method}`);
		}
		this.notifyCapabilitiesChanged();
	}
	unregisterCapability(unregistration) {
		if (!this.serviceCapabilities) return;
		switch (unregistration.method) {
			case "textDocument/diagnostic":
				if (this.clientCapabilities.textDocument?.diagnostic?.dynamicRegistration) delete this.serviceCapabilities.diagnosticProvider;
				break;
			case "textDocument/hover":
				if (this.clientCapabilities.textDocument?.hover?.dynamicRegistration) delete this.serviceCapabilities.hoverProvider;
				break;
			case "textDocument/formatting":
				if (this.clientCapabilities.textDocument?.formatting?.dynamicRegistration) delete this.serviceCapabilities.documentFormattingProvider;
				break;
			case "textDocument/rangeFormatting":
				if (this.clientCapabilities.textDocument?.formatting?.dynamicRegistration) delete this.serviceCapabilities.documentRangeFormattingProvider;
				break;
			case "textDocument/completion":
				if (this.clientCapabilities.textDocument?.completion?.dynamicRegistration) delete this.serviceCapabilities.completionProvider;
				break;
			case "textDocument/signatureHelp":
				if (this.clientCapabilities.textDocument?.signatureHelp?.dynamicRegistration) delete this.serviceCapabilities.signatureHelpProvider;
				break;
			case "textDocument/documentHighlight":
				if (this.clientCapabilities.textDocument?.documentHighlight?.dynamicRegistration) delete this.serviceCapabilities.documentHighlightProvider;
				break;
			case "textDocument/semanticTokens/full":
			case "textDocument/semanticTokens/range":
				if (this.clientCapabilities.textDocument?.semanticTokens?.dynamicRegistration) delete this.serviceCapabilities.semanticTokensProvider;
				break;
			case "textDocument/codeAction":
				if (this.clientCapabilities.textDocument?.codeAction?.dynamicRegistration) delete this.serviceCapabilities.codeActionProvider;
				break;
			case "textDocument/inlineCompletion":
				if (this.clientCapabilities.textDocument?.inlineCompletion?.dynamicRegistration) delete this.serviceCapabilities.inlineCompletionProvider;
				break;
			case "workspace/executeCommand":
				if (this.clientCapabilities.workspace?.executeCommand?.dynamicRegistration) delete this.serviceCapabilities.executeCommandProvider;
				break;
			default: console.warn(`Unhandled dynamic capability unregistration: ${unregistration.method}`);
		}
		this.notifyCapabilitiesChanged();
	}
	notifyCapabilitiesChanged() {
		const serviceName = this.serviceName;
		Object.keys(this.documents).forEach((documentUri) => {
			const postMessage = {
				"type": MessageType.capabilitiesChange,
				"value": { [serviceName]: this.serviceCapabilities },
				documentUri
			};
			this.ctx.postMessage(postMessage);
		});
	}
};
export { LanguageClient };
