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
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, DisposeMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage */ function _define_property(obj, key, value) {
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
                class CloseDocumentMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId){
                        super(sessionId);
                        _define_property(this, "type", MessageType.closeDocument);
                    }
                }
                class DisposeMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(){
                        super("");
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
                    MessageType[MessageType["closeDocument"] = 10] = "closeDocument";
                    MessageType[MessageType["globalOptions"] = 11] = "globalOptions";
                    MessageType[MessageType["configureFeatures"] = 12] = "configureFeatures";
                    MessageType[MessageType["signatureHelp"] = 13] = "signatureHelp";
                    MessageType[MessageType["documentHighlight"] = 14] = "documentHighlight";
                    MessageType[MessageType["dispose"] = 15] = "dispose";
                })(MessageType || (MessageType = {}));
            /***/ },
            /***/ 6297: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_11061__)=>{
                /* harmony export */ __nested_webpack_require_11061__.d(__nested_webpack_exports__, {
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
        /******/ function __nested_webpack_require_14530__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_14530__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_14530__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_14530__.o(definition, key) && !__nested_webpack_require_14530__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_14530__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_14530__.r = (exports1)=>{
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
            __nested_webpack_require_14530__.r(__nested_webpack_exports__);
            /* harmony export */ __nested_webpack_require_14530__.d(__nested_webpack_exports__, {
                /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
            });
            /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_14530__(6297);
            /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_14530__(6002);
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
                async disposeAll() {
                    var services = this.$services;
                    for(let serviceName in services){
                        var _services_serviceName_serviceInstance, _services_serviceName;
                        await ((_services_serviceName = services[serviceName]) === null || _services_serviceName === void 0 ? void 0 : (_services_serviceName_serviceInstance = _services_serviceName.serviceInstance) === null || _services_serviceName_serviceInstance === void 0 ? void 0 : _services_serviceName_serviceInstance.dispose());
                    }
                }
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
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.closeDocument:
                                this.removeDocument(documentIdentifier);
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.dispose:
                                await this.disposeAll();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLEdBQUc7QUFFVCIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9hY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIDYwMDI6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIENzOiAoKSA9PiAoLyogYmluZGluZyAqLyBNZXNzYWdlVHlwZSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBCYXNlTWVzc2FnZSwgSW5pdE1lc3NhZ2UsIEZvcm1hdE1lc3NhZ2UsIENvbXBsZXRlTWVzc2FnZSwgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlLCBIb3Zlck1lc3NhZ2UsIFZhbGlkYXRlTWVzc2FnZSwgQ2hhbmdlTWVzc2FnZSwgRGVsdGFzTWVzc2FnZSwgQ2hhbmdlTW9kZU1lc3NhZ2UsIENoYW5nZU9wdGlvbnNNZXNzYWdlLCBDbG9zZURvY3VtZW50TWVzc2FnZSwgRGlzcG9zZU1lc3NhZ2UsIEdsb2JhbE9wdGlvbnNNZXNzYWdlLCBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UsIFNpZ25hdHVyZUhlbHBNZXNzYWdlLCBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIG1vZGUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VEb2N1bWVudCk7XG4gICAgfVxufVxuY2xhc3MgRGlzcG9zZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcihcIlwiKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZGlzcG9zZSk7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24oTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZm9ybWF0XCJdID0gMV0gPSBcImZvcm1hdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29tcGxldGVcIl0gPSAyXSA9IFwiY29tcGxldGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlc29sdmVDb21wbGV0aW9uXCJdID0gM10gPSBcInJlc29sdmVDb21wbGV0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VcIl0gPSA0XSA9IFwiY2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJob3ZlclwiXSA9IDVdID0gXCJob3ZlclwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1widmFsaWRhdGVcIl0gPSA2XSA9IFwidmFsaWRhdGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RGVsdGFcIl0gPSA3XSA9IFwiYXBwbHlEZWx0YVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlTW9kZVwiXSA9IDhdID0gXCJjaGFuZ2VNb2RlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VPcHRpb25zXCJdID0gOV0gPSBcImNoYW5nZU9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlRG9jdW1lbnRcIl0gPSAxMF0gPSBcImNsb3NlRG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdsb2JhbE9wdGlvbnNcIl0gPSAxMV0gPSBcImdsb2JhbE9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbmZpZ3VyZUZlYXR1cmVzXCJdID0gMTJdID0gXCJjb25maWd1cmVGZWF0dXJlc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2lnbmF0dXJlSGVscFwiXSA9IDEzXSA9IFwic2lnbmF0dXJlSGVscFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZG9jdW1lbnRIaWdobGlnaHRcIl0gPSAxNF0gPSBcImRvY3VtZW50SGlnaGxpZ2h0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkaXNwb3NlXCJdID0gMTVdID0gXCJkaXNwb3NlXCI7XG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA2Mjk3OlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBEdzogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBQTTogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbWVyZ2VPYmplY3RzKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIG1lcmdlUmFuZ2VzLCBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5ICovXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMikge1xuICAgIGlmICghb2JqMSkgcmV0dXJuIG9iajI7XG4gICAgaWYgKCFvYmoyKSByZXR1cm4gb2JqMTtcbiAgICBjb25zdCBtZXJnZWRPYmplY3RzID0ge1xuICAgICAgICAuLi5vYmoyLFxuICAgICAgICAuLi5vYmoxXG4gICAgfTsgLy8gR2l2ZSBwcmlvcml0eSB0byBvYmoxIHZhbHVlcyBieSBzcHJlYWRpbmcgb2JqMiBmaXJzdCwgdGhlbiBvYmoxXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWVyZ2VkT2JqZWN0cykpe1xuICAgICAgICBpZiAob2JqMVtrZXldICYmIG9iajJba2V5XSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqMVtrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajFba2V5XS5jb25jYXQob2JqMltrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoyW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gb2JqMltrZXldLmNvbmNhdChvYmoxW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqMVtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqMltrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG1lcmdlT2JqZWN0cyhvYmoxW2tleV0sIG9iajJba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9iamVjdHM7XG59XG5mdW5jdGlvbiBub3RFbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xufVxuLy90YWtlbiB3aXRoIHNtYWxsIGNoYW5nZXMgZnJvbSBhY2UtY29kZVxuZnVuY3Rpb24gbWVyZ2VSYW5nZXMocmFuZ2VzKSB7XG4gICAgdmFyIGxpc3QgPSByYW5nZXM7XG4gICAgbGlzdCA9IGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlUG9pbnRzKGEuc3RhcnQsIGIuc3RhcnQpO1xuICAgIH0pO1xuICAgIHZhciBuZXh0ID0gbGlzdFswXSwgcmFuZ2U7XG4gICAgZm9yKHZhciBpID0gMTsgaSA8IGxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICByYW5nZSA9IG5leHQ7XG4gICAgICAgIG5leHQgPSBsaXN0W2ldO1xuICAgICAgICB2YXIgY21wID0gY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuc3RhcnQpO1xuICAgICAgICBpZiAoY21wIDwgMCkgY29udGludWU7XG4gICAgICAgIGlmIChjbXAgPT0gMCAmJiAhcmFuZ2UuaXNFbXB0eSgpICYmICFuZXh0LmlzRW1wdHkoKSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5lbmQpIDwgMCkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IG5leHQuZW5kLnJvdztcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBuZXh0LmVuZC5jb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIG5leHQgPSByYW5nZTtcbiAgICAgICAgaS0tO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVQb2ludHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnJvdyAtIHAyLnJvdyB8fCBwMS5jb2x1bW4gLSBwMi5jb2x1bW47XG59XG5mdW5jdGlvbiBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5KHZhbHVlLCByZWdleHBBcnJheSkge1xuICAgIGlmICghcmVnZXhwQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVnZXhwQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmVnZXhwQXJyYXlbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKVxuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbigoKSA9PiB7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlTWFuYWdlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZU1hbmFnZXIpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjI5Nyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjAwMik7XG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cblxuY2xhc3MgU2VydmljZU1hbmFnZXIge1xuICAgIGFzeW5jIGRpc3Bvc2VBbGwoKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuJHNlcnZpY2VzO1xuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIHZhciBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfc2VydmljZU5hbWU7XG4gICAgICAgICAgICBhd2FpdCAoKF9zZXJ2aWNlc19zZXJ2aWNlTmFtZSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuZGlzcG9zZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMgJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgY3R4KSB7XG4gICAgICAgIGxldCBtb2R1bGU7XG4gICAgICAgIGlmICgndHlwZScgaW4gc2VydmljZSkge1xuICAgICAgICAgICAgaWYgKFtcbiAgICAgICAgICAgICAgICBcInNvY2tldFwiLFxuICAgICAgICAgICAgICAgIFwid2Vid29ya2VyXCJcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoc2VydmljZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW1wiTGFuZ3VhZ2VDbGllbnRcIl0oc2VydmljZSwgY3R4KTtcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBcIlVua25vd24gc2VydmljZSB0eXBlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZS5vcHRpb25zIHx8IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfb3B0aW9ucywgX3JlZjtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoKF9yZWYgPSAoX3NlcnZpY2Vfb3B0aW9ucyA9IHNlcnZpY2Uub3B0aW9ucykgIT09IG51bGwgJiYgX3NlcnZpY2Vfb3B0aW9ucyAhPT0gdm9pZCAwID8gX3NlcnZpY2Vfb3B0aW9ucyA6IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDoge30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VEYXRhID0gc2VydmljZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgIH1cbiAgICBhc3luYyAkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChzZXJ2aWNlcy5tYXAoKHNlcnZpY2UpPT50aGlzLmluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2UpKSk7XG4gICAgfVxuICAgIGFzeW5jIGluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0gPSBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCB0aGlzLmN0eCkudGhlbigoaW5zdGFuY2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07IC8vIENsZWFuIHVwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgIHNlcnZpY2Uub3B0aW9ucyA9IG1lcmdlID8gKDAsX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubWVyZ2VPYmplY3RzICovIC5QTSkob3B0aW9ucywgc2VydmljZS5vcHRpb25zKSA6IG9wdGlvbnM7XG4gICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgZG9jdW1lbnRWYWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGUgfHwgIS9eYWNlXFwvbW9kZVxcLy8udGVzdChtb2RlKSkgcmV0dXJuO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKFwiYWNlL21vZGUvXCIsIFwiXCIpO1xuICAgICAgICBsZXQgc2VydmljZUluc3RhbmNlcyA9IGF3YWl0IHRoaXMuJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgbGV0IGRvY3VtZW50SXRlbSA9IHtcbiAgICAgICAgICAgIHVyaTogZG9jdW1lbnRJZGVudGlmaWVyLnVyaSxcbiAgICAgICAgICAgIHZlcnNpb246IGRvY3VtZW50SWRlbnRpZmllci52ZXJzaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2VJZDogbW9kZSxcbiAgICAgICAgICAgIHRleHQ6IGRvY3VtZW50VmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChlbCk9PmVsLmFkZERvY3VtZW50KGRvY3VtZW50SXRlbSkpO1xuICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV0gPSBtb2RlO1xuICAgICAgICByZXR1cm4gc2VydmljZUluc3RhbmNlcztcbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKHNlc3Npb25JRCkge1xuICAgICAgICBsZXQgbW9kZSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtzZXNzaW9uSURdO1xuICAgICAgICBpZiAoIW1vZGUpIHJldHVybiBbXTsgLy9UT0RPOlxuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzLm1hcCgoZWwpPT5lbC5zZXJ2aWNlSW5zdGFuY2UpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgIH1cbiAgICBmaWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gc2VydmljZUluc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgaWYgKCFlbC5zZXJ2aWNlRGF0YS5mZWF0dXJlc1tmZWF0dXJlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhcGFiaWxpdGllcyA9IGVsLnNlcnZpY2VDYXBhYmlsaXRpZXM7XG4gICAgICAgICAgICBzd2l0Y2goZmVhdHVyZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhvdmVyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuaG92ZXJQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblJlc29sdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKChfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9IGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIpID09PSBudWxsIHx8IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlci5yZXNvbHZlUHJvdmlkZXIpID09PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JtYXRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWUgfHwgY2FwYWJpbGl0aWVzLmRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRpYWdub3N0aWNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZGlhZ25vc3RpY1Byb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwic2lnbmF0dXJlSGVscFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLnNpZ25hdHVyZUhlbHBQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50SGlnaGxpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy4kc2VydmljZXMpLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IGVsLm1vZGVzLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmNsdWRlcyhtb2RlKSkgcmV0dXJuIGVsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKG5hbWUsIHNlcnZpY2UpIHtcbiAgICAgICAgc2VydmljZS5pZCA9IG5hbWU7XG4gICAgICAgIHNlcnZpY2UuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2UuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IHNlcnZpY2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmVyKG5hbWUsIGNsaWVudENvbmZpZykge1xuICAgICAgICBjbGllbnRDb25maWcuaWQgPSBuYW1lO1xuICAgICAgICBjbGllbnRDb25maWcuY2xhc3NOYW1lID0gXCJMYW5ndWFnZUNsaWVudFwiO1xuICAgICAgICBjbGllbnRDb25maWcuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGNsaWVudENvbmZpZy5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gY2xpZW50Q29uZmlnO1xuICAgIH1cbiAgICBjb25maWd1cmVGZWF0dXJlcyhuYW1lLCBmZWF0dXJlcykge1xuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoZmVhdHVyZXMpO1xuICAgICAgICBpZiAoIXRoaXMuJHNlcnZpY2VzW25hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdLmZlYXR1cmVzID0gZmVhdHVyZXM7XG4gICAgfVxuICAgIHNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2VGZWF0dXJlcykge1xuICAgICAgICB2YXIgX2ZlYXR1cmVzLCBfZmVhdHVyZXMxLCBfZmVhdHVyZXMyLCBfZmVhdHVyZXMzLCBfZmVhdHVyZXM0LCBfZmVhdHVyZXM1LCBfZmVhdHVyZXM2O1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihjdHgpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlcnZpY2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VJbml0UHJvbWlzZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlc3Npb25JRFRvTW9kZVwiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjdHhcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIGxldCBkb1ZhbGlkYXRpb24gPSBhc3luYyAoZG9jdW1lbnQsIHNlcnZpY2VzSW5zdGFuY2VzKT0+e1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgIT09IG51bGwgJiYgc2VydmljZXNJbnN0YW5jZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VzSW5zdGFuY2VzIDogc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzIGlzIGxpc3Qgb2YgZG9jdW1lbnRzIGxpbmtlZCB0byBzZXJ2aWNlc1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRExpc3QgPSBPYmplY3Qua2V5cyhzZXJ2aWNlc0luc3RhbmNlc1swXS5kb2N1bWVudHMpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlc0luc3RhbmNlcywgXCJkaWFnbm9zdGljc1wiKTtcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzID0gc2VydmljZXNJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuc2VydmljZUNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnZhbGlkYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgc2Vzc2lvbklEIG9mIHNlc3Npb25JRExpc3Qpe1xuICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuICAgICAgICAgICAgICAgIGxldCBkaWFnbm9zdGljcyA9IChfcmVmID0gYXdhaXQgUHJvbWlzZS5hbGwoc2VydmljZXNJbnN0YW5jZXMubWFwKChlbCk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmRvVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmk6IHNlc3Npb25JRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSkpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiBbXTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInNlc3Npb25JZFwiXSA9IHNlc3Npb25JRDtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gZGlhZ25vc3RpY3MuZmxhdCgpO1xuICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZShwb3N0TWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSA9IGFzeW5jIChzZXJ2aWNlTmFtZSk9PntcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgc2VydmljZUluc3RhbmNlID0gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlKSBhd2FpdCBkb1ZhbGlkYXRpb24odW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFzeW5jIChldik9PntcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXYuZGF0YTtcbiAgICAgICAgICAgIHZhciBfbWVzc2FnZV9zZXNzaW9uSWQ7XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklEID0gKF9tZXNzYWdlX3Nlc3Npb25JZCA9IG1lc3NhZ2Uuc2Vzc2lvbklkKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9zZXNzaW9uSWQgIT09IHZvaWQgMCA/IF9tZXNzYWdlX3Nlc3Npb25JZCA6IFwiXCI7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IG1lc3NhZ2UudmVyc2lvbjtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgICAgIFwic2Vzc2lvbklkXCI6IHNlc3Npb25JRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhzZXNzaW9uSUQpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50SWRlbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoKG1lc3NhZ2VbXCJ0eXBlXCJdKXtcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmZvcm1hdDpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZSB0byBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmZvcm1hdChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5yZXNvbHZlQ29tcGxldGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmljZU5hbWUgPSBtZXNzYWdlLnZhbHVlLnNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCAoKF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uUmVzb2x2ZVwiKS5maW5kKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kLmRvUmVzb2x2ZShtZXNzYWdlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldFZhbHVlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5hcHBseURlbHRhOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmFwcGx5RGVsdGFzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5ob3ZlcjpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImhvdmVyXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmRvSG92ZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy52YWxpZGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmluaXQ6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpcyA9IGF3YWl0IHRoaXMuYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLm1vZGUsIG1lc3NhZ2Uub3B0aW9ucykpID09PSBudWxsIHx8IF90aGlzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpcy5tYXAoKGVsKT0+ZWwuc2VydmljZUNhcGFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNoYW5nZU1vZGU6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpczE7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXMxID0gYXdhaXQgdGhpcy5jaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLm1vZGUsIG1lc3NhZ2Uub3B0aW9ucykpID09PSBudWxsIHx8IF90aGlzMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMxLm1hcCgoZWwpPT5lbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXRPcHRpb25zKHNlc3Npb25JRCwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNsb3NlRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZGlzcG9zZTpcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kaXNwb3NlQWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZ2xvYmFsT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxPcHRpb25zKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucywgbWVzc2FnZS5tZXJnZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNvbmZpZ3VyZUZlYXR1cmVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUZlYXR1cmVzKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnNpZ25hdHVyZUhlbHA6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJzaWduYXR1cmVIZWxwXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnByb3ZpZGVTaWduYXR1cmVIZWxwKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZG9jdW1lbnRIaWdobGlnaHQ6XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdobGlnaHRzID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZG9jdW1lbnRIaWdobGlnaHRcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZmluZERvY3VtZW50SGlnaGxpZ2h0cyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gaGlnaGxpZ2h0cy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG59KSgpO1xuXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7Il0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiYSIsImkiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiX191bnVzZWRfd2VicGFja19tb2R1bGUiLCJfX3dlYnBhY2tfZXhwb3J0c19fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImQiLCJDcyIsIk1lc3NhZ2VUeXBlIiwiX2RlZmluZV9wcm9wZXJ0eSIsIm9iaiIsImtleSIsInZhbHVlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJCYXNlTWVzc2FnZSIsImNvbnN0cnVjdG9yIiwic2Vzc2lvbklkIiwiSW5pdE1lc3NhZ2UiLCJ2ZXJzaW9uIiwibW9kZSIsIm9wdGlvbnMiLCJpbml0IiwiRm9ybWF0TWVzc2FnZSIsImZvcm1hdCIsIkNvbXBsZXRlTWVzc2FnZSIsImNvbXBsZXRlIiwiUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIiwicmVzb2x2ZUNvbXBsZXRpb24iLCJIb3Zlck1lc3NhZ2UiLCJob3ZlciIsIlZhbGlkYXRlTWVzc2FnZSIsInZhbGlkYXRlIiwiQ2hhbmdlTWVzc2FnZSIsImNoYW5nZSIsIkRlbHRhc01lc3NhZ2UiLCJhcHBseURlbHRhIiwiQ2hhbmdlTW9kZU1lc3NhZ2UiLCJjaGFuZ2VNb2RlIiwiQ2hhbmdlT3B0aW9uc01lc3NhZ2UiLCJtZXJnZSIsImNoYW5nZU9wdGlvbnMiLCJDbG9zZURvY3VtZW50TWVzc2FnZSIsImNsb3NlRG9jdW1lbnQiLCJEaXNwb3NlTWVzc2FnZSIsImRpc3Bvc2UiLCJHbG9iYWxPcHRpb25zTWVzc2FnZSIsInNlcnZpY2VOYW1lIiwiZ2xvYmFsT3B0aW9ucyIsIkNvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSIsImNvbmZpZ3VyZUZlYXR1cmVzIiwiU2lnbmF0dXJlSGVscE1lc3NhZ2UiLCJzaWduYXR1cmVIZWxwIiwiRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIiwiZG9jdW1lbnRIaWdobGlnaHQiLCJEdyIsIm5vdEVtcHR5IiwiUE0iLCJtZXJnZU9iamVjdHMiLCJvYmoxIiwib2JqMiIsIm1lcmdlZE9iamVjdHMiLCJrZXlzIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0IiwidW5kZWZpbmVkIiwibWVyZ2VSYW5nZXMiLCJyYW5nZXMiLCJsaXN0Iiwic29ydCIsImIiLCJjb21wYXJlUG9pbnRzIiwic3RhcnQiLCJuZXh0IiwicmFuZ2UiLCJsZW5ndGgiLCJjbXAiLCJlbmQiLCJpc0VtcHR5Iiwicm93IiwiY29sdW1uIiwic3BsaWNlIiwicDEiLCJwMiIsImNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkiLCJyZWdleHBBcnJheSIsInRlc3QiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJvIiwiZ2V0IiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIlNlcnZpY2VNYW5hZ2VyIiwiX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZGlzcG9zZUFsbCIsInNlcnZpY2VzIiwiJHNlcnZpY2VzIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl9zZXJ2aWNlc19zZXJ2aWNlTmFtZSIsInNlcnZpY2VJbnN0YW5jZSIsIiRpbml0U2VydmljZUluc3RhbmNlIiwic2VydmljZSIsImN0eCIsImluY2x1ZGVzIiwidHlwZSIsImNsYXNzTmFtZSIsIm1vZGVzIiwiaW5pdGlhbGl6YXRpb25PcHRpb25zIiwiX3NlcnZpY2Vfb3B0aW9ucyIsIl9yZWYiLCJzZXRHbG9iYWxPcHRpb25zIiwic2VydmljZURhdGEiLCIkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUiLCJmaW5kU2VydmljZXNCeU1vZGUiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCJhZGREb2N1bWVudCIsImRvY3VtZW50SWRlbnRpZmllciIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwic2VydmljZUluc3RhbmNlcyIsImRvY3VtZW50SXRlbSIsInVyaSIsImxhbmd1YWdlSWQiLCJ0ZXh0IiwiZm9yRWFjaCIsImVsIiwiJHNlc3Npb25JRFRvTW9kZSIsImNoYW5nZURvY3VtZW50TW9kZSIsInJlbW92ZURvY3VtZW50IiwiZG9jdW1lbnQiLCJnZXRTZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRCIsImZpbHRlciIsImZpbHRlckJ5RmVhdHVyZSIsImZlYXR1cmUiLCJmZWF0dXJlcyIsImNhcGFiaWxpdGllcyIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJob3ZlclByb3ZpZGVyIiwiY29tcGxldGlvblByb3ZpZGVyIiwiX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIiLCJyZXNvbHZlUHJvdmlkZXIiLCJkb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyIiwiZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIiLCJkaWFnbm9zdGljUHJvdmlkZXIiLCJzaWduYXR1cmVIZWxwUHJvdmlkZXIiLCJkb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyIiwidmFsdWVzIiwiZXh0ZW5zaW9ucyIsInNwbGl0IiwicmVnaXN0ZXJTZXJ2aWNlIiwibmFtZSIsInNldERlZmF1bHRGZWF0dXJlc1N0YXRlIiwicmVnaXN0ZXJTZXJ2ZXIiLCJjbGllbnRDb25maWciLCJzZXJ2aWNlRmVhdHVyZXMiLCJfZmVhdHVyZXMiLCJfZmVhdHVyZXMxIiwiX2ZlYXR1cmVzMiIsIl9mZWF0dXJlczMiLCJfZmVhdHVyZXM0IiwiX2ZlYXR1cmVzNSIsIl9mZWF0dXJlczYiLCJfaG92ZXIiLCJfY29tcGxldGlvbiIsImNvbXBsZXRpb24iLCJfY29tcGxldGlvblJlc29sdmUiLCJjb21wbGV0aW9uUmVzb2x2ZSIsIl9mb3JtYXQiLCJfZGlhZ25vc3RpY3MiLCJkaWFnbm9zdGljcyIsIl9zaWduYXR1cmVIZWxwIiwiX2RvY3VtZW50SGlnaGxpZ2h0IiwiZG9WYWxpZGF0aW9uIiwic2VydmljZXNJbnN0YW5jZXMiLCJzZXNzaW9uSURMaXN0IiwiZG9jdW1lbnRzIiwicG9zdE1lc3NhZ2UiLCJmbGF0IiwicHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJtZXNzYWdlIiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsImNvbXBsZXRpb25zIiwiZG9Db21wbGV0ZSIsIl90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kIiwiZmluZCIsImRvUmVzb2x2ZSIsInNldFZhbHVlIiwiYXBwbHlEZWx0YXMiLCJkb0hvdmVyIiwiX3RoaXMiLCJfdGhpczEiLCJzZXRPcHRpb25zIiwicHJvdmlkZVNpZ25hdHVyZUhlbHAiLCJoaWdobGlnaHRzIiwiZmluZERvY3VtZW50SGlnaGxpZ2h0cyJdLCJzb3VyY2VSb290IjoiIn0=