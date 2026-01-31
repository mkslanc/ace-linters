import { t as BaseService } from "./base-service-mjbaMWZI.js";
import { n as mergeObjects } from "./webworker-Dp8mZl3h.js";
var CompiledApp = class {
	constructor(module, builtins) {
		this.module = module;
		this.builtins = builtins;
	}
	instantiate(additionalImports, { loadDeferredWasm, loadDynamicModule } = {}) {
		let dartInstance;
		function printToConsole(value) {
			if (typeof dartPrint == "function") {
				dartPrint(value);
				return;
			}
			if (typeof console == "object" && typeof console.log != "undefined") {
				console.log(value);
				return;
			}
			if (typeof print == "function") {
				print(value);
				return;
			}
			throw "Unable to print message: " + value;
		}
		const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");
		function finalizeWrapper(dartFunction, wrapped) {
			wrapped.dartFunction = dartFunction;
			wrapped[jsWrappedDartFunctionSymbol] = true;
			return wrapped;
		}
		const baseImports = {
			dart2wasm: {
				_36: (x0) => new Array(x0),
				_38: (x0) => x0.length,
				_40: (x0, x1) => x0[x1],
				_41: (x0, x1, x2) => {
					x0[x1] = x2;
				},
				_45: (x0, x1, x2) => new DataView(x0, x1, x2),
				_47: (x0) => new Int8Array(x0),
				_48: (x0, x1, x2) => new Uint8Array(x0, x1, x2),
				_49: (x0) => new Uint8Array(x0),
				_51: (x0) => new Uint8ClampedArray(x0),
				_53: (x0) => new Int16Array(x0),
				_55: (x0) => new Uint16Array(x0),
				_57: (x0) => new Int32Array(x0),
				_59: (x0) => new Uint32Array(x0),
				_61: (x0) => new Float32Array(x0),
				_63: (x0) => new Float64Array(x0),
				_73: (s) => +s,
				_77: (s) => {
					if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) return NaN;
					return parseFloat(s);
				},
				_78: () => {
					let frames = (/* @__PURE__ */ new Error()).stack.toString().split("\n");
					let drop = 2;
					if (frames[0] === "Error") drop += 1;
					return frames.slice(drop).join("\n");
				},
				_82: () => {
					if (globalThis.location != null) return globalThis.location.href;
					return null;
				},
				_83: () => {
					return typeof process != "undefined" && Object.prototype.toString.call(process) == "[object process]" && process.platform == "win32";
				},
				_99: (s) => JSON.stringify(s),
				_100: (s) => printToConsole(s),
				_101: (o, p, r) => o.replaceAll(p, () => r),
				_103: Function.prototype.call.bind(String.prototype.toLowerCase),
				_104: (s) => s.toUpperCase(),
				_105: (s) => s.trim(),
				_108: (string, times) => string.repeat(times),
				_109: Function.prototype.call.bind(String.prototype.indexOf),
				_110: (s, p, i) => s.lastIndexOf(p, i),
				_111: (string, token) => string.split(token),
				_112: Object.is,
				_113: (o) => o instanceof Array,
				_123: (a, b) => a == b ? 0 : a > b ? 1 : -1,
				_124: (a) => a.length,
				_126: (a, i) => a[i],
				_127: (a, i, v) => a[i] = v,
				_132: (o) => o instanceof Uint8Array,
				_133: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
				_134: (o) => o instanceof Int8Array,
				_135: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
				_136: (o) => o instanceof Uint8ClampedArray,
				_137: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
				_138: (o) => o instanceof Uint16Array,
				_139: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
				_140: (o) => o instanceof Int16Array,
				_141: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
				_142: (o) => o instanceof Uint32Array,
				_143: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
				_144: (o) => o instanceof Int32Array,
				_145: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
				_148: (o) => o instanceof Float32Array,
				_149: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
				_150: (o) => o instanceof Float64Array,
				_151: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
				_152: (t, s) => t.set(s),
				_154: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
				_156: (o) => o.buffer,
				_157: (o) => o.byteOffset,
				_158: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, "byteLength").get),
				_159: (b, o) => new DataView(b, o),
				_160: (b, o, l) => new DataView(b, o, l),
				_161: Function.prototype.call.bind(DataView.prototype.getUint8),
				_162: Function.prototype.call.bind(DataView.prototype.setUint8),
				_163: Function.prototype.call.bind(DataView.prototype.getInt8),
				_164: Function.prototype.call.bind(DataView.prototype.setInt8),
				_165: Function.prototype.call.bind(DataView.prototype.getUint16),
				_166: Function.prototype.call.bind(DataView.prototype.setUint16),
				_167: Function.prototype.call.bind(DataView.prototype.getInt16),
				_168: Function.prototype.call.bind(DataView.prototype.setInt16),
				_169: Function.prototype.call.bind(DataView.prototype.getUint32),
				_170: Function.prototype.call.bind(DataView.prototype.setUint32),
				_171: Function.prototype.call.bind(DataView.prototype.getInt32),
				_172: Function.prototype.call.bind(DataView.prototype.setInt32),
				_177: Function.prototype.call.bind(DataView.prototype.getFloat32),
				_178: Function.prototype.call.bind(DataView.prototype.setFloat32),
				_179: Function.prototype.call.bind(DataView.prototype.getFloat64),
				_180: Function.prototype.call.bind(DataView.prototype.setFloat64),
				_181: () => /* @__PURE__ */ new Object(),
				_182: (x0, x1) => {
					x0.success = x1;
				},
				_183: (x0, x1) => {
					x0.code = x1;
				},
				_184: (x0, x1) => {
					x0.error = x1;
				},
				_185: (x0) => {
					this.format = x0;
				},
				_186: (f) => finalizeWrapper(f, function(x0, x1, x2) {
					return dartInstance.exports._186(f, arguments.length, x0, x1, x2);
				}),
				_203: (c) => queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
				_205: (s, m) => {
					try {
						return new RegExp(s, m);
					} catch (e) {
						return String(e);
					}
				},
				_206: (x0, x1) => x0.exec(x1),
				_207: (x0, x1) => x0.test(x1),
				_208: (x0) => x0.pop(),
				_210: (o) => o === void 0,
				_212: (o) => typeof o === "function" && o[jsWrappedDartFunctionSymbol] === true,
				_215: (o) => o instanceof RegExp,
				_216: (l, r) => l === r,
				_217: (o) => o,
				_218: (o) => o,
				_219: (o) => o,
				_220: (b) => !!b,
				_221: (o) => o.length,
				_223: (o, i) => o[i],
				_224: (f) => f.dartFunction,
				_231: (o, p) => o[p],
				_235: (o) => String(o),
				_236: (p, s, f) => p.then(s, (e) => f(e, e === void 0)),
				_237: (f) => finalizeWrapper(f, function(x0) {
					return dartInstance.exports._237(f, arguments.length, x0);
				}),
				_238: (f) => finalizeWrapper(f, function(x0, x1) {
					return dartInstance.exports._238(f, arguments.length, x0, x1);
				}),
				_239: (o) => {
					if (o === void 0) return 1;
					var type = typeof o;
					if (type === "boolean") return 2;
					if (type === "number") return 3;
					if (type === "string") return 4;
					if (o instanceof Array) return 5;
					if (ArrayBuffer.isView(o)) {
						if (o instanceof Int8Array) return 6;
						if (o instanceof Uint8Array) return 7;
						if (o instanceof Uint8ClampedArray) return 8;
						if (o instanceof Int16Array) return 9;
						if (o instanceof Uint16Array) return 10;
						if (o instanceof Int32Array) return 11;
						if (o instanceof Uint32Array) return 12;
						if (o instanceof Float32Array) return 13;
						if (o instanceof Float64Array) return 14;
						if (o instanceof DataView) return 15;
					}
					if (o instanceof ArrayBuffer) return 16;
					if (globalThis.SharedArrayBuffer !== void 0 && o instanceof SharedArrayBuffer) return 17;
					if (o instanceof Promise) return 18;
					return 19;
				},
				_244: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
					const getValue = dartInstance.exports.$wasmI8ArrayGet;
					for (let i = 0; i < length; i++) jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
				},
				_246: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
					const getValue = dartInstance.exports.$wasmI16ArrayGet;
					for (let i = 0; i < length; i++) jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
				},
				_248: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
					const getValue = dartInstance.exports.$wasmI32ArrayGet;
					for (let i = 0; i < length; i++) jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
				},
				_254: (x0) => new ArrayBuffer(x0),
				_257: (x0) => x0.index,
				_259: (x0) => x0.flags,
				_260: (x0) => x0.multiline,
				_261: (x0) => x0.ignoreCase,
				_262: (x0) => x0.unicode,
				_263: (x0) => x0.dotAll,
				_264: (x0, x1) => {
					x0.lastIndex = x1;
				},
				_269: (x0) => x0.random(),
				_272: () => globalThis.Math,
				_273: Function.prototype.call.bind(Number.prototype.toString),
				_274: Function.prototype.call.bind(BigInt.prototype.toString),
				_275: Function.prototype.call.bind(Number.prototype.toString)
			},
			Math,
			Date,
			Object,
			Array,
			Reflect,
			S: new Proxy({}, { get(_, prop) {
				return prop;
			} })
		};
		const jsStringPolyfill = {
			"charCodeAt": (s, i) => s.charCodeAt(i),
			"compare": (s1, s2) => {
				if (s1 < s2) return -1;
				if (s1 > s2) return 1;
				return 0;
			},
			"concat": (s1, s2) => s1 + s2,
			"equals": (s1, s2) => s1 === s2,
			"fromCharCode": (i) => String.fromCharCode(i),
			"length": (s) => s?.length || 0,
			"substring": (s, a, b) => s.substring(a, b),
			"fromCharCodeArray": (a, start, end) => {
				if (end <= start) return "";
				const read = dartInstance.exports.$wasmI16ArrayGet;
				let result = "";
				let index = start;
				const chunkLength = Math.min(end - index, 500);
				let array = new Array(chunkLength);
				while (index < end) {
					const newChunkLength = Math.min(end - index, 500);
					for (let i = 0; i < newChunkLength; i++) array[i] = read(a, index++);
					if (newChunkLength < chunkLength) array = array.slice(0, newChunkLength);
					result += String.fromCharCode(...array);
				}
				return result;
			},
			"intoCharCodeArray": (s, a, start) => {
				if (s === "") return 0;
				const write = dartInstance.exports.$wasmI16ArraySet;
				for (var i = 0; i < s.length; ++i) write(a, start++, s.charCodeAt(i));
				return s.length;
			},
			"test": (s) => typeof s == "string"
		};
		dartInstance = new WebAssembly.Instance(this.module, {
			...baseImports,
			...additionalImports,
			"wasm:js-string": jsStringPolyfill
		});
		return new InstantiatedApp(this, dartInstance);
	}
};
var InstantiatedApp = class {
	constructor(compiledApp, instantiatedModule) {
		this.compiledApp = compiledApp;
		this.instantiatedModule = instantiatedModule;
	}
	invokeMain(...args) {
		this.instantiatedModule.exports.$invokeMain(args);
	}
};
function initSync(module, compileOptions$1 = { builtins: ["js-string"] }) {
	const app$1 = new CompiledApp(module, compileOptions$1).instantiate();
	app$1.invokeMain();
	return app$1;
}
function formatWrapper(app$1, source, filename = "stdin.dart", config = {}) {
	const options = { lineEnding: "\n" };
	if (config.line_width) options.pageWidth = config.line_width;
	if (config.line_ending === "crlf") options.lineEnding = "\r\n";
	if (config.language_version) options.languageVersion = config.language_version;
	const result = app$1.compiledApp.format(source, filename, JSON.stringify(options));
	if (result.success) return result.code;
	throw new Error(result.error);
}
let app;
async function load(input) {
	if (typeof Response === "function" && input instanceof Response) {
		if (typeof WebAssembly.compileStreaming === "function") try {
			return await WebAssembly.compileStreaming(input, compileOptions);
		} catch (e) {
			if (input.ok && expectedResponseType(input.type) && input.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.compileStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
			else throw e;
		}
		const bytes = await input.arrayBuffer();
		return await WebAssembly.compile(bytes, compileOptions);
	} else return await WebAssembly.compile(input, compileOptions);
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
async function initAsync(init_input) {
	if (app !== void 0) return app;
	if (init_input === void 0) init_input = new URL("" + new URL("dart_fmt-BnZ4AJjv.wasm", import.meta.url).href, "" + import.meta.url);
	if (typeof init_input === "string" || typeof Request === "function" && init_input instanceof Request || typeof URL === "function" && init_input instanceof URL) init_input = fetch(init_input);
	return app = initSync(await load(await init_input), compileOptions);
}
function format(source, filename, options) {
	return formatWrapper(app, source, filename, options);
}
const compileOptions = { builtins: ["js-string"] };
function toTextEdits(input, range) {
	return [{
		range,
		newText: input
	}];
}
var AceDartLinter = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.inited = false;
		this.serviceCapabilities = {
			documentFormattingProvider: true,
			rangeFormattingProvider: true
		};
		this.$defaultFormatOptions = {
			line_width: 80,
			line_ending: "lf"
		};
	}
	getFormattingOptions(options) {
		return mergeObjects(this.globalOptions?.formatOptions, this.$defaultFormatOptions);
	}
	async init() {
		await initAsync();
		this.inited = true;
	}
	async format(document, range, options) {
		if (!this.inited) await this.init();
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return Promise.resolve([]);
		const text = fullDocument.getText(range);
		try {
			const output = format(text, document.uri, this.getFormattingOptions(options));
			return Promise.resolve(toTextEdits(output, range));
		} catch (e) {
			console.log(e);
			return Promise.resolve([]);
		}
	}
};
export { AceDartLinter };
