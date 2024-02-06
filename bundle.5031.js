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
                /* unused harmony exports mergeRanges, checkValueAgainstRegexpArray */ function mergeObjects(obj1, obj2, excludeUndefined = false) {
                    if (!obj1) return obj2;
                    if (!obj2) return obj1;
                    if (excludeUndefined) {
                        obj1 = excludeUndefinedValues(obj1);
                        obj2 = excludeUndefinedValues(obj2);
                    }
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
                function excludeUndefinedValues(obj) {
                    const filteredEntries = Object.entries(obj).filter(([_, value])=>value !== undefined);
                    return Object.fromEntries(filteredEntries);
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
        /******/ function __nested_webpack_require_14988__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_14988__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_14988__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_14988__.o(definition, key) && !__nested_webpack_require_14988__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_14988__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_14988__.r = (exports1)=>{
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
            __nested_webpack_require_14988__.r(__nested_webpack_exports__);
            /* harmony export */ __nested_webpack_require_14988__.d(__nested_webpack_exports__, {
                /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
            });
            /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_14988__(6297);
            /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_14988__(6002);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0NBQ3ZHLE9BQU9BLFFBQVF1RyxzQkFBc0IsQ0FBQ2pGLG9CQUFvQmlFLFFBQVFwTSxLQUFLO2dDQUMzRSxHQUFFLEVBQUc2RCxNQUFNLENBQUN1QyxvQ0FBbUMsYUFBYSxJQUFJdEQsRUFBRTtnQ0FDbEVpSixXQUFXLENBQUMsUUFBUSxHQUFHb0IsV0FBV25CLElBQUk7Z0NBQ3RDO3dCQUNSO3dCQUNBbEYsSUFBSWlGLFdBQVcsQ0FBQ0E7b0JBQ3BCO2dCQUNKO1lBQ0o7UUFFQTtRQUVBLE1BQU0sR0FBSSxPQUFPdk0sMEJBQW1CQTtJQUNwQyxNQUFNLEdBQUc7QUFFVCIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9hY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIDYwMDI6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIENzOiAoKSA9PiAoLyogYmluZGluZyAqLyBNZXNzYWdlVHlwZSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBCYXNlTWVzc2FnZSwgSW5pdE1lc3NhZ2UsIEZvcm1hdE1lc3NhZ2UsIENvbXBsZXRlTWVzc2FnZSwgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlLCBIb3Zlck1lc3NhZ2UsIFZhbGlkYXRlTWVzc2FnZSwgQ2hhbmdlTWVzc2FnZSwgRGVsdGFzTWVzc2FnZSwgQ2hhbmdlTW9kZU1lc3NhZ2UsIENoYW5nZU9wdGlvbnNNZXNzYWdlLCBDbG9zZURvY3VtZW50TWVzc2FnZSwgRGlzcG9zZU1lc3NhZ2UsIEdsb2JhbE9wdGlvbnNNZXNzYWdlLCBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UsIFNpZ25hdHVyZUhlbHBNZXNzYWdlLCBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIG1vZGUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VEb2N1bWVudCk7XG4gICAgfVxufVxuY2xhc3MgRGlzcG9zZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcihcIlwiKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZGlzcG9zZSk7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24oTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZm9ybWF0XCJdID0gMV0gPSBcImZvcm1hdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29tcGxldGVcIl0gPSAyXSA9IFwiY29tcGxldGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlc29sdmVDb21wbGV0aW9uXCJdID0gM10gPSBcInJlc29sdmVDb21wbGV0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VcIl0gPSA0XSA9IFwiY2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJob3ZlclwiXSA9IDVdID0gXCJob3ZlclwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1widmFsaWRhdGVcIl0gPSA2XSA9IFwidmFsaWRhdGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RGVsdGFcIl0gPSA3XSA9IFwiYXBwbHlEZWx0YVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlTW9kZVwiXSA9IDhdID0gXCJjaGFuZ2VNb2RlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VPcHRpb25zXCJdID0gOV0gPSBcImNoYW5nZU9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlRG9jdW1lbnRcIl0gPSAxMF0gPSBcImNsb3NlRG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdsb2JhbE9wdGlvbnNcIl0gPSAxMV0gPSBcImdsb2JhbE9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbmZpZ3VyZUZlYXR1cmVzXCJdID0gMTJdID0gXCJjb25maWd1cmVGZWF0dXJlc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2lnbmF0dXJlSGVscFwiXSA9IDEzXSA9IFwic2lnbmF0dXJlSGVscFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZG9jdW1lbnRIaWdobGlnaHRcIl0gPSAxNF0gPSBcImRvY3VtZW50SGlnaGxpZ2h0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkaXNwb3NlXCJdID0gMTVdID0gXCJkaXNwb3NlXCI7XG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA2Mjk3OlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBEdzogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICBQTTogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbWVyZ2VPYmplY3RzKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIG1lcmdlUmFuZ2VzLCBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5ICovXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG4vL3Rha2VuIHdpdGggc21hbGwgY2hhbmdlcyBmcm9tIGFjZS1jb2RlXG5mdW5jdGlvbiBtZXJnZVJhbmdlcyhyYW5nZXMpIHtcbiAgICB2YXIgbGlzdCA9IHJhbmdlcztcbiAgICBsaXN0ID0gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVQb2ludHMoYS5zdGFydCwgYi5zdGFydCk7XG4gICAgfSk7XG4gICAgdmFyIG5leHQgPSBsaXN0WzBdLCByYW5nZTtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHJhbmdlID0gbmV4dDtcbiAgICAgICAgbmV4dCA9IGxpc3RbaV07XG4gICAgICAgIHZhciBjbXAgPSBjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5zdGFydCk7XG4gICAgICAgIGlmIChjbXAgPCAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNtcCA9PSAwICYmICFyYW5nZS5pc0VtcHR5KCkgJiYgIW5leHQuaXNFbXB0eSgpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LmVuZCkgPCAwKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gbmV4dC5lbmQucm93O1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IG5leHQuZW5kLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgbmV4dCA9IHJhbmdlO1xuICAgICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuZnVuY3Rpb24gY29tcGFyZVBvaW50cyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEucm93IC0gcDIucm93IHx8IHAxLmNvbHVtbiAtIHAyLmNvbHVtbjtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkodmFsdWUsIHJlZ2V4cEFycmF5KSB7XG4gICAgaWYgKCFyZWdleHBBcnJheSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWdleHBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChyZWdleHBBcnJheVtpXS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuKCgpID0+IHtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VNYW5hZ2VyOiAoKSA9PiAoLyogYmluZGluZyAqLyBTZXJ2aWNlTWFuYWdlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Mjk3KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MDAyKTtcbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5jbGFzcyBTZXJ2aWNlTWFuYWdlciB7XG4gICAgYXN5bmMgZGlzcG9zZUFsbCgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy4kc2VydmljZXM7XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIGF3YWl0ICgoX3NlcnZpY2VzX3NlcnZpY2VOYW1lID0gc2VydmljZXNbc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZS5kaXNwb3NlKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgpIHtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKCd0eXBlJyBpbiBzZXJ2aWNlKSB7XG4gICAgICAgICAgICBpZiAoW1xuICAgICAgICAgICAgICAgIFwic29ja2V0XCIsXG4gICAgICAgICAgICAgICAgXCJ3ZWJ3b3JrZXJcIlxuICAgICAgICAgICAgXS5pbmNsdWRlcyhzZXJ2aWNlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbXCJMYW5ndWFnZUNsaWVudFwiXShzZXJ2aWNlLCBjdHgpO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IFwiVW5rbm93biBzZXJ2aWNlIHR5cGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbc2VydmljZS5jbGFzc05hbWVdKHNlcnZpY2UubW9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2aWNlLm9wdGlvbnMgfHwgc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9vcHRpb25zLCBfcmVmO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucygoX3JlZiA9IChfc2VydmljZV9vcHRpb25zID0gc2VydmljZS5vcHRpb25zKSAhPT0gbnVsbCAmJiBfc2VydmljZV9vcHRpb25zICE9PSB2b2lkIDAgPyBfc2VydmljZV9vcHRpb25zIDogc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jICRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHNlcnZpY2VzLm1hcCgoc2VydmljZSk9PnRoaXMuaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZSkpKTtcbiAgICB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZSkge1xuICAgICAgICBpZiAoIXNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSA9IFNlcnZpY2VNYW5hZ2VyLiRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIHRoaXMuY3R4KS50aGVuKChpbnN0YW5jZSk9PntcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTsgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxPcHRpb25zKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgc2VydmljZS5vcHRpb25zID0gbWVyZ2UgPyAoMCxfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5tZXJnZU9iamVjdHMgKi8gLlBNKShvcHRpb25zLCBzZXJ2aWNlLm9wdGlvbnMpIDogb3B0aW9ucztcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKHNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZG9jdW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgdXJpOiBkb2N1bWVudElkZW50aWZpZXIudXJpLFxuICAgICAgICAgICAgdmVyc2lvbjogZG9jdW1lbnRJZGVudGlmaWVyLnZlcnNpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUlkOiBtb2RlLFxuICAgICAgICAgICAgdGV4dDogZG9jdW1lbnRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKGVsKT0+ZWwuYWRkRG9jdW1lbnQoZG9jdW1lbnRJdGVtKSk7XG4gICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVEb2N1bWVudChkb2N1bWVudCkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbW92ZURvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50LnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VydmljZXNJbnN0YW5jZXMoc2Vzc2lvbklEKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW3Nlc3Npb25JRF07XG4gICAgICAgIGlmICghbW9kZSkgcmV0dXJuIFtdOyAvL1RPRE86XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICByZXR1cm4gc2VydmljZXMubWFwKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgfVxuICAgIGZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBpZiAoIWVsLnNlcnZpY2VEYXRhLmZlYXR1cmVzW2ZlYXR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FwYWJpbGl0aWVzID0gZWwuc2VydmljZUNhcGFiaWxpdGllcztcbiAgICAgICAgICAgIHN3aXRjaChmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG92ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5ob3ZlclByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uUmVzb2x2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID0gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlcikgPT09IG51bGwgfHwgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyLnJlc29sdmVQcm92aWRlcikgPT09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZSB8fCBjYXBhYmlsaXRpZXMuZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGlhZ25vc3RpY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaWduYXR1cmVIZWxwXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2lnbmF0dXJlSGVscFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRIaWdobGlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLiRzZXJ2aWNlcykuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gZWwubW9kZXMuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluY2x1ZGVzKG1vZGUpKSByZXR1cm4gZWw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczY7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZUluaXRQcm9taXNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2Vzc2lvbklEVG9Nb2RlXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImN0eFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklETGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MudmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBzZXNzaW9uSUQgb2Ygc2Vzc2lvbklETGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wic2Vzc2lvbklkXCJdID0gc2Vzc2lvbklEO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZS5zZXNzaW9uSWQpICE9PSBudWxsICYmIF9tZXNzYWdlX3Nlc3Npb25JZCAhPT0gdm9pZCAwID8gX21lc3NhZ2Vfc2Vzc2lvbklkIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gbWVzc2FnZS52ZXJzaW9uO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklEXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKHNlc3Npb25JRCk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZVtcInR5cGVcIl0pe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWUuc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZG9Ib3Zlcihkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuRHcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnZhbGlkYXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuaW5pdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzID0gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzLm1hcCgoZWwpPT5lbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlTW9kZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpczEgPSBhd2FpdCB0aGlzLmNoYW5nZURvY3VtZW50TW9kZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKSkgPT09IG51bGwgfHwgX3RoaXMxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpczEubWFwKChlbCk9PmVsLnNlcnZpY2VDYXBhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldE9wdGlvbnMoc2Vzc2lvbklELCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2xvc2VEb2N1bWVudDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kaXNwb3NlOlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRpc3Bvc2VBbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3Muc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UucHJvdmlkZVNpZ25hdHVyZUhlbHAoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5maW5kRG9jdW1lbnRIaWdobGlnaHRzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBoaWdobGlnaHRzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbn0pKCk7XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkNzIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJzZXNzaW9uSWQiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UiLCJyZXNvbHZlQ29tcGxldGlvbiIsIkhvdmVyTWVzc2FnZSIsImhvdmVyIiwiVmFsaWRhdGVNZXNzYWdlIiwidmFsaWRhdGUiLCJDaGFuZ2VNZXNzYWdlIiwiY2hhbmdlIiwiRGVsdGFzTWVzc2FnZSIsImFwcGx5RGVsdGEiLCJDaGFuZ2VNb2RlTWVzc2FnZSIsImNoYW5nZU1vZGUiLCJDaGFuZ2VPcHRpb25zTWVzc2FnZSIsIm1lcmdlIiwiY2hhbmdlT3B0aW9ucyIsIkNsb3NlRG9jdW1lbnRNZXNzYWdlIiwiY2xvc2VEb2N1bWVudCIsIkRpc3Bvc2VNZXNzYWdlIiwiZGlzcG9zZSIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkR3Iiwibm90RW1wdHkiLCJQTSIsIm1lcmdlT2JqZWN0cyIsIm9iajEiLCJvYmoyIiwiZXhjbHVkZVVuZGVmaW5lZCIsImV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMiLCJtZXJnZWRPYmplY3RzIiwia2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImZpbHRlcmVkRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJfIiwidW5kZWZpbmVkIiwiZnJvbUVudHJpZXMiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJkaXNwb3NlQWxsIiwic2VydmljZXMiLCIkc2VydmljZXMiLCJfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lIiwic2VydmljZUluc3RhbmNlIiwiJGluaXRTZXJ2aWNlSW5zdGFuY2UiLCJzZXJ2aWNlIiwiY3R4IiwiaW5jbHVkZXMiLCJ0eXBlIiwiY2xhc3NOYW1lIiwibW9kZXMiLCJpbml0aWFsaXphdGlvbk9wdGlvbnMiLCJfc2VydmljZV9vcHRpb25zIiwiX3JlZiIsInNldEdsb2JhbE9wdGlvbnMiLCJzZXJ2aWNlRGF0YSIsIiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZSIsImZpbmRTZXJ2aWNlc0J5TW9kZSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpbml0aWFsaXplU2VydmljZSIsInNlcnZpY2VJbml0UHJvbWlzZXMiLCJpZCIsInRoZW4iLCJpbnN0YW5jZSIsImFkZERvY3VtZW50IiwiZG9jdW1lbnRJZGVudGlmaWVyIiwiZG9jdW1lbnRWYWx1ZSIsInJlcGxhY2UiLCJzZXJ2aWNlSW5zdGFuY2VzIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJmb3JFYWNoIiwiZWwiLCIkc2Vzc2lvbklEVG9Nb2RlIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwic2Vzc2lvbklEIiwiZmlsdGVyQnlGZWF0dXJlIiwiZmVhdHVyZSIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwic2VydmljZUNhcGFiaWxpdGllcyIsImhvdmVyUHJvdmlkZXIiLCJjb21wbGV0aW9uUHJvdmlkZXIiLCJfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsImRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIiLCJkb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciIsImRpYWdub3N0aWNQcm92aWRlciIsInNpZ25hdHVyZUhlbHBQcm92aWRlciIsImRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIiLCJ2YWx1ZXMiLCJleHRlbnNpb25zIiwic3BsaXQiLCJyZWdpc3RlclNlcnZpY2UiLCJuYW1lIiwic2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUiLCJyZWdpc3RlclNlcnZlciIsImNsaWVudENvbmZpZyIsInNlcnZpY2VGZWF0dXJlcyIsIl9mZWF0dXJlcyIsIl9mZWF0dXJlczEiLCJfZmVhdHVyZXMyIiwiX2ZlYXR1cmVzMyIsIl9mZWF0dXJlczQiLCJfZmVhdHVyZXM1IiwiX2ZlYXR1cmVzNiIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJkb1ZhbGlkYXRpb24iLCJzZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRExpc3QiLCJkb2N1bWVudHMiLCJwb3N0TWVzc2FnZSIsImZsYXQiLCJwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsIm1lc3NhZ2UiLCJkYXRhIiwiX21lc3NhZ2Vfc2Vzc2lvbklkIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQiLCJmaW5kIiwiZG9SZXNvbHZlIiwic2V0VmFsdWUiLCJhcHBseURlbHRhcyIsImRvSG92ZXIiLCJfdGhpcyIsIl90aGlzMSIsInNldE9wdGlvbnMiLCJwcm92aWRlU2lnbmF0dXJlSGVscCIsImhpZ2hsaWdodHMiLCJmaW5kRG9jdW1lbnRIaWdobGlnaHRzIl0sInNvdXJjZVJvb3QiOiIifQ==