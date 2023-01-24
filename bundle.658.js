"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[658],{

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
        this.documents[document.uri] = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version, document.text);
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
            document = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version, value);
            this.documents[document.uri] = document;
        }
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
    applyDeltas(identifier, deltas) {
        let document = this.getDocument(identifier.uri);
        if (document)
            vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.update */ .n.update(document, deltas, identifier.version);
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
}


/***/ }),

/***/ 5658:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LuaService": () => (/* binding */ LuaService)
/* harmony export */ });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1378);
/* harmony import */ var luaparse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5233);
/* harmony import */ var luaparse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luaparse__WEBPACK_IMPORTED_MODULE_1__);


class LuaService extends _base_service__WEBPACK_IMPORTED_MODULE_0__/* .BaseService */ .b {
    $service;
    constructor(mode) {
        super(mode);
        this.$service = luaparse__WEBPACK_IMPORTED_MODULE_1__;
    }
    async doValidation(document) {
        let value = this.getDocumentValue(document.uri);
        if (!value)
            return [];
        let errors = [];
        try {
            this.$service.parse(value);
        }
        catch (e) {
            if (e instanceof this.$service.SyntaxError) {
                errors.push({
                    range: {
                        start: {
                            line: e.line - 1,
                            character: e.column
                        },
                        end: {
                            line: e.line - 1,
                            character: e.column
                        }
                    },
                    message: e.message,
                    severity: 1
                });
            }
        }
        return errors;
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.658.js.map