(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9877],{

/***/ 69877:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();
    else { var i, a; }
})(this, ()=>{
    return /******/ (()=>{
        /******/ "use strict";
        /******/ var __webpack_modules__ = {
            /***/ 2032: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_553__)=>{
                /* harmony export */ __nested_webpack_require_553__.d(__nested_webpack_exports__, {
                    /* harmony export */ Go: ()=>/* binding */ MessageType
                });
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, CloseConnectionMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage, GetSemanticTokensMessage, GetCodeActionsMessage, SetWorkspaceMessage, ExecuteCommandMessage, AppliedEditMessage */ function _define_property(obj, key, value) {
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
                    constructor(documentIdentifier, callbackId){
                        _define_property(this, "sessionId", void 0);
                        _define_property(this, "documentUri", void 0);
                        _define_property(this, "version", void 0);
                        _define_property(this, "callbackId", void 0);
                        this.sessionId = documentIdentifier.sessionId;
                        this.documentUri = documentIdentifier.documentUri;
                        this.callbackId = callbackId;
                    }
                }
                class InitMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, version, mode, options){
                        super(documentIdentifier, callbackId);
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
                class FormatMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, format){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.format);
                        _define_property(this, "value", void 0);
                        _define_property(this, "format", void 0);
                        this.value = value;
                        this.format = format;
                    }
                }
                class CompleteMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.complete);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class ResolveCompletionMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.resolveCompletion);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class HoverMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.hover);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class ValidateMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.validate);
                    }
                }
                class ChangeMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, version){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.change);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.version = version;
                    }
                }
                class DeltasMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, version){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.applyDelta);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.version = version;
                    }
                }
                class ChangeModeMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, version, mode){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.changeMode);
                        _define_property(this, "mode", void 0);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.mode = mode;
                        this.version = version;
                    }
                }
                class ChangeOptionsMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, options, merge = false){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.changeOptions);
                        _define_property(this, "options", void 0);
                        _define_property(this, "merge", void 0);
                        this.options = options;
                        this.merge = merge;
                    }
                }
                class CloseDocumentMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.closeDocument);
                    }
                }
                class CloseConnectionMessage {
                    constructor(callbackId){
                        _define_property(this, "type", MessageType.closeConnection);
                        _define_property(this, "callbackId", void 0);
                        this.callbackId = callbackId;
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
                class SignatureHelpMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.signatureHelp);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class DocumentHighlightMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.documentHighlight);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class GetSemanticTokensMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.getSemanticTokens);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class GetCodeActionsMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, context){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.getCodeActions);
                        _define_property(this, "value", void 0);
                        _define_property(this, "context", void 0);
                        this.value = value;
                        this.context = context;
                    }
                }
                class SetWorkspaceMessage {
                    constructor(value){
                        _define_property(this, "type", MessageType.setWorkspace);
                        _define_property(this, "value", void 0);
                        this.value = value;
                    }
                }
                class ExecuteCommandMessage {
                    constructor(serviceName, callbackId, command, args){
                        _define_property(this, "callbackId", void 0);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "type", MessageType.executeCommand);
                        _define_property(this, "value", void 0);
                        _define_property(this, "args", void 0);
                        this.serviceName = serviceName;
                        this.callbackId = callbackId;
                        this.value = command;
                        this.args = args;
                    }
                }
                class AppliedEditMessage {
                    constructor(value, serviceName, callbackId){
                        _define_property(this, "callbackId", void 0);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "type", MessageType.appliedEdit);
                        _define_property(this, "value", void 0);
                        this.serviceName = serviceName;
                        this.callbackId = callbackId;
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
                    MessageType[MessageType["closeConnection"] = 15] = "closeConnection";
                    MessageType[MessageType["capabilitiesChange"] = 16] = "capabilitiesChange";
                    MessageType[MessageType["getSemanticTokens"] = 17] = "getSemanticTokens";
                    MessageType[MessageType["getCodeActions"] = 18] = "getCodeActions";
                    MessageType[MessageType["executeCommand"] = 19] = "executeCommand";
                    MessageType[MessageType["applyEdit"] = 20] = "applyEdit";
                    MessageType[MessageType["appliedEdit"] = 21] = "appliedEdit";
                    MessageType[MessageType["setWorkspace"] = 22] = "setWorkspace";
                })(MessageType || (MessageType = {}));
            /***/ },
            /***/ 7770: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_14891__)=>{
                /* harmony export */ __nested_webpack_require_14891__.d(__nested_webpack_exports__, {
                    /* harmony export */ rL: ()=>/* binding */ mergeObjects,
                    /* harmony export */ z2: ()=>/* binding */ notEmpty
                });
                /* unused harmony exports mergeRanges, checkValueAgainstRegexpArray, convertToUri */ function mergeObjects(obj1, obj2, excludeUndefined = false) {
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
                function convertToUri(filePath) {
                    //already URI
                    if (filePath.startsWith("file:///")) {
                        return filePath;
                    }
                    return URI.file(filePath).toString();
                }
            /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __nested_webpack_require_19114__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_19114__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_19114__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_19114__.o(definition, key) && !__nested_webpack_require_19114__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_19114__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_19114__.r = (exports1)=>{
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
        __nested_webpack_require_19114__.r(__nested_webpack_exports__);
        /* harmony export */ __nested_webpack_require_19114__.d(__nested_webpack_exports__, {
            /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
        });
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_19114__(7770);
        /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_19114__(2032);
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
            async aggregateFeatureResponses(serviceInstances, feature, methodName, documentIdentifier, attrs) {
                return (await Promise.all(this.filterByFeature(serviceInstances, feature).map(async (service)=>{
                    if (Array.isArray(attrs)) {
                        return service[methodName](documentIdentifier, ...attrs);
                    } else {
                        return service[methodName](documentIdentifier, attrs);
                    }
                }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .z2);
            }
            applyOptionsToServices(serviceInstances, documentUri, options) {
                serviceInstances.forEach((service)=>{
                    service.setOptions(documentUri, options);
                });
            }
            async closeAllConnections() {
                var services = this.$services;
                for(let serviceName in services){
                    var _services_serviceName_serviceInstance, _services_serviceName;
                    await ((_services_serviceName = services[serviceName]) === null || _services_serviceName === void 0 ? void 0 : (_services_serviceName_serviceInstance = _services_serviceName.serviceInstance) === null || _services_serviceName_serviceInstance === void 0 ? void 0 : _services_serviceName_serviceInstance.closeConnection());
                }
            }
            static async $initServiceInstance(service, ctx, workspaceUri) {
                let module1;
                if ('type' in service) {
                    if ([
                        "socket",
                        "webworker"
                    ].includes(service.type)) {
                        module1 = await service.module();
                        service.serviceInstance = new module1["LanguageClient"](service, ctx, workspaceUri);
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
                        this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx, this.workspaceUri).then((instance)=>{
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
                service.options = merge ? (0, _utils__WEBPACK_IMPORTED_MODULE_1__ /* .mergeObjects */ .rL)(options, service.options) : options;
                if (service.serviceInstance) {
                    service.serviceInstance.setGlobalOptions(service.options);
                }
            }
            setWorkspace(workspaceUri) {
                this.workspaceUri = workspaceUri;
                Object.values(this.$services).forEach((service)=>{
                    var _service_serviceInstance;
                    (_service_serviceInstance = service.serviceInstance) === null || _service_serviceInstance === void 0 ? void 0 : _service_serviceInstance.setWorkspace(this.workspaceUri);
                });
            }
            async addDocument(documentIdentifier, documentValue, mode, options) {
                if (!mode || !/^ace\/mode\//.test(mode)) return;
                mode = mode.replace("ace/mode/", "");
                mode = mode.replace(/golang$/, "go");
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
            getServicesInstances(documentUri) {
                let mode = this.$sessionIDToMode[documentUri];
                if (!mode) return []; //TODO:
                let services = this.findServicesByMode(mode);
                return Object.values(services).map((el)=>el.serviceInstance).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .z2);
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
                        case "codeAction":
                            return capabilities.codeActionProvider != undefined;
                        case "executeCommand":
                            return capabilities.executeCommandProvider != undefined;
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
                var _features, _features1, _features2, _features3, _features4, _features5, _features6, _features7, _features8, _features9;
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
                var _codeAction;
                (_codeAction = (_features8 = features).codeAction) !== null && _codeAction !== void 0 ? _codeAction : _features8.codeAction = true;
                var _executeCommand;
                (_executeCommand = (_features9 = features).executeCommand) !== null && _executeCommand !== void 0 ? _executeCommand : _features9.executeCommand = true;
                return features;
            }
            constructor(ctx){
                _define_property(this, "$services", {});
                _define_property(this, "serviceInitPromises", {});
                _define_property(this, "$sessionIDToMode", {});
                _define_property(this, "ctx", void 0);
                _define_property(this, "workspaceUri", void 0);
                this.ctx = ctx;
                let doValidation = async (document, servicesInstances)=>{
                    servicesInstances !== null && servicesInstances !== void 0 ? servicesInstances : servicesInstances = this.getServicesInstances(document.uri);
                    if (servicesInstances.length === 0) {
                        return;
                    }
                    //this is list of documents linked to services
                    let documentUrisList = Object.keys(servicesInstances[0].documents);
                    servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
                    servicesInstances = servicesInstances.filter((el)=>{
                        return el.serviceCapabilities.diagnosticProvider;
                    });
                    if (servicesInstances.length === 0) {
                        return;
                    }
                    let postMessage = {
                        "type": _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.validate
                    };
                    for (let documentUri of documentUrisList){
                        var _ref;
                        let diagnostics = (_ref = await Promise.all(servicesInstances.map((el)=>{
                            return el.doValidation({
                                uri: documentUri
                            });
                        }))) !== null && _ref !== void 0 ? _ref : [];
                        postMessage["documentUri"] = documentUri;
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
                    var _message_documentUri;
                    let documentUri = (_message_documentUri = message["documentUri"]) !== null && _message_documentUri !== void 0 ? _message_documentUri : "";
                    let version = message["version"];
                    let postMessage = {
                        "type": message.type,
                        "sessionId": sessionID,
                        "callbackId": message["callbackId"]
                    };
                    let serviceInstances = this.getServicesInstances(documentUri);
                    let documentIdentifier = {
                        uri: documentUri,
                        version: version
                    };
                    switch(message.type){
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.format:
                            serviceInstances = this.filterByFeature(serviceInstances, "format");
                            if (serviceInstances.length > 0) {
                                //we will use only first service to format
                                postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
                            }
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.complete:
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service)=>{
                                return {
                                    completions: await service.doComplete(documentIdentifier, message["value"]),
                                    service: service.serviceData.className
                                };
                            }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .z2);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.resolveCompletion:
                            var _this_filterByFeature_find;
                            let serviceName = message.value["service"];
                            postMessage["value"] = await ((_this_filterByFeature_find = this.filterByFeature(serviceInstances, "completionResolve").find((service)=>{
                                if (service.serviceData.className === serviceName) {
                                    return service;
                                }
                            })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value));
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.change:
                            serviceInstances.forEach((service)=>{
                                service.setValue(documentIdentifier, message["value"]);
                            });
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.applyDelta:
                            serviceInstances.forEach((service)=>{
                                service.applyDeltas(documentIdentifier, message["value"]);
                            });
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.hover:
                            postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "hover", "doHover", documentIdentifier, message.value);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.validate:
                            postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.init:
                            postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.addDocument.bind(this));
                            await doValidation(documentIdentifier);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.changeMode:
                            postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.changeDocumentMode.bind(this));
                            await doValidation(documentIdentifier);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.changeOptions:
                            this.applyOptionsToServices(serviceInstances, documentUri, message.options);
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.closeDocument:
                            this.removeDocument(documentIdentifier);
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.closeConnection:
                            await this.closeAllConnections();
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.globalOptions:
                            this.setGlobalOptions(message.serviceName, message.options, message.merge);
                            await provideValidationForServiceInstance(message.serviceName);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.configureFeatures:
                            this.configureFeatures(message.serviceName, message.options);
                            await provideValidationForServiceInstance(message.serviceName);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.signatureHelp:
                            postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "signatureHelp", "provideSignatureHelp", documentIdentifier, message.value);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.documentHighlight:
                            let highlights = await this.aggregateFeatureResponses(serviceInstances, "documentHighlight", "findDocumentHighlights", documentIdentifier, message.value);
                            postMessage["value"] = highlights.flat();
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.getSemanticTokens:
                            serviceInstances = this.filterByFeature(serviceInstances, "semanticTokens");
                            if (serviceInstances.length > 0) {
                                //we will use only first service
                                postMessage["value"] = await serviceInstances[0].getSemanticTokens(documentIdentifier, message.value);
                            }
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.getCodeActions:
                            let value = message.value;
                            let context = message.context;
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "codeAction").map(async (service)=>{
                                return {
                                    codeActions: await service.getCodeActions(documentIdentifier, value, context),
                                    service: service.serviceName
                                };
                            }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__ /* .notEmpty */ .z2);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.executeCommand:
                            var _this_$services_message_serviceName_serviceInstance, _this_$services_message_serviceName;
                            postMessage["value"] = (_this_$services_message_serviceName = this.$services[message.serviceName]) === null || _this_$services_message_serviceName === void 0 ? void 0 : (_this_$services_message_serviceName_serviceInstance = _this_$services_message_serviceName.serviceInstance) === null || _this_$services_message_serviceName_serviceInstance === void 0 ? void 0 : _this_$services_message_serviceName_serviceInstance.executeCommand(message.value, message.args);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.appliedEdit:
                            var _this_$services_message_serviceName_serviceInstance1, _this_$services_message_serviceName1;
                            postMessage["value"] = (_this_$services_message_serviceName1 = this.$services[message.serviceName]) === null || _this_$services_message_serviceName1 === void 0 ? void 0 : (_this_$services_message_serviceName_serviceInstance1 = _this_$services_message_serviceName1.serviceInstance) === null || _this_$services_message_serviceName_serviceInstance1 === void 0 ? void 0 : _this_$services_message_serviceName_serviceInstance1.sendAppliedResult(message.value, message.callbackId);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.setWorkspace:
                            this.setWorkspace(message.value);
                            break;
                    }
                    ctx.postMessage(postMessage);
                });
            }
        }
        /******/ return __nested_webpack_exports__;
    /******/ })();
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NEQsWUFBWTs0QkFDL0UsSUFBSSxDQUFDQSxZQUFZLENBQUNzRSxRQUFRN0gsS0FBSzs0QkFDL0I7b0JBQ1I7b0JBQ0F3SixJQUFJcUYsV0FBVyxDQUFDQTtnQkFDcEI7WUFDSjtRQUNKO1FBRUEsTUFBTSxHQUFJLE9BQU9yUCwwQkFBbUJBO0lBQ3BDLE1BQU0sR0FBRztBQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL3BhY2thZ2VzL2FjZS1saW50ZXJzL2J1aWxkL3NlcnZpY2UtbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgKCkgPT4ge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gMjAzMjpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgR286ICgpID0+ICgvKiBiaW5kaW5nICovIE1lc3NhZ2VUeXBlKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIEJhc2VNZXNzYWdlLCBJbml0TWVzc2FnZSwgRm9ybWF0TWVzc2FnZSwgQ29tcGxldGVNZXNzYWdlLCBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UsIEhvdmVyTWVzc2FnZSwgVmFsaWRhdGVNZXNzYWdlLCBDaGFuZ2VNZXNzYWdlLCBEZWx0YXNNZXNzYWdlLCBDaGFuZ2VNb2RlTWVzc2FnZSwgQ2hhbmdlT3B0aW9uc01lc3NhZ2UsIENsb3NlRG9jdW1lbnRNZXNzYWdlLCBDbG9zZUNvbm5lY3Rpb25NZXNzYWdlLCBHbG9iYWxPcHRpb25zTWVzc2FnZSwgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlLCBTaWduYXR1cmVIZWxwTWVzc2FnZSwgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlLCBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UsIEdldENvZGVBY3Rpb25zTWVzc2FnZSwgU2V0V29ya3NwYWNlTWVzc2FnZSwgRXhlY3V0ZUNvbW1hbmRNZXNzYWdlLCBBcHBsaWVkRWRpdE1lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJkb2N1bWVudFVyaVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IGRvY3VtZW50SWRlbnRpZmllci5zZXNzaW9uSWQ7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRVcmkgPSBkb2N1bWVudElkZW50aWZpZXIuZG9jdW1lbnRVcmk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgfVxufVxuY2xhc3MgSW5pdE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgZm9ybWF0KXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZm9ybWF0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJmb3JtYXRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG59XG5jbGFzcyBDb21wbGV0ZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbXBsZXRlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmhvdmVyKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBWYWxpZGF0ZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUudmFsaWRhdGUpO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbHlEZWx0YSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTW9kZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU1vZGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU9wdGlvbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNsb3NlRG9jdW1lbnQpO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlQ29ubmVjdGlvbk1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jbG9zZUNvbm5lY3Rpb24pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgIH1cbn1cbmNsYXNzIEdsb2JhbE9wdGlvbnNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2Upe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nbG9iYWxPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29uZmlndXJlRmVhdHVyZXMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbn1cbmNsYXNzIFNpZ25hdHVyZUhlbHBNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zaWduYXR1cmVIZWxwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdldFNlbWFudGljVG9rZW5zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBHZXRDb2RlQWN0aW9uc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgY29udGV4dCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdldENvZGVBY3Rpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjb250ZXh0XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG59XG5jbGFzcyBTZXRXb3Jrc3BhY2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNldFdvcmtzcGFjZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRXhlY3V0ZUNvbW1hbmRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCwgY29tbWFuZCwgYXJncyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5leGVjdXRlQ29tbWFuZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiYXJnc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb21tYW5kO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cbn1cbmNsYXNzIEFwcGxpZWRFZGl0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmFwcGxpZWRFZGl0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbnZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbihNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaW5pdFwiXSA9IDBdID0gXCJpbml0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJmb3JtYXRcIl0gPSAxXSA9IFwiZm9ybWF0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb21wbGV0ZVwiXSA9IDJdID0gXCJjb21wbGV0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVzb2x2ZUNvbXBsZXRpb25cIl0gPSAzXSA9IFwicmVzb2x2ZUNvbXBsZXRpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZVwiXSA9IDRdID0gXCJjaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImhvdmVyXCJdID0gNV0gPSBcImhvdmVyXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJ2YWxpZGF0ZVwiXSA9IDZdID0gXCJ2YWxpZGF0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlEZWx0YVwiXSA9IDddID0gXCJhcHBseURlbHRhXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VNb2RlXCJdID0gOF0gPSBcImNoYW5nZU1vZGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU9wdGlvbnNcIl0gPSA5XSA9IFwiY2hhbmdlT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2xvc2VEb2N1bWVudFwiXSA9IDEwXSA9IFwiY2xvc2VEb2N1bWVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2xvYmFsT3B0aW9uc1wiXSA9IDExXSA9IFwiZ2xvYmFsT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29uZmlndXJlRmVhdHVyZXNcIl0gPSAxMl0gPSBcImNvbmZpZ3VyZUZlYXR1cmVzXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzaWduYXR1cmVIZWxwXCJdID0gMTNdID0gXCJzaWduYXR1cmVIZWxwXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkb2N1bWVudEhpZ2hsaWdodFwiXSA9IDE0XSA9IFwiZG9jdW1lbnRIaWdobGlnaHRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlQ29ubmVjdGlvblwiXSA9IDE1XSA9IFwiY2xvc2VDb25uZWN0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjYXBhYmlsaXRpZXNDaGFuZ2VcIl0gPSAxNl0gPSBcImNhcGFiaWxpdGllc0NoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2V0U2VtYW50aWNUb2tlbnNcIl0gPSAxN10gPSBcImdldFNlbWFudGljVG9rZW5zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnZXRDb2RlQWN0aW9uc1wiXSA9IDE4XSA9IFwiZ2V0Q29kZUFjdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImV4ZWN1dGVDb21tYW5kXCJdID0gMTldID0gXCJleGVjdXRlQ29tbWFuZFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlFZGl0XCJdID0gMjBdID0gXCJhcHBseUVkaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGxpZWRFZGl0XCJdID0gMjFdID0gXCJhcHBsaWVkRWRpdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2V0V29ya3NwYWNlXCJdID0gMjJdID0gXCJzZXRXb3Jrc3BhY2VcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDc3NzA6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIHJMOiAoKSA9PiAoLyogYmluZGluZyAqLyBtZXJnZU9iamVjdHMpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICB6MjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXksIGNvbnZlcnRUb1VyaSAqL1xuXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG4vL3Rha2VuIHdpdGggc21hbGwgY2hhbmdlcyBmcm9tIGFjZS1jb2RlXG5mdW5jdGlvbiBtZXJnZVJhbmdlcyhyYW5nZXMpIHtcbiAgICB2YXIgbGlzdCA9IHJhbmdlcztcbiAgICBsaXN0ID0gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVQb2ludHMoYS5zdGFydCwgYi5zdGFydCk7XG4gICAgfSk7XG4gICAgdmFyIG5leHQgPSBsaXN0WzBdLCByYW5nZTtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHJhbmdlID0gbmV4dDtcbiAgICAgICAgbmV4dCA9IGxpc3RbaV07XG4gICAgICAgIHZhciBjbXAgPSBjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5zdGFydCk7XG4gICAgICAgIGlmIChjbXAgPCAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNtcCA9PSAwICYmICFyYW5nZS5pc0VtcHR5KCkgJiYgIW5leHQuaXNFbXB0eSgpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LmVuZCkgPCAwKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gbmV4dC5lbmQucm93O1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IG5leHQuZW5kLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgbmV4dCA9IHJhbmdlO1xuICAgICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuZnVuY3Rpb24gY29tcGFyZVBvaW50cyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEucm93IC0gcDIucm93IHx8IHAxLmNvbHVtbiAtIHAyLmNvbHVtbjtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkodmFsdWUsIHJlZ2V4cEFycmF5KSB7XG4gICAgaWYgKCFyZWdleHBBcnJheSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWdleHBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChyZWdleHBBcnJheVtpXS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY29udmVydFRvVXJpKGZpbGVQYXRoKSB7XG4gICAgLy9hbHJlYWR5IFVSSVxuICAgIGlmIChmaWxlUGF0aC5zdGFydHNXaXRoKFwiZmlsZTovLy9cIikpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgIH1cbiAgICByZXR1cm4gVVJJLmZpbGUoZmlsZVBhdGgpLnRvU3RyaW5nKCk7XG59XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VNYW5hZ2VyOiAoKSA9PiAoLyogYmluZGluZyAqLyBTZXJ2aWNlTWFuYWdlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NzcwKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMDMyKTtcbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5jbGFzcyBTZXJ2aWNlTWFuYWdlciB7XG4gICAgYXN5bmMgZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgY2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLm1vZGUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZXJ2aWNlcykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHNlcnZpY2VzKS5yZWR1Y2UoKGFjYywga2V5KT0+e1xuICAgICAgICAgICAgICAgIHZhciBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSwgX3NlcnZpY2VzX2tleTtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9ICgoX3NlcnZpY2VzX2tleSA9IHNlcnZpY2VzW2tleV0pID09PSBudWxsIHx8IF9zZXJ2aWNlc19rZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19rZXkuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZUNhcGFiaWxpdGllcykgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSwgbWV0aG9kTmFtZSwgZG9jdW1lbnRJZGVudGlmaWVyLCBhdHRycykge1xuICAgICAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlW21ldGhvZE5hbWVdKGRvY3VtZW50SWRlbnRpZmllciwgLi4uYXR0cnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZVttZXRob2ROYW1lXShkb2N1bWVudElkZW50aWZpZXIsIGF0dHJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgYXBwbHlPcHRpb25zVG9TZXJ2aWNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBkb2N1bWVudFVyaSwgb3B0aW9ucykge1xuICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICBzZXJ2aWNlLnNldE9wdGlvbnMoZG9jdW1lbnRVcmksIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgY2xvc2VBbGxDb25uZWN0aW9ucygpIHtcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy4kc2VydmljZXM7XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIGF3YWl0ICgoX3NlcnZpY2VzX3NlcnZpY2VOYW1lID0gc2VydmljZXNbc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZS5jbG9zZUNvbm5lY3Rpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGFzeW5jICRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIGN0eCwgd29ya3NwYWNlVXJpKSB7XG4gICAgICAgIGxldCBtb2R1bGU7XG4gICAgICAgIGlmICgndHlwZScgaW4gc2VydmljZSkge1xuICAgICAgICAgICAgaWYgKFtcbiAgICAgICAgICAgICAgICBcInNvY2tldFwiLFxuICAgICAgICAgICAgICAgIFwid2Vid29ya2VyXCJcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoc2VydmljZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW1wiTGFuZ3VhZ2VDbGllbnRcIl0oc2VydmljZSwgY3R4LCB3b3Jrc3BhY2VVcmkpO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IFwiVW5rbm93biBzZXJ2aWNlIHR5cGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbc2VydmljZS5jbGFzc05hbWVdKHNlcnZpY2UubW9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2aWNlLm9wdGlvbnMgfHwgc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9vcHRpb25zLCBfcmVmO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucygoX3JlZiA9IChfc2VydmljZV9vcHRpb25zID0gc2VydmljZS5vcHRpb25zKSAhPT0gbnVsbCAmJiBfc2VydmljZV9vcHRpb25zICE9PSB2b2lkIDAgPyBfc2VydmljZV9vcHRpb25zIDogc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jICRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VydmljZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0gPSBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCB0aGlzLmN0eCwgdGhpcy53b3Jrc3BhY2VVcmkpLnRoZW4oKGluc3RhbmNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdOyAvLyBDbGVhbiB1cFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgIHNlcnZpY2Uub3B0aW9ucyA9IG1lcmdlID8gKDAsX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubWVyZ2VPYmplY3RzICovIC5yTCkob3B0aW9ucywgc2VydmljZS5vcHRpb25zKSA6IG9wdGlvbnM7XG4gICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFdvcmtzcGFjZSh3b3Jrc3BhY2VVcmkpIHtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VVcmkgPSB3b3Jrc3BhY2VVcmk7XG4gICAgICAgIE9iamVjdC52YWx1ZXModGhpcy4kc2VydmljZXMpLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgKF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZS5zZXRXb3Jrc3BhY2UodGhpcy53b3Jrc3BhY2VVcmkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoL2dvbGFuZyQvLCBcImdvXCIpO1xuICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCB0aGlzLiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNlcnZpY2VzKS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgbGV0IGRvY3VtZW50SXRlbSA9IHtcbiAgICAgICAgICAgIHVyaTogZG9jdW1lbnRJZGVudGlmaWVyLnVyaSxcbiAgICAgICAgICAgIHZlcnNpb246IGRvY3VtZW50SWRlbnRpZmllci52ZXJzaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2VJZDogbW9kZSxcbiAgICAgICAgICAgIHRleHQ6IGRvY3VtZW50VmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhzZXJ2aWNlcykuZm9yRWFjaCgoZWwpPT5lbC5zZXJ2aWNlSW5zdGFuY2UuYWRkRG9jdW1lbnQoZG9jdW1lbnRJdGVtKSk7XG4gICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50VXJpKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50VXJpXTtcbiAgICAgICAgaWYgKCFtb2RlKSByZXR1cm4gW107IC8vVE9ETzpcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5tYXAoKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGlmICghZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzO1xuICAgICAgICAgICAgc3dpdGNoKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJob3ZlclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmhvdmVyUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25SZXNvbHZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPSBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyKSA9PT0gbnVsbCB8fCBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIucmVzb2x2ZVByb3ZpZGVyKSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlIHx8IGNhcGFiaWxpdGllcy5kb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkaWFnbm9zdGljc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpZ25hdHVyZUhlbHBcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5zaWduYXR1cmVIZWxwUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkb2N1bWVudEhpZ2hsaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwic2VtYW50aWNUb2tlbnNcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5zZW1hbnRpY1Rva2Vuc1Byb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29kZUFjdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvZGVBY3Rpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImV4ZWN1dGVDb21tYW5kXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZXhlY3V0ZUNvbW1hbmRQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXNXaXRoTmFtZSA9IHt9O1xuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLiRzZXJ2aWNlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKT0+e1xuICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSB2YWx1ZS5tb2Rlcy5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5jbHVkZXMobW9kZSkpIHNlcnZpY2VzV2l0aE5hbWVba2V5XSA9IHRoaXMuJHNlcnZpY2VzW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VydmljZXNXaXRoTmFtZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKG5hbWUsIHNlcnZpY2UpIHtcbiAgICAgICAgc2VydmljZS5pZCA9IG5hbWU7XG4gICAgICAgIHNlcnZpY2UuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2UuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IHNlcnZpY2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmVyKG5hbWUsIGNsaWVudENvbmZpZykge1xuICAgICAgICBjbGllbnRDb25maWcuaWQgPSBuYW1lO1xuICAgICAgICBjbGllbnRDb25maWcuY2xhc3NOYW1lID0gXCJMYW5ndWFnZUNsaWVudFwiO1xuICAgICAgICBjbGllbnRDb25maWcuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGNsaWVudENvbmZpZy5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gY2xpZW50Q29uZmlnO1xuICAgIH1cbiAgICBjb25maWd1cmVGZWF0dXJlcyhuYW1lLCBmZWF0dXJlcykge1xuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoZmVhdHVyZXMpO1xuICAgICAgICBpZiAoIXRoaXMuJHNlcnZpY2VzW25hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdLmZlYXR1cmVzID0gZmVhdHVyZXM7XG4gICAgfVxuICAgIHNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2VGZWF0dXJlcykge1xuICAgICAgICB2YXIgX2ZlYXR1cmVzLCBfZmVhdHVyZXMxLCBfZmVhdHVyZXMyLCBfZmVhdHVyZXMzLCBfZmVhdHVyZXM0LCBfZmVhdHVyZXM1LCBfZmVhdHVyZXM2LCBfZmVhdHVyZXM3LCBfZmVhdHVyZXM4LCBfZmVhdHVyZXM5O1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zZW1hbnRpY1Rva2VucztcbiAgICAgICAgKF9zZW1hbnRpY1Rva2VucyA9IChfZmVhdHVyZXM3ID0gZmVhdHVyZXMpLnNlbWFudGljVG9rZW5zKSAhPT0gbnVsbCAmJiBfc2VtYW50aWNUb2tlbnMgIT09IHZvaWQgMCA/IF9zZW1hbnRpY1Rva2VucyA6IF9mZWF0dXJlczcuc2VtYW50aWNUb2tlbnMgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvZGVBY3Rpb247XG4gICAgICAgIChfY29kZUFjdGlvbiA9IChfZmVhdHVyZXM4ID0gZmVhdHVyZXMpLmNvZGVBY3Rpb24pICE9PSBudWxsICYmIF9jb2RlQWN0aW9uICE9PSB2b2lkIDAgPyBfY29kZUFjdGlvbiA6IF9mZWF0dXJlczguY29kZUFjdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfZXhlY3V0ZUNvbW1hbmQ7XG4gICAgICAgIChfZXhlY3V0ZUNvbW1hbmQgPSAoX2ZlYXR1cmVzOSA9IGZlYXR1cmVzKS5leGVjdXRlQ29tbWFuZCkgIT09IG51bGwgJiYgX2V4ZWN1dGVDb21tYW5kICE9PSB2b2lkIDAgPyBfZXhlY3V0ZUNvbW1hbmQgOiBfZmVhdHVyZXM5LmV4ZWN1dGVDb21tYW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihjdHgpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlcnZpY2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VJbml0UHJvbWlzZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlc3Npb25JRFRvTW9kZVwiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjdHhcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIndvcmtzcGFjZVVyaVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmlzTGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28udmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBkb2N1bWVudFVyaSBvZiBkb2N1bWVudFVyaXNMaXN0KXtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcbiAgICAgICAgICAgICAgICBsZXQgZGlhZ25vc3RpY3MgPSAoX3JlZiA9IGF3YWl0IFByb21pc2UuYWxsKHNlcnZpY2VzSW5zdGFuY2VzLm1hcCgoZWwpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5kb1ZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBkb2N1bWVudFVyaVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSkpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiBbXTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcImRvY3VtZW50VXJpXCJdID0gZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGRpYWdub3N0aWNzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UgPSBhc3luYyAoc2VydmljZU5hbWUpPT57XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZSkgYXdhaXQgZG9WYWxpZGF0aW9uKHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIGN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXYpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGV2LmRhdGE7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2Vfc2Vzc2lvbklkO1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRCA9IChfbWVzc2FnZV9zZXNzaW9uSWQgPSBtZXNzYWdlW1wic2Vzc2lvbklkXCJdKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9zZXNzaW9uSWQgIT09IHZvaWQgMCA/IF9tZXNzYWdlX3Nlc3Npb25JZCA6IFwiXCI7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2VfZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmkgPSAoX21lc3NhZ2VfZG9jdW1lbnRVcmkgPSBtZXNzYWdlW1wiZG9jdW1lbnRVcmlcIl0pICE9PSBudWxsICYmIF9tZXNzYWdlX2RvY3VtZW50VXJpICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9kb2N1bWVudFVyaSA6IFwiXCI7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IG1lc3NhZ2VbXCJ2ZXJzaW9uXCJdO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIFwiY2FsbGJhY2tJZFwiOiBtZXNzYWdlW1wiY2FsbGJhY2tJZFwiXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudFVyaSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogZG9jdW1lbnRVcmksXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28ucmVzb2x2ZUNvbXBsZXRpb246XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VOYW1lID0gbWVzc2FnZS52YWx1ZVtcInNlcnZpY2VcIl07XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCAoKF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uUmVzb2x2ZVwiKS5maW5kKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kLmRvUmVzb2x2ZShtZXNzYWdlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldFZhbHVlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uaG92ZXI6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJob3ZlclwiLCBcImRvSG92ZXJcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby52YWxpZGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmluaXQ6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuYWRkRG9jdW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZU1vZGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuY2hhbmdlRG9jdW1lbnRNb2RlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNsb3NlRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2xvc2VDb25uZWN0aW9uOlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQWxsQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIiwgXCJwcm92aWRlU2lnbmF0dXJlSGVscFwiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmRvY3VtZW50SGlnaGxpZ2h0OlxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0cyA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcImRvY3VtZW50SGlnaGxpZ2h0XCIsIFwiZmluZERvY3VtZW50SGlnaGxpZ2h0c1wiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gaGlnaGxpZ2h0cy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2V0U2VtYW50aWNUb2tlbnM6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNlbWFudGljVG9rZW5zXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZ2V0U2VtYW50aWNUb2tlbnMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdldENvZGVBY3Rpb25zOlxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBtZXNzYWdlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IG1lc3NhZ2UuY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvZGVBY3Rpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlQWN0aW9uczogYXdhaXQgc2VydmljZS5nZXRDb2RlQWN0aW9ucyhkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmV4ZWN1dGVDb21tYW5kOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuZXhlY3V0ZUNvbW1hbmQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5hcHBsaWVkRWRpdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEuc2VuZEFwcGxpZWRSZXN1bHQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5jYWxsYmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5zZXRXb3Jrc3BhY2U6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0V29ya3NwYWNlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZShwb3N0TWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbn0pOyJdLCJuYW1lcyI6WyJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImEiLCJpIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiR28iLCJNZXNzYWdlVHlwZSIsIl9kZWZpbmVfcHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQmFzZU1lc3NhZ2UiLCJjb25zdHJ1Y3RvciIsImRvY3VtZW50SWRlbnRpZmllciIsImNhbGxiYWNrSWQiLCJzZXNzaW9uSWQiLCJkb2N1bWVudFVyaSIsIkluaXRNZXNzYWdlIiwidmVyc2lvbiIsIm1vZGUiLCJvcHRpb25zIiwiaW5pdCIsIkZvcm1hdE1lc3NhZ2UiLCJmb3JtYXQiLCJDb21wbGV0ZU1lc3NhZ2UiLCJjb21wbGV0ZSIsIlJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSIsInJlc29sdmVDb21wbGV0aW9uIiwiSG92ZXJNZXNzYWdlIiwiaG92ZXIiLCJWYWxpZGF0ZU1lc3NhZ2UiLCJ2YWxpZGF0ZSIsIkNoYW5nZU1lc3NhZ2UiLCJjaGFuZ2UiLCJEZWx0YXNNZXNzYWdlIiwiYXBwbHlEZWx0YSIsIkNoYW5nZU1vZGVNZXNzYWdlIiwiY2hhbmdlTW9kZSIsIkNoYW5nZU9wdGlvbnNNZXNzYWdlIiwibWVyZ2UiLCJjaGFuZ2VPcHRpb25zIiwiQ2xvc2VEb2N1bWVudE1lc3NhZ2UiLCJjbG9zZURvY3VtZW50IiwiQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSIsImNsb3NlQ29ubmVjdGlvbiIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkdldFNlbWFudGljVG9rZW5zTWVzc2FnZSIsImdldFNlbWFudGljVG9rZW5zIiwiR2V0Q29kZUFjdGlvbnNNZXNzYWdlIiwiY29udGV4dCIsImdldENvZGVBY3Rpb25zIiwiU2V0V29ya3NwYWNlTWVzc2FnZSIsInNldFdvcmtzcGFjZSIsIkV4ZWN1dGVDb21tYW5kTWVzc2FnZSIsImNvbW1hbmQiLCJhcmdzIiwiZXhlY3V0ZUNvbW1hbmQiLCJBcHBsaWVkRWRpdE1lc3NhZ2UiLCJhcHBsaWVkRWRpdCIsInJMIiwibWVyZ2VPYmplY3RzIiwiejIiLCJub3RFbXB0eSIsIm9iajEiLCJvYmoyIiwiZXhjbHVkZVVuZGVmaW5lZCIsImV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMiLCJtZXJnZWRPYmplY3RzIiwia2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImZpbHRlcmVkRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJfIiwidW5kZWZpbmVkIiwiZnJvbUVudHJpZXMiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsImNvbnZlcnRUb1VyaSIsImZpbGVQYXRoIiwic3RhcnRzV2l0aCIsIlVSSSIsImZpbGUiLCJ0b1N0cmluZyIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJnZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2siLCJtZXNzYWdlIiwiY2FsbGJhY2siLCJzZXJ2aWNlcyIsInJlZHVjZSIsImFjYyIsIl9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX2tleSIsInNlcnZpY2VJbnN0YW5jZSIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzIiwic2VydmljZUluc3RhbmNlcyIsImZlYXR1cmUiLCJtZXRob2ROYW1lIiwiYXR0cnMiLCJQcm9taXNlIiwiYWxsIiwiZmlsdGVyQnlGZWF0dXJlIiwibWFwIiwic2VydmljZSIsImFwcGx5T3B0aW9uc1RvU2VydmljZXMiLCJmb3JFYWNoIiwic2V0T3B0aW9ucyIsImNsb3NlQWxsQ29ubmVjdGlvbnMiLCIkc2VydmljZXMiLCJfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lIiwiJGluaXRTZXJ2aWNlSW5zdGFuY2UiLCJjdHgiLCJ3b3Jrc3BhY2VVcmkiLCJpbmNsdWRlcyIsInR5cGUiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwiZmluZFNlcnZpY2VzQnlNb2RlIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCJ2YWx1ZXMiLCJfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UiLCJhZGREb2N1bWVudCIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJjaGFuZ2VEb2N1bWVudE1vZGUiLCJyZW1vdmVEb2N1bWVudCIsImRvY3VtZW50IiwiZ2V0U2VydmljZXNJbnN0YW5jZXMiLCJmZWF0dXJlcyIsImNhcGFiaWxpdGllcyIsImhvdmVyUHJvdmlkZXIiLCJjb21wbGV0aW9uUHJvdmlkZXIiLCJfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsImRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIiLCJkb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciIsImRpYWdub3N0aWNQcm92aWRlciIsInNpZ25hdHVyZUhlbHBQcm92aWRlciIsImRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIiLCJzZW1hbnRpY1Rva2Vuc1Byb3ZpZGVyIiwiY29kZUFjdGlvblByb3ZpZGVyIiwiZXhlY3V0ZUNvbW1hbmRQcm92aWRlciIsInNlcnZpY2VzV2l0aE5hbWUiLCJleHRlbnNpb25zIiwic3BsaXQiLCJyZWdpc3RlclNlcnZpY2UiLCJuYW1lIiwic2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUiLCJyZWdpc3RlclNlcnZlciIsImNsaWVudENvbmZpZyIsInNlcnZpY2VGZWF0dXJlcyIsIl9mZWF0dXJlcyIsIl9mZWF0dXJlczEiLCJfZmVhdHVyZXMyIiwiX2ZlYXR1cmVzMyIsIl9mZWF0dXJlczQiLCJfZmVhdHVyZXM1IiwiX2ZlYXR1cmVzNiIsIl9mZWF0dXJlczciLCJfZmVhdHVyZXM4IiwiX2ZlYXR1cmVzOSIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJfc2VtYW50aWNUb2tlbnMiLCJzZW1hbnRpY1Rva2VucyIsIl9jb2RlQWN0aW9uIiwiY29kZUFjdGlvbiIsIl9leGVjdXRlQ29tbWFuZCIsImRvVmFsaWRhdGlvbiIsInNlcnZpY2VzSW5zdGFuY2VzIiwiZG9jdW1lbnRVcmlzTGlzdCIsImRvY3VtZW50cyIsInBvc3RNZXNzYWdlIiwiZmxhdCIsInByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsInNlc3Npb25JRCIsIl9tZXNzYWdlX2RvY3VtZW50VXJpIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQiLCJmaW5kIiwiZG9SZXNvbHZlIiwic2V0VmFsdWUiLCJhcHBseURlbHRhcyIsImJpbmQiLCJoaWdobGlnaHRzIiwiY29kZUFjdGlvbnMiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEiLCJzZW5kQXBwbGllZFJlc3VsdCJdLCJzb3VyY2VSb290IjoiIn0=