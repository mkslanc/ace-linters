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

/***/ 6813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ TextDocument)
/* harmony export */ });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (changes, version) {
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
            var change = changes_1[_i];
            if (FullTextDocument.isIncremental(change)) {
                // makes sure start is before end
                var range = getWellformedRange(change.range);
                // update content
                var startOffset = this.offsetAt(range.start);
                var endOffset = this.offsetAt(range.end);
                this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
                // update the offsets
                var startLine = Math.max(range.start.line, 0);
                var endLine = Math.max(range.end.line, 0);
                var lineOffsets = this._lineOffsets;
                var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
                if (endLine - startLine === addedLineOffsets.length) {
                    for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
                        lineOffsets[i + startLine + 1] = addedLineOffsets[i];
                    }
                }
                else {
                    if (addedLineOffsets.length < 10000) {
                        lineOffsets.splice.apply(lineOffsets, __spreadArray([startLine + 1, endLine - startLine], addedLineOffsets, false));
                    }
                    else { // avoid too many arguments for splice
                        this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
                    }
                }
                var diff = change.text.length - (endOffset - startOffset);
                if (diff !== 0) {
                    for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
                        lineOffsets[i] = lineOffsets[i] + diff;
                    }
                }
            }
            else if (FullTextDocument.isFull(change)) {
                this._content = change.text;
                this._lineOffsets = undefined;
            }
            else {
                throw new Error('Unknown change event received');
            }
        }
        this._version = version;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            this._lineOffsets = computeLineOffsets(this._content, true);
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return { line: 0, character: offset };
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return { line: line, character: offset - lineOffsets[line] };
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.isIncremental = function (event) {
        var candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    };
    FullTextDocument.isFull = function (event) {
        var candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    };
    return FullTextDocument;
}());
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new text document.
     *
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param version The document's initial version number.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Updates a TextDocument by modifying its content.
     *
     * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
     * @param changes the changes to apply to the document.
     * @param version the changes version for the document.
     * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
     *
     */
    function update(document, changes, version) {
        if (document instanceof FullTextDocument) {
            document.update(changes, version);
            return document;
        }
        else {
            throw new Error('TextDocument.update: document must be created by TextDocument.create');
        }
    }
    TextDocument.update = update;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits.map(getWellformedEdit), function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = 0;
        var spans = [];
        for (var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++) {
            var e = sortedEdits_1[_i];
            var startOffset = document.offsetAt(e.range.start);
            if (startOffset < lastModifiedOffset) {
                throw new Error('Overlapping edit');
            }
            else if (startOffset > lastModifiedOffset) {
                spans.push(text.substring(lastModifiedOffset, startOffset));
            }
            if (e.newText.length) {
                spans.push(e.newText);
            }
            lastModifiedOffset = document.offsetAt(e.range.end);
        }
        spans.push(text.substr(lastModifiedOffset));
        return spans.join('');
    }
    TextDocument.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
    if (data.length <= 1) {
        // sorted
        return data;
    }
    var p = (data.length / 2) | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
        var ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
            // smaller_equal -> take left to preserve order
            data[i++] = left[leftIdx++];
        }
        else {
            // greater -> take right
            data[i++] = right[rightIdx++];
        }
    }
    while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
    }
    return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset) {
    if (textOffset === void 0) { textOffset = 0; }
    var result = isAtLineStart ? [textOffset] : [];
    for (var i = 0; i < text.length; i++) {
        var ch = text.charCodeAt(i);
        if (ch === 13 /* CharCode.CarriageReturn */ || ch === 10 /* CharCode.LineFeed */) {
            if (ch === 13 /* CharCode.CarriageReturn */ && i + 1 < text.length && text.charCodeAt(i + 1) === 10 /* CharCode.LineFeed */) {
                i++;
            }
            result.push(textOffset + i + 1);
        }
    }
    return result;
}
function getWellformedRange(range) {
    var start = range.start;
    var end = range.end;
    if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
        return { start: end, end: start };
    }
    return range;
}
function getWellformedEdit(textEdit) {
    var range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
        return { newText: textEdit.newText, range: range };
    }
    return textEdit;
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
/************************************************************************/
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
/******/ 		// This function allow to reference async chunks
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

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

// EXTERNAL MODULE: ./node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var main = __webpack_require__(6813);
;// CONCATENATED MODULE: ./packages/ace-linters/services/service-manager.ts



class ServiceManager {
    $services = {};
    $sessionIDToMode = {};
    constructor(ctx) {
        let doValidation = (document, serviceInstance) => {
            serviceInstance ??= this.getServiceInstance(document.uri);
            if (!serviceInstance)
                return;
            let postMessage = {
                "type": MessageType.validate,
            };
            let sessionIDList = Object.keys(serviceInstance.documents);
            for (let sessionID of sessionIDList) {
                serviceInstance.doValidation({ uri: sessionID }).then((result) => {
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
            let document = serviceInstance?.getDocument(sessionID) ?? {
                uri: sessionID
            };
            switch (message["type"]) {
                case MessageType.format:
                    postMessage["value"] = serviceInstance?.format(document, message.value, message.format);
                    break;
                case MessageType.complete:
                    postMessage["value"] = await serviceInstance?.doComplete(document, message.value);
                    break;
                case MessageType.resolveCompletion:
                    postMessage["value"] = await serviceInstance?.doResolve(message.value);
                    break;
                case MessageType.change:
                    serviceInstance?.setValue(sessionID, message.value);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.applyDelta:
                    serviceInstance?.applyDeltas(sessionID, message.value);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.hover:
                    postMessage["value"] = await serviceInstance?.doHover(document, message.value);
                    break;
                case MessageType.validate:
                    postMessage["value"] = await serviceInstance?.doValidation(document);
                    break;
                case MessageType.init: //this should be first message
                    await this.addDocument(sessionID, message.value, message.mode, message.options);
                    doValidation(document);
                    break;
                case MessageType.changeMode:
                    await this.changeDocumentMode(document, message.value, message.mode, message.options);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.changeOptions:
                    serviceInstance?.setOptions(sessionID, message.options);
                    doValidation(document, serviceInstance);
                    break;
                case MessageType.dispose:
                    this.removeDocument(document);
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
        let document = main/* TextDocument.create */.n.create(sessionID, mode, 1, documentValue);
        let serviceInstance = await this.$getServiceInstanceByMode(mode);
        if (!serviceInstance)
            return;
        serviceInstance.addDocument(document);
        this.$sessionIDToMode[sessionID] = mode;
    }
    async changeDocumentMode(document, value, mode, options) {
        this.removeDocument(document);
        await this.addDocument(document.uri, value, mode, options);
    }
    removeDocument(document) {
        let service = this.getServiceInstance(document.uri);
        if (service) {
            service.removeDocument(document);
            delete this.$sessionIDToMode[document.uri];
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
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(132), __webpack_require__.e(934)]).then(__webpack_require__.bind(__webpack_require__, 9934)),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(535), __webpack_require__.e(793)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(535), __webpack_require__.e(793)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(535), __webpack_require__.e(793)]).then(__webpack_require__.bind(__webpack_require__, 6793)),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(644), __webpack_require__.e(144)]).then(__webpack_require__.bind(__webpack_require__, 8411)),
    className: "JsonService",
    modes: "json",
});
manager.registerService("json5", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(644), __webpack_require__.e(144)]).then(__webpack_require__.bind(__webpack_require__, 8411)),
    className: "JsonService",
    modes: "json5",
});
manager.registerService("typescript", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(674), __webpack_require__.e(152), __webpack_require__.e(100), __webpack_require__.e(277)]).then(__webpack_require__.bind(__webpack_require__, 6263)),
    className: "TypescriptService",
    modes: "typescript|javascript|tsx|jsx",
});
manager.registerService("lua", {
    module: () => Promise.all(/* import() */[__webpack_require__.e(233), __webpack_require__.e(658)]).then(__webpack_require__.bind(__webpack_require__, 5658)),
    className: "LuaService",
    modes: "lua",
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.227.js.map