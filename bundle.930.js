(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[930],{

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

/***/ 1378:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ BaseService)
/* harmony export */ });
class BaseService {
    mode;
    documents = {};
    options = {};
    globalOptions = {};
    constructor(mode) {
        this.mode = mode;
    }
    $getDocument(sessionID) {
        return null;
    }
    addDocument(sessionID, document, options) {
        this.documents[sessionID] = document;
        if (options)
            this.setOptions(sessionID, options);
    }
    getDocument(sessionID) {
        return this.documents[sessionID];
    }
    removeDocument(sessionID) {
        delete this.documents[sessionID];
        if (this.options[sessionID]) {
            delete this.options[sessionID];
        }
    }
    getDocumentValue(sessionID) {
        return this.getDocument(sessionID).getValue();
    }
    $setVersion(doc) {
        if (!doc["version"]) {
            doc["version"] = 1;
        }
        else {
            doc["version"]++;
        }
    }
    setValue(sessionID, value) {
        let document = this.getDocument(sessionID);
        this.$setVersion(document);
        document.setValue(value);
    }
    setGlobalOptions(options) {
        this.globalOptions = options ?? {};
    }
    setOptions(sessionID, options) {
        this.options[sessionID] = options;
    }
    getOption(sessionID, optionName) {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        }
        else {
            return this.globalOptions[optionName];
        }
    }
    applyDeltas(sessionID, deltas) {
        let data = deltas;
        let document = this.getDocument(sessionID);
        this.$setVersion(document);
        if (data[0].start) {
            document.applyDeltas(data);
        }
        else {
            for (let i = 0; i < data.length; i += 2) {
                let d, err;
                if (Array.isArray(data[i + 1])) {
                    d = { action: "insert", start: data[i], lines: data[i + 1] };
                }
                else {
                    d = { action: "remove", start: data[i], end: data[i + 1] };
                }
                let linesLength = document["$lines"].length;
                if ((d.action == "insert" ? d.start : d.end).row >= linesLength) {
                    err = new Error("Invalid delta");
                    err.data = {
                        linesLength: linesLength,
                        start: d.start,
                        end: d.end
                    };
                    throw err;
                }
                document.applyDelta(d, true);
            }
        }
    }
    format(sessionID, range, format) {
        return [];
    }
    async doHover(sessionID, position) {
        return null;
    }
    async doValidation(sessionID) {
        return [];
    }
    async doComplete(sessionID, position) {
        return;
    }
    async resolveCompletion(sessionID, completion) {
        return;
    }
}


/***/ }),

/***/ 6793:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CssService": () => (/* binding */ CssService)
/* harmony export */ });
/* harmony import */ var _type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8817);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1378);


let cssService = __webpack_require__(8535);
class CssService extends _base_service__WEBPACK_IMPORTED_MODULE_1__/* .BaseService */ .b {
    $service;
    $languageId;
    constructor(mode) {
        super(mode);
        this.$initLanguageService();
        this.$service.configure();
    }
    $initLanguageService() {
        switch (this.mode) {
            case "less":
                this.$languageId = "less";
                this.$service = cssService.getLESSLanguageService();
                break;
            case "scss":
                this.$languageId = "scss";
                this.$service = cssService.getSCSSLanguageService();
                break;
            case "css":
            default:
                this.$languageId = "css";
                this.$service = cssService.getCSSLanguageService();
                break;
        }
    }
    $getDocument(sessionID) {
        let documentValue = this.getDocumentValue(sessionID);
        return cssService.TextDocument.create("file://test.html", this.$languageId, 1, documentValue);
    }
    format(sessionID, range, format) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let textEdits = this.$service.format(document, (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .fromRange */ .zq)(range), format);
        return (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .toAceTextEdits */ .Iw)(textEdits);
    }
    doHover(sessionID, position) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let hover = this.$service.doHover(document, (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .fromPoint */ .SN)(position), cssDocument);
        return Promise.resolve((0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .toTooltip */ .ph)(hover));
    }
    async doValidation(sessionID) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let diagnostics = this.$service.doValidation(document, cssDocument);
        return (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .toAnnotations */ .zn)(diagnostics);
    }
    async doComplete(sessionID, position) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(document);
        let completions = this.$service.doComplete(document, (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .fromPoint */ .SN)(position), cssDocument);
        return (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .toCompletions */ .hW)(completions);
    }
    async resolveCompletion(sessionID, completion) {
        return (0,_type_converters_vscode_converters__WEBPACK_IMPORTED_MODULE_0__/* .toResolvedCompletion */ .GC)(completion, completion["item"]);
    }
}


/***/ }),

/***/ 8840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CommonConverter)
/* harmony export */ });
/* harmony import */ var ace_code__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9100);

var CommonConverter;
(function (CommonConverter) {
    function normalizeRanges(completions) {
        return completions && completions.map((el) => {
            if (el["range"]) {
                el["range"] = toRange(el["range"]);
            }
            return el;
        });
    }
    CommonConverter.normalizeRanges = normalizeRanges;
    function cleanHtml(html) {
        return html.replace(/<a\s/, "<a target='_blank' ");
    }
    CommonConverter.cleanHtml = cleanHtml;
    function toRange(range) {
        if (!range || !range.start || !range.end) {
            return;
        }
        return ace_code__WEBPACK_IMPORTED_MODULE_0__.Range.fromPoints(range.start, range.end);
    }
    CommonConverter.toRange = toRange;
    let TooltipType;
    (function (TooltipType) {
        TooltipType[TooltipType["plainText"] = 0] = "plainText";
        TooltipType[TooltipType["markdown"] = 1] = "markdown";
    })(TooltipType = CommonConverter.TooltipType || (CommonConverter.TooltipType = {}));
})(CommonConverter || (CommonConverter = {}));


/***/ }),

/***/ 8817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GC": () => (/* binding */ toResolvedCompletion),
/* harmony export */   "Iw": () => (/* binding */ toAceTextEdits),
/* harmony export */   "SN": () => (/* binding */ fromPoint),
/* harmony export */   "hW": () => (/* binding */ toCompletions),
/* harmony export */   "ph": () => (/* binding */ toTooltip),
/* harmony export */   "zn": () => (/* binding */ toAnnotations),
/* harmony export */   "zq": () => (/* binding */ fromRange)
/* harmony export */ });
/* unused harmony exports toRange, toPoint, getTextEditRange, fromMarkupContent */
/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1674);
/* harmony import */ var ace_code_src_range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9082);
/* harmony import */ var ace_code_src_range_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6510);
/* harmony import */ var _common_converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8840);




function fromRange(range) {
    if (!range) {
        return;
    }
    return {
        start: {
            line: range.start.row,
            character: range.start.column
        },
        end: { line: range.end.row, character: range.end.column }
    };
}
function toRange(range) {
    if (!range) {
        return;
    }
    return new ace_code_src_range__WEBPACK_IMPORTED_MODULE_1__/* .Range */ .e(range.start.line, range.start.character, range.end.line, range.end.character);
}
function fromPoint(point) {
    if (!point)
        return;
    return { line: point.row, character: point.column };
}
function toPoint(position) {
    if (!position)
        return;
    return { row: position.line, column: position.character };
}
function toAnnotations(diagnostics) {
    return diagnostics && diagnostics.map((el) => {
        return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}
function toCompletions(completionList) {
    return completionList && completionList.items.map((item) => {
        let kind = Object.keys(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .CompletionItemKind */ .cm)[Object.values(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .CompletionItemKind */ .cm).indexOf(item.kind)];
        let text = item.textEdit?.newText ?? item.insertText ?? item.label;
        let command = (item.command?.command == "editor.action.triggerSuggest") ? "startAutocomplete" : undefined;
        let range = getTextEditRange(item.textEdit);
        let completion = {
            meta: kind,
            caption: item.label,
            command: command,
            range: range,
            value: "",
            score: null,
            item: item
        };
        if (item.insertTextFormat == vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .InsertTextFormat.Snippet */ .lO.Snippet) {
            completion["snippet"] = text;
        }
        else {
            completion["value"] = text;
        }
        return completion;
    });
}
function toResolvedCompletion(completion, item) {
    let doc = fromMarkupContent(item.documentation);
    if (doc) {
        if (doc.type === _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.markdown */ .Z.TooltipType.markdown) {
            completion["docMarkdown"] = doc.text;
        }
        else {
            completion["docText"] = doc.text;
        }
    }
    return completion;
}
function getTextEditRange(textEdit) {
    if (!textEdit) {
        return;
    }
    if (textEdit.insert != undefined && textEdit.replace != undefined) {
        let rangeList = new ace_code_src_range_list__WEBPACK_IMPORTED_MODULE_2__/* .RangeList */ .$();
        rangeList.ranges = [toRange(textEdit.insert), toRange(textEdit.replace)];
        rangeList.merge();
        return rangeList[0];
    }
    if (textEdit.range) {
        return toRange(textEdit.range);
    }
}
function toTooltip(hover) {
    let content;
    if (!hover) {
        return;
    }
    if (vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .MarkupContent.is */ .A_.is(hover.contents)) {
        content = fromMarkupContent(hover.contents);
    }
    else if (vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .MarkedString.is */ .oB.is(hover.contents)) {
        content = { type: _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.markdown */ .Z.TooltipType.markdown, text: "```" + hover.contents.value + "```" };
    }
    else if (Array.isArray(hover.contents)) {
        let contents = hover.contents.map((el) => {
            if (typeof el !== "string") {
                return `\`\`\`${el.value}\`\`\``;
            }
            return el;
        });
        content = { type: _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.markdown */ .Z.TooltipType.markdown, text: contents.join("\n\n") };
    }
    else {
        return;
    }
    return { content: content, range: toRange(hover.range) };
}
function fromMarkupContent(content) {
    if (!content)
        return;
    if (typeof content === "string") {
        return { type: _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.plainText */ .Z.TooltipType.plainText, text: content };
    }
    if (content.kind === vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__/* .MarkupKind.Markdown */ .a4.Markdown) {
        return { type: _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.markdown */ .Z.TooltipType.markdown, text: content.value };
    }
    else {
        return { type: _common_converters__WEBPACK_IMPORTED_MODULE_3__/* .CommonConverter.TooltipType.plainText */ .Z.TooltipType.plainText, text: content.value };
    }
}
function toAceTextEdits(textEdits) {
    return textEdits.reverse().map((el) => {
        return {
            range: toRange(el.range),
            newText: el.newText
        };
    });
}


/***/ })

}]);
//# sourceMappingURL=bundle.930.js.map