/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ mergeObjects)
/* harmony export */ });
function mergeObjects(obj1, obj2) {
    if (!obj1)
        return obj2;
    if (!obj2)
        return obj1;
    const mergedObjects = {};
    for (const key of [...Object.keys(obj1), ...Object.keys(obj2)]) {
        if (obj1[key] && obj2[key]) {
            if (Array.isArray(obj1[key])) {
                mergedObjects[key] = obj1[key].concat(obj2[key]);
            }
            else {
                mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
            }
        }
        else {
            mergedObjects[key] = obj1[key] ?? obj2[key];
        }
    }
    return mergedObjects;
}


/***/ }),

/***/ 6227:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/ace-code/src/document.js
var src_document = __webpack_require__(1218);
// EXTERNAL MODULE: ./packages/ace-linters/utils.ts
var utils = __webpack_require__(3357);
;// CONCATENATED MODULE: ./packages/ace-linters/message-types.ts
class BaseMessage {
    sessionId;
    constructor(sessionId) {
        this.sessionId = sessionId;
    }
}
class InitMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.init;
    mode;
    options;
    value;
    constructor(sessionId, value, mode, options) {
        super(sessionId);
        this.options = options;
        this.mode = mode;
        this.value = value;
    }
}
class FormatMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.format;
    value;
    format;
    constructor(sessionId, value, format) {
        super(sessionId);
        this.value = value;
        this.format = format;
    }
}
class CompleteMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.complete;
    value;
    constructor(sessionId, value) {
        super(sessionId);
        this.value = value;
    }
}
class ResolveCompletionMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.resolveCompletion;
    value;
    constructor(sessionId, value) {
        super(sessionId);
        this.value = value;
    }
}
class HoverMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.hover;
    value;
    constructor(sessionId, value) {
        super(sessionId);
        this.value = value;
    }
}
class ValidateMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.validate;
    constructor(sessionId) {
        super(sessionId);
    }
}
class ChangeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.change;
    value;
    constructor(sessionId, value) {
        super(sessionId);
        this.value = value;
    }
}
class DeltasMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.applyDelta;
    value;
    constructor(sessionId, value) {
        super(sessionId);
        this.value = value;
    }
}
class ChangeModeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.changeMode;
    mode;
    value;
    constructor(sessionId, value, mode) {
        super(sessionId);
        this.value = value;
        this.mode = mode;
    }
}
class ChangeOptionsMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.changeOptions;
    options;
    merge;
    constructor(sessionId, options, merge = false) {
        super(sessionId);
        this.options = options;
        this.merge = merge;
    }
}
class DisposeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    type = MessageType.dispose;
    constructor(sessionId) {
        super(sessionId);
    }
}
class GlobalOptionsMessage {
    type = MessageType.globalOptions;
    serviceName;
    options;
    merge;
    constructor(serviceName, options, merge) {
        this.serviceName = serviceName;
        this.options = options;
        this.merge = merge;
    }
}
var MessageType;
(function (MessageType) {
    MessageType[MessageType["init"] = 0] = "init";
    MessageType[MessageType["format"] = 1] = "format";
    MessageType[MessageType["complete"] = 2] = "complete";
    MessageType[MessageType["resolveCompletion"] = 3] = "resolveCompletion";
    MessageType[MessageType["change"] = 4] = "change";
    MessageType[MessageType["hover"] = 5] = "hover";
    MessageType[MessageType["validate"] = 6] = "validate";
    MessageType[MessageType["applyDelta"] = 7] = "applyDelta";
    MessageType[MessageType["changeMode"] = 8] = "changeMode";
    MessageType[MessageType["changeOptions"] = 9] = "changeOptions";
    MessageType[MessageType["dispose"] = 10] = "dispose";
    MessageType[MessageType["globalOptions"] = 11] = "globalOptions";
})(MessageType || (MessageType = {}));

;// CONCATENATED MODULE: ./packages/ace-linters/services/service-manager.ts



class ServiceManager {
    $services = {};
    $sessionIDToMode = {};
    constructor(ctx) {
        let doValidation = (sessionID, serviceInstance) => {
            serviceInstance ??= this.getServiceInstance(sessionID);
            if (!serviceInstance)
                return;
            let postMessage = {
                "type": MessageType.validate,
            };
            let sessionIDList = Object.keys(serviceInstance.documents);
            for (let sessionID of sessionIDList) {
                serviceInstance.doValidation(sessionID).then((result) => {
                    postMessage["sessionId"] = sessionID;
                    postMessage["value"] = result;
                    ctx.postMessage(postMessage);
                });
            }
        };
        ctx.addEventListener("message", async (ev) => {
            let message = ev.data;
            let sessionID = message.sessionId;
            let postMessage = {
                "type": message.type,
                "sessionId": sessionID,
            };
            let serviceInstance = this.getServiceInstance(sessionID);
            switch (message["type"]) {
                case MessageType.format:
                    postMessage["value"] = serviceInstance?.format(sessionID, message.value, message.format);
                    break;
                case MessageType.complete:
                    postMessage["value"] = await serviceInstance?.doComplete(sessionID, message.value);
                    break;
                case MessageType.resolveCompletion:
                    postMessage["value"] = await serviceInstance?.resolveCompletion(sessionID, message.value);
                    break;
                case MessageType.change:
                    serviceInstance?.setValue(sessionID, message.value);
                    doValidation(sessionID, serviceInstance);
                    break;
                case MessageType.applyDelta:
                    serviceInstance?.applyDeltas(sessionID, message.value);
                    doValidation(sessionID, serviceInstance);
                    break;
                case MessageType.hover:
                    postMessage["value"] = await serviceInstance?.doHover(sessionID, message.value);
                    break;
                case MessageType.validate:
                    postMessage["value"] = await serviceInstance?.doValidation(sessionID);
                    break;
                case MessageType.init: //this should be first message
                    await this.addDocument(sessionID, message.value, message.mode, message.options);
                    doValidation(sessionID);
                    break;
                case MessageType.changeMode:
                    await this.changeDocumentMode(sessionID, message.value, message.mode, message.options);
                    doValidation(sessionID, serviceInstance);
                    break;
                case MessageType.changeOptions:
                    serviceInstance?.setOptions(sessionID, message.options);
                    doValidation(sessionID, serviceInstance);
                    break;
                case MessageType.dispose:
                    this.removeDocument(sessionID);
                    break;
                case MessageType.globalOptions:
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    break;
            }
            ctx.postMessage(postMessage);
        });
    }
    static async $initServiceInstance(service) {
        let module = await service.module();
        service.serviceInstance = new module[service.className](service.modes);
        service.serviceInstance.setGlobalOptions(service.options);
    }
    async $getServiceInstanceByMode(mode) {
        let service = this.findServiceByMode(mode);
        if (!service)
            return;
        if (!service.serviceInstance)
            await ServiceManager.$initServiceInstance(service);
        return service.serviceInstance;
    }
    setGlobalOptions(serviceName, options, merge = false) {
        let service = this.$services[serviceName];
        if (!service)
            return;
        service.options = merge ? (0,utils/* mergeObjects */.P)(options, service.options) : options;
        if (service.serviceInstance) {
            service.serviceInstance.setGlobalOptions(service.options);
        }
    }
    async addDocument(sessionID, documentValue, mode, options) {
        if (!mode || !/^ace\/mode\//.test(mode))
            return;
        mode = mode.replace("ace/mode/", "");
        let document = new src_document/* Document */.B(documentValue);
        let serviceInstance = await this.$getServiceInstanceByMode(mode);
        if (!serviceInstance)
            return;
        serviceInstance.addDocument(sessionID, document, options);
        this.$sessionIDToMode[sessionID] = mode;
    }
    async changeDocumentMode(sessionID, value, mode, options) {
        this.removeDocument(sessionID);
        await this.addDocument(sessionID, value, mode, options);
    }
    removeDocument(sessionID) {
        let service = this.getServiceInstance(sessionID);
        if (service) {
            service.removeDocument(sessionID);
            delete this.$sessionIDToMode[sessionID];
        }
    }
    getServiceInstance(sessionID) {
        let mode = this.$sessionIDToMode[sessionID];
        let service = this.findServiceByMode(mode);
        if (!mode || !service?.serviceInstance)
            return; //TODO:
        return service.serviceInstance;
    }
    findServiceByMode(mode) {
        return Object.values(this.$services).find((el) => {
            let extensions = el.modes.split('|');
            if (extensions.includes(mode))
                return el;
        });
    }
    registerService(name, service) {
        this.$services[name] = service;
    }
}

;// CONCATENATED MODULE: ./packages/demo/webworker-lsp/webworker.ts

let manager = new ServiceManager(self);
manager.registerService("html", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(132), __webpack_require__.e(894)]).then(__webpack_require__.bind(__webpack_require__, 9934)),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(535), __webpack_require__.e(930)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(535), __webpack_require__.e(930)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(535), __webpack_require__.e(930)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(644), __webpack_require__.e(211)]).then(__webpack_require__.bind(__webpack_require__, 8411)),
    className: "JsonService",
    modes: "json",
});
manager.registerService("json5", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(998), __webpack_require__.e(644), __webpack_require__.e(211)]).then(__webpack_require__.bind(__webpack_require__, 8411)),
    className: "JsonService",
    modes: "json5",
});
manager.registerService("typescript", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(100), __webpack_require__.e(695)]).then(__webpack_require__.bind(__webpack_require__, 8366)),
    className: "TypescriptService",
    modes: "typescript|javascript|tsx|jsx",
});
manager.registerService("lua", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(233), __webpack_require__.e(658)]).then(__webpack_require__.bind(__webpack_require__, 5658)),
    className: "LuaService",
    modes: "lua",
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [218], () => (__webpack_require__(6227)))
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
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
/******/ 			227: 1
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
/******/ 			return __webpack_require__.e(218).then(next);
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
//# sourceMappingURL=bundle.227.js.map