(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
})(this, (function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  function getDefaultExportFromCjs$1(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        var isInstance = false;
        try {
          isInstance = this instanceof a2;
        } catch {
        }
        if (isInstance) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var main$2 = {};
  var main$1 = {};
  var ril = {};
  var api$1 = {};
  var messages$1 = {};
  var is$1 = {};
  var hasRequiredIs$1;
  function requireIs$1() {
    if (hasRequiredIs$1) return is$1;
    hasRequiredIs$1 = 1;
    Object.defineProperty(is$1, "__esModule", { value: true });
    is$1.stringArray = is$1.array = is$1.func = is$1.error = is$1.number = is$1.string = is$1.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    is$1.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    is$1.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    is$1.number = number;
    function error(value) {
      return value instanceof Error;
    }
    is$1.error = error;
    function func(value) {
      return typeof value === "function";
    }
    is$1.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    is$1.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    is$1.stringArray = stringArray;
    return is$1;
  }
  var hasRequiredMessages$1;
  function requireMessages$1() {
    if (hasRequiredMessages$1) return messages$1;
    hasRequiredMessages$1 = 1;
    Object.defineProperty(messages$1, "__esModule", { value: true });
    messages$1.Message = messages$1.NotificationType9 = messages$1.NotificationType8 = messages$1.NotificationType7 = messages$1.NotificationType6 = messages$1.NotificationType5 = messages$1.NotificationType4 = messages$1.NotificationType3 = messages$1.NotificationType2 = messages$1.NotificationType1 = messages$1.NotificationType0 = messages$1.NotificationType = messages$1.RequestType9 = messages$1.RequestType8 = messages$1.RequestType7 = messages$1.RequestType6 = messages$1.RequestType5 = messages$1.RequestType4 = messages$1.RequestType3 = messages$1.RequestType2 = messages$1.RequestType1 = messages$1.RequestType = messages$1.RequestType0 = messages$1.AbstractMessageSignature = messages$1.ParameterStructures = messages$1.ResponseError = messages$1.ErrorCodes = void 0;
    const is2 = requireIs$1();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.PendingResponseRejected = -32097;
      ErrorCodes2.ConnectionInactive = -32096;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = -32e3;
    })(ErrorCodes || (messages$1.ErrorCodes = ErrorCodes = {}));
    class ResponseError extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is2.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
      }
      toJson() {
        const result = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          result.data = this.data;
        }
        return result;
      }
    }
    messages$1.ResponseError = ResponseError;
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
    messages$1.ParameterStructures = ParameterStructures;
    ParameterStructures.auto = new ParameterStructures("auto");
    ParameterStructures.byPosition = new ParameterStructures("byPosition");
    ParameterStructures.byName = new ParameterStructures("byName");
    class AbstractMessageSignature {
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    }
    messages$1.AbstractMessageSignature = AbstractMessageSignature;
    class RequestType0 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    }
    messages$1.RequestType0 = RequestType0;
    class RequestType extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    }
    messages$1.RequestType = RequestType;
    class RequestType1 extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    }
    messages$1.RequestType1 = RequestType1;
    class RequestType2 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    }
    messages$1.RequestType2 = RequestType2;
    class RequestType3 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    }
    messages$1.RequestType3 = RequestType3;
    class RequestType4 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    }
    messages$1.RequestType4 = RequestType4;
    class RequestType5 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    }
    messages$1.RequestType5 = RequestType5;
    class RequestType6 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    }
    messages$1.RequestType6 = RequestType6;
    class RequestType7 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    }
    messages$1.RequestType7 = RequestType7;
    class RequestType8 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    }
    messages$1.RequestType8 = RequestType8;
    class RequestType9 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    }
    messages$1.RequestType9 = RequestType9;
    class NotificationType extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    }
    messages$1.NotificationType = NotificationType;
    class NotificationType0 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    }
    messages$1.NotificationType0 = NotificationType0;
    class NotificationType1 extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    }
    messages$1.NotificationType1 = NotificationType1;
    class NotificationType2 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    }
    messages$1.NotificationType2 = NotificationType2;
    class NotificationType3 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    }
    messages$1.NotificationType3 = NotificationType3;
    class NotificationType4 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    }
    messages$1.NotificationType4 = NotificationType4;
    class NotificationType5 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    }
    messages$1.NotificationType5 = NotificationType5;
    class NotificationType6 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    }
    messages$1.NotificationType6 = NotificationType6;
    class NotificationType7 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    }
    messages$1.NotificationType7 = NotificationType7;
    class NotificationType8 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    }
    messages$1.NotificationType8 = NotificationType8;
    class NotificationType9 extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    }
    messages$1.NotificationType9 = NotificationType9;
    var Message;
    (function(Message2) {
      function isRequest(message) {
        const candidate = message;
        return candidate && is2.string(candidate.method) && (is2.string(candidate.id) || is2.number(candidate.id));
      }
      Message2.isRequest = isRequest;
      function isNotification(message) {
        const candidate = message;
        return candidate && is2.string(candidate.method) && message.id === void 0;
      }
      Message2.isNotification = isNotification;
      function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is2.string(candidate.id) || is2.number(candidate.id) || candidate.id === null);
      }
      Message2.isResponse = isResponse;
    })(Message || (messages$1.Message = Message = {}));
    return messages$1;
  }
  var linkedMap = {};
  var hasRequiredLinkedMap;
  function requireLinkedMap() {
    if (hasRequiredLinkedMap) return linkedMap;
    hasRequiredLinkedMap = 1;
    var _a;
    Object.defineProperty(linkedMap, "__esModule", { value: true });
    linkedMap.LRUCache = linkedMap.LinkedMap = linkedMap.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch || (linkedMap.Touch = Touch = {}));
    class LinkedMap {
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
        var _a2;
        return (_a2 = this._head) == null ? void 0 : _a2.value;
      }
      get last() {
        var _a2;
        return (_a2 = this._tail) == null ? void 0 : _a2.value;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
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
        } else {
          item = { key, value, next: void 0, previous: void 0 };
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
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
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
          } else {
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
            } else {
              return { value: void 0, done: true };
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
            } else {
              return { value: void 0, done: true };
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
            } else {
              return { value: void 0, done: true };
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
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
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
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
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
          if (item === this._tail) {
            return;
          }
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
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    }
    linkedMap.LinkedMap = LinkedMap;
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
    linkedMap.LRUCache = LRUCache;
    return linkedMap;
  }
  var disposable = {};
  var hasRequiredDisposable;
  function requireDisposable() {
    if (hasRequiredDisposable) return disposable;
    hasRequiredDisposable = 1;
    Object.defineProperty(disposable, "__esModule", { value: true });
    disposable.Disposable = void 0;
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable || (disposable.Disposable = Disposable = {}));
    return disposable;
  }
  var events = {};
  var ral = {};
  var hasRequiredRal;
  function requireRal() {
    if (hasRequiredRal) return ral;
    hasRequiredRal = 1;
    Object.defineProperty(ral, "__esModule", { value: true });
    let _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral2) {
        if (ral2 === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral2;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    ral.default = RAL;
    return ral;
  }
  var hasRequiredEvents;
  function requireEvents() {
    if (hasRequiredEvents) return events;
    hasRequiredEvents = 1;
    Object.defineProperty(events, "__esModule", { value: true });
    events.Emitter = events.Event = void 0;
    const ral_1 = requireRal();
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event || (events.Event = Event = {}));
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
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
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
          } catch (e) {
            (0, ral_1.default)().console.error(e);
          }
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
          this._callbacks = void 0;
        }
      }
    }
    events.Emitter = Emitter;
    Emitter._noop = function() {
    };
    return events;
  }
  var cancellation = {};
  var hasRequiredCancellation;
  function requireCancellation() {
    if (hasRequiredCancellation) return cancellation;
    hasRequiredCancellation = 1;
    Object.defineProperty(cancellation, "__esModule", { value: true });
    cancellation.CancellationTokenSource = cancellation.CancellationToken = void 0;
    const ral_1 = requireRal();
    const Is2 = requireIs$1();
    const events_1 = requireEvents();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is2(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is2.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is2;
    })(CancellationToken || (cancellation.CancellationToken = CancellationToken = {}));
    const shortcutEvent = Object.freeze(function(callback, context) {
      const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        handle.dispose();
      } };
    });
    class MutableToken {
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
          this._emitter = void 0;
        }
      }
    }
    class CancellationTokenSource {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    }
    cancellation.CancellationTokenSource = CancellationTokenSource;
    return cancellation;
  }
  var sharedArrayCancellation = {};
  var hasRequiredSharedArrayCancellation;
  function requireSharedArrayCancellation() {
    if (hasRequiredSharedArrayCancellation) return sharedArrayCancellation;
    hasRequiredSharedArrayCancellation = 1;
    Object.defineProperty(sharedArrayCancellation, "__esModule", { value: true });
    sharedArrayCancellation.SharedArrayReceiverStrategy = sharedArrayCancellation.SharedArraySenderStrategy = void 0;
    const cancellation_1 = requireCancellation();
    var CancellationState;
    (function(CancellationState2) {
      CancellationState2.Continue = 0;
      CancellationState2.Cancelled = 1;
    })(CancellationState || (CancellationState = {}));
    class SharedArraySenderStrategy {
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
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
        if (buffer === void 0) {
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
    sharedArrayCancellation.SharedArraySenderStrategy = SharedArraySenderStrategy;
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
        this.kind = "request";
      }
      createCancellationTokenSource(request) {
        const buffer = request.$cancellationData;
        if (buffer === void 0) {
          return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
      }
    }
    sharedArrayCancellation.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
    return sharedArrayCancellation;
  }
  var messageReader = {};
  var semaphore = {};
  var hasRequiredSemaphore;
  function requireSemaphore() {
    if (hasRequiredSemaphore) return semaphore;
    hasRequiredSemaphore = 1;
    Object.defineProperty(semaphore, "__esModule", { value: true });
    semaphore.Semaphore = void 0;
    const ral_1 = requireRal();
    class Semaphore {
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
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
          } else {
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
    }
    semaphore.Semaphore = Semaphore;
    return semaphore;
  }
  var hasRequiredMessageReader;
  function requireMessageReader() {
    if (hasRequiredMessageReader) return messageReader;
    hasRequiredMessageReader = 1;
    Object.defineProperty(messageReader, "__esModule", { value: true });
    messageReader.ReadableStreamMessageReader = messageReader.AbstractMessageReader = messageReader.MessageReader = void 0;
    const ral_1 = requireRal();
    const Is2 = requireIs$1();
    const events_1 = requireEvents();
    const semaphore_1 = requireSemaphore();
    var MessageReader;
    (function(MessageReader2) {
      function is2(value) {
        let candidate = value;
        return candidate && Is2.func(candidate.listen) && Is2.func(candidate.dispose) && Is2.func(candidate.onError) && Is2.func(candidate.onClose) && Is2.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is2;
    })(MessageReader || (messageReader.MessageReader = MessageReader = {}));
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
        this.closeEmitter.fire(void 0);
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
        } else {
          return new Error(`Reader received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    }
    messageReader.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        let charset;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options ?? "utf-8";
        } else {
          charset = options.charset ?? "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    class ReadableStreamMessageReader extends AbstractMessageReader {
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
              if (!headers) {
                return;
              }
              const contentLength = headers.get("content-length");
              if (!contentLength) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
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
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    }
    messageReader.ReadableStreamMessageReader = ReadableStreamMessageReader;
    return messageReader;
  }
  var messageWriter = {};
  var hasRequiredMessageWriter;
  function requireMessageWriter() {
    if (hasRequiredMessageWriter) return messageWriter;
    hasRequiredMessageWriter = 1;
    Object.defineProperty(messageWriter, "__esModule", { value: true });
    messageWriter.WriteableStreamMessageWriter = messageWriter.AbstractMessageWriter = messageWriter.MessageWriter = void 0;
    const ral_1 = requireRal();
    const Is2 = requireIs$1();
    const semaphore_1 = requireSemaphore();
    const events_1 = requireEvents();
    const ContentLength = "Content-Length: ";
    const CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is2(value) {
        let candidate = value;
        return candidate && Is2.func(candidate.dispose) && Is2.func(candidate.onClose) && Is2.func(candidate.onError) && Is2.func(candidate.write);
      }
      MessageWriter2.is = is2;
    })(MessageWriter || (messageWriter.MessageWriter = MessageWriter = {}));
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
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    }
    messageWriter.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        if (options === void 0 || typeof options === "string") {
          return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        } else {
          return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
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
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
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
    }
    messageWriter.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
    return messageWriter;
  }
  var messageBuffer = {};
  var hasRequiredMessageBuffer;
  function requireMessageBuffer() {
    if (hasRequiredMessageBuffer) return messageBuffer;
    hasRequiredMessageBuffer = 1;
    Object.defineProperty(messageBuffer, "__esModule", { value: true });
    messageBuffer.AbstractMessageBuffer = void 0;
    const CR = 13;
    const LF = 10;
    const CRLF = "\r\n";
    class AbstractMessageBuffer {
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
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          while (offset < chunk.length) {
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
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error(`Message header must separate key and value using ':'
${header}`);
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
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
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
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
    }
    messageBuffer.AbstractMessageBuffer = AbstractMessageBuffer;
    return messageBuffer;
  }
  var connection$1 = {};
  var hasRequiredConnection$1;
  function requireConnection$1() {
    if (hasRequiredConnection$1) return connection$1;
    hasRequiredConnection$1 = 1;
    (function(exports$1) {
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.createMessageConnection = exports$1.ConnectionOptions = exports$1.MessageStrategy = exports$1.CancellationStrategy = exports$1.CancellationSenderStrategy = exports$1.CancellationReceiverStrategy = exports$1.RequestCancellationReceiverStrategy = exports$1.IdCancellationReceiverStrategy = exports$1.ConnectionStrategy = exports$1.ConnectionError = exports$1.ConnectionErrors = exports$1.LogTraceNotification = exports$1.SetTraceNotification = exports$1.TraceFormat = exports$1.TraceValues = exports$1.Trace = exports$1.NullLogger = exports$1.ProgressType = exports$1.ProgressToken = void 0;
      const ral_1 = requireRal();
      const Is2 = requireIs$1();
      const messages_1 = requireMessages$1();
      const linkedMap_1 = requireLinkedMap();
      const events_1 = requireEvents();
      const cancellation_1 = requireCancellation();
      var CancelNotification;
      (function(CancelNotification2) {
        CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
      })(CancelNotification || (CancelNotification = {}));
      var ProgressToken;
      (function(ProgressToken2) {
        function is2(value) {
          return typeof value === "string" || typeof value === "number";
        }
        ProgressToken2.is = is2;
      })(ProgressToken || (exports$1.ProgressToken = ProgressToken = {}));
      var ProgressNotification;
      (function(ProgressNotification2) {
        ProgressNotification2.type = new messages_1.NotificationType("$/progress");
      })(ProgressNotification || (ProgressNotification = {}));
      class ProgressType {
        constructor() {
        }
      }
      exports$1.ProgressType = ProgressType;
      var StarRequestHandler;
      (function(StarRequestHandler2) {
        function is2(value) {
          return Is2.func(value);
        }
        StarRequestHandler2.is = is2;
      })(StarRequestHandler || (StarRequestHandler = {}));
      exports$1.NullLogger = Object.freeze({
        error: () => {
        },
        warn: () => {
        },
        info: () => {
        },
        log: () => {
        }
      });
      var Trace;
      (function(Trace2) {
        Trace2[Trace2["Off"] = 0] = "Off";
        Trace2[Trace2["Messages"] = 1] = "Messages";
        Trace2[Trace2["Compact"] = 2] = "Compact";
        Trace2[Trace2["Verbose"] = 3] = "Verbose";
      })(Trace || (exports$1.Trace = Trace = {}));
      var TraceValues;
      (function(TraceValues2) {
        TraceValues2.Off = "off";
        TraceValues2.Messages = "messages";
        TraceValues2.Compact = "compact";
        TraceValues2.Verbose = "verbose";
      })(TraceValues || (exports$1.TraceValues = TraceValues = {}));
      (function(Trace2) {
        function fromString(value) {
          if (!Is2.string(value)) {
            return Trace2.Off;
          }
          value = value.toLowerCase();
          switch (value) {
            case "off":
              return Trace2.Off;
            case "messages":
              return Trace2.Messages;
            case "compact":
              return Trace2.Compact;
            case "verbose":
              return Trace2.Verbose;
            default:
              return Trace2.Off;
          }
        }
        Trace2.fromString = fromString;
        function toString(value) {
          switch (value) {
            case Trace2.Off:
              return "off";
            case Trace2.Messages:
              return "messages";
            case Trace2.Compact:
              return "compact";
            case Trace2.Verbose:
              return "verbose";
            default:
              return "off";
          }
        }
        Trace2.toString = toString;
      })(Trace || (exports$1.Trace = Trace = {}));
      var TraceFormat;
      (function(TraceFormat2) {
        TraceFormat2["Text"] = "text";
        TraceFormat2["JSON"] = "json";
      })(TraceFormat || (exports$1.TraceFormat = TraceFormat = {}));
      (function(TraceFormat2) {
        function fromString(value) {
          if (!Is2.string(value)) {
            return TraceFormat2.Text;
          }
          value = value.toLowerCase();
          if (value === "json") {
            return TraceFormat2.JSON;
          } else {
            return TraceFormat2.Text;
          }
        }
        TraceFormat2.fromString = fromString;
      })(TraceFormat || (exports$1.TraceFormat = TraceFormat = {}));
      var SetTraceNotification;
      (function(SetTraceNotification2) {
        SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
      })(SetTraceNotification || (exports$1.SetTraceNotification = SetTraceNotification = {}));
      var LogTraceNotification;
      (function(LogTraceNotification2) {
        LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
      })(LogTraceNotification || (exports$1.LogTraceNotification = LogTraceNotification = {}));
      var ConnectionErrors;
      (function(ConnectionErrors2) {
        ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
        ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
        ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
      })(ConnectionErrors || (exports$1.ConnectionErrors = ConnectionErrors = {}));
      class ConnectionError extends Error {
        constructor(code, message) {
          super(message);
          this.code = code;
          Object.setPrototypeOf(this, ConnectionError.prototype);
        }
      }
      exports$1.ConnectionError = ConnectionError;
      var ConnectionStrategy;
      (function(ConnectionStrategy2) {
        function is2(value) {
          const candidate = value;
          return candidate && Is2.func(candidate.cancelUndispatched);
        }
        ConnectionStrategy2.is = is2;
      })(ConnectionStrategy || (exports$1.ConnectionStrategy = ConnectionStrategy = {}));
      var IdCancellationReceiverStrategy;
      (function(IdCancellationReceiverStrategy2) {
        function is2(value) {
          const candidate = value;
          return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is2.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is2.func(candidate.dispose));
        }
        IdCancellationReceiverStrategy2.is = is2;
      })(IdCancellationReceiverStrategy || (exports$1.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
      var RequestCancellationReceiverStrategy;
      (function(RequestCancellationReceiverStrategy2) {
        function is2(value) {
          const candidate = value;
          return candidate && candidate.kind === "request" && Is2.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is2.func(candidate.dispose));
        }
        RequestCancellationReceiverStrategy2.is = is2;
      })(RequestCancellationReceiverStrategy || (exports$1.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
      var CancellationReceiverStrategy;
      (function(CancellationReceiverStrategy2) {
        CancellationReceiverStrategy2.Message = Object.freeze({
          createCancellationTokenSource(_) {
            return new cancellation_1.CancellationTokenSource();
          }
        });
        function is2(value) {
          return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
        }
        CancellationReceiverStrategy2.is = is2;
      })(CancellationReceiverStrategy || (exports$1.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
      var CancellationSenderStrategy;
      (function(CancellationSenderStrategy2) {
        CancellationSenderStrategy2.Message = Object.freeze({
          sendCancellation(conn, id) {
            return conn.sendNotification(CancelNotification.type, { id });
          },
          cleanup(_) {
          }
        });
        function is2(value) {
          const candidate = value;
          return candidate && Is2.func(candidate.sendCancellation) && Is2.func(candidate.cleanup);
        }
        CancellationSenderStrategy2.is = is2;
      })(CancellationSenderStrategy || (exports$1.CancellationSenderStrategy = CancellationSenderStrategy = {}));
      var CancellationStrategy;
      (function(CancellationStrategy2) {
        CancellationStrategy2.Message = Object.freeze({
          receiver: CancellationReceiverStrategy.Message,
          sender: CancellationSenderStrategy.Message
        });
        function is2(value) {
          const candidate = value;
          return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
        }
        CancellationStrategy2.is = is2;
      })(CancellationStrategy || (exports$1.CancellationStrategy = CancellationStrategy = {}));
      var MessageStrategy;
      (function(MessageStrategy2) {
        function is2(value) {
          const candidate = value;
          return candidate && Is2.func(candidate.handleMessage);
        }
        MessageStrategy2.is = is2;
      })(MessageStrategy || (exports$1.MessageStrategy = MessageStrategy = {}));
      var ConnectionOptions;
      (function(ConnectionOptions2) {
        function is2(value) {
          const candidate = value;
          return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
        }
        ConnectionOptions2.is = is2;
      })(ConnectionOptions || (exports$1.ConnectionOptions = ConnectionOptions = {}));
      var ConnectionState;
      (function(ConnectionState2) {
        ConnectionState2[ConnectionState2["New"] = 1] = "New";
        ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
        ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
        ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
      })(ConnectionState || (ConnectionState = {}));
      function createMessageConnection(messageReader2, messageWriter2, _logger, options) {
        const logger = _logger !== void 0 ? _logger : exports$1.NullLogger;
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
          if (id === null) {
            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
          }
          return "req-" + id.toString();
        }
        function createResponseQueueKey(id) {
          if (id === null) {
            return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
          } else {
            return "res-" + id.toString();
          }
        }
        function createNotificationQueueKey() {
          return "not-" + (++notificationSequenceNumber).toString();
        }
        function addMessageToQueue(queue2, message) {
          if (messages_1.Message.isRequest(message)) {
            queue2.set(createRequestQueueKey(message.id), message);
          } else if (messages_1.Message.isResponse(message)) {
            queue2.set(createResponseQueueKey(message.id), message);
          } else {
            queue2.set(createNotificationQueueKey(), message);
          }
        }
        function cancelUndispatched(_message) {
          return void 0;
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
            closeEmitter.fire(void 0);
          }
        }
        function readErrorHandler(error) {
          errorEmitter.fire([error, void 0, void 0]);
        }
        function writeErrorHandler(data) {
          errorEmitter.fire(data);
        }
        messageReader2.onClose(closeHandler);
        messageReader2.onError(readErrorHandler);
        messageWriter2.onClose(closeHandler);
        messageWriter2.onError(writeErrorHandler);
        function triggerMessageQueue() {
          if (timer || messageQueue.size === 0) {
            return;
          }
          timer = (0, ral_1.default)().timer.setImmediate(() => {
            timer = void 0;
            processMessageQueue();
          });
        }
        function handleMessage(message) {
          if (messages_1.Message.isRequest(message)) {
            handleRequest(message);
          } else if (messages_1.Message.isNotification(message)) {
            handleNotification(message);
          } else if (messages_1.Message.isResponse(message)) {
            handleResponse(message);
          } else {
            handleInvalidMessage(message);
          }
        }
        function processMessageQueue() {
          if (messageQueue.size === 0) {
            return;
          }
          const message = messageQueue.shift();
          try {
            const messageStrategy = options == null ? void 0 : options.messageStrategy;
            if (MessageStrategy.is(messageStrategy)) {
              messageStrategy.handleMessage(message, handleMessage);
            } else {
              handleMessage(message);
            }
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
                const strategy = options == null ? void 0 : options.connectionStrategy;
                const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                if (response && (response.error !== void 0 || response.result !== void 0)) {
                  messageQueue.delete(key);
                  requestTokens.delete(cancelId);
                  response.id = toCancel.id;
                  traceSendingResponse(response, message.method, Date.now());
                  messageWriter2.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                  return;
                }
              }
              const cancellationToken = requestTokens.get(cancelId);
              if (cancellationToken !== void 0) {
                cancellationToken.cancel();
                traceReceivedNotification(message);
                return;
              } else {
                knownCanceledRequests.add(cancelId);
              }
            }
            addMessageToQueue(messageQueue, message);
          } finally {
            triggerMessageQueue();
          }
        };
        function handleRequest(requestMessage) {
          if (isDisposed()) {
            return;
          }
          function reply(resultOrError, method, startTime2) {
            const message = {
              jsonrpc: version,
              id: requestMessage.id
            };
            if (resultOrError instanceof messages_1.ResponseError) {
              message.error = resultOrError.toJson();
            } else {
              message.result = resultOrError === void 0 ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime2);
            messageWriter2.write(message).catch(() => logger.error(`Sending response failed.`));
          }
          function replyError(error, method, startTime2) {
            const message = {
              jsonrpc: version,
              id: requestMessage.id,
              error: error.toJson()
            };
            traceSendingResponse(message, method, startTime2);
            messageWriter2.write(message).catch(() => logger.error(`Sending response failed.`));
          }
          function replySuccess(result, method, startTime2) {
            if (result === void 0) {
              result = null;
            }
            const message = {
              jsonrpc: version,
              id: requestMessage.id,
              result
            };
            traceSendingResponse(message, method, startTime2);
            messageWriter2.write(message).catch(() => logger.error(`Sending response failed.`));
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
            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
              cancellationSource.cancel();
            }
            if (requestMessage.id !== null) {
              requestTokens.set(tokenKey, cancellationSource);
            }
            try {
              let handlerResult;
              if (requestHandler) {
                if (requestMessage.params === void 0) {
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
              } else if (starRequestHandler) {
                handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
              }
              const promise = handlerResult;
              if (!handlerResult) {
                requestTokens.delete(tokenKey);
                replySuccess(handlerResult, requestMessage.method, startTime);
              } else if (promise.then) {
                promise.then((resultOrError) => {
                  requestTokens.delete(tokenKey);
                  reply(resultOrError, requestMessage.method, startTime);
                }, (error) => {
                  requestTokens.delete(tokenKey);
                  if (error instanceof messages_1.ResponseError) {
                    replyError(error, requestMessage.method, startTime);
                  } else if (error && Is2.string(error.message)) {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                  } else {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                  }
                });
              } else {
                requestTokens.delete(tokenKey);
                reply(handlerResult, requestMessage.method, startTime);
              }
            } catch (error) {
              requestTokens.delete(tokenKey);
              if (error instanceof messages_1.ResponseError) {
                reply(error, requestMessage.method, startTime);
              } else if (error && Is2.string(error.message)) {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
              } else {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
              }
            }
          } else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
          }
        }
        function handleResponse(responseMessage) {
          if (isDisposed()) {
            return;
          }
          if (responseMessage.id === null) {
            if (responseMessage.error) {
              logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
            } else {
              logger.error(`Received response message without id. No further error information provided.`);
            }
          } else {
            const key = responseMessage.id;
            const responsePromise = responsePromises.get(key);
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise !== void 0) {
              responsePromises.delete(key);
              try {
                if (responseMessage.error) {
                  const error = responseMessage.error;
                  responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                } else if (responseMessage.result !== void 0) {
                  responsePromise.resolve(responseMessage.result);
                } else {
                  throw new Error("Should never happen.");
                }
              } catch (error) {
                if (error.message) {
                  logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                } else {
                  logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                }
              }
            }
          }
        }
        function handleNotification(message) {
          if (isDisposed()) {
            return;
          }
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
          if (notificationHandler || starNotificationHandler) {
            try {
              traceReceivedNotification(message);
              if (notificationHandler) {
                if (message.params === void 0) {
                  if (type !== void 0) {
                    if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                      logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                    }
                  }
                  notificationHandler();
                } else if (Array.isArray(message.params)) {
                  const params = message.params;
                  if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                    notificationHandler({ token: params[0], value: params[1] });
                  } else {
                    if (type !== void 0) {
                      if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                        logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                      }
                      if (type.numberOfParams !== message.params.length) {
                        logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                      }
                    }
                    notificationHandler(...params);
                  }
                } else {
                  if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                    logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                  }
                  notificationHandler(message.params);
                }
              } else if (starNotificationHandler) {
                starNotificationHandler(message.method, message.params);
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
              }
            }
          } else {
            unhandledNotificationEmitter.fire(message);
          }
        }
        function handleInvalidMessage(message) {
          if (!message) {
            logger.error("Received empty message.");
            return;
          }
          logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
          const responseMessage = message;
          if (Is2.string(responseMessage.id) || Is2.number(responseMessage.id)) {
            const key = responseMessage.id;
            const responseHandler = responsePromises.get(key);
            if (responseHandler) {
              responseHandler.reject(new Error("The received response has neither a result nor an error property."));
            }
          }
        }
        function stringifyTrace(params) {
          if (params === void 0 || params === null) {
            return void 0;
          }
          switch (trace) {
            case Trace.Verbose:
              return JSON.stringify(params, null, 4);
            case Trace.Compact:
              return JSON.stringify(params);
            default:
              return void 0;
          }
        }
        function traceSendingRequest(message) {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
          } else {
            logLSPMessage("send-request", message);
          }
        }
        function traceSendingNotification(message) {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
              if (message.params) {
                data = `Params: ${stringifyTrace(message.params)}

`;
              } else {
                data = "No parameters provided.\n\n";
              }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
          } else {
            logLSPMessage("send-notification", message);
          }
        }
        function traceSendingResponse(message, method, startTime) {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
              if (message.error && message.error.data) {
                data = `Error data: ${stringifyTrace(message.error.data)}

`;
              } else {
                if (message.result) {
                  data = `Result: ${stringifyTrace(message.result)}

`;
                } else if (message.error === void 0) {
                  data = "No result returned.\n\n";
                }
              }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
          } else {
            logLSPMessage("send-response", message);
          }
        }
        function traceReceivedRequest(message) {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
          } else {
            logLSPMessage("receive-request", message);
          }
        }
        function traceReceivedNotification(message) {
          if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
              if (message.params) {
                data = `Params: ${stringifyTrace(message.params)}

`;
              } else {
                data = "No parameters provided.\n\n";
              }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
          } else {
            logLSPMessage("receive-notification", message);
          }
        }
        function traceReceivedResponse(message, responsePromise) {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          if (traceFormat === TraceFormat.Text) {
            let data = void 0;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
              if (message.error && message.error.data) {
                data = `Error data: ${stringifyTrace(message.error.data)}

`;
              } else {
                if (message.result) {
                  data = `Result: ${stringifyTrace(message.result)}

`;
                } else if (message.error === void 0) {
                  data = "No result returned.\n\n";
                }
              }
            }
            if (responsePromise) {
              const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
              tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            } else {
              tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
          } else {
            logLSPMessage("receive-response", message);
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
            throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
          }
          if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
          }
        }
        function throwIfListening() {
          if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
          }
        }
        function throwIfNotListening() {
          if (!isListening()) {
            throw new Error("Call listen() first.");
          }
        }
        function undefinedToNull(param) {
          if (param === void 0) {
            return null;
          } else {
            return param;
          }
        }
        function nullToUndefined(param) {
          if (param === null) {
            return void 0;
          } else {
            return param;
          }
        }
        function isNamedParam(param) {
          return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
        }
        function computeSingleParam(parameterStructures, param) {
          switch (parameterStructures) {
            case messages_1.ParameterStructures.auto:
              if (isNamedParam(param)) {
                return nullToUndefined(param);
              } else {
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
              result = void 0;
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
        const connection2 = {
          sendNotification: (type, ...args) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (Is2.string(type)) {
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
                  if (parameterStructures === messages_1.ParameterStructures.byName) {
                    throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                  }
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
            return messageWriter2.write(notificationMessage).catch((error) => {
              logger.error(`Sending notification failed.`);
              throw error;
            });
          },
          onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            let method;
            if (Is2.func(type)) {
              starNotificationHandler = type;
            } else if (handler) {
              if (Is2.string(type)) {
                method = type;
                notificationHandlers.set(type, { type: void 0, handler });
              } else {
                method = type.method;
                notificationHandlers.set(type.method, { type, handler });
              }
            }
            return {
              dispose: () => {
                if (method !== void 0) {
                  notificationHandlers.delete(method);
                } else {
                  starNotificationHandler = void 0;
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
            return connection2.sendNotification(ProgressNotification.type, { token, value });
          },
          onUnhandledProgress: unhandledProgressEmitter.event,
          sendRequest: (type, ...args) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = void 0;
            if (Is2.string(type)) {
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
                  if (parameterStructures === messages_1.ParameterStructures.byName) {
                    throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                  }
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
            let disposable2;
            if (token) {
              disposable2 = token.onCancellationRequested(() => {
                const p = cancellationStrategy.sender.sendCancellation(connection2, id);
                if (p === void 0) {
                  logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                  return Promise.resolve();
                } else {
                  return p.catch(() => {
                    logger.log(`Sending cancellation messages for id ${id} failed`);
                  });
                }
              });
            }
            const requestMessage = {
              jsonrpc: version,
              id,
              method,
              params: messageParams
            };
            traceSendingRequest(requestMessage);
            if (typeof cancellationStrategy.sender.enableCancellation === "function") {
              cancellationStrategy.sender.enableCancellation(requestMessage);
            }
            return new Promise(async (resolve, reject) => {
              const resolveWithCleanup = (r) => {
                resolve(r);
                cancellationStrategy.sender.cleanup(id);
                disposable2 == null ? void 0 : disposable2.dispose();
              };
              const rejectWithCleanup = (r) => {
                reject(r);
                cancellationStrategy.sender.cleanup(id);
                disposable2 == null ? void 0 : disposable2.dispose();
              };
              const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
              try {
                await messageWriter2.write(requestMessage);
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
            } else if (Is2.string(type)) {
              method = null;
              if (handler !== void 0) {
                method = type;
                requestHandlers.set(type, { handler, type: void 0 });
              }
            } else {
              if (handler !== void 0) {
                method = type.method;
                requestHandlers.set(type.method, { type, handler });
              }
            }
            return {
              dispose: () => {
                if (method === null) {
                  return;
                }
                if (method !== void 0) {
                  requestHandlers.delete(method);
                } else {
                  starRequestHandler = void 0;
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
            if (sendNotificationOrTraceOptions !== void 0) {
              if (Is2.boolean(sendNotificationOrTraceOptions)) {
                _sendNotification = sendNotificationOrTraceOptions;
              } else {
                _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
              }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
              tracer = void 0;
            } else {
              tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
              await connection2.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
          },
          onError: errorEmitter.event,
          onClose: closeEmitter.event,
          onUnhandledNotification: unhandledNotificationEmitter.event,
          onDispose: disposeEmitter.event,
          end: () => {
            messageWriter2.end();
          },
          dispose: () => {
            if (isDisposed()) {
              return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(void 0);
            const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
            for (const promise of responsePromises.values()) {
              promise.reject(error);
            }
            responsePromises = /* @__PURE__ */ new Map();
            requestTokens = /* @__PURE__ */ new Map();
            knownCanceledRequests = /* @__PURE__ */ new Set();
            messageQueue = new linkedMap_1.LinkedMap();
            if (Is2.func(messageWriter2.dispose)) {
              messageWriter2.dispose();
            }
            if (Is2.func(messageReader2.dispose)) {
              messageReader2.dispose();
            }
          },
          listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader2.listen(callback);
          },
          inspect: () => {
            (0, ral_1.default)().console.log("inspect");
          }
        };
        connection2.onNotification(LogTraceNotification.type, (params) => {
          if (trace === Trace.Off || !tracer) {
            return;
          }
          const verbose = trace === Trace.Verbose || trace === Trace.Compact;
          tracer.log(params.message, verbose ? params.verbose : void 0);
        });
        connection2.onNotification(ProgressNotification.type, (params) => {
          const handler = progressHandlers.get(params.token);
          if (handler) {
            handler(params.value);
          } else {
            unhandledProgressEmitter.fire(params);
          }
        });
        return connection2;
      }
      exports$1.createMessageConnection = createMessageConnection;
    })(connection$1);
    return connection$1;
  }
  var hasRequiredApi$1;
  function requireApi$1() {
    if (hasRequiredApi$1) return api$1;
    hasRequiredApi$1 = 1;
    (function(exports$1) {
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.ProgressType = exports$1.ProgressToken = exports$1.createMessageConnection = exports$1.NullLogger = exports$1.ConnectionOptions = exports$1.ConnectionStrategy = exports$1.AbstractMessageBuffer = exports$1.WriteableStreamMessageWriter = exports$1.AbstractMessageWriter = exports$1.MessageWriter = exports$1.ReadableStreamMessageReader = exports$1.AbstractMessageReader = exports$1.MessageReader = exports$1.SharedArrayReceiverStrategy = exports$1.SharedArraySenderStrategy = exports$1.CancellationToken = exports$1.CancellationTokenSource = exports$1.Emitter = exports$1.Event = exports$1.Disposable = exports$1.LRUCache = exports$1.Touch = exports$1.LinkedMap = exports$1.ParameterStructures = exports$1.NotificationType9 = exports$1.NotificationType8 = exports$1.NotificationType7 = exports$1.NotificationType6 = exports$1.NotificationType5 = exports$1.NotificationType4 = exports$1.NotificationType3 = exports$1.NotificationType2 = exports$1.NotificationType1 = exports$1.NotificationType0 = exports$1.NotificationType = exports$1.ErrorCodes = exports$1.ResponseError = exports$1.RequestType9 = exports$1.RequestType8 = exports$1.RequestType7 = exports$1.RequestType6 = exports$1.RequestType5 = exports$1.RequestType4 = exports$1.RequestType3 = exports$1.RequestType2 = exports$1.RequestType1 = exports$1.RequestType0 = exports$1.RequestType = exports$1.Message = exports$1.RAL = void 0;
      exports$1.MessageStrategy = exports$1.CancellationStrategy = exports$1.CancellationSenderStrategy = exports$1.CancellationReceiverStrategy = exports$1.ConnectionError = exports$1.ConnectionErrors = exports$1.LogTraceNotification = exports$1.SetTraceNotification = exports$1.TraceFormat = exports$1.TraceValues = exports$1.Trace = void 0;
      const messages_1 = requireMessages$1();
      Object.defineProperty(exports$1, "Message", { enumerable: true, get: function() {
        return messages_1.Message;
      } });
      Object.defineProperty(exports$1, "RequestType", { enumerable: true, get: function() {
        return messages_1.RequestType;
      } });
      Object.defineProperty(exports$1, "RequestType0", { enumerable: true, get: function() {
        return messages_1.RequestType0;
      } });
      Object.defineProperty(exports$1, "RequestType1", { enumerable: true, get: function() {
        return messages_1.RequestType1;
      } });
      Object.defineProperty(exports$1, "RequestType2", { enumerable: true, get: function() {
        return messages_1.RequestType2;
      } });
      Object.defineProperty(exports$1, "RequestType3", { enumerable: true, get: function() {
        return messages_1.RequestType3;
      } });
      Object.defineProperty(exports$1, "RequestType4", { enumerable: true, get: function() {
        return messages_1.RequestType4;
      } });
      Object.defineProperty(exports$1, "RequestType5", { enumerable: true, get: function() {
        return messages_1.RequestType5;
      } });
      Object.defineProperty(exports$1, "RequestType6", { enumerable: true, get: function() {
        return messages_1.RequestType6;
      } });
      Object.defineProperty(exports$1, "RequestType7", { enumerable: true, get: function() {
        return messages_1.RequestType7;
      } });
      Object.defineProperty(exports$1, "RequestType8", { enumerable: true, get: function() {
        return messages_1.RequestType8;
      } });
      Object.defineProperty(exports$1, "RequestType9", { enumerable: true, get: function() {
        return messages_1.RequestType9;
      } });
      Object.defineProperty(exports$1, "ResponseError", { enumerable: true, get: function() {
        return messages_1.ResponseError;
      } });
      Object.defineProperty(exports$1, "ErrorCodes", { enumerable: true, get: function() {
        return messages_1.ErrorCodes;
      } });
      Object.defineProperty(exports$1, "NotificationType", { enumerable: true, get: function() {
        return messages_1.NotificationType;
      } });
      Object.defineProperty(exports$1, "NotificationType0", { enumerable: true, get: function() {
        return messages_1.NotificationType0;
      } });
      Object.defineProperty(exports$1, "NotificationType1", { enumerable: true, get: function() {
        return messages_1.NotificationType1;
      } });
      Object.defineProperty(exports$1, "NotificationType2", { enumerable: true, get: function() {
        return messages_1.NotificationType2;
      } });
      Object.defineProperty(exports$1, "NotificationType3", { enumerable: true, get: function() {
        return messages_1.NotificationType3;
      } });
      Object.defineProperty(exports$1, "NotificationType4", { enumerable: true, get: function() {
        return messages_1.NotificationType4;
      } });
      Object.defineProperty(exports$1, "NotificationType5", { enumerable: true, get: function() {
        return messages_1.NotificationType5;
      } });
      Object.defineProperty(exports$1, "NotificationType6", { enumerable: true, get: function() {
        return messages_1.NotificationType6;
      } });
      Object.defineProperty(exports$1, "NotificationType7", { enumerable: true, get: function() {
        return messages_1.NotificationType7;
      } });
      Object.defineProperty(exports$1, "NotificationType8", { enumerable: true, get: function() {
        return messages_1.NotificationType8;
      } });
      Object.defineProperty(exports$1, "NotificationType9", { enumerable: true, get: function() {
        return messages_1.NotificationType9;
      } });
      Object.defineProperty(exports$1, "ParameterStructures", { enumerable: true, get: function() {
        return messages_1.ParameterStructures;
      } });
      const linkedMap_1 = requireLinkedMap();
      Object.defineProperty(exports$1, "LinkedMap", { enumerable: true, get: function() {
        return linkedMap_1.LinkedMap;
      } });
      Object.defineProperty(exports$1, "LRUCache", { enumerable: true, get: function() {
        return linkedMap_1.LRUCache;
      } });
      Object.defineProperty(exports$1, "Touch", { enumerable: true, get: function() {
        return linkedMap_1.Touch;
      } });
      const disposable_1 = requireDisposable();
      Object.defineProperty(exports$1, "Disposable", { enumerable: true, get: function() {
        return disposable_1.Disposable;
      } });
      const events_1 = requireEvents();
      Object.defineProperty(exports$1, "Event", { enumerable: true, get: function() {
        return events_1.Event;
      } });
      Object.defineProperty(exports$1, "Emitter", { enumerable: true, get: function() {
        return events_1.Emitter;
      } });
      const cancellation_1 = requireCancellation();
      Object.defineProperty(exports$1, "CancellationTokenSource", { enumerable: true, get: function() {
        return cancellation_1.CancellationTokenSource;
      } });
      Object.defineProperty(exports$1, "CancellationToken", { enumerable: true, get: function() {
        return cancellation_1.CancellationToken;
      } });
      const sharedArrayCancellation_1 = requireSharedArrayCancellation();
      Object.defineProperty(exports$1, "SharedArraySenderStrategy", { enumerable: true, get: function() {
        return sharedArrayCancellation_1.SharedArraySenderStrategy;
      } });
      Object.defineProperty(exports$1, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
        return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
      } });
      const messageReader_1 = requireMessageReader();
      Object.defineProperty(exports$1, "MessageReader", { enumerable: true, get: function() {
        return messageReader_1.MessageReader;
      } });
      Object.defineProperty(exports$1, "AbstractMessageReader", { enumerable: true, get: function() {
        return messageReader_1.AbstractMessageReader;
      } });
      Object.defineProperty(exports$1, "ReadableStreamMessageReader", { enumerable: true, get: function() {
        return messageReader_1.ReadableStreamMessageReader;
      } });
      const messageWriter_1 = requireMessageWriter();
      Object.defineProperty(exports$1, "MessageWriter", { enumerable: true, get: function() {
        return messageWriter_1.MessageWriter;
      } });
      Object.defineProperty(exports$1, "AbstractMessageWriter", { enumerable: true, get: function() {
        return messageWriter_1.AbstractMessageWriter;
      } });
      Object.defineProperty(exports$1, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
        return messageWriter_1.WriteableStreamMessageWriter;
      } });
      const messageBuffer_1 = requireMessageBuffer();
      Object.defineProperty(exports$1, "AbstractMessageBuffer", { enumerable: true, get: function() {
        return messageBuffer_1.AbstractMessageBuffer;
      } });
      const connection_1 = requireConnection$1();
      Object.defineProperty(exports$1, "ConnectionStrategy", { enumerable: true, get: function() {
        return connection_1.ConnectionStrategy;
      } });
      Object.defineProperty(exports$1, "ConnectionOptions", { enumerable: true, get: function() {
        return connection_1.ConnectionOptions;
      } });
      Object.defineProperty(exports$1, "NullLogger", { enumerable: true, get: function() {
        return connection_1.NullLogger;
      } });
      Object.defineProperty(exports$1, "createMessageConnection", { enumerable: true, get: function() {
        return connection_1.createMessageConnection;
      } });
      Object.defineProperty(exports$1, "ProgressToken", { enumerable: true, get: function() {
        return connection_1.ProgressToken;
      } });
      Object.defineProperty(exports$1, "ProgressType", { enumerable: true, get: function() {
        return connection_1.ProgressType;
      } });
      Object.defineProperty(exports$1, "Trace", { enumerable: true, get: function() {
        return connection_1.Trace;
      } });
      Object.defineProperty(exports$1, "TraceValues", { enumerable: true, get: function() {
        return connection_1.TraceValues;
      } });
      Object.defineProperty(exports$1, "TraceFormat", { enumerable: true, get: function() {
        return connection_1.TraceFormat;
      } });
      Object.defineProperty(exports$1, "SetTraceNotification", { enumerable: true, get: function() {
        return connection_1.SetTraceNotification;
      } });
      Object.defineProperty(exports$1, "LogTraceNotification", { enumerable: true, get: function() {
        return connection_1.LogTraceNotification;
      } });
      Object.defineProperty(exports$1, "ConnectionErrors", { enumerable: true, get: function() {
        return connection_1.ConnectionErrors;
      } });
      Object.defineProperty(exports$1, "ConnectionError", { enumerable: true, get: function() {
        return connection_1.ConnectionError;
      } });
      Object.defineProperty(exports$1, "CancellationReceiverStrategy", { enumerable: true, get: function() {
        return connection_1.CancellationReceiverStrategy;
      } });
      Object.defineProperty(exports$1, "CancellationSenderStrategy", { enumerable: true, get: function() {
        return connection_1.CancellationSenderStrategy;
      } });
      Object.defineProperty(exports$1, "CancellationStrategy", { enumerable: true, get: function() {
        return connection_1.CancellationStrategy;
      } });
      Object.defineProperty(exports$1, "MessageStrategy", { enumerable: true, get: function() {
        return connection_1.MessageStrategy;
      } });
      const ral_1 = requireRal();
      exports$1.RAL = ral_1.default;
    })(api$1);
    return api$1;
  }
  var hasRequiredRil;
  function requireRil() {
    if (hasRequiredRil) return ril;
    hasRequiredRil = 1;
    Object.defineProperty(ril, "__esModule", { value: true });
    const api_1 = requireApi$1();
    class MessageBuffer extends api_1.AbstractMessageBuffer {
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
        if (encoding === "ascii") {
          return this.asciiDecoder.decode(value);
        } else {
          return new TextDecoder(encoding).decode(value);
        }
      }
      asNative(buffer, length) {
        if (length === void 0) {
          return buffer;
        } else {
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
    }
    class WritableStreamWrapper {
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
          if (encoding !== void 0 && encoding !== "utf-8") {
            throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
          }
          this.socket.send(data);
        } else {
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
          name: "application/json",
          encode: (msg, options) => {
            if (options.charset !== "utf-8") {
              throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
            }
            return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, void 0, 0)));
          }
        }),
        decoder: Object.freeze({
          name: "application/json",
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
    (function(RIL2) {
      function install() {
        api_1.RAL.install(_ril);
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    ril.default = RIL;
    return ril;
  }
  var hasRequiredMain$1;
  function requireMain$1() {
    if (hasRequiredMain$1) return main$1;
    hasRequiredMain$1 = 1;
    (function(exports$1) {
      var __createBinding = main$1 && main$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = main$1 && main$1.__exportStar || function(m, exports$12) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
      };
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.createMessageConnection = exports$1.BrowserMessageWriter = exports$1.BrowserMessageReader = void 0;
      const ril_1 = requireRil();
      ril_1.default.install();
      const api_1 = requireApi$1();
      __exportStar(requireApi$1(), exports$1);
      class BrowserMessageReader extends api_1.AbstractMessageReader {
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
      }
      exports$1.BrowserMessageReader = BrowserMessageReader;
      class BrowserMessageWriter extends api_1.AbstractMessageWriter {
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
        end() {
        }
      }
      exports$1.BrowserMessageWriter = BrowserMessageWriter;
      function createMessageConnection(reader, writer, logger, options) {
        if (logger === void 0) {
          logger = api_1.NullLogger;
        }
        if (api_1.ConnectionStrategy.is(options)) {
          options = { connectionStrategy: options };
        }
        return (0, api_1.createMessageConnection)(reader, writer, logger, options);
      }
      exports$1.createMessageConnection = createMessageConnection;
    })(main$1);
    return main$1;
  }
  var browser$1;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser$1;
    hasRequiredBrowser = 1;
    browser$1 = requireMain$1();
    return browser$1;
  }
  var api = {};
  var DocumentUri;
  (function(DocumentUri2) {
    function is2(value) {
      return typeof value === "string";
    }
    DocumentUri2.is = is2;
  })(DocumentUri || (DocumentUri = {}));
  var URI$1;
  (function(URI2) {
    function is2(value) {
      return typeof value === "string";
    }
    URI2.is = is2;
  })(URI$1 || (URI$1 = {}));
  var integer;
  (function(integer2) {
    integer2.MIN_VALUE = -2147483648;
    integer2.MAX_VALUE = 2147483647;
    function is2(value) {
      return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
    }
    integer2.is = is2;
  })(integer || (integer = {}));
  var uinteger;
  (function(uinteger2) {
    uinteger2.MIN_VALUE = 0;
    uinteger2.MAX_VALUE = 2147483647;
    function is2(value) {
      return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
    }
    uinteger2.is = is2;
  })(uinteger || (uinteger = {}));
  var Position;
  (function(Position2) {
    function create(line, character) {
      if (line === Number.MAX_VALUE) {
        line = uinteger.MAX_VALUE;
      }
      if (character === Number.MAX_VALUE) {
        character = uinteger.MAX_VALUE;
      }
      return { line, character };
    }
    Position2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position2.is = is2;
  })(Position || (Position = {}));
  var Range;
  (function(Range2) {
    function create(one, two, three, four) {
      if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
        return { start: Position.create(one, two), end: Position.create(three, four) };
      } else if (Position.is(one) && Position.is(two)) {
        return { start: one, end: two };
      } else {
        throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
      }
    }
    Range2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range2.is = is2;
  })(Range || (Range = {}));
  var Location;
  (function(Location2) {
    function create(uri, range) {
      return { uri, range };
    }
    Location2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location2.is = is2;
  })(Location || (Location = {}));
  var LocationLink;
  (function(LocationLink2) {
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
      return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
    }
    LocationLink2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink2.is = is2;
  })(LocationLink || (LocationLink = {}));
  var Color;
  (function(Color2) {
    function create(red, green, blue, alpha) {
      return {
        red,
        green,
        blue,
        alpha
      };
    }
    Color2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color2.is = is2;
  })(Color || (Color = {}));
  var ColorInformation;
  (function(ColorInformation2) {
    function create(range, color) {
      return {
        range,
        color
      };
    }
    ColorInformation2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation2.is = is2;
  })(ColorInformation || (ColorInformation = {}));
  var ColorPresentation;
  (function(ColorPresentation2) {
    function create(label, textEdit, additionalTextEdits) {
      return {
        label,
        textEdit,
        additionalTextEdits
      };
    }
    ColorPresentation2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation2.is = is2;
  })(ColorPresentation || (ColorPresentation = {}));
  var FoldingRangeKind;
  (function(FoldingRangeKind2) {
    FoldingRangeKind2.Comment = "comment";
    FoldingRangeKind2.Imports = "imports";
    FoldingRangeKind2.Region = "region";
  })(FoldingRangeKind || (FoldingRangeKind = {}));
  var FoldingRange;
  (function(FoldingRange2) {
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
    FoldingRange2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange2.is = is2;
  })(FoldingRange || (FoldingRange = {}));
  var DiagnosticRelatedInformation;
  (function(DiagnosticRelatedInformation2) {
    function create(location, message) {
      return {
        location,
        message
      };
    }
    DiagnosticRelatedInformation2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation2.is = is2;
  })(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
  var DiagnosticSeverity;
  (function(DiagnosticSeverity2) {
    DiagnosticSeverity2.Error = 1;
    DiagnosticSeverity2.Warning = 2;
    DiagnosticSeverity2.Information = 3;
    DiagnosticSeverity2.Hint = 4;
  })(DiagnosticSeverity || (DiagnosticSeverity = {}));
  var DiagnosticTag;
  (function(DiagnosticTag2) {
    DiagnosticTag2.Unnecessary = 1;
    DiagnosticTag2.Deprecated = 2;
  })(DiagnosticTag || (DiagnosticTag = {}));
  var CodeDescription;
  (function(CodeDescription2) {
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.href);
    }
    CodeDescription2.is = is2;
  })(CodeDescription || (CodeDescription = {}));
  var Diagnostic;
  (function(Diagnostic2) {
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
    Diagnostic2.create = create;
    function is2(value) {
      var _a;
      let candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic2.is = is2;
  })(Diagnostic || (Diagnostic = {}));
  var Command;
  (function(Command2) {
    function create(title, command, ...args) {
      let result = { title, command };
      if (Is.defined(args) && args.length > 0) {
        result.arguments = args;
      }
      return result;
    }
    Command2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command2.is = is2;
  })(Command || (Command = {}));
  var TextEdit;
  (function(TextEdit2) {
    function replace(range, newText) {
      return { range, newText };
    }
    TextEdit2.replace = replace;
    function insert(position, newText) {
      return { range: { start: position, end: position }, newText };
    }
    TextEdit2.insert = insert;
    function del(range) {
      return { range, newText: "" };
    }
    TextEdit2.del = del;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
    }
    TextEdit2.is = is2;
  })(TextEdit || (TextEdit = {}));
  var ChangeAnnotation;
  (function(ChangeAnnotation2) {
    function create(label, needsConfirmation, description) {
      const result = { label };
      if (needsConfirmation !== void 0) {
        result.needsConfirmation = needsConfirmation;
      }
      if (description !== void 0) {
        result.description = description;
      }
      return result;
    }
    ChangeAnnotation2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
    }
    ChangeAnnotation2.is = is2;
  })(ChangeAnnotation || (ChangeAnnotation = {}));
  var ChangeAnnotationIdentifier;
  (function(ChangeAnnotationIdentifier2) {
    function is2(value) {
      const candidate = value;
      return Is.string(candidate);
    }
    ChangeAnnotationIdentifier2.is = is2;
  })(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
  var AnnotatedTextEdit;
  (function(AnnotatedTextEdit2) {
    function replace(range, newText, annotation) {
      return { range, newText, annotationId: annotation };
    }
    AnnotatedTextEdit2.replace = replace;
    function insert(position, newText, annotation) {
      return { range: { start: position, end: position }, newText, annotationId: annotation };
    }
    AnnotatedTextEdit2.insert = insert;
    function del(range, annotation) {
      return { range, newText: "", annotationId: annotation };
    }
    AnnotatedTextEdit2.del = del;
    function is2(value) {
      const candidate = value;
      return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit2.is = is2;
  })(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
  var TextDocumentEdit;
  (function(TextDocumentEdit2) {
    function create(textDocument, edits) {
      return { textDocument, edits };
    }
    TextDocumentEdit2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
    }
    TextDocumentEdit2.is = is2;
  })(TextDocumentEdit || (TextDocumentEdit = {}));
  var CreateFile;
  (function(CreateFile2) {
    function create(uri, options, annotation) {
      let result = {
        kind: "create",
        uri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    CreateFile2.create = create;
    function is2(value) {
      let candidate = value;
      return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile2.is = is2;
  })(CreateFile || (CreateFile = {}));
  var RenameFile;
  (function(RenameFile2) {
    function create(oldUri, newUri, options, annotation) {
      let result = {
        kind: "rename",
        oldUri,
        newUri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    RenameFile2.create = create;
    function is2(value) {
      let candidate = value;
      return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile2.is = is2;
  })(RenameFile || (RenameFile = {}));
  var DeleteFile;
  (function(DeleteFile2) {
    function create(uri, options, annotation) {
      let result = {
        kind: "delete",
        uri
      };
      if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    DeleteFile2.create = create;
    function is2(value) {
      let candidate = value;
      return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile2.is = is2;
  })(DeleteFile || (DeleteFile = {}));
  var WorkspaceEdit;
  (function(WorkspaceEdit2) {
    function is2(value) {
      let candidate = value;
      return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
        if (Is.string(change.kind)) {
          return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
        } else {
          return TextDocumentEdit.is(change);
        }
      }));
    }
    WorkspaceEdit2.is = is2;
  })(WorkspaceEdit || (WorkspaceEdit = {}));
  class TextEditChangeImpl {
    constructor(edits, changeAnnotations) {
      this.edits = edits;
      this.changeAnnotations = changeAnnotations;
    }
    insert(position, newText, annotation) {
      let edit;
      let id;
      if (annotation === void 0) {
        edit = TextEdit.insert(position, newText);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.insert(position, newText, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.insert(position, newText, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
        return id;
      }
    }
    replace(range, newText, annotation) {
      let edit;
      let id;
      if (annotation === void 0) {
        edit = TextEdit.replace(range, newText);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.replace(range, newText, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.replace(range, newText, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
        return id;
      }
    }
    delete(range, annotation) {
      let edit;
      let id;
      if (annotation === void 0) {
        edit = TextEdit.del(range);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.del(range, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.del(range, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
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
      if (value === void 0) {
        throw new Error(`Text edit change is not configured to manage change annotations.`);
      }
    }
  }
  class ChangeAnnotations {
    constructor(annotations) {
      this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
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
      } else {
        id = this.nextId();
        annotation = idOrAnnotation;
      }
      if (this._annotations[id] !== void 0) {
        throw new Error(`Id ${id} is already in use.`);
      }
      if (annotation === void 0) {
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
  class WorkspaceChange {
    constructor(workspaceEdit) {
      this._textEditChanges = /* @__PURE__ */ Object.create(null);
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
        } else if (workspaceEdit.changes) {
          Object.keys(workspaceEdit.changes).forEach((key) => {
            const textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
            this._textEditChanges[key] = textEditChange;
          });
        }
      } else {
        this._workspaceEdit = {};
      }
    }
    /**
     * Returns the underlying {@link WorkspaceEdit} literal
     * use to be returned from a workspace edit operation like rename.
     */
    get edit() {
      this.initDocumentChanges();
      if (this._changeAnnotations !== void 0) {
        if (this._changeAnnotations.size === 0) {
          this._workspaceEdit.changeAnnotations = void 0;
        } else {
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      return this._workspaceEdit;
    }
    getTextEditChange(key) {
      if (OptionalVersionedTextDocumentIdentifier.is(key)) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
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
      } else {
        this.initChanges();
        if (this._workspaceEdit.changes === void 0) {
          throw new Error("Workspace edit is not configured for normal text edit changes.");
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
      if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
        this._changeAnnotations = new ChangeAnnotations();
        this._workspaceEdit.documentChanges = [];
        this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
      }
    }
    initChanges() {
      if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
        this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
      }
    }
    createFile(uri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      let annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      let operation;
      let id;
      if (annotation === void 0) {
        operation = CreateFile.create(uri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = CreateFile.create(uri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    }
    renameFile(oldUri, newUri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      let annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      let operation;
      let id;
      if (annotation === void 0) {
        operation = RenameFile.create(oldUri, newUri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = RenameFile.create(oldUri, newUri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    }
    deleteFile(uri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      let annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      let operation;
      let id;
      if (annotation === void 0) {
        operation = DeleteFile.create(uri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = DeleteFile.create(uri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    }
  }
  var TextDocumentIdentifier;
  (function(TextDocumentIdentifier2) {
    function create(uri) {
      return { uri };
    }
    TextDocumentIdentifier2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier2.is = is2;
  })(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
  var VersionedTextDocumentIdentifier;
  (function(VersionedTextDocumentIdentifier2) {
    function create(uri, version) {
      return { uri, version };
    }
    VersionedTextDocumentIdentifier2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier2.is = is2;
  })(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
  var OptionalVersionedTextDocumentIdentifier;
  (function(OptionalVersionedTextDocumentIdentifier2) {
    function create(uri, version) {
      return { uri, version };
    }
    OptionalVersionedTextDocumentIdentifier2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier2.is = is2;
  })(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
  var TextDocumentItem;
  (function(TextDocumentItem2) {
    function create(uri, languageId, version, text) {
      return { uri, languageId, version, text };
    }
    TextDocumentItem2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem2.is = is2;
  })(TextDocumentItem || (TextDocumentItem = {}));
  var MarkupKind;
  (function(MarkupKind2) {
    MarkupKind2.PlainText = "plaintext";
    MarkupKind2.Markdown = "markdown";
    function is2(value) {
      const candidate = value;
      return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
    }
    MarkupKind2.is = is2;
  })(MarkupKind || (MarkupKind = {}));
  var MarkupContent;
  (function(MarkupContent2) {
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent2.is = is2;
  })(MarkupContent || (MarkupContent = {}));
  var CompletionItemKind;
  (function(CompletionItemKind2) {
    CompletionItemKind2.Text = 1;
    CompletionItemKind2.Method = 2;
    CompletionItemKind2.Function = 3;
    CompletionItemKind2.Constructor = 4;
    CompletionItemKind2.Field = 5;
    CompletionItemKind2.Variable = 6;
    CompletionItemKind2.Class = 7;
    CompletionItemKind2.Interface = 8;
    CompletionItemKind2.Module = 9;
    CompletionItemKind2.Property = 10;
    CompletionItemKind2.Unit = 11;
    CompletionItemKind2.Value = 12;
    CompletionItemKind2.Enum = 13;
    CompletionItemKind2.Keyword = 14;
    CompletionItemKind2.Snippet = 15;
    CompletionItemKind2.Color = 16;
    CompletionItemKind2.File = 17;
    CompletionItemKind2.Reference = 18;
    CompletionItemKind2.Folder = 19;
    CompletionItemKind2.EnumMember = 20;
    CompletionItemKind2.Constant = 21;
    CompletionItemKind2.Struct = 22;
    CompletionItemKind2.Event = 23;
    CompletionItemKind2.Operator = 24;
    CompletionItemKind2.TypeParameter = 25;
  })(CompletionItemKind || (CompletionItemKind = {}));
  var InsertTextFormat;
  (function(InsertTextFormat2) {
    InsertTextFormat2.PlainText = 1;
    InsertTextFormat2.Snippet = 2;
  })(InsertTextFormat || (InsertTextFormat = {}));
  var CompletionItemTag;
  (function(CompletionItemTag2) {
    CompletionItemTag2.Deprecated = 1;
  })(CompletionItemTag || (CompletionItemTag = {}));
  var InsertReplaceEdit;
  (function(InsertReplaceEdit2) {
    function create(newText, insert, replace) {
      return { newText, insert, replace };
    }
    InsertReplaceEdit2.create = create;
    function is2(value) {
      const candidate = value;
      return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
    }
    InsertReplaceEdit2.is = is2;
  })(InsertReplaceEdit || (InsertReplaceEdit = {}));
  var InsertTextMode;
  (function(InsertTextMode2) {
    InsertTextMode2.asIs = 1;
    InsertTextMode2.adjustIndentation = 2;
  })(InsertTextMode || (InsertTextMode = {}));
  var CompletionItemLabelDetails;
  (function(CompletionItemLabelDetails2) {
    function is2(value) {
      const candidate = value;
      return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
    }
    CompletionItemLabelDetails2.is = is2;
  })(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
  var CompletionItem;
  (function(CompletionItem2) {
    function create(label) {
      return { label };
    }
    CompletionItem2.create = create;
  })(CompletionItem || (CompletionItem = {}));
  var CompletionList;
  (function(CompletionList2) {
    function create(items, isIncomplete) {
      return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList2.create = create;
  })(CompletionList || (CompletionList = {}));
  var MarkedString;
  (function(MarkedString2) {
    function fromPlainText(plainText) {
      return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    MarkedString2.fromPlainText = fromPlainText;
    function is2(value) {
      const candidate = value;
      return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
    }
    MarkedString2.is = is2;
  })(MarkedString || (MarkedString = {}));
  var Hover;
  (function(Hover2) {
    function is2(value) {
      let candidate = value;
      return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
    }
    Hover2.is = is2;
  })(Hover || (Hover = {}));
  var ParameterInformation;
  (function(ParameterInformation2) {
    function create(label, documentation) {
      return documentation ? { label, documentation } : { label };
    }
    ParameterInformation2.create = create;
  })(ParameterInformation || (ParameterInformation = {}));
  var SignatureInformation;
  (function(SignatureInformation2) {
    function create(label, documentation, ...parameters) {
      let result = { label };
      if (Is.defined(documentation)) {
        result.documentation = documentation;
      }
      if (Is.defined(parameters)) {
        result.parameters = parameters;
      } else {
        result.parameters = [];
      }
      return result;
    }
    SignatureInformation2.create = create;
  })(SignatureInformation || (SignatureInformation = {}));
  var DocumentHighlightKind;
  (function(DocumentHighlightKind2) {
    DocumentHighlightKind2.Text = 1;
    DocumentHighlightKind2.Read = 2;
    DocumentHighlightKind2.Write = 3;
  })(DocumentHighlightKind || (DocumentHighlightKind = {}));
  var DocumentHighlight;
  (function(DocumentHighlight2) {
    function create(range, kind) {
      let result = { range };
      if (Is.number(kind)) {
        result.kind = kind;
      }
      return result;
    }
    DocumentHighlight2.create = create;
  })(DocumentHighlight || (DocumentHighlight = {}));
  var SymbolKind;
  (function(SymbolKind2) {
    SymbolKind2.File = 1;
    SymbolKind2.Module = 2;
    SymbolKind2.Namespace = 3;
    SymbolKind2.Package = 4;
    SymbolKind2.Class = 5;
    SymbolKind2.Method = 6;
    SymbolKind2.Property = 7;
    SymbolKind2.Field = 8;
    SymbolKind2.Constructor = 9;
    SymbolKind2.Enum = 10;
    SymbolKind2.Interface = 11;
    SymbolKind2.Function = 12;
    SymbolKind2.Variable = 13;
    SymbolKind2.Constant = 14;
    SymbolKind2.String = 15;
    SymbolKind2.Number = 16;
    SymbolKind2.Boolean = 17;
    SymbolKind2.Array = 18;
    SymbolKind2.Object = 19;
    SymbolKind2.Key = 20;
    SymbolKind2.Null = 21;
    SymbolKind2.EnumMember = 22;
    SymbolKind2.Struct = 23;
    SymbolKind2.Event = 24;
    SymbolKind2.Operator = 25;
    SymbolKind2.TypeParameter = 26;
  })(SymbolKind || (SymbolKind = {}));
  var SymbolTag;
  (function(SymbolTag2) {
    SymbolTag2.Deprecated = 1;
  })(SymbolTag || (SymbolTag = {}));
  var SymbolInformation;
  (function(SymbolInformation2) {
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
    SymbolInformation2.create = create;
  })(SymbolInformation || (SymbolInformation = {}));
  var WorkspaceSymbol;
  (function(WorkspaceSymbol2) {
    function create(name, kind, uri, range) {
      return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
    }
    WorkspaceSymbol2.create = create;
  })(WorkspaceSymbol || (WorkspaceSymbol = {}));
  var DocumentSymbol;
  (function(DocumentSymbol2) {
    function create(name, detail, kind, range, selectionRange, children) {
      let result = {
        name,
        detail,
        kind,
        range,
        selectionRange
      };
      if (children !== void 0) {
        result.children = children;
      }
      return result;
    }
    DocumentSymbol2.create = create;
    function is2(value) {
      let candidate = value;
      return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
    }
    DocumentSymbol2.is = is2;
  })(DocumentSymbol || (DocumentSymbol = {}));
  var CodeActionKind;
  (function(CodeActionKind2) {
    CodeActionKind2.Empty = "";
    CodeActionKind2.QuickFix = "quickfix";
    CodeActionKind2.Refactor = "refactor";
    CodeActionKind2.RefactorExtract = "refactor.extract";
    CodeActionKind2.RefactorInline = "refactor.inline";
    CodeActionKind2.RefactorRewrite = "refactor.rewrite";
    CodeActionKind2.Source = "source";
    CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
    CodeActionKind2.SourceFixAll = "source.fixAll";
  })(CodeActionKind || (CodeActionKind = {}));
  var CodeActionTriggerKind;
  (function(CodeActionTriggerKind2) {
    CodeActionTriggerKind2.Invoked = 1;
    CodeActionTriggerKind2.Automatic = 2;
  })(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
  var CodeActionContext;
  (function(CodeActionContext2) {
    function create(diagnostics, only, triggerKind) {
      let result = { diagnostics };
      if (only !== void 0 && only !== null) {
        result.only = only;
      }
      if (triggerKind !== void 0 && triggerKind !== null) {
        result.triggerKind = triggerKind;
      }
      return result;
    }
    CodeActionContext2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
    }
    CodeActionContext2.is = is2;
  })(CodeActionContext || (CodeActionContext = {}));
  var CodeAction;
  (function(CodeAction2) {
    function create(title, kindOrCommandOrEdit, kind) {
      let result = { title };
      let checkKind = true;
      if (typeof kindOrCommandOrEdit === "string") {
        checkKind = false;
        result.kind = kindOrCommandOrEdit;
      } else if (Command.is(kindOrCommandOrEdit)) {
        result.command = kindOrCommandOrEdit;
      } else {
        result.edit = kindOrCommandOrEdit;
      }
      if (checkKind && kind !== void 0) {
        result.kind = kind;
      }
      return result;
    }
    CodeAction2.create = create;
    function is2(value) {
      let candidate = value;
      return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction2.is = is2;
  })(CodeAction || (CodeAction = {}));
  var CodeLens;
  (function(CodeLens2) {
    function create(range, data) {
      let result = { range };
      if (Is.defined(data)) {
        result.data = data;
      }
      return result;
    }
    CodeLens2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens2.is = is2;
  })(CodeLens || (CodeLens = {}));
  var FormattingOptions;
  (function(FormattingOptions2) {
    function create(tabSize, insertSpaces) {
      return { tabSize, insertSpaces };
    }
    FormattingOptions2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions2.is = is2;
  })(FormattingOptions || (FormattingOptions = {}));
  var DocumentLink;
  (function(DocumentLink2) {
    function create(range, target, data) {
      return { range, target, data };
    }
    DocumentLink2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink2.is = is2;
  })(DocumentLink || (DocumentLink = {}));
  var SelectionRange;
  (function(SelectionRange2) {
    function create(range, parent) {
      return { range, parent };
    }
    SelectionRange2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
    }
    SelectionRange2.is = is2;
  })(SelectionRange || (SelectionRange = {}));
  var SemanticTokenTypes;
  (function(SemanticTokenTypes2) {
    SemanticTokenTypes2["namespace"] = "namespace";
    SemanticTokenTypes2["type"] = "type";
    SemanticTokenTypes2["class"] = "class";
    SemanticTokenTypes2["enum"] = "enum";
    SemanticTokenTypes2["interface"] = "interface";
    SemanticTokenTypes2["struct"] = "struct";
    SemanticTokenTypes2["typeParameter"] = "typeParameter";
    SemanticTokenTypes2["parameter"] = "parameter";
    SemanticTokenTypes2["variable"] = "variable";
    SemanticTokenTypes2["property"] = "property";
    SemanticTokenTypes2["enumMember"] = "enumMember";
    SemanticTokenTypes2["event"] = "event";
    SemanticTokenTypes2["function"] = "function";
    SemanticTokenTypes2["method"] = "method";
    SemanticTokenTypes2["macro"] = "macro";
    SemanticTokenTypes2["keyword"] = "keyword";
    SemanticTokenTypes2["modifier"] = "modifier";
    SemanticTokenTypes2["comment"] = "comment";
    SemanticTokenTypes2["string"] = "string";
    SemanticTokenTypes2["number"] = "number";
    SemanticTokenTypes2["regexp"] = "regexp";
    SemanticTokenTypes2["operator"] = "operator";
    SemanticTokenTypes2["decorator"] = "decorator";
  })(SemanticTokenTypes || (SemanticTokenTypes = {}));
  var SemanticTokenModifiers;
  (function(SemanticTokenModifiers2) {
    SemanticTokenModifiers2["declaration"] = "declaration";
    SemanticTokenModifiers2["definition"] = "definition";
    SemanticTokenModifiers2["readonly"] = "readonly";
    SemanticTokenModifiers2["static"] = "static";
    SemanticTokenModifiers2["deprecated"] = "deprecated";
    SemanticTokenModifiers2["abstract"] = "abstract";
    SemanticTokenModifiers2["async"] = "async";
    SemanticTokenModifiers2["modification"] = "modification";
    SemanticTokenModifiers2["documentation"] = "documentation";
    SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
  })(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
  var SemanticTokens;
  (function(SemanticTokens2) {
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
    }
    SemanticTokens2.is = is2;
  })(SemanticTokens || (SemanticTokens = {}));
  var InlineValueText;
  (function(InlineValueText2) {
    function create(range, text) {
      return { range, text };
    }
    InlineValueText2.create = create;
    function is2(value) {
      const candidate = value;
      return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
    }
    InlineValueText2.is = is2;
  })(InlineValueText || (InlineValueText = {}));
  var InlineValueVariableLookup;
  (function(InlineValueVariableLookup2) {
    function create(range, variableName, caseSensitiveLookup) {
      return { range, variableName, caseSensitiveLookup };
    }
    InlineValueVariableLookup2.create = create;
    function is2(value) {
      const candidate = value;
      return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
    }
    InlineValueVariableLookup2.is = is2;
  })(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
  var InlineValueEvaluatableExpression;
  (function(InlineValueEvaluatableExpression2) {
    function create(range, expression) {
      return { range, expression };
    }
    InlineValueEvaluatableExpression2.create = create;
    function is2(value) {
      const candidate = value;
      return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
    }
    InlineValueEvaluatableExpression2.is = is2;
  })(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
  var InlineValueContext;
  (function(InlineValueContext2) {
    function create(frameId, stoppedLocation) {
      return { frameId, stoppedLocation };
    }
    InlineValueContext2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.defined(candidate) && Range.is(value.stoppedLocation);
    }
    InlineValueContext2.is = is2;
  })(InlineValueContext || (InlineValueContext = {}));
  var InlayHintKind;
  (function(InlayHintKind2) {
    InlayHintKind2.Type = 1;
    InlayHintKind2.Parameter = 2;
    function is2(value) {
      return value === 1 || value === 2;
    }
    InlayHintKind2.is = is2;
  })(InlayHintKind || (InlayHintKind = {}));
  var InlayHintLabelPart;
  (function(InlayHintLabelPart2) {
    function create(value) {
      return { value };
    }
    InlayHintLabelPart2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
    }
    InlayHintLabelPart2.is = is2;
  })(InlayHintLabelPart || (InlayHintLabelPart = {}));
  var InlayHint;
  (function(InlayHint2) {
    function create(position, label, kind) {
      const result = { position, label };
      if (kind !== void 0) {
        result.kind = kind;
      }
      return result;
    }
    InlayHint2.create = create;
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
    }
    InlayHint2.is = is2;
  })(InlayHint || (InlayHint = {}));
  var StringValue;
  (function(StringValue2) {
    function createSnippet(value) {
      return { kind: "snippet", value };
    }
    StringValue2.createSnippet = createSnippet;
  })(StringValue || (StringValue = {}));
  var InlineCompletionItem;
  (function(InlineCompletionItem2) {
    function create(insertText, filterText, range, command) {
      return { insertText, filterText, range, command };
    }
    InlineCompletionItem2.create = create;
  })(InlineCompletionItem || (InlineCompletionItem = {}));
  var InlineCompletionList;
  (function(InlineCompletionList2) {
    function create(items) {
      return { items };
    }
    InlineCompletionList2.create = create;
  })(InlineCompletionList || (InlineCompletionList = {}));
  var InlineCompletionTriggerKind;
  (function(InlineCompletionTriggerKind2) {
    InlineCompletionTriggerKind2.Invoked = 0;
    InlineCompletionTriggerKind2.Automatic = 1;
  })(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
  var SelectedCompletionInfo;
  (function(SelectedCompletionInfo2) {
    function create(range, text) {
      return { range, text };
    }
    SelectedCompletionInfo2.create = create;
  })(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
  var InlineCompletionContext;
  (function(InlineCompletionContext2) {
    function create(triggerKind, selectedCompletionInfo) {
      return { triggerKind, selectedCompletionInfo };
    }
    InlineCompletionContext2.create = create;
  })(InlineCompletionContext || (InlineCompletionContext = {}));
  var WorkspaceFolder;
  (function(WorkspaceFolder2) {
    function is2(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && URI$1.is(candidate.uri) && Is.string(candidate.name);
    }
    WorkspaceFolder2.is = is2;
  })(WorkspaceFolder || (WorkspaceFolder = {}));
  const EOL = ["\n", "\r\n", "\r"];
  var TextDocument;
  (function(TextDocument2) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument2.is = is2;
    function applyEdits(document2, edits) {
      let text = document2.getText();
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
        let startOffset = document2.offsetAt(e.range.start);
        let endOffset = document2.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        } else {
          throw new Error("Overlapping edit");
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument2.applyEdits = applyEdits;
    function mergeSort(data, compare) {
      if (data.length <= 1) {
        return data;
      }
      const p = data.length / 2 | 0;
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
          data[i++] = left[leftIdx++];
        } else {
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
  class FullTextDocument {
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
          if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
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
        } else {
          low = mid + 1;
        }
      }
      let line = low - 1;
      return Position.create(line, offset - lineOffsets[line]);
    }
    offsetAt(position) {
      let lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      let lineOffset = lineOffsets[position.line];
      let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    }
    get lineCount() {
      return this.getLineOffsets().length;
    }
  }
  var Is;
  (function(Is2) {
    const toString = Object.prototype.toString;
    function defined(value) {
      return typeof value !== "undefined";
    }
    Is2.defined = defined;
    function undefined$1(value) {
      return typeof value === "undefined";
    }
    Is2.undefined = undefined$1;
    function boolean(value) {
      return value === true || value === false;
    }
    Is2.boolean = boolean;
    function string(value) {
      return toString.call(value) === "[object String]";
    }
    Is2.string = string;
    function number(value) {
      return toString.call(value) === "[object Number]";
    }
    Is2.number = number;
    function numberRange(value, min, max) {
      return toString.call(value) === "[object Number]" && min <= value && value <= max;
    }
    Is2.numberRange = numberRange;
    function integer2(value) {
      return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
    }
    Is2.integer = integer2;
    function uinteger2(value) {
      return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
    }
    Is2.uinteger = uinteger2;
    function func(value) {
      return toString.call(value) === "[object Function]";
    }
    Is2.func = func;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    Is2.objectLiteral = objectLiteral;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    Is2.typedArray = typedArray;
  })(Is || (Is = {}));
  const main = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get AnnotatedTextEdit() {
      return AnnotatedTextEdit;
    },
    get ChangeAnnotation() {
      return ChangeAnnotation;
    },
    get ChangeAnnotationIdentifier() {
      return ChangeAnnotationIdentifier;
    },
    get CodeAction() {
      return CodeAction;
    },
    get CodeActionContext() {
      return CodeActionContext;
    },
    get CodeActionKind() {
      return CodeActionKind;
    },
    get CodeActionTriggerKind() {
      return CodeActionTriggerKind;
    },
    get CodeDescription() {
      return CodeDescription;
    },
    get CodeLens() {
      return CodeLens;
    },
    get Color() {
      return Color;
    },
    get ColorInformation() {
      return ColorInformation;
    },
    get ColorPresentation() {
      return ColorPresentation;
    },
    get Command() {
      return Command;
    },
    get CompletionItem() {
      return CompletionItem;
    },
    get CompletionItemKind() {
      return CompletionItemKind;
    },
    get CompletionItemLabelDetails() {
      return CompletionItemLabelDetails;
    },
    get CompletionItemTag() {
      return CompletionItemTag;
    },
    get CompletionList() {
      return CompletionList;
    },
    get CreateFile() {
      return CreateFile;
    },
    get DeleteFile() {
      return DeleteFile;
    },
    get Diagnostic() {
      return Diagnostic;
    },
    get DiagnosticRelatedInformation() {
      return DiagnosticRelatedInformation;
    },
    get DiagnosticSeverity() {
      return DiagnosticSeverity;
    },
    get DiagnosticTag() {
      return DiagnosticTag;
    },
    get DocumentHighlight() {
      return DocumentHighlight;
    },
    get DocumentHighlightKind() {
      return DocumentHighlightKind;
    },
    get DocumentLink() {
      return DocumentLink;
    },
    get DocumentSymbol() {
      return DocumentSymbol;
    },
    get DocumentUri() {
      return DocumentUri;
    },
    EOL,
    get FoldingRange() {
      return FoldingRange;
    },
    get FoldingRangeKind() {
      return FoldingRangeKind;
    },
    get FormattingOptions() {
      return FormattingOptions;
    },
    get Hover() {
      return Hover;
    },
    get InlayHint() {
      return InlayHint;
    },
    get InlayHintKind() {
      return InlayHintKind;
    },
    get InlayHintLabelPart() {
      return InlayHintLabelPart;
    },
    get InlineCompletionContext() {
      return InlineCompletionContext;
    },
    get InlineCompletionItem() {
      return InlineCompletionItem;
    },
    get InlineCompletionList() {
      return InlineCompletionList;
    },
    get InlineCompletionTriggerKind() {
      return InlineCompletionTriggerKind;
    },
    get InlineValueContext() {
      return InlineValueContext;
    },
    get InlineValueEvaluatableExpression() {
      return InlineValueEvaluatableExpression;
    },
    get InlineValueText() {
      return InlineValueText;
    },
    get InlineValueVariableLookup() {
      return InlineValueVariableLookup;
    },
    get InsertReplaceEdit() {
      return InsertReplaceEdit;
    },
    get InsertTextFormat() {
      return InsertTextFormat;
    },
    get InsertTextMode() {
      return InsertTextMode;
    },
    get Location() {
      return Location;
    },
    get LocationLink() {
      return LocationLink;
    },
    get MarkedString() {
      return MarkedString;
    },
    get MarkupContent() {
      return MarkupContent;
    },
    get MarkupKind() {
      return MarkupKind;
    },
    get OptionalVersionedTextDocumentIdentifier() {
      return OptionalVersionedTextDocumentIdentifier;
    },
    get ParameterInformation() {
      return ParameterInformation;
    },
    get Position() {
      return Position;
    },
    get Range() {
      return Range;
    },
    get RenameFile() {
      return RenameFile;
    },
    get SelectedCompletionInfo() {
      return SelectedCompletionInfo;
    },
    get SelectionRange() {
      return SelectionRange;
    },
    get SemanticTokenModifiers() {
      return SemanticTokenModifiers;
    },
    get SemanticTokenTypes() {
      return SemanticTokenTypes;
    },
    get SemanticTokens() {
      return SemanticTokens;
    },
    get SignatureInformation() {
      return SignatureInformation;
    },
    get StringValue() {
      return StringValue;
    },
    get SymbolInformation() {
      return SymbolInformation;
    },
    get SymbolKind() {
      return SymbolKind;
    },
    get SymbolTag() {
      return SymbolTag;
    },
    get TextDocument() {
      return TextDocument;
    },
    get TextDocumentEdit() {
      return TextDocumentEdit;
    },
    get TextDocumentIdentifier() {
      return TextDocumentIdentifier;
    },
    get TextDocumentItem() {
      return TextDocumentItem;
    },
    get TextEdit() {
      return TextEdit;
    },
    get URI() {
      return URI$1;
    },
    get VersionedTextDocumentIdentifier() {
      return VersionedTextDocumentIdentifier;
    },
    WorkspaceChange,
    get WorkspaceEdit() {
      return WorkspaceEdit;
    },
    get WorkspaceFolder() {
      return WorkspaceFolder;
    },
    get WorkspaceSymbol() {
      return WorkspaceSymbol;
    },
    get integer() {
      return integer;
    },
    get uinteger() {
      return uinteger;
    }
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$1 = /* @__PURE__ */ getAugmentedNamespace(main);
  var messages = {};
  var hasRequiredMessages;
  function requireMessages() {
    if (hasRequiredMessages) return messages;
    hasRequiredMessages = 1;
    Object.defineProperty(messages, "__esModule", { value: true });
    messages.ProtocolNotificationType = messages.ProtocolNotificationType0 = messages.ProtocolRequestType = messages.ProtocolRequestType0 = messages.RegistrationType = messages.MessageDirection = void 0;
    const vscode_jsonrpc_1 = requireMain$1();
    var MessageDirection;
    (function(MessageDirection2) {
      MessageDirection2["clientToServer"] = "clientToServer";
      MessageDirection2["serverToClient"] = "serverToClient";
      MessageDirection2["both"] = "both";
    })(MessageDirection || (messages.MessageDirection = MessageDirection = {}));
    class RegistrationType {
      constructor(method) {
        this.method = method;
      }
    }
    messages.RegistrationType = RegistrationType;
    class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
      constructor(method) {
        super(method);
      }
    }
    messages.ProtocolRequestType0 = ProtocolRequestType0;
    class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    }
    messages.ProtocolRequestType = ProtocolRequestType;
    class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
      constructor(method) {
        super(method);
      }
    }
    messages.ProtocolNotificationType0 = ProtocolNotificationType0;
    class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    }
    messages.ProtocolNotificationType = ProtocolNotificationType;
    return messages;
  }
  var protocol = {};
  var is = {};
  var hasRequiredIs;
  function requireIs() {
    if (hasRequiredIs) return is;
    hasRequiredIs = 1;
    Object.defineProperty(is, "__esModule", { value: true });
    is.objectLiteral = is.typedArray = is.stringArray = is.array = is.func = is.error = is.number = is.string = is.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    is.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    is.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    is.number = number;
    function error(value) {
      return value instanceof Error;
    }
    is.error = error;
    function func(value) {
      return typeof value === "function";
    }
    is.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    is.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    is.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    is.typedArray = typedArray;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    is.objectLiteral = objectLiteral;
    return is;
  }
  var protocol_implementation = {};
  var hasRequiredProtocol_implementation;
  function requireProtocol_implementation() {
    if (hasRequiredProtocol_implementation) return protocol_implementation;
    hasRequiredProtocol_implementation = 1;
    Object.defineProperty(protocol_implementation, "__esModule", { value: true });
    protocol_implementation.ImplementationRequest = void 0;
    const messages_1 = requireMessages();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
    })(ImplementationRequest || (protocol_implementation.ImplementationRequest = ImplementationRequest = {}));
    return protocol_implementation;
  }
  var protocol_typeDefinition = {};
  var hasRequiredProtocol_typeDefinition;
  function requireProtocol_typeDefinition() {
    if (hasRequiredProtocol_typeDefinition) return protocol_typeDefinition;
    hasRequiredProtocol_typeDefinition = 1;
    Object.defineProperty(protocol_typeDefinition, "__esModule", { value: true });
    protocol_typeDefinition.TypeDefinitionRequest = void 0;
    const messages_1 = requireMessages();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
    })(TypeDefinitionRequest || (protocol_typeDefinition.TypeDefinitionRequest = TypeDefinitionRequest = {}));
    return protocol_typeDefinition;
  }
  var protocol_workspaceFolder = {};
  var hasRequiredProtocol_workspaceFolder;
  function requireProtocol_workspaceFolder() {
    if (hasRequiredProtocol_workspaceFolder) return protocol_workspaceFolder;
    hasRequiredProtocol_workspaceFolder = 1;
    Object.defineProperty(protocol_workspaceFolder, "__esModule", { value: true });
    protocol_workspaceFolder.DidChangeWorkspaceFoldersNotification = protocol_workspaceFolder.WorkspaceFoldersRequest = void 0;
    const messages_1 = requireMessages();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
      WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
    })(WorkspaceFoldersRequest || (protocol_workspaceFolder.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
      DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification2.method);
    })(DidChangeWorkspaceFoldersNotification || (protocol_workspaceFolder.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
    return protocol_workspaceFolder;
  }
  var protocol_configuration = {};
  var hasRequiredProtocol_configuration;
  function requireProtocol_configuration() {
    if (hasRequiredProtocol_configuration) return protocol_configuration;
    hasRequiredProtocol_configuration = 1;
    Object.defineProperty(protocol_configuration, "__esModule", { value: true });
    protocol_configuration.ConfigurationRequest = void 0;
    const messages_1 = requireMessages();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.method = "workspace/configuration";
      ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
    })(ConfigurationRequest || (protocol_configuration.ConfigurationRequest = ConfigurationRequest = {}));
    return protocol_configuration;
  }
  var protocol_colorProvider = {};
  var hasRequiredProtocol_colorProvider;
  function requireProtocol_colorProvider() {
    if (hasRequiredProtocol_colorProvider) return protocol_colorProvider;
    hasRequiredProtocol_colorProvider = 1;
    Object.defineProperty(protocol_colorProvider, "__esModule", { value: true });
    protocol_colorProvider.ColorPresentationRequest = protocol_colorProvider.DocumentColorRequest = void 0;
    const messages_1 = requireMessages();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
    })(DocumentColorRequest || (protocol_colorProvider.DocumentColorRequest = DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.method = "textDocument/colorPresentation";
      ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
    })(ColorPresentationRequest || (protocol_colorProvider.ColorPresentationRequest = ColorPresentationRequest = {}));
    return protocol_colorProvider;
  }
  var protocol_foldingRange = {};
  var hasRequiredProtocol_foldingRange;
  function requireProtocol_foldingRange() {
    if (hasRequiredProtocol_foldingRange) return protocol_foldingRange;
    hasRequiredProtocol_foldingRange = 1;
    Object.defineProperty(protocol_foldingRange, "__esModule", { value: true });
    protocol_foldingRange.FoldingRangeRefreshRequest = protocol_foldingRange.FoldingRangeRequest = void 0;
    const messages_1 = requireMessages();
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
    })(FoldingRangeRequest || (protocol_foldingRange.FoldingRangeRequest = FoldingRangeRequest = {}));
    var FoldingRangeRefreshRequest;
    (function(FoldingRangeRefreshRequest2) {
      FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
      FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
    })(FoldingRangeRefreshRequest || (protocol_foldingRange.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
    return protocol_foldingRange;
  }
  var protocol_declaration = {};
  var hasRequiredProtocol_declaration;
  function requireProtocol_declaration() {
    if (hasRequiredProtocol_declaration) return protocol_declaration;
    hasRequiredProtocol_declaration = 1;
    Object.defineProperty(protocol_declaration, "__esModule", { value: true });
    protocol_declaration.DeclarationRequest = void 0;
    const messages_1 = requireMessages();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
    })(DeclarationRequest || (protocol_declaration.DeclarationRequest = DeclarationRequest = {}));
    return protocol_declaration;
  }
  var protocol_selectionRange = {};
  var hasRequiredProtocol_selectionRange;
  function requireProtocol_selectionRange() {
    if (hasRequiredProtocol_selectionRange) return protocol_selectionRange;
    hasRequiredProtocol_selectionRange = 1;
    Object.defineProperty(protocol_selectionRange, "__esModule", { value: true });
    protocol_selectionRange.SelectionRangeRequest = void 0;
    const messages_1 = requireMessages();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
    })(SelectionRangeRequest || (protocol_selectionRange.SelectionRangeRequest = SelectionRangeRequest = {}));
    return protocol_selectionRange;
  }
  var protocol_progress = {};
  var hasRequiredProtocol_progress;
  function requireProtocol_progress() {
    if (hasRequiredProtocol_progress) return protocol_progress;
    hasRequiredProtocol_progress = 1;
    Object.defineProperty(protocol_progress, "__esModule", { value: true });
    protocol_progress.WorkDoneProgressCancelNotification = protocol_progress.WorkDoneProgressCreateRequest = protocol_progress.WorkDoneProgress = void 0;
    const vscode_jsonrpc_1 = requireMain$1();
    const messages_1 = requireMessages();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
      function is2(value) {
        return value === WorkDoneProgress2.type;
      }
      WorkDoneProgress2.is = is2;
    })(WorkDoneProgress || (protocol_progress.WorkDoneProgress = WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
      WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
    })(WorkDoneProgressCreateRequest || (protocol_progress.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
      WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification2.method);
    })(WorkDoneProgressCancelNotification || (protocol_progress.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
    return protocol_progress;
  }
  var protocol_callHierarchy = {};
  var hasRequiredProtocol_callHierarchy;
  function requireProtocol_callHierarchy() {
    if (hasRequiredProtocol_callHierarchy) return protocol_callHierarchy;
    hasRequiredProtocol_callHierarchy = 1;
    Object.defineProperty(protocol_callHierarchy, "__esModule", { value: true });
    protocol_callHierarchy.CallHierarchyOutgoingCallsRequest = protocol_callHierarchy.CallHierarchyIncomingCallsRequest = protocol_callHierarchy.CallHierarchyPrepareRequest = void 0;
    const messages_1 = requireMessages();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
    })(CallHierarchyPrepareRequest || (protocol_callHierarchy.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
    })(CallHierarchyIncomingCallsRequest || (protocol_callHierarchy.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
    })(CallHierarchyOutgoingCallsRequest || (protocol_callHierarchy.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
    return protocol_callHierarchy;
  }
  var protocol_semanticTokens = {};
  var hasRequiredProtocol_semanticTokens;
  function requireProtocol_semanticTokens() {
    if (hasRequiredProtocol_semanticTokens) return protocol_semanticTokens;
    hasRequiredProtocol_semanticTokens = 1;
    Object.defineProperty(protocol_semanticTokens, "__esModule", { value: true });
    protocol_semanticTokens.SemanticTokensRefreshRequest = protocol_semanticTokens.SemanticTokensRangeRequest = protocol_semanticTokens.SemanticTokensDeltaRequest = protocol_semanticTokens.SemanticTokensRequest = protocol_semanticTokens.SemanticTokensRegistrationType = protocol_semanticTokens.TokenFormat = void 0;
    const messages_1 = requireMessages();
    var TokenFormat;
    (function(TokenFormat2) {
      TokenFormat2.Relative = "relative";
    })(TokenFormat || (protocol_semanticTokens.TokenFormat = TokenFormat = {}));
    var SemanticTokensRegistrationType;
    (function(SemanticTokensRegistrationType2) {
      SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
      SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
    })(SemanticTokensRegistrationType || (protocol_semanticTokens.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
      SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
      SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRequest || (protocol_semanticTokens.SemanticTokensRequest = SemanticTokensRequest = {}));
    var SemanticTokensDeltaRequest;
    (function(SemanticTokensDeltaRequest2) {
      SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
      SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
      SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensDeltaRequest || (protocol_semanticTokens.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
      SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
    })(SemanticTokensRangeRequest || (protocol_semanticTokens.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
    var SemanticTokensRefreshRequest;
    (function(SemanticTokensRefreshRequest2) {
      SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
      SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
    })(SemanticTokensRefreshRequest || (protocol_semanticTokens.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
    return protocol_semanticTokens;
  }
  var protocol_showDocument = {};
  var hasRequiredProtocol_showDocument;
  function requireProtocol_showDocument() {
    if (hasRequiredProtocol_showDocument) return protocol_showDocument;
    hasRequiredProtocol_showDocument = 1;
    Object.defineProperty(protocol_showDocument, "__esModule", { value: true });
    protocol_showDocument.ShowDocumentRequest = void 0;
    const messages_1 = requireMessages();
    var ShowDocumentRequest;
    (function(ShowDocumentRequest2) {
      ShowDocumentRequest2.method = "window/showDocument";
      ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
    })(ShowDocumentRequest || (protocol_showDocument.ShowDocumentRequest = ShowDocumentRequest = {}));
    return protocol_showDocument;
  }
  var protocol_linkedEditingRange = {};
  var hasRequiredProtocol_linkedEditingRange;
  function requireProtocol_linkedEditingRange() {
    if (hasRequiredProtocol_linkedEditingRange) return protocol_linkedEditingRange;
    hasRequiredProtocol_linkedEditingRange = 1;
    Object.defineProperty(protocol_linkedEditingRange, "__esModule", { value: true });
    protocol_linkedEditingRange.LinkedEditingRangeRequest = void 0;
    const messages_1 = requireMessages();
    var LinkedEditingRangeRequest;
    (function(LinkedEditingRangeRequest2) {
      LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
      LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
    })(LinkedEditingRangeRequest || (protocol_linkedEditingRange.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
    return protocol_linkedEditingRange;
  }
  var protocol_fileOperations = {};
  var hasRequiredProtocol_fileOperations;
  function requireProtocol_fileOperations() {
    if (hasRequiredProtocol_fileOperations) return protocol_fileOperations;
    hasRequiredProtocol_fileOperations = 1;
    Object.defineProperty(protocol_fileOperations, "__esModule", { value: true });
    protocol_fileOperations.WillDeleteFilesRequest = protocol_fileOperations.DidDeleteFilesNotification = protocol_fileOperations.DidRenameFilesNotification = protocol_fileOperations.WillRenameFilesRequest = protocol_fileOperations.DidCreateFilesNotification = protocol_fileOperations.WillCreateFilesRequest = protocol_fileOperations.FileOperationPatternKind = void 0;
    const messages_1 = requireMessages();
    var FileOperationPatternKind;
    (function(FileOperationPatternKind2) {
      FileOperationPatternKind2.file = "file";
      FileOperationPatternKind2.folder = "folder";
    })(FileOperationPatternKind || (protocol_fileOperations.FileOperationPatternKind = FileOperationPatternKind = {}));
    var WillCreateFilesRequest;
    (function(WillCreateFilesRequest2) {
      WillCreateFilesRequest2.method = "workspace/willCreateFiles";
      WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
    })(WillCreateFilesRequest || (protocol_fileOperations.WillCreateFilesRequest = WillCreateFilesRequest = {}));
    var DidCreateFilesNotification;
    (function(DidCreateFilesNotification2) {
      DidCreateFilesNotification2.method = "workspace/didCreateFiles";
      DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
    })(DidCreateFilesNotification || (protocol_fileOperations.DidCreateFilesNotification = DidCreateFilesNotification = {}));
    var WillRenameFilesRequest;
    (function(WillRenameFilesRequest2) {
      WillRenameFilesRequest2.method = "workspace/willRenameFiles";
      WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
    })(WillRenameFilesRequest || (protocol_fileOperations.WillRenameFilesRequest = WillRenameFilesRequest = {}));
    var DidRenameFilesNotification;
    (function(DidRenameFilesNotification2) {
      DidRenameFilesNotification2.method = "workspace/didRenameFiles";
      DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
    })(DidRenameFilesNotification || (protocol_fileOperations.DidRenameFilesNotification = DidRenameFilesNotification = {}));
    var DidDeleteFilesNotification;
    (function(DidDeleteFilesNotification2) {
      DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
      DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
    })(DidDeleteFilesNotification || (protocol_fileOperations.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
    var WillDeleteFilesRequest;
    (function(WillDeleteFilesRequest2) {
      WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
      WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
    })(WillDeleteFilesRequest || (protocol_fileOperations.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
    return protocol_fileOperations;
  }
  var protocol_moniker = {};
  var hasRequiredProtocol_moniker;
  function requireProtocol_moniker() {
    if (hasRequiredProtocol_moniker) return protocol_moniker;
    hasRequiredProtocol_moniker = 1;
    Object.defineProperty(protocol_moniker, "__esModule", { value: true });
    protocol_moniker.MonikerRequest = protocol_moniker.MonikerKind = protocol_moniker.UniquenessLevel = void 0;
    const messages_1 = requireMessages();
    var UniquenessLevel;
    (function(UniquenessLevel2) {
      UniquenessLevel2.document = "document";
      UniquenessLevel2.project = "project";
      UniquenessLevel2.group = "group";
      UniquenessLevel2.scheme = "scheme";
      UniquenessLevel2.global = "global";
    })(UniquenessLevel || (protocol_moniker.UniquenessLevel = UniquenessLevel = {}));
    var MonikerKind;
    (function(MonikerKind2) {
      MonikerKind2.$import = "import";
      MonikerKind2.$export = "export";
      MonikerKind2.local = "local";
    })(MonikerKind || (protocol_moniker.MonikerKind = MonikerKind = {}));
    var MonikerRequest;
    (function(MonikerRequest2) {
      MonikerRequest2.method = "textDocument/moniker";
      MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
    })(MonikerRequest || (protocol_moniker.MonikerRequest = MonikerRequest = {}));
    return protocol_moniker;
  }
  var protocol_typeHierarchy = {};
  var hasRequiredProtocol_typeHierarchy;
  function requireProtocol_typeHierarchy() {
    if (hasRequiredProtocol_typeHierarchy) return protocol_typeHierarchy;
    hasRequiredProtocol_typeHierarchy = 1;
    Object.defineProperty(protocol_typeHierarchy, "__esModule", { value: true });
    protocol_typeHierarchy.TypeHierarchySubtypesRequest = protocol_typeHierarchy.TypeHierarchySupertypesRequest = protocol_typeHierarchy.TypeHierarchyPrepareRequest = void 0;
    const messages_1 = requireMessages();
    var TypeHierarchyPrepareRequest;
    (function(TypeHierarchyPrepareRequest2) {
      TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
      TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
    })(TypeHierarchyPrepareRequest || (protocol_typeHierarchy.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
    var TypeHierarchySupertypesRequest;
    (function(TypeHierarchySupertypesRequest2) {
      TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
      TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
    })(TypeHierarchySupertypesRequest || (protocol_typeHierarchy.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
    var TypeHierarchySubtypesRequest;
    (function(TypeHierarchySubtypesRequest2) {
      TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
      TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
    })(TypeHierarchySubtypesRequest || (protocol_typeHierarchy.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
    return protocol_typeHierarchy;
  }
  var protocol_inlineValue = {};
  var hasRequiredProtocol_inlineValue;
  function requireProtocol_inlineValue() {
    if (hasRequiredProtocol_inlineValue) return protocol_inlineValue;
    hasRequiredProtocol_inlineValue = 1;
    Object.defineProperty(protocol_inlineValue, "__esModule", { value: true });
    protocol_inlineValue.InlineValueRefreshRequest = protocol_inlineValue.InlineValueRequest = void 0;
    const messages_1 = requireMessages();
    var InlineValueRequest;
    (function(InlineValueRequest2) {
      InlineValueRequest2.method = "textDocument/inlineValue";
      InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
    })(InlineValueRequest || (protocol_inlineValue.InlineValueRequest = InlineValueRequest = {}));
    var InlineValueRefreshRequest;
    (function(InlineValueRefreshRequest2) {
      InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
      InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
    })(InlineValueRefreshRequest || (protocol_inlineValue.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
    return protocol_inlineValue;
  }
  var protocol_inlayHint = {};
  var hasRequiredProtocol_inlayHint;
  function requireProtocol_inlayHint() {
    if (hasRequiredProtocol_inlayHint) return protocol_inlayHint;
    hasRequiredProtocol_inlayHint = 1;
    Object.defineProperty(protocol_inlayHint, "__esModule", { value: true });
    protocol_inlayHint.InlayHintRefreshRequest = protocol_inlayHint.InlayHintResolveRequest = protocol_inlayHint.InlayHintRequest = void 0;
    const messages_1 = requireMessages();
    var InlayHintRequest;
    (function(InlayHintRequest2) {
      InlayHintRequest2.method = "textDocument/inlayHint";
      InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
    })(InlayHintRequest || (protocol_inlayHint.InlayHintRequest = InlayHintRequest = {}));
    var InlayHintResolveRequest;
    (function(InlayHintResolveRequest2) {
      InlayHintResolveRequest2.method = "inlayHint/resolve";
      InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
    })(InlayHintResolveRequest || (protocol_inlayHint.InlayHintResolveRequest = InlayHintResolveRequest = {}));
    var InlayHintRefreshRequest;
    (function(InlayHintRefreshRequest2) {
      InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
      InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
    })(InlayHintRefreshRequest || (protocol_inlayHint.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
    return protocol_inlayHint;
  }
  var protocol_diagnostic = {};
  var hasRequiredProtocol_diagnostic;
  function requireProtocol_diagnostic() {
    if (hasRequiredProtocol_diagnostic) return protocol_diagnostic;
    hasRequiredProtocol_diagnostic = 1;
    Object.defineProperty(protocol_diagnostic, "__esModule", { value: true });
    protocol_diagnostic.DiagnosticRefreshRequest = protocol_diagnostic.WorkspaceDiagnosticRequest = protocol_diagnostic.DocumentDiagnosticRequest = protocol_diagnostic.DocumentDiagnosticReportKind = protocol_diagnostic.DiagnosticServerCancellationData = void 0;
    const vscode_jsonrpc_1 = requireMain$1();
    const Is2 = requireIs();
    const messages_1 = requireMessages();
    var DiagnosticServerCancellationData;
    (function(DiagnosticServerCancellationData2) {
      function is2(value) {
        const candidate = value;
        return candidate && Is2.boolean(candidate.retriggerRequest);
      }
      DiagnosticServerCancellationData2.is = is2;
    })(DiagnosticServerCancellationData || (protocol_diagnostic.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
    var DocumentDiagnosticReportKind;
    (function(DocumentDiagnosticReportKind2) {
      DocumentDiagnosticReportKind2.Full = "full";
      DocumentDiagnosticReportKind2.Unchanged = "unchanged";
    })(DocumentDiagnosticReportKind || (protocol_diagnostic.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
    var DocumentDiagnosticRequest;
    (function(DocumentDiagnosticRequest2) {
      DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
      DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
      DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(DocumentDiagnosticRequest || (protocol_diagnostic.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
    var WorkspaceDiagnosticRequest;
    (function(WorkspaceDiagnosticRequest2) {
      WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
      WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
      WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
    })(WorkspaceDiagnosticRequest || (protocol_diagnostic.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
    var DiagnosticRefreshRequest;
    (function(DiagnosticRefreshRequest2) {
      DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
      DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
    })(DiagnosticRefreshRequest || (protocol_diagnostic.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
    return protocol_diagnostic;
  }
  var protocol_notebook = {};
  var hasRequiredProtocol_notebook;
  function requireProtocol_notebook() {
    if (hasRequiredProtocol_notebook) return protocol_notebook;
    hasRequiredProtocol_notebook = 1;
    Object.defineProperty(protocol_notebook, "__esModule", { value: true });
    protocol_notebook.DidCloseNotebookDocumentNotification = protocol_notebook.DidSaveNotebookDocumentNotification = protocol_notebook.DidChangeNotebookDocumentNotification = protocol_notebook.NotebookCellArrayChange = protocol_notebook.DidOpenNotebookDocumentNotification = protocol_notebook.NotebookDocumentSyncRegistrationType = protocol_notebook.NotebookDocument = protocol_notebook.NotebookCell = protocol_notebook.ExecutionSummary = protocol_notebook.NotebookCellKind = void 0;
    const vscode_languageserver_types_1 = require$$1;
    const Is2 = requireIs();
    const messages_1 = requireMessages();
    var NotebookCellKind;
    (function(NotebookCellKind2) {
      NotebookCellKind2.Markup = 1;
      NotebookCellKind2.Code = 2;
      function is2(value) {
        return value === 1 || value === 2;
      }
      NotebookCellKind2.is = is2;
    })(NotebookCellKind || (protocol_notebook.NotebookCellKind = NotebookCellKind = {}));
    var ExecutionSummary;
    (function(ExecutionSummary2) {
      function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
          result.success = success;
        }
        return result;
      }
      ExecutionSummary2.create = create;
      function is2(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is2.boolean(candidate.success));
      }
      ExecutionSummary2.is = is2;
      function equals(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
      }
      ExecutionSummary2.equals = equals;
    })(ExecutionSummary || (protocol_notebook.ExecutionSummary = ExecutionSummary = {}));
    var NotebookCell;
    (function(NotebookCell2) {
      function create(kind, document2) {
        return { kind, document: document2 };
      }
      NotebookCell2.create = create;
      function is2(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is2.objectLiteral(candidate.metadata));
      }
      NotebookCell2.is = is2;
      function diff(one, two) {
        const result = /* @__PURE__ */ new Set();
        if (one.document !== two.document) {
          result.add("document");
        }
        if (one.kind !== two.kind) {
          result.add("kind");
        }
        if (one.executionSummary !== two.executionSummary) {
          result.add("executionSummary");
        }
        if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) {
          result.add("metadata");
        }
        if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
          result.add("executionSummary");
        }
        return result;
      }
      NotebookCell2.diff = diff;
      function equalsMetadata(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        if (typeof one !== typeof other) {
          return false;
        }
        if (typeof one !== "object") {
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
        if (Is2.objectLiteral(one) && Is2.objectLiteral(other)) {
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
    })(NotebookCell || (protocol_notebook.NotebookCell = NotebookCell = {}));
    var NotebookDocument;
    (function(NotebookDocument2) {
      function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
      }
      NotebookDocument2.create = create;
      function is2(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && Is2.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is2.typedArray(candidate.cells, NotebookCell.is);
      }
      NotebookDocument2.is = is2;
    })(NotebookDocument || (protocol_notebook.NotebookDocument = NotebookDocument = {}));
    var NotebookDocumentSyncRegistrationType;
    (function(NotebookDocumentSyncRegistrationType2) {
      NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
      NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
      NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType2.method);
    })(NotebookDocumentSyncRegistrationType || (protocol_notebook.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
    var DidOpenNotebookDocumentNotification;
    (function(DidOpenNotebookDocumentNotification2) {
      DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
      DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification2.method);
      DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidOpenNotebookDocumentNotification || (protocol_notebook.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
    var NotebookCellArrayChange;
    (function(NotebookCellArrayChange2) {
      function is2(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is2.typedArray(candidate.cells, NotebookCell.is));
      }
      NotebookCellArrayChange2.is = is2;
      function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== void 0) {
          result.cells = cells;
        }
        return result;
      }
      NotebookCellArrayChange2.create = create;
    })(NotebookCellArrayChange || (protocol_notebook.NotebookCellArrayChange = NotebookCellArrayChange = {}));
    var DidChangeNotebookDocumentNotification;
    (function(DidChangeNotebookDocumentNotification2) {
      DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
      DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification2.method);
      DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidChangeNotebookDocumentNotification || (protocol_notebook.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
    var DidSaveNotebookDocumentNotification;
    (function(DidSaveNotebookDocumentNotification2) {
      DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
      DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification2.method);
      DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidSaveNotebookDocumentNotification || (protocol_notebook.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
    var DidCloseNotebookDocumentNotification;
    (function(DidCloseNotebookDocumentNotification2) {
      DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
      DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification2.method);
      DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidCloseNotebookDocumentNotification || (protocol_notebook.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
    return protocol_notebook;
  }
  var protocol_inlineCompletion = {};
  var hasRequiredProtocol_inlineCompletion;
  function requireProtocol_inlineCompletion() {
    if (hasRequiredProtocol_inlineCompletion) return protocol_inlineCompletion;
    hasRequiredProtocol_inlineCompletion = 1;
    Object.defineProperty(protocol_inlineCompletion, "__esModule", { value: true });
    protocol_inlineCompletion.InlineCompletionRequest = void 0;
    const messages_1 = requireMessages();
    var InlineCompletionRequest;
    (function(InlineCompletionRequest2) {
      InlineCompletionRequest2.method = "textDocument/inlineCompletion";
      InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
    })(InlineCompletionRequest || (protocol_inlineCompletion.InlineCompletionRequest = InlineCompletionRequest = {}));
    return protocol_inlineCompletion;
  }
  var hasRequiredProtocol;
  function requireProtocol() {
    if (hasRequiredProtocol) return protocol;
    hasRequiredProtocol = 1;
    (function(exports$1) {
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.WorkspaceSymbolRequest = exports$1.CodeActionResolveRequest = exports$1.CodeActionRequest = exports$1.DocumentSymbolRequest = exports$1.DocumentHighlightRequest = exports$1.ReferencesRequest = exports$1.DefinitionRequest = exports$1.SignatureHelpRequest = exports$1.SignatureHelpTriggerKind = exports$1.HoverRequest = exports$1.CompletionResolveRequest = exports$1.CompletionRequest = exports$1.CompletionTriggerKind = exports$1.PublishDiagnosticsNotification = exports$1.WatchKind = exports$1.RelativePattern = exports$1.FileChangeType = exports$1.DidChangeWatchedFilesNotification = exports$1.WillSaveTextDocumentWaitUntilRequest = exports$1.WillSaveTextDocumentNotification = exports$1.TextDocumentSaveReason = exports$1.DidSaveTextDocumentNotification = exports$1.DidCloseTextDocumentNotification = exports$1.DidChangeTextDocumentNotification = exports$1.TextDocumentContentChangeEvent = exports$1.DidOpenTextDocumentNotification = exports$1.TextDocumentSyncKind = exports$1.TelemetryEventNotification = exports$1.LogMessageNotification = exports$1.ShowMessageRequest = exports$1.ShowMessageNotification = exports$1.MessageType = exports$1.DidChangeConfigurationNotification = exports$1.ExitNotification = exports$1.ShutdownRequest = exports$1.InitializedNotification = exports$1.InitializeErrorCodes = exports$1.InitializeRequest = exports$1.WorkDoneProgressOptions = exports$1.TextDocumentRegistrationOptions = exports$1.StaticRegistrationOptions = exports$1.PositionEncodingKind = exports$1.FailureHandlingKind = exports$1.ResourceOperationKind = exports$1.UnregistrationRequest = exports$1.RegistrationRequest = exports$1.DocumentSelector = exports$1.NotebookCellTextDocumentFilter = exports$1.NotebookDocumentFilter = exports$1.TextDocumentFilter = void 0;
      exports$1.MonikerRequest = exports$1.MonikerKind = exports$1.UniquenessLevel = exports$1.WillDeleteFilesRequest = exports$1.DidDeleteFilesNotification = exports$1.WillRenameFilesRequest = exports$1.DidRenameFilesNotification = exports$1.WillCreateFilesRequest = exports$1.DidCreateFilesNotification = exports$1.FileOperationPatternKind = exports$1.LinkedEditingRangeRequest = exports$1.ShowDocumentRequest = exports$1.SemanticTokensRegistrationType = exports$1.SemanticTokensRefreshRequest = exports$1.SemanticTokensRangeRequest = exports$1.SemanticTokensDeltaRequest = exports$1.SemanticTokensRequest = exports$1.TokenFormat = exports$1.CallHierarchyPrepareRequest = exports$1.CallHierarchyOutgoingCallsRequest = exports$1.CallHierarchyIncomingCallsRequest = exports$1.WorkDoneProgressCancelNotification = exports$1.WorkDoneProgressCreateRequest = exports$1.WorkDoneProgress = exports$1.SelectionRangeRequest = exports$1.DeclarationRequest = exports$1.FoldingRangeRefreshRequest = exports$1.FoldingRangeRequest = exports$1.ColorPresentationRequest = exports$1.DocumentColorRequest = exports$1.ConfigurationRequest = exports$1.DidChangeWorkspaceFoldersNotification = exports$1.WorkspaceFoldersRequest = exports$1.TypeDefinitionRequest = exports$1.ImplementationRequest = exports$1.ApplyWorkspaceEditRequest = exports$1.ExecuteCommandRequest = exports$1.PrepareRenameRequest = exports$1.RenameRequest = exports$1.PrepareSupportDefaultBehavior = exports$1.DocumentOnTypeFormattingRequest = exports$1.DocumentRangesFormattingRequest = exports$1.DocumentRangeFormattingRequest = exports$1.DocumentFormattingRequest = exports$1.DocumentLinkResolveRequest = exports$1.DocumentLinkRequest = exports$1.CodeLensRefreshRequest = exports$1.CodeLensResolveRequest = exports$1.CodeLensRequest = exports$1.WorkspaceSymbolResolveRequest = void 0;
      exports$1.InlineCompletionRequest = exports$1.DidCloseNotebookDocumentNotification = exports$1.DidSaveNotebookDocumentNotification = exports$1.DidChangeNotebookDocumentNotification = exports$1.NotebookCellArrayChange = exports$1.DidOpenNotebookDocumentNotification = exports$1.NotebookDocumentSyncRegistrationType = exports$1.NotebookDocument = exports$1.NotebookCell = exports$1.ExecutionSummary = exports$1.NotebookCellKind = exports$1.DiagnosticRefreshRequest = exports$1.WorkspaceDiagnosticRequest = exports$1.DocumentDiagnosticRequest = exports$1.DocumentDiagnosticReportKind = exports$1.DiagnosticServerCancellationData = exports$1.InlayHintRefreshRequest = exports$1.InlayHintResolveRequest = exports$1.InlayHintRequest = exports$1.InlineValueRefreshRequest = exports$1.InlineValueRequest = exports$1.TypeHierarchySupertypesRequest = exports$1.TypeHierarchySubtypesRequest = exports$1.TypeHierarchyPrepareRequest = void 0;
      const messages_1 = requireMessages();
      const vscode_languageserver_types_1 = require$$1;
      const Is2 = requireIs();
      const protocol_implementation_1 = requireProtocol_implementation();
      Object.defineProperty(exports$1, "ImplementationRequest", { enumerable: true, get: function() {
        return protocol_implementation_1.ImplementationRequest;
      } });
      const protocol_typeDefinition_1 = requireProtocol_typeDefinition();
      Object.defineProperty(exports$1, "TypeDefinitionRequest", { enumerable: true, get: function() {
        return protocol_typeDefinition_1.TypeDefinitionRequest;
      } });
      const protocol_workspaceFolder_1 = requireProtocol_workspaceFolder();
      Object.defineProperty(exports$1, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
        return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
      } });
      Object.defineProperty(exports$1, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
        return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
      } });
      const protocol_configuration_1 = requireProtocol_configuration();
      Object.defineProperty(exports$1, "ConfigurationRequest", { enumerable: true, get: function() {
        return protocol_configuration_1.ConfigurationRequest;
      } });
      const protocol_colorProvider_1 = requireProtocol_colorProvider();
      Object.defineProperty(exports$1, "DocumentColorRequest", { enumerable: true, get: function() {
        return protocol_colorProvider_1.DocumentColorRequest;
      } });
      Object.defineProperty(exports$1, "ColorPresentationRequest", { enumerable: true, get: function() {
        return protocol_colorProvider_1.ColorPresentationRequest;
      } });
      const protocol_foldingRange_1 = requireProtocol_foldingRange();
      Object.defineProperty(exports$1, "FoldingRangeRequest", { enumerable: true, get: function() {
        return protocol_foldingRange_1.FoldingRangeRequest;
      } });
      Object.defineProperty(exports$1, "FoldingRangeRefreshRequest", { enumerable: true, get: function() {
        return protocol_foldingRange_1.FoldingRangeRefreshRequest;
      } });
      const protocol_declaration_1 = requireProtocol_declaration();
      Object.defineProperty(exports$1, "DeclarationRequest", { enumerable: true, get: function() {
        return protocol_declaration_1.DeclarationRequest;
      } });
      const protocol_selectionRange_1 = requireProtocol_selectionRange();
      Object.defineProperty(exports$1, "SelectionRangeRequest", { enumerable: true, get: function() {
        return protocol_selectionRange_1.SelectionRangeRequest;
      } });
      const protocol_progress_1 = requireProtocol_progress();
      Object.defineProperty(exports$1, "WorkDoneProgress", { enumerable: true, get: function() {
        return protocol_progress_1.WorkDoneProgress;
      } });
      Object.defineProperty(exports$1, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
        return protocol_progress_1.WorkDoneProgressCreateRequest;
      } });
      Object.defineProperty(exports$1, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
        return protocol_progress_1.WorkDoneProgressCancelNotification;
      } });
      const protocol_callHierarchy_1 = requireProtocol_callHierarchy();
      Object.defineProperty(exports$1, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
        return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
      } });
      Object.defineProperty(exports$1, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
        return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
      } });
      Object.defineProperty(exports$1, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
        return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
      } });
      const protocol_semanticTokens_1 = requireProtocol_semanticTokens();
      Object.defineProperty(exports$1, "TokenFormat", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.TokenFormat;
      } });
      Object.defineProperty(exports$1, "SemanticTokensRequest", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.SemanticTokensRequest;
      } });
      Object.defineProperty(exports$1, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
      } });
      Object.defineProperty(exports$1, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.SemanticTokensRangeRequest;
      } });
      Object.defineProperty(exports$1, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
      } });
      Object.defineProperty(exports$1, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
        return protocol_semanticTokens_1.SemanticTokensRegistrationType;
      } });
      const protocol_showDocument_1 = requireProtocol_showDocument();
      Object.defineProperty(exports$1, "ShowDocumentRequest", { enumerable: true, get: function() {
        return protocol_showDocument_1.ShowDocumentRequest;
      } });
      const protocol_linkedEditingRange_1 = requireProtocol_linkedEditingRange();
      Object.defineProperty(exports$1, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
        return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
      } });
      const protocol_fileOperations_1 = requireProtocol_fileOperations();
      Object.defineProperty(exports$1, "FileOperationPatternKind", { enumerable: true, get: function() {
        return protocol_fileOperations_1.FileOperationPatternKind;
      } });
      Object.defineProperty(exports$1, "DidCreateFilesNotification", { enumerable: true, get: function() {
        return protocol_fileOperations_1.DidCreateFilesNotification;
      } });
      Object.defineProperty(exports$1, "WillCreateFilesRequest", { enumerable: true, get: function() {
        return protocol_fileOperations_1.WillCreateFilesRequest;
      } });
      Object.defineProperty(exports$1, "DidRenameFilesNotification", { enumerable: true, get: function() {
        return protocol_fileOperations_1.DidRenameFilesNotification;
      } });
      Object.defineProperty(exports$1, "WillRenameFilesRequest", { enumerable: true, get: function() {
        return protocol_fileOperations_1.WillRenameFilesRequest;
      } });
      Object.defineProperty(exports$1, "DidDeleteFilesNotification", { enumerable: true, get: function() {
        return protocol_fileOperations_1.DidDeleteFilesNotification;
      } });
      Object.defineProperty(exports$1, "WillDeleteFilesRequest", { enumerable: true, get: function() {
        return protocol_fileOperations_1.WillDeleteFilesRequest;
      } });
      const protocol_moniker_1 = requireProtocol_moniker();
      Object.defineProperty(exports$1, "UniquenessLevel", { enumerable: true, get: function() {
        return protocol_moniker_1.UniquenessLevel;
      } });
      Object.defineProperty(exports$1, "MonikerKind", { enumerable: true, get: function() {
        return protocol_moniker_1.MonikerKind;
      } });
      Object.defineProperty(exports$1, "MonikerRequest", { enumerable: true, get: function() {
        return protocol_moniker_1.MonikerRequest;
      } });
      const protocol_typeHierarchy_1 = requireProtocol_typeHierarchy();
      Object.defineProperty(exports$1, "TypeHierarchyPrepareRequest", { enumerable: true, get: function() {
        return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
      } });
      Object.defineProperty(exports$1, "TypeHierarchySubtypesRequest", { enumerable: true, get: function() {
        return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
      } });
      Object.defineProperty(exports$1, "TypeHierarchySupertypesRequest", { enumerable: true, get: function() {
        return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
      } });
      const protocol_inlineValue_1 = requireProtocol_inlineValue();
      Object.defineProperty(exports$1, "InlineValueRequest", { enumerable: true, get: function() {
        return protocol_inlineValue_1.InlineValueRequest;
      } });
      Object.defineProperty(exports$1, "InlineValueRefreshRequest", { enumerable: true, get: function() {
        return protocol_inlineValue_1.InlineValueRefreshRequest;
      } });
      const protocol_inlayHint_1 = requireProtocol_inlayHint();
      Object.defineProperty(exports$1, "InlayHintRequest", { enumerable: true, get: function() {
        return protocol_inlayHint_1.InlayHintRequest;
      } });
      Object.defineProperty(exports$1, "InlayHintResolveRequest", { enumerable: true, get: function() {
        return protocol_inlayHint_1.InlayHintResolveRequest;
      } });
      Object.defineProperty(exports$1, "InlayHintRefreshRequest", { enumerable: true, get: function() {
        return protocol_inlayHint_1.InlayHintRefreshRequest;
      } });
      const protocol_diagnostic_1 = requireProtocol_diagnostic();
      Object.defineProperty(exports$1, "DiagnosticServerCancellationData", { enumerable: true, get: function() {
        return protocol_diagnostic_1.DiagnosticServerCancellationData;
      } });
      Object.defineProperty(exports$1, "DocumentDiagnosticReportKind", { enumerable: true, get: function() {
        return protocol_diagnostic_1.DocumentDiagnosticReportKind;
      } });
      Object.defineProperty(exports$1, "DocumentDiagnosticRequest", { enumerable: true, get: function() {
        return protocol_diagnostic_1.DocumentDiagnosticRequest;
      } });
      Object.defineProperty(exports$1, "WorkspaceDiagnosticRequest", { enumerable: true, get: function() {
        return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
      } });
      Object.defineProperty(exports$1, "DiagnosticRefreshRequest", { enumerable: true, get: function() {
        return protocol_diagnostic_1.DiagnosticRefreshRequest;
      } });
      const protocol_notebook_1 = requireProtocol_notebook();
      Object.defineProperty(exports$1, "NotebookCellKind", { enumerable: true, get: function() {
        return protocol_notebook_1.NotebookCellKind;
      } });
      Object.defineProperty(exports$1, "ExecutionSummary", { enumerable: true, get: function() {
        return protocol_notebook_1.ExecutionSummary;
      } });
      Object.defineProperty(exports$1, "NotebookCell", { enumerable: true, get: function() {
        return protocol_notebook_1.NotebookCell;
      } });
      Object.defineProperty(exports$1, "NotebookDocument", { enumerable: true, get: function() {
        return protocol_notebook_1.NotebookDocument;
      } });
      Object.defineProperty(exports$1, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: function() {
        return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
      } });
      Object.defineProperty(exports$1, "DidOpenNotebookDocumentNotification", { enumerable: true, get: function() {
        return protocol_notebook_1.DidOpenNotebookDocumentNotification;
      } });
      Object.defineProperty(exports$1, "NotebookCellArrayChange", { enumerable: true, get: function() {
        return protocol_notebook_1.NotebookCellArrayChange;
      } });
      Object.defineProperty(exports$1, "DidChangeNotebookDocumentNotification", { enumerable: true, get: function() {
        return protocol_notebook_1.DidChangeNotebookDocumentNotification;
      } });
      Object.defineProperty(exports$1, "DidSaveNotebookDocumentNotification", { enumerable: true, get: function() {
        return protocol_notebook_1.DidSaveNotebookDocumentNotification;
      } });
      Object.defineProperty(exports$1, "DidCloseNotebookDocumentNotification", { enumerable: true, get: function() {
        return protocol_notebook_1.DidCloseNotebookDocumentNotification;
      } });
      const protocol_inlineCompletion_1 = requireProtocol_inlineCompletion();
      Object.defineProperty(exports$1, "InlineCompletionRequest", { enumerable: true, get: function() {
        return protocol_inlineCompletion_1.InlineCompletionRequest;
      } });
      var TextDocumentFilter;
      (function(TextDocumentFilter2) {
        function is2(value) {
          const candidate = value;
          return Is2.string(candidate) || (Is2.string(candidate.language) || Is2.string(candidate.scheme) || Is2.string(candidate.pattern));
        }
        TextDocumentFilter2.is = is2;
      })(TextDocumentFilter || (exports$1.TextDocumentFilter = TextDocumentFilter = {}));
      var NotebookDocumentFilter;
      (function(NotebookDocumentFilter2) {
        function is2(value) {
          const candidate = value;
          return Is2.objectLiteral(candidate) && (Is2.string(candidate.notebookType) || Is2.string(candidate.scheme) || Is2.string(candidate.pattern));
        }
        NotebookDocumentFilter2.is = is2;
      })(NotebookDocumentFilter || (exports$1.NotebookDocumentFilter = NotebookDocumentFilter = {}));
      var NotebookCellTextDocumentFilter;
      (function(NotebookCellTextDocumentFilter2) {
        function is2(value) {
          const candidate = value;
          return Is2.objectLiteral(candidate) && (Is2.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is2.string(candidate.language));
        }
        NotebookCellTextDocumentFilter2.is = is2;
      })(NotebookCellTextDocumentFilter || (exports$1.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
      var DocumentSelector;
      (function(DocumentSelector2) {
        function is2(value) {
          if (!Array.isArray(value)) {
            return false;
          }
          for (let elem of value) {
            if (!Is2.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
              return false;
            }
          }
          return true;
        }
        DocumentSelector2.is = is2;
      })(DocumentSelector || (exports$1.DocumentSelector = DocumentSelector = {}));
      var RegistrationRequest;
      (function(RegistrationRequest2) {
        RegistrationRequest2.method = "client/registerCapability";
        RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
        RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
      })(RegistrationRequest || (exports$1.RegistrationRequest = RegistrationRequest = {}));
      var UnregistrationRequest;
      (function(UnregistrationRequest2) {
        UnregistrationRequest2.method = "client/unregisterCapability";
        UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
        UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
      })(UnregistrationRequest || (exports$1.UnregistrationRequest = UnregistrationRequest = {}));
      var ResourceOperationKind;
      (function(ResourceOperationKind2) {
        ResourceOperationKind2.Create = "create";
        ResourceOperationKind2.Rename = "rename";
        ResourceOperationKind2.Delete = "delete";
      })(ResourceOperationKind || (exports$1.ResourceOperationKind = ResourceOperationKind = {}));
      var FailureHandlingKind;
      (function(FailureHandlingKind2) {
        FailureHandlingKind2.Abort = "abort";
        FailureHandlingKind2.Transactional = "transactional";
        FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
        FailureHandlingKind2.Undo = "undo";
      })(FailureHandlingKind || (exports$1.FailureHandlingKind = FailureHandlingKind = {}));
      var PositionEncodingKind;
      (function(PositionEncodingKind2) {
        PositionEncodingKind2.UTF8 = "utf-8";
        PositionEncodingKind2.UTF16 = "utf-16";
        PositionEncodingKind2.UTF32 = "utf-32";
      })(PositionEncodingKind || (exports$1.PositionEncodingKind = PositionEncodingKind = {}));
      var StaticRegistrationOptions;
      (function(StaticRegistrationOptions2) {
        function hasId(value) {
          const candidate = value;
          return candidate && Is2.string(candidate.id) && candidate.id.length > 0;
        }
        StaticRegistrationOptions2.hasId = hasId;
      })(StaticRegistrationOptions || (exports$1.StaticRegistrationOptions = StaticRegistrationOptions = {}));
      var TextDocumentRegistrationOptions;
      (function(TextDocumentRegistrationOptions2) {
        function is2(value) {
          const candidate = value;
          return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
        }
        TextDocumentRegistrationOptions2.is = is2;
      })(TextDocumentRegistrationOptions || (exports$1.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
      var WorkDoneProgressOptions;
      (function(WorkDoneProgressOptions2) {
        function is2(value) {
          const candidate = value;
          return Is2.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is2.boolean(candidate.workDoneProgress));
        }
        WorkDoneProgressOptions2.is = is2;
        function hasWorkDoneProgress(value) {
          const candidate = value;
          return candidate && Is2.boolean(candidate.workDoneProgress);
        }
        WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
      })(WorkDoneProgressOptions || (exports$1.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
      var InitializeRequest;
      (function(InitializeRequest2) {
        InitializeRequest2.method = "initialize";
        InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
      })(InitializeRequest || (exports$1.InitializeRequest = InitializeRequest = {}));
      var InitializeErrorCodes;
      (function(InitializeErrorCodes2) {
        InitializeErrorCodes2.unknownProtocolVersion = 1;
      })(InitializeErrorCodes || (exports$1.InitializeErrorCodes = InitializeErrorCodes = {}));
      var InitializedNotification;
      (function(InitializedNotification2) {
        InitializedNotification2.method = "initialized";
        InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
      })(InitializedNotification || (exports$1.InitializedNotification = InitializedNotification = {}));
      var ShutdownRequest;
      (function(ShutdownRequest2) {
        ShutdownRequest2.method = "shutdown";
        ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
      })(ShutdownRequest || (exports$1.ShutdownRequest = ShutdownRequest = {}));
      var ExitNotification;
      (function(ExitNotification2) {
        ExitNotification2.method = "exit";
        ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
      })(ExitNotification || (exports$1.ExitNotification = ExitNotification = {}));
      var DidChangeConfigurationNotification;
      (function(DidChangeConfigurationNotification2) {
        DidChangeConfigurationNotification2.method = "workspace/didChangeConfiguration";
        DidChangeConfigurationNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification2.method);
      })(DidChangeConfigurationNotification || (exports$1.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
      var MessageType2;
      (function(MessageType3) {
        MessageType3.Error = 1;
        MessageType3.Warning = 2;
        MessageType3.Info = 3;
        MessageType3.Log = 4;
        MessageType3.Debug = 5;
      })(MessageType2 || (exports$1.MessageType = MessageType2 = {}));
      var ShowMessageNotification;
      (function(ShowMessageNotification2) {
        ShowMessageNotification2.method = "window/showMessage";
        ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
        ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
      })(ShowMessageNotification || (exports$1.ShowMessageNotification = ShowMessageNotification = {}));
      var ShowMessageRequest;
      (function(ShowMessageRequest2) {
        ShowMessageRequest2.method = "window/showMessageRequest";
        ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
        ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
      })(ShowMessageRequest || (exports$1.ShowMessageRequest = ShowMessageRequest = {}));
      var LogMessageNotification;
      (function(LogMessageNotification2) {
        LogMessageNotification2.method = "window/logMessage";
        LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
        LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
      })(LogMessageNotification || (exports$1.LogMessageNotification = LogMessageNotification = {}));
      var TelemetryEventNotification;
      (function(TelemetryEventNotification2) {
        TelemetryEventNotification2.method = "telemetry/event";
        TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
        TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
      })(TelemetryEventNotification || (exports$1.TelemetryEventNotification = TelemetryEventNotification = {}));
      var TextDocumentSyncKind;
      (function(TextDocumentSyncKind2) {
        TextDocumentSyncKind2.None = 0;
        TextDocumentSyncKind2.Full = 1;
        TextDocumentSyncKind2.Incremental = 2;
      })(TextDocumentSyncKind || (exports$1.TextDocumentSyncKind = TextDocumentSyncKind = {}));
      var DidOpenTextDocumentNotification;
      (function(DidOpenTextDocumentNotification2) {
        DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
        DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
      })(DidOpenTextDocumentNotification || (exports$1.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
      var TextDocumentContentChangeEvent;
      (function(TextDocumentContentChangeEvent2) {
        function isIncremental(event) {
          let candidate = event;
          return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
        }
        TextDocumentContentChangeEvent2.isIncremental = isIncremental;
        function isFull(event) {
          let candidate = event;
          return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
        }
        TextDocumentContentChangeEvent2.isFull = isFull;
      })(TextDocumentContentChangeEvent || (exports$1.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
      var DidChangeTextDocumentNotification;
      (function(DidChangeTextDocumentNotification2) {
        DidChangeTextDocumentNotification2.method = "textDocument/didChange";
        DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
      })(DidChangeTextDocumentNotification || (exports$1.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
      var DidCloseTextDocumentNotification;
      (function(DidCloseTextDocumentNotification2) {
        DidCloseTextDocumentNotification2.method = "textDocument/didClose";
        DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
      })(DidCloseTextDocumentNotification || (exports$1.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
      var DidSaveTextDocumentNotification;
      (function(DidSaveTextDocumentNotification2) {
        DidSaveTextDocumentNotification2.method = "textDocument/didSave";
        DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
      })(DidSaveTextDocumentNotification || (exports$1.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
      var TextDocumentSaveReason;
      (function(TextDocumentSaveReason2) {
        TextDocumentSaveReason2.Manual = 1;
        TextDocumentSaveReason2.AfterDelay = 2;
        TextDocumentSaveReason2.FocusOut = 3;
      })(TextDocumentSaveReason || (exports$1.TextDocumentSaveReason = TextDocumentSaveReason = {}));
      var WillSaveTextDocumentNotification;
      (function(WillSaveTextDocumentNotification2) {
        WillSaveTextDocumentNotification2.method = "textDocument/willSave";
        WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
      })(WillSaveTextDocumentNotification || (exports$1.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
      var WillSaveTextDocumentWaitUntilRequest;
      (function(WillSaveTextDocumentWaitUntilRequest2) {
        WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
        WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
      })(WillSaveTextDocumentWaitUntilRequest || (exports$1.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
      var DidChangeWatchedFilesNotification;
      (function(DidChangeWatchedFilesNotification2) {
        DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
        DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
        DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification2.method);
      })(DidChangeWatchedFilesNotification || (exports$1.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
      var FileChangeType;
      (function(FileChangeType2) {
        FileChangeType2.Created = 1;
        FileChangeType2.Changed = 2;
        FileChangeType2.Deleted = 3;
      })(FileChangeType || (exports$1.FileChangeType = FileChangeType = {}));
      var RelativePattern;
      (function(RelativePattern2) {
        function is2(value) {
          const candidate = value;
          return Is2.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is2.string(candidate.pattern);
        }
        RelativePattern2.is = is2;
      })(RelativePattern || (exports$1.RelativePattern = RelativePattern = {}));
      var WatchKind;
      (function(WatchKind2) {
        WatchKind2.Create = 1;
        WatchKind2.Change = 2;
        WatchKind2.Delete = 4;
      })(WatchKind || (exports$1.WatchKind = WatchKind = {}));
      var PublishDiagnosticsNotification;
      (function(PublishDiagnosticsNotification2) {
        PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
        PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
        PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification2.method);
      })(PublishDiagnosticsNotification || (exports$1.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
      var CompletionTriggerKind;
      (function(CompletionTriggerKind2) {
        CompletionTriggerKind2.Invoked = 1;
        CompletionTriggerKind2.TriggerCharacter = 2;
        CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
      })(CompletionTriggerKind || (exports$1.CompletionTriggerKind = CompletionTriggerKind = {}));
      var CompletionRequest;
      (function(CompletionRequest2) {
        CompletionRequest2.method = "textDocument/completion";
        CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
      })(CompletionRequest || (exports$1.CompletionRequest = CompletionRequest = {}));
      var CompletionResolveRequest;
      (function(CompletionResolveRequest2) {
        CompletionResolveRequest2.method = "completionItem/resolve";
        CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
      })(CompletionResolveRequest || (exports$1.CompletionResolveRequest = CompletionResolveRequest = {}));
      var HoverRequest;
      (function(HoverRequest2) {
        HoverRequest2.method = "textDocument/hover";
        HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
      })(HoverRequest || (exports$1.HoverRequest = HoverRequest = {}));
      var SignatureHelpTriggerKind;
      (function(SignatureHelpTriggerKind2) {
        SignatureHelpTriggerKind2.Invoked = 1;
        SignatureHelpTriggerKind2.TriggerCharacter = 2;
        SignatureHelpTriggerKind2.ContentChange = 3;
      })(SignatureHelpTriggerKind || (exports$1.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
      var SignatureHelpRequest;
      (function(SignatureHelpRequest2) {
        SignatureHelpRequest2.method = "textDocument/signatureHelp";
        SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
      })(SignatureHelpRequest || (exports$1.SignatureHelpRequest = SignatureHelpRequest = {}));
      var DefinitionRequest;
      (function(DefinitionRequest2) {
        DefinitionRequest2.method = "textDocument/definition";
        DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
      })(DefinitionRequest || (exports$1.DefinitionRequest = DefinitionRequest = {}));
      var ReferencesRequest;
      (function(ReferencesRequest2) {
        ReferencesRequest2.method = "textDocument/references";
        ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
      })(ReferencesRequest || (exports$1.ReferencesRequest = ReferencesRequest = {}));
      var DocumentHighlightRequest;
      (function(DocumentHighlightRequest2) {
        DocumentHighlightRequest2.method = "textDocument/documentHighlight";
        DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
      })(DocumentHighlightRequest || (exports$1.DocumentHighlightRequest = DocumentHighlightRequest = {}));
      var DocumentSymbolRequest;
      (function(DocumentSymbolRequest2) {
        DocumentSymbolRequest2.method = "textDocument/documentSymbol";
        DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
      })(DocumentSymbolRequest || (exports$1.DocumentSymbolRequest = DocumentSymbolRequest = {}));
      var CodeActionRequest;
      (function(CodeActionRequest2) {
        CodeActionRequest2.method = "textDocument/codeAction";
        CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
      })(CodeActionRequest || (exports$1.CodeActionRequest = CodeActionRequest = {}));
      var CodeActionResolveRequest;
      (function(CodeActionResolveRequest2) {
        CodeActionResolveRequest2.method = "codeAction/resolve";
        CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
      })(CodeActionResolveRequest || (exports$1.CodeActionResolveRequest = CodeActionResolveRequest = {}));
      var WorkspaceSymbolRequest;
      (function(WorkspaceSymbolRequest2) {
        WorkspaceSymbolRequest2.method = "workspace/symbol";
        WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
      })(WorkspaceSymbolRequest || (exports$1.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
      var WorkspaceSymbolResolveRequest;
      (function(WorkspaceSymbolResolveRequest2) {
        WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
        WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
      })(WorkspaceSymbolResolveRequest || (exports$1.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
      var CodeLensRequest;
      (function(CodeLensRequest2) {
        CodeLensRequest2.method = "textDocument/codeLens";
        CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
      })(CodeLensRequest || (exports$1.CodeLensRequest = CodeLensRequest = {}));
      var CodeLensResolveRequest;
      (function(CodeLensResolveRequest2) {
        CodeLensResolveRequest2.method = "codeLens/resolve";
        CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
      })(CodeLensResolveRequest || (exports$1.CodeLensResolveRequest = CodeLensResolveRequest = {}));
      var CodeLensRefreshRequest;
      (function(CodeLensRefreshRequest2) {
        CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
        CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
        CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
      })(CodeLensRefreshRequest || (exports$1.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
      var DocumentLinkRequest;
      (function(DocumentLinkRequest2) {
        DocumentLinkRequest2.method = "textDocument/documentLink";
        DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
      })(DocumentLinkRequest || (exports$1.DocumentLinkRequest = DocumentLinkRequest = {}));
      var DocumentLinkResolveRequest;
      (function(DocumentLinkResolveRequest2) {
        DocumentLinkResolveRequest2.method = "documentLink/resolve";
        DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
      })(DocumentLinkResolveRequest || (exports$1.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
      var DocumentFormattingRequest;
      (function(DocumentFormattingRequest2) {
        DocumentFormattingRequest2.method = "textDocument/formatting";
        DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
      })(DocumentFormattingRequest || (exports$1.DocumentFormattingRequest = DocumentFormattingRequest = {}));
      var DocumentRangeFormattingRequest;
      (function(DocumentRangeFormattingRequest2) {
        DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
        DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
      })(DocumentRangeFormattingRequest || (exports$1.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
      var DocumentRangesFormattingRequest;
      (function(DocumentRangesFormattingRequest2) {
        DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
        DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
      })(DocumentRangesFormattingRequest || (exports$1.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
      var DocumentOnTypeFormattingRequest;
      (function(DocumentOnTypeFormattingRequest2) {
        DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
        DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
      })(DocumentOnTypeFormattingRequest || (exports$1.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
      var PrepareSupportDefaultBehavior;
      (function(PrepareSupportDefaultBehavior2) {
        PrepareSupportDefaultBehavior2.Identifier = 1;
      })(PrepareSupportDefaultBehavior || (exports$1.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
      var RenameRequest;
      (function(RenameRequest2) {
        RenameRequest2.method = "textDocument/rename";
        RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
      })(RenameRequest || (exports$1.RenameRequest = RenameRequest = {}));
      var PrepareRenameRequest;
      (function(PrepareRenameRequest2) {
        PrepareRenameRequest2.method = "textDocument/prepareRename";
        PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
      })(PrepareRenameRequest || (exports$1.PrepareRenameRequest = PrepareRenameRequest = {}));
      var ExecuteCommandRequest;
      (function(ExecuteCommandRequest2) {
        ExecuteCommandRequest2.method = "workspace/executeCommand";
        ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
        ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
      })(ExecuteCommandRequest || (exports$1.ExecuteCommandRequest = ExecuteCommandRequest = {}));
      var ApplyWorkspaceEditRequest;
      (function(ApplyWorkspaceEditRequest2) {
        ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
        ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
        ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
      })(ApplyWorkspaceEditRequest || (exports$1.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
    })(protocol);
    return protocol;
  }
  var connection = {};
  var hasRequiredConnection;
  function requireConnection() {
    if (hasRequiredConnection) return connection;
    hasRequiredConnection = 1;
    Object.defineProperty(connection, "__esModule", { value: true });
    connection.createProtocolConnection = void 0;
    const vscode_jsonrpc_1 = requireMain$1();
    function createProtocolConnection(input, output, logger, options) {
      if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
    }
    connection.createProtocolConnection = createProtocolConnection;
    return connection;
  }
  var hasRequiredApi;
  function requireApi() {
    if (hasRequiredApi) return api;
    hasRequiredApi = 1;
    (function(exports$1) {
      var __createBinding = api && api.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = api && api.__exportStar || function(m, exports$12) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
      };
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.LSPErrorCodes = exports$1.createProtocolConnection = void 0;
      __exportStar(requireMain$1(), exports$1);
      __exportStar(require$$1, exports$1);
      __exportStar(requireMessages(), exports$1);
      __exportStar(requireProtocol(), exports$1);
      var connection_1 = requireConnection();
      Object.defineProperty(exports$1, "createProtocolConnection", { enumerable: true, get: function() {
        return connection_1.createProtocolConnection;
      } });
      var LSPErrorCodes;
      (function(LSPErrorCodes2) {
        LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
        LSPErrorCodes2.RequestFailed = -32803;
        LSPErrorCodes2.ServerCancelled = -32802;
        LSPErrorCodes2.ContentModified = -32801;
        LSPErrorCodes2.RequestCancelled = -32800;
        LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
      })(LSPErrorCodes || (exports$1.LSPErrorCodes = LSPErrorCodes = {}));
    })(api);
    return api;
  }
  var hasRequiredMain;
  function requireMain() {
    if (hasRequiredMain) return main$2;
    hasRequiredMain = 1;
    (function(exports$1) {
      var __createBinding = main$2 && main$2.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = main$2 && main$2.__exportStar || function(m, exports$12) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
      };
      Object.defineProperty(exports$1, "__esModule", { value: true });
      exports$1.createProtocolConnection = void 0;
      const browser_1 = requireBrowser();
      __exportStar(requireBrowser(), exports$1);
      __exportStar(requireApi(), exports$1);
      function createProtocolConnection(reader, writer, logger, options) {
        return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
      }
      exports$1.createProtocolConnection = createProtocolConnection;
    })(main$2);
    return main$2;
  }
  var mainExports = requireMain();
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browser = { exports: {} };
  var process = browser.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
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
  var browserExports = browser.exports;
  const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
  var LIB;
  (() => {
    var t = { 975: (t2) => {
      function e2(t3) {
        if ("string" != typeof t3) throw new TypeError("Path must be a string. Received " + JSON.stringify(t3));
      }
      function r2(t3, e3) {
        for (var r3, n3 = "", i2 = 0, o2 = -1, s2 = 0, h2 = 0; h2 <= t3.length; ++h2) {
          if (h2 < t3.length) r3 = t3.charCodeAt(h2);
          else {
            if (47 === r3) break;
            r3 = 47;
          }
          if (47 === r3) {
            if (o2 === h2 - 1 || 1 === s2) ;
            else if (o2 !== h2 - 1 && 2 === s2) {
              if (n3.length < 2 || 2 !== i2 || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                if (n3.length > 2) {
                  var a2 = n3.lastIndexOf("/");
                  if (a2 !== n3.length - 1) {
                    -1 === a2 ? (n3 = "", i2 = 0) : i2 = (n3 = n3.slice(0, a2)).length - 1 - n3.lastIndexOf("/"), o2 = h2, s2 = 0;
                    continue;
                  }
                } else if (2 === n3.length || 1 === n3.length) {
                  n3 = "", i2 = 0, o2 = h2, s2 = 0;
                  continue;
                }
              }
              e3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i2 = 2);
            } else n3.length > 0 ? n3 += "/" + t3.slice(o2 + 1, h2) : n3 = t3.slice(o2 + 1, h2), i2 = h2 - o2 - 1;
            o2 = h2, s2 = 0;
          } else 46 === r3 && -1 !== s2 ? ++s2 : s2 = -1;
        }
        return n3;
      }
      var n2 = { resolve: function() {
        for (var t3, n3 = "", i2 = false, o2 = arguments.length - 1; o2 >= -1 && !i2; o2--) {
          var s2;
          o2 >= 0 ? s2 = arguments[o2] : (void 0 === t3 && (t3 = process$1.cwd()), s2 = t3), e2(s2), 0 !== s2.length && (n3 = s2 + "/" + n3, i2 = 47 === s2.charCodeAt(0));
        }
        return n3 = r2(n3, !i2), i2 ? n3.length > 0 ? "/" + n3 : "/" : n3.length > 0 ? n3 : ".";
      }, normalize: function(t3) {
        if (e2(t3), 0 === t3.length) return ".";
        var n3 = 47 === t3.charCodeAt(0), i2 = 47 === t3.charCodeAt(t3.length - 1);
        return 0 !== (t3 = r2(t3, !n3)).length || n3 || (t3 = "."), t3.length > 0 && i2 && (t3 += "/"), n3 ? "/" + t3 : t3;
      }, isAbsolute: function(t3) {
        return e2(t3), t3.length > 0 && 47 === t3.charCodeAt(0);
      }, join: function() {
        if (0 === arguments.length) return ".";
        for (var t3, r3 = 0; r3 < arguments.length; ++r3) {
          var i2 = arguments[r3];
          e2(i2), i2.length > 0 && (void 0 === t3 ? t3 = i2 : t3 += "/" + i2);
        }
        return void 0 === t3 ? "." : n2.normalize(t3);
      }, relative: function(t3, r3) {
        if (e2(t3), e2(r3), t3 === r3) return "";
        if ((t3 = n2.resolve(t3)) === (r3 = n2.resolve(r3))) return "";
        for (var i2 = 1; i2 < t3.length && 47 === t3.charCodeAt(i2); ++i2) ;
        for (var o2 = t3.length, s2 = o2 - i2, h2 = 1; h2 < r3.length && 47 === r3.charCodeAt(h2); ++h2) ;
        for (var a2 = r3.length - h2, c2 = s2 < a2 ? s2 : a2, f2 = -1, u2 = 0; u2 <= c2; ++u2) {
          if (u2 === c2) {
            if (a2 > c2) {
              if (47 === r3.charCodeAt(h2 + u2)) return r3.slice(h2 + u2 + 1);
              if (0 === u2) return r3.slice(h2 + u2);
            } else s2 > c2 && (47 === t3.charCodeAt(i2 + u2) ? f2 = u2 : 0 === u2 && (f2 = 0));
            break;
          }
          var l2 = t3.charCodeAt(i2 + u2);
          if (l2 !== r3.charCodeAt(h2 + u2)) break;
          47 === l2 && (f2 = u2);
        }
        var g2 = "";
        for (u2 = i2 + f2 + 1; u2 <= o2; ++u2) u2 !== o2 && 47 !== t3.charCodeAt(u2) || (0 === g2.length ? g2 += ".." : g2 += "/..");
        return g2.length > 0 ? g2 + r3.slice(h2 + f2) : (h2 += f2, 47 === r3.charCodeAt(h2) && ++h2, r3.slice(h2));
      }, _makeLong: function(t3) {
        return t3;
      }, dirname: function(t3) {
        if (e2(t3), 0 === t3.length) return ".";
        for (var r3 = t3.charCodeAt(0), n3 = 47 === r3, i2 = -1, o2 = true, s2 = t3.length - 1; s2 >= 1; --s2) if (47 === (r3 = t3.charCodeAt(s2))) {
          if (!o2) {
            i2 = s2;
            break;
          }
        } else o2 = false;
        return -1 === i2 ? n3 ? "/" : "." : n3 && 1 === i2 ? "//" : t3.slice(0, i2);
      }, basename: function(t3, r3) {
        if (void 0 !== r3 && "string" != typeof r3) throw new TypeError('"ext" argument must be a string');
        e2(t3);
        var n3, i2 = 0, o2 = -1, s2 = true;
        if (void 0 !== r3 && r3.length > 0 && r3.length <= t3.length) {
          if (r3.length === t3.length && r3 === t3) return "";
          var h2 = r3.length - 1, a2 = -1;
          for (n3 = t3.length - 1; n3 >= 0; --n3) {
            var c2 = t3.charCodeAt(n3);
            if (47 === c2) {
              if (!s2) {
                i2 = n3 + 1;
                break;
              }
            } else -1 === a2 && (s2 = false, a2 = n3 + 1), h2 >= 0 && (c2 === r3.charCodeAt(h2) ? -1 == --h2 && (o2 = n3) : (h2 = -1, o2 = a2));
          }
          return i2 === o2 ? o2 = a2 : -1 === o2 && (o2 = t3.length), t3.slice(i2, o2);
        }
        for (n3 = t3.length - 1; n3 >= 0; --n3) if (47 === t3.charCodeAt(n3)) {
          if (!s2) {
            i2 = n3 + 1;
            break;
          }
        } else -1 === o2 && (s2 = false, o2 = n3 + 1);
        return -1 === o2 ? "" : t3.slice(i2, o2);
      }, extname: function(t3) {
        e2(t3);
        for (var r3 = -1, n3 = 0, i2 = -1, o2 = true, s2 = 0, h2 = t3.length - 1; h2 >= 0; --h2) {
          var a2 = t3.charCodeAt(h2);
          if (47 !== a2) -1 === i2 && (o2 = false, i2 = h2 + 1), 46 === a2 ? -1 === r3 ? r3 = h2 : 1 !== s2 && (s2 = 1) : -1 !== r3 && (s2 = -1);
          else if (!o2) {
            n3 = h2 + 1;
            break;
          }
        }
        return -1 === r3 || -1 === i2 || 0 === s2 || 1 === s2 && r3 === i2 - 1 && r3 === n3 + 1 ? "" : t3.slice(r3, i2);
      }, format: function(t3) {
        if (null === t3 || "object" != typeof t3) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t3);
        return (function(t4, e3) {
          var r3 = e3.dir || e3.root, n3 = e3.base || (e3.name || "") + (e3.ext || "");
          return r3 ? r3 === e3.root ? r3 + n3 : r3 + "/" + n3 : n3;
        })(0, t3);
      }, parse: function(t3) {
        e2(t3);
        var r3 = { root: "", dir: "", base: "", ext: "", name: "" };
        if (0 === t3.length) return r3;
        var n3, i2 = t3.charCodeAt(0), o2 = 47 === i2;
        o2 ? (r3.root = "/", n3 = 1) : n3 = 0;
        for (var s2 = -1, h2 = 0, a2 = -1, c2 = true, f2 = t3.length - 1, u2 = 0; f2 >= n3; --f2) if (47 !== (i2 = t3.charCodeAt(f2))) -1 === a2 && (c2 = false, a2 = f2 + 1), 46 === i2 ? -1 === s2 ? s2 = f2 : 1 !== u2 && (u2 = 1) : -1 !== s2 && (u2 = -1);
        else if (!c2) {
          h2 = f2 + 1;
          break;
        }
        return -1 === s2 || -1 === a2 || 0 === u2 || 1 === u2 && s2 === a2 - 1 && s2 === h2 + 1 ? -1 !== a2 && (r3.base = r3.name = 0 === h2 && o2 ? t3.slice(1, a2) : t3.slice(h2, a2)) : (0 === h2 && o2 ? (r3.name = t3.slice(1, s2), r3.base = t3.slice(1, a2)) : (r3.name = t3.slice(h2, s2), r3.base = t3.slice(h2, a2)), r3.ext = t3.slice(s2, a2)), h2 > 0 ? r3.dir = t3.slice(0, h2 - 1) : o2 && (r3.dir = "/"), r3;
      }, sep: "/", delimiter: ":", win32: null, posix: null };
      n2.posix = n2, t2.exports = n2;
    } }, e = {};
    function r(n2) {
      var i2 = e[n2];
      if (void 0 !== i2) return i2.exports;
      var o2 = e[n2] = { exports: {} };
      return t[n2](o2, o2.exports, r), o2.exports;
    }
    r.d = (t2, e2) => {
      for (var n2 in e2) r.o(e2, n2) && !r.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: e2[n2] });
    }, r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r.r = (t2) => {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
    };
    var n = {};
    let i;
    if (r.r(n), r.d(n, { URI: () => l, Utils: () => I }), "object" == typeof process$1) i = "win32" === process$1.platform;
    else if ("object" == typeof navigator) {
      let t2 = navigator.userAgent;
      i = t2.indexOf("Windows") >= 0;
    }
    const o = /^\w[\w\d+.-]*$/, s = /^\//, h = /^\/\//;
    function a(t2, e2) {
      if (!t2.scheme && e2) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t2.authority}", path: "${t2.path}", query: "${t2.query}", fragment: "${t2.fragment}"}`);
      if (t2.scheme && !o.test(t2.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
      if (t2.path) {
        if (t2.authority) {
          if (!s.test(t2.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (h.test(t2.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const c = "", f = "/", u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class l {
      constructor(t2, e2, r2, n2, i2, o2 = false) {
        __publicField(this, "scheme");
        __publicField(this, "authority");
        __publicField(this, "path");
        __publicField(this, "query");
        __publicField(this, "fragment");
        "object" == typeof t2 ? (this.scheme = t2.scheme || c, this.authority = t2.authority || c, this.path = t2.path || c, this.query = t2.query || c, this.fragment = t2.fragment || c) : (this.scheme = /* @__PURE__ */ (function(t3, e3) {
          return t3 || e3 ? t3 : "file";
        })(t2, o2), this.authority = e2 || c, this.path = (function(t3, e3) {
          switch (t3) {
            case "https":
            case "http":
            case "file":
              e3 ? e3[0] !== f && (e3 = f + e3) : e3 = f;
          }
          return e3;
        })(this.scheme, r2 || c), this.query = n2 || c, this.fragment = i2 || c, a(this, o2));
      }
      static isUri(t2) {
        return t2 instanceof l || !!t2 && "string" == typeof t2.authority && "string" == typeof t2.fragment && "string" == typeof t2.path && "string" == typeof t2.query && "string" == typeof t2.scheme && "string" == typeof t2.fsPath && "function" == typeof t2.with && "function" == typeof t2.toString;
      }
      get fsPath() {
        return v(this);
      }
      with(t2) {
        if (!t2) return this;
        let { scheme: e2, authority: r2, path: n2, query: i2, fragment: o2 } = t2;
        return void 0 === e2 ? e2 = this.scheme : null === e2 && (e2 = c), void 0 === r2 ? r2 = this.authority : null === r2 && (r2 = c), void 0 === n2 ? n2 = this.path : null === n2 && (n2 = c), void 0 === i2 ? i2 = this.query : null === i2 && (i2 = c), void 0 === o2 ? o2 = this.fragment : null === o2 && (o2 = c), e2 === this.scheme && r2 === this.authority && n2 === this.path && i2 === this.query && o2 === this.fragment ? this : new d(e2, r2, n2, i2, o2);
      }
      static parse(t2, e2 = false) {
        const r2 = u.exec(t2);
        return r2 ? new d(r2[2] || c, w(r2[4] || c), w(r2[5] || c), w(r2[7] || c), w(r2[9] || c), e2) : new d(c, c, c, c, c);
      }
      static file(t2) {
        let e2 = c;
        if (i && (t2 = t2.replace(/\\/g, f)), t2[0] === f && t2[1] === f) {
          const r2 = t2.indexOf(f, 2);
          -1 === r2 ? (e2 = t2.substring(2), t2 = f) : (e2 = t2.substring(2, r2), t2 = t2.substring(r2) || f);
        }
        return new d("file", e2, t2, c, c);
      }
      static from(t2) {
        const e2 = new d(t2.scheme, t2.authority, t2.path, t2.query, t2.fragment);
        return a(e2, true), e2;
      }
      toString(t2 = false) {
        return b(this, t2);
      }
      toJSON() {
        return this;
      }
      static revive(t2) {
        if (t2) {
          if (t2 instanceof l) return t2;
          {
            const e2 = new d(t2);
            return e2._formatted = t2.external, e2._fsPath = t2._sep === g ? t2.fsPath : null, e2;
          }
        }
        return t2;
      }
    }
    const g = i ? 1 : void 0;
    class d extends l {
      constructor() {
        super(...arguments);
        __publicField(this, "_formatted", null);
        __publicField(this, "_fsPath", null);
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = v(this)), this._fsPath;
      }
      toString(t2 = false) {
        return t2 ? b(this, true) : (this._formatted || (this._formatted = b(this, false)), this._formatted);
      }
      toJSON() {
        const t2 = { $mid: 1 };
        return this._fsPath && (t2.fsPath = this._fsPath, t2._sep = g), this._formatted && (t2.external = this._formatted), this.path && (t2.path = this.path), this.scheme && (t2.scheme = this.scheme), this.authority && (t2.authority = this.authority), this.query && (t2.query = this.query), this.fragment && (t2.fragment = this.fragment), t2;
      }
    }
    const p = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function m(t2, e2, r2) {
      let n2, i2 = -1;
      for (let o2 = 0; o2 < t2.length; o2++) {
        const s2 = t2.charCodeAt(o2);
        if (s2 >= 97 && s2 <= 122 || s2 >= 65 && s2 <= 90 || s2 >= 48 && s2 <= 57 || 45 === s2 || 46 === s2 || 95 === s2 || 126 === s2 || e2 && 47 === s2 || r2 && 91 === s2 || r2 && 93 === s2 || r2 && 58 === s2) -1 !== i2 && (n2 += encodeURIComponent(t2.substring(i2, o2)), i2 = -1), void 0 !== n2 && (n2 += t2.charAt(o2));
        else {
          void 0 === n2 && (n2 = t2.substr(0, o2));
          const e3 = p[s2];
          void 0 !== e3 ? (-1 !== i2 && (n2 += encodeURIComponent(t2.substring(i2, o2)), i2 = -1), n2 += e3) : -1 === i2 && (i2 = o2);
        }
      }
      return -1 !== i2 && (n2 += encodeURIComponent(t2.substring(i2))), void 0 !== n2 ? n2 : t2;
    }
    function y(t2) {
      let e2;
      for (let r2 = 0; r2 < t2.length; r2++) {
        const n2 = t2.charCodeAt(r2);
        35 === n2 || 63 === n2 ? (void 0 === e2 && (e2 = t2.substr(0, r2)), e2 += p[n2]) : void 0 !== e2 && (e2 += t2[r2]);
      }
      return void 0 !== e2 ? e2 : t2;
    }
    function v(t2, e2) {
      let r2;
      return r2 = t2.authority && t2.path.length > 1 && "file" === t2.scheme ? `//${t2.authority}${t2.path}` : 47 === t2.path.charCodeAt(0) && (t2.path.charCodeAt(1) >= 65 && t2.path.charCodeAt(1) <= 90 || t2.path.charCodeAt(1) >= 97 && t2.path.charCodeAt(1) <= 122) && 58 === t2.path.charCodeAt(2) ? t2.path[1].toLowerCase() + t2.path.substr(2) : t2.path, i && (r2 = r2.replace(/\//g, "\\")), r2;
    }
    function b(t2, e2) {
      const r2 = e2 ? y : m;
      let n2 = "", { scheme: i2, authority: o2, path: s2, query: h2, fragment: a2 } = t2;
      if (i2 && (n2 += i2, n2 += ":"), (o2 || "file" === i2) && (n2 += f, n2 += f), o2) {
        let t3 = o2.indexOf("@");
        if (-1 !== t3) {
          const e3 = o2.substr(0, t3);
          o2 = o2.substr(t3 + 1), t3 = e3.lastIndexOf(":"), -1 === t3 ? n2 += r2(e3, false, false) : (n2 += r2(e3.substr(0, t3), false, false), n2 += ":", n2 += r2(e3.substr(t3 + 1), false, true)), n2 += "@";
        }
        o2 = o2.toLowerCase(), t3 = o2.lastIndexOf(":"), -1 === t3 ? n2 += r2(o2, false, true) : (n2 += r2(o2.substr(0, t3), false, true), n2 += o2.substr(t3));
      }
      if (s2) {
        if (s2.length >= 3 && 47 === s2.charCodeAt(0) && 58 === s2.charCodeAt(2)) {
          const t3 = s2.charCodeAt(1);
          t3 >= 65 && t3 <= 90 && (s2 = `/${String.fromCharCode(t3 + 32)}:${s2.substr(3)}`);
        } else if (s2.length >= 2 && 58 === s2.charCodeAt(1)) {
          const t3 = s2.charCodeAt(0);
          t3 >= 65 && t3 <= 90 && (s2 = `${String.fromCharCode(t3 + 32)}:${s2.substr(2)}`);
        }
        n2 += r2(s2, true, false);
      }
      return h2 && (n2 += "?", n2 += r2(h2, false, false)), a2 && (n2 += "#", n2 += e2 ? a2 : m(a2, false, false)), n2;
    }
    function C(t2) {
      try {
        return decodeURIComponent(t2);
      } catch {
        return t2.length > 3 ? t2.substr(0, 3) + C(t2.substr(3)) : t2;
      }
    }
    const A = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function w(t2) {
      return t2.match(A) ? t2.replace(A, ((t3) => C(t3))) : t2;
    }
    var x = r(975);
    const P = x.posix || x, _ = "/";
    var I;
    !(function(t2) {
      t2.joinPath = function(t3, ...e2) {
        return t3.with({ path: P.join(t3.path, ...e2) });
      }, t2.resolvePath = function(t3, ...e2) {
        let r2 = t3.path, n2 = false;
        r2[0] !== _ && (r2 = _ + r2, n2 = true);
        let i2 = P.resolve(r2, ...e2);
        return n2 && i2[0] === _ && !t3.authority && (i2 = i2.substring(1)), t3.with({ path: i2 });
      }, t2.dirname = function(t3) {
        if (0 === t3.path.length || t3.path === _) return t3;
        let e2 = P.dirname(t3.path);
        return 1 === e2.length && 46 === e2.charCodeAt(0) && (e2 = ""), t3.with({ path: e2 });
      }, t2.basename = function(t3) {
        return P.basename(t3.path);
      }, t2.extname = function(t3) {
        return P.extname(t3.path);
      };
    })(I || (I = {})), LIB = n;
  })();
  const { URI, Utils } = LIB;
  function notEmpty(value) {
    return value !== null && value !== void 0;
  }
  function isEmptyRange(range) {
    return range.start.row === range.end.row && range.start.column === range.end.column;
  }
  function mergeRanges(ranges) {
    var list = ranges;
    list = list.sort(function(a, b) {
      return comparePoints(a.start, b.start);
    });
    var next = list[0], range;
    for (var i = 1; i < list.length; i++) {
      range = next;
      next = list[i];
      var cmp = comparePoints(range.end, next.start);
      if (cmp < 0) continue;
      if (cmp == 0 && !isEmptyRange(range) && !isEmptyRange(next)) continue;
      if (comparePoints(range.end, next.end) < 0) {
        range.end.row = next.end.row;
        range.end.column = next.end.column;
      }
      list.splice(i, 1);
      next = range;
      i--;
    }
    return list;
  }
  function comparePoints(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
  }
  function checkValueAgainstRegexpArray(value, regexpArray) {
    if (!regexpArray) {
      return false;
    }
    for (let i = 0; i < regexpArray.length; i++) {
      if (regexpArray[i].test(value)) {
        return true;
      }
    }
    return false;
  }
  function convertToUri(filePath, joinWorkspaceURI = false, workspaceUri) {
    const isFullUri = filePath.startsWith("file://");
    const normalizedPath = filePath.replace(/\\/g, "/");
    let uri;
    if (isFullUri) {
      uri = URI.parse(normalizedPath);
    } else {
      uri = URI.file(normalizedPath);
    }
    if (joinWorkspaceURI && workspaceUri) {
      if (!workspaceUri.startsWith("file://")) {
        throw new Error("workspaceUri must be a file:// URI");
      }
      const workspaceUriParsed = URI.parse(workspaceUri);
      uri = Utils.joinPath(workspaceUriParsed, uri.path);
    }
    return uri.toString();
  }
  class AceRange {
    static getConstructor(editor) {
      if (!AceRange._instance && editor) {
        AceRange._instance = editor.getSelectionRange().constructor;
      }
      return AceRange._instance;
    }
  }
  var CommonConverter;
  ((CommonConverter2) => {
    function normalizeRanges(completions) {
      return completions && completions.map((el) => {
        if (el["range"]) {
          el["range"] = toRange2(el["range"]);
        }
        return el;
      });
    }
    CommonConverter2.normalizeRanges = normalizeRanges;
    function cleanHtml(html) {
      return html.replace(/<a\s/, "<a target='_blank' ");
    }
    CommonConverter2.cleanHtml = cleanHtml;
    function toRange2(range) {
      if (!range || !range.start || !range.end) {
        return;
      }
      let Range2 = AceRange.getConstructor();
      return Range2.fromPoints(range.start, range.end);
    }
    CommonConverter2.toRange = toRange2;
    function convertKind(kind) {
      switch (kind) {
        case "primitiveType":
        case "keyword":
          return mainExports.CompletionItemKind.Keyword;
        case "variable":
        case "localVariable":
          return mainExports.CompletionItemKind.Variable;
        case "memberVariable":
        case "memberGetAccessor":
        case "memberSetAccessor":
          return mainExports.CompletionItemKind.Field;
        case "function":
        case "memberFunction":
        case "constructSignature":
        case "callSignature":
        case "indexSignature":
          return mainExports.CompletionItemKind.Function;
        case "enum":
          return mainExports.CompletionItemKind.Enum;
        case "module":
          return mainExports.CompletionItemKind.Module;
        case "class":
          return mainExports.CompletionItemKind.Class;
        case "interface":
          return mainExports.CompletionItemKind.Interface;
        case "warning":
          return mainExports.CompletionItemKind.File;
      }
      return mainExports.CompletionItemKind.Property;
    }
    CommonConverter2.convertKind = convertKind;
    function excludeByErrorMessage(diagnostics, errorMessagesToIgnore, fieldName = "message") {
      if (!errorMessagesToIgnore)
        return diagnostics;
      return diagnostics.filter((el) => !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
    }
    CommonConverter2.excludeByErrorMessage = excludeByErrorMessage;
  })(CommonConverter || (CommonConverter = {}));
  class BaseMessage {
    constructor(documentIdentifier, callbackId) {
      this.sessionId = documentIdentifier.sessionId;
      this.documentUri = documentIdentifier.documentUri;
      this.callbackId = callbackId;
    }
  }
  class InitMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, version, mode, options) {
      super(documentIdentifier, callbackId);
      this.type = 0;
      this.version = version;
      this.options = options;
      this.mode = mode;
      this.value = value;
    }
  }
  class FormatMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, format) {
      super(documentIdentifier, callbackId);
      this.type = 1;
      this.value = value;
      this.format = format;
    }
  }
  class CompleteMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 2;
      this.value = value;
    }
  }
  class InlineCompleteMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 27;
      this.value = value;
    }
  }
  class ResolveCompletionMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 3;
      this.value = value;
    }
  }
  class HoverMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 5;
      this.value = value;
    }
  }
  class ValidateMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId) {
      super(documentIdentifier, callbackId);
      this.type = 6;
    }
  }
  class ChangeMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, version) {
      super(documentIdentifier, callbackId);
      this.type = 4;
      this.value = value;
      this.version = version;
    }
  }
  class DeltasMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, version) {
      super(documentIdentifier, callbackId);
      this.type = 7;
      this.value = value;
      this.version = version;
    }
  }
  class ChangeModeMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, version, mode) {
      super(documentIdentifier, callbackId);
      this.type = 8;
      this.value = value;
      this.mode = mode;
      this.version = version;
    }
  }
  class ChangeOptionsMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, options, merge = false) {
      super(documentIdentifier, callbackId);
      this.type = 9;
      this.options = options;
      this.merge = merge;
    }
  }
  class CloseDocumentMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId) {
      super(documentIdentifier, callbackId);
      this.type = 10;
    }
  }
  class CloseConnectionMessage {
    constructor(callbackId) {
      this.type = 15;
      this.callbackId = callbackId;
    }
  }
  class GlobalOptionsMessage {
    constructor(serviceName, options, merge) {
      this.type = 11;
      this.serviceName = serviceName;
      this.options = options;
      this.merge = merge;
    }
  }
  class ConfigureFeaturesMessage {
    constructor(serviceName, options) {
      this.type = 12;
      this.serviceName = serviceName;
      this.options = options;
    }
  }
  class SignatureHelpMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 13;
      this.value = value;
    }
  }
  class DocumentHighlightMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 14;
      this.value = value;
    }
  }
  class GetSemanticTokensMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value) {
      super(documentIdentifier, callbackId);
      this.type = 17;
      this.value = value;
    }
  }
  class GetCodeActionsMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, context) {
      super(documentIdentifier, callbackId);
      this.type = 18;
      this.value = value;
      this.context = context;
    }
  }
  class SetWorkspaceMessage {
    constructor(value) {
      this.type = 22;
      this.value = value;
    }
  }
  class ExecuteCommandMessage {
    constructor(serviceName, callbackId, command, args) {
      this.type = 19;
      this.serviceName = serviceName;
      this.callbackId = callbackId;
      this.value = command;
      this.args = args;
    }
  }
  class AppliedEditMessage {
    constructor(value, serviceName, callbackId) {
      this.type = 21;
      this.serviceName = serviceName;
      this.callbackId = callbackId;
      this.value = value;
    }
  }
  class RenameDocumentMessage extends BaseMessage {
    constructor(documentIdentifier, callbackId, value, version) {
      super(documentIdentifier, callbackId);
      this.type = 23;
      this.value = value;
      this.version = version;
    }
  }
  class SendRequestMessage {
    constructor(serviceName, callbackId, requestName, args) {
      this.type = 24;
      this.serviceName = serviceName;
      this.callbackId = callbackId;
      this.value = requestName;
      this.args = args;
    }
  }
  class SendResponseMessage {
    constructor(serviceName, callbackId, args) {
      this.type = 26;
      this.serviceName = serviceName;
      this.callbackId = callbackId;
      this.args = args;
    }
  }
  var MessageType = /* @__PURE__ */ ((MessageType2) => {
    MessageType2[MessageType2["init"] = 0] = "init";
    MessageType2[MessageType2["format"] = 1] = "format";
    MessageType2[MessageType2["complete"] = 2] = "complete";
    MessageType2[MessageType2["resolveCompletion"] = 3] = "resolveCompletion";
    MessageType2[MessageType2["change"] = 4] = "change";
    MessageType2[MessageType2["hover"] = 5] = "hover";
    MessageType2[MessageType2["validate"] = 6] = "validate";
    MessageType2[MessageType2["applyDelta"] = 7] = "applyDelta";
    MessageType2[MessageType2["changeMode"] = 8] = "changeMode";
    MessageType2[MessageType2["changeOptions"] = 9] = "changeOptions";
    MessageType2[MessageType2["closeDocument"] = 10] = "closeDocument";
    MessageType2[MessageType2["globalOptions"] = 11] = "globalOptions";
    MessageType2[MessageType2["configureFeatures"] = 12] = "configureFeatures";
    MessageType2[MessageType2["signatureHelp"] = 13] = "signatureHelp";
    MessageType2[MessageType2["documentHighlight"] = 14] = "documentHighlight";
    MessageType2[MessageType2["closeConnection"] = 15] = "closeConnection";
    MessageType2[MessageType2["capabilitiesChange"] = 16] = "capabilitiesChange";
    MessageType2[MessageType2["getSemanticTokens"] = 17] = "getSemanticTokens";
    MessageType2[MessageType2["getCodeActions"] = 18] = "getCodeActions";
    MessageType2[MessageType2["executeCommand"] = 19] = "executeCommand";
    MessageType2[MessageType2["applyEdit"] = 20] = "applyEdit";
    MessageType2[MessageType2["appliedEdit"] = 21] = "appliedEdit";
    MessageType2[MessageType2["setWorkspace"] = 22] = "setWorkspace";
    MessageType2[MessageType2["renameDocument"] = 23] = "renameDocument";
    MessageType2[MessageType2["sendRequest"] = 24] = "sendRequest";
    MessageType2[MessageType2["showDocument"] = 25] = "showDocument";
    MessageType2[MessageType2["sendResponse"] = 26] = "sendResponse";
    MessageType2[MessageType2["inlineComplete"] = 27] = "inlineComplete";
    return MessageType2;
  })(MessageType || {});
  class MessageController {
    constructor(worker, provider) {
      this.callbacks = {};
      this.callbackId = 1;
      this.$worker = worker;
      this.provider = provider;
      this.$worker.addEventListener("message", (e) => {
        var _a, _b;
        const message = e.data;
        const callbackId = message.callbackId;
        switch (message.type) {
          case MessageType.validate:
          case MessageType.capabilitiesChange:
            const sessionId = this.getSessionIdByUri(message.documentUri);
            if (!sessionId) {
              return;
            }
            if (message.type === MessageType.validate) {
              (_a = this.provider.$sessionLanguageProviders[sessionId]) == null ? void 0 : _a.$showAnnotations(message.value);
            } else {
              (_b = this.provider.$sessionLanguageProviders[sessionId]) == null ? void 0 : _b.setServerCapabilities(message.value);
            }
            break;
          case MessageType.applyEdit:
            const applied = (result, serviceName) => {
              this.$worker.postMessage(new AppliedEditMessage(result, serviceName, message.callbackId));
            };
            this.provider.applyEdit(message.value, message.serviceName, applied);
            break;
          case MessageType.showDocument:
            const sendResponse = (result, serviceName) => {
              this.$worker.postMessage(new SendResponseMessage(serviceName, message.callbackId, result));
            };
            this.provider.showDocument(message, message.serviceName, sendResponse);
            break;
          default:
            if (this.callbacks[callbackId]) {
              this.callbacks[callbackId](message.value);
              delete this.callbacks[callbackId];
            }
            break;
        }
      });
    }
    getSessionIdByUri(documentUri) {
      if (!documentUri) {
        return;
      }
      return this.provider.$urisToSessionsIds[documentUri] || this.provider.$urisToSessionsIds[convertToUri(documentUri)];
    }
    init(documentIdentifier, document2, mode, options, initCallback) {
      this.postMessage(new InitMessage(documentIdentifier, this.callbackId++, document2.getValue(), document2["version"], mode, options), initCallback);
    }
    doValidation(documentIdentifier, callback) {
      this.postMessage(new ValidateMessage(documentIdentifier, this.callbackId++), callback);
    }
    doComplete(documentIdentifier, position, callback) {
      this.postMessage(new CompleteMessage(documentIdentifier, this.callbackId++, position), callback);
    }
    doInlineComplete(documentIdentifier, position, callback) {
      this.postMessage(new InlineCompleteMessage(documentIdentifier, this.callbackId++, position), callback);
    }
    doResolve(documentIdentifier, completion, callback) {
      this.postMessage(new ResolveCompletionMessage(documentIdentifier, this.callbackId++, completion), callback);
    }
    format(documentIdentifier, range, format, callback) {
      this.postMessage(new FormatMessage(documentIdentifier, this.callbackId++, range, format), callback);
    }
    doHover(documentIdentifier, position, callback) {
      this.postMessage(new HoverMessage(documentIdentifier, this.callbackId++, position), callback);
    }
    change(documentIdentifier, deltas, document2, callback) {
      let message;
      if (deltas.length > 50 && deltas.length > document2.getLength() >> 1) {
        message = new ChangeMessage(documentIdentifier, this.callbackId++, document2.getValue(), document2.version);
      } else {
        message = new DeltasMessage(documentIdentifier, this.callbackId++, deltas, document2.version);
      }
      this.postMessage(message, callback);
    }
    changeMode(documentIdentifier, value, version, mode, callback) {
      this.postMessage(new ChangeModeMessage(documentIdentifier, this.callbackId++, value, version, mode), callback);
    }
    changeOptions(documentIdentifier, options, callback, merge = false) {
      this.postMessage(new ChangeOptionsMessage(documentIdentifier, this.callbackId++, options, merge), callback);
    }
    closeDocument(documentIdentifier, callback) {
      this.postMessage(new CloseDocumentMessage(documentIdentifier, this.callbackId++), callback);
    }
    closeConnection(callback) {
      this.postMessage(new CloseConnectionMessage(this.callbackId++), callback);
    }
    setGlobalOptions(serviceName, options, merge = false) {
      this.$worker.postMessage(new GlobalOptionsMessage(serviceName, options, merge));
    }
    provideSignatureHelp(documentIdentifier, position, callback) {
      this.postMessage(new SignatureHelpMessage(documentIdentifier, this.callbackId++, position), callback);
    }
    findDocumentHighlights(documentIdentifier, position, callback) {
      this.postMessage(new DocumentHighlightMessage(documentIdentifier, this.callbackId++, position), callback);
    }
    configureFeatures(serviceName, features) {
      this.$worker.postMessage(new ConfigureFeaturesMessage(serviceName, features));
    }
    getSemanticTokens(documentIdentifier, range, callback) {
      this.postMessage(new GetSemanticTokensMessage(documentIdentifier, this.callbackId++, range), callback);
    }
    getCodeActions(documentIdentifier, range, context, callback) {
      this.postMessage(new GetCodeActionsMessage(documentIdentifier, this.callbackId++, range, context), callback);
    }
    executeCommand(serviceName, command, args, callback) {
      this.postMessage(new ExecuteCommandMessage(serviceName, this.callbackId++, command, args), callback);
    }
    setWorkspace(workspaceUri, callback) {
      this.$worker.postMessage(new SetWorkspaceMessage(workspaceUri));
    }
    renameDocument(documentIdentifier, newDocumentUri, version) {
      this.$worker.postMessage(new RenameDocumentMessage(documentIdentifier, this.callbackId++, newDocumentUri, version));
    }
    sendRequest(serviceName, requestName, args, callback) {
      this.postMessage(new SendRequestMessage(serviceName, this.callbackId++, requestName, args), callback);
    }
    postMessage(message, callback) {
      if (callback) {
        this.callbacks[message.callbackId] = callback;
      }
      this.$worker.postMessage(message);
    }
  }
  function fromRange(range) {
    return {
      start: {
        line: range.start.row,
        character: range.start.column
      },
      end: { line: range.end.row, character: range.end.column }
    };
  }
  function rangeFromPositions(start, end) {
    return {
      start,
      end
    };
  }
  function toRange(range) {
    return {
      start: {
        row: range.start.line,
        column: range.start.character
      },
      end: {
        row: range.end.line,
        column: range.end.character
      }
    };
  }
  function fromPoint(point) {
    return { line: point.row, character: point.column };
  }
  function toAnnotations(diagnostics) {
    return diagnostics == null ? void 0 : diagnostics.map((el) => {
      const annotation = {
        row: el.range.start.line,
        column: el.range.start.character,
        text: el.message,
        type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info",
        code: el.code,
        data: el.data
      };
      return annotation;
    });
  }
  function fromAnnotations(annotations) {
    return annotations == null ? void 0 : annotations.map((el) => {
      return {
        range: {
          start: {
            line: el.row,
            character: el.column
          },
          end: {
            line: el.row,
            character: el.column
          }
        },
        message: el.text,
        severity: el.type === "error" ? 1 : el.type === "warning" ? 2 : 3,
        code: el["code"],
        data: el["data"]
      };
    });
  }
  function toCompletion(item) {
    var _a, _b, _c, _d;
    let itemKind = item.kind;
    let kind = itemKind ? Object.keys(mainExports.CompletionItemKind)[Object.values(mainExports.CompletionItemKind).indexOf(itemKind)] : void 0;
    let text = (_c = (_b = (_a = item.textEdit) == null ? void 0 : _a.newText) != null ? _b : item.insertText) != null ? _c : item.label;
    let filterText;
    if (item.filterText) {
      const firstWordMatch = item.filterText.match(/\w+/);
      const firstWord = firstWordMatch ? firstWordMatch[0] : null;
      if (firstWord) {
        const wordRegex = new RegExp(`\\b${firstWord}\\b`, "i");
        if (!wordRegex.test(text)) {
          text = `${item.filterText} ${text}`;
          filterText = item.filterText;
        }
      } else {
        if (!text.includes(item.filterText)) {
          text = `${item.filterText} ${text}`;
          filterText = item.filterText;
        }
      }
    }
    let command = ((_d = item.command) == null ? void 0 : _d.command) == "editor.action.triggerSuggest" ? "startAutocomplete" : void 0;
    let range = item.textEdit ? getTextEditRange(item.textEdit, filterText) : void 0;
    let completion = {
      meta: kind,
      caption: item.label,
      score: void 0
    };
    completion["command"] = command;
    completion["range"] = range;
    completion["item"] = item;
    if (item.insertTextFormat == mainExports.InsertTextFormat.Snippet) {
      completion["snippet"] = text;
    } else {
      completion["value"] = text != null ? text : "";
    }
    completion["documentation"] = item.documentation;
    completion["position"] = item["position"];
    completion["service"] = item["service"];
    return completion;
  }
  function toCompletions(completions) {
    if (completions.length > 0) {
      let combinedCompletions = getCompletionItems(completions);
      return combinedCompletions.map((item) => toCompletion(item));
    }
    return [];
  }
  function getCompletionItems(completions) {
    return completions.map((el) => {
      if (!el.completions) {
        return [];
      }
      let allCompletions;
      if (Array.isArray(el.completions)) {
        allCompletions = el.completions;
      } else {
        allCompletions = el.completions.items;
      }
      return allCompletions.map((item) => {
        item["service"] = el.service;
        return item;
      });
    }).flat();
  }
  function toInlineCompletion(item) {
    var _a;
    let text = typeof item.insertText === "string" ? item.insertText : item.insertText.value;
    let filterText;
    if (item.filterText) {
      const firstWordMatch = item.filterText.match(/\w+/);
      const firstWord = firstWordMatch ? firstWordMatch[0] : null;
      if (firstWord) {
        const wordRegex = new RegExp(`\\b${firstWord}\\b`, "i");
        if (!wordRegex.test(text)) {
          text = `${item.filterText} ${text}`;
          filterText = item.filterText;
        }
      } else {
        if (!text.includes(item.filterText)) {
          text = `${item.filterText} ${text}`;
          filterText = item.filterText;
        }
      }
    }
    let command = ((_a = item.command) == null ? void 0 : _a.command) == "editor.action.triggerSuggest" ? "startAutocomplete" : void 0;
    let range = item.range ? getInlineCompletionRange(item.range, filterText) : void 0;
    let completion = {};
    completion["command"] = command;
    completion["range"] = range;
    completion["item"] = item;
    if (typeof item.insertText !== "string") {
      completion["snippet"] = text;
    } else {
      completion["value"] = text != null ? text : "";
    }
    completion["position"] = item["position"];
    completion["service"] = item["service"];
    return completion;
  }
  function toInlineCompletions(completions) {
    if (completions.length > 0) {
      let combinedCompletions = getCompletionItems(completions);
      return combinedCompletions.map((item) => toInlineCompletion(item));
    }
    return [];
  }
  function toResolvedCompletion(completion, item) {
    completion["docMarkdown"] = fromMarkupContent(item.documentation);
    return completion;
  }
  function toCompletionItem(completion) {
    var _a, _b, _c;
    let command;
    if (completion["command"]) {
      command = {
        title: "triggerSuggest",
        command: completion["command"]
      };
    }
    let completionItem = {
      label: (_a = completion.caption) != null ? _a : "",
      kind: CommonConverter.convertKind(completion.meta),
      command,
      insertTextFormat: completion["snippet"] ? mainExports.InsertTextFormat.Snippet : mainExports.InsertTextFormat.PlainText,
      documentation: completion["documentation"]
    };
    if (completion["range"]) {
      completionItem.textEdit = {
        range: fromRange(completion["range"]),
        newText: (_b = completion["snippet"]) != null ? _b : completion["value"]
      };
    } else {
      completionItem.insertText = (_c = completion["snippet"]) != null ? _c : completion["value"];
    }
    completionItem["fileName"] = completion["fileName"];
    completionItem["position"] = completion["position"];
    completionItem["item"] = completion["item"];
    completionItem["service"] = completion["service"];
    return completionItem;
  }
  function getTextEditRange(textEdit, filterText) {
    const filterLength = filterText ? filterText.length : 0;
    if ("insert" in textEdit && "replace" in textEdit) {
      let mergedRanges = mergeRanges([toRange(textEdit.insert), toRange(textEdit.replace)]);
      return mergedRanges[0];
    } else {
      textEdit.range.start.character -= filterLength;
      return toRange(textEdit.range);
    }
  }
  function getInlineCompletionRange(range, filterText) {
    const filterLength = filterText ? filterText.length : 0;
    range.start.character -= filterLength;
    return toRange(range);
  }
  function toTooltip(hover) {
    var _a;
    if (!hover)
      return;
    let content = hover.map((el) => {
      if (!el || !el.contents)
        return;
      if (mainExports.MarkupContent.is(el.contents)) {
        return fromMarkupContent(el.contents);
      } else if (mainExports.MarkedString.is(el.contents)) {
        if (typeof el.contents === "string") {
          return el.contents;
        }
        return "```" + el.contents.value + "```";
      } else {
        let contents = el.contents.map((el2) => {
          if (typeof el2 !== "string") {
            return `\`\`\`${el2.value}\`\`\``;
          } else {
            return el2;
          }
        });
        return contents.join("\n\n");
      }
    }).filter(notEmpty);
    if (content.length === 0)
      return;
    let lspRange = (_a = hover.find((el) => el == null ? void 0 : el.range)) == null ? void 0 : _a.range;
    let range;
    if (lspRange) range = toRange(lspRange);
    return {
      content: {
        type: "markdown",
        text: content.join("\n\n")
      },
      range
    };
  }
  function fromSignatureHelp(signatureHelp) {
    if (!signatureHelp)
      return;
    let content = signatureHelp.map((el) => {
      if (!el)
        return;
      let signatureIndex = (el == null ? void 0 : el.activeSignature) || 0;
      let activeSignature = el.signatures[signatureIndex];
      if (!activeSignature)
        return;
      let activeParam = el == null ? void 0 : el.activeParameter;
      let contents = activeSignature.label;
      if (activeParam != void 0 && activeSignature.parameters && activeSignature.parameters[activeParam]) {
        let param = activeSignature.parameters[activeParam].label;
        if (typeof param == "string") {
          contents = contents.replace(param, `**${param}**`);
        }
      }
      if (activeSignature.documentation) {
        if (mainExports.MarkupContent.is(activeSignature.documentation)) {
          return contents + "\n\n" + fromMarkupContent(activeSignature.documentation);
        } else {
          contents += "\n\n" + activeSignature.documentation;
          return contents;
        }
      } else {
        return contents;
      }
    }).filter(notEmpty);
    if (content.length === 0)
      return;
    return {
      content: {
        type: "markdown",
        text: content.join("\n\n")
      }
    };
  }
  function fromMarkupContent(content) {
    if (!content)
      return;
    if (typeof content === "string") {
      return content;
    } else {
      return content.value;
    }
  }
  function fromAceDelta(delta, eol) {
    const text = delta.lines.length > 1 ? delta.lines.join(eol) : delta.lines[0];
    return {
      range: delta.action === "insert" ? rangeFromPositions(fromPoint(delta.start), fromPoint(delta.start)) : rangeFromPositions(fromPoint(delta.start), fromPoint(delta.end)),
      text: delta.action === "insert" ? text : ""
    };
  }
  function fromDocumentHighlights(documentHighlights) {
    return documentHighlights.map(function(el) {
      let className = el.kind == 2 ? "language_highlight_read" : el.kind == 3 ? "language_highlight_write" : "language_highlight_text";
      return toMarkerGroupItem(CommonConverter.toRange(toRange(el.range)), className);
    });
  }
  function mapSeverityToClassName(severity) {
    if (!severity)
      return "language_highlight_info";
    switch (severity) {
      case 1:
        return "language_highlight_error";
      case 2:
        return "language_highlight_warning";
      case 3:
      case 4:
        return "language_highlight_info";
    }
  }
  function toMarkerGroupItem(range, className, tooltipText) {
    let markerGroupItem = {
      range,
      className
    };
    if (tooltipText) {
      markerGroupItem["tooltipText"] = tooltipText;
    }
    return markerGroupItem;
  }
  var showdown$2 = { exports: {} };
  var showdown$1 = showdown$2.exports;
  var hasRequiredShowdown;
  function requireShowdown() {
    if (hasRequiredShowdown) return showdown$2.exports;
    hasRequiredShowdown = 1;
    (function(module2) {
      (function() {
        function getDefaultOpts(simple) {
          var defaultOptions = {
            omitExtraWLInCodeBlocks: {
              defaultValue: false,
              describe: "Omit the default extra whiteline added to code blocks",
              type: "boolean"
            },
            noHeaderId: {
              defaultValue: false,
              describe: "Turn on/off generated header id",
              type: "boolean"
            },
            prefixHeaderId: {
              defaultValue: false,
              describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
              type: "string"
            },
            rawPrefixHeaderId: {
              defaultValue: false,
              describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
              type: "boolean"
            },
            ghCompatibleHeaderId: {
              defaultValue: false,
              describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
              type: "boolean"
            },
            rawHeaderId: {
              defaultValue: false,
              describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
              type: "boolean"
            },
            headerLevelStart: {
              defaultValue: false,
              describe: "The header blocks level start",
              type: "integer"
            },
            parseImgDimensions: {
              defaultValue: false,
              describe: "Turn on/off image dimension parsing",
              type: "boolean"
            },
            simplifiedAutoLink: {
              defaultValue: false,
              describe: "Turn on/off GFM autolink style",
              type: "boolean"
            },
            excludeTrailingPunctuationFromURLs: {
              defaultValue: false,
              describe: "Excludes trailing punctuation from links generated with autoLinking",
              type: "boolean"
            },
            literalMidWordUnderscores: {
              defaultValue: false,
              describe: "Parse midword underscores as literal underscores",
              type: "boolean"
            },
            literalMidWordAsterisks: {
              defaultValue: false,
              describe: "Parse midword asterisks as literal asterisks",
              type: "boolean"
            },
            strikethrough: {
              defaultValue: false,
              describe: "Turn on/off strikethrough support",
              type: "boolean"
            },
            tables: {
              defaultValue: false,
              describe: "Turn on/off tables support",
              type: "boolean"
            },
            tablesHeaderId: {
              defaultValue: false,
              describe: "Add an id to table headers",
              type: "boolean"
            },
            ghCodeBlocks: {
              defaultValue: true,
              describe: "Turn on/off GFM fenced code blocks support",
              type: "boolean"
            },
            tasklists: {
              defaultValue: false,
              describe: "Turn on/off GFM tasklist support",
              type: "boolean"
            },
            smoothLivePreview: {
              defaultValue: false,
              describe: "Prevents weird effects in live previews due to incomplete input",
              type: "boolean"
            },
            smartIndentationFix: {
              defaultValue: false,
              describe: "Tries to smartly fix indentation in es6 strings",
              type: "boolean"
            },
            disableForced4SpacesIndentedSublists: {
              defaultValue: false,
              describe: "Disables the requirement of indenting nested sublists by 4 spaces",
              type: "boolean"
            },
            simpleLineBreaks: {
              defaultValue: false,
              describe: "Parses simple line breaks as <br> (GFM Style)",
              type: "boolean"
            },
            requireSpaceBeforeHeadingText: {
              defaultValue: false,
              describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
              type: "boolean"
            },
            ghMentions: {
              defaultValue: false,
              describe: "Enables github @mentions",
              type: "boolean"
            },
            ghMentionsLink: {
              defaultValue: "https://github.com/{u}",
              describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
              type: "string"
            },
            encodeEmails: {
              defaultValue: true,
              describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
              type: "boolean"
            },
            openLinksInNewWindow: {
              defaultValue: false,
              describe: "Open all links in new windows",
              type: "boolean"
            },
            backslashEscapesHTMLTags: {
              defaultValue: false,
              describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
              type: "boolean"
            },
            emoji: {
              defaultValue: false,
              describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
              type: "boolean"
            },
            underline: {
              defaultValue: false,
              describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
              type: "boolean"
            },
            ellipsis: {
              defaultValue: true,
              describe: "Replaces three dots with the ellipsis unicode character",
              type: "boolean"
            },
            completeHTMLDocument: {
              defaultValue: false,
              describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
              type: "boolean"
            },
            metadata: {
              defaultValue: false,
              describe: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
              type: "boolean"
            },
            splitAdjacentBlockquotes: {
              defaultValue: false,
              describe: "Split adjacent blockquote blocks",
              type: "boolean"
            }
          };
          if (simple === false) {
            return JSON.parse(JSON.stringify(defaultOptions));
          }
          var ret = {};
          for (var opt in defaultOptions) {
            if (defaultOptions.hasOwnProperty(opt)) {
              ret[opt] = defaultOptions[opt].defaultValue;
            }
          }
          return ret;
        }
        function allOptionsOn() {
          var options = getDefaultOpts(true), ret = {};
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              ret[opt] = true;
            }
          }
          return ret;
        }
        var showdown2 = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
          github: {
            omitExtraWLInCodeBlocks: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghCompatibleHeaderId: true,
            ghMentions: true,
            backslashEscapesHTMLTags: true,
            emoji: true,
            splitAdjacentBlockquotes: true
          },
          original: {
            noHeaderId: true,
            ghCodeBlocks: false
          },
          ghost: {
            omitExtraWLInCodeBlocks: true,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghMentions: false,
            encodeEmails: true
          },
          vanilla: getDefaultOpts(true),
          allOn: allOptionsOn()
        };
        showdown2.helper = {};
        showdown2.extensions = {};
        showdown2.setOption = function(key, value) {
          globalOptions[key] = value;
          return this;
        };
        showdown2.getOption = function(key) {
          return globalOptions[key];
        };
        showdown2.getOptions = function() {
          return globalOptions;
        };
        showdown2.resetOptions = function() {
          globalOptions = getDefaultOpts(true);
        };
        showdown2.setFlavor = function(name) {
          if (!flavor.hasOwnProperty(name)) {
            throw Error(name + " flavor was not found");
          }
          showdown2.resetOptions();
          var preset = flavor[name];
          setFlavor = name;
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              globalOptions[option] = preset[option];
            }
          }
        };
        showdown2.getFlavor = function() {
          return setFlavor;
        };
        showdown2.getFlavorOptions = function(name) {
          if (flavor.hasOwnProperty(name)) {
            return flavor[name];
          }
        };
        showdown2.getDefaultOptions = function(simple) {
          return getDefaultOpts(simple);
        };
        showdown2.subParser = function(name, func) {
          if (showdown2.helper.isString(name)) {
            if (typeof func !== "undefined") {
              parsers[name] = func;
            } else {
              if (parsers.hasOwnProperty(name)) {
                return parsers[name];
              } else {
                throw Error("SubParser named " + name + " not registered!");
              }
            }
          }
        };
        showdown2.extension = function(name, ext) {
          if (!showdown2.helper.isString(name)) {
            throw Error("Extension 'name' must be a string");
          }
          name = showdown2.helper.stdExtName(name);
          if (showdown2.helper.isUndefined(ext)) {
            if (!extensions.hasOwnProperty(name)) {
              throw Error("Extension named " + name + " is not registered!");
            }
            return extensions[name];
          } else {
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExtension = validate(ext, name);
            if (validExtension.valid) {
              extensions[name] = ext;
            } else {
              throw Error(validExtension.error);
            }
          }
        };
        showdown2.getAllExtensions = function() {
          return extensions;
        };
        showdown2.removeExtension = function(name) {
          delete extensions[name];
        };
        showdown2.resetExtensions = function() {
          extensions = {};
        };
        function validate(extension, name) {
          var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
            valid: true,
            error: ""
          };
          if (!showdown2.helper.isArray(extension)) {
            extension = [extension];
          }
          for (var i = 0; i < extension.length; ++i) {
            var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
            if (typeof ext !== "object") {
              ret.valid = false;
              ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
              return ret;
            }
            if (!showdown2.helper.isString(ext.type)) {
              ret.valid = false;
              ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
              return ret;
            }
            var type = ext.type = ext.type.toLowerCase();
            if (type === "language") {
              type = ext.type = "lang";
            }
            if (type === "html") {
              type = ext.type = "output";
            }
            if (type !== "lang" && type !== "output" && type !== "listener") {
              ret.valid = false;
              ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
              return ret;
            }
            if (type === "listener") {
              if (showdown2.helper.isUndefined(ext.listeners)) {
                ret.valid = false;
                ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
                return ret;
              }
            } else {
              if (showdown2.helper.isUndefined(ext.filter) && showdown2.helper.isUndefined(ext.regex)) {
                ret.valid = false;
                ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
                return ret;
              }
            }
            if (ext.listeners) {
              if (typeof ext.listeners !== "object") {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
                return ret;
              }
              for (var ln in ext.listeners) {
                if (ext.listeners.hasOwnProperty(ln)) {
                  if (typeof ext.listeners[ln] !== "function") {
                    ret.valid = false;
                    ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                    return ret;
                  }
                }
              }
            }
            if (ext.filter) {
              if (typeof ext.filter !== "function") {
                ret.valid = false;
                ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
                return ret;
              }
            } else if (ext.regex) {
              if (showdown2.helper.isString(ext.regex)) {
                ext.regex = new RegExp(ext.regex, "g");
              }
              if (!(ext.regex instanceof RegExp)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
                return ret;
              }
              if (showdown2.helper.isUndefined(ext.replace)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
                return ret;
              }
            }
          }
          return ret;
        }
        showdown2.validateExtension = function(ext) {
          var validateExtension = validate(ext, null);
          if (!validateExtension.valid) {
            console.warn(validateExtension.error);
            return false;
          }
          return true;
        };
        if (!showdown2.hasOwnProperty("helper")) {
          showdown2.helper = {};
        }
        showdown2.helper.isString = function(a) {
          return typeof a === "string" || a instanceof String;
        };
        showdown2.helper.isFunction = function(a) {
          var getType = {};
          return a && getType.toString.call(a) === "[object Function]";
        };
        showdown2.helper.isArray = function(a) {
          return Array.isArray(a);
        };
        showdown2.helper.isUndefined = function(value) {
          return typeof value === "undefined";
        };
        showdown2.helper.forEach = function(obj, callback) {
          if (showdown2.helper.isUndefined(obj)) {
            throw new Error("obj param is required");
          }
          if (showdown2.helper.isUndefined(callback)) {
            throw new Error("callback param is required");
          }
          if (!showdown2.helper.isFunction(callback)) {
            throw new Error("callback param must be a function/closure");
          }
          if (typeof obj.forEach === "function") {
            obj.forEach(callback);
          } else if (showdown2.helper.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
              callback(obj[i], i, obj);
            }
          } else if (typeof obj === "object") {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                callback(obj[prop], prop, obj);
              }
            }
          } else {
            throw new Error("obj does not seem to be an array or an iterable object");
          }
        };
        showdown2.helper.stdExtName = function(s) {
          return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
        };
        function escapeCharactersCallback(wholeMatch, m1) {
          var charCodeToEscape = m1.charCodeAt(0);
          return "¨E" + charCodeToEscape + "E";
        }
        showdown2.helper.escapeCharactersCallback = escapeCharactersCallback;
        showdown2.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
          var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
          if (afterBackslash) {
            regexString = "\\\\" + regexString;
          }
          var regex = new RegExp(regexString, "g");
          text = text.replace(regex, escapeCharactersCallback);
          return text;
        };
        showdown2.helper.unescapeHTMLEntities = function(txt) {
          return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        };
        var rgxFindMatchPos = function(str, left, right, flags) {
          var f = flags || "", g = f.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f.replace(/g/g, "")), l = new RegExp(left, f.replace(/g/g, "")), pos = [], t, s, m, start, end;
          do {
            t = 0;
            while (m = x.exec(str)) {
              if (l.test(m[0])) {
                if (!t++) {
                  s = x.lastIndex;
                  start = s - m[0].length;
                }
              } else if (t) {
                if (!--t) {
                  end = m.index + m[0].length;
                  var obj = {
                    left: { start, end: s },
                    match: { start: s, end: m.index },
                    right: { start: m.index, end },
                    wholeMatch: { start, end }
                  };
                  pos.push(obj);
                  if (!g) {
                    return pos;
                  }
                }
              }
            }
          } while (t && (x.lastIndex = s));
          return pos;
        };
        showdown2.helper.matchRecursiveRegExp = function(str, left, right, flags) {
          var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
          for (var i = 0; i < matchPos.length; ++i) {
            results.push([
              str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
              str.slice(matchPos[i].match.start, matchPos[i].match.end),
              str.slice(matchPos[i].left.start, matchPos[i].left.end),
              str.slice(matchPos[i].right.start, matchPos[i].right.end)
            ]);
          }
          return results;
        };
        showdown2.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
          if (!showdown2.helper.isFunction(replacement)) {
            var repStr = replacement;
            replacement = function() {
              return repStr;
            };
          }
          var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
          if (lng > 0) {
            var bits = [];
            if (matchPos[0].wholeMatch.start !== 0) {
              bits.push(str.slice(0, matchPos[0].wholeMatch.start));
            }
            for (var i = 0; i < lng; ++i) {
              bits.push(
                replacement(
                  str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
                  str.slice(matchPos[i].match.start, matchPos[i].match.end),
                  str.slice(matchPos[i].left.start, matchPos[i].left.end),
                  str.slice(matchPos[i].right.start, matchPos[i].right.end)
                )
              );
              if (i < lng - 1) {
                bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
              }
            }
            if (matchPos[lng - 1].wholeMatch.end < str.length) {
              bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
            }
            finalStr = bits.join("");
          }
          return finalStr;
        };
        showdown2.helper.regexIndexOf = function(str, regex, fromIndex) {
          if (!showdown2.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          if (regex instanceof RegExp === false) {
            throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
          }
          var indexOf = str.substring(fromIndex || 0).search(regex);
          return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
        };
        showdown2.helper.splitAtIndex = function(str, index) {
          if (!showdown2.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          return [str.substring(0, index), str.substring(index)];
        };
        showdown2.helper.encodeEmailAddress = function(mail) {
          var encode = [
            function(ch) {
              return "&#" + ch.charCodeAt(0) + ";";
            },
            function(ch) {
              return "&#x" + ch.charCodeAt(0).toString(16) + ";";
            },
            function(ch) {
              return ch;
            }
          ];
          mail = mail.replace(/./g, function(ch) {
            if (ch === "@") {
              ch = encode[Math.floor(Math.random() * 2)](ch);
            } else {
              var r = Math.random();
              ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
          });
          return mail;
        };
        showdown2.helper.padEnd = function padEnd(str, targetLength, padString) {
          targetLength = targetLength >> 0;
          padString = String(padString || " ");
          if (str.length > targetLength) {
            return String(str);
          } else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
            }
            return String(str) + padString.slice(0, targetLength);
          }
        };
        if (typeof console === "undefined") {
          console = {
            warn: function(msg) {
              alert(msg);
            },
            log: function(msg) {
              alert(msg);
            },
            error: function(msg) {
              throw msg;
            }
          };
        }
        showdown2.helper.regexes = {
          asteriskDashAndColon: /([*_:~])/g
        };
        showdown2.helper.emojis = {
          "+1": "👍",
          "-1": "👎",
          "100": "💯",
          "1234": "🔢",
          "1st_place_medal": "🥇",
          "2nd_place_medal": "🥈",
          "3rd_place_medal": "🥉",
          "8ball": "🎱",
          "a": "🅰️",
          "ab": "🆎",
          "abc": "🔤",
          "abcd": "🔡",
          "accept": "🉑",
          "aerial_tramway": "🚡",
          "airplane": "✈️",
          "alarm_clock": "⏰",
          "alembic": "⚗️",
          "alien": "👽",
          "ambulance": "🚑",
          "amphora": "🏺",
          "anchor": "⚓️",
          "angel": "👼",
          "anger": "💢",
          "angry": "😠",
          "anguished": "😧",
          "ant": "🐜",
          "apple": "🍎",
          "aquarius": "♒️",
          "aries": "♈️",
          "arrow_backward": "◀️",
          "arrow_double_down": "⏬",
          "arrow_double_up": "⏫",
          "arrow_down": "⬇️",
          "arrow_down_small": "🔽",
          "arrow_forward": "▶️",
          "arrow_heading_down": "⤵️",
          "arrow_heading_up": "⤴️",
          "arrow_left": "⬅️",
          "arrow_lower_left": "↙️",
          "arrow_lower_right": "↘️",
          "arrow_right": "➡️",
          "arrow_right_hook": "↪️",
          "arrow_up": "⬆️",
          "arrow_up_down": "↕️",
          "arrow_up_small": "🔼",
          "arrow_upper_left": "↖️",
          "arrow_upper_right": "↗️",
          "arrows_clockwise": "🔃",
          "arrows_counterclockwise": "🔄",
          "art": "🎨",
          "articulated_lorry": "🚛",
          "artificial_satellite": "🛰",
          "astonished": "😲",
          "athletic_shoe": "👟",
          "atm": "🏧",
          "atom_symbol": "⚛️",
          "avocado": "🥑",
          "b": "🅱️",
          "baby": "👶",
          "baby_bottle": "🍼",
          "baby_chick": "🐤",
          "baby_symbol": "🚼",
          "back": "🔙",
          "bacon": "🥓",
          "badminton": "🏸",
          "baggage_claim": "🛄",
          "baguette_bread": "🥖",
          "balance_scale": "⚖️",
          "balloon": "🎈",
          "ballot_box": "🗳",
          "ballot_box_with_check": "☑️",
          "bamboo": "🎍",
          "banana": "🍌",
          "bangbang": "‼️",
          "bank": "🏦",
          "bar_chart": "📊",
          "barber": "💈",
          "baseball": "⚾️",
          "basketball": "🏀",
          "basketball_man": "⛹️",
          "basketball_woman": "⛹️&zwj;♀️",
          "bat": "🦇",
          "bath": "🛀",
          "bathtub": "🛁",
          "battery": "🔋",
          "beach_umbrella": "🏖",
          "bear": "🐻",
          "bed": "🛏",
          "bee": "🐝",
          "beer": "🍺",
          "beers": "🍻",
          "beetle": "🐞",
          "beginner": "🔰",
          "bell": "🔔",
          "bellhop_bell": "🛎",
          "bento": "🍱",
          "biking_man": "🚴",
          "bike": "🚲",
          "biking_woman": "🚴&zwj;♀️",
          "bikini": "👙",
          "biohazard": "☣️",
          "bird": "🐦",
          "birthday": "🎂",
          "black_circle": "⚫️",
          "black_flag": "🏴",
          "black_heart": "🖤",
          "black_joker": "🃏",
          "black_large_square": "⬛️",
          "black_medium_small_square": "◾️",
          "black_medium_square": "◼️",
          "black_nib": "✒️",
          "black_small_square": "▪️",
          "black_square_button": "🔲",
          "blonde_man": "👱",
          "blonde_woman": "👱&zwj;♀️",
          "blossom": "🌼",
          "blowfish": "🐡",
          "blue_book": "📘",
          "blue_car": "🚙",
          "blue_heart": "💙",
          "blush": "😊",
          "boar": "🐗",
          "boat": "⛵️",
          "bomb": "💣",
          "book": "📖",
          "bookmark": "🔖",
          "bookmark_tabs": "📑",
          "books": "📚",
          "boom": "💥",
          "boot": "👢",
          "bouquet": "💐",
          "bowing_man": "🙇",
          "bow_and_arrow": "🏹",
          "bowing_woman": "🙇&zwj;♀️",
          "bowling": "🎳",
          "boxing_glove": "🥊",
          "boy": "👦",
          "bread": "🍞",
          "bride_with_veil": "👰",
          "bridge_at_night": "🌉",
          "briefcase": "💼",
          "broken_heart": "💔",
          "bug": "🐛",
          "building_construction": "🏗",
          "bulb": "💡",
          "bullettrain_front": "🚅",
          "bullettrain_side": "🚄",
          "burrito": "🌯",
          "bus": "🚌",
          "business_suit_levitating": "🕴",
          "busstop": "🚏",
          "bust_in_silhouette": "👤",
          "busts_in_silhouette": "👥",
          "butterfly": "🦋",
          "cactus": "🌵",
          "cake": "🍰",
          "calendar": "📆",
          "call_me_hand": "🤙",
          "calling": "📲",
          "camel": "🐫",
          "camera": "📷",
          "camera_flash": "📸",
          "camping": "🏕",
          "cancer": "♋️",
          "candle": "🕯",
          "candy": "🍬",
          "canoe": "🛶",
          "capital_abcd": "🔠",
          "capricorn": "♑️",
          "car": "🚗",
          "card_file_box": "🗃",
          "card_index": "📇",
          "card_index_dividers": "🗂",
          "carousel_horse": "🎠",
          "carrot": "🥕",
          "cat": "🐱",
          "cat2": "🐈",
          "cd": "💿",
          "chains": "⛓",
          "champagne": "🍾",
          "chart": "💹",
          "chart_with_downwards_trend": "📉",
          "chart_with_upwards_trend": "📈",
          "checkered_flag": "🏁",
          "cheese": "🧀",
          "cherries": "🍒",
          "cherry_blossom": "🌸",
          "chestnut": "🌰",
          "chicken": "🐔",
          "children_crossing": "🚸",
          "chipmunk": "🐿",
          "chocolate_bar": "🍫",
          "christmas_tree": "🎄",
          "church": "⛪️",
          "cinema": "🎦",
          "circus_tent": "🎪",
          "city_sunrise": "🌇",
          "city_sunset": "🌆",
          "cityscape": "🏙",
          "cl": "🆑",
          "clamp": "🗜",
          "clap": "👏",
          "clapper": "🎬",
          "classical_building": "🏛",
          "clinking_glasses": "🥂",
          "clipboard": "📋",
          "clock1": "🕐",
          "clock10": "🕙",
          "clock1030": "🕥",
          "clock11": "🕚",
          "clock1130": "🕦",
          "clock12": "🕛",
          "clock1230": "🕧",
          "clock130": "🕜",
          "clock2": "🕑",
          "clock230": "🕝",
          "clock3": "🕒",
          "clock330": "🕞",
          "clock4": "🕓",
          "clock430": "🕟",
          "clock5": "🕔",
          "clock530": "🕠",
          "clock6": "🕕",
          "clock630": "🕡",
          "clock7": "🕖",
          "clock730": "🕢",
          "clock8": "🕗",
          "clock830": "🕣",
          "clock9": "🕘",
          "clock930": "🕤",
          "closed_book": "📕",
          "closed_lock_with_key": "🔐",
          "closed_umbrella": "🌂",
          "cloud": "☁️",
          "cloud_with_lightning": "🌩",
          "cloud_with_lightning_and_rain": "⛈",
          "cloud_with_rain": "🌧",
          "cloud_with_snow": "🌨",
          "clown_face": "🤡",
          "clubs": "♣️",
          "cocktail": "🍸",
          "coffee": "☕️",
          "coffin": "⚰️",
          "cold_sweat": "😰",
          "comet": "☄️",
          "computer": "💻",
          "computer_mouse": "🖱",
          "confetti_ball": "🎊",
          "confounded": "😖",
          "confused": "😕",
          "congratulations": "㊗️",
          "construction": "🚧",
          "construction_worker_man": "👷",
          "construction_worker_woman": "👷&zwj;♀️",
          "control_knobs": "🎛",
          "convenience_store": "🏪",
          "cookie": "🍪",
          "cool": "🆒",
          "policeman": "👮",
          "copyright": "©️",
          "corn": "🌽",
          "couch_and_lamp": "🛋",
          "couple": "👫",
          "couple_with_heart_woman_man": "💑",
          "couple_with_heart_man_man": "👨&zwj;❤️&zwj;👨",
          "couple_with_heart_woman_woman": "👩&zwj;❤️&zwj;👩",
          "couplekiss_man_man": "👨&zwj;❤️&zwj;💋&zwj;👨",
          "couplekiss_man_woman": "💏",
          "couplekiss_woman_woman": "👩&zwj;❤️&zwj;💋&zwj;👩",
          "cow": "🐮",
          "cow2": "🐄",
          "cowboy_hat_face": "🤠",
          "crab": "🦀",
          "crayon": "🖍",
          "credit_card": "💳",
          "crescent_moon": "🌙",
          "cricket": "🏏",
          "crocodile": "🐊",
          "croissant": "🥐",
          "crossed_fingers": "🤞",
          "crossed_flags": "🎌",
          "crossed_swords": "⚔️",
          "crown": "👑",
          "cry": "😢",
          "crying_cat_face": "😿",
          "crystal_ball": "🔮",
          "cucumber": "🥒",
          "cupid": "💘",
          "curly_loop": "➰",
          "currency_exchange": "💱",
          "curry": "🍛",
          "custard": "🍮",
          "customs": "🛃",
          "cyclone": "🌀",
          "dagger": "🗡",
          "dancer": "💃",
          "dancing_women": "👯",
          "dancing_men": "👯&zwj;♂️",
          "dango": "🍡",
          "dark_sunglasses": "🕶",
          "dart": "🎯",
          "dash": "💨",
          "date": "📅",
          "deciduous_tree": "🌳",
          "deer": "🦌",
          "department_store": "🏬",
          "derelict_house": "🏚",
          "desert": "🏜",
          "desert_island": "🏝",
          "desktop_computer": "🖥",
          "male_detective": "🕵️",
          "diamond_shape_with_a_dot_inside": "💠",
          "diamonds": "♦️",
          "disappointed": "😞",
          "disappointed_relieved": "😥",
          "dizzy": "💫",
          "dizzy_face": "😵",
          "do_not_litter": "🚯",
          "dog": "🐶",
          "dog2": "🐕",
          "dollar": "💵",
          "dolls": "🎎",
          "dolphin": "🐬",
          "door": "🚪",
          "doughnut": "🍩",
          "dove": "🕊",
          "dragon": "🐉",
          "dragon_face": "🐲",
          "dress": "👗",
          "dromedary_camel": "🐪",
          "drooling_face": "🤤",
          "droplet": "💧",
          "drum": "🥁",
          "duck": "🦆",
          "dvd": "📀",
          "e-mail": "📧",
          "eagle": "🦅",
          "ear": "👂",
          "ear_of_rice": "🌾",
          "earth_africa": "🌍",
          "earth_americas": "🌎",
          "earth_asia": "🌏",
          "egg": "🥚",
          "eggplant": "🍆",
          "eight_pointed_black_star": "✴️",
          "eight_spoked_asterisk": "✳️",
          "electric_plug": "🔌",
          "elephant": "🐘",
          "email": "✉️",
          "end": "🔚",
          "envelope_with_arrow": "📩",
          "euro": "💶",
          "european_castle": "🏰",
          "european_post_office": "🏤",
          "evergreen_tree": "🌲",
          "exclamation": "❗️",
          "expressionless": "😑",
          "eye": "👁",
          "eye_speech_bubble": "👁&zwj;🗨",
          "eyeglasses": "👓",
          "eyes": "👀",
          "face_with_head_bandage": "🤕",
          "face_with_thermometer": "🤒",
          "fist_oncoming": "👊",
          "factory": "🏭",
          "fallen_leaf": "🍂",
          "family_man_woman_boy": "👪",
          "family_man_boy": "👨&zwj;👦",
          "family_man_boy_boy": "👨&zwj;👦&zwj;👦",
          "family_man_girl": "👨&zwj;👧",
          "family_man_girl_boy": "👨&zwj;👧&zwj;👦",
          "family_man_girl_girl": "👨&zwj;👧&zwj;👧",
          "family_man_man_boy": "👨&zwj;👨&zwj;👦",
          "family_man_man_boy_boy": "👨&zwj;👨&zwj;👦&zwj;👦",
          "family_man_man_girl": "👨&zwj;👨&zwj;👧",
          "family_man_man_girl_boy": "👨&zwj;👨&zwj;👧&zwj;👦",
          "family_man_man_girl_girl": "👨&zwj;👨&zwj;👧&zwj;👧",
          "family_man_woman_boy_boy": "👨&zwj;👩&zwj;👦&zwj;👦",
          "family_man_woman_girl": "👨&zwj;👩&zwj;👧",
          "family_man_woman_girl_boy": "👨&zwj;👩&zwj;👧&zwj;👦",
          "family_man_woman_girl_girl": "👨&zwj;👩&zwj;👧&zwj;👧",
          "family_woman_boy": "👩&zwj;👦",
          "family_woman_boy_boy": "👩&zwj;👦&zwj;👦",
          "family_woman_girl": "👩&zwj;👧",
          "family_woman_girl_boy": "👩&zwj;👧&zwj;👦",
          "family_woman_girl_girl": "👩&zwj;👧&zwj;👧",
          "family_woman_woman_boy": "👩&zwj;👩&zwj;👦",
          "family_woman_woman_boy_boy": "👩&zwj;👩&zwj;👦&zwj;👦",
          "family_woman_woman_girl": "👩&zwj;👩&zwj;👧",
          "family_woman_woman_girl_boy": "👩&zwj;👩&zwj;👧&zwj;👦",
          "family_woman_woman_girl_girl": "👩&zwj;👩&zwj;👧&zwj;👧",
          "fast_forward": "⏩",
          "fax": "📠",
          "fearful": "😨",
          "feet": "🐾",
          "female_detective": "🕵️&zwj;♀️",
          "ferris_wheel": "🎡",
          "ferry": "⛴",
          "field_hockey": "🏑",
          "file_cabinet": "🗄",
          "file_folder": "📁",
          "film_projector": "📽",
          "film_strip": "🎞",
          "fire": "🔥",
          "fire_engine": "🚒",
          "fireworks": "🎆",
          "first_quarter_moon": "🌓",
          "first_quarter_moon_with_face": "🌛",
          "fish": "🐟",
          "fish_cake": "🍥",
          "fishing_pole_and_fish": "🎣",
          "fist_raised": "✊",
          "fist_left": "🤛",
          "fist_right": "🤜",
          "flags": "🎏",
          "flashlight": "🔦",
          "fleur_de_lis": "⚜️",
          "flight_arrival": "🛬",
          "flight_departure": "🛫",
          "floppy_disk": "💾",
          "flower_playing_cards": "🎴",
          "flushed": "😳",
          "fog": "🌫",
          "foggy": "🌁",
          "football": "🏈",
          "footprints": "👣",
          "fork_and_knife": "🍴",
          "fountain": "⛲️",
          "fountain_pen": "🖋",
          "four_leaf_clover": "🍀",
          "fox_face": "🦊",
          "framed_picture": "🖼",
          "free": "🆓",
          "fried_egg": "🍳",
          "fried_shrimp": "🍤",
          "fries": "🍟",
          "frog": "🐸",
          "frowning": "😦",
          "frowning_face": "☹️",
          "frowning_man": "🙍&zwj;♂️",
          "frowning_woman": "🙍",
          "middle_finger": "🖕",
          "fuelpump": "⛽️",
          "full_moon": "🌕",
          "full_moon_with_face": "🌝",
          "funeral_urn": "⚱️",
          "game_die": "🎲",
          "gear": "⚙️",
          "gem": "💎",
          "gemini": "♊️",
          "ghost": "👻",
          "gift": "🎁",
          "gift_heart": "💝",
          "girl": "👧",
          "globe_with_meridians": "🌐",
          "goal_net": "🥅",
          "goat": "🐐",
          "golf": "⛳️",
          "golfing_man": "🏌️",
          "golfing_woman": "🏌️&zwj;♀️",
          "gorilla": "🦍",
          "grapes": "🍇",
          "green_apple": "🍏",
          "green_book": "📗",
          "green_heart": "💚",
          "green_salad": "🥗",
          "grey_exclamation": "❕",
          "grey_question": "❔",
          "grimacing": "😬",
          "grin": "😁",
          "grinning": "😀",
          "guardsman": "💂",
          "guardswoman": "💂&zwj;♀️",
          "guitar": "🎸",
          "gun": "🔫",
          "haircut_woman": "💇",
          "haircut_man": "💇&zwj;♂️",
          "hamburger": "🍔",
          "hammer": "🔨",
          "hammer_and_pick": "⚒",
          "hammer_and_wrench": "🛠",
          "hamster": "🐹",
          "hand": "✋",
          "handbag": "👜",
          "handshake": "🤝",
          "hankey": "💩",
          "hatched_chick": "🐥",
          "hatching_chick": "🐣",
          "headphones": "🎧",
          "hear_no_evil": "🙉",
          "heart": "❤️",
          "heart_decoration": "💟",
          "heart_eyes": "😍",
          "heart_eyes_cat": "😻",
          "heartbeat": "💓",
          "heartpulse": "💗",
          "hearts": "♥️",
          "heavy_check_mark": "✔️",
          "heavy_division_sign": "➗",
          "heavy_dollar_sign": "💲",
          "heavy_heart_exclamation": "❣️",
          "heavy_minus_sign": "➖",
          "heavy_multiplication_x": "✖️",
          "heavy_plus_sign": "➕",
          "helicopter": "🚁",
          "herb": "🌿",
          "hibiscus": "🌺",
          "high_brightness": "🔆",
          "high_heel": "👠",
          "hocho": "🔪",
          "hole": "🕳",
          "honey_pot": "🍯",
          "horse": "🐴",
          "horse_racing": "🏇",
          "hospital": "🏥",
          "hot_pepper": "🌶",
          "hotdog": "🌭",
          "hotel": "🏨",
          "hotsprings": "♨️",
          "hourglass": "⌛️",
          "hourglass_flowing_sand": "⏳",
          "house": "🏠",
          "house_with_garden": "🏡",
          "houses": "🏘",
          "hugs": "🤗",
          "hushed": "😯",
          "ice_cream": "🍨",
          "ice_hockey": "🏒",
          "ice_skate": "⛸",
          "icecream": "🍦",
          "id": "🆔",
          "ideograph_advantage": "🉐",
          "imp": "👿",
          "inbox_tray": "📥",
          "incoming_envelope": "📨",
          "tipping_hand_woman": "💁",
          "information_source": "ℹ️",
          "innocent": "😇",
          "interrobang": "⁉️",
          "iphone": "📱",
          "izakaya_lantern": "🏮",
          "jack_o_lantern": "🎃",
          "japan": "🗾",
          "japanese_castle": "🏯",
          "japanese_goblin": "👺",
          "japanese_ogre": "👹",
          "jeans": "👖",
          "joy": "😂",
          "joy_cat": "😹",
          "joystick": "🕹",
          "kaaba": "🕋",
          "key": "🔑",
          "keyboard": "⌨️",
          "keycap_ten": "🔟",
          "kick_scooter": "🛴",
          "kimono": "👘",
          "kiss": "💋",
          "kissing": "😗",
          "kissing_cat": "😽",
          "kissing_closed_eyes": "😚",
          "kissing_heart": "😘",
          "kissing_smiling_eyes": "😙",
          "kiwi_fruit": "🥝",
          "koala": "🐨",
          "koko": "🈁",
          "label": "🏷",
          "large_blue_circle": "🔵",
          "large_blue_diamond": "🔷",
          "large_orange_diamond": "🔶",
          "last_quarter_moon": "🌗",
          "last_quarter_moon_with_face": "🌜",
          "latin_cross": "✝️",
          "laughing": "😆",
          "leaves": "🍃",
          "ledger": "📒",
          "left_luggage": "🛅",
          "left_right_arrow": "↔️",
          "leftwards_arrow_with_hook": "↩️",
          "lemon": "🍋",
          "leo": "♌️",
          "leopard": "🐆",
          "level_slider": "🎚",
          "libra": "♎️",
          "light_rail": "🚈",
          "link": "🔗",
          "lion": "🦁",
          "lips": "👄",
          "lipstick": "💄",
          "lizard": "🦎",
          "lock": "🔒",
          "lock_with_ink_pen": "🔏",
          "lollipop": "🍭",
          "loop": "➿",
          "loud_sound": "🔊",
          "loudspeaker": "📢",
          "love_hotel": "🏩",
          "love_letter": "💌",
          "low_brightness": "🔅",
          "lying_face": "🤥",
          "m": "Ⓜ️",
          "mag": "🔍",
          "mag_right": "🔎",
          "mahjong": "🀄️",
          "mailbox": "📫",
          "mailbox_closed": "📪",
          "mailbox_with_mail": "📬",
          "mailbox_with_no_mail": "📭",
          "man": "👨",
          "man_artist": "👨&zwj;🎨",
          "man_astronaut": "👨&zwj;🚀",
          "man_cartwheeling": "🤸&zwj;♂️",
          "man_cook": "👨&zwj;🍳",
          "man_dancing": "🕺",
          "man_facepalming": "🤦&zwj;♂️",
          "man_factory_worker": "👨&zwj;🏭",
          "man_farmer": "👨&zwj;🌾",
          "man_firefighter": "👨&zwj;🚒",
          "man_health_worker": "👨&zwj;⚕️",
          "man_in_tuxedo": "🤵",
          "man_judge": "👨&zwj;⚖️",
          "man_juggling": "🤹&zwj;♂️",
          "man_mechanic": "👨&zwj;🔧",
          "man_office_worker": "👨&zwj;💼",
          "man_pilot": "👨&zwj;✈️",
          "man_playing_handball": "🤾&zwj;♂️",
          "man_playing_water_polo": "🤽&zwj;♂️",
          "man_scientist": "👨&zwj;🔬",
          "man_shrugging": "🤷&zwj;♂️",
          "man_singer": "👨&zwj;🎤",
          "man_student": "👨&zwj;🎓",
          "man_teacher": "👨&zwj;🏫",
          "man_technologist": "👨&zwj;💻",
          "man_with_gua_pi_mao": "👲",
          "man_with_turban": "👳",
          "tangerine": "🍊",
          "mans_shoe": "👞",
          "mantelpiece_clock": "🕰",
          "maple_leaf": "🍁",
          "martial_arts_uniform": "🥋",
          "mask": "😷",
          "massage_woman": "💆",
          "massage_man": "💆&zwj;♂️",
          "meat_on_bone": "🍖",
          "medal_military": "🎖",
          "medal_sports": "🏅",
          "mega": "📣",
          "melon": "🍈",
          "memo": "📝",
          "men_wrestling": "🤼&zwj;♂️",
          "menorah": "🕎",
          "mens": "🚹",
          "metal": "🤘",
          "metro": "🚇",
          "microphone": "🎤",
          "microscope": "🔬",
          "milk_glass": "🥛",
          "milky_way": "🌌",
          "minibus": "🚐",
          "minidisc": "💽",
          "mobile_phone_off": "📴",
          "money_mouth_face": "🤑",
          "money_with_wings": "💸",
          "moneybag": "💰",
          "monkey": "🐒",
          "monkey_face": "🐵",
          "monorail": "🚝",
          "moon": "🌔",
          "mortar_board": "🎓",
          "mosque": "🕌",
          "motor_boat": "🛥",
          "motor_scooter": "🛵",
          "motorcycle": "🏍",
          "motorway": "🛣",
          "mount_fuji": "🗻",
          "mountain": "⛰",
          "mountain_biking_man": "🚵",
          "mountain_biking_woman": "🚵&zwj;♀️",
          "mountain_cableway": "🚠",
          "mountain_railway": "🚞",
          "mountain_snow": "🏔",
          "mouse": "🐭",
          "mouse2": "🐁",
          "movie_camera": "🎥",
          "moyai": "🗿",
          "mrs_claus": "🤶",
          "muscle": "💪",
          "mushroom": "🍄",
          "musical_keyboard": "🎹",
          "musical_note": "🎵",
          "musical_score": "🎼",
          "mute": "🔇",
          "nail_care": "💅",
          "name_badge": "📛",
          "national_park": "🏞",
          "nauseated_face": "🤢",
          "necktie": "👔",
          "negative_squared_cross_mark": "❎",
          "nerd_face": "🤓",
          "neutral_face": "😐",
          "new": "🆕",
          "new_moon": "🌑",
          "new_moon_with_face": "🌚",
          "newspaper": "📰",
          "newspaper_roll": "🗞",
          "next_track_button": "⏭",
          "ng": "🆖",
          "no_good_man": "🙅&zwj;♂️",
          "no_good_woman": "🙅",
          "night_with_stars": "🌃",
          "no_bell": "🔕",
          "no_bicycles": "🚳",
          "no_entry": "⛔️",
          "no_entry_sign": "🚫",
          "no_mobile_phones": "📵",
          "no_mouth": "😶",
          "no_pedestrians": "🚷",
          "no_smoking": "🚭",
          "non-potable_water": "🚱",
          "nose": "👃",
          "notebook": "📓",
          "notebook_with_decorative_cover": "📔",
          "notes": "🎶",
          "nut_and_bolt": "🔩",
          "o": "⭕️",
          "o2": "🅾️",
          "ocean": "🌊",
          "octopus": "🐙",
          "oden": "🍢",
          "office": "🏢",
          "oil_drum": "🛢",
          "ok": "🆗",
          "ok_hand": "👌",
          "ok_man": "🙆&zwj;♂️",
          "ok_woman": "🙆",
          "old_key": "🗝",
          "older_man": "👴",
          "older_woman": "👵",
          "om": "🕉",
          "on": "🔛",
          "oncoming_automobile": "🚘",
          "oncoming_bus": "🚍",
          "oncoming_police_car": "🚔",
          "oncoming_taxi": "🚖",
          "open_file_folder": "📂",
          "open_hands": "👐",
          "open_mouth": "😮",
          "open_umbrella": "☂️",
          "ophiuchus": "⛎",
          "orange_book": "📙",
          "orthodox_cross": "☦️",
          "outbox_tray": "📤",
          "owl": "🦉",
          "ox": "🐂",
          "package": "📦",
          "page_facing_up": "📄",
          "page_with_curl": "📃",
          "pager": "📟",
          "paintbrush": "🖌",
          "palm_tree": "🌴",
          "pancakes": "🥞",
          "panda_face": "🐼",
          "paperclip": "📎",
          "paperclips": "🖇",
          "parasol_on_ground": "⛱",
          "parking": "🅿️",
          "part_alternation_mark": "〽️",
          "partly_sunny": "⛅️",
          "passenger_ship": "🛳",
          "passport_control": "🛂",
          "pause_button": "⏸",
          "peace_symbol": "☮️",
          "peach": "🍑",
          "peanuts": "🥜",
          "pear": "🍐",
          "pen": "🖊",
          "pencil2": "✏️",
          "penguin": "🐧",
          "pensive": "😔",
          "performing_arts": "🎭",
          "persevere": "😣",
          "person_fencing": "🤺",
          "pouting_woman": "🙎",
          "phone": "☎️",
          "pick": "⛏",
          "pig": "🐷",
          "pig2": "🐖",
          "pig_nose": "🐽",
          "pill": "💊",
          "pineapple": "🍍",
          "ping_pong": "🏓",
          "pisces": "♓️",
          "pizza": "🍕",
          "place_of_worship": "🛐",
          "plate_with_cutlery": "🍽",
          "play_or_pause_button": "⏯",
          "point_down": "👇",
          "point_left": "👈",
          "point_right": "👉",
          "point_up": "☝️",
          "point_up_2": "👆",
          "police_car": "🚓",
          "policewoman": "👮&zwj;♀️",
          "poodle": "🐩",
          "popcorn": "🍿",
          "post_office": "🏣",
          "postal_horn": "📯",
          "postbox": "📮",
          "potable_water": "🚰",
          "potato": "🥔",
          "pouch": "👝",
          "poultry_leg": "🍗",
          "pound": "💷",
          "rage": "😡",
          "pouting_cat": "😾",
          "pouting_man": "🙎&zwj;♂️",
          "pray": "🙏",
          "prayer_beads": "📿",
          "pregnant_woman": "🤰",
          "previous_track_button": "⏮",
          "prince": "🤴",
          "princess": "👸",
          "printer": "🖨",
          "purple_heart": "💜",
          "purse": "👛",
          "pushpin": "📌",
          "put_litter_in_its_place": "🚮",
          "question": "❓",
          "rabbit": "🐰",
          "rabbit2": "🐇",
          "racehorse": "🐎",
          "racing_car": "🏎",
          "radio": "📻",
          "radio_button": "🔘",
          "radioactive": "☢️",
          "railway_car": "🚃",
          "railway_track": "🛤",
          "rainbow": "🌈",
          "rainbow_flag": "🏳️&zwj;🌈",
          "raised_back_of_hand": "🤚",
          "raised_hand_with_fingers_splayed": "🖐",
          "raised_hands": "🙌",
          "raising_hand_woman": "🙋",
          "raising_hand_man": "🙋&zwj;♂️",
          "ram": "🐏",
          "ramen": "🍜",
          "rat": "🐀",
          "record_button": "⏺",
          "recycle": "♻️",
          "red_circle": "🔴",
          "registered": "®️",
          "relaxed": "☺️",
          "relieved": "😌",
          "reminder_ribbon": "🎗",
          "repeat": "🔁",
          "repeat_one": "🔂",
          "rescue_worker_helmet": "⛑",
          "restroom": "🚻",
          "revolving_hearts": "💞",
          "rewind": "⏪",
          "rhinoceros": "🦏",
          "ribbon": "🎀",
          "rice": "🍚",
          "rice_ball": "🍙",
          "rice_cracker": "🍘",
          "rice_scene": "🎑",
          "right_anger_bubble": "🗯",
          "ring": "💍",
          "robot": "🤖",
          "rocket": "🚀",
          "rofl": "🤣",
          "roll_eyes": "🙄",
          "roller_coaster": "🎢",
          "rooster": "🐓",
          "rose": "🌹",
          "rosette": "🏵",
          "rotating_light": "🚨",
          "round_pushpin": "📍",
          "rowing_man": "🚣",
          "rowing_woman": "🚣&zwj;♀️",
          "rugby_football": "🏉",
          "running_man": "🏃",
          "running_shirt_with_sash": "🎽",
          "running_woman": "🏃&zwj;♀️",
          "sa": "🈂️",
          "sagittarius": "♐️",
          "sake": "🍶",
          "sandal": "👡",
          "santa": "🎅",
          "satellite": "📡",
          "saxophone": "🎷",
          "school": "🏫",
          "school_satchel": "🎒",
          "scissors": "✂️",
          "scorpion": "🦂",
          "scorpius": "♏️",
          "scream": "😱",
          "scream_cat": "🙀",
          "scroll": "📜",
          "seat": "💺",
          "secret": "㊙️",
          "see_no_evil": "🙈",
          "seedling": "🌱",
          "selfie": "🤳",
          "shallow_pan_of_food": "🥘",
          "shamrock": "☘️",
          "shark": "🦈",
          "shaved_ice": "🍧",
          "sheep": "🐑",
          "shell": "🐚",
          "shield": "🛡",
          "shinto_shrine": "⛩",
          "ship": "🚢",
          "shirt": "👕",
          "shopping": "🛍",
          "shopping_cart": "🛒",
          "shower": "🚿",
          "shrimp": "🦐",
          "signal_strength": "📶",
          "six_pointed_star": "🔯",
          "ski": "🎿",
          "skier": "⛷",
          "skull": "💀",
          "skull_and_crossbones": "☠️",
          "sleeping": "😴",
          "sleeping_bed": "🛌",
          "sleepy": "😪",
          "slightly_frowning_face": "🙁",
          "slightly_smiling_face": "🙂",
          "slot_machine": "🎰",
          "small_airplane": "🛩",
          "small_blue_diamond": "🔹",
          "small_orange_diamond": "🔸",
          "small_red_triangle": "🔺",
          "small_red_triangle_down": "🔻",
          "smile": "😄",
          "smile_cat": "😸",
          "smiley": "😃",
          "smiley_cat": "😺",
          "smiling_imp": "😈",
          "smirk": "😏",
          "smirk_cat": "😼",
          "smoking": "🚬",
          "snail": "🐌",
          "snake": "🐍",
          "sneezing_face": "🤧",
          "snowboarder": "🏂",
          "snowflake": "❄️",
          "snowman": "⛄️",
          "snowman_with_snow": "☃️",
          "sob": "😭",
          "soccer": "⚽️",
          "soon": "🔜",
          "sos": "🆘",
          "sound": "🔉",
          "space_invader": "👾",
          "spades": "♠️",
          "spaghetti": "🍝",
          "sparkle": "❇️",
          "sparkler": "🎇",
          "sparkles": "✨",
          "sparkling_heart": "💖",
          "speak_no_evil": "🙊",
          "speaker": "🔈",
          "speaking_head": "🗣",
          "speech_balloon": "💬",
          "speedboat": "🚤",
          "spider": "🕷",
          "spider_web": "🕸",
          "spiral_calendar": "🗓",
          "spiral_notepad": "🗒",
          "spoon": "🥄",
          "squid": "🦑",
          "stadium": "🏟",
          "star": "⭐️",
          "star2": "🌟",
          "star_and_crescent": "☪️",
          "star_of_david": "✡️",
          "stars": "🌠",
          "station": "🚉",
          "statue_of_liberty": "🗽",
          "steam_locomotive": "🚂",
          "stew": "🍲",
          "stop_button": "⏹",
          "stop_sign": "🛑",
          "stopwatch": "⏱",
          "straight_ruler": "📏",
          "strawberry": "🍓",
          "stuck_out_tongue": "😛",
          "stuck_out_tongue_closed_eyes": "😝",
          "stuck_out_tongue_winking_eye": "😜",
          "studio_microphone": "🎙",
          "stuffed_flatbread": "🥙",
          "sun_behind_large_cloud": "🌥",
          "sun_behind_rain_cloud": "🌦",
          "sun_behind_small_cloud": "🌤",
          "sun_with_face": "🌞",
          "sunflower": "🌻",
          "sunglasses": "😎",
          "sunny": "☀️",
          "sunrise": "🌅",
          "sunrise_over_mountains": "🌄",
          "surfing_man": "🏄",
          "surfing_woman": "🏄&zwj;♀️",
          "sushi": "🍣",
          "suspension_railway": "🚟",
          "sweat": "😓",
          "sweat_drops": "💦",
          "sweat_smile": "😅",
          "sweet_potato": "🍠",
          "swimming_man": "🏊",
          "swimming_woman": "🏊&zwj;♀️",
          "symbols": "🔣",
          "synagogue": "🕍",
          "syringe": "💉",
          "taco": "🌮",
          "tada": "🎉",
          "tanabata_tree": "🎋",
          "taurus": "♉️",
          "taxi": "🚕",
          "tea": "🍵",
          "telephone_receiver": "📞",
          "telescope": "🔭",
          "tennis": "🎾",
          "tent": "⛺️",
          "thermometer": "🌡",
          "thinking": "🤔",
          "thought_balloon": "💭",
          "ticket": "🎫",
          "tickets": "🎟",
          "tiger": "🐯",
          "tiger2": "🐅",
          "timer_clock": "⏲",
          "tipping_hand_man": "💁&zwj;♂️",
          "tired_face": "😫",
          "tm": "™️",
          "toilet": "🚽",
          "tokyo_tower": "🗼",
          "tomato": "🍅",
          "tongue": "👅",
          "top": "🔝",
          "tophat": "🎩",
          "tornado": "🌪",
          "trackball": "🖲",
          "tractor": "🚜",
          "traffic_light": "🚥",
          "train": "🚋",
          "train2": "🚆",
          "tram": "🚊",
          "triangular_flag_on_post": "🚩",
          "triangular_ruler": "📐",
          "trident": "🔱",
          "triumph": "😤",
          "trolleybus": "🚎",
          "trophy": "🏆",
          "tropical_drink": "🍹",
          "tropical_fish": "🐠",
          "truck": "🚚",
          "trumpet": "🎺",
          "tulip": "🌷",
          "tumbler_glass": "🥃",
          "turkey": "🦃",
          "turtle": "🐢",
          "tv": "📺",
          "twisted_rightwards_arrows": "🔀",
          "two_hearts": "💕",
          "two_men_holding_hands": "👬",
          "two_women_holding_hands": "👭",
          "u5272": "🈹",
          "u5408": "🈴",
          "u55b6": "🈺",
          "u6307": "🈯️",
          "u6708": "🈷️",
          "u6709": "🈶",
          "u6e80": "🈵",
          "u7121": "🈚️",
          "u7533": "🈸",
          "u7981": "🈲",
          "u7a7a": "🈳",
          "umbrella": "☔️",
          "unamused": "😒",
          "underage": "🔞",
          "unicorn": "🦄",
          "unlock": "🔓",
          "up": "🆙",
          "upside_down_face": "🙃",
          "v": "✌️",
          "vertical_traffic_light": "🚦",
          "vhs": "📼",
          "vibration_mode": "📳",
          "video_camera": "📹",
          "video_game": "🎮",
          "violin": "🎻",
          "virgo": "♍️",
          "volcano": "🌋",
          "volleyball": "🏐",
          "vs": "🆚",
          "vulcan_salute": "🖖",
          "walking_man": "🚶",
          "walking_woman": "🚶&zwj;♀️",
          "waning_crescent_moon": "🌘",
          "waning_gibbous_moon": "🌖",
          "warning": "⚠️",
          "wastebasket": "🗑",
          "watch": "⌚️",
          "water_buffalo": "🐃",
          "watermelon": "🍉",
          "wave": "👋",
          "wavy_dash": "〰️",
          "waxing_crescent_moon": "🌒",
          "wc": "🚾",
          "weary": "😩",
          "wedding": "💒",
          "weight_lifting_man": "🏋️",
          "weight_lifting_woman": "🏋️&zwj;♀️",
          "whale": "🐳",
          "whale2": "🐋",
          "wheel_of_dharma": "☸️",
          "wheelchair": "♿️",
          "white_check_mark": "✅",
          "white_circle": "⚪️",
          "white_flag": "🏳️",
          "white_flower": "💮",
          "white_large_square": "⬜️",
          "white_medium_small_square": "◽️",
          "white_medium_square": "◻️",
          "white_small_square": "▫️",
          "white_square_button": "🔳",
          "wilted_flower": "🥀",
          "wind_chime": "🎐",
          "wind_face": "🌬",
          "wine_glass": "🍷",
          "wink": "😉",
          "wolf": "🐺",
          "woman": "👩",
          "woman_artist": "👩&zwj;🎨",
          "woman_astronaut": "👩&zwj;🚀",
          "woman_cartwheeling": "🤸&zwj;♀️",
          "woman_cook": "👩&zwj;🍳",
          "woman_facepalming": "🤦&zwj;♀️",
          "woman_factory_worker": "👩&zwj;🏭",
          "woman_farmer": "👩&zwj;🌾",
          "woman_firefighter": "👩&zwj;🚒",
          "woman_health_worker": "👩&zwj;⚕️",
          "woman_judge": "👩&zwj;⚖️",
          "woman_juggling": "🤹&zwj;♀️",
          "woman_mechanic": "👩&zwj;🔧",
          "woman_office_worker": "👩&zwj;💼",
          "woman_pilot": "👩&zwj;✈️",
          "woman_playing_handball": "🤾&zwj;♀️",
          "woman_playing_water_polo": "🤽&zwj;♀️",
          "woman_scientist": "👩&zwj;🔬",
          "woman_shrugging": "🤷&zwj;♀️",
          "woman_singer": "👩&zwj;🎤",
          "woman_student": "👩&zwj;🎓",
          "woman_teacher": "👩&zwj;🏫",
          "woman_technologist": "👩&zwj;💻",
          "woman_with_turban": "👳&zwj;♀️",
          "womans_clothes": "👚",
          "womans_hat": "👒",
          "women_wrestling": "🤼&zwj;♀️",
          "womens": "🚺",
          "world_map": "🗺",
          "worried": "😟",
          "wrench": "🔧",
          "writing_hand": "✍️",
          "x": "❌",
          "yellow_heart": "💛",
          "yen": "💴",
          "yin_yang": "☯️",
          "yum": "😋",
          "zap": "⚡️",
          "zipper_mouth_face": "🤐",
          "zzz": "💤",
          /* special emojis :P */
          "octocat": '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
          "showdown": `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
        };
        showdown2.Converter = function(converterOptions) {
          var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
            parsed: {},
            raw: "",
            format: ""
          };
          _constructor();
          function _constructor() {
            converterOptions = converterOptions || {};
            for (var gOpt in globalOptions) {
              if (globalOptions.hasOwnProperty(gOpt)) {
                options[gOpt] = globalOptions[gOpt];
              }
            }
            if (typeof converterOptions === "object") {
              for (var opt in converterOptions) {
                if (converterOptions.hasOwnProperty(opt)) {
                  options[opt] = converterOptions[opt];
                }
              }
            } else {
              throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
            }
            if (options.extensions) {
              showdown2.helper.forEach(options.extensions, _parseExtension);
            }
          }
          function _parseExtension(ext, name) {
            name = name || null;
            if (showdown2.helper.isString(ext)) {
              ext = showdown2.helper.stdExtName(ext);
              name = ext;
              if (showdown2.extensions[ext]) {
                console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
                legacyExtensionLoading(showdown2.extensions[ext], ext);
                return;
              } else if (!showdown2.helper.isUndefined(extensions[ext])) {
                ext = extensions[ext];
              } else {
                throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
              }
            }
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExt = validate(ext, name);
            if (!validExt.valid) {
              throw Error(validExt.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
              }
              if (ext[i].hasOwnProperty("listeners")) {
                for (var ln in ext[i].listeners) {
                  if (ext[i].listeners.hasOwnProperty(ln)) {
                    listen(ln, ext[i].listeners[ln]);
                  }
                }
              }
            }
          }
          function legacyExtensionLoading(ext, name) {
            if (typeof ext === "function") {
              ext = ext(new showdown2.Converter());
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var valid = validate(ext, name);
            if (!valid.valid) {
              throw Error(valid.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
                default:
                  throw Error("Extension loader error: Type unrecognized!!!");
              }
            }
          }
          function listen(name, callback) {
            if (!showdown2.helper.isString(name)) {
              throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
            }
            if (typeof callback !== "function") {
              throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
            }
            if (!listeners.hasOwnProperty(name)) {
              listeners[name] = [];
            }
            listeners[name].push(callback);
          }
          function rTrimInputText(text) {
            var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
            return text.replace(rgx, "");
          }
          this._dispatch = function dispatch(evtName, text, options2, globals) {
            if (listeners.hasOwnProperty(evtName)) {
              for (var ei = 0; ei < listeners[evtName].length; ++ei) {
                var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
                if (nText && typeof nText !== "undefined") {
                  text = nText;
                }
              }
            }
            return text;
          };
          this.listen = function(name, callback) {
            listen(name, callback);
            return this;
          };
          this.makeHtml = function(text) {
            if (!text) {
              return text;
            }
            var globals = {
              gHtmlBlocks: [],
              gHtmlMdBlocks: [],
              gHtmlSpans: [],
              gUrls: {},
              gTitles: {},
              gDimensions: {},
              gListLevel: 0,
              hashLinkCounts: {},
              langExtensions,
              outputModifiers,
              converter: this,
              ghCodeBlocks: [],
              metadata: {
                parsed: {},
                raw: "",
                format: ""
              }
            };
            text = text.replace(/¨/g, "¨T");
            text = text.replace(/\$/g, "¨D");
            text = text.replace(/\r\n/g, "\n");
            text = text.replace(/\r/g, "\n");
            text = text.replace(/\u00A0/g, "&nbsp;");
            if (options.smartIndentationFix) {
              text = rTrimInputText(text);
            }
            text = "\n\n" + text + "\n\n";
            text = showdown2.subParser("detab")(text, options, globals);
            text = text.replace(/^[ \t]+$/mg, "");
            showdown2.helper.forEach(langExtensions, function(ext) {
              text = showdown2.subParser("runExtension")(ext, text, options, globals);
            });
            text = showdown2.subParser("metadata")(text, options, globals);
            text = showdown2.subParser("hashPreCodeTags")(text, options, globals);
            text = showdown2.subParser("githubCodeBlocks")(text, options, globals);
            text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
            text = showdown2.subParser("hashCodeTags")(text, options, globals);
            text = showdown2.subParser("stripLinkDefinitions")(text, options, globals);
            text = showdown2.subParser("blockGamut")(text, options, globals);
            text = showdown2.subParser("unhashHTMLSpans")(text, options, globals);
            text = showdown2.subParser("unescapeSpecialChars")(text, options, globals);
            text = text.replace(/¨D/g, "$$");
            text = text.replace(/¨T/g, "¨");
            text = showdown2.subParser("completeHTMLDocument")(text, options, globals);
            showdown2.helper.forEach(outputModifiers, function(ext) {
              text = showdown2.subParser("runExtension")(ext, text, options, globals);
            });
            metadata = globals.metadata;
            return text;
          };
          this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
            src = src.replace(/\r\n/g, "\n");
            src = src.replace(/\r/g, "\n");
            src = src.replace(/>[ \t]+</, ">¨NBSP;<");
            if (!HTMLParser) {
              if (window && window.document) {
                HTMLParser = window.document;
              } else {
                throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
              }
            }
            var doc = HTMLParser.createElement("div");
            doc.innerHTML = src;
            var globals = {
              preList: substitutePreCodeTags(doc)
            };
            clean(doc);
            var nodes = doc.childNodes, mdDoc = "";
            for (var i = 0; i < nodes.length; i++) {
              mdDoc += showdown2.subParser("makeMarkdown.node")(nodes[i], globals);
            }
            function clean(node) {
              for (var n = 0; n < node.childNodes.length; ++n) {
                var child = node.childNodes[n];
                if (child.nodeType === 3) {
                  if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
                    node.removeChild(child);
                    --n;
                  } else {
                    child.nodeValue = child.nodeValue.split("\n").join(" ");
                    child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
                  }
                } else if (child.nodeType === 1) {
                  clean(child);
                }
              }
            }
            function substitutePreCodeTags(doc2) {
              var pres = doc2.querySelectorAll("pre"), presPH = [];
              for (var i2 = 0; i2 < pres.length; ++i2) {
                if (pres[i2].childElementCount === 1 && pres[i2].firstChild.tagName.toLowerCase() === "code") {
                  var content = pres[i2].firstChild.innerHTML.trim(), language = pres[i2].firstChild.getAttribute("data-language") || "";
                  if (language === "") {
                    var classes = pres[i2].firstChild.className.split(" ");
                    for (var c = 0; c < classes.length; ++c) {
                      var matches = classes[c].match(/^language-(.+)$/);
                      if (matches !== null) {
                        language = matches[1];
                        break;
                      }
                    }
                  }
                  content = showdown2.helper.unescapeHTMLEntities(content);
                  presPH.push(content);
                  pres[i2].outerHTML = '<precode language="' + language + '" precodenum="' + i2.toString() + '"></precode>';
                } else {
                  presPH.push(pres[i2].innerHTML);
                  pres[i2].innerHTML = "";
                  pres[i2].setAttribute("prenum", i2.toString());
                }
              }
              return presPH;
            }
            return mdDoc;
          };
          this.setOption = function(key, value) {
            options[key] = value;
          };
          this.getOption = function(key) {
            return options[key];
          };
          this.getOptions = function() {
            return options;
          };
          this.addExtension = function(extension, name) {
            name = name || null;
            _parseExtension(extension, name);
          };
          this.useExtension = function(extensionName) {
            _parseExtension(extensionName);
          };
          this.setFlavor = function(name) {
            if (!flavor.hasOwnProperty(name)) {
              throw Error(name + " flavor was not found");
            }
            var preset = flavor[name];
            setConvFlavor = name;
            for (var option in preset) {
              if (preset.hasOwnProperty(option)) {
                options[option] = preset[option];
              }
            }
          };
          this.getFlavor = function() {
            return setConvFlavor;
          };
          this.removeExtension = function(extension) {
            if (!showdown2.helper.isArray(extension)) {
              extension = [extension];
            }
            for (var a = 0; a < extension.length; ++a) {
              var ext = extension[a];
              for (var i = 0; i < langExtensions.length; ++i) {
                if (langExtensions[i] === ext) {
                  langExtensions.splice(i, 1);
                }
              }
              for (var ii = 0; ii < outputModifiers.length; ++ii) {
                if (outputModifiers[ii] === ext) {
                  outputModifiers.splice(ii, 1);
                }
              }
            }
          };
          this.getAllExtensions = function() {
            return {
              language: langExtensions,
              output: outputModifiers
            };
          };
          this.getMetadata = function(raw) {
            if (raw) {
              return metadata.raw;
            } else {
              return metadata.parsed;
            }
          };
          this.getMetadataFormat = function() {
            return metadata.format;
          };
          this._setMetadataPair = function(key, value) {
            metadata.parsed[key] = value;
          };
          this._setMetadataFormat = function(format) {
            metadata.format = format;
          };
          this._setMetadataRaw = function(raw) {
            metadata.raw = raw;
          };
        };
        showdown2.subParser("anchors", function(text, options, globals) {
          text = globals.converter._dispatch("anchors.before", text, options, globals);
          var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
            if (showdown2.helper.isUndefined(title)) {
              title = "";
            }
            linkId = linkId.toLowerCase();
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (!url) {
              if (!linkId) {
                linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown2.helper.isUndefined(globals.gUrls[linkId])) {
                url = globals.gUrls[linkId];
                if (!showdown2.helper.isUndefined(globals.gTitles[linkId])) {
                  title = globals.gTitles[linkId];
                }
              } else {
                return wholeMatch;
              }
            }
            url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var result = '<a href="' + url + '"';
            if (title !== "" && title !== null) {
              title = title.replace(/"/g, "&quot;");
              title = title.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (options.openLinksInNewWindow && !/^#/.test(url)) {
              result += ' rel="noopener noreferrer" target="¨E95Eblank"';
            }
            result += ">" + linkText + "</a>";
            return result;
          };
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
          if (options.ghMentions) {
            text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st, escape, mentions, username) {
              if (escape === "\\") {
                return st + mentions;
              }
              if (!showdown2.helper.isString(options.ghMentionsLink)) {
                throw new Error("ghMentionsLink option must be a string");
              }
              var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
              if (options.openLinksInNewWindow) {
                target = ' rel="noopener noreferrer" target="¨E95Eblank"';
              }
              return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
            });
          }
          text = globals.converter._dispatch("anchors.after", text, options, globals);
          return text;
        });
        var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
          return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
            link = link.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
            if (/^www\./i.test(link)) {
              link = link.replace(/^www\./i, "http://www.");
            }
            if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
              append = trailingPunctuation;
            }
            if (options.openLinksInNewWindow) {
              target = ' rel="noopener noreferrer" target="¨E95Eblank"';
            }
            return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
          };
        }, replaceMail = function(options, globals) {
          return function(wholeMatch, b, mail) {
            var href = "mailto:";
            b = b || "";
            mail = showdown2.subParser("unescapeSpecialChars")(mail, options, globals);
            if (options.encodeEmails) {
              href = showdown2.helper.encodeEmailAddress(href + mail);
              mail = showdown2.helper.encodeEmailAddress(mail);
            } else {
              href = href + mail;
            }
            return b + '<a href="' + href + '">' + mail + "</a>";
          };
        };
        showdown2.subParser("autoLinks", function(text, options, globals) {
          text = globals.converter._dispatch("autoLinks.before", text, options, globals);
          text = text.replace(delimUrlRegex, replaceLink(options));
          text = text.replace(delimMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("autoLinks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("simplifiedAutoLinks", function(text, options, globals) {
          if (!options.simplifiedAutoLink) {
            return text;
          }
          text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
          if (options.excludeTrailingPunctuationFromURLs) {
            text = text.replace(simpleURLRegex2, replaceLink(options));
          } else {
            text = text.replace(simpleURLRegex, replaceLink(options));
          }
          text = text.replace(simpleMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("blockGamut", function(text, options, globals) {
          text = globals.converter._dispatch("blockGamut.before", text, options, globals);
          text = showdown2.subParser("blockQuotes")(text, options, globals);
          text = showdown2.subParser("headers")(text, options, globals);
          text = showdown2.subParser("horizontalRule")(text, options, globals);
          text = showdown2.subParser("lists")(text, options, globals);
          text = showdown2.subParser("codeBlocks")(text, options, globals);
          text = showdown2.subParser("tables")(text, options, globals);
          text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
          text = showdown2.subParser("paragraphs")(text, options, globals);
          text = globals.converter._dispatch("blockGamut.after", text, options, globals);
          return text;
        });
        showdown2.subParser("blockQuotes", function(text, options, globals) {
          text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
          text = text + "\n\n";
          var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
          if (options.splitAdjacentBlockquotes) {
            rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
          }
          text = text.replace(rgx, function(bq) {
            bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
            bq = bq.replace(/¨0/g, "");
            bq = bq.replace(/^[ \t]+$/gm, "");
            bq = showdown2.subParser("githubCodeBlocks")(bq, options, globals);
            bq = showdown2.subParser("blockGamut")(bq, options, globals);
            bq = bq.replace(/(^|\n)/g, "$1  ");
            bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
              var pre = m1;
              pre = pre.replace(/^  /mg, "¨0");
              pre = pre.replace(/¨0/g, "");
              return pre;
            });
            return showdown2.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
          });
          text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("codeBlocks", function(text, options, globals) {
          text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
          text += "¨0";
          var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
          text = text.replace(pattern, function(wholeMatch, m1, m2) {
            var codeblock = m1, nextChar = m2, end = "\n";
            codeblock = showdown2.subParser("outdent")(codeblock, options, globals);
            codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown2.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            if (options.omitExtraWLInCodeBlocks) {
              end = "";
            }
            codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
            return showdown2.subParser("hashBlock")(codeblock, options, globals) + nextChar;
          });
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("codeSpans", function(text, options, globals) {
          text = globals.converter._dispatch("codeSpans.before", text, options, globals);
          if (typeof text === "undefined") {
            text = "";
          }
          text = text.replace(
            /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
            function(wholeMatch, m1, m2, m3) {
              var c = m3;
              c = c.replace(/^([ \t]*)/g, "");
              c = c.replace(/[ \t]*$/g, "");
              c = showdown2.subParser("encodeCode")(c, options, globals);
              c = m1 + "<code>" + c + "</code>";
              c = showdown2.subParser("hashHTMLSpans")(c, options, globals);
              return c;
            }
          );
          text = globals.converter._dispatch("codeSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("completeHTMLDocument", function(text, options, globals) {
          if (!options.completeHTMLDocument) {
            return text;
          }
          text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
          var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
          if (typeof globals.metadata.parsed.doctype !== "undefined") {
            doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
            doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
            if (doctype === "html" || doctype === "html5") {
              charset = '<meta charset="utf-8">';
            }
          }
          for (var meta in globals.metadata.parsed) {
            if (globals.metadata.parsed.hasOwnProperty(meta)) {
              switch (meta.toLowerCase()) {
                case "doctype":
                  break;
                case "title":
                  title = "<title>" + globals.metadata.parsed.title + "</title>\n";
                  break;
                case "charset":
                  if (doctype === "html" || doctype === "html5") {
                    charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
                  } else {
                    charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
                  }
                  break;
                case "language":
                case "lang":
                  lang = ' lang="' + globals.metadata.parsed[meta] + '"';
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
                  break;
                default:
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              }
            }
          }
          text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
          text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
          return text;
        });
        showdown2.subParser("detab", function(text, options, globals) {
          text = globals.converter._dispatch("detab.before", text, options, globals);
          text = text.replace(/\t(?=\t)/g, "    ");
          text = text.replace(/\t/g, "¨A¨B");
          text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
            var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
            for (var i = 0; i < numSpaces; i++) {
              leadingText += " ";
            }
            return leadingText;
          });
          text = text.replace(/¨A/g, "    ");
          text = text.replace(/¨B/g, "");
          text = globals.converter._dispatch("detab.after", text, options, globals);
          return text;
        });
        showdown2.subParser("ellipsis", function(text, options, globals) {
          if (!options.ellipsis) {
            return text;
          }
          text = globals.converter._dispatch("ellipsis.before", text, options, globals);
          text = text.replace(/\.\.\./g, "…");
          text = globals.converter._dispatch("ellipsis.after", text, options, globals);
          return text;
        });
        showdown2.subParser("emoji", function(text, options, globals) {
          if (!options.emoji) {
            return text;
          }
          text = globals.converter._dispatch("emoji.before", text, options, globals);
          var emojiRgx = /:([\S]+?):/g;
          text = text.replace(emojiRgx, function(wm, emojiCode) {
            if (showdown2.helper.emojis.hasOwnProperty(emojiCode)) {
              return showdown2.helper.emojis[emojiCode];
            }
            return wm;
          });
          text = globals.converter._dispatch("emoji.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeAmpsAndAngles", function(text, options, globals) {
          text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
          text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
          text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
          text = text.replace(/</g, "&lt;");
          text = text.replace(/>/g, "&gt;");
          text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeBackslashEscapes", function(text, options, globals) {
          text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
          text = text.replace(/\\(\\)/g, showdown2.helper.escapeCharactersCallback);
          text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeCode", function(text, options, globals) {
          text = globals.converter._dispatch("encodeCode.before", text, options, globals);
          text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeCode.after", text, options, globals);
          return text;
        });
        showdown2.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
          var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
          text = text.replace(tags, function(wholeMatch) {
            return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
          });
          text = text.replace(comments, function(wholeMatch) {
            return wholeMatch.replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
          });
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("githubCodeBlocks", function(text, options, globals) {
          if (!options.ghCodeBlocks) {
            return text;
          }
          text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
          text += "¨0";
          text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
            var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
            codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown2.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
            codeblock = showdown2.subParser("hashBlock")(codeblock, options, globals);
            return "\n\n¨G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          });
          text = text.replace(/¨0/, "");
          return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
        });
        showdown2.subParser("hashBlock", function(text, options, globals) {
          text = globals.converter._dispatch("hashBlock.before", text, options, globals);
          text = text.replace(/(^\n+|\n+$)/g, "");
          text = "\n\n¨K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
          text = globals.converter._dispatch("hashBlock.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashCodeTags", function(text, options, globals) {
          text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
            return "¨C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
          };
          text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
          text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashElement", function(text, options, globals) {
          return function(wholeMatch, m1) {
            var blockText = m1;
            blockText = blockText.replace(/\n\n/g, "\n");
            blockText = blockText.replace(/^\n/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n¨K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
            return blockText;
          };
        });
        showdown2.subParser("hashHTMLBlocks", function(text, options, globals) {
          text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
          var blockTags = [
            "pre",
            "div",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "table",
            "dl",
            "ol",
            "ul",
            "script",
            "noscript",
            "form",
            "fieldset",
            "iframe",
            "math",
            "style",
            "section",
            "header",
            "footer",
            "nav",
            "article",
            "aside",
            "address",
            "audio",
            "canvas",
            "figure",
            "hgroup",
            "output",
            "video",
            "p"
          ], repFunc = function(wholeMatch, match, left, right) {
            var txt = wholeMatch;
            if (left.search(/\bmarkdown\b/) !== -1) {
              txt = left + globals.converter.makeHtml(match) + right;
            }
            return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          };
          if (options.backslashEscapesHTMLTags) {
            text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
              return "&lt;" + inside + "&gt;";
            });
          }
          for (var i = 0; i < blockTags.length; ++i) {
            var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
            while ((opTagPos = showdown2.helper.regexIndexOf(text, rgx1)) !== -1) {
              var subTexts = showdown2.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown2.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
              if (newSubText1 === subTexts[1]) {
                break;
              }
              text = subTexts[0].concat(newSubText1);
            }
          }
          text = text.replace(
            /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
            showdown2.subParser("hashElement")(text, options, globals)
          );
          text = showdown2.helper.replaceRecursiveRegExp(text, function(txt) {
            return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          }, "^ {0,3}<!--", "-->", "gm");
          text = text.replace(
            /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
            showdown2.subParser("hashElement")(text, options, globals)
          );
          text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashHTMLSpans", function(text, options, globals) {
          text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
          function hashHTMLSpan(html) {
            return "¨C" + (globals.gHtmlSpans.push(html) - 1) + "C";
          }
          text = text.replace(/<[^>]+?\/>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<[^>]+?>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("unhashHTMLSpans", function(text, options, globals) {
          text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
          for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
            var repText = globals.gHtmlSpans[i], limit = 0;
            while (/¨C(\d+)C/.test(repText)) {
              var num = RegExp.$1;
              repText = repText.replace("¨C" + num + "C", globals.gHtmlSpans[num]);
              if (limit === 10) {
                console.error("maximum nesting of 10 spans reached!!!");
                break;
              }
              ++limit;
            }
            text = text.replace("¨C" + i + "C", repText);
          }
          text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashPreCodeTags", function(text, options, globals) {
          text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
            return "\n\n¨G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          };
          text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
          text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
          return text;
        });
        showdown2.subParser("headers", function(text, options, globals) {
          text = globals.converter._dispatch("headers.before", text, options, globals);
          var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
          text = text.replace(setextRegexH1, function(wholeMatch, m1) {
            var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(hashBlock, options, globals);
          });
          text = text.replace(setextRegexH2, function(matchFound, m1) {
            var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(hashBlock, options, globals);
          });
          var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
          text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
            var hText = m2;
            if (options.customizedHeaderId) {
              hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
            }
            var span = showdown2.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(header, options, globals);
          });
          function headerId(m) {
            var title, prefix;
            if (options.customizedHeaderId) {
              var match = m.match(/\{([^{]+?)}\s*$/);
              if (match && match[1]) {
                m = match[1];
              }
            }
            title = m;
            if (showdown2.helper.isString(options.prefixHeaderId)) {
              prefix = options.prefixHeaderId;
            } else if (options.prefixHeaderId === true) {
              prefix = "section-";
            } else {
              prefix = "";
            }
            if (!options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (options.ghCompatibleHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
            } else if (options.rawHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
            } else {
              title = title.replace(/[^\w]/g, "").toLowerCase();
            }
            if (options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (globals.hashLinkCounts[title]) {
              title = title + "-" + globals.hashLinkCounts[title]++;
            } else {
              globals.hashLinkCounts[title] = 1;
            }
            return title;
          }
          text = globals.converter._dispatch("headers.after", text, options, globals);
          return text;
        });
        showdown2.subParser("horizontalRule", function(text, options, globals) {
          text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
          var key = showdown2.subParser("hashBlock")("<hr />", options, globals);
          text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
          text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
          return text;
        });
        showdown2.subParser("images", function(text, options, globals) {
          text = globals.converter._dispatch("images.before", text, options, globals);
          var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
          function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
            url = url.replace(/\s/g, "");
            return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
          }
          function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
            var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
            linkId = linkId.toLowerCase();
            if (!title) {
              title = "";
            }
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (url === "" || url === null) {
              if (linkId === "" || linkId === null) {
                linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown2.helper.isUndefined(gUrls[linkId])) {
                url = gUrls[linkId];
                if (!showdown2.helper.isUndefined(gTitles[linkId])) {
                  title = gTitles[linkId];
                }
                if (!showdown2.helper.isUndefined(gDims[linkId])) {
                  width = gDims[linkId].width;
                  height = gDims[linkId].height;
                }
              } else {
                return wholeMatch;
              }
            }
            altText = altText.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var result = '<img src="' + url + '" alt="' + altText + '"';
            if (title && showdown2.helper.isString(title)) {
              title = title.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (width && height) {
              width = width === "*" ? "auto" : width;
              height = height === "*" ? "auto" : height;
              result += ' width="' + width + '"';
              result += ' height="' + height + '"';
            }
            result += " />";
            return result;
          }
          text = text.replace(referenceRegExp, writeImageTag);
          text = text.replace(base64RegExp, writeImageTagBase64);
          text = text.replace(crazyRegExp, writeImageTag);
          text = text.replace(inlineRegExp, writeImageTag);
          text = text.replace(refShortcutRegExp, writeImageTag);
          text = globals.converter._dispatch("images.after", text, options, globals);
          return text;
        });
        showdown2.subParser("italicsAndBold", function(text, options, globals) {
          text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
          function parseInside(txt, left, right) {
            return left + txt + right;
          }
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return parseInside(txt, "<strong><em>", "</em></strong>");
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return parseInside(txt, "<strong>", "</strong>");
            });
            text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
              return parseInside(txt, "<em>", "</em>");
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          if (options.literalMidWordAsterisks) {
            text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong><em>", "</em></strong>");
            });
            text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong>", "</strong>");
            });
            text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<em>", "</em>");
            });
          } else {
            text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
          return text;
        });
        showdown2.subParser("lists", function(text, options, globals) {
          function processListItems(listStr, trimTrailing) {
            globals.gListLevel++;
            listStr = listStr.replace(/\n{2,}$/, "\n");
            listStr += "¨0";
            var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
            if (options.disableForced4SpacesIndentedSublists) {
              rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
            }
            listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
              checked = checked && checked.trim() !== "";
              var item = showdown2.subParser("outdent")(m4, options, globals), bulletStyle = "";
              if (taskbtn && options.tasklists) {
                bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
                item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                  var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                  if (checked) {
                    otp += " checked";
                  }
                  otp += ">";
                  return otp;
                });
              }
              item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
                return "¨A" + wm2;
              });
              if (m1 || item.search(/\n{2,}/) > -1) {
                item = showdown2.subParser("githubCodeBlocks")(item, options, globals);
                item = showdown2.subParser("blockGamut")(item, options, globals);
              } else {
                item = showdown2.subParser("lists")(item, options, globals);
                item = item.replace(/\n$/, "");
                item = showdown2.subParser("hashHTMLBlocks")(item, options, globals);
                item = item.replace(/\n\n+/g, "\n\n");
                if (isParagraphed) {
                  item = showdown2.subParser("paragraphs")(item, options, globals);
                } else {
                  item = showdown2.subParser("spanGamut")(item, options, globals);
                }
              }
              item = item.replace("¨A", "");
              item = "<li" + bulletStyle + ">" + item + "</li>\n";
              return item;
            });
            listStr = listStr.replace(/¨0/g, "");
            globals.gListLevel--;
            if (trimTrailing) {
              listStr = listStr.replace(/\s+$/, "");
            }
            return listStr;
          }
          function styleStartNumber(list, listType) {
            if (listType === "ol") {
              var res = list.match(/^ *(\d+)\./);
              if (res && res[1] !== "1") {
                return ' start="' + res[1] + '"';
              }
            }
            return "";
          }
          function parseConsecutiveLists(list, listType, trimTrailing) {
            var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
            if (list.search(counterRxg) !== -1) {
              (function parseCL(txt) {
                var pos = txt.search(counterRxg), style2 = styleStartNumber(list, listType);
                if (pos !== -1) {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
                  listType = listType === "ul" ? "ol" : "ul";
                  counterRxg = listType === "ul" ? olRgx : ulRgx;
                  parseCL(txt.slice(pos));
                } else {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
                }
              })(list);
            } else {
              var style = styleStartNumber(list, listType);
              result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
            }
            return result;
          }
          text = globals.converter._dispatch("lists.before", text, options, globals);
          text += "¨0";
          if (globals.gListLevel) {
            text = text.replace(
              /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, list, m2) {
                var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, true);
              }
            );
          } else {
            text = text.replace(
              /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, m1, list, m3) {
                var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, false);
              }
            );
          }
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("lists.after", text, options, globals);
          return text;
        });
        showdown2.subParser("metadata", function(text, options, globals) {
          if (!options.metadata) {
            return text;
          }
          text = globals.converter._dispatch("metadata.before", text, options, globals);
          function parseMetadataContents(content) {
            globals.metadata.raw = content;
            content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
            content = content.replace(/\n {4}/g, " ");
            content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
              globals.metadata.parsed[key] = value;
              return "";
            });
          }
          text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
            parseMetadataContents(content);
            return "¨M";
          });
          text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
            if (format) {
              globals.metadata.format = format;
            }
            parseMetadataContents(content);
            return "¨M";
          });
          text = text.replace(/¨M/g, "");
          text = globals.converter._dispatch("metadata.after", text, options, globals);
          return text;
        });
        showdown2.subParser("outdent", function(text, options, globals) {
          text = globals.converter._dispatch("outdent.before", text, options, globals);
          text = text.replace(/^(\t|[ ]{1,4})/gm, "¨0");
          text = text.replace(/¨0/g, "");
          text = globals.converter._dispatch("outdent.after", text, options, globals);
          return text;
        });
        showdown2.subParser("paragraphs", function(text, options, globals) {
          text = globals.converter._dispatch("paragraphs.before", text, options, globals);
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
          for (var i = 0; i < end; i++) {
            var str = grafs[i];
            if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
              grafsOut.push(str);
            } else if (str.search(/\S/) >= 0) {
              str = showdown2.subParser("spanGamut")(str, options, globals);
              str = str.replace(/^([ \t]*)/g, "<p>");
              str += "</p>";
              grafsOut.push(str);
            }
          }
          end = grafsOut.length;
          for (i = 0; i < end; i++) {
            var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
            while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
              var delim = RegExp.$1, num = RegExp.$2;
              if (delim === "K") {
                blockText = globals.gHtmlBlocks[num];
              } else {
                if (codeFlag) {
                  blockText = showdown2.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
                } else {
                  blockText = globals.ghCodeBlocks[num].codeblock;
                }
              }
              blockText = blockText.replace(/\$/g, "$$$$");
              grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
              if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
                codeFlag = true;
              }
            }
            grafsOut[i] = grafsOutIt;
          }
          text = grafsOut.join("\n");
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          return globals.converter._dispatch("paragraphs.after", text, options, globals);
        });
        showdown2.subParser("runExtension", function(ext, text, options, globals) {
          if (ext.filter) {
            text = ext.filter(text, globals.converter, options);
          } else if (ext.regex) {
            var re = ext.regex;
            if (!(re instanceof RegExp)) {
              re = new RegExp(re, "g");
            }
            text = text.replace(re, ext.replace);
          }
          return text;
        });
        showdown2.subParser("spanGamut", function(text, options, globals) {
          text = globals.converter._dispatch("spanGamut.before", text, options, globals);
          text = showdown2.subParser("codeSpans")(text, options, globals);
          text = showdown2.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
          text = showdown2.subParser("encodeBackslashEscapes")(text, options, globals);
          text = showdown2.subParser("images")(text, options, globals);
          text = showdown2.subParser("anchors")(text, options, globals);
          text = showdown2.subParser("autoLinks")(text, options, globals);
          text = showdown2.subParser("simplifiedAutoLinks")(text, options, globals);
          text = showdown2.subParser("emoji")(text, options, globals);
          text = showdown2.subParser("underline")(text, options, globals);
          text = showdown2.subParser("italicsAndBold")(text, options, globals);
          text = showdown2.subParser("strikethrough")(text, options, globals);
          text = showdown2.subParser("ellipsis")(text, options, globals);
          text = showdown2.subParser("hashHTMLSpans")(text, options, globals);
          text = showdown2.subParser("encodeAmpsAndAngles")(text, options, globals);
          if (options.simpleLineBreaks) {
            if (!/\n\n¨K/.test(text)) {
              text = text.replace(/\n+/g, "<br />\n");
            }
          } else {
            text = text.replace(/  +\n/g, "<br />\n");
          }
          text = globals.converter._dispatch("spanGamut.after", text, options, globals);
          return text;
        });
        showdown2.subParser("strikethrough", function(text, options, globals) {
          function parseInside(txt) {
            if (options.simplifiedAutoLink) {
              txt = showdown2.subParser("simplifiedAutoLinks")(txt, options, globals);
            }
            return "<del>" + txt + "</del>";
          }
          if (options.strikethrough) {
            text = globals.converter._dispatch("strikethrough.before", text, options, globals);
            text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
              return parseInside(txt);
            });
            text = globals.converter._dispatch("strikethrough.after", text, options, globals);
          }
          return text;
        });
        showdown2.subParser("stripLinkDefinitions", function(text, options, globals) {
          var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
          text += "¨0";
          var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
            linkId = linkId.toLowerCase();
            if (text.toLowerCase().split(linkId).length - 1 < 2) {
              return wholeMatch;
            }
            if (url.match(/^data:.+?\/.+?;base64,/)) {
              globals.gUrls[linkId] = url.replace(/\s/g, "");
            } else {
              globals.gUrls[linkId] = showdown2.subParser("encodeAmpsAndAngles")(url, options, globals);
            }
            if (blankLines) {
              return blankLines + title;
            } else {
              if (title) {
                globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
              }
              if (options.parseImgDimensions && width && height) {
                globals.gDimensions[linkId] = {
                  width,
                  height
                };
              }
            }
            return "";
          };
          text = text.replace(base64Regex, replaceFunc);
          text = text.replace(regex, replaceFunc);
          text = text.replace(/¨0/, "");
          return text;
        });
        showdown2.subParser("tables", function(text, options, globals) {
          if (!options.tables) {
            return text;
          }
          var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
          function parseStyles(sLine) {
            if (/^:[ \t]*--*$/.test(sLine)) {
              return ' style="text-align:left;"';
            } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
              return ' style="text-align:right;"';
            } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
              return ' style="text-align:center;"';
            } else {
              return "";
            }
          }
          function parseHeaders(header, style) {
            var id = "";
            header = header.trim();
            if (options.tablesHeaderId || options.tableHeaderId) {
              id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
            }
            header = showdown2.subParser("spanGamut")(header, options, globals);
            return "<th" + id + style + ">" + header + "</th>\n";
          }
          function parseCells(cell, style) {
            var subText = showdown2.subParser("spanGamut")(cell, options, globals);
            return "<td" + style + ">" + subText + "</td>\n";
          }
          function buildTable(headers, cells) {
            var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
            for (var i = 0; i < tblLgn; ++i) {
              tb += headers[i];
            }
            tb += "</tr>\n</thead>\n<tbody>\n";
            for (i = 0; i < cells.length; ++i) {
              tb += "<tr>\n";
              for (var ii = 0; ii < tblLgn; ++ii) {
                tb += cells[i][ii];
              }
              tb += "</tr>\n";
            }
            tb += "</tbody>\n</table>\n";
            return tb;
          }
          function parseTable(rawTable) {
            var i, tableLines = rawTable.split("\n");
            for (i = 0; i < tableLines.length; ++i) {
              if (/^ {0,3}\|/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
              }
              if (/\|[ \t]*$/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
              }
              tableLines[i] = showdown2.subParser("codeSpans")(tableLines[i], options, globals);
            }
            var rawHeaders = tableLines[0].split("|").map(function(s) {
              return s.trim();
            }), rawStyles = tableLines[1].split("|").map(function(s) {
              return s.trim();
            }), rawCells = [], headers = [], styles = [], cells = [];
            tableLines.shift();
            tableLines.shift();
            for (i = 0; i < tableLines.length; ++i) {
              if (tableLines[i].trim() === "") {
                continue;
              }
              rawCells.push(
                tableLines[i].split("|").map(function(s) {
                  return s.trim();
                })
              );
            }
            if (rawHeaders.length < rawStyles.length) {
              return rawTable;
            }
            for (i = 0; i < rawStyles.length; ++i) {
              styles.push(parseStyles(rawStyles[i]));
            }
            for (i = 0; i < rawHeaders.length; ++i) {
              if (showdown2.helper.isUndefined(styles[i])) {
                styles[i] = "";
              }
              headers.push(parseHeaders(rawHeaders[i], styles[i]));
            }
            for (i = 0; i < rawCells.length; ++i) {
              var row = [];
              for (var ii = 0; ii < headers.length; ++ii) {
                if (showdown2.helper.isUndefined(rawCells[i][ii])) ;
                row.push(parseCells(rawCells[i][ii], styles[ii]));
              }
              cells.push(row);
            }
            return buildTable(headers, cells);
          }
          text = globals.converter._dispatch("tables.before", text, options, globals);
          text = text.replace(/\\(\|)/g, showdown2.helper.escapeCharactersCallback);
          text = text.replace(tableRgx, parseTable);
          text = text.replace(singeColTblRgx, parseTable);
          text = globals.converter._dispatch("tables.after", text, options, globals);
          return text;
        });
        showdown2.subParser("underline", function(text, options, globals) {
          if (!options.underline) {
            return text;
          }
          text = globals.converter._dispatch("underline.before", text, options, globals);
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
              return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
              return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
            });
          }
          text = text.replace(/(_)/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("underline.after", text, options, globals);
          return text;
        });
        showdown2.subParser("unescapeSpecialChars", function(text, options, globals) {
          text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
          text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
            var charCodeToReplace = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
          });
          text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
          return text;
        });
        showdown2.subParser("makeMarkdown.blockquote", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              var innerTxt = showdown2.subParser("makeMarkdown.node")(children[i], globals);
              if (innerTxt === "") {
                continue;
              }
              txt += innerTxt;
            }
          }
          txt = txt.trim();
          txt = "> " + txt.split("\n").join("\n> ");
          return txt;
        });
        showdown2.subParser("makeMarkdown.codeBlock", function(node, globals) {
          var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
          return "```" + lang + "\n" + globals.preList[num] + "\n```";
        });
        showdown2.subParser("makeMarkdown.codeSpan", function(node) {
          return "`" + node.innerHTML + "`";
        });
        showdown2.subParser("makeMarkdown.emphasis", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "*";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "*";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
          var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
          if (node.hasChildNodes()) {
            txt = headerMark + " ";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.hr", function() {
          return "---";
        });
        showdown2.subParser("makeMarkdown.image", function(node) {
          var txt = "";
          if (node.hasAttribute("src")) {
            txt += "![" + node.getAttribute("alt") + "](";
            txt += "<" + node.getAttribute("src") + ">";
            if (node.hasAttribute("width") && node.hasAttribute("height")) {
              txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
            }
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.links", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes() && node.hasAttribute("href")) {
            var children = node.childNodes, childrenLength = children.length;
            txt = "[";
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "](";
            txt += "<" + node.getAttribute("href") + ">";
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.list", function(node, globals, type) {
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
          for (var i = 0; i < listItemsLenght; ++i) {
            if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
              continue;
            }
            var bullet = "";
            if (type === "ol") {
              bullet = listNum.toString() + ". ";
            } else {
              bullet = "- ";
            }
            txt += bullet + showdown2.subParser("makeMarkdown.listItem")(listItems[i], globals);
            ++listNum;
          }
          txt += "\n<!-- -->\n";
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.listItem", function(node, globals) {
          var listItemTxt = "";
          var children = node.childNodes, childrenLenght = children.length;
          for (var i = 0; i < childrenLenght; ++i) {
            listItemTxt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
          if (!/\n$/.test(listItemTxt)) {
            listItemTxt += "\n";
          } else {
            listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
          }
          return listItemTxt;
        });
        showdown2.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
          spansOnly = spansOnly || false;
          var txt = "";
          if (node.nodeType === 3) {
            return showdown2.subParser("makeMarkdown.txt")(node, globals);
          }
          if (node.nodeType === 8) {
            return "<!--" + node.data + "-->\n\n";
          }
          if (node.nodeType !== 1) {
            return "";
          }
          var tagName = node.tagName.toLowerCase();
          switch (tagName) {
            //
            // BLOCKS
            //
            case "h1":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
              }
              break;
            case "h2":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
              }
              break;
            case "h3":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
              }
              break;
            case "h4":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
              }
              break;
            case "h5":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
              }
              break;
            case "h6":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
              }
              break;
            case "p":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
              }
              break;
            case "blockquote":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
              }
              break;
            case "hr":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
              }
              break;
            case "ol":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
              }
              break;
            case "ul":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
              }
              break;
            case "precode":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
              }
              break;
            case "pre":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
              }
              break;
            case "table":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.table")(node, globals) + "\n\n";
              }
              break;
            //
            // SPANS
            //
            case "code":
              txt = showdown2.subParser("makeMarkdown.codeSpan")(node, globals);
              break;
            case "em":
            case "i":
              txt = showdown2.subParser("makeMarkdown.emphasis")(node, globals);
              break;
            case "strong":
            case "b":
              txt = showdown2.subParser("makeMarkdown.strong")(node, globals);
              break;
            case "del":
              txt = showdown2.subParser("makeMarkdown.strikethrough")(node, globals);
              break;
            case "a":
              txt = showdown2.subParser("makeMarkdown.links")(node, globals);
              break;
            case "img":
              txt = showdown2.subParser("makeMarkdown.image")(node, globals);
              break;
            default:
              txt = node.outerHTML + "\n\n";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.paragraph", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          txt = txt.trim();
          return txt;
        });
        showdown2.subParser("makeMarkdown.pre", function(node, globals) {
          var num = node.getAttribute("prenum");
          return "<pre>" + globals.preList[num] + "</pre>";
        });
        showdown2.subParser("makeMarkdown.strikethrough", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "~~";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "~~";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.strong", function(node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "**";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "**";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.table", function(node, globals) {
          var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
          for (i = 0; i < headings.length; ++i) {
            var headContent = showdown2.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
            if (headings[i].hasAttribute("style")) {
              var style = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
              switch (style) {
                case "text-align:left;":
                  allign = ":---";
                  break;
                case "text-align:right;":
                  allign = "---:";
                  break;
                case "text-align:center;":
                  allign = ":---:";
                  break;
              }
            }
            tableArray[0][i] = headContent.trim();
            tableArray[1][i] = allign;
          }
          for (i = 0; i < rows.length; ++i) {
            var r = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
            for (ii = 0; ii < headings.length; ++ii) {
              var cellContent = " ";
              if (typeof cols[ii] !== "undefined") {
                cellContent = showdown2.subParser("makeMarkdown.tableCell")(cols[ii], globals);
              }
              tableArray[r].push(cellContent);
            }
          }
          var cellSpacesCount = 3;
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              var strLen = tableArray[i][ii].length;
              if (strLen > cellSpacesCount) {
                cellSpacesCount = strLen;
              }
            }
          }
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              if (i === 1) {
                if (tableArray[i][ii].slice(-1) === ":") {
                  tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
                } else {
                  tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
                }
              } else {
                tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount);
              }
            }
            txt += "| " + tableArray[i].join(" | ") + " |\n";
          }
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.tableCell", function(node, globals) {
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals, true);
          }
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.txt", function(node) {
          var txt = node.nodeValue;
          txt = txt.replace(/ +/g, " ");
          txt = txt.replace(/¨NBSP;/g, " ");
          txt = showdown2.helper.unescapeHTMLEntities(txt);
          txt = txt.replace(/([*_~|`])/g, "\\$1");
          txt = txt.replace(/^(\s*)>/g, "\\$1>");
          txt = txt.replace(/^#/gm, "\\#");
          txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
          txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
          txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
          txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
          txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
          return txt;
        });
        var root = this;
        if (module2.exports) {
          module2.exports = showdown2;
        } else {
          root.showdown = showdown2;
        }
      }).call(showdown$1);
    })(showdown$2);
    return showdown$2.exports;
  }
  var showdownExports = requireShowdown();
  const showdown = /* @__PURE__ */ getDefaultExportFromCjs$1(showdownExports);
  function createWorkerBlob(cdnUrl, services) {
    return new Blob([`
        importScripts("${cdnUrl}/service-manager.js");
        const manager = new ServiceManager(self);

        ${services.map((service) => {
      var _a, _b;
      return `
            manager.registerService("${service.name}", {
                module: () => {
                    importScripts("${(_a = service.cdnUrl) != null ? _a : cdnUrl}/${service.script}");
                    return {${service.className}};
                },
                className: "${service.className}",
                modes: "${service.modes}",
                cdnUrl: "${(_b = service.cdnUrl) != null ? _b : cdnUrl}"
            });
        `;
    }).join("\n")}
    `], { type: "application/javascript" });
  }
  function createWorker(source, includeLinters) {
    if (includeLinters === void 0) {
      includeLinters = true;
    }
    if (typeof Worker == "undefined") return {
      postMessage: function() {
      },
      terminate: function() {
      }
    };
    let blob;
    if (typeof source === "string") {
      const allServices = getServices(includeLinters);
      blob = createWorkerBlob(source, allServices);
    } else {
      const allServices = [...source.services, ...getServices(includeLinters)];
      const cdnUrl = source.serviceManagerCdn;
      blob = createWorkerBlob(cdnUrl, allServices);
    }
    var URL = window.URL || window.webkitURL;
    var blobURL = URL.createObjectURL(blob);
    return new Worker(blobURL);
  }
  function getServices(includeLinters) {
    const allServices = [
      {
        name: "json",
        script: "json-service.js",
        className: "JsonService",
        modes: "json|json5"
      },
      {
        name: "html",
        script: "html-service.js",
        className: "HtmlService",
        modes: "html"
      },
      {
        name: "css",
        script: "css-service.js",
        className: "CssService",
        modes: "css"
      },
      {
        name: "less",
        script: "css-service.js",
        className: "CssService",
        modes: "less"
      },
      {
        name: "scss",
        script: "css-service.js",
        className: "CssService",
        modes: "scss"
      },
      {
        name: "typescript",
        script: "typescript-service.js",
        className: "TypescriptService",
        modes: "typescript|tsx|javascript|jsx"
      },
      {
        name: "lua",
        script: "lua-service.js",
        className: "LuaService",
        modes: "lua"
      },
      {
        name: "yaml",
        script: "yaml-service.js",
        className: "YamlService",
        modes: "yaml"
      },
      {
        name: "xml",
        script: "xml-service.js",
        className: "XmlService",
        modes: "xml"
      },
      {
        name: "php",
        script: "php-service.js",
        className: "PhpService",
        modes: "php"
      },
      {
        name: "eslint",
        script: "javascript-service.js",
        className: "JavascriptService",
        modes: "javascript"
      },
      {
        name: "python",
        script: "python-service.js",
        className: "PythonService",
        modes: "python",
        cdnUrl: "https://www.unpkg.com/ace-python-ruff-linter/build"
      }
    ];
    if (includeLinters === true || includeLinters === void 0) {
      return allServices;
    } else if (includeLinters === false) {
      return [];
    }
    if (includeLinters.javascript) {
      includeLinters.eslint = includeLinters.javascript;
      delete includeLinters.javascript;
    }
    return allServices.filter((service) => {
      return includeLinters[service.name];
    });
  }
  var CLASSNAME = "ace_tooltip";
  class Tooltip {
    /**
     * @param {Element} parentNode
     **/
    constructor(parentNode) {
      this.isOpen = false;
      this.$element = null;
      this.$parentNode = parentNode;
    }
    $init() {
      this.$element = document.createElement("div");
      this.$element.className = CLASSNAME;
      this.$element.style.display = "none";
      this.$parentNode.appendChild(this.$element);
      return this.$element;
    }
    /**
     * @returns {HTMLElement}
     **/
    getElement() {
      return this.$element || this.$init();
    }
    /**
     * @param {String} text
     **/
    setText(text) {
      this.getElement().textContent = text;
    }
    /**
     * @param {String} html
     **/
    setHtml(html) {
      this.getElement().innerHTML = html;
    }
    /**
     * @param {Number} x
     * @param {Number} y
     **/
    setPosition(x, y) {
      this.getElement().style.left = x + "px";
      this.getElement().style.top = y + "px";
    }
    /**
     * @param {String} className
     **/
    setClassName(className) {
      this.getElement().className += " " + className;
    }
    setTheme(theme) {
      this.getElement().className = CLASSNAME + " " + (theme.isDark ? "ace_dark " : "") + (theme.cssClass || "");
    }
    /**
     * @param {String} text
     * @param {Number} x
     * @param {Number} y
     **/
    show(text, x, y) {
      if (text != null)
        this.setText(text);
      if (x != null && y != null)
        this.setPosition(x, y);
      if (!this.isOpen) {
        this.getElement().style.display = "block";
        this.isOpen = true;
      }
    }
    hide() {
      if (this.isOpen) {
        this.getElement().style.display = "none";
        this.getElement().className = CLASSNAME;
        this.isOpen = false;
      }
    }
    /**
     * @returns {Number}
     **/
    getHeight() {
      return this.getElement().offsetHeight;
    }
    /**
     * @returns {Number}
     **/
    getWidth() {
      return this.getElement().offsetWidth;
    }
    destroy() {
      this.isOpen = false;
      if (this.$element && this.$element.parentNode) {
        this.$element.parentNode.removeChild(this.$element);
      }
    }
  }
  class PopupManager {
    constructor() {
      this.popups = /* @__PURE__ */ new Set();
      this.acePopups = /* @__PURE__ */ new Set();
      this.updateScheduled = false;
    }
    addPopup(popup) {
      if (!popup || typeof popup.getElement !== "function") {
        console.warn("Invalid popup object provided to addPopup");
        return;
      }
      this.popups.add(popup);
      this.scheduleUpdate();
    }
    addAcePopup(popup) {
      if (!popup) {
        console.warn("Invalid popup object provided to addAcePopup");
        return;
      }
      this.acePopups.add(popup);
      this.scheduleUpdate();
    }
    removePopup(popup) {
      if (this.popups.has(popup)) {
        this.popups.delete(popup);
        this.scheduleUpdate();
      }
    }
    removeAcePopup(popup) {
      if (this.acePopups.has(popup)) {
        this.acePopups.delete(popup);
        this.scheduleUpdate();
      }
    }
    scheduleUpdate() {
      if (this.updateScheduled) return;
      this.updateScheduled = true;
      requestAnimationFrame(() => {
        this.updateScheduled = false;
        this.updatePopups();
      });
    }
    cleanupStalePopups() {
      for (const popup of this.popups) {
        if (!this.isPopupValid(popup)) {
          this.popups.delete(popup);
        }
      }
      for (const popup of this.acePopups) {
        if (!this.isPopupValid(popup)) {
          this.acePopups.delete(popup);
        }
      }
    }
    isPopupValid(popup) {
      try {
        const element = typeof popup.getElement === "function" ? popup.getElement() : popup.container;
        return element && element.isConnected;
      } catch (e) {
        return false;
      }
    }
    updatePopups() {
      try {
        this.cleanupStalePopups();
        const pupups = Array.from(this.popups).sort((a, b) => (b.priority || 0) - (a.priority || 0));
        const sortedPopups = [...this.acePopups, ...pupups];
        const visiblePopups = [];
        for (const popup of sortedPopups) {
          if (!this.shouldDisplayPopup(popup, visiblePopups)) {
            this.safeHidePopup(popup);
          } else {
            visiblePopups.push(popup);
          }
        }
      } catch (error) {
        console.error("Error updating popups:", error);
      }
    }
    shouldDisplayPopup(popup, visiblePopups) {
      try {
        if (!this.isPopupValid(popup)) {
          return false;
        }
        for (const visiblePopup of visiblePopups) {
          if (this.doPopupsOverlap(visiblePopup, popup)) {
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error("Error checking popup display:", error);
        return false;
      }
    }
    safeHidePopup(popup) {
      try {
        if (popup && typeof popup.hide === "function") {
          popup.hide();
        }
      } catch (error) {
        console.error("Error hiding popup:", error);
      }
    }
    doPopupsOverlap(popupA, popupB) {
      try {
        const elemA = typeof popupA.getElement === "function" ? popupA.getElement() : popupA.container;
        const elemB = typeof popupB.getElement === "function" ? popupB.getElement() : popupB.container;
        if (!elemA || !elemB || !elemA.isConnected || !elemB.isConnected) {
          return false;
        }
        const rectA = elemA.getBoundingClientRect();
        const rectB = elemB.getBoundingClientRect();
        return rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top;
      } catch (error) {
        console.error("Error checking popup overlap:", error);
        return false;
      }
    }
  }
  const popupManager = new PopupManager();
  class BaseTooltip extends Tooltip {
    constructor(provider) {
      super(document.body);
      this.$show = () => {
        if (!this.$activeEditor)
          return;
        let editor = this.$activeEditor;
        var MARGIN = 10;
        var renderer = editor.renderer;
        if (!this.isOpen) {
          this.$registerEditorEvents();
          this.setTheme(renderer.theme);
          this.isOpen = true;
        }
        let position = renderer.textToScreenCoordinates(this.row, this.column);
        var rect = renderer.scroller.getBoundingClientRect();
        if (position.pageX < rect.left)
          position.pageX = rect.left;
        var element = this.getElement();
        element.style.maxHeight = "";
        element.style.display = "block";
        var labelHeight = element.clientHeight;
        var labelWidth = element.clientWidth;
        var spaceBelow = window.innerHeight - position.pageY - renderer.lineHeight;
        let isAbove = true;
        if (position.pageY - labelHeight < 0 && position.pageY < spaceBelow) {
          isAbove = false;
        }
        element.style.maxHeight = (isAbove ? position.pageY : spaceBelow) - MARGIN + "px";
        element.style.top = isAbove ? "" : position.pageY + renderer.lineHeight + "px";
        element.style.bottom = isAbove ? window.innerHeight - position.pageY + "px" : "";
        element.style.left = Math.min(position.pageX, window.innerWidth - labelWidth - MARGIN) + "px";
        popupManager.addPopup(this);
      };
      this.$hide = () => {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.lastEvent = null;
        if (this.isOpen) {
          this.$removeEditorEvents();
          this.hide();
        }
        this.$inactivateEditor();
      };
      this.provider = provider;
      try {
        Tooltip.call(this, document.body);
      } catch (e) {
      }
      this.timeout = void 0;
      this.lastT = 0;
      this.idleTime = 500;
      var el = this.getElement();
      el.style.whiteSpace = "pre-wrap";
      el.style.pointerEvents = "auto";
    }
    hide() {
      super.hide();
      popupManager.removePopup(this);
    }
    show(param, pageX, pageY) {
      super.show(param, pageX, pageY);
      this.$registerEditorEvents();
    }
    setHtml(descriptionText) {
      super.setHtml(descriptionText);
    }
    $inactivateEditor() {
      this.$activeEditor = void 0;
    }
    $activateEditor(editor) {
      if (this.$activeEditor == editor)
        return;
      this.$activeEditor = editor;
    }
    destroy() {
      this.$hide();
    }
    $registerEditorEvents() {
    }
    $removeEditorEvents() {
    }
  }
  class SignatureTooltip extends BaseTooltip {
    constructor() {
      super(...arguments);
      this.editorHandlers = /* @__PURE__ */ new Map();
      this.escCommand = {
        exec: this.$hide,
        bindKey: "Esc"
      };
      this.onChangeSelection = (editor) => {
        if (!this.provider.options.functionality.signatureHelp)
          return;
        this.$activateEditor(editor);
        if (this.isOpen) {
          setTimeout(this.provideSignatureHelp, 0);
        } else {
          this.lastT = Date.now();
          this.timeout = setTimeout(this.waitForSignature, this.idleTime);
        }
      };
      this.waitForSignature = () => {
        if (this.timeout) clearTimeout(this.timeout);
        var dt = Date.now() - this.lastT;
        if (this.idleTime - dt > 10) {
          this.timeout = setTimeout(this.waitForSignature, this.idleTime - dt);
          return;
        }
        this.timeout = void 0;
        this.provideSignatureHelp();
      };
      this.provideSignatureHelp = () => {
        if (!this.$activeEditor) {
          return;
        }
        let cursor = this.$activeEditor.getCursorPosition();
        let session = this.$activeEditor.session;
        let docPos = session.screenToDocumentPosition(cursor.row, cursor.column);
        this.provider.provideSignatureHelp(session, docPos, (tooltip) => {
          var _a, _b, _c, _d, _e;
          let descriptionText = tooltip ? this.provider.getTooltipText(tooltip) : null;
          if (!tooltip || !descriptionText) {
            this.hide();
            return;
          }
          let token = session.getTokenAt(docPos.row, docPos.column);
          let row = (_b = (_a = tooltip.range) == null ? void 0 : _a.start.row) != null ? _b : docPos.row;
          let column = (_e = (_d = (_c = tooltip.range) == null ? void 0 : _c.start.column) != null ? _d : token == null ? void 0 : token.start) != null ? _e : 0;
          if (this.descriptionText != descriptionText) {
            this.hide();
            this.setHtml(descriptionText);
            this.descriptionText = descriptionText;
          } else if (this.row == row && this.column == column && this.isOpen) {
            return;
          }
          this.row = row;
          this.column = column;
          this.$show();
        });
      };
      this.$onAfterRender = (e) => {
        if (!this.isOpen) return;
        setTimeout(() => {
          var _a;
          if (!((_a = this.$activeEditor) == null ? void 0 : _a.isRowVisible(this.row))) {
            this.$hide();
          } else {
            this.$show();
          }
        }, 0);
      };
    }
    registerEditor(editor) {
      const handler = () => this.onChangeSelection(editor);
      this.editorHandlers.set(editor, handler);
      editor.on("changeSelection", handler);
      editor.commands.addCommand(this.escCommand);
    }
    unregisterEditor(editor) {
      const handler = this.editorHandlers.get(editor);
      if (handler) {
        editor.off("changeSelection", handler);
        this.editorHandlers.delete(editor);
      }
      if (this.$activeEditor === editor) {
        this.$inactivateEditor();
      }
      editor.commands.removeCommand(this.escCommand);
    }
    $registerEditorEvents() {
      this.$activeEditor.renderer.on("afterRender", this.$onAfterRender);
      this.$activeEditor.on("blur", this.$hide);
    }
    $removeEditorEvents() {
      this.$activeEditor.renderer.off("afterRender", this.$onAfterRender);
      this.$activeEditor.off("blur", this.$hide);
    }
  }
  function preventParentScroll(event) {
    event.stopPropagation();
    var target = event.currentTarget;
    var contentOverflows = target.scrollHeight > target.clientHeight;
    if (!contentOverflows) {
      event.preventDefault();
    }
  }
  class HoverTooltip extends Tooltip {
    constructor(parentNode = document.body) {
      super(parentNode);
      this.timeout = void 0;
      this.mouseOutHideTimer = null;
      this.mouseMoveHideTimer = null;
      this.$fromKeyboard = false;
      this.lastT = 0;
      this.idleTime = 350;
      this.lastEvent = void 0;
      this.onMouseOut = this.onMouseOut.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.waitForHover = this.waitForHover.bind(this);
      this.hide = this.hide.bind(this);
      var el = this.getElement();
      el.style.whiteSpace = "pre-wrap";
      el.style.pointerEvents = "auto";
      el.addEventListener("mouseout", this.onMouseOut);
      el.tabIndex = -1;
      el.addEventListener(
        "blur",
        (function() {
          if (!el.contains(document.activeElement)) this.hide();
        }).bind(this)
      );
      el.addEventListener("wheel", preventParentScroll);
    }
    /**
     * @param {Editor} editor
     */
    addToEditor(editor) {
      editor.on("mousemove", this.onMouseMove);
      editor.on("mousedown", this.hide);
      var target = editor.renderer.getMouseEventTarget();
      if (target && typeof target.removeEventListener === "function") {
        target.addEventListener("mouseout", this.onMouseOut, true);
      }
    }
    /**
     * @param {Editor} editor
     */
    removeFromEditor(editor) {
      editor.off("mousemove", this.onMouseMove);
      editor.off("mousedown", this.hide);
      var target = editor.renderer.getMouseEventTarget();
      if (target && typeof target.removeEventListener === "function") {
        target.removeEventListener("mouseout", this.onMouseOut, true);
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (this.mouseOutHideTimer !== null) {
        clearTimeout(this.mouseOutHideTimer);
        this.mouseOutHideTimer = null;
      }
      if (this.mouseMoveHideTimer !== null) {
        clearTimeout(this.mouseMoveHideTimer);
        this.mouseMoveHideTimer = null;
      }
    }
    /**
     * @param {MouseEvent} e
     * @param {Editor} editor
     * @internal
     */
    onMouseMove(e, editor) {
      this.lastEvent = e;
      this.lastT = Date.now();
      var isMousePressed = editor["$mouseHandler"].isMousePressed;
      if (this.isOpen) {
        var pos = this.lastEvent && this.lastEvent.getDocumentPosition();
        if (!this.range || !this.range.contains(pos.row, pos.column) || isMousePressed || this.isOutsideOfText(this.lastEvent)) {
          this.deferHideFromMouseMove();
        } else if (this.mouseMoveHideTimer !== null) {
          clearTimeout(this.mouseMoveHideTimer);
          this.mouseMoveHideTimer = null;
        }
      }
      if (this.timeout || isMousePressed) return;
      this.lastEvent = e;
      this.timeout = setTimeout(this.waitForHover, this.idleTime);
    }
    waitForHover() {
      if (this.timeout) clearTimeout(this.timeout);
      var dt = Date.now() - this.lastT;
      if (this.idleTime - dt > 10) {
        this.timeout = setTimeout(this.waitForHover, this.idleTime - dt);
        return;
      }
      this.timeout = null;
      if (this.lastEvent && !this.isOutsideOfText(this.lastEvent)) {
        this.$gatherData(this.lastEvent, this.lastEvent.editor);
      }
    }
    /**
     * @param {MouseEvent} e
     */
    isOutsideOfText(e) {
      var editor = e.editor;
      var docPos = e.getDocumentPosition();
      var line = editor.session.getLine(docPos.row);
      if (docPos.column == line.length) {
        var screenPos = editor.renderer.pixelToScreenCoordinates(
          e.clientX,
          e.clientY
        );
        var clippedPos = editor.session.documentToScreenPosition(
          docPos.row,
          docPos.column
        );
        if (clippedPos.column != screenPos.column || clippedPos.row != screenPos.row) {
          return true;
        }
      }
      return false;
    }
    /**
     * @param {(event: MouseEvent, editor: Editor) => void} value
     */
    setDataProvider(value) {
      this.$gatherData = value;
    }
    showForRange(editor, range, domNode, startingEvent) {
      if (startingEvent && startingEvent != this.lastEvent) return;
      if (this.isOpen && document.activeElement == this.getElement()) return;
      var renderer = editor.renderer;
      if (!this.isOpen) {
        this.$registerCloseEvents();
        this.setTheme(renderer.theme);
      }
      this.isOpen = true;
      const Range2 = editor.getSelectionRange().constructor;
      this.range = Range2.fromPoints(range.start, range.end);
      var position = renderer.textToScreenCoordinates(
        range.start.row,
        range.start.column
      );
      var rect = renderer.scroller.getBoundingClientRect();
      if (position.pageX < rect.left) position.pageX = rect.left;
      var element = this.getElement();
      element.innerHTML = "";
      element.appendChild(domNode);
      element.style.maxHeight = "";
      element.style.display = "block";
      this.$setPosition(editor, position, true, range);
      editor.renderer["$textLayer"].dom.$fixPositionBug(element);
      popupManager.addPopup(this);
    }
    /**
     * @param {Editor} editor
     * @param {{pageX: number;pageY: number;}} position
     * @param {boolean} withMarker
     * @param {Range} [range]
     */
    $setPosition(editor, position, withMarker, range) {
      var MARGIN = 10;
      withMarker && this.addMarker(range, editor.session);
      var renderer = editor.renderer;
      var element = this.getElement();
      var labelHeight = element.offsetHeight;
      var labelWidth = element.offsetWidth;
      var anchorTop = position.pageY;
      var anchorLeft = position.pageX;
      var spaceBelow = window.innerHeight - anchorTop - renderer.lineHeight;
      var isAbove = this.$shouldPlaceAbove(
        labelHeight,
        anchorTop,
        spaceBelow - MARGIN
      );
      element.style.maxHeight = (isAbove ? anchorTop : spaceBelow) - MARGIN + "px";
      element.style.top = isAbove ? "" : anchorTop + renderer.lineHeight + "px";
      element.style.bottom = isAbove ? window.innerHeight - anchorTop + "px" : "";
      element.style.left = Math.min(anchorLeft, window.innerWidth - labelWidth - MARGIN) + "px";
    }
    /**
     * @param {number} labelHeight
     * @param {number} anchorTop
     * @param {number} spaceBelow
     */
    $shouldPlaceAbove(labelHeight, anchorTop, spaceBelow) {
      return !(anchorTop - labelHeight < 0 && anchorTop < spaceBelow);
    }
    addMarker(range, session) {
      if (this.marker) {
        this.$markerSession.removeMarker(this.marker);
      }
      this.$markerSession = session;
      this.marker = session && range ? session.addMarker(range, "ace_highlight-marker", "text") : null;
    }
    hide(e) {
      var _a;
      if (e && this.$fromKeyboard && e.type == "keydown") {
        if (e.code == "Escape") {
          return;
        }
      }
      if (!e && document.activeElement == this.getElement()) return;
      if (e && e.target && (e.type != "keydown" || e.ctrlKey || e.metaKey) && ((_a = this.$element) == null ? void 0 : _a.contains(e.target)))
        return;
      this.lastEvent = null;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = null;
      if (this.mouseOutHideTimer !== null) {
        clearTimeout(this.mouseOutHideTimer);
        this.mouseOutHideTimer = null;
      }
      if (this.mouseMoveHideTimer !== null) {
        clearTimeout(this.mouseMoveHideTimer);
        this.mouseMoveHideTimer = null;
      }
      this.addMarker(null);
      if (this.isOpen) {
        this.$fromKeyboard = false;
        this.$removeCloseEvents();
        this.getElement().style.display = "none";
        this.isOpen = false;
        popupManager.removePopup(this);
      }
    }
    $registerCloseEvents() {
      window.addEventListener("keydown", this.hide, true);
      window.addEventListener("wheel", this.hide, true);
      window.addEventListener("mousedown", this.hide, true);
    }
    $removeCloseEvents() {
      window.removeEventListener("keydown", this.hide, true);
      window.removeEventListener("wheel", this.hide, true);
      window.removeEventListener("mousedown", this.hide, true);
    }
    /**
     * @internal
     */
    onMouseOut(e) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (this.mouseOutHideTimer !== null) {
        clearTimeout(this.mouseOutHideTimer);
        this.mouseOutHideTimer = null;
      }
      if (this.mouseMoveHideTimer !== null) {
        clearTimeout(this.mouseMoveHideTimer);
        this.mouseMoveHideTimer = null;
      }
      this.lastEvent = null;
      if (!this.isOpen) return;
      const tooltipEl = this.getElement();
      if (!e.relatedTarget || tooltipEl.contains(e.relatedTarget)) return;
      if (e && e.currentTarget.contains(e.relatedTarget)) return;
      if (this.isPointerInsideTooltipBounds(e, tooltipEl)) return;
      if (e.relatedTarget.classList.contains("ace_content")) return;
      this.mouseOutHideTimer = window.setTimeout(() => {
        this.mouseOutHideTimer = null;
        if (!this.isOpen) return;
        if (tooltipEl.matches(":hover")) return;
        if (document.activeElement && tooltipEl.contains(document.activeElement))
          return;
        this.hide();
      }, 0);
    }
    deferHideFromMouseMove() {
      if (this.mouseMoveHideTimer !== null) {
        clearTimeout(this.mouseMoveHideTimer);
        this.mouseMoveHideTimer = null;
      }
      const tooltipEl = this.getElement();
      if (tooltipEl.matches(":hover")) {
        return;
      }
      this.mouseMoveHideTimer = window.setTimeout(() => {
        this.mouseMoveHideTimer = null;
        if (!this.isOpen) return;
        if (tooltipEl.matches(":hover")) return;
        if (document.activeElement && tooltipEl.contains(document.activeElement))
          return;
        this.hide();
      }, 50);
    }
    isPointerInsideTooltipBounds(e, tooltipEl) {
      if (typeof e.clientX !== "number" || typeof e.clientY !== "number") {
        return false;
      }
      const rect = tooltipEl.getBoundingClientRect();
      return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    }
  }
  class AceVirtualRenderer {
    static getConstructor(editor) {
      if (!AceVirtualRenderer._instance && editor) {
        AceVirtualRenderer._instance = editor.renderer.constructor;
      }
      return AceVirtualRenderer._instance;
    }
  }
  class AceEditor {
    static getConstructor(editor) {
      if (!AceEditor._instance && editor) {
        AceEditor._instance = editor.constructor;
      }
      return AceEditor._instance;
    }
  }
  var getAriaId = function(index) {
    return `suggest-aria-id:${index}`;
  };
  var _navigator = typeof navigator == "object" ? navigator : { userAgent: "" };
  var ua = _navigator.userAgent || "";
  var isSafari = parseFloat(ua.split(" Safari/")[1]) || void 0;
  var popupAriaRole = isSafari ? "menu" : "listbox";
  var optionAriaRole = isSafari ? "menuitem" : "option";
  var ariaActiveState = isSafari ? "aria-current" : "aria-selected";
  var $singleLineEditor = function(el) {
    var Renderer = AceVirtualRenderer.getConstructor();
    var Editor = AceEditor.getConstructor();
    var renderer = new Renderer(el);
    renderer.$maxLines = 4;
    var editor = new Editor(renderer);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    editor.renderer.setHighlightGutterLine(false);
    editor.$mouseHandler.$focusTimeout = 0;
    editor.$highlightTagPending = true;
    return editor;
  };
  class AcePopup {
    /**
     * Creates and renders single line editor in popup window. If `parentNode` param is isset, then attaching it to this element.
     * @param {Element} [parentNode]
     * @return {Ace.AcePopup}
     */
    constructor(parentNode) {
      var el = document.createElement("div");
      var popup = $singleLineEditor(el);
      var Range2 = AceRange.getConstructor();
      if (parentNode) {
        parentNode.appendChild(el);
      }
      el.style.display = "none";
      popup.renderer.content.style.cursor = "default";
      popup.renderer.setStyle("ace_autocomplete");
      popup.renderer["$textLayer"].element.setAttribute("role", popupAriaRole);
      popup.renderer["textarea"].setAttribute("aria-hidden", "true");
      popup.setOption("displayIndentGuides", false);
      popup.setOption("dragDelay", 150);
      var noop2 = function() {
      };
      popup.focus = noop2;
      popup.$isFocused = true;
      popup.renderer["$cursorLayer"].restartTimer = noop2;
      popup.renderer["$cursorLayer"].element.style.opacity = "0";
      popup.renderer["$maxLines"] = 8;
      popup.renderer["$keepTextAreaAtCursor"] = false;
      popup.setHighlightActiveLine(false);
      popup.session.highlight("");
      popup.session["$searchHighlight"].clazz = "ace_highlight-marker";
      popup.on("mousedown", function(e) {
        var pos = e.getDocumentPosition();
        popup.selection.moveToPosition(pos);
        selectionMarker.start.row = selectionMarker.end.row = pos.row;
        e.stop();
      });
      var lastMouseEvent;
      var hoverMarker = new Range2(-1, 0, -1, Infinity);
      var selectionMarker = new Range2(-1, 0, -1, Infinity);
      selectionMarker.id = popup.session.addMarker(selectionMarker, "ace_active-line", "fullLine");
      popup.setSelectOnHover = function(val) {
        if (!val) {
          hoverMarker.id = popup.session.addMarker(hoverMarker, "ace_line-hover", "fullLine");
        } else if (hoverMarker.id) {
          popup.session.removeMarker(hoverMarker.id);
          hoverMarker.id = void 0;
        }
      };
      popup.setSelectOnHover(false);
      popup.on("mousemove", function(e) {
        if (!lastMouseEvent) {
          lastMouseEvent = e;
          return;
        }
        if (lastMouseEvent.x == e.x && lastMouseEvent.y == e.y) {
          return;
        }
        lastMouseEvent = e;
        lastMouseEvent.scrollTop = popup.renderer.scrollTop;
        popup.isMouseOver = true;
        var row = lastMouseEvent.getDocumentPosition().row;
        if (hoverMarker.start.row != row) {
          if (!hoverMarker.id)
            popup.setRow(row);
          setHoverMarker(row);
        }
      });
      popup.renderer.on("beforeRender", function() {
        if (lastMouseEvent && hoverMarker.start.row != -1) {
          lastMouseEvent.$pos = null;
          var row = lastMouseEvent.getDocumentPosition().row;
          if (!hoverMarker.id)
            popup.setRow(row);
          setHoverMarker(row, true);
        }
      });
      popup.renderer.on("afterRender", function() {
        var row = popup.getRow();
        var t = popup.renderer["$textLayer"];
        var selected = (
          /** @type {HTMLElement|null} */
          t.element.childNodes[row - t.config.firstRow]
        );
        var el2 = document.activeElement;
        if (selected !== popup.selectedNode && popup.selectedNode) {
          popup.renderer["$textLayer"].dom.removeCssClass(popup.selectedNode, "ace_selected");
          el2 == null ? void 0 : el2.removeAttribute("aria-activedescendant");
          popup.selectedNode.removeAttribute(ariaActiveState);
          popup.selectedNode.removeAttribute("id");
        }
        popup.selectedNode = selected;
        if (selected) {
          popup.renderer["$textLayer"].dom.addCssClass(selected, "ace_selected");
          var ariaId = getAriaId(row);
          selected.id = ariaId;
          t.element.setAttribute("aria-activedescendant", ariaId);
          el2 == null ? void 0 : el2.setAttribute("aria-activedescendant", ariaId);
          selected.setAttribute("role", optionAriaRole);
          selected.setAttribute("aria-label", popup.getData(row).caption || popup.getData(row).value);
          selected.setAttribute("aria-setsize", popup.data.length);
          selected.setAttribute("aria-posinset", row + 1);
          selected.setAttribute("aria-describedby", "doc-tooltip");
          selected.setAttribute(ariaActiveState, "true");
        }
      });
      var hideHoverMarker = function() {
        setHoverMarker(-1);
      };
      var setHoverMarker = function(row, suppressRedraw) {
        if (row !== hoverMarker.start.row) {
          hoverMarker.start.row = hoverMarker.end.row = row;
          if (!suppressRedraw) {
            popup.session._emit("changeBackMarker");
          }
          popup._emit("changeHoverMarker");
        }
      };
      popup.getHoveredRow = function() {
        return hoverMarker.start.row;
      };
      popup.container.addEventListener("mouseout", function() {
        popup.isMouseOver = false;
        hideHoverMarker();
      });
      popup.on("hide", hideHoverMarker);
      popup.on("changeSelection", hideHoverMarker);
      popup.session.doc.getLength = function() {
        return popup.data.length;
      };
      popup.session.doc.getLine = function(i) {
        var data = popup.data[i];
        if (typeof data == "string")
          return data;
        return data && data.value || "";
      };
      var bgTokenizer = popup.session.bgTokenizer;
      bgTokenizer.$tokenizeRow = function(row) {
        var data = popup.data[row];
        var tokens = [];
        if (!data)
          return tokens;
        if (typeof data == "string")
          data = { value: data };
        var caption = data.caption || data.value || data.name;
        function addToken(value, className) {
          value && tokens.push({
            type: (data.className || "") + (className || ""),
            value
          });
        }
        var lower = caption.toLowerCase();
        var filterText = (popup.filterText || "").toLowerCase();
        var lastIndex = 0;
        var lastI = 0;
        for (var i = 0; i <= filterText.length; i++) {
          if (i != lastI && (data.matchMask & 1 << i || i == filterText.length)) {
            var sub = filterText.slice(lastI, i);
            lastI = i;
            var index = lower.indexOf(sub, lastIndex);
            if (index == -1) continue;
            addToken(caption.slice(lastIndex, index), "");
            lastIndex = index + sub.length;
            addToken(caption.slice(index, lastIndex), "completion-highlight");
          }
        }
        addToken(caption.slice(lastIndex, caption.length), "");
        tokens.push({ type: "completion-spacer", value: " " });
        if (data.meta)
          tokens.push({ type: "completion-meta", value: data.meta });
        if (data.message)
          tokens.push({ type: "completion-message", value: data.message });
        return tokens;
      };
      bgTokenizer.$updateOnChange = noop2;
      bgTokenizer.start = noop2;
      popup.session["$computeWidth"] = function() {
        return this.screenWidth = 0;
      };
      popup.isOpen = false;
      popup.isTopdown = false;
      popup.autoSelect = true;
      popup.filterText = "";
      popup.isMouseOver = false;
      popup.data = [];
      popup.setData = function(list, filterText) {
        popup.filterText = filterText || "";
        popup.setValue("\n".repeat(list.length), -1);
        popup.data = list || [];
        popup.setRow(0);
      };
      popup.getData = function(row) {
        return popup.data[row];
      };
      popup.getRow = function() {
        return selectionMarker.start.row;
      };
      popup.setRow = function(line) {
        line = Math.max(this.autoSelect ? 0 : -1, Math.min(this.data.length - 1, line));
        if (selectionMarker.start.row != line) {
          popup.selection.clearSelection();
          selectionMarker.start.row = selectionMarker.end.row = line || 0;
          popup.session._emit("changeBackMarker");
          popup.moveCursorTo(line || 0, 0);
          if (popup.isOpen)
            popup._signal("select");
        }
      };
      popup.on("changeSelection", function() {
        if (popup.isOpen) {
          popup.setRow(popup.selection.lead.row);
        }
        popup.renderer.scrollCursorIntoView();
      });
      popup.hide = function() {
        this.container.style.display = "none";
        popup.anchorPos = null;
        popup.anchor = null;
        if (popup.isOpen) {
          popup.isOpen = false;
          this._signal("hide");
        }
      };
      popup.tryShow = function(pos, lineHeight, anchor, forceShow) {
        if (!forceShow && popup.isOpen && popup.anchorPos && popup.anchor && popup.anchorPos.top === pos.top && popup.anchorPos.left === pos.left && popup.anchor === anchor) {
          return true;
        }
        var el2 = this.container;
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        var renderer = this.renderer;
        var maxH = renderer.$maxLines * lineHeight * 1.4;
        var dims = { top: 0, bottom: 0 };
        var spaceBelow = screenHeight - pos.top - 3 * this.$borderSize - lineHeight;
        var spaceAbove = pos.top - 3 * this.$borderSize;
        if (!anchor) {
          if (spaceAbove <= spaceBelow || spaceBelow >= maxH) {
            anchor = "bottom";
          } else {
            anchor = "top";
          }
        }
        if (anchor === "top") {
          dims.bottom = pos.top - this.$borderSize;
          dims.top = dims.bottom - maxH;
        } else if (anchor === "bottom") {
          dims.top = pos.top + lineHeight + this.$borderSize;
          dims.bottom = dims.top + maxH;
        }
        var fitsX = dims.top >= 0 && dims.bottom <= screenHeight;
        if (!forceShow && !fitsX) {
          return false;
        }
        if (!fitsX) {
          if (anchor === "top") {
            renderer.$maxPixelHeight = spaceAbove;
          } else {
            renderer.$maxPixelHeight = spaceBelow;
          }
        } else {
          renderer.$maxPixelHeight = null;
        }
        if (anchor === "top") {
          el2.style.top = "";
          el2.style.bottom = screenHeight - dims.bottom + "px";
          popup.isTopdown = false;
        } else {
          el2.style.top = dims.top + "px";
          el2.style.bottom = "";
          popup.isTopdown = true;
        }
        el2.style.display = "";
        var left = pos.left;
        if (left + el2.offsetWidth > screenWidth)
          left = screenWidth - el2.offsetWidth;
        el2.style.left = left + "px";
        el2.style.right = "";
        if (!popup.isOpen) {
          popup.isOpen = true;
          this._signal("show");
          lastMouseEvent = null;
        }
        popup.anchorPos = pos;
        popup.anchor = anchor;
        return true;
      };
      popup.show = function(pos, lineHeight, topdownOnly) {
        this.tryShow(pos, lineHeight, topdownOnly ? "bottom" : void 0, true);
      };
      popup.goTo = function(where) {
        var row = this.getRow();
        var max = this.session.getLength() - 1;
        switch (where) {
          case "up":
            row = row <= 0 ? max : row - 1;
            break;
          case "down":
            row = row >= max ? -1 : row + 1;
            break;
          case "start":
            row = 0;
            break;
          case "end":
            row = max;
            break;
        }
        this.setRow(row);
      };
      popup.getTextLeftOffset = function() {
        return this.$borderSize + this.renderer.$padding + this.$imageSize;
      };
      popup.$imageSize = 0;
      popup.$borderSize = 1;
      return popup;
    }
  }
  class ActionMenuPopup {
    constructor(parentNode, onSelect, options) {
      this.onSelect = onSelect;
      this.items = [];
      this.isOpenState = false;
      this.anchorEl = null;
      this.hide = () => {
        if (!this.isOpenState) {
          return;
        }
        this.popup.hide();
        this.popupManagerRef.removeAcePopup(this.popup);
        this.isOpenState = false;
        this.anchorEl = null;
        window.removeEventListener("mousedown", this.onWindowMouseDown, true);
        window.removeEventListener("keydown", this.onWindowKeyDown, true);
        window.removeEventListener("wheel", this.onWindowScrollOrResize, true);
        window.removeEventListener("resize", this.onWindowScrollOrResize, true);
      };
      this.onWindowMouseDown = (event) => {
        const target = event.target;
        if (target && this.popup.container.contains(target)) {
          return;
        }
        if (target && this.anchorEl && this.anchorEl.contains(target)) {
          return;
        }
        this.hide();
      };
      this.onWindowKeyDown = (event) => {
        if (event.key === "Escape") {
          this.hide();
        }
      };
      this.onWindowScrollOrResize = () => {
        this.hide();
      };
      var _a, _b;
      this.popup = (options == null ? void 0 : options.popupFactory) ? options.popupFactory(parentNode) : (
        // @ts-ignore AcePopup constructor typing is ambient from ace internals.
        new AcePopup(parentNode)
      );
      this.lineHeight = (_a = options == null ? void 0 : options.lineHeight) != null ? _a : 12;
      this.popupManagerRef = (_b = options == null ? void 0 : options.popupManager) != null ? _b : popupManager;
      this.popup.on("click", (e) => {
        const selected = this.popup.getData(this.popup.getRow());
        if ((selected == null ? void 0 : selected.menuValue) !== void 0) {
          this.onSelect(selected.menuValue);
        }
        this.hide();
        e.stop();
      });
    }
    get isOpen() {
      return this.isOpenState;
    }
    setItems(items) {
      this.items = items;
      const popupItems = items.map((item) => ({
        value: item.label,
        meta: item.meta,
        menuValue: item.value
      }));
      this.popup.setData(popupItems, "");
    }
    showAt(x, y, topdownOnly = false, anchor) {
      if (!this.items.length) {
        return;
      }
      this.anchorEl = anchor != null ? anchor : null;
      this.popup.show({ top: y, left: x }, this.lineHeight, topdownOnly);
      this.popupManagerRef.addAcePopup(this.popup);
      this.isOpenState = true;
      window.addEventListener("mousedown", this.onWindowMouseDown, true);
      window.addEventListener("keydown", this.onWindowKeyDown, true);
      window.addEventListener("wheel", this.onWindowScrollOrResize, true);
      window.addEventListener("resize", this.onWindowScrollOrResize, true);
    }
    showBelowAnchor(anchor, offsetY = 4) {
      const rect = anchor.getBoundingClientRect();
      this.showAt(rect.right, rect.bottom + offsetY, false, anchor);
    }
    destroy() {
      this.hide();
      this.popup.destroy();
    }
  }
  class LightbulbWidget {
    constructor(editor, executeActionCallback) {
      this.lightBulbWidth = 10;
      this.lightBulbHeight = 16;
      this.hideAll = () => {
        this.hideLightbulb();
        this.menuPopup.hide();
      };
      this.setPosition = () => {
        const position = this.calculatePosition();
        this.lightbulb.style.left = `${position.x}px`;
        this.lightbulb.style.top = `${position.y}px`;
      };
      this.editor = editor;
      this.codeActions = [];
      this.executeActionCallback = executeActionCallback;
      this.menuPopup = new ActionMenuPopup(
        editor.container || document.body || document.documentElement,
        ({ action, serviceName }) => {
          this.executeAction(action, serviceName);
        },
        { lineHeight: 12 }
      );
      this.setEditorListeners(editor);
      this.createLightbulb();
    }
    setEditorListeners(editor) {
      editor.on("changeSelection", this.hideAll);
      editor.on("focus", this.hideAll);
      editor.renderer.on("afterRender", this.setPosition);
    }
    removeListeners() {
      this.editor.off("changeSelection", this.hideAll);
      this.editor.off("focus", this.hideAll);
      this.editor.renderer.off("afterRender", this.setPosition);
      this.editor.session.off("changeScrollTop", this.setPosition);
      this.editor.session.off("changeScrollLeft", this.setPosition);
    }
    setExecuteActionCallback(callback) {
      this.executeActionCallback = callback;
    }
    createLightbulb() {
      this.lightbulb = document.createElement("div");
      this.lightbulb.id = "lightbulb";
      this.lightbulb.style.display = "none";
      this.lightbulb.style.position = "absolute";
      this.lightbulb.style.width = this.lightBulbWidth + "px";
      this.lightbulb.style.height = this.lightBulbHeight + "px";
      this.lightbulb.style.zIndex = "999";
      this.lightbulb.style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmlld0JveD0iNi4yMTM2IDIuMjk4MSAxMi42OTI0IDE4LjYzMjgiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTSAxNi43ODEgNC4wOCBDIDE1LjQzMyAyLjc1MiAxMy42MiAyLjA5OCAxMS44MSAyLjM1MiBDIDguOTUyIDIuNzU0IDYuNjY4IDUuMjE0IDYuMjc4IDguMzA4IEMgNS45ODYgMTAuNjE2IDYuNjk2IDEyLjg0NSA4LjIyNyAxNC40MjQgQyA5LjE4NyAxNS40MTUgOS43MzkgMTYuNzgzIDkuNzM5IDE4LjE3NSBMIDE1LjM5NiAxOC4xODkgQyAxNS4zOTYgMTYuODc2IDE1LjkxMSAxNS40MTggMTYuODc1IDE0LjQzNSBDIDE4LjE2NSAxMy4xMTYgMTguOTA2IDExLjI0OSAxOC45MDYgOS4zMTQgQyAxOC45MDYgNy4zMTcgMTguMTMzIDUuNDEgMTYuNzgxIDQuMDggWiIgc3R5bGU9ImZpbGw6IHJnYigyNTIsIDE5NSwgODcpOyIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgLTEuNDIxMDg1NDcxNTIwMjAwNGUtMTQpIi8+DQogIDxyZWN0IHg9IjguMzgiIHk9IjIzMy42NzkiIHdpZHRoPSI0LjMxMyIgaGVpZ2h0PSIwLjAxMSIgc3R5bGU9ImZpbGw6IHJnYigyMTYsIDIxNiwgMjE2KTsgc3Ryb2tlOiByZ2IoMCwgMCwgMCk7IiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAtMSwgMi4wNzg5ODQxMDcxNjIxODUsIDI1Mi45MzUzNDM1OTU5NDE5NikiLz4NCiAgPHJlY3QgeD0iLTExLjY2NSIgeT0iLTIzLjU5NSIgd2lkdGg9IjMuMDk4IiBzdHlsZT0iZmlsbDogcmdiKDIxNiwgMjE2LCAyMTYpOyBzdHJva2U6IHJnYigwLCAwLCAwKTsiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTgxOTk5Mzk3Mjc3OSwgLTAuMDA2MDUyOTk5NzU3MjMwMjgxLCAwLCAxLjAwMDAxODAwMDYwMjcyMjIsIDIyLjcyOTA4NDk0NDQxNjMwNywgNDQuNDQ0NjczNDQ4NDU5MDg1KSIgaGVpZ2h0PSIwLjAxMSIvPg0KPC9zdmc+) no-repeat center center";
      this.lightbulb.style.cursor = "pointer";
      this.lightbulb.setAttribute("role", "button");
      this.lightbulb.setAttribute("aria-label", "Show code actions");
      this.editor.container.appendChild(this.lightbulb);
      this.lightbulb.addEventListener("click", (event) => {
        this.showMenu(event.clientX, event.clientY);
      });
    }
    setCodeActions(actions) {
      this.codeActions = actions;
    }
    showMenu(x, y) {
      if (this.codeActions.length === 0) {
        return;
      }
      this.menuPopup.setItems(this.getPopupItems());
      this.menuPopup.showAt(x, y, false);
    }
    isEmpty() {
      if (this.codeActions.length === 0) {
        return true;
      }
      for (let actionsByService of this.codeActions) {
        if (actionsByService.codeActions && actionsByService.codeActions.length > 0) {
          return false;
        }
      }
      return true;
    }
    getPopupItems() {
      let codeActions = [];
      this.codeActions.forEach((codeActionsByService) => {
        var _a;
        (_a = codeActionsByService.codeActions) == null ? void 0 : _a.forEach(
          (action) => {
            codeActions.push({
              label: action.title,
              value: {
                action,
                serviceName: codeActionsByService.service
              }
            });
          }
        );
      });
      return codeActions;
    }
    executeAction(action, serviceName) {
      this.executeActionCallback && this.executeActionCallback(action, serviceName);
      this.hideLightbulb();
    }
    showLightbulb() {
      if (this.isEmpty()) {
        return;
      }
      this.setPosition();
      this.lightbulb.style.display = "block";
    }
    hideLightbulb() {
      this.lightbulb.style.display = "none";
    }
    calculatePosition() {
      const gutterCenter = Math.round(this.editor.renderer["gutterWidth"] / 2 - this.lightBulbWidth);
      const firstRow = this.editor.renderer.getFirstVisibleRow();
      const cursor = this.editor.getCursorPosition();
      const lineHeight = this.editor.renderer.lineHeight;
      return {
        x: gutterCenter,
        y: (cursor.row - firstRow) * lineHeight
      };
    }
    dispose() {
      this.removeListeners();
      if (this.lightbulb && this.lightbulb.parentNode) {
        this.lightbulb.parentNode.removeChild(this.lightbulb);
      }
      this.menuPopup.destroy();
    }
  }
  function setStyles(editor) {
    editor.renderer["$textLayer"].dom.importCssString(`.ace_tooltip * {
    margin: 0;
    font-size: 12px;
}

.ace_tooltip code {
    font-style: italic;
    font-size: 11px;
}

.language_highlight_error {
    position: absolute;
    border-bottom: dotted 1px #e00404;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_warning {
    position: absolute;
    border-bottom: solid 1px #DDC50F;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_info {
    position: absolute;
    border-bottom: dotted 1px #999;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_text, .language_highlight_read, .language_highlight_write {
    position: absolute;
    box-sizing: border-box;
    border: solid 1px #888;
    z-index: 2000;
}

.language_highlight_write {
    border: solid 1px #F88;
}

.ace_lsp_hover_quickfixes {
    margin-top: 8px;
    border-top: 1px solid rgba(127,127,127,0.35);
}

.ace_lsp_hover_quickfixes_title {
    font-weight: 600;
    margin-bottom: 6px;
}

.ace_lsp_hover_quickfixes_controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.ace_lsp_hover_quickfixes_link {
    cursor: pointer;
    text-decoration: underline;
    color: var(--ace-link-color, #2563eb);
    font-weight: 500;
}

.ace_lsp_hover_quickfixes_primary {
    flex: 1;
}

.ace_lsp_hover_quickfixes_more {
    white-space: nowrap;
}`, "linters.css");
    editor.renderer["$textLayer"].dom.importCssString(`
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #CAD6FA;
    z-index: 1;
}
.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #3a674e;
}
.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid #abbffe;
    margin-top: -1px;
    background: rgba(233,233,253,0.4);
    position: absolute;
    z-index: 2;
}
.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid rgba(109, 150, 13, 0.8);
    background: rgba(58, 103, 78, 0.62);
}
.ace_completion-meta {
    opacity: 0.5;
    margin-left: 0.9em;
}
.ace_completion-message {
    margin-left: 0.9em;
    color: blue;
}
.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #2d69c7;
}
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #93ca12;
}
.ace_editor.ace_autocomplete {
    width: 300px;
    z-index: 200000;
    border: 1px lightgray solid;
    position: fixed;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    line-height: 1.4;
    background: #fefefe;
    color: #111;
}
.ace_dark.ace_editor.ace_autocomplete {
    border: 1px #484747 solid;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);
    line-height: 1.4;
    background: #25282c;
    color: #c1c1c1;
}
.ace_autocomplete .ace_text-layer  {
    width: calc(100% - 8px);
}
.ace_autocomplete .ace_line {
    display: flex;
    align-items: center;
}
.ace_autocomplete .ace_line > * {
    min-width: 0;
    flex: 0 0 auto;
}
.ace_autocomplete .ace_line .ace_ {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ace_autocomplete .ace_completion-spacer {
    flex: 1;
}
.ace_autocomplete.ace_loading:after  {
    content: "";
    position: absolute;
    top: 0px;
    height: 2px;
    width: 8%;
    background: blue;
    z-index: 100;
    animation: ace_progress 3s infinite linear;
    animation-delay: 300ms;
    transform: translateX(-100%) scaleX(1);
}
@keyframes ace_progress {
    0% { transform: translateX(-100%) scaleX(1) }
    50% { transform: translateX(625%) scaleX(2) } 
    100% { transform: translateX(1500%) scaleX(3) } 
}
@media (prefers-reduced-motion) {
    .ace_autocomplete.ace_loading:after {
        transform: translateX(625%) scaleX(2);
        animation: none;
     }
}
`, "autocompletion.css", false);
  }
  function validateAcePrototypes(InlineAutocomplete, CommandBarTooltip, CompletionProvider) {
    const proto = InlineAutocomplete.prototype;
    const required = [
      "detach",
      "destroy",
      "show",
      "getCompletionProvider",
      "getInlineTooltip"
    ];
    for (const method of required) {
      if (typeof proto[method] !== "function") {
        throw new Error(`InlineAutocomplete.prototype missing method: ${method}`);
      }
    }
    const cbProto = CommandBarTooltip.prototype;
    ["registerCommand", "setAlwaysShow", "getAlwaysShow"].forEach((method) => {
      if (typeof cbProto[method] !== "function") {
        throw new Error(`CommandBarTooltip.prototype missing method: ${method}`);
      }
    });
    if (typeof CompletionProvider.prototype.gatherCompletions !== "function") {
      throw new Error("CompletionProvider.prototype missing method: gatherCompletions");
    }
  }
  function createInlineCompleterAdapter(OriginalInlineAutocomplete, OriginalCommandBarTooltip, OriginalCompletionProvider) {
    validateAcePrototypes(OriginalInlineAutocomplete, OriginalCommandBarTooltip, OriginalCompletionProvider);
    var destroyCompleter = function(e, editor) {
      editor.inlineCompleter && editor.inlineCompleter.destroy();
    };
    class InlineCompletionProvider extends OriginalCompletionProvider {
      gatherCompletions(editor, callback) {
        var session = editor.getSession();
        var pos = editor.getCursorPosition();
        var prefix = getCompletionPrefix(editor);
        var matches = [];
        this.completers = editor.inlineCompleters;
        var total = editor.inlineCompleters.length;
        editor.inlineCompleters.forEach(function(completer, i) {
          completer.getCompletions(editor, session, pos, prefix, function(err, results) {
            if (completer.hideInlinePreview)
              results = results.map((result) => {
                return Object.assign(result, { hideInlinePreview: completer.hideInlinePreview });
              });
            if (!err && results)
              matches = matches.concat(results);
            callback(null, {
              prefix: getCompletionPrefix(editor),
              matches,
              finished: --total === 0
            });
          });
        });
        return true;
      }
    }
    class InlineCompleter extends OriginalInlineAutocomplete {
      getCompletionProvider(initialPosition) {
        if (!this.completionProvider)
          this.completionProvider = new InlineCompletionProvider(initialPosition);
        return this.completionProvider;
      }
      show(options) {
        this.activated = true;
        if (this.editor.inlineCompleter !== this) {
          if (this.editor.inlineCompleter) {
            this.editor.inlineCompleter.detach();
          }
          this.editor.inlineCompleter = this;
        }
        this.editor.on("changeSelection", this.changeListener);
        this.editor.on("blur", this.blurListener);
        this.updateCompletions(options);
      }
      destroy() {
        this.detach();
        if (this.inlineRenderer)
          this.inlineRenderer.destroy();
        if (this.inlineTooltip)
          this.inlineTooltip.destroy();
        if (this.editor && this.editor.inlineCompleter == this) {
          this.editor.off("destroy", destroyCompleter);
          this.editor.inlineCompleter = null;
        }
        this.inlineTooltip = this.editor = this.inlineRenderer = null;
      }
      static for(editor) {
        if (editor.inlineCompleter instanceof InlineCompleter) {
          return editor.inlineCompleter;
        }
        if (editor.inlineCompleter) {
          editor.inlineCompleter.destroy();
          editor.inlineCompleter = null;
        }
        editor.inlineCompleter = new InlineCompleter(editor);
        editor.once("destroy", destroyCompleter);
        return editor.inlineCompleter;
      }
      getInlineTooltip() {
        if (!this.inlineTooltip) {
          this.inlineTooltip = InlineCompleter.createInlineTooltip(document.body || document.documentElement);
        }
        return this.inlineTooltip;
      }
      static createInlineTooltip(parentEl) {
        var inlineTooltip = new OriginalCommandBarTooltip(parentEl);
        inlineTooltip.registerCommand(
          "Previous",
          // @ts-expect-error
          Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Previous"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow_rotated"
          })
        );
        inlineTooltip.registerCommand("Position", {
          enabled: false,
          getValue: function(editor) {
            return editor ? [
              editor.inlineCompleter.getIndex() + 1,
              editor.inlineCompleter.getLength()
            ].join("/") : "";
          },
          type: "text",
          cssClass: "completion_position"
        });
        inlineTooltip.registerCommand(
          "Next",
          // @ts-expect-error
          Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Next"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow"
          })
        );
        inlineTooltip.registerCommand(
          "Accept",
          // @ts-expect-error
          Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Accept"], {
            enabled: function(editor) {
              return !!editor && editor.inlineCompleter.getIndex() >= 0;
            },
            type: "button"
          })
        );
        inlineTooltip.registerCommand("ShowTooltip", {
          name: "Always Show Tooltip",
          exec: function() {
            inlineTooltip.setAlwaysShow(!inlineTooltip.getAlwaysShow());
          },
          enabled: true,
          getValue: function() {
            return inlineTooltip.getAlwaysShow();
          },
          type: "checkbox"
        });
        return inlineTooltip;
      }
      updateCompletions(options) {
        if (options && options.matches) {
          var pos = this.editor.getSelectionRange().start;
          this.base = this.editor.session.doc.createAnchor(pos.row, pos.column);
          this.base["$insertRight"] = true;
          this.completions = new FilteredList(options.matches);
          return this.$open(this.editor, "");
        }
        if (this.base && this.completions) {
          this.$updatePrefix();
        }
        var session = this.editor.getSession();
        var pos = this.editor.getCursorPosition();
        var prefix = getCompletionPrefix(this.editor);
        this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
        this.base.$insertRight = true;
        var options = {
          exactMatch: true,
          ignoreCaption: true
        };
        this.getCompletionProvider({
          prefix,
          base: this.base,
          pos
          // @ts-ignore
        }).provideCompletions(
          this.editor,
          options,
          /**
           * @this {InlineAutocomplete}
           */
          (function(err, completions, finished) {
            var filtered = completions.filtered;
            var prefix2 = getCompletionPrefix(this.editor);
            if (finished) {
              if (!filtered.length)
                return this.detach();
              if (filtered.length == 1 && filtered[0].value == prefix2 && !filtered[0].snippet)
                return this.detach();
            }
            this.completions = completions;
            this.$open(this.editor, prefix2);
          }).bind(this)
        );
      }
    }
    OriginalInlineAutocomplete.prototype.commands["Previous"].exec = (editor) => {
      editor.inlineCompleter.goTo("prev");
    };
    OriginalInlineAutocomplete.prototype.commands["Next"].exec = (editor) => {
      editor.inlineCompleter.goTo("next");
    };
    OriginalInlineAutocomplete.prototype.commands["Accept"].exec = (editor) => {
      return editor.inlineCompleter.insertMatch();
    };
    OriginalInlineAutocomplete.prototype.commands["Close"].exec = (editor) => {
      editor.inlineCompleter.detach();
    };
    var doLiveAutocomplete = function(e) {
      var editor = e.editor;
      var hasCompleter = editor.inlineCompleter && editor.inlineCompleter.activated;
      if (e.command.name === "backspace") {
        if (hasCompleter && !getCompletionPrefix(editor))
          editor.inlineCompleter.detach();
      } else if (e.command.name === "insertstring" && !hasCompleter) {
        lastExecEvent = e;
        var delay = e.editor.$liveAutocompletionDelay;
        if (delay) {
          liveAutocompleteTimer.delay(delay);
        } else {
          showLiveAutocomplete(e);
        }
      }
    };
    var lastExecEvent;
    var liveAutocompleteTimer = new DelayedCall(function() {
      showLiveAutocomplete(lastExecEvent);
    }, 0);
    var showLiveAutocomplete = (e) => {
      var editor = e.editor;
      var prefix = getCompletionPrefix(editor);
      var previousChar = e.args;
      var triggerAutocomplete = triggerAutocompleteFunc(editor, previousChar);
      if (prefix && prefix.length >= editor.$liveAutocompletionThreshold || triggerAutocomplete) {
        var completer = InlineCompleter.for(editor);
        completer.show({
          exactMatch: false,
          ignoreCaption: false
        });
      }
    };
    const validateAceInlineCompleterWithEditor = (editor) => {
      let completer;
      try {
        completer = InlineCompleter.for(editor);
        completer.show({});
        if (typeof completer.activated !== "boolean") throw new Error("activated property missing or not boolean");
        completer.destroy();
      } catch (e) {
        throw new Error(`InlineAutocomplete runtime validation failed: ${e.message}`);
      }
      try {
        const provider = new InlineCompletionProvider();
        if (typeof provider.gatherCompletions !== "function") throw new Error("gatherCompletions missing");
      } catch (e) {
        throw new Error(`CompletionProvider runtime validation failed: ${e.message}`);
      }
    };
    return { InlineCompleter, doLiveAutocomplete, validateAceInlineCompleterWithEditor };
  }
  function getCompletionPrefix(editor) {
    var pos = editor.getCursorPosition();
    var line = editor.session.getLine(pos.row);
    var prefix;
    if (!editor.inlineCompleters) {
      return "";
    }
    editor.inlineCompleters.forEach((function(completer) {
      if (completer.identifierRegexps) {
        completer.identifierRegexps.forEach((function(identifierRegex) {
          if (!prefix && identifierRegex)
            prefix = retrievePrecedingIdentifier(line, pos.column, identifierRegex);
        }).bind(this));
      }
    }).bind(this));
    return prefix || retrievePrecedingIdentifier(line, pos.column);
  }
  var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;
  function retrievePrecedingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos - 1; i >= 0; i--) {
      if (regex.test(text[i]))
        buf.push(text[i]);
      else
        break;
    }
    return buf.reverse().join("");
  }
  function triggerAutocompleteFunc(editor, previousChar) {
    var previousChar = previousChar == null ? editor.session.getPrecedingCharacter() : previousChar;
    return editor.inlineCompleters.some((completer) => {
      if (completer.triggerCharacters && Array.isArray(completer.triggerCharacters)) {
        return completer.triggerCharacters.includes(previousChar);
      }
    });
  }
  class DelayedCall {
    constructor(fcn, defaultTimeout) {
      this.timer = null;
      this.fcn = fcn;
      this.defaultTimeout = defaultTimeout;
      this.callback = () => {
        this.timer = null;
        this.fcn();
      };
    }
    schedule(timeout) {
      if (this.timer == null) {
        this.timer = setTimeout(this.callback, timeout || this.defaultTimeout);
      }
    }
    delay(timeout) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(this.callback, timeout || this.defaultTimeout);
    }
    call() {
      this.cancel();
      this.fcn();
    }
    cancel() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
    }
    isPending() {
      return this.timer;
    }
  }
  class FilteredList {
    constructor(array, filterText) {
      this.all = array;
      this.filtered = array;
      this.filterText = filterText || "";
      this.exactMatch = false;
      this.ignoreCaption = false;
    }
    setFilter(str) {
      if (str.length > this.filterText && str.lastIndexOf(this.filterText, 0) === 0)
        var matches = this.filtered;
      else
        var matches = this.all;
      this.filterText = str;
      matches = this.filterCompletions(matches, this.filterText);
      matches = matches.sort(function(a, b) {
        return b.exactMatch - a.exactMatch || b.$score - a.$score || (a.caption || a.value).localeCompare(b.caption || b.value);
      });
      var prev = null;
      matches = matches.filter(function(item) {
        var caption = item.snippet || item.caption || item.value;
        if (caption === prev) return false;
        prev = caption;
        return true;
      });
      this.filtered = matches;
    }
    filterCompletions(items, needle) {
      var results = [];
      var upper = needle.toUpperCase();
      var lower = needle.toLowerCase();
      loop: for (var i = 0, item; item = items[i]; i++) {
        if (item.skipFilter) {
          item.$score = item.score;
          results.push(item);
          continue;
        }
        var caption = !this.ignoreCaption && item.caption || item.value || item.snippet;
        if (!caption) continue;
        var lastIndex = -1;
        var matchMask = 0;
        var penalty = 0;
        var index, distance;
        if (this.exactMatch) {
          if (needle !== caption.substr(0, needle.length))
            continue loop;
        } else {
          var fullMatchIndex = caption.toLowerCase().indexOf(lower);
          if (fullMatchIndex > -1) {
            penalty = fullMatchIndex;
          } else {
            for (var j = 0; j < needle.length; j++) {
              var i1 = caption.indexOf(lower[j], lastIndex + 1);
              var i2 = caption.indexOf(upper[j], lastIndex + 1);
              index = i1 >= 0 ? i2 < 0 || i1 < i2 ? i1 : i2 : i2;
              if (index < 0)
                continue loop;
              distance = index - lastIndex - 1;
              if (distance > 0) {
                if (lastIndex === -1)
                  penalty += 10;
                penalty += distance;
                matchMask = matchMask | 1 << j;
              }
              lastIndex = index;
            }
          }
        }
        item.matchMask = matchMask;
        item.exactMatch = penalty ? 0 : 1;
        item.$score = (item.score || 0) - penalty;
        results.push(item);
      }
      return results;
    }
  }
  class MarkerGroup {
    constructor(session) {
      this.MAX_MARKERS = 1e4;
      this.markers = [];
      this.session = session;
      session.addDynamicMarker(this);
    }
    /**
     * Finds the first marker containing pos
     * @param {Position} pos
     * @returns Ace.MarkerGroupItem
     */
    getMarkerAtPosition(pos) {
      return this.markers.find(function(marker) {
        return marker.range.contains(pos.row, pos.column);
      });
    }
    /**
     * Finds all markers that contain the given position.
     * @param {Position} pos - The position to search for.
     * @returns {Ace.MarkerGroupItem[]} - An array of all markers that contain the given position.
     */
    getMarkersAtPosition(pos) {
      return this.markers.filter(function(marker) {
        return marker.range.contains(pos.row, pos.column);
      });
    }
    /**
     * Comparator for Array.sort function, which sorts marker definitions by their positions
     *
     * @param {Ace.MarkerGroupItem} a first marker.
     * @param {Ace.MarkerGroupItem} b second marker.
     * @returns {number} negative number if a should be before b, positive number if b should be before a, 0 otherwise.
     */
    markersComparator(a, b) {
      return a.range.start.row - b.range.start.row;
    }
    /**
     * Sets marker definitions to be rendered. Limits the number of markers at MAX_MARKERS.
     * @param {Ace.MarkerGroupItem[]} markers an array of marker definitions.
     */
    setMarkers(markers) {
      this.markers = markers.sort(this.markersComparator).slice(0, this.MAX_MARKERS);
      this.session._signal("changeBackMarker");
    }
    update(html, markerLayer, session, config) {
      if (!this.markers || !this.markers.length)
        return;
      var visibleRangeStartRow = config.firstRow, visibleRangeEndRow = config.lastRow;
      var foldLine;
      var markersOnOneLine = 0;
      var lastRow = 0;
      for (var i = 0; i < this.markers.length; i++) {
        var marker = this.markers[i];
        if (marker.range.end.row < visibleRangeStartRow) continue;
        if (marker.range.start.row > visibleRangeEndRow) continue;
        if (marker.range.start.row === lastRow) {
          markersOnOneLine++;
        } else {
          lastRow = marker.range.start.row;
          markersOnOneLine = 0;
        }
        if (markersOnOneLine > 200) {
          continue;
        }
        var markerVisibleRange = marker.range.clipRows(visibleRangeStartRow, visibleRangeEndRow);
        if (markerVisibleRange.start.row === markerVisibleRange.end.row && markerVisibleRange.start.column === markerVisibleRange.end.column) {
          continue;
        }
        var screenRange = markerVisibleRange.toScreenRange(session);
        if (screenRange.isEmpty()) {
          foldLine = session.getNextFoldLine(markerVisibleRange.end.row, foldLine);
          if (foldLine && foldLine.end.row > markerVisibleRange.end.row) {
            visibleRangeStartRow = foldLine.end.row;
          }
          continue;
        }
        if (screenRange.isMultiLine()) {
          markerLayer.drawTextMarker(html, screenRange, marker.className, config);
        } else {
          markerLayer.drawSingleLineMarker(html, screenRange, marker.className, config);
        }
      }
    }
  }
  function decodeModifiers(modifierFlag, tokenModifiersLegend) {
    const modifiers = [];
    for (let i = 0; i < tokenModifiersLegend.length; i++) {
      if (modifierFlag & 1 << i) {
        modifiers.push(tokenModifiersLegend[i]);
      }
    }
    return modifiers;
  }
  function parseSemanticTokens(tokens, tokenTypes, tokenModifiersLegend) {
    if (tokens.length % 5 !== 0) {
      return;
    }
    const decodedTokens = [];
    let line = 0;
    let startColumn = 0;
    for (let i = 0; i < tokens.length; i += 5) {
      line += tokens[i];
      if (tokens[i] === 0) {
        startColumn += tokens[i + 1];
      } else {
        startColumn = tokens[i + 1];
      }
      const length = tokens[i + 2];
      const tokenTypeIndex = tokens[i + 3];
      const tokenModifierFlag = tokens[i + 4];
      const tokenType = tokenTypes[tokenTypeIndex];
      const tokenModifiers = decodeModifiers(tokenModifierFlag, tokenModifiersLegend);
      decodedTokens.push({
        row: line,
        startColumn,
        length,
        type: toAceTokenType(tokenType, tokenModifiers)
      });
    }
    return new DecodedSemanticTokens(decodedTokens);
  }
  function toAceTokenType(tokenType, tokenModifiers) {
    let modifiers = "";
    let type = tokenType;
    if (tokenModifiers.length > 0) {
      modifiers = "." + tokenModifiers.join(".");
    }
    switch (tokenType) {
      case "class":
        type = "entity.name.type.class";
        break;
      case "struct":
        type = "storage.type.struct";
        break;
      case "enum":
        type = "entity.name.type.enum";
        break;
      case "interface":
        type = "entity.name.type.interface";
        break;
      case "namespace":
        type = "entity.name.namespace";
        break;
      case "typeParameter":
        break;
      case "type":
        type = "entity.name.type";
        break;
      case "parameter":
        type = "variable.parameter";
        break;
      case "variable":
        type = "entity.name.variable";
        break;
      case "enumMember":
        type = "variable.other.enummember";
        break;
      case "property":
        type = "variable.other.property";
        break;
      case "function":
        type = "entity.name.function";
        break;
      case "method":
        type = "entity.name.function.member";
        break;
      case "event":
        type = "variable.other.event";
        break;
    }
    return type + modifiers;
  }
  function mergeTokens(aceTokens, decodedTokens) {
    let mergedTokens = [];
    let currentCharIndex = 0;
    let aceTokenIndex = 0;
    decodedTokens.forEach((semanticToken) => {
      let semanticStart = semanticToken.startColumn;
      let semanticEnd = semanticStart + semanticToken.length;
      while (aceTokenIndex < aceTokens.length && currentCharIndex + aceTokens[aceTokenIndex].value.length <= semanticStart) {
        mergedTokens.push(aceTokens[aceTokenIndex]);
        currentCharIndex += aceTokens[aceTokenIndex].value.length;
        aceTokenIndex++;
      }
      while (aceTokenIndex < aceTokens.length && currentCharIndex < semanticEnd) {
        let aceToken = aceTokens[aceTokenIndex];
        let aceTokenEnd = currentCharIndex + aceToken.value.length;
        let overlapStart = Math.max(currentCharIndex, semanticStart);
        let overlapEnd = Math.min(aceTokenEnd, semanticEnd);
        if (currentCharIndex < semanticStart) {
          let beforeSemantic = {
            ...aceToken,
            value: aceToken.value.substring(0, semanticStart - currentCharIndex)
          };
          mergedTokens.push(beforeSemantic);
        }
        let middle = {
          type: semanticToken.type,
          // Use semantic token's type
          value: aceToken.value.substring(overlapStart - currentCharIndex, overlapEnd - currentCharIndex)
        };
        mergedTokens.push(middle);
        if (aceTokenEnd > semanticEnd) {
          let afterSemantic = {
            ...aceToken,
            value: aceToken.value.substring(semanticEnd - currentCharIndex)
          };
          currentCharIndex = semanticEnd;
          aceTokens.splice(aceTokenIndex, 1, afterSemantic);
          break;
        }
        currentCharIndex = aceTokenEnd;
        aceTokenIndex++;
      }
    });
    while (aceTokenIndex < aceTokens.length) {
      mergedTokens.push(aceTokens[aceTokenIndex]);
      aceTokenIndex++;
    }
    return mergedTokens;
  }
  class DecodedSemanticTokens {
    constructor(tokens) {
      this.tokens = this.sortTokens(tokens);
    }
    getByRow(row) {
      return this.tokens.filter((token) => token.row === row);
    }
    sortTokens(tokens) {
      return tokens.sort((a, b) => {
        if (a.row === b.row) {
          return a.startColumn - b.startColumn;
        }
        return a.row - b.row;
      });
    }
  }
  class SessionLanguageProvider {
    /**
     * Constructs a new instance of the `SessionLanguageProvider` class.
     *
     * @param provider - The `LanguageProvider` instance.
     * @param session - The Ace editor session.
     * @param editor - The Ace editor instance.
     * @param messageController - The `IMessageController` instance for handling messages.
     * @param config
     */
    constructor(provider, session, editor, messageController, config) {
      this.$isConnected = false;
      this.$requestsQueue = [];
      this.state = {
        occurrenceMarkers: null,
        diagnosticMarkers: null
      };
      this.extensions = {
        "typescript": "ts",
        "javascript": "js"
      };
      this.$connected = (capabilities) => {
        this.$isConnected = true;
        this.setServerCapabilities(capabilities);
        this.$requestsQueue.forEach((requestCallback) => requestCallback());
        this.$requestsQueue = [];
        if (this.$deltaQueue)
          this.$sendDeltaQueue();
        if (this.$options)
          this.setOptions(this.$options);
      };
      this.$changeMode = () => {
        this.enqueueIfNotConnected(() => {
          this.$deltaQueue = null;
          this.session.clearAnnotations();
          if (this.state.diagnosticMarkers) {
            this.state.diagnosticMarkers.setMarkers([]);
          }
          this.session.setSemanticTokens(void 0);
          let newVersion = this.session.doc.version++;
          this.$messageController.changeMode(this.comboDocumentIdentifier, this.session.getValue(), newVersion, this.$mode, this.setServerCapabilities);
        });
      };
      this.setServerCapabilities = (capabilities) => {
        var _a, _b, _c, _d, _e;
        if (!capabilities)
          return;
        this.$servicesCapabilities = { ...capabilities };
        let hasTriggerChars = Object.values(capabilities).some((capability) => {
          var _a2;
          return (_a2 = capability == null ? void 0 : capability.completionProvider) == null ? void 0 : _a2.triggerCharacters;
        });
        if (hasTriggerChars || ((_a = this.$provider.options.functionality) == null ? void 0 : _a.completion) && ((_c = (_b = this.$provider.options.functionality) == null ? void 0 : _b.completion.lspCompleterOptions) == null ? void 0 : _c.triggerCharacters)) {
          let completer = this.editor.completers.find((completer2) => completer2.id === "lspCompleters");
          if (completer) {
            let allTriggerCharacters = [];
            Object.values(capabilities).forEach((capability) => {
              var _a2;
              if ((_a2 = capability == null ? void 0 : capability.completionProvider) == null ? void 0 : _a2.triggerCharacters) {
                allTriggerCharacters.push(...capability.completionProvider.triggerCharacters);
              }
            });
            allTriggerCharacters = [...new Set(allTriggerCharacters)];
            const triggerCharacterOptions = typeof ((_d = this.$provider.options.functionality) == null ? void 0 : _d.completion) == "object" ? (_e = this.$provider.options.functionality.completion.lspCompleterOptions) == null ? void 0 : _e.triggerCharacters : void 0;
            if (triggerCharacterOptions) {
              const removeChars = Array.isArray(triggerCharacterOptions.remove) ? triggerCharacterOptions.remove : [];
              const addChars = Array.isArray(triggerCharacterOptions.add) ? triggerCharacterOptions.add : [];
              completer.triggerCharacters = allTriggerCharacters.filter(
                (char) => !removeChars.includes(char)
              );
              addChars.forEach((char) => {
                if (!completer.triggerCharacters.includes(char)) {
                  completer.triggerCharacters.push(char);
                }
              });
            } else {
              completer.triggerCharacters = allTriggerCharacters;
            }
          }
        }
        let hasSemanticTokensProvider = Object.values(capabilities).some((capability) => {
          if (capability == null ? void 0 : capability.semanticTokensProvider) {
            this.semanticTokensLegend = capability.semanticTokensProvider.legend;
            return true;
          }
        });
        if (hasSemanticTokensProvider) {
          this.getSemanticTokens();
        }
      };
      this.$changeListener = (delta) => {
        this.session.doc.version++;
        if (!this.$deltaQueue) {
          this.$deltaQueue = [];
          setTimeout(() => this.$sendDeltaQueue(() => {
            this.getSemanticTokens();
          }), 0);
        }
        this.$deltaQueue.push(delta);
      };
      this.$sendDeltaQueue = (callback) => {
        let deltas = this.$deltaQueue;
        if (!deltas) return callback && callback();
        this.$deltaQueue = null;
        if (deltas.length)
          this.$messageController.change(this.comboDocumentIdentifier, deltas.map((delta) => fromAceDelta(delta, this.session.doc.getNewLineCharacter())), this.session.doc, callback);
      };
      this.$showAnnotations = (diagnostics) => {
        if (!diagnostics) {
          return;
        }
        let annotations = toAnnotations(diagnostics);
        this.session.clearAnnotations();
        if (annotations && annotations.length > 0) {
          this.session.setAnnotations(annotations);
        }
        if (!this.state.diagnosticMarkers) {
          this.state.diagnosticMarkers = new MarkerGroup(this.session);
        }
        this.state.diagnosticMarkers.setMarkers(diagnostics == null ? void 0 : diagnostics.map((el) => toMarkerGroupItem(CommonConverter.toRange(toRange(el.range)), mapSeverityToClassName(el.severity), el.message)).filter(Boolean));
      };
      this.validate = () => {
        this.$messageController.doValidation(this.comboDocumentIdentifier, this.$showAnnotations);
      };
      this.format = () => {
        let selectionRanges = this.session.getSelection().getAllRanges();
        let $format = this.$format;
        let aceRangeDatas = selectionRanges;
        if (!selectionRanges || selectionRanges[0].isEmpty()) {
          let row = this.session.getLength();
          let column = this.session.getLine(row).length - 1;
          aceRangeDatas = [{
            start: {
              row: 0,
              column: 0
            },
            end: {
              row,
              column
            }
          }];
        }
        for (let range of aceRangeDatas) {
          this.$messageController.format(this.comboDocumentIdentifier, fromRange(range), $format, this.applyEdits);
        }
      };
      this.applyEdits = (edits) => {
        edits != null ? edits : edits = [];
        for (let edit of edits.reverse()) {
          this.session.replace(toRange(edit.range), edit.newText);
        }
      };
      this.$applyDocumentHighlight = (documentHighlights) => {
        if (!this.state.occurrenceMarkers) {
          this.state.occurrenceMarkers = new MarkerGroup(this.session);
        }
        if (documentHighlights) {
          this.state.occurrenceMarkers.setMarkers(fromDocumentHighlights(documentHighlights));
        }
      };
      this.$provider = provider;
      this.$messageController = messageController;
      this.session = session;
      this.editor = editor;
      session.doc.version = 1;
      session.doc.on("change", this.$changeListener, true);
      this.addSemanticTokenSupport(session);
      session.on("changeMode", this.$changeMode);
      if (this.$provider.options.functionality.semanticTokens) {
        this.$changeScrollTopHandler = () => this.getSemanticTokens();
        session.on("changeScrollTop", this.$changeScrollTopHandler);
      }
      session.setUseWorker(false);
      this.$init(config);
    }
    enqueueIfNotConnected(callback) {
      if (!this.$isConnected) {
        this.$requestsQueue.push(callback);
      } else {
        callback();
      }
    }
    get comboDocumentIdentifier() {
      return {
        documentUri: this.documentUri,
        sessionId: this.session["id"]
      };
    }
    /**
     * Sets the file path for the current document and optionally joins it with the workspace URI.
     * Increments the document version and updates the internal document URI and identifier.
     *
     * @param {string} filePath - The new file path for the document.
     * @param {boolean} [joinWorkspaceURI] - when true the given path is treated as relative and will be joined with
     * the workspace’s root URI to form the final canonical URI. When false (or omitted) filePath is just transformed to
     * URI.
     */
    setFilePath(filePath, joinWorkspaceURI) {
      this.enqueueIfNotConnected(() => {
        this.session.doc.version++;
        this.$filePath = filePath;
        const previousComboId = this.comboDocumentIdentifier;
        this.initDocumentUri(true, joinWorkspaceURI);
        if (previousComboId.documentUri === this.comboDocumentIdentifier.documentUri) {
          return;
        }
        this.$messageController.renameDocument(previousComboId, this.comboDocumentIdentifier.documentUri, this.session.doc.version);
      });
    }
    $init(config) {
      if (config == null ? void 0 : config.filePath) {
        this.$filePath = config.filePath;
      }
      this.initDocumentUri(false, config == null ? void 0 : config.joinWorkspaceURI);
      this.$messageController.init(this.comboDocumentIdentifier, this.session.doc, this.$mode, this.$options, this.$connected);
    }
    addSemanticTokenSupport(session) {
      let bgTokenizer = session.bgTokenizer;
      session.setSemanticTokens = (tokens) => {
        bgTokenizer.semanticTokens = tokens;
      };
      bgTokenizer.$tokenizeRow = (row) => {
        var line = bgTokenizer.doc.getLine(row);
        var state = bgTokenizer.states[row - 1];
        var data = bgTokenizer.tokenizer.getLineTokens(line, state, row);
        if (bgTokenizer.states[row] + "" !== data.state + "") {
          bgTokenizer.states[row] = data.state;
          bgTokenizer.lines[row + 1] = null;
          if (bgTokenizer.currentLine > row + 1)
            bgTokenizer.currentLine = row + 1;
        } else if (bgTokenizer.currentLine == row) {
          bgTokenizer.currentLine = row + 1;
        }
        if (bgTokenizer.semanticTokens) {
          let decodedTokens = bgTokenizer.semanticTokens.getByRow(row);
          if (decodedTokens) {
            data.tokens = mergeTokens(data.tokens, decodedTokens);
          }
        }
        return bgTokenizer.lines[row] = data.tokens;
      };
    }
    initDocumentUri(isRename = false, joinWorkspaceURI = false) {
      var _a;
      let filePath = (_a = this.$filePath) != null ? _a : this.session["id"] + "." + this.$extension;
      if (isRename) {
        delete this.$provider.$urisToSessionsIds[this.documentUri];
      }
      this.documentUri = convertToUri(filePath, joinWorkspaceURI, this.$provider.workspaceUri);
      this.$provider.$urisToSessionsIds[this.documentUri] = this.session["id"];
    }
    get $extension() {
      var _a;
      let mode = this.$mode.replace("ace/mode/", "");
      return (_a = this.extensions[mode]) != null ? _a : mode;
    }
    get $mode() {
      return this.session["$modeId"];
    }
    get $format() {
      return {
        tabSize: this.session.getTabSize(),
        insertSpaces: this.session.getUseSoftTabs()
      };
    }
    setOptions(options) {
      if (!this.$isConnected) {
        this.$options = options;
        return;
      }
      this.$messageController.changeOptions(this.comboDocumentIdentifier, options);
    }
    getSemanticTokens() {
      if (!this.$provider.options.functionality.semanticTokens)
        return;
      let lastRow = this.editor.renderer.getLastVisibleRow();
      let visibleRange = {
        start: {
          row: this.editor.renderer.getFirstVisibleRow(),
          column: 0
        },
        end: {
          row: lastRow + 1,
          column: this.session.getLine(lastRow).length
        }
      };
      this.$messageController.getSemanticTokens(
        this.comboDocumentIdentifier,
        fromRange(visibleRange),
        (tokens) => {
          if (!tokens) {
            return;
          }
          let decodedTokens = parseSemanticTokens(tokens.data, this.semanticTokensLegend.tokenTypes, this.semanticTokensLegend.tokenModifiers);
          this.session.setSemanticTokens(decodedTokens);
          let bgTokenizer = this.session.bgTokenizer;
          bgTokenizer.running = setTimeout(() => {
            var _a, _b, _c;
            if (((_a = bgTokenizer == null ? void 0 : bgTokenizer.semanticTokens) == null ? void 0 : _a.tokens) && ((_b = bgTokenizer == null ? void 0 : bgTokenizer.semanticTokens) == null ? void 0 : _b.tokens.length) > 0) {
              let startRow = (_c = bgTokenizer == null ? void 0 : bgTokenizer.semanticTokens) == null ? void 0 : _c.tokens[0].row;
              bgTokenizer.currentLine = startRow;
              bgTokenizer.lines = bgTokenizer.lines.slice(0, startRow - 1);
            } else {
              bgTokenizer.currentLine = 0;
              bgTokenizer.lines = [];
            }
            bgTokenizer.$worker();
          }, 20);
        }
      );
    }
    /**
     * Disposes of the SessionLanguageProvider, cleaning up all event listeners,
     * marker groups, and notifying the server to close the document.
     * This method should be called when the session is no longer needed.
     *
     * @param callback - Optional callback to execute after the document is closed
     */
    dispose(callback) {
      this.session.doc.off("change", this.$changeListener);
      this.session.off("changeMode", this.$changeMode);
      if (this.$changeScrollTopHandler) {
        this.session.off("changeScrollTop", this.$changeScrollTopHandler);
        this.$changeScrollTopHandler = void 0;
      }
      if (this.state.occurrenceMarkers) {
        this.state.occurrenceMarkers.setMarkers([]);
        this.state.occurrenceMarkers = null;
      }
      if (this.state.diagnosticMarkers) {
        this.state.diagnosticMarkers.setMarkers([]);
        this.state.diagnosticMarkers = null;
      }
      this.session.clearAnnotations();
      if (this.session.setSemanticTokens) {
        this.session.setSemanticTokens(void 0);
      }
      this.$deltaQueue = null;
      this.$requestsQueue = [];
      if (this.documentUri) {
        delete this.$provider.$urisToSessionsIds[this.documentUri];
      }
      this.$isConnected = false;
      this.session.setUseWorker(true);
      this.closeDocument(callback);
    }
    closeDocument(callback) {
      this.$messageController.closeDocument(this.comboDocumentIdentifier, callback);
    }
  }
  function isDiagnosticCodeActionData(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    const candidate = value;
    return candidate.v === 1 && typeof candidate.provider === "string" && typeof candidate.issueId === "string";
  }
  function extractDiagnosticQuickFixesAtPosition(annotations, position) {
    const fixes = [];
    const seen = /* @__PURE__ */ new Set();
    for (const annotation of annotations) {
      const data = annotation.data;
      if (!isDiagnosticCodeActionData(data)) {
        continue;
      }
      for (const fix of data.fixes || []) {
        if (!isPositionInLspRange(position, fix.range)) {
          continue;
        }
        const key = [
          data.provider,
          data.issueId,
          fix.title,
          fix.newText,
          fix.range.start.line,
          fix.range.start.character,
          fix.range.end.line,
          fix.range.end.character
        ].join("|");
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        fixes.push({
          provider: data.provider,
          issueId: data.issueId,
          fix
        });
      }
    }
    return fixes;
  }
  function createHoverQuickFixNode(fixes, onApplyFix) {
    if (!fixes.length) {
      return null;
    }
    const wrapper = document.createElement("div");
    wrapper.className = "ace_lsp_hover_quickfixes";
    const title = document.createElement("div");
    title.className = "ace_lsp_hover_quickfixes_title";
    wrapper.appendChild(title);
    const controls = document.createElement("div");
    controls.className = "ace_lsp_hover_quickfixes_controls";
    wrapper.appendChild(controls);
    const primaryLink = createActionLink(fixes[0].fix.title);
    primaryLink.classList.add("ace_lsp_hover_quickfixes_primary");
    primaryLink.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onApplyFix(fixes[0]);
    });
    controls.appendChild(primaryLink);
    let menuPopup = null;
    if (fixes.length > 1) {
      const moreLink = createActionLink("More actions...");
      moreLink.classList.add("ace_lsp_hover_quickfixes_more");
      controls.appendChild(moreLink);
      moreLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (menuPopup) {
          menuPopup.destroy();
          menuPopup = null;
          return;
        }
        menuPopup = new ActionMenuPopup(
          document.body || document.documentElement,
          (entry) => {
            onApplyFix(entry);
            menuPopup == null ? void 0 : menuPopup.destroy();
            menuPopup = null;
          },
          { lineHeight: 12 }
        );
        menuPopup.setItems(
          fixes.slice(1).map((entry) => ({
            label: entry.fix.title,
            value: entry
          }))
        );
        const menuPosition = getHoverMenuPosition(moreLink);
        menuPopup.showAt(menuPosition.x, menuPosition.y, false, moreLink);
      });
    }
    return wrapper;
  }
  function createActionLink(text) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = text;
    link.className = "ace_lsp_hover_quickfixes_link";
    return link;
  }
  function getHoverMenuPosition(anchor) {
    const gap = 2;
    const estimatedMenuWidth = 260;
    const estimatedMenuHeight = 220;
    const anchorRect = anchor.getBoundingClientRect();
    const tooltip = anchor.closest(".ace_tooltip");
    if (!tooltip) {
      return {
        x: anchorRect.right,
        y: anchorRect.bottom + 4
      };
    }
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rightX = tooltipRect.right + gap;
    const rightFits = rightX + estimatedMenuWidth <= viewportWidth - gap;
    if (rightFits) {
      return {
        x: rightX,
        y: Math.max(gap, anchorRect.top - 12)
      };
    }
    const bottomY = tooltipRect.bottom + gap;
    const bottomFits = bottomY + estimatedMenuHeight <= viewportHeight - gap;
    if (bottomFits) {
      return {
        x: Math.max(gap, Math.min(anchorRect.right, viewportWidth - estimatedMenuWidth - gap)),
        y: bottomY
      };
    }
    const leftX = Math.max(gap, tooltipRect.left - estimatedMenuWidth - gap);
    return {
      x: leftX,
      y: Math.max(gap, anchorRect.top - 12)
    };
  }
  function isPositionInLspRange(position, range) {
    const line = position.row;
    const character = position.column;
    if (line < range.start.line || line > range.end.line) {
      return false;
    }
    if (line === range.start.line && character < range.start.character) {
      return false;
    }
    if (line === range.end.line && character > range.end.character) {
      return false;
    }
    return true;
  }
  function resolveHoverModel(context) {
    var _a, _b, _c, _d;
    const { hover, errorMarkers, quickFixes } = context;
    const hoverHtml = (hover == null ? void 0 : hover.content) ? context.getHoverHtml(hover) : void 0;
    const errorText = buildErrorText(errorMarkers);
    if (!hoverHtml && !errorText && quickFixes.length === 0) {
      return null;
    }
    const actionRange = ((_a = quickFixes[0]) == null ? void 0 : _a.fix.range) ? context.lspRangeToAceRange(quickFixes[0].fix.range) : void 0;
    const baseRange = (_d = (_c = hover == null ? void 0 : hover.range) != null ? _c : (_b = errorMarkers[0]) == null ? void 0 : _b.range) != null ? _d : actionRange;
    const range = baseRange ? context.rangeFromPoints(baseRange.start, baseRange.end) : context.getWordRange(context.docPos.row, context.docPos.column);
    return {
      range,
      errorText,
      hoverHtml,
      quickFixes
    };
  }
  function buildErrorText(errorMarkers) {
    const text = errorMarkers.map((marker) => {
      var _a;
      return (_a = marker.tooltipText) == null ? void 0 : _a.trim();
    }).filter((value) => Boolean(value)).join("\n");
    return text || void 0;
  }
  function createHoverViewNode(model, onApplyFix) {
    const domNode = document.createElement("div");
    const errorNode = createErrorNode(model.errorText);
    if (errorNode) {
      domNode.appendChild(errorNode);
    }
    const hoverNode = createHoverNode(model.hoverHtml);
    if (hoverNode) {
      domNode.appendChild(hoverNode);
    }
    const quickFixNode = createHoverQuickFixNode(model.quickFixes, onApplyFix);
    if (quickFixNode) {
      domNode.appendChild(quickFixNode);
    }
    return domNode;
  }
  function createHoverNode(hoverHtml) {
    if (!hoverHtml) {
      return null;
    }
    const hoverNode = document.createElement("div");
    hoverNode.innerHTML = hoverHtml;
    return hoverNode;
  }
  function createErrorNode(errorText) {
    if (!errorText) {
      return null;
    }
    const errorNode = document.createElement("div");
    errorNode.textContent = errorText;
    return errorNode;
  }
  class LanguageProvider {
    constructor(worker, options) {
      this.$sessionLanguageProviders = {};
      this.editors = [];
      this.$urisToSessionsIds = {};
      this.$lightBulbWidgets = {};
      this.$editorEventHandlers = {};
      this.$editorOriginalState = {};
      this.registerSession = (session, editor, config) => {
        if (!this.$sessionLanguageProviders[session["id"]]) {
          this.$sessionLanguageProviders[session["id"]] = new SessionLanguageProvider(this, session, editor, this.$messageController, config);
        }
        if (config) {
          this.$sessionLanguageProviders[session["id"]].setFilePath(config.filePath, config.joinWorkspaceURI);
        }
      };
      this.format = () => {
        if (!this.options.functionality.format)
          return;
        if (this.activeEditor) {
          let sessionLanguageProvider = this.$getSessionLanguageProvider(this.activeEditor.session);
          sessionLanguageProvider.$sendDeltaQueue(sessionLanguageProvider.format);
        }
      };
      this.$messageController = new MessageController(worker, this);
      this.setProviderOptions(options);
      this.$signatureTooltip = new SignatureTooltip(this);
    }
    /**
     *  Creates LanguageProvider using our transport protocol with the ability to register different services on the same
     *  webworker
     * @param {Worker} worker
     * @param {ProviderOptions} options
     */
    static create(worker, options) {
      return new LanguageProvider(worker, options);
    }
    static fromCdn(source, options, includeDefaultLinters) {
      var _a;
      let worker;
      if (typeof source === "string") {
        if (source == "" || !/^http(s)?:/.test(source)) {
          throw "Url is not valid";
        }
        if (source[source.length - 1] == "/") {
          source = source.substring(0, source.length - 1);
        }
        worker = createWorker(source, includeDefaultLinters);
      } else {
        if (source.includeDefaultLinters == void 0) {
          source.includeDefaultLinters = true;
        }
        worker = createWorker({
          services: source.services,
          serviceManagerCdn: source.serviceManagerCdn
        }, (_a = source.includeDefaultLinters) != null ? _a : includeDefaultLinters);
      }
      return new LanguageProvider(worker, options);
    }
    setProviderOptions(options) {
      var _a;
      const defaultFunctionalities = {
        hover: true,
        completion: { overwriteCompleters: true },
        completionResolve: true,
        format: true,
        documentHighlights: true,
        signatureHelp: true,
        semanticTokens: false,
        //experimental functionality
        codeActions: true,
        inlineCompletion: false
      };
      this.options = options != null ? options : {};
      this.options.functionality = typeof this.options.functionality === "object" ? this.options.functionality : {};
      Object.entries(defaultFunctionalities).forEach(([key, value]) => {
        if (this.options.functionality[key] === void 0) {
          this.options.functionality[key] = value;
        }
      });
      (_a = this.options).markdownConverter || (_a.markdownConverter = new showdown.Converter());
      if (options == null ? void 0 : options.workspacePath) {
        this.workspaceUri = convertToUri(options.workspacePath);
      }
      if (this.options.functionality.inlineCompletion) {
        this.checkInlineCompletionAdapter(() => {
          var _a2, _b, _c;
          if (!((_a2 = this.options.aceComponents) == null ? void 0 : _a2.InlineAutocomplete) || !((_b = this.options.aceComponents) == null ? void 0 : _b.CommandBarTooltip) || !((_c = this.options.aceComponents) == null ? void 0 : _c.CompletionProvider)) {
            throw new Error("Inline completion requires the InlineAutocomplete, CompletionProvider and CommandBarTooltip to be defined");
          }
          this.completerAdapter = createInlineCompleterAdapter(this.options.aceComponents.InlineAutocomplete, this.options.aceComponents.CommandBarTooltip, this.options.aceComponents.CompletionProvider);
        });
      }
    }
    checkInlineCompletionAdapter(method) {
      var _a;
      try {
        method();
      } catch (e) {
        console.error(`Inline completion disabled: Incompatible Ace implementation: ${e.message}`);
        if ((_a = this.options) == null ? void 0 : _a.functionality) {
          this.options.functionality.inlineCompletion = false;
        }
      }
    }
    /**
     * Sets the file path for the given Ace edit session. Optionally allows the file path to
     * be joined with the workspace URI.
     *
     * @param session The Ace edit session to update with the file path.
     * @param config config to set
     */
    setSessionFilePath(session, config) {
      var _a;
      (_a = this.$getSessionLanguageProvider(session)) == null ? void 0 : _a.setFilePath(config.filePath, config.joinWorkspaceURI);
    }
    /**
     * Sets the Language Server Protocol (LSP) configuration for the given session.
     *
     * @param session - The editor session to which the LSP configuration will be applied.
     * @param config - The LSP configuration to set for the session.
     * @return The updated editor session with the applied LSP configuration.
     */
    setSessionLspConfig(session, config) {
      session.lspConfig = config;
      return session;
    }
    $getSessionLanguageProvider(session) {
      return this.$sessionLanguageProviders[session["id"]];
    }
    $getFileName(session) {
      let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
      return sessionLanguageProvider.comboDocumentIdentifier;
    }
    /**
     * Registers an Ace editor instance along with the session's configuration settings.
     *
     * @param editor - The Ace editor instance to be registered.
     * @param [config] - Configuration options for the session.
     */
    registerEditor(editor, config) {
      if (!this.editors.includes(editor))
        this.$registerEditor(editor);
      config = config != null ? config : editor.session.lspConfig;
      this.registerSession(editor.session, editor, config);
    }
    /**
     * Unregisters an Ace editor instance, removing all event listeners, completers, tooltips,
     * and cleaning up associated resources. This is the counterpart to registerEditor.
     *
     * @param editor - The Ace editor instance to be unregistered.
     * @param cleanupSession - Optional flag to also dispose the current session. When true,
     *                         calls closeDocument on the editor's session, cleaning up all
     *                         session-related resources. Default: false.
     */
    unregisterEditor(editor, cleanupSession = false) {
      if (this.editors.includes(editor))
        this.$unregisterEditor(editor, cleanupSession);
    }
    /**
     * Sets a callback function that will be triggered with an array of code actions grouped by service.
     *
     * @param {function} callback - A function that receives an array of code actions, categorized by service, as its argument.
     */
    setCodeActionCallback(callback) {
      this.codeActionCallback = callback;
    }
    executeCommand(command, serviceName, args, callback) {
      this.$messageController.executeCommand(serviceName, command, args, callback);
    }
    applyEdit(workspaceEdit, serviceName, callback) {
      if (workspaceEdit.changes) {
        for (let uri in workspaceEdit.changes) {
          if (!this.$urisToSessionsIds[uri]) {
            callback && callback({
              applied: false,
              failureReason: "No session found for uri " + uri
            }, serviceName);
            return;
          }
        }
        for (let uri in workspaceEdit.changes) {
          let sessionId = this.$urisToSessionsIds[uri];
          let sessionLanguageProvider = this.$sessionLanguageProviders[sessionId];
          sessionLanguageProvider.applyEdits(workspaceEdit.changes[uri]);
        }
        callback && callback({
          applied: true
        }, serviceName);
      }
      if (workspaceEdit.documentChanges) {
        for (let change of workspaceEdit.documentChanges) {
          if ("kind" in change) {
            return;
          }
          if ("textDocument" in change) {
            let uri = change.textDocument.uri;
            if (!this.$urisToSessionsIds[uri]) {
              callback && callback({
                applied: false,
                failureReason: "No session found for uri " + uri
              }, serviceName);
              return;
            }
          }
        }
        for (let change of workspaceEdit.documentChanges) {
          if ("textDocument" in change) {
            let sessionId = this.$urisToSessionsIds[change.textDocument.uri];
            let sessionLanguageProvider = this.$sessionLanguageProviders[sessionId];
            sessionLanguageProvider.applyEdits(change.edits);
          }
        }
        callback && callback({
          applied: true
        }, serviceName);
      }
    }
    $registerEditor(editor) {
      var _a;
      this.editors.push(editor);
      AceRange.getConstructor(editor);
      AceVirtualRenderer.getConstructor(editor);
      AceEditor.getConstructor(editor);
      editor.setOption("useWorker", false);
      this.$editorEventHandlers[editor.id] = {};
      if (!this.options.manualSessionControl) {
        const changeSessionHandler = ({ session }) => this.registerSession(session, editor, session.lspConfig);
        this.$editorEventHandlers[editor.id].changeSession = changeSessionHandler;
        editor.on("changeSession", changeSessionHandler);
      }
      if (this.options.functionality.completion || this.options.functionality.inlineCompletion) {
        this.$registerCompleters(editor);
      }
      (_a = this.activeEditor) != null ? _a : this.activeEditor = editor;
      const focusHandler = () => {
        this.activeEditor = editor;
      };
      this.$editorEventHandlers[editor.id].focus = focusHandler;
      editor.on("focus", focusHandler);
      if (this.options.functionality.documentHighlights) {
        var $timer;
        const changeSelectionForHighlights = () => {
          if (!$timer)
            $timer = setTimeout(() => {
              let sessionLanguageProvider = this.$getSessionLanguageProvider(editor.session);
              if (!sessionLanguageProvider) {
                $timer = void 0;
                return;
              }
              let cursor = editor.getCursorPosition();
              this.$messageController.findDocumentHighlights(this.$getFileName(editor.session), fromPoint(cursor), sessionLanguageProvider.$applyDocumentHighlight);
              $timer = void 0;
            }, 50);
        };
        this.$editorEventHandlers[editor.id].changeSelectionForHighlights = changeSelectionForHighlights;
        editor.on("changeSelection", changeSelectionForHighlights);
      }
      if (this.options.functionality.codeActions) {
        this.$provideCodeActions(editor);
      }
      if (this.options.functionality.hover) {
        if (!this.$hoverTooltip) {
          this.$hoverTooltip = new HoverTooltip();
        }
        this.$initHoverTooltip(editor);
      }
      if (this.options.functionality.signatureHelp) {
        this.$signatureTooltip.registerEditor(editor);
      }
      this.setStyles(editor);
    }
    $unregisterEditor(editor, cleanupSession = false) {
      var _a, _b, _c, _d, _e, _f;
      const editorIndex = this.editors.indexOf(editor);
      if (editorIndex > -1) {
        this.editors.splice(editorIndex, 1);
      }
      const handlers = this.$editorEventHandlers[editor.id];
      if (handlers) {
        if (handlers.changeSession) {
          editor.off("changeSession", handlers.changeSession);
        }
        if (handlers.focus) {
          editor.off("focus", handlers.focus);
        }
        if (handlers.changeSelectionForHighlights) {
          editor.off("changeSelection", handlers.changeSelectionForHighlights);
        }
        if (handlers.changeSelectionForCodeActions) {
          editor.off("changeSelection", handlers.changeSelectionForCodeActions);
        }
        if (handlers.afterExec) {
          editor.commands.off("afterExec", handlers.afterExec);
        }
        delete this.$editorEventHandlers[editor.id];
      }
      const originalState = this.$editorOriginalState[editor.id];
      if (originalState) {
        if (((_a = this.options.functionality) == null ? void 0 : _a.completion) && originalState.completers !== void 0) {
          editor.completers = originalState.completers;
        }
        if (((_b = this.options.functionality) == null ? void 0 : _b.inlineCompletion) && originalState.inlineCompleters !== void 0) {
          editor.inlineCompleters = originalState.inlineCompleters;
        }
        if ((_c = this.options.functionality) == null ? void 0 : _c.inlineCompletion) {
          if (originalState.inlineAutocompleteCommand) {
            editor.commands.addCommand(originalState.inlineAutocompleteCommand);
          } else {
            try {
              editor.commands.removeCommand("startInlineAutocomplete");
            } catch (e) {
            }
          }
        }
        delete this.$editorOriginalState[editor.id];
      }
      if ((_d = this.options.functionality) == null ? void 0 : _d.signatureHelp) {
        this.$signatureTooltip.unregisterEditor(editor);
      }
      if (((_e = this.options.functionality) == null ? void 0 : _e.hover) && this.$hoverTooltip) {
        this.$hoverTooltip.removeFromEditor(editor);
      }
      if ((_f = this.options.functionality) == null ? void 0 : _f.codeActions) {
        const lightBulb = this.$lightBulbWidgets[editor.id];
        if (lightBulb) {
          lightBulb.dispose();
          delete this.$lightBulbWidgets[editor.id];
        }
      }
      editor.setOption("useWorker", true);
      if (this.activeEditor === editor) {
        this.activeEditor = this.editors.length > 0 ? this.editors[0] : null;
      }
      if (cleanupSession && editor.session) {
        this.closeDocument(editor.session);
      }
    }
    $provideCodeActions(editor) {
      const lightBulb = new LightbulbWidget(editor);
      this.$lightBulbWidgets[editor.id] = lightBulb;
      lightBulb.setExecuteActionCallback((action, serviceName) => {
        for (let id in this.$lightBulbWidgets) {
          this.$lightBulbWidgets[id].hideAll();
        }
        if (typeof action.command === "string") {
          this.executeCommand(action.command, serviceName, action["arguments"]);
        } else {
          if (action.command) {
            this.executeCommand(action.command.command, serviceName, action.command.arguments);
          } else if ("edit" in action) {
            this.applyEdit(action.edit, serviceName);
          }
        }
      });
      var actionTimer;
      const changeSelectionForCodeActions = () => {
        if (!actionTimer)
          actionTimer = setTimeout(() => {
            if (!this.$getSessionLanguageProvider(editor.session)) {
              actionTimer = void 0;
              return;
            }
            let selection = editor.getSelection().getRange();
            let cursor = editor.getCursorPosition();
            let diagnostics = fromAnnotations(editor.session.getAnnotations().filter((el) => el.row === cursor.row));
            this.$messageController.getCodeActions(this.$getFileName(editor.session), fromRange(selection), { diagnostics }, (codeActions) => {
              lightBulb.setCodeActions(codeActions);
              lightBulb.showLightbulb();
            });
            actionTimer = void 0;
          }, 500);
      };
      this.$editorEventHandlers[editor.id].changeSelectionForCodeActions = changeSelectionForCodeActions;
      editor.on("changeSelection", changeSelectionForCodeActions);
    }
    $initHoverTooltip(editor) {
      const Range2 = editor.getSelectionRange().constructor;
      this.$hoverTooltip.setDataProvider((e, editor2) => {
        const session = editor2.session;
        const docPos = e.getDocumentPosition();
        const annotations = session.getAnnotations() || [];
        const quickFixes = extractDiagnosticQuickFixesAtPosition(annotations, docPos);
        this.doHover(session, docPos, (hover) => {
          var _a, _b, _c;
          const errorMarkers = (_c = (_b = (_a = this.$getSessionLanguageProvider(session).state) == null ? void 0 : _a.diagnosticMarkers) == null ? void 0 : _b.getMarkersAtPosition(docPos)) != null ? _c : [];
          const hoverModel = resolveHoverModel({
            hover,
            errorMarkers,
            quickFixes,
            docPos,
            rangeFromPoints: (start, end) => Range2.fromPoints(start, end),
            getWordRange: (row, column) => session.getWordRange(row, column),
            lspRangeToAceRange: (range) => ({
              start: { row: range.start.line, column: range.start.character },
              end: { row: range.end.line, column: range.end.character }
            }),
            getHoverHtml: (hover2) => this.getTooltipText(hover2)
          });
          if (!hoverModel) return;
          const domNode = createHoverViewNode(hoverModel, (entry) => {
            const documentUri = this.$getFileName(session).documentUri;
            this.applyEdit({
              changes: {
                [documentUri]: [{
                  range: entry.fix.range,
                  newText: entry.fix.newText
                }]
              }
            }, entry.provider);
            this.$hoverTooltip.hide();
          });
          this.$hoverTooltip.showForRange(editor2, hoverModel.range, domNode, e);
        });
      });
      this.$hoverTooltip.addToEditor(editor);
    }
    setStyles(editor) {
      if (!this.stylesEmbedded) {
        setStyles(editor);
        this.stylesEmbedded = true;
      }
    }
    /**
     * Configures global options that apply to all documents handled by the specified language service.
     *
     * Global options serve as default settings for all documents processed by a service when no
     * document-specific options are provided. These options affect language service behavior across
     * the entire workspace, including validation rules, formatting preferences, completion settings,
     * and service-specific configurations.
     *
     * @param serviceName - The identifier of the language service to configure. Must be a valid
     *                      service name from the supported services (e.g., 'typescript', 'json', 'html').
     * @param options - The global configuration options specific to the language service. The structure
     *                  varies by service type.
     * @param {boolean} [merge=false] - Indicates whether to merge the provided options with the existing options.
     *                  Defaults to false.
     */
    setGlobalOptions(serviceName, options, merge = false) {
      this.$messageController.setGlobalOptions(serviceName, options, merge);
    }
    /**
     * Sets the workspace URI for the language provider.
     *
     * If the provided URI is the same as the current workspace URI, no action is taken.
     * Otherwise, the workspace URI is updated and the message controller is notified.
     *
     * Not all servers support changing of workspace URI.
     *
     * @param workspaceUri - The new workspace URI. Could be simple path, not URI itself.
     */
    changeWorkspaceFolder(workspaceUri) {
      if (workspaceUri === this.workspaceUri)
        return;
      this.workspaceUri = convertToUri(workspaceUri);
      this.$messageController.setWorkspace(this.workspaceUri);
    }
    /**
     * Sets the options for a specified editor session.
     *
     * @param session - The Ace editor session to configure.
     * @param options - The configuration options to be applied to the session.
     * @deprecated Use `setDocumentOptions` instead. This method will be removed in the future.
     */
    setSessionOptions(session, options) {
      let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
      sessionLanguageProvider.setOptions(options);
    }
    /**
     * Sets configuration options for a document associated with the specified editor session.
     *
     * @param session - The Ace editor session representing the document to configure.
     * @param options - The service options to apply. The exact shape depends on the language services
     *                  active for this session (e.g. JSON schema settings).
     */
    setDocumentOptions(session, options) {
      let sessionLanguageProvider = this.$getSessionLanguageProvider(session);
      sessionLanguageProvider.setOptions(options);
    }
    /**
     * Configures the specified features for a given service.
     *
     * @param {SupportedServices} serviceName - The name of the service for which features are being configured.
     * @param {ServiceFeatures} features - The features to be configured for the given service.
     * @return {void} Does not return a value.
     */
    configureServiceFeatures(serviceName, features) {
      this.$messageController.configureFeatures(serviceName, features);
    }
    doHover(session, position, callback) {
      this.$messageController.doHover(this.$getFileName(session), fromPoint(position), (hover) => callback && callback(toTooltip(hover)));
    }
    provideSignatureHelp(session, position, callback) {
      if (!this.$getSessionLanguageProvider(session))
        return;
      this.$messageController.provideSignatureHelp(this.$getFileName(session), fromPoint(position), (signatureHelp) => callback && callback(fromSignatureHelp(signatureHelp)));
    }
    getTooltipText(hover) {
      return hover.content.type === "markdown" ? CommonConverter.cleanHtml(this.options.markdownConverter.makeHtml(hover.content.text)) : hover.content.text;
    }
    getSemanticTokens() {
      if (!this.options.functionality.semanticTokens)
        return;
      if (this.activeEditor) {
        let sessionLanguageProvider = this.$getSessionLanguageProvider(this.activeEditor.session);
        sessionLanguageProvider.getSemanticTokens();
      }
    }
    doComplete(editor, session, callback) {
      let cursor = editor.getCursorPosition();
      this.$messageController.doComplete(
        this.$getFileName(session),
        fromPoint(cursor),
        (completions) => completions && callback(toCompletions(completions))
      );
    }
    doInlineComplete(editor, session, callback) {
      let cursor = editor.getCursorPosition();
      this.$messageController.doInlineComplete(
        this.$getFileName(session),
        fromPoint(cursor),
        (completions) => completions && callback(toInlineCompletions(completions))
      );
    }
    doResolve(item, callback) {
      this.$messageController.doResolve(item["fileName"], toCompletionItem(item), callback);
    }
    $registerCompleters(editor) {
      var _a, _b, _c, _d, _e, _f, _g;
      let completer, inlineCompleter;
      if (!((_a = this.options.functionality) == null ? void 0 : _a.completion) && !((_b = this.options.functionality) == null ? void 0 : _b.inlineCompletion)) {
        return;
      }
      this.$editorOriginalState[editor.id] = {};
      if ((_c = this.options.functionality) == null ? void 0 : _c.completion) {
        this.$editorOriginalState[editor.id].completers = editor.completers ? [...editor.completers] : [];
        if (this.options.functionality.completion.overwriteCompleters) {
          editor.completers = [];
        }
      }
      if ((_d = this.options.functionality) == null ? void 0 : _d.inlineCompletion) {
        this.$editorOriginalState[editor.id].inlineCompleters = editor.inlineCompleters ? [...editor.inlineCompleters] : [];
        if (this.options.functionality.inlineCompletion.overwriteCompleters) {
          editor.inlineCompleters = [];
        }
      }
      if (this.options.functionality.completion) {
        completer = {
          getCompletions: async (editor2, session, pos, prefix, callback) => {
            this.$getSessionLanguageProvider(session).$sendDeltaQueue(() => {
              const completionCallback = (completions) => {
                var _a2;
                let popup = (_a2 = editor2 == null ? void 0 : editor2.completer) == null ? void 0 : _a2.getPopup();
                if (popup) {
                  popupManager.addAcePopup(popup);
                }
                let fileName = this.$getFileName(session);
                if (!completions)
                  return;
                completions.forEach((item) => {
                  item.completerId = completer.id;
                  item["fileName"] = fileName;
                });
                callback(null, CommonConverter.normalizeRanges(completions));
              };
              this.doComplete(editor2, session, completionCallback);
            });
          },
          getDocTooltip: (item) => {
            if (this.options.functionality.completionResolve && !item["isResolved"] && item.completerId === completer.id) {
              this.doResolve(item, (completionItem) => {
                item["isResolved"] = true;
                if (!completionItem)
                  return;
                let completion = toResolvedCompletion(item, completionItem);
                item.docText = completion.docText;
                if (completion.docHTML) {
                  item.docHTML = completion.docHTML;
                } else if (completion["docMarkdown"]) {
                  item.docHTML = CommonConverter.cleanHtml(this.options.markdownConverter.makeHtml(completion["docMarkdown"]));
                }
                if (editor["completer"]) {
                  editor["completer"].updateDocTooltip();
                }
              });
            }
            return item;
          },
          id: "lspCompleters"
        };
        editor.completers.push(completer);
      }
      if ((_f = (_e = this.options) == null ? void 0 : _e.functionality) == null ? void 0 : _f.inlineCompletion) {
        this.checkInlineCompletionAdapter(() => {
          var _a2;
          if (this.completerAdapter) {
            (_a2 = editor.inlineCompleters) != null ? _a2 : editor.inlineCompleters = [];
            this.completerAdapter.validateAceInlineCompleterWithEditor(editor);
            this.inlineCompleter = this.completerAdapter.InlineCompleter;
            this.doLiveAutocomplete = this.completerAdapter.doLiveAutocomplete;
          }
        });
      }
      if ((_g = this.options.functionality) == null ? void 0 : _g.inlineCompletion) {
        const existingCommand = editor.commands.commands["startInlineAutocomplete"];
        this.$editorOriginalState[editor.id].inlineAutocompleteCommand = existingCommand || null;
        editor.commands.addCommand({
          name: "startInlineAutocomplete",
          exec: (editor2, options) => {
            var _a2;
            var completer2 = (_a2 = this.inlineCompleter) == null ? void 0 : _a2.for(editor2);
            completer2.show(options);
          },
          bindKey: { win: "Alt-C", mac: "Option-C" }
        });
        this.$editorEventHandlers[editor.id].afterExec = this.doLiveAutocomplete;
        editor.commands.on("afterExec", this.doLiveAutocomplete);
        inlineCompleter = {
          getCompletions: async (editor2, session, pos, prefix, callback) => {
            this.$getSessionLanguageProvider(session).$sendDeltaQueue(() => {
              const completionCallback = (completions) => {
                let fileName = this.$getFileName(session);
                if (!completions)
                  return;
                completions.forEach((item) => {
                  item.completerId = completer.id;
                  item["fileName"] = fileName;
                });
                callback(null, CommonConverter.normalizeRanges(completions));
              };
              this.doInlineComplete(editor2, session, completionCallback);
            });
          },
          id: "lspInlineCompleters"
        };
        editor.inlineCompleters.push(inlineCompleter);
      }
    }
    closeConnection() {
      this.$messageController.closeConnection(() => {
        this.$messageController.$worker.terminate();
      });
    }
    /**
     * Removes document from all linked services by session id and cleans up all associated resources.
     * This includes removing event listeners, clearing marker groups, annotations, and notifying the server.
     * @param session - The Ace EditSession to close
     * @param [callback] - Optional callback to execute after the document is closed
     */
    closeDocument(session, callback) {
      let sessionProvider = this.$getSessionLanguageProvider(session);
      if (sessionProvider) {
        sessionProvider.dispose(callback);
        delete this.$sessionLanguageProviders[session["id"]];
      }
    }
    /**
     * Sends a request to the message controller.
     * @param serviceName - The name of the service/server to send the request to.
     * @param method - The method name for the request.
     * @param params - The parameters for the request.
     * @param callback - An optional callback function that will be called with the result of the request.
     */
    sendRequest(serviceName, method, params, callback) {
      this.$messageController.sendRequest(serviceName, method, params, callback);
    }
    showDocument(params, serviceName, callback) {
      try {
        window.open(params.uri, "_blank");
        callback && callback({
          success: true
        }, serviceName);
      } catch (e) {
        callback && callback({
          success: false,
          error: e
        }, serviceName);
      }
    }
  }
  exports2.LanguageProvider = LanguageProvider;
  exports2.MessageController = MessageController;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
