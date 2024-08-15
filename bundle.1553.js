"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1553],{

/***/ 81553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorldState: () => (/* binding */ WorldState),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initThreadPool: () => (/* binding */ initThreadPool),
/* harmony export */   start: () => (/* binding */ start),
/* harmony export */   wbg_rayon_PoolBuilder: () => (/* binding */ wbg_rayon_PoolBuilder),
/* harmony export */   wbg_rayon_start_worker: () => (/* binding */ wbg_rayon_start_worker)
/* harmony export */ });
/* harmony import */ var _snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49445);

let wasm;
const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
function getObject(idx) {
    return heap[idx];
}
let heap_next = heap.length;
function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}
function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
let cachedTextDecoder = new TextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;
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
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}
function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++){
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder('utf-8');
const encodeString = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for(; offset < len; offset++){
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
let cachegetInt32Memory0 = null;
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
*/ class WorldState {
    static __wrap(ptr) {
        const obj = Object.create(WorldState.prototype);
        obj.ptr = ptr;
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_worldstate_free(ptr);
    }
    /**
    * @param {string} code
    * @param {string} fake_std
    * @param {string} fake_core
    * @param {string} fake_alloc
    */ init(code, fake_std, fake_core, fake_alloc) {
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
    /**
    * @param {string} code
    * @returns {any}
    */ update(code) {
        var ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.worldstate_update(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */ inlay_hints() {
        var ret = wasm.worldstate_inlay_hints(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ completions(line_number, column) {
        var ret = wasm.worldstate_completions(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ hover(line_number, column) {
        var ret = wasm.worldstate_hover(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */ code_lenses() {
        var ret = wasm.worldstate_code_lenses(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @param {boolean} include_declaration
    * @returns {any}
    */ references(line_number, column, include_declaration) {
        var ret = wasm.worldstate_references(this.ptr, line_number, column, include_declaration);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ prepare_rename(line_number, column) {
        var ret = wasm.worldstate_prepare_rename(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @param {string} new_name
    * @returns {any}
    */ rename(line_number, column, new_name) {
        var ptr0 = passStringToWasm0(new_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.worldstate_rename(this.ptr, line_number, column, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ signature_help(line_number, column) {
        var ret = wasm.worldstate_signature_help(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ definition(line_number, column) {
        var ret = wasm.worldstate_definition(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ type_definition(line_number, column) {
        var ret = wasm.worldstate_type_definition(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */ document_symbols() {
        var ret = wasm.worldstate_document_symbols(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @param {string} ch
    * @returns {any}
    */ type_formatting(line_number, column, ch) {
        var ret = wasm.worldstate_type_formatting(this.ptr, line_number, column, ch.codePointAt(0));
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */ folding_ranges() {
        var ret = wasm.worldstate_folding_ranges(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} line_number
    * @param {number} column
    * @returns {any}
    */ goto_implementation(line_number, column) {
        var ret = wasm.worldstate_goto_implementation(this.ptr, line_number, column);
        return takeObject(ret);
    }
    /**
    */ constructor(){
        var ret = wasm.worldstate_new();
        return WorldState.__wrap(ret);
    }
}
/**
*/ class wbg_rayon_PoolBuilder {
    static __wrap(ptr) {
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.ptr = ptr;
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
    }
    /**
    * @returns {number}
    */ numThreads() {
        var ret = wasm.wbg_rayon_poolbuilder_numThreads(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */ receiver() {
        var ret = wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
        return ret;
    }
    /**
    */ build() {
        wasm.wbg_rayon_poolbuilder_build(this.ptr);
    }
}
async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                } else {
                    throw e;
                }
            }
        }
        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);
        if (instance instanceof WebAssembly.Instance) {
            return {
                instance,
                module
            };
        } else {
            return instance;
        }
    }
}
async function init(input, maybe_memory) {
    if (typeof input === 'undefined') {
        input = new URL(/* asset import */ __webpack_require__(65011), __webpack_require__.b);
    }
    const imports = {};
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
        var ret = (0,_snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__/* .startWorkers */ .G)(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
        return addHeapObject(ret);
    };
    if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
        input = fetch(input);
    }
    imports.wbg.memory = maybe_memory || new WebAssembly.Memory({
        initial: 35,
        maximum: 16384,
        shared: true
    });
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);


/***/ }),

/***/ 65011:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ea9a9febd6c8fd542e30.wasm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8zQyxRQUFRLGNBQWNGLGlCQUFpQkUsS0FBTTtRQUNqSkYsUUFBUThDLE1BQU05QztJQUNsQjtJQUVBYixRQUFRaUIsR0FBRyxDQUFDbkosTUFBTSxHQUFHZ0osZ0JBQWdCLElBQUlaLFlBQVkwRCxNQUFNLENBQUM7UUFBQ0MsU0FBUTtRQUFHQyxTQUFRO1FBQU1DLFFBQU87SUFBSTtJQUVqRyxNQUFNLEVBQUVwRCxRQUFRLEVBQUVaLE1BQU0sRUFBRSxHQUFHLE1BQU1ELEtBQUssTUFBTWUsT0FBT2I7SUFFckR2SixPQUFPa0ssU0FBU3FELE9BQU87SUFDdkI5SCxLQUFLcUgsc0JBQXNCLEdBQUd4RDtJQUM5QnRKLEtBQUt3TixnQkFBZ0I7SUFDckIsT0FBT3hOO0FBQ1g7QUFFQSxpRUFBZXlGLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvZGVtby9ydXN0LWFuYWx5emVyL3J1c3Qtc2VydmljZS9wa2cvd2FzbV9kZW1vLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0YXJ0V29ya2VycyB9IGZyb20gJy4vc25pcHBldHMvd2FzbS1iaW5kZ2VuLXJheW9uLTdhZmE4OTlmMzY2NjU0NzMvc3JjL3dvcmtlckhlbHBlcnMuanMnO1xuXG5sZXQgd2FzbTtcblxuY29uc3QgaGVhcCA9IG5ldyBBcnJheSgzMikuZmlsbCh1bmRlZmluZWQpO1xuXG5oZWFwLnB1c2godW5kZWZpbmVkLCBudWxsLCB0cnVlLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIGdldE9iamVjdChpZHgpIHsgcmV0dXJuIGhlYXBbaWR4XTsgfVxuXG5sZXQgaGVhcF9uZXh0ID0gaGVhcC5sZW5ndGg7XG5cbmZ1bmN0aW9uIGRyb3BPYmplY3QoaWR4KSB7XG4gICAgaWYgKGlkeCA8IDM2KSByZXR1cm47XG4gICAgaGVhcFtpZHhdID0gaGVhcF9uZXh0O1xuICAgIGhlYXBfbmV4dCA9IGlkeDtcbn1cblxuZnVuY3Rpb24gdGFrZU9iamVjdChpZHgpIHtcbiAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoaWR4KTtcbiAgICBkcm9wT2JqZWN0KGlkeCk7XG4gICAgcmV0dXJuIHJldDtcbn1cblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgaWdub3JlQk9NOiB0cnVlLCBmYXRhbDogdHJ1ZSB9KTtcblxuY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKCk7XG5cbmxldCBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50OE1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDhNZW1vcnkwLmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDhNZW1vcnkwID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnkwO1xufVxuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyLCBsZW4pIHtcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5MCgpLnNsaWNlKHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmZ1bmN0aW9uIGFkZEhlYXBPYmplY3Qob2JqKSB7XG4gICAgaWYgKGhlYXBfbmV4dCA9PT0gaGVhcC5sZW5ndGgpIGhlYXAucHVzaChoZWFwLmxlbmd0aCArIDEpO1xuICAgIGNvbnN0IGlkeCA9IGhlYXBfbmV4dDtcbiAgICBoZWFwX25leHQgPSBoZWFwW2lkeF07XG5cbiAgICBoZWFwW2lkeF0gPSBvYmo7XG4gICAgcmV0dXJuIGlkeDtcbn1cblxuZnVuY3Rpb24gZGVidWdTdHJpbmcodmFsKSB7XG4gICAgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWw7XG4gICAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHwgdmFsID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICBgJHt2YWx9YDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGBcIiR7dmFsfVwiYDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB2YWwuZGVzY3JpcHRpb247XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1N5bWJvbCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYFN5bWJvbCgke2Rlc2NyaXB0aW9ufSlgO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHZhbC5uYW1lO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgJiYgbmFtZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYEZ1bmN0aW9uKCR7bmFtZX0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnRnVuY3Rpb24nO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG9iamVjdHNcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHZhbC5sZW5ndGg7XG4gICAgICAgIGxldCBkZWJ1ZyA9ICdbJztcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGRlYnVnICs9IGRlYnVnU3RyaW5nKHZhbFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWJ1ZyArPSAnLCAnICsgZGVidWdTdHJpbmcodmFsW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBkZWJ1ZyArPSAnXSc7XG4gICAgICAgIHJldHVybiBkZWJ1ZztcbiAgICB9XG4gICAgLy8gVGVzdCBmb3IgYnVpbHQtaW5cbiAgICBjb25zdCBidWlsdEluTWF0Y2hlcyA9IC9cXFtvYmplY3QgKFteXFxdXSspXFxdLy5leGVjKHRvU3RyaW5nLmNhbGwodmFsKSk7XG4gICAgbGV0IGNsYXNzTmFtZTtcbiAgICBpZiAoYnVpbHRJbk1hdGNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBjbGFzc05hbWUgPSBidWlsdEluTWF0Y2hlc1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWlsZWQgdG8gbWF0Y2ggdGhlIHN0YW5kYXJkICdbb2JqZWN0IENsYXNzTmFtZV0nXG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCk7XG4gICAgfVxuICAgIGlmIChjbGFzc05hbWUgPT0gJ09iamVjdCcpIHtcbiAgICAgICAgLy8gd2UncmUgYSB1c2VyIGRlZmluZWQgY2xhc3Mgb3IgT2JqZWN0XG4gICAgICAgIC8vIEpTT04uc3RyaW5naWZ5IGF2b2lkcyBwcm9ibGVtcyB3aXRoIGN5Y2xlcywgYW5kIGlzIGdlbmVyYWxseSBtdWNoXG4gICAgICAgIC8vIGVhc2llciB0aGFuIGxvb3BpbmcgdGhyb3VnaCBvd25Qcm9wZXJ0aWVzIG9mIGB2YWxgLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICdPYmplY3QoJyArIEpTT04uc3RyaW5naWZ5KHZhbCkgKyAnKSc7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIHJldHVybiAnT2JqZWN0JztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlcnJvcnNcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGAke3ZhbC5uYW1lfTogJHt2YWwubWVzc2FnZX1cXG4ke3ZhbC5zdGFja31gO1xuICAgIH1cbiAgICAvLyBUT0RPIHdlIGNvdWxkIHRlc3QgZm9yIG1vcmUgdGhpbmdzIGhlcmUsIGxpa2UgYFNldGBzIGFuZCBgTWFwYHMuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbn1cblxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKTtcblxuY29uc3QgZW5jb2RlU3RyaW5nID0gZnVuY3Rpb24gKGFyZywgdmlldykge1xuICAgIGNvbnN0IGJ1ZiA9IGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZShhcmcpO1xuICAgIHZpZXcuc2V0KGJ1Zik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVhZDogYXJnLmxlbmd0aCxcbiAgICAgICAgd3JpdHRlbjogYnVmLmxlbmd0aFxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtMChhcmcsIG1hbGxvYywgcmVhbGxvYykge1xuXG4gICAgaWYgKHJlYWxsb2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICAgICAgY29uc3QgcHRyID0gbWFsbG9jKGJ1Zi5sZW5ndGgpO1xuICAgICAgICBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGJ1Zi5sZW5ndGgpLnNldChidWYpO1xuICAgICAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGxldCBsZW4gPSBhcmcubGVuZ3RoO1xuICAgIGxldCBwdHIgPSBtYWxsb2MobGVuKTtcblxuICAgIGNvbnN0IG1lbSA9IGdldFVpbnQ4TWVtb3J5MCgpO1xuXG4gICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICBmb3IgKDsgb2Zmc2V0IDwgbGVuOyBvZmZzZXQrKykge1xuICAgICAgICBjb25zdCBjb2RlID0gYXJnLmNoYXJDb2RlQXQob2Zmc2V0KTtcbiAgICAgICAgaWYgKGNvZGUgPiAweDdGKSBicmVhaztcbiAgICAgICAgbWVtW3B0ciArIG9mZnNldF0gPSBjb2RlO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXQgIT09IGxlbikge1xuICAgICAgICBpZiAob2Zmc2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBwdHIgPSByZWFsbG9jKHB0ciwgbGVuLCBsZW4gPSBvZmZzZXQgKyBhcmcubGVuZ3RoICogMyk7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIgKyBvZmZzZXQsIHB0ciArIGxlbik7XG4gICAgICAgIGNvbnN0IHJldCA9IGVuY29kZVN0cmluZyhhcmcsIHZpZXcpO1xuXG4gICAgICAgIG9mZnNldCArPSByZXQud3JpdHRlbjtcbiAgICB9XG5cbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBvZmZzZXQ7XG4gICAgcmV0dXJuIHB0cjtcbn1cblxubGV0IGNhY2hlZ2V0SW50MzJNZW1vcnkwID0gbnVsbDtcbmZ1bmN0aW9uIGdldEludDMyTWVtb3J5MCgpIHtcbiAgICBpZiAoY2FjaGVnZXRJbnQzMk1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVnZXRJbnQzMk1lbW9yeTAuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRJbnQzMk1lbW9yeTAgPSBuZXcgSW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRJbnQzMk1lbW9yeTA7XG59XG4vKipcbiovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgd2FzbS5zdGFydCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihmLCBhcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZXhuX3N0b3JlKGFkZEhlYXBPYmplY3QoZSkpO1xuICAgIH1cbn1cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gbnVtX3RocmVhZHNcbiogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiovXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRocmVhZFBvb2wobnVtX3RocmVhZHMpIHtcbiAgICB2YXIgcmV0ID0gd2FzbS5pbml0VGhyZWFkUG9vbChudW1fdGhyZWFkcyk7XG4gICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcbn1cblxuLyoqXG4qIEBwYXJhbSB7bnVtYmVyfSByZWNlaXZlclxuKi9cbmV4cG9ydCBmdW5jdGlvbiB3YmdfcmF5b25fc3RhcnRfd29ya2VyKHJlY2VpdmVyKSB7XG4gICAgd2FzbS53YmdfcmF5b25fc3RhcnRfd29ya2VyKHJlY2VpdmVyKTtcbn1cblxuLyoqXG4qL1xuZXhwb3J0IGNsYXNzIFdvcmxkU3RhdGUge1xuXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShXb3JsZFN0YXRlLnByb3RvdHlwZSk7XG4gICAgICAgIG9iai5wdHIgPSBwdHI7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMucHRyO1xuICAgICAgICB0aGlzLnB0ciA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX3dvcmxkc3RhdGVfZnJlZShwdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX25ldygpO1xuICAgICAgICByZXR1cm4gV29ybGRTdGF0ZS5fX3dyYXAocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGZha2Vfc3RkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZmFrZV9jb3JlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZmFrZV9hbGxvY1xuICAgICovXG4gICAgaW5pdChjb2RlLCBmYWtlX3N0ZCwgZmFrZV9jb3JlLCBmYWtlX2FsbG9jKSB7XG4gICAgICAgIHZhciBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoY29kZSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgdmFyIHB0cjEgPSBwYXNzU3RyaW5nVG9XYXNtMChmYWtlX3N0ZCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgdmFyIHB0cjIgPSBwYXNzU3RyaW5nVG9XYXNtMChmYWtlX2NvcmUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcbiAgICAgICAgdmFyIGxlbjIgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgICAgIHZhciBwdHIzID0gcGFzc1N0cmluZ1RvV2FzbTAoZmFrZV9hbGxvYywgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMyA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgd2FzbS53b3JsZHN0YXRlX2luaXQodGhpcy5wdHIsIHB0cjAsIGxlbjAsIHB0cjEsIGxlbjEsIHB0cjIsIGxlbjIsIHB0cjMsIGxlbjMpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAgKiBAcmV0dXJucyB7YW55fVxuICAgICovXG4gICAgdXBkYXRlKGNvZGUpIHtcbiAgICAgICAgdmFyIHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChjb2RlLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XG4gICAgICAgIHZhciBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX3VwZGF0ZSh0aGlzLnB0ciwgcHRyMCwgbGVuMCk7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIGlubGF5X2hpbnRzKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX2lubGF5X2hpbnRzKHRoaXMucHRyKTtcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gbGluZV9udW1iZXJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5cbiAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgKi9cbiAgICBjb21wbGV0aW9ucyhsaW5lX251bWJlciwgY29sdW1uKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLndvcmxkc3RhdGVfY29tcGxldGlvbnModGhpcy5wdHIsIGxpbmVfbnVtYmVyLCBjb2x1bW4pO1xuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lX251bWJlclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIGhvdmVyKGxpbmVfbnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV9ob3Zlcih0aGlzLnB0ciwgbGluZV9udW1iZXIsIGNvbHVtbik7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIGNvZGVfbGVuc2VzKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX2NvZGVfbGVuc2VzKHRoaXMucHRyKTtcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gbGluZV9udW1iZXJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZV9kZWNsYXJhdGlvblxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIHJlZmVyZW5jZXMobGluZV9udW1iZXIsIGNvbHVtbiwgaW5jbHVkZV9kZWNsYXJhdGlvbikge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX3JlZmVyZW5jZXModGhpcy5wdHIsIGxpbmVfbnVtYmVyLCBjb2x1bW4sIGluY2x1ZGVfZGVjbGFyYXRpb24pO1xuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lX251bWJlclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIHByZXBhcmVfcmVuYW1lKGxpbmVfbnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV9wcmVwYXJlX3JlbmFtZSh0aGlzLnB0ciwgbGluZV9udW1iZXIsIGNvbHVtbik7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVfbnVtYmVyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X25hbWVcbiAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgKi9cbiAgICByZW5hbWUobGluZV9udW1iZXIsIGNvbHVtbiwgbmV3X25hbWUpIHtcbiAgICAgICAgdmFyIHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChuZXdfbmFtZSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV9yZW5hbWUodGhpcy5wdHIsIGxpbmVfbnVtYmVyLCBjb2x1bW4sIHB0cjAsIGxlbjApO1xuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lX251bWJlclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIHNpZ25hdHVyZV9oZWxwKGxpbmVfbnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV9zaWduYXR1cmVfaGVscCh0aGlzLnB0ciwgbGluZV9udW1iZXIsIGNvbHVtbik7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVfbnVtYmVyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uXG4gICAgKiBAcmV0dXJucyB7YW55fVxuICAgICovXG4gICAgZGVmaW5pdGlvbihsaW5lX251bWJlciwgY29sdW1uKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLndvcmxkc3RhdGVfZGVmaW5pdGlvbih0aGlzLnB0ciwgbGluZV9udW1iZXIsIGNvbHVtbik7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVfbnVtYmVyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uXG4gICAgKiBAcmV0dXJucyB7YW55fVxuICAgICovXG4gICAgdHlwZV9kZWZpbml0aW9uKGxpbmVfbnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV90eXBlX2RlZmluaXRpb24odGhpcy5wdHIsIGxpbmVfbnVtYmVyLCBjb2x1bW4pO1xuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgKi9cbiAgICBkb2N1bWVudF9zeW1ib2xzKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX2RvY3VtZW50X3N5bWJvbHModGhpcy5wdHIpO1xuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lX251bWJlclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNoXG4gICAgKiBAcmV0dXJucyB7YW55fVxuICAgICovXG4gICAgdHlwZV9mb3JtYXR0aW5nKGxpbmVfbnVtYmVyLCBjb2x1bW4sIGNoKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLndvcmxkc3RhdGVfdHlwZV9mb3JtYXR0aW5nKHRoaXMucHRyLCBsaW5lX251bWJlciwgY29sdW1uLCBjaC5jb2RlUG9pbnRBdCgwKSk7XG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge2FueX1cbiAgICAqL1xuICAgIGZvbGRpbmdfcmFuZ2VzKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS53b3JsZHN0YXRlX2ZvbGRpbmdfcmFuZ2VzKHRoaXMucHRyKTtcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gbGluZV9udW1iZXJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5cbiAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgKi9cbiAgICBnb3RvX2ltcGxlbWVudGF0aW9uKGxpbmVfbnVtYmVyLCBjb2x1bW4pIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ud29ybGRzdGF0ZV9nb3RvX2ltcGxlbWVudGF0aW9uKHRoaXMucHRyLCBsaW5lX251bWJlciwgY29sdW1uKTtcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcbiAgICB9XG59XG4vKipcbiovXG5leHBvcnQgY2xhc3Mgd2JnX3JheW9uX1Bvb2xCdWlsZGVyIHtcblxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUod2JnX3JheW9uX1Bvb2xCdWlsZGVyLnByb3RvdHlwZSk7XG4gICAgICAgIG9iai5wdHIgPSBwdHI7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMucHRyO1xuICAgICAgICB0aGlzLnB0ciA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX3diZ19yYXlvbl9wb29sYnVpbGRlcl9mcmVlKHB0cik7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIG51bVRocmVhZHMoKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLndiZ19yYXlvbl9wb29sYnVpbGRlcl9udW1UaHJlYWRzKHRoaXMucHRyKTtcbiAgICAgICAgcmV0dXJuIHJldCA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgcmVjZWl2ZXIoKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLndiZ19yYXlvbl9wb29sYnVpbGRlcl9yZWNlaXZlcih0aGlzLnB0cik7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHdhc20ud2JnX3JheW9uX3Bvb2xidWlsZGVyX2J1aWxkKHRoaXMucHRyKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWQobW9kdWxlLCBpbXBvcnRzKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGUgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhtb2R1bGUsIGltcG9ydHMpO1xuXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykgIT0gJ2FwcGxpY2F0aW9uL3dhc20nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ2AgZmFpbGVkIGJlY2F1c2UgeW91ciBzZXJ2ZXIgZG9lcyBub3Qgc2VydmUgd2FzbSB3aXRoIGBhcHBsaWNhdGlvbi93YXNtYCBNSU1FIHR5cGUuIEZhbGxpbmcgYmFjayB0byBgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVgIHdoaWNoIGlzIHNsb3dlci4gT3JpZ2luYWwgZXJyb3I6XFxuXCIsIGUpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBieXRlcyA9IGF3YWl0IG1vZHVsZS5hcnJheUJ1ZmZlcigpO1xuICAgICAgICByZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnl0ZXMsIGltcG9ydHMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShtb2R1bGUsIGltcG9ydHMpO1xuXG4gICAgICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lkluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpbnN0YW5jZSwgbW9kdWxlIH07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdChpbnB1dCwgbWF5YmVfbWVtb3J5KSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaW5wdXQgPSBuZXcgVVJMKCd3YXNtX2RlbW9fYmcud2FzbScsIGltcG9ydC5tZXRhLnVybCk7XG4gICAgfVxuICAgIGNvbnN0IGltcG9ydHMgPSB7fTtcbiAgICBpbXBvcnRzLndiZyA9IHt9O1xuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmID0gZnVuY3Rpb24oYXJnMCkge1xuICAgICAgICB0YWtlT2JqZWN0KGFyZzApO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9zdHJpbmdfbmV3ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICB2YXIgcmV0ID0gZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpO1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9vYmplY3RfY2xvbmVfcmVmID0gZnVuY3Rpb24oYXJnMCkge1xuICAgICAgICB2YXIgcmV0ID0gZ2V0T2JqZWN0KGFyZzApO1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3XzY4YWRiMGQ1ODc1OWE0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbiAgICB9O1xuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fbnVtYmVyX25ldyA9IGZ1bmN0aW9uKGFyZzApIHtcbiAgICAgICAgdmFyIHJldCA9IGFyZzA7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX2lzX3VuZGVmaW5lZCA9IGZ1bmN0aW9uKGFyZzApIHtcbiAgICAgICAgdmFyIHJldCA9IGdldE9iamVjdChhcmcwKSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193Ymdfc2V0XzJlNzllNzQ0NDU0YWZhZGUgPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XG4gICAgICAgIGdldE9iamVjdChhcmcwKVt0YWtlT2JqZWN0KGFyZzEpXSA9IHRha2VPYmplY3QoYXJnMik7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfNjkzMjE2ZTEwOTE2MjM5NiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0ID0gbmV3IEVycm9yKCk7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zdGFja18wZGRhY2E1ZDFhYmZiNTJmID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICB2YXIgcmV0ID0gZ2V0T2JqZWN0KGFyZzEpLnN0YWNrO1xuICAgICAgICB2YXIgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHJldCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAxXSA9IGxlbjA7XG4gICAgICAgIGdldEludDMyTWVtb3J5MCgpW2FyZzAgLyA0ICsgMF0gPSBwdHIwO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmdfZXJyb3JfMDk5MTk2MjdhYzA5OTJmNSA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGFyZzAsIGFyZzEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19ub3dfNTU5MTkzMTA5MDU1ZWJhZCA9IGZ1bmN0aW9uKGFyZzApIHtcbiAgICAgICAgdmFyIHJldCA9IGdldE9iamVjdChhcmcwKS5ub3coKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld185NDliYmMxMTQ3MTk1YzRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXQgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbiAgICB9O1xuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld25vYXJnc19iZTg2NTI0ZDczZjY3NTk4ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xuICAgICAgICB2YXIgcmV0ID0gbmV3IEZ1bmN0aW9uKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19nZXRfNGQwZjIxYzJmODIzNzQyZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdmFyIHJldCA9IFJlZmxlY3QuZ2V0KGdldE9iamVjdChhcmcwKSwgZ2V0T2JqZWN0KGFyZzEpKTtcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbiAgICB9LCBhcmd1bWVudHMpIH07XG4gICAgaW1wb3J0cy53YmcuX193YmdfY2FsbF84ODhkMjU5YTVmZWZjMzQ3ID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoYXJnMCwgYXJnMSkge1xuICAgICAgICB2YXIgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmNhbGwoZ2V0T2JqZWN0KGFyZzEpKTtcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbiAgICB9LCBhcmd1bWVudHMpIH07XG4gICAgaW1wb3J0cy53YmcuX193Ymdfc2VsZl9jNmZiZGZjMjkxOGQ1ZTU4ID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXQgPSBzZWxmLnNlbGY7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfSwgYXJndW1lbnRzKSB9O1xuICAgIGltcG9ydHMud2JnLl9fd2JnX3dpbmRvd19iYWVjMDM4YjVhYjM1YzU0ID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXQgPSB3aW5kb3cud2luZG93O1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH0sIGFyZ3VtZW50cykgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19nbG9iYWxUaGlzXzNmNzM1YTU3NDZkNDFmYmQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IGdsb2JhbFRoaXMuZ2xvYmFsVGhpcztcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbiAgICB9LCBhcmd1bWVudHMpIH07XG4gICAgaW1wb3J0cy53YmcuX193YmdfZ2xvYmFsXzFiYzBiMzk1ODI3NDBlOTUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IGdsb2JhbC5nbG9iYWw7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfSwgYXJndW1lbnRzKSB9O1xuICAgIGltcG9ydHMud2JnLl9fd2JnX3B1c2hfMjg0NDg2Y2EyN2M2YWE4YiA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdmFyIHJldCA9IGdldE9iamVjdChhcmcwKS5wdXNoKGdldE9iamVjdChhcmcxKSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfMzQyYTI0Y2E2OThlZGQ4NyA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBFcnJvcihnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9kZWJ1Z19zdHJpbmcgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XG4gICAgICAgIHZhciByZXQgPSBkZWJ1Z1N0cmluZyhnZXRPYmplY3QoYXJnMSkpO1xuICAgICAgICB2YXIgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHJldCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICB2YXIgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAxXSA9IGxlbjA7XG4gICAgICAgIGdldEludDMyTWVtb3J5MCgpW2FyZzAgLyA0ICsgMF0gPSBwdHIwO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl90aHJvdyA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XG4gICAgfTtcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX21vZHVsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0ID0gaW5pdC5fX3diaW5kZ2VuX3dhc21fbW9kdWxlO1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9tZW1vcnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20ubWVtb3J5O1xuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xuICAgIH07XG4gICAgaW1wb3J0cy53YmcuX193Ymdfc3RhcnRXb3JrZXJzXzA0ZjYzZWNhMTk5MTZiOGYgPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XG4gICAgICAgIHZhciByZXQgPSBzdGFydFdvcmtlcnModGFrZU9iamVjdChhcmcwKSwgdGFrZU9iamVjdChhcmcxKSwgd2JnX3JheW9uX1Bvb2xCdWlsZGVyLl9fd3JhcChhcmcyKSk7XG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8ICh0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHx8ICh0eXBlb2YgVVJMID09PSAnZnVuY3Rpb24nICYmIGlucHV0IGluc3RhbmNlb2YgVVJMKSkge1xuICAgICAgICBpbnB1dCA9IGZldGNoKGlucHV0KTtcbiAgICB9XG5cbiAgICBpbXBvcnRzLndiZy5tZW1vcnkgPSBtYXliZV9tZW1vcnkgfHwgbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7aW5pdGlhbDozNSxtYXhpbXVtOjE2Mzg0LHNoYXJlZDp0cnVlfSk7XG5cbiAgICBjb25zdCB7IGluc3RhbmNlLCBtb2R1bGUgfSA9IGF3YWl0IGxvYWQoYXdhaXQgaW5wdXQsIGltcG9ydHMpO1xuXG4gICAgd2FzbSA9IGluc3RhbmNlLmV4cG9ydHM7XG4gICAgaW5pdC5fX3diaW5kZ2VuX3dhc21fbW9kdWxlID0gbW9kdWxlO1xuICAgIHdhc20uX193YmluZGdlbl9zdGFydCgpO1xuICAgIHJldHVybiB3YXNtO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG4iXSwibmFtZXMiOlsic3RhcnRXb3JrZXJzIiwid2FzbSIsImhlYXAiLCJBcnJheSIsImZpbGwiLCJ1bmRlZmluZWQiLCJwdXNoIiwiZ2V0T2JqZWN0IiwiaWR4IiwiaGVhcF9uZXh0IiwibGVuZ3RoIiwiZHJvcE9iamVjdCIsInRha2VPYmplY3QiLCJyZXQiLCJjYWNoZWRUZXh0RGVjb2RlciIsIlRleHREZWNvZGVyIiwiaWdub3JlQk9NIiwiZmF0YWwiLCJkZWNvZGUiLCJjYWNoZWdldFVpbnQ4TWVtb3J5MCIsImdldFVpbnQ4TWVtb3J5MCIsImJ1ZmZlciIsIm1lbW9yeSIsIlVpbnQ4QXJyYXkiLCJnZXRTdHJpbmdGcm9tV2FzbTAiLCJwdHIiLCJsZW4iLCJzbGljZSIsImFkZEhlYXBPYmplY3QiLCJvYmoiLCJkZWJ1Z1N0cmluZyIsInZhbCIsInR5cGUiLCJkZXNjcmlwdGlvbiIsIm5hbWUiLCJpc0FycmF5IiwiZGVidWciLCJpIiwiYnVpbHRJbk1hdGNoZXMiLCJleGVjIiwidG9TdHJpbmciLCJjYWxsIiwiY2xhc3NOYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsIl8iLCJFcnJvciIsIm1lc3NhZ2UiLCJzdGFjayIsIldBU01fVkVDVE9SX0xFTiIsImNhY2hlZFRleHRFbmNvZGVyIiwiVGV4dEVuY29kZXIiLCJlbmNvZGVTdHJpbmciLCJhcmciLCJ2aWV3IiwiYnVmIiwiZW5jb2RlIiwic2V0IiwicmVhZCIsIndyaXR0ZW4iLCJwYXNzU3RyaW5nVG9XYXNtMCIsIm1hbGxvYyIsInJlYWxsb2MiLCJzdWJhcnJheSIsIm1lbSIsIm9mZnNldCIsImNvZGUiLCJjaGFyQ29kZUF0IiwiY2FjaGVnZXRJbnQzMk1lbW9yeTAiLCJnZXRJbnQzMk1lbW9yeTAiLCJJbnQzMkFycmF5Iiwic3RhcnQiLCJoYW5kbGVFcnJvciIsImYiLCJhcmdzIiwiYXBwbHkiLCJlIiwiX193YmluZGdlbl9leG5fc3RvcmUiLCJpbml0VGhyZWFkUG9vbCIsIm51bV90aHJlYWRzIiwid2JnX3JheW9uX3N0YXJ0X3dvcmtlciIsInJlY2VpdmVyIiwiV29ybGRTdGF0ZSIsIl9fd3JhcCIsIk9iamVjdCIsImNyZWF0ZSIsInByb3RvdHlwZSIsIl9fZGVzdHJveV9pbnRvX3JhdyIsImZyZWUiLCJfX3diZ193b3JsZHN0YXRlX2ZyZWUiLCJpbml0IiwiZmFrZV9zdGQiLCJmYWtlX2NvcmUiLCJmYWtlX2FsbG9jIiwicHRyMCIsIl9fd2JpbmRnZW5fbWFsbG9jIiwiX193YmluZGdlbl9yZWFsbG9jIiwibGVuMCIsInB0cjEiLCJsZW4xIiwicHRyMiIsImxlbjIiLCJwdHIzIiwibGVuMyIsIndvcmxkc3RhdGVfaW5pdCIsInVwZGF0ZSIsIndvcmxkc3RhdGVfdXBkYXRlIiwiaW5sYXlfaGludHMiLCJ3b3JsZHN0YXRlX2lubGF5X2hpbnRzIiwiY29tcGxldGlvbnMiLCJsaW5lX251bWJlciIsImNvbHVtbiIsIndvcmxkc3RhdGVfY29tcGxldGlvbnMiLCJob3ZlciIsIndvcmxkc3RhdGVfaG92ZXIiLCJjb2RlX2xlbnNlcyIsIndvcmxkc3RhdGVfY29kZV9sZW5zZXMiLCJyZWZlcmVuY2VzIiwiaW5jbHVkZV9kZWNsYXJhdGlvbiIsIndvcmxkc3RhdGVfcmVmZXJlbmNlcyIsInByZXBhcmVfcmVuYW1lIiwid29ybGRzdGF0ZV9wcmVwYXJlX3JlbmFtZSIsInJlbmFtZSIsIm5ld19uYW1lIiwid29ybGRzdGF0ZV9yZW5hbWUiLCJzaWduYXR1cmVfaGVscCIsIndvcmxkc3RhdGVfc2lnbmF0dXJlX2hlbHAiLCJkZWZpbml0aW9uIiwid29ybGRzdGF0ZV9kZWZpbml0aW9uIiwidHlwZV9kZWZpbml0aW9uIiwid29ybGRzdGF0ZV90eXBlX2RlZmluaXRpb24iLCJkb2N1bWVudF9zeW1ib2xzIiwid29ybGRzdGF0ZV9kb2N1bWVudF9zeW1ib2xzIiwidHlwZV9mb3JtYXR0aW5nIiwiY2giLCJ3b3JsZHN0YXRlX3R5cGVfZm9ybWF0dGluZyIsImNvZGVQb2ludEF0IiwiZm9sZGluZ19yYW5nZXMiLCJ3b3JsZHN0YXRlX2ZvbGRpbmdfcmFuZ2VzIiwiZ290b19pbXBsZW1lbnRhdGlvbiIsIndvcmxkc3RhdGVfZ290b19pbXBsZW1lbnRhdGlvbiIsImNvbnN0cnVjdG9yIiwid29ybGRzdGF0ZV9uZXciLCJ3YmdfcmF5b25fUG9vbEJ1aWxkZXIiLCJfX3diZ193YmdfcmF5b25fcG9vbGJ1aWxkZXJfZnJlZSIsIm51bVRocmVhZHMiLCJ3YmdfcmF5b25fcG9vbGJ1aWxkZXJfbnVtVGhyZWFkcyIsIndiZ19yYXlvbl9wb29sYnVpbGRlcl9yZWNlaXZlciIsImJ1aWxkIiwid2JnX3JheW9uX3Bvb2xidWlsZGVyX2J1aWxkIiwibG9hZCIsIm1vZHVsZSIsImltcG9ydHMiLCJSZXNwb25zZSIsIldlYkFzc2VtYmx5IiwiaW5zdGFudGlhdGVTdHJlYW1pbmciLCJoZWFkZXJzIiwiZ2V0IiwiY29uc29sZSIsIndhcm4iLCJieXRlcyIsImFycmF5QnVmZmVyIiwiaW5zdGFudGlhdGUiLCJpbnN0YW5jZSIsIkluc3RhbmNlIiwiaW5wdXQiLCJtYXliZV9tZW1vcnkiLCJVUkwiLCJ1cmwiLCJ3YmciLCJfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZiIsImFyZzAiLCJfX3diaW5kZ2VuX3N0cmluZ19uZXciLCJhcmcxIiwiX193YmluZGdlbl9vYmplY3RfY2xvbmVfcmVmIiwiX193YmdfbmV3XzY4YWRiMGQ1ODc1OWE0ZWQiLCJfX3diaW5kZ2VuX251bWJlcl9uZXciLCJfX3diaW5kZ2VuX2lzX3VuZGVmaW5lZCIsIl9fd2JnX3NldF8yZTc5ZTc0NDQ1NGFmYWRlIiwiYXJnMiIsIl9fd2JnX25ld182OTMyMTZlMTA5MTYyMzk2IiwiX193Ymdfc3RhY2tfMGRkYWNhNWQxYWJmYjUyZiIsIl9fd2JnX2Vycm9yXzA5OTE5NjI3YWMwOTkyZjUiLCJlcnJvciIsIl9fd2JpbmRnZW5fZnJlZSIsIl9fd2JnX25vd181NTkxOTMxMDkwNTVlYmFkIiwibm93IiwiX193YmdfbmV3Xzk0OWJiYzExNDcxOTVjNGUiLCJfX3diZ19uZXdub2FyZ3NfYmU4NjUyNGQ3M2Y2NzU5OCIsIkZ1bmN0aW9uIiwiX193YmdfZ2V0XzRkMGYyMWMyZjgyMzc0MmUiLCJSZWZsZWN0IiwiYXJndW1lbnRzIiwiX193YmdfY2FsbF84ODhkMjU5YTVmZWZjMzQ3IiwiX193Ymdfc2VsZl9jNmZiZGZjMjkxOGQ1ZTU4Iiwic2VsZiIsIl9fd2JnX3dpbmRvd19iYWVjMDM4YjVhYjM1YzU0Iiwid2luZG93IiwiX193YmdfZ2xvYmFsVGhpc18zZjczNWE1NzQ2ZDQxZmJkIiwiZ2xvYmFsVGhpcyIsIl9fd2JnX2dsb2JhbF8xYmMwYjM5NTgyNzQwZTk1IiwiZ2xvYmFsIiwiX193YmdfcHVzaF8yODQ0ODZjYTI3YzZhYThiIiwiX193YmdfbmV3XzM0MmEyNGNhNjk4ZWRkODciLCJfX3diaW5kZ2VuX2RlYnVnX3N0cmluZyIsIl9fd2JpbmRnZW5fdGhyb3ciLCJfX3diaW5kZ2VuX21vZHVsZSIsIl9fd2JpbmRnZW5fd2FzbV9tb2R1bGUiLCJfX3diaW5kZ2VuX21lbW9yeSIsIl9fd2JnX3N0YXJ0V29ya2Vyc18wNGY2M2VjYTE5OTE2YjhmIiwiUmVxdWVzdCIsImZldGNoIiwiTWVtb3J5IiwiaW5pdGlhbCIsIm1heGltdW0iLCJzaGFyZWQiLCJleHBvcnRzIiwiX193YmluZGdlbl9zdGFydCJdLCJzb3VyY2VSb290IjoiIn0=