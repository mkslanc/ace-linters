//#region packages/demo/rust-analyzer/rust-service/pkg/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js
/**
* Copyright 2021 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
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
	const pkg = await import("./wasm_demo-acnPNXoL.js");
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
//#endregion
export { startWorkers };
