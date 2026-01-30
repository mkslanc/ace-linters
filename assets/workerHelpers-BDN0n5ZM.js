function waitForMsgType(target, type) {
	return new Promise((resolve) => {
		target.addEventListener("message", function onMsg({ data }) {
			if (data == null || data.type !== type) return;
			target.removeEventListener("message", onMsg);
			resolve(data);
		});
	});
}
waitForMsgType(self, "wasm_bindgen_worker_init").then(async (data) => {
	const pkg = await import("./wasm_demo-Y5p3fD8Z.js");
	await pkg.default(data.module, data.memory);
	postMessage({ type: "wasm_bindgen_worker_ready" });
	pkg.wbg_rayon_start_worker(data.receiver);
});
async function startWorkers(module, memory, builder) {
	const workerInit = {
		type: "wasm_bindgen_worker_init",
		module,
		memory,
		receiver: builder.receiver()
	};
	await Promise.all(Array.from({ length: builder.numThreads() }, async () => {
		const worker = new Worker(self.location.href, { type: "module" });
		worker.postMessage(workerInit);
		await waitForMsgType(worker, "wasm_bindgen_worker_ready");
		return worker;
	}));
	builder.build();
}
export { startWorkers as t };
