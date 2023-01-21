"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[934],{

/***/ 1378:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ BaseService)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3357);
/* harmony import */ var vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6813);


class BaseService {
    mode;
    documents = {};
    options = {};
    globalOptions = {};
    constructor(mode) {
        this.mode = mode;
    }
    addDocument(document) {
        if (typeof document["getText"] == "function") {
            this.documents[document.uri] = document;
        }
        else {
            this.documents[document.uri] = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version, document.text);
        }
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
    setValue(uri, value) {
        let document = this.getDocument(uri);
        document = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version + 1, value);
        this.documents[document.uri] = document;
    }
    setGlobalOptions(options) {
        this.globalOptions = options ?? {};
    }
    setOptions(sessionID, options, merge = false) {
        this.options[sessionID] = merge ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .mergeObjects */ .P)(options, this.options[sessionID]) : options;
    }
    getOption(sessionID, optionName) {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        }
        else {
            return this.globalOptions[optionName];
        }
    }
    /*applyDeltas(sessionID: string, deltas: Ace.Delta[]) { //TODO:
        let data = deltas;
        let document = this.getDocument(sessionID);

        this.$setVersion(document);
        if (data[0].start) {
            document.applyDeltas(data);
        } else {
            for (let i = 0; i < data.length; i += 2) {
                let d, err;
                if (Array.isArray(data[i + 1])) {
                    d = {action: "insert", start: data[i], lines: data[i + 1]};
                } else {
                    d = {action: "remove", start: data[i], end: data[i + 1]};
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
    }*/
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


/***/ }),

/***/ 9934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlService": () => (/* binding */ HtmlService)
/* harmony export */ });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1378);
/* harmony import */ var vscode_html_languageservice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132);


class HtmlService extends _base_service__WEBPACK_IMPORTED_MODULE_0__/* .BaseService */ .b {
    $service;
    constructor(mode) {
        super(mode);
        this.$service = vscode_html_languageservice__WEBPACK_IMPORTED_MODULE_1__/* .getLanguageService */ .Oi();
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
        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        let hover = this.$service.doHover(fullDocument, position, htmlDocument);
        return Promise.resolve(hover);
    }
    //TODO: separate validator for HTML
    async doValidation(document) {
        return [];
    }
    async doComplete(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        let completions = this.$service.doComplete(fullDocument, position, htmlDocument);
        return Promise.resolve(completions);
    }
    async doResolve(item) {
        return item;
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.934.js.map