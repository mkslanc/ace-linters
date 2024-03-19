/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 77866:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5031);
/* harmony import */ var ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__);

let manager = new ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__.ServiceManager(self);
manager.registerService("html", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 6257).then(__webpack_require__.t.bind(__webpack_require__, 16257, 23)),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 172).then(__webpack_require__.t.bind(__webpack_require__, 20172, 23)),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 172).then(__webpack_require__.t.bind(__webpack_require__, 20172, 23)),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 172).then(__webpack_require__.t.bind(__webpack_require__, 20172, 23)),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8765).then(__webpack_require__.t.bind(__webpack_require__, 68765, 23)),
    className: "JsonService",
    modes: "json"
});
manager.registerService("json5", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8765).then(__webpack_require__.t.bind(__webpack_require__, 68765, 23)),
    className: "JsonService",
    modes: "json5"
});
manager.registerService("typescript", {
    module: ()=>__webpack_require__.e(/* import() */ 3696).then(__webpack_require__.t.bind(__webpack_require__, 73696, 23)),
    className: "TypescriptService",
    modes: "typescript|tsx|javascript|jsx"
});
manager.registerService("lua", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: false,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 9614).then(__webpack_require__.t.bind(__webpack_require__, 19614, 23)),
    className: "LuaService",
    modes: "lua"
});
manager.registerService("yaml", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 4347).then(__webpack_require__.t.bind(__webpack_require__, 4347, 23)),
    className: "YamlService",
    modes: "yaml"
});
manager.registerService("xml", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: false,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 9404).then(__webpack_require__.t.bind(__webpack_require__, 99404, 23)),
    className: "XmlService",
    modes: "xml"
});
manager.registerService("php", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: false,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8637).then(__webpack_require__.t.bind(__webpack_require__, 28637, 23)),
    className: "PhpService",
    modes: "php"
});
manager.registerService("javascript", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: false,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 3417).then(__webpack_require__.t.bind(__webpack_require__, 33417, 23)),
    className: "JavascriptService",
    modes: "javascript"
});
manager.registerService("python", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: false,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 3900).then(__webpack_require__.t.bind(__webpack_require__, 43900, 23)),
    className: "PythonService",
    modes: "python"
});
manager.registerService("mysql", {
    module: ()=>__webpack_require__.e(/* import() */ 5635).then(__webpack_require__.t.bind(__webpack_require__, 65635, 23)),
    className: "MySQLService",
    modes: "mysql"
});


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [5031], () => (__webpack_require__(77866)))
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 			7866: 1
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
/******/ 			return __webpack_require__.e(5031).then(next);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7Ozs7O1dDcENBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUhBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvZGVtby93ZWJ3b3JrZXItY2hhbmdlLW1vZGUvd2Vid29ya2VyLnRzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9pbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvc3RhcnR1cCBjaHVuayBkZXBlbmRlbmNpZXMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZU1hbmFnZXJ9IGZyb20gXCJhY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXJcIjtcblxubGV0IG1hbmFnZXIgPSBuZXcgU2VydmljZU1hbmFnZXIoc2VsZik7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcImh0bWxcIiwge1xuICAgIGZlYXR1cmVzOiB7c2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvaHRtbC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJIdG1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImh0bWxcIlxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcImNzc1wiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC9jc3Mtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiQ3NzU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImNzc1wiXG59KTtcbm1hbmFnZXIucmVnaXN0ZXJTZXJ2aWNlKFwibGVzc1wiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC9jc3Mtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiQ3NzU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImxlc3NcIlxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInNjc3NcIiwge1xuICAgIGZlYXR1cmVzOiB7c2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvY3NzLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIkNzc1NlcnZpY2VcIixcbiAgICBtb2RlczogXCJzY3NzXCJcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqc29uXCIsIHtcbiAgICBmZWF0dXJlczoge3NpZ25hdHVyZUhlbHA6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvanNvbi1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJKc29uU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImpzb25cIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqc29uNVwiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZSwgZG9jdW1lbnRIaWdobGlnaHQ6IGZhbHNlfSxcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1saW50ZXJzL2J1aWxkL2pzb24tc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiSnNvblNlcnZpY2VcIixcbiAgICBtb2RlczogXCJqc29uNVwiLFxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInR5cGVzY3JpcHRcIiwge1xuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvdHlwZXNjcmlwdC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJUeXBlc2NyaXB0U2VydmljZVwiLFxuICAgIG1vZGVzOiBcInR5cGVzY3JpcHR8dHN4fGphdmFzY3JpcHR8anN4XCIsXG59KTtcbm1hbmFnZXIucmVnaXN0ZXJTZXJ2aWNlKFwibHVhXCIsIHtcbiAgICBmZWF0dXJlczoge2NvbXBsZXRpb246IGZhbHNlLCBjb21wbGV0aW9uUmVzb2x2ZTogZmFsc2UsIGRpYWdub3N0aWNzOiB0cnVlLCBmb3JtYXQ6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGRvY3VtZW50SGlnaGxpZ2h0OiBmYWxzZSwgc2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvbHVhLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIkx1YVNlcnZpY2VcIixcbiAgICBtb2RlczogXCJsdWFcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJ5YW1sXCIsIHtcbiAgICBmZWF0dXJlczoge3NpZ25hdHVyZUhlbHA6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQveWFtbC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJZYW1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcInlhbWxcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJ4bWxcIiwge1xuICAgIGZlYXR1cmVzOiB7Y29tcGxldGlvbjogZmFsc2UsIGNvbXBsZXRpb25SZXNvbHZlOiBmYWxzZSwgZGlhZ25vc3RpY3M6IHRydWUsIGZvcm1hdDogZmFsc2UsIGhvdmVyOiBmYWxzZSwgZG9jdW1lbnRIaWdobGlnaHQ6IGZhbHNlLCBzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC94bWwtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiWG1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcInhtbFwiLFxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInBocFwiLCB7XG4gICAgZmVhdHVyZXM6IHtjb21wbGV0aW9uOiBmYWxzZSwgY29tcGxldGlvblJlc29sdmU6IGZhbHNlLCBkaWFnbm9zdGljczogdHJ1ZSwgZm9ybWF0OiBmYWxzZSwgaG92ZXI6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2UsIHNpZ25hdHVyZUhlbHA6IGZhbHNlfSxcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1saW50ZXJzL2J1aWxkL3BocC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJQaHBTZXJ2aWNlXCIsXG4gICAgbW9kZXM6IFwicGhwXCJcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqYXZhc2NyaXB0XCIsIHtcbiAgICBmZWF0dXJlczoge2NvbXBsZXRpb246IGZhbHNlLCBjb21wbGV0aW9uUmVzb2x2ZTogZmFsc2UsIGRpYWdub3N0aWNzOiB0cnVlLCBmb3JtYXQ6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGRvY3VtZW50SGlnaGxpZ2h0OiBmYWxzZSwgc2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvamF2YXNjcmlwdC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJKYXZhc2NyaXB0U2VydmljZVwiLFxuICAgIG1vZGVzOiBcImphdmFzY3JpcHRcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJweXRob25cIiwge1xuICAgIGZlYXR1cmVzOiB7Y29tcGxldGlvbjogZmFsc2UsIGNvbXBsZXRpb25SZXNvbHZlOiBmYWxzZSwgZGlhZ25vc3RpY3M6IHRydWUsIGZvcm1hdDogZmFsc2UsIGhvdmVyOiBmYWxzZSwgZG9jdW1lbnRIaWdobGlnaHQ6IGZhbHNlLCBzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC9weXRob24tc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiUHl0aG9uU2VydmljZVwiLFxuICAgIG1vZGVzOiBcInB5dGhvblwiLFxufSk7XG5cbm1hbmFnZXIucmVnaXN0ZXJTZXJ2aWNlKFwibXlzcWxcIiwge1xuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLXNxbC1saW50ZXIvYnVpbGQvbXlzcWwtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiTXlTUUxTZXJ2aWNlXCIsXG4gICAgbW9kZXM6IFwibXlzcWxcIixcbn0pO1xuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbNTAzMV0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDc3ODY2KSkpXG5cdF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG5cdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xufTtcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJidW5kbGUuXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuLy8gXCIxXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHQ3ODY2OiAxXG59O1xuXG4vLyBpbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmdcbnZhciBpbnN0YWxsQ2h1bmsgPSAoZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdHdoaWxlKGNodW5rSWRzLmxlbmd0aClcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHMucG9wKCldID0gMTtcblx0cGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmkgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW1wb3J0U2NyaXB0cyhfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCkpO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthY2VfbGludGVyc19yb290XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2FjZV9saW50ZXJzX3Jvb3RcIl0gfHwgW107XG52YXIgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24gPSBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IGluc3RhbGxDaHVuaztcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdCIsInZhciBuZXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKDUwMzEpLnRoZW4obmV4dCk7XG59OyIsIiIsIi8vIHJ1biBzdGFydHVwXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIiwiIl0sIm5hbWVzIjpbIlNlcnZpY2VNYW5hZ2VyIiwibWFuYWdlciIsInNlbGYiLCJyZWdpc3RlclNlcnZpY2UiLCJmZWF0dXJlcyIsInNpZ25hdHVyZUhlbHAiLCJtb2R1bGUiLCJjbGFzc05hbWUiLCJtb2RlcyIsImRvY3VtZW50SGlnaGxpZ2h0IiwiY29tcGxldGlvbiIsImNvbXBsZXRpb25SZXNvbHZlIiwiZGlhZ25vc3RpY3MiLCJmb3JtYXQiLCJob3ZlciJdLCJzb3VyY2VSb290IjoiIn0=