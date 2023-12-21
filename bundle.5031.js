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
                    return serviceInstances.filter((el)=>{
                        if (!el.serviceData.features[feature]) {
                            return false;
                        }
                        const capabilities = el.serviceCapabilities;
                        switch(feature){
                            case "hover":
                                return capabilities.hoverProvider == true;
                            case "completion":
                                return capabilities.completionProvider != undefined;
                            case "completionResolve":
                                var _capabilities_completionProvider;
                                return ((_capabilities_completionProvider = capabilities.completionProvider) === null || _capabilities_completionProvider === void 0 ? void 0 : _capabilities_completionProvider.resolveProvider) === true;
                            case "format":
                                return capabilities.documentRangeFormattingProvider == true || capabilities.documentFormattingProvider == true;
                            case "diagnostics":
                                return capabilities.diagnosticProvider != undefined;
                            case "signatureHelp":
                                return capabilities.signatureHelpProvider != undefined;
                            case "documentHighlight":
                                return capabilities.documentHighlightProvider == true;
                        }
                    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxpQkFBaUI7Z0NBQ3BGLElBQUk2SixhQUFhLENBQUMsTUFBTTNGLFFBQVFDLEdBQUcsQ0FBQyxJQUFJLENBQUMwQixlQUFlLENBQUNkLGtCQUFrQixxQkFBcUJYLEdBQUcsQ0FBQyxPQUFPakI7b0NBQ3ZHLE9BQU9BLFFBQVEyRyxzQkFBc0IsQ0FBQ2xGLG9CQUFvQmtFLFFBQVF6TCxLQUFLO2dDQUMzRSxHQUFFLEVBQUd1SSxNQUFNLENBQUM1QyxvQ0FBbUMsYUFBYSxJQUFJL0MsRUFBRTtnQ0FDbEV3SSxXQUFXLENBQUMsUUFBUSxHQUFHb0IsV0FBV25CLElBQUk7Z0NBQ3RDO3dCQUNSO3dCQUNBdEYsSUFBSXFGLFdBQVcsQ0FBQ0E7b0JBQ3BCO2dCQUNKO1lBQ0o7UUFFQTtRQUVBLE1BQU0sR0FBSSxPQUFPNUwsMEJBQW1CQTtJQUNwQyxNQUFNLEdBQUc7QUFFVCIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9hY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIDYwMDI6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIENzOiAoKSA9PiAoLyogYmluZGluZyAqLyBNZXNzYWdlVHlwZSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBCYXNlTWVzc2FnZSwgSW5pdE1lc3NhZ2UsIEZvcm1hdE1lc3NhZ2UsIENvbXBsZXRlTWVzc2FnZSwgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlLCBIb3Zlck1lc3NhZ2UsIFZhbGlkYXRlTWVzc2FnZSwgQ2hhbmdlTWVzc2FnZSwgRGVsdGFzTWVzc2FnZSwgQ2hhbmdlTW9kZU1lc3NhZ2UsIENoYW5nZU9wdGlvbnNNZXNzYWdlLCBEaXNwb3NlTWVzc2FnZSwgR2xvYmFsT3B0aW9uc01lc3NhZ2UsIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSwgU2lnbmF0dXJlSGVscE1lc3NhZ2UsIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSAqL1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuY2xhc3MgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXNzaW9uSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgfVxufVxuY2xhc3MgSW5pdE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCB2ZXJzaW9uLCBtb2RlLCBvcHRpb25zKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaW5pdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRm9ybWF0TWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmZvcm1hdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiZm9ybWF0XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxufVxuY2xhc3MgQ29tcGxldGVNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbXBsZXRlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUucmVzb2x2ZUNvbXBsZXRpb24pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEhvdmVyTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5ob3Zlcik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgVmFsaWRhdGVNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUudmFsaWRhdGUpO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBEZWx0YXNNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmFwcGx5RGVsdGEpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1vZGVNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgbW9kZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU1vZGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU9wdGlvbnNNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgRGlzcG9zZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5kaXNwb3NlKTtcbiAgICB9XG59XG5jbGFzcyBHbG9iYWxPcHRpb25zTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2xvYmFsT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbmZpZ3VyZUZlYXR1cmVzKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG59XG5jbGFzcyBTaWduYXR1cmVIZWxwTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zaWduYXR1cmVIZWxwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZG9jdW1lbnRIaWdobGlnaHQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbnZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbihNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaW5pdFwiXSA9IDBdID0gXCJpbml0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJmb3JtYXRcIl0gPSAxXSA9IFwiZm9ybWF0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb21wbGV0ZVwiXSA9IDJdID0gXCJjb21wbGV0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVzb2x2ZUNvbXBsZXRpb25cIl0gPSAzXSA9IFwicmVzb2x2ZUNvbXBsZXRpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZVwiXSA9IDRdID0gXCJjaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImhvdmVyXCJdID0gNV0gPSBcImhvdmVyXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJ2YWxpZGF0ZVwiXSA9IDZdID0gXCJ2YWxpZGF0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlEZWx0YVwiXSA9IDddID0gXCJhcHBseURlbHRhXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VNb2RlXCJdID0gOF0gPSBcImNoYW5nZU1vZGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU9wdGlvbnNcIl0gPSA5XSA9IFwiY2hhbmdlT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZGlzcG9zZVwiXSA9IDEwXSA9IFwiZGlzcG9zZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2xvYmFsT3B0aW9uc1wiXSA9IDExXSA9IFwiZ2xvYmFsT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29uZmlndXJlRmVhdHVyZXNcIl0gPSAxMl0gPSBcImNvbmZpZ3VyZUZlYXR1cmVzXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzaWduYXR1cmVIZWxwXCJdID0gMTNdID0gXCJzaWduYXR1cmVIZWxwXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkb2N1bWVudEhpZ2hsaWdodFwiXSA9IDE0XSA9IFwiZG9jdW1lbnRIaWdobGlnaHRcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDYyOTc6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIER3OiAoKSA9PiAoLyogYmluZGluZyAqLyBub3RFbXB0eSksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFBNOiAoKSA9PiAoLyogYmluZGluZyAqLyBtZXJnZU9iamVjdHMpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkgKi9cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGNvbnN0IG1lcmdlZE9iamVjdHMgPSB7XG4gICAgICAgIC4uLm9iajIsXG4gICAgICAgIC4uLm9iajFcbiAgICB9OyAvLyBHaXZlIHByaW9yaXR5IHRvIG9iajEgdmFsdWVzIGJ5IHNwcmVhZGluZyBvYmoyIGZpcnN0LCB0aGVuIG9iajFcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhtZXJnZWRPYmplY3RzKSl7XG4gICAgICAgIGlmIChvYmoxW2tleV0gJiYgb2JqMltrZXldKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmoxW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gb2JqMVtrZXldLmNvbmNhdChvYmoyW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoyW2tleV0uY29uY2F0KG9iajFba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmoxW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoyW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gbWVyZ2VPYmplY3RzKG9iajFba2V5XSwgb2JqMltrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkT2JqZWN0cztcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG4vL3Rha2VuIHdpdGggc21hbGwgY2hhbmdlcyBmcm9tIGFjZS1jb2RlXG5mdW5jdGlvbiBtZXJnZVJhbmdlcyhyYW5nZXMpIHtcbiAgICB2YXIgbGlzdCA9IHJhbmdlcztcbiAgICBsaXN0ID0gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVQb2ludHMoYS5zdGFydCwgYi5zdGFydCk7XG4gICAgfSk7XG4gICAgdmFyIG5leHQgPSBsaXN0WzBdLCByYW5nZTtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHJhbmdlID0gbmV4dDtcbiAgICAgICAgbmV4dCA9IGxpc3RbaV07XG4gICAgICAgIHZhciBjbXAgPSBjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5zdGFydCk7XG4gICAgICAgIGlmIChjbXAgPCAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNtcCA9PSAwICYmICFyYW5nZS5pc0VtcHR5KCkgJiYgIW5leHQuaXNFbXB0eSgpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LmVuZCkgPCAwKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gbmV4dC5lbmQucm93O1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IG5leHQuZW5kLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgbmV4dCA9IHJhbmdlO1xuICAgICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuZnVuY3Rpb24gY29tcGFyZVBvaW50cyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEucm93IC0gcDIucm93IHx8IHAxLmNvbHVtbiAtIHAyLmNvbHVtbjtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkodmFsdWUsIHJlZ2V4cEFycmF5KSB7XG4gICAgaWYgKCFyZWdleHBBcnJheSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWdleHBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChyZWdleHBBcnJheVtpXS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuKCgpID0+IHtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VNYW5hZ2VyOiAoKSA9PiAoLyogYmluZGluZyAqLyBTZXJ2aWNlTWFuYWdlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Mjk3KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MDAyKTtcbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5jbGFzcyBTZXJ2aWNlTWFuYWdlciB7XG4gICAgc3RhdGljIGFzeW5jICRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIGN0eCkge1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoJ3R5cGUnIGluIHNlcnZpY2UpIHtcbiAgICAgICAgICAgIGlmIChbXG4gICAgICAgICAgICAgICAgXCJzb2NrZXRcIixcbiAgICAgICAgICAgICAgICBcIndlYndvcmtlclwiXG4gICAgICAgICAgICBdLmluY2x1ZGVzKHNlcnZpY2UudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtcIkxhbmd1YWdlQ2xpZW50XCJdKHNlcnZpY2UsIGN0eCk7XG4gICAgICAgICAgICB9IGVsc2UgdGhyb3cgXCJVbmtub3duIHNlcnZpY2UgdHlwZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtzZXJ2aWNlLmNsYXNzTmFtZV0oc2VydmljZS5tb2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZpY2Uub3B0aW9ucyB8fCBzZXJ2aWNlLmluaXRpYWxpemF0aW9uT3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlX29wdGlvbnMsIF9yZWY7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKChfcmVmID0gKF9zZXJ2aWNlX29wdGlvbnMgPSBzZXJ2aWNlLm9wdGlvbnMpICE9PSBudWxsICYmIF9zZXJ2aWNlX29wdGlvbnMgIT09IHZvaWQgMCA/IF9zZXJ2aWNlX29wdGlvbnMgOiBzZXJ2aWNlLmluaXRpYWxpemF0aW9uT3B0aW9ucykgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IHt9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlRGF0YSA9IHNlcnZpY2U7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICB9XG4gICAgYXN5bmMgJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc2VydmljZXMubWFwKChzZXJ2aWNlKT0+dGhpcy5pbml0aWFsaXplU2VydmljZShzZXJ2aWNlKSkpO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplU2VydmljZShzZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdID0gU2VydmljZU1hbmFnZXIuJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgdGhpcy5jdHgpLnRoZW4oKGluc3RhbmNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdOyAvLyBDbGVhbiB1cFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEdsb2JhbE9wdGlvbnMoc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICBzZXJ2aWNlLm9wdGlvbnMgPSBtZXJnZSA/ICgwLF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm1lcmdlT2JqZWN0cyAqLyAuUE0pKG9wdGlvbnMsIHNlcnZpY2Uub3B0aW9ucykgOiBvcHRpb25zO1xuICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoc2VydmljZS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBhZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIGRvY3VtZW50VmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFtb2RlIHx8ICEvXmFjZVxcL21vZGVcXC8vLnRlc3QobW9kZSkpIHJldHVybjtcbiAgICAgICAgbW9kZSA9IG1vZGUucmVwbGFjZShcImFjZS9tb2RlL1wiLCBcIlwiKTtcbiAgICAgICAgbGV0IHNlcnZpY2VJbnN0YW5jZXMgPSBhd2FpdCB0aGlzLiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGxldCBkb2N1bWVudEl0ZW0gPSB7XG4gICAgICAgICAgICB1cmk6IGRvY3VtZW50SWRlbnRpZmllci51cmksXG4gICAgICAgICAgICB2ZXJzaW9uOiBkb2N1bWVudElkZW50aWZpZXIudmVyc2lvbixcbiAgICAgICAgICAgIGxhbmd1YWdlSWQ6IG1vZGUsXG4gICAgICAgICAgICB0ZXh0OiBkb2N1bWVudFZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoZWwpPT5lbC5hZGREb2N1bWVudChkb2N1bWVudEl0ZW0pKTtcbiAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50SWRlbnRpZmllci51cmldID0gbW9kZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXM7XG4gICAgfVxuICAgIGFzeW5jIGNoYW5nZURvY3VtZW50TW9kZShkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJlbW92ZURvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlcnZpY2VzLmZvckVhY2goKGVsKT0+ZWwucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnQudXJpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlc0luc3RhbmNlcyhzZXNzaW9uSUQpIHtcbiAgICAgICAgbGV0IG1vZGUgPSB0aGlzLiRzZXNzaW9uSURUb01vZGVbc2Vzc2lvbklEXTtcbiAgICAgICAgaWYgKCFtb2RlKSByZXR1cm4gW107IC8vVE9ETzpcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcy5tYXAoKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGlmICghZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzO1xuICAgICAgICAgICAgc3dpdGNoKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJob3ZlclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmhvdmVyUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25SZXNvbHZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPSBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyKSA9PT0gbnVsbCB8fCBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIucmVzb2x2ZVByb3ZpZGVyKSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlIHx8IGNhcGFiaWxpdGllcy5kb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkaWFnbm9zdGljc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpZ25hdHVyZUhlbHBcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5zaWduYXR1cmVIZWxwUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkb2N1bWVudEhpZ2hsaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuJHNlcnZpY2VzKS5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSBlbC5tb2Rlcy5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5jbHVkZXMobW9kZSkpIHJldHVybiBlbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmljZShuYW1lLCBzZXJ2aWNlKSB7XG4gICAgICAgIHNlcnZpY2UuaWQgPSBuYW1lO1xuICAgICAgICBzZXJ2aWNlLmZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShzZXJ2aWNlLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBzZXJ2aWNlO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZlcihuYW1lLCBjbGllbnRDb25maWcpIHtcbiAgICAgICAgY2xpZW50Q29uZmlnLmlkID0gbmFtZTtcbiAgICAgICAgY2xpZW50Q29uZmlnLmNsYXNzTmFtZSA9IFwiTGFuZ3VhZ2VDbGllbnRcIjtcbiAgICAgICAgY2xpZW50Q29uZmlnLmZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShjbGllbnRDb25maWcuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IGNsaWVudENvbmZpZztcbiAgICB9XG4gICAgY29uZmlndXJlRmVhdHVyZXMobmFtZSwgZmVhdHVyZXMpIHtcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGZlYXR1cmVzKTtcbiAgICAgICAgaWYgKCF0aGlzLiRzZXJ2aWNlc1tuYW1lXSkgcmV0dXJuO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXS5mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICAgIH1cbiAgICBzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShzZXJ2aWNlRmVhdHVyZXMpIHtcbiAgICAgICAgdmFyIF9mZWF0dXJlcywgX2ZlYXR1cmVzMSwgX2ZlYXR1cmVzMiwgX2ZlYXR1cmVzMywgX2ZlYXR1cmVzNCwgX2ZlYXR1cmVzNSwgX2ZlYXR1cmVzNjtcbiAgICAgICAgbGV0IGZlYXR1cmVzID0gc2VydmljZUZlYXR1cmVzICE9PSBudWxsICYmIHNlcnZpY2VGZWF0dXJlcyAhPT0gdm9pZCAwID8gc2VydmljZUZlYXR1cmVzIDoge307XG4gICAgICAgIHZhciBfaG92ZXI7XG4gICAgICAgIChfaG92ZXIgPSAoX2ZlYXR1cmVzID0gZmVhdHVyZXMpLmhvdmVyKSAhPT0gbnVsbCAmJiBfaG92ZXIgIT09IHZvaWQgMCA/IF9ob3ZlciA6IF9mZWF0dXJlcy5ob3ZlciA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvbjtcbiAgICAgICAgKF9jb21wbGV0aW9uID0gKF9mZWF0dXJlczEgPSBmZWF0dXJlcykuY29tcGxldGlvbikgIT09IG51bGwgJiYgX2NvbXBsZXRpb24gIT09IHZvaWQgMCA/IF9jb21wbGV0aW9uIDogX2ZlYXR1cmVzMS5jb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uUmVzb2x2ZTtcbiAgICAgICAgKF9jb21wbGV0aW9uUmVzb2x2ZSA9IChfZmVhdHVyZXMyID0gZmVhdHVyZXMpLmNvbXBsZXRpb25SZXNvbHZlKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvblJlc29sdmUgIT09IHZvaWQgMCA/IF9jb21wbGV0aW9uUmVzb2x2ZSA6IF9mZWF0dXJlczIuY29tcGxldGlvblJlc29sdmUgPSB0cnVlO1xuICAgICAgICB2YXIgX2Zvcm1hdDtcbiAgICAgICAgKF9mb3JtYXQgPSAoX2ZlYXR1cmVzMyA9IGZlYXR1cmVzKS5mb3JtYXQpICE9PSBudWxsICYmIF9mb3JtYXQgIT09IHZvaWQgMCA/IF9mb3JtYXQgOiBfZmVhdHVyZXMzLmZvcm1hdCA9IHRydWU7XG4gICAgICAgIHZhciBfZGlhZ25vc3RpY3M7XG4gICAgICAgIChfZGlhZ25vc3RpY3MgPSAoX2ZlYXR1cmVzNCA9IGZlYXR1cmVzKS5kaWFnbm9zdGljcykgIT09IG51bGwgJiYgX2RpYWdub3N0aWNzICE9PSB2b2lkIDAgPyBfZGlhZ25vc3RpY3MgOiBfZmVhdHVyZXM0LmRpYWdub3N0aWNzID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zaWduYXR1cmVIZWxwO1xuICAgICAgICAoX3NpZ25hdHVyZUhlbHAgPSAoX2ZlYXR1cmVzNSA9IGZlYXR1cmVzKS5zaWduYXR1cmVIZWxwKSAhPT0gbnVsbCAmJiBfc2lnbmF0dXJlSGVscCAhPT0gdm9pZCAwID8gX3NpZ25hdHVyZUhlbHAgOiBfZmVhdHVyZXM1LnNpZ25hdHVyZUhlbHAgPSB0cnVlO1xuICAgICAgICB2YXIgX2RvY3VtZW50SGlnaGxpZ2h0O1xuICAgICAgICAoX2RvY3VtZW50SGlnaGxpZ2h0ID0gKF9mZWF0dXJlczYgPSBmZWF0dXJlcykuZG9jdW1lbnRIaWdobGlnaHQpICE9PSBudWxsICYmIF9kb2N1bWVudEhpZ2hsaWdodCAhPT0gdm9pZCAwID8gX2RvY3VtZW50SGlnaGxpZ2h0IDogX2ZlYXR1cmVzNi5kb2N1bWVudEhpZ2hsaWdodCA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlcztcbiAgICB9XG4gICAgY29uc3RydWN0b3IoY3R4KXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXJ2aWNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlSW5pdFByb21pc2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXNzaW9uSURUb01vZGVcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY3R4XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICBsZXQgZG9WYWxpZGF0aW9uID0gYXN5bmMgKGRvY3VtZW50LCBzZXJ2aWNlc0luc3RhbmNlcyk9PntcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzICE9PSBudWxsICYmIHNlcnZpY2VzSW5zdGFuY2VzICE9PSB2b2lkIDAgPyBzZXJ2aWNlc0luc3RhbmNlcyA6IHNlcnZpY2VzSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGhpcyBpcyBsaXN0IG9mIGRvY3VtZW50cyBsaW5rZWQgdG8gc2VydmljZXNcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSURMaXN0ID0gT2JqZWN0LmtleXMoc2VydmljZXNJbnN0YW5jZXNbMF0uZG9jdW1lbnRzKTtcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZXNJbnN0YW5jZXMsIFwiZGlhZ25vc3RpY3NcIik7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHNlcnZpY2VzSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLnNlcnZpY2VDYXBhYmlsaXRpZXMuZGlhZ25vc3RpY1Byb3ZpZGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy52YWxpZGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IHNlc3Npb25JRCBvZiBzZXNzaW9uSURMaXN0KXtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcbiAgICAgICAgICAgICAgICBsZXQgZGlhZ25vc3RpY3MgPSAoX3JlZiA9IGF3YWl0IFByb21pc2UuYWxsKHNlcnZpY2VzSW5zdGFuY2VzLm1hcCgoZWwpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5kb1ZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBzZXNzaW9uSURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogW107XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJzZXNzaW9uSWRcIl0gPSBzZXNzaW9uSUQ7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGRpYWdub3N0aWNzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UgPSBhc3luYyAoc2VydmljZU5hbWUpPT57XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZSkgYXdhaXQgZG9WYWxpZGF0aW9uKHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIGN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXYpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGV2LmRhdGE7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2Vfc2Vzc2lvbklkO1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRCA9IChfbWVzc2FnZV9zZXNzaW9uSWQgPSBtZXNzYWdlLnNlc3Npb25JZCkgIT09IG51bGwgJiYgX21lc3NhZ2Vfc2Vzc2lvbklkICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9zZXNzaW9uSWQgOiBcIlwiO1xuICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBtZXNzYWdlLnZlcnNpb247XG4gICAgICAgICAgICBsZXQgcG9zdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IG1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICAgICBcInNlc3Npb25JZFwiOiBzZXNzaW9uSURcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoc2Vzc2lvbklEKTtcbiAgICAgICAgICAgIGxldCBkb2N1bWVudElkZW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgdXJpOiBzZXNzaW9uSUQsXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN3aXRjaChtZXNzYWdlW1widHlwZVwiXSl7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5mb3JtYXQ6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2UgdG8gZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgc2VydmljZUluc3RhbmNlc1swXS5mb3JtYXQoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jb21wbGV0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uczogYXdhaXQgc2VydmljZS5kb0NvbXBsZXRlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MucmVzb2x2ZUNvbXBsZXRpb246XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VOYW1lID0gbWVzc2FnZS52YWx1ZS5zZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgKChfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblJlc29sdmVcIikuZmluZCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpID09PSBudWxsIHx8IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZC5kb1Jlc29sdmUobWVzc2FnZS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNoYW5nZTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXRWYWx1ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuYXBwbHlEZWx0YTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5hcHBseURlbHRhcyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuaG92ZXI6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJob3ZlclwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5kb0hvdmVyKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MudmFsaWRhdGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5pbml0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXM7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXMgPSBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpKSA9PT0gbnVsbCB8fCBfdGhpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMubWFwKChlbCk9PmVsLnNlcnZpY2VDYXBhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2VNb2RlOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMxO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzMSA9IGF3YWl0IHRoaXMuY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpKSA9PT0gbnVsbCB8fCBfdGhpczEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzMS5tYXAoKGVsKT0+ZWwuc2VydmljZUNhcGFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNoYW5nZU9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0T3B0aW9ucyhzZXNzaW9uSUQsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kaXNwb3NlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmdsb2JhbE9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2xvYmFsT3B0aW9ucyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMsIG1lc3NhZ2UubWVyZ2UpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jb25maWd1cmVGZWF0dXJlczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmVGZWF0dXJlcyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5zaWduYXR1cmVIZWxwOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwic2lnbmF0dXJlSGVscFwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5wcm92aWRlU2lnbmF0dXJlSGVscChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmRvY3VtZW50SGlnaGxpZ2h0OlxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0cyA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImRvY3VtZW50SGlnaGxpZ2h0XCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmZpbmREb2N1bWVudEhpZ2hsaWdodHMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGhpZ2hsaWdodHMuZmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZShwb3N0TWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxufSkoKTtcblxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbn0pOyJdLCJuYW1lcyI6WyJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImEiLCJpIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiQ3MiLCJNZXNzYWdlVHlwZSIsIl9kZWZpbmVfcHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQmFzZU1lc3NhZ2UiLCJjb25zdHJ1Y3RvciIsInNlc3Npb25JZCIsIkluaXRNZXNzYWdlIiwidmVyc2lvbiIsIm1vZGUiLCJvcHRpb25zIiwiaW5pdCIsIkZvcm1hdE1lc3NhZ2UiLCJmb3JtYXQiLCJDb21wbGV0ZU1lc3NhZ2UiLCJjb21wbGV0ZSIsIlJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSIsInJlc29sdmVDb21wbGV0aW9uIiwiSG92ZXJNZXNzYWdlIiwiaG92ZXIiLCJWYWxpZGF0ZU1lc3NhZ2UiLCJ2YWxpZGF0ZSIsIkNoYW5nZU1lc3NhZ2UiLCJjaGFuZ2UiLCJEZWx0YXNNZXNzYWdlIiwiYXBwbHlEZWx0YSIsIkNoYW5nZU1vZGVNZXNzYWdlIiwiY2hhbmdlTW9kZSIsIkNoYW5nZU9wdGlvbnNNZXNzYWdlIiwibWVyZ2UiLCJjaGFuZ2VPcHRpb25zIiwiRGlzcG9zZU1lc3NhZ2UiLCJkaXNwb3NlIiwiR2xvYmFsT3B0aW9uc01lc3NhZ2UiLCJzZXJ2aWNlTmFtZSIsImdsb2JhbE9wdGlvbnMiLCJDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UiLCJjb25maWd1cmVGZWF0dXJlcyIsIlNpZ25hdHVyZUhlbHBNZXNzYWdlIiwic2lnbmF0dXJlSGVscCIsIkRvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSIsImRvY3VtZW50SGlnaGxpZ2h0IiwiRHciLCJub3RFbXB0eSIsIlBNIiwibWVyZ2VPYmplY3RzIiwib2JqMSIsIm9iajIiLCJtZXJnZWRPYmplY3RzIiwia2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsInVuZGVmaW5lZCIsIm1lcmdlUmFuZ2VzIiwicmFuZ2VzIiwibGlzdCIsInNvcnQiLCJiIiwiY29tcGFyZVBvaW50cyIsInN0YXJ0IiwibmV4dCIsInJhbmdlIiwibGVuZ3RoIiwiY21wIiwiZW5kIiwiaXNFbXB0eSIsInJvdyIsImNvbHVtbiIsInNwbGljZSIsInAxIiwicDIiLCJjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5IiwicmVnZXhwQXJyYXkiLCJ0ZXN0IiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJkZWZpbml0aW9uIiwibyIsImdldCIsInByb3AiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJTZXJ2aWNlTWFuYWdlciIsIl91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIiRpbml0U2VydmljZUluc3RhbmNlIiwic2VydmljZSIsImN0eCIsImluY2x1ZGVzIiwidHlwZSIsInNlcnZpY2VJbnN0YW5jZSIsImNsYXNzTmFtZSIsIm1vZGVzIiwiaW5pdGlhbGl6YXRpb25PcHRpb25zIiwiX3NlcnZpY2Vfb3B0aW9ucyIsIl9yZWYiLCJzZXRHbG9iYWxPcHRpb25zIiwic2VydmljZURhdGEiLCIkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUiLCJzZXJ2aWNlcyIsImZpbmRTZXJ2aWNlc0J5TW9kZSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpbml0aWFsaXplU2VydmljZSIsInNlcnZpY2VJbml0UHJvbWlzZXMiLCJpZCIsInRoZW4iLCJpbnN0YW5jZSIsIiRzZXJ2aWNlcyIsImFkZERvY3VtZW50IiwiZG9jdW1lbnRJZGVudGlmaWVyIiwiZG9jdW1lbnRWYWx1ZSIsInJlcGxhY2UiLCJzZXJ2aWNlSW5zdGFuY2VzIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJmb3JFYWNoIiwiZWwiLCIkc2Vzc2lvbklEVG9Nb2RlIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwic2Vzc2lvbklEIiwiZmlsdGVyIiwiZmlsdGVyQnlGZWF0dXJlIiwiZmVhdHVyZSIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwic2VydmljZUNhcGFiaWxpdGllcyIsImhvdmVyUHJvdmlkZXIiLCJjb21wbGV0aW9uUHJvdmlkZXIiLCJfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsImRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIiLCJkb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciIsImRpYWdub3N0aWNQcm92aWRlciIsInNpZ25hdHVyZUhlbHBQcm92aWRlciIsImRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIiLCJ2YWx1ZXMiLCJleHRlbnNpb25zIiwic3BsaXQiLCJyZWdpc3RlclNlcnZpY2UiLCJuYW1lIiwic2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUiLCJyZWdpc3RlclNlcnZlciIsImNsaWVudENvbmZpZyIsInNlcnZpY2VGZWF0dXJlcyIsIl9mZWF0dXJlcyIsIl9mZWF0dXJlczEiLCJfZmVhdHVyZXMyIiwiX2ZlYXR1cmVzMyIsIl9mZWF0dXJlczQiLCJfZmVhdHVyZXM1IiwiX2ZlYXR1cmVzNiIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJkb1ZhbGlkYXRpb24iLCJzZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRExpc3QiLCJkb2N1bWVudHMiLCJwb3N0TWVzc2FnZSIsImZsYXQiLCJwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsIm1lc3NhZ2UiLCJkYXRhIiwiX21lc3NhZ2Vfc2Vzc2lvbklkIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQiLCJmaW5kIiwiZG9SZXNvbHZlIiwic2V0VmFsdWUiLCJhcHBseURlbHRhcyIsImRvSG92ZXIiLCJfdGhpcyIsIl90aGlzMSIsInNldE9wdGlvbnMiLCJwcm92aWRlU2lnbmF0dXJlSGVscCIsImhpZ2hsaWdodHMiLCJmaW5kRG9jdW1lbnRIaWdobGlnaHRzIl0sInNvdXJjZVJvb3QiOiIifQ==