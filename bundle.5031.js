(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5031],{

/***/ 5031:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();
    else { var i, a; }
})(this, ()=>{
    return /******/ (()=>{
        /******/ "use strict";
        /******/ var __webpack_modules__ = {
            /***/ 6002: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_553__)=>{
                /* harmony export */ __nested_webpack_require_553__.d(__nested_webpack_exports__, {
                    /* harmony export */ Cs: ()=>/* binding */ MessageType
                });
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, DisposeMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage */ function _define_property(obj, key, value) {
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
                class BaseMessage {
                    constructor(sessionId){
                        _define_property(this, "sessionId", void 0);
                        this.sessionId = sessionId;
                    }
                }
                class InitMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value, version, mode, options){
                        super(sessionId);
                        _define_property(this, "type", MessageType.init);
                        _define_property(this, "mode", void 0);
                        _define_property(this, "options", void 0);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.version = version;
                        this.options = options;
                        this.mode = mode;
                        this.value = value;
                    }
                }
                class FormatMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value, format){
                        super(sessionId);
                        _define_property(this, "type", MessageType.format);
                        _define_property(this, "value", void 0);
                        _define_property(this, "format", void 0);
                        this.value = value;
                        this.format = format;
                    }
                }
                class CompleteMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.complete);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class ResolveCompletionMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.resolveCompletion);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class HoverMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.hover);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class ValidateMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId){
                        super(sessionId);
                        _define_property(this, "type", MessageType.validate);
                    }
                }
                class ChangeMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value, version){
                        super(sessionId);
                        _define_property(this, "type", MessageType.change);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.version = version;
                    }
                }
                class DeltasMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value, version){
                        super(sessionId);
                        _define_property(this, "type", MessageType.applyDelta);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.version = version;
                    }
                }
                class ChangeModeMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value, mode){
                        super(sessionId);
                        _define_property(this, "type", MessageType.changeMode);
                        _define_property(this, "mode", void 0);
                        _define_property(this, "value", void 0);
                        this.value = value;
                        this.mode = mode;
                    }
                }
                class ChangeOptionsMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, options, merge = false){
                        super(sessionId);
                        _define_property(this, "type", MessageType.changeOptions);
                        _define_property(this, "options", void 0);
                        _define_property(this, "merge", void 0);
                        this.options = options;
                        this.merge = merge;
                    }
                }
                class DisposeMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId){
                        super(sessionId);
                        _define_property(this, "type", MessageType.dispose);
                    }
                }
                class GlobalOptionsMessage {
                    constructor(serviceName, options, merge){
                        _define_property(this, "type", MessageType.globalOptions);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "options", void 0);
                        _define_property(this, "merge", void 0);
                        this.serviceName = serviceName;
                        this.options = options;
                        this.merge = merge;
                    }
                }
                class ConfigureFeaturesMessage {
                    constructor(serviceName, options){
                        _define_property(this, "type", MessageType.configureFeatures);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "options", void 0);
                        this.serviceName = serviceName;
                        this.options = options;
                    }
                }
                class SignatureHelpMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.signatureHelp);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class DocumentHighlightMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.documentHighlight);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
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
            /***/ },
            /***/ 6297: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_10647__)=>{
                /* harmony export */ __nested_webpack_require_10647__.d(__nested_webpack_exports__, {
                    /* harmony export */ Dw: ()=>/* binding */ notEmpty,
                    /* harmony export */ PM: ()=>/* binding */ mergeObjects
                });
                /* unused harmony exports mergeRanges, checkValueAgainstRegexpArray */ function mergeObjects(obj1, obj2) {
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
                function notEmpty(value) {
                    return value !== null && value !== undefined;
                }
                //taken with small changes from ace-code
                function mergeRanges(ranges) {
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
            /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __nested_webpack_require_14116__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/ if (cachedModule !== undefined) {
                /******/ return cachedModule.exports;
            /******/ }
            /******/ // Create a new module (and put it into the cache)
            /******/ var module1 = __webpack_module_cache__[moduleId] = {
                /******/ // no module.id needed
                /******/ // no module.loaded needed
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_14116__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_14116__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_14116__.o(definition, key) && !__nested_webpack_require_14116__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_14116__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_14116__.r = (exports1)=>{
                /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    /******/ Object.defineProperty(exports1, Symbol.toStringTag, {
                        value: 'Module'
                    });
                /******/ }
                /******/ Object.defineProperty(exports1, '__esModule', {
                    value: true
                });
            /******/ };
        /******/ })();
        /******/ /************************************************************************/ var __nested_webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
        (()=>{
            __nested_webpack_require_14116__.r(__nested_webpack_exports__);
            /* harmony export */ __nested_webpack_require_14116__.d(__nested_webpack_exports__, {
                /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
            });
            /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_14116__(6297);
            /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_14116__(6002);
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
            class ServiceManager {
                static async $initServiceInstance(service, ctx) {
                    let module1;
                    if ('type' in service) {
                        if ([
                            "socket",
                            "webworker"
                        ].includes(service.type)) {
                            module1 = await service.module();
                            service.serviceInstance = new module1["LanguageClient"](service, ctx);
                        } else throw "Unknown service type";
                    } else {
                        module1 = await service.module();
                        service.serviceInstance = new module1[service.className](service.modes);
                    }
                    if (service.options || service.initializationOptions) {
                        var _service_options, _ref;
                        service.serviceInstance.setGlobalOptions((_ref = (_service_options = service.options) !== null && _service_options !== void 0 ? _service_options : service.initializationOptions) !== null && _ref !== void 0 ? _ref : {});
                    }
                    service.serviceInstance.serviceData = service;
                    return service.serviceInstance;
                }
                async $getServicesInstancesByMode(mode) {
                    let services = this.findServicesByMode(mode);
                    if (services.length === 0) {
                        return [];
                    }
                    return Promise.all(services.map((service)=>this.initializeService(service)));
                }
                async initializeService(service) {
                    if (!service.serviceInstance) {
                        if (!this.serviceInitPromises[service.id]) {
                            this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx).then((instance)=>{
                                service.serviceInstance = instance;
                                delete this.serviceInitPromises[service.id]; // Clean up
                                return instance;
                            });
                        }
                        return this.serviceInitPromises[service.id];
                    } else {
                        return service.serviceInstance;
                    }
                }
                setGlobalOptions(serviceName, options, merge = false) {
                    let service = this.$services[serviceName];
                    if (!service) return;
                    service.options = merge ? (0, _utils__WEBPACK_IMPORTED_MODULE_1__ /* .mergeObjects */ .PM)(options, service.options) : options;
                    if (service.serviceInstance) {
                        service.serviceInstance.setGlobalOptions(service.options);
                    }
                }
                async addDocument(documentIdentifier, documentValue, mode, options) {
                    if (!mode || !/^ace\/mode\//.test(mode)) return;
                    mode = mode.replace("ace/mode/", "");
                    let serviceInstances = await this.$getServicesInstancesByMode(mode);
                    if (serviceInstances.length === 0) return;
                    let documentItem = {
                        uri: documentIdentifier.uri,
                        version: documentIdentifier.version,
                        languageId: mode,
                        text: documentValue
                    };
                    serviceInstances.forEach((el)=>el.addDocument(documentItem));
                    this.$sessionIDToMode[documentIdentifier.uri] = mode;
                    return serviceInstances;
                }
                async changeDocumentMode(documentIdentifier, value, mode, options) {
                    this.removeDocument(documentIdentifier);
                    return await this.addDocument(documentIdentifier, value, mode, options);
                }
                removeDocument(document) {
                    let services = this.getServicesInstances(document.uri);
                    if (services.length > 0) {
                        services.forEach((el)=>el.removeDocument(document));
                        delete this.$sessionIDToMode[document.uri];
                    }
                }
                getServicesInstances(sessionID) {
                    let mode = this.$sessionIDToMode[sessionID];
                    if (!mode) return []; //TODO:
                    let services = this.findServicesByMode(mode);
                    return services.map((el)=>el.serviceInstance).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                }
                filterByFeature(serviceInstances, feature) {
                    return serviceInstances.filter((el)=>el.serviceData.features[feature] === true);
                }
                findServicesByMode(mode) {
                    return Object.values(this.$services).filter((el)=>{
                        let extensions = el.modes.split('|');
                        if (extensions.includes(mode)) return el;
                    });
                }
                registerService(name, service) {
                    service.id = name;
                    service.features = this.setDefaultFeaturesState(service.features);
                    this.$services[name] = service;
                }
                registerServer(name, clientConfig) {
                    clientConfig.id = name;
                    clientConfig.className = "LanguageClient";
                    clientConfig.features = this.setDefaultFeaturesState(clientConfig.features);
                    this.$services[name] = clientConfig;
                }
                configureFeatures(name, features) {
                    features = this.setDefaultFeaturesState(features);
                    if (!this.$services[name]) return;
                    this.$services[name].features = features;
                }
                setDefaultFeaturesState(serviceFeatures) {
                    var _features, _features1, _features2, _features3, _features4, _features5, _features6;
                    let features = serviceFeatures !== null && serviceFeatures !== void 0 ? serviceFeatures : {};
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
                constructor(ctx){
                    _define_property(this, "$services", {});
                    _define_property(this, "serviceInitPromises", {});
                    _define_property(this, "$sessionIDToMode", {});
                    _define_property(this, "ctx", void 0);
                    this.ctx = ctx;
                    let doValidation = async (document, servicesInstances)=>{
                        servicesInstances !== null && servicesInstances !== void 0 ? servicesInstances : servicesInstances = this.getServicesInstances(document.uri);
                        if (servicesInstances.length === 0) {
                            return;
                        }
                        //this is list of documents linked to services
                        let sessionIDList = Object.keys(servicesInstances[0].documents);
                        servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
                        servicesInstances = servicesInstances.filter((el)=>{
                            return el.serviceCapabilities.diagnosticProvider;
                        });
                        if (servicesInstances.length === 0) {
                            return;
                        }
                        let postMessage = {
                            "type": _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.validate
                        };
                        for (let sessionID of sessionIDList){
                            var _ref;
                            let diagnostics = (_ref = await Promise.all(servicesInstances.map((el)=>{
                                return el.doValidation({
                                    uri: sessionID
                                });
                            }))) !== null && _ref !== void 0 ? _ref : [];
                            postMessage["sessionId"] = sessionID;
                            postMessage["value"] = diagnostics.flat();
                            ctx.postMessage(postMessage);
                        }
                    };
                    let provideValidationForServiceInstance = async (serviceName)=>{
                        let service = this.$services[serviceName];
                        if (!service) return;
                        var serviceInstance = service.serviceInstance;
                        if (serviceInstance) await doValidation(undefined, [
                            serviceInstance
                        ]);
                    };
                    ctx.addEventListener("message", async (ev)=>{
                        let message = ev.data;
                        var _message_sessionId;
                        let sessionID = (_message_sessionId = message.sessionId) !== null && _message_sessionId !== void 0 ? _message_sessionId : "";
                        let version = message.version;
                        let postMessage = {
                            "type": message.type,
                            "sessionId": sessionID
                        };
                        let serviceInstances = this.getServicesInstances(sessionID);
                        let documentIdentifier = {
                            uri: sessionID,
                            version: version
                        };
                        switch(message["type"]){
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.format:
                                serviceInstances = this.filterByFeature(serviceInstances, "format");
                                if (serviceInstances.length > 0) {
                                    //we will use only first service to format
                                    postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
                                }
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.complete:
                                postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service)=>{
                                    return {
                                        completions: await service.doComplete(documentIdentifier, message.value),
                                        service: service.serviceData.className
                                    };
                                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.resolveCompletion:
                                var _this_filterByFeature_find;
                                let serviceName = message.value.service;
                                postMessage["value"] = await ((_this_filterByFeature_find = this.filterByFeature(serviceInstances, "completionResolve").find((service)=>{
                                    if (service.serviceData.className === serviceName) {
                                        return service;
                                    }
                                })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value));
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.change:
                                serviceInstances.forEach((service)=>{
                                    service.setValue(documentIdentifier, message.value);
                                });
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.applyDelta:
                                serviceInstances.forEach((service)=>{
                                    service.applyDeltas(documentIdentifier, message.value);
                                });
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.hover:
                                postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "hover").map(async (service)=>{
                                    return service.doHover(documentIdentifier, message.value);
                                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.validate:
                                postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.init:
                                var _this;
                                postMessage["value"] = (_this = await this.addDocument(documentIdentifier, message.value, message.mode, message.options)) === null || _this === void 0 ? void 0 : _this.map((el)=>el.serviceCapabilities);
                                await doValidation(documentIdentifier);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.changeMode:
                                var _this1;
                                postMessage["value"] = (_this1 = await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options)) === null || _this1 === void 0 ? void 0 : _this1.map((el)=>el.serviceCapabilities);
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.changeOptions:
                                serviceInstances.forEach((service)=>{
                                    service.setOptions(sessionID, message.options);
                                });
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.dispose:
                                this.removeDocument(documentIdentifier);
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.globalOptions:
                                this.setGlobalOptions(message.serviceName, message.options, message.merge);
                                await provideValidationForServiceInstance(message.serviceName);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.configureFeatures:
                                this.configureFeatures(message.serviceName, message.options);
                                await provideValidationForServiceInstance(message.serviceName);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.signatureHelp:
                                postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "signatureHelp").map(async (service)=>{
                                    return service.provideSignatureHelp(documentIdentifier, message.value);
                                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.documentHighlight:
                                let highlights = (await Promise.all(this.filterByFeature(serviceInstances, "documentHighlight").map(async (service)=>{
                                    return service.findDocumentHighlights(documentIdentifier, message.value);
                                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                                postMessage["value"] = highlights.flat();
                                break;
                        }
                        ctx.postMessage(postMessage);
                    });
                }
            }
        })();
        /******/ return __nested_webpack_exports__;
    /******/ })();
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBVyxFQUFFNEksUUFBUXBLLE9BQU87Z0NBQzNELE1BQU1pSyxvQ0FBb0NHLFFBQVE1SSxXQUFXO2dDQUM3RDs0QkFDSixLQUFLd0QsNENBQTJDLGdCQUFnQixJQUFJakcsRUFBRSxDQUFDOEMsYUFBYTtnQ0FDaEZrSSxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTTlELFFBQVFDLEdBQUcsQ0FBQyxJQUFJLENBQUMwQixlQUFlLENBQUNkLGtCQUFrQixpQkFBaUJYLEdBQUcsQ0FBQyxPQUFPakI7b0NBQ3pHLE9BQU9BLFFBQVFnRyxvQkFBb0IsQ0FBQ3ZFLG9CQUFvQnlELFFBQVFoTCxLQUFLO2dDQUN6RSxHQUFFLEVBQUd1SSxNQUFNLENBQUM1QyxvQ0FBbUMsYUFBYSxJQUFJL0MsRUFBRTtnQ0FDbEU7NEJBQ0osS0FBS2dELDRDQUEyQyxnQkFBZ0IsSUFBSWpHLEVBQUUsQ0FBQ2dELGlCQUFpQjtnQ0FDcEYsSUFBSW9KLGFBQWEsQ0FBQyxNQUFNbEYsUUFBUUMsR0FBRyxDQUFDLElBQUksQ0FBQzBCLGVBQWUsQ0FBQ2Qsa0JBQWtCLHFCQUFxQlgsR0FBRyxDQUFDLE9BQU9qQjtvQ0FDdkcsT0FBT0EsUUFBUWtHLHNCQUFzQixDQUFDekUsb0JBQW9CeUQsUUFBUWhMLEtBQUs7Z0NBQzNFLEdBQUUsRUFBR3VJLE1BQU0sQ0FBQzVDLG9DQUFtQyxhQUFhLElBQUkvQyxFQUFFO2dDQUNsRStILFdBQVcsQ0FBQyxRQUFRLEdBQUdvQixXQUFXbkIsSUFBSTtnQ0FDdEM7d0JBQ1I7d0JBQ0E3RSxJQUFJNEUsV0FBVyxDQUFDQTtvQkFDcEI7Z0JBQ0o7WUFDSjtRQUVBO1FBRUEsTUFBTSxHQUFJLE9BQU9uTCwwQkFBbUJBO0lBQ3BDLE1BQU0sR0FBRztBQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL3BhY2thZ2VzL2FjZS1saW50ZXJzL2J1aWxkL3NlcnZpY2UtbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgKCkgPT4ge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gNjAwMjpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgQ3M6ICgpID0+ICgvKiBiaW5kaW5nICovIE1lc3NhZ2VUeXBlKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIEJhc2VNZXNzYWdlLCBJbml0TWVzc2FnZSwgRm9ybWF0TWVzc2FnZSwgQ29tcGxldGVNZXNzYWdlLCBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UsIEhvdmVyTWVzc2FnZSwgVmFsaWRhdGVNZXNzYWdlLCBDaGFuZ2VNZXNzYWdlLCBEZWx0YXNNZXNzYWdlLCBDaGFuZ2VNb2RlTWVzc2FnZSwgQ2hhbmdlT3B0aW9uc01lc3NhZ2UsIERpc3Bvc2VNZXNzYWdlLCBHbG9iYWxPcHRpb25zTWVzc2FnZSwgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlLCBTaWduYXR1cmVIZWxwTWVzc2FnZSwgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlICovXG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5jbGFzcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlc3Npb25JZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICB9XG59XG5jbGFzcyBJbml0TWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUsIG9wdGlvbnMpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5pbml0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBGb3JtYXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgZm9ybWF0KXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZm9ybWF0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJmb3JtYXRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG59XG5jbGFzcyBDb21wbGV0ZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29tcGxldGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZXNvbHZlQ29tcGxldGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgSG92ZXJNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmhvdmVyKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBWYWxpZGF0ZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS52YWxpZGF0ZSk7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIERlbHRhc01lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbHlEZWx0YSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTW9kZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBtb2RlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlTW9kZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlT3B0aW9uc01lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2Upe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBEaXNwb3NlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRpc3Bvc2UpO1xuICAgIH1cbn1cbmNsYXNzIEdsb2JhbE9wdGlvbnNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2Upe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nbG9iYWxPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29uZmlndXJlRmVhdHVyZXMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbn1cbmNsYXNzIFNpZ25hdHVyZUhlbHBNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNpZ25hdHVyZUhlbHApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5kb2N1bWVudEhpZ2hsaWdodCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxudmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uKE1lc3NhZ2VUeXBlKSB7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJpbml0XCJdID0gMF0gPSBcImluaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImZvcm1hdFwiXSA9IDFdID0gXCJmb3JtYXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbXBsZXRlXCJdID0gMl0gPSBcImNvbXBsZXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZXNvbHZlQ29tcGxldGlvblwiXSA9IDNdID0gXCJyZXNvbHZlQ29tcGxldGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlXCJdID0gNF0gPSBcImNoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaG92ZXJcIl0gPSA1XSA9IFwiaG92ZXJcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInZhbGlkYXRlXCJdID0gNl0gPSBcInZhbGlkYXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseURlbHRhXCJdID0gN10gPSBcImFwcGx5RGVsdGFcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU1vZGVcIl0gPSA4XSA9IFwiY2hhbmdlTW9kZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlT3B0aW9uc1wiXSA9IDldID0gXCJjaGFuZ2VPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkaXNwb3NlXCJdID0gMTBdID0gXCJkaXNwb3NlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnbG9iYWxPcHRpb25zXCJdID0gMTFdID0gXCJnbG9iYWxPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb25maWd1cmVGZWF0dXJlc1wiXSA9IDEyXSA9IFwiY29uZmlndXJlRmVhdHVyZXNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNpZ25hdHVyZUhlbHBcIl0gPSAxM10gPSBcInNpZ25hdHVyZUhlbHBcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRvY3VtZW50SGlnaGxpZ2h0XCJdID0gMTRdID0gXCJkb2N1bWVudEhpZ2hsaWdodFwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gNjI5Nzpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgRHc6ICgpID0+ICgvKiBiaW5kaW5nICovIG5vdEVtcHR5KSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgUE06ICgpID0+ICgvKiBiaW5kaW5nICovIG1lcmdlT2JqZWN0cylcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBtZXJnZVJhbmdlcywgY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSAqL1xuZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG9iajEsIG9iajIpIHtcbiAgICBpZiAoIW9iajEpIHJldHVybiBvYmoyO1xuICAgIGlmICghb2JqMikgcmV0dXJuIG9iajE7XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gbm90RW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIXJhbmdlLmlzRW1wdHkoKSAmJiAhbmV4dC5pc0VtcHR5KCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuZW5kKSA8IDApIHtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5yb3cgPSBuZXh0LmVuZC5yb3c7XG4gICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbmV4dC5lbmQuY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICBuZXh0ID0gcmFuZ2U7XG4gICAgICAgIGktLTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG59XG5mdW5jdGlvbiBjb21wYXJlUG9pbnRzKHAxLCBwMikge1xuICAgIHJldHVybiBwMS5yb3cgLSBwMi5yb3cgfHwgcDEuY29sdW1uIC0gcDIuY29sdW1uO1xufVxuZnVuY3Rpb24gY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSh2YWx1ZSwgcmVnZXhwQXJyYXkpIHtcbiAgICBpZiAoIXJlZ2V4cEFycmF5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ2V4cEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYgKHJlZ2V4cEFycmF5W2ldLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4oKCkgPT4ge1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU2VydmljZU1hbmFnZXI6ICgpID0+ICgvKiBiaW5kaW5nICovIFNlcnZpY2VNYW5hZ2VyKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyOTcpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwMDIpO1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbmNsYXNzIFNlcnZpY2VNYW5hZ2VyIHtcbiAgICBzdGF0aWMgYXN5bmMgJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgY3R4KSB7XG4gICAgICAgIGxldCBtb2R1bGU7XG4gICAgICAgIGlmICgndHlwZScgaW4gc2VydmljZSkge1xuICAgICAgICAgICAgaWYgKFtcbiAgICAgICAgICAgICAgICBcInNvY2tldFwiLFxuICAgICAgICAgICAgICAgIFwid2Vid29ya2VyXCJcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoc2VydmljZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW1wiTGFuZ3VhZ2VDbGllbnRcIl0oc2VydmljZSwgY3R4KTtcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBcIlVua25vd24gc2VydmljZSB0eXBlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZS5vcHRpb25zIHx8IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfb3B0aW9ucywgX3JlZjtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoKF9yZWYgPSAoX3NlcnZpY2Vfb3B0aW9ucyA9IHNlcnZpY2Uub3B0aW9ucykgIT09IG51bGwgJiYgX3NlcnZpY2Vfb3B0aW9ucyAhPT0gdm9pZCAwID8gX3NlcnZpY2Vfb3B0aW9ucyA6IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDoge30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VEYXRhID0gc2VydmljZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgIH1cbiAgICBhc3luYyAkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChzZXJ2aWNlcy5tYXAoKHNlcnZpY2UpPT50aGlzLmluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2UpKSk7XG4gICAgfVxuICAgIGFzeW5jIGluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0gPSBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCB0aGlzLmN0eCkudGhlbigoaW5zdGFuY2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07IC8vIENsZWFuIHVwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgIHNlcnZpY2Uub3B0aW9ucyA9IG1lcmdlID8gKDAsX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubWVyZ2VPYmplY3RzICovIC5QTSkob3B0aW9ucywgc2VydmljZS5vcHRpb25zKSA6IG9wdGlvbnM7XG4gICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgZG9jdW1lbnRWYWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGUgfHwgIS9eYWNlXFwvbW9kZVxcLy8udGVzdChtb2RlKSkgcmV0dXJuO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKFwiYWNlL21vZGUvXCIsIFwiXCIpO1xuICAgICAgICBsZXQgc2VydmljZUluc3RhbmNlcyA9IGF3YWl0IHRoaXMuJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgbGV0IGRvY3VtZW50SXRlbSA9IHtcbiAgICAgICAgICAgIHVyaTogZG9jdW1lbnRJZGVudGlmaWVyLnVyaSxcbiAgICAgICAgICAgIHZlcnNpb246IGRvY3VtZW50SWRlbnRpZmllci52ZXJzaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2VJZDogbW9kZSxcbiAgICAgICAgICAgIHRleHQ6IGRvY3VtZW50VmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChlbCk9PmVsLmFkZERvY3VtZW50KGRvY3VtZW50SXRlbSkpO1xuICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV0gPSBtb2RlO1xuICAgICAgICByZXR1cm4gc2VydmljZUluc3RhbmNlcztcbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKHNlc3Npb25JRCkge1xuICAgICAgICBsZXQgbW9kZSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtzZXNzaW9uSURdO1xuICAgICAgICBpZiAoIW1vZGUpIHJldHVybiBbXTsgLy9UT0RPOlxuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzLm1hcCgoZWwpPT5lbC5zZXJ2aWNlSW5zdGFuY2UpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgIH1cbiAgICBmaWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gc2VydmljZUluc3RhbmNlcy5maWx0ZXIoKGVsKT0+ZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0gPT09IHRydWUpO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLiRzZXJ2aWNlcykuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gZWwubW9kZXMuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluY2x1ZGVzKG1vZGUpKSByZXR1cm4gZWw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczY7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZUluaXRQcm9taXNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2Vzc2lvbklEVG9Nb2RlXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImN0eFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklETGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MudmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBzZXNzaW9uSUQgb2Ygc2Vzc2lvbklETGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wic2Vzc2lvbklkXCJdID0gc2Vzc2lvbklEO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZS5zZXNzaW9uSWQpICE9PSBudWxsICYmIF9tZXNzYWdlX3Nlc3Npb25JZCAhPT0gdm9pZCAwID8gX21lc3NhZ2Vfc2Vzc2lvbklkIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gbWVzc2FnZS52ZXJzaW9uO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklEXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKHNlc3Npb25JRCk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZVtcInR5cGVcIl0pe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWUuc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZG9Ib3Zlcihkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnZhbGlkYXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuaW5pdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzID0gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzLm1hcCgoZWwpPT5lbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlTW9kZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpczEgPSBhd2FpdCB0aGlzLmNoYW5nZURvY3VtZW50TW9kZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpczEubWFwKChlbCk9PmVsLnNlcnZpY2VDYXBhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldE9wdGlvbnMoc2Vzc2lvbklELCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZGlzcG9zZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3Muc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UucHJvdmlkZVNpZ25hdHVyZUhlbHAoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5maW5kRG9jdW1lbnRIaWdobGlnaHRzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBoaWdobGlnaHRzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbn0pKCk7XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkNzIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJzZXNzaW9uSWQiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UiLCJyZXNvbHZlQ29tcGxldGlvbiIsIkhvdmVyTWVzc2FnZSIsImhvdmVyIiwiVmFsaWRhdGVNZXNzYWdlIiwidmFsaWRhdGUiLCJDaGFuZ2VNZXNzYWdlIiwiY2hhbmdlIiwiRGVsdGFzTWVzc2FnZSIsImFwcGx5RGVsdGEiLCJDaGFuZ2VNb2RlTWVzc2FnZSIsImNoYW5nZU1vZGUiLCJDaGFuZ2VPcHRpb25zTWVzc2FnZSIsIm1lcmdlIiwiY2hhbmdlT3B0aW9ucyIsIkRpc3Bvc2VNZXNzYWdlIiwiZGlzcG9zZSIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkR3Iiwibm90RW1wdHkiLCJQTSIsIm1lcmdlT2JqZWN0cyIsIm9iajEiLCJvYmoyIiwibWVyZ2VkT2JqZWN0cyIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCIkaW5pdFNlcnZpY2VJbnN0YW5jZSIsInNlcnZpY2UiLCJjdHgiLCJpbmNsdWRlcyIsInR5cGUiLCJzZXJ2aWNlSW5zdGFuY2UiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwic2VydmljZXMiLCJmaW5kU2VydmljZXNCeU1vZGUiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCIkc2VydmljZXMiLCJhZGREb2N1bWVudCIsImRvY3VtZW50SWRlbnRpZmllciIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwic2VydmljZUluc3RhbmNlcyIsImRvY3VtZW50SXRlbSIsInVyaSIsImxhbmd1YWdlSWQiLCJ0ZXh0IiwiZm9yRWFjaCIsImVsIiwiJHNlc3Npb25JRFRvTW9kZSIsImNoYW5nZURvY3VtZW50TW9kZSIsInJlbW92ZURvY3VtZW50IiwiZG9jdW1lbnQiLCJnZXRTZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRCIsImZpbHRlciIsImZpbHRlckJ5RmVhdHVyZSIsImZlYXR1cmUiLCJmZWF0dXJlcyIsInZhbHVlcyIsImV4dGVuc2lvbnMiLCJzcGxpdCIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInJlZ2lzdGVyU2VydmVyIiwiY2xpZW50Q29uZmlnIiwic2VydmljZUZlYXR1cmVzIiwiX2ZlYXR1cmVzIiwiX2ZlYXR1cmVzMSIsIl9mZWF0dXJlczIiLCJfZmVhdHVyZXMzIiwiX2ZlYXR1cmVzNCIsIl9mZWF0dXJlczUiLCJfZmVhdHVyZXM2IiwiX2hvdmVyIiwiX2NvbXBsZXRpb24iLCJjb21wbGV0aW9uIiwiX2NvbXBsZXRpb25SZXNvbHZlIiwiY29tcGxldGlvblJlc29sdmUiLCJfZm9ybWF0IiwiX2RpYWdub3N0aWNzIiwiZGlhZ25vc3RpY3MiLCJfc2lnbmF0dXJlSGVscCIsIl9kb2N1bWVudEhpZ2hsaWdodCIsImRvVmFsaWRhdGlvbiIsInNlcnZpY2VzSW5zdGFuY2VzIiwic2Vzc2lvbklETGlzdCIsImRvY3VtZW50cyIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJkaWFnbm9zdGljUHJvdmlkZXIiLCJwb3N0TWVzc2FnZSIsImZsYXQiLCJwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsIm1lc3NhZ2UiLCJkYXRhIiwiX21lc3NhZ2Vfc2Vzc2lvbklkIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQiLCJmaW5kIiwiZG9SZXNvbHZlIiwic2V0VmFsdWUiLCJhcHBseURlbHRhcyIsImRvSG92ZXIiLCJfdGhpcyIsIl90aGlzMSIsInNldE9wdGlvbnMiLCJwcm92aWRlU2lnbmF0dXJlSGVscCIsImhpZ2hsaWdodHMiLCJmaW5kRG9jdW1lbnRIaWdobGlnaHRzIl0sInNvdXJjZVJvb3QiOiIifQ==