/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 53135:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85678);
/* harmony import */ var vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode_languageserver_protocol_browser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54512);
/* harmony import */ var vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vscode_languageserver_protocol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ace_linters_build_json_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53258);
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [5678,3258], () => (__webpack_require__(53135)))
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
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
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
/******/ 			3135: 1
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
/******/ 				__webpack_require__.e(5678),
/******/ 				__webpack_require__.e(3258)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7Ozs7O1dDUkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxhQUFhO1dBQ2I7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBOztXQUVBOzs7OztXQ3BDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVOQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL3BhY2thZ2VzL2RlbW8vd2Vid29ya2VyLWpzb24tcnBjL3dlYndvcmtlci50cyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2ltcG9ydFNjcmlwdHMgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9zdGFydHVwIGNodW5rIGRlcGVuZGVuY2llcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBjcmVhdGVQcm90b2NvbENvbm5lY3Rpb24sXG4gICAgQnJvd3Nlck1lc3NhZ2VSZWFkZXIsXG4gICAgQnJvd3Nlck1lc3NhZ2VXcml0ZXIsXG59IGZyb20gXCJ2c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2wvYnJvd3NlclwiO1xuaW1wb3J0IHtcbiAgICBDb21wbGV0aW9uUmVxdWVzdCxcbiAgICBDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QsXG4gICAgRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLFxuICAgIERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24sXG4gICAgSG92ZXJSZXF1ZXN0LFxuICAgIEhvdmVyUGFyYW1zLFxuICAgIEluaXRpYWxpemVSZXF1ZXN0LFxuICAgIEluaXRpYWxpemVSZXN1bHQsXG4gICAgVGV4dERvY3VtZW50U3luY0tpbmQsXG4gICAgQ29tcGxldGlvbkl0ZW0sXG4gICAgRGlkT3BlblRleHREb2N1bWVudFBhcmFtcyxcbiAgICBEaWRDaGFuZ2VUZXh0RG9jdW1lbnRQYXJhbXMsXG4gICAgQ29tcGxldGlvblBhcmFtcyxcbiAgICBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QsXG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQYXJhbXMsXG4gICAgUHVibGlzaERpYWdub3N0aWNzTm90aWZpY2F0aW9uLFxuICAgIERpYWdub3N0aWMsXG4gICAgVGV4dERvY3VtZW50XG59IGZyb20gXCJ2c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItcHJvdG9jb2xcIjtcbmltcG9ydCB7SnNvblNlcnZpY2V9IGZyb20gXCJhY2UtbGludGVycy9idWlsZC9qc29uLXNlcnZpY2VcIjtcblxuY29uc3Qgd29ya2VyOiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcbmNvbnN0IGNvbm4gPSBjcmVhdGVQcm90b2NvbENvbm5lY3Rpb24oXG4gICAgbmV3IEJyb3dzZXJNZXNzYWdlUmVhZGVyKHdvcmtlciksXG4gICAgbmV3IEJyb3dzZXJNZXNzYWdlV3JpdGVyKHdvcmtlcilcbik7XG5cbmxldCBqc29uU2VydmljZSA9IG5ldyBKc29uU2VydmljZShcImpzb25cIik7XG5jb25uLm9uUmVxdWVzdChJbml0aWFsaXplUmVxdWVzdC50eXBlLCAoX3BhcmFtcyk6IEluaXRpYWxpemVSZXN1bHQgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNhcGFiaWxpdGllczoge1xuICAgICAgICAgICAgdGV4dERvY3VtZW50U3luYzogVGV4dERvY3VtZW50U3luY0tpbmQuSW5jcmVtZW50YWwsXG4gICAgICAgICAgICBjb21wbGV0aW9uUHJvdmlkZXI6IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlUHJvdmlkZXI6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaG92ZXJQcm92aWRlcjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9O1xufSk7XG5jb25uLm9uTm90aWZpY2F0aW9uKFxuICAgIERpZE9wZW5UZXh0RG9jdW1lbnROb3RpZmljYXRpb24udHlwZSxcbiAgICAocGFyYW1zOiBEaWRPcGVuVGV4dERvY3VtZW50UGFyYW1zKSA9PiB7XG4gICAgICAgIGpzb25TZXJ2aWNlLmFkZERvY3VtZW50KHBhcmFtcy50ZXh0RG9jdW1lbnQpO1xuICAgICAgICBkb1ZhbGlkYXRpb24ocGFyYW1zLnRleHREb2N1bWVudCk7XG4gICAgfVxuKTtcbmNvbm4ub25Ob3RpZmljYXRpb24oXG4gICAgRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLnR5cGUsXG4gICAgKHBhcmFtczogRGlkQ2hhbmdlVGV4dERvY3VtZW50UGFyYW1zKSA9PiB7XG4gICAgICAgIGpzb25TZXJ2aWNlLmFwcGx5RGVsdGFzKHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5jb250ZW50Q2hhbmdlcyk7XG4gICAgICAgIGRvVmFsaWRhdGlvbihwYXJhbXMudGV4dERvY3VtZW50KTtcbiAgICB9XG4pO1xuY29ubi5vblJlcXVlc3QoQ29tcGxldGlvblJlcXVlc3QudHlwZSwgYXN5bmMgKHBhcmFtczogQ29tcGxldGlvblBhcmFtcykgPT4ge1xuICAgIHJldHVybiBqc29uU2VydmljZS5kb0NvbXBsZXRlKFxuICAgICAgICBwYXJhbXMudGV4dERvY3VtZW50LCBwYXJhbXMucG9zaXRpb25cbiAgICApO1xufSk7XG5jb25uLm9uUmVxdWVzdChIb3ZlclJlcXVlc3QudHlwZSwgYXN5bmMgKHBhcmFtczogSG92ZXJQYXJhbXMpID0+IHtcbiAgICByZXR1cm4ganNvblNlcnZpY2UuZG9Ib3ZlcihwYXJhbXMudGV4dERvY3VtZW50LCBwYXJhbXMucG9zaXRpb24pO1xufSk7XG5jb25uLm9uUmVxdWVzdChDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QudHlwZSwgYXN5bmMgKGl0ZW06IENvbXBsZXRpb25JdGVtKSA9PiB7XG4gICAgcmV0dXJuIGpzb25TZXJ2aWNlLmRvUmVzb2x2ZShpdGVtKTtcbn0pO1xuY29ubi5vblJlcXVlc3QoRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0LnR5cGUsIGFzeW5jIChwYXJhbXM6IERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIGpzb25TZXJ2aWNlLmZvcm1hdChwYXJhbXMudGV4dERvY3VtZW50LCBwYXJhbXMucmFuZ2UsIHBhcmFtcy5vcHRpb25zKTtcbn0pO1xuXG5jb25uLmxpc3RlbigpO1xuXG5hc3luYyBmdW5jdGlvbiBkb1ZhbGlkYXRpb24oZG9jdW1lbnQpIHtcbiAgICBsZXQgZGlhZ25vc3RpY3MgPSBhd2FpdCBqc29uU2VydmljZS5kb1ZhbGlkYXRpb24oZG9jdW1lbnQpO1xuICAgIHNlbmREaWFnbm9zdGljcyhkb2N1bWVudCwgZGlhZ25vc3RpY3MpO1xufVxuXG5mdW5jdGlvbiBzZW5kRGlhZ25vc3RpY3MoZG9jdW1lbnQ6IFRleHREb2N1bWVudCwgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNbXSk6IHZvaWQge1xuICAgIGNvbm4uc2VuZE5vdGlmaWNhdGlvbihQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24udHlwZSwge1xuICAgICAgICB1cmk6IGRvY3VtZW50LnVyaSwgZGlhZ25vc3RpY3NcbiAgICB9KVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0Ly8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5cdHZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgWzU2NzgsMzI1OF0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDUzMTM1KSkpXG5cdF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG5cdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xufTtcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJidW5kbGUuXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgY2h1bmtzXG4vLyBcIjFcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdDMxMzU6IDFcbn07XG5cbi8vIGltcG9ydFNjcmlwdHMgY2h1bmsgbG9hZGluZ1xudmFyIGluc3RhbGxDaHVuayA9IChkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0d2hpbGUoY2h1bmtJZHMubGVuZ3RoKVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkcy5wb3AoKV0gPSAxO1xuXHRwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaSA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHQvLyBcIjFcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcblx0aWYoIWluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRpbXBvcnRTY3JpcHRzKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKSk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2FjZV9saW50ZXJzX3Jvb3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYWNlX2xpbnRlcnNfcm9vdFwiXSB8fCBbXTtcbnZhciBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiA9IGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gaW5zdGFsbENodW5rO1xuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0IiwidmFyIG5leHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChbXG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKDU2NzgpLFxuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZSgzMjU4KVxuXHRdKS50aGVuKG5leHQpO1xufTsiLCIiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiIsIiJdLCJuYW1lcyI6WyJjcmVhdGVQcm90b2NvbENvbm5lY3Rpb24iLCJCcm93c2VyTWVzc2FnZVJlYWRlciIsIkJyb3dzZXJNZXNzYWdlV3JpdGVyIiwiQ29tcGxldGlvblJlcXVlc3QiLCJDb21wbGV0aW9uUmVzb2x2ZVJlcXVlc3QiLCJEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24iLCJEaWRPcGVuVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uIiwiSG92ZXJSZXF1ZXN0IiwiSW5pdGlhbGl6ZVJlcXVlc3QiLCJUZXh0RG9jdW1lbnRTeW5jS2luZCIsIkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUmVxdWVzdCIsIlB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbiIsIkpzb25TZXJ2aWNlIiwid29ya2VyIiwic2VsZiIsImNvbm4iLCJqc29uU2VydmljZSIsIm9uUmVxdWVzdCIsInR5cGUiLCJfcGFyYW1zIiwiY2FwYWJpbGl0aWVzIiwidGV4dERvY3VtZW50U3luYyIsIkluY3JlbWVudGFsIiwiY29tcGxldGlvblByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiaG92ZXJQcm92aWRlciIsIm9uTm90aWZpY2F0aW9uIiwicGFyYW1zIiwiYWRkRG9jdW1lbnQiLCJ0ZXh0RG9jdW1lbnQiLCJkb1ZhbGlkYXRpb24iLCJhcHBseURlbHRhcyIsImNvbnRlbnRDaGFuZ2VzIiwiZG9Db21wbGV0ZSIsInBvc2l0aW9uIiwiZG9Ib3ZlciIsIml0ZW0iLCJkb1Jlc29sdmUiLCJmb3JtYXQiLCJyYW5nZSIsIm9wdGlvbnMiLCJsaXN0ZW4iLCJkb2N1bWVudCIsImRpYWdub3N0aWNzIiwic2VuZERpYWdub3N0aWNzIiwic2VuZE5vdGlmaWNhdGlvbiIsInVyaSJdLCJzb3VyY2VSb290IjoiIn0=