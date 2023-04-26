/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2126:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 2126;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 51581:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/browser.js
var browser = __webpack_require__(5224);
// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/lib/browser/main.js
var main = __webpack_require__(10152);
;// CONCATENATED MODULE: ./packages/ace-linters/utils.ts
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function mergeObjects(obj1, obj2) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    var mergedObjects = _object_spread({}, obj2, obj1); // Give priority to obj1 values by spreading obj2 first, then obj1
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(mergedObjects)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            if (obj1[key] && obj2[key]) {
                if (Array.isArray(obj1[key])) {
                    mergedObjects[key] = obj1[key].concat(obj2[key]);
                } else if (Array.isArray(obj2[key])) {
                    mergedObjects[key] = obj2[key].concat(obj1[key]);
                } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
                    mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return mergedObjects;
}
function notEmpty(value) {
    return value !== null && value !== undefined;
}
function checkValueAgainstRegexpArray(value, regexpArray) {
    if (!regexpArray) {
        return false;
    }
    for(var i = 0; i < regexpArray.length; i++){
        if (regexpArray[i].test(value)) {
            return true;
        }
    }
    return false;
}

// EXTERNAL MODULE: ./node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var esm_main = __webpack_require__(96813);
;// CONCATENATED MODULE: ./packages/ace-linters/services/base-service.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function base_service_define_property(obj, key, value) {
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
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}


var BaseService = /*#__PURE__*/ function() {
    "use strict";
    function BaseService(mode) {
        _class_call_check(this, BaseService);
        base_service_define_property(this, "mode", void 0);
        base_service_define_property(this, "documents", {});
        base_service_define_property(this, "options", {});
        base_service_define_property(this, "globalOptions", {});
        base_service_define_property(this, "serviceData", void 0);
        this.mode = mode;
    }
    _create_class(BaseService, [
        {
            key: "addDocument",
            value: function addDocument(document) {
                this.documents[document.uri] = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, document.text);
            //TODO:
            /*if (options)
            this.setSessionOptions(sessionID, options);*/ }
        },
        {
            key: "getDocument",
            value: function getDocument(uri) {
                return this.documents[uri];
            }
        },
        {
            key: "removeDocument",
            value: function removeDocument(document) {
                delete this.documents[document.uri];
                if (this.options[document.uri]) {
                    delete this.options[document.uri];
                }
            }
        },
        {
            key: "getDocumentValue",
            value: function getDocumentValue(uri) {
                var _this_getDocument;
                return (_this_getDocument = this.getDocument(uri)) === null || _this_getDocument === void 0 ? void 0 : _this_getDocument.getText();
            }
        },
        {
            key: "setValue",
            value: function setValue(identifier, value) {
                var document = this.getDocument(identifier.uri);
                if (document) {
                    document = esm_main/* TextDocument.create */.n.create(document.uri, document.languageId, document.version, value);
                    this.documents[document.uri] = document;
                }
            }
        },
        {
            key: "setGlobalOptions",
            value: function setGlobalOptions(options) {
                this.globalOptions = options !== null && options !== void 0 ? options : {};
            }
        },
        {
            key: "setOptions",
            value: function setOptions(sessionID, options) {
                var merge = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                this.options[sessionID] = merge ? mergeObjects(options, this.options[sessionID]) : options;
            }
        },
        {
            key: "getOption",
            value: function getOption(sessionID, optionName) {
                if (this.options[sessionID] && this.options[sessionID][optionName]) {
                    return this.options[sessionID][optionName];
                } else {
                    return this.globalOptions[optionName];
                }
            }
        },
        {
            key: "applyDeltas",
            value: function applyDeltas(identifier, deltas) {
                var document = this.getDocument(identifier.uri);
                if (document) esm_main/* TextDocument.update */.n.update(document, deltas, identifier.version);
            }
        },
        {
            key: "doComplete",
            value: function doComplete(document, position) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            null
                        ];
                    });
                })();
            }
        },
        {
            key: "doHover",
            value: function doHover(document, position) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            null
                        ];
                    });
                })();
            }
        },
        {
            key: "doResolve",
            value: function doResolve(item) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            null
                        ];
                    });
                })();
            }
        },
        {
            key: "doValidation",
            value: function doValidation(document) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            []
                        ];
                    });
                })();
            }
        },
        {
            key: "format",
            value: function format(document, range, options) {
                return [];
            }
        },
        {
            key: "provideSignatureHelp",
            value: function provideSignatureHelp(document, position) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            null
                        ];
                    });
                })();
            }
        },
        {
            key: "findDocumentHighlights",
            value: function findDocumentHighlights(document, position) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            []
                        ];
                    });
                })();
            }
        },
        {
            key: "optionsToFilterDiagnostics",
            get: function get() {
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
        }
    ]);
    return BaseService;
}();

// EXTERNAL MODULE: ./node_modules/vscode-json-languageservice/lib/esm/jsonLanguageService.js + 22 modules
var jsonLanguageService = __webpack_require__(61423);
// EXTERNAL MODULE: ./node_modules/ace-code/src/range.js
var range = __webpack_require__(59082);
// EXTERNAL MODULE: ./node_modules/ace-code/src/range_list.js
var range_list = __webpack_require__(16510);
// EXTERNAL MODULE: ./node_modules/ace-code/src/ace.js
var ace = __webpack_require__(59100);
;// CONCATENATED MODULE: ./packages/ace-linters/type-converters/common-converters.ts



var common_converters_CommonConverter;
(function(CommonConverter) {
    var normalizeRanges = function normalizeRanges(completions) {
        return completions && completions.map(function(el) {
            if (el["range"]) {
                el["range"] = toRange(el["range"]);
            }
            return el;
        });
    };
    var cleanHtml = function cleanHtml(html) {
        return html.replace(/<a\s/, "<a target='_blank' ");
    };
    var toRange = function toRange(range) {
        if (!range || !range.start || !range.end) {
            return;
        }
        return ace.Range.fromPoints(range.start, range.end);
    };
    var convertKind = function convertKind(kind) {
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
    };
    var excludeByErrorMessage = function excludeByErrorMessage(diagnostics, errorMessagesToIgnore) {
        var fieldName = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "message";
        if (!errorMessagesToIgnore) return diagnostics;
        return diagnostics.filter(function(el) {
            return !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore);
        });
    };
    CommonConverter.normalizeRanges = normalizeRanges;
    CommonConverter.cleanHtml = cleanHtml;
    CommonConverter.toRange = toRange;
    CommonConverter.convertKind = convertKind;
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
    return new AceRange(range.start.line, range.start.character, range.end.line, range.end.character);
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
    return diagnostics.map(function(el) {
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
    var itemKind = item.kind;
    var kind = itemKind ? Object.keys(CompletionItemKind)[Object.values(CompletionItemKind).indexOf(itemKind)] : undefined;
    var _item_textEdit_newText, _ref;
    var text = (_ref = (_item_textEdit_newText = (_item_textEdit = item.textEdit) === null || _item_textEdit === void 0 ? void 0 : _item_textEdit.newText) !== null && _item_textEdit_newText !== void 0 ? _item_textEdit_newText : item.insertText) !== null && _ref !== void 0 ? _ref : item.label;
    var command = ((_item_command = item.command) === null || _item_command === void 0 ? void 0 : _item_command.command) == "editor.action.triggerSuggest" ? "startAutocomplete" : undefined;
    var range = item.textEdit ? getTextEditRange(item.textEdit) : undefined;
    var completion = {
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
        var combinedCompletions = completions.map(function(el) {
            if (!el.completions) {
                return [];
            }
            var allCompletions;
            if (Array.isArray(el.completions)) {
                allCompletions = el.completions;
            } else {
                allCompletions = el.completions.items;
            }
            return allCompletions.map(function(item) {
                item["service"] = el.service;
                return item;
            });
        }).flat();
        return combinedCompletions.map(function(item) {
            return toCompletion(item);
        });
    }
    return [];
}
function toResolvedCompletion(completion, item) {
    completion["docMarkdown"] = fromMarkupContent(item.documentation);
    return completion;
}
function toCompletionItem(completion) {
    var command;
    if (completion["command"]) {
        command = {
            title: "triggerSuggest",
            command: completion["command"]
        };
    }
    var _completion_caption;
    var completionItem = {
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
        var rangeList = new RangeList();
        rangeList.ranges = [
            toRange(textEdit.insert),
            toRange(textEdit.replace)
        ];
        rangeList.merge();
        return rangeList[0];
    } else {
        textEdit = textEdit;
        return toRange(textEdit.range);
    }
}
function toTooltip(hover) {
    if (!hover) return;
    var content = hover.map(function(el) {
        if (MarkupContent.is(el.contents)) {
            return fromMarkupContent(el.contents);
        } else if (MarkedString.is(el.contents)) {
            return "```" + el.contents.value + "```";
        } else {
            var contents = el.contents.map(function(el) {
                if (typeof el !== "string") {
                    return "```".concat(el.value, "```");
                } else {
                    return el;
                }
            });
            return contents.join("\n\n");
        }
    });
    //TODO: not to forget about `range` when we will have this feature in editor
    return {
        content: {
            type: "markdown",
            text: content.join("\n\n")
        }
    };
}
function fromSignatureHelp(signatureHelp) {
    if (!signatureHelp) return;
    var content = signatureHelp.map(function(el) {
        var signatureIndex = (el === null || el === void 0 ? void 0 : el.activeSignature) || 0;
        var activeSignature = el.signatures[signatureIndex];
        var activeParam = el === null || el === void 0 ? void 0 : el.activeParameter;
        var contents = activeSignature.label;
        if (activeParam != undefined && activeSignature.parameters && activeSignature.parameters[activeParam]) {
            var param = activeSignature.parameters[activeParam].label;
            if (typeof param == "string") {
                contents = contents.replace(param, "**".concat(param, "**"));
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
    });
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
    var text = delta.lines.length > 1 ? delta.lines.join(eol) : delta.lines[0];
    return {
        range: delta.action === "insert" ? rangeFromPositions(fromPoint(delta.start), fromPoint(delta.start)) : rangeFromPositions(fromPoint(delta.start), fromPoint(delta.end)),
        text: delta.action === "insert" ? text : ""
    };
}
function filterDiagnostics(diagnostics, filterErrors) {
    return common_converters_CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map(function(el) {
        if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) {
            el.severity = main.DiagnosticSeverity.Warning;
        } else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) {
            el.severity = main.DiagnosticSeverity.Information;
        }
        return el;
    });
}

;// CONCATENATED MODULE: ./packages/ace-linters/services/json/json-service.ts
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function json_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function json_service_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                json_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                json_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function json_service_class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function json_service_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function json_service_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) json_service_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) json_service_defineProperties(Constructor, staticProps);
    return Constructor;
}
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
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function json_service_ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}



var JsonService = /*#__PURE__*/ function(BaseService) {
    "use strict";
    _inherits(JsonService, BaseService);
    var _super = _create_super(JsonService);
    function JsonService(mode) {
        json_service_class_call_check(this, JsonService);
        var _this;
        _this = _super.call(this, mode);
        json_service_define_property(_assert_this_initialized(_this), "$service", void 0);
        json_service_define_property(_assert_this_initialized(_this), "schemas", {});
        _this.$service = jsonLanguageService/* getLanguageService */.Oi({
            schemaRequestService: function(uri) {
                uri = uri.replace("file:///", "");
                var jsonSchema = _this.schemas[uri];
                if (jsonSchema) return Promise.resolve(jsonSchema);
                return Promise.reject("Unable to load schema at ".concat(uri));
            }
        });
        return _this;
    }
    json_service_create_class(JsonService, [
        {
            key: "$getJsonSchemaUri",
            value: function $getJsonSchemaUri(sessionID) {
                return this.getOption(sessionID, "schemaUri");
            }
        },
        {
            key: "addDocument",
            value: function addDocument(document) {
                _get(_get_prototype_of(JsonService.prototype), "addDocument", this).call(this, document);
                this.$configureService(document.uri);
            }
        },
        {
            key: "$configureService",
            value: function $configureService(sessionID) {
                var _this = this;
                var schemas = this.getOption(sessionID !== null && sessionID !== void 0 ? sessionID : "", "schemas");
                var sessionIDs = sessionID ? [] : Object.keys(this.documents);
                schemas === null || schemas === void 0 ? void 0 : schemas.forEach(function(el) {
                    if (sessionID) {
                        if (_this.$getJsonSchemaUri(sessionID) == el.uri) {
                            var _el;
                            var _fileMatch;
                            (_fileMatch = (_el = el).fileMatch) !== null && _fileMatch !== void 0 ? _fileMatch : _el.fileMatch = [];
                            el.fileMatch.push(sessionID);
                        }
                    } else {
                        el.fileMatch = sessionIDs.filter(function(sessionID) {
                            return _this.$getJsonSchemaUri(sessionID) == el.uri;
                        });
                    }
                    var _el_schema;
                    var schema = (_el_schema = el.schema) !== null && _el_schema !== void 0 ? _el_schema : _this.schemas[el.uri];
                    if (schema) _this.schemas[el.uri] = schema;
                    _this.$service.resetSchema(el.uri);
                    el.schema = undefined;
                });
                this.$service.configure({
                    schemas: schemas,
                    allowComments: this.mode === "json5"
                });
            }
        },
        {
            key: "removeDocument",
            value: function removeDocument(document) {
                var _this = this;
                _get(_get_prototype_of(JsonService.prototype), "removeDocument", this).call(this, document);
                var schemas = this.getOption(document.uri, "schemas");
                schemas === null || schemas === void 0 ? void 0 : schemas.forEach(function(el) {
                    if (el.uri === _this.$getJsonSchemaUri(document.uri)) {
                        var _el_fileMatch;
                        el.fileMatch = (_el_fileMatch = el.fileMatch) === null || _el_fileMatch === void 0 ? void 0 : _el_fileMatch.filter(function(pattern) {
                            return pattern != document.uri;
                        });
                    }
                });
                this.$service.configure({
                    schemas: schemas,
                    allowComments: this.mode === "json5"
                });
            }
        },
        {
            key: "setOptions",
            value: function setOptions(sessionID, options) {
                var merge = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                _get(_get_prototype_of(JsonService.prototype), "setOptions", this).call(this, sessionID, options, merge);
                this.$configureService(sessionID);
            }
        },
        {
            key: "setGlobalOptions",
            value: function setGlobalOptions(options) {
                _get(_get_prototype_of(JsonService.prototype), "setGlobalOptions", this).call(this, options);
                this.$configureService();
            }
        },
        {
            key: "format",
            value: function format(document, range, options) {
                var fullDocument = this.getDocument(document.uri);
                if (!fullDocument) return [];
                return this.$service.format(fullDocument, range, options);
            }
        },
        {
            key: "doHover",
            value: function doHover(document, position) {
                var _this = this;
                return json_service_async_to_generator(function() {
                    var fullDocument, jsonDocument;
                    return json_service_ts_generator(this, function(_state) {
                        fullDocument = _this.getDocument(document.uri);
                        if (!fullDocument) return [
                            2,
                            null
                        ];
                        jsonDocument = _this.$service.parseJSONDocument(fullDocument);
                        return [
                            2,
                            _this.$service.doHover(fullDocument, position, jsonDocument)
                        ];
                    });
                })();
            }
        },
        {
            key: "doValidation",
            value: function doValidation(document) {
                var _this = this;
                return json_service_async_to_generator(function() {
                    var fullDocument, jsonDocument, diagnostics;
                    return json_service_ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                fullDocument = _this.getDocument(document.uri);
                                if (!fullDocument) return [
                                    2,
                                    []
                                ];
                                jsonDocument = _this.$service.parseJSONDocument(fullDocument);
                                return [
                                    4,
                                    _this.$service.doValidation(fullDocument, jsonDocument, {
                                        trailingCommas: _this.mode === "json5" ? "ignore" : "error"
                                    })
                                ];
                            case 1:
                                diagnostics = _state.sent();
                                return [
                                    2,
                                    filterDiagnostics(diagnostics, _this.optionsToFilterDiagnostics)
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "doComplete",
            value: function doComplete(document, position) {
                var _this = this;
                return json_service_async_to_generator(function() {
                    var fullDocument, jsonDocument;
                    return json_service_ts_generator(this, function(_state) {
                        fullDocument = _this.getDocument(document.uri);
                        if (!fullDocument) return [
                            2,
                            null
                        ];
                        jsonDocument = _this.$service.parseJSONDocument(fullDocument);
                        return [
                            2,
                            _this.$service.doComplete(fullDocument, position, jsonDocument)
                        ];
                    });
                })();
            }
        },
        {
            key: "doResolve",
            value: function doResolve(item) {
                var _this = this;
                return json_service_async_to_generator(function() {
                    return json_service_ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.$service.doResolve(item)
                        ];
                    });
                })();
            }
        }
    ]);
    return JsonService;
}(BaseService);

;// CONCATENATED MODULE: ./packages/demo/webworker-json-rpc/webworker.ts
function webworker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function webworker_async_to_generator(fn) {
    return function() {
        var self1 = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self1, args);
            function _next(value) {
                webworker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                webworker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function webworker_ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}



var worker = self;
var conn = (0,browser.createProtocolConnection)(new browser.BrowserMessageReader(worker), new browser.BrowserMessageWriter(worker));
var jsonService = new JsonService("json");
conn.onRequest(main.InitializeRequest.type, function(_params) {
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
conn.onNotification(main.DidOpenTextDocumentNotification.type, function(params) {
    jsonService.addDocument(params.textDocument);
    doValidation(params.textDocument);
});
conn.onNotification(main.DidChangeTextDocumentNotification.type, function(params) {
    jsonService.applyDeltas(params.textDocument, params.contentChanges);
    doValidation(params.textDocument);
});
conn.onRequest(main.CompletionRequest.type, function() {
    var _ref = webworker_async_to_generator(function(params) {
        return webworker_ts_generator(this, function(_state) {
            return [
                2,
                jsonService.doComplete(params.textDocument, params.position)
            ];
        });
    });
    return function(params) {
        return _ref.apply(this, arguments);
    };
}());
conn.onRequest(main.HoverRequest.type, function() {
    var _ref = webworker_async_to_generator(function(params) {
        return webworker_ts_generator(this, function(_state) {
            return [
                2,
                jsonService.doHover(params.textDocument, params.position)
            ];
        });
    });
    return function(params) {
        return _ref.apply(this, arguments);
    };
}());
conn.onRequest(main.CompletionResolveRequest.type, function() {
    var _ref = webworker_async_to_generator(function(item) {
        return webworker_ts_generator(this, function(_state) {
            return [
                2,
                jsonService.doResolve(item)
            ];
        });
    });
    return function(item) {
        return _ref.apply(this, arguments);
    };
}());
conn.onRequest(main.DocumentRangeFormattingRequest.type, function() {
    var _ref = webworker_async_to_generator(function(params) {
        return webworker_ts_generator(this, function(_state) {
            return [
                2,
                jsonService.format(params.textDocument, params.range, params.options)
            ];
        });
    });
    return function(params) {
        return _ref.apply(this, arguments);
    };
}());
conn.listen();
function doValidation(document) {
    return _doValidation.apply(this, arguments);
}
function _doValidation() {
    _doValidation = webworker_async_to_generator(function(document) {
        var diagnostics;
        return webworker_ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        jsonService.doValidation(document)
                    ];
                case 1:
                    diagnostics = _state.sent();
                    sendDiagnostics(document, diagnostics);
                    return [
                        2
                    ];
            }
        });
    });
    return _doValidation.apply(this, arguments);
}
function sendDiagnostics(document, diagnostics) {
    conn.sendNotification(main.PublishDiagnosticsNotification.type, {
        uri: document.uri,
        diagnostics: diagnostics
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [5224,8376], () => (__webpack_require__(51581)))
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
/******/ 			5258: 1
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
/******/ 				__webpack_require__.e(8376)
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
//# sourceMappingURL=bundle.5258.js.map