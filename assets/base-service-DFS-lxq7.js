import { n as mergeObjects } from "./webworker-V08nRDgr.js";
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
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function.");
});
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
			sendCancellation(conn, id) {
				return conn.sendNotification(CancelNotification.type, { id });
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
	var BrowserMessageReader = class extends api_1.AbstractMessageReader {
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
	exports.BrowserMessageReader = BrowserMessageReader;
	var BrowserMessageWriter = class extends api_1.AbstractMessageWriter {
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
	exports.BrowserMessageWriter = BrowserMessageWriter;
	function createMessageConnection(reader, writer, logger, options) {
		if (logger === void 0) logger = api_1.NullLogger;
		if (api_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
		return (0, api_1.createMessageConnection)(reader, writer, logger, options);
	}
	exports.createMessageConnection = createMessageConnection;
}));
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_main$1();
}));
var main_exports = /* @__PURE__ */ __export({
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
	CompletionItemKind: () => CompletionItemKind,
	CompletionItemLabelDetails: () => CompletionItemLabelDetails,
	CompletionItemTag: () => CompletionItemTag,
	CompletionList: () => CompletionList,
	CreateFile: () => CreateFile,
	DeleteFile: () => DeleteFile,
	Diagnostic: () => Diagnostic,
	DiagnosticRelatedInformation: () => DiagnosticRelatedInformation,
	DiagnosticSeverity: () => DiagnosticSeverity,
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
	InsertTextFormat: () => InsertTextFormat,
	InsertTextMode: () => InsertTextMode,
	Location: () => Location,
	LocationLink: () => LocationLink,
	MarkedString: () => MarkedString,
	MarkupContent: () => MarkupContent,
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
	URI: () => URI,
	VersionedTextDocumentIdentifier: () => VersionedTextDocumentIdentifier,
	WorkspaceChange: () => WorkspaceChange,
	WorkspaceEdit: () => WorkspaceEdit,
	WorkspaceFolder: () => WorkspaceFolder,
	WorkspaceSymbol: () => WorkspaceSymbol,
	integer: () => integer,
	uinteger: () => uinteger
});
var DocumentUri, URI, integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextEditChangeImpl, ChangeAnnotations, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent, CompletionItemKind, InsertTextFormat, CompletionItemTag, InsertReplaceEdit, InsertTextMode, CompletionItemLabelDetails, CompletionItem, CompletionList, MarkedString, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, WorkspaceSymbol, DocumentSymbol, CodeActionKind, CodeActionTriggerKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens, InlineValueText, InlineValueVariableLookup, InlineValueEvaluatableExpression, InlineValueContext, InlayHintKind, InlayHintLabelPart, InlayHint, StringValue, InlineCompletionItem, InlineCompletionList, InlineCompletionTriggerKind, SelectedCompletionInfo, InlineCompletionContext, WorkspaceFolder, EOL, TextDocument$1, FullTextDocument$1, Is$3;
var init_main = __esmMin((() => {
	(function(DocumentUri$1) {
		function is$1(value) {
			return typeof value === "string";
		}
		DocumentUri$1.is = is$1;
	})(DocumentUri || (DocumentUri = {}));
	(function(URI$1) {
		function is$1(value) {
			return typeof value === "string";
		}
		URI$1.is = is$1;
	})(URI || (URI = {}));
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
	(function(DiagnosticSeverity$1) {
		DiagnosticSeverity$1.Error = 1;
		DiagnosticSeverity$1.Warning = 2;
		DiagnosticSeverity$1.Information = 3;
		DiagnosticSeverity$1.Hint = 4;
	})(DiagnosticSeverity || (DiagnosticSeverity = {}));
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
	(function(MarkupContent$1) {
		function is$1(value) {
			const candidate = value;
			return Is$3.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is$3.string(candidate.value);
		}
		MarkupContent$1.is = is$1;
	})(MarkupContent || (MarkupContent = {}));
	(function(CompletionItemKind$1) {
		CompletionItemKind$1.Text = 1;
		CompletionItemKind$1.Method = 2;
		CompletionItemKind$1.Function = 3;
		CompletionItemKind$1.Constructor = 4;
		CompletionItemKind$1.Field = 5;
		CompletionItemKind$1.Variable = 6;
		CompletionItemKind$1.Class = 7;
		CompletionItemKind$1.Interface = 8;
		CompletionItemKind$1.Module = 9;
		CompletionItemKind$1.Property = 10;
		CompletionItemKind$1.Unit = 11;
		CompletionItemKind$1.Value = 12;
		CompletionItemKind$1.Enum = 13;
		CompletionItemKind$1.Keyword = 14;
		CompletionItemKind$1.Snippet = 15;
		CompletionItemKind$1.Color = 16;
		CompletionItemKind$1.File = 17;
		CompletionItemKind$1.Reference = 18;
		CompletionItemKind$1.Folder = 19;
		CompletionItemKind$1.EnumMember = 20;
		CompletionItemKind$1.Constant = 21;
		CompletionItemKind$1.Struct = 22;
		CompletionItemKind$1.Event = 23;
		CompletionItemKind$1.Operator = 24;
		CompletionItemKind$1.TypeParameter = 25;
	})(CompletionItemKind || (CompletionItemKind = {}));
	(function(InsertTextFormat$1) {
		InsertTextFormat$1.PlainText = 1;
		InsertTextFormat$1.Snippet = 2;
	})(InsertTextFormat || (InsertTextFormat = {}));
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
	(function(MarkedString$1) {
		function fromPlainText(plainText) {
			return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		MarkedString$1.fromPlainText = fromPlainText;
		function is$1(value) {
			const candidate = value;
			return Is$3.string(candidate) || Is$3.objectLiteral(candidate) && Is$3.string(candidate.language) && Is$3.string(candidate.value);
		}
		MarkedString$1.is = is$1;
	})(MarkedString || (MarkedString = {}));
	(function(Hover$1) {
		function is$1(value) {
			let candidate = value;
			return !!candidate && Is$3.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is$3.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
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
			return Is$3.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is$3.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
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
			return Is$3.objectLiteral(candidate) && Position.is(candidate.position) && (Is$3.string(candidate.label) || Is$3.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is$3.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is$3.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is$3.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is$3.boolean(candidate.paddingRight));
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
			return Is$3.objectLiteral(candidate) && URI.is(candidate.uri) && Is$3.string(candidate.name);
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
			let sortedEdits = mergeSort$1(edits, (a, b) => {
				let diff = a.range.start.line - b.range.start.line;
				if (diff === 0) return a.range.start.character - b.range.start.character;
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
	const vscode_languageserver_types_1$1 = (init_main(), __toCommonJS(main_exports));
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
		function equals(one, other) {
			if (one === other) return true;
			if (one === null || one === void 0 || other === null || other === void 0) return false;
			return one.executionOrder === other.executionOrder && one.success === other.success;
		}
		ExecutionSummary$1.equals = equals;
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
	const vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports));
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
	var InitializeRequest;
	(function(InitializeRequest$1) {
		InitializeRequest$1.method = "initialize";
		InitializeRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		InitializeRequest$1.type = new messages_1.ProtocolRequestType(InitializeRequest$1.method);
	})(InitializeRequest || (exports.InitializeRequest = InitializeRequest = {}));
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
	var TextDocumentSyncKind;
	(function(TextDocumentSyncKind$1) {
		TextDocumentSyncKind$1.None = 0;
		TextDocumentSyncKind$1.Full = 1;
		TextDocumentSyncKind$1.Incremental = 2;
	})(TextDocumentSyncKind || (exports.TextDocumentSyncKind = TextDocumentSyncKind = {}));
	var DidOpenTextDocumentNotification;
	(function(DidOpenTextDocumentNotification$1) {
		DidOpenTextDocumentNotification$1.method = "textDocument/didOpen";
		DidOpenTextDocumentNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidOpenTextDocumentNotification$1.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification$1.method);
	})(DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
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
	var DidChangeTextDocumentNotification;
	(function(DidChangeTextDocumentNotification$1) {
		DidChangeTextDocumentNotification$1.method = "textDocument/didChange";
		DidChangeTextDocumentNotification$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DidChangeTextDocumentNotification$1.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification$1.method);
	})(DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
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
	var PublishDiagnosticsNotification;
	(function(PublishDiagnosticsNotification$1) {
		PublishDiagnosticsNotification$1.method = "textDocument/publishDiagnostics";
		PublishDiagnosticsNotification$1.messageDirection = messages_1.MessageDirection.serverToClient;
		PublishDiagnosticsNotification$1.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification$1.method);
	})(PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
	var CompletionTriggerKind;
	(function(CompletionTriggerKind$1) {
		CompletionTriggerKind$1.Invoked = 1;
		CompletionTriggerKind$1.TriggerCharacter = 2;
		CompletionTriggerKind$1.TriggerForIncompleteCompletions = 3;
	})(CompletionTriggerKind || (exports.CompletionTriggerKind = CompletionTriggerKind = {}));
	var CompletionRequest;
	(function(CompletionRequest$1) {
		CompletionRequest$1.method = "textDocument/completion";
		CompletionRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CompletionRequest$1.type = new messages_1.ProtocolRequestType(CompletionRequest$1.method);
	})(CompletionRequest || (exports.CompletionRequest = CompletionRequest = {}));
	var CompletionResolveRequest;
	(function(CompletionResolveRequest$1) {
		CompletionResolveRequest$1.method = "completionItem/resolve";
		CompletionResolveRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		CompletionResolveRequest$1.type = new messages_1.ProtocolRequestType(CompletionResolveRequest$1.method);
	})(CompletionResolveRequest || (exports.CompletionResolveRequest = CompletionResolveRequest = {}));
	var HoverRequest;
	(function(HoverRequest$1) {
		HoverRequest$1.method = "textDocument/hover";
		HoverRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		HoverRequest$1.type = new messages_1.ProtocolRequestType(HoverRequest$1.method);
	})(HoverRequest || (exports.HoverRequest = HoverRequest = {}));
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
	var DocumentRangeFormattingRequest;
	(function(DocumentRangeFormattingRequest$1) {
		DocumentRangeFormattingRequest$1.method = "textDocument/rangeFormatting";
		DocumentRangeFormattingRequest$1.messageDirection = messages_1.MessageDirection.clientToServer;
		DocumentRangeFormattingRequest$1.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest$1.method);
	})(DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
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
	function createProtocolConnection$1(input, output, logger, options) {
		if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
		return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
	}
	exports.createProtocolConnection = createProtocolConnection$1;
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
	__exportStar$1((init_main(), __toCommonJS(main_exports)), exports);
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
	const browser_1 = require_browser();
	__exportStar(require_browser(), exports);
	__exportStar(require_api(), exports);
	function createProtocolConnection(reader, writer, logger, options) {
		return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
	}
	exports.createProtocolConnection = createProtocolConnection;
}));
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
		while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) offset--;
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
		const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
			const diff = a.range.start.line - b.range.start.line;
			if (diff === 0) return a.range.start.character - b.range.start.character;
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
		if (isEOL(ch)) {
			if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++;
			result.push(textOffset + i + 1);
		}
	}
	return result;
}
function isEOL(char) {
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
var import_main = /* @__PURE__ */ __toESM(require_main());
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
					tagSupport: { valueSet: [import_main.DiagnosticTag.Unnecessary, import_main.DiagnosticTag.Deprecated] }
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
export { __require as A, TextDocumentEdit as C, __commonJSMin as D, init_main as E, __toESM as M, __esmMin as O, SymbolKind as S, VersionedTextDocumentIdentifier as T, MarkupKind as _, CodeActionKind as a, SelectionRange as b, CompletionItemKind as c, DiagnosticSeverity as d, DocumentHighlightKind as f, Location as g, InsertTextFormat as h, CodeAction as i, __toCommonJS as j, __export as k, CompletionItemTag as l, FoldingRangeKind as m, TextDocument as n, Command as o, DocumentSymbol as p, require_main as r, CompletionItem as s, BaseService as t, Diagnostic as u, Position as v, TextEdit as w, SymbolInformation as x, Range as y };
