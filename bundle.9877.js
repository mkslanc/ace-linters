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
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, CloseConnectionMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage, GetSemanticTokensMessage, GetCodeActionsMessage, SetWorkspaceMessage, ExecuteCommandMessage, AppliedEditMessage, RenameDocumentMessage */ function _define_property(obj, key, value) {
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
                class RenameDocumentMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value, version){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.renameDocument);
                        _define_property(this, "value", void 0);
                        _define_property(this, "version", void 0);
                        this.value = value;
                        this.version = version;
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
                    MessageType[MessageType["renameDocument"] = 23] = "renameDocument";
                })(MessageType || (MessageType = {}));
            /***/ },
            /***/ 7770: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_15560__)=>{
                /* harmony export */ __nested_webpack_require_15560__.d(__nested_webpack_exports__, {
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
        /******/ function __nested_webpack_require_19783__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_19783__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_19783__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_19783__.o(definition, key) && !__nested_webpack_require_19783__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_19783__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_19783__.r = (exports1)=>{
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
        __nested_webpack_require_19783__.r(__nested_webpack_exports__);
        /* harmony export */ __nested_webpack_require_19783__.d(__nested_webpack_exports__, {
            /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
        });
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_19783__(7770);
        /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_19783__(2032);
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
            async renameDocument(documentIdentifier, newDocumentUri) {
                let services = this.getServicesInstances(documentIdentifier.uri);
                if (services.length > 0) {
                    services.forEach((el)=>el.renameDocument(documentIdentifier, newDocumentUri));
                    this.$sessionIDToMode[newDocumentUri] = this.$sessionIDToMode[documentIdentifier.uri];
                    delete this.$sessionIDToMode[documentIdentifier.uri];
                }
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
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.renameDocument:
                            this.renameDocument(documentIdentifier, message.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNwQjtZQUNKO1FBQ0o7UUFFQSxNQUFNLEdBQUksT0FBT3hQLDBCQUFtQkE7SUFDcEMsTUFBTSxHQUFHO0FBRVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvYWNlLWxpbnRlcnMvYnVpbGQvc2VydmljZS1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gLyoqKioqKi8gKCgpID0+IHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyAyMDMyOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBHbzogKCkgPT4gKC8qIGJpbmRpbmcgKi8gTWVzc2FnZVR5cGUpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgQmFzZU1lc3NhZ2UsIEluaXRNZXNzYWdlLCBGb3JtYXRNZXNzYWdlLCBDb21wbGV0ZU1lc3NhZ2UsIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSwgSG92ZXJNZXNzYWdlLCBWYWxpZGF0ZU1lc3NhZ2UsIENoYW5nZU1lc3NhZ2UsIERlbHRhc01lc3NhZ2UsIENoYW5nZU1vZGVNZXNzYWdlLCBDaGFuZ2VPcHRpb25zTWVzc2FnZSwgQ2xvc2VEb2N1bWVudE1lc3NhZ2UsIENsb3NlQ29ubmVjdGlvbk1lc3NhZ2UsIEdsb2JhbE9wdGlvbnNNZXNzYWdlLCBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UsIFNpZ25hdHVyZUhlbHBNZXNzYWdlLCBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UsIEdldFNlbWFudGljVG9rZW5zTWVzc2FnZSwgR2V0Q29kZUFjdGlvbnNNZXNzYWdlLCBTZXRXb3Jrc3BhY2VNZXNzYWdlLCBFeGVjdXRlQ29tbWFuZE1lc3NhZ2UsIEFwcGxpZWRFZGl0TWVzc2FnZSwgUmVuYW1lRG9jdW1lbnRNZXNzYWdlICovXG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5jbGFzcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlc3Npb25JZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiZG9jdW1lbnRVcmlcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBkb2N1bWVudElkZW50aWZpZXIuc2Vzc2lvbklkO1xuICAgICAgICB0aGlzLmRvY3VtZW50VXJpID0gZG9jdW1lbnRJZGVudGlmaWVyLmRvY3VtZW50VXJpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUsIG9wdGlvbnMpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5pbml0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBGb3JtYXRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmZvcm1hdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiZm9ybWF0XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxufVxuY2xhc3MgQ29tcGxldGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZXNvbHZlQ29tcGxldGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgSG92ZXJNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5ob3Zlcik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgVmFsaWRhdGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIERlbHRhc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmFwcGx5RGVsdGEpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1vZGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2Upe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDbG9zZURvY3VtZW50TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jbG9zZURvY3VtZW50KTtcbiAgICB9XG59XG5jbGFzcyBDbG9zZUNvbm5lY3Rpb25NZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VDb25uZWN0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICB9XG59XG5jbGFzcyBHbG9iYWxPcHRpb25zTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2xvYmFsT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbmZpZ3VyZUZlYXR1cmVzKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG59XG5jbGFzcyBTaWduYXR1cmVIZWxwTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5kb2N1bWVudEhpZ2hsaWdodCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgR2V0U2VtYW50aWNUb2tlbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nZXRTZW1hbnRpY1Rva2Vucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgR2V0Q29kZUFjdGlvbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIGNvbnRleHQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nZXRDb2RlQWN0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY29udGV4dFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxufVxuY2xhc3MgU2V0V29ya3NwYWNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zZXRXb3Jrc3BhY2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEV4ZWN1dGVDb21tYW5kTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIGNhbGxiYWNrSWQsIGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZXhlY3V0ZUNvbW1hbmQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImFyZ3NcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29tbWFuZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBBcHBsaWVkRWRpdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBsaWVkRWRpdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBSZW5hbWVEb2N1bWVudE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlbmFtZURvY3VtZW50KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24oTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZm9ybWF0XCJdID0gMV0gPSBcImZvcm1hdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29tcGxldGVcIl0gPSAyXSA9IFwiY29tcGxldGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlc29sdmVDb21wbGV0aW9uXCJdID0gM10gPSBcInJlc29sdmVDb21wbGV0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VcIl0gPSA0XSA9IFwiY2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJob3ZlclwiXSA9IDVdID0gXCJob3ZlclwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1widmFsaWRhdGVcIl0gPSA2XSA9IFwidmFsaWRhdGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RGVsdGFcIl0gPSA3XSA9IFwiYXBwbHlEZWx0YVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlTW9kZVwiXSA9IDhdID0gXCJjaGFuZ2VNb2RlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VPcHRpb25zXCJdID0gOV0gPSBcImNoYW5nZU9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlRG9jdW1lbnRcIl0gPSAxMF0gPSBcImNsb3NlRG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdsb2JhbE9wdGlvbnNcIl0gPSAxMV0gPSBcImdsb2JhbE9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbmZpZ3VyZUZlYXR1cmVzXCJdID0gMTJdID0gXCJjb25maWd1cmVGZWF0dXJlc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2lnbmF0dXJlSGVscFwiXSA9IDEzXSA9IFwic2lnbmF0dXJlSGVscFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZG9jdW1lbnRIaWdobGlnaHRcIl0gPSAxNF0gPSBcImRvY3VtZW50SGlnaGxpZ2h0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjbG9zZUNvbm5lY3Rpb25cIl0gPSAxNV0gPSBcImNsb3NlQ29ubmVjdGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2FwYWJpbGl0aWVzQ2hhbmdlXCJdID0gMTZdID0gXCJjYXBhYmlsaXRpZXNDaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdldFNlbWFudGljVG9rZW5zXCJdID0gMTddID0gXCJnZXRTZW1hbnRpY1Rva2Vuc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2V0Q29kZUFjdGlvbnNcIl0gPSAxOF0gPSBcImdldENvZGVBY3Rpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJleGVjdXRlQ29tbWFuZFwiXSA9IDE5XSA9IFwiZXhlY3V0ZUNvbW1hbmRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RWRpdFwiXSA9IDIwXSA9IFwiYXBwbHlFZGl0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBsaWVkRWRpdFwiXSA9IDIxXSA9IFwiYXBwbGllZEVkaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNldFdvcmtzcGFjZVwiXSA9IDIyXSA9IFwic2V0V29ya3NwYWNlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZW5hbWVEb2N1bWVudFwiXSA9IDIzXSA9IFwicmVuYW1lRG9jdW1lbnRcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDc3NzA6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIHJMOiAoKSA9PiAoLyogYmluZGluZyAqLyBtZXJnZU9iamVjdHMpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICB6MjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXksIGNvbnZlcnRUb1VyaSAqL1xuXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG4vL3Rha2VuIHdpdGggc21hbGwgY2hhbmdlcyBmcm9tIGFjZS1jb2RlXG5mdW5jdGlvbiBtZXJnZVJhbmdlcyhyYW5nZXMpIHtcbiAgICB2YXIgbGlzdCA9IHJhbmdlcztcbiAgICBsaXN0ID0gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVQb2ludHMoYS5zdGFydCwgYi5zdGFydCk7XG4gICAgfSk7XG4gICAgdmFyIG5leHQgPSBsaXN0WzBdLCByYW5nZTtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHJhbmdlID0gbmV4dDtcbiAgICAgICAgbmV4dCA9IGxpc3RbaV07XG4gICAgICAgIHZhciBjbXAgPSBjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5zdGFydCk7XG4gICAgICAgIGlmIChjbXAgPCAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNtcCA9PSAwICYmICFyYW5nZS5pc0VtcHR5KCkgJiYgIW5leHQuaXNFbXB0eSgpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LmVuZCkgPCAwKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gbmV4dC5lbmQucm93O1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IG5leHQuZW5kLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgbmV4dCA9IHJhbmdlO1xuICAgICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuZnVuY3Rpb24gY29tcGFyZVBvaW50cyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEucm93IC0gcDIucm93IHx8IHAxLmNvbHVtbiAtIHAyLmNvbHVtbjtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkodmFsdWUsIHJlZ2V4cEFycmF5KSB7XG4gICAgaWYgKCFyZWdleHBBcnJheSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWdleHBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChyZWdleHBBcnJheVtpXS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY29udmVydFRvVXJpKGZpbGVQYXRoKSB7XG4gICAgLy9hbHJlYWR5IFVSSVxuICAgIGlmIChmaWxlUGF0aC5zdGFydHNXaXRoKFwiZmlsZTovLy9cIikpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgIH1cbiAgICByZXR1cm4gVVJJLmZpbGUoZmlsZVBhdGgpLnRvU3RyaW5nKCk7XG59XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFNlcnZpY2VNYW5hZ2VyOiAoKSA9PiAoLyogYmluZGluZyAqLyBTZXJ2aWNlTWFuYWdlcilcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NzcwKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMDMyKTtcbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuXG5jbGFzcyBTZXJ2aWNlTWFuYWdlciB7XG4gICAgYXN5bmMgZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgY2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLm1vZGUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZXJ2aWNlcykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHNlcnZpY2VzKS5yZWR1Y2UoKGFjYywga2V5KT0+e1xuICAgICAgICAgICAgICAgIHZhciBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSwgX3NlcnZpY2VzX2tleTtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9ICgoX3NlcnZpY2VzX2tleSA9IHNlcnZpY2VzW2tleV0pID09PSBudWxsIHx8IF9zZXJ2aWNlc19rZXkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19rZXkuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZUNhcGFiaWxpdGllcykgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSwgbWV0aG9kTmFtZSwgZG9jdW1lbnRJZGVudGlmaWVyLCBhdHRycykge1xuICAgICAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlW21ldGhvZE5hbWVdKGRvY3VtZW50SWRlbnRpZmllciwgLi4uYXR0cnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZVttZXRob2ROYW1lXShkb2N1bWVudElkZW50aWZpZXIsIGF0dHJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgYXBwbHlPcHRpb25zVG9TZXJ2aWNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBkb2N1bWVudFVyaSwgb3B0aW9ucykge1xuICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICBzZXJ2aWNlLnNldE9wdGlvbnMoZG9jdW1lbnRVcmksIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgY2xvc2VBbGxDb25uZWN0aW9ucygpIHtcbiAgICAgICAgdmFyIHNlcnZpY2VzID0gdGhpcy4kc2VydmljZXM7XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIGF3YWl0ICgoX3NlcnZpY2VzX3NlcnZpY2VOYW1lID0gc2VydmljZXNbc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZS5jbG9zZUNvbm5lY3Rpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGFzeW5jICRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIGN0eCwgd29ya3NwYWNlVXJpKSB7XG4gICAgICAgIGxldCBtb2R1bGU7XG4gICAgICAgIGlmICgndHlwZScgaW4gc2VydmljZSkge1xuICAgICAgICAgICAgaWYgKFtcbiAgICAgICAgICAgICAgICBcInNvY2tldFwiLFxuICAgICAgICAgICAgICAgIFwid2Vid29ya2VyXCJcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoc2VydmljZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW1wiTGFuZ3VhZ2VDbGllbnRcIl0oc2VydmljZSwgY3R4LCB3b3Jrc3BhY2VVcmkpO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IFwiVW5rbm93biBzZXJ2aWNlIHR5cGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHNlcnZpY2UubW9kdWxlKCk7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbc2VydmljZS5jbGFzc05hbWVdKHNlcnZpY2UubW9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2aWNlLm9wdGlvbnMgfHwgc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9vcHRpb25zLCBfcmVmO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucygoX3JlZiA9IChfc2VydmljZV9vcHRpb25zID0gc2VydmljZS5vcHRpb25zKSAhPT0gbnVsbCAmJiBfc2VydmljZV9vcHRpb25zICE9PSB2b2lkIDAgPyBfc2VydmljZV9vcHRpb25zIDogc2VydmljZS5pbml0aWFsaXphdGlvbk9wdGlvbnMpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jICRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VydmljZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgc2VydmljZU5hbWUgaW4gc2VydmljZXMpe1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplU2VydmljZShzZXJ2aWNlTmFtZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF0gPSBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCB0aGlzLmN0eCwgdGhpcy53b3Jrc3BhY2VVcmkpLnRoZW4oKGluc3RhbmNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdOyAvLyBDbGVhbiB1cFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgIHNlcnZpY2Uub3B0aW9ucyA9IG1lcmdlID8gKDAsX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubWVyZ2VPYmplY3RzICovIC5yTCkob3B0aW9ucywgc2VydmljZS5vcHRpb25zKSA6IG9wdGlvbnM7XG4gICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFdvcmtzcGFjZSh3b3Jrc3BhY2VVcmkpIHtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VVcmkgPSB3b3Jrc3BhY2VVcmk7XG4gICAgICAgIE9iamVjdC52YWx1ZXModGhpcy4kc2VydmljZXMpLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgKF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZS5zZXRXb3Jrc3BhY2UodGhpcy53b3Jrc3BhY2VVcmkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoL2dvbGFuZyQvLCBcImdvXCIpO1xuICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCB0aGlzLiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNlcnZpY2VzKS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgbGV0IGRvY3VtZW50SXRlbSA9IHtcbiAgICAgICAgICAgIHVyaTogZG9jdW1lbnRJZGVudGlmaWVyLnVyaSxcbiAgICAgICAgICAgIHZlcnNpb246IGRvY3VtZW50SWRlbnRpZmllci52ZXJzaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2VJZDogbW9kZSxcbiAgICAgICAgICAgIHRleHQ6IGRvY3VtZW50VmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhzZXJ2aWNlcykuZm9yRWFjaCgoZWwpPT5lbC5zZXJ2aWNlSW5zdGFuY2UuYWRkRG9jdW1lbnQoZG9jdW1lbnRJdGVtKSk7XG4gICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICB9XG4gICAgYXN5bmMgcmVuYW1lRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBuZXdEb2N1bWVudFVyaSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50SWRlbnRpZmllci51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW5hbWVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG5ld0RvY3VtZW50VXJpKSk7XG4gICAgICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbbmV3RG9jdW1lbnRVcmldID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50SWRlbnRpZmllci51cmldO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVEb2N1bWVudChkb2N1bWVudCkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbW92ZURvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50LnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnRVcmkpIHtcbiAgICAgICAgbGV0IG1vZGUgPSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRVcmldO1xuICAgICAgICBpZiAoIW1vZGUpIHJldHVybiBbXTsgLy9UT0RPOlxuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoc2VydmljZXMpLm1hcCgoZWwpPT5lbC5zZXJ2aWNlSW5zdGFuY2UpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgIH1cbiAgICBmaWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gc2VydmljZUluc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgaWYgKCFlbC5zZXJ2aWNlRGF0YS5mZWF0dXJlc1tmZWF0dXJlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhcGFiaWxpdGllcyA9IGVsLnNlcnZpY2VDYXBhYmlsaXRpZXM7XG4gICAgICAgICAgICBzd2l0Y2goZmVhdHVyZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhvdmVyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuaG92ZXJQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblJlc29sdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKChfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9IGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIpID09PSBudWxsIHx8IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlci5yZXNvbHZlUHJvdmlkZXIpID09PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JtYXRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWUgfHwgY2FwYWJpbGl0aWVzLmRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRpYWdub3N0aWNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZGlhZ25vc3RpY1Byb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwic2lnbmF0dXJlSGVscFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLnNpZ25hdHVyZUhlbHBQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50SGlnaGxpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzZW1hbnRpY1Rva2Vuc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLnNlbWFudGljVG9rZW5zUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb2RlQWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuY29kZUFjdGlvblByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXhlY3V0ZUNvbW1hbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5leGVjdXRlQ29tbWFuZFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlc1dpdGhOYW1lID0ge307XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuJHNlcnZpY2VzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pPT57XG4gICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLm1vZGVzLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmNsdWRlcyhtb2RlKSkgc2VydmljZXNXaXRoTmFtZVtrZXldID0gdGhpcy4kc2VydmljZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlc1dpdGhOYW1lO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczYsIF9mZWF0dXJlczcsIF9mZWF0dXJlczgsIF9mZWF0dXJlczk7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICB2YXIgX3NlbWFudGljVG9rZW5zO1xuICAgICAgICAoX3NlbWFudGljVG9rZW5zID0gKF9mZWF0dXJlczcgPSBmZWF0dXJlcykuc2VtYW50aWNUb2tlbnMpICE9PSBudWxsICYmIF9zZW1hbnRpY1Rva2VucyAhPT0gdm9pZCAwID8gX3NlbWFudGljVG9rZW5zIDogX2ZlYXR1cmVzNy5zZW1hbnRpY1Rva2VucyA9IHRydWU7XG4gICAgICAgIHZhciBfY29kZUFjdGlvbjtcbiAgICAgICAgKF9jb2RlQWN0aW9uID0gKF9mZWF0dXJlczggPSBmZWF0dXJlcykuY29kZUFjdGlvbikgIT09IG51bGwgJiYgX2NvZGVBY3Rpb24gIT09IHZvaWQgMCA/IF9jb2RlQWN0aW9uIDogX2ZlYXR1cmVzOC5jb2RlQWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9leGVjdXRlQ29tbWFuZDtcbiAgICAgICAgKF9leGVjdXRlQ29tbWFuZCA9IChfZmVhdHVyZXM5ID0gZmVhdHVyZXMpLmV4ZWN1dGVDb21tYW5kKSAhPT0gbnVsbCAmJiBfZXhlY3V0ZUNvbW1hbmQgIT09IHZvaWQgMCA/IF9leGVjdXRlQ29tbWFuZCA6IF9mZWF0dXJlczkuZXhlY3V0ZUNvbW1hbmQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZUluaXRQcm9taXNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2Vzc2lvbklEVG9Nb2RlXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImN0eFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwid29ya3NwYWNlVXJpXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICBsZXQgZG9WYWxpZGF0aW9uID0gYXN5bmMgKGRvY3VtZW50LCBzZXJ2aWNlc0luc3RhbmNlcyk9PntcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzICE9PSBudWxsICYmIHNlcnZpY2VzSW5zdGFuY2VzICE9PSB2b2lkIDAgPyBzZXJ2aWNlc0luc3RhbmNlcyA6IHNlcnZpY2VzSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGhpcyBpcyBsaXN0IG9mIGRvY3VtZW50cyBsaW5rZWQgdG8gc2VydmljZXNcbiAgICAgICAgICAgIGxldCBkb2N1bWVudFVyaXNMaXN0ID0gT2JqZWN0LmtleXMoc2VydmljZXNJbnN0YW5jZXNbMF0uZG9jdW1lbnRzKTtcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZXNJbnN0YW5jZXMsIFwiZGlhZ25vc3RpY3NcIik7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHNlcnZpY2VzSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLnNlcnZpY2VDYXBhYmlsaXRpZXMuZGlhZ25vc3RpY1Byb3ZpZGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby52YWxpZGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGRvY3VtZW50VXJpIG9mIGRvY3VtZW50VXJpc0xpc3Qpe1xuICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuICAgICAgICAgICAgICAgIGxldCBkaWFnbm9zdGljcyA9IChfcmVmID0gYXdhaXQgUHJvbWlzZS5hbGwoc2VydmljZXNJbnN0YW5jZXMubWFwKChlbCk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLmRvVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmk6IGRvY3VtZW50VXJpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wiZG9jdW1lbnRVcmlcIl0gPSBkb2N1bWVudFVyaTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gZGlhZ25vc3RpY3MuZmxhdCgpO1xuICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZShwb3N0TWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSA9IGFzeW5jIChzZXJ2aWNlTmFtZSk9PntcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgc2VydmljZUluc3RhbmNlID0gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlKSBhd2FpdCBkb1ZhbGlkYXRpb24odW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFzeW5jIChldik9PntcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXYuZGF0YTtcbiAgICAgICAgICAgIHZhciBfbWVzc2FnZV9zZXNzaW9uSWQ7XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklEID0gKF9tZXNzYWdlX3Nlc3Npb25JZCA9IG1lc3NhZ2VbXCJzZXNzaW9uSWRcIl0pICE9PSBudWxsICYmIF9tZXNzYWdlX3Nlc3Npb25JZCAhPT0gdm9pZCAwID8gX21lc3NhZ2Vfc2Vzc2lvbklkIDogXCJcIjtcbiAgICAgICAgICAgIHZhciBfbWVzc2FnZV9kb2N1bWVudFVyaTtcbiAgICAgICAgICAgIGxldCBkb2N1bWVudFVyaSA9IChfbWVzc2FnZV9kb2N1bWVudFVyaSA9IG1lc3NhZ2VbXCJkb2N1bWVudFVyaVwiXSkgIT09IG51bGwgJiYgX21lc3NhZ2VfZG9jdW1lbnRVcmkgIT09IHZvaWQgMCA/IF9tZXNzYWdlX2RvY3VtZW50VXJpIDogXCJcIjtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gbWVzc2FnZVtcInZlcnNpb25cIl07XG4gICAgICAgICAgICBsZXQgcG9zdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IG1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICAgICBcInNlc3Npb25JZFwiOiBzZXNzaW9uSUQsXG4gICAgICAgICAgICAgICAgXCJjYWxsYmFja0lkXCI6IG1lc3NhZ2VbXCJjYWxsYmFja0lkXCJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50VXJpKTtcbiAgICAgICAgICAgIGxldCBkb2N1bWVudElkZW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgdXJpOiBkb2N1bWVudFVyaSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoKG1lc3NhZ2UudHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5mb3JtYXQ6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2UgdG8gZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgc2VydmljZUluc3RhbmNlc1swXS5mb3JtYXQoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jb21wbGV0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uczogYXdhaXQgc2VydmljZS5kb0NvbXBsZXRlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5yZXNvbHZlQ29tcGxldGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmljZU5hbWUgPSBtZXNzYWdlLnZhbHVlW1wic2VydmljZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uYXBwbHlEZWx0YTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5hcHBseURlbHRhcyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5ob3ZlcjpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcImhvdmVyXCIsIFwiZG9Ib3ZlclwiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnZhbGlkYXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uaW5pdDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgdGhpcy5hZGREb2N1bWVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlTW9kZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZSwgdGhpcy5jaGFuZ2VEb2N1bWVudE1vZGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZU9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlPcHRpb25zVG9TZXJ2aWNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBkb2N1bWVudFVyaSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2xvc2VEb2N1bWVudDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jbG9zZUNvbm5lY3Rpb246XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xvc2VBbGxDb25uZWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdsb2JhbE9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2xvYmFsT3B0aW9ucyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMsIG1lc3NhZ2UubWVyZ2UpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jb25maWd1cmVGZWF0dXJlczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmVGZWF0dXJlcyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5zaWduYXR1cmVIZWxwOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5hZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIFwic2lnbmF0dXJlSGVscFwiLCBcInByb3ZpZGVTaWduYXR1cmVIZWxwXCIsIGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZG9jdW1lbnRIaWdobGlnaHQ6XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdobGlnaHRzID0gYXdhaXQgdGhpcy5hZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIFwiZG9jdW1lbnRIaWdobGlnaHRcIiwgXCJmaW5kRG9jdW1lbnRIaWdobGlnaHRzXCIsIGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBoaWdobGlnaHRzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nZXRTZW1hbnRpY1Rva2VuczpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwic2VtYW50aWNUb2tlbnNcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgc2VydmljZUluc3RhbmNlc1swXS5nZXRTZW1hbnRpY1Rva2Vucyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2V0Q29kZUFjdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IG1lc3NhZ2UudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gbWVzc2FnZS5jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29kZUFjdGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVBY3Rpb25zOiBhd2FpdCBzZXJ2aWNlLmdldENvZGVBY3Rpb25zKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZXhlY3V0ZUNvbW1hbmQ6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lID0gdGhpcy4kc2VydmljZXNbbWVzc2FnZS5zZXJ2aWNlTmFtZV0pID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID0gX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZS5leGVjdXRlQ29tbWFuZChtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmFwcGxpZWRFZGl0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxID0gX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMS5zZW5kQXBwbGllZFJlc3VsdChtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmNhbGxiYWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNldFdvcmtzcGFjZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRXb3Jrc3BhY2UobWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28ucmVuYW1lRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuYW1lRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkdvIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJkb2N1bWVudElkZW50aWZpZXIiLCJjYWxsYmFja0lkIiwic2Vzc2lvbklkIiwiZG9jdW1lbnRVcmkiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UiLCJyZXNvbHZlQ29tcGxldGlvbiIsIkhvdmVyTWVzc2FnZSIsImhvdmVyIiwiVmFsaWRhdGVNZXNzYWdlIiwidmFsaWRhdGUiLCJDaGFuZ2VNZXNzYWdlIiwiY2hhbmdlIiwiRGVsdGFzTWVzc2FnZSIsImFwcGx5RGVsdGEiLCJDaGFuZ2VNb2RlTWVzc2FnZSIsImNoYW5nZU1vZGUiLCJDaGFuZ2VPcHRpb25zTWVzc2FnZSIsIm1lcmdlIiwiY2hhbmdlT3B0aW9ucyIsIkNsb3NlRG9jdW1lbnRNZXNzYWdlIiwiY2xvc2VEb2N1bWVudCIsIkNsb3NlQ29ubmVjdGlvbk1lc3NhZ2UiLCJjbG9zZUNvbm5lY3Rpb24iLCJHbG9iYWxPcHRpb25zTWVzc2FnZSIsInNlcnZpY2VOYW1lIiwiZ2xvYmFsT3B0aW9ucyIsIkNvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSIsImNvbmZpZ3VyZUZlYXR1cmVzIiwiU2lnbmF0dXJlSGVscE1lc3NhZ2UiLCJzaWduYXR1cmVIZWxwIiwiRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIiwiZG9jdW1lbnRIaWdobGlnaHQiLCJHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UiLCJnZXRTZW1hbnRpY1Rva2VucyIsIkdldENvZGVBY3Rpb25zTWVzc2FnZSIsImNvbnRleHQiLCJnZXRDb2RlQWN0aW9ucyIsIlNldFdvcmtzcGFjZU1lc3NhZ2UiLCJzZXRXb3Jrc3BhY2UiLCJFeGVjdXRlQ29tbWFuZE1lc3NhZ2UiLCJjb21tYW5kIiwiYXJncyIsImV4ZWN1dGVDb21tYW5kIiwiQXBwbGllZEVkaXRNZXNzYWdlIiwiYXBwbGllZEVkaXQiLCJSZW5hbWVEb2N1bWVudE1lc3NhZ2UiLCJyZW5hbWVEb2N1bWVudCIsInJMIiwibWVyZ2VPYmplY3RzIiwiejIiLCJub3RFbXB0eSIsIm9iajEiLCJvYmoyIiwiZXhjbHVkZVVuZGVmaW5lZCIsImV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMiLCJtZXJnZWRPYmplY3RzIiwia2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImZpbHRlcmVkRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJfIiwidW5kZWZpbmVkIiwiZnJvbUVudHJpZXMiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsImNvbnZlcnRUb1VyaSIsImZpbGVQYXRoIiwic3RhcnRzV2l0aCIsIlVSSSIsImZpbGUiLCJ0b1N0cmluZyIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJnZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2siLCJtZXNzYWdlIiwiY2FsbGJhY2siLCJzZXJ2aWNlcyIsInJlZHVjZSIsImFjYyIsIl9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX2tleSIsInNlcnZpY2VJbnN0YW5jZSIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzIiwic2VydmljZUluc3RhbmNlcyIsImZlYXR1cmUiLCJtZXRob2ROYW1lIiwiYXR0cnMiLCJQcm9taXNlIiwiYWxsIiwiZmlsdGVyQnlGZWF0dXJlIiwibWFwIiwic2VydmljZSIsImFwcGx5T3B0aW9uc1RvU2VydmljZXMiLCJmb3JFYWNoIiwic2V0T3B0aW9ucyIsImNsb3NlQWxsQ29ubmVjdGlvbnMiLCIkc2VydmljZXMiLCJfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lIiwiJGluaXRTZXJ2aWNlSW5zdGFuY2UiLCJjdHgiLCJ3b3Jrc3BhY2VVcmkiLCJpbmNsdWRlcyIsInR5cGUiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwiZmluZFNlcnZpY2VzQnlNb2RlIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCJ2YWx1ZXMiLCJfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UiLCJhZGREb2N1bWVudCIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJuZXdEb2N1bWVudFVyaSIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwiaG92ZXJQcm92aWRlciIsImNvbXBsZXRpb25Qcm92aWRlciIsIl9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciIsImRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyIiwiZGlhZ25vc3RpY1Byb3ZpZGVyIiwic2lnbmF0dXJlSGVscFByb3ZpZGVyIiwiZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciIsInNlbWFudGljVG9rZW5zUHJvdmlkZXIiLCJjb2RlQWN0aW9uUHJvdmlkZXIiLCJleGVjdXRlQ29tbWFuZFByb3ZpZGVyIiwic2VydmljZXNXaXRoTmFtZSIsImV4dGVuc2lvbnMiLCJzcGxpdCIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInJlZ2lzdGVyU2VydmVyIiwiY2xpZW50Q29uZmlnIiwic2VydmljZUZlYXR1cmVzIiwiX2ZlYXR1cmVzIiwiX2ZlYXR1cmVzMSIsIl9mZWF0dXJlczIiLCJfZmVhdHVyZXMzIiwiX2ZlYXR1cmVzNCIsIl9mZWF0dXJlczUiLCJfZmVhdHVyZXM2IiwiX2ZlYXR1cmVzNyIsIl9mZWF0dXJlczgiLCJfZmVhdHVyZXM5IiwiX2hvdmVyIiwiX2NvbXBsZXRpb24iLCJjb21wbGV0aW9uIiwiX2NvbXBsZXRpb25SZXNvbHZlIiwiY29tcGxldGlvblJlc29sdmUiLCJfZm9ybWF0IiwiX2RpYWdub3N0aWNzIiwiZGlhZ25vc3RpY3MiLCJfc2lnbmF0dXJlSGVscCIsIl9kb2N1bWVudEhpZ2hsaWdodCIsIl9zZW1hbnRpY1Rva2VucyIsInNlbWFudGljVG9rZW5zIiwiX2NvZGVBY3Rpb24iLCJjb2RlQWN0aW9uIiwiX2V4ZWN1dGVDb21tYW5kIiwiZG9WYWxpZGF0aW9uIiwic2VydmljZXNJbnN0YW5jZXMiLCJkb2N1bWVudFVyaXNMaXN0IiwiZG9jdW1lbnRzIiwicG9zdE1lc3NhZ2UiLCJmbGF0IiwicHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJkYXRhIiwiX21lc3NhZ2Vfc2Vzc2lvbklkIiwic2Vzc2lvbklEIiwiX21lc3NhZ2VfZG9jdW1lbnRVcmkiLCJjb21wbGV0aW9ucyIsImRvQ29tcGxldGUiLCJfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCIsImZpbmQiLCJkb1Jlc29sdmUiLCJzZXRWYWx1ZSIsImFwcGx5RGVsdGFzIiwiYmluZCIsImhpZ2hsaWdodHMiLCJjb2RlQWN0aW9ucyIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSIsInNlbmRBcHBsaWVkUmVzdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==