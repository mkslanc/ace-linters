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
                                await doValidation(documentIdentifier);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O2dDQUNwRixJQUFJNkosYUFBYSxDQUFDLE1BQU0zRixRQUFRQyxHQUFHLENBQUMsSUFBSSxDQUFDMEIsZUFBZSxDQUFDZCxrQkFBa0IscUJBQXFCWCxHQUFHLENBQUMsT0FBT2pCO29DQUN2RyxPQUFPQSxRQUFRMkcsc0JBQXNCLENBQUNsRixvQkFBb0JrRSxRQUFRekwsS0FBSztnQ0FDM0UsR0FBRSxFQUFHdUksTUFBTSxDQUFDNUMsb0NBQW1DLGFBQWEsSUFBSS9DLEVBQUU7Z0NBQ2xFd0ksV0FBVyxDQUFDLFFBQVEsR0FBR29CLFdBQVduQixJQUFJO2dDQUN0Qzt3QkFDUjt3QkFDQXRGLElBQUlxRixXQUFXLENBQUNBO29CQUNwQjtnQkFDSjtZQUNKO1FBRUE7UUFFQSxNQUFNLEdBQUksT0FBTzVMLDBCQUFtQkE7SUFDcEMsTUFBTSxHQUFHO0FBRVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvYWNlLWxpbnRlcnMvYnVpbGQvc2VydmljZS1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gLyoqKioqKi8gKCgpID0+IHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyA2MDAyOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBDczogKCkgPT4gKC8qIGJpbmRpbmcgKi8gTWVzc2FnZVR5cGUpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgQmFzZU1lc3NhZ2UsIEluaXRNZXNzYWdlLCBGb3JtYXRNZXNzYWdlLCBDb21wbGV0ZU1lc3NhZ2UsIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSwgSG92ZXJNZXNzYWdlLCBWYWxpZGF0ZU1lc3NhZ2UsIENoYW5nZU1lc3NhZ2UsIERlbHRhc01lc3NhZ2UsIENoYW5nZU1vZGVNZXNzYWdlLCBDaGFuZ2VPcHRpb25zTWVzc2FnZSwgRGlzcG9zZU1lc3NhZ2UsIEdsb2JhbE9wdGlvbnNNZXNzYWdlLCBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UsIFNpZ25hdHVyZUhlbHBNZXNzYWdlLCBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIG1vZGUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIERpc3Bvc2VNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZGlzcG9zZSk7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24oTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZm9ybWF0XCJdID0gMV0gPSBcImZvcm1hdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29tcGxldGVcIl0gPSAyXSA9IFwiY29tcGxldGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlc29sdmVDb21wbGV0aW9uXCJdID0gM10gPSBcInJlc29sdmVDb21wbGV0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VcIl0gPSA0XSA9IFwiY2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJob3ZlclwiXSA9IDVdID0gXCJob3ZlclwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1widmFsaWRhdGVcIl0gPSA2XSA9IFwidmFsaWRhdGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RGVsdGFcIl0gPSA3XSA9IFwiYXBwbHlEZWx0YVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlTW9kZVwiXSA9IDhdID0gXCJjaGFuZ2VNb2RlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VPcHRpb25zXCJdID0gOV0gPSBcImNoYW5nZU9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRpc3Bvc2VcIl0gPSAxMF0gPSBcImRpc3Bvc2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdsb2JhbE9wdGlvbnNcIl0gPSAxMV0gPSBcImdsb2JhbE9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbmZpZ3VyZUZlYXR1cmVzXCJdID0gMTJdID0gXCJjb25maWd1cmVGZWF0dXJlc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2lnbmF0dXJlSGVscFwiXSA9IDEzXSA9IFwic2lnbmF0dXJlSGVscFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZG9jdW1lbnRIaWdobGlnaHRcIl0gPSAxNF0gPSBcImRvY3VtZW50SGlnaGxpZ2h0XCI7XG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA2Mjk3OlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBEdzogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBQTTogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbWVyZ2VPYmplY3RzKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIG1lcmdlUmFuZ2VzLCBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5ICovXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMikge1xuICAgIGlmICghb2JqMSkgcmV0dXJuIG9iajI7XG4gICAgaWYgKCFvYmoyKSByZXR1cm4gb2JqMTtcbiAgICBjb25zdCBtZXJnZWRPYmplY3RzID0ge1xuICAgICAgICAuLi5vYmoyLFxuICAgICAgICAuLi5vYmoxXG4gICAgfTsgLy8gR2l2ZSBwcmlvcml0eSB0byBvYmoxIHZhbHVlcyBieSBzcHJlYWRpbmcgb2JqMiBmaXJzdCwgdGhlbiBvYmoxXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWVyZ2VkT2JqZWN0cykpe1xuICAgICAgICBpZiAob2JqMVtrZXldICYmIG9iajJba2V5XSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqMVtrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajFba2V5XS5jb25jYXQob2JqMltrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoyW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gb2JqMltrZXldLmNvbmNhdChvYmoxW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqMVtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqMltrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG1lcmdlT2JqZWN0cyhvYmoxW2tleV0sIG9iajJba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9iamVjdHM7XG59XG5mdW5jdGlvbiBub3RFbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xufVxuLy90YWtlbiB3aXRoIHNtYWxsIGNoYW5nZXMgZnJvbSBhY2UtY29kZVxuZnVuY3Rpb24gbWVyZ2VSYW5nZXMocmFuZ2VzKSB7XG4gICAgdmFyIGxpc3QgPSByYW5nZXM7XG4gICAgbGlzdCA9IGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlUG9pbnRzKGEuc3RhcnQsIGIuc3RhcnQpO1xuICAgIH0pO1xuICAgIHZhciBuZXh0ID0gbGlzdFswXSwgcmFuZ2U7XG4gICAgZm9yKHZhciBpID0gMTsgaSA8IGxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICByYW5nZSA9IG5leHQ7XG4gICAgICAgIG5leHQgPSBsaXN0W2ldO1xuICAgICAgICB2YXIgY21wID0gY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuc3RhcnQpO1xuICAgICAgICBpZiAoY21wIDwgMCkgY29udGludWU7XG4gICAgICAgIGlmIChjbXAgPT0gMCAmJiAhcmFuZ2UuaXNFbXB0eSgpICYmICFuZXh0LmlzRW1wdHkoKSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5lbmQpIDwgMCkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IG5leHQuZW5kLnJvdztcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBuZXh0LmVuZC5jb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIG5leHQgPSByYW5nZTtcbiAgICAgICAgaS0tO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVQb2ludHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnJvdyAtIHAyLnJvdyB8fCBwMS5jb2x1bW4gLSBwMi5jb2x1bW47XG59XG5mdW5jdGlvbiBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5KHZhbHVlLCByZWdleHBBcnJheSkge1xuICAgIGlmICghcmVnZXhwQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVnZXhwQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmVnZXhwQXJyYXlbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKVxuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbigoKSA9PiB7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlTWFuYWdlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZU1hbmFnZXIpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjI5Nyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjAwMik7XG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cblxuY2xhc3MgU2VydmljZU1hbmFnZXIge1xuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgpIHtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKCd0eXBlJyBpbiBzZXJ2aWNlKSB7XG4gICAgICAgICAgICBpZiAoW1xuICAgICAgICAgICAgICAgIFwic29ja2V0XCIsXG4gICAgICAgICAgICAgICAgXCJ3ZWJ3b3JrZXJcIlxuICAgICAgICAgICAgXS5pbmNsdWRlcyhzZXJ2aWNlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbXCJMYW5ndWFnZUNsaWVudFwiXShzZXJ2aWNlLCBjdHgpO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IFwiVW5rbm93biBzZXJ2aWNlIHR5cGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbc2VydmljZS5jbGFzc05hbWVdKHNlcnZpY2UubW9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2aWNlLm9wdGlvbnMgfHwgc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9vcHRpb25zLCBfcmVmO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucygoX3JlZiA9IChfc2VydmljZV9vcHRpb25zID0gc2VydmljZS5vcHRpb25zKSAhPT0gbnVsbCAmJiBfc2VydmljZV9vcHRpb25zICE9PSB2b2lkIDAgPyBfc2VydmljZV9vcHRpb25zIDogc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jICRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHNlcnZpY2VzLm1hcCgoc2VydmljZSk9PnRoaXMuaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZSkpKTtcbiAgICB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZSkge1xuICAgICAgICBpZiAoIXNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSA9IFNlcnZpY2VNYW5hZ2VyLiRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIHRoaXMuY3R4KS50aGVuKChpbnN0YW5jZSk9PntcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTsgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxPcHRpb25zKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgc2VydmljZS5vcHRpb25zID0gbWVyZ2UgPyAoMCxfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5tZXJnZU9iamVjdHMgKi8gLlBNKShvcHRpb25zLCBzZXJ2aWNlLm9wdGlvbnMpIDogb3B0aW9ucztcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKHNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZG9jdW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgdXJpOiBkb2N1bWVudElkZW50aWZpZXIudXJpLFxuICAgICAgICAgICAgdmVyc2lvbjogZG9jdW1lbnRJZGVudGlmaWVyLnZlcnNpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUlkOiBtb2RlLFxuICAgICAgICAgICAgdGV4dDogZG9jdW1lbnRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKGVsKT0+ZWwuYWRkRG9jdW1lbnQoZG9jdW1lbnRJdGVtKSk7XG4gICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVEb2N1bWVudChkb2N1bWVudCkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbW92ZURvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50LnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VydmljZXNJbnN0YW5jZXMoc2Vzc2lvbklEKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW3Nlc3Npb25JRF07XG4gICAgICAgIGlmICghbW9kZSkgcmV0dXJuIFtdOyAvL1RPRE86XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICByZXR1cm4gc2VydmljZXMubWFwKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgfVxuICAgIGZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBpZiAoIWVsLnNlcnZpY2VEYXRhLmZlYXR1cmVzW2ZlYXR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FwYWJpbGl0aWVzID0gZWwuc2VydmljZUNhcGFiaWxpdGllcztcbiAgICAgICAgICAgIHN3aXRjaChmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG92ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5ob3ZlclByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uUmVzb2x2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID0gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlcikgPT09IG51bGwgfHwgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyLnJlc29sdmVQcm92aWRlcikgPT09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZSB8fCBjYXBhYmlsaXRpZXMuZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGlhZ25vc3RpY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaWduYXR1cmVIZWxwXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2lnbmF0dXJlSGVscFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRIaWdobGlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLiRzZXJ2aWNlcykuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gZWwubW9kZXMuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluY2x1ZGVzKG1vZGUpKSByZXR1cm4gZWw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczY7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZUluaXRQcm9taXNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2Vzc2lvbklEVG9Nb2RlXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImN0eFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklETGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MudmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBzZXNzaW9uSUQgb2Ygc2Vzc2lvbklETGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wic2Vzc2lvbklkXCJdID0gc2Vzc2lvbklEO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZS5zZXNzaW9uSWQpICE9PSBudWxsICYmIF9tZXNzYWdlX3Nlc3Npb25JZCAhPT0gdm9pZCAwID8gX21lc3NhZ2Vfc2Vzc2lvbklkIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gbWVzc2FnZS52ZXJzaW9uO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklEXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKHNlc3Npb25JRCk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZVtcInR5cGVcIl0pe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWUuc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZG9Ib3Zlcihkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnZhbGlkYXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuaW5pdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzID0gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzLm1hcCgoZWwpPT5lbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlTW9kZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpczEgPSBhd2FpdCB0aGlzLmNoYW5nZURvY3VtZW50TW9kZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpczEubWFwKChlbCk9PmVsLnNlcnZpY2VDYXBhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldE9wdGlvbnMoc2Vzc2lvbklELCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZGlzcG9zZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3Muc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UucHJvdmlkZVNpZ25hdHVyZUhlbHAoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5maW5kRG9jdW1lbnRIaWdobGlnaHRzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBoaWdobGlnaHRzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbn0pKCk7XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkNzIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJzZXNzaW9uSWQiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UiLCJyZXNvbHZlQ29tcGxldGlvbiIsIkhvdmVyTWVzc2FnZSIsImhvdmVyIiwiVmFsaWRhdGVNZXNzYWdlIiwidmFsaWRhdGUiLCJDaGFuZ2VNZXNzYWdlIiwiY2hhbmdlIiwiRGVsdGFzTWVzc2FnZSIsImFwcGx5RGVsdGEiLCJDaGFuZ2VNb2RlTWVzc2FnZSIsImNoYW5nZU1vZGUiLCJDaGFuZ2VPcHRpb25zTWVzc2FnZSIsIm1lcmdlIiwiY2hhbmdlT3B0aW9ucyIsIkRpc3Bvc2VNZXNzYWdlIiwiZGlzcG9zZSIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkR3Iiwibm90RW1wdHkiLCJQTSIsIm1lcmdlT2JqZWN0cyIsIm9iajEiLCJvYmoyIiwibWVyZ2VkT2JqZWN0cyIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCIkaW5pdFNlcnZpY2VJbnN0YW5jZSIsInNlcnZpY2UiLCJjdHgiLCJpbmNsdWRlcyIsInR5cGUiLCJzZXJ2aWNlSW5zdGFuY2UiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwic2VydmljZXMiLCJmaW5kU2VydmljZXNCeU1vZGUiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCIkc2VydmljZXMiLCJhZGREb2N1bWVudCIsImRvY3VtZW50SWRlbnRpZmllciIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwic2VydmljZUluc3RhbmNlcyIsImRvY3VtZW50SXRlbSIsInVyaSIsImxhbmd1YWdlSWQiLCJ0ZXh0IiwiZm9yRWFjaCIsImVsIiwiJHNlc3Npb25JRFRvTW9kZSIsImNoYW5nZURvY3VtZW50TW9kZSIsInJlbW92ZURvY3VtZW50IiwiZG9jdW1lbnQiLCJnZXRTZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRCIsImZpbHRlciIsImZpbHRlckJ5RmVhdHVyZSIsImZlYXR1cmUiLCJmZWF0dXJlcyIsImNhcGFiaWxpdGllcyIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJob3ZlclByb3ZpZGVyIiwiY29tcGxldGlvblByb3ZpZGVyIiwiX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIiLCJyZXNvbHZlUHJvdmlkZXIiLCJkb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyIiwiZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIiLCJkaWFnbm9zdGljUHJvdmlkZXIiLCJzaWduYXR1cmVIZWxwUHJvdmlkZXIiLCJkb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyIiwidmFsdWVzIiwiZXh0ZW5zaW9ucyIsInNwbGl0IiwicmVnaXN0ZXJTZXJ2aWNlIiwibmFtZSIsInNldERlZmF1bHRGZWF0dXJlc1N0YXRlIiwicmVnaXN0ZXJTZXJ2ZXIiLCJjbGllbnRDb25maWciLCJzZXJ2aWNlRmVhdHVyZXMiLCJfZmVhdHVyZXMiLCJfZmVhdHVyZXMxIiwiX2ZlYXR1cmVzMiIsIl9mZWF0dXJlczMiLCJfZmVhdHVyZXM0IiwiX2ZlYXR1cmVzNSIsIl9mZWF0dXJlczYiLCJfaG92ZXIiLCJfY29tcGxldGlvbiIsImNvbXBsZXRpb24iLCJfY29tcGxldGlvblJlc29sdmUiLCJjb21wbGV0aW9uUmVzb2x2ZSIsIl9mb3JtYXQiLCJfZGlhZ25vc3RpY3MiLCJkaWFnbm9zdGljcyIsIl9zaWduYXR1cmVIZWxwIiwiX2RvY3VtZW50SGlnaGxpZ2h0IiwiZG9WYWxpZGF0aW9uIiwic2VydmljZXNJbnN0YW5jZXMiLCJzZXNzaW9uSURMaXN0IiwiZG9jdW1lbnRzIiwicG9zdE1lc3NhZ2UiLCJmbGF0IiwicHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJtZXNzYWdlIiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsImNvbXBsZXRpb25zIiwiZG9Db21wbGV0ZSIsIl90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kIiwiZmluZCIsImRvUmVzb2x2ZSIsInNldFZhbHVlIiwiYXBwbHlEZWx0YXMiLCJkb0hvdmVyIiwiX3RoaXMiLCJfdGhpczEiLCJzZXRPcHRpb25zIiwicHJvdmlkZVNpZ25hdHVyZUhlbHAiLCJoaWdobGlnaHRzIiwiZmluZERvY3VtZW50SGlnaGxpZ2h0cyJdLCJzb3VyY2VSb290IjoiIn0=