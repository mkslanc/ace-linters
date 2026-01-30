import { t as BaseService } from "./base-service-DFS-lxq7.js";
function format$1(wasm$1, source) {
	try {
		writeStringToWasmMemory(wasm$1, source);
		const result = wasm$1.format();
		if (result === 0) return source;
		const text = readStringFromWasmMemory(wasm$1, wasm$1.output_ptr(), wasm$1.output_len());
		if (result === 1) return text;
		throw new Error(text);
	} finally {
		wasm$1.dispose();
	}
}
function writeStringToWasmMemory(wasm$1, str) {
	const bytes = encoder.encode(str);
	const ptr = wasm$1.alloc(bytes.length);
	new Uint8Array(wasm$1.memory.buffer, ptr, bytes.length).set(bytes);
}
function readStringFromWasmMemory(wasm$1, ptr, length) {
	const memory = new Uint8Array(wasm$1.memory.buffer, ptr, length);
	return decoder.decode(memory);
}
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let wasm;
async function load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
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
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
function finalize_init(instance, module) {
	wasm = instance.exports;
	wasm._initialize();
	return wasm;
}
async function initAsync(init_input) {
	if (wasm !== void 0) return wasm;
	if (init_input === void 0) init_input = new URL("" + new URL("gofmt-jeD1_34G.wasm", import.meta.url).href, "" + import.meta.url);
	if (typeof init_input === "string" || typeof Request === "function" && init_input instanceof Request || typeof URL === "function" && init_input instanceof URL) init_input = fetch(init_input);
	const { instance, module } = await load(await init_input);
	return finalize_init(instance, module);
}
function format(source) {
	return format$1(wasm, source);
}
function toTextEdits(input, range) {
	return [{
		range,
		newText: input
	}];
}
var AceGoLinter = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.inited = false;
		this.serviceCapabilities = {
			documentFormattingProvider: true,
			rangeFormattingProvider: true
		};
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
			const output = format(text);
			return Promise.resolve(toTextEdits(output, range));
		} catch (e) {
			console.log(e);
			return Promise.resolve([]);
		}
	}
};
export { AceGoLinter };
