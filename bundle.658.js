"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[658],{

/***/ 1378:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 5658:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LuaService": () => (/* binding */ LuaService)
/* harmony export */ });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1378);
/* harmony import */ var luaparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5233);
/* harmony import */ var luaparse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luaparse__WEBPACK_IMPORTED_MODULE_0__);


class LuaService extends _base_service__WEBPACK_IMPORTED_MODULE_1__/* .BaseService */ .b {
    $service;
    constructor(mode) {
        super(mode);
        this.$service = luaparse__WEBPACK_IMPORTED_MODULE_0__;
    }
    $getDocument(sessionID) {
        let documentValue = this.getDocumentValue(sessionID);
        return documentValue;
    }
    async doValidation(sessionID) {
        let document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        let errors = [];
        try {
            this.$service.parse(document);
        }
        catch (e) {
            if (e instanceof this.$service.SyntaxError) {
                errors.push({
                    row: e.line - 1,
                    column: e.column,
                    text: e.message,
                    type: "error"
                });
            }
        }
        return errors;
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.658.js.map