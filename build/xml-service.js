(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2));
})(this, (function(exports2) {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
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
  var api$8 = {};
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
        return new Promise((resolve, reject2) => {
          this._waiting.push({ thunk, resolve, reject: reject2 });
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
        let timer2;
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
          if (timer2 || messageQueue.size === 0) {
            return;
          }
          timer2 = (0, ral_1.default)().timer.setImmediate(() => {
            timer2 = void 0;
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
              const first2 = args[0];
              let paramStart = 0;
              let parameterStructures = messages_1.ParameterStructures.auto;
              if (messages_1.ParameterStructures.is(first2)) {
                paramStart = 1;
                parameterStructures = first2;
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
              const first2 = args[0];
              const last2 = args[args.length - 1];
              let paramStart = 0;
              let parameterStructures = messages_1.ParameterStructures.auto;
              if (messages_1.ParameterStructures.is(first2)) {
                paramStart = 1;
                parameterStructures = first2;
              }
              let paramEnd = args.length;
              if (cancellation_1.CancellationToken.is(last2)) {
                paramEnd = paramEnd - 1;
                token = last2;
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
            return new Promise(async (resolve, reject2) => {
              const resolveWithCleanup = (r) => {
                resolve(r);
                cancellationStrategy.sender.cleanup(id);
                disposable2 == null ? void 0 : disposable2.dispose();
              };
              const rejectWithCleanup = (r) => {
                reject2(r);
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
  var hasRequiredApi$7;
  function requireApi$7() {
    if (hasRequiredApi$7) return api$8;
    hasRequiredApi$7 = 1;
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
    })(api$8);
    return api$8;
  }
  var hasRequiredRil;
  function requireRil() {
    if (hasRequiredRil) return ril;
    hasRequiredRil = 1;
    Object.defineProperty(ril, "__esModule", { value: true });
    const api_1 = requireApi$7();
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
      const api_1 = requireApi$7();
      __exportStar(requireApi$7(), exports$1);
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
  var api$7 = {};
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
  var hasRequiredApi$6;
  function requireApi$6() {
    if (hasRequiredApi$6) return api$7;
    hasRequiredApi$6 = 1;
    (function(exports$1) {
      var __createBinding = api$7 && api$7.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
      var __exportStar = api$7 && api$7.__exportStar || function(m, exports$12) {
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
    })(api$7);
    return api$7;
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
      __exportStar(requireApi$6(), exports$1);
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
    setOptions(documentUri, options, merge2 = false) {
      this.options[documentUri] = merge2 ? mergeObjects(options, this.options[documentUri]) : options;
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
  var VERSION = "7.1.1";
  function isEmpty(arr) {
    return arr && arr.length === 0;
  }
  function keys(obj) {
    if (obj === void 0 || obj === null) {
      return [];
    }
    return Object.keys(obj);
  }
  function values(obj) {
    var vals = [];
    var keys2 = Object.keys(obj);
    for (var i = 0; i < keys2.length; i++) {
      vals.push(obj[keys2[i]]);
    }
    return vals;
  }
  function mapValues(obj, callback) {
    var result = [];
    var objKeys = keys(obj);
    for (var idx = 0; idx < objKeys.length; idx++) {
      var currKey = objKeys[idx];
      result.push(callback.call(null, obj[currKey], currKey));
    }
    return result;
  }
  function map(arr, callback) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
      result.push(callback.call(null, arr[idx], idx));
    }
    return result;
  }
  function flatten(arr) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
      var currItem = arr[idx];
      if (Array.isArray(currItem)) {
        result = result.concat(flatten(currItem));
      } else {
        result.push(currItem);
      }
    }
    return result;
  }
  function first$1(arr) {
    return isEmpty(arr) ? void 0 : arr[0];
  }
  function last(arr) {
    var len = arr && arr.length;
    return len ? arr[len - 1] : void 0;
  }
  function forEach(collection, iteratorCallback) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iteratorCallback.call(null, collection[i], i);
      }
    } else if (isObject(collection)) {
      var colKeys = keys(collection);
      for (var i = 0; i < colKeys.length; i++) {
        var key = colKeys[i];
        var value = collection[key];
        iteratorCallback.call(null, value, key);
      }
    } else {
      throw Error("non exhaustive match");
    }
  }
  function isString(item) {
    return typeof item === "string";
  }
  function isUndefined(item) {
    return item === void 0;
  }
  function isFunction(item) {
    return item instanceof Function;
  }
  function drop(arr, howMuch) {
    if (howMuch === void 0) {
      howMuch = 1;
    }
    return arr.slice(howMuch, arr.length);
  }
  function dropRight(arr, howMuch) {
    if (howMuch === void 0) {
      howMuch = 1;
    }
    return arr.slice(0, arr.length - howMuch);
  }
  function filter(arr, predicate) {
    var result = [];
    if (Array.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
          result.push(item);
        }
      }
    }
    return result;
  }
  function reject(arr, predicate) {
    return filter(arr, function(item) {
      return !predicate(item);
    });
  }
  function pick(obj, predicate) {
    var keys2 = Object.keys(obj);
    var result = {};
    for (var i = 0; i < keys2.length; i++) {
      var currKey = keys2[i];
      var currItem = obj[currKey];
      if (predicate(currItem)) {
        result[currKey] = currItem;
      }
    }
    return result;
  }
  function has(obj, prop) {
    if (isObject(obj)) {
      return obj.hasOwnProperty(prop);
    }
    return false;
  }
  function contains(arr, item) {
    return find(arr, function(currItem) {
      return currItem === item;
    }) !== void 0 ? true : false;
  }
  function cloneArr(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }
  function cloneObj(obj) {
    var clonedObj = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = obj[key];
      }
    }
    return clonedObj;
  }
  function find(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (predicate.call(null, item)) {
        return item;
      }
    }
    return void 0;
  }
  function findAll(arr, predicate) {
    var found = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (predicate.call(null, item)) {
        found.push(item);
      }
    }
    return found;
  }
  function reduce(arrOrObj, iterator, initial) {
    var isArr = Array.isArray(arrOrObj);
    var vals = isArr ? arrOrObj : values(arrOrObj);
    var objKeys = isArr ? [] : keys(arrOrObj);
    var accumulator = initial;
    for (var i = 0; i < vals.length; i++) {
      accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
    }
    return accumulator;
  }
  function compact(arr) {
    return reject(arr, function(item) {
      return item === null || item === void 0;
    });
  }
  function uniq(arr, identity) {
    if (identity === void 0) {
      identity = function(item) {
        return item;
      };
    }
    var identities = [];
    return reduce(arr, function(result, currItem) {
      var currIdentity = identity(currItem);
      if (contains(identities, currIdentity)) {
        return result;
      } else {
        identities.push(currIdentity);
        return result.concat(currItem);
      }
    }, []);
  }
  function isArray(obj) {
    return Array.isArray(obj);
  }
  function isRegExp(obj) {
    return obj instanceof RegExp;
  }
  function isObject(obj) {
    return obj instanceof Object;
  }
  function every(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (!predicate(arr[i], i)) {
        return false;
      }
    }
    return true;
  }
  function difference(arr, values2) {
    return reject(arr, function(item) {
      return contains(values2, item);
    });
  }
  function some(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return true;
      }
    }
    return false;
  }
  function indexOf(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  }
  function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
      var curSource = sources[i];
      var currSourceKeys = keys(curSource);
      for (var j = 0; j < currSourceKeys.length; j++) {
        var currKey = currSourceKeys[j];
        target[currKey] = curSource[currKey];
      }
    }
    return target;
  }
  function assignNoOverwrite(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
      var curSource = sources[i];
      var currSourceKeys = keys(curSource);
      for (var j = 0; j < currSourceKeys.length; j++) {
        var currKey = currSourceKeys[j];
        if (!has(target, currKey)) {
          target[currKey] = curSource[currKey];
        }
      }
    }
    return target;
  }
  function defaults() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    return assignNoOverwrite.apply(null, [{}].concat(sources));
  }
  function groupBy(arr, groupKeyFunc) {
    var result = {};
    forEach(arr, function(item) {
      var currGroupKey = groupKeyFunc(item);
      var currGroupArr = result[currGroupKey];
      if (currGroupArr) {
        currGroupArr.push(item);
      } else {
        result[currGroupKey] = [item];
      }
    });
    return result;
  }
  function merge(obj1, obj2) {
    var result = cloneObj(obj1);
    var keys2 = keys(obj2);
    for (var i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      var value = obj2[key];
      result[key] = value;
    }
    return result;
  }
  function NOOP() {
  }
  function IDENTITY(item) {
    return item;
  }
  function packArray(holeyArr) {
    var result = [];
    for (var i = 0; i < holeyArr.length; i++) {
      var orgValue = holeyArr[i];
      result.push(orgValue !== void 0 ? orgValue : void 0);
    }
    return result;
  }
  function PRINT_ERROR(msg) {
    if (console && console.error) {
      console.error("Error: " + msg);
    }
  }
  function PRINT_WARNING(msg) {
    if (console && console.warn) {
      console.warn("Warning: " + msg);
    }
  }
  function isES2015MapSupported() {
    return typeof Map === "function";
  }
  function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function(baseCtor) {
      var baseProto = baseCtor.prototype;
      Object.getOwnPropertyNames(baseProto).forEach(function(propName) {
        if (propName === "constructor") {
          return;
        }
        var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
        if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
          Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
        } else {
          derivedCtor.prototype[propName] = baseCtor.prototype[propName];
        }
      });
    });
  }
  function toFastProperties(toBecomeFast) {
    function FakeConstructor() {
    }
    FakeConstructor.prototype = toBecomeFast;
    var fakeInstance = new FakeConstructor();
    function fakeAccess() {
      return typeof fakeInstance.bar;
    }
    fakeAccess();
    fakeAccess();
    return toBecomeFast;
  }
  function peek(arr) {
    return arr[arr.length - 1];
  }
  function timer(func) {
    var start = (/* @__PURE__ */ new Date()).getTime();
    var val = func();
    var end = (/* @__PURE__ */ new Date()).getTime();
    var total = end - start;
    return { time: total, value: val };
  }
  var regexpToAst$1 = { exports: {} };
  var regexpToAst = regexpToAst$1.exports;
  var hasRequiredRegexpToAst;
  function requireRegexpToAst() {
    if (hasRequiredRegexpToAst) return regexpToAst$1.exports;
    hasRequiredRegexpToAst = 1;
    (function(module2) {
      (function(root, factory) {
        if (module2.exports) {
          module2.exports = factory();
        } else {
          root.regexpToAst = factory();
        }
      })(
        typeof self !== "undefined" ? (
          // istanbul ignore next
          self
        ) : regexpToAst,
        function() {
          function RegExpParser() {
          }
          RegExpParser.prototype.saveState = function() {
            return {
              idx: this.idx,
              input: this.input,
              groupIdx: this.groupIdx
            };
          };
          RegExpParser.prototype.restoreState = function(newState) {
            this.idx = newState.idx;
            this.input = newState.input;
            this.groupIdx = newState.groupIdx;
          };
          RegExpParser.prototype.pattern = function(input) {
            this.idx = 0;
            this.input = input;
            this.groupIdx = 0;
            this.consumeChar("/");
            var value = this.disjunction();
            this.consumeChar("/");
            var flags = {
              type: "Flags",
              loc: { begin: this.idx, end: input.length },
              global: false,
              ignoreCase: false,
              multiLine: false,
              unicode: false,
              sticky: false
            };
            while (this.isRegExpFlag()) {
              switch (this.popChar()) {
                case "g":
                  addFlag(flags, "global");
                  break;
                case "i":
                  addFlag(flags, "ignoreCase");
                  break;
                case "m":
                  addFlag(flags, "multiLine");
                  break;
                case "u":
                  addFlag(flags, "unicode");
                  break;
                case "y":
                  addFlag(flags, "sticky");
                  break;
              }
            }
            if (this.idx !== this.input.length) {
              throw Error(
                "Redundant input: " + this.input.substring(this.idx)
              );
            }
            return {
              type: "Pattern",
              flags,
              value,
              loc: this.loc(0)
            };
          };
          RegExpParser.prototype.disjunction = function() {
            var alts = [];
            var begin = this.idx;
            alts.push(this.alternative());
            while (this.peekChar() === "|") {
              this.consumeChar("|");
              alts.push(this.alternative());
            }
            return { type: "Disjunction", value: alts, loc: this.loc(begin) };
          };
          RegExpParser.prototype.alternative = function() {
            var terms = [];
            var begin = this.idx;
            while (this.isTerm()) {
              terms.push(this.term());
            }
            return { type: "Alternative", value: terms, loc: this.loc(begin) };
          };
          RegExpParser.prototype.term = function() {
            if (this.isAssertion()) {
              return this.assertion();
            } else {
              return this.atom();
            }
          };
          RegExpParser.prototype.assertion = function() {
            var begin = this.idx;
            switch (this.popChar()) {
              case "^":
                return {
                  type: "StartAnchor",
                  loc: this.loc(begin)
                };
              case "$":
                return { type: "EndAnchor", loc: this.loc(begin) };
              // '\b' or '\B'
              case "\\":
                switch (this.popChar()) {
                  case "b":
                    return {
                      type: "WordBoundary",
                      loc: this.loc(begin)
                    };
                  case "B":
                    return {
                      type: "NonWordBoundary",
                      loc: this.loc(begin)
                    };
                }
                throw Error("Invalid Assertion Escape");
              // '(?=' or '(?!'
              case "(":
                this.consumeChar("?");
                var type;
                switch (this.popChar()) {
                  case "=":
                    type = "Lookahead";
                    break;
                  case "!":
                    type = "NegativeLookahead";
                    break;
                }
                ASSERT_EXISTS(type);
                var disjunction = this.disjunction();
                this.consumeChar(")");
                return {
                  type,
                  value: disjunction,
                  loc: this.loc(begin)
                };
            }
            ASSERT_NEVER_REACH_HERE();
          };
          RegExpParser.prototype.quantifier = function(isBacktracking) {
            var range;
            var begin = this.idx;
            switch (this.popChar()) {
              case "*":
                range = {
                  atLeast: 0,
                  atMost: Infinity
                };
                break;
              case "+":
                range = {
                  atLeast: 1,
                  atMost: Infinity
                };
                break;
              case "?":
                range = {
                  atLeast: 0,
                  atMost: 1
                };
                break;
              case "{":
                var atLeast = this.integerIncludingZero();
                switch (this.popChar()) {
                  case "}":
                    range = {
                      atLeast,
                      atMost: atLeast
                    };
                    break;
                  case ",":
                    var atMost;
                    if (this.isDigit()) {
                      atMost = this.integerIncludingZero();
                      range = {
                        atLeast,
                        atMost
                      };
                    } else {
                      range = {
                        atLeast,
                        atMost: Infinity
                      };
                    }
                    this.consumeChar("}");
                    break;
                }
                if (isBacktracking === true && range === void 0) {
                  return void 0;
                }
                ASSERT_EXISTS(range);
                break;
            }
            if (isBacktracking === true && range === void 0) {
              return void 0;
            }
            ASSERT_EXISTS(range);
            if (this.peekChar(0) === "?") {
              this.consumeChar("?");
              range.greedy = false;
            } else {
              range.greedy = true;
            }
            range.type = "Quantifier";
            range.loc = this.loc(begin);
            return range;
          };
          RegExpParser.prototype.atom = function() {
            var atom;
            var begin = this.idx;
            switch (this.peekChar()) {
              case ".":
                atom = this.dotAll();
                break;
              case "\\":
                atom = this.atomEscape();
                break;
              case "[":
                atom = this.characterClass();
                break;
              case "(":
                atom = this.group();
                break;
            }
            if (atom === void 0 && this.isPatternCharacter()) {
              atom = this.patternCharacter();
            }
            ASSERT_EXISTS(atom);
            atom.loc = this.loc(begin);
            if (this.isQuantifier()) {
              atom.quantifier = this.quantifier();
            }
            return atom;
          };
          RegExpParser.prototype.dotAll = function() {
            this.consumeChar(".");
            return {
              type: "Set",
              complement: true,
              value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
            };
          };
          RegExpParser.prototype.atomEscape = function() {
            this.consumeChar("\\");
            switch (this.peekChar()) {
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                return this.decimalEscapeAtom();
              case "d":
              case "D":
              case "s":
              case "S":
              case "w":
              case "W":
                return this.characterClassEscape();
              case "f":
              case "n":
              case "r":
              case "t":
              case "v":
                return this.controlEscapeAtom();
              case "c":
                return this.controlLetterEscapeAtom();
              case "0":
                return this.nulCharacterAtom();
              case "x":
                return this.hexEscapeSequenceAtom();
              case "u":
                return this.regExpUnicodeEscapeSequenceAtom();
              default:
                return this.identityEscapeAtom();
            }
          };
          RegExpParser.prototype.decimalEscapeAtom = function() {
            var value = this.positiveInteger();
            return { type: "GroupBackReference", value };
          };
          RegExpParser.prototype.characterClassEscape = function() {
            var set;
            var complement = false;
            switch (this.popChar()) {
              case "d":
                set = digitsCharCodes;
                break;
              case "D":
                set = digitsCharCodes;
                complement = true;
                break;
              case "s":
                set = whitespaceCodes;
                break;
              case "S":
                set = whitespaceCodes;
                complement = true;
                break;
              case "w":
                set = wordCharCodes;
                break;
              case "W":
                set = wordCharCodes;
                complement = true;
                break;
            }
            ASSERT_EXISTS(set);
            return { type: "Set", value: set, complement };
          };
          RegExpParser.prototype.controlEscapeAtom = function() {
            var escapeCode;
            switch (this.popChar()) {
              case "f":
                escapeCode = cc("\f");
                break;
              case "n":
                escapeCode = cc("\n");
                break;
              case "r":
                escapeCode = cc("\r");
                break;
              case "t":
                escapeCode = cc("	");
                break;
              case "v":
                escapeCode = cc("\v");
                break;
            }
            ASSERT_EXISTS(escapeCode);
            return { type: "Character", value: escapeCode };
          };
          RegExpParser.prototype.controlLetterEscapeAtom = function() {
            this.consumeChar("c");
            var letter = this.popChar();
            if (/[a-zA-Z]/.test(letter) === false) {
              throw Error("Invalid ");
            }
            var letterCode = letter.toUpperCase().charCodeAt(0) - 64;
            return { type: "Character", value: letterCode };
          };
          RegExpParser.prototype.nulCharacterAtom = function() {
            this.consumeChar("0");
            return { type: "Character", value: cc("\0") };
          };
          RegExpParser.prototype.hexEscapeSequenceAtom = function() {
            this.consumeChar("x");
            return this.parseHexDigits(2);
          };
          RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function() {
            this.consumeChar("u");
            return this.parseHexDigits(4);
          };
          RegExpParser.prototype.identityEscapeAtom = function() {
            var escapedChar = this.popChar();
            return { type: "Character", value: cc(escapedChar) };
          };
          RegExpParser.prototype.classPatternCharacterAtom = function() {
            switch (this.peekChar()) {
              // istanbul ignore next
              case "\n":
              // istanbul ignore next
              case "\r":
              // istanbul ignore next
              case "\u2028":
              // istanbul ignore next
              case "\u2029":
              // istanbul ignore next
              case "\\":
              // istanbul ignore next
              case "]":
                throw Error("TBD");
              default:
                var nextChar = this.popChar();
                return { type: "Character", value: cc(nextChar) };
            }
          };
          RegExpParser.prototype.characterClass = function() {
            var set = [];
            var complement = false;
            this.consumeChar("[");
            if (this.peekChar(0) === "^") {
              this.consumeChar("^");
              complement = true;
            }
            while (this.isClassAtom()) {
              var from = this.classAtom();
              var isFromSingleChar = from.type === "Character";
              if (isFromSingleChar && this.isRangeDash()) {
                this.consumeChar("-");
                var to = this.classAtom();
                var isToSingleChar = to.type === "Character";
                if (isToSingleChar) {
                  if (to.value < from.value) {
                    throw Error("Range out of order in character class");
                  }
                  set.push({ from: from.value, to: to.value });
                } else {
                  insertToSet(from.value, set);
                  set.push(cc("-"));
                  insertToSet(to.value, set);
                }
              } else {
                insertToSet(from.value, set);
              }
            }
            this.consumeChar("]");
            return { type: "Set", complement, value: set };
          };
          RegExpParser.prototype.classAtom = function() {
            switch (this.peekChar()) {
              // istanbul ignore next
              case "]":
              // istanbul ignore next
              case "\n":
              // istanbul ignore next
              case "\r":
              // istanbul ignore next
              case "\u2028":
              // istanbul ignore next
              case "\u2029":
                throw Error("TBD");
              case "\\":
                return this.classEscape();
              default:
                return this.classPatternCharacterAtom();
            }
          };
          RegExpParser.prototype.classEscape = function() {
            this.consumeChar("\\");
            switch (this.peekChar()) {
              // Matches a backspace.
              // (Not to be confused with \b word boundary outside characterClass)
              case "b":
                this.consumeChar("b");
                return { type: "Character", value: cc("\b") };
              case "d":
              case "D":
              case "s":
              case "S":
              case "w":
              case "W":
                return this.characterClassEscape();
              case "f":
              case "n":
              case "r":
              case "t":
              case "v":
                return this.controlEscapeAtom();
              case "c":
                return this.controlLetterEscapeAtom();
              case "0":
                return this.nulCharacterAtom();
              case "x":
                return this.hexEscapeSequenceAtom();
              case "u":
                return this.regExpUnicodeEscapeSequenceAtom();
              default:
                return this.identityEscapeAtom();
            }
          };
          RegExpParser.prototype.group = function() {
            var capturing = true;
            this.consumeChar("(");
            switch (this.peekChar(0)) {
              case "?":
                this.consumeChar("?");
                this.consumeChar(":");
                capturing = false;
                break;
              default:
                this.groupIdx++;
                break;
            }
            var value = this.disjunction();
            this.consumeChar(")");
            var groupAst = {
              type: "Group",
              capturing,
              value
            };
            if (capturing) {
              groupAst.idx = this.groupIdx;
            }
            return groupAst;
          };
          RegExpParser.prototype.positiveInteger = function() {
            var number = this.popChar();
            if (decimalPatternNoZero.test(number) === false) {
              throw Error("Expecting a positive integer");
            }
            while (decimalPattern.test(this.peekChar(0))) {
              number += this.popChar();
            }
            return parseInt(number, 10);
          };
          RegExpParser.prototype.integerIncludingZero = function() {
            var number = this.popChar();
            if (decimalPattern.test(number) === false) {
              throw Error("Expecting an integer");
            }
            while (decimalPattern.test(this.peekChar(0))) {
              number += this.popChar();
            }
            return parseInt(number, 10);
          };
          RegExpParser.prototype.patternCharacter = function() {
            var nextChar = this.popChar();
            switch (nextChar) {
              // istanbul ignore next
              case "\n":
              // istanbul ignore next
              case "\r":
              // istanbul ignore next
              case "\u2028":
              // istanbul ignore next
              case "\u2029":
              // istanbul ignore next
              case "^":
              // istanbul ignore next
              case "$":
              // istanbul ignore next
              case "\\":
              // istanbul ignore next
              case ".":
              // istanbul ignore next
              case "*":
              // istanbul ignore next
              case "+":
              // istanbul ignore next
              case "?":
              // istanbul ignore next
              case "(":
              // istanbul ignore next
              case ")":
              // istanbul ignore next
              case "[":
              // istanbul ignore next
              case "|":
                throw Error("TBD");
              default:
                return { type: "Character", value: cc(nextChar) };
            }
          };
          RegExpParser.prototype.isRegExpFlag = function() {
            switch (this.peekChar(0)) {
              case "g":
              case "i":
              case "m":
              case "u":
              case "y":
                return true;
              default:
                return false;
            }
          };
          RegExpParser.prototype.isRangeDash = function() {
            return this.peekChar() === "-" && this.isClassAtom(1);
          };
          RegExpParser.prototype.isDigit = function() {
            return decimalPattern.test(this.peekChar(0));
          };
          RegExpParser.prototype.isClassAtom = function(howMuch) {
            if (howMuch === void 0) {
              howMuch = 0;
            }
            switch (this.peekChar(howMuch)) {
              case "]":
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                return false;
              default:
                return true;
            }
          };
          RegExpParser.prototype.isTerm = function() {
            return this.isAtom() || this.isAssertion();
          };
          RegExpParser.prototype.isAtom = function() {
            if (this.isPatternCharacter()) {
              return true;
            }
            switch (this.peekChar(0)) {
              case ".":
              case "\\":
              // atomEscape
              case "[":
              // characterClass
              // TODO: isAtom must be called before isAssertion - disambiguate
              case "(":
                return true;
              default:
                return false;
            }
          };
          RegExpParser.prototype.isAssertion = function() {
            switch (this.peekChar(0)) {
              case "^":
              case "$":
                return true;
              // '\b' or '\B'
              case "\\":
                switch (this.peekChar(1)) {
                  case "b":
                  case "B":
                    return true;
                  default:
                    return false;
                }
              // '(?=' or '(?!'
              case "(":
                return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
              default:
                return false;
            }
          };
          RegExpParser.prototype.isQuantifier = function() {
            var prevState = this.saveState();
            try {
              return this.quantifier(true) !== void 0;
            } catch (e) {
              return false;
            } finally {
              this.restoreState(prevState);
            }
          };
          RegExpParser.prototype.isPatternCharacter = function() {
            switch (this.peekChar()) {
              case "^":
              case "$":
              case "\\":
              case ".":
              case "*":
              case "+":
              case "?":
              case "(":
              case ")":
              case "[":
              case "|":
              case "/":
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                return false;
              default:
                return true;
            }
          };
          RegExpParser.prototype.parseHexDigits = function(howMany) {
            var hexString = "";
            for (var i2 = 0; i2 < howMany; i2++) {
              var hexChar = this.popChar();
              if (hexDigitPattern.test(hexChar) === false) {
                throw Error("Expecting a HexDecimal digits");
              }
              hexString += hexChar;
            }
            var charCode = parseInt(hexString, 16);
            return { type: "Character", value: charCode };
          };
          RegExpParser.prototype.peekChar = function(howMuch) {
            if (howMuch === void 0) {
              howMuch = 0;
            }
            return this.input[this.idx + howMuch];
          };
          RegExpParser.prototype.popChar = function() {
            var nextChar = this.peekChar(0);
            this.consumeChar();
            return nextChar;
          };
          RegExpParser.prototype.consumeChar = function(char) {
            if (char !== void 0 && this.input[this.idx] !== char) {
              throw Error(
                "Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx
              );
            }
            if (this.idx >= this.input.length) {
              throw Error("Unexpected end of input");
            }
            this.idx++;
          };
          RegExpParser.prototype.loc = function(begin) {
            return { begin, end: this.idx };
          };
          var hexDigitPattern = /[0-9a-fA-F]/;
          var decimalPattern = /[0-9]/;
          var decimalPatternNoZero = /[1-9]/;
          function cc(char) {
            return char.charCodeAt(0);
          }
          function insertToSet(item, set) {
            if (item.length !== void 0) {
              item.forEach(function(subItem) {
                set.push(subItem);
              });
            } else {
              set.push(item);
            }
          }
          function addFlag(flagObj, flagKey) {
            if (flagObj[flagKey] === true) {
              throw "duplicate flag " + flagKey;
            }
            flagObj[flagKey] = true;
          }
          function ASSERT_EXISTS(obj) {
            if (obj === void 0) {
              throw Error("Internal Error - Should never get here!");
            }
          }
          function ASSERT_NEVER_REACH_HERE() {
            throw Error("Internal Error - Should never get here!");
          }
          var i;
          var digitsCharCodes = [];
          for (i = cc("0"); i <= cc("9"); i++) {
            digitsCharCodes.push(i);
          }
          var wordCharCodes = [cc("_")].concat(digitsCharCodes);
          for (i = cc("a"); i <= cc("z"); i++) {
            wordCharCodes.push(i);
          }
          for (i = cc("A"); i <= cc("Z"); i++) {
            wordCharCodes.push(i);
          }
          var whitespaceCodes = [
            cc(" "),
            cc("\f"),
            cc("\n"),
            cc("\r"),
            cc("	"),
            cc("\v"),
            cc("	"),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc(" "),
            cc("\u2028"),
            cc("\u2029"),
            cc(" "),
            cc(" "),
            cc("　"),
            cc("\uFEFF")
          ];
          function BaseRegExpVisitor() {
          }
          BaseRegExpVisitor.prototype.visitChildren = function(node) {
            for (var key in node) {
              var child = node[key];
              if (node.hasOwnProperty(key)) {
                if (child.type !== void 0) {
                  this.visit(child);
                } else if (Array.isArray(child)) {
                  child.forEach(function(subChild) {
                    this.visit(subChild);
                  }, this);
                }
              }
            }
          };
          BaseRegExpVisitor.prototype.visit = function(node) {
            switch (node.type) {
              case "Pattern":
                this.visitPattern(node);
                break;
              case "Flags":
                this.visitFlags(node);
                break;
              case "Disjunction":
                this.visitDisjunction(node);
                break;
              case "Alternative":
                this.visitAlternative(node);
                break;
              case "StartAnchor":
                this.visitStartAnchor(node);
                break;
              case "EndAnchor":
                this.visitEndAnchor(node);
                break;
              case "WordBoundary":
                this.visitWordBoundary(node);
                break;
              case "NonWordBoundary":
                this.visitNonWordBoundary(node);
                break;
              case "Lookahead":
                this.visitLookahead(node);
                break;
              case "NegativeLookahead":
                this.visitNegativeLookahead(node);
                break;
              case "Character":
                this.visitCharacter(node);
                break;
              case "Set":
                this.visitSet(node);
                break;
              case "Group":
                this.visitGroup(node);
                break;
              case "GroupBackReference":
                this.visitGroupBackReference(node);
                break;
              case "Quantifier":
                this.visitQuantifier(node);
                break;
            }
            this.visitChildren(node);
          };
          BaseRegExpVisitor.prototype.visitPattern = function(node) {
          };
          BaseRegExpVisitor.prototype.visitFlags = function(node) {
          };
          BaseRegExpVisitor.prototype.visitDisjunction = function(node) {
          };
          BaseRegExpVisitor.prototype.visitAlternative = function(node) {
          };
          BaseRegExpVisitor.prototype.visitStartAnchor = function(node) {
          };
          BaseRegExpVisitor.prototype.visitEndAnchor = function(node) {
          };
          BaseRegExpVisitor.prototype.visitWordBoundary = function(node) {
          };
          BaseRegExpVisitor.prototype.visitNonWordBoundary = function(node) {
          };
          BaseRegExpVisitor.prototype.visitLookahead = function(node) {
          };
          BaseRegExpVisitor.prototype.visitNegativeLookahead = function(node) {
          };
          BaseRegExpVisitor.prototype.visitCharacter = function(node) {
          };
          BaseRegExpVisitor.prototype.visitSet = function(node) {
          };
          BaseRegExpVisitor.prototype.visitGroup = function(node) {
          };
          BaseRegExpVisitor.prototype.visitGroupBackReference = function(node) {
          };
          BaseRegExpVisitor.prototype.visitQuantifier = function(node) {
          };
          return {
            RegExpParser,
            BaseRegExpVisitor,
            VERSION: "0.5.0"
          };
        }
      );
    })(regexpToAst$1);
    return regexpToAst$1.exports;
  }
  var regexpToAstExports = requireRegexpToAst();
  var regExpAstCache = {};
  var regExpParser = new regexpToAstExports.RegExpParser();
  function getRegExpAst(regExp) {
    var regExpStr = regExp.toString();
    if (regExpAstCache.hasOwnProperty(regExpStr)) {
      return regExpAstCache[regExpStr];
    } else {
      var regExpAst = regExpParser.pattern(regExpStr);
      regExpAstCache[regExpStr] = regExpAst;
      return regExpAst;
    }
  }
  function clearRegExpParserCache() {
    regExpAstCache = {};
  }
  var __extends$a = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var complementErrorMessage = "Complement Sets are not supported for first char optimization";
  var failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
  function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
    if (ensureOptimizations === void 0) {
      ensureOptimizations = false;
    }
    try {
      var ast = getRegExpAst(regExp);
      var firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
      return firstChars;
    } catch (e) {
      if (e.message === complementErrorMessage) {
        if (ensureOptimizations) {
          PRINT_WARNING("" + failedOptimizationPrefixMsg + ("	Unable to optimize: < " + regExp.toString() + " >\n") + "	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
        }
      } else {
        var msgSuffix = "";
        if (ensureOptimizations) {
          msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
        }
        PRINT_ERROR(failedOptimizationPrefixMsg + "\n" + ("	Failed parsing: < " + regExp.toString() + " >\n") + ("	Using the regexp-to-ast library version: " + regexpToAstExports.VERSION + "\n") + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
      }
    }
    return [];
  }
  function firstCharOptimizedIndices(ast, result, ignoreCase) {
    switch (ast.type) {
      case "Disjunction":
        for (var i = 0; i < ast.value.length; i++) {
          firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
        }
        break;
      case "Alternative":
        var terms = ast.value;
        for (var i = 0; i < terms.length; i++) {
          var term = terms[i];
          switch (term.type) {
            case "EndAnchor":
            // A group back reference cannot affect potential starting char.
            // because if a back reference is the first production than automatically
            // the group being referenced has had to come BEFORE so its codes have already been added
            case "GroupBackReference":
            // assertions do not affect potential starting codes
            case "Lookahead":
            case "NegativeLookahead":
            case "StartAnchor":
            case "WordBoundary":
            case "NonWordBoundary":
              continue;
          }
          var atom = term;
          switch (atom.type) {
            case "Character":
              addOptimizedIdxToResult(atom.value, result, ignoreCase);
              break;
            case "Set":
              if (atom.complement === true) {
                throw Error(complementErrorMessage);
              }
              forEach(atom.value, function(code) {
                if (typeof code === "number") {
                  addOptimizedIdxToResult(code, result, ignoreCase);
                } else {
                  var range = code;
                  if (ignoreCase === true) {
                    for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                      addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                    }
                  } else {
                    for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) {
                      addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                    }
                    if (range.to >= minOptimizationVal) {
                      var minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
                      var maxUnOptVal = range.to;
                      var minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                      var maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
                      for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                        result[currOptIdx] = currOptIdx;
                      }
                    }
                  }
                }
              });
              break;
            case "Group":
              firstCharOptimizedIndices(atom.value, result, ignoreCase);
              break;
            /* istanbul ignore next */
            default:
              throw Error("Non Exhaustive Match");
          }
          var isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
          if (
            // A group may be optional due to empty contents /(?:)/
            // or if everything inside it is optional /((a)?)/
            atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
            atom.type !== "Group" && isOptionalQuantifier === false
          ) {
            break;
          }
        }
        break;
      /* istanbul ignore next */
      default:
        throw Error("non exhaustive match!");
    }
    return values(result);
  }
  function addOptimizedIdxToResult(code, result, ignoreCase) {
    var optimizedCharIdx = charCodeToOptimizedIndex(code);
    result[optimizedCharIdx] = optimizedCharIdx;
    if (ignoreCase === true) {
      handleIgnoreCase(code, result);
    }
  }
  function handleIgnoreCase(code, result) {
    var char = String.fromCharCode(code);
    var upperChar = char.toUpperCase();
    if (upperChar !== char) {
      var optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
      result[optimizedCharIdx] = optimizedCharIdx;
    } else {
      var lowerChar = char.toLowerCase();
      if (lowerChar !== char) {
        var optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
        result[optimizedCharIdx] = optimizedCharIdx;
      }
    }
  }
  function findCode(setNode, targetCharCodes) {
    return find(setNode.value, function(codeOrRange) {
      if (typeof codeOrRange === "number") {
        return contains(targetCharCodes, codeOrRange);
      } else {
        var range_1 = codeOrRange;
        return find(targetCharCodes, function(targetCode) {
          return range_1.from <= targetCode && targetCode <= range_1.to;
        }) !== void 0;
      }
    });
  }
  function isWholeOptional(ast) {
    if (ast.quantifier && ast.quantifier.atLeast === 0) {
      return true;
    }
    if (!ast.value) {
      return false;
    }
    return isArray(ast.value) ? every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
  }
  var CharCodeFinder = (
    /** @class */
    (function(_super) {
      __extends$a(CharCodeFinder2, _super);
      function CharCodeFinder2(targetCharCodes) {
        var _this = _super.call(this) || this;
        _this.targetCharCodes = targetCharCodes;
        _this.found = false;
        return _this;
      }
      CharCodeFinder2.prototype.visitChildren = function(node) {
        if (this.found === true) {
          return;
        }
        switch (node.type) {
          case "Lookahead":
            this.visitLookahead(node);
            return;
          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            return;
        }
        _super.prototype.visitChildren.call(this, node);
      };
      CharCodeFinder2.prototype.visitCharacter = function(node) {
        if (contains(this.targetCharCodes, node.value)) {
          this.found = true;
        }
      };
      CharCodeFinder2.prototype.visitSet = function(node) {
        if (node.complement) {
          if (findCode(node, this.targetCharCodes) === void 0) {
            this.found = true;
          }
        } else {
          if (findCode(node, this.targetCharCodes) !== void 0) {
            this.found = true;
          }
        }
      };
      return CharCodeFinder2;
    })(regexpToAstExports.BaseRegExpVisitor)
  );
  function canMatchCharCode(charCodes, pattern) {
    if (pattern instanceof RegExp) {
      var ast = getRegExpAst(pattern);
      var charCodeFinder = new CharCodeFinder(charCodes);
      charCodeFinder.visit(ast);
      return charCodeFinder.found;
    } else {
      return find(pattern, function(char) {
        return contains(charCodes, char.charCodeAt(0));
      }) !== void 0;
    }
  }
  var __extends$9 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var PATTERN = "PATTERN";
  var DEFAULT_MODE = "defaultMode";
  var MODES = "modes";
  var SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
  function analyzeTokenTypes(tokenTypes, options) {
    options = defaults(options, {
      useSticky: SUPPORT_STICKY,
      debug: false,
      safeMode: false,
      positionTracking: "full",
      lineTerminatorCharacters: ["\r", "\n"],
      tracer: function(msg, action) {
        return action();
      }
    });
    var tracer = options.tracer;
    tracer("initCharCodeToOptimizedIndexMap", function() {
      initCharCodeToOptimizedIndexMap();
    });
    var onlyRelevantTypes;
    tracer("Reject Lexer.NA", function() {
      onlyRelevantTypes = reject(tokenTypes, function(currType) {
        return currType[PATTERN] === Lexer.NA;
      });
    });
    var hasCustom = false;
    var allTransformedPatterns;
    tracer("Transform Patterns", function() {
      hasCustom = false;
      allTransformedPatterns = map(onlyRelevantTypes, function(currType) {
        var currPattern = currType[PATTERN];
        if (isRegExp(currPattern)) {
          var regExpSource = currPattern.source;
          if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
          regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
            return regExpSource;
          } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
          !contains([
            "d",
            "D",
            "s",
            "S",
            "t",
            "r",
            "n",
            "t",
            "0",
            "c",
            "b",
            "B",
            "f",
            "v",
            "w",
            "W"
          ], regExpSource[1])) {
            return regExpSource[1];
          } else {
            return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
          }
        } else if (isFunction(currPattern)) {
          hasCustom = true;
          return { exec: currPattern };
        } else if (has(currPattern, "exec")) {
          hasCustom = true;
          return currPattern;
        } else if (typeof currPattern === "string") {
          if (currPattern.length === 1) {
            return currPattern;
          } else {
            var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
            var wrappedRegExp = new RegExp(escapedRegExpString);
            return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
          }
        } else {
          throw Error("non exhaustive match");
        }
      });
    });
    var patternIdxToType;
    var patternIdxToGroup;
    var patternIdxToLongerAltIdx;
    var patternIdxToPushMode;
    var patternIdxToPopMode;
    tracer("misc mapping", function() {
      patternIdxToType = map(onlyRelevantTypes, function(currType) {
        return currType.tokenTypeIdx;
      });
      patternIdxToGroup = map(onlyRelevantTypes, function(clazz) {
        var groupName = clazz.GROUP;
        if (groupName === Lexer.SKIPPED) {
          return void 0;
        } else if (isString(groupName)) {
          return groupName;
        } else if (isUndefined(groupName)) {
          return false;
        } else {
          throw Error("non exhaustive match");
        }
      });
      patternIdxToLongerAltIdx = map(onlyRelevantTypes, function(clazz) {
        var longerAltType = clazz.LONGER_ALT;
        if (longerAltType) {
          var longerAltIdx = indexOf(onlyRelevantTypes, longerAltType);
          return longerAltIdx;
        }
      });
      patternIdxToPushMode = map(onlyRelevantTypes, function(clazz) {
        return clazz.PUSH_MODE;
      });
      patternIdxToPopMode = map(onlyRelevantTypes, function(clazz) {
        return has(clazz, "POP_MODE");
      });
    });
    var patternIdxToCanLineTerminator;
    tracer("Line Terminator Handling", function() {
      var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
      patternIdxToCanLineTerminator = map(onlyRelevantTypes, function(tokType) {
        return false;
      });
      if (options.positionTracking !== "onlyOffset") {
        patternIdxToCanLineTerminator = map(onlyRelevantTypes, function(tokType) {
          if (has(tokType, "LINE_BREAKS")) {
            return tokType.LINE_BREAKS;
          } else {
            if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) {
              return canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
            }
          }
        });
      }
    });
    var patternIdxToIsCustom;
    var patternIdxToShort;
    var emptyGroups;
    var patternIdxToConfig;
    tracer("Misc Mapping #2", function() {
      patternIdxToIsCustom = map(onlyRelevantTypes, isCustomPattern);
      patternIdxToShort = map(allTransformedPatterns, isShortPattern);
      emptyGroups = reduce(onlyRelevantTypes, function(acc, clazz) {
        var groupName = clazz.GROUP;
        if (isString(groupName) && !(groupName === Lexer.SKIPPED)) {
          acc[groupName] = [];
        }
        return acc;
      }, {});
      patternIdxToConfig = map(allTransformedPatterns, function(x, idx) {
        return {
          pattern: allTransformedPatterns[idx],
          longerAlt: patternIdxToLongerAltIdx[idx],
          canLineTerminator: patternIdxToCanLineTerminator[idx],
          isCustom: patternIdxToIsCustom[idx],
          short: patternIdxToShort[idx],
          group: patternIdxToGroup[idx],
          push: patternIdxToPushMode[idx],
          pop: patternIdxToPopMode[idx],
          tokenTypeIdx: patternIdxToType[idx],
          tokenType: onlyRelevantTypes[idx]
        };
      });
    });
    var canBeOptimized = true;
    var charCodeToPatternIdxToConfig = [];
    if (!options.safeMode) {
      tracer("First Char Optimization", function() {
        charCodeToPatternIdxToConfig = reduce(onlyRelevantTypes, function(result, currTokType, idx) {
          if (typeof currTokType.PATTERN === "string") {
            var charCode = currTokType.PATTERN.charCodeAt(0);
            var optimizedIdx = charCodeToOptimizedIndex(charCode);
            addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
          } else if (isArray(currTokType.START_CHARS_HINT)) {
            var lastOptimizedIdx_1;
            forEach(currTokType.START_CHARS_HINT, function(charOrInt) {
              var charCode2 = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
              var currOptimizedIdx = charCodeToOptimizedIndex(charCode2);
              if (lastOptimizedIdx_1 !== currOptimizedIdx) {
                lastOptimizedIdx_1 = currOptimizedIdx;
                addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
              }
            });
          } else if (isRegExp(currTokType.PATTERN)) {
            if (currTokType.PATTERN.unicode) {
              canBeOptimized = false;
              if (options.ensureOptimizations) {
                PRINT_ERROR("" + failedOptimizationPrefixMsg + ("	Unable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") + "	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
              }
            } else {
              var optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
              if (isEmpty(optimizedCodes)) {
                canBeOptimized = false;
              }
              forEach(optimizedCodes, function(code) {
                addToMapOfArrays(result, code, patternIdxToConfig[idx]);
              });
            }
          } else {
            if (options.ensureOptimizations) {
              PRINT_ERROR("" + failedOptimizationPrefixMsg + ("	TokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") + "	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
            }
            canBeOptimized = false;
          }
          return result;
        }, []);
      });
    }
    tracer("ArrayPacking", function() {
      charCodeToPatternIdxToConfig = packArray(charCodeToPatternIdxToConfig);
    });
    return {
      emptyGroups,
      patternIdxToConfig,
      charCodeToPatternIdxToConfig,
      hasCustom,
      canBeOptimized
    };
  }
  function validatePatterns(tokenTypes, validModesNames) {
    var errors = [];
    var missingResult = findMissingPatterns(tokenTypes);
    errors = errors.concat(missingResult.errors);
    var invalidResult = findInvalidPatterns(missingResult.valid);
    var validTokenTypes = invalidResult.valid;
    errors = errors.concat(invalidResult.errors);
    errors = errors.concat(validateRegExpPattern(validTokenTypes));
    errors = errors.concat(findInvalidGroupType(validTokenTypes));
    errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
    errors = errors.concat(findUnreachablePatterns(validTokenTypes));
    return errors;
  }
  function validateRegExpPattern(tokenTypes) {
    var errors = [];
    var withRegExpPatterns = filter(tokenTypes, function(currTokType) {
      return isRegExp(currTokType[PATTERN]);
    });
    errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
    errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
    errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
    return errors;
  }
  function findMissingPatterns(tokenTypes) {
    var tokenTypesWithMissingPattern = filter(tokenTypes, function(currType) {
      return !has(currType, PATTERN);
    });
    var errors = map(tokenTypesWithMissingPattern, function(currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
        type: LexerDefinitionErrorType.MISSING_PATTERN,
        tokenTypes: [currType]
      };
    });
    var valid = difference(tokenTypes, tokenTypesWithMissingPattern);
    return { errors, valid };
  }
  function findInvalidPatterns(tokenTypes) {
    var tokenTypesWithInvalidPattern = filter(tokenTypes, function(currType) {
      var pattern = currType[PATTERN];
      return !isRegExp(pattern) && !isFunction(pattern) && !has(pattern, "exec") && !isString(pattern);
    });
    var errors = map(tokenTypesWithInvalidPattern, function(currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
        type: LexerDefinitionErrorType.INVALID_PATTERN,
        tokenTypes: [currType]
      };
    });
    var valid = difference(tokenTypes, tokenTypesWithInvalidPattern);
    return { errors, valid };
  }
  var end_of_input = /[^\\][\$]/;
  function findEndOfInputAnchor(tokenTypes) {
    var EndAnchorFinder = (
      /** @class */
      (function(_super) {
        __extends$9(EndAnchorFinder2, _super);
        function EndAnchorFinder2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.found = false;
          return _this;
        }
        EndAnchorFinder2.prototype.visitEndAnchor = function(node) {
          this.found = true;
        };
        return EndAnchorFinder2;
      })(regexpToAstExports.BaseRegExpVisitor)
    );
    var invalidRegex = filter(tokenTypes, function(currType) {
      var pattern = currType[PATTERN];
      try {
        var regexpAst = getRegExpAst(pattern);
        var endAnchorVisitor = new EndAnchorFinder();
        endAnchorVisitor.visit(regexpAst);
        return endAnchorVisitor.found;
      } catch (e) {
        return end_of_input.test(pattern.source);
      }
    });
    var errors = map(invalidRegex, function(currType) {
      return {
        message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
        type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findEmptyMatchRegExps(tokenTypes) {
    var matchesEmptyString = filter(tokenTypes, function(currType) {
      var pattern = currType[PATTERN];
      return pattern.test("");
    });
    var errors = map(matchesEmptyString, function(currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
        type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  var start_of_input = /[^\\[][\^]|^\^/;
  function findStartOfInputAnchor(tokenTypes) {
    var StartAnchorFinder = (
      /** @class */
      (function(_super) {
        __extends$9(StartAnchorFinder2, _super);
        function StartAnchorFinder2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.found = false;
          return _this;
        }
        StartAnchorFinder2.prototype.visitStartAnchor = function(node) {
          this.found = true;
        };
        return StartAnchorFinder2;
      })(regexpToAstExports.BaseRegExpVisitor)
    );
    var invalidRegex = filter(tokenTypes, function(currType) {
      var pattern = currType[PATTERN];
      try {
        var regexpAst = getRegExpAst(pattern);
        var startAnchorVisitor = new StartAnchorFinder();
        startAnchorVisitor.visit(regexpAst);
        return startAnchorVisitor.found;
      } catch (e) {
        return start_of_input.test(pattern.source);
      }
    });
    var errors = map(invalidRegex, function(currType) {
      return {
        message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
        type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findUnsupportedFlags(tokenTypes) {
    var invalidFlags = filter(tokenTypes, function(currType) {
      var pattern = currType[PATTERN];
      return pattern instanceof RegExp && (pattern.multiline || pattern.global);
    });
    var errors = map(invalidFlags, function(currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
        type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findDuplicatePatterns(tokenTypes) {
    var found = [];
    var identicalPatterns = map(tokenTypes, function(outerType) {
      return reduce(tokenTypes, function(result, innerType) {
        if (outerType.PATTERN.source === innerType.PATTERN.source && !contains(found, innerType) && innerType.PATTERN !== Lexer.NA) {
          found.push(innerType);
          result.push(innerType);
          return result;
        }
        return result;
      }, []);
    });
    identicalPatterns = compact(identicalPatterns);
    var duplicatePatterns = filter(identicalPatterns, function(currIdenticalSet) {
      return currIdenticalSet.length > 1;
    });
    var errors = map(duplicatePatterns, function(setOfIdentical) {
      var tokenTypeNames = map(setOfIdentical, function(currType) {
        return currType.name;
      });
      var dupPatternSrc = first$1(setOfIdentical).PATTERN;
      return {
        message: "The same RegExp pattern ->" + dupPatternSrc + "<-" + ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
        type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
        tokenTypes: setOfIdentical
      };
    });
    return errors;
  }
  function findInvalidGroupType(tokenTypes) {
    var invalidTypes = filter(tokenTypes, function(clazz) {
      if (!has(clazz, "GROUP")) {
        return false;
      }
      var group = clazz.GROUP;
      return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString(group);
    });
    var errors = map(invalidTypes, function(currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
        type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findModesThatDoNotExist(tokenTypes, validModes) {
    var invalidModes = filter(tokenTypes, function(clazz) {
      return clazz.PUSH_MODE !== void 0 && !contains(validModes, clazz.PUSH_MODE);
    });
    var errors = map(invalidModes, function(tokType) {
      var msg = "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-which does not exist";
      return {
        message: msg,
        type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
        tokenTypes: [tokType]
      };
    });
    return errors;
  }
  function findUnreachablePatterns(tokenTypes) {
    var errors = [];
    var canBeTested = reduce(tokenTypes, function(result, tokType, idx) {
      var pattern = tokType.PATTERN;
      if (pattern === Lexer.NA) {
        return result;
      }
      if (isString(pattern)) {
        result.push({ str: pattern, idx, tokenType: tokType });
      } else if (isRegExp(pattern) && noMetaChar(pattern)) {
        result.push({ str: pattern.source, idx, tokenType: tokType });
      }
      return result;
    }, []);
    forEach(tokenTypes, function(tokType, testIdx) {
      forEach(canBeTested, function(_a) {
        var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
        if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
          var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" + ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") + "in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
          errors.push({
            message: msg,
            type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
            tokenTypes: [tokType, tokenType]
          });
        }
      });
    });
    return errors;
  }
  function testTokenType(str, pattern) {
    if (isRegExp(pattern)) {
      var regExpArray = pattern.exec(str);
      return regExpArray !== null && regExpArray.index === 0;
    } else if (isFunction(pattern)) {
      return pattern(str, 0, [], {});
    } else if (has(pattern, "exec")) {
      return pattern.exec(str, 0, [], {});
    } else if (typeof pattern === "string") {
      return pattern === str;
    } else {
      throw Error("non exhaustive match");
    }
  }
  function noMetaChar(regExp) {
    var metaChars = [
      ".",
      "\\",
      "[",
      "]",
      "|",
      "^",
      "$",
      "(",
      ")",
      "?",
      "*",
      "+",
      "{"
    ];
    return find(metaChars, function(char) {
      return regExp.source.indexOf(char) !== -1;
    }) === void 0;
  }
  function addStartOfInput(pattern) {
    var flags = pattern.ignoreCase ? "i" : "";
    return new RegExp("^(?:" + pattern.source + ")", flags);
  }
  function addStickyFlag(pattern) {
    var flags = pattern.ignoreCase ? "iy" : "y";
    return new RegExp("" + pattern.source, flags);
  }
  function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var errors = [];
    if (!has(lexerDefinition, DEFAULT_MODE)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
      });
    }
    if (!has(lexerDefinition, MODES)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
      });
    }
    if (has(lexerDefinition, MODES) && has(lexerDefinition, DEFAULT_MODE) && !has(lexerDefinition.modes, lexerDefinition.defaultMode)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized with a " + DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">which does not exist\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
      });
    }
    if (has(lexerDefinition, MODES)) {
      forEach(lexerDefinition.modes, function(currModeValue, currModeName) {
        forEach(currModeValue, function(currTokType, currIdx) {
          if (isUndefined(currTokType)) {
            errors.push({
              message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
              type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
            });
          }
        });
      });
    }
    return errors;
  }
  function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var warnings = [];
    var hasAnyLineBreak = false;
    var allTokenTypes = compact(flatten(mapValues(lexerDefinition.modes, function(tokTypes) {
      return tokTypes;
    })));
    var concreteTokenTypes = reject(allTokenTypes, function(currType) {
      return currType[PATTERN] === Lexer.NA;
    });
    var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
    if (trackLines) {
      forEach(concreteTokenTypes, function(tokType) {
        var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
        if (currIssue !== false) {
          var message = buildLineBreakIssueMessage(tokType, currIssue);
          var warningDescriptor = {
            message,
            type: currIssue.issue,
            tokenType: tokType
          };
          warnings.push(warningDescriptor);
        } else {
          if (has(tokType, "LINE_BREAKS")) {
            if (tokType.LINE_BREAKS === true) {
              hasAnyLineBreak = true;
            }
          } else {
            if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
              hasAnyLineBreak = true;
            }
          }
        }
      });
    }
    if (trackLines && !hasAnyLineBreak) {
      warnings.push({
        message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
        type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
      });
    }
    return warnings;
  }
  function cloneEmptyGroups(emptyGroups) {
    var clonedResult = {};
    var groupKeys = keys(emptyGroups);
    forEach(groupKeys, function(currKey) {
      var currGroupValue = emptyGroups[currKey];
      if (isArray(currGroupValue)) {
        clonedResult[currKey] = [];
      } else {
        throw Error("non exhaustive match");
      }
    });
    return clonedResult;
  }
  function isCustomPattern(tokenType) {
    var pattern = tokenType.PATTERN;
    if (isRegExp(pattern)) {
      return false;
    } else if (isFunction(pattern)) {
      return true;
    } else if (has(pattern, "exec")) {
      return true;
    } else if (isString(pattern)) {
      return false;
    } else {
      throw Error("non exhaustive match");
    }
  }
  function isShortPattern(pattern) {
    if (isString(pattern) && pattern.length === 1) {
      return pattern.charCodeAt(0);
    } else {
      return false;
    }
  }
  var LineTerminatorOptimizedTester = {
    // implements /\n|\r\n?/g.test
    test: function(text) {
      var len = text.length;
      for (var i = this.lastIndex; i < len; i++) {
        var c = text.charCodeAt(i);
        if (c === 10) {
          this.lastIndex = i + 1;
          return true;
        } else if (c === 13) {
          if (text.charCodeAt(i + 1) === 10) {
            this.lastIndex = i + 2;
          } else {
            this.lastIndex = i + 1;
          }
          return true;
        }
      }
      return false;
    },
    lastIndex: 0
  };
  function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
    if (has(tokType, "LINE_BREAKS")) {
      return false;
    } else {
      if (isRegExp(tokType.PATTERN)) {
        try {
          canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
        } catch (e) {
          return {
            issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
            errMsg: e.message
          };
        }
        return false;
      } else if (isString(tokType.PATTERN)) {
        return false;
      } else if (isCustomPattern(tokType)) {
        return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
      } else {
        throw Error("non exhaustive match");
      }
    }
  }
  function buildLineBreakIssueMessage(tokType, details) {
    if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
      return "Warning: unable to identify line terminator usage in pattern.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + ("	 Root cause: " + details.errMsg + ".\n") + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
    } else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
      return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
    } else {
      throw Error("non exhaustive match");
    }
  }
  function getCharCodes(charsOrCodes) {
    var charCodes = map(charsOrCodes, function(numOrString) {
      if (isString(numOrString) && numOrString.length > 0) {
        return numOrString.charCodeAt(0);
      } else {
        return numOrString;
      }
    });
    return charCodes;
  }
  function addToMapOfArrays(map2, key, value) {
    if (map2[key] === void 0) {
      map2[key] = [value];
    } else {
      map2[key].push(value);
    }
  }
  var minOptimizationVal = 256;
  function charCodeToOptimizedIndex(charCode) {
    return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
  }
  var charCodeToOptimizedIdxMap = [];
  function initCharCodeToOptimizedIndexMap() {
    if (isEmpty(charCodeToOptimizedIdxMap)) {
      charCodeToOptimizedIdxMap = new Array(65536);
      for (var i = 0; i < 65536; i++) {
        charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
      }
    }
  }
  function tokenStructuredMatcher(tokInstance, tokConstructor) {
    var instanceType = tokInstance.tokenTypeIdx;
    if (instanceType === tokConstructor.tokenTypeIdx) {
      return true;
    } else {
      return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
    }
  }
  function tokenStructuredMatcherNoCategories(token, tokType) {
    return token.tokenTypeIdx === tokType.tokenTypeIdx;
  }
  var tokenShortNameIdx = 1;
  var tokenIdxToClass = {};
  function augmentTokenTypes(tokenTypes) {
    var tokenTypesAndParents = expandCategories(tokenTypes);
    assignTokenDefaultProps(tokenTypesAndParents);
    assignCategoriesMapProp(tokenTypesAndParents);
    assignCategoriesTokensProp(tokenTypesAndParents);
    forEach(tokenTypesAndParents, function(tokType) {
      tokType.isParent = tokType.categoryMatches.length > 0;
    });
  }
  function expandCategories(tokenTypes) {
    var result = cloneArr(tokenTypes);
    var categories = tokenTypes;
    var searching = true;
    while (searching) {
      categories = compact(flatten(map(categories, function(currTokType) {
        return currTokType.CATEGORIES;
      })));
      var newCategories = difference(categories, result);
      result = result.concat(newCategories);
      if (isEmpty(newCategories)) {
        searching = false;
      } else {
        categories = newCategories;
      }
    }
    return result;
  }
  function assignTokenDefaultProps(tokenTypes) {
    forEach(tokenTypes, function(currTokType) {
      if (!hasShortKeyProperty(currTokType)) {
        tokenIdxToClass[tokenShortNameIdx] = currTokType;
        currTokType.tokenTypeIdx = tokenShortNameIdx++;
      }
      if (hasCategoriesProperty(currTokType) && !isArray(currTokType.CATEGORIES)) {
        currTokType.CATEGORIES = [currTokType.CATEGORIES];
      }
      if (!hasCategoriesProperty(currTokType)) {
        currTokType.CATEGORIES = [];
      }
      if (!hasExtendingTokensTypesProperty(currTokType)) {
        currTokType.categoryMatches = [];
      }
      if (!hasExtendingTokensTypesMapProperty(currTokType)) {
        currTokType.categoryMatchesMap = {};
      }
    });
  }
  function assignCategoriesTokensProp(tokenTypes) {
    forEach(tokenTypes, function(currTokType) {
      currTokType.categoryMatches = [];
      forEach(currTokType.categoryMatchesMap, function(val, key) {
        currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
      });
    });
  }
  function assignCategoriesMapProp(tokenTypes) {
    forEach(tokenTypes, function(currTokType) {
      singleAssignCategoriesToksMap([], currTokType);
    });
  }
  function singleAssignCategoriesToksMap(path2, nextNode) {
    forEach(path2, function(pathNode) {
      nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
    });
    forEach(nextNode.CATEGORIES, function(nextCategory) {
      var newPath = path2.concat(nextNode);
      if (!contains(newPath, nextCategory)) {
        singleAssignCategoriesToksMap(newPath, nextCategory);
      }
    });
  }
  function hasShortKeyProperty(tokType) {
    return has(tokType, "tokenTypeIdx");
  }
  function hasCategoriesProperty(tokType) {
    return has(tokType, "CATEGORIES");
  }
  function hasExtendingTokensTypesProperty(tokType) {
    return has(tokType, "categoryMatches");
  }
  function hasExtendingTokensTypesMapProperty(tokType) {
    return has(tokType, "categoryMatchesMap");
  }
  function isTokenType(tokType) {
    return has(tokType, "tokenTypeIdx");
  }
  var defaultLexerErrorProvider = {
    buildUnableToPopLexerModeMessage: function(token) {
      return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
    },
    buildUnexpectedCharactersMessage: function(fullText, startOffset, length, line, column) {
      return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters.");
    }
  };
  var LexerDefinitionErrorType;
  (function(LexerDefinitionErrorType2) {
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
    LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
  })(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
  var DEFAULT_LEXER_CONFIG = {
    deferDefinitionErrorsHandling: false,
    positionTracking: "full",
    lineTerminatorsPattern: /\n|\r\n?/g,
    lineTerminatorCharacters: ["\n", "\r"],
    ensureOptimizations: false,
    safeMode: false,
    errorMessageProvider: defaultLexerErrorProvider,
    traceInitPerf: false,
    skipValidations: false
  };
  Object.freeze(DEFAULT_LEXER_CONFIG);
  var Lexer = (
    /** @class */
    (function() {
      function Lexer2(lexerDefinition, config) {
        var _this = this;
        if (config === void 0) {
          config = DEFAULT_LEXER_CONFIG;
        }
        this.lexerDefinition = lexerDefinition;
        this.lexerDefinitionErrors = [];
        this.lexerDefinitionWarning = [];
        this.patternIdxToConfig = {};
        this.charCodeToPatternIdxToConfig = {};
        this.modes = [];
        this.emptyGroups = {};
        this.config = void 0;
        this.trackStartLines = true;
        this.trackEndLines = true;
        this.hasCustom = false;
        this.canModeBeOptimized = {};
        if (typeof config === "boolean") {
          throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
        }
        this.config = merge(DEFAULT_LEXER_CONFIG, config);
        var traceInitVal = this.config.traceInitPerf;
        if (traceInitVal === true) {
          this.traceInitMaxIdent = Infinity;
          this.traceInitPerf = true;
        } else if (typeof traceInitVal === "number") {
          this.traceInitMaxIdent = traceInitVal;
          this.traceInitPerf = true;
        }
        this.traceInitIndent = -1;
        this.TRACE_INIT("Lexer Constructor", function() {
          var actualDefinition;
          var hasOnlySingleMode = true;
          _this.TRACE_INIT("Lexer Config handling", function() {
            if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
              _this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
            } else {
              if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
                throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
              }
            }
            if (config.safeMode && config.ensureOptimizations) {
              throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
            }
            _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
            _this.trackEndLines = /full/i.test(_this.config.positionTracking);
            if (isArray(lexerDefinition)) {
              actualDefinition = { modes: {} };
              actualDefinition.modes[DEFAULT_MODE] = cloneArr(lexerDefinition);
              actualDefinition[DEFAULT_MODE] = DEFAULT_MODE;
            } else {
              hasOnlySingleMode = false;
              actualDefinition = cloneObj(lexerDefinition);
            }
          });
          if (_this.config.skipValidations === false) {
            _this.TRACE_INIT("performRuntimeChecks", function() {
              _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            });
            _this.TRACE_INIT("performWarningRuntimeChecks", function() {
              _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            });
          }
          actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
          forEach(actualDefinition.modes, function(currModeValue, currModeName) {
            actualDefinition.modes[currModeName] = reject(currModeValue, function(currTokType) {
              return isUndefined(currTokType);
            });
          });
          var allModeNames = keys(actualDefinition.modes);
          forEach(actualDefinition.modes, function(currModDef, currModName) {
            _this.TRACE_INIT("Mode: <" + currModName + "> processing", function() {
              _this.modes.push(currModName);
              if (_this.config.skipValidations === false) {
                _this.TRACE_INIT("validatePatterns", function() {
                  _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
                });
              }
              if (isEmpty(_this.lexerDefinitionErrors)) {
                augmentTokenTypes(currModDef);
                var currAnalyzeResult_1;
                _this.TRACE_INIT("analyzeTokenTypes", function() {
                  currAnalyzeResult_1 = analyzeTokenTypes(currModDef, {
                    lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
                    positionTracking: config.positionTracking,
                    ensureOptimizations: config.ensureOptimizations,
                    safeMode: config.safeMode,
                    tracer: _this.TRACE_INIT.bind(_this)
                  });
                });
                _this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig;
                _this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig;
                _this.emptyGroups = merge(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
                _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
                _this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized;
              }
            });
          });
          _this.defaultMode = actualDefinition.defaultMode;
          if (!isEmpty(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
            var allErrMessages = map(_this.lexerDefinitionErrors, function(error) {
              return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
          }
          forEach(_this.lexerDefinitionWarning, function(warningDescriptor) {
            PRINT_WARNING(warningDescriptor.message);
          });
          _this.TRACE_INIT("Choosing sub-methods implementations", function() {
            if (SUPPORT_STICKY) {
              _this.chopInput = IDENTITY;
              _this.match = _this.matchWithTest;
            } else {
              _this.updateLastIndex = NOOP;
              _this.match = _this.matchWithExec;
            }
            if (hasOnlySingleMode) {
              _this.handleModes = NOOP;
            }
            if (_this.trackStartLines === false) {
              _this.computeNewColumn = IDENTITY;
            }
            if (_this.trackEndLines === false) {
              _this.updateTokenEndLineColumnLocation = NOOP;
            }
            if (/full/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createFullToken;
            } else if (/onlyStart/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createStartOnlyToken;
            } else if (/onlyOffset/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createOffsetOnlyToken;
            } else {
              throw Error('Invalid <positionTracking> config option: "' + _this.config.positionTracking + '"');
            }
            if (_this.hasCustom) {
              _this.addToken = _this.addTokenUsingPush;
              _this.handlePayload = _this.handlePayloadWithCustom;
            } else {
              _this.addToken = _this.addTokenUsingMemberAccess;
              _this.handlePayload = _this.handlePayloadNoCustom;
            }
          });
          _this.TRACE_INIT("Failed Optimization Warnings", function() {
            var unOptimizedModes = reduce(_this.canModeBeOptimized, function(cannotBeOptimized, canBeOptimized, modeName) {
              if (canBeOptimized === false) {
                cannotBeOptimized.push(modeName);
              }
              return cannotBeOptimized;
            }, []);
            if (config.ensureOptimizations && !isEmpty(unOptimizedModes)) {
              throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + ' > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.');
            }
          });
          _this.TRACE_INIT("clearRegExpParserCache", function() {
            clearRegExpParserCache();
          });
          _this.TRACE_INIT("toFastProperties", function() {
            toFastProperties(_this);
          });
        });
      }
      Lexer2.prototype.tokenize = function(text, initialMode) {
        if (initialMode === void 0) {
          initialMode = this.defaultMode;
        }
        if (!isEmpty(this.lexerDefinitionErrors)) {
          var allErrMessages = map(this.lexerDefinitionErrors, function(error) {
            return error.message;
          });
          var allErrMessagesString = allErrMessages.join("-----------------------\n");
          throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
        }
        var lexResult = this.tokenizeInternal(text, initialMode);
        return lexResult;
      };
      Lexer2.prototype.tokenizeInternal = function(text, initialMode) {
        var _this = this;
        var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
        var orgText = text;
        var orgLength = orgText.length;
        var offset = 0;
        var matchedTokensIndex = 0;
        var guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
        var matchedTokens = new Array(guessedNumberOfTokens);
        var errors = [];
        var line = this.trackStartLines ? 1 : void 0;
        var column = this.trackStartLines ? 1 : void 0;
        var groups = cloneEmptyGroups(this.emptyGroups);
        var trackLines = this.trackStartLines;
        var lineTerminatorPattern = this.config.lineTerminatorsPattern;
        var currModePatternsLength = 0;
        var patternIdxToConfig = [];
        var currCharCodeToPatternIdxToConfig = [];
        var modeStack = [];
        var emptyArray = [];
        Object.freeze(emptyArray);
        var getPossiblePatterns = void 0;
        function getPossiblePatternsSlow() {
          return patternIdxToConfig;
        }
        function getPossiblePatternsOptimized(charCode) {
          var optimizedCharIdx = charCodeToOptimizedIndex(charCode);
          var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
          if (possiblePatterns === void 0) {
            return emptyArray;
          } else {
            return possiblePatterns;
          }
        }
        var pop_mode = function(popToken) {
          if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
          // So no error should occur.
          popToken.tokenType.PUSH_MODE === void 0) {
            var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
            errors.push({
              offset: popToken.startOffset,
              line: popToken.startLine !== void 0 ? popToken.startLine : void 0,
              column: popToken.startColumn !== void 0 ? popToken.startColumn : void 0,
              length: popToken.image.length,
              message: msg_1
            });
          } else {
            modeStack.pop();
            var newMode = last(modeStack);
            patternIdxToConfig = _this.patternIdxToConfig[newMode];
            currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
            var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;
            if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
              getPossiblePatterns = getPossiblePatternsOptimized;
            } else {
              getPossiblePatterns = getPossiblePatternsSlow;
            }
          }
        };
        function push_mode(newMode) {
          modeStack.push(newMode);
          currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
          patternIdxToConfig = this.patternIdxToConfig[newMode];
          currModePatternsLength = patternIdxToConfig.length;
          currModePatternsLength = patternIdxToConfig.length;
          var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
          if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
            getPossiblePatterns = getPossiblePatternsOptimized;
          } else {
            getPossiblePatterns = getPossiblePatternsSlow;
          }
        }
        push_mode.call(this, initialMode);
        var currConfig;
        while (offset < orgLength) {
          matchedImage = null;
          var nextCharCode = orgText.charCodeAt(offset);
          var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
          var chosenPatternsLength = chosenPatternIdxToConfig.length;
          for (i = 0; i < chosenPatternsLength; i++) {
            currConfig = chosenPatternIdxToConfig[i];
            var currPattern = currConfig.pattern;
            payload = null;
            var singleCharCode = currConfig.short;
            if (singleCharCode !== false) {
              if (nextCharCode === singleCharCode) {
                matchedImage = currPattern;
              }
            } else if (currConfig.isCustom === true) {
              match = currPattern.exec(orgText, offset, matchedTokens, groups);
              if (match !== null) {
                matchedImage = match[0];
                if (match.payload !== void 0) {
                  payload = match.payload;
                }
              } else {
                matchedImage = null;
              }
            } else {
              this.updateLastIndex(currPattern, offset);
              matchedImage = this.match(currPattern, text, offset);
            }
            if (matchedImage !== null) {
              longerAltIdx = currConfig.longerAlt;
              if (longerAltIdx !== void 0) {
                var longerAltConfig = patternIdxToConfig[longerAltIdx];
                var longerAltPattern = longerAltConfig.pattern;
                altPayload = null;
                if (longerAltConfig.isCustom === true) {
                  match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                  if (match !== null) {
                    matchAltImage = match[0];
                    if (match.payload !== void 0) {
                      altPayload = match.payload;
                    }
                  } else {
                    matchAltImage = null;
                  }
                } else {
                  this.updateLastIndex(longerAltPattern, offset);
                  matchAltImage = this.match(longerAltPattern, text, offset);
                }
                if (matchAltImage && matchAltImage.length > matchedImage.length) {
                  matchedImage = matchAltImage;
                  payload = altPayload;
                  currConfig = longerAltConfig;
                }
              }
              break;
            }
          }
          if (matchedImage !== null) {
            imageLength = matchedImage.length;
            group = currConfig.group;
            if (group !== void 0) {
              tokType = currConfig.tokenTypeIdx;
              newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
              this.handlePayload(newToken, payload);
              if (group === false) {
                matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
              } else {
                groups[group].push(newToken);
              }
            }
            text = this.chopInput(text, imageLength);
            offset = offset + imageLength;
            column = this.computeNewColumn(column, imageLength);
            if (trackLines === true && currConfig.canLineTerminator === true) {
              var numOfLTsInMatch = 0;
              var foundTerminator = void 0;
              var lastLTEndOffset = void 0;
              lineTerminatorPattern.lastIndex = 0;
              do {
                foundTerminator = lineTerminatorPattern.test(matchedImage);
                if (foundTerminator === true) {
                  lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                  numOfLTsInMatch++;
                }
              } while (foundTerminator === true);
              if (numOfLTsInMatch !== 0) {
                line = line + numOfLTsInMatch;
                column = imageLength - lastLTEndOffset;
                this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
              }
            }
            this.handleModes(currConfig, pop_mode, push_mode, newToken);
          } else {
            var errorStartOffset = offset;
            var errorLine = line;
            var errorColumn = column;
            var foundResyncPoint = false;
            while (!foundResyncPoint && offset < orgLength) {
              orgText.charCodeAt(offset);
              text = this.chopInput(text, 1);
              offset++;
              for (j = 0; j < currModePatternsLength; j++) {
                var currConfig_1 = patternIdxToConfig[j];
                var currPattern = currConfig_1.pattern;
                var singleCharCode = currConfig_1.short;
                if (singleCharCode !== false) {
                  if (orgText.charCodeAt(offset) === singleCharCode) {
                    foundResyncPoint = true;
                  }
                } else if (currConfig_1.isCustom === true) {
                  foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
                } else {
                  this.updateLastIndex(currPattern, offset);
                  foundResyncPoint = currPattern.exec(text) !== null;
                }
                if (foundResyncPoint === true) {
                  break;
                }
              }
            }
            errLength = offset - errorStartOffset;
            msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
            errors.push({
              offset: errorStartOffset,
              line: errorLine,
              column: errorColumn,
              length: errLength,
              message: msg
            });
          }
        }
        if (!this.hasCustom) {
          matchedTokens.length = matchedTokensIndex;
        }
        return {
          tokens: matchedTokens,
          groups,
          errors
        };
      };
      Lexer2.prototype.handleModes = function(config, pop_mode, push_mode, newToken) {
        if (config.pop === true) {
          var pushMode = config.push;
          pop_mode(newToken);
          if (pushMode !== void 0) {
            push_mode.call(this, pushMode);
          }
        } else if (config.push !== void 0) {
          push_mode.call(this, config.push);
        }
      };
      Lexer2.prototype.chopInput = function(text, length) {
        return text.substring(length);
      };
      Lexer2.prototype.updateLastIndex = function(regExp, newLastIndex) {
        regExp.lastIndex = newLastIndex;
      };
      Lexer2.prototype.updateTokenEndLineColumnLocation = function(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
        var lastCharIsLT, fixForEndingInLT;
        if (group !== void 0) {
          lastCharIsLT = lastLTIdx === imageLength - 1;
          fixForEndingInLT = lastCharIsLT ? -1 : 0;
          if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
            newToken.endLine = line + fixForEndingInLT;
            newToken.endColumn = column - 1 + -fixForEndingInLT;
          }
        }
      };
      Lexer2.prototype.computeNewColumn = function(oldColumn, imageLength) {
        return oldColumn + imageLength;
      };
      Lexer2.prototype.createTokenInstance = function() {
        return null;
      };
      Lexer2.prototype.createOffsetOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType) {
        return {
          image,
          startOffset,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.createStartOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
        return {
          image,
          startOffset,
          startLine,
          startColumn,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.createFullToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
        return {
          image,
          startOffset,
          endOffset: startOffset + imageLength - 1,
          startLine,
          endLine: startLine,
          startColumn,
          endColumn: startColumn + imageLength - 1,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.addToken = function(tokenVector, index, tokenToAdd) {
        return 666;
      };
      Lexer2.prototype.addTokenUsingPush = function(tokenVector, index, tokenToAdd) {
        tokenVector.push(tokenToAdd);
        return index;
      };
      Lexer2.prototype.addTokenUsingMemberAccess = function(tokenVector, index, tokenToAdd) {
        tokenVector[index] = tokenToAdd;
        index++;
        return index;
      };
      Lexer2.prototype.handlePayload = function(token, payload) {
      };
      Lexer2.prototype.handlePayloadNoCustom = function(token, payload) {
      };
      Lexer2.prototype.handlePayloadWithCustom = function(token, payload) {
        if (payload !== null) {
          token.payload = payload;
        }
      };
      Lexer2.prototype.match = function(pattern, text, offset) {
        return null;
      };
      Lexer2.prototype.matchWithTest = function(pattern, text, offset) {
        var found = pattern.test(text);
        if (found === true) {
          return text.substring(offset, pattern.lastIndex);
        }
        return null;
      };
      Lexer2.prototype.matchWithExec = function(pattern, text) {
        var regExpArray = pattern.exec(text);
        return regExpArray !== null ? regExpArray[0] : regExpArray;
      };
      Lexer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          var indent2 = new Array(this.traceInitIndent + 1).join("	");
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            console.log(indent2 + "--> <" + phaseDesc + ">");
          }
          var _a = timer(phaseImpl), time = _a.time, value = _a.value;
          var traceMethod = time > 10 ? console.warn : console.log;
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            traceMethod(indent2 + "<-- <" + phaseDesc + "> time: " + time + "ms");
          }
          this.traceInitIndent--;
          return value;
        } else {
          return phaseImpl();
        }
      };
      Lexer2.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
      Lexer2.NA = /NOT_APPLICABLE/;
      return Lexer2;
    })()
  );
  function tokenLabel(tokType) {
    if (hasTokenLabel(tokType)) {
      return tokType.LABEL;
    } else {
      return tokType.name;
    }
  }
  function tokenName(tokType) {
    return tokType.name;
  }
  function hasTokenLabel(obj) {
    return isString(obj.LABEL) && obj.LABEL !== "";
  }
  var PARENT = "parent";
  var CATEGORIES = "categories";
  var LABEL = "label";
  var GROUP = "group";
  var PUSH_MODE = "push_mode";
  var POP_MODE = "pop_mode";
  var LONGER_ALT = "longer_alt";
  var LINE_BREAKS = "line_breaks";
  var START_CHARS_HINT = "start_chars_hint";
  function createToken(config) {
    return createTokenInternal(config);
  }
  function createTokenInternal(config) {
    var pattern = config.pattern;
    var tokenType = {};
    tokenType.name = config.name;
    if (!isUndefined(pattern)) {
      tokenType.PATTERN = pattern;
    }
    if (has(config, PARENT)) {
      throw "The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
    }
    if (has(config, CATEGORIES)) {
      tokenType.CATEGORIES = config[CATEGORIES];
    }
    augmentTokenTypes([tokenType]);
    if (has(config, LABEL)) {
      tokenType.LABEL = config[LABEL];
    }
    if (has(config, GROUP)) {
      tokenType.GROUP = config[GROUP];
    }
    if (has(config, POP_MODE)) {
      tokenType.POP_MODE = config[POP_MODE];
    }
    if (has(config, PUSH_MODE)) {
      tokenType.PUSH_MODE = config[PUSH_MODE];
    }
    if (has(config, LONGER_ALT)) {
      tokenType.LONGER_ALT = config[LONGER_ALT];
    }
    if (has(config, LINE_BREAKS)) {
      tokenType.LINE_BREAKS = config[LINE_BREAKS];
    }
    if (has(config, START_CHARS_HINT)) {
      tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
    }
    return tokenType;
  }
  var EOF = createToken({ name: "EOF", pattern: Lexer.NA });
  augmentTokenTypes([EOF]);
  function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
    return {
      image,
      startOffset,
      endOffset,
      startLine,
      endLine,
      startColumn,
      endColumn,
      tokenTypeIdx: tokType.tokenTypeIdx,
      tokenType: tokType
    };
  }
  function tokenMatcher(token, tokType) {
    return tokenStructuredMatcher(token, tokType);
  }
  var __extends$8 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var AbstractProduction = (
    /** @class */
    (function() {
      function AbstractProduction2(_definition) {
        this._definition = _definition;
      }
      Object.defineProperty(AbstractProduction2.prototype, "definition", {
        get: function() {
          return this._definition;
        },
        set: function(value) {
          this._definition = value;
        },
        enumerable: false,
        configurable: true
      });
      AbstractProduction2.prototype.accept = function(visitor) {
        visitor.visit(this);
        forEach(this.definition, function(prod) {
          prod.accept(visitor);
        });
      };
      return AbstractProduction2;
    })()
  );
  var NonTerminal = (
    /** @class */
    (function(_super) {
      __extends$8(NonTerminal2, _super);
      function NonTerminal2(options) {
        var _this = _super.call(this, []) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      Object.defineProperty(NonTerminal2.prototype, "definition", {
        get: function() {
          if (this.referencedRule !== void 0) {
            return this.referencedRule.definition;
          }
          return [];
        },
        set: function(definition) {
        },
        enumerable: false,
        configurable: true
      });
      NonTerminal2.prototype.accept = function(visitor) {
        visitor.visit(this);
      };
      return NonTerminal2;
    })(AbstractProduction)
  );
  var Rule = (
    /** @class */
    (function(_super) {
      __extends$8(Rule2, _super);
      function Rule2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.orgText = "";
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Rule2;
    })(AbstractProduction)
  );
  var Alternative = (
    /** @class */
    (function(_super) {
      __extends$8(Alternative2, _super);
      function Alternative2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.ignoreAmbiguities = false;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Alternative2;
    })(AbstractProduction)
  );
  var Option = (
    /** @class */
    (function(_super) {
      __extends$8(Option2, _super);
      function Option2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Option2;
    })(AbstractProduction)
  );
  var RepetitionMandatory = (
    /** @class */
    (function(_super) {
      __extends$8(RepetitionMandatory2, _super);
      function RepetitionMandatory2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionMandatory2;
    })(AbstractProduction)
  );
  var RepetitionMandatoryWithSeparator = (
    /** @class */
    (function(_super) {
      __extends$8(RepetitionMandatoryWithSeparator2, _super);
      function RepetitionMandatoryWithSeparator2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionMandatoryWithSeparator2;
    })(AbstractProduction)
  );
  var Repetition = (
    /** @class */
    (function(_super) {
      __extends$8(Repetition2, _super);
      function Repetition2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Repetition2;
    })(AbstractProduction)
  );
  var RepetitionWithSeparator = (
    /** @class */
    (function(_super) {
      __extends$8(RepetitionWithSeparator2, _super);
      function RepetitionWithSeparator2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionWithSeparator2;
    })(AbstractProduction)
  );
  var Alternation = (
    /** @class */
    (function(_super) {
      __extends$8(Alternation2, _super);
      function Alternation2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        _this.ignoreAmbiguities = false;
        _this.hasPredicates = false;
        assign(_this, pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      Object.defineProperty(Alternation2.prototype, "definition", {
        get: function() {
          return this._definition;
        },
        set: function(value) {
          this._definition = value;
        },
        enumerable: false,
        configurable: true
      });
      return Alternation2;
    })(AbstractProduction)
  );
  var Terminal = (
    /** @class */
    (function() {
      function Terminal2(options) {
        this.idx = 1;
        assign(this, pick(options, function(v) {
          return v !== void 0;
        }));
      }
      Terminal2.prototype.accept = function(visitor) {
        visitor.visit(this);
      };
      return Terminal2;
    })()
  );
  function serializeGrammar(topRules) {
    return map(topRules, serializeProduction);
  }
  function serializeProduction(node) {
    function convertDefinition(definition) {
      return map(definition, serializeProduction);
    }
    if (node instanceof NonTerminal) {
      return {
        type: "NonTerminal",
        name: node.nonTerminalName,
        idx: node.idx
      };
    } else if (node instanceof Alternative) {
      return {
        type: "Alternative",
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Option) {
      return {
        type: "Option",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionMandatory) {
      return {
        type: "RepetitionMandatory",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionMandatoryWithSeparator) {
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: node.idx,
        separator: serializeProduction(new Terminal({ terminalType: node.separator })),
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionWithSeparator) {
      return {
        type: "RepetitionWithSeparator",
        idx: node.idx,
        separator: serializeProduction(new Terminal({ terminalType: node.separator })),
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Repetition) {
      return {
        type: "Repetition",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Alternation) {
      return {
        type: "Alternation",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Terminal) {
      var serializedTerminal = {
        type: "Terminal",
        name: node.terminalType.name,
        label: tokenLabel(node.terminalType),
        idx: node.idx
      };
      var pattern = node.terminalType.PATTERN;
      if (node.terminalType.PATTERN) {
        serializedTerminal.pattern = isRegExp(pattern) ? pattern.source : pattern;
      }
      return serializedTerminal;
    } else if (node instanceof Rule) {
      return {
        type: "Rule",
        name: node.name,
        orgText: node.orgText,
        definition: convertDefinition(node.definition)
      };
    } else {
      throw Error("non exhaustive match");
    }
  }
  var RestWalker = (
    /** @class */
    (function() {
      function RestWalker2() {
      }
      RestWalker2.prototype.walk = function(prod, prevRest) {
        var _this = this;
        if (prevRest === void 0) {
          prevRest = [];
        }
        forEach(prod.definition, function(subProd, index) {
          var currRest = drop(prod.definition, index + 1);
          if (subProd instanceof NonTerminal) {
            _this.walkProdRef(subProd, currRest, prevRest);
          } else if (subProd instanceof Terminal) {
            _this.walkTerminal(subProd, currRest, prevRest);
          } else if (subProd instanceof Alternative) {
            _this.walkFlat(subProd, currRest, prevRest);
          } else if (subProd instanceof Option) {
            _this.walkOption(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionMandatory) {
            _this.walkAtLeastOne(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionMandatoryWithSeparator) {
            _this.walkAtLeastOneSep(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionWithSeparator) {
            _this.walkManySep(subProd, currRest, prevRest);
          } else if (subProd instanceof Repetition) {
            _this.walkMany(subProd, currRest, prevRest);
          } else if (subProd instanceof Alternation) {
            _this.walkOr(subProd, currRest, prevRest);
          } else {
            throw Error("non exhaustive match");
          }
        });
      };
      RestWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
      };
      RestWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
      };
      RestWalker2.prototype.walkFlat = function(flatProd, currRest, prevRest) {
        var fullOrRest = currRest.concat(prevRest);
        this.walk(flatProd, fullOrRest);
      };
      RestWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
        var fullOrRest = currRest.concat(prevRest);
        this.walk(optionProd, fullOrRest);
      };
      RestWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        var fullAtLeastOneRest = [
          new Option({ definition: atLeastOneProd.definition })
        ].concat(currRest, prevRest);
        this.walk(atLeastOneProd, fullAtLeastOneRest);
      };
      RestWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
        var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
        this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
      };
      RestWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        var fullManyRest = [
          new Option({ definition: manyProd.definition })
        ].concat(currRest, prevRest);
        this.walk(manyProd, fullManyRest);
      };
      RestWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
        this.walk(manySepProd, fullManySepRest);
      };
      RestWalker2.prototype.walkOr = function(orProd, currRest, prevRest) {
        var _this = this;
        var fullOrRest = currRest.concat(prevRest);
        forEach(orProd.definition, function(alt) {
          var prodWrapper = new Alternative({ definition: [alt] });
          _this.walk(prodWrapper, fullOrRest);
        });
      };
      return RestWalker2;
    })()
  );
  function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
    var repSepRest = [
      new Option({
        definition: [new Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition)
      })
    ];
    var fullRepSepRest = repSepRest.concat(currRest, prevRest);
    return fullRepSepRest;
  }
  var GAstVisitor = (
    /** @class */
    (function() {
      function GAstVisitor2() {
      }
      GAstVisitor2.prototype.visit = function(node) {
        var nodeAny = node;
        switch (nodeAny.constructor) {
          case NonTerminal:
            return this.visitNonTerminal(nodeAny);
          case Alternative:
            return this.visitAlternative(nodeAny);
          case Option:
            return this.visitOption(nodeAny);
          case RepetitionMandatory:
            return this.visitRepetitionMandatory(nodeAny);
          case RepetitionMandatoryWithSeparator:
            return this.visitRepetitionMandatoryWithSeparator(nodeAny);
          case RepetitionWithSeparator:
            return this.visitRepetitionWithSeparator(nodeAny);
          case Repetition:
            return this.visitRepetition(nodeAny);
          case Alternation:
            return this.visitAlternation(nodeAny);
          case Terminal:
            return this.visitTerminal(nodeAny);
          case Rule:
            return this.visitRule(nodeAny);
          /* istanbul ignore next */
          default:
            throw Error("non exhaustive match");
        }
      };
      GAstVisitor2.prototype.visitNonTerminal = function(node) {
      };
      GAstVisitor2.prototype.visitAlternative = function(node) {
      };
      GAstVisitor2.prototype.visitOption = function(node) {
      };
      GAstVisitor2.prototype.visitRepetition = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionMandatory = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
      };
      GAstVisitor2.prototype.visitAlternation = function(node) {
      };
      GAstVisitor2.prototype.visitTerminal = function(node) {
      };
      GAstVisitor2.prototype.visitRule = function(node) {
      };
      return GAstVisitor2;
    })()
  );
  var __extends$7 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  function isSequenceProd(prod) {
    return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
  }
  function isOptionalProd(prod, alreadyVisited) {
    if (alreadyVisited === void 0) {
      alreadyVisited = [];
    }
    var isDirectlyOptional = prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;
    if (isDirectlyOptional) {
      return true;
    }
    if (prod instanceof Alternation) {
      return some(prod.definition, function(subProd) {
        return isOptionalProd(subProd, alreadyVisited);
      });
    } else if (prod instanceof NonTerminal && contains(alreadyVisited, prod)) {
      return false;
    } else if (prod instanceof AbstractProduction) {
      if (prod instanceof NonTerminal) {
        alreadyVisited.push(prod);
      }
      return every(prod.definition, function(subProd) {
        return isOptionalProd(subProd, alreadyVisited);
      });
    } else {
      return false;
    }
  }
  function isBranchingProd(prod) {
    return prod instanceof Alternation;
  }
  function getProductionDslName(prod) {
    if (prod instanceof NonTerminal) {
      return "SUBRULE";
    } else if (prod instanceof Option) {
      return "OPTION";
    } else if (prod instanceof Alternation) {
      return "OR";
    } else if (prod instanceof RepetitionMandatory) {
      return "AT_LEAST_ONE";
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return "AT_LEAST_ONE_SEP";
    } else if (prod instanceof RepetitionWithSeparator) {
      return "MANY_SEP";
    } else if (prod instanceof Repetition) {
      return "MANY";
    } else if (prod instanceof Terminal) {
      return "CONSUME";
    } else {
      throw Error("non exhaustive match");
    }
  }
  var DslMethodsCollectorVisitor = (
    /** @class */
    (function(_super) {
      __extends$7(DslMethodsCollectorVisitor2, _super);
      function DslMethodsCollectorVisitor2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.separator = "-";
        _this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
        return _this;
      }
      DslMethodsCollectorVisitor2.prototype.reset = function() {
        this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
      };
      DslMethodsCollectorVisitor2.prototype.visitTerminal = function(terminal) {
        var key = terminal.terminalType.name + this.separator + "Terminal";
        if (!has(this.dslMethods, key)) {
          this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(terminal);
      };
      DslMethodsCollectorVisitor2.prototype.visitNonTerminal = function(subrule) {
        var key = subrule.nonTerminalName + this.separator + "Terminal";
        if (!has(this.dslMethods, key)) {
          this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(subrule);
      };
      DslMethodsCollectorVisitor2.prototype.visitOption = function(option) {
        this.dslMethods.option.push(option);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.dslMethods.repetitionWithSeparator.push(manySep);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.dslMethods.repetitionMandatory.push(atLeastOne);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetition = function(many) {
        this.dslMethods.repetition.push(many);
      };
      DslMethodsCollectorVisitor2.prototype.visitAlternation = function(or) {
        this.dslMethods.alternation.push(or);
      };
      return DslMethodsCollectorVisitor2;
    })(GAstVisitor)
  );
  var collectorVisitor = new DslMethodsCollectorVisitor();
  function collectMethods(rule) {
    collectorVisitor.reset();
    rule.accept(collectorVisitor);
    var dslMethods = collectorVisitor.dslMethods;
    collectorVisitor.reset();
    return dslMethods;
  }
  function first(prod) {
    if (prod instanceof NonTerminal) {
      return first(prod.referencedRule);
    } else if (prod instanceof Terminal) {
      return firstForTerminal(prod);
    } else if (isSequenceProd(prod)) {
      return firstForSequence(prod);
    } else if (isBranchingProd(prod)) {
      return firstForBranching(prod);
    } else {
      throw Error("non exhaustive match");
    }
  }
  function firstForSequence(prod) {
    var firstSet = [];
    var seq = prod.definition;
    var nextSubProdIdx = 0;
    var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    var currSubProd;
    var isLastInnerProdOptional = true;
    while (hasInnerProdsRemaining && isLastInnerProdOptional) {
      currSubProd = seq[nextSubProdIdx];
      isLastInnerProdOptional = isOptionalProd(currSubProd);
      firstSet = firstSet.concat(first(currSubProd));
      nextSubProdIdx = nextSubProdIdx + 1;
      hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    }
    return uniq(firstSet);
  }
  function firstForBranching(prod) {
    var allAlternativesFirsts = map(prod.definition, function(innerProd) {
      return first(innerProd);
    });
    return uniq(flatten(allAlternativesFirsts));
  }
  function firstForTerminal(terminal) {
    return [terminal.terminalType];
  }
  var IN = "_~IN~_";
  var __extends$6 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var ResyncFollowsWalker = (
    /** @class */
    (function(_super) {
      __extends$6(ResyncFollowsWalker2, _super);
      function ResyncFollowsWalker2(topProd) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.follows = {};
        return _this;
      }
      ResyncFollowsWalker2.prototype.startWalking = function() {
        this.walk(this.topProd);
        return this.follows;
      };
      ResyncFollowsWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
      };
      ResyncFollowsWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
        var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
        var fullRest = currRest.concat(prevRest);
        var restProd = new Alternative({ definition: fullRest });
        var t_in_topProd_follows = first(restProd);
        this.follows[followName] = t_in_topProd_follows;
      };
      return ResyncFollowsWalker2;
    })(RestWalker)
  );
  function computeAllProdsFollows(topProductions) {
    var reSyncFollows = {};
    forEach(topProductions, function(topProd) {
      var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
      assign(reSyncFollows, currRefsFollow);
    });
    return reSyncFollows;
  }
  function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
    return inner.name + occurenceInParent + IN;
  }
  var defaultParserErrorProvider = {
    buildMismatchTokenMessage: function(_a) {
      var expected = _a.expected, actual = _a.actual;
      _a.previous;
      _a.ruleName;
      var hasLabel = hasTokenLabel(expected);
      var expectedMsg = hasLabel ? "--> " + tokenLabel(expected) + " <--" : "token of type --> " + expected.name + " <--";
      var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
      return msg;
    },
    buildNotAllInputParsedMessage: function(_a) {
      var firstRedundant = _a.firstRedundant;
      _a.ruleName;
      return "Redundant input, expecting EOF but found: " + firstRedundant.image;
    },
    buildNoViableAltMessage: function(_a) {
      var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual;
      _a.previous;
      var customUserDescription = _a.customUserDescription;
      _a.ruleName;
      var errPrefix = "Expecting: ";
      var actualText = first$1(actual).image;
      var errSuffix = "\nbut found: '" + actualText + "'";
      if (customUserDescription) {
        return errPrefix + customUserDescription + errSuffix;
      } else {
        var allLookAheadPaths = reduce(expectedPathsPerAlt, function(result, currAltPaths) {
          return result.concat(currAltPaths);
        }, []);
        var nextValidTokenSequences = map(allLookAheadPaths, function(currPath) {
          return "[" + map(currPath, function(currTokenType) {
            return tokenLabel(currTokenType);
          }).join(", ") + "]";
        });
        var nextValidSequenceItems = map(nextValidTokenSequences, function(itemMsg, idx) {
          return "  " + (idx + 1) + ". " + itemMsg;
        });
        var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
        return errPrefix + calculatedDescription + errSuffix;
      }
    },
    buildEarlyExitMessage: function(_a) {
      var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription;
      _a.ruleName;
      var errPrefix = "Expecting: ";
      var actualText = first$1(actual).image;
      var errSuffix = "\nbut found: '" + actualText + "'";
      if (customUserDescription) {
        return errPrefix + customUserDescription + errSuffix;
      } else {
        var nextValidTokenSequences = map(expectedIterationPaths, function(currPath) {
          return "[" + map(currPath, function(currTokenType) {
            return tokenLabel(currTokenType);
          }).join(",") + "]";
        });
        var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " + ("<" + nextValidTokenSequences.join(" ,") + ">");
        return errPrefix + calculatedDescription + errSuffix;
      }
    }
  };
  Object.freeze(defaultParserErrorProvider);
  var defaultGrammarResolverErrorProvider = {
    buildRuleNotFoundError: function(topLevelRule, undefinedRule) {
      var msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
      return msg;
    }
  };
  var defaultGrammarValidatorErrorProvider = {
    buildDuplicateFoundError: function(topLevelRule, duplicateProds) {
      function getExtraProductionArgument2(prod) {
        if (prod instanceof Terminal) {
          return prod.terminalType.name;
        } else if (prod instanceof NonTerminal) {
          return prod.nonTerminalName;
        } else {
          return "";
        }
      }
      var topLevelName = topLevelRule.name;
      var duplicateProd = first$1(duplicateProds);
      var index = duplicateProd.idx;
      var dslName = getProductionDslName(duplicateProd);
      var extraArgument = getExtraProductionArgument2(duplicateProd);
      var hasExplicitIndex = index > 0;
      var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
      msg = msg.replace(/[ \t]+/g, " ");
      msg = msg.replace(/\s\s+/g, "\n");
      return msg;
    },
    buildNamespaceConflictError: function(rule) {
      var errMsg = "Namespace conflict found in grammar.\n" + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") + "To resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.";
      return errMsg;
    },
    buildAlternationPrefixAmbiguityError: function(options) {
      var pathMsg = map(options.prefixPath, function(currTok) {
        return tokenLabel(currTok);
      }).join(", ");
      var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
      var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" + ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.";
      return errMsg;
    },
    buildAlternationAmbiguityError: function(options) {
      var pathMsg = map(options.prefixPath, function(currtok) {
        return tokenLabel(currtok);
      }).join(", ");
      var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
      var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" + (" inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
      currMessage = currMessage + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
      return currMessage;
    },
    buildEmptyRepetitionError: function(options) {
      var dslName = getProductionDslName(options.repetition);
      if (options.repetition.idx !== 0) {
        dslName += options.repetition.idx;
      }
      var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
      return errMsg;
    },
    // TODO: remove - `errors_public` from nyc.config.js exclude
    //       once this method is fully removed from this file
    buildTokenNameError: function(options) {
      return "deprecated";
    },
    buildEmptyAlternationError: function(options) {
      var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" + (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") + "Only the last alternative may be an empty alternative.";
      return errMsg;
    },
    buildTooManyAlternativesError: function(options) {
      var errMsg = "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
      return errMsg;
    },
    buildLeftRecursionError: function(options) {
      var ruleName = options.topLevelRule.name;
      var pathNames = map(options.leftRecursionPath, function(currRule) {
        return currRule.name;
      });
      var leftRecursivePath = ruleName + " --> " + pathNames.concat([ruleName]).join(" --> ");
      var errMsg = "Left Recursion found in grammar.\n" + ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") + ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") + " To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
      return errMsg;
    },
    // TODO: remove - `errors_public` from nyc.config.js exclude
    //       once this method is fully removed from this file
    buildInvalidRuleNameError: function(options) {
      return "deprecated";
    },
    buildDuplicateRuleNameError: function(options) {
      var ruleName;
      if (options.topLevelRule instanceof Rule) {
        ruleName = options.topLevelRule.name;
      } else {
        ruleName = options.topLevelRule;
      }
      var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
      return errMsg;
    }
  };
  var __extends$5 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  function resolveGrammar$1(topLevels, errMsgProvider) {
    var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
    refResolver.resolveRefs();
    return refResolver.errors;
  }
  var GastRefResolverVisitor = (
    /** @class */
    (function(_super) {
      __extends$5(GastRefResolverVisitor2, _super);
      function GastRefResolverVisitor2(nameToTopRule, errMsgProvider) {
        var _this = _super.call(this) || this;
        _this.nameToTopRule = nameToTopRule;
        _this.errMsgProvider = errMsgProvider;
        _this.errors = [];
        return _this;
      }
      GastRefResolverVisitor2.prototype.resolveRefs = function() {
        var _this = this;
        forEach(values(this.nameToTopRule), function(prod) {
          _this.currTopLevel = prod;
          prod.accept(_this);
        });
      };
      GastRefResolverVisitor2.prototype.visitNonTerminal = function(node) {
        var ref = this.nameToTopRule[node.nonTerminalName];
        if (!ref) {
          var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
          this.errors.push({
            message: msg,
            type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
            ruleName: this.currTopLevel.name,
            unresolvedRefName: node.nonTerminalName
          });
        } else {
          node.referencedRule = ref;
        }
      };
      return GastRefResolverVisitor2;
    })(GAstVisitor)
  );
  var __extends$4 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var AbstractNextPossibleTokensWalker = (
    /** @class */
    (function(_super) {
      __extends$4(AbstractNextPossibleTokensWalker2, _super);
      function AbstractNextPossibleTokensWalker2(topProd, path2) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.path = path2;
        _this.possibleTokTypes = [];
        _this.nextProductionName = "";
        _this.nextProductionOccurrence = 0;
        _this.found = false;
        _this.isAtEndOfPath = false;
        return _this;
      }
      AbstractNextPossibleTokensWalker2.prototype.startWalking = function() {
        this.found = false;
        if (this.path.ruleStack[0] !== this.topProd.name) {
          throw Error("The path does not start with the walker's top Rule!");
        }
        this.ruleStack = cloneArr(this.path.ruleStack).reverse();
        this.occurrenceStack = cloneArr(this.path.occurrenceStack).reverse();
        this.ruleStack.pop();
        this.occurrenceStack.pop();
        this.updateExpectedNext();
        this.walk(this.topProd);
        return this.possibleTokTypes;
      };
      AbstractNextPossibleTokensWalker2.prototype.walk = function(prod, prevRest) {
        if (prevRest === void 0) {
          prevRest = [];
        }
        if (!this.found) {
          _super.prototype.walk.call(this, prod, prevRest);
        }
      };
      AbstractNextPossibleTokensWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
        if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
          var fullRest = currRest.concat(prevRest);
          this.updateExpectedNext();
          this.walk(refProd.referencedRule, fullRest);
        }
      };
      AbstractNextPossibleTokensWalker2.prototype.updateExpectedNext = function() {
        if (isEmpty(this.ruleStack)) {
          this.nextProductionName = "";
          this.nextProductionOccurrence = 0;
          this.isAtEndOfPath = true;
        } else {
          this.nextProductionName = this.ruleStack.pop();
          this.nextProductionOccurrence = this.occurrenceStack.pop();
        }
      };
      return AbstractNextPossibleTokensWalker2;
    })(RestWalker)
  );
  var NextAfterTokenWalker = (
    /** @class */
    (function(_super) {
      __extends$4(NextAfterTokenWalker2, _super);
      function NextAfterTokenWalker2(topProd, path2) {
        var _this = _super.call(this, topProd, path2) || this;
        _this.path = path2;
        _this.nextTerminalName = "";
        _this.nextTerminalOccurrence = 0;
        _this.nextTerminalName = _this.path.lastTok.name;
        _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
        return _this;
      }
      NextAfterTokenWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
        if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
          var fullRest = currRest.concat(prevRest);
          var restProd = new Alternative({ definition: fullRest });
          this.possibleTokTypes = first(restProd);
          this.found = true;
        }
      };
      return NextAfterTokenWalker2;
    })(AbstractNextPossibleTokensWalker)
  );
  var AbstractNextTerminalAfterProductionWalker = (
    /** @class */
    (function(_super) {
      __extends$4(AbstractNextTerminalAfterProductionWalker2, _super);
      function AbstractNextTerminalAfterProductionWalker2(topRule, occurrence) {
        var _this = _super.call(this) || this;
        _this.topRule = topRule;
        _this.occurrence = occurrence;
        _this.result = {
          token: void 0,
          occurrence: void 0,
          isEndOfRule: void 0
        };
        return _this;
      }
      AbstractNextTerminalAfterProductionWalker2.prototype.startWalking = function() {
        this.walk(this.topRule);
        return this.result;
      };
      return AbstractNextTerminalAfterProductionWalker2;
    })(RestWalker)
  );
  var NextTerminalAfterManyWalker = (
    /** @class */
    (function(_super) {
      __extends$4(NextTerminalAfterManyWalker2, _super);
      function NextTerminalAfterManyWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterManyWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        if (manyProd.idx === this.occurrence) {
          var firstAfterMany = first$1(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterMany === void 0;
          if (firstAfterMany instanceof Terminal) {
            this.result.token = firstAfterMany.terminalType;
            this.result.occurrence = firstAfterMany.idx;
          }
        } else {
          _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterManyWalker2;
    })(AbstractNextTerminalAfterProductionWalker)
  );
  var NextTerminalAfterManySepWalker = (
    /** @class */
    (function(_super) {
      __extends$4(NextTerminalAfterManySepWalker2, _super);
      function NextTerminalAfterManySepWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterManySepWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        if (manySepProd.idx === this.occurrence) {
          var firstAfterManySep = first$1(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterManySep === void 0;
          if (firstAfterManySep instanceof Terminal) {
            this.result.token = firstAfterManySep.terminalType;
            this.result.occurrence = firstAfterManySep.idx;
          }
        } else {
          _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterManySepWalker2;
    })(AbstractNextTerminalAfterProductionWalker)
  );
  var NextTerminalAfterAtLeastOneWalker = (
    /** @class */
    (function(_super) {
      __extends$4(NextTerminalAfterAtLeastOneWalker2, _super);
      function NextTerminalAfterAtLeastOneWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterAtLeastOneWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        if (atLeastOneProd.idx === this.occurrence) {
          var firstAfterAtLeastOne = first$1(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
          if (firstAfterAtLeastOne instanceof Terminal) {
            this.result.token = firstAfterAtLeastOne.terminalType;
            this.result.occurrence = firstAfterAtLeastOne.idx;
          }
        } else {
          _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterAtLeastOneWalker2;
    })(AbstractNextTerminalAfterProductionWalker)
  );
  var NextTerminalAfterAtLeastOneSepWalker = (
    /** @class */
    (function(_super) {
      __extends$4(NextTerminalAfterAtLeastOneSepWalker2, _super);
      function NextTerminalAfterAtLeastOneSepWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterAtLeastOneSepWalker2.prototype.walkAtLeastOneSep = function(atleastOneSepProd, currRest, prevRest) {
        if (atleastOneSepProd.idx === this.occurrence) {
          var firstAfterfirstAfterAtLeastOneSep = first$1(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
          if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
            this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
            this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
          }
        } else {
          _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterAtLeastOneSepWalker2;
    })(AbstractNextTerminalAfterProductionWalker)
  );
  function possiblePathsFrom(targetDef, maxLength, currPath) {
    if (currPath === void 0) {
      currPath = [];
    }
    currPath = cloneArr(currPath);
    var result = [];
    var i = 0;
    function remainingPathWith(nextDef) {
      return nextDef.concat(drop(targetDef, i + 1));
    }
    function getAlternativesForProd(definition) {
      var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
      return result.concat(alternatives);
    }
    while (currPath.length < maxLength && i < targetDef.length) {
      var prod = targetDef[i];
      if (prod instanceof Alternative) {
        return getAlternativesForProd(prod.definition);
      } else if (prod instanceof NonTerminal) {
        return getAlternativesForProd(prod.definition);
      } else if (prod instanceof Option) {
        result = getAlternativesForProd(prod.definition);
      } else if (prod instanceof RepetitionMandatory) {
        var newDef = prod.definition.concat([
          new Repetition({
            definition: prod.definition
          })
        ]);
        return getAlternativesForProd(newDef);
      } else if (prod instanceof RepetitionMandatoryWithSeparator) {
        var newDef = [
          new Alternative({ definition: prod.definition }),
          new Repetition({
            definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
          })
        ];
        return getAlternativesForProd(newDef);
      } else if (prod instanceof RepetitionWithSeparator) {
        var newDef = prod.definition.concat([
          new Repetition({
            definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
          })
        ]);
        result = getAlternativesForProd(newDef);
      } else if (prod instanceof Repetition) {
        var newDef = prod.definition.concat([
          new Repetition({
            definition: prod.definition
          })
        ]);
        result = getAlternativesForProd(newDef);
      } else if (prod instanceof Alternation) {
        forEach(prod.definition, function(currAlt) {
          if (isEmpty(currAlt.definition) === false) {
            result = getAlternativesForProd(currAlt.definition);
          }
        });
        return result;
      } else if (prod instanceof Terminal) {
        currPath.push(prod.terminalType);
      } else {
        throw Error("non exhaustive match");
      }
      i++;
    }
    result.push({
      partialPath: currPath,
      suffixDef: drop(targetDef, i)
    });
    return result;
  }
  function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
    var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
    var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
    var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
    var foundCompletePath = false;
    var tokenVectorLength = tokenVector.length;
    var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
    var result = [];
    var possiblePaths = [];
    possiblePaths.push({
      idx: -1,
      def: initialDef,
      ruleStack: [],
      occurrenceStack: []
    });
    while (!isEmpty(possiblePaths)) {
      var currPath = possiblePaths.pop();
      if (currPath === EXIT_ALTERNATIVE) {
        if (foundCompletePath && last(possiblePaths).idx <= minimalAlternativesIndex) {
          possiblePaths.pop();
        }
        continue;
      }
      var currDef = currPath.def;
      var currIdx = currPath.idx;
      var currRuleStack = currPath.ruleStack;
      var currOccurrenceStack = currPath.occurrenceStack;
      if (isEmpty(currDef)) {
        continue;
      }
      var prod = currDef[0];
      if (prod === EXIT_NON_TERMINAL) {
        var nextPath = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: dropRight(currRuleStack),
          occurrenceStack: dropRight(currOccurrenceStack)
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof Terminal) {
        if (currIdx < tokenVectorLength - 1) {
          var nextIdx = currIdx + 1;
          var actualToken = tokenVector[nextIdx];
          if (tokMatcher(actualToken, prod.terminalType)) {
            var nextPath = {
              idx: nextIdx,
              def: drop(currDef),
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
          }
        } else if (currIdx === tokenVectorLength - 1) {
          result.push({
            nextTokenType: prod.terminalType,
            nextTokenOccurrence: prod.idx,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          });
          foundCompletePath = true;
        } else {
          throw Error("non exhaustive match");
        }
      } else if (prod instanceof NonTerminal) {
        var newRuleStack = cloneArr(currRuleStack);
        newRuleStack.push(prod.nonTerminalName);
        var newOccurrenceStack = cloneArr(currOccurrenceStack);
        newOccurrenceStack.push(prod.idx);
        var nextPath = {
          idx: currIdx,
          def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop(currDef)),
          ruleStack: newRuleStack,
          occurrenceStack: newOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof Option) {
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout);
        possiblePaths.push(EXIT_ALTERNATIVE);
        var nextPathWith = {
          idx: currIdx,
          def: prod.definition.concat(drop(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof RepetitionMandatory) {
        var secondIteration = new Repetition({
          definition: prod.definition,
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([secondIteration], drop(currDef));
        var nextPath = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof RepetitionMandatoryWithSeparator) {
        var separatorGast = new Terminal({
          terminalType: prod.separator
        });
        var secondIteration = new Repetition({
          definition: [separatorGast].concat(prod.definition),
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([secondIteration], drop(currDef));
        var nextPath = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof RepetitionWithSeparator) {
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout);
        possiblePaths.push(EXIT_ALTERNATIVE);
        var separatorGast = new Terminal({
          terminalType: prod.separator
        });
        var nthRepetition = new Repetition({
          definition: [separatorGast].concat(prod.definition),
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([nthRepetition], drop(currDef));
        var nextPathWith = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof Repetition) {
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout);
        possiblePaths.push(EXIT_ALTERNATIVE);
        var nthRepetition = new Repetition({
          definition: prod.definition,
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([nthRepetition], drop(currDef));
        var nextPathWith = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof Alternation) {
        for (var i = prod.definition.length - 1; i >= 0; i--) {
          var currAlt = prod.definition[i];
          var currAltPath = {
            idx: currIdx,
            def: currAlt.definition.concat(drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(currAltPath);
          possiblePaths.push(EXIT_ALTERNATIVE);
        }
      } else if (prod instanceof Alternative) {
        possiblePaths.push({
          idx: currIdx,
          def: prod.definition.concat(drop(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        });
      } else if (prod instanceof Rule) {
        possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
      } else {
        throw Error("non exhaustive match");
      }
    }
    return result;
  }
  function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
    var newRuleStack = cloneArr(currRuleStack);
    newRuleStack.push(topRule.name);
    var newCurrOccurrenceStack = cloneArr(currOccurrenceStack);
    newCurrOccurrenceStack.push(1);
    return {
      idx: currIdx,
      def: topRule.definition,
      ruleStack: newRuleStack,
      occurrenceStack: newCurrOccurrenceStack
    };
  }
  var __extends$3 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var PROD_TYPE;
  (function(PROD_TYPE2) {
    PROD_TYPE2[PROD_TYPE2["OPTION"] = 0] = "OPTION";
    PROD_TYPE2[PROD_TYPE2["REPETITION"] = 1] = "REPETITION";
    PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
    PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
    PROD_TYPE2[PROD_TYPE2["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
    PROD_TYPE2[PROD_TYPE2["ALTERNATION"] = 5] = "ALTERNATION";
  })(PROD_TYPE || (PROD_TYPE = {}));
  function getProdType(prod) {
    if (prod instanceof Option) {
      return PROD_TYPE.OPTION;
    } else if (prod instanceof Repetition) {
      return PROD_TYPE.REPETITION;
    } else if (prod instanceof RepetitionMandatory) {
      return PROD_TYPE.REPETITION_MANDATORY;
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
    } else if (prod instanceof RepetitionWithSeparator) {
      return PROD_TYPE.REPETITION_WITH_SEPARATOR;
    } else if (prod instanceof Alternation) {
      return PROD_TYPE.ALTERNATION;
    } else {
      throw Error("non exhaustive match");
    }
  }
  function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
    var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
    var tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
    return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher2, dynamicTokensEnabled);
  }
  function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
    var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
    var tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
    return lookaheadBuilder(lookAheadPaths[0], tokenMatcher2, dynamicTokensEnabled);
  }
  function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher2, dynamicTokensEnabled) {
    var numOfAlts = alts.length;
    var areAllOneTokenLookahead = every(alts, function(currAlt) {
      return every(currAlt, function(currPath) {
        return currPath.length === 1;
      });
    });
    if (hasPredicates) {
      return function(orAlts) {
        var predicates = map(orAlts, function(currAlt2) {
          return currAlt2.GATE;
        });
        for (var t = 0; t < numOfAlts; t++) {
          var currAlt = alts[t];
          var currNumOfPaths = currAlt.length;
          var currPredicate = predicates[t];
          if (currPredicate !== void 0 && currPredicate.call(this) === false) {
            continue;
          }
          nextPath: for (var j = 0; j < currNumOfPaths; j++) {
            var currPath = currAlt[j];
            var currPathLength = currPath.length;
            for (var i = 0; i < currPathLength; i++) {
              var nextToken = this.LA(i + 1);
              if (tokenMatcher2(nextToken, currPath[i]) === false) {
                continue nextPath;
              }
            }
            return t;
          }
        }
        return void 0;
      };
    } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
      var singleTokenAlts = map(alts, function(currAlt) {
        return flatten(currAlt);
      });
      var choiceToAlt_1 = reduce(singleTokenAlts, function(result, currAlt, idx) {
        forEach(currAlt, function(currTokType) {
          if (!has(result, currTokType.tokenTypeIdx)) {
            result[currTokType.tokenTypeIdx] = idx;
          }
          forEach(currTokType.categoryMatches, function(currExtendingType) {
            if (!has(result, currExtendingType)) {
              result[currExtendingType] = idx;
            }
          });
        });
        return result;
      }, []);
      return function() {
        var nextToken = this.LA(1);
        return choiceToAlt_1[nextToken.tokenTypeIdx];
      };
    } else {
      return function() {
        for (var t = 0; t < numOfAlts; t++) {
          var currAlt = alts[t];
          var currNumOfPaths = currAlt.length;
          nextPath: for (var j = 0; j < currNumOfPaths; j++) {
            var currPath = currAlt[j];
            var currPathLength = currPath.length;
            for (var i = 0; i < currPathLength; i++) {
              var nextToken = this.LA(i + 1);
              if (tokenMatcher2(nextToken, currPath[i]) === false) {
                continue nextPath;
              }
            }
            return t;
          }
        }
        return void 0;
      };
    }
  }
  function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher2, dynamicTokensEnabled) {
    var areAllOneTokenLookahead = every(alt, function(currPath) {
      return currPath.length === 1;
    });
    var numOfPaths = alt.length;
    if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
      var singleTokensTypes = flatten(alt);
      if (singleTokensTypes.length === 1 && isEmpty(singleTokensTypes[0].categoryMatches)) {
        var expectedTokenType = singleTokensTypes[0];
        var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
        return function() {
          return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
        };
      } else {
        var choiceToAlt_2 = reduce(singleTokensTypes, function(result, currTokType, idx) {
          result[currTokType.tokenTypeIdx] = true;
          forEach(currTokType.categoryMatches, function(currExtendingType) {
            result[currExtendingType] = true;
          });
          return result;
        }, []);
        return function() {
          var nextToken = this.LA(1);
          return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
        };
      }
    } else {
      return function() {
        nextPath: for (var j = 0; j < numOfPaths; j++) {
          var currPath = alt[j];
          var currPathLength = currPath.length;
          for (var i = 0; i < currPathLength; i++) {
            var nextToken = this.LA(i + 1);
            if (tokenMatcher2(nextToken, currPath[i]) === false) {
              continue nextPath;
            }
          }
          return true;
        }
        return false;
      };
    }
  }
  var RestDefinitionFinderWalker = (
    /** @class */
    (function(_super) {
      __extends$3(RestDefinitionFinderWalker2, _super);
      function RestDefinitionFinderWalker2(topProd, targetOccurrence, targetProdType) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        return _this;
      }
      RestDefinitionFinderWalker2.prototype.startWalking = function() {
        this.walk(this.topProd);
        return this.restDef;
      };
      RestDefinitionFinderWalker2.prototype.checkIsTarget = function(node, expectedProdType, currRest, prevRest) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
          this.restDef = currRest.concat(prevRest);
          return true;
        }
        return false;
      };
      RestDefinitionFinderWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
        if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
        }
      };
      return RestDefinitionFinderWalker2;
    })(RestWalker)
  );
  var InsideDefinitionFinderVisitor = (
    /** @class */
    (function(_super) {
      __extends$3(InsideDefinitionFinderVisitor2, _super);
      function InsideDefinitionFinderVisitor2(targetOccurrence, targetProdType, targetRef) {
        var _this = _super.call(this) || this;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        _this.targetRef = targetRef;
        _this.result = [];
        return _this;
      }
      InsideDefinitionFinderVisitor2.prototype.checkIsTarget = function(node, expectedProdName) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) {
          this.result = node.definition;
        }
      };
      InsideDefinitionFinderVisitor2.prototype.visitOption = function(node) {
        this.checkIsTarget(node, PROD_TYPE.OPTION);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetition = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatory = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
      };
      InsideDefinitionFinderVisitor2.prototype.visitAlternation = function(node) {
        this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
      };
      return InsideDefinitionFinderVisitor2;
    })(GAstVisitor)
  );
  function initializeArrayOfArrays(size) {
    var result = new Array(size);
    for (var i = 0; i < size; i++) {
      result[i] = [];
    }
    return result;
  }
  function pathToHashKeys(path2) {
    var keys2 = [""];
    for (var i = 0; i < path2.length; i++) {
      var tokType = path2[i];
      var longerKeys = [];
      for (var j = 0; j < keys2.length; j++) {
        var currShorterKey = keys2[j];
        longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
        for (var t = 0; t < tokType.categoryMatches.length; t++) {
          var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
          longerKeys.push(currShorterKey + categoriesKeySuffix);
        }
      }
      keys2 = longerKeys;
    }
    return keys2;
  }
  function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
    for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
      if (currAltIdx === idx) {
        continue;
      }
      var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
      for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
        var searchKey = searchPathKeys[searchIdx];
        if (otherAltKnownPathsKeys[searchKey] === true) {
          return false;
        }
      }
    }
    return true;
  }
  function lookAheadSequenceFromAlternatives(altsDefs, k) {
    var partialAlts = map(altsDefs, function(currAlt) {
      return possiblePathsFrom([currAlt], 1);
    });
    var finalResult = initializeArrayOfArrays(partialAlts.length);
    var altsHashes = map(partialAlts, function(currAltPaths) {
      var dict = {};
      forEach(currAltPaths, function(item) {
        var keys2 = pathToHashKeys(item.partialPath);
        forEach(keys2, function(currKey) {
          dict[currKey] = true;
        });
      });
      return dict;
    });
    var newData = partialAlts;
    for (var pathLength = 1; pathLength <= k; pathLength++) {
      var currDataset = newData;
      newData = initializeArrayOfArrays(currDataset.length);
      var _loop_1 = function(altIdx2) {
        var currAltPathsAndSuffixes = currDataset[altIdx2];
        for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
          var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
          var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
          var prefixKeys = pathToHashKeys(currPathPrefix);
          var isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx2);
          if (isUnique || isEmpty(suffixDef) || currPathPrefix.length === k) {
            var currAltResult = finalResult[altIdx2];
            if (containsPath(currAltResult, currPathPrefix) === false) {
              currAltResult.push(currPathPrefix);
              for (var j = 0; j < prefixKeys.length; j++) {
                var currKey = prefixKeys[j];
                altsHashes[altIdx2][currKey] = true;
              }
            }
          } else {
            var newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
            newData[altIdx2] = newData[altIdx2].concat(newPartialPathsAndSuffixes);
            forEach(newPartialPathsAndSuffixes, function(item) {
              var prefixKeys2 = pathToHashKeys(item.partialPath);
              forEach(prefixKeys2, function(key) {
                altsHashes[altIdx2][key] = true;
              });
            });
          }
        }
      };
      for (var altIdx = 0; altIdx < currDataset.length; altIdx++) {
        _loop_1(altIdx);
      }
    }
    return finalResult;
  }
  function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
    var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
    ruleGrammar.accept(visitor);
    return lookAheadSequenceFromAlternatives(visitor.result, k);
  }
  function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
    var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
    ruleGrammar.accept(insideDefVisitor);
    var insideDef = insideDefVisitor.result;
    var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
    var afterDef = afterDefWalker.startWalking();
    var insideFlat = new Alternative({ definition: insideDef });
    var afterFlat = new Alternative({ definition: afterDef });
    return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
  }
  function containsPath(alternative, searchPath) {
    compareOtherPath: for (var i = 0; i < alternative.length; i++) {
      var otherPath = alternative[i];
      if (otherPath.length !== searchPath.length) {
        continue;
      }
      for (var j = 0; j < otherPath.length; j++) {
        var searchTok = searchPath[j];
        var otherTok = otherPath[j];
        var matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
        if (matchingTokens === false) {
          continue compareOtherPath;
        }
      }
      return true;
    }
    return false;
  }
  function isStrictPrefixOfPath(prefix, other) {
    return prefix.length < other.length && every(prefix, function(tokType, idx) {
      var otherTokType = other[idx];
      return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
    });
  }
  function areTokenCategoriesNotUsed(lookAheadPaths) {
    return every(lookAheadPaths, function(singleAltPaths) {
      return every(singleAltPaths, function(singlePath) {
        return every(singlePath, function(token) {
          return isEmpty(token.categoryMatches);
        });
      });
    });
  }
  var __extends$2 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  function validateGrammar$1(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
    var duplicateErrors = map(topLevels, function(currTopLevel) {
      return validateDuplicateProductions(currTopLevel, errMsgProvider);
    });
    var leftRecursionErrors = map(topLevels, function(currTopRule) {
      return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
    });
    var emptyAltErrors = [];
    var ambiguousAltsErrors = [];
    var emptyRepetitionErrors = [];
    if (every(leftRecursionErrors, isEmpty)) {
      emptyAltErrors = map(topLevels, function(currTopRule) {
        return validateEmptyOrAlternative(currTopRule, errMsgProvider);
      });
      ambiguousAltsErrors = map(topLevels, function(currTopRule) {
        return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
      });
      emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
    }
    var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
    var tooManyAltsErrors = map(topLevels, function(curRule) {
      return validateTooManyAlts(curRule, errMsgProvider);
    });
    var duplicateRulesError = map(topLevels, function(curRule) {
      return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
    });
    return flatten(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError));
  }
  function validateDuplicateProductions(topLevelRule, errMsgProvider) {
    var collectorVisitor2 = new OccurrenceValidationCollector();
    topLevelRule.accept(collectorVisitor2);
    var allRuleProductions = collectorVisitor2.allProductions;
    var productionGroups = groupBy(allRuleProductions, identifyProductionForDuplicates);
    var duplicates = pick(productionGroups, function(currGroup) {
      return currGroup.length > 1;
    });
    var errors = map(values(duplicates), function(currDuplicates) {
      var firstProd = first$1(currDuplicates);
      var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
      var dslName = getProductionDslName(firstProd);
      var defError = {
        message: msg,
        type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
        ruleName: topLevelRule.name,
        dslName,
        occurrence: firstProd.idx
      };
      var param = getExtraProductionArgument(firstProd);
      if (param) {
        defError.parameter = param;
      }
      return defError;
    });
    return errors;
  }
  function identifyProductionForDuplicates(prod) {
    return getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
  }
  function getExtraProductionArgument(prod) {
    if (prod instanceof Terminal) {
      return prod.terminalType.name;
    } else if (prod instanceof NonTerminal) {
      return prod.nonTerminalName;
    } else {
      return "";
    }
  }
  var OccurrenceValidationCollector = (
    /** @class */
    (function(_super) {
      __extends$2(OccurrenceValidationCollector2, _super);
      function OccurrenceValidationCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
      }
      OccurrenceValidationCollector2.prototype.visitNonTerminal = function(subrule) {
        this.allProductions.push(subrule);
      };
      OccurrenceValidationCollector2.prototype.visitOption = function(option) {
        this.allProductions.push(option);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.allProductions.push(manySep);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.allProductions.push(atLeastOne);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      };
      OccurrenceValidationCollector2.prototype.visitRepetition = function(many) {
        this.allProductions.push(many);
      };
      OccurrenceValidationCollector2.prototype.visitAlternation = function(or) {
        this.allProductions.push(or);
      };
      OccurrenceValidationCollector2.prototype.visitTerminal = function(terminal) {
        this.allProductions.push(terminal);
      };
      return OccurrenceValidationCollector2;
    })(GAstVisitor)
  );
  function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
    var errors = [];
    var occurrences = reduce(allRules, function(result, curRule) {
      if (curRule.name === rule.name) {
        return result + 1;
      }
      return result;
    }, 0);
    if (occurrences > 1) {
      var errMsg = errMsgProvider.buildDuplicateRuleNameError({
        topLevelRule: rule,
        grammarName: className
      });
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
        ruleName: rule.name
      });
    }
    return errors;
  }
  function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
    var errors = [];
    var errMsg;
    if (!contains(definedRulesNames, ruleName)) {
      errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-as it is not defined in any of the super grammars ";
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
        ruleName
      });
    }
    return errors;
  }
  function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path2) {
    if (path2 === void 0) {
      path2 = [];
    }
    var errors = [];
    var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
    if (isEmpty(nextNonTerminals)) {
      return [];
    } else {
      var ruleName = topRule.name;
      var foundLeftRecursion = contains(nextNonTerminals, topRule);
      if (foundLeftRecursion) {
        errors.push({
          message: errMsgProvider.buildLeftRecursionError({
            topLevelRule: topRule,
            leftRecursionPath: path2
          }),
          type: ParserDefinitionErrorType.LEFT_RECURSION,
          ruleName
        });
      }
      var validNextSteps = difference(nextNonTerminals, path2.concat([topRule]));
      var errorsFromNextSteps = map(validNextSteps, function(currRefRule) {
        var newPath = cloneArr(path2);
        newPath.push(currRefRule);
        return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
      });
      return errors.concat(flatten(errorsFromNextSteps));
    }
  }
  function getFirstNoneTerminal(definition) {
    var result = [];
    if (isEmpty(definition)) {
      return result;
    }
    var firstProd = first$1(definition);
    if (firstProd instanceof NonTerminal) {
      result.push(firstProd.referencedRule);
    } else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) {
      result = result.concat(getFirstNoneTerminal(firstProd.definition));
    } else if (firstProd instanceof Alternation) {
      result = flatten(map(firstProd.definition, function(currSubDef) {
        return getFirstNoneTerminal(currSubDef.definition);
      }));
    } else if (firstProd instanceof Terminal) ;
    else {
      throw Error("non exhaustive match");
    }
    var isFirstOptional = isOptionalProd(firstProd);
    var hasMore = definition.length > 1;
    if (isFirstOptional && hasMore) {
      var rest = drop(definition);
      return result.concat(getFirstNoneTerminal(rest));
    } else {
      return result;
    }
  }
  var OrCollector = (
    /** @class */
    (function(_super) {
      __extends$2(OrCollector2, _super);
      function OrCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alternations = [];
        return _this;
      }
      OrCollector2.prototype.visitAlternation = function(node) {
        this.alternations.push(node);
      };
      return OrCollector2;
    })(GAstVisitor)
  );
  function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = reduce(ors, function(errors2, currOr) {
      var exceptLast = dropRight(currOr.definition);
      var currErrors = map(exceptLast, function(currAlternative, currAltIdx) {
        var possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], null, 1);
        if (isEmpty(possibleFirstInAlt)) {
          return {
            message: errMsgProvider.buildEmptyAlternationError({
              topLevelRule,
              alternation: currOr,
              emptyChoiceIdx: currAltIdx
            }),
            type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx,
            alternative: currAltIdx + 1
          };
        } else {
          return null;
        }
      });
      return errors2.concat(compact(currErrors));
    }, []);
    return errors;
  }
  function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    ors = reject(ors, function(currOr) {
      return currOr.ignoreAmbiguities === true;
    });
    var errors = reduce(ors, function(result, currOr) {
      var currOccurrence = currOr.idx;
      var actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
      var alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
      var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
      var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
      return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
    }, []);
    return errors;
  }
  var RepetionCollector = (
    /** @class */
    (function(_super) {
      __extends$2(RepetionCollector2, _super);
      function RepetionCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
      }
      RepetionCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.allProductions.push(manySep);
      };
      RepetionCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.allProductions.push(atLeastOne);
      };
      RepetionCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      };
      RepetionCollector2.prototype.visitRepetition = function(many) {
        this.allProductions.push(many);
      };
      return RepetionCollector2;
    })(GAstVisitor)
  );
  function validateTooManyAlts(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = reduce(ors, function(errors2, currOr) {
      if (currOr.definition.length > 255) {
        errors2.push({
          message: errMsgProvider.buildTooManyAlternativesError({
            topLevelRule,
            alternation: currOr
          }),
          type: ParserDefinitionErrorType.TOO_MANY_ALTS,
          ruleName: topLevelRule.name,
          occurrence: currOr.idx
        });
      }
      return errors2;
    }, []);
    return errors;
  }
  function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
    var errors = [];
    forEach(topLevelRules, function(currTopRule) {
      var collectorVisitor2 = new RepetionCollector();
      currTopRule.accept(collectorVisitor2);
      var allRuleProductions = collectorVisitor2.allProductions;
      forEach(allRuleProductions, function(currProd) {
        var prodType = getProdType(currProd);
        var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
        var currOccurrence = currProd.idx;
        var paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
        var pathsInsideProduction = paths[0];
        if (isEmpty(flatten(pathsInsideProduction))) {
          var errMsg = errMsgProvider.buildEmptyRepetitionError({
            topLevelRule: currTopRule,
            repetition: currProd
          });
          errors.push({
            message: errMsg,
            type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
            ruleName: currTopRule.name
          });
        }
      });
    });
    return errors;
  }
  function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var foundAmbiguousPaths = [];
    var identicalAmbiguities = reduce(alternatives, function(result, currAlt, currAltIdx) {
      if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
        return result;
      }
      forEach(currAlt, function(currPath) {
        var altsCurrPathAppearsIn = [currAltIdx];
        forEach(alternatives, function(currOtherAlt, currOtherAltIdx) {
          if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && // ignore (skip) ambiguities with this "other" alternative
          alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
            altsCurrPathAppearsIn.push(currOtherAltIdx);
          }
        });
        if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
          foundAmbiguousPaths.push(currPath);
          result.push({
            alts: altsCurrPathAppearsIn,
            path: currPath
          });
        }
      });
      return result;
    }, []);
    var currErrors = map(identicalAmbiguities, function(currAmbDescriptor) {
      var ambgIndices = map(currAmbDescriptor.alts, function(currAltIdx) {
        return currAltIdx + 1;
      });
      var currMessage = errMsgProvider.buildAlternationAmbiguityError({
        topLevelRule: rule,
        alternation,
        ambiguityIndices: ambgIndices,
        prefixPath: currAmbDescriptor.path
      });
      return {
        message: currMessage,
        type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
        ruleName: rule.name,
        occurrence: alternation.idx,
        alternatives: [currAmbDescriptor.alts]
      };
    });
    return currErrors;
  }
  function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var errors = [];
    var pathsAndIndices = reduce(alternatives, function(result, currAlt, idx) {
      var currPathsAndIdx = map(currAlt, function(currPath) {
        return { idx, path: currPath };
      });
      return result.concat(currPathsAndIdx);
    }, []);
    forEach(pathsAndIndices, function(currPathAndIdx) {
      var alternativeGast = alternation.definition[currPathAndIdx.idx];
      if (alternativeGast.ignoreAmbiguities === true) {
        return;
      }
      var targetIdx = currPathAndIdx.idx;
      var targetPath = currPathAndIdx.path;
      var prefixAmbiguitiesPathsAndIndices = findAll(pathsAndIndices, function(searchPathAndIdx) {
        return (
          // ignore (skip) ambiguities with this "other" alternative
          alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && // checking for strict prefix because identical lookaheads
          // will be be detected using a different validation.
          isStrictPrefixOfPath(searchPathAndIdx.path, targetPath)
        );
      });
      var currPathPrefixErrors = map(prefixAmbiguitiesPathsAndIndices, function(currAmbPathAndIdx) {
        var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
        var occurrence = alternation.idx === 0 ? "" : alternation.idx;
        var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
          topLevelRule: rule,
          alternation,
          ambiguityIndices: ambgIndices,
          prefixPath: currAmbPathAndIdx.path
        });
        return {
          message,
          type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
          ruleName: rule.name,
          occurrence,
          alternatives: ambgIndices
        };
      });
      errors = errors.concat(currPathPrefixErrors);
    });
    return errors;
  }
  function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
    var errors = [];
    var tokenNames = map(tokenTypes, function(currToken) {
      return currToken.name;
    });
    forEach(topLevels, function(currRule) {
      var currRuleName = currRule.name;
      if (contains(tokenNames, currRuleName)) {
        var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
        errors.push({
          message: errMsg,
          type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
          ruleName: currRuleName
        });
      }
    });
    return errors;
  }
  function resolveGrammar(options) {
    options = defaults(options, {
      errMsgProvider: defaultGrammarResolverErrorProvider
    });
    var topRulesTable = {};
    forEach(options.rules, function(rule) {
      topRulesTable[rule.name] = rule;
    });
    return resolveGrammar$1(topRulesTable, options.errMsgProvider);
  }
  function validateGrammar(options) {
    options = defaults(options, {
      errMsgProvider: defaultGrammarValidatorErrorProvider
    });
    return validateGrammar$1(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
  }
  function assignOccurrenceIndices(options) {
    forEach(options.rules, function(currRule) {
      var methodsCollector = new DslMethodsCollectorVisitor();
      currRule.accept(methodsCollector);
      forEach(methodsCollector.dslMethods, function(methods) {
        forEach(methods, function(currMethod, arrIdx) {
          currMethod.idx = arrIdx + 1;
        });
      });
    });
  }
  var __extends$1 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
  var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
  var EARLY_EXIT_EXCEPTION = "EarlyExitException";
  var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
  var RECOGNITION_EXCEPTION_NAMES = [
    MISMATCHED_TOKEN_EXCEPTION,
    NO_VIABLE_ALT_EXCEPTION,
    EARLY_EXIT_EXCEPTION,
    NOT_ALL_INPUT_PARSED_EXCEPTION
  ];
  Object.freeze(RECOGNITION_EXCEPTION_NAMES);
  function isRecognitionException(error) {
    return contains(RECOGNITION_EXCEPTION_NAMES, error.name);
  }
  var RecognitionException = (
    /** @class */
    (function(_super) {
      __extends$1(RecognitionException2, _super);
      function RecognitionException2(message, token) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.token = token;
        _this.resyncedTokens = [];
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
      }
      return RecognitionException2;
    })(Error)
  );
  var MismatchedTokenException = (
    /** @class */
    (function(_super) {
      __extends$1(MismatchedTokenException2, _super);
      function MismatchedTokenException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = MISMATCHED_TOKEN_EXCEPTION;
        return _this;
      }
      return MismatchedTokenException2;
    })(RecognitionException)
  );
  var NoViableAltException = (
    /** @class */
    (function(_super) {
      __extends$1(NoViableAltException2, _super);
      function NoViableAltException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = NO_VIABLE_ALT_EXCEPTION;
        return _this;
      }
      return NoViableAltException2;
    })(RecognitionException)
  );
  var NotAllInputParsedException = (
    /** @class */
    (function(_super) {
      __extends$1(NotAllInputParsedException2, _super);
      function NotAllInputParsedException2(message, token) {
        var _this = _super.call(this, message, token) || this;
        _this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
        return _this;
      }
      return NotAllInputParsedException2;
    })(RecognitionException)
  );
  var EarlyExitException = (
    /** @class */
    (function(_super) {
      __extends$1(EarlyExitException2, _super);
      function EarlyExitException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = EARLY_EXIT_EXCEPTION;
        return _this;
      }
      return EarlyExitException2;
    })(RecognitionException)
  );
  var EOF_FOLLOW_KEY = {};
  var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
  function InRuleRecoveryException(message) {
    this.name = IN_RULE_RECOVERY_EXCEPTION;
    this.message = message;
  }
  InRuleRecoveryException.prototype = Error.prototype;
  var Recoverable = (
    /** @class */
    (function() {
      function Recoverable2() {
      }
      Recoverable2.prototype.initRecoverable = function(config) {
        this.firstAfterRepMap = {};
        this.resyncFollows = {};
        this.recoveryEnabled = has(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
        if (this.recoveryEnabled) {
          this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
        }
      };
      Recoverable2.prototype.getTokenToInsert = function(tokType) {
        var tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
        tokToInsert.isInsertedInRecovery = true;
        return tokToInsert;
      };
      Recoverable2.prototype.canTokenTypeBeInsertedInRecovery = function(tokType) {
        return true;
      };
      Recoverable2.prototype.tryInRepetitionRecovery = function(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
        var _this = this;
        var reSyncTokType = this.findReSyncTokenType();
        var savedLexerState = this.exportLexerState();
        var resyncedTokens = [];
        var passedResyncPoint = false;
        var nextTokenWithoutResync = this.LA(1);
        var currToken = this.LA(1);
        var generateErrorMessage = function() {
          var previousToken = _this.LA(0);
          var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
            expected: expectedTokType,
            actual: nextTokenWithoutResync,
            previous: previousToken,
            ruleName: _this.getCurrRuleFullName()
          });
          var error = new MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0));
          error.resyncedTokens = dropRight(resyncedTokens);
          _this.SAVE_ERROR(error);
        };
        while (!passedResyncPoint) {
          if (this.tokenMatcher(currToken, expectedTokType)) {
            generateErrorMessage();
            return;
          } else if (lookAheadFunc.call(this)) {
            generateErrorMessage();
            grammarRule.apply(this, grammarRuleArgs);
            return;
          } else if (this.tokenMatcher(currToken, reSyncTokType)) {
            passedResyncPoint = true;
          } else {
            currToken = this.SKIP_TOKEN();
            this.addToResyncTokens(currToken, resyncedTokens);
          }
        }
        this.importLexerState(savedLexerState);
      };
      Recoverable2.prototype.shouldInRepetitionRecoveryBeTried = function(expectTokAfterLastMatch, nextTokIdx, notStuck) {
        if (notStuck === false) {
          return false;
        }
        if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) {
          return false;
        }
        if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
          return false;
        }
        if (this.isBackTracking()) {
          return false;
        }
        if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
          return false;
        }
        return true;
      };
      Recoverable2.prototype.getFollowsForInRuleRecovery = function(tokType, tokIdxInRule) {
        var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
        var follows = this.getNextPossibleTokenTypes(grammarPath);
        return follows;
      };
      Recoverable2.prototype.tryInRuleRecovery = function(expectedTokType, follows) {
        if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
          var tokToInsert = this.getTokenToInsert(expectedTokType);
          return tokToInsert;
        }
        if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
          var nextTok = this.SKIP_TOKEN();
          this.consumeToken();
          return nextTok;
        }
        throw new InRuleRecoveryException("sad sad panda");
      };
      Recoverable2.prototype.canPerformInRuleRecovery = function(expectedToken, follows) {
        return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
      };
      Recoverable2.prototype.canRecoverWithSingleTokenInsertion = function(expectedTokType, follows) {
        var _this = this;
        if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
          return false;
        }
        if (isEmpty(follows)) {
          return false;
        }
        var mismatchedTok = this.LA(1);
        var isMisMatchedTokInFollows = find(follows, function(possibleFollowsTokType) {
          return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
        }) !== void 0;
        return isMisMatchedTokInFollows;
      };
      Recoverable2.prototype.canRecoverWithSingleTokenDeletion = function(expectedTokType) {
        var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
        return isNextTokenWhatIsExpected;
      };
      Recoverable2.prototype.isInCurrentRuleReSyncSet = function(tokenTypeIdx) {
        var followKey = this.getCurrFollowKey();
        var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
        return contains(currentRuleReSyncSet, tokenTypeIdx);
      };
      Recoverable2.prototype.findReSyncTokenType = function() {
        var allPossibleReSyncTokTypes = this.flattenFollowSet();
        var nextToken = this.LA(1);
        var k = 2;
        while (true) {
          var nextTokenType = nextToken.tokenType;
          if (contains(allPossibleReSyncTokTypes, nextTokenType)) {
            return nextTokenType;
          }
          nextToken = this.LA(k);
          k++;
        }
      };
      Recoverable2.prototype.getCurrFollowKey = function() {
        if (this.RULE_STACK.length === 1) {
          return EOF_FOLLOW_KEY;
        }
        var currRuleShortName = this.getLastExplicitRuleShortName();
        var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
        var prevRuleShortName = this.getPreviousExplicitRuleShortName();
        return {
          ruleName: this.shortRuleNameToFullName(currRuleShortName),
          idxInCallingRule: currRuleIdx,
          inRule: this.shortRuleNameToFullName(prevRuleShortName)
        };
      };
      Recoverable2.prototype.buildFullFollowKeyStack = function() {
        var _this = this;
        var explicitRuleStack = this.RULE_STACK;
        var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
        return map(explicitRuleStack, function(ruleName, idx) {
          if (idx === 0) {
            return EOF_FOLLOW_KEY;
          }
          return {
            ruleName: _this.shortRuleNameToFullName(ruleName),
            idxInCallingRule: explicitOccurrenceStack[idx],
            inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
          };
        });
      };
      Recoverable2.prototype.flattenFollowSet = function() {
        var _this = this;
        var followStack = map(this.buildFullFollowKeyStack(), function(currKey) {
          return _this.getFollowSetFromFollowKey(currKey);
        });
        return flatten(followStack);
      };
      Recoverable2.prototype.getFollowSetFromFollowKey = function(followKey) {
        if (followKey === EOF_FOLLOW_KEY) {
          return [EOF];
        }
        var followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
        return this.resyncFollows[followName];
      };
      Recoverable2.prototype.addToResyncTokens = function(token, resyncTokens) {
        if (!this.tokenMatcher(token, EOF)) {
          resyncTokens.push(token);
        }
        return resyncTokens;
      };
      Recoverable2.prototype.reSyncTo = function(tokType) {
        var resyncedTokens = [];
        var nextTok = this.LA(1);
        while (this.tokenMatcher(nextTok, tokType) === false) {
          nextTok = this.SKIP_TOKEN();
          this.addToResyncTokens(nextTok, resyncedTokens);
        }
        return dropRight(resyncedTokens);
      };
      Recoverable2.prototype.attemptInRepetitionRecovery = function(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
      };
      Recoverable2.prototype.getCurrentGrammarPath = function(tokType, tokIdxInRule) {
        var pathRuleStack = this.getHumanReadableRuleStack();
        var pathOccurrenceStack = cloneArr(this.RULE_OCCURRENCE_STACK);
        var grammarPath = {
          ruleStack: pathRuleStack,
          occurrenceStack: pathOccurrenceStack,
          lastTok: tokType,
          lastTokOccurrence: tokIdxInRule
        };
        return grammarPath;
      };
      Recoverable2.prototype.getHumanReadableRuleStack = function() {
        var _this = this;
        return map(this.RULE_STACK, function(currShortName) {
          return _this.shortRuleNameToFullName(currShortName);
        });
      };
      return Recoverable2;
    })()
  );
  function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
    var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
    var firstAfterRepInfo = this.firstAfterRepMap[key];
    if (firstAfterRepInfo === void 0) {
      var currRuleName = this.getCurrRuleFullName();
      var ruleGrammar = this.getGAstProductions()[currRuleName];
      var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
      firstAfterRepInfo = walker.startWalking();
      this.firstAfterRepMap[key] = firstAfterRepInfo;
    }
    var expectTokAfterLastMatch = firstAfterRepInfo.token;
    var nextTokIdx = firstAfterRepInfo.occurrence;
    var isEndOfRule = firstAfterRepInfo.isEndOfRule;
    if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
      expectTokAfterLastMatch = EOF;
      nextTokIdx = 1;
    }
    if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
      this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
    }
  }
  var BITS_FOR_METHOD_TYPE = 4;
  var BITS_FOR_OCCURRENCE_IDX = 8;
  var OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
  var OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
  var MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
  var AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
  var MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
  var AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
  function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
    return occurrence | dslMethodIdx | ruleIdx;
  }
  var LooksAhead = (
    /** @class */
    (function() {
      function LooksAhead2() {
      }
      LooksAhead2.prototype.initLooksAhead = function(config) {
        this.dynamicTokensEnabled = has(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
        this.maxLookahead = has(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
        this.lookAheadFuncsCache = isES2015MapSupported() ? /* @__PURE__ */ new Map() : [];
        if (isES2015MapSupported()) {
          this.getLaFuncFromCache = this.getLaFuncFromMap;
          this.setLaFuncCache = this.setLaFuncCacheUsingMap;
        } else {
          this.getLaFuncFromCache = this.getLaFuncFromObj;
          this.setLaFuncCache = this.setLaFuncUsingObj;
        }
      };
      LooksAhead2.prototype.preComputeLookaheadFunctions = function(rules) {
        var _this = this;
        forEach(rules, function(currRule) {
          _this.TRACE_INIT(currRule.name + " Rule Lookahead", function() {
            var _a = collectMethods(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
            forEach(alternation, function(currProd) {
              var prodIdx = currProd.idx === 0 ? "" : currProd.idx;
              _this.TRACE_INIT("" + getProductionDslName(currProd) + prodIdx, function() {
                var laFunc = buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
                var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
                _this.setLaFuncCache(key, laFunc);
              });
            });
            forEach(repetition, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, PROD_TYPE.REPETITION, currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach(option, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, PROD_TYPE.OPTION, currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach(repetitionMandatory, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach(repetitionMandatoryWithSeparator, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach(repetitionWithSeparator, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
            });
          });
        });
      };
      LooksAhead2.prototype.computeLookaheadFunc = function(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
        var _this = this;
        this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function() {
          var laFunc = buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
          var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
          _this.setLaFuncCache(key, laFunc);
        });
      };
      LooksAhead2.prototype.lookAheadBuilderForOptional = function(alt, tokenMatcher2, dynamicTokensEnabled) {
        return buildSingleAlternativeLookaheadFunction(alt, tokenMatcher2, dynamicTokensEnabled);
      };
      LooksAhead2.prototype.lookAheadBuilderForAlternatives = function(alts, hasPredicates, tokenMatcher2, dynamicTokensEnabled) {
        return buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher2, dynamicTokensEnabled);
      };
      LooksAhead2.prototype.getKeyForAutomaticLookahead = function(dslMethodIdx, occurrence) {
        var currRuleShortName = this.getLastExplicitRuleShortName();
        return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
      };
      LooksAhead2.prototype.getLaFuncFromCache = function(key) {
        return void 0;
      };
      LooksAhead2.prototype.getLaFuncFromMap = function(key) {
        return this.lookAheadFuncsCache.get(key);
      };
      LooksAhead2.prototype.getLaFuncFromObj = function(key) {
        return this.lookAheadFuncsCache[key];
      };
      LooksAhead2.prototype.setLaFuncCache = function(key, value) {
      };
      LooksAhead2.prototype.setLaFuncCacheUsingMap = function(key, value) {
        this.lookAheadFuncsCache.set(key, value);
      };
      LooksAhead2.prototype.setLaFuncUsingObj = function(key, value) {
        this.lookAheadFuncsCache[key] = value;
      };
      return LooksAhead2;
    })()
  );
  function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
    if (isNaN(currNodeLocation.startOffset) === true) {
      currNodeLocation.startOffset = newLocationInfo.startOffset;
      currNodeLocation.endOffset = newLocationInfo.endOffset;
    } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
      currNodeLocation.endOffset = newLocationInfo.endOffset;
    }
  }
  function setNodeLocationFull(currNodeLocation, newLocationInfo) {
    if (isNaN(currNodeLocation.startOffset) === true) {
      currNodeLocation.startOffset = newLocationInfo.startOffset;
      currNodeLocation.startColumn = newLocationInfo.startColumn;
      currNodeLocation.startLine = newLocationInfo.startLine;
      currNodeLocation.endOffset = newLocationInfo.endOffset;
      currNodeLocation.endColumn = newLocationInfo.endColumn;
      currNodeLocation.endLine = newLocationInfo.endLine;
    } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
      currNodeLocation.endOffset = newLocationInfo.endOffset;
      currNodeLocation.endColumn = newLocationInfo.endColumn;
      currNodeLocation.endLine = newLocationInfo.endLine;
    }
  }
  function addTerminalToCst(node, token, tokenTypeName) {
    if (node.children[tokenTypeName] === void 0) {
      node.children[tokenTypeName] = [token];
    } else {
      node.children[tokenTypeName].push(token);
    }
  }
  function addNoneTerminalToCst(node, ruleName, ruleResult) {
    if (node.children[ruleName] === void 0) {
      node.children[ruleName] = [ruleResult];
    } else {
      node.children[ruleName].push(ruleResult);
    }
  }
  function classNameFromInstance(instance) {
    return functionName(instance.constructor);
  }
  var NAME = "name";
  function functionName(func) {
    var existingNameProp = func.name;
    if (existingNameProp) {
      return existingNameProp;
    } else {
      return "anonymous";
    }
  }
  function defineNameProp(obj, nameValue) {
    var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
    if (isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
      Object.defineProperty(obj, NAME, {
        enumerable: false,
        configurable: true,
        writable: false,
        value: nameValue
      });
      return true;
    }
    return false;
  }
  function defaultVisit(ctx, param) {
    var childrenNames = keys(ctx);
    var childrenNamesLength = childrenNames.length;
    for (var i = 0; i < childrenNamesLength; i++) {
      var currChildName = childrenNames[i];
      var currChildArray = ctx[currChildName];
      var currChildArrayLength = currChildArray.length;
      for (var j = 0; j < currChildArrayLength; j++) {
        var currChild = currChildArray[j];
        if (currChild.tokenTypeIdx === void 0) {
          this[currChild.name](currChild.children, param);
        }
      }
    }
    return void 0;
  }
  function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
    var derivedConstructor = function() {
    };
    defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
    var semanticProto = {
      visit: function(cstNode, param) {
        if (isArray(cstNode)) {
          cstNode = cstNode[0];
        }
        if (isUndefined(cstNode)) {
          return void 0;
        }
        return this[cstNode.name](cstNode.children, param);
      },
      validateVisitor: function() {
        var semanticDefinitionErrors = validateVisitor(this, ruleNames);
        if (!isEmpty(semanticDefinitionErrors)) {
          var errorMessages = map(semanticDefinitionErrors, function(currDefError) {
            return currDefError.msg;
          });
          throw Error("Errors Detected in CST Visitor <" + functionName(this.constructor) + ">:\n	" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n	")));
        }
      }
    };
    derivedConstructor.prototype = semanticProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    derivedConstructor._RULE_NAMES = ruleNames;
    return derivedConstructor;
  }
  function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
    var derivedConstructor = function() {
    };
    defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
    var withDefaultsProto = Object.create(baseConstructor.prototype);
    forEach(ruleNames, function(ruleName) {
      withDefaultsProto[ruleName] = defaultVisit;
    });
    derivedConstructor.prototype = withDefaultsProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    return derivedConstructor;
  }
  var CstVisitorDefinitionError;
  (function(CstVisitorDefinitionError2) {
    CstVisitorDefinitionError2[CstVisitorDefinitionError2["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
    CstVisitorDefinitionError2[CstVisitorDefinitionError2["MISSING_METHOD"] = 1] = "MISSING_METHOD";
  })(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
  function validateVisitor(visitorInstance, ruleNames) {
    var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
    var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
    return missingErrors.concat(redundantErrors);
  }
  function validateMissingCstMethods(visitorInstance, ruleNames) {
    var errors = map(ruleNames, function(currRuleName) {
      if (!isFunction(visitorInstance[currRuleName])) {
        return {
          msg: "Missing visitor method: <" + currRuleName + "> on " + functionName(visitorInstance.constructor) + " CST Visitor.",
          type: CstVisitorDefinitionError.MISSING_METHOD,
          methodName: currRuleName
        };
      }
    });
    return compact(errors);
  }
  var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
  function validateRedundantMethods(visitorInstance, ruleNames) {
    var errors = [];
    for (var prop in visitorInstance) {
      if (isFunction(visitorInstance[prop]) && !contains(VALID_PROP_NAMES, prop) && !contains(ruleNames, prop)) {
        errors.push({
          msg: "Redundant visitor method: <" + prop + "> on " + functionName(visitorInstance.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
          type: CstVisitorDefinitionError.REDUNDANT_METHOD,
          methodName: prop
        });
      }
    }
    return errors;
  }
  var TreeBuilder = (
    /** @class */
    (function() {
      function TreeBuilder2() {
      }
      TreeBuilder2.prototype.initTreeBuilder = function(config) {
        this.CST_STACK = [];
        this.outputCst = config.outputCst;
        this.nodeLocationTracking = has(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
        if (!this.outputCst) {
          this.cstInvocationStateUpdate = NOOP;
          this.cstFinallyStateUpdate = NOOP;
          this.cstPostTerminal = NOOP;
          this.cstPostNonTerminal = NOOP;
          this.cstPostRule = NOOP;
        } else {
          if (/full/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = setNodeLocationFull;
              this.setNodeLocationFromNode = setNodeLocationFull;
              this.cstPostRule = NOOP;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
            } else {
              this.setNodeLocationFromToken = NOOP;
              this.setNodeLocationFromNode = NOOP;
              this.cstPostRule = this.cstPostRuleFull;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
            }
          } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
              this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
              this.cstPostRule = NOOP;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
            } else {
              this.setNodeLocationFromToken = NOOP;
              this.setNodeLocationFromNode = NOOP;
              this.cstPostRule = this.cstPostRuleOnlyOffset;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
            }
          } else if (/none/i.test(this.nodeLocationTracking)) {
            this.setNodeLocationFromToken = NOOP;
            this.setNodeLocationFromNode = NOOP;
            this.cstPostRule = NOOP;
            this.setInitialNodeLocation = NOOP;
          } else {
            throw Error('Invalid <nodeLocationTracking> config option: "' + config.nodeLocationTracking + '"');
          }
        }
      };
      TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          endOffset: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRegular = function(cstNode) {
        cstNode.location = {
          // without error recovery the starting Location of a new CstNode is guaranteed
          // To be the next Token's startOffset (for valid inputs).
          // For invalid inputs there won't be any CSTOutput so this potential
          // inaccuracy does not matter
          startOffset: this.LA(1).startOffset,
          endOffset: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationFullRecovery = function(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          startLine: NaN,
          startColumn: NaN,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationFullRegular = function(cstNode) {
        var nextToken = this.LA(1);
        cstNode.location = {
          startOffset: nextToken.startOffset,
          startLine: nextToken.startLine,
          startColumn: nextToken.startColumn,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      };
      TreeBuilder2.prototype.cstInvocationStateUpdate = function(fullRuleName, shortName) {
        var cstNode = {
          name: fullRuleName,
          children: {}
        };
        this.setInitialNodeLocation(cstNode);
        this.CST_STACK.push(cstNode);
      };
      TreeBuilder2.prototype.cstFinallyStateUpdate = function() {
        this.CST_STACK.pop();
      };
      TreeBuilder2.prototype.cstPostRuleFull = function(ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
          loc.endLine = prevToken.endLine;
          loc.endColumn = prevToken.endColumn;
        } else {
          loc.startOffset = NaN;
          loc.startLine = NaN;
          loc.startColumn = NaN;
        }
      };
      TreeBuilder2.prototype.cstPostRuleOnlyOffset = function(ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
        } else {
          loc.startOffset = NaN;
        }
      };
      TreeBuilder2.prototype.cstPostTerminal = function(key, consumedToken) {
        var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
        addTerminalToCst(rootCst, consumedToken, key);
        this.setNodeLocationFromToken(rootCst.location, consumedToken);
      };
      TreeBuilder2.prototype.cstPostNonTerminal = function(ruleCstResult, ruleName) {
        var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
        addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
        this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
      };
      TreeBuilder2.prototype.getBaseCstVisitorConstructor = function() {
        if (isUndefined(this.baseCstVisitorConstructor)) {
          var newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys(this.gastProductionsCache));
          this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
          return newBaseCstVisitorConstructor;
        }
        return this.baseCstVisitorConstructor;
      };
      TreeBuilder2.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
        if (isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
          var newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
          this.baseCstVisitorWithDefaultsConstructor = newConstructor;
          return newConstructor;
        }
        return this.baseCstVisitorWithDefaultsConstructor;
      };
      TreeBuilder2.prototype.getLastExplicitRuleShortName = function() {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 1];
      };
      TreeBuilder2.prototype.getPreviousExplicitRuleShortName = function() {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 2];
      };
      TreeBuilder2.prototype.getLastExplicitRuleOccurrenceIndex = function() {
        var occurrenceStack = this.RULE_OCCURRENCE_STACK;
        return occurrenceStack[occurrenceStack.length - 1];
      };
      return TreeBuilder2;
    })()
  );
  var LexerAdapter = (
    /** @class */
    (function() {
      function LexerAdapter2() {
      }
      LexerAdapter2.prototype.initLexerAdapter = function() {
        this.tokVector = [];
        this.tokVectorLength = 0;
        this.currIdx = -1;
      };
      Object.defineProperty(LexerAdapter2.prototype, "input", {
        get: function() {
          return this.tokVector;
        },
        set: function(newInput) {
          if (this.selfAnalysisDone !== true) {
            throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
          }
          this.reset();
          this.tokVector = newInput;
          this.tokVectorLength = newInput.length;
        },
        enumerable: false,
        configurable: true
      });
      LexerAdapter2.prototype.SKIP_TOKEN = function() {
        if (this.currIdx <= this.tokVector.length - 2) {
          this.consumeToken();
          return this.LA(1);
        } else {
          return END_OF_FILE;
        }
      };
      LexerAdapter2.prototype.LA = function(howMuch) {
        var soughtIdx = this.currIdx + howMuch;
        if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
          return END_OF_FILE;
        } else {
          return this.tokVector[soughtIdx];
        }
      };
      LexerAdapter2.prototype.consumeToken = function() {
        this.currIdx++;
      };
      LexerAdapter2.prototype.exportLexerState = function() {
        return this.currIdx;
      };
      LexerAdapter2.prototype.importLexerState = function(newState) {
        this.currIdx = newState;
      };
      LexerAdapter2.prototype.resetLexerState = function() {
        this.currIdx = -1;
      };
      LexerAdapter2.prototype.moveToTerminatedState = function() {
        this.currIdx = this.tokVector.length - 1;
      };
      LexerAdapter2.prototype.getLexerPosition = function() {
        return this.exportLexerState();
      };
      return LexerAdapter2;
    })()
  );
  var RecognizerApi = (
    /** @class */
    (function() {
      function RecognizerApi2() {
      }
      RecognizerApi2.prototype.ACTION = function(impl) {
        return impl.call(this);
      };
      RecognizerApi2.prototype.consume = function(idx, tokType, options) {
        return this.consumeInternal(tokType, idx, options);
      };
      RecognizerApi2.prototype.subrule = function(idx, ruleToCall, options) {
        return this.subruleInternal(ruleToCall, idx, options);
      };
      RecognizerApi2.prototype.option = function(idx, actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, idx);
      };
      RecognizerApi2.prototype.or = function(idx, altsOrOpts) {
        return this.orInternal(altsOrOpts, idx);
      };
      RecognizerApi2.prototype.many = function(idx, actionORMethodDef) {
        return this.manyInternal(idx, actionORMethodDef);
      };
      RecognizerApi2.prototype.atLeastOne = function(idx, actionORMethodDef) {
        return this.atLeastOneInternal(idx, actionORMethodDef);
      };
      RecognizerApi2.prototype.CONSUME = function(tokType, options) {
        return this.consumeInternal(tokType, 0, options);
      };
      RecognizerApi2.prototype.CONSUME1 = function(tokType, options) {
        return this.consumeInternal(tokType, 1, options);
      };
      RecognizerApi2.prototype.CONSUME2 = function(tokType, options) {
        return this.consumeInternal(tokType, 2, options);
      };
      RecognizerApi2.prototype.CONSUME3 = function(tokType, options) {
        return this.consumeInternal(tokType, 3, options);
      };
      RecognizerApi2.prototype.CONSUME4 = function(tokType, options) {
        return this.consumeInternal(tokType, 4, options);
      };
      RecognizerApi2.prototype.CONSUME5 = function(tokType, options) {
        return this.consumeInternal(tokType, 5, options);
      };
      RecognizerApi2.prototype.CONSUME6 = function(tokType, options) {
        return this.consumeInternal(tokType, 6, options);
      };
      RecognizerApi2.prototype.CONSUME7 = function(tokType, options) {
        return this.consumeInternal(tokType, 7, options);
      };
      RecognizerApi2.prototype.CONSUME8 = function(tokType, options) {
        return this.consumeInternal(tokType, 8, options);
      };
      RecognizerApi2.prototype.CONSUME9 = function(tokType, options) {
        return this.consumeInternal(tokType, 9, options);
      };
      RecognizerApi2.prototype.SUBRULE = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 0, options);
      };
      RecognizerApi2.prototype.SUBRULE1 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 1, options);
      };
      RecognizerApi2.prototype.SUBRULE2 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 2, options);
      };
      RecognizerApi2.prototype.SUBRULE3 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 3, options);
      };
      RecognizerApi2.prototype.SUBRULE4 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 4, options);
      };
      RecognizerApi2.prototype.SUBRULE5 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 5, options);
      };
      RecognizerApi2.prototype.SUBRULE6 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 6, options);
      };
      RecognizerApi2.prototype.SUBRULE7 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 7, options);
      };
      RecognizerApi2.prototype.SUBRULE8 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 8, options);
      };
      RecognizerApi2.prototype.SUBRULE9 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 9, options);
      };
      RecognizerApi2.prototype.OPTION = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 0);
      };
      RecognizerApi2.prototype.OPTION1 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 1);
      };
      RecognizerApi2.prototype.OPTION2 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 2);
      };
      RecognizerApi2.prototype.OPTION3 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 3);
      };
      RecognizerApi2.prototype.OPTION4 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 4);
      };
      RecognizerApi2.prototype.OPTION5 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 5);
      };
      RecognizerApi2.prototype.OPTION6 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 6);
      };
      RecognizerApi2.prototype.OPTION7 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 7);
      };
      RecognizerApi2.prototype.OPTION8 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 8);
      };
      RecognizerApi2.prototype.OPTION9 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 9);
      };
      RecognizerApi2.prototype.OR = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 0);
      };
      RecognizerApi2.prototype.OR1 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 1);
      };
      RecognizerApi2.prototype.OR2 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 2);
      };
      RecognizerApi2.prototype.OR3 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 3);
      };
      RecognizerApi2.prototype.OR4 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 4);
      };
      RecognizerApi2.prototype.OR5 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 5);
      };
      RecognizerApi2.prototype.OR6 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 6);
      };
      RecognizerApi2.prototype.OR7 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 7);
      };
      RecognizerApi2.prototype.OR8 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 8);
      };
      RecognizerApi2.prototype.OR9 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 9);
      };
      RecognizerApi2.prototype.MANY = function(actionORMethodDef) {
        this.manyInternal(0, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY1 = function(actionORMethodDef) {
        this.manyInternal(1, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY2 = function(actionORMethodDef) {
        this.manyInternal(2, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY3 = function(actionORMethodDef) {
        this.manyInternal(3, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY4 = function(actionORMethodDef) {
        this.manyInternal(4, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY5 = function(actionORMethodDef) {
        this.manyInternal(5, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY6 = function(actionORMethodDef) {
        this.manyInternal(6, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY7 = function(actionORMethodDef) {
        this.manyInternal(7, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY8 = function(actionORMethodDef) {
        this.manyInternal(8, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY9 = function(actionORMethodDef) {
        this.manyInternal(9, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY_SEP = function(options) {
        this.manySepFirstInternal(0, options);
      };
      RecognizerApi2.prototype.MANY_SEP1 = function(options) {
        this.manySepFirstInternal(1, options);
      };
      RecognizerApi2.prototype.MANY_SEP2 = function(options) {
        this.manySepFirstInternal(2, options);
      };
      RecognizerApi2.prototype.MANY_SEP3 = function(options) {
        this.manySepFirstInternal(3, options);
      };
      RecognizerApi2.prototype.MANY_SEP4 = function(options) {
        this.manySepFirstInternal(4, options);
      };
      RecognizerApi2.prototype.MANY_SEP5 = function(options) {
        this.manySepFirstInternal(5, options);
      };
      RecognizerApi2.prototype.MANY_SEP6 = function(options) {
        this.manySepFirstInternal(6, options);
      };
      RecognizerApi2.prototype.MANY_SEP7 = function(options) {
        this.manySepFirstInternal(7, options);
      };
      RecognizerApi2.prototype.MANY_SEP8 = function(options) {
        this.manySepFirstInternal(8, options);
      };
      RecognizerApi2.prototype.MANY_SEP9 = function(options) {
        this.manySepFirstInternal(9, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE = function(actionORMethodDef) {
        this.atLeastOneInternal(0, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE1 = function(actionORMethodDef) {
        return this.atLeastOneInternal(1, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE2 = function(actionORMethodDef) {
        this.atLeastOneInternal(2, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE3 = function(actionORMethodDef) {
        this.atLeastOneInternal(3, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE4 = function(actionORMethodDef) {
        this.atLeastOneInternal(4, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE5 = function(actionORMethodDef) {
        this.atLeastOneInternal(5, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE6 = function(actionORMethodDef) {
        this.atLeastOneInternal(6, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE7 = function(actionORMethodDef) {
        this.atLeastOneInternal(7, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE8 = function(actionORMethodDef) {
        this.atLeastOneInternal(8, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE9 = function(actionORMethodDef) {
        this.atLeastOneInternal(9, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP = function(options) {
        this.atLeastOneSepFirstInternal(0, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP1 = function(options) {
        this.atLeastOneSepFirstInternal(1, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP2 = function(options) {
        this.atLeastOneSepFirstInternal(2, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP3 = function(options) {
        this.atLeastOneSepFirstInternal(3, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP4 = function(options) {
        this.atLeastOneSepFirstInternal(4, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP5 = function(options) {
        this.atLeastOneSepFirstInternal(5, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP6 = function(options) {
        this.atLeastOneSepFirstInternal(6, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP7 = function(options) {
        this.atLeastOneSepFirstInternal(7, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP8 = function(options) {
        this.atLeastOneSepFirstInternal(8, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP9 = function(options) {
        this.atLeastOneSepFirstInternal(9, options);
      };
      RecognizerApi2.prototype.RULE = function(name, implementation, config) {
        if (config === void 0) {
          config = DEFAULT_RULE_CONFIG;
        }
        if (contains(this.definedRulesNames, name)) {
          var errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
            topLevelRule: name,
            grammarName: this.className
          });
          var error = {
            message: errMsg,
            type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
            ruleName: name
          };
          this.definitionErrors.push(error);
        }
        this.definedRulesNames.push(name);
        var ruleImplementation = this.defineRule(name, implementation, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      };
      RecognizerApi2.prototype.OVERRIDE_RULE = function(name, impl, config) {
        if (config === void 0) {
          config = DEFAULT_RULE_CONFIG;
        }
        var ruleErrors = [];
        ruleErrors = ruleErrors.concat(validateRuleIsOverridden(name, this.definedRulesNames, this.className));
        this.definitionErrors.push.apply(this.definitionErrors, ruleErrors);
        var ruleImplementation = this.defineRule(name, impl, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      };
      RecognizerApi2.prototype.BACKTRACK = function(grammarRule, args) {
        return function() {
          this.isBackTrackingStack.push(1);
          var orgState = this.saveRecogState();
          try {
            grammarRule.apply(this, args);
            return true;
          } catch (e) {
            if (isRecognitionException(e)) {
              return false;
            } else {
              throw e;
            }
          } finally {
            this.reloadRecogState(orgState);
            this.isBackTrackingStack.pop();
          }
        };
      };
      RecognizerApi2.prototype.getGAstProductions = function() {
        return this.gastProductionsCache;
      };
      RecognizerApi2.prototype.getSerializedGastProductions = function() {
        return serializeGrammar(values(this.gastProductionsCache));
      };
      return RecognizerApi2;
    })()
  );
  var RecognizerEngine = (
    /** @class */
    (function() {
      function RecognizerEngine2() {
      }
      RecognizerEngine2.prototype.initRecognizerEngine = function(tokenVocabulary, config) {
        this.className = classNameFromInstance(this);
        this.shortRuleNameToFull = {};
        this.fullRuleNameToShort = {};
        this.ruleShortNameIdx = 256;
        this.tokenMatcher = tokenStructuredMatcherNoCategories;
        this.definedRulesNames = [];
        this.tokensMap = {};
        this.isBackTrackingStack = [];
        this.RULE_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
        this.gastProductionsCache = {};
        if (has(config, "serializedGrammar")) {
          throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
        }
        if (isArray(tokenVocabulary)) {
          if (isEmpty(tokenVocabulary)) {
            throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
          }
          if (typeof tokenVocabulary[0].startOffset === "number") {
            throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
          }
        }
        if (isArray(tokenVocabulary)) {
          this.tokensMap = reduce(tokenVocabulary, function(acc, tokType) {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (has(tokenVocabulary, "modes") && every(flatten(values(tokenVocabulary.modes)), isTokenType)) {
          var allTokenTypes = flatten(values(tokenVocabulary.modes));
          var uniqueTokens = uniq(allTokenTypes);
          this.tokensMap = reduce(uniqueTokens, function(acc, tokType) {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (isObject(tokenVocabulary)) {
          this.tokensMap = cloneObj(tokenVocabulary);
        } else {
          throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
        }
        this.tokensMap["EOF"] = EOF;
        var noTokenCategoriesUsed = every(values(tokenVocabulary), function(tokenConstructor) {
          return isEmpty(tokenConstructor.categoryMatches);
        });
        this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
        augmentTokenTypes(values(this.tokensMap));
      };
      RecognizerEngine2.prototype.defineRule = function(ruleName, impl, config) {
        if (this.selfAnalysisDone) {
          throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
        }
        var resyncEnabled = has(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
        var recoveryValueFunc = has(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
        var shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
        this.ruleShortNameIdx++;
        this.shortRuleNameToFull[shortName] = ruleName;
        this.fullRuleNameToShort[ruleName] = shortName;
        function invokeRuleWithTry(args) {
          try {
            if (this.outputCst === true) {
              impl.apply(this, args);
              var cst = this.CST_STACK[this.CST_STACK.length - 1];
              this.cstPostRule(cst);
              return cst;
            } else {
              return impl.apply(this, args);
            }
          } catch (e) {
            return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
          } finally {
            this.ruleFinallyStateUpdate();
          }
        }
        var wrappedGrammarRule;
        wrappedGrammarRule = function(idxInCallingRule, args) {
          if (idxInCallingRule === void 0) {
            idxInCallingRule = 0;
          }
          this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
          return invokeRuleWithTry.call(this, args);
        };
        var ruleNamePropName = "ruleName";
        wrappedGrammarRule[ruleNamePropName] = ruleName;
        wrappedGrammarRule["originalGrammarAction"] = impl;
        return wrappedGrammarRule;
      };
      RecognizerEngine2.prototype.invokeRuleCatch = function(e, resyncEnabledConfig, recoveryValueFunc) {
        var isFirstInvokedRule = this.RULE_STACK.length === 1;
        var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
        if (isRecognitionException(e)) {
          var recogError = e;
          if (reSyncEnabled) {
            var reSyncTokType = this.findReSyncTokenType();
            if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
              recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
              if (this.outputCst) {
                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                return partialCstResult;
              } else {
                return recoveryValueFunc();
              }
            } else {
              if (this.outputCst) {
                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                recogError.partialCstResult = partialCstResult;
              }
              throw recogError;
            }
          } else if (isFirstInvokedRule) {
            this.moveToTerminatedState();
            return recoveryValueFunc();
          } else {
            throw recogError;
          }
        } else {
          throw e;
        }
      };
      RecognizerEngine2.prototype.optionInternal = function(actionORMethodDef, occurrence) {
        var key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
        return this.optionInternalLogic(actionORMethodDef, occurrence, key);
      };
      RecognizerEngine2.prototype.optionInternalLogic = function(actionORMethodDef, occurrence, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_1 = lookAheadFunc;
            lookAheadFunc = function() {
              return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          return action.call(this);
        }
        return void 0;
      };
      RecognizerEngine2.prototype.atLeastOneInternal = function(prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
        return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      };
      RecognizerEngine2.prototype.atLeastOneInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_2 = lookAheadFunc;
            lookAheadFunc = function() {
              return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          var notStuck = this.doSingleRepetition(action);
          while (lookAheadFunc.call(this) === true && notStuck === true) {
            notStuck = this.doSingleRepetition(action);
          }
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
        }
        this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
      };
      RecognizerEngine2.prototype.atLeastOneSepFirstInternal = function(prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
      };
      RecognizerEngine2.prototype.atLeastOneSepFirstInternalLogic = function(prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
        if (firstIterationLookaheadFunc.call(this) === true) {
          action.call(this);
          var separatorLookAheadFunc = function() {
            return _this.tokenMatcher(_this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            NextTerminalAfterAtLeastOneSepWalker
          ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
        }
      };
      RecognizerEngine2.prototype.manyInternal = function(prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
        return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      };
      RecognizerEngine2.prototype.manyInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookaheadFunction = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_3 = lookaheadFunction;
            lookaheadFunction = function() {
              return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        var notStuck = true;
        while (lookaheadFunction.call(this) === true && notStuck === true) {
          notStuck = this.doSingleRepetition(action);
        }
        this.attemptInRepetitionRecovery(
          this.manyInternal,
          [prodOccurrence, actionORMethodDef],
          lookaheadFunction,
          MANY_IDX,
          prodOccurrence,
          NextTerminalAfterManyWalker,
          // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
          // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
          // An infinite loop cannot occur as:
          // - Either the lookahead is guaranteed to consume something (Single Token Separator)
          // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
          notStuck
        );
      };
      RecognizerEngine2.prototype.manySepFirstInternal = function(prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
        this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
      };
      RecognizerEngine2.prototype.manySepFirstInternalLogic = function(prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLaFunc = this.getLaFuncFromCache(key);
        if (firstIterationLaFunc.call(this) === true) {
          action.call(this);
          var separatorLookAheadFunc = function() {
            return _this.tokenMatcher(_this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            NextTerminalAfterManySepWalker
          ], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
        }
      };
      RecognizerEngine2.prototype.repetitionSepSecondInternal = function(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
        while (separatorLookAheadFunc()) {
          this.CONSUME(separator);
          action.call(this);
        }
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
          prodOccurrence,
          separator,
          separatorLookAheadFunc,
          action,
          nextTerminalAfterWalker
        ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
      };
      RecognizerEngine2.prototype.doSingleRepetition = function(action) {
        var beforeIteration = this.getLexerPosition();
        action.call(this);
        var afterIteration = this.getLexerPosition();
        return afterIteration > beforeIteration;
      };
      RecognizerEngine2.prototype.orInternal = function(altsOrOpts, occurrence) {
        var laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
        var alts = isArray(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
        var laFunc = this.getLaFuncFromCache(laKey);
        var altIdxToTake = laFunc.call(this, alts);
        if (altIdxToTake !== void 0) {
          var chosenAlternative = alts[altIdxToTake];
          return chosenAlternative.ALT.call(this);
        }
        this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
      };
      RecognizerEngine2.prototype.ruleFinallyStateUpdate = function() {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        this.cstFinallyStateUpdate();
        if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
          var firstRedundantTok = this.LA(1);
          var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
            firstRedundant: firstRedundantTok,
            ruleName: this.getCurrRuleFullName()
          });
          this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
        }
      };
      RecognizerEngine2.prototype.subruleInternal = function(ruleToCall, idx, options) {
        var ruleResult;
        try {
          var args = options !== void 0 ? options.ARGS : void 0;
          ruleResult = ruleToCall.call(this, idx, args);
          this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
          return ruleResult;
        } catch (e) {
          this.subruleInternalError(e, options, ruleToCall.ruleName);
        }
      };
      RecognizerEngine2.prototype.subruleInternalError = function(e, options, ruleName) {
        if (isRecognitionException(e) && e.partialCstResult !== void 0) {
          this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
          delete e.partialCstResult;
        }
        throw e;
      };
      RecognizerEngine2.prototype.consumeInternal = function(tokType, idx, options) {
        var consumedToken;
        try {
          var nextToken = this.LA(1);
          if (this.tokenMatcher(nextToken, tokType) === true) {
            this.consumeToken();
            consumedToken = nextToken;
          } else {
            this.consumeInternalError(tokType, nextToken, options);
          }
        } catch (eFromConsumption) {
          consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
        }
        this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
        return consumedToken;
      };
      RecognizerEngine2.prototype.consumeInternalError = function(tokType, nextToken, options) {
        var msg;
        var previousToken = this.LA(0);
        if (options !== void 0 && options.ERR_MSG) {
          msg = options.ERR_MSG;
        } else {
          msg = this.errorMessageProvider.buildMismatchTokenMessage({
            expected: tokType,
            actual: nextToken,
            previous: previousToken,
            ruleName: this.getCurrRuleFullName()
          });
        }
        throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
      };
      RecognizerEngine2.prototype.consumeInternalRecovery = function(tokType, idx, eFromConsumption) {
        if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
        eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
          var follows = this.getFollowsForInRuleRecovery(tokType, idx);
          try {
            return this.tryInRuleRecovery(tokType, follows);
          } catch (eFromInRuleRecovery) {
            if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
              throw eFromConsumption;
            } else {
              throw eFromInRuleRecovery;
            }
          }
        } else {
          throw eFromConsumption;
        }
      };
      RecognizerEngine2.prototype.saveRecogState = function() {
        var savedErrors = this.errors;
        var savedRuleStack = cloneArr(this.RULE_STACK);
        return {
          errors: savedErrors,
          lexerState: this.exportLexerState(),
          RULE_STACK: savedRuleStack,
          CST_STACK: this.CST_STACK
        };
      };
      RecognizerEngine2.prototype.reloadRecogState = function(newState) {
        this.errors = newState.errors;
        this.importLexerState(newState.lexerState);
        this.RULE_STACK = newState.RULE_STACK;
      };
      RecognizerEngine2.prototype.ruleInvocationStateUpdate = function(shortName, fullName, idxInCallingRule) {
        this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
        this.RULE_STACK.push(shortName);
        this.cstInvocationStateUpdate(fullName, shortName);
      };
      RecognizerEngine2.prototype.isBackTracking = function() {
        return this.isBackTrackingStack.length !== 0;
      };
      RecognizerEngine2.prototype.getCurrRuleFullName = function() {
        var shortName = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull[shortName];
      };
      RecognizerEngine2.prototype.shortRuleNameToFullName = function(shortName) {
        return this.shortRuleNameToFull[shortName];
      };
      RecognizerEngine2.prototype.isAtEndOfInput = function() {
        return this.tokenMatcher(this.LA(1), EOF);
      };
      RecognizerEngine2.prototype.reset = function() {
        this.resetLexerState();
        this.isBackTrackingStack = [];
        this.errors = [];
        this.RULE_STACK = [];
        this.CST_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
      };
      return RecognizerEngine2;
    })()
  );
  var ErrorHandler = (
    /** @class */
    (function() {
      function ErrorHandler2() {
      }
      ErrorHandler2.prototype.initErrorHandler = function(config) {
        this._errors = [];
        this.errorMessageProvider = has(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
      };
      ErrorHandler2.prototype.SAVE_ERROR = function(error) {
        if (isRecognitionException(error)) {
          error.context = {
            ruleStack: this.getHumanReadableRuleStack(),
            ruleOccurrenceStack: cloneArr(this.RULE_OCCURRENCE_STACK)
          };
          this._errors.push(error);
          return error;
        } else {
          throw Error("Trying to save an Error which is not a RecognitionException");
        }
      };
      Object.defineProperty(ErrorHandler2.prototype, "errors", {
        get: function() {
          return cloneArr(this._errors);
        },
        set: function(newErrors) {
          this._errors = newErrors;
        },
        enumerable: false,
        configurable: true
      });
      ErrorHandler2.prototype.raiseEarlyExitException = function(occurrence, prodType, userDefinedErrMsg) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        var lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
        var insideProdPaths = lookAheadPathsPerAlternative[0];
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        var msg = this.errorMessageProvider.buildEarlyExitMessage({
          expectedIterationPaths: insideProdPaths,
          actual: actualTokens,
          previous: this.LA(0),
          customUserDescription: userDefinedErrMsg,
          ruleName
        });
        throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
      };
      ErrorHandler2.prototype.raiseNoAltException = function(occurrence, errMsgTypes) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        var lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        var previousToken = this.LA(0);
        var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
          expectedPathsPerAlt: lookAheadPathsPerAlternative,
          actual: actualTokens,
          previous: previousToken,
          customUserDescription: errMsgTypes,
          ruleName: this.getCurrRuleFullName()
        });
        throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
      };
      return ErrorHandler2;
    })()
  );
  var ContentAssist = (
    /** @class */
    (function() {
      function ContentAssist2() {
      }
      ContentAssist2.prototype.initContentAssist = function() {
      };
      ContentAssist2.prototype.computeContentAssist = function(startRuleName, precedingInput) {
        var startRuleGast = this.gastProductionsCache[startRuleName];
        if (isUndefined(startRuleGast)) {
          throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
        }
        return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
      };
      ContentAssist2.prototype.getNextPossibleTokenTypes = function(grammarPath) {
        var topRuleName = first$1(grammarPath.ruleStack);
        var gastProductions = this.getGAstProductions();
        var topProduction = gastProductions[topRuleName];
        var nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        return nextPossibleTokenTypes;
      };
      return ContentAssist2;
    })()
  );
  var RECORDING_NULL_OBJECT = {
    description: "This Object indicates the Parser is during Recording Phase"
  };
  Object.freeze(RECORDING_NULL_OBJECT);
  var HANDLE_SEPARATOR = true;
  var MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
  var RFT = createToken({ name: "RECORDING_PHASE_TOKEN", pattern: Lexer.NA });
  augmentTokenTypes([RFT]);
  var RECORDING_PHASE_TOKEN = createTokenInstance(
    RFT,
    "This IToken indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
    // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
    // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  );
  Object.freeze(RECORDING_PHASE_TOKEN);
  var RECORDING_PHASE_CSTNODE = {
    name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
    children: {}
  };
  var GastRecorder = (
    /** @class */
    (function() {
      function GastRecorder2() {
      }
      GastRecorder2.prototype.initGastRecorder = function(config) {
        this.recordingProdStack = [];
        this.RECORDING_PHASE = false;
      };
      GastRecorder2.prototype.enableRecording = function() {
        var _this = this;
        this.RECORDING_PHASE = true;
        this.TRACE_INIT("Enable Recording", function() {
          var _loop_1 = function(i2) {
            var idx = i2 > 0 ? i2 : "";
            _this["CONSUME" + idx] = function(arg1, arg2) {
              return this.consumeInternalRecord(arg1, i2, arg2);
            };
            _this["SUBRULE" + idx] = function(arg1, arg2) {
              return this.subruleInternalRecord(arg1, i2, arg2);
            };
            _this["OPTION" + idx] = function(arg1) {
              return this.optionInternalRecord(arg1, i2);
            };
            _this["OR" + idx] = function(arg1) {
              return this.orInternalRecord(arg1, i2);
            };
            _this["MANY" + idx] = function(arg1) {
              this.manyInternalRecord(i2, arg1);
            };
            _this["MANY_SEP" + idx] = function(arg1) {
              this.manySepFirstInternalRecord(i2, arg1);
            };
            _this["AT_LEAST_ONE" + idx] = function(arg1) {
              this.atLeastOneInternalRecord(i2, arg1);
            };
            _this["AT_LEAST_ONE_SEP" + idx] = function(arg1) {
              this.atLeastOneSepFirstInternalRecord(i2, arg1);
            };
          };
          for (var i = 0; i < 10; i++) {
            _loop_1(i);
          }
          _this["consume"] = function(idx, arg1, arg2) {
            return this.consumeInternalRecord(arg1, idx, arg2);
          };
          _this["subrule"] = function(idx, arg1, arg2) {
            return this.subruleInternalRecord(arg1, idx, arg2);
          };
          _this["option"] = function(idx, arg1) {
            return this.optionInternalRecord(arg1, idx);
          };
          _this["or"] = function(idx, arg1) {
            return this.orInternalRecord(arg1, idx);
          };
          _this["many"] = function(idx, arg1) {
            this.manyInternalRecord(idx, arg1);
          };
          _this["atLeastOne"] = function(idx, arg1) {
            this.atLeastOneInternalRecord(idx, arg1);
          };
          _this.ACTION = _this.ACTION_RECORD;
          _this.BACKTRACK = _this.BACKTRACK_RECORD;
          _this.LA = _this.LA_RECORD;
        });
      };
      GastRecorder2.prototype.disableRecording = function() {
        var _this = this;
        this.RECORDING_PHASE = false;
        this.TRACE_INIT("Deleting Recording methods", function() {
          for (var i = 0; i < 10; i++) {
            var idx = i > 0 ? i : "";
            delete _this["CONSUME" + idx];
            delete _this["SUBRULE" + idx];
            delete _this["OPTION" + idx];
            delete _this["OR" + idx];
            delete _this["MANY" + idx];
            delete _this["MANY_SEP" + idx];
            delete _this["AT_LEAST_ONE" + idx];
            delete _this["AT_LEAST_ONE_SEP" + idx];
          }
          delete _this["consume"];
          delete _this["subrule"];
          delete _this["option"];
          delete _this["or"];
          delete _this["many"];
          delete _this["atLeastOne"];
          delete _this.ACTION;
          delete _this.BACKTRACK;
          delete _this.LA;
        });
      };
      GastRecorder2.prototype.ACTION_RECORD = function(impl) {
        return;
      };
      GastRecorder2.prototype.BACKTRACK_RECORD = function(grammarRule, args) {
        return function() {
          return true;
        };
      };
      GastRecorder2.prototype.LA_RECORD = function(howMuch) {
        return END_OF_FILE;
      };
      GastRecorder2.prototype.topLevelRuleRecord = function(name, def) {
        try {
          var newTopLevelRule = new Rule({ definition: [], name });
          newTopLevelRule.name = name;
          this.recordingProdStack.push(newTopLevelRule);
          def.call(this);
          this.recordingProdStack.pop();
          return newTopLevelRule;
        } catch (originalError) {
          if (originalError.KNOWN_RECORDER_ERROR !== true) {
            try {
              originalError.message = originalError.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording';
            } catch (mutabilityError) {
              throw originalError;
            }
          }
          throw originalError;
        }
      };
      GastRecorder2.prototype.optionInternalRecord = function(actionORMethodDef, occurrence) {
        return recordProd.call(this, Option, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.atLeastOneInternalRecord = function(occurrence, actionORMethodDef) {
        recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.atLeastOneSepFirstInternalRecord = function(occurrence, options) {
        recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      };
      GastRecorder2.prototype.manyInternalRecord = function(occurrence, actionORMethodDef) {
        recordProd.call(this, Repetition, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.manySepFirstInternalRecord = function(occurrence, options) {
        recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      };
      GastRecorder2.prototype.orInternalRecord = function(altsOrOpts, occurrence) {
        return recordOrProd.call(this, altsOrOpts, occurrence);
      };
      GastRecorder2.prototype.subruleInternalRecord = function(ruleToCall, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!ruleToCall || has(ruleToCall, "ruleName") === false) {
          var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        var prevProd = peek(this.recordingProdStack);
        var ruleName = ruleToCall["ruleName"];
        var newNoneTerminal = new NonTerminal({
          idx: occurrence,
          nonTerminalName: ruleName,
          // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
          referencedRule: void 0
        });
        prevProd.definition.push(newNoneTerminal);
        return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
      };
      GastRecorder2.prototype.consumeInternalRecord = function(tokType, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!hasShortKeyProperty(tokType)) {
          var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        var prevProd = peek(this.recordingProdStack);
        var newNoneTerminal = new Terminal({
          idx: occurrence,
          terminalType: tokType
        });
        prevProd.definition.push(newNoneTerminal);
        return RECORDING_PHASE_TOKEN;
      };
      return GastRecorder2;
    })()
  );
  function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
    if (handleSep === void 0) {
      handleSep = false;
    }
    assertMethodIdxIsValid(occurrence);
    var prevProd = peek(this.recordingProdStack);
    var grammarAction = isFunction(mainProdArg) ? mainProdArg : mainProdArg.DEF;
    var newProd = new prodConstructor({ definition: [], idx: occurrence });
    if (handleSep) {
      newProd.separator = mainProdArg.SEP;
    }
    if (has(mainProdArg, "MAX_LOOKAHEAD")) {
      newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }
    this.recordingProdStack.push(newProd);
    grammarAction.call(this);
    prevProd.definition.push(newProd);
    this.recordingProdStack.pop();
    return RECORDING_NULL_OBJECT;
  }
  function recordOrProd(mainProdArg, occurrence) {
    var _this = this;
    assertMethodIdxIsValid(occurrence);
    var prevProd = peek(this.recordingProdStack);
    var hasOptions = isArray(mainProdArg) === false;
    var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
    var newOrProd = new Alternation({
      definition: [],
      idx: occurrence,
      ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
    });
    if (has(mainProdArg, "MAX_LOOKAHEAD")) {
      newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }
    var hasPredicates = some(alts, function(currAlt) {
      return isFunction(currAlt.GATE);
    });
    newOrProd.hasPredicates = hasPredicates;
    prevProd.definition.push(newOrProd);
    forEach(alts, function(currAlt) {
      var currAltFlat = new Alternative({ definition: [] });
      newOrProd.definition.push(currAltFlat);
      if (has(currAlt, "IGNORE_AMBIGUITIES")) {
        currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
      } else if (has(currAlt, "GATE")) {
        currAltFlat.ignoreAmbiguities = true;
      }
      _this.recordingProdStack.push(currAltFlat);
      currAlt.ALT.call(_this);
      _this.recordingProdStack.pop();
    });
    return RECORDING_NULL_OBJECT;
  }
  function getIdxSuffix(idx) {
    return idx === 0 ? "" : "" + idx;
  }
  function assertMethodIdxIsValid(idx) {
    if (idx < 0 || idx > MAX_METHOD_IDX) {
      var error = new Error(
        // The stack trace will contain all the needed details
        "Invalid DSL Method idx value: <" + idx + ">\n	" + ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1))
      );
      error.KNOWN_RECORDER_ERROR = true;
      throw error;
    }
  }
  var PerformanceTracer = (
    /** @class */
    (function() {
      function PerformanceTracer2() {
      }
      PerformanceTracer2.prototype.initPerformanceTracer = function(config) {
        if (has(config, "traceInitPerf")) {
          var userTraceInitPerf = config.traceInitPerf;
          var traceIsNumber = typeof userTraceInitPerf === "number";
          this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
          this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
        } else {
          this.traceInitMaxIdent = 0;
          this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
        }
        this.traceInitIndent = -1;
      };
      PerformanceTracer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          var indent2 = new Array(this.traceInitIndent + 1).join("	");
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            console.log(indent2 + "--> <" + phaseDesc + ">");
          }
          var _a = timer(phaseImpl), time = _a.time, value = _a.value;
          var traceMethod = time > 10 ? console.warn : console.log;
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            traceMethod(indent2 + "<-- <" + phaseDesc + "> time: " + time + "ms");
          }
          this.traceInitIndent--;
          return value;
        } else {
          return phaseImpl();
        }
      };
      return PerformanceTracer2;
    })()
  );
  var __extends = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
  Object.freeze(END_OF_FILE);
  var DEFAULT_PARSER_CONFIG = Object.freeze({
    recoveryEnabled: false,
    maxLookahead: 3,
    dynamicTokensEnabled: false,
    outputCst: true,
    errorMessageProvider: defaultParserErrorProvider,
    nodeLocationTracking: "none",
    traceInitPerf: false,
    skipValidations: false
  });
  var DEFAULT_RULE_CONFIG = Object.freeze({
    recoveryValueFunc: function() {
      return void 0;
    },
    resyncEnabled: true
  });
  var ParserDefinitionErrorType;
  (function(ParserDefinitionErrorType2) {
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
    ParserDefinitionErrorType2[ParserDefinitionErrorType2["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
  })(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
  function EMPTY_ALT(value) {
    if (value === void 0) {
      value = void 0;
    }
    return function() {
      return value;
    };
  }
  var Parser$1 = (
    /** @class */
    (function() {
      function Parser2(tokenVocabulary, config) {
        this.definitionErrors = [];
        this.selfAnalysisDone = false;
        var that = this;
        that.initErrorHandler(config);
        that.initLexerAdapter();
        that.initLooksAhead(config);
        that.initRecognizerEngine(tokenVocabulary, config);
        that.initRecoverable(config);
        that.initTreeBuilder(config);
        that.initContentAssist();
        that.initGastRecorder(config);
        that.initPerformanceTracer(config);
        if (has(config, "ignoredIssues")) {
          throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
        }
        this.skipValidations = has(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
      }
      Parser2.performSelfAnalysis = function(parserInstance) {
        throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
      };
      Parser2.prototype.performSelfAnalysis = function() {
        var _this = this;
        this.TRACE_INIT("performSelfAnalysis", function() {
          var defErrorsMsgs;
          _this.selfAnalysisDone = true;
          var className = _this.className;
          _this.TRACE_INIT("toFastProps", function() {
            toFastProperties(_this);
          });
          _this.TRACE_INIT("Grammar Recording", function() {
            try {
              _this.enableRecording();
              forEach(_this.definedRulesNames, function(currRuleName) {
                var wrappedRule = _this[currRuleName];
                var originalGrammarAction = wrappedRule["originalGrammarAction"];
                var recordedRuleGast = void 0;
                _this.TRACE_INIT(currRuleName + " Rule", function() {
                  recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                });
                _this.gastProductionsCache[currRuleName] = recordedRuleGast;
              });
            } finally {
              _this.disableRecording();
            }
          });
          var resolverErrors = [];
          _this.TRACE_INIT("Grammar Resolving", function() {
            resolverErrors = resolveGrammar({
              rules: values(_this.gastProductionsCache)
            });
            _this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors);
          });
          _this.TRACE_INIT("Grammar Validations", function() {
            if (isEmpty(resolverErrors) && _this.skipValidations === false) {
              var validationErrors = validateGrammar({
                rules: values(_this.gastProductionsCache),
                maxLookahead: _this.maxLookahead,
                tokenTypes: values(_this.tokensMap),
                errMsgProvider: defaultGrammarValidatorErrorProvider,
                grammarName: className
              });
              _this.definitionErrors.push.apply(_this.definitionErrors, validationErrors);
            }
          });
          if (isEmpty(_this.definitionErrors)) {
            if (_this.recoveryEnabled) {
              _this.TRACE_INIT("computeAllProdsFollows", function() {
                var allFollows = computeAllProdsFollows(values(_this.gastProductionsCache));
                _this.resyncFollows = allFollows;
              });
            }
            _this.TRACE_INIT("ComputeLookaheadFunctions", function() {
              _this.preComputeLookaheadFunctions(values(_this.gastProductionsCache));
            });
          }
          if (!Parser2.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty(_this.definitionErrors)) {
            defErrorsMsgs = map(_this.definitionErrors, function(defError) {
              return defError.message;
            });
            throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
          }
        });
      };
      Parser2.DEFER_DEFINITION_ERRORS_HANDLING = false;
      return Parser2;
    })()
  );
  applyMixins(Parser$1, [
    Recoverable,
    LooksAhead,
    TreeBuilder,
    LexerAdapter,
    RecognizerEngine,
    RecognizerApi,
    ErrorHandler,
    ContentAssist,
    GastRecorder,
    PerformanceTracer
  ]);
  var CstParser = (
    /** @class */
    (function(_super) {
      __extends(CstParser2, _super);
      function CstParser2(tokenVocabulary, config) {
        if (config === void 0) {
          config = DEFAULT_PARSER_CONFIG;
        }
        var _this = this;
        var configClone = cloneObj(config);
        configClone.outputCst = true;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
      }
      return CstParser2;
    })(Parser$1)
  );
  var EmbeddedActionsParser = (
    /** @class */
    (function(_super) {
      __extends(EmbeddedActionsParser2, _super);
      function EmbeddedActionsParser2(tokenVocabulary, config) {
        if (config === void 0) {
          config = DEFAULT_PARSER_CONFIG;
        }
        var _this = this;
        var configClone = cloneObj(config);
        configClone.outputCst = false;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
      }
      return EmbeddedActionsParser2;
    })(Parser$1)
  );
  function createSyntaxDiagramsCode(grammar, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/diagrams.css" : _d;
    var header = '\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset="utf-8">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n';
    var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
    var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_builder.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'><\/script>\n<script src='" + resourceBase + "src/main.js'><\/script>\n";
    var diagramsDiv = '\n<div id="diagrams" align="center"></div>    \n';
    var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n<\/script>\n";
    var initLogic = '\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n<\/script>\n';
    return header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic;
  }
  var NL = "\n";
  function genUmdModule(options) {
    return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
  }
  function genWrapperFunction(options) {
    return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
  }
  function genClass(options) {
    var result = "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
    return result;
  }
  function genAllRules(rules) {
    var rulesText = map(rules, function(currRule) {
      return genRule(currRule, 1);
    });
    return rulesText.join("\n");
  }
  function genRule(prod, n) {
    var result = indent(n, '$.RULE("' + prod.name + '", function() {') + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "})") + NL;
    return result;
  }
  function genTerminal(prod, n) {
    var name = prod.terminalType.name;
    return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
  }
  function genNonTerminal(prod, n) {
    return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
  }
  function genAlternation(prod, n) {
    var result = indent(n, "$.OR" + prod.idx + "([") + NL;
    var alts = map(prod.definition, function(altDef) {
      return genSingleAlt(altDef, n + 1);
    });
    result += alts.join("," + NL);
    result += NL + indent(n, "])" + NL);
    return result;
  }
  function genSingleAlt(prod, n) {
    var result = indent(n, "{") + NL;
    result += indent(n + 1, "ALT: function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "}") + NL;
    result += indent(n, "}");
    return result;
  }
  function genProd(prod, n) {
    if (prod instanceof NonTerminal) {
      return genNonTerminal(prod, n);
    } else if (prod instanceof Option) {
      return genDSLRule("OPTION", prod, n);
    } else if (prod instanceof RepetitionMandatory) {
      return genDSLRule("AT_LEAST_ONE", prod, n);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
    } else if (prod instanceof RepetitionWithSeparator) {
      return genDSLRule("MANY_SEP", prod, n);
    } else if (prod instanceof Repetition) {
      return genDSLRule("MANY", prod, n);
    } else if (prod instanceof Alternation) {
      return genAlternation(prod, n);
    } else if (prod instanceof Terminal) {
      return genTerminal(prod, n);
    } else if (prod instanceof Alternative) {
      return genDefinition(prod.definition, n);
    } else {
      throw Error("non exhaustive match");
    }
  }
  function genDSLRule(dslName, prod, n) {
    var result = indent(n, "$." + (dslName + prod.idx) + "(");
    if (prod.separator) {
      result += "{" + NL;
      result += indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL;
      result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
      result += indent(n, "}") + NL;
    } else {
      result += genDefFunction(prod.definition, n + 1);
    }
    result += indent(n, ")") + NL;
    return result;
  }
  function genDefFunction(definition, n) {
    var def = "function() {" + NL;
    def += genDefinition(definition, n);
    def += indent(n, "}") + NL;
    return def;
  }
  function genDefinition(def, n) {
    var result = "";
    forEach(def, function(prod) {
      result += genProd(prod, n + 1);
    });
    return result;
  }
  function indent(howMuch, text) {
    var spaces = Array(howMuch * 4 + 1).join(" ");
    return spaces + text;
  }
  function generateParserFactory(options) {
    var wrapperText = genWrapperFunction({
      name: options.name,
      rules: options.rules
    });
    var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
    return function(config) {
      return constructorWrapper(
        options.tokenVocabulary,
        config,
        // TODO: check how the require is transpiled/webpacked
        require("../api")
      );
    };
  }
  function generateParserModule(options) {
    return genUmdModule({ name: options.name, rules: options.rules });
  }
  function clearCache() {
    console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
  }
  var Parser = (
    /** @class */
    /* @__PURE__ */ (function() {
      function Parser2() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
      }
      return Parser2;
    })()
  );
  const api$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Alternation,
    Alternative,
    CstParser,
    EMPTY_ALT,
    EOF,
    EarlyExitException,
    EmbeddedActionsParser,
    GAstVisitor,
    Lexer,
    get LexerDefinitionErrorType() {
      return LexerDefinitionErrorType;
    },
    MismatchedTokenException,
    NoViableAltException,
    NonTerminal,
    NotAllInputParsedException,
    Option,
    Parser,
    get ParserDefinitionErrorType() {
      return ParserDefinitionErrorType;
    },
    Repetition,
    RepetitionMandatory,
    RepetitionMandatoryWithSeparator,
    RepetitionWithSeparator,
    Rule,
    Terminal,
    VERSION,
    assignOccurrenceIndices,
    clearCache,
    createSyntaxDiagramsCode,
    createToken,
    createTokenInstance,
    defaultGrammarResolverErrorProvider,
    defaultGrammarValidatorErrorProvider,
    defaultLexerErrorProvider,
    defaultParserErrorProvider,
    generateParserFactory,
    generateParserModule,
    isRecognitionException,
    resolveGrammar,
    serializeGrammar,
    serializeProduction,
    tokenLabel,
    tokenMatcher,
    tokenName,
    validateGrammar
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(api$6);
  var lexer;
  var hasRequiredLexer;
  function requireLexer() {
    if (hasRequiredLexer) return lexer;
    hasRequiredLexer = 1;
    const { createToken: createTokenOrg, Lexer: Lexer2 } = require$$0;
    const fragments = {};
    const f = fragments;
    function FRAGMENT(name, def) {
      fragments[name] = typeof def === "string" ? def : def.source;
    }
    function makePattern(strings, ...args) {
      let combined = "";
      for (let i = 0; i < strings.length; i++) {
        combined += strings[i];
        if (i < args.length) {
          let pattern = args[i];
          combined += `(?:${pattern})`;
        }
      }
      return new RegExp(combined);
    }
    const tokensDictionary = {};
    function createToken2(options) {
      const newTokenType = createTokenOrg(options);
      tokensDictionary[options.name] = newTokenType;
      return newTokenType;
    }
    FRAGMENT(
      "NameStartChar",
      "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"
    );
    FRAGMENT(
      "NameChar",
      makePattern`${f.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`
    );
    FRAGMENT("Name", makePattern`${f.NameStartChar}(${f.NameChar})*`);
    const Comment = createToken2({
      name: "Comment",
      pattern: /<!--(.|\r?\n)*?-->/,
      // A Comment may span multiple lines.
      line_breaks: true
    });
    const CData = createToken2({
      name: "CData",
      pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/,
      line_breaks: true
    });
    const DocType = createToken2({
      name: "DocType",
      pattern: /<!DOCTYPE/,
      push_mode: "INSIDE"
    });
    const IgnoredDTD = createToken2({
      name: "DTD",
      pattern: /<!.*?>/,
      group: Lexer2.SKIPPED
    });
    const EntityRef = createToken2({
      name: "EntityRef",
      pattern: makePattern`&${f.Name};`
    });
    const CharRef = createToken2({
      name: "CharRef",
      pattern: /&#\d+;|&#x[a-fA-F0-9]/
    });
    const SEA_WS = createToken2({
      name: "SEA_WS",
      pattern: /( |\t|\n|\r\n)+/
    });
    const XMLDeclOpen = createToken2({
      name: "XMLDeclOpen",
      pattern: /<\?xml[ \t\r\n]/,
      push_mode: "INSIDE"
    });
    const SLASH_OPEN = createToken2({
      name: "SLASH_OPEN",
      pattern: /<\//,
      push_mode: "INSIDE"
    });
    const INVALID_SLASH_OPEN = createToken2({
      name: "INVALID_SLASH_OPEN",
      pattern: /<\//,
      categories: [SLASH_OPEN]
    });
    const PROCESSING_INSTRUCTION = createToken2({
      name: "PROCESSING_INSTRUCTION",
      pattern: makePattern`<\\?${f.Name}.*\\?>`
    });
    const OPEN = createToken2({ name: "OPEN", pattern: /</, push_mode: "INSIDE" });
    const INVALID_OPEN_INSIDE = createToken2({
      name: "INVALID_OPEN_INSIDE",
      pattern: /</,
      categories: [OPEN]
    });
    const TEXT = createToken2({ name: "TEXT", pattern: /[^<&]+/ });
    const CLOSE = createToken2({ name: "CLOSE", pattern: />/, pop_mode: true });
    const SPECIAL_CLOSE = createToken2({
      name: "SPECIAL_CLOSE",
      pattern: /\?>/,
      pop_mode: true
    });
    const SLASH_CLOSE = createToken2({
      name: "SLASH_CLOSE",
      pattern: /\/>/,
      pop_mode: true
    });
    const SLASH = createToken2({ name: "SLASH", pattern: /\// });
    const STRING = createToken2({
      name: "STRING",
      pattern: /"[^<"]*"|'[^<']*'/
    });
    const EQUALS = createToken2({ name: "EQUALS", pattern: /=/ });
    const Name = createToken2({ name: "Name", pattern: makePattern`${f.Name}` });
    const S = createToken2({
      name: "S",
      pattern: /[ \t\r\n]/,
      group: Lexer2.SKIPPED
    });
    const xmlLexerDefinition = {
      defaultMode: "OUTSIDE",
      modes: {
        OUTSIDE: [
          Comment,
          CData,
          DocType,
          IgnoredDTD,
          EntityRef,
          CharRef,
          SEA_WS,
          XMLDeclOpen,
          SLASH_OPEN,
          PROCESSING_INSTRUCTION,
          OPEN,
          TEXT
        ],
        INSIDE: [
          // Tokens from `OUTSIDE` to improve error recovery behavior
          Comment,
          INVALID_SLASH_OPEN,
          INVALID_OPEN_INSIDE,
          // "Real" `INSIDE` tokens
          CLOSE,
          SPECIAL_CLOSE,
          SLASH_CLOSE,
          SLASH,
          EQUALS,
          STRING,
          Name,
          S
        ]
      }
    };
    const xmlLexer = new Lexer2(xmlLexerDefinition, {
      // Reducing the amount of position tracking can provide a small performance boost (<10%)
      // Likely best to keep the full info for better error position reporting and
      // to expose "fuller" ITokens from the Lexer.
      positionTracking: "full",
      ensureOptimizations: false,
      // TODO: inspect definitions for XML line terminators
      lineTerminatorCharacters: ["\n"],
      lineTerminatorsPattern: /\n|\r\n/g
    });
    lexer = {
      xmlLexer,
      tokensDictionary
    };
    return lexer;
  }
  var parser;
  var hasRequiredParser;
  function requireParser() {
    if (hasRequiredParser) return parser;
    hasRequiredParser = 1;
    const { CstParser: CstParser2, tokenMatcher: tokenMatcher2 } = require$$0;
    const { tokensDictionary: t } = requireLexer();
    class Parser2 extends CstParser2 {
      constructor() {
        super(t, {
          maxLookahead: 1,
          recoveryEnabled: true,
          nodeLocationTracking: "full"
        });
        this.deletionRecoveryEnabled = true;
        const $ = this;
        $.RULE("document", () => {
          $.OPTION(() => {
            $.SUBRULE($.prolog);
          });
          $.MANY(() => {
            $.SUBRULE($.misc);
          });
          $.OPTION2(() => {
            $.SUBRULE($.docTypeDecl);
          });
          $.MANY2(() => {
            $.SUBRULE2($.misc);
          });
          $.SUBRULE($.element);
          $.MANY3(() => {
            $.SUBRULE3($.misc);
          });
        });
        $.RULE("prolog", () => {
          $.CONSUME(t.XMLDeclOpen);
          $.MANY(() => {
            $.SUBRULE($.attribute);
          });
          $.CONSUME(t.SPECIAL_CLOSE);
        });
        $.RULE("docTypeDecl", () => {
          $.CONSUME(t.DocType);
          $.CONSUME(t.Name);
          $.OPTION(() => {
            $.SUBRULE($.externalID);
          });
          $.CONSUME(t.CLOSE);
        });
        $.RULE("externalID", () => {
          $.OR([
            {
              GATE: () => $.LA(1).image === "SYSTEM",
              ALT: () => {
                $.CONSUME2(t.Name, { LABEL: "System" });
                $.CONSUME(t.STRING, { LABEL: "SystemLiteral" });
              }
            },
            {
              GATE: () => $.LA(1).image === "PUBLIC",
              ALT: () => {
                $.CONSUME3(t.Name, { LABEL: "Public" });
                $.CONSUME2(t.STRING, { LABEL: "PubIDLiteral" });
                $.CONSUME3(t.STRING, { LABEL: "SystemLiteral" });
              }
            }
          ]);
        });
        $.RULE("content", () => {
          $.MANY(() => {
            $.OR([
              { ALT: () => $.SUBRULE($.element) },
              { ALT: () => $.SUBRULE($.chardata) },
              { ALT: () => $.SUBRULE($.reference) },
              { ALT: () => $.CONSUME(t.CData) },
              { ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
              { ALT: () => $.CONSUME(t.Comment) }
            ]);
          });
        });
        $.RULE("element", () => {
          $.CONSUME(t.OPEN);
          try {
            this.deletionRecoveryEnabled = false;
            $.CONSUME(t.Name);
          } finally {
            this.deletionRecoveryEnabled = true;
          }
          $.MANY(() => {
            $.SUBRULE($.attribute);
          });
          $.OR([
            {
              ALT: () => {
                $.CONSUME(t.CLOSE, { LABEL: "START_CLOSE" });
                $.SUBRULE($.content);
                $.CONSUME(t.SLASH_OPEN);
                $.CONSUME2(t.Name, { LABEL: "END_NAME" });
                $.CONSUME2(t.CLOSE, { LABEL: "END" });
              }
            },
            {
              ALT: () => {
                $.CONSUME(t.SLASH_CLOSE);
              }
            }
          ]);
        });
        $.RULE("reference", () => {
          $.OR([
            { ALT: () => $.CONSUME(t.EntityRef) },
            { ALT: () => $.CONSUME(t.CharRef) }
          ]);
        });
        $.RULE("attribute", () => {
          $.CONSUME(t.Name);
          try {
            this.deletionRecoveryEnabled = false;
            $.CONSUME(t.EQUALS);
            $.CONSUME(t.STRING);
          } finally {
            this.deletionRecoveryEnabled = true;
          }
        });
        $.RULE("chardata", () => {
          $.OR([
            { ALT: () => $.CONSUME(t.TEXT) },
            { ALT: () => $.CONSUME(t.SEA_WS) }
          ]);
        });
        $.RULE("misc", () => {
          $.OR([
            { ALT: () => $.CONSUME(t.Comment) },
            { ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
            { ALT: () => $.CONSUME(t.SEA_WS) }
          ]);
        });
        this.performSelfAnalysis();
      }
      canRecoverWithSingleTokenDeletion(expectedTokType) {
        if (this.deletionRecoveryEnabled === false) {
          return false;
        }
        return super.canRecoverWithSingleTokenDeletion(expectedTokType);
      }
      // TODO: provide this fix upstream to chevrotain
      // https://github.com/SAP/chevrotain/issues/1055
      /* istanbul ignore next - should be tested as part of Chevrotain */
      findReSyncTokenType() {
        const allPossibleReSyncTokTypes = this.flattenFollowSet();
        let nextToken = this.LA(1);
        let k = 2;
        while (true) {
          const foundMatch = allPossibleReSyncTokTypes.find((resyncTokType) => {
            const canMatch = tokenMatcher2(nextToken, resyncTokType);
            return canMatch;
          });
          if (foundMatch !== void 0) {
            return foundMatch;
          }
          nextToken = this.LA(k);
          k++;
        }
      }
    }
    const xmlParser = new Parser2();
    parser = {
      xmlParser
    };
    return parser;
  }
  var api$5;
  var hasRequiredApi$5;
  function requireApi$5() {
    if (hasRequiredApi$5) return api$5;
    hasRequiredApi$5 = 1;
    const { xmlLexer } = requireLexer();
    const { xmlParser } = requireParser();
    api$5 = {
      parse: function parse(text) {
        const lexResult = xmlLexer.tokenize(text);
        xmlParser.input = lexResult.tokens;
        const cst = xmlParser.document();
        return {
          cst,
          tokenVector: lexResult.tokens,
          lexErrors: lexResult.errors,
          parseErrors: xmlParser.errors
        };
      },
      BaseXmlCstVisitor: xmlParser.getBaseCstVisitorConstructor()
    };
    return api$5;
  }
  var apiExports$4 = requireApi$5();
  var lodash$1 = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  var lodash = lodash$1.exports;
  var hasRequiredLodash;
  function requireLodash() {
    if (hasRequiredLodash) return lodash$1.exports;
    hasRequiredLodash = 1;
    (function(module2, exports$1) {
      (function() {
        var undefined$1;
        var VERSION2 = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          "À": "A",
          "Á": "A",
          "Â": "A",
          "Ã": "A",
          "Ä": "A",
          "Å": "A",
          "à": "a",
          "á": "a",
          "â": "a",
          "ã": "a",
          "ä": "a",
          "å": "a",
          "Ç": "C",
          "ç": "c",
          "Ð": "D",
          "ð": "d",
          "È": "E",
          "É": "E",
          "Ê": "E",
          "Ë": "E",
          "è": "e",
          "é": "e",
          "ê": "e",
          "ë": "e",
          "Ì": "I",
          "Í": "I",
          "Î": "I",
          "Ï": "I",
          "ì": "i",
          "í": "i",
          "î": "i",
          "ï": "i",
          "Ñ": "N",
          "ñ": "n",
          "Ò": "O",
          "Ó": "O",
          "Ô": "O",
          "Õ": "O",
          "Ö": "O",
          "Ø": "O",
          "ò": "o",
          "ó": "o",
          "ô": "o",
          "õ": "o",
          "ö": "o",
          "ø": "o",
          "Ù": "U",
          "Ú": "U",
          "Û": "U",
          "Ü": "U",
          "ù": "u",
          "ú": "u",
          "û": "u",
          "ü": "u",
          "Ý": "Y",
          "ý": "y",
          "ÿ": "y",
          "Æ": "Ae",
          "æ": "ae",
          "Þ": "Th",
          "þ": "th",
          "ß": "ss",
          // Latin Extended-A block.
          "Ā": "A",
          "Ă": "A",
          "Ą": "A",
          "ā": "a",
          "ă": "a",
          "ą": "a",
          "Ć": "C",
          "Ĉ": "C",
          "Ċ": "C",
          "Č": "C",
          "ć": "c",
          "ĉ": "c",
          "ċ": "c",
          "č": "c",
          "Ď": "D",
          "Đ": "D",
          "ď": "d",
          "đ": "d",
          "Ē": "E",
          "Ĕ": "E",
          "Ė": "E",
          "Ę": "E",
          "Ě": "E",
          "ē": "e",
          "ĕ": "e",
          "ė": "e",
          "ę": "e",
          "ě": "e",
          "Ĝ": "G",
          "Ğ": "G",
          "Ġ": "G",
          "Ģ": "G",
          "ĝ": "g",
          "ğ": "g",
          "ġ": "g",
          "ģ": "g",
          "Ĥ": "H",
          "Ħ": "H",
          "ĥ": "h",
          "ħ": "h",
          "Ĩ": "I",
          "Ī": "I",
          "Ĭ": "I",
          "Į": "I",
          "İ": "I",
          "ĩ": "i",
          "ī": "i",
          "ĭ": "i",
          "į": "i",
          "ı": "i",
          "Ĵ": "J",
          "ĵ": "j",
          "Ķ": "K",
          "ķ": "k",
          "ĸ": "k",
          "Ĺ": "L",
          "Ļ": "L",
          "Ľ": "L",
          "Ŀ": "L",
          "Ł": "L",
          "ĺ": "l",
          "ļ": "l",
          "ľ": "l",
          "ŀ": "l",
          "ł": "l",
          "Ń": "N",
          "Ņ": "N",
          "Ň": "N",
          "Ŋ": "N",
          "ń": "n",
          "ņ": "n",
          "ň": "n",
          "ŋ": "n",
          "Ō": "O",
          "Ŏ": "O",
          "Ő": "O",
          "ō": "o",
          "ŏ": "o",
          "ő": "o",
          "Ŕ": "R",
          "Ŗ": "R",
          "Ř": "R",
          "ŕ": "r",
          "ŗ": "r",
          "ř": "r",
          "Ś": "S",
          "Ŝ": "S",
          "Ş": "S",
          "Š": "S",
          "ś": "s",
          "ŝ": "s",
          "ş": "s",
          "š": "s",
          "Ţ": "T",
          "Ť": "T",
          "Ŧ": "T",
          "ţ": "t",
          "ť": "t",
          "ŧ": "t",
          "Ũ": "U",
          "Ū": "U",
          "Ŭ": "U",
          "Ů": "U",
          "Ű": "U",
          "Ų": "U",
          "ũ": "u",
          "ū": "u",
          "ŭ": "u",
          "ů": "u",
          "ű": "u",
          "ų": "u",
          "Ŵ": "W",
          "ŵ": "w",
          "Ŷ": "Y",
          "ŷ": "y",
          "Ÿ": "Y",
          "Ź": "Z",
          "Ż": "Z",
          "Ž": "Z",
          "ź": "z",
          "ż": "z",
          "ž": "z",
          "Ĳ": "IJ",
          "ĳ": "ij",
          "Œ": "Oe",
          "œ": "oe",
          "ŉ": "'n",
          "ſ": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = exports$1 && !exports$1.nodeType && exports$1;
        var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = (function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        })();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values2) {
          var index = -1, length = values2.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values2[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined$1 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined$1 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined$1) {
              result = result === undefined$1 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined$1 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map2) {
          var index = -1, result = Array(map2.size);
          map2.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = (function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = (function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          })();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
          );
          var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
          var defineProperty = (function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          })();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap && new WeakMap();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
          function lodash2(value) {
            if (isObjectLike(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = /* @__PURE__ */ (function() {
            function object() {
            }
            return function(proto) {
              if (!isObject2(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined$1;
              return result2;
            };
          })();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined$1;
          }
          lodash2.templateSettings = {
            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "escape": reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "evaluate": reEvaluate,
            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "interpolate": reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            "variable": "",
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            "imports": {
              /**
               * A reference to the `lodash` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              "_": lodash2
            }
          };
          lodash2.prototype = baseLodash.prototype;
          lodash2.prototype.constructor = lodash2;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined$1 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined$1 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values3) {
            var index = -1, length = values3 == null ? 0 : values3.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values3[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
              (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
              isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined$1;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys2(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined$1 : get(object, paths[index]);
            }
            return result2;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined$1) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined$1) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined$1) {
              return result2;
            }
            if (!isObject2(value)) {
              return value;
            }
            var isArr = isArray2(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys2;
            var props = isArr ? undefined$1 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          function baseConforms(source) {
            var props = keys2(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined$1 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined$1, args);
            }, wait);
          }
          function baseDifference(array, values3, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values3.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values3 = arrayMap(values3, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values3.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values3 = new SetCache(values3);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values3[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values3, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined$1 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys2);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys2);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction2(object[key]);
            });
          }
          function baseGet(object, path2) {
            path2 = castPath(path2, object);
            var index = 0, length = path2.length;
            while (object != null && index < length) {
              object = object[toKey(path2[index++])];
            }
            return index && index == length ? object : undefined$1;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined$1 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path2, args) {
            path2 = castPath(path2, object);
            object = parent(object, path2);
            var func = object == null ? object : object[toKey(last2(path2))];
            return func == null ? undefined$1 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined$1 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject2(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject2(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path2, srcValue) {
            if (isKey(path2) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path2), srcValue);
            }
            return function(object) {
              var objValue = get(object, path2);
              return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject2(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
                if (newValue === undefined$1) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
            var isCommon = newValue === undefined$1;
            if (isCommon) {
              var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray2(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject2(objValue) || isFunction2(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined$1;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray2(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path2) {
              return hasIn(object, path2);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path2 = paths[index], value = baseGet(object, path2);
              if (predicate(value, path2)) {
                baseSet(result2, castPath(path2, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path2) {
            return function(object) {
              return baseGet(object, path2);
            };
          }
          function basePullAll(array, values3, iteratee2, comparator) {
            var indexOf3 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values3.length, seen = array;
            if (array === values3) {
              values3 = copyArray(values3);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values3[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf3(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values2(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values2(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path2, value, customizer) {
            if (!isObject2(object)) {
              return object;
            }
            path2 = castPath(path2, object);
            var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path2[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
                if (newValue === undefined$1) {
                  newValue = isObject2(objValue) ? objValue : isIndex(path2[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values2(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray2(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseUnset(object, path2) {
            path2 = castPath(path2, object);
            object = parent(object, path2);
            return object == null || delete object[toKey(last2(path2))];
          }
          function baseUpdate(object, path2, updater, customizer) {
            return baseSet(object, path2, updater(baseGet(object, path2)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values3, assignFunc) {
            var index = -1, length = props.length, valsLength = values3.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values3[index] : undefined$1;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray2(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined$1 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
              if (newValue === undefined$1) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined$1 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject2(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined$1,
                  args,
                  holders,
                  undefined$1,
                  undefined$1,
                  arity - length
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys2(collection);
                predicate = function(key) {
                  return iteratee2(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray2(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined$1 && other === undefined$1) {
                return defaultValue;
              }
              if (value !== undefined$1) {
                result2 = value;
              }
              if (other !== undefined$1) {
                if (result2 === undefined$1) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined$1 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined$1;
              }
              start = toFinite(start);
              if (end === undefined$1) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= -4;
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined$1, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values3) {
            return new Set2(values3);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= -97;
              partials = holders = undefined$1;
            }
            ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined$1 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined$1;
            }
            var data = isBindKey ? undefined$1 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= -25;
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined$1, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject2(objValue) && isObject2(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined$1 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined$1) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined$1, flatten2), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys2, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash2.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map3, key) {
            var data = map3.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys2(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined$1;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined$1;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
            getTag = function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path2, hasFunc) {
            path2 = castPath(path2, object);
            var index = -1, length = path2.length, result2 = false;
            while (++index < length) {
              var key = toKey(path2[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray2(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          function isIterateeCall(value, index, object) {
            if (!isObject2(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray2(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash2[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction2 : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject2(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path2) {
            return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined$1, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined$1 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          function compact2(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray2(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference2 = baseRest(function(array, values3) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values3) {
            var iteratee2 = last2(values3);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values3) {
            var comparator = last2(values3);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined$1;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
          });
          function drop2(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight2(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined$1) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten2(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined$1 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined$1;
          }
          function indexOf2(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last2(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last2(mapped)) {
              iteratee2 = undefined$1;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last2(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last2(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined$1;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined$1) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values3) {
            return array && array.length && values3 && values3.length ? basePullAll(array, values3) : array;
          }
          function pullAllBy(array, values3, iteratee2) {
            return array && array.length && values3 && values3.length ? basePullAll(array, values3, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values3, comparator) {
            return array && array.length && values3 && values3.length ? basePullAll(array, values3, undefined$1, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined$1 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last2(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last2(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
          });
          function uniq2(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined$1, group);
            });
          }
          var without = baseRest(function(array, values3) {
            return isArrayLikeObject(array) ? baseDifference(array, values3) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last2(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last2(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values3) {
            return baseZipObject(props || [], values3 || [], assignValue);
          }
          function zipObjectDeep(props, values3) {
            return baseZipObject(props || [], values3 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash2(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined$1
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined$1);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined$1) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined$1;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined$1
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every2(collection, predicate, guard) {
            var func = isArray2(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined$1;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter2(collection, predicate) {
            var func = isArray2(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find2 = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map2(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map2(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined$1 ? 1 : toInteger(depth);
            return baseFlatten(map2(collection, iteratee2), depth);
          }
          function forEach2(collection, iteratee2) {
            var func = isArray2(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray2(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy2 = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values2(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path2, args) {
            var index = -1, isFunc = typeof path2 == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path2, value, args) : baseInvoke(value, path2, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map2(collection, iteratee2) {
            var func = isArray2(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray2(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined$1 : orders;
            if (!isArray2(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce2(collection, iteratee2, accumulator) {
            var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject2(collection, predicate) {
            var func = isArray2(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray2(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray2(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString2(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some2(collection, predicate, guard) {
            var func = isArray2(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined$1;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined$1 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined$1;
              }
              return result2;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined$1 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined$1 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject2(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined$1;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined$1;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined$1;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined$1) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined$1;
            }
            function flush() {
              return timerId === undefined$1 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined$1) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined$1) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = start === undefined$1 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (isObject2(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray2(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys2(source));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
            return arguments;
          })()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray2 = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction2(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty2(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            var result2 = customizer ? customizer(value, other) : undefined$1;
            return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction2(value) {
            if (!isObject2(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject2(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp2 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString2(value) {
            return typeof value == "string" || !isArray2(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined2(value) {
            return value === undefined$1;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString2(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values2;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject2(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject2(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign2 = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys2(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys2(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults2 = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined$1, customDefaultsMerge);
            return apply(mergeWith, undefined$1, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys2(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get(object, path2, defaultValue) {
            var result2 = object == null ? undefined$1 : baseGet(object, path2);
            return result2 === undefined$1 ? defaultValue : result2;
          }
          function has2(object, path2) {
            return object != null && hasPath(object, path2, baseHas);
          }
          function hasIn(object, path2) {
            return object != null && hasPath(object, path2, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys2(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          function mapValues2(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          var merge2 = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path2) {
              path2 = castPath(path2, object);
              isDeep || (isDeep = path2.length > 1);
              return path2;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick2 = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path2) {
              return predicate(value, path2[0]);
            });
          }
          function result(object, path2, defaultValue) {
            path2 = castPath(path2, object);
            var index = -1, length = path2.length;
            if (!length) {
              length = 1;
              object = undefined$1;
            }
            while (++index < length) {
              var value = object == null ? undefined$1 : object[toKey(path2[index])];
              if (value === undefined$1) {
                index = length;
                value = defaultValue;
              }
              object = isFunction2(value) ? value.call(object) : value;
            }
            return object;
          }
          function set(object, path2, value) {
            return object == null ? object : baseSet(object, path2, value);
          }
          function setWith(object, path2, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return object == null ? object : baseSet(object, path2, value, customizer);
          }
          var toPairs = createToPairs(keys2);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray2(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject2(object)) {
                accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path2) {
            return object == null ? true : baseUnset(object, path2);
          }
          function update(object, path2, updater) {
            return object == null ? object : baseUpdate(object, path2, castFunction(updater));
          }
          function updateWith(object, path2, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return object == null ? object : baseUpdate(object, path2, castFunction(updater), customizer);
          }
          function values2(object) {
            return object == null ? [] : baseValues(object, keys2(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp(number, lower, upper) {
            if (upper === undefined$1) {
              upper = lower;
              lower = undefined$1;
            }
            if (upper !== undefined$1) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined$1) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined$1;
            }
            if (floating === undefined$1) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined$1;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined$1;
              }
            }
            if (lower === undefined$1 && upper === undefined$1) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined$1) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined$1;
            }
            limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp2(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings = lodash2.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined$1;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys2(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject2(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined$1) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp2(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined$1 : pattern;
            if (pattern === undefined$1) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined$1, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path2, srcValue) {
            return baseMatchesProperty(path2, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path2, args) {
            return function(object) {
              return baseInvoke(object, path2, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path2) {
              return baseInvoke(object, path2, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys2(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys2(source));
            }
            var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path2) {
            return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
          }
          function propertyOf(object) {
            return function(path2) {
              return object == null ? undefined$1 : baseGet(object, path2);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray2(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash2.after = after;
          lodash2.ary = ary;
          lodash2.assign = assign2;
          lodash2.assignIn = assignIn;
          lodash2.assignInWith = assignInWith;
          lodash2.assignWith = assignWith;
          lodash2.at = at;
          lodash2.before = before;
          lodash2.bind = bind;
          lodash2.bindAll = bindAll;
          lodash2.bindKey = bindKey;
          lodash2.castArray = castArray;
          lodash2.chain = chain;
          lodash2.chunk = chunk;
          lodash2.compact = compact2;
          lodash2.concat = concat;
          lodash2.cond = cond;
          lodash2.conforms = conforms;
          lodash2.constant = constant;
          lodash2.countBy = countBy;
          lodash2.create = create;
          lodash2.curry = curry;
          lodash2.curryRight = curryRight;
          lodash2.debounce = debounce;
          lodash2.defaults = defaults2;
          lodash2.defaultsDeep = defaultsDeep;
          lodash2.defer = defer;
          lodash2.delay = delay;
          lodash2.difference = difference2;
          lodash2.differenceBy = differenceBy;
          lodash2.differenceWith = differenceWith;
          lodash2.drop = drop2;
          lodash2.dropRight = dropRight2;
          lodash2.dropRightWhile = dropRightWhile;
          lodash2.dropWhile = dropWhile;
          lodash2.fill = fill;
          lodash2.filter = filter2;
          lodash2.flatMap = flatMap;
          lodash2.flatMapDeep = flatMapDeep;
          lodash2.flatMapDepth = flatMapDepth;
          lodash2.flatten = flatten2;
          lodash2.flattenDeep = flattenDeep;
          lodash2.flattenDepth = flattenDepth;
          lodash2.flip = flip;
          lodash2.flow = flow;
          lodash2.flowRight = flowRight;
          lodash2.fromPairs = fromPairs;
          lodash2.functions = functions;
          lodash2.functionsIn = functionsIn;
          lodash2.groupBy = groupBy2;
          lodash2.initial = initial;
          lodash2.intersection = intersection;
          lodash2.intersectionBy = intersectionBy;
          lodash2.intersectionWith = intersectionWith;
          lodash2.invert = invert;
          lodash2.invertBy = invertBy;
          lodash2.invokeMap = invokeMap;
          lodash2.iteratee = iteratee;
          lodash2.keyBy = keyBy;
          lodash2.keys = keys2;
          lodash2.keysIn = keysIn;
          lodash2.map = map2;
          lodash2.mapKeys = mapKeys;
          lodash2.mapValues = mapValues2;
          lodash2.matches = matches;
          lodash2.matchesProperty = matchesProperty;
          lodash2.memoize = memoize;
          lodash2.merge = merge2;
          lodash2.mergeWith = mergeWith;
          lodash2.method = method;
          lodash2.methodOf = methodOf;
          lodash2.mixin = mixin;
          lodash2.negate = negate;
          lodash2.nthArg = nthArg;
          lodash2.omit = omit;
          lodash2.omitBy = omitBy;
          lodash2.once = once;
          lodash2.orderBy = orderBy;
          lodash2.over = over;
          lodash2.overArgs = overArgs;
          lodash2.overEvery = overEvery;
          lodash2.overSome = overSome;
          lodash2.partial = partial;
          lodash2.partialRight = partialRight;
          lodash2.partition = partition;
          lodash2.pick = pick2;
          lodash2.pickBy = pickBy;
          lodash2.property = property;
          lodash2.propertyOf = propertyOf;
          lodash2.pull = pull;
          lodash2.pullAll = pullAll;
          lodash2.pullAllBy = pullAllBy;
          lodash2.pullAllWith = pullAllWith;
          lodash2.pullAt = pullAt;
          lodash2.range = range;
          lodash2.rangeRight = rangeRight;
          lodash2.rearg = rearg;
          lodash2.reject = reject2;
          lodash2.remove = remove;
          lodash2.rest = rest;
          lodash2.reverse = reverse;
          lodash2.sampleSize = sampleSize;
          lodash2.set = set;
          lodash2.setWith = setWith;
          lodash2.shuffle = shuffle;
          lodash2.slice = slice;
          lodash2.sortBy = sortBy;
          lodash2.sortedUniq = sortedUniq;
          lodash2.sortedUniqBy = sortedUniqBy;
          lodash2.split = split;
          lodash2.spread = spread;
          lodash2.tail = tail;
          lodash2.take = take;
          lodash2.takeRight = takeRight;
          lodash2.takeRightWhile = takeRightWhile;
          lodash2.takeWhile = takeWhile;
          lodash2.tap = tap;
          lodash2.throttle = throttle;
          lodash2.thru = thru;
          lodash2.toArray = toArray;
          lodash2.toPairs = toPairs;
          lodash2.toPairsIn = toPairsIn;
          lodash2.toPath = toPath;
          lodash2.toPlainObject = toPlainObject;
          lodash2.transform = transform;
          lodash2.unary = unary;
          lodash2.union = union;
          lodash2.unionBy = unionBy;
          lodash2.unionWith = unionWith;
          lodash2.uniq = uniq2;
          lodash2.uniqBy = uniqBy;
          lodash2.uniqWith = uniqWith;
          lodash2.unset = unset;
          lodash2.unzip = unzip;
          lodash2.unzipWith = unzipWith;
          lodash2.update = update;
          lodash2.updateWith = updateWith;
          lodash2.values = values2;
          lodash2.valuesIn = valuesIn;
          lodash2.without = without;
          lodash2.words = words;
          lodash2.wrap = wrap;
          lodash2.xor = xor;
          lodash2.xorBy = xorBy;
          lodash2.xorWith = xorWith;
          lodash2.zip = zip;
          lodash2.zipObject = zipObject;
          lodash2.zipObjectDeep = zipObjectDeep;
          lodash2.zipWith = zipWith;
          lodash2.entries = toPairs;
          lodash2.entriesIn = toPairsIn;
          lodash2.extend = assignIn;
          lodash2.extendWith = assignInWith;
          mixin(lodash2, lodash2);
          lodash2.add = add;
          lodash2.attempt = attempt;
          lodash2.camelCase = camelCase;
          lodash2.capitalize = capitalize;
          lodash2.ceil = ceil;
          lodash2.clamp = clamp;
          lodash2.clone = clone;
          lodash2.cloneDeep = cloneDeep;
          lodash2.cloneDeepWith = cloneDeepWith;
          lodash2.cloneWith = cloneWith;
          lodash2.conformsTo = conformsTo;
          lodash2.deburr = deburr;
          lodash2.defaultTo = defaultTo;
          lodash2.divide = divide;
          lodash2.endsWith = endsWith;
          lodash2.eq = eq;
          lodash2.escape = escape;
          lodash2.escapeRegExp = escapeRegExp;
          lodash2.every = every2;
          lodash2.find = find2;
          lodash2.findIndex = findIndex;
          lodash2.findKey = findKey;
          lodash2.findLast = findLast;
          lodash2.findLastIndex = findLastIndex;
          lodash2.findLastKey = findLastKey;
          lodash2.floor = floor;
          lodash2.forEach = forEach2;
          lodash2.forEachRight = forEachRight;
          lodash2.forIn = forIn;
          lodash2.forInRight = forInRight;
          lodash2.forOwn = forOwn;
          lodash2.forOwnRight = forOwnRight;
          lodash2.get = get;
          lodash2.gt = gt;
          lodash2.gte = gte;
          lodash2.has = has2;
          lodash2.hasIn = hasIn;
          lodash2.head = head;
          lodash2.identity = identity;
          lodash2.includes = includes;
          lodash2.indexOf = indexOf2;
          lodash2.inRange = inRange;
          lodash2.invoke = invoke;
          lodash2.isArguments = isArguments;
          lodash2.isArray = isArray2;
          lodash2.isArrayBuffer = isArrayBuffer;
          lodash2.isArrayLike = isArrayLike;
          lodash2.isArrayLikeObject = isArrayLikeObject;
          lodash2.isBoolean = isBoolean;
          lodash2.isBuffer = isBuffer;
          lodash2.isDate = isDate;
          lodash2.isElement = isElement;
          lodash2.isEmpty = isEmpty2;
          lodash2.isEqual = isEqual;
          lodash2.isEqualWith = isEqualWith;
          lodash2.isError = isError;
          lodash2.isFinite = isFinite;
          lodash2.isFunction = isFunction2;
          lodash2.isInteger = isInteger;
          lodash2.isLength = isLength;
          lodash2.isMap = isMap;
          lodash2.isMatch = isMatch;
          lodash2.isMatchWith = isMatchWith;
          lodash2.isNaN = isNaN2;
          lodash2.isNative = isNative;
          lodash2.isNil = isNil;
          lodash2.isNull = isNull;
          lodash2.isNumber = isNumber;
          lodash2.isObject = isObject2;
          lodash2.isObjectLike = isObjectLike;
          lodash2.isPlainObject = isPlainObject;
          lodash2.isRegExp = isRegExp2;
          lodash2.isSafeInteger = isSafeInteger;
          lodash2.isSet = isSet;
          lodash2.isString = isString2;
          lodash2.isSymbol = isSymbol;
          lodash2.isTypedArray = isTypedArray;
          lodash2.isUndefined = isUndefined2;
          lodash2.isWeakMap = isWeakMap;
          lodash2.isWeakSet = isWeakSet;
          lodash2.join = join;
          lodash2.kebabCase = kebabCase;
          lodash2.last = last2;
          lodash2.lastIndexOf = lastIndexOf;
          lodash2.lowerCase = lowerCase;
          lodash2.lowerFirst = lowerFirst;
          lodash2.lt = lt;
          lodash2.lte = lte;
          lodash2.max = max;
          lodash2.maxBy = maxBy;
          lodash2.mean = mean;
          lodash2.meanBy = meanBy;
          lodash2.min = min;
          lodash2.minBy = minBy;
          lodash2.stubArray = stubArray;
          lodash2.stubFalse = stubFalse;
          lodash2.stubObject = stubObject;
          lodash2.stubString = stubString;
          lodash2.stubTrue = stubTrue;
          lodash2.multiply = multiply;
          lodash2.nth = nth;
          lodash2.noConflict = noConflict;
          lodash2.noop = noop;
          lodash2.now = now;
          lodash2.pad = pad;
          lodash2.padEnd = padEnd;
          lodash2.padStart = padStart;
          lodash2.parseInt = parseInt2;
          lodash2.random = random;
          lodash2.reduce = reduce2;
          lodash2.reduceRight = reduceRight;
          lodash2.repeat = repeat;
          lodash2.replace = replace;
          lodash2.result = result;
          lodash2.round = round;
          lodash2.runInContext = runInContext2;
          lodash2.sample = sample;
          lodash2.size = size;
          lodash2.snakeCase = snakeCase;
          lodash2.some = some2;
          lodash2.sortedIndex = sortedIndex;
          lodash2.sortedIndexBy = sortedIndexBy;
          lodash2.sortedIndexOf = sortedIndexOf;
          lodash2.sortedLastIndex = sortedLastIndex;
          lodash2.sortedLastIndexBy = sortedLastIndexBy;
          lodash2.sortedLastIndexOf = sortedLastIndexOf;
          lodash2.startCase = startCase;
          lodash2.startsWith = startsWith;
          lodash2.subtract = subtract;
          lodash2.sum = sum;
          lodash2.sumBy = sumBy;
          lodash2.template = template;
          lodash2.times = times;
          lodash2.toFinite = toFinite;
          lodash2.toInteger = toInteger;
          lodash2.toLength = toLength;
          lodash2.toLower = toLower;
          lodash2.toNumber = toNumber;
          lodash2.toSafeInteger = toSafeInteger;
          lodash2.toString = toString;
          lodash2.toUpper = toUpper;
          lodash2.trim = trim;
          lodash2.trimEnd = trimEnd;
          lodash2.trimStart = trimStart;
          lodash2.truncate = truncate;
          lodash2.unescape = unescape;
          lodash2.uniqueId = uniqueId;
          lodash2.upperCase = upperCase;
          lodash2.upperFirst = upperFirst;
          lodash2.each = forEach2;
          lodash2.eachRight = forEachRight;
          lodash2.first = head;
          mixin(lodash2, (function() {
            var source = {};
            baseForOwn(lodash2, function(func, methodName) {
              if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          })(), { "chain": false });
          lodash2.VERSION = VERSION2;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash2[methodName].placeholder = lodash2;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path2, args) {
            if (typeof path2 == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path2, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined$1) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash2.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
              var interceptor = function(value2) {
                var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash2.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray2(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray2(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash2[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined$1
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash2.prototype.at = wrapperAt;
          lodash2.prototype.chain = wrapperChain;
          lodash2.prototype.commit = wrapperCommit;
          lodash2.prototype.next = wrapperNext;
          lodash2.prototype.plant = wrapperPlant;
          lodash2.prototype.reverse = wrapperReverse;
          lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
          lodash2.prototype.first = lodash2.prototype.head;
          if (symIterator) {
            lodash2.prototype[symIterator] = wrapperToIterator;
          }
          return lodash2;
        });
        var _ = runInContext();
        if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(lodash);
    })(lodash$1, lodash$1.exports);
    return lodash$1.exports;
  }
  var findNextTextualToken_1;
  var hasRequiredFindNextTextualToken;
  function requireFindNextTextualToken() {
    if (hasRequiredFindNextTextualToken) return findNextTextualToken_1;
    hasRequiredFindNextTextualToken = 1;
    const { findIndex } = requireLodash();
    function findNextTextualToken(tokenVector, prevTokenEndOffset) {
      const prevTokenIdx = findIndex(
        tokenVector,
        (tok) => tok.endOffset === prevTokenEndOffset
      );
      let nextTokenIdx = prevTokenIdx;
      let found = false;
      while (found === false) {
        nextTokenIdx++;
        const nextPossibleToken = tokenVector[nextTokenIdx];
        if (nextPossibleToken === void 0) {
          return null;
        }
        if (nextPossibleToken.tokenType.name === "SEA_WS") ;
        else {
          return nextPossibleToken;
        }
      }
    }
    findNextTextualToken_1 = {
      findNextTextualToken
    };
    return findNextTextualToken_1;
  }
  var xmlNsKey;
  var hasRequiredXmlNsKey;
  function requireXmlNsKey() {
    if (hasRequiredXmlNsKey) return xmlNsKey;
    hasRequiredXmlNsKey = 1;
    const namespaceRegex = /^xmlns(?<prefixWithColon>:(?<prefix>[^:]*))?$/;
    function isXMLNamespaceKey({ key, includeEmptyPrefix }) {
      if (typeof key !== "string") {
        return false;
      }
      const matchArr = key.match(namespaceRegex);
      if (matchArr === null) {
        return false;
      }
      return !!(includeEmptyPrefix === true || // "xmlns" case
      !matchArr.groups.prefixWithColon || // "xmlns:<prefix>" case
      matchArr.groups.prefix);
    }
    function getXMLNamespaceKeyPrefix(key) {
      if (typeof key !== "string") {
        return void 0;
      }
      const matchArr = key.match(namespaceRegex);
      if (matchArr === null) {
        return void 0;
      }
      return matchArr.groups && matchArr.groups.prefix || "";
    }
    xmlNsKey = {
      isXMLNamespaceKey,
      getXMLNamespaceKeyPrefix
    };
    return xmlNsKey;
  }
  var api$4;
  var hasRequiredApi$4;
  function requireApi$4() {
    if (hasRequiredApi$4) return api$4;
    hasRequiredApi$4 = 1;
    const { findNextTextualToken } = requireFindNextTextualToken();
    const {
      isXMLNamespaceKey,
      getXMLNamespaceKeyPrefix
    } = requireXmlNsKey();
    api$4 = {
      findNextTextualToken,
      isXMLNamespaceKey,
      getXMLNamespaceKeyPrefix
    };
    return api$4;
  }
  var utils$1;
  var hasRequiredUtils$1;
  function requireUtils$1() {
    if (hasRequiredUtils$1) return utils$1;
    hasRequiredUtils$1 = 1;
    const { reduce: reduce2, has: has2, isArray: isArray2 } = requireLodash();
    function getAstChildrenReflective(astParent) {
      const astChildren = reduce2(
        astParent,
        (result, prop, name) => {
          if (name === "parent") ;
          else if (has2(prop, "type")) {
            result.push(prop);
          } else if (isArray2(prop) && prop.length > 0 && has2(prop[0], "type")) {
            result = result.concat(prop);
          }
          return result;
        },
        []
      );
      return astChildren;
    }
    utils$1 = {
      getAstChildrenReflective
    };
    return utils$1;
  }
  var constants;
  var hasRequiredConstants;
  function requireConstants() {
    if (hasRequiredConstants) return constants;
    hasRequiredConstants = 1;
    constants = {
      DEFAULT_NS: "::DEFAULT"
    };
    return constants;
  }
  var buildAst_1;
  var hasRequiredBuildAst;
  function requireBuildAst() {
    if (hasRequiredBuildAst) return buildAst_1;
    hasRequiredBuildAst = 1;
    const { BaseXmlCstVisitor } = requireApi$5();
    const {
      last: last2,
      forEach: forEach2,
      reduce: reduce2,
      map: map2,
      pick: pick2,
      sortBy,
      isEmpty: isEmpty2,
      isArray: isArray2,
      assign: assign2
    } = requireLodash();
    const {
      findNextTextualToken,
      isXMLNamespaceKey,
      getXMLNamespaceKeyPrefix
    } = requireApi$4();
    const { getAstChildrenReflective } = requireUtils$1();
    const { DEFAULT_NS } = requireConstants();
    function buildAst(docCst, tokenVector) {
      AstBuilder.setState({ tokenVector });
      const xmlDocAst = AstBuilder.visit(docCst);
      if (xmlDocAst.rootElement !== invalidSyntax) {
        updateNamespaces(xmlDocAst.rootElement);
      }
      return xmlDocAst;
    }
    class CstToAstVisitor extends BaseXmlCstVisitor {
      constructor() {
        super();
      }
      setState({ tokenVector }) {
        this.tokenVector = tokenVector;
      }
      visit(cstNode, params = {}) {
        return super.visit(cstNode, { location: cstNode.location, ...params });
      }
      /**
       * @param ctx {DocumentCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       *
       * @returns {XMLDocument}
       */
      document(ctx, { location }) {
        const astNode = {
          type: "XMLDocument",
          rootElement: invalidSyntax,
          position: location
        };
        if (ctx.prolog !== void 0) {
          astNode.prolog = this.visit(ctx.prolog[0]);
        }
        if (ctx.element !== void 0 && isEmpty2(ctx.element[0].children) === false) {
          astNode.rootElement = this.visit(ctx.element[0]);
        }
        setChildrenParent(astNode);
        return astNode;
      }
      /**
       * @param ctx {PrologCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       */
      prolog(ctx, { location }) {
        const astNode = {
          type: "XMLProlog",
          attributes: [],
          position: location
        };
        if (ctx.attribute !== void 0) {
          astNode.attributes = map2(
            ctx.attribute,
            (_) => this.visit(_, { isPrologParent: true })
          );
        }
        setChildrenParent(astNode);
        return astNode;
      }
      /**
       * @param {docTypeDeclCtx} ctx
       */
      /* istanbul ignore next - place holder*/
      docTypeDecl(ctx, astNode) {
      }
      /**
       * @param {ExternalIDCtx} ctx
       */
      /* istanbul ignore next - place holder*/
      externalID(ctx, astNode) {
      }
      /**
       * @param ctx {ContentCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       *
       * @return {{elements, textContents}}
       */
      content(ctx, { location }) {
        let elements = [];
        let textContents = [];
        if (ctx.element !== void 0) {
          elements = map2(ctx.element, this.visit.bind(this));
        }
        if (ctx.chardata !== void 0) {
          textContents = map2(ctx.chardata, this.visit.bind(this));
        }
        return { elements, textContents };
      }
      /**
       * @param ctx {ElementCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       */
      element(ctx, { location }) {
        const astNode = {
          type: "XMLElement",
          // Avoid Accidental Keys in this map
          namespaces: /* @__PURE__ */ Object.create(null),
          name: invalidSyntax,
          attributes: [],
          subElements: [],
          textContents: [],
          position: location,
          syntax: {}
        };
        if (ctx.attribute !== void 0) {
          astNode.attributes = map2(ctx.attribute, this.visit.bind(this));
        }
        if (ctx.content !== void 0) {
          const { elements, textContents } = this.visit(ctx.content[0]);
          astNode.subElements = elements;
          astNode.textContents = textContents;
        }
        handleElementOpenCloseNameRanges(astNode, ctx);
        handleElementOpenCloseBodyRanges(astNode, ctx);
        handleElementAttributeRanges(astNode, ctx, this.tokenVector);
        setChildrenParent(astNode);
        return astNode;
      }
      /**
       * @param ctx {ReferenceCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       */
      /* istanbul ignore next - place holder*/
      reference(ctx, { location }) {
      }
      /**
       * @param ctx {AttributeCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       * @param opts.isPrologParent {boolean}
       */
      attribute(ctx, { location, isPrologParent }) {
        const astNode = {
          type: isPrologParent ? "XMLPrologAttribute" : "XMLAttribute",
          position: location,
          key: invalidSyntax,
          value: invalidSyntax,
          syntax: {}
        };
        if (ctx.Name !== void 0 && ctx.Name[0].isInsertedInRecovery !== true) {
          const keyToken = ctx.Name[0];
          astNode.key = keyToken.image;
          astNode.syntax.key = toXMLToken(keyToken);
        }
        if (ctx.STRING !== void 0 && ctx.STRING[0].isInsertedInRecovery !== true) {
          const valueToken = ctx.STRING[0];
          astNode.value = stripQuotes(valueToken.image);
          astNode.syntax.value = toXMLToken(valueToken);
        }
        setChildrenParent(astNode);
        return astNode;
      }
      /**
       * @param ctx {ChardataCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       */
      chardata(ctx, { location }) {
        const astNode = {
          type: "XMLTextContent",
          position: location,
          text: invalidSyntax
        };
        let allTokens = [];
        if (ctx.SEA_WS !== void 0) {
          allTokens = allTokens.concat(ctx.SEA_WS);
        }
        if (ctx.TEXT !== void 0) {
          allTokens = allTokens.concat(ctx.TEXT);
        }
        const sortedTokens = sortBy(allTokens, ["startOffset"]);
        const fullText = map2(sortedTokens, "image").join("");
        astNode.text = fullText;
        return astNode;
      }
      /**
       * @param ctx {MiscCtx}
       * @param opts {Object}
       * @param opts.location {SourcePosition}
       */
      /* istanbul ignore next - place holder*/
      misc(ctx, { location }) {
      }
    }
    const AstBuilder = new CstToAstVisitor();
    function setChildrenParent(astParent) {
      const astChildren = getAstChildrenReflective(astParent);
      forEach2(astChildren, (child) => child.parent = astParent);
    }
    function updateNamespaces(element, prevNamespaces = []) {
      const currElemNamespaces = reduce2(
        element.attributes,
        (result, attrib) => {
          if (attrib.key !== invalidSyntax) {
            if (isXMLNamespaceKey({ key: attrib.key, includeEmptyPrefix: false }) === true) {
              const prefix = getXMLNamespaceKeyPrefix(attrib.key);
              if (attrib.value) {
                const uri = attrib.value;
                if (prefix !== "") {
                  result[prefix] = uri;
                } else {
                  result[DEFAULT_NS] = uri;
                }
              }
            }
          }
          return result;
        },
        {}
      );
      const emptyMap = /* @__PURE__ */ Object.create(null);
      element.namespaces = assign2(emptyMap, prevNamespaces, currElemNamespaces);
      forEach2(
        element.subElements,
        (subElem) => updateNamespaces(subElem, element.namespaces)
      );
    }
    function toXMLToken(token) {
      return pick2(token, [
        "image",
        "startOffset",
        "endOffset",
        "startLine",
        "endLine",
        "startColumn",
        "endColumn"
      ]);
    }
    function startOfXMLToken(token) {
      return pick2(token, ["startOffset", "startLine", "startColumn"]);
    }
    function endOfXMLToken(token) {
      return pick2(token, ["endOffset", "endLine", "endColumn"]);
    }
    function exists(tokArr) {
      return isArray2(tokArr) && tokArr.length === 1 && tokArr[0].isInsertedInRecovery !== true;
    }
    function stripQuotes(quotedText) {
      return quotedText.substring(1, quotedText.length - 1);
    }
    function nsToParts(text) {
      const matchResult = /^([^:]+):([^:]+)$/.exec(text);
      if (matchResult === null) {
        return null;
      }
      const ns = matchResult[1];
      const name = matchResult[2];
      return { ns, name };
    }
    const invalidSyntax = null;
    function handleElementOpenCloseNameRanges(astNode, ctx) {
      if (ctx.Name !== void 0 && ctx.Name[0].isInsertedInRecovery !== true) {
        const openNameToken = ctx.Name[0];
        astNode.syntax.openName = toXMLToken(openNameToken);
        const nsParts = nsToParts(openNameToken.image);
        if (nsParts !== null) {
          astNode.ns = nsParts.ns;
          astNode.name = nsParts.name;
        } else {
          astNode.name = openNameToken.image;
        }
      }
      if (ctx.END_NAME !== void 0 && ctx.END_NAME[0].isInsertedInRecovery !== true) {
        astNode.syntax.closeName = toXMLToken(ctx.END_NAME[0]);
      }
    }
    function handleElementOpenCloseBodyRanges(astNode, ctx) {
      if (exists(ctx.OPEN)) {
        let openBodyCloseTok = void 0;
        if (exists(ctx.START_CLOSE)) {
          openBodyCloseTok = ctx.START_CLOSE[0];
          astNode.syntax.isSelfClosing = false;
        } else if (exists(ctx.SLASH_CLOSE)) {
          openBodyCloseTok = ctx.SLASH_CLOSE[0];
          astNode.syntax.isSelfClosing = true;
        }
        if (openBodyCloseTok !== void 0) {
          astNode.syntax.openBody = {
            ...startOfXMLToken(ctx.OPEN[0]),
            ...endOfXMLToken(openBodyCloseTok)
          };
        }
        if (exists(ctx.SLASH_OPEN) && exists(ctx.END)) {
          astNode.syntax.closeBody = {
            ...startOfXMLToken(ctx.SLASH_OPEN[0]),
            ...endOfXMLToken(ctx.END[0])
          };
        }
      }
    }
    function handleElementAttributeRanges(astNode, ctx, tokenVector) {
      if (exists(ctx.Name)) {
        const startOffset = ctx.Name[0].endOffset + 2;
        if (exists(ctx.START_CLOSE) || exists(ctx.SLASH_CLOSE)) {
          const endOffset = (exists(ctx.START_CLOSE) ? ctx.START_CLOSE[0].startOffset : ctx.SLASH_CLOSE[0].startOffset) - 1;
          astNode.syntax.attributesRange = { startOffset, endOffset };
        } else {
          const hasAttributes = isArray2(ctx.attribute);
          const lastKnownAttribRangeTokenEnd = hasAttributes ? last2(ctx.attribute).location.endOffset : ctx.Name[0].endOffset;
          const nextTextualToken = findNextTextualToken(
            tokenVector,
            lastKnownAttribRangeTokenEnd
          );
          if (nextTextualToken !== null) {
            astNode.syntax.guessedAttributesRange = {
              startOffset,
              endOffset: nextTextualToken.endOffset - 1
            };
          }
        }
      }
    }
    buildAst_1 = {
      buildAst
    };
    return buildAst_1;
  }
  var visitAst;
  var hasRequiredVisitAst;
  function requireVisitAst() {
    if (hasRequiredVisitAst) return visitAst;
    hasRequiredVisitAst = 1;
    const { forEach: forEach2, isFunction: isFunction2 } = requireLodash();
    const { getAstChildrenReflective } = requireUtils$1();
    function accept(node, visitor) {
      switch (node.type) {
        case "XMLDocument": {
          if (isFunction2(visitor.visitXMLDocument)) {
            visitor.visitXMLDocument(node);
          }
          break;
        }
        case "XMLProlog": {
          if (isFunction2(visitor.visitXMLProlog)) {
            visitor.visitXMLProlog(node);
          }
          break;
        }
        case "XMLPrologAttribute": {
          if (isFunction2(visitor.visitXMLPrologAttribute)) {
            visitor.visitXMLPrologAttribute(node);
          }
          break;
        }
        case "XMLElement": {
          if (isFunction2(visitor.visitXMLElement)) {
            visitor.visitXMLElement(node);
          }
          break;
        }
        case "XMLAttribute": {
          if (isFunction2(visitor.visitXMLAttribute)) {
            visitor.visitXMLAttribute(node);
          }
          break;
        }
        case "XMLTextContent": {
          if (isFunction2(visitor.visitXMLTextContent)) {
            visitor.visitXMLTextContent(node);
          }
          break;
        }
        /* istanbul ignore next  defensive programming */
        default:
          throw Error("None Exhaustive Match");
      }
      const astChildren = getAstChildrenReflective(node);
      forEach2(astChildren, (childNode) => {
        accept(childNode, visitor);
      });
    }
    visitAst = {
      accept
    };
    return visitAst;
  }
  var api$3;
  var hasRequiredApi$3;
  function requireApi$3() {
    if (hasRequiredApi$3) return api$3;
    hasRequiredApi$3 = 1;
    const { buildAst } = requireBuildAst();
    const { accept } = requireVisitAst();
    const { DEFAULT_NS } = requireConstants();
    api$3 = {
      buildAst,
      accept,
      DEFAULT_NS
    };
    return api$3;
  }
  var apiExports$3 = requireApi$3();
  var validate_1;
  var hasRequiredValidate;
  function requireValidate() {
    if (hasRequiredValidate) return validate_1;
    hasRequiredValidate = 1;
    const { accept } = requireApi$3();
    const { defaultsDeep, flatMap } = requireLodash();
    function validate(options) {
      const actualOptions = defaultsDeep(options, {
        validators: {
          attribute: [],
          element: []
        }
      });
      let issues = [];
      const validateVisitor2 = {
        visitXMLElement: function(node) {
          const newIssues = flatMap(
            actualOptions.validators.element,
            (validator) => validator(node)
          );
          issues = issues.concat(newIssues);
        },
        visitXMLAttribute: function(node) {
          const newIssues = flatMap(
            actualOptions.validators.attribute,
            (validator) => validator(node)
          );
          issues = issues.concat(newIssues);
        }
      };
      accept(actualOptions.doc, validateVisitor2);
      return issues;
    }
    validate_1 = {
      validate
    };
    return validate_1;
  }
  var api$2;
  var hasRequiredApi$2;
  function requireApi$2() {
    if (hasRequiredApi$2) return api$2;
    hasRequiredApi$2 = 1;
    const { validate } = requireValidate();
    api$2 = {
      validate
    };
    return api$2;
  }
  var uniqueAttributeKeys;
  var hasRequiredUniqueAttributeKeys;
  function requireUniqueAttributeKeys() {
    if (hasRequiredUniqueAttributeKeys) return uniqueAttributeKeys;
    hasRequiredUniqueAttributeKeys = 1;
    const { groupBy: groupBy2, pickBy, reduce: reduce2, map: map2, filter: filter2 } = requireLodash();
    function validateUniqueAttributeKeys(elem) {
      const attributesWithKeys = filter2(elem.attributes, (_) => _.key !== null);
      const attribByKey = groupBy2(attributesWithKeys, "key");
      const nonUniqueAttribsGroups = pickBy(attribByKey, (_) => _.length > 1);
      const nonUniqueAttribs = reduce2(
        nonUniqueAttribsGroups,
        (result, attribsGroup) => result.concat(attribsGroup),
        []
      );
      const validationIssues = map2(nonUniqueAttribs, (_) => {
        const keyToken = _.syntax.key;
        return {
          msg: `duplicate attribute: "${_.key}"`,
          node: _,
          severity: "error",
          position: {
            startOffset: keyToken.startOffset,
            endOffset: keyToken.endOffset
          }
        };
      });
      return validationIssues;
    }
    uniqueAttributeKeys = {
      validateUniqueAttributeKeys
    };
    return uniqueAttributeKeys;
  }
  var tagClosingNameMatch;
  var hasRequiredTagClosingNameMatch;
  function requireTagClosingNameMatch() {
    if (hasRequiredTagClosingNameMatch) return tagClosingNameMatch;
    hasRequiredTagClosingNameMatch = 1;
    function validateTagClosingNameMatch(elem) {
      const openTagToken = elem.syntax.openName;
      const closeTagToken = elem.syntax.closeName;
      if (!openTagToken || !closeTagToken) {
        return [];
      }
      if (openTagToken.image === closeTagToken.image) {
        return [];
      } else {
        return [
          {
            msg: `tags mismatch: "${openTagToken.image}" must match closing tag: "${closeTagToken.image}"`,
            node: elem,
            severity: "error",
            position: {
              startOffset: openTagToken.startOffset,
              endOffset: openTagToken.endOffset
            }
          },
          {
            msg: `tags mismatch: "${closeTagToken.image}" must match opening tag: "${openTagToken.image}"`,
            node: elem,
            severity: "error",
            position: {
              startOffset: closeTagToken.startOffset,
              endOffset: closeTagToken.endOffset
            }
          }
        ];
      }
    }
    tagClosingNameMatch = {
      validateTagClosingNameMatch
    };
    return tagClosingNameMatch;
  }
  var api$1;
  var hasRequiredApi$1;
  function requireApi$1() {
    if (hasRequiredApi$1) return api$1;
    hasRequiredApi$1 = 1;
    const { validate } = requireApi$2();
    const {
      validateUniqueAttributeKeys
    } = requireUniqueAttributeKeys();
    const {
      validateTagClosingNameMatch
    } = requireTagClosingNameMatch();
    function checkConstraints(ast) {
      const constraintIssues = validate({
        doc: ast,
        validators: {
          element: [validateTagClosingNameMatch, validateUniqueAttributeKeys]
        }
      });
      return constraintIssues;
    }
    api$1 = {
      checkConstraints
    };
    return api$1;
  }
  var apiExports$2 = requireApi$1();
  var utils;
  var hasRequiredUtils;
  function requireUtils() {
    if (hasRequiredUtils) return utils;
    hasRequiredUtils = 1;
    const { pick: pick2 } = requireLodash();
    function tokenToOffsetPosition(token) {
      return pick2(token, ["startOffset", "endOffset"]);
    }
    utils = {
      tokenToOffsetPosition
    };
    return utils;
  }
  var attributeValue$1;
  var hasRequiredAttributeValue$1;
  function requireAttributeValue$1() {
    if (hasRequiredAttributeValue$1) return attributeValue$1;
    hasRequiredAttributeValue$1 = 1;
    const { isRegExp: isRegExp2, isArray: isArray2, includes, has: has2 } = requireLodash();
    const { tokenToOffsetPosition } = requireUtils();
    function validateAttributeValue(attributeNode, xssAttribute) {
      const issues = [];
      const valueDef = xssAttribute.value;
      if (has2(xssAttribute, "value") === false) {
        return issues;
      }
      const actualValue = attributeNode.value;
      if (actualValue === null) {
        return issues;
      }
      const errPosition = tokenToOffsetPosition(attributeNode.syntax.value);
      if (isRegExp2(valueDef)) {
        if (valueDef.test(actualValue) === false) {
          issues.push({
            msg: `Expecting Value matching <${valueDef.toString()}> but found <${actualValue}>`,
            node: attributeNode,
            severity: "error",
            position: errPosition
          });
        }
      } else if (isArray2(valueDef)) {
        if (includes(valueDef, actualValue) === false) {
          issues.push({
            msg: `Expecting one of <${valueDef.toString()}> but found <${actualValue}>`,
            node: attributeNode,
            severity: "error",
            position: errPosition
          });
        }
      } else {
        throw Error("None Exhaustive Match");
      }
      return issues;
    }
    attributeValue$1 = {
      validateAttributeValue
    };
    return attributeValue$1;
  }
  var duplicateSubElements;
  var hasRequiredDuplicateSubElements;
  function requireDuplicateSubElements() {
    if (hasRequiredDuplicateSubElements) return duplicateSubElements;
    hasRequiredDuplicateSubElements = 1;
    const { map: map2, forEach: forEach2, includes, filter: filter2, groupBy: groupBy2 } = requireLodash();
    const { tokenToOffsetPosition } = requireUtils();
    function validateDuplicateSubElements(elem, schema) {
      const allowedDupElem = filter2(
        schema.elements,
        (_) => _.cardinality === "many"
      );
      const allowedDupElemNames = map2(allowedDupElem, (_) => _.name);
      const actualSubElemByName = groupBy2(elem.subElements, (_) => _.name);
      const issues = [];
      forEach2(actualSubElemByName, (dupElements, dupElementsName) => {
        const allowedDup = includes(allowedDupElemNames, dupElementsName);
        const hasConfiguration = schema.elements[dupElementsName] !== void 0;
        const hasDuplicates = dupElements.length > 1;
        if (allowedDup === false && hasDuplicates && hasConfiguration) {
          forEach2(dupElements, (dupElem) => {
            issues.push({
              msg: `Duplicate Sub-Element: <${dupElem.name}> only a single occurrence of this Sub-Element is allowed here.`,
              node: dupElem,
              severity: "error",
              // safe assumption that we have an `openName` (see above condition)
              position: tokenToOffsetPosition(dupElem.syntax.openName)
            });
          });
        }
      });
      return issues;
    }
    duplicateSubElements = {
      validateDuplicateSubElements
    };
    return duplicateSubElements;
  }
  var requiredAttributes;
  var hasRequiredRequiredAttributes;
  function requireRequiredAttributes() {
    if (hasRequiredRequiredAttributes) return requiredAttributes;
    hasRequiredRequiredAttributes = 1;
    const { map: map2, filter: filter2, difference: difference2 } = requireLodash();
    const { tokenToOffsetPosition } = requireUtils();
    function validateRequiredAttributes(elem, schema) {
      const requiredAttribsDef = filter2(
        schema.attributes,
        (_) => _.required === true
      );
      const requiredAttribNames = map2(requiredAttribsDef, (_) => _.key);
      const actualAttribNames = map2(elem.attributes, (_) => _.key);
      const missingAttributesNames = difference2(
        requiredAttribNames,
        actualAttribNames
      );
      const errPosition = tokenToOffsetPosition(elem.syntax.openName);
      const issues = map2(missingAttributesNames, (_) => {
        return {
          msg: `Missing Required Attribute: <${_}>`,
          node: elem,
          severity: "error",
          position: errPosition
        };
      });
      return issues;
    }
    requiredAttributes = {
      validateRequiredAttributes
    };
    return requiredAttributes;
  }
  var requiredSubElements;
  var hasRequiredRequiredSubElements;
  function requireRequiredSubElements() {
    if (hasRequiredRequiredSubElements) return requiredSubElements;
    hasRequiredRequiredSubElements = 1;
    const { map: map2, filter: filter2, difference: difference2 } = requireLodash();
    const { tokenToOffsetPosition } = requireUtils();
    function validateRequiredSubElements(elem, schema) {
      const requiredSubElemsDef = filter2(
        schema.elements,
        (_) => _.required === true
      );
      const requiredElemNames = map2(requiredSubElemsDef, (_) => _.name);
      const actualSubElemNameNames = map2(elem.subElements, (_) => _.name);
      const missingSubElemNames = difference2(
        requiredElemNames,
        actualSubElemNameNames
      );
      const errPosition = tokenToOffsetPosition(elem.syntax.openName);
      const issues = map2(missingSubElemNames, (_) => {
        return {
          msg: `Missing Required Sub-Element: <${_}>`,
          node: elem,
          severity: "error",
          position: errPosition
        };
      });
      return issues;
    }
    requiredSubElements = {
      validateRequiredSubElements
    };
    return requiredSubElements;
  }
  var unknownAttributes;
  var hasRequiredUnknownAttributes;
  function requireUnknownAttributes() {
    if (hasRequiredUnknownAttributes) return unknownAttributes;
    hasRequiredUnknownAttributes = 1;
    const { map: map2, includes, forEach: forEach2 } = requireLodash();
    const { isXMLNamespaceKey } = requireApi$4();
    const { tokenToOffsetPosition } = requireUtils();
    function validateUnknownAttributes(elem, schema) {
      if (schema.attributesType !== "closed") {
        return [];
      }
      const allowedAttribNames = map2(schema.attributes, (_) => _.key);
      const issues = [];
      forEach2(elem.attributes, (attrib) => {
        if (attrib.key !== null) {
          if (includes(allowedAttribNames, attrib.key) === false && isXMLNamespaceKey({ key: attrib.key, includeEmptyPrefix: true }) === false) {
            issues.push({
              msg: `Unknown Attribute: <${attrib.key}> only [${allowedAttribNames.toString()}] attributes are allowed`,
              node: attrib,
              severity: "error",
              // safe assumption that we have a `key` token (see above condition)
              position: tokenToOffsetPosition(attrib.syntax.key)
            });
          }
        }
      });
      return issues;
    }
    unknownAttributes = {
      validateUnknownAttributes
    };
    return unknownAttributes;
  }
  var unknownSubElements;
  var hasRequiredUnknownSubElements;
  function requireUnknownSubElements() {
    if (hasRequiredUnknownSubElements) return unknownSubElements;
    hasRequiredUnknownSubElements = 1;
    const { map: map2, forEach: forEach2, includes } = requireLodash();
    const { tokenToOffsetPosition } = requireUtils();
    function validateUnknownSubElements(elem, schema) {
      if (schema.elementsType !== "closed") {
        return [];
      }
      const allowedElemNames = map2(schema.elements, (_) => _.name);
      const issues = [];
      forEach2(elem.subElements, (subElem) => {
        if (subElem.name !== null) {
          if (includes(allowedElemNames, subElem.name) === false) {
            issues.push({
              msg: `Unknown Sub-Element: <${subElem.name}> only [${allowedElemNames.toString()}] Sub-Elements are allowed`,
              node: subElem,
              severity: "error",
              // safe assumption that we have an `openName` (see above condition)
              position: tokenToOffsetPosition(subElem.syntax.openName)
            });
          }
        }
      });
      return issues;
    }
    unknownSubElements = {
      validateUnknownSubElements
    };
    return unknownSubElements;
  }
  var path;
  var hasRequiredPath;
  function requirePath() {
    if (hasRequiredPath) return path;
    hasRequiredPath = 1;
    const { drop: drop2, map: map2, forEach: forEach2, first: first2 } = requireLodash();
    function findAttributeXssDef(attribNode, schema) {
      const xssElement = findElementXssDef(attribNode.parent, schema);
      let xssAttribute = void 0;
      if (xssElement !== void 0) {
        const attributeName2 = attribNode.key;
        xssAttribute = xssElement.attributes[attributeName2];
      }
      return xssAttribute;
    }
    function findElementXssDef(node, schema) {
      const ancestors = getAstNodeAncestors(node);
      const elementsPath = map2(ancestors, "name");
      const rootElement = first2(elementsPath);
      if (rootElement !== schema.name) {
        return void 0;
      }
      let xssElement = schema;
      forEach2(drop2(elementsPath), (elemName) => {
        xssElement = xssElement.elements[elemName];
        if (xssElement === void 0) {
          return false;
        }
      });
      return xssElement;
    }
    function getAstNodeAncestors(node) {
      const ancestors = [];
      ancestors.push(node);
      let currAncestor = node.parent;
      while (currAncestor !== void 0 && // The Simple Schema only starts at the root Element (not the Root Document).
      currAncestor.type !== "XMLDocument") {
        ancestors.push(currAncestor);
        currAncestor = currAncestor.parent;
      }
      ancestors.reverse();
      return ancestors;
    }
    path = {
      findAttributeXssDef,
      findElementXssDef
    };
    return path;
  }
  var getValidators;
  var hasRequiredGetValidators;
  function requireGetValidators() {
    if (hasRequiredGetValidators) return getValidators;
    hasRequiredGetValidators = 1;
    const { validateAttributeValue } = requireAttributeValue$1();
    const {
      validateDuplicateSubElements
    } = requireDuplicateSubElements();
    const {
      validateRequiredAttributes
    } = requireRequiredAttributes();
    const {
      validateRequiredSubElements
    } = requireRequiredSubElements();
    const {
      validateUnknownAttributes
    } = requireUnknownAttributes();
    const {
      validateUnknownSubElements
    } = requireUnknownSubElements();
    const { findAttributeXssDef, findElementXssDef } = requirePath();
    function getSchemaValidators(schema) {
      const attributeValidator = buildAttributeValidator(schema);
      const elementValidator = buildElementValidator(schema);
      return {
        attribute: attributeValidator,
        element: elementValidator
      };
    }
    function buildAttributeValidator(schema) {
      return (attributeNode) => {
        let issues = [];
        const xssAttributeDef = findAttributeXssDef(attributeNode, schema);
        if (xssAttributeDef !== void 0) {
          const attributeValueIssues = validateAttributeValue(
            attributeNode,
            xssAttributeDef
          );
          issues = issues.concat(attributeValueIssues);
        }
        return issues;
      };
    }
    function buildElementValidator(schema) {
      return (elementNode) => {
        let issues = [];
        const xssElementDef = findElementXssDef(elementNode, schema);
        if (xssElementDef !== void 0) {
          const duplicateElementsIssues = validateDuplicateSubElements(
            elementNode,
            xssElementDef
          );
          const requiredAttributesIssues = validateRequiredAttributes(
            elementNode,
            xssElementDef
          );
          const requiredSubElementsIssues = validateRequiredSubElements(
            elementNode,
            xssElementDef
          );
          const unknownAttributesIssues = validateUnknownAttributes(
            elementNode,
            xssElementDef
          );
          const unknownSubElementsIssues = validateUnknownSubElements(
            elementNode,
            xssElementDef
          );
          issues = issues.concat(
            duplicateElementsIssues,
            requiredAttributesIssues,
            requiredSubElementsIssues,
            unknownAttributesIssues,
            unknownSubElementsIssues
          );
        }
        return issues;
      };
    }
    getValidators = {
      getSchemaValidators
    };
    return getValidators;
  }
  var attributeName;
  var hasRequiredAttributeName;
  function requireAttributeName() {
    if (hasRequiredAttributeName) return attributeName;
    hasRequiredAttributeName = 1;
    const { difference: difference2, map: map2 } = requireLodash();
    function attributeNameCompletion(elementNode, xssElement) {
      const possibleSuggestions = map2(xssElement.attributes, (_) => _.key);
      const existingAttribNames = map2(elementNode.attributes, (_) => _.key);
      const possibleNewSuggestions = difference2(
        possibleSuggestions,
        existingAttribNames
      );
      const suggestions = map2(possibleNewSuggestions, (_) => {
        return {
          text: _,
          label: _,
          commitCharacter: "="
        };
      });
      return suggestions;
    }
    attributeName = {
      attributeNameCompletion
    };
    return attributeName;
  }
  var attributeValue;
  var hasRequiredAttributeValue;
  function requireAttributeValue() {
    if (hasRequiredAttributeValue) return attributeValue;
    hasRequiredAttributeValue = 1;
    const { has: has2, isRegExp: isRegExp2, forEach: forEach2, isArray: isArray2 } = requireLodash();
    function attributeValueCompletion(attributeNode, xssAttribute, prefix = "") {
      if (has2(xssAttribute, "value") === false) {
        return [];
      }
      const suggestions = [];
      const valueDef = xssAttribute.value;
      if (isRegExp2(valueDef)) ;
      else if (isArray2(valueDef)) {
        forEach2(valueDef, (enumVal) => {
          if (enumVal.startsWith(prefix)) {
            suggestions.push({
              text: enumVal.substring(prefix.length),
              label: enumVal
            });
          }
        });
      } else {
        throw Error("None Exhaustive Match");
      }
      return suggestions;
    }
    attributeValue = {
      attributeValueCompletion
    };
    return attributeValue;
  }
  var elementName;
  var hasRequiredElementName;
  function requireElementName() {
    if (hasRequiredElementName) return elementName;
    hasRequiredElementName = 1;
    const { difference: difference2, map: map2, filter: filter2, has: has2, pickBy } = requireLodash();
    const { DEFAULT_NS } = requireApi$3();
    const NAMESPACE_PATTERN = /^(?:([^:]*):)?([^:]*)$/;
    function elementNameCompletion(elementNode, xssElement, prefix = "") {
      const match = prefix.match(NAMESPACE_PATTERN);
      if (match === null) {
        return [];
      }
      const namespacePrefix = match[1] ? match[1] : DEFAULT_NS;
      const elementNamespaceUri = elementNode.namespaces[namespacePrefix];
      const possibleElements = filter2(
        xssElement.elements,
        (_) => has2(_, "namespace") === false || _.namespace && _.namespace === elementNamespaceUri
      );
      const possibleSuggestionsWithoutExistingSingular = applicableElements(
        xssElement.elements,
        elementNode.subElements,
        possibleElements
      );
      const suggestions = map2(possibleSuggestionsWithoutExistingSingular, (_) => {
        return {
          text: _,
          label: _
        };
      });
      if (namespacePrefix === void 0 || namespacePrefix === DEFAULT_NS) {
        const namespacesWithoutDefault = pickBy(
          elementNode.namespaces,
          (uri, prefix2) => prefix2 !== DEFAULT_NS
        );
        const applicableNamespaces = pickBy(namespacesWithoutDefault, (uri) => {
          const possibleElements2 = filter2(
            xssElement.elements,
            (element) => has2(element, "namespace") === true && element.namespace === uri
          );
          const possibleSuggestionsWithoutExistingSingular2 = applicableElements(
            xssElement.elements,
            elementNode.subElements,
            possibleElements2
          );
          const namespaceHasApplicableElements = possibleSuggestionsWithoutExistingSingular2.length > 0;
          return namespaceHasApplicableElements;
        });
        const namespaceSuggestions = map2(applicableNamespaces, (uri, prefix2) => ({
          text: prefix2,
          label: prefix2,
          commitCharacter: ":",
          isNamespace: true
        }));
        return [...namespaceSuggestions, ...suggestions];
      }
      return suggestions;
    }
    function applicableElements(xssElements, subElements, possibleElements) {
      const allPossibleSuggestions = map2(
        possibleElements,
        (element) => element.name
      );
      const notSingularElem = filter2(
        xssElements,
        (element) => element.cardinality === "many"
      );
      const notSingularElemNames = map2(notSingularElem, (element) => element.name);
      const existingElemNames = map2(subElements, (element) => element.name);
      const existingSingular = difference2(existingElemNames, notSingularElemNames);
      const possibleSuggestionsWithoutExistingSingular = difference2(
        allPossibleSuggestions,
        existingSingular
      );
      return possibleSuggestionsWithoutExistingSingular;
    }
    elementName = {
      elementNameCompletion
    };
    return elementName;
  }
  var getContentAssist;
  var hasRequiredGetContentAssist;
  function requireGetContentAssist() {
    if (hasRequiredGetContentAssist) return getContentAssist;
    hasRequiredGetContentAssist = 1;
    const { attributeNameCompletion } = requireAttributeName();
    const {
      attributeValueCompletion
    } = requireAttributeValue();
    const { elementNameCompletion } = requireElementName();
    const { findElementXssDef, findAttributeXssDef } = requirePath();
    function getSchemaSuggestionsProviders(schema) {
      const attributeNameProvider = buildAttributeNameProvider(schema);
      const attributeValueProvider = buildAttributeValueProvider(schema);
      const elementNameProvider = buildElementNameProvider(schema);
      return {
        schemaElementNameCompletion: elementNameProvider,
        schemaAttributeNameCompletion: attributeNameProvider,
        schemaAttributeValueCompletion: attributeValueProvider
      };
    }
    function buildAttributeNameProvider(schema) {
      return ({ element, prefix }) => {
        const xssElementDef = findElementXssDef(element, schema);
        if (xssElementDef !== void 0) {
          return attributeNameCompletion(element, xssElementDef, prefix);
        } else {
          return [];
        }
      };
    }
    function buildElementNameProvider(schema) {
      return ({ element, prefix }) => {
        const xssElementDef = findElementXssDef(element.parent, schema);
        if (xssElementDef !== void 0) {
          return elementNameCompletion(element.parent, xssElementDef, prefix);
        } else {
          return [];
        }
      };
    }
    function buildAttributeValueProvider(schema) {
      return ({ attribute, prefix }) => {
        const attributeXssDef = findAttributeXssDef(attribute, schema);
        return attributeValueCompletion(attribute, attributeXssDef, prefix);
      };
    }
    getContentAssist = {
      getSchemaSuggestionsProviders
    };
    return getContentAssist;
  }
  var api;
  var hasRequiredApi;
  function requireApi() {
    if (hasRequiredApi) return api;
    hasRequiredApi = 1;
    const { getSchemaValidators } = requireGetValidators();
    const { getSchemaSuggestionsProviders } = requireGetContentAssist();
    api = {
      getSchemaValidators,
      getSchemaSuggestionsProviders
    };
    return api;
  }
  var apiExports$1 = requireApi();
  var apiExports = requireApi$2();
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
  function lexingErrorsToDiagnostic(errors, document, filterErrors) {
    return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore).map((el) => {
      return {
        message: el.message,
        range: mainExports.Range.create(
          document.positionAt(el.offset),
          document.positionAt(el.offset + el.length)
        ),
        severity: determineDiagnosticSeverity(el.message, filterErrors, el.severity)
      };
    });
  }
  function parsingErrorsToDiagnostic(errors, document, filterErrors) {
    return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore).map((el) => {
      var _a;
      return {
        message: el.message,
        range: mainExports.Range.create(
          document.positionAt(el.token.startOffset),
          document.positionAt((_a = el.token.endOffset) != null ? _a : 0)
        ),
        severity: determineDiagnosticSeverity(el.message, filterErrors, el.severity)
      };
    });
  }
  function issuesToDiagnostic(errors, document, filterErrors) {
    return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore, "msg").map((el) => {
      return {
        message: el.msg,
        range: {
          start: document.positionAt(el.position.startOffset),
          // Chevrotain Token positions are non-inclusive for endOffsets
          end: document.positionAt(el.position.endOffset + 1)
        },
        severity: determineDiagnosticSeverity(el.msg, filterErrors, el.severity)
      };
    });
  }
  function toDiagnosticSeverity(issueSeverity) {
    if (!issueSeverity)
      return mainExports.DiagnosticSeverity.Error;
    switch (issueSeverity) {
      case "error":
        return mainExports.DiagnosticSeverity.Error;
      case "warning":
        return mainExports.DiagnosticSeverity.Warning;
      case "info":
      default:
        return mainExports.DiagnosticSeverity.Information;
    }
  }
  function determineDiagnosticSeverity(message, filterErrors, issueSeverity) {
    let severity;
    if (checkValueAgainstRegexpArray(message, filterErrors.errorMessagesToTreatAsWarning)) {
      severity = mainExports.DiagnosticSeverity.Warning;
    } else if (checkValueAgainstRegexpArray(message, filterErrors.errorMessagesToTreatAsInfo)) {
      severity = mainExports.DiagnosticSeverity.Information;
    } else {
      severity = toDiagnosticSeverity(issueSeverity);
    }
    return severity;
  }
  class XmlService extends BaseService {
    constructor(mode) {
      super(mode);
      this.schemas = {};
      this.serviceCapabilities = {
        diagnosticProvider: {
          interFileDependencies: true,
          workspaceDiagnostics: true
        }
      };
    }
    addDocument(document) {
      super.addDocument(document);
      this.$configureService(document.uri);
    }
    $getXmlSchemaUri(sessionID) {
      return this.getOption(sessionID, "schemaUri");
    }
    $configureService(sessionID) {
      let schemas = this.getOption(sessionID, "schemas");
      schemas == null ? void 0 : schemas.forEach((el) => {
        var _a, _b;
        if (el.uri === this.$getXmlSchemaUri(sessionID)) {
          (_a = el.fileMatch) != null ? _a : el.fileMatch = [];
          el.fileMatch.push(sessionID);
        }
        let schema = (_b = el.schema) != null ? _b : this.schemas[el.uri];
        if (schema)
          this.schemas[el.uri] = schema;
        el.schema = void 0;
      });
    }
    $getSchema(sessionId) {
      let schemaId = this.$getXmlSchemaUri(sessionId);
      if (schemaId && this.schemas[schemaId]) {
        return JSON.parse(this.schemas[schemaId]);
      }
    }
    async doValidation(document) {
      let fullDocument = this.getDocument(document.uri);
      if (!fullDocument)
        return [];
      const { cst, tokenVector, lexErrors, parseErrors } = apiExports$4.parse(
        fullDocument.getText()
      );
      const xmlDoc = apiExports$3.buildAst(cst, tokenVector);
      const constraintsIssues = apiExports$2.checkConstraints(xmlDoc);
      let schema = this.$getSchema(document.uri);
      let schemaIssues = [];
      if (schema) {
        const schemaValidators = apiExports$1.getSchemaValidators(schema);
        schemaIssues = apiExports.validate({
          doc: xmlDoc,
          validators: {
            attribute: [schemaValidators.attribute],
            element: [schemaValidators.element]
          }
        });
      }
      return [
        ...lexingErrorsToDiagnostic(lexErrors, fullDocument, this.optionsToFilterDiagnostics),
        ...parsingErrorsToDiagnostic(parseErrors, fullDocument, this.optionsToFilterDiagnostics),
        ...issuesToDiagnostic(constraintsIssues, fullDocument, this.optionsToFilterDiagnostics),
        ...issuesToDiagnostic(schemaIssues, fullDocument, this.optionsToFilterDiagnostics)
      ];
    }
  }
  exports2.XmlService = XmlService;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
