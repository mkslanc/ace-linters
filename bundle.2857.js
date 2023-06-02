/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 92857:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/browser.js
var browser = __webpack_require__(5224);
// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/lib/browser/main.js
var main = __webpack_require__(10152);
;// CONCATENATED MODULE: ./packages/ace-linters/utils.ts
function mergeObjects(obj1, obj2) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    const mergedObjects = {
        ...obj2,
        ...obj1
    }; // Give priority to obj1 values by spreading obj2 first, then obj1
    for (const key of Object.keys(mergedObjects)){
        if (obj1[key] && obj2[key]) {
            if (Array.isArray(obj1[key])) {
                mergedObjects[key] = obj1[key].concat(obj2[key]);
            } else if (Array.isArray(obj2[key])) {
                mergedObjects[key] = obj2[key].concat(obj1[key]);
            } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
            }
        }
    }
    return mergedObjects;
}
function utils_notEmpty(value) {
    return value !== null && value !== undefined;
}
//taken with small changes from ace-code
function utils_mergeRanges(ranges) {
    var list = ranges;
    list = list.sort(function(a, b) {
        return comparePoints(a.start, b.start);
    });
    var next = list[0], range;
    for(var i = 1; i < list.length; i++){
        range = next;
        next = list[i];
        var cmp = comparePoints(range.end, next.start);
        if (cmp < 0) continue;
        if (cmp == 0 && !range.isEmpty() && !next.isEmpty()) continue;
        if (comparePoints(range.end, next.end) < 0) {
            range.end.row = next.end.row;
            range.end.column = next.end.column;
        }
        list.splice(i, 1);
        next = range;
        i--;
    }
    return list;
}
function comparePoints(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
}
function checkValueAgainstRegexpArray(value, regexpArray) {
    if (!regexpArray) {
        return false;
    }
    for(let i = 0; i < regexpArray.length; i++){
        if (regexpArray[i].test(value)) {
            return true;
        }
    }
    return false;
}

// EXTERNAL MODULE: ./node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var esm_main = __webpack_require__(96813);
;// CONCATENATED MODULE: ./packages/ace-linters/services/base-service.ts
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}


class BaseService {
    addDocument(document) {
        this.documents[document.uri] = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, document.text);
    //TODO:
    /*if (options)
            this.setSessionOptions(sessionID, options);*/ }
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
        var _this_getDocument;
        return (_this_getDocument = this.getDocument(uri)) === null || _this_getDocument === void 0 ? void 0 : _this_getDocument.getText();
    }
    setValue(identifier, value) {
        let document = this.getDocument(identifier.uri);
        if (document) {
            document = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, value);
            this.documents[document.uri] = document;
        }
    }
    setGlobalOptions(options) {
        this.globalOptions = options !== null && options !== void 0 ? options : {};
    }
    setOptions(sessionID, options, merge = false) {
        this.options[sessionID] = merge ? mergeObjects(options, this.options[sessionID]) : options;
    }
    getOption(sessionID, optionName) {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        } else {
            return this.globalOptions[optionName];
        }
    }
    applyDeltas(identifier, deltas) {
        let document = this.getDocument(identifier.uri);
        if (document) esm_main/* TextDocument.update */.n.update(document, deltas, identifier.version);
    }
    async doComplete(document, position) {
        return null;
    }
    async doHover(document, position) {
        return null;
    }
    async doResolve(item) {
        return null;
    }
    async doValidation(document) {
        return [];
    }
    format(document, range, options) {
        return [];
    }
    async provideSignatureHelp(document, position) {
        return null;
    }
    async findDocumentHighlights(document, position) {
        return [];
    }
    get optionsToFilterDiagnostics() {
        var _this_globalOptions_errorCodesToIgnore, _this_globalOptions_errorCodesToTreatAsWarning, _this_globalOptions_errorCodesToTreatAsInfo, _this_globalOptions_errorMessagesToIgnore, _this_globalOptions_errorMessagesToTreatAsWarning, _this_globalOptions_errorMessagesToTreatAsInfo;
        return {
            errorCodesToIgnore: (_this_globalOptions_errorCodesToIgnore = this.globalOptions.errorCodesToIgnore) !== null && _this_globalOptions_errorCodesToIgnore !== void 0 ? _this_globalOptions_errorCodesToIgnore : [],
            errorCodesToTreatAsWarning: (_this_globalOptions_errorCodesToTreatAsWarning = this.globalOptions.errorCodesToTreatAsWarning) !== null && _this_globalOptions_errorCodesToTreatAsWarning !== void 0 ? _this_globalOptions_errorCodesToTreatAsWarning : [],
            errorCodesToTreatAsInfo: (_this_globalOptions_errorCodesToTreatAsInfo = this.globalOptions.errorCodesToTreatAsInfo) !== null && _this_globalOptions_errorCodesToTreatAsInfo !== void 0 ? _this_globalOptions_errorCodesToTreatAsInfo : [],
            errorMessagesToIgnore: (_this_globalOptions_errorMessagesToIgnore = this.globalOptions.errorMessagesToIgnore) !== null && _this_globalOptions_errorMessagesToIgnore !== void 0 ? _this_globalOptions_errorMessagesToIgnore : [],
            errorMessagesToTreatAsWarning: (_this_globalOptions_errorMessagesToTreatAsWarning = this.globalOptions.errorMessagesToTreatAsWarning) !== null && _this_globalOptions_errorMessagesToTreatAsWarning !== void 0 ? _this_globalOptions_errorMessagesToTreatAsWarning : [],
            errorMessagesToTreatAsInfo: (_this_globalOptions_errorMessagesToTreatAsInfo = this.globalOptions.errorMessagesToTreatAsInfo) !== null && _this_globalOptions_errorMessagesToTreatAsInfo !== void 0 ? _this_globalOptions_errorMessagesToTreatAsInfo : []
        };
    }
    constructor(mode){
        _define_property(this, "mode", void 0);
        _define_property(this, "documents", {});
        _define_property(this, "options", {});
        _define_property(this, "globalOptions", {});
        _define_property(this, "serviceData", void 0);
        this.mode = mode;
    }
}

// EXTERNAL MODULE: ./node_modules/vscode-json-languageservice/lib/esm/jsonLanguageService.js + 22 modules
var jsonLanguageService = __webpack_require__(61423);
;// CONCATENATED MODULE: ./packages/ace-linters/type-converters/common-converters.ts


var common_converters_CommonConverter;
(function(CommonConverter) {
    function normalizeRanges(completions, editor) {
        const Range = editor.getSelectionRange().constructor;
        return completions && completions.map((el)=>{
            if (el["range"]) {
                el["range"] = toRange(el["range"], Range);
            }
            return el;
        });
    }
    CommonConverter.normalizeRanges = normalizeRanges;
    function cleanHtml(html) {
        return html.replace(/<a\s/, "<a target='_blank' ");
    }
    CommonConverter.cleanHtml = cleanHtml;
    function toRange(range, Range) {
        if (!range || !range.start || !range.end) {
            return;
        }
        return Range.fromPoints(range.start, range.end);
    }
    CommonConverter.toRange = toRange;
    function convertKind(kind) {
        switch(kind){
            case "primitiveType":
            case "keyword":
                return main.CompletionItemKind.Keyword;
            case "variable":
            case "localVariable":
                return main.CompletionItemKind.Variable;
            case "memberVariable":
            case "memberGetAccessor":
            case "memberSetAccessor":
                return main.CompletionItemKind.Field;
            case "function":
            case "memberFunction":
            case "constructSignature":
            case "callSignature":
            case "indexSignature":
                return main.CompletionItemKind.Function;
            case "enum":
                return main.CompletionItemKind.Enum;
            case "module":
                return main.CompletionItemKind.Module;
            case "class":
                return main.CompletionItemKind.Class;
            case "interface":
                return main.CompletionItemKind.Interface;
            case "warning":
                return main.CompletionItemKind.File;
        }
        return main.CompletionItemKind.Property;
    }
    CommonConverter.convertKind = convertKind;
    function excludeByErrorMessage(diagnostics, errorMessagesToIgnore, fieldName = "message") {
        if (!errorMessagesToIgnore) return diagnostics;
        return diagnostics.filter((el)=>!checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
    }
    CommonConverter.excludeByErrorMessage = excludeByErrorMessage;
})(common_converters_CommonConverter || (common_converters_CommonConverter = {}));

;// CONCATENATED MODULE: ./packages/ace-linters/type-converters/lsp-converters.ts




function fromRange(range) {
    return {
        start: {
            line: range.start.row,
            character: range.start.column
        },
        end: {
            line: range.end.row,
            character: range.end.column
        }
    };
}
function rangeFromPositions(start, end) {
    return {
        start: start,
        end: end
    };
}
function toRange(range) {
    return {
        start: {
            row: range.start.line,
            column: range.start.character
        },
        end: {
            row: range.end.line,
            column: range.end.character
        }
    };
}
function fromPoint(point) {
    return {
        line: point.row,
        character: point.column
    };
}
function toPoint(position) {
    return {
        row: position.line,
        column: position.character
    };
}
function toAnnotations(diagnostics) {
    return diagnostics.map((el)=>{
        return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}
function toCompletion(item) {
    var _item_textEdit, _item_command;
    let itemKind = item.kind;
    let kind = itemKind ? Object.keys(CompletionItemKind)[Object.values(CompletionItemKind).indexOf(itemKind)] : undefined;
    var _item_textEdit_newText, _ref;
    let text = (_ref = (_item_textEdit_newText = (_item_textEdit = item.textEdit) === null || _item_textEdit === void 0 ? void 0 : _item_textEdit.newText) !== null && _item_textEdit_newText !== void 0 ? _item_textEdit_newText : item.insertText) !== null && _ref !== void 0 ? _ref : item.label;
    let command = ((_item_command = item.command) === null || _item_command === void 0 ? void 0 : _item_command.command) == "editor.action.triggerSuggest" ? "startAutocomplete" : undefined;
    let range = item.textEdit ? getTextEditRange(item.textEdit) : undefined;
    let completion = {
        meta: kind,
        caption: item.label,
        command: command,
        range: range,
        value: "",
        score: undefined,
        item: item
    };
    if (item.insertTextFormat == InsertTextFormat.Snippet) {
        completion["snippet"] = text;
    } else {
        completion["value"] = text;
    }
    completion["documentation"] = item.documentation; //TODO: this is workaround for services with instant completion
    completion["position"] = item["position"];
    completion["service"] = item["service"]; //TODO: since we have multiple servers, we need to determine which
    // server to use for resolving
    return completion;
}
function toCompletions(completions) {
    if (completions.length > 0) {
        let combinedCompletions = completions.map((el)=>{
            if (!el.completions) {
                return [];
            }
            let allCompletions;
            if (Array.isArray(el.completions)) {
                allCompletions = el.completions;
            } else {
                allCompletions = el.completions.items;
            }
            return allCompletions.map((item)=>{
                item["service"] = el.service;
                return item;
            });
        }).flat();
        return combinedCompletions.map((item)=>toCompletion(item));
    }
    return [];
}
function toResolvedCompletion(completion, item) {
    completion["docMarkdown"] = fromMarkupContent(item.documentation);
    return completion;
}
function toCompletionItem(completion) {
    let command;
    if (completion["command"]) {
        command = {
            title: "triggerSuggest",
            command: completion["command"]
        };
    }
    var _completion_caption;
    let completionItem = {
        label: (_completion_caption = completion.caption) !== null && _completion_caption !== void 0 ? _completion_caption : "",
        kind: CommonConverter.convertKind(completion.meta),
        command: command,
        insertTextFormat: completion["snippet"] ? InsertTextFormat.Snippet : InsertTextFormat.PlainText,
        documentation: completion["documentation"]
    };
    if (completion["range"]) {
        var _completion_snippet;
        completionItem.textEdit = {
            range: fromRange(completion["range"]),
            newText: (_completion_snippet = completion["snippet"]) !== null && _completion_snippet !== void 0 ? _completion_snippet : completion["value"]
        };
    } else {
        var _completion_snippet1;
        completionItem.insertText = (_completion_snippet1 = completion["snippet"]) !== null && _completion_snippet1 !== void 0 ? _completion_snippet1 : completion["value"];
    }
    completionItem["fileName"] = completion["fileName"];
    completionItem["position"] = completion["position"];
    completionItem["item"] = completion["item"];
    completionItem["service"] = completion["service"]; //TODO:
    return completionItem;
}
function getTextEditRange(textEdit) {
    if (textEdit.hasOwnProperty("insert") && textEdit.hasOwnProperty("replace")) {
        textEdit = textEdit;
        let mergedRanges = mergeRanges([
            toRange(textEdit.insert),
            toRange(textEdit.replace)
        ]);
        return mergedRanges[0];
    } else {
        textEdit = textEdit;
        return toRange(textEdit.range);
    }
}
function toTooltip(hover) {
    var _hover_find;
    if (!hover) return;
    let content = hover.map((el)=>{
        if (!el || !el.contents) return;
        if (MarkupContent.is(el.contents)) {
            return fromMarkupContent(el.contents);
        } else if (MarkedString.is(el.contents)) {
            return "```" + el.contents.value + "```";
        } else {
            let contents = el.contents.map((el)=>{
                if (typeof el !== "string") {
                    return `\`\`\`${el.value}\`\`\``;
                } else {
                    return el;
                }
            });
            return contents.join("\n\n");
        }
    }).filter(notEmpty);
    if (content.length === 0) return;
    //TODO: it could be merged within all ranges in future
    let lspRange = (_hover_find = hover.find((el)=>{
        return el === null || el === void 0 ? void 0 : el.range;
    })) === null || _hover_find === void 0 ? void 0 : _hover_find.range;
    let range;
    if (lspRange) range = toRange(lspRange);
    return {
        content: {
            type: "markdown",
            text: content.join("\n\n")
        },
        range: range
    };
}
function fromSignatureHelp(signatureHelp) {
    if (!signatureHelp) return;
    let content = signatureHelp.map((el)=>{
        let signatureIndex = (el === null || el === void 0 ? void 0 : el.activeSignature) || 0;
        let activeSignature = el.signatures[signatureIndex];
        if (!activeSignature) return;
        let activeParam = el === null || el === void 0 ? void 0 : el.activeParameter;
        let contents = activeSignature.label;
        if (activeParam != undefined && activeSignature.parameters && activeSignature.parameters[activeParam]) {
            let param = activeSignature.parameters[activeParam].label;
            if (typeof param == "string") {
                contents = contents.replace(param, `**${param}**`);
            }
        }
        if (activeSignature.documentation) {
            if (MarkupContent.is(activeSignature.documentation)) {
                return contents + "\n\n" + fromMarkupContent(activeSignature.documentation);
            } else {
                contents += "\n\n" + activeSignature.documentation;
                return contents;
            }
        } else {
            return contents;
        }
    }).filter(notEmpty);
    if (content.length === 0) return;
    return {
        content: {
            type: "markdown",
            text: content.join("\n\n")
        }
    };
}
function fromMarkupContent(content) {
    if (!content) return;
    if (typeof content === "string") {
        return content;
    } else {
        return content.value;
    }
}
function fromAceDelta(delta, eol) {
    const text = delta.lines.length > 1 ? delta.lines.join(eol) : delta.lines[0];
    return {
        range: delta.action === "insert" ? rangeFromPositions(fromPoint(delta.start), fromPoint(delta.start)) : rangeFromPositions(fromPoint(delta.start), fromPoint(delta.end)),
        text: delta.action === "insert" ? text : ""
    };
}
function filterDiagnostics(diagnostics, filterErrors) {
    return common_converters_CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el)=>{
        if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) {
            el.severity = main.DiagnosticSeverity.Warning;
        } else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) {
            el.severity = main.DiagnosticSeverity.Information;
        }
        return el;
    });
}

;// CONCATENATED MODULE: ./packages/ace-linters/services/json/json-service.ts
function json_service_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}



class JsonService extends BaseService {
    $getJsonSchemaUri(sessionID) {
        return this.getOption(sessionID, "schemaUri");
    }
    addDocument(document) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }
    $configureService(sessionID) {
        let schemas = this.getOption(sessionID !== null && sessionID !== void 0 ? sessionID : "", "schemas");
        let sessionIDs = sessionID ? [] : Object.keys(this.documents);
        schemas === null || schemas === void 0 ? void 0 : schemas.forEach((el)=>{
            if (sessionID) {
                if (this.$getJsonSchemaUri(sessionID) == el.uri) {
                    var _el;
                    var _fileMatch;
                    (_fileMatch = (_el = el).fileMatch) !== null && _fileMatch !== void 0 ? _fileMatch : _el.fileMatch = [];
                    el.fileMatch.push(sessionID);
                }
            } else {
                el.fileMatch = sessionIDs.filter((sessionID)=>this.$getJsonSchemaUri(sessionID) == el.uri);
            }
            var _el_schema;
            let schema = (_el_schema = el.schema) !== null && _el_schema !== void 0 ? _el_schema : this.schemas[el.uri];
            if (schema) this.schemas[el.uri] = schema;
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
        let schemas = this.getOption(document.uri, "schemas");
        schemas === null || schemas === void 0 ? void 0 : schemas.forEach((el)=>{
            if (el.uri === this.$getJsonSchemaUri(document.uri)) {
                var _el_fileMatch;
                el.fileMatch = (_el_fileMatch = el.fileMatch) === null || _el_fileMatch === void 0 ? void 0 : _el_fileMatch.filter((pattern)=>pattern != document.uri);
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
        if (!fullDocument) return [];
        return this.$service.format(fullDocument, range, options);
    }
    async doHover(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) return null;
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        return this.$service.doHover(fullDocument, position, jsonDocument);
    }
    async doValidation(document) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) return [];
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        let diagnostics = await this.$service.doValidation(fullDocument, jsonDocument, {
            trailingCommas: this.mode === "json5" ? "ignore" : "error"
        });
        return filterDiagnostics(diagnostics, this.optionsToFilterDiagnostics);
    }
    async doComplete(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) return null;
        let jsonDocument = this.$service.parseJSONDocument(fullDocument);
        return this.$service.doComplete(fullDocument, position, jsonDocument);
    }
    async doResolve(item) {
        return this.$service.doResolve(item);
    }
    constructor(mode){
        super(mode);
        json_service_define_property(this, "$service", void 0);
        json_service_define_property(this, "schemas", {});
        this.$service = jsonLanguageService/* getLanguageService */.Oi({
            schemaRequestService: (uri)=>{
                uri = uri.replace("file:///", "");
                let jsonSchema = this.schemas[uri];
                if (jsonSchema) return Promise.resolve(jsonSchema);
                return Promise.reject(`Unable to load schema at ${uri}`);
            }
        });
    }
}

;// CONCATENATED MODULE: ./packages/demo/webworker-json-rpc/webworker.ts



const worker = self;
const conn = (0,browser.createProtocolConnection)(new browser.BrowserMessageReader(worker), new browser.BrowserMessageWriter(worker));
let jsonService = new JsonService("json");
conn.onRequest(main.InitializeRequest.type, (_params)=>{
    return {
        capabilities: {
            textDocumentSync: main.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true
            },
            hoverProvider: true
        }
    };
});
conn.onNotification(main.DidOpenTextDocumentNotification.type, (params)=>{
    jsonService.addDocument(params.textDocument);
    doValidation(params.textDocument);
});
conn.onNotification(main.DidChangeTextDocumentNotification.type, (params)=>{
    jsonService.applyDeltas(params.textDocument, params.contentChanges);
    doValidation(params.textDocument);
});
conn.onRequest(main.CompletionRequest.type, async (params)=>{
    return jsonService.doComplete(params.textDocument, params.position);
});
conn.onRequest(main.HoverRequest.type, async (params)=>{
    return jsonService.doHover(params.textDocument, params.position);
});
conn.onRequest(main.CompletionResolveRequest.type, async (item)=>{
    return jsonService.doResolve(item);
});
conn.onRequest(main.DocumentRangeFormattingRequest.type, async (params)=>{
    return jsonService.format(params.textDocument, params.range, params.options);
});
conn.listen();
async function doValidation(document) {
    let diagnostics = await jsonService.doValidation(document);
    sendDiagnostics(document, diagnostics);
}
function sendDiagnostics(document, diagnostics) {
    conn.sendNotification(main.PublishDiagnosticsNotification.type, {
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [5224,1423], () => (__webpack_require__(92857)))
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
/******/ 				scriptUrl = document.currentScript.src;
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
/******/ 			2857: 1
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
/******/ 				__webpack_require__.e(1423)
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
//# sourceMappingURL=bundle.2857.js.map