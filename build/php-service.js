(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
})(this, (function(exports2) {
  "use strict";
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
  var URI;
  (function(URI2) {
    function is2(value) {
      return typeof value === "string";
    }
    URI2.is = is2;
  })(URI || (URI = {}));
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
      return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
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
      let sortedEdits = mergeSort2(edits, (a, b) => {
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
      return URI;
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
      while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) {
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
      const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
        const diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
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
      if (isEOL(ch)) {
        if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
          i++;
        }
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
            dataSupport: true,
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
  var phpParser = { exports: {} };
  var hasRequiredPhpParser;
  function requirePhpParser() {
    if (hasRequiredPhpParser) return phpParser.exports;
    hasRequiredPhpParser = 1;
    (function(module2, exports$1) {
      (function webpackUniversalModuleDefinition(root, factory) {
        module2.exports = factory();
      })(self, () => {
        return (
          /******/
          (() => {
            var __webpack_modules__ = {
              /***/
              8938(module3, __unused_webpack_exports, __webpack_require__2) {
                var Location2 = __webpack_require__2(4778);
                var Position2 = __webpack_require__2(8822);
                var AST = function AST2(withPositions, withSource) {
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
                    /* '<>', */
                    "<=>"
                  ],
                  ["<", "<=", ">", ">="],
                  ["<<", ">>"],
                  ["+", "-", "."],
                  ["*", "/", "%"],
                  ["!"],
                  ["instanceof"],
                  ["cast", "silent"],
                  ["**"]
                  // TODO: [ (array)
                  // TODO: clone, new
                ].forEach(function(list, index) {
                  list.forEach(function(operator) {
                    AST.precedence[operator] = index + 1;
                  });
                });
                AST.prototype.isRightAssociative = function(operator) {
                  return operator === "**" || operator === "??";
                };
                AST.prototype.swapLocations = function(target, first, last, parser) {
                  if (this.withPositions) {
                    target.loc.start = first.loc.start;
                    target.loc.end = last.loc.end;
                    if (this.withSource) {
                      target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
                    }
                  }
                };
                AST.prototype.resolveLocations = function(target, first, last, parser) {
                  if (this.withPositions) {
                    if (target.loc.start.offset > first.loc.start.offset) {
                      target.loc.start = first.loc.start;
                    }
                    if (target.loc.end.offset < last.loc.end.offset) {
                      target.loc.end = last.loc.end;
                    }
                    if (this.withSource) {
                      target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
                    }
                  }
                };
                AST.prototype.resolvePrecedence = function(result, parser) {
                  var buffer, lLevel, rLevel;
                  if (result.kind === "call") {
                    this.resolveLocations(result, result.what, result, parser);
                  } else if (result.kind === "propertylookup" || result.kind === "staticlookup" || result.kind === "offsetlookup" && result.offset) {
                    this.resolveLocations(result, result.what, result.offset, parser);
                  } else if (result.kind === "bin") {
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
                  } else if (result.kind === "expressionstatement") {
                    this.swapLocations(result, result.expression, result, parser);
                  }
                  return result;
                };
                AST.prototype.prepare = function(kind, docs, parser) {
                  var start = null;
                  if (this.withPositions || this.withSource) {
                    start = parser.position();
                  }
                  var self2 = this;
                  var _result = function result() {
                    var args = Array.prototype.slice.call(arguments);
                    args.push(docs);
                    if (self2.withPositions || self2.withSource) {
                      var src = null;
                      if (self2.withSource) {
                        src = parser.lexer._input.substring(start.offset, parser.prev[2]);
                      }
                      var location = new Location2(src, start, new Position2(parser.prev[0], parser.prev[1], parser.prev[2]));
                      args.push(location);
                    }
                    if (!kind) {
                      kind = args.shift();
                    }
                    var node = self2[kind];
                    if (typeof node !== "function") {
                      throw new Error('Undefined node "' + kind + '"');
                    }
                    var astNode = Object.create(node.prototype);
                    node.apply(astNode, args);
                    _result.instance = astNode;
                    if (_result.trailingComments) {
                      astNode.trailingComments = _result.trailingComments;
                    }
                    if (typeof _result.postBuild === "function") {
                      _result.postBuild(astNode);
                    }
                    if (parser.debug) {
                      delete self2.stack[_result.stackUid];
                    }
                    return self2.resolvePrecedence(astNode, parser);
                  };
                  if (parser.debug) {
                    if (!this.stack) {
                      this.stack = {};
                      this.stackUid = 1;
                    }
                    this.stack[++this.stackUid] = {
                      position: start,
                      stack: new Error().stack.split("\n").slice(3, 5)
                    };
                    _result.stackUid = this.stackUid;
                  }
                  _result.setTrailingComments = function(docs2) {
                    if (_result.instance) {
                      _result.instance.setTrailingComments(docs2);
                    } else {
                      _result.trailingComments = docs2;
                    }
                  };
                  _result.destroy = function(target) {
                    if (docs) {
                      if (target) {
                        if (!target.leadingComments) {
                          target.leadingComments = docs;
                        } else {
                          target.leadingComments = docs.concat(target.leadingComments);
                        }
                      } else {
                        parser._docIndex = parser._docs.length - docs.length;
                      }
                    }
                    if (parser.debug) {
                      delete self2.stack[_result.stackUid];
                    }
                  };
                  return _result;
                };
                AST.prototype.checkNodes = function() {
                  var errors = [];
                  for (var k in this.stack) {
                    if (Object.prototype.hasOwnProperty.call(this.stack, k)) {
                      this.stack[k].key = k;
                      errors.push(this.stack[k]);
                    }
                  }
                  this.stack = {};
                  return errors;
                };
                [__webpack_require__2(3160), __webpack_require__2(1654), __webpack_require__2(1240), __webpack_require__2(3979), __webpack_require__2(5553), __webpack_require__2(2207), __webpack_require__2(2916), __webpack_require__2(4628), __webpack_require__2(7509), __webpack_require__2(2906), __webpack_require__2(5723), __webpack_require__2(7561), __webpack_require__2(6473), __webpack_require__2(9626), __webpack_require__2(4782), __webpack_require__2(8477), __webpack_require__2(5045), __webpack_require__2(900), __webpack_require__2(4824), __webpack_require__2(1020), __webpack_require__2(9847), __webpack_require__2(2790), __webpack_require__2(1333), __webpack_require__2(2112), __webpack_require__2(9960), __webpack_require__2(8533), __webpack_require__2(5947), __webpack_require__2(7786), __webpack_require__2(5436), __webpack_require__2(1136), __webpack_require__2(380), __webpack_require__2(6129), __webpack_require__2(9723), __webpack_require__2(5125), __webpack_require__2(9632), __webpack_require__2(4300), __webpack_require__2(1515), __webpack_require__2(3411), __webpack_require__2(9781), __webpack_require__2(839), __webpack_require__2(8374), __webpack_require__2(9754), __webpack_require__2(4251), __webpack_require__2(6553), __webpack_require__2(8630), __webpack_require__2(9786), __webpack_require__2(9742), __webpack_require__2(1234), __webpack_require__2(6), __webpack_require__2(8861), __webpack_require__2(7860), __webpack_require__2(9834), __webpack_require__2(2724), __webpack_require__2(6025), __webpack_require__2(2687), __webpack_require__2(7633), __webpack_require__2(5514), __webpack_require__2(7427), __webpack_require__2(1122), __webpack_require__2(7256), __webpack_require__2(7416), __webpack_require__2(8140), __webpack_require__2(6258), __webpack_require__2(9474), __webpack_require__2(6827), __webpack_require__2(4427), __webpack_require__2(4065), __webpack_require__2(4297), __webpack_require__2(5859), __webpack_require__2(6985), __webpack_require__2(9302), __webpack_require__2(8212), __webpack_require__2(864), __webpack_require__2(8268), __webpack_require__2(7190), __webpack_require__2(8519), __webpack_require__2(4835), __webpack_require__2(2056), __webpack_require__2(4838), __webpack_require__2(7869), __webpack_require__2(1908), __webpack_require__2(170), __webpack_require__2(1091), __webpack_require__2(8276), __webpack_require__2(1842), __webpack_require__2(5739), __webpack_require__2(1274), __webpack_require__2(4352), __webpack_require__2(9672), __webpack_require__2(711), __webpack_require__2(1231), __webpack_require__2(1865), __webpack_require__2(1102), __webpack_require__2(7472), __webpack_require__2(6133), __webpack_require__2(1197), __webpack_require__2(6649), __webpack_require__2(1837), __webpack_require__2(2277), __webpack_require__2(8010), __webpack_require__2(7579), __webpack_require__2(3460), __webpack_require__2(2702), __webpack_require__2(514), __webpack_require__2(5684), __webpack_require__2(8019), __webpack_require__2(7721), __webpack_require__2(4369), __webpack_require__2(40), __webpack_require__2(4919), __webpack_require__2(7676), __webpack_require__2(2596), __webpack_require__2(6744)].forEach(function(ctor) {
                  AST.prototype[ctor.kind] = ctor;
                });
                module3.exports = AST;
              },
              /***/
              3160(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expr = __webpack_require__2(839);
                var KIND = "array";
                module3.exports = Expr["extends"](KIND, function Array2(shortForm, items, docs, location) {
                  Expr.apply(this, [KIND, docs, location]);
                  this.items = items;
                  this.shortForm = shortForm;
                });
              },
              /***/
              1654(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "arrowfunc";
                module3.exports = Expression["extends"](KIND, function Closure(args, byref, body, type, nullable, isStatic, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.arguments = args;
                  this.byref = byref;
                  this.body = body;
                  this.type = type;
                  this.nullable = nullable;
                  this.isStatic = isStatic || false;
                });
              },
              /***/
              1240(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "assign";
                module3.exports = Expression["extends"](KIND, function Assign(left, right, operator, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.left = left;
                  this.right = right;
                  this.operator = operator;
                });
              },
              /***/
              3979(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "assignref";
                module3.exports = Expression["extends"](KIND, function AssignRef(left, right, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.left = left;
                  this.right = right;
                });
              },
              /***/
              2207(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "attrgroup";
                module3.exports = Node["extends"](KIND, function AttrGroup(attrs, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.attrs = attrs || [];
                });
              },
              /***/
              5553(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "attribute";
                module3.exports = Node["extends"](KIND, function Attribute(name, args, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.args = args;
                });
              },
              /***/
              2916(module3, __unused_webpack_exports, __webpack_require__2) {
                var Operation = __webpack_require__2(8268);
                var KIND = "bin";
                module3.exports = Operation["extends"](KIND, function Bin(type, left, right, docs, location) {
                  Operation.apply(this, [KIND, docs, location]);
                  this.type = type;
                  this.left = left;
                  this.right = right;
                });
              },
              /***/
              4628(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "block";
                module3.exports = Statement["extends"](KIND, function Block(kind, children, docs, location) {
                  Statement.apply(this, [kind || KIND, docs, location]);
                  this.children = children.filter(Boolean);
                });
              },
              /***/
              7509(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "boolean";
                module3.exports = Literal["extends"](KIND, function Boolean2(value, raw, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                });
              },
              /***/
              2906(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "break";
                module3.exports = Statement["extends"](KIND, function Break(level, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.level = level;
                });
              },
              /***/
              5723(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "byref";
                module3.exports = Expression["extends"](KIND, function ByRef(what, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.what = what;
                });
              },
              /***/
              7561(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "call";
                module3.exports = Expression["extends"](KIND, function Call(what, args, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.what = what;
                  this.arguments = args;
                });
              },
              /***/
              6473(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "case";
                module3.exports = Statement["extends"](KIND, function Case(test, body, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.body = body;
                });
              },
              /***/
              9626(module3, __unused_webpack_exports, __webpack_require__2) {
                var Operation = __webpack_require__2(8268);
                var KIND = "cast";
                module3.exports = Operation["extends"](KIND, function Cast(type, raw, expr, docs, location) {
                  Operation.apply(this, [KIND, docs, location]);
                  this.type = type;
                  this.raw = raw;
                  this.expr = expr;
                });
              },
              /***/
              4782(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "catch";
                module3.exports = Statement["extends"](KIND, function Catch(body, what, variable, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.body = body;
                  this.what = what;
                  this.variable = variable;
                });
              },
              /***/
              8477(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "class";
                module3.exports = Declaration["extends"](KIND, function Class(name, ext, impl, body, flags, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
                  this.isAnonymous = name ? false : true;
                  this["extends"] = ext;
                  this["implements"] = impl;
                  this.body = body;
                  this.attrGroups = [];
                  this.parseFlags(flags);
                });
              },
              /***/
              5045(module3, __unused_webpack_exports, __webpack_require__2) {
                var ConstantStatement = __webpack_require__2(2112);
                var KIND = "classconstant";
                var IS_UNDEFINED = "";
                var IS_PUBLIC = "public";
                var IS_PROTECTED = "protected";
                var IS_PRIVATE = "private";
                var ClassConstant = ConstantStatement["extends"](KIND, function ClassConstant2(kind, constants, flags, nullable, type, attrGroups, docs, location) {
                  ConstantStatement.apply(this, [kind || KIND, constants, docs, location]);
                  this.parseFlags(flags);
                  this.nullable = nullable;
                  this.type = type;
                  this.attrGroups = attrGroups;
                });
                ClassConstant.prototype.parseFlags = function(flags) {
                  if (flags[0] === -1) {
                    this.visibility = IS_UNDEFINED;
                  } else if (flags[0] === null) {
                    this.visibility = null;
                  } else if (flags[0] === 0) {
                    this.visibility = IS_PUBLIC;
                  } else if (flags[0] === 1) {
                    this.visibility = IS_PROTECTED;
                  } else if (flags[0] === 2) {
                    this.visibility = IS_PRIVATE;
                  }
                  this["final"] = flags[2] === 2;
                };
                module3.exports = ClassConstant;
              },
              /***/
              900(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "clone";
                module3.exports = Expression["extends"](KIND, function Clone(what, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.what = what;
                });
              },
              /***/
              4824(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "closure";
                module3.exports = Expression["extends"](KIND, function Closure(args, byref, uses, type, nullable, isStatic, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
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
              /***/
              1020(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                module3.exports = Node["extends"]("comment", function Comment(kind, value, docs, location) {
                  Node.apply(this, [kind, docs, location]);
                  this.value = value;
                });
              },
              /***/
              9847(module3, __unused_webpack_exports, __webpack_require__2) {
                var Comment = __webpack_require__2(1020);
                var KIND = "commentblock";
                module3.exports = Comment["extends"](KIND, function CommentBlock(value, docs, location) {
                  Comment.apply(this, [KIND, value, docs, location]);
                });
              },
              /***/
              2790(module3, __unused_webpack_exports, __webpack_require__2) {
                var Comment = __webpack_require__2(1020);
                var KIND = "commentline";
                module3.exports = Comment["extends"](KIND, function CommentLine(value, docs, location) {
                  Comment.apply(this, [KIND, value, docs, location]);
                });
              },
              /***/
              1333(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "constant";
                module3.exports = Node["extends"](KIND, function Constant(name, value, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.value = value;
                });
              },
              /***/
              2112(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "constantstatement";
                module3.exports = Statement["extends"](KIND, function ConstantStatement(kind, constants, docs, location) {
                  Statement.apply(this, [kind || KIND, docs, location]);
                  this.constants = constants;
                });
              },
              /***/
              9960(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "continue";
                module3.exports = Statement["extends"](KIND, function Continue(level, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.level = level;
                });
              },
              /***/
              8533(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "declaration";
                var IS_UNDEFINED = "";
                var IS_PUBLIC = "public";
                var IS_PROTECTED = "protected";
                var IS_PRIVATE = "private";
                var Declaration = Statement["extends"](KIND, function Declaration2(kind, name, docs, location) {
                  Statement.apply(this, [kind || KIND, docs, location]);
                  this.name = name;
                });
                Declaration.prototype.parseFlags = function(flags) {
                  this.isAbstract = flags[2] === 1;
                  this.isFinal = flags[2] === 2;
                  this.isReadonly = flags[3] === 1;
                  if (this.kind !== "class") {
                    if (flags[0] === -1) {
                      this.visibility = IS_UNDEFINED;
                    } else if (flags[0] === null) {
                      this.visibility = null;
                    } else if (flags[0] === 0) {
                      this.visibility = IS_PUBLIC;
                    } else if (flags[0] === 1) {
                      this.visibility = IS_PROTECTED;
                    } else if (flags[0] === 2) {
                      this.visibility = IS_PRIVATE;
                    }
                    this.isStatic = flags[1] === 1;
                  }
                };
                module3.exports = Declaration;
              },
              /***/
              5947(module3, __unused_webpack_exports, __webpack_require__2) {
                var Block = __webpack_require__2(4628);
                var KIND = "declare";
                var Declare = Block["extends"](KIND, function Declare2(directives, body, mode, docs, location) {
                  Block.apply(this, [KIND, body, docs, location]);
                  this.directives = directives;
                  this.mode = mode;
                });
                Declare.MODE_SHORT = "short";
                Declare.MODE_BLOCK = "block";
                Declare.MODE_NONE = "none";
                module3.exports = Declare;
              },
              /***/
              7786(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "declaredirective";
                module3.exports = Node["extends"](KIND, function DeclareDirective(key, value, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.key = key;
                  this.value = value;
                });
              },
              /***/
              5436(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "do";
                module3.exports = Statement["extends"](KIND, function Do(test, body, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.body = body;
                });
              },
              /***/
              1136(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "echo";
                module3.exports = Statement["extends"](KIND, function Echo(expressions, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.shortForm = shortForm;
                  this.expressions = expressions;
                });
              },
              /***/
              380(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "empty";
                module3.exports = Expression["extends"](KIND, function Empty(expression, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.expression = expression;
                });
              },
              /***/
              6129(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "encapsed";
                var Encapsed = Literal["extends"](KIND, function Encapsed2(value, raw, type, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                  this.type = type;
                });
                Encapsed.TYPE_STRING = "string";
                Encapsed.TYPE_SHELL = "shell";
                Encapsed.TYPE_HEREDOC = "heredoc";
                Encapsed.TYPE_OFFSET = "offset";
                module3.exports = Encapsed;
              },
              /***/
              9723(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "encapsedpart";
                module3.exports = Expression["extends"](KIND, function EncapsedPart(expression, syntax, curly, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.expression = expression;
                  this.syntax = syntax;
                  this.curly = curly;
                });
              },
              /***/
              5125(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "entry";
                module3.exports = Expression["extends"](KIND, function Entry(key, value, byRef, unpack, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.key = key;
                  this.value = value;
                  this.byRef = byRef;
                  this.unpack = unpack;
                });
              },
              /***/
              9632(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "enum";
                module3.exports = Declaration["extends"](KIND, function Enum(name, valueType, impl, body, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
                  this.valueType = valueType;
                  this["implements"] = impl;
                  this.body = body;
                  this.attrGroups = [];
                });
              },
              /***/
              4300(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "enumcase";
                module3.exports = Node["extends"](KIND, function EnumCase(name, value, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.value = value;
                });
              },
              /***/
              1515(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "error";
                module3.exports = Node["extends"](KIND, function Error2(message, token, line, expected, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.message = message;
                  this.token = token;
                  this.line = line;
                  this.expected = expected;
                });
              },
              /***/
              3411(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "eval";
                module3.exports = Expression["extends"](KIND, function Eval(source, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.source = source;
                });
              },
              /***/
              9781(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "exit";
                module3.exports = Expression["extends"](KIND, function Exit(expression, useDie, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.expression = expression;
                  this.useDie = useDie;
                });
              },
              /***/
              839(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "expression";
                module3.exports = Node["extends"](KIND, function Expression(kind, docs, location) {
                  Node.apply(this, [kind || KIND, docs, location]);
                });
              },
              /***/
              8374(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "expressionstatement";
                module3.exports = Statement["extends"](KIND, function ExpressionStatement(expr, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.expression = expr;
                });
              },
              /***/
              9754(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "for";
                module3.exports = Statement["extends"](KIND, function For(init, test, increment, body, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.init = init;
                  this.test = test;
                  this.increment = increment;
                  this.shortForm = shortForm;
                  this.body = body;
                });
              },
              /***/
              4251(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "foreach";
                module3.exports = Statement["extends"](KIND, function Foreach(source, key, value, body, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.source = source;
                  this.key = key;
                  this.value = value;
                  this.shortForm = shortForm;
                  this.body = body;
                });
              },
              /***/
              6553(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "function";
                module3.exports = Declaration["extends"](KIND, function _Function(name, args, byref, type, nullable, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
                  this.arguments = args;
                  this.byref = byref;
                  this.type = type;
                  this.nullable = nullable;
                  this.body = null;
                  this.attrGroups = [];
                });
              },
              /***/
              8630(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "global";
                module3.exports = Statement["extends"](KIND, function Global(items, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.items = items;
                });
              },
              /***/
              9786(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "goto";
                module3.exports = Statement["extends"](KIND, function Goto(label, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.label = label;
                });
              },
              /***/
              9742(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "halt";
                module3.exports = Statement["extends"](KIND, function Halt(after, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.after = after;
                });
              },
              /***/
              1234(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "identifier";
                var Identifier = Node["extends"](KIND, function Identifier2(name, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.name = name;
                });
                module3.exports = Identifier;
              },
              /***/
              6(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "if";
                module3.exports = Statement["extends"](KIND, function If(test, body, alternate, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.body = body;
                  this.alternate = alternate;
                  this.shortForm = shortForm;
                });
              },
              /***/
              8861(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "include";
                module3.exports = Expression["extends"](KIND, function Include(once, require, target, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.once = once;
                  this.require = require;
                  this.target = target;
                });
              },
              /***/
              7860(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "inline";
                module3.exports = Literal["extends"](KIND, function Inline(value, raw, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                });
              },
              /***/
              9834(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "interface";
                module3.exports = Declaration["extends"](KIND, function Interface(name, ext, body, attrGroups, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
                  this["extends"] = ext;
                  this.body = body;
                  this.attrGroups = attrGroups;
                });
              },
              /***/
              2724(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "intersectiontype";
                module3.exports = Declaration["extends"](KIND, function IntersectionType(types, docs, location) {
                  Declaration.apply(this, [KIND, null, docs, location]);
                  this.types = types;
                });
              },
              /***/
              6025(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "isset";
                module3.exports = Expression["extends"](KIND, function Isset(variables, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.variables = variables;
                });
              },
              /***/
              2687(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "label";
                module3.exports = Statement["extends"](KIND, function Label(name, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.name = name;
                });
              },
              /***/
              7633(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "list";
                module3.exports = Expression["extends"](KIND, function List(items, shortForm, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.items = items;
                  this.shortForm = shortForm;
                });
              },
              /***/
              5514(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "literal";
                module3.exports = Expression["extends"](KIND, function Literal(kind, value, raw, docs, location) {
                  Expression.apply(this, [kind || KIND, docs, location]);
                  this.value = value;
                  if (raw) {
                    this.raw = raw;
                  }
                });
              },
              /***/
              4778(module3) {
                var Location2 = function Location3(source, start, end) {
                  this.source = source;
                  this.start = start;
                  this.end = end;
                };
                module3.exports = Location2;
              },
              /***/
              7427(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expr = __webpack_require__2(839);
                var KIND = "lookup";
                module3.exports = Expr["extends"](KIND, function Lookup(kind, what, offset, docs, location) {
                  Expr.apply(this, [kind || KIND, docs, location]);
                  this.what = what;
                  this.offset = offset;
                });
              },
              /***/
              1122(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "magic";
                module3.exports = Literal["extends"](KIND, function Magic(value, raw, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                });
              },
              /***/
              7256(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "match";
                module3.exports = Expression["extends"](KIND, function Match(cond, arms, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.cond = cond;
                  this.arms = arms;
                });
              },
              /***/
              7416(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "matcharm";
                module3.exports = Expression["extends"](KIND, function MatchArm(conds, body, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.conds = conds;
                  this.body = body;
                });
              },
              /***/
              8140(module3, __unused_webpack_exports, __webpack_require__2) {
                var Function_ = __webpack_require__2(6553);
                var KIND = "method";
                module3.exports = Function_["extends"](KIND, function Method() {
                  Function_.apply(this, arguments);
                  this.kind = KIND;
                });
              },
              /***/
              6258(module3, __unused_webpack_exports, __webpack_require__2) {
                var Reference = __webpack_require__2(8276);
                var KIND = "name";
                var Name = Reference["extends"](KIND, function Name2(name, resolution, docs, location) {
                  Reference.apply(this, [KIND, docs, location]);
                  this.name = name.replace(/\\$/, "");
                  this.resolution = resolution;
                });
                Name.UNQUALIFIED_NAME = "uqn";
                Name.QUALIFIED_NAME = "qn";
                Name.FULL_QUALIFIED_NAME = "fqn";
                Name.RELATIVE_NAME = "rn";
                module3.exports = Name;
              },
              /***/
              6827(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "namedargument";
                module3.exports = Expression["extends"](KIND, function namedargument(name, value, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.value = value;
                });
              },
              /***/
              9474(module3, __unused_webpack_exports, __webpack_require__2) {
                var Block = __webpack_require__2(4628);
                var KIND = "namespace";
                module3.exports = Block["extends"](KIND, function Namespace(name, children, withBrackets, docs, location) {
                  Block.apply(this, [KIND, children, docs, location]);
                  this.name = name;
                  this.withBrackets = withBrackets || false;
                });
              },
              /***/
              4427(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "new";
                module3.exports = Expression["extends"](KIND, function New(what, args, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.what = what;
                  this.arguments = args;
                });
              },
              /***/
              4065(module3) {
                var Node = function Node2(kind, docs, location) {
                  this.kind = kind;
                  if (docs) {
                    this.leadingComments = docs;
                  }
                  if (location) {
                    this.loc = location;
                  }
                };
                Node.prototype.setTrailingComments = function(docs) {
                  this.trailingComments = docs;
                };
                Node.prototype.destroy = function(node) {
                  if (!node) {
                    throw new Error("Node already initialized, you must swap with another node");
                  }
                  if (this.leadingComments) {
                    if (node.leadingComments) {
                      node.leadingComments = Array.concat(this.leadingComments, node.leadingComments);
                    } else {
                      node.leadingComments = this.leadingComments;
                    }
                  }
                  if (this.trailingComments) {
                    if (node.trailingComments) {
                      node.trailingComments = Array.concat(this.trailingComments, node.trailingComments);
                    } else {
                      node.trailingComments = this.trailingComments;
                    }
                  }
                  return node;
                };
                Node.prototype.includeToken = function(parser) {
                  if (this.loc) {
                    if (this.loc.end) {
                      this.loc.end.line = parser.lexer.yylloc.last_line;
                      this.loc.end.column = parser.lexer.yylloc.last_column;
                      this.loc.end.offset = parser.lexer.offset;
                    }
                    if (parser.ast.withSource) {
                      this.loc.source = parser.lexer._input.substring(this.loc.start.offset, parser.lexer.offset);
                    }
                  }
                  return this;
                };
                Node["extends"] = function(type, constructor) {
                  constructor.prototype = Object.create(this.prototype);
                  constructor["extends"] = this["extends"];
                  constructor.prototype.constructor = constructor;
                  constructor.kind = type;
                  return constructor;
                };
                module3.exports = Node;
              },
              /***/
              4297(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "noop";
                module3.exports = Node["extends"](KIND, function Noop(docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                });
              },
              /***/
              5859(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "nowdoc";
                module3.exports = Literal["extends"](KIND, function Nowdoc(value, raw, label, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                  this.label = label;
                });
              },
              /***/
              6985(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "nullkeyword";
                module3.exports = Node["extends"](KIND, function NullKeyword(raw, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.raw = raw;
                });
              },
              /***/
              9302(module3, __unused_webpack_exports, __webpack_require__2) {
                var Lookup = __webpack_require__2(7427);
                var KIND = "nullsafepropertylookup";
                module3.exports = Lookup["extends"](KIND, function NullSafePropertyLookup(what, offset, docs, location) {
                  Lookup.apply(this, [KIND, what, offset, docs, location]);
                });
              },
              /***/
              8212(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "number";
                module3.exports = Literal["extends"](KIND, function Number2(value, raw, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                });
              },
              /***/
              864(module3, __unused_webpack_exports, __webpack_require__2) {
                var Lookup = __webpack_require__2(7427);
                var KIND = "offsetlookup";
                module3.exports = Lookup["extends"](KIND, function OffsetLookup(what, offset, docs, location) {
                  Lookup.apply(this, [KIND, what, offset, docs, location]);
                });
              },
              /***/
              8268(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expr = __webpack_require__2(839);
                var KIND = "operation";
                module3.exports = Expr["extends"](KIND, function Operation(kind, docs, location) {
                  Expr.apply(this, [kind || KIND, docs, location]);
                });
              },
              /***/
              7190(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "parameter";
                module3.exports = Declaration["extends"](KIND, function Parameter(name, type, value, isRef, isVariadic, readonly, nullable, flags, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
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
              /***/
              8519(module3, __unused_webpack_exports, __webpack_require__2) {
                var Reference = __webpack_require__2(8276);
                var KIND = "parentreference";
                var ParentReference = Reference["extends"](KIND, function ParentReference2(raw, docs, location) {
                  Reference.apply(this, [KIND, docs, location]);
                  this.raw = raw;
                });
                module3.exports = ParentReference;
              },
              /***/
              8822(module3) {
                var Position2 = function Position3(line, column, offset) {
                  this.line = line;
                  this.column = column;
                  this.offset = offset;
                };
                module3.exports = Position2;
              },
              /***/
              4835(module3, __unused_webpack_exports, __webpack_require__2) {
                var Operation = __webpack_require__2(8268);
                var KIND = "post";
                module3.exports = Operation["extends"](KIND, function Post(type, what, docs, location) {
                  Operation.apply(this, [KIND, docs, location]);
                  this.type = type;
                  this.what = what;
                });
              },
              /***/
              2056(module3, __unused_webpack_exports, __webpack_require__2) {
                var Operation = __webpack_require__2(8268);
                var KIND = "pre";
                module3.exports = Operation["extends"](KIND, function Pre(type, what, docs, location) {
                  Operation.apply(this, [KIND, docs, location]);
                  this.type = type;
                  this.what = what;
                });
              },
              /***/
              4838(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "print";
                module3.exports = Expression["extends"](KIND, function Print(expression, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.expression = expression;
                });
              },
              /***/
              7869(module3, __unused_webpack_exports, __webpack_require__2) {
                var Block = __webpack_require__2(4628);
                var KIND = "program";
                module3.exports = Block["extends"](KIND, function Program(children, errors, comments, tokens, docs, location) {
                  Block.apply(this, [KIND, children, docs, location]);
                  this.errors = errors;
                  if (comments) {
                    this.comments = comments;
                  }
                  if (tokens) {
                    this.tokens = tokens;
                  }
                });
              },
              /***/
              1908(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "property";
                module3.exports = Statement["extends"](KIND, function Property(name, value, readonly, nullable, type, attrGroups, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.value = value;
                  this.readonly = readonly;
                  this.nullable = nullable;
                  this.type = type;
                  this.attrGroups = attrGroups;
                });
              },
              /***/
              170(module3, __unused_webpack_exports, __webpack_require__2) {
                var Lookup = __webpack_require__2(7427);
                var KIND = "propertylookup";
                module3.exports = Lookup["extends"](KIND, function PropertyLookup(what, offset, docs, location) {
                  Lookup.apply(this, [KIND, what, offset, docs, location]);
                });
              },
              /***/
              1091(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "propertystatement";
                var IS_UNDEFINED = "";
                var IS_PUBLIC = "public";
                var IS_PROTECTED = "protected";
                var IS_PRIVATE = "private";
                var PropertyStatement = Statement["extends"](KIND, function PropertyStatement2(kind, properties, flags, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.properties = properties;
                  this.parseFlags(flags);
                });
                PropertyStatement.prototype.parseFlags = function(flags) {
                  if (flags[0] === -1) {
                    this.visibility = IS_UNDEFINED;
                  } else if (flags[0] === null) {
                    this.visibility = null;
                  } else if (flags[0] === 0) {
                    this.visibility = IS_PUBLIC;
                  } else if (flags[0] === 1) {
                    this.visibility = IS_PROTECTED;
                  } else if (flags[0] === 2) {
                    this.visibility = IS_PRIVATE;
                  }
                  this.isStatic = flags[1] === 1;
                };
                module3.exports = PropertyStatement;
              },
              /***/
              8276(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "reference";
                var Reference = Node["extends"](KIND, function Reference2(kind, docs, location) {
                  Node.apply(this, [kind || KIND, docs, location]);
                });
                module3.exports = Reference;
              },
              /***/
              1842(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "retif";
                module3.exports = Expression["extends"](KIND, function RetIf(test, trueExpr, falseExpr, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.trueExpr = trueExpr;
                  this.falseExpr = falseExpr;
                });
              },
              /***/
              5739(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "return";
                module3.exports = Statement["extends"](KIND, function Return(expr, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.expr = expr;
                });
              },
              /***/
              1274(module3, __unused_webpack_exports, __webpack_require__2) {
                var Reference = __webpack_require__2(8276);
                var KIND = "selfreference";
                var SelfReference = Reference["extends"](KIND, function SelfReference2(raw, docs, location) {
                  Reference.apply(this, [KIND, docs, location]);
                  this.raw = raw;
                });
                module3.exports = SelfReference;
              },
              /***/
              4352(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "silent";
                module3.exports = Expression["extends"](KIND, function Silent(expr, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.expr = expr;
                });
              },
              /***/
              9672(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "statement";
                module3.exports = Node["extends"](KIND, function Statement(kind, docs, location) {
                  Node.apply(this, [kind || KIND, docs, location]);
                });
              },
              /***/
              711(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "static";
                module3.exports = Statement["extends"](KIND, function Static(variables, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.variables = variables;
                });
              },
              /***/
              1865(module3, __unused_webpack_exports, __webpack_require__2) {
                var Lookup = __webpack_require__2(7427);
                var KIND = "staticlookup";
                module3.exports = Lookup["extends"](KIND, function StaticLookup(what, offset, docs, location) {
                  Lookup.apply(this, [KIND, what, offset, docs, location]);
                });
              },
              /***/
              1102(module3, __unused_webpack_exports, __webpack_require__2) {
                var Reference = __webpack_require__2(8276);
                var KIND = "staticreference";
                var StaticReference = Reference["extends"](KIND, function StaticReference2(raw, docs, location) {
                  Reference.apply(this, [KIND, docs, location]);
                  this.raw = raw;
                });
                module3.exports = StaticReference;
              },
              /***/
              1231(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "staticvariable";
                module3.exports = Node["extends"](KIND, function StaticVariable(variable, defaultValue, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.variable = variable;
                  this.defaultValue = defaultValue;
                });
              },
              /***/
              7472(module3, __unused_webpack_exports, __webpack_require__2) {
                var Literal = __webpack_require__2(5514);
                var KIND = "string";
                module3.exports = Literal["extends"](KIND, function String2(isDoubleQuote, value, unicode, raw, docs, location) {
                  Literal.apply(this, [KIND, value, raw, docs, location]);
                  this.unicode = unicode;
                  this.isDoubleQuote = isDoubleQuote;
                });
              },
              /***/
              6133(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "switch";
                module3.exports = Statement["extends"](KIND, function Switch(test, body, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.body = body;
                  this.shortForm = shortForm;
                });
              },
              /***/
              1197(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "throw";
                module3.exports = Statement["extends"](KIND, function Throw(what, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.what = what;
                });
              },
              /***/
              6649(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "trait";
                module3.exports = Declaration["extends"](KIND, function Trait(name, body, docs, location) {
                  Declaration.apply(this, [KIND, name, docs, location]);
                  this.body = body;
                });
              },
              /***/
              1837(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "traitalias";
                var IS_UNDEFINED = "";
                var IS_PUBLIC = "public";
                var IS_PROTECTED = "protected";
                var IS_PRIVATE = "private";
                module3.exports = Node["extends"](KIND, function TraitAlias(trait, method, as, flags, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.trait = trait;
                  this.method = method;
                  this.as = as;
                  this.visibility = IS_UNDEFINED;
                  if (flags) {
                    if (flags[0] === 0) {
                      this.visibility = IS_PUBLIC;
                    } else if (flags[0] === 1) {
                      this.visibility = IS_PROTECTED;
                    } else if (flags[0] === 2) {
                      this.visibility = IS_PRIVATE;
                    }
                  }
                });
              },
              /***/
              2277(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "traitprecedence";
                module3.exports = Node["extends"](KIND, function TraitPrecedence(trait, method, instead, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.trait = trait;
                  this.method = method;
                  this.instead = instead;
                });
              },
              /***/
              8010(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "traituse";
                module3.exports = Node["extends"](KIND, function TraitUse(traits, adaptations, docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                  this.traits = traits;
                  this.adaptations = adaptations;
                });
              },
              /***/
              7579(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "try";
                module3.exports = Statement["extends"](KIND, function Try(body, catches, always, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.body = body;
                  this.catches = catches;
                  this.always = always;
                });
              },
              /***/
              3460(module3, __unused_webpack_exports, __webpack_require__2) {
                var Reference = __webpack_require__2(8276);
                var KIND = "typereference";
                var TypeReference = Reference["extends"](KIND, function TypeReference2(name, raw, docs, location) {
                  Reference.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.raw = raw;
                });
                TypeReference.types = ["int", "float", "string", "bool", "object", "array", "callable", "iterable", "void", "static"];
                module3.exports = TypeReference;
              },
              /***/
              2702(module3, __unused_webpack_exports, __webpack_require__2) {
                var Operation = __webpack_require__2(8268);
                var KIND = "unary";
                module3.exports = Operation["extends"](KIND, function Unary(type, what, docs, location) {
                  Operation.apply(this, [KIND, docs, location]);
                  this.type = type;
                  this.what = what;
                });
              },
              /***/
              514(module3, __unused_webpack_exports, __webpack_require__2) {
                var Declaration = __webpack_require__2(8533);
                var KIND = "uniontype";
                module3.exports = Declaration["extends"](KIND, function UnionType(types, docs, location) {
                  Declaration.apply(this, [KIND, null, docs, location]);
                  this.types = types;
                });
              },
              /***/
              5684(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "unset";
                module3.exports = Statement["extends"](KIND, function Unset(variables, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.variables = variables;
                });
              },
              /***/
              8019(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "usegroup";
                module3.exports = Statement["extends"](KIND, function UseGroup(name, type, items, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.type = type;
                  this.items = items;
                });
              },
              /***/
              7721(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "useitem";
                var UseItem = Statement["extends"](KIND, function UseItem2(name, alias, type, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.alias = alias;
                  this.type = type;
                });
                UseItem.TYPE_CONST = "const";
                UseItem.TYPE_FUNCTION = "function";
                module3.exports = UseItem;
              },
              /***/
              4369(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "variable";
                module3.exports = Expression["extends"](KIND, function Variable(name, curly, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.name = name;
                  this.curly = curly || false;
                });
              },
              /***/
              40(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "variadic";
                module3.exports = Expression["extends"](KIND, function variadic(what, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.what = what;
                });
              },
              /***/
              4919(module3, __unused_webpack_exports, __webpack_require__2) {
                var Node = __webpack_require__2(4065);
                var KIND = "variadicplaceholder";
                module3.exports = Node["extends"](KIND, function VariadicPlaceholder(docs, location) {
                  Node.apply(this, [KIND, docs, location]);
                });
              },
              /***/
              7676(module3, __unused_webpack_exports, __webpack_require__2) {
                var Statement = __webpack_require__2(9672);
                var KIND = "while";
                module3.exports = Statement["extends"](KIND, function While(test, body, shortForm, docs, location) {
                  Statement.apply(this, [KIND, docs, location]);
                  this.test = test;
                  this.body = body;
                  this.shortForm = shortForm;
                });
              },
              /***/
              2596(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "yield";
                module3.exports = Expression["extends"](KIND, function Yield(value, key, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.value = value;
                  this.key = key;
                });
              },
              /***/
              6744(module3, __unused_webpack_exports, __webpack_require__2) {
                var Expression = __webpack_require__2(839);
                var KIND = "yieldfrom";
                module3.exports = Expression["extends"](KIND, function YieldFrom(value, docs, location) {
                  Expression.apply(this, [KIND, docs, location]);
                  this.value = value;
                });
              },
              /***/
              5362(module3, __unused_webpack_exports, __webpack_require__2) {
                function _typeof(o) {
                  "@babel/helpers - typeof";
                  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
                    return typeof o2;
                  } : function(o2) {
                    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
                  }, _typeof(o);
                }
                var lexer = __webpack_require__2(9108);
                var parser = __webpack_require__2(7259);
                var tokens = __webpack_require__2(1906);
                var AST = __webpack_require__2(8938);
                function combine(src, to) {
                  var keys = Object.keys(src);
                  var i = keys.length;
                  while (i--) {
                    var k = keys[i];
                    var val = src[k];
                    if (val === null) {
                      delete to[k];
                    } else if (typeof val === "function") {
                      to[k] = val.bind(to);
                    } else if (Array.isArray(val)) {
                      to[k] = Array.isArray(to[k]) ? to[k].concat(val) : val;
                    } else if (_typeof(val) === "object") {
                      to[k] = _typeof(to[k]) === "object" ? combine(val, to[k]) : val;
                    } else {
                      to[k] = val;
                    }
                  }
                  return to;
                }
                var Engine = function Engine2(options) {
                  if (typeof this === "function") {
                    return new this(options);
                  }
                  this.tokens = tokens;
                  this.lexer = new lexer(this);
                  this.ast = new AST();
                  this.parser = new parser(this.lexer, this.ast);
                  if (options && _typeof(options) === "object") {
                    if (options.parser) {
                      if (!options.lexer) {
                        options.lexer = {};
                      }
                      if (options.parser.version) {
                        if (typeof options.parser.version === "string") {
                          var version = options.parser.version.split(".");
                          version = parseInt(version[0]) * 100 + parseInt(version[1]);
                          if (isNaN(version)) {
                            throw new Error("Bad version number : " + options.parser.version);
                          } else {
                            options.parser.version = version;
                          }
                        } else if (typeof options.parser.version !== "number") {
                          throw new Error("Expecting a number for version");
                        }
                        if (options.parser.version < 500 || options.parser.version > 900) {
                          throw new Error("Can only handle versions between 5.x to 8.x");
                        }
                      }
                    }
                    combine(options, this);
                    this.lexer.version = this.parser.version;
                  }
                };
                var getStringBuffer = function getStringBuffer2(buffer) {
                  return typeof buffer.write === "function" ? buffer.toString() : buffer;
                };
                Engine.create = function(options) {
                  return new Engine(options);
                };
                Engine.parseEval = function(buffer, options) {
                  var self2 = new Engine(options);
                  return self2.parseEval(buffer);
                };
                Engine.prototype.parseEval = function(buffer) {
                  this.lexer.mode_eval = true;
                  this.lexer.all_tokens = false;
                  buffer = getStringBuffer(buffer);
                  return this.parser.parse(buffer, "eval");
                };
                Engine.parseCode = function(buffer, filename, options) {
                  if (_typeof(filename) === "object" && !options) {
                    options = filename;
                    filename = "unknown";
                  }
                  var self2 = new Engine(options);
                  return self2.parseCode(buffer, filename);
                };
                Engine.prototype.parseCode = function(buffer, filename) {
                  this.lexer.mode_eval = false;
                  this.lexer.all_tokens = false;
                  buffer = getStringBuffer(buffer);
                  return this.parser.parse(buffer, filename);
                };
                Engine.tokenGetAll = function(buffer, options) {
                  var self2 = new Engine(options);
                  return self2.tokenGetAll(buffer);
                };
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
                    if (Object.prototype.hasOwnProperty.call(names, token)) {
                      entry = [names[token], entry, this.lexer.yylloc.first_line];
                    }
                    result.push(entry);
                    token = this.lexer.lex() || EOF;
                  }
                  return result;
                };
                module3.exports = Engine;
                module3.exports.tokens = tokens;
                module3.exports.lexer = lexer;
                module3.exports.AST = AST;
                module3.exports.parser = parser;
                module3.exports.combine = combine;
                module3.exports.Engine = Engine;
                module3.exports["default"] = Engine;
              },
              /***/
              9108(module3, __unused_webpack_exports, __webpack_require__2) {
                function _typeof(o) {
                  "@babel/helpers - typeof";
                  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
                    return typeof o2;
                  } : function(o2) {
                    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
                  }, _typeof(o);
                }
                var Lexer = function Lexer2(engine) {
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
                  if (this.version > 703) {
                    this.keywords.fn = this.tok.T_FN;
                  } else {
                    delete this.keywords.fn;
                  }
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
                    /*
                     * this used for parser to detemine the if current node segment is first encaps node.
                     * if ture, the indentation will remove from the begining. and if false, the prev node
                     * might be a variable '}' ,and the leading spaces should not be removed util meet the
                     * first \n
                     */
                    first_encaps_node: false,
                    // for backward compatible
                    /* istanbul ignore next */
                    toString: function toString() {
                      this.label;
                    }
                  };
                  return this;
                };
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
                  } else {
                    this.yylloc.last_column++;
                  }
                  return ch;
                };
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
                    } else {
                      this.yylloc.last_column--;
                    }
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
                          if (c !== "\n") {
                            if (c === "\r") {
                              this.yylloc.last_line++;
                            } else {
                              this.yylloc.last_column++;
                            }
                          }
                        } else if (c === "\n") {
                          this.yyprevcol = this.yylloc.last_column;
                          this.yylloc.last_line++;
                          this.yylloc.last_column = 0;
                        } else {
                          this.yylloc.last_column++;
                        }
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
                Lexer.prototype.tryMatch = function(text) {
                  return text === this.ahead(text.length);
                };
                Lexer.prototype.tryMatchCaseless = function(text) {
                  return text === this.ahead(text.length).toLowerCase();
                };
                Lexer.prototype.ahead = function(size) {
                  var text = this._input.substring(this.offset, this.offset + size);
                  if (text[text.length - 1] === "\r" && this._input[this.offset + size + 1] === "\n") {
                    text += "\n";
                  }
                  return text;
                };
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
                    } else {
                      this.yylloc.last_column++;
                    }
                  }
                  return this;
                };
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
                Lexer.prototype.setState = function(state) {
                  this.yytext = state.yytext;
                  this.offset = state.offset;
                  this.yylineno = state.yylineno;
                  this.yyprevcol = state.yyprevcol;
                  this.yylloc = state.yylloc;
                  if (state.heredoc_label) {
                    this.heredoc_label = state.heredoc_label;
                  }
                  return this;
                };
                Lexer.prototype.appendToken = function(value, ahead) {
                  this.tokens.push([value, ahead]);
                  return this;
                };
                Lexer.prototype.lex = function() {
                  this.yylloc.prev_offset = this.offset;
                  this.yylloc.prev_line = this.yylloc.last_line;
                  this.yylloc.prev_column = this.yylloc.last_column;
                  var token = this.next() || this.lex();
                  if (!this.all_tokens) {
                    while (token === this.tok.T_WHITESPACE || // ignore white space
                    !this.comment_tokens && (token === this.tok.T_COMMENT || // ignore single lines comments
                    token === this.tok.T_DOC_COMMENT) || // ignore doc comments
                    // ignore open tags
                    token === this.tok.T_OPEN_TAG) {
                      token = this.next() || this.lex();
                    }
                    if (token == this.tok.T_OPEN_TAG_WITH_ECHO) {
                      return this.tok.T_ECHO;
                    } else if (token === this.tok.T_CLOSE_TAG) {
                      return ";";
                    }
                  }
                  if (!this.yylloc.prev_offset) {
                    this.yylloc.prev_offset = this.yylloc.first_offset;
                    this.yylloc.prev_line = this.yylloc.first_line;
                    this.yylloc.prev_column = this.yylloc.first_column;
                  }
                  return token;
                };
                Lexer.prototype.begin = function(condition) {
                  this.conditionStack.push(condition);
                  this.curCondition = condition;
                  this.stateCb = this["match" + condition];
                  if (typeof this.stateCb !== "function") {
                    throw new Error('Undefined condition state "' + condition + '"');
                  }
                  return this;
                };
                Lexer.prototype.popState = function() {
                  var n = this.conditionStack.length - 1;
                  var condition = n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
                  this.curCondition = this.conditionStack[this.conditionStack.length - 1];
                  this.stateCb = this["match" + this.curCondition];
                  if (typeof this.stateCb !== "function") {
                    throw new Error('Undefined condition state "' + this.curCondition + '"');
                  }
                  return condition;
                };
                Lexer.prototype.next = function() {
                  var token;
                  if (!this._input) {
                    this.done = true;
                  }
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
                    if (_typeof(token[1]) === "object") {
                      this.setState(token[1]);
                    } else {
                      this.consume(token[1]);
                    }
                    token = token[0];
                  } else {
                    token = this.stateCb.apply(this, []);
                  }
                  if (this.offset >= this.size && this.tokens.length === 0) {
                    this.done = true;
                  }
                  if (this.debug) {
                    var tName = token;
                    if (typeof tName === "number") {
                      tName = this.engine.tokens.values[tName];
                    } else {
                      tName = '"' + tName + '"';
                    }
                    var e = new Error(tName + "	from " + this.yylloc.first_line + "," + this.yylloc.first_column + "	 - to " + this.yylloc.last_line + "," + this.yylloc.last_column + '	"' + this.yytext + '"');
                    console.error(e.stack);
                  }
                  return token;
                };
                [__webpack_require__2(9671), __webpack_require__2(2429), __webpack_require__2(3683), __webpack_require__2(6545), __webpack_require__2(3810), __webpack_require__2(8510), __webpack_require__2(4401), __webpack_require__2(4349), __webpack_require__2(8582)].forEach(function(ext) {
                  for (var k in ext) {
                    Lexer.prototype[k] = ext[k];
                  }
                });
                module3.exports = Lexer;
              },
              /***/
              9671(module3) {
                module3.exports = {
                  attributeIndex: 0,
                  attributeListDepth: {},
                  matchST_ATTRIBUTE: function matchST_ATTRIBUTE() {
                    var ch = this.input();
                    if (this.is_WHITESPACE()) {
                      do {
                        this.input();
                      } while (this.is_WHITESPACE());
                      this.unput(1);
                      return null;
                    }
                    switch (ch) {
                      case "]":
                        if (this.attributeListDepth[this.attributeIndex] === 0) {
                          delete this.attributeListDepth[this.attributeIndex];
                          this.attributeIndex--;
                          this.popState();
                        } else {
                          this.attributeListDepth[this.attributeIndex]--;
                        }
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
                      case ".":
                        return this.consume_TOKEN();
                      case "[":
                        this.attributeListDepth[this.attributeIndex]++;
                        return "[";
                      case ",":
                        return ",";
                      case '"':
                        return this.ST_DOUBLE_QUOTES();
                      case "'":
                        return this.T_CONSTANT_ENCAPSED_STRING();
                      case "/":
                        if (this._input[this.offset] === "/") {
                          return this.T_COMMENT();
                        } else if (this._input[this.offset] === "*") {
                          this.input();
                          return this.T_DOC_COMMENT();
                        } else {
                          return this.consume_TOKEN();
                        }
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
                    } else if (this.is_NUM()) {
                      return this.consume_NUM();
                    }
                    throw new Error('Bad terminal sequence "'.concat(ch, '" at line ').concat(this.yylineno, " (offset ").concat(this.offset, ")"));
                  }
                };
              },
              /***/
              2429(module3) {
                module3.exports = {
                  /*
                   * Reads a single line comment
                   */
                  T_COMMENT: function T_COMMENT() {
                    while (this.offset < this.size) {
                      var ch = this.input();
                      if (ch === "\n" || ch === "\r") {
                        return this.tok.T_COMMENT;
                      } else if (ch === "?" && !this.aspTagMode && this._input[this.offset] === ">") {
                        this.unput(1);
                        return this.tok.T_COMMENT;
                      } else if (ch === "%" && this.aspTagMode && this._input[this.offset] === ">") {
                        this.unput(1);
                        return this.tok.T_COMMENT;
                      }
                    }
                    return this.tok.T_COMMENT;
                  },
                  /*
                   * Behaviour : https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1927
                   */
                  T_DOC_COMMENT: function T_DOC_COMMENT() {
                    var ch = this.input();
                    var token = this.tok.T_COMMENT;
                    if (ch === "*") {
                      ch = this.input();
                      if (this.is_WHITESPACE()) {
                        token = this.tok.T_DOC_COMMENT;
                      }
                      if (ch === "/") {
                        return token;
                      } else {
                        this.unput(1);
                      }
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
              /***/
              3683(module3) {
                module3.exports = {
                  nextINITIAL: function nextINITIAL() {
                    if (this.conditionStack.length > 1 && this.conditionStack[this.conditionStack.length - 1] === "INITIAL") {
                      this.popState();
                    } else {
                      this.begin("ST_IN_SCRIPTING");
                    }
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
                        } else if (this.asp_tags && ch == "%") {
                          if (this.tryMatch("%=")) {
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
                    }
                    if (this.yytext.length > 0) {
                      return this.tok.T_INLINE_HTML;
                    } else {
                      return false;
                    }
                  }
                };
              },
              /***/
              6545(module3) {
                var MAX_LENGTH_OF_LONG = 10;
                var long_min_digits = "2147483648";
                if (process$1.arch == "x64") {
                  MAX_LENGTH_OF_LONG = 19;
                  long_min_digits = "9223372036854775808";
                }
                module3.exports = {
                  consume_NUM: function consume_NUM() {
                    var ch = this.yytext[0];
                    var hasPoint = ch === ".";
                    if (ch === "0") {
                      ch = this.input();
                      if (ch === "x" || ch === "X") {
                        ch = this.input();
                        if (ch !== "_" && this.is_HEX()) {
                          return this.consume_HNUM();
                        } else {
                          this.unput(ch ? 2 : 1);
                        }
                      } else if (ch === "b" || ch === "B") {
                        ch = this.input();
                        if (ch !== "_" && ch === "0" || ch === "1") {
                          return this.consume_BNUM();
                        } else {
                          this.unput(ch ? 2 : 1);
                        }
                      } else if (ch === "o" || ch === "O") {
                        ch = this.input();
                        if (ch !== "_" && this.is_OCTAL()) {
                          return this.consume_ONUM();
                        } else {
                          this.unput(ch ? 2 : 1);
                        }
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
                    if (hasPoint) {
                      return this.tok.T_DNUMBER;
                    } else if (this.yytext.length < MAX_LENGTH_OF_LONG - 1) {
                      return this.tok.T_LNUMBER;
                    } else {
                      if (this.yytext.length < MAX_LENGTH_OF_LONG || this.yytext.length == MAX_LENGTH_OF_LONG && this.yytext < long_min_digits) {
                        return this.tok.T_LNUMBER;
                      }
                      return this.tok.T_DNUMBER;
                    }
                  },
                  // read hexa
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
                  // read a generic number
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
                  // read binary
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
                  // read an octal number
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
              /***/
              3810(module3) {
                module3.exports = {
                  matchST_LOOKING_FOR_PROPERTY: function matchST_LOOKING_FOR_PROPERTY() {
                    var ch = this.input();
                    if (ch === "-") {
                      ch = this.input();
                      if (ch === ">") {
                        return this.tok.T_OBJECT_OPERATOR;
                      }
                      if (ch) this.unput(1);
                    } else if (this.is_WHITESPACE()) {
                      return this.tok.T_WHITESPACE;
                    } else if (this.is_LABEL_START()) {
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
                      } else {
                        this.unput(this.yytext.length);
                      }
                    } else {
                      if (ch) this.unput(1);
                    }
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
                      } else {
                        throw new Error("Unexpected terminal");
                      }
                    } else if (this.is_LABEL_START()) {
                      this.consume_LABEL();
                      return this.tok.T_STRING;
                    } else if (this.is_WHITESPACE() || ch === "\\" || ch === "'" || ch === "#") {
                      return this.tok.T_ENCAPSED_AND_WHITESPACE;
                    } else if (ch === "[" || ch === "{" || ch === "}" || ch === '"' || ch === "`" || this.is_TOKEN()) {
                      return ch;
                    } else {
                      throw new Error("Unexpected terminal");
                    }
                  }
                };
              },
              /***/
              8510(module3) {
                module3.exports = {
                  matchST_IN_SCRIPTING: function matchST_IN_SCRIPTING() {
                    var ch = this.input();
                    switch (ch) {
                      case " ":
                      case "	":
                      case "\n":
                      case "\r":
                      case "\r\n":
                        return this.T_WHITESPACE();
                      case "#":
                        if (this.version >= 800 && this._input[this.offset] === "[") {
                          this.input();
                          this.attributeListDepth[++this.attributeIndex] = 0;
                          this.begin("ST_ATTRIBUTE");
                          return this.tok.T_ATTRIBUTE;
                        }
                        return this.T_COMMENT();
                      case "/":
                        if (this._input[this.offset] === "/") {
                          return this.T_COMMENT();
                        } else if (this._input[this.offset] === "*") {
                          this.input();
                          return this.T_DOC_COMMENT();
                        }
                        return this.consume_TOKEN();
                      case "'":
                        return this.T_CONSTANT_ENCAPSED_STRING();
                      case '"':
                        return this.ST_DOUBLE_QUOTES();
                      case "`":
                        this.begin("ST_BACKQUOTE");
                        return "`";
                      case "?":
                        if (!this.aspTagMode && this.tryMatch(">")) {
                          this.input();
                          var nextCH = this._input[this.offset];
                          if (nextCH === "\n" || nextCH === "\r") this.input();
                          if (this.conditionStack.length > 1) {
                            this.begin("INITIAL");
                          }
                          return this.tok.T_CLOSE_TAG;
                        }
                        return this.consume_TOKEN();
                      case "%":
                        if (this.aspTagMode && this._input[this.offset] === ">") {
                          this.input();
                          ch = this._input[this.offset];
                          if (ch === "\n" || ch === "\r") {
                            this.input();
                          }
                          this.aspTagMode = false;
                          if (this.conditionStack.length > 1) {
                            this.begin("INITIAL");
                          }
                          return this.tok.T_CLOSE_TAG;
                        }
                        return this.consume_TOKEN();
                      case "{":
                        this.begin("ST_IN_SCRIPTING");
                        return "{";
                      case "}":
                        if (this.conditionStack.length > 2) {
                          this.popState();
                        }
                        return "}";
                      default:
                        if (ch === ".") {
                          ch = this.input();
                          if (this.is_NUM_START()) {
                            return this.consume_NUM();
                          } else {
                            if (ch) this.unput(1);
                          }
                        }
                        if (this.is_NUM_START()) {
                          return this.consume_NUM();
                        } else if (this.is_LABEL_START()) {
                          return this.consume_LABEL().T_STRING();
                        } else if (this.is_TOKEN()) {
                          return this.consume_TOKEN();
                        }
                    }
                    throw new Error('Bad terminal sequence "' + ch + '" at line ' + this.yylineno + " (offset " + this.offset + ")");
                  },
                  T_WHITESPACE: function T_WHITESPACE() {
                    while (this.offset < this.size) {
                      var ch = this.input();
                      if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
                        continue;
                      }
                      if (ch) this.unput(1);
                      break;
                    }
                    return this.tok.T_WHITESPACE;
                  }
                };
              },
              /***/
              4401(module3) {
                var newline = ["\n", "\r"];
                var valid_after_heredoc = ["\n", "\r", ";"];
                var valid_after_heredoc_73 = valid_after_heredoc.concat(["	", " ", ",", "]", ")", "/", "=", "!", "."]);
                module3.exports = {
                  T_CONSTANT_ENCAPSED_STRING: function T_CONSTANT_ENCAPSED_STRING() {
                    var ch;
                    while (this.offset < this.size) {
                      ch = this.input();
                      if (ch == "\\") {
                        this.input();
                      } else if (ch == "'") {
                        break;
                      }
                    }
                    return this.tok.T_CONSTANT_ENCAPSED_STRING;
                  },
                  // check if matching a HEREDOC state
                  is_HEREDOC: function is_HEREDOC() {
                    var revert = this.offset;
                    if (this._input[this.offset - 1] === "<" && this._input[this.offset] === "<" && this._input[this.offset + 1] === "<") {
                      this.offset += 3;
                      if (this.is_TABSPACE()) {
                        while (this.offset < this.size) {
                          this.offset++;
                          if (!this.is_TABSPACE()) {
                            break;
                          }
                        }
                      }
                      var tChar = this._input[this.offset - 1];
                      if (tChar === "'" || tChar === '"') {
                        this.offset++;
                      } else {
                        tChar = null;
                      }
                      if (this.is_LABEL_START()) {
                        var yyoffset = this.offset - 1;
                        while (this.offset < this.size) {
                          this.offset++;
                          if (!this.is_LABEL()) {
                            break;
                          }
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
                            if (tChar === "'") {
                              this.begin("ST_NOWDOC");
                            } else {
                              this.begin("ST_HEREDOC");
                            }
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
                      if (ch == "\\") {
                        this.input();
                      } else if (ch == '"') {
                        break;
                      } else if (ch == "$") {
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
                    if (ch == '"') {
                      return this.tok.T_CONSTANT_ENCAPSED_STRING;
                    } else {
                      var prefix = 1;
                      if (this.yytext[0] === "b" || this.yytext[0] === "B") {
                        prefix = 2;
                      }
                      if (this.yytext.length > 2) {
                        this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE, this.yytext.length - prefix);
                      }
                      this.unput(this.yytext.length - prefix);
                      this.begin("ST_DOUBLE_QUOTES");
                      return this.yytext;
                    }
                  },
                  // check if its a DOC end sequence
                  isDOC_MATCH: function isDOC_MATCH(offset, consumeLeadingSpaces) {
                    var prev_ch = this._input[offset - 2];
                    if (!newline.includes(prev_ch)) {
                      return false;
                    }
                    var indentation_uses_spaces = false;
                    var indentation_uses_tabs = false;
                    var indentation = 0;
                    var leading_ch = this._input[offset - 1];
                    if (this.version >= 703) {
                      while (leading_ch === "	" || leading_ch === " ") {
                        if (leading_ch === " ") {
                          indentation_uses_spaces = true;
                        } else if (leading_ch === "	") {
                          indentation_uses_tabs = true;
                        }
                        leading_ch = this._input[offset + indentation];
                        indentation++;
                      }
                      offset = offset + indentation;
                      if (newline.includes(this._input[offset - 1])) {
                        return false;
                      }
                    }
                    if (this._input.substring(offset - 1, offset - 1 + this.heredoc_label.length) === this.heredoc_label.label) {
                      var ch = this._input[offset - 1 + this.heredoc_label.length];
                      if ((this.version >= 703 ? valid_after_heredoc_73 : valid_after_heredoc).includes(ch)) {
                        if (consumeLeadingSpaces) {
                          this.consume(indentation);
                          if (indentation_uses_spaces && indentation_uses_tabs) {
                            throw new Error("Parse error:  mixing spaces and tabs in ending marker at line " + this.yylineno + " (offset " + this.offset + ")");
                          }
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
                  /*
                   * Prematch the end of HEREDOC/NOWDOC end tag to preset the
                   * context of this.heredoc_label
                   */
                  prematch_ENDOFDOC: function prematch_ENDOFDOC() {
                    this.heredoc_label.indentation_uses_spaces = false;
                    this.heredoc_label.indentation = 0;
                    this.heredoc_label.first_encaps_node = true;
                    var offset = this.offset + 1;
                    while (offset < this._input.length) {
                      if (this.isDOC_MATCH(offset, false)) {
                        return;
                      }
                      if (!newline.includes(this._input[offset - 1])) {
                        while (!newline.includes(this._input[offset++]) && offset < this._input.length) {
                        }
                      }
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
                    while (this.offset < this.size) {
                      if (newline.includes(ch)) {
                        ch = this.input();
                        if (this.isDOC_MATCH(this.offset, true)) {
                          this.unput(1).popState();
                          this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
                          return this.tok.T_ENCAPSED_AND_WHITESPACE;
                        }
                      } else {
                        ch = this.input();
                      }
                    }
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
                        if (!newline.includes(ch)) {
                          ch = this.input();
                        }
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
                          } else {
                            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                          }
                        } else if (this.is_LABEL_START()) {
                          var yyoffset = this.offset;
                          var next = this.consume_VARIABLE();
                          if (this.yytext.length > this.offset - yyoffset + 2) {
                            this.appendToken(next, this.offset - yyoffset + 2);
                            this.unput(this.offset - yyoffset + 2);
                            return this.tok.T_ENCAPSED_AND_WHITESPACE;
                          } else {
                            return next;
                          }
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
                      } else {
                        ch = this.input();
                      }
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
                    } else if (ch === "-") {
                      if (this.input() === ">") {
                        this.input();
                        if (this.is_LABEL_START()) {
                          this.begin("ST_LOOKING_FOR_PROPERTY");
                        }
                        this.unput(3);
                        return this.tok.T_VARIABLE;
                      } else {
                        this.unput(2);
                      }
                    } else {
                      if (ch) this.unput(1);
                    }
                    return this.tok.T_VARIABLE;
                  },
                  // HANDLES BACKQUOTES
                  matchST_BACKQUOTE: function matchST_BACKQUOTE() {
                    var ch = this.input();
                    if (ch === "$") {
                      ch = this.input();
                      if (ch === "{") {
                        this.begin("ST_LOOKING_FOR_VARNAME");
                        return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                      } else if (this.is_LABEL_START()) {
                        var tok = this.consume_VARIABLE();
                        return tok;
                      }
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
                      if (ch === "\\") {
                        this.input();
                      } else if (ch === "`") {
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
                          } else {
                            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                          }
                        } else if (this.is_LABEL_START()) {
                          var yyoffset = this.offset;
                          var next = this.consume_VARIABLE();
                          if (this.yytext.length > this.offset - yyoffset + 2) {
                            this.appendToken(next, this.offset - yyoffset + 2);
                            this.unput(this.offset - yyoffset + 2);
                            return this.tok.T_ENCAPSED_AND_WHITESPACE;
                          } else {
                            return next;
                          }
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
                      } else if (this.is_LABEL_START()) {
                        var tok = this.consume_VARIABLE();
                        return tok;
                      }
                    } else if (ch === "{") {
                      if (this._input[this.offset] === "$") {
                        this.begin("ST_IN_SCRIPTING");
                        return this.tok.T_CURLY_OPEN;
                      }
                    } else if (ch === '"') {
                      this.popState();
                      return '"';
                    }
                    while (this.offset < this.size) {
                      if (ch === "\\") {
                        this.input();
                      } else if (ch === '"') {
                        this.unput(1);
                        this.popState();
                        this.appendToken('"', 1);
                        break;
                      } else if (ch === "$") {
                        ch = this.input();
                        if (ch === "{") {
                          this.begin("ST_LOOKING_FOR_VARNAME");
                          if (this.yytext.length > 2) {
                            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
                            this.unput(2);
                            return this.tok.T_ENCAPSED_AND_WHITESPACE;
                          } else {
                            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                          }
                        } else if (this.is_LABEL_START()) {
                          var yyoffset = this.offset;
                          var next = this.consume_VARIABLE();
                          if (this.yytext.length > this.offset - yyoffset + 2) {
                            this.appendToken(next, this.offset - yyoffset + 2);
                            this.unput(this.offset - yyoffset + 2);
                            return this.tok.T_ENCAPSED_AND_WHITESPACE;
                          } else {
                            return next;
                          }
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
              /***/
              4349(module3) {
                module3.exports = {
                  T_STRING: function T_STRING() {
                    var token = this.yytext.toLowerCase();
                    var id = this.keywords[token];
                    if (typeof id !== "number") {
                      if (token === "yield") {
                        if (this.version >= 700 && this.tryMatch(" from")) {
                          this.consume(5);
                          id = this.tok.T_YIELD_FROM;
                        } else {
                          id = this.tok.T_YIELD;
                        }
                      } else {
                        id = this.tok.T_STRING;
                        if (token === "b" || token === "B") {
                          var ch = this.input();
                          if (ch === '"') {
                            return this.ST_DOUBLE_QUOTES();
                          } else if (ch === "'") {
                            return this.T_CONSTANT_ENCAPSED_STRING();
                          } else if (ch) {
                            this.unput(1);
                          }
                        }
                      }
                    }
                    if (id === this.tok.T_ENUM) {
                      if (this.version < 801) {
                        return this.tok.T_STRING;
                      }
                      var initial = this.offset;
                      var _ch = this.input();
                      while (_ch == " ") {
                        _ch = this.input();
                      }
                      var isEnum = false;
                      if (this.is_LABEL_START()) {
                        while (this.is_LABEL()) {
                          _ch += this.input();
                        }
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
                      if (_ch2) {
                        this.unput(1);
                      }
                    }
                    return id;
                  },
                  // reads a custom token
                  consume_TOKEN: function consume_TOKEN() {
                    var ch = this._input[this.offset - 1];
                    var fn = this.tokenTerminals[ch];
                    if (fn) {
                      return fn.apply(this, []);
                    } else {
                      return this.yytext;
                    }
                  },
                  // list of special char tokens
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
                        } else {
                          this.unput(1);
                        }
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
                      } else {
                        return ":";
                      }
                    },
                    "(": function _() {
                      var initial = this.offset;
                      this.input();
                      if (this.is_TABSPACE()) {
                        this.consume_TABSPACE().input();
                      }
                      if (this.is_LABEL_START()) {
                        var yylen = this.yytext.length;
                        this.consume_LABEL();
                        var castToken = this.yytext.substring(yylen - 1).toLowerCase();
                        var castId = this.castKeywords[castToken];
                        if (typeof castId === "number") {
                          this.input();
                          if (this.is_TABSPACE()) {
                            this.consume_TABSPACE().input();
                          }
                          if (this._input[this.offset - 1] === ")") {
                            return castId;
                          }
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
                      } else if (nchar === "=") {
                        if (this._input[this.offset + 1] === "=") {
                          this.consume(2);
                          return this.tok.T_IS_IDENTICAL;
                        } else {
                          this.input();
                          return this.tok.T_IS_EQUAL;
                        }
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
                      if (this._input[this.offset] === "=") {
                        if (this._input[this.offset + 1] === "=") {
                          this.consume(2);
                          return this.tok.T_IS_NOT_IDENTICAL;
                        } else {
                          this.input();
                          return this.tok.T_IS_NOT_EQUAL;
                        }
                      }
                      return "!";
                    },
                    "?": function _() {
                      if (this.version >= 700 && this._input[this.offset] === "?") {
                        if (this.version >= 704 && this._input[this.offset + 1] === "=") {
                          this.consume(2);
                          return this.tok.T_COALESCE_EQUAL;
                        } else {
                          this.input();
                          return this.tok.T_COALESCE;
                        }
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
                          if (this.is_HEREDOC()) {
                            return this.tok.T_START_HEREDOC;
                          }
                        }
                        this.input();
                        return this.tok.T_SL;
                      } else if (nchar === "=") {
                        this.input();
                        if (this.version >= 700 && this._input[this.offset] === ">") {
                          this.input();
                          return this.tok.T_SPACESHIP;
                        } else {
                          return this.tok.T_IS_SMALLER_OR_EQUAL;
                        }
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
                        } else {
                          return this.tok.T_POW;
                        }
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
              /***/
              8582(module3) {
                var tokens = ";:,.\\[]()|^&+-/*=%!~$<>?@";
                module3.exports = {
                  // check if the char can be a numeric
                  is_NUM: function is_NUM() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    return ch > 47 && ch < 58 || ch === 95;
                  },
                  // check if the char can be a numeric
                  is_NUM_START: function is_NUM_START() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    return ch > 47 && ch < 58;
                  },
                  // check if current char can be a label
                  is_LABEL: function is_LABEL() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    return ch > 96 && ch < 123 || ch > 64 && ch < 91 || ch === 95 || ch > 47 && ch < 58 || ch > 126;
                  },
                  // check if current char can be a label
                  is_LABEL_START: function is_LABEL_START() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    if (ch > 64 && ch < 91) return true;
                    if (ch > 96 && ch < 123) return true;
                    if (ch === 95) return true;
                    if (ch > 126) return true;
                    return false;
                  },
                  // reads each char of the label
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
                  // check if current char is a token char
                  is_TOKEN: function is_TOKEN() {
                    var ch = this._input[this.offset - 1];
                    return tokens.indexOf(ch) !== -1;
                  },
                  // check if current char is a whitespace
                  is_WHITESPACE: function is_WHITESPACE() {
                    var ch = this._input[this.offset - 1];
                    return ch === " " || ch === "	" || ch === "\n" || ch === "\r";
                  },
                  // check if current char is a whitespace (without newlines)
                  is_TABSPACE: function is_TABSPACE() {
                    var ch = this._input[this.offset - 1];
                    return ch === " " || ch === "	";
                  },
                  // consume all whitespaces (excluding newlines)
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
                  // check if current char can be a hexadecimal number
                  is_HEX: function is_HEX() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    if (ch > 47 && ch < 58) return true;
                    if (ch > 64 && ch < 71) return true;
                    if (ch > 96 && ch < 103) return true;
                    if (ch === 95) return true;
                    return false;
                  },
                  // check if current char can be an octal number
                  is_OCTAL: function is_OCTAL() {
                    var ch = this._input.charCodeAt(this.offset - 1);
                    if (ch > 47 && ch < 56) return true;
                    if (ch === 95) return true;
                    return false;
                  }
                };
              },
              /***/
              7259(module3, __unused_webpack_exports, __webpack_require__2) {
                var Position2 = __webpack_require__2(8822);
                function isNumber(n) {
                  return n != "." && n != "," && !isNaN(parseFloat(n)) && isFinite(n);
                }
                var Parser = function Parser2(lexer, ast) {
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
                  var mapIt = function mapIt2(item) {
                    return [item, null];
                  };
                  this.entries = {
                    // reserved_non_modifiers
                    IDENTIFIER: new Map([this.tok.T_ABSTRACT, this.tok.T_ARRAY, this.tok.T_AS, this.tok.T_BREAK, this.tok.T_CALLABLE, this.tok.T_CASE, this.tok.T_CATCH, this.tok.T_CLASS, this.tok.T_CLASS_C, this.tok.T_CLONE, this.tok.T_CONST, this.tok.T_CONTINUE, this.tok.T_DECLARE, this.tok.T_DEFAULT, this.tok.T_DIR, this.tok.T_DO, this.tok.T_ECHO, this.tok.T_ELSE, this.tok.T_ELSEIF, this.tok.T_EMPTY, this.tok.T_ENDDECLARE, this.tok.T_ENDFOR, this.tok.T_ENDFOREACH, this.tok.T_ENDIF, this.tok.T_ENDSWITCH, this.tok.T_ENDWHILE, this.tok.T_ENUM, this.tok.T_EVAL, this.tok.T_EXIT, this.tok.T_EXTENDS, this.tok.T_FILE, this.tok.T_FINAL, this.tok.T_FINALLY, this.tok.T_FN, this.tok.T_FOR, this.tok.T_FOREACH, this.tok.T_FUNC_C, this.tok.T_FUNCTION, this.tok.T_GLOBAL, this.tok.T_GOTO, this.tok.T_IF, this.tok.T_IMPLEMENTS, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_INSTANCEOF, this.tok.T_INSTEADOF, this.tok.T_INTERFACE, this.tok.T_ISSET, this.tok.T_LINE, this.tok.T_LIST, this.tok.T_LOGICAL_AND, this.tok.T_LOGICAL_OR, this.tok.T_LOGICAL_XOR, this.tok.T_MATCH, this.tok.T_METHOD_C, this.tok.T_NAMESPACE, this.tok.T_NEW, this.tok.T_NS_C, this.tok.T_PRINT, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_PUBLIC, this.tok.T_READ_ONLY, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_RETURN, this.tok.T_STATIC, this.tok.T_SWITCH, this.tok.T_THROW, this.tok.T_TRAIT, this.tok.T_TRY, this.tok.T_UNSET, this.tok.T_USE, this.tok.T_VAR, this.tok.T_WHILE, this.tok.T_YIELD].map(mapIt)),
                    VARIABLE: new Map([this.tok.T_VARIABLE, "$", "&", this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE, this.tok.T_STATIC].map(mapIt)),
                    SCALAR: new Map([this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(mapIt)),
                    T_MAGIC_CONST: new Map([this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C].map(mapIt)),
                    T_MEMBER_FLAGS: new Map([this.tok.T_PUBLIC, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_STATIC, this.tok.T_ABSTRACT, this.tok.T_FINAL].map(mapIt)),
                    EOS: new Map([";", this.EOF, this.tok.T_INLINE_HTML].map(mapIt)),
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
                      // using VARIABLES :
                      this.tok.T_VARIABLE,
                      "$",
                      this.tok.T_NS_SEPARATOR,
                      this.tok.T_STRING,
                      this.tok.T_NAME_RELATIVE,
                      this.tok.T_NAME_QUALIFIED,
                      this.tok.T_NAME_FULLY_QUALIFIED,
                      // using SCALAR :
                      this.tok.T_STRING,
                      // @see variable.js line 45 > conflict with variable = shift/reduce :)
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
                      '"',
                      'b"',
                      'B"',
                      "-",
                      this.tok.T_NS_SEPARATOR
                    ].map(mapIt))
                  };
                };
                Parser.prototype.getTokenName = function(token) {
                  if (!isNumber(token)) {
                    return "'" + token + "'";
                  } else {
                    if (token == this.EOF) return "the end of file (EOF)";
                    return this.lexer.engine.tokens.values[token];
                  }
                };
                Parser.prototype.parse = function(code, filename) {
                  this._errors = [];
                  this.filename = filename || "eval";
                  this.currentNamespace = [""];
                  if (this.extractDoc) {
                    this._docs = [];
                  } else {
                    this._docs = null;
                  }
                  if (this.extractTokens) {
                    this._tokens = [];
                  } else {
                    this._tokens = null;
                  }
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
                  while (this.token != this.EOF) {
                    childs.push(this.read_start());
                  }
                  if (childs.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                    childs.push(this.node("noop")());
                  }
                  this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
                  var result = program(childs, this._errors, this._docs, this._tokens);
                  if (this.debug) {
                    var errors = this.ast.checkNodes();
                    if (errors.length > 0) {
                      errors.forEach(function(error) {
                        if (error.position) {
                          console.log("Node at line " + error.position.line + ", column " + error.position.column);
                        }
                        console.log(error.stack.join("\n"));
                      });
                      throw new Error("Some nodes are not closed");
                    }
                  }
                  return result;
                };
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
                Parser.prototype.error = function(expect) {
                  var msg = "Parse Error : syntax error";
                  var token = this.getTokenName(this.token);
                  var msgExpect = "";
                  if (this.token !== this.EOF) {
                    if (isNumber(this.token)) {
                      var symbol = this.text();
                      if (symbol.length > 10) {
                        symbol = symbol.substring(0, 7) + "...";
                      }
                      token = "'" + symbol + "' (" + token + ")";
                    }
                    msg += ", unexpected " + token;
                  }
                  if (expect && !Array.isArray(expect)) {
                    if (isNumber(expect) || expect.length === 1) {
                      msgExpect = ", expecting " + this.getTokenName(expect);
                    }
                    msg += msgExpect;
                  }
                  return this.raiseError(msg, msgExpect, expect, token);
                };
                Parser.prototype.position = function() {
                  return new Position2(this.lexer.yylloc.first_line, this.lexer.yylloc.first_column, this.lexer.yylloc.first_offset);
                };
                Parser.prototype.node = function(name) {
                  if (this.extractDoc) {
                    var docs = null;
                    if (this._docIndex < this._docs.length) {
                      docs = this._docs.slice(this._docIndex);
                      this._docIndex = this._docs.length;
                      if (this.debug) {
                        console.log(new Error("Append docs on " + name));
                        console.log(docs);
                      }
                    }
                    var node = this.ast.prepare(name, docs, this);
                    node.postBuild = (function(self2) {
                      if (this._docIndex < this._docs.length) {
                        if (this._lastNode) {
                          var offset = this.prev[2];
                          var max = this._docIndex;
                          for (; max < this._docs.length; max++) {
                            if (this._docs[max].offset > offset) {
                              break;
                            }
                          }
                          if (max > this._docIndex) {
                            this._lastNode.setTrailingComments(this._docs.slice(this._docIndex, max));
                            this._docIndex = max;
                          }
                        } else if (this.token === this.EOF) {
                          self2.setTrailingComments(this._docs.slice(this._docIndex));
                          this._docIndex = this._docs.length;
                        }
                      }
                      this._lastNode = self2;
                    }).bind(this);
                    return node;
                  }
                  return this.ast.prepare(name, null, this);
                };
                Parser.prototype.expectEndOfStatement = function(node) {
                  if (this.token === ";") {
                    if (node && this.lexer.yytext === ";") {
                      node.includeToken(this);
                    }
                  } else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
                    this.error(";");
                    return false;
                  }
                  this.next();
                  return true;
                };
                var ignoreStack = ["parser.next", "parser.node", "parser.showlog"];
                Parser.prototype.showlog = function() {
                  var stack = new Error().stack.split("\n");
                  var line;
                  for (var offset = 2; offset < stack.length; offset++) {
                    line = stack[offset].trim();
                    var found = false;
                    for (var i = 0; i < ignoreStack.length; i++) {
                      if (line.substring(3, 3 + ignoreStack[i].length) === ignoreStack[i]) {
                        found = true;
                        break;
                      }
                    }
                    if (!found) {
                      break;
                    }
                  }
                  console.log("Line " + this.lexer.yylloc.first_line + " : " + this.getTokenName(this.token) + ">" + this.lexer.yytext + "< @-->" + line);
                  return this;
                };
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
                Parser.prototype.text = function() {
                  return this.lexer.yytext;
                };
                Parser.prototype.next = function() {
                  if (this.token !== ";" || this.lexer.yytext === ";") {
                    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
                  }
                  this.lex();
                  if (this.debug) {
                    this.showlog();
                  }
                  if (this.extractDoc) {
                    while (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) {
                      if (this.token === this.tok.T_COMMENT) {
                        this._docs.push(this.read_comment());
                      } else {
                        this._docs.push(this.read_doc_comment());
                      }
                    }
                  }
                  return this;
                };
                Parser.prototype.peek = function() {
                  var lexerState = this.lexer.getState();
                  var nextToken = this.lexer.lex();
                  this.lexer.setState(lexerState);
                  return nextToken;
                };
                Parser.prototype.lex = function() {
                  if (this.extractTokens) {
                    do {
                      this.token = this.lexer.lex() || /* istanbul ignore next */
                      this.EOF;
                      if (this.token === this.EOF) return this;
                      var entry = this.lexer.yytext;
                      if (Object.prototype.hasOwnProperty.call(this.lexer.engine.tokens.values, this.token)) {
                        entry = [this.lexer.engine.tokens.values[this.token], entry, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset];
                      } else {
                        entry = [null, entry, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset];
                      }
                      this._tokens.push(entry);
                      if (this.token === this.tok.T_CLOSE_TAG) {
                        this.token = ";";
                        return this;
                      } else if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) {
                        this.token = this.tok.T_ECHO;
                        return this;
                      }
                    } while (this.token === this.tok.T_WHITESPACE || // ignore white space
                    !this.extractDoc && (this.token === this.tok.T_COMMENT || // ignore single lines comments
                    this.token === this.tok.T_DOC_COMMENT) || // ignore doc comments
                    // ignore open tags
                    this.token === this.tok.T_OPEN_TAG);
                  } else {
                    this.token = this.lexer.lex() || /* istanbul ignore next */
                    this.EOF;
                  }
                  return this;
                };
                Parser.prototype.is = function(type) {
                  if (Array.isArray(type)) {
                    return type.indexOf(this.token) !== -1;
                  }
                  return this.entries[type].has(this.token);
                };
                [__webpack_require__2(5525), __webpack_require__2(7072), __webpack_require__2(3997), __webpack_require__2(6477), __webpack_require__2(979), __webpack_require__2(8214), __webpack_require__2(9461), __webpack_require__2(5931), __webpack_require__2(9147), __webpack_require__2(9219), __webpack_require__2(7170), __webpack_require__2(6261), __webpack_require__2(2478), __webpack_require__2(77), __webpack_require__2(6077), __webpack_require__2(1130)].forEach(function(ext) {
                  for (var k in ext) {
                    if (Object.prototype.hasOwnProperty.call(Parser.prototype, k)) {
                      throw new Error("Function " + k + " is already defined - collision");
                    }
                    Parser.prototype[k] = ext[k];
                  }
                });
                module3.exports = Parser;
              },
              /***/
              5525(module3) {
                module3.exports = {
                  /*
                   * Parse an array
                   * ```ebnf
                   * array ::= T_ARRAY '(' array_pair_list ')' |
                   *   '[' array_pair_list ']'
                   * ```
                   */
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
                    if (this.next().token !== expect) {
                      items = this.read_array_pair_list(shortForm);
                    }
                    this.expect(expect);
                    this.next();
                    return result(shortForm, items);
                  },
                  /*
                   * Reads an array of items
                   * ```ebnf
                   * array_pair_list ::= array_pair (',' array_pair?)*
                   * ```
                   */
                  read_array_pair_list: function read_array_pair_list(shortForm) {
                    var self2 = this;
                    return this.read_list(function() {
                      return self2.read_array_pair(shortForm);
                    }, ",", true);
                  },
                  /*
                   * Reads an entry
                   * array_pair:
                   *  expr T_DOUBLE_ARROW expr
                   *  | expr
                   *  | expr T_DOUBLE_ARROW '&' variable
                   *  | '&' variable
                   *  | expr T_DOUBLE_ARROW T_LIST '(' array_pair_list ')'
                   *  | T_LIST '(' array_pair_list ')'
                   */
                  read_array_pair: function read_array_pair(shortForm) {
                    if (!shortForm && this.token === ")" || shortForm && this.token === "]") {
                      return;
                    }
                    if (this.token === ",") {
                      return this.node("noop")();
                    }
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
                      if (this.token === "&") {
                        this.error();
                      }
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
                        } else {
                          value = this.read_expr();
                        }
                      } else {
                        value = expr;
                      }
                    }
                    return entry(key, value, byRef, unpack);
                  }
                };
              },
              /***/
              7072(module3) {
                function _slicedToArray(r, e) {
                  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
                }
                function _nonIterableRest() {
                  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _iterableToArrayLimit(r, l) {
                  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                  if (null != t) {
                    var e, n, i, u, a = [], f = true, o = false;
                    try {
                      if (i = (t = t.call(r)).next, 0 === l) ;
                      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
                    } catch (r2) {
                      o = true, n = r2;
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
                module3.exports = {
                  /*
                   * reading a class
                   * ```ebnf
                   * class ::= class_scope? T_CLASS T_STRING (T_EXTENDS NAMESPACE_NAME)? (T_IMPLEMENTS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' CLASS_BODY '}'
                   * ```
                   */
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
                    return [0, 0, modifier.final_or_abstract, modifier.readonly];
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
                  /*
                   * Reads a class body
                   * ```ebnf
                   *   class_body ::= (member_flags? (T_VAR | T_STRING | T_FUNCTION))*
                   * ```
                   */
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
                        if (this.expect(";")) {
                          this.next();
                        }
                        result = result.concat(enumcase);
                        continue;
                      }
                      if (this.token === this.tok.T_ATTRIBUTE) {
                        attrs = this.read_attr_list();
                      }
                      var locStart = this.position();
                      var flags = this.read_member_flags(false);
                      if (this.token === this.tok.T_CONST) {
                        var constants = this.read_constant_list(flags, attrs);
                        if (this.expect(";")) {
                          this.next();
                        }
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
                      } else if (allow_variables && (this.token === this.tok.T_VARIABLE || this.version >= 801 && this.token === this.tok.T_READ_ONLY || // support https://wiki.php.net/rfc/typed_properties_v2
                      this.version >= 704 && (this.token === "?" || this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE || this.token === this.tok.T_NAMESPACE || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_STRING))) {
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
                  /*
                   * Reads variable list
                   * ```ebnf
                   *  variable_list ::= (variable_declaration ',')* variable_declaration
                   * ```
                   */
                  read_variable_list: function read_variable_list(flags, attrs) {
                    var result = this.node("propertystatement");
                    var properties = this.read_list(
                      /*
                       * Reads a variable declaration
                       *
                       * ```ebnf
                       *  variable_declaration ::= T_VARIABLE '=' scalar
                       * ```
                       */
                      function read_variable_declaration() {
                        var result2 = this.node("property");
                        var readonly = false;
                        if (this.token === this.tok.T_READ_ONLY) {
                          readonly = true;
                          this.next();
                        }
                        var _this$read_optional_t = this.read_optional_type(), _this$read_optional_t2 = _slicedToArray(_this$read_optional_t, 2), nullable = _this$read_optional_t2[0], type = _this$read_optional_t2[1];
                        this.expect(this.tok.T_VARIABLE);
                        var propName = this.node("identifier");
                        var name = this.text().substring(1);
                        this.next();
                        propName = propName(name);
                        var value = null;
                        this.expect([",", ";", "="]);
                        if (this.token === "=") {
                          value = this.next().read_expr();
                        }
                        return result2(propName, value, readonly, nullable, type, attrs || []);
                      },
                      ","
                    );
                    return result(null, properties, flags);
                  },
                  /*
                   * Reads constant list
                   * ```ebnf
                   *  constant_list ::= T_CONST [type] (constant_declaration ',')* constant_declaration
                   * ```
                   */
                  read_constant_list: function read_constant_list(flags, attrs) {
                    if (this.expect(this.tok.T_CONST)) {
                      this.next();
                    }
                    var _ref = this.version >= 803 ? this.read_optional_type() : [false, null], _ref2 = _slicedToArray(_ref, 2), nullable = _ref2[0], type = _ref2[1];
                    var result = this.node("classconstant");
                    var items = this.read_list(
                      /*
                       * Reads a constant declaration
                       *
                       * ```ebnf
                       *  constant_declaration ::= (T_STRING | IDENTIFIER) '=' expr
                       * ```
                       * @return {Constant} [:link:](AST.md#constant)
                       */
                      function read_constant_declaration() {
                        var result2 = this.node("constant");
                        var constName = null;
                        var value = null;
                        if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
                          constName = this.node("identifier");
                          var name = this.text();
                          this.next();
                          constName = constName(name);
                        } else {
                          this.expect("IDENTIFIER");
                        }
                        if (this.expect("=")) {
                          value = this.next().read_expr();
                        }
                        return result2(constName, value);
                      },
                      ","
                    );
                    return result(null, items, flags, nullable, type, attrs || []);
                  },
                  /*
                   * Read member flags
                   * @return array
                   *  1st index : 0 => public, 1 => protected, 2 => private
                   *  2nd index : 0 => instance member, 1 => static member
                   *  3rd index : 0 => normal, 1 => abstract member, 2 => final member
                   */
                  read_member_flags: function read_member_flags(asInterface) {
                    var result = [-1, -1, -1];
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
                        if (result[idx] !== -1) {
                          this.error();
                        } else if (val !== -1) {
                          result[idx] = val;
                        }
                      } while (this.next().is("T_MEMBER_FLAGS"));
                    }
                    if (result[1] === -1) result[1] = 0;
                    if (result[2] === -1) result[2] = 0;
                    return result;
                  },
                  /*
                   * optional_type:
                   *	  /- empty -/	{ $$ = NULL; }
                   *   |	type_expr	{ $$ = $1; }
                   * ;
                   *
                   * type_expr:
                   *		type		{ $$ = $1; }
                   *	|	'?' type	{ $$ = $2; $$->attr |= ZEND_TYPE_NULLABLE; }
                   *	|	union_type	{ $$ = $1; }
                   * ;
                   *
                   * type:
                   * 		T_ARRAY		{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_ARRAY); }
                   * 	|	T_CALLABLE	{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_CALLABLE); }
                   * 	|	name		{ $$ = $1; }
                   * ;
                   *
                   * union_type:
                   * 		type '|' type       { $$ = zend_ast_create_list(2, ZEND_AST_TYPE_UNION, $1, $3); }
                   * 	|	union_type '|' type { $$ = zend_ast_list_add($1, $3); }
                   * ;
                   */
                  read_optional_type: function read_optional_type() {
                    var nullable = this.token === "?";
                    if (nullable) {
                      this.next();
                    }
                    if (this.peekSkipComments() === "=") {
                      return [false, null];
                    }
                    var type = this.read_types();
                    if (nullable && !type) {
                      this.raiseError("Expecting a type definition combined with nullable operator");
                    }
                    if (!nullable && !type) {
                      return [false, null];
                    }
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
                    do {
                      nextToken = this.lexer.lex();
                    } while (nextToken === this.tok.T_COMMENT || nextToken === this.tok.T_WHITESPACE);
                    this.lexer.setState(lexerState);
                    return nextToken;
                  },
                  /*
                   * reading an interface
                   * ```ebnf
                   * interface ::= T_INTERFACE T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' INTERFACE_BODY '}'
                   * ```
                   */
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
                  /*
                   * Reads an interface body
                   * ```ebnf
                   *   interface_body ::= (member_flags? (T_CONST | T_FUNCTION))*
                   * ```
                   */
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
                        if (this.expect(";")) {
                          this.next();
                        }
                        result = result.concat(constants);
                      } else if (this.token === this.tok.T_FUNCTION) {
                        var method = this.read_function_declaration(2, flags, attrs, locStart);
                        method.parseFlags(flags);
                        result.push(method);
                        if (this.expect(";")) {
                          this.next();
                        }
                      } else {
                        this.error([this.tok.T_CONST, this.tok.T_FUNCTION]);
                        this.next();
                      }
                    }
                    if (this.expect("}")) {
                      this.next();
                    }
                    return result;
                  },
                  /*
                   * reading a trait
                   * ```ebnf
                   * trait ::= T_TRAIT T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' FUNCTION* '}'
                   * ```
                   */
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
                  /*
                   * reading a use statement
                   * ```ebnf
                   * trait_use_statement ::= namespace_name (',' namespace_name)* ('{' trait_use_alias '}')?
                   * ```
                   */
                  read_trait_use_statement: function read_trait_use_statement() {
                    var node = this.node("traituse");
                    this.expect(this.tok.T_USE) && this.next();
                    var traits = [this.read_namespace_name()];
                    var adaptations = null;
                    while (this.token === ",") {
                      traits.push(this.next().read_namespace_name());
                    }
                    if (this.token === "{") {
                      adaptations = [];
                      while (this.next().token !== this.EOF) {
                        if (this.token === "}") break;
                        adaptations.push(this.read_trait_use_alias());
                        this.expect(";");
                      }
                      if (this.expect("}")) {
                        this.next();
                      }
                    } else {
                      if (this.expect(";")) {
                        this.next();
                      }
                    }
                    return node(traits, adaptations);
                  },
                  /*
                   * Reading trait alias
                   * ```ebnf
                   * trait_use_alias ::= namespace_name ( T_DOUBLE_COLON T_STRING )? (T_INSTEADOF namespace_name) | (T_AS member_flags? T_STRING)
                   * ```
                   * name list : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L303
                   * trait adaptation : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L742
                   */
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
                        } else {
                          this.expect(this.tok.T_STRING);
                        }
                      } else {
                        method = method.name;
                      }
                    }
                    if (this.token === this.tok.T_INSTEADOF) {
                      return node("traitprecedence", trait, method, this.next().read_name_list());
                    } else if (this.token === this.tok.T_AS) {
                      var flags = null;
                      var alias = null;
                      if (this.next().is("T_MEMBER_FLAGS")) {
                        flags = this.read_member_flags();
                      }
                      if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
                        alias = this.node("identifier");
                        var name = this.text();
                        this.next();
                        alias = alias(name);
                      } else if (flags === false) {
                        this.expect(this.tok.T_STRING);
                      }
                      return node("traitalias", trait, method, alias, flags);
                    }
                    this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]);
                    return node("traitalias", trait, method, null, null);
                  }
                };
              },
              /***/
              3997(module3) {
                module3.exports = {
                  /*
                   *  Comments with // or # or / * ... * /
                   */
                  read_comment: function read_comment() {
                    var text = this.text();
                    var result = this.ast.prepare(text.substring(0, 2) === "/*" ? "commentblock" : "commentline", null, this);
                    var offset = this.lexer.yylloc.first_offset;
                    var prev = this.prev;
                    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
                    this.lex();
                    result = result(text);
                    result.offset = offset;
                    this.prev = prev;
                    return result;
                  },
                  /*
                   * Comments with / ** ... * /
                   */
                  read_doc_comment: function read_doc_comment() {
                    var result = this.ast.prepare("commentblock", null, this);
                    var offset = this.lexer.yylloc.first_offset;
                    var text = this.text();
                    var prev = this.prev;
                    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
                    this.lex();
                    result = result(text);
                    result.offset = offset;
                    this.prev = prev;
                    return result;
                  }
                };
              },
              /***/
              979(module3) {
                module3.exports = {
                  /*
                   * reading an enum
                   * ```ebnf
                   * enum ::= enum_scope? T_ENUM T_STRING (':' NAMESPACE_NAME)? (T_IMPLEMENTS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' ENUM_BODY '}'
                   * ```
                   */
                  read_enum_declaration_statement: function read_enum_declaration_statement(attrs) {
                    var result = this.node("enum");
                    if (!this.expect(this.tok.T_ENUM)) {
                      return null;
                    }
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
                    if (this.token === ":") {
                      return this.next().read_namespace_name();
                    }
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
              /***/
              6477(module3) {
                module3.exports = {
                  read_expr: function read_expr(expr) {
                    var result = this.node();
                    if (this.token === "@") {
                      if (!expr) {
                        expr = this.next().read_expr();
                      }
                      return result("silent", expr);
                    }
                    if (!expr) {
                      expr = this.read_expr_item();
                    }
                    if (this.token === "|") {
                      return result("bin", "|", expr, this.next().read_expr());
                    }
                    if (this.token === "&") {
                      return result("bin", "&", expr, this.next().read_expr());
                    }
                    if (this.token === "^") {
                      return result("bin", "^", expr, this.next().read_expr());
                    }
                    if (this.token === ".") {
                      return result("bin", ".", expr, this.next().read_expr());
                    }
                    if (this.token === "+") {
                      return result("bin", "+", expr, this.next().read_expr());
                    }
                    if (this.token === "-") {
                      return result("bin", "-", expr, this.next().read_expr());
                    }
                    if (this.token === "*") {
                      return result("bin", "*", expr, this.next().read_expr());
                    }
                    if (this.token === "/") {
                      return result("bin", "/", expr, this.next().read_expr());
                    }
                    if (this.token === "%") {
                      return result("bin", "%", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_POW) {
                      return result("bin", "**", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_SL) {
                      return result("bin", "<<", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_SR) {
                      return result("bin", ">>", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_BOOLEAN_OR) {
                      return result("bin", "||", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_LOGICAL_OR) {
                      return result("bin", "or", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_BOOLEAN_AND) {
                      return result("bin", "&&", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_LOGICAL_AND) {
                      return result("bin", "and", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_LOGICAL_XOR) {
                      return result("bin", "xor", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_IDENTICAL) {
                      return result("bin", "===", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_NOT_IDENTICAL) {
                      return result("bin", "!==", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_EQUAL) {
                      return result("bin", "==", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_NOT_EQUAL) {
                      return result("bin", "!=", expr, this.next().read_expr());
                    }
                    if (this.token === "<") {
                      return result("bin", "<", expr, this.next().read_expr());
                    }
                    if (this.token === ">") {
                      return result("bin", ">", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL) {
                      return result("bin", "<=", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_IS_GREATER_OR_EQUAL) {
                      return result("bin", ">=", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_SPACESHIP) {
                      return result("bin", "<=>", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_INSTANCEOF) {
                      expr = result("bin", "instanceof", expr, this.next().read_class_name_reference());
                      if (this.token !== ";" && this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
                        expr = this.read_expr(expr);
                      }
                    }
                    if (this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR) {
                      expr = result("nullsafepropertylookup", expr, this.read_what());
                      expr = this.recursive_variable_chain_scan(expr, false, true);
                    }
                    if (this.token === this.tok.T_COALESCE) {
                      return result("bin", "??", expr, this.next().read_expr());
                    }
                    if (this.token === this.tok.T_PIPE) {
                      if (this.version < 805) {
                        this.raiseError("PHP 8.5+ is required to use pipe operator");
                      }
                      return result("bin", "|>", expr, this.next().read_expr());
                    }
                    if (this.token === "?") {
                      var trueArg = null;
                      if (this.next().token !== ":") {
                        trueArg = this.read_expr();
                      }
                      this.expect(":") && this.next();
                      return result("retif", expr, trueArg, this.read_expr());
                    } else {
                      result.destroy(expr);
                    }
                    return expr;
                  },
                  /*
                   * Reads a cast expression
                   */
                  read_expr_cast: function read_expr_cast(type) {
                    return this.node("cast")(type, this.text(), this.next().read_expr());
                  },
                  /*
                   * Read a isset variable
                   */
                  read_isset_variable: function read_isset_variable() {
                    return this.read_expr();
                  },
                  /*
                   * Reads isset variables
                   */
                  read_isset_variables: function read_isset_variables() {
                    return this.read_function_list(this.read_isset_variable, ",");
                  },
                  /*
                   * Reads internal PHP functions
                   */
                  read_internal_functions_in_yacc: function read_internal_functions_in_yacc() {
                    var result = null;
                    switch (this.token) {
                      case this.tok.T_ISSET:
                        {
                          result = this.node("isset");
                          if (this.next().expect("(")) {
                            this.next();
                          }
                          var variables = this.read_isset_variables();
                          if (this.expect(")")) {
                            this.next();
                          }
                          result = result(variables);
                        }
                        break;
                      case this.tok.T_EMPTY:
                        {
                          result = this.node("empty");
                          if (this.next().expect("(")) {
                            this.next();
                          }
                          var expression = this.read_expr();
                          if (this.expect(")")) {
                            this.next();
                          }
                          result = result(expression);
                        }
                        break;
                      case this.tok.T_INCLUDE:
                        result = this.node("include")(false, false, this.next().read_expr());
                        break;
                      case this.tok.T_INCLUDE_ONCE:
                        result = this.node("include")(true, false, this.next().read_expr());
                        break;
                      case this.tok.T_EVAL:
                        {
                          result = this.node("eval");
                          if (this.next().expect("(")) {
                            this.next();
                          }
                          var expr = this.read_expr();
                          if (this.expect(")")) {
                            this.next();
                          }
                          result = result(expr);
                        }
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
                  /*
                   * Reads optional expression
                   */
                  read_optional_expr: function read_optional_expr(stopToken) {
                    if (this.token !== stopToken) {
                      return this.read_expr();
                    }
                    return null;
                  },
                  /*
                   * Reads exit expression
                   */
                  read_exit_expr: function read_exit_expr() {
                    var expression = null;
                    if (this.token === "(") {
                      this.next();
                      expression = this.read_optional_expr(")");
                      this.expect(")") && this.next();
                    }
                    return expression;
                  },
                  /*
                   * ```ebnf
                   * Reads an expression
                   *  expr ::= @todo
                   * ```
                   */
                  read_expr_item: function read_expr_item() {
                    var result, expr, attrs = [];
                    if (this.token === "+") {
                      return this.node("unary")("+", this.next().read_expr());
                    }
                    if (this.token === "-") {
                      return this.node("unary")("-", this.next().read_expr());
                    }
                    if (this.token === "!") {
                      return this.node("unary")("!", this.next().read_expr());
                    }
                    if (this.token === "~") {
                      return this.node("unary")("~", this.next().read_expr());
                    }
                    if (this.token === "(") {
                      expr = this.next().read_expr();
                      expr.parenthesizedExpression = true;
                      this.expect(")") && this.next();
                      return this.handleDereferencable(expr);
                    }
                    if (this.token === "`") {
                      return this.read_encapsed_string("`");
                    }
                    if (this.token === this.tok.T_LIST) {
                      var assign = null;
                      var isInner = this.innerList;
                      result = this.node("list");
                      if (!isInner) {
                        assign = this.node("assign");
                      }
                      if (this.next().expect("(")) {
                        this.next();
                      }
                      if (!this.innerList) this.innerList = true;
                      var assignList = this.read_array_pair_list(false);
                      if (this.expect(")")) {
                        this.next();
                      }
                      var hasItem = false;
                      for (var i = 0; i < assignList.length; i++) {
                        if (assignList[i] !== null && assignList[i].kind !== "noop") {
                          hasItem = true;
                          break;
                        }
                      }
                      if (!hasItem) {
                        this.raiseError("Fatal Error :  Cannot use empty list on line " + this.lexer.yylloc.first_line);
                      }
                      if (!isInner) {
                        this.innerList = false;
                        if (this.expect("=")) {
                          return assign(result(assignList, false), this.next().read_expr(), "=");
                        } else {
                          return result(assignList, false);
                        }
                      } else {
                        return result(assignList, false);
                      }
                    }
                    if (this.token === this.tok.T_ATTRIBUTE) {
                      attrs = this.read_attr_list();
                    }
                    if (this.token === this.tok.T_CLONE) {
                      return this.node("clone")(this.next().read_expr());
                    }
                    switch (this.token) {
                      case this.tok.T_INC:
                        return this.node("pre")("+", this.next().read_variable(false, false));
                      case this.tok.T_DEC:
                        return this.node("pre")("-", this.next().read_variable(false, false));
                      case this.tok.T_NEW:
                        expr = this.read_new_expr();
                        if (this.token === this.tok.T_OBJECT_OPERATOR && this.version < 804) {
                          this.raiseError("New without parenthesis is not allowed before PHP 8.4");
                        }
                        return this.handleDereferencable(expr);
                      case this.tok.T_ISSET:
                      case this.tok.T_EMPTY:
                      case this.tok.T_INCLUDE:
                      case this.tok.T_INCLUDE_ONCE:
                      case this.tok.T_EVAL:
                      case this.tok.T_REQUIRE:
                      case this.tok.T_REQUIRE_ONCE:
                        return this.read_internal_functions_in_yacc();
                      case this.tok.T_MATCH:
                        return this.read_match_expression();
                      case this.tok.T_INT_CAST:
                        return this.read_expr_cast("int");
                      case this.tok.T_DOUBLE_CAST:
                        return this.read_expr_cast("float");
                      case this.tok.T_STRING_CAST:
                        return this.read_expr_cast(this.text().indexOf("binary") !== -1 ? "binary" : "string");
                      case this.tok.T_ARRAY_CAST:
                        return this.read_expr_cast("array");
                      case this.tok.T_OBJECT_CAST:
                        return this.read_expr_cast("object");
                      case this.tok.T_BOOL_CAST:
                        return this.read_expr_cast("bool");
                      case this.tok.T_UNSET_CAST:
                        return this.read_expr_cast("unset");
                      case this.tok.T_THROW: {
                        if (this.version < 800) {
                          this.raiseError("PHP 8+ is required to use throw as an expression");
                        }
                        var _result = this.node("throw");
                        var _expr = this.next().read_expr();
                        return _result(_expr);
                      }
                      case this.tok.T_EXIT: {
                        var useDie = this.lexer.yytext.toLowerCase() === "die";
                        result = this.node("exit");
                        this.next();
                        var expression = this.read_exit_expr();
                        return result(expression, useDie);
                      }
                      case this.tok.T_PRINT:
                        return this.node("print")(this.next().read_expr());
                      // T_YIELD (expr (T_DOUBLE_ARROW expr)?)?
                      case this.tok.T_YIELD: {
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
                      }
                      // T_YIELD_FROM expr
                      case this.tok.T_YIELD_FROM:
                        result = this.node("yieldfrom");
                        expr = this.next().read_expr();
                        return result(expr);
                      case this.tok.T_FN:
                      case this.tok.T_FUNCTION:
                        return this.read_inline_function(void 0, attrs);
                      case this.tok.T_STATIC: {
                        var backup = [this.token, this.lexer.getState()];
                        this.next();
                        if (this.token === this.tok.T_FUNCTION || this.version >= 704 && this.token === this.tok.T_FN) {
                          return this.read_inline_function([0, 1, 0], attrs);
                        } else {
                          this.lexer.tokens.push(backup);
                          this.next();
                        }
                      }
                    }
                    if (this.is("VARIABLE")) {
                      result = this.node();
                      expr = this.read_variable(false, false);
                      var isConst = expr.kind === "identifier" || expr.kind === "staticlookup" && expr.offset.kind === "identifier";
                      switch (this.token) {
                        case "=": {
                          if (isConst) this.error("VARIABLE");
                          if (this.next().token == "&") {
                            return this.read_assignref(result, expr);
                          }
                          return result("assign", expr, this.read_expr(), "=");
                        }
                        // operations :
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
                        default:
                          result.destroy(expr);
                      }
                    } else if (this.is("SCALAR")) {
                      result = this.node();
                      expr = this.read_scalar();
                      if (expr.kind === "array" && expr.shortForm && this.token === "=") {
                        var list = this.convertToList(expr);
                        if (expr.loc) list.loc = expr.loc;
                        var right = this.next().read_expr();
                        return result("assign", list, right, "=");
                      } else {
                        result.destroy(expr);
                      }
                      return this.handleDereferencable(expr);
                    } else {
                      this.error("EXPR");
                      this.next();
                    }
                    return expr;
                  },
                  /*
                   * Recursively convert nested array to nested list.
                   */
                  convertToList: function convertToList(array) {
                    var _this = this;
                    var convertedItems = array.items.map(function(entry) {
                      if (entry.value && entry.value.kind === "array" && entry.value.shortForm) {
                        entry.value = _this.convertToList(entry.value);
                      }
                      return entry;
                    });
                    var node = this.node("list")(convertedItems, true);
                    if (array.loc) node.loc = array.loc;
                    if (array.leadingComments) node.leadingComments = array.leadingComments;
                    if (array.trailingComments) node.trailingComments = array.trailingComments;
                    return node;
                  },
                  /*
                   * Reads assignment
                   * @param {*} left
                   */
                  read_assignref: function read_assignref(result, left) {
                    this.next();
                    var right;
                    if (this.token === this.tok.T_NEW) {
                      if (this.version >= 700) {
                        this.error();
                      }
                      right = this.read_new_expr();
                    } else {
                      right = this.read_variable(false, false);
                    }
                    return result("assignref", left, right);
                  },
                  /*
                   *
                   * inline_function:
                   * 		function returns_ref backup_doc_comment '(' parameter_list ')' lexical_vars return_type
                   * 		backup_fn_flags '{' inner_statement_list '}' backup_fn_flags
                   * 			{ $$ = zend_ast_create_decl(ZEND_AST_CLOSURE, $2 | $13, $1, $3,
                   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0),
                   * 				  $5, $7, $11, $8); CG(extra_fn_flags) = $9; }
                   * 	|	fn returns_ref '(' parameter_list ')' return_type backup_doc_comment T_DOUBLE_ARROW backup_fn_flags backup_lex_pos expr backup_fn_flags
                   * 			{ $$ = zend_ast_create_decl(ZEND_AST_ARROW_FUNC, $2 | $12, $1, $7,
                   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0), $4, NULL,
                   * 				  zend_ast_create(ZEND_AST_RETURN, $11), $6);
                   * 				  ((zend_ast_decl *) $$)->lex_pos = $10;
                   * 				  CG(extra_fn_flags) = $9; }   *
                   */
                  read_inline_function: function read_inline_function(flags, attrs) {
                    if (this.token === this.tok.T_FUNCTION) {
                      var _result2 = this.read_function(true, flags, attrs);
                      _result2.attrGroups = attrs;
                      return _result2;
                    }
                    if (!this.version >= 704) {
                      this.raiseError("Arrow Functions are not allowed");
                    }
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
                    var body = this.read_expr();
                    var result = node(params, isRef, body, returnType, nullable, flags ? true : false);
                    result.attrGroups = attrs;
                    return result;
                  },
                  read_match_expression: function read_match_expression() {
                    var node = this.node("match");
                    this.expect(this.tok.T_MATCH) && this.next();
                    if (this.version < 800) {
                      this.raiseError("Match statements are not allowed before PHP 8");
                    }
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
                    if (this.token === "}") {
                      return;
                    }
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
                    if (this.expect(this.tok.T_DOUBLE_ARROW)) {
                      this.next();
                    }
                    return conds;
                  },
                  read_attribute: function read_attribute() {
                    var name = this.text();
                    var args = [];
                    this.next();
                    if (this.token === "(") {
                      args = this.read_argument_list();
                    }
                    return this.node("attribute")(name, args);
                  },
                  read_attr_list: function read_attr_list() {
                    var list = [];
                    if (this.token === this.tok.T_ATTRIBUTE) {
                      do {
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
                    }
                    return list;
                  },
                  /*
                   * ```ebnf
                   *    new_expr ::= T_NEW (namespace_name function_argument_list) | (T_CLASS ... class declaration)
                   * ```
                   * https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L850
                   */
                  read_new_expr: function read_new_expr() {
                    var result = this.node("new");
                    this.expect(this.tok.T_NEW) && this.next();
                    var args = [];
                    if (this.token === "(") {
                      this.next();
                      var newExp = this.read_expr();
                      this.expect(")");
                      this.next();
                      if (this.token === "(") {
                        args = this.read_argument_list();
                      }
                      return result(newExp, args);
                    }
                    var attrs = this.read_attr_list();
                    var isReadonly = this.token === this.tok.T_READ_ONLY;
                    if (isReadonly) {
                      if (this.version < 803) {
                        this.raiseError("Anonymous readonly classes are not allowed before PHP 8.3");
                      }
                      this.next();
                    }
                    if (this.token === this.tok.T_CLASS) {
                      var what = this.node("class");
                      if (this.next().token === "(") {
                        args = this.read_argument_list();
                      }
                      var propExtends = this.read_extends_from();
                      var propImplements = this.read_implements_list();
                      var body = null;
                      if (this.expect("{")) {
                        body = this.next().read_class_body(true, false);
                      }
                      var whatNode = what(null, propExtends, propImplements, body, [0, 0, 0, isReadonly ? 1 : 0]);
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
                    if (this.token === "(") {
                      args = this.read_argument_list();
                    }
                    return result(name, args);
                  },
                  /*
                   * Reads a class name
                   * ```ebnf
                   * read_new_class_name ::= namespace_name | variable
                   * ```
                   */
                  read_new_class_name: function read_new_class_name() {
                    if (this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_NAMESPACE) {
                      var result = this.read_namespace_name(true);
                      if (this.token === this.tok.T_DOUBLE_COLON) {
                        result = this.read_static_getter(result);
                      }
                      return result;
                    } else if (this.is("VARIABLE")) {
                      return this.read_variable(true, false);
                    } else {
                      this.expect([this.tok.T_STRING, "VARIABLE"]);
                    }
                  },
                  handleDereferencable: function handleDereferencable(expr) {
                    while (this.token !== this.EOF) {
                      if (this.token === this.tok.T_OBJECT_OPERATOR || this.token === this.tok.T_DOUBLE_COLON || this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR) {
                        expr = this.recursive_variable_chain_scan(expr, false, false, true);
                      } else if (this.token === this.tok.T_CURLY_OPEN || this.token === "[") {
                        expr = this.read_dereferencable(expr);
                      } else if (this.token === "(") {
                        expr = this.node("call")(expr, this.read_argument_list());
                      } else {
                        return expr;
                      }
                    }
                    return expr;
                  }
                };
              },
              /***/
              8214(module3) {
                module3.exports = {
                  /*
                   * checks if current token is a reference keyword
                   */
                  is_reference: function is_reference() {
                    if (this.token === "&") {
                      this.next();
                      return true;
                    }
                    return false;
                  },
                  /*
                   * checks if current token is a variadic keyword
                   */
                  is_variadic: function is_variadic() {
                    if (this.token === this.tok.T_ELLIPSIS) {
                      this.next();
                      return true;
                    }
                    return false;
                  },
                  /*
                   * reading a function
                   * ```ebnf
                   * function ::= function_declaration code_block
                   * ```
                   */
                  read_function: function read_function(closure, flag, attrs, locStart) {
                    var result = this.read_function_declaration(closure ? 1 : flag ? 2 : 0, flag && flag[1] === 1, attrs || [], locStart);
                    if (flag && flag[2] == 1) {
                      result.parseFlags(flag);
                      if (this.expect(";")) {
                        this.next();
                      }
                    } else {
                      if (this.expect("{")) {
                        result.body = this.read_code_block(false);
                        if (result.loc && result.body.loc) {
                          result.loc.end = result.body.loc.end;
                        }
                      }
                      if (!closure && flag) {
                        result.parseFlags(flag);
                      }
                    }
                    return result;
                  },
                  /*
                   * reads a function declaration (without his body)
                   * ```ebnf
                   * function_declaration ::= T_FUNCTION '&'?  T_STRING '(' parameter_list ')'
                   * ```
                   */
                  read_function_declaration: function read_function_declaration(type, isStatic, attrs, locStart) {
                    var _this = this;
                    var nodeName = "function";
                    if (type === 1) {
                      nodeName = "closure";
                    } else if (type === 2) {
                      nodeName = "method";
                    }
                    var result = this.node(nodeName);
                    if (this.expect(this.tok.T_FUNCTION)) {
                      this.next();
                    }
                    var isRef = this.is_reference();
                    var name = false, use = [], returnType = null, nullable = false;
                    if (type !== 1) {
                      var nameNode = this.node("identifier");
                      if (type === 2) {
                        if (this.version >= 700) {
                          if (this.token === this.tok.T_STRING || this.is("IDENTIFIER")) {
                            name = this.text();
                            this.next();
                          } else if (this.version < 704) {
                            this.error("IDENTIFIER");
                          }
                        } else if (this.token === this.tok.T_STRING) {
                          name = this.text();
                          this.next();
                        } else {
                          this.error("IDENTIFIER");
                        }
                      } else {
                        if (this.version >= 700) {
                          if (this.token === this.tok.T_STRING) {
                            name = this.text();
                            this.next();
                          } else if (this.version >= 704) {
                            if (!this.expect("(")) {
                              this.next();
                            }
                          } else {
                            this.error(this.tok.T_STRING);
                            this.next();
                          }
                        } else {
                          if (this.expect(this.tok.T_STRING)) {
                            name = this.text();
                          }
                          this.next();
                        }
                      }
                      name = nameNode(name);
                    }
                    if (this.expect("(")) this.next();
                    var params = this.read_parameter_list(name.name === "__construct");
                    if (this.expect(")")) this.next();
                    if (type === 1) {
                      use = this.read_lexical_vars();
                    }
                    if (this.token === ":") {
                      if (this.next().token === "?") {
                        nullable = true;
                        this.next();
                      }
                      returnType = this.read_types();
                    }
                    var apply_attrgroup_location = function apply_attrgroup_location2(node) {
                      node.attrGroups = attrs || [];
                      if (locStart && node.loc) {
                        node.loc.start = locStart;
                        if (node.loc.source) {
                          node.loc.source = _this.lexer._input.substr(node.loc.start.offset, node.loc.end.offset - node.loc.start.offset);
                        }
                      }
                      return node;
                    };
                    if (type === 1) {
                      return apply_attrgroup_location(result(params, isRef, use, returnType, nullable, isStatic));
                    }
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
                        if (this.version >= 800 && this.token === ")") {
                          return result;
                        }
                      } else if (this.token == ")") {
                        break;
                      } else {
                        this.error([",", ")"]);
                        break;
                      }
                    }
                    return result;
                  },
                  read_lexical_var_list: function read_lexical_var_list() {
                    return this.read_list_with_dangling_comma(this.read_lexical_var.bind(this));
                  },
                  /*
                   * ```ebnf
                   * lexical_var ::= '&'? T_VARIABLE
                   * ```
                   */
                  read_lexical_var: function read_lexical_var() {
                    if (this.token === "&") {
                      return this.read_byref(this.read_lexical_var.bind(this));
                    }
                    var result = this.node("variable");
                    this.expect(this.tok.T_VARIABLE);
                    var name = this.text().substring(1);
                    this.next();
                    return result(name, false);
                  },
                  /*
                   * reads a list of parameters
                   * ```ebnf
                   *  parameter_list ::= (parameter ',')* parameter?
                   * ```
                   */
                  read_parameter_list: function read_parameter_list(is_class_constructor) {
                    if (this.token !== ")") {
                      var wasVariadic = false;
                      return this.read_list_with_dangling_comma((function() {
                        var parameter = this.read_parameter(is_class_constructor);
                        if (parameter) {
                          if (wasVariadic) {
                            this.raiseError("Unexpected parameter after a variadic parameter");
                          }
                          if (parameter.variadic) {
                            wasVariadic = true;
                          }
                        }
                        return parameter;
                      }).bind(this), ",");
                    }
                    return [];
                  },
                  /*
                   * ```ebnf
                   *  parameter ::= type? '&'? T_ELLIPSIS? T_VARIABLE ('=' expr)?
                   * ```
                   * @see https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L640
                   */
                  read_parameter: function read_parameter(is_class_constructor) {
                    var node = this.node("parameter");
                    var parameterName = null;
                    var value = null;
                    var nullable = false;
                    var readonly = false;
                    var attrs = [];
                    if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();
                    if (this.version >= 801 && this.token === this.tok.T_READ_ONLY) {
                      if (is_class_constructor) {
                        this.next();
                        readonly = true;
                      } else {
                        this.raiseError("readonly properties can be used only on class constructor");
                      }
                    }
                    var flags = this.read_promoted();
                    if (!readonly && this.version >= 801 && this.token === this.tok.T_READ_ONLY) {
                      if (is_class_constructor) {
                        this.next();
                        readonly = true;
                      } else {
                        this.raiseError("readonly properties can be used only on class constructor");
                      }
                    }
                    if (this.token === "?") {
                      this.next();
                      nullable = true;
                    }
                    var types = this.read_types();
                    if (nullable && !types) {
                      this.raiseError("Expecting a type definition combined with nullable operator");
                    }
                    var isRef = this.is_reference();
                    var isVariadic = this.is_variadic();
                    if (this.expect(this.tok.T_VARIABLE)) {
                      parameterName = this.node("identifier");
                      var name = this.text().substring(1);
                      this.next();
                      parameterName = parameterName(name);
                    }
                    if (this.token == "=") {
                      value = this.next().read_expr();
                    }
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
                      if (nextToken === this.tok.T_ELLIPSIS || nextToken === this.tok.T_VARIABLE) {
                        break;
                      }
                      if (mode === MODE_UNSET) {
                        mode = this.token === "|" ? MODE_UNION : MODE_INTERSECTION;
                      } else {
                        if (mode === MODE_UNION && this.token !== "|" || mode === MODE_INTERSECTION && this.token !== "&") {
                          this.raiseError('Unexpect token "' + this.token + '", "|" and "&" can not be mixed');
                        }
                      }
                      this.next();
                      types.push(this.read_type());
                    }
                    if (types.length === 1) {
                      return types[0];
                    } else {
                      return mode === MODE_INTERSECTION ? this.node("intersectiontype")(types) : this.node("uniontype")(types);
                    }
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
                  /*
                   * Reads a list of arguments
                   * ```ebnf
                   *  function_argument_list ::= '(' (argument_list (',' argument_list)*)? ')'
                   * ```
                   */
                  read_argument_list: function read_argument_list() {
                    var result = [];
                    this.expect("(") && this.next();
                    if (this.version >= 801 && this.token === this.tok.T_ELLIPSIS && this.peek() === ")") {
                      result.push(this.node("variadicplaceholder")());
                      this.next();
                    } else if (this.token !== ")") {
                      result = this.read_non_empty_argument_list();
                    }
                    this.expect(")") && this.next();
                    return result;
                  },
                  /*
                   * Reads non empty argument list
                   */
                  read_non_empty_argument_list: function read_non_empty_argument_list() {
                    var wasVariadic = false;
                    return this.read_function_list((function() {
                      var argument = this.read_argument();
                      if (argument) {
                        var isVariadic = argument.kind === "variadic";
                        if (wasVariadic && !isVariadic) {
                          this.raiseError("Unexpected non-variadic argument after a variadic argument");
                        }
                        if (isVariadic) {
                          wasVariadic = true;
                        }
                      }
                      return argument;
                    }).bind(this), ",");
                  },
                  /*
                   * ```ebnf
                   *    argument_list ::= T_STRING ':' expr | T_ELLIPSIS? expr
                   * ```
                   */
                  read_argument: function read_argument() {
                    if (this.token === this.tok.T_ELLIPSIS) {
                      return this.node("variadic")(this.next().read_expr());
                    }
                    if (this.token === this.tok.T_STRING || Object.values(this.lexer.keywords).includes(this.token)) {
                      var nextToken = this.peek();
                      if (nextToken === ":") {
                        if (this.version < 800) {
                          this.raiseError("PHP 8+ is required to use named arguments");
                        }
                        return this.node("namedargument")(this.text(), this.next().next().read_expr());
                      }
                    }
                    return this.read_expr();
                  },
                  /*
                   * read type hinting
                   * ```ebnf
                   *  type ::= T_ARRAY | T_CALLABLE | namespace_name
                   * ```
                   */
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
                      if (this.token !== this.tok.T_NS_SEPARATOR && this.ast.typereference.types.indexOf(_type.toLowerCase()) > -1) {
                        return result("typereference", _type.toLowerCase(), _type);
                      } else {
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
              /***/
              9461(module3) {
                module3.exports = {
                  /*
                   * Reads an IF statement
                   *
                   * ```ebnf
                   *  if ::= T_IF '(' expr ')' ':' ...
                   * ```
                   */
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
                      if (this.token === this.tok.T_ELSEIF) {
                        alternate = this.read_if();
                      } else if (this.token === this.tok.T_ELSE) {
                        alternate = this.next().read_statement();
                      }
                    }
                    return result(test, body, alternate, shortForm);
                  },
                  /*
                   * reads an if expression : '(' expr ')'
                   */
                  read_if_expr: function read_if_expr() {
                    this.expect("(") && this.next();
                    var result = this.read_expr();
                    this.expect(")") && this.next();
                    return result;
                  },
                  /*
                   * reads an elseif (expr): statements
                   */
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
                  /*
                   *
                   */
                  read_else_short: function read_else_short() {
                    if (this.next().expect(":")) this.next();
                    var body = this.node("block");
                    var items = [];
                    while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
                      items.push(this.read_inner_statement());
                    }
                    return body(null, items);
                  }
                };
              },
              /***/
              5931(module3) {
                module3.exports = {
                  /*
                   * Reads a while statement
                   * ```ebnf
                   * while ::= T_WHILE (statement | ':' inner_statement_list T_ENDWHILE ';')
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L587
                   * @return {While}
                   */
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
                    } else {
                      body = this.read_statement();
                    }
                    return result(test, body, shortForm);
                  },
                  /*
                   * Reads a do / while loop
                   * ```ebnf
                   * do ::= T_DO statement T_WHILE '(' expr ')' ';'
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L423
                   * @return {Do}
                   */
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
                  /*
                   * Read a for incremental loop
                   * ```ebnf
                   * for ::= T_FOR '(' for_exprs ';' for_exprs ';' for_exprs ')' for_statement
                   * for_statement ::= statement | ':' inner_statement_list T_ENDFOR ';'
                   * for_exprs ::= expr? (',' expr)*
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L425
                   * @return {For}
                   */
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
                    } else {
                      this.next();
                    }
                    if (this.token !== ";") {
                      test = this.read_list(this.read_expr, ",");
                      if (this.expect(";")) this.next();
                    } else {
                      this.next();
                    }
                    if (this.token !== ")") {
                      increment = this.read_list(this.read_expr, ",");
                      if (this.expect(")")) this.next();
                    } else {
                      this.next();
                    }
                    if (this.token === ":") {
                      shortForm = true;
                      body = this.read_short_form(this.tok.T_ENDFOR);
                    } else {
                      body = this.read_statement();
                    }
                    return result(init, test, increment, body, shortForm);
                  },
                  /*
                   * Reads a foreach loop
                   * ```ebnf
                   * foreach ::= '(' expr T_AS foreach_variable (T_DOUBLE_ARROW foreach_variable)? ')' statement
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L438
                   * @return {Foreach}
                   */
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
                    if (key && key.kind === "list") {
                      this.raiseError("Fatal Error : Cannot use list as key element");
                    }
                    if (this.expect(")")) this.next();
                    if (this.token === ":") {
                      shortForm = true;
                      body = this.read_short_form(this.tok.T_ENDFOREACH);
                    } else {
                      body = this.read_statement();
                    }
                    return result(source, key, value, body, shortForm);
                  },
                  /*
                   * Reads a foreach variable statement
                   * ```ebnf
                   * foreach_variable =
                   *    variable |
                   *    '&' variable |
                   *    T_LIST '(' assignment_list ')' |
                   *    '[' assignment_list ']'
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L544
                   * @return {Expression}
                   */
                  read_foreach_variable: function read_foreach_variable() {
                    if (this.token === this.tok.T_LIST || this.token === "[") {
                      var isShort = this.token === "[";
                      var result = this.node("list");
                      this.next();
                      if (!isShort && this.expect("(")) this.next();
                      var assignList = this.read_array_pair_list(isShort);
                      if (this.expect(isShort ? "]" : ")")) this.next();
                      return result(assignList, isShort);
                    } else {
                      return this.read_variable(false, false);
                    }
                  }
                };
              },
              /***/
              9147(module3) {
                module3.exports = {
                  /*
                   * ```ebnf
                   * start ::= (namespace | top_statement)*
                   * ```
                   */
                  read_start: function read_start() {
                    if (this.token == this.tok.T_NAMESPACE) {
                      return this.read_namespace();
                    } else {
                      return this.read_top_statement();
                    }
                  }
                };
              },
              /***/
              9219(module3) {
                module3.exports = {
                  /*
                   * Reads a namespace declaration block
                   * ```ebnf
                   * namespace ::= T_NAMESPACE namespace_name? '{'
                   *    top_statements
                   * '}'
                   * | T_NAMESPACE namespace_name ';' top_statements
                   * ```
                   * @see http://php.net/manual/en/language.namespaces.php
                   * @return {Namespace}
                   */
                  read_namespace: function read_namespace() {
                    var result = this.node("namespace");
                    var body;
                    this.expect(this.tok.T_NAMESPACE) && this.next();
                    var name;
                    if (this.token === "{") {
                      name = {
                        name: [""]
                      };
                    } else {
                      name = this.read_namespace_name();
                    }
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
                      if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                        body.push(this.node("noop")());
                      }
                      return result(name.name, body, true);
                    } else {
                      this.error(["{", ";"]);
                      this.currentNamespace = name;
                      body = this.read_top_statements();
                      this.expect(this.EOF);
                      return result(name, body, false);
                    }
                  },
                  /*
                   * Reads a namespace name
                   * ```ebnf
                   *  namespace_name ::= T_NS_SEPARATOR? (T_STRING T_NS_SEPARATOR)* T_STRING
                   * ```
                   * @see http://php.net/manual/en/language.namespaces.rules.php
                   * @return {Reference}
                   */
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
                        if (!this.expect(this.tok.T_STRING)) {
                          return result("name", "", this.ast.name.FULL_QUALIFIED_NAME);
                        }
                    }
                    this.next();
                    if (resolveReference || this.token !== "(") {
                      if (name.toLowerCase() === "parent") {
                        return result("parentreference", name);
                      } else if (name.toLowerCase() === "self") {
                        return result("selfreference", name);
                      }
                    }
                    return result("name", name, resolution);
                  },
                  /*
                   * Reads a use statement
                   * ```ebnf
                   * use_statement ::= T_USE
                   *   use_type? use_declarations |
                   *   use_type use_statement '{' use_declarations '}' |
                   *   use_statement '{' use_declarations(=>typed) '}'
                   * ';'
                   * ```
                   * @see http://php.net/manual/en/language.namespaces.importing.php
                   * @return {UseGroup}
                   */
                  read_use_statement: function read_use_statement() {
                    var result = this.node("usegroup");
                    var items = [];
                    var name = null;
                    this.expect(this.tok.T_USE) && this.next();
                    var type = this.read_use_type();
                    items.push(this.read_use_declaration(false));
                    if (this.token === ",") {
                      items = items.concat(this.next().read_use_declarations(false));
                    } else if (this.token === "{") {
                      name = items[0].name;
                      items = this.next().read_use_declarations(type === null);
                      this.expect("}") && this.next();
                    }
                    result = result(name, type, items);
                    this.expect(";") && this.next();
                    return result;
                  },
                  /*
                   *
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1045
                   */
                  read_class_name_reference: function read_class_name_reference() {
                    return this.read_variable(true, false);
                  },
                  /*
                   * Reads a use declaration
                   * ```ebnf
                   * use_declaration ::= use_type? namespace_name use_alias
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
                   * @return {UseItem}
                   */
                  read_use_declaration: function read_use_declaration(typed) {
                    var result = this.node("useitem");
                    var type = null;
                    if (typed) type = this.read_use_type();
                    var name = this.read_namespace_name();
                    var alias = this.read_use_alias();
                    return result(name.name, alias, type);
                  },
                  /*
                   * Reads a list of use declarations
                   * ```ebnf
                   * use_declarations ::= use_declaration (',' use_declaration)*
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
                   * @return {UseItem[]}
                   */
                  read_use_declarations: function read_use_declarations(typed) {
                    var result = [this.read_use_declaration(typed)];
                    while (this.token === ",") {
                      this.next();
                      if (typed) {
                        if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_FUNCTION && this.token !== this.tok.T_CONST && this.token !== this.tok.T_STRING) {
                          break;
                        }
                      } else if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_STRING && this.token !== this.tok.T_NS_SEPARATOR) {
                        break;
                      }
                      result.push(this.read_use_declaration(typed));
                    }
                    return result;
                  },
                  /*
                   * Reads a use statement
                   * ```ebnf
                   * use_alias ::= (T_AS T_STRING)?
                   * ```
                   * @return {String|null}
                   */
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
                  /*
                   * Reads the namespace type declaration
                   * ```ebnf
                   * use_type ::= (T_FUNCTION | T_CONST)?
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L335
                   * @return {String|null} Possible values : function, const
                   */
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
              /***/
              7170(module3) {
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
                module3.exports = {
                  /*
                   * Unescape special chars
                   */
                  resolve_special_chars: function resolve_special_chars(text, doubleQuote) {
                    if (!doubleQuote) {
                      return text.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
                    }
                    return text.replace(/\\"/, '"').replace(/\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g, function($match, p1, p2) {
                      if (specialChar[p1]) {
                        return specialChar[p1];
                      } else if ("x" === p1[0] || "X" === p1[0]) {
                        return String.fromCodePoint(parseInt(p1.substr(1), 16));
                      } else if ("u" === p1[0]) {
                        return String.fromCodePoint(parseInt(p2, 16));
                      } else {
                        return String.fromCodePoint(parseInt(p1, 8));
                      }
                    });
                  },
                  /*
                   * Remove all leading spaces each line for heredoc text if there is a indentation
                   * @param {string} text
                   * @param {number} indentation
                   * @param {boolean} indentation_uses_spaces
                   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
                   */
                  remove_heredoc_leading_whitespace_chars: function remove_heredoc_leading_whitespace_chars(text, indentation, indentation_uses_spaces, first_encaps_node) {
                    if (indentation === 0) {
                      return text;
                    }
                    this.check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node);
                    var matchedChar = indentation_uses_spaces ? " " : "	";
                    var removementRegExp = new RegExp("\\n".concat(matchedChar, "{").concat(indentation, "}"), "g");
                    var removementFirstEncapsNodeRegExp = new RegExp("^".concat(matchedChar, "{").concat(indentation, "}"));
                    if (first_encaps_node) {
                      text = text.replace(removementFirstEncapsNodeRegExp, "");
                    }
                    return text.replace(removementRegExp, "\n");
                  },
                  /*
                   * Check indentation level of heredoc in text, if mismatch, raiseError
                   * @param {string} text
                   * @param {number} indentation
                   * @param {boolean} indentation_uses_spaces
                   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
                   */
                  check_heredoc_indentation_level: function check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node) {
                    var textSize = text.length;
                    var offset = 0;
                    var leadingWhitespaceCharCount = 0;
                    var inCoutingState = true;
                    var chToCheck = indentation_uses_spaces ? " " : "	";
                    var inCheckState = false;
                    if (!first_encaps_node) {
                      offset = text.indexOf("\n");
                      if (offset === -1) {
                        return;
                      }
                      offset++;
                    }
                    while (offset < textSize) {
                      if (inCoutingState) {
                        if (text[offset] === chToCheck) {
                          leadingWhitespaceCharCount++;
                        } else {
                          inCheckState = true;
                        }
                      } else {
                        inCoutingState = false;
                      }
                      if (text[offset] !== "\n" && inCheckState && leadingWhitespaceCharCount < indentation) {
                        this.raiseError("Invalid body indentation level (expecting an indentation at least ".concat(indentation, ")"));
                      } else {
                        inCheckState = false;
                      }
                      if (text[offset] === "\n") {
                        inCoutingState = true;
                        leadingWhitespaceCharCount = 0;
                      }
                      offset++;
                    }
                  },
                  /*
                   * Reads dereferencable scalar
                   */
                  read_dereferencable_scalar: function read_dereferencable_scalar() {
                    var result = null;
                    switch (this.token) {
                      case this.tok.T_CONSTANT_ENCAPSED_STRING:
                        {
                          var value = this.node("string");
                          var text = this.text();
                          var offset = 0;
                          if (text[0] === "b" || text[0] === "B") {
                            offset = 1;
                          }
                          var isDoubleQuote = text[offset] === '"';
                          this.next();
                          var textValue = this.resolve_special_chars(text.substring(offset + 1, text.length - 1), isDoubleQuote);
                          value = value(
                            isDoubleQuote,
                            textValue,
                            offset === 1,
                            // unicode flag
                            text
                          );
                          if (this.token === this.tok.T_DOUBLE_COLON) {
                            result = this.read_static_getter(value);
                          } else {
                            result = value;
                          }
                        }
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
                  /*
                   * ```ebnf
                   *  scalar ::= T_MAGIC_CONST
                   *       | T_LNUMBER | T_DNUMBER
                   *       | T_START_HEREDOC T_ENCAPSED_AND_WHITESPACE? T_END_HEREDOC
                   *       | '"' encaps_list '"'
                   *       | T_START_HEREDOC encaps_list T_END_HEREDOC
                   *       | namespace_name (T_DOUBLE_COLON T_STRING)?
                   * ```
                   */
                  read_scalar: function read_scalar() {
                    if (this.is("T_MAGIC_CONST")) {
                      return this.get_magic_constant();
                    } else {
                      var value, node;
                      switch (this.token) {
                        // NUMERIC
                        case this.tok.T_LNUMBER:
                        // long
                        case this.tok.T_DNUMBER: {
                          var result = this.node("number");
                          value = this.text();
                          this.next();
                          return result(value, null);
                        }
                        case this.tok.T_START_HEREDOC:
                          if (this.lexer.curCondition === "ST_NOWDOC") {
                            var start = this.lexer.yylloc.first_offset;
                            node = this.node("nowdoc");
                            value = this.next().text();
                            if (this.lexer.heredoc_label.indentation > 0) {
                              value = value.substring(0, value.length - this.lexer.heredoc_label.indentation);
                            }
                            var lastCh = value[value.length - 1];
                            if (lastCh === "\n") {
                              if (value[value.length - 2] === "\r") {
                                value = value.substring(0, value.length - 2);
                              } else {
                                value = value.substring(0, value.length - 1);
                              }
                            } else if (lastCh === "\r") {
                              value = value.substring(0, value.length - 1);
                            }
                            this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next();
                            this.expect(this.tok.T_END_HEREDOC) && this.next();
                            var raw = this.lexer._input.substring(start, this.lexer.yylloc.first_offset);
                            node = node(this.remove_heredoc_leading_whitespace_chars(value, this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node), raw, this.lexer.heredoc_label.label);
                            this.lexer.heredoc_label.finished = true;
                            return node;
                          } else {
                            return this.read_encapsed_string(this.tok.T_END_HEREDOC);
                          }
                        case '"':
                          return this.read_encapsed_string('"');
                        case 'b"':
                        case 'B"': {
                          return this.read_encapsed_string('"', true);
                        }
                        // TEXTS
                        case this.tok.T_CONSTANT_ENCAPSED_STRING:
                        case this.tok.T_ARRAY:
                        // array parser
                        case "[":
                          return this.read_dereferencable_scalar();
                        default: {
                          var err = this.error("SCALAR");
                          this.next();
                          return err;
                        }
                      }
                    }
                  },
                  /*
                   * Handles the dereferencing
                   */
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
                  /*
                   * Reads and extracts an encapsed item
                   * ```ebnf
                   * encapsed_string_item ::= T_ENCAPSED_AND_WHITESPACE
                   *  | T_DOLLAR_OPEN_CURLY_BRACES expr '}'
                   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '}'
                   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '[' expr ']' '}'
                   *  | T_CURLY_OPEN variable '}'
                   *  | variable
                   *  | variable '[' expr ']'
                   *  | variable T_OBJECT_OPERATOR T_STRING
                   * ```
                   * @return {String|Variable|Expr|Lookup}
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1219
                   */
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
                        } else {
                          result = name(varName, false);
                        }
                      } else {
                        result = result("variable", this.read_expr(), false);
                      }
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
                  /*
                   * Reads an encapsed string
                   */
                  read_encapsed_string: function read_encapsed_string(expect) {
                    var isBinary = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                    var labelStart = this.lexer.yylloc.first_offset;
                    var node = this.node("encapsed");
                    this.next();
                    var start = this.lexer.yylloc.prev_offset - (isBinary ? 1 : 0);
                    var value = [];
                    var type;
                    if (expect === "`") {
                      type = this.ast.encapsed.TYPE_SHELL;
                    } else if (expect === '"') {
                      type = this.ast.encapsed.TYPE_STRING;
                    } else {
                      type = this.ast.encapsed.TYPE_HEREDOC;
                    }
                    while (this.token !== expect && this.token !== this.EOF) {
                      value.push(this.read_encapsed_string_item(true));
                    }
                    if (value.length > 0 && value[value.length - 1].kind === "encapsedpart" && value[value.length - 1].expression.kind === "string") {
                      var _node = value[value.length - 1].expression;
                      var lastCh = _node.value[_node.value.length - 1];
                      if (lastCh === "\n") {
                        if (_node.value[_node.value.length - 2] === "\r") {
                          _node.value = _node.value.substring(0, _node.value.length - 2);
                        } else {
                          _node.value = _node.value.substring(0, _node.value.length - 1);
                        }
                      } else if (lastCh === "\r") {
                        _node.value = _node.value.substring(0, _node.value.length - 1);
                      }
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
                  /*
                   * Constant token
                   */
                  get_magic_constant: function get_magic_constant() {
                    var result = this.node("magic");
                    var name = this.text();
                    this.next();
                    return result(name.toUpperCase(), name);
                  }
                };
              },
              /***/
              6261(module3) {
                module3.exports = {
                  /*
                   * reading a list of top statements (helper for top_statement*)
                   * ```ebnf
                   *  top_statements ::= top_statement*
                   * ```
                   */
                  read_top_statements: function read_top_statements() {
                    var result = [];
                    while (this.token !== this.EOF && this.token !== "}") {
                      var statement = this.read_top_statement();
                      if (statement) {
                        if (Array.isArray(statement)) {
                          result = result.concat(statement);
                        } else {
                          result.push(statement);
                        }
                      }
                    }
                    return result;
                  },
                  /*
                   * reading a top statement
                   * ```ebnf
                   *  top_statement ::=
                   *       namespace | function | class
                   *       | interface | trait
                   *       | use_statements | const_list
                   *       | statement
                   * ```
                   */
                  read_top_statement: function read_top_statement() {
                    var attrs = [];
                    if (this.token === this.tok.T_ATTRIBUTE) {
                      attrs = this.read_attr_list();
                    }
                    switch (this.token) {
                      case this.tok.T_FUNCTION:
                        return this.read_function(false, false, attrs);
                      // optional flags
                      case this.tok.T_ABSTRACT:
                      case this.tok.T_FINAL:
                      case this.tok.T_READ_ONLY:
                      case this.tok.T_CLASS:
                        return this.read_class_declaration_statement(attrs);
                      case this.tok.T_INTERFACE:
                        return this.read_interface_declaration_statement(attrs);
                      case this.tok.T_TRAIT:
                        return this.read_trait_declaration_statement();
                      case this.tok.T_ENUM:
                        return this.read_enum_declaration_statement(attrs);
                      case this.tok.T_USE:
                        return this.read_use_statement();
                      case this.tok.T_CONST: {
                        var result = this.node("constantstatement");
                        var items = this.next().read_const_list();
                        this.expectEndOfStatement();
                        return result(null, items);
                      }
                      case this.tok.T_NAMESPACE:
                        return this.read_namespace();
                      case this.tok.T_HALT_COMPILER: {
                        var _result = this.node("halt");
                        if (this.next().expect("(")) this.next();
                        if (this.expect(")")) this.next();
                        this.expect(";");
                        this.lexer.done = true;
                        return _result(this.lexer._input.substring(this.lexer.offset));
                      }
                      default:
                        return this.read_statement();
                    }
                  },
                  /*
                   * reads a list of simple inner statements (helper for inner_statement*)
                   * ```ebnf
                   *  inner_statements ::= inner_statement*
                   * ```
                   */
                  read_inner_statements: function read_inner_statements() {
                    var result = [];
                    while (this.token != this.EOF && this.token !== "}") {
                      var statement = this.read_inner_statement();
                      if (statement) {
                        if (Array.isArray(statement)) {
                          result = result.concat(statement);
                        } else {
                          result.push(statement);
                        }
                      }
                    }
                    return result;
                  },
                  /*
                   * Reads a list of constants declaration
                   * ```ebnf
                   *   const_list ::= T_CONST T_STRING '=' expr (',' T_STRING '=' expr)* ';'
                   * ```
                   */
                  read_const_list: function read_const_list() {
                    return this.read_list(function() {
                      this.expect(this.tok.T_STRING);
                      var result = this.node("constant");
                      var constName = this.node("identifier");
                      var name = this.text();
                      this.next();
                      constName = constName(name);
                      if (this.expect("=")) {
                        return result(constName, this.next().read_expr());
                      } else {
                        return result(constName, null);
                      }
                    }, ",", false);
                  },
                  /*
                   * Reads a list of constants declaration
                   * ```ebnf
                   *   declare_list ::= IDENTIFIER '=' expr (',' IDENTIFIER '=' expr)*
                   * ```
                   * @retrurn {Array}
                   */
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
                      if (this.expect("=")) {
                        value = this.next().read_expr();
                      }
                      result.push(directive(key, value));
                      if (this.token !== ",") break;
                      this.next();
                    }
                    return result;
                  },
                  /*
                   * reads a simple inner statement
                   * ```ebnf
                   *  inner_statement ::= '{' inner_statements '}' | token
                   * ```
                   */
                  read_inner_statement: function read_inner_statement() {
                    var attrs = [];
                    if (this.token === this.tok.T_ATTRIBUTE) {
                      attrs = this.read_attr_list();
                    }
                    switch (this.token) {
                      case this.tok.T_FUNCTION: {
                        var result = this.read_function(false, false);
                        result.attrGroups = attrs;
                        return result;
                      }
                      // optional flags
                      case this.tok.T_ABSTRACT:
                      case this.tok.T_FINAL:
                      case this.tok.T_CLASS:
                        return this.read_class_declaration_statement();
                      case this.tok.T_INTERFACE:
                        return this.read_interface_declaration_statement();
                      case this.tok.T_TRAIT:
                        return this.read_trait_declaration_statement();
                      case this.tok.T_ENUM:
                        return this.read_enum_declaration_statement();
                      case this.tok.T_HALT_COMPILER: {
                        this.raiseError("__HALT_COMPILER() can only be used from the outermost scope");
                        var node = this.node("halt");
                        this.next().expect("(") && this.next();
                        this.expect(")") && this.next();
                        node = node(this.lexer._input.substring(this.lexer.offset));
                        this.expect(";") && this.next();
                        return node;
                      }
                      default:
                        return this.read_statement();
                    }
                  },
                  /*
                   * Reads statements
                   */
                  read_statement: function read_statement() {
                    switch (this.token) {
                      case "{":
                        return this.read_code_block(false);
                      case this.tok.T_IF:
                        return this.read_if();
                      case this.tok.T_SWITCH:
                        return this.read_switch();
                      case this.tok.T_FOR:
                        return this.read_for();
                      case this.tok.T_FOREACH:
                        return this.read_foreach();
                      case this.tok.T_WHILE:
                        return this.read_while();
                      case this.tok.T_DO:
                        return this.read_do();
                      case this.tok.T_COMMENT:
                        return this.read_comment();
                      case this.tok.T_DOC_COMMENT:
                        return this.read_doc_comment();
                      case this.tok.T_RETURN: {
                        var result = this.node("return");
                        this.next();
                        var expr = this.read_optional_expr(";");
                        this.expectEndOfStatement();
                        return result(expr);
                      }
                      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L429
                      case this.tok.T_BREAK:
                      case this.tok.T_CONTINUE: {
                        var _result2 = this.node(this.token === this.tok.T_CONTINUE ? "continue" : "break");
                        this.next();
                        var level = this.read_optional_expr(";");
                        this.expectEndOfStatement();
                        return _result2(level);
                      }
                      case this.tok.T_GLOBAL: {
                        var _result3 = this.node("global");
                        var items = this.next().read_list(this.read_simple_variable, ",");
                        this.expectEndOfStatement();
                        return _result3(items);
                      }
                      case this.tok.T_STATIC: {
                        var current = [this.token, this.lexer.getState()];
                        var _result4 = this.node();
                        if (this.next().token === this.tok.T_DOUBLE_COLON) {
                          this.lexer.tokens.push(current);
                          var _expr = this.next().read_expr();
                          this.expectEndOfStatement(_expr);
                          return _result4("expressionstatement", _expr);
                        }
                        if (this.token === this.tok.T_FUNCTION) {
                          return this.read_function(true, [0, 1, 0]);
                        }
                        var _items = this.read_variable_declarations();
                        this.expectEndOfStatement();
                        return _result4("static", _items);
                      }
                      case this.tok.T_ECHO: {
                        var _result5 = this.node("echo");
                        var text = this.text();
                        var shortForm = text === "<?=" || text === "<%=";
                        var expressions = this.next().read_function_list(this.read_expr, ",");
                        this.expectEndOfStatement();
                        return _result5(expressions, shortForm);
                      }
                      case this.tok.T_INLINE_HTML: {
                        var value = this.text();
                        var prevChar = this.lexer.yylloc.first_offset > 0 ? this.lexer._input[this.lexer.yylloc.first_offset - 1] : null;
                        var fixFirstLine = prevChar === "\r" || prevChar === "\n";
                        if (fixFirstLine) {
                          if (prevChar === "\n" && this.lexer.yylloc.first_offset > 1 && this.lexer._input[this.lexer.yylloc.first_offset - 2] === "\r") {
                            prevChar = "\r\n";
                          }
                        }
                        var _result6 = this.node("inline");
                        this.next();
                        return _result6(value, fixFirstLine ? prevChar + value : value);
                      }
                      case this.tok.T_UNSET: {
                        var _result7 = this.node("unset");
                        this.next().expect("(") && this.next();
                        var variables = this.read_function_list(this.read_variable, ",");
                        this.expect(")") && this.next();
                        this.expect(";") && this.next();
                        return _result7(variables);
                      }
                      case this.tok.T_DECLARE: {
                        var _result8 = this.node("declare");
                        var body = [];
                        var mode;
                        this.next().expect("(") && this.next();
                        var directives = this.read_declare_list();
                        this.expect(")") && this.next();
                        if (this.token === ":") {
                          this.next();
                          while (this.token != this.EOF && this.token !== this.tok.T_ENDDECLARE) {
                            body.push(this.read_top_statement());
                          }
                          if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                            body.push(this.node("noop")());
                          }
                          this.expect(this.tok.T_ENDDECLARE) && this.next();
                          this.expectEndOfStatement();
                          mode = this.ast.declare.MODE_SHORT;
                        } else if (this.token === "{") {
                          this.next();
                          while (this.token != this.EOF && this.token !== "}") {
                            body.push(this.read_top_statement());
                          }
                          if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                            body.push(this.node("noop")());
                          }
                          this.expect("}") && this.next();
                          mode = this.ast.declare.MODE_BLOCK;
                        } else {
                          this.expect(";") && this.next();
                          mode = this.ast.declare.MODE_NONE;
                        }
                        return _result8(directives, body, mode);
                      }
                      case this.tok.T_TRY:
                        return this.read_try();
                      case this.tok.T_THROW: {
                        var _result9 = this.node("throw");
                        var _expr2 = this.next().read_expr();
                        this.expectEndOfStatement();
                        return _result9(_expr2);
                      }
                      // ignore this (extra ponctuation)
                      case ";": {
                        this.next();
                        return null;
                      }
                      case this.tok.T_STRING: {
                        var _result0 = this.node();
                        var _current = [this.token, this.lexer.getState()];
                        var labelNameText = this.text();
                        var labelName = this.node("identifier");
                        if (this.next().token === ":") {
                          labelName = labelName(labelNameText);
                          this.next();
                          return _result0("label", labelName);
                        } else {
                          labelName.destroy();
                        }
                        _result0.destroy();
                        this.lexer.tokens.push(_current);
                        var statement = this.node("expressionstatement");
                        var _expr3 = this.next().read_expr();
                        this.expectEndOfStatement(_expr3);
                        return statement(_expr3);
                      }
                      case this.tok.T_GOTO: {
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
                      }
                      default: {
                        var _statement = this.node("expressionstatement");
                        var _expr4 = this.read_expr();
                        this.expectEndOfStatement(_expr4);
                        return _statement(_expr4);
                      }
                    }
                  },
                  /*
                   * ```ebnf
                   *  code_block ::= '{' (inner_statements | top_statements) '}'
                   * ```
                   */
                  read_code_block: function read_code_block(top) {
                    var result = this.node("block");
                    this.expect("{") && this.next();
                    var body = top ? this.read_top_statements() : this.read_inner_statements();
                    if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                      body.push(this.node("noop")());
                    }
                    this.expect("}") && this.next();
                    return result(null, body);
                  }
                };
              },
              /***/
              2478(module3) {
                module3.exports = {
                  /*
                   * Reads a switch statement
                   * ```ebnf
                   *  switch ::= T_SWITCH '(' expr ')' switch_case_list
                   * ```
                   * @return {Switch}
                   * @see http://php.net/manual/en/control-structures.switch.php
                   */
                  read_switch: function read_switch() {
                    var result = this.node("switch");
                    this.expect(this.tok.T_SWITCH) && this.next();
                    this.expect("(") && this.next();
                    var test = this.read_expr();
                    this.expect(")") && this.next();
                    var shortForm = this.token === ":";
                    var body = this.read_switch_case_list();
                    return result(test, body, shortForm);
                  },
                  /*
                   * ```ebnf
                   *  switch_case_list ::= '{' ';'? case_list* '}' | ':' ';'? case_list* T_ENDSWITCH ';'
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L566
                   */
                  read_switch_case_list: function read_switch_case_list() {
                    var expect = null;
                    var result = this.node("block");
                    var items = [];
                    if (this.token === "{") {
                      expect = "}";
                    } else if (this.token === ":") {
                      expect = this.tok.T_ENDSWITCH;
                    } else {
                      this.expect(["{", ":"]);
                    }
                    this.next();
                    if (this.token === ";") {
                      this.next();
                    }
                    while (this.token !== this.EOF && this.token !== expect) {
                      items.push(this.read_case_list(expect));
                    }
                    if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                      items.push(this.node("noop")());
                    }
                    this.expect(expect) && this.next();
                    if (expect === this.tok.T_ENDSWITCH) {
                      this.expectEndOfStatement();
                    }
                    return result(null, items);
                  },
                  /*
                   * ```ebnf
                   *   case_list ::= ((T_CASE expr) | T_DEFAULT) (':' | ';') inner_statement*
                   * ```
                   */
                  read_case_list: function read_case_list(stopToken) {
                    var result = this.node("case");
                    var test = null;
                    if (this.token === this.tok.T_CASE) {
                      test = this.next().read_expr();
                    } else if (this.token === this.tok.T_DEFAULT) {
                      this.next();
                    } else {
                      this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]);
                    }
                    this.expect([":", ";"]) && this.next();
                    var body = this.node("block");
                    var items = [];
                    while (this.token !== this.EOF && this.token !== stopToken && this.token !== this.tok.T_CASE && this.token !== this.tok.T_DEFAULT) {
                      items.push(this.read_inner_statement());
                    }
                    return result(test, body(null, items));
                  }
                };
              },
              /***/
              77(module3) {
                module3.exports = {
                  /*
                   * ```ebnf
                   *  try ::= T_TRY '{' inner_statement* '}'
                   *          (
                   *              T_CATCH '(' namespace_name (variable)? ')' '{'  inner_statement* '}'
                   *          )*
                   *          (T_FINALLY '{' inner_statement* '}')?
                   * ```
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L448
                   * @return {Try}
                   */
                  read_try: function read_try() {
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
                      if (this.version < 800 || this.token === this.tok.T_VARIABLE) {
                        variable = this.read_variable(true, false);
                      }
                      this.expect(")");
                      catches.push(item(this.next().read_statement(), what, variable));
                    }
                    if (this.token === this.tok.T_FINALLY) {
                      always = this.next().read_statement();
                    }
                    return result(body, catches, always);
                  }
                };
              },
              /***/
              6077(module3) {
                module3.exports = {
                  /*
                   * Reads a short form of tokens
                   * @param {Number} token - The ending token
                   * @return {Block}
                   */
                  read_short_form: function read_short_form(token) {
                    var body = this.node("block");
                    var items = [];
                    if (this.expect(":")) this.next();
                    while (this.token != this.EOF && this.token !== token) {
                      items.push(this.read_inner_statement());
                    }
                    if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
                      items.push(this.node("noop")());
                    }
                    if (this.expect(token)) this.next();
                    this.expectEndOfStatement();
                    return body(null, items);
                  },
                  /*
                   * https://wiki.php.net/rfc/trailing-comma-function-calls
                   * @param {*} item
                   * @param {*} separator
                   */
                  read_function_list: function read_function_list(item, separator) {
                    var result = [];
                    do {
                      if (this.token == separator && this.version >= 703 && result.length > 0) {
                        result.push(this.node("noop")());
                        break;
                      }
                      result.push(item.apply(this, []));
                      if (this.token != separator) {
                        break;
                      }
                      if (this.next().token == ")" && this.version >= 703) {
                        break;
                      }
                    } while (this.token != this.EOF);
                    return result;
                  },
                  /*
                   * Helper : reads a list of tokens / sample : T_STRING ',' T_STRING ...
                   * ```ebnf
                   * list ::= separator? ( item separator )* item
                   * ```
                   */
                  read_list: function read_list(item, separator, preserveFirstSeparator) {
                    var result = [];
                    if (this.token == separator) {
                      if (preserveFirstSeparator) {
                        result.push(typeof item === "function" ? this.node("noop")() : null);
                      }
                      this.next();
                    }
                    if (typeof item === "function") {
                      do {
                        var itemResult = item.apply(this, []);
                        if (itemResult) {
                          result.push(itemResult);
                        }
                        if (this.token != separator) {
                          break;
                        }
                      } while (this.next().token != this.EOF);
                    } else {
                      if (this.expect(item)) {
                        result.push(this.text());
                      } else {
                        return [];
                      }
                      while (this.next().token != this.EOF) {
                        if (this.token != separator) break;
                        if (this.next().token != item) break;
                        result.push(this.text());
                      }
                    }
                    return result;
                  },
                  /*
                   * Reads a list of names separated by a comma
                   *
                   * ```ebnf
                   * name_list ::= namespace (',' namespace)*
                   * ```
                   *
                   * Sample code :
                   * ```php
                   * <?php class foo extends bar, baz { }
                   * ```
                   *
                   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L726
                   * @return {Reference[]}
                   */
                  read_name_list: function read_name_list() {
                    return this.read_list(this.read_namespace_name, ",", false);
                  },
                  /*
                   * Reads the byref token and assign it to the specified node
                   * @param {*} cb
                   */
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
                  /*
                   * Reads a list of variables declarations
                   *
                   * ```ebnf
                   * variable_declaration ::= T_VARIABLE ('=' expr)?*
                   * variable_declarations ::= variable_declaration (',' variable_declaration)*
                   * ```
                   *
                   * Sample code :
                   * ```php
                   * <?php static $a = 'hello', $b = 'world';
                   * ```
                   * @return {StaticVariable[]} Returns an array composed by a list of variables, or
                   * assign values
                   */
                  read_variable_declarations: function read_variable_declarations() {
                    return this.read_list(function() {
                      var node = this.node("staticvariable");
                      var variable = this.node("variable");
                      if (this.expect(this.tok.T_VARIABLE)) {
                        var name = this.text().substring(1);
                        this.next();
                        variable = variable(name, false);
                      } else {
                        variable = variable("#ERR", false);
                      }
                      if (this.token === "=") {
                        return node(variable, this.next().read_expr());
                      } else {
                        return variable;
                      }
                    }, ",");
                  },
                  /*
                   * Reads class extends
                   */
                  read_extends_from: function read_extends_from() {
                    if (this.token === this.tok.T_EXTENDS) {
                      return this.next().read_namespace_name();
                    }
                    return null;
                  },
                  /*
                   * Reads interface extends list
                   */
                  read_interface_extends_list: function read_interface_extends_list() {
                    if (this.token === this.tok.T_EXTENDS) {
                      return this.next().read_name_list();
                    }
                    return null;
                  },
                  /*
                   * Reads implements list
                   */
                  read_implements_list: function read_implements_list() {
                    if (this.token === this.tok.T_IMPLEMENTS) {
                      return this.next().read_name_list();
                    }
                    return null;
                  }
                };
              },
              /***/
              1130(module3) {
                module3.exports = {
                  /*
                   * Reads a variable
                   *
                   * ```ebnf
                   *   variable ::= &? ...complex @todo
                   * ```
                   *
                   * Some samples of parsed code :
                   * ```php
                   *  &$var                      // simple var
                   *  $var                      // simple var
                   *  classname::CONST_NAME     // dynamic class name with const retrieval
                   *  foo()                     // function call
                   *  $var->func()->property    // chained calls
                   * ```
                   */
                  read_variable: function read_variable(read_only, encapsed) {
                    var result;
                    if (this.token === "&") {
                      return this.read_byref(this.read_variable.bind(this, read_only, encapsed));
                    }
                    if (this.is([this.tok.T_VARIABLE, "$"])) {
                      result = this.read_reference_variable(encapsed);
                    } else if (this.is([this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE])) {
                      result = this.node();
                      var name = this.read_namespace_name();
                      if (this.token != this.tok.T_DOUBLE_COLON && this.token != "(" && ["parentreference", "selfreference"].indexOf(name.kind) === -1) {
                        var literal = name.name.toLowerCase();
                        if (literal === "true") {
                          result = name.destroy(result("boolean", true, name.name));
                        } else if (literal === "false") {
                          result = name.destroy(result("boolean", false, name.name));
                        } else if (literal === "null") {
                          result = name.destroy(result("nullkeyword", name.name));
                        } else {
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
                    } else {
                      this.expect("VARIABLE");
                    }
                    if (this.token === this.tok.T_DOUBLE_COLON) {
                      result = this.read_static_getter(result, encapsed);
                    }
                    return this.recursive_variable_chain_scan(result, read_only, encapsed);
                  },
                  // resolves a static call
                  read_static_getter: function read_static_getter(what, encapsed) {
                    var result = this.node("staticlookup");
                    var offset, name;
                    if (this.next().is([this.tok.T_VARIABLE, "$"])) {
                      offset = this.read_reference_variable(encapsed);
                    } else if (this.token === this.tok.T_STRING || this.token === this.tok.T_CLASS || this.version >= 700 && this.is("IDENTIFIER")) {
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
                        if (is_static_lookup && this.token === this.tok.T_OBJECT_OPERATOR) {
                          this.error();
                        }
                        break;
                      case this.tok.T_VARIABLE:
                        what = this.node("variable");
                        name = this.text().substring(1);
                        this.next();
                        what = what(name, false);
                        break;
                      case this.tok.T_CLASS:
                        if (!is_static_lookup) {
                          this.error();
                        }
                        what = this.node("identifier");
                        name = this.text();
                        this.next();
                        what = what(name, false);
                        break;
                      case "$":
                        what = this.node();
                        this.next().expect(["$", "{", this.tok.T_VARIABLE]);
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
                        this.error([this.tok.T_STRING, this.tok.T_VARIABLE, "$", "{"]);
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
                    recursive_scan_loop: while (this.token != this.EOF) {
                      switch (this.token) {
                        case "(":
                          if (read_only) {
                            return result;
                          } else {
                            result = this.node("call")(result, this.read_argument_list());
                          }
                          break;
                        case "[":
                        case "{": {
                          var backet = this.token;
                          var isSquareBracket = backet === "[";
                          node = this.node("offsetlookup");
                          this.next();
                          offset = false;
                          if (encapsed) {
                            offset = this.read_encaps_var_offset();
                            this.expect(isSquareBracket ? "]" : "}") && this.next();
                          } else {
                            var isCallableVariable = isSquareBracket ? this.token !== "]" : this.token !== "}";
                            if (isCallableVariable) {
                              offset = this.read_expr();
                              this.expect(isSquareBracket ? "]" : "}") && this.next();
                            } else {
                              this.next();
                            }
                          }
                          result = node(result, offset);
                          break;
                        }
                        case this.tok.T_DOUBLE_COLON:
                          if (result.kind === "staticlookup" && result.offset.kind === "identifier") {
                            this.error();
                          }
                          node = this.node("staticlookup");
                          result = node(result, this.read_what(true));
                          break;
                        case this.tok.T_OBJECT_OPERATOR: {
                          node = this.node("propertylookup");
                          result = node(result, this.read_what());
                          break;
                        }
                        case this.tok.T_NULLSAFE_OBJECT_OPERATOR: {
                          node = this.node("nullsafepropertylookup");
                          result = node(result, this.read_what());
                          break;
                        }
                        default:
                          break recursive_scan_loop;
                      }
                    }
                    return result;
                  },
                  /*
                   * https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L1231
                   */
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
                      this.expect([this.tok.T_STRING, this.tok.T_NUM_STRING, "-", this.tok.T_VARIABLE]);
                      var _text = this.text();
                      this.next();
                      offset = offset("identifier", _text);
                    }
                    return offset;
                  },
                  /*
                   * ```ebnf
                   *  reference_variable ::=  simple_variable ('[' OFFSET ']')* | '{' EXPR '}'
                   * ```
                   * <code>
                   *  $foo[123];      // foo is an array ==> gets its entry
                   *  $foo{1};        // foo is a string ==> get the 2nd char offset
                   *  ${'foo'}[123];  // get the dynamic var $foo
                   *  $foo[123]{1};   // gets the 2nd char from the 123 array entry
                   * </code>
                   */
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
                  /*
                   * ```ebnf
                   *  simple_variable ::= T_VARIABLE | '$' '{' expr '}' | '$' simple_variable
                   * ```
                   */
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
                        case "{": {
                          var expr = this.next().read_expr();
                          this.expect("}") && this.next();
                          result = result(expr, true);
                          break;
                        }
                        case "$":
                          result = result(this.read_simple_variable(), false);
                          break;
                        case this.tok.T_VARIABLE: {
                          name = this.text().substring(1);
                          var node = this.node("variable");
                          this.next();
                          result = result(node(name, false), false);
                          break;
                        }
                        default:
                          this.error(["{", "$", this.tok.T_VARIABLE]);
                          name = this.text();
                          this.next();
                          result = result(name, false);
                      }
                    }
                    return result;
                  }
                };
              },
              /***/
              1906(module3) {
                function _typeof(o) {
                  "@babel/helpers - typeof";
                  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
                    return typeof o2;
                  } : function(o2) {
                    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
                  }, _typeof(o);
                }
                function ownKeys(e, r) {
                  var t = Object.keys(e);
                  if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter(function(r2) {
                      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
                    })), t.push.apply(t, o);
                  }
                  return t;
                }
                function _objectSpread(e) {
                  for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
                      _defineProperty(e, r2, t[r2]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
                      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
                    });
                  }
                  return e;
                }
                function _defineProperty(e, r, t) {
                  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
                }
                function _toPropertyKey(t) {
                  var i = _toPrimitive(t, "string");
                  return "symbol" == _typeof(i) ? i : i + "";
                }
                function _toPrimitive(t, r) {
                  if ("object" != _typeof(t) || !t) return t;
                  var e = t[Symbol.toPrimitive];
                  if (void 0 !== e) {
                    var i = e.call(t, r);
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
                    var e, n, i, u, a = [], f = true, o = false;
                    try {
                      if (i = (t = t.call(r)).next, 0 === l) ;
                      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
                    } catch (r2) {
                      o = true, n = r2;
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
                var tokens = {
                  values: Object.entries(TokenNames).reduce(function(result, _ref) {
                    var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, value, key));
                  }, {}),
                  names: TokenNames
                };
                module3.exports = Object.freeze(tokens);
              }
              /******/
            };
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              var cachedModule = __webpack_module_cache__[moduleId];
              if (cachedModule !== void 0) {
                return cachedModule.exports;
              }
              var module3 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module3, module3.exports, __webpack_require__);
              return module3.exports;
            }
            var __webpack_exports__ = __webpack_require__(5362);
            __webpack_exports__ = __webpack_exports__["default"];
            return __webpack_exports__;
          })()
        );
      });
    })(phpParser);
    return phpParser.exports;
  }
  var phpParserExports = requirePhpParser();
  const PhpParser = /* @__PURE__ */ getDefaultExportFromCjs$1(phpParserExports);
  function toDiagnostics(errors) {
    if (!errors) {
      return [];
    }
    return errors.map((el) => {
      let line;
      if (el.line) {
        if (el.line > 0) {
          line = el.line - 1;
        } else {
          line = el.line;
        }
      } else {
        line = 0;
      }
      let startLine = line;
      let startColumn = 0;
      let endLine = line;
      let endColumn = 0;
      if (el.loc) {
        if (el.loc.start.offset > el.loc.end.offset) {
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
      }
      return {
        range: {
          start: { line: startLine, character: startColumn },
          end: { line: endLine, character: endColumn }
        },
        message: el.message,
        severity: 1,
        source: "php-parser"
      };
    });
  }
  class PhpService extends BaseService {
    constructor(mode) {
      super(mode);
      this.serviceCapabilities = {
        diagnosticProvider: {
          interFileDependencies: true,
          workspaceDiagnostics: true
        }
      };
      this.parser = new PhpParser({
        parser: {
          extractDoc: false,
          suppressErrors: true
        },
        ast: {
          withPositions: false,
          //TODO: turn it on, when https://github.com/glayzzle/php-parser/issues/1185 would be fixed
          withSource: false
        },
        lexer: {
          all_tokens: false,
          comment_tokens: false,
          mode_eval: false,
          asp_tags: false,
          short_tags: true
          // allow `<?` if needed
        }
      });
    }
    async doValidation(document) {
      var _a;
      let value = this.getDocumentValue(document.uri);
      if (!value) {
        return [];
      }
      const inline = !!this.getOption(document.uri, "inline");
      try {
        let result;
        if (inline) {
          result = this.parser.parseEval(value);
        } else {
          result = this.parser.parseCode(value, document.uri);
        }
        return filterDiagnostics(
          toDiagnostics((_a = result == null ? void 0 : result.errors) != null ? _a : []),
          this.optionsToFilterDiagnostics
        );
      } catch (e) {
        console.error(e);
        return [];
      }
    }
  }
  exports2.PhpService = PhpService;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
