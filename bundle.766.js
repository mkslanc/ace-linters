/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 70766:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5224);
/* harmony import */ var vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10152);
/* harmony import */ var vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ace_linters_build_json_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68765);
/* harmony import */ var ace_linters_build_json_service__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ace_linters_build_json_service__WEBPACK_IMPORTED_MODULE_2__);



const worker = self;
const conn = (0,vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__.createProtocolConnection)(new vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserMessageReader(worker), new vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserMessageWriter(worker));
let jsonService = new ace_linters_build_json_service__WEBPACK_IMPORTED_MODULE_2__.JsonService("json");
conn.onRequest(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.InitializeRequest.type, (_params)=>{
    return {
        capabilities: {
            textDocumentSync: vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true
            },
            hoverProvider: true
        }
    };
});
conn.onNotification(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.DidOpenTextDocumentNotification.type, (params)=>{
    jsonService.addDocument(params.textDocument);
    doValidation(params.textDocument);
});
conn.onNotification(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.DidChangeTextDocumentNotification.type, (params)=>{
    jsonService.applyDeltas(params.textDocument, params.contentChanges);
    doValidation(params.textDocument);
});
conn.onRequest(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.CompletionRequest.type, async (params)=>{
    return jsonService.doComplete(params.textDocument, params.position);
});
conn.onRequest(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.HoverRequest.type, async (params)=>{
    return jsonService.doHover(params.textDocument, params.position);
});
conn.onRequest(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.CompletionResolveRequest.type, async (item)=>{
    return jsonService.doResolve(item);
});
conn.onRequest(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.DocumentRangeFormattingRequest.type, async (params)=>{
    return jsonService.format(params.textDocument, params.range, params.options);
});
conn.listen();
async function doValidation(document) {
    let diagnostics = await jsonService.doValidation(document);
    sendDiagnostics(document, diagnostics);
}
function sendDiagnostics(document, diagnostics) {
    conn.sendNotification(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__.PublishDiagnosticsNotification.type, {
        uri: document.uri,
        diagnostics
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [5224,8765], () => (__webpack_require__(70766)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "bundle." + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			766: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all([
/******/ 				__webpack_require__.e(5224),
/******/ 				__webpack_require__.e(8765)
/******/ 			]).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjs7Ozs7V0NSQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7Ozs7O1dDcENBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRU5BO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvZGVtby93ZWJ3b3JrZXItanNvbi1ycGMvd2Vid29ya2VyLnRzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvaW1wb3J0U2NyaXB0cyBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL3N0YXJ0dXAgY2h1bmsgZGVwZW5kZW5jaWVzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbixcbiAgICBCcm93c2VyTWVzc2FnZVJlYWRlcixcbiAgICBCcm93c2VyTWVzc2FnZVdyaXRlcixcbn0gZnJvbSBcInZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbC9icm93c2VyXCI7XG5pbXBvcnQge1xuICAgIENvbXBsZXRpb25SZXF1ZXN0LFxuICAgIENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCxcbiAgICBEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24sXG4gICAgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbixcbiAgICBIb3ZlclJlcXVlc3QsXG4gICAgSG92ZXJQYXJhbXMsXG4gICAgSW5pdGlhbGl6ZVJlcXVlc3QsXG4gICAgSW5pdGlhbGl6ZVJlc3VsdCxcbiAgICBUZXh0RG9jdW1lbnRTeW5jS2luZCxcbiAgICBDb21wbGV0aW9uSXRlbSxcbiAgICBEaWRPcGVuVGV4dERvY3VtZW50UGFyYW1zLFxuICAgIERpZENoYW5nZVRleHREb2N1bWVudFBhcmFtcyxcbiAgICBDb21wbGV0aW9uUGFyYW1zLFxuICAgIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdCxcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1BhcmFtcyxcbiAgICBQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24sXG4gICAgRGlhZ25vc3RpYyxcbiAgICBUZXh0RG9jdW1lbnRcbn0gZnJvbSBcInZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbFwiO1xuaW1wb3J0IHtKc29uU2VydmljZX0gZnJvbSBcImFjZS1saW50ZXJzL2J1aWxkL2pzb24tc2VydmljZVwiO1xuXG5jb25zdCB3b3JrZXI6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xuY29uc3QgY29ubiA9IGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbihcbiAgICBuZXcgQnJvd3Nlck1lc3NhZ2VSZWFkZXIod29ya2VyKSxcbiAgICBuZXcgQnJvd3Nlck1lc3NhZ2VXcml0ZXIod29ya2VyKVxuKTtcblxubGV0IGpzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlKFwianNvblwiKTtcbmNvbm4ub25SZXF1ZXN0KEluaXRpYWxpemVSZXF1ZXN0LnR5cGUsIChfcGFyYW1zKTogSW5pdGlhbGl6ZVJlc3VsdCA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FwYWJpbGl0aWVzOiB7XG4gICAgICAgICAgICB0ZXh0RG9jdW1lbnRTeW5jOiBUZXh0RG9jdW1lbnRTeW5jS2luZC5JbmNyZW1lbnRhbCxcbiAgICAgICAgICAgIGNvbXBsZXRpb25Qcm92aWRlcjoge1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm92aWRlcjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3ZlclByb3ZpZGVyOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH07XG59KTtcbmNvbm4ub25Ob3RpZmljYXRpb24oXG4gICAgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlLFxuICAgIChwYXJhbXM6IERpZE9wZW5UZXh0RG9jdW1lbnRQYXJhbXMpID0+IHtcbiAgICAgICAganNvblNlcnZpY2UuYWRkRG9jdW1lbnQocGFyYW1zLnRleHREb2N1bWVudCk7XG4gICAgICAgIGRvVmFsaWRhdGlvbihwYXJhbXMudGV4dERvY3VtZW50KTtcbiAgICB9XG4pO1xuY29ubi5vbk5vdGlmaWNhdGlvbihcbiAgICBEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24udHlwZSxcbiAgICAocGFyYW1zOiBEaWRDaGFuZ2VUZXh0RG9jdW1lbnRQYXJhbXMpID0+IHtcbiAgICAgICAganNvblNlcnZpY2UuYXBwbHlEZWx0YXMocGFyYW1zLnRleHREb2N1bWVudCwgcGFyYW1zLmNvbnRlbnRDaGFuZ2VzKTtcbiAgICAgICAgZG9WYWxpZGF0aW9uKHBhcmFtcy50ZXh0RG9jdW1lbnQpO1xuICAgIH1cbik7XG5jb25uLm9uUmVxdWVzdChDb21wbGV0aW9uUmVxdWVzdC50eXBlLCBhc3luYyAocGFyYW1zOiBDb21wbGV0aW9uUGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIGpzb25TZXJ2aWNlLmRvQ29tcGxldGUoXG4gICAgICAgIHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5wb3NpdGlvblxuICAgICk7XG59KTtcbmNvbm4ub25SZXF1ZXN0KEhvdmVyUmVxdWVzdC50eXBlLCBhc3luYyAocGFyYW1zOiBIb3ZlclBhcmFtcykgPT4ge1xuICAgIHJldHVybiBqc29uU2VydmljZS5kb0hvdmVyKHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5wb3NpdGlvbik7XG59KTtcbmNvbm4ub25SZXF1ZXN0KENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC50eXBlLCBhc3luYyAoaXRlbTogQ29tcGxldGlvbkl0ZW0pID0+IHtcbiAgICByZXR1cm4ganNvblNlcnZpY2UuZG9SZXNvbHZlKGl0ZW0pO1xufSk7XG5jb25uLm9uUmVxdWVzdChEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QudHlwZSwgYXN5bmMgKHBhcmFtczogRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQYXJhbXMpID0+IHtcbiAgICByZXR1cm4ganNvblNlcnZpY2UuZm9ybWF0KHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5yYW5nZSwgcGFyYW1zLm9wdGlvbnMpO1xufSk7XG5cbmNvbm4ubGlzdGVuKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVmFsaWRhdGlvbihkb2N1bWVudCkge1xuICAgIGxldCBkaWFnbm9zdGljcyA9IGF3YWl0IGpzb25TZXJ2aWNlLmRvVmFsaWRhdGlvbihkb2N1bWVudCk7XG4gICAgc2VuZERpYWdub3N0aWNzKGRvY3VtZW50LCBkaWFnbm9zdGljcyk7XG59XG5cbmZ1bmN0aW9uIHNlbmREaWFnbm9zdGljcyhkb2N1bWVudDogVGV4dERvY3VtZW50LCBkaWFnbm9zdGljczogRGlhZ25vc3RpY1tdKTogdm9pZCB7XG4gICAgY29ubi5zZW5kTm90aWZpY2F0aW9uKFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbi50eXBlLCB7XG4gICAgICAgIHVyaTogZG9jdW1lbnQudXJpLCBkaWFnbm9zdGljc1xuICAgIH0pXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbNTIyNCw4NzY1XSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oNzA3NjYpKSlcblx0X193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcblx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG59O1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3MgYW5kIHNpYmxpbmcgY2h1bmtzIGZvciB0aGUgZW50cnlwb2ludFxuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImJ1bmRsZS5cIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgY2h1bmtzXG4vLyBcIjFcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdDc2NjogMVxufTtcblxuLy8gaW1wb3J0U2NyaXB0cyBjaHVuayBsb2FkaW5nXG52YXIgaW5zdGFsbENodW5rID0gKGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR3aGlsZShjaHVua0lkcy5sZW5ndGgpXG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzLnBvcCgpXSA9IDE7XG5cdHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xufTtcbl9fd2VicGFja19yZXF1aXJlX18uZi5pID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGltcG9ydFNjcmlwdHMoX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYWNlX2xpbnRlcnNfcm9vdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthY2VfbGludGVyc19yb290XCJdIHx8IFtdO1xudmFyIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uID0gY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSBpbnN0YWxsQ2h1bms7XG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJ2YXIgbmV4dCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoNTIyNCksXG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKDg3NjUpXG5cdF0pLnRoZW4obmV4dCk7XG59OyIsIiIsIi8vIHJ1biBzdGFydHVwXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIiwiIl0sIm5hbWVzIjpbImNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbiIsIkJyb3dzZXJNZXNzYWdlUmVhZGVyIiwiQnJvd3Nlck1lc3NhZ2VXcml0ZXIiLCJDb21wbGV0aW9uUmVxdWVzdCIsIkNvbXBsZXRpb25SZXNvbHZlUmVxdWVzdCIsIkRpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbiIsIkRpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24iLCJIb3ZlclJlcXVlc3QiLCJJbml0aWFsaXplUmVxdWVzdCIsIlRleHREb2N1bWVudFN5bmNLaW5kIiwiRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0IiwiUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uIiwiSnNvblNlcnZpY2UiLCJ3b3JrZXIiLCJzZWxmIiwiY29ubiIsImpzb25TZXJ2aWNlIiwib25SZXF1ZXN0IiwidHlwZSIsIl9wYXJhbXMiLCJjYXBhYmlsaXRpZXMiLCJ0ZXh0RG9jdW1lbnRTeW5jIiwiSW5jcmVtZW50YWwiLCJjb21wbGV0aW9uUHJvdmlkZXIiLCJyZXNvbHZlUHJvdmlkZXIiLCJob3ZlclByb3ZpZGVyIiwib25Ob3RpZmljYXRpb24iLCJwYXJhbXMiLCJhZGREb2N1bWVudCIsInRleHREb2N1bWVudCIsImRvVmFsaWRhdGlvbiIsImFwcGx5RGVsdGFzIiwiY29udGVudENoYW5nZXMiLCJkb0NvbXBsZXRlIiwicG9zaXRpb24iLCJkb0hvdmVyIiwiaXRlbSIsImRvUmVzb2x2ZSIsImZvcm1hdCIsInJhbmdlIiwib3B0aW9ucyIsImxpc3RlbiIsImRvY3VtZW50IiwiZGlhZ25vc3RpY3MiLCJzZW5kRGlhZ25vc3RpY3MiLCJzZW5kTm90aWZpY2F0aW9uIiwidXJpIl0sInNvdXJjZVJvb3QiOiIifQ==