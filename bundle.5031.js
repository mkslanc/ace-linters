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
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, DisposeMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage, GetSemanticTokensMessage */ function _define_property(obj, key, value) {
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
                        _define_property(this, "version", void 0);
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
                    constructor(sessionId, value, version, mode){
                        super(sessionId);
                        _define_property(this, "type", MessageType.changeMode);
                        _define_property(this, "mode", void 0);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.mode = mode;
                        this.version = version;
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
                class GetSemanticTokensMessage extends /* unused pure expression or super */ (null && 0) {
                    constructor(sessionId, value){
                        super(sessionId);
                        _define_property(this, "type", MessageType.getSemanticTokens);
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
                    MessageType[MessageType["capabilitiesChange"] = 16] = "capabilitiesChange";
                    MessageType[MessageType["getSemanticTokens"] = 17] = "getSemanticTokens";
                })(MessageType || (MessageType = {}));
            /***/ },
            /***/ 6297: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_11914__)=>{
                /* harmony export */ __nested_webpack_require_11914__.d(__nested_webpack_exports__, {
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
        /******/ function __nested_webpack_require_15841__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_15841__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_15841__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_15841__.o(definition, key) && !__nested_webpack_require_15841__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_15841__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_15841__.r = (exports1)=>{
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
            __nested_webpack_require_15841__.r(__nested_webpack_exports__);
            /* harmony export */ __nested_webpack_require_15841__.d(__nested_webpack_exports__, {
                /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
            });
            /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_15841__(6297);
            /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_15841__(6002);
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
                async getServicesCapabilitiesAfterCallback(documentIdentifier, message, callback) {
                    let services = await callback(documentIdentifier, message.value, message.mode, message.options);
                    if (services) {
                        return Object.keys(services).reduce((acc, key)=>{
                            var _services_key_serviceInstance, _services_key;
                            acc[key] = ((_services_key = services[key]) === null || _services_key === void 0 ? void 0 : (_services_key_serviceInstance = _services_key.serviceInstance) === null || _services_key_serviceInstance === void 0 ? void 0 : _services_key_serviceInstance.serviceCapabilities) || null;
                            return acc;
                        }, {});
                    }
                }
                async aggregateFeatureResponses(serviceInstances, feature, methodName, documentIdentifier, value) {
                    return (await Promise.all(this.filterByFeature(serviceInstances, feature).map(async (service)=>{
                        return service[methodName](documentIdentifier, value);
                    }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                }
                applyOptionsToServices(serviceInstances, sessionID, options) {
                    serviceInstances.forEach((service)=>{
                        service.setOptions(sessionID, options);
                    });
                }
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
                    if (Object.keys(services).length === 0) {
                        return [];
                    }
                    for(let serviceName in services){
                        await this.initializeService(serviceName);
                    }
                    return services;
                }
                async initializeService(serviceName) {
                    let service = this.$services[serviceName];
                    if (!service.serviceInstance) {
                        if (!this.serviceInitPromises[service.id]) {
                            this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx).then((instance)=>{
                                service.serviceInstance = instance;
                                service.serviceInstance.serviceName = serviceName;
                                delete this.serviceInitPromises[service.id]; // Clean up
                                return instance;
                            });
                        }
                        return this.serviceInitPromises[service.id];
                    } else {
                        if (!service.serviceInstance.serviceName) {
                            service.serviceInstance.serviceName = serviceName;
                        }
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
                    let services = await this.$getServicesInstancesByMode(mode);
                    if (Object.keys(services).length === 0) return;
                    let documentItem = {
                        uri: documentIdentifier.uri,
                        version: documentIdentifier.version,
                        languageId: mode,
                        text: documentValue
                    };
                    Object.values(services).forEach((el)=>el.serviceInstance.addDocument(documentItem));
                    this.$sessionIDToMode[documentIdentifier.uri] = mode;
                    return services;
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
                    return Object.values(services).map((el)=>el.serviceInstance).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
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
                            case "semanticTokens":
                                return capabilities.semanticTokensProvider != undefined;
                        }
                    });
                }
                findServicesByMode(mode) {
                    let servicesWithName = {};
                    Object.entries(this.$services).forEach(([key, value])=>{
                        let extensions = value.modes.split('|');
                        if (extensions.includes(mode)) servicesWithName[key] = this.$services[key];
                    });
                    return servicesWithName;
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
                    var _features, _features1, _features2, _features3, _features4, _features5, _features6, _features7;
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
                    var _semanticTokens;
                    (_semanticTokens = (_features7 = features).semanticTokens) !== null && _semanticTokens !== void 0 ? _semanticTokens : _features7.semanticTokens = true;
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
                        let sessionID = (_message_sessionId = message["sessionId"]) !== null && _message_sessionId !== void 0 ? _message_sessionId : "";
                        let version = message["version"];
                        let postMessage = {
                            "type": message.type,
                            "sessionId": sessionID
                        };
                        let serviceInstances = this.getServicesInstances(sessionID);
                        let documentIdentifier = {
                            uri: sessionID,
                            version: version
                        };
                        switch(message.type){
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
                                        completions: await service.doComplete(documentIdentifier, message["value"]),
                                        service: service.serviceData.className
                                    };
                                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .Dw);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.resolveCompletion:
                                var _this_filterByFeature_find;
                                let serviceName = message.value["service"];
                                postMessage["value"] = await ((_this_filterByFeature_find = this.filterByFeature(serviceInstances, "completionResolve").find((service)=>{
                                    if (service.serviceData.className === serviceName) {
                                        return service;
                                    }
                                })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value));
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.change:
                                serviceInstances.forEach((service)=>{
                                    service.setValue(documentIdentifier, message["value"]);
                                });
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.applyDelta:
                                serviceInstances.forEach((service)=>{
                                    service.applyDeltas(documentIdentifier, message["value"]);
                                });
                                await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.hover:
                                postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "hover", "doHover", documentIdentifier, message.value);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.validate:
                                postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.init:
                                postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.addDocument.bind(this));
                                await doValidation(documentIdentifier);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.changeMode:
                                postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.changeDocumentMode.bind(this));
                                await doValidation(documentIdentifier);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.changeOptions:
                                this.applyOptionsToServices(serviceInstances, sessionID, message.options);
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
                                postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "signatureHelp", "provideSignatureHelp", documentIdentifier, message.value);
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.documentHighlight:
                                let highlights = await this.aggregateFeatureResponses(serviceInstances, "documentHighlight", "findDocumentHighlights", documentIdentifier, message.value);
                                postMessage["value"] = highlights.flat();
                                break;
                            case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Cs.getSemanticTokens:
                                serviceInstances = this.filterByFeature(serviceInstances, "semanticTokens");
                                if (serviceInstances.length > 0) {
                                    //we will use only first service
                                    postMessage["value"] = await serviceInstances[0].getSemanticTokens(documentIdentifier, message.value);
                                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUwMzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQyxVQUFTQSxpQ0FBaUNDLElBQUksRUFBRUMsT0FBTztJQUN2RCxJQUFHLElBQXlELEVBQzNERSxPQUFPRCxPQUFPLEdBQUdEO1NBQ2IsYUFLSjtBQUNGLEdBQUcsSUFBSSxFQUFFO0lBQ1QsT0FBZ0IsTUFBSCxHQUFJO1FBQ2pCLE1BQU0sR0FBSTtRQUNWLE1BQU0sR0FBSSxJQUFJTyxzQkFBdUI7WUFFckMsR0FBRyxHQUFHLE1BQ04sR0FBRyxHQUFJLENBQUNDLHlCQUF5QkMsMEJBQW1CQSxFQUFFQyw4QkFBbUJBO2dCQUV6RSxrQkFBa0IsR0FBR0EsOEJBQW1CQSxDQUFDQyxDQUFDLENBQUNGLDBCQUFtQkEsRUFBRTtvQkFDaEUsa0JBQWtCLEdBQUtHLElBQUksSUFBTyxXQUFXLEdBQUdDO2dCQUMzQjtnQkFDckIsbVhBQW1YLEdBQ25YLFNBQVNDLGlCQUFpQkMsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLEtBQUs7b0JBQ3JDLElBQUlELE9BQU9ELEtBQUs7d0JBQ1pHLE9BQU9DLGNBQWMsQ0FBQ0osS0FBS0MsS0FBSzs0QkFDNUJDLE9BQU9BOzRCQUNQRyxZQUFZOzRCQUNaQyxjQUFjOzRCQUNkQyxVQUFVO3dCQUNkO29CQUNKLE9BQU87d0JBQ0hQLEdBQUcsQ0FBQ0MsSUFBSSxHQUFHQztvQkFDZjtvQkFDQSxPQUFPRjtnQkFDWDtnQkFDQSxNQUFNUTtvQkFDRkMsWUFBWUMsU0FBUyxDQUFDO3dCQUNsQlgsaUJBQWlCLElBQUksRUFBRSxhQUFhLEtBQUs7d0JBQ3pDQSxpQkFBaUIsSUFBSSxFQUFFLFdBQVcsS0FBSzt3QkFDdkMsSUFBSSxDQUFDVyxTQUFTLEdBQUdBO29CQUNyQjtnQkFDSjtnQkFDQSxNQUFNQyxvQkFBcUIsbUNBQW1DLEdBQUcsU0FBU0gsQ0FBVztvQkFDakZDLFlBQVlDLFNBQVMsRUFBRVIsS0FBSyxFQUFFVSxPQUFPLEVBQUVDLElBQUksRUFBRUMsT0FBTyxDQUFDO3dCQUNqRCxLQUFLLENBQUNKO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVlpQixJQUFJO3dCQUMvQ2hCLGlCQUFpQixJQUFJLEVBQUUsUUFBUSxLQUFLO3dCQUNwQ0EsaUJBQWlCLElBQUksRUFBRSxXQUFXLEtBQUs7d0JBQ3ZDQSxpQkFBaUIsSUFBSSxFQUFFLFNBQVMsS0FBSzt3QkFDckNBLGlCQUFpQixJQUFJLEVBQUUsV0FBVyxLQUFLO3dCQUN2QyxJQUFJLENBQUNhLE9BQU8sR0FBR0E7d0JBQ2YsSUFBSSxDQUFDRSxPQUFPLEdBQUdBO3dCQUNmLElBQUksQ0FBQ0QsSUFBSSxHQUFHQTt3QkFDWixJQUFJLENBQUNYLEtBQUssR0FBR0E7b0JBQ2pCO2dCQUNKO2dCQUNBLE1BQU1jLHNCQUF1QixtQ0FBbUMsR0FBRyxTQUFTUixDQUFXO29CQUNuRkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLEVBQUVlLE1BQU0sQ0FBQzt3QkFDakMsS0FBSyxDQUFDUDt3QkFDTlgsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZbUIsTUFBTTt3QkFDakRsQixpQkFBaUIsSUFBSSxFQUFFLFNBQVMsS0FBSzt3QkFDckNBLGlCQUFpQixJQUFJLEVBQUUsVUFBVSxLQUFLO3dCQUN0QyxJQUFJLENBQUNHLEtBQUssR0FBR0E7d0JBQ2IsSUFBSSxDQUFDZSxNQUFNLEdBQUdBO29CQUNsQjtnQkFDSjtnQkFDQSxNQUFNQyx3QkFBeUIsbUNBQW1DLEdBQUcsU0FBU1YsQ0FBVztvQkFDckZDLFlBQVlDLFNBQVMsRUFBRVIsS0FBSyxDQUFDO3dCQUN6QixLQUFLLENBQUNRO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVlxQixRQUFRO3dCQUNuRHBCLGlCQUFpQixJQUFJLEVBQUUsU0FBUyxLQUFLO3dCQUNyQyxJQUFJLENBQUNHLEtBQUssR0FBR0E7b0JBQ2pCO2dCQUNKO2dCQUNBLE1BQU1rQixpQ0FBa0MsbUNBQW1DLEdBQUcsU0FBU1osQ0FBVztvQkFDOUZDLFlBQVlDLFNBQVMsRUFBRVIsS0FBSyxDQUFDO3dCQUN6QixLQUFLLENBQUNRO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVl1QixpQkFBaUI7d0JBQzVEdEIsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDLElBQUksQ0FBQ0csS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsTUFBTW9CLHFCQUFzQixtQ0FBbUMsR0FBRyxTQUFTZCxDQUFXO29CQUNsRkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLENBQUM7d0JBQ3pCLEtBQUssQ0FBQ1E7d0JBQ05YLGlCQUFpQixJQUFJLEVBQUUsUUFBUUQsWUFBWXlCLEtBQUs7d0JBQ2hEeEIsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDLElBQUksQ0FBQ0csS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsTUFBTXNCLHdCQUF5QixtQ0FBbUMsR0FBRyxTQUFTaEIsQ0FBVztvQkFDckZDLFlBQVlDLFNBQVMsQ0FBQzt3QkFDbEIsS0FBSyxDQUFDQTt3QkFDTlgsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZMkIsUUFBUTtvQkFDdkQ7Z0JBQ0o7Z0JBQ0EsTUFBTUMsc0JBQXVCLG1DQUFtQyxHQUFHLFNBQVNsQixDQUFXO29CQUNuRkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLEVBQUVVLE9BQU8sQ0FBQzt3QkFDbEMsS0FBSyxDQUFDRjt3QkFDTlgsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZNkIsTUFBTTt3QkFDakQ1QixpQkFBaUIsSUFBSSxFQUFFLFNBQVMsS0FBSzt3QkFDckNBLGlCQUFpQixJQUFJLEVBQUUsV0FBVyxLQUFLO3dCQUN2QyxJQUFJLENBQUNHLEtBQUssR0FBR0E7d0JBQ2IsSUFBSSxDQUFDVSxPQUFPLEdBQUdBO29CQUNuQjtnQkFDSjtnQkFDQSxNQUFNZ0Isc0JBQXVCLG1DQUFtQyxHQUFHLFNBQVNwQixDQUFXO29CQUNuRkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLEVBQUVVLE9BQU8sQ0FBQzt3QkFDbEMsS0FBSyxDQUFDRjt3QkFDTlgsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZK0IsVUFBVTt3QkFDckQ5QixpQkFBaUIsSUFBSSxFQUFFLFNBQVMsS0FBSzt3QkFDckNBLGlCQUFpQixJQUFJLEVBQUUsV0FBVyxLQUFLO3dCQUN2QyxJQUFJLENBQUNHLEtBQUssR0FBR0E7d0JBQ2IsSUFBSSxDQUFDVSxPQUFPLEdBQUdBO29CQUNuQjtnQkFDSjtnQkFDQSxNQUFNa0IsMEJBQTJCLG1DQUFtQyxHQUFHLFNBQVN0QixDQUFXO29CQUN2RkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLEVBQUVVLE9BQU8sRUFBRUMsSUFBSSxDQUFDO3dCQUN4QyxLQUFLLENBQUNIO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVlpQyxVQUFVO3dCQUNyRGhDLGlCQUFpQixJQUFJLEVBQUUsUUFBUSxLQUFLO3dCQUNwQ0EsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDQSxpQkFBaUIsSUFBSSxFQUFFLFdBQVcsS0FBSzt3QkFDdkMsSUFBSSxDQUFDRyxLQUFLLEdBQUdBO3dCQUNiLElBQUksQ0FBQ1csSUFBSSxHQUFHQTt3QkFDWixJQUFJLENBQUNELE9BQU8sR0FBR0E7b0JBQ25CO2dCQUNKO2dCQUNBLE1BQU1vQiw2QkFBOEIsbUNBQW1DLEdBQUcsU0FBU3hCLENBQVc7b0JBQzFGQyxZQUFZQyxTQUFTLEVBQUVJLE9BQU8sRUFBRW1CLFFBQVEsS0FBSyxDQUFDO3dCQUMxQyxLQUFLLENBQUN2Qjt3QkFDTlgsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZb0MsYUFBYTt3QkFDeERuQyxpQkFBaUIsSUFBSSxFQUFFLFdBQVcsS0FBSzt3QkFDdkNBLGlCQUFpQixJQUFJLEVBQUUsU0FBUyxLQUFLO3dCQUNyQyxJQUFJLENBQUNlLE9BQU8sR0FBR0E7d0JBQ2YsSUFBSSxDQUFDbUIsS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsTUFBTUUsNkJBQThCLG1DQUFtQyxHQUFHLFNBQVMzQixDQUFXO29CQUMxRkMsWUFBWUMsU0FBUyxDQUFDO3dCQUNsQixLQUFLLENBQUNBO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVlzQyxhQUFhO29CQUM1RDtnQkFDSjtnQkFDQSxNQUFNQyx1QkFBd0IsbUNBQW1DLEdBQUcsU0FBUzdCLENBQVc7b0JBQ3BGQyxhQUFhO3dCQUNULEtBQUssQ0FBQzt3QkFDTlYsaUJBQWlCLElBQUksRUFBRSxRQUFRRCxZQUFZd0MsT0FBTztvQkFDdEQ7Z0JBQ0o7Z0JBQ0EsTUFBTUM7b0JBQ0Y5QixZQUFZK0IsV0FBVyxFQUFFMUIsT0FBTyxFQUFFbUIsS0FBSyxDQUFDO3dCQUNwQ2xDLGlCQUFpQixJQUFJLEVBQUUsUUFBUUQsWUFBWTJDLGFBQWE7d0JBQ3hEMUMsaUJBQWlCLElBQUksRUFBRSxlQUFlLEtBQUs7d0JBQzNDQSxpQkFBaUIsSUFBSSxFQUFFLFdBQVcsS0FBSzt3QkFDdkNBLGlCQUFpQixJQUFJLEVBQUUsU0FBUyxLQUFLO3dCQUNyQyxJQUFJLENBQUN5QyxXQUFXLEdBQUdBO3dCQUNuQixJQUFJLENBQUMxQixPQUFPLEdBQUdBO3dCQUNmLElBQUksQ0FBQ21CLEtBQUssR0FBR0E7b0JBQ2pCO2dCQUNKO2dCQUNBLE1BQU1TO29CQUNGakMsWUFBWStCLFdBQVcsRUFBRTFCLE9BQU8sQ0FBQzt3QkFDN0JmLGlCQUFpQixJQUFJLEVBQUUsUUFBUUQsWUFBWTZDLGlCQUFpQjt3QkFDNUQ1QyxpQkFBaUIsSUFBSSxFQUFFLGVBQWUsS0FBSzt3QkFDM0NBLGlCQUFpQixJQUFJLEVBQUUsV0FBVyxLQUFLO3dCQUN2QyxJQUFJLENBQUN5QyxXQUFXLEdBQUdBO3dCQUNuQixJQUFJLENBQUMxQixPQUFPLEdBQUdBO29CQUNuQjtnQkFDSjtnQkFDQSxNQUFNOEIsNkJBQThCLG1DQUFtQyxHQUFHLFNBQVNwQyxDQUFXO29CQUMxRkMsWUFBWUMsU0FBUyxFQUFFUixLQUFLLENBQUM7d0JBQ3pCLEtBQUssQ0FBQ1E7d0JBQ05YLGlCQUFpQixJQUFJLEVBQUUsUUFBUUQsWUFBWStDLGFBQWE7d0JBQ3hEOUMsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDLElBQUksQ0FBQ0csS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsTUFBTTRDLGlDQUFrQyxtQ0FBbUMsR0FBRyxTQUFTdEMsQ0FBVztvQkFDOUZDLFlBQVlDLFNBQVMsRUFBRVIsS0FBSyxDQUFDO3dCQUN6QixLQUFLLENBQUNRO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVlpRCxpQkFBaUI7d0JBQzVEaEQsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDLElBQUksQ0FBQ0csS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsTUFBTThDLGlDQUFrQyxtQ0FBbUMsR0FBRyxTQUFTeEMsQ0FBVztvQkFDOUZDLFlBQVlDLFNBQVMsRUFBRVIsS0FBSyxDQUFDO3dCQUN6QixLQUFLLENBQUNRO3dCQUNOWCxpQkFBaUIsSUFBSSxFQUFFLFFBQVFELFlBQVltRCxpQkFBaUI7d0JBQzVEbEQsaUJBQWlCLElBQUksRUFBRSxTQUFTLEtBQUs7d0JBQ3JDLElBQUksQ0FBQ0csS0FBSyxHQUFHQTtvQkFDakI7Z0JBQ0o7Z0JBQ0EsSUFBSUo7Z0JBQ0gsVUFBU0EsV0FBVztvQkFDakJBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUc7b0JBQ3ZDQSxXQUFXLENBQUNBLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHO29CQUN6Q0EsV0FBVyxDQUFDQSxXQUFXLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRztvQkFDM0NBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLG9CQUFvQixHQUFHLEVBQUUsR0FBRztvQkFDcERBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUc7b0JBQ3pDQSxXQUFXLENBQUNBLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHO29CQUN4Q0EsV0FBVyxDQUFDQSxXQUFXLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRztvQkFDM0NBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLGFBQWEsR0FBRyxFQUFFLEdBQUc7b0JBQzdDQSxXQUFXLENBQUNBLFdBQVcsQ0FBQyxhQUFhLEdBQUcsRUFBRSxHQUFHO29CQUM3Q0EsV0FBVyxDQUFDQSxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxHQUFHO29CQUNoREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHO29CQUNqREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHO29CQUNqREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHO29CQUNyREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHO29CQUNqREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHO29CQUNyREEsV0FBVyxDQUFDQSxXQUFXLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRztvQkFDM0NBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLHFCQUFxQixHQUFHLEdBQUcsR0FBRztvQkFDdERBLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsR0FBRztnQkFDekQsR0FBR0EsZUFBZ0JBLENBQUFBLGNBQWMsQ0FBQztZQUdsQyxHQUFHLEdBQUc7WUFFTixHQUFHLEdBQUcsTUFDTixHQUFHLEdBQUksQ0FBQ0wseUJBQXlCQywwQkFBbUJBLEVBQUVDLGdDQUFtQkE7Z0JBRXpFLGtCQUFrQixHQUFHQSxnQ0FBbUJBLENBQUNDLENBQUMsQ0FBQ0YsMEJBQW1CQSxFQUFFO29CQUNoRSxrQkFBa0IsR0FBS3dELElBQUksSUFBTyxXQUFXLEdBQUdDO29CQUNoRCxrQkFBa0IsR0FBS0MsSUFBSSxJQUFPLFdBQVcsR0FBR0M7Z0JBQzNCO2dCQUNyQixvRUFBb0UsR0FDcEUsU0FBU0EsYUFBYUMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLG1CQUFtQixLQUFLO29CQUN0RCxJQUFJLENBQUNGLE1BQU0sT0FBT0M7b0JBQ2xCLElBQUksQ0FBQ0EsTUFBTSxPQUFPRDtvQkFDbEIsSUFBSUUsa0JBQWtCO3dCQUNsQkYsT0FBT0csdUJBQXVCSDt3QkFDOUJDLE9BQU9FLHVCQUF1QkY7b0JBQ2xDO29CQUNBLE1BQU1HLGdCQUFnQjt3QkFDbEIsR0FBR0gsSUFBSTt3QkFDUCxHQUFHRCxJQUFJO29CQUNYLEdBQUcsa0VBQWtFO29CQUNyRSxLQUFLLE1BQU1yRCxPQUFPRSxPQUFPd0QsSUFBSSxDQUFDRCxlQUFlO3dCQUN6QyxJQUFJSixJQUFJLENBQUNyRCxJQUFJLElBQUlzRCxJQUFJLENBQUN0RCxJQUFJLEVBQUU7NEJBQ3hCLElBQUkyRCxNQUFNQyxPQUFPLENBQUNQLElBQUksQ0FBQ3JELElBQUksR0FBRztnQ0FDMUJ5RCxhQUFhLENBQUN6RCxJQUFJLEdBQUdxRCxJQUFJLENBQUNyRCxJQUFJLENBQUM2RCxNQUFNLENBQUNQLElBQUksQ0FBQ3RELElBQUk7NEJBQ25ELE9BQU8sSUFBSTJELE1BQU1DLE9BQU8sQ0FBQ04sSUFBSSxDQUFDdEQsSUFBSSxHQUFHO2dDQUNqQ3lELGFBQWEsQ0FBQ3pELElBQUksR0FBR3NELElBQUksQ0FBQ3RELElBQUksQ0FBQzZELE1BQU0sQ0FBQ1IsSUFBSSxDQUFDckQsSUFBSTs0QkFDbkQsT0FBTyxJQUFJLE9BQU9xRCxJQUFJLENBQUNyRCxJQUFJLEtBQUssWUFBWSxPQUFPc0QsSUFBSSxDQUFDdEQsSUFBSSxLQUFLLFVBQVU7Z0NBQ3ZFeUQsYUFBYSxDQUFDekQsSUFBSSxHQUFHb0QsYUFBYUMsSUFBSSxDQUFDckQsSUFBSSxFQUFFc0QsSUFBSSxDQUFDdEQsSUFBSTs0QkFDMUQ7d0JBQ0o7b0JBQ0o7b0JBQ0EsT0FBT3lEO2dCQUNYO2dCQUNBLFNBQVNELHVCQUF1QnpELEdBQUc7b0JBQy9CLE1BQU0rRCxrQkFBa0I1RCxPQUFPNkQsT0FBTyxDQUFDaEUsS0FBS2lFLE1BQU0sQ0FBQyxDQUFDLENBQUNDLEdBQUdoRSxNQUFNLEdBQUdBLFVBQVVpRTtvQkFDM0UsT0FBT2hFLE9BQU9pRSxXQUFXLENBQUNMO2dCQUM5QjtnQkFDQSxTQUFTWixTQUFTakQsS0FBSztvQkFDbkIsT0FBT0EsVUFBVSxRQUFRQSxVQUFVaUU7Z0JBQ3ZDO2dCQUNBLHdDQUF3QztnQkFDeEMsU0FBU0UsWUFBWUMsTUFBTTtvQkFDdkIsSUFBSUMsT0FBT0Q7b0JBQ1hDLE9BQU9BLEtBQUtDLElBQUksQ0FBQyxTQUFTbEYsQ0FBQyxFQUFFbUYsQ0FBQzt3QkFDMUIsT0FBT0MsY0FBY3BGLEVBQUVxRixLQUFLLEVBQUVGLEVBQUVFLEtBQUs7b0JBQ3pDO29CQUNBLElBQUlDLE9BQU9MLElBQUksQ0FBQyxFQUFFLEVBQUVNO29CQUNwQixJQUFJLElBQUl0RixJQUFJLEdBQUdBLElBQUlnRixLQUFLTyxNQUFNLEVBQUV2RixJQUFJO3dCQUNoQ3NGLFFBQVFEO3dCQUNSQSxPQUFPTCxJQUFJLENBQUNoRixFQUFFO3dCQUNkLElBQUl3RixNQUFNTCxjQUFjRyxNQUFNRyxHQUFHLEVBQUVKLEtBQUtELEtBQUs7d0JBQzdDLElBQUlJLE1BQU0sR0FBRzt3QkFDYixJQUFJQSxPQUFPLEtBQUssQ0FBQ0YsTUFBTUksT0FBTyxNQUFNLENBQUNMLEtBQUtLLE9BQU8sSUFBSTt3QkFDckQsSUFBSVAsY0FBY0csTUFBTUcsR0FBRyxFQUFFSixLQUFLSSxHQUFHLElBQUksR0FBRzs0QkFDeENILE1BQU1HLEdBQUcsQ0FBQ0UsR0FBRyxHQUFHTixLQUFLSSxHQUFHLENBQUNFLEdBQUc7NEJBQzVCTCxNQUFNRyxHQUFHLENBQUNHLE1BQU0sR0FBR1AsS0FBS0ksR0FBRyxDQUFDRyxNQUFNO3dCQUN0Qzt3QkFDQVosS0FBS2EsTUFBTSxDQUFDN0YsR0FBRzt3QkFDZnFGLE9BQU9DO3dCQUNQdEY7b0JBQ0o7b0JBQ0EsT0FBT2dGO2dCQUNYO2dCQUNBLFNBQVNHLGNBQWNXLEVBQUUsRUFBRUMsRUFBRTtvQkFDekIsT0FBT0QsR0FBR0gsR0FBRyxHQUFHSSxHQUFHSixHQUFHLElBQUlHLEdBQUdGLE1BQU0sR0FBR0csR0FBR0gsTUFBTTtnQkFDbkQ7Z0JBQ0EsU0FBU0ksNkJBQTZCckYsS0FBSyxFQUFFc0YsV0FBVztvQkFDcEQsSUFBSSxDQUFDQSxhQUFhO3dCQUNkLE9BQU87b0JBQ1g7b0JBQ0EsSUFBSSxJQUFJakcsSUFBSSxHQUFHQSxJQUFJaUcsWUFBWVYsTUFBTSxFQUFFdkYsSUFBSTt3QkFDdkMsSUFBSWlHLFdBQVcsQ0FBQ2pHLEVBQUUsQ0FBQ2tHLElBQUksQ0FBQ3ZGLFFBQVE7NEJBQzVCLE9BQU87d0JBQ1g7b0JBQ0o7b0JBQ0EsT0FBTztnQkFDWDtZQUdBLEdBQUcsR0FBRztRQUVJO1FBQ1Ysd0VBQXdFLEdBQ3hFLE1BQU0sR0FBSSxtQkFBbUI7UUFDN0IsTUFBTSxHQUFJLElBQUl3RiwyQkFBMkIsQ0FBQztRQUMxQyxNQUFNLEdBQ04sTUFBTSxHQUFJLHVCQUF1QjtRQUNqQyxNQUFNLEdBQUksU0FBUy9GLGdDQUFtQkEsQ0FBQ2dHLFFBQVE7WUFDL0MsTUFBTSxHQUFLLDhCQUE4QjtZQUN6QyxNQUFNLEdBQUssSUFBSUMsZUFBZUYsd0JBQXdCLENBQUNDLFNBQVM7WUFDaEUsTUFBTSxHQUFLLElBQUlDLGlCQUFpQnpCLFdBQVc7Z0JBQzNDLE1BQU0sR0FBTSxPQUFPeUIsYUFBYTFHLE9BQU87WUFDdkMsTUFBTSxHQUFLO1lBQ1gsTUFBTSxHQUFLLGtEQUFrRDtZQUM3RCxNQUFNLEdBQUssSUFBSUMsVUFBU3VHLHdCQUF3QixDQUFDQyxTQUFTLEdBQUc7Z0JBQzdELE1BQU0sR0FBTSxzQkFBc0I7Z0JBQ2xDLE1BQU0sR0FBTSwwQkFBMEI7Z0JBQ3RDLE1BQU0sR0FBTXpHLFNBQVMsQ0FBQztZQUNYO1lBQ1gsTUFBTSxHQUNOLE1BQU0sR0FBSyw4QkFBOEI7WUFDekMsTUFBTSxHQUFLTSxtQkFBbUIsQ0FBQ21HLFNBQVMsQ0FBQ3hHLFNBQVFBLFFBQU9ELE9BQU8sRUFBRVMsZ0NBQW1CQTtZQUNwRixNQUFNLEdBQ04sTUFBTSxHQUFLLG1DQUFtQztZQUM5QyxNQUFNLEdBQUssT0FBT1IsUUFBT0QsT0FBTztRQUNoQyxNQUFNLEdBQUk7UUFDVixNQUFNLEdBQ04sd0VBQXdFLEdBQ3hFLE1BQU0sR0FBSSwyQ0FBMkMsR0FDckQsTUFBTSxHQUFLO1lBQ1gsTUFBTSxHQUFLLDhDQUE4QztZQUN6RCxNQUFNLEdBQUtTLGdDQUFtQkEsQ0FBQ0MsQ0FBQyxHQUFHLENBQUNWLFVBQVMyRztnQkFDN0MsTUFBTSxHQUFNLElBQUksSUFBSTVGLE9BQU80RixXQUFZO29CQUN2QyxNQUFNLEdBQU8sSUFBR2xHLGdDQUFtQkEsQ0FBQ21HLENBQUMsQ0FBQ0QsWUFBWTVGLFFBQVEsQ0FBQ04sZ0NBQW1CQSxDQUFDbUcsQ0FBQyxDQUFDNUcsVUFBU2UsTUFBTTt3QkFDaEcsTUFBTSxHQUFRRSxPQUFPQyxjQUFjLENBQUNsQixVQUFTZSxLQUFLOzRCQUFFSSxZQUFZOzRCQUFNMEYsS0FBS0YsVUFBVSxDQUFDNUYsSUFBSTt3QkFBQztvQkFDM0YsTUFBTSxHQUFPO2dCQUNiLE1BQU0sR0FBTTtZQUNaLE1BQU0sR0FBSztRQUNYLE1BQU0sR0FBSTtRQUNWLE1BQU0sR0FDTixNQUFNLEdBQUksNENBQTRDLEdBQ3RELE1BQU0sR0FBSztZQUNYLE1BQU0sR0FBS04sZ0NBQW1CQSxDQUFDbUcsQ0FBQyxHQUFHLENBQUM5RixLQUFLZ0csT0FBVTdGLE9BQU84RixTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDbkcsS0FBS2dHO1FBQzdGLE1BQU0sR0FBSTtRQUNWLE1BQU0sR0FDTixNQUFNLEdBQUkseUNBQXlDLEdBQ25ELE1BQU0sR0FBSztZQUNYLE1BQU0sR0FBSywrQkFBK0I7WUFDMUMsTUFBTSxHQUFLckcsZ0NBQW1CQSxDQUFDeUcsQ0FBQyxHQUFHLENBQUNsSDtnQkFDcEMsTUFBTSxHQUFNLElBQUcsT0FBT21ILFdBQVcsZUFBZUEsT0FBT0MsV0FBVyxFQUFFO29CQUNwRSxNQUFNLEdBQU9uRyxPQUFPQyxjQUFjLENBQUNsQixVQUFTbUgsT0FBT0MsV0FBVyxFQUFFO3dCQUFFcEcsT0FBTztvQkFBUztnQkFDbEYsTUFBTSxHQUFNO2dCQUNaLE1BQU0sR0FBTUMsT0FBT0MsY0FBYyxDQUFDbEIsVUFBUyxjQUFjO29CQUFFZ0IsT0FBTztnQkFBSztZQUN2RSxNQUFNLEdBQUs7UUFDWCxNQUFNLEdBQUk7UUFDVixNQUFNLEdBQ04sd0VBQXdFLEdBQ3hFLElBQUlSLDBCQUFtQkEsR0FBRyxDQUFDO1FBQzNCLDhHQUE4RztRQUM3RztZQUNEQyxnQ0FBbUJBLENBQUN5RyxDQUFDLENBQUMxRywwQkFBbUJBO1lBQ3pDLGtCQUFrQixHQUFHQyxnQ0FBbUJBLENBQUNDLENBQUMsQ0FBQ0YsMEJBQW1CQSxFQUFFO2dCQUNoRSxrQkFBa0IsR0FBSzZHLGdCQUFnQixJQUFPLFdBQVcsR0FBR0E7WUFDdkM7WUFDckIsa0JBQWtCLEdBQUcsSUFBSUMsc0NBQXNDN0csZ0NBQW1CQSxDQUFDO1lBQ25GLGtCQUFrQixHQUFHLElBQUk4Ryw4Q0FBOEM5RyxnQ0FBbUJBLENBQUM7WUFDM0YsU0FBU0ksaUJBQWlCQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsS0FBSztnQkFDckMsSUFBSUQsT0FBT0QsS0FBSztvQkFDWkcsT0FBT0MsY0FBYyxDQUFDSixLQUFLQyxLQUFLO3dCQUM1QkMsT0FBT0E7d0JBQ1BHLFlBQVk7d0JBQ1pDLGNBQWM7d0JBQ2RDLFVBQVU7b0JBQ2Q7Z0JBQ0osT0FBTztvQkFDSFAsR0FBRyxDQUFDQyxJQUFJLEdBQUdDO2dCQUNmO2dCQUNBLE9BQU9GO1lBQ1g7WUFHQSxNQUFNdUc7Z0JBQ0YsTUFBTUcscUNBQXFDQyxrQkFBa0IsRUFBRUMsT0FBTyxFQUFFQyxRQUFRLEVBQUU7b0JBQzlFLElBQUlDLFdBQVcsTUFBTUQsU0FBU0Ysb0JBQW9CQyxRQUFRMUcsS0FBSyxFQUFFMEcsUUFBUS9GLElBQUksRUFBRStGLFFBQVE5RixPQUFPO29CQUM5RixJQUFJZ0csVUFBVTt3QkFDVixPQUFPM0csT0FBT3dELElBQUksQ0FBQ21ELFVBQVVDLE1BQU0sQ0FBQyxDQUFDQyxLQUFLL0c7NEJBQ3RDLElBQUlnSCwrQkFBK0JDOzRCQUNuQ0YsR0FBRyxDQUFDL0csSUFBSSxHQUFHLENBQUMsQ0FBQ2lILGdCQUFnQkosUUFBUSxDQUFDN0csSUFBSSxNQUFNLFFBQVFpSCxrQkFBa0IsS0FBSyxJQUFJLEtBQUssSUFBSSxDQUFDRCxnQ0FBZ0NDLGNBQWNDLGVBQWUsTUFBTSxRQUFRRixrQ0FBa0MsS0FBSyxJQUFJLEtBQUssSUFBSUEsOEJBQThCRyxtQkFBbUIsS0FBSzs0QkFDbFIsT0FBT0o7d0JBQ1gsR0FBRyxDQUFDO29CQUNSO2dCQUNKO2dCQUNBLE1BQU1LLDBCQUEwQkMsZ0JBQWdCLEVBQUVDLE9BQU8sRUFBRUMsVUFBVSxFQUFFYixrQkFBa0IsRUFBRXpHLEtBQUssRUFBRTtvQkFDOUYsT0FBTyxDQUFDLE1BQU11SCxRQUFRQyxHQUFHLENBQUMsSUFBSSxDQUFDQyxlQUFlLENBQUNMLGtCQUFrQkMsU0FBU0ssR0FBRyxDQUFDLE9BQU9DO3dCQUNqRixPQUFPQSxPQUFPLENBQUNMLFdBQVcsQ0FBQ2Isb0JBQW9Cekc7b0JBQ25ELEdBQUUsRUFBRytELE1BQU0sQ0FBQ3VDLG9DQUFtQyxhQUFhLElBQUl0RCxFQUFFO2dCQUN0RTtnQkFDQTRFLHVCQUF1QlIsZ0JBQWdCLEVBQUVTLFNBQVMsRUFBRWpILE9BQU8sRUFBRTtvQkFDekR3RyxpQkFBaUJVLE9BQU8sQ0FBQyxDQUFDSDt3QkFDdEJBLFFBQVFJLFVBQVUsQ0FBQ0YsV0FBV2pIO29CQUNsQztnQkFDSjtnQkFDQSxNQUFNb0gsYUFBYTtvQkFDZixJQUFJcEIsV0FBVyxJQUFJLENBQUNxQixTQUFTO29CQUM3QixJQUFJLElBQUkzRixlQUFlc0UsU0FBUzt3QkFDNUIsSUFBSXNCLHVDQUF1Q0M7d0JBQzNDLE1BQU8sRUFBQ0Esd0JBQXdCdkIsUUFBUSxDQUFDdEUsWUFBWSxNQUFNLFFBQVE2RiwwQkFBMEIsS0FBSyxJQUFJLEtBQUssSUFBSSxDQUFDRCx3Q0FBd0NDLHNCQUFzQmxCLGVBQWUsTUFBTSxRQUFRaUIsMENBQTBDLEtBQUssSUFBSSxLQUFLLElBQUlBLHNDQUFzQzlGLE9BQU8sRUFBQztvQkFDelQ7Z0JBQ0o7Z0JBQ0EsYUFBYWdHLHFCQUFxQlQsT0FBTyxFQUFFVSxHQUFHLEVBQUU7b0JBQzVDLElBQUlwSjtvQkFDSixJQUFJLFVBQVUwSSxTQUFTO3dCQUNuQixJQUFJOzRCQUNBOzRCQUNBO3lCQUNILENBQUNXLFFBQVEsQ0FBQ1gsUUFBUVksSUFBSSxHQUFHOzRCQUN0QnRKLFVBQVMsTUFBTTBJLFFBQVExSSxNQUFNOzRCQUM3QjBJLFFBQVFWLGVBQWUsR0FBRyxJQUFJaEksT0FBTSxDQUFDLGlCQUFpQixDQUFDMEksU0FBU1U7d0JBQ3BFLE9BQU8sTUFBTTtvQkFDakIsT0FBTzt3QkFDSHBKLFVBQVMsTUFBTTBJLFFBQVExSSxNQUFNO3dCQUM3QjBJLFFBQVFWLGVBQWUsR0FBRyxJQUFJaEksT0FBTSxDQUFDMEksUUFBUWEsU0FBUyxDQUFDLENBQUNiLFFBQVFjLEtBQUs7b0JBQ3pFO29CQUNBLElBQUlkLFFBQVEvRyxPQUFPLElBQUkrRyxRQUFRZSxxQkFBcUIsRUFBRTt3QkFDbEQsSUFBSUMsa0JBQWtCQzt3QkFDdEJqQixRQUFRVixlQUFlLENBQUM0QixnQkFBZ0IsQ0FBQyxDQUFDRCxPQUFPLENBQUNELG1CQUFtQmhCLFFBQVEvRyxPQUFPLE1BQU0sUUFBUStILHFCQUFxQixLQUFLLElBQUlBLG1CQUFtQmhCLFFBQVFlLHFCQUFxQixNQUFNLFFBQVFFLFNBQVMsS0FBSyxJQUFJQSxPQUFPLENBQUM7b0JBQzVOO29CQUNBakIsUUFBUVYsZUFBZSxDQUFDNkIsV0FBVyxHQUFHbkI7b0JBQ3RDLE9BQU9BLFFBQVFWLGVBQWU7Z0JBQ2xDO2dCQUNBLE1BQU04Qiw0QkFBNEJwSSxJQUFJLEVBQUU7b0JBQ3BDLElBQUlpRyxXQUFXLElBQUksQ0FBQ29DLGtCQUFrQixDQUFDckk7b0JBQ3ZDLElBQUlWLE9BQU93RCxJQUFJLENBQUNtRCxVQUFVaEMsTUFBTSxLQUFLLEdBQUc7d0JBQ3BDLE9BQU8sRUFBRTtvQkFDYjtvQkFDQSxJQUFJLElBQUl0QyxlQUFlc0UsU0FBUzt3QkFDNUIsTUFBTSxJQUFJLENBQUNxQyxpQkFBaUIsQ0FBQzNHO29CQUNqQztvQkFDQSxPQUFPc0U7Z0JBQ1g7Z0JBQ0EsTUFBTXFDLGtCQUFrQjNHLFdBQVcsRUFBRTtvQkFDakMsSUFBSXFGLFVBQVUsSUFBSSxDQUFDTSxTQUFTLENBQUMzRixZQUFZO29CQUN6QyxJQUFJLENBQUNxRixRQUFRVixlQUFlLEVBQUU7d0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUNpQyxtQkFBbUIsQ0FBQ3ZCLFFBQVF3QixFQUFFLENBQUMsRUFBRTs0QkFDdkMsSUFBSSxDQUFDRCxtQkFBbUIsQ0FBQ3ZCLFFBQVF3QixFQUFFLENBQUMsR0FBRzlDLGVBQWUrQixvQkFBb0IsQ0FBQ1QsU0FBUyxJQUFJLENBQUNVLEdBQUcsRUFBRWUsSUFBSSxDQUFDLENBQUNDO2dDQUNoRzFCLFFBQVFWLGVBQWUsR0FBR29DO2dDQUMxQjFCLFFBQVFWLGVBQWUsQ0FBQzNFLFdBQVcsR0FBR0E7Z0NBQ3RDLE9BQU8sSUFBSSxDQUFDNEcsbUJBQW1CLENBQUN2QixRQUFRd0IsRUFBRSxDQUFDLEVBQUUsV0FBVztnQ0FDeEQsT0FBT0U7NEJBQ1g7d0JBQ0o7d0JBQ0EsT0FBTyxJQUFJLENBQUNILG1CQUFtQixDQUFDdkIsUUFBUXdCLEVBQUUsQ0FBQztvQkFDL0MsT0FBTzt3QkFDSCxJQUFJLENBQUN4QixRQUFRVixlQUFlLENBQUMzRSxXQUFXLEVBQUU7NEJBQ3RDcUYsUUFBUVYsZUFBZSxDQUFDM0UsV0FBVyxHQUFHQTt3QkFDMUM7d0JBQ0EsT0FBT3FGLFFBQVFWLGVBQWU7b0JBQ2xDO2dCQUNKO2dCQUNBNEIsaUJBQWlCdkcsV0FBVyxFQUFFMUIsT0FBTyxFQUFFbUIsUUFBUSxLQUFLLEVBQUU7b0JBQ2xELElBQUk0RixVQUFVLElBQUksQ0FBQ00sU0FBUyxDQUFDM0YsWUFBWTtvQkFDekMsSUFBSSxDQUFDcUYsU0FBUztvQkFDZEEsUUFBUS9HLE9BQU8sR0FBR21CLFFBQVEsQ0FBQyxHQUFFdUUsb0NBQW1DLGlCQUFpQixJQUFJcEQsRUFBRSxFQUFFdEMsU0FBUytHLFFBQVEvRyxPQUFPLElBQUlBO29CQUNySCxJQUFJK0csUUFBUVYsZUFBZSxFQUFFO3dCQUN6QlUsUUFBUVYsZUFBZSxDQUFDNEIsZ0JBQWdCLENBQUNsQixRQUFRL0csT0FBTztvQkFDNUQ7Z0JBQ0o7Z0JBQ0EsTUFBTTBJLFlBQVk3QyxrQkFBa0IsRUFBRThDLGFBQWEsRUFBRTVJLElBQUksRUFBRUMsT0FBTyxFQUFFO29CQUNoRSxJQUFJLENBQUNELFFBQVEsQ0FBQyxlQUFlNEUsSUFBSSxDQUFDNUUsT0FBTztvQkFDekNBLE9BQU9BLEtBQUs2SSxPQUFPLENBQUMsYUFBYTtvQkFDakMsSUFBSTVDLFdBQVcsTUFBTSxJQUFJLENBQUNtQywyQkFBMkIsQ0FBQ3BJO29CQUN0RCxJQUFJVixPQUFPd0QsSUFBSSxDQUFDbUQsVUFBVWhDLE1BQU0sS0FBSyxHQUFHO29CQUN4QyxJQUFJNkUsZUFBZTt3QkFDZkMsS0FBS2pELG1CQUFtQmlELEdBQUc7d0JBQzNCaEosU0FBUytGLG1CQUFtQi9GLE9BQU87d0JBQ25DaUosWUFBWWhKO3dCQUNaaUosTUFBTUw7b0JBQ1Y7b0JBQ0F0SixPQUFPNEosTUFBTSxDQUFDakQsVUFBVWtCLE9BQU8sQ0FBQyxDQUFDZ0MsS0FBS0EsR0FBRzdDLGVBQWUsQ0FBQ3FDLFdBQVcsQ0FBQ0c7b0JBQ3JFLElBQUksQ0FBQ00sZ0JBQWdCLENBQUN0RCxtQkFBbUJpRCxHQUFHLENBQUMsR0FBRy9JO29CQUNoRCxPQUFPaUc7Z0JBQ1g7Z0JBQ0EsTUFBTW9ELG1CQUFtQnZELGtCQUFrQixFQUFFekcsS0FBSyxFQUFFVyxJQUFJLEVBQUVDLE9BQU8sRUFBRTtvQkFDL0QsSUFBSSxDQUFDcUosY0FBYyxDQUFDeEQ7b0JBQ3BCLE9BQU8sTUFBTSxJQUFJLENBQUM2QyxXQUFXLENBQUM3QyxvQkFBb0J6RyxPQUFPVyxNQUFNQztnQkFDbkU7Z0JBQ0FxSixlQUFlQyxRQUFRLEVBQUU7b0JBQ3JCLElBQUl0RCxXQUFXLElBQUksQ0FBQ3VELG9CQUFvQixDQUFDRCxTQUFTUixHQUFHO29CQUNyRCxJQUFJOUMsU0FBU2hDLE1BQU0sR0FBRyxHQUFHO3dCQUNyQmdDLFNBQVNrQixPQUFPLENBQUMsQ0FBQ2dDLEtBQUtBLEdBQUdHLGNBQWMsQ0FBQ0M7d0JBQ3pDLE9BQU8sSUFBSSxDQUFDSCxnQkFBZ0IsQ0FBQ0csU0FBU1IsR0FBRyxDQUFDO29CQUM5QztnQkFDSjtnQkFDQVMscUJBQXFCdEMsU0FBUyxFQUFFO29CQUM1QixJQUFJbEgsT0FBTyxJQUFJLENBQUNvSixnQkFBZ0IsQ0FBQ2xDLFVBQVU7b0JBQzNDLElBQUksQ0FBQ2xILE1BQU0sT0FBTyxFQUFFLEVBQUUsT0FBTztvQkFDN0IsSUFBSWlHLFdBQVcsSUFBSSxDQUFDb0Msa0JBQWtCLENBQUNySTtvQkFDdkMsT0FBT1YsT0FBTzRKLE1BQU0sQ0FBQ2pELFVBQVVjLEdBQUcsQ0FBQyxDQUFDb0MsS0FBS0EsR0FBRzdDLGVBQWUsRUFBRWxELE1BQU0sQ0FBQ3VDLG9DQUFtQyxhQUFhLElBQUl0RCxFQUFFO2dCQUM5SDtnQkFDQXlFLGdCQUFnQkwsZ0JBQWdCLEVBQUVDLE9BQU8sRUFBRTtvQkFDdkMsT0FBT0QsaUJBQWlCckQsTUFBTSxDQUFDLENBQUMrRjt3QkFDNUIsSUFBSSxDQUFDQSxHQUFHaEIsV0FBVyxDQUFDc0IsUUFBUSxDQUFDL0MsUUFBUSxFQUFFOzRCQUNuQyxPQUFPO3dCQUNYO3dCQUNBLE1BQU1nRCxlQUFlUCxHQUFHNUMsbUJBQW1CO3dCQUMzQyxPQUFPRzs0QkFDSCxLQUFLO2dDQUNELE9BQU9nRCxhQUFhQyxhQUFhLElBQUk7NEJBQ3pDLEtBQUs7Z0NBQ0QsT0FBT0QsYUFBYUUsa0JBQWtCLElBQUl0Rzs0QkFDOUMsS0FBSztnQ0FDRCxJQUFJdUc7Z0NBQ0osT0FBTyxDQUFDLENBQUNBLG1DQUFtQ0gsYUFBYUUsa0JBQWtCLE1BQU0sUUFBUUMscUNBQXFDLEtBQUssSUFBSSxLQUFLLElBQUlBLGlDQUFpQ0MsZUFBZSxNQUFNOzRCQUMxTSxLQUFLO2dDQUNELE9BQU9KLGFBQWFLLCtCQUErQixJQUFJLFFBQVFMLGFBQWFNLDBCQUEwQixJQUFJOzRCQUM5RyxLQUFLO2dDQUNELE9BQU9OLGFBQWFPLGtCQUFrQixJQUFJM0c7NEJBQzlDLEtBQUs7Z0NBQ0QsT0FBT29HLGFBQWFRLHFCQUFxQixJQUFJNUc7NEJBQ2pELEtBQUs7Z0NBQ0QsT0FBT29HLGFBQWFTLHlCQUF5QixJQUFJOzRCQUNyRCxLQUFLO2dDQUNELE9BQU9ULGFBQWFVLHNCQUFzQixJQUFJOUc7d0JBQ3REO29CQUNKO2dCQUNKO2dCQUNBK0UsbUJBQW1CckksSUFBSSxFQUFFO29CQUNyQixJQUFJcUssbUJBQW1CLENBQUM7b0JBQ3hCL0ssT0FBTzZELE9BQU8sQ0FBQyxJQUFJLENBQUNtRSxTQUFTLEVBQUVILE9BQU8sQ0FBQyxDQUFDLENBQUMvSCxLQUFLQyxNQUFNO3dCQUNoRCxJQUFJaUwsYUFBYWpMLE1BQU15SSxLQUFLLENBQUN5QyxLQUFLLENBQUM7d0JBQ25DLElBQUlELFdBQVczQyxRQUFRLENBQUMzSCxPQUFPcUssZ0JBQWdCLENBQUNqTCxJQUFJLEdBQUcsSUFBSSxDQUFDa0ksU0FBUyxDQUFDbEksSUFBSTtvQkFDOUU7b0JBQ0EsT0FBT2lMO2dCQUNYO2dCQUNBRyxnQkFBZ0JDLElBQUksRUFBRXpELE9BQU8sRUFBRTtvQkFDM0JBLFFBQVF3QixFQUFFLEdBQUdpQztvQkFDYnpELFFBQVF5QyxRQUFRLEdBQUcsSUFBSSxDQUFDaUIsdUJBQXVCLENBQUMxRCxRQUFReUMsUUFBUTtvQkFDaEUsSUFBSSxDQUFDbkMsU0FBUyxDQUFDbUQsS0FBSyxHQUFHekQ7Z0JBQzNCO2dCQUNBMkQsZUFBZUYsSUFBSSxFQUFFRyxZQUFZLEVBQUU7b0JBQy9CQSxhQUFhcEMsRUFBRSxHQUFHaUM7b0JBQ2xCRyxhQUFhL0MsU0FBUyxHQUFHO29CQUN6QitDLGFBQWFuQixRQUFRLEdBQUcsSUFBSSxDQUFDaUIsdUJBQXVCLENBQUNFLGFBQWFuQixRQUFRO29CQUMxRSxJQUFJLENBQUNuQyxTQUFTLENBQUNtRCxLQUFLLEdBQUdHO2dCQUMzQjtnQkFDQTlJLGtCQUFrQjJJLElBQUksRUFBRWhCLFFBQVEsRUFBRTtvQkFDOUJBLFdBQVcsSUFBSSxDQUFDaUIsdUJBQXVCLENBQUNqQjtvQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQ25DLFNBQVMsQ0FBQ21ELEtBQUssRUFBRTtvQkFDM0IsSUFBSSxDQUFDbkQsU0FBUyxDQUFDbUQsS0FBSyxDQUFDaEIsUUFBUSxHQUFHQTtnQkFDcEM7Z0JBQ0FpQix3QkFBd0JHLGVBQWUsRUFBRTtvQkFDckMsSUFBSUMsV0FBV0MsWUFBWUMsWUFBWUMsWUFBWUMsWUFBWUMsWUFBWUMsWUFBWUM7b0JBQ3ZGLElBQUk1QixXQUFXb0Isb0JBQW9CLFFBQVFBLG9CQUFvQixLQUFLLElBQUlBLGtCQUFrQixDQUFDO29CQUMzRixJQUFJUztvQkFDSEEsQ0FBQUEsU0FBUyxDQUFDUixZQUFZckIsUUFBTyxFQUFHL0ksS0FBSyxNQUFNLFFBQVE0SyxXQUFXLEtBQUssSUFBSUEsU0FBU1IsVUFBVXBLLEtBQUssR0FBRztvQkFDbkcsSUFBSTZLO29CQUNIQSxDQUFBQSxjQUFjLENBQUNSLGFBQWF0QixRQUFPLEVBQUcrQixVQUFVLE1BQU0sUUFBUUQsZ0JBQWdCLEtBQUssSUFBSUEsY0FBY1IsV0FBV1MsVUFBVSxHQUFHO29CQUM5SCxJQUFJQztvQkFDSEEsQ0FBQUEscUJBQXFCLENBQUNULGFBQWF2QixRQUFPLEVBQUdpQyxpQkFBaUIsTUFBTSxRQUFRRCx1QkFBdUIsS0FBSyxJQUFJQSxxQkFBcUJULFdBQVdVLGlCQUFpQixHQUFHO29CQUNqSyxJQUFJQztvQkFDSEEsQ0FBQUEsVUFBVSxDQUFDVixhQUFheEIsUUFBTyxFQUFHckosTUFBTSxNQUFNLFFBQVF1TCxZQUFZLEtBQUssSUFBSUEsVUFBVVYsV0FBVzdLLE1BQU0sR0FBRztvQkFDMUcsSUFBSXdMO29CQUNIQSxDQUFBQSxlQUFlLENBQUNWLGFBQWF6QixRQUFPLEVBQUdvQyxXQUFXLE1BQU0sUUFBUUQsaUJBQWlCLEtBQUssSUFBSUEsZUFBZVYsV0FBV1csV0FBVyxHQUFHO29CQUNuSSxJQUFJQztvQkFDSEEsQ0FBQUEsaUJBQWlCLENBQUNYLGFBQWExQixRQUFPLEVBQUd6SCxhQUFhLE1BQU0sUUFBUThKLG1CQUFtQixLQUFLLElBQUlBLGlCQUFpQlgsV0FBV25KLGFBQWEsR0FBRztvQkFDN0ksSUFBSStKO29CQUNIQSxDQUFBQSxxQkFBcUIsQ0FBQ1gsYUFBYTNCLFFBQU8sRUFBR3ZILGlCQUFpQixNQUFNLFFBQVE2Six1QkFBdUIsS0FBSyxJQUFJQSxxQkFBcUJYLFdBQVdsSixpQkFBaUIsR0FBRztvQkFDakssSUFBSThKO29CQUNIQSxDQUFBQSxrQkFBa0IsQ0FBQ1gsYUFBYTVCLFFBQU8sRUFBR3dDLGNBQWMsTUFBTSxRQUFRRCxvQkFBb0IsS0FBSyxJQUFJQSxrQkFBa0JYLFdBQVdZLGNBQWMsR0FBRztvQkFDbEosT0FBT3hDO2dCQUNYO2dCQUNBN0osWUFBWThILEdBQUcsQ0FBQztvQkFDWnhJLGlCQUFpQixJQUFJLEVBQUUsYUFBYSxDQUFDO29CQUNyQ0EsaUJBQWlCLElBQUksRUFBRSx1QkFBdUIsQ0FBQztvQkFDL0NBLGlCQUFpQixJQUFJLEVBQUUsb0JBQW9CLENBQUM7b0JBQzVDQSxpQkFBaUIsSUFBSSxFQUFFLE9BQU8sS0FBSztvQkFDbkMsSUFBSSxDQUFDd0ksR0FBRyxHQUFHQTtvQkFDWCxJQUFJd0UsZUFBZSxPQUFPM0MsVUFBVTRDO3dCQUNoQ0Esc0JBQXNCLFFBQVFBLHNCQUFzQixLQUFLLElBQUlBLG9CQUFvQkEsb0JBQW9CLElBQUksQ0FBQzNDLG9CQUFvQixDQUFDRCxTQUFTUixHQUFHO3dCQUMzSSxJQUFJb0Qsa0JBQWtCbEksTUFBTSxLQUFLLEdBQUc7NEJBQ2hDO3dCQUNKO3dCQUNBLDhDQUE4Qzt3QkFDOUMsSUFBSW1JLGdCQUFnQjlNLE9BQU93RCxJQUFJLENBQUNxSixpQkFBaUIsQ0FBQyxFQUFFLENBQUNFLFNBQVM7d0JBQzlERixvQkFBb0IsSUFBSSxDQUFDckYsZUFBZSxDQUFDcUYsbUJBQW1CO3dCQUM1REEsb0JBQW9CQSxrQkFBa0IvSSxNQUFNLENBQUMsQ0FBQytGOzRCQUMxQyxPQUFPQSxHQUFHNUMsbUJBQW1CLENBQUMwRCxrQkFBa0I7d0JBQ3BEO3dCQUNBLElBQUlrQyxrQkFBa0JsSSxNQUFNLEtBQUssR0FBRzs0QkFDaEM7d0JBQ0o7d0JBQ0EsSUFBSXFJLGNBQWM7NEJBQ2QsUUFBUTFHLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQzRCLFFBQVE7d0JBQ3RGO3dCQUNBLEtBQUssSUFBSXNHLGFBQWFrRixjQUFjOzRCQUNoQyxJQUFJbkU7NEJBQ0osSUFBSTRELGNBQWMsQ0FBQzVELE9BQU8sTUFBTXJCLFFBQVFDLEdBQUcsQ0FBQ3NGLGtCQUFrQnBGLEdBQUcsQ0FBQyxDQUFDb0M7Z0NBQy9ELE9BQU9BLEdBQUcrQyxZQUFZLENBQUM7b0NBQ25CbkQsS0FBSzdCO2dDQUNUOzRCQUNKLEdBQUUsTUFBTyxRQUFRZSxTQUFTLEtBQUssSUFBSUEsT0FBTyxFQUFFOzRCQUM1Q3FFLFdBQVcsQ0FBQyxZQUFZLEdBQUdwRjs0QkFDM0JvRixXQUFXLENBQUMsUUFBUSxHQUFHVCxZQUFZVSxJQUFJOzRCQUN2QzdFLElBQUk0RSxXQUFXLENBQUNBO3dCQUNwQjtvQkFDSjtvQkFDQSxJQUFJRSxzQ0FBc0MsT0FBTzdLO3dCQUM3QyxJQUFJcUYsVUFBVSxJQUFJLENBQUNNLFNBQVMsQ0FBQzNGLFlBQVk7d0JBQ3pDLElBQUksQ0FBQ3FGLFNBQVM7d0JBQ2QsSUFBSVYsa0JBQWtCVSxRQUFRVixlQUFlO3dCQUM3QyxJQUFJQSxpQkFBaUIsTUFBTTRGLGFBQWE1SSxXQUFXOzRCQUMvQ2dEO3lCQUNIO29CQUNMO29CQUNBb0IsSUFBSStFLGdCQUFnQixDQUFDLFdBQVcsT0FBT0M7d0JBQ25DLElBQUkzRyxVQUFVMkcsR0FBR0MsSUFBSTt3QkFDckIsSUFBSUM7d0JBQ0osSUFBSTFGLFlBQVksQ0FBQzBGLHFCQUFxQjdHLE9BQU8sQ0FBQyxZQUFZLE1BQU0sUUFBUTZHLHVCQUF1QixLQUFLLElBQUlBLHFCQUFxQjt3QkFDN0gsSUFBSTdNLFVBQVVnRyxPQUFPLENBQUMsVUFBVTt3QkFDaEMsSUFBSXVHLGNBQWM7NEJBQ2QsUUFBUXZHLFFBQVE2QixJQUFJOzRCQUNwQixhQUFhVjt3QkFDakI7d0JBQ0EsSUFBSVQsbUJBQW1CLElBQUksQ0FBQytDLG9CQUFvQixDQUFDdEM7d0JBQ2pELElBQUlwQixxQkFBcUI7NEJBQ3JCaUQsS0FBSzdCOzRCQUNMbkgsU0FBU0E7d0JBQ2I7d0JBQ0EsT0FBT2dHLFFBQVE2QixJQUFJOzRCQUNmLEtBQUtoQyw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUNvQixNQUFNO2dDQUN6RXFHLG1CQUFtQixJQUFJLENBQUNLLGVBQWUsQ0FBQ0wsa0JBQWtCO2dDQUMxRCxJQUFJQSxpQkFBaUJ4QyxNQUFNLEdBQUcsR0FBRztvQ0FDN0IsMENBQTBDO29DQUMxQ3FJLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTTdGLGdCQUFnQixDQUFDLEVBQUUsQ0FBQ3JHLE1BQU0sQ0FBQzBGLG9CQUFvQkMsUUFBUTFHLEtBQUssRUFBRTBHLFFBQVEzRixNQUFNO2dDQUM3RztnQ0FDQTs0QkFDSixLQUFLd0YsNENBQTJDLGdCQUFnQixJQUFJNUcsRUFBRSxDQUFDc0IsUUFBUTtnQ0FDM0VnTSxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTTFGLFFBQVFDLEdBQUcsQ0FBQyxJQUFJLENBQUNDLGVBQWUsQ0FBQ0wsa0JBQWtCLGNBQWNNLEdBQUcsQ0FBQyxPQUFPQztvQ0FDdEcsT0FBTzt3Q0FDSDZGLGFBQWEsTUFBTTdGLFFBQVE4RixVQUFVLENBQUNoSCxvQkFBb0JDLE9BQU8sQ0FBQyxRQUFRO3dDQUMxRWlCLFNBQVNBLFFBQVFtQixXQUFXLENBQUNOLFNBQVM7b0NBQzFDO2dDQUNKLEdBQUUsRUFBR3pFLE1BQU0sQ0FBQ3VDLG9DQUFtQyxhQUFhLElBQUl0RCxFQUFFO2dDQUNsRTs0QkFDSixLQUFLdUQsNENBQTJDLGdCQUFnQixJQUFJNUcsRUFBRSxDQUFDd0IsaUJBQWlCO2dDQUNwRixJQUFJdU07Z0NBQ0osSUFBSXBMLGNBQWNvRSxRQUFRMUcsS0FBSyxDQUFDLFVBQVU7Z0NBQzFDaU4sV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFPLEVBQUNTLDZCQUE2QixJQUFJLENBQUNqRyxlQUFlLENBQUNMLGtCQUFrQixxQkFBcUJ1RyxJQUFJLENBQUMsQ0FBQ2hHO29DQUMxSCxJQUFJQSxRQUFRbUIsV0FBVyxDQUFDTixTQUFTLEtBQUtsRyxhQUFhO3dDQUMvQyxPQUFPcUY7b0NBQ1g7Z0NBQ0osRUFBQyxNQUFPLFFBQVErRiwrQkFBK0IsS0FBSyxJQUFJLEtBQUssSUFBSUEsMkJBQTJCRSxTQUFTLENBQUNsSCxRQUFRMUcsS0FBSztnQ0FDbkg7NEJBQ0osS0FBS3VHLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQzhCLE1BQU07Z0NBQ3pFMkYsaUJBQWlCVSxPQUFPLENBQUMsQ0FBQ0g7b0NBQ3RCQSxRQUFRa0csUUFBUSxDQUFDcEgsb0JBQW9CQyxPQUFPLENBQUMsUUFBUTtnQ0FDekQ7Z0NBQ0EsTUFBTW1HLGFBQWFwRyxvQkFBb0JXO2dDQUN2Qzs0QkFDSixLQUFLYiw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUNnQyxVQUFVO2dDQUM3RXlGLGlCQUFpQlUsT0FBTyxDQUFDLENBQUNIO29DQUN0QkEsUUFBUW1HLFdBQVcsQ0FBQ3JILG9CQUFvQkMsT0FBTyxDQUFDLFFBQVE7Z0NBQzVEO2dDQUNBLE1BQU1tRyxhQUFhcEcsb0JBQW9CVztnQ0FDdkM7NEJBQ0osS0FBS2IsNENBQTJDLGdCQUFnQixJQUFJNUcsRUFBRSxDQUFDMEIsS0FBSztnQ0FDeEU0TCxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDOUYseUJBQXlCLENBQUNDLGtCQUFrQixTQUFTLFdBQVdYLG9CQUFvQkMsUUFBUTFHLEtBQUs7Z0NBQ25JOzRCQUNKLEtBQUt1Ryw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUM0QixRQUFRO2dDQUMzRTBMLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTUosYUFBYXBHLG9CQUFvQlc7Z0NBQzlEOzRCQUNKLEtBQUtiLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQ2tCLElBQUk7Z0NBQ3ZFb00sV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQ3pHLG9DQUFvQyxDQUFDQyxvQkFBb0JDLFNBQVMsSUFBSSxDQUFDNEMsV0FBVyxDQUFDeUUsSUFBSSxDQUFDLElBQUk7Z0NBQzlILE1BQU1sQixhQUFhcEc7Z0NBQ25COzRCQUNKLEtBQUtGLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQ2tDLFVBQVU7Z0NBQzdFb0wsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQ3pHLG9DQUFvQyxDQUFDQyxvQkFBb0JDLFNBQVMsSUFBSSxDQUFDc0Qsa0JBQWtCLENBQUMrRCxJQUFJLENBQUMsSUFBSTtnQ0FDckksTUFBTWxCLGFBQWFwRztnQ0FDbkI7NEJBQ0osS0FBS0YsNENBQTJDLGdCQUFnQixJQUFJNUcsRUFBRSxDQUFDcUMsYUFBYTtnQ0FDaEYsSUFBSSxDQUFDNEYsc0JBQXNCLENBQUNSLGtCQUFrQlMsV0FBV25CLFFBQVE5RixPQUFPO2dDQUN4RSxNQUFNaU0sYUFBYXBHLG9CQUFvQlc7Z0NBQ3ZDOzRCQUNKLEtBQUtiLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQ3VDLGFBQWE7Z0NBQ2hGLElBQUksQ0FBQytILGNBQWMsQ0FBQ3hEO2dDQUNwQixNQUFNb0csYUFBYXBHLG9CQUFvQlc7Z0NBQ3ZDOzRCQUNKLEtBQUtiLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQ3lDLE9BQU87Z0NBQzFFLE1BQU0sSUFBSSxDQUFDNEYsVUFBVTtnQ0FDckI7NEJBQ0osS0FBS3pCLDRDQUEyQyxnQkFBZ0IsSUFBSTVHLEVBQUUsQ0FBQzRDLGFBQWE7Z0NBQ2hGLElBQUksQ0FBQ3NHLGdCQUFnQixDQUFDbkMsUUFBUXBFLFdBQVcsRUFBRW9FLFFBQVE5RixPQUFPLEVBQUU4RixRQUFRM0UsS0FBSztnQ0FDekUsTUFBTW9MLG9DQUFvQ3pHLFFBQVFwRSxXQUFXO2dDQUM3RDs0QkFDSixLQUFLaUUsNENBQTJDLGdCQUFnQixJQUFJNUcsRUFBRSxDQUFDOEMsaUJBQWlCO2dDQUNwRixJQUFJLENBQUNBLGlCQUFpQixDQUFDaUUsUUFBUXBFLFdBQVcsRUFBRW9FLFFBQVE5RixPQUFPO2dDQUMzRCxNQUFNdU0sb0NBQW9DekcsUUFBUXBFLFdBQVc7Z0NBQzdEOzRCQUNKLEtBQUtpRSw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUNnRCxhQUFhO2dDQUNoRnNLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUM5Rix5QkFBeUIsQ0FBQ0Msa0JBQWtCLGlCQUFpQix3QkFBd0JYLG9CQUFvQkMsUUFBUTFHLEtBQUs7Z0NBQ3hKOzRCQUNKLEtBQUt1Ryw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUNrRCxpQkFBaUI7Z0NBQ3BGLElBQUltTCxhQUFhLE1BQU0sSUFBSSxDQUFDN0cseUJBQXlCLENBQUNDLGtCQUFrQixxQkFBcUIsMEJBQTBCWCxvQkFBb0JDLFFBQVExRyxLQUFLO2dDQUN4SmlOLFdBQVcsQ0FBQyxRQUFRLEdBQUdlLFdBQVdkLElBQUk7Z0NBQ3RDOzRCQUNKLEtBQUszRyw0Q0FBMkMsZ0JBQWdCLElBQUk1RyxFQUFFLENBQUNvRCxpQkFBaUI7Z0NBQ3BGcUUsbUJBQW1CLElBQUksQ0FBQ0ssZUFBZSxDQUFDTCxrQkFBa0I7Z0NBQzFELElBQUlBLGlCQUFpQnhDLE1BQU0sR0FBRyxHQUFHO29DQUM3QixnQ0FBZ0M7b0NBQ2hDcUksV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNN0YsZ0JBQWdCLENBQUMsRUFBRSxDQUFDckUsaUJBQWlCLENBQUMwRCxvQkFBb0JDLFFBQVExRyxLQUFLO2dDQUN4RztnQ0FDQTt3QkFDUjt3QkFDQXFJLElBQUk0RSxXQUFXLENBQUNBO29CQUNwQjtnQkFDSjtZQUNKO1FBRUE7UUFFQSxNQUFNLEdBQUksT0FBT3pOLDBCQUFtQkE7SUFDcEMsTUFBTSxHQUFHO0FBRVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvYWNlLWxpbnRlcnMvYnVpbGQvc2VydmljZS1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gLyoqKioqKi8gKCgpID0+IHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyA2MDAyOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBDczogKCkgPT4gKC8qIGJpbmRpbmcgKi8gTWVzc2FnZVR5cGUpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgQmFzZU1lc3NhZ2UsIEluaXRNZXNzYWdlLCBGb3JtYXRNZXNzYWdlLCBDb21wbGV0ZU1lc3NhZ2UsIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSwgSG92ZXJNZXNzYWdlLCBWYWxpZGF0ZU1lc3NhZ2UsIENoYW5nZU1lc3NhZ2UsIERlbHRhc01lc3NhZ2UsIENoYW5nZU1vZGVNZXNzYWdlLCBDaGFuZ2VPcHRpb25zTWVzc2FnZSwgQ2xvc2VEb2N1bWVudE1lc3NhZ2UsIERpc3Bvc2VNZXNzYWdlLCBHbG9iYWxPcHRpb25zTWVzc2FnZSwgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlLCBTaWduYXR1cmVIZWxwTWVzc2FnZSwgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlLCBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VEb2N1bWVudCk7XG4gICAgfVxufVxuY2xhc3MgRGlzcG9zZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcihcIlwiKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZGlzcG9zZSk7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2V0U2VtYW50aWNUb2tlbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbnZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbihNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaW5pdFwiXSA9IDBdID0gXCJpbml0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJmb3JtYXRcIl0gPSAxXSA9IFwiZm9ybWF0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb21wbGV0ZVwiXSA9IDJdID0gXCJjb21wbGV0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVzb2x2ZUNvbXBsZXRpb25cIl0gPSAzXSA9IFwicmVzb2x2ZUNvbXBsZXRpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZVwiXSA9IDRdID0gXCJjaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImhvdmVyXCJdID0gNV0gPSBcImhvdmVyXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJ2YWxpZGF0ZVwiXSA9IDZdID0gXCJ2YWxpZGF0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlEZWx0YVwiXSA9IDddID0gXCJhcHBseURlbHRhXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VNb2RlXCJdID0gOF0gPSBcImNoYW5nZU1vZGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU9wdGlvbnNcIl0gPSA5XSA9IFwiY2hhbmdlT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2xvc2VEb2N1bWVudFwiXSA9IDEwXSA9IFwiY2xvc2VEb2N1bWVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2xvYmFsT3B0aW9uc1wiXSA9IDExXSA9IFwiZ2xvYmFsT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29uZmlndXJlRmVhdHVyZXNcIl0gPSAxMl0gPSBcImNvbmZpZ3VyZUZlYXR1cmVzXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzaWduYXR1cmVIZWxwXCJdID0gMTNdID0gXCJzaWduYXR1cmVIZWxwXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkb2N1bWVudEhpZ2hsaWdodFwiXSA9IDE0XSA9IFwiZG9jdW1lbnRIaWdobGlnaHRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRpc3Bvc2VcIl0gPSAxNV0gPSBcImRpc3Bvc2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNhcGFiaWxpdGllc0NoYW5nZVwiXSA9IDE2XSA9IFwiY2FwYWJpbGl0aWVzQ2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnZXRTZW1hbnRpY1Rva2Vuc1wiXSA9IDE3XSA9IFwiZ2V0U2VtYW50aWNUb2tlbnNcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDYyOTc6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIER3OiAoKSA9PiAoLyogYmluZGluZyAqLyBub3RFbXB0eSksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFBNOiAoKSA9PiAoLyogYmluZGluZyAqLyBtZXJnZU9iamVjdHMpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkgKi9cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyLCBleGNsdWRlVW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICBpZiAoIW9iajEpIHJldHVybiBvYmoyO1xuICAgIGlmICghb2JqMikgcmV0dXJuIG9iajE7XG4gICAgaWYgKGV4Y2x1ZGVVbmRlZmluZWQpIHtcbiAgICAgICAgb2JqMSA9IGV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMob2JqMSk7XG4gICAgICAgIG9iajIgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajIpO1xuICAgIH1cbiAgICBjb25zdCBtZXJnZWRPYmplY3RzID0ge1xuICAgICAgICAuLi5vYmoyLFxuICAgICAgICAuLi5vYmoxXG4gICAgfTsgLy8gR2l2ZSBwcmlvcml0eSB0byBvYmoxIHZhbHVlcyBieSBzcHJlYWRpbmcgb2JqMiBmaXJzdCwgdGhlbiBvYmoxXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWVyZ2VkT2JqZWN0cykpe1xuICAgICAgICBpZiAob2JqMVtrZXldICYmIG9iajJba2V5XSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqMVtrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajFba2V5XS5jb25jYXQob2JqMltrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoyW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gb2JqMltrZXldLmNvbmNhdChvYmoxW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqMVtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqMltrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG1lcmdlT2JqZWN0cyhvYmoxW2tleV0sIG9iajJba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9iamVjdHM7XG59XG5mdW5jdGlvbiBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iaikge1xuICAgIGNvbnN0IGZpbHRlcmVkRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaikuZmlsdGVyKChbXywgdmFsdWVdKT0+dmFsdWUgIT09IHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhmaWx0ZXJlZEVudHJpZXMpO1xufVxuZnVuY3Rpb24gbm90RW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIXJhbmdlLmlzRW1wdHkoKSAmJiAhbmV4dC5pc0VtcHR5KCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuZW5kKSA8IDApIHtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5yb3cgPSBuZXh0LmVuZC5yb3c7XG4gICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbmV4dC5lbmQuY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICBuZXh0ID0gcmFuZ2U7XG4gICAgICAgIGktLTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG59XG5mdW5jdGlvbiBjb21wYXJlUG9pbnRzKHAxLCBwMikge1xuICAgIHJldHVybiBwMS5yb3cgLSBwMi5yb3cgfHwgcDEuY29sdW1uIC0gcDIuY29sdW1uO1xufVxuZnVuY3Rpb24gY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSh2YWx1ZSwgcmVnZXhwQXJyYXkpIHtcbiAgICBpZiAoIXJlZ2V4cEFycmF5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ2V4cEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYgKHJlZ2V4cEFycmF5W2ldLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4oKCkgPT4ge1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU2VydmljZU1hbmFnZXI6ICgpID0+ICgvKiBiaW5kaW5nICovIFNlcnZpY2VNYW5hZ2VyKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyOTcpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwMDIpO1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbmNsYXNzIFNlcnZpY2VNYW5hZ2VyIHtcbiAgICBhc3luYyBnZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCBjYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2VydmljZXMpLnJlZHVjZSgoYWNjLCBrZXkpPT57XG4gICAgICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfa2V5O1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gKChfc2VydmljZXNfa2V5ID0gc2VydmljZXNba2V5XSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX2tleSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX2tleS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlQ2FwYWJpbGl0aWVzKSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlLCBtZXRob2ROYW1lLCBkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSkubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VbbWV0aG9kTmFtZV0oZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSk7XG4gICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgfVxuICAgIGFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgc2Vzc2lvbklELCBvcHRpb25zKSB7XG4gICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgIHNlcnZpY2Uuc2V0T3B0aW9ucyhzZXNzaW9uSUQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgZGlzcG9zZUFsbCgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy4kc2VydmljZXM7XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIGF3YWl0ICgoX3NlcnZpY2VzX3NlcnZpY2VOYW1lID0gc2VydmljZXNbc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZS5kaXNwb3NlKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgpIHtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKCd0eXBlJyBpbiBzZXJ2aWNlKSB7XG4gICAgICAgICAgICBpZiAoW1xuICAgICAgICAgICAgICAgIFwic29ja2V0XCIsXG4gICAgICAgICAgICAgICAgXCJ3ZWJ3b3JrZXJcIlxuICAgICAgICAgICAgXS5pbmNsdWRlcyhzZXJ2aWNlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbXCJMYW5ndWFnZUNsaWVudFwiXShzZXJ2aWNlLCBjdHgpO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IFwiVW5rbm93biBzZXJ2aWNlIHR5cGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbc2VydmljZS5jbGFzc05hbWVdKHNlcnZpY2UubW9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2aWNlLm9wdGlvbnMgfHwgc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9vcHRpb25zLCBfcmVmO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucygoX3JlZiA9IChfc2VydmljZV9vcHRpb25zID0gc2VydmljZS5vcHRpb25zKSAhPT0gbnVsbCAmJiBfc2VydmljZV9vcHRpb25zICE9PSB2b2lkIDAgPyBfc2VydmljZV9vcHRpb25zIDogc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jICRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VydmljZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0gPSBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCB0aGlzLmN0eCkudGhlbigoaW5zdGFuY2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07IC8vIENsZWFuIHVwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxPcHRpb25zKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgc2VydmljZS5vcHRpb25zID0gbWVyZ2UgPyAoMCxfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5tZXJnZU9iamVjdHMgKi8gLlBNKShvcHRpb25zLCBzZXJ2aWNlLm9wdGlvbnMpIDogb3B0aW9ucztcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKHNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IHRoaXMuJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VydmljZXMpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZG9jdW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgdXJpOiBkb2N1bWVudElkZW50aWZpZXIudXJpLFxuICAgICAgICAgICAgdmVyc2lvbjogZG9jdW1lbnRJZGVudGlmaWVyLnZlcnNpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUlkOiBtb2RlLFxuICAgICAgICAgICAgdGV4dDogZG9jdW1lbnRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5mb3JFYWNoKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZS5hZGREb2N1bWVudChkb2N1bWVudEl0ZW0pKTtcbiAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50SWRlbnRpZmllci51cmldID0gbW9kZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVEb2N1bWVudChkb2N1bWVudCkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbW92ZURvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50LnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VydmljZXNJbnN0YW5jZXMoc2Vzc2lvbklEKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW3Nlc3Npb25JRF07XG4gICAgICAgIGlmICghbW9kZSkgcmV0dXJuIFtdOyAvL1RPRE86XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhzZXJ2aWNlcykubWFwKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC5Edyk7XG4gICAgfVxuICAgIGZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBpZiAoIWVsLnNlcnZpY2VEYXRhLmZlYXR1cmVzW2ZlYXR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FwYWJpbGl0aWVzID0gZWwuc2VydmljZUNhcGFiaWxpdGllcztcbiAgICAgICAgICAgIHN3aXRjaChmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG92ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5ob3ZlclByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uUmVzb2x2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID0gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlcikgPT09IG51bGwgfHwgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyLnJlc29sdmVQcm92aWRlcikgPT09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZSB8fCBjYXBhYmlsaXRpZXMuZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGlhZ25vc3RpY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaWduYXR1cmVIZWxwXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2lnbmF0dXJlSGVscFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRIaWdobGlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbWFudGljVG9rZW5zXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2VtYW50aWNUb2tlbnNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXNXaXRoTmFtZSA9IHt9O1xuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLiRzZXJ2aWNlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKT0+e1xuICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSB2YWx1ZS5tb2Rlcy5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5jbHVkZXMobW9kZSkpIHNlcnZpY2VzV2l0aE5hbWVba2V5XSA9IHRoaXMuJHNlcnZpY2VzW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VydmljZXNXaXRoTmFtZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKG5hbWUsIHNlcnZpY2UpIHtcbiAgICAgICAgc2VydmljZS5pZCA9IG5hbWU7XG4gICAgICAgIHNlcnZpY2UuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2UuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IHNlcnZpY2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmVyKG5hbWUsIGNsaWVudENvbmZpZykge1xuICAgICAgICBjbGllbnRDb25maWcuaWQgPSBuYW1lO1xuICAgICAgICBjbGllbnRDb25maWcuY2xhc3NOYW1lID0gXCJMYW5ndWFnZUNsaWVudFwiO1xuICAgICAgICBjbGllbnRDb25maWcuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGNsaWVudENvbmZpZy5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gY2xpZW50Q29uZmlnO1xuICAgIH1cbiAgICBjb25maWd1cmVGZWF0dXJlcyhuYW1lLCBmZWF0dXJlcykge1xuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoZmVhdHVyZXMpO1xuICAgICAgICBpZiAoIXRoaXMuJHNlcnZpY2VzW25hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdLmZlYXR1cmVzID0gZmVhdHVyZXM7XG4gICAgfVxuICAgIHNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2VGZWF0dXJlcykge1xuICAgICAgICB2YXIgX2ZlYXR1cmVzLCBfZmVhdHVyZXMxLCBfZmVhdHVyZXMyLCBfZmVhdHVyZXMzLCBfZmVhdHVyZXM0LCBfZmVhdHVyZXM1LCBfZmVhdHVyZXM2LCBfZmVhdHVyZXM3O1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zZW1hbnRpY1Rva2VucztcbiAgICAgICAgKF9zZW1hbnRpY1Rva2VucyA9IChfZmVhdHVyZXM3ID0gZmVhdHVyZXMpLnNlbWFudGljVG9rZW5zKSAhPT0gbnVsbCAmJiBfc2VtYW50aWNUb2tlbnMgIT09IHZvaWQgMCA/IF9zZW1hbnRpY1Rva2VucyA6IF9mZWF0dXJlczcuc2VtYW50aWNUb2tlbnMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZUluaXRQcm9taXNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2Vzc2lvbklEVG9Nb2RlXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImN0eFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklETGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MudmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBzZXNzaW9uSUQgb2Ygc2Vzc2lvbklETGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wic2Vzc2lvbklkXCJdID0gc2Vzc2lvbklEO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZVtcInNlc3Npb25JZFwiXSkgIT09IG51bGwgJiYgX21lc3NhZ2Vfc2Vzc2lvbklkICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9zZXNzaW9uSWQgOiBcIlwiO1xuICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBtZXNzYWdlW1widmVyc2lvblwiXTtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgICAgIFwic2Vzc2lvbklkXCI6IHNlc3Npb25JRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhzZXNzaW9uSUQpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50SWRlbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoKG1lc3NhZ2UudHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5mb3JtYXQ6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2UgdG8gZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgc2VydmljZUluc3RhbmNlc1swXS5mb3JtYXQoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jb21wbGV0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uczogYXdhaXQgc2VydmljZS5kb0NvbXBsZXRlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLkR3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5yZXNvbHZlQ29tcGxldGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmljZU5hbWUgPSBtZXNzYWdlLnZhbHVlW1wic2VydmljZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuYXBwbHlEZWx0YTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5hcHBseURlbHRhcyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5ob3ZlcjpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcImhvdmVyXCIsIFwiZG9Ib3ZlclwiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnZhbGlkYXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuaW5pdDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgdGhpcy5hZGREb2N1bWVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuY2hhbmdlTW9kZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgdGhpcy5jaGFuZ2VEb2N1bWVudE1vZGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNoYW5nZU9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlPcHRpb25zVG9TZXJ2aWNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBzZXNzaW9uSUQsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNsb3NlRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZGlzcG9zZTpcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kaXNwb3NlQWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuQ3MuZ2xvYmFsT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxPcHRpb25zKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucywgbWVzc2FnZS5tZXJnZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmNvbmZpZ3VyZUZlYXR1cmVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUZlYXR1cmVzKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLnNpZ25hdHVyZUhlbHA6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJzaWduYXR1cmVIZWxwXCIsIFwicHJvdmlkZVNpZ25hdHVyZUhlbHBcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Dcy5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiLCBcImZpbmREb2N1bWVudEhpZ2hsaWdodHNcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGhpZ2hsaWdodHMuZmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkNzLmdldFNlbWFudGljVG9rZW5zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJzZW1hbnRpY1Rva2Vuc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmdldFNlbWFudGljVG9rZW5zKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbn0pKCk7XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkNzIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJzZXNzaW9uSWQiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UiLCJyZXNvbHZlQ29tcGxldGlvbiIsIkhvdmVyTWVzc2FnZSIsImhvdmVyIiwiVmFsaWRhdGVNZXNzYWdlIiwidmFsaWRhdGUiLCJDaGFuZ2VNZXNzYWdlIiwiY2hhbmdlIiwiRGVsdGFzTWVzc2FnZSIsImFwcGx5RGVsdGEiLCJDaGFuZ2VNb2RlTWVzc2FnZSIsImNoYW5nZU1vZGUiLCJDaGFuZ2VPcHRpb25zTWVzc2FnZSIsIm1lcmdlIiwiY2hhbmdlT3B0aW9ucyIsIkNsb3NlRG9jdW1lbnRNZXNzYWdlIiwiY2xvc2VEb2N1bWVudCIsIkRpc3Bvc2VNZXNzYWdlIiwiZGlzcG9zZSIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkdldFNlbWFudGljVG9rZW5zTWVzc2FnZSIsImdldFNlbWFudGljVG9rZW5zIiwiRHciLCJub3RFbXB0eSIsIlBNIiwibWVyZ2VPYmplY3RzIiwib2JqMSIsIm9iajIiLCJleGNsdWRlVW5kZWZpbmVkIiwiZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyIsIm1lcmdlZE9iamVjdHMiLCJrZXlzIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0IiwiZmlsdGVyZWRFbnRyaWVzIiwiZW50cmllcyIsImZpbHRlciIsIl8iLCJ1bmRlZmluZWQiLCJmcm9tRW50cmllcyIsIm1lcmdlUmFuZ2VzIiwicmFuZ2VzIiwibGlzdCIsInNvcnQiLCJiIiwiY29tcGFyZVBvaW50cyIsInN0YXJ0IiwibmV4dCIsInJhbmdlIiwibGVuZ3RoIiwiY21wIiwiZW5kIiwiaXNFbXB0eSIsInJvdyIsImNvbHVtbiIsInNwbGljZSIsInAxIiwicDIiLCJjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5IiwicmVnZXhwQXJyYXkiLCJ0ZXN0IiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJkZWZpbml0aW9uIiwibyIsImdldCIsInByb3AiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJTZXJ2aWNlTWFuYWdlciIsIl91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayIsImRvY3VtZW50SWRlbnRpZmllciIsIm1lc3NhZ2UiLCJjYWxsYmFjayIsInNlcnZpY2VzIiwicmVkdWNlIiwiYWNjIiwiX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UiLCJfc2VydmljZXNfa2V5Iiwic2VydmljZUluc3RhbmNlIiwic2VydmljZUNhcGFiaWxpdGllcyIsImFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMiLCJzZXJ2aWNlSW5zdGFuY2VzIiwiZmVhdHVyZSIsIm1ldGhvZE5hbWUiLCJQcm9taXNlIiwiYWxsIiwiZmlsdGVyQnlGZWF0dXJlIiwibWFwIiwic2VydmljZSIsImFwcGx5T3B0aW9uc1RvU2VydmljZXMiLCJzZXNzaW9uSUQiLCJmb3JFYWNoIiwic2V0T3B0aW9ucyIsImRpc3Bvc2VBbGwiLCIkc2VydmljZXMiLCJfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lIiwiJGluaXRTZXJ2aWNlSW5zdGFuY2UiLCJjdHgiLCJpbmNsdWRlcyIsInR5cGUiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwiZmluZFNlcnZpY2VzQnlNb2RlIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCJhZGREb2N1bWVudCIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJ2YWx1ZXMiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJjaGFuZ2VEb2N1bWVudE1vZGUiLCJyZW1vdmVEb2N1bWVudCIsImRvY3VtZW50IiwiZ2V0U2VydmljZXNJbnN0YW5jZXMiLCJmZWF0dXJlcyIsImNhcGFiaWxpdGllcyIsImhvdmVyUHJvdmlkZXIiLCJjb21wbGV0aW9uUHJvdmlkZXIiLCJfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsImRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIiLCJkb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciIsImRpYWdub3N0aWNQcm92aWRlciIsInNpZ25hdHVyZUhlbHBQcm92aWRlciIsImRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIiLCJzZW1hbnRpY1Rva2Vuc1Byb3ZpZGVyIiwic2VydmljZXNXaXRoTmFtZSIsImV4dGVuc2lvbnMiLCJzcGxpdCIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInJlZ2lzdGVyU2VydmVyIiwiY2xpZW50Q29uZmlnIiwic2VydmljZUZlYXR1cmVzIiwiX2ZlYXR1cmVzIiwiX2ZlYXR1cmVzMSIsIl9mZWF0dXJlczIiLCJfZmVhdHVyZXMzIiwiX2ZlYXR1cmVzNCIsIl9mZWF0dXJlczUiLCJfZmVhdHVyZXM2IiwiX2ZlYXR1cmVzNyIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJfc2VtYW50aWNUb2tlbnMiLCJzZW1hbnRpY1Rva2VucyIsImRvVmFsaWRhdGlvbiIsInNlcnZpY2VzSW5zdGFuY2VzIiwic2Vzc2lvbklETGlzdCIsImRvY3VtZW50cyIsInBvc3RNZXNzYWdlIiwiZmxhdCIsInByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsImNvbXBsZXRpb25zIiwiZG9Db21wbGV0ZSIsIl90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kIiwiZmluZCIsImRvUmVzb2x2ZSIsInNldFZhbHVlIiwiYXBwbHlEZWx0YXMiLCJiaW5kIiwiaGlnaGxpZ2h0cyJdLCJzb3VyY2VSb290IjoiIn0=