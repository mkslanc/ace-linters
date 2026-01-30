(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
})(this, (function(exports2) {
  "use strict";
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
        function addMessageToQueue(queue, message) {
          if (messages_1.Message.isRequest(message)) {
            queue.set(createRequestQueueKey(message.id), message);
          } else if (messages_1.Message.isResponse(message)) {
            queue.set(createResponseQueueKey(message.id), message);
          } else {
            queue.set(createNotificationQueueKey(), message);
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
  var browser;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser;
    hasRequiredBrowser = 1;
    browser = requireMain$1();
    return browser;
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
  var PHP = { Constants: {} };
  PHP.Constants.T_THROW = 317;
  PHP.Constants.T_INCLUDE = 272;
  PHP.Constants.T_INCLUDE_ONCE = 273;
  PHP.Constants.T_EVAL = 274;
  PHP.Constants.T_REQUIRE = 275;
  PHP.Constants.T_REQUIRE_ONCE = 276;
  PHP.Constants.T_LOGICAL_OR = 277;
  PHP.Constants.T_LOGICAL_XOR = 278;
  PHP.Constants.T_LOGICAL_AND = 279;
  PHP.Constants.T_PRINT = 280;
  PHP.Constants.T_YIELD = 281;
  PHP.Constants.T_DOUBLE_ARROW = 386;
  PHP.Constants.T_YIELD_FROM = 282;
  PHP.Constants.T_PLUS_EQUAL = 352;
  PHP.Constants.T_MINUS_EQUAL = 353;
  PHP.Constants.T_MUL_EQUAL = 354;
  PHP.Constants.T_DIV_EQUAL = 355;
  PHP.Constants.T_CONCAT_EQUAL = 356;
  PHP.Constants.T_MOD_EQUAL = 357;
  PHP.Constants.T_AND_EQUAL = 358;
  PHP.Constants.T_OR_EQUAL = 359;
  PHP.Constants.T_XOR_EQUAL = 360;
  PHP.Constants.T_SL_EQUAL = 361;
  PHP.Constants.T_SR_EQUAL = 362;
  PHP.Constants.T_POW_EQUAL = 402;
  PHP.Constants.T_COALESCE_EQUAL = 363;
  PHP.Constants.T_COALESCE = 400;
  PHP.Constants.T_BOOLEAN_OR = 364;
  PHP.Constants.T_BOOLEAN_AND = 365;
  PHP.Constants.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG = 404;
  PHP.Constants.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG = 403;
  PHP.Constants.T_IS_EQUAL = 366;
  PHP.Constants.T_IS_NOT_EQUAL = 367;
  PHP.Constants.T_IS_IDENTICAL = 368;
  PHP.Constants.T_IS_NOT_IDENTICAL = 369;
  PHP.Constants.T_SPACESHIP = 372;
  PHP.Constants.T_IS_SMALLER_OR_EQUAL = 370;
  PHP.Constants.T_IS_GREATER_OR_EQUAL = 371;
  PHP.Constants.T_SL = 373;
  PHP.Constants.T_SR = 374;
  PHP.Constants.T_INSTANCEOF = 283;
  PHP.Constants.T_INC = 375;
  PHP.Constants.T_DEC = 376;
  PHP.Constants.T_INT_CAST = 377;
  PHP.Constants.T_DOUBLE_CAST = 378;
  PHP.Constants.T_STRING_CAST = 379;
  PHP.Constants.T_ARRAY_CAST = 380;
  PHP.Constants.T_OBJECT_CAST = 381;
  PHP.Constants.T_BOOL_CAST = 382;
  PHP.Constants.T_UNSET_CAST = 383;
  PHP.Constants.T_POW = 401;
  PHP.Constants.T_NEW = 284;
  PHP.Constants.T_CLONE = 285;
  PHP.Constants.T_EXIT = 286;
  PHP.Constants.T_IF = 287;
  PHP.Constants.T_ELSEIF = 288;
  PHP.Constants.T_ELSE = 289;
  PHP.Constants.T_ENDIF = 290;
  PHP.Constants.T_LNUMBER = 260;
  PHP.Constants.T_DNUMBER = 261;
  PHP.Constants.T_STRING = 262;
  PHP.Constants.T_STRING_VARNAME = 270;
  PHP.Constants.T_VARIABLE = 266;
  PHP.Constants.T_NUM_STRING = 271;
  PHP.Constants.T_INLINE_HTML = 267;
  PHP.Constants.T_ENCAPSED_AND_WHITESPACE = 268;
  PHP.Constants.T_CONSTANT_ENCAPSED_STRING = 269;
  PHP.Constants.T_ECHO = 291;
  PHP.Constants.T_DO = 292;
  PHP.Constants.T_WHILE = 293;
  PHP.Constants.T_ENDWHILE = 294;
  PHP.Constants.T_FOR = 295;
  PHP.Constants.T_ENDFOR = 296;
  PHP.Constants.T_FOREACH = 297;
  PHP.Constants.T_ENDFOREACH = 298;
  PHP.Constants.T_DECLARE = 299;
  PHP.Constants.T_ENDDECLARE = 300;
  PHP.Constants.T_AS = 301;
  PHP.Constants.T_SWITCH = 302;
  PHP.Constants.T_MATCH = 306;
  PHP.Constants.T_ENDSWITCH = 303;
  PHP.Constants.T_CASE = 304;
  PHP.Constants.T_DEFAULT = 305;
  PHP.Constants.T_BREAK = 307;
  PHP.Constants.T_CONTINUE = 308;
  PHP.Constants.T_GOTO = 309;
  PHP.Constants.T_FUNCTION = 310;
  PHP.Constants.T_FN = 311;
  PHP.Constants.T_CONST = 312;
  PHP.Constants.T_RETURN = 313;
  PHP.Constants.T_TRY = 314;
  PHP.Constants.T_CATCH = 315;
  PHP.Constants.T_FINALLY = 316;
  PHP.Constants.T_THROW = 317;
  PHP.Constants.T_USE = 318;
  PHP.Constants.T_INSTEADOF = 319;
  PHP.Constants.T_GLOBAL = 320;
  PHP.Constants.T_STATIC = 321;
  PHP.Constants.T_ABSTRACT = 322;
  PHP.Constants.T_FINAL = 323;
  PHP.Constants.T_PRIVATE = 324;
  PHP.Constants.T_PROTECTED = 325;
  PHP.Constants.T_PUBLIC = 326;
  PHP.Constants.T_READONLY = 327;
  PHP.Constants.T_VAR = 328;
  PHP.Constants.T_UNSET = 329;
  PHP.Constants.T_ISSET = 330;
  PHP.Constants.T_EMPTY = 331;
  PHP.Constants.T_HALT_COMPILER = 332;
  PHP.Constants.T_CLASS = 333;
  PHP.Constants.T_TRAIT = 334;
  PHP.Constants.T_INTERFACE = 335;
  PHP.Constants.T_ENUM = 336;
  PHP.Constants.T_EXTENDS = 337;
  PHP.Constants.T_IMPLEMENTS = 338;
  PHP.Constants.T_OBJECT_OPERATOR = 384;
  PHP.Constants.T_NULLSAFE_OBJECT_OPERATOR = 385;
  PHP.Constants.T_DOUBLE_ARROW = 386;
  PHP.Constants.T_LIST = 340;
  PHP.Constants.T_ARRAY = 341;
  PHP.Constants.T_CALLABLE = 342;
  PHP.Constants.T_CLASS_C = 346;
  PHP.Constants.T_TRAIT_C = 347;
  PHP.Constants.T_METHOD_C = 348;
  PHP.Constants.T_FUNC_C = 349;
  PHP.Constants.T_LINE = 343;
  PHP.Constants.T_FILE = 344;
  PHP.Constants.T_START_HEREDOC = 393;
  PHP.Constants.T_END_HEREDOC = 394;
  PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES = 395;
  PHP.Constants.T_CURLY_OPEN = 396;
  PHP.Constants.T_PAAMAYIM_NEKUDOTAYIM = 397;
  PHP.Constants.T_NAMESPACE = 339;
  PHP.Constants.T_NS_C = 350;
  PHP.Constants.T_DIR = 345;
  PHP.Constants.T_NS_SEPARATOR = 398;
  PHP.Constants.T_ELLIPSIS = 399;
  PHP.Constants.T_NAME_FULLY_QUALIFIED = 263;
  PHP.Constants.T_NAME_QUALIFIED = 265;
  PHP.Constants.T_NAME_RELATIVE = 264;
  PHP.Constants.T_ATTRIBUTE = 351;
  PHP.Constants.T_ENUM = 336;
  PHP.Constants.T_BAD_CHARACTER = 405;
  PHP.Constants.T_COMMENT = 387;
  PHP.Constants.T_DOC_COMMENT = 388;
  PHP.Constants.T_OPEN_TAG = 389;
  PHP.Constants.T_OPEN_TAG_WITH_ECHO = 390;
  PHP.Constants.T_CLOSE_TAG = 391;
  PHP.Constants.T_WHITESPACE = 392;
  PHP.Lexer = function(src, ini) {
    var heredoc, heredocEndAllowed, stateStack = ["INITIAL"], stackPos = 0, swapState = function(state2) {
      stateStack[stackPos] = state2;
    }, pushState = function(state2) {
      stateStack[++stackPos] = state2;
    }, popState = function() {
      --stackPos;
    }, shortOpenTag = ini === void 0 || /^(on|true|1)$/i.test(ini.short_open_tag), openTag = shortOpenTag ? /^(\<\?php(?:\r\n|[ \t\r\n])|<\?|\<script language\=('|")?php('|")?\>)/i : /^(\<\?php(?:\r\n|[ \t\r\n])|\<script language\=('|")?php('|")?\>)/i, inlineHtml = shortOpenTag ? /[^<]*(?:<(?!\?|script language\=('|")?php('|")?\>)[^<]*)*/i : /[^<]*(?:<(?!\?=|\?php[ \t\r\n]|script language\=('|")?php('|")?\>)[^<]*)*/i, labelRegexPart = "[a-zA-Z_\\x7f-\\uffff][a-zA-Z0-9_\\x7f-\\uffff]*", stringRegexPart = function(quote) {
      return "[^" + quote + "\\\\${]*(?:(?:\\\\[\\s\\S]|\\$(?!\\{|[a-zA-Z_\\x7f-\\uffff])|\\{(?!\\$))[^" + quote + "\\\\${]*)*";
    }, sharedStringTokens = [
      {
        value: PHP.Constants.T_VARIABLE,
        re: new RegExp("^\\$" + labelRegexPart + "(?=\\[)"),
        func: function() {
          pushState("VAR_OFFSET");
        }
      },
      {
        value: PHP.Constants.T_VARIABLE,
        re: new RegExp("^\\$" + labelRegexPart + "(?=->" + labelRegexPart + ")"),
        func: function() {
          pushState("LOOKING_FOR_PROPERTY");
        }
      },
      {
        value: PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES,
        re: new RegExp("^\\$\\{(?=" + labelRegexPart + "[\\[}])"),
        func: function() {
          pushState("LOOKING_FOR_VARNAME");
        }
      },
      {
        value: PHP.Constants.T_VARIABLE,
        re: new RegExp("^\\$" + labelRegexPart)
      },
      {
        value: PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES,
        re: /^\$\{/,
        func: function() {
          pushState("IN_SCRIPTING");
        }
      },
      {
        value: PHP.Constants.T_CURLY_OPEN,
        re: /^\{(?=\$)/,
        func: function() {
          pushState("IN_SCRIPTING");
        }
      }
    ], data = {
      // Outside of PHP
      "INITIAL": [
        {
          value: PHP.Constants.T_OPEN_TAG_WITH_ECHO,
          re: /^<\?=/i,
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_OPEN_TAG,
          re: openTag,
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_INLINE_HTML,
          re: inlineHtml
        }
      ],
      // In normal PHP code
      "IN_SCRIPTING": [
        // Match whitespace first
        {
          value: PHP.Constants.T_WHITESPACE,
          re: /^[ \n\r\t]+/
        },
        // Keywords, sorted alphabetically
        {
          value: PHP.Constants.T_ABSTRACT,
          re: /^abstract\b/i
        },
        {
          value: PHP.Constants.T_LOGICAL_AND,
          re: /^and\b/i
        },
        {
          value: PHP.Constants.T_ARRAY,
          re: /^array\b/i
        },
        {
          value: PHP.Constants.T_AS,
          re: /^as\b/i
        },
        {
          value: PHP.Constants.T_BREAK,
          re: /^break\b/i
        },
        {
          value: PHP.Constants.T_CALLABLE,
          re: /^callable\b/i
        },
        {
          value: PHP.Constants.T_CASE,
          re: /^case\b/i
        },
        {
          value: PHP.Constants.T_CATCH,
          re: /^catch\b/i
        },
        {
          value: PHP.Constants.T_CLASS,
          re: /^class\b/i
        },
        {
          value: PHP.Constants.T_CLONE,
          re: /^clone\b/i
        },
        {
          value: PHP.Constants.T_CONST,
          re: /^const\b/i
        },
        {
          value: PHP.Constants.T_CONTINUE,
          re: /^continue\b/i
        },
        {
          value: PHP.Constants.T_DECLARE,
          re: /^declare\b/i
        },
        {
          value: PHP.Constants.T_DEFAULT,
          re: /^default\b/i
        },
        {
          value: PHP.Constants.T_DO,
          re: /^do\b/i
        },
        {
          value: PHP.Constants.T_ECHO,
          re: /^echo\b/i
        },
        {
          value: PHP.Constants.T_ELSE,
          re: /^else\b/i
        },
        {
          value: PHP.Constants.T_ELSEIF,
          re: /^elseif\b/i
        },
        {
          value: PHP.Constants.T_ENUM,
          re: /^enum\b/i
        },
        {
          value: PHP.Constants.T_ENDDECLARE,
          re: /^enddeclare\b/i
        },
        {
          value: PHP.Constants.T_ENDFOR,
          re: /^endfor\b/i
        },
        {
          value: PHP.Constants.T_ENDFOREACH,
          re: /^endforeach\b/i
        },
        {
          value: PHP.Constants.T_ENDIF,
          re: /^endif\b/i
        },
        {
          value: PHP.Constants.T_ENDSWITCH,
          re: /^endswitch\b/i
        },
        {
          value: PHP.Constants.T_ENDWHILE,
          re: /^endwhile\b/i
        },
        {
          value: PHP.Constants.T_ENUM,
          re: /^enum\b/i
        },
        {
          value: PHP.Constants.T_EMPTY,
          re: /^empty\b/i
        },
        {
          value: PHP.Constants.T_EVAL,
          re: /^eval\b/i
        },
        {
          value: PHP.Constants.T_EXIT,
          re: /^(?:exit|die)\b/i
        },
        {
          value: PHP.Constants.T_EXTENDS,
          re: /^extends\b/i
        },
        {
          value: PHP.Constants.T_FINAL,
          re: /^final\b/i
        },
        {
          value: PHP.Constants.T_FINALLY,
          re: /^finally\b/i
        },
        {
          value: PHP.Constants.T_FN,
          re: /^fn\b/i
        },
        {
          value: PHP.Constants.T_FOR,
          re: /^for\b/i
        },
        {
          value: PHP.Constants.T_FOREACH,
          re: /^foreach\b/i
        },
        {
          value: PHP.Constants.T_FUNCTION,
          re: /^function\b/i
        },
        {
          value: PHP.Constants.T_GLOBAL,
          re: /^global\b/i
        },
        {
          value: PHP.Constants.T_GOTO,
          re: /^goto\b/i
        },
        {
          value: PHP.Constants.T_IF,
          re: /^if\b/i
        },
        {
          value: PHP.Constants.T_IMPLEMENTS,
          re: /^implements\b/i
        },
        {
          value: PHP.Constants.T_INCLUDE,
          re: /^include\b/i
        },
        {
          value: PHP.Constants.T_INCLUDE_ONCE,
          re: /^include_once\b/i
        },
        {
          value: PHP.Constants.T_INSTANCEOF,
          re: /^instanceof\b/i
        },
        {
          value: PHP.Constants.T_INSTEADOF,
          re: /^insteadof\b/i
        },
        {
          value: PHP.Constants.T_INTERFACE,
          re: /^interface\b/i
        },
        {
          value: PHP.Constants.T_ISSET,
          re: /^isset\b/i
        },
        {
          value: PHP.Constants.T_LIST,
          re: /^list\b/i
        },
        {
          value: PHP.Constants.T_MATCH,
          re: /^match\b/i
        },
        {
          value: PHP.Constants.T_NEW,
          re: /^new\b/i
        },
        {
          value: PHP.Constants.T_LOGICAL_OR,
          re: /^or\b/i
        },
        {
          value: PHP.Constants.T_PRINT,
          re: /^print\b/i
        },
        {
          value: PHP.Constants.T_PRIVATE,
          re: /^private\b/i
        },
        {
          value: PHP.Constants.T_PROTECTED,
          re: /^protected\b/i
        },
        {
          value: PHP.Constants.T_PUBLIC,
          re: /^public\b/i
        },
        {
          value: PHP.Constants.T_READONLY,
          re: /^readonly\b/i
        },
        {
          value: PHP.Constants.T_REQUIRE,
          re: /^require\b/i
        },
        {
          value: PHP.Constants.T_REQUIRE_ONCE,
          re: /^require_once\b/i
        },
        {
          value: PHP.Constants.T_STATIC,
          re: /^static\b/i
        },
        {
          value: PHP.Constants.T_SWITCH,
          re: /^switch\b/i
        },
        {
          value: PHP.Constants.T_THROW,
          re: /^throw\b/i
        },
        {
          value: PHP.Constants.T_TRAIT,
          re: /^trait\b/i
        },
        {
          value: PHP.Constants.T_TRY,
          re: /^try\b/i
        },
        {
          value: PHP.Constants.T_UNSET,
          re: /^unset\b/i
        },
        {
          value: PHP.Constants.T_USE,
          re: /^use\b/i
        },
        {
          value: PHP.Constants.T_VAR,
          re: /^var\b/i
        },
        {
          value: PHP.Constants.T_WHILE,
          re: /^while\b/i
        },
        {
          value: PHP.Constants.T_LOGICAL_XOR,
          re: /^xor\b/i
        },
        {
          value: PHP.Constants.T_YIELD_FROM,
          re: /^yield\s+from\b/i
        },
        {
          value: PHP.Constants.T_YIELD,
          re: /^yield\b/i
        },
        {
          value: PHP.Constants.T_RETURN,
          re: /^return\b/i
        },
        {
          value: PHP.Constants.T_METHOD_C,
          re: /^__METHOD__\b/i
        },
        {
          value: PHP.Constants.T_LINE,
          re: /^__LINE__\b/i
        },
        {
          value: PHP.Constants.T_FILE,
          re: /^__FILE__\b/i
        },
        {
          value: PHP.Constants.T_FUNC_C,
          re: /^__FUNCTION__\b/i
        },
        {
          value: PHP.Constants.T_NS_C,
          re: /^__NAMESPACE__\b/i
        },
        {
          value: PHP.Constants.T_TRAIT_C,
          re: /^__TRAIT__\b/i
        },
        {
          value: PHP.Constants.T_DIR,
          re: /^__DIR__\b/i
        },
        {
          value: PHP.Constants.T_CLASS_C,
          re: /^__CLASS__\b/i
        },
        // Other tokens
        {
          value: PHP.Constants.T_AND_EQUAL,
          re: /^&=/
        },
        {
          value: PHP.Constants.T_ARRAY_CAST,
          re: /^\([ \t]*array[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_BOOL_CAST,
          re: /^\([ \t]*(?:bool|boolean)[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_DOUBLE_CAST,
          re: /^\([ \t]*(?:real|float|double)[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_INT_CAST,
          re: /^\([ \t]*(?:int|integer)[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_OBJECT_CAST,
          re: /^\([ \t]*object[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_STRING_CAST,
          re: /^\([ \t]*(?:binary|string)[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_UNSET_CAST,
          re: /^\([ \t]*unset[ \t]*\)/i
        },
        {
          value: PHP.Constants.T_BOOLEAN_AND,
          re: /^&&/
        },
        {
          value: PHP.Constants.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG,
          re: /^&(?=[$])/
        },
        {
          value: PHP.Constants.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG,
          re: /^(&)(?=[^\$|^&])/
        },
        {
          value: PHP.Constants.T_BOOLEAN_OR,
          re: /^\|\|/
        },
        {
          value: PHP.Constants.T_CLOSE_TAG,
          re: /^(?:\?>|<\/script>)(\r\n|\r|\n)?/i,
          func: function() {
            swapState("INITIAL");
          }
        },
        {
          value: PHP.Constants.T_DOUBLE_ARROW,
          re: /^=>/
        },
        {
          value: PHP.Constants.T_PAAMAYIM_NEKUDOTAYIM,
          re: /^::/
        },
        {
          value: PHP.Constants.T_INC,
          re: /^\+\+/
        },
        {
          value: PHP.Constants.T_DEC,
          re: /^--/
        },
        {
          value: PHP.Constants.T_CONCAT_EQUAL,
          re: /^\.=/
        },
        {
          value: PHP.Constants.T_DIV_EQUAL,
          re: /^\/=/
        },
        {
          value: PHP.Constants.T_XOR_EQUAL,
          re: /^\^=/
        },
        {
          value: PHP.Constants.T_MUL_EQUAL,
          re: /^\*=/
        },
        {
          value: PHP.Constants.T_MOD_EQUAL,
          re: /^%=/
        },
        {
          value: PHP.Constants.T_SL_EQUAL,
          re: /^<<=/
        },
        {
          value: PHP.Constants.T_START_HEREDOC,
          re: new RegExp("^[bB]?<<<[ \\t]*'(" + labelRegexPart + ")'(?:\\r\\n|\\r|\\n)"),
          func: function(result) {
            heredoc = result[1];
            swapState("NOWDOC");
          }
        },
        {
          value: PHP.Constants.T_START_HEREDOC,
          re: new RegExp('^[bB]?<<<[ \\t]*("?)(' + labelRegexPart + ")\\1(?:\\r\\n|\\r|\\n)"),
          func: function(result) {
            heredoc = result[2];
            heredocEndAllowed = true;
            swapState("HEREDOC");
          }
        },
        {
          value: PHP.Constants.T_SL,
          re: /^<</
        },
        {
          value: PHP.Constants.T_SPACESHIP,
          re: /^<=>/
        },
        {
          value: PHP.Constants.T_IS_SMALLER_OR_EQUAL,
          re: /^<=/
        },
        {
          value: PHP.Constants.T_SR_EQUAL,
          re: /^>>=/
        },
        {
          value: PHP.Constants.T_SR,
          re: /^>>/
        },
        {
          value: PHP.Constants.T_IS_GREATER_OR_EQUAL,
          re: /^>=/
        },
        {
          value: PHP.Constants.T_OR_EQUAL,
          re: /^\|=/
        },
        {
          value: PHP.Constants.T_PLUS_EQUAL,
          re: /^\+=/
        },
        {
          value: PHP.Constants.T_MINUS_EQUAL,
          re: /^-=/
        },
        {
          value: PHP.Constants.T_OBJECT_OPERATOR,
          re: new RegExp("^->(?=[ \n\r	]*" + labelRegexPart + ")"),
          func: function() {
            pushState("LOOKING_FOR_PROPERTY");
          }
        },
        {
          value: PHP.Constants.T_OBJECT_OPERATOR,
          re: /^->/i
        },
        {
          value: PHP.Constants.T_ELLIPSIS,
          re: /^\.\.\./
        },
        {
          value: PHP.Constants.T_POW_EQUAL,
          re: /^\*\*=/
        },
        {
          value: PHP.Constants.T_POW,
          re: /^\*\*/
        },
        {
          value: PHP.Constants.T_COALESCE_EQUAL,
          re: /^\?\?=/
        },
        {
          value: PHP.Constants.T_COALESCE,
          re: /^\?\?/
        },
        {
          value: PHP.Constants.T_NULLSAFE_OBJECT_OPERATOR,
          re: /^\?->/
        },
        {
          value: PHP.Constants.T_NAME_FULLY_QUALIFIED,
          re: /^\\\w+(?:\\\w+)*/
        },
        {
          value: PHP.Constants.T_NAME_QUALIFIED,
          re: /^\w+\\\w+(?:\\\w+)*/
        },
        {
          value: PHP.Constants.T_NAME_RELATIVE,
          re: /^namespace\\\w+(?:\\\w+)*/
        },
        {
          value: PHP.Constants.T_NAMESPACE,
          re: /^namespace\b/i
        },
        {
          value: PHP.Constants.T_ATTRIBUTE,
          re: /^#\[([\S\s]*?)]/
        },
        {
          value: PHP.Constants.T_COMMENT,
          re: /^\/\*([\S\s]*?)(?:\*\/|$)/
        },
        {
          value: PHP.Constants.T_COMMENT,
          re: /^(?:\/\/|#)[^\r\n?]*(?:\?(?!>)[^\r\n?]*)*(?:\r\n|\r|\n)?/
        },
        {
          value: PHP.Constants.T_IS_IDENTICAL,
          re: /^===/
        },
        {
          value: PHP.Constants.T_IS_EQUAL,
          re: /^==/
        },
        {
          value: PHP.Constants.T_IS_NOT_IDENTICAL,
          re: /^!==/
        },
        {
          value: PHP.Constants.T_IS_NOT_EQUAL,
          re: /^(!=|<>)/
        },
        {
          value: PHP.Constants.T_DNUMBER,
          re: /^(?:[0-9]+\.[0-9]*|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/
        },
        {
          value: PHP.Constants.T_DNUMBER,
          re: /^[0-9]+[eE][+-]?[0-9]+/
        },
        {
          value: PHP.Constants.T_LNUMBER,
          re: /^(?:0x[0-9A-F]+|0b[01]+|[0-9]+)/i
        },
        {
          value: PHP.Constants.T_VARIABLE,
          re: new RegExp("^\\$" + labelRegexPart)
        },
        {
          value: PHP.Constants.T_CONSTANT_ENCAPSED_STRING,
          re: /^[bB]?'[^'\\]*(?:\\[\s\S][^'\\]*)*'/
        },
        {
          value: PHP.Constants.T_CONSTANT_ENCAPSED_STRING,
          re: new RegExp('^[bB]?"' + stringRegexPart('"') + '"')
        },
        {
          value: -1,
          re: /^[bB]?"/,
          func: function() {
            swapState("DOUBLE_QUOTES");
          }
        },
        {
          value: -1,
          re: /^`/,
          func: function() {
            swapState("BACKTICKS");
          }
        },
        {
          value: PHP.Constants.T_NS_SEPARATOR,
          re: /^\\/
        },
        {
          value: PHP.Constants.T_STRING,
          re: /^[a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*/
        },
        {
          value: -1,
          re: /^\{/,
          func: function() {
            pushState("IN_SCRIPTING");
          }
        },
        {
          value: -1,
          re: /^\}/,
          func: function() {
            if (stackPos > 0) {
              popState();
            }
          }
        },
        {
          value: -1,
          re: /^[\[\];:?()!.,><=+-/*|&@^%"'$~]/
        }
      ],
      "DOUBLE_QUOTES": sharedStringTokens.concat([
        {
          value: -1,
          re: /^"/,
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
          re: new RegExp("^" + stringRegexPart('"'))
        }
      ]),
      "BACKTICKS": sharedStringTokens.concat([
        {
          value: -1,
          re: /^`/,
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
          re: new RegExp("^" + stringRegexPart("`"))
        }
      ]),
      "VAR_OFFSET": [
        {
          value: -1,
          re: /^\]/,
          func: function() {
            popState();
          }
        },
        {
          value: PHP.Constants.T_NUM_STRING,
          re: /^(?:0x[0-9A-F]+|0b[01]+|[0-9]+)/i
        },
        {
          value: PHP.Constants.T_VARIABLE,
          re: new RegExp("^\\$" + labelRegexPart)
        },
        {
          value: PHP.Constants.T_STRING,
          re: new RegExp("^" + labelRegexPart)
        },
        {
          value: -1,
          re: /^[;:,.\[()|^&+-/*=%!~$<>?@{}"`]/
        }
      ],
      "LOOKING_FOR_PROPERTY": [
        {
          value: PHP.Constants.T_OBJECT_OPERATOR,
          re: /^->/
        },
        {
          value: PHP.Constants.T_STRING,
          re: new RegExp("^" + labelRegexPart),
          func: function() {
            popState();
          }
        },
        {
          value: PHP.Constants.T_WHITESPACE,
          re: /^[ \n\r\t]+/
        }
      ],
      "LOOKING_FOR_VARNAME": [
        {
          value: PHP.Constants.T_STRING_VARNAME,
          re: new RegExp("^" + labelRegexPart + "(?=[\\[}])"),
          func: function() {
            swapState("IN_SCRIPTING");
          }
        }
      ],
      "NOWDOC": [
        {
          value: PHP.Constants.T_END_HEREDOC,
          matchFunc: function(src2) {
            var re = new RegExp("^" + heredoc + "(?=;?[\\r\\n])");
            if (src2.match(re)) {
              return [src2.substr(0, heredoc.length)];
            } else {
              return null;
            }
          },
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
          matchFunc: function(src2) {
            var re = new RegExp("[\\r\\n]" + heredoc + "(?=;?[\\r\\n])");
            var result = re.exec(src2);
            var end = result ? result.index + 1 : src2.length;
            return [src2.substring(0, end)];
          }
        }
      ],
      "HEREDOC": sharedStringTokens.concat([
        {
          value: PHP.Constants.T_END_HEREDOC,
          matchFunc: function(src2) {
            if (!heredocEndAllowed) {
              return null;
            }
            var re = new RegExp("^" + heredoc + "(?=;?[\\r\\n])");
            if (src2.match(re)) {
              return [src2.substr(0, heredoc.length)];
            } else {
              return null;
            }
          },
          func: function() {
            swapState("IN_SCRIPTING");
          }
        },
        {
          value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
          matchFunc: function(src2) {
            var end = src2.length;
            var re = new RegExp("^" + stringRegexPart(""));
            var result = re.exec(src2);
            if (result) {
              end = result[0].length;
            }
            re = new RegExp("([\\r\\n])" + heredoc + "(?=;?[\\r\\n])");
            result = re.exec(src2.substring(0, end));
            if (result) {
              end = result.index + 1;
              heredocEndAllowed = true;
            } else {
              heredocEndAllowed = false;
            }
            if (end == 0) {
              return null;
            }
            return [src2.substring(0, end)];
          }
        }
      ])
    };
    var results = [], line = 1, cancel = true;
    if (src === null) {
      return results;
    }
    if (typeof src !== "string") {
      src = src.toString();
    }
    while (src.length > 0 && cancel === true) {
      var state = stateStack[stackPos];
      var tokens = data[state];
      cancel = tokens.some(function(token) {
        var result = token.matchFunc !== void 0 ? token.matchFunc(src) : src.match(token.re);
        if (result !== null) {
          if (result[0].length == 0) {
            throw new Error("empty match");
          }
          if (token.func !== void 0) {
            token.func(result);
          }
          if (token.value === -1) {
            results.push(result[0]);
          } else {
            var resultString = result[0];
            results.push([
              parseInt(token.value, 10),
              resultString,
              line
            ]);
            line += resultString.split("\n").length - 1;
          }
          src = src.substring(result[0].length);
          return true;
        }
        return false;
      });
    }
    return results;
  };
  PHP.Parser = function(preprocessedTokens, evaluate) {
    var yybase = this.yybase, yydefault = this.yydefault, yycheck = this.yycheck, yyaction = this.yyaction, yylen = this.yylen, yygbase = this.yygbase, yygcheck = this.yygcheck, yyp = this.yyp, yygoto = this.yygoto, yylhs = this.yylhs, terminals = this.terminals, translate = this.translate, yygdefault = this.yygdefault;
    this.pos = -1;
    this.line = 1;
    this.tokenMap = this.createTokenMap();
    this.dropTokens = {};
    this.dropTokens[PHP.Constants.T_WHITESPACE] = 1;
    this.dropTokens[PHP.Constants.T_OPEN_TAG] = 1;
    var tokens = [];
    preprocessedTokens.forEach(function(token, index) {
      if (typeof token === "object" && token[0] === PHP.Constants.T_OPEN_TAG_WITH_ECHO) {
        tokens.push([
          PHP.Constants.T_OPEN_TAG,
          token[1],
          token[2]
        ]);
        tokens.push([
          PHP.Constants.T_ECHO,
          token[1],
          token[2]
        ]);
      } else {
        tokens.push(token);
      }
    });
    this.tokens = tokens;
    var tokenId = this.TOKEN_NONE;
    this.startAttributes = {
      "startLine": 1
    };
    this.endAttributes = {};
    var attributeStack = [this.startAttributes];
    var state = 0;
    var stateStack = [state];
    this.yyastk = [];
    this.stackPos = 0;
    var yyn;
    var origTokenId;
    for (; ; ) {
      if (yybase[state] === 0) {
        yyn = yydefault[state];
      } else {
        if (tokenId === this.TOKEN_NONE) {
          origTokenId = this.getNextToken();
          tokenId = origTokenId >= 0 && origTokenId < this.TOKEN_MAP_SIZE ? translate[origTokenId] : this.TOKEN_INVALID;
          attributeStack[this.stackPos] = this.startAttributes;
        }
        if (((yyn = yybase[state] + tokenId) >= 0 && yyn < this.YYLAST && yycheck[yyn] === tokenId || state < this.YY2TBLSTATE && (yyn = yybase[state + this.YYNLSTATES] + tokenId) >= 0 && yyn < this.YYLAST && yycheck[yyn] === tokenId) && (yyn = yyaction[yyn]) !== this.YYDEFAULT) {
          if (yyn > 0) {
            ++this.stackPos;
            stateStack[this.stackPos] = state = yyn;
            this.yyastk[this.stackPos] = this.tokenValue;
            attributeStack[this.stackPos] = this.startAttributes;
            tokenId = this.TOKEN_NONE;
            if (yyn < this.YYNLSTATES) continue;
            yyn -= this.YYNLSTATES;
          } else {
            yyn = -yyn;
          }
        } else {
          yyn = yydefault[state];
        }
      }
      for (; ; ) {
        if (yyn === 0) {
          return this.yyval;
        } else if (yyn !== this.YYUNEXPECTED) {
          for (var attr in this.endAttributes) {
            attributeStack[this.stackPos - yylen[yyn]][attr] = this.endAttributes[attr];
          }
          this.stackPos -= yylen[yyn];
          yyn = yylhs[yyn];
          if ((yyp = yygbase[yyn] + stateStack[this.stackPos]) >= 0 && yyp < this.YYGLAST && yygcheck[yyp] === yyn) {
            state = yygoto[yyp];
          } else {
            state = yygdefault[yyn];
          }
          ++this.stackPos;
          stateStack[this.stackPos] = state;
          this.yyastk[this.stackPos] = this.yyval;
          attributeStack[this.stackPos] = this.startAttributes;
        } else {
          if (evaluate !== true) {
            var expected = [];
            for (var i = 0; i < this.TOKEN_MAP_SIZE; ++i) {
              if ((yyn = yybase[state] + i) >= 0 && yyn < this.YYLAST && yycheck[yyn] == i || state < this.YY2TBLSTATE && (yyn = yybase[state + this.YYNLSTATES] + i) && yyn < this.YYLAST && yycheck[yyn] == i) {
                if (yyaction[yyn] != this.YYUNEXPECTED) {
                  if (expected.length == 4) {
                    expected = [];
                    break;
                  }
                  expected.push(this.terminals[i]);
                }
              }
            }
            var expectedString = "";
            if (expected.length) {
              expectedString = ", expecting " + expected.join(" or ");
            }
            throw new PHP.ParseError("syntax error, unexpected " + terminals[tokenId] + expectedString, this.startAttributes["startLine"]);
          } else {
            return this.startAttributes["startLine"];
          }
        }
        if (state < this.YYNLSTATES) break;
        yyn = state - this.YYNLSTATES;
      }
    }
  };
  PHP.ParseError = function(msg, line) {
    this.message = msg;
    this.line = line;
  };
  PHP.Parser.prototype.getNextToken = function() {
    this.startAttributes = {};
    this.endAttributes = {};
    var token, tmp;
    while (this.tokens[++this.pos] !== void 0) {
      token = this.tokens[this.pos];
      if (typeof token === "string") {
        this.startAttributes["startLine"] = this.line;
        this.endAttributes["endLine"] = this.line;
        if ('b"' === token) {
          this.tokenValue = 'b"';
          return '"'.charCodeAt(0);
        } else {
          this.tokenValue = token;
          return token.charCodeAt(0);
        }
      } else {
        this.line += (tmp = token[1].match(/\n/g)) === null ? 0 : tmp.length;
        if (PHP.Constants.T_COMMENT === token[0]) {
          if (!Array.isArray(this.startAttributes["comments"])) {
            this.startAttributes["comments"] = [];
          }
          this.startAttributes["comments"].push({
            type: "comment",
            comment: token[1],
            line: token[2]
          });
        } else if (PHP.Constants.T_ATTRIBUTE === token[0]) {
          this.tokenValue = token[1];
          this.startAttributes["startLine"] = token[2];
          this.endAttributes["endLine"] = this.line;
        } else if (PHP.Constants.T_DOC_COMMENT === token[0]) {
          this.startAttributes["comments"].push(new PHPParser_Comment_Doc(token[1], token[2]));
        } else if (this.dropTokens[token[0]] === void 0) {
          this.tokenValue = token[1];
          this.startAttributes["startLine"] = token[2];
          this.endAttributes["endLine"] = this.line;
          return this.tokenMap[token[0]];
        }
      }
    }
    this.startAttributes["startLine"] = this.line;
    return 0;
  };
  PHP.Parser.prototype.tokenName = function(token) {
    var constants = [
      "T_THROW",
      "T_INCLUDE",
      "T_INCLUDE_ONCE",
      "T_EVAL",
      "T_REQUIRE",
      "T_REQUIRE_ONCE",
      "T_LOGICAL_OR",
      "T_LOGICAL_XOR",
      "T_LOGICAL_AND",
      "T_PRINT",
      "T_YIELD",
      "T_DOUBLE_ARROW",
      "T_YIELD_FROM",
      "T_PLUS_EQUAL",
      "T_MINUS_EQUAL",
      "T_MUL_EQUAL",
      "T_DIV_EQUAL",
      "T_CONCAT_EQUAL",
      "T_MOD_EQUAL",
      "T_AND_EQUAL",
      "T_OR_EQUAL",
      "T_XOR_EQUAL",
      "T_SL_EQUAL",
      "T_SR_EQUAL",
      "T_POW_EQUAL",
      "T_COALESCE_EQUAL",
      "T_COALESCE",
      "T_BOOLEAN_OR",
      "T_BOOLEAN_AND",
      "T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG",
      "T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG",
      "T_IS_EQUAL",
      "T_IS_NOT_EQUAL",
      "T_IS_IDENTICAL",
      "T_IS_NOT_IDENTICAL",
      "T_SPACESHIP",
      "T_IS_SMALLER_OR_EQUAL",
      "T_IS_GREATER_OR_EQUAL",
      "T_SL",
      "T_SR",
      "T_INSTANCEOF",
      "T_INC",
      "T_DEC",
      "T_INT_CAST",
      "T_DOUBLE_CAST",
      "T_STRING_CAST",
      "T_ARRAY_CAST",
      "T_OBJECT_CAST",
      "T_BOOL_CAST",
      "T_UNSET_CAST",
      "T_POW",
      "T_NEW",
      "T_CLONE",
      "T_EXIT",
      "T_IF",
      "T_ELSEIF",
      "T_ELSE",
      "T_ENDIF",
      "T_LNUMBER",
      "T_DNUMBER",
      "T_STRING",
      "T_STRING_VARNAME",
      "T_VARIABLE",
      "T_NUM_STRING",
      "T_INLINE_HTML",
      "T_ENCAPSED_AND_WHITESPACE",
      "T_CONSTANT_ENCAPSED_STRING",
      "T_ECHO",
      "T_DO",
      "T_WHILE",
      "T_ENDWHILE",
      "T_FOR",
      "T_ENDFOR",
      "T_FOREACH",
      "T_ENDFOREACH",
      "T_DECLARE",
      "T_ENDDECLARE",
      "T_AS",
      "T_SWITCH",
      "T_MATCH",
      "T_ENDSWITCH",
      "T_CASE",
      "T_DEFAULT",
      "T_BREAK",
      "T_CONTINUE",
      "T_GOTO",
      "T_FUNCTION",
      "T_FN",
      "T_CONST",
      "T_RETURN",
      "T_TRY",
      "T_CATCH",
      "T_FINALLY",
      "T_THROW",
      "T_USE",
      "T_INSTEADOF",
      "T_GLOBAL",
      "T_STATIC",
      "T_ABSTRACT",
      "T_FINAL",
      "T_PRIVATE",
      "T_PROTECTED",
      "T_PUBLIC",
      "T_READONLY",
      "T_VAR",
      "T_UNSET",
      "T_ISSET",
      "T_EMPTY",
      "T_HALT_COMPILER",
      "T_CLASS",
      "T_TRAIT",
      "T_INTERFACE",
      "T_ENUM",
      "T_EXTENDS",
      "T_IMPLEMENTS",
      "T_OBJECT_OPERATOR",
      "T_NULLSAFE_OBJECT_OPERATOR",
      "T_DOUBLE_ARROW",
      "T_LIST",
      "T_ARRAY",
      "T_CALLABLE",
      "T_CLASS_C",
      "T_TRAIT_C",
      "T_METHOD_C",
      "T_FUNC_C",
      "T_LINE",
      "T_FILE",
      "T_START_HEREDOC",
      "T_END_HEREDOC",
      "T_DOLLAR_OPEN_CURLY_BRACES",
      "T_CURLY_OPEN",
      "T_PAAMAYIM_NEKUDOTAYIM",
      "T_NAMESPACE",
      "T_NS_C",
      "T_DIR",
      "T_NS_SEPARATOR",
      "T_ELLIPSIS",
      "T_NAME_FULLY_QUALIFIED",
      "T_NAME_QUALIFIED",
      "T_NAME_RELATIVE",
      "T_ATTRIBUTE",
      "T_ENUM",
      "T_BAD_CHARACTER",
      "T_COMMENT",
      "T_DOC_COMMENT",
      "T_OPEN_TAG",
      "T_OPEN_TAG_WITH_ECHO",
      "T_CLOSE_TAG",
      "T_WHITESPACE"
    ];
    var current = "UNKNOWN";
    constants.some(function(constant) {
      if (PHP.Constants[constant] === token) {
        current = constant;
        return true;
      } else {
        return false;
      }
    });
    return current;
  };
  PHP.Parser.prototype.createTokenMap = function() {
    var tokenMap = {}, name, i;
    for (i = 256; i < 1e3; ++i) {
      if (PHP.Constants.T_OPEN_TAG_WITH_ECHO === i) {
        tokenMap[i] = PHP.Constants.T_ECHO;
      } else if (PHP.Constants.T_CLOSE_TAG === i) {
        tokenMap[i] = 59;
      } else if ("UNKNOWN" !== (name = this.tokenName(i))) {
        tokenMap[i] = this[name];
      }
    }
    return tokenMap;
  };
  PHP.Parser.prototype.TOKEN_NONE = -1;
  PHP.Parser.prototype.TOKEN_INVALID = 175;
  PHP.Parser.prototype.TOKEN_MAP_SIZE = 403;
  PHP.Parser.prototype.YYLAST = 1196;
  PHP.Parser.prototype.YY2TBLSTATE = 420;
  PHP.Parser.prototype.YYGLAST = 545;
  PHP.Parser.prototype.YYNLSTATES = 710;
  PHP.Parser.prototype.YYUNEXPECTED = 32767;
  PHP.Parser.prototype.YYDEFAULT = -32766;
  PHP.Parser.prototype.YYERRTOK = 256;
  PHP.Parser.prototype.T_THROW = 257;
  PHP.Parser.prototype.T_INCLUDE = 258;
  PHP.Parser.prototype.T_INCLUDE_ONCE = 259;
  PHP.Parser.prototype.T_EVAL = 260;
  PHP.Parser.prototype.T_REQUIRE = 261;
  PHP.Parser.prototype.T_REQUIRE_ONCE = 262;
  PHP.Parser.prototype.T_LOGICAL_OR = 263;
  PHP.Parser.prototype.T_LOGICAL_XOR = 264;
  PHP.Parser.prototype.T_LOGICAL_AND = 265;
  PHP.Parser.prototype.T_PRINT = 266;
  PHP.Parser.prototype.T_YIELD = 267;
  PHP.Parser.prototype.T_DOUBLE_ARROW = 268;
  PHP.Parser.prototype.T_YIELD_FROM = 269;
  PHP.Parser.prototype.T_PLUS_EQUAL = 270;
  PHP.Parser.prototype.T_MINUS_EQUAL = 271;
  PHP.Parser.prototype.T_MUL_EQUAL = 272;
  PHP.Parser.prototype.T_DIV_EQUAL = 273;
  PHP.Parser.prototype.T_CONCAT_EQUAL = 274;
  PHP.Parser.prototype.T_MOD_EQUAL = 275;
  PHP.Parser.prototype.T_AND_EQUAL = 276;
  PHP.Parser.prototype.T_OR_EQUAL = 277;
  PHP.Parser.prototype.T_XOR_EQUAL = 278;
  PHP.Parser.prototype.T_SL_EQUAL = 279;
  PHP.Parser.prototype.T_SR_EQUAL = 280;
  PHP.Parser.prototype.T_POW_EQUAL = 281;
  PHP.Parser.prototype.T_COALESCE_EQUAL = 282;
  PHP.Parser.prototype.T_COALESCE = 283;
  PHP.Parser.prototype.T_BOOLEAN_OR = 284;
  PHP.Parser.prototype.T_BOOLEAN_AND = 285;
  PHP.Parser.prototype.T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG = 286;
  PHP.Parser.prototype.T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG = 287;
  PHP.Parser.prototype.T_IS_EQUAL = 288;
  PHP.Parser.prototype.T_IS_NOT_EQUAL = 289;
  PHP.Parser.prototype.T_IS_IDENTICAL = 290;
  PHP.Parser.prototype.T_IS_NOT_IDENTICAL = 291;
  PHP.Parser.prototype.T_SPACESHIP = 292;
  PHP.Parser.prototype.T_IS_SMALLER_OR_EQUAL = 293;
  PHP.Parser.prototype.T_IS_GREATER_OR_EQUAL = 294;
  PHP.Parser.prototype.T_SL = 295;
  PHP.Parser.prototype.T_SR = 296;
  PHP.Parser.prototype.T_INSTANCEOF = 297;
  PHP.Parser.prototype.T_INC = 298;
  PHP.Parser.prototype.T_DEC = 299;
  PHP.Parser.prototype.T_INT_CAST = 300;
  PHP.Parser.prototype.T_DOUBLE_CAST = 301;
  PHP.Parser.prototype.T_STRING_CAST = 302;
  PHP.Parser.prototype.T_ARRAY_CAST = 303;
  PHP.Parser.prototype.T_OBJECT_CAST = 304;
  PHP.Parser.prototype.T_BOOL_CAST = 305;
  PHP.Parser.prototype.T_UNSET_CAST = 306;
  PHP.Parser.prototype.T_POW = 307;
  PHP.Parser.prototype.T_NEW = 308;
  PHP.Parser.prototype.T_CLONE = 309;
  PHP.Parser.prototype.T_EXIT = 310;
  PHP.Parser.prototype.T_IF = 311;
  PHP.Parser.prototype.T_ELSEIF = 312;
  PHP.Parser.prototype.T_ELSE = 313;
  PHP.Parser.prototype.T_ENDIF = 314;
  PHP.Parser.prototype.T_LNUMBER = 315;
  PHP.Parser.prototype.T_DNUMBER = 316;
  PHP.Parser.prototype.T_STRING = 317;
  PHP.Parser.prototype.T_STRING_VARNAME = 318;
  PHP.Parser.prototype.T_VARIABLE = 319;
  PHP.Parser.prototype.T_NUM_STRING = 320;
  PHP.Parser.prototype.T_INLINE_HTML = 321;
  PHP.Parser.prototype.T_ENCAPSED_AND_WHITESPACE = 322;
  PHP.Parser.prototype.T_CONSTANT_ENCAPSED_STRING = 323;
  PHP.Parser.prototype.T_ECHO = 324;
  PHP.Parser.prototype.T_DO = 325;
  PHP.Parser.prototype.T_WHILE = 326;
  PHP.Parser.prototype.T_ENDWHILE = 327;
  PHP.Parser.prototype.T_FOR = 328;
  PHP.Parser.prototype.T_ENDFOR = 329;
  PHP.Parser.prototype.T_FOREACH = 330;
  PHP.Parser.prototype.T_ENDFOREACH = 331;
  PHP.Parser.prototype.T_DECLARE = 332;
  PHP.Parser.prototype.T_ENDDECLARE = 333;
  PHP.Parser.prototype.T_AS = 334;
  PHP.Parser.prototype.T_SWITCH = 335;
  PHP.Parser.prototype.T_MATCH = 336;
  PHP.Parser.prototype.T_ENDSWITCH = 337;
  PHP.Parser.prototype.T_CASE = 338;
  PHP.Parser.prototype.T_DEFAULT = 339;
  PHP.Parser.prototype.T_BREAK = 340;
  PHP.Parser.prototype.T_CONTINUE = 341;
  PHP.Parser.prototype.T_GOTO = 342;
  PHP.Parser.prototype.T_FUNCTION = 343;
  PHP.Parser.prototype.T_FN = 344;
  PHP.Parser.prototype.T_CONST = 345;
  PHP.Parser.prototype.T_RETURN = 346;
  PHP.Parser.prototype.T_TRY = 347;
  PHP.Parser.prototype.T_CATCH = 348;
  PHP.Parser.prototype.T_FINALLY = 349;
  PHP.Parser.prototype.T_USE = 350;
  PHP.Parser.prototype.T_INSTEADOF = 351;
  PHP.Parser.prototype.T_GLOBAL = 352;
  PHP.Parser.prototype.T_STATIC = 353;
  PHP.Parser.prototype.T_ABSTRACT = 354;
  PHP.Parser.prototype.T_FINAL = 355;
  PHP.Parser.prototype.T_PRIVATE = 356;
  PHP.Parser.prototype.T_PROTECTED = 357;
  PHP.Parser.prototype.T_PUBLIC = 358;
  PHP.Parser.prototype.T_READONLY = 359;
  PHP.Parser.prototype.T_VAR = 360;
  PHP.Parser.prototype.T_UNSET = 361;
  PHP.Parser.prototype.T_ISSET = 362;
  PHP.Parser.prototype.T_EMPTY = 363;
  PHP.Parser.prototype.T_HALT_COMPILER = 364;
  PHP.Parser.prototype.T_CLASS = 365;
  PHP.Parser.prototype.T_TRAIT = 366;
  PHP.Parser.prototype.T_INTERFACE = 367;
  PHP.Parser.prototype.T_ENUM = 368;
  PHP.Parser.prototype.T_EXTENDS = 369;
  PHP.Parser.prototype.T_IMPLEMENTS = 370;
  PHP.Parser.prototype.T_OBJECT_OPERATOR = 371;
  PHP.Parser.prototype.T_NULLSAFE_OBJECT_OPERATOR = 372;
  PHP.Parser.prototype.T_LIST = 373;
  PHP.Parser.prototype.T_ARRAY = 374;
  PHP.Parser.prototype.T_CALLABLE = 375;
  PHP.Parser.prototype.T_CLASS_C = 376;
  PHP.Parser.prototype.T_TRAIT_C = 377;
  PHP.Parser.prototype.T_METHOD_C = 378;
  PHP.Parser.prototype.T_FUNC_C = 379;
  PHP.Parser.prototype.T_LINE = 380;
  PHP.Parser.prototype.T_FILE = 381;
  PHP.Parser.prototype.T_START_HEREDOC = 382;
  PHP.Parser.prototype.T_END_HEREDOC = 383;
  PHP.Parser.prototype.T_DOLLAR_OPEN_CURLY_BRACES = 384;
  PHP.Parser.prototype.T_CURLY_OPEN = 385;
  PHP.Parser.prototype.T_PAAMAYIM_NEKUDOTAYIM = 386;
  PHP.Parser.prototype.T_NAMESPACE = 387;
  PHP.Parser.prototype.T_NS_C = 388;
  PHP.Parser.prototype.T_DIR = 389;
  PHP.Parser.prototype.T_NS_SEPARATOR = 390;
  PHP.Parser.prototype.T_ELLIPSIS = 391;
  PHP.Parser.prototype.T_NAME_FULLY_QUALIFIED = 392;
  PHP.Parser.prototype.T_NAME_QUALIFIED = 393;
  PHP.Parser.prototype.T_NAME_RELATIVE = 394;
  PHP.Parser.prototype.T_ATTRIBUTE = 395;
  PHP.Parser.prototype.T_BAD_CHARACTER = 396;
  PHP.Parser.prototype.T_COMMENT = 397;
  PHP.Parser.prototype.T_DOC_COMMENT = 398;
  PHP.Parser.prototype.T_OPEN_TAG = 399;
  PHP.Parser.prototype.T_OPEN_TAG_WITH_ECHO = 400;
  PHP.Parser.prototype.T_CLOSE_TAG = 401;
  PHP.Parser.prototype.T_WHITESPACE = 402;
  PHP.Parser.prototype.terminals = [
    "EOF",
    "error",
    "T_THROW",
    "T_INCLUDE",
    "T_INCLUDE_ONCE",
    "T_EVAL",
    "T_REQUIRE",
    "T_REQUIRE_ONCE",
    "','",
    "T_LOGICAL_OR",
    "T_LOGICAL_XOR",
    "T_LOGICAL_AND",
    "T_PRINT",
    "T_YIELD",
    "T_DOUBLE_ARROW",
    "T_YIELD_FROM",
    "'='",
    "T_PLUS_EQUAL",
    "T_MINUS_EQUAL",
    "T_MUL_EQUAL",
    "T_DIV_EQUAL",
    "T_CONCAT_EQUAL",
    "T_MOD_EQUAL",
    "T_AND_EQUAL",
    "T_OR_EQUAL",
    "T_XOR_EQUAL",
    "T_SL_EQUAL",
    "T_SR_EQUAL",
    "T_POW_EQUAL",
    "T_COALESCE_EQUAL",
    "'?'",
    "':'",
    "T_COALESCE",
    "T_BOOLEAN_OR",
    "T_BOOLEAN_AND",
    "'|'",
    "'^'",
    "T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG",
    "T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG",
    "T_IS_EQUAL",
    "T_IS_NOT_EQUAL",
    "T_IS_IDENTICAL",
    "T_IS_NOT_IDENTICAL",
    "T_SPACESHIP",
    "'<'",
    "T_IS_SMALLER_OR_EQUAL",
    "'>'",
    "T_IS_GREATER_OR_EQUAL",
    "T_SL",
    "T_SR",
    "'+'",
    "'-'",
    "'.'",
    "'*'",
    "'/'",
    "'%'",
    "'!'",
    "T_INSTANCEOF",
    "'~'",
    "T_INC",
    "T_DEC",
    "T_INT_CAST",
    "T_DOUBLE_CAST",
    "T_STRING_CAST",
    "T_ARRAY_CAST",
    "T_OBJECT_CAST",
    "T_BOOL_CAST",
    "T_UNSET_CAST",
    "'@'",
    "T_POW",
    "'['",
    "T_NEW",
    "T_CLONE",
    "T_EXIT",
    "T_IF",
    "T_ELSEIF",
    "T_ELSE",
    "T_ENDIF",
    "T_LNUMBER",
    "T_DNUMBER",
    "T_STRING",
    "T_STRING_VARNAME",
    "T_VARIABLE",
    "T_NUM_STRING",
    "T_INLINE_HTML",
    "T_ENCAPSED_AND_WHITESPACE",
    "T_CONSTANT_ENCAPSED_STRING",
    "T_ECHO",
    "T_DO",
    "T_WHILE",
    "T_ENDWHILE",
    "T_FOR",
    "T_ENDFOR",
    "T_FOREACH",
    "T_ENDFOREACH",
    "T_DECLARE",
    "T_ENDDECLARE",
    "T_AS",
    "T_SWITCH",
    "T_MATCH",
    "T_ENDSWITCH",
    "T_CASE",
    "T_DEFAULT",
    "T_BREAK",
    "T_CONTINUE",
    "T_GOTO",
    "T_FUNCTION",
    "T_FN",
    "T_CONST",
    "T_RETURN",
    "T_TRY",
    "T_CATCH",
    "T_FINALLY",
    "T_USE",
    "T_INSTEADOF",
    "T_GLOBAL",
    "T_STATIC",
    "T_ABSTRACT",
    "T_FINAL",
    "T_PRIVATE",
    "T_PROTECTED",
    "T_PUBLIC",
    "T_READONLY",
    "T_VAR",
    "T_UNSET",
    "T_ISSET",
    "T_EMPTY",
    "T_HALT_COMPILER",
    "T_CLASS",
    "T_TRAIT",
    "T_INTERFACE",
    "T_ENUM",
    "T_EXTENDS",
    "T_IMPLEMENTS",
    "T_OBJECT_OPERATOR",
    "T_NULLSAFE_OBJECT_OPERATOR",
    "T_LIST",
    "T_ARRAY",
    "T_CALLABLE",
    "T_CLASS_C",
    "T_TRAIT_C",
    "T_METHOD_C",
    "T_FUNC_C",
    "T_LINE",
    "T_FILE",
    "T_START_HEREDOC",
    "T_END_HEREDOC",
    "T_DOLLAR_OPEN_CURLY_BRACES",
    "T_CURLY_OPEN",
    "T_PAAMAYIM_NEKUDOTAYIM",
    "T_NAMESPACE",
    "T_NS_C",
    "T_DIR",
    "T_NS_SEPARATOR",
    "T_ELLIPSIS",
    "T_NAME_FULLY_QUALIFIED",
    "T_NAME_QUALIFIED",
    "T_NAME_RELATIVE",
    "T_ATTRIBUTE",
    "';'",
    "']'",
    "'{'",
    "'}'",
    "'('",
    "')'",
    "'`'",
    `'"'`,
    "'$'",
    "T_BAD_CHARACTER",
    "T_COMMENT",
    "T_DOC_COMMENT",
    "T_OPEN_TAG",
    "T_OPEN_TAG_WITH_ECHO",
    "T_CLOSE_TAG",
    "T_WHITESPACE",
    "???"
  ];
  PHP.Parser.prototype.translate = [
    0,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    56,
    166,
    175,
    167,
    55,
    175,
    175,
    163,
    164,
    53,
    50,
    8,
    51,
    52,
    54,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    31,
    159,
    44,
    16,
    46,
    30,
    68,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    70,
    175,
    160,
    36,
    175,
    165,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    161,
    35,
    162,
    58,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    175,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    32,
    33,
    34,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    45,
    47,
    48,
    49,
    57,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    69,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    156,
    157,
    158,
    168,
    169,
    170,
    171,
    172,
    173,
    174
  ];
  PHP.Parser.prototype.yyaction = [
    132,
    133,
    134,
    569,
    135,
    136,
    0,
    722,
    723,
    724,
    137,
    37,
    834,
    911,
    835,
    469,
    -32766,
    -32766,
    -32766,
    -32767,
    -32767,
    -32767,
    -32767,
    101,
    102,
    103,
    104,
    105,
    1068,
    1069,
    1070,
    1067,
    1066,
    1065,
    1071,
    716,
    715,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32767,
    -32767,
    -32767,
    -32767,
    -32767,
    545,
    546,
    -32766,
    -32766,
    725,
    -32766,
    -32766,
    -32766,
    998,
    999,
    806,
    922,
    447,
    448,
    449,
    370,
    371,
    2,
    267,
    138,
    396,
    729,
    730,
    731,
    732,
    414,
    -32766,
    420,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    990,
    733,
    734,
    735,
    736,
    737,
    738,
    739,
    740,
    741,
    742,
    743,
    763,
    570,
    764,
    765,
    766,
    767,
    755,
    756,
    336,
    337,
    758,
    759,
    744,
    745,
    746,
    748,
    749,
    750,
    346,
    790,
    791,
    792,
    793,
    794,
    795,
    751,
    752,
    571,
    572,
    784,
    775,
    773,
    774,
    787,
    770,
    771,
    283,
    420,
    573,
    574,
    769,
    575,
    576,
    577,
    578,
    579,
    580,
    598,
    -575,
    470,
    14,
    798,
    772,
    581,
    582,
    -575,
    139,
    -32766,
    -32766,
    -32766,
    132,
    133,
    134,
    569,
    135,
    136,
    1017,
    722,
    723,
    724,
    137,
    37,
    1060,
    -32766,
    -32766,
    -32766,
    1303,
    696,
    -32766,
    1304,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    1068,
    1069,
    1070,
    1067,
    1066,
    1065,
    1071,
    -32766,
    716,
    715,
    372,
    371,
    1258,
    -32766,
    -32766,
    -32766,
    -572,
    106,
    107,
    108,
    414,
    270,
    891,
    -572,
    240,
    1193,
    1192,
    1194,
    725,
    -32766,
    -32766,
    -32766,
    1046,
    109,
    -32766,
    -32766,
    -32766,
    -32766,
    986,
    985,
    984,
    987,
    267,
    138,
    396,
    729,
    730,
    731,
    732,
    12,
    -32766,
    420,
    -32766,
    -32766,
    -32766,
    -32766,
    998,
    999,
    733,
    734,
    735,
    736,
    737,
    738,
    739,
    740,
    741,
    742,
    743,
    763,
    570,
    764,
    765,
    766,
    767,
    755,
    756,
    336,
    337,
    758,
    759,
    744,
    745,
    746,
    748,
    749,
    750,
    346,
    790,
    791,
    792,
    793,
    794,
    795,
    751,
    752,
    571,
    572,
    784,
    775,
    773,
    774,
    787,
    770,
    771,
    881,
    321,
    573,
    574,
    769,
    575,
    576,
    577,
    578,
    579,
    580,
    -32766,
    82,
    83,
    84,
    -575,
    772,
    581,
    582,
    -575,
    148,
    747,
    717,
    718,
    719,
    720,
    721,
    1278,
    722,
    723,
    724,
    760,
    761,
    36,
    1277,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    996,
    270,
    150,
    -32766,
    -32766,
    -32766,
    455,
    456,
    81,
    34,
    -264,
    -572,
    1016,
    109,
    320,
    -572,
    893,
    725,
    682,
    803,
    128,
    998,
    999,
    592,
    -32766,
    1044,
    -32766,
    -32766,
    -32766,
    809,
    151,
    726,
    727,
    728,
    729,
    730,
    731,
    732,
    -88,
    1198,
    796,
    278,
    -526,
    283,
    -32766,
    -32766,
    -32766,
    733,
    734,
    735,
    736,
    737,
    738,
    739,
    740,
    741,
    742,
    743,
    763,
    786,
    764,
    765,
    766,
    767,
    755,
    756,
    757,
    785,
    758,
    759,
    744,
    745,
    746,
    748,
    749,
    750,
    789,
    790,
    791,
    792,
    793,
    794,
    795,
    751,
    752,
    753,
    754,
    784,
    775,
    773,
    774,
    787,
    770,
    771,
    144,
    804,
    762,
    768,
    769,
    776,
    777,
    779,
    778,
    780,
    781,
    -314,
    -526,
    -526,
    -193,
    -192,
    772,
    783,
    782,
    49,
    50,
    51,
    500,
    52,
    53,
    239,
    807,
    -526,
    -86,
    54,
    55,
    -111,
    56,
    996,
    253,
    -32766,
    -111,
    800,
    -111,
    -526,
    541,
    -532,
    -352,
    300,
    -352,
    304,
    -111,
    -111,
    -111,
    -111,
    -111,
    -111,
    -111,
    -111,
    998,
    999,
    998,
    999,
    153,
    -32766,
    -32766,
    -32766,
    1191,
    807,
    126,
    306,
    1293,
    57,
    58,
    103,
    104,
    105,
    -111,
    59,
    1218,
    60,
    246,
    247,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    -525,
    27,
    268,
    69,
    436,
    501,
    -328,
    808,
    -86,
    1224,
    1225,
    502,
    1189,
    807,
    1198,
    1230,
    293,
    1222,
    41,
    24,
    503,
    74,
    504,
    953,
    505,
    320,
    506,
    802,
    154,
    507,
    508,
    279,
    684,
    280,
    43,
    44,
    437,
    367,
    366,
    891,
    45,
    509,
    35,
    249,
    -16,
    -566,
    358,
    332,
    318,
    -566,
    1198,
    1193,
    1192,
    1194,
    -527,
    510,
    511,
    512,
    333,
    -524,
    1274,
    48,
    716,
    715,
    -525,
    -525,
    334,
    513,
    514,
    807,
    1212,
    1213,
    1214,
    1215,
    1209,
    1210,
    292,
    360,
    284,
    -525,
    285,
    -314,
    1216,
    1211,
    -193,
    -192,
    1193,
    1192,
    1194,
    293,
    891,
    -525,
    364,
    -531,
    70,
    807,
    316,
    317,
    320,
    31,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    -153,
    -153,
    -153,
    638,
    25,
    -527,
    -527,
    687,
    379,
    881,
    -524,
    -524,
    296,
    297,
    891,
    -153,
    432,
    -153,
    807,
    -153,
    -527,
    -153,
    716,
    715,
    433,
    -524,
    798,
    363,
    -111,
    1105,
    1107,
    365,
    -527,
    434,
    891,
    140,
    435,
    -524,
    954,
    127,
    -524,
    320,
    -111,
    -111,
    688,
    813,
    381,
    -529,
    11,
    834,
    155,
    835,
    867,
    -111,
    -111,
    -111,
    -111,
    47,
    293,
    -32766,
    881,
    654,
    655,
    74,
    689,
    1191,
    1045,
    320,
    708,
    149,
    399,
    157,
    -32766,
    -32766,
    -32766,
    32,
    -32766,
    -79,
    -32766,
    123,
    -32766,
    716,
    715,
    -32766,
    893,
    891,
    682,
    -153,
    -32766,
    -32766,
    -32766,
    716,
    715,
    891,
    -32766,
    -32766,
    124,
    881,
    129,
    74,
    -32766,
    411,
    130,
    320,
    -524,
    -524,
    143,
    141,
    -75,
    -32766,
    158,
    -529,
    -529,
    320,
    27,
    691,
    159,
    881,
    160,
    -524,
    161,
    294,
    295,
    698,
    368,
    369,
    807,
    -73,
    -32766,
    -72,
    1222,
    -524,
    373,
    374,
    1191,
    893,
    -71,
    682,
    -529,
    73,
    -70,
    -32766,
    -32766,
    -32766,
    -69,
    -32766,
    -68,
    -32766,
    125,
    -32766,
    630,
    631,
    -32766,
    -67,
    -66,
    -47,
    -51,
    -32766,
    -32766,
    -32766,
    -18,
    147,
    271,
    -32766,
    -32766,
    277,
    697,
    700,
    881,
    -32766,
    411,
    890,
    893,
    146,
    682,
    282,
    881,
    907,
    -32766,
    281,
    513,
    514,
    286,
    1212,
    1213,
    1214,
    1215,
    1209,
    1210,
    326,
    131,
    145,
    939,
    287,
    682,
    1216,
    1211,
    109,
    270,
    -32766,
    798,
    807,
    -32766,
    662,
    639,
    1191,
    657,
    72,
    675,
    1075,
    317,
    320,
    -32766,
    -32766,
    -32766,
    1305,
    -32766,
    301,
    -32766,
    628,
    -32766,
    431,
    543,
    -32766,
    -32766,
    923,
    555,
    924,
    -32766,
    -32766,
    -32766,
    1229,
    549,
    -32766,
    -32766,
    -32766,
    -4,
    891,
    -490,
    1191,
    -32766,
    411,
    644,
    893,
    299,
    682,
    -32766,
    -32766,
    -32766,
    -32766,
    -32766,
    893,
    -32766,
    682,
    -32766,
    13,
    1231,
    -32766,
    452,
    480,
    645,
    909,
    -32766,
    -32766,
    -32766,
    -32766,
    658,
    -480,
    -32766,
    -32766,
    0,
    1191,
    0,
    0,
    -32766,
    411,
    0,
    298,
    -32766,
    -32766,
    -32766,
    305,
    -32766,
    -32766,
    -32766,
    0,
    -32766,
    0,
    806,
    -32766,
    0,
    0,
    0,
    475,
    -32766,
    -32766,
    -32766,
    -32766,
    0,
    7,
    -32766,
    -32766,
    16,
    1191,
    561,
    596,
    -32766,
    411,
    1219,
    891,
    -32766,
    -32766,
    -32766,
    362,
    -32766,
    -32766,
    -32766,
    818,
    -32766,
    -267,
    881,
    -32766,
    39,
    293,
    0,
    0,
    -32766,
    -32766,
    -32766,
    40,
    705,
    706,
    -32766,
    -32766,
    872,
    963,
    940,
    947,
    -32766,
    411,
    937,
    948,
    365,
    870,
    427,
    891,
    935,
    -32766,
    1049,
    291,
    1244,
    1052,
    1053,
    -111,
    -111,
    1050,
    1051,
    1057,
    -560,
    1262,
    1296,
    633,
    0,
    826,
    -111,
    -111,
    -111,
    -111,
    33,
    315,
    -32766,
    361,
    683,
    686,
    690,
    692,
    1191,
    693,
    694,
    695,
    699,
    685,
    320,
    -32766,
    -32766,
    -32766,
    9,
    -32766,
    702,
    -32766,
    868,
    -32766,
    881,
    1300,
    -32766,
    893,
    1302,
    682,
    -4,
    -32766,
    -32766,
    -32766,
    829,
    828,
    837,
    -32766,
    -32766,
    916,
    -242,
    -242,
    -242,
    -32766,
    411,
    955,
    365,
    27,
    836,
    1301,
    915,
    917,
    -32766,
    914,
    1177,
    900,
    910,
    -111,
    -111,
    807,
    881,
    898,
    945,
    1222,
    946,
    1299,
    1256,
    867,
    -111,
    -111,
    -111,
    -111,
    1245,
    1263,
    1269,
    1272,
    -241,
    -241,
    -241,
    -558,
    -532,
    -531,
    365,
    -530,
    1,
    28,
    29,
    38,
    42,
    46,
    71,
    0,
    75,
    -111,
    -111,
    76,
    77,
    78,
    79,
    893,
    80,
    682,
    -242,
    867,
    -111,
    -111,
    -111,
    -111,
    142,
    152,
    156,
    245,
    322,
    347,
    514,
    348,
    1212,
    1213,
    1214,
    1215,
    1209,
    1210,
    349,
    350,
    351,
    352,
    353,
    354,
    1216,
    1211,
    355,
    356,
    357,
    359,
    428,
    893,
    -265,
    682,
    -241,
    -264,
    72,
    0,
    18,
    317,
    320,
    19,
    20,
    21,
    23,
    398,
    471,
    472,
    479,
    482,
    483,
    484,
    485,
    489,
    490,
    491,
    498,
    669,
    1202,
    1145,
    1220,
    1019,
    1018,
    1181,
    -269,
    -103,
    17,
    22,
    26,
    290,
    397,
    589,
    593,
    620,
    674,
    1149,
    1197,
    1146,
    1275,
    0,
    -494,
    1162,
    0,
    1223
  ];
  PHP.Parser.prototype.yycheck = [
    2,
    3,
    4,
    5,
    6,
    7,
    0,
    9,
    10,
    11,
    12,
    13,
    106,
    1,
    108,
    31,
    9,
    10,
    11,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    37,
    38,
    30,
    116,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    117,
    118,
    9,
    10,
    57,
    9,
    10,
    11,
    137,
    138,
    155,
    128,
    129,
    130,
    131,
    106,
    107,
    8,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    116,
    30,
    80,
    32,
    33,
    34,
    35,
    36,
    1,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    30,
    80,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    51,
    1,
    161,
    101,
    80,
    150,
    151,
    152,
    8,
    154,
    9,
    10,
    11,
    2,
    3,
    4,
    5,
    6,
    7,
    164,
    9,
    10,
    11,
    12,
    13,
    123,
    9,
    10,
    11,
    80,
    161,
    30,
    83,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    30,
    37,
    38,
    106,
    107,
    1,
    9,
    10,
    11,
    1,
    53,
    54,
    55,
    116,
    57,
    1,
    8,
    14,
    155,
    156,
    157,
    57,
    9,
    10,
    11,
    162,
    69,
    30,
    116,
    32,
    33,
    119,
    120,
    121,
    122,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    8,
    30,
    80,
    32,
    33,
    34,
    35,
    137,
    138,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    84,
    70,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    9,
    9,
    10,
    11,
    160,
    150,
    151,
    152,
    164,
    154,
    2,
    3,
    4,
    5,
    6,
    7,
    1,
    9,
    10,
    11,
    12,
    13,
    30,
    8,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    116,
    57,
    14,
    9,
    10,
    11,
    134,
    135,
    161,
    8,
    164,
    160,
    1,
    69,
    167,
    164,
    159,
    57,
    161,
    80,
    8,
    137,
    138,
    1,
    30,
    1,
    32,
    33,
    34,
    1,
    14,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    31,
    1,
    80,
    30,
    70,
    30,
    9,
    10,
    11,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    8,
    156,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    8,
    134,
    135,
    8,
    8,
    150,
    151,
    152,
    2,
    3,
    4,
    5,
    6,
    7,
    97,
    82,
    149,
    31,
    12,
    13,
    101,
    15,
    116,
    8,
    116,
    106,
    80,
    108,
    161,
    85,
    163,
    106,
    113,
    108,
    8,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    137,
    138,
    137,
    138,
    14,
    9,
    10,
    11,
    80,
    82,
    14,
    8,
    85,
    50,
    51,
    50,
    51,
    52,
    128,
    56,
    1,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    70,
    70,
    71,
    72,
    73,
    74,
    162,
    159,
    97,
    78,
    79,
    80,
    116,
    82,
    1,
    146,
    158,
    86,
    87,
    88,
    89,
    163,
    91,
    31,
    93,
    167,
    95,
    156,
    14,
    98,
    99,
    35,
    161,
    37,
    103,
    104,
    105,
    106,
    107,
    1,
    109,
    110,
    147,
    148,
    31,
    160,
    115,
    116,
    8,
    164,
    1,
    155,
    156,
    157,
    70,
    124,
    125,
    126,
    8,
    70,
    1,
    70,
    37,
    38,
    134,
    135,
    8,
    136,
    137,
    82,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    8,
    35,
    149,
    37,
    164,
    151,
    152,
    164,
    164,
    155,
    156,
    157,
    158,
    1,
    161,
    8,
    163,
    163,
    82,
    165,
    166,
    167,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    75,
    76,
    77,
    75,
    76,
    134,
    135,
    31,
    8,
    84,
    134,
    135,
    134,
    135,
    1,
    90,
    8,
    92,
    82,
    94,
    149,
    96,
    37,
    38,
    8,
    149,
    80,
    149,
    128,
    59,
    60,
    106,
    161,
    8,
    1,
    161,
    8,
    161,
    159,
    161,
    70,
    167,
    117,
    118,
    31,
    8,
    106,
    70,
    108,
    106,
    14,
    108,
    127,
    128,
    129,
    130,
    131,
    70,
    158,
    74,
    84,
    75,
    76,
    163,
    31,
    80,
    159,
    167,
    161,
    101,
    102,
    14,
    87,
    88,
    89,
    14,
    91,
    31,
    93,
    16,
    95,
    37,
    38,
    98,
    159,
    1,
    161,
    162,
    103,
    104,
    105,
    37,
    38,
    1,
    109,
    110,
    16,
    84,
    16,
    163,
    115,
    116,
    16,
    167,
    134,
    135,
    16,
    161,
    31,
    124,
    16,
    134,
    135,
    167,
    70,
    31,
    16,
    84,
    16,
    149,
    16,
    134,
    135,
    31,
    106,
    107,
    82,
    31,
    74,
    31,
    86,
    161,
    106,
    107,
    80,
    159,
    31,
    161,
    161,
    154,
    31,
    87,
    88,
    89,
    31,
    91,
    31,
    93,
    161,
    95,
    111,
    112,
    98,
    31,
    31,
    31,
    31,
    103,
    104,
    105,
    31,
    31,
    31,
    109,
    110,
    31,
    31,
    31,
    84,
    115,
    116,
    31,
    159,
    31,
    161,
    37,
    84,
    38,
    124,
    35,
    136,
    137,
    35,
    139,
    140,
    141,
    142,
    143,
    144,
    35,
    31,
    70,
    159,
    37,
    161,
    151,
    152,
    69,
    57,
    74,
    80,
    82,
    85,
    77,
    90,
    80,
    94,
    163,
    92,
    82,
    166,
    167,
    87,
    88,
    89,
    83,
    91,
    114,
    93,
    113,
    95,
    128,
    85,
    98,
    116,
    128,
    153,
    128,
    103,
    104,
    105,
    146,
    89,
    74,
    109,
    110,
    0,
    1,
    149,
    80,
    115,
    116,
    96,
    159,
    133,
    161,
    87,
    88,
    89,
    124,
    91,
    159,
    93,
    161,
    95,
    97,
    146,
    98,
    97,
    97,
    100,
    154,
    103,
    104,
    105,
    74,
    100,
    149,
    109,
    110,
    -1,
    80,
    -1,
    -1,
    115,
    116,
    -1,
    132,
    87,
    88,
    89,
    132,
    91,
    124,
    93,
    -1,
    95,
    -1,
    155,
    98,
    -1,
    -1,
    -1,
    102,
    103,
    104,
    105,
    74,
    -1,
    149,
    109,
    110,
    149,
    80,
    81,
    153,
    115,
    116,
    160,
    1,
    87,
    88,
    89,
    149,
    91,
    124,
    93,
    160,
    95,
    164,
    84,
    98,
    159,
    158,
    -1,
    -1,
    103,
    104,
    105,
    159,
    159,
    159,
    109,
    110,
    159,
    159,
    159,
    159,
    115,
    116,
    159,
    159,
    106,
    159,
    108,
    1,
    159,
    124,
    159,
    113,
    160,
    159,
    159,
    117,
    118,
    159,
    159,
    159,
    163,
    160,
    160,
    160,
    -1,
    127,
    128,
    129,
    130,
    131,
    161,
    161,
    74,
    161,
    161,
    161,
    161,
    161,
    80,
    161,
    161,
    161,
    161,
    161,
    167,
    87,
    88,
    89,
    150,
    91,
    162,
    93,
    162,
    95,
    84,
    162,
    98,
    159,
    162,
    161,
    162,
    103,
    104,
    105,
    162,
    162,
    162,
    109,
    110,
    162,
    100,
    101,
    102,
    115,
    116,
    162,
    106,
    70,
    162,
    162,
    162,
    162,
    124,
    162,
    162,
    162,
    162,
    117,
    118,
    82,
    84,
    162,
    162,
    86,
    162,
    162,
    162,
    127,
    128,
    129,
    130,
    131,
    162,
    162,
    162,
    162,
    100,
    101,
    102,
    163,
    163,
    163,
    106,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    -1,
    163,
    117,
    118,
    163,
    163,
    163,
    163,
    159,
    163,
    161,
    162,
    127,
    128,
    129,
    130,
    131,
    163,
    163,
    163,
    163,
    163,
    163,
    137,
    163,
    139,
    140,
    141,
    142,
    143,
    144,
    163,
    163,
    163,
    163,
    163,
    163,
    151,
    152,
    163,
    163,
    163,
    163,
    163,
    159,
    164,
    161,
    162,
    164,
    163,
    -1,
    164,
    166,
    167,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    164,
    -1,
    165,
    165,
    -1,
    166
  ];
  PHP.Parser.prototype.yybase = [
    0,
    -2,
    154,
    565,
    876,
    948,
    984,
    514,
    53,
    398,
    837,
    307,
    307,
    67,
    307,
    307,
    307,
    653,
    724,
    724,
    732,
    724,
    616,
    673,
    204,
    204,
    204,
    625,
    625,
    625,
    625,
    694,
    694,
    831,
    831,
    863,
    799,
    765,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    936,
    375,
    519,
    369,
    701,
    1017,
    1023,
    1019,
    1024,
    1015,
    1014,
    1018,
    1020,
    1025,
    911,
    912,
    782,
    918,
    919,
    920,
    921,
    1021,
    841,
    1016,
    1022,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    290,
    491,
    44,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    382,
    160,
    160,
    160,
    187,
    684,
    684,
    341,
    203,
    610,
    47,
    985,
    985,
    985,
    985,
    985,
    985,
    985,
    985,
    985,
    985,
    144,
    144,
    7,
    7,
    7,
    7,
    7,
    371,
    -25,
    -25,
    -25,
    -25,
    540,
    385,
    102,
    576,
    358,
    45,
    377,
    460,
    460,
    360,
    231,
    231,
    231,
    231,
    231,
    231,
    -78,
    -78,
    -78,
    -78,
    -78,
    -66,
    319,
    457,
    -94,
    396,
    423,
    586,
    586,
    586,
    586,
    423,
    423,
    423,
    423,
    750,
    1029,
    423,
    423,
    423,
    511,
    516,
    516,
    518,
    147,
    147,
    147,
    516,
    583,
    777,
    422,
    583,
    422,
    194,
    92,
    748,
    -40,
    87,
    412,
    748,
    617,
    627,
    198,
    143,
    773,
    658,
    773,
    1013,
    757,
    764,
    717,
    838,
    860,
    1026,
    800,
    908,
    806,
    910,
    219,
    686,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    1012,
    855,
    552,
    1013,
    286,
    855,
    855,
    855,
    552,
    552,
    552,
    552,
    552,
    552,
    552,
    552,
    552,
    552,
    679,
    286,
    568,
    626,
    286,
    794,
    552,
    375,
    758,
    375,
    375,
    375,
    375,
    958,
    375,
    375,
    375,
    375,
    375,
    375,
    970,
    769,
    -16,
    375,
    519,
    12,
    12,
    547,
    83,
    12,
    12,
    12,
    12,
    375,
    375,
    375,
    658,
    781,
    713,
    666,
    792,
    448,
    781,
    781,
    781,
    438,
    444,
    193,
    447,
    570,
    523,
    580,
    760,
    760,
    767,
    929,
    929,
    760,
    759,
    760,
    767,
    934,
    760,
    929,
    805,
    359,
    648,
    577,
    611,
    656,
    929,
    478,
    760,
    760,
    760,
    760,
    665,
    760,
    467,
    433,
    760,
    760,
    785,
    774,
    789,
    60,
    929,
    929,
    929,
    789,
    596,
    751,
    751,
    751,
    811,
    812,
    746,
    771,
    567,
    498,
    677,
    348,
    779,
    771,
    771,
    760,
    640,
    746,
    771,
    746,
    771,
    747,
    771,
    771,
    771,
    746,
    771,
    759,
    585,
    771,
    734,
    668,
    224,
    771,
    6,
    935,
    937,
    354,
    940,
    932,
    941,
    979,
    942,
    943,
    851,
    956,
    933,
    945,
    931,
    930,
    780,
    703,
    720,
    790,
    729,
    928,
    768,
    768,
    768,
    925,
    768,
    768,
    768,
    768,
    768,
    768,
    768,
    768,
    703,
    788,
    804,
    733,
    783,
    960,
    722,
    726,
    725,
    868,
    1027,
    1028,
    737,
    739,
    958,
    1006,
    953,
    803,
    730,
    992,
    967,
    866,
    848,
    968,
    969,
    993,
    1007,
    1008,
    871,
    761,
    874,
    880,
    797,
    971,
    852,
    768,
    935,
    943,
    933,
    945,
    931,
    930,
    763,
    762,
    753,
    755,
    749,
    745,
    736,
    738,
    770,
    1009,
    924,
    835,
    830,
    970,
    926,
    703,
    839,
    986,
    847,
    994,
    995,
    850,
    801,
    772,
    840,
    881,
    972,
    975,
    976,
    853,
    1010,
    810,
    989,
    795,
    996,
    802,
    882,
    997,
    998,
    999,
    1e3,
    885,
    854,
    856,
    857,
    815,
    754,
    980,
    786,
    891,
    335,
    787,
    796,
    978,
    363,
    957,
    858,
    894,
    895,
    1001,
    1002,
    1003,
    896,
    954,
    816,
    990,
    752,
    991,
    983,
    817,
    818,
    485,
    784,
    778,
    541,
    676,
    897,
    899,
    900,
    955,
    775,
    766,
    821,
    822,
    1011,
    901,
    697,
    824,
    740,
    902,
    1005,
    742,
    744,
    756,
    859,
    793,
    743,
    798,
    977,
    776,
    827,
    907,
    829,
    832,
    833,
    1004,
    836,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    458,
    458,
    458,
    458,
    458,
    458,
    307,
    307,
    307,
    307,
    0,
    0,
    307,
    0,
    0,
    0,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    458,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    423,
    423,
    291,
    291,
    0,
    291,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    291,
    291,
    291,
    291,
    291,
    291,
    291,
    805,
    147,
    147,
    147,
    147,
    423,
    423,
    423,
    423,
    423,
    -88,
    -88,
    147,
    147,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    423,
    0,
    0,
    0,
    286,
    422,
    0,
    759,
    759,
    759,
    759,
    0,
    0,
    0,
    0,
    422,
    422,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    286,
    422,
    0,
    286,
    0,
    759,
    759,
    423,
    805,
    805,
    314,
    423,
    0,
    0,
    0,
    0,
    286,
    759,
    286,
    552,
    422,
    552,
    552,
    12,
    375,
    314,
    608,
    608,
    608,
    608,
    0,
    658,
    805,
    805,
    805,
    805,
    805,
    805,
    805,
    805,
    805,
    805,
    805,
    759,
    0,
    805,
    0,
    759,
    759,
    759,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    759,
    0,
    0,
    929,
    0,
    0,
    0,
    0,
    760,
    0,
    0,
    0,
    0,
    0,
    0,
    760,
    934,
    0,
    0,
    0,
    0,
    0,
    0,
    759,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    768,
    801,
    0,
    801,
    0,
    768,
    768,
    768
  ];
  PHP.Parser.prototype.yydefault = [
    3,
    32767,
    103,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    101,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    578,
    578,
    578,
    578,
    32767,
    32767,
    246,
    103,
    32767,
    32767,
    454,
    372,
    372,
    372,
    32767,
    32767,
    522,
    522,
    522,
    522,
    522,
    522,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    454,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    101,
    32767,
    32767,
    32767,
    37,
    7,
    8,
    10,
    11,
    50,
    17,
    310,
    32767,
    32767,
    32767,
    32767,
    103,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    571,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    458,
    437,
    438,
    440,
    441,
    371,
    523,
    577,
    313,
    574,
    370,
    146,
    325,
    315,
    234,
    316,
    250,
    459,
    251,
    460,
    463,
    464,
    211,
    279,
    367,
    150,
    401,
    455,
    403,
    453,
    457,
    402,
    377,
    382,
    383,
    384,
    385,
    386,
    387,
    388,
    389,
    390,
    391,
    392,
    393,
    394,
    375,
    376,
    456,
    434,
    433,
    432,
    399,
    32767,
    32767,
    400,
    404,
    374,
    407,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    103,
    32767,
    405,
    406,
    423,
    424,
    421,
    422,
    425,
    32767,
    426,
    427,
    428,
    429,
    32767,
    32767,
    302,
    32767,
    32767,
    351,
    349,
    414,
    415,
    302,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    516,
    431,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    103,
    32767,
    101,
    518,
    396,
    398,
    486,
    409,
    410,
    408,
    378,
    32767,
    493,
    32767,
    103,
    495,
    32767,
    32767,
    32767,
    112,
    32767,
    32767,
    32767,
    517,
    32767,
    524,
    524,
    32767,
    479,
    101,
    194,
    32767,
    194,
    194,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    585,
    479,
    111,
    111,
    111,
    111,
    111,
    111,
    111,
    111,
    111,
    111,
    111,
    32767,
    194,
    111,
    32767,
    32767,
    32767,
    101,
    194,
    194,
    194,
    194,
    194,
    194,
    194,
    194,
    194,
    194,
    189,
    32767,
    260,
    262,
    103,
    539,
    194,
    32767,
    498,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    491,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    479,
    419,
    139,
    32767,
    139,
    524,
    411,
    412,
    413,
    481,
    524,
    524,
    524,
    298,
    281,
    32767,
    32767,
    32767,
    32767,
    496,
    496,
    101,
    101,
    101,
    101,
    491,
    32767,
    32767,
    112,
    100,
    100,
    100,
    100,
    100,
    104,
    102,
    32767,
    32767,
    32767,
    32767,
    100,
    32767,
    102,
    102,
    32767,
    32767,
    217,
    208,
    215,
    102,
    32767,
    543,
    544,
    215,
    102,
    219,
    219,
    219,
    239,
    239,
    470,
    304,
    102,
    100,
    102,
    102,
    196,
    304,
    304,
    32767,
    102,
    470,
    304,
    470,
    304,
    198,
    304,
    304,
    304,
    470,
    304,
    32767,
    102,
    304,
    210,
    100,
    100,
    304,
    32767,
    32767,
    32767,
    481,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    511,
    32767,
    528,
    541,
    417,
    418,
    420,
    526,
    442,
    443,
    444,
    445,
    446,
    447,
    448,
    450,
    573,
    32767,
    485,
    32767,
    32767,
    32767,
    32767,
    324,
    583,
    32767,
    583,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    584,
    32767,
    524,
    32767,
    32767,
    32767,
    32767,
    416,
    9,
    76,
    43,
    44,
    52,
    58,
    502,
    503,
    504,
    505,
    499,
    500,
    506,
    501,
    32767,
    32767,
    507,
    549,
    32767,
    32767,
    525,
    576,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    139,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    511,
    32767,
    137,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    524,
    32767,
    32767,
    32767,
    300,
    301,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    524,
    32767,
    32767,
    32767,
    283,
    284,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    278,
    32767,
    32767,
    366,
    32767,
    32767,
    32767,
    32767,
    345,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    32767,
    152,
    152,
    3,
    3,
    327,
    152,
    152,
    152,
    327,
    152,
    327,
    327,
    327,
    152,
    152,
    152,
    152,
    152,
    152,
    272,
    184,
    254,
    257,
    239,
    239,
    152,
    337,
    152
  ];
  PHP.Parser.prototype.yygoto = [
    194,
    194,
    670,
    422,
    643,
    463,
    1264,
    1265,
    1022,
    416,
    308,
    309,
    329,
    563,
    314,
    421,
    330,
    423,
    622,
    801,
    678,
    637,
    586,
    651,
    652,
    653,
    165,
    165,
    165,
    165,
    218,
    195,
    191,
    191,
    175,
    177,
    213,
    191,
    191,
    191,
    191,
    191,
    192,
    192,
    192,
    192,
    192,
    192,
    186,
    187,
    188,
    189,
    190,
    215,
    213,
    216,
    521,
    522,
    412,
    523,
    525,
    526,
    527,
    528,
    529,
    530,
    531,
    532,
    1091,
    166,
    167,
    168,
    193,
    169,
    170,
    171,
    164,
    172,
    173,
    174,
    176,
    212,
    214,
    217,
    235,
    238,
    241,
    242,
    244,
    255,
    256,
    257,
    258,
    259,
    260,
    261,
    263,
    264,
    265,
    266,
    274,
    275,
    311,
    312,
    313,
    417,
    418,
    419,
    568,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    178,
    234,
    179,
    196,
    197,
    198,
    236,
    186,
    187,
    188,
    189,
    190,
    215,
    1091,
    199,
    180,
    181,
    182,
    200,
    196,
    183,
    237,
    201,
    199,
    163,
    202,
    203,
    184,
    204,
    205,
    206,
    185,
    207,
    208,
    209,
    210,
    211,
    323,
    323,
    323,
    323,
    827,
    608,
    608,
    824,
    547,
    538,
    342,
    1221,
    1221,
    1221,
    1221,
    1221,
    1221,
    1221,
    1221,
    1221,
    1221,
    1239,
    1239,
    288,
    288,
    288,
    288,
    1239,
    1239,
    1239,
    1239,
    1239,
    1239,
    1239,
    1239,
    1239,
    1239,
    388,
    538,
    547,
    556,
    557,
    395,
    566,
    588,
    602,
    603,
    832,
    825,
    880,
    875,
    876,
    889,
    15,
    833,
    877,
    830,
    878,
    879,
    831,
    799,
    251,
    251,
    883,
    919,
    992,
    1e3,
    1004,
    1001,
    1005,
    1237,
    1237,
    938,
    1043,
    1039,
    1040,
    1237,
    1237,
    1237,
    1237,
    1237,
    1237,
    1237,
    1237,
    1237,
    1237,
    858,
    248,
    248,
    248,
    248,
    250,
    252,
    533,
    533,
    533,
    533,
    487,
    590,
    488,
    1190,
    1190,
    997,
    1190,
    997,
    494,
    1290,
    1290,
    560,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    997,
    1261,
    1261,
    1290,
    1261,
    340,
    1190,
    930,
    402,
    677,
    1279,
    1190,
    1190,
    1190,
    1190,
    959,
    345,
    1190,
    1190,
    1190,
    1271,
    1271,
    1271,
    1271,
    606,
    640,
    345,
    345,
    1273,
    1273,
    1273,
    1273,
    820,
    820,
    805,
    896,
    884,
    840,
    885,
    897,
    345,
    345,
    5,
    345,
    6,
    1306,
    384,
    535,
    535,
    559,
    535,
    415,
    852,
    597,
    1257,
    839,
    540,
    524,
    524,
    345,
    1289,
    1289,
    642,
    524,
    524,
    524,
    524,
    524,
    524,
    524,
    524,
    524,
    524,
    445,
    805,
    1140,
    805,
    1289,
    932,
    932,
    932,
    932,
    1063,
    1064,
    445,
    926,
    933,
    386,
    390,
    548,
    587,
    591,
    1030,
    1292,
    331,
    554,
    1259,
    1259,
    1030,
    704,
    621,
    623,
    823,
    641,
    1250,
    319,
    303,
    660,
    664,
    973,
    668,
    676,
    969,
    429,
    553,
    962,
    936,
    936,
    934,
    936,
    703,
    601,
    537,
    971,
    966,
    343,
    344,
    663,
    817,
    595,
    609,
    612,
    613,
    614,
    615,
    634,
    635,
    636,
    680,
    439,
    1186,
    845,
    454,
    454,
    439,
    439,
    1266,
    1267,
    820,
    901,
    1079,
    454,
    394,
    539,
    551,
    1183,
    605,
    540,
    539,
    842,
    551,
    978,
    272,
    387,
    618,
    619,
    981,
    536,
    536,
    844,
    707,
    646,
    957,
    567,
    457,
    458,
    459,
    838,
    850,
    254,
    254,
    1297,
    1298,
    400,
    401,
    976,
    976,
    464,
    649,
    1182,
    650,
    1028,
    404,
    405,
    406,
    1187,
    661,
    424,
    1032,
    407,
    564,
    600,
    815,
    338,
    424,
    854,
    848,
    853,
    841,
    1027,
    1031,
    1009,
    1002,
    1006,
    1003,
    1007,
    1185,
    941,
    1188,
    1247,
    1248,
    943,
    0,
    1074,
    439,
    439,
    439,
    439,
    439,
    439,
    439,
    439,
    439,
    439,
    439,
    0,
    468,
    439,
    585,
    1056,
    931,
    681,
    667,
    667,
    0,
    495,
    673,
    1054,
    1171,
    912,
    0,
    0,
    1172,
    1175,
    913,
    1176,
    0,
    0,
    0,
    0,
    0,
    0,
    1072,
    857
  ];
  PHP.Parser.prototype.yygcheck = [
    42,
    42,
    72,
    65,
    65,
    166,
    166,
    166,
    119,
    65,
    65,
    65,
    65,
    65,
    65,
    65,
    65,
    65,
    65,
    7,
    9,
    84,
    122,
    84,
    84,
    84,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    23,
    23,
    23,
    23,
    15,
    104,
    104,
    26,
    75,
    75,
    93,
    104,
    104,
    104,
    104,
    104,
    104,
    104,
    104,
    104,
    104,
    160,
    160,
    24,
    24,
    24,
    24,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    75,
    75,
    75,
    75,
    75,
    75,
    75,
    75,
    75,
    75,
    15,
    27,
    15,
    15,
    15,
    15,
    75,
    15,
    15,
    15,
    15,
    15,
    15,
    6,
    5,
    5,
    15,
    87,
    87,
    87,
    87,
    87,
    87,
    161,
    161,
    49,
    15,
    15,
    15,
    161,
    161,
    161,
    161,
    161,
    161,
    161,
    161,
    161,
    161,
    45,
    5,
    5,
    5,
    5,
    5,
    5,
    103,
    103,
    103,
    103,
    147,
    103,
    147,
    72,
    72,
    72,
    72,
    72,
    147,
    173,
    173,
    162,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    72,
    122,
    122,
    173,
    122,
    169,
    72,
    89,
    89,
    89,
    171,
    72,
    72,
    72,
    72,
    99,
    14,
    72,
    72,
    72,
    9,
    9,
    9,
    9,
    55,
    55,
    14,
    14,
    122,
    122,
    122,
    122,
    22,
    22,
    12,
    72,
    64,
    35,
    64,
    72,
    14,
    14,
    46,
    14,
    46,
    14,
    61,
    19,
    19,
    100,
    19,
    13,
    35,
    13,
    122,
    35,
    14,
    163,
    163,
    14,
    172,
    172,
    63,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    163,
    19,
    12,
    143,
    12,
    172,
    19,
    19,
    19,
    19,
    136,
    136,
    19,
    19,
    19,
    58,
    58,
    58,
    58,
    58,
    122,
    172,
    29,
    48,
    122,
    122,
    122,
    48,
    48,
    48,
    25,
    48,
    14,
    159,
    159,
    48,
    48,
    48,
    48,
    48,
    48,
    109,
    9,
    25,
    25,
    25,
    25,
    25,
    25,
    9,
    25,
    25,
    25,
    93,
    93,
    14,
    18,
    79,
    79,
    79,
    79,
    79,
    79,
    79,
    79,
    79,
    79,
    23,
    20,
    39,
    141,
    141,
    23,
    23,
    168,
    168,
    22,
    17,
    17,
    141,
    28,
    9,
    9,
    152,
    17,
    14,
    9,
    37,
    9,
    17,
    24,
    9,
    83,
    83,
    106,
    24,
    24,
    17,
    95,
    17,
    17,
    9,
    9,
    9,
    9,
    17,
    9,
    5,
    5,
    9,
    9,
    80,
    80,
    103,
    103,
    149,
    80,
    17,
    80,
    121,
    80,
    80,
    80,
    20,
    80,
    113,
    124,
    80,
    2,
    2,
    20,
    80,
    113,
    41,
    9,
    16,
    16,
    16,
    16,
    113,
    113,
    113,
    113,
    113,
    14,
    16,
    20,
    20,
    20,
    92,
    -1,
    139,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    -1,
    82,
    23,
    8,
    8,
    16,
    8,
    8,
    8,
    -1,
    8,
    8,
    8,
    78,
    78,
    -1,
    -1,
    78,
    78,
    78,
    78,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    16,
    16
  ];
  PHP.Parser.prototype.yygbase = [
    0,
    0,
    -203,
    0,
    0,
    221,
    208,
    10,
    512,
    7,
    0,
    0,
    24,
    1,
    5,
    -174,
    47,
    -23,
    105,
    61,
    38,
    0,
    -10,
    158,
    181,
    379,
    164,
    205,
    102,
    84,
    0,
    0,
    0,
    0,
    0,
    -43,
    0,
    107,
    0,
    104,
    0,
    54,
    -1,
    0,
    0,
    235,
    -384,
    0,
    -307,
    210,
    0,
    0,
    0,
    0,
    0,
    266,
    0,
    0,
    324,
    0,
    0,
    286,
    0,
    103,
    298,
    -236,
    0,
    0,
    0,
    0,
    0,
    0,
    -6,
    0,
    0,
    -167,
    0,
    0,
    129,
    62,
    -14,
    0,
    53,
    -22,
    -669,
    0,
    0,
    -52,
    0,
    -11,
    0,
    0,
    68,
    -299,
    0,
    52,
    0,
    0,
    0,
    262,
    288,
    0,
    0,
    227,
    -73,
    0,
    87,
    0,
    0,
    118,
    0,
    0,
    0,
    209,
    0,
    0,
    0,
    0,
    0,
    6,
    0,
    108,
    15,
    0,
    46,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    91,
    0,
    0,
    69,
    0,
    390,
    0,
    86,
    0,
    0,
    0,
    -224,
    0,
    37,
    0,
    0,
    77,
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    -57,
    -8,
    241,
    99,
    0,
    0,
    -290,
    0,
    65,
    257,
    0,
    261,
    39,
    -35,
    0,
    0
  ];
  PHP.Parser.prototype.yygdefault = [
    -32768,
    499,
    711,
    4,
    712,
    905,
    788,
    797,
    583,
    515,
    679,
    339,
    610,
    413,
    1255,
    882,
    1078,
    565,
    816,
    1199,
    1207,
    446,
    819,
    324,
    701,
    864,
    865,
    866,
    391,
    376,
    382,
    389,
    632,
    611,
    481,
    851,
    442,
    843,
    473,
    846,
    441,
    855,
    162,
    410,
    497,
    859,
    3,
    861,
    542,
    892,
    377,
    869,
    378,
    656,
    871,
    550,
    873,
    874,
    385,
    392,
    393,
    1083,
    558,
    607,
    886,
    243,
    552,
    887,
    375,
    888,
    895,
    380,
    383,
    665,
    453,
    492,
    486,
    403,
    1058,
    594,
    629,
    450,
    467,
    617,
    616,
    604,
    466,
    425,
    408,
    928,
    474,
    451,
    942,
    341,
    950,
    709,
    1090,
    624,
    476,
    958,
    625,
    965,
    968,
    516,
    517,
    465,
    980,
    269,
    983,
    477,
    1015,
    647,
    648,
    995,
    626,
    627,
    1013,
    460,
    584,
    1021,
    443,
    1029,
    1243,
    444,
    1033,
    262,
    1036,
    276,
    409,
    426,
    1041,
    1042,
    8,
    1048,
    671,
    672,
    10,
    273,
    496,
    1073,
    666,
    440,
    1089,
    430,
    1159,
    1161,
    544,
    478,
    1179,
    1178,
    659,
    493,
    1184,
    1246,
    438,
    518,
    461,
    310,
    519,
    302,
    327,
    307,
    534,
    289,
    328,
    520,
    462,
    1252,
    1260,
    325,
    30,
    1280,
    1291,
    335,
    562,
    599
  ];
  PHP.Parser.prototype.yylhs = [
    0,
    1,
    3,
    3,
    2,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    8,
    9,
    10,
    11,
    11,
    11,
    12,
    12,
    13,
    13,
    14,
    15,
    15,
    16,
    16,
    17,
    17,
    18,
    18,
    21,
    21,
    22,
    23,
    23,
    24,
    24,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    29,
    29,
    30,
    30,
    32,
    34,
    34,
    28,
    36,
    36,
    33,
    38,
    38,
    35,
    35,
    37,
    37,
    39,
    39,
    31,
    40,
    40,
    41,
    43,
    44,
    44,
    45,
    46,
    46,
    48,
    47,
    47,
    47,
    47,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    49,
    25,
    25,
    68,
    68,
    71,
    71,
    70,
    69,
    69,
    62,
    74,
    74,
    75,
    75,
    76,
    76,
    77,
    77,
    78,
    78,
    26,
    26,
    27,
    27,
    27,
    27,
    86,
    86,
    88,
    88,
    81,
    81,
    81,
    82,
    82,
    85,
    85,
    83,
    83,
    89,
    90,
    90,
    56,
    56,
    64,
    64,
    67,
    67,
    67,
    66,
    91,
    91,
    92,
    57,
    57,
    57,
    57,
    93,
    93,
    94,
    94,
    95,
    95,
    96,
    97,
    97,
    98,
    98,
    99,
    99,
    54,
    54,
    50,
    50,
    101,
    52,
    52,
    102,
    51,
    51,
    53,
    53,
    63,
    63,
    63,
    63,
    79,
    79,
    105,
    105,
    107,
    107,
    108,
    108,
    108,
    108,
    106,
    106,
    106,
    110,
    110,
    110,
    110,
    87,
    87,
    113,
    113,
    113,
    111,
    111,
    114,
    114,
    112,
    112,
    115,
    115,
    116,
    116,
    116,
    116,
    109,
    109,
    80,
    80,
    80,
    20,
    20,
    20,
    118,
    117,
    117,
    119,
    119,
    119,
    119,
    59,
    120,
    120,
    121,
    60,
    123,
    123,
    124,
    124,
    125,
    125,
    84,
    126,
    126,
    126,
    126,
    126,
    126,
    131,
    131,
    132,
    132,
    133,
    133,
    133,
    133,
    133,
    134,
    135,
    135,
    130,
    130,
    127,
    127,
    129,
    129,
    137,
    137,
    136,
    136,
    136,
    136,
    136,
    136,
    136,
    128,
    138,
    138,
    140,
    139,
    139,
    61,
    100,
    141,
    141,
    55,
    55,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    42,
    148,
    142,
    142,
    147,
    147,
    150,
    151,
    151,
    152,
    153,
    153,
    153,
    19,
    19,
    72,
    72,
    72,
    72,
    143,
    143,
    143,
    143,
    155,
    155,
    144,
    144,
    146,
    146,
    146,
    149,
    149,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    160,
    161,
    161,
    104,
    163,
    163,
    163,
    163,
    145,
    145,
    145,
    145,
    145,
    145,
    145,
    145,
    58,
    58,
    158,
    158,
    158,
    158,
    164,
    164,
    154,
    154,
    154,
    165,
    165,
    165,
    165,
    165,
    165,
    73,
    73,
    65,
    65,
    65,
    65,
    122,
    122,
    122,
    122,
    168,
    167,
    157,
    157,
    157,
    157,
    157,
    157,
    157,
    156,
    156,
    156,
    166,
    166,
    166,
    166,
    103,
    162,
    170,
    170,
    169,
    169,
    171,
    171,
    171,
    171,
    171,
    171,
    171,
    171,
    159,
    159,
    159,
    159,
    173,
    174,
    172,
    172,
    172,
    172,
    172,
    172,
    172,
    172,
    175,
    175,
    175,
    175
  ];
  PHP.Parser.prototype.yylen = [
    1,
    1,
    2,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    2,
    1,
    3,
    4,
    1,
    2,
    0,
    1,
    1,
    1,
    1,
    1,
    3,
    5,
    4,
    3,
    4,
    2,
    3,
    1,
    1,
    7,
    6,
    2,
    3,
    1,
    2,
    3,
    1,
    2,
    3,
    1,
    1,
    3,
    1,
    3,
    1,
    2,
    2,
    3,
    1,
    3,
    2,
    3,
    1,
    3,
    2,
    0,
    1,
    1,
    1,
    1,
    1,
    3,
    7,
    10,
    5,
    7,
    9,
    5,
    3,
    3,
    3,
    3,
    3,
    3,
    1,
    2,
    5,
    7,
    9,
    6,
    5,
    6,
    3,
    2,
    1,
    1,
    1,
    0,
    2,
    1,
    3,
    8,
    0,
    4,
    2,
    1,
    3,
    0,
    1,
    0,
    1,
    0,
    1,
    3,
    1,
    8,
    9,
    8,
    7,
    6,
    8,
    0,
    2,
    0,
    2,
    1,
    2,
    2,
    0,
    2,
    0,
    2,
    0,
    2,
    2,
    1,
    3,
    1,
    4,
    1,
    4,
    1,
    1,
    4,
    2,
    1,
    3,
    3,
    3,
    4,
    4,
    5,
    0,
    2,
    4,
    3,
    1,
    1,
    7,
    0,
    2,
    1,
    3,
    3,
    4,
    1,
    4,
    0,
    2,
    5,
    0,
    2,
    6,
    0,
    2,
    0,
    3,
    1,
    2,
    1,
    1,
    2,
    0,
    1,
    3,
    0,
    2,
    1,
    1,
    1,
    1,
    6,
    8,
    6,
    1,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    1,
    2,
    1,
    1,
    0,
    1,
    0,
    2,
    2,
    2,
    4,
    3,
    1,
    1,
    3,
    1,
    2,
    2,
    3,
    2,
    3,
    1,
    1,
    2,
    3,
    1,
    1,
    3,
    2,
    0,
    1,
    5,
    5,
    10,
    3,
    5,
    1,
    1,
    3,
    0,
    2,
    4,
    5,
    4,
    4,
    4,
    3,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    1,
    3,
    1,
    1,
    3,
    2,
    2,
    3,
    1,
    0,
    1,
    1,
    3,
    3,
    3,
    4,
    1,
    1,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    5,
    4,
    3,
    4,
    4,
    2,
    2,
    4,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    3,
    2,
    1,
    2,
    4,
    2,
    2,
    8,
    9,
    8,
    9,
    9,
    10,
    9,
    10,
    8,
    3,
    2,
    0,
    4,
    2,
    1,
    3,
    2,
    2,
    2,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    1,
    0,
    3,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    3,
    3,
    3,
    4,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    1,
    3,
    2,
    3,
    0,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    4,
    4,
    1,
    4,
    4,
    0,
    1,
    1,
    1,
    3,
    3,
    1,
    4,
    2,
    2,
    1,
    3,
    1,
    4,
    4,
    3,
    3,
    3,
    3,
    1,
    3,
    1,
    1,
    3,
    1,
    1,
    4,
    1,
    1,
    1,
    3,
    1,
    1,
    2,
    1,
    3,
    4,
    3,
    2,
    0,
    2,
    2,
    1,
    2,
    1,
    1,
    1,
    4,
    3,
    3,
    3,
    3,
    6,
    3,
    1,
    1,
    2,
    1
  ];
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
  class PhpService extends BaseService {
    constructor(mode) {
      super(mode);
      this.serviceCapabilities = {
        diagnosticProvider: {
          interFileDependencies: true,
          workspaceDiagnostics: true
        }
      };
    }
    async doValidation(document) {
      let value = this.getDocumentValue(document.uri);
      if (!value)
        return [];
      if (this.getOption(document.uri, "inline")) {
        value = "<?" + value + "?>";
      }
      var tokens = PHP.Lexer(value, { short_open_tag: 1 });
      let errors = [];
      try {
        new PHP.Parser(tokens);
      } catch (e) {
        errors.push({
          range: {
            start: {
              line: e.line - 1,
              character: 0
            },
            end: {
              line: e.line - 1,
              character: 0
            }
          },
          message: e.message.charAt(0).toUpperCase() + e.message.substring(1),
          severity: 1
        });
      }
      return filterDiagnostics(errors, this.optionsToFilterDiagnostics);
    }
  }
  exports2.PhpService = PhpService;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
