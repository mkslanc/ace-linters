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
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsYUFBYTtXQUNiO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7Ozs7V0NwQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFTkE7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9kZW1vL3dlYndvcmtlci1qc29uLXJwYy93ZWJ3b3JrZXIudHMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9pbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvc3RhcnR1cCBjaHVuayBkZXBlbmRlbmNpZXMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uLFxuICAgIEJyb3dzZXJNZXNzYWdlUmVhZGVyLFxuICAgIEJyb3dzZXJNZXNzYWdlV3JpdGVyLFxufSBmcm9tIFwidnNjb2RlLWxhbmd1YWdlc2VydmVyLXByb3RvY29sL2Jyb3dzZXJcIjtcbmltcG9ydCB7XG4gICAgQ29tcGxldGlvblJlcXVlc3QsXG4gICAgQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0LFxuICAgIERpZENoYW5nZVRleHREb2N1bWVudE5vdGlmaWNhdGlvbixcbiAgICBEaWRPcGVuVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uLFxuICAgIEhvdmVyUmVxdWVzdCxcbiAgICBIb3ZlclBhcmFtcyxcbiAgICBJbml0aWFsaXplUmVxdWVzdCxcbiAgICBJbml0aWFsaXplUmVzdWx0LFxuICAgIFRleHREb2N1bWVudFN5bmNLaW5kLFxuICAgIENvbXBsZXRpb25JdGVtLFxuICAgIERpZE9wZW5UZXh0RG9jdW1lbnRQYXJhbXMsXG4gICAgRGlkQ2hhbmdlVGV4dERvY3VtZW50UGFyYW1zLFxuICAgIENvbXBsZXRpb25QYXJhbXMsXG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdSZXF1ZXN0LFxuICAgIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUGFyYW1zLFxuICAgIFB1Ymxpc2hEaWFnbm9zdGljc05vdGlmaWNhdGlvbixcbiAgICBEaWFnbm9zdGljLFxuICAgIFRleHREb2N1bWVudElkZW50aWZpZXJcbn0gZnJvbSBcInZzY29kZS1sYW5ndWFnZXNlcnZlci1wcm90b2NvbFwiO1xuaW1wb3J0IHtKc29uU2VydmljZX0gZnJvbSBcImFjZS1saW50ZXJzL2J1aWxkL2pzb24tc2VydmljZVwiO1xuXG5jb25zdCB3b3JrZXI6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xuY29uc3QgY29ubiA9IGNyZWF0ZVByb3RvY29sQ29ubmVjdGlvbihcbiAgICBuZXcgQnJvd3Nlck1lc3NhZ2VSZWFkZXIod29ya2VyKSxcbiAgICBuZXcgQnJvd3Nlck1lc3NhZ2VXcml0ZXIod29ya2VyKVxuKTtcblxubGV0IGpzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlKFwianNvblwiKTtcbmNvbm4ub25SZXF1ZXN0KEluaXRpYWxpemVSZXF1ZXN0LnR5cGUsIChfcGFyYW1zKTogSW5pdGlhbGl6ZVJlc3VsdCA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FwYWJpbGl0aWVzOiB7XG4gICAgICAgICAgICB0ZXh0RG9jdW1lbnRTeW5jOiBUZXh0RG9jdW1lbnRTeW5jS2luZC5JbmNyZW1lbnRhbCxcbiAgICAgICAgICAgIGNvbXBsZXRpb25Qcm92aWRlcjoge1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm92aWRlcjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3ZlclByb3ZpZGVyOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH07XG59KTtcbmNvbm4ub25Ob3RpZmljYXRpb24oXG4gICAgRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbi50eXBlLFxuICAgIChwYXJhbXM6IERpZE9wZW5UZXh0RG9jdW1lbnRQYXJhbXMpID0+IHtcbiAgICAgICAganNvblNlcnZpY2UuYWRkRG9jdW1lbnQocGFyYW1zLnRleHREb2N1bWVudCk7XG4gICAgICAgIGRvVmFsaWRhdGlvbihwYXJhbXMudGV4dERvY3VtZW50KTtcbiAgICB9XG4pO1xuY29ubi5vbk5vdGlmaWNhdGlvbihcbiAgICBEaWRDaGFuZ2VUZXh0RG9jdW1lbnROb3RpZmljYXRpb24udHlwZSxcbiAgICAocGFyYW1zOiBEaWRDaGFuZ2VUZXh0RG9jdW1lbnRQYXJhbXMpID0+IHtcbiAgICAgICAganNvblNlcnZpY2UuYXBwbHlEZWx0YXMocGFyYW1zLnRleHREb2N1bWVudCwgcGFyYW1zLmNvbnRlbnRDaGFuZ2VzKTtcbiAgICAgICAgZG9WYWxpZGF0aW9uKHBhcmFtcy50ZXh0RG9jdW1lbnQpO1xuICAgIH1cbik7XG5jb25uLm9uUmVxdWVzdChDb21wbGV0aW9uUmVxdWVzdC50eXBlLCBhc3luYyAocGFyYW1zOiBDb21wbGV0aW9uUGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIGpzb25TZXJ2aWNlLmRvQ29tcGxldGUoXG4gICAgICAgIHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5wb3NpdGlvblxuICAgICk7XG59KTtcbmNvbm4ub25SZXF1ZXN0KEhvdmVyUmVxdWVzdC50eXBlLCBhc3luYyAocGFyYW1zOiBIb3ZlclBhcmFtcykgPT4ge1xuICAgIHJldHVybiBqc29uU2VydmljZS5kb0hvdmVyKHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5wb3NpdGlvbik7XG59KTtcbmNvbm4ub25SZXF1ZXN0KENvbXBsZXRpb25SZXNvbHZlUmVxdWVzdC50eXBlLCBhc3luYyAoaXRlbTogQ29tcGxldGlvbkl0ZW0pID0+IHtcbiAgICByZXR1cm4ganNvblNlcnZpY2UuZG9SZXNvbHZlKGl0ZW0pO1xufSk7XG5jb25uLm9uUmVxdWVzdChEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QudHlwZSwgYXN5bmMgKHBhcmFtczogRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQYXJhbXMpID0+IHtcbiAgICByZXR1cm4ganNvblNlcnZpY2UuZm9ybWF0KHBhcmFtcy50ZXh0RG9jdW1lbnQsIHBhcmFtcy5yYW5nZSwgcGFyYW1zLm9wdGlvbnMpO1xufSk7XG5cbmNvbm4ubGlzdGVuKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRvVmFsaWRhdGlvbihkb2N1bWVudDogVGV4dERvY3VtZW50SWRlbnRpZmllcikge1xuICAgIGxldCBkaWFnbm9zdGljcyA9IGF3YWl0IGpzb25TZXJ2aWNlLmRvVmFsaWRhdGlvbihkb2N1bWVudCk7XG4gICAgc2VuZERpYWdub3N0aWNzKGRvY3VtZW50LCBkaWFnbm9zdGljcyk7XG59XG5cbmZ1bmN0aW9uIHNlbmREaWFnbm9zdGljcyhkb2N1bWVudDogVGV4dERvY3VtZW50SWRlbnRpZmllciwgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNbXSk6IHZvaWQge1xuICAgIGNvbm4uc2VuZE5vdGlmaWNhdGlvbihQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24udHlwZSwge1xuICAgICAgICB1cmk6IGRvY3VtZW50LnVyaSwgZGlhZ25vc3RpY3NcbiAgICB9KVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0Ly8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5cdHZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgWzU2NzgsMzI1OF0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDUzMTM1KSkpXG5cdF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG5cdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xufTtcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJidW5kbGUuXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuLy8gXCIxXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHQzMTM1OiAxXG59O1xuXG4vLyBpbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmdcbnZhciBpbnN0YWxsQ2h1bmsgPSAoZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdHdoaWxlKGNodW5rSWRzLmxlbmd0aClcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHMucG9wKCldID0gMTtcblx0cGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmkgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW1wb3J0U2NyaXB0cyhfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCkpO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthY2VfbGludGVyc19yb290XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2FjZV9saW50ZXJzX3Jvb3RcIl0gfHwgW107XG52YXIgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24gPSBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IGluc3RhbGxDaHVuaztcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdCIsInZhciBuZXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZSg1Njc4KSxcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoMzI1OClcblx0XSkudGhlbihuZXh0KTtcbn07IiwiIiwiLy8gcnVuIHN0YXJ0dXBcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iLCIiXSwibmFtZXMiOlsiY3JlYXRlUHJvdG9jb2xDb25uZWN0aW9uIiwiQnJvd3Nlck1lc3NhZ2VSZWFkZXIiLCJCcm93c2VyTWVzc2FnZVdyaXRlciIsIkNvbXBsZXRpb25SZXF1ZXN0IiwiQ29tcGxldGlvblJlc29sdmVSZXF1ZXN0IiwiRGlkQ2hhbmdlVGV4dERvY3VtZW50Tm90aWZpY2F0aW9uIiwiRGlkT3BlblRleHREb2N1bWVudE5vdGlmaWNhdGlvbiIsIkhvdmVyUmVxdWVzdCIsIkluaXRpYWxpemVSZXF1ZXN0IiwiVGV4dERvY3VtZW50U3luY0tpbmQiLCJEb2N1bWVudFJhbmdlRm9ybWF0dGluZ1JlcXVlc3QiLCJQdWJsaXNoRGlhZ25vc3RpY3NOb3RpZmljYXRpb24iLCJKc29uU2VydmljZSIsIndvcmtlciIsInNlbGYiLCJjb25uIiwianNvblNlcnZpY2UiLCJvblJlcXVlc3QiLCJ0eXBlIiwiX3BhcmFtcyIsImNhcGFiaWxpdGllcyIsInRleHREb2N1bWVudFN5bmMiLCJJbmNyZW1lbnRhbCIsImNvbXBsZXRpb25Qcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsImhvdmVyUHJvdmlkZXIiLCJvbk5vdGlmaWNhdGlvbiIsInBhcmFtcyIsImFkZERvY3VtZW50IiwidGV4dERvY3VtZW50IiwiZG9WYWxpZGF0aW9uIiwiYXBwbHlEZWx0YXMiLCJjb250ZW50Q2hhbmdlcyIsImRvQ29tcGxldGUiLCJwb3NpdGlvbiIsImRvSG92ZXIiLCJpdGVtIiwiZG9SZXNvbHZlIiwiZm9ybWF0IiwicmFuZ2UiLCJvcHRpb25zIiwibGlzdGVuIiwiZG9jdW1lbnQiLCJkaWFnbm9zdGljcyIsInNlbmREaWFnbm9zdGljcyIsInNlbmROb3RpZmljYXRpb24iLCJ1cmkiXSwic291cmNlUm9vdCI6IiJ9