/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 35281:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69877);
/* harmony import */ var ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__);

let manager = new ace_linters_build_service_manager__WEBPACK_IMPORTED_MODULE_0__.ServiceManager(self);
manager.registerService("html", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 6741).then(__webpack_require__.t.bind(__webpack_require__, 26741, 23)),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8853).then(__webpack_require__.t.bind(__webpack_require__, 38853, 23)),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8853).then(__webpack_require__.t.bind(__webpack_require__, 38853, 23)),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    features: {
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 8853).then(__webpack_require__.t.bind(__webpack_require__, 38853, 23)),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 3258).then(__webpack_require__.t.bind(__webpack_require__, 53258, 23)),
    className: "JsonService",
    modes: "json"
});
manager.registerService("json5", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 3258).then(__webpack_require__.t.bind(__webpack_require__, 53258, 23)),
    className: "JsonService",
    modes: "json5"
});
manager.registerService("typescript", {
    module: ()=>__webpack_require__.e(/* import() */ 5851).then(__webpack_require__.t.bind(__webpack_require__, 55851, 23)),
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
    module: ()=>__webpack_require__.e(/* import() */ 1372).then(__webpack_require__.t.bind(__webpack_require__, 21372, 23)),
    className: "LuaService",
    modes: "lua"
});
manager.registerService("yaml", {
    features: {
        signatureHelp: false,
        documentHighlight: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 6663).then(__webpack_require__.t.bind(__webpack_require__, 96663, 23)),
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
    module: ()=>__webpack_require__.e(/* import() */ 4487).then(__webpack_require__.t.bind(__webpack_require__, 84487, 23)),
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
    module: ()=>__webpack_require__.e(/* import() */ 4358).then(__webpack_require__.t.bind(__webpack_require__, 74358, 23)),
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
    module: ()=>__webpack_require__.e(/* import() */ 331).then(__webpack_require__.t.bind(__webpack_require__, 331, 23)),
    className: "JavascriptService",
    modes: "javascript"
});
manager.registerService("python", {
    features: {
        completion: false,
        completionResolve: false,
        diagnostics: true,
        format: true,
        hover: false,
        documentHighlight: false,
        signatureHelp: false
    },
    module: ()=>__webpack_require__.e(/* import() */ 6292).then(__webpack_require__.t.bind(__webpack_require__, 76292, 23)),
    className: "PythonService",
    modes: "python"
});
manager.registerService("mysql", {
    module: ()=>__webpack_require__.e(/* import() */ 6478).then(__webpack_require__.t.bind(__webpack_require__, 56478, 23)),
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [9877], () => (__webpack_require__(35281)))
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
/******/ 			5281: 1
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
/******/ 			return __webpack_require__.e(9877).then(next);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7Ozs7O1dDcENBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUhBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvZGVtby93ZWJ3b3JrZXItY2hhbmdlLW1vZGUvd2Vid29ya2VyLnRzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290L3dlYnBhY2svcnVudGltZS9pbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL3J1bnRpbWUvc3RhcnR1cCBjaHVuayBkZXBlbmRlbmNpZXMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZU1hbmFnZXJ9IGZyb20gXCJhY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXJcIjtcblxubGV0IG1hbmFnZXIgPSBuZXcgU2VydmljZU1hbmFnZXIoc2VsZik7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcImh0bWxcIiwge1xuICAgIGZlYXR1cmVzOiB7c2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvaHRtbC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJIdG1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImh0bWxcIlxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcImNzc1wiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC9jc3Mtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiQ3NzU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImNzc1wiXG59KTtcbm1hbmFnZXIucmVnaXN0ZXJTZXJ2aWNlKFwibGVzc1wiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC9jc3Mtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiQ3NzU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImxlc3NcIlxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInNjc3NcIiwge1xuICAgIGZlYXR1cmVzOiB7c2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvY3NzLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIkNzc1NlcnZpY2VcIixcbiAgICBtb2RlczogXCJzY3NzXCJcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqc29uXCIsIHtcbiAgICBmZWF0dXJlczoge3NpZ25hdHVyZUhlbHA6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvanNvbi1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJKc29uU2VydmljZVwiLFxuICAgIG1vZGVzOiBcImpzb25cIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqc29uNVwiLCB7XG4gICAgZmVhdHVyZXM6IHtzaWduYXR1cmVIZWxwOiBmYWxzZSwgZG9jdW1lbnRIaWdobGlnaHQ6IGZhbHNlfSxcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1saW50ZXJzL2J1aWxkL2pzb24tc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiSnNvblNlcnZpY2VcIixcbiAgICBtb2RlczogXCJqc29uNVwiLFxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInR5cGVzY3JpcHRcIiwge1xuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvdHlwZXNjcmlwdC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJUeXBlc2NyaXB0U2VydmljZVwiLFxuICAgIG1vZGVzOiBcInR5cGVzY3JpcHR8dHN4fGphdmFzY3JpcHR8anN4XCIsXG59KTtcbm1hbmFnZXIucmVnaXN0ZXJTZXJ2aWNlKFwibHVhXCIsIHtcbiAgICBmZWF0dXJlczoge2NvbXBsZXRpb246IGZhbHNlLCBjb21wbGV0aW9uUmVzb2x2ZTogZmFsc2UsIGRpYWdub3N0aWNzOiB0cnVlLCBmb3JtYXQ6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGRvY3VtZW50SGlnaGxpZ2h0OiBmYWxzZSwgc2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvbHVhLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIkx1YVNlcnZpY2VcIixcbiAgICBtb2RlczogXCJsdWFcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJ5YW1sXCIsIHtcbiAgICBmZWF0dXJlczoge3NpZ25hdHVyZUhlbHA6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQveWFtbC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJZYW1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcInlhbWxcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJ4bWxcIiwge1xuICAgIGZlYXR1cmVzOiB7Y29tcGxldGlvbjogZmFsc2UsIGNvbXBsZXRpb25SZXNvbHZlOiBmYWxzZSwgZGlhZ25vc3RpY3M6IHRydWUsIGZvcm1hdDogZmFsc2UsIGhvdmVyOiBmYWxzZSwgZG9jdW1lbnRIaWdobGlnaHQ6IGZhbHNlLCBzaWduYXR1cmVIZWxwOiBmYWxzZX0sXG4gICAgbW9kdWxlOiAoKSA9PiBpbXBvcnQoXCJhY2UtbGludGVycy9idWlsZC94bWwtc2VydmljZVwiKSxcbiAgICBjbGFzc05hbWU6IFwiWG1sU2VydmljZVwiLFxuICAgIG1vZGVzOiBcInhtbFwiLFxufSk7XG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcInBocFwiLCB7XG4gICAgZmVhdHVyZXM6IHtjb21wbGV0aW9uOiBmYWxzZSwgY29tcGxldGlvblJlc29sdmU6IGZhbHNlLCBkaWFnbm9zdGljczogdHJ1ZSwgZm9ybWF0OiBmYWxzZSwgaG92ZXI6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2UsIHNpZ25hdHVyZUhlbHA6IGZhbHNlfSxcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1saW50ZXJzL2J1aWxkL3BocC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJQaHBTZXJ2aWNlXCIsXG4gICAgbW9kZXM6IFwicGhwXCJcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJqYXZhc2NyaXB0XCIsIHtcbiAgICBmZWF0dXJlczoge2NvbXBsZXRpb246IGZhbHNlLCBjb21wbGV0aW9uUmVzb2x2ZTogZmFsc2UsIGRpYWdub3N0aWNzOiB0cnVlLCBmb3JtYXQ6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGRvY3VtZW50SGlnaGxpZ2h0OiBmYWxzZSwgc2lnbmF0dXJlSGVscDogZmFsc2V9LFxuICAgIG1vZHVsZTogKCkgPT4gaW1wb3J0KFwiYWNlLWxpbnRlcnMvYnVpbGQvamF2YXNjcmlwdC1zZXJ2aWNlXCIpLFxuICAgIGNsYXNzTmFtZTogXCJKYXZhc2NyaXB0U2VydmljZVwiLFxuICAgIG1vZGVzOiBcImphdmFzY3JpcHRcIixcbn0pO1xubWFuYWdlci5yZWdpc3RlclNlcnZpY2UoXCJweXRob25cIiwge1xuICAgIGZlYXR1cmVzOiB7Y29tcGxldGlvbjogZmFsc2UsIGNvbXBsZXRpb25SZXNvbHZlOiBmYWxzZSwgZGlhZ25vc3RpY3M6IHRydWUsIGZvcm1hdDogdHJ1ZSwgaG92ZXI6IGZhbHNlLCBkb2N1bWVudEhpZ2hsaWdodDogZmFsc2UsIHNpZ25hdHVyZUhlbHA6IGZhbHNlfSxcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1weXRob24tcnVmZi1saW50ZXIvYnVpbGQvcHl0aG9uLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIlB5dGhvblNlcnZpY2VcIixcbiAgICBtb2RlczogXCJweXRob25cIixcbn0pO1xuXG5tYW5hZ2VyLnJlZ2lzdGVyU2VydmljZShcIm15c3FsXCIsIHtcbiAgICBtb2R1bGU6ICgpID0+IGltcG9ydChcImFjZS1zcWwtbGludGVyL2J1aWxkL215c3FsLXNlcnZpY2VcIiksXG4gICAgY2xhc3NOYW1lOiBcIk15U1FMU2VydmljZVwiLFxuICAgIG1vZGVzOiBcIm15c3FsXCIsXG59KTtcblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcblx0Ly8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5cdHZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgWzk4NzddLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygzNTI4MSkpKVxuXHRfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbn07XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rcyBhbmQgc2libGluZyBjaHVua3MgZm9yIHRoZSBlbnRyeXBvaW50XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiYnVuZGxlLlwiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3Ncbi8vIFwiMVwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0NTI4MTogMVxufTtcblxuLy8gaW1wb3J0U2NyaXB0cyBjaHVuayBsb2FkaW5nXG52YXIgaW5zdGFsbENodW5rID0gKGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR3aGlsZShjaHVua0lkcy5sZW5ndGgpXG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzLnBvcCgpXSA9IDE7XG5cdHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xufTtcbl9fd2VicGFja19yZXF1aXJlX18uZi5pID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGltcG9ydFNjcmlwdHMoX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYWNlX2xpbnRlcnNfcm9vdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthY2VfbGludGVyc19yb290XCJdIHx8IFtdO1xudmFyIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uID0gY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSBpbnN0YWxsQ2h1bms7XG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJ2YXIgbmV4dCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZSg5ODc3KS50aGVuKG5leHQpO1xufTsiLCIiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiIsIiJdLCJuYW1lcyI6WyJTZXJ2aWNlTWFuYWdlciIsIm1hbmFnZXIiLCJzZWxmIiwicmVnaXN0ZXJTZXJ2aWNlIiwiZmVhdHVyZXMiLCJzaWduYXR1cmVIZWxwIiwibW9kdWxlIiwiY2xhc3NOYW1lIiwibW9kZXMiLCJkb2N1bWVudEhpZ2hsaWdodCIsImNvbXBsZXRpb24iLCJjb21wbGV0aW9uUmVzb2x2ZSIsImRpYWdub3N0aWNzIiwiZm9ybWF0IiwiaG92ZXIiXSwic291cmNlUm9vdCI6IiJ9