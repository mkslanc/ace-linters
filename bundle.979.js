/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6653:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageType = exports.ChangeModeMessage = exports.DeltasMessage = exports.ChangeMessage = exports.ValidateMessage = exports.HoverMessage = exports.CompleteMessage = exports.FormatMessage = exports.InitMessage = void 0;
var InitMessage = /** @class */ (function () {
    function InitMessage(sessionId, value, options) {
        this.type = MessageType.init;
        this.sessionId = sessionId;
        this.options = options;
        this.value = value;
    }
    return InitMessage;
}());
exports.InitMessage = InitMessage;
var FormatMessage = /** @class */ (function () {
    function FormatMessage(sessionId, value) {
        this.type = MessageType.format;
        this.sessionId = sessionId;
        this.value = value;
    }
    return FormatMessage;
}());
exports.FormatMessage = FormatMessage;
var CompleteMessage = /** @class */ (function () {
    function CompleteMessage(sessionId, value) {
        this.type = MessageType.complete;
        this.sessionId = sessionId;
        this.value = value;
    }
    return CompleteMessage;
}());
exports.CompleteMessage = CompleteMessage;
var HoverMessage = /** @class */ (function () {
    function HoverMessage(sessionId, value) {
        this.type = MessageType.hover;
        this.sessionId = sessionId;
        this.value = value;
    }
    return HoverMessage;
}());
exports.HoverMessage = HoverMessage;
var ValidateMessage = /** @class */ (function () {
    function ValidateMessage(sessionId) {
        this.type = MessageType.validate;
        this.sessionId = sessionId;
    }
    return ValidateMessage;
}());
exports.ValidateMessage = ValidateMessage;
var ChangeMessage = /** @class */ (function () {
    function ChangeMessage(sessionId, value) {
        this.type = MessageType.change;
        this.sessionId = sessionId;
        this.value = value;
    }
    return ChangeMessage;
}());
exports.ChangeMessage = ChangeMessage;
var DeltasMessage = /** @class */ (function () {
    function DeltasMessage(sessionId, value) {
        this.type = MessageType.applyDelta;
        this.sessionId = sessionId;
        this.value = value;
    }
    return DeltasMessage;
}());
exports.DeltasMessage = DeltasMessage;
var ChangeModeMessage = /** @class */ (function () {
    function ChangeModeMessage(sessionId, value) {
        this.type = MessageType.changeMode;
        this.sessionId = sessionId;
        this.value = value;
    }
    return ChangeModeMessage;
}());
exports.ChangeModeMessage = ChangeModeMessage;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["init"] = 0] = "init";
    MessageType[MessageType["format"] = 1] = "format";
    MessageType[MessageType["complete"] = 2] = "complete";
    MessageType[MessageType["change"] = 3] = "change";
    MessageType[MessageType["hover"] = 4] = "hover";
    MessageType[MessageType["validate"] = 5] = "validate";
    MessageType[MessageType["applyDelta"] = 6] = "applyDelta";
    MessageType[MessageType["changeMode"] = 7] = "changeMode";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),

/***/ 9565:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
var BaseService = /** @class */ (function () {
    function BaseService(doc, options) {
        this.doc = doc;
    }
    BaseService.prototype.$getDocument = function () {
        return null;
    };
    BaseService.prototype.setValue = function (value) {
        this.doc.setValue(value);
    };
    BaseService.prototype.applyDeltas = function (deltas) {
        var data = deltas;
        if (data[0].start) {
            this.doc.applyDeltas(data);
        }
        else {
            for (var i = 0; i < data.length; i += 2) {
                var d, err;
                if (Array.isArray(data[i + 1])) {
                    d = { action: "insert", start: data[i], lines: data[i + 1] };
                }
                else {
                    d = { action: "remove", start: data[i], end: data[i + 1] };
                }
                if ((d.action == "insert" ? d.start : d.end).row >= this.doc["$lines"].length) {
                    err = new Error("Invalid delta");
                    err.data = {
                        linesLength: this.doc["$lines"].length,
                        start: d.start,
                        end: d.end
                    };
                    throw err;
                }
                this.doc.applyDelta(d, true);
            }
        }
    };
    BaseService.prototype.format = function (range) {
        return [];
    };
    BaseService.prototype.doHover = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    BaseService.prototype.doValidation = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    BaseService.prototype.doComplete = function (position) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return BaseService;
}());
exports.BaseService = BaseService;


/***/ }),

/***/ 8893:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssService = void 0;
var type_converters_1 = __webpack_require__(7472);
var base_service_1 = __webpack_require__(9565);
var cssService = __webpack_require__(8535);
var CssService = /** @class */ (function (_super) {
    __extends(CssService, _super);
    function CssService(doc, options) {
        var _this = _super.call(this, doc, options) || this;
        _this.changeLanguageService(options.mode);
        _this.$formatConfig = options.format;
        return _this;
    }
    CssService.prototype.changeLanguageService = function (modeName) {
        switch (modeName) {
            case "ace/mode/less":
                this.$languageId = "less";
                this.$service = cssService.getLESSLanguageService();
                break;
            case "ace/mode/scss":
                this.$languageId = "scss";
                this.$service = cssService.getSCSSLanguageService();
                break;
            case "ace/mode/css":
            default:
                this.$languageId = "css";
                this.$service = cssService.getCSSLanguageService();
                break;
        }
    };
    CssService.prototype.$getDocument = function () {
        var doc = this.doc.getValue(); //TODO: update
        return cssService.TextDocument.create("file://test.html", this.$languageId, 1, doc);
    };
    CssService.prototype.format = function (range) {
        var document = this.$getDocument();
        if (!document) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, type_converters_1.fromRange)(range), this.$formatConfig);
        return textEdits;
    };
    CssService.prototype.doHover = function (position) {
        var document = this.$getDocument();
        if (!document) {
            return null;
        }
        var cssDocument = this.$service.parseStylesheet(document);
        var hover = this.$service.doHover(document, (0, type_converters_1.fromPoint)(position), cssDocument);
        return Promise.resolve((0, type_converters_1.toTooltip)(hover));
    };
    CssService.prototype.doValidation = function () {
        return __awaiter(this, void 0, Promise, function () {
            var document, cssDocument, diagnostics;
            return __generator(this, function (_a) {
                document = this.$getDocument();
                if (!document) {
                    return [2 /*return*/, []];
                }
                cssDocument = this.$service.parseStylesheet(document);
                diagnostics = this.$service.doValidation(document, cssDocument);
                return [2 /*return*/, (0, type_converters_1.toAnnotations)(diagnostics)];
            });
        });
    };
    CssService.prototype.doComplete = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, cssDocument, completions;
            return __generator(this, function (_a) {
                document = this.$getDocument();
                if (!document) {
                    return [2 /*return*/, null];
                }
                cssDocument = this.$service.parseStylesheet(document);
                completions = this.$service.doComplete(document, (0, type_converters_1.fromPoint)(position), cssDocument);
                return [2 /*return*/, completions];
            });
        });
    };
    return CssService;
}(base_service_1.BaseService));
exports.CssService = CssService;


/***/ }),

/***/ 4750:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlService = void 0;
var type_converters_1 = __webpack_require__(7472);
var base_service_1 = __webpack_require__(9565);
var htmlService = __webpack_require__(132);
var HtmlService = /** @class */ (function (_super) {
    __extends(HtmlService, _super);
    function HtmlService(doc, options) {
        var _this = _super.call(this, doc, options) || this;
        _this.$formatConfig = {};
        _this.$service = htmlService.getLanguageService();
        _this.$formatConfig = options.format;
        return _this;
    }
    HtmlService.prototype.$getDocument = function () {
        var doc = this.doc.getValue(); //TODO: update
        return htmlService.TextDocument.create("file://test.html", "html", 1, doc);
    };
    HtmlService.prototype.format = function (range) {
        var document = this.$getDocument();
        if (!document || !range) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, type_converters_1.fromRange)(range), this.$formatConfig);
        return textEdits;
    };
    HtmlService.prototype.doHover = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, htmlDocument, hover;
            return __generator(this, function (_a) {
                document = this.$getDocument();
                if (!document) {
                    return [2 /*return*/, null];
                }
                htmlDocument = this.$service.parseHTMLDocument(document);
                hover = this.$service.doHover(document, (0, type_converters_1.fromPoint)(position), htmlDocument);
                return [2 /*return*/, Promise.resolve((0, type_converters_1.toTooltip)(hover))];
            });
        });
    };
    //TODO: separate validator for HTML
    HtmlService.prototype.doValidation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    HtmlService.prototype.doComplete = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, htmlDocument, completions;
            return __generator(this, function (_a) {
                document = this.$getDocument();
                if (!document) {
                    return [2 /*return*/, null];
                }
                htmlDocument = this.$service.parseHTMLDocument(document);
                completions = this.$service.doComplete(document, (0, type_converters_1.fromPoint)(position), htmlDocument);
                return [2 /*return*/, completions];
            });
        });
    };
    return HtmlService;
}(base_service_1.BaseService));
exports.HtmlService = HtmlService;


/***/ }),

/***/ 465:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonService = void 0;
var type_converters_1 = __webpack_require__(7472);
var base_service_1 = __webpack_require__(9565);
var jsonService = __webpack_require__(8644);
var JsonService = /** @class */ (function (_super) {
    __extends(JsonService, _super);
    function JsonService(doc, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, doc, options) || this;
        _this.$formatConfig = { tabSize: 4, insertSpaces: true };
        _this.$jsonSchema = (_a = options === null || options === void 0 ? void 0 : options.other) === null || _a === void 0 ? void 0 : _a.jsonSchema;
        _this.$formatConfig = options.format;
        _this.$service = jsonService.getLanguageService({
            schemaRequestService: function (uri) {
                if (_this.$jsonSchema) //TODO: make it with url resolving?
                    return Promise.resolve(JSON.stringify(_this.$jsonSchema));
                return Promise.reject("Unabled to load schema at ".concat(uri));
            }
        });
        _this.$service.configure({ allowComments: false, schemas: [{ fileMatch: ["test.json"], uri: "schema.json" }] });
        return _this;
    }
    JsonService.prototype.$getDocument = function () {
        var doc = this.doc.getValue(); //TODO: update
        return jsonService.TextDocument.create("test.json", "json", 1, doc);
    };
    JsonService.prototype.format = function (range) {
        var document = this.$getDocument();
        if (!document) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, type_converters_1.fromRange)(range), this.$formatConfig);
        return textEdits;
    };
    JsonService.prototype.doHover = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, jsonDocument, hover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this.$getDocument();
                        if (!document) {
                            return [2 /*return*/, null];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        return [4 /*yield*/, this.$service.doHover(document, (0, type_converters_1.fromPoint)(position), jsonDocument)];
                    case 1:
                        hover = _a.sent();
                        return [2 /*return*/, (0, type_converters_1.toTooltip)(hover)];
                }
            });
        });
    };
    JsonService.prototype.doValidation = function () {
        return __awaiter(this, void 0, Promise, function () {
            var document, jsonDocument, diagnostics, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        document = this.$getDocument();
                        if (!document) {
                            return [2 /*return*/, []];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        diagnostics = this.$service.doValidation(document, jsonDocument, null, this.$jsonSchema);
                        _a = type_converters_1.toAnnotations;
                        return [4 /*yield*/, diagnostics];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    JsonService.prototype.doComplete = function (position) {
        return __awaiter(this, void 0, Promise, function () {
            var document, jsonDocument, completions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this.$getDocument();
                        if (!document) {
                            return [2 /*return*/, null];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        return [4 /*yield*/, this.$service.doComplete(document, (0, type_converters_1.fromPoint)(position), jsonDocument)];
                    case 1:
                        completions = _a.sent();
                        return [2 /*return*/, completions];
                }
            });
        });
    };
    JsonService.prototype.setSchema = function (schema) {
        this.$jsonSchema = schema;
    };
    JsonService.prototype.resetSchema = function (uri) {
        return this.$service.resetSchema(uri);
    };
    return JsonService;
}(base_service_1.BaseService));
exports.JsonService = JsonService;


/***/ }),

/***/ 2692:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceManager = void 0;
var ServiceManager = /** @class */ (function () {
    function ServiceManager() {
        this.services = [
            {
                module: Promise.resolve().then(function () { return __webpack_require__(4750); }),
                name: "HtmlService",
                extensions: "html"
            },
            {
                module: Promise.resolve().then(function () { return __webpack_require__(8893); }),
                name: "CssService",
                extensions: "css|less|scss"
            },
            {
                module: Promise.resolve().then(function () { return __webpack_require__(465); }),
                name: "JsonService",
                extensions: "json"
            }
        ];
        this.serviceInstances = {};
    }
    Object.defineProperty(ServiceManager, "instance", {
        get: function () {
            if (!ServiceManager._instance) {
                ServiceManager._instance = new ServiceManager();
            }
            return ServiceManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    ServiceManager.prototype.addServiceInstance = function (uri, doc, options) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var resolvedMode, service, _b, _c, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!options["mode"] || !/^ace\/mode\//.test(options["mode"]))
                            return [2 /*return*/];
                        resolvedMode = (_a = options["mode"]) === null || _a === void 0 ? void 0 : _a.replace("ace/mode/", "");
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        service = this.findServiceByExtension(resolvedMode);
                        if (!service) {
                            console.log("No service registered for " + resolvedMode);
                            return [2 /*return*/];
                        }
                        _b = this.serviceInstances;
                        _c = uri;
                        return [4 /*yield*/, service.module];
                    case 2:
                        _b[_c] = new (_d.sent())[service.name](doc, options);
                        return [2 /*return*/, this.serviceInstances[uri]];
                    case 3:
                        e_1 = _d.sent();
                        throw "Couldn't resolve language service for " + resolvedMode;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceManager.prototype.removeServiceInstance = function (uri) {
        this.serviceInstances[uri] = undefined;
    };
    ServiceManager.prototype.getServiceInstance = function (uri) {
        if (!this.serviceInstances[uri]) {
            throw Error("No registered service for " + uri);
        }
        return this.serviceInstances[uri];
    };
    ServiceManager.prototype.findServiceByExtension = function (extension) {
        return this.services.find(function (el) {
            var extensions = el.extensions.split('|');
            if (extensions.indexOf(extension) !== -1)
                return el;
        });
    };
    return ServiceManager;
}());
exports.ServiceManager = ServiceManager;


/***/ }),

/***/ 7472:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TooltipType = exports.fromMarkupContent = exports.toTooltip = exports.getTextEditRange = exports.toCompletions = exports.toAnnotations = exports.toPoint = exports.fromPoint = exports.toRange = exports.fromRange = void 0;
var vscode_languageserver_types_1 = __webpack_require__(1674);
var range_1 = __webpack_require__(9082);
var range_list_1 = __webpack_require__(6510);
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
exports.fromRange = fromRange;
function toRange(range) {
    if (!range) {
        return;
    }
    return new range_1.Range(range.start.line, range.start.character, range.end.line, range.end.character);
}
exports.toRange = toRange;
function fromPoint(point) {
    if (!point)
        return;
    return { line: point.row, character: point.column };
}
exports.fromPoint = fromPoint;
function toPoint(position) {
    if (!position)
        return;
    return { row: position.line, column: position.character };
}
exports.toPoint = toPoint;
function toAnnotations(diagnostics) {
    return diagnostics && diagnostics.map(function (el) {
        return {
            row: el.range.start.line,
            column: el.range.start.character,
            text: el.message,
            type: el.severity === 1 ? "error" : el.severity === 2 ? "warning" : "info"
        };
    });
}
exports.toAnnotations = toAnnotations;
function toCompletions(completionList, markdownConverter) {
    return completionList && completionList.items.map(function (item) {
        var _a, _b, _c, _d;
        var kind = Object.keys(vscode_languageserver_types_1.CompletionItemKind)[Object.values(vscode_languageserver_types_1.CompletionItemKind).indexOf(item.kind)];
        var text = (_c = (_b = (_a = item.textEdit) === null || _a === void 0 ? void 0 : _a.newText) !== null && _b !== void 0 ? _b : item.insertText) !== null && _c !== void 0 ? _c : item.label;
        var command = (((_d = item.command) === null || _d === void 0 ? void 0 : _d.command) == "editor.action.triggerSuggest") ? "startAutocomplete" : undefined;
        var range = getTextEditRange(item.textEdit);
        var completion = {
            meta: kind,
            caption: item.label,
            command: command,
            range: range
        };
        var doc = fromMarkupContent(item.documentation);
        if (doc) {
            if (doc.type === TooltipType.markdown) {
                completion["docHTML"] = markdownConverter.makeHtml(doc.text);
            }
            else {
                completion["docText"] = doc.text;
            }
        }
        if (item.insertTextFormat == vscode_languageserver_types_1.InsertTextFormat.Snippet) {
            completion["snippet"] = text;
        }
        else {
            completion["value"] = text;
        }
        return completion;
    });
}
exports.toCompletions = toCompletions;
function getTextEditRange(textEdit) {
    if (!textEdit) {
        return;
    }
    if (textEdit.insert != undefined && textEdit.replace != undefined) {
        var rangeList = new range_list_1.RangeList();
        rangeList.ranges = [toRange(textEdit.insert), toRange(textEdit.replace)];
        rangeList.merge();
        return rangeList[0];
    }
    if (textEdit.range) {
        return toRange(textEdit.range);
    }
}
exports.getTextEditRange = getTextEditRange;
function toTooltip(hover) {
    var content;
    if (!hover) {
        return;
    }
    if (vscode_languageserver_types_1.MarkupContent.is(hover.contents)) {
        content = fromMarkupContent(hover.contents);
    }
    else if (vscode_languageserver_types_1.MarkedString.is(hover.contents)) {
        content = { type: TooltipType.markdown, text: "```" + hover.contents.value + "```" };
    }
    else if (Array.isArray(hover.contents)) {
        var contents = hover.contents.map(function (el) {
            if (typeof el !== "string") {
                return "```".concat(el.value, "```");
            }
            return el;
        });
        content = { type: TooltipType.markdown, text: contents.join("\n- - -\n") };
    }
    else {
        return;
    }
    var tooltip = { content: content, range: toRange(hover.range) };
    return tooltip;
}
exports.toTooltip = toTooltip;
function fromMarkupContent(content) {
    if (!content)
        return;
    if (typeof content === "string") {
        return { type: TooltipType.plainText, text: content };
    }
    if (content.kind === vscode_languageserver_types_1.MarkupKind.Markdown) {
        return { type: TooltipType.markdown, text: content.value };
    }
    else {
        return { type: TooltipType.plainText, text: content.value };
    }
}
exports.fromMarkupContent = fromMarkupContent;
var TooltipType;
(function (TooltipType) {
    TooltipType[TooltipType["plainText"] = 0] = "plainText";
    TooltipType[TooltipType["markdown"] = 1] = "markdown";
})(TooltipType = exports.TooltipType || (exports.TooltipType = {}));


/***/ }),

/***/ 8979:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var document_1 = __webpack_require__(1218);
var message_types_1 = __webpack_require__(6653);
var service_manager_1 = __webpack_require__(2692);
var ctx = self;
ctx.onmessage = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
    var message, uri, manager, _a, edits, completions, hover, annotations, options, doc, newOptions, service, newDoc;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                message = ev.data;
                uri = message.sessionId;
                manager = service_manager_1.ServiceManager.instance;
                _a = message["type"];
                switch (_a) {
                    case message_types_1.MessageType.format: return [3 /*break*/, 1];
                    case message_types_1.MessageType.complete: return [3 /*break*/, 2];
                    case message_types_1.MessageType.change: return [3 /*break*/, 4];
                    case message_types_1.MessageType.applyDelta: return [3 /*break*/, 5];
                    case message_types_1.MessageType.hover: return [3 /*break*/, 6];
                    case message_types_1.MessageType.validate: return [3 /*break*/, 8];
                    case message_types_1.MessageType.init: return [3 /*break*/, 10];
                    case message_types_1.MessageType.changeMode: return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 1:
                edits = manager.getServiceInstance(uri).format(message.value);
                ctx.postMessage({ type: message_types_1.MessageType.format, sessionId: uri, edits: edits });
                return [3 /*break*/, 14];
            case 2: return [4 /*yield*/, manager.getServiceInstance(uri).doComplete(message.value)];
            case 3:
                completions = _b.sent();
                ctx.postMessage({ type: message_types_1.MessageType.complete, sessionId: uri, completions: completions });
                return [3 /*break*/, 14];
            case 4:
                manager.getServiceInstance(uri).setValue(message.value);
                ctx.postMessage({ type: message_types_1.MessageType.change, sessionId: uri });
                return [3 /*break*/, 14];
            case 5:
                manager.getServiceInstance(uri).applyDeltas(message.value);
                ctx.postMessage({ type: message_types_1.MessageType.change, sessionId: uri });
                return [3 /*break*/, 14];
            case 6: return [4 /*yield*/, manager.getServiceInstance(uri).doHover(message.value)];
            case 7:
                hover = _b.sent();
                ctx.postMessage({ type: message_types_1.MessageType.hover, sessionId: uri, hover: hover });
                return [3 /*break*/, 14];
            case 8: return [4 /*yield*/, manager.getServiceInstance(uri).doValidation()];
            case 9:
                annotations = _b.sent();
                ctx.postMessage({ type: message_types_1.MessageType.validate, sessionId: uri, annotations: annotations });
                return [3 /*break*/, 14];
            case 10:
                options = message.options;
                doc = new document_1.Document(message.value);
                return [4 /*yield*/, manager.addServiceInstance(uri, doc, options)];
            case 11:
                _b.sent();
                return [3 /*break*/, 14];
            case 12:
                newOptions = message.value;
                service = manager.getServiceInstance(uri);
                newDoc = new document_1.Document(service.doc.getValue());
                manager.removeServiceInstance(uri);
                return [4 /*yield*/, manager.addServiceInstance(uri, newDoc, newOptions)];
            case 13:
                _b.sent();
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [826], () => (__webpack_require__(8979)))
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
/******/ 			979: 1
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkace_linters"] = self["webpackChunkace_linters"] || [];
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
/******/ 			return __webpack_require__.e(826).then(next);
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
//# sourceMappingURL=bundle.979.js.map