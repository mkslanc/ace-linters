import { t as __commonJSMin } from "./webworker-DwDkKAIQ.js";
//#region packages/ace-linters/build/php-service.js
var require_php_service = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
			var __exportStar = exports$17 && exports$17.__exportStar || function(m, exports$3) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$3, p)) __createBinding(exports$3, m, p);
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
			var __exportStar = exports$44 && exports$44.__exportStar || function(m, exports$2) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
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
		var require_main = /* @__PURE__ */ __commonJSMin(((exports$45) => {
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
			var __exportStar = exports$45 && exports$45.__exportStar || function(m, exports$1) {
				for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
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
		}));
		function getDefaultExportFromCjs(x) {
			return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
		}
		function defaultSetTimout() {
			throw new Error("setTimeout has not been defined");
		}
		function defaultClearTimeout() {
			throw new Error("clearTimeout has not been defined");
		}
		function runTimeout(fun) {
			if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
			if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
				cachedSetTimeout = setTimeout;
				return setTimeout(fun, 0);
			}
			try {
				return cachedSetTimeout(fun, 0);
			} catch (e) {
				try {
					return cachedSetTimeout.call(null, fun, 0);
				} catch (e) {
					return cachedSetTimeout.call(this, fun, 0);
				}
			}
		}
		function runClearTimeout(marker) {
			if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
			if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
				cachedClearTimeout = clearTimeout;
				return clearTimeout(marker);
			}
			try {
				return cachedClearTimeout(marker);
			} catch (e) {
				try {
					return cachedClearTimeout.call(null, marker);
				} catch (e) {
					return cachedClearTimeout.call(this, marker);
				}
			}
		}
		function cleanUpNextTick() {
			if (!draining || !currentQueue) return;
			draining = false;
			if (currentQueue.length) queue = currentQueue.concat(queue);
			else queueIndex = -1;
			if (queue.length) drainQueue();
		}
		function drainQueue() {
			if (draining) return;
			var timeout = runTimeout(cleanUpNextTick);
			draining = true;
			var len = queue.length;
			while (len) {
				currentQueue = queue;
				queue = [];
				while (++queueIndex < len) if (currentQueue) currentQueue[queueIndex].run();
				queueIndex = -1;
				len = queue.length;
			}
			currentQueue = null;
			draining = false;
			runClearTimeout(timeout);
		}
		function Item(fun, array) {
			this.fun = fun;
			this.array = array;
		}
		function noop() {}
		var browser, process, cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, browserExports, process$1;
		var init_dist = __esmMin((() => {
			browser = { exports: {} };
			process = browser.exports = {};
			(function() {
				try {
					if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
					else cachedSetTimeout = defaultSetTimout;
				} catch (e) {
					cachedSetTimeout = defaultSetTimout;
				}
				try {
					if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
					else cachedClearTimeout = defaultClearTimeout;
				} catch (e) {
					cachedClearTimeout = defaultClearTimeout;
				}
			})();
			queue = [];
			draining = false;
			queueIndex = -1;
			process.nextTick = function(fun) {
				var args = new Array(arguments.length - 1);
				if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
				queue.push(new Item(fun, args));
				if (queue.length === 1 && !draining) runTimeout(drainQueue);
			};
			Item.prototype.run = function() {
				this.fun.apply(null, this.array);
			};
			process.title = "browser";
			process.browser = true;
			process.env = {};
			process.argv = [];
			process.version = "";
			process.versions = {};
			process.on = noop;
			process.addListener = noop;
			process.once = noop;
			process.off = noop;
			process.removeListener = noop;
			process.removeAllListeners = noop;
			process.emit = noop;
			process.prependListener = noop;
			process.prependOnceListener = noop;
			process.listeners = function(name) {
				return [];
			};
			process.binding = function(name) {
				throw new Error("process.binding is not supported");
			};
			process.cwd = function() {
				return "/";
			};
			process.chdir = function(dir) {
				throw new Error("process.chdir is not supported");
			};
			process.umask = function() {
				return 0;
			};
			browserExports = browser.exports;
			process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
		}));
		var import_main = /* @__PURE__ */ __toESM(require_main());
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
		var import_php_parser = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports$46, module$2) => {
			init_dist();
			/*!
			* 
			*   Package: php-parser
			*   Parse PHP code from JS and returns its AST
			*   Build: 8ca15bdec2f54ee92ab1 - 2/21/2026
			*   Copyright (C) 2021 Glayzzle (BSD-3-Clause)
			*   @authors https://github.com/glayzzle/php-parser/graphs/contributors
			*   @url http://glayzzle.com
			*
			*/
			(function webpackUniversalModuleDefinition(root, factory) {
				if (typeof exports$46 === "object" && typeof module$2 === "object") module$2.exports = factory();
				else if (typeof define === "function" && define.amd) define([], factory);
				else if (typeof exports$46 === "object") exports$46["PhpParser"] = factory();
				else root["PhpParser"] = factory();
			})(self, () => {
				return (() => {
					"use strict";
					var __webpack_modules__ = {
						8938(module$1, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Location = __webpack_require__(4778);
							var Position = __webpack_require__(8822);
							/**
							* ## Class hierarchy
							*
							* - [Location](#location)
							* - [Position](#position)
							* - [Node](#node)
							*   - [Noop](#noop)
							*   - [NullKeyword](#nullkeyword)
							*   - [StaticVariable](#staticvariable)
							*   - [EncapsedPart](#encapsedpart)
							*   - [Constant](#constant)
							*   - [Identifier](#identifier)
							*   - [Reference](#reference)
							*     - [TypeReference](#typereference)
							*     - [ParentReference](#parentreference)
							*     - [StaticReference](#staticreference)
							*     - [SelfReference](#selfreference)
							*     - [Name](#name)
							*   - [TraitUse](#traituse)
							*   - [TraitAlias](#traitalias)
							*   - [TraitPrecedence](#traitprecedence)
							*   - [Comment](#comment)
							*     - [CommentLine](#commentline)
							*     - [CommentBlock](#commentblock)
							*   - [Error](#error)
							*   - [Expression](#expression)
							*     - [Entry](#entry)
							*     - [ArrowFunc](#arrowfunc)
							*     - [Closure](#closure)
							*     - [ByRef](#byref)
							*     - [Silent](#silent)
							*     - [RetIf](#retif)
							*     - [New](#new)
							*     - [Include](#include)
							*     - [Call](#call)
							*     - [Eval](#eval)
							*     - [Exit](#exit)
							*     - [Clone](#clone)
							*     - [Assign](#assign)
							*     - [AssignRef](#assignref)
							*     - [Array](#array)
							*     - [List](#list)
							*     - [Variable](#variable)
							*     - [Variadic](#variadic)
							*     - [Yield](#yield)
							*     - [YieldFrom](#yieldfrom)
							*     - [Print](#print)
							*     - [Isset](#isset)
							*     - [Empty](#empty)
							*     - [Lookup](#lookup)
							*       - [PropertyLookup](#propertylookup)
							*       - [StaticLookup](#staticlookup)
							*       - [OffsetLookup](#offsetlookup)
							*     - [Operation](#operation)
							*       - [Pre](#pre)
							*       - [Post](#post)
							*       - [Bin](#bin)
							*       - [Unary](#unary)
							*       - [Cast](#cast)
							*     - [Literal](#literal)
							*       - [Boolean](#boolean)
							*       - [String](#string)
							*       - [Number](#number)
							*       - [Inline](#inline)
							*       - [Magic](#magic)
							*       - [Nowdoc](#nowdoc)
							*       - [Encapsed](#encapsed)
							*   - [Statement](#statement)
							*     - [ConstantStatement](#constantstatement)
							*       - [ClassConstant](#classconstant)
							*     - [Return](#return)
							*     - [Label](#label)
							*     - [Continue](#continue)
							*     - [Case](#case)
							*     - [Break](#break)
							*     - [Echo](#echo)
							*     - [Unset](#unset)
							*     - [Halt](#halt)
							*     - [Declare](#declare)
							*     - [Global](#global)
							*     - [Static](#static)
							*     - [If](#if)
							*     - [Do](#do)
							*     - [While](#while)
							*     - [For](#for)
							*     - [Foreach](#foreach)
							*     - [Switch](#switch)
							*     - [Goto](#goto)
							*     - [Try](#try)
							*     - [Catch](#catch)
							*     - [Throw](#throw)
							*     - [UseGroup](#usegroup)
							*     - [UseItem](#useitem)
							*     - [Block](#block)
							*       - [Program](#program)
							*       - [Namespace](#namespace)
							*     - [PropertyStatement](#propertystatement)
							*     - [Property](#property)
							*     - [Declaration](#declaration)
							*       - [Class](#class)
							*       - [Interface](#interface)
							*       - [Trait](#trait)
							*       - [Function](#function)
							*         - [Method](#method)
							*       - [Parameter](#parameter)
							* ---
							*/
							/**
							* The AST builder class
							* @constructor AST
							* @memberOf module:php-parser
							* @tutorial AST
							* @property {Boolean} withPositions - Should locate any node (by default false)
							* @property {Boolean} withSource - Should extract the node original code (by default false)
							*/
							var AST = function AST(withPositions, withSource) {
								this.withPositions = withPositions;
								this.withSource = withSource;
							};
							AST.precedence = {};
							[
								["or"],
								["xor"],
								["and"],
								["="],
								["?"],
								["??"],
								["||"],
								["&&"],
								["|"],
								["^"],
								["&"],
								[
									"==",
									"!=",
									"===",
									"!==",
									"<=>"
								],
								[
									"<",
									"<=",
									">",
									">="
								],
								["<<", ">>"],
								[
									"+",
									"-",
									"."
								],
								[
									"*",
									"/",
									"%"
								],
								["!"],
								["instanceof"],
								["cast", "silent"],
								["**"]
							].forEach(function(list, index) {
								list.forEach(function(operator) {
									AST.precedence[operator] = index + 1;
								});
							});
							/**
							* @private
							* @function AST#isRightAssociative
							* @memberOf module:php-parser
							* @param operator
							* @return {boolean}
							*/
							AST.prototype.isRightAssociative = function(operator) {
								return operator === "**" || operator === "??";
							};
							/**
							* Change parent node informations after swapping childs
							* @private
							* @function AST#swapLocations
							* @memberOf module:php-parser
							*/
							AST.prototype.swapLocations = function(target, first, last, parser) {
								if (this.withPositions) {
									target.loc.start = first.loc.start;
									target.loc.end = last.loc.end;
									if (this.withSource) target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
								}
							};
							/**
							* Includes locations from first & last into the target
							* @private
							* @function AST#resolveLocations
							* @memberOf module:php-parser
							*/
							AST.prototype.resolveLocations = function(target, first, last, parser) {
								if (this.withPositions) {
									if (target.loc.start.offset > first.loc.start.offset) target.loc.start = first.loc.start;
									/* istanbul ignore next */
									if (target.loc.end.offset < last.loc.end.offset) target.loc.end = last.loc.end;
									if (this.withSource) target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
								}
							};
							/**
							* Check and fix precence, by default using right
							* @private
							* @function AST#resolvePrecedence
							* @memberOf module:php-parser
							*/
							AST.prototype.resolvePrecedence = function(result, parser) {
								var buffer, lLevel, rLevel;
								if (result.kind === "call") this.resolveLocations(result, result.what, result, parser);
								else if (result.kind === "propertylookup" || result.kind === "staticlookup" || result.kind === "offsetlookup" && result.offset) this.resolveLocations(result, result.what, result.offset, parser);
								else if (result.kind === "bin") {
									if (result.right && !result.right.parenthesizedExpression) {
										if (result.right.kind === "bin") {
											lLevel = AST.precedence[result.type];
											rLevel = AST.precedence[result.right.type];
											if (lLevel && rLevel && rLevel <= lLevel && (result.type !== result.right.type || !this.isRightAssociative(result.type))) {
												buffer = result.right;
												result.right = result.right.left;
												this.swapLocations(result, result.left, result.right, parser);
												buffer.left = this.resolvePrecedence(result, parser);
												this.swapLocations(buffer, buffer.left, buffer.right, parser);
												result = buffer;
											}
										} else if (result.right.kind === "retif") {
											lLevel = AST.precedence[result.type];
											rLevel = AST.precedence["?"];
											if (lLevel && rLevel && rLevel <= lLevel) {
												buffer = result.right;
												result.right = result.right.test;
												this.swapLocations(result, result.left, result.right, parser);
												buffer.test = this.resolvePrecedence(result, parser);
												this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
												result = buffer;
											}
										}
									}
								} else if ((result.kind === "silent" || result.kind === "cast") && result.expr && !result.expr.parenthesizedExpression) {
									if (result.expr.kind === "bin") {
										buffer = result.expr;
										result.expr = result.expr.left;
										this.swapLocations(result, result, result.expr, parser);
										buffer.left = this.resolvePrecedence(result, parser);
										this.swapLocations(buffer, buffer.left, buffer.right, parser);
										result = buffer;
									} else if (result.expr.kind === "retif") {
										buffer = result.expr;
										result.expr = result.expr.test;
										this.swapLocations(result, result, result.expr, parser);
										buffer.test = this.resolvePrecedence(result, parser);
										this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
										result = buffer;
									}
								} else if (result.kind === "unary") {
									if (result.what && !result.what.parenthesizedExpression) {
										if (result.what.kind === "bin") {
											buffer = result.what;
											result.what = result.what.left;
											this.swapLocations(result, result, result.what, parser);
											buffer.left = this.resolvePrecedence(result, parser);
											this.swapLocations(buffer, buffer.left, buffer.right, parser);
											result = buffer;
										} else if (result.what.kind === "retif") {
											buffer = result.what;
											result.what = result.what.test;
											this.swapLocations(result, result, result.what, parser);
											buffer.test = this.resolvePrecedence(result, parser);
											this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
											result = buffer;
										}
									}
								} else if (result.kind === "retif") {
									if (result.falseExpr && result.falseExpr.kind === "retif" && !result.falseExpr.parenthesizedExpression) {
										buffer = result.falseExpr;
										result.falseExpr = buffer.test;
										this.swapLocations(result, result.test, result.falseExpr, parser);
										buffer.test = this.resolvePrecedence(result, parser);
										this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
										result = buffer;
									}
								} else if (result.kind === "assign") {
									if (result.right && result.right.kind === "bin" && !result.right.parenthesizedExpression) {
										lLevel = AST.precedence["="];
										rLevel = AST.precedence[result.right.type];
										if (lLevel && rLevel && rLevel < lLevel) {
											buffer = result.right;
											result.right = result.right.left;
											buffer.left = result;
											this.swapLocations(buffer, buffer.left, result.right, parser);
											result = buffer;
										}
									}
								} else if (result.kind === "expressionstatement") this.swapLocations(result, result.expression, result, parser);
								return result;
							};
							/**
							* Prepares an AST node
							* @private
							* @function AST#prepare
							* @memberOf module:php-parser
							* @param {String|null} kind - Defines the node type
							* @param {*} docs - (if null, the kind must be passed at the function call)
							* @param {Parser} parser - The parser instance (use for extracting locations)
							* @return {Function}
							*/
							AST.prototype.prepare = function(kind, docs, parser) {
								var start = null;
								if (this.withPositions || this.withSource) start = parser.position();
								var self = this;
								var _result = function result() {
									var args = Array.prototype.slice.call(arguments);
									args.push(docs);
									if (self.withPositions || self.withSource) {
										var src = null;
										if (self.withSource) src = parser.lexer._input.substring(start.offset, parser.prev[2]);
										var location = new Location(src, start, new Position(parser.prev[0], parser.prev[1], parser.prev[2]));
										args.push(location);
									}
									if (!kind) kind = args.shift();
									var node = self[kind];
									if (typeof node !== "function") throw new Error("Undefined node \"" + kind + "\"");
									var astNode = Object.create(node.prototype);
									node.apply(astNode, args);
									_result.instance = astNode;
									/* istanbul ignore next */
									if (_result.trailingComments) astNode.trailingComments = _result.trailingComments;
									if (typeof _result.postBuild === "function") _result.postBuild(astNode);
									if (parser.debug) delete self.stack[_result.stackUid];
									return self.resolvePrecedence(astNode, parser);
								};
								if (parser.debug) {
									if (!this.stack) {
										this.stack = {};
										this.stackUid = 1;
									}
									this.stack[++this.stackUid] = {
										position: start,
										stack: (/* @__PURE__ */ new Error()).stack.split("\n").slice(3, 5)
									};
									_result.stackUid = this.stackUid;
								}
								/**
								* Sets a list of trailing comments
								* @private
								* @param {*} docs
								*/
								_result.setTrailingComments = function(docs) {
									if (_result.instance) _result.instance.setTrailingComments(docs);
									else _result.trailingComments = docs;
								};
								/**
								* Release a node without using it on the AST
								* @private
								* @param {*} target
								*/
								_result.destroy = function(target) {
									if (docs) if (target) if (!target.leadingComments) target.leadingComments = docs;
									else target.leadingComments = docs.concat(target.leadingComments);
									else parser._docIndex = parser._docs.length - docs.length;
									if (parser.debug) delete self.stack[_result.stackUid];
								};
								return _result;
							};
							AST.prototype.checkNodes = function() {
								var errors = [];
								for (var k in this.stack) if (Object.prototype.hasOwnProperty.call(this.stack, k)) {
									this.stack[k].key = k;
									errors.push(this.stack[k]);
								}
								this.stack = {};
								return errors;
							};
							[
								__webpack_require__(3160),
								__webpack_require__(1654),
								__webpack_require__(1240),
								__webpack_require__(3979),
								__webpack_require__(5553),
								__webpack_require__(2207),
								__webpack_require__(2916),
								__webpack_require__(4628),
								__webpack_require__(7509),
								__webpack_require__(2906),
								__webpack_require__(5723),
								__webpack_require__(7561),
								__webpack_require__(6473),
								__webpack_require__(9626),
								__webpack_require__(4782),
								__webpack_require__(8477),
								__webpack_require__(5045),
								__webpack_require__(900),
								__webpack_require__(4824),
								__webpack_require__(1020),
								__webpack_require__(9847),
								__webpack_require__(2790),
								__webpack_require__(1333),
								__webpack_require__(2112),
								__webpack_require__(9960),
								__webpack_require__(8533),
								__webpack_require__(5947),
								__webpack_require__(7786),
								__webpack_require__(5436),
								__webpack_require__(1136),
								__webpack_require__(380),
								__webpack_require__(6129),
								__webpack_require__(9723),
								__webpack_require__(5125),
								__webpack_require__(9632),
								__webpack_require__(4300),
								__webpack_require__(1515),
								__webpack_require__(3411),
								__webpack_require__(9781),
								__webpack_require__(839),
								__webpack_require__(8374),
								__webpack_require__(9754),
								__webpack_require__(4251),
								__webpack_require__(6553),
								__webpack_require__(8630),
								__webpack_require__(9786),
								__webpack_require__(9742),
								__webpack_require__(1234),
								__webpack_require__(6),
								__webpack_require__(8861),
								__webpack_require__(7860),
								__webpack_require__(9834),
								__webpack_require__(2724),
								__webpack_require__(6025),
								__webpack_require__(2687),
								__webpack_require__(7633),
								__webpack_require__(5514),
								__webpack_require__(7427),
								__webpack_require__(1122),
								__webpack_require__(7256),
								__webpack_require__(7416),
								__webpack_require__(8140),
								__webpack_require__(6258),
								__webpack_require__(9474),
								__webpack_require__(6827),
								__webpack_require__(4427),
								__webpack_require__(4065),
								__webpack_require__(4297),
								__webpack_require__(5859),
								__webpack_require__(6985),
								__webpack_require__(9302),
								__webpack_require__(8212),
								__webpack_require__(864),
								__webpack_require__(8268),
								__webpack_require__(7190),
								__webpack_require__(8519),
								__webpack_require__(4835),
								__webpack_require__(2056),
								__webpack_require__(4838),
								__webpack_require__(7869),
								__webpack_require__(1908),
								__webpack_require__(170),
								__webpack_require__(1091),
								__webpack_require__(8276),
								__webpack_require__(1842),
								__webpack_require__(5739),
								__webpack_require__(1274),
								__webpack_require__(4352),
								__webpack_require__(9672),
								__webpack_require__(711),
								__webpack_require__(1231),
								__webpack_require__(1865),
								__webpack_require__(1102),
								__webpack_require__(7472),
								__webpack_require__(6133),
								__webpack_require__(1197),
								__webpack_require__(6649),
								__webpack_require__(1837),
								__webpack_require__(2277),
								__webpack_require__(8010),
								__webpack_require__(7579),
								__webpack_require__(3460),
								__webpack_require__(2702),
								__webpack_require__(514),
								__webpack_require__(5684),
								__webpack_require__(8019),
								__webpack_require__(7721),
								__webpack_require__(4369),
								__webpack_require__(40),
								__webpack_require__(4919),
								__webpack_require__(7676),
								__webpack_require__(2596),
								__webpack_require__(6744)
							].forEach(function(ctor) {
								AST.prototype[ctor.kind] = ctor;
							});
							module$1.exports = AST;
						},
						3160(module$2, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expr = __webpack_require__(839);
							var KIND = "array";
							/**
							* Defines an array structure
							* @constructor Array
							* @memberOf module:php-parser
							* @example
							* // PHP code :
							* [1, 'foo' => 'bar', 3]
							*
							* // AST structure :
							* {
							*  "kind": "array",
							*  "shortForm": true
							*  "items": [
							*    {"kind": "number", "value": "1"},
							*    {
							*      "kind": "entry",
							*      "key": {"kind": "string", "value": "foo", "isDoubleQuote": false},
							*      "value": {"kind": "string", "value": "bar", "isDoubleQuote": false}
							*    },
							*    {"kind": "number", "value": "3"}
							*  ]
							* }
							* @extends {Expression}
							* @property {Array<Entry|Expression|Variable>} items List of array items
							* @property {boolean} shortForm Indicate if the short array syntax is used, ex `[]` instead `array()`
							*/
							module$2.exports = Expr["extends"](KIND, function Array(shortForm, items, docs, location) {
								Expr.apply(this, [
									KIND,
									docs,
									location
								]);
								this.items = items;
								this.shortForm = shortForm;
							});
						},
						1654(module$3, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "arrowfunc";
							/**
							* Defines an arrow function (it's like a closure)
							* @constructor ArrowFunc
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Parameter[]} arguments
							* @property {Identifier} type
							* @property {Expression} body
							* @property {boolean} byref
							* @property {boolean} nullable
							* @property {boolean} isStatic
							*/
							module$3.exports = Expression["extends"](KIND, function Closure(args, byref, body, type, nullable, isStatic, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.arguments = args;
								this.byref = byref;
								this.body = body;
								this.type = type;
								this.nullable = nullable;
								this.isStatic = isStatic || false;
							});
						},
						1240(module$4, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "assign";
							/**
							* Assigns a value to the specified target
							* @constructor Assign
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} left
							* @property {Expression} right
							* @property {String} operator
							*/
							module$4.exports = Expression["extends"](KIND, function Assign(left, right, operator, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.left = left;
								this.right = right;
								this.operator = operator;
							});
						},
						3979(module$5, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "assignref";
							/**
							* Assigns a value to the specified target
							* @constructor AssignRef
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} left
							* @property {Expression} right
							* @property {String} operator
							*/
							module$5.exports = Expression["extends"](KIND, function AssignRef(left, right, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.left = left;
								this.right = right;
							});
						},
						2207(module$6, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "attrgroup";
							/**
							* Attribute group
							* @memberOf module:php-parser
							* @constructor AttrGroup
							* @extends {Node}
							* @property {Attribute[]} attrs
							*/
							module$6.exports = Node["extends"](KIND, function AttrGroup(attrs, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.attrs = attrs || [];
							});
						},
						5553(module$7, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "attribute";
							/**
							* Attribute Value
							* @memberOf module:php-parser
							* @constructor Attribute
							* @extends {Node}
							* @property {String} name
							* @property {Parameter[]} args
							*/
							module$7.exports = Node["extends"](KIND, function Attribute(name, args, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.args = args;
							});
						},
						2916(module$8, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Operation = __webpack_require__(8268);
							var KIND = "bin";
							/**
							* Binary operations
							* @constructor Bin
							* @memberOf module:php-parser
							* @extends {Operation}
							* @property {String} type
							* @property {Expression} left
							* @property {Expression} right
							*/
							module$8.exports = Operation["extends"](KIND, function Bin(type, left, right, docs, location) {
								Operation.apply(this, [
									KIND,
									docs,
									location
								]);
								this.type = type;
								this.left = left;
								this.right = right;
							});
						},
						4628(module$9, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "block";
							/**
							* A block statement, i.e., a sequence of statements surrounded by braces.
							* @constructor Block
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Node[]} children
							*/
							module$9.exports = Statement["extends"](KIND, function Block(kind, children, docs, location) {
								Statement.apply(this, [
									kind || KIND,
									docs,
									location
								]);
								this.children = children.filter(Boolean);
							});
						},
						7509(module$10, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "boolean";
							/**
							* Defines a boolean value (true/false)
							* @constructor Boolean
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {boolean} value
							*/
							module$10.exports = Literal["extends"](KIND, function Boolean(value, raw, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
							});
						},
						2906(module$11, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "break";
							/**
							* A break statement
							* @constructor Break
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Number|Null} level
							*/
							module$11.exports = Statement["extends"](KIND, function Break(level, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.level = level;
							});
						},
						5723(module$12, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "byref";
							/**
							* Passing by Reference - so the function can modify the variable
							* @constructor ByRef
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {ExpressionStatement} what
							*/
							module$12.exports = Expression["extends"](KIND, function ByRef(what, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
							});
						},
						7561(module$13, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "call";
							/**
							* Executes a call statement
							* @constructor Call
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Identifier|Variable} what
							* @property {Expression[]} arguments
							*/
							module$13.exports = Expression["extends"](KIND, function Call(what, args, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
								this.arguments = args;
							});
						},
						6473(module$14, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "case";
							/**
							* A switch case statement
							* @constructor Case
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression|null} test - if null, means that the default case
							* @property {Block|null} body
							*/
							module$14.exports = Statement["extends"](KIND, function Case(test, body, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.body = body;
							});
						},
						9626(module$15, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Operation = __webpack_require__(8268);
							var KIND = "cast";
							/**
							* Binary operations
							* @constructor Cast
							* @memberOf module:php-parser
							* @extends {Operation}
							* @property {String} type
							* @property {String} raw
							* @property {Expression} expr
							*/
							module$15.exports = Operation["extends"](KIND, function Cast(type, raw, expr, docs, location) {
								Operation.apply(this, [
									KIND,
									docs,
									location
								]);
								this.type = type;
								this.raw = raw;
								this.expr = expr;
							});
						},
						4782(module$16, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "catch";
							/**
							* Defines a catch statement
							* @constructor Catch
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Name[]} what
							* @property {Variable} variable
							* @property {Block} body
							* @see http://php.net/manual/en/language.exceptions.php
							*/
							module$16.exports = Statement["extends"](KIND, function Catch(body, what, variable, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.body = body;
								this.what = what;
								this.variable = variable;
							});
						},
						8477(module$17, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "class";
							/**
							* A class definition
							* @constructor Class
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Identifier|null} extends
							* @property {Identifier[]|null} implements
							* @property {Declaration[]} body
							* @property {boolean} isAnonymous
							* @property {boolean} isAbstract
							* @property {boolean} isFinal
							* @property {boolean} isReadonly
							* @property {AttrGroup[]} attrGroups
							*/
							module$17.exports = Declaration["extends"](KIND, function Class(name, ext, impl, body, flags, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this.isAnonymous = name ? false : true;
								this["extends"] = ext;
								this["implements"] = impl;
								this.body = body;
								this.attrGroups = [];
								this.parseFlags(flags);
							});
						},
						5045(module$18, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var ConstantStatement = __webpack_require__(2112);
							var KIND = "classconstant";
							var IS_UNDEFINED = "";
							var IS_PUBLIC = "public";
							var IS_PROTECTED = "protected";
							var IS_PRIVATE = "private";
							/**
							* Defines a class/interface/trait constant
							* @constructor ClassConstant
							* @memberOf module:php-parser
							* @extends {ConstantStatement}
							* @property {string} visibility
							* @property {boolean} final
							* @property {boolean} nullable
							* @property {TypeReference|IntersectionType|UnionType|null} type
							* @property {AttrGroup[]} attrGroups
							*/
							var ClassConstant = ConstantStatement["extends"](KIND, function ClassConstant(kind, constants, flags, nullable, type, attrGroups, docs, location) {
								ConstantStatement.apply(this, [
									kind || KIND,
									constants,
									docs,
									location
								]);
								this.parseFlags(flags);
								this.nullable = nullable;
								this.type = type;
								this.attrGroups = attrGroups;
							});
							/**
							* Generic flags parser
							* @function
							* @name ClassConstant#parseFlags
							* @memberOf module:php-parser
							* @param {Array<number|null>} flags
							* @return {void}
							*/
							ClassConstant.prototype.parseFlags = function(flags) {
								if (flags[0] === -1) this.visibility = IS_UNDEFINED;
								else if (flags[0] === null)
 /* istanbul ignore next */
								this.visibility = null;
								else if (flags[0] === 0) this.visibility = IS_PUBLIC;
								else if (flags[0] === 1) this.visibility = IS_PROTECTED;
								else if (flags[0] === 2) this.visibility = IS_PRIVATE;
								this["final"] = flags[2] === 2;
							};
							module$18.exports = ClassConstant;
						},
						900(module$19, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "clone";
							/**
							* Defines a clone call
							* @constructor Clone
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} what
							*/
							module$19.exports = Expression["extends"](KIND, function Clone(what, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
							});
						},
						4824(module$20, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "closure";
							/**
							* Defines a closure
							* @constructor Closure
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Parameter[]} arguments
							* @property {Variable[]} uses
							* @property {Identifier} type
							* @property {Boolean} byref
							* @property {boolean} nullable
							* @property {Block|null} body
							* @property {boolean} isStatic
							* @property {AttrGroup[]} attrGroups
							*/
							module$20.exports = Expression["extends"](KIND, function Closure(args, byref, uses, type, nullable, isStatic, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.uses = uses;
								this.arguments = args;
								this.byref = byref;
								this.type = type;
								this.nullable = nullable;
								this.isStatic = isStatic || false;
								this.body = null;
								this.attrGroups = [];
							});
						},
						1020(module$21, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							/**
							* Abstract documentation node (ComentLine or CommentBlock)
							* @constructor Comment
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {String} value
							*/
							module$21.exports = Node["extends"]("comment", function Comment(kind, value, docs, location) {
								Node.apply(this, [
									kind,
									docs,
									location
								]);
								this.value = value;
							});
						},
						9847(module$22, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Comment = __webpack_require__(1020);
							var KIND = "commentblock";
							/**
							* A comment block (multiline)
							* @constructor CommentBlock
							* @memberOf module:php-parser
							* @extends {Comment}
							*/
							module$22.exports = Comment["extends"](KIND, function CommentBlock(value, docs, location) {
								Comment.apply(this, [
									KIND,
									value,
									docs,
									location
								]);
							});
						},
						2790(module$23, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Comment = __webpack_require__(1020);
							var KIND = "commentline";
							/**
							* A single line comment
							* @constructor CommentLine
							* @memberOf module:php-parser
							* @extends {Comment}
							*/
							module$23.exports = Comment["extends"](KIND, function CommentLine(value, docs, location) {
								Comment.apply(this, [
									KIND,
									value,
									docs,
									location
								]);
							});
						},
						1333(module$24, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "constant";
							/**
							* Defines a constant
							* @constructor Constant
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {string} name
							* @property {Node|string|number|boolean|null} value
							*/
							module$24.exports = Node["extends"](KIND, function Constant(name, value, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.value = value;
							});
						},
						2112(module$25, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "constantstatement";
							/**
							* Declares a constants into the current scope
							* @constructor ConstantStatement
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Constant[]} constants
							*/
							module$25.exports = Statement["extends"](KIND, function ConstantStatement(kind, constants, docs, location) {
								Statement.apply(this, [
									kind || KIND,
									docs,
									location
								]);
								this.constants = constants;
							});
						},
						9960(module$26, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "continue";
							/**
							* A continue statement
							* @constructor Continue
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {number|null} level
							*/
							module$26.exports = Statement["extends"](KIND, function Continue(level, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.level = level;
							});
						},
						8533(module$27, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "declaration";
							var IS_UNDEFINED = "";
							var IS_PUBLIC = "public";
							var IS_PROTECTED = "protected";
							var IS_PRIVATE = "private";
							/**
							* A declaration statement (function, class, interface...)
							* @constructor Declaration
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Identifier|string} name
							*/
							var Declaration = Statement["extends"](KIND, function Declaration(kind, name, docs, location) {
								Statement.apply(this, [
									kind || KIND,
									docs,
									location
								]);
								this.name = name;
							});
							/**
							* Generic flags parser
							* @function
							* @name Declaration#parseFlags
							* @memberOf module:php-parser
							* @param {Array<number|null>} flags
							* @return {void}
							*/
							Declaration.prototype.parseFlags = function(flags) {
								this.isAbstract = flags[2] === 1;
								this.isFinal = flags[2] === 2;
								this.isReadonly = flags[3] === 1;
								if (this.kind !== "class") {
									if (flags[0] === -1) this.visibility = IS_UNDEFINED;
									else if (flags[0] === null)
 /* istanbul ignore next */
									this.visibility = null;
									else if (flags[0] === 0) this.visibility = IS_PUBLIC;
									else if (flags[0] === 1) this.visibility = IS_PROTECTED;
									else if (flags[0] === 2) this.visibility = IS_PRIVATE;
									this.isStatic = flags[1] === 1;
								}
							};
							module$27.exports = Declaration;
						},
						5947(module$28, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Block = __webpack_require__(4628);
							var KIND = "declare";
							/**
							* The declare construct is used to set execution directives for a block of code
							* @constructor Declare
							* @memberOf module:php-parser
							* @extends {Block}
							* @property {DeclareDirective[]} directives
							* @property {string} mode
							* @see http://php.net/manual/en/control-structures.declare.php
							*/
							var Declare = Block["extends"](KIND, function Declare(directives, body, mode, docs, location) {
								Block.apply(this, [
									KIND,
									body,
									docs,
									location
								]);
								this.directives = directives;
								this.mode = mode;
							});
							/**
							* The node is declared as a short tag syntax :
							* ```php
							* <?php
							* declare(ticks=1):
							* // some statements
							* enddeclare;
							* ```
							* @constant {String} Declare#MODE_SHORT
							* @memberOf module:php-parser
							*/
							Declare.MODE_SHORT = "short";
							/**
							* The node is declared bracket enclosed code :
							* ```php
							* <?php
							* declare(ticks=1) {
							* // some statements
							* }
							* ```
							* @constant {String} Declare#MODE_BLOCK
							* @memberOf module:php-parser
							*/
							Declare.MODE_BLOCK = "block";
							/**
							* The node is declared as a simple statement. In order to make things simpler
							* children of the node are automatically collected until the next
							* declare statement.
							* ```php
							* <?php
							* declare(ticks=1);
							* // some statements
							* declare(ticks=2);
							* // some statements
							* ```
							* @constant {String} Declare#MODE_NONE
							* @memberOf module:php-parser
							*/
							Declare.MODE_NONE = "none";
							module$28.exports = Declare;
						},
						7786(module$29, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "declaredirective";
							/**
							* Defines a constant
							* @constructor DeclareDirective
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {Identifier} key
							* @property {Node|string|number|boolean|null} value
							*/
							module$29.exports = Node["extends"](KIND, function DeclareDirective(key, value, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.key = key;
								this.value = value;
							});
						},
						5436(module$30, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "do";
							/**
							* Defines a do/while statement
							* @constructor Do
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} test
							* @property {Block | null} body
							*/
							module$30.exports = Statement["extends"](KIND, function Do(test, body, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.body = body;
							});
						},
						1136(module$31, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "echo";
							/**
							* Defines system based call
							* @constructor Echo
							* @memberOf module:php-parser
							* @property {boolean} shortForm
							* @property {Expression[]} expressions
							* @extends {Statement}
							*/
							module$31.exports = Statement["extends"](KIND, function Echo(expressions, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.shortForm = shortForm;
								this.expressions = expressions;
							});
						},
						380(module$32, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "empty";
							/**
							* Defines an empty check call
							* @constructor Empty
							* @memberOf module:php-parser
							* @extends {Expression}
							*/
							module$32.exports = Expression["extends"](KIND, function Empty(expression, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expression = expression;
							});
						},
						6129(module$33, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "encapsed";
							/**
							* Defines an encapsed string (contains expressions)
							* @constructor Encapsed
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {String} type - Defines the type of encapsed string (shell, heredoc, string)
							* @property {String|Null} label - The heredoc label, defined only when the type is heredoc
							* @property {EncapsedPart[]} value
							*/
							var Encapsed = Literal["extends"](KIND, function Encapsed(value, raw, type, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
								this.type = type;
							});
							/**
							* The node is a double quote string :
							* ```php
							* <?php
							* echo "hello $world";
							* ```
							* @constant {String} Encapsed#TYPE_STRING - `string`
							* @memberOf module:php-parser
							*/
							Encapsed.TYPE_STRING = "string";
							/**
							* The node is a shell execute string :
							* ```php
							* <?php
							* echo `ls -larth $path`;
							* ```
							* @constant {String} Encapsed#TYPE_SHELL - `shell`
							* @memberOf module:php-parser
							*/
							Encapsed.TYPE_SHELL = "shell";
							/**
							* The node is a shell execute string :
							* ```php
							* <?php
							* echo <<<STR
							*  Hello $world
							* STR
							* ;
							* ```
							* @constant {String} Encapsed#TYPE_HEREDOC - `heredoc`
							* @memberOf module:php-parser
							*/
							Encapsed.TYPE_HEREDOC = "heredoc";
							/**
							* The node contains a list of constref / variables / expr :
							* ```php
							* <?php
							* echo $foo->bar_$baz;
							* ```
							* @constant {String} Encapsed#TYPE_OFFSET - `offset`
							* @memberOf module:php-parser
							*/
							Encapsed.TYPE_OFFSET = "offset";
							module$33.exports = Encapsed;
						},
						9723(module$34, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "encapsedpart";
							/**
							* Part of `Encapsed` node
							* @constructor EncapsedPart
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} expression
							* @property {String} syntax
							* @property {Boolean} curly
							*/
							module$34.exports = Expression["extends"](KIND, function EncapsedPart(expression, syntax, curly, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expression = expression;
								this.syntax = syntax;
								this.curly = curly;
							});
						},
						5125(module$35, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "entry";
							/**
							* An array entry - see [Array](#array)
							* @memberOf module:php-parser
							* @constructor Entry
							* @extends {Expression}
							* @property {Node|null} key The entry key/offset
							* @property {Node} value The entry value
							* @property {Boolean} byRef By reference
							* @property {Boolean} unpack Argument unpacking
							*/
							module$35.exports = Expression["extends"](KIND, function Entry(key, value, byRef, unpack, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.key = key;
								this.value = value;
								this.byRef = byRef;
								this.unpack = unpack;
							});
						},
						9632(module$36, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "enum";
							/**
							* A enum definition
							* @constructor Enum
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Identifier|null} valueType
							* @property {Identifier[]} implements
							* @property {Declaration[]} body
							* @property {AttrGroup[]} attrGroups
							*/
							module$36.exports = Declaration["extends"](KIND, function Enum(name, valueType, impl, body, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this.valueType = valueType;
								this["implements"] = impl;
								this.body = body;
								this.attrGroups = [];
							});
						},
						4300(module$37, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "enumcase";
							/**
							* Declares a cases into the current scope
							* @constructor EnumCase
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {string} name
							* @property {string|number|null} value
							*/
							module$37.exports = Node["extends"](KIND, function EnumCase(name, value, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.value = value;
							});
						},
						1515(module$38, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "error";
							/**
							* Defines an error node (used only on silentMode)
							* @constructor Error
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {string} message
							* @property {number} line
							* @property {number|string} token
							* @property {string|array} expected
							*/
							module$38.exports = Node["extends"](KIND, function Error(message, token, line, expected, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.message = message;
								this.token = token;
								this.line = line;
								this.expected = expected;
							});
						},
						3411(module$39, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "eval";
							/**
							* Defines an eval statement
							* @constructor Eval
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Node} source
							*/
							module$39.exports = Expression["extends"](KIND, function Eval(source, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.source = source;
							});
						},
						9781(module$40, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "exit";
							/**
							* Defines an exit / die call
							* @constructor Exit
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Node|null} expression
							* @property {boolean} useDie
							*/
							module$40.exports = Expression["extends"](KIND, function Exit(expression, useDie, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expression = expression;
								this.useDie = useDie;
							});
						},
						839(module$41, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "expression";
							/**
							* Any expression node. Since the left-hand side of an assignment may
							* be any expression in general, an expression can also be a pattern.
							* @constructor Expression
							* @memberOf module:php-parser
							* @extends {Node}
							*/
							module$41.exports = Node["extends"](KIND, function Expression(kind, docs, location) {
								Node.apply(this, [
									kind || KIND,
									docs,
									location
								]);
							});
						},
						8374(module$42, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "expressionstatement";
							/**
							* Defines an expression based statement
							* @constructor ExpressionStatement
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} expression
							*/
							module$42.exports = Statement["extends"](KIND, function ExpressionStatement(expr, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expression = expr;
							});
						},
						9754(module$43, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "for";
							/**
							* Defines a for iterator
							* @constructor For
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression[]} init
							* @property {Expression[]} test
							* @property {Expression[]} increment
							* @property {Block | null} body
							* @property {boolean} shortForm
							* @see http://php.net/manual/en/control-structures.for.php
							*/
							module$43.exports = Statement["extends"](KIND, function For(init, test, increment, body, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.init = init;
								this.test = test;
								this.increment = increment;
								this.shortForm = shortForm;
								this.body = body;
							});
						},
						4251(module$44, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "foreach";
							/**
							* Defines a foreach iterator
							* @constructor Foreach
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} source
							* @property {Expression|null} key
							* @property {Expression} value
							* @property {Block | null} body
							* @property {boolean} shortForm
							* @see http://php.net/manual/en/control-structures.foreach.php
							*/
							module$44.exports = Statement["extends"](KIND, function Foreach(source, key, value, body, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.source = source;
								this.key = key;
								this.value = value;
								this.shortForm = shortForm;
								this.body = body;
							});
						},
						6553(module$45, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "function";
							/**
							* Defines a classic function
							* @constructor Function
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Parameter[]} arguments
							* @property {Identifier} type
							* @property {boolean} byref
							* @property {boolean} nullable
							* @property {Block|null} body
							* @property {AttrGroup[]} attrGroups
							*/
							module$45.exports = Declaration["extends"](KIND, function _Function(name, args, byref, type, nullable, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this.arguments = args;
								this.byref = byref;
								this.type = type;
								this.nullable = nullable;
								this.body = null;
								this.attrGroups = [];
							});
						},
						8630(module$46, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "global";
							/**
							* Imports a variable from the global scope
							* @constructor Global
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Variable[]} items
							*/
							module$46.exports = Statement["extends"](KIND, function Global(items, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.items = items;
							});
						},
						9786(module$47, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "goto";
							/**
							* Defines goto statement
							* @constructor Goto
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {string} label
							* @see {Label}
							*/
							module$47.exports = Statement["extends"](KIND, function Goto(label, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.label = label;
							});
						},
						9742(module$48, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "halt";
							/**
							* Halts the compiler execution
							* @constructor Halt
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {String} after - String after the halt statement
							* @see http://php.net/manual/en/function.halt-compiler.php
							*/
							module$48.exports = Statement["extends"](KIND, function Halt(after, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.after = after;
							});
						},
						1234(module$49, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "identifier";
							module$49.exports = Node["extends"](KIND, function Identifier(name, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
							});
						},
						6(module$50, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "if";
							/**
							* Defines a if statement
							* @constructor If
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} test
							* @property {Block} body
							* @property {Block|If|null} alternate
							* @property {boolean} shortForm
							*/
							module$50.exports = Statement["extends"](KIND, function If(test, body, alternate, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.body = body;
								this.alternate = alternate;
								this.shortForm = shortForm;
							});
						},
						8861(module$51, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "include";
							/**
							* Defines system include call
							* @constructor Include
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Node} target
							* @property {boolean} once
							* @property {boolean} require
							*/
							module$51.exports = Expression["extends"](KIND, function Include(once, require, target, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.once = once;
								this.require = require;
								this.target = target;
							});
						},
						7860(module$52, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "inline";
							/**
							* Defines inline html output (treated as echo output)
							* @constructor Inline
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {string} value
							*/
							module$52.exports = Literal["extends"](KIND, function Inline(value, raw, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
							});
						},
						9834(module$53, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "interface";
							/**
							* An interface definition
							* @constructor Interface
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Identifier[]} extends
							* @property {Declaration[]} body
							* @property {AttrGroup[]} attrGroups
							*/
							module$53.exports = Declaration["extends"](KIND, function Interface(name, ext, body, attrGroups, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this["extends"] = ext;
								this.body = body;
								this.attrGroups = attrGroups;
							});
						},
						2724(module$54, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "intersectiontype";
							/**
							* A union of types
							* @memberOf module:php-parser
							* @constructor IntersectionType
							* @extends {Declaration}
							* @property {TypeReference[]} types
							*/
							module$54.exports = Declaration["extends"](KIND, function IntersectionType(types, docs, location) {
								Declaration.apply(this, [
									KIND,
									null,
									docs,
									location
								]);
								this.types = types;
							});
						},
						6025(module$55, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "isset";
							/**
							* Defines an isset call
							* @constructor Isset
							* @memberOf module:php-parser
							* @extends {Expression}
							*/
							module$55.exports = Expression["extends"](KIND, function Isset(variables, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.variables = variables;
							});
						},
						2687(module$56, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "label";
							/**
							* A label statement (referenced by goto)
							* @constructor Label
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {String} name
							*/
							module$56.exports = Statement["extends"](KIND, function Label(name, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
							});
						},
						7633(module$57, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "list";
							/**
							* Defines list assignment
							* @constructor List
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {boolean} shortForm
							* @property {Entry[]} items
							*/
							module$57.exports = Expression["extends"](KIND, function List(items, shortForm, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.items = items;
								this.shortForm = shortForm;
							});
						},
						5514(module$58, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "literal";
							/**
							* Defines an array structure
							* @constructor Literal
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {string} raw
							* @property {EncapsedPart[]|Node|string|number|boolean|null} value
							*/
							module$58.exports = Expression["extends"](KIND, function Literal(kind, value, raw, docs, location) {
								Expression.apply(this, [
									kind || KIND,
									docs,
									location
								]);
								this.value = value;
								if (raw) this.raw = raw;
							});
						},
						4778(module$59) {
							module$59.exports = function Location(source, start, end) {
								this.source = source;
								this.start = start;
								this.end = end;
							};
						},
						7427(module$60, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expr = __webpack_require__(839);
							var KIND = "lookup";
							/**
							* Lookup on an offset in the specified object
							* @constructor Lookup
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} what
							* @property {Expression} offset
							*/
							module$60.exports = Expr["extends"](KIND, function Lookup(kind, what, offset, docs, location) {
								Expr.apply(this, [
									kind || KIND,
									docs,
									location
								]);
								this.what = what;
								this.offset = offset;
							});
						},
						1122(module$61, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "magic";
							/**
							* Defines magic constant
							* @constructor Magic
							* @memberOf module:php-parser
							* @extends {Literal}
							*/
							module$61.exports = Literal["extends"](KIND, function Magic(value, raw, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
							});
						},
						7256(module$62, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "match";
							/**
							* Defines a match expression
							* @memberOf module:php-parser
							* @constructor Match
							* @extends {Expression}
							* @property {Expression} cond Condition expression to match against
							* @property {MatchArm[]} arms Arms for comparison
							*/
							module$62.exports = Expression["extends"](KIND, function Match(cond, arms, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.cond = cond;
								this.arms = arms;
							});
						},
						7416(module$63, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "matcharm";
							/**
							* An array entry - see [Array](#array)
							* @memberOf module:php-parser
							* @constructor MatchArm
							* @extends {Expression}
							* @property {Expression[]|null} conds The match condition expression list - null indicates default arm
							* @property {Expression} body The return value expression
							*/
							module$63.exports = Expression["extends"](KIND, function MatchArm(conds, body, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.conds = conds;
								this.body = body;
							});
						},
						8140(module$64, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Function_ = __webpack_require__(6553);
							var KIND = "method";
							/**
							* Defines a class/interface/trait method
							* @constructor Method
							* @memberOf module:php-parser
							* @extends {Function}
							* @property {boolean} isAbstract
							* @property {boolean} isFinal
							* @property {boolean} isStatic
							* @property {string} visibility
							*/
							module$64.exports = Function_["extends"](KIND, function Method() {
								Function_.apply(this, arguments);
								this.kind = KIND;
							});
						},
						6258(module$65, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Reference = __webpack_require__(8276);
							var KIND = "name";
							/**
							* Defines a class reference node
							* @constructor Name
							* @memberOf module:php-parser
							* @extends {Reference}
							* @property {string} name
							* @property {string} resolution
							*/
							var Name = Reference["extends"](KIND, function Name(name, resolution, docs, location) {
								Reference.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name.replace(/\\$/, "");
								this.resolution = resolution;
							});
							/**
							* This is an identifier without a namespace separator, such as Foo
							* @constant {String} Name#UNQUALIFIED_NAME
							* @memberOf module:php-parser
							*/
							Name.UNQUALIFIED_NAME = "uqn";
							/**
							* This is an identifier with a namespace separator, such as Foo\Bar
							* @constant {String} Name#QUALIFIED_NAME
							* @memberOf module:php-parser
							*/
							Name.QUALIFIED_NAME = "qn";
							/**
							* This is an identifier with a namespace separator that begins with
							* a namespace separator, such as \Foo\Bar. The namespace \Foo is also
							* a fully qualified name.
							* @constant {String} Name#FULL_QUALIFIED_NAME
							* @memberOf module:php-parser
							*/
							Name.FULL_QUALIFIED_NAME = "fqn";
							/**
							* This is an identifier starting with namespace, such as namespace\Foo\Bar.
							* @constant {String} Name#RELATIVE_NAME
							* @memberOf module:php-parser
							*/
							Name.RELATIVE_NAME = "rn";
							module$65.exports = Name;
						},
						6827(module$66, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "namedargument";
							/**
							* Named arguments.
							* @memberOf module:php-parser
							* @constructor namedargument
							* @extends {Expression}
							* @property {String} name
							* @property {Expression} value
							* @see https://www.php.net/manual/en/functions.arguments.php#functions.named-arguments
							*/
							module$66.exports = Expression["extends"](KIND, function namedargument(name, value, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.value = value;
							});
						},
						9474(module$67, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Block = __webpack_require__(4628);
							var KIND = "namespace";
							/**
							* The main program node
							* @constructor Namespace
							* @memberOf module:php-parser
							* @extends {Block}
							* @property {string} name
							* @property {boolean} withBrackets
							*/
							module$67.exports = Block["extends"](KIND, function Namespace(name, children, withBrackets, docs, location) {
								Block.apply(this, [
									KIND,
									children,
									docs,
									location
								]);
								this.name = name;
								this.withBrackets = withBrackets || false;
							});
						},
						4427(module$68, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "new";
							/**
							* Creates a new instance of the specified class
							* @constructor New
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Identifier|Variable|Class} what
							* @property {Variable[]} arguments
							*/
							module$68.exports = Expression["extends"](KIND, function New(what, args, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
								this.arguments = args;
							});
						},
						4065(module$69) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							/**
							* A generic AST node
							* @constructor Node
							* @memberOf module:php-parser
							* @property {Location|null} loc
							* @property {CommentBlock[]|Comment[]|null} leadingComments
							* @property {CommentBlock[]|Comment[]|null} trailingComments
							* @property {string} kind
							*/
							var Node = function Node(kind, docs, location) {
								this.kind = kind;
								if (docs) this.leadingComments = docs;
								if (location) this.loc = location;
							};
							/**
							* Attach comments to current node
							* @function Node#setTrailingComments
							* @memberOf module:php-parser
							* @param {*} docs
							*/
							Node.prototype.setTrailingComments = function(docs) {
								this.trailingComments = docs;
							};
							/**
							* Destroying an unused node
							* @function Node#destroy
							* @memberOf module:php-parser
							*/
							Node.prototype.destroy = function(node) {
								if (!node)
 /* istanbul ignore next */
								throw new Error("Node already initialized, you must swap with another node");
								if (this.leadingComments) if (node.leadingComments) node.leadingComments = Array.concat(this.leadingComments, node.leadingComments);
								else node.leadingComments = this.leadingComments;
								if (this.trailingComments) if (node.trailingComments) node.trailingComments = Array.concat(this.trailingComments, node.trailingComments);
								else node.trailingComments = this.trailingComments;
								return node;
							};
							/**
							* Includes current token position of the parser
							* @function Node#includeToken
							* @memberOf module:php-parser
							* @param {*} parser
							*/
							Node.prototype.includeToken = function(parser) {
								if (this.loc) {
									if (this.loc.end) {
										this.loc.end.line = parser.lexer.yylloc.last_line;
										this.loc.end.column = parser.lexer.yylloc.last_column;
										this.loc.end.offset = parser.lexer.offset;
									}
									if (parser.ast.withSource) this.loc.source = parser.lexer._input.substring(this.loc.start.offset, parser.lexer.offset);
								}
								return this;
							};
							/**
							* Helper for extending the Node class
							* @function Node.extends
							* @memberOf module:php-parser
							* @param {string} type
							* @param {Function} constructor
							* @return {Function}
							*/
							Node["extends"] = function(type, constructor) {
								constructor.prototype = Object.create(this.prototype);
								constructor["extends"] = this["extends"];
								constructor.prototype.constructor = constructor;
								constructor.kind = type;
								return constructor;
							};
							module$69.exports = Node;
						},
						4297(module$70, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "noop";
							/**
							* Ignore this node, it implies a no operation block, for example :
							* [$foo, $bar, /* here a noop node * /]
							* @constructor Noop
							* @memberOf module:php-parser
							* @extends {Node}
							*/
							module$70.exports = Node["extends"](KIND, function Noop(docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
							});
						},
						5859(module$71, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "nowdoc";
							/**
							* Defines a nowdoc string
							* @constructor NowDoc
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {string} label
							* @property {string} raw
							* @property {string} value
							*/
							module$71.exports = Literal["extends"](KIND, function Nowdoc(value, raw, label, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
								this.label = label;
							});
						},
						6985(module$72, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "nullkeyword";
							/**
							* Represents the null keyword
							* @constructor NullKeyword
							* @memberOf module:php-parser
							* @extends {Node}
							*/
							module$72.exports = Node["extends"](KIND, function NullKeyword(raw, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.raw = raw;
							});
						},
						9302(module$73, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Lookup = __webpack_require__(7427);
							var KIND = "nullsafepropertylookup";
							/**
							* Lookup to an object property
							* @memberOf module:php-parser
							* @constructor NullSafePropertyLookup
							* @extends {Lookup}
							*/
							module$73.exports = Lookup["extends"](KIND, function NullSafePropertyLookup(what, offset, docs, location) {
								Lookup.apply(this, [
									KIND,
									what,
									offset,
									docs,
									location
								]);
							});
						},
						8212(module$74, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "number";
							/**
							* Defines a numeric value
							* @constructor Number
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {number} value
							*/
							module$74.exports = Literal["extends"](KIND, function Number(value, raw, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
							});
						},
						864(module$75, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Lookup = __webpack_require__(7427);
							var KIND = "offsetlookup";
							/**
							* Lookup on an offset in an array
							* @constructor OffsetLookup
							* @memberOf module:php-parser
							* @extends {Lookup}
							*/
							module$75.exports = Lookup["extends"](KIND, function OffsetLookup(what, offset, docs, location) {
								Lookup.apply(this, [
									KIND,
									what,
									offset,
									docs,
									location
								]);
							});
						},
						8268(module$76, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expr = __webpack_require__(839);
							var KIND = "operation";
							/**
							* Defines binary operations
							* @constructor Operation
							* @memberOf module:php-parser
							* @extends {Expression}
							*/
							module$76.exports = Expr["extends"](KIND, function Operation(kind, docs, location) {
								Expr.apply(this, [
									kind || KIND,
									docs,
									location
								]);
							});
						},
						7190(module$77, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "parameter";
							/**
							* @memberOf module:php-parser
							* @typedef {1} MODIFIER_PUBLIC
							**/
							/**
							* @memberOf module:php-parser
							* @typedef {2} MODIFIER_PROTECTED
							**/
							/**
							* @memberOf module:php-parser
							* @typedef {4} MODIFIER_PRIVATE
							**/
							/**
							* Defines a function parameter
							* @constructor Parameter
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Identifier|null} type
							* @property {Node|null} value
							* @property {boolean} byref
							* @property {boolean} variadic
							* @property {boolean} readonly
							* @property {boolean} nullable
							* @property {AttrGroup[]} attrGroups
							* @property {MODIFIER_PUBLIC|MODIFIER_PROTECTED|MODIFIER_PRIVATE} flags
							*/
							module$77.exports = Declaration["extends"](KIND, function Parameter(name, type, value, isRef, isVariadic, readonly, nullable, flags, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this.value = value;
								this.type = type;
								this.byref = isRef;
								this.variadic = isVariadic;
								this.readonly = readonly;
								this.nullable = nullable;
								this.flags = flags || 0;
								this.attrGroups = [];
							});
						},
						8519(module$78, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Reference = __webpack_require__(8276);
							var KIND = "parentreference";
							module$78.exports = Reference["extends"](KIND, function ParentReference(raw, docs, location) {
								Reference.apply(this, [
									KIND,
									docs,
									location
								]);
								this.raw = raw;
							});
						},
						8822(module$79) {
							module$79.exports = function Position(line, column, offset) {
								this.line = line;
								this.column = column;
								this.offset = offset;
							};
						},
						4835(module$80, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Operation = __webpack_require__(8268);
							var KIND = "post";
							/**
							* Defines a post operation `$i++` or `$i--`
							* @constructor Post
							* @memberOf module:php-parser
							* @extends {Operation}
							* @property {String} type
							* @property {Variable} what
							*/
							module$80.exports = Operation["extends"](KIND, function Post(type, what, docs, location) {
								Operation.apply(this, [
									KIND,
									docs,
									location
								]);
								this.type = type;
								this.what = what;
							});
						},
						2056(module$81, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Operation = __webpack_require__(8268);
							var KIND = "pre";
							/**
							* Defines a pre operation `++$i` or `--$i`
							* @constructor Pre
							* @memberOf module:php-parser
							* @extends {Operation}
							* @property {String} type
							* @property {Variable} what
							*/
							module$81.exports = Operation["extends"](KIND, function Pre(type, what, docs, location) {
								Operation.apply(this, [
									KIND,
									docs,
									location
								]);
								this.type = type;
								this.what = what;
							});
						},
						4838(module$82, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "print";
							/**
							* Outputs
							* @constructor Print
							* @memberOf module:php-parser
							* @extends {Expression}
							*/
							module$82.exports = Expression["extends"](KIND, function Print(expression, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expression = expression;
							});
						},
						7869(module$83, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Block = __webpack_require__(4628);
							var KIND = "program";
							/**
							* The main program node
							* @constructor Program
							* @memberOf module:php-parser
							* @extends {Block}
							* @property {Error[]} errors
							* @property {Comment[]|null} comments
							* @property {String[]|null} tokens
							*/
							module$83.exports = Block["extends"](KIND, function Program(children, errors, comments, tokens, docs, location) {
								Block.apply(this, [
									KIND,
									children,
									docs,
									location
								]);
								this.errors = errors;
								if (comments) this.comments = comments;
								if (tokens) this.tokens = tokens;
							});
						},
						1908(module$84, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "property";
							/**
							* Defines a class property
							* @constructor Property
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {string} name
							* @property {Node|null} value
							* @property {boolean} readonly
							* @property {boolean} nullable
							* @property {Identifier|Array<Identifier>|null} type
							* @property {AttrGroup[]} attrGroups
							*/
							module$84.exports = Statement["extends"](KIND, function Property(name, value, readonly, nullable, type, attrGroups, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.value = value;
								this.readonly = readonly;
								this.nullable = nullable;
								this.type = type;
								this.attrGroups = attrGroups;
							});
						},
						170(module$85, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Lookup = __webpack_require__(7427);
							var KIND = "propertylookup";
							/**
							* Lookup to an object property
							* @memberOf module:php-parser
							* @constructor PropertyLookup
							* @extends {Lookup}
							*/
							module$85.exports = Lookup["extends"](KIND, function PropertyLookup(what, offset, docs, location) {
								Lookup.apply(this, [
									KIND,
									what,
									offset,
									docs,
									location
								]);
							});
						},
						1091(module$86, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "propertystatement";
							var IS_UNDEFINED = "";
							var IS_PUBLIC = "public";
							var IS_PROTECTED = "protected";
							var IS_PRIVATE = "private";
							/**
							* Declares a properties into the current scope
							* @constructor PropertyStatement
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Property[]} properties
							* @property {string|null} visibility
							* @property {boolean} isStatic
							*/
							var PropertyStatement = Statement["extends"](KIND, function PropertyStatement(kind, properties, flags, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.properties = properties;
								this.parseFlags(flags);
							});
							/**
							* Generic flags parser
							* @function PropertyStatement#parseFlags
							* @memberOf module:php-parser
							* @param {Array<number|null>} flags
							* @return {void}
							*/
							PropertyStatement.prototype.parseFlags = function(flags) {
								if (flags[0] === -1) this.visibility = IS_UNDEFINED;
								else if (flags[0] === null) this.visibility = null;
								else if (flags[0] === 0) this.visibility = IS_PUBLIC;
								else if (flags[0] === 1) this.visibility = IS_PROTECTED;
								else if (flags[0] === 2) this.visibility = IS_PRIVATE;
								this.isStatic = flags[1] === 1;
							};
							module$86.exports = PropertyStatement;
						},
						8276(module$87, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "reference";
							module$87.exports = Node["extends"](KIND, function Reference(kind, docs, location) {
								Node.apply(this, [
									kind || KIND,
									docs,
									location
								]);
							});
						},
						1842(module$88, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "retif";
							/**
							* Defines a short if statement that returns a value
							* @constructor RetIf
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} test
							* @property {Expression} trueExpr
							* @property {Expression} falseExpr
							*/
							module$88.exports = Expression["extends"](KIND, function RetIf(test, trueExpr, falseExpr, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.trueExpr = trueExpr;
								this.falseExpr = falseExpr;
							});
						},
						5739(module$89, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "return";
							/**
							* A continue statement
							* @constructor Return
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression|null} expr
							*/
							module$89.exports = Statement["extends"](KIND, function Return(expr, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expr = expr;
							});
						},
						1274(module$90, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Reference = __webpack_require__(8276);
							var KIND = "selfreference";
							module$90.exports = Reference["extends"](KIND, function SelfReference(raw, docs, location) {
								Reference.apply(this, [
									KIND,
									docs,
									location
								]);
								this.raw = raw;
							});
						},
						4352(module$91, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "silent";
							/**
							* Avoids to show/log warnings & notices from the inner expression
							* @constructor Silent
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} expr
							*/
							module$91.exports = Expression["extends"](KIND, function Silent(expr, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.expr = expr;
							});
						},
						9672(module$92, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "statement";
							/**
							* Any statement.
							* @constructor Statement
							* @memberOf module:php-parser
							* @extends {Node}
							*/
							module$92.exports = Node["extends"](KIND, function Statement(kind, docs, location) {
								Node.apply(this, [
									kind || KIND,
									docs,
									location
								]);
							});
						},
						711(module$93, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "static";
							/**
							* Declares a static variable into the current scope
							* @constructor Static
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {StaticVariable[]} variables
							*/
							module$93.exports = Statement["extends"](KIND, function Static(variables, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.variables = variables;
							});
						},
						1865(module$94, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Lookup = __webpack_require__(7427);
							var KIND = "staticlookup";
							/**
							* Lookup to a static property
							* @constructor StaticLookup
							* @memberOf module:php-parser
							* @extends {Lookup}
							*/
							module$94.exports = Lookup["extends"](KIND, function StaticLookup(what, offset, docs, location) {
								Lookup.apply(this, [
									KIND,
									what,
									offset,
									docs,
									location
								]);
							});
						},
						1102(module$95, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Reference = __webpack_require__(8276);
							var KIND = "staticreference";
							module$95.exports = Reference["extends"](KIND, function StaticReference(raw, docs, location) {
								Reference.apply(this, [
									KIND,
									docs,
									location
								]);
								this.raw = raw;
							});
						},
						1231(module$96, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "staticvariable";
							/**
							* Defines a constant
							* @constructor StaticVariable
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {Variable} variable
							* @property {Node|string|number|boolean|null} defaultValue
							*/
							module$96.exports = Node["extends"](KIND, function StaticVariable(variable, defaultValue, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.variable = variable;
								this.defaultValue = defaultValue;
							});
						},
						7472(module$97, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Literal = __webpack_require__(5514);
							var KIND = "string";
							/**
							* Defines a string (simple or double quoted) - chars are already escaped
							* @constructor String
							* @memberOf module:php-parser
							* @extends {Literal}
							* @property {boolean} unicode
							* @property {boolean} isDoubleQuote
							* @see {Encapsed}
							* @property {string} value
							*/
							module$97.exports = Literal["extends"](KIND, function String(isDoubleQuote, value, unicode, raw, docs, location) {
								Literal.apply(this, [
									KIND,
									value,
									raw,
									docs,
									location
								]);
								this.unicode = unicode;
								this.isDoubleQuote = isDoubleQuote;
							});
						},
						6133(module$98, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "switch";
							/**
							* Defines a switch statement
							* @constructor Switch
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} test
							* @property {Block} body
							* @property {boolean} shortForm
							*/
							module$98.exports = Statement["extends"](KIND, function Switch(test, body, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.body = body;
								this.shortForm = shortForm;
							});
						},
						1197(module$99, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "throw";
							/**
							* Defines a throw statement
							* @constructor Throw
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} what
							*/
							module$99.exports = Statement["extends"](KIND, function Throw(what, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
							});
						},
						6649(module$100, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "trait";
							/**
							* A trait definition
							* @constructor Trait
							* @memberOf module:php-parser
							* @extends {Declaration}
							* @property {Declaration[]} body
							*/
							module$100.exports = Declaration["extends"](KIND, function Trait(name, body, docs, location) {
								Declaration.apply(this, [
									KIND,
									name,
									docs,
									location
								]);
								this.body = body;
							});
						},
						1837(module$101, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "traitalias";
							var IS_UNDEFINED = "";
							var IS_PUBLIC = "public";
							var IS_PROTECTED = "protected";
							var IS_PRIVATE = "private";
							/**
							* Defines a trait alias
							* @constructor TraitAlias
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {Identifier|null} trait
							* @property {Identifier} method
							* @property {Identifier|null} as
							* @property {string|null} visibility
							*/
							module$101.exports = Node["extends"](KIND, function TraitAlias(trait, method, as, flags, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.trait = trait;
								this.method = method;
								this.as = as;
								this.visibility = IS_UNDEFINED;
								if (flags) {
									if (flags[0] === 0) this.visibility = IS_PUBLIC;
									else if (flags[0] === 1) this.visibility = IS_PROTECTED;
									else if (flags[0] === 2) this.visibility = IS_PRIVATE;
								}
							});
						},
						2277(module$102, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "traitprecedence";
							/**
							* Defines a trait alias
							* @constructor TraitPrecedence
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {Identifier|null} trait
							* @property {Identifier} method
							* @property {Identifier[]} instead
							*/
							module$102.exports = Node["extends"](KIND, function TraitPrecedence(trait, method, instead, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.trait = trait;
								this.method = method;
								this.instead = instead;
							});
						},
						8010(module$103, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "traituse";
							/**
							* Defines a trait usage
							* @constructor TraitUse
							* @memberOf module:php-parser
							* @extends {Node}
							* @property {Identifier[]} traits
							* @property {Node[]|null} adaptations
							*/
							module$103.exports = Node["extends"](KIND, function TraitUse(traits, adaptations, docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
								this.traits = traits;
								this.adaptations = adaptations;
							});
						},
						7579(module$104, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "try";
							/**
							* Defines a try statement
							* @constructor Try
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Block} body
							* @property {Catch[]} catches
							* @property {Block} always
							*/
							module$104.exports = Statement["extends"](KIND, function Try(body, catches, always, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.body = body;
								this.catches = catches;
								this.always = always;
							});
						},
						3460(module$105, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Reference = __webpack_require__(8276);
							var KIND = "typereference";
							/**
							* Defines a class reference node
							* @constructor TypeReference
							* @memberOf module:php-parser
							* @extends {Reference}
							* @property {string} name
							*/
							var TypeReference = Reference["extends"](KIND, function TypeReference(name, raw, docs, location) {
								Reference.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.raw = raw;
							});
							TypeReference.types = [
								"int",
								"float",
								"string",
								"bool",
								"object",
								"array",
								"callable",
								"iterable",
								"void",
								"static"
							];
							module$105.exports = TypeReference;
						},
						2702(module$106, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Operation = __webpack_require__(8268);
							var KIND = "unary";
							/**
							* Unary operations
							* @constructor Unary
							* @memberOf module:php-parser
							* @extends {Operation}
							* @property {string} type
							* @property {Expression} what
							*/
							module$106.exports = Operation["extends"](KIND, function Unary(type, what, docs, location) {
								Operation.apply(this, [
									KIND,
									docs,
									location
								]);
								this.type = type;
								this.what = what;
							});
						},
						514(module$107, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Declaration = __webpack_require__(8533);
							var KIND = "uniontype";
							/**
							* A union of types
							* @memberOf module:php-parser
							* @constructor UnionType
							* @extends {Declaration}
							* @property {TypeReference[]} types
							*/
							module$107.exports = Declaration["extends"](KIND, function UnionType(types, docs, location) {
								Declaration.apply(this, [
									KIND,
									null,
									docs,
									location
								]);
								this.types = types;
							});
						},
						5684(module$108, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "unset";
							/**
							* Deletes references to a list of variables
							* @constructor Unset
							* @memberOf module:php-parser
							* @extends {Statement}
							*/
							module$108.exports = Statement["extends"](KIND, function Unset(variables, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.variables = variables;
							});
						},
						8019(module$109, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "usegroup";
							/**
							* Defines a use statement (with a list of use items)
							* @constructor UseGroup
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {string|null} name
							* @property {string|null} type - Possible value : function, const
							* @property {UseItem[]} item
							* @see {Namespace}
							* @see http://php.net/manual/en/language.namespaces.importing.php
							*/
							module$109.exports = Statement["extends"](KIND, function UseGroup(name, type, items, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.type = type;
								this.items = items;
							});
						},
						7721(module$110, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "useitem";
							/**
							* Defines a use statement (from namespace)
							* @constructor UseItem
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {string} name
							* @property {string|null} type - Possible value : function, const
							* @property {Identifier|null} alias
							* @see {Namespace}
							* @see http://php.net/manual/en/language.namespaces.importing.php
							*/
							var UseItem = Statement["extends"](KIND, function UseItem(name, alias, type, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.alias = alias;
								this.type = type;
							});
							/**
							* Importing a constant
							* @constant {string} UseItem#TYPE_CONST
							* @memberOf module:php-parser
							*/
							UseItem.TYPE_CONST = "const";
							/**
							* Importing a function
							* @constant {string} UseItem#TYPE_FUNC
							* @memberOf module:php-parser
							*/
							UseItem.TYPE_FUNCTION = "function";
							module$110.exports = UseItem;
						},
						4369(module$111, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "variable";
							/**
							* Any expression node. Since the left-hand side of an assignment may
							* be any expression in general, an expression can also be a pattern.
							* @constructor Variable
							* @memberOf module:php-parser
							* @extends {Expression}
							* @example
							* // PHP code :
							* $foo
							* // AST output
							* {
							*  "kind": "variable",
							*  "name": "foo",
							*  "curly": false
							* }
							* @property {string|Node} name The variable name (can be a complex expression when the name is resolved dynamically)
							* @property {boolean} curly Indicate if the name is defined between curlies, ex `${foo}`
							*/
							module$111.exports = Expression["extends"](KIND, function Variable(name, curly, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.name = name;
								this.curly = curly || false;
							});
						},
						40(module$112, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "variadic";
							/**
							* Introduce a list of items into the arguments of the call
							* @constructor Variadic
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Array|Expression} what
							* @see https://wiki.php.net/rfc/argument_unpacking
							*/
							module$112.exports = Expression["extends"](KIND, function variadic(what, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.what = what;
							});
						},
						4919(module$113, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Node = __webpack_require__(4065);
							var KIND = "variadicplaceholder";
							/**
							* Defines a variadic placeholder (the ellipsis in PHP 8.1+'s first-class callable syntax)
							* @constructor VariadicPlaceholder
							* @memberOf module:php-parser
							* @extends {Node}
							* @see {Namespace}
							* @see http://php.net/manual/en/language.namespaces.importing.php
							*/
							module$113.exports = Node["extends"](KIND, function VariadicPlaceholder(docs, location) {
								Node.apply(this, [
									KIND,
									docs,
									location
								]);
							});
						},
						7676(module$114, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Statement = __webpack_require__(9672);
							var KIND = "while";
							/**
							* Defines a while statement
							* @constructor While
							* @memberOf module:php-parser
							* @extends {Statement}
							* @property {Expression} test
							* @property {Block | null} body
							* @property {boolean} shortForm
							*/
							module$114.exports = Statement["extends"](KIND, function While(test, body, shortForm, docs, location) {
								Statement.apply(this, [
									KIND,
									docs,
									location
								]);
								this.test = test;
								this.body = body;
								this.shortForm = shortForm;
							});
						},
						2596(module$115, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "yield";
							/**
							* Defines a yield generator statement
							* @constructor Yield
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression|null} value
							* @property {Expression|null} key
							* @see http://php.net/manual/en/language.generators.syntax.php
							*/
							module$115.exports = Expression["extends"](KIND, function Yield(value, key, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.value = value;
								this.key = key;
							});
						},
						6744(module$116, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Expression = __webpack_require__(839);
							var KIND = "yieldfrom";
							/**
							* Defines a yield from generator statement
							* @constructor YieldFrom
							* @memberOf module:php-parser
							* @extends {Expression}
							* @property {Expression} value
							* @see http://php.net/manual/en/language.generators.syntax.php
							*/
							module$116.exports = Expression["extends"](KIND, function YieldFrom(value, docs, location) {
								Expression.apply(this, [
									KIND,
									docs,
									location
								]);
								this.value = value;
							});
						},
						5362(module$117, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2020 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							function _typeof(o) {
								"@babel/helpers - typeof";
								return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
									return typeof o;
								} : function(o) {
									return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
								}, _typeof(o);
							}
							var lexer = __webpack_require__(9108);
							var parser = __webpack_require__(7259);
							var tokens = __webpack_require__(1906);
							var AST = __webpack_require__(8938);
							/**
							* @private
							*/
							function combine(src, to) {
								var keys = Object.keys(src);
								var i = keys.length;
								while (i--) {
									var k = keys[i];
									var val = src[k];
									if (val === null) delete to[k];
									else if (typeof val === "function") to[k] = val.bind(to);
									else if (Array.isArray(val)) to[k] = Array.isArray(to[k]) ? to[k].concat(val) : val;
									else if (_typeof(val) === "object") to[k] = _typeof(to[k]) === "object" ? combine(val, to[k]) : val;
									else to[k] = val;
								}
								return to;
							}
							/**
							* Initialise a new parser instance with the specified options
							*
							* @class
							* @memberOf module:php-parser
							* @tutorial Engine
							* @example
							* var parser = require('php-parser');
							* var instance = new parser({
							*   parser: {
							*     extractDoc: true,
							*     suppressErrors: true,
							*     version: 704 // or '7.4'
							*   },
							*   ast: {
							*     withPositions: true
							*   },
							*   lexer: {
							*     short_tags: true,
							*     asp_tags: true
							*   }
							* });
							*
							* var evalAST = instance.parseEval('some php code');
							* var codeAST = instance.parseCode('<?php some php code', 'foo.php');
							* var tokens = instance.tokenGetAll('<?php some php code');
							*
							* @param {Object} options - List of options
							* @property {Lexer} lexer
							* @property {Parser} parser
							* @property {AST} ast
							* @property {Object} tokens
							*/
							var Engine = function Engine(options) {
								if (typeof this === "function") return new this(options);
								this.tokens = tokens;
								this.lexer = new lexer(this);
								this.ast = new AST();
								this.parser = new parser(this.lexer, this.ast);
								if (options && _typeof(options) === "object") {
									if (options.parser) {
										if (!options.lexer) options.lexer = {};
										if (options.parser.version) {
											if (typeof options.parser.version === "string") {
												var version = options.parser.version.split(".");
												version = parseInt(version[0]) * 100 + parseInt(version[1]);
												if (isNaN(version)) throw new Error("Bad version number : " + options.parser.version);
												else options.parser.version = version;
											} else if (typeof options.parser.version !== "number") throw new Error("Expecting a number for version");
											if (options.parser.version < 500 || options.parser.version > 900) throw new Error("Can only handle versions between 5.x to 8.x");
										}
									}
									combine(options, this);
									this.lexer.version = this.parser.version;
								}
							};
							/**
							* Check if the inpyt is a buffer or a string
							* @private
							* @param  {Buffer|String} buffer Input value that can be either a buffer or a string
							* @return {String}   Returns the string from input
							*/
							var getStringBuffer = function getStringBuffer(buffer) {
								return typeof buffer.write === "function" ? buffer.toString() : buffer;
							};
							/**
							* Creates a new instance (Helper)
							* @param {Object} options
							* @return {Engine}
							* @private
							*/
							Engine.create = function(options) {
								return new Engine(options);
							};
							/**
							* Evaluate the buffer
							* @private
							*/
							Engine.parseEval = function(buffer, options) {
								return new Engine(options).parseEval(buffer);
							};
							/**
							* Parse an evaluating mode string (no need to open php tags)
							* @param {String} buffer
							* @return {Program}
							*/
							Engine.prototype.parseEval = function(buffer) {
								this.lexer.mode_eval = true;
								this.lexer.all_tokens = false;
								buffer = getStringBuffer(buffer);
								return this.parser.parse(buffer, "eval");
							};
							/**
							* Static function that parse a php code with open/close tags
							* @private
							*/
							Engine.parseCode = function(buffer, filename, options) {
								if (_typeof(filename) === "object" && !options) {
									options = filename;
									filename = "unknown";
								}
								return new Engine(options).parseCode(buffer, filename);
							};
							/**
							* Function that parse a php code with open/close tags
							*
							* Sample code :
							* ```php
							* <?php $x = 1;
							* ```
							*
							* Usage :
							* ```js
							* var parser = require('php-parser');
							* var phpParser = new parser({
							*   // some options
							* });
							* var ast = phpParser.parseCode('...php code...', 'foo.php');
							* ```
							* @param {String} buffer - The code to be parsed
							* @param {String} filename - Filename
							* @return {Program}
							*/
							Engine.prototype.parseCode = function(buffer, filename) {
								this.lexer.mode_eval = false;
								this.lexer.all_tokens = false;
								buffer = getStringBuffer(buffer);
								return this.parser.parse(buffer, filename);
							};
							/**
							* Split the buffer into tokens
							* @private
							*/
							Engine.tokenGetAll = function(buffer, options) {
								return new Engine(options).tokenGetAll(buffer);
							};
							/**
							* Extract tokens from the specified buffer.
							* > Note that the output tokens are *STRICLY* similar to PHP function `token_get_all`
							* @param {string} buffer
							* @return {Array<string|string[]>} - Each item can be a string or an array with following informations [token_name, text, line_number]
							*/
							Engine.prototype.tokenGetAll = function(buffer) {
								this.lexer.mode_eval = false;
								this.lexer.all_tokens = true;
								buffer = getStringBuffer(buffer);
								var EOF = this.lexer.EOF;
								var names = this.tokens.values;
								this.lexer.setInput(buffer);
								var token = this.lexer.lex() || EOF;
								var result = [];
								while (token != EOF) {
									var entry = this.lexer.yytext;
									if (Object.prototype.hasOwnProperty.call(names, token)) entry = [
										names[token],
										entry,
										this.lexer.yylloc.first_line
									];
									result.push(entry);
									token = this.lexer.lex() || EOF;
								}
								return result;
							};
							/** @module php-parser */
							module$117.exports = Engine;
							module$117.exports.tokens = tokens;
							module$117.exports.lexer = lexer;
							module$117.exports.AST = AST;
							module$117.exports.parser = parser;
							module$117.exports.combine = combine;
							module$117.exports.Engine = Engine;
							module$117.exports["default"] = Engine;
						},
						9108(module$118, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							/**
							* This is the php lexer. It will tokenize the string for helping the
							* parser to build the AST from its grammar.
							*
							* @constructor Lexer
							* @memberOf module:php-parser
							* @property {number} EOF
							* @property {boolean} all_tokens defines if all tokens must be retrieved (used by token_get_all only)
							* @property {boolean} comment_tokens extracts comments tokens
							* @property {boolean} mode_eval enables the evald mode (ignore opening tags)
							* @property {boolean} asp_tags disables by default asp tags mode
							* @property {boolean} short_tags enables by default short tags mode
							* @property {object} keywords List of php keyword
							* @property {object} castKeywords List of php keywords for type casting
							*/
							function _typeof(o) {
								"@babel/helpers - typeof";
								return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
									return typeof o;
								} : function(o) {
									return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
								}, _typeof(o);
							}
							var Lexer = function Lexer(engine) {
								this.engine = engine;
								this.tok = this.engine.tokens.names;
								this.EOF = 1;
								this.debug = false;
								this.all_tokens = true;
								this.comment_tokens = false;
								this.mode_eval = false;
								this.asp_tags = false;
								this.short_tags = false;
								this.version = 803;
								this.yyprevcol = 0;
								this.keywords = {
									__class__: this.tok.T_CLASS_C,
									__trait__: this.tok.T_TRAIT_C,
									__function__: this.tok.T_FUNC_C,
									__method__: this.tok.T_METHOD_C,
									__line__: this.tok.T_LINE,
									__file__: this.tok.T_FILE,
									__dir__: this.tok.T_DIR,
									__namespace__: this.tok.T_NS_C,
									exit: this.tok.T_EXIT,
									die: this.tok.T_EXIT,
									"function": this.tok.T_FUNCTION,
									"const": this.tok.T_CONST,
									"return": this.tok.T_RETURN,
									"try": this.tok.T_TRY,
									"catch": this.tok.T_CATCH,
									"finally": this.tok.T_FINALLY,
									"throw": this.tok.T_THROW,
									"if": this.tok.T_IF,
									elseif: this.tok.T_ELSEIF,
									endif: this.tok.T_ENDIF,
									"else": this.tok.T_ELSE,
									"while": this.tok.T_WHILE,
									endwhile: this.tok.T_ENDWHILE,
									"do": this.tok.T_DO,
									"for": this.tok.T_FOR,
									endfor: this.tok.T_ENDFOR,
									foreach: this.tok.T_FOREACH,
									endforeach: this.tok.T_ENDFOREACH,
									declare: this.tok.T_DECLARE,
									enddeclare: this.tok.T_ENDDECLARE,
									"instanceof": this.tok.T_INSTANCEOF,
									as: this.tok.T_AS,
									"switch": this.tok.T_SWITCH,
									endswitch: this.tok.T_ENDSWITCH,
									"case": this.tok.T_CASE,
									"default": this.tok.T_DEFAULT,
									"break": this.tok.T_BREAK,
									"continue": this.tok.T_CONTINUE,
									"goto": this.tok.T_GOTO,
									echo: this.tok.T_ECHO,
									print: this.tok.T_PRINT,
									"class": this.tok.T_CLASS,
									"interface": this.tok.T_INTERFACE,
									trait: this.tok.T_TRAIT,
									"enum": this.tok.T_ENUM,
									"extends": this.tok.T_EXTENDS,
									"implements": this.tok.T_IMPLEMENTS,
									"new": this.tok.T_NEW,
									clone: this.tok.T_CLONE,
									"var": this.tok.T_VAR,
									eval: this.tok.T_EVAL,
									include: this.tok.T_INCLUDE,
									include_once: this.tok.T_INCLUDE_ONCE,
									require: this.tok.T_REQUIRE,
									require_once: this.tok.T_REQUIRE_ONCE,
									namespace: this.tok.T_NAMESPACE,
									use: this.tok.T_USE,
									insteadof: this.tok.T_INSTEADOF,
									global: this.tok.T_GLOBAL,
									isset: this.tok.T_ISSET,
									empty: this.tok.T_EMPTY,
									__halt_compiler: this.tok.T_HALT_COMPILER,
									"static": this.tok.T_STATIC,
									"abstract": this.tok.T_ABSTRACT,
									"final": this.tok.T_FINAL,
									"private": this.tok.T_PRIVATE,
									"protected": this.tok.T_PROTECTED,
									"public": this.tok.T_PUBLIC,
									unset: this.tok.T_UNSET,
									list: this.tok.T_LIST,
									array: this.tok.T_ARRAY,
									callable: this.tok.T_CALLABLE,
									or: this.tok.T_LOGICAL_OR,
									and: this.tok.T_LOGICAL_AND,
									xor: this.tok.T_LOGICAL_XOR,
									match: this.tok.T_MATCH,
									readonly: this.tok.T_READ_ONLY
								};
								this.castKeywords = {
									"int": this.tok.T_INT_CAST,
									integer: this.tok.T_INT_CAST,
									real: this.tok.T_DOUBLE_CAST,
									"double": this.tok.T_DOUBLE_CAST,
									"float": this.tok.T_DOUBLE_CAST,
									string: this.tok.T_STRING_CAST,
									binary: this.tok.T_STRING_CAST,
									array: this.tok.T_ARRAY_CAST,
									object: this.tok.T_OBJECT_CAST,
									bool: this.tok.T_BOOL_CAST,
									"boolean": this.tok.T_BOOL_CAST,
									unset: this.tok.T_UNSET_CAST
								};
							};
							/**
							* Initialize the lexer with the specified input
							* @function Lexer#setInput
							* @memberOf module:php-parser
							*/
							Lexer.prototype.setInput = function(input) {
								this._input = input;
								this.size = input.length;
								this.yylineno = 1;
								this.offset = 0;
								this.yyprevcol = 0;
								this.yytext = "";
								this.yylloc = {
									first_offset: 0,
									first_line: 1,
									first_column: 0,
									prev_offset: 0,
									prev_line: 1,
									prev_column: 0,
									last_line: 1,
									last_column: 0
								};
								this.tokens = [];
								if (this.version > 703) this.keywords.fn = this.tok.T_FN;
								else delete this.keywords.fn;
								this.done = this.offset >= this.size;
								if (!this.all_tokens && this.mode_eval) {
									this.conditionStack = ["INITIAL"];
									this.begin("ST_IN_SCRIPTING");
								} else {
									this.conditionStack = [];
									this.begin("INITIAL");
								}
								this.heredoc_label = {
									label: "",
									length: 0,
									indentation: 0,
									indentation_uses_spaces: false,
									finished: false,
									first_encaps_node: false,
									toString: function toString() {
										this.label;
									}
								};
								return this;
							};
							/**
							* consumes and returns one char from the input
							* @function Lexer#input
							* @memberOf module:php-parser
							*/
							Lexer.prototype.input = function() {
								var ch = this._input[this.offset];
								if (!ch) return "";
								this.yytext += ch;
								this.offset++;
								if (ch === "\r" && this._input[this.offset] === "\n") {
									this.yytext += "\n";
									this.offset++;
								}
								if (ch === "\n" || ch === "\r") {
									this.yylloc.last_line = ++this.yylineno;
									this.yyprevcol = this.yylloc.last_column;
									this.yylloc.last_column = 0;
								} else this.yylloc.last_column++;
								return ch;
							};
							/**
							* revert eating specified size
							* @function Lexer#unput
							* @memberOf module:php-parser
							*/
							Lexer.prototype.unput = function(size) {
								if (size === 1) {
									this.offset--;
									if (this._input[this.offset] === "\n" && this._input[this.offset - 1] === "\r") {
										this.offset--;
										size++;
									}
									if (this._input[this.offset] === "\r" || this._input[this.offset] === "\n") {
										this.yylloc.last_line--;
										this.yylineno--;
										this.yylloc.last_column = this.yyprevcol;
									} else this.yylloc.last_column--;
									this.yytext = this.yytext.substring(0, this.yytext.length - size);
								} else if (size > 0) {
									this.offset -= size;
									if (size < this.yytext.length) {
										this.yytext = this.yytext.substring(0, this.yytext.length - size);
										this.yylloc.last_line = this.yylloc.first_line;
										this.yylloc.last_column = this.yyprevcol = this.yylloc.first_column;
										for (var i = 0; i < this.yytext.length; i++) {
											var c = this.yytext[i];
											if (c === "\r") {
												c = this.yytext[++i];
												this.yyprevcol = this.yylloc.last_column;
												this.yylloc.last_line++;
												this.yylloc.last_column = 0;
												if (c !== "\n") if (c === "\r") this.yylloc.last_line++;
												else this.yylloc.last_column++;
											} else if (c === "\n") {
												this.yyprevcol = this.yylloc.last_column;
												this.yylloc.last_line++;
												this.yylloc.last_column = 0;
											} else this.yylloc.last_column++;
										}
										this.yylineno = this.yylloc.last_line;
									} else {
										this.yytext = "";
										this.yylloc.last_line = this.yylineno = this.yylloc.first_line;
										this.yylloc.last_column = this.yylloc.first_column;
									}
								}
								return this;
							};
							/**
							* check if the text matches
							* @function Lexer#tryMatch
							* @memberOf module:php-parser
							* @param {string} text
							* @returns {boolean}
							*/
							Lexer.prototype.tryMatch = function(text) {
								return text === this.ahead(text.length);
							};
							/**
							* check if the text matches
							* @function Lexer#tryMatchCaseless
							* @memberOf module:php-parser
							* @param {string} text
							* @returns {boolean}
							*/
							Lexer.prototype.tryMatchCaseless = function(text) {
								return text === this.ahead(text.length).toLowerCase();
							};
							/**
							* look ahead
							* @function Lexer#ahead
							* @memberOf module:php-parser
							* @param {number} size
							* @returns {string}
							*/
							Lexer.prototype.ahead = function(size) {
								var text = this._input.substring(this.offset, this.offset + size);
								if (text[text.length - 1] === "\r" && this._input[this.offset + size + 1] === "\n") text += "\n";
								return text;
							};
							/**
							* consume the specified size
							* @function Lexer#consume
							* @memberOf module:php-parser
							* @param {number} size
							* @returns {Lexer}
							*/
							Lexer.prototype.consume = function(size) {
								for (var i = 0; i < size; i++) {
									var ch = this._input[this.offset];
									if (!ch) break;
									this.yytext += ch;
									this.offset++;
									if (ch === "\r" && this._input[this.offset] === "\n") {
										this.yytext += "\n";
										this.offset++;
										i++;
									}
									if (ch === "\n" || ch === "\r") {
										this.yylloc.last_line = ++this.yylineno;
										this.yyprevcol = this.yylloc.last_column;
										this.yylloc.last_column = 0;
									} else this.yylloc.last_column++;
								}
								return this;
							};
							/**
							* Gets the current state
							* @function Lexer#getState
							* @memberOf module:php-parser
							*/
							Lexer.prototype.getState = function() {
								return {
									yytext: this.yytext,
									offset: this.offset,
									yylineno: this.yylineno,
									yyprevcol: this.yyprevcol,
									yylloc: {
										first_offset: this.yylloc.first_offset,
										first_line: this.yylloc.first_line,
										first_column: this.yylloc.first_column,
										last_line: this.yylloc.last_line,
										last_column: this.yylloc.last_column
									},
									heredoc_label: this.heredoc_label
								};
							};
							/**
							* Sets the current lexer state
							* @function Lexer#setState
							* @memberOf module:php-parser
							*/
							Lexer.prototype.setState = function(state) {
								this.yytext = state.yytext;
								this.offset = state.offset;
								this.yylineno = state.yylineno;
								this.yyprevcol = state.yyprevcol;
								this.yylloc = state.yylloc;
								if (state.heredoc_label) this.heredoc_label = state.heredoc_label;
								return this;
							};
							/**
							* prepend next token
							* @function Lexer#appendToken
							* @memberOf module:php-parser
							* @param {*} value
							* @param {*} ahead
							* @returns {Lexer}
							*/
							Lexer.prototype.appendToken = function(value, ahead) {
								this.tokens.push([value, ahead]);
								return this;
							};
							/**
							* return next match that has a token
							* @function Lexer#lex
							* @memberOf module:php-parser
							* @returns {number|string}
							*/
							Lexer.prototype.lex = function() {
								this.yylloc.prev_offset = this.offset;
								this.yylloc.prev_line = this.yylloc.last_line;
								this.yylloc.prev_column = this.yylloc.last_column;
								var token = this.next() || this.lex();
								if (!this.all_tokens) {
									while (token === this.tok.T_WHITESPACE || !this.comment_tokens && (token === this.tok.T_COMMENT || token === this.tok.T_DOC_COMMENT) || token === this.tok.T_OPEN_TAG) token = this.next() || this.lex();
									if (token == this.tok.T_OPEN_TAG_WITH_ECHO) return this.tok.T_ECHO;
									else if (token === this.tok.T_CLOSE_TAG) return ";";
								}
								if (!this.yylloc.prev_offset) {
									this.yylloc.prev_offset = this.yylloc.first_offset;
									this.yylloc.prev_line = this.yylloc.first_line;
									this.yylloc.prev_column = this.yylloc.first_column;
								}
								return token;
							};
							/**
							* activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
							* @function Lexer#begin
							* @memberOf module:php-parser
							* @param {*} condition
							* @returns {Lexer}
							*/
							Lexer.prototype.begin = function(condition) {
								this.conditionStack.push(condition);
								this.curCondition = condition;
								this.stateCb = this["match" + condition];
								/* istanbul ignore next */
								if (typeof this.stateCb !== "function") throw new Error("Undefined condition state \"" + condition + "\"");
								return this;
							};
							/**
							* pop the previously active lexer condition state off the condition stack
							* @function Lexer#popState
							* @memberOf module:php-parser
							* @returns {string|*}
							*/
							Lexer.prototype.popState = function() {
								var condition = this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
								this.curCondition = this.conditionStack[this.conditionStack.length - 1];
								this.stateCb = this["match" + this.curCondition];
								/* istanbul ignore next */
								if (typeof this.stateCb !== "function") throw new Error("Undefined condition state \"" + this.curCondition + "\"");
								return condition;
							};
							/**
							* return next match in input
							* @function Lexer#next
							* @memberOf module:php-parser
							* @returns {number|*}
							*/
							Lexer.prototype.next = function() {
								var token;
								if (!this._input) this.done = true;
								this.yylloc.first_offset = this.offset;
								this.yylloc.first_line = this.yylloc.last_line;
								this.yylloc.first_column = this.yylloc.last_column;
								this.yytext = "";
								if (this.done) {
									this.yylloc.prev_offset = this.yylloc.first_offset;
									this.yylloc.prev_line = this.yylloc.first_line;
									this.yylloc.prev_column = this.yylloc.first_column;
									return this.EOF;
								}
								if (this.tokens.length > 0) {
									token = this.tokens.shift();
									if (_typeof(token[1]) === "object") this.setState(token[1]);
									else this.consume(token[1]);
									token = token[0];
								} else token = this.stateCb.apply(this, []);
								if (this.offset >= this.size && this.tokens.length === 0) this.done = true;
								/* istanbul ignore next */
								if (this.debug) {
									var tName = token;
									if (typeof tName === "number") tName = this.engine.tokens.values[tName];
									else tName = "\"" + tName + "\"";
									var e = /* @__PURE__ */ new Error(tName + "	from " + this.yylloc.first_line + "," + this.yylloc.first_column + "	 - to " + this.yylloc.last_line + "," + this.yylloc.last_column + "	\"" + this.yytext + "\"");
									console.error(e.stack);
								}
								return token;
							};
							[
								__webpack_require__(9671),
								__webpack_require__(2429),
								__webpack_require__(3683),
								__webpack_require__(6545),
								__webpack_require__(3810),
								__webpack_require__(8510),
								__webpack_require__(4401),
								__webpack_require__(4349),
								__webpack_require__(8582)
							].forEach(function(ext) {
								for (var k in ext) Lexer.prototype[k] = ext[k];
							});
							module$118.exports = Lexer;
						},
						9671(module$119) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$119.exports = {
								attributeIndex: 0,
								attributeListDepth: {},
								matchST_ATTRIBUTE: function matchST_ATTRIBUTE() {
									var ch = this.input();
									if (this.is_WHITESPACE()) {
										do
											this.input();
										while (this.is_WHITESPACE());
										this.unput(1);
										return null;
									}
									switch (ch) {
										case "]":
											if (this.attributeListDepth[this.attributeIndex] === 0) {
												delete this.attributeListDepth[this.attributeIndex];
												this.attributeIndex--;
												this.popState();
											} else
 /* istanbul ignore next */
											this.attributeListDepth[this.attributeIndex]--;
											return "]";
										case "(":
										case ")":
										case ":":
										case "=":
										case "|":
										case "&":
										case "^":
										case "-":
										case "+":
										case "*":
										case "%":
										case "~":
										case "<":
										case ">":
										case "!":
										case ".": return this.consume_TOKEN();
										case "[":
											this.attributeListDepth[this.attributeIndex]++;
											return "[";
										case ",": return ",";
										case "\"": return this.ST_DOUBLE_QUOTES();
										case "'": return this.T_CONSTANT_ENCAPSED_STRING();
										case "/": if (this._input[this.offset] === "/") return this.T_COMMENT();
										else if (this._input[this.offset] === "*") {
											this.input();
											return this.T_DOC_COMMENT();
										} else return this.consume_TOKEN();
									}
									if (this.is_LABEL_START() || ch === "\\") {
										while (this.offset < this.size) {
											var _ch = this.input();
											if (!(this.is_LABEL() || _ch === "\\")) {
												if (_ch) this.unput(1);
												break;
											}
										}
										return this.T_STRING();
									} else if (this.is_NUM()) return this.consume_NUM();
									/* istanbul ignore next */
									throw new Error("Bad terminal sequence \"".concat(ch, "\" at line ").concat(this.yylineno, " (offset ").concat(this.offset, ")"));
								}
							};
						},
						2429(module$120) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$120.exports = {
								T_COMMENT: function T_COMMENT() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (ch === "\n" || ch === "\r") return this.tok.T_COMMENT;
										else if (ch === "?" && !this.aspTagMode && this._input[this.offset] === ">") {
											this.unput(1);
											return this.tok.T_COMMENT;
										} else if (ch === "%" && this.aspTagMode && this._input[this.offset] === ">") {
											this.unput(1);
											return this.tok.T_COMMENT;
										}
									}
									return this.tok.T_COMMENT;
								},
								T_DOC_COMMENT: function T_DOC_COMMENT() {
									var ch = this.input();
									var token = this.tok.T_COMMENT;
									if (ch === "*") {
										ch = this.input();
										if (this.is_WHITESPACE()) token = this.tok.T_DOC_COMMENT;
										if (ch === "/") return token;
										else this.unput(1);
									}
									while (this.offset < this.size) {
										ch = this.input();
										if (ch === "*" && this._input[this.offset] === "/") {
											this.input();
											break;
										}
									}
									return token;
								}
							};
						},
						3683(module$121) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$121.exports = {
								nextINITIAL: function nextINITIAL() {
									if (this.conditionStack.length > 1 && this.conditionStack[this.conditionStack.length - 1] === "INITIAL") this.popState();
									else this.begin("ST_IN_SCRIPTING");
									return this;
								},
								matchINITIAL: function matchINITIAL() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (ch == "<") {
											ch = this.ahead(1);
											if (ch == "?") {
												if (this.tryMatch("?=")) {
													this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
													break;
												} else if (this.tryMatchCaseless("?php")) {
													ch = this._input[this.offset + 4];
													if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
														this.unput(1).appendToken(this.tok.T_OPEN_TAG, 6).nextINITIAL();
														break;
													}
												}
												if (this.short_tags) {
													this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
													break;
												}
											} else if (this.asp_tags && ch == "%") if (this.tryMatch("%=")) {
												this.aspTagMode = true;
												this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
												break;
											} else {
												this.aspTagMode = true;
												this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
												break;
											}
										}
									}
									if (this.yytext.length > 0) return this.tok.T_INLINE_HTML;
									else return false;
								}
							};
						},
						6545(module$122) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							/* istanbul ignore else  */
							var MAX_LENGTH_OF_LONG = 10;
							var long_min_digits = "2147483648";
							if (process$1.arch == "x64") {
								MAX_LENGTH_OF_LONG = 19;
								long_min_digits = "9223372036854775808";
							}
							module$122.exports = {
								consume_NUM: function consume_NUM() {
									var ch = this.yytext[0];
									var hasPoint = ch === ".";
									if (ch === "0") {
										ch = this.input();
										if (ch === "x" || ch === "X") {
											ch = this.input();
											if (ch !== "_" && this.is_HEX()) return this.consume_HNUM();
											else this.unput(ch ? 2 : 1);
										} else if (ch === "b" || ch === "B") {
											ch = this.input();
											if (ch !== "_" && ch === "0" || ch === "1") return this.consume_BNUM();
											else this.unput(ch ? 2 : 1);
										} else if (ch === "o" || ch === "O") {
											ch = this.input();
											if (ch !== "_" && this.is_OCTAL()) return this.consume_ONUM();
											else this.unput(ch ? 2 : 1);
										} else if (!this.is_NUM()) {
											if (ch) this.unput(1);
										}
									}
									while (this.offset < this.size) {
										var prev = ch;
										ch = this.input();
										if (ch === "_") {
											if (prev === "_") {
												this.unput(2);
												break;
											}
											if (prev === ".") {
												this.unput(1);
												break;
											}
											if (prev === "e" || prev === "E") {
												this.unput(2);
												break;
											}
										} else if (ch === ".") {
											if (hasPoint) {
												this.unput(1);
												break;
											}
											if (prev === "_") {
												this.unput(2);
												break;
											}
											hasPoint = true;
											continue;
										} else if (ch === "e" || ch === "E") {
											if (prev === "_") {
												this.unput(1);
												break;
											}
											var undo = 2;
											ch = this.input();
											if (ch === "+" || ch === "-") {
												undo = 3;
												ch = this.input();
											}
											if (this.is_NUM_START()) {
												this.consume_LNUM();
												return this.tok.T_DNUMBER;
											}
											this.unput(ch ? undo : undo - 1);
											break;
										}
										if (!this.is_NUM()) {
											if (ch) this.unput(1);
											break;
										}
									}
									if (hasPoint) return this.tok.T_DNUMBER;
									else if (this.yytext.length < MAX_LENGTH_OF_LONG - 1) return this.tok.T_LNUMBER;
									else {
										if (this.yytext.length < MAX_LENGTH_OF_LONG || this.yytext.length == MAX_LENGTH_OF_LONG && this.yytext < long_min_digits) return this.tok.T_LNUMBER;
										return this.tok.T_DNUMBER;
									}
								},
								consume_HNUM: function consume_HNUM() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (!this.is_HEX()) {
											if (ch) this.unput(1);
											break;
										}
									}
									return this.tok.T_LNUMBER;
								},
								consume_LNUM: function consume_LNUM() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (!this.is_NUM()) {
											if (ch) this.unput(1);
											break;
										}
									}
									return this.tok.T_LNUMBER;
								},
								consume_BNUM: function consume_BNUM() {
									var ch;
									while (this.offset < this.size) {
										ch = this.input();
										if (ch !== "0" && ch !== "1" && ch !== "_") {
											if (ch) this.unput(1);
											break;
										}
									}
									return this.tok.T_LNUMBER;
								},
								consume_ONUM: function consume_ONUM() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (!this.is_OCTAL()) {
											if (ch) this.unput(1);
											break;
										}
									}
									return this.tok.T_LNUMBER;
								}
							};
						},
						3810(module$123) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$123.exports = {
								matchST_LOOKING_FOR_PROPERTY: function matchST_LOOKING_FOR_PROPERTY() {
									var ch = this.input();
									if (ch === "-") {
										ch = this.input();
										if (ch === ">") return this.tok.T_OBJECT_OPERATOR;
										if (ch) this.unput(1);
									} else if (this.is_WHITESPACE()) return this.tok.T_WHITESPACE;
									else if (this.is_LABEL_START()) {
										this.consume_LABEL();
										this.popState();
										return this.tok.T_STRING;
									}
									this.popState();
									if (ch) this.unput(1);
									return false;
								},
								matchST_LOOKING_FOR_VARNAME: function matchST_LOOKING_FOR_VARNAME() {
									var ch = this.input();
									this.popState();
									this.begin("ST_IN_SCRIPTING");
									if (this.is_LABEL_START()) {
										this.consume_LABEL();
										ch = this.input();
										if (ch === "[" || ch === "}") {
											this.unput(1);
											return this.tok.T_STRING_VARNAME;
										} else this.unput(this.yytext.length);
									} else if (ch) this.unput(1);
									return false;
								},
								matchST_VAR_OFFSET: function matchST_VAR_OFFSET() {
									var ch = this.input();
									if (this.is_NUM_START()) {
										this.consume_NUM();
										return this.tok.T_NUM_STRING;
									} else if (ch === "]") {
										this.popState();
										return "]";
									} else if (ch === "$") {
										this.input();
										if (this.is_LABEL_START()) {
											this.consume_LABEL();
											return this.tok.T_VARIABLE;
										} else
 /* istanbul ignore next */
										throw new Error("Unexpected terminal");
									} else if (this.is_LABEL_START()) {
										this.consume_LABEL();
										return this.tok.T_STRING;
									} else if (this.is_WHITESPACE() || ch === "\\" || ch === "'" || ch === "#") return this.tok.T_ENCAPSED_AND_WHITESPACE;
									else if (ch === "[" || ch === "{" || ch === "}" || ch === "\"" || ch === "`" || this.is_TOKEN()) return ch;
									else
 /* istanbul ignore next */
									throw new Error("Unexpected terminal");
								}
							};
						},
						8510(module$124) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$124.exports = {
								matchST_IN_SCRIPTING: function matchST_IN_SCRIPTING() {
									var ch = this.input();
									switch (ch) {
										case " ":
										case "	":
										case "\n":
										case "\r":
										case "\r\n": return this.T_WHITESPACE();
										case "#":
											if (this.version >= 800 && this._input[this.offset] === "[") {
												this.input();
												this.attributeListDepth[++this.attributeIndex] = 0;
												this.begin("ST_ATTRIBUTE");
												return this.tok.T_ATTRIBUTE;
											}
											return this.T_COMMENT();
										case "/":
											if (this._input[this.offset] === "/") return this.T_COMMENT();
											else if (this._input[this.offset] === "*") {
												this.input();
												return this.T_DOC_COMMENT();
											}
											return this.consume_TOKEN();
										case "'": return this.T_CONSTANT_ENCAPSED_STRING();
										case "\"": return this.ST_DOUBLE_QUOTES();
										case "`":
											this.begin("ST_BACKQUOTE");
											return "`";
										case "?":
											if (!this.aspTagMode && this.tryMatch(">")) {
												this.input();
												var nextCH = this._input[this.offset];
												if (nextCH === "\n" || nextCH === "\r") this.input();
												if (this.conditionStack.length > 1) this.begin("INITIAL");
												return this.tok.T_CLOSE_TAG;
											}
											return this.consume_TOKEN();
										case "%":
											if (this.aspTagMode && this._input[this.offset] === ">") {
												this.input();
												ch = this._input[this.offset];
												if (ch === "\n" || ch === "\r") this.input();
												this.aspTagMode = false;
												if (this.conditionStack.length > 1) this.begin("INITIAL");
												return this.tok.T_CLOSE_TAG;
											}
											return this.consume_TOKEN();
										case "{":
											this.begin("ST_IN_SCRIPTING");
											return "{";
										case "}":
											if (this.conditionStack.length > 2) this.popState();
											return "}";
										default:
											if (ch === ".") {
												ch = this.input();
												if (this.is_NUM_START()) return this.consume_NUM();
												else if (ch) this.unput(1);
											}
											if (this.is_NUM_START()) return this.consume_NUM();
											else if (this.is_LABEL_START()) return this.consume_LABEL().T_STRING();
											else if (this.is_TOKEN()) return this.consume_TOKEN();
									}
									throw new Error("Bad terminal sequence \"" + ch + "\" at line " + this.yylineno + " (offset " + this.offset + ")");
								},
								T_WHITESPACE: function T_WHITESPACE() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") continue;
										if (ch) this.unput(1);
										break;
									}
									return this.tok.T_WHITESPACE;
								}
							};
						},
						4401(module$125) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var newline = ["\n", "\r"];
							var valid_after_heredoc = [
								"\n",
								"\r",
								";"
							];
							var valid_after_heredoc_73 = valid_after_heredoc.concat([
								"	",
								" ",
								",",
								"]",
								")",
								"/",
								"=",
								"!",
								"."
							]);
							module$125.exports = {
								T_CONSTANT_ENCAPSED_STRING: function T_CONSTANT_ENCAPSED_STRING() {
									var ch;
									while (this.offset < this.size) {
										ch = this.input();
										if (ch == "\\") this.input();
										else if (ch == "'") break;
									}
									return this.tok.T_CONSTANT_ENCAPSED_STRING;
								},
								is_HEREDOC: function is_HEREDOC() {
									var revert = this.offset;
									if (this._input[this.offset - 1] === "<" && this._input[this.offset] === "<" && this._input[this.offset + 1] === "<") {
										this.offset += 3;
										if (this.is_TABSPACE()) while (this.offset < this.size) {
											this.offset++;
											if (!this.is_TABSPACE()) break;
										}
										var tChar = this._input[this.offset - 1];
										if (tChar === "'" || tChar === "\"") this.offset++;
										else tChar = null;
										if (this.is_LABEL_START()) {
											var yyoffset = this.offset - 1;
											while (this.offset < this.size) {
												this.offset++;
												if (!this.is_LABEL()) break;
											}
											var yylabel = this._input.substring(yyoffset, this.offset - 1);
											if (!tChar || tChar === this._input[this.offset - 1]) {
												if (tChar) this.offset++;
												if (newline.includes(this._input[this.offset - 1])) {
													this.heredoc_label.label = yylabel;
													this.heredoc_label.length = yylabel.length;
													this.heredoc_label.finished = false;
													yyoffset = this.offset - revert;
													this.offset = revert;
													this.consume(yyoffset);
													if (tChar === "'") this.begin("ST_NOWDOC");
													else this.begin("ST_HEREDOC");
													this.prematch_ENDOFDOC();
													return this.tok.T_START_HEREDOC;
												}
											}
										}
									}
									this.offset = revert;
									return false;
								},
								ST_DOUBLE_QUOTES: function ST_DOUBLE_QUOTES() {
									var ch;
									while (this.offset < this.size) {
										ch = this.input();
										if (ch == "\\") this.input();
										else if (ch == "\"") break;
										else if (ch == "$") {
											ch = this.input();
											if (ch == "{" || this.is_LABEL_START()) {
												this.unput(2);
												break;
											}
											if (ch) this.unput(1);
										} else if (ch == "{") {
											ch = this.input();
											if (ch == "$") {
												this.unput(2);
												break;
											}
											if (ch) this.unput(1);
										}
									}
									if (ch == "\"") return this.tok.T_CONSTANT_ENCAPSED_STRING;
									else {
										var prefix = 1;
										if (this.yytext[0] === "b" || this.yytext[0] === "B") prefix = 2;
										if (this.yytext.length > 2) this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE, this.yytext.length - prefix);
										this.unput(this.yytext.length - prefix);
										this.begin("ST_DOUBLE_QUOTES");
										return this.yytext;
									}
								},
								isDOC_MATCH: function isDOC_MATCH(offset, consumeLeadingSpaces) {
									var prev_ch = this._input[offset - 2];
									if (!newline.includes(prev_ch)) return false;
									var indentation_uses_spaces = false;
									var indentation_uses_tabs = false;
									var indentation = 0;
									var leading_ch = this._input[offset - 1];
									if (this.version >= 703) {
										while (leading_ch === "	" || leading_ch === " ") {
											if (leading_ch === " ") indentation_uses_spaces = true;
											else if (leading_ch === "	") indentation_uses_tabs = true;
											leading_ch = this._input[offset + indentation];
											indentation++;
										}
										offset = offset + indentation;
										if (newline.includes(this._input[offset - 1])) return false;
									}
									if (this._input.substring(offset - 1, offset - 1 + this.heredoc_label.length) === this.heredoc_label.label) {
										var ch = this._input[offset - 1 + this.heredoc_label.length];
										if ((this.version >= 703 ? valid_after_heredoc_73 : valid_after_heredoc).includes(ch)) {
											if (consumeLeadingSpaces) {
												this.consume(indentation);
												if (indentation_uses_spaces && indentation_uses_tabs) throw new Error("Parse error:  mixing spaces and tabs in ending marker at line " + this.yylineno + " (offset " + this.offset + ")");
											} else {
												this.heredoc_label.indentation = indentation;
												this.heredoc_label.indentation_uses_spaces = indentation_uses_spaces;
												this.heredoc_label.first_encaps_node = true;
											}
											return true;
										}
									}
									return false;
								},
								prematch_ENDOFDOC: function prematch_ENDOFDOC() {
									this.heredoc_label.indentation_uses_spaces = false;
									this.heredoc_label.indentation = 0;
									this.heredoc_label.first_encaps_node = true;
									var offset = this.offset + 1;
									while (offset < this._input.length) {
										if (this.isDOC_MATCH(offset, false)) return;
										if (!newline.includes(this._input[offset - 1])) while (!newline.includes(this._input[offset++]) && offset < this._input.length);
										offset++;
									}
								},
								matchST_NOWDOC: function matchST_NOWDOC() {
									if (this.isDOC_MATCH(this.offset, true)) {
										this.consume(this.heredoc_label.length);
										this.popState();
										return this.tok.T_END_HEREDOC;
									}
									var ch = this._input[this.offset - 1];
									while (this.offset < this.size) if (newline.includes(ch)) {
										ch = this.input();
										if (this.isDOC_MATCH(this.offset, true)) {
											this.unput(1).popState();
											this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
											return this.tok.T_ENCAPSED_AND_WHITESPACE;
										}
									} else ch = this.input();
									return this.tok.T_ENCAPSED_AND_WHITESPACE;
								},
								matchST_HEREDOC: function matchST_HEREDOC() {
									var ch = this.input();
									if (this.isDOC_MATCH(this.offset, true)) {
										this.consume(this.heredoc_label.length - 1);
										this.popState();
										return this.tok.T_END_HEREDOC;
									}
									while (this.offset < this.size) {
										if (ch === "\\") {
											ch = this.input();
											if (!newline.includes(ch)) ch = this.input();
										}
										if (newline.includes(ch)) {
											ch = this.input();
											if (this.isDOC_MATCH(this.offset, true)) {
												this.unput(1).popState();
												this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
												return this.tok.T_ENCAPSED_AND_WHITESPACE;
											}
										} else if (ch === "$") {
											ch = this.input();
											if (ch === "{") {
												this.begin("ST_LOOKING_FOR_VARNAME");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
											} else if (this.is_LABEL_START()) {
												var yyoffset = this.offset;
												var next = this.consume_VARIABLE();
												if (this.yytext.length > this.offset - yyoffset + 2) {
													this.appendToken(next, this.offset - yyoffset + 2);
													this.unput(this.offset - yyoffset + 2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return next;
											}
										} else if (ch === "{") {
											ch = this.input();
											if (ch === "$") {
												this.begin("ST_IN_SCRIPTING");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_CURLY_OPEN, 1);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else {
													this.unput(1);
													return this.tok.T_CURLY_OPEN;
												}
											}
										} else ch = this.input();
									}
									return this.tok.T_ENCAPSED_AND_WHITESPACE;
								},
								consume_VARIABLE: function consume_VARIABLE() {
									this.consume_LABEL();
									var ch = this.input();
									if (ch == "[") {
										this.unput(1);
										this.begin("ST_VAR_OFFSET");
										return this.tok.T_VARIABLE;
									} else if (ch === "-") if (this.input() === ">") {
										this.input();
										if (this.is_LABEL_START()) this.begin("ST_LOOKING_FOR_PROPERTY");
										this.unput(3);
										return this.tok.T_VARIABLE;
									} else this.unput(2);
									else if (ch) this.unput(1);
									return this.tok.T_VARIABLE;
								},
								matchST_BACKQUOTE: function matchST_BACKQUOTE() {
									var ch = this.input();
									if (ch === "$") {
										ch = this.input();
										if (ch === "{") {
											this.begin("ST_LOOKING_FOR_VARNAME");
											return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
										} else if (this.is_LABEL_START()) return this.consume_VARIABLE();
									} else if (ch === "{") {
										if (this._input[this.offset] === "$") {
											this.begin("ST_IN_SCRIPTING");
											return this.tok.T_CURLY_OPEN;
										}
									} else if (ch === "`") {
										this.popState();
										return "`";
									}
									while (this.offset < this.size) {
										if (ch === "\\") this.input();
										else if (ch === "`") {
											this.unput(1);
											this.popState();
											this.appendToken("`", 1);
											break;
										} else if (ch === "$") {
											ch = this.input();
											if (ch === "{") {
												this.begin("ST_LOOKING_FOR_VARNAME");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
											} else if (this.is_LABEL_START()) {
												var yyoffset = this.offset;
												var next = this.consume_VARIABLE();
												if (this.yytext.length > this.offset - yyoffset + 2) {
													this.appendToken(next, this.offset - yyoffset + 2);
													this.unput(this.offset - yyoffset + 2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return next;
											}
											continue;
										} else if (ch === "{") {
											ch = this.input();
											if (ch === "$") {
												this.begin("ST_IN_SCRIPTING");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_CURLY_OPEN, 1);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else {
													this.unput(1);
													return this.tok.T_CURLY_OPEN;
												}
											}
											continue;
										}
										ch = this.input();
									}
									return this.tok.T_ENCAPSED_AND_WHITESPACE;
								},
								matchST_DOUBLE_QUOTES: function matchST_DOUBLE_QUOTES() {
									var ch = this.input();
									if (ch === "$") {
										ch = this.input();
										if (ch === "{") {
											this.begin("ST_LOOKING_FOR_VARNAME");
											return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
										} else if (this.is_LABEL_START()) return this.consume_VARIABLE();
									} else if (ch === "{") {
										if (this._input[this.offset] === "$") {
											this.begin("ST_IN_SCRIPTING");
											return this.tok.T_CURLY_OPEN;
										}
									} else if (ch === "\"") {
										this.popState();
										return "\"";
									}
									while (this.offset < this.size) {
										if (ch === "\\") this.input();
										else if (ch === "\"") {
											this.unput(1);
											this.popState();
											this.appendToken("\"", 1);
											break;
										} else if (ch === "$") {
											ch = this.input();
											if (ch === "{") {
												this.begin("ST_LOOKING_FOR_VARNAME");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
											} else if (this.is_LABEL_START()) {
												var yyoffset = this.offset;
												var next = this.consume_VARIABLE();
												if (this.yytext.length > this.offset - yyoffset + 2) {
													this.appendToken(next, this.offset - yyoffset + 2);
													this.unput(this.offset - yyoffset + 2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else return next;
											}
											if (ch) this.unput(1);
										} else if (ch === "{") {
											ch = this.input();
											if (ch === "$") {
												this.begin("ST_IN_SCRIPTING");
												if (this.yytext.length > 2) {
													this.appendToken(this.tok.T_CURLY_OPEN, 1);
													this.unput(2);
													return this.tok.T_ENCAPSED_AND_WHITESPACE;
												} else {
													this.unput(1);
													return this.tok.T_CURLY_OPEN;
												}
											}
											if (ch) this.unput(1);
										}
										ch = this.input();
									}
									return this.tok.T_ENCAPSED_AND_WHITESPACE;
								}
							};
						},
						4349(module$126) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$126.exports = {
								T_STRING: function T_STRING() {
									var token = this.yytext.toLowerCase();
									var id = this.keywords[token];
									if (typeof id !== "number") if (token === "yield") if (this.version >= 700 && this.tryMatch(" from")) {
										this.consume(5);
										id = this.tok.T_YIELD_FROM;
									} else id = this.tok.T_YIELD;
									else {
										id = this.tok.T_STRING;
										if (token === "b" || token === "B") {
											var ch = this.input();
											if (ch === "\"") return this.ST_DOUBLE_QUOTES();
											else if (ch === "'") return this.T_CONSTANT_ENCAPSED_STRING();
											else if (ch) this.unput(1);
										}
									}
									if (id === this.tok.T_ENUM) {
										if (this.version < 801) return this.tok.T_STRING;
										var initial = this.offset;
										var _ch = this.input();
										while (_ch == " ") _ch = this.input();
										var isEnum = false;
										if (this.is_LABEL_START()) {
											while (this.is_LABEL()) _ch += this.input();
											var label = _ch.slice(0, -1).toLowerCase();
											isEnum = label !== "extends" && label !== "implements";
										}
										this.unput(this.offset - initial);
										return isEnum ? this.tok.T_ENUM : this.tok.T_STRING;
									}
									if (this.offset < this.size && id !== this.tok.T_YIELD_FROM) {
										var _ch2 = this.input();
										if (_ch2 === "\\") {
											id = token === "namespace" ? this.tok.T_NAME_RELATIVE : this.tok.T_NAME_QUALIFIED;
											do {
												if (this._input[this.offset] === "{") {
													this.input();
													break;
												}
												this.consume_LABEL();
												_ch2 = this.input();
											} while (_ch2 === "\\");
										}
										if (_ch2) this.unput(1);
									}
									return id;
								},
								consume_TOKEN: function consume_TOKEN() {
									var ch = this._input[this.offset - 1];
									var fn = this.tokenTerminals[ch];
									if (fn) return fn.apply(this, []);
									else return this.yytext;
								},
								tokenTerminals: {
									$: function $() {
										this.offset++;
										if (this.is_LABEL_START()) {
											this.offset--;
											this.consume_LABEL();
											return this.tok.T_VARIABLE;
										} else {
											this.offset--;
											return "$";
										}
									},
									"-": function _() {
										var nchar = this._input[this.offset];
										if (nchar === ">") {
											this.begin("ST_LOOKING_FOR_PROPERTY").input();
											return this.tok.T_OBJECT_OPERATOR;
										} else if (nchar === "-") {
											this.input();
											return this.tok.T_DEC;
										} else if (nchar === "=") {
											this.input();
											return this.tok.T_MINUS_EQUAL;
										}
										return "-";
									},
									"\\": function _() {
										if (this.offset < this.size) {
											this.input();
											if (this.is_LABEL_START()) {
												var ch;
												do {
													if (this._input[this.offset] === "{") {
														this.input();
														break;
													}
													this.consume_LABEL();
													ch = this.input();
												} while (ch === "\\");
												this.unput(1);
												return this.tok.T_NAME_FULLY_QUALIFIED;
											} else this.unput(1);
										}
										return this.tok.T_NS_SEPARATOR;
									},
									"/": function _() {
										if (this._input[this.offset] === "=") {
											this.input();
											return this.tok.T_DIV_EQUAL;
										}
										return "/";
									},
									":": function _() {
										if (this._input[this.offset] === ":") {
											this.input();
											return this.tok.T_DOUBLE_COLON;
										} else return ":";
									},
									"(": function _() {
										var initial = this.offset;
										this.input();
										if (this.is_TABSPACE()) this.consume_TABSPACE().input();
										if (this.is_LABEL_START()) {
											var yylen = this.yytext.length;
											this.consume_LABEL();
											var castToken = this.yytext.substring(yylen - 1).toLowerCase();
											var castId = this.castKeywords[castToken];
											if (typeof castId === "number") {
												this.input();
												if (this.is_TABSPACE()) this.consume_TABSPACE().input();
												if (this._input[this.offset - 1] === ")") return castId;
											}
										}
										this.unput(this.offset - initial);
										return "(";
									},
									"=": function _() {
										var nchar = this._input[this.offset];
										if (nchar === ">") {
											this.input();
											return this.tok.T_DOUBLE_ARROW;
										} else if (nchar === "=") if (this._input[this.offset + 1] === "=") {
											this.consume(2);
											return this.tok.T_IS_IDENTICAL;
										} else {
											this.input();
											return this.tok.T_IS_EQUAL;
										}
										return "=";
									},
									"+": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "+") {
											this.input();
											return this.tok.T_INC;
										} else if (nchar === "=") {
											this.input();
											return this.tok.T_PLUS_EQUAL;
										}
										return "+";
									},
									"!": function _() {
										if (this._input[this.offset] === "=") if (this._input[this.offset + 1] === "=") {
											this.consume(2);
											return this.tok.T_IS_NOT_IDENTICAL;
										} else {
											this.input();
											return this.tok.T_IS_NOT_EQUAL;
										}
										return "!";
									},
									"?": function _() {
										if (this.version >= 700 && this._input[this.offset] === "?") if (this.version >= 704 && this._input[this.offset + 1] === "=") {
											this.consume(2);
											return this.tok.T_COALESCE_EQUAL;
										} else {
											this.input();
											return this.tok.T_COALESCE;
										}
										if (this.version >= 800 && this._input[this.offset] === "-" && this._input[this.offset + 1] === ">") {
											this.consume(1);
											this.begin("ST_LOOKING_FOR_PROPERTY").input();
											return this.tok.T_NULLSAFE_OBJECT_OPERATOR;
										}
										return "?";
									},
									"<": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "<") {
											nchar = this._input[this.offset + 1];
											if (nchar === "=") {
												this.consume(2);
												return this.tok.T_SL_EQUAL;
											} else if (nchar === "<") {
												if (this.is_HEREDOC()) return this.tok.T_START_HEREDOC;
											}
											this.input();
											return this.tok.T_SL;
										} else if (nchar === "=") {
											this.input();
											if (this.version >= 700 && this._input[this.offset] === ">") {
												this.input();
												return this.tok.T_SPACESHIP;
											} else return this.tok.T_IS_SMALLER_OR_EQUAL;
										} else if (nchar === ">") {
											this.input();
											return this.tok.T_IS_NOT_EQUAL;
										}
										return "<";
									},
									">": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "=") {
											this.input();
											return this.tok.T_IS_GREATER_OR_EQUAL;
										} else if (nchar === ">") {
											nchar = this._input[this.offset + 1];
											if (nchar === "=") {
												this.consume(2);
												return this.tok.T_SR_EQUAL;
											} else {
												this.input();
												return this.tok.T_SR;
											}
										}
										return ">";
									},
									"*": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "=") {
											this.input();
											return this.tok.T_MUL_EQUAL;
										} else if (nchar === "*") {
											this.input();
											if (this._input[this.offset] === "=") {
												this.input();
												return this.tok.T_POW_EQUAL;
											} else return this.tok.T_POW;
										}
										return "*";
									},
									".": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "=") {
											this.input();
											return this.tok.T_CONCAT_EQUAL;
										} else if (nchar === "." && this._input[this.offset + 1] === ".") {
											this.consume(2);
											return this.tok.T_ELLIPSIS;
										}
										return ".";
									},
									"%": function _() {
										if (this._input[this.offset] === "=") {
											this.input();
											return this.tok.T_MOD_EQUAL;
										}
										return "%";
									},
									"&": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "=") {
											this.input();
											return this.tok.T_AND_EQUAL;
										} else if (nchar === "&") {
											this.input();
											return this.tok.T_BOOLEAN_AND;
										}
										return "&";
									},
									"|": function _() {
										var nchar = this._input[this.offset];
										if (nchar === "=") {
											this.input();
											return this.tok.T_OR_EQUAL;
										} else if (nchar === "|") {
											this.input();
											return this.tok.T_BOOLEAN_OR;
										} else if (nchar === ">") {
											this.input();
											return this.tok.T_PIPE;
										}
										return "|";
									},
									"^": function _() {
										if (this._input[this.offset] === "=") {
											this.input();
											return this.tok.T_XOR_EQUAL;
										}
										return "^";
									}
								}
							};
						},
						8582(module$127) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var tokens = ";:,.\\[]()|^&+-/*=%!~$<>?@";
							module$127.exports = {
								is_NUM: function is_NUM() {
									var ch = this._input.charCodeAt(this.offset - 1);
									return ch > 47 && ch < 58 || ch === 95;
								},
								is_NUM_START: function is_NUM_START() {
									var ch = this._input.charCodeAt(this.offset - 1);
									return ch > 47 && ch < 58;
								},
								is_LABEL: function is_LABEL() {
									var ch = this._input.charCodeAt(this.offset - 1);
									return ch > 96 && ch < 123 || ch > 64 && ch < 91 || ch === 95 || ch > 47 && ch < 58 || ch > 126;
								},
								is_LABEL_START: function is_LABEL_START() {
									var ch = this._input.charCodeAt(this.offset - 1);
									if (ch > 64 && ch < 91) return true;
									if (ch > 96 && ch < 123) return true;
									if (ch === 95) return true;
									if (ch > 126) return true;
									return false;
								},
								consume_LABEL: function consume_LABEL() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (!this.is_LABEL()) {
											if (ch) this.unput(1);
											break;
										}
									}
									return this;
								},
								is_TOKEN: function is_TOKEN() {
									var ch = this._input[this.offset - 1];
									return tokens.indexOf(ch) !== -1;
								},
								is_WHITESPACE: function is_WHITESPACE() {
									var ch = this._input[this.offset - 1];
									return ch === " " || ch === "	" || ch === "\n" || ch === "\r";
								},
								is_TABSPACE: function is_TABSPACE() {
									var ch = this._input[this.offset - 1];
									return ch === " " || ch === "	";
								},
								consume_TABSPACE: function consume_TABSPACE() {
									while (this.offset < this.size) {
										var ch = this.input();
										if (!this.is_TABSPACE()) {
											if (ch) this.unput(1);
											break;
										}
									}
									return this;
								},
								is_HEX: function is_HEX() {
									var ch = this._input.charCodeAt(this.offset - 1);
									if (ch > 47 && ch < 58) return true;
									if (ch > 64 && ch < 71) return true;
									if (ch > 96 && ch < 103) return true;
									if (ch === 95) return true;
									return false;
								},
								is_OCTAL: function is_OCTAL() {
									var ch = this._input.charCodeAt(this.offset - 1);
									if (ch > 47 && ch < 56) return true;
									if (ch === 95) return true;
									return false;
								}
							};
						},
						7259(module$128, __unused_webpack_exports, __webpack_require__) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var Position = __webpack_require__(8822);
							/**
							* @private
							*/
							function isNumber(n) {
								return n != "." && n != "," && !isNaN(parseFloat(n)) && isFinite(n);
							}
							/**
							* The PHP Parser class that build the AST tree from the lexer
							*
							* @constructor Parser
							* @memberOf module:php-parser
							* @tutorial Parser
							* @property {Lexer} lexer - current lexer instance
							* @property {AST} ast - the AST factory instance
							* @property {number|string} token - current token
							* @property {boolean} extractDoc - should extract documentation as AST node
							* @property {boolean} extractTokens - should extract each token
							* @property {boolean} suppressErrors - should ignore parsing errors and continue
							* @property {boolean} debug - should output debug informations
							*/
							var Parser = function Parser(lexer, ast) {
								this.lexer = lexer;
								this.ast = ast;
								this.tok = lexer.tok;
								this.EOF = lexer.EOF;
								this.token = null;
								this.prev = null;
								this.debug = false;
								this.version = 803;
								this.extractDoc = false;
								this.extractTokens = false;
								this.suppressErrors = false;
								var mapIt = function mapIt(item) {
									return [item, null];
								};
								this.entries = {
									IDENTIFIER: new Map([
										this.tok.T_ABSTRACT,
										this.tok.T_ARRAY,
										this.tok.T_AS,
										this.tok.T_BREAK,
										this.tok.T_CALLABLE,
										this.tok.T_CASE,
										this.tok.T_CATCH,
										this.tok.T_CLASS,
										this.tok.T_CLASS_C,
										this.tok.T_CLONE,
										this.tok.T_CONST,
										this.tok.T_CONTINUE,
										this.tok.T_DECLARE,
										this.tok.T_DEFAULT,
										this.tok.T_DIR,
										this.tok.T_DO,
										this.tok.T_ECHO,
										this.tok.T_ELSE,
										this.tok.T_ELSEIF,
										this.tok.T_EMPTY,
										this.tok.T_ENDDECLARE,
										this.tok.T_ENDFOR,
										this.tok.T_ENDFOREACH,
										this.tok.T_ENDIF,
										this.tok.T_ENDSWITCH,
										this.tok.T_ENDWHILE,
										this.tok.T_ENUM,
										this.tok.T_EVAL,
										this.tok.T_EXIT,
										this.tok.T_EXTENDS,
										this.tok.T_FILE,
										this.tok.T_FINAL,
										this.tok.T_FINALLY,
										this.tok.T_FN,
										this.tok.T_FOR,
										this.tok.T_FOREACH,
										this.tok.T_FUNC_C,
										this.tok.T_FUNCTION,
										this.tok.T_GLOBAL,
										this.tok.T_GOTO,
										this.tok.T_IF,
										this.tok.T_IMPLEMENTS,
										this.tok.T_INCLUDE,
										this.tok.T_INCLUDE_ONCE,
										this.tok.T_INSTANCEOF,
										this.tok.T_INSTEADOF,
										this.tok.T_INTERFACE,
										this.tok.T_ISSET,
										this.tok.T_LINE,
										this.tok.T_LIST,
										this.tok.T_LOGICAL_AND,
										this.tok.T_LOGICAL_OR,
										this.tok.T_LOGICAL_XOR,
										this.tok.T_MATCH,
										this.tok.T_METHOD_C,
										this.tok.T_NAMESPACE,
										this.tok.T_NEW,
										this.tok.T_NS_C,
										this.tok.T_PRINT,
										this.tok.T_PRIVATE,
										this.tok.T_PROTECTED,
										this.tok.T_PUBLIC,
										this.tok.T_READ_ONLY,
										this.tok.T_REQUIRE,
										this.tok.T_REQUIRE_ONCE,
										this.tok.T_RETURN,
										this.tok.T_STATIC,
										this.tok.T_SWITCH,
										this.tok.T_THROW,
										this.tok.T_TRAIT,
										this.tok.T_TRY,
										this.tok.T_UNSET,
										this.tok.T_USE,
										this.tok.T_VAR,
										this.tok.T_WHILE,
										this.tok.T_YIELD
									].map(mapIt)),
									VARIABLE: new Map([
										this.tok.T_VARIABLE,
										"$",
										"&",
										this.tok.T_STRING,
										this.tok.T_NAME_RELATIVE,
										this.tok.T_NAME_QUALIFIED,
										this.tok.T_NAME_FULLY_QUALIFIED,
										this.tok.T_NAMESPACE,
										this.tok.T_STATIC
									].map(mapIt)),
									SCALAR: new Map([
										this.tok.T_CONSTANT_ENCAPSED_STRING,
										this.tok.T_START_HEREDOC,
										this.tok.T_LNUMBER,
										this.tok.T_DNUMBER,
										this.tok.T_ARRAY,
										"[",
										this.tok.T_CLASS_C,
										this.tok.T_TRAIT_C,
										this.tok.T_FUNC_C,
										this.tok.T_METHOD_C,
										this.tok.T_LINE,
										this.tok.T_FILE,
										this.tok.T_DIR,
										this.tok.T_NS_C,
										"\"",
										"b\"",
										"B\"",
										"-",
										this.tok.T_NS_SEPARATOR
									].map(mapIt)),
									T_MAGIC_CONST: new Map([
										this.tok.T_CLASS_C,
										this.tok.T_TRAIT_C,
										this.tok.T_FUNC_C,
										this.tok.T_METHOD_C,
										this.tok.T_LINE,
										this.tok.T_FILE,
										this.tok.T_DIR,
										this.tok.T_NS_C
									].map(mapIt)),
									T_MEMBER_FLAGS: new Map([
										this.tok.T_PUBLIC,
										this.tok.T_PRIVATE,
										this.tok.T_PROTECTED,
										this.tok.T_STATIC,
										this.tok.T_ABSTRACT,
										this.tok.T_FINAL
									].map(mapIt)),
									EOS: new Map([
										";",
										this.EOF,
										this.tok.T_INLINE_HTML
									].map(mapIt)),
									EXPR: new Map([
										"@",
										"-",
										"+",
										"!",
										"~",
										"(",
										"`",
										this.tok.T_LIST,
										this.tok.T_CLONE,
										this.tok.T_INC,
										this.tok.T_DEC,
										this.tok.T_NEW,
										this.tok.T_ISSET,
										this.tok.T_EMPTY,
										this.tok.T_MATCH,
										this.tok.T_INCLUDE,
										this.tok.T_INCLUDE_ONCE,
										this.tok.T_REQUIRE,
										this.tok.T_REQUIRE_ONCE,
										this.tok.T_EVAL,
										this.tok.T_INT_CAST,
										this.tok.T_DOUBLE_CAST,
										this.tok.T_STRING_CAST,
										this.tok.T_ARRAY_CAST,
										this.tok.T_OBJECT_CAST,
										this.tok.T_BOOL_CAST,
										this.tok.T_UNSET_CAST,
										this.tok.T_EXIT,
										this.tok.T_PRINT,
										this.tok.T_YIELD,
										this.tok.T_STATIC,
										this.tok.T_FUNCTION,
										this.tok.T_FN,
										this.tok.T_VARIABLE,
										"$",
										this.tok.T_NS_SEPARATOR,
										this.tok.T_STRING,
										this.tok.T_NAME_RELATIVE,
										this.tok.T_NAME_QUALIFIED,
										this.tok.T_NAME_FULLY_QUALIFIED,
										this.tok.T_STRING,
										this.tok.T_CONSTANT_ENCAPSED_STRING,
										this.tok.T_START_HEREDOC,
										this.tok.T_LNUMBER,
										this.tok.T_DNUMBER,
										this.tok.T_ARRAY,
										"[",
										this.tok.T_CLASS_C,
										this.tok.T_TRAIT_C,
										this.tok.T_FUNC_C,
										this.tok.T_METHOD_C,
										this.tok.T_LINE,
										this.tok.T_FILE,
										this.tok.T_DIR,
										this.tok.T_NS_C,
										"\"",
										"b\"",
										"B\"",
										"-",
										this.tok.T_NS_SEPARATOR
									].map(mapIt))
								};
							};
							/**
							* helper : gets a token name
							* @function Parser#getTokenName
							* @memberOf module:php-parser
							*/
							Parser.prototype.getTokenName = function(token) {
								if (!isNumber(token)) return "'" + token + "'";
								else {
									if (token == this.EOF) return "the end of file (EOF)";
									return this.lexer.engine.tokens.values[token];
								}
							};
							/**
							* main entry point : converts a source code to AST
							* @function Parser#parse
							* @memberOf module:php-parser
							*/
							Parser.prototype.parse = function(code, filename) {
								this._errors = [];
								this.filename = filename || "eval";
								this.currentNamespace = [""];
								if (this.extractDoc) this._docs = [];
								else this._docs = null;
								if (this.extractTokens) this._tokens = [];
								else this._tokens = null;
								this._docIndex = 0;
								this._lastNode = null;
								this.lexer.setInput(code);
								this.lexer.all_tokens = this.extractTokens;
								this.lexer.comment_tokens = this.extractDoc;
								this.length = this.lexer._input.length;
								this.innerList = false;
								this.innerListForm = false;
								var program = this.node("program");
								var childs = [];
								this.next();
								while (this.token != this.EOF) childs.push(this.read_start());
								if (childs.length === 0 && this.extractDoc && this._docs.length > this._docIndex) childs.push(this.node("noop")());
								this.prev = [
									this.lexer.yylloc.last_line,
									this.lexer.yylloc.last_column,
									this.lexer.offset
								];
								var result = program(childs, this._errors, this._docs, this._tokens);
								if (this.debug) {
									var errors = this.ast.checkNodes();
									/* istanbul ignore next */
									if (errors.length > 0) {
										errors.forEach(function(error) {
											if (error.position) console.log("Node at line " + error.position.line + ", column " + error.position.column);
											console.log(error.stack.join("\n"));
										});
										throw new Error("Some nodes are not closed");
									}
								}
								return result;
							};
							/**
							* Raise an error
							* @function Parser#raiseError
							* @memberOf module:php-parser
							*/
							Parser.prototype.raiseError = function(message, msgExpect, expect, token) {
								message += " on line " + this.lexer.yylloc.first_line;
								if (!this.suppressErrors) {
									var err = new SyntaxError(message, this.filename, this.lexer.yylloc.first_line);
									err.lineNumber = this.lexer.yylloc.first_line;
									err.fileName = this.filename;
									err.columnNumber = this.lexer.yylloc.first_column;
									throw err;
								}
								var node = this.ast.prepare("error", null, this)(message, token, this.lexer.yylloc.first_line, expect);
								this._errors.push(node);
								return node;
							};
							/**
							* handling errors
							* @function Parser#error
							* @memberOf module:php-parser
							*/
							Parser.prototype.error = function(expect) {
								var msg = "Parse Error : syntax error";
								var token = this.getTokenName(this.token);
								var msgExpect = "";
								if (this.token !== this.EOF) {
									if (isNumber(this.token)) {
										var symbol = this.text();
										/* istanbul ignore next */
										if (symbol.length > 10) symbol = symbol.substring(0, 7) + "...";
										token = "'" + symbol + "' (" + token + ")";
									}
									msg += ", unexpected " + token;
								}
								if (expect && !Array.isArray(expect)) {
									if (isNumber(expect) || expect.length === 1) msgExpect = ", expecting " + this.getTokenName(expect);
									msg += msgExpect;
								}
								return this.raiseError(msg, msgExpect, expect, token);
							};
							/**
							* Create a position node from the lexers position
							*
							* @function Parser#position
							* @memberOf module:php-parser
							* @return {Position}
							*/
							Parser.prototype.position = function() {
								return new Position(this.lexer.yylloc.first_line, this.lexer.yylloc.first_column, this.lexer.yylloc.first_offset);
							};
							/**
							* Creates a new AST node
							* @function Parser#node
							* @memberOf module:php-parser
							*/
							Parser.prototype.node = function(name) {
								if (this.extractDoc) {
									var docs = null;
									if (this._docIndex < this._docs.length) {
										docs = this._docs.slice(this._docIndex);
										this._docIndex = this._docs.length;
										/* istanbul ignore next */
										if (this.debug) {
											console.log(/* @__PURE__ */ new Error("Append docs on " + name));
											console.log(docs);
										}
									}
									var node = this.ast.prepare(name, docs, this);
									node.postBuild = function(self) {
										if (this._docIndex < this._docs.length) {
											if (this._lastNode) {
												var offset = this.prev[2];
												var max = this._docIndex;
												for (; max < this._docs.length; max++) if (this._docs[max].offset > offset) break;
												if (max > this._docIndex) {
													this._lastNode.setTrailingComments(this._docs.slice(this._docIndex, max));
													this._docIndex = max;
												}
											} else if (this.token === this.EOF) {
												self.setTrailingComments(this._docs.slice(this._docIndex));
												this._docIndex = this._docs.length;
											}
										}
										this._lastNode = self;
									}.bind(this);
									return node;
								}
								return this.ast.prepare(name, null, this);
							};
							/**
							* expects an end of statement or end of file
							* @function Parser#expectEndOfStatement
							* @memberOf module:php-parser
							* @return {boolean}
							*/
							Parser.prototype.expectEndOfStatement = function(node) {
								if (this.token === ";") {
									if (node && this.lexer.yytext === ";") node.includeToken(this);
								} else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
									this.error(";");
									return false;
								}
								this.next();
								return true;
							};
							var ignoreStack = [
								"parser.next",
								"parser.node",
								"parser.showlog"
							];
							/**
							* outputs some debug information on current token
							* @private
							* @function Parser#showlog
							* @memberOf module:php-parser
							*/
							Parser.prototype.showlog = function() {
								var stack = (/* @__PURE__ */ new Error()).stack.split("\n");
								var line;
								for (var offset = 2; offset < stack.length; offset++) {
									line = stack[offset].trim();
									var found = false;
									for (var i = 0; i < ignoreStack.length; i++)
 /* istanbul ignore next */
									if (line.substring(3, 3 + ignoreStack[i].length) === ignoreStack[i]) {
										found = true;
										break;
									}
									/* istanbul ignore next */
									if (!found) break;
								}
								console.log("Line " + this.lexer.yylloc.first_line + " : " + this.getTokenName(this.token) + ">" + this.lexer.yytext + "< @-->" + line);
								return this;
							};
							/**
							* Force the parser to check the current token.
							*
							* If the current token does not match to expected token,
							* the an error will be raised.
							*
							* If the suppressError mode is activated, then the error will
							* be added to the program error stack and this function will return `false`.
							*
							* @function Parser#expect
							* @memberOf module:php-parser
							* @param {String|Number} token
							* @return {boolean}
							* @throws Error
							*/
							Parser.prototype.expect = function(token) {
								if (Array.isArray(token)) {
									if (token.indexOf(this.token) === -1) {
										this.error(token);
										return false;
									}
								} else if (this.token != token) {
									this.error(token);
									return false;
								}
								return true;
							};
							/**
							* Returns the current token contents
							* @function Parser#text
							* @memberOf module:php-parser
							* @return {String}
							*/
							Parser.prototype.text = function() {
								return this.lexer.yytext;
							};
							/**
							* consume the next token
							* @function Parser#next
							* @memberOf module:php-parser
							*/
							Parser.prototype.next = function() {
								if (this.token !== ";" || this.lexer.yytext === ";") this.prev = [
									this.lexer.yylloc.last_line,
									this.lexer.yylloc.last_column,
									this.lexer.offset
								];
								this.lex();
								if (this.debug) this.showlog();
								if (this.extractDoc) while (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) if (this.token === this.tok.T_COMMENT) this._docs.push(this.read_comment());
								else this._docs.push(this.read_doc_comment());
								return this;
							};
							/**
							* Peek at the next token.
							* @function Parser#peek
							* @memberOf module:php-parser
							* @returns {string|number} Next Token
							*/
							Parser.prototype.peek = function() {
								var lexerState = this.lexer.getState();
								var nextToken = this.lexer.lex();
								this.lexer.setState(lexerState);
								return nextToken;
							};
							/**
							* Eating a token
							* @function Parser#lex
							* @memberOf module:php-parser
							*/
							Parser.prototype.lex = function() {
								if (this.extractTokens) do {
									this.token = this.lexer.lex() || this.EOF;
									if (this.token === this.EOF) return this;
									var entry = this.lexer.yytext;
									if (Object.prototype.hasOwnProperty.call(this.lexer.engine.tokens.values, this.token)) entry = [
										this.lexer.engine.tokens.values[this.token],
										entry,
										this.lexer.yylloc.first_line,
										this.lexer.yylloc.first_offset,
										this.lexer.offset
									];
									else entry = [
										null,
										entry,
										this.lexer.yylloc.first_line,
										this.lexer.yylloc.first_offset,
										this.lexer.offset
									];
									this._tokens.push(entry);
									if (this.token === this.tok.T_CLOSE_TAG) {
										this.token = ";";
										return this;
									} else if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) {
										this.token = this.tok.T_ECHO;
										return this;
									}
								} while (this.token === this.tok.T_WHITESPACE || !this.extractDoc && (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) || this.token === this.tok.T_OPEN_TAG);
								else this.token = this.lexer.lex() || this.EOF;
								return this;
							};
							/**
							* Check if token is of specified type
							* @function Parser#is
							* @memberOf module:php-parser
							*/
							Parser.prototype.is = function(type) {
								if (Array.isArray(type)) return type.indexOf(this.token) !== -1;
								return this.entries[type].has(this.token);
							};
							[
								__webpack_require__(5525),
								__webpack_require__(7072),
								__webpack_require__(3997),
								__webpack_require__(6477),
								__webpack_require__(979),
								__webpack_require__(8214),
								__webpack_require__(9461),
								__webpack_require__(5931),
								__webpack_require__(9147),
								__webpack_require__(9219),
								__webpack_require__(7170),
								__webpack_require__(6261),
								__webpack_require__(2478),
								__webpack_require__(77),
								__webpack_require__(6077),
								__webpack_require__(1130)
							].forEach(function(ext) {
								for (var k in ext) {
									/* istanbul ignore next */
									if (Object.prototype.hasOwnProperty.call(Parser.prototype, k)) throw new Error("Function " + k + " is already defined - collision");
									Parser.prototype[k] = ext[k];
								}
							});
							module$128.exports = Parser;
						},
						5525(module$129) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$129.exports = {
								read_array: function read_array() {
									var expect;
									var shortForm = false;
									var result = this.node("array");
									if (this.token === this.tok.T_ARRAY) {
										this.next().expect("(");
										expect = ")";
									} else {
										shortForm = true;
										expect = "]";
									}
									var items = [];
									if (this.next().token !== expect) items = this.read_array_pair_list(shortForm);
									this.expect(expect);
									this.next();
									return result(shortForm, items);
								},
								read_array_pair_list: function read_array_pair_list(shortForm) {
									var self = this;
									return this.read_list(function() {
										return self.read_array_pair(shortForm);
									}, ",", true);
								},
								read_array_pair: function read_array_pair(shortForm) {
									if (!shortForm && this.token === ")" || shortForm && this.token === "]") return;
									if (this.token === ",") return this.node("noop")();
									var entry = this.node("entry");
									var key = null;
									var value;
									var byRef = false;
									var unpack = false;
									if (this.token === "&") {
										this.next();
										byRef = true;
										value = this.read_variable(true, false);
									} else if (this.token === this.tok.T_ELLIPSIS && this.version >= 704) {
										this.next();
										if (this.token === "&") this.error();
										unpack = true;
										value = this.read_expr();
									} else {
										var expr = this.read_expr();
										if (this.token === this.tok.T_DOUBLE_ARROW) {
											this.next();
											key = expr;
											if (this.token === "&") {
												this.next();
												byRef = true;
												value = this.read_variable(true, false);
											} else value = this.read_expr();
										} else value = expr;
									}
									return entry(key, value, byRef, unpack);
								}
							};
						},
						7072(module$130) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							function _slicedToArray(r, e) {
								return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
							}
							function _nonIterableRest() {
								throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
							}
							function _iterableToArrayLimit(r, l) {
								var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
								if (null != t) {
									var e, n, i, u, a = [], f = !0, o = !1;
									try {
										if (i = (t = t.call(r)).next, 0 === l) {
											if (Object(t) !== t) return;
											f = !1;
										} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
									} catch (r) {
										o = !0, n = r;
									} finally {
										try {
											if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
										} finally {
											if (o) throw n;
										}
									}
									return a;
								}
							}
							function _arrayWithHoles(r) {
								if (Array.isArray(r)) return r;
							}
							function _toConsumableArray(r) {
								return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
							}
							function _nonIterableSpread() {
								throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
							}
							function _unsupportedIterableToArray(r, a) {
								if (r) {
									if ("string" == typeof r) return _arrayLikeToArray(r, a);
									var t = {}.toString.call(r).slice(8, -1);
									return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
								}
							}
							function _iterableToArray(r) {
								if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
							}
							function _arrayWithoutHoles(r) {
								if (Array.isArray(r)) return _arrayLikeToArray(r);
							}
							function _arrayLikeToArray(r, a) {
								(null == a || a > r.length) && (a = r.length);
								for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
								return n;
							}
							module$130.exports = {
								read_class_declaration_statement: function read_class_declaration_statement(attrs) {
									var result = this.node("class");
									var flag = this.read_class_modifiers();
									if (this.token !== this.tok.T_CLASS) {
										this.error(this.tok.T_CLASS);
										this.next();
										return null;
									}
									this.next().expect(this.tok.T_STRING);
									var propName = this.node("identifier");
									var name = this.text();
									this.next();
									propName = propName(name);
									var propExtends = this.read_extends_from();
									var propImplements = this.read_implements_list();
									this.expect("{");
									var body = this.next().read_class_body(true, false);
									var node = result(propName, propExtends, propImplements, body, flag);
									if (attrs) node.attrGroups = attrs;
									return node;
								},
								read_class_modifiers: function read_class_modifiers() {
									var modifier = this.read_class_modifier({
										readonly: 0,
										final_or_abstract: 0
									});
									return [
										0,
										0,
										modifier.final_or_abstract,
										modifier.readonly
									];
								},
								read_class_modifier: function read_class_modifier(memo) {
									if (this.token === this.tok.T_READ_ONLY) {
										this.next();
										memo.readonly = 1;
										memo = this.read_class_modifier(memo);
									} else if (memo.final_or_abstract === 0 && this.token === this.tok.T_ABSTRACT) {
										this.next();
										memo.final_or_abstract = 1;
										memo = this.read_class_modifier(memo);
									} else if (memo.final_or_abstract === 0 && this.token === this.tok.T_FINAL) {
										this.next();
										memo.final_or_abstract = 2;
										memo = this.read_class_modifier(memo);
									}
									return memo;
								},
								read_class_body: function read_class_body(allow_variables, allow_enum_cases) {
									var result = [];
									var attrs = [];
									while (this.token !== this.EOF && this.token !== "}") {
										if (this.token === this.tok.T_COMMENT) {
											result.push(this.read_comment());
											continue;
										}
										if (this.token === this.tok.T_DOC_COMMENT) {
											result.push(this.read_doc_comment());
											continue;
										}
										if (this.token === this.tok.T_USE) {
											result = result.concat(this.read_trait_use_statement());
											continue;
										}
										if (allow_enum_cases && this.token === this.tok.T_CASE) {
											var enumcase = this.read_enum_case();
											if (this.expect(";")) this.next();
											result = result.concat(enumcase);
											continue;
										}
										if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
										var locStart = this.position();
										var flags = this.read_member_flags(false);
										if (this.token === this.tok.T_CONST) {
											var constants = this.read_constant_list(flags, attrs);
											if (this.expect(";")) this.next();
											result = result.concat(constants);
											continue;
										}
										if (allow_variables && this.token === this.tok.T_VAR) {
											this.next().expect(this.tok.T_VARIABLE);
											flags[0] = null;
											flags[1] = 0;
										}
										if (this.token === this.tok.T_FUNCTION) {
											result.push(this.read_function(false, flags, attrs, locStart));
											attrs = [];
										} else if (allow_variables && (this.token === this.tok.T_VARIABLE || this.version >= 801 && this.token === this.tok.T_READ_ONLY || this.version >= 704 && (this.token === "?" || this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE || this.token === this.tok.T_NAMESPACE || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_STRING))) {
											var variables = this.read_variable_list(flags, attrs);
											attrs = [];
											this.expect(";");
											this.next();
											result = result.concat(variables);
										} else {
											this.error([this.tok.T_CONST].concat(_toConsumableArray(allow_variables ? [this.tok.T_VARIABLE] : []), _toConsumableArray(allow_enum_cases ? [this.tok.T_CASE] : []), [this.tok.T_FUNCTION]));
											this.next();
										}
									}
									this.expect("}");
									this.next();
									return result;
								},
								read_variable_list: function read_variable_list(flags, attrs) {
									return this.node("propertystatement")(null, this.read_list(function read_variable_declaration() {
										var result = this.node("property");
										var readonly = false;
										if (this.token === this.tok.T_READ_ONLY) {
											readonly = true;
											this.next();
										}
										var _this$read_optional_t2 = _slicedToArray(this.read_optional_type(), 2), nullable = _this$read_optional_t2[0], type = _this$read_optional_t2[1];
										this.expect(this.tok.T_VARIABLE);
										var propName = this.node("identifier");
										var name = this.text().substring(1);
										this.next();
										propName = propName(name);
										var value = null;
										this.expect([
											",",
											";",
											"="
										]);
										if (this.token === "=") value = this.next().read_expr();
										return result(propName, value, readonly, nullable, type, attrs || []);
									}, ","), flags);
								},
								read_constant_list: function read_constant_list(flags, attrs) {
									if (this.expect(this.tok.T_CONST)) this.next();
									var _ref2 = _slicedToArray(this.version >= 803 ? this.read_optional_type() : [false, null], 2), nullable = _ref2[0], type = _ref2[1];
									return this.node("classconstant")(null, this.read_list(function read_constant_declaration() {
										var result = this.node("constant");
										var constName = null;
										var value = null;
										if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
											constName = this.node("identifier");
											var name = this.text();
											this.next();
											constName = constName(name);
										} else this.expect("IDENTIFIER");
										if (this.expect("=")) value = this.next().read_expr();
										return result(constName, value);
									}, ","), flags, nullable, type, attrs || []);
								},
								read_member_flags: function read_member_flags(asInterface) {
									var result = [
										-1,
										-1,
										-1
									];
									if (this.is("T_MEMBER_FLAGS")) {
										var idx = 0, val = 0;
										do {
											switch (this.token) {
												case this.tok.T_PUBLIC:
													idx = 0;
													val = 0;
													break;
												case this.tok.T_PROTECTED:
													idx = 0;
													val = 1;
													break;
												case this.tok.T_PRIVATE:
													idx = 0;
													val = 2;
													break;
												case this.tok.T_STATIC:
													idx = 1;
													val = 1;
													break;
												case this.tok.T_ABSTRACT:
													idx = 2;
													val = 1;
													break;
												case this.tok.T_FINAL:
													idx = 2;
													val = 2;
													break;
											}
											if (asInterface) {
												if (idx === 0 && val === 2) {
													this.expect([this.tok.T_PUBLIC, this.tok.T_PROTECTED]);
													val = -1;
												} else if (idx === 2 && val === 1) {
													this.error();
													val = -1;
												}
											}
											if (result[idx] !== -1) this.error();
											else if (val !== -1) result[idx] = val;
										} while (this.next().is("T_MEMBER_FLAGS"));
									}
									if (result[1] === -1) result[1] = 0;
									if (result[2] === -1) result[2] = 0;
									return result;
								},
								read_optional_type: function read_optional_type() {
									var nullable = this.token === "?";
									if (nullable) this.next();
									if (this.peekSkipComments() === "=") return [false, null];
									var type = this.read_types();
									if (nullable && !type) this.raiseError("Expecting a type definition combined with nullable operator");
									if (!nullable && !type) return [false, null];
									if (this.token === "|") {
										type = [type];
										do {
											this.next();
											var variant = this.read_type();
											if (!variant) {
												this.raiseError("Expecting a type definition");
												break;
											}
											type.push(variant);
										} while (this.token === "|");
									}
									return [nullable, type];
								},
								peekSkipComments: function peekSkipComments() {
									var lexerState = this.lexer.getState();
									var nextToken;
									do
										nextToken = this.lexer.lex();
									while (nextToken === this.tok.T_COMMENT || nextToken === this.tok.T_WHITESPACE);
									this.lexer.setState(lexerState);
									return nextToken;
								},
								read_interface_declaration_statement: function read_interface_declaration_statement(attrs) {
									var result = this.node("interface");
									if (this.token !== this.tok.T_INTERFACE) {
										this.error(this.tok.T_INTERFACE);
										this.next();
										return null;
									}
									this.next().expect(this.tok.T_STRING);
									var propName = this.node("identifier");
									var name = this.text();
									this.next();
									propName = propName(name);
									var propExtends = this.read_interface_extends_list();
									this.expect("{");
									var body = this.next().read_interface_body();
									return result(propName, propExtends, body, attrs || []);
								},
								read_interface_body: function read_interface_body() {
									var result = [];
									var attrs;
									while (this.token !== this.EOF && this.token !== "}") {
										if (this.token === this.tok.T_COMMENT) {
											result.push(this.read_comment());
											continue;
										}
										if (this.token === this.tok.T_DOC_COMMENT) {
											result.push(this.read_doc_comment());
											continue;
										}
										var locStart = this.position();
										attrs = this.read_attr_list();
										var flags = this.read_member_flags(true);
										if (this.token === this.tok.T_CONST) {
											var constants = this.read_constant_list(flags, attrs);
											if (this.expect(";")) this.next();
											result = result.concat(constants);
										} else if (this.token === this.tok.T_FUNCTION) {
											var method = this.read_function_declaration(2, flags, attrs, locStart);
											method.parseFlags(flags);
											result.push(method);
											if (this.expect(";")) this.next();
										} else {
											this.error([this.tok.T_CONST, this.tok.T_FUNCTION]);
											this.next();
										}
									}
									if (this.expect("}")) this.next();
									return result;
								},
								read_trait_declaration_statement: function read_trait_declaration_statement() {
									var result = this.node("trait");
									if (this.token !== this.tok.T_TRAIT) {
										this.error(this.tok.T_TRAIT);
										this.next();
										return null;
									}
									this.next().expect(this.tok.T_STRING);
									var propName = this.node("identifier");
									var name = this.text();
									this.next();
									propName = propName(name);
									this.expect("{");
									var body = this.next().read_class_body(true, false);
									return result(propName, body);
								},
								read_trait_use_statement: function read_trait_use_statement() {
									var node = this.node("traituse");
									this.expect(this.tok.T_USE) && this.next();
									var traits = [this.read_namespace_name()];
									var adaptations = null;
									while (this.token === ",") traits.push(this.next().read_namespace_name());
									if (this.token === "{") {
										adaptations = [];
										while (this.next().token !== this.EOF) {
											if (this.token === "}") break;
											adaptations.push(this.read_trait_use_alias());
											this.expect(";");
										}
										if (this.expect("}")) this.next();
									} else if (this.expect(";")) this.next();
									return node(traits, adaptations);
								},
								read_trait_use_alias: function read_trait_use_alias() {
									var node = this.node();
									var trait = null;
									var method;
									if (this.is("IDENTIFIER")) {
										method = this.node("identifier");
										var methodName = this.text();
										this.next();
										method = method(methodName);
									} else {
										method = this.read_namespace_name();
										if (this.token === this.tok.T_DOUBLE_COLON) {
											this.next();
											if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
												trait = method;
												method = this.node("identifier");
												var _methodName = this.text();
												this.next();
												method = method(_methodName);
											} else this.expect(this.tok.T_STRING);
										} else method = method.name;
									}
									if (this.token === this.tok.T_INSTEADOF) return node("traitprecedence", trait, method, this.next().read_name_list());
									else if (this.token === this.tok.T_AS) {
										var flags = null;
										var alias = null;
										if (this.next().is("T_MEMBER_FLAGS")) flags = this.read_member_flags();
										if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
											alias = this.node("identifier");
											var name = this.text();
											this.next();
											alias = alias(name);
										} else if (flags === false) this.expect(this.tok.T_STRING);
										return node("traitalias", trait, method, alias, flags);
									}
									this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]);
									return node("traitalias", trait, method, null, null);
								}
							};
						},
						3997(module$131) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$131.exports = {
								read_comment: function read_comment() {
									var text = this.text();
									var result = this.ast.prepare(text.substring(0, 2) === "/*" ? "commentblock" : "commentline", null, this);
									var offset = this.lexer.yylloc.first_offset;
									var prev = this.prev;
									this.prev = [
										this.lexer.yylloc.last_line,
										this.lexer.yylloc.last_column,
										this.lexer.offset
									];
									this.lex();
									result = result(text);
									result.offset = offset;
									this.prev = prev;
									return result;
								},
								read_doc_comment: function read_doc_comment() {
									var result = this.ast.prepare("commentblock", null, this);
									var offset = this.lexer.yylloc.first_offset;
									var text = this.text();
									var prev = this.prev;
									this.prev = [
										this.lexer.yylloc.last_line,
										this.lexer.yylloc.last_column,
										this.lexer.offset
									];
									this.lex();
									result = result(text);
									result.offset = offset;
									this.prev = prev;
									return result;
								}
							};
						},
						979(module$132) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$132.exports = {
								read_enum_declaration_statement: function read_enum_declaration_statement(attrs) {
									var result = this.node("enum");
									if (!this.expect(this.tok.T_ENUM)) return null;
									this.next().expect(this.tok.T_STRING);
									var propName = this.node("identifier");
									var name = this.text();
									this.next();
									propName = propName(name);
									var valueType = this.read_enum_value_type();
									var propImplements = this.read_implements_list();
									this.expect("{");
									var body = this.next().read_class_body(false, true);
									var node = result(propName, valueType, propImplements, body);
									if (attrs) node.attrGroups = attrs;
									return node;
								},
								read_enum_value_type: function read_enum_value_type() {
									if (this.token === ":") return this.next().read_namespace_name();
									return null;
								},
								read_enum_case: function read_enum_case() {
									this.expect(this.tok.T_CASE);
									var result = this.node("enumcase");
									var caseName = this.node("identifier");
									var name = this.next().text();
									this.next();
									caseName = caseName(name);
									var value = this.token === "=" ? this.next().read_expr() : null;
									this.expect(";");
									return result(caseName, value);
								}
							};
						},
						6477(module$133) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$133.exports = {
								read_expr: function read_expr(expr) {
									var result = this.node();
									if (this.token === "@") {
										if (!expr) expr = this.next().read_expr();
										return result("silent", expr);
									}
									if (!expr) expr = this.read_expr_item();
									if (this.token === "|") return result("bin", "|", expr, this.next().read_expr());
									if (this.token === "&") return result("bin", "&", expr, this.next().read_expr());
									if (this.token === "^") return result("bin", "^", expr, this.next().read_expr());
									if (this.token === ".") return result("bin", ".", expr, this.next().read_expr());
									if (this.token === "+") return result("bin", "+", expr, this.next().read_expr());
									if (this.token === "-") return result("bin", "-", expr, this.next().read_expr());
									if (this.token === "*") return result("bin", "*", expr, this.next().read_expr());
									if (this.token === "/") return result("bin", "/", expr, this.next().read_expr());
									if (this.token === "%") return result("bin", "%", expr, this.next().read_expr());
									if (this.token === this.tok.T_POW) return result("bin", "**", expr, this.next().read_expr());
									if (this.token === this.tok.T_SL) return result("bin", "<<", expr, this.next().read_expr());
									if (this.token === this.tok.T_SR) return result("bin", ">>", expr, this.next().read_expr());
									if (this.token === this.tok.T_BOOLEAN_OR) return result("bin", "||", expr, this.next().read_expr());
									if (this.token === this.tok.T_LOGICAL_OR) return result("bin", "or", expr, this.next().read_expr());
									if (this.token === this.tok.T_BOOLEAN_AND) return result("bin", "&&", expr, this.next().read_expr());
									if (this.token === this.tok.T_LOGICAL_AND) return result("bin", "and", expr, this.next().read_expr());
									if (this.token === this.tok.T_LOGICAL_XOR) return result("bin", "xor", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_IDENTICAL) return result("bin", "===", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_NOT_IDENTICAL) return result("bin", "!==", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_EQUAL) return result("bin", "==", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_NOT_EQUAL) return result("bin", "!=", expr, this.next().read_expr());
									if (this.token === "<") return result("bin", "<", expr, this.next().read_expr());
									if (this.token === ">") return result("bin", ">", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL) return result("bin", "<=", expr, this.next().read_expr());
									if (this.token === this.tok.T_IS_GREATER_OR_EQUAL) return result("bin", ">=", expr, this.next().read_expr());
									if (this.token === this.tok.T_SPACESHIP) return result("bin", "<=>", expr, this.next().read_expr());
									if (this.token === this.tok.T_INSTANCEOF) {
										expr = result("bin", "instanceof", expr, this.next().read_class_name_reference());
										if (this.token !== ";" && this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) expr = this.read_expr(expr);
									}
									if (this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR) {
										expr = result("nullsafepropertylookup", expr, this.read_what());
										expr = this.recursive_variable_chain_scan(expr, false, true);
									}
									if (this.token === this.tok.T_COALESCE) return result("bin", "??", expr, this.next().read_expr());
									if (this.token === this.tok.T_PIPE) {
										if (this.version < 805) this.raiseError("PHP 8.5+ is required to use pipe operator");
										return result("bin", "|>", expr, this.next().read_expr());
									}
									if (this.token === "?") {
										var trueArg = null;
										if (this.next().token !== ":") trueArg = this.read_expr();
										this.expect(":") && this.next();
										return result("retif", expr, trueArg, this.read_expr());
									} else result.destroy(expr);
									return expr;
								},
								read_expr_cast: function read_expr_cast(type) {
									return this.node("cast")(type, this.text(), this.next().read_expr());
								},
								read_isset_variable: function read_isset_variable() {
									return this.read_expr();
								},
								read_isset_variables: function read_isset_variables() {
									return this.read_function_list(this.read_isset_variable, ",");
								},
								read_internal_functions_in_yacc: function read_internal_functions_in_yacc() {
									var result = null;
									switch (this.token) {
										case this.tok.T_ISSET:
											result = this.node("isset");
											if (this.next().expect("(")) this.next();
											var variables = this.read_isset_variables();
											if (this.expect(")")) this.next();
											result = result(variables);
											break;
										case this.tok.T_EMPTY:
											result = this.node("empty");
											if (this.next().expect("(")) this.next();
											var expression = this.read_expr();
											if (this.expect(")")) this.next();
											result = result(expression);
											break;
										case this.tok.T_INCLUDE:
											result = this.node("include")(false, false, this.next().read_expr());
											break;
										case this.tok.T_INCLUDE_ONCE:
											result = this.node("include")(true, false, this.next().read_expr());
											break;
										case this.tok.T_EVAL:
											result = this.node("eval");
											if (this.next().expect("(")) this.next();
											var expr = this.read_expr();
											if (this.expect(")")) this.next();
											result = result(expr);
											break;
										case this.tok.T_REQUIRE:
											result = this.node("include")(false, true, this.next().read_expr());
											break;
										case this.tok.T_REQUIRE_ONCE:
											result = this.node("include")(true, true, this.next().read_expr());
											break;
									}
									return result;
								},
								read_optional_expr: function read_optional_expr(stopToken) {
									if (this.token !== stopToken) return this.read_expr();
									return null;
								},
								read_exit_expr: function read_exit_expr() {
									var expression = null;
									if (this.token === "(") {
										this.next();
										expression = this.read_optional_expr(")");
										this.expect(")") && this.next();
									}
									return expression;
								},
								read_expr_item: function read_expr_item() {
									var result, expr, attrs = [];
									if (this.token === "+") return this.node("unary")("+", this.next().read_expr());
									if (this.token === "-") return this.node("unary")("-", this.next().read_expr());
									if (this.token === "!") return this.node("unary")("!", this.next().read_expr());
									if (this.token === "~") return this.node("unary")("~", this.next().read_expr());
									if (this.token === "(") {
										expr = this.next().read_expr();
										expr.parenthesizedExpression = true;
										this.expect(")") && this.next();
										return this.handleDereferencable(expr);
									}
									if (this.token === "`") return this.read_encapsed_string("`");
									if (this.token === this.tok.T_LIST) {
										var assign = null;
										var isInner = this.innerList;
										result = this.node("list");
										if (!isInner) assign = this.node("assign");
										if (this.next().expect("(")) this.next();
										if (!this.innerList) this.innerList = true;
										var assignList = this.read_array_pair_list(false);
										if (this.expect(")")) this.next();
										var hasItem = false;
										for (var i = 0; i < assignList.length; i++) if (assignList[i] !== null && assignList[i].kind !== "noop") {
											hasItem = true;
											break;
										}
										if (!hasItem)
 /* istanbul ignore next */
										this.raiseError("Fatal Error :  Cannot use empty list on line " + this.lexer.yylloc.first_line);
										if (!isInner) {
											this.innerList = false;
											if (this.expect("=")) return assign(result(assignList, false), this.next().read_expr(), "=");
											else
 /* istanbul ignore next */
											return result(assignList, false);
										} else return result(assignList, false);
									}
									if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
									if (this.token === this.tok.T_CLONE) return this.node("clone")(this.next().read_expr());
									switch (this.token) {
										case this.tok.T_INC: return this.node("pre")("+", this.next().read_variable(false, false));
										case this.tok.T_DEC: return this.node("pre")("-", this.next().read_variable(false, false));
										case this.tok.T_NEW:
											expr = this.read_new_expr();
											if (this.token === this.tok.T_OBJECT_OPERATOR && this.version < 804) this.raiseError("New without parenthesis is not allowed before PHP 8.4");
											return this.handleDereferencable(expr);
										case this.tok.T_ISSET:
										case this.tok.T_EMPTY:
										case this.tok.T_INCLUDE:
										case this.tok.T_INCLUDE_ONCE:
										case this.tok.T_EVAL:
										case this.tok.T_REQUIRE:
										case this.tok.T_REQUIRE_ONCE: return this.read_internal_functions_in_yacc();
										case this.tok.T_MATCH: return this.read_match_expression();
										case this.tok.T_INT_CAST: return this.read_expr_cast("int");
										case this.tok.T_DOUBLE_CAST: return this.read_expr_cast("float");
										case this.tok.T_STRING_CAST: return this.read_expr_cast(this.text().indexOf("binary") !== -1 ? "binary" : "string");
										case this.tok.T_ARRAY_CAST: return this.read_expr_cast("array");
										case this.tok.T_OBJECT_CAST: return this.read_expr_cast("object");
										case this.tok.T_BOOL_CAST: return this.read_expr_cast("bool");
										case this.tok.T_UNSET_CAST: return this.read_expr_cast("unset");
										case this.tok.T_THROW:
											if (this.version < 800) this.raiseError("PHP 8+ is required to use throw as an expression");
											return this.node("throw")(this.next().read_expr());
										case this.tok.T_EXIT:
											var useDie = this.lexer.yytext.toLowerCase() === "die";
											result = this.node("exit");
											this.next();
											var expression = this.read_exit_expr();
											return result(expression, useDie);
										case this.tok.T_PRINT: return this.node("print")(this.next().read_expr());
										case this.tok.T_YIELD:
											var value = null;
											var key = null;
											result = this.node("yield");
											if (this.next().is("EXPR")) {
												value = this.read_expr();
												if (this.token === this.tok.T_DOUBLE_ARROW) {
													key = value;
													value = this.next().read_expr();
												}
											}
											return result(value, key);
										case this.tok.T_YIELD_FROM:
											result = this.node("yieldfrom");
											expr = this.next().read_expr();
											return result(expr);
										case this.tok.T_FN:
										case this.tok.T_FUNCTION: return this.read_inline_function(void 0, attrs);
										case this.tok.T_STATIC:
											var backup = [this.token, this.lexer.getState()];
											this.next();
											if (this.token === this.tok.T_FUNCTION || this.version >= 704 && this.token === this.tok.T_FN) return this.read_inline_function([
												0,
												1,
												0
											], attrs);
											else {
												this.lexer.tokens.push(backup);
												this.next();
											}
									}
									if (this.is("VARIABLE")) {
										result = this.node();
										expr = this.read_variable(false, false);
										var isConst = expr.kind === "identifier" || expr.kind === "staticlookup" && expr.offset.kind === "identifier";
										switch (this.token) {
											case "=":
												if (isConst) this.error("VARIABLE");
												if (this.next().token == "&") return this.read_assignref(result, expr);
												return result("assign", expr, this.read_expr(), "=");
											case this.tok.T_PLUS_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "+=");
											case this.tok.T_MINUS_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "-=");
											case this.tok.T_MUL_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "*=");
											case this.tok.T_POW_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "**=");
											case this.tok.T_DIV_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "/=");
											case this.tok.T_CONCAT_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), ".=");
											case this.tok.T_MOD_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "%=");
											case this.tok.T_AND_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "&=");
											case this.tok.T_OR_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "|=");
											case this.tok.T_XOR_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "^=");
											case this.tok.T_SL_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "<<=");
											case this.tok.T_SR_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), ">>=");
											case this.tok.T_COALESCE_EQUAL:
												if (isConst) this.error("VARIABLE");
												return result("assign", expr, this.next().read_expr(), "??=");
											case this.tok.T_INC:
												if (isConst) this.error("VARIABLE");
												this.next();
												return result("post", "+", expr);
											case this.tok.T_DEC:
												if (isConst) this.error("VARIABLE");
												this.next();
												return result("post", "-", expr);
											default: result.destroy(expr);
										}
									} else if (this.is("SCALAR")) {
										result = this.node();
										expr = this.read_scalar();
										if (expr.kind === "array" && expr.shortForm && this.token === "=") {
											var list = this.convertToList(expr);
											if (expr.loc) list.loc = expr.loc;
											var right = this.next().read_expr();
											return result("assign", list, right, "=");
										} else result.destroy(expr);
										return this.handleDereferencable(expr);
									} else {
										this.error("EXPR");
										this.next();
									}
									return expr;
								},
								convertToList: function convertToList(array) {
									var _this = this;
									var convertedItems = array.items.map(function(entry) {
										if (entry.value && entry.value.kind === "array" && entry.value.shortForm) entry.value = _this.convertToList(entry.value);
										return entry;
									});
									var node = this.node("list")(convertedItems, true);
									if (array.loc) node.loc = array.loc;
									if (array.leadingComments) node.leadingComments = array.leadingComments;
									if (array.trailingComments) node.trailingComments = array.trailingComments;
									return node;
								},
								read_assignref: function read_assignref(result, left) {
									this.next();
									var right;
									if (this.token === this.tok.T_NEW) {
										if (this.version >= 700) this.error();
										right = this.read_new_expr();
									} else right = this.read_variable(false, false);
									return result("assignref", left, right);
								},
								read_inline_function: function read_inline_function(flags, attrs) {
									if (this.token === this.tok.T_FUNCTION) {
										var _result2 = this.read_function(true, flags, attrs);
										_result2.attrGroups = attrs;
										return _result2;
									}
									if (!this.version >= 704) this.raiseError("Arrow Functions are not allowed");
									var node = this.node("arrowfunc");
									if (this.expect(this.tok.T_FN)) this.next();
									var isRef = this.is_reference();
									if (this.expect("(")) this.next();
									var params = this.read_parameter_list();
									if (this.expect(")")) this.next();
									var nullable = false;
									var returnType = null;
									if (this.token === ":") {
										if (this.next().token === "?") {
											nullable = true;
											this.next();
										}
										returnType = this.read_types();
									}
									if (this.expect(this.tok.T_DOUBLE_ARROW)) this.next();
									var result = node(params, isRef, this.read_expr(), returnType, nullable, flags ? true : false);
									result.attrGroups = attrs;
									return result;
								},
								read_match_expression: function read_match_expression() {
									var node = this.node("match");
									this.expect(this.tok.T_MATCH) && this.next();
									if (this.version < 800) this.raiseError("Match statements are not allowed before PHP 8");
									if (this.expect("(")) this.next();
									var cond = this.read_expr();
									if (this.expect(")")) this.next();
									if (this.expect("{")) this.next();
									var arms = this.read_match_arms();
									if (this.expect("}")) this.next();
									return node(cond, arms);
								},
								read_match_arms: function read_match_arms() {
									var _this2 = this;
									return this.read_list(function() {
										return _this2.read_match_arm();
									}, ",", true);
								},
								read_match_arm: function read_match_arm() {
									if (this.token === "}") return;
									return this.node("matcharm")(this.read_match_arm_conds(), this.read_expr());
								},
								read_match_arm_conds: function read_match_arm_conds() {
									var conds = [];
									if (this.token === this.tok.T_DEFAULT) {
										conds = null;
										this.next();
									} else {
										conds.push(this.read_expr());
										while (this.token === ",") {
											this.next();
											if (this.token === this.tok.T_DOUBLE_ARROW) {
												this.next();
												return conds;
											}
											conds.push(this.read_expr());
										}
									}
									if (this.expect(this.tok.T_DOUBLE_ARROW)) this.next();
									return conds;
								},
								read_attribute: function read_attribute() {
									var name = this.text();
									var args = [];
									this.next();
									if (this.token === "(") args = this.read_argument_list();
									return this.node("attribute")(name, args);
								},
								read_attr_list: function read_attr_list() {
									var list = [];
									if (this.token === this.tok.T_ATTRIBUTE) do {
										var attrGr = this.node("attrgroup")([]);
										this.next();
										attrGr.attrs.push(this.read_attribute());
										while (this.token === ",") {
											this.next();
											if (this.token !== "]") attrGr.attrs.push(this.read_attribute());
										}
										list.push(attrGr);
										this.expect("]");
										this.next();
									} while (this.token === this.tok.T_ATTRIBUTE);
									return list;
								},
								read_new_expr: function read_new_expr() {
									var result = this.node("new");
									this.expect(this.tok.T_NEW) && this.next();
									var args = [];
									if (this.token === "(") {
										this.next();
										var newExp = this.read_expr();
										this.expect(")");
										this.next();
										if (this.token === "(") args = this.read_argument_list();
										return result(newExp, args);
									}
									var attrs = this.read_attr_list();
									var isReadonly = this.token === this.tok.T_READ_ONLY;
									if (isReadonly) {
										if (this.version < 803) this.raiseError("Anonymous readonly classes are not allowed before PHP 8.3");
										this.next();
									}
									if (this.token === this.tok.T_CLASS) {
										var what = this.node("class");
										if (this.next().token === "(") args = this.read_argument_list();
										var propExtends = this.read_extends_from();
										var propImplements = this.read_implements_list();
										var body = null;
										if (this.expect("{")) body = this.next().read_class_body(true, false);
										var whatNode = what(null, propExtends, propImplements, body, [
											0,
											0,
											0,
											isReadonly ? 1 : 0
										]);
										whatNode.attrGroups = attrs;
										return result(whatNode, args);
									}
									var name = this.read_new_class_name();
									while (this.token === "[") {
										var offsetNode = this.node("offsetlookup");
										var offset = this.next().read_encaps_var_offset();
										this.expect("]") && this.next();
										name = offsetNode(name, offset);
									}
									if (this.token === "(") args = this.read_argument_list();
									return result(name, args);
								},
								read_new_class_name: function read_new_class_name() {
									if (this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_NAMESPACE) {
										var result = this.read_namespace_name(true);
										if (this.token === this.tok.T_DOUBLE_COLON) result = this.read_static_getter(result);
										return result;
									} else if (this.is("VARIABLE")) return this.read_variable(true, false);
									else this.expect([this.tok.T_STRING, "VARIABLE"]);
								},
								handleDereferencable: function handleDereferencable(expr) {
									while (this.token !== this.EOF) if (this.token === this.tok.T_OBJECT_OPERATOR || this.token === this.tok.T_DOUBLE_COLON || this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR) expr = this.recursive_variable_chain_scan(expr, false, false, true);
									else if (this.token === this.tok.T_CURLY_OPEN || this.token === "[") expr = this.read_dereferencable(expr);
									else if (this.token === "(") expr = this.node("call")(expr, this.read_argument_list());
									else return expr;
									return expr;
								}
							};
						},
						8214(module$134) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$134.exports = {
								is_reference: function is_reference() {
									if (this.token === "&") {
										this.next();
										return true;
									}
									return false;
								},
								is_variadic: function is_variadic() {
									if (this.token === this.tok.T_ELLIPSIS) {
										this.next();
										return true;
									}
									return false;
								},
								read_function: function read_function(closure, flag, attrs, locStart) {
									var result = this.read_function_declaration(closure ? 1 : flag ? 2 : 0, flag && flag[1] === 1, attrs || [], locStart);
									if (flag && flag[2] == 1) {
										result.parseFlags(flag);
										if (this.expect(";")) this.next();
									} else {
										if (this.expect("{")) {
											result.body = this.read_code_block(false);
											if (result.loc && result.body.loc) result.loc.end = result.body.loc.end;
										}
										if (!closure && flag) result.parseFlags(flag);
									}
									return result;
								},
								read_function_declaration: function read_function_declaration(type, isStatic, attrs, locStart) {
									var _this = this;
									var nodeName = "function";
									if (type === 1) nodeName = "closure";
									else if (type === 2) nodeName = "method";
									var result = this.node(nodeName);
									if (this.expect(this.tok.T_FUNCTION)) this.next();
									var isRef = this.is_reference();
									var name = false, use = [], returnType = null, nullable = false;
									if (type !== 1) {
										var nameNode = this.node("identifier");
										if (type === 2) if (this.version >= 700) {
											if (this.token === this.tok.T_STRING || this.is("IDENTIFIER")) {
												name = this.text();
												this.next();
											} else if (this.version < 704) this.error("IDENTIFIER");
										} else if (this.token === this.tok.T_STRING) {
											name = this.text();
											this.next();
										} else this.error("IDENTIFIER");
										else if (this.version >= 700) if (this.token === this.tok.T_STRING) {
											name = this.text();
											this.next();
										} else if (this.version >= 704) {
											if (!this.expect("(")) this.next();
										} else {
											this.error(this.tok.T_STRING);
											this.next();
										}
										else {
											if (this.expect(this.tok.T_STRING)) name = this.text();
											this.next();
										}
										name = nameNode(name);
									}
									if (this.expect("(")) this.next();
									var params = this.read_parameter_list(name.name === "__construct");
									if (this.expect(")")) this.next();
									if (type === 1) use = this.read_lexical_vars();
									if (this.token === ":") {
										if (this.next().token === "?") {
											nullable = true;
											this.next();
										}
										returnType = this.read_types();
									}
									var apply_attrgroup_location = function apply_attrgroup_location(node) {
										node.attrGroups = attrs || [];
										if (locStart && node.loc) {
											node.loc.start = locStart;
											if (node.loc.source) node.loc.source = _this.lexer._input.substr(node.loc.start.offset, node.loc.end.offset - node.loc.start.offset);
										}
										return node;
									};
									if (type === 1) return apply_attrgroup_location(result(params, isRef, use, returnType, nullable, isStatic));
									return apply_attrgroup_location(result(name, params, isRef, returnType, nullable));
								},
								read_lexical_vars: function read_lexical_vars() {
									var result = [];
									if (this.token === this.tok.T_USE) {
										this.next();
										this.expect("(") && this.next();
										result = this.read_lexical_var_list();
										this.expect(")") && this.next();
									}
									return result;
								},
								read_list_with_dangling_comma: function read_list_with_dangling_comma(item) {
									var result = [];
									while (this.token != this.EOF) {
										result.push(item());
										if (this.token == ",") {
											this.next();
											if (this.version >= 800 && this.token === ")") return result;
										} else if (this.token == ")") break;
										else {
											this.error([",", ")"]);
											break;
										}
									}
									return result;
								},
								read_lexical_var_list: function read_lexical_var_list() {
									return this.read_list_with_dangling_comma(this.read_lexical_var.bind(this));
								},
								read_lexical_var: function read_lexical_var() {
									if (this.token === "&") return this.read_byref(this.read_lexical_var.bind(this));
									var result = this.node("variable");
									this.expect(this.tok.T_VARIABLE);
									var name = this.text().substring(1);
									this.next();
									return result(name, false);
								},
								read_parameter_list: function read_parameter_list(is_class_constructor) {
									if (this.token !== ")") {
										var wasVariadic = false;
										return this.read_list_with_dangling_comma(function() {
											var parameter = this.read_parameter(is_class_constructor);
											if (parameter) {
												if (wasVariadic) this.raiseError("Unexpected parameter after a variadic parameter");
												if (parameter.variadic) wasVariadic = true;
											}
											return parameter;
										}.bind(this), ",");
									}
									return [];
								},
								read_parameter: function read_parameter(is_class_constructor) {
									var node = this.node("parameter");
									var parameterName = null;
									var value = null;
									var nullable = false;
									var readonly = false;
									var attrs = [];
									if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
									if (this.version >= 801 && this.token === this.tok.T_READ_ONLY) if (is_class_constructor) {
										this.next();
										readonly = true;
									} else this.raiseError("readonly properties can be used only on class constructor");
									var flags = this.read_promoted();
									if (!readonly && this.version >= 801 && this.token === this.tok.T_READ_ONLY) if (is_class_constructor) {
										this.next();
										readonly = true;
									} else this.raiseError("readonly properties can be used only on class constructor");
									if (this.token === "?") {
										this.next();
										nullable = true;
									}
									var types = this.read_types();
									if (nullable && !types) this.raiseError("Expecting a type definition combined with nullable operator");
									var isRef = this.is_reference();
									var isVariadic = this.is_variadic();
									if (this.expect(this.tok.T_VARIABLE)) {
										parameterName = this.node("identifier");
										var name = this.text().substring(1);
										this.next();
										parameterName = parameterName(name);
									}
									if (this.token == "=") value = this.next().read_expr();
									var result = node(parameterName, types, value, isRef, isVariadic, readonly, nullable, flags);
									if (attrs) result.attrGroups = attrs;
									return result;
								},
								read_types: function read_types() {
									var MODE_UNSET = "unset";
									var MODE_UNION = "union";
									var MODE_INTERSECTION = "intersection";
									var types = [];
									var mode = MODE_UNSET;
									var type = this.read_type();
									if (!type) return null;
									types.push(type);
									while (this.token === "|" || this.version >= 801 && this.token === "&") {
										var nextToken = this.peek();
										if (nextToken === this.tok.T_ELLIPSIS || nextToken === this.tok.T_VARIABLE) break;
										if (mode === MODE_UNSET) mode = this.token === "|" ? MODE_UNION : MODE_INTERSECTION;
										else if (mode === MODE_UNION && this.token !== "|" || mode === MODE_INTERSECTION && this.token !== "&") this.raiseError("Unexpect token \"" + this.token + "\", \"|\" and \"&\" can not be mixed");
										this.next();
										types.push(this.read_type());
									}
									if (types.length === 1) return types[0];
									else return mode === MODE_INTERSECTION ? this.node("intersectiontype")(types) : this.node("uniontype")(types);
								},
								read_promoted: function read_promoted() {
									var MODIFIER_PUBLIC = 1;
									var MODIFIER_PROTECTED = 2;
									var MODIFIER_PRIVATE = 4;
									if (this.token === this.tok.T_PUBLIC) {
										this.next();
										return MODIFIER_PUBLIC;
									} else if (this.token === this.tok.T_PROTECTED) {
										this.next();
										return MODIFIER_PROTECTED;
									} else if (this.token === this.tok.T_PRIVATE) {
										this.next();
										return MODIFIER_PRIVATE;
									}
									return 0;
								},
								read_argument_list: function read_argument_list() {
									var result = [];
									this.expect("(") && this.next();
									if (this.version >= 801 && this.token === this.tok.T_ELLIPSIS && this.peek() === ")") {
										result.push(this.node("variadicplaceholder")());
										this.next();
									} else if (this.token !== ")") result = this.read_non_empty_argument_list();
									this.expect(")") && this.next();
									return result;
								},
								read_non_empty_argument_list: function read_non_empty_argument_list() {
									var wasVariadic = false;
									return this.read_function_list(function() {
										var argument = this.read_argument();
										if (argument) {
											var isVariadic = argument.kind === "variadic";
											if (wasVariadic && !isVariadic) this.raiseError("Unexpected non-variadic argument after a variadic argument");
											if (isVariadic) wasVariadic = true;
										}
										return argument;
									}.bind(this), ",");
								},
								read_argument: function read_argument() {
									if (this.token === this.tok.T_ELLIPSIS) return this.node("variadic")(this.next().read_expr());
									if (this.token === this.tok.T_STRING || Object.values(this.lexer.keywords).includes(this.token)) {
										if (this.peek() === ":") {
											if (this.version < 800) this.raiseError("PHP 8+ is required to use named arguments");
											return this.node("namedargument")(this.text(), this.next().next().read_expr());
										}
									}
									return this.read_expr();
								},
								read_type: function read_type() {
									var result = this.node();
									if (this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE) {
										var type = this.text();
										this.next();
										return result("typereference", type.toLowerCase(), type);
									} else if (this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_STATIC) {
										var _type = this.text();
										var backup = [this.token, this.lexer.getState()];
										this.next();
										if (this.token !== this.tok.T_NS_SEPARATOR && this.ast.typereference.types.indexOf(_type.toLowerCase()) > -1) return result("typereference", _type.toLowerCase(), _type);
										else {
											this.lexer.tokens.push(backup);
											this.next();
											result.destroy();
											return this.read_namespace_name();
										}
									}
									result.destroy();
									return null;
								}
							};
						},
						9461(module$135) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$135.exports = {
								read_if: function read_if() {
									var result = this.node("if");
									var test = this.next().read_if_expr();
									var body;
									var alternate = null;
									var shortForm = false;
									if (this.token === ":") {
										shortForm = true;
										this.next();
										body = this.node("block");
										var items = [];
										while (this.token !== this.EOF && this.token !== this.tok.T_ENDIF) {
											if (this.token === this.tok.T_ELSEIF) {
												alternate = this.read_elseif_short();
												break;
											} else if (this.token === this.tok.T_ELSE) {
												alternate = this.read_else_short();
												break;
											}
											items.push(this.read_inner_statement());
										}
										body = body(null, items);
										this.expect(this.tok.T_ENDIF) && this.next();
										this.expectEndOfStatement();
									} else {
										body = this.read_statement();
										if (this.token === this.tok.T_ELSEIF) alternate = this.read_if();
										else if (this.token === this.tok.T_ELSE) alternate = this.next().read_statement();
									}
									return result(test, body, alternate, shortForm);
								},
								read_if_expr: function read_if_expr() {
									this.expect("(") && this.next();
									var result = this.read_expr();
									this.expect(")") && this.next();
									return result;
								},
								read_elseif_short: function read_elseif_short() {
									var alternate = null;
									var result = this.node("if");
									var test = this.next().read_if_expr();
									if (this.expect(":")) this.next();
									var body = this.node("block");
									var items = [];
									while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
										if (this.token === this.tok.T_ELSEIF) {
											alternate = this.read_elseif_short();
											break;
										} else if (this.token === this.tok.T_ELSE) {
											alternate = this.read_else_short();
											break;
										}
										items.push(this.read_inner_statement());
									}
									return result(test, body(null, items), alternate, true);
								},
								read_else_short: function read_else_short() {
									if (this.next().expect(":")) this.next();
									var body = this.node("block");
									var items = [];
									while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) items.push(this.read_inner_statement());
									return body(null, items);
								}
							};
						},
						5931(module$136) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$136.exports = {
								read_while: function read_while() {
									var result = this.node("while");
									this.expect(this.tok.T_WHILE) && this.next();
									var body;
									var shortForm = false;
									if (this.expect("(")) this.next();
									var test = this.read_expr();
									if (this.expect(")")) this.next();
									if (this.token === ":") {
										shortForm = true;
										body = this.read_short_form(this.tok.T_ENDWHILE);
									} else body = this.read_statement();
									return result(test, body, shortForm);
								},
								read_do: function read_do() {
									var result = this.node("do");
									this.expect(this.tok.T_DO) && this.next();
									var test = null;
									var body = this.read_statement();
									if (this.expect(this.tok.T_WHILE)) {
										if (this.next().expect("(")) this.next();
										test = this.read_expr();
										if (this.expect(")")) this.next();
										if (this.expect(";")) this.next();
									}
									return result(test, body);
								},
								read_for: function read_for() {
									var result = this.node("for");
									this.expect(this.tok.T_FOR) && this.next();
									var init = [];
									var test = [];
									var increment = [];
									var body;
									var shortForm = false;
									if (this.expect("(")) this.next();
									if (this.token !== ";") {
										init = this.read_list(this.read_expr, ",");
										if (this.expect(";")) this.next();
									} else this.next();
									if (this.token !== ";") {
										test = this.read_list(this.read_expr, ",");
										if (this.expect(";")) this.next();
									} else this.next();
									if (this.token !== ")") {
										increment = this.read_list(this.read_expr, ",");
										if (this.expect(")")) this.next();
									} else this.next();
									if (this.token === ":") {
										shortForm = true;
										body = this.read_short_form(this.tok.T_ENDFOR);
									} else body = this.read_statement();
									return result(init, test, increment, body, shortForm);
								},
								read_foreach: function read_foreach() {
									var result = this.node("foreach");
									this.expect(this.tok.T_FOREACH) && this.next();
									var key = null;
									var value = null;
									var body;
									var shortForm = false;
									if (this.expect("(")) this.next();
									var source = this.read_expr();
									if (this.expect(this.tok.T_AS)) {
										this.next();
										value = this.read_foreach_variable();
										if (this.token === this.tok.T_DOUBLE_ARROW) {
											key = value;
											value = this.next().read_foreach_variable();
										}
									}
									if (key && key.kind === "list") this.raiseError("Fatal Error : Cannot use list as key element");
									if (this.expect(")")) this.next();
									if (this.token === ":") {
										shortForm = true;
										body = this.read_short_form(this.tok.T_ENDFOREACH);
									} else body = this.read_statement();
									return result(source, key, value, body, shortForm);
								},
								read_foreach_variable: function read_foreach_variable() {
									if (this.token === this.tok.T_LIST || this.token === "[") {
										var isShort = this.token === "[";
										var result = this.node("list");
										this.next();
										if (!isShort && this.expect("(")) this.next();
										var assignList = this.read_array_pair_list(isShort);
										if (this.expect(isShort ? "]" : ")")) this.next();
										return result(assignList, isShort);
									} else return this.read_variable(false, false);
								}
							};
						},
						9147(module$137) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$137.exports = { read_start: function read_start() {
								if (this.token == this.tok.T_NAMESPACE) return this.read_namespace();
								else return this.read_top_statement();
							} };
						},
						9219(module$138) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$138.exports = {
								read_namespace: function read_namespace() {
									var result = this.node("namespace");
									var body;
									this.expect(this.tok.T_NAMESPACE) && this.next();
									var name;
									if (this.token === "{") name = { name: [""] };
									else name = this.read_namespace_name();
									this.currentNamespace = name;
									if (this.token === ";") {
										this.currentNamespace = name;
										body = this.next().read_top_statements();
										this.expect(this.EOF);
										return result(name.name, body, false);
									} else if (this.token === "{") {
										this.currentNamespace = name;
										body = this.next().read_top_statements();
										this.expect("}") && this.next();
										if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) body.push(this.node("noop")());
										return result(name.name, body, true);
									} else {
										this.error(["{", ";"]);
										this.currentNamespace = name;
										body = this.read_top_statements();
										this.expect(this.EOF);
										return result(name, body, false);
									}
								},
								read_namespace_name: function read_namespace_name(resolveReference) {
									var result = this.node();
									var resolution;
									var name = this.text();
									switch (this.token) {
										case this.tok.T_NAME_RELATIVE:
											resolution = this.ast.name.RELATIVE_NAME;
											name = name.replace(/^namespace\\/, "");
											break;
										case this.tok.T_NAME_QUALIFIED:
											resolution = this.ast.name.QUALIFIED_NAME;
											break;
										case this.tok.T_NAME_FULLY_QUALIFIED:
											resolution = this.ast.name.FULL_QUALIFIED_NAME;
											break;
										default:
											resolution = this.ast.name.UNQUALIFIED_NAME;
											if (!this.expect(this.tok.T_STRING)) return result("name", "", this.ast.name.FULL_QUALIFIED_NAME);
									}
									this.next();
									if (resolveReference || this.token !== "(") {
										if (name.toLowerCase() === "parent") return result("parentreference", name);
										else if (name.toLowerCase() === "self") return result("selfreference", name);
									}
									return result("name", name, resolution);
								},
								read_use_statement: function read_use_statement() {
									var result = this.node("usegroup");
									var items = [];
									var name = null;
									this.expect(this.tok.T_USE) && this.next();
									var type = this.read_use_type();
									items.push(this.read_use_declaration(false));
									if (this.token === ",") items = items.concat(this.next().read_use_declarations(false));
									else if (this.token === "{") {
										name = items[0].name;
										items = this.next().read_use_declarations(type === null);
										this.expect("}") && this.next();
									}
									result = result(name, type, items);
									this.expect(";") && this.next();
									return result;
								},
								read_class_name_reference: function read_class_name_reference() {
									return this.read_variable(true, false);
								},
								read_use_declaration: function read_use_declaration(typed) {
									var result = this.node("useitem");
									var type = null;
									if (typed) type = this.read_use_type();
									var name = this.read_namespace_name();
									var alias = this.read_use_alias();
									return result(name.name, alias, type);
								},
								read_use_declarations: function read_use_declarations(typed) {
									var result = [this.read_use_declaration(typed)];
									while (this.token === ",") {
										this.next();
										if (typed) {
											if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_FUNCTION && this.token !== this.tok.T_CONST && this.token !== this.tok.T_STRING) break;
										} else if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_STRING && this.token !== this.tok.T_NS_SEPARATOR) break;
										result.push(this.read_use_declaration(typed));
									}
									return result;
								},
								read_use_alias: function read_use_alias() {
									var result = null;
									if (this.token === this.tok.T_AS) {
										if (this.next().expect(this.tok.T_STRING)) {
											var aliasName = this.node("identifier");
											var name = this.text();
											this.next();
											result = aliasName(name);
										}
									}
									return result;
								},
								read_use_type: function read_use_type() {
									if (this.token === this.tok.T_FUNCTION) {
										this.next();
										return this.ast.useitem.TYPE_FUNCTION;
									} else if (this.token === this.tok.T_CONST) {
										this.next();
										return this.ast.useitem.TYPE_CONST;
									}
									return null;
								}
							};
						},
						7170(module$139) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							var specialChar = {
								"\\": "\\",
								$: "$",
								n: "\n",
								r: "\r",
								t: "	",
								f: String.fromCharCode(12),
								v: String.fromCharCode(11),
								e: String.fromCharCode(27)
							};
							module$139.exports = {
								resolve_special_chars: function resolve_special_chars(text, doubleQuote) {
									if (!doubleQuote) return text.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
									return text.replace(/\\"/, "\"").replace(/\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g, function($match, p1, p2) {
										if (specialChar[p1]) return specialChar[p1];
										else if ("x" === p1[0] || "X" === p1[0]) return String.fromCodePoint(parseInt(p1.substr(1), 16));
										else if ("u" === p1[0]) return String.fromCodePoint(parseInt(p2, 16));
										else return String.fromCodePoint(parseInt(p1, 8));
									});
								},
								remove_heredoc_leading_whitespace_chars: function remove_heredoc_leading_whitespace_chars(text, indentation, indentation_uses_spaces, first_encaps_node) {
									if (indentation === 0) return text;
									this.check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node);
									var matchedChar = indentation_uses_spaces ? " " : "	";
									var removementRegExp = new RegExp("\\n".concat(matchedChar, "{").concat(indentation, "}"), "g");
									var removementFirstEncapsNodeRegExp = new RegExp("^".concat(matchedChar, "{").concat(indentation, "}"));
									if (first_encaps_node) text = text.replace(removementFirstEncapsNodeRegExp, "");
									return text.replace(removementRegExp, "\n");
								},
								check_heredoc_indentation_level: function check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node) {
									var textSize = text.length;
									var offset = 0;
									var leadingWhitespaceCharCount = 0;
									var inCoutingState = true;
									var chToCheck = indentation_uses_spaces ? " " : "	";
									var inCheckState = false;
									if (!first_encaps_node) {
										offset = text.indexOf("\n");
										if (offset === -1) return;
										offset++;
									}
									while (offset < textSize) {
										if (inCoutingState) if (text[offset] === chToCheck) leadingWhitespaceCharCount++;
										else inCheckState = true;
										else inCoutingState = false;
										if (text[offset] !== "\n" && inCheckState && leadingWhitespaceCharCount < indentation) this.raiseError("Invalid body indentation level (expecting an indentation at least ".concat(indentation, ")"));
										else inCheckState = false;
										if (text[offset] === "\n") {
											inCoutingState = true;
											leadingWhitespaceCharCount = 0;
										}
										offset++;
									}
								},
								read_dereferencable_scalar: function read_dereferencable_scalar() {
									var result = null;
									switch (this.token) {
										case this.tok.T_CONSTANT_ENCAPSED_STRING:
											var value = this.node("string");
											var text = this.text();
											var offset = 0;
											if (text[0] === "b" || text[0] === "B") offset = 1;
											var isDoubleQuote = text[offset] === "\"";
											this.next();
											var textValue = this.resolve_special_chars(text.substring(offset + 1, text.length - 1), isDoubleQuote);
											value = value(isDoubleQuote, textValue, offset === 1, text);
											if (this.token === this.tok.T_DOUBLE_COLON) result = this.read_static_getter(value);
											else result = value;
											break;
										case this.tok.T_ARRAY:
											result = this.read_array();
											break;
										case "[":
											result = this.read_array();
											break;
									}
									return result;
								},
								read_scalar: function read_scalar() {
									if (this.is("T_MAGIC_CONST")) return this.get_magic_constant();
									else {
										var value, node;
										switch (this.token) {
											case this.tok.T_LNUMBER:
											case this.tok.T_DNUMBER:
												var result = this.node("number");
												value = this.text();
												this.next();
												return result(value, null);
											case this.tok.T_START_HEREDOC: if (this.lexer.curCondition === "ST_NOWDOC") {
												var start = this.lexer.yylloc.first_offset;
												node = this.node("nowdoc");
												value = this.next().text();
												if (this.lexer.heredoc_label.indentation > 0) value = value.substring(0, value.length - this.lexer.heredoc_label.indentation);
												var lastCh = value[value.length - 1];
												if (lastCh === "\n") if (value[value.length - 2] === "\r") value = value.substring(0, value.length - 2);
												else value = value.substring(0, value.length - 1);
												else if (lastCh === "\r") value = value.substring(0, value.length - 1);
												this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next();
												this.expect(this.tok.T_END_HEREDOC) && this.next();
												var raw = this.lexer._input.substring(start, this.lexer.yylloc.first_offset);
												node = node(this.remove_heredoc_leading_whitespace_chars(value, this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node), raw, this.lexer.heredoc_label.label);
												this.lexer.heredoc_label.finished = true;
												return node;
											} else return this.read_encapsed_string(this.tok.T_END_HEREDOC);
											case "\"": return this.read_encapsed_string("\"");
											case "b\"":
											case "B\"": return this.read_encapsed_string("\"", true);
											case this.tok.T_CONSTANT_ENCAPSED_STRING:
											case this.tok.T_ARRAY:
											case "[": return this.read_dereferencable_scalar();
											default:
												var err = this.error("SCALAR");
												this.next();
												return err;
										}
									}
								},
								read_dereferencable: function read_dereferencable(expr) {
									var result, offset;
									var node = this.node("offsetlookup");
									if (this.token === "[") {
										offset = this.next().read_expr();
										if (this.expect("]")) this.next();
										result = node(expr, offset);
									} else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
										offset = this.read_encapsed_string_item(false);
										result = node(expr, offset);
									}
									return result;
								},
								read_encapsed_string_item: function read_encapsed_string_item(isDoubleQuote) {
									var encapsedPart = this.node("encapsedpart");
									var syntax = null;
									var curly = false;
									var result = this.node(), offset, node, name;
									if (this.token === this.tok.T_ENCAPSED_AND_WHITESPACE) {
										var text = this.text();
										this.next();
										result = result("string", false, this.version >= 703 && !this.lexer.heredoc_label.finished ? this.remove_heredoc_leading_whitespace_chars(this.resolve_special_chars(text, isDoubleQuote), this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node) : text, false, text);
									} else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
										syntax = "simple";
										curly = true;
										if (this.next().token === this.tok.T_STRING_VARNAME) {
											name = this.node("variable");
											var varName = this.text();
											this.next();
											result.destroy();
											if (this.token === "[") {
												name = name(varName, false);
												node = this.node("offsetlookup");
												offset = this.next().read_expr();
												this.expect("]") && this.next();
												result = node(name, offset);
											} else result = name(varName, false);
										} else result = result("variable", this.read_expr(), false);
										this.expect("}") && this.next();
									} else if (this.token === this.tok.T_CURLY_OPEN) {
										syntax = "complex";
										result.destroy();
										result = this.next().read_variable(false, false);
										this.expect("}") && this.next();
									} else if (this.token === this.tok.T_VARIABLE) {
										syntax = "simple";
										result.destroy();
										result = this.read_simple_variable();
										if (this.token === "[") {
											node = this.node("offsetlookup");
											offset = this.next().read_encaps_var_offset();
											this.expect("]") && this.next();
											result = node(result, offset);
										}
										if (this.token === this.tok.T_OBJECT_OPERATOR) {
											node = this.node("propertylookup");
											this.next().expect(this.tok.T_STRING);
											var what = this.node("identifier");
											name = this.text();
											this.next();
											result = node(result, what(name));
										}
									} else {
										this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);
										var value = this.text();
										this.next();
										result.destroy();
										result = result("string", false, value, false, value);
									}
									this.lexer.heredoc_label.first_encaps_node = false;
									return encapsedPart(result, syntax, curly);
								},
								read_encapsed_string: function read_encapsed_string(expect) {
									var isBinary = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
									var labelStart = this.lexer.yylloc.first_offset;
									var node = this.node("encapsed");
									this.next();
									var start = this.lexer.yylloc.prev_offset - (isBinary ? 1 : 0);
									var value = [];
									var type;
									if (expect === "`") type = this.ast.encapsed.TYPE_SHELL;
									else if (expect === "\"") type = this.ast.encapsed.TYPE_STRING;
									else type = this.ast.encapsed.TYPE_HEREDOC;
									while (this.token !== expect && this.token !== this.EOF) value.push(this.read_encapsed_string_item(true));
									if (value.length > 0 && value[value.length - 1].kind === "encapsedpart" && value[value.length - 1].expression.kind === "string") {
										var _node = value[value.length - 1].expression;
										var lastCh = _node.value[_node.value.length - 1];
										if (lastCh === "\n") if (_node.value[_node.value.length - 2] === "\r") _node.value = _node.value.substring(0, _node.value.length - 2);
										else _node.value = _node.value.substring(0, _node.value.length - 1);
										else if (lastCh === "\r") _node.value = _node.value.substring(0, _node.value.length - 1);
									}
									this.expect(expect) && this.next();
									var raw = this.lexer._input.substring(type === "heredoc" ? labelStart : start - 1, this.lexer.yylloc.first_offset);
									node = node(value, raw, type);
									if (expect === this.tok.T_END_HEREDOC) {
										node.label = this.lexer.heredoc_label.label;
										this.lexer.heredoc_label.finished = true;
									}
									return node;
								},
								get_magic_constant: function get_magic_constant() {
									var result = this.node("magic");
									var name = this.text();
									this.next();
									return result(name.toUpperCase(), name);
								}
							};
						},
						6261(module$140) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$140.exports = {
								read_top_statements: function read_top_statements() {
									var result = [];
									while (this.token !== this.EOF && this.token !== "}") {
										var statement = this.read_top_statement();
										if (statement) if (Array.isArray(statement)) result = result.concat(statement);
										else result.push(statement);
									}
									return result;
								},
								read_top_statement: function read_top_statement() {
									var attrs = [];
									if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
									switch (this.token) {
										case this.tok.T_FUNCTION: return this.read_function(false, false, attrs);
										case this.tok.T_ABSTRACT:
										case this.tok.T_FINAL:
										case this.tok.T_READ_ONLY:
										case this.tok.T_CLASS: return this.read_class_declaration_statement(attrs);
										case this.tok.T_INTERFACE: return this.read_interface_declaration_statement(attrs);
										case this.tok.T_TRAIT: return this.read_trait_declaration_statement();
										case this.tok.T_ENUM: return this.read_enum_declaration_statement(attrs);
										case this.tok.T_USE: return this.read_use_statement();
										case this.tok.T_CONST:
											var result = this.node("constantstatement");
											var items = this.next().read_const_list();
											this.expectEndOfStatement();
											return result(null, items);
										case this.tok.T_NAMESPACE: return this.read_namespace();
										case this.tok.T_HALT_COMPILER:
											var _result = this.node("halt");
											if (this.next().expect("(")) this.next();
											if (this.expect(")")) this.next();
											this.expect(";");
											this.lexer.done = true;
											return _result(this.lexer._input.substring(this.lexer.offset));
										default: return this.read_statement();
									}
								},
								read_inner_statements: function read_inner_statements() {
									var result = [];
									while (this.token != this.EOF && this.token !== "}") {
										var statement = this.read_inner_statement();
										if (statement) if (Array.isArray(statement)) result = result.concat(statement);
										else result.push(statement);
									}
									return result;
								},
								read_const_list: function read_const_list() {
									return this.read_list(function() {
										this.expect(this.tok.T_STRING);
										var result = this.node("constant");
										var constName = this.node("identifier");
										var name = this.text();
										this.next();
										constName = constName(name);
										if (this.expect("=")) return result(constName, this.next().read_expr());
										else return result(constName, null);
									}, ",", false);
								},
								read_declare_list: function read_declare_list() {
									var result = [];
									while (this.token != this.EOF && this.token !== ")") {
										this.expect(this.tok.T_STRING);
										var directive = this.node("declaredirective");
										var key = this.node("identifier");
										var name = this.text();
										this.next();
										key = key(name);
										var value = null;
										if (this.expect("=")) value = this.next().read_expr();
										result.push(directive(key, value));
										if (this.token !== ",") break;
										this.next();
									}
									return result;
								},
								read_inner_statement: function read_inner_statement() {
									var attrs = [];
									if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
									switch (this.token) {
										case this.tok.T_FUNCTION:
											var result = this.read_function(false, false);
											result.attrGroups = attrs;
											return result;
										case this.tok.T_ABSTRACT:
										case this.tok.T_FINAL:
										case this.tok.T_CLASS: return this.read_class_declaration_statement();
										case this.tok.T_INTERFACE: return this.read_interface_declaration_statement();
										case this.tok.T_TRAIT: return this.read_trait_declaration_statement();
										case this.tok.T_ENUM: return this.read_enum_declaration_statement();
										case this.tok.T_HALT_COMPILER:
											this.raiseError("__HALT_COMPILER() can only be used from the outermost scope");
											var node = this.node("halt");
											this.next().expect("(") && this.next();
											this.expect(")") && this.next();
											node = node(this.lexer._input.substring(this.lexer.offset));
											this.expect(";") && this.next();
											return node;
										default: return this.read_statement();
									}
								},
								read_statement: function read_statement() {
									switch (this.token) {
										case "{": return this.read_code_block(false);
										case this.tok.T_IF: return this.read_if();
										case this.tok.T_SWITCH: return this.read_switch();
										case this.tok.T_FOR: return this.read_for();
										case this.tok.T_FOREACH: return this.read_foreach();
										case this.tok.T_WHILE: return this.read_while();
										case this.tok.T_DO: return this.read_do();
										case this.tok.T_COMMENT: return this.read_comment();
										case this.tok.T_DOC_COMMENT: return this.read_doc_comment();
										case this.tok.T_RETURN:
											var result = this.node("return");
											this.next();
											var expr = this.read_optional_expr(";");
											this.expectEndOfStatement();
											return result(expr);
										case this.tok.T_BREAK:
										case this.tok.T_CONTINUE:
											var _result2 = this.node(this.token === this.tok.T_CONTINUE ? "continue" : "break");
											this.next();
											var level = this.read_optional_expr(";");
											this.expectEndOfStatement();
											return _result2(level);
										case this.tok.T_GLOBAL:
											var _result3 = this.node("global");
											var items = this.next().read_list(this.read_simple_variable, ",");
											this.expectEndOfStatement();
											return _result3(items);
										case this.tok.T_STATIC:
											var current = [this.token, this.lexer.getState()];
											var _result4 = this.node();
											if (this.next().token === this.tok.T_DOUBLE_COLON) {
												this.lexer.tokens.push(current);
												var _expr = this.next().read_expr();
												this.expectEndOfStatement(_expr);
												return _result4("expressionstatement", _expr);
											}
											if (this.token === this.tok.T_FUNCTION) return this.read_function(true, [
												0,
												1,
												0
											]);
											var _items = this.read_variable_declarations();
											this.expectEndOfStatement();
											return _result4("static", _items);
										case this.tok.T_ECHO:
											var _result5 = this.node("echo");
											var text = this.text();
											var shortForm = text === "<?=" || text === "<%=";
											var expressions = this.next().read_function_list(this.read_expr, ",");
											this.expectEndOfStatement();
											return _result5(expressions, shortForm);
										case this.tok.T_INLINE_HTML:
											var value = this.text();
											var prevChar = this.lexer.yylloc.first_offset > 0 ? this.lexer._input[this.lexer.yylloc.first_offset - 1] : null;
											var fixFirstLine = prevChar === "\r" || prevChar === "\n";
											if (fixFirstLine) {
												if (prevChar === "\n" && this.lexer.yylloc.first_offset > 1 && this.lexer._input[this.lexer.yylloc.first_offset - 2] === "\r") prevChar = "\r\n";
											}
											var _result6 = this.node("inline");
											this.next();
											return _result6(value, fixFirstLine ? prevChar + value : value);
										case this.tok.T_UNSET:
											var _result7 = this.node("unset");
											this.next().expect("(") && this.next();
											var variables = this.read_function_list(this.read_variable, ",");
											this.expect(")") && this.next();
											this.expect(";") && this.next();
											return _result7(variables);
										case this.tok.T_DECLARE:
											var _result8 = this.node("declare");
											var body = [];
											var mode;
											this.next().expect("(") && this.next();
											var directives = this.read_declare_list();
											this.expect(")") && this.next();
											if (this.token === ":") {
												this.next();
												while (this.token != this.EOF && this.token !== this.tok.T_ENDDECLARE) body.push(this.read_top_statement());
												if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) body.push(this.node("noop")());
												this.expect(this.tok.T_ENDDECLARE) && this.next();
												this.expectEndOfStatement();
												mode = this.ast.declare.MODE_SHORT;
											} else if (this.token === "{") {
												this.next();
												while (this.token != this.EOF && this.token !== "}") body.push(this.read_top_statement());
												if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) body.push(this.node("noop")());
												this.expect("}") && this.next();
												mode = this.ast.declare.MODE_BLOCK;
											} else {
												this.expect(";") && this.next();
												mode = this.ast.declare.MODE_NONE;
											}
											return _result8(directives, body, mode);
										case this.tok.T_TRY: return this.read_try();
										case this.tok.T_THROW:
											var _result9 = this.node("throw");
											var _expr2 = this.next().read_expr();
											this.expectEndOfStatement();
											return _result9(_expr2);
										case ";":
											this.next();
											return null;
										case this.tok.T_STRING:
											var _result0 = this.node();
											var _current = [this.token, this.lexer.getState()];
											var labelNameText = this.text();
											var labelName = this.node("identifier");
											if (this.next().token === ":") {
												labelName = labelName(labelNameText);
												this.next();
												return _result0("label", labelName);
											} else labelName.destroy();
											_result0.destroy();
											this.lexer.tokens.push(_current);
											var statement = this.node("expressionstatement");
											var _expr3 = this.next().read_expr();
											this.expectEndOfStatement(_expr3);
											return statement(_expr3);
										case this.tok.T_GOTO:
											var _result1 = this.node("goto");
											var _labelName = null;
											if (this.next().expect(this.tok.T_STRING)) {
												_labelName = this.node("identifier");
												var name = this.text();
												this.next();
												_labelName = _labelName(name);
												this.expectEndOfStatement();
											}
											return _result1(_labelName);
										default:
											var _statement = this.node("expressionstatement");
											var _expr4 = this.read_expr();
											this.expectEndOfStatement(_expr4);
											return _statement(_expr4);
									}
								},
								read_code_block: function read_code_block(top) {
									var result = this.node("block");
									this.expect("{") && this.next();
									var body = top ? this.read_top_statements() : this.read_inner_statements();
									if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) body.push(this.node("noop")());
									this.expect("}") && this.next();
									return result(null, body);
								}
							};
						},
						2478(module$141) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$141.exports = {
								read_switch: function read_switch() {
									var result = this.node("switch");
									this.expect(this.tok.T_SWITCH) && this.next();
									this.expect("(") && this.next();
									var test = this.read_expr();
									this.expect(")") && this.next();
									var shortForm = this.token === ":";
									return result(test, this.read_switch_case_list(), shortForm);
								},
								read_switch_case_list: function read_switch_case_list() {
									var expect = null;
									var result = this.node("block");
									var items = [];
									if (this.token === "{") expect = "}";
									else if (this.token === ":") expect = this.tok.T_ENDSWITCH;
									else this.expect(["{", ":"]);
									this.next();
									if (this.token === ";") this.next();
									while (this.token !== this.EOF && this.token !== expect) items.push(this.read_case_list(expect));
									if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) items.push(this.node("noop")());
									this.expect(expect) && this.next();
									if (expect === this.tok.T_ENDSWITCH) this.expectEndOfStatement();
									return result(null, items);
								},
								read_case_list: function read_case_list(stopToken) {
									var result = this.node("case");
									var test = null;
									if (this.token === this.tok.T_CASE) test = this.next().read_expr();
									else if (this.token === this.tok.T_DEFAULT) this.next();
									else this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]);
									this.expect([":", ";"]) && this.next();
									var body = this.node("block");
									var items = [];
									while (this.token !== this.EOF && this.token !== stopToken && this.token !== this.tok.T_CASE && this.token !== this.tok.T_DEFAULT) items.push(this.read_inner_statement());
									return result(test, body(null, items));
								}
							};
						},
						77(module$142) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$142.exports = { read_try: function read_try() {
								this.expect(this.tok.T_TRY);
								var result = this.node("try");
								var always = null;
								var catches = [];
								var body = this.next().read_statement();
								while (this.token === this.tok.T_CATCH) {
									var item = this.node("catch");
									this.next().expect("(") && this.next();
									var what = this.read_list(this.read_namespace_name, "|", false);
									var variable = null;
									if (this.version < 800 || this.token === this.tok.T_VARIABLE) variable = this.read_variable(true, false);
									this.expect(")");
									catches.push(item(this.next().read_statement(), what, variable));
								}
								if (this.token === this.tok.T_FINALLY) always = this.next().read_statement();
								return result(body, catches, always);
							} };
						},
						6077(module$143) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$143.exports = {
								read_short_form: function read_short_form(token) {
									var body = this.node("block");
									var items = [];
									/* istanbul ignore next */
									if (this.expect(":")) this.next();
									while (this.token != this.EOF && this.token !== token) items.push(this.read_inner_statement());
									if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) items.push(this.node("noop")());
									/* istanbul ignore next */
									if (this.expect(token)) this.next();
									this.expectEndOfStatement();
									return body(null, items);
								},
								read_function_list: function read_function_list(item, separator) {
									var result = [];
									do {
										if (this.token == separator && this.version >= 703 && result.length > 0) {
											result.push(this.node("noop")());
											break;
										}
										result.push(item.apply(this, []));
										if (this.token != separator) break;
										if (this.next().token == ")" && this.version >= 703) break;
									} while (this.token != this.EOF);
									return result;
								},
								read_list: function read_list(item, separator, preserveFirstSeparator) {
									var result = [];
									if (this.token == separator) {
										if (preserveFirstSeparator) result.push(typeof item === "function" ? this.node("noop")() : null);
										this.next();
									}
									if (typeof item === "function") do {
										var itemResult = item.apply(this, []);
										if (itemResult) result.push(itemResult);
										if (this.token != separator) break;
									} while (this.next().token != this.EOF);
									else {
										if (this.expect(item)) result.push(this.text());
										else return [];
										while (this.next().token != this.EOF) {
											if (this.token != separator) break;
											if (this.next().token != item) break;
											result.push(this.text());
										}
									}
									return result;
								},
								read_name_list: function read_name_list() {
									return this.read_list(this.read_namespace_name, ",", false);
								},
								read_byref: function read_byref(cb) {
									var byref = this.node("byref");
									this.next();
									byref = byref(null);
									var result = cb();
									if (result) {
										this.ast.swapLocations(result, byref, result, this);
										result.byref = true;
									}
									return result;
								},
								read_variable_declarations: function read_variable_declarations() {
									return this.read_list(function() {
										var node = this.node("staticvariable");
										var variable = this.node("variable");
										/* istanbul ignore else */
										if (this.expect(this.tok.T_VARIABLE)) {
											var name = this.text().substring(1);
											this.next();
											variable = variable(name, false);
										} else variable = variable("#ERR", false);
										if (this.token === "=") return node(variable, this.next().read_expr());
										else return variable;
									}, ",");
								},
								read_extends_from: function read_extends_from() {
									if (this.token === this.tok.T_EXTENDS) return this.next().read_namespace_name();
									return null;
								},
								read_interface_extends_list: function read_interface_extends_list() {
									if (this.token === this.tok.T_EXTENDS) return this.next().read_name_list();
									return null;
								},
								read_implements_list: function read_implements_list() {
									if (this.token === this.tok.T_IMPLEMENTS) return this.next().read_name_list();
									return null;
								}
							};
						},
						1130(module$144) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							module$144.exports = {
								read_variable: function read_variable(read_only, encapsed) {
									var result;
									if (this.token === "&") return this.read_byref(this.read_variable.bind(this, read_only, encapsed));
									if (this.is([this.tok.T_VARIABLE, "$"])) result = this.read_reference_variable(encapsed);
									else if (this.is([
										this.tok.T_NS_SEPARATOR,
										this.tok.T_STRING,
										this.tok.T_NAME_RELATIVE,
										this.tok.T_NAME_QUALIFIED,
										this.tok.T_NAME_FULLY_QUALIFIED,
										this.tok.T_NAMESPACE
									])) {
										result = this.node();
										var name = this.read_namespace_name();
										if (this.token != this.tok.T_DOUBLE_COLON && this.token != "(" && ["parentreference", "selfreference"].indexOf(name.kind) === -1) {
											var literal = name.name.toLowerCase();
											if (literal === "true") result = name.destroy(result("boolean", true, name.name));
											else if (literal === "false") result = name.destroy(result("boolean", false, name.name));
											else if (literal === "null") result = name.destroy(result("nullkeyword", name.name));
											else {
												result.destroy(name);
												result = name;
											}
										} else {
											result.destroy(name);
											result = name;
										}
									} else if (this.token === this.tok.T_STATIC) {
										result = this.node("staticreference");
										var raw = this.text();
										this.next();
										result = result(raw);
									} else this.expect("VARIABLE");
									if (this.token === this.tok.T_DOUBLE_COLON) result = this.read_static_getter(result, encapsed);
									return this.recursive_variable_chain_scan(result, read_only, encapsed);
								},
								read_static_getter: function read_static_getter(what, encapsed) {
									var result = this.node("staticlookup");
									var offset, name;
									if (this.next().is([this.tok.T_VARIABLE, "$"])) offset = this.read_reference_variable(encapsed);
									else if (this.token === this.tok.T_STRING || this.token === this.tok.T_CLASS || this.version >= 700 && this.is("IDENTIFIER")) {
										offset = this.node("identifier");
										name = this.text();
										this.next();
										offset = offset(name);
									} else if (this.token === "{") {
										offset = this.node("literal");
										name = this.next().read_expr();
										this.expect("}") && this.next();
										offset = offset("literal", name, null);
									} else {
										this.error([this.tok.T_VARIABLE, this.tok.T_STRING]);
										offset = this.node("identifier");
										name = this.text();
										this.next();
										offset = offset(name);
									}
									return result(what, offset);
								},
								read_what: function read_what() {
									var is_static_lookup = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
									var what;
									var name;
									switch (this.next().token) {
										case this.tok.T_STRING:
											what = this.node("identifier");
											name = this.text();
											this.next();
											what = what(name);
											if (is_static_lookup && this.token === this.tok.T_OBJECT_OPERATOR) this.error();
											break;
										case this.tok.T_VARIABLE:
											what = this.node("variable");
											name = this.text().substring(1);
											this.next();
											what = what(name, false);
											break;
										case this.tok.T_CLASS:
											if (!is_static_lookup) this.error();
											what = this.node("identifier");
											name = this.text();
											this.next();
											what = what(name, false);
											break;
										case "$":
											what = this.node();
											this.next().expect([
												"$",
												"{",
												this.tok.T_VARIABLE
											]);
											if (this.token === "{") {
												name = this.next().read_expr();
												this.expect("}") && this.next();
												what = what("variable", name, true);
											} else {
												name = this.read_expr();
												what = what("variable", name, false);
											}
											break;
										case "{":
											what = this.node("encapsedpart");
											name = this.next().read_expr();
											this.expect("}") && this.next();
											what = what(name, "complex", false);
											break;
										default:
											this.error([
												this.tok.T_STRING,
												this.tok.T_VARIABLE,
												"$",
												"{"
											]);
											what = this.node("identifier");
											name = this.text();
											this.next();
											what = what(name);
											break;
									}
									return what;
								},
								recursive_variable_chain_scan: function recursive_variable_chain_scan(result, read_only, encapsed) {
									var node, offset;
									recursive_scan_loop: while (this.token != this.EOF) switch (this.token) {
										case "(":
											if (read_only) return result;
											else result = this.node("call")(result, this.read_argument_list());
											break;
										case "[":
										case "{":
											var isSquareBracket = this.token === "[";
											node = this.node("offsetlookup");
											this.next();
											offset = false;
											if (encapsed) {
												offset = this.read_encaps_var_offset();
												this.expect(isSquareBracket ? "]" : "}") && this.next();
											} else if (isSquareBracket ? this.token !== "]" : this.token !== "}") {
												offset = this.read_expr();
												this.expect(isSquareBracket ? "]" : "}") && this.next();
											} else this.next();
											result = node(result, offset);
											break;
										case this.tok.T_DOUBLE_COLON:
											if (result.kind === "staticlookup" && result.offset.kind === "identifier") this.error();
											node = this.node("staticlookup");
											result = node(result, this.read_what(true));
											break;
										case this.tok.T_OBJECT_OPERATOR:
											node = this.node("propertylookup");
											result = node(result, this.read_what());
											break;
										case this.tok.T_NULLSAFE_OBJECT_OPERATOR:
											node = this.node("nullsafepropertylookup");
											result = node(result, this.read_what());
											break;
										default: break recursive_scan_loop;
									}
									return result;
								},
								read_encaps_var_offset: function read_encaps_var_offset() {
									var offset = this.node();
									if (this.token === this.tok.T_STRING) {
										var text = this.text();
										this.next();
										offset = offset("identifier", text);
									} else if (this.token === this.tok.T_NUM_STRING) {
										var num = this.text();
										this.next();
										offset = offset("number", num, null);
									} else if (this.token === "-") {
										this.next();
										var _num = -1 * this.text();
										this.expect(this.tok.T_NUM_STRING) && this.next();
										offset = offset("number", _num, null);
									} else if (this.token === this.tok.T_VARIABLE) {
										var name = this.text().substring(1);
										this.next();
										offset = offset("variable", name, false);
									} else {
										this.expect([
											this.tok.T_STRING,
											this.tok.T_NUM_STRING,
											"-",
											this.tok.T_VARIABLE
										]);
										var _text = this.text();
										this.next();
										offset = offset("identifier", _text);
									}
									return offset;
								},
								read_reference_variable: function read_reference_variable(encapsed) {
									var result = this.read_simple_variable();
									var offset;
									while (this.token != this.EOF) {
										var node = this.node();
										if (this.token == "{" && !encapsed) {
											offset = this.next().read_expr();
											this.expect("}") && this.next();
											result = node("offsetlookup", result, offset);
										} else {
											node.destroy();
											break;
										}
									}
									return result;
								},
								read_simple_variable: function read_simple_variable() {
									var result = this.node("variable");
									var name;
									if (this.expect([this.tok.T_VARIABLE, "$"]) && this.token === this.tok.T_VARIABLE) {
										name = this.text().substring(1);
										this.next();
										result = result(name, false);
									} else {
										if (this.token === "$") this.next();
										switch (this.token) {
											case "{":
												var expr = this.next().read_expr();
												this.expect("}") && this.next();
												result = result(expr, true);
												break;
											case "$":
												result = result(this.read_simple_variable(), false);
												break;
											case this.tok.T_VARIABLE:
												name = this.text().substring(1);
												var node = this.node("variable");
												this.next();
												result = result(node(name, false), false);
												break;
											default:
												this.error([
													"{",
													"$",
													this.tok.T_VARIABLE
												]);
												name = this.text();
												this.next();
												result = result(name, false);
										}
									}
									return result;
								}
							};
						},
						1906(module$145) {
							/**
							* Copyright (C) 2018 Glayzzle (BSD3 License)
							* @authors https://github.com/glayzzle/php-parser/graphs/contributors
							* @url http://glayzzle.com
							*/
							/**
							* @readonly
							* @memberOf module:php-parser
							*
							* @enum {number}
							**/
							function _typeof(o) {
								"@babel/helpers - typeof";
								return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
									return typeof o;
								} : function(o) {
									return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
								}, _typeof(o);
							}
							function ownKeys(e, r) {
								var t = Object.keys(e);
								if (Object.getOwnPropertySymbols) {
									var o = Object.getOwnPropertySymbols(e);
									r && (o = o.filter(function(r) {
										return Object.getOwnPropertyDescriptor(e, r).enumerable;
									})), t.push.apply(t, o);
								}
								return t;
							}
							function _objectSpread(e) {
								for (var r = 1; r < arguments.length; r++) {
									var t = null != arguments[r] ? arguments[r] : {};
									r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
										_defineProperty(e, r, t[r]);
									}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
										Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
									});
								}
								return e;
							}
							function _defineProperty(e, r, t) {
								return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
									value: t,
									enumerable: !0,
									configurable: !0,
									writable: !0
								}) : e[r] = t, e;
							}
							function _toPropertyKey(t) {
								var i = _toPrimitive(t, "string");
								return "symbol" == _typeof(i) ? i : i + "";
							}
							function _toPrimitive(t, r) {
								if ("object" != _typeof(t) || !t) return t;
								var e = t[Symbol.toPrimitive];
								if (void 0 !== e) {
									var i = e.call(t, r || "default");
									if ("object" != _typeof(i)) return i;
									throw new TypeError("@@toPrimitive must return a primitive value.");
								}
								return ("string" === r ? String : Number)(t);
							}
							function _slicedToArray(r, e) {
								return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
							}
							function _nonIterableRest() {
								throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
							}
							function _unsupportedIterableToArray(r, a) {
								if (r) {
									if ("string" == typeof r) return _arrayLikeToArray(r, a);
									var t = {}.toString.call(r).slice(8, -1);
									return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
								}
							}
							function _arrayLikeToArray(r, a) {
								(null == a || a > r.length) && (a = r.length);
								for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
								return n;
							}
							function _iterableToArrayLimit(r, l) {
								var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
								if (null != t) {
									var e, n, i, u, a = [], f = !0, o = !1;
									try {
										if (i = (t = t.call(r)).next, 0 === l) {
											if (Object(t) !== t) return;
											f = !1;
										} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
									} catch (r) {
										o = !0, n = r;
									} finally {
										try {
											if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
										} finally {
											if (o) throw n;
										}
									}
									return a;
								}
							}
							function _arrayWithHoles(r) {
								if (Array.isArray(r)) return r;
							}
							var TokenNames = {
								T_HALT_COMPILER: 101,
								T_USE: 102,
								T_ENCAPSED_AND_WHITESPACE: 103,
								T_OBJECT_OPERATOR: 104,
								T_STRING: 105,
								T_DOLLAR_OPEN_CURLY_BRACES: 106,
								T_STRING_VARNAME: 107,
								T_CURLY_OPEN: 108,
								T_NUM_STRING: 109,
								T_ISSET: 110,
								T_EMPTY: 111,
								T_INCLUDE: 112,
								T_INCLUDE_ONCE: 113,
								T_EVAL: 114,
								T_REQUIRE: 115,
								T_REQUIRE_ONCE: 116,
								T_NAMESPACE: 117,
								T_NS_SEPARATOR: 118,
								T_AS: 119,
								T_IF: 120,
								T_ENDIF: 121,
								T_WHILE: 122,
								T_DO: 123,
								T_FOR: 124,
								T_SWITCH: 125,
								T_BREAK: 126,
								T_CONTINUE: 127,
								T_RETURN: 128,
								T_GLOBAL: 129,
								T_STATIC: 130,
								T_ECHO: 131,
								T_INLINE_HTML: 132,
								T_UNSET: 133,
								T_FOREACH: 134,
								T_DECLARE: 135,
								T_TRY: 136,
								T_THROW: 137,
								T_GOTO: 138,
								T_FINALLY: 139,
								T_CATCH: 140,
								T_ENDDECLARE: 141,
								T_LIST: 142,
								T_CLONE: 143,
								T_PLUS_EQUAL: 144,
								T_MINUS_EQUAL: 145,
								T_MUL_EQUAL: 146,
								T_DIV_EQUAL: 147,
								T_CONCAT_EQUAL: 148,
								T_MOD_EQUAL: 149,
								T_AND_EQUAL: 150,
								T_OR_EQUAL: 151,
								T_XOR_EQUAL: 152,
								T_SL_EQUAL: 153,
								T_SR_EQUAL: 154,
								T_INC: 155,
								T_DEC: 156,
								T_BOOLEAN_OR: 157,
								T_BOOLEAN_AND: 158,
								T_LOGICAL_OR: 159,
								T_LOGICAL_AND: 160,
								T_LOGICAL_XOR: 161,
								T_SL: 162,
								T_SR: 163,
								T_IS_IDENTICAL: 164,
								T_IS_NOT_IDENTICAL: 165,
								T_IS_EQUAL: 166,
								T_IS_NOT_EQUAL: 167,
								T_IS_SMALLER_OR_EQUAL: 168,
								T_IS_GREATER_OR_EQUAL: 169,
								T_INSTANCEOF: 170,
								T_INT_CAST: 171,
								T_DOUBLE_CAST: 172,
								T_STRING_CAST: 173,
								T_ARRAY_CAST: 174,
								T_OBJECT_CAST: 175,
								T_BOOL_CAST: 176,
								T_UNSET_CAST: 177,
								T_EXIT: 178,
								T_PRINT: 179,
								T_YIELD: 180,
								T_YIELD_FROM: 181,
								T_FUNCTION: 182,
								T_DOUBLE_ARROW: 183,
								T_DOUBLE_COLON: 184,
								T_ARRAY: 185,
								T_CALLABLE: 186,
								T_CLASS: 187,
								T_ABSTRACT: 188,
								T_TRAIT: 189,
								T_FINAL: 190,
								T_EXTENDS: 191,
								T_INTERFACE: 192,
								T_IMPLEMENTS: 193,
								T_VAR: 194,
								T_PUBLIC: 195,
								T_PROTECTED: 196,
								T_PRIVATE: 197,
								T_CONST: 198,
								T_NEW: 199,
								T_INSTEADOF: 200,
								T_ELSEIF: 201,
								T_ELSE: 202,
								T_ENDSWITCH: 203,
								T_CASE: 204,
								T_DEFAULT: 205,
								T_ENDFOR: 206,
								T_ENDFOREACH: 207,
								T_ENDWHILE: 208,
								T_CONSTANT_ENCAPSED_STRING: 209,
								T_LNUMBER: 210,
								T_DNUMBER: 211,
								T_LINE: 212,
								T_FILE: 213,
								T_DIR: 214,
								T_TRAIT_C: 215,
								T_METHOD_C: 216,
								T_FUNC_C: 217,
								T_NS_C: 218,
								T_START_HEREDOC: 219,
								T_END_HEREDOC: 220,
								T_CLASS_C: 221,
								T_VARIABLE: 222,
								T_OPEN_TAG: 223,
								T_OPEN_TAG_WITH_ECHO: 224,
								T_CLOSE_TAG: 225,
								T_WHITESPACE: 226,
								T_COMMENT: 227,
								T_DOC_COMMENT: 228,
								T_ELLIPSIS: 229,
								T_COALESCE: 230,
								T_POW: 231,
								T_POW_EQUAL: 232,
								T_SPACESHIP: 233,
								T_COALESCE_EQUAL: 234,
								T_FN: 235,
								T_NULLSAFE_OBJECT_OPERATOR: 236,
								T_MATCH: 237,
								T_ATTRIBUTE: 238,
								T_ENUM: 239,
								T_READ_ONLY: 240,
								T_NAME_RELATIVE: 241,
								T_NAME_QUALIFIED: 242,
								T_NAME_FULLY_QUALIFIED: 243,
								T_PIPE: 244
							};
							/**
							* PHP AST Tokens
							* @readonly
							* @memberOf module:php-parser
							*
							* @type {object}
							* @property {Object.<number, string>} values
							* @property {TokenNames} names
							*/
							var tokens = {
								values: Object.entries(TokenNames).reduce(function(result, _ref) {
									var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
									return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, value, key));
								}, {}),
								names: TokenNames
							};
							module$145.exports = Object.freeze(tokens);
						}
					};
					var __webpack_module_cache__ = {};
					function __webpack_require__(moduleId) {
						var cachedModule = __webpack_module_cache__[moduleId];
						if (cachedModule !== void 0) return cachedModule.exports;
						var module$146 = __webpack_module_cache__[moduleId] = { exports: {} };
						__webpack_modules__[moduleId](module$146, module$146.exports, __webpack_require__);
						return module$146.exports;
					}
					var __webpack_exports__ = __webpack_require__(5362);
					__webpack_exports__ = __webpack_exports__["default"];
					return __webpack_exports__;
				})();
			});
		})))());
		function toDiagnostics(errors) {
			if (!errors) return [];
			return errors.map((el) => {
				let line;
				if (el.line) if (el.line > 0) line = el.line - 1;
				else line = el.line;
				else line = 0;
				let startLine = line;
				let startColumn = 0;
				let endLine = line;
				let endColumn = 0;
				if (el.loc) if (el.loc.start.offset > el.loc.end.offset) {
					startLine = el.loc.end.line - 1;
					startColumn = el.loc.end.column;
					endLine = el.loc.start.line - 1;
					endColumn = el.loc.start.column;
				} else {
					startLine = el.loc.start.line - 1;
					startColumn = el.loc.start.column;
					endLine = el.loc.end.line - 1;
					endColumn = el.loc.end.column;
				}
				return {
					range: {
						start: {
							line: startLine,
							character: startColumn
						},
						end: {
							line: endLine,
							character: endColumn
						}
					},
					message: el.message,
					severity: 1,
					source: "php-parser"
				};
			});
		}
		var PhpService = class extends BaseService {
			constructor(mode) {
				super(mode);
				this.serviceCapabilities = { diagnosticProvider: {
					interFileDependencies: true,
					workspaceDiagnostics: true
				} };
				this.parser = new import_php_parser.default({
					parser: {
						extractDoc: false,
						suppressErrors: true
					},
					ast: {
						withPositions: false,
						withSource: false
					},
					lexer: {
						all_tokens: false,
						comment_tokens: false,
						mode_eval: false,
						asp_tags: false,
						short_tags: true
					}
				});
			}
			async doValidation(document) {
				let value = this.getDocumentValue(document.uri);
				if (!value) return [];
				const inline = !!this.getOption(document.uri, "inline");
				try {
					let result;
					if (inline) result = this.parser.parseEval(value);
					else result = this.parser.parseCode(value, document.uri);
					return filterDiagnostics(toDiagnostics(result?.errors ?? []), this.optionsToFilterDiagnostics);
				} catch (e) {
					console.error(e);
					return [];
				}
			}
		};
		exports$1.PhpService = PhpService;
	});
}));
//#endregion
export default require_php_service();
