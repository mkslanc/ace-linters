import { i as require_main, n as BaseService } from "./common-converters-BtzeF4y0.js";
import { n as mergeObjects } from "./webworker-CFwJXhOX.js";
import { t as filterDiagnostics } from "./lsp-converters-CR0ewP9x.js";
var import_main = require_main();
function toRange(location, endLocation) {
	return {
		start: {
			line: Math.max(location.row - 1, 0),
			character: location.column - 1
		},
		end: {
			line: Math.max(endLocation.row - 1, 0),
			character: endLocation.column - 1
		}
	};
}
function toDiagnostics(diagnostics, filterErrors) {
	return filterDiagnostics(diagnostics.filter((el) => !filterErrors.errorCodesToIgnore.includes(el.code ?? "")).map((el) => {
		const code = el.code ?? "";
		let severity = import_main.DiagnosticSeverity.Error;
		if (filterErrors.errorCodesToTreatAsWarning.includes(code)) severity = import_main.DiagnosticSeverity.Warning;
		else if (filterErrors.errorCodesToTreatAsInfo.includes(code)) severity = import_main.DiagnosticSeverity.Information;
		return {
			message: code + " " + el.message,
			range: toRange(el.start_location, el.end_location),
			severity
		};
	}), filterErrors);
}
function toTextEdits(input, range) {
	return [{
		range,
		newText: input
	}];
}
let wasm;
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
	if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
	return cachedUint8ArrayMemory0;
}
let cachedTextDecoder = new TextDecoder("utf-8", {
	ignoreBOM: true,
	fatal: true
});
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
	numBytesDecoded += len;
	if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
		cachedTextDecoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder.decode();
		numBytesDecoded = len;
	}
	return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function getStringFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return decodeText(ptr, len);
}
let WASM_VECTOR_LEN = 0;
const cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) cachedTextEncoder.encodeInto = function(arg, view) {
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
		const ptr$1 = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0().subarray(ptr$1, ptr$1 + buf.length).set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr$1;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN = offset;
	return ptr;
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
	if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
	return cachedDataViewMemory0;
}
function isLikeNone(x) {
	return x === void 0 || x === null;
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
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return `${val.name}: ${val.message}\n${val.stack}`;
	return className;
}
function addToExternrefTable0(obj) {
	const idx = wasm.__externref_table_alloc();
	wasm.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function handleError(f, args) {
	try {
		return f.apply(this, args);
	} catch (e) {
		const idx = addToExternrefTable0(e);
		wasm.__wbindgen_exn_store(idx);
	}
}
function getArrayU8FromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function takeFromExternrefTable0(idx) {
	const value = wasm.__wbindgen_externrefs.get(idx);
	wasm.__externref_table_dealloc(idx);
	return value;
}
Object.freeze({
	Trace: 0,
	"0": "Trace",
	Debug: 1,
	"1": "Debug",
	Info: 2,
	"2": "Info",
	Warn: 3,
	"3": "Warn",
	Error: 4,
	"4": "Error"
});
Object.freeze({
	Utf8: 0,
	"0": "Utf8",
	Utf16: 1,
	"1": "Utf16",
	Utf32: 2,
	"2": "Utf32"
});
const WorkspaceFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_workspace_free(ptr >>> 0, 1));
var Workspace = class {
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		WorkspaceFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_workspace_free(ptr, 0);
	}
	static defaultSettings() {
		const ret = wasm.workspace_defaultSettings();
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return takeFromExternrefTable0(ret[0]);
	}
	constructor(options, position_encoding) {
		const ret = wasm.workspace_new(options, position_encoding);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		this.__wbg_ptr = ret[0] >>> 0;
		WorkspaceFinalization.register(this, this.__wbg_ptr, this);
		return this;
	}
	check(contents) {
		const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.workspace_check(this.__wbg_ptr, ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return takeFromExternrefTable0(ret[0]);
	}
	parse(contents) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.workspace_parse(this.__wbg_ptr, ptr0, len0);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	format(contents) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.workspace_format(this.__wbg_ptr, ptr0, len0);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	tokens(contents) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.workspace_tokens(this.__wbg_ptr, ptr0, len0);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	static version() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.workspace_version();
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	comments(contents) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.workspace_comments(this.__wbg_ptr, ptr0, len0);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	format_ir(contents) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.workspace_format_ir(this.__wbg_ptr, ptr0, len0);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
};
if (Symbol.dispose) Workspace.prototype[Symbol.dispose] = Workspace.prototype.free;
const EXPECTED_RESPONSE_TYPES = new Set([
	"basic",
	"cors",
	"default"
]);
async function __wbg_load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && EXPECTED_RESPONSE_TYPES.has(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
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
function __wbg_get_imports() {
	const imports = {};
	imports.wbg = {};
	imports.wbg.__wbg_Error_e83987f665cf5504 = function(arg0, arg1) {
		return Error(getStringFromWasm0(arg0, arg1));
	};
	imports.wbg.__wbg_Number_bb48ca12f395cd08 = function(arg0) {
		return Number(arg0);
	};
	imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
		const ptr1 = passStringToWasm0(String(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len1 = WASM_VECTOR_LEN;
		getDataViewMemory0().setInt32(arg0 + 4, len1, true);
		getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
	};
	imports.wbg.__wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd = function(arg0, arg1) {
		const v = arg1;
		const ret = typeof v === "bigint" ? v : void 0;
		getDataViewMemory0().setBigInt64(arg0 + 8, isLikeNone(ret) ? BigInt(0) : ret, true);
		getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
	};
	imports.wbg.__wbg___wbindgen_boolean_get_6d5a1ee65bab5f68 = function(arg0) {
		const v = arg0;
		const ret = typeof v === "boolean" ? v : void 0;
		return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
	};
	imports.wbg.__wbg___wbindgen_debug_string_df47ffb5e35e6763 = function(arg0, arg1) {
		const ptr1 = passStringToWasm0(debugString(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len1 = WASM_VECTOR_LEN;
		getDataViewMemory0().setInt32(arg0 + 4, len1, true);
		getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
	};
	imports.wbg.__wbg___wbindgen_in_bb933bd9e1b3bc0f = function(arg0, arg1) {
		return arg0 in arg1;
	};
	imports.wbg.__wbg___wbindgen_is_bigint_cb320707dcd35f0b = function(arg0) {
		return typeof arg0 === "bigint";
	};
	imports.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(arg0) {
		return typeof arg0 === "function";
	};
	imports.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(arg0) {
		const val = arg0;
		return typeof val === "object" && val !== null;
	};
	imports.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(arg0) {
		return typeof arg0 === "string";
	};
	imports.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(arg0) {
		return arg0 === void 0;
	};
	imports.wbg.__wbg___wbindgen_jsval_eq_6b13ab83478b1c50 = function(arg0, arg1) {
		return arg0 === arg1;
	};
	imports.wbg.__wbg___wbindgen_jsval_loose_eq_b664b38a2f582147 = function(arg0, arg1) {
		return arg0 == arg1;
	};
	imports.wbg.__wbg___wbindgen_number_get_a20bf9b85341449d = function(arg0, arg1) {
		const obj = arg1;
		const ret = typeof obj === "number" ? obj : void 0;
		getDataViewMemory0().setFloat64(arg0 + 8, isLikeNone(ret) ? 0 : ret, true);
		getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
	};
	imports.wbg.__wbg___wbindgen_string_get_e4f06c90489ad01b = function(arg0, arg1) {
		const obj = arg1;
		const ret = typeof obj === "string" ? obj : void 0;
		var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		var len1 = WASM_VECTOR_LEN;
		getDataViewMemory0().setInt32(arg0 + 4, len1, true);
		getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
	};
	imports.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(arg0, arg1) {
		throw new Error(getStringFromWasm0(arg0, arg1));
	};
	imports.wbg.__wbg_call_e762c39fa8ea36bf = function() {
		return handleError(function(arg0, arg1) {
			return arg0.call(arg1);
		}, arguments);
	};
	imports.wbg.__wbg_codePointAt_01a186303396f7ad = function(arg0, arg1) {
		return arg0.codePointAt(arg1 >>> 0);
	};
	imports.wbg.__wbg_debug_f4b0c59db649db48 = function(arg0) {
		console.debug(arg0);
	};
	imports.wbg.__wbg_done_2042aa2670fb1db1 = function(arg0) {
		return arg0.done;
	};
	imports.wbg.__wbg_entries_e171b586f8f6bdbf = function(arg0) {
		return Object.entries(arg0);
	};
	imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
		let deferred0_0;
		let deferred0_1;
		try {
			deferred0_0 = arg0;
			deferred0_1 = arg1;
			console.error(getStringFromWasm0(arg0, arg1));
		} finally {
			wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
		}
	};
	imports.wbg.__wbg_error_a7f8fbb0523dae15 = function(arg0) {
		console.error(arg0);
	};
	imports.wbg.__wbg_fromCodePoint_a1c5bb992dc05846 = function() {
		return handleError(function(arg0) {
			return String.fromCodePoint(arg0 >>> 0);
		}, arguments);
	};
	imports.wbg.__wbg_get_7bed016f185add81 = function(arg0, arg1) {
		return arg0[arg1 >>> 0];
	};
	imports.wbg.__wbg_get_efcb449f58ec27c2 = function() {
		return handleError(function(arg0, arg1) {
			return Reflect.get(arg0, arg1);
		}, arguments);
	};
	imports.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe = function(arg0, arg1) {
		return arg0[arg1];
	};
	imports.wbg.__wbg_info_e674a11f4f50cc0c = function(arg0) {
		console.info(arg0);
	};
	imports.wbg.__wbg_instanceof_ArrayBuffer_70beb1189ca63b38 = function(arg0) {
		let result;
		try {
			result = arg0 instanceof ArrayBuffer;
		} catch (_) {
			result = false;
		}
		return result;
	};
	imports.wbg.__wbg_instanceof_Map_8579b5e2ab5437c7 = function(arg0) {
		let result;
		try {
			result = arg0 instanceof Map;
		} catch (_) {
			result = false;
		}
		return result;
	};
	imports.wbg.__wbg_instanceof_Uint8Array_20c8e73002f7af98 = function(arg0) {
		let result;
		try {
			result = arg0 instanceof Uint8Array;
		} catch (_) {
			result = false;
		}
		return result;
	};
	imports.wbg.__wbg_isArray_96e0af9891d0945d = function(arg0) {
		return Array.isArray(arg0);
	};
	imports.wbg.__wbg_isSafeInteger_d216eda7911dde36 = function(arg0) {
		return Number.isSafeInteger(arg0);
	};
	imports.wbg.__wbg_iterator_e5822695327a3c39 = function() {
		return Symbol.iterator;
	};
	imports.wbg.__wbg_length_69bca3cb64fc8748 = function(arg0) {
		return arg0.length;
	};
	imports.wbg.__wbg_length_a95b69f903b746c4 = function(arg0) {
		return arg0.length;
	};
	imports.wbg.__wbg_length_cdd215e10d9dd507 = function(arg0) {
		return arg0.length;
	};
	imports.wbg.__wbg_log_8cec76766b8c0e33 = function(arg0) {
		console.log(arg0);
	};
	imports.wbg.__wbg_new_1acc0b6eea89d040 = function() {
		return /* @__PURE__ */ new Object();
	};
	imports.wbg.__wbg_new_5a79be3ab53b8aa5 = function(arg0) {
		return new Uint8Array(arg0);
	};
	imports.wbg.__wbg_new_68651c719dcda04e = function() {
		return /* @__PURE__ */ new Map();
	};
	imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
		return /* @__PURE__ */ new Error();
	};
	imports.wbg.__wbg_new_a7442b4b19c1a356 = function(arg0, arg1) {
		return new Error(getStringFromWasm0(arg0, arg1));
	};
	imports.wbg.__wbg_new_e17d9f43105b08be = function() {
		return new Array();
	};
	imports.wbg.__wbg_next_020810e0ae8ebcb0 = function() {
		return handleError(function(arg0) {
			return arg0.next();
		}, arguments);
	};
	imports.wbg.__wbg_next_2c826fe5dfec6b6a = function(arg0) {
		return arg0.next;
	};
	imports.wbg.__wbg_now_793306c526e2e3b6 = function() {
		return Date.now();
	};
	imports.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(arg0, arg1, arg2) {
		Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
	};
	imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
		arg0[arg1] = arg2;
	};
	imports.wbg.__wbg_set_907fb406c34a251d = function(arg0, arg1, arg2) {
		return arg0.set(arg1, arg2);
	};
	imports.wbg.__wbg_set_c213c871859d6500 = function(arg0, arg1, arg2) {
		arg0[arg1 >>> 0] = arg2;
	};
	imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
		const ret = arg1.stack;
		const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len1 = WASM_VECTOR_LEN;
		getDataViewMemory0().setInt32(arg0 + 4, len1, true);
		getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
	};
	imports.wbg.__wbg_value_692627309814bb8c = function(arg0) {
		return arg0.value;
	};
	imports.wbg.__wbg_warn_1d74dddbe2fd1dbb = function(arg0) {
		console.warn(arg0);
	};
	imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
		return getStringFromWasm0(arg0, arg1);
	};
	imports.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(arg0) {
		return BigInt.asUintN(64, arg0);
	};
	imports.wbg.__wbindgen_cast_9ae0607507abb057 = function(arg0) {
		return arg0;
	};
	imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
		return arg0;
	};
	imports.wbg.__wbindgen_init_externref_table = function() {
		const table = wasm.__wbindgen_externrefs;
		const offset = table.grow(4);
		table.set(0, void 0);
		table.set(offset + 0, void 0);
		table.set(offset + 1, null);
		table.set(offset + 2, true);
		table.set(offset + 3, false);
	};
	return imports;
}
function __wbg_finalize_init(instance, module) {
	wasm = instance.exports;
	__wbg_init.__wbindgen_wasm_module = module;
	cachedDataViewMemory0 = null;
	cachedUint8ArrayMemory0 = null;
	wasm.__wbindgen_start();
	return wasm;
}
async function __wbg_init(module_or_path) {
	if (wasm !== void 0) return wasm;
	if (typeof module_or_path !== "undefined") if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
	else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	if (typeof module_or_path === "undefined") module_or_path = new URL("" + new URL("ruff_wasm_bg-JJ-lBl41.wasm", import.meta.url).href, "" + import.meta.url);
	const imports = __wbg_get_imports();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load(await module_or_path, imports);
	return __wbg_finalize_init(instance, module);
}
var ruff_wasm_default = __wbg_init;
var PythonService = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.defaultOptions = {
			"line-length": 88,
			"indent-width": 4,
			format: {
				"indent-style": "space",
				"quote-style": "double"
			},
			lint: { select: [
				"E4",
				"E7",
				"E9",
				"F"
			] }
		};
		this.serviceCapabilities = {
			diagnosticProvider: {
				interFileDependencies: true,
				workspaceDiagnostics: true
			},
			documentFormattingProvider: true
		};
	}
	async init() {
		this.initOutput = await ruff_wasm_default();
		this.currentOptions = this.getOption("", "configuration");
		this.currentOptions = this.currentOptions ? mergeObjects(this.currentOptions, this.defaultOptions) : this.defaultOptions;
		this.$service = new Workspace(this.currentOptions, 1);
	}
	setFormattingOptions(options) {
		const indentStyle = options.insertSpaces ? "space" : "tab";
		if (this.currentOptions["indent-width"] != options.tabSize || this.currentOptions.format["indent-style"] != indentStyle) {
			this.currentOptions["indent-width"] = options.tabSize;
			this.currentOptions.format["indent-style"] = indentStyle;
		}
		this.$service = new Workspace(this.currentOptions, 1);
	}
	async doValidation(document) {
		let value = this.getDocumentValue(document.uri);
		if (!value) return [];
		if (!this.initOutput) await this.init();
		return toDiagnostics(this.$service.check(value), this.optionsToFilterDiagnostics);
	}
	async format(document, range, options) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return Promise.resolve([]);
		if (!this.initOutput) await this.init();
		const text = fullDocument.getText(range);
		this.setFormattingOptions(options);
		try {
			const output = this.$service.format(text);
			return Promise.resolve(toTextEdits(output, range));
		} catch (e) {
			console.log(e);
			return Promise.resolve([]);
		}
	}
};
export { PythonService };
