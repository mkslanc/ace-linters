"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[831],{

/***/ 831:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldState": () => (/* binding */ WorldState),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initThreadPool": () => (/* binding */ initThreadPool),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "wbg_rayon_PoolBuilder": () => (/* binding */ wbg_rayon_PoolBuilder),
/* harmony export */   "wbg_rayon_start_worker": () => (/* binding */ wbg_rayon_start_worker)
/* harmony export */ });
/* harmony import */ var _snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64232);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self1 = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self1, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}

var wasm;
var heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
function getObject(idx) {
    return heap[idx];
}
var heap_next = heap.length;
function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}
function takeObject(idx) {
    var ret = getObject(idx);
    dropObject(idx);
    return ret;
}
var cachedTextDecoder = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}
function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    var idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}
function debugString(val) {
    // primitive types
    var type = typeof val === "undefined" ? "undefined" : _type_of(val);
    if (type == "number" || type == "boolean" || val == null) {
        return "".concat(val);
    }
    if (type == "string") {
        return '"'.concat(val, '"');
    }
    if (type == "symbol") {
        var description = val.description;
        if (description == null) {
            return "Symbol";
        } else {
            return "Symbol(".concat(description, ")");
        }
    }
    if (type == "function") {
        var name = val.name;
        if (typeof name == "string" && name.length > 0) {
            return "Function(".concat(name, ")");
        } else {
            return "Function";
        }
    }
    // objects
    if (Array.isArray(val)) {
        var length = val.length;
        var debug = "[";
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(var i = 1; i < length; i++){
            debug += ", " + debugString(val[i]);
        }
        debug += "]";
        return debug;
    }
    // Test for built-in
    var builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    var className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == "Object") {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return "Object(" + JSON.stringify(val) + ")";
        } catch (_) {
            return "Object";
        }
    }
    // errors
    if (_instanceof(val, Error)) {
        return "".concat(val.name, ": ").concat(val.message, "\n").concat(val.stack);
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder("utf-8");
var encodeString = function encodeString(arg, view) {
    var buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        var buf = cachedTextEncoder.encode(arg);
        var ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    var len = arg.length;
    var ptr1 = malloc(len);
    var mem = getUint8Memory0();
    var offset = 0;
    for(; offset < len; offset++){
        var code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr1 + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr1 = realloc(ptr1, len, len = offset + arg.length * 3);
        var view = getUint8Memory0().subarray(ptr1 + offset, ptr1 + len);
        var ret = encodeString(arg, view);
        offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr1;
}
var cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/ function start() {
    wasm.start();
}
function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
* @param {number} num_threads
* @returns {Promise<any>}
*/ function initThreadPool(num_threads) {
    var ret = wasm.initThreadPool(num_threads);
    return takeObject(ret);
}
/**
* @param {number} receiver
*/ function wbg_rayon_start_worker(receiver) {
    wasm.wbg_rayon_start_worker(receiver);
}
/**
*/ var WorldState = /*#__PURE__*/ function() {
    "use strict";
    function WorldState() {
        _class_call_check(this, WorldState);
        var ret = wasm.worldstate_new();
        return WorldState.__wrap(ret);
    }
    _create_class(WorldState, [
        {
            key: "__destroy_into_raw",
            value: function __destroy_into_raw() {
                var ptr = this.ptr;
                this.ptr = 0;
                return ptr;
            }
        },
        {
            key: "free",
            value: function free() {
                var ptr = this.__destroy_into_raw();
                wasm.__wbg_worldstate_free(ptr);
            }
        },
        {
            /**
    * @param {string} code
    * @param {string} fake_std
    * @param {string} fake_core
    * @param {string} fake_alloc
    */ key: "init",
            value: function init(code, fake_std, fake_core, fake_alloc) {
                var ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len0 = WASM_VECTOR_LEN;
                var ptr1 = passStringToWasm0(fake_std, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len1 = WASM_VECTOR_LEN;
                var ptr2 = passStringToWasm0(fake_core, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len2 = WASM_VECTOR_LEN;
                var ptr3 = passStringToWasm0(fake_alloc, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len3 = WASM_VECTOR_LEN;
                wasm.worldstate_init(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
            }
        },
        {
            /**
    * @param {string} code
    * @returns {any}
    */ key: "update",
            value: function update(code) {
                var ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len0 = WASM_VECTOR_LEN;
                var ret = wasm.worldstate_update(this.ptr, ptr0, len0);
                return takeObject(ret);
            }
        },
        {
            /**
    * @returns {any}
    */ key: "inlay_hints",
            value: function inlay_hints() {
                var ret = wasm.worldstate_inlay_hints(this.ptr);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "completions",
            value: function completions(line_number, column) {
                var ret = wasm.worldstate_completions(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "hover",
            value: function hover(line_number, column) {
                var ret = wasm.worldstate_hover(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @returns {any}
    */ key: "code_lenses",
            value: function code_lenses() {
                var ret = wasm.worldstate_code_lenses(this.ptr);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @param {boolean} include_declaration
    * @returns {any}
    */ key: "references",
            value: function references(line_number, column, include_declaration) {
                var ret = wasm.worldstate_references(this.ptr, line_number, column, include_declaration);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "prepare_rename",
            value: function prepare_rename(line_number, column) {
                var ret = wasm.worldstate_prepare_rename(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @param {string} new_name
    * @returns {any}
    */ key: "rename",
            value: function rename(line_number, column, new_name) {
                var ptr0 = passStringToWasm0(new_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len0 = WASM_VECTOR_LEN;
                var ret = wasm.worldstate_rename(this.ptr, line_number, column, ptr0, len0);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "signature_help",
            value: function signature_help(line_number, column) {
                var ret = wasm.worldstate_signature_help(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "definition",
            value: function definition(line_number, column) {
                var ret = wasm.worldstate_definition(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "type_definition",
            value: function type_definition(line_number, column) {
                var ret = wasm.worldstate_type_definition(this.ptr, line_number, column);
                return takeObject(ret);
            }
        },
        {
            /**
    * @returns {any}
    */ key: "document_symbols",
            value: function document_symbols() {
                var ret = wasm.worldstate_document_symbols(this.ptr);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @param {string} ch
    * @returns {any}
    */ key: "type_formatting",
            value: function type_formatting(line_number, column, ch) {
                var ret = wasm.worldstate_type_formatting(this.ptr, line_number, column, ch.codePointAt(0));
                return takeObject(ret);
            }
        },
        {
            /**
    * @returns {any}
    */ key: "folding_ranges",
            value: function folding_ranges() {
                var ret = wasm.worldstate_folding_ranges(this.ptr);
                return takeObject(ret);
            }
        },
        {
            /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ key: "goto_implementation",
            value: function goto_implementation(line_number, column) {
                var ret = wasm.worldstate_goto_implementation(this.ptr, line_number, column);
                return takeObject(ret);
            }
        }
    ], [
        {
            key: "__wrap",
            value: function __wrap(ptr) {
                var obj = Object.create(WorldState.prototype);
                obj.ptr = ptr;
                return obj;
            }
        }
    ]);
    return WorldState;
}();
/**
*/ var wbg_rayon_PoolBuilder = /*#__PURE__*/ function() {
    "use strict";
    function wbg_rayon_PoolBuilder() {
        _class_call_check(this, wbg_rayon_PoolBuilder);
    }
    _create_class(wbg_rayon_PoolBuilder, [
        {
            key: "__destroy_into_raw",
            value: function __destroy_into_raw() {
                var ptr = this.ptr;
                this.ptr = 0;
                return ptr;
            }
        },
        {
            key: "free",
            value: function free() {
                var ptr = this.__destroy_into_raw();
                wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
            }
        },
        {
            /**
    * @returns {number}
    */ key: "numThreads",
            value: function numThreads() {
                var ret = wasm.wbg_rayon_poolbuilder_numThreads(this.ptr);
                return ret >>> 0;
            }
        },
        {
            /**
    * @returns {number}
    */ key: "receiver",
            value: function receiver() {
                var ret = wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
                return ret;
            }
        },
        {
            /**
    */ key: "build",
            value: function build() {
                wasm.wbg_rayon_poolbuilder_build(this.ptr);
            }
        }
    ], [
        {
            key: "__wrap",
            value: function __wrap(ptr) {
                var obj = Object.create(wbg_rayon_PoolBuilder.prototype);
                obj.ptr = ptr;
                return obj;
            }
        }
    ]);
    return wbg_rayon_PoolBuilder;
}();
function load(module, imports) {
    return _load.apply(this, arguments);
}
function _load() {
    _load = _async_to_generator(function(module, imports) {
        var e, bytes, instance;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(typeof Response === "function" && _instanceof(module, Response))) return [
                        3,
                        7
                    ];
                    if (!(typeof WebAssembly.instantiateStreaming === "function")) return [
                        3,
                        4
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        WebAssembly.instantiateStreaming(module, imports)
                    ];
                case 2:
                    return [
                        2,
                        _state.sent()
                    ];
                case 3:
                    e = _state.sent();
                    if (module.headers.get("Content-Type") != "application/wasm") {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                    } else {
                        throw e;
                    }
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        4,
                        module.arrayBuffer()
                    ];
                case 5:
                    bytes = _state.sent();
                    return [
                        4,
                        WebAssembly.instantiate(bytes, imports)
                    ];
                case 6:
                    return [
                        2,
                        _state.sent()
                    ];
                case 7:
                    return [
                        4,
                        WebAssembly.instantiate(module, imports)
                    ];
                case 8:
                    instance = _state.sent();
                    if (_instanceof(instance, WebAssembly.Instance)) {
                        return [
                            2,
                            {
                                instance: instance,
                                module: module
                            }
                        ];
                    } else {
                        return [
                            2,
                            instance
                        ];
                    }
                    _state.label = 9;
                case 9:
                    return [
                        2
                    ];
            }
        });
    });
    return _load.apply(this, arguments);
}
function init(input, maybe_memory) {
    return _init.apply(this, arguments);
}
function _init() {
    _init = _async_to_generator(function(input, maybe_memory) {
        var imports, _ref, instance, module;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (typeof input === "undefined") {
                        input = new URL(/* asset import */ __webpack_require__(48991), __webpack_require__.b);
                    }
                    imports = {};
                    imports.wbg = {};
                    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
                        takeObject(arg0);
                    };
                    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
                        var ret = getStringFromWasm0(arg0, arg1);
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
                        var ret = getObject(arg0);
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbg_new_68adb0d58759a4ed = function() {
                        var ret = new Object();
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbindgen_number_new = function(arg0) {
                        var ret = arg0;
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbindgen_is_undefined = function(arg0) {
                        var ret = getObject(arg0) === undefined;
                        return ret;
                    };
                    imports.wbg.__wbg_set_2e79e744454afade = function(arg0, arg1, arg2) {
                        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
                    };
                    imports.wbg.__wbg_new_693216e109162396 = function() {
                        var ret = new Error();
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbg_stack_0ddaca5d1abfb52f = function(arg0, arg1) {
                        var ret = getObject(arg1).stack;
                        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                        var len0 = WASM_VECTOR_LEN;
                        getInt32Memory0()[arg0 / 4 + 1] = len0;
                        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                    };
                    imports.wbg.__wbg_error_09919627ac0992f5 = function(arg0, arg1) {
                        try {
                            console.error(getStringFromWasm0(arg0, arg1));
                        } finally{
                            wasm.__wbindgen_free(arg0, arg1);
                        }
                    };
                    imports.wbg.__wbg_now_559193109055ebad = function(arg0) {
                        var ret = getObject(arg0).now();
                        return ret;
                    };
                    imports.wbg.__wbg_new_949bbc1147195c4e = function() {
                        var ret = new Array();
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbg_newnoargs_be86524d73f67598 = function(arg0, arg1) {
                        var ret = new Function(getStringFromWasm0(arg0, arg1));
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbg_get_4d0f21c2f823742e = function() {
                        return handleError(function(arg0, arg1) {
                            var ret = Reflect.get(getObject(arg0), getObject(arg1));
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_call_888d259a5fefc347 = function() {
                        return handleError(function(arg0, arg1) {
                            var ret = getObject(arg0).call(getObject(arg1));
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_self_c6fbdfc2918d5e58 = function() {
                        return handleError(function() {
                            var ret = self.self;
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_window_baec038b5ab35c54 = function() {
                        return handleError(function() {
                            var ret = window.window;
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_globalThis_3f735a5746d41fbd = function() {
                        return handleError(function() {
                            var ret = globalThis.globalThis;
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_global_1bc0b39582740e95 = function() {
                        return handleError(function() {
                            var ret = __webpack_require__.g.global;
                            return addHeapObject(ret);
                        }, arguments);
                    };
                    imports.wbg.__wbg_push_284486ca27c6aa8b = function(arg0, arg1) {
                        var ret = getObject(arg0).push(getObject(arg1));
                        return ret;
                    };
                    imports.wbg.__wbg_new_342a24ca698edd87 = function(arg0, arg1) {
                        var ret = new Error(getStringFromWasm0(arg0, arg1));
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
                        var ret = debugString(getObject(arg1));
                        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                        var len0 = WASM_VECTOR_LEN;
                        getInt32Memory0()[arg0 / 4 + 1] = len0;
                        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                    };
                    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
                        throw new Error(getStringFromWasm0(arg0, arg1));
                    };
                    imports.wbg.__wbindgen_module = function() {
                        var ret = init.__wbindgen_wasm_module;
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbindgen_memory = function() {
                        var ret = wasm.memory;
                        return addHeapObject(ret);
                    };
                    imports.wbg.__wbg_startWorkers_04f63eca19916b8f = function(arg0, arg1, arg2) {
                        var ret = (0,_snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__/* .startWorkers */ .Q)(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
                        return addHeapObject(ret);
                    };
                    if (typeof input === "string" || typeof Request === "function" && _instanceof(input, Request) || typeof URL === "function" && _instanceof(input, URL)) {
                        input = fetch(input);
                    }
                    imports.wbg.memory = maybe_memory || new WebAssembly.Memory({
                        initial: 35,
                        maximum: 16384,
                        shared: true
                    });
                    return [
                        4,
                        input
                    ];
                case 1:
                    return [
                        4,
                        load.apply(void 0, [
                            _state.sent(),
                            imports
                        ])
                    ];
                case 2:
                    _ref = _state.sent(), instance = _ref.instance, module = _ref.module;
                    wasm = instance.exports;
                    init.__wbindgen_wasm_module = module;
                    wasm.__wbindgen_start();
                    return [
                        2,
                        wasm
                    ];
            }
        });
    });
    return _init.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);


/***/ }),

/***/ 48991:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ea9a9febd6c8fd542e30.wasm";

/***/ })

}]);
//# sourceMappingURL=bundle.831.js.map