import { t as __commonJSMin } from "./webworker-D-aAuX80.js";
//#region packages/ace-linters/build/lua-service.js
var require_lua_service = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
	})(exports, function(exports$1) {
		Object.defineProperty(exports$1, Symbol.toStringTag, { value: "Module" });
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
		var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
		var __exportAll = (all, no_symbols) => {
			let target = {};
			for (var name in all) __defProp(target, name, {
				get: all[name],
				enumerable: true
			});
			if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
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
		var require_is$1 = /* @__PURE__ */ __commonJSMin(((exports$2) => {
			Object.defineProperty(exports$2, "__esModule", { value: true });
			exports$2.stringArray = exports$2.array = exports$2.func = exports$2.error = exports$2.number = exports$2.string = exports$2.boolean = void 0;
			function boolean(value) {
				return value === true || value === false;
			}
			exports$2.boolean = boolean;
			function string(value) {
				return typeof value === "string" || value instanceof String;
			}
			exports$2.string = string;
			function number(value) {
				return typeof value === "number" || value instanceof Number;
			}
			exports$2.number = number;
			function error(value) {
				return value instanceof Error;
			}
			exports$2.error = error;
			function func(value) {
				return typeof value === "function";
			}
			exports$2.func = func;
			function array(value) {
				return Array.isArray(value);
			}
			exports$2.array = array;
			function stringArray(value) {
				return array(value) && value.every((elem) => string(elem));
			}
			exports$2.stringArray = stringArray;
		}));
		var require_messages$1 = /* @__PURE__ */ __commonJSMin(((exports$3) => {
			Object.defineProperty(exports$3, "__esModule", { value: true });
			exports$3.Message = exports$3.NotificationType9 = exports$3.NotificationType8 = exports$3.NotificationType7 = exports$3.NotificationType6 = exports$3.NotificationType5 = exports$3.NotificationType4 = exports$3.NotificationType3 = exports$3.NotificationType2 = exports$3.NotificationType1 = exports$3.NotificationType0 = exports$3.NotificationType = exports$3.RequestType9 = exports$3.RequestType8 = exports$3.RequestType7 = exports$3.RequestType6 = exports$3.RequestType5 = exports$3.RequestType4 = exports$3.RequestType3 = exports$3.RequestType2 = exports$3.RequestType1 = exports$3.RequestType = exports$3.RequestType0 = exports$3.AbstractMessageSignature = exports$3.ParameterStructures = exports$3.ResponseError = exports$3.ErrorCodes = void 0;
			var is = require_is$1();
			/**
			* Predefined error codes.
			*/
			var ErrorCodes;
			(function(ErrorCodes) {
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
				ErrorCodes.jsonrpcReservedErrorRangeEnd = -32e3;
				/** @deprecated use  jsonrpcReservedErrorRangeEnd */
				ErrorCodes.serverErrorEnd = -32e3;
			})(ErrorCodes || (exports$3.ErrorCodes = ErrorCodes = {}));
			exports$3.ResponseError = class ResponseError extends Error {
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
			exports$3.ParameterStructures = ParameterStructures;
			/**
			* The parameter structure is automatically inferred on the number of parameters
			* and the parameter type in case of a single param.
			*/
			ParameterStructures.auto = new ParameterStructures("auto");
			/**
			* Forces `byPosition` parameter structure. This is useful if you have a single
			* parameter which has a literal type.
			*/
			ParameterStructures.byPosition = new ParameterStructures("byPosition");
			/**
			* Forces `byName` parameter structure. This is only useful when having a single
			* parameter. The library will report errors if used with a different number of
			* parameters.
			*/
			ParameterStructures.byName = new ParameterStructures("byName");
			/**
			* An abstract implementation of a MessageType.
			*/
			var AbstractMessageSignature = class {
				constructor(method, numberOfParams) {
					this.method = method;
					this.numberOfParams = numberOfParams;
				}
				get parameterStructures() {
					return ParameterStructures.auto;
				}
			};
			exports$3.AbstractMessageSignature = AbstractMessageSignature;
			/**
			* Classes to type request response pairs
			*/
			var RequestType0 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 0);
				}
			};
			exports$3.RequestType0 = RequestType0;
			var RequestType = class extends AbstractMessageSignature {
				constructor(method, _parameterStructures = ParameterStructures.auto) {
					super(method, 1);
					this._parameterStructures = _parameterStructures;
				}
				get parameterStructures() {
					return this._parameterStructures;
				}
			};
			exports$3.RequestType = RequestType;
			var RequestType1 = class extends AbstractMessageSignature {
				constructor(method, _parameterStructures = ParameterStructures.auto) {
					super(method, 1);
					this._parameterStructures = _parameterStructures;
				}
				get parameterStructures() {
					return this._parameterStructures;
				}
			};
			exports$3.RequestType1 = RequestType1;
			var RequestType2 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 2);
				}
			};
			exports$3.RequestType2 = RequestType2;
			var RequestType3 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 3);
				}
			};
			exports$3.RequestType3 = RequestType3;
			var RequestType4 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 4);
				}
			};
			exports$3.RequestType4 = RequestType4;
			var RequestType5 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 5);
				}
			};
			exports$3.RequestType5 = RequestType5;
			var RequestType6 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 6);
				}
			};
			exports$3.RequestType6 = RequestType6;
			var RequestType7 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 7);
				}
			};
			exports$3.RequestType7 = RequestType7;
			var RequestType8 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 8);
				}
			};
			exports$3.RequestType8 = RequestType8;
			var RequestType9 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 9);
				}
			};
			exports$3.RequestType9 = RequestType9;
			var NotificationType = class extends AbstractMessageSignature {
				constructor(method, _parameterStructures = ParameterStructures.auto) {
					super(method, 1);
					this._parameterStructures = _parameterStructures;
				}
				get parameterStructures() {
					return this._parameterStructures;
				}
			};
			exports$3.NotificationType = NotificationType;
			var NotificationType0 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 0);
				}
			};
			exports$3.NotificationType0 = NotificationType0;
			var NotificationType1 = class extends AbstractMessageSignature {
				constructor(method, _parameterStructures = ParameterStructures.auto) {
					super(method, 1);
					this._parameterStructures = _parameterStructures;
				}
				get parameterStructures() {
					return this._parameterStructures;
				}
			};
			exports$3.NotificationType1 = NotificationType1;
			var NotificationType2 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 2);
				}
			};
			exports$3.NotificationType2 = NotificationType2;
			var NotificationType3 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 3);
				}
			};
			exports$3.NotificationType3 = NotificationType3;
			var NotificationType4 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 4);
				}
			};
			exports$3.NotificationType4 = NotificationType4;
			var NotificationType5 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 5);
				}
			};
			exports$3.NotificationType5 = NotificationType5;
			var NotificationType6 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 6);
				}
			};
			exports$3.NotificationType6 = NotificationType6;
			var NotificationType7 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 7);
				}
			};
			exports$3.NotificationType7 = NotificationType7;
			var NotificationType8 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 8);
				}
			};
			exports$3.NotificationType8 = NotificationType8;
			var NotificationType9 = class extends AbstractMessageSignature {
				constructor(method) {
					super(method, 9);
				}
			};
			exports$3.NotificationType9 = NotificationType9;
			var Message;
			(function(Message) {
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
			})(Message || (exports$3.Message = Message = {}));
		}));
		var require_linkedMap = /* @__PURE__ */ __commonJSMin(((exports$4) => {
			var _a;
			Object.defineProperty(exports$4, "__esModule", { value: true });
			exports$4.LRUCache = exports$4.LinkedMap = exports$4.Touch = void 0;
			var Touch;
			(function(Touch) {
				Touch.None = 0;
				Touch.First = 1;
				Touch.AsOld = Touch.First;
				Touch.Last = 2;
				Touch.AsNew = Touch.Last;
			})(Touch || (exports$4.Touch = Touch = {}));
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
			exports$4.LinkedMap = LinkedMap;
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
			exports$4.LRUCache = LRUCache;
		}));
		var require_disposable = /* @__PURE__ */ __commonJSMin(((exports$5) => {
			Object.defineProperty(exports$5, "__esModule", { value: true });
			exports$5.Disposable = void 0;
			var Disposable;
			(function(Disposable) {
				function create(func) {
					return { dispose: func };
				}
				Disposable.create = create;
			})(Disposable || (exports$5.Disposable = Disposable = {}));
		}));
		var require_ral = /* @__PURE__ */ __commonJSMin(((exports$6) => {
			Object.defineProperty(exports$6, "__esModule", { value: true });
			var _ral;
			function RAL() {
				if (_ral === void 0) throw new Error(`No runtime abstraction layer installed`);
				return _ral;
			}
			(function(RAL) {
				function install(ral) {
					if (ral === void 0) throw new Error(`No runtime abstraction layer provided`);
					_ral = ral;
				}
				RAL.install = install;
			})(RAL || (RAL = {}));
			exports$6.default = RAL;
		}));
		var require_events = /* @__PURE__ */ __commonJSMin(((exports$7) => {
			Object.defineProperty(exports$7, "__esModule", { value: true });
			exports$7.Emitter = exports$7.Event = void 0;
			var ral_1 = require_ral();
			var Event;
			(function(Event) {
				const _disposable = { dispose() {} };
				Event.None = function() {
					return _disposable;
				};
			})(Event || (exports$7.Event = Event = {}));
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
						(0, ral_1.default)().console.error(e);
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
				/**
				* For the public to allow to subscribe
				* to events from this Emitter
				*/
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
				/**
				* To be kept private to fire an event to
				* subscribers
				*/
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
			exports$7.Emitter = Emitter;
			Emitter._noop = function() {};
		}));
		var require_cancellation = /* @__PURE__ */ __commonJSMin(((exports$8) => {
			Object.defineProperty(exports$8, "__esModule", { value: true });
			exports$8.CancellationTokenSource = exports$8.CancellationToken = void 0;
			var ral_1 = require_ral();
			var Is = require_is$1();
			var events_1 = require_events();
			var CancellationToken;
			(function(CancellationToken) {
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
					return candidate && (candidate === CancellationToken.None || candidate === CancellationToken.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
				}
				CancellationToken.is = is;
			})(CancellationToken || (exports$8.CancellationToken = CancellationToken = {}));
			var shortcutEvent = Object.freeze(function(callback, context) {
				const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
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
					if (!this._emitter) this._emitter = new events_1.Emitter();
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
			exports$8.CancellationTokenSource = CancellationTokenSource;
		}));
		var require_sharedArrayCancellation = /* @__PURE__ */ __commonJSMin(((exports$9) => {
			Object.defineProperty(exports$9, "__esModule", { value: true });
			exports$9.SharedArrayReceiverStrategy = exports$9.SharedArraySenderStrategy = void 0;
			var cancellation_1 = require_cancellation();
			var CancellationState;
			(function(CancellationState) {
				CancellationState.Continue = 0;
				CancellationState.Cancelled = 1;
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
			exports$9.SharedArraySenderStrategy = SharedArraySenderStrategy;
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
					if (buffer === void 0) return new cancellation_1.CancellationTokenSource();
					return new SharedArrayBufferCancellationTokenSource(buffer);
				}
			};
			exports$9.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
		}));
		var require_semaphore = /* @__PURE__ */ __commonJSMin(((exports$10) => {
			Object.defineProperty(exports$10, "__esModule", { value: true });
			exports$10.Semaphore = void 0;
			var ral_1 = require_ral();
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
					(0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
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
			exports$10.Semaphore = Semaphore;
		}));
		var require_messageReader = /* @__PURE__ */ __commonJSMin(((exports$11) => {
			Object.defineProperty(exports$11, "__esModule", { value: true });
			exports$11.ReadableStreamMessageReader = exports$11.AbstractMessageReader = exports$11.MessageReader = void 0;
			var ral_1 = require_ral();
			var Is = require_is$1();
			var events_1 = require_events();
			var semaphore_1 = require_semaphore();
			var MessageReader;
			(function(MessageReader) {
				function is(value) {
					let candidate = value;
					return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
				}
				MessageReader.is = is;
			})(MessageReader || (exports$11.MessageReader = MessageReader = {}));
			var AbstractMessageReader = class {
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
					this.closeEmitter.fire(void 0);
				}
				get onPartialMessage() {
					return this.partialMessageEmitter.event;
				}
				firePartialMessage(info) {
					this.partialMessageEmitter.fire(info);
				}
				asError(error) {
					if (error instanceof Error) return error;
					else return /* @__PURE__ */ new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
				}
			};
			exports$11.AbstractMessageReader = AbstractMessageReader;
			var ResolvedMessageReaderOptions;
			(function(ResolvedMessageReaderOptions) {
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
						contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
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
				ResolvedMessageReaderOptions.fromOptions = fromOptions;
			})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
			var ReadableStreamMessageReader = class extends AbstractMessageReader {
				constructor(readable, options) {
					super();
					this.readable = readable;
					this.options = ResolvedMessageReaderOptions.fromOptions(options);
					this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
					this._partialMessageTimeout = 1e4;
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
					this.partialMessageTimer = void 0;
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
								/** We haven't received the full message yet. */
								this.setPartialMessageTimer();
								return;
							}
							this.clearPartialMessageTimer();
							this.nextMessageLength = -1;
							this.readSemaphore.lock(async () => {
								const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
								const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
								this.callback(message);
							}).catch((error) => {
								this.fireError(error);
							});
						}
					} catch (error) {
						this.fireError(error);
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
					this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
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
			exports$11.ReadableStreamMessageReader = ReadableStreamMessageReader;
		}));
		var require_messageWriter = /* @__PURE__ */ __commonJSMin(((exports$12) => {
			Object.defineProperty(exports$12, "__esModule", { value: true });
			exports$12.WriteableStreamMessageWriter = exports$12.AbstractMessageWriter = exports$12.MessageWriter = void 0;
			var ral_1 = require_ral();
			var Is = require_is$1();
			var semaphore_1 = require_semaphore();
			var events_1 = require_events();
			var ContentLength = "Content-Length: ";
			var CRLF = "\r\n";
			var MessageWriter;
			(function(MessageWriter) {
				function is(value) {
					let candidate = value;
					return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
				}
				MessageWriter.is = is;
			})(MessageWriter || (exports$12.MessageWriter = MessageWriter = {}));
			var AbstractMessageWriter = class {
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
					this.errorEmitter.fire([
						this.asError(error),
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
				asError(error) {
					if (error instanceof Error) return error;
					else return /* @__PURE__ */ new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
				}
			};
			exports$12.AbstractMessageWriter = AbstractMessageWriter;
			var ResolvedMessageWriterOptions;
			(function(ResolvedMessageWriterOptions) {
				function fromOptions(options) {
					if (options === void 0 || typeof options === "string") return {
						charset: options ?? "utf-8",
						contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder
					};
					else return {
						charset: options.charset ?? "utf-8",
						contentEncoder: options.contentEncoder,
						contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder
					};
				}
				ResolvedMessageWriterOptions.fromOptions = fromOptions;
			})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
			var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
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
						return this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
							if (this.options.contentEncoder !== void 0) return this.options.contentEncoder.encode(buffer);
							else return buffer;
						}).then((buffer) => {
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
						await this.writable.write(headers.join(""), "ascii");
						return this.writable.write(data);
					} catch (error) {
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
			};
			exports$12.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
		}));
		var require_messageBuffer = /* @__PURE__ */ __commonJSMin(((exports$13) => {
			Object.defineProperty(exports$13, "__esModule", { value: true });
			exports$13.AbstractMessageBuffer = void 0;
			var CR = 13;
			var LF = 10;
			var CRLF = "\r\n";
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
			exports$13.AbstractMessageBuffer = AbstractMessageBuffer;
		}));
		var require_connection$1 = /* @__PURE__ */ __commonJSMin(((exports$14) => {
			Object.defineProperty(exports$14, "__esModule", { value: true });
			exports$14.createMessageConnection = exports$14.ConnectionOptions = exports$14.MessageStrategy = exports$14.CancellationStrategy = exports$14.CancellationSenderStrategy = exports$14.CancellationReceiverStrategy = exports$14.RequestCancellationReceiverStrategy = exports$14.IdCancellationReceiverStrategy = exports$14.ConnectionStrategy = exports$14.ConnectionError = exports$14.ConnectionErrors = exports$14.LogTraceNotification = exports$14.SetTraceNotification = exports$14.TraceFormat = exports$14.TraceValues = exports$14.Trace = exports$14.NullLogger = exports$14.ProgressType = exports$14.ProgressToken = void 0;
			var ral_1 = require_ral();
			var Is = require_is$1();
			var messages_1 = require_messages$1();
			var linkedMap_1 = require_linkedMap();
			var events_1 = require_events();
			var cancellation_1 = require_cancellation();
			var CancelNotification;
			(function(CancelNotification) {
				CancelNotification.type = new messages_1.NotificationType("$/cancelRequest");
			})(CancelNotification || (CancelNotification = {}));
			var ProgressToken;
			(function(ProgressToken) {
				function is(value) {
					return typeof value === "string" || typeof value === "number";
				}
				ProgressToken.is = is;
			})(ProgressToken || (exports$14.ProgressToken = ProgressToken = {}));
			var ProgressNotification;
			(function(ProgressNotification) {
				ProgressNotification.type = new messages_1.NotificationType("$/progress");
			})(ProgressNotification || (ProgressNotification = {}));
			var ProgressType = class {
				constructor() {}
			};
			exports$14.ProgressType = ProgressType;
			var StarRequestHandler;
			(function(StarRequestHandler) {
				function is(value) {
					return Is.func(value);
				}
				StarRequestHandler.is = is;
			})(StarRequestHandler || (StarRequestHandler = {}));
			exports$14.NullLogger = Object.freeze({
				error: () => {},
				warn: () => {},
				info: () => {},
				log: () => {}
			});
			var Trace;
			(function(Trace) {
				Trace[Trace["Off"] = 0] = "Off";
				Trace[Trace["Messages"] = 1] = "Messages";
				Trace[Trace["Compact"] = 2] = "Compact";
				Trace[Trace["Verbose"] = 3] = "Verbose";
			})(Trace || (exports$14.Trace = Trace = {}));
			var TraceValues;
			(function(TraceValues) {
				/**
				* Turn tracing off.
				*/
				TraceValues.Off = "off";
				/**
				* Trace messages only.
				*/
				TraceValues.Messages = "messages";
				/**
				* Compact message tracing.
				*/
				TraceValues.Compact = "compact";
				/**
				* Verbose message tracing.
				*/
				TraceValues.Verbose = "verbose";
			})(TraceValues || (exports$14.TraceValues = TraceValues = {}));
			(function(Trace) {
				function fromString(value) {
					if (!Is.string(value)) return Trace.Off;
					value = value.toLowerCase();
					switch (value) {
						case "off": return Trace.Off;
						case "messages": return Trace.Messages;
						case "compact": return Trace.Compact;
						case "verbose": return Trace.Verbose;
						default: return Trace.Off;
					}
				}
				Trace.fromString = fromString;
				function toString(value) {
					switch (value) {
						case Trace.Off: return "off";
						case Trace.Messages: return "messages";
						case Trace.Compact: return "compact";
						case Trace.Verbose: return "verbose";
						default: return "off";
					}
				}
				Trace.toString = toString;
			})(Trace || (exports$14.Trace = Trace = {}));
			var TraceFormat;
			(function(TraceFormat) {
				TraceFormat["Text"] = "text";
				TraceFormat["JSON"] = "json";
			})(TraceFormat || (exports$14.TraceFormat = TraceFormat = {}));
			(function(TraceFormat) {
				function fromString(value) {
					if (!Is.string(value)) return TraceFormat.Text;
					value = value.toLowerCase();
					if (value === "json") return TraceFormat.JSON;
					else return TraceFormat.Text;
				}
				TraceFormat.fromString = fromString;
			})(TraceFormat || (exports$14.TraceFormat = TraceFormat = {}));
			var SetTraceNotification;
			(function(SetTraceNotification) {
				SetTraceNotification.type = new messages_1.NotificationType("$/setTrace");
			})(SetTraceNotification || (exports$14.SetTraceNotification = SetTraceNotification = {}));
			var LogTraceNotification;
			(function(LogTraceNotification) {
				LogTraceNotification.type = new messages_1.NotificationType("$/logTrace");
			})(LogTraceNotification || (exports$14.LogTraceNotification = LogTraceNotification = {}));
			var ConnectionErrors;
			(function(ConnectionErrors) {
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
			})(ConnectionErrors || (exports$14.ConnectionErrors = ConnectionErrors = {}));
			var ConnectionError = class ConnectionError extends Error {
				constructor(code, message) {
					super(message);
					this.code = code;
					Object.setPrototypeOf(this, ConnectionError.prototype);
				}
			};
			exports$14.ConnectionError = ConnectionError;
			var ConnectionStrategy;
			(function(ConnectionStrategy) {
				function is(value) {
					const candidate = value;
					return candidate && Is.func(candidate.cancelUndispatched);
				}
				ConnectionStrategy.is = is;
			})(ConnectionStrategy || (exports$14.ConnectionStrategy = ConnectionStrategy = {}));
			var IdCancellationReceiverStrategy;
			(function(IdCancellationReceiverStrategy) {
				function is(value) {
					const candidate = value;
					return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
				}
				IdCancellationReceiverStrategy.is = is;
			})(IdCancellationReceiverStrategy || (exports$14.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
			var RequestCancellationReceiverStrategy;
			(function(RequestCancellationReceiverStrategy) {
				function is(value) {
					const candidate = value;
					return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
				}
				RequestCancellationReceiverStrategy.is = is;
			})(RequestCancellationReceiverStrategy || (exports$14.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
			var CancellationReceiverStrategy;
			(function(CancellationReceiverStrategy) {
				CancellationReceiverStrategy.Message = Object.freeze({ createCancellationTokenSource(_) {
					return new cancellation_1.CancellationTokenSource();
				} });
				function is(value) {
					return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
				}
				CancellationReceiverStrategy.is = is;
			})(CancellationReceiverStrategy || (exports$14.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
			var CancellationSenderStrategy;
			(function(CancellationSenderStrategy) {
				CancellationSenderStrategy.Message = Object.freeze({
					sendCancellation(conn, id) {
						return conn.sendNotification(CancelNotification.type, { id });
					},
					cleanup(_) {}
				});
				function is(value) {
					const candidate = value;
					return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
				}
				CancellationSenderStrategy.is = is;
			})(CancellationSenderStrategy || (exports$14.CancellationSenderStrategy = CancellationSenderStrategy = {}));
			var CancellationStrategy;
			(function(CancellationStrategy) {
				CancellationStrategy.Message = Object.freeze({
					receiver: CancellationReceiverStrategy.Message,
					sender: CancellationSenderStrategy.Message
				});
				function is(value) {
					const candidate = value;
					return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
				}
				CancellationStrategy.is = is;
			})(CancellationStrategy || (exports$14.CancellationStrategy = CancellationStrategy = {}));
			var MessageStrategy;
			(function(MessageStrategy) {
				function is(value) {
					const candidate = value;
					return candidate && Is.func(candidate.handleMessage);
				}
				MessageStrategy.is = is;
			})(MessageStrategy || (exports$14.MessageStrategy = MessageStrategy = {}));
			var ConnectionOptions;
			(function(ConnectionOptions) {
				function is(value) {
					const candidate = value;
					return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
				}
				ConnectionOptions.is = is;
			})(ConnectionOptions || (exports$14.ConnectionOptions = ConnectionOptions = {}));
			var ConnectionState;
			(function(ConnectionState) {
				ConnectionState[ConnectionState["New"] = 1] = "New";
				ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
				ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
				ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
			})(ConnectionState || (ConnectionState = {}));
			function createMessageConnection(messageReader, messageWriter, _logger, options) {
				const logger = _logger !== void 0 ? _logger : exports$14.NullLogger;
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
				let messageQueue = new linkedMap_1.LinkedMap();
				let responsePromises = /* @__PURE__ */ new Map();
				let knownCanceledRequests = /* @__PURE__ */ new Set();
				let requestTokens = /* @__PURE__ */ new Map();
				let trace = Trace.Off;
				let traceFormat = TraceFormat.Text;
				let tracer;
				let state = ConnectionState.New;
				const errorEmitter = new events_1.Emitter();
				const closeEmitter = new events_1.Emitter();
				const unhandledNotificationEmitter = new events_1.Emitter();
				const unhandledProgressEmitter = new events_1.Emitter();
				const disposeEmitter = new events_1.Emitter();
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
					if (messages_1.Message.isRequest(message)) queue.set(createRequestQueueKey(message.id), message);
					else if (messages_1.Message.isResponse(message)) queue.set(createResponseQueueKey(message.id), message);
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
				function readErrorHandler(error) {
					errorEmitter.fire([
						error,
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
					timer = (0, ral_1.default)().timer.setImmediate(() => {
						timer = void 0;
						processMessageQueue();
					});
				}
				function handleMessage(message) {
					if (messages_1.Message.isRequest(message)) handleRequest(message);
					else if (messages_1.Message.isNotification(message)) handleNotification(message);
					else if (messages_1.Message.isResponse(message)) handleResponse(message);
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
						if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
							const cancelId = message.params.id;
							const key = createRequestQueueKey(cancelId);
							const toCancel = messageQueue.get(key);
							if (messages_1.Message.isRequest(toCancel)) {
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
					function reply(resultOrError, method, startTime) {
						const message = {
							jsonrpc: version,
							id: requestMessage.id
						};
						if (resultOrError instanceof messages_1.ResponseError) message.error = resultOrError.toJson();
						else message.result = resultOrError === void 0 ? null : resultOrError;
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
						if (result === void 0) result = null;
						const message = {
							jsonrpc: version,
							id: requestMessage.id,
							result
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
						const tokenKey = requestMessage.id ?? String(Date.now());
						const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
						if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) cancellationSource.cancel();
						if (requestMessage.id !== null) requestTokens.set(tokenKey, cancellationSource);
						try {
							let handlerResult;
							if (requestHandler) if (requestMessage.params === void 0) {
								if (type !== void 0 && type.numberOfParams !== 0) {
									replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
									return;
								}
								handlerResult = requestHandler(cancellationSource.token);
							} else if (Array.isArray(requestMessage.params)) {
								if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
									replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
									return;
								}
								handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
							} else {
								if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
									replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
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
							}, (error) => {
								requestTokens.delete(tokenKey);
								if (error instanceof messages_1.ResponseError) replyError(error, requestMessage.method, startTime);
								else if (error && Is.string(error.message)) replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
								else replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
							});
							else {
								requestTokens.delete(tokenKey);
								reply(handlerResult, requestMessage.method, startTime);
							}
						} catch (error) {
							requestTokens.delete(tokenKey);
							if (error instanceof messages_1.ResponseError) reply(error, requestMessage.method, startTime);
							else if (error && Is.string(error.message)) replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
							else replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
						}
					} else replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
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
									const error = responseMessage.error;
									responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
								} else if (responseMessage.result !== void 0) responsePromise.resolve(responseMessage.result);
								else throw new Error("Should never happen.");
							} catch (error) {
								if (error.message) logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
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
								if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
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
									if (type.parameterStructures === messages_1.ParameterStructures.byName) logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
									if (type.numberOfParams !== message.params.length) logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
								}
								notificationHandler(...params);
							}
						} else {
							if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
							notificationHandler(message.params);
						}
						else if (starNotificationHandler) starNotificationHandler(message.method, message.params);
					} catch (error) {
						if (error.message) logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
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
							const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
							tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
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
						case messages_1.ParameterStructures.auto: if (isNamedParam(param)) return nullToUndefined(param);
						else return [undefinedToNull(param)];
						case messages_1.ParameterStructures.byName:
							if (!isNamedParam(param)) throw new Error(`Received parameters by name but param is not an object literal.`);
							return nullToUndefined(param);
						case messages_1.ParameterStructures.byPosition: return [undefinedToNull(param)];
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
							let parameterStructures = messages_1.ParameterStructures.auto;
							if (messages_1.ParameterStructures.is(first)) {
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
									if (parameterStructures === messages_1.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
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
						return messageWriter.write(notificationMessage).catch((error) => {
							logger.error(`Sending notification failed.`);
							throw error;
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
									messageParams = void 0;
									break;
								case 1:
									messageParams = computeSingleParam(parameterStructures, args[paramStart]);
									break;
								default:
									if (parameterStructures === messages_1.ParameterStructures.byName) throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
									messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
									break;
							}
						} else {
							const params = args;
							method = type.method;
							messageParams = computeMessageParams(type, params);
							const numberOfParams = type.numberOfParams;
							token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
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
							} catch (error) {
								logger.error(`Sending request failed.`);
								responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
								throw error;
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
						const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
						for (const promise of responsePromises.values()) promise.reject(error);
						responsePromises = /* @__PURE__ */ new Map();
						requestTokens = /* @__PURE__ */ new Map();
						knownCanceledRequests = /* @__PURE__ */ new Set();
						messageQueue = new linkedMap_1.LinkedMap();
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
						(0, ral_1.default)().console.log("inspect");
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
			exports$14.createMessageConnection = createMessageConnection;
		}));
		var require_api$1 = /* @__PURE__ */ __commonJSMin(((exports$15) => {
			Object.defineProperty(exports$15, "__esModule", { value: true });
			exports$15.ProgressType = exports$15.ProgressToken = exports$15.createMessageConnection = exports$15.NullLogger = exports$15.ConnectionOptions = exports$15.ConnectionStrategy = exports$15.AbstractMessageBuffer = exports$15.WriteableStreamMessageWriter = exports$15.AbstractMessageWriter = exports$15.MessageWriter = exports$15.ReadableStreamMessageReader = exports$15.AbstractMessageReader = exports$15.MessageReader = exports$15.SharedArrayReceiverStrategy = exports$15.SharedArraySenderStrategy = exports$15.CancellationToken = exports$15.CancellationTokenSource = exports$15.Emitter = exports$15.Event = exports$15.Disposable = exports$15.LRUCache = exports$15.Touch = exports$15.LinkedMap = exports$15.ParameterStructures = exports$15.NotificationType9 = exports$15.NotificationType8 = exports$15.NotificationType7 = exports$15.NotificationType6 = exports$15.NotificationType5 = exports$15.NotificationType4 = exports$15.NotificationType3 = exports$15.NotificationType2 = exports$15.NotificationType1 = exports$15.NotificationType0 = exports$15.NotificationType = exports$15.ErrorCodes = exports$15.ResponseError = exports$15.RequestType9 = exports$15.RequestType8 = exports$15.RequestType7 = exports$15.RequestType6 = exports$15.RequestType5 = exports$15.RequestType4 = exports$15.RequestType3 = exports$15.RequestType2 = exports$15.RequestType1 = exports$15.RequestType0 = exports$15.RequestType = exports$15.Message = exports$15.RAL = void 0;
			exports$15.MessageStrategy = exports$15.CancellationStrategy = exports$15.CancellationSenderStrategy = exports$15.CancellationReceiverStrategy = exports$15.ConnectionError = exports$15.ConnectionErrors = exports$15.LogTraceNotification = exports$15.SetTraceNotification = exports$15.TraceFormat = exports$15.TraceValues = exports$15.Trace = void 0;
			var messages_1 = require_messages$1();
			Object.defineProperty(exports$15, "Message", {
				enumerable: true,
				get: function() {
					return messages_1.Message;
				}
			});
			Object.defineProperty(exports$15, "RequestType", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType;
				}
			});
			Object.defineProperty(exports$15, "RequestType0", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType0;
				}
			});
			Object.defineProperty(exports$15, "RequestType1", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType1;
				}
			});
			Object.defineProperty(exports$15, "RequestType2", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType2;
				}
			});
			Object.defineProperty(exports$15, "RequestType3", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType3;
				}
			});
			Object.defineProperty(exports$15, "RequestType4", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType4;
				}
			});
			Object.defineProperty(exports$15, "RequestType5", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType5;
				}
			});
			Object.defineProperty(exports$15, "RequestType6", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType6;
				}
			});
			Object.defineProperty(exports$15, "RequestType7", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType7;
				}
			});
			Object.defineProperty(exports$15, "RequestType8", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType8;
				}
			});
			Object.defineProperty(exports$15, "RequestType9", {
				enumerable: true,
				get: function() {
					return messages_1.RequestType9;
				}
			});
			Object.defineProperty(exports$15, "ResponseError", {
				enumerable: true,
				get: function() {
					return messages_1.ResponseError;
				}
			});
			Object.defineProperty(exports$15, "ErrorCodes", {
				enumerable: true,
				get: function() {
					return messages_1.ErrorCodes;
				}
			});
			Object.defineProperty(exports$15, "NotificationType", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType;
				}
			});
			Object.defineProperty(exports$15, "NotificationType0", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType0;
				}
			});
			Object.defineProperty(exports$15, "NotificationType1", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType1;
				}
			});
			Object.defineProperty(exports$15, "NotificationType2", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType2;
				}
			});
			Object.defineProperty(exports$15, "NotificationType3", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType3;
				}
			});
			Object.defineProperty(exports$15, "NotificationType4", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType4;
				}
			});
			Object.defineProperty(exports$15, "NotificationType5", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType5;
				}
			});
			Object.defineProperty(exports$15, "NotificationType6", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType6;
				}
			});
			Object.defineProperty(exports$15, "NotificationType7", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType7;
				}
			});
			Object.defineProperty(exports$15, "NotificationType8", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType8;
				}
			});
			Object.defineProperty(exports$15, "NotificationType9", {
				enumerable: true,
				get: function() {
					return messages_1.NotificationType9;
				}
			});
			Object.defineProperty(exports$15, "ParameterStructures", {
				enumerable: true,
				get: function() {
					return messages_1.ParameterStructures;
				}
			});
			var linkedMap_1 = require_linkedMap();
			Object.defineProperty(exports$15, "LinkedMap", {
				enumerable: true,
				get: function() {
					return linkedMap_1.LinkedMap;
				}
			});
			Object.defineProperty(exports$15, "LRUCache", {
				enumerable: true,
				get: function() {
					return linkedMap_1.LRUCache;
				}
			});
			Object.defineProperty(exports$15, "Touch", {
				enumerable: true,
				get: function() {
					return linkedMap_1.Touch;
				}
			});
			var disposable_1 = require_disposable();
			Object.defineProperty(exports$15, "Disposable", {
				enumerable: true,
				get: function() {
					return disposable_1.Disposable;
				}
			});
			var events_1 = require_events();
			Object.defineProperty(exports$15, "Event", {
				enumerable: true,
				get: function() {
					return events_1.Event;
				}
			});
			Object.defineProperty(exports$15, "Emitter", {
				enumerable: true,
				get: function() {
					return events_1.Emitter;
				}
			});
			var cancellation_1 = require_cancellation();
			Object.defineProperty(exports$15, "CancellationTokenSource", {
				enumerable: true,
				get: function() {
					return cancellation_1.CancellationTokenSource;
				}
			});
			Object.defineProperty(exports$15, "CancellationToken", {
				enumerable: true,
				get: function() {
					return cancellation_1.CancellationToken;
				}
			});
			var sharedArrayCancellation_1 = require_sharedArrayCancellation();
			Object.defineProperty(exports$15, "SharedArraySenderStrategy", {
				enumerable: true,
				get: function() {
					return sharedArrayCancellation_1.SharedArraySenderStrategy;
				}
			});
			Object.defineProperty(exports$15, "SharedArrayReceiverStrategy", {
				enumerable: true,
				get: function() {
					return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
				}
			});
			var messageReader_1 = require_messageReader();
			Object.defineProperty(exports$15, "MessageReader", {
				enumerable: true,
				get: function() {
					return messageReader_1.MessageReader;
				}
			});
			Object.defineProperty(exports$15, "AbstractMessageReader", {
				enumerable: true,
				get: function() {
					return messageReader_1.AbstractMessageReader;
				}
			});
			Object.defineProperty(exports$15, "ReadableStreamMessageReader", {
				enumerable: true,
				get: function() {
					return messageReader_1.ReadableStreamMessageReader;
				}
			});
			var messageWriter_1 = require_messageWriter();
			Object.defineProperty(exports$15, "MessageWriter", {
				enumerable: true,
				get: function() {
					return messageWriter_1.MessageWriter;
				}
			});
			Object.defineProperty(exports$15, "AbstractMessageWriter", {
				enumerable: true,
				get: function() {
					return messageWriter_1.AbstractMessageWriter;
				}
			});
			Object.defineProperty(exports$15, "WriteableStreamMessageWriter", {
				enumerable: true,
				get: function() {
					return messageWriter_1.WriteableStreamMessageWriter;
				}
			});
			var messageBuffer_1 = require_messageBuffer();
			Object.defineProperty(exports$15, "AbstractMessageBuffer", {
				enumerable: true,
				get: function() {
					return messageBuffer_1.AbstractMessageBuffer;
				}
			});
			var connection_1 = require_connection$1();
			Object.defineProperty(exports$15, "ConnectionStrategy", {
				enumerable: true,
				get: function() {
					return connection_1.ConnectionStrategy;
				}
			});
			Object.defineProperty(exports$15, "ConnectionOptions", {
				enumerable: true,
				get: function() {
					return connection_1.ConnectionOptions;
				}
			});
			Object.defineProperty(exports$15, "NullLogger", {
				enumerable: true,
				get: function() {
					return connection_1.NullLogger;
				}
			});
			Object.defineProperty(exports$15, "createMessageConnection", {
				enumerable: true,
				get: function() {
					return connection_1.createMessageConnection;
				}
			});
			Object.defineProperty(exports$15, "ProgressToken", {
				enumerable: true,
				get: function() {
					return connection_1.ProgressToken;
				}
			});
			Object.defineProperty(exports$15, "ProgressType", {
				enumerable: true,
				get: function() {
					return connection_1.ProgressType;
				}
			});
			Object.defineProperty(exports$15, "Trace", {
				enumerable: true,
				get: function() {
					return connection_1.Trace;
				}
			});
			Object.defineProperty(exports$15, "TraceValues", {
				enumerable: true,
				get: function() {
					return connection_1.TraceValues;
				}
			});
			Object.defineProperty(exports$15, "TraceFormat", {
				enumerable: true,
				get: function() {
					return connection_1.TraceFormat;
				}
			});
			Object.defineProperty(exports$15, "SetTraceNotification", {
				enumerable: true,
				get: function() {
					return connection_1.SetTraceNotification;
				}
			});
			Object.defineProperty(exports$15, "LogTraceNotification", {
				enumerable: true,
				get: function() {
					return connection_1.LogTraceNotification;
				}
			});
			Object.defineProperty(exports$15, "ConnectionErrors", {
				enumerable: true,
				get: function() {
					return connection_1.ConnectionErrors;
				}
			});
			Object.defineProperty(exports$15, "ConnectionError", {
				enumerable: true,
				get: function() {
					return connection_1.ConnectionError;
				}
			});
			Object.defineProperty(exports$15, "CancellationReceiverStrategy", {
				enumerable: true,
				get: function() {
					return connection_1.CancellationReceiverStrategy;
				}
			});
			Object.defineProperty(exports$15, "CancellationSenderStrategy", {
				enumerable: true,
				get: function() {
					return connection_1.CancellationSenderStrategy;
				}
			});
			Object.defineProperty(exports$15, "CancellationStrategy", {
				enumerable: true,
				get: function() {
					return connection_1.CancellationStrategy;
				}
			});
			Object.defineProperty(exports$15, "MessageStrategy", {
				enumerable: true,
				get: function() {
					return connection_1.MessageStrategy;
				}
			});
			exports$15.RAL = require_ral().default;
		}));
		var require_ril = /* @__PURE__ */ __commonJSMin(((exports$16) => {
			Object.defineProperty(exports$16, "__esModule", { value: true });
			var api_1 = require_api$1();
			var MessageBuffer = class MessageBuffer extends api_1.AbstractMessageBuffer {
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
					this._onData = new api_1.Emitter();
					this._messageListener = (event) => {
						event.data.arrayBuffer().then((buffer) => {
							this._onData.fire(new Uint8Array(buffer));
						}, () => {
							(0, api_1.RAL)().console.error(`Converting blob to array buffer failed.`);
						});
					};
					this.socket.addEventListener("message", this._messageListener);
				}
				onClose(listener) {
					this.socket.addEventListener("close", listener);
					return api_1.Disposable.create(() => this.socket.removeEventListener("close", listener));
				}
				onError(listener) {
					this.socket.addEventListener("error", listener);
					return api_1.Disposable.create(() => this.socket.removeEventListener("error", listener));
				}
				onEnd(listener) {
					this.socket.addEventListener("end", listener);
					return api_1.Disposable.create(() => this.socket.removeEventListener("end", listener));
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
					return api_1.Disposable.create(() => this.socket.removeEventListener("close", listener));
				}
				onError(listener) {
					this.socket.addEventListener("error", listener);
					return api_1.Disposable.create(() => this.socket.removeEventListener("error", listener));
				}
				onEnd(listener) {
					this.socket.addEventListener("end", listener);
					return api_1.Disposable.create(() => this.socket.removeEventListener("end", listener));
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
			var _textEncoder = new TextEncoder();
			var _ril = Object.freeze({
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
			(function(RIL) {
				function install() {
					api_1.RAL.install(_ril);
				}
				RIL.install = install;
			})(RIL || (RIL = {}));
			exports$16.default = RIL;
		}));
		var require_main$1 = /* @__PURE__ */ __commonJSMin(((exports$17) => {
			var __createBinding = exports$17 && exports$17.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
			var __exportStar = exports$17 && exports$17.__exportStar || function(m, exports$4) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$4, p)) __createBinding(exports$4, m, p);
			};
			Object.defineProperty(exports$17, "__esModule", { value: true });
			exports$17.createMessageConnection = exports$17.BrowserMessageWriter = exports$17.BrowserMessageReader = void 0;
			require_ril().default.install();
			var api_1 = require_api$1();
			__exportStar(require_api$1(), exports$17);
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
			exports$17.BrowserMessageReader = BrowserMessageReader;
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
					} catch (error) {
						this.handleError(error, msg);
						return Promise.reject(error);
					}
				}
				handleError(error, msg) {
					this.errorCount++;
					this.fireError(error, msg, this.errorCount);
				}
				end() {}
			};
			exports$17.BrowserMessageWriter = BrowserMessageWriter;
			function createMessageConnection(reader, writer, logger, options) {
				if (logger === void 0) logger = api_1.NullLogger;
				if (api_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
				return (0, api_1.createMessageConnection)(reader, writer, logger, options);
			}
			exports$17.createMessageConnection = createMessageConnection;
		}));
		var require_browser = /* @__PURE__ */ __commonJSMin(((exports$18, module$1) => {
			module$1.exports = require_main$1();
		}));
		var main_exports = /* @__PURE__ */ __exportAll({
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
			URI: () => URI,
			VersionedTextDocumentIdentifier: () => VersionedTextDocumentIdentifier,
			WorkspaceChange: () => WorkspaceChange,
			WorkspaceEdit: () => WorkspaceEdit,
			WorkspaceFolder: () => WorkspaceFolder,
			WorkspaceSymbol: () => WorkspaceSymbol,
			integer: () => integer,
			uinteger: () => uinteger
		});
		var DocumentUri, URI, integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity$1, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextEditChangeImpl, ChangeAnnotations, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent$1, CompletionItemKind$2, InsertTextFormat$1, CompletionItemTag, InsertReplaceEdit, InsertTextMode, CompletionItemLabelDetails, CompletionItem, CompletionList, MarkedString$1, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, WorkspaceSymbol, DocumentSymbol, CodeActionKind, CodeActionTriggerKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens, InlineValueText, InlineValueVariableLookup, InlineValueEvaluatableExpression, InlineValueContext, InlayHintKind, InlayHintLabelPart, InlayHint, StringValue, InlineCompletionItem, InlineCompletionList, InlineCompletionTriggerKind, SelectedCompletionInfo, InlineCompletionContext, WorkspaceFolder, EOL, TextDocument$1, FullTextDocument$1, Is;
		var init_main = __esmMin((() => {
			(function(DocumentUri) {
				function is(value) {
					return typeof value === "string";
				}
				DocumentUri.is = is;
			})(DocumentUri || (DocumentUri = {}));
			(function(URI) {
				function is(value) {
					return typeof value === "string";
				}
				URI.is = is;
			})(URI || (URI = {}));
			(function(integer) {
				integer.MIN_VALUE = -2147483648;
				integer.MAX_VALUE = 2147483647;
				function is(value) {
					return typeof value === "number" && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
				}
				integer.is = is;
			})(integer || (integer = {}));
			(function(uinteger) {
				uinteger.MIN_VALUE = 0;
				uinteger.MAX_VALUE = 2147483647;
				function is(value) {
					return typeof value === "number" && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
				}
				uinteger.is = is;
			})(uinteger || (uinteger = {}));
			(function(Position) {
				/**
				* Creates a new Position literal from the given line and character.
				* @param line The position's line.
				* @param character The position's character.
				*/
				function create(line, character) {
					if (line === Number.MAX_VALUE) line = uinteger.MAX_VALUE;
					if (character === Number.MAX_VALUE) character = uinteger.MAX_VALUE;
					return {
						line,
						character
					};
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
			(function(Range) {
				function create(one, two, three, four) {
					if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) return {
						start: Position.create(one, two),
						end: Position.create(three, four)
					};
					else if (Position.is(one) && Position.is(two)) return {
						start: one,
						end: two
					};
					else throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
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
			(function(Location) {
				/**
				* Creates a Location literal.
				* @param uri The location's uri.
				* @param range The location's range.
				*/
				function create(uri, range) {
					return {
						uri,
						range
					};
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
			(function(LocationLink) {
				/**
				* Creates a LocationLink literal.
				* @param targetUri The definition's uri.
				* @param targetRange The full range of the definition.
				* @param targetSelectionRange The span of the symbol definition at the target.
				* @param originSelectionRange The span of the symbol being defined in the originating source file.
				*/
				function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
					return {
						targetUri,
						targetRange,
						targetSelectionRange,
						originSelectionRange
					};
				}
				LocationLink.create = create;
				/**
				* Checks whether the given literal conforms to the {@link LocationLink} interface.
				*/
				function is(value) {
					let candidate = value;
					return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
				}
				LocationLink.is = is;
			})(LocationLink || (LocationLink = {}));
			(function(Color) {
				/**
				* Creates a new Color literal.
				*/
				function create(red, green, blue, alpha) {
					return {
						red,
						green,
						blue,
						alpha
					};
				}
				Color.create = create;
				/**
				* Checks whether the given literal conforms to the {@link Color} interface.
				*/
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
				}
				Color.is = is;
			})(Color || (Color = {}));
			(function(ColorInformation) {
				/**
				* Creates a new ColorInformation literal.
				*/
				function create(range, color) {
					return {
						range,
						color
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
			(function(ColorPresentation) {
				/**
				* Creates a new ColorInformation literal.
				*/
				function create(label, textEdit, additionalTextEdits) {
					return {
						label,
						textEdit,
						additionalTextEdits
					};
				}
				ColorPresentation.create = create;
				/**
				* Checks whether the given literal conforms to the {@link ColorInformation} interface.
				*/
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
				}
				ColorPresentation.is = is;
			})(ColorPresentation || (ColorPresentation = {}));
			(function(FoldingRangeKind) {
				/**
				* Folding range for a comment
				*/
				FoldingRangeKind.Comment = "comment";
				/**
				* Folding range for an import or include
				*/
				FoldingRangeKind.Imports = "imports";
				/**
				* Folding range for a region (e.g. `#region`)
				*/
				FoldingRangeKind.Region = "region";
			})(FoldingRangeKind || (FoldingRangeKind = {}));
			(function(FoldingRange) {
				/**
				* Creates a new FoldingRange literal.
				*/
				function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
					const result = {
						startLine,
						endLine
					};
					if (Is.defined(startCharacter)) result.startCharacter = startCharacter;
					if (Is.defined(endCharacter)) result.endCharacter = endCharacter;
					if (Is.defined(kind)) result.kind = kind;
					if (Is.defined(collapsedText)) result.collapsedText = collapsedText;
					return result;
				}
				FoldingRange.create = create;
				/**
				* Checks whether the given literal conforms to the {@link FoldingRange} interface.
				*/
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
				}
				FoldingRange.is = is;
			})(FoldingRange || (FoldingRange = {}));
			(function(DiagnosticRelatedInformation) {
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
			(function(DiagnosticSeverity) {
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
			})(DiagnosticSeverity$1 || (DiagnosticSeverity$1 = {}));
			(function(DiagnosticTag) {
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
			(function(CodeDescription) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.string(candidate.href);
				}
				CodeDescription.is = is;
			})(CodeDescription || (CodeDescription = {}));
			(function(Diagnostic) {
				/**
				* Creates a new Diagnostic literal.
				*/
				function create(range, message, severity, code, source, relatedInformation) {
					let result = {
						range,
						message
					};
					if (Is.defined(severity)) result.severity = severity;
					if (Is.defined(code)) result.code = code;
					if (Is.defined(source)) result.source = source;
					if (Is.defined(relatedInformation)) result.relatedInformation = relatedInformation;
					return result;
				}
				Diagnostic.create = create;
				/**
				* Checks whether the given literal conforms to the {@link Diagnostic} interface.
				*/
				function is(value) {
					var _a;
					let candidate = value;
					return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
				}
				Diagnostic.is = is;
			})(Diagnostic || (Diagnostic = {}));
			(function(Command) {
				/**
				* Creates a new Command literal.
				*/
				function create(title, command, ...args) {
					let result = {
						title,
						command
					};
					if (Is.defined(args) && args.length > 0) result.arguments = args;
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
			(function(TextEdit) {
				/**
				* Creates a replace text edit.
				* @param range The range of text to be replaced.
				* @param newText The new text.
				*/
				function replace(range, newText) {
					return {
						range,
						newText
					};
				}
				TextEdit.replace = replace;
				/**
				* Creates an insert text edit.
				* @param position The position to insert the text at.
				* @param newText The text to be inserted.
				*/
				function insert(position, newText) {
					return {
						range: {
							start: position,
							end: position
						},
						newText
					};
				}
				TextEdit.insert = insert;
				/**
				* Creates a delete text edit.
				* @param range The range of text to be deleted.
				*/
				function del(range) {
					return {
						range,
						newText: ""
					};
				}
				TextEdit.del = del;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
				}
				TextEdit.is = is;
			})(TextEdit || (TextEdit = {}));
			(function(ChangeAnnotation) {
				function create(label, needsConfirmation, description) {
					const result = { label };
					if (needsConfirmation !== void 0) result.needsConfirmation = needsConfirmation;
					if (description !== void 0) result.description = description;
					return result;
				}
				ChangeAnnotation.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
				}
				ChangeAnnotation.is = is;
			})(ChangeAnnotation || (ChangeAnnotation = {}));
			(function(ChangeAnnotationIdentifier) {
				function is(value) {
					const candidate = value;
					return Is.string(candidate);
				}
				ChangeAnnotationIdentifier.is = is;
			})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
			(function(AnnotatedTextEdit) {
				/**
				* Creates an annotated replace text edit.
				*
				* @param range The range of text to be replaced.
				* @param newText The new text.
				* @param annotation The annotation.
				*/
				function replace(range, newText, annotation) {
					return {
						range,
						newText,
						annotationId: annotation
					};
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
					return {
						range: {
							start: position,
							end: position
						},
						newText,
						annotationId: annotation
					};
				}
				AnnotatedTextEdit.insert = insert;
				/**
				* Creates an annotated delete text edit.
				*
				* @param range The range of text to be deleted.
				* @param annotation The annotation.
				*/
				function del(range, annotation) {
					return {
						range,
						newText: "",
						annotationId: annotation
					};
				}
				AnnotatedTextEdit.del = del;
				function is(value) {
					const candidate = value;
					return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
				}
				AnnotatedTextEdit.is = is;
			})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
			(function(TextDocumentEdit) {
				/**
				* Creates a new `TextDocumentEdit`
				*/
				function create(textDocument, edits) {
					return {
						textDocument,
						edits
					};
				}
				TextDocumentEdit.create = create;
				function is(value) {
					let candidate = value;
					return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
				}
				TextDocumentEdit.is = is;
			})(TextDocumentEdit || (TextDocumentEdit = {}));
			(function(CreateFile) {
				function create(uri, options, annotation) {
					let result = {
						kind: "create",
						uri
					};
					if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
					if (annotation !== void 0) result.annotationId = annotation;
					return result;
				}
				CreateFile.create = create;
				function is(value) {
					let candidate = value;
					return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
				}
				CreateFile.is = is;
			})(CreateFile || (CreateFile = {}));
			(function(RenameFile) {
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
				RenameFile.create = create;
				function is(value) {
					let candidate = value;
					return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
				}
				RenameFile.is = is;
			})(RenameFile || (RenameFile = {}));
			(function(DeleteFile) {
				function create(uri, options, annotation) {
					let result = {
						kind: "delete",
						uri
					};
					if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) result.options = options;
					if (annotation !== void 0) result.annotationId = annotation;
					return result;
				}
				DeleteFile.create = create;
				function is(value) {
					let candidate = value;
					return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
				}
				DeleteFile.is = is;
			})(DeleteFile || (DeleteFile = {}));
			(function(WorkspaceEdit) {
				function is(value) {
					let candidate = value;
					return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
						if (Is.string(change.kind)) return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
						else return TextDocumentEdit.is(change);
					}));
				}
				WorkspaceEdit.is = is;
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
				/**
				* Returns the underlying {@link WorkspaceEdit} literal
				* use to be returned from a workspace edit operation like rename.
				*/
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
			(function(TextDocumentIdentifier) {
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
			(function(VersionedTextDocumentIdentifier) {
				/**
				* Creates a new VersionedTextDocumentIdentifier literal.
				* @param uri The document's uri.
				* @param version The document's version.
				*/
				function create(uri, version) {
					return {
						uri,
						version
					};
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
			(function(OptionalVersionedTextDocumentIdentifier) {
				/**
				* Creates a new OptionalVersionedTextDocumentIdentifier literal.
				* @param uri The document's uri.
				* @param version The document's version.
				*/
				function create(uri, version) {
					return {
						uri,
						version
					};
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
			(function(TextDocumentItem) {
				/**
				* Creates a new TextDocumentItem literal.
				* @param uri The document's uri.
				* @param languageId The document's language identifier.
				* @param version The document's version number.
				* @param text The document's text.
				*/
				function create(uri, languageId, version, text) {
					return {
						uri,
						languageId,
						version,
						text
					};
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
			(function(MarkupKind) {
				/**
				* Plain text is supported as a content format
				*/
				MarkupKind.PlainText = "plaintext";
				/**
				* Markdown is supported as a content format
				*/
				MarkupKind.Markdown = "markdown";
				/**
				* Checks whether the given value is a value of the {@link MarkupKind} type.
				*/
				function is(value) {
					const candidate = value;
					return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
				}
				MarkupKind.is = is;
			})(MarkupKind || (MarkupKind = {}));
			(function(MarkupContent) {
				/**
				* Checks whether the given value conforms to the {@link MarkupContent} interface.
				*/
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
				}
				MarkupContent.is = is;
			})(MarkupContent$1 || (MarkupContent$1 = {}));
			(function(CompletionItemKind) {
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
			})(CompletionItemKind$2 || (CompletionItemKind$2 = {}));
			(function(InsertTextFormat) {
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
			})(InsertTextFormat$1 || (InsertTextFormat$1 = {}));
			(function(CompletionItemTag) {
				/**
				* Render a completion as obsolete, usually using a strike-out.
				*/
				CompletionItemTag.Deprecated = 1;
			})(CompletionItemTag || (CompletionItemTag = {}));
			(function(InsertReplaceEdit) {
				/**
				* Creates a new insert / replace edit
				*/
				function create(newText, insert, replace) {
					return {
						newText,
						insert,
						replace
					};
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
			(function(InsertTextMode) {
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
			(function(CompletionItemLabelDetails) {
				function is(value) {
					const candidate = value;
					return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
				}
				CompletionItemLabelDetails.is = is;
			})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
			(function(CompletionItem) {
				/**
				* Create a completion item and seed it with a label.
				* @param label The completion item's label
				*/
				function create(label) {
					return { label };
				}
				CompletionItem.create = create;
			})(CompletionItem || (CompletionItem = {}));
			(function(CompletionList) {
				/**
				* Creates a new completion list.
				*
				* @param items The completion items.
				* @param isIncomplete The list is not complete.
				*/
				function create(items, isIncomplete) {
					return {
						items: items ? items : [],
						isIncomplete: !!isIncomplete
					};
				}
				CompletionList.create = create;
			})(CompletionList || (CompletionList = {}));
			(function(MarkedString) {
				/**
				* Creates a marked string from plain text.
				*
				* @param plainText The plain text.
				*/
				function fromPlainText(plainText) {
					return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
				}
				MarkedString.fromPlainText = fromPlainText;
				/**
				* Checks whether the given value conforms to the {@link MarkedString} type.
				*/
				function is(value) {
					const candidate = value;
					return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
				}
				MarkedString.is = is;
			})(MarkedString$1 || (MarkedString$1 = {}));
			(function(Hover) {
				/**
				* Checks whether the given value conforms to the {@link Hover} interface.
				*/
				function is(value) {
					let candidate = value;
					return !!candidate && Is.objectLiteral(candidate) && (MarkupContent$1.is(candidate.contents) || MarkedString$1.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString$1.is)) && (value.range === void 0 || Range.is(value.range));
				}
				Hover.is = is;
			})(Hover || (Hover = {}));
			(function(ParameterInformation) {
				/**
				* Creates a new parameter information literal.
				*
				* @param label A label string.
				* @param documentation A doc string.
				*/
				function create(label, documentation) {
					return documentation ? {
						label,
						documentation
					} : { label };
				}
				ParameterInformation.create = create;
			})(ParameterInformation || (ParameterInformation = {}));
			(function(SignatureInformation) {
				function create(label, documentation, ...parameters) {
					let result = { label };
					if (Is.defined(documentation)) result.documentation = documentation;
					if (Is.defined(parameters)) result.parameters = parameters;
					else result.parameters = [];
					return result;
				}
				SignatureInformation.create = create;
			})(SignatureInformation || (SignatureInformation = {}));
			(function(DocumentHighlightKind) {
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
			(function(DocumentHighlight) {
				/**
				* Create a DocumentHighlight object.
				* @param range The range the highlight applies to.
				* @param kind The highlight kind
				*/
				function create(range, kind) {
					let result = { range };
					if (Is.number(kind)) result.kind = kind;
					return result;
				}
				DocumentHighlight.create = create;
			})(DocumentHighlight || (DocumentHighlight = {}));
			(function(SymbolKind) {
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
			(function(SymbolTag) {
				/**
				* Render a symbol as obsolete, usually using a strike-out.
				*/
				SymbolTag.Deprecated = 1;
			})(SymbolTag || (SymbolTag = {}));
			(function(SymbolInformation) {
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
						location: {
							uri,
							range
						}
					};
					if (containerName) result.containerName = containerName;
					return result;
				}
				SymbolInformation.create = create;
			})(SymbolInformation || (SymbolInformation = {}));
			(function(WorkspaceSymbol) {
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
				WorkspaceSymbol.create = create;
			})(WorkspaceSymbol || (WorkspaceSymbol = {}));
			(function(DocumentSymbol) {
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
					if (children !== void 0) result.children = children;
					return result;
				}
				DocumentSymbol.create = create;
				/**
				* Checks whether the given literal conforms to the {@link DocumentSymbol} interface.
				*/
				function is(value) {
					let candidate = value;
					return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
				}
				DocumentSymbol.is = is;
			})(DocumentSymbol || (DocumentSymbol = {}));
			(function(CodeActionKind) {
				/**
				* Empty kind.
				*/
				CodeActionKind.Empty = "";
				/**
				* Base kind for quickfix actions: 'quickfix'
				*/
				CodeActionKind.QuickFix = "quickfix";
				/**
				* Base kind for refactoring actions: 'refactor'
				*/
				CodeActionKind.Refactor = "refactor";
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
				CodeActionKind.RefactorExtract = "refactor.extract";
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
				CodeActionKind.RefactorInline = "refactor.inline";
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
				CodeActionKind.RefactorRewrite = "refactor.rewrite";
				/**
				* Base kind for source actions: `source`
				*
				* Source code actions apply to the entire file.
				*/
				CodeActionKind.Source = "source";
				/**
				* Base kind for an organize imports source action: `source.organizeImports`
				*/
				CodeActionKind.SourceOrganizeImports = "source.organizeImports";
				/**
				* Base kind for auto-fix source actions: `source.fixAll`.
				*
				* Fix all actions automatically fix errors that have a clear fix that do not require user input.
				* They should not suppress errors or perform unsafe fixes such as generating new types or classes.
				*
				* @since 3.15.0
				*/
				CodeActionKind.SourceFixAll = "source.fixAll";
			})(CodeActionKind || (CodeActionKind = {}));
			(function(CodeActionTriggerKind) {
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
			(function(CodeActionContext) {
				/**
				* Creates a new CodeActionContext literal.
				*/
				function create(diagnostics, only, triggerKind) {
					let result = { diagnostics };
					if (only !== void 0 && only !== null) result.only = only;
					if (triggerKind !== void 0 && triggerKind !== null) result.triggerKind = triggerKind;
					return result;
				}
				CodeActionContext.create = create;
				/**
				* Checks whether the given literal conforms to the {@link CodeActionContext} interface.
				*/
				function is(value) {
					let candidate = value;
					return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
				}
				CodeActionContext.is = is;
			})(CodeActionContext || (CodeActionContext = {}));
			(function(CodeAction) {
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
				CodeAction.create = create;
				function is(value) {
					let candidate = value;
					return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
				}
				CodeAction.is = is;
			})(CodeAction || (CodeAction = {}));
			(function(CodeLens) {
				/**
				* Creates a new CodeLens literal.
				*/
				function create(range, data) {
					let result = { range };
					if (Is.defined(data)) result.data = data;
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
			(function(FormattingOptions) {
				/**
				* Creates a new FormattingOptions literal.
				*/
				function create(tabSize, insertSpaces) {
					return {
						tabSize,
						insertSpaces
					};
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
			(function(DocumentLink) {
				/**
				* Creates a new DocumentLink literal.
				*/
				function create(range, target, data) {
					return {
						range,
						target,
						data
					};
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
			(function(SelectionRange) {
				/**
				* Creates a new SelectionRange
				* @param range the range.
				* @param parent an optional parent.
				*/
				function create(range, parent) {
					return {
						range,
						parent
					};
				}
				SelectionRange.create = create;
				function is(value) {
					let candidate = value;
					return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange.is(candidate.parent));
				}
				SelectionRange.is = is;
			})(SelectionRange || (SelectionRange = {}));
			(function(SemanticTokenTypes) {
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
			(function(SemanticTokenModifiers) {
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
			(function(SemanticTokens) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
				}
				SemanticTokens.is = is;
			})(SemanticTokens || (SemanticTokens = {}));
			(function(InlineValueText) {
				/**
				* Creates a new InlineValueText literal.
				*/
				function create(range, text) {
					return {
						range,
						text
					};
				}
				InlineValueText.create = create;
				function is(value) {
					const candidate = value;
					return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
				}
				InlineValueText.is = is;
			})(InlineValueText || (InlineValueText = {}));
			(function(InlineValueVariableLookup) {
				/**
				* Creates a new InlineValueText literal.
				*/
				function create(range, variableName, caseSensitiveLookup) {
					return {
						range,
						variableName,
						caseSensitiveLookup
					};
				}
				InlineValueVariableLookup.create = create;
				function is(value) {
					const candidate = value;
					return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
				}
				InlineValueVariableLookup.is = is;
			})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
			(function(InlineValueEvaluatableExpression) {
				/**
				* Creates a new InlineValueEvaluatableExpression literal.
				*/
				function create(range, expression) {
					return {
						range,
						expression
					};
				}
				InlineValueEvaluatableExpression.create = create;
				function is(value) {
					const candidate = value;
					return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
				}
				InlineValueEvaluatableExpression.is = is;
			})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
			(function(InlineValueContext) {
				/**
				* Creates a new InlineValueContext literal.
				*/
				function create(frameId, stoppedLocation) {
					return {
						frameId,
						stoppedLocation
					};
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
			(function(InlayHintKind) {
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
			(function(InlayHintLabelPart) {
				function create(value) {
					return { value };
				}
				InlayHintLabelPart.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent$1.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
				}
				InlayHintLabelPart.is = is;
			})(InlayHintLabelPart || (InlayHintLabelPart = {}));
			(function(InlayHint) {
				function create(position, label, kind) {
					const result = {
						position,
						label
					};
					if (kind !== void 0) result.kind = kind;
					return result;
				}
				InlayHint.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent$1.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
				}
				InlayHint.is = is;
			})(InlayHint || (InlayHint = {}));
			(function(StringValue) {
				function createSnippet(value) {
					return {
						kind: "snippet",
						value
					};
				}
				StringValue.createSnippet = createSnippet;
			})(StringValue || (StringValue = {}));
			(function(InlineCompletionItem) {
				function create(insertText, filterText, range, command) {
					return {
						insertText,
						filterText,
						range,
						command
					};
				}
				InlineCompletionItem.create = create;
			})(InlineCompletionItem || (InlineCompletionItem = {}));
			(function(InlineCompletionList) {
				function create(items) {
					return { items };
				}
				InlineCompletionList.create = create;
			})(InlineCompletionList || (InlineCompletionList = {}));
			(function(InlineCompletionTriggerKind) {
				/**
				* Completion was triggered explicitly by a user gesture.
				*/
				InlineCompletionTriggerKind.Invoked = 0;
				/**
				* Completion was triggered automatically while editing.
				*/
				InlineCompletionTriggerKind.Automatic = 1;
			})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
			(function(SelectedCompletionInfo) {
				function create(range, text) {
					return {
						range,
						text
					};
				}
				SelectedCompletionInfo.create = create;
			})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
			(function(InlineCompletionContext) {
				function create(triggerKind, selectedCompletionInfo) {
					return {
						triggerKind,
						selectedCompletionInfo
					};
				}
				InlineCompletionContext.create = create;
			})(InlineCompletionContext || (InlineCompletionContext = {}));
			(function(WorkspaceFolder) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
				}
				WorkspaceFolder.is = is;
			})(WorkspaceFolder || (WorkspaceFolder = {}));
			EOL = [
				"\n",
				"\r\n",
				"\r"
			];
			(function(TextDocument) {
				/**
				* Creates a new ITextDocument literal from the given uri and content.
				* @param uri The document's uri.
				* @param languageId The document's language Id.
				* @param version The document's version.
				* @param content The document's content.
				*/
				function create(uri, languageId, version, content) {
					return new FullTextDocument$1(uri, languageId, version, content);
				}
				TextDocument.create = create;
				/**
				* Checks whether the given literal conforms to the {@link ITextDocument} interface.
				*/
				function is(value) {
					let candidate = value;
					return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
				}
				TextDocument.is = is;
				function applyEdits(document, edits) {
					let text = document.getText();
					let sortedEdits = mergeSort(edits, (a, b) => {
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
				TextDocument.applyEdits = applyEdits;
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
			(function(Is) {
				const toString = Object.prototype.toString;
				function defined(value) {
					return typeof value !== "undefined";
				}
				Is.defined = defined;
				function undefined(value) {
					return typeof value === "undefined";
				}
				Is.undefined = undefined;
				function boolean(value) {
					return value === true || value === false;
				}
				Is.boolean = boolean;
				function string(value) {
					return toString.call(value) === "[object String]";
				}
				Is.string = string;
				function number(value) {
					return toString.call(value) === "[object Number]";
				}
				Is.number = number;
				function numberRange(value, min, max) {
					return toString.call(value) === "[object Number]" && min <= value && value <= max;
				}
				Is.numberRange = numberRange;
				function integer(value) {
					return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
				}
				Is.integer = integer;
				function uinteger(value) {
					return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
				}
				Is.uinteger = uinteger;
				function func(value) {
					return toString.call(value) === "[object Function]";
				}
				Is.func = func;
				function objectLiteral(value) {
					return value !== null && typeof value === "object";
				}
				Is.objectLiteral = objectLiteral;
				function typedArray(value, check) {
					return Array.isArray(value) && value.every(check);
				}
				Is.typedArray = typedArray;
			})(Is || (Is = {}));
		}));
		var require_messages = /* @__PURE__ */ __commonJSMin(((exports$19) => {
			Object.defineProperty(exports$19, "__esModule", { value: true });
			exports$19.ProtocolNotificationType = exports$19.ProtocolNotificationType0 = exports$19.ProtocolRequestType = exports$19.ProtocolRequestType0 = exports$19.RegistrationType = exports$19.MessageDirection = void 0;
			var vscode_jsonrpc_1 = require_main$1();
			var MessageDirection;
			(function(MessageDirection) {
				MessageDirection["clientToServer"] = "clientToServer";
				MessageDirection["serverToClient"] = "serverToClient";
				MessageDirection["both"] = "both";
			})(MessageDirection || (exports$19.MessageDirection = MessageDirection = {}));
			var RegistrationType = class {
				constructor(method) {
					this.method = method;
				}
			};
			exports$19.RegistrationType = RegistrationType;
			var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
				constructor(method) {
					super(method);
				}
			};
			exports$19.ProtocolRequestType0 = ProtocolRequestType0;
			var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
				constructor(method) {
					super(method, vscode_jsonrpc_1.ParameterStructures.byName);
				}
			};
			exports$19.ProtocolRequestType = ProtocolRequestType;
			var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
				constructor(method) {
					super(method);
				}
			};
			exports$19.ProtocolNotificationType0 = ProtocolNotificationType0;
			var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
				constructor(method) {
					super(method, vscode_jsonrpc_1.ParameterStructures.byName);
				}
			};
			exports$19.ProtocolNotificationType = ProtocolNotificationType;
		}));
		var require_is = /* @__PURE__ */ __commonJSMin(((exports$20) => {
			Object.defineProperty(exports$20, "__esModule", { value: true });
			exports$20.objectLiteral = exports$20.typedArray = exports$20.stringArray = exports$20.array = exports$20.func = exports$20.error = exports$20.number = exports$20.string = exports$20.boolean = void 0;
			function boolean(value) {
				return value === true || value === false;
			}
			exports$20.boolean = boolean;
			function string(value) {
				return typeof value === "string" || value instanceof String;
			}
			exports$20.string = string;
			function number(value) {
				return typeof value === "number" || value instanceof Number;
			}
			exports$20.number = number;
			function error(value) {
				return value instanceof Error;
			}
			exports$20.error = error;
			function func(value) {
				return typeof value === "function";
			}
			exports$20.func = func;
			function array(value) {
				return Array.isArray(value);
			}
			exports$20.array = array;
			function stringArray(value) {
				return array(value) && value.every((elem) => string(elem));
			}
			exports$20.stringArray = stringArray;
			function typedArray(value, check) {
				return Array.isArray(value) && value.every(check);
			}
			exports$20.typedArray = typedArray;
			function objectLiteral(value) {
				return value !== null && typeof value === "object";
			}
			exports$20.objectLiteral = objectLiteral;
		}));
		var require_protocol_implementation = /* @__PURE__ */ __commonJSMin(((exports$21) => {
			Object.defineProperty(exports$21, "__esModule", { value: true });
			exports$21.ImplementationRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to resolve the implementation locations of a symbol at a given text
			* document position. The request's parameter is of type {@link TextDocumentPositionParams}
			* the response is of type {@link Definition} or a Thenable that resolves to such.
			*/
			var ImplementationRequest;
			(function(ImplementationRequest) {
				ImplementationRequest.method = "textDocument/implementation";
				ImplementationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				ImplementationRequest.type = new messages_1.ProtocolRequestType(ImplementationRequest.method);
			})(ImplementationRequest || (exports$21.ImplementationRequest = ImplementationRequest = {}));
		}));
		var require_protocol_typeDefinition = /* @__PURE__ */ __commonJSMin(((exports$22) => {
			Object.defineProperty(exports$22, "__esModule", { value: true });
			exports$22.TypeDefinitionRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to resolve the type definition locations of a symbol at a given text
			* document position. The request's parameter is of type {@link TextDocumentPositionParams}
			* the response is of type {@link Definition} or a Thenable that resolves to such.
			*/
			var TypeDefinitionRequest;
			(function(TypeDefinitionRequest) {
				TypeDefinitionRequest.method = "textDocument/typeDefinition";
				TypeDefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				TypeDefinitionRequest.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest.method);
			})(TypeDefinitionRequest || (exports$22.TypeDefinitionRequest = TypeDefinitionRequest = {}));
		}));
		var require_protocol_workspaceFolder = /* @__PURE__ */ __commonJSMin(((exports$23) => {
			Object.defineProperty(exports$23, "__esModule", { value: true });
			exports$23.DidChangeWorkspaceFoldersNotification = exports$23.WorkspaceFoldersRequest = void 0;
			var messages_1 = require_messages();
			/**
			* The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
			*/
			var WorkspaceFoldersRequest;
			(function(WorkspaceFoldersRequest) {
				WorkspaceFoldersRequest.method = "workspace/workspaceFolders";
				WorkspaceFoldersRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				WorkspaceFoldersRequest.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest.method);
			})(WorkspaceFoldersRequest || (exports$23.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
			/**
			* The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
			* folder configuration changes.
			*/
			var DidChangeWorkspaceFoldersNotification;
			(function(DidChangeWorkspaceFoldersNotification) {
				DidChangeWorkspaceFoldersNotification.method = "workspace/didChangeWorkspaceFolders";
				DidChangeWorkspaceFoldersNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidChangeWorkspaceFoldersNotification.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification.method);
			})(DidChangeWorkspaceFoldersNotification || (exports$23.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
		}));
		var require_protocol_configuration = /* @__PURE__ */ __commonJSMin(((exports$24) => {
			Object.defineProperty(exports$24, "__esModule", { value: true });
			exports$24.ConfigurationRequest = void 0;
			var messages_1 = require_messages();
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
			(function(ConfigurationRequest) {
				ConfigurationRequest.method = "workspace/configuration";
				ConfigurationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				ConfigurationRequest.type = new messages_1.ProtocolRequestType(ConfigurationRequest.method);
			})(ConfigurationRequest || (exports$24.ConfigurationRequest = ConfigurationRequest = {}));
		}));
		var require_protocol_colorProvider = /* @__PURE__ */ __commonJSMin(((exports$25) => {
			Object.defineProperty(exports$25, "__esModule", { value: true });
			exports$25.ColorPresentationRequest = exports$25.DocumentColorRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to list all color symbols found in a given text document. The request's
			* parameter is of type {@link DocumentColorParams} the
			* response is of type {@link ColorInformation ColorInformation[]} or a Thenable
			* that resolves to such.
			*/
			var DocumentColorRequest;
			(function(DocumentColorRequest) {
				DocumentColorRequest.method = "textDocument/documentColor";
				DocumentColorRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentColorRequest.type = new messages_1.ProtocolRequestType(DocumentColorRequest.method);
			})(DocumentColorRequest || (exports$25.DocumentColorRequest = DocumentColorRequest = {}));
			/**
			* A request to list all presentation for a color. The request's
			* parameter is of type {@link ColorPresentationParams} the
			* response is of type {@link ColorInformation ColorInformation[]} or a Thenable
			* that resolves to such.
			*/
			var ColorPresentationRequest;
			(function(ColorPresentationRequest) {
				ColorPresentationRequest.method = "textDocument/colorPresentation";
				ColorPresentationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				ColorPresentationRequest.type = new messages_1.ProtocolRequestType(ColorPresentationRequest.method);
			})(ColorPresentationRequest || (exports$25.ColorPresentationRequest = ColorPresentationRequest = {}));
		}));
		var require_protocol_foldingRange = /* @__PURE__ */ __commonJSMin(((exports$26) => {
			Object.defineProperty(exports$26, "__esModule", { value: true });
			exports$26.FoldingRangeRefreshRequest = exports$26.FoldingRangeRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide folding ranges in a document. The request's
			* parameter is of type {@link FoldingRangeParams}, the
			* response is of type {@link FoldingRangeList} or a Thenable
			* that resolves to such.
			*/
			var FoldingRangeRequest;
			(function(FoldingRangeRequest) {
				FoldingRangeRequest.method = "textDocument/foldingRange";
				FoldingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				FoldingRangeRequest.type = new messages_1.ProtocolRequestType(FoldingRangeRequest.method);
			})(FoldingRangeRequest || (exports$26.FoldingRangeRequest = FoldingRangeRequest = {}));
			/**
			* @since 3.18.0
			* @proposed
			*/
			var FoldingRangeRefreshRequest;
			(function(FoldingRangeRefreshRequest) {
				FoldingRangeRefreshRequest.method = `workspace/foldingRange/refresh`;
				FoldingRangeRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				FoldingRangeRefreshRequest.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest.method);
			})(FoldingRangeRefreshRequest || (exports$26.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
		}));
		var require_protocol_declaration = /* @__PURE__ */ __commonJSMin(((exports$27) => {
			Object.defineProperty(exports$27, "__esModule", { value: true });
			exports$27.DeclarationRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to resolve the type definition locations of a symbol at a given text
			* document position. The request's parameter is of type {@link TextDocumentPositionParams}
			* the response is of type {@link Declaration} or a typed array of {@link DeclarationLink}
			* or a Thenable that resolves to such.
			*/
			var DeclarationRequest;
			(function(DeclarationRequest) {
				DeclarationRequest.method = "textDocument/declaration";
				DeclarationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DeclarationRequest.type = new messages_1.ProtocolRequestType(DeclarationRequest.method);
			})(DeclarationRequest || (exports$27.DeclarationRequest = DeclarationRequest = {}));
		}));
		var require_protocol_selectionRange = /* @__PURE__ */ __commonJSMin(((exports$28) => {
			Object.defineProperty(exports$28, "__esModule", { value: true });
			exports$28.SelectionRangeRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide selection ranges in a document. The request's
			* parameter is of type {@link SelectionRangeParams}, the
			* response is of type {@link SelectionRange SelectionRange[]} or a Thenable
			* that resolves to such.
			*/
			var SelectionRangeRequest;
			(function(SelectionRangeRequest) {
				SelectionRangeRequest.method = "textDocument/selectionRange";
				SelectionRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				SelectionRangeRequest.type = new messages_1.ProtocolRequestType(SelectionRangeRequest.method);
			})(SelectionRangeRequest || (exports$28.SelectionRangeRequest = SelectionRangeRequest = {}));
		}));
		var require_protocol_progress = /* @__PURE__ */ __commonJSMin(((exports$29) => {
			Object.defineProperty(exports$29, "__esModule", { value: true });
			exports$29.WorkDoneProgressCancelNotification = exports$29.WorkDoneProgressCreateRequest = exports$29.WorkDoneProgress = void 0;
			var vscode_jsonrpc_1 = require_main$1();
			var messages_1 = require_messages();
			var WorkDoneProgress;
			(function(WorkDoneProgress) {
				WorkDoneProgress.type = new vscode_jsonrpc_1.ProgressType();
				function is(value) {
					return value === WorkDoneProgress.type;
				}
				WorkDoneProgress.is = is;
			})(WorkDoneProgress || (exports$29.WorkDoneProgress = WorkDoneProgress = {}));
			/**
			* The `window/workDoneProgress/create` request is sent from the server to the client to initiate progress
			* reporting from the server.
			*/
			var WorkDoneProgressCreateRequest;
			(function(WorkDoneProgressCreateRequest) {
				WorkDoneProgressCreateRequest.method = "window/workDoneProgress/create";
				WorkDoneProgressCreateRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				WorkDoneProgressCreateRequest.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest.method);
			})(WorkDoneProgressCreateRequest || (exports$29.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
			/**
			* The `window/workDoneProgress/cancel` notification is sent from  the client to the server to cancel a progress
			* initiated on the server side.
			*/
			var WorkDoneProgressCancelNotification;
			(function(WorkDoneProgressCancelNotification) {
				WorkDoneProgressCancelNotification.method = "window/workDoneProgress/cancel";
				WorkDoneProgressCancelNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				WorkDoneProgressCancelNotification.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification.method);
			})(WorkDoneProgressCancelNotification || (exports$29.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
		}));
		var require_protocol_callHierarchy = /* @__PURE__ */ __commonJSMin(((exports$30) => {
			Object.defineProperty(exports$30, "__esModule", { value: true });
			exports$30.CallHierarchyOutgoingCallsRequest = exports$30.CallHierarchyIncomingCallsRequest = exports$30.CallHierarchyPrepareRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to result a `CallHierarchyItem` in a document at a given position.
			* Can be used as an input to an incoming or outgoing call hierarchy.
			*
			* @since 3.16.0
			*/
			var CallHierarchyPrepareRequest;
			(function(CallHierarchyPrepareRequest) {
				CallHierarchyPrepareRequest.method = "textDocument/prepareCallHierarchy";
				CallHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CallHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest.method);
			})(CallHierarchyPrepareRequest || (exports$30.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
			/**
			* A request to resolve the incoming calls for a given `CallHierarchyItem`.
			*
			* @since 3.16.0
			*/
			var CallHierarchyIncomingCallsRequest;
			(function(CallHierarchyIncomingCallsRequest) {
				CallHierarchyIncomingCallsRequest.method = "callHierarchy/incomingCalls";
				CallHierarchyIncomingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CallHierarchyIncomingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest.method);
			})(CallHierarchyIncomingCallsRequest || (exports$30.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
			/**
			* A request to resolve the outgoing calls for a given `CallHierarchyItem`.
			*
			* @since 3.16.0
			*/
			var CallHierarchyOutgoingCallsRequest;
			(function(CallHierarchyOutgoingCallsRequest) {
				CallHierarchyOutgoingCallsRequest.method = "callHierarchy/outgoingCalls";
				CallHierarchyOutgoingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CallHierarchyOutgoingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest.method);
			})(CallHierarchyOutgoingCallsRequest || (exports$30.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
		}));
		var require_protocol_semanticTokens = /* @__PURE__ */ __commonJSMin(((exports$31) => {
			Object.defineProperty(exports$31, "__esModule", { value: true });
			exports$31.SemanticTokensRefreshRequest = exports$31.SemanticTokensRangeRequest = exports$31.SemanticTokensDeltaRequest = exports$31.SemanticTokensRequest = exports$31.SemanticTokensRegistrationType = exports$31.TokenFormat = void 0;
			var messages_1 = require_messages();
			var TokenFormat;
			(function(TokenFormat) {
				TokenFormat.Relative = "relative";
			})(TokenFormat || (exports$31.TokenFormat = TokenFormat = {}));
			var SemanticTokensRegistrationType;
			(function(SemanticTokensRegistrationType) {
				SemanticTokensRegistrationType.method = "textDocument/semanticTokens";
				SemanticTokensRegistrationType.type = new messages_1.RegistrationType(SemanticTokensRegistrationType.method);
			})(SemanticTokensRegistrationType || (exports$31.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
			/**
			* @since 3.16.0
			*/
			var SemanticTokensRequest;
			(function(SemanticTokensRequest) {
				SemanticTokensRequest.method = "textDocument/semanticTokens/full";
				SemanticTokensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
				SemanticTokensRequest.registrationMethod = SemanticTokensRegistrationType.method;
			})(SemanticTokensRequest || (exports$31.SemanticTokensRequest = SemanticTokensRequest = {}));
			/**
			* @since 3.16.0
			*/
			var SemanticTokensDeltaRequest;
			(function(SemanticTokensDeltaRequest) {
				SemanticTokensDeltaRequest.method = "textDocument/semanticTokens/full/delta";
				SemanticTokensDeltaRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				SemanticTokensDeltaRequest.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest.method);
				SemanticTokensDeltaRequest.registrationMethod = SemanticTokensRegistrationType.method;
			})(SemanticTokensDeltaRequest || (exports$31.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
			/**
			* @since 3.16.0
			*/
			var SemanticTokensRangeRequest;
			(function(SemanticTokensRangeRequest) {
				SemanticTokensRangeRequest.method = "textDocument/semanticTokens/range";
				SemanticTokensRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
				SemanticTokensRangeRequest.registrationMethod = SemanticTokensRegistrationType.method;
			})(SemanticTokensRangeRequest || (exports$31.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
			/**
			* @since 3.16.0
			*/
			var SemanticTokensRefreshRequest;
			(function(SemanticTokensRefreshRequest) {
				SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
				SemanticTokensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				SemanticTokensRefreshRequest.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
			})(SemanticTokensRefreshRequest || (exports$31.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
		}));
		var require_protocol_showDocument = /* @__PURE__ */ __commonJSMin(((exports$32) => {
			Object.defineProperty(exports$32, "__esModule", { value: true });
			exports$32.ShowDocumentRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to show a document. This request might open an
			* external program depending on the value of the URI to open.
			* For example a request to open `https://code.visualstudio.com/`
			* will very likely open the URI in a WEB browser.
			*
			* @since 3.16.0
			*/
			var ShowDocumentRequest;
			(function(ShowDocumentRequest) {
				ShowDocumentRequest.method = "window/showDocument";
				ShowDocumentRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				ShowDocumentRequest.type = new messages_1.ProtocolRequestType(ShowDocumentRequest.method);
			})(ShowDocumentRequest || (exports$32.ShowDocumentRequest = ShowDocumentRequest = {}));
		}));
		var require_protocol_linkedEditingRange = /* @__PURE__ */ __commonJSMin(((exports$33) => {
			Object.defineProperty(exports$33, "__esModule", { value: true });
			exports$33.LinkedEditingRangeRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide ranges that can be edited together.
			*
			* @since 3.16.0
			*/
			var LinkedEditingRangeRequest;
			(function(LinkedEditingRangeRequest) {
				LinkedEditingRangeRequest.method = "textDocument/linkedEditingRange";
				LinkedEditingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				LinkedEditingRangeRequest.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest.method);
			})(LinkedEditingRangeRequest || (exports$33.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
		}));
		var require_protocol_fileOperations = /* @__PURE__ */ __commonJSMin(((exports$34) => {
			Object.defineProperty(exports$34, "__esModule", { value: true });
			exports$34.WillDeleteFilesRequest = exports$34.DidDeleteFilesNotification = exports$34.DidRenameFilesNotification = exports$34.WillRenameFilesRequest = exports$34.DidCreateFilesNotification = exports$34.WillCreateFilesRequest = exports$34.FileOperationPatternKind = void 0;
			var messages_1 = require_messages();
			/**
			* A pattern kind describing if a glob pattern matches a file a folder or
			* both.
			*
			* @since 3.16.0
			*/
			var FileOperationPatternKind;
			(function(FileOperationPatternKind) {
				/**
				* The pattern matches a file only.
				*/
				FileOperationPatternKind.file = "file";
				/**
				* The pattern matches a folder only.
				*/
				FileOperationPatternKind.folder = "folder";
			})(FileOperationPatternKind || (exports$34.FileOperationPatternKind = FileOperationPatternKind = {}));
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
			(function(WillCreateFilesRequest) {
				WillCreateFilesRequest.method = "workspace/willCreateFiles";
				WillCreateFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WillCreateFilesRequest.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest.method);
			})(WillCreateFilesRequest || (exports$34.WillCreateFilesRequest = WillCreateFilesRequest = {}));
			/**
			* The did create files notification is sent from the client to the server when
			* files were created from within the client.
			*
			* @since 3.16.0
			*/
			var DidCreateFilesNotification;
			(function(DidCreateFilesNotification) {
				DidCreateFilesNotification.method = "workspace/didCreateFiles";
				DidCreateFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidCreateFilesNotification.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification.method);
			})(DidCreateFilesNotification || (exports$34.DidCreateFilesNotification = DidCreateFilesNotification = {}));
			/**
			* The will rename files request is sent from the client to the server before files are actually
			* renamed as long as the rename is triggered from within the client.
			*
			* @since 3.16.0
			*/
			var WillRenameFilesRequest;
			(function(WillRenameFilesRequest) {
				WillRenameFilesRequest.method = "workspace/willRenameFiles";
				WillRenameFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WillRenameFilesRequest.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest.method);
			})(WillRenameFilesRequest || (exports$34.WillRenameFilesRequest = WillRenameFilesRequest = {}));
			/**
			* The did rename files notification is sent from the client to the server when
			* files were renamed from within the client.
			*
			* @since 3.16.0
			*/
			var DidRenameFilesNotification;
			(function(DidRenameFilesNotification) {
				DidRenameFilesNotification.method = "workspace/didRenameFiles";
				DidRenameFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidRenameFilesNotification.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification.method);
			})(DidRenameFilesNotification || (exports$34.DidRenameFilesNotification = DidRenameFilesNotification = {}));
			/**
			* The will delete files request is sent from the client to the server before files are actually
			* deleted as long as the deletion is triggered from within the client.
			*
			* @since 3.16.0
			*/
			var DidDeleteFilesNotification;
			(function(DidDeleteFilesNotification) {
				DidDeleteFilesNotification.method = "workspace/didDeleteFiles";
				DidDeleteFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidDeleteFilesNotification.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification.method);
			})(DidDeleteFilesNotification || (exports$34.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
			/**
			* The did delete files notification is sent from the client to the server when
			* files were deleted from within the client.
			*
			* @since 3.16.0
			*/
			var WillDeleteFilesRequest;
			(function(WillDeleteFilesRequest) {
				WillDeleteFilesRequest.method = "workspace/willDeleteFiles";
				WillDeleteFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WillDeleteFilesRequest.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest.method);
			})(WillDeleteFilesRequest || (exports$34.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
		}));
		var require_protocol_moniker = /* @__PURE__ */ __commonJSMin(((exports$35) => {
			Object.defineProperty(exports$35, "__esModule", { value: true });
			exports$35.MonikerRequest = exports$35.MonikerKind = exports$35.UniquenessLevel = void 0;
			var messages_1 = require_messages();
			/**
			* Moniker uniqueness level to define scope of the moniker.
			*
			* @since 3.16.0
			*/
			var UniquenessLevel;
			(function(UniquenessLevel) {
				/**
				* The moniker is only unique inside a document
				*/
				UniquenessLevel.document = "document";
				/**
				* The moniker is unique inside a project for which a dump got created
				*/
				UniquenessLevel.project = "project";
				/**
				* The moniker is unique inside the group to which a project belongs
				*/
				UniquenessLevel.group = "group";
				/**
				* The moniker is unique inside the moniker scheme.
				*/
				UniquenessLevel.scheme = "scheme";
				/**
				* The moniker is globally unique
				*/
				UniquenessLevel.global = "global";
			})(UniquenessLevel || (exports$35.UniquenessLevel = UniquenessLevel = {}));
			/**
			* The moniker kind.
			*
			* @since 3.16.0
			*/
			var MonikerKind;
			(function(MonikerKind) {
				/**
				* The moniker represent a symbol that is imported into a project
				*/
				MonikerKind.$import = "import";
				/**
				* The moniker represents a symbol that is exported from a project
				*/
				MonikerKind.$export = "export";
				/**
				* The moniker represents a symbol that is local to a project (e.g. a local
				* variable of a function, a class not visible outside the project, ...)
				*/
				MonikerKind.local = "local";
			})(MonikerKind || (exports$35.MonikerKind = MonikerKind = {}));
			/**
			* A request to get the moniker of a symbol at a given text document position.
			* The request parameter is of type {@link TextDocumentPositionParams}.
			* The response is of type {@link Moniker Moniker[]} or `null`.
			*/
			var MonikerRequest;
			(function(MonikerRequest) {
				MonikerRequest.method = "textDocument/moniker";
				MonikerRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				MonikerRequest.type = new messages_1.ProtocolRequestType(MonikerRequest.method);
			})(MonikerRequest || (exports$35.MonikerRequest = MonikerRequest = {}));
		}));
		var require_protocol_typeHierarchy = /* @__PURE__ */ __commonJSMin(((exports$36) => {
			Object.defineProperty(exports$36, "__esModule", { value: true });
			exports$36.TypeHierarchySubtypesRequest = exports$36.TypeHierarchySupertypesRequest = exports$36.TypeHierarchyPrepareRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to result a `TypeHierarchyItem` in a document at a given position.
			* Can be used as an input to a subtypes or supertypes type hierarchy.
			*
			* @since 3.17.0
			*/
			var TypeHierarchyPrepareRequest;
			(function(TypeHierarchyPrepareRequest) {
				TypeHierarchyPrepareRequest.method = "textDocument/prepareTypeHierarchy";
				TypeHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				TypeHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest.method);
			})(TypeHierarchyPrepareRequest || (exports$36.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
			/**
			* A request to resolve the supertypes for a given `TypeHierarchyItem`.
			*
			* @since 3.17.0
			*/
			var TypeHierarchySupertypesRequest;
			(function(TypeHierarchySupertypesRequest) {
				TypeHierarchySupertypesRequest.method = "typeHierarchy/supertypes";
				TypeHierarchySupertypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				TypeHierarchySupertypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest.method);
			})(TypeHierarchySupertypesRequest || (exports$36.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
			/**
			* A request to resolve the subtypes for a given `TypeHierarchyItem`.
			*
			* @since 3.17.0
			*/
			var TypeHierarchySubtypesRequest;
			(function(TypeHierarchySubtypesRequest) {
				TypeHierarchySubtypesRequest.method = "typeHierarchy/subtypes";
				TypeHierarchySubtypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				TypeHierarchySubtypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest.method);
			})(TypeHierarchySubtypesRequest || (exports$36.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
		}));
		var require_protocol_inlineValue = /* @__PURE__ */ __commonJSMin(((exports$37) => {
			Object.defineProperty(exports$37, "__esModule", { value: true });
			exports$37.InlineValueRefreshRequest = exports$37.InlineValueRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide inline values in a document. The request's parameter is of
			* type {@link InlineValueParams}, the response is of type
			* {@link InlineValue InlineValue[]} or a Thenable that resolves to such.
			*
			* @since 3.17.0
			*/
			var InlineValueRequest;
			(function(InlineValueRequest) {
				InlineValueRequest.method = "textDocument/inlineValue";
				InlineValueRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				InlineValueRequest.type = new messages_1.ProtocolRequestType(InlineValueRequest.method);
			})(InlineValueRequest || (exports$37.InlineValueRequest = InlineValueRequest = {}));
			/**
			* @since 3.17.0
			*/
			var InlineValueRefreshRequest;
			(function(InlineValueRefreshRequest) {
				InlineValueRefreshRequest.method = `workspace/inlineValue/refresh`;
				InlineValueRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				InlineValueRefreshRequest.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest.method);
			})(InlineValueRefreshRequest || (exports$37.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
		}));
		var require_protocol_inlayHint = /* @__PURE__ */ __commonJSMin(((exports$38) => {
			Object.defineProperty(exports$38, "__esModule", { value: true });
			exports$38.InlayHintRefreshRequest = exports$38.InlayHintResolveRequest = exports$38.InlayHintRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide inlay hints in a document. The request's parameter is of
			* type {@link InlayHintsParams}, the response is of type
			* {@link InlayHint InlayHint[]} or a Thenable that resolves to such.
			*
			* @since 3.17.0
			*/
			var InlayHintRequest;
			(function(InlayHintRequest) {
				InlayHintRequest.method = "textDocument/inlayHint";
				InlayHintRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				InlayHintRequest.type = new messages_1.ProtocolRequestType(InlayHintRequest.method);
			})(InlayHintRequest || (exports$38.InlayHintRequest = InlayHintRequest = {}));
			/**
			* A request to resolve additional properties for an inlay hint.
			* The request's parameter is of type {@link InlayHint}, the response is
			* of type {@link InlayHint} or a Thenable that resolves to such.
			*
			* @since 3.17.0
			*/
			var InlayHintResolveRequest;
			(function(InlayHintResolveRequest) {
				InlayHintResolveRequest.method = "inlayHint/resolve";
				InlayHintResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				InlayHintResolveRequest.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest.method);
			})(InlayHintResolveRequest || (exports$38.InlayHintResolveRequest = InlayHintResolveRequest = {}));
			/**
			* @since 3.17.0
			*/
			var InlayHintRefreshRequest;
			(function(InlayHintRefreshRequest) {
				InlayHintRefreshRequest.method = `workspace/inlayHint/refresh`;
				InlayHintRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				InlayHintRefreshRequest.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest.method);
			})(InlayHintRefreshRequest || (exports$38.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
		}));
		var require_protocol_diagnostic = /* @__PURE__ */ __commonJSMin(((exports$39) => {
			Object.defineProperty(exports$39, "__esModule", { value: true });
			exports$39.DiagnosticRefreshRequest = exports$39.WorkspaceDiagnosticRequest = exports$39.DocumentDiagnosticRequest = exports$39.DocumentDiagnosticReportKind = exports$39.DiagnosticServerCancellationData = void 0;
			var vscode_jsonrpc_1 = require_main$1();
			var Is = require_is();
			var messages_1 = require_messages();
			/**
			* @since 3.17.0
			*/
			var DiagnosticServerCancellationData;
			(function(DiagnosticServerCancellationData) {
				function is(value) {
					const candidate = value;
					return candidate && Is.boolean(candidate.retriggerRequest);
				}
				DiagnosticServerCancellationData.is = is;
			})(DiagnosticServerCancellationData || (exports$39.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
			/**
			* The document diagnostic report kinds.
			*
			* @since 3.17.0
			*/
			var DocumentDiagnosticReportKind;
			(function(DocumentDiagnosticReportKind) {
				/**
				* A diagnostic report with a full
				* set of problems.
				*/
				DocumentDiagnosticReportKind.Full = "full";
				/**
				* A report indicating that the last
				* returned report is still accurate.
				*/
				DocumentDiagnosticReportKind.Unchanged = "unchanged";
			})(DocumentDiagnosticReportKind || (exports$39.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
			/**
			* The document diagnostic request definition.
			*
			* @since 3.17.0
			*/
			var DocumentDiagnosticRequest;
			(function(DocumentDiagnosticRequest) {
				DocumentDiagnosticRequest.method = "textDocument/diagnostic";
				DocumentDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentDiagnosticRequest.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest.method);
				DocumentDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
			})(DocumentDiagnosticRequest || (exports$39.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
			/**
			* The workspace diagnostic request definition.
			*
			* @since 3.17.0
			*/
			var WorkspaceDiagnosticRequest;
			(function(WorkspaceDiagnosticRequest) {
				WorkspaceDiagnosticRequest.method = "workspace/diagnostic";
				WorkspaceDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WorkspaceDiagnosticRequest.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest.method);
				WorkspaceDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
			})(WorkspaceDiagnosticRequest || (exports$39.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
			/**
			* The diagnostic refresh request definition.
			*
			* @since 3.17.0
			*/
			var DiagnosticRefreshRequest;
			(function(DiagnosticRefreshRequest) {
				DiagnosticRefreshRequest.method = `workspace/diagnostic/refresh`;
				DiagnosticRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				DiagnosticRefreshRequest.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest.method);
			})(DiagnosticRefreshRequest || (exports$39.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
		}));
		var require_protocol_notebook = /* @__PURE__ */ __commonJSMin(((exports$40) => {
			Object.defineProperty(exports$40, "__esModule", { value: true });
			exports$40.DidCloseNotebookDocumentNotification = exports$40.DidSaveNotebookDocumentNotification = exports$40.DidChangeNotebookDocumentNotification = exports$40.NotebookCellArrayChange = exports$40.DidOpenNotebookDocumentNotification = exports$40.NotebookDocumentSyncRegistrationType = exports$40.NotebookDocument = exports$40.NotebookCell = exports$40.ExecutionSummary = exports$40.NotebookCellKind = void 0;
			var vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports));
			var Is = require_is();
			var messages_1 = require_messages();
			/**
			* A notebook cell kind.
			*
			* @since 3.17.0
			*/
			var NotebookCellKind;
			(function(NotebookCellKind) {
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
			})(NotebookCellKind || (exports$40.NotebookCellKind = NotebookCellKind = {}));
			var ExecutionSummary;
			(function(ExecutionSummary) {
				function create(executionOrder, success) {
					const result = { executionOrder };
					if (success === true || success === false) result.success = success;
					return result;
				}
				ExecutionSummary.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is.boolean(candidate.success));
				}
				ExecutionSummary.is = is;
				function equals(one, other) {
					if (one === other) return true;
					if (one === null || one === void 0 || other === null || other === void 0) return false;
					return one.executionOrder === other.executionOrder && one.success === other.success;
				}
				ExecutionSummary.equals = equals;
			})(ExecutionSummary || (exports$40.ExecutionSummary = ExecutionSummary = {}));
			var NotebookCell;
			(function(NotebookCell) {
				function create(kind, document) {
					return {
						kind,
						document
					};
				}
				NotebookCell.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is.objectLiteral(candidate.metadata));
				}
				NotebookCell.is = is;
				function diff(one, two) {
					const result = /* @__PURE__ */ new Set();
					if (one.document !== two.document) result.add("document");
					if (one.kind !== two.kind) result.add("kind");
					if (one.executionSummary !== two.executionSummary) result.add("executionSummary");
					if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) result.add("metadata");
					if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) result.add("executionSummary");
					return result;
				}
				NotebookCell.diff = diff;
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
					if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
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
			})(NotebookCell || (exports$40.NotebookCell = NotebookCell = {}));
			var NotebookDocument;
			(function(NotebookDocument) {
				function create(uri, notebookType, version, cells) {
					return {
						uri,
						notebookType,
						version,
						cells
					};
				}
				NotebookDocument.create = create;
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
				}
				NotebookDocument.is = is;
			})(NotebookDocument || (exports$40.NotebookDocument = NotebookDocument = {}));
			var NotebookDocumentSyncRegistrationType;
			(function(NotebookDocumentSyncRegistrationType) {
				NotebookDocumentSyncRegistrationType.method = "notebookDocument/sync";
				NotebookDocumentSyncRegistrationType.messageDirection = messages_1.MessageDirection.clientToServer;
				NotebookDocumentSyncRegistrationType.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType.method);
			})(NotebookDocumentSyncRegistrationType || (exports$40.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
			/**
			* A notification sent when a notebook opens.
			*
			* @since 3.17.0
			*/
			var DidOpenNotebookDocumentNotification;
			(function(DidOpenNotebookDocumentNotification) {
				DidOpenNotebookDocumentNotification.method = "notebookDocument/didOpen";
				DidOpenNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidOpenNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification.method);
				DidOpenNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
			})(DidOpenNotebookDocumentNotification || (exports$40.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
			var NotebookCellArrayChange;
			(function(NotebookCellArrayChange) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is.typedArray(candidate.cells, NotebookCell.is));
				}
				NotebookCellArrayChange.is = is;
				function create(start, deleteCount, cells) {
					const result = {
						start,
						deleteCount
					};
					if (cells !== void 0) result.cells = cells;
					return result;
				}
				NotebookCellArrayChange.create = create;
			})(NotebookCellArrayChange || (exports$40.NotebookCellArrayChange = NotebookCellArrayChange = {}));
			var DidChangeNotebookDocumentNotification;
			(function(DidChangeNotebookDocumentNotification) {
				DidChangeNotebookDocumentNotification.method = "notebookDocument/didChange";
				DidChangeNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidChangeNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification.method);
				DidChangeNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
			})(DidChangeNotebookDocumentNotification || (exports$40.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
			/**
			* A notification sent when a notebook document is saved.
			*
			* @since 3.17.0
			*/
			var DidSaveNotebookDocumentNotification;
			(function(DidSaveNotebookDocumentNotification) {
				DidSaveNotebookDocumentNotification.method = "notebookDocument/didSave";
				DidSaveNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidSaveNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification.method);
				DidSaveNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
			})(DidSaveNotebookDocumentNotification || (exports$40.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
			/**
			* A notification sent when a notebook closes.
			*
			* @since 3.17.0
			*/
			var DidCloseNotebookDocumentNotification;
			(function(DidCloseNotebookDocumentNotification) {
				DidCloseNotebookDocumentNotification.method = "notebookDocument/didClose";
				DidCloseNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidCloseNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification.method);
				DidCloseNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
			})(DidCloseNotebookDocumentNotification || (exports$40.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
		}));
		var require_protocol_inlineCompletion = /* @__PURE__ */ __commonJSMin(((exports$41) => {
			Object.defineProperty(exports$41, "__esModule", { value: true });
			exports$41.InlineCompletionRequest = void 0;
			var messages_1 = require_messages();
			/**
			* A request to provide inline completions in a document. The request's parameter is of
			* type {@link InlineCompletionParams}, the response is of type
			* {@link InlineCompletion InlineCompletion[]} or a Thenable that resolves to such.
			*
			* @since 3.18.0
			* @proposed
			*/
			var InlineCompletionRequest;
			(function(InlineCompletionRequest) {
				InlineCompletionRequest.method = "textDocument/inlineCompletion";
				InlineCompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				InlineCompletionRequest.type = new messages_1.ProtocolRequestType(InlineCompletionRequest.method);
			})(InlineCompletionRequest || (exports$41.InlineCompletionRequest = InlineCompletionRequest = {}));
		}));
		var require_protocol = /* @__PURE__ */ __commonJSMin(((exports$42) => {
			Object.defineProperty(exports$42, "__esModule", { value: true });
			exports$42.WorkspaceSymbolRequest = exports$42.CodeActionResolveRequest = exports$42.CodeActionRequest = exports$42.DocumentSymbolRequest = exports$42.DocumentHighlightRequest = exports$42.ReferencesRequest = exports$42.DefinitionRequest = exports$42.SignatureHelpRequest = exports$42.SignatureHelpTriggerKind = exports$42.HoverRequest = exports$42.CompletionResolveRequest = exports$42.CompletionRequest = exports$42.CompletionTriggerKind = exports$42.PublishDiagnosticsNotification = exports$42.WatchKind = exports$42.RelativePattern = exports$42.FileChangeType = exports$42.DidChangeWatchedFilesNotification = exports$42.WillSaveTextDocumentWaitUntilRequest = exports$42.WillSaveTextDocumentNotification = exports$42.TextDocumentSaveReason = exports$42.DidSaveTextDocumentNotification = exports$42.DidCloseTextDocumentNotification = exports$42.DidChangeTextDocumentNotification = exports$42.TextDocumentContentChangeEvent = exports$42.DidOpenTextDocumentNotification = exports$42.TextDocumentSyncKind = exports$42.TelemetryEventNotification = exports$42.LogMessageNotification = exports$42.ShowMessageRequest = exports$42.ShowMessageNotification = exports$42.MessageType = exports$42.DidChangeConfigurationNotification = exports$42.ExitNotification = exports$42.ShutdownRequest = exports$42.InitializedNotification = exports$42.InitializeErrorCodes = exports$42.InitializeRequest = exports$42.WorkDoneProgressOptions = exports$42.TextDocumentRegistrationOptions = exports$42.StaticRegistrationOptions = exports$42.PositionEncodingKind = exports$42.FailureHandlingKind = exports$42.ResourceOperationKind = exports$42.UnregistrationRequest = exports$42.RegistrationRequest = exports$42.DocumentSelector = exports$42.NotebookCellTextDocumentFilter = exports$42.NotebookDocumentFilter = exports$42.TextDocumentFilter = void 0;
			exports$42.MonikerRequest = exports$42.MonikerKind = exports$42.UniquenessLevel = exports$42.WillDeleteFilesRequest = exports$42.DidDeleteFilesNotification = exports$42.WillRenameFilesRequest = exports$42.DidRenameFilesNotification = exports$42.WillCreateFilesRequest = exports$42.DidCreateFilesNotification = exports$42.FileOperationPatternKind = exports$42.LinkedEditingRangeRequest = exports$42.ShowDocumentRequest = exports$42.SemanticTokensRegistrationType = exports$42.SemanticTokensRefreshRequest = exports$42.SemanticTokensRangeRequest = exports$42.SemanticTokensDeltaRequest = exports$42.SemanticTokensRequest = exports$42.TokenFormat = exports$42.CallHierarchyPrepareRequest = exports$42.CallHierarchyOutgoingCallsRequest = exports$42.CallHierarchyIncomingCallsRequest = exports$42.WorkDoneProgressCancelNotification = exports$42.WorkDoneProgressCreateRequest = exports$42.WorkDoneProgress = exports$42.SelectionRangeRequest = exports$42.DeclarationRequest = exports$42.FoldingRangeRefreshRequest = exports$42.FoldingRangeRequest = exports$42.ColorPresentationRequest = exports$42.DocumentColorRequest = exports$42.ConfigurationRequest = exports$42.DidChangeWorkspaceFoldersNotification = exports$42.WorkspaceFoldersRequest = exports$42.TypeDefinitionRequest = exports$42.ImplementationRequest = exports$42.ApplyWorkspaceEditRequest = exports$42.ExecuteCommandRequest = exports$42.PrepareRenameRequest = exports$42.RenameRequest = exports$42.PrepareSupportDefaultBehavior = exports$42.DocumentOnTypeFormattingRequest = exports$42.DocumentRangesFormattingRequest = exports$42.DocumentRangeFormattingRequest = exports$42.DocumentFormattingRequest = exports$42.DocumentLinkResolveRequest = exports$42.DocumentLinkRequest = exports$42.CodeLensRefreshRequest = exports$42.CodeLensResolveRequest = exports$42.CodeLensRequest = exports$42.WorkspaceSymbolResolveRequest = void 0;
			exports$42.InlineCompletionRequest = exports$42.DidCloseNotebookDocumentNotification = exports$42.DidSaveNotebookDocumentNotification = exports$42.DidChangeNotebookDocumentNotification = exports$42.NotebookCellArrayChange = exports$42.DidOpenNotebookDocumentNotification = exports$42.NotebookDocumentSyncRegistrationType = exports$42.NotebookDocument = exports$42.NotebookCell = exports$42.ExecutionSummary = exports$42.NotebookCellKind = exports$42.DiagnosticRefreshRequest = exports$42.WorkspaceDiagnosticRequest = exports$42.DocumentDiagnosticRequest = exports$42.DocumentDiagnosticReportKind = exports$42.DiagnosticServerCancellationData = exports$42.InlayHintRefreshRequest = exports$42.InlayHintResolveRequest = exports$42.InlayHintRequest = exports$42.InlineValueRefreshRequest = exports$42.InlineValueRequest = exports$42.TypeHierarchySupertypesRequest = exports$42.TypeHierarchySubtypesRequest = exports$42.TypeHierarchyPrepareRequest = void 0;
			var messages_1 = require_messages();
			var vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports));
			var Is = require_is();
			var protocol_implementation_1 = require_protocol_implementation();
			Object.defineProperty(exports$42, "ImplementationRequest", {
				enumerable: true,
				get: function() {
					return protocol_implementation_1.ImplementationRequest;
				}
			});
			var protocol_typeDefinition_1 = require_protocol_typeDefinition();
			Object.defineProperty(exports$42, "TypeDefinitionRequest", {
				enumerable: true,
				get: function() {
					return protocol_typeDefinition_1.TypeDefinitionRequest;
				}
			});
			var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
			Object.defineProperty(exports$42, "WorkspaceFoldersRequest", {
				enumerable: true,
				get: function() {
					return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
				}
			});
			Object.defineProperty(exports$42, "DidChangeWorkspaceFoldersNotification", {
				enumerable: true,
				get: function() {
					return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
				}
			});
			var protocol_configuration_1 = require_protocol_configuration();
			Object.defineProperty(exports$42, "ConfigurationRequest", {
				enumerable: true,
				get: function() {
					return protocol_configuration_1.ConfigurationRequest;
				}
			});
			var protocol_colorProvider_1 = require_protocol_colorProvider();
			Object.defineProperty(exports$42, "DocumentColorRequest", {
				enumerable: true,
				get: function() {
					return protocol_colorProvider_1.DocumentColorRequest;
				}
			});
			Object.defineProperty(exports$42, "ColorPresentationRequest", {
				enumerable: true,
				get: function() {
					return protocol_colorProvider_1.ColorPresentationRequest;
				}
			});
			var protocol_foldingRange_1 = require_protocol_foldingRange();
			Object.defineProperty(exports$42, "FoldingRangeRequest", {
				enumerable: true,
				get: function() {
					return protocol_foldingRange_1.FoldingRangeRequest;
				}
			});
			Object.defineProperty(exports$42, "FoldingRangeRefreshRequest", {
				enumerable: true,
				get: function() {
					return protocol_foldingRange_1.FoldingRangeRefreshRequest;
				}
			});
			var protocol_declaration_1 = require_protocol_declaration();
			Object.defineProperty(exports$42, "DeclarationRequest", {
				enumerable: true,
				get: function() {
					return protocol_declaration_1.DeclarationRequest;
				}
			});
			var protocol_selectionRange_1 = require_protocol_selectionRange();
			Object.defineProperty(exports$42, "SelectionRangeRequest", {
				enumerable: true,
				get: function() {
					return protocol_selectionRange_1.SelectionRangeRequest;
				}
			});
			var protocol_progress_1 = require_protocol_progress();
			Object.defineProperty(exports$42, "WorkDoneProgress", {
				enumerable: true,
				get: function() {
					return protocol_progress_1.WorkDoneProgress;
				}
			});
			Object.defineProperty(exports$42, "WorkDoneProgressCreateRequest", {
				enumerable: true,
				get: function() {
					return protocol_progress_1.WorkDoneProgressCreateRequest;
				}
			});
			Object.defineProperty(exports$42, "WorkDoneProgressCancelNotification", {
				enumerable: true,
				get: function() {
					return protocol_progress_1.WorkDoneProgressCancelNotification;
				}
			});
			var protocol_callHierarchy_1 = require_protocol_callHierarchy();
			Object.defineProperty(exports$42, "CallHierarchyIncomingCallsRequest", {
				enumerable: true,
				get: function() {
					return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
				}
			});
			Object.defineProperty(exports$42, "CallHierarchyOutgoingCallsRequest", {
				enumerable: true,
				get: function() {
					return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
				}
			});
			Object.defineProperty(exports$42, "CallHierarchyPrepareRequest", {
				enumerable: true,
				get: function() {
					return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
				}
			});
			var protocol_semanticTokens_1 = require_protocol_semanticTokens();
			Object.defineProperty(exports$42, "TokenFormat", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.TokenFormat;
				}
			});
			Object.defineProperty(exports$42, "SemanticTokensRequest", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.SemanticTokensRequest;
				}
			});
			Object.defineProperty(exports$42, "SemanticTokensDeltaRequest", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
				}
			});
			Object.defineProperty(exports$42, "SemanticTokensRangeRequest", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.SemanticTokensRangeRequest;
				}
			});
			Object.defineProperty(exports$42, "SemanticTokensRefreshRequest", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
				}
			});
			Object.defineProperty(exports$42, "SemanticTokensRegistrationType", {
				enumerable: true,
				get: function() {
					return protocol_semanticTokens_1.SemanticTokensRegistrationType;
				}
			});
			var protocol_showDocument_1 = require_protocol_showDocument();
			Object.defineProperty(exports$42, "ShowDocumentRequest", {
				enumerable: true,
				get: function() {
					return protocol_showDocument_1.ShowDocumentRequest;
				}
			});
			var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
			Object.defineProperty(exports$42, "LinkedEditingRangeRequest", {
				enumerable: true,
				get: function() {
					return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
				}
			});
			var protocol_fileOperations_1 = require_protocol_fileOperations();
			Object.defineProperty(exports$42, "FileOperationPatternKind", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.FileOperationPatternKind;
				}
			});
			Object.defineProperty(exports$42, "DidCreateFilesNotification", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.DidCreateFilesNotification;
				}
			});
			Object.defineProperty(exports$42, "WillCreateFilesRequest", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.WillCreateFilesRequest;
				}
			});
			Object.defineProperty(exports$42, "DidRenameFilesNotification", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.DidRenameFilesNotification;
				}
			});
			Object.defineProperty(exports$42, "WillRenameFilesRequest", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.WillRenameFilesRequest;
				}
			});
			Object.defineProperty(exports$42, "DidDeleteFilesNotification", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.DidDeleteFilesNotification;
				}
			});
			Object.defineProperty(exports$42, "WillDeleteFilesRequest", {
				enumerable: true,
				get: function() {
					return protocol_fileOperations_1.WillDeleteFilesRequest;
				}
			});
			var protocol_moniker_1 = require_protocol_moniker();
			Object.defineProperty(exports$42, "UniquenessLevel", {
				enumerable: true,
				get: function() {
					return protocol_moniker_1.UniquenessLevel;
				}
			});
			Object.defineProperty(exports$42, "MonikerKind", {
				enumerable: true,
				get: function() {
					return protocol_moniker_1.MonikerKind;
				}
			});
			Object.defineProperty(exports$42, "MonikerRequest", {
				enumerable: true,
				get: function() {
					return protocol_moniker_1.MonikerRequest;
				}
			});
			var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
			Object.defineProperty(exports$42, "TypeHierarchyPrepareRequest", {
				enumerable: true,
				get: function() {
					return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
				}
			});
			Object.defineProperty(exports$42, "TypeHierarchySubtypesRequest", {
				enumerable: true,
				get: function() {
					return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
				}
			});
			Object.defineProperty(exports$42, "TypeHierarchySupertypesRequest", {
				enumerable: true,
				get: function() {
					return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
				}
			});
			var protocol_inlineValue_1 = require_protocol_inlineValue();
			Object.defineProperty(exports$42, "InlineValueRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlineValue_1.InlineValueRequest;
				}
			});
			Object.defineProperty(exports$42, "InlineValueRefreshRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlineValue_1.InlineValueRefreshRequest;
				}
			});
			var protocol_inlayHint_1 = require_protocol_inlayHint();
			Object.defineProperty(exports$42, "InlayHintRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlayHint_1.InlayHintRequest;
				}
			});
			Object.defineProperty(exports$42, "InlayHintResolveRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlayHint_1.InlayHintResolveRequest;
				}
			});
			Object.defineProperty(exports$42, "InlayHintRefreshRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlayHint_1.InlayHintRefreshRequest;
				}
			});
			var protocol_diagnostic_1 = require_protocol_diagnostic();
			Object.defineProperty(exports$42, "DiagnosticServerCancellationData", {
				enumerable: true,
				get: function() {
					return protocol_diagnostic_1.DiagnosticServerCancellationData;
				}
			});
			Object.defineProperty(exports$42, "DocumentDiagnosticReportKind", {
				enumerable: true,
				get: function() {
					return protocol_diagnostic_1.DocumentDiagnosticReportKind;
				}
			});
			Object.defineProperty(exports$42, "DocumentDiagnosticRequest", {
				enumerable: true,
				get: function() {
					return protocol_diagnostic_1.DocumentDiagnosticRequest;
				}
			});
			Object.defineProperty(exports$42, "WorkspaceDiagnosticRequest", {
				enumerable: true,
				get: function() {
					return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
				}
			});
			Object.defineProperty(exports$42, "DiagnosticRefreshRequest", {
				enumerable: true,
				get: function() {
					return protocol_diagnostic_1.DiagnosticRefreshRequest;
				}
			});
			var protocol_notebook_1 = require_protocol_notebook();
			Object.defineProperty(exports$42, "NotebookCellKind", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.NotebookCellKind;
				}
			});
			Object.defineProperty(exports$42, "ExecutionSummary", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.ExecutionSummary;
				}
			});
			Object.defineProperty(exports$42, "NotebookCell", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.NotebookCell;
				}
			});
			Object.defineProperty(exports$42, "NotebookDocument", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.NotebookDocument;
				}
			});
			Object.defineProperty(exports$42, "NotebookDocumentSyncRegistrationType", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
				}
			});
			Object.defineProperty(exports$42, "DidOpenNotebookDocumentNotification", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.DidOpenNotebookDocumentNotification;
				}
			});
			Object.defineProperty(exports$42, "NotebookCellArrayChange", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.NotebookCellArrayChange;
				}
			});
			Object.defineProperty(exports$42, "DidChangeNotebookDocumentNotification", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.DidChangeNotebookDocumentNotification;
				}
			});
			Object.defineProperty(exports$42, "DidSaveNotebookDocumentNotification", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.DidSaveNotebookDocumentNotification;
				}
			});
			Object.defineProperty(exports$42, "DidCloseNotebookDocumentNotification", {
				enumerable: true,
				get: function() {
					return protocol_notebook_1.DidCloseNotebookDocumentNotification;
				}
			});
			var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
			Object.defineProperty(exports$42, "InlineCompletionRequest", {
				enumerable: true,
				get: function() {
					return protocol_inlineCompletion_1.InlineCompletionRequest;
				}
			});
			/**
			* The TextDocumentFilter namespace provides helper functions to work with
			* {@link TextDocumentFilter} literals.
			*
			* @since 3.17.0
			*/
			var TextDocumentFilter;
			(function(TextDocumentFilter) {
				function is(value) {
					const candidate = value;
					return Is.string(candidate) || Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
				}
				TextDocumentFilter.is = is;
			})(TextDocumentFilter || (exports$42.TextDocumentFilter = TextDocumentFilter = {}));
			/**
			* The NotebookDocumentFilter namespace provides helper functions to work with
			* {@link NotebookDocumentFilter} literals.
			*
			* @since 3.17.0
			*/
			var NotebookDocumentFilter;
			(function(NotebookDocumentFilter) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
				}
				NotebookDocumentFilter.is = is;
			})(NotebookDocumentFilter || (exports$42.NotebookDocumentFilter = NotebookDocumentFilter = {}));
			/**
			* The NotebookCellTextDocumentFilter namespace provides helper functions to work with
			* {@link NotebookCellTextDocumentFilter} literals.
			*
			* @since 3.17.0
			*/
			var NotebookCellTextDocumentFilter;
			(function(NotebookCellTextDocumentFilter) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is.string(candidate.language));
				}
				NotebookCellTextDocumentFilter.is = is;
			})(NotebookCellTextDocumentFilter || (exports$42.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
			/**
			* The DocumentSelector namespace provides helper functions to work with
			* {@link DocumentSelector}s.
			*/
			var DocumentSelector;
			(function(DocumentSelector) {
				function is(value) {
					if (!Array.isArray(value)) return false;
					for (let elem of value) if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) return false;
					return true;
				}
				DocumentSelector.is = is;
			})(DocumentSelector || (exports$42.DocumentSelector = DocumentSelector = {}));
			/**
			* The `client/registerCapability` request is sent from the server to the client to register a new capability
			* handler on the client side.
			*/
			var RegistrationRequest;
			(function(RegistrationRequest) {
				RegistrationRequest.method = "client/registerCapability";
				RegistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				RegistrationRequest.type = new messages_1.ProtocolRequestType(RegistrationRequest.method);
			})(RegistrationRequest || (exports$42.RegistrationRequest = RegistrationRequest = {}));
			/**
			* The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
			* handler on the client side.
			*/
			var UnregistrationRequest;
			(function(UnregistrationRequest) {
				UnregistrationRequest.method = "client/unregisterCapability";
				UnregistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				UnregistrationRequest.type = new messages_1.ProtocolRequestType(UnregistrationRequest.method);
			})(UnregistrationRequest || (exports$42.UnregistrationRequest = UnregistrationRequest = {}));
			var ResourceOperationKind;
			(function(ResourceOperationKind) {
				/**
				* Supports creating new files and folders.
				*/
				ResourceOperationKind.Create = "create";
				/**
				* Supports renaming existing files and folders.
				*/
				ResourceOperationKind.Rename = "rename";
				/**
				* Supports deleting existing files and folders.
				*/
				ResourceOperationKind.Delete = "delete";
			})(ResourceOperationKind || (exports$42.ResourceOperationKind = ResourceOperationKind = {}));
			var FailureHandlingKind;
			(function(FailureHandlingKind) {
				/**
				* Applying the workspace change is simply aborted if one of the changes provided
				* fails. All operations executed before the failing operation stay executed.
				*/
				FailureHandlingKind.Abort = "abort";
				/**
				* All operations are executed transactional. That means they either all
				* succeed or no changes at all are applied to the workspace.
				*/
				FailureHandlingKind.Transactional = "transactional";
				/**
				* If the workspace edit contains only textual file changes they are executed transactional.
				* If resource changes (create, rename or delete file) are part of the change the failure
				* handling strategy is abort.
				*/
				FailureHandlingKind.TextOnlyTransactional = "textOnlyTransactional";
				/**
				* The client tries to undo the operations already executed. But there is no
				* guarantee that this is succeeding.
				*/
				FailureHandlingKind.Undo = "undo";
			})(FailureHandlingKind || (exports$42.FailureHandlingKind = FailureHandlingKind = {}));
			/**
			* A set of predefined position encoding kinds.
			*
			* @since 3.17.0
			*/
			var PositionEncodingKind;
			(function(PositionEncodingKind) {
				/**
				* Character offsets count UTF-8 code units (e.g. bytes).
				*/
				PositionEncodingKind.UTF8 = "utf-8";
				/**
				* Character offsets count UTF-16 code units.
				*
				* This is the default and must always be supported
				* by servers
				*/
				PositionEncodingKind.UTF16 = "utf-16";
				/**
				* Character offsets count UTF-32 code units.
				*
				* Implementation note: these are the same as Unicode codepoints,
				* so this `PositionEncodingKind` may also be used for an
				* encoding-agnostic representation of character offsets.
				*/
				PositionEncodingKind.UTF32 = "utf-32";
			})(PositionEncodingKind || (exports$42.PositionEncodingKind = PositionEncodingKind = {}));
			/**
			* The StaticRegistrationOptions namespace provides helper functions to work with
			* {@link StaticRegistrationOptions} literals.
			*/
			var StaticRegistrationOptions;
			(function(StaticRegistrationOptions) {
				function hasId(value) {
					const candidate = value;
					return candidate && Is.string(candidate.id) && candidate.id.length > 0;
				}
				StaticRegistrationOptions.hasId = hasId;
			})(StaticRegistrationOptions || (exports$42.StaticRegistrationOptions = StaticRegistrationOptions = {}));
			/**
			* The TextDocumentRegistrationOptions namespace provides helper functions to work with
			* {@link TextDocumentRegistrationOptions} literals.
			*/
			var TextDocumentRegistrationOptions;
			(function(TextDocumentRegistrationOptions) {
				function is(value) {
					const candidate = value;
					return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
				}
				TextDocumentRegistrationOptions.is = is;
			})(TextDocumentRegistrationOptions || (exports$42.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
			/**
			* The WorkDoneProgressOptions namespace provides helper functions to work with
			* {@link WorkDoneProgressOptions} literals.
			*/
			var WorkDoneProgressOptions;
			(function(WorkDoneProgressOptions) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is.boolean(candidate.workDoneProgress));
				}
				WorkDoneProgressOptions.is = is;
				function hasWorkDoneProgress(value) {
					const candidate = value;
					return candidate && Is.boolean(candidate.workDoneProgress);
				}
				WorkDoneProgressOptions.hasWorkDoneProgress = hasWorkDoneProgress;
			})(WorkDoneProgressOptions || (exports$42.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
			/**
			* The initialize request is sent from the client to the server.
			* It is sent once as the request after starting up the server.
			* The requests parameter is of type {@link InitializeParams}
			* the response if of type {@link InitializeResult} of a Thenable that
			* resolves to such.
			*/
			var InitializeRequest;
			(function(InitializeRequest) {
				InitializeRequest.method = "initialize";
				InitializeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				InitializeRequest.type = new messages_1.ProtocolRequestType(InitializeRequest.method);
			})(InitializeRequest || (exports$42.InitializeRequest = InitializeRequest = {}));
			/**
			* Known error codes for an `InitializeErrorCodes`;
			*/
			var InitializeErrorCodes;
			(function(InitializeErrorCodes) {
				/**
				* If the protocol version provided by the client can't be handled by the server.
				*
				* @deprecated This initialize error got replaced by client capabilities. There is
				* no version handshake in version 3.0x
				*/
				InitializeErrorCodes.unknownProtocolVersion = 1;
			})(InitializeErrorCodes || (exports$42.InitializeErrorCodes = InitializeErrorCodes = {}));
			/**
			* The initialized notification is sent from the client to the
			* server after the client is fully initialized and the server
			* is allowed to send requests from the server to the client.
			*/
			var InitializedNotification;
			(function(InitializedNotification) {
				InitializedNotification.method = "initialized";
				InitializedNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				InitializedNotification.type = new messages_1.ProtocolNotificationType(InitializedNotification.method);
			})(InitializedNotification || (exports$42.InitializedNotification = InitializedNotification = {}));
			/**
			* A shutdown request is sent from the client to the server.
			* It is sent once when the client decides to shutdown the
			* server. The only notification that is sent after a shutdown request
			* is the exit event.
			*/
			var ShutdownRequest;
			(function(ShutdownRequest) {
				ShutdownRequest.method = "shutdown";
				ShutdownRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				ShutdownRequest.type = new messages_1.ProtocolRequestType0(ShutdownRequest.method);
			})(ShutdownRequest || (exports$42.ShutdownRequest = ShutdownRequest = {}));
			/**
			* The exit event is sent from the client to the server to
			* ask the server to exit its process.
			*/
			var ExitNotification;
			(function(ExitNotification) {
				ExitNotification.method = "exit";
				ExitNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				ExitNotification.type = new messages_1.ProtocolNotificationType0(ExitNotification.method);
			})(ExitNotification || (exports$42.ExitNotification = ExitNotification = {}));
			/**
			* The configuration change notification is sent from the client to the server
			* when the client's configuration has changed. The notification contains
			* the changed configuration as defined by the language client.
			*/
			var DidChangeConfigurationNotification;
			(function(DidChangeConfigurationNotification) {
				DidChangeConfigurationNotification.method = "workspace/didChangeConfiguration";
				DidChangeConfigurationNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidChangeConfigurationNotification.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification.method);
			})(DidChangeConfigurationNotification || (exports$42.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
			/**
			* The message type
			*/
			var MessageType;
			(function(MessageType) {
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
			})(MessageType || (exports$42.MessageType = MessageType = {}));
			/**
			* The show message notification is sent from a server to a client to ask
			* the client to display a particular message in the user interface.
			*/
			var ShowMessageNotification;
			(function(ShowMessageNotification) {
				ShowMessageNotification.method = "window/showMessage";
				ShowMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
				ShowMessageNotification.type = new messages_1.ProtocolNotificationType(ShowMessageNotification.method);
			})(ShowMessageNotification || (exports$42.ShowMessageNotification = ShowMessageNotification = {}));
			/**
			* The show message request is sent from the server to the client to show a message
			* and a set of options actions to the user.
			*/
			var ShowMessageRequest;
			(function(ShowMessageRequest) {
				ShowMessageRequest.method = "window/showMessageRequest";
				ShowMessageRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				ShowMessageRequest.type = new messages_1.ProtocolRequestType(ShowMessageRequest.method);
			})(ShowMessageRequest || (exports$42.ShowMessageRequest = ShowMessageRequest = {}));
			/**
			* The log message notification is sent from the server to the client to ask
			* the client to log a particular message.
			*/
			var LogMessageNotification;
			(function(LogMessageNotification) {
				LogMessageNotification.method = "window/logMessage";
				LogMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
				LogMessageNotification.type = new messages_1.ProtocolNotificationType(LogMessageNotification.method);
			})(LogMessageNotification || (exports$42.LogMessageNotification = LogMessageNotification = {}));
			/**
			* The telemetry event notification is sent from the server to the client to ask
			* the client to log telemetry data.
			*/
			var TelemetryEventNotification;
			(function(TelemetryEventNotification) {
				TelemetryEventNotification.method = "telemetry/event";
				TelemetryEventNotification.messageDirection = messages_1.MessageDirection.serverToClient;
				TelemetryEventNotification.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification.method);
			})(TelemetryEventNotification || (exports$42.TelemetryEventNotification = TelemetryEventNotification = {}));
			/**
			* Defines how the host (editor) should sync
			* document changes to the language server.
			*/
			var TextDocumentSyncKind;
			(function(TextDocumentSyncKind) {
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
			})(TextDocumentSyncKind || (exports$42.TextDocumentSyncKind = TextDocumentSyncKind = {}));
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
			(function(DidOpenTextDocumentNotification) {
				DidOpenTextDocumentNotification.method = "textDocument/didOpen";
				DidOpenTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidOpenTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification.method);
			})(DidOpenTextDocumentNotification || (exports$42.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
			var TextDocumentContentChangeEvent;
			(function(TextDocumentContentChangeEvent) {
				/**
				* Checks whether the information describes a delta event.
				*/
				function isIncremental(event) {
					let candidate = event;
					return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
				}
				TextDocumentContentChangeEvent.isIncremental = isIncremental;
				/**
				* Checks whether the information describes a full replacement event.
				*/
				function isFull(event) {
					let candidate = event;
					return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
				}
				TextDocumentContentChangeEvent.isFull = isFull;
			})(TextDocumentContentChangeEvent || (exports$42.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
			/**
			* The document change notification is sent from the client to the server to signal
			* changes to a text document.
			*/
			var DidChangeTextDocumentNotification;
			(function(DidChangeTextDocumentNotification) {
				DidChangeTextDocumentNotification.method = "textDocument/didChange";
				DidChangeTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidChangeTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
			})(DidChangeTextDocumentNotification || (exports$42.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
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
			(function(DidCloseTextDocumentNotification) {
				DidCloseTextDocumentNotification.method = "textDocument/didClose";
				DidCloseTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidCloseTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification.method);
			})(DidCloseTextDocumentNotification || (exports$42.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
			/**
			* The document save notification is sent from the client to the server when
			* the document got saved in the client.
			*/
			var DidSaveTextDocumentNotification;
			(function(DidSaveTextDocumentNotification) {
				DidSaveTextDocumentNotification.method = "textDocument/didSave";
				DidSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
			})(DidSaveTextDocumentNotification || (exports$42.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
			/**
			* Represents reasons why a text document is saved.
			*/
			var TextDocumentSaveReason;
			(function(TextDocumentSaveReason) {
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
			})(TextDocumentSaveReason || (exports$42.TextDocumentSaveReason = TextDocumentSaveReason = {}));
			/**
			* A document will save notification is sent from the client to the server before
			* the document is actually saved.
			*/
			var WillSaveTextDocumentNotification;
			(function(WillSaveTextDocumentNotification) {
				WillSaveTextDocumentNotification.method = "textDocument/willSave";
				WillSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				WillSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
			})(WillSaveTextDocumentNotification || (exports$42.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
			/**
			* A document will save request is sent from the client to the server before
			* the document is actually saved. The request can return an array of TextEdits
			* which will be applied to the text document before it is saved. Please note that
			* clients might drop results if computing the text edits took too long or if a
			* server constantly fails on this request. This is done to keep the save fast and
			* reliable.
			*/
			var WillSaveTextDocumentWaitUntilRequest;
			(function(WillSaveTextDocumentWaitUntilRequest) {
				WillSaveTextDocumentWaitUntilRequest.method = "textDocument/willSaveWaitUntil";
				WillSaveTextDocumentWaitUntilRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WillSaveTextDocumentWaitUntilRequest.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest.method);
			})(WillSaveTextDocumentWaitUntilRequest || (exports$42.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
			/**
			* The watched files notification is sent from the client to the server when
			* the client detects changes to file watched by the language client.
			*/
			var DidChangeWatchedFilesNotification;
			(function(DidChangeWatchedFilesNotification) {
				DidChangeWatchedFilesNotification.method = "workspace/didChangeWatchedFiles";
				DidChangeWatchedFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
				DidChangeWatchedFilesNotification.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification.method);
			})(DidChangeWatchedFilesNotification || (exports$42.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
			/**
			* The file event type
			*/
			var FileChangeType;
			(function(FileChangeType) {
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
			})(FileChangeType || (exports$42.FileChangeType = FileChangeType = {}));
			var RelativePattern;
			(function(RelativePattern) {
				function is(value) {
					const candidate = value;
					return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
				}
				RelativePattern.is = is;
			})(RelativePattern || (exports$42.RelativePattern = RelativePattern = {}));
			var WatchKind;
			(function(WatchKind) {
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
			})(WatchKind || (exports$42.WatchKind = WatchKind = {}));
			/**
			* Diagnostics notification are sent from the server to the client to signal
			* results of validation runs.
			*/
			var PublishDiagnosticsNotification;
			(function(PublishDiagnosticsNotification) {
				PublishDiagnosticsNotification.method = "textDocument/publishDiagnostics";
				PublishDiagnosticsNotification.messageDirection = messages_1.MessageDirection.serverToClient;
				PublishDiagnosticsNotification.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification.method);
			})(PublishDiagnosticsNotification || (exports$42.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
			/**
			* How a completion was triggered
			*/
			var CompletionTriggerKind;
			(function(CompletionTriggerKind) {
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
			})(CompletionTriggerKind || (exports$42.CompletionTriggerKind = CompletionTriggerKind = {}));
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
			(function(CompletionRequest) {
				CompletionRequest.method = "textDocument/completion";
				CompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CompletionRequest.type = new messages_1.ProtocolRequestType(CompletionRequest.method);
			})(CompletionRequest || (exports$42.CompletionRequest = CompletionRequest = {}));
			/**
			* Request to resolve additional information for a given completion item.The request's
			* parameter is of type {@link CompletionItem} the response
			* is of type {@link CompletionItem} or a Thenable that resolves to such.
			*/
			var CompletionResolveRequest;
			(function(CompletionResolveRequest) {
				CompletionResolveRequest.method = "completionItem/resolve";
				CompletionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CompletionResolveRequest.type = new messages_1.ProtocolRequestType(CompletionResolveRequest.method);
			})(CompletionResolveRequest || (exports$42.CompletionResolveRequest = CompletionResolveRequest = {}));
			/**
			* Request to request hover information at a given text document position. The request's
			* parameter is of type {@link TextDocumentPosition} the response is of
			* type {@link Hover} or a Thenable that resolves to such.
			*/
			var HoverRequest;
			(function(HoverRequest) {
				HoverRequest.method = "textDocument/hover";
				HoverRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				HoverRequest.type = new messages_1.ProtocolRequestType(HoverRequest.method);
			})(HoverRequest || (exports$42.HoverRequest = HoverRequest = {}));
			/**
			* How a signature help was triggered.
			*
			* @since 3.15.0
			*/
			var SignatureHelpTriggerKind;
			(function(SignatureHelpTriggerKind) {
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
			})(SignatureHelpTriggerKind || (exports$42.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
			var SignatureHelpRequest;
			(function(SignatureHelpRequest) {
				SignatureHelpRequest.method = "textDocument/signatureHelp";
				SignatureHelpRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				SignatureHelpRequest.type = new messages_1.ProtocolRequestType(SignatureHelpRequest.method);
			})(SignatureHelpRequest || (exports$42.SignatureHelpRequest = SignatureHelpRequest = {}));
			/**
			* A request to resolve the definition location of a symbol at a given text
			* document position. The request's parameter is of type {@link TextDocumentPosition}
			* the response is of either type {@link Definition} or a typed array of
			* {@link DefinitionLink} or a Thenable that resolves to such.
			*/
			var DefinitionRequest;
			(function(DefinitionRequest) {
				DefinitionRequest.method = "textDocument/definition";
				DefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DefinitionRequest.type = new messages_1.ProtocolRequestType(DefinitionRequest.method);
			})(DefinitionRequest || (exports$42.DefinitionRequest = DefinitionRequest = {}));
			/**
			* A request to resolve project-wide references for the symbol denoted
			* by the given text document position. The request's parameter is of
			* type {@link ReferenceParams} the response is of type
			* {@link Location Location[]} or a Thenable that resolves to such.
			*/
			var ReferencesRequest;
			(function(ReferencesRequest) {
				ReferencesRequest.method = "textDocument/references";
				ReferencesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				ReferencesRequest.type = new messages_1.ProtocolRequestType(ReferencesRequest.method);
			})(ReferencesRequest || (exports$42.ReferencesRequest = ReferencesRequest = {}));
			/**
			* Request to resolve a {@link DocumentHighlight} for a given
			* text document position. The request's parameter is of type {@link TextDocumentPosition}
			* the request response is an array of type {@link DocumentHighlight}
			* or a Thenable that resolves to such.
			*/
			var DocumentHighlightRequest;
			(function(DocumentHighlightRequest) {
				DocumentHighlightRequest.method = "textDocument/documentHighlight";
				DocumentHighlightRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentHighlightRequest.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest.method);
			})(DocumentHighlightRequest || (exports$42.DocumentHighlightRequest = DocumentHighlightRequest = {}));
			/**
			* A request to list all symbols found in a given text document. The request's
			* parameter is of type {@link TextDocumentIdentifier} the
			* response is of type {@link SymbolInformation SymbolInformation[]} or a Thenable
			* that resolves to such.
			*/
			var DocumentSymbolRequest;
			(function(DocumentSymbolRequest) {
				DocumentSymbolRequest.method = "textDocument/documentSymbol";
				DocumentSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentSymbolRequest.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest.method);
			})(DocumentSymbolRequest || (exports$42.DocumentSymbolRequest = DocumentSymbolRequest = {}));
			/**
			* A request to provide commands for the given text document and range.
			*/
			var CodeActionRequest;
			(function(CodeActionRequest) {
				CodeActionRequest.method = "textDocument/codeAction";
				CodeActionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CodeActionRequest.type = new messages_1.ProtocolRequestType(CodeActionRequest.method);
			})(CodeActionRequest || (exports$42.CodeActionRequest = CodeActionRequest = {}));
			/**
			* Request to resolve additional information for a given code action.The request's
			* parameter is of type {@link CodeAction} the response
			* is of type {@link CodeAction} or a Thenable that resolves to such.
			*/
			var CodeActionResolveRequest;
			(function(CodeActionResolveRequest) {
				CodeActionResolveRequest.method = "codeAction/resolve";
				CodeActionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CodeActionResolveRequest.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest.method);
			})(CodeActionResolveRequest || (exports$42.CodeActionResolveRequest = CodeActionResolveRequest = {}));
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
			(function(WorkspaceSymbolRequest) {
				WorkspaceSymbolRequest.method = "workspace/symbol";
				WorkspaceSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WorkspaceSymbolRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest.method);
			})(WorkspaceSymbolRequest || (exports$42.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
			/**
			* A request to resolve the range inside the workspace
			* symbol's location.
			*
			* @since 3.17.0
			*/
			var WorkspaceSymbolResolveRequest;
			(function(WorkspaceSymbolResolveRequest) {
				WorkspaceSymbolResolveRequest.method = "workspaceSymbol/resolve";
				WorkspaceSymbolResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				WorkspaceSymbolResolveRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest.method);
			})(WorkspaceSymbolResolveRequest || (exports$42.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
			/**
			* A request to provide code lens for the given text document.
			*/
			var CodeLensRequest;
			(function(CodeLensRequest) {
				CodeLensRequest.method = "textDocument/codeLens";
				CodeLensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CodeLensRequest.type = new messages_1.ProtocolRequestType(CodeLensRequest.method);
			})(CodeLensRequest || (exports$42.CodeLensRequest = CodeLensRequest = {}));
			/**
			* A request to resolve a command for a given code lens.
			*/
			var CodeLensResolveRequest;
			(function(CodeLensResolveRequest) {
				CodeLensResolveRequest.method = "codeLens/resolve";
				CodeLensResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				CodeLensResolveRequest.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest.method);
			})(CodeLensResolveRequest || (exports$42.CodeLensResolveRequest = CodeLensResolveRequest = {}));
			/**
			* A request to refresh all code actions
			*
			* @since 3.16.0
			*/
			var CodeLensRefreshRequest;
			(function(CodeLensRefreshRequest) {
				CodeLensRefreshRequest.method = `workspace/codeLens/refresh`;
				CodeLensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				CodeLensRefreshRequest.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest.method);
			})(CodeLensRefreshRequest || (exports$42.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
			/**
			* A request to provide document links
			*/
			var DocumentLinkRequest;
			(function(DocumentLinkRequest) {
				DocumentLinkRequest.method = "textDocument/documentLink";
				DocumentLinkRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentLinkRequest.type = new messages_1.ProtocolRequestType(DocumentLinkRequest.method);
			})(DocumentLinkRequest || (exports$42.DocumentLinkRequest = DocumentLinkRequest = {}));
			/**
			* Request to resolve additional information for a given document link. The request's
			* parameter is of type {@link DocumentLink} the response
			* is of type {@link DocumentLink} or a Thenable that resolves to such.
			*/
			var DocumentLinkResolveRequest;
			(function(DocumentLinkResolveRequest) {
				DocumentLinkResolveRequest.method = "documentLink/resolve";
				DocumentLinkResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentLinkResolveRequest.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest.method);
			})(DocumentLinkResolveRequest || (exports$42.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
			/**
			* A request to format a whole document.
			*/
			var DocumentFormattingRequest;
			(function(DocumentFormattingRequest) {
				DocumentFormattingRequest.method = "textDocument/formatting";
				DocumentFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest.method);
			})(DocumentFormattingRequest || (exports$42.DocumentFormattingRequest = DocumentFormattingRequest = {}));
			/**
			* A request to format a range in a document.
			*/
			var DocumentRangeFormattingRequest;
			(function(DocumentRangeFormattingRequest) {
				DocumentRangeFormattingRequest.method = "textDocument/rangeFormatting";
				DocumentRangeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentRangeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest.method);
			})(DocumentRangeFormattingRequest || (exports$42.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
			/**
			* A request to format ranges in a document.
			*
			* @since 3.18.0
			* @proposed
			*/
			var DocumentRangesFormattingRequest;
			(function(DocumentRangesFormattingRequest) {
				DocumentRangesFormattingRequest.method = "textDocument/rangesFormatting";
				DocumentRangesFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentRangesFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest.method);
			})(DocumentRangesFormattingRequest || (exports$42.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
			/**
			* A request to format a document on type.
			*/
			var DocumentOnTypeFormattingRequest;
			(function(DocumentOnTypeFormattingRequest) {
				DocumentOnTypeFormattingRequest.method = "textDocument/onTypeFormatting";
				DocumentOnTypeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				DocumentOnTypeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
			})(DocumentOnTypeFormattingRequest || (exports$42.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
			var PrepareSupportDefaultBehavior;
			(function(PrepareSupportDefaultBehavior) {
				/**
				* The client's default behavior is to select the identifier
				* according the to language's syntax rule.
				*/
				PrepareSupportDefaultBehavior.Identifier = 1;
			})(PrepareSupportDefaultBehavior || (exports$42.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
			/**
			* A request to rename a symbol.
			*/
			var RenameRequest;
			(function(RenameRequest) {
				RenameRequest.method = "textDocument/rename";
				RenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				RenameRequest.type = new messages_1.ProtocolRequestType(RenameRequest.method);
			})(RenameRequest || (exports$42.RenameRequest = RenameRequest = {}));
			/**
			* A request to test and perform the setup necessary for a rename.
			*
			* @since 3.16 - support for default behavior
			*/
			var PrepareRenameRequest;
			(function(PrepareRenameRequest) {
				PrepareRenameRequest.method = "textDocument/prepareRename";
				PrepareRenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				PrepareRenameRequest.type = new messages_1.ProtocolRequestType(PrepareRenameRequest.method);
			})(PrepareRenameRequest || (exports$42.PrepareRenameRequest = PrepareRenameRequest = {}));
			/**
			* A request send from the client to the server to execute a command. The request might return
			* a workspace edit which the client will apply to the workspace.
			*/
			var ExecuteCommandRequest;
			(function(ExecuteCommandRequest) {
				ExecuteCommandRequest.method = "workspace/executeCommand";
				ExecuteCommandRequest.messageDirection = messages_1.MessageDirection.clientToServer;
				ExecuteCommandRequest.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest.method);
			})(ExecuteCommandRequest || (exports$42.ExecuteCommandRequest = ExecuteCommandRequest = {}));
			/**
			* A request sent from the server to the client to modified certain resources.
			*/
			var ApplyWorkspaceEditRequest;
			(function(ApplyWorkspaceEditRequest) {
				ApplyWorkspaceEditRequest.method = "workspace/applyEdit";
				ApplyWorkspaceEditRequest.messageDirection = messages_1.MessageDirection.serverToClient;
				ApplyWorkspaceEditRequest.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
			})(ApplyWorkspaceEditRequest || (exports$42.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
		}));
		var require_connection = /* @__PURE__ */ __commonJSMin(((exports$43) => {
			Object.defineProperty(exports$43, "__esModule", { value: true });
			exports$43.createProtocolConnection = void 0;
			var vscode_jsonrpc_1 = require_main$1();
			function createProtocolConnection(input, output, logger, options) {
				if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) options = { connectionStrategy: options };
				return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
			}
			exports$43.createProtocolConnection = createProtocolConnection;
		}));
		var require_api = /* @__PURE__ */ __commonJSMin(((exports$44) => {
			var __createBinding = exports$44 && exports$44.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
			var __exportStar = exports$44 && exports$44.__exportStar || function(m, exports$3) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$3, p)) __createBinding(exports$3, m, p);
			};
			Object.defineProperty(exports$44, "__esModule", { value: true });
			exports$44.LSPErrorCodes = exports$44.createProtocolConnection = void 0;
			__exportStar(require_main$1(), exports$44);
			__exportStar((init_main(), __toCommonJS(main_exports)), exports$44);
			__exportStar(require_messages(), exports$44);
			__exportStar(require_protocol(), exports$44);
			var connection_1 = require_connection();
			Object.defineProperty(exports$44, "createProtocolConnection", {
				enumerable: true,
				get: function() {
					return connection_1.createProtocolConnection;
				}
			});
			var LSPErrorCodes;
			(function(LSPErrorCodes) {
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
			})(LSPErrorCodes || (exports$44.LSPErrorCodes = LSPErrorCodes = {}));
		}));
		var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports$45) => {
			var __createBinding = exports$45 && exports$45.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
			var __exportStar = exports$45 && exports$45.__exportStar || function(m, exports$2) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
			};
			Object.defineProperty(exports$45, "__esModule", { value: true });
			exports$45.createProtocolConnection = void 0;
			var browser_1 = require_browser();
			__exportStar(require_browser(), exports$45);
			__exportStar(require_api(), exports$45);
			function createProtocolConnection(reader, writer, logger, options) {
				return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
			}
			exports$45.createProtocolConnection = createProtocolConnection;
		})))());
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
		(function(TextDocument) {
			/**
			* Creates a new text document.
			*
			* @param uri The document's uri.
			* @param languageId  The document's language Id.
			* @param version The document's initial version number.
			* @param content The document's content.
			*/
			function create(uri, languageId, version, content) {
				return new FullTextDocument(uri, languageId, version, content);
			}
			TextDocument.create = create;
			/**
			* Updates a TextDocument by modifying its content.
			*
			* @param document the document to update. Only documents created by TextDocument.create are valid inputs.
			* @param changes the changes to apply to the document.
			* @param version the changes version for the document.
			* @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
			*
			*/
			function update(document, changes, version) {
				if (document instanceof FullTextDocument) {
					document.update(changes, version);
					return document;
				} else throw new Error("TextDocument.update: document must be created by TextDocument.create");
			}
			TextDocument.update = update;
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
			TextDocument.applyEdits = applyEdits;
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
		var global;
		var init_dist = __esmMin((() => {
			global = globalThis || self;
		}));
		var import_luaparse = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports$46, module$2) => {
			init_dist();
			(function(root, name, factory) {
				"use strict";
				var objectTypes = {
					"function": true,
					"object": true
				}, freeExports = objectTypes[typeof exports$46] && exports$46 && !exports$46.nodeType && exports$46, freeModule = objectTypes[typeof module$2] && module$2 && !module$2.nodeType && module$2, freeGlobal = freeExports && freeModule && typeof global === "object" && global, moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
				/* istanbul ignore else */
				if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) root = freeGlobal;
				/* istanbul ignore if */
				if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
					define(["exports"], factory);
					if (freeExports && moduleExports) factory(freeModule.exports);
				} else if (freeExports && freeModule)
 /* istanbul ignore else */
				if (moduleExports) factory(freeModule.exports);
				else factory(freeExports);
				else factory(root[name] = {});
			})(exports$46, "luaparse", function(exports$1) {
				"use strict";
				exports$1.version = "0.3.1";
				var input, options, length, features, encodingMode;
				var defaultOptions = exports$1.defaultOptions = {
					wait: false,
					comments: true,
					scope: false,
					locations: false,
					ranges: false,
					onCreateNode: null,
					onCreateScope: null,
					onDestroyScope: null,
					onLocalDeclaration: null,
					luaVersion: "5.1",
					encodingMode: "none"
				};
				function encodeUTF8(codepoint, highMask) {
					highMask = highMask || 0;
					if (codepoint < 128) return String.fromCharCode(codepoint);
					else if (codepoint < 2048) return String.fromCharCode(highMask | 192 | codepoint >> 6, highMask | 128 | codepoint & 63);
					else if (codepoint < 65536) return String.fromCharCode(highMask | 224 | codepoint >> 12, highMask | 128 | codepoint >> 6 & 63, highMask | 128 | codepoint & 63);
					else if (codepoint < 1114112) return String.fromCharCode(highMask | 240 | codepoint >> 18, highMask | 128 | codepoint >> 12 & 63, highMask | 128 | codepoint >> 6 & 63, highMask | 128 | codepoint & 63);
					else return null;
				}
				function toHex(num, digits) {
					var result = num.toString(16);
					while (result.length < digits) result = "0" + result;
					return result;
				}
				function checkChars(rx) {
					return function(s) {
						var m = rx.exec(s);
						if (!m) return s;
						raise(null, errors.invalidCodeUnit, toHex(m[0].charCodeAt(0), 4).toUpperCase());
					};
				}
				var encodingModes = {
					"pseudo-latin1": {
						fixup: checkChars(/[^\x00-\xff]/),
						encodeByte: function(value) {
							if (value === null) return "";
							return String.fromCharCode(value);
						},
						encodeUTF8: function(codepoint) {
							return encodeUTF8(codepoint);
						}
					},
					"x-user-defined": {
						fixup: checkChars(/[^\x00-\x7f\uf780-\uf7ff]/),
						encodeByte: function(value) {
							if (value === null) return "";
							if (value >= 128) return String.fromCharCode(value | 63232);
							return String.fromCharCode(value);
						},
						encodeUTF8: function(codepoint) {
							return encodeUTF8(codepoint, 63232);
						}
					},
					"none": {
						discardStrings: true,
						fixup: function(s) {
							return s;
						},
						encodeByte: function(value) {
							return "";
						},
						encodeUTF8: function(codepoint) {
							return "";
						}
					}
				};
				var EOF = 1, StringLiteral = 2, Keyword = 4, Identifier = 8, NumericLiteral = 16, Punctuator = 32, BooleanLiteral = 64, NilLiteral = 128, VarargLiteral = 256;
				exports$1.tokenTypes = {
					EOF,
					StringLiteral,
					Keyword,
					Identifier,
					NumericLiteral,
					Punctuator,
					BooleanLiteral,
					NilLiteral,
					VarargLiteral
				};
				var errors = exports$1.errors = {
					unexpected: "unexpected %1 '%2' near '%3'",
					unexpectedEOF: "unexpected symbol near '<eof>'",
					expected: "'%1' expected near '%2'",
					expectedToken: "%1 expected near '%2'",
					unfinishedString: "unfinished string near '%1'",
					malformedNumber: "malformed number near '%1'",
					decimalEscapeTooLarge: "decimal escape too large near '%1'",
					invalidEscape: "invalid escape sequence near '%1'",
					hexadecimalDigitExpected: "hexadecimal digit expected near '%1'",
					braceExpected: "missing '%1' near '%2'",
					tooLargeCodepoint: "UTF-8 value too large near '%1'",
					unfinishedLongString: "unfinished long string (starting at line %1) near '%2'",
					unfinishedLongComment: "unfinished long comment (starting at line %1) near '%2'",
					ambiguousSyntax: "ambiguous syntax (function call x new statement) near '%1'",
					noLoopToBreak: "no loop to break near '%1'",
					labelAlreadyDefined: "label '%1' already defined on line %2",
					labelNotVisible: "no visible label '%1' for <goto>",
					gotoJumpInLocalScope: "<goto %1> jumps into the scope of local '%2'",
					cannotUseVararg: "cannot use '...' outside a vararg function near '%1'",
					invalidCodeUnit: "code unit U+%1 is not allowed in the current encoding mode"
				};
				var ast = exports$1.ast = {
					labelStatement: function(label) {
						return {
							type: "LabelStatement",
							label
						};
					},
					breakStatement: function() {
						return { type: "BreakStatement" };
					},
					gotoStatement: function(label) {
						return {
							type: "GotoStatement",
							label
						};
					},
					returnStatement: function(args) {
						return {
							type: "ReturnStatement",
							"arguments": args
						};
					},
					ifStatement: function(clauses) {
						return {
							type: "IfStatement",
							clauses
						};
					},
					ifClause: function(condition, body) {
						return {
							type: "IfClause",
							condition,
							body
						};
					},
					elseifClause: function(condition, body) {
						return {
							type: "ElseifClause",
							condition,
							body
						};
					},
					elseClause: function(body) {
						return {
							type: "ElseClause",
							body
						};
					},
					whileStatement: function(condition, body) {
						return {
							type: "WhileStatement",
							condition,
							body
						};
					},
					doStatement: function(body) {
						return {
							type: "DoStatement",
							body
						};
					},
					repeatStatement: function(condition, body) {
						return {
							type: "RepeatStatement",
							condition,
							body
						};
					},
					localStatement: function(variables, init) {
						return {
							type: "LocalStatement",
							variables,
							init
						};
					},
					assignmentStatement: function(variables, init) {
						return {
							type: "AssignmentStatement",
							variables,
							init
						};
					},
					callStatement: function(expression) {
						return {
							type: "CallStatement",
							expression
						};
					},
					functionStatement: function(identifier, parameters, isLocal, body) {
						return {
							type: "FunctionDeclaration",
							identifier,
							isLocal,
							parameters,
							body
						};
					},
					forNumericStatement: function(variable, start, end, step, body) {
						return {
							type: "ForNumericStatement",
							variable,
							start,
							end,
							step,
							body
						};
					},
					forGenericStatement: function(variables, iterators, body) {
						return {
							type: "ForGenericStatement",
							variables,
							iterators,
							body
						};
					},
					chunk: function(body) {
						return {
							type: "Chunk",
							body
						};
					},
					identifier: function(name) {
						return {
							type: "Identifier",
							name
						};
					},
					literal: function(type, value, raw) {
						type = type === StringLiteral ? "StringLiteral" : type === NumericLiteral ? "NumericLiteral" : type === BooleanLiteral ? "BooleanLiteral" : type === NilLiteral ? "NilLiteral" : "VarargLiteral";
						return {
							type,
							value,
							raw
						};
					},
					tableKey: function(key, value) {
						return {
							type: "TableKey",
							key,
							value
						};
					},
					tableKeyString: function(key, value) {
						return {
							type: "TableKeyString",
							key,
							value
						};
					},
					tableValue: function(value) {
						return {
							type: "TableValue",
							value
						};
					},
					tableConstructorExpression: function(fields) {
						return {
							type: "TableConstructorExpression",
							fields
						};
					},
					binaryExpression: function(operator, left, right) {
						return {
							type: "and" === operator || "or" === operator ? "LogicalExpression" : "BinaryExpression",
							operator,
							left,
							right
						};
					},
					unaryExpression: function(operator, argument) {
						return {
							type: "UnaryExpression",
							operator,
							argument
						};
					},
					memberExpression: function(base, indexer, identifier) {
						return {
							type: "MemberExpression",
							indexer,
							identifier,
							base
						};
					},
					indexExpression: function(base, index) {
						return {
							type: "IndexExpression",
							base,
							index
						};
					},
					callExpression: function(base, args) {
						return {
							type: "CallExpression",
							base,
							"arguments": args
						};
					},
					tableCallExpression: function(base, args) {
						return {
							type: "TableCallExpression",
							base,
							"arguments": args
						};
					},
					stringCallExpression: function(base, argument) {
						return {
							type: "StringCallExpression",
							base,
							argument
						};
					},
					comment: function(value, raw) {
						return {
							type: "Comment",
							value,
							raw
						};
					}
				};
				function finishNode(node) {
					if (trackLocations) {
						var location = locations.pop();
						location.complete();
						location.bless(node);
					}
					if (options.onCreateNode) options.onCreateNode(node);
					return node;
				}
				var slice = Array.prototype.slice;
				Object.prototype.toString;
				var indexOf = function(array, element) {
					for (var i = 0, length = array.length; i < length; ++i) if (array[i] === element) return i;
					return -1;
				};
				/* istanbul ignore else */
				if (Array.prototype.indexOf) indexOf = function(array, element) {
					return array.indexOf(element);
				};
				function indexOfObject(array, property, element) {
					for (var i = 0, length = array.length; i < length; ++i) if (array[i][property] === element) return i;
					return -1;
				}
				function sprintf(format) {
					var args = slice.call(arguments, 1);
					format = format.replace(/%(\d)/g, function(match, index) {
						return "" + args[index - 1] || "";
					});
					return format;
				}
				var assign = function(dest) {
					var args = slice.call(arguments, 1), src, prop;
					for (var i = 0, length = args.length; i < length; ++i) {
						src = args[i];
						for (prop in src)
 /* istanbul ignore else */
						if (Object.prototype.hasOwnProperty.call(src, prop)) dest[prop] = src[prop];
					}
					return dest;
				};
				/* istanbul ignore else */
				if (Object.assign) assign = Object.assign;
				exports$1.SyntaxError = SyntaxError;
				function fixupError(e) {
					/* istanbul ignore if */
					if (!Object.create) return e;
					return Object.create(e, {
						"line": {
							"writable": true,
							value: e.line
						},
						"index": {
							"writable": true,
							value: e.index
						},
						"column": {
							"writable": true,
							value: e.column
						}
					});
				}
				function raise(token) {
					var message = sprintf.apply(null, slice.call(arguments, 1)), error, col;
					if (token === null || typeof token.line === "undefined") {
						col = index - lineStart + 1;
						error = fixupError(new SyntaxError(sprintf("[%1:%2] %3", line, col, message)));
						error.index = index;
						error.line = line;
						error.column = col;
					} else {
						col = token.range[0] - token.lineStart;
						error = fixupError(new SyntaxError(sprintf("[%1:%2] %3", token.line, col, message)));
						error.line = token.line;
						error.index = token.range[0];
						error.column = col;
					}
					throw error;
				}
				function tokenValue(token) {
					var raw = input.slice(token.range[0], token.range[1]);
					if (raw) return raw;
					return token.value;
				}
				function raiseUnexpectedToken(type, token) {
					raise(token, errors.expectedToken, type, tokenValue(token));
				}
				function unexpected(found) {
					var near = tokenValue(lookahead);
					if ("undefined" !== typeof found.type) {
						var type;
						switch (found.type) {
							case StringLiteral:
								type = "string";
								break;
							case Keyword:
								type = "keyword";
								break;
							case Identifier:
								type = "identifier";
								break;
							case NumericLiteral:
								type = "number";
								break;
							case Punctuator:
								type = "symbol";
								break;
							case BooleanLiteral:
								type = "boolean";
								break;
							case NilLiteral: return raise(found, errors.unexpected, "symbol", "nil", near);
							case EOF: return raise(found, errors.unexpectedEOF);
						}
						return raise(found, errors.unexpected, type, tokenValue(found), near);
					}
					return raise(found, errors.unexpected, "symbol", found, near);
				}
				var index, token, previousToken, lookahead, comments, tokenStart, line, lineStart;
				exports$1.lex = lex;
				function lex() {
					skipWhiteSpace();
					while (45 === input.charCodeAt(index) && 45 === input.charCodeAt(index + 1)) {
						scanComment();
						skipWhiteSpace();
					}
					if (index >= length) return {
						type: EOF,
						value: "<eof>",
						line,
						lineStart,
						range: [index, index]
					};
					var charCode = input.charCodeAt(index), next = input.charCodeAt(index + 1);
					tokenStart = index;
					if (isIdentifierStart(charCode)) return scanIdentifierOrKeyword();
					switch (charCode) {
						case 39:
						case 34: return scanStringLiteral();
						case 48:
						case 49:
						case 50:
						case 51:
						case 52:
						case 53:
						case 54:
						case 55:
						case 56:
						case 57: return scanNumericLiteral();
						case 46:
							if (isDecDigit(next)) return scanNumericLiteral();
							if (46 === next) {
								if (46 === input.charCodeAt(index + 2)) return scanVarargLiteral();
								return scanPunctuator("..");
							}
							return scanPunctuator(".");
						case 61:
							if (61 === next) return scanPunctuator("==");
							return scanPunctuator("=");
						case 62:
							if (features.bitwiseOperators) {
								if (62 === next) return scanPunctuator(">>");
							}
							if (61 === next) return scanPunctuator(">=");
							return scanPunctuator(">");
						case 60:
							if (features.bitwiseOperators) {
								if (60 === next) return scanPunctuator("<<");
							}
							if (61 === next) return scanPunctuator("<=");
							return scanPunctuator("<");
						case 126:
							if (61 === next) return scanPunctuator("~=");
							if (!features.bitwiseOperators) break;
							return scanPunctuator("~");
						case 58:
							if (features.labels) {
								if (58 === next) return scanPunctuator("::");
							}
							return scanPunctuator(":");
						case 91:
							if (91 === next || 61 === next) return scanLongStringLiteral();
							return scanPunctuator("[");
						case 47:
							if (features.integerDivision) {
								if (47 === next) return scanPunctuator("//");
							}
							return scanPunctuator("/");
						case 38:
						case 124: if (!features.bitwiseOperators) break;
						case 42:
						case 94:
						case 37:
						case 44:
						case 123:
						case 125:
						case 93:
						case 40:
						case 41:
						case 59:
						case 35:
						case 45:
						case 43: return scanPunctuator(input.charAt(index));
					}
					return unexpected(input.charAt(index));
				}
				function consumeEOL() {
					var charCode = input.charCodeAt(index), peekCharCode = input.charCodeAt(index + 1);
					if (isLineTerminator(charCode)) {
						if (10 === charCode && 13 === peekCharCode) ++index;
						if (13 === charCode && 10 === peekCharCode) ++index;
						++line;
						lineStart = ++index;
						return true;
					}
					return false;
				}
				function skipWhiteSpace() {
					while (index < length) if (isWhiteSpace(input.charCodeAt(index))) ++index;
					else if (!consumeEOL()) break;
				}
				function scanIdentifierOrKeyword() {
					var value, type;
					while (isIdentifierPart(input.charCodeAt(++index)));
					value = encodingMode.fixup(input.slice(tokenStart, index));
					if (isKeyword(value)) type = Keyword;
					else if ("true" === value || "false" === value) {
						type = BooleanLiteral;
						value = "true" === value;
					} else if ("nil" === value) {
						type = NilLiteral;
						value = null;
					} else type = Identifier;
					return {
						type,
						value,
						line,
						lineStart,
						range: [tokenStart, index]
					};
				}
				function scanPunctuator(value) {
					index += value.length;
					return {
						type: Punctuator,
						value,
						line,
						lineStart,
						range: [tokenStart, index]
					};
				}
				function scanVarargLiteral() {
					index += 3;
					return {
						type: VarargLiteral,
						value: "...",
						line,
						lineStart,
						range: [tokenStart, index]
					};
				}
				function scanStringLiteral() {
					var delimiter = input.charCodeAt(index++), beginLine = line, beginLineStart = lineStart, stringStart = index, string = encodingMode.discardStrings ? null : "", charCode;
					for (;;) {
						charCode = input.charCodeAt(index++);
						if (delimiter === charCode) break;
						if (index > length || isLineTerminator(charCode)) {
							string += input.slice(stringStart, index - 1);
							raise(null, errors.unfinishedString, input.slice(tokenStart, index - 1));
						}
						if (92 === charCode) {
							if (!encodingMode.discardStrings) {
								var beforeEscape = input.slice(stringStart, index - 1);
								string += encodingMode.fixup(beforeEscape);
							}
							var escapeValue = readEscapeSequence();
							if (!encodingMode.discardStrings) string += escapeValue;
							stringStart = index;
						}
					}
					if (!encodingMode.discardStrings) {
						string += encodingMode.encodeByte(null);
						string += encodingMode.fixup(input.slice(stringStart, index - 1));
					}
					return {
						type: StringLiteral,
						value: string,
						line: beginLine,
						lineStart: beginLineStart,
						lastLine: line,
						lastLineStart: lineStart,
						range: [tokenStart, index]
					};
				}
				function scanLongStringLiteral() {
					var beginLine = line, beginLineStart = lineStart, string = readLongString(false);
					if (false === string) raise(token, errors.expected, "[", tokenValue(token));
					return {
						type: StringLiteral,
						value: encodingMode.discardStrings ? null : encodingMode.fixup(string),
						line: beginLine,
						lineStart: beginLineStart,
						lastLine: line,
						lastLineStart: lineStart,
						range: [tokenStart, index]
					};
				}
				function scanNumericLiteral() {
					var character = input.charAt(index), next = input.charAt(index + 1);
					var literal = "0" === character && "xX".indexOf(next || null) >= 0 ? readHexLiteral() : readDecLiteral();
					var foundImaginaryUnit = readImaginaryUnitSuffix();
					if (readInt64Suffix() && (foundImaginaryUnit || literal.hasFractionPart)) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
					return {
						type: NumericLiteral,
						value: literal.value,
						line,
						lineStart,
						range: [tokenStart, index]
					};
				}
				function readImaginaryUnitSuffix() {
					if (!features.imaginaryNumbers) return;
					if ("iI".indexOf(input.charAt(index) || null) >= 0) {
						++index;
						return true;
					} else return false;
				}
				function readInt64Suffix() {
					if (!features.integerSuffixes) return;
					if ("uU".indexOf(input.charAt(index) || null) >= 0) {
						++index;
						if ("lL".indexOf(input.charAt(index) || null) >= 0) {
							++index;
							if ("lL".indexOf(input.charAt(index) || null) >= 0) {
								++index;
								return "ULL";
							} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
						} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
					} else if ("lL".indexOf(input.charAt(index) || null) >= 0) {
						++index;
						if ("lL".indexOf(input.charAt(index) || null) >= 0) {
							++index;
							return "LL";
						} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
					}
				}
				function readHexLiteral() {
					var fraction = 0, binaryExponent = 1, binarySign = 1, digit, fractionStart, exponentStart, digitStart = index += 2;
					if (!isHexDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
					while (isHexDigit(input.charCodeAt(index))) ++index;
					digit = parseInt(input.slice(digitStart, index), 16);
					var foundFraction = false;
					if ("." === input.charAt(index)) {
						foundFraction = true;
						fractionStart = ++index;
						while (isHexDigit(input.charCodeAt(index))) ++index;
						fraction = input.slice(fractionStart, index);
						fraction = fractionStart === index ? 0 : parseInt(fraction, 16) / Math.pow(16, index - fractionStart);
					}
					var foundBinaryExponent = false;
					if ("pP".indexOf(input.charAt(index) || null) >= 0) {
						foundBinaryExponent = true;
						++index;
						if ("+-".indexOf(input.charAt(index) || null) >= 0) binarySign = "+" === input.charAt(index++) ? 1 : -1;
						exponentStart = index;
						if (!isDecDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
						while (isDecDigit(input.charCodeAt(index))) ++index;
						binaryExponent = input.slice(exponentStart, index);
						binaryExponent = Math.pow(2, binaryExponent * binarySign);
					}
					return {
						value: (digit + fraction) * binaryExponent,
						hasFractionPart: foundFraction || foundBinaryExponent
					};
				}
				function readDecLiteral() {
					while (isDecDigit(input.charCodeAt(index))) ++index;
					var foundFraction = false;
					if ("." === input.charAt(index)) {
						foundFraction = true;
						++index;
						while (isDecDigit(input.charCodeAt(index))) ++index;
					}
					var foundExponent = false;
					if ("eE".indexOf(input.charAt(index) || null) >= 0) {
						foundExponent = true;
						++index;
						if ("+-".indexOf(input.charAt(index) || null) >= 0) ++index;
						if (!isDecDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
						while (isDecDigit(input.charCodeAt(index))) ++index;
					}
					return {
						value: parseFloat(input.slice(tokenStart, index)),
						hasFractionPart: foundFraction || foundExponent
					};
				}
				function readUnicodeEscapeSequence() {
					var sequenceStart = index++;
					if (input.charAt(index++) !== "{") raise(null, errors.braceExpected, "{", "\\" + input.slice(sequenceStart, index));
					if (!isHexDigit(input.charCodeAt(index))) raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index));
					while (input.charCodeAt(index) === 48) ++index;
					var escStart = index;
					while (isHexDigit(input.charCodeAt(index))) {
						++index;
						if (index - escStart > 6) raise(null, errors.tooLargeCodepoint, "\\" + input.slice(sequenceStart, index));
					}
					var b = input.charAt(index++);
					if (b !== "}") if (b === "\"" || b === "'") raise(null, errors.braceExpected, "}", "\\" + input.slice(sequenceStart, index--));
					else raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index));
					var codepoint = parseInt(input.slice(escStart, index - 1) || "0", 16);
					var frag = "\\" + input.slice(sequenceStart, index);
					if (codepoint > 1114111) raise(null, errors.tooLargeCodepoint, frag);
					return encodingMode.encodeUTF8(codepoint, frag);
				}
				function readEscapeSequence() {
					var sequenceStart = index;
					switch (input.charAt(index)) {
						case "a":
							++index;
							return "\x07";
						case "n":
							++index;
							return "\n";
						case "r":
							++index;
							return "\r";
						case "t":
							++index;
							return "	";
						case "v":
							++index;
							return "\v";
						case "b":
							++index;
							return "\b";
						case "f":
							++index;
							return "\f";
						case "\r":
						case "\n":
							consumeEOL();
							return "\n";
						case "0":
						case "1":
						case "2":
						case "3":
						case "4":
						case "5":
						case "6":
						case "7":
						case "8":
						case "9":
							while (isDecDigit(input.charCodeAt(index)) && index - sequenceStart < 3) ++index;
							var frag = input.slice(sequenceStart, index);
							var ddd = parseInt(frag, 10);
							if (ddd > 255) raise(null, errors.decimalEscapeTooLarge, "\\" + ddd);
							return encodingMode.encodeByte(ddd, "\\" + frag);
						case "z":
							if (features.skipWhitespaceEscape) {
								++index;
								skipWhiteSpace();
								return "";
							}
							break;
						case "x":
							if (features.hexEscapes) {
								if (isHexDigit(input.charCodeAt(index + 1)) && isHexDigit(input.charCodeAt(index + 2))) {
									index += 3;
									return encodingMode.encodeByte(parseInt(input.slice(sequenceStart + 1, index), 16), "\\" + input.slice(sequenceStart, index));
								}
								raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index + 2));
							}
							break;
						case "u":
							if (features.unicodeEscapes) return readUnicodeEscapeSequence();
							break;
						case "\\":
						case "\"":
						case "'": return input.charAt(index++);
					}
					if (features.strictEscapes) raise(null, errors.invalidEscape, "\\" + input.slice(sequenceStart, index + 1));
					return input.charAt(index++);
				}
				function scanComment() {
					tokenStart = index;
					index += 2;
					var character = input.charAt(index), content = "", isLong = false, commentStart = index, lineStartComment = lineStart, lineComment = line;
					if ("[" === character) {
						content = readLongString(true);
						if (false === content) content = character;
						else isLong = true;
					}
					if (!isLong) {
						while (index < length) {
							if (isLineTerminator(input.charCodeAt(index))) break;
							++index;
						}
						if (options.comments) content = input.slice(commentStart, index);
					}
					if (options.comments) {
						var node = ast.comment(content, input.slice(tokenStart, index));
						if (options.locations) node.loc = {
							start: {
								line: lineComment,
								column: tokenStart - lineStartComment
							},
							end: {
								line,
								column: index - lineStart
							}
						};
						if (options.ranges) node.range = [tokenStart, index];
						if (options.onCreateNode) options.onCreateNode(node);
						comments.push(node);
					}
				}
				function readLongString(isComment) {
					var level = 0, content = "", terminator = false, character, stringStart, firstLine = line;
					++index;
					while ("=" === input.charAt(index + level)) ++level;
					if ("[" !== input.charAt(index + level)) return false;
					index += level + 1;
					if (isLineTerminator(input.charCodeAt(index))) consumeEOL();
					stringStart = index;
					while (index < length) {
						while (isLineTerminator(input.charCodeAt(index))) consumeEOL();
						character = input.charAt(index++);
						if ("]" === character) {
							terminator = true;
							for (var i = 0; i < level; ++i) if ("=" !== input.charAt(index + i)) terminator = false;
							if ("]" !== input.charAt(index + level)) terminator = false;
						}
						if (terminator) {
							content += input.slice(stringStart, index - 1);
							index += level + 1;
							return content;
						}
					}
					raise(null, isComment ? errors.unfinishedLongComment : errors.unfinishedLongString, firstLine, "<eof>");
				}
				function next() {
					previousToken = token;
					token = lookahead;
					lookahead = lex();
				}
				function consume(value) {
					if (value === token.value) {
						next();
						return true;
					}
					return false;
				}
				function expect(value) {
					if (value === token.value) next();
					else raise(token, errors.expected, value, tokenValue(token));
				}
				function isWhiteSpace(charCode) {
					return 9 === charCode || 32 === charCode || 11 === charCode || 12 === charCode;
				}
				function isLineTerminator(charCode) {
					return 10 === charCode || 13 === charCode;
				}
				function isDecDigit(charCode) {
					return charCode >= 48 && charCode <= 57;
				}
				function isHexDigit(charCode) {
					return charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70;
				}
				function isIdentifierStart(charCode) {
					if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || 95 === charCode) return true;
					if (features.extendedIdentifiers && charCode >= 128) return true;
					return false;
				}
				function isIdentifierPart(charCode) {
					if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || 95 === charCode || charCode >= 48 && charCode <= 57) return true;
					if (features.extendedIdentifiers && charCode >= 128) return true;
					return false;
				}
				function isKeyword(id) {
					switch (id.length) {
						case 2: return "do" === id || "if" === id || "in" === id || "or" === id;
						case 3: return "and" === id || "end" === id || "for" === id || "not" === id;
						case 4:
							if ("else" === id || "then" === id) return true;
							if (features.labels && !features.contextualGoto) return "goto" === id;
							return false;
						case 5: return "break" === id || "local" === id || "until" === id || "while" === id;
						case 6: return "elseif" === id || "repeat" === id || "return" === id;
						case 8: return "function" === id;
					}
					return false;
				}
				function isUnary(token) {
					if (Punctuator === token.type) return "#-~".indexOf(token.value) >= 0;
					if (Keyword === token.type) return "not" === token.value;
					return false;
				}
				function isBlockFollow(token) {
					if (EOF === token.type) return true;
					if (Keyword !== token.type) return false;
					switch (token.value) {
						case "else":
						case "elseif":
						case "end":
						case "until": return true;
						default: return false;
					}
				}
				var scopes, scopeDepth, globals;
				function createScope() {
					var scope = scopes[scopeDepth++].slice();
					scopes.push(scope);
					if (options.onCreateScope) options.onCreateScope();
				}
				function destroyScope() {
					scopes.pop();
					--scopeDepth;
					if (options.onDestroyScope) options.onDestroyScope();
				}
				function scopeIdentifierName(name) {
					if (options.onLocalDeclaration) options.onLocalDeclaration(name);
					if (-1 !== indexOf(scopes[scopeDepth], name)) return;
					scopes[scopeDepth].push(name);
				}
				function scopeIdentifier(node) {
					scopeIdentifierName(node.name);
					attachScope(node, true);
				}
				function attachScope(node, isLocal) {
					if (!isLocal && -1 === indexOfObject(globals, "name", node.name)) globals.push(node);
					node.isLocal = isLocal;
				}
				function scopeHasName(name) {
					return -1 !== indexOf(scopes[scopeDepth], name);
				}
				var locations = [], trackLocations;
				function createLocationMarker() {
					return new Marker(token);
				}
				function Marker(token) {
					if (options.locations) this.loc = {
						start: {
							line: token.line,
							column: token.range[0] - token.lineStart
						},
						end: {
							line: 0,
							column: 0
						}
					};
					if (options.ranges) this.range = [token.range[0], 0];
				}
				Marker.prototype.complete = function() {
					if (options.locations) {
						this.loc.end.line = previousToken.lastLine || previousToken.line;
						this.loc.end.column = previousToken.range[1] - (previousToken.lastLineStart || previousToken.lineStart);
					}
					if (options.ranges) this.range[1] = previousToken.range[1];
				};
				Marker.prototype.bless = function(node) {
					if (this.loc) {
						var loc = this.loc;
						node.loc = {
							start: {
								line: loc.start.line,
								column: loc.start.column
							},
							end: {
								line: loc.end.line,
								column: loc.end.column
							}
						};
					}
					if (this.range) node.range = [this.range[0], this.range[1]];
				};
				function markLocation() {
					if (trackLocations) locations.push(createLocationMarker());
				}
				function pushLocation(marker) {
					if (trackLocations) locations.push(marker);
				}
				function FullFlowContext() {
					this.scopes = [];
					this.pendingGotos = [];
				}
				FullFlowContext.prototype.isInLoop = function() {
					var i = this.scopes.length;
					while (i-- > 0) if (this.scopes[i].isLoop) return true;
					return false;
				};
				FullFlowContext.prototype.pushScope = function(isLoop) {
					var scope = {
						labels: {},
						locals: [],
						deferredGotos: [],
						isLoop: !!isLoop
					};
					this.scopes.push(scope);
				};
				FullFlowContext.prototype.popScope = function() {
					for (var i = 0; i < this.pendingGotos.length; ++i) {
						var theGoto = this.pendingGotos[i];
						if (theGoto.maxDepth >= this.scopes.length) {
							if (--theGoto.maxDepth <= 0) raise(theGoto.token, errors.labelNotVisible, theGoto.target);
						}
					}
					this.scopes.pop();
				};
				FullFlowContext.prototype.addGoto = function(target, token) {
					var localCounts = [];
					for (var i = 0; i < this.scopes.length; ++i) {
						var scope = this.scopes[i];
						localCounts.push(scope.locals.length);
						if (Object.prototype.hasOwnProperty.call(scope.labels, target)) return;
					}
					this.pendingGotos.push({
						maxDepth: this.scopes.length,
						target,
						token,
						localCounts
					});
				};
				FullFlowContext.prototype.addLabel = function(name, token) {
					var scope = this.currentScope();
					if (Object.prototype.hasOwnProperty.call(scope.labels, name)) raise(token, errors.labelAlreadyDefined, name, scope.labels[name].line);
					else {
						var newGotos = [];
						for (var i = 0; i < this.pendingGotos.length; ++i) {
							var theGoto = this.pendingGotos[i];
							if (theGoto.maxDepth >= this.scopes.length && theGoto.target === name) {
								if (theGoto.localCounts[this.scopes.length - 1] < scope.locals.length) scope.deferredGotos.push(theGoto);
								continue;
							}
							newGotos.push(theGoto);
						}
						this.pendingGotos = newGotos;
					}
					scope.labels[name] = {
						localCount: scope.locals.length,
						line: token.line
					};
				};
				FullFlowContext.prototype.addLocal = function(name, token) {
					this.currentScope().locals.push({
						name,
						token
					});
				};
				FullFlowContext.prototype.currentScope = function() {
					return this.scopes[this.scopes.length - 1];
				};
				FullFlowContext.prototype.raiseDeferredErrors = function() {
					var scope = this.currentScope();
					var bads = scope.deferredGotos;
					for (var i = 0; i < bads.length; ++i) {
						var theGoto = bads[i];
						raise(theGoto.token, errors.gotoJumpInLocalScope, theGoto.target, scope.locals[theGoto.localCounts[this.scopes.length - 1]].name);
					}
				};
				function LoopFlowContext() {
					this.level = 0;
					this.loopLevels = [];
				}
				LoopFlowContext.prototype.isInLoop = function() {
					return !!this.loopLevels.length;
				};
				LoopFlowContext.prototype.pushScope = function(isLoop) {
					++this.level;
					if (isLoop) this.loopLevels.push(this.level);
				};
				LoopFlowContext.prototype.popScope = function() {
					var levels = this.loopLevels;
					var levlen = levels.length;
					if (levlen) {
						if (levels[levlen - 1] === this.level) levels.pop();
					}
					--this.level;
				};
				LoopFlowContext.prototype.addGoto = LoopFlowContext.prototype.addLabel = function() {
					throw new Error("This should never happen");
				};
				LoopFlowContext.prototype.addLocal = LoopFlowContext.prototype.raiseDeferredErrors = function() {};
				function makeFlowContext() {
					return features.labels ? new FullFlowContext() : new LoopFlowContext();
				}
				function parseChunk() {
					next();
					markLocation();
					if (options.scope) createScope();
					var flowContext = makeFlowContext();
					flowContext.allowVararg = true;
					flowContext.pushScope();
					var body = parseBlock(flowContext);
					flowContext.popScope();
					if (options.scope) destroyScope();
					if (EOF !== token.type) unexpected(token);
					if (trackLocations && !body.length) previousToken = token;
					return finishNode(ast.chunk(body));
				}
				function parseBlock(flowContext) {
					var block = [], statement;
					while (!isBlockFollow(token)) {
						if ("return" === token.value || !features.relaxedBreak && "break" === token.value) {
							block.push(parseStatement(flowContext));
							break;
						}
						statement = parseStatement(flowContext);
						consume(";");
						if (statement) block.push(statement);
					}
					return block;
				}
				function parseStatement(flowContext) {
					markLocation();
					if (Punctuator === token.type) {
						if (consume("::")) return parseLabelStatement(flowContext);
					}
					if (features.emptyStatement) {
						if (consume(";")) {
							if (trackLocations) locations.pop();
							return;
						}
					}
					flowContext.raiseDeferredErrors();
					if (Keyword === token.type) switch (token.value) {
						case "local":
							next();
							return parseLocalStatement(flowContext);
						case "if":
							next();
							return parseIfStatement(flowContext);
						case "return":
							next();
							return parseReturnStatement(flowContext);
						case "function":
							next();
							return parseFunctionDeclaration(parseFunctionName());
						case "while":
							next();
							return parseWhileStatement(flowContext);
						case "for":
							next();
							return parseForStatement(flowContext);
						case "repeat":
							next();
							return parseRepeatStatement(flowContext);
						case "break":
							next();
							if (!flowContext.isInLoop()) raise(token, errors.noLoopToBreak, token.value);
							return parseBreakStatement();
						case "do":
							next();
							return parseDoStatement(flowContext);
						case "goto":
							next();
							return parseGotoStatement(flowContext);
					}
					if (features.contextualGoto && token.type === Identifier && token.value === "goto" && lookahead.type === Identifier && lookahead.value !== "goto") {
						next();
						return parseGotoStatement(flowContext);
					}
					if (trackLocations) locations.pop();
					return parseAssignmentOrCallStatement(flowContext);
				}
				function parseLabelStatement(flowContext) {
					var nameToken = token, label = parseIdentifier();
					if (options.scope) {
						scopeIdentifierName("::" + nameToken.value + "::");
						attachScope(label, true);
					}
					expect("::");
					flowContext.addLabel(nameToken.value, nameToken);
					return finishNode(ast.labelStatement(label));
				}
				function parseBreakStatement() {
					return finishNode(ast.breakStatement());
				}
				function parseGotoStatement(flowContext) {
					var name = token.value, gotoToken = previousToken, label = parseIdentifier();
					flowContext.addGoto(name, gotoToken);
					return finishNode(ast.gotoStatement(label));
				}
				function parseDoStatement(flowContext) {
					if (options.scope) createScope();
					flowContext.pushScope();
					var body = parseBlock(flowContext);
					flowContext.popScope();
					if (options.scope) destroyScope();
					expect("end");
					return finishNode(ast.doStatement(body));
				}
				function parseWhileStatement(flowContext) {
					var condition = parseExpectedExpression(flowContext);
					expect("do");
					if (options.scope) createScope();
					flowContext.pushScope(true);
					var body = parseBlock(flowContext);
					flowContext.popScope();
					if (options.scope) destroyScope();
					expect("end");
					return finishNode(ast.whileStatement(condition, body));
				}
				function parseRepeatStatement(flowContext) {
					if (options.scope) createScope();
					flowContext.pushScope(true);
					var body = parseBlock(flowContext);
					expect("until");
					flowContext.raiseDeferredErrors();
					var condition = parseExpectedExpression(flowContext);
					flowContext.popScope();
					if (options.scope) destroyScope();
					return finishNode(ast.repeatStatement(condition, body));
				}
				function parseReturnStatement(flowContext) {
					var expressions = [];
					if ("end" !== token.value) {
						var expression = parseExpression(flowContext);
						if (null != expression) expressions.push(expression);
						while (consume(",")) {
							expression = parseExpectedExpression(flowContext);
							expressions.push(expression);
						}
						consume(";");
					}
					return finishNode(ast.returnStatement(expressions));
				}
				function parseIfStatement(flowContext) {
					var clauses = [], condition, body, marker;
					if (trackLocations) {
						marker = locations[locations.length - 1];
						locations.push(marker);
					}
					condition = parseExpectedExpression(flowContext);
					expect("then");
					if (options.scope) createScope();
					flowContext.pushScope();
					body = parseBlock(flowContext);
					flowContext.popScope();
					if (options.scope) destroyScope();
					clauses.push(finishNode(ast.ifClause(condition, body)));
					if (trackLocations) marker = createLocationMarker();
					while (consume("elseif")) {
						pushLocation(marker);
						condition = parseExpectedExpression(flowContext);
						expect("then");
						if (options.scope) createScope();
						flowContext.pushScope();
						body = parseBlock(flowContext);
						flowContext.popScope();
						if (options.scope) destroyScope();
						clauses.push(finishNode(ast.elseifClause(condition, body)));
						if (trackLocations) marker = createLocationMarker();
					}
					if (consume("else")) {
						if (trackLocations) {
							marker = new Marker(previousToken);
							locations.push(marker);
						}
						if (options.scope) createScope();
						flowContext.pushScope();
						body = parseBlock(flowContext);
						flowContext.popScope();
						if (options.scope) destroyScope();
						clauses.push(finishNode(ast.elseClause(body)));
					}
					expect("end");
					return finishNode(ast.ifStatement(clauses));
				}
				function parseForStatement(flowContext) {
					var variable = parseIdentifier(), body;
					if (options.scope) {
						createScope();
						scopeIdentifier(variable);
					}
					if (consume("=")) {
						var start = parseExpectedExpression(flowContext);
						expect(",");
						var end = parseExpectedExpression(flowContext);
						var step = consume(",") ? parseExpectedExpression(flowContext) : null;
						expect("do");
						flowContext.pushScope(true);
						body = parseBlock(flowContext);
						flowContext.popScope();
						expect("end");
						if (options.scope) destroyScope();
						return finishNode(ast.forNumericStatement(variable, start, end, step, body));
					} else {
						var variables = [variable];
						while (consume(",")) {
							variable = parseIdentifier();
							if (options.scope) scopeIdentifier(variable);
							variables.push(variable);
						}
						expect("in");
						var iterators = [];
						do {
							var expression = parseExpectedExpression(flowContext);
							iterators.push(expression);
						} while (consume(","));
						expect("do");
						flowContext.pushScope(true);
						body = parseBlock(flowContext);
						flowContext.popScope();
						expect("end");
						if (options.scope) destroyScope();
						return finishNode(ast.forGenericStatement(variables, iterators, body));
					}
				}
				function parseLocalStatement(flowContext) {
					var name, declToken = previousToken;
					if (Identifier === token.type) {
						var variables = [], init = [];
						do {
							name = parseIdentifier();
							variables.push(name);
							flowContext.addLocal(name.name, declToken);
						} while (consume(","));
						if (consume("=")) do {
							var expression = parseExpectedExpression(flowContext);
							init.push(expression);
						} while (consume(","));
						if (options.scope) for (var i = 0, l = variables.length; i < l; ++i) scopeIdentifier(variables[i]);
						return finishNode(ast.localStatement(variables, init));
					}
					if (consume("function")) {
						name = parseIdentifier();
						flowContext.addLocal(name.name, declToken);
						if (options.scope) {
							scopeIdentifier(name);
							createScope();
						}
						return parseFunctionDeclaration(name, true);
					} else raiseUnexpectedToken("<name>", token);
				}
				function parseAssignmentOrCallStatement(flowContext) {
					var marker, startMarker;
					var lvalue, base, name;
					var targets = [];
					if (trackLocations) startMarker = createLocationMarker();
					do {
						if (trackLocations) marker = createLocationMarker();
						if (Identifier === token.type) {
							name = token.value;
							base = parseIdentifier();
							if (options.scope) attachScope(base, scopeHasName(name));
							lvalue = true;
						} else if ("(" === token.value) {
							next();
							base = parseExpectedExpression(flowContext);
							expect(")");
							lvalue = false;
						} else return unexpected(token);
						both: for (;;) {
							switch (StringLiteral === token.type ? "\"" : token.value) {
								case ".":
								case "[":
									lvalue = true;
									break;
								case ":":
								case "(":
								case "{":
								case "\"":
									lvalue = null;
									break;
								default: break both;
							}
							base = parsePrefixExpressionPart(base, marker, flowContext);
						}
						targets.push(base);
						if ("," !== token.value) break;
						if (!lvalue) return unexpected(token);
						next();
					} while (true);
					if (targets.length === 1 && lvalue === null) {
						pushLocation(marker);
						return finishNode(ast.callStatement(targets[0]));
					} else if (!lvalue) return unexpected(token);
					expect("=");
					var values = [];
					do
						values.push(parseExpectedExpression(flowContext));
					while (consume(","));
					pushLocation(startMarker);
					return finishNode(ast.assignmentStatement(targets, values));
				}
				function parseIdentifier() {
					markLocation();
					var identifier = token.value;
					if (Identifier !== token.type) raiseUnexpectedToken("<name>", token);
					next();
					return finishNode(ast.identifier(identifier));
				}
				function parseFunctionDeclaration(name, isLocal) {
					var flowContext = makeFlowContext();
					flowContext.pushScope();
					var parameters = [];
					expect("(");
					if (!consume(")")) while (true) {
						if (Identifier === token.type) {
							var parameter = parseIdentifier();
							if (options.scope) scopeIdentifier(parameter);
							parameters.push(parameter);
							if (consume(",")) continue;
						} else if (VarargLiteral === token.type) {
							flowContext.allowVararg = true;
							parameters.push(parsePrimaryExpression(flowContext));
						} else raiseUnexpectedToken("<name> or '...'", token);
						expect(")");
						break;
					}
					var body = parseBlock(flowContext);
					flowContext.popScope();
					expect("end");
					if (options.scope) destroyScope();
					isLocal = isLocal || false;
					return finishNode(ast.functionStatement(name, parameters, isLocal, body));
				}
				function parseFunctionName() {
					var base, name, marker;
					if (trackLocations) marker = createLocationMarker();
					base = parseIdentifier();
					if (options.scope) {
						attachScope(base, scopeHasName(base.name));
						createScope();
					}
					while (consume(".")) {
						pushLocation(marker);
						name = parseIdentifier();
						base = finishNode(ast.memberExpression(base, ".", name));
					}
					if (consume(":")) {
						pushLocation(marker);
						name = parseIdentifier();
						base = finishNode(ast.memberExpression(base, ":", name));
						if (options.scope) scopeIdentifierName("self");
					}
					return base;
				}
				function parseTableConstructor(flowContext) {
					var fields = [], key, value;
					while (true) {
						markLocation();
						if (Punctuator === token.type && consume("[")) {
							key = parseExpectedExpression(flowContext);
							expect("]");
							expect("=");
							value = parseExpectedExpression(flowContext);
							fields.push(finishNode(ast.tableKey(key, value)));
						} else if (Identifier === token.type) if ("=" === lookahead.value) {
							key = parseIdentifier();
							next();
							value = parseExpectedExpression(flowContext);
							fields.push(finishNode(ast.tableKeyString(key, value)));
						} else {
							value = parseExpectedExpression(flowContext);
							fields.push(finishNode(ast.tableValue(value)));
						}
						else {
							if (null == (value = parseExpression(flowContext))) {
								locations.pop();
								break;
							}
							fields.push(finishNode(ast.tableValue(value)));
						}
						if (",;".indexOf(token.value) >= 0) {
							next();
							continue;
						}
						break;
					}
					expect("}");
					return finishNode(ast.tableConstructorExpression(fields));
				}
				function parseExpression(flowContext) {
					return parseSubExpression(0, flowContext);
				}
				function parseExpectedExpression(flowContext) {
					var expression = parseExpression(flowContext);
					if (null == expression) raiseUnexpectedToken("<expression>", token);
					else return expression;
				}
				function binaryPrecedence(operator) {
					var charCode = operator.charCodeAt(0), length = operator.length;
					if (1 === length) switch (charCode) {
						case 94: return 12;
						case 42:
						case 47:
						case 37: return 10;
						case 43:
						case 45: return 9;
						case 38: return 6;
						case 126: return 5;
						case 124: return 4;
						case 60:
						case 62: return 3;
					}
					else if (2 === length) switch (charCode) {
						case 47: return 10;
						case 46: return 8;
						case 60:
						case 62:
							if ("<<" === operator || ">>" === operator) return 7;
							return 3;
						case 61:
						case 126: return 3;
						case 111: return 1;
					}
					else if (97 === charCode && "and" === operator) return 2;
					return 0;
				}
				function parseSubExpression(minPrecedence, flowContext) {
					var operator = token.value, expression, marker;
					if (trackLocations) marker = createLocationMarker();
					if (isUnary(token)) {
						markLocation();
						next();
						var argument = parseSubExpression(10, flowContext);
						if (argument == null) raiseUnexpectedToken("<expression>", token);
						expression = finishNode(ast.unaryExpression(operator, argument));
					}
					if (null == expression) {
						expression = parsePrimaryExpression(flowContext);
						if (null == expression) expression = parsePrefixExpression(flowContext);
					}
					if (null == expression) return null;
					var precedence;
					while (true) {
						operator = token.value;
						precedence = Punctuator === token.type || Keyword === token.type ? binaryPrecedence(operator) : 0;
						if (precedence === 0 || precedence <= minPrecedence) break;
						if ("^" === operator || ".." === operator) --precedence;
						next();
						var right = parseSubExpression(precedence, flowContext);
						if (null == right) raiseUnexpectedToken("<expression>", token);
						if (trackLocations) locations.push(marker);
						expression = finishNode(ast.binaryExpression(operator, expression, right));
					}
					return expression;
				}
				function parsePrefixExpressionPart(base, marker, flowContext) {
					var expression, identifier;
					if (Punctuator === token.type) switch (token.value) {
						case "[":
							pushLocation(marker);
							next();
							expression = parseExpectedExpression(flowContext);
							expect("]");
							return finishNode(ast.indexExpression(base, expression));
						case ".":
							pushLocation(marker);
							next();
							identifier = parseIdentifier();
							return finishNode(ast.memberExpression(base, ".", identifier));
						case ":":
							pushLocation(marker);
							next();
							identifier = parseIdentifier();
							base = finishNode(ast.memberExpression(base, ":", identifier));
							pushLocation(marker);
							return parseCallExpression(base, flowContext);
						case "(":
						case "{":
							pushLocation(marker);
							return parseCallExpression(base, flowContext);
					}
					else if (StringLiteral === token.type) {
						pushLocation(marker);
						return parseCallExpression(base, flowContext);
					}
					return null;
				}
				function parsePrefixExpression(flowContext) {
					var base, name, marker;
					if (trackLocations) marker = createLocationMarker();
					if (Identifier === token.type) {
						name = token.value;
						base = parseIdentifier();
						if (options.scope) attachScope(base, scopeHasName(name));
					} else if (consume("(")) {
						base = parseExpectedExpression(flowContext);
						expect(")");
					} else return null;
					for (;;) {
						var newBase = parsePrefixExpressionPart(base, marker, flowContext);
						if (newBase === null) break;
						base = newBase;
					}
					return base;
				}
				function parseCallExpression(base, flowContext) {
					if (Punctuator === token.type) switch (token.value) {
						case "(":
							if (!features.emptyStatement) {
								if (token.line !== previousToken.line) raise(null, errors.ambiguousSyntax, token.value);
							}
							next();
							var expressions = [];
							var expression = parseExpression(flowContext);
							if (null != expression) expressions.push(expression);
							while (consume(",")) {
								expression = parseExpectedExpression(flowContext);
								expressions.push(expression);
							}
							expect(")");
							return finishNode(ast.callExpression(base, expressions));
						case "{":
							markLocation();
							next();
							var table = parseTableConstructor(flowContext);
							return finishNode(ast.tableCallExpression(base, table));
					}
					else if (StringLiteral === token.type) return finishNode(ast.stringCallExpression(base, parsePrimaryExpression(flowContext)));
					raiseUnexpectedToken("function arguments", token);
				}
				function parsePrimaryExpression(flowContext) {
					var literals = StringLiteral | NumericLiteral | BooleanLiteral | NilLiteral | VarargLiteral, value = token.value, type = token.type, marker;
					if (trackLocations) marker = createLocationMarker();
					if (type === VarargLiteral && !flowContext.allowVararg) raise(token, errors.cannotUseVararg, token.value);
					if (type & literals) {
						pushLocation(marker);
						var raw = input.slice(token.range[0], token.range[1]);
						next();
						return finishNode(ast.literal(type, value, raw));
					} else if (Keyword === type && "function" === value) {
						pushLocation(marker);
						next();
						if (options.scope) createScope();
						return parseFunctionDeclaration(null);
					} else if (consume("{")) {
						pushLocation(marker);
						return parseTableConstructor(flowContext);
					}
				}
				exports$1.parse = parse;
				var versionFeatures = {
					"5.1": {},
					"5.2": {
						labels: true,
						emptyStatement: true,
						hexEscapes: true,
						skipWhitespaceEscape: true,
						strictEscapes: true,
						relaxedBreak: true
					},
					"5.3": {
						labels: true,
						emptyStatement: true,
						hexEscapes: true,
						skipWhitespaceEscape: true,
						strictEscapes: true,
						unicodeEscapes: true,
						bitwiseOperators: true,
						integerDivision: true,
						relaxedBreak: true
					},
					"LuaJIT": {
						labels: true,
						contextualGoto: true,
						hexEscapes: true,
						skipWhitespaceEscape: true,
						strictEscapes: true,
						unicodeEscapes: true,
						imaginaryNumbers: true,
						integerSuffixes: true
					}
				};
				function parse(_input, _options) {
					if ("undefined" === typeof _options && "object" === typeof _input) {
						_options = _input;
						_input = void 0;
					}
					if (!_options) _options = {};
					input = _input || "";
					options = assign({}, defaultOptions, _options);
					index = 0;
					line = 1;
					lineStart = 0;
					length = input.length;
					scopes = [[]];
					scopeDepth = 0;
					globals = [];
					locations = [];
					if (!Object.prototype.hasOwnProperty.call(versionFeatures, options.luaVersion)) throw new Error(sprintf("Lua version '%1' not supported", options.luaVersion));
					features = assign({}, versionFeatures[options.luaVersion]);
					if (options.extendedIdentifiers !== void 0) features.extendedIdentifiers = !!options.extendedIdentifiers;
					if (!Object.prototype.hasOwnProperty.call(encodingModes, options.encodingMode)) throw new Error(sprintf("Encoding mode '%1' not supported", options.encodingMode));
					encodingMode = encodingModes[options.encodingMode];
					if (options.comments) comments = [];
					if (!options.wait) return end();
					return exports$1;
				}
				exports$1.write = write;
				function write(_input) {
					input += String(_input);
					length = input.length;
					return exports$1;
				}
				exports$1.end = end;
				function end(_input) {
					if ("undefined" !== typeof _input) write(_input);
					if (input && input.substr(0, 2) === "#!") input = input.replace(/^.*/, function(line) {
						return line.replace(/./g, " ");
					});
					length = input.length;
					trackLocations = options.locations || options.ranges;
					lookahead = lex();
					var chunk = parseChunk();
					if (options.comments) chunk.comments = comments;
					if (options.scope) chunk.globals = globals;
					/* istanbul ignore if */
					if (locations.length > 0) throw new Error("Location tracking failed. This is most likely a bug in luaparse");
					return chunk;
				}
			});
		})))());
		var AceRange = class AceRange {
			static getConstructor(editor) {
				if (!AceRange._instance && editor) AceRange._instance = editor.getSelectionRange().constructor;
				return AceRange._instance;
			}
		};
		var CommonConverter;
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
					case "keyword": return import_main.CompletionItemKind.Keyword;
					case "variable":
					case "localVariable": return import_main.CompletionItemKind.Variable;
					case "memberVariable":
					case "memberGetAccessor":
					case "memberSetAccessor": return import_main.CompletionItemKind.Field;
					case "function":
					case "memberFunction":
					case "constructSignature":
					case "callSignature":
					case "indexSignature": return import_main.CompletionItemKind.Function;
					case "enum": return import_main.CompletionItemKind.Enum;
					case "module": return import_main.CompletionItemKind.Module;
					case "class": return import_main.CompletionItemKind.Class;
					case "interface": return import_main.CompletionItemKind.Interface;
					case "warning": return import_main.CompletionItemKind.File;
				}
				return import_main.CompletionItemKind.Property;
			}
			_CommonConverter.convertKind = convertKind;
			function excludeByErrorMessage(diagnostics, errorMessagesToIgnore, fieldName = "message") {
				if (!errorMessagesToIgnore) return diagnostics;
				return diagnostics.filter((el) => !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
			}
			_CommonConverter.excludeByErrorMessage = excludeByErrorMessage;
		})(CommonConverter || (CommonConverter = {}));
		function filterDiagnostics(diagnostics, filterErrors) {
			return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
				if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main.DiagnosticSeverity.Warning;
				else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main.DiagnosticSeverity.Information;
				return el;
			});
		}
		var LuaService = class extends BaseService {
			constructor(mode) {
				super(mode);
				this.serviceCapabilities = { diagnosticProvider: {
					interFileDependencies: true,
					workspaceDiagnostics: true
				} };
				this.$service = import_luaparse;
			}
			async doValidation(document) {
				let value = this.getDocumentValue(document.uri);
				if (!value) return [];
				let errors = [];
				try {
					this.$service.parse(value);
				} catch (e) {
					if (e instanceof this.$service.SyntaxError) errors.push({
						range: {
							start: {
								line: e.line - 1,
								character: e.column
							},
							end: {
								line: e.line - 1,
								character: e.column
							}
						},
						message: e.message,
						severity: 1
					});
				}
				return filterDiagnostics(errors, this.optionsToFilterDiagnostics);
			}
		};
		exports$1.LuaService = LuaService;
	});
}));
//#endregion
export default require_lua_service();
