(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ServiceManager": () => (/* binding */ ServiceManager)
});

;// CONCATENATED MODULE: ./utils.ts
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

;// CONCATENATED MODULE: ./message-types.ts
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function message_types_define_property(obj, key, value) {
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
var BaseMessage = function BaseMessage(sessionId) {
    "use strict";
    _class_call_check(this, BaseMessage);
    message_types_define_property(this, "sessionId", void 0);
    this.sessionId = sessionId;
};
var InitMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(InitMessage, BaseMessage);
    var _super = _create_super(InitMessage);
    function InitMessage(sessionId, value, version, mode, options) {
        _class_call_check(this, InitMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.init);
        message_types_define_property(_assert_this_initialized(_this), "mode", void 0);
        message_types_define_property(_assert_this_initialized(_this), "options", void 0);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        message_types_define_property(_assert_this_initialized(_this), "version", void 0);
        _this.version = version;
        _this.options = options;
        _this.mode = mode;
        _this.value = value;
        return _this;
    }
    return InitMessage;
}(BaseMessage)));
var FormatMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(FormatMessage, BaseMessage);
    var _super = _create_super(FormatMessage);
    function FormatMessage(sessionId, value, format) {
        _class_call_check(this, FormatMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.format);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        message_types_define_property(_assert_this_initialized(_this), "format", void 0);
        _this.value = value;
        _this.format = format;
        return _this;
    }
    return FormatMessage;
}(BaseMessage)));
var CompleteMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(CompleteMessage, BaseMessage);
    var _super = _create_super(CompleteMessage);
    function CompleteMessage(sessionId, value) {
        _class_call_check(this, CompleteMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.complete);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        return _this;
    }
    return CompleteMessage;
}(BaseMessage)));
var ResolveCompletionMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(ResolveCompletionMessage, BaseMessage);
    var _super = _create_super(ResolveCompletionMessage);
    function ResolveCompletionMessage(sessionId, value) {
        _class_call_check(this, ResolveCompletionMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.resolveCompletion);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        return _this;
    }
    return ResolveCompletionMessage;
}(BaseMessage)));
var HoverMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(HoverMessage, BaseMessage);
    var _super = _create_super(HoverMessage);
    function HoverMessage(sessionId, value) {
        _class_call_check(this, HoverMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.hover);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        return _this;
    }
    return HoverMessage;
}(BaseMessage)));
var ValidateMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(ValidateMessage, BaseMessage);
    var _super = _create_super(ValidateMessage);
    function ValidateMessage(sessionId) {
        _class_call_check(this, ValidateMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.validate);
        return _this;
    }
    return ValidateMessage;
}(BaseMessage)));
var ChangeMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(ChangeMessage, BaseMessage);
    var _super = _create_super(ChangeMessage);
    function ChangeMessage(sessionId, value, version) {
        _class_call_check(this, ChangeMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.change);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        message_types_define_property(_assert_this_initialized(_this), "version", void 0);
        _this.value = value;
        _this.version = version;
        return _this;
    }
    return ChangeMessage;
}(BaseMessage)));
var DeltasMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(DeltasMessage, BaseMessage);
    var _super = _create_super(DeltasMessage);
    function DeltasMessage(sessionId, value, version) {
        _class_call_check(this, DeltasMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.applyDelta);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        message_types_define_property(_assert_this_initialized(_this), "version", void 0);
        _this.value = value;
        _this.version = version;
        return _this;
    }
    return DeltasMessage;
}(BaseMessage)));
var ChangeModeMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(ChangeModeMessage, BaseMessage);
    var _super = _create_super(ChangeModeMessage);
    function ChangeModeMessage(sessionId, value, mode) {
        _class_call_check(this, ChangeModeMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.changeMode);
        message_types_define_property(_assert_this_initialized(_this), "mode", void 0);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        _this.mode = mode;
        return _this;
    }
    return ChangeModeMessage;
}(BaseMessage)));
var ChangeOptionsMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(ChangeOptionsMessage, BaseMessage);
    var _super = _create_super(ChangeOptionsMessage);
    function ChangeOptionsMessage(sessionId, options) {
        var merge = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        _class_call_check(this, ChangeOptionsMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.changeOptions);
        message_types_define_property(_assert_this_initialized(_this), "options", void 0);
        message_types_define_property(_assert_this_initialized(_this), "merge", void 0);
        _this.options = options;
        _this.merge = merge;
        return _this;
    }
    return ChangeOptionsMessage;
}(BaseMessage)));
var DisposeMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(DisposeMessage, BaseMessage);
    var _super = _create_super(DisposeMessage);
    function DisposeMessage(sessionId) {
        _class_call_check(this, DisposeMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.dispose);
        return _this;
    }
    return DisposeMessage;
}(BaseMessage)));
var GlobalOptionsMessage = function GlobalOptionsMessage(serviceName, options, merge) {
    "use strict";
    _class_call_check(this, GlobalOptionsMessage);
    message_types_define_property(this, "type", MessageType.globalOptions);
    message_types_define_property(this, "serviceName", void 0);
    message_types_define_property(this, "options", void 0);
    message_types_define_property(this, "merge", void 0);
    this.serviceName = serviceName;
    this.options = options;
    this.merge = merge;
};
var ConfigureFeaturesMessage = function ConfigureFeaturesMessage(serviceName, options) {
    "use strict";
    _class_call_check(this, ConfigureFeaturesMessage);
    message_types_define_property(this, "type", MessageType.configureFeatures);
    message_types_define_property(this, "serviceName", void 0);
    message_types_define_property(this, "options", void 0);
    this.serviceName = serviceName;
    this.options = options;
};
var SignatureHelpMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(SignatureHelpMessage, BaseMessage);
    var _super = _create_super(SignatureHelpMessage);
    function SignatureHelpMessage(sessionId, value) {
        _class_call_check(this, SignatureHelpMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.signatureHelp);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        return _this;
    }
    return SignatureHelpMessage;
}(BaseMessage)));
var DocumentHighlightMessage = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(BaseMessage) {
    "use strict";
    _inherits(DocumentHighlightMessage, BaseMessage);
    var _super = _create_super(DocumentHighlightMessage);
    function DocumentHighlightMessage(sessionId, value) {
        _class_call_check(this, DocumentHighlightMessage);
        var _this;
        _this = _super.call(this, sessionId);
        message_types_define_property(_assert_this_initialized(_this), "type", MessageType.documentHighlight);
        message_types_define_property(_assert_this_initialized(_this), "value", void 0);
        _this.value = value;
        return _this;
    }
    return DocumentHighlightMessage;
}(BaseMessage)));
var MessageType;
(function(MessageType) {
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
    MessageType[MessageType["configureFeatures"] = 12] = "configureFeatures";
    MessageType[MessageType["signatureHelp"] = 13] = "signatureHelp";
    MessageType[MessageType["documentHighlight"] = 14] = "documentHighlight";
})(MessageType || (MessageType = {}));

;// CONCATENATED MODULE: ./services/service-manager.ts
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
function service_manager_class_call_check(instance, Constructor) {
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
function service_manager_define_property(obj, key, value) {
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
function _ts_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}


var ServiceManager = /*#__PURE__*/ function() {
    "use strict";
    function ServiceManager(ctx) {
        service_manager_class_call_check(this, ServiceManager);
        service_manager_define_property(this, "$services", {});
        service_manager_define_property(this, "$sessionIDToMode", {});
        var _this = this;
        var doValidation = function() {
            var _ref = _async_to_generator(function(document, servicesInstances) {
                var sessionIDList, postMessage, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, err;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            servicesInstances !== null && servicesInstances !== void 0 ? servicesInstances : servicesInstances = _this.getServicesInstances(document.uri);
                            if (servicesInstances.length === 0) {
                                return [
                                    2
                                ];
                            }
                            sessionIDList = Object.keys(servicesInstances[0].documents);
                            servicesInstances = _this.filterByFeature(servicesInstances, "diagnostics");
                            postMessage = {
                                "type": MessageType.validate
                            };
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                6,
                                7,
                                8
                            ]);
                            _loop = function() {
                                var sessionID, _ref, diagnostics;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            sessionID = _step.value;
                                            return [
                                                4,
                                                Promise.all(servicesInstances.map(function(el) {
                                                    return el.doValidation({
                                                        uri: sessionID
                                                    });
                                                }))
                                            ];
                                        case 1:
                                            diagnostics = (_ref = _state.sent()) !== null && _ref !== void 0 ? _ref : [];
                                            postMessage["sessionId"] = sessionID;
                                            postMessage["value"] = diagnostics.flat();
                                            ctx.postMessage(postMessage);
                                            return [
                                                2
                                            ];
                                    }
                                });
                            };
                            _iterator = sessionIDList[Symbol.iterator]();
                            _state.label = 2;
                        case 2:
                            if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                3,
                                5
                            ];
                            return [
                                5,
                                _ts_values(_loop())
                            ];
                        case 3:
                            _state.sent();
                            _state.label = 4;
                        case 4:
                            _iteratorNormalCompletion = true;
                            return [
                                3,
                                2
                            ];
                        case 5:
                            return [
                                3,
                                8
                            ];
                        case 6:
                            err = _state.sent();
                            _didIteratorError = true;
                            _iteratorError = err;
                            return [
                                3,
                                8
                            ];
                        case 7:
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                            return [
                                7
                            ];
                        case 8:
                            return [
                                2
                            ];
                    }
                });
            });
            return function doValidation(document, servicesInstances) {
                return _ref.apply(this, arguments);
            };
        }();
        var _this1 = this;
        var provideValidationForServiceInstance = function() {
            var _ref = _async_to_generator(function(serviceName) {
                var serviceInstance;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            serviceInstance = _this1.$services[serviceName].serviceInstance;
                            if (!serviceInstance) return [
                                3,
                                2
                            ];
                            return [
                                4,
                                doValidation(undefined, [
                                    serviceInstance
                                ])
                            ];
                        case 1:
                            _state.sent();
                            _state.label = 2;
                        case 2:
                            return [
                                2
                            ];
                    }
                });
            });
            return function provideValidationForServiceInstance(serviceName) {
                return _ref.apply(this, arguments);
            };
        }();
        var _this2 = this;
        ctx.addEventListener("message", function() {
            var _ref = _async_to_generator(function(ev) {
                var message, _message_sessionId, sessionID, version, postMessage, serviceInstances, documentIdentifier, _, _1, _this_filterByFeature_find, serviceName, _2, _3, _4, _5, highlights;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            message = ev.data;
                            sessionID = (_message_sessionId = message.sessionId) !== null && _message_sessionId !== void 0 ? _message_sessionId : "";
                            version = message.version;
                            postMessage = {
                                "type": message.type,
                                "sessionId": sessionID
                            };
                            serviceInstances = _this2.getServicesInstances(sessionID);
                            documentIdentifier = {
                                uri: sessionID,
                                version: version
                            };
                            _ = message["type"];
                            switch(_){
                                case MessageType.format:
                                    return [
                                        3,
                                        1
                                    ];
                                case MessageType.complete:
                                    return [
                                        3,
                                        2
                                    ];
                                case MessageType.resolveCompletion:
                                    return [
                                        3,
                                        4
                                    ];
                                case MessageType.change:
                                    return [
                                        3,
                                        6
                                    ];
                                case MessageType.applyDelta:
                                    return [
                                        3,
                                        8
                                    ];
                                case MessageType.hover:
                                    return [
                                        3,
                                        10
                                    ];
                                case MessageType.validate:
                                    return [
                                        3,
                                        12
                                    ];
                                case MessageType.init:
                                    return [
                                        3,
                                        14
                                    ];
                                case MessageType.changeMode:
                                    return [
                                        3,
                                        17
                                    ];
                                case MessageType.changeOptions:
                                    return [
                                        3,
                                        20
                                    ];
                                case MessageType.dispose:
                                    return [
                                        3,
                                        22
                                    ];
                                case MessageType.globalOptions:
                                    return [
                                        3,
                                        23
                                    ];
                                case MessageType.configureFeatures:
                                    return [
                                        3,
                                        25
                                    ];
                                case MessageType.signatureHelp:
                                    return [
                                        3,
                                        27
                                    ];
                                case MessageType.documentHighlight:
                                    return [
                                        3,
                                        29
                                    ];
                            }
                            return [
                                3,
                                31
                            ];
                        case 1:
                            serviceInstances = _this2.filterByFeature(serviceInstances, "format");
                            if (serviceInstances.length > 0) {
                                //we will use only first service to format
                                postMessage["value"] = serviceInstances[0].format(documentIdentifier, message.value, message.format);
                            }
                            return [
                                3,
                                31
                            ];
                        case 2:
                            _1 = "value";
                            return [
                                4,
                                Promise.all(_this2.filterByFeature(serviceInstances, "completion").map(function() {
                                    var _ref = _async_to_generator(function(service) {
                                        var _tmp;
                                        return _ts_generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    _tmp = {};
                                                    return [
                                                        4,
                                                        service.doComplete(documentIdentifier, message.value)
                                                    ];
                                                case 1:
                                                    return [
                                                        2,
                                                        (_tmp.completions = _state.sent(), _tmp.service = service.serviceData.className, _tmp)
                                                    ];
                                            }
                                        });
                                    });
                                    return function(service) {
                                        return _ref.apply(this, arguments);
                                    };
                                }()))
                            ];
                        case 3:
                            postMessage[_1] = _state.sent().filter(notEmpty);
                            return [
                                3,
                                31
                            ];
                        case 4:
                            serviceName = message.value.service;
                            _2 = "value";
                            return [
                                4,
                                (_this_filterByFeature_find = _this2.filterByFeature(serviceInstances, "completionResolve").find(function(service) {
                                    if (service.serviceData.className === serviceName) {
                                        return service;
                                    }
                                })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value)
                            ];
                        case 5:
                            postMessage[_2] = _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 6:
                            serviceInstances.forEach(function(service) {
                                service.setValue(documentIdentifier, message.value);
                            });
                            return [
                                4,
                                doValidation(documentIdentifier, serviceInstances)
                            ];
                        case 7:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 8:
                            serviceInstances.forEach(function(service) {
                                service.applyDeltas(documentIdentifier, message.value);
                            });
                            return [
                                4,
                                doValidation(documentIdentifier, serviceInstances)
                            ];
                        case 9:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 10:
                            _3 = "value";
                            return [
                                4,
                                Promise.all(_this2.filterByFeature(serviceInstances, "hover").map(function() {
                                    var _ref = _async_to_generator(function(service) {
                                        return _ts_generator(this, function(_state) {
                                            return [
                                                2,
                                                service.doHover(documentIdentifier, message.value)
                                            ];
                                        });
                                    });
                                    return function(service) {
                                        return _ref.apply(this, arguments);
                                    };
                                }()))
                            ];
                        case 11:
                            postMessage[_3] = _state.sent().filter(notEmpty);
                            return [
                                3,
                                31
                            ];
                        case 12:
                            _4 = "value";
                            return [
                                4,
                                doValidation(documentIdentifier, serviceInstances)
                            ];
                        case 13:
                            postMessage[_4] = _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 14:
                            return [
                                4,
                                _this2.addDocument(documentIdentifier, message.value, message.mode, message.options)
                            ];
                        case 15:
                            _state.sent();
                            return [
                                4,
                                doValidation(documentIdentifier)
                            ];
                        case 16:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 17:
                            return [
                                4,
                                _this2.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options)
                            ];
                        case 18:
                            _state.sent();
                            return [
                                4,
                                doValidation(documentIdentifier, serviceInstances)
                            ];
                        case 19:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 20:
                            serviceInstances.forEach(function(service) {
                                service.setOptions(sessionID, message.options);
                            });
                            return [
                                4,
                                doValidation(documentIdentifier, serviceInstances)
                            ];
                        case 21:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 22:
                            _this2.removeDocument(documentIdentifier);
                            return [
                                3,
                                31
                            ];
                        case 23:
                            _this2.setGlobalOptions(message.serviceName, message.options, message.merge);
                            return [
                                4,
                                provideValidationForServiceInstance(message.serviceName)
                            ];
                        case 24:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 25:
                            _this2.configureFeatures(message.serviceName, message.options);
                            return [
                                4,
                                provideValidationForServiceInstance(message.serviceName)
                            ];
                        case 26:
                            _state.sent();
                            return [
                                3,
                                31
                            ];
                        case 27:
                            _5 = "value";
                            return [
                                4,
                                Promise.all(_this2.filterByFeature(serviceInstances, "signatureHelp").map(function() {
                                    var _ref = _async_to_generator(function(service) {
                                        return _ts_generator(this, function(_state) {
                                            return [
                                                2,
                                                service.provideSignatureHelp(documentIdentifier, message.value)
                                            ];
                                        });
                                    });
                                    return function(service) {
                                        return _ref.apply(this, arguments);
                                    };
                                }()))
                            ];
                        case 28:
                            postMessage[_5] = _state.sent().filter(notEmpty);
                            return [
                                3,
                                31
                            ];
                        case 29:
                            return [
                                4,
                                Promise.all(_this2.filterByFeature(serviceInstances, "documentHighlight").map(function() {
                                    var _ref = _async_to_generator(function(service) {
                                        return _ts_generator(this, function(_state) {
                                            return [
                                                2,
                                                service.findDocumentHighlights(documentIdentifier, message.value)
                                            ];
                                        });
                                    });
                                    return function(service) {
                                        return _ref.apply(this, arguments);
                                    };
                                }()))
                            ];
                        case 30:
                            highlights = _state.sent().filter(notEmpty);
                            postMessage["value"] = highlights.flat();
                            return [
                                3,
                                31
                            ];
                        case 31:
                            ctx.postMessage(postMessage);
                            return [
                                2
                            ];
                    }
                });
            });
            return function(ev) {
                return _ref.apply(this, arguments);
            };
        }());
    }
    _create_class(ServiceManager, [
        {
            key: "$getServicesInstancesByMode",
            value: function $getServicesInstancesByMode(mode) {
                var _this = this;
                return _async_to_generator(function() {
                    var services;
                    return _ts_generator(this, function(_state) {
                        services = _this.findServicesByMode(mode);
                        if (services.length === 0) {
                            return [
                                2,
                                []
                            ];
                        }
                        return [
                            2,
                            Promise.all(services.map(function() {
                                var _ref = _async_to_generator(function(service) {
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                if (!!service.serviceInstance) return [
                                                    3,
                                                    2
                                                ];
                                                return [
                                                    4,
                                                    ServiceManager.$initServiceInstance(service)
                                                ];
                                            case 1:
                                                return [
                                                    2,
                                                    _state.sent()
                                                ];
                                            case 2:
                                                return [
                                                    2,
                                                    service.serviceInstance
                                                ];
                                            case 3:
                                                return [
                                                    2
                                                ];
                                        }
                                    });
                                });
                                return function(service) {
                                    return _ref.apply(this, arguments);
                                };
                            }()))
                        ];
                    });
                })();
            }
        },
        {
            key: "setGlobalOptions",
            value: function setGlobalOptions(serviceName, options) {
                var merge = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                var service = this.$services[serviceName];
                if (!service) return;
                service.options = merge ? mergeObjects(options, service.options) : options;
                if (service.serviceInstance) {
                    service.serviceInstance.setGlobalOptions(service.options);
                }
            }
        },
        {
            key: "addDocument",
            value: function addDocument(documentIdentifier, documentValue, mode, options) {
                var _this = this;
                return _async_to_generator(function() {
                    var serviceInstances, documentItem;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (!mode || !/^ace\/mode\//.test(mode)) return [
                                    2
                                ];
                                mode = mode.replace("ace/mode/", "");
                                return [
                                    4,
                                    _this.$getServicesInstancesByMode(mode)
                                ];
                            case 1:
                                serviceInstances = _state.sent();
                                if (serviceInstances.length === 0) return [
                                    2
                                ];
                                documentItem = {
                                    uri: documentIdentifier.uri,
                                    version: documentIdentifier.version,
                                    languageId: mode,
                                    text: documentValue
                                };
                                serviceInstances.forEach(function(el) {
                                    return el.addDocument(documentItem);
                                });
                                _this.$sessionIDToMode[documentIdentifier.uri] = mode;
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "changeDocumentMode",
            value: function changeDocumentMode(documentIdentifier, value, mode, options) {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this.removeDocument(documentIdentifier);
                                return [
                                    4,
                                    _this.addDocument(documentIdentifier, value, mode, options)
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "removeDocument",
            value: function removeDocument(document) {
                var services = this.getServicesInstances(document.uri);
                if (services.length > 0) {
                    services.forEach(function(el) {
                        return el.removeDocument(document);
                    });
                    delete this.$sessionIDToMode[document.uri];
                }
            }
        },
        {
            key: "getServicesInstances",
            value: function getServicesInstances(sessionID) {
                var mode = this.$sessionIDToMode[sessionID];
                if (!mode) return []; //TODO:
                var services = this.findServicesByMode(mode);
                return services.map(function(el) {
                    return el.serviceInstance;
                }).filter(notEmpty);
            }
        },
        {
            key: "filterByFeature",
            value: function filterByFeature(serviceInstances, feature) {
                return serviceInstances.filter(function(el) {
                    return el.serviceData.features[feature] === true;
                });
            }
        },
        {
            key: "findServicesByMode",
            value: function findServicesByMode(mode) {
                return Object.values(this.$services).filter(function(el) {
                    var extensions = el.modes.split("|");
                    if (extensions.includes(mode)) return el;
                });
            }
        },
        {
            key: "registerService",
            value: function registerService(name, service) {
                service.features = this.setDefaultFeaturesState(service.features);
                this.$services[name] = service;
            }
        },
        {
            key: "configureFeatures",
            value: function configureFeatures(name, features) {
                features = this.setDefaultFeaturesState(features);
                this.$services[name].features = features;
            }
        },
        {
            key: "setDefaultFeaturesState",
            value: function setDefaultFeaturesState(serviceFeatures) {
                var _features, _features1, _features2, _features3, _features4, _features5, _features6;
                var features = serviceFeatures !== null && serviceFeatures !== void 0 ? serviceFeatures : {};
                var _hover;
                (_hover = (_features = features).hover) !== null && _hover !== void 0 ? _hover : _features.hover = true;
                var _completion;
                (_completion = (_features1 = features).completion) !== null && _completion !== void 0 ? _completion : _features1.completion = true;
                var _completionResolve;
                (_completionResolve = (_features2 = features).completionResolve) !== null && _completionResolve !== void 0 ? _completionResolve : _features2.completionResolve = true;
                var _format;
                (_format = (_features3 = features).format) !== null && _format !== void 0 ? _format : _features3.format = true;
                var _diagnostics;
                (_diagnostics = (_features4 = features).diagnostics) !== null && _diagnostics !== void 0 ? _diagnostics : _features4.diagnostics = true;
                var _signatureHelp;
                (_signatureHelp = (_features5 = features).signatureHelp) !== null && _signatureHelp !== void 0 ? _signatureHelp : _features5.signatureHelp = true;
                var _documentHighlight;
                (_documentHighlight = (_features6 = features).documentHighlight) !== null && _documentHighlight !== void 0 ? _documentHighlight : _features6.documentHighlight = true;
                return features;
            }
        }
    ], [
        {
            key: "$initServiceInstance",
            value: function $initServiceInstance(service) {
                return _async_to_generator(function() {
                    var module;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    service.module()
                                ];
                            case 1:
                                module = _state.sent();
                                service.serviceInstance = new module[service.className](service.modes);
                                if (service.options) service.serviceInstance.setGlobalOptions(service.options);
                                service.serviceInstance.serviceData = service;
                                return [
                                    2,
                                    service.serviceInstance
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return ServiceManager;
}();

/******/ 	return __webpack_exports__;
/******/ })()
;
});