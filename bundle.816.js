/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 8816:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/browser.js
var browser = __webpack_require__(5224);
// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/lib/browser/main.js
var main = __webpack_require__(152);
;// CONCATENATED MODULE: ./packages/ace-linters/utils.ts
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

// EXTERNAL MODULE: ./node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var esm_main = __webpack_require__(6813);
;// CONCATENATED MODULE: ./packages/ace-linters/services/base-service.ts


class BaseService {
    mode;
    documents = {};
    options = {};
    globalOptions = {};
    constructor(mode) {
        this.mode = mode;
    }
    addDocument(document) {
        this.documents[document.uri] = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, document.text);
        //TODO:
        /*if (options)
            this.setOptions(sessionID, options);*/
    }
    getDocument(uri) {
        return this.documents[uri];
    }
    removeDocument(document) {
        delete this.documents[document.uri];
        if (this.options[document.uri]) {
            delete this.options[document.uri];
        }
    }
    getDocumentValue(uri) {
        return this.getDocument(uri).getText();
    }
    setValue(identifier, value) {
        let document = this.getDocument(identifier.uri);
        if (document) {
            document = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, value);
            this.documents[document.uri] = document;
        }
    }
    setGlobalOptions(options) {
        this.globalOptions = options ?? {};
    }
    setOptions(sessionID, options, merge = false) {
        this.options[sessionID] = merge ? mergeObjects(options, this.options[sessionID]) : options;
    }
    getOption(sessionID, optionName) {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        }
        else {
            return this.globalOptions[optionName];
        }
    }
    applyDeltas(identifier, deltas) {
        let document = this.getDocument(identifier.uri);
        if (document) {
            esm_main/* TextDocument.update */.n.update(document, deltas, identifier.version);
        }
    }
    doComplete(document, position) {
        return Promise.resolve(undefined);
    }
    doHover(document, position) {
        return Promise.resolve(undefined);
    }
    doResolve(item) {
        return Promise.resolve(undefined);
    }
    doValidation(document) {
        return Promise.resolve([]);
    }
    format(document, range, options) {
        return undefined;
    }
}

// EXTERNAL MODULE: ./node_modules/vscode-json-languageservice/lib/esm/jsonLanguageService.js + 21 modules
var jsonLanguageService = __webpack_require__(8644);
;// CONCATENATED MODULE: ./packages/ace-linters/services/json/json-service.ts


class JsonService extends BaseService {
    $service;
    schemas = {};
    constructor(mode) {
        super(mode);
        this.$service = jsonLanguageService/* getLanguageService */.Oi({
            schemaRequestService: (uri) => {
                uri = uri.replace("file:///", "");
                let jsonSchema = this.schemas[uri];
                if (jsonSchema)
                    return Promise.resolve(jsonSchema);
                return Promise.reject(`Unable to load schema at ${uri}`);
            }
        });
    }
    $getJsonSchemaUri(sessionID) {
        return this.getOption(sessionID, "jsonSchemaUri");
    }
    addDocument(document) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }
    $configureService(sessionID) {
        if (!sessionID)
            sessionID = "";
        let schemas = this.getOption(sessionID, "jsonSchemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(sessionID)) {
                el.fileMatch ??= [];
                el.fileMatch.push(sessionID);
            }
            this.schemas[el.uri] = (el.schema) ? el.schema : (this.schemas[el.uri]) ? this.schemas[el.uri] : undefined;
            this.$service.resetSchema(el.uri);
            el.schema = undefined;
        });
        this.$service.configure({
            schemas: schemas,
            allowComments: this.mode === "json5"
        });
    }
    removeDocument(document) {
        super.removeDocument(document);
        let schemas = this.getOption(document.uri, "jsonSchemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getJsonSchemaUri(document.uri)) {
                el.fileMatch = el.fileMatch.filter((pattern) => pattern != document.uri);
            }
        });
        this.$service.configure({
            schemas: schemas,
            allowComments: this.mode === "json5"
        });
    }
    setOptions(sessionID, options, merge = false) {
        super.setOptions(sessionID, options, merge);
        this.$configureService(sessionID);
    }
    setGlobalOptions(options) {
        super.setGlobalOptions(options);
        this.$configureService();
    }
    format(document, range, options) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let textEdits = this.$service.format(fullDocument, range, options);
        return textEdits;
    }
    async doHover(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let hover = this.$service.doHover(fullDocument, position, jsonDocument);
        return hover;
    }
    async doValidation(document) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let diagnostics = await this.$service.doValidation(fullDocument, jsonDocument, { trailingCommas: this.mode === "json5" ? "ignore" : "error" });
        return diagnostics;
    }
    async doComplete(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let completions = await this.$service.doComplete(fullDocument, position, jsonDocument);
        return completions;
    }
    async doResolve(item) {
        let resolvedCompletion = await this.$service.doResolve(item);
        return resolvedCompletion;
    }
}

;// CONCATENATED MODULE: ./packages/demo/webworker-json-rpc/webworker.ts



const worker = self;
const conn = (0,browser.createProtocolConnection)(new browser.BrowserMessageReader(worker), new browser.BrowserMessageWriter(worker));
let jsonService = new JsonService("json");
conn.onRequest(main.InitializeRequest.type, (_params) => {
    return {
        capabilities: {
            textDocumentSync: main.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
            },
            hoverProvider: true,
        },
    };
});
conn.onNotification(main.DidOpenTextDocumentNotification.type, (params) => {
    jsonService.addDocument(params.textDocument);
    doValidation(params.textDocument);
});
conn.onNotification(main.DidChangeTextDocumentNotification.type, (params) => {
    jsonService.applyDeltas(params.textDocument, params.contentChanges);
    doValidation(params.textDocument);
});
conn.onRequest(main.CompletionRequest.type, async (params) => {
    return jsonService.doComplete(params.textDocument, params.position);
});
conn.onRequest(main.HoverRequest.type, async (params) => {
    return jsonService.doHover(params.textDocument, params.position);
});
conn.onRequest(main.CompletionResolveRequest.type, async (item) => {
    return jsonService.doResolve(item);
});
conn.onRequest(main.DocumentRangeFormattingRequest.type, async (params) => {
    return jsonService.format(params.textDocument, params.range, params.options);
});
conn.listen();
async function doValidation(document) {
    let diagnostics = await jsonService.doValidation(document);
    sendDiagnostics(document, diagnostics);
}
function sendDiagnostics(document, diagnostics) {
    conn.sendNotification(main.PublishDiagnosticsNotification.type, {
        uri: document.uri, diagnostics
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [152,644,259], () => (__webpack_require__(8816)))
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
/******/ 			816: 1
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
/******/ 			return Promise.all([152,644,259].map(__webpack_require__.e, __webpack_require__)).then(next);
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
//# sourceMappingURL=bundle.816.js.map