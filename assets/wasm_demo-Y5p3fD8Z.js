import { t as startWorkers } from "./workerHelpers-BDN0n5ZM.js";
let wasm;
const heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
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
let cachedTextDecoder = new TextDecoder("utf-8", {
	ignoreBOM: true,
	fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
	if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
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
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return `${val}`;
	if (type == "string") return `"${val}"`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return `Symbol(${description})`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return `Function(${name})`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
	let className;
	if (builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return `${val.name}: ${val.message}\n${val.stack}`;
	return className;
}
let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder("utf-8");
const encodeString = function(arg, view) {
	const buf = cachedTextEncoder.encode(arg);
	view.set(buf);
	return {
		read: arg.length,
		written: buf.length
	};
};
function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr$1 = malloc(buf.length);
		getUint8Memory0().subarray(ptr$1, ptr$1 + buf.length).set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr$1;
	}
	let len = arg.length;
	let ptr = malloc(len);
	const mem = getUint8Memory0();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
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
	if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
	return cachegetInt32Memory0;
}
function handleError(f, args) {
	try {
		return f.apply(this, args);
	} catch (e) {
		wasm.__wbindgen_exn_store(addHeapObject(e));
	}
}
function wbg_rayon_start_worker(receiver) {
	wasm.wbg_rayon_start_worker(receiver);
}
var wbg_rayon_PoolBuilder = class wbg_rayon_PoolBuilder {
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
	numThreads() {
		return wasm.wbg_rayon_poolbuilder_numThreads(this.ptr) >>> 0;
	}
	receiver() {
		return wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
	}
	build() {
		wasm.wbg_rayon_poolbuilder_build(this.ptr);
	}
};
async function load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
}
async function init(input, maybe_memory) {
	if (typeof input === "undefined") input = new URL("" + new URL("wasm_demo_bg-BwnNcHQ9.wasm", import.meta.url).href, "" + import.meta.url);
	const imports = {};
	imports.wbg = {};
	imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
		takeObject(arg0);
	};
	imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
		return addHeapObject(getStringFromWasm0(arg0, arg1));
	};
	imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
		return addHeapObject(getObject(arg0));
	};
	imports.wbg.__wbg_new_68adb0d58759a4ed = function() {
		return addHeapObject(/* @__PURE__ */ new Object());
	};
	imports.wbg.__wbindgen_number_new = function(arg0) {
		return addHeapObject(arg0);
	};
	imports.wbg.__wbindgen_is_undefined = function(arg0) {
		return getObject(arg0) === void 0;
	};
	imports.wbg.__wbg_set_2e79e744454afade = function(arg0, arg1, arg2) {
		getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
	};
	imports.wbg.__wbg_new_693216e109162396 = function() {
		return addHeapObject(/* @__PURE__ */ new Error());
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
		} finally {
			wasm.__wbindgen_free(arg0, arg1);
		}
	};
	imports.wbg.__wbg_now_559193109055ebad = function(arg0) {
		return getObject(arg0).now();
	};
	imports.wbg.__wbg_new_949bbc1147195c4e = function() {
		return addHeapObject(new Array());
	};
	imports.wbg.__wbg_newnoargs_be86524d73f67598 = function(arg0, arg1) {
		return addHeapObject(new Function(getStringFromWasm0(arg0, arg1)));
	};
	imports.wbg.__wbg_get_4d0f21c2f823742e = function() {
		return handleError(function(arg0, arg1) {
			return addHeapObject(Reflect.get(getObject(arg0), getObject(arg1)));
		}, arguments);
	};
	imports.wbg.__wbg_call_888d259a5fefc347 = function() {
		return handleError(function(arg0, arg1) {
			return addHeapObject(getObject(arg0).call(getObject(arg1)));
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
			var ret = global.global;
			return addHeapObject(ret);
		}, arguments);
	};
	imports.wbg.__wbg_push_284486ca27c6aa8b = function(arg0, arg1) {
		return getObject(arg0).push(getObject(arg1));
	};
	imports.wbg.__wbg_new_342a24ca698edd87 = function(arg0, arg1) {
		return addHeapObject(new Error(getStringFromWasm0(arg0, arg1)));
	};
	imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
		var ptr0 = passStringToWasm0(debugString(getObject(arg1)), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
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
		return addHeapObject(startWorkers(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2)));
	};
	if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) input = fetch(input);
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
var wasm_demo_default = init;
export { wasm_demo_default as default, wbg_rayon_start_worker };
