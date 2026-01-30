(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
})(this, (function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
    var f2 = n.default;
    if (typeof f2 == "function") {
      var a2 = function a3() {
        var isInstance = false;
        try {
          isInstance = this instanceof a3;
        } catch {
        }
        if (isInstance) {
          return Reflect.construct(f2, arguments, this.constructor);
        }
        return f2.apply(this, arguments);
      };
      a2.prototype = f2.prototype;
    } else a2 = {};
    Object.defineProperty(a2, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a2, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a2;
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
  var TextDocument$1;
  (function(TextDocument2) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument$1(uri, languageId, version, content);
    }
    TextDocument2.create = create;
    function is2(value) {
      let candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument2.is = is2;
    function applyEdits(document, edits) {
      let text = document.getText();
      let sortedEdits = mergeSort2(edits, (a2, b) => {
        let diff = a2.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a2.range.start.character - b.range.start.character;
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
        } else {
          throw new Error("Overlapping edit");
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument2.applyEdits = applyEdits;
    function mergeSort2(data, compare) {
      if (data.length <= 1) {
        return data;
      }
      const p = data.length / 2 | 0;
      const left = data.slice(0, p);
      const right = data.slice(p);
      mergeSort2(left, compare);
      mergeSort2(right, compare);
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
  })(TextDocument$1 || (TextDocument$1 = {}));
  let FullTextDocument$1 = class FullTextDocument {
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
  };
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
      return TextDocument$1;
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
      function equals2(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
      }
      ExecutionSummary2.equals = equals2;
    })(ExecutionSummary || (protocol_notebook.ExecutionSummary = ExecutionSummary = {}));
    var NotebookCell;
    (function(NotebookCell2) {
      function create(kind, document) {
        return { kind, document };
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
      var MessageType;
      (function(MessageType2) {
        MessageType2.Error = 1;
        MessageType2.Warning = 2;
        MessageType2.Info = 3;
        MessageType2.Log = 4;
        MessageType2.Debug = 5;
      })(MessageType || (exports$1.MessageType = MessageType = {}));
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
    var t2 = { 975: (t3) => {
      function e2(t4) {
        if ("string" != typeof t4) throw new TypeError("Path must be a string. Received " + JSON.stringify(t4));
      }
      function r2(t4, e3) {
        for (var r3, n3 = "", i2 = 0, o2 = -1, s2 = 0, h2 = 0; h2 <= t4.length; ++h2) {
          if (h2 < t4.length) r3 = t4.charCodeAt(h2);
          else {
            if (47 === r3) break;
            r3 = 47;
          }
          if (47 === r3) {
            if (o2 === h2 - 1 || 1 === s2) ;
            else if (o2 !== h2 - 1 && 2 === s2) {
              if (n3.length < 2 || 2 !== i2 || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                if (n3.length > 2) {
                  var a3 = n3.lastIndexOf("/");
                  if (a3 !== n3.length - 1) {
                    -1 === a3 ? (n3 = "", i2 = 0) : i2 = (n3 = n3.slice(0, a3)).length - 1 - n3.lastIndexOf("/"), o2 = h2, s2 = 0;
                    continue;
                  }
                } else if (2 === n3.length || 1 === n3.length) {
                  n3 = "", i2 = 0, o2 = h2, s2 = 0;
                  continue;
                }
              }
              e3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i2 = 2);
            } else n3.length > 0 ? n3 += "/" + t4.slice(o2 + 1, h2) : n3 = t4.slice(o2 + 1, h2), i2 = h2 - o2 - 1;
            o2 = h2, s2 = 0;
          } else 46 === r3 && -1 !== s2 ? ++s2 : s2 = -1;
        }
        return n3;
      }
      var n2 = { resolve: function() {
        for (var t4, n3 = "", i2 = false, o2 = arguments.length - 1; o2 >= -1 && !i2; o2--) {
          var s2;
          o2 >= 0 ? s2 = arguments[o2] : (void 0 === t4 && (t4 = process$1.cwd()), s2 = t4), e2(s2), 0 !== s2.length && (n3 = s2 + "/" + n3, i2 = 47 === s2.charCodeAt(0));
        }
        return n3 = r2(n3, !i2), i2 ? n3.length > 0 ? "/" + n3 : "/" : n3.length > 0 ? n3 : ".";
      }, normalize: function(t4) {
        if (e2(t4), 0 === t4.length) return ".";
        var n3 = 47 === t4.charCodeAt(0), i2 = 47 === t4.charCodeAt(t4.length - 1);
        return 0 !== (t4 = r2(t4, !n3)).length || n3 || (t4 = "."), t4.length > 0 && i2 && (t4 += "/"), n3 ? "/" + t4 : t4;
      }, isAbsolute: function(t4) {
        return e2(t4), t4.length > 0 && 47 === t4.charCodeAt(0);
      }, join: function() {
        if (0 === arguments.length) return ".";
        for (var t4, r3 = 0; r3 < arguments.length; ++r3) {
          var i2 = arguments[r3];
          e2(i2), i2.length > 0 && (void 0 === t4 ? t4 = i2 : t4 += "/" + i2);
        }
        return void 0 === t4 ? "." : n2.normalize(t4);
      }, relative: function(t4, r3) {
        if (e2(t4), e2(r3), t4 === r3) return "";
        if ((t4 = n2.resolve(t4)) === (r3 = n2.resolve(r3))) return "";
        for (var i2 = 1; i2 < t4.length && 47 === t4.charCodeAt(i2); ++i2) ;
        for (var o2 = t4.length, s2 = o2 - i2, h2 = 1; h2 < r3.length && 47 === r3.charCodeAt(h2); ++h2) ;
        for (var a3 = r3.length - h2, c2 = s2 < a3 ? s2 : a3, f3 = -1, u2 = 0; u2 <= c2; ++u2) {
          if (u2 === c2) {
            if (a3 > c2) {
              if (47 === r3.charCodeAt(h2 + u2)) return r3.slice(h2 + u2 + 1);
              if (0 === u2) return r3.slice(h2 + u2);
            } else s2 > c2 && (47 === t4.charCodeAt(i2 + u2) ? f3 = u2 : 0 === u2 && (f3 = 0));
            break;
          }
          var l2 = t4.charCodeAt(i2 + u2);
          if (l2 !== r3.charCodeAt(h2 + u2)) break;
          47 === l2 && (f3 = u2);
        }
        var g2 = "";
        for (u2 = i2 + f3 + 1; u2 <= o2; ++u2) u2 !== o2 && 47 !== t4.charCodeAt(u2) || (0 === g2.length ? g2 += ".." : g2 += "/..");
        return g2.length > 0 ? g2 + r3.slice(h2 + f3) : (h2 += f3, 47 === r3.charCodeAt(h2) && ++h2, r3.slice(h2));
      }, _makeLong: function(t4) {
        return t4;
      }, dirname: function(t4) {
        if (e2(t4), 0 === t4.length) return ".";
        for (var r3 = t4.charCodeAt(0), n3 = 47 === r3, i2 = -1, o2 = true, s2 = t4.length - 1; s2 >= 1; --s2) if (47 === (r3 = t4.charCodeAt(s2))) {
          if (!o2) {
            i2 = s2;
            break;
          }
        } else o2 = false;
        return -1 === i2 ? n3 ? "/" : "." : n3 && 1 === i2 ? "//" : t4.slice(0, i2);
      }, basename: function(t4, r3) {
        if (void 0 !== r3 && "string" != typeof r3) throw new TypeError('"ext" argument must be a string');
        e2(t4);
        var n3, i2 = 0, o2 = -1, s2 = true;
        if (void 0 !== r3 && r3.length > 0 && r3.length <= t4.length) {
          if (r3.length === t4.length && r3 === t4) return "";
          var h2 = r3.length - 1, a3 = -1;
          for (n3 = t4.length - 1; n3 >= 0; --n3) {
            var c2 = t4.charCodeAt(n3);
            if (47 === c2) {
              if (!s2) {
                i2 = n3 + 1;
                break;
              }
            } else -1 === a3 && (s2 = false, a3 = n3 + 1), h2 >= 0 && (c2 === r3.charCodeAt(h2) ? -1 == --h2 && (o2 = n3) : (h2 = -1, o2 = a3));
          }
          return i2 === o2 ? o2 = a3 : -1 === o2 && (o2 = t4.length), t4.slice(i2, o2);
        }
        for (n3 = t4.length - 1; n3 >= 0; --n3) if (47 === t4.charCodeAt(n3)) {
          if (!s2) {
            i2 = n3 + 1;
            break;
          }
        } else -1 === o2 && (s2 = false, o2 = n3 + 1);
        return -1 === o2 ? "" : t4.slice(i2, o2);
      }, extname: function(t4) {
        e2(t4);
        for (var r3 = -1, n3 = 0, i2 = -1, o2 = true, s2 = 0, h2 = t4.length - 1; h2 >= 0; --h2) {
          var a3 = t4.charCodeAt(h2);
          if (47 !== a3) -1 === i2 && (o2 = false, i2 = h2 + 1), 46 === a3 ? -1 === r3 ? r3 = h2 : 1 !== s2 && (s2 = 1) : -1 !== r3 && (s2 = -1);
          else if (!o2) {
            n3 = h2 + 1;
            break;
          }
        }
        return -1 === r3 || -1 === i2 || 0 === s2 || 1 === s2 && r3 === i2 - 1 && r3 === n3 + 1 ? "" : t4.slice(r3, i2);
      }, format: function(t4) {
        if (null === t4 || "object" != typeof t4) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t4);
        return (function(t5, e3) {
          var r3 = e3.dir || e3.root, n3 = e3.base || (e3.name || "") + (e3.ext || "");
          return r3 ? r3 === e3.root ? r3 + n3 : r3 + "/" + n3 : n3;
        })(0, t4);
      }, parse: function(t4) {
        e2(t4);
        var r3 = { root: "", dir: "", base: "", ext: "", name: "" };
        if (0 === t4.length) return r3;
        var n3, i2 = t4.charCodeAt(0), o2 = 47 === i2;
        o2 ? (r3.root = "/", n3 = 1) : n3 = 0;
        for (var s2 = -1, h2 = 0, a3 = -1, c2 = true, f3 = t4.length - 1, u2 = 0; f3 >= n3; --f3) if (47 !== (i2 = t4.charCodeAt(f3))) -1 === a3 && (c2 = false, a3 = f3 + 1), 46 === i2 ? -1 === s2 ? s2 = f3 : 1 !== u2 && (u2 = 1) : -1 !== s2 && (u2 = -1);
        else if (!c2) {
          h2 = f3 + 1;
          break;
        }
        return -1 === s2 || -1 === a3 || 0 === u2 || 1 === u2 && s2 === a3 - 1 && s2 === h2 + 1 ? -1 !== a3 && (r3.base = r3.name = 0 === h2 && o2 ? t4.slice(1, a3) : t4.slice(h2, a3)) : (0 === h2 && o2 ? (r3.name = t4.slice(1, s2), r3.base = t4.slice(1, a3)) : (r3.name = t4.slice(h2, s2), r3.base = t4.slice(h2, a3)), r3.ext = t4.slice(s2, a3)), h2 > 0 ? r3.dir = t4.slice(0, h2 - 1) : o2 && (r3.dir = "/"), r3;
      }, sep: "/", delimiter: ":", win32: null, posix: null };
      n2.posix = n2, t3.exports = n2;
    } }, e = {};
    function r(n2) {
      var i2 = e[n2];
      if (void 0 !== i2) return i2.exports;
      var o2 = e[n2] = { exports: {} };
      return t2[n2](o2, o2.exports, r), o2.exports;
    }
    r.d = (t3, e2) => {
      for (var n2 in e2) r.o(e2, n2) && !r.o(t3, n2) && Object.defineProperty(t3, n2, { enumerable: true, get: e2[n2] });
    }, r.o = (t3, e2) => Object.prototype.hasOwnProperty.call(t3, e2), r.r = (t3) => {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
    };
    var n = {};
    let i;
    if (r.r(n), r.d(n, { URI: () => l, Utils: () => I }), "object" == typeof process$1) i = "win32" === process$1.platform;
    else if ("object" == typeof navigator) {
      let t3 = navigator.userAgent;
      i = t3.indexOf("Windows") >= 0;
    }
    const o = /^\w[\w\d+.-]*$/, s = /^\//, h = /^\/\//;
    function a2(t3, e2) {
      if (!t3.scheme && e2) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t3.authority}", path: "${t3.path}", query: "${t3.query}", fragment: "${t3.fragment}"}`);
      if (t3.scheme && !o.test(t3.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
      if (t3.path) {
        if (t3.authority) {
          if (!s.test(t3.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (h.test(t3.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const c = "", f2 = "/", u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class l {
      constructor(t3, e2, r2, n2, i2, o2 = false) {
        __publicField(this, "scheme");
        __publicField(this, "authority");
        __publicField(this, "path");
        __publicField(this, "query");
        __publicField(this, "fragment");
        "object" == typeof t3 ? (this.scheme = t3.scheme || c, this.authority = t3.authority || c, this.path = t3.path || c, this.query = t3.query || c, this.fragment = t3.fragment || c) : (this.scheme = /* @__PURE__ */ (function(t4, e3) {
          return t4 || e3 ? t4 : "file";
        })(t3, o2), this.authority = e2 || c, this.path = (function(t4, e3) {
          switch (t4) {
            case "https":
            case "http":
            case "file":
              e3 ? e3[0] !== f2 && (e3 = f2 + e3) : e3 = f2;
          }
          return e3;
        })(this.scheme, r2 || c), this.query = n2 || c, this.fragment = i2 || c, a2(this, o2));
      }
      static isUri(t3) {
        return t3 instanceof l || !!t3 && "string" == typeof t3.authority && "string" == typeof t3.fragment && "string" == typeof t3.path && "string" == typeof t3.query && "string" == typeof t3.scheme && "string" == typeof t3.fsPath && "function" == typeof t3.with && "function" == typeof t3.toString;
      }
      get fsPath() {
        return v(this);
      }
      with(t3) {
        if (!t3) return this;
        let { scheme: e2, authority: r2, path: n2, query: i2, fragment: o2 } = t3;
        return void 0 === e2 ? e2 = this.scheme : null === e2 && (e2 = c), void 0 === r2 ? r2 = this.authority : null === r2 && (r2 = c), void 0 === n2 ? n2 = this.path : null === n2 && (n2 = c), void 0 === i2 ? i2 = this.query : null === i2 && (i2 = c), void 0 === o2 ? o2 = this.fragment : null === o2 && (o2 = c), e2 === this.scheme && r2 === this.authority && n2 === this.path && i2 === this.query && o2 === this.fragment ? this : new d(e2, r2, n2, i2, o2);
      }
      static parse(t3, e2 = false) {
        const r2 = u.exec(t3);
        return r2 ? new d(r2[2] || c, w(r2[4] || c), w(r2[5] || c), w(r2[7] || c), w(r2[9] || c), e2) : new d(c, c, c, c, c);
      }
      static file(t3) {
        let e2 = c;
        if (i && (t3 = t3.replace(/\\/g, f2)), t3[0] === f2 && t3[1] === f2) {
          const r2 = t3.indexOf(f2, 2);
          -1 === r2 ? (e2 = t3.substring(2), t3 = f2) : (e2 = t3.substring(2, r2), t3 = t3.substring(r2) || f2);
        }
        return new d("file", e2, t3, c, c);
      }
      static from(t3) {
        const e2 = new d(t3.scheme, t3.authority, t3.path, t3.query, t3.fragment);
        return a2(e2, true), e2;
      }
      toString(t3 = false) {
        return b(this, t3);
      }
      toJSON() {
        return this;
      }
      static revive(t3) {
        if (t3) {
          if (t3 instanceof l) return t3;
          {
            const e2 = new d(t3);
            return e2._formatted = t3.external, e2._fsPath = t3._sep === g ? t3.fsPath : null, e2;
          }
        }
        return t3;
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
      toString(t3 = false) {
        return t3 ? b(this, true) : (this._formatted || (this._formatted = b(this, false)), this._formatted);
      }
      toJSON() {
        const t3 = { $mid: 1 };
        return this._fsPath && (t3.fsPath = this._fsPath, t3._sep = g), this._formatted && (t3.external = this._formatted), this.path && (t3.path = this.path), this.scheme && (t3.scheme = this.scheme), this.authority && (t3.authority = this.authority), this.query && (t3.query = this.query), this.fragment && (t3.fragment = this.fragment), t3;
      }
    }
    const p = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function m(t3, e2, r2) {
      let n2, i2 = -1;
      for (let o2 = 0; o2 < t3.length; o2++) {
        const s2 = t3.charCodeAt(o2);
        if (s2 >= 97 && s2 <= 122 || s2 >= 65 && s2 <= 90 || s2 >= 48 && s2 <= 57 || 45 === s2 || 46 === s2 || 95 === s2 || 126 === s2 || e2 && 47 === s2 || r2 && 91 === s2 || r2 && 93 === s2 || r2 && 58 === s2) -1 !== i2 && (n2 += encodeURIComponent(t3.substring(i2, o2)), i2 = -1), void 0 !== n2 && (n2 += t3.charAt(o2));
        else {
          void 0 === n2 && (n2 = t3.substr(0, o2));
          const e3 = p[s2];
          void 0 !== e3 ? (-1 !== i2 && (n2 += encodeURIComponent(t3.substring(i2, o2)), i2 = -1), n2 += e3) : -1 === i2 && (i2 = o2);
        }
      }
      return -1 !== i2 && (n2 += encodeURIComponent(t3.substring(i2))), void 0 !== n2 ? n2 : t3;
    }
    function y(t3) {
      let e2;
      for (let r2 = 0; r2 < t3.length; r2++) {
        const n2 = t3.charCodeAt(r2);
        35 === n2 || 63 === n2 ? (void 0 === e2 && (e2 = t3.substr(0, r2)), e2 += p[n2]) : void 0 !== e2 && (e2 += t3[r2]);
      }
      return void 0 !== e2 ? e2 : t3;
    }
    function v(t3, e2) {
      let r2;
      return r2 = t3.authority && t3.path.length > 1 && "file" === t3.scheme ? `//${t3.authority}${t3.path}` : 47 === t3.path.charCodeAt(0) && (t3.path.charCodeAt(1) >= 65 && t3.path.charCodeAt(1) <= 90 || t3.path.charCodeAt(1) >= 97 && t3.path.charCodeAt(1) <= 122) && 58 === t3.path.charCodeAt(2) ? t3.path[1].toLowerCase() + t3.path.substr(2) : t3.path, i && (r2 = r2.replace(/\//g, "\\")), r2;
    }
    function b(t3, e2) {
      const r2 = e2 ? y : m;
      let n2 = "", { scheme: i2, authority: o2, path: s2, query: h2, fragment: a3 } = t3;
      if (i2 && (n2 += i2, n2 += ":"), (o2 || "file" === i2) && (n2 += f2, n2 += f2), o2) {
        let t4 = o2.indexOf("@");
        if (-1 !== t4) {
          const e3 = o2.substr(0, t4);
          o2 = o2.substr(t4 + 1), t4 = e3.lastIndexOf(":"), -1 === t4 ? n2 += r2(e3, false, false) : (n2 += r2(e3.substr(0, t4), false, false), n2 += ":", n2 += r2(e3.substr(t4 + 1), false, true)), n2 += "@";
        }
        o2 = o2.toLowerCase(), t4 = o2.lastIndexOf(":"), -1 === t4 ? n2 += r2(o2, false, true) : (n2 += r2(o2.substr(0, t4), false, true), n2 += o2.substr(t4));
      }
      if (s2) {
        if (s2.length >= 3 && 47 === s2.charCodeAt(0) && 58 === s2.charCodeAt(2)) {
          const t4 = s2.charCodeAt(1);
          t4 >= 65 && t4 <= 90 && (s2 = `/${String.fromCharCode(t4 + 32)}:${s2.substr(3)}`);
        } else if (s2.length >= 2 && 58 === s2.charCodeAt(1)) {
          const t4 = s2.charCodeAt(0);
          t4 >= 65 && t4 <= 90 && (s2 = `${String.fromCharCode(t4 + 32)}:${s2.substr(2)}`);
        }
        n2 += r2(s2, true, false);
      }
      return h2 && (n2 += "?", n2 += r2(h2, false, false)), a3 && (n2 += "#", n2 += e2 ? a3 : m(a3, false, false)), n2;
    }
    function C(t3) {
      try {
        return decodeURIComponent(t3);
      } catch {
        return t3.length > 3 ? t3.substr(0, 3) + C(t3.substr(3)) : t3;
      }
    }
    const A2 = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function w(t3) {
      return t3.match(A2) ? t3.replace(A2, ((t4) => C(t4))) : t3;
    }
    var x = r(975);
    const P = x.posix || x, _ = "/";
    var I;
    !(function(t3) {
      t3.joinPath = function(t4, ...e2) {
        return t4.with({ path: P.join(t4.path, ...e2) });
      }, t3.resolvePath = function(t4, ...e2) {
        let r2 = t4.path, n2 = false;
        r2[0] !== _ && (r2 = _ + r2, n2 = true);
        let i2 = P.resolve(r2, ...e2);
        return n2 && i2[0] === _ && !t4.authority && (i2 = i2.substring(1)), t4.with({ path: i2 });
      }, t3.dirname = function(t4) {
        if (0 === t4.path.length || t4.path === _) return t4;
        let e2 = P.dirname(t4.path);
        return 1 === e2.length && 46 === e2.charCodeAt(0) && (e2 = ""), t4.with({ path: e2 });
      }, t3.basename = function(t4) {
        return P.basename(t4.path);
      }, t3.extname = function(t4) {
        return P.extname(t4.path);
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
    const mergedObjects = { ...obj2, ...obj1 };
    for (const key of Object.keys(mergedObjects)) {
      if (obj1[key] && obj2[key]) {
        if (Array.isArray(obj1[key])) {
          mergedObjects[key] = obj1[key].concat(obj2[key]);
        } else if (Array.isArray(obj2[key])) {
          mergedObjects[key] = obj2[key].concat(obj1[key]);
        } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
        }
      }
    }
    return mergedObjects;
  }
  function excludeUndefinedValues(obj) {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== void 0);
    return Object.fromEntries(filteredEntries);
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
        const start = this.offsetAt(range.start);
        const end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    }
    update(changes, version) {
      for (const change of changes) {
        if (FullTextDocument.isIncremental(change)) {
          const range = getWellformedRange(change.range);
          const startOffset = this.offsetAt(range.start);
          const endOffset = this.offsetAt(range.end);
          this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
          const startLine = Math.max(range.start.line, 0);
          const endLine = Math.max(range.end.line, 0);
          let lineOffsets = this._lineOffsets;
          const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
          if (endLine - startLine === addedLineOffsets.length) {
            for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
              lineOffsets[i + startLine + 1] = addedLineOffsets[i];
            }
          } else {
            if (addedLineOffsets.length < 1e4) {
              lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
            } else {
              this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
            }
          }
          const diff = change.text.length - (endOffset - startOffset);
          if (diff !== 0) {
            for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
              lineOffsets[i] = lineOffsets[i] + diff;
            }
          }
        } else if (FullTextDocument.isFull(change)) {
          this._content = change.text;
          this._lineOffsets = void 0;
        } else {
          throw new Error("Unknown change event received");
        }
      }
      this._version = version;
    }
    getLineOffsets() {
      if (this._lineOffsets === void 0) {
        this._lineOffsets = computeLineOffsets(this._content, true);
      }
      return this._lineOffsets;
    }
    positionAt(offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      const lineOffsets = this.getLineOffsets();
      let low = 0, high = lineOffsets.length;
      if (high === 0) {
        return { line: 0, character: offset };
      }
      while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      const line = low - 1;
      offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
      return { line, character: offset - lineOffsets[line] };
    }
    offsetAt(position) {
      const lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      const lineOffset = lineOffsets[position.line];
      if (position.character <= 0) {
        return lineOffset;
      }
      const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      const offset = Math.min(lineOffset + position.character, nextLineOffset);
      return this.ensureBeforeEOL(offset, lineOffset);
    }
    ensureBeforeEOL(offset, lineOffset) {
      while (offset > lineOffset && isEOL$1(this._content.charCodeAt(offset - 1))) {
        offset--;
      }
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
  }
  var TextDocument;
  (function(TextDocument2) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument2.create = create;
    function update(document, changes, version) {
      if (document instanceof FullTextDocument) {
        document.update(changes, version);
        return document;
      } else {
        throw new Error("TextDocument.update: document must be created by TextDocument.create");
      }
    }
    TextDocument2.update = update;
    function applyEdits(document, edits) {
      const text = document.getText();
      const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a2, b) => {
        const diff = a2.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a2.range.start.character - b.range.start.character;
        }
        return diff;
      });
      let lastModifiedOffset = 0;
      const spans = [];
      for (const e of sortedEdits) {
        const startOffset = document.offsetAt(e.range.start);
        if (startOffset < lastModifiedOffset) {
          throw new Error("Overlapping edit");
        } else if (startOffset > lastModifiedOffset) {
          spans.push(text.substring(lastModifiedOffset, startOffset));
        }
        if (e.newText.length) {
          spans.push(e.newText);
        }
        lastModifiedOffset = document.offsetAt(e.range.end);
      }
      spans.push(text.substr(lastModifiedOffset));
      return spans.join("");
    }
    TextDocument2.applyEdits = applyEdits;
  })(TextDocument || (TextDocument = {}));
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
      const ret = compare(left[leftIdx], right[rightIdx]);
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
  function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
    const result = isAtLineStart ? [textOffset] : [];
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      if (isEOL$1(ch)) {
        if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
          i++;
        }
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
    if (start.line > end.line || start.line === end.line && start.character > end.character) {
      return { start: end, end: start };
    }
    return range;
  }
  function getWellformedEdit(textEdit) {
    const range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
      return { newText: textEdit.newText, range };
    }
    return textEdit;
  }
  class BaseService {
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
            tagSupport: {
              valueSet: [mainExports.DiagnosticTag.Unnecessary, mainExports.DiagnosticTag.Deprecated]
            }
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
          formatting: {
            dynamicRegistration: true
          },
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
          documentHighlight: {
            dynamicRegistration: true
          },
          semanticTokens: {
            dynamicRegistration: true,
            multilineTokenSupport: false,
            overlappingTokenSupport: false,
            tokenTypes: [],
            tokenModifiers: [],
            formats: ["relative"],
            requests: {
              full: {
                delta: false
              },
              range: true
            },
            augmentsSyntaxTokens: true
          },
          codeAction: {
            dynamicRegistration: true
          },
          inlineCompletion: {
            dynamicRegistration: true
          }
        },
        window: {
          showDocument: {
            support: true
          }
        },
        workspace: {
          didChangeConfiguration: {
            dynamicRegistration: false
          },
          executeCommand: {
            dynamicRegistration: true
          },
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
        module: () => {
        }
      };
    }
    addDocument(document) {
      this.documents[document.uri] = TextDocument.create(
        document.uri,
        document.languageId,
        document.version,
        document.text
      );
    }
    getDocument(uri) {
      return this.documents[uri];
    }
    removeDocument(document) {
      delete this.documents[document.uri];
      if (this.options[document.uri]) {
        delete this.options[document.uri];
      }
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
      var _a;
      return (_a = this.getDocument(uri)) == null ? void 0 : _a.getText();
    }
    setValue(identifier, value) {
      let document = this.getDocument(identifier.uri);
      if (document) {
        document = TextDocument.create(document.uri, document.languageId, document.version, value);
        this.documents[document.uri] = document;
      }
    }
    setGlobalOptions(options) {
      this.globalOptions = options != null ? options : {};
    }
    setWorkspace(workspaceUri) {
      this.workspaceUri = workspaceUri;
    }
    setOptions(documentUri, options, merge = false) {
      this.options[documentUri] = merge ? mergeObjects(options, this.options[documentUri]) : options;
    }
    getOption(documentUri, optionName) {
      if (this.options[documentUri] && this.options[documentUri][optionName]) {
        return this.options[documentUri][optionName];
      } else {
        return this.globalOptions[optionName];
      }
    }
    applyDeltas(identifier, deltas) {
      let document = this.getDocument(identifier.uri);
      if (document)
        TextDocument.update(document, deltas, identifier.version);
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
      var _a, _b, _c, _d, _e, _f;
      return {
        errorCodesToIgnore: (_a = this.globalOptions.errorCodesToIgnore) != null ? _a : [],
        errorCodesToTreatAsWarning: (_b = this.globalOptions.errorCodesToTreatAsWarning) != null ? _b : [],
        errorCodesToTreatAsInfo: (_c = this.globalOptions.errorCodesToTreatAsInfo) != null ? _c : [],
        errorMessagesToIgnore: (_d = this.globalOptions.errorMessagesToIgnore) != null ? _d : [],
        errorMessagesToTreatAsWarning: (_e = this.globalOptions.errorMessagesToTreatAsWarning) != null ? _e : [],
        errorMessagesToTreatAsInfo: (_f = this.globalOptions.errorMessagesToTreatAsInfo) != null ? _f : []
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
    sendAppliedResult(result, callbackId) {
    }
    sendRequest(name, args) {
      return Promise.resolve(null);
    }
    sendResponse(callbackId, args) {
      return;
    }
  }
  function createScanner$1(text, ignoreTrivia = false) {
    const len = text.length;
    let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
    function scanHexDigits(count, exact) {
      let digits = 0;
      let value2 = 0;
      while (digits < count || false) {
        let ch = text.charCodeAt(pos);
        if (ch >= 48 && ch <= 57) {
          value2 = value2 * 16 + ch - 48;
        } else if (ch >= 65 && ch <= 70) {
          value2 = value2 * 16 + ch - 65 + 10;
        } else if (ch >= 97 && ch <= 102) {
          value2 = value2 * 16 + ch - 97 + 10;
        } else {
          break;
        }
        pos++;
        digits++;
      }
      if (digits < count) {
        value2 = -1;
      }
      return value2;
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
      if (text.charCodeAt(pos) === 48) {
        pos++;
      } else {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      }
      if (pos < text.length && text.charCodeAt(pos) === 46) {
        pos++;
        if (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
          while (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
          }
        } else {
          scanError = 3;
          return text.substring(start, pos);
        }
      }
      let end = pos;
      if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
        pos++;
        if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
          pos++;
        }
        if (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
          while (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
          }
          end = pos;
        } else {
          scanError = 3;
        }
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
          const ch2 = text.charCodeAt(pos++);
          switch (ch2) {
            case 34:
              result += '"';
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
              const ch3 = scanHexDigits(4);
              if (ch3 >= 0) {
                result += String.fromCharCode(ch3);
              } else {
                scanError = 4;
              }
              break;
            default:
              scanError = 5;
          }
          start = pos;
          continue;
        }
        if (ch >= 0 && ch <= 31) {
          if (isLineBreak(ch)) {
            result += text.substring(start, pos);
            scanError = 2;
            break;
          } else {
            scanError = 6;
          }
        }
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
        // tokens: []{}:,
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
        // strings
        case 34:
          pos++;
          value = scanString();
          return token = 10;
        // comments
        case 47:
          const start = pos - 1;
          if (text.charCodeAt(pos + 1) === 47) {
            pos += 2;
            while (pos < len) {
              if (isLineBreak(text.charCodeAt(pos))) {
                break;
              }
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
                if (ch === 13 && text.charCodeAt(pos) === 10) {
                  pos++;
                }
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
        // numbers
        case 45:
          value += String.fromCharCode(code);
          pos++;
          if (pos === len || !isDigit(text.charCodeAt(pos))) {
            return token = 16;
          }
        // found a minus, followed by a number so
        // we fall through to proceed with scanning
        // numbers
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
        // literals and unknown symbols
        default:
          while (pos < len && isUnknownContentCharacter(code)) {
            pos++;
            code = text.charCodeAt(pos);
          }
          if (tokenOffset !== pos) {
            value = text.substring(tokenOffset, pos);
            switch (value) {
              case "true":
                return token = 8;
              case "false":
                return token = 9;
              case "null":
                return token = 7;
            }
            return token = 16;
          }
          value += String.fromCharCode(code);
          pos++;
          return token = 16;
      }
    }
    function isUnknownContentCharacter(code) {
      if (isWhiteSpace(code) || isLineBreak(code)) {
        return false;
      }
      switch (code) {
        case 125:
        case 93:
        case 123:
        case 91:
        case 34:
        case 58:
        case 44:
        case 47:
          return false;
      }
      return true;
    }
    function scanNextNonTrivia() {
      let result;
      do {
        result = scanNext();
      } while (result >= 12 && result <= 15);
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
  (function(CharacterCodes2) {
    CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
    CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
    CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
    CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
    CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
    CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
    CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
    CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
    CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
    CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
    CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
    CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
    CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
    CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
    CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
    CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
    CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
    CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
    CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
    CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
    CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
    CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
    CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
    CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
    CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
    CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
    CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
    CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
    CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
    CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
    CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
    CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
    CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
    CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
    CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
    CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
    CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
    CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
    CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
    CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
    CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
    CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
    CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
    CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
    CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
    CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
    CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
    CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
    CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
    CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
    CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
    CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
    CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
    CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
    CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
    CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
    CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
    CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
    CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
    CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
    CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
    CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
    CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
    CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
    CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
    CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
    CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
    CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
    CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
    CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
    CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
    CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
    CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
    CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
    CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
    CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
    CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
    CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
    CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
    CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
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
  const supportedEols = ["\n", "\r", "\r\n"];
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
      while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
        formatTextStart--;
      }
      let endOffset = rangeEnd;
      while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
        endOffset++;
      }
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
    if (options.insertSpaces) {
      indentValue = cachedSpaces[options.tabSize || 4] ?? repeat(cachedSpaces[1], options.tabSize || 4);
    } else {
      indentValue = "	";
    }
    const indentType = indentValue === "	" ? "	" : " ";
    let scanner = createScanner$1(formatText, false);
    let hasError = false;
    function newLinesAndIndent() {
      if (numberLineBreaks > 1) {
        return repeat(eol, numberLineBreaks) + repeat(indentValue, initialIndentLevel + indentLevel);
      }
      const amountOfSpaces = indentValue.length * (initialIndentLevel + indentLevel);
      if (!eolFastPathSupported || amountOfSpaces > cachedBreakLinesWithSpaces[indentType][eol].length) {
        return eol + repeat(indentValue, initialIndentLevel + indentLevel);
      }
      if (amountOfSpaces <= 0) {
        return eol;
      }
      return cachedBreakLinesWithSpaces[indentType][eol][amountOfSpaces];
    }
    function scanNext() {
      let token = scanner.scan();
      numberLineBreaks = 0;
      while (token === 15 || token === 14) {
        if (token === 14 && options.keepLines) {
          numberLineBreaks += 1;
        } else if (token === 14) {
          numberLineBreaks = 1;
        }
        token = scanner.scan();
      }
      hasError = token === 16 || scanner.getTokenError() !== 0;
      return token;
    }
    const editOperations = [];
    function addEdit(text, startOffset, endOffset) {
      if (!hasError && (!range || startOffset < rangeEnd && endOffset > rangeStart) && documentText.substring(startOffset, endOffset) !== text) {
        editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
      }
    }
    let firstToken = scanNext();
    if (options.keepLines && numberLineBreaks > 0) {
      addEdit(repeat(eol, numberLineBreaks), 0, 0);
    }
    if (firstToken !== 17) {
      let firstTokenStart = scanner.getTokenOffset() + formatTextStart;
      let initialIndent = indentValue.length * initialIndentLevel < 20 && options.insertSpaces ? cachedSpaces[indentValue.length * initialIndentLevel] : repeat(indentValue, initialIndentLevel);
      addEdit(initialIndent, formatTextStart, firstTokenStart);
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
        if (firstToken !== 1) {
          indentLevel--;
        }
        if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 1) {
          replaceContent = newLinesAndIndent();
        } else if (options.keepLines) {
          replaceContent = cachedSpaces[1];
        }
      } else if (secondToken === 4) {
        if (firstToken !== 3) {
          indentLevel--;
        }
        if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 3) {
          replaceContent = newLinesAndIndent();
        } else if (options.keepLines) {
          replaceContent = cachedSpaces[1];
        }
      } else {
        switch (firstToken) {
          case 3:
          case 1:
            indentLevel++;
            if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) {
              replaceContent = newLinesAndIndent();
            } else {
              replaceContent = cachedSpaces[1];
            }
            break;
          case 5:
            if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) {
              replaceContent = newLinesAndIndent();
            } else {
              replaceContent = cachedSpaces[1];
            }
            break;
          case 12:
            replaceContent = newLinesAndIndent();
            break;
          case 13:
            if (numberLineBreaks > 0) {
              replaceContent = newLinesAndIndent();
            } else if (!needsLineBreak) {
              replaceContent = cachedSpaces[1];
            }
            break;
          case 6:
            if (options.keepLines && numberLineBreaks > 0) {
              replaceContent = newLinesAndIndent();
            } else if (!needsLineBreak) {
              replaceContent = cachedSpaces[1];
            }
            break;
          case 10:
            if (options.keepLines && numberLineBreaks > 0) {
              replaceContent = newLinesAndIndent();
            } else if (secondToken === 6 && !needsLineBreak) {
              replaceContent = "";
            }
            break;
          case 7:
          case 8:
          case 9:
          case 11:
          case 2:
          case 4:
            if (options.keepLines && numberLineBreaks > 0) {
              replaceContent = newLinesAndIndent();
            } else {
              if ((secondToken === 12 || secondToken === 13) && !needsLineBreak) {
                replaceContent = cachedSpaces[1];
              } else if (secondToken !== 5 && secondToken !== 17) {
                hasError = true;
              }
            }
            break;
          case 16:
            hasError = true;
            break;
        }
        if (numberLineBreaks > 0 && (secondToken === 12 || secondToken === 13)) {
          replaceContent = newLinesAndIndent();
        }
      }
      if (secondToken === 17) {
        if (options.keepLines && numberLineBreaks > 0) {
          replaceContent = newLinesAndIndent();
        } else {
          replaceContent = options.insertFinalNewline ? eol : "";
        }
      }
      const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(replaceContent, firstTokenEnd, secondTokenStart);
      firstToken = secondToken;
    }
    return editOperations;
  }
  function repeat(s, count) {
    let result = "";
    for (let i = 0; i < count; i++) {
      result += s;
    }
    return result;
  }
  function computeIndentLevel(content, options) {
    let i = 0;
    let nChars = 0;
    const tabSize = options.tabSize || 4;
    while (i < content.length) {
      let ch = content.charAt(i);
      if (ch === cachedSpaces[1]) {
        nChars++;
      } else if (ch === "	") {
        nChars += tabSize;
      } else {
        break;
      }
      i++;
    }
    return Math.floor(nChars / tabSize);
  }
  function getEOL(options, text) {
    for (let i = 0; i < text.length; i++) {
      const ch = text.charAt(i);
      if (ch === "\r") {
        if (i + 1 < text.length && text.charAt(i + 1) === "\n") {
          return "\r\n";
        }
        return "\r";
      } else if (ch === "\n") {
        return "\n";
      }
    }
    return options && options.eol || "\n";
  }
  function isEOL(text, offset) {
    return "\r\n".indexOf(text.charAt(offset)) !== -1;
  }
  var ParseOptions;
  (function(ParseOptions2) {
    ParseOptions2.DEFAULT = {
      allowTrailingComma: false
    };
  })(ParseOptions || (ParseOptions = {}));
  function parse$2(text, errors = [], options = ParseOptions.DEFAULT) {
    let currentProperty = null;
    let currentParent = [];
    const previousParents = [];
    function onValue(value) {
      if (Array.isArray(currentParent)) {
        currentParent.push(value);
      } else if (currentProperty !== null) {
        currentParent[currentProperty] = value;
      }
    }
    const visitor = {
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
        const array = [];
        onValue(array);
        previousParents.push(currentParent);
        currentParent = array;
        currentProperty = null;
      },
      onArrayEnd: () => {
        currentParent = previousParents.pop();
      },
      onLiteralValue: onValue,
      onError: (error, offset, length) => {
        errors.push({ error, offset, length });
      }
    };
    visit(text, visitor, options);
    return currentParent[0];
  }
  function getNodePath$2(node) {
    if (!node.parent || !node.parent.children) {
      return [];
    }
    const path = getNodePath$2(node.parent);
    if (node.parent.type === "property") {
      const key = node.parent.children[0].value;
      path.push(key);
    } else if (node.parent.type === "array") {
      const index = node.parent.children.indexOf(node);
      if (index !== -1) {
        path.push(index);
      }
    }
    return path;
  }
  function getNodeValue$2(node) {
    switch (node.type) {
      case "array":
        return node.children.map(getNodeValue$2);
      case "object":
        const obj = /* @__PURE__ */ Object.create(null);
        for (let prop of node.children) {
          const valueNode = prop.children[1];
          if (valueNode) {
            obj[prop.children[0].value] = getNodeValue$2(valueNode);
          }
        }
        return obj;
      case "null":
      case "string":
      case "number":
      case "boolean":
        return node.value;
      default:
        return void 0;
    }
  }
  function contains$1(node, offset, includeRightBound = false) {
    return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
  }
  function findNodeAtOffset$1(node, offset, includeRightBound = false) {
    if (contains$1(node, offset, includeRightBound)) {
      const children = node.children;
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
          const item = findNodeAtOffset$1(children[i], offset, includeRightBound);
          if (item) {
            return item;
          }
        }
      }
      return node;
    }
    return void 0;
  }
  function visit(text, visitor, options = ParseOptions.DEFAULT) {
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
        if (suppressedCallbacks > 0) {
          suppressedCallbacks++;
        } else {
          let cbReturn = visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice());
          if (cbReturn === false) {
            suppressedCallbacks = 1;
          }
        }
      } : () => true;
    }
    function toEndVisit(visitFunction) {
      return visitFunction ? () => {
        if (suppressedCallbacks > 0) {
          suppressedCallbacks--;
        }
        if (suppressedCallbacks === 0) {
          visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
        }
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
            handleError(
              14
              /* ParseErrorCode.InvalidUnicode */
            );
            break;
          case 5:
            handleError(
              15
              /* ParseErrorCode.InvalidEscapeCharacter */
            );
            break;
          case 3:
            handleError(
              13
              /* ParseErrorCode.UnexpectedEndOfNumber */
            );
            break;
          case 1:
            if (!disallowComments) {
              handleError(
                11
                /* ParseErrorCode.UnexpectedEndOfComment */
              );
            }
            break;
          case 2:
            handleError(
              12
              /* ParseErrorCode.UnexpectedEndOfString */
            );
            break;
          case 6:
            handleError(
              16
              /* ParseErrorCode.InvalidCharacter */
            );
            break;
        }
        switch (token) {
          case 12:
          case 13:
            if (disallowComments) {
              handleError(
                10
                /* ParseErrorCode.InvalidCommentToken */
              );
            } else {
              onComment();
            }
            break;
          case 16:
            handleError(
              1
              /* ParseErrorCode.InvalidSymbol */
            );
            break;
          case 15:
          case 14:
            break;
          default:
            return token;
        }
      }
    }
    function handleError(error, skipUntilAfter = [], skipUntil = []) {
      onError(error);
      if (skipUntilAfter.length + skipUntil.length > 0) {
        let token = _scanner.getToken();
        while (token !== 17) {
          if (skipUntilAfter.indexOf(token) !== -1) {
            scanNext();
            break;
          } else if (skipUntil.indexOf(token) !== -1) {
            break;
          }
          token = scanNext();
        }
      }
    }
    function parseString(isValue) {
      const value = _scanner.getTokenValue();
      if (isValue) {
        onLiteralValue(value);
      } else {
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
            handleError(
              2
              /* ParseErrorCode.InvalidNumberFormat */
            );
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
        default:
          return false;
      }
      scanNext();
      return true;
    }
    function parseProperty() {
      if (_scanner.getToken() !== 10) {
        handleError(3, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
        return false;
      }
      parseString(false);
      if (_scanner.getToken() === 6) {
        onSeparator(":");
        scanNext();
        if (!parseValue()) {
          handleError(4, [], [
            2,
            5
            /* SyntaxKind.CommaToken */
          ]);
        }
      } else {
        handleError(5, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      _jsonPath.pop();
      return true;
    }
    function parseObject() {
      onObjectBegin();
      scanNext();
      let needsComma = false;
      while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
        if (_scanner.getToken() === 5) {
          if (!needsComma) {
            handleError(4, [], []);
          }
          onSeparator(",");
          scanNext();
          if (_scanner.getToken() === 2 && allowTrailingComma) {
            break;
          }
        } else if (needsComma) {
          handleError(6, [], []);
        }
        if (!parseProperty()) {
          handleError(4, [], [
            2,
            5
            /* SyntaxKind.CommaToken */
          ]);
        }
        needsComma = true;
      }
      onObjectEnd();
      if (_scanner.getToken() !== 2) {
        handleError(7, [
          2
          /* SyntaxKind.CloseBraceToken */
        ], []);
      } else {
        scanNext();
      }
      return true;
    }
    function parseArray() {
      onArrayBegin();
      scanNext();
      let isFirstElement = true;
      let needsComma = false;
      while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
        if (_scanner.getToken() === 5) {
          if (!needsComma) {
            handleError(4, [], []);
          }
          onSeparator(",");
          scanNext();
          if (_scanner.getToken() === 4 && allowTrailingComma) {
            break;
          }
        } else if (needsComma) {
          handleError(6, [], []);
        }
        if (isFirstElement) {
          _jsonPath.push(0);
          isFirstElement = false;
        } else {
          _jsonPath[_jsonPath.length - 1]++;
        }
        if (!parseValue()) {
          handleError(4, [], [
            4,
            5
            /* SyntaxKind.CommaToken */
          ]);
        }
        needsComma = true;
      }
      onArrayEnd();
      if (!isFirstElement) {
        _jsonPath.pop();
      }
      if (_scanner.getToken() !== 4) {
        handleError(8, [
          4
          /* SyntaxKind.CloseBracketToken */
        ], []);
      } else {
        scanNext();
      }
      return true;
    }
    function parseValue() {
      switch (_scanner.getToken()) {
        case 3:
          return parseArray();
        case 1:
          return parseObject();
        case 10:
          return parseString(true);
        default:
          return parseLiteral();
      }
    }
    scanNext();
    if (_scanner.getToken() === 17) {
      if (options.allowEmptyContent) {
        return true;
      }
      handleError(4, [], []);
      return false;
    }
    if (!parseValue()) {
      handleError(4, [], []);
      return false;
    }
    if (_scanner.getToken() !== 17) {
      handleError(9, [], []);
    }
    return true;
  }
  const createScanner = createScanner$1;
  var ScanError;
  (function(ScanError2) {
    ScanError2[ScanError2["None"] = 0] = "None";
    ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
    ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
    ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
    ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
    ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
    ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
  })(ScanError || (ScanError = {}));
  var SyntaxKind;
  (function(SyntaxKind2) {
    SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
    SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
    SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
    SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
    SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
    SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
    SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
    SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
    SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
    SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
    SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
    SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
    SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
    SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
    SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
    SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
    SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
  })(SyntaxKind || (SyntaxKind = {}));
  const parse$1 = parse$2;
  const findNodeAtOffset = findNodeAtOffset$1;
  const getNodePath$1 = getNodePath$2;
  const getNodeValue$1 = getNodeValue$2;
  var ParseErrorCode;
  (function(ParseErrorCode2) {
    ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
    ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
    ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
    ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
    ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
    ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
    ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
    ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
    ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
    ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
    ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
    ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
    ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
    ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
    ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
    ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
  })(ParseErrorCode || (ParseErrorCode = {}));
  function format$2(documentText, range, options) {
    return format$3(documentText, range, options);
  }
  function equals(one, other) {
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
    if (Array.isArray(one) !== Array.isArray(other)) {
      return false;
    }
    let i, key;
    if (Array.isArray(one)) {
      if (one.length !== other.length) {
        return false;
      }
      for (i = 0; i < one.length; i++) {
        if (!equals(one[i], other[i])) {
          return false;
        }
      }
    } else {
      const oneKeys = [];
      for (key in one) {
        oneKeys.push(key);
      }
      oneKeys.sort();
      const otherKeys = [];
      for (key in other) {
        otherKeys.push(key);
      }
      otherKeys.sort();
      if (!equals(oneKeys, otherKeys)) {
        return false;
      }
      for (i = 0; i < oneKeys.length; i++) {
        if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
          return false;
        }
      }
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
    if (haystack.length < needle.length) {
      return false;
    }
    for (let i = 0; i < needle.length; i++) {
      if (haystack[i] !== needle[i]) {
        return false;
      }
    }
    return true;
  }
  function endsWith(haystack, needle) {
    const diff = haystack.length - needle.length;
    if (diff > 0) {
      return haystack.lastIndexOf(needle) === diff;
    } else if (diff === 0) {
      return haystack === needle;
    } else {
      return false;
    }
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
      } catch (e2) {
        return void 0;
      }
    }
  }
  function stringLength(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      count++;
      const code = str.charCodeAt(i);
      if (55296 <= code && code <= 56319) {
        i++;
      }
    }
    return count;
  }
  var ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2[ErrorCode2["Undefined"] = 0] = "Undefined";
    ErrorCode2[ErrorCode2["EnumValueMismatch"] = 1] = "EnumValueMismatch";
    ErrorCode2[ErrorCode2["Deprecated"] = 2] = "Deprecated";
    ErrorCode2[ErrorCode2["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
    ErrorCode2[ErrorCode2["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
    ErrorCode2[ErrorCode2["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
    ErrorCode2[ErrorCode2["InvalidUnicode"] = 260] = "InvalidUnicode";
    ErrorCode2[ErrorCode2["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
    ErrorCode2[ErrorCode2["InvalidCharacter"] = 262] = "InvalidCharacter";
    ErrorCode2[ErrorCode2["PropertyExpected"] = 513] = "PropertyExpected";
    ErrorCode2[ErrorCode2["CommaExpected"] = 514] = "CommaExpected";
    ErrorCode2[ErrorCode2["ColonExpected"] = 515] = "ColonExpected";
    ErrorCode2[ErrorCode2["ValueExpected"] = 516] = "ValueExpected";
    ErrorCode2[ErrorCode2["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
    ErrorCode2[ErrorCode2["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
    ErrorCode2[ErrorCode2["TrailingComma"] = 519] = "TrailingComma";
    ErrorCode2[ErrorCode2["DuplicateKey"] = 520] = "DuplicateKey";
    ErrorCode2[ErrorCode2["CommentNotPermitted"] = 521] = "CommentNotPermitted";
    ErrorCode2[ErrorCode2["PropertyKeysMustBeDoublequoted"] = 528] = "PropertyKeysMustBeDoublequoted";
    ErrorCode2[ErrorCode2["SchemaResolveError"] = 768] = "SchemaResolveError";
    ErrorCode2[ErrorCode2["SchemaUnsupportedFeature"] = 769] = "SchemaUnsupportedFeature";
  })(ErrorCode || (ErrorCode = {}));
  var SchemaDraft;
  (function(SchemaDraft2) {
    SchemaDraft2[SchemaDraft2["v3"] = 3] = "v3";
    SchemaDraft2[SchemaDraft2["v4"] = 4] = "v4";
    SchemaDraft2[SchemaDraft2["v6"] = 6] = "v6";
    SchemaDraft2[SchemaDraft2["v7"] = 7] = "v7";
    SchemaDraft2[SchemaDraft2["v2019_09"] = 19] = "v2019_09";
    SchemaDraft2[SchemaDraft2["v2020_12"] = 20] = "v2020_12";
  })(SchemaDraft || (SchemaDraft = {}));
  var ClientCapabilities;
  (function(ClientCapabilities2) {
    ClientCapabilities2.LATEST = {
      textDocument: {
        completion: {
          completionItem: {
            documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
            commitCharactersSupport: true,
            labelDetailsSupport: true
          }
        }
      }
    };
  })(ClientCapabilities || (ClientCapabilities = {}));
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
      if (firstArg.length !== replacements.length + 1) {
        throw new Error("expected a string as the first argument to l10n.t");
      }
      let str = firstArg[0];
      for (let i = 1; i < firstArg.length; i++) {
        str += `{${i - 1}}` + firstArg[i];
      }
      return t(str, ...replacements);
    } else {
      message = firstArg.message;
      key = message;
      if (firstArg.comment && firstArg.comment.length > 0) {
        key += `/${Array.isArray(firstArg.comment) ? firstArg.comment.join("") : firstArg.comment}`;
      }
      formatArgs = firstArg.args ?? {};
    }
    {
      return format$1(message, formatArgs);
    }
  }
  var _format2Regexp = /{([^}]+)}/g;
  function format$1(template, values) {
    if (Object.keys(values).length === 0) {
      return template;
    }
    return template.replace(_format2Regexp, (match, group) => values[group] ?? match);
  }
  const formats = {
    "color-hex": { errorMessage: t("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."), pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/ },
    "date-time": { errorMessage: t("String is not a RFC3339 date-time."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
    "date": { errorMessage: t("String is not a RFC3339 date."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i },
    "time": { errorMessage: t("String is not a RFC3339 time."), pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
    "email": { errorMessage: t("String is not an e-mail address."), pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/ },
    "hostname": { errorMessage: t("String is not a hostname."), pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i },
    "ipv4": { errorMessage: t("String is not an IPv4 address."), pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/ },
    "ipv6": { errorMessage: t("String is not an IPv6 address."), pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i }
  };
  class ASTNodeImpl {
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
  }
  class NullASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset) {
      super(parent, offset);
      this.type = "null";
      this.value = null;
    }
  }
  class BooleanASTNodeImpl extends ASTNodeImpl {
    constructor(parent, boolValue, offset) {
      super(parent, offset);
      this.type = "boolean";
      this.value = boolValue;
    }
  }
  class ArrayASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset) {
      super(parent, offset);
      this.type = "array";
      this.items = [];
    }
    get children() {
      return this.items;
    }
  }
  class NumberASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset) {
      super(parent, offset);
      this.type = "number";
      this.isInteger = true;
      this.value = Number.NaN;
    }
  }
  class StringASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset, length) {
      super(parent, offset, length);
      this.type = "string";
      this.value = "";
    }
  }
  class PropertyASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset, keyNode) {
      super(parent, offset);
      this.type = "property";
      this.colonOffset = -1;
      this.keyNode = keyNode;
    }
    get children() {
      return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
    }
  }
  class ObjectASTNodeImpl extends ASTNodeImpl {
    constructor(parent, offset) {
      super(parent, offset);
      this.type = "object";
      this.properties = [];
    }
    get children() {
      return this.properties;
    }
  }
  function asSchema(schema) {
    if (isBoolean(schema)) {
      return schema ? {} : { "not": {} };
    }
    return schema;
  }
  var EnumMatch;
  (function(EnumMatch2) {
    EnumMatch2[EnumMatch2["Key"] = 0] = "Key";
    EnumMatch2[EnumMatch2["Enum"] = 1] = "Enum";
  })(EnumMatch || (EnumMatch = {}));
  const schemaDraftFromId = {
    "http://json-schema.org/draft-03/schema#": SchemaDraft.v3,
    "http://json-schema.org/draft-04/schema#": SchemaDraft.v4,
    "http://json-schema.org/draft-06/schema#": SchemaDraft.v6,
    "http://json-schema.org/draft-07/schema#": SchemaDraft.v7,
    "https://json-schema.org/draft/2019-09/schema": SchemaDraft.v2019_09,
    "https://json-schema.org/draft/2020-12/schema": SchemaDraft.v2020_12
  };
  class EvaluationContext {
    constructor(schemaDraft) {
      this.schemaDraft = schemaDraft;
    }
  }
  class SchemaCollector {
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
  }
  class NoOpSchemaCollector {
    constructor() {
    }
    get schemas() {
      return [];
    }
    add(_schema) {
    }
    merge(_other) {
    }
    include(_node) {
      return true;
    }
    newSub() {
      return this;
    }
  }
  NoOpSchemaCollector.instance = new NoOpSchemaCollector();
  class ValidationResult {
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
      if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
        this.enumValues = this.enumValues.concat(validationResult.enumValues);
      }
    }
    updateEnumMismatchProblemMessages() {
      if (!this.enumValueMatch && this.enumValues) {
        for (const error of this.problems) {
          if (error.code === ErrorCode.EnumValueMismatch) {
            error.message = t("Value is not accepted. Valid values: {0}.", this.enumValues.map((v) => JSON.stringify(v)).join(", "));
          }
        }
      }
    }
    mergePropertyMatch(propertyValidationResult) {
      this.problems = this.problems.concat(propertyValidationResult.problems);
      this.propertiesMatches++;
      if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
        this.propertiesValueMatches++;
      }
      if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
        this.primaryValueMatches++;
      }
    }
    mergeProcessedProperties(validationResult) {
      validationResult.processedProperties.forEach((p) => this.processedProperties.add(p));
    }
    compare(other) {
      const hasProblems = this.hasProblems();
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      return this.propertiesMatches - other.propertiesMatches;
    }
  }
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
  class JSONDocument {
    constructor(root, syntaxErrors = [], comments = []) {
      this.root = root;
      this.syntaxErrors = syntaxErrors;
      this.comments = comments;
    }
    getNodeFromOffset(offset, includeRightBound = false) {
      if (this.root) {
        return findNodeAtOffset(this.root, offset, includeRightBound);
      }
      return void 0;
    }
    visit(visitor) {
      if (this.root) {
        const doVisit = (node) => {
          let ctn = visitor(node);
          const children = node.children;
          if (Array.isArray(children)) {
            for (let i = 0; i < children.length && ctn; i++) {
              ctn = doVisit(children[i]);
            }
          }
          return ctn;
        };
        doVisit(this.root);
      }
    }
    validate(textDocument, schema, severity = DiagnosticSeverity.Warning, schemaDraft) {
      if (this.root && schema) {
        const validationResult = new ValidationResult();
        validate(this.root, schema, validationResult, NoOpSchemaCollector.instance, new EvaluationContext(schemaDraft ?? getSchemaDraft(schema)));
        return validationResult.problems.map((p) => {
          const range = Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
          return Diagnostic.create(range, p.message, p.severity ?? severity, p.code);
        });
      }
      return void 0;
    }
    getMatchingSchemas(schema, focusOffset = -1, exclude) {
      if (this.root && schema) {
        const matchingSchemas = new SchemaCollector(focusOffset, exclude);
        const schemaDraft = getSchemaDraft(schema);
        const context = new EvaluationContext(schemaDraft);
        validate(this.root, schema, new ValidationResult(), matchingSchemas, context);
        return matchingSchemas.schemas;
      }
      return [];
    }
  }
  function getSchemaDraft(schema, fallBack = SchemaDraft.v2020_12) {
    let schemaId = schema.$schema;
    if (schemaId) {
      return schemaDraftFromId[schemaId] ?? fallBack;
    }
    return fallBack;
  }
  function validate(n, schema, validationResult, matchingSchemas, context) {
    if (!n || !matchingSchemas.include(n)) {
      return;
    }
    if (n.type === "property") {
      return validate(n.valueNode, schema, validationResult, matchingSchemas, context);
    }
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
    matchingSchemas.add({ node, schema });
    function _validateNode() {
      var _a;
      function matchesType(type) {
        return node.type === type || type === "integer" && node.type === "number" && node.isInteger;
      }
      if (Array.isArray(schema.type)) {
        if (!schema.type.some(matchesType)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            message: schema.errorMessage || t("Incorrect type. Expected one of {0}.", schema.type.join(", "))
          });
        }
      } else if (schema.type) {
        if (!matchesType(schema.type)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            message: schema.errorMessage || t('Incorrect type. Expected "{0}".', schema.type)
          });
        }
      }
      if (Array.isArray(schema.allOf)) {
        for (const subSchemaRef of schema.allOf) {
          const subValidationResult = new ValidationResult();
          const subMatchingSchemas = matchingSchemas.newSub();
          validate(node, asSchema(subSchemaRef), subValidationResult, subMatchingSchemas, context);
          validationResult.merge(subValidationResult);
          matchingSchemas.merge(subMatchingSchemas);
        }
      }
      const notSchema = asSchema(schema.not);
      if (notSchema) {
        const subValidationResult = new ValidationResult();
        const subMatchingSchemas = matchingSchemas.newSub();
        validate(node, notSchema, subValidationResult, subMatchingSchemas, context);
        if (!subValidationResult.hasProblems()) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            message: schema.errorMessage || t("Matches a schema that is not allowed.")
          });
        }
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
          if (!subValidationResult.hasProblems()) {
            matches.push(subSchema);
          }
          if (!bestMatch) {
            bestMatch = { schema: subSchema, validationResult: subValidationResult, matchingSchemas: subMatchingSchemas };
          } else {
            if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
              bestMatch.matchingSchemas.merge(subMatchingSchemas);
              bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
              bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
              bestMatch.validationResult.mergeProcessedProperties(subValidationResult);
            } else {
              const compareResult = subValidationResult.compare(bestMatch.validationResult);
              if (compareResult > 0) {
                bestMatch = { schema: subSchema, validationResult: subValidationResult, matchingSchemas: subMatchingSchemas };
              } else if (compareResult === 0) {
                bestMatch.matchingSchemas.merge(subMatchingSchemas);
                bestMatch.validationResult.mergeEnumValues(subValidationResult);
              }
            }
          }
        }
        if (matches.length > 1 && maxOneMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: 1 },
            message: t("Matches multiple schemas when only one must validate.")
          });
        }
        if (bestMatch) {
          bestMatch.validationResult.updateEnumMismatchProblemMessages();
          validationResult.merge(bestMatch.validationResult);
          matchingSchemas.merge(bestMatch.matchingSchemas);
        }
        return matches.length;
      };
      if (Array.isArray(schema.anyOf)) {
        testAlternatives(schema.anyOf, false);
      }
      if (Array.isArray(schema.oneOf)) {
        testAlternatives(schema.oneOf, true);
      }
      const testBranch = (schema2) => {
        const subValidationResult = new ValidationResult();
        const subMatchingSchemas = matchingSchemas.newSub();
        validate(node, asSchema(schema2), subValidationResult, subMatchingSchemas, context);
        validationResult.merge(subValidationResult);
        matchingSchemas.merge(subMatchingSchemas);
      };
      const testCondition = (ifSchema2, thenSchema, elseSchema) => {
        const subSchema = asSchema(ifSchema2);
        const subValidationResult = new ValidationResult();
        const subMatchingSchemas = matchingSchemas.newSub();
        validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
        matchingSchemas.merge(subMatchingSchemas);
        validationResult.mergeProcessedProperties(subValidationResult);
        if (!subValidationResult.hasProblems()) {
          if (thenSchema) {
            testBranch(thenSchema);
          }
        } else if (elseSchema) {
          testBranch(elseSchema);
        }
      };
      const ifSchema = asSchema(schema.if);
      if (ifSchema) {
        testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
      }
      if (Array.isArray(schema.enum)) {
        const val = getNodeValue(node);
        let enumValueMatch = false;
        for (const e of schema.enum) {
          if (equals(val, e)) {
            enumValueMatch = true;
            break;
          }
        }
        validationResult.enumValues = schema.enum;
        validationResult.enumValueMatch = enumValueMatch;
        if (!enumValueMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            code: ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || t("Value is not accepted. Valid values: {0}.", schema.enum.map((v) => JSON.stringify(v)).join(", "))
          });
        }
      }
      if (isDefined(schema.const)) {
        const val = getNodeValue(node);
        if (!equals(val, schema.const)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            code: ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || t("Value must be {0}.", JSON.stringify(schema.const))
          });
          validationResult.enumValueMatch = false;
        } else {
          validationResult.enumValueMatch = true;
        }
        validationResult.enumValues = [schema.const];
      }
      let deprecationMessage = schema.deprecationMessage;
      if (deprecationMessage || schema.deprecated) {
        deprecationMessage = deprecationMessage || t("Value is deprecated");
        let targetNode = ((_a = node.parent) == null ? void 0 : _a.type) === "property" ? node.parent : node;
        validationResult.problems.push({
          location: { offset: targetNode.offset, length: targetNode.length },
          severity: DiagnosticSeverity.Warning,
          message: deprecationMessage,
          code: ErrorCode.Deprecated
        });
      }
    }
    function _validateNumberNode(node2) {
      const val = node2.value;
      function normalizeFloats(float) {
        var _a;
        const parts = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(float.toString());
        return parts && {
          value: Number(parts[1] + (parts[2] || "")),
          multiplier: (((_a = parts[2]) == null ? void 0 : _a.length) || 0) - (parseInt(parts[3]) || 0)
        };
      }
      if (isNumber(schema.multipleOf)) {
        let remainder = -1;
        if (Number.isInteger(schema.multipleOf)) {
          remainder = val % schema.multipleOf;
        } else {
          let normMultipleOf = normalizeFloats(schema.multipleOf);
          let normValue = normalizeFloats(val);
          if (normMultipleOf && normValue) {
            const multiplier = 10 ** Math.abs(normValue.multiplier - normMultipleOf.multiplier);
            if (normValue.multiplier < normMultipleOf.multiplier) {
              normValue.value *= multiplier;
            } else {
              normMultipleOf.value *= multiplier;
            }
            remainder = normValue.value % normMultipleOf.value;
          }
        }
        if (remainder !== 0) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: t("Value is not divisible by {0}.", schema.multipleOf)
          });
        }
      }
      function getExclusiveLimit(limit, exclusive) {
        if (isNumber(exclusive)) {
          return exclusive;
        }
        if (isBoolean(exclusive) && exclusive) {
          return limit;
        }
        return void 0;
      }
      function getLimit(limit, exclusive) {
        if (!isBoolean(exclusive) || !exclusive) {
          return limit;
        }
        return void 0;
      }
      const exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
      if (isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Value is below the exclusive minimum of {0}.", exclusiveMinimum)
        });
      }
      const exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
      if (isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Value is above the exclusive maximum of {0}.", exclusiveMaximum)
        });
      }
      const minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
      if (isNumber(minimum) && val < minimum) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Value is below the minimum of {0}.", minimum)
        });
      }
      const maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
      if (isNumber(maximum) && val > maximum) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Value is above the maximum of {0}.", maximum)
        });
      }
    }
    function _validateStringNode(node2) {
      if (isNumber(schema.minLength) && stringLength(node2.value) < schema.minLength) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("String is shorter than the minimum length of {0}.", schema.minLength)
        });
      }
      if (isNumber(schema.maxLength) && stringLength(node2.value) > schema.maxLength) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("String is longer than the maximum length of {0}.", schema.maxLength)
        });
      }
      if (isString(schema.pattern)) {
        const regex = extendedRegExp(schema.pattern);
        if (!(regex == null ? void 0 : regex.test(node2.value))) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: schema.patternErrorMessage || schema.errorMessage || t('String does not match the pattern of "{0}".', schema.pattern)
          });
        }
      }
      if (schema.format) {
        switch (schema.format) {
          case "uri":
          case "uri-reference":
            {
              let errorMessage;
              if (!node2.value) {
                errorMessage = t("URI expected.");
              } else {
                const match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node2.value);
                if (!match) {
                  errorMessage = t("URI is expected.");
                } else if (!match[2] && schema.format === "uri") {
                  errorMessage = t("URI with a scheme is expected.");
                }
              }
              if (errorMessage) {
                validationResult.problems.push({
                  location: { offset: node2.offset, length: node2.length },
                  message: schema.patternErrorMessage || schema.errorMessage || t("String is not a URI: {0}", errorMessage)
                });
              }
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
            const format2 = formats[schema.format];
            if (!node2.value || !format2.pattern.exec(node2.value)) {
              validationResult.problems.push({
                location: { offset: node2.offset, length: node2.length },
                message: schema.patternErrorMessage || schema.errorMessage || format2.errorMessage
              });
            }
        }
      }
    }
    function _validateArrayNode(node2) {
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
        const max = Math.min(prefixItemsSchemas.length, node2.items.length);
        for (; index < max; index++) {
          const subSchemaRef = prefixItemsSchemas[index];
          const subSchema = asSchema(subSchemaRef);
          const itemValidationResult = new ValidationResult();
          const item = node2.items[index];
          if (item) {
            validate(item, subSchema, itemValidationResult, matchingSchemas, context);
            validationResult.mergePropertyMatch(itemValidationResult);
          }
          validationResult.processedProperties.add(String(index));
        }
      }
      if (additionalItemSchema !== void 0 && index < node2.items.length) {
        if (typeof additionalItemSchema === "boolean") {
          if (additionalItemSchema === false) {
            validationResult.problems.push({
              location: { offset: node2.offset, length: node2.length },
              message: t("Array has too many items according to schema. Expected {0} or fewer.", index)
            });
          }
          for (; index < node2.items.length; index++) {
            validationResult.processedProperties.add(String(index));
            validationResult.propertiesValueMatches++;
          }
        } else {
          for (; index < node2.items.length; index++) {
            const itemValidationResult = new ValidationResult();
            validate(node2.items[index], additionalItemSchema, itemValidationResult, matchingSchemas, context);
            validationResult.mergePropertyMatch(itemValidationResult);
            validationResult.processedProperties.add(String(index));
          }
        }
      }
      const containsSchema = asSchema(schema.contains);
      if (containsSchema) {
        let containsCount = 0;
        for (let index2 = 0; index2 < node2.items.length; index2++) {
          const item = node2.items[index2];
          const itemValidationResult = new ValidationResult();
          validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance, context);
          if (!itemValidationResult.hasProblems()) {
            containsCount++;
            if (context.schemaDraft >= SchemaDraft.v2020_12) {
              validationResult.processedProperties.add(String(index2));
            }
          }
        }
        if (containsCount === 0 && !isNumber(schema.minContains)) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: schema.errorMessage || t("Array does not contain required item.")
          });
        }
        if (isNumber(schema.minContains) && containsCount < schema.minContains) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: schema.errorMessage || t("Array has too few items that match the contains contraint. Expected {0} or more.", schema.minContains)
          });
        }
        if (isNumber(schema.maxContains) && containsCount > schema.maxContains) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: schema.errorMessage || t("Array has too many items that match the contains contraint. Expected {0} or less.", schema.maxContains)
          });
        }
      }
      const unevaluatedItems = schema.unevaluatedItems;
      if (unevaluatedItems !== void 0) {
        for (let i = 0; i < node2.items.length; i++) {
          if (!validationResult.processedProperties.has(String(i))) {
            if (unevaluatedItems === false) {
              validationResult.problems.push({
                location: { offset: node2.offset, length: node2.length },
                message: t("Item does not match any validation rule from the array.")
              });
            } else {
              const itemValidationResult = new ValidationResult();
              validate(node2.items[i], schema.unevaluatedItems, itemValidationResult, matchingSchemas, context);
              validationResult.mergePropertyMatch(itemValidationResult);
            }
          }
          validationResult.processedProperties.add(String(i));
          validationResult.propertiesValueMatches++;
        }
      }
      if (isNumber(schema.minItems) && node2.items.length < schema.minItems) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Array has too few items. Expected {0} or more.", schema.minItems)
        });
      }
      if (isNumber(schema.maxItems) && node2.items.length > schema.maxItems) {
        validationResult.problems.push({
          location: { offset: node2.offset, length: node2.length },
          message: t("Array has too many items. Expected {0} or fewer.", schema.maxItems)
        });
      }
      if (schema.uniqueItems === true) {
        let hasDuplicates = function() {
          for (let i = 0; i < values.length - 1; i++) {
            const value = values[i];
            for (let j = i + 1; j < values.length; j++) {
              if (equals(value, values[j])) {
                return true;
              }
            }
          }
          return false;
        };
        const values = getNodeValue(node2);
        if (hasDuplicates()) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: t("Array has duplicate items.")
          });
        }
      }
    }
    function _validateObjectNode(node2) {
      const seenKeys = /* @__PURE__ */ Object.create(null);
      const unprocessedProperties = /* @__PURE__ */ new Set();
      for (const propertyNode of node2.properties) {
        const key = propertyNode.keyNode.value;
        seenKeys[key] = propertyNode.valueNode;
        unprocessedProperties.add(key);
      }
      if (Array.isArray(schema.required)) {
        for (const propertyName of schema.required) {
          if (!seenKeys[propertyName]) {
            const keyNode = node2.parent && node2.parent.type === "property" && node2.parent.keyNode;
            const location = keyNode ? { offset: keyNode.offset, length: keyNode.length } : { offset: node2.offset, length: 1 };
            validationResult.problems.push({
              location,
              message: t('Missing property "{0}".', propertyName)
            });
          }
        }
      }
      const propertyProcessed = (prop) => {
        unprocessedProperties.delete(prop);
        validationResult.processedProperties.add(prop);
      };
      if (schema.properties) {
        for (const propertyName of Object.keys(schema.properties)) {
          propertyProcessed(propertyName);
          const propertySchema = schema.properties[propertyName];
          const child = seenKeys[propertyName];
          if (child) {
            if (isBoolean(propertySchema)) {
              if (!propertySchema) {
                const propertyNode = child.parent;
                validationResult.problems.push({
                  location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                  message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
                });
              } else {
                validationResult.propertiesMatches++;
                validationResult.propertiesValueMatches++;
              }
            } else {
              const propertyValidationResult = new ValidationResult();
              validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          }
        }
      }
      if (schema.patternProperties) {
        for (const propertyPattern of Object.keys(schema.patternProperties)) {
          const regex = extendedRegExp(propertyPattern);
          if (regex) {
            const processed = [];
            for (const propertyName of unprocessedProperties) {
              if (regex.test(propertyName)) {
                processed.push(propertyName);
                const child = seenKeys[propertyName];
                if (child) {
                  const propertySchema = schema.patternProperties[propertyPattern];
                  if (isBoolean(propertySchema)) {
                    if (!propertySchema) {
                      const propertyNode = child.parent;
                      validationResult.problems.push({
                        location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                        message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
                      });
                    } else {
                      validationResult.propertiesMatches++;
                      validationResult.propertiesValueMatches++;
                    }
                  } else {
                    const propertyValidationResult = new ValidationResult();
                    validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
                    validationResult.mergePropertyMatch(propertyValidationResult);
                  }
                }
              }
            }
            processed.forEach(propertyProcessed);
          }
        }
      }
      const additionalProperties = schema.additionalProperties;
      if (additionalProperties !== void 0) {
        for (const propertyName of unprocessedProperties) {
          propertyProcessed(propertyName);
          const child = seenKeys[propertyName];
          if (child) {
            if (additionalProperties === false) {
              const propertyNode = child.parent;
              validationResult.problems.push({
                location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
              });
            } else if (additionalProperties !== true) {
              const propertyValidationResult = new ValidationResult();
              validate(child, additionalProperties, propertyValidationResult, matchingSchemas, context);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          }
        }
      }
      const unevaluatedProperties = schema.unevaluatedProperties;
      if (unevaluatedProperties !== void 0) {
        const processed = [];
        for (const propertyName of unprocessedProperties) {
          if (!validationResult.processedProperties.has(propertyName)) {
            processed.push(propertyName);
            const child = seenKeys[propertyName];
            if (child) {
              if (unevaluatedProperties === false) {
                const propertyNode = child.parent;
                validationResult.problems.push({
                  location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                  message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
                });
              } else if (unevaluatedProperties !== true) {
                const propertyValidationResult = new ValidationResult();
                validate(child, unevaluatedProperties, propertyValidationResult, matchingSchemas, context);
                validationResult.mergePropertyMatch(propertyValidationResult);
              }
            }
          }
        }
        processed.forEach(propertyProcessed);
      }
      if (isNumber(schema.maxProperties)) {
        if (node2.properties.length > schema.maxProperties) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: t("Object has more properties than limit of {0}.", schema.maxProperties)
          });
        }
      }
      if (isNumber(schema.minProperties)) {
        if (node2.properties.length < schema.minProperties) {
          validationResult.problems.push({
            location: { offset: node2.offset, length: node2.length },
            message: t("Object has fewer properties than the required number of {0}", schema.minProperties)
          });
        }
      }
      if (schema.dependentRequired) {
        for (const key in schema.dependentRequired) {
          const prop = seenKeys[key];
          const propertyDeps = schema.dependentRequired[key];
          if (prop && Array.isArray(propertyDeps)) {
            _validatePropertyDependencies(key, propertyDeps);
          }
        }
      }
      if (schema.dependentSchemas) {
        for (const key in schema.dependentSchemas) {
          const prop = seenKeys[key];
          const propertyDeps = schema.dependentSchemas[key];
          if (prop && isObject(propertyDeps)) {
            _validatePropertyDependencies(key, propertyDeps);
          }
        }
      }
      if (schema.dependencies) {
        for (const key in schema.dependencies) {
          const prop = seenKeys[key];
          if (prop) {
            _validatePropertyDependencies(key, schema.dependencies[key]);
          }
        }
      }
      const propertyNames = asSchema(schema.propertyNames);
      if (propertyNames) {
        for (const f2 of node2.properties) {
          const key = f2.keyNode;
          if (key) {
            validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance, context);
          }
        }
      }
      function _validatePropertyDependencies(key, propertyDep) {
        if (Array.isArray(propertyDep)) {
          for (const requiredProp of propertyDep) {
            if (!seenKeys[requiredProp]) {
              validationResult.problems.push({
                location: { offset: node2.offset, length: node2.length },
                message: t("Object is missing property {0} required by property {1}.", requiredProp, key)
              });
            } else {
              validationResult.propertiesValueMatches++;
            }
          }
        } else {
          const propertySchema = asSchema(propertyDep);
          if (propertySchema) {
            const propertyValidationResult = new ValidationResult();
            validate(node2, propertySchema, propertyValidationResult, matchingSchemas, context);
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
        const token2 = scanner.scan();
        _checkScanError();
        switch (token2) {
          case 12:
          case 13:
            if (Array.isArray(commentRanges)) {
              commentRanges.push(Range.create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
            }
            break;
          case 15:
          case 14:
            break;
          default:
            return token2;
        }
      }
    }
    function _errorAtRange(message, code, startOffset, endOffset, severity = DiagnosticSeverity.Error) {
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
        while (start > 0 && /\s/.test(text.charAt(start))) {
          start--;
        }
        end = start + 1;
      }
      _errorAtRange(message, code, start, end);
      if (node) {
        _finalize(node, false);
      }
      if (skipUntilAfter.length + skipUntil.length > 0) {
        let token2 = scanner.getToken();
        while (token2 !== 17) {
          if (skipUntilAfter.indexOf(token2) !== -1) {
            _scanNext();
            break;
          } else if (skipUntil.indexOf(token2) !== -1) {
            break;
          }
          token2 = _scanNext();
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
      if (scanNext) {
        _scanNext();
      }
      return node;
    }
    function _parseArray(parent) {
      if (scanner.getToken() !== 3) {
        return void 0;
      }
      const node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
      _scanNext();
      let needsComma = false;
      while (scanner.getToken() !== 4 && scanner.getToken() !== 17) {
        if (scanner.getToken() === 5) {
          if (!needsComma) {
            _error(t("Value expected"), ErrorCode.ValueExpected);
          }
          const commaOffset = scanner.getTokenOffset();
          _scanNext();
          if (scanner.getToken() === 4) {
            if (needsComma) {
              _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
            }
            continue;
          }
        } else if (needsComma) {
          _error(t("Expected comma"), ErrorCode.CommaExpected);
        }
        const item = _parseValue(node);
        if (!item) {
          _error(t("Value expected"), ErrorCode.ValueExpected, void 0, [], [
            4,
            5
            /* Json.SyntaxKind.CommaToken */
          ]);
        } else {
          node.items.push(item);
        }
        needsComma = true;
      }
      if (scanner.getToken() !== 4) {
        return _error(t("Expected comma or closing bracket"), ErrorCode.CommaOrCloseBacketExpected, node);
      }
      return _finalize(node, true);
    }
    const keyPlaceholder = new StringASTNodeImpl(void 0, 0, 0);
    function _parseProperty(parent, keysSeen) {
      const node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset(), keyPlaceholder);
      let key = _parseString(node);
      if (!key) {
        if (scanner.getToken() === 16) {
          _error(t("Property keys must be doublequoted"), ErrorCode.PropertyKeysMustBeDoublequoted);
          const keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
          keyNode.value = scanner.getTokenValue();
          key = keyNode;
          _scanNext();
        } else {
          return void 0;
        }
      }
      node.keyNode = key;
      if (key.value !== "//") {
        const seen = keysSeen[key.value];
        if (seen) {
          _errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, DiagnosticSeverity.Warning);
          if (isObject(seen)) {
            _errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, DiagnosticSeverity.Warning);
          }
          keysSeen[key.value] = true;
        } else {
          keysSeen[key.value] = node;
        }
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
      if (!value) {
        return _error(t("Value expected"), ErrorCode.ValueExpected, node, [], [
          2,
          5
          /* Json.SyntaxKind.CommaToken */
        ]);
      }
      node.valueNode = value;
      node.length = value.offset + value.length - node.offset;
      return node;
    }
    function _parseObject(parent) {
      if (scanner.getToken() !== 1) {
        return void 0;
      }
      const node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
      const keysSeen = /* @__PURE__ */ Object.create(null);
      _scanNext();
      let needsComma = false;
      while (scanner.getToken() !== 2 && scanner.getToken() !== 17) {
        if (scanner.getToken() === 5) {
          if (!needsComma) {
            _error(t("Property expected"), ErrorCode.PropertyExpected);
          }
          const commaOffset = scanner.getTokenOffset();
          _scanNext();
          if (scanner.getToken() === 2) {
            if (needsComma) {
              _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
            }
            continue;
          }
        } else if (needsComma) {
          _error(t("Expected comma"), ErrorCode.CommaExpected);
        }
        const property = _parseProperty(node, keysSeen);
        if (!property) {
          _error(t("Property expected"), ErrorCode.PropertyExpected, void 0, [], [
            2,
            5
            /* Json.SyntaxKind.CommaToken */
          ]);
        } else {
          node.properties.push(property);
        }
        needsComma = true;
      }
      if (scanner.getToken() !== 2) {
        return _error(t("Expected comma or closing brace"), ErrorCode.CommaOrCloseBraceExpected, node);
      }
      return _finalize(node, true);
    }
    function _parseString(parent) {
      if (scanner.getToken() !== 10) {
        return void 0;
      }
      const node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
      node.value = scanner.getTokenValue();
      return _finalize(node, true);
    }
    function _parseNumber(parent) {
      if (scanner.getToken() !== 11) {
        return void 0;
      }
      const node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
      if (scanner.getTokenError() === 0) {
        const tokenValue = scanner.getTokenValue();
        try {
          const numberValue = JSON.parse(tokenValue);
          if (!isNumber(numberValue)) {
            return _error(t("Invalid number format."), ErrorCode.Undefined, node);
          }
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
        case 7:
          return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
        case 8:
          return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
        case 9:
          return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
        default:
          return void 0;
      }
    }
    function _parseValue(parent) {
      return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
    }
    let _root = void 0;
    const token = _scanNext();
    if (token !== 17) {
      _root = _parseValue(_root);
      if (!_root) {
        _error(t("Expected a JSON object, array or literal."), ErrorCode.Undefined);
      } else if (scanner.getToken() !== 17) {
        _error(t("End of file expected."), ErrorCode.Undefined);
      }
    }
    return new JSONDocument(_root, problems, commentRanges);
  }
  function stringifyObject(obj, indent, stringifyLiteral) {
    if (obj !== null && typeof obj === "object") {
      const newIndent = indent + "	";
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        let result = "[\n";
        for (let i = 0; i < obj.length; i++) {
          result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
          if (i < obj.length - 1) {
            result += ",";
          }
          result += "\n";
        }
        result += indent + "]";
        return result;
      } else {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
          return "{}";
        }
        let result = "{\n";
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          result += newIndent + JSON.stringify(key) + ": " + stringifyObject(obj[key], newIndent, stringifyLiteral);
          if (i < keys.length - 1) {
            result += ",";
          }
          result += "\n";
        }
        result += indent + "}";
        return result;
      }
    }
    return stringifyLiteral(obj);
  }
  class JSONCompletion {
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
          if (resolver) {
            return resolver;
          }
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
      if (this.isInComment(document, node ? node.offset : 0, offset)) {
        return Promise.resolve(result);
      }
      if (node && offset === node.offset + node.length && offset > 0) {
        const ch = text[offset - 1];
        if (node.type === "object" && ch === "}" || node.type === "array" && ch === "]") {
          node = node.parent;
        }
      }
      const currentWord = this.getCurrentWord(document, offset);
      let overwriteRange;
      if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
        overwriteRange = Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
      } else {
        let overwriteStart = offset - currentWord.length;
        if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
          overwriteStart--;
        }
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
              if (!proposed.has(shortendedLabel)) {
                label = shortendedLabel;
              }
            }
            suggestion.textEdit = TextEdit.replace(overwriteRange, suggestion.insertText);
            suggestion.label = label;
            proposed.set(label, suggestion);
            result.items.push(suggestion);
          } else {
            if (!existing.documentation) {
              existing.documentation = suggestion.documentation;
            }
            if (!existing.detail) {
              existing.detail = suggestion.detail;
            }
            if (!existing.labelDetails) {
              existing.labelDetails = suggestion.labelDetails;
            }
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
              if (parent) {
                node = parent.parent;
              }
            }
          }
        }
        if (node && node.type === "object") {
          if (node.offset === offset) {
            return result;
          }
          const properties = node.properties;
          properties.forEach((p) => {
            if (!currentProperty || currentProperty !== p) {
              proposed.set(p.keyNode.value, CompletionItem.create("__"));
            }
          });
          let separatorAfter = "";
          if (addValue) {
            separatorAfter = this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
          }
          if (schema) {
            this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector);
          } else {
            this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
          }
          const location = getNodePath(node);
          this.contributions.forEach((contribution) => {
            const collectPromise = contribution.collectPropertyCompletions(document.uri, location, currentWord, addValue, separatorAfter === "", collector);
            if (collectPromise) {
              collectionPromises.push(collectPromise);
            }
          });
          if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"') {
            collector.add({
              kind: CompletionItemKind.Property,
              label: this.getLabelForValue(currentWord),
              insertText: this.getInsertTextForProperty(currentWord, void 0, false, separatorAfter),
              insertTextFormat: InsertTextFormat.Snippet,
              documentation: ""
            });
            collector.setAsIncomplete();
          }
        }
        const types = {};
        if (schema) {
          this.getValueCompletions(schema, doc, node, offset, document, collector, types);
        } else {
          this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
        }
        if (this.contributions.length > 0) {
          this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
        }
        return this.promiseConstructor.all(collectionPromises).then(() => {
          if (collector.getNumberOfProposals() === 0) {
            let offsetForSeparator = offset;
            if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
              offsetForSeparator = node.offset + node.length;
            }
            const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
            this.addFillerValueCompletions(types, separatorAfter, collector);
          }
          return result;
        });
      });
    }
    getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector) {
      const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
      matchingSchemas.forEach((s) => {
        if (s.node === node && !s.inverted) {
          const schemaProperties = s.schema.properties;
          if (schemaProperties) {
            Object.keys(schemaProperties).forEach((key) => {
              const propertySchema = schemaProperties[key];
              if (typeof propertySchema === "object" && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
                const proposal = {
                  kind: CompletionItemKind.Property,
                  label: key,
                  insertText: this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
                  insertTextFormat: InsertTextFormat.Snippet,
                  filterText: this.getFilterTextForValue(key),
                  documentation: this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || ""
                };
                if (propertySchema.completionDetail !== void 0) {
                  proposal.detail = propertySchema.completionDetail;
                }
                if (propertySchema.suggestSortText !== void 0) {
                  proposal.sortText = propertySchema.suggestSortText;
                }
                if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) {
                  proposal.command = {
                    title: "Suggest",
                    command: "editor.action.triggerSuggest"
                  };
                }
                collector.add(proposal);
              }
            });
          }
          const schemaPropertyNames = s.schema.propertyNames;
          if (typeof schemaPropertyNames === "object" && !schemaPropertyNames.deprecationMessage && !schemaPropertyNames.doNotSuggest) {
            const propertyNameCompletionItem = (name, enumDescription = void 0) => {
              const proposal = {
                kind: CompletionItemKind.Property,
                label: name,
                insertText: this.getInsertTextForProperty(name, void 0, addValue, separatorAfter),
                insertTextFormat: InsertTextFormat.Snippet,
                filterText: this.getFilterTextForValue(name),
                documentation: enumDescription || this.fromMarkup(schemaPropertyNames.markdownDescription) || schemaPropertyNames.description || ""
              };
              if (schemaPropertyNames.completionDetail !== void 0) {
                proposal.detail = schemaPropertyNames.completionDetail;
              }
              if (schemaPropertyNames.suggestSortText !== void 0) {
                proposal.sortText = schemaPropertyNames.suggestSortText;
              }
              if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) {
                proposal.command = {
                  title: "Suggest",
                  command: "editor.action.triggerSuggest"
                };
              }
              collector.add(proposal);
            };
            if (schemaPropertyNames.enum) {
              for (let i = 0; i < schemaPropertyNames.enum.length; i++) {
                let enumDescription = void 0;
                if (schemaPropertyNames.markdownEnumDescriptions && i < schemaPropertyNames.markdownEnumDescriptions.length) {
                  enumDescription = this.fromMarkup(schemaPropertyNames.markdownEnumDescriptions[i]);
                } else if (schemaPropertyNames.enumDescriptions && i < schemaPropertyNames.enumDescriptions.length) {
                  enumDescription = schemaPropertyNames.enumDescriptions[i];
                }
                propertyNameCompletionItem(schemaPropertyNames.enum[i], enumDescription);
              }
            }
            if (schemaPropertyNames.const) {
              propertyNameCompletionItem(schemaPropertyNames.const);
            }
          }
        }
      });
    }
    getSchemaLessPropertyCompletions(doc, node, currentKey, collector) {
      const collectCompletionsForSimilarObject = (obj) => {
        obj.properties.forEach((p) => {
          const key = p.keyNode.value;
          collector.add({
            kind: CompletionItemKind.Property,
            label: key,
            insertText: this.getInsertTextForValue(key, ""),
            insertTextFormat: InsertTextFormat.Snippet,
            filterText: this.getFilterTextForValue(key),
            documentation: ""
          });
        });
      };
      if (node.parent) {
        if (node.parent.type === "property") {
          const parentKey = node.parent.keyNode.value;
          doc.visit((n) => {
            if (n.type === "property" && n !== node.parent && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "object") {
              collectCompletionsForSimilarObject(n.valueNode);
            }
            return true;
          });
        } else if (node.parent.type === "array") {
          node.parent.items.forEach((n) => {
            if (n.type === "object" && n !== node) {
              collectCompletionsForSimilarObject(n);
            }
          });
        }
      } else if (node.type === "object") {
        collector.add({
          kind: CompletionItemKind.Property,
          label: "$schema",
          insertText: this.getInsertTextForProperty("$schema", void 0, true, ""),
          insertTextFormat: InsertTextFormat.Snippet,
          documentation: "",
          filterText: this.getFilterTextForValue("$schema")
        });
      }
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
          insertTextFormat: InsertTextFormat.Snippet,
          documentation: ""
        });
        collector.add({
          kind: this.getSuggestionKind("array"),
          label: "Empty array",
          insertText: this.getInsertTextForValue([], ""),
          insertTextFormat: InsertTextFormat.Snippet,
          documentation: ""
        });
        return;
      }
      const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
      const collectSuggestionsForValues = (value) => {
        if (value.parent && !contains(value.parent, offset, true)) {
          collector.add({
            kind: this.getSuggestionKind(value.type),
            label: this.getLabelTextForMatchingNode(value, document),
            insertText: this.getInsertTextForMatchingNode(value, document, separatorAfter),
            insertTextFormat: InsertTextFormat.Snippet,
            documentation: ""
          });
        }
        if (value.type === "boolean") {
          this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
        }
      };
      if (node.type === "property") {
        if (offset > (node.colonOffset || 0)) {
          const valueNode = node.valueNode;
          if (valueNode && (offset > valueNode.offset + valueNode.length || valueNode.type === "object" || valueNode.type === "array")) {
            return;
          }
          const parentKey = node.keyNode.value;
          doc.visit((n) => {
            if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode) {
              collectSuggestionsForValues(n.valueNode);
            }
            return true;
          });
          if (parentKey === "$schema" && node.parent && !node.parent.parent) {
            this.addDollarSchemaCompletions(separatorAfter, collector);
          }
        }
      }
      if (node.type === "array") {
        if (node.parent && node.parent.type === "property") {
          const parentKey = node.parent.keyNode.value;
          doc.visit((n) => {
            if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "array") {
              n.valueNode.items.forEach(collectSuggestionsForValues);
            }
            return true;
          });
        } else {
          node.items.forEach(collectSuggestionsForValues);
        }
      }
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
        const valueNode2 = node.valueNode;
        if (valueNode2 && offset > valueNode2.offset + valueNode2.length) {
          return;
        }
        parentKey = node.keyNode.value;
        node = node.parent;
      }
      if (node && (parentKey !== void 0 || node.type === "array")) {
        const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
        const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
        for (const s of matchingSchemas) {
          if (s.node === node && !s.inverted && s.schema) {
            if (node.type === "array" && s.schema.items) {
              let c = collector;
              if (s.schema.uniqueItems) {
                const existingValues = /* @__PURE__ */ new Set();
                node.children.forEach((n) => {
                  if (n.type !== "array" && n.type !== "object") {
                    existingValues.add(this.getLabelForValue(getNodeValue(n)));
                  }
                });
                c = {
                  ...collector,
                  add(suggestion) {
                    if (!existingValues.has(suggestion.label)) {
                      collector.add(suggestion);
                    }
                  }
                };
              }
              if (Array.isArray(s.schema.items)) {
                const index = this.findItemAtOffset(node, document, offset);
                if (index < s.schema.items.length) {
                  this.addSchemaValueCompletions(s.schema.items[index], separatorAfter, c, types);
                }
              } else {
                this.addSchemaValueCompletions(s.schema.items, separatorAfter, c, types);
              }
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
                for (const pattern of Object.keys(s.schema.patternProperties)) {
                  const regex = extendedRegExp(pattern);
                  if (regex == null ? void 0 : regex.test(parentKey)) {
                    propertyMatched = true;
                    const propertySchema = s.schema.patternProperties[pattern];
                    this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
                  }
                }
              }
              if (s.schema.additionalProperties && !propertyMatched) {
                const propertySchema = s.schema.additionalProperties;
                this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
              }
            }
          }
        }
        if (parentKey === "$schema" && !node.parent) {
          this.addDollarSchemaCompletions(separatorAfter, collector);
        }
        if (types["boolean"]) {
          this.addBooleanValueCompletion(true, separatorAfter, collector);
          this.addBooleanValueCompletion(false, separatorAfter, collector);
        }
        if (types["null"]) {
          this.addNullValueCompletion(separatorAfter, collector);
        }
      }
    }
    getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises) {
      if (!node) {
        this.contributions.forEach((contribution) => {
          const collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
          if (collectPromise) {
            collectionPromises.push(collectPromise);
          }
        });
      } else {
        if (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null") {
          node = node.parent;
        }
        if (node && node.type === "property" && offset > (node.colonOffset || 0)) {
          const parentKey = node.keyNode.value;
          const valueNode = node.valueNode;
          if ((!valueNode || offset <= valueNode.offset + valueNode.length) && node.parent) {
            const location = getNodePath(node.parent);
            this.contributions.forEach((contribution) => {
              const collectPromise = contribution.collectValueCompletions(document.uri, location, parentKey, collector);
              if (collectPromise) {
                collectionPromises.push(collectPromise);
              }
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
        if (Array.isArray(schema.allOf)) {
          schema.allOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
        }
        if (Array.isArray(schema.anyOf)) {
          schema.anyOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
        }
        if (Array.isArray(schema.oneOf)) {
          schema.oneOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
        }
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
          insertTextFormat: InsertTextFormat.Snippet
        };
        if (this.doesSupportsLabelDetails()) {
          completionItem.labelDetails = { description: t("Default value") };
        } else {
          completionItem.detail = t("Default value");
        }
        collector.add(completionItem);
        hasProposals = true;
      }
      if (Array.isArray(schema.examples)) {
        schema.examples.forEach((example) => {
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
            insertTextFormat: InsertTextFormat.Snippet
          });
          hasProposals = true;
        });
      }
      if (Array.isArray(schema.defaultSnippets)) {
        schema.defaultSnippets.forEach((s) => {
          let type = schema.type;
          let value = s.body;
          let label = s.label;
          let insertText;
          let filterText;
          if (isDefined(value)) {
            schema.type;
            for (let i = arrayDepth; i > 0; i--) {
              value = [value];
            }
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
          } else {
            return;
          }
          collector.add({
            kind: this.getSuggestionKind(type),
            label,
            documentation: this.fromMarkup(s.markdownDescription) || s.description,
            insertText,
            insertTextFormat: InsertTextFormat.Snippet,
            filterText
          });
          hasProposals = true;
        });
      }
      if (!hasProposals && typeof schema.items === "object" && !Array.isArray(schema.items) && arrayDepth < 5) {
        this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
      }
    }
    addEnumValueCompletions(schema, separatorAfter, collector) {
      if (isDefined(schema.const)) {
        collector.add({
          kind: this.getSuggestionKind(schema.type),
          label: this.getLabelForValue(schema.const),
          insertText: this.getInsertTextForValue(schema.const, separatorAfter),
          insertTextFormat: InsertTextFormat.Snippet,
          documentation: this.fromMarkup(schema.markdownDescription) || schema.description
        });
      }
      if (Array.isArray(schema.enum)) {
        for (let i = 0, length = schema.enum.length; i < length; i++) {
          const enm = schema.enum[i];
          let documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
          if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
            documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
          } else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
            documentation = schema.enumDescriptions[i];
          }
          collector.add({
            kind: this.getSuggestionKind(schema.type),
            label: this.getLabelForValue(enm),
            insertText: this.getInsertTextForValue(enm, separatorAfter),
            insertTextFormat: InsertTextFormat.Snippet,
            documentation
          });
        }
      }
    }
    collectTypes(schema, types) {
      if (Array.isArray(schema.enum) || isDefined(schema.const)) {
        return;
      }
      const type = schema.type;
      if (Array.isArray(type)) {
        type.forEach((t2) => types[t2] = true);
      } else if (type) {
        types[type] = true;
      }
    }
    addFillerValueCompletions(types, separatorAfter, collector) {
      if (types["object"]) {
        collector.add({
          kind: this.getSuggestionKind("object"),
          label: "{}",
          insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
          insertTextFormat: InsertTextFormat.Snippet,
          detail: t("New object"),
          documentation: ""
        });
      }
      if (types["array"]) {
        collector.add({
          kind: this.getSuggestionKind("array"),
          label: "[]",
          insertText: this.getInsertTextForGuessedValue([], separatorAfter),
          insertTextFormat: InsertTextFormat.Snippet,
          detail: t("New array"),
          documentation: ""
        });
      }
    }
    addBooleanValueCompletion(value, separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind("boolean"),
        label: value ? "true" : "false",
        insertText: this.getInsertTextForValue(value, separatorAfter),
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: ""
      });
    }
    addNullValueCompletion(separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind("null"),
        label: "null",
        insertText: "null" + separatorAfter,
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: ""
      });
    }
    addDollarSchemaCompletions(separatorAfter, collector) {
      const schemaIds = this.schemaService.getRegisteredSchemaIds((schema) => schema === "http" || schema === "https");
      schemaIds.forEach((schemaId) => {
        if (schemaId.startsWith("http://json-schema.org/draft-")) {
          schemaId = schemaId + "#";
        }
        collector.add({
          kind: CompletionItemKind.Module,
          label: this.getLabelForValue(schemaId),
          filterText: this.getFilterTextForValue(schemaId),
          insertText: this.getInsertTextForValue(schemaId, separatorAfter),
          insertTextFormat: InsertTextFormat.Snippet,
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
      const label = JSON.stringify(value);
      return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
    }
    getInsertTextForPlainText(text) {
      return text.replace(/[\\\$\}]/g, "\\$&");
    }
    getInsertTextForValue(value, separatorAfter) {
      const text = JSON.stringify(value, null, "	");
      if (text === "{}") {
        return "{$1}" + separatorAfter;
      } else if (text === "[]") {
        return "[$1]" + separatorAfter;
      }
      return this.getInsertTextForPlainText(text + separatorAfter);
    }
    getInsertTextForSnippetValue(value, separatorAfter) {
      const replacer = (value2) => {
        if (typeof value2 === "string") {
          if (value2[0] === "^") {
            return value2.substr(1);
          }
        }
        return JSON.stringify(value2);
      };
      return stringifyObject(value, "", replacer) + separatorAfter;
    }
    getInsertTextForGuessedValue(value, separatorAfter) {
      switch (typeof value) {
        case "object":
          if (value === null) {
            return "${1:null}" + separatorAfter;
          }
          return this.getInsertTextForValue(value, separatorAfter);
        case "string":
          let snippetValue = JSON.stringify(value);
          snippetValue = snippetValue.substr(1, snippetValue.length - 2);
          snippetValue = this.getInsertTextForPlainText(snippetValue);
          return '"${1:' + snippetValue + '}"' + separatorAfter;
        case "number":
        case "boolean":
          return "${1:" + JSON.stringify(value) + "}" + separatorAfter;
      }
      return this.getInsertTextForValue(value, separatorAfter);
    }
    getSuggestionKind(type) {
      if (Array.isArray(type)) {
        const array = type;
        type = array.length > 0 ? array[0] : void 0;
      }
      if (!type) {
        return CompletionItemKind.Value;
      }
      switch (type) {
        case "string":
          return CompletionItemKind.Value;
        case "object":
          return CompletionItemKind.Module;
        case "property":
          return CompletionItemKind.Property;
        default:
          return CompletionItemKind.Value;
      }
    }
    getLabelTextForMatchingNode(node, document) {
      switch (node.type) {
        case "array":
          return "[]";
        case "object":
          return "{}";
        default:
          const content = document.getText().substr(node.offset, node.length);
          return content;
      }
    }
    getInsertTextForMatchingNode(node, document, separatorAfter) {
      switch (node.type) {
        case "array":
          return this.getInsertTextForValue([], separatorAfter);
        case "object":
          return this.getInsertTextForValue({}, separatorAfter);
        default:
          const content = document.getText().substr(node.offset, node.length) + separatorAfter;
          return this.getInsertTextForPlainText(content);
      }
    }
    getInsertTextForProperty(key, propertySchema, addValue, separatorAfter) {
      const propertyText = this.getInsertTextForValue(key, "");
      if (!addValue) {
        return propertyText;
      }
      const resultText = propertyText + ": ";
      let value;
      let nValueProposals = 0;
      if (propertySchema) {
        if (Array.isArray(propertySchema.defaultSnippets)) {
          if (propertySchema.defaultSnippets.length === 1) {
            const body = propertySchema.defaultSnippets[0].body;
            if (isDefined(body)) {
              value = this.getInsertTextForSnippetValue(body, "");
            }
          }
          nValueProposals += propertySchema.defaultSnippets.length;
        }
        if (propertySchema.enum) {
          if (!value && propertySchema.enum.length === 1) {
            value = this.getInsertTextForGuessedValue(propertySchema.enum[0], "");
          }
          nValueProposals += propertySchema.enum.length;
        }
        if (isDefined(propertySchema.const)) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.const, "");
          }
          nValueProposals++;
        }
        if (isDefined(propertySchema.default)) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.default, "");
          }
          nValueProposals++;
        }
        if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.examples[0], "");
          }
          nValueProposals += propertySchema.examples.length;
        }
        if (nValueProposals === 0) {
          let type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
          if (!type) {
            if (propertySchema.properties) {
              type = "object";
            } else if (propertySchema.items) {
              type = "array";
            }
          }
          switch (type) {
            case "boolean":
              value = "$1";
              break;
            case "string":
              value = '"$1"';
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
            default:
              return propertyText;
          }
        }
      }
      if (!value || nValueProposals > 1) {
        value = "$1";
      }
      return resultText + value + separatorAfter;
    }
    getCurrentWord(document, offset) {
      let i = offset - 1;
      const text = document.getText();
      while (i >= 0 && ' 	\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
        i--;
      }
      return text.substring(i + 1, offset);
    }
    evaluateSeparatorAfter(document, offset) {
      const scanner = createScanner(document.getText(), true);
      scanner.setPosition(offset);
      const token = scanner.scan();
      switch (token) {
        case 5:
        case 2:
        case 4:
        case 17:
          return "";
        default:
          return ",";
      }
    }
    findItemAtOffset(node, document, offset) {
      const scanner = createScanner(document.getText(), true);
      const children = node.items;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (offset > child.offset + child.length) {
          scanner.setPosition(child.offset + child.length);
          const token = scanner.scan();
          if (token === 5 && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
            return i + 1;
          }
          return i;
        } else if (offset >= child.offset) {
          return i;
        }
      }
      return 0;
    }
    isInComment(document, start, offset) {
      const scanner = createScanner(document.getText(), false);
      scanner.setPosition(start);
      let token = scanner.scan();
      while (token !== 17 && scanner.getTokenOffset() + scanner.getTokenLength() < offset) {
        token = scanner.scan();
      }
      return (token === 12 || token === 13) && scanner.getTokenOffset() <= offset;
    }
    fromMarkup(markupString) {
      if (markupString && this.doesSupportMarkdown()) {
        return {
          kind: MarkupKind.Markdown,
          value: markupString
        };
      }
      return void 0;
    }
    doesSupportMarkdown() {
      var _a, _b, _c;
      if (!isDefined(this.supportsMarkdown)) {
        const documentationFormat = (_c = (_b = (_a = this.clientCapabilities.textDocument) == null ? void 0 : _a.completion) == null ? void 0 : _b.completionItem) == null ? void 0 : _c.documentationFormat;
        this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    }
    doesSupportsCommitCharacters() {
      var _a, _b, _c;
      if (!isDefined(this.supportsCommitCharacters)) {
        this.labelDetailsSupport = (_c = (_b = (_a = this.clientCapabilities.textDocument) == null ? void 0 : _a.completion) == null ? void 0 : _b.completionItem) == null ? void 0 : _c.commitCharactersSupport;
      }
      return this.supportsCommitCharacters;
    }
    doesSupportsLabelDetails() {
      var _a, _b, _c;
      if (!isDefined(this.labelDetailsSupport)) {
        this.labelDetailsSupport = (_c = (_b = (_a = this.clientCapabilities.textDocument) == null ? void 0 : _a.completion) == null ? void 0 : _b.completionItem) == null ? void 0 : _c.labelDetailsSupport;
      }
      return this.labelDetailsSupport;
    }
  }
  class JSONHover {
    constructor(schemaService, contributions = [], promiseConstructor) {
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promise = promiseConstructor || Promise;
    }
    doHover(document, position, doc) {
      const offset = document.offsetAt(position);
      let node = doc.getNodeFromOffset(offset);
      if (!node || (node.type === "object" || node.type === "array") && offset > node.offset + 1 && offset < node.offset + node.length - 1) {
        return this.promise.resolve(null);
      }
      const hoverRangeNode = node;
      if (node.type === "string") {
        const parent = node.parent;
        if (parent && parent.type === "property" && parent.keyNode === node) {
          node = parent.valueNode;
          if (!node) {
            return this.promise.resolve(null);
          }
        }
      }
      const hoverRange = Range.create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
      const createHover = (contents) => {
        const result = {
          contents,
          range: hoverRange
        };
        return result;
      };
      const location = getNodePath(node);
      for (let i = this.contributions.length - 1; i >= 0; i--) {
        const contribution = this.contributions[i];
        const promise = contribution.getInfoContribution(document.uri, location);
        if (promise) {
          return promise.then((htmlContent) => createHover(htmlContent));
        }
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
                if (s.schema.markdownEnumDescriptions) {
                  markdownEnumValueDescription = s.schema.markdownEnumDescriptions[idx];
                } else if (s.schema.enumDescriptions) {
                  markdownEnumValueDescription = toMarkdown(s.schema.enumDescriptions[idx]);
                }
                if (markdownEnumValueDescription) {
                  enumValue = s.schema.enum[idx];
                  if (typeof enumValue !== "string") {
                    enumValue = JSON.stringify(enumValue);
                  }
                }
              }
            }
            return true;
          });
          let result = "";
          if (title) {
            result = toMarkdown(title);
          }
          if (markdownDescription) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += markdownDescription;
          }
          if (markdownEnumValueDescription) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += `\`${toMarkdownCodeBlock(enumValue)}\`: ${markdownEnumValueDescription}`;
          }
          return createHover([result]);
        }
        return null;
      });
    }
  }
  function toMarkdown(plain) {
    if (plain) {
      const res = plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3");
      return res.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    return void 0;
  }
  function toMarkdownCodeBlock(content) {
    if (content.indexOf("`") !== -1) {
      return "`` " + content + " ``";
    }
    return content;
  }
  class JSONValidation {
    constructor(jsonSchemaService, promiseConstructor) {
      this.jsonSchemaService = jsonSchemaService;
      this.promise = promiseConstructor;
      this.validationEnabled = true;
    }
    configure(raw) {
      if (raw) {
        this.validationEnabled = raw.validate !== false;
        this.commentSeverity = raw.allowComments ? void 0 : DiagnosticSeverity.Error;
      }
    }
    doValidation(textDocument, jsonDocument, documentSettings, schema) {
      if (!this.validationEnabled) {
        return this.promise.resolve([]);
      }
      const diagnostics = [];
      const added = {};
      const addProblem = (problem) => {
        const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
        if (!added[signature]) {
          added[signature] = true;
          diagnostics.push(problem);
        }
      };
      const getDiagnostics = (schema2) => {
        let trailingCommaSeverity = (documentSettings == null ? void 0 : documentSettings.trailingCommas) ? toDiagnosticSeverity(documentSettings.trailingCommas) : DiagnosticSeverity.Error;
        let commentSeverity = (documentSettings == null ? void 0 : documentSettings.comments) ? toDiagnosticSeverity(documentSettings.comments) : this.commentSeverity;
        let schemaValidation = (documentSettings == null ? void 0 : documentSettings.schemaValidation) ? toDiagnosticSeverity(documentSettings.schemaValidation) : DiagnosticSeverity.Warning;
        let schemaRequest = (documentSettings == null ? void 0 : documentSettings.schemaRequest) ? toDiagnosticSeverity(documentSettings.schemaRequest) : DiagnosticSeverity.Warning;
        if (schema2) {
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
          if (schema2.errors.length) {
            addSchemaProblem(schema2.errors[0], ErrorCode.SchemaResolveError);
          } else if (schemaValidation) {
            for (const warning of schema2.warnings) {
              addSchemaProblem(warning, ErrorCode.SchemaUnsupportedFeature);
            }
            const semanticErrors = jsonDocument.validate(textDocument, schema2.schema, schemaValidation, documentSettings == null ? void 0 : documentSettings.schemaDraft);
            if (semanticErrors) {
              semanticErrors.forEach(addProblem);
            }
          }
          if (schemaAllowsComments(schema2.schema)) {
            commentSeverity = void 0;
          }
          if (schemaAllowsTrailingCommas(schema2.schema)) {
            trailingCommaSeverity = void 0;
          }
        }
        for (const p of jsonDocument.syntaxErrors) {
          if (p.code === ErrorCode.TrailingComma) {
            if (typeof trailingCommaSeverity !== "number") {
              continue;
            }
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
        const handle = this.jsonSchemaService.registerExternalSchema({ uri, schema });
        return handle.getResolvedSchema().then((resolvedSchema) => {
          return getDiagnostics(resolvedSchema);
        });
      }
      return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then((schema2) => {
        return getDiagnostics(schema2);
      });
    }
    getLanguageStatus(textDocument, jsonDocument) {
      return { schemas: this.jsonSchemaService.getSchemaURIsForResource(textDocument.uri, jsonDocument) };
    }
  }
  let idCounter$1 = 0;
  function schemaAllowsComments(schemaRef) {
    if (schemaRef && typeof schemaRef === "object") {
      if (isBoolean(schemaRef.allowComments)) {
        return schemaRef.allowComments;
      }
      if (schemaRef.allOf) {
        for (const schema of schemaRef.allOf) {
          const allow = schemaAllowsComments(schema);
          if (isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return void 0;
  }
  function schemaAllowsTrailingCommas(schemaRef) {
    if (schemaRef && typeof schemaRef === "object") {
      if (isBoolean(schemaRef.allowTrailingCommas)) {
        return schemaRef.allowTrailingCommas;
      }
      const deprSchemaRef = schemaRef;
      if (isBoolean(deprSchemaRef["allowsTrailingCommas"])) {
        return deprSchemaRef["allowsTrailingCommas"];
      }
      if (schemaRef.allOf) {
        for (const schema of schemaRef.allOf) {
          const allow = schemaAllowsTrailingCommas(schema);
          if (isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return void 0;
  }
  function toDiagnosticSeverity(severityLevel) {
    switch (severityLevel) {
      case "error":
        return DiagnosticSeverity.Error;
      case "warning":
        return DiagnosticSeverity.Warning;
      case "ignore":
        return void 0;
    }
    return void 0;
  }
  const Digit0 = 48;
  const Digit9 = 57;
  const A = 65;
  const a = 97;
  const f = 102;
  function hexDigit(charCode) {
    if (charCode < Digit0) {
      return 0;
    }
    if (charCode <= Digit9) {
      return charCode - Digit0;
    }
    if (charCode < a) {
      charCode += a - A;
    }
    if (charCode >= a && charCode <= f) {
      return charCode - a + 10;
    }
    return 0;
  }
  function colorFromHex(text) {
    if (text[0] !== "#") {
      return void 0;
    }
    switch (text.length) {
      case 4:
        return {
          red: hexDigit(text.charCodeAt(1)) * 17 / 255,
          green: hexDigit(text.charCodeAt(2)) * 17 / 255,
          blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
          alpha: 1
        };
      case 5:
        return {
          red: hexDigit(text.charCodeAt(1)) * 17 / 255,
          green: hexDigit(text.charCodeAt(2)) * 17 / 255,
          blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
          alpha: hexDigit(text.charCodeAt(4)) * 17 / 255
        };
      case 7:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
          green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
          blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
          alpha: 1
        };
      case 9:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
          green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
          blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
          alpha: (hexDigit(text.charCodeAt(7)) * 16 + hexDigit(text.charCodeAt(8))) / 255
        };
    }
    return void 0;
  }
  class JSONDocumentSymbols {
    constructor(schemaService) {
      this.schemaService = schemaService;
    }
    findDocumentSymbols(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
      const root = doc.root;
      if (!root) {
        return [];
      }
      let limit = context.resultLimit || Number.MAX_VALUE;
      const resourceString = document.uri;
      if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
        if (root.type === "array") {
          const result2 = [];
          for (const item of root.items) {
            if (item.type === "object") {
              for (const property of item.properties) {
                if (property.keyNode.value === "key" && property.valueNode) {
                  const location = Location.create(document.uri, getRange(document, item));
                  result2.push({ name: getName(property.valueNode), kind: SymbolKind.Function, location });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result2;
                  }
                }
              }
            }
          }
          return result2;
        }
      }
      const toVisit = [
        { node: root, containerName: "" }
      ];
      let nextToVisit = 0;
      let limitExceeded = false;
      const result = [];
      const collectOutlineEntries = (node, containerName) => {
        if (node.type === "array") {
          node.items.forEach((node2) => {
            if (node2) {
              toVisit.push({ node: node2, containerName });
            }
          });
        } else if (node.type === "object") {
          node.properties.forEach((property) => {
            const valueNode = property.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                const location = Location.create(document.uri, getRange(document, property));
                const childContainerName = containerName ? containerName + "." + property.keyNode.value : property.keyNode.value;
                result.push({ name: this.getKeyLabel(property), kind: this.getSymbolKind(valueNode.type), location, containerName });
                toVisit.push({ node: valueNode, containerName: childContainerName });
              } else {
                limitExceeded = true;
              }
            }
          });
        }
      };
      while (nextToVisit < toVisit.length) {
        const next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.containerName);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    }
    findDocumentSymbols2(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
      const root = doc.root;
      if (!root) {
        return [];
      }
      let limit = context.resultLimit || Number.MAX_VALUE;
      const resourceString = document.uri;
      if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
        if (root.type === "array") {
          const result2 = [];
          for (const item of root.items) {
            if (item.type === "object") {
              for (const property of item.properties) {
                if (property.keyNode.value === "key" && property.valueNode) {
                  const range = getRange(document, item);
                  const selectionRange = getRange(document, property.keyNode);
                  result2.push({ name: getName(property.valueNode), kind: SymbolKind.Function, range, selectionRange });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result2;
                  }
                }
              }
            }
          }
          return result2;
        }
      }
      const result = [];
      const toVisit = [
        { node: root, result }
      ];
      let nextToVisit = 0;
      let limitExceeded = false;
      const collectOutlineEntries = (node, result2) => {
        if (node.type === "array") {
          node.items.forEach((node2, index) => {
            if (node2) {
              if (limit > 0) {
                limit--;
                const range = getRange(document, node2);
                const selectionRange = range;
                const name = String(index);
                const symbol = { name, kind: this.getSymbolKind(node2.type), range, selectionRange, children: [] };
                result2.push(symbol);
                toVisit.push({ result: symbol.children, node: node2 });
              } else {
                limitExceeded = true;
              }
            }
          });
        } else if (node.type === "object") {
          node.properties.forEach((property) => {
            const valueNode = property.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                const range = getRange(document, property);
                const selectionRange = getRange(document, property.keyNode);
                const children = [];
                const symbol = { name: this.getKeyLabel(property), kind: this.getSymbolKind(valueNode.type), range, selectionRange, children, detail: this.getDetail(valueNode) };
                result2.push(symbol);
                toVisit.push({ result: children, node: valueNode });
              } else {
                limitExceeded = true;
              }
            }
          });
        }
      };
      while (nextToVisit < toVisit.length) {
        const next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.result);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    }
    getSymbolKind(nodeType) {
      switch (nodeType) {
        case "object":
          return SymbolKind.Module;
        case "string":
          return SymbolKind.String;
        case "number":
          return SymbolKind.Number;
        case "array":
          return SymbolKind.Array;
        case "boolean":
          return SymbolKind.Boolean;
        default:
          return SymbolKind.Variable;
      }
    }
    getKeyLabel(property) {
      let name = property.keyNode.value;
      if (name) {
        name = name.replace(/[\n]/g, "↵");
      }
      if (name && name.trim()) {
        return name;
      }
      return `"${name}"`;
    }
    getDetail(node) {
      if (!node) {
        return void 0;
      }
      if (node.type === "boolean" || node.type === "number" || node.type === "null" || node.type === "string") {
        return String(node.value);
      } else {
        if (node.type === "array") {
          return node.children.length ? void 0 : "[]";
        } else if (node.type === "object") {
          return node.children.length ? void 0 : "{}";
        }
      }
      return void 0;
    }
    findDocumentColors(document, doc, context) {
      return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
        const result = [];
        if (schema) {
          let limit = context && typeof context.resultLimit === "number" ? context.resultLimit : Number.MAX_VALUE;
          const matchingSchemas = doc.getMatchingSchemas(schema.schema);
          const visitedNode = {};
          for (const s of matchingSchemas) {
            if (!s.inverted && s.schema && (s.schema.format === "color" || s.schema.format === "color-hex") && s.node && s.node.type === "string") {
              const nodeId = String(s.node.offset);
              if (!visitedNode[nodeId]) {
                const color = colorFromHex(getNodeValue(s.node));
                if (color) {
                  const range = getRange(document, s.node);
                  result.push({ color, range });
                }
                visitedNode[nodeId] = true;
                limit--;
                if (limit <= 0) {
                  if (context && context.onResultLimitExceeded) {
                    context.onResultLimitExceeded(document.uri);
                  }
                  return result;
                }
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
      if (color.alpha === 1) {
        label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}`;
      } else {
        label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}${toTwoDigitHex(Math.round(color.alpha * 255))}`;
      }
      result.push({ label, textEdit: TextEdit.replace(range, JSON.stringify(label)) });
      return result;
    }
  }
  function getRange(document, node) {
    return Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
  }
  function getName(node) {
    return getNodeValue(node) || t("<empty>");
  }
  const schemaContributions = {
    schemaAssociations: [],
    schemas: {
      // bundle the schema-schema to include (localized) descriptions
      "http://json-schema.org/draft-04/schema#": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "definitions": {
          "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": {
              "$ref": "#"
            }
          },
          "positiveInteger": {
            "type": "integer",
            "minimum": 0
          },
          "positiveIntegerDefault0": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveInteger"
              },
              {
                "default": 0
              }
            ]
          },
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
            "items": {
              "type": "string"
            },
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
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "default": {},
          "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
          },
          "maximum": {
            "type": "number"
          },
          "exclusiveMaximum": {
            "type": "boolean",
            "default": false
          },
          "minimum": {
            "type": "number"
          },
          "exclusiveMinimum": {
            "type": "boolean",
            "default": false
          },
          "maxLength": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveInteger"
              }
            ]
          },
          "minLength": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveIntegerDefault0"
              }
            ]
          },
          "pattern": {
            "type": "string",
            "format": "regex"
          },
          "additionalItems": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#"
              }
            ],
            "default": {}
          },
          "items": {
            "anyOf": [
              {
                "$ref": "#"
              },
              {
                "$ref": "#/definitions/schemaArray"
              }
            ],
            "default": {}
          },
          "maxItems": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveInteger"
              }
            ]
          },
          "minItems": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveIntegerDefault0"
              }
            ]
          },
          "uniqueItems": {
            "type": "boolean",
            "default": false
          },
          "maxProperties": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveInteger"
              }
            ]
          },
          "minProperties": {
            "allOf": [
              {
                "$ref": "#/definitions/positiveIntegerDefault0"
              }
            ]
          },
          "required": {
            "allOf": [
              {
                "$ref": "#/definitions/stringArray"
              }
            ]
          },
          "additionalProperties": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#"
              }
            ],
            "default": {}
          },
          "definitions": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#"
            },
            "default": {}
          },
          "properties": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#"
            },
            "default": {}
          },
          "patternProperties": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#"
            },
            "default": {}
          },
          "dependencies": {
            "type": "object",
            "additionalProperties": {
              "anyOf": [
                {
                  "$ref": "#"
                },
                {
                  "$ref": "#/definitions/stringArray"
                }
              ]
            }
          },
          "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
          },
          "type": {
            "anyOf": [
              {
                "$ref": "#/definitions/simpleTypes"
              },
              {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/simpleTypes"
                },
                "minItems": 1,
                "uniqueItems": true
              }
            ]
          },
          "format": {
            "anyOf": [
              {
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
              },
              {
                "type": "string"
              }
            ]
          },
          "allOf": {
            "allOf": [
              {
                "$ref": "#/definitions/schemaArray"
              }
            ]
          },
          "anyOf": {
            "allOf": [
              {
                "$ref": "#/definitions/schemaArray"
              }
            ]
          },
          "oneOf": {
            "allOf": [
              {
                "$ref": "#/definitions/schemaArray"
              }
            ]
          },
          "not": {
            "allOf": [
              {
                "$ref": "#"
              }
            ]
          }
        },
        "dependencies": {
          "exclusiveMaximum": [
            "maximum"
          ],
          "exclusiveMinimum": [
            "minimum"
          ]
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
          "nonNegativeIntegerDefault0": {
            "allOf": [
              { "$ref": "#/definitions/nonNegativeInteger" },
              { "default": 0 }
            ]
          },
          "simpleTypes": {
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
          "$comment": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
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
          "maximum": {
            "type": "number"
          },
          "exclusiveMaximum": {
            "type": "number"
          },
          "minimum": {
            "type": "number"
          },
          "exclusiveMinimum": {
            "type": "number"
          },
          "maxLength": { "$ref": "#/definitions/nonNegativeInteger" },
          "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
          "pattern": {
            "type": "string",
            "format": "regex"
          },
          "additionalItems": { "$ref": "#" },
          "items": {
            "anyOf": [
              { "$ref": "#" },
              { "$ref": "#/definitions/schemaArray" }
            ],
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
            "additionalProperties": {
              "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/stringArray" }
              ]
            }
          },
          "propertyNames": { "$ref": "#" },
          "const": true,
          "enum": {
            "type": "array",
            "items": true,
            "minItems": 1,
            "uniqueItems": true
          },
          "type": {
            "anyOf": [
              { "$ref": "#/definitions/simpleTypes" },
              {
                "type": "array",
                "items": { "$ref": "#/definitions/simpleTypes" },
                "minItems": 1,
                "uniqueItems": true
              }
            ]
          },
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
    contains: t('An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'),
    propertyNames: t("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
    const: t("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
    contentMediaType: t("Describes the media type of a string property."),
    contentEncoding: t("Describes the content encoding of a string property."),
    if: t('The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'),
    then: t('The "then" subschema is used for validation when the "if" subschema succeeds.'),
    else: t('The "else" subschema is used for validation when the "if" subschema fails.')
  };
  for (const schemaName in schemaContributions.schemas) {
    const schema = schemaContributions.schemas[schemaName];
    for (const property in schema.properties) {
      let propertyObject = schema.properties[property];
      if (typeof propertyObject === "boolean") {
        propertyObject = schema.properties[property] = {};
      }
      const description = descriptions[property];
      if (description) {
        propertyObject["description"] = description;
      }
    }
  }
  function createRegex(glob, opts) {
    if (typeof glob !== "string") {
      throw new TypeError("Expected a string");
    }
    const str = String(glob);
    let reStr = "";
    const extended = opts ? true : false;
    const globstar = opts ? true : false;
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
        case "?":
          if (extended) {
            reStr += ".";
            break;
          }
        case "[":
        case "]":
          if (extended) {
            reStr += c;
            break;
          }
        case "{":
          if (extended) {
            inGroup = true;
            reStr += "(";
            break;
          }
        case "}":
          if (extended) {
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
          if (!globstar) {
            reStr += ".*";
          } else {
            const isGlobstar = starCount > 1 && (prevChar === "/" || prevChar === void 0 || prevChar === "{" || prevChar === ",") && (nextChar === "/" || nextChar === void 0 || nextChar === "," || nextChar === "}");
            if (isGlobstar) {
              if (nextChar === "/") {
                i++;
              } else if (prevChar === "/" && reStr.endsWith("\\/")) {
                reStr = reStr.substr(0, reStr.length - 2);
              }
              reStr += "((?:[^/]*(?:/|$))*)";
            } else {
              reStr += "([^/]*)";
            }
          }
          break;
        default:
          reStr += c;
      }
    }
    if (!flags || !~flags.indexOf("g")) {
      reStr = "^" + reStr + "$";
    }
    return new RegExp(reStr, flags);
  }
  const BANG = "!";
  const PATH_SEP = "/";
  class FilePatternAssociation {
    constructor(pattern, folderUri, uris) {
      this.folderUri = folderUri;
      this.uris = uris;
      this.globWrappers = [];
      try {
        for (let patternString of pattern) {
          const include = patternString[0] !== BANG;
          if (!include) {
            patternString = patternString.substring(1);
          }
          if (patternString.length > 0) {
            if (patternString[0] === PATH_SEP) {
              patternString = patternString.substring(1);
            }
            this.globWrappers.push({
              regexp: createRegex("**/" + patternString, { extended: true, globstar: true }),
              include
            });
          }
        }
        ;
        if (folderUri) {
          folderUri = normalizeResourceForMatching(folderUri);
          if (!folderUri.endsWith("/")) {
            folderUri = folderUri + "/";
          }
          this.folderUri = folderUri;
        }
      } catch (e) {
        this.globWrappers.length = 0;
        this.uris = [];
      }
    }
    matchesPattern(fileName) {
      if (this.folderUri && !fileName.startsWith(this.folderUri)) {
        return false;
      }
      let match = false;
      for (const { regexp, include } of this.globWrappers) {
        if (regexp.test(fileName)) {
          match = include;
        }
      }
      return match;
    }
    getURIs() {
      return this.uris;
    }
  }
  class SchemaHandle {
    constructor(service, uri, unresolvedSchemaContent) {
      this.service = service;
      this.uri = uri;
      this.dependencies = /* @__PURE__ */ new Set();
      this.anchors = void 0;
      if (unresolvedSchemaContent) {
        this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
      }
    }
    getUnresolvedSchema() {
      if (!this.unresolvedSchema) {
        this.unresolvedSchema = this.service.loadSchema(this.uri);
      }
      return this.unresolvedSchema;
    }
    getResolvedSchema() {
      if (!this.resolvedSchema) {
        this.resolvedSchema = this.getUnresolvedSchema().then((unresolved) => {
          return this.service.resolveSchemaContent(unresolved, this);
        });
      }
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
  }
  class UnresolvedSchema {
    constructor(schema, errors = []) {
      this.schema = schema;
      this.errors = errors;
    }
  }
  class ResolvedSchema {
    constructor(schema, errors = [], warnings = [], schemaDraft) {
      this.schema = schema;
      this.errors = errors;
      this.warnings = warnings;
      this.schemaDraft = schemaDraft;
    }
    getSection(path) {
      const schemaRef = this.getSectionRecursive(path, this.schema);
      if (schemaRef) {
        return asSchema(schemaRef);
      }
      return void 0;
    }
    getSectionRecursive(path, schema) {
      if (!schema || typeof schema === "boolean" || path.length === 0) {
        return schema;
      }
      const next = path.shift();
      if (schema.properties && typeof schema.properties[next]) {
        return this.getSectionRecursive(path, schema.properties[next]);
      } else if (schema.patternProperties) {
        for (const pattern of Object.keys(schema.patternProperties)) {
          const regex = extendedRegExp(pattern);
          if (regex == null ? void 0 : regex.test(next)) {
            return this.getSectionRecursive(path, schema.patternProperties[pattern]);
          }
        }
      } else if (typeof schema.additionalProperties === "object") {
        return this.getSectionRecursive(path, schema.additionalProperties);
      } else if (next.match("[0-9]+")) {
        if (Array.isArray(schema.items)) {
          const index = parseInt(next, 10);
          if (!isNaN(index) && schema.items[index]) {
            return this.getSectionRecursive(path, schema.items[index]);
          }
        } else if (schema.items) {
          return this.getSectionRecursive(path, schema.items);
        }
      }
      return void 0;
    }
  }
  class JSONSchemaService {
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
      while (this.callOnDispose.length > 0) {
        this.callOnDispose.pop()();
      }
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
            if (handle.uri !== curr) {
              toWalk.push(handle.uri);
            }
            if (handle.clearSchema()) {
              hasChanges = true;
            }
            all[i] = void 0;
          }
        }
      }
      return hasChanges;
    }
    setSchemaContributions(schemaContributions2) {
      if (schemaContributions2.schemas) {
        const schemas = schemaContributions2.schemas;
        for (const id in schemas) {
          const normalizedId = normalizeId(id);
          this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
        }
      }
      if (Array.isArray(schemaContributions2.schemaAssociations)) {
        const schemaAssociations = schemaContributions2.schemaAssociations;
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
      if (config.fileMatch && config.fileMatch.length) {
        this.addFilePatternAssociation(config.fileMatch, config.folderUri, [id]);
      }
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
      for (const contributionAssociation of this.contributionAssociations) {
        this.filePatternAssociations.push(contributionAssociation);
      }
    }
    getResolvedSchema(schemaId) {
      const id = normalizeId(schemaId);
      const schemaHandle = this.schemasById[id];
      if (schemaHandle) {
        return schemaHandle.getResolvedSchema();
      }
      return this.promise.resolve(void 0);
    }
    loadSchema(url) {
      if (!this.requestService) {
        const errorMessage = t("Unable to load schema from '{0}'. No schema request service available", toDisplayString(url));
        return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
      }
      if (url.startsWith("http://json-schema.org/")) {
        url = "https" + url.substring(4);
      }
      return this.requestService(url).then((content) => {
        if (!content) {
          const errorMessage = t("Unable to load schema from '{0}': No content.", toDisplayString(url));
          return new UnresolvedSchema({}, [errorMessage]);
        }
        const errors = [];
        if (content.charCodeAt(0) === 65279) {
          errors.push(t("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", toDisplayString(url)));
          content = content.trimStart();
        }
        let schemaContent = {};
        const jsonErrors = [];
        schemaContent = parse$1(content, jsonErrors);
        if (jsonErrors.length) {
          errors.push(t("Unable to parse content from '{0}': Parse error at offset {1}.", toDisplayString(url), jsonErrors[0].offset));
        }
        return new UnresolvedSchema(schemaContent, errors);
      }, (error) => {
        let errorMessage = error.toString();
        const errorSplit = error.toString().split("Error: ");
        if (errorSplit.length > 1) {
          errorMessage = errorSplit[1];
        }
        if (endsWith(errorMessage, ".")) {
          errorMessage = errorMessage.substr(0, errorMessage.length - 1);
        }
        return new UnresolvedSchema({}, [t("Unable to load schema from '{0}': {1}.", toDisplayString(url), errorMessage)]);
      });
    }
    resolveSchemaContent(schemaToResolve, handle) {
      const resolveErrors = schemaToResolve.errors.slice(0);
      const schema = schemaToResolve.schema;
      let schemaDraft = schema.$schema ? normalizeId(schema.$schema) : void 0;
      if (schemaDraft === "http://json-schema.org/draft-03/schema") {
        return this.promise.resolve(new ResolvedSchema({}, [t("Draft-03 schemas are not supported.")], [], schemaDraft));
      }
      let usesUnsupportedFeatures = /* @__PURE__ */ new Set();
      const contextService = this.contextService;
      const findSectionByJSONPointer = (schema2, path) => {
        path = decodeURIComponent(path);
        let current = schema2;
        if (path[0] === "/") {
          path = path.substring(1);
        }
        path.split("/").some((part) => {
          part = part.replace(/~1/g, "/").replace(/~0/g, "~");
          current = current[part];
          return !current;
        });
        return current;
      };
      const findSchemaById = (schema2, handle2, id) => {
        if (!handle2.anchors) {
          handle2.anchors = collectAnchors(schema2);
        }
        return handle2.anchors.get(id);
      };
      const merge = (target, section) => {
        for (const key in section) {
          if (section.hasOwnProperty(key) && key !== "id" && key !== "$id") {
            target[key] = section[key];
          }
        }
      };
      const mergeRef = (target, sourceRoot, sourceHandle, refSegment) => {
        let section;
        if (refSegment === void 0 || refSegment.length === 0) {
          section = sourceRoot;
        } else if (refSegment.charAt(0) === "/") {
          section = findSectionByJSONPointer(sourceRoot, refSegment);
        } else {
          section = findSchemaById(sourceRoot, sourceHandle, refSegment);
        }
        if (section) {
          merge(target, section);
        } else {
          resolveErrors.push(t("$ref '{0}' in '{1}' can not be resolved.", refSegment || "", sourceHandle.uri));
        }
      };
      const resolveExternalLink = (node, uri, refSegment, parentHandle) => {
        if (contextService && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/.*/.test(uri)) {
          uri = contextService.resolveRelativePath(uri, parentHandle.uri);
        }
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
            } else {
              if (!seenRefs.has(ref)) {
                const id = segments[1];
                mergeRef(next, parentSchema, parentHandle, id);
                seenRefs.add(ref);
              }
            }
          }
          if (next.$recursiveRef) {
            usesUnsupportedFeatures.add("$recursiveRef");
          }
          if (next.$dynamicRef) {
            usesUnsupportedFeatures.add("$dynamicRef");
          }
        });
        return this.promise.all(openPromises);
      };
      const collectAnchors = (root) => {
        const result = /* @__PURE__ */ new Map();
        this.traverseNodes(root, (next) => {
          const id = next.$id || next.id;
          const anchor = isString(id) && id.charAt(0) === "#" ? id.substring(1) : next.$anchor;
          if (anchor) {
            if (result.has(anchor)) {
              resolveErrors.push(t("Duplicate anchor declaration: '{0}'", anchor));
            } else {
              result.set(anchor, next);
            }
          }
          if (next.$recursiveAnchor) {
            usesUnsupportedFeatures.add("$recursiveAnchor");
          }
          if (next.$dynamicAnchor) {
            usesUnsupportedFeatures.add("$dynamicAnchor");
          }
        });
        return result;
      };
      return resolveRefs(schema, schema, handle).then((_) => {
        let resolveWarnings = [];
        if (usesUnsupportedFeatures.size) {
          resolveWarnings.push(t("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(usesUnsupportedFeatures.keys()).join(", ")));
        }
        return new ResolvedSchema(schema, resolveErrors, resolveWarnings, schemaDraft);
      });
    }
    traverseNodes(root, handle) {
      if (!root || typeof root !== "object") {
        return Promise.resolve(null);
      }
      const seen = /* @__PURE__ */ new Set();
      const collectEntries = (...entries) => {
        for (const entry of entries) {
          if (isObject(entry)) {
            toWalk.push(entry);
          }
        }
      };
      const collectMapEntries = (...maps) => {
        for (const map of maps) {
          if (isObject(map)) {
            for (const k in map) {
              const key = k;
              const entry = map[key];
              if (isObject(entry)) {
                toWalk.push(entry);
              }
            }
          }
        }
      };
      const collectArrayEntries = (...arrays) => {
        for (const array of arrays) {
          if (Array.isArray(array)) {
            for (const entry of array) {
              if (isObject(entry)) {
                toWalk.push(entry);
              }
            }
          }
        }
      };
      const collectEntryOrArrayEntries = (items) => {
        if (Array.isArray(items)) {
          for (const entry of items) {
            if (isObject(entry)) {
              toWalk.push(entry);
            }
          }
        } else if (isObject(items)) {
          toWalk.push(items);
        }
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
      var _a, _b;
      if (((_a = document.root) == null ? void 0 : _a.type) === "object") {
        for (const p of document.root.properties) {
          if (p.keyNode.value === "$schema" && ((_b = p.valueNode) == null ? void 0 : _b.type) === "string") {
            let schemaId = p.valueNode.value;
            if (this.contextService && !/^\w[\w\d+.-]*:/.test(schemaId)) {
              schemaId = this.contextService.resolveRelativePath(schemaId, resource);
            }
            return schemaId;
          }
        }
      }
      return void 0;
    }
    getAssociatedSchemas(resource) {
      const seen = /* @__PURE__ */ Object.create(null);
      const schemas = [];
      const normalizedResource = normalizeResourceForMatching(resource);
      for (const entry of this.filePatternAssociations) {
        if (entry.matchesPattern(normalizedResource)) {
          for (const schemaId of entry.getURIs()) {
            if (!seen[schemaId]) {
              schemas.push(schemaId);
              seen[schemaId] = true;
            }
          }
        }
      }
      return schemas;
    }
    getSchemaURIsForResource(resource, document) {
      let schemeId = document && this.getSchemaFromProperty(resource, document);
      if (schemeId) {
        return [schemeId];
      }
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
      if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) {
        return this.cachedSchemaForResource.resolvedSchema;
      }
      const schemas = this.getAssociatedSchemas(resource);
      const resolvedSchema = schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(void 0);
      this.cachedSchemaForResource = { resource, resolvedSchema };
      return resolvedSchema;
    }
    createCombinedSchema(resource, schemaIds) {
      if (schemaIds.length === 1) {
        return this.getOrAddSchemaHandle(schemaIds[0]);
      } else {
        const combinedSchemaId = "schemaservice://combinedSchema/" + encodeURIComponent(resource);
        const combinedSchema = {
          allOf: schemaIds.map((schemaId) => ({ $ref: schemaId }))
        };
        return this.addSchemaHandle(combinedSchemaId, combinedSchema);
      }
    }
    getMatchingSchemas(document, jsonDocument, schema) {
      if (schema) {
        const id = schema.id || "schemaservice://untitled/matchingSchemas/" + idCounter++;
        const handle = this.addSchemaHandle(id, schema);
        return handle.getResolvedSchema().then((resolvedSchema) => {
          return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter((s) => !s.inverted);
        });
      }
      return this.getSchemaForResource(document.uri, jsonDocument).then((schema2) => {
        if (schema2) {
          return jsonDocument.getMatchingSchemas(schema2.schema).filter((s) => !s.inverted);
        }
        return [];
      });
    }
  }
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
      return URI.parse(resource).with({ fragment: null, query: null }).toString(true);
    } catch (e) {
      return resource;
    }
  }
  function toDisplayString(url) {
    try {
      const uri = URI.parse(url);
      if (uri.scheme === "file") {
        return uri.fsPath;
      }
    } catch (e) {
    }
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
          const range = { startLine, endLine: startLine, kind: token === 1 ? "object" : "array" };
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
          if (scanner.getTokenError() === 1 && startLine + 1 < document.lineCount) {
            scanner.setPosition(document.offsetAt(Position.create(startLine + 1, 0)));
          } else {
            if (startLine < endLine) {
              addRange({ startLine, endLine, kind: FoldingRangeKind.Comment });
              prevStart = startLine;
            }
          }
          break;
        }
        case 12: {
          const text = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
          const m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
          if (m) {
            const line = document.positionAt(scanner.getTokenOffset()).line;
            if (m[1]) {
              const range = { startLine: line, endLine: line, kind: FoldingRangeKind.Region };
              stack.push(range);
            } else {
              let i = stack.length - 1;
              while (i >= 0 && stack[i].kind !== FoldingRangeKind.Region) {
                i--;
              }
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
    if (typeof rangeLimit !== "number" || ranges.length <= rangeLimit) {
      return ranges;
    }
    if (context && context.onRangeLimitExceeded) {
      context.onRangeLimitExceeded(document.uri);
    }
    const counts = [];
    for (let level of nestingLevels) {
      if (level < 30) {
        counts[level] = (counts[level] || 0) + 1;
      }
    }
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
        if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) {
          result.push(ranges[i]);
        }
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
            if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
              result.push(newRange(cStart, cEnd));
            }
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
          const afterCommaOffset = getOffsetAfterNextToken(
            node.offset + node.length,
            5
            /* SyntaxKind.CommaToken */
          );
          if (afterCommaOffset !== -1) {
            result.push(newRange(node.offset, afterCommaOffset));
          }
        }
        node = node.parent;
      }
      let current = void 0;
      for (let index = result.length - 1; index >= 0; index--) {
        current = SelectionRange.create(result[index], current);
      }
      if (!current) {
        current = SelectionRange.create(Range.create(position, position));
      }
      return current;
    }
    function newRange(start, end) {
      return Range.create(document.positionAt(start), document.positionAt(end));
    }
    const scanner = createScanner(document.getText(), true);
    function getOffsetAfterNextToken(offset, expectedToken) {
      scanner.setPosition(offset);
      let token = scanner.scan();
      if (token === expectedToken) {
        return scanner.getTokenOffset() + scanner.getTokenLength();
      }
      return -1;
    }
    return positions.map(getSelectionRange);
  }
  function format(documentToFormat, formattingOptions, formattingRange) {
    let range = void 0;
    if (formattingRange) {
      const offset = documentToFormat.offsetAt(formattingRange.start);
      const length = documentToFormat.offsetAt(formattingRange.end) - offset;
      range = { offset, length };
    }
    const options = {
      tabSize: formattingOptions ? formattingOptions.tabSize : 4,
      insertSpaces: (formattingOptions == null ? void 0 : formattingOptions.insertSpaces) === true,
      insertFinalNewline: (formattingOptions == null ? void 0 : formattingOptions.insertFinalNewline) === true,
      eol: "\n",
      keepLines: (formattingOptions == null ? void 0 : formattingOptions.keepLines) === true
    };
    return format$2(documentToFormat.getText(), range, options).map((edit) => {
      return TextEdit.replace(Range.create(documentToFormat.positionAt(edit.offset), documentToFormat.positionAt(edit.offset + edit.length)), edit.content);
    });
  }
  var Container;
  (function(Container2) {
    Container2[Container2["Object"] = 0] = "Object";
    Container2[Container2["Array"] = 1] = "Array";
  })(Container || (Container = {}));
  class PropertyTree {
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
        if (childProperty.noKeyName) {
          insertionIndex = this.childrenProperties.length;
        } else {
          insertionIndex = binarySearchOnPropertyArray(this.childrenProperties, childProperty, compareProperties);
        }
        if (insertionIndex < 0) {
          insertionIndex = insertionIndex * -1 - 1;
        }
        this.childrenProperties.splice(insertionIndex, 0, childProperty);
      } else {
        this.childrenProperties.push(childProperty);
      }
      return childProperty;
    }
  }
  function compareProperties(propertyTree1, propertyTree2) {
    const propertyName1 = propertyTree1.propertyName.toLowerCase();
    const propertyName2 = propertyTree2.propertyName.toLowerCase();
    if (propertyName1 < propertyName2) {
      return -1;
    } else if (propertyName1 > propertyName2) {
      return 1;
    }
    return 0;
  }
  function binarySearchOnPropertyArray(propertyTreeArray, propertyTree, compare_fn) {
    const propertyName = propertyTree.propertyName.toLowerCase();
    const firstPropertyInArrayName = propertyTreeArray[0].propertyName.toLowerCase();
    const lastPropertyInArrayName = propertyTreeArray[propertyTreeArray.length - 1].propertyName.toLowerCase();
    if (propertyName < firstPropertyInArrayName) {
      return 0;
    }
    if (propertyName > lastPropertyInArrayName) {
      return propertyTreeArray.length;
    }
    let m = 0;
    let n = propertyTreeArray.length - 1;
    while (m <= n) {
      let k = n + m >> 1;
      let cmp = compare_fn(propertyTree, propertyTreeArray[k]);
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return k;
      }
    }
    return -m - 1;
  }
  function sort(documentToSort, formattingOptions) {
    const options = {
      ...formattingOptions,
      keepLines: false
      // keepLines must be false so that the properties are on separate lines for the sorting
    };
    const formattedJsonString = TextDocument.applyEdits(documentToSort, format(documentToSort, options, void 0));
    const formattedJsonDocument = TextDocument.create("test://test.json", "json", 0, formattedJsonString);
    const jsonPropertyTree = findJsoncPropertyTree(formattedJsonDocument);
    const sortedJsonDocument = sortJsoncDocument(formattedJsonDocument, jsonPropertyTree);
    const edits = format(sortedJsonDocument, options, void 0);
    const sortedAndFormattedJsonDocument = TextDocument.applyEdits(sortedJsonDocument, edits);
    return [TextEdit.replace(Range.create(Position.create(0, 0), documentToSort.positionAt(documentToSort.getText().length)), sortedAndFormattedJsonDocument)];
  }
  function findJsoncPropertyTree(formattedDocument) {
    const formattedString = formattedDocument.getText();
    const scanner = createScanner(formattedString, false);
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
        let endLineNumber2 = scanner.getTokenStartLine();
        if (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) {
          lastProperty.endLineNumber = endLineNumber2 - 1;
        } else {
          currentProperty.endLineNumber = endLineNumber2 - 1;
        }
        beginningLineNumber = endLineNumber2;
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
        // When a string is found, if it follows an open brace or a comma token and it is within an object, then it corresponds to a key name, not a simple string
        case 10: {
          if (lastNonTriviaNonCommentToken === void 0 || lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 5 && currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
            const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
            lastProperty = currentProperty;
            currentProperty = currentTree.addChildProperty(childProperty);
          }
          break;
        }
        // When the token is an open bracket, then we enter into an array
        case 3: {
          if (rootTree.beginningLineNumber === void 0) {
            rootTree.beginningLineNumber = scanner.getTokenStartLine();
          }
          if (currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
            currentTree = currentProperty;
          } else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
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
        }
        // When the token is an open brace, then we enter into an object
        case 1: {
          if (rootTree.beginningLineNumber === void 0) {
            rootTree.beginningLineNumber = scanner.getTokenStartLine();
          } else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
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
        }
        case 4: {
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
        }
        case 2: {
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
        }
        case 5: {
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
        }
        case 13: {
          if (lastNonTriviaNonCommentToken === 5 && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine() && (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object)) {
            if (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
              currentProperty.endLineNumber = void 0;
              updateLastPropertyEndLineNumber = true;
            }
          }
          if ((lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 3) && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine()) {
            updateBeginningLineNumber = true;
          }
          break;
        }
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
    if (propertyTree.childrenProperties.length === 0) {
      return jsonDocument;
    }
    const sortedJsonDocument = TextDocument.create("test://test.json", "json", 0, jsonDocument.getText());
    const queueToSort = [];
    updateSortingQueue(queueToSort, propertyTree, propertyTree.beginningLineNumber);
    while (queueToSort.length > 0) {
      const dataToSort = queueToSort.shift();
      const propertyTreeArray = dataToSort.propertyTreeArray;
      let beginningLineNumber = dataToSort.beginningLineNumber;
      for (let i = 0; i < propertyTreeArray.length; i++) {
        const propertyTree2 = propertyTreeArray[i];
        const range = Range.create(Position.create(propertyTree2.beginningLineNumber, 0), Position.create(propertyTree2.endLineNumber + 1, 0));
        const jsonContentToReplace = jsonDocument.getText(range);
        const jsonDocumentToReplace = TextDocument.create("test://test.json", "json", 0, jsonContentToReplace);
        if (propertyTree2.lastProperty === true && i !== propertyTreeArray.length - 1) {
          const lineWhereToAddComma = propertyTree2.lineWhereToAddComma - propertyTree2.beginningLineNumber;
          const indexWhereToAddComma = propertyTree2.indexWhereToAddComa;
          const edit2 = {
            range: Range.create(Position.create(lineWhereToAddComma, indexWhereToAddComma), Position.create(lineWhereToAddComma, indexWhereToAddComma)),
            text: ","
          };
          TextDocument.update(jsonDocumentToReplace, [edit2], 1);
        } else if (propertyTree2.lastProperty === false && i === propertyTreeArray.length - 1) {
          const commaIndex = propertyTree2.commaIndex;
          const commaLine = propertyTree2.commaLine;
          const lineWhereToRemoveComma = commaLine - propertyTree2.beginningLineNumber;
          const edit2 = {
            range: Range.create(Position.create(lineWhereToRemoveComma, commaIndex), Position.create(lineWhereToRemoveComma, commaIndex + 1)),
            text: ""
          };
          TextDocument.update(jsonDocumentToReplace, [edit2], 1);
        }
        const length = propertyTree2.endLineNumber - propertyTree2.beginningLineNumber + 1;
        const edit = {
          range: Range.create(Position.create(beginningLineNumber, 0), Position.create(beginningLineNumber + length, 0)),
          text: jsonDocumentToReplace.getText()
        };
        TextDocument.update(sortedJsonDocument, [edit], 1);
        updateSortingQueue(queueToSort, propertyTree2, beginningLineNumber);
        beginningLineNumber = beginningLineNumber + length;
      }
    }
    return sortedJsonDocument;
  }
  function sortProperties(properties) {
    properties.sort((a2, b) => a2.propertyName.localeCompare(b.propertyName));
  }
  function updateSortingQueue(queue2, propertyTree, beginningLineNumber) {
    if (propertyTree.childrenProperties.length === 0) {
      return;
    }
    if (propertyTree.type === Container.Object) {
      let minimumBeginningLineNumber = Infinity;
      for (const childProperty of propertyTree.childrenProperties) {
        if (childProperty.beginningLineNumber < minimumBeginningLineNumber) {
          minimumBeginningLineNumber = childProperty.beginningLineNumber;
        }
      }
      const diff = minimumBeginningLineNumber - propertyTree.beginningLineNumber;
      beginningLineNumber = beginningLineNumber + diff;
      sortProperties(propertyTree.childrenProperties);
      queue2.push(new SortingRange(beginningLineNumber, propertyTree.childrenProperties));
    } else if (propertyTree.type === Container.Array) {
      updateSortingQueueForArrayProperties(queue2, propertyTree, beginningLineNumber);
    }
  }
  function updateSortingQueueForArrayProperties(queue2, propertyTree, beginningLineNumber) {
    for (const subObject of propertyTree.childrenProperties) {
      if (subObject.type === Container.Object) {
        let minimumBeginningLineNumber = Infinity;
        for (const childProperty of subObject.childrenProperties) {
          if (childProperty.beginningLineNumber < minimumBeginningLineNumber) {
            minimumBeginningLineNumber = childProperty.beginningLineNumber;
          }
        }
        const diff = minimumBeginningLineNumber - subObject.beginningLineNumber;
        queue2.push(new SortingRange(beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber + diff, subObject.childrenProperties));
      }
      if (subObject.type === Container.Array) {
        updateSortingQueueForArrayProperties(queue2, subObject, beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber);
      }
    }
  }
  class SortingRange {
    constructor(beginningLineNumber, propertyTreeArray) {
      this.beginningLineNumber = beginningLineNumber;
      this.propertyTreeArray = propertyTreeArray;
    }
  }
  function findLinks(document, doc) {
    const links = [];
    doc.visit((node) => {
      var _a;
      if (node.type === "property" && node.keyNode.value === "$ref" && ((_a = node.valueNode) == null ? void 0 : _a.type) === "string") {
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
    if (!tokens) {
      return null;
    }
    return findNode(tokens, doc.root);
  }
  function findNode(pointer, node) {
    if (!node) {
      return null;
    }
    if (pointer.length === 0) {
      return node;
    }
    const token = pointer.shift();
    if (node && node.type === "object") {
      const propertyNode = node.properties.find((propertyNode2) => propertyNode2.keyNode.value === token);
      if (!propertyNode) {
        return null;
      }
      return findNode(pointer, propertyNode.valueNode);
    } else if (node && node.type === "array") {
      if (token.match(/^(0|[1-9][0-9]*)$/)) {
        const index = Number.parseInt(token);
        const arrayItem = node.items[index];
        if (!arrayItem) {
          return null;
        }
        return findNode(pointer, arrayItem);
      }
    }
    return null;
  }
  function parseJSONPointer(path) {
    if (path === "#") {
      return [];
    }
    if (path[0] !== "#" || path[1] !== "/") {
      return null;
    }
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
        var _a;
        jsonSchemaService.clearExternalSchemas();
        (_a = settings.schemas) == null ? void 0 : _a.forEach(jsonSchemaService.registerExternalSchema.bind(jsonSchemaService));
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
          el["range"] = toRange(el["range"]);
        }
        return el;
      });
    }
    CommonConverter2.normalizeRanges = normalizeRanges;
    function cleanHtml(html) {
      return html.replace(/<a\s/, "<a target='_blank' ");
    }
    CommonConverter2.cleanHtml = cleanHtml;
    function toRange(range) {
      if (!range || !range.start || !range.end) {
        return;
      }
      let Range2 = AceRange.getConstructor();
      return Range2.fromPoints(range.start, range.end);
    }
    CommonConverter2.toRange = toRange;
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
  function filterDiagnostics(diagnostics, filterErrors) {
    return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
      if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) {
        el.severity = mainExports.DiagnosticSeverity.Warning;
      } else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) {
        el.severity = mainExports.DiagnosticSeverity.Information;
      }
      return el;
    });
  }
  class JsonService extends BaseService {
    constructor(mode) {
      super(mode);
      this.schemas = {};
      this.serviceCapabilities = {
        completionProvider: {
          triggerCharacters: ['"', ":"],
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
          if (jsonSchema)
            return Promise.resolve(jsonSchema);
          if (typeof fetch !== "undefined" && /^https?:\/\//.test(uri)) {
            return fetch(uri).then((response) => response.text());
          }
          return Promise.reject(`Unable to load schema at ${uri}`);
        },
        workspaceContext: {
          resolveRelativePath: (relativePath, resource) => {
            const base = resource.substr(0, resource.lastIndexOf("/") + 1);
            return Utils.resolvePath(URI.parse(base), relativePath).toString();
          }
        }
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
      return this.getOption(documentUri != null ? documentUri : "", "schemas");
    }
    $configureService(documentUri) {
      let schemas = this.getSchemaOption(documentUri);
      let sessionIDs = documentUri ? [] : Object.keys(this.documents);
      schemas == null ? void 0 : schemas.forEach((el) => {
        var _a, _b;
        if (documentUri) {
          if (this.$getJsonSchemaUri(documentUri) == el.uri) {
            (_a = el.fileMatch) != null ? _a : el.fileMatch = [];
            el.fileMatch.push(documentUri);
          }
        } else {
          el.fileMatch = sessionIDs.filter((documentUri2) => this.$getJsonSchemaUri(documentUri2) == el.uri);
        }
        let schema = (_b = el.schema) != null ? _b : this.schemas[el.uri];
        if (schema)
          this.schemas[el.uri] = schema;
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
      schemas == null ? void 0 : schemas.forEach((el) => {
        var _a;
        if (el.uri === this.$getJsonSchemaUri(document.uri)) {
          el.fileMatch = (_a = el.fileMatch) == null ? void 0 : _a.filter((pattern) => pattern != document.uri);
        }
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
      if (!fullDocument)
        return Promise.resolve([]);
      return Promise.resolve(this.$service.format(fullDocument, range, options));
    }
    async doHover(document, position) {
      let fullDocument = this.getDocument(document.uri);
      if (!fullDocument)
        return null;
      let jsonDocument = this.$service.parseJSONDocument(fullDocument);
      return this.$service.doHover(fullDocument, position, jsonDocument);
    }
    async doValidation(document) {
      let fullDocument = this.getDocument(document.uri);
      if (!fullDocument)
        return [];
      let jsonDocument = this.$service.parseJSONDocument(fullDocument);
      let diagnostics = await this.$service.doValidation(fullDocument, jsonDocument, { trailingCommas: this.mode === "json5" ? "ignore" : "error" });
      return filterDiagnostics(diagnostics, this.optionsToFilterDiagnostics);
    }
    async doComplete(document, position) {
      let fullDocument = this.getDocument(document.uri);
      if (!fullDocument)
        return null;
      let jsonDocument = this.$service.parseJSONDocument(fullDocument);
      const completions = await this.$service.doComplete(fullDocument, position, jsonDocument);
      return completions;
    }
    async doResolve(item) {
      return this.$service.doResolve(item);
    }
  }
  exports2.JsonService = JsonService;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
