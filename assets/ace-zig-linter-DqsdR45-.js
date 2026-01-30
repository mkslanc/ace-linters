import { t as BaseService } from "./base-service-DFS-lxq7.js";
let wasm;
async function init(input) {
	if (wasm !== void 0) return wasm;
	if (typeof input === "undefined") input = new URL("" + new URL("zig_fmt-BT8k0kbH.wasm", import.meta.url).href, "" + import.meta.url);
	if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) input = fetch(input);
	const { instance, module } = await load(await input, {});
	return finalize_init(instance, module);
}
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
function finalize_init(instance, module) {
	wasm = instance.exports;
	return wasm;
}
const decoder = new TextDecoder();
const encoder = new TextEncoder();
function format(input) {
	const bytes = encoder.encode(input);
	const inputPtr = wasm.alloc(bytes.length);
	if (inputPtr === 0) throw new Error("Failed to allocate memory");
	new Uint8Array(wasm.memory.buffer, inputPtr, bytes.length).set(bytes);
	const [outPtr, outLen] = wasm.format(inputPtr, bytes.length);
	if (outPtr === 0) {
		wasm.free_all();
		throw new Error("Format failed");
	}
	const output = decoder.decode(new Uint8Array(wasm.memory.buffer, outPtr, outLen));
	wasm.free_all();
	return output;
}
function toTextEdits(input, range) {
	return [{
		range,
		newText: input
	}];
}
var AceZigLinter = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.inited = false;
		this.serviceCapabilities = {
			documentFormattingProvider: true,
			rangeFormattingProvider: true
		};
	}
	async init() {
		await init();
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
export { AceZigLinter };
