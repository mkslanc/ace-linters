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

/***/ 6653:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageType = exports.ChangeOptionsMessage = exports.ChangeModeMessage = exports.DeltasMessage = exports.ChangeMessage = exports.ValidateMessage = exports.HoverMessage = exports.CompleteMessage = exports.FormatMessage = exports.InitMessage = exports.BaseMessage = void 0;
var BaseMessage = /** @class */ (function () {
    function BaseMessage(sessionId) {
        this.sessionId = sessionId;
    }
    return BaseMessage;
}());
exports.BaseMessage = BaseMessage;
var InitMessage = /** @class */ (function (_super) {
    __extends(InitMessage, _super);
    function InitMessage(sessionId, value, mode, options) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.init;
        _this.options = options;
        _this.mode = mode;
        _this.value = value;
        return _this;
    }
    return InitMessage;
}(BaseMessage));
exports.InitMessage = InitMessage;
var FormatMessage = /** @class */ (function (_super) {
    __extends(FormatMessage, _super);
    function FormatMessage(sessionId, value, format) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.format;
        _this.value = value;
        _this.format = format;
        return _this;
    }
    return FormatMessage;
}(BaseMessage));
exports.FormatMessage = FormatMessage;
var CompleteMessage = /** @class */ (function (_super) {
    __extends(CompleteMessage, _super);
    function CompleteMessage(sessionId, value) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.complete;
        _this.value = value;
        return _this;
    }
    return CompleteMessage;
}(BaseMessage));
exports.CompleteMessage = CompleteMessage;
var HoverMessage = /** @class */ (function (_super) {
    __extends(HoverMessage, _super);
    function HoverMessage(sessionId, value) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.hover;
        _this.value = value;
        return _this;
    }
    return HoverMessage;
}(BaseMessage));
exports.HoverMessage = HoverMessage;
var ValidateMessage = /** @class */ (function (_super) {
    __extends(ValidateMessage, _super);
    function ValidateMessage(sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.validate;
        return _this;
    }
    return ValidateMessage;
}(BaseMessage));
exports.ValidateMessage = ValidateMessage;
var ChangeMessage = /** @class */ (function (_super) {
    __extends(ChangeMessage, _super);
    function ChangeMessage(sessionId, value) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.change;
        _this.value = value;
        return _this;
    }
    return ChangeMessage;
}(BaseMessage));
exports.ChangeMessage = ChangeMessage;
var DeltasMessage = /** @class */ (function (_super) {
    __extends(DeltasMessage, _super);
    function DeltasMessage(sessionId, value) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.applyDelta;
        _this.value = value;
        return _this;
    }
    return DeltasMessage;
}(BaseMessage));
exports.DeltasMessage = DeltasMessage;
var ChangeModeMessage = /** @class */ (function (_super) {
    __extends(ChangeModeMessage, _super);
    function ChangeModeMessage(sessionId, mode, options) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.changeMode;
        _this.mode = mode;
        _this.options = options;
        return _this;
    }
    return ChangeModeMessage;
}(BaseMessage));
exports.ChangeModeMessage = ChangeModeMessage;
var ChangeOptionsMessage = /** @class */ (function (_super) {
    __extends(ChangeOptionsMessage, _super);
    function ChangeOptionsMessage(sessionId, options) {
        var _this = _super.call(this, sessionId) || this;
        _this.type = MessageType.changeOptions;
        _this.options = options;
        return _this;
    }
    return ChangeOptionsMessage;
}(BaseMessage));
exports.ChangeOptionsMessage = ChangeOptionsMessage;
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
    MessageType[MessageType["changeOptions"] = 8] = "changeOptions";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),

/***/ 9565:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

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
    function BaseService(mode) {
        this.documents = {};
        this.options = {};
        this.mode = mode;
    }
    BaseService.prototype.$getDocument = function (sessionID) {
        return null;
    };
    BaseService.prototype.addDocument = function (sessionID, document, options) {
        this.documents[sessionID] = document;
        if (options)
            this.setOptions(sessionID, options);
    };
    BaseService.prototype.getDocument = function (sessionID) {
        return this.documents[sessionID];
    };
    BaseService.prototype.removeDocument = function (sessionID) {
        delete this.documents[sessionID];
        if (this.options[sessionID]) {
            delete this.options[sessionID];
        }
    };
    BaseService.prototype.getDocumentValue = function (sessionID) {
        return this.getDocument(sessionID).getValue();
    };
    BaseService.prototype.setValue = function (sessionID, value) {
        this.getDocument(sessionID).setValue(value);
    };
    BaseService.prototype.setOptions = function (sessionID, options) {
        this.options[sessionID] = options;
    };
    BaseService.prototype.applyDeltas = function (sessionID, deltas) {
        var data = deltas;
        var document = this.getDocument(sessionID);
        if (data[0].start) {
            document.applyDeltas(data);
        }
        else {
            for (var i = 0; i < data.length; i += 2) {
                var d = void 0, err = void 0;
                if (Array.isArray(data[i + 1])) {
                    d = { action: "insert", start: data[i], lines: data[i + 1] };
                }
                else {
                    d = { action: "remove", start: data[i], end: data[i + 1] };
                }
                var linesLength = document["$lines"].length;
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
    };
    BaseService.prototype.format = function (sessionID, range, format) {
        return [];
    };
    BaseService.prototype.doHover = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    BaseService.prototype.doValidation = function (sessionID) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    BaseService.prototype.doComplete = function (sessionID, position) {
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

/***/ 4891:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var vscode_converters_1 = __webpack_require__(334);
var base_service_1 = __webpack_require__(9565);
var cssService = __webpack_require__(8535);
var CssService = /** @class */ (function (_super) {
    __extends(CssService, _super);
    function CssService(mode) {
        var _this = _super.call(this, mode) || this;
        _this.$initLanguageService();
        _this.$service.configure();
        return _this;
    }
    CssService.prototype.$initLanguageService = function () {
        switch (this.mode) {
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
    CssService.prototype.$getDocument = function (sessionID) {
        var documentValue = this.getDocumentValue(sessionID);
        return cssService.TextDocument.create("file://test.html", this.$languageId, 1, documentValue);
    };
    CssService.prototype.format = function (sessionID, range, format) {
        var document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, vscode_converters_1.fromRange)(range), format);
        return (0, vscode_converters_1.toAceTextEdits)(textEdits);
    };
    CssService.prototype.doHover = function (sessionID, position) {
        var document = this.$getDocument(sessionID);
        if (!document) {
            return null;
        }
        var cssDocument = this.$service.parseStylesheet(document);
        var hover = this.$service.doHover(document, (0, vscode_converters_1.fromPoint)(position), cssDocument);
        return Promise.resolve((0, vscode_converters_1.toTooltip)(hover));
    };
    CssService.prototype.doValidation = function (sessionID) {
        return __awaiter(this, void 0, Promise, function () {
            var document, cssDocument, diagnostics;
            return __generator(this, function (_a) {
                document = this.$getDocument(sessionID);
                if (!document) {
                    return [2 /*return*/, []];
                }
                cssDocument = this.$service.parseStylesheet(document);
                diagnostics = this.$service.doValidation(document, cssDocument);
                return [2 /*return*/, (0, vscode_converters_1.toAnnotations)(diagnostics)];
            });
        });
    };
    CssService.prototype.doComplete = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, cssDocument, completions;
            return __generator(this, function (_a) {
                document = this.$getDocument(sessionID);
                if (!document) {
                    return [2 /*return*/, null];
                }
                cssDocument = this.$service.parseStylesheet(document);
                completions = this.$service.doComplete(document, (0, vscode_converters_1.fromPoint)(position), cssDocument);
                return [2 /*return*/, (0, vscode_converters_1.toCompletions)(completions)];
            });
        });
    };
    return CssService;
}(base_service_1.BaseService));
exports.CssService = CssService;


/***/ }),

/***/ 1051:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var vscode_converters_1 = __webpack_require__(334);
var base_service_1 = __webpack_require__(9565);
var htmlService = __webpack_require__(132);
var HtmlService = /** @class */ (function (_super) {
    __extends(HtmlService, _super);
    function HtmlService(mode) {
        var _this = _super.call(this, mode) || this;
        _this.$service = htmlService.getLanguageService();
        return _this;
    }
    HtmlService.prototype.$getDocument = function (sessionID) {
        var documentValue = this.getDocumentValue(sessionID);
        return htmlService.TextDocument.create("file://test.html", "html", 1, documentValue);
    };
    HtmlService.prototype.format = function (sessionID, range, format) {
        var document = this.$getDocument(sessionID);
        if (!document || !range) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, vscode_converters_1.fromRange)(range), format);
        return (0, vscode_converters_1.toAceTextEdits)(textEdits);
    };
    HtmlService.prototype.doHover = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, htmlDocument, hover;
            return __generator(this, function (_a) {
                document = this.$getDocument(sessionID);
                if (!document) {
                    return [2 /*return*/, null];
                }
                htmlDocument = this.$service.parseHTMLDocument(document);
                hover = this.$service.doHover(document, (0, vscode_converters_1.fromPoint)(position), htmlDocument);
                return [2 /*return*/, Promise.resolve((0, vscode_converters_1.toTooltip)(hover))];
            });
        });
    };
    //TODO: separate validator for HTML
    HtmlService.prototype.doValidation = function (sessionID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    HtmlService.prototype.doComplete = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, htmlDocument, completions;
            return __generator(this, function (_a) {
                document = this.$getDocument(sessionID);
                if (!document) {
                    return [2 /*return*/, null];
                }
                htmlDocument = this.$service.parseHTMLDocument(document);
                completions = this.$service.doComplete(document, (0, vscode_converters_1.fromPoint)(position), htmlDocument);
                return [2 /*return*/, (0, vscode_converters_1.toCompletions)(completions)];
            });
        });
    };
    return HtmlService;
}(base_service_1.BaseService));
exports.HtmlService = HtmlService;


/***/ }),

/***/ 7991:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var vscode_converters_1 = __webpack_require__(334);
var base_service_1 = __webpack_require__(9565);
var jsonService = __webpack_require__(8644);
var JsonService = /** @class */ (function (_super) {
    __extends(JsonService, _super);
    function JsonService(mode) {
        var _this = _super.call(this, mode) || this;
        _this.schemas = [];
        _this.$service = jsonService.getLanguageService({
            schemaRequestService: function (uri) {
                uri = uri.replace("file:///", "");
                var jsonSchema = _this.$getJsonSchema(uri);
                if (jsonSchema)
                    return Promise.resolve(JSON.stringify(jsonSchema));
                return Promise.reject("Unable to load schema at ".concat(uri));
            }
        });
        _this.$service.configure({ allowComments: false });
        return _this;
    }
    JsonService.prototype.$getJsonSchema = function (sessionID) {
        var _a;
        return (_a = this.options[sessionID]) === null || _a === void 0 ? void 0 : _a.jsonSchema;
    };
    JsonService.prototype.addDocument = function (sessionID, document, options) {
        _super.prototype.addDocument.call(this, sessionID, document, options);
        this.schemas.push({ uri: sessionID, fileMatch: [sessionID] });
        this.$service.configure({ schemas: this.schemas });
    };
    JsonService.prototype.removeDocument = function (sessionID) {
        _super.prototype.removeDocument.call(this, sessionID);
        this.schemas = this.schemas.filter(function (schema) { return schema.uri != sessionID; });
    };
    JsonService.prototype.setOptions = function (sessionID, options) {
        _super.prototype.setOptions.call(this, sessionID, options);
        this.$service.resetSchema(sessionID);
    };
    JsonService.prototype.$getDocument = function (sessionID) {
        var documentValue = this.getDocumentValue(sessionID);
        return jsonService.TextDocument.create(sessionID, "json", 1, documentValue);
    };
    JsonService.prototype.format = function (sessionID, range, format) {
        var document = this.$getDocument(sessionID);
        if (!document) {
            return [];
        }
        var textEdits = this.$service.format(document, (0, vscode_converters_1.fromRange)(range), format);
        return (0, vscode_converters_1.toAceTextEdits)(textEdits);
    };
    JsonService.prototype.doHover = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, jsonDocument, hover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this.$getDocument(sessionID);
                        if (!document) {
                            return [2 /*return*/, null];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        return [4 /*yield*/, this.$service.doHover(document, (0, vscode_converters_1.fromPoint)(position), jsonDocument)];
                    case 1:
                        hover = _a.sent();
                        return [2 /*return*/, (0, vscode_converters_1.toTooltip)(hover)];
                }
            });
        });
    };
    JsonService.prototype.doValidation = function (sessionID) {
        return __awaiter(this, void 0, Promise, function () {
            var document, jsonDocument, diagnostics, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        document = this.$getDocument(sessionID);
                        if (!document) {
                            return [2 /*return*/, []];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        diagnostics = this.$service.doValidation(document, jsonDocument, null, this.$getJsonSchema(sessionID));
                        _a = vscode_converters_1.toAnnotations;
                        return [4 /*yield*/, diagnostics];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    JsonService.prototype.doComplete = function (sessionID, position) {
        return __awaiter(this, void 0, void 0, function () {
            var document, jsonDocument, completions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this.$getDocument(sessionID);
                        if (!document) {
                            return [2 /*return*/, null];
                        }
                        jsonDocument = this.$service.parseJSONDocument(document);
                        return [4 /*yield*/, this.$service.doComplete(document, (0, vscode_converters_1.fromPoint)(position), jsonDocument)];
                    case 1:
                        completions = _a.sent();
                        return [2 /*return*/, (0, vscode_converters_1.toCompletions)(completions)];
                }
            });
        });
    };
    return JsonService;
}(base_service_1.BaseService));
exports.JsonService = JsonService;


/***/ }),

/***/ 2692:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var document_1 = __webpack_require__(1218);
var ServiceManager = /** @class */ (function () {
    function ServiceManager() {
        this.$services = [
            {
                module: Promise.resolve().then(function () { return __webpack_require__(1051); }),
                name: "HtmlService",
                modes: "html"
            },
            {
                module: Promise.resolve().then(function () { return __webpack_require__(4891); }),
                name: "CssService",
                modes: "css|less|scss"
            },
            {
                module: Promise.resolve().then(function () { return __webpack_require__(7991); }),
                name: "JsonService",
                modes: "json"
            }
        ];
        this.$serviceInstances = {};
        this.$sessionIDToMode = {};
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
    ServiceManager.prototype.$initServiceInstance = function (mode) {
        return __awaiter(this, void 0, Promise, function () {
            var resolvedMode, service, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        resolvedMode = mode === null || mode === void 0 ? void 0 : mode.replace("ace/mode/", "");
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        service = this.findServiceByMode(resolvedMode);
                        if (!service) {
                            console.log("No service registered for " + resolvedMode);
                            return [2 /*return*/];
                        }
                        _a = this.$serviceInstances;
                        _b = mode;
                        return [4 /*yield*/, service.module];
                    case 2:
                        _a[_b] = new (_c.sent())[service.name](mode);
                        return [2 /*return*/, this.$serviceInstances[mode]];
                    case 3:
                        e_1 = _c.sent();
                        throw "Couldn't resolve language service for " + resolvedMode;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceManager.prototype.$getServiceInstanceByMode = function (mode) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.$serviceInstances[mode]) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$initServiceInstance(mode)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.$serviceInstances[mode]];
                }
            });
        });
    };
    ServiceManager.prototype.addDocument = function (sessionID, documentValue, mode, options) {
        return __awaiter(this, void 0, void 0, function () {
            var document, serviceInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mode || !/^ace\/mode\//.test(mode))
                            return [2 /*return*/];
                        document = new document_1.Document(documentValue);
                        return [4 /*yield*/, this.$getServiceInstanceByMode(mode)];
                    case 1:
                        serviceInstance = _a.sent();
                        serviceInstance.addDocument(sessionID, document, options);
                        this.$sessionIDToMode[sessionID] = mode;
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceManager.prototype.changeDocumentMode = function (sessionID, mode, options) {
        return __awaiter(this, void 0, void 0, function () {
            var service, documentValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = this.getServiceInstance(sessionID);
                        documentValue = service.getDocumentValue(sessionID);
                        service.removeDocument(sessionID);
                        delete this.$sessionIDToMode[sessionID];
                        return [4 /*yield*/, this.addDocument(sessionID, documentValue, mode, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceManager.prototype.getServiceInstance = function (sessionID) {
        var mode = this.$sessionIDToMode[sessionID];
        if (!mode || !this.$serviceInstances[mode]) {
            throw Error("No registered service for " + sessionID);
        }
        return this.$serviceInstances[mode];
    };
    ServiceManager.prototype.findServiceByMode = function (mode) {
        return this.$services.find(function (el) {
            var extensions = el.modes.split('|');
            if (extensions.indexOf(mode) !== -1)
                return el;
        });
    };
    return ServiceManager;
}());
exports.ServiceManager = ServiceManager;


/***/ }),

/***/ 5393:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TooltipType = exports.toRange = exports.cleanHtml = exports.toCompletions = void 0;
var ace_code_1 = __webpack_require__(9100);
function toCompletions(completions, markdownConverter) {
    return completions && completions.map(function (el) {
        if (el["docMarkdown"]) {
            el["docHTML"] = cleanHtml(markdownConverter.makeHtml(el["docMarkdown"]));
            el["docMarkdown"] = undefined;
        }
        if (el["range"]) {
            el["range"] = toRange(el["range"]);
        }
        return el;
    });
}
exports.toCompletions = toCompletions;
function cleanHtml(html) {
    return html.replace(/<a\s/, "<a target='_blank' ");
}
exports.cleanHtml = cleanHtml;
function toRange(range) {
    if (!range || !range.start || !range.end) {
        return;
    }
    return ace_code_1.Range.fromPoints(range.start, range.end);
}
exports.toRange = toRange;
var TooltipType;
(function (TooltipType) {
    TooltipType[TooltipType["plainText"] = 0] = "plainText";
    TooltipType[TooltipType["markdown"] = 1] = "markdown";
})(TooltipType = exports.TooltipType || (exports.TooltipType = {}));


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toAceTextEdits = exports.fromMarkupContent = exports.toTooltip = exports.getTextEditRange = exports.toCompletions = exports.toAnnotations = exports.toPoint = exports.fromPoint = exports.toRange = exports.fromRange = void 0;
var vscode_languageserver_types_1 = __webpack_require__(1674);
var range_1 = __webpack_require__(9082);
var range_list_1 = __webpack_require__(6510);
var common_converters_1 = __webpack_require__(5393);
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
function toCompletions(completionList) {
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
            range: range,
            value: "",
            score: null
        };
        var doc = fromMarkupContent(item.documentation);
        if (doc) {
            if (doc.type === common_converters_1.TooltipType.markdown) {
                completion["docMarkdown"] = doc.text;
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
        content = { type: common_converters_1.TooltipType.markdown, text: "```" + hover.contents.value + "```" };
    }
    else if (Array.isArray(hover.contents)) {
        var contents = hover.contents.map(function (el) {
            if (typeof el !== "string") {
                return "```".concat(el.value, "```");
            }
            return el;
        });
        content = { type: common_converters_1.TooltipType.markdown, text: contents.join("\n\n") };
    }
    else {
        return;
    }
    return { content: content, range: toRange(hover.range) };
}
exports.toTooltip = toTooltip;
function fromMarkupContent(content) {
    if (!content)
        return;
    if (typeof content === "string") {
        return { type: common_converters_1.TooltipType.plainText, text: content };
    }
    if (content.kind === vscode_languageserver_types_1.MarkupKind.Markdown) {
        return { type: common_converters_1.TooltipType.markdown, text: content.value };
    }
    else {
        return { type: common_converters_1.TooltipType.plainText, text: content.value };
    }
}
exports.fromMarkupContent = fromMarkupContent;
function toAceTextEdits(textEdits) {
    return textEdits.reverse().map(function (el) {
        return {
            range: toRange(el.range),
            newText: el.newText
        };
    });
}
exports.toAceTextEdits = toAceTextEdits;


/***/ }),

/***/ 8979:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var message_types_1 = __webpack_require__(6653);
var service_manager_1 = __webpack_require__(2692);
var ctx = self;
ctx.onmessage = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
    var message, sessionID, manager, postMessage, _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                message = ev.data;
                sessionID = message.sessionId;
                manager = service_manager_1.ServiceManager.instance;
                postMessage = {
                    "type": message.type,
                    "sessionId": sessionID,
                };
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
                    case message_types_1.MessageType.changeOptions: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 15];
            case 1:
                postMessage["edits"] = manager.getServiceInstance(sessionID).format(sessionID, message.value, message.format);
                return [3 /*break*/, 15];
            case 2:
                _b = postMessage;
                _c = "completions";
                return [4 /*yield*/, manager.getServiceInstance(sessionID).doComplete(sessionID, message.value)];
            case 3:
                _b[_c] = _h.sent();
                return [3 /*break*/, 15];
            case 4:
                manager.getServiceInstance(sessionID).setValue(sessionID, message.value);
                return [3 /*break*/, 15];
            case 5:
                manager.getServiceInstance(sessionID).applyDeltas(sessionID, message.value);
                return [3 /*break*/, 15];
            case 6:
                _d = postMessage;
                _e = "hover";
                return [4 /*yield*/, manager.getServiceInstance(sessionID).doHover(sessionID, message.value)];
            case 7:
                _d[_e] = _h.sent();
                return [3 /*break*/, 15];
            case 8:
                _f = postMessage;
                _g = "annotations";
                return [4 /*yield*/, manager.getServiceInstance(sessionID).doValidation(sessionID)];
            case 9:
                _f[_g] = _h.sent();
                return [3 /*break*/, 15];
            case 10: //this should be first message
            return [4 /*yield*/, manager.addDocument(sessionID, message.value, message.mode, message.options)];
            case 11:
                _h.sent();
                return [3 /*break*/, 15];
            case 12: return [4 /*yield*/, manager.changeDocumentMode(sessionID, message.mode, message.options)];
            case 13:
                _h.sent();
                return [3 /*break*/, 15];
            case 14:
                manager.getServiceInstance(sessionID).setOptions(sessionID, message.options);
                return [3 /*break*/, 15];
            case 15:
                ctx.postMessage(postMessage);
                return [2 /*return*/];
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [937], () => (__webpack_require__(8979)))
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
/******/ 			411: 1
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
/******/ 			return __webpack_require__.e(937).then(next);
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
//# sourceMappingURL=bundle.411.js.map