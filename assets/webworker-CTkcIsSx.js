var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_is$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
	function boolean$1(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean$1;
	function string$1(value) {
		return typeof value === "string" || value instanceof String;
	}
	exports.string = string$1;
	function number$1(value) {
		return typeof value === "number" || value instanceof Number;
	}
	exports.number = number$1;
	function error$1(value) {
		return value instanceof Error;
	}
	exports.error = error$1;
	function func$1(value) {
		return typeof value === "function";
	}
	exports.func = func$1;
	function array$1(value) {
		return Array.isArray(value);
	}
	exports.array = array$1;
	function stringArray$1(value) {
		return array$1(value) && value.every((elem) => string$1(elem));
	}
	exports.stringArray = stringArray$1;
}));
var require_messages$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
	const is = require_is$1();
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
		function create(func$2) {
			return { dispose: func$2 };
		}
		Disposable$1.create = create;
	})(Disposable || (exports.Disposable = Disposable = {}));
}));
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
var require_events = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Emitter = exports.Event = void 0;
	const ral_1$6 = require_ral();
	var Event;
	(function(Event$1) {
		const _disposable = { dispose() {} };
		Event$1.None = function() {
			return _disposable;
		};
	})(Event || (exports.Event = Event = {}));
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
var require_cancellation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CancellationTokenSource = exports.CancellationToken = void 0;
	const ral_1$5 = require_ral();
	const Is$7 = require_is$1();
	const events_1$4 = require_events();
	var CancellationToken;
	(function(CancellationToken$1) {
		CancellationToken$1.None = Object.freeze({
			isCancellationRequested: false,
			onCancellationRequested: events_1$4.Event.None
		});
		CancellationToken$1.Cancelled = Object.freeze({
			isCancellationRequested: true,
			onCancellationRequested: events_1$4.Event.None
		});
		function is$1(value) {
			const candidate = value;
			return candidate && (candidate === CancellationToken$1.None || candidate === CancellationToken$1.Cancelled || Is$7.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
		}
		CancellationToken$1.is = is$1;
	})(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
	const shortcutEvent = Object.freeze(function(callback, context) {
		const handle = (0, ral_1$5.default)().timer.setTimeout(callback.bind(context), 0);
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
			if (!this._emitter) this._emitter = new events_1$4.Emitter();
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
var require_semaphore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Semaphore = void 0;
	const ral_1$4 = require_ral();
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
			(0, ral_1$4.default)().timer.setImmediate(() => this.doRunNext());
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
	const ral_1$3 = require_ral();
	const Is$6 = require_is$1();
	const events_1$3 = require_events();
	const semaphore_1$1 = require_semaphore();
	var MessageReader;
	(function(MessageReader$1) {
		function is$1(value) {
			let candidate = value;
			return candidate && Is$6.func(candidate.listen) && Is$6.func(candidate.dispose) && Is$6.func(candidate.onError) && Is$6.func(candidate.onClose) && Is$6.func(candidate.onPartialMessage);
		}
		MessageReader$1.is = is$1;
	})(MessageReader || (exports.MessageReader = MessageReader = {}));
	var AbstractMessageReader = class {
		constructor() {
			this.errorEmitter = new events_1$3.Emitter();
			this.closeEmitter = new events_1$3.Emitter();
			this.partialMessageEmitter = new events_1$3.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error$2) {
			this.errorEmitter.fire(this.asError(error$2));
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
		asError(error$2) {
			if (error$2 instanceof Error) return error$2;
			else return /* @__PURE__ */ new Error(`Reader received error. Reason: ${Is$6.string(error$2.message) ? error$2.message : "unknown"}`);
		}
	};
	exports.AbstractMessageReader = AbstractMessageReader;
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
				contentTypeDecoder = (0, ral_1$3.default)().applicationJson.decoder;
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
	var ReadableStreamMessageReader = class extends AbstractMessageReader {
		constructor(readable, options) {
			super();
			this.readable = readable;
			this.options = ResolvedMessageReaderOptions.fromOptions(options);
			this.buffer = (0, ral_1$3.default)().messageBuffer.create(this.options.charset);
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
			this.readable.onError((error$2) => this.fireError(error$2));
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
					}).catch((error$2) => {
						this.fireError(error$2);
					});
				}
			} catch (error$2) {
				this.fireError(error$2);
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
			this.partialMessageTimer = (0, ral_1$3.default)().timer.setTimeout((token, timeout) => {
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
var require_messageWriter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
	const ral_1$2 = require_ral();
	const Is$5 = require_is$1();
	const semaphore_1 = require_semaphore();
	const events_1$2 = require_events();
	const ContentLength = "Content-Length: ";
	const CRLF$1 = "\r\n";
	var MessageWriter;
	(function(MessageWriter$1) {
		function is$1(value) {
			let candidate = value;
			return candidate && Is$5.func(candidate.dispose) && Is$5.func(candidate.onClose) && Is$5.func(candidate.onError) && Is$5.func(candidate.write);
		}
		MessageWriter$1.is = is$1;
	})(MessageWriter || (exports.MessageWriter = MessageWriter = {}));
	var AbstractMessageWriter = class {
		constructor() {
			this.errorEmitter = new events_1$2.Emitter();
			this.closeEmitter = new events_1$2.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error$2, message, count) {
			this.errorEmitter.fire([
				this.asError(error$2),
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
		asError(error$2) {
			if (error$2 instanceof Error) return error$2;
			else return /* @__PURE__ */ new Error(`Writer received error. Reason: ${Is$5.string(error$2.message) ? error$2.message : "unknown"}`);
		}
	};
	exports.AbstractMessageWriter = AbstractMessageWriter;
	var ResolvedMessageWriterOptions;
	(function(ResolvedMessageWriterOptions$1) {
		function fromOptions(options) {
			if (options === void 0 || typeof options === "string") return {
				charset: options ?? "utf-8",
				contentTypeEncoder: (0, ral_1$2.default)().applicationJson.encoder
			};
			else return {
				charset: options.charset ?? "utf-8",
				contentEncoder: options.contentEncoder,
				contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1$2.default)().applicationJson.encoder
			};
		}
		ResolvedMessageWriterOptions$1.fromOptions = fromOptions;
	})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
	var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
		constructor(writable, options) {
			super();
			this.writable = writable;
			this.options = ResolvedMessageWriterOptions.fromOptions(options);
			this.errorCount = 0;
			this.writeSemaphore = new semaphore_1.Semaphore(1);
			this.writable.onError((error$2) => this.fireError(error$2));
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
				}, (error$2) => {
					this.fireError(error$2);
					throw error$2;
				});
			});
		}
		async doWrite(msg, headers, data) {
			try {
				await this.writable.write(headers.join(""), "ascii");
				return this.writable.write(data);
			} catch (error$2) {
				this.handleError(error$2, msg);
				return Promise.reject(error$2);
			}
		}
		handleError(error$2, msg) {
			this.errorCount++;
			this.fireError(error$2, msg, this.errorCount);
		}
		end() {
			this.writable.end();
		}
	};
	exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
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
var require_connection$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessageConnection = exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
	const ral_1$1 = require_ral();
	const Is$4 = require_is$1();
	const messages_1$23 = require_messages$1();
	const linkedMap_1$1 = require_linkedMap();
	const events_1$1 = require_events();
	const cancellation_1$1 = require_cancellation();
	var CancelNotification;
	(function(CancelNotification$1) {
		CancelNotification$1.type = new messages_1$23.NotificationType("$/cancelRequest");
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
		ProgressNotification$1.type = new messages_1$23.NotificationType("$/progress");
	})(ProgressNotification || (ProgressNotification = {}));
	var ProgressType = class {
		constructor() {}
	};
	exports.ProgressType = ProgressType;
	var StarRequestHandler;
	(function(StarRequestHandler$1) {
		function is$1(value) {
			return Is$4.func(value);
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
			if (!Is$4.string(value)) return Trace$1.Off;
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
			if (!Is$4.string(value)) return TraceFormat$1.Text;
			value = value.toLowerCase();
			if (value === "json") return TraceFormat$1.JSON;
			else return TraceFormat$1.Text;
		}
		TraceFormat$1.fromString = fromString;
	})(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
	var SetTraceNotification;
	(function(SetTraceNotification$1) {
		SetTraceNotification$1.type = new messages_1$23.NotificationType("$/setTrace");
	})(SetTraceNotification || (exports.SetTraceNotification = SetTraceNotification = {}));
	var LogTraceNotification;
	(function(LogTraceNotification$1) {
		LogTraceNotification$1.type = new messages_1$23.NotificationType("$/logTrace");
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
			return candidate && Is$4.func(candidate.cancelUndispatched);
		}
		ConnectionStrategy$1.is = is$1;
	})(ConnectionStrategy || (exports.ConnectionStrategy = ConnectionStrategy = {}));
	var IdCancellationReceiverStrategy;
	(function(IdCancellationReceiverStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is$4.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is$4.func(candidate.dispose));
		}
		IdCancellationReceiverStrategy$1.is = is$1;
	})(IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
	var RequestCancellationReceiverStrategy;
	(function(RequestCancellationReceiverStrategy$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && candidate.kind === "request" && Is$4.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is$4.func(candidate.dispose));
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
			sendCancellation(conn$1, id) {
				return conn$1.sendNotification(CancelNotification.type, { id });
			},
			cleanup(_) {}
		});
		function is$1(value) {
			const candidate = value;
			return candidate && Is$4.func(candidate.sendCancellation) && Is$4.func(candidate.cleanup);
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
			return candidate && Is$4.func(candidate.handleMessage);
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
	function createMessageConnection$1(messageReader, messageWriter, _logger, options) {
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
			if (messages_1$23.Message.isRequest(message)) queue.set(createRequestQueueKey(message.id), message);
			else if (messages_1$23.Message.isResponse(message)) queue.set(createResponseQueueKey(message.id), message);
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
		function readErrorHandler(error$2) {
			errorEmitter.fire([
				error$2,
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
			if (messages_1$23.Message.isRequest(message)) handleRequest(message);
			else if (messages_1$23.Message.isNotification(message)) handleNotification(message);
			else if (messages_1$23.Message.isResponse(message)) handleResponse(message);
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
				if (messages_1$23.Message.isNotification(message) && message.method === CancelNotification.type.method) {
					const cancelId = message.params.id;
					const key = createRequestQueueKey(cancelId);
					const toCancel = messageQueue.get(key);
					if (messages_1$23.Message.isRequest(toCancel)) {
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
				if (resultOrError instanceof messages_1$23.ResponseError) message.error = resultOrError.toJson();
				else message.result = resultOrError === void 0 ? null : resultOrError;
				traceSendingResponse(message, method, startTime$1);
				messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
			}
			function replyError(error$2, method, startTime$1) {
				const message = {
					jsonrpc: version,
					id: requestMessage.id,
					error: error$2.toJson()
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
							replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
							return;
						}
						handlerResult = requestHandler(cancellationSource.token);
					} else if (Array.isArray(requestMessage.params)) {
						if (type !== void 0 && type.parameterStructures === messages_1$23.ParameterStructures.byName) {
							replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
							return;
						}
						handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
					} else {
						if (type !== void 0 && type.parameterStructures === messages_1$23.ParameterStructures.byPosition) {
							replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
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
					}, (error$2) => {
						requestTokens.delete(tokenKey);
						if (error$2 instanceof messages_1$23.ResponseError) replyError(error$2, requestMessage.method, startTime);
						else if (error$2 && Is$4.string(error$2.message)) replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error$2.message}`), requestMessage.method, startTime);
						else replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
					});
					else {
						requestTokens.delete(tokenKey);
						reply(handlerResult, requestMessage.method, startTime);
					}
				} catch (error$2) {
					requestTokens.delete(tokenKey);
					if (error$2 instanceof messages_1$23.ResponseError) reply(error$2, requestMessage.method, startTime);
					else if (error$2 && Is$4.string(error$2.message)) replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error$2.message}`), requestMessage.method, startTime);
					else replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
				}
			} else replyError(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
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
							const error$2 = responseMessage.error;
							responsePromise.reject(new messages_1$23.ResponseError(error$2.code, error$2.message, error$2.data));
						} else if (responseMessage.result !== void 0) responsePromise.resolve(responseMessage.result);
						else throw new Error("Should never happen.");
					} catch (error$2) {
						if (error$2.message) logger.error(`Response handler '${responsePromise.method}' failed with message: ${error$2.message}`);
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
						if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1$23.ParameterStructures.byName) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
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
							if (type.parameterStructures === messages_1$23.ParameterStructures.byName) logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
							if (type.numberOfParams !== message.params.length) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
						}
						notificationHandler(...params);
					}
				} else {
					if (type !== void 0 && type.parameterStructures === messages_1$23.ParameterStructures.byPosition) logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
					notificationHandler(message.params);
				}
				else if (starNotificationHandler) starNotificationHandler(message.method, message.params);
			} catch (error$2) {
				if (error$2.message) logger.error(`Notification handler '${message.method}' failed with message: ${error$2.message}`);
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
			if (Is$4.string(responseMessage.id) || Is$4.number(responseMessage.id)) {
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
					const error$2 = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
					tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error$2}`, data);
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
				case messages_1$23.ParameterStructures.auto: if (isNamedParam(param)) return nullToUndefined(param);
				else return [undefinedToNull(param)];
				case messages_1$23.ParameterStructures.byName:
					if (!isNamedParam(param)) throw new Error(`Received parameters by name but param is not an object literal.`);
					return nullToUndefined(param);
				case messages_1$23.ParameterStructures.byPosition: return [undefinedToNull(param)];
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
				if (Is$4.string(type)) {
					method = type;
					const first = args[0];
					let paramStart = 0;
					let parameterStructures = messages_1$23.ParameterStructures.auto;
					if (messages_1$23.ParameterStructures.is(first)) {
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
							if (parameterStructures === messages_1$23.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
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
				return messageWriter.write(notificationMessage).catch((error$2) => {
					logger.error(`Sending notification failed.`);
					throw error$2;
				});
			},
			onNotification: (type, handler) => {
				throwIfClosedOrDisposed();
				let method;
				if (Is$4.func(type)) starNotificationHandler = type;
				else if (handler) if (Is$4.string(type)) {
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
				if (Is$4.string(type)) {
					method = type;
					const first = args[0];
					const last = args[args.length - 1];
					let paramStart = 0;
					let parameterStructures = messages_1$23.ParameterStructures.auto;
					if (messages_1$23.ParameterStructures.is(first)) {
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
							if (parameterStructures === messages_1$23.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
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
						await messageWriter.write(requestMessage);
						responsePromises.set(id, responsePromise);
					} catch (error$2) {
						logger.error(`Sending request failed.`);
						responsePromise.reject(new messages_1$23.ResponseError(messages_1$23.ErrorCodes.MessageWriteError, error$2.message ? error$2.message : "Unknown reason"));
						throw error$2;
					}
				});
			},
			onRequest: (type, handler) => {
				throwIfClosedOrDisposed();
				let method = null;
				if (StarRequestHandler.is(type)) {
					method = void 0;
					starRequestHandler = type;
				} else if (Is$4.string(type)) {
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
				if (sendNotificationOrTraceOptions !== void 0) if (Is$4.boolean(sendNotificationOrTraceOptions)) _sendNotification = sendNotificationOrTraceOptions;
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
				const error$2 = new messages_1$23.ResponseError(messages_1$23.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
				for (const promise of responsePromises.values()) promise.reject(error$2);
				responsePromises = /* @__PURE__ */ new Map();
				requestTokens = /* @__PURE__ */ new Map();
				knownCanceledRequests = /* @__PURE__ */ new Set();
				messageQueue = new linkedMap_1$1.LinkedMap();
				if (Is$4.func(messageWriter.dispose)) messageWriter.dispose();
				if (Is$4.func(messageReader.dispose)) messageReader.dispose();
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
	exports.createMessageConnection = createMessageConnection$1;
}));
var require_api$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
	exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = void 0;
	const messages_1$22 = require_messages$1();
	Object.defineProperty(exports, "Message", {
		enumerable: true,
		get: function() {
			return messages_1$22.Message;
		}
	});
	Object.defineProperty(exports, "RequestType", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType;
		}
	});
	Object.defineProperty(exports, "RequestType0", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType0;
		}
	});
	Object.defineProperty(exports, "RequestType1", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType1;
		}
	});
	Object.defineProperty(exports, "RequestType2", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType2;
		}
	});
	Object.defineProperty(exports, "RequestType3", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType3;
		}
	});
	Object.defineProperty(exports, "RequestType4", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType4;
		}
	});
	Object.defineProperty(exports, "RequestType5", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType5;
		}
	});
	Object.defineProperty(exports, "RequestType6", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType6;
		}
	});
	Object.defineProperty(exports, "RequestType7", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType7;
		}
	});
	Object.defineProperty(exports, "RequestType8", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType8;
		}
	});
	Object.defineProperty(exports, "RequestType9", {
		enumerable: true,
		get: function() {
			return messages_1$22.RequestType9;
		}
	});
	Object.defineProperty(exports, "ResponseError", {
		enumerable: true,
		get: function() {
			return messages_1$22.ResponseError;
		}
	});
	Object.defineProperty(exports, "ErrorCodes", {
		enumerable: true,
		get: function() {
			return messages_1$22.ErrorCodes;
		}
	});
	Object.defineProperty(exports, "NotificationType", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType;
		}
	});
	Object.defineProperty(exports, "NotificationType0", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType0;
		}
	});
	Object.defineProperty(exports, "NotificationType1", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType1;
		}
	});
	Object.defineProperty(exports, "NotificationType2", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType2;
		}
	});
	Object.defineProperty(exports, "NotificationType3", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType3;
		}
	});
	Object.defineProperty(exports, "NotificationType4", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType4;
		}
	});
	Object.defineProperty(exports, "NotificationType5", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType5;
		}
	});
	Object.defineProperty(exports, "NotificationType6", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType6;
		}
	});
	Object.defineProperty(exports, "NotificationType7", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType7;
		}
	});
	Object.defineProperty(exports, "NotificationType8", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType8;
		}
	});
	Object.defineProperty(exports, "NotificationType9", {
		enumerable: true,
		get: function() {
			return messages_1$22.NotificationType9;
		}
	});
	Object.defineProperty(exports, "ParameterStructures", {
		enumerable: true,
		get: function() {
			return messages_1$22.ParameterStructures;
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
	const connection_1$1 = require_connection$1();
	Object.defineProperty(exports, "ConnectionStrategy", {
		enumerable: true,
		get: function() {
			return connection_1$1.ConnectionStrategy;
		}
	});
	Object.defineProperty(exports, "ConnectionOptions", {
		enumerable: true,
		get: function() {
			return connection_1$1.ConnectionOptions;
		}
	});
	Object.defineProperty(exports, "NullLogger", {
		enumerable: true,
		get: function() {
			return connection_1$1.NullLogger;
		}
	});
	Object.defineProperty(exports, "createMessageConnection", {
		enumerable: true,
		get: function() {
			return connection_1$1.createMessageConnection;
		}
	});
	Object.defineProperty(exports, "ProgressToken", {
		enumerable: true,
		get: function() {
			return connection_1$1.ProgressToken;
		}
	});
	Object.defineProperty(exports, "ProgressType", {
		enumerable: true,
		get: function() {
			return connection_1$1.ProgressType;
		}
	});
	Object.defineProperty(exports, "Trace", {
		enumerable: true,
		get: function() {
			return connection_1$1.Trace;
		}
	});
	Object.defineProperty(exports, "TraceValues", {
		enumerable: true,
		get: function() {
			return connection_1$1.TraceValues;
		}
	});
	Object.defineProperty(exports, "TraceFormat", {
		enumerable: true,
		get: function() {
			return connection_1$1.TraceFormat;
		}
	});
	Object.defineProperty(exports, "SetTraceNotification", {
		enumerable: true,
		get: function() {
			return connection_1$1.SetTraceNotification;
		}
	});
	Object.defineProperty(exports, "LogTraceNotification", {
		enumerable: true,
		get: function() {
			return connection_1$1.LogTraceNotification;
		}
	});
	Object.defineProperty(exports, "ConnectionErrors", {
		enumerable: true,
		get: function() {
			return connection_1$1.ConnectionErrors;
		}
	});
	Object.defineProperty(exports, "ConnectionError", {
		enumerable: true,
		get: function() {
			return connection_1$1.ConnectionError;
		}
	});
	Object.defineProperty(exports, "CancellationReceiverStrategy", {
		enumerable: true,
		get: function() {
			return connection_1$1.CancellationReceiverStrategy;
		}
	});
	Object.defineProperty(exports, "CancellationSenderStrategy", {
		enumerable: true,
		get: function() {
			return connection_1$1.CancellationSenderStrategy;
		}
	});
	Object.defineProperty(exports, "CancellationStrategy", {
		enumerable: true,
		get: function() {
			return connection_1$1.CancellationStrategy;
		}
	});
	Object.defineProperty(exports, "MessageStrategy", {
		enumerable: true,
		get: function() {
			return connection_1$1.MessageStrategy;
		}
	});
	exports.RAL = require_ral().default;
}));
var require_ril = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const api_1$1 = require_api$1();
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
var require_main$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$2 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
	var __exportStar$2 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$2(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessageConnection = exports.BrowserMessageWriter = exports.BrowserMessageReader = void 0;
	require_ril().default.install();
	const api_1 = require_api$1();
	__exportStar$2(require_api$1(), exports);
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
			} catch (error$2) {
				this.handleError(error$2, msg);
				return Promise.reject(error$2);
			}
		}
		handleError(error$2, msg) {
			this.errorCount++;
			this.fireError(error$2, msg, this.errorCount);
		}
		end() {}
	};
	exports.BrowserMessageWriter = BrowserMessageWriter$1;
	function createMessageConnection(reader, writer, logger, options) {
		if (logger === void 0) logger = api_1.NullLogger;
		if (api_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
		return (0, api_1.createMessageConnection)(reader, writer, logger, options);
	}
	exports.createMessageConnection = createMessageConnection;
}));
var require_browser$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_main$1();
}));
var main_exports$1 = /* @__PURE__ */ __export({
	AnnotatedTextEdit: () => AnnotatedTextEdit,
	ChangeAnnotation: () => ChangeAnnotation,
	ChangeAnnotationIdentifier: () => ChangeAnnotationIdentifier,
	CodeAction: () => CodeAction,
	CodeActionContext: () => CodeActionContext,
	CodeActionKind: () => CodeActionKind,
	CodeActionTriggerKind: () => CodeActionTriggerKind,
	CodeDescription: () => CodeDescription,
	CodeLens: () => CodeLens,
	Color: () => Color,
	ColorInformation: () => ColorInformation,
	ColorPresentation: () => ColorPresentation,
	Command: () => Command,
	CompletionItem: () => CompletionItem,
	CompletionItemKind: () => CompletionItemKind$2,
	CompletionItemLabelDetails: () => CompletionItemLabelDetails,
	CompletionItemTag: () => CompletionItemTag,
	CompletionList: () => CompletionList,
	CreateFile: () => CreateFile,
	DeleteFile: () => DeleteFile,
	Diagnostic: () => Diagnostic,
	DiagnosticRelatedInformation: () => DiagnosticRelatedInformation,
	DiagnosticSeverity: () => DiagnosticSeverity$1,
	DiagnosticTag: () => DiagnosticTag,
	DocumentHighlight: () => DocumentHighlight,
	DocumentHighlightKind: () => DocumentHighlightKind,
	DocumentLink: () => DocumentLink,
	DocumentSymbol: () => DocumentSymbol,
	DocumentUri: () => DocumentUri,
	EOL: () => EOL,
	FoldingRange: () => FoldingRange,
	FoldingRangeKind: () => FoldingRangeKind,
	FormattingOptions: () => FormattingOptions,
	Hover: () => Hover,
	InlayHint: () => InlayHint,
	InlayHintKind: () => InlayHintKind,
	InlayHintLabelPart: () => InlayHintLabelPart,
	InlineCompletionContext: () => InlineCompletionContext,
	InlineCompletionItem: () => InlineCompletionItem,
	InlineCompletionList: () => InlineCompletionList,
	InlineCompletionTriggerKind: () => InlineCompletionTriggerKind,
	InlineValueContext: () => InlineValueContext,
	InlineValueEvaluatableExpression: () => InlineValueEvaluatableExpression,
	InlineValueText: () => InlineValueText,
	InlineValueVariableLookup: () => InlineValueVariableLookup,
	InsertReplaceEdit: () => InsertReplaceEdit,
	InsertTextFormat: () => InsertTextFormat$1,
	InsertTextMode: () => InsertTextMode,
	Location: () => Location,
	LocationLink: () => LocationLink,
	MarkedString: () => MarkedString$1,
	MarkupContent: () => MarkupContent$1,
	MarkupKind: () => MarkupKind,
	OptionalVersionedTextDocumentIdentifier: () => OptionalVersionedTextDocumentIdentifier,
	ParameterInformation: () => ParameterInformation,
	Position: () => Position,
	Range: () => Range,
	RenameFile: () => RenameFile,
	SelectedCompletionInfo: () => SelectedCompletionInfo,
	SelectionRange: () => SelectionRange,
	SemanticTokenModifiers: () => SemanticTokenModifiers,
	SemanticTokenTypes: () => SemanticTokenTypes,
	SemanticTokens: () => SemanticTokens,
	SignatureInformation: () => SignatureInformation,
	StringValue: () => StringValue,
	SymbolInformation: () => SymbolInformation,
	SymbolKind: () => SymbolKind,
	SymbolTag: () => SymbolTag,
	TextDocument: () => TextDocument$1,
	TextDocumentEdit: () => TextDocumentEdit,
	TextDocumentIdentifier: () => TextDocumentIdentifier,
	TextDocumentItem: () => TextDocumentItem,
	TextEdit: () => TextEdit,
	URI: () => URI$1,
	VersionedTextDocumentIdentifier: () => VersionedTextDocumentIdentifier,
	WorkspaceChange: () => WorkspaceChange,
	WorkspaceEdit: () => WorkspaceEdit,
	WorkspaceFolder: () => WorkspaceFolder,
	WorkspaceSymbol: () => WorkspaceSymbol,
	integer: () => integer,
	uinteger: () => uinteger
});
var DocumentUri, URI$1, integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity$1, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextEditChangeImpl, ChangeAnnotations, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent$1, CompletionItemKind$2, InsertTextFormat$1, CompletionItemTag, InsertReplaceEdit, InsertTextMode, CompletionItemLabelDetails, CompletionItem, CompletionList, MarkedString$1, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, WorkspaceSymbol, DocumentSymbol, CodeActionKind, CodeActionTriggerKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens, InlineValueText, InlineValueVariableLookup, InlineValueEvaluatableExpression, InlineValueContext, InlayHintKind, InlayHintLabelPart, InlayHint, StringValue, InlineCompletionItem, InlineCompletionList, InlineCompletionTriggerKind, SelectedCompletionInfo, InlineCompletionContext, WorkspaceFolder, EOL, TextDocument$1, FullTextDocument$1, Is$3;
var init_main = __esmMin((() => {
	(function(DocumentUri$1) {
		function is$1(value) {
			return typeof value === "string";
		}
		DocumentUri$1.is = is$1;
	})(DocumentUri || (DocumentUri = {}));
	(function(URI$2) {
		function is$1(value) {
			return typeof value === "string";
		}
		URI$2.is = is$1;
	})(URI$1 || (URI$1 = {}));
	(function(integer$1) {
		integer$1.MIN_VALUE = -2147483648;
		integer$1.MAX_VALUE = 2147483647;
		function is$1(value) {
			return typeof value === "number" && integer$1.MIN_VALUE <= value && value <= integer$1.MAX_VALUE;
		}
		integer$1.is = is$1;
	})(integer || (integer = {}));
	(function(uinteger$1) {
		uinteger$1.MIN_VALUE = 0;
		uinteger$1.MAX_VALUE = 2147483647;
		function is$1(value) {
			return typeof value === "number" && uinteger$1.MIN_VALUE <= value && value <= uinteger$1.MAX_VALUE;
		}
		uinteger$1.is = is$1;
	})(uinteger || (uinteger = {}));
	(function(Position$1) {
		function create(line, character) {
			if (line === Number.MAX_VALUE) line = uinteger.MAX_VALUE;
			if (character === Number.MAX_VALUE) character = uinteger.MAX_VALUE;
			return {
				line,
				character
			};
		}
		Position$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.uinteger(candidate.line) && Is$3.uinteger(candidate.character);
		}
		Position$1.is = is$1;
	})(Position || (Position = {}));
	(function(Range$1) {
		function create(one, two, three, four) {
			if (Is$3.uinteger(one) && Is$3.uinteger(two) && Is$3.uinteger(three) && Is$3.uinteger(four)) return {
				start: Position.create(one, two),
				end: Position.create(three, four)
			};
			else if (Position.is(one) && Position.is(two)) return {
				start: one,
				end: two
			};
			else throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
		}
		Range$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
		}
		Range$1.is = is$1;
	})(Range || (Range = {}));
	(function(Location$1) {
		function create(uri, range) {
			return {
				uri,
				range
			};
		}
		Location$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.objectLiteral(candidate) && Range.is(candidate.range) && (Is$3.string(candidate.uri) || Is$3.undefined(candidate.uri));
		}
		Location$1.is = is$1;
	})(Location || (Location = {}));
	(function(LocationLink$1) {
		function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
			return {
				targetUri,
				targetRange,
				targetSelectionRange,
				originSelectionRange
			};
		}
		LocationLink$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is$3.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is$3.undefined(candidate.originSelectionRange));
		}
		LocationLink$1.is = is$1;
	})(LocationLink || (LocationLink = {}));
	(function(Color$1) {
		function create(red, green, blue, alpha) {
			return {
				red,
				green,
				blue,
				alpha
			};
		}
		Color$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.numberRange(candidate.red, 0, 1) && Is$3.numberRange(candidate.green, 0, 1) && Is$3.numberRange(candidate.blue, 0, 1) && Is$3.numberRange(candidate.alpha, 0, 1);
		}
		Color$1.is = is$1;
	})(Color || (Color = {}));
	(function(ColorInformation$1) {
		function create(range, color) {
			return {
				range,
				color
			};
		}
		ColorInformation$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
		}
		ColorInformation$1.is = is$1;
	})(ColorInformation || (ColorInformation = {}));
	(function(ColorPresentation$1) {
		function create(label, textEdit, additionalTextEdits) {
			return {
				label,
				textEdit,
				additionalTextEdits
			};
		}
		ColorPresentation$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.string(candidate.label) && (Is$3.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is$3.undefined(candidate.additionalTextEdits) || Is$3.typedArray(candidate.additionalTextEdits, TextEdit.is));
		}
		ColorPresentation$1.is = is$1;
	})(ColorPresentation || (ColorPresentation = {}));
	(function(FoldingRangeKind$1) {
		FoldingRangeKind$1.Comment = "comment";
		FoldingRangeKind$1.Imports = "imports";
		FoldingRangeKind$1.Region = "region";
	})(FoldingRangeKind || (FoldingRangeKind = {}));
	(function(FoldingRange$1) {
		function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
			const result = {
				startLine,
				endLine
			};
			if (Is$3.defined(startCharacter)) result.startCharacter = startCharacter;
			if (Is$3.defined(endCharacter)) result.endCharacter = endCharacter;
			if (Is$3.defined(kind)) result.kind = kind;
			if (Is$3.defined(collapsedText)) result.collapsedText = collapsedText;
			return result;
		}
		FoldingRange$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.uinteger(candidate.startLine) && Is$3.uinteger(candidate.startLine) && (Is$3.undefined(candidate.startCharacter) || Is$3.uinteger(candidate.startCharacter)) && (Is$3.undefined(candidate.endCharacter) || Is$3.uinteger(candidate.endCharacter)) && (Is$3.undefined(candidate.kind) || Is$3.string(candidate.kind));
		}
		FoldingRange$1.is = is$1;
	})(FoldingRange || (FoldingRange = {}));
	(function(DiagnosticRelatedInformation$1) {
		function create(location, message) {
			return {
				location,
				message
			};
		}
		DiagnosticRelatedInformation$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Location.is(candidate.location) && Is$3.string(candidate.message);
		}
		DiagnosticRelatedInformation$1.is = is$1;
	})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
	(function(DiagnosticSeverity$2) {
		DiagnosticSeverity$2.Error = 1;
		DiagnosticSeverity$2.Warning = 2;
		DiagnosticSeverity$2.Information = 3;
		DiagnosticSeverity$2.Hint = 4;
	})(DiagnosticSeverity$1 || (DiagnosticSeverity$1 = {}));
	(function(DiagnosticTag$1) {
		DiagnosticTag$1.Unnecessary = 1;
		DiagnosticTag$1.Deprecated = 2;
	})(DiagnosticTag || (DiagnosticTag = {}));
	(function(CodeDescription$1) {
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.string(candidate.href);
		}
		CodeDescription$1.is = is$1;
	})(CodeDescription || (CodeDescription = {}));
	(function(Diagnostic$1) {
		function create(range, message, severity, code, source, relatedInformation) {
			let result = {
				range,
				message
			};
			if (Is$3.defined(severity)) result.severity = severity;
			if (Is$3.defined(code)) result.code = code;
			if (Is$3.defined(source)) result.source = source;
			if (Is$3.defined(relatedInformation)) result.relatedInformation = relatedInformation;
			return result;
		}
		Diagnostic$1.create = create;
		function is$1(value) {
			var _a$1;
			let candidate = value;
			return Is$3.defined(candidate) && Range.is(candidate.range) && Is$3.string(candidate.message) && (Is$3.number(candidate.severity) || Is$3.undefined(candidate.severity)) && (Is$3.integer(candidate.code) || Is$3.string(candidate.code) || Is$3.undefined(candidate.code)) && (Is$3.undefined(candidate.codeDescription) || Is$3.string((_a$1 = candidate.codeDescription) === null || _a$1 === void 0 ? void 0 : _a$1.href)) && (Is$3.string(candidate.source) || Is$3.undefined(candidate.source)) && (Is$3.undefined(candidate.relatedInformation) || Is$3.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
		}
		Diagnostic$1.is = is$1;
	})(Diagnostic || (Diagnostic = {}));
	(function(Command$1) {
		function create(title, command, ...args) {
			let result = {
				title,
				command
			};
			if (Is$3.defined(args) && args.length > 0) result.arguments = args;
			return result;
		}
		Command$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.title) && Is$3.string(candidate.command);
		}
		Command$1.is = is$1;
	})(Command || (Command = {}));
	(function(TextEdit$1) {
		function replace(range, newText) {
			return {
				range,
				newText
			};
		}
		TextEdit$1.replace = replace;
		function insert(position, newText) {
			return {
				range: {
					start: position,
					end: position
				},
				newText
			};
		}
		TextEdit$1.insert = insert;
		function del(range) {
			return {
				range,
				newText: ""
			};
		}
		TextEdit$1.del = del;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.string(candidate.newText) && Range.is(candidate.range);
		}
		TextEdit$1.is = is$1;
	})(TextEdit || (TextEdit = {}));
	(function(ChangeAnnotation$1) {
		function create(label, needsConfirmation, description) {
			const result = { label };
			if (needsConfirmation !== void 0) result.needsConfirmation = needsConfirmation;
			if (description !== void 0) result.description = description;
			return result;
		}
		ChangeAnnotation$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Is$3.string(candidate.label) && (Is$3.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is$3.string(candidate.description) || candidate.description === void 0);
		}
		ChangeAnnotation$1.is = is$1;
	})(ChangeAnnotation || (ChangeAnnotation = {}));
	(function(ChangeAnnotationIdentifier$1) {
		function is$1(value) {
			const candidate = value;
			return Is$3.string(candidate);
		}
		ChangeAnnotationIdentifier$1.is = is$1;
	})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
	(function(AnnotatedTextEdit$1) {
		function replace(range, newText, annotation) {
			return {
				range,
				newText,
				annotationId: annotation
			};
		}
		AnnotatedTextEdit$1.replace = replace;
		function insert(position, newText, annotation) {
			return {
				range: {
					start: position,
					end: position
				},
				newText,
				annotationId: annotation
			};
		}
		AnnotatedTextEdit$1.insert = insert;
		function del(range, annotation) {
			return {
				range,
				newText: "",
				annotationId: annotation
			};
		}
		AnnotatedTextEdit$1.del = del;
		function is$1(value) {
			const candidate = value;
			return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		AnnotatedTextEdit$1.is = is$1;
	})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
	(function(TextDocumentEdit$1) {
		function create(textDocument, edits) {
			return {
				textDocument,
				edits
			};
		}
		TextDocumentEdit$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
		}
		TextDocumentEdit$1.is = is$1;
	})(TextDocumentEdit || (TextDocumentEdit = {}));
	(function(CreateFile$1) {
		function create(uri, options, annotation) {
			let result = {
				kind: "create",
				uri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		CreateFile$1.create = create;
		function is$1(value) {
			let candidate = value;
			return candidate && candidate.kind === "create" && Is$3.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is$3.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is$3.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		CreateFile$1.is = is$1;
	})(CreateFile || (CreateFile = {}));
	(function(RenameFile$1) {
		function create(oldUri, newUri, options, annotation) {
			let result = {
				kind: "rename",
				oldUri,
				newUri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		RenameFile$1.create = create;
		function is$1(value) {
			let candidate = value;
			return candidate && candidate.kind === "rename" && Is$3.string(candidate.oldUri) && Is$3.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is$3.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is$3.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		RenameFile$1.is = is$1;
	})(RenameFile || (RenameFile = {}));
	(function(DeleteFile$1) {
		function create(uri, options, annotation) {
			let result = {
				kind: "delete",
				uri
			};
			if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		DeleteFile$1.create = create;
		function is$1(value) {
			let candidate = value;
			return candidate && candidate.kind === "delete" && Is$3.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is$3.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is$3.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		DeleteFile$1.is = is$1;
	})(DeleteFile || (DeleteFile = {}));
	(function(WorkspaceEdit$1) {
		function is$1(value) {
			let candidate = value;
			return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
				if (Is$3.string(change.kind)) return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
				else return TextDocumentEdit.is(change);
			}));
		}
		WorkspaceEdit$1.is = is$1;
	})(WorkspaceEdit || (WorkspaceEdit = {}));
	TextEditChangeImpl = class {
		constructor(edits, changeAnnotations) {
			this.edits = edits;
			this.changeAnnotations = changeAnnotations;
		}
		insert(position, newText, annotation) {
			let edit;
			let id;
			if (annotation === void 0) edit = TextEdit.insert(position, newText);
			else if (ChangeAnnotationIdentifier.is(annotation)) {
				id = annotation;
				edit = AnnotatedTextEdit.insert(position, newText, annotation);
			} else {
				this.assertChangeAnnotations(this.changeAnnotations);
				id = this.changeAnnotations.manage(annotation);
				edit = AnnotatedTextEdit.insert(position, newText, id);
			}
			this.edits.push(edit);
			if (id !== void 0) return id;
		}
		replace(range, newText, annotation) {
			let edit;
			let id;
			if (annotation === void 0) edit = TextEdit.replace(range, newText);
			else if (ChangeAnnotationIdentifier.is(annotation)) {
				id = annotation;
				edit = AnnotatedTextEdit.replace(range, newText, annotation);
			} else {
				this.assertChangeAnnotations(this.changeAnnotations);
				id = this.changeAnnotations.manage(annotation);
				edit = AnnotatedTextEdit.replace(range, newText, id);
			}
			this.edits.push(edit);
			if (id !== void 0) return id;
		}
		delete(range, annotation) {
			let edit;
			let id;
			if (annotation === void 0) edit = TextEdit.del(range);
			else if (ChangeAnnotationIdentifier.is(annotation)) {
				id = annotation;
				edit = AnnotatedTextEdit.del(range, annotation);
			} else {
				this.assertChangeAnnotations(this.changeAnnotations);
				id = this.changeAnnotations.manage(annotation);
				edit = AnnotatedTextEdit.del(range, id);
			}
			this.edits.push(edit);
			if (id !== void 0) return id;
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
			if (value === void 0) throw new Error(`Text edit change is not configured to manage change annotations.`);
		}
	};
	ChangeAnnotations = class {
		constructor(annotations) {
			this._annotations = annotations === void 0 ? Object.create(null) : annotations;
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
			if (ChangeAnnotationIdentifier.is(idOrAnnotation)) id = idOrAnnotation;
			else {
				id = this.nextId();
				annotation = idOrAnnotation;
			}
			if (this._annotations[id] !== void 0) throw new Error(`Id ${id} is already in use.`);
			if (annotation === void 0) throw new Error(`No annotation provided for id ${id}`);
			this._annotations[id] = annotation;
			this._size++;
			return id;
		}
		nextId() {
			this._counter++;
			return this._counter.toString();
		}
	};
	WorkspaceChange = class {
		constructor(workspaceEdit) {
			this._textEditChanges = Object.create(null);
			if (workspaceEdit !== void 0) {
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
				} else if (workspaceEdit.changes) Object.keys(workspaceEdit.changes).forEach((key) => {
					const textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
					this._textEditChanges[key] = textEditChange;
				});
			} else this._workspaceEdit = {};
		}
		get edit() {
			this.initDocumentChanges();
			if (this._changeAnnotations !== void 0) if (this._changeAnnotations.size === 0) this._workspaceEdit.changeAnnotations = void 0;
			else this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
			return this._workspaceEdit;
		}
		getTextEditChange(key) {
			if (OptionalVersionedTextDocumentIdentifier.is(key)) {
				this.initDocumentChanges();
				if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
				const textDocument = {
					uri: key.uri,
					version: key.version
				};
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
			} else {
				this.initChanges();
				if (this._workspaceEdit.changes === void 0) throw new Error("Workspace edit is not configured for normal text edit changes.");
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
			if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
				this._changeAnnotations = new ChangeAnnotations();
				this._workspaceEdit.documentChanges = [];
				this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
			}
		}
		initChanges() {
			if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) this._workspaceEdit.changes = Object.create(null);
		}
		createFile(uri, optionsOrAnnotation, options) {
			this.initDocumentChanges();
			if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
			let annotation;
			if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
			else options = optionsOrAnnotation;
			let operation;
			let id;
			if (annotation === void 0) operation = CreateFile.create(uri, options);
			else {
				id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
				operation = CreateFile.create(uri, options, id);
			}
			this._workspaceEdit.documentChanges.push(operation);
			if (id !== void 0) return id;
		}
		renameFile(oldUri, newUri, optionsOrAnnotation, options) {
			this.initDocumentChanges();
			if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
			let annotation;
			if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
			else options = optionsOrAnnotation;
			let operation;
			let id;
			if (annotation === void 0) operation = RenameFile.create(oldUri, newUri, options);
			else {
				id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
				operation = RenameFile.create(oldUri, newUri, options, id);
			}
			this._workspaceEdit.documentChanges.push(operation);
			if (id !== void 0) return id;
		}
		deleteFile(uri, optionsOrAnnotation, options) {
			this.initDocumentChanges();
			if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
			let annotation;
			if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
			else options = optionsOrAnnotation;
			let operation;
			let id;
			if (annotation === void 0) operation = DeleteFile.create(uri, options);
			else {
				id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
				operation = DeleteFile.create(uri, options, id);
			}
			this._workspaceEdit.documentChanges.push(operation);
			if (id !== void 0) return id;
		}
	};
	(function(TextDocumentIdentifier$1) {
		function create(uri) {
			return { uri };
		}
		TextDocumentIdentifier$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.uri);
		}
		TextDocumentIdentifier$1.is = is$1;
	})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
	(function(VersionedTextDocumentIdentifier$1) {
		function create(uri, version) {
			return {
				uri,
				version
			};
		}
		VersionedTextDocumentIdentifier$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.uri) && Is$3.integer(candidate.version);
		}
		VersionedTextDocumentIdentifier$1.is = is$1;
	})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
	(function(OptionalVersionedTextDocumentIdentifier$1) {
		function create(uri, version) {
			return {
				uri,
				version
			};
		}
		OptionalVersionedTextDocumentIdentifier$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.uri) && (candidate.version === null || Is$3.integer(candidate.version));
		}
		OptionalVersionedTextDocumentIdentifier$1.is = is$1;
	})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
	(function(TextDocumentItem$1) {
		function create(uri, languageId, version, text) {
			return {
				uri,
				languageId,
				version,
				text
			};
		}
		TextDocumentItem$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.uri) && Is$3.string(candidate.languageId) && Is$3.integer(candidate.version) && Is$3.string(candidate.text);
		}
		TextDocumentItem$1.is = is$1;
	})(TextDocumentItem || (TextDocumentItem = {}));
	(function(MarkupKind$1) {
		MarkupKind$1.PlainText = "plaintext";
		MarkupKind$1.Markdown = "markdown";
		function is$1(value) {
			const candidate = value;
			return candidate === MarkupKind$1.PlainText || candidate === MarkupKind$1.Markdown;
		}
		MarkupKind$1.is = is$1;
	})(MarkupKind || (MarkupKind = {}));
	(function(MarkupContent$2) {
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is$3.string(candidate.value);
		}
		MarkupContent$2.is = is$1;
	})(MarkupContent$1 || (MarkupContent$1 = {}));
	(function(CompletionItemKind$3) {
		CompletionItemKind$3.Text = 1;
		CompletionItemKind$3.Method = 2;
		CompletionItemKind$3.Function = 3;
		CompletionItemKind$3.Constructor = 4;
		CompletionItemKind$3.Field = 5;
		CompletionItemKind$3.Variable = 6;
		CompletionItemKind$3.Class = 7;
		CompletionItemKind$3.Interface = 8;
		CompletionItemKind$3.Module = 9;
		CompletionItemKind$3.Property = 10;
		CompletionItemKind$3.Unit = 11;
		CompletionItemKind$3.Value = 12;
		CompletionItemKind$3.Enum = 13;
		CompletionItemKind$3.Keyword = 14;
		CompletionItemKind$3.Snippet = 15;
		CompletionItemKind$3.Color = 16;
		CompletionItemKind$3.File = 17;
		CompletionItemKind$3.Reference = 18;
		CompletionItemKind$3.Folder = 19;
		CompletionItemKind$3.EnumMember = 20;
		CompletionItemKind$3.Constant = 21;
		CompletionItemKind$3.Struct = 22;
		CompletionItemKind$3.Event = 23;
		CompletionItemKind$3.Operator = 24;
		CompletionItemKind$3.TypeParameter = 25;
	})(CompletionItemKind$2 || (CompletionItemKind$2 = {}));
	(function(InsertTextFormat$2) {
		InsertTextFormat$2.PlainText = 1;
		InsertTextFormat$2.Snippet = 2;
	})(InsertTextFormat$1 || (InsertTextFormat$1 = {}));
	(function(CompletionItemTag$1) {
		CompletionItemTag$1.Deprecated = 1;
	})(CompletionItemTag || (CompletionItemTag = {}));
	(function(InsertReplaceEdit$1) {
		function create(newText, insert, replace) {
			return {
				newText,
				insert,
				replace
			};
		}
		InsertReplaceEdit$1.create = create;
		function is$1(value) {
			const candidate = value;
			return candidate && Is$3.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
		}
		InsertReplaceEdit$1.is = is$1;
	})(InsertReplaceEdit || (InsertReplaceEdit = {}));
	(function(InsertTextMode$1) {
		InsertTextMode$1.asIs = 1;
		InsertTextMode$1.adjustIndentation = 2;
	})(InsertTextMode || (InsertTextMode = {}));
	(function(CompletionItemLabelDetails$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && (Is$3.string(candidate.detail) || candidate.detail === void 0) && (Is$3.string(candidate.description) || candidate.description === void 0);
		}
		CompletionItemLabelDetails$1.is = is$1;
	})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
	(function(CompletionItem$1) {
		function create(label) {
			return { label };
		}
		CompletionItem$1.create = create;
	})(CompletionItem || (CompletionItem = {}));
	(function(CompletionList$1) {
		function create(items, isIncomplete) {
			return {
				items: items ? items : [],
				isIncomplete: !!isIncomplete
			};
		}
		CompletionList$1.create = create;
	})(CompletionList || (CompletionList = {}));
	(function(MarkedString$2) {
		function fromPlainText(plainText) {
			return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		MarkedString$2.fromPlainText = fromPlainText;
		function is$1(value) {
			const candidate = value;
			return Is$3.string(candidate) || Is$3.objectLiteral(candidate) && Is$3.string(candidate.language) && Is$3.string(candidate.value);
		}
		MarkedString$2.is = is$1;
	})(MarkedString$1 || (MarkedString$1 = {}));
	(function(Hover$1) {
		function is$1(value) {
			let candidate = value;
			return !!candidate && Is$3.objectLiteral(candidate) && (MarkupContent$1.is(candidate.contents) || MarkedString$1.is(candidate.contents) || Is$3.typedArray(candidate.contents, MarkedString$1.is)) && (value.range === void 0 || Range.is(value.range));
		}
		Hover$1.is = is$1;
	})(Hover || (Hover = {}));
	(function(ParameterInformation$1) {
		function create(label, documentation) {
			return documentation ? {
				label,
				documentation
			} : { label };
		}
		ParameterInformation$1.create = create;
	})(ParameterInformation || (ParameterInformation = {}));
	(function(SignatureInformation$1) {
		function create(label, documentation, ...parameters) {
			let result = { label };
			if (Is$3.defined(documentation)) result.documentation = documentation;
			if (Is$3.defined(parameters)) result.parameters = parameters;
			else result.parameters = [];
			return result;
		}
		SignatureInformation$1.create = create;
	})(SignatureInformation || (SignatureInformation = {}));
	(function(DocumentHighlightKind$1) {
		DocumentHighlightKind$1.Text = 1;
		DocumentHighlightKind$1.Read = 2;
		DocumentHighlightKind$1.Write = 3;
	})(DocumentHighlightKind || (DocumentHighlightKind = {}));
	(function(DocumentHighlight$1) {
		function create(range, kind) {
			let result = { range };
			if (Is$3.number(kind)) result.kind = kind;
			return result;
		}
		DocumentHighlight$1.create = create;
	})(DocumentHighlight || (DocumentHighlight = {}));
	(function(SymbolKind$1) {
		SymbolKind$1.File = 1;
		SymbolKind$1.Module = 2;
		SymbolKind$1.Namespace = 3;
		SymbolKind$1.Package = 4;
		SymbolKind$1.Class = 5;
		SymbolKind$1.Method = 6;
		SymbolKind$1.Property = 7;
		SymbolKind$1.Field = 8;
		SymbolKind$1.Constructor = 9;
		SymbolKind$1.Enum = 10;
		SymbolKind$1.Interface = 11;
		SymbolKind$1.Function = 12;
		SymbolKind$1.Variable = 13;
		SymbolKind$1.Constant = 14;
		SymbolKind$1.String = 15;
		SymbolKind$1.Number = 16;
		SymbolKind$1.Boolean = 17;
		SymbolKind$1.Array = 18;
		SymbolKind$1.Object = 19;
		SymbolKind$1.Key = 20;
		SymbolKind$1.Null = 21;
		SymbolKind$1.EnumMember = 22;
		SymbolKind$1.Struct = 23;
		SymbolKind$1.Event = 24;
		SymbolKind$1.Operator = 25;
		SymbolKind$1.TypeParameter = 26;
	})(SymbolKind || (SymbolKind = {}));
	(function(SymbolTag$1) {
		SymbolTag$1.Deprecated = 1;
	})(SymbolTag || (SymbolTag = {}));
	(function(SymbolInformation$1) {
		function create(name, kind, range, uri, containerName) {
			let result = {
				name,
				kind,
				location: {
					uri,
					range
				}
			};
			if (containerName) result.containerName = containerName;
			return result;
		}
		SymbolInformation$1.create = create;
	})(SymbolInformation || (SymbolInformation = {}));
	(function(WorkspaceSymbol$1) {
		function create(name, kind, uri, range) {
			return range !== void 0 ? {
				name,
				kind,
				location: {
					uri,
					range
				}
			} : {
				name,
				kind,
				location: { uri }
			};
		}
		WorkspaceSymbol$1.create = create;
	})(WorkspaceSymbol || (WorkspaceSymbol = {}));
	(function(DocumentSymbol$1) {
		function create(name, detail, kind, range, selectionRange, children) {
			let result = {
				name,
				detail,
				kind,
				range,
				selectionRange
			};
			if (children !== void 0) result.children = children;
			return result;
		}
		DocumentSymbol$1.create = create;
		function is$1(value) {
			let candidate = value;
			return candidate && Is$3.string(candidate.name) && Is$3.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is$3.string(candidate.detail)) && (candidate.deprecated === void 0 || Is$3.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
		}
		DocumentSymbol$1.is = is$1;
	})(DocumentSymbol || (DocumentSymbol = {}));
	(function(CodeActionKind$1) {
		CodeActionKind$1.Empty = "";
		CodeActionKind$1.QuickFix = "quickfix";
		CodeActionKind$1.Refactor = "refactor";
		CodeActionKind$1.RefactorExtract = "refactor.extract";
		CodeActionKind$1.RefactorInline = "refactor.inline";
		CodeActionKind$1.RefactorRewrite = "refactor.rewrite";
		CodeActionKind$1.Source = "source";
		CodeActionKind$1.SourceOrganizeImports = "source.organizeImports";
		CodeActionKind$1.SourceFixAll = "source.fixAll";
	})(CodeActionKind || (CodeActionKind = {}));
	(function(CodeActionTriggerKind$1) {
		CodeActionTriggerKind$1.Invoked = 1;
		CodeActionTriggerKind$1.Automatic = 2;
	})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
	(function(CodeActionContext$1) {
		function create(diagnostics, only, triggerKind) {
			let result = { diagnostics };
			if (only !== void 0 && only !== null) result.only = only;
			if (triggerKind !== void 0 && triggerKind !== null) result.triggerKind = triggerKind;
			return result;
		}
		CodeActionContext$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is$3.typedArray(candidate.only, Is$3.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
		}
		CodeActionContext$1.is = is$1;
	})(CodeActionContext || (CodeActionContext = {}));
	(function(CodeAction$1) {
		function create(title, kindOrCommandOrEdit, kind) {
			let result = { title };
			let checkKind = true;
			if (typeof kindOrCommandOrEdit === "string") {
				checkKind = false;
				result.kind = kindOrCommandOrEdit;
			} else if (Command.is(kindOrCommandOrEdit)) result.command = kindOrCommandOrEdit;
			else result.edit = kindOrCommandOrEdit;
			if (checkKind && kind !== void 0) result.kind = kind;
			return result;
		}
		CodeAction$1.create = create;
		function is$1(value) {
			let candidate = value;
			return candidate && Is$3.string(candidate.title) && (candidate.diagnostics === void 0 || Is$3.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is$3.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is$3.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
		}
		CodeAction$1.is = is$1;
	})(CodeAction || (CodeAction = {}));
	(function(CodeLens$1) {
		function create(range, data) {
			let result = { range };
			if (Is$3.defined(data)) result.data = data;
			return result;
		}
		CodeLens$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Range.is(candidate.range) && (Is$3.undefined(candidate.command) || Command.is(candidate.command));
		}
		CodeLens$1.is = is$1;
	})(CodeLens || (CodeLens = {}));
	(function(FormattingOptions$1) {
		function create(tabSize, insertSpaces) {
			return {
				tabSize,
				insertSpaces
			};
		}
		FormattingOptions$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.uinteger(candidate.tabSize) && Is$3.boolean(candidate.insertSpaces);
		}
		FormattingOptions$1.is = is$1;
	})(FormattingOptions || (FormattingOptions = {}));
	(function(DocumentLink$1) {
		function create(range, target, data) {
			return {
				range,
				target,
				data
			};
		}
		DocumentLink$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Range.is(candidate.range) && (Is$3.undefined(candidate.target) || Is$3.string(candidate.target));
		}
		DocumentLink$1.is = is$1;
	})(DocumentLink || (DocumentLink = {}));
	(function(SelectionRange$1) {
		function create(range, parent) {
			return {
				range,
				parent
			};
		}
		SelectionRange$1.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange$1.is(candidate.parent));
		}
		SelectionRange$1.is = is$1;
	})(SelectionRange || (SelectionRange = {}));
	(function(SemanticTokenTypes$1) {
		SemanticTokenTypes$1["namespace"] = "namespace";
		SemanticTokenTypes$1["type"] = "type";
		SemanticTokenTypes$1["class"] = "class";
		SemanticTokenTypes$1["enum"] = "enum";
		SemanticTokenTypes$1["interface"] = "interface";
		SemanticTokenTypes$1["struct"] = "struct";
		SemanticTokenTypes$1["typeParameter"] = "typeParameter";
		SemanticTokenTypes$1["parameter"] = "parameter";
		SemanticTokenTypes$1["variable"] = "variable";
		SemanticTokenTypes$1["property"] = "property";
		SemanticTokenTypes$1["enumMember"] = "enumMember";
		SemanticTokenTypes$1["event"] = "event";
		SemanticTokenTypes$1["function"] = "function";
		SemanticTokenTypes$1["method"] = "method";
		SemanticTokenTypes$1["macro"] = "macro";
		SemanticTokenTypes$1["keyword"] = "keyword";
		SemanticTokenTypes$1["modifier"] = "modifier";
		SemanticTokenTypes$1["comment"] = "comment";
		SemanticTokenTypes$1["string"] = "string";
		SemanticTokenTypes$1["number"] = "number";
		SemanticTokenTypes$1["regexp"] = "regexp";
		SemanticTokenTypes$1["operator"] = "operator";
		SemanticTokenTypes$1["decorator"] = "decorator";
	})(SemanticTokenTypes || (SemanticTokenTypes = {}));
	(function(SemanticTokenModifiers$1) {
		SemanticTokenModifiers$1["declaration"] = "declaration";
		SemanticTokenModifiers$1["definition"] = "definition";
		SemanticTokenModifiers$1["readonly"] = "readonly";
		SemanticTokenModifiers$1["static"] = "static";
		SemanticTokenModifiers$1["deprecated"] = "deprecated";
		SemanticTokenModifiers$1["abstract"] = "abstract";
		SemanticTokenModifiers$1["async"] = "async";
		SemanticTokenModifiers$1["modification"] = "modification";
		SemanticTokenModifiers$1["documentation"] = "documentation";
		SemanticTokenModifiers$1["defaultLibrary"] = "defaultLibrary";
	})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
	(function(SemanticTokens$1) {
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
		}
		SemanticTokens$1.is = is$1;
	})(SemanticTokens || (SemanticTokens = {}));
	(function(InlineValueText$1) {
		function create(range, text) {
			return {
				range,
				text
			};
		}
		InlineValueText$1.create = create;
		function is$1(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is$3.string(candidate.text);
		}
		InlineValueText$1.is = is$1;
	})(InlineValueText || (InlineValueText = {}));
	(function(InlineValueVariableLookup$1) {
		function create(range, variableName, caseSensitiveLookup) {
			return {
				range,
				variableName,
				caseSensitiveLookup
			};
		}
		InlineValueVariableLookup$1.create = create;
		function is$1(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is$3.boolean(candidate.caseSensitiveLookup) && (Is$3.string(candidate.variableName) || candidate.variableName === void 0);
		}
		InlineValueVariableLookup$1.is = is$1;
	})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
	(function(InlineValueEvaluatableExpression$1) {
		function create(range, expression) {
			return {
				range,
				expression
			};
		}
		InlineValueEvaluatableExpression$1.create = create;
		function is$1(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is$3.string(candidate.expression) || candidate.expression === void 0);
		}
		InlineValueEvaluatableExpression$1.is = is$1;
	})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
	(function(InlineValueContext$1) {
		function create(frameId, stoppedLocation) {
			return {
				frameId,
				stoppedLocation
			};
		}
		InlineValueContext$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.defined(candidate) && Range.is(value.stoppedLocation);
		}
		InlineValueContext$1.is = is$1;
	})(InlineValueContext || (InlineValueContext = {}));
	(function(InlayHintKind$1) {
		InlayHintKind$1.Type = 1;
		InlayHintKind$1.Parameter = 2;
		function is$1(value) {
			return value === 1 || value === 2;
		}
		InlayHintKind$1.is = is$1;
	})(InlayHintKind || (InlayHintKind = {}));
	(function(InlayHintLabelPart$1) {
		function create(value) {
			return { value };
		}
		InlayHintLabelPart$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is$3.string(candidate.tooltip) || MarkupContent$1.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
		}
		InlayHintLabelPart$1.is = is$1;
	})(InlayHintLabelPart || (InlayHintLabelPart = {}));
	(function(InlayHint$1) {
		function create(position, label, kind) {
			const result = {
				position,
				label
			};
			if (kind !== void 0) result.kind = kind;
			return result;
		}
		InlayHint$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && Position.is(candidate.position) && (Is$3.string(candidate.label) || Is$3.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is$3.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is$3.string(candidate.tooltip) || MarkupContent$1.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is$3.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is$3.boolean(candidate.paddingRight));
		}
		InlayHint$1.is = is$1;
	})(InlayHint || (InlayHint = {}));
	(function(StringValue$1) {
		function createSnippet(value) {
			return {
				kind: "snippet",
				value
			};
		}
		StringValue$1.createSnippet = createSnippet;
	})(StringValue || (StringValue = {}));
	(function(InlineCompletionItem$1) {
		function create(insertText, filterText, range, command) {
			return {
				insertText,
				filterText,
				range,
				command
			};
		}
		InlineCompletionItem$1.create = create;
	})(InlineCompletionItem || (InlineCompletionItem = {}));
	(function(InlineCompletionList$1) {
		function create(items) {
			return { items };
		}
		InlineCompletionList$1.create = create;
	})(InlineCompletionList || (InlineCompletionList = {}));
	(function(InlineCompletionTriggerKind$1) {
		InlineCompletionTriggerKind$1.Invoked = 0;
		InlineCompletionTriggerKind$1.Automatic = 1;
	})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
	(function(SelectedCompletionInfo$1) {
		function create(range, text) {
			return {
				range,
				text
			};
		}
		SelectedCompletionInfo$1.create = create;
	})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
	(function(InlineCompletionContext$1) {
		function create(triggerKind, selectedCompletionInfo) {
			return {
				triggerKind,
				selectedCompletionInfo
			};
		}
		InlineCompletionContext$1.create = create;
	})(InlineCompletionContext || (InlineCompletionContext = {}));
	(function(WorkspaceFolder$1) {
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(candidate) && URI$1.is(candidate.uri) && Is$3.string(candidate.name);
		}
		WorkspaceFolder$1.is = is$1;
	})(WorkspaceFolder || (WorkspaceFolder = {}));
	EOL = [
		"\n",
		"\r\n",
		"\r"
	];
	(function(TextDocument$2) {
		function create(uri, languageId, version, content) {
			return new FullTextDocument$1(uri, languageId, version, content);
		}
		TextDocument$2.create = create;
		function is$1(value) {
			let candidate = value;
			return Is$3.defined(candidate) && Is$3.string(candidate.uri) && (Is$3.undefined(candidate.languageId) || Is$3.string(candidate.languageId)) && Is$3.uinteger(candidate.lineCount) && Is$3.func(candidate.getText) && Is$3.func(candidate.positionAt) && Is$3.func(candidate.offsetAt) ? true : false;
		}
		TextDocument$2.is = is$1;
		function applyEdits(document, edits) {
			let text = document.getText();
			let sortedEdits = mergeSort$1(edits, (a$1, b) => {
				let diff = a$1.range.start.line - b.range.start.line;
				if (diff === 0) return a$1.range.start.character - b.range.start.character;
				return diff;
			});
			let lastModifiedOffset = text.length;
			for (let i = sortedEdits.length - 1; i >= 0; i--) {
				let e = sortedEdits[i];
				let startOffset = document.offsetAt(e.range.start);
				let endOffset = document.offsetAt(e.range.end);
				if (endOffset <= lastModifiedOffset) text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
				else throw new Error("Overlapping edit");
				lastModifiedOffset = startOffset;
			}
			return text;
		}
		TextDocument$2.applyEdits = applyEdits;
		function mergeSort$1(data, compare) {
			if (data.length <= 1) return data;
			const p = data.length / 2 | 0;
			const left = data.slice(0, p);
			const right = data.slice(p);
			mergeSort$1(left, compare);
			mergeSort$1(right, compare);
			let leftIdx = 0;
			let rightIdx = 0;
			let i = 0;
			while (leftIdx < left.length && rightIdx < right.length) if (compare(left[leftIdx], right[rightIdx]) <= 0) data[i++] = left[leftIdx++];
			else data[i++] = right[rightIdx++];
			while (leftIdx < left.length) data[i++] = left[leftIdx++];
			while (rightIdx < right.length) data[i++] = right[rightIdx++];
			return data;
		}
	})(TextDocument$1 || (TextDocument$1 = {}));
	FullTextDocument$1 = class {
		constructor(uri, languageId, version, content) {
			this._uri = uri;
			this._languageId = languageId;
			this._version = version;
			this._content = content;
			this._lineOffsets = void 0;
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
			this._lineOffsets = void 0;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) {
				let lineOffsets = [];
				let text = this._content;
				let isLineStart = true;
				for (let i = 0; i < text.length; i++) {
					if (isLineStart) {
						lineOffsets.push(i);
						isLineStart = false;
					}
					let ch = text.charAt(i);
					isLineStart = ch === "\r" || ch === "\n";
					if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") i++;
				}
				if (isLineStart && text.length > 0) lineOffsets.push(text.length);
				this._lineOffsets = lineOffsets;
			}
			return this._lineOffsets;
		}
		positionAt(offset) {
			offset = Math.max(Math.min(offset, this._content.length), 0);
			let lineOffsets = this.getLineOffsets();
			let low = 0, high = lineOffsets.length;
			if (high === 0) return Position.create(0, offset);
			while (low < high) {
				let mid = Math.floor((low + high) / 2);
				if (lineOffsets[mid] > offset) high = mid;
				else low = mid + 1;
			}
			let line = low - 1;
			return Position.create(line, offset - lineOffsets[line]);
		}
		offsetAt(position) {
			let lineOffsets = this.getLineOffsets();
			if (position.line >= lineOffsets.length) return this._content.length;
			else if (position.line < 0) return 0;
			let lineOffset = lineOffsets[position.line];
			let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
			return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
	};
	(function(Is$8) {
		const toString = Object.prototype.toString;
		function defined(value) {
			return typeof value !== "undefined";
		}
		Is$8.defined = defined;
		function undefined$1(value) {
			return typeof value === "undefined";
		}
		Is$8.undefined = undefined$1;
		function boolean$2(value) {
			return value === true || value === false;
		}
		Is$8.boolean = boolean$2;
		function string$2(value) {
			return toString.call(value) === "[object String]";
		}
		Is$8.string = string$2;
		function number$2(value) {
			return toString.call(value) === "[object Number]";
		}
		Is$8.number = number$2;
		function numberRange(value, min, max) {
			return toString.call(value) === "[object Number]" && min <= value && value <= max;
		}
		Is$8.numberRange = numberRange;
		function integer$1(value) {
			return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
		}
		Is$8.integer = integer$1;
		function uinteger$1(value) {
			return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
		}
		Is$8.uinteger = uinteger$1;
		function func$2(value) {
			return toString.call(value) === "[object Function]";
		}
		Is$8.func = func$2;
		function objectLiteral$1(value) {
			return value !== null && typeof value === "object";
		}
		Is$8.objectLiteral = objectLiteral$1;
		function typedArray$1(value, check) {
			return Array.isArray(value) && value.every(check);
		}
		Is$8.typedArray = typedArray$1;
	})(Is$3 || (Is$3 = {}));
}));
var require_messages = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = void 0;
	const vscode_jsonrpc_1$3 = require_main$1();
	var MessageDirection;
	(function(MessageDirection$1) {
		MessageDirection$1["clientToServer"] = "clientToServer";
		MessageDirection$1["serverToClient"] = "serverToClient";
		MessageDirection$1["both"] = "both";
	})(MessageDirection || (exports.MessageDirection = MessageDirection = {}));
	var RegistrationType = class {
		constructor(method) {
			this.method = method;
		}
	};
	exports.RegistrationType = RegistrationType;
	var ProtocolRequestType0 = class extends vscode_jsonrpc_1$3.RequestType0 {
		constructor(method) {
			super(method);
		}
	};
	exports.ProtocolRequestType0 = ProtocolRequestType0;
	var ProtocolRequestType = class extends vscode_jsonrpc_1$3.RequestType {
		constructor(method) {
			super(method, vscode_jsonrpc_1$3.ParameterStructures.byName);
		}
	};
	exports.ProtocolRequestType = ProtocolRequestType;
	var ProtocolNotificationType0 = class extends vscode_jsonrpc_1$3.NotificationType0 {
		constructor(method) {
			super(method);
		}
	};
	exports.ProtocolNotificationType0 = ProtocolNotificationType0;
	var ProtocolNotificationType = class extends vscode_jsonrpc_1$3.NotificationType {
		constructor(method) {
			super(method, vscode_jsonrpc_1$3.ParameterStructures.byName);
		}
	};
	exports.ProtocolNotificationType = ProtocolNotificationType;
}));
var require_is = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.objectLiteral = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
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
	function typedArray(value, check) {
		return Array.isArray(value) && value.every(check);
	}
	exports.typedArray = typedArray;
	function objectLiteral(value) {
		return value !== null && typeof value === "object";
	}
	exports.objectLiteral = objectLiteral;
}));
var require_protocol_implementation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ImplementationRequest = void 0;
	const messages_1$21 = require_messages();
	var ImplementationRequest;
	(function(ImplementationRequest$1) {
		ImplementationRequest$1.method = "textDocument/implementation";
		ImplementationRequest$1.messageDirection = messages_1$21.MessageDirection.clientToServer;
		ImplementationRequest$1.type = new messages_1$21.ProtocolRequestType(ImplementationRequest$1.method);
	})(ImplementationRequest || (exports.ImplementationRequest = ImplementationRequest = {}));
}));
var require_protocol_typeDefinition = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TypeDefinitionRequest = void 0;
	const messages_1$20 = require_messages();
	var TypeDefinitionRequest;
	(function(TypeDefinitionRequest$1) {
		TypeDefinitionRequest$1.method = "textDocument/typeDefinition";
		TypeDefinitionRequest$1.messageDirection = messages_1$20.MessageDirection.clientToServer;
		TypeDefinitionRequest$1.type = new messages_1$20.ProtocolRequestType(TypeDefinitionRequest$1.method);
	})(TypeDefinitionRequest || (exports.TypeDefinitionRequest = TypeDefinitionRequest = {}));
}));
var require_protocol_workspaceFolder = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
	const messages_1$19 = require_messages();
	var WorkspaceFoldersRequest;
	(function(WorkspaceFoldersRequest$1) {
		WorkspaceFoldersRequest$1.method = "workspace/workspaceFolders";
		WorkspaceFoldersRequest$1.messageDirection = messages_1$19.MessageDirection.serverToClient;
		WorkspaceFoldersRequest$1.type = new messages_1$19.ProtocolRequestType0(WorkspaceFoldersRequest$1.method);
	})(WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
	var DidChangeWorkspaceFoldersNotification;
	(function(DidChangeWorkspaceFoldersNotification$1) {
		DidChangeWorkspaceFoldersNotification$1.method = "workspace/didChangeWorkspaceFolders";
		DidChangeWorkspaceFoldersNotification$1.messageDirection = messages_1$19.MessageDirection.clientToServer;
		DidChangeWorkspaceFoldersNotification$1.type = new messages_1$19.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification$1.method);
	})(DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
}));
var require_protocol_configuration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConfigurationRequest = void 0;
	const messages_1$18 = require_messages();
	var ConfigurationRequest;
	(function(ConfigurationRequest$1) {
		ConfigurationRequest$1.method = "workspace/configuration";
		ConfigurationRequest$1.messageDirection = messages_1$18.MessageDirection.serverToClient;
		ConfigurationRequest$1.type = new messages_1$18.ProtocolRequestType(ConfigurationRequest$1.method);
	})(ConfigurationRequest || (exports.ConfigurationRequest = ConfigurationRequest = {}));
}));
var require_protocol_colorProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
	const messages_1$17 = require_messages();
	var DocumentColorRequest;
	(function(DocumentColorRequest$1) {
		DocumentColorRequest$1.method = "textDocument/documentColor";
		DocumentColorRequest$1.messageDirection = messages_1$17.MessageDirection.clientToServer;
		DocumentColorRequest$1.type = new messages_1$17.ProtocolRequestType(DocumentColorRequest$1.method);
	})(DocumentColorRequest || (exports.DocumentColorRequest = DocumentColorRequest = {}));
	var ColorPresentationRequest;
	(function(ColorPresentationRequest$1) {
		ColorPresentationRequest$1.method = "textDocument/colorPresentation";
		ColorPresentationRequest$1.messageDirection = messages_1$17.MessageDirection.clientToServer;
		ColorPresentationRequest$1.type = new messages_1$17.ProtocolRequestType(ColorPresentationRequest$1.method);
	})(ColorPresentationRequest || (exports.ColorPresentationRequest = ColorPresentationRequest = {}));
}));
var require_protocol_foldingRange = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = void 0;
	const messages_1$16 = require_messages();
	var FoldingRangeRequest;
	(function(FoldingRangeRequest$1) {
		FoldingRangeRequest$1.method = "textDocument/foldingRange";
		FoldingRangeRequest$1.messageDirection = messages_1$16.MessageDirection.clientToServer;
		FoldingRangeRequest$1.type = new messages_1$16.ProtocolRequestType(FoldingRangeRequest$1.method);
	})(FoldingRangeRequest || (exports.FoldingRangeRequest = FoldingRangeRequest = {}));
	var FoldingRangeRefreshRequest;
	(function(FoldingRangeRefreshRequest$1) {
		FoldingRangeRefreshRequest$1.method = `workspace/foldingRange/refresh`;
		FoldingRangeRefreshRequest$1.messageDirection = messages_1$16.MessageDirection.serverToClient;
		FoldingRangeRefreshRequest$1.type = new messages_1$16.ProtocolRequestType0(FoldingRangeRefreshRequest$1.method);
	})(FoldingRangeRefreshRequest || (exports.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
}));
var require_protocol_declaration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DeclarationRequest = void 0;
	const messages_1$15 = require_messages();
	var DeclarationRequest;
	(function(DeclarationRequest$1) {
		DeclarationRequest$1.method = "textDocument/declaration";
		DeclarationRequest$1.messageDirection = messages_1$15.MessageDirection.clientToServer;
		DeclarationRequest$1.type = new messages_1$15.ProtocolRequestType(DeclarationRequest$1.method);
	})(DeclarationRequest || (exports.DeclarationRequest = DeclarationRequest = {}));
}));
var require_protocol_selectionRange = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SelectionRangeRequest = void 0;
	const messages_1$14 = require_messages();
	var SelectionRangeRequest;
	(function(SelectionRangeRequest$1) {
		SelectionRangeRequest$1.method = "textDocument/selectionRange";
		SelectionRangeRequest$1.messageDirection = messages_1$14.MessageDirection.clientToServer;
		SelectionRangeRequest$1.type = new messages_1$14.ProtocolRequestType(SelectionRangeRequest$1.method);
	})(SelectionRangeRequest || (exports.SelectionRangeRequest = SelectionRangeRequest = {}));
}));
var require_protocol_progress = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
	const vscode_jsonrpc_1$2 = require_main$1();
	const messages_1$13 = require_messages();
	var WorkDoneProgress;
	(function(WorkDoneProgress$1) {
		WorkDoneProgress$1.type = new vscode_jsonrpc_1$2.ProgressType();
		function is$1(value) {
			return value === WorkDoneProgress$1.type;
		}
		WorkDoneProgress$1.is = is$1;
	})(WorkDoneProgress || (exports.WorkDoneProgress = WorkDoneProgress = {}));
	var WorkDoneProgressCreateRequest;
	(function(WorkDoneProgressCreateRequest$1) {
		WorkDoneProgressCreateRequest$1.method = "window/workDoneProgress/create";
		WorkDoneProgressCreateRequest$1.messageDirection = messages_1$13.MessageDirection.serverToClient;
		WorkDoneProgressCreateRequest$1.type = new messages_1$13.ProtocolRequestType(WorkDoneProgressCreateRequest$1.method);
	})(WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
	var WorkDoneProgressCancelNotification;
	(function(WorkDoneProgressCancelNotification$1) {
		WorkDoneProgressCancelNotification$1.method = "window/workDoneProgress/cancel";
		WorkDoneProgressCancelNotification$1.messageDirection = messages_1$13.MessageDirection.clientToServer;
		WorkDoneProgressCancelNotification$1.type = new messages_1$13.ProtocolNotificationType(WorkDoneProgressCancelNotification$1.method);
	})(WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
}));
var require_protocol_callHierarchy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
	const messages_1$12 = require_messages();
	var CallHierarchyPrepareRequest;
	(function(CallHierarchyPrepareRequest$1) {
		CallHierarchyPrepareRequest$1.method = "textDocument/prepareCallHierarchy";
		CallHierarchyPrepareRequest$1.messageDirection = messages_1$12.MessageDirection.clientToServer;
		CallHierarchyPrepareRequest$1.type = new messages_1$12.ProtocolRequestType(CallHierarchyPrepareRequest$1.method);
	})(CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
	var CallHierarchyIncomingCallsRequest;
	(function(CallHierarchyIncomingCallsRequest$1) {
		CallHierarchyIncomingCallsRequest$1.method = "callHierarchy/incomingCalls";
		CallHierarchyIncomingCallsRequest$1.messageDirection = messages_1$12.MessageDirection.clientToServer;
		CallHierarchyIncomingCallsRequest$1.type = new messages_1$12.ProtocolRequestType(CallHierarchyIncomingCallsRequest$1.method);
	})(CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
	var CallHierarchyOutgoingCallsRequest;
	(function(CallHierarchyOutgoingCallsRequest$1) {
		CallHierarchyOutgoingCallsRequest$1.method = "callHierarchy/outgoingCalls";
		CallHierarchyOutgoingCallsRequest$1.messageDirection = messages_1$12.MessageDirection.clientToServer;
		CallHierarchyOutgoingCallsRequest$1.type = new messages_1$12.ProtocolRequestType(CallHierarchyOutgoingCallsRequest$1.method);
	})(CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
}));
var require_protocol_semanticTokens = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
	const messages_1$11 = require_messages();
	var TokenFormat;
	(function(TokenFormat$1) {
		TokenFormat$1.Relative = "relative";
	})(TokenFormat || (exports.TokenFormat = TokenFormat = {}));
	var SemanticTokensRegistrationType;
	(function(SemanticTokensRegistrationType$1) {
		SemanticTokensRegistrationType$1.method = "textDocument/semanticTokens";
		SemanticTokensRegistrationType$1.type = new messages_1$11.RegistrationType(SemanticTokensRegistrationType$1.method);
	})(SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
	var SemanticTokensRequest;
	(function(SemanticTokensRequest$1) {
		SemanticTokensRequest$1.method = "textDocument/semanticTokens/full";
		SemanticTokensRequest$1.messageDirection = messages_1$11.MessageDirection.clientToServer;
		SemanticTokensRequest$1.type = new messages_1$11.ProtocolRequestType(SemanticTokensRequest$1.method);
		SemanticTokensRequest$1.registrationMethod = SemanticTokensRegistrationType.method;
	})(SemanticTokensRequest || (exports.SemanticTokensRequest = SemanticTokensRequest = {}));
	var SemanticTokensDeltaRequest;
	(function(SemanticTokensDeltaRequest$1) {
		SemanticTokensDeltaRequest$1.method = "textDocument/semanticTokens/full/delta";
		SemanticTokensDeltaRequest$1.messageDirection = messages_1$11.MessageDirection.clientToServer;
		SemanticTokensDeltaRequest$1.type = new messages_1$11.ProtocolRequestType(SemanticTokensDeltaRequest$1.method);
		SemanticTokensDeltaRequest$1.registrationMethod = SemanticTokensRegistrationType.method;
	})(SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
	var SemanticTokensRangeRequest;
	(function(SemanticTokensRangeRequest$1) {
		SemanticTokensRangeRequest$1.method = "textDocument/semanticTokens/range";
		SemanticTokensRangeRequest$1.messageDirection = messages_1$11.MessageDirection.clientToServer;
		SemanticTokensRangeRequest$1.type = new messages_1$11.ProtocolRequestType(SemanticTokensRangeRequest$1.method);
		SemanticTokensRangeRequest$1.registrationMethod = SemanticTokensRegistrationType.method;
	})(SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
	var SemanticTokensRefreshRequest;
	(function(SemanticTokensRefreshRequest$1) {
		SemanticTokensRefreshRequest$1.method = `workspace/semanticTokens/refresh`;
		SemanticTokensRefreshRequest$1.messageDirection = messages_1$11.MessageDirection.serverToClient;
		SemanticTokensRefreshRequest$1.type = new messages_1$11.ProtocolRequestType0(SemanticTokensRefreshRequest$1.method);
	})(SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
}));
var require_protocol_showDocument = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ShowDocumentRequest = void 0;
	const messages_1$10 = require_messages();
	var ShowDocumentRequest;
	(function(ShowDocumentRequest$1) {
		ShowDocumentRequest$1.method = "window/showDocument";
		ShowDocumentRequest$1.messageDirection = messages_1$10.MessageDirection.serverToClient;
		ShowDocumentRequest$1.type = new messages_1$10.ProtocolRequestType(ShowDocumentRequest$1.method);
	})(ShowDocumentRequest || (exports.ShowDocumentRequest = ShowDocumentRequest = {}));
}));
var require_protocol_linkedEditingRange = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LinkedEditingRangeRequest = void 0;
	const messages_1$9 = require_messages();
	var LinkedEditingRangeRequest;
	(function(LinkedEditingRangeRequest$1) {
		LinkedEditingRangeRequest$1.method = "textDocument/linkedEditingRange";
		LinkedEditingRangeRequest$1.messageDirection = messages_1$9.MessageDirection.clientToServer;
		LinkedEditingRangeRequest$1.type = new messages_1$9.ProtocolRequestType(LinkedEditingRangeRequest$1.method);
	})(LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
}));
var require_protocol_fileOperations = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
	const messages_1$8 = require_messages();
	var FileOperationPatternKind;
	(function(FileOperationPatternKind$1) {
		FileOperationPatternKind$1.file = "file";
		FileOperationPatternKind$1.folder = "folder";
	})(FileOperationPatternKind || (exports.FileOperationPatternKind = FileOperationPatternKind = {}));
	var WillCreateFilesRequest;
	(function(WillCreateFilesRequest$1) {
		WillCreateFilesRequest$1.method = "workspace/willCreateFiles";
		WillCreateFilesRequest$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		WillCreateFilesRequest$1.type = new messages_1$8.ProtocolRequestType(WillCreateFilesRequest$1.method);
	})(WillCreateFilesRequest || (exports.WillCreateFilesRequest = WillCreateFilesRequest = {}));
	var DidCreateFilesNotification;
	(function(DidCreateFilesNotification$1) {
		DidCreateFilesNotification$1.method = "workspace/didCreateFiles";
		DidCreateFilesNotification$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		DidCreateFilesNotification$1.type = new messages_1$8.ProtocolNotificationType(DidCreateFilesNotification$1.method);
	})(DidCreateFilesNotification || (exports.DidCreateFilesNotification = DidCreateFilesNotification = {}));
	var WillRenameFilesRequest;
	(function(WillRenameFilesRequest$1) {
		WillRenameFilesRequest$1.method = "workspace/willRenameFiles";
		WillRenameFilesRequest$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		WillRenameFilesRequest$1.type = new messages_1$8.ProtocolRequestType(WillRenameFilesRequest$1.method);
	})(WillRenameFilesRequest || (exports.WillRenameFilesRequest = WillRenameFilesRequest = {}));
	var DidRenameFilesNotification;
	(function(DidRenameFilesNotification$1) {
		DidRenameFilesNotification$1.method = "workspace/didRenameFiles";
		DidRenameFilesNotification$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		DidRenameFilesNotification$1.type = new messages_1$8.ProtocolNotificationType(DidRenameFilesNotification$1.method);
	})(DidRenameFilesNotification || (exports.DidRenameFilesNotification = DidRenameFilesNotification = {}));
	var DidDeleteFilesNotification;
	(function(DidDeleteFilesNotification$1) {
		DidDeleteFilesNotification$1.method = "workspace/didDeleteFiles";
		DidDeleteFilesNotification$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		DidDeleteFilesNotification$1.type = new messages_1$8.ProtocolNotificationType(DidDeleteFilesNotification$1.method);
	})(DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
	var WillDeleteFilesRequest;
	(function(WillDeleteFilesRequest$1) {
		WillDeleteFilesRequest$1.method = "workspace/willDeleteFiles";
		WillDeleteFilesRequest$1.messageDirection = messages_1$8.MessageDirection.clientToServer;
		WillDeleteFilesRequest$1.type = new messages_1$8.ProtocolRequestType(WillDeleteFilesRequest$1.method);
	})(WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
}));
var require_protocol_moniker = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
	const messages_1$7 = require_messages();
	var UniquenessLevel;
	(function(UniquenessLevel$1) {
		UniquenessLevel$1.document = "document";
		UniquenessLevel$1.project = "project";
		UniquenessLevel$1.group = "group";
		UniquenessLevel$1.scheme = "scheme";
		UniquenessLevel$1.global = "global";
	})(UniquenessLevel || (exports.UniquenessLevel = UniquenessLevel = {}));
	var MonikerKind;
	(function(MonikerKind$1) {
		MonikerKind$1.$import = "import";
		MonikerKind$1.$export = "export";
		MonikerKind$1.local = "local";
	})(MonikerKind || (exports.MonikerKind = MonikerKind = {}));
	var MonikerRequest;
	(function(MonikerRequest$1) {
		MonikerRequest$1.method = "textDocument/moniker";
		MonikerRequest$1.messageDirection = messages_1$7.MessageDirection.clientToServer;
		MonikerRequest$1.type = new messages_1$7.ProtocolRequestType(MonikerRequest$1.method);
	})(MonikerRequest || (exports.MonikerRequest = MonikerRequest = {}));
}));
var require_protocol_typeHierarchy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
	const messages_1$6 = require_messages();
	var TypeHierarchyPrepareRequest;
	(function(TypeHierarchyPrepareRequest$1) {
		TypeHierarchyPrepareRequest$1.method = "textDocument/prepareTypeHierarchy";
		TypeHierarchyPrepareRequest$1.messageDirection = messages_1$6.MessageDirection.clientToServer;
		TypeHierarchyPrepareRequest$1.type = new messages_1$6.ProtocolRequestType(TypeHierarchyPrepareRequest$1.method);
	})(TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
	var TypeHierarchySupertypesRequest;
	(function(TypeHierarchySupertypesRequest$1) {
		TypeHierarchySupertypesRequest$1.method = "typeHierarchy/supertypes";
		TypeHierarchySupertypesRequest$1.messageDirection = messages_1$6.MessageDirection.clientToServer;
		TypeHierarchySupertypesRequest$1.type = new messages_1$6.ProtocolRequestType(TypeHierarchySupertypesRequest$1.method);
	})(TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
	var TypeHierarchySubtypesRequest;
	(function(TypeHierarchySubtypesRequest$1) {
		TypeHierarchySubtypesRequest$1.method = "typeHierarchy/subtypes";
		TypeHierarchySubtypesRequest$1.messageDirection = messages_1$6.MessageDirection.clientToServer;
		TypeHierarchySubtypesRequest$1.type = new messages_1$6.ProtocolRequestType(TypeHierarchySubtypesRequest$1.method);
	})(TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
}));
var require_protocol_inlineValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InlineValueRefreshRequest = exports.InlineValueRequest = void 0;
	const messages_1$5 = require_messages();
	var InlineValueRequest;
	(function(InlineValueRequest$1) {
		InlineValueRequest$1.method = "textDocument/inlineValue";
		InlineValueRequest$1.messageDirection = messages_1$5.MessageDirection.clientToServer;
		InlineValueRequest$1.type = new messages_1$5.ProtocolRequestType(InlineValueRequest$1.method);
	})(InlineValueRequest || (exports.InlineValueRequest = InlineValueRequest = {}));
	var InlineValueRefreshRequest;
	(function(InlineValueRefreshRequest$1) {
		InlineValueRefreshRequest$1.method = `workspace/inlineValue/refresh`;
		InlineValueRefreshRequest$1.messageDirection = messages_1$5.MessageDirection.serverToClient;
		InlineValueRefreshRequest$1.type = new messages_1$5.ProtocolRequestType0(InlineValueRefreshRequest$1.method);
	})(InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
}));
var require_protocol_inlayHint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = void 0;
	const messages_1$4 = require_messages();
	var InlayHintRequest;
	(function(InlayHintRequest$1) {
		InlayHintRequest$1.method = "textDocument/inlayHint";
		InlayHintRequest$1.messageDirection = messages_1$4.MessageDirection.clientToServer;
		InlayHintRequest$1.type = new messages_1$4.ProtocolRequestType(InlayHintRequest$1.method);
	})(InlayHintRequest || (exports.InlayHintRequest = InlayHintRequest = {}));
	var InlayHintResolveRequest;
	(function(InlayHintResolveRequest$1) {
		InlayHintResolveRequest$1.method = "inlayHint/resolve";
		InlayHintResolveRequest$1.messageDirection = messages_1$4.MessageDirection.clientToServer;
		InlayHintResolveRequest$1.type = new messages_1$4.ProtocolRequestType(InlayHintResolveRequest$1.method);
	})(InlayHintResolveRequest || (exports.InlayHintResolveRequest = InlayHintResolveRequest = {}));
	var InlayHintRefreshRequest;
	(function(InlayHintRefreshRequest$1) {
		InlayHintRefreshRequest$1.method = `workspace/inlayHint/refresh`;
		InlayHintRefreshRequest$1.messageDirection = messages_1$4.MessageDirection.serverToClient;
		InlayHintRefreshRequest$1.type = new messages_1$4.ProtocolRequestType0(InlayHintRefreshRequest$1.method);
	})(InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
}));
var require_protocol_diagnostic = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = void 0;
	const vscode_jsonrpc_1$1 = require_main$1();
	const Is$2 = require_is();
	const messages_1$3 = require_messages();
	var DiagnosticServerCancellationData;
	(function(DiagnosticServerCancellationData$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && Is$2.boolean(candidate.retriggerRequest);
		}
		DiagnosticServerCancellationData$1.is = is$1;
	})(DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
	var DocumentDiagnosticReportKind;
	(function(DocumentDiagnosticReportKind$1) {
		DocumentDiagnosticReportKind$1.Full = "full";
		DocumentDiagnosticReportKind$1.Unchanged = "unchanged";
	})(DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
	var DocumentDiagnosticRequest;
	(function(DocumentDiagnosticRequest$1) {
		DocumentDiagnosticRequest$1.method = "textDocument/diagnostic";
		DocumentDiagnosticRequest$1.messageDirection = messages_1$3.MessageDirection.clientToServer;
		DocumentDiagnosticRequest$1.type = new messages_1$3.ProtocolRequestType(DocumentDiagnosticRequest$1.method);
		DocumentDiagnosticRequest$1.partialResult = new vscode_jsonrpc_1$1.ProgressType();
	})(DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
	var WorkspaceDiagnosticRequest;
	(function(WorkspaceDiagnosticRequest$1) {
		WorkspaceDiagnosticRequest$1.method = "workspace/diagnostic";
		WorkspaceDiagnosticRequest$1.messageDirection = messages_1$3.MessageDirection.clientToServer;
		WorkspaceDiagnosticRequest$1.type = new messages_1$3.ProtocolRequestType(WorkspaceDiagnosticRequest$1.method);
		WorkspaceDiagnosticRequest$1.partialResult = new vscode_jsonrpc_1$1.ProgressType();
	})(WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
	var DiagnosticRefreshRequest;
	(function(DiagnosticRefreshRequest$1) {
		DiagnosticRefreshRequest$1.method = `workspace/diagnostic/refresh`;
		DiagnosticRefreshRequest$1.messageDirection = messages_1$3.MessageDirection.serverToClient;
		DiagnosticRefreshRequest$1.type = new messages_1$3.ProtocolRequestType0(DiagnosticRefreshRequest$1.method);
	})(DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
}));
var require_protocol_notebook = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = void 0;
	const vscode_languageserver_types_1$1 = (init_main(), __toCommonJS(main_exports$1));
	const Is$1 = require_is();
	const messages_1$2 = require_messages();
	var NotebookCellKind;
	(function(NotebookCellKind$1) {
		NotebookCellKind$1.Markup = 1;
		NotebookCellKind$1.Code = 2;
		function is$1(value) {
			return value === 1 || value === 2;
		}
		NotebookCellKind$1.is = is$1;
	})(NotebookCellKind || (exports.NotebookCellKind = NotebookCellKind = {}));
	var ExecutionSummary;
	(function(ExecutionSummary$1) {
		function create(executionOrder, success) {
			const result = { executionOrder };
			if (success === true || success === false) result.success = success;
			return result;
		}
		ExecutionSummary$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$1.objectLiteral(candidate) && vscode_languageserver_types_1$1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is$1.boolean(candidate.success));
		}
		ExecutionSummary$1.is = is$1;
		function equals$1(one, other) {
			if (one === other) return true;
			if (one === null || one === void 0 || other === null || other === void 0) return false;
			return one.executionOrder === other.executionOrder && one.success === other.success;
		}
		ExecutionSummary$1.equals = equals$1;
	})(ExecutionSummary || (exports.ExecutionSummary = ExecutionSummary = {}));
	var NotebookCell;
	(function(NotebookCell$1) {
		function create(kind, document) {
			return {
				kind,
				document
			};
		}
		NotebookCell$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$1.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1$1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is$1.objectLiteral(candidate.metadata));
		}
		NotebookCell$1.is = is$1;
		function diff(one, two) {
			const result = /* @__PURE__ */ new Set();
			if (one.document !== two.document) result.add("document");
			if (one.kind !== two.kind) result.add("kind");
			if (one.executionSummary !== two.executionSummary) result.add("executionSummary");
			if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) result.add("metadata");
			if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) result.add("executionSummary");
			return result;
		}
		NotebookCell$1.diff = diff;
		function equalsMetadata(one, other) {
			if (one === other) return true;
			if (one === null || one === void 0 || other === null || other === void 0) return false;
			if (typeof one !== typeof other) return false;
			if (typeof one !== "object") return false;
			const oneArray = Array.isArray(one);
			const otherArray = Array.isArray(other);
			if (oneArray !== otherArray) return false;
			if (oneArray && otherArray) {
				if (one.length !== other.length) return false;
				for (let i = 0; i < one.length; i++) if (!equalsMetadata(one[i], other[i])) return false;
			}
			if (Is$1.objectLiteral(one) && Is$1.objectLiteral(other)) {
				const oneKeys = Object.keys(one);
				const otherKeys = Object.keys(other);
				if (oneKeys.length !== otherKeys.length) return false;
				oneKeys.sort();
				otherKeys.sort();
				if (!equalsMetadata(oneKeys, otherKeys)) return false;
				for (let i = 0; i < oneKeys.length; i++) {
					const prop = oneKeys[i];
					if (!equalsMetadata(one[prop], other[prop])) return false;
				}
			}
			return true;
		}
	})(NotebookCell || (exports.NotebookCell = NotebookCell = {}));
	var NotebookDocument;
	(function(NotebookDocument$1) {
		function create(uri, notebookType, version, cells) {
			return {
				uri,
				notebookType,
				version,
				cells
			};
		}
		NotebookDocument$1.create = create;
		function is$1(value) {
			const candidate = value;
			return Is$1.objectLiteral(candidate) && Is$1.string(candidate.uri) && vscode_languageserver_types_1$1.integer.is(candidate.version) && Is$1.typedArray(candidate.cells, NotebookCell.is);
		}
		NotebookDocument$1.is = is$1;
	})(NotebookDocument || (exports.NotebookDocument = NotebookDocument = {}));
	var NotebookDocumentSyncRegistrationType;
	(function(NotebookDocumentSyncRegistrationType$1) {
		NotebookDocumentSyncRegistrationType$1.method = "notebookDocument/sync";
		NotebookDocumentSyncRegistrationType$1.messageDirection = messages_1$2.MessageDirection.clientToServer;
		NotebookDocumentSyncRegistrationType$1.type = new messages_1$2.RegistrationType(NotebookDocumentSyncRegistrationType$1.method);
	})(NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
	var DidOpenNotebookDocumentNotification;
	(function(DidOpenNotebookDocumentNotification$1) {
		DidOpenNotebookDocumentNotification$1.method = "notebookDocument/didOpen";
		DidOpenNotebookDocumentNotification$1.messageDirection = messages_1$2.MessageDirection.clientToServer;
		DidOpenNotebookDocumentNotification$1.type = new messages_1$2.ProtocolNotificationType(DidOpenNotebookDocumentNotification$1.method);
		DidOpenNotebookDocumentNotification$1.registrationMethod = NotebookDocumentSyncRegistrationType.method;
	})(DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
	var NotebookCellArrayChange;
	(function(NotebookCellArrayChange$1) {
		function is$1(value) {
			const candidate = value;
			return Is$1.objectLiteral(candidate) && vscode_languageserver_types_1$1.uinteger.is(candidate.start) && vscode_languageserver_types_1$1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is$1.typedArray(candidate.cells, NotebookCell.is));
		}
		NotebookCellArrayChange$1.is = is$1;
		function create(start, deleteCount, cells) {
			const result = {
				start,
				deleteCount
			};
			if (cells !== void 0) result.cells = cells;
			return result;
		}
		NotebookCellArrayChange$1.create = create;
	})(NotebookCellArrayChange || (exports.NotebookCellArrayChange = NotebookCellArrayChange = {}));
	var DidChangeNotebookDocumentNotification;
	(function(DidChangeNotebookDocumentNotification$1) {
		DidChangeNotebookDocumentNotification$1.method = "notebookDocument/didChange";
		DidChangeNotebookDocumentNotification$1.messageDirection = messages_1$2.MessageDirection.clientToServer;
		DidChangeNotebookDocumentNotification$1.type = new messages_1$2.ProtocolNotificationType(DidChangeNotebookDocumentNotification$1.method);
		DidChangeNotebookDocumentNotification$1.registrationMethod = NotebookDocumentSyncRegistrationType.method;
	})(DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
	var DidSaveNotebookDocumentNotification;
	(function(DidSaveNotebookDocumentNotification$1) {
		DidSaveNotebookDocumentNotification$1.method = "notebookDocument/didSave";
		DidSaveNotebookDocumentNotification$1.messageDirection = messages_1$2.MessageDirection.clientToServer;
		DidSaveNotebookDocumentNotification$1.type = new messages_1$2.ProtocolNotificationType(DidSaveNotebookDocumentNotification$1.method);
		DidSaveNotebookDocumentNotification$1.registrationMethod = NotebookDocumentSyncRegistrationType.method;
	})(DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
	var DidCloseNotebookDocumentNotification;
	(function(DidCloseNotebookDocumentNotification$1) {
		DidCloseNotebookDocumentNotification$1.method = "notebookDocument/didClose";
		DidCloseNotebookDocumentNotification$1.messageDirection = messages_1$2.MessageDirection.clientToServer;
		DidCloseNotebookDocumentNotification$1.type = new messages_1$2.ProtocolNotificationType(DidCloseNotebookDocumentNotification$1.method);
		DidCloseNotebookDocumentNotification$1.registrationMethod = NotebookDocumentSyncRegistrationType.method;
	})(DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
}));
var require_protocol_inlineCompletion = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InlineCompletionRequest = void 0;
	const messages_1$1 = require_messages();
	var InlineCompletionRequest;
	(function(InlineCompletionRequest$1) {
		InlineCompletionRequest$1.method = "textDocument/inlineCompletion";
		InlineCompletionRequest$1.messageDirection = messages_1$1.MessageDirection.clientToServer;
		InlineCompletionRequest$1.type = new messages_1$1.ProtocolRequestType(InlineCompletionRequest$1.method);
	})(InlineCompletionRequest || (exports.InlineCompletionRequest = InlineCompletionRequest = {}));
}));
var require_protocol = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = void 0;
	exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangesFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = void 0;
	exports.InlineCompletionRequest = exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
	const messages_1 = require_messages();
	const vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports$1));
	const Is = require_is();
	const protocol_implementation_1 = require_protocol_implementation();
	Object.defineProperty(exports, "ImplementationRequest", {
		enumerable: true,
		get: function() {
			return protocol_implementation_1.ImplementationRequest;
		}
	});
	const protocol_typeDefinition_1 = require_protocol_typeDefinition();
	Object.defineProperty(exports, "TypeDefinitionRequest", {
		enumerable: true,
		get: function() {
			return protocol_typeDefinition_1.TypeDefinitionRequest;
		}
	});
	const protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
	Object.defineProperty(exports, "WorkspaceFoldersRequest", {
		enumerable: true,
		get: function() {
			return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
		}
	});
	Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", {
		enumerable: true,
		get: function() {
			return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
		}
	});
	const protocol_configuration_1 = require_protocol_configuration();
	Object.defineProperty(exports, "ConfigurationRequest", {
		enumerable: true,
		get: function() {
			return protocol_configuration_1.ConfigurationRequest;
		}
	});
	const protocol_colorProvider_1 = require_protocol_colorProvider();
	Object.defineProperty(exports, "DocumentColorRequest", {
		enumerable: true,
		get: function() {
			return protocol_colorProvider_1.DocumentColorRequest;
		}
	});
	Object.defineProperty(exports, "ColorPresentationRequest", {
		enumerable: true,
		get: function() {
			return protocol_colorProvider_1.ColorPresentationRequest;
		}
	});
	const protocol_foldingRange_1 = require_protocol_foldingRange();
	Object.defineProperty(exports, "FoldingRangeRequest", {
		enumerable: true,
		get: function() {
			return protocol_foldingRange_1.FoldingRangeRequest;
		}
	});
	Object.defineProperty(exports, "FoldingRangeRefreshRequest", {
		enumerable: true,
		get: function() {
			return protocol_foldingRange_1.FoldingRangeRefreshRequest;
		}
	});
	const protocol_declaration_1 = require_protocol_declaration();
	Object.defineProperty(exports, "DeclarationRequest", {
		enumerable: true,
		get: function() {
			return protocol_declaration_1.DeclarationRequest;
		}
	});
	const protocol_selectionRange_1 = require_protocol_selectionRange();
	Object.defineProperty(exports, "SelectionRangeRequest", {
		enumerable: true,
		get: function() {
			return protocol_selectionRange_1.SelectionRangeRequest;
		}
	});
	const protocol_progress_1 = require_protocol_progress();
	Object.defineProperty(exports, "WorkDoneProgress", {
		enumerable: true,
		get: function() {
			return protocol_progress_1.WorkDoneProgress;
		}
	});
	Object.defineProperty(exports, "WorkDoneProgressCreateRequest", {
		enumerable: true,
		get: function() {
			return protocol_progress_1.WorkDoneProgressCreateRequest;
		}
	});
	Object.defineProperty(exports, "WorkDoneProgressCancelNotification", {
		enumerable: true,
		get: function() {
			return protocol_progress_1.WorkDoneProgressCancelNotification;
		}
	});
	const protocol_callHierarchy_1 = require_protocol_callHierarchy();
	Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", {
		enumerable: true,
		get: function() {
			return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
		}
	});
	Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", {
		enumerable: true,
		get: function() {
			return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
		}
	});
	Object.defineProperty(exports, "CallHierarchyPrepareRequest", {
		enumerable: true,
		get: function() {
			return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
		}
	});
	const protocol_semanticTokens_1 = require_protocol_semanticTokens();
	Object.defineProperty(exports, "TokenFormat", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.TokenFormat;
		}
	});
	Object.defineProperty(exports, "SemanticTokensRequest", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.SemanticTokensRequest;
		}
	});
	Object.defineProperty(exports, "SemanticTokensDeltaRequest", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
		}
	});
	Object.defineProperty(exports, "SemanticTokensRangeRequest", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.SemanticTokensRangeRequest;
		}
	});
	Object.defineProperty(exports, "SemanticTokensRefreshRequest", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
		}
	});
	Object.defineProperty(exports, "SemanticTokensRegistrationType", {
		enumerable: true,
		get: function() {
			return protocol_semanticTokens_1.SemanticTokensRegistrationType;
		}
	});
	const protocol_showDocument_1 = require_protocol_showDocument();
	Object.defineProperty(exports, "ShowDocumentRequest", {
		enumerable: true,
		get: function() {
			return protocol_showDocument_1.ShowDocumentRequest;
		}
	});
	const protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
	Object.defineProperty(exports, "LinkedEditingRangeRequest", {
		enumerable: true,
		get: function() {
			return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
		}
	});
	const protocol_fileOperations_1 = require_protocol_fileOperations();
	Object.defineProperty(exports, "FileOperationPatternKind", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.FileOperationPatternKind;
		}
	});
	Object.defineProperty(exports, "DidCreateFilesNotification", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.DidCreateFilesNotification;
		}
	});
	Object.defineProperty(exports, "WillCreateFilesRequest", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.WillCreateFilesRequest;
		}
	});
	Object.defineProperty(exports, "DidRenameFilesNotification", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.DidRenameFilesNotification;
		}
	});
	Object.defineProperty(exports, "WillRenameFilesRequest", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.WillRenameFilesRequest;
		}
	});
	Object.defineProperty(exports, "DidDeleteFilesNotification", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.DidDeleteFilesNotification;
		}
	});
	Object.defineProperty(exports, "WillDeleteFilesRequest", {
		enumerable: true,
		get: function() {
			return protocol_fileOperations_1.WillDeleteFilesRequest;
		}
	});
	const protocol_moniker_1 = require_protocol_moniker();
	Object.defineProperty(exports, "UniquenessLevel", {
		enumerable: true,
		get: function() {
			return protocol_moniker_1.UniquenessLevel;
		}
	});
	Object.defineProperty(exports, "MonikerKind", {
		enumerable: true,
		get: function() {
			return protocol_moniker_1.MonikerKind;
		}
	});
	Object.defineProperty(exports, "MonikerRequest", {
		enumerable: true,
		get: function() {
			return protocol_moniker_1.MonikerRequest;
		}
	});
	const protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
	Object.defineProperty(exports, "TypeHierarchyPrepareRequest", {
		enumerable: true,
		get: function() {
			return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
		}
	});
	Object.defineProperty(exports, "TypeHierarchySubtypesRequest", {
		enumerable: true,
		get: function() {
			return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
		}
	});
	Object.defineProperty(exports, "TypeHierarchySupertypesRequest", {
		enumerable: true,
		get: function() {
			return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
		}
	});
	const protocol_inlineValue_1 = require_protocol_inlineValue();
	Object.defineProperty(exports, "InlineValueRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlineValue_1.InlineValueRequest;
		}
	});
	Object.defineProperty(exports, "InlineValueRefreshRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlineValue_1.InlineValueRefreshRequest;
		}
	});
	const protocol_inlayHint_1 = require_protocol_inlayHint();
	Object.defineProperty(exports, "InlayHintRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlayHint_1.InlayHintRequest;
		}
	});
	Object.defineProperty(exports, "InlayHintResolveRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlayHint_1.InlayHintResolveRequest;
		}
	});
	Object.defineProperty(exports, "InlayHintRefreshRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlayHint_1.InlayHintRefreshRequest;
		}
	});
	const protocol_diagnostic_1 = require_protocol_diagnostic();
	Object.defineProperty(exports, "DiagnosticServerCancellationData", {
		enumerable: true,
		get: function() {
			return protocol_diagnostic_1.DiagnosticServerCancellationData;
		}
	});
	Object.defineProperty(exports, "DocumentDiagnosticReportKind", {
		enumerable: true,
		get: function() {
			return protocol_diagnostic_1.DocumentDiagnosticReportKind;
		}
	});
	Object.defineProperty(exports, "DocumentDiagnosticRequest", {
		enumerable: true,
		get: function() {
			return protocol_diagnostic_1.DocumentDiagnosticRequest;
		}
	});
	Object.defineProperty(exports, "WorkspaceDiagnosticRequest", {
		enumerable: true,
		get: function() {
			return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
		}
	});
	Object.defineProperty(exports, "DiagnosticRefreshRequest", {
		enumerable: true,
		get: function() {
			return protocol_diagnostic_1.DiagnosticRefreshRequest;
		}
	});
	const protocol_notebook_1 = require_protocol_notebook();
	Object.defineProperty(exports, "NotebookCellKind", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.NotebookCellKind;
		}
	});
	Object.defineProperty(exports, "ExecutionSummary", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.ExecutionSummary;
		}
	});
	Object.defineProperty(exports, "NotebookCell", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.NotebookCell;
		}
	});
	Object.defineProperty(exports, "NotebookDocument", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.NotebookDocument;
		}
	});
	Object.defineProperty(exports, "NotebookDocumentSyncRegistrationType", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
		}
	});
	Object.defineProperty(exports, "DidOpenNotebookDocumentNotification", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.DidOpenNotebookDocumentNotification;
		}
	});
	Object.defineProperty(exports, "NotebookCellArrayChange", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.NotebookCellArrayChange;
		}
	});
	Object.defineProperty(exports, "DidChangeNotebookDocumentNotification", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.DidChangeNotebookDocumentNotification;
		}
	});
	Object.defineProperty(exports, "DidSaveNotebookDocumentNotification", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.DidSaveNotebookDocumentNotification;
		}
	});
	Object.defineProperty(exports, "DidCloseNotebookDocumentNotification", {
		enumerable: true,
		get: function() {
			return protocol_notebook_1.DidCloseNotebookDocumentNotification;
		}
	});
	const protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
	Object.defineProperty(exports, "InlineCompletionRequest", {
		enumerable: true,
		get: function() {
			return protocol_inlineCompletion_1.InlineCompletionRequest;
		}
	});
	var TextDocumentFilter;
	(function(TextDocumentFilter$1) {
		function is$1(value) {
			const candidate = value;
			return Is.string(candidate) || Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
		}
		TextDocumentFilter$1.is = is$1;
	})(TextDocumentFilter || (exports.TextDocumentFilter = TextDocumentFilter = {}));
	var NotebookDocumentFilter;
	(function(NotebookDocumentFilter$1) {
		function is$1(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
		}
		NotebookDocumentFilter$1.is = is$1;
	})(NotebookDocumentFilter || (exports.NotebookDocumentFilter = NotebookDocumentFilter = {}));
	var NotebookCellTextDocumentFilter;
	(function(NotebookCellTextDocumentFilter$1) {
		function is$1(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is.string(candidate.language));
		}
		NotebookCellTextDocumentFilter$1.is = is$1;
	})(NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
	var DocumentSelector;
	(function(DocumentSelector$1) {
		function is$1(value) {
			if (!Array.isArray(value)) return false;
			for (let elem of value) if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) return false;
			return true;
		}
		DocumentSelector$1.is = is$1;
	})(DocumentSelector || (exports.DocumentSelector = DocumentSelector = {}));
	var RegistrationRequest;
	(function(RegistrationRequest$1) {
		RegistrationRequest$1.method = "client/registerCapability";
		RegistrationRequest$1.messageDirection = messages_1.MessageDirection.serverToClient;
		RegistrationRequest$1.type = new messages_1.ProtocolRequestType(RegistrationRequest$1.method);
	})(RegistrationRequest || (exports.RegistrationRequest = RegistrationRequest = {}));
	var UnregistrationRequest;
	(function(UnregistrationRequest$1) {
		UnregistrationRequest$1.method = "client/unregisterCapability";
		UnregistrationRequest$1.messageDirection = messages_1.MessageDirection.serverToClient;
		UnregistrationRequest$1.type = new messages_1.ProtocolRequestType(UnregistrationRequest$1.method);
	})(UnregistrationRequest || (exports.UnregistrationRequest = UnregistrationRequest = {}));
	var ResourceOperationKind;
	(function(ResourceOperationKind$1) {
		ResourceOperationKind$1.Create = "create";
		ResourceOperationKind$1.Rename = "rename";
		ResourceOperationKind$1.Delete = "delete";
	})(ResourceOperationKind || (exports.ResourceOperationKind = ResourceOperationKind = {}));
	var FailureHandlingKind;
	(function(FailureHandlingKind$1) {
		FailureHandlingKind$1.Abort = "abort";
		FailureHandlingKind$1.Transactional = "transactional";
		FailureHandlingKind$1.TextOnlyTransactional = "textOnlyTransactional";
		FailureHandlingKind$1.Undo = "undo";
	})(FailureHandlingKind || (exports.FailureHandlingKind = FailureHandlingKind = {}));
	var PositionEncodingKind;
	(function(PositionEncodingKind$1) {
		PositionEncodingKind$1.UTF8 = "utf-8";
		PositionEncodingKind$1.UTF16 = "utf-16";
		PositionEncodingKind$1.UTF32 = "utf-32";
	})(PositionEncodingKind || (exports.PositionEncodingKind = PositionEncodingKind = {}));
	var StaticRegistrationOptions;
	(function(StaticRegistrationOptions$1) {
		function hasId(value) {
			const candidate = value;
			return candidate && Is.string(candidate.id) && candidate.id.length > 0;
		}
		StaticRegistrationOptions$1.hasId = hasId;
	})(StaticRegistrationOptions || (exports.StaticRegistrationOptions = StaticRegistrationOptions = {}));
	var TextDocumentRegistrationOptions;
	(function(TextDocumentRegistrationOptions$1) {
		function is$1(value) {
			const candidate = value;
			return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
		}
		TextDocumentRegistrationOptions$1.is = is$1;
	})(TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
	var WorkDoneProgressOptions;
	(function(WorkDoneProgressOptions$1) {
		function is$1(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is.boolean(candidate.workDoneProgress));
		}
		WorkDoneProgressOptions$1.is = is$1;
		function hasWorkDoneProgress(value) {
			const candidate = value;
			return candidate && Is.boolean(candidate.workDoneProgress);
		}
		WorkDoneProgressOptions$1.hasWorkDoneProgress = hasWorkDoneProgress;
	})(WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
	var InitializeRequest$1;
	(function(InitializeRequest$2) {
		InitializeRequest$2.method = "initialize";
		InitializeRequest$2.messageDirection = messages_1.MessageDirection.clientToServer;
		InitializeRequest$2.type = new messages_1.ProtocolRequestType(InitializeRequest$2.method);
	})(InitializeRequest$1 || (exports.InitializeRequest = InitializeRequest$1 = {}));
	var InitializeErrorCodes;
	(function(InitializeErrorCodes$1) {
		InitializeErrorCodes$1.unknownProtocolVersion = 1;
	})(InitializeErrorCodes || (exports.InitializeErrorCodes = InitializeErrorCodes = {}));
	var InitializedNotification;
	(function(InitializedNotification$1) {
		InitializedNotification$1.method = "initialized";
		InitializedNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		InitializedNotification$1.type = new messages_1.ProtocolNotificationType(InitializedNotification$1.method);
	})(InitializedNotification || (exports.InitializedNotification = InitializedNotification = {}));
	var ShutdownRequest;
	(function(ShutdownRequest$1) {
		ShutdownRequest$1.method = "shutdown";
		ShutdownRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		ShutdownRequest$1.type = new messages_1.ProtocolRequestType0(ShutdownRequest$1.method);
	})(ShutdownRequest || (exports.ShutdownRequest = ShutdownRequest = {}));
	var ExitNotification;
	(function(ExitNotification$1) {
		ExitNotification$1.method = "exit";
		ExitNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		ExitNotification$1.type = new messages_1.ProtocolNotificationType0(ExitNotification$1.method);
	})(ExitNotification || (exports.ExitNotification = ExitNotification = {}));
	var DidChangeConfigurationNotification;
	(function(DidChangeConfigurationNotification$1) {
		DidChangeConfigurationNotification$1.method = "workspace/didChangeConfiguration";
		DidChangeConfigurationNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidChangeConfigurationNotification$1.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification$1.method);
	})(DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
	var MessageType;
	(function(MessageType$1) {
		MessageType$1.Error = 1;
		MessageType$1.Warning = 2;
		MessageType$1.Info = 3;
		MessageType$1.Log = 4;
		MessageType$1.Debug = 5;
	})(MessageType || (exports.MessageType = MessageType = {}));
	var ShowMessageNotification;
	(function(ShowMessageNotification$1) {
		ShowMessageNotification$1.method = "window/showMessage";
		ShowMessageNotification$1.messageDirection = messages_1.MessageDirection.serverToClient;
		ShowMessageNotification$1.type = new messages_1.ProtocolNotificationType(ShowMessageNotification$1.method);
	})(ShowMessageNotification || (exports.ShowMessageNotification = ShowMessageNotification = {}));
	var ShowMessageRequest;
	(function(ShowMessageRequest$1) {
		ShowMessageRequest$1.method = "window/showMessageRequest";
		ShowMessageRequest$1.messageDirection = messages_1.MessageDirection.serverToClient;
		ShowMessageRequest$1.type = new messages_1.ProtocolRequestType(ShowMessageRequest$1.method);
	})(ShowMessageRequest || (exports.ShowMessageRequest = ShowMessageRequest = {}));
	var LogMessageNotification;
	(function(LogMessageNotification$1) {
		LogMessageNotification$1.method = "window/logMessage";
		LogMessageNotification$1.messageDirection = messages_1.MessageDirection.serverToClient;
		LogMessageNotification$1.type = new messages_1.ProtocolNotificationType(LogMessageNotification$1.method);
	})(LogMessageNotification || (exports.LogMessageNotification = LogMessageNotification = {}));
	var TelemetryEventNotification;
	(function(TelemetryEventNotification$1) {
		TelemetryEventNotification$1.method = "telemetry/event";
		TelemetryEventNotification$1.messageDirection = messages_1.MessageDirection.serverToClient;
		TelemetryEventNotification$1.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification$1.method);
	})(TelemetryEventNotification || (exports.TelemetryEventNotification = TelemetryEventNotification = {}));
	var TextDocumentSyncKind$1;
	(function(TextDocumentSyncKind$2) {
		TextDocumentSyncKind$2.None = 0;
		TextDocumentSyncKind$2.Full = 1;
		TextDocumentSyncKind$2.Incremental = 2;
	})(TextDocumentSyncKind$1 || (exports.TextDocumentSyncKind = TextDocumentSyncKind$1 = {}));
	var DidOpenTextDocumentNotification$1;
	(function(DidOpenTextDocumentNotification$2) {
		DidOpenTextDocumentNotification$2.method = "textDocument/didOpen";
		DidOpenTextDocumentNotification$2.messageDirection = messages_1.MessageDirection.clientToServer;
		DidOpenTextDocumentNotification$2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification$2.method);
	})(DidOpenTextDocumentNotification$1 || (exports.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification$1 = {}));
	var TextDocumentContentChangeEvent;
	(function(TextDocumentContentChangeEvent$1) {
		function isIncremental(event) {
			let candidate = event;
			return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
		}
		TextDocumentContentChangeEvent$1.isIncremental = isIncremental;
		function isFull(event) {
			let candidate = event;
			return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
		}
		TextDocumentContentChangeEvent$1.isFull = isFull;
	})(TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
	var DidChangeTextDocumentNotification$1;
	(function(DidChangeTextDocumentNotification$2) {
		DidChangeTextDocumentNotification$2.method = "textDocument/didChange";
		DidChangeTextDocumentNotification$2.messageDirection = messages_1.MessageDirection.clientToServer;
		DidChangeTextDocumentNotification$2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification$2.method);
	})(DidChangeTextDocumentNotification$1 || (exports.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification$1 = {}));
	var DidCloseTextDocumentNotification;
	(function(DidCloseTextDocumentNotification$1) {
		DidCloseTextDocumentNotification$1.method = "textDocument/didClose";
		DidCloseTextDocumentNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidCloseTextDocumentNotification$1.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification$1.method);
	})(DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
	var DidSaveTextDocumentNotification;
	(function(DidSaveTextDocumentNotification$1) {
		DidSaveTextDocumentNotification$1.method = "textDocument/didSave";
		DidSaveTextDocumentNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidSaveTextDocumentNotification$1.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification$1.method);
	})(DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
	var TextDocumentSaveReason;
	(function(TextDocumentSaveReason$1) {
		TextDocumentSaveReason$1.Manual = 1;
		TextDocumentSaveReason$1.AfterDelay = 2;
		TextDocumentSaveReason$1.FocusOut = 3;
	})(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));
	var WillSaveTextDocumentNotification;
	(function(WillSaveTextDocumentNotification$1) {
		WillSaveTextDocumentNotification$1.method = "textDocument/willSave";
		WillSaveTextDocumentNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		WillSaveTextDocumentNotification$1.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification$1.method);
	})(WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
	var WillSaveTextDocumentWaitUntilRequest;
	(function(WillSaveTextDocumentWaitUntilRequest$1) {
		WillSaveTextDocumentWaitUntilRequest$1.method = "textDocument/willSaveWaitUntil";
		WillSaveTextDocumentWaitUntilRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		WillSaveTextDocumentWaitUntilRequest$1.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest$1.method);
	})(WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
	var DidChangeWatchedFilesNotification;
	(function(DidChangeWatchedFilesNotification$1) {
		DidChangeWatchedFilesNotification$1.method = "workspace/didChangeWatchedFiles";
		DidChangeWatchedFilesNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidChangeWatchedFilesNotification$1.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification$1.method);
	})(DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
	var FileChangeType;
	(function(FileChangeType$1) {
		FileChangeType$1.Created = 1;
		FileChangeType$1.Changed = 2;
		FileChangeType$1.Deleted = 3;
	})(FileChangeType || (exports.FileChangeType = FileChangeType = {}));
	var RelativePattern;
	(function(RelativePattern$1) {
		function is$1(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
		}
		RelativePattern$1.is = is$1;
	})(RelativePattern || (exports.RelativePattern = RelativePattern = {}));
	var WatchKind;
	(function(WatchKind$1) {
		WatchKind$1.Create = 1;
		WatchKind$1.Change = 2;
		WatchKind$1.Delete = 4;
	})(WatchKind || (exports.WatchKind = WatchKind = {}));
	var PublishDiagnosticsNotification$1;
	(function(PublishDiagnosticsNotification$2) {
		PublishDiagnosticsNotification$2.method = "textDocument/publishDiagnostics";
		PublishDiagnosticsNotification$2.messageDirection = messages_1.MessageDirection.serverToClient;
		PublishDiagnosticsNotification$2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification$2.method);
	})(PublishDiagnosticsNotification$1 || (exports.PublishDiagnosticsNotification = PublishDiagnosticsNotification$1 = {}));
	var CompletionTriggerKind;
	(function(CompletionTriggerKind$1) {
		CompletionTriggerKind$1.Invoked = 1;
		CompletionTriggerKind$1.TriggerCharacter = 2;
		CompletionTriggerKind$1.TriggerForIncompleteCompletions = 3;
	})(CompletionTriggerKind || (exports.CompletionTriggerKind = CompletionTriggerKind = {}));
	var CompletionRequest$1;
	(function(CompletionRequest$2) {
		CompletionRequest$2.method = "textDocument/completion";
		CompletionRequest$2.messageDirection = messages_1.MessageDirection.clientToServer;
		CompletionRequest$2.type = new messages_1.ProtocolRequestType(CompletionRequest$2.method);
	})(CompletionRequest$1 || (exports.CompletionRequest = CompletionRequest$1 = {}));
	var CompletionResolveRequest$1;
	(function(CompletionResolveRequest$2) {
		CompletionResolveRequest$2.method = "completionItem/resolve";
		CompletionResolveRequest$2.messageDirection = messages_1.MessageDirection.clientToServer;
		CompletionResolveRequest$2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest$2.method);
	})(CompletionResolveRequest$1 || (exports.CompletionResolveRequest = CompletionResolveRequest$1 = {}));
	var HoverRequest$1;
	(function(HoverRequest$2) {
		HoverRequest$2.method = "textDocument/hover";
		HoverRequest$2.messageDirection = messages_1.MessageDirection.clientToServer;
		HoverRequest$2.type = new messages_1.ProtocolRequestType(HoverRequest$2.method);
	})(HoverRequest$1 || (exports.HoverRequest = HoverRequest$1 = {}));
	var SignatureHelpTriggerKind;
	(function(SignatureHelpTriggerKind$1) {
		SignatureHelpTriggerKind$1.Invoked = 1;
		SignatureHelpTriggerKind$1.TriggerCharacter = 2;
		SignatureHelpTriggerKind$1.ContentChange = 3;
	})(SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
	var SignatureHelpRequest;
	(function(SignatureHelpRequest$1) {
		SignatureHelpRequest$1.method = "textDocument/signatureHelp";
		SignatureHelpRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		SignatureHelpRequest$1.type = new messages_1.ProtocolRequestType(SignatureHelpRequest$1.method);
	})(SignatureHelpRequest || (exports.SignatureHelpRequest = SignatureHelpRequest = {}));
	var DefinitionRequest;
	(function(DefinitionRequest$1) {
		DefinitionRequest$1.method = "textDocument/definition";
		DefinitionRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DefinitionRequest$1.type = new messages_1.ProtocolRequestType(DefinitionRequest$1.method);
	})(DefinitionRequest || (exports.DefinitionRequest = DefinitionRequest = {}));
	var ReferencesRequest;
	(function(ReferencesRequest$1) {
		ReferencesRequest$1.method = "textDocument/references";
		ReferencesRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		ReferencesRequest$1.type = new messages_1.ProtocolRequestType(ReferencesRequest$1.method);
	})(ReferencesRequest || (exports.ReferencesRequest = ReferencesRequest = {}));
	var DocumentHighlightRequest;
	(function(DocumentHighlightRequest$1) {
		DocumentHighlightRequest$1.method = "textDocument/documentHighlight";
		DocumentHighlightRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentHighlightRequest$1.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest$1.method);
	})(DocumentHighlightRequest || (exports.DocumentHighlightRequest = DocumentHighlightRequest = {}));
	var DocumentSymbolRequest;
	(function(DocumentSymbolRequest$1) {
		DocumentSymbolRequest$1.method = "textDocument/documentSymbol";
		DocumentSymbolRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentSymbolRequest$1.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest$1.method);
	})(DocumentSymbolRequest || (exports.DocumentSymbolRequest = DocumentSymbolRequest = {}));
	var CodeActionRequest;
	(function(CodeActionRequest$1) {
		CodeActionRequest$1.method = "textDocument/codeAction";
		CodeActionRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CodeActionRequest$1.type = new messages_1.ProtocolRequestType(CodeActionRequest$1.method);
	})(CodeActionRequest || (exports.CodeActionRequest = CodeActionRequest = {}));
	var CodeActionResolveRequest;
	(function(CodeActionResolveRequest$1) {
		CodeActionResolveRequest$1.method = "codeAction/resolve";
		CodeActionResolveRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CodeActionResolveRequest$1.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest$1.method);
	})(CodeActionResolveRequest || (exports.CodeActionResolveRequest = CodeActionResolveRequest = {}));
	var WorkspaceSymbolRequest;
	(function(WorkspaceSymbolRequest$1) {
		WorkspaceSymbolRequest$1.method = "workspace/symbol";
		WorkspaceSymbolRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		WorkspaceSymbolRequest$1.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest$1.method);
	})(WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
	var WorkspaceSymbolResolveRequest;
	(function(WorkspaceSymbolResolveRequest$1) {
		WorkspaceSymbolResolveRequest$1.method = "workspaceSymbol/resolve";
		WorkspaceSymbolResolveRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		WorkspaceSymbolResolveRequest$1.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest$1.method);
	})(WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
	var CodeLensRequest;
	(function(CodeLensRequest$1) {
		CodeLensRequest$1.method = "textDocument/codeLens";
		CodeLensRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CodeLensRequest$1.type = new messages_1.ProtocolRequestType(CodeLensRequest$1.method);
	})(CodeLensRequest || (exports.CodeLensRequest = CodeLensRequest = {}));
	var CodeLensResolveRequest;
	(function(CodeLensResolveRequest$1) {
		CodeLensResolveRequest$1.method = "codeLens/resolve";
		CodeLensResolveRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CodeLensResolveRequest$1.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest$1.method);
	})(CodeLensResolveRequest || (exports.CodeLensResolveRequest = CodeLensResolveRequest = {}));
	var CodeLensRefreshRequest;
	(function(CodeLensRefreshRequest$1) {
		CodeLensRefreshRequest$1.method = `workspace/codeLens/refresh`;
		CodeLensRefreshRequest$1.messageDirection = messages_1.MessageDirection.serverToClient;
		CodeLensRefreshRequest$1.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest$1.method);
	})(CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
	var DocumentLinkRequest;
	(function(DocumentLinkRequest$1) {
		DocumentLinkRequest$1.method = "textDocument/documentLink";
		DocumentLinkRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentLinkRequest$1.type = new messages_1.ProtocolRequestType(DocumentLinkRequest$1.method);
	})(DocumentLinkRequest || (exports.DocumentLinkRequest = DocumentLinkRequest = {}));
	var DocumentLinkResolveRequest;
	(function(DocumentLinkResolveRequest$1) {
		DocumentLinkResolveRequest$1.method = "documentLink/resolve";
		DocumentLinkResolveRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentLinkResolveRequest$1.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest$1.method);
	})(DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
	var DocumentFormattingRequest;
	(function(DocumentFormattingRequest$1) {
		DocumentFormattingRequest$1.method = "textDocument/formatting";
		DocumentFormattingRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentFormattingRequest$1.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest$1.method);
	})(DocumentFormattingRequest || (exports.DocumentFormattingRequest = DocumentFormattingRequest = {}));
	var DocumentRangeFormattingRequest$1;
	(function(DocumentRangeFormattingRequest$2) {
		DocumentRangeFormattingRequest$2.method = "textDocument/rangeFormatting";
		DocumentRangeFormattingRequest$2.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentRangeFormattingRequest$2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest$2.method);
	})(DocumentRangeFormattingRequest$1 || (exports.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest$1 = {}));
	var DocumentRangesFormattingRequest;
	(function(DocumentRangesFormattingRequest$1) {
		DocumentRangesFormattingRequest$1.method = "textDocument/rangesFormatting";
		DocumentRangesFormattingRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentRangesFormattingRequest$1.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest$1.method);
	})(DocumentRangesFormattingRequest || (exports.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
	var DocumentOnTypeFormattingRequest;
	(function(DocumentOnTypeFormattingRequest$1) {
		DocumentOnTypeFormattingRequest$1.method = "textDocument/onTypeFormatting";
		DocumentOnTypeFormattingRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentOnTypeFormattingRequest$1.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest$1.method);
	})(DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
	var PrepareSupportDefaultBehavior;
	(function(PrepareSupportDefaultBehavior$1) {
		PrepareSupportDefaultBehavior$1.Identifier = 1;
	})(PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
	var RenameRequest;
	(function(RenameRequest$1) {
		RenameRequest$1.method = "textDocument/rename";
		RenameRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		RenameRequest$1.type = new messages_1.ProtocolRequestType(RenameRequest$1.method);
	})(RenameRequest || (exports.RenameRequest = RenameRequest = {}));
	var PrepareRenameRequest;
	(function(PrepareRenameRequest$1) {
		PrepareRenameRequest$1.method = "textDocument/prepareRename";
		PrepareRenameRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		PrepareRenameRequest$1.type = new messages_1.ProtocolRequestType(PrepareRenameRequest$1.method);
	})(PrepareRenameRequest || (exports.PrepareRenameRequest = PrepareRenameRequest = {}));
	var ExecuteCommandRequest;
	(function(ExecuteCommandRequest$1) {
		ExecuteCommandRequest$1.method = "workspace/executeCommand";
		ExecuteCommandRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		ExecuteCommandRequest$1.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest$1.method);
	})(ExecuteCommandRequest || (exports.ExecuteCommandRequest = ExecuteCommandRequest = {}));
	var ApplyWorkspaceEditRequest;
	(function(ApplyWorkspaceEditRequest$1) {
		ApplyWorkspaceEditRequest$1.method = "workspace/applyEdit";
		ApplyWorkspaceEditRequest$1.messageDirection = messages_1.MessageDirection.serverToClient;
		ApplyWorkspaceEditRequest$1.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
	})(ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
}));
var require_connection = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createProtocolConnection = void 0;
	const vscode_jsonrpc_1 = require_main$1();
	function createProtocolConnection$2(input, output, logger, options) {
		if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
		return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
	}
	exports.createProtocolConnection = createProtocolConnection$2;
}));
var require_api = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
	var __exportStar$1 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$1(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LSPErrorCodes = exports.createProtocolConnection = void 0;
	__exportStar$1(require_main$1(), exports);
	__exportStar$1((init_main(), __toCommonJS(main_exports$1)), exports);
	__exportStar$1(require_messages(), exports);
	__exportStar$1(require_protocol(), exports);
	var connection_1 = require_connection();
	Object.defineProperty(exports, "createProtocolConnection", {
		enumerable: true,
		get: function() {
			return connection_1.createProtocolConnection;
		}
	});
	var LSPErrorCodes;
	(function(LSPErrorCodes$1) {
		LSPErrorCodes$1.lspReservedErrorRangeStart = -32899;
		LSPErrorCodes$1.RequestFailed = -32803;
		LSPErrorCodes$1.ServerCancelled = -32802;
		LSPErrorCodes$1.ContentModified = -32801;
		LSPErrorCodes$1.RequestCancelled = -32800;
		LSPErrorCodes$1.lspReservedErrorRangeEnd = -32800;
	})(LSPErrorCodes || (exports.LSPErrorCodes = LSPErrorCodes = {}));
}));
var require_main = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	exports.createProtocolConnection = void 0;
	const browser_1 = require_browser$1();
	__exportStar(require_browser$1(), exports);
	__exportStar(require_api(), exports);
	function createProtocolConnection$1(reader, writer, logger, options) {
		return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
	}
	exports.createProtocolConnection = createProtocolConnection$1;
}));
var import_browser = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_main();
})))();
var import_main$3 = /* @__PURE__ */ __toESM(require_main());
var LIB;
(() => {
	"use strict";
	var t$1 = { 975: (t$2) => {
		function e$1(t$3) {
			if ("string" != typeof t$3) throw new TypeError("Path must be a string. Received " + JSON.stringify(t$3));
		}
		function r$1(t$3, e$2) {
			for (var r$2, n$2 = "", i$1 = 0, o$1 = -1, s$1 = 0, h$1 = 0; h$1 <= t$3.length; ++h$1) {
				if (h$1 < t$3.length) r$2 = t$3.charCodeAt(h$1);
				else {
					if (47 === r$2) break;
					r$2 = 47;
				}
				if (47 === r$2) {
					if (o$1 === h$1 - 1 || 1 === s$1);
					else if (o$1 !== h$1 - 1 && 2 === s$1) {
						if (n$2.length < 2 || 2 !== i$1 || 46 !== n$2.charCodeAt(n$2.length - 1) || 46 !== n$2.charCodeAt(n$2.length - 2)) {
							if (n$2.length > 2) {
								var a$2 = n$2.lastIndexOf("/");
								if (a$2 !== n$2.length - 1) {
									-1 === a$2 ? (n$2 = "", i$1 = 0) : i$1 = (n$2 = n$2.slice(0, a$2)).length - 1 - n$2.lastIndexOf("/"), o$1 = h$1, s$1 = 0;
									continue;
								}
							} else if (2 === n$2.length || 1 === n$2.length) {
								n$2 = "", i$1 = 0, o$1 = h$1, s$1 = 0;
								continue;
							}
						}
						e$2 && (n$2.length > 0 ? n$2 += "/.." : n$2 = "..", i$1 = 2);
					} else n$2.length > 0 ? n$2 += "/" + t$3.slice(o$1 + 1, h$1) : n$2 = t$3.slice(o$1 + 1, h$1), i$1 = h$1 - o$1 - 1;
					o$1 = h$1, s$1 = 0;
				} else 46 === r$2 && -1 !== s$1 ? ++s$1 : s$1 = -1;
			}
			return n$2;
		}
		var n$1 = {
			resolve: function() {
				for (var t$3, n$2 = "", i$1 = !1, o$1 = arguments.length - 1; o$1 >= -1 && !i$1; o$1--) {
					var s$1;
					o$1 >= 0 ? s$1 = arguments[o$1] : (void 0 === t$3 && (t$3 = process.cwd()), s$1 = t$3), e$1(s$1), 0 !== s$1.length && (n$2 = s$1 + "/" + n$2, i$1 = 47 === s$1.charCodeAt(0));
				}
				return n$2 = r$1(n$2, !i$1), i$1 ? n$2.length > 0 ? "/" + n$2 : "/" : n$2.length > 0 ? n$2 : ".";
			},
			normalize: function(t$3) {
				if (e$1(t$3), 0 === t$3.length) return ".";
				var n$2 = 47 === t$3.charCodeAt(0), i$1 = 47 === t$3.charCodeAt(t$3.length - 1);
				return 0 !== (t$3 = r$1(t$3, !n$2)).length || n$2 || (t$3 = "."), t$3.length > 0 && i$1 && (t$3 += "/"), n$2 ? "/" + t$3 : t$3;
			},
			isAbsolute: function(t$3) {
				return e$1(t$3), t$3.length > 0 && 47 === t$3.charCodeAt(0);
			},
			join: function() {
				if (0 === arguments.length) return ".";
				for (var t$3, r$2 = 0; r$2 < arguments.length; ++r$2) {
					var i$1 = arguments[r$2];
					e$1(i$1), i$1.length > 0 && (void 0 === t$3 ? t$3 = i$1 : t$3 += "/" + i$1);
				}
				return void 0 === t$3 ? "." : n$1.normalize(t$3);
			},
			relative: function(t$3, r$2) {
				if (e$1(t$3), e$1(r$2), t$3 === r$2) return "";
				if ((t$3 = n$1.resolve(t$3)) === (r$2 = n$1.resolve(r$2))) return "";
				for (var i$1 = 1; i$1 < t$3.length && 47 === t$3.charCodeAt(i$1); ++i$1);
				for (var o$1 = t$3.length, s$1 = o$1 - i$1, h$1 = 1; h$1 < r$2.length && 47 === r$2.charCodeAt(h$1); ++h$1);
				for (var a$2 = r$2.length - h$1, c$1 = s$1 < a$2 ? s$1 : a$2, f$2 = -1, u$1 = 0; u$1 <= c$1; ++u$1) {
					if (u$1 === c$1) {
						if (a$2 > c$1) {
							if (47 === r$2.charCodeAt(h$1 + u$1)) return r$2.slice(h$1 + u$1 + 1);
							if (0 === u$1) return r$2.slice(h$1 + u$1);
						} else s$1 > c$1 && (47 === t$3.charCodeAt(i$1 + u$1) ? f$2 = u$1 : 0 === u$1 && (f$2 = 0));
						break;
					}
					var l$1 = t$3.charCodeAt(i$1 + u$1);
					if (l$1 !== r$2.charCodeAt(h$1 + u$1)) break;
					47 === l$1 && (f$2 = u$1);
				}
				var g$1 = "";
				for (u$1 = i$1 + f$2 + 1; u$1 <= o$1; ++u$1) u$1 !== o$1 && 47 !== t$3.charCodeAt(u$1) || (0 === g$1.length ? g$1 += ".." : g$1 += "/..");
				return g$1.length > 0 ? g$1 + r$2.slice(h$1 + f$2) : (h$1 += f$2, 47 === r$2.charCodeAt(h$1) && ++h$1, r$2.slice(h$1));
			},
			_makeLong: function(t$3) {
				return t$3;
			},
			dirname: function(t$3) {
				if (e$1(t$3), 0 === t$3.length) return ".";
				for (var r$2 = t$3.charCodeAt(0), n$2 = 47 === r$2, i$1 = -1, o$1 = !0, s$1 = t$3.length - 1; s$1 >= 1; --s$1) if (47 === (r$2 = t$3.charCodeAt(s$1))) {
					if (!o$1) {
						i$1 = s$1;
						break;
					}
				} else o$1 = !1;
				return -1 === i$1 ? n$2 ? "/" : "." : n$2 && 1 === i$1 ? "//" : t$3.slice(0, i$1);
			},
			basename: function(t$3, r$2) {
				if (void 0 !== r$2 && "string" != typeof r$2) throw new TypeError("\"ext\" argument must be a string");
				e$1(t$3);
				var n$2, i$1 = 0, o$1 = -1, s$1 = !0;
				if (void 0 !== r$2 && r$2.length > 0 && r$2.length <= t$3.length) {
					if (r$2.length === t$3.length && r$2 === t$3) return "";
					var h$1 = r$2.length - 1, a$2 = -1;
					for (n$2 = t$3.length - 1; n$2 >= 0; --n$2) {
						var c$1 = t$3.charCodeAt(n$2);
						if (47 === c$1) {
							if (!s$1) {
								i$1 = n$2 + 1;
								break;
							}
						} else -1 === a$2 && (s$1 = !1, a$2 = n$2 + 1), h$1 >= 0 && (c$1 === r$2.charCodeAt(h$1) ? -1 == --h$1 && (o$1 = n$2) : (h$1 = -1, o$1 = a$2));
					}
					return i$1 === o$1 ? o$1 = a$2 : -1 === o$1 && (o$1 = t$3.length), t$3.slice(i$1, o$1);
				}
				for (n$2 = t$3.length - 1; n$2 >= 0; --n$2) if (47 === t$3.charCodeAt(n$2)) {
					if (!s$1) {
						i$1 = n$2 + 1;
						break;
					}
				} else -1 === o$1 && (s$1 = !1, o$1 = n$2 + 1);
				return -1 === o$1 ? "" : t$3.slice(i$1, o$1);
			},
			extname: function(t$3) {
				e$1(t$3);
				for (var r$2 = -1, n$2 = 0, i$1 = -1, o$1 = !0, s$1 = 0, h$1 = t$3.length - 1; h$1 >= 0; --h$1) {
					var a$2 = t$3.charCodeAt(h$1);
					if (47 !== a$2) -1 === i$1 && (o$1 = !1, i$1 = h$1 + 1), 46 === a$2 ? -1 === r$2 ? r$2 = h$1 : 1 !== s$1 && (s$1 = 1) : -1 !== r$2 && (s$1 = -1);
					else if (!o$1) {
						n$2 = h$1 + 1;
						break;
					}
				}
				return -1 === r$2 || -1 === i$1 || 0 === s$1 || 1 === s$1 && r$2 === i$1 - 1 && r$2 === n$2 + 1 ? "" : t$3.slice(r$2, i$1);
			},
			format: function(t$3) {
				if (null === t$3 || "object" != typeof t$3) throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof t$3);
				return function(t$4, e$2) {
					var r$2 = e$2.dir || e$2.root, n$2 = e$2.base || (e$2.name || "") + (e$2.ext || "");
					return r$2 ? r$2 === e$2.root ? r$2 + n$2 : r$2 + "/" + n$2 : n$2;
				}(0, t$3);
			},
			parse: function(t$3) {
				e$1(t$3);
				var r$2 = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (0 === t$3.length) return r$2;
				var n$2, i$1 = t$3.charCodeAt(0), o$1 = 47 === i$1;
				o$1 ? (r$2.root = "/", n$2 = 1) : n$2 = 0;
				for (var s$1 = -1, h$1 = 0, a$2 = -1, c$1 = !0, f$2 = t$3.length - 1, u$1 = 0; f$2 >= n$2; --f$2) if (47 !== (i$1 = t$3.charCodeAt(f$2))) -1 === a$2 && (c$1 = !1, a$2 = f$2 + 1), 46 === i$1 ? -1 === s$1 ? s$1 = f$2 : 1 !== u$1 && (u$1 = 1) : -1 !== s$1 && (u$1 = -1);
				else if (!c$1) {
					h$1 = f$2 + 1;
					break;
				}
				return -1 === s$1 || -1 === a$2 || 0 === u$1 || 1 === u$1 && s$1 === a$2 - 1 && s$1 === h$1 + 1 ? -1 !== a$2 && (r$2.base = r$2.name = 0 === h$1 && o$1 ? t$3.slice(1, a$2) : t$3.slice(h$1, a$2)) : (0 === h$1 && o$1 ? (r$2.name = t$3.slice(1, s$1), r$2.base = t$3.slice(1, a$2)) : (r$2.name = t$3.slice(h$1, s$1), r$2.base = t$3.slice(h$1, a$2)), r$2.ext = t$3.slice(s$1, a$2)), h$1 > 0 ? r$2.dir = t$3.slice(0, h$1 - 1) : o$1 && (r$2.dir = "/"), r$2;
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null
		};
		n$1.posix = n$1, t$2.exports = n$1;
	} }, e = {};
	function r(n$1) {
		var i$1 = e[n$1];
		if (void 0 !== i$1) return i$1.exports;
		var o$1 = e[n$1] = { exports: {} };
		return t$1[n$1](o$1, o$1.exports, r), o$1.exports;
	}
	r.d = (t$2, e$1) => {
		for (var n$1 in e$1) r.o(e$1, n$1) && !r.o(t$2, n$1) && Object.defineProperty(t$2, n$1, {
			enumerable: !0,
			get: e$1[n$1]
		});
	}, r.o = (t$2, e$1) => Object.prototype.hasOwnProperty.call(t$2, e$1), r.r = (t$2) => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t$2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t$2, "__esModule", { value: !0 });
	};
	var n = {};
	let i;
	if (r.r(n), r.d(n, {
		URI: () => l,
		Utils: () => I
	}), "object" == typeof process) i = "win32" === process.platform;
	else if ("object" == typeof navigator) i = navigator.userAgent.indexOf("Windows") >= 0;
	const o = /^\w[\w\d+.-]*$/, s = /^\//, h = /^\/\//;
	function a$1(t$2, e$1) {
		if (!t$2.scheme && e$1) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t$2.authority}", path: "${t$2.path}", query: "${t$2.query}", fragment: "${t$2.fragment}"}`);
		if (t$2.scheme && !o.test(t$2.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (t$2.path) {
			if (t$2.authority) {
				if (!s.test(t$2.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (h.test(t$2.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	const c = "", f$1 = "/", u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	class l {
		static isUri(t$2) {
			return t$2 instanceof l || !!t$2 && "string" == typeof t$2.authority && "string" == typeof t$2.fragment && "string" == typeof t$2.path && "string" == typeof t$2.query && "string" == typeof t$2.scheme && "string" == typeof t$2.fsPath && "function" == typeof t$2.with && "function" == typeof t$2.toString;
		}
		scheme;
		authority;
		path;
		query;
		fragment;
		constructor(t$2, e$1, r$1, n$1, i$1, o$1 = !1) {
			"object" == typeof t$2 ? (this.scheme = t$2.scheme || c, this.authority = t$2.authority || c, this.path = t$2.path || c, this.query = t$2.query || c, this.fragment = t$2.fragment || c) : (this.scheme = function(t$3, e$2) {
				return t$3 || e$2 ? t$3 : "file";
			}(t$2, o$1), this.authority = e$1 || c, this.path = function(t$3, e$2) {
				switch (t$3) {
					case "https":
					case "http":
					case "file": e$2 ? e$2[0] !== f$1 && (e$2 = f$1 + e$2) : e$2 = f$1;
				}
				return e$2;
			}(this.scheme, r$1 || c), this.query = n$1 || c, this.fragment = i$1 || c, a$1(this, o$1));
		}
		get fsPath() {
			return v(this, !1);
		}
		with(t$2) {
			if (!t$2) return this;
			let { scheme: e$1, authority: r$1, path: n$1, query: i$1, fragment: o$1 } = t$2;
			return void 0 === e$1 ? e$1 = this.scheme : null === e$1 && (e$1 = c), void 0 === r$1 ? r$1 = this.authority : null === r$1 && (r$1 = c), void 0 === n$1 ? n$1 = this.path : null === n$1 && (n$1 = c), void 0 === i$1 ? i$1 = this.query : null === i$1 && (i$1 = c), void 0 === o$1 ? o$1 = this.fragment : null === o$1 && (o$1 = c), e$1 === this.scheme && r$1 === this.authority && n$1 === this.path && i$1 === this.query && o$1 === this.fragment ? this : new d(e$1, r$1, n$1, i$1, o$1);
		}
		static parse(t$2, e$1 = !1) {
			const r$1 = u.exec(t$2);
			return r$1 ? new d(r$1[2] || c, w(r$1[4] || c), w(r$1[5] || c), w(r$1[7] || c), w(r$1[9] || c), e$1) : new d(c, c, c, c, c);
		}
		static file(t$2) {
			let e$1 = c;
			if (i && (t$2 = t$2.replace(/\\/g, f$1)), t$2[0] === f$1 && t$2[1] === f$1) {
				const r$1 = t$2.indexOf(f$1, 2);
				-1 === r$1 ? (e$1 = t$2.substring(2), t$2 = f$1) : (e$1 = t$2.substring(2, r$1), t$2 = t$2.substring(r$1) || f$1);
			}
			return new d("file", e$1, t$2, c, c);
		}
		static from(t$2) {
			const e$1 = new d(t$2.scheme, t$2.authority, t$2.path, t$2.query, t$2.fragment);
			return a$1(e$1, !0), e$1;
		}
		toString(t$2 = !1) {
			return b(this, t$2);
		}
		toJSON() {
			return this;
		}
		static revive(t$2) {
			if (t$2) {
				if (t$2 instanceof l) return t$2;
				{
					const e$1 = new d(t$2);
					return e$1._formatted = t$2.external, e$1._fsPath = t$2._sep === g ? t$2.fsPath : null, e$1;
				}
			}
			return t$2;
		}
	}
	const g = i ? 1 : void 0;
	class d extends l {
		_formatted = null;
		_fsPath = null;
		get fsPath() {
			return this._fsPath || (this._fsPath = v(this, !1)), this._fsPath;
		}
		toString(t$2 = !1) {
			return t$2 ? b(this, !0) : (this._formatted || (this._formatted = b(this, !1)), this._formatted);
		}
		toJSON() {
			const t$2 = { $mid: 1 };
			return this._fsPath && (t$2.fsPath = this._fsPath, t$2._sep = g), this._formatted && (t$2.external = this._formatted), this.path && (t$2.path = this.path), this.scheme && (t$2.scheme = this.scheme), this.authority && (t$2.authority = this.authority), this.query && (t$2.query = this.query), this.fragment && (t$2.fragment = this.fragment), t$2;
		}
	}
	const p = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20"
	};
	function m(t$2, e$1, r$1) {
		let n$1, i$1 = -1;
		for (let o$1 = 0; o$1 < t$2.length; o$1++) {
			const s$1 = t$2.charCodeAt(o$1);
			if (s$1 >= 97 && s$1 <= 122 || s$1 >= 65 && s$1 <= 90 || s$1 >= 48 && s$1 <= 57 || 45 === s$1 || 46 === s$1 || 95 === s$1 || 126 === s$1 || e$1 && 47 === s$1 || r$1 && 91 === s$1 || r$1 && 93 === s$1 || r$1 && 58 === s$1) -1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1, o$1)), i$1 = -1), void 0 !== n$1 && (n$1 += t$2.charAt(o$1));
			else {
				void 0 === n$1 && (n$1 = t$2.substr(0, o$1));
				const e$2 = p[s$1];
				void 0 !== e$2 ? (-1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1, o$1)), i$1 = -1), n$1 += e$2) : -1 === i$1 && (i$1 = o$1);
			}
		}
		return -1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1))), void 0 !== n$1 ? n$1 : t$2;
	}
	function y(t$2) {
		let e$1;
		for (let r$1 = 0; r$1 < t$2.length; r$1++) {
			const n$1 = t$2.charCodeAt(r$1);
			35 === n$1 || 63 === n$1 ? (void 0 === e$1 && (e$1 = t$2.substr(0, r$1)), e$1 += p[n$1]) : void 0 !== e$1 && (e$1 += t$2[r$1]);
		}
		return void 0 !== e$1 ? e$1 : t$2;
	}
	function v(t$2, e$1) {
		let r$1;
		return r$1 = t$2.authority && t$2.path.length > 1 && "file" === t$2.scheme ? `//${t$2.authority}${t$2.path}` : 47 === t$2.path.charCodeAt(0) && (t$2.path.charCodeAt(1) >= 65 && t$2.path.charCodeAt(1) <= 90 || t$2.path.charCodeAt(1) >= 97 && t$2.path.charCodeAt(1) <= 122) && 58 === t$2.path.charCodeAt(2) ? e$1 ? t$2.path.substr(1) : t$2.path[1].toLowerCase() + t$2.path.substr(2) : t$2.path, i && (r$1 = r$1.replace(/\//g, "\\")), r$1;
	}
	function b(t$2, e$1) {
		const r$1 = e$1 ? y : m;
		let n$1 = "", { scheme: i$1, authority: o$1, path: s$1, query: h$1, fragment: a$2 } = t$2;
		if (i$1 && (n$1 += i$1, n$1 += ":"), (o$1 || "file" === i$1) && (n$1 += f$1, n$1 += f$1), o$1) {
			let t$3 = o$1.indexOf("@");
			if (-1 !== t$3) {
				const e$2 = o$1.substr(0, t$3);
				o$1 = o$1.substr(t$3 + 1), t$3 = e$2.lastIndexOf(":"), -1 === t$3 ? n$1 += r$1(e$2, !1, !1) : (n$1 += r$1(e$2.substr(0, t$3), !1, !1), n$1 += ":", n$1 += r$1(e$2.substr(t$3 + 1), !1, !0)), n$1 += "@";
			}
			o$1 = o$1.toLowerCase(), t$3 = o$1.lastIndexOf(":"), -1 === t$3 ? n$1 += r$1(o$1, !1, !0) : (n$1 += r$1(o$1.substr(0, t$3), !1, !0), n$1 += o$1.substr(t$3));
		}
		if (s$1) {
			if (s$1.length >= 3 && 47 === s$1.charCodeAt(0) && 58 === s$1.charCodeAt(2)) {
				const t$3 = s$1.charCodeAt(1);
				t$3 >= 65 && t$3 <= 90 && (s$1 = `/${String.fromCharCode(t$3 + 32)}:${s$1.substr(3)}`);
			} else if (s$1.length >= 2 && 58 === s$1.charCodeAt(1)) {
				const t$3 = s$1.charCodeAt(0);
				t$3 >= 65 && t$3 <= 90 && (s$1 = `${String.fromCharCode(t$3 + 32)}:${s$1.substr(2)}`);
			}
			n$1 += r$1(s$1, !0, !1);
		}
		return h$1 && (n$1 += "?", n$1 += r$1(h$1, !1, !1)), a$2 && (n$1 += "#", n$1 += e$1 ? a$2 : m(a$2, !1, !1)), n$1;
	}
	function C(t$2) {
		try {
			return decodeURIComponent(t$2);
		} catch {
			return t$2.length > 3 ? t$2.substr(0, 3) + C(t$2.substr(3)) : t$2;
		}
	}
	const A$1 = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function w(t$2) {
		return t$2.match(A$1) ? t$2.replace(A$1, ((t$3) => C(t$3))) : t$2;
	}
	var x = r(975);
	const P = x.posix || x, _ = "/";
	var I;
	(function(t$2) {
		t$2.joinPath = function(t$3, ...e$1) {
			return t$3.with({ path: P.join(t$3.path, ...e$1) });
		}, t$2.resolvePath = function(t$3, ...e$1) {
			let r$1 = t$3.path, n$1 = !1;
			r$1[0] !== _ && (r$1 = _ + r$1, n$1 = !0);
			let i$1 = P.resolve(r$1, ...e$1);
			return n$1 && i$1[0] === _ && !t$3.authority && (i$1 = i$1.substring(1)), t$3.with({ path: i$1 });
		}, t$2.dirname = function(t$3) {
			if (0 === t$3.path.length || t$3.path === _) return t$3;
			let e$1 = P.dirname(t$3.path);
			return 1 === e$1.length && 46 === e$1.charCodeAt(0) && (e$1 = ""), t$3.with({ path: e$1 });
		}, t$2.basename = function(t$3) {
			return P.basename(t$3.path);
		}, t$2.extname = function(t$3) {
			return P.extname(t$3.path);
		};
	})(I || (I = {})), LIB = n;
})();
const { URI, Utils } = LIB;
function mergeObjects(obj1, obj2, excludeUndefined = false) {
	if (!obj1) return obj2;
	if (!obj2) return obj1;
	if (excludeUndefined) {
		obj1 = excludeUndefinedValues(obj1);
		obj2 = excludeUndefinedValues(obj2);
	}
	const mergedObjects = {
		...obj2,
		...obj1
	};
	for (const key of Object.keys(mergedObjects)) if (obj1[key] && obj2[key]) {
		if (Array.isArray(obj1[key])) mergedObjects[key] = obj1[key].concat(obj2[key]);
		else if (Array.isArray(obj2[key])) mergedObjects[key] = obj2[key].concat(obj1[key]);
		else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
	}
	return mergedObjects;
}
function excludeUndefinedValues(obj) {
	const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== void 0);
	return Object.fromEntries(filteredEntries);
}
function checkValueAgainstRegexpArray(value, regexpArray) {
	if (!regexpArray) return false;
	for (let i = 0; i < regexpArray.length; i++) if (regexpArray[i].test(value)) return true;
	return false;
}
var FullTextDocument = class FullTextDocument {
	constructor(uri, languageId, version, content) {
		this._uri = uri;
		this._languageId = languageId;
		this._version = version;
		this._content = content;
		this._lineOffsets = void 0;
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
			const start = this.offsetAt(range.start);
			const end = this.offsetAt(range.end);
			return this._content.substring(start, end);
		}
		return this._content;
	}
	update(changes, version) {
		for (const change of changes) if (FullTextDocument.isIncremental(change)) {
			const range = getWellformedRange(change.range);
			const startOffset = this.offsetAt(range.start);
			const endOffset = this.offsetAt(range.end);
			this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
			const startLine = Math.max(range.start.line, 0);
			const endLine = Math.max(range.end.line, 0);
			let lineOffsets = this._lineOffsets;
			const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
			if (endLine - startLine === addedLineOffsets.length) for (let i = 0, len = addedLineOffsets.length; i < len; i++) lineOffsets[i + startLine + 1] = addedLineOffsets[i];
			else if (addedLineOffsets.length < 1e4) lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
			else this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
			const diff = change.text.length - (endOffset - startOffset);
			if (diff !== 0) for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) lineOffsets[i] = lineOffsets[i] + diff;
		} else if (FullTextDocument.isFull(change)) {
			this._content = change.text;
			this._lineOffsets = void 0;
		} else throw new Error("Unknown change event received");
		this._version = version;
	}
	getLineOffsets() {
		if (this._lineOffsets === void 0) this._lineOffsets = computeLineOffsets(this._content, true);
		return this._lineOffsets;
	}
	positionAt(offset) {
		offset = Math.max(Math.min(offset, this._content.length), 0);
		const lineOffsets = this.getLineOffsets();
		let low = 0, high = lineOffsets.length;
		if (high === 0) return {
			line: 0,
			character: offset
		};
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (lineOffsets[mid] > offset) high = mid;
			else low = mid + 1;
		}
		const line = low - 1;
		offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
		return {
			line,
			character: offset - lineOffsets[line]
		};
	}
	offsetAt(position) {
		const lineOffsets = this.getLineOffsets();
		if (position.line >= lineOffsets.length) return this._content.length;
		else if (position.line < 0) return 0;
		const lineOffset = lineOffsets[position.line];
		if (position.character <= 0) return lineOffset;
		const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
		const offset = Math.min(lineOffset + position.character, nextLineOffset);
		return this.ensureBeforeEOL(offset, lineOffset);
	}
	ensureBeforeEOL(offset, lineOffset) {
		while (offset > lineOffset && isEOL$1(this._content.charCodeAt(offset - 1))) offset--;
		return offset;
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
	static isIncremental(event) {
		const candidate = event;
		return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
	}
	static isFull(event) {
		const candidate = event;
		return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
	}
};
var TextDocument;
(function(TextDocument$2) {
	function create(uri, languageId, version, content) {
		return new FullTextDocument(uri, languageId, version, content);
	}
	TextDocument$2.create = create;
	function update(document, changes, version) {
		if (document instanceof FullTextDocument) {
			document.update(changes, version);
			return document;
		} else throw new Error("TextDocument.update: document must be created by TextDocument.create");
	}
	TextDocument$2.update = update;
	function applyEdits(document, edits) {
		const text = document.getText();
		const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a$1, b) => {
			const diff = a$1.range.start.line - b.range.start.line;
			if (diff === 0) return a$1.range.start.character - b.range.start.character;
			return diff;
		});
		let lastModifiedOffset = 0;
		const spans = [];
		for (const e of sortedEdits) {
			const startOffset = document.offsetAt(e.range.start);
			if (startOffset < lastModifiedOffset) throw new Error("Overlapping edit");
			else if (startOffset > lastModifiedOffset) spans.push(text.substring(lastModifiedOffset, startOffset));
			if (e.newText.length) spans.push(e.newText);
			lastModifiedOffset = document.offsetAt(e.range.end);
		}
		spans.push(text.substr(lastModifiedOffset));
		return spans.join("");
	}
	TextDocument$2.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
	if (data.length <= 1) return data;
	const p = data.length / 2 | 0;
	const left = data.slice(0, p);
	const right = data.slice(p);
	mergeSort(left, compare);
	mergeSort(right, compare);
	let leftIdx = 0;
	let rightIdx = 0;
	let i = 0;
	while (leftIdx < left.length && rightIdx < right.length) if (compare(left[leftIdx], right[rightIdx]) <= 0) data[i++] = left[leftIdx++];
	else data[i++] = right[rightIdx++];
	while (leftIdx < left.length) data[i++] = left[leftIdx++];
	while (rightIdx < right.length) data[i++] = right[rightIdx++];
	return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
	const result = isAtLineStart ? [textOffset] : [];
	for (let i = 0; i < text.length; i++) {
		const ch = text.charCodeAt(i);
		if (isEOL$1(ch)) {
			if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++;
			result.push(textOffset + i + 1);
		}
	}
	return result;
}
function isEOL$1(char) {
	return char === 13 || char === 10;
}
function getWellformedRange(range) {
	const start = range.start;
	const end = range.end;
	if (start.line > end.line || start.line === end.line && start.character > end.character) return {
		start: end,
		end: start
	};
	return range;
}
function getWellformedEdit(textEdit) {
	const range = getWellformedRange(textEdit.range);
	if (range !== textEdit.range) return {
		newText: textEdit.newText,
		range
	};
	return textEdit;
}
var BaseService = class {
	constructor(mode, workspaceUri) {
		this.documents = {};
		this.options = {};
		this.globalOptions = {};
		this.serviceCapabilities = {};
		this.clientCapabilities = {
			textDocument: {
				publishDiagnostics: {
					relatedInformation: true,
					versionSupport: false,
					dataSupport: true,
					tagSupport: { valueSet: [import_main$3.DiagnosticTag.Unnecessary, import_main$3.DiagnosticTag.Deprecated] }
				},
				hover: {
					dynamicRegistration: true,
					contentFormat: ["markdown", "plaintext"]
				},
				synchronization: {
					dynamicRegistration: false,
					willSave: false,
					didSave: false,
					willSaveWaitUntil: false
				},
				formatting: { dynamicRegistration: true },
				completion: {
					dynamicRegistration: true,
					completionItem: {
						snippetSupport: true,
						commitCharactersSupport: false,
						documentationFormat: ["markdown", "plaintext"],
						deprecatedSupport: false,
						preselectSupport: false
					},
					contextSupport: false
				},
				signatureHelp: {
					dynamicRegistration: true,
					signatureInformation: {
						documentationFormat: ["markdown", "plaintext"],
						activeParameterSupport: true
					}
				},
				documentHighlight: { dynamicRegistration: true },
				semanticTokens: {
					dynamicRegistration: true,
					multilineTokenSupport: false,
					overlappingTokenSupport: false,
					tokenTypes: [],
					tokenModifiers: [],
					formats: ["relative"],
					requests: {
						full: { delta: false },
						range: true
					},
					augmentsSyntaxTokens: true
				},
				codeAction: { dynamicRegistration: true },
				inlineCompletion: { dynamicRegistration: true }
			},
			window: { showDocument: { support: true } },
			workspace: {
				didChangeConfiguration: { dynamicRegistration: false },
				executeCommand: { dynamicRegistration: true },
				applyEdit: true,
				workspaceEdit: {
					failureHandling: "abort",
					normalizesLineEndings: false,
					documentChanges: false
				}
			}
		};
		this.mode = mode;
		this.workspaceUri = workspaceUri;
		this.serviceName = "BaseService";
		this.serviceData = {
			className: "BaseService",
			modes: "",
			module: () => {}
		};
	}
	addDocument(document) {
		this.documents[document.uri] = TextDocument.create(document.uri, document.languageId, document.version, document.text);
	}
	getDocument(uri) {
		return this.documents[uri];
	}
	removeDocument(document) {
		delete this.documents[document.uri];
		if (this.options[document.uri]) delete this.options[document.uri];
	}
	renameDocument(document, newDocumentUri) {
		const previousDocument = this.getDocument(document.uri);
		this.addDocument({
			uri: newDocumentUri,
			version: previousDocument.version,
			languageId: previousDocument.languageId,
			text: previousDocument.getText()
		});
		this.options[newDocumentUri] = this.options[document.uri];
		this.removeDocument(document);
	}
	getDocumentValue(uri) {
		return this.getDocument(uri)?.getText();
	}
	setValue(identifier, value) {
		let document = this.getDocument(identifier.uri);
		if (document) {
			document = TextDocument.create(document.uri, document.languageId, document.version, value);
			this.documents[document.uri] = document;
		}
	}
	setGlobalOptions(options) {
		this.globalOptions = options ?? {};
	}
	setWorkspace(workspaceUri) {
		this.workspaceUri = workspaceUri;
	}
	setOptions(documentUri, options, merge = false) {
		this.options[documentUri] = merge ? mergeObjects(options, this.options[documentUri]) : options;
	}
	getOption(documentUri, optionName) {
		if (this.options[documentUri] && this.options[documentUri][optionName]) return this.options[documentUri][optionName];
		else return this.globalOptions[optionName];
	}
	applyDeltas(identifier, deltas) {
		let document = this.getDocument(identifier.uri);
		if (document) TextDocument.update(document, deltas, identifier.version);
	}
	async doComplete(document, position) {
		return null;
	}
	async doInlineComplete(document, position) {
		return null;
	}
	async doHover(document, position) {
		return null;
	}
	async doResolve(item) {
		return null;
	}
	async doValidation(document) {
		return [];
	}
	format(document, range, options) {
		return Promise.resolve([]);
	}
	async provideSignatureHelp(document, position) {
		return null;
	}
	async findDocumentHighlights(document, position) {
		return [];
	}
	get optionsToFilterDiagnostics() {
		return {
			errorCodesToIgnore: this.globalOptions.errorCodesToIgnore ?? [],
			errorCodesToTreatAsWarning: this.globalOptions.errorCodesToTreatAsWarning ?? [],
			errorCodesToTreatAsInfo: this.globalOptions.errorCodesToTreatAsInfo ?? [],
			errorMessagesToIgnore: this.globalOptions.errorMessagesToIgnore ?? [],
			errorMessagesToTreatAsWarning: this.globalOptions.errorMessagesToTreatAsWarning ?? [],
			errorMessagesToTreatAsInfo: this.globalOptions.errorMessagesToTreatAsInfo ?? []
		};
	}
	getSemanticTokens(document, range) {
		return Promise.resolve(null);
	}
	dispose() {
		return Promise.resolve();
	}
	closeConnection() {
		return Promise.resolve();
	}
	getCodeActions(document, range, context) {
		return Promise.resolve(null);
	}
	executeCommand(command, args) {
		return Promise.resolve(null);
	}
	sendAppliedResult(result, callbackId) {}
	sendRequest(name, args) {
		return Promise.resolve(null);
	}
	sendResponse(callbackId, args) {}
};
function createScanner$1(text, ignoreTrivia = false) {
	const len = text.length;
	let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
	function scanHexDigits(count, exact) {
		let digits = 0;
		let value$1 = 0;
		while (digits < count || !exact) {
			let ch = text.charCodeAt(pos);
			if (ch >= 48 && ch <= 57) value$1 = value$1 * 16 + ch - 48;
			else if (ch >= 65 && ch <= 70) value$1 = value$1 * 16 + ch - 65 + 10;
			else if (ch >= 97 && ch <= 102) value$1 = value$1 * 16 + ch - 97 + 10;
			else break;
			pos++;
			digits++;
		}
		if (digits < count) value$1 = -1;
		return value$1;
	}
	function setPosition(newPosition) {
		pos = newPosition;
		value = "";
		tokenOffset = 0;
		token = 16;
		scanError = 0;
	}
	function scanNumber() {
		let start = pos;
		if (text.charCodeAt(pos) === 48) pos++;
		else {
			pos++;
			while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
		}
		if (pos < text.length && text.charCodeAt(pos) === 46) {
			pos++;
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
			} else {
				scanError = 3;
				return text.substring(start, pos);
			}
		}
		let end = pos;
		if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
			pos++;
			if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) pos++;
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
				end = pos;
			} else scanError = 3;
		}
		return text.substring(start, end);
	}
	function scanString() {
		let result = "", start = pos;
		while (true) {
			if (pos >= len) {
				result += text.substring(start, pos);
				scanError = 2;
				break;
			}
			const ch = text.charCodeAt(pos);
			if (ch === 34) {
				result += text.substring(start, pos);
				pos++;
				break;
			}
			if (ch === 92) {
				result += text.substring(start, pos);
				pos++;
				if (pos >= len) {
					scanError = 2;
					break;
				}
				switch (text.charCodeAt(pos++)) {
					case 34:
						result += "\"";
						break;
					case 92:
						result += "\\";
						break;
					case 47:
						result += "/";
						break;
					case 98:
						result += "\b";
						break;
					case 102:
						result += "\f";
						break;
					case 110:
						result += "\n";
						break;
					case 114:
						result += "\r";
						break;
					case 116:
						result += "	";
						break;
					case 117:
						const ch3 = scanHexDigits(4, true);
						if (ch3 >= 0) result += String.fromCharCode(ch3);
						else scanError = 4;
						break;
					default: scanError = 5;
				}
				start = pos;
				continue;
			}
			if (ch >= 0 && ch <= 31) if (isLineBreak(ch)) {
				result += text.substring(start, pos);
				scanError = 2;
				break;
			} else scanError = 6;
			pos++;
		}
		return result;
	}
	function scanNext() {
		value = "";
		scanError = 0;
		tokenOffset = pos;
		lineStartOffset = lineNumber;
		prevTokenLineStartOffset = tokenLineStartOffset;
		if (pos >= len) {
			tokenOffset = len;
			return token = 17;
		}
		let code = text.charCodeAt(pos);
		if (isWhiteSpace(code)) {
			do {
				pos++;
				value += String.fromCharCode(code);
				code = text.charCodeAt(pos);
			} while (isWhiteSpace(code));
			return token = 15;
		}
		if (isLineBreak(code)) {
			pos++;
			value += String.fromCharCode(code);
			if (code === 13 && text.charCodeAt(pos) === 10) {
				pos++;
				value += "\n";
			}
			lineNumber++;
			tokenLineStartOffset = pos;
			return token = 14;
		}
		switch (code) {
			case 123:
				pos++;
				return token = 1;
			case 125:
				pos++;
				return token = 2;
			case 91:
				pos++;
				return token = 3;
			case 93:
				pos++;
				return token = 4;
			case 58:
				pos++;
				return token = 6;
			case 44:
				pos++;
				return token = 5;
			case 34:
				pos++;
				value = scanString();
				return token = 10;
			case 47:
				const start = pos - 1;
				if (text.charCodeAt(pos + 1) === 47) {
					pos += 2;
					while (pos < len) {
						if (isLineBreak(text.charCodeAt(pos))) break;
						pos++;
					}
					value = text.substring(start, pos);
					return token = 12;
				}
				if (text.charCodeAt(pos + 1) === 42) {
					pos += 2;
					const safeLength = len - 1;
					let commentClosed = false;
					while (pos < safeLength) {
						const ch = text.charCodeAt(pos);
						if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
							pos += 2;
							commentClosed = true;
							break;
						}
						pos++;
						if (isLineBreak(ch)) {
							if (ch === 13 && text.charCodeAt(pos) === 10) pos++;
							lineNumber++;
							tokenLineStartOffset = pos;
						}
					}
					if (!commentClosed) {
						pos++;
						scanError = 1;
					}
					value = text.substring(start, pos);
					return token = 13;
				}
				value += String.fromCharCode(code);
				pos++;
				return token = 16;
			case 45:
				value += String.fromCharCode(code);
				pos++;
				if (pos === len || !isDigit(text.charCodeAt(pos))) return token = 16;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				value += scanNumber();
				return token = 11;
			default:
				while (pos < len && isUnknownContentCharacter(code)) {
					pos++;
					code = text.charCodeAt(pos);
				}
				if (tokenOffset !== pos) {
					value = text.substring(tokenOffset, pos);
					switch (value) {
						case "true": return token = 8;
						case "false": return token = 9;
						case "null": return token = 7;
					}
					return token = 16;
				}
				value += String.fromCharCode(code);
				pos++;
				return token = 16;
		}
	}
	function isUnknownContentCharacter(code) {
		if (isWhiteSpace(code) || isLineBreak(code)) return false;
		switch (code) {
			case 125:
			case 93:
			case 123:
			case 91:
			case 34:
			case 58:
			case 44:
			case 47: return false;
		}
		return true;
	}
	function scanNextNonTrivia() {
		let result;
		do
			result = scanNext();
		while (result >= 12 && result <= 15);
		return result;
	}
	return {
		setPosition,
		getPosition: () => pos,
		scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
		getToken: () => token,
		getTokenValue: () => value,
		getTokenOffset: () => tokenOffset,
		getTokenLength: () => pos - tokenOffset,
		getTokenStartLine: () => lineStartOffset,
		getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
		getTokenError: () => scanError
	};
}
function isWhiteSpace(ch) {
	return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
	return ch === 10 || ch === 13;
}
function isDigit(ch) {
	return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes$1) {
	CharacterCodes$1[CharacterCodes$1["lineFeed"] = 10] = "lineFeed";
	CharacterCodes$1[CharacterCodes$1["carriageReturn"] = 13] = "carriageReturn";
	CharacterCodes$1[CharacterCodes$1["space"] = 32] = "space";
	CharacterCodes$1[CharacterCodes$1["_0"] = 48] = "_0";
	CharacterCodes$1[CharacterCodes$1["_1"] = 49] = "_1";
	CharacterCodes$1[CharacterCodes$1["_2"] = 50] = "_2";
	CharacterCodes$1[CharacterCodes$1["_3"] = 51] = "_3";
	CharacterCodes$1[CharacterCodes$1["_4"] = 52] = "_4";
	CharacterCodes$1[CharacterCodes$1["_5"] = 53] = "_5";
	CharacterCodes$1[CharacterCodes$1["_6"] = 54] = "_6";
	CharacterCodes$1[CharacterCodes$1["_7"] = 55] = "_7";
	CharacterCodes$1[CharacterCodes$1["_8"] = 56] = "_8";
	CharacterCodes$1[CharacterCodes$1["_9"] = 57] = "_9";
	CharacterCodes$1[CharacterCodes$1["a"] = 97] = "a";
	CharacterCodes$1[CharacterCodes$1["b"] = 98] = "b";
	CharacterCodes$1[CharacterCodes$1["c"] = 99] = "c";
	CharacterCodes$1[CharacterCodes$1["d"] = 100] = "d";
	CharacterCodes$1[CharacterCodes$1["e"] = 101] = "e";
	CharacterCodes$1[CharacterCodes$1["f"] = 102] = "f";
	CharacterCodes$1[CharacterCodes$1["g"] = 103] = "g";
	CharacterCodes$1[CharacterCodes$1["h"] = 104] = "h";
	CharacterCodes$1[CharacterCodes$1["i"] = 105] = "i";
	CharacterCodes$1[CharacterCodes$1["j"] = 106] = "j";
	CharacterCodes$1[CharacterCodes$1["k"] = 107] = "k";
	CharacterCodes$1[CharacterCodes$1["l"] = 108] = "l";
	CharacterCodes$1[CharacterCodes$1["m"] = 109] = "m";
	CharacterCodes$1[CharacterCodes$1["n"] = 110] = "n";
	CharacterCodes$1[CharacterCodes$1["o"] = 111] = "o";
	CharacterCodes$1[CharacterCodes$1["p"] = 112] = "p";
	CharacterCodes$1[CharacterCodes$1["q"] = 113] = "q";
	CharacterCodes$1[CharacterCodes$1["r"] = 114] = "r";
	CharacterCodes$1[CharacterCodes$1["s"] = 115] = "s";
	CharacterCodes$1[CharacterCodes$1["t"] = 116] = "t";
	CharacterCodes$1[CharacterCodes$1["u"] = 117] = "u";
	CharacterCodes$1[CharacterCodes$1["v"] = 118] = "v";
	CharacterCodes$1[CharacterCodes$1["w"] = 119] = "w";
	CharacterCodes$1[CharacterCodes$1["x"] = 120] = "x";
	CharacterCodes$1[CharacterCodes$1["y"] = 121] = "y";
	CharacterCodes$1[CharacterCodes$1["z"] = 122] = "z";
	CharacterCodes$1[CharacterCodes$1["A"] = 65] = "A";
	CharacterCodes$1[CharacterCodes$1["B"] = 66] = "B";
	CharacterCodes$1[CharacterCodes$1["C"] = 67] = "C";
	CharacterCodes$1[CharacterCodes$1["D"] = 68] = "D";
	CharacterCodes$1[CharacterCodes$1["E"] = 69] = "E";
	CharacterCodes$1[CharacterCodes$1["F"] = 70] = "F";
	CharacterCodes$1[CharacterCodes$1["G"] = 71] = "G";
	CharacterCodes$1[CharacterCodes$1["H"] = 72] = "H";
	CharacterCodes$1[CharacterCodes$1["I"] = 73] = "I";
	CharacterCodes$1[CharacterCodes$1["J"] = 74] = "J";
	CharacterCodes$1[CharacterCodes$1["K"] = 75] = "K";
	CharacterCodes$1[CharacterCodes$1["L"] = 76] = "L";
	CharacterCodes$1[CharacterCodes$1["M"] = 77] = "M";
	CharacterCodes$1[CharacterCodes$1["N"] = 78] = "N";
	CharacterCodes$1[CharacterCodes$1["O"] = 79] = "O";
	CharacterCodes$1[CharacterCodes$1["P"] = 80] = "P";
	CharacterCodes$1[CharacterCodes$1["Q"] = 81] = "Q";
	CharacterCodes$1[CharacterCodes$1["R"] = 82] = "R";
	CharacterCodes$1[CharacterCodes$1["S"] = 83] = "S";
	CharacterCodes$1[CharacterCodes$1["T"] = 84] = "T";
	CharacterCodes$1[CharacterCodes$1["U"] = 85] = "U";
	CharacterCodes$1[CharacterCodes$1["V"] = 86] = "V";
	CharacterCodes$1[CharacterCodes$1["W"] = 87] = "W";
	CharacterCodes$1[CharacterCodes$1["X"] = 88] = "X";
	CharacterCodes$1[CharacterCodes$1["Y"] = 89] = "Y";
	CharacterCodes$1[CharacterCodes$1["Z"] = 90] = "Z";
	CharacterCodes$1[CharacterCodes$1["asterisk"] = 42] = "asterisk";
	CharacterCodes$1[CharacterCodes$1["backslash"] = 92] = "backslash";
	CharacterCodes$1[CharacterCodes$1["closeBrace"] = 125] = "closeBrace";
	CharacterCodes$1[CharacterCodes$1["closeBracket"] = 93] = "closeBracket";
	CharacterCodes$1[CharacterCodes$1["colon"] = 58] = "colon";
	CharacterCodes$1[CharacterCodes$1["comma"] = 44] = "comma";
	CharacterCodes$1[CharacterCodes$1["dot"] = 46] = "dot";
	CharacterCodes$1[CharacterCodes$1["doubleQuote"] = 34] = "doubleQuote";
	CharacterCodes$1[CharacterCodes$1["minus"] = 45] = "minus";
	CharacterCodes$1[CharacterCodes$1["openBrace"] = 123] = "openBrace";
	CharacterCodes$1[CharacterCodes$1["openBracket"] = 91] = "openBracket";
	CharacterCodes$1[CharacterCodes$1["plus"] = 43] = "plus";
	CharacterCodes$1[CharacterCodes$1["slash"] = 47] = "slash";
	CharacterCodes$1[CharacterCodes$1["formFeed"] = 12] = "formFeed";
	CharacterCodes$1[CharacterCodes$1["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));
const cachedSpaces = new Array(20).fill(0).map((_, index) => {
	return " ".repeat(index);
});
const maxCachedValues = 200;
const cachedBreakLinesWithSpaces = {
	" ": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + " ".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + " ".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + " ".repeat(index);
		})
	},
	"	": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + "	".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + "	".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + "	".repeat(index);
		})
	}
};
const supportedEols = [
	"\n",
	"\r",
	"\r\n"
];
function format$3(documentText, range, options) {
	let initialIndentLevel;
	let formatText;
	let formatTextStart;
	let rangeStart;
	let rangeEnd;
	if (range) {
		rangeStart = range.offset;
		rangeEnd = rangeStart + range.length;
		formatTextStart = rangeStart;
		while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) formatTextStart--;
		let endOffset = rangeEnd;
		while (endOffset < documentText.length && !isEOL(documentText, endOffset)) endOffset++;
		formatText = documentText.substring(formatTextStart, endOffset);
		initialIndentLevel = computeIndentLevel(formatText, options);
	} else {
		formatText = documentText;
		initialIndentLevel = 0;
		formatTextStart = 0;
		rangeStart = 0;
		rangeEnd = documentText.length;
	}
	const eol = getEOL(options, documentText);
	const eolFastPathSupported = supportedEols.includes(eol);
	let numberLineBreaks = 0;
	let indentLevel = 0;
	let indentValue;
	if (options.insertSpaces) indentValue = cachedSpaces[options.tabSize || 4] ?? repeat(cachedSpaces[1], options.tabSize || 4);
	else indentValue = "	";
	const indentType = indentValue === "	" ? "	" : " ";
	let scanner = createScanner$1(formatText, false);
	let hasError = false;
	function newLinesAndIndent() {
		if (numberLineBreaks > 1) return repeat(eol, numberLineBreaks) + repeat(indentValue, initialIndentLevel + indentLevel);
		const amountOfSpaces = indentValue.length * (initialIndentLevel + indentLevel);
		if (!eolFastPathSupported || amountOfSpaces > cachedBreakLinesWithSpaces[indentType][eol].length) return eol + repeat(indentValue, initialIndentLevel + indentLevel);
		if (amountOfSpaces <= 0) return eol;
		return cachedBreakLinesWithSpaces[indentType][eol][amountOfSpaces];
	}
	function scanNext() {
		let token = scanner.scan();
		numberLineBreaks = 0;
		while (token === 15 || token === 14) {
			if (token === 14 && options.keepLines) numberLineBreaks += 1;
			else if (token === 14) numberLineBreaks = 1;
			token = scanner.scan();
		}
		hasError = token === 16 || scanner.getTokenError() !== 0;
		return token;
	}
	const editOperations = [];
	function addEdit(text, startOffset, endOffset) {
		if (!hasError && (!range || startOffset < rangeEnd && endOffset > rangeStart) && documentText.substring(startOffset, endOffset) !== text) editOperations.push({
			offset: startOffset,
			length: endOffset - startOffset,
			content: text
		});
	}
	let firstToken = scanNext();
	if (options.keepLines && numberLineBreaks > 0) addEdit(repeat(eol, numberLineBreaks), 0, 0);
	if (firstToken !== 17) {
		let firstTokenStart = scanner.getTokenOffset() + formatTextStart;
		addEdit(indentValue.length * initialIndentLevel < 20 && options.insertSpaces ? cachedSpaces[indentValue.length * initialIndentLevel] : repeat(indentValue, initialIndentLevel), formatTextStart, firstTokenStart);
	}
	while (firstToken !== 17) {
		let firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
		let secondToken = scanNext();
		let replaceContent = "";
		let needsLineBreak = false;
		while (numberLineBreaks === 0 && (secondToken === 12 || secondToken === 13)) {
			let commentTokenStart = scanner.getTokenOffset() + formatTextStart;
			addEdit(cachedSpaces[1], firstTokenEnd, commentTokenStart);
			firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
			needsLineBreak = secondToken === 12;
			replaceContent = needsLineBreak ? newLinesAndIndent() : "";
			secondToken = scanNext();
		}
		if (secondToken === 2) {
			if (firstToken !== 1) indentLevel--;
			if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 1) replaceContent = newLinesAndIndent();
			else if (options.keepLines) replaceContent = cachedSpaces[1];
		} else if (secondToken === 4) {
			if (firstToken !== 3) indentLevel--;
			if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 3) replaceContent = newLinesAndIndent();
			else if (options.keepLines) replaceContent = cachedSpaces[1];
		} else {
			switch (firstToken) {
				case 3:
				case 1:
					indentLevel++;
					if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) replaceContent = newLinesAndIndent();
					else replaceContent = cachedSpaces[1];
					break;
				case 5:
					if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) replaceContent = newLinesAndIndent();
					else replaceContent = cachedSpaces[1];
					break;
				case 12:
					replaceContent = newLinesAndIndent();
					break;
				case 13:
					if (numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (!needsLineBreak) replaceContent = cachedSpaces[1];
					break;
				case 6:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (!needsLineBreak) replaceContent = cachedSpaces[1];
					break;
				case 10:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (secondToken === 6 && !needsLineBreak) replaceContent = "";
					break;
				case 7:
				case 8:
				case 9:
				case 11:
				case 2:
				case 4:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if ((secondToken === 12 || secondToken === 13) && !needsLineBreak) replaceContent = cachedSpaces[1];
					else if (secondToken !== 5 && secondToken !== 17) hasError = true;
					break;
				case 16:
					hasError = true;
					break;
			}
			if (numberLineBreaks > 0 && (secondToken === 12 || secondToken === 13)) replaceContent = newLinesAndIndent();
		}
		if (secondToken === 17) if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
		else replaceContent = options.insertFinalNewline ? eol : "";
		const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
		addEdit(replaceContent, firstTokenEnd, secondTokenStart);
		firstToken = secondToken;
	}
	return editOperations;
}
function repeat(s, count) {
	let result = "";
	for (let i = 0; i < count; i++) result += s;
	return result;
}
function computeIndentLevel(content, options) {
	let i = 0;
	let nChars = 0;
	const tabSize = options.tabSize || 4;
	while (i < content.length) {
		let ch = content.charAt(i);
		if (ch === cachedSpaces[1]) nChars++;
		else if (ch === "	") nChars += tabSize;
		else break;
		i++;
	}
	return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
	for (let i = 0; i < text.length; i++) {
		const ch = text.charAt(i);
		if (ch === "\r") {
			if (i + 1 < text.length && text.charAt(i + 1) === "\n") return "\r\n";
			return "\r";
		} else if (ch === "\n") return "\n";
	}
	return options && options.eol || "\n";
}
function isEOL(text, offset) {
	return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
var ParseOptions;
(function(ParseOptions$1) {
	ParseOptions$1.DEFAULT = { allowTrailingComma: false };
})(ParseOptions || (ParseOptions = {}));
function parse$2(text, errors = [], options = ParseOptions.DEFAULT) {
	let currentProperty = null;
	let currentParent = [];
	const previousParents = [];
	function onValue(value) {
		if (Array.isArray(currentParent)) currentParent.push(value);
		else if (currentProperty !== null) currentParent[currentProperty] = value;
	}
	visit$1(text, {
		onObjectBegin: () => {
			const object = {};
			onValue(object);
			previousParents.push(currentParent);
			currentParent = object;
			currentProperty = null;
		},
		onObjectProperty: (name) => {
			currentProperty = name;
		},
		onObjectEnd: () => {
			currentParent = previousParents.pop();
		},
		onArrayBegin: () => {
			const array$2 = [];
			onValue(array$2);
			previousParents.push(currentParent);
			currentParent = array$2;
			currentProperty = null;
		},
		onArrayEnd: () => {
			currentParent = previousParents.pop();
		},
		onLiteralValue: onValue,
		onError: (error$2, offset, length) => {
			errors.push({
				error: error$2,
				offset,
				length
			});
		}
	}, options);
	return currentParent[0];
}
function getNodePath$2(node) {
	if (!node.parent || !node.parent.children) return [];
	const path = getNodePath$2(node.parent);
	if (node.parent.type === "property") {
		const key = node.parent.children[0].value;
		path.push(key);
	} else if (node.parent.type === "array") {
		const index = node.parent.children.indexOf(node);
		if (index !== -1) path.push(index);
	}
	return path;
}
function getNodeValue$2(node) {
	switch (node.type) {
		case "array": return node.children.map(getNodeValue$2);
		case "object":
			const obj = Object.create(null);
			for (let prop of node.children) {
				const valueNode = prop.children[1];
				if (valueNode) obj[prop.children[0].value] = getNodeValue$2(valueNode);
			}
			return obj;
		case "null":
		case "string":
		case "number":
		case "boolean": return node.value;
		default: return;
	}
}
function contains$1(node, offset, includeRightBound = false) {
	return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
function findNodeAtOffset$1(node, offset, includeRightBound = false) {
	if (contains$1(node, offset, includeRightBound)) {
		const children = node.children;
		if (Array.isArray(children)) for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
			const item = findNodeAtOffset$1(children[i], offset, includeRightBound);
			if (item) return item;
		}
		return node;
	}
}
function visit$1(text, visitor, options = ParseOptions.DEFAULT) {
	const _scanner = createScanner$1(text, false);
	const _jsonPath = [];
	let suppressedCallbacks = 0;
	function toNoArgVisit(visitFunction) {
		return visitFunction ? () => suppressedCallbacks === 0 && visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
	}
	function toOneArgVisit(visitFunction) {
		return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
	}
	function toOneArgVisitWithPath(visitFunction) {
		return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
	}
	function toBeginVisit(visitFunction) {
		return visitFunction ? () => {
			if (suppressedCallbacks > 0) suppressedCallbacks++;
			else if (visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) === false) suppressedCallbacks = 1;
		} : () => true;
	}
	function toEndVisit(visitFunction) {
		return visitFunction ? () => {
			if (suppressedCallbacks > 0) suppressedCallbacks--;
			if (suppressedCallbacks === 0) visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
		} : () => true;
	}
	const onObjectBegin = toBeginVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toEndVisit(visitor.onObjectEnd), onArrayBegin = toBeginVisit(visitor.onArrayBegin), onArrayEnd = toEndVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
	const disallowComments = options && options.disallowComments;
	const allowTrailingComma = options && options.allowTrailingComma;
	function scanNext() {
		while (true) {
			const token = _scanner.scan();
			switch (_scanner.getTokenError()) {
				case 4:
					handleError(14);
					break;
				case 5:
					handleError(15);
					break;
				case 3:
					handleError(13);
					break;
				case 1:
					if (!disallowComments) handleError(11);
					break;
				case 2:
					handleError(12);
					break;
				case 6:
					handleError(16);
					break;
			}
			switch (token) {
				case 12:
				case 13:
					if (disallowComments) handleError(10);
					else onComment();
					break;
				case 16:
					handleError(1);
					break;
				case 15:
				case 14: break;
				default: return token;
			}
		}
	}
	function handleError(error$2, skipUntilAfter = [], skipUntil = []) {
		onError(error$2);
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token = _scanner.getToken();
			while (token !== 17) {
				if (skipUntilAfter.indexOf(token) !== -1) {
					scanNext();
					break;
				} else if (skipUntil.indexOf(token) !== -1) break;
				token = scanNext();
			}
		}
	}
	function parseString(isValue) {
		const value = _scanner.getTokenValue();
		if (isValue) onLiteralValue(value);
		else {
			onObjectProperty(value);
			_jsonPath.push(value);
		}
		scanNext();
		return true;
	}
	function parseLiteral() {
		switch (_scanner.getToken()) {
			case 11:
				const tokenValue = _scanner.getTokenValue();
				let value = Number(tokenValue);
				if (isNaN(value)) {
					handleError(2);
					value = 0;
				}
				onLiteralValue(value);
				break;
			case 7:
				onLiteralValue(null);
				break;
			case 8:
				onLiteralValue(true);
				break;
			case 9:
				onLiteralValue(false);
				break;
			default: return false;
		}
		scanNext();
		return true;
	}
	function parseProperty() {
		if (_scanner.getToken() !== 10) {
			handleError(3, [], [2, 5]);
			return false;
		}
		parseString(false);
		if (_scanner.getToken() === 6) {
			onSeparator(":");
			scanNext();
			if (!parseValue()) handleError(4, [], [2, 5]);
		} else handleError(5, [], [2, 5]);
		_jsonPath.pop();
		return true;
	}
	function parseObject() {
		onObjectBegin();
		scanNext();
		let needsComma = false;
		while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) handleError(4, [], []);
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 2 && allowTrailingComma) break;
			} else if (needsComma) handleError(6, [], []);
			if (!parseProperty()) handleError(4, [], [2, 5]);
			needsComma = true;
		}
		onObjectEnd();
		if (_scanner.getToken() !== 2) handleError(7, [2], []);
		else scanNext();
		return true;
	}
	function parseArray() {
		onArrayBegin();
		scanNext();
		let isFirstElement = true;
		let needsComma = false;
		while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) handleError(4, [], []);
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 4 && allowTrailingComma) break;
			} else if (needsComma) handleError(6, [], []);
			if (isFirstElement) {
				_jsonPath.push(0);
				isFirstElement = false;
			} else _jsonPath[_jsonPath.length - 1]++;
			if (!parseValue()) handleError(4, [], [4, 5]);
			needsComma = true;
		}
		onArrayEnd();
		if (!isFirstElement) _jsonPath.pop();
		if (_scanner.getToken() !== 4) handleError(8, [4], []);
		else scanNext();
		return true;
	}
	function parseValue() {
		switch (_scanner.getToken()) {
			case 3: return parseArray();
			case 1: return parseObject();
			case 10: return parseString(true);
			default: return parseLiteral();
		}
	}
	scanNext();
	if (_scanner.getToken() === 17) {
		if (options.allowEmptyContent) return true;
		handleError(4, [], []);
		return false;
	}
	if (!parseValue()) {
		handleError(4, [], []);
		return false;
	}
	if (_scanner.getToken() !== 17) handleError(9, [], []);
	return true;
}
const createScanner = createScanner$1;
var ScanError;
(function(ScanError$1) {
	ScanError$1[ScanError$1["None"] = 0] = "None";
	ScanError$1[ScanError$1["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
	ScanError$1[ScanError$1["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
	ScanError$1[ScanError$1["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
	ScanError$1[ScanError$1["InvalidUnicode"] = 4] = "InvalidUnicode";
	ScanError$1[ScanError$1["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
	ScanError$1[ScanError$1["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind$1) {
	SyntaxKind$1[SyntaxKind$1["OpenBraceToken"] = 1] = "OpenBraceToken";
	SyntaxKind$1[SyntaxKind$1["CloseBraceToken"] = 2] = "CloseBraceToken";
	SyntaxKind$1[SyntaxKind$1["OpenBracketToken"] = 3] = "OpenBracketToken";
	SyntaxKind$1[SyntaxKind$1["CloseBracketToken"] = 4] = "CloseBracketToken";
	SyntaxKind$1[SyntaxKind$1["CommaToken"] = 5] = "CommaToken";
	SyntaxKind$1[SyntaxKind$1["ColonToken"] = 6] = "ColonToken";
	SyntaxKind$1[SyntaxKind$1["NullKeyword"] = 7] = "NullKeyword";
	SyntaxKind$1[SyntaxKind$1["TrueKeyword"] = 8] = "TrueKeyword";
	SyntaxKind$1[SyntaxKind$1["FalseKeyword"] = 9] = "FalseKeyword";
	SyntaxKind$1[SyntaxKind$1["StringLiteral"] = 10] = "StringLiteral";
	SyntaxKind$1[SyntaxKind$1["NumericLiteral"] = 11] = "NumericLiteral";
	SyntaxKind$1[SyntaxKind$1["LineCommentTrivia"] = 12] = "LineCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["LineBreakTrivia"] = 14] = "LineBreakTrivia";
	SyntaxKind$1[SyntaxKind$1["Trivia"] = 15] = "Trivia";
	SyntaxKind$1[SyntaxKind$1["Unknown"] = 16] = "Unknown";
	SyntaxKind$1[SyntaxKind$1["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
const parse$1 = parse$2;
const findNodeAtOffset = findNodeAtOffset$1;
const getNodePath$1 = getNodePath$2;
const getNodeValue$1 = getNodeValue$2;
var ParseErrorCode;
(function(ParseErrorCode$1) {
	ParseErrorCode$1[ParseErrorCode$1["InvalidSymbol"] = 1] = "InvalidSymbol";
	ParseErrorCode$1[ParseErrorCode$1["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
	ParseErrorCode$1[ParseErrorCode$1["PropertyNameExpected"] = 3] = "PropertyNameExpected";
	ParseErrorCode$1[ParseErrorCode$1["ValueExpected"] = 4] = "ValueExpected";
	ParseErrorCode$1[ParseErrorCode$1["ColonExpected"] = 5] = "ColonExpected";
	ParseErrorCode$1[ParseErrorCode$1["CommaExpected"] = 6] = "CommaExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBraceExpected"] = 7] = "CloseBraceExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBracketExpected"] = 8] = "CloseBracketExpected";
	ParseErrorCode$1[ParseErrorCode$1["EndOfFileExpected"] = 9] = "EndOfFileExpected";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCommentToken"] = 10] = "InvalidCommentToken";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
	ParseErrorCode$1[ParseErrorCode$1["InvalidUnicode"] = 14] = "InvalidUnicode";
	ParseErrorCode$1[ParseErrorCode$1["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));
function format$1(documentText, range, options) {
	return format$3(documentText, range, options);
}
function equals(one, other) {
	if (one === other) return true;
	if (one === null || one === void 0 || other === null || other === void 0) return false;
	if (typeof one !== typeof other) return false;
	if (typeof one !== "object") return false;
	if (Array.isArray(one) !== Array.isArray(other)) return false;
	let i, key;
	if (Array.isArray(one)) {
		if (one.length !== other.length) return false;
		for (i = 0; i < one.length; i++) if (!equals(one[i], other[i])) return false;
	} else {
		const oneKeys = [];
		for (key in one) oneKeys.push(key);
		oneKeys.sort();
		const otherKeys = [];
		for (key in other) otherKeys.push(key);
		otherKeys.sort();
		if (!equals(oneKeys, otherKeys)) return false;
		for (i = 0; i < oneKeys.length; i++) if (!equals(one[oneKeys[i]], other[oneKeys[i]])) return false;
	}
	return true;
}
function isNumber(val) {
	return typeof val === "number";
}
function isDefined(val) {
	return typeof val !== "undefined";
}
function isBoolean(val) {
	return typeof val === "boolean";
}
function isString(val) {
	return typeof val === "string";
}
function isObject(val) {
	return typeof val === "object" && val !== null && !Array.isArray(val);
}
function startsWith(haystack, needle) {
	if (haystack.length < needle.length) return false;
	for (let i = 0; i < needle.length; i++) if (haystack[i] !== needle[i]) return false;
	return true;
}
function endsWith(haystack, needle) {
	const diff = haystack.length - needle.length;
	if (diff > 0) return haystack.lastIndexOf(needle) === diff;
	else if (diff === 0) return haystack === needle;
	else return false;
}
function extendedRegExp(pattern) {
	let flags = "";
	if (startsWith(pattern, "(?i)")) {
		pattern = pattern.substring(4);
		flags = "i";
	}
	try {
		return new RegExp(pattern, flags + "u");
	} catch (e) {
		try {
			return new RegExp(pattern, flags);
		} catch (e$1) {
			return;
		}
	}
}
function stringLength(str) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		count++;
		const code = str.charCodeAt(i);
		if (55296 <= code && code <= 56319) i++;
	}
	return count;
}
init_main();
var ErrorCode;
(function(ErrorCode$1) {
	ErrorCode$1[ErrorCode$1["Undefined"] = 0] = "Undefined";
	ErrorCode$1[ErrorCode$1["EnumValueMismatch"] = 1] = "EnumValueMismatch";
	ErrorCode$1[ErrorCode$1["Deprecated"] = 2] = "Deprecated";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
	ErrorCode$1[ErrorCode$1["InvalidUnicode"] = 260] = "InvalidUnicode";
	ErrorCode$1[ErrorCode$1["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
	ErrorCode$1[ErrorCode$1["InvalidCharacter"] = 262] = "InvalidCharacter";
	ErrorCode$1[ErrorCode$1["PropertyExpected"] = 513] = "PropertyExpected";
	ErrorCode$1[ErrorCode$1["CommaExpected"] = 514] = "CommaExpected";
	ErrorCode$1[ErrorCode$1["ColonExpected"] = 515] = "ColonExpected";
	ErrorCode$1[ErrorCode$1["ValueExpected"] = 516] = "ValueExpected";
	ErrorCode$1[ErrorCode$1["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
	ErrorCode$1[ErrorCode$1["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
	ErrorCode$1[ErrorCode$1["TrailingComma"] = 519] = "TrailingComma";
	ErrorCode$1[ErrorCode$1["DuplicateKey"] = 520] = "DuplicateKey";
	ErrorCode$1[ErrorCode$1["CommentNotPermitted"] = 521] = "CommentNotPermitted";
	ErrorCode$1[ErrorCode$1["PropertyKeysMustBeDoublequoted"] = 528] = "PropertyKeysMustBeDoublequoted";
	ErrorCode$1[ErrorCode$1["SchemaResolveError"] = 768] = "SchemaResolveError";
	ErrorCode$1[ErrorCode$1["SchemaUnsupportedFeature"] = 769] = "SchemaUnsupportedFeature";
})(ErrorCode || (ErrorCode = {}));
var SchemaDraft;
(function(SchemaDraft$1) {
	SchemaDraft$1[SchemaDraft$1["v3"] = 3] = "v3";
	SchemaDraft$1[SchemaDraft$1["v4"] = 4] = "v4";
	SchemaDraft$1[SchemaDraft$1["v6"] = 6] = "v6";
	SchemaDraft$1[SchemaDraft$1["v7"] = 7] = "v7";
	SchemaDraft$1[SchemaDraft$1["v2019_09"] = 19] = "v2019_09";
	SchemaDraft$1[SchemaDraft$1["v2020_12"] = 20] = "v2020_12";
})(SchemaDraft || (SchemaDraft = {}));
var ClientCapabilities;
(function(ClientCapabilities$1) {
	ClientCapabilities$1.LATEST = { textDocument: { completion: { completionItem: {
		documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
		commitCharactersSupport: true,
		labelDetailsSupport: true
	} } } };
})(ClientCapabilities || (ClientCapabilities = {}));
var bundle;
function t(...args) {
	const firstArg = args[0];
	let key;
	let message;
	let formatArgs;
	if (typeof firstArg === "string") {
		key = firstArg;
		message = firstArg;
		args.splice(0, 1);
		formatArgs = !args || typeof args[0] !== "object" ? args : args[0];
	} else if (firstArg instanceof Array) {
		const replacements = args.slice(1);
		if (firstArg.length !== replacements.length + 1) throw new Error("expected a string as the first argument to l10n.t");
		let str = firstArg[0];
		for (let i = 1; i < firstArg.length; i++) str += `{${i - 1}}` + firstArg[i];
		return t(str, ...replacements);
	} else {
		message = firstArg.message;
		key = message;
		if (firstArg.comment && firstArg.comment.length > 0) key += `/${Array.isArray(firstArg.comment) ? firstArg.comment.join("") : firstArg.comment}`;
		formatArgs = firstArg.args ?? {};
	}
	const messageFromBundle = bundle?.[key];
	if (!messageFromBundle) return format$2(message, formatArgs);
	if (typeof messageFromBundle === "string") return format$2(messageFromBundle, formatArgs);
	if (messageFromBundle.comment) return format$2(messageFromBundle.message, formatArgs);
	return format$2(message, formatArgs);
}
var _format2Regexp = /{([^}]+)}/g;
function format$2(template, values) {
	if (Object.keys(values).length === 0) return template;
	return template.replace(_format2Regexp, (match, group) => values[group] ?? match);
}
const formats = {
	"color-hex": {
		errorMessage: t("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
		pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
	},
	"date-time": {
		errorMessage: t("String is not a RFC3339 date-time."),
		pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
	},
	"date": {
		errorMessage: t("String is not a RFC3339 date."),
		pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
	},
	"time": {
		errorMessage: t("String is not a RFC3339 time."),
		pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
	},
	"email": {
		errorMessage: t("String is not an e-mail address."),
		pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/
	},
	"hostname": {
		errorMessage: t("String is not a hostname."),
		pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i
	},
	"ipv4": {
		errorMessage: t("String is not an IPv4 address."),
		pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
	},
	"ipv6": {
		errorMessage: t("String is not an IPv6 address."),
		pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i
	}
};
var ASTNodeImpl = class {
	constructor(parent, offset, length = 0) {
		this.offset = offset;
		this.length = length;
		this.parent = parent;
	}
	get children() {
		return [];
	}
	toString() {
		return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
	}
};
var NullASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "null";
		this.value = null;
	}
};
var BooleanASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, boolValue, offset) {
		super(parent, offset);
		this.type = "boolean";
		this.value = boolValue;
	}
};
var ArrayASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "array";
		this.items = [];
	}
	get children() {
		return this.items;
	}
};
var NumberASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "number";
		this.isInteger = true;
		this.value = NaN;
	}
};
var StringASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset, length) {
		super(parent, offset, length);
		this.type = "string";
		this.value = "";
	}
};
var PropertyASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset, keyNode) {
		super(parent, offset);
		this.type = "property";
		this.colonOffset = -1;
		this.keyNode = keyNode;
	}
	get children() {
		return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
	}
};
var ObjectASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "object";
		this.properties = [];
	}
	get children() {
		return this.properties;
	}
};
function asSchema(schema) {
	if (isBoolean(schema)) return schema ? {} : { "not": {} };
	return schema;
}
var EnumMatch;
(function(EnumMatch$1) {
	EnumMatch$1[EnumMatch$1["Key"] = 0] = "Key";
	EnumMatch$1[EnumMatch$1["Enum"] = 1] = "Enum";
})(EnumMatch || (EnumMatch = {}));
const schemaDraftFromId = {
	"http://json-schema.org/draft-03/schema#": SchemaDraft.v3,
	"http://json-schema.org/draft-04/schema#": SchemaDraft.v4,
	"http://json-schema.org/draft-06/schema#": SchemaDraft.v6,
	"http://json-schema.org/draft-07/schema#": SchemaDraft.v7,
	"https://json-schema.org/draft/2019-09/schema": SchemaDraft.v2019_09,
	"https://json-schema.org/draft/2020-12/schema": SchemaDraft.v2020_12
};
var EvaluationContext = class {
	constructor(schemaDraft) {
		this.schemaDraft = schemaDraft;
	}
};
var SchemaCollector = class SchemaCollector {
	constructor(focusOffset = -1, exclude) {
		this.focusOffset = focusOffset;
		this.exclude = exclude;
		this.schemas = [];
	}
	add(schema) {
		this.schemas.push(schema);
	}
	merge(other) {
		Array.prototype.push.apply(this.schemas, other.schemas);
	}
	include(node) {
		return (this.focusOffset === -1 || contains(node, this.focusOffset)) && node !== this.exclude;
	}
	newSub() {
		return new SchemaCollector(-1, this.exclude);
	}
};
var NoOpSchemaCollector = class {
	constructor() {}
	get schemas() {
		return [];
	}
	add(_schema) {}
	merge(_other) {}
	include(_node) {
		return true;
	}
	newSub() {
		return this;
	}
};
NoOpSchemaCollector.instance = new NoOpSchemaCollector();
var ValidationResult = class {
	constructor() {
		this.problems = [];
		this.propertiesMatches = 0;
		this.processedProperties = /* @__PURE__ */ new Set();
		this.propertiesValueMatches = 0;
		this.primaryValueMatches = 0;
		this.enumValueMatch = false;
		this.enumValues = void 0;
	}
	hasProblems() {
		return !!this.problems.length;
	}
	merge(validationResult) {
		this.problems = this.problems.concat(validationResult.problems);
		this.propertiesMatches += validationResult.propertiesMatches;
		this.propertiesValueMatches += validationResult.propertiesValueMatches;
		this.mergeProcessedProperties(validationResult);
	}
	mergeEnumValues(validationResult) {
		if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) this.enumValues = this.enumValues.concat(validationResult.enumValues);
	}
	updateEnumMismatchProblemMessages() {
		if (!this.enumValueMatch && this.enumValues) {
			for (const error$2 of this.problems) if (error$2.code === ErrorCode.EnumValueMismatch) error$2.message = t("Value is not accepted. Valid values: {0}.", this.enumValues.map((v) => JSON.stringify(v)).join(", "));
		}
	}
	mergePropertyMatch(propertyValidationResult) {
		this.problems = this.problems.concat(propertyValidationResult.problems);
		this.propertiesMatches++;
		if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) this.propertiesValueMatches++;
		if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) this.primaryValueMatches++;
	}
	mergeProcessedProperties(validationResult) {
		validationResult.processedProperties.forEach((p) => this.processedProperties.add(p));
	}
	compare(other) {
		const hasProblems = this.hasProblems();
		if (hasProblems !== other.hasProblems()) return hasProblems ? -1 : 1;
		if (this.enumValueMatch !== other.enumValueMatch) return other.enumValueMatch ? -1 : 1;
		if (this.primaryValueMatches !== other.primaryValueMatches) return this.primaryValueMatches - other.primaryValueMatches;
		if (this.propertiesValueMatches !== other.propertiesValueMatches) return this.propertiesValueMatches - other.propertiesValueMatches;
		return this.propertiesMatches - other.propertiesMatches;
	}
};
function newJSONDocument(root, diagnostics = [], comments = []) {
	return new JSONDocument(root, diagnostics, comments);
}
function getNodeValue(node) {
	return getNodeValue$1(node);
}
function getNodePath(node) {
	return getNodePath$1(node);
}
function contains(node, offset, includeRightBound = false) {
	return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
var JSONDocument = class {
	constructor(root, syntaxErrors = [], comments = []) {
		this.root = root;
		this.syntaxErrors = syntaxErrors;
		this.comments = comments;
	}
	getNodeFromOffset(offset, includeRightBound = false) {
		if (this.root) return findNodeAtOffset(this.root, offset, includeRightBound);
	}
	visit(visitor) {
		if (this.root) {
			const doVisit = (node) => {
				let ctn = visitor(node);
				const children = node.children;
				if (Array.isArray(children)) for (let i = 0; i < children.length && ctn; i++) ctn = doVisit(children[i]);
				return ctn;
			};
			doVisit(this.root);
		}
	}
	validate(textDocument, schema, severity = DiagnosticSeverity$1.Warning, schemaDraft) {
		if (this.root && schema) {
			const validationResult = new ValidationResult();
			validate(this.root, schema, validationResult, NoOpSchemaCollector.instance, new EvaluationContext(schemaDraft ?? getSchemaDraft(schema)));
			return validationResult.problems.map((p) => {
				const range = Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
				return Diagnostic.create(range, p.message, p.severity ?? severity, p.code);
			});
		}
	}
	getMatchingSchemas(schema, focusOffset = -1, exclude) {
		if (this.root && schema) {
			const matchingSchemas = new SchemaCollector(focusOffset, exclude);
			const context = new EvaluationContext(getSchemaDraft(schema));
			validate(this.root, schema, new ValidationResult(), matchingSchemas, context);
			return matchingSchemas.schemas;
		}
		return [];
	}
};
function getSchemaDraft(schema, fallBack = SchemaDraft.v2020_12) {
	let schemaId = schema.$schema;
	if (schemaId) return schemaDraftFromId[schemaId] ?? fallBack;
	return fallBack;
}
function validate(n, schema, validationResult, matchingSchemas, context) {
	if (!n || !matchingSchemas.include(n)) return;
	if (n.type === "property") return validate(n.valueNode, schema, validationResult, matchingSchemas, context);
	const node = n;
	_validateNode();
	switch (node.type) {
		case "object":
			_validateObjectNode(node);
			break;
		case "array":
			_validateArrayNode(node);
			break;
		case "string":
			_validateStringNode(node);
			break;
		case "number":
			_validateNumberNode(node);
			break;
	}
	matchingSchemas.add({
		node,
		schema
	});
	function _validateNode() {
		function matchesType(type) {
			return node.type === type || type === "integer" && node.type === "number" && node.isInteger;
		}
		if (Array.isArray(schema.type)) {
			if (!schema.type.some(matchesType)) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Incorrect type. Expected one of {0}.", schema.type.join(", "))
			});
		} else if (schema.type) {
			if (!matchesType(schema.type)) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Incorrect type. Expected \"{0}\".", schema.type)
			});
		}
		if (Array.isArray(schema.allOf)) for (const subSchemaRef of schema.allOf) {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, asSchema(subSchemaRef), subValidationResult, subMatchingSchemas, context);
			validationResult.merge(subValidationResult);
			matchingSchemas.merge(subMatchingSchemas);
		}
		const notSchema = asSchema(schema.not);
		if (notSchema) {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, notSchema, subValidationResult, subMatchingSchemas, context);
			if (!subValidationResult.hasProblems()) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Matches a schema that is not allowed.")
			});
			for (const ms of subMatchingSchemas.schemas) {
				ms.inverted = !ms.inverted;
				matchingSchemas.add(ms);
			}
		}
		const testAlternatives = (alternatives, maxOneMatch) => {
			const matches = [];
			let bestMatch = void 0;
			for (const subSchemaRef of alternatives) {
				const subSchema = asSchema(subSchemaRef);
				const subValidationResult = new ValidationResult();
				const subMatchingSchemas = matchingSchemas.newSub();
				validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
				if (!subValidationResult.hasProblems()) matches.push(subSchema);
				if (!bestMatch) bestMatch = {
					schema: subSchema,
					validationResult: subValidationResult,
					matchingSchemas: subMatchingSchemas
				};
				else if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
					bestMatch.matchingSchemas.merge(subMatchingSchemas);
					bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
					bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
					bestMatch.validationResult.mergeProcessedProperties(subValidationResult);
				} else {
					const compareResult = subValidationResult.compare(bestMatch.validationResult);
					if (compareResult > 0) bestMatch = {
						schema: subSchema,
						validationResult: subValidationResult,
						matchingSchemas: subMatchingSchemas
					};
					else if (compareResult === 0) {
						bestMatch.matchingSchemas.merge(subMatchingSchemas);
						bestMatch.validationResult.mergeEnumValues(subValidationResult);
					}
				}
			}
			if (matches.length > 1 && maxOneMatch) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: 1
				},
				message: t("Matches multiple schemas when only one must validate.")
			});
			if (bestMatch) {
				bestMatch.validationResult.updateEnumMismatchProblemMessages();
				validationResult.merge(bestMatch.validationResult);
				matchingSchemas.merge(bestMatch.matchingSchemas);
			}
			return matches.length;
		};
		if (Array.isArray(schema.anyOf)) testAlternatives(schema.anyOf, false);
		if (Array.isArray(schema.oneOf)) testAlternatives(schema.oneOf, true);
		const testBranch = (schema$1) => {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, asSchema(schema$1), subValidationResult, subMatchingSchemas, context);
			validationResult.merge(subValidationResult);
			matchingSchemas.merge(subMatchingSchemas);
		};
		const testCondition = (ifSchema$1, thenSchema, elseSchema) => {
			const subSchema = asSchema(ifSchema$1);
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
			matchingSchemas.merge(subMatchingSchemas);
			validationResult.mergeProcessedProperties(subValidationResult);
			if (!subValidationResult.hasProblems()) {
				if (thenSchema) testBranch(thenSchema);
			} else if (elseSchema) testBranch(elseSchema);
		};
		const ifSchema = asSchema(schema.if);
		if (ifSchema) testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
		if (Array.isArray(schema.enum)) {
			const val = getNodeValue(node);
			let enumValueMatch = false;
			for (const e of schema.enum) if (equals(val, e)) {
				enumValueMatch = true;
				break;
			}
			validationResult.enumValues = schema.enum;
			validationResult.enumValueMatch = enumValueMatch;
			if (!enumValueMatch) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				code: ErrorCode.EnumValueMismatch,
				message: schema.errorMessage || t("Value is not accepted. Valid values: {0}.", schema.enum.map((v) => JSON.stringify(v)).join(", "))
			});
		}
		if (isDefined(schema.const)) {
			if (!equals(getNodeValue(node), schema.const)) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length
					},
					code: ErrorCode.EnumValueMismatch,
					message: schema.errorMessage || t("Value must be {0}.", JSON.stringify(schema.const))
				});
				validationResult.enumValueMatch = false;
			} else validationResult.enumValueMatch = true;
			validationResult.enumValues = [schema.const];
		}
		let deprecationMessage = schema.deprecationMessage;
		if (deprecationMessage || schema.deprecated) {
			deprecationMessage = deprecationMessage || t("Value is deprecated");
			let targetNode = node.parent?.type === "property" ? node.parent : node;
			validationResult.problems.push({
				location: {
					offset: targetNode.offset,
					length: targetNode.length
				},
				severity: DiagnosticSeverity$1.Warning,
				message: deprecationMessage,
				code: ErrorCode.Deprecated
			});
		}
	}
	function _validateNumberNode(node$1) {
		const val = node$1.value;
		function normalizeFloats(float) {
			const parts = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(float.toString());
			return parts && {
				value: Number(parts[1] + (parts[2] || "")),
				multiplier: (parts[2]?.length || 0) - (parseInt(parts[3]) || 0)
			};
		}
		if (isNumber(schema.multipleOf)) {
			let remainder = -1;
			if (Number.isInteger(schema.multipleOf)) remainder = val % schema.multipleOf;
			else {
				let normMultipleOf = normalizeFloats(schema.multipleOf);
				let normValue = normalizeFloats(val);
				if (normMultipleOf && normValue) {
					const multiplier = 10 ** Math.abs(normValue.multiplier - normMultipleOf.multiplier);
					if (normValue.multiplier < normMultipleOf.multiplier) normValue.value *= multiplier;
					else normMultipleOf.value *= multiplier;
					remainder = normValue.value % normMultipleOf.value;
				}
			}
			if (remainder !== 0) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Value is not divisible by {0}.", schema.multipleOf)
			});
		}
		function getExclusiveLimit(limit, exclusive) {
			if (isNumber(exclusive)) return exclusive;
			if (isBoolean(exclusive) && exclusive) return limit;
		}
		function getLimit(limit, exclusive) {
			if (!isBoolean(exclusive) || !exclusive) return limit;
		}
		const exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(exclusiveMinimum) && val <= exclusiveMinimum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is below the exclusive minimum of {0}.", exclusiveMinimum)
		});
		const exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(exclusiveMaximum) && val >= exclusiveMaximum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is above the exclusive maximum of {0}.", exclusiveMaximum)
		});
		const minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(minimum) && val < minimum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is below the minimum of {0}.", minimum)
		});
		const maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(maximum) && val > maximum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is above the maximum of {0}.", maximum)
		});
	}
	function _validateStringNode(node$1) {
		if (isNumber(schema.minLength) && stringLength(node$1.value) < schema.minLength) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("String is shorter than the minimum length of {0}.", schema.minLength)
		});
		if (isNumber(schema.maxLength) && stringLength(node$1.value) > schema.maxLength) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("String is longer than the maximum length of {0}.", schema.maxLength)
		});
		if (isString(schema.pattern)) {
			if (!extendedRegExp(schema.pattern)?.test(node$1.value)) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.patternErrorMessage || schema.errorMessage || t("String does not match the pattern of \"{0}\".", schema.pattern)
			});
		}
		if (schema.format) switch (schema.format) {
			case "uri":
			case "uri-reference":
				{
					let errorMessage;
					if (!node$1.value) errorMessage = t("URI expected.");
					else {
						const match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node$1.value);
						if (!match) errorMessage = t("URI is expected.");
						else if (!match[2] && schema.format === "uri") errorMessage = t("URI with a scheme is expected.");
					}
					if (errorMessage) validationResult.problems.push({
						location: {
							offset: node$1.offset,
							length: node$1.length
						},
						message: schema.patternErrorMessage || schema.errorMessage || t("String is not a URI: {0}", errorMessage)
					});
				}
				break;
			case "color-hex":
			case "date-time":
			case "date":
			case "time":
			case "email":
			case "hostname":
			case "ipv4":
			case "ipv6":
				const format$4 = formats[schema.format];
				if (!node$1.value || !format$4.pattern.exec(node$1.value)) validationResult.problems.push({
					location: {
						offset: node$1.offset,
						length: node$1.length
					},
					message: schema.patternErrorMessage || schema.errorMessage || format$4.errorMessage
				});
			default:
		}
	}
	function _validateArrayNode(node$1) {
		let prefixItemsSchemas;
		let additionalItemSchema;
		if (context.schemaDraft >= SchemaDraft.v2020_12) {
			prefixItemsSchemas = schema.prefixItems;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : void 0;
		} else {
			prefixItemsSchemas = Array.isArray(schema.items) ? schema.items : void 0;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : schema.additionalItems;
		}
		let index = 0;
		if (prefixItemsSchemas !== void 0) {
			const max = Math.min(prefixItemsSchemas.length, node$1.items.length);
			for (; index < max; index++) {
				const subSchemaRef = prefixItemsSchemas[index];
				const subSchema = asSchema(subSchemaRef);
				const itemValidationResult = new ValidationResult();
				const item = node$1.items[index];
				if (item) {
					validate(item, subSchema, itemValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(itemValidationResult);
				}
				validationResult.processedProperties.add(String(index));
			}
		}
		if (additionalItemSchema !== void 0 && index < node$1.items.length) if (typeof additionalItemSchema === "boolean") {
			if (additionalItemSchema === false) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Array has too many items according to schema. Expected {0} or fewer.", index)
			});
			for (; index < node$1.items.length; index++) {
				validationResult.processedProperties.add(String(index));
				validationResult.propertiesValueMatches++;
			}
		} else for (; index < node$1.items.length; index++) {
			const itemValidationResult = new ValidationResult();
			validate(node$1.items[index], additionalItemSchema, itemValidationResult, matchingSchemas, context);
			validationResult.mergePropertyMatch(itemValidationResult);
			validationResult.processedProperties.add(String(index));
		}
		const containsSchema = asSchema(schema.contains);
		if (containsSchema) {
			let containsCount = 0;
			for (let index$1 = 0; index$1 < node$1.items.length; index$1++) {
				const item = node$1.items[index$1];
				const itemValidationResult = new ValidationResult();
				validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance, context);
				if (!itemValidationResult.hasProblems()) {
					containsCount++;
					if (context.schemaDraft >= SchemaDraft.v2020_12) validationResult.processedProperties.add(String(index$1));
				}
			}
			if (containsCount === 0 && !isNumber(schema.minContains)) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array does not contain required item.")
			});
			if (isNumber(schema.minContains) && containsCount < schema.minContains) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array has too few items that match the contains contraint. Expected {0} or more.", schema.minContains)
			});
			if (isNumber(schema.maxContains) && containsCount > schema.maxContains) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array has too many items that match the contains contraint. Expected {0} or less.", schema.maxContains)
			});
		}
		const unevaluatedItems = schema.unevaluatedItems;
		if (unevaluatedItems !== void 0) for (let i = 0; i < node$1.items.length; i++) {
			if (!validationResult.processedProperties.has(String(i))) if (unevaluatedItems === false) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Item does not match any validation rule from the array.")
			});
			else {
				const itemValidationResult = new ValidationResult();
				validate(node$1.items[i], schema.unevaluatedItems, itemValidationResult, matchingSchemas, context);
				validationResult.mergePropertyMatch(itemValidationResult);
			}
			validationResult.processedProperties.add(String(i));
			validationResult.propertiesValueMatches++;
		}
		if (isNumber(schema.minItems) && node$1.items.length < schema.minItems) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Array has too few items. Expected {0} or more.", schema.minItems)
		});
		if (isNumber(schema.maxItems) && node$1.items.length > schema.maxItems) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Array has too many items. Expected {0} or fewer.", schema.maxItems)
		});
		if (schema.uniqueItems === true) {
			const values = getNodeValue(node$1);
			function hasDuplicates() {
				for (let i = 0; i < values.length - 1; i++) {
					const value = values[i];
					for (let j = i + 1; j < values.length; j++) if (equals(value, values[j])) return true;
				}
				return false;
			}
			if (hasDuplicates()) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Array has duplicate items.")
			});
		}
	}
	function _validateObjectNode(node$1) {
		const seenKeys = Object.create(null);
		const unprocessedProperties = /* @__PURE__ */ new Set();
		for (const propertyNode of node$1.properties) {
			const key = propertyNode.keyNode.value;
			seenKeys[key] = propertyNode.valueNode;
			unprocessedProperties.add(key);
		}
		if (Array.isArray(schema.required)) {
			for (const propertyName of schema.required) if (!seenKeys[propertyName]) {
				const keyNode = node$1.parent && node$1.parent.type === "property" && node$1.parent.keyNode;
				const location = keyNode ? {
					offset: keyNode.offset,
					length: keyNode.length
				} : {
					offset: node$1.offset,
					length: 1
				};
				validationResult.problems.push({
					location,
					message: t("Missing property \"{0}\".", propertyName)
				});
			}
		}
		const propertyProcessed = (prop) => {
			unprocessedProperties.delete(prop);
			validationResult.processedProperties.add(prop);
		};
		if (schema.properties) for (const propertyName of Object.keys(schema.properties)) {
			propertyProcessed(propertyName);
			const propertySchema = schema.properties[propertyName];
			const child = seenKeys[propertyName];
			if (child) if (isBoolean(propertySchema)) if (!propertySchema) {
				const propertyNode = child.parent;
				validationResult.problems.push({
					location: {
						offset: propertyNode.keyNode.offset,
						length: propertyNode.keyNode.length
					},
					message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
				});
			} else {
				validationResult.propertiesMatches++;
				validationResult.propertiesValueMatches++;
			}
			else {
				const propertyValidationResult = new ValidationResult();
				validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
				validationResult.mergePropertyMatch(propertyValidationResult);
			}
		}
		if (schema.patternProperties) for (const propertyPattern of Object.keys(schema.patternProperties)) {
			const regex = extendedRegExp(propertyPattern);
			if (regex) {
				const processed = [];
				for (const propertyName of unprocessedProperties) if (regex.test(propertyName)) {
					processed.push(propertyName);
					const child = seenKeys[propertyName];
					if (child) {
						const propertySchema = schema.patternProperties[propertyPattern];
						if (isBoolean(propertySchema)) if (!propertySchema) {
							const propertyNode = child.parent;
							validationResult.problems.push({
								location: {
									offset: propertyNode.keyNode.offset,
									length: propertyNode.keyNode.length
								},
								message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
							});
						} else {
							validationResult.propertiesMatches++;
							validationResult.propertiesValueMatches++;
						}
						else {
							const propertyValidationResult = new ValidationResult();
							validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
							validationResult.mergePropertyMatch(propertyValidationResult);
						}
					}
				}
				processed.forEach(propertyProcessed);
			}
		}
		const additionalProperties = schema.additionalProperties;
		if (additionalProperties !== void 0) for (const propertyName of unprocessedProperties) {
			propertyProcessed(propertyName);
			const child = seenKeys[propertyName];
			if (child) {
				if (additionalProperties === false) {
					const propertyNode = child.parent;
					validationResult.problems.push({
						location: {
							offset: propertyNode.keyNode.offset,
							length: propertyNode.keyNode.length
						},
						message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
					});
				} else if (additionalProperties !== true) {
					const propertyValidationResult = new ValidationResult();
					validate(child, additionalProperties, propertyValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(propertyValidationResult);
				}
			}
		}
		const unevaluatedProperties = schema.unevaluatedProperties;
		if (unevaluatedProperties !== void 0) {
			const processed = [];
			for (const propertyName of unprocessedProperties) if (!validationResult.processedProperties.has(propertyName)) {
				processed.push(propertyName);
				const child = seenKeys[propertyName];
				if (child) {
					if (unevaluatedProperties === false) {
						const propertyNode = child.parent;
						validationResult.problems.push({
							location: {
								offset: propertyNode.keyNode.offset,
								length: propertyNode.keyNode.length
							},
							message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
						});
					} else if (unevaluatedProperties !== true) {
						const propertyValidationResult = new ValidationResult();
						validate(child, unevaluatedProperties, propertyValidationResult, matchingSchemas, context);
						validationResult.mergePropertyMatch(propertyValidationResult);
					}
				}
			}
			processed.forEach(propertyProcessed);
		}
		if (isNumber(schema.maxProperties)) {
			if (node$1.properties.length > schema.maxProperties) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object has more properties than limit of {0}.", schema.maxProperties)
			});
		}
		if (isNumber(schema.minProperties)) {
			if (node$1.properties.length < schema.minProperties) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object has fewer properties than the required number of {0}", schema.minProperties)
			});
		}
		if (schema.dependentRequired) for (const key in schema.dependentRequired) {
			const prop = seenKeys[key];
			const propertyDeps = schema.dependentRequired[key];
			if (prop && Array.isArray(propertyDeps)) _validatePropertyDependencies(key, propertyDeps);
		}
		if (schema.dependentSchemas) for (const key in schema.dependentSchemas) {
			const prop = seenKeys[key];
			const propertyDeps = schema.dependentSchemas[key];
			if (prop && isObject(propertyDeps)) _validatePropertyDependencies(key, propertyDeps);
		}
		if (schema.dependencies) {
			for (const key in schema.dependencies) if (seenKeys[key]) _validatePropertyDependencies(key, schema.dependencies[key]);
		}
		const propertyNames = asSchema(schema.propertyNames);
		if (propertyNames) for (const f$1 of node$1.properties) {
			const key = f$1.keyNode;
			if (key) validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance, context);
		}
		function _validatePropertyDependencies(key, propertyDep) {
			if (Array.isArray(propertyDep)) for (const requiredProp of propertyDep) if (!seenKeys[requiredProp]) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object is missing property {0} required by property {1}.", requiredProp, key)
			});
			else validationResult.propertiesValueMatches++;
			else {
				const propertySchema = asSchema(propertyDep);
				if (propertySchema) {
					const propertyValidationResult = new ValidationResult();
					validate(node$1, propertySchema, propertyValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(propertyValidationResult);
				}
			}
		}
	}
}
function parse(textDocument, config) {
	const problems = [];
	let lastProblemOffset = -1;
	const text = textDocument.getText();
	const scanner = createScanner(text, false);
	const commentRanges = config && config.collectComments ? [] : void 0;
	function _scanNext() {
		while (true) {
			const token = scanner.scan();
			_checkScanError();
			switch (token) {
				case 12:
				case 13:
					if (Array.isArray(commentRanges)) commentRanges.push(Range.create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
					break;
				case 15:
				case 14: break;
				default: return token;
			}
		}
	}
	function _errorAtRange(message, code, startOffset, endOffset, severity = DiagnosticSeverity$1.Error) {
		if (problems.length === 0 || startOffset !== lastProblemOffset) {
			const range = Range.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
			problems.push(Diagnostic.create(range, message, severity, code, textDocument.languageId));
			lastProblemOffset = startOffset;
		}
	}
	function _error(message, code, node = void 0, skipUntilAfter = [], skipUntil = []) {
		let start = scanner.getTokenOffset();
		let end = scanner.getTokenOffset() + scanner.getTokenLength();
		if (start === end && start > 0) {
			start--;
			while (start > 0 && /\s/.test(text.charAt(start))) start--;
			end = start + 1;
		}
		_errorAtRange(message, code, start, end);
		if (node) _finalize(node, false);
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token = scanner.getToken();
			while (token !== 17) {
				if (skipUntilAfter.indexOf(token) !== -1) {
					_scanNext();
					break;
				} else if (skipUntil.indexOf(token) !== -1) break;
				token = _scanNext();
			}
		}
		return node;
	}
	function _checkScanError() {
		switch (scanner.getTokenError()) {
			case 4:
				_error(t("Invalid unicode sequence in string."), ErrorCode.InvalidUnicode);
				return true;
			case 5:
				_error(t("Invalid escape character in string."), ErrorCode.InvalidEscapeCharacter);
				return true;
			case 3:
				_error(t("Unexpected end of number."), ErrorCode.UnexpectedEndOfNumber);
				return true;
			case 1:
				_error(t("Unexpected end of comment."), ErrorCode.UnexpectedEndOfComment);
				return true;
			case 2:
				_error(t("Unexpected end of string."), ErrorCode.UnexpectedEndOfString);
				return true;
			case 6:
				_error(t("Invalid characters in string. Control characters must be escaped."), ErrorCode.InvalidCharacter);
				return true;
		}
		return false;
	}
	function _finalize(node, scanNext) {
		node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
		if (scanNext) _scanNext();
		return node;
	}
	function _parseArray(parent) {
		if (scanner.getToken() !== 3) return;
		const node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
		_scanNext();
		let needsComma = false;
		while (scanner.getToken() !== 4 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) _error(t("Value expected"), ErrorCode.ValueExpected);
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 4) {
					if (needsComma) _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					continue;
				}
			} else if (needsComma) _error(t("Expected comma"), ErrorCode.CommaExpected);
			const item = _parseValue(node);
			if (!item) _error(t("Value expected"), ErrorCode.ValueExpected, void 0, [], [4, 5]);
			else node.items.push(item);
			needsComma = true;
		}
		if (scanner.getToken() !== 4) return _error(t("Expected comma or closing bracket"), ErrorCode.CommaOrCloseBacketExpected, node);
		return _finalize(node, true);
	}
	const keyPlaceholder = new StringASTNodeImpl(void 0, 0, 0);
	function _parseProperty(parent, keysSeen) {
		const node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset(), keyPlaceholder);
		let key = _parseString(node);
		if (!key) if (scanner.getToken() === 16) {
			_error(t("Property keys must be doublequoted"), ErrorCode.PropertyKeysMustBeDoublequoted);
			const keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
			keyNode.value = scanner.getTokenValue();
			key = keyNode;
			_scanNext();
		} else return;
		node.keyNode = key;
		if (key.value !== "//") {
			const seen = keysSeen[key.value];
			if (seen) {
				_errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, DiagnosticSeverity$1.Warning);
				if (isObject(seen)) _errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, DiagnosticSeverity$1.Warning);
				keysSeen[key.value] = true;
			} else keysSeen[key.value] = node;
		}
		if (scanner.getToken() === 6) {
			node.colonOffset = scanner.getTokenOffset();
			_scanNext();
		} else {
			_error(t("Colon expected"), ErrorCode.ColonExpected);
			if (scanner.getToken() === 10 && textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
				node.length = key.length;
				return node;
			}
		}
		const value = _parseValue(node);
		if (!value) return _error(t("Value expected"), ErrorCode.ValueExpected, node, [], [2, 5]);
		node.valueNode = value;
		node.length = value.offset + value.length - node.offset;
		return node;
	}
	function _parseObject(parent) {
		if (scanner.getToken() !== 1) return;
		const node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
		const keysSeen = Object.create(null);
		_scanNext();
		let needsComma = false;
		while (scanner.getToken() !== 2 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) _error(t("Property expected"), ErrorCode.PropertyExpected);
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 2) {
					if (needsComma) _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					continue;
				}
			} else if (needsComma) _error(t("Expected comma"), ErrorCode.CommaExpected);
			const property = _parseProperty(node, keysSeen);
			if (!property) _error(t("Property expected"), ErrorCode.PropertyExpected, void 0, [], [2, 5]);
			else node.properties.push(property);
			needsComma = true;
		}
		if (scanner.getToken() !== 2) return _error(t("Expected comma or closing brace"), ErrorCode.CommaOrCloseBraceExpected, node);
		return _finalize(node, true);
	}
	function _parseString(parent) {
		if (scanner.getToken() !== 10) return;
		const node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
		node.value = scanner.getTokenValue();
		return _finalize(node, true);
	}
	function _parseNumber(parent) {
		if (scanner.getToken() !== 11) return;
		const node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
		if (scanner.getTokenError() === 0) {
			const tokenValue = scanner.getTokenValue();
			try {
				const numberValue = JSON.parse(tokenValue);
				if (!isNumber(numberValue)) return _error(t("Invalid number format."), ErrorCode.Undefined, node);
				node.value = numberValue;
			} catch (e) {
				return _error(t("Invalid number format."), ErrorCode.Undefined, node);
			}
			node.isInteger = tokenValue.indexOf(".") === -1;
		}
		return _finalize(node, true);
	}
	function _parseLiteral(parent) {
		switch (scanner.getToken()) {
			case 7: return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
			case 8: return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
			case 9: return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
			default: return;
		}
	}
	function _parseValue(parent) {
		return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
	}
	let _root = void 0;
	if (_scanNext() !== 17) {
		_root = _parseValue(_root);
		if (!_root) _error(t("Expected a JSON object, array or literal."), ErrorCode.Undefined);
		else if (scanner.getToken() !== 17) _error(t("End of file expected."), ErrorCode.Undefined);
	}
	return new JSONDocument(_root, problems, commentRanges);
}
function stringifyObject(obj, indent, stringifyLiteral) {
	if (obj !== null && typeof obj === "object") {
		const newIndent = indent + "	";
		if (Array.isArray(obj)) {
			if (obj.length === 0) return "[]";
			let result = "[\n";
			for (let i = 0; i < obj.length; i++) {
				result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
				if (i < obj.length - 1) result += ",";
				result += "\n";
			}
			result += indent + "]";
			return result;
		} else {
			const keys = Object.keys(obj);
			if (keys.length === 0) return "{}";
			let result = "{\n";
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				result += newIndent + JSON.stringify(key) + ": " + stringifyObject(obj[key], newIndent, stringifyLiteral);
				if (i < keys.length - 1) result += ",";
				result += "\n";
			}
			result += indent + "}";
			return result;
		}
	}
	return stringifyLiteral(obj);
}
var JSONCompletion = class {
	constructor(schemaService, contributions = [], promiseConstructor = Promise, clientCapabilities = {}) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promiseConstructor = promiseConstructor;
		this.clientCapabilities = clientCapabilities;
	}
	doResolve(item) {
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const resolveCompletion = this.contributions[i].resolveCompletion;
			if (resolveCompletion) {
				const resolver = resolveCompletion(item);
				if (resolver) return resolver;
			}
		}
		return this.promiseConstructor.resolve(item);
	}
	doComplete(document, position, doc) {
		const result = {
			items: [],
			isIncomplete: false
		};
		const text = document.getText();
		const offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		if (this.isInComment(document, node ? node.offset : 0, offset)) return Promise.resolve(result);
		if (node && offset === node.offset + node.length && offset > 0) {
			const ch = text[offset - 1];
			if (node.type === "object" && ch === "}" || node.type === "array" && ch === "]") node = node.parent;
		}
		const currentWord = this.getCurrentWord(document, offset);
		let overwriteRange;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) overwriteRange = Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
		else {
			let overwriteStart = offset - currentWord.length;
			if (overwriteStart > 0 && text[overwriteStart - 1] === "\"") overwriteStart--;
			overwriteRange = Range.create(document.positionAt(overwriteStart), position);
		}
		const proposed = /* @__PURE__ */ new Map();
		const collector = {
			add: (suggestion) => {
				let label = suggestion.label;
				const existing = proposed.get(label);
				if (!existing) {
					label = label.replace(/[\n]/g, "↵");
					if (label.length > 60) {
						const shortendedLabel = label.substr(0, 57).trim() + "...";
						if (!proposed.has(shortendedLabel)) label = shortendedLabel;
					}
					suggestion.textEdit = TextEdit.replace(overwriteRange, suggestion.insertText);
					suggestion.label = label;
					proposed.set(label, suggestion);
					result.items.push(suggestion);
				} else {
					if (!existing.documentation) existing.documentation = suggestion.documentation;
					if (!existing.detail) existing.detail = suggestion.detail;
					if (!existing.labelDetails) existing.labelDetails = suggestion.labelDetails;
				}
			},
			setAsIncomplete: () => {
				result.isIncomplete = true;
			},
			error: (message) => {
				console.error(message);
			},
			getNumberOfProposals: () => {
				return result.items.length;
			}
		};
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			const collectionPromises = [];
			let addValue = true;
			let currentKey = "";
			let currentProperty = void 0;
			if (node) {
				if (node.type === "string") {
					const parent = node.parent;
					if (parent && parent.type === "property" && parent.keyNode === node) {
						addValue = !parent.valueNode;
						currentProperty = parent;
						currentKey = text.substr(node.offset + 1, node.length - 2);
						if (parent) node = parent.parent;
					}
				}
			}
			if (node && node.type === "object") {
				if (node.offset === offset) return result;
				node.properties.forEach((p) => {
					if (!currentProperty || currentProperty !== p) proposed.set(p.keyNode.value, CompletionItem.create("__"));
				});
				let separatorAfter = "";
				if (addValue) separatorAfter = this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
				if (schema) this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector);
				else this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
				const location = getNodePath(node);
				this.contributions.forEach((contribution) => {
					const collectPromise = contribution.collectPropertyCompletions(document.uri, location, currentWord, addValue, separatorAfter === "", collector);
					if (collectPromise) collectionPromises.push(collectPromise);
				});
				if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== "\"") {
					collector.add({
						kind: CompletionItemKind$2.Property,
						label: this.getLabelForValue(currentWord),
						insertText: this.getInsertTextForProperty(currentWord, void 0, false, separatorAfter),
						insertTextFormat: InsertTextFormat$1.Snippet,
						documentation: ""
					});
					collector.setAsIncomplete();
				}
			}
			const types = {};
			if (schema) this.getValueCompletions(schema, doc, node, offset, document, collector, types);
			else this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
			if (this.contributions.length > 0) this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
			return this.promiseConstructor.all(collectionPromises).then(() => {
				if (collector.getNumberOfProposals() === 0) {
					let offsetForSeparator = offset;
					if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) offsetForSeparator = node.offset + node.length;
					const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
					this.addFillerValueCompletions(types, separatorAfter, collector);
				}
				return result;
			});
		});
	}
	getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector) {
		doc.getMatchingSchemas(schema.schema, node.offset).forEach((s) => {
			if (s.node === node && !s.inverted) {
				const schemaProperties = s.schema.properties;
				if (schemaProperties) Object.keys(schemaProperties).forEach((key) => {
					const propertySchema = schemaProperties[key];
					if (typeof propertySchema === "object" && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
						const proposal = {
							kind: CompletionItemKind$2.Property,
							label: key,
							insertText: this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
							insertTextFormat: InsertTextFormat$1.Snippet,
							filterText: this.getFilterTextForValue(key),
							documentation: this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || ""
						};
						if (propertySchema.completionDetail !== void 0) proposal.detail = propertySchema.completionDetail;
						if (propertySchema.suggestSortText !== void 0) proposal.sortText = propertySchema.suggestSortText;
						if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) proposal.command = {
							title: "Suggest",
							command: "editor.action.triggerSuggest"
						};
						collector.add(proposal);
					}
				});
				const schemaPropertyNames = s.schema.propertyNames;
				if (typeof schemaPropertyNames === "object" && !schemaPropertyNames.deprecationMessage && !schemaPropertyNames.doNotSuggest) {
					const propertyNameCompletionItem = (name, enumDescription = void 0) => {
						const proposal = {
							kind: CompletionItemKind$2.Property,
							label: name,
							insertText: this.getInsertTextForProperty(name, void 0, addValue, separatorAfter),
							insertTextFormat: InsertTextFormat$1.Snippet,
							filterText: this.getFilterTextForValue(name),
							documentation: enumDescription || this.fromMarkup(schemaPropertyNames.markdownDescription) || schemaPropertyNames.description || ""
						};
						if (schemaPropertyNames.completionDetail !== void 0) proposal.detail = schemaPropertyNames.completionDetail;
						if (schemaPropertyNames.suggestSortText !== void 0) proposal.sortText = schemaPropertyNames.suggestSortText;
						if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) proposal.command = {
							title: "Suggest",
							command: "editor.action.triggerSuggest"
						};
						collector.add(proposal);
					};
					if (schemaPropertyNames.enum) for (let i = 0; i < schemaPropertyNames.enum.length; i++) {
						let enumDescription = void 0;
						if (schemaPropertyNames.markdownEnumDescriptions && i < schemaPropertyNames.markdownEnumDescriptions.length) enumDescription = this.fromMarkup(schemaPropertyNames.markdownEnumDescriptions[i]);
						else if (schemaPropertyNames.enumDescriptions && i < schemaPropertyNames.enumDescriptions.length) enumDescription = schemaPropertyNames.enumDescriptions[i];
						propertyNameCompletionItem(schemaPropertyNames.enum[i], enumDescription);
					}
					if (schemaPropertyNames.const) propertyNameCompletionItem(schemaPropertyNames.const);
				}
			}
		});
	}
	getSchemaLessPropertyCompletions(doc, node, currentKey, collector) {
		const collectCompletionsForSimilarObject = (obj) => {
			obj.properties.forEach((p) => {
				const key = p.keyNode.value;
				collector.add({
					kind: CompletionItemKind$2.Property,
					label: key,
					insertText: this.getInsertTextForValue(key, ""),
					insertTextFormat: InsertTextFormat$1.Snippet,
					filterText: this.getFilterTextForValue(key),
					documentation: ""
				});
			});
		};
		if (node.parent) {
			if (node.parent.type === "property") {
				const parentKey = node.parent.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n !== node.parent && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "object") collectCompletionsForSimilarObject(n.valueNode);
					return true;
				});
			} else if (node.parent.type === "array") node.parent.items.forEach((n) => {
				if (n.type === "object" && n !== node) collectCompletionsForSimilarObject(n);
			});
		} else if (node.type === "object") collector.add({
			kind: CompletionItemKind$2.Property,
			label: "$schema",
			insertText: this.getInsertTextForProperty("$schema", void 0, true, ""),
			insertTextFormat: InsertTextFormat$1.Snippet,
			documentation: "",
			filterText: this.getFilterTextForValue("$schema")
		});
	}
	getSchemaLessValueCompletions(doc, node, offset, document, collector) {
		let offsetForSeparator = offset;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			node = node.parent;
		}
		if (!node) {
			collector.add({
				kind: this.getSuggestionKind("object"),
				label: "Empty object",
				insertText: this.getInsertTextForValue({}, ""),
				insertTextFormat: InsertTextFormat$1.Snippet,
				documentation: ""
			});
			collector.add({
				kind: this.getSuggestionKind("array"),
				label: "Empty array",
				insertText: this.getInsertTextForValue([], ""),
				insertTextFormat: InsertTextFormat$1.Snippet,
				documentation: ""
			});
			return;
		}
		const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
		const collectSuggestionsForValues = (value) => {
			if (value.parent && !contains(value.parent, offset, true)) collector.add({
				kind: this.getSuggestionKind(value.type),
				label: this.getLabelTextForMatchingNode(value, document),
				insertText: this.getInsertTextForMatchingNode(value, document, separatorAfter),
				insertTextFormat: InsertTextFormat$1.Snippet,
				documentation: ""
			});
			if (value.type === "boolean") this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
		};
		if (node.type === "property") {
			if (offset > (node.colonOffset || 0)) {
				const valueNode = node.valueNode;
				if (valueNode && (offset > valueNode.offset + valueNode.length || valueNode.type === "object" || valueNode.type === "array")) return;
				const parentKey = node.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode) collectSuggestionsForValues(n.valueNode);
					return true;
				});
				if (parentKey === "$schema" && node.parent && !node.parent.parent) this.addDollarSchemaCompletions(separatorAfter, collector);
			}
		}
		if (node.type === "array") if (node.parent && node.parent.type === "property") {
			const parentKey = node.parent.keyNode.value;
			doc.visit((n) => {
				if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "array") n.valueNode.items.forEach(collectSuggestionsForValues);
				return true;
			});
		} else node.items.forEach(collectSuggestionsForValues);
	}
	getValueCompletions(schema, doc, node, offset, document, collector, types) {
		let offsetForSeparator = offset;
		let parentKey = void 0;
		let valueNode = void 0;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			valueNode = node;
			node = node.parent;
		}
		if (!node) {
			this.addSchemaValueCompletions(schema.schema, "", collector, types);
			return;
		}
		if (node.type === "property" && offset > (node.colonOffset || 0)) {
			const valueNode$1 = node.valueNode;
			if (valueNode$1 && offset > valueNode$1.offset + valueNode$1.length) return;
			parentKey = node.keyNode.value;
			node = node.parent;
		}
		if (node && (parentKey !== void 0 || node.type === "array")) {
			const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
			const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
			for (const s of matchingSchemas) if (s.node === node && !s.inverted && s.schema) {
				if (node.type === "array" && s.schema.items) {
					let c = collector;
					if (s.schema.uniqueItems) {
						const existingValues = /* @__PURE__ */ new Set();
						node.children.forEach((n) => {
							if (n.type !== "array" && n.type !== "object") existingValues.add(this.getLabelForValue(getNodeValue(n)));
						});
						c = {
							...collector,
							add(suggestion) {
								if (!existingValues.has(suggestion.label)) collector.add(suggestion);
							}
						};
					}
					if (Array.isArray(s.schema.items)) {
						const index = this.findItemAtOffset(node, document, offset);
						if (index < s.schema.items.length) this.addSchemaValueCompletions(s.schema.items[index], separatorAfter, c, types);
					} else this.addSchemaValueCompletions(s.schema.items, separatorAfter, c, types);
				}
				if (parentKey !== void 0) {
					let propertyMatched = false;
					if (s.schema.properties) {
						const propertySchema = s.schema.properties[parentKey];
						if (propertySchema) {
							propertyMatched = true;
							this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
						}
					}
					if (s.schema.patternProperties && !propertyMatched) {
						for (const pattern of Object.keys(s.schema.patternProperties)) if (extendedRegExp(pattern)?.test(parentKey)) {
							propertyMatched = true;
							const propertySchema = s.schema.patternProperties[pattern];
							this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
						}
					}
					if (s.schema.additionalProperties && !propertyMatched) {
						const propertySchema = s.schema.additionalProperties;
						this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
					}
				}
			}
			if (parentKey === "$schema" && !node.parent) this.addDollarSchemaCompletions(separatorAfter, collector);
			if (types["boolean"]) {
				this.addBooleanValueCompletion(true, separatorAfter, collector);
				this.addBooleanValueCompletion(false, separatorAfter, collector);
			}
			if (types["null"]) this.addNullValueCompletion(separatorAfter, collector);
		}
	}
	getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises) {
		if (!node) this.contributions.forEach((contribution) => {
			const collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
			if (collectPromise) collectionPromises.push(collectPromise);
		});
		else {
			if (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null") node = node.parent;
			if (node && node.type === "property" && offset > (node.colonOffset || 0)) {
				const parentKey = node.keyNode.value;
				const valueNode = node.valueNode;
				if ((!valueNode || offset <= valueNode.offset + valueNode.length) && node.parent) {
					const location = getNodePath(node.parent);
					this.contributions.forEach((contribution) => {
						const collectPromise = contribution.collectValueCompletions(document.uri, location, parentKey, collector);
						if (collectPromise) collectionPromises.push(collectPromise);
					});
				}
			}
		}
	}
	addSchemaValueCompletions(schema, separatorAfter, collector, types) {
		if (typeof schema === "object") {
			this.addEnumValueCompletions(schema, separatorAfter, collector);
			this.addDefaultValueCompletions(schema, separatorAfter, collector);
			this.collectTypes(schema, types);
			if (Array.isArray(schema.allOf)) schema.allOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			if (Array.isArray(schema.anyOf)) schema.anyOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			if (Array.isArray(schema.oneOf)) schema.oneOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
		}
	}
	addDefaultValueCompletions(schema, separatorAfter, collector, arrayDepth = 0) {
		let hasProposals = false;
		if (isDefined(schema.default)) {
			let type = schema.type;
			let value = schema.default;
			for (let i = arrayDepth; i > 0; i--) {
				value = [value];
				type = "array";
			}
			const completionItem = {
				kind: this.getSuggestionKind(type),
				label: this.getLabelForValue(value),
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: InsertTextFormat$1.Snippet
			};
			if (this.doesSupportsLabelDetails()) completionItem.labelDetails = { description: t("Default value") };
			else completionItem.detail = t("Default value");
			collector.add(completionItem);
			hasProposals = true;
		}
		if (Array.isArray(schema.examples)) schema.examples.forEach((example) => {
			let type = schema.type;
			let value = example;
			for (let i = arrayDepth; i > 0; i--) {
				value = [value];
				type = "array";
			}
			collector.add({
				kind: this.getSuggestionKind(type),
				label: this.getLabelForValue(value),
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: InsertTextFormat$1.Snippet
			});
			hasProposals = true;
		});
		if (Array.isArray(schema.defaultSnippets)) schema.defaultSnippets.forEach((s) => {
			let type = schema.type;
			let value = s.body;
			let label = s.label;
			let insertText;
			let filterText;
			if (isDefined(value)) {
				schema.type;
				for (let i = arrayDepth; i > 0; i--) value = [value];
				insertText = this.getInsertTextForSnippetValue(value, separatorAfter);
				filterText = this.getFilterTextForSnippetValue(value);
				label = label || this.getLabelForSnippetValue(value);
			} else if (typeof s.bodyText === "string") {
				let prefix = "", suffix = "", indent = "";
				for (let i = arrayDepth; i > 0; i--) {
					prefix = prefix + indent + "[\n";
					suffix = suffix + "\n" + indent + "]";
					indent += "	";
					type = "array";
				}
				insertText = prefix + indent + s.bodyText.split("\n").join("\n" + indent) + suffix + separatorAfter;
				label = label || insertText, filterText = insertText.replace(/[\n]/g, "");
			} else return;
			collector.add({
				kind: this.getSuggestionKind(type),
				label,
				documentation: this.fromMarkup(s.markdownDescription) || s.description,
				insertText,
				insertTextFormat: InsertTextFormat$1.Snippet,
				filterText
			});
			hasProposals = true;
		});
		if (!hasProposals && typeof schema.items === "object" && !Array.isArray(schema.items) && arrayDepth < 5) this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
	}
	addEnumValueCompletions(schema, separatorAfter, collector) {
		if (isDefined(schema.const)) collector.add({
			kind: this.getSuggestionKind(schema.type),
			label: this.getLabelForValue(schema.const),
			insertText: this.getInsertTextForValue(schema.const, separatorAfter),
			insertTextFormat: InsertTextFormat$1.Snippet,
			documentation: this.fromMarkup(schema.markdownDescription) || schema.description
		});
		if (Array.isArray(schema.enum)) for (let i = 0, length = schema.enum.length; i < length; i++) {
			const enm = schema.enum[i];
			let documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
			if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
			else if (schema.enumDescriptions && i < schema.enumDescriptions.length) documentation = schema.enumDescriptions[i];
			collector.add({
				kind: this.getSuggestionKind(schema.type),
				label: this.getLabelForValue(enm),
				insertText: this.getInsertTextForValue(enm, separatorAfter),
				insertTextFormat: InsertTextFormat$1.Snippet,
				documentation
			});
		}
	}
	collectTypes(schema, types) {
		if (Array.isArray(schema.enum) || isDefined(schema.const)) return;
		const type = schema.type;
		if (Array.isArray(type)) type.forEach((t$1) => types[t$1] = true);
		else if (type) types[type] = true;
	}
	addFillerValueCompletions(types, separatorAfter, collector) {
		if (types["object"]) collector.add({
			kind: this.getSuggestionKind("object"),
			label: "{}",
			insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
			insertTextFormat: InsertTextFormat$1.Snippet,
			detail: t("New object"),
			documentation: ""
		});
		if (types["array"]) collector.add({
			kind: this.getSuggestionKind("array"),
			label: "[]",
			insertText: this.getInsertTextForGuessedValue([], separatorAfter),
			insertTextFormat: InsertTextFormat$1.Snippet,
			detail: t("New array"),
			documentation: ""
		});
	}
	addBooleanValueCompletion(value, separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("boolean"),
			label: value ? "true" : "false",
			insertText: this.getInsertTextForValue(value, separatorAfter),
			insertTextFormat: InsertTextFormat$1.Snippet,
			documentation: ""
		});
	}
	addNullValueCompletion(separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("null"),
			label: "null",
			insertText: "null" + separatorAfter,
			insertTextFormat: InsertTextFormat$1.Snippet,
			documentation: ""
		});
	}
	addDollarSchemaCompletions(separatorAfter, collector) {
		this.schemaService.getRegisteredSchemaIds((schema) => schema === "http" || schema === "https").forEach((schemaId) => {
			if (schemaId.startsWith("http://json-schema.org/draft-")) schemaId = schemaId + "#";
			collector.add({
				kind: CompletionItemKind$2.Module,
				label: this.getLabelForValue(schemaId),
				filterText: this.getFilterTextForValue(schemaId),
				insertText: this.getInsertTextForValue(schemaId, separatorAfter),
				insertTextFormat: InsertTextFormat$1.Snippet,
				documentation: ""
			});
		});
	}
	getLabelForValue(value) {
		return JSON.stringify(value);
	}
	getValueFromLabel(value) {
		return JSON.parse(value);
	}
	getFilterTextForValue(value) {
		return JSON.stringify(value);
	}
	getFilterTextForSnippetValue(value) {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getLabelForSnippetValue(value) {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getInsertTextForPlainText(text) {
		return text.replace(/[\\\$\}]/g, "\\$&");
	}
	getInsertTextForValue(value, separatorAfter) {
		const text = JSON.stringify(value, null, "	");
		if (text === "{}") return "{$1}" + separatorAfter;
		else if (text === "[]") return "[$1]" + separatorAfter;
		return this.getInsertTextForPlainText(text + separatorAfter);
	}
	getInsertTextForSnippetValue(value, separatorAfter) {
		const replacer = (value$1) => {
			if (typeof value$1 === "string") {
				if (value$1[0] === "^") return value$1.substr(1);
			}
			return JSON.stringify(value$1);
		};
		return stringifyObject(value, "", replacer) + separatorAfter;
	}
	getInsertTextForGuessedValue(value, separatorAfter) {
		switch (typeof value) {
			case "object":
				if (value === null) return "${1:null}" + separatorAfter;
				return this.getInsertTextForValue(value, separatorAfter);
			case "string":
				let snippetValue = JSON.stringify(value);
				snippetValue = snippetValue.substr(1, snippetValue.length - 2);
				snippetValue = this.getInsertTextForPlainText(snippetValue);
				return "\"${1:" + snippetValue + "}\"" + separatorAfter;
			case "number":
			case "boolean": return "${1:" + JSON.stringify(value) + "}" + separatorAfter;
		}
		return this.getInsertTextForValue(value, separatorAfter);
	}
	getSuggestionKind(type) {
		if (Array.isArray(type)) {
			const array$2 = type;
			type = array$2.length > 0 ? array$2[0] : void 0;
		}
		if (!type) return CompletionItemKind$2.Value;
		switch (type) {
			case "string": return CompletionItemKind$2.Value;
			case "object": return CompletionItemKind$2.Module;
			case "property": return CompletionItemKind$2.Property;
			default: return CompletionItemKind$2.Value;
		}
	}
	getLabelTextForMatchingNode(node, document) {
		switch (node.type) {
			case "array": return "[]";
			case "object": return "{}";
			default: return document.getText().substr(node.offset, node.length);
		}
	}
	getInsertTextForMatchingNode(node, document, separatorAfter) {
		switch (node.type) {
			case "array": return this.getInsertTextForValue([], separatorAfter);
			case "object": return this.getInsertTextForValue({}, separatorAfter);
			default:
				const content = document.getText().substr(node.offset, node.length) + separatorAfter;
				return this.getInsertTextForPlainText(content);
		}
	}
	getInsertTextForProperty(key, propertySchema, addValue, separatorAfter) {
		const propertyText = this.getInsertTextForValue(key, "");
		if (!addValue) return propertyText;
		const resultText = propertyText + ": ";
		let value;
		let nValueProposals = 0;
		if (propertySchema) {
			if (Array.isArray(propertySchema.defaultSnippets)) {
				if (propertySchema.defaultSnippets.length === 1) {
					const body = propertySchema.defaultSnippets[0].body;
					if (isDefined(body)) value = this.getInsertTextForSnippetValue(body, "");
				}
				nValueProposals += propertySchema.defaultSnippets.length;
			}
			if (propertySchema.enum) {
				if (!value && propertySchema.enum.length === 1) value = this.getInsertTextForGuessedValue(propertySchema.enum[0], "");
				nValueProposals += propertySchema.enum.length;
			}
			if (isDefined(propertySchema.const)) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.const, "");
				nValueProposals++;
			}
			if (isDefined(propertySchema.default)) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.default, "");
				nValueProposals++;
			}
			if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.examples[0], "");
				nValueProposals += propertySchema.examples.length;
			}
			if (nValueProposals === 0) {
				let type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
				if (!type) {
					if (propertySchema.properties) type = "object";
					else if (propertySchema.items) type = "array";
				}
				switch (type) {
					case "boolean":
						value = "$1";
						break;
					case "string":
						value = "\"$1\"";
						break;
					case "object":
						value = "{$1}";
						break;
					case "array":
						value = "[$1]";
						break;
					case "number":
					case "integer":
						value = "${1:0}";
						break;
					case "null":
						value = "${1:null}";
						break;
					default: return propertyText;
				}
			}
		}
		if (!value || nValueProposals > 1) value = "$1";
		return resultText + value + separatorAfter;
	}
	getCurrentWord(document, offset) {
		let i = offset - 1;
		const text = document.getText();
		while (i >= 0 && " 	\n\r\v\":{[,]}".indexOf(text.charAt(i)) === -1) i--;
		return text.substring(i + 1, offset);
	}
	evaluateSeparatorAfter(document, offset) {
		const scanner = createScanner(document.getText(), true);
		scanner.setPosition(offset);
		switch (scanner.scan()) {
			case 5:
			case 2:
			case 4:
			case 17: return "";
			default: return ",";
		}
	}
	findItemAtOffset(node, document, offset) {
		const scanner = createScanner(document.getText(), true);
		const children = node.items;
		for (let i = children.length - 1; i >= 0; i--) {
			const child = children[i];
			if (offset > child.offset + child.length) {
				scanner.setPosition(child.offset + child.length);
				if (scanner.scan() === 5 && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) return i + 1;
				return i;
			} else if (offset >= child.offset) return i;
		}
		return 0;
	}
	isInComment(document, start, offset) {
		const scanner = createScanner(document.getText(), false);
		scanner.setPosition(start);
		let token = scanner.scan();
		while (token !== 17 && scanner.getTokenOffset() + scanner.getTokenLength() < offset) token = scanner.scan();
		return (token === 12 || token === 13) && scanner.getTokenOffset() <= offset;
	}
	fromMarkup(markupString) {
		if (markupString && this.doesSupportMarkdown()) return {
			kind: MarkupKind.Markdown,
			value: markupString
		};
	}
	doesSupportMarkdown() {
		if (!isDefined(this.supportsMarkdown)) {
			const documentationFormat = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
			this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
		}
		return this.supportsMarkdown;
	}
	doesSupportsCommitCharacters() {
		if (!isDefined(this.supportsCommitCharacters)) this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport;
		return this.supportsCommitCharacters;
	}
	doesSupportsLabelDetails() {
		if (!isDefined(this.labelDetailsSupport)) this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport;
		return this.labelDetailsSupport;
	}
};
var JSONHover = class {
	constructor(schemaService, contributions = [], promiseConstructor) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promise = promiseConstructor || Promise;
	}
	doHover(document, position, doc) {
		const offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset);
		if (!node || (node.type === "object" || node.type === "array") && offset > node.offset + 1 && offset < node.offset + node.length - 1) return this.promise.resolve(null);
		const hoverRangeNode = node;
		if (node.type === "string") {
			const parent = node.parent;
			if (parent && parent.type === "property" && parent.keyNode === node) {
				node = parent.valueNode;
				if (!node) return this.promise.resolve(null);
			}
		}
		const hoverRange = Range.create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
		const createHover = (contents) => {
			return {
				contents,
				range: hoverRange
			};
		};
		const location = getNodePath(node);
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const promise = this.contributions[i].getInfoContribution(document.uri, location);
			if (promise) return promise.then((htmlContent) => createHover(htmlContent));
		}
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			if (schema && node) {
				const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
				let title = void 0;
				let markdownDescription = void 0;
				let markdownEnumValueDescription = void 0, enumValue = void 0;
				matchingSchemas.every((s) => {
					if (s.node === node && !s.inverted && s.schema) {
						title = title || s.schema.title;
						markdownDescription = markdownDescription || s.schema.markdownDescription || toMarkdown(s.schema.description);
						if (s.schema.enum) {
							const idx = s.schema.enum.indexOf(getNodeValue(node));
							if (s.schema.markdownEnumDescriptions) markdownEnumValueDescription = s.schema.markdownEnumDescriptions[idx];
							else if (s.schema.enumDescriptions) markdownEnumValueDescription = toMarkdown(s.schema.enumDescriptions[idx]);
							if (markdownEnumValueDescription) {
								enumValue = s.schema.enum[idx];
								if (typeof enumValue !== "string") enumValue = JSON.stringify(enumValue);
							}
						}
					}
					return true;
				});
				let result = "";
				if (title) result = toMarkdown(title);
				if (markdownDescription) {
					if (result.length > 0) result += "\n\n";
					result += markdownDescription;
				}
				if (markdownEnumValueDescription) {
					if (result.length > 0) result += "\n\n";
					result += `\`${toMarkdownCodeBlock(enumValue)}\`: ${markdownEnumValueDescription}`;
				}
				return createHover([result]);
			}
			return null;
		});
	}
};
function toMarkdown(plain) {
	if (plain) return plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3").replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
}
function toMarkdownCodeBlock(content) {
	if (content.indexOf("`") !== -1) return "`` " + content + " ``";
	return content;
}
var JSONValidation = class {
	constructor(jsonSchemaService, promiseConstructor) {
		this.jsonSchemaService = jsonSchemaService;
		this.promise = promiseConstructor;
		this.validationEnabled = true;
	}
	configure(raw) {
		if (raw) {
			this.validationEnabled = raw.validate !== false;
			this.commentSeverity = raw.allowComments ? void 0 : DiagnosticSeverity$1.Error;
		}
	}
	doValidation(textDocument, jsonDocument, documentSettings, schema) {
		if (!this.validationEnabled) return this.promise.resolve([]);
		const diagnostics = [];
		const added = {};
		const addProblem = (problem) => {
			const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
			if (!added[signature]) {
				added[signature] = true;
				diagnostics.push(problem);
			}
		};
		const getDiagnostics = (schema$1) => {
			let trailingCommaSeverity = documentSettings?.trailingCommas ? toDiagnosticSeverity(documentSettings.trailingCommas) : DiagnosticSeverity$1.Error;
			let commentSeverity = documentSettings?.comments ? toDiagnosticSeverity(documentSettings.comments) : this.commentSeverity;
			let schemaValidation = documentSettings?.schemaValidation ? toDiagnosticSeverity(documentSettings.schemaValidation) : DiagnosticSeverity$1.Warning;
			let schemaRequest = documentSettings?.schemaRequest ? toDiagnosticSeverity(documentSettings.schemaRequest) : DiagnosticSeverity$1.Warning;
			if (schema$1) {
				const addSchemaProblem = (errorMessage, errorCode) => {
					if (jsonDocument.root && schemaRequest) {
						const astRoot = jsonDocument.root;
						const property = astRoot.type === "object" ? astRoot.properties[0] : void 0;
						if (property && property.keyNode.value === "$schema") {
							const node = property.valueNode || property;
							const range = Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						} else {
							const range = Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						}
					}
				};
				if (schema$1.errors.length) addSchemaProblem(schema$1.errors[0], ErrorCode.SchemaResolveError);
				else if (schemaValidation) {
					for (const warning of schema$1.warnings) addSchemaProblem(warning, ErrorCode.SchemaUnsupportedFeature);
					const semanticErrors = jsonDocument.validate(textDocument, schema$1.schema, schemaValidation, documentSettings?.schemaDraft);
					if (semanticErrors) semanticErrors.forEach(addProblem);
				}
				if (schemaAllowsComments(schema$1.schema)) commentSeverity = void 0;
				if (schemaAllowsTrailingCommas(schema$1.schema)) trailingCommaSeverity = void 0;
			}
			for (const p of jsonDocument.syntaxErrors) {
				if (p.code === ErrorCode.TrailingComma) {
					if (typeof trailingCommaSeverity !== "number") continue;
					p.severity = trailingCommaSeverity;
				}
				addProblem(p);
			}
			if (typeof commentSeverity === "number") {
				const message = t("Comments are not permitted in JSON.");
				jsonDocument.comments.forEach((c) => {
					addProblem(Diagnostic.create(c, message, commentSeverity, ErrorCode.CommentNotPermitted));
				});
			}
			return diagnostics;
		};
		if (schema) {
			const uri = schema.id || "schemaservice://untitled/" + idCounter$1++;
			return this.jsonSchemaService.registerExternalSchema({
				uri,
				schema
			}).getResolvedSchema().then((resolvedSchema) => {
				return getDiagnostics(resolvedSchema);
			});
		}
		return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then((schema$1) => {
			return getDiagnostics(schema$1);
		});
	}
	getLanguageStatus(textDocument, jsonDocument) {
		return { schemas: this.jsonSchemaService.getSchemaURIsForResource(textDocument.uri, jsonDocument) };
	}
};
let idCounter$1 = 0;
function schemaAllowsComments(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowComments)) return schemaRef.allowComments;
		if (schemaRef.allOf) for (const schema of schemaRef.allOf) {
			const allow = schemaAllowsComments(schema);
			if (isBoolean(allow)) return allow;
		}
	}
}
function schemaAllowsTrailingCommas(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowTrailingCommas)) return schemaRef.allowTrailingCommas;
		const deprSchemaRef = schemaRef;
		if (isBoolean(deprSchemaRef["allowsTrailingCommas"])) return deprSchemaRef["allowsTrailingCommas"];
		if (schemaRef.allOf) for (const schema of schemaRef.allOf) {
			const allow = schemaAllowsTrailingCommas(schema);
			if (isBoolean(allow)) return allow;
		}
	}
}
function toDiagnosticSeverity(severityLevel) {
	switch (severityLevel) {
		case "error": return DiagnosticSeverity$1.Error;
		case "warning": return DiagnosticSeverity$1.Warning;
		case "ignore": return;
	}
}
const Digit0 = 48;
const Digit9 = 57;
const A = 65;
const a = 97;
const f = 102;
function hexDigit(charCode) {
	if (charCode < Digit0) return 0;
	if (charCode <= Digit9) return charCode - Digit0;
	if (charCode < a) charCode += a - A;
	if (charCode >= a && charCode <= f) return charCode - a + 10;
	return 0;
}
function colorFromHex(text) {
	if (text[0] !== "#") return;
	switch (text.length) {
		case 4: return {
			red: hexDigit(text.charCodeAt(1)) * 17 / 255,
			green: hexDigit(text.charCodeAt(2)) * 17 / 255,
			blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
			alpha: 1
		};
		case 5: return {
			red: hexDigit(text.charCodeAt(1)) * 17 / 255,
			green: hexDigit(text.charCodeAt(2)) * 17 / 255,
			blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
			alpha: hexDigit(text.charCodeAt(4)) * 17 / 255
		};
		case 7: return {
			red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
			green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
			blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
			alpha: 1
		};
		case 9: return {
			red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
			green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
			blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
			alpha: (hexDigit(text.charCodeAt(7)) * 16 + hexDigit(text.charCodeAt(8))) / 255
		};
	}
}
var JSONDocumentSymbols = class {
	constructor(schemaService) {
		this.schemaService = schemaService;
	}
	findDocumentSymbols(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
		const root = doc.root;
		if (!root) return [];
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document.uri;
		if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
			if (root.type === "array") {
				const result$1 = [];
				for (const item of root.items) if (item.type === "object") {
					for (const property of item.properties) if (property.keyNode.value === "key" && property.valueNode) {
						const location = Location.create(document.uri, getRange(document, item));
						result$1.push({
							name: getName(property.valueNode),
							kind: SymbolKind.Function,
							location
						});
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
							return result$1;
						}
					}
				}
				return result$1;
			}
		}
		const toVisit = [{
			node: root,
			containerName: ""
		}];
		let nextToVisit = 0;
		let limitExceeded = false;
		const result = [];
		const collectOutlineEntries = (node, containerName) => {
			if (node.type === "array") node.items.forEach((node$1) => {
				if (node$1) toVisit.push({
					node: node$1,
					containerName
				});
			});
			else if (node.type === "object") node.properties.forEach((property) => {
				const valueNode = property.valueNode;
				if (valueNode) if (limit > 0) {
					limit--;
					const location = Location.create(document.uri, getRange(document, property));
					const childContainerName = containerName ? containerName + "." + property.keyNode.value : property.keyNode.value;
					result.push({
						name: this.getKeyLabel(property),
						kind: this.getSymbolKind(valueNode.type),
						location,
						containerName
					});
					toVisit.push({
						node: valueNode,
						containerName: childContainerName
					});
				} else limitExceeded = true;
			});
		};
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.containerName);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
		return result;
	}
	findDocumentSymbols2(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
		const root = doc.root;
		if (!root) return [];
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document.uri;
		if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
			if (root.type === "array") {
				const result$1 = [];
				for (const item of root.items) if (item.type === "object") {
					for (const property of item.properties) if (property.keyNode.value === "key" && property.valueNode) {
						const range = getRange(document, item);
						const selectionRange = getRange(document, property.keyNode);
						result$1.push({
							name: getName(property.valueNode),
							kind: SymbolKind.Function,
							range,
							selectionRange
						});
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
							return result$1;
						}
					}
				}
				return result$1;
			}
		}
		const result = [];
		const toVisit = [{
			node: root,
			result
		}];
		let nextToVisit = 0;
		let limitExceeded = false;
		const collectOutlineEntries = (node, result$1) => {
			if (node.type === "array") node.items.forEach((node$1, index) => {
				if (node$1) if (limit > 0) {
					limit--;
					const range = getRange(document, node$1);
					const selectionRange = range;
					const symbol = {
						name: String(index),
						kind: this.getSymbolKind(node$1.type),
						range,
						selectionRange,
						children: []
					};
					result$1.push(symbol);
					toVisit.push({
						result: symbol.children,
						node: node$1
					});
				} else limitExceeded = true;
			});
			else if (node.type === "object") node.properties.forEach((property) => {
				const valueNode = property.valueNode;
				if (valueNode) if (limit > 0) {
					limit--;
					const range = getRange(document, property);
					const selectionRange = getRange(document, property.keyNode);
					const children = [];
					const symbol = {
						name: this.getKeyLabel(property),
						kind: this.getSymbolKind(valueNode.type),
						range,
						selectionRange,
						children,
						detail: this.getDetail(valueNode)
					};
					result$1.push(symbol);
					toVisit.push({
						result: children,
						node: valueNode
					});
				} else limitExceeded = true;
			});
		};
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.result);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
		return result;
	}
	getSymbolKind(nodeType) {
		switch (nodeType) {
			case "object": return SymbolKind.Module;
			case "string": return SymbolKind.String;
			case "number": return SymbolKind.Number;
			case "array": return SymbolKind.Array;
			case "boolean": return SymbolKind.Boolean;
			default: return SymbolKind.Variable;
		}
	}
	getKeyLabel(property) {
		let name = property.keyNode.value;
		if (name) name = name.replace(/[\n]/g, "↵");
		if (name && name.trim()) return name;
		return `"${name}"`;
	}
	getDetail(node) {
		if (!node) return;
		if (node.type === "boolean" || node.type === "number" || node.type === "null" || node.type === "string") return String(node.value);
		else if (node.type === "array") return node.children.length ? void 0 : "[]";
		else if (node.type === "object") return node.children.length ? void 0 : "{}";
	}
	findDocumentColors(document, doc, context) {
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			const result = [];
			if (schema) {
				let limit = context && typeof context.resultLimit === "number" ? context.resultLimit : Number.MAX_VALUE;
				const matchingSchemas = doc.getMatchingSchemas(schema.schema);
				const visitedNode = {};
				for (const s of matchingSchemas) if (!s.inverted && s.schema && (s.schema.format === "color" || s.schema.format === "color-hex") && s.node && s.node.type === "string") {
					const nodeId = String(s.node.offset);
					if (!visitedNode[nodeId]) {
						const color = colorFromHex(getNodeValue(s.node));
						if (color) {
							const range = getRange(document, s.node);
							result.push({
								color,
								range
							});
						}
						visitedNode[nodeId] = true;
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(document.uri);
							return result;
						}
					}
				}
			}
			return result;
		});
	}
	getColorPresentations(document, doc, color, range) {
		const result = [];
		const red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
		function toTwoDigitHex(n) {
			const r = n.toString(16);
			return r.length !== 2 ? "0" + r : r;
		}
		let label;
		if (color.alpha === 1) label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}`;
		else label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}${toTwoDigitHex(Math.round(color.alpha * 255))}`;
		result.push({
			label,
			textEdit: TextEdit.replace(range, JSON.stringify(label))
		});
		return result;
	}
};
function getRange(document, node) {
	return Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
}
function getName(node) {
	return getNodeValue(node) || t("<empty>");
}
const schemaContributions = {
	schemaAssociations: [],
	schemas: {
		"http://json-schema.org/draft-04/schema#": {
			"$schema": "http://json-schema.org/draft-04/schema#",
			"definitions": {
				"schemaArray": {
					"type": "array",
					"minItems": 1,
					"items": { "$ref": "#" }
				},
				"positiveInteger": {
					"type": "integer",
					"minimum": 0
				},
				"positiveIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }, { "default": 0 }] },
				"simpleTypes": {
					"type": "string",
					"enum": [
						"array",
						"boolean",
						"integer",
						"null",
						"number",
						"object",
						"string"
					]
				},
				"stringArray": {
					"type": "array",
					"items": { "type": "string" },
					"minItems": 1,
					"uniqueItems": true
				}
			},
			"type": "object",
			"properties": {
				"id": {
					"type": "string",
					"format": "uri"
				},
				"$schema": {
					"type": "string",
					"format": "uri"
				},
				"title": { "type": "string" },
				"description": { "type": "string" },
				"default": {},
				"multipleOf": {
					"type": "number",
					"minimum": 0,
					"exclusiveMinimum": true
				},
				"maximum": { "type": "number" },
				"exclusiveMaximum": {
					"type": "boolean",
					"default": false
				},
				"minimum": { "type": "number" },
				"exclusiveMinimum": {
					"type": "boolean",
					"default": false
				},
				"maxLength": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minLength": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"pattern": {
					"type": "string",
					"format": "regex"
				},
				"additionalItems": {
					"anyOf": [{ "type": "boolean" }, { "$ref": "#" }],
					"default": {}
				},
				"items": {
					"anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }],
					"default": {}
				},
				"maxItems": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minItems": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"uniqueItems": {
					"type": "boolean",
					"default": false
				},
				"maxProperties": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minProperties": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"required": { "allOf": [{ "$ref": "#/definitions/stringArray" }] },
				"additionalProperties": {
					"anyOf": [{ "type": "boolean" }, { "$ref": "#" }],
					"default": {}
				},
				"definitions": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"properties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"patternProperties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"dependencies": {
					"type": "object",
					"additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] }
				},
				"enum": {
					"type": "array",
					"minItems": 1,
					"uniqueItems": true
				},
				"type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, {
					"type": "array",
					"items": { "$ref": "#/definitions/simpleTypes" },
					"minItems": 1,
					"uniqueItems": true
				}] },
				"format": { "anyOf": [{
					"type": "string",
					"enum": [
						"date-time",
						"uri",
						"email",
						"hostname",
						"ipv4",
						"ipv6",
						"regex"
					]
				}, { "type": "string" }] },
				"allOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"anyOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"oneOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"not": { "allOf": [{ "$ref": "#" }] }
			},
			"dependencies": {
				"exclusiveMaximum": ["maximum"],
				"exclusiveMinimum": ["minimum"]
			},
			"default": {}
		},
		"http://json-schema.org/draft-07/schema#": {
			"definitions": {
				"schemaArray": {
					"type": "array",
					"minItems": 1,
					"items": { "$ref": "#" }
				},
				"nonNegativeInteger": {
					"type": "integer",
					"minimum": 0
				},
				"nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] },
				"simpleTypes": { "enum": [
					"array",
					"boolean",
					"integer",
					"null",
					"number",
					"object",
					"string"
				] },
				"stringArray": {
					"type": "array",
					"items": { "type": "string" },
					"uniqueItems": true,
					"default": []
				}
			},
			"type": ["object", "boolean"],
			"properties": {
				"$id": {
					"type": "string",
					"format": "uri-reference"
				},
				"$schema": {
					"type": "string",
					"format": "uri"
				},
				"$ref": {
					"type": "string",
					"format": "uri-reference"
				},
				"$comment": { "type": "string" },
				"title": { "type": "string" },
				"description": { "type": "string" },
				"default": true,
				"readOnly": {
					"type": "boolean",
					"default": false
				},
				"examples": {
					"type": "array",
					"items": true
				},
				"multipleOf": {
					"type": "number",
					"exclusiveMinimum": 0
				},
				"maximum": { "type": "number" },
				"exclusiveMaximum": { "type": "number" },
				"minimum": { "type": "number" },
				"exclusiveMinimum": { "type": "number" },
				"maxLength": { "$ref": "#/definitions/nonNegativeInteger" },
				"minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"pattern": {
					"type": "string",
					"format": "regex"
				},
				"additionalItems": { "$ref": "#" },
				"items": {
					"anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }],
					"default": true
				},
				"maxItems": { "$ref": "#/definitions/nonNegativeInteger" },
				"minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"uniqueItems": {
					"type": "boolean",
					"default": false
				},
				"contains": { "$ref": "#" },
				"maxProperties": { "$ref": "#/definitions/nonNegativeInteger" },
				"minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"required": { "$ref": "#/definitions/stringArray" },
				"additionalProperties": { "$ref": "#" },
				"definitions": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"properties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"patternProperties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"propertyNames": { "format": "regex" },
					"default": {}
				},
				"dependencies": {
					"type": "object",
					"additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] }
				},
				"propertyNames": { "$ref": "#" },
				"const": true,
				"enum": {
					"type": "array",
					"items": true,
					"minItems": 1,
					"uniqueItems": true
				},
				"type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, {
					"type": "array",
					"items": { "$ref": "#/definitions/simpleTypes" },
					"minItems": 1,
					"uniqueItems": true
				}] },
				"format": { "type": "string" },
				"contentMediaType": { "type": "string" },
				"contentEncoding": { "type": "string" },
				"if": { "$ref": "#" },
				"then": { "$ref": "#" },
				"else": { "$ref": "#" },
				"allOf": { "$ref": "#/definitions/schemaArray" },
				"anyOf": { "$ref": "#/definitions/schemaArray" },
				"oneOf": { "$ref": "#/definitions/schemaArray" },
				"not": { "$ref": "#" }
			},
			"default": true
		}
	}
};
const descriptions = {
	id: t("A unique identifier for the schema."),
	$schema: t("The schema to verify this document against."),
	title: t("A descriptive title of the schema."),
	description: t("A long description of the schema. Used in hover menus and suggestions."),
	default: t("A default value. Used by suggestions."),
	multipleOf: t("A number that should cleanly divide the current value (i.e. have no remainder)."),
	maximum: t("The maximum numerical value, inclusive by default."),
	exclusiveMaximum: t("Makes the maximum property exclusive."),
	minimum: t("The minimum numerical value, inclusive by default."),
	exclusiveMinimum: t("Makes the minimum property exclusive."),
	maxLength: t("The maximum length of a string."),
	minLength: t("The minimum length of a string."),
	pattern: t("A regular expression to match the string against. It is not implicitly anchored."),
	additionalItems: t("For arrays, only when items is set as an array. If items are a schema, this schema validates items after the ones specified by the items schema. If false, additional items will cause validation to fail."),
	items: t("For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
	maxItems: t("The maximum number of items that can be inside an array. Inclusive."),
	minItems: t("The minimum number of items that can be inside an array. Inclusive."),
	uniqueItems: t("If all of the items in the array must be unique. Defaults to false."),
	maxProperties: t("The maximum number of properties an object can have. Inclusive."),
	minProperties: t("The minimum number of properties an object can have. Inclusive."),
	required: t("An array of strings that lists the names of all properties required on this object."),
	additionalProperties: t("Either a schema or a boolean. If a schema, used to validate all properties not matched by 'properties', 'propertyNames', or 'patternProperties'. If false, any properties not defined by the adajacent keywords will cause this schema to fail."),
	definitions: t("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
	properties: t("A map of property names to schemas for each property."),
	patternProperties: t("A map of regular expressions on property names to schemas for matching properties."),
	dependencies: t("A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
	enum: t("The set of literal values that are valid."),
	type: t("Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
	format: t("Describes the format expected for the value. By default, not used for validation"),
	allOf: t("An array of schemas, all of which must match."),
	anyOf: t("An array of schemas, where at least one must match."),
	oneOf: t("An array of schemas, exactly one of which must match."),
	not: t("A schema which must not match."),
	$id: t("A unique identifier for the schema."),
	$ref: t("Reference a definition hosted on any location."),
	$comment: t("Comments from schema authors to readers or maintainers of the schema."),
	readOnly: t("Indicates that the value of the instance is managed exclusively by the owning authority."),
	examples: t("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
	contains: t("An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
	propertyNames: t("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
	const: t("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
	contentMediaType: t("Describes the media type of a string property."),
	contentEncoding: t("Describes the content encoding of a string property."),
	if: t("The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
	then: t("The \"then\" subschema is used for validation when the \"if\" subschema succeeds."),
	else: t("The \"else\" subschema is used for validation when the \"if\" subschema fails.")
};
for (const schemaName in schemaContributions.schemas) {
	const schema = schemaContributions.schemas[schemaName];
	for (const property in schema.properties) {
		let propertyObject = schema.properties[property];
		if (typeof propertyObject === "boolean") propertyObject = schema.properties[property] = {};
		const description = descriptions[property];
		if (description) propertyObject["description"] = description;
	}
}
function createRegex(glob, opts) {
	if (typeof glob !== "string") throw new TypeError("Expected a string");
	const str = String(glob);
	let reStr = "";
	const extended = opts ? !!opts.extended : false;
	const globstar = opts ? !!opts.globstar : false;
	let inGroup = false;
	const flags = opts && typeof opts.flags === "string" ? opts.flags : "";
	let c;
	for (let i = 0, len = str.length; i < len; i++) {
		c = str[i];
		switch (c) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				reStr += "\\" + c;
				break;
			case "?": if (extended) {
				reStr += ".";
				break;
			}
			case "[":
			case "]": if (extended) {
				reStr += c;
				break;
			}
			case "{": if (extended) {
				inGroup = true;
				reStr += "(";
				break;
			}
			case "}": if (extended) {
				inGroup = false;
				reStr += ")";
				break;
			}
			case ",":
				if (inGroup) {
					reStr += "|";
					break;
				}
				reStr += "\\" + c;
				break;
			case "*":
				const prevChar = str[i - 1];
				let starCount = 1;
				while (str[i + 1] === "*") {
					starCount++;
					i++;
				}
				const nextChar = str[i + 1];
				if (!globstar) reStr += ".*";
				else if (starCount > 1 && (prevChar === "/" || prevChar === void 0 || prevChar === "{" || prevChar === ",") && (nextChar === "/" || nextChar === void 0 || nextChar === "," || nextChar === "}")) {
					if (nextChar === "/") i++;
					else if (prevChar === "/" && reStr.endsWith("\\/")) reStr = reStr.substr(0, reStr.length - 2);
					reStr += "((?:[^/]*(?:/|$))*)";
				} else reStr += "([^/]*)";
				break;
			default: reStr += c;
		}
	}
	if (!flags || !~flags.indexOf("g")) reStr = "^" + reStr + "$";
	return new RegExp(reStr, flags);
}
const BANG = "!";
const PATH_SEP = "/";
var FilePatternAssociation = class {
	constructor(pattern, folderUri, uris) {
		this.folderUri = folderUri;
		this.uris = uris;
		this.globWrappers = [];
		try {
			for (let patternString of pattern) {
				const include = patternString[0] !== BANG;
				if (!include) patternString = patternString.substring(1);
				if (patternString.length > 0) {
					if (patternString[0] === PATH_SEP) patternString = patternString.substring(1);
					this.globWrappers.push({
						regexp: createRegex("**/" + patternString, {
							extended: true,
							globstar: true
						}),
						include
					});
				}
			}
			if (folderUri) {
				folderUri = normalizeResourceForMatching(folderUri);
				if (!folderUri.endsWith("/")) folderUri = folderUri + "/";
				this.folderUri = folderUri;
			}
		} catch (e) {
			this.globWrappers.length = 0;
			this.uris = [];
		}
	}
	matchesPattern(fileName) {
		if (this.folderUri && !fileName.startsWith(this.folderUri)) return false;
		let match = false;
		for (const { regexp, include } of this.globWrappers) if (regexp.test(fileName)) match = include;
		return match;
	}
	getURIs() {
		return this.uris;
	}
};
var SchemaHandle = class {
	constructor(service, uri, unresolvedSchemaContent) {
		this.service = service;
		this.uri = uri;
		this.dependencies = /* @__PURE__ */ new Set();
		this.anchors = void 0;
		if (unresolvedSchemaContent) this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
	}
	getUnresolvedSchema() {
		if (!this.unresolvedSchema) this.unresolvedSchema = this.service.loadSchema(this.uri);
		return this.unresolvedSchema;
	}
	getResolvedSchema() {
		if (!this.resolvedSchema) this.resolvedSchema = this.getUnresolvedSchema().then((unresolved) => {
			return this.service.resolveSchemaContent(unresolved, this);
		});
		return this.resolvedSchema;
	}
	clearSchema() {
		const hasChanges = !!this.unresolvedSchema;
		this.resolvedSchema = void 0;
		this.unresolvedSchema = void 0;
		this.dependencies.clear();
		this.anchors = void 0;
		return hasChanges;
	}
};
var UnresolvedSchema = class {
	constructor(schema, errors = []) {
		this.schema = schema;
		this.errors = errors;
	}
};
var ResolvedSchema = class {
	constructor(schema, errors = [], warnings = [], schemaDraft) {
		this.schema = schema;
		this.errors = errors;
		this.warnings = warnings;
		this.schemaDraft = schemaDraft;
	}
	getSection(path) {
		const schemaRef = this.getSectionRecursive(path, this.schema);
		if (schemaRef) return asSchema(schemaRef);
	}
	getSectionRecursive(path, schema) {
		if (!schema || typeof schema === "boolean" || path.length === 0) return schema;
		const next = path.shift();
		if (schema.properties && typeof schema.properties[next]) return this.getSectionRecursive(path, schema.properties[next]);
		else if (schema.patternProperties) {
			for (const pattern of Object.keys(schema.patternProperties)) if (extendedRegExp(pattern)?.test(next)) return this.getSectionRecursive(path, schema.patternProperties[pattern]);
		} else if (typeof schema.additionalProperties === "object") return this.getSectionRecursive(path, schema.additionalProperties);
		else if (next.match("[0-9]+")) {
			if (Array.isArray(schema.items)) {
				const index = parseInt(next, 10);
				if (!isNaN(index) && schema.items[index]) return this.getSectionRecursive(path, schema.items[index]);
			} else if (schema.items) return this.getSectionRecursive(path, schema.items);
		}
	}
};
var JSONSchemaService = class {
	constructor(requestService, contextService, promiseConstructor) {
		this.contextService = contextService;
		this.requestService = requestService;
		this.promiseConstructor = promiseConstructor || Promise;
		this.callOnDispose = [];
		this.contributionSchemas = {};
		this.contributionAssociations = [];
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
	}
	getRegisteredSchemaIds(filter) {
		return Object.keys(this.registeredSchemasIds).filter((id) => {
			const scheme = URI.parse(id).scheme;
			return scheme !== "schemaservice" && (!filter || filter(scheme));
		});
	}
	get promise() {
		return this.promiseConstructor;
	}
	dispose() {
		while (this.callOnDispose.length > 0) this.callOnDispose.pop()();
	}
	onResourceChange(uri) {
		this.cachedSchemaForResource = void 0;
		let hasChanges = false;
		uri = normalizeId(uri);
		const toWalk = [uri];
		const all = Object.keys(this.schemasById).map((key) => this.schemasById[key]);
		while (toWalk.length) {
			const curr = toWalk.pop();
			for (let i = 0; i < all.length; i++) {
				const handle = all[i];
				if (handle && (handle.uri === curr || handle.dependencies.has(curr))) {
					if (handle.uri !== curr) toWalk.push(handle.uri);
					if (handle.clearSchema()) hasChanges = true;
					all[i] = void 0;
				}
			}
		}
		return hasChanges;
	}
	setSchemaContributions(schemaContributions$1) {
		if (schemaContributions$1.schemas) {
			const schemas = schemaContributions$1.schemas;
			for (const id in schemas) {
				const normalizedId = normalizeId(id);
				this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
			}
		}
		if (Array.isArray(schemaContributions$1.schemaAssociations)) {
			const schemaAssociations = schemaContributions$1.schemaAssociations;
			for (let schemaAssociation of schemaAssociations) {
				const uris = schemaAssociation.uris.map(normalizeId);
				const association = this.addFilePatternAssociation(schemaAssociation.pattern, schemaAssociation.folderUri, uris);
				this.contributionAssociations.push(association);
			}
		}
	}
	addSchemaHandle(id, unresolvedSchemaContent) {
		const schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
		this.schemasById[id] = schemaHandle;
		return schemaHandle;
	}
	getOrAddSchemaHandle(id, unresolvedSchemaContent) {
		return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
	}
	addFilePatternAssociation(pattern, folderUri, uris) {
		const fpa = new FilePatternAssociation(pattern, folderUri, uris);
		this.filePatternAssociations.push(fpa);
		return fpa;
	}
	registerExternalSchema(config) {
		const id = normalizeId(config.uri);
		this.registeredSchemasIds[id] = true;
		this.cachedSchemaForResource = void 0;
		if (config.fileMatch && config.fileMatch.length) this.addFilePatternAssociation(config.fileMatch, config.folderUri, [id]);
		return config.schema ? this.addSchemaHandle(id, config.schema) : this.getOrAddSchemaHandle(id);
	}
	clearExternalSchemas() {
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
		this.cachedSchemaForResource = void 0;
		for (const id in this.contributionSchemas) {
			this.schemasById[id] = this.contributionSchemas[id];
			this.registeredSchemasIds[id] = true;
		}
		for (const contributionAssociation of this.contributionAssociations) this.filePatternAssociations.push(contributionAssociation);
	}
	getResolvedSchema(schemaId) {
		const id = normalizeId(schemaId);
		const schemaHandle = this.schemasById[id];
		if (schemaHandle) return schemaHandle.getResolvedSchema();
		return this.promise.resolve(void 0);
	}
	loadSchema(url) {
		if (!this.requestService) {
			const errorMessage = t("Unable to load schema from '{0}'. No schema request service available", toDisplayString(url));
			return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
		}
		if (url.startsWith("http://json-schema.org/")) url = "https" + url.substring(4);
		return this.requestService(url).then((content) => {
			if (!content) return new UnresolvedSchema({}, [t("Unable to load schema from '{0}': No content.", toDisplayString(url))]);
			const errors = [];
			if (content.charCodeAt(0) === 65279) {
				errors.push(t("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", toDisplayString(url)));
				content = content.trimStart();
			}
			let schemaContent = {};
			const jsonErrors = [];
			schemaContent = parse$1(content, jsonErrors);
			if (jsonErrors.length) errors.push(t("Unable to parse content from '{0}': Parse error at offset {1}.", toDisplayString(url), jsonErrors[0].offset));
			return new UnresolvedSchema(schemaContent, errors);
		}, (error$2) => {
			let errorMessage = error$2.toString();
			const errorSplit = error$2.toString().split("Error: ");
			if (errorSplit.length > 1) errorMessage = errorSplit[1];
			if (endsWith(errorMessage, ".")) errorMessage = errorMessage.substr(0, errorMessage.length - 1);
			return new UnresolvedSchema({}, [t("Unable to load schema from '{0}': {1}.", toDisplayString(url), errorMessage)]);
		});
	}
	resolveSchemaContent(schemaToResolve, handle) {
		const resolveErrors = schemaToResolve.errors.slice(0);
		const schema = schemaToResolve.schema;
		let schemaDraft = schema.$schema ? normalizeId(schema.$schema) : void 0;
		if (schemaDraft === "http://json-schema.org/draft-03/schema") return this.promise.resolve(new ResolvedSchema({}, [t("Draft-03 schemas are not supported.")], [], schemaDraft));
		let usesUnsupportedFeatures = /* @__PURE__ */ new Set();
		const contextService = this.contextService;
		const findSectionByJSONPointer = (schema$1, path) => {
			path = decodeURIComponent(path);
			let current = schema$1;
			if (path[0] === "/") path = path.substring(1);
			path.split("/").some((part) => {
				part = part.replace(/~1/g, "/").replace(/~0/g, "~");
				current = current[part];
				return !current;
			});
			return current;
		};
		const findSchemaById = (schema$1, handle$1, id) => {
			if (!handle$1.anchors) handle$1.anchors = collectAnchors(schema$1);
			return handle$1.anchors.get(id);
		};
		const merge = (target, section) => {
			for (const key in section) if (section.hasOwnProperty(key) && key !== "id" && key !== "$id") target[key] = section[key];
		};
		const mergeRef = (target, sourceRoot, sourceHandle, refSegment) => {
			let section;
			if (refSegment === void 0 || refSegment.length === 0) section = sourceRoot;
			else if (refSegment.charAt(0) === "/") section = findSectionByJSONPointer(sourceRoot, refSegment);
			else section = findSchemaById(sourceRoot, sourceHandle, refSegment);
			if (section) merge(target, section);
			else resolveErrors.push(t("$ref '{0}' in '{1}' can not be resolved.", refSegment || "", sourceHandle.uri));
		};
		const resolveExternalLink = (node, uri, refSegment, parentHandle) => {
			if (contextService && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/.*/.test(uri)) uri = contextService.resolveRelativePath(uri, parentHandle.uri);
			uri = normalizeId(uri);
			const referencedHandle = this.getOrAddSchemaHandle(uri);
			return referencedHandle.getUnresolvedSchema().then((unresolvedSchema) => {
				parentHandle.dependencies.add(uri);
				if (unresolvedSchema.errors.length) {
					const loc = refSegment ? uri + "#" + refSegment : uri;
					resolveErrors.push(t("Problems loading reference '{0}': {1}", loc, unresolvedSchema.errors[0]));
				}
				mergeRef(node, unresolvedSchema.schema, referencedHandle, refSegment);
				return resolveRefs(node, unresolvedSchema.schema, referencedHandle);
			});
		};
		const resolveRefs = (node, parentSchema, parentHandle) => {
			const openPromises = [];
			this.traverseNodes(node, (next) => {
				const seenRefs = /* @__PURE__ */ new Set();
				while (next.$ref) {
					const ref = next.$ref;
					const segments = ref.split("#", 2);
					delete next.$ref;
					if (segments[0].length > 0) {
						openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentHandle));
						return;
					} else if (!seenRefs.has(ref)) {
						const id = segments[1];
						mergeRef(next, parentSchema, parentHandle, id);
						seenRefs.add(ref);
					}
				}
				if (next.$recursiveRef) usesUnsupportedFeatures.add("$recursiveRef");
				if (next.$dynamicRef) usesUnsupportedFeatures.add("$dynamicRef");
			});
			return this.promise.all(openPromises);
		};
		const collectAnchors = (root) => {
			const result = /* @__PURE__ */ new Map();
			this.traverseNodes(root, (next) => {
				const id = next.$id || next.id;
				const anchor = isString(id) && id.charAt(0) === "#" ? id.substring(1) : next.$anchor;
				if (anchor) if (result.has(anchor)) resolveErrors.push(t("Duplicate anchor declaration: '{0}'", anchor));
				else result.set(anchor, next);
				if (next.$recursiveAnchor) usesUnsupportedFeatures.add("$recursiveAnchor");
				if (next.$dynamicAnchor) usesUnsupportedFeatures.add("$dynamicAnchor");
			});
			return result;
		};
		return resolveRefs(schema, schema, handle).then((_) => {
			let resolveWarnings = [];
			if (usesUnsupportedFeatures.size) resolveWarnings.push(t("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(usesUnsupportedFeatures.keys()).join(", ")));
			return new ResolvedSchema(schema, resolveErrors, resolveWarnings, schemaDraft);
		});
	}
	traverseNodes(root, handle) {
		if (!root || typeof root !== "object") return Promise.resolve(null);
		const seen = /* @__PURE__ */ new Set();
		const collectEntries = (...entries) => {
			for (const entry of entries) if (isObject(entry)) toWalk.push(entry);
		};
		const collectMapEntries = (...maps) => {
			for (const map of maps) if (isObject(map)) for (const k in map) {
				const entry = map[k];
				if (isObject(entry)) toWalk.push(entry);
			}
		};
		const collectArrayEntries = (...arrays) => {
			for (const array$2 of arrays) if (Array.isArray(array$2)) {
				for (const entry of array$2) if (isObject(entry)) toWalk.push(entry);
			}
		};
		const collectEntryOrArrayEntries = (items) => {
			if (Array.isArray(items)) {
				for (const entry of items) if (isObject(entry)) toWalk.push(entry);
			} else if (isObject(items)) toWalk.push(items);
		};
		const toWalk = [root];
		let next = toWalk.pop();
		while (next) {
			if (!seen.has(next)) {
				seen.add(next);
				handle(next);
				collectEntries(next.additionalItems, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else, next.unevaluatedItems, next.unevaluatedProperties);
				collectMapEntries(next.definitions, next.$defs, next.properties, next.patternProperties, next.dependencies, next.dependentSchemas);
				collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.prefixItems);
				collectEntryOrArrayEntries(next.items);
			}
			next = toWalk.pop();
		}
	}
	getSchemaFromProperty(resource, document) {
		if (document.root?.type === "object") {
			for (const p of document.root.properties) if (p.keyNode.value === "$schema" && p.valueNode?.type === "string") {
				let schemaId = p.valueNode.value;
				if (this.contextService && !/^\w[\w\d+.-]*:/.test(schemaId)) schemaId = this.contextService.resolveRelativePath(schemaId, resource);
				return schemaId;
			}
		}
	}
	getAssociatedSchemas(resource) {
		const seen = Object.create(null);
		const schemas = [];
		const normalizedResource = normalizeResourceForMatching(resource);
		for (const entry of this.filePatternAssociations) if (entry.matchesPattern(normalizedResource)) {
			for (const schemaId of entry.getURIs()) if (!seen[schemaId]) {
				schemas.push(schemaId);
				seen[schemaId] = true;
			}
		}
		return schemas;
	}
	getSchemaURIsForResource(resource, document) {
		let schemeId = document && this.getSchemaFromProperty(resource, document);
		if (schemeId) return [schemeId];
		return this.getAssociatedSchemas(resource);
	}
	getSchemaForResource(resource, document) {
		if (document) {
			let schemeId = this.getSchemaFromProperty(resource, document);
			if (schemeId) {
				const id = normalizeId(schemeId);
				return this.getOrAddSchemaHandle(id).getResolvedSchema();
			}
		}
		if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) return this.cachedSchemaForResource.resolvedSchema;
		const schemas = this.getAssociatedSchemas(resource);
		const resolvedSchema = schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(void 0);
		this.cachedSchemaForResource = {
			resource,
			resolvedSchema
		};
		return resolvedSchema;
	}
	createCombinedSchema(resource, schemaIds) {
		if (schemaIds.length === 1) return this.getOrAddSchemaHandle(schemaIds[0]);
		else {
			const combinedSchemaId = "schemaservice://combinedSchema/" + encodeURIComponent(resource);
			const combinedSchema = { allOf: schemaIds.map((schemaId) => ({ $ref: schemaId })) };
			return this.addSchemaHandle(combinedSchemaId, combinedSchema);
		}
	}
	getMatchingSchemas(document, jsonDocument, schema) {
		if (schema) {
			const id = schema.id || "schemaservice://untitled/matchingSchemas/" + idCounter++;
			return this.addSchemaHandle(id, schema).getResolvedSchema().then((resolvedSchema) => {
				return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter((s) => !s.inverted);
			});
		}
		return this.getSchemaForResource(document.uri, jsonDocument).then((schema$1) => {
			if (schema$1) return jsonDocument.getMatchingSchemas(schema$1.schema).filter((s) => !s.inverted);
			return [];
		});
	}
};
let idCounter = 0;
function normalizeId(id) {
	try {
		return URI.parse(id).toString(true);
	} catch (e) {
		return id;
	}
}
function normalizeResourceForMatching(resource) {
	try {
		return URI.parse(resource).with({
			fragment: null,
			query: null
		}).toString(true);
	} catch (e) {
		return resource;
	}
}
function toDisplayString(url) {
	try {
		const uri = URI.parse(url);
		if (uri.scheme === "file") return uri.fsPath;
	} catch (e) {}
	return url;
}
function getFoldingRanges(document, context) {
	const ranges = [];
	const nestingLevels = [];
	const stack = [];
	let prevStart = -1;
	const scanner = createScanner(document.getText(), false);
	let token = scanner.scan();
	function addRange(range) {
		ranges.push(range);
		nestingLevels.push(stack.length);
	}
	while (token !== 17) {
		switch (token) {
			case 1:
			case 3: {
				const startLine = document.positionAt(scanner.getTokenOffset()).line;
				const range = {
					startLine,
					endLine: startLine,
					kind: token === 1 ? "object" : "array"
				};
				stack.push(range);
				break;
			}
			case 2:
			case 4: {
				const kind = token === 2 ? "object" : "array";
				if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
					const range = stack.pop();
					const line = document.positionAt(scanner.getTokenOffset()).line;
					if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
						range.endLine = line - 1;
						addRange(range);
						prevStart = range.startLine;
					}
				}
				break;
			}
			case 13: {
				const startLine = document.positionAt(scanner.getTokenOffset()).line;
				const endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
				if (scanner.getTokenError() === 1 && startLine + 1 < document.lineCount) scanner.setPosition(document.offsetAt(Position.create(startLine + 1, 0)));
				else if (startLine < endLine) {
					addRange({
						startLine,
						endLine,
						kind: FoldingRangeKind.Comment
					});
					prevStart = startLine;
				}
				break;
			}
			case 12: {
				const m = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
				if (m) {
					const line = document.positionAt(scanner.getTokenOffset()).line;
					if (m[1]) {
						const range = {
							startLine: line,
							endLine: line,
							kind: FoldingRangeKind.Region
						};
						stack.push(range);
					} else {
						let i = stack.length - 1;
						while (i >= 0 && stack[i].kind !== FoldingRangeKind.Region) i--;
						if (i >= 0) {
							const range = stack[i];
							stack.length = i;
							if (line > range.startLine && prevStart !== range.startLine) {
								range.endLine = line;
								addRange(range);
								prevStart = range.startLine;
							}
						}
					}
				}
				break;
			}
		}
		token = scanner.scan();
	}
	const rangeLimit = context && context.rangeLimit;
	if (typeof rangeLimit !== "number" || ranges.length <= rangeLimit) return ranges;
	if (context && context.onRangeLimitExceeded) context.onRangeLimitExceeded(document.uri);
	const counts = [];
	for (let level of nestingLevels) if (level < 30) counts[level] = (counts[level] || 0) + 1;
	let entries = 0;
	let maxLevel = 0;
	for (let i = 0; i < counts.length; i++) {
		const n = counts[i];
		if (n) {
			if (n + entries > rangeLimit) {
				maxLevel = i;
				break;
			}
			entries += n;
		}
	}
	const result = [];
	for (let i = 0; i < ranges.length; i++) {
		const level = nestingLevels[i];
		if (typeof level === "number") {
			if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) result.push(ranges[i]);
		}
	}
	return result;
}
function getSelectionRanges(document, positions, doc) {
	function getSelectionRange(position) {
		let offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		const result = [];
		while (node) {
			switch (node.type) {
				case "string":
				case "object":
				case "array":
					const cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
					if (cStart < cEnd && offset >= cStart && offset <= cEnd) result.push(newRange(cStart, cEnd));
					result.push(newRange(node.offset, node.offset + node.length));
					break;
				case "number":
				case "boolean":
				case "null":
				case "property":
					result.push(newRange(node.offset, node.offset + node.length));
					break;
			}
			if (node.type === "property" || node.parent && node.parent.type === "array") {
				const afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5);
				if (afterCommaOffset !== -1) result.push(newRange(node.offset, afterCommaOffset));
			}
			node = node.parent;
		}
		let current = void 0;
		for (let index = result.length - 1; index >= 0; index--) current = SelectionRange.create(result[index], current);
		if (!current) current = SelectionRange.create(Range.create(position, position));
		return current;
	}
	function newRange(start, end) {
		return Range.create(document.positionAt(start), document.positionAt(end));
	}
	const scanner = createScanner(document.getText(), true);
	function getOffsetAfterNextToken(offset, expectedToken) {
		scanner.setPosition(offset);
		if (scanner.scan() === expectedToken) return scanner.getTokenOffset() + scanner.getTokenLength();
		return -1;
	}
	return positions.map(getSelectionRange);
}
function format(documentToFormat, formattingOptions, formattingRange) {
	let range = void 0;
	if (formattingRange) {
		const offset = documentToFormat.offsetAt(formattingRange.start);
		range = {
			offset,
			length: documentToFormat.offsetAt(formattingRange.end) - offset
		};
	}
	const options = {
		tabSize: formattingOptions ? formattingOptions.tabSize : 4,
		insertSpaces: formattingOptions?.insertSpaces === true,
		insertFinalNewline: formattingOptions?.insertFinalNewline === true,
		eol: "\n",
		keepLines: formattingOptions?.keepLines === true
	};
	return format$1(documentToFormat.getText(), range, options).map((edit) => {
		return TextEdit.replace(Range.create(documentToFormat.positionAt(edit.offset), documentToFormat.positionAt(edit.offset + edit.length)), edit.content);
	});
}
var Container;
(function(Container$1) {
	Container$1[Container$1["Object"] = 0] = "Object";
	Container$1[Container$1["Array"] = 1] = "Array";
})(Container || (Container = {}));
var PropertyTree = class {
	constructor(propertyName, beginningLineNumber) {
		this.propertyName = propertyName ?? "";
		this.beginningLineNumber = beginningLineNumber;
		this.childrenProperties = [];
		this.lastProperty = false;
		this.noKeyName = false;
	}
	addChildProperty(childProperty) {
		childProperty.parent = this;
		if (this.childrenProperties.length > 0) {
			let insertionIndex = 0;
			if (childProperty.noKeyName) insertionIndex = this.childrenProperties.length;
			else insertionIndex = binarySearchOnPropertyArray(this.childrenProperties, childProperty, compareProperties);
			if (insertionIndex < 0) insertionIndex = insertionIndex * -1 - 1;
			this.childrenProperties.splice(insertionIndex, 0, childProperty);
		} else this.childrenProperties.push(childProperty);
		return childProperty;
	}
};
function compareProperties(propertyTree1, propertyTree2) {
	const propertyName1 = propertyTree1.propertyName.toLowerCase();
	const propertyName2 = propertyTree2.propertyName.toLowerCase();
	if (propertyName1 < propertyName2) return -1;
	else if (propertyName1 > propertyName2) return 1;
	return 0;
}
function binarySearchOnPropertyArray(propertyTreeArray, propertyTree, compare_fn) {
	const propertyName = propertyTree.propertyName.toLowerCase();
	const firstPropertyInArrayName = propertyTreeArray[0].propertyName.toLowerCase();
	const lastPropertyInArrayName = propertyTreeArray[propertyTreeArray.length - 1].propertyName.toLowerCase();
	if (propertyName < firstPropertyInArrayName) return 0;
	if (propertyName > lastPropertyInArrayName) return propertyTreeArray.length;
	let m = 0;
	let n = propertyTreeArray.length - 1;
	while (m <= n) {
		let k = n + m >> 1;
		let cmp = compare_fn(propertyTree, propertyTreeArray[k]);
		if (cmp > 0) m = k + 1;
		else if (cmp < 0) n = k - 1;
		else return k;
	}
	return -m - 1;
}
function sort(documentToSort, formattingOptions) {
	const options = {
		...formattingOptions,
		keepLines: false
	};
	const formattedJsonString = TextDocument.applyEdits(documentToSort, format(documentToSort, options, void 0));
	const formattedJsonDocument = TextDocument.create("test://test.json", "json", 0, formattedJsonString);
	const sortedJsonDocument = sortJsoncDocument(formattedJsonDocument, findJsoncPropertyTree(formattedJsonDocument));
	const edits = format(sortedJsonDocument, options, void 0);
	const sortedAndFormattedJsonDocument = TextDocument.applyEdits(sortedJsonDocument, edits);
	return [TextEdit.replace(Range.create(Position.create(0, 0), documentToSort.positionAt(documentToSort.getText().length)), sortedAndFormattedJsonDocument)];
}
function findJsoncPropertyTree(formattedDocument) {
	const scanner = createScanner(formattedDocument.getText(), false);
	let rootTree = new PropertyTree();
	let currentTree = rootTree;
	let currentProperty = rootTree;
	let lastProperty = rootTree;
	let token = void 0;
	let lastTokenLine = 0;
	let numberOfCharactersOnPreviousLines = 0;
	let lastNonTriviaNonCommentToken = void 0;
	let secondToLastNonTriviaNonCommentToken = void 0;
	let lineOfLastNonTriviaNonCommentToken = -1;
	let endIndexOfLastNonTriviaNonCommentToken = -1;
	let beginningLineNumber = 0;
	let endLineNumber = 0;
	let currentContainerStack = [];
	let updateLastPropertyEndLineNumber = false;
	let updateBeginningLineNumber = false;
	while ((token = scanner.scan()) !== 17) {
		if (updateLastPropertyEndLineNumber === true && token !== 14 && token !== 15 && token !== 12 && token !== 13 && currentProperty.endLineNumber === void 0) {
			let endLineNumber$1 = scanner.getTokenStartLine();
			if (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) lastProperty.endLineNumber = endLineNumber$1 - 1;
			else currentProperty.endLineNumber = endLineNumber$1 - 1;
			beginningLineNumber = endLineNumber$1;
			updateLastPropertyEndLineNumber = false;
		}
		if (updateBeginningLineNumber === true && token !== 14 && token !== 15 && token !== 12 && token !== 13) {
			beginningLineNumber = scanner.getTokenStartLine();
			updateBeginningLineNumber = false;
		}
		if (scanner.getTokenStartLine() !== lastTokenLine) {
			for (let i = lastTokenLine; i < scanner.getTokenStartLine(); i++) {
				const lengthOfLine = formattedDocument.getText(Range.create(Position.create(i, 0), Position.create(i + 1, 0))).length;
				numberOfCharactersOnPreviousLines = numberOfCharactersOnPreviousLines + lengthOfLine;
			}
			lastTokenLine = scanner.getTokenStartLine();
		}
		switch (token) {
			case 10:
				if (lastNonTriviaNonCommentToken === void 0 || lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 5 && currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				break;
			case 3:
				if (rootTree.beginningLineNumber === void 0) rootTree.beginningLineNumber = scanner.getTokenStartLine();
				if (currentContainerStack[currentContainerStack.length - 1] === Container.Object) currentTree = currentProperty;
				else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
					currentTree = currentProperty;
				}
				currentContainerStack.push(Container.Array);
				currentProperty.type = Container.Array;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			case 1:
				if (rootTree.beginningLineNumber === void 0) rootTree.beginningLineNumber = scanner.getTokenStartLine();
				else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				currentProperty.type = Container.Object;
				currentContainerStack.push(Container.Object);
				currentTree = currentProperty;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			case 4:
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (currentProperty.endLineNumber === void 0 && (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4)) {
					currentProperty.endLineNumber = endLineNumber - 1;
					currentProperty.lastProperty = true;
					currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
					currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = endLineNumber;
				beginningLineNumber = endLineNumber + 1;
				break;
			case 2:
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (lastNonTriviaNonCommentToken !== 1) {
					if (currentProperty.endLineNumber === void 0) {
						currentProperty.endLineNumber = endLineNumber - 1;
						currentProperty.lastProperty = true;
						currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
						currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					}
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = scanner.getTokenStartLine();
				beginningLineNumber = endLineNumber + 1;
				break;
			case 5:
				endLineNumber = scanner.getTokenStartLine();
				if (currentProperty.endLineNumber === void 0 && (currentContainerStack[currentContainerStack.length - 1] === Container.Object || currentContainerStack[currentContainerStack.length - 1] === Container.Array && (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4))) {
					currentProperty.endLineNumber = endLineNumber;
					currentProperty.commaIndex = scanner.getTokenOffset() - numberOfCharactersOnPreviousLines;
					currentProperty.commaLine = endLineNumber;
				}
				if (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4) {
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				beginningLineNumber = endLineNumber + 1;
				break;
			case 13:
				if (lastNonTriviaNonCommentToken === 5 && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine() && (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object)) {
					if (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
						currentProperty.endLineNumber = void 0;
						updateLastPropertyEndLineNumber = true;
					}
				}
				if ((lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 3) && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine()) updateBeginningLineNumber = true;
				break;
		}
		if (token !== 14 && token !== 13 && token !== 12 && token !== 15) {
			secondToLastNonTriviaNonCommentToken = lastNonTriviaNonCommentToken;
			lastNonTriviaNonCommentToken = token;
			lineOfLastNonTriviaNonCommentToken = scanner.getTokenStartLine();
			endIndexOfLastNonTriviaNonCommentToken = scanner.getTokenOffset() + scanner.getTokenLength() - numberOfCharactersOnPreviousLines;
		}
	}
	return rootTree;
}
function sortJsoncDocument(jsonDocument, propertyTree) {
	if (propertyTree.childrenProperties.length === 0) return jsonDocument;
	const sortedJsonDocument = TextDocument.create("test://test.json", "json", 0, jsonDocument.getText());
	const queueToSort = [];
	updateSortingQueue(queueToSort, propertyTree, propertyTree.beginningLineNumber);
	while (queueToSort.length > 0) {
		const dataToSort = queueToSort.shift();
		const propertyTreeArray = dataToSort.propertyTreeArray;
		let beginningLineNumber = dataToSort.beginningLineNumber;
		for (let i = 0; i < propertyTreeArray.length; i++) {
			const propertyTree$1 = propertyTreeArray[i];
			const range = Range.create(Position.create(propertyTree$1.beginningLineNumber, 0), Position.create(propertyTree$1.endLineNumber + 1, 0));
			const jsonContentToReplace = jsonDocument.getText(range);
			const jsonDocumentToReplace = TextDocument.create("test://test.json", "json", 0, jsonContentToReplace);
			if (propertyTree$1.lastProperty === true && i !== propertyTreeArray.length - 1) {
				const lineWhereToAddComma = propertyTree$1.lineWhereToAddComma - propertyTree$1.beginningLineNumber;
				const indexWhereToAddComma = propertyTree$1.indexWhereToAddComa;
				const edit$1 = {
					range: Range.create(Position.create(lineWhereToAddComma, indexWhereToAddComma), Position.create(lineWhereToAddComma, indexWhereToAddComma)),
					text: ","
				};
				TextDocument.update(jsonDocumentToReplace, [edit$1], 1);
			} else if (propertyTree$1.lastProperty === false && i === propertyTreeArray.length - 1) {
				const commaIndex = propertyTree$1.commaIndex;
				const lineWhereToRemoveComma = propertyTree$1.commaLine - propertyTree$1.beginningLineNumber;
				const edit$1 = {
					range: Range.create(Position.create(lineWhereToRemoveComma, commaIndex), Position.create(lineWhereToRemoveComma, commaIndex + 1)),
					text: ""
				};
				TextDocument.update(jsonDocumentToReplace, [edit$1], 1);
			}
			const length = propertyTree$1.endLineNumber - propertyTree$1.beginningLineNumber + 1;
			const edit = {
				range: Range.create(Position.create(beginningLineNumber, 0), Position.create(beginningLineNumber + length, 0)),
				text: jsonDocumentToReplace.getText()
			};
			TextDocument.update(sortedJsonDocument, [edit], 1);
			updateSortingQueue(queueToSort, propertyTree$1, beginningLineNumber);
			beginningLineNumber = beginningLineNumber + length;
		}
	}
	return sortedJsonDocument;
}
function sortProperties(properties) {
	properties.sort((a$1, b) => a$1.propertyName.localeCompare(b.propertyName));
}
function updateSortingQueue(queue, propertyTree, beginningLineNumber) {
	if (propertyTree.childrenProperties.length === 0) return;
	if (propertyTree.type === Container.Object) {
		let minimumBeginningLineNumber = Infinity;
		for (const childProperty of propertyTree.childrenProperties) if (childProperty.beginningLineNumber < minimumBeginningLineNumber) minimumBeginningLineNumber = childProperty.beginningLineNumber;
		const diff = minimumBeginningLineNumber - propertyTree.beginningLineNumber;
		beginningLineNumber = beginningLineNumber + diff;
		sortProperties(propertyTree.childrenProperties);
		queue.push(new SortingRange(beginningLineNumber, propertyTree.childrenProperties));
	} else if (propertyTree.type === Container.Array) updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber);
}
function updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber) {
	for (const subObject of propertyTree.childrenProperties) {
		if (subObject.type === Container.Object) {
			let minimumBeginningLineNumber = Infinity;
			for (const childProperty of subObject.childrenProperties) if (childProperty.beginningLineNumber < minimumBeginningLineNumber) minimumBeginningLineNumber = childProperty.beginningLineNumber;
			const diff = minimumBeginningLineNumber - subObject.beginningLineNumber;
			queue.push(new SortingRange(beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber + diff, subObject.childrenProperties));
		}
		if (subObject.type === Container.Array) updateSortingQueueForArrayProperties(queue, subObject, beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber);
	}
}
var SortingRange = class {
	constructor(beginningLineNumber, propertyTreeArray) {
		this.beginningLineNumber = beginningLineNumber;
		this.propertyTreeArray = propertyTreeArray;
	}
};
function findLinks(document, doc) {
	const links = [];
	doc.visit((node) => {
		if (node.type === "property" && node.keyNode.value === "$ref" && node.valueNode?.type === "string") {
			const path = node.valueNode.value;
			const targetNode = findTargetNode(doc, path);
			if (targetNode) {
				const targetPos = document.positionAt(targetNode.offset);
				links.push({
					target: `${document.uri}#${targetPos.line + 1},${targetPos.character + 1}`,
					range: createRange(document, node.valueNode)
				});
			}
		}
		return true;
	});
	return Promise.resolve(links);
}
function createRange(document, node) {
	return Range.create(document.positionAt(node.offset + 1), document.positionAt(node.offset + node.length - 1));
}
function findTargetNode(doc, path) {
	const tokens = parseJSONPointer(path);
	if (!tokens) return null;
	return findNode(tokens, doc.root);
}
function findNode(pointer, node) {
	if (!node) return null;
	if (pointer.length === 0) return node;
	const token = pointer.shift();
	if (node && node.type === "object") {
		const propertyNode = node.properties.find((propertyNode$1) => propertyNode$1.keyNode.value === token);
		if (!propertyNode) return null;
		return findNode(pointer, propertyNode.valueNode);
	} else if (node && node.type === "array") {
		if (token.match(/^(0|[1-9][0-9]*)$/)) {
			const index = Number.parseInt(token);
			const arrayItem = node.items[index];
			if (!arrayItem) return null;
			return findNode(pointer, arrayItem);
		}
	}
	return null;
}
function parseJSONPointer(path) {
	if (path === "#") return [];
	if (path[0] !== "#" || path[1] !== "/") return null;
	return path.substring(2).split(/\//).map(unescape);
}
function unescape(str) {
	return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
function getLanguageService(params) {
	const promise = params.promiseConstructor || Promise;
	const jsonSchemaService = new JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
	jsonSchemaService.setSchemaContributions(schemaContributions);
	const jsonCompletion = new JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
	const jsonHover = new JSONHover(jsonSchemaService, params.contributions, promise);
	const jsonDocumentSymbols = new JSONDocumentSymbols(jsonSchemaService);
	const jsonValidation = new JSONValidation(jsonSchemaService, promise);
	return {
		configure: (settings) => {
			jsonSchemaService.clearExternalSchemas();
			settings.schemas?.forEach(jsonSchemaService.registerExternalSchema.bind(jsonSchemaService));
			jsonValidation.configure(settings);
		},
		resetSchema: (uri) => jsonSchemaService.onResourceChange(uri),
		doValidation: jsonValidation.doValidation.bind(jsonValidation),
		getLanguageStatus: jsonValidation.getLanguageStatus.bind(jsonValidation),
		parseJSONDocument: (document) => parse(document, { collectComments: true }),
		newJSONDocument: (root, diagnostics, comments) => newJSONDocument(root, diagnostics, comments),
		getMatchingSchemas: jsonSchemaService.getMatchingSchemas.bind(jsonSchemaService),
		doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
		doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
		findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
		findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
		findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
		getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
		doHover: jsonHover.doHover.bind(jsonHover),
		getFoldingRanges,
		getSelectionRanges,
		findDefinition: () => Promise.resolve([]),
		findLinks,
		format: (document, range, options) => format(document, options, range),
		sort: (document, options) => sort(document, options)
	};
}
var AceRange = class AceRange {
	static getConstructor(editor) {
		if (!AceRange._instance && editor) AceRange._instance = editor.getSelectionRange().constructor;
		return AceRange._instance;
	}
};
var import_main$2 = require_main();
let CommonConverter;
(function(_CommonConverter) {
	function normalizeRanges(completions) {
		return completions && completions.map((el) => {
			if (el["range"]) el["range"] = toRange(el["range"]);
			return el;
		});
	}
	_CommonConverter.normalizeRanges = normalizeRanges;
	function cleanHtml(html) {
		return html.replace(/<a\s/, "<a target='_blank' ");
	}
	_CommonConverter.cleanHtml = cleanHtml;
	function toRange(range) {
		if (!range || !range.start || !range.end) return;
		return AceRange.getConstructor().fromPoints(range.start, range.end);
	}
	_CommonConverter.toRange = toRange;
	function convertKind(kind) {
		switch (kind) {
			case "primitiveType":
			case "keyword": return import_main$2.CompletionItemKind.Keyword;
			case "variable":
			case "localVariable": return import_main$2.CompletionItemKind.Variable;
			case "memberVariable":
			case "memberGetAccessor":
			case "memberSetAccessor": return import_main$2.CompletionItemKind.Field;
			case "function":
			case "memberFunction":
			case "constructSignature":
			case "callSignature":
			case "indexSignature": return import_main$2.CompletionItemKind.Function;
			case "enum": return import_main$2.CompletionItemKind.Enum;
			case "module": return import_main$2.CompletionItemKind.Module;
			case "class": return import_main$2.CompletionItemKind.Class;
			case "interface": return import_main$2.CompletionItemKind.Interface;
			case "warning": return import_main$2.CompletionItemKind.File;
		}
		return import_main$2.CompletionItemKind.Property;
	}
	_CommonConverter.convertKind = convertKind;
	function excludeByErrorMessage(diagnostics, errorMessagesToIgnore, fieldName = "message") {
		if (!errorMessagesToIgnore) return diagnostics;
		return diagnostics.filter((el) => !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
	}
	_CommonConverter.excludeByErrorMessage = excludeByErrorMessage;
})(CommonConverter || (CommonConverter = {}));
var import_main$1 = require_main();
function filterDiagnostics(diagnostics, filterErrors) {
	return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
		if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main$1.DiagnosticSeverity.Warning;
		else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main$1.DiagnosticSeverity.Information;
		return el;
	});
}
var JsonService = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.schemas = {};
		this.serviceCapabilities = {
			completionProvider: {
				triggerCharacters: ["\"", ":"],
				resolveProvider: true
			},
			diagnosticProvider: {
				interFileDependencies: true,
				workspaceDiagnostics: true
			},
			documentRangeFormattingProvider: true,
			documentFormattingProvider: true,
			hoverProvider: true
		};
		this.$service = getLanguageService({
			schemaRequestService: (uri) => {
				uri = uri.replace("file:///", "");
				let jsonSchema = this.schemas[uri];
				if (jsonSchema) return Promise.resolve(jsonSchema);
				if (typeof fetch !== "undefined" && /^https?:\/\//.test(uri)) return fetch(uri).then((response) => response.text());
				return Promise.reject(`Unable to load schema at ${uri}`);
			},
			workspaceContext: { resolveRelativePath: (relativePath, resource) => {
				const base = resource.substr(0, resource.lastIndexOf("/") + 1);
				return Utils.resolvePath(URI.parse(base), relativePath).toString();
			} }
		});
	}
	$getJsonSchemaUri(documentUri) {
		return this.getOption(documentUri, "schemaUri");
	}
	addDocument(document) {
		super.addDocument(document);
		this.$configureService(document.uri);
	}
	getSchemaOption(documentUri) {
		return this.getOption(documentUri ?? "", "schemas");
	}
	$configureService(documentUri) {
		let schemas = this.getSchemaOption(documentUri);
		let sessionIDs = documentUri ? [] : Object.keys(this.documents);
		schemas?.forEach((el) => {
			if (documentUri) {
				if (this.$getJsonSchemaUri(documentUri) == el.uri) {
					el.fileMatch ??= [];
					el.fileMatch.push(documentUri);
				}
			} else el.fileMatch = sessionIDs.filter((documentUri$1) => this.$getJsonSchemaUri(documentUri$1) == el.uri);
			let schema = el.schema ?? this.schemas[el.uri];
			if (schema) this.schemas[el.uri] = schema;
			this.$service.resetSchema(el.uri);
			el.schema = void 0;
		});
		this.$configureJsonService(schemas);
	}
	$configureJsonService(schemas) {
		this.$service.configure({
			schemas,
			allowComments: this.mode === "json5",
			validate: true
		});
	}
	removeDocument(document) {
		super.removeDocument(document);
		let schemas = this.getOption(document.uri, "schemas");
		schemas?.forEach((el) => {
			if (el.uri === this.$getJsonSchemaUri(document.uri)) el.fileMatch = el.fileMatch?.filter((pattern) => pattern != document.uri);
		});
		this.$configureJsonService(schemas);
	}
	setOptions(documentUri, options, merge = false) {
		super.setOptions(documentUri, options, merge);
		this.$configureService(documentUri);
	}
	setGlobalOptions(options) {
		super.setGlobalOptions(options);
		this.$configureService();
	}
	format(document, range, options) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return Promise.resolve([]);
		return Promise.resolve(this.$service.format(fullDocument, range, options));
	}
	async doHover(document, position) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return null;
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return this.$service.doHover(fullDocument, position, jsonDocument);
	}
	async doValidation(document) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return [];
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return filterDiagnostics(await this.$service.doValidation(fullDocument, jsonDocument, { trailingCommas: this.mode === "json5" ? "ignore" : "error" }), this.optionsToFilterDiagnostics);
	}
	async doComplete(document, position) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return null;
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return await this.$service.doComplete(fullDocument, position, jsonDocument);
	}
	async doResolve(item) {
		return this.$service.doResolve(item);
	}
};
var import_main = require_main();
const worker = self;
const conn = (0, import_browser.createProtocolConnection)(new import_browser.BrowserMessageReader(worker), new import_browser.BrowserMessageWriter(worker));
let jsonService = new JsonService("json");
conn.onRequest(import_main.InitializeRequest.type, (_params) => {
	return { capabilities: {
		textDocumentSync: import_main.TextDocumentSyncKind.Incremental,
		completionProvider: { resolveProvider: true },
		hoverProvider: true
	} };
});
conn.onNotification(import_main.DidOpenTextDocumentNotification.type, (params) => {
	jsonService.addDocument(params.textDocument);
	doValidation(params.textDocument);
});
conn.onNotification(import_main.DidChangeTextDocumentNotification.type, (params) => {
	jsonService.applyDeltas(params.textDocument, params.contentChanges);
	doValidation(params.textDocument);
});
conn.onRequest(import_main.CompletionRequest.type, async (params) => {
	return jsonService.doComplete(params.textDocument, params.position);
});
conn.onRequest(import_main.HoverRequest.type, async (params) => {
	return jsonService.doHover(params.textDocument, params.position);
});
conn.onRequest(import_main.CompletionResolveRequest.type, async (item) => {
	return jsonService.doResolve(item);
});
conn.onRequest(import_main.DocumentRangeFormattingRequest.type, async (params) => {
	return jsonService.format(params.textDocument, params.range, params.options);
});
conn.listen();
async function doValidation(document) {
	sendDiagnostics(document, await jsonService.doValidation(document));
}
function sendDiagnostics(document, diagnostics) {
	conn.sendNotification(import_main.PublishDiagnosticsNotification.type, {
		uri: document.uri,
		diagnostics
	});
}
