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
                /* unused harmony exports isEmptyRange, mergeRanges, checkValueAgainstRegexpArray, convertToUri */ function mergeObjects(obj1, obj2, excludeUndefined = false) {
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
                function isEmptyRange(range) {
                    return range.start.row === range.end.row && range.start.column === range.end.column;
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
                        if (cmp == 0 && !isEmptyRange(range) && !isEmptyRange(next)) continue;
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
        /******/ function __nested_webpack_require_19975__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_19975__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_19975__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_19975__.o(definition, key) && !__nested_webpack_require_19975__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_19975__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_19975__.r = (exports1)=>{
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
        __nested_webpack_require_19975__.r(__nested_webpack_exports__);
        /* harmony export */ __nested_webpack_require_19975__.d(__nested_webpack_exports__, {
            /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
        });
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_19975__(7770);
        /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_19975__(2032);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SixLQUFLNkgsNENBQTJDLGdCQUFnQixJQUFJbEksRUFBRSxDQUFDb0UsY0FBYzs0QkFDakYsSUFBSSxDQUFDQSxjQUFjLENBQUN2RCxvQkFBb0J1SCxRQUFRL0gsS0FBSzs0QkFDckQ7b0JBQ1I7b0JBQ0EwSixJQUFJc0YsV0FBVyxDQUFDQTtnQkFDcEI7WUFDSjtRQUNKO1FBRUEsTUFBTSxHQUFJLE9BQU94UCwwQkFBbUJBO0lBQ3BDLE1BQU0sR0FBRztBQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL3BhY2thZ2VzL2FjZS1saW50ZXJzL2J1aWxkL3NlcnZpY2UtbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgKCkgPT4ge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gMjAzMjpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgR286ICgpID0+ICgvKiBiaW5kaW5nICovIE1lc3NhZ2VUeXBlKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIEJhc2VNZXNzYWdlLCBJbml0TWVzc2FnZSwgRm9ybWF0TWVzc2FnZSwgQ29tcGxldGVNZXNzYWdlLCBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UsIEhvdmVyTWVzc2FnZSwgVmFsaWRhdGVNZXNzYWdlLCBDaGFuZ2VNZXNzYWdlLCBEZWx0YXNNZXNzYWdlLCBDaGFuZ2VNb2RlTWVzc2FnZSwgQ2hhbmdlT3B0aW9uc01lc3NhZ2UsIENsb3NlRG9jdW1lbnRNZXNzYWdlLCBDbG9zZUNvbm5lY3Rpb25NZXNzYWdlLCBHbG9iYWxPcHRpb25zTWVzc2FnZSwgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlLCBTaWduYXR1cmVIZWxwTWVzc2FnZSwgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlLCBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UsIEdldENvZGVBY3Rpb25zTWVzc2FnZSwgU2V0V29ya3NwYWNlTWVzc2FnZSwgRXhlY3V0ZUNvbW1hbmRNZXNzYWdlLCBBcHBsaWVkRWRpdE1lc3NhZ2UsIFJlbmFtZURvY3VtZW50TWVzc2FnZSAqL1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuY2xhc3MgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXNzaW9uSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImRvY3VtZW50VXJpXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gZG9jdW1lbnRJZGVudGlmaWVyLnNlc3Npb25JZDtcbiAgICAgICAgdGhpcy5kb2N1bWVudFVyaSA9IGRvY3VtZW50SWRlbnRpZmllci5kb2N1bWVudFVyaTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICB9XG59XG5jbGFzcyBJbml0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uLCBtb2RlLCBvcHRpb25zKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaW5pdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRm9ybWF0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29tcGxldGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUucmVzb2x2ZUNvbXBsZXRpb24pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEhvdmVyTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS52YWxpZGF0ZSk7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBEZWx0YXNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uLCBtb2RlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlTW9kZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlT3B0aW9uc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgQ2xvc2VEb2N1bWVudE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VEb2N1bWVudCk7XG4gICAgfVxufVxuY2xhc3MgQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNsb3NlQ29ubmVjdGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNpZ25hdHVyZUhlbHApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZG9jdW1lbnRIaWdobGlnaHQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEdldFNlbWFudGljVG9rZW5zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2V0U2VtYW50aWNUb2tlbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEdldENvZGVBY3Rpb25zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2V0Q29kZUFjdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNvbnRleHRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbn1cbmNsYXNzIFNldFdvcmtzcGFjZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2V0V29ya3NwYWNlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBFeGVjdXRlQ29tbWFuZE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkLCBjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmV4ZWN1dGVDb21tYW5kKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJhcmdzXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxufVxuY2xhc3MgQXBwbGllZEVkaXRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgc2VydmljZU5hbWUsIGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbGllZEVkaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVuYW1lRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZW5hbWVEb2N1bWVudCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxudmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uKE1lc3NhZ2VUeXBlKSB7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJpbml0XCJdID0gMF0gPSBcImluaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImZvcm1hdFwiXSA9IDFdID0gXCJmb3JtYXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbXBsZXRlXCJdID0gMl0gPSBcImNvbXBsZXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZXNvbHZlQ29tcGxldGlvblwiXSA9IDNdID0gXCJyZXNvbHZlQ29tcGxldGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlXCJdID0gNF0gPSBcImNoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaG92ZXJcIl0gPSA1XSA9IFwiaG92ZXJcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInZhbGlkYXRlXCJdID0gNl0gPSBcInZhbGlkYXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseURlbHRhXCJdID0gN10gPSBcImFwcGx5RGVsdGFcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU1vZGVcIl0gPSA4XSA9IFwiY2hhbmdlTW9kZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlT3B0aW9uc1wiXSA9IDldID0gXCJjaGFuZ2VPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjbG9zZURvY3VtZW50XCJdID0gMTBdID0gXCJjbG9zZURvY3VtZW50XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnbG9iYWxPcHRpb25zXCJdID0gMTFdID0gXCJnbG9iYWxPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb25maWd1cmVGZWF0dXJlc1wiXSA9IDEyXSA9IFwiY29uZmlndXJlRmVhdHVyZXNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNpZ25hdHVyZUhlbHBcIl0gPSAxM10gPSBcInNpZ25hdHVyZUhlbHBcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRvY3VtZW50SGlnaGxpZ2h0XCJdID0gMTRdID0gXCJkb2N1bWVudEhpZ2hsaWdodFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2xvc2VDb25uZWN0aW9uXCJdID0gMTVdID0gXCJjbG9zZUNvbm5lY3Rpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNhcGFiaWxpdGllc0NoYW5nZVwiXSA9IDE2XSA9IFwiY2FwYWJpbGl0aWVzQ2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnZXRTZW1hbnRpY1Rva2Vuc1wiXSA9IDE3XSA9IFwiZ2V0U2VtYW50aWNUb2tlbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdldENvZGVBY3Rpb25zXCJdID0gMThdID0gXCJnZXRDb2RlQWN0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZXhlY3V0ZUNvbW1hbmRcIl0gPSAxOV0gPSBcImV4ZWN1dGVDb21tYW5kXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseUVkaXRcIl0gPSAyMF0gPSBcImFwcGx5RWRpdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbGllZEVkaXRcIl0gPSAyMV0gPSBcImFwcGxpZWRFZGl0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzZXRXb3Jrc3BhY2VcIl0gPSAyMl0gPSBcInNldFdvcmtzcGFjZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVuYW1lRG9jdW1lbnRcIl0gPSAyM10gPSBcInJlbmFtZURvY3VtZW50XCI7XG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA3NzcwOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICByTDogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbWVyZ2VPYmplY3RzKSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgejI6ICgpID0+ICgvKiBiaW5kaW5nICovIG5vdEVtcHR5KVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIGlzRW1wdHlSYW5nZSwgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXksIGNvbnZlcnRUb1VyaSAqL1xuXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc0VtcHR5UmFuZ2UocmFuZ2UpIHtcbiAgICByZXR1cm4gcmFuZ2Uuc3RhcnQucm93ID09PSByYW5nZS5lbmQucm93ICYmIHJhbmdlLnN0YXJ0LmNvbHVtbiA9PT0gcmFuZ2UuZW5kLmNvbHVtbjtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIWlzRW1wdHlSYW5nZShyYW5nZSkgJiYgIWlzRW1wdHlSYW5nZShuZXh0KSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5lbmQpIDwgMCkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IG5leHQuZW5kLnJvdztcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBuZXh0LmVuZC5jb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIG5leHQgPSByYW5nZTtcbiAgICAgICAgaS0tO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVQb2ludHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnJvdyAtIHAyLnJvdyB8fCBwMS5jb2x1bW4gLSBwMi5jb2x1bW47XG59XG5mdW5jdGlvbiBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5KHZhbHVlLCByZWdleHBBcnJheSkge1xuICAgIGlmICghcmVnZXhwQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVnZXhwQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmVnZXhwQXJyYXlbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRUb1VyaShmaWxlUGF0aCkge1xuICAgIC8vYWxyZWFkeSBVUklcbiAgICBpZiAoZmlsZVBhdGguc3RhcnRzV2l0aChcImZpbGU6Ly8vXCIpKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIFVSSS5maWxlKGZpbGVQYXRoKS50b1N0cmluZygpO1xufVxuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlTWFuYWdlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZU1hbmFnZXIpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzc3MCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMjAzMik7XG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cblxuY2xhc3MgU2VydmljZU1hbmFnZXIge1xuICAgIGFzeW5jIGdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IGNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VydmljZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzZXJ2aWNlcykucmVkdWNlKChhY2MsIGtleSk9PntcbiAgICAgICAgICAgICAgICB2YXIgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19rZXk7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSAoKF9zZXJ2aWNlc19rZXkgPSBzZXJ2aWNlc1trZXldKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfa2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPSBfc2VydmljZXNfa2V5LnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlLnNlcnZpY2VDYXBhYmlsaXRpZXMpIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUsIG1ldGhvZE5hbWUsIGRvY3VtZW50SWRlbnRpZmllciwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhdHRycykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZVttZXRob2ROYW1lXShkb2N1bWVudElkZW50aWZpZXIsIC4uLmF0dHJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VbbWV0aG9kTmFtZV0oZG9jdW1lbnRJZGVudGlmaWVyLCBhdHRycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgfVxuICAgIGFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG9wdGlvbnMpIHtcbiAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgc2VydmljZS5zZXRPcHRpb25zKGRvY3VtZW50VXJpLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlQWxsQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuJHNlcnZpY2VzO1xuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIHZhciBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfc2VydmljZU5hbWU7XG4gICAgICAgICAgICBhd2FpdCAoKF9zZXJ2aWNlc19zZXJ2aWNlTmFtZSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuY2xvc2VDb25uZWN0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgsIHdvcmtzcGFjZVVyaSkge1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoJ3R5cGUnIGluIHNlcnZpY2UpIHtcbiAgICAgICAgICAgIGlmIChbXG4gICAgICAgICAgICAgICAgXCJzb2NrZXRcIixcbiAgICAgICAgICAgICAgICBcIndlYndvcmtlclwiXG4gICAgICAgICAgICBdLmluY2x1ZGVzKHNlcnZpY2UudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtcIkxhbmd1YWdlQ2xpZW50XCJdKHNlcnZpY2UsIGN0eCwgd29ya3NwYWNlVXJpKTtcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBcIlVua25vd24gc2VydmljZSB0eXBlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZS5vcHRpb25zIHx8IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfb3B0aW9ucywgX3JlZjtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoKF9yZWYgPSAoX3NlcnZpY2Vfb3B0aW9ucyA9IHNlcnZpY2Uub3B0aW9ucykgIT09IG51bGwgJiYgX3NlcnZpY2Vfb3B0aW9ucyAhPT0gdm9pZCAwID8gX3NlcnZpY2Vfb3B0aW9ucyA6IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDoge30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VEYXRhID0gc2VydmljZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgIH1cbiAgICBhc3luYyAkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNlcnZpY2VzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdID0gU2VydmljZU1hbmFnZXIuJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgdGhpcy5jdHgsIHRoaXMud29ya3NwYWNlVXJpKS50aGVuKChpbnN0YW5jZSk9PntcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTsgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEdsb2JhbE9wdGlvbnMoc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICBzZXJ2aWNlLm9wdGlvbnMgPSBtZXJnZSA/ICgwLF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm1lcmdlT2JqZWN0cyAqLyAuckwpKG9wdGlvbnMsIHNlcnZpY2Uub3B0aW9ucykgOiBvcHRpb25zO1xuICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoc2VydmljZS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlVXJpKSB7XG4gICAgICAgIHRoaXMud29ya3NwYWNlVXJpID0gd29ya3NwYWNlVXJpO1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuJHNlcnZpY2VzKS5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIChfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2Uuc2V0V29ya3NwYWNlKHRoaXMud29ya3NwYWNlVXJpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgZG9jdW1lbnRWYWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGUgfHwgIS9eYWNlXFwvbW9kZVxcLy8udGVzdChtb2RlKSkgcmV0dXJuO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKFwiYWNlL21vZGUvXCIsIFwiXCIpO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKC9nb2xhbmckLywgXCJnb1wiKTtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXJ2aWNlcykubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGxldCBkb2N1bWVudEl0ZW0gPSB7XG4gICAgICAgICAgICB1cmk6IGRvY3VtZW50SWRlbnRpZmllci51cmksXG4gICAgICAgICAgICB2ZXJzaW9uOiBkb2N1bWVudElkZW50aWZpZXIudmVyc2lvbixcbiAgICAgICAgICAgIGxhbmd1YWdlSWQ6IG1vZGUsXG4gICAgICAgICAgICB0ZXh0OiBkb2N1bWVudFZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc2VydmljZXMpLmZvckVhY2goKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlLmFkZERvY3VtZW50KGRvY3VtZW50SXRlbSkpO1xuICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV0gPSBtb2RlO1xuICAgICAgICByZXR1cm4gc2VydmljZXM7XG4gICAgfVxuICAgIGFzeW5jIHJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbmV3RG9jdW1lbnRVcmkpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudElkZW50aWZpZXIudXJpKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlcnZpY2VzLmZvckVhY2goKGVsKT0+ZWwucmVuYW1lRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBuZXdEb2N1bWVudFVyaSkpO1xuICAgICAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW25ld0RvY3VtZW50VXJpXSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50VXJpKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50VXJpXTtcbiAgICAgICAgaWYgKCFtb2RlKSByZXR1cm4gW107IC8vVE9ETzpcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5tYXAoKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGlmICghZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzO1xuICAgICAgICAgICAgc3dpdGNoKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJob3ZlclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmhvdmVyUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25SZXNvbHZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPSBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyKSA9PT0gbnVsbCB8fCBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIucmVzb2x2ZVByb3ZpZGVyKSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlIHx8IGNhcGFiaWxpdGllcy5kb2N1bWVudEZvcm1hdHRpbmdQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkaWFnbm9zdGljc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpZ25hdHVyZUhlbHBcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5zaWduYXR1cmVIZWxwUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkb2N1bWVudEhpZ2hsaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50SGlnaGxpZ2h0UHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwic2VtYW50aWNUb2tlbnNcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5zZW1hbnRpY1Rva2Vuc1Byb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29kZUFjdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvZGVBY3Rpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImV4ZWN1dGVDb21tYW5kXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZXhlY3V0ZUNvbW1hbmRQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kU2VydmljZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXNXaXRoTmFtZSA9IHt9O1xuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLiRzZXJ2aWNlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKT0+e1xuICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSB2YWx1ZS5tb2Rlcy5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5jbHVkZXMobW9kZSkpIHNlcnZpY2VzV2l0aE5hbWVba2V5XSA9IHRoaXMuJHNlcnZpY2VzW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VydmljZXNXaXRoTmFtZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKG5hbWUsIHNlcnZpY2UpIHtcbiAgICAgICAgc2VydmljZS5pZCA9IG5hbWU7XG4gICAgICAgIHNlcnZpY2UuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2UuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IHNlcnZpY2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmVyKG5hbWUsIGNsaWVudENvbmZpZykge1xuICAgICAgICBjbGllbnRDb25maWcuaWQgPSBuYW1lO1xuICAgICAgICBjbGllbnRDb25maWcuY2xhc3NOYW1lID0gXCJMYW5ndWFnZUNsaWVudFwiO1xuICAgICAgICBjbGllbnRDb25maWcuZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGNsaWVudENvbmZpZy5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gY2xpZW50Q29uZmlnO1xuICAgIH1cbiAgICBjb25maWd1cmVGZWF0dXJlcyhuYW1lLCBmZWF0dXJlcykge1xuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoZmVhdHVyZXMpO1xuICAgICAgICBpZiAoIXRoaXMuJHNlcnZpY2VzW25hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdLmZlYXR1cmVzID0gZmVhdHVyZXM7XG4gICAgfVxuICAgIHNldERlZmF1bHRGZWF0dXJlc1N0YXRlKHNlcnZpY2VGZWF0dXJlcykge1xuICAgICAgICB2YXIgX2ZlYXR1cmVzLCBfZmVhdHVyZXMxLCBfZmVhdHVyZXMyLCBfZmVhdHVyZXMzLCBfZmVhdHVyZXM0LCBfZmVhdHVyZXM1LCBfZmVhdHVyZXM2LCBfZmVhdHVyZXM3LCBfZmVhdHVyZXM4LCBfZmVhdHVyZXM5O1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zZW1hbnRpY1Rva2VucztcbiAgICAgICAgKF9zZW1hbnRpY1Rva2VucyA9IChfZmVhdHVyZXM3ID0gZmVhdHVyZXMpLnNlbWFudGljVG9rZW5zKSAhPT0gbnVsbCAmJiBfc2VtYW50aWNUb2tlbnMgIT09IHZvaWQgMCA/IF9zZW1hbnRpY1Rva2VucyA6IF9mZWF0dXJlczcuc2VtYW50aWNUb2tlbnMgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvZGVBY3Rpb247XG4gICAgICAgIChfY29kZUFjdGlvbiA9IChfZmVhdHVyZXM4ID0gZmVhdHVyZXMpLmNvZGVBY3Rpb24pICE9PSBudWxsICYmIF9jb2RlQWN0aW9uICE9PSB2b2lkIDAgPyBfY29kZUFjdGlvbiA6IF9mZWF0dXJlczguY29kZUFjdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfZXhlY3V0ZUNvbW1hbmQ7XG4gICAgICAgIChfZXhlY3V0ZUNvbW1hbmQgPSAoX2ZlYXR1cmVzOSA9IGZlYXR1cmVzKS5leGVjdXRlQ29tbWFuZCkgIT09IG51bGwgJiYgX2V4ZWN1dGVDb21tYW5kICE9PSB2b2lkIDAgPyBfZXhlY3V0ZUNvbW1hbmQgOiBfZmVhdHVyZXM5LmV4ZWN1dGVDb21tYW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihjdHgpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlcnZpY2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VJbml0UHJvbWlzZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlc3Npb25JRFRvTW9kZVwiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjdHhcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIndvcmtzcGFjZVVyaVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmlzTGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28udmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBkb2N1bWVudFVyaSBvZiBkb2N1bWVudFVyaXNMaXN0KXtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcbiAgICAgICAgICAgICAgICBsZXQgZGlhZ25vc3RpY3MgPSAoX3JlZiA9IGF3YWl0IFByb21pc2UuYWxsKHNlcnZpY2VzSW5zdGFuY2VzLm1hcCgoZWwpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5kb1ZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBkb2N1bWVudFVyaVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSkpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiBbXTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcImRvY3VtZW50VXJpXCJdID0gZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGRpYWdub3N0aWNzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UgPSBhc3luYyAoc2VydmljZU5hbWUpPT57XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZSkgYXdhaXQgZG9WYWxpZGF0aW9uKHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIGN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXYpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGV2LmRhdGE7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2Vfc2Vzc2lvbklkO1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRCA9IChfbWVzc2FnZV9zZXNzaW9uSWQgPSBtZXNzYWdlW1wic2Vzc2lvbklkXCJdKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9zZXNzaW9uSWQgIT09IHZvaWQgMCA/IF9tZXNzYWdlX3Nlc3Npb25JZCA6IFwiXCI7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2VfZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmkgPSAoX21lc3NhZ2VfZG9jdW1lbnRVcmkgPSBtZXNzYWdlW1wiZG9jdW1lbnRVcmlcIl0pICE9PSBudWxsICYmIF9tZXNzYWdlX2RvY3VtZW50VXJpICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9kb2N1bWVudFVyaSA6IFwiXCI7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IG1lc3NhZ2VbXCJ2ZXJzaW9uXCJdO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIFwiY2FsbGJhY2tJZFwiOiBtZXNzYWdlW1wiY2FsbGJhY2tJZFwiXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudFVyaSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogZG9jdW1lbnRVcmksXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28ucmVzb2x2ZUNvbXBsZXRpb246XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VOYW1lID0gbWVzc2FnZS52YWx1ZVtcInNlcnZpY2VcIl07XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCAoKF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uUmVzb2x2ZVwiKS5maW5kKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kLmRvUmVzb2x2ZShtZXNzYWdlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldFZhbHVlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uaG92ZXI6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJob3ZlclwiLCBcImRvSG92ZXJcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby52YWxpZGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmluaXQ6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuYWRkRG9jdW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZU1vZGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuY2hhbmdlRG9jdW1lbnRNb2RlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNsb3NlRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2xvc2VDb25uZWN0aW9uOlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQWxsQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIiwgXCJwcm92aWRlU2lnbmF0dXJlSGVscFwiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmRvY3VtZW50SGlnaGxpZ2h0OlxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0cyA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcImRvY3VtZW50SGlnaGxpZ2h0XCIsIFwiZmluZERvY3VtZW50SGlnaGxpZ2h0c1wiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gaGlnaGxpZ2h0cy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2V0U2VtYW50aWNUb2tlbnM6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNlbWFudGljVG9rZW5zXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZ2V0U2VtYW50aWNUb2tlbnMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdldENvZGVBY3Rpb25zOlxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBtZXNzYWdlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IG1lc3NhZ2UuY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvZGVBY3Rpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlQWN0aW9uczogYXdhaXQgc2VydmljZS5nZXRDb2RlQWN0aW9ucyhkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmV4ZWN1dGVDb21tYW5kOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuZXhlY3V0ZUNvbW1hbmQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5hcHBsaWVkRWRpdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEuc2VuZEFwcGxpZWRSZXN1bHQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5jYWxsYmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5zZXRXb3Jrc3BhY2U6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0V29ya3NwYWNlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnJlbmFtZURvY3VtZW50OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7Il0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiYSIsImkiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiX191bnVzZWRfd2VicGFja19tb2R1bGUiLCJfX3dlYnBhY2tfZXhwb3J0c19fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImQiLCJHbyIsIk1lc3NhZ2VUeXBlIiwiX2RlZmluZV9wcm9wZXJ0eSIsIm9iaiIsImtleSIsInZhbHVlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJCYXNlTWVzc2FnZSIsImNvbnN0cnVjdG9yIiwiZG9jdW1lbnRJZGVudGlmaWVyIiwiY2FsbGJhY2tJZCIsInNlc3Npb25JZCIsImRvY3VtZW50VXJpIiwiSW5pdE1lc3NhZ2UiLCJ2ZXJzaW9uIiwibW9kZSIsIm9wdGlvbnMiLCJpbml0IiwiRm9ybWF0TWVzc2FnZSIsImZvcm1hdCIsIkNvbXBsZXRlTWVzc2FnZSIsImNvbXBsZXRlIiwiUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIiwicmVzb2x2ZUNvbXBsZXRpb24iLCJIb3Zlck1lc3NhZ2UiLCJob3ZlciIsIlZhbGlkYXRlTWVzc2FnZSIsInZhbGlkYXRlIiwiQ2hhbmdlTWVzc2FnZSIsImNoYW5nZSIsIkRlbHRhc01lc3NhZ2UiLCJhcHBseURlbHRhIiwiQ2hhbmdlTW9kZU1lc3NhZ2UiLCJjaGFuZ2VNb2RlIiwiQ2hhbmdlT3B0aW9uc01lc3NhZ2UiLCJtZXJnZSIsImNoYW5nZU9wdGlvbnMiLCJDbG9zZURvY3VtZW50TWVzc2FnZSIsImNsb3NlRG9jdW1lbnQiLCJDbG9zZUNvbm5lY3Rpb25NZXNzYWdlIiwiY2xvc2VDb25uZWN0aW9uIiwiR2xvYmFsT3B0aW9uc01lc3NhZ2UiLCJzZXJ2aWNlTmFtZSIsImdsb2JhbE9wdGlvbnMiLCJDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UiLCJjb25maWd1cmVGZWF0dXJlcyIsIlNpZ25hdHVyZUhlbHBNZXNzYWdlIiwic2lnbmF0dXJlSGVscCIsIkRvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSIsImRvY3VtZW50SGlnaGxpZ2h0IiwiR2V0U2VtYW50aWNUb2tlbnNNZXNzYWdlIiwiZ2V0U2VtYW50aWNUb2tlbnMiLCJHZXRDb2RlQWN0aW9uc01lc3NhZ2UiLCJjb250ZXh0IiwiZ2V0Q29kZUFjdGlvbnMiLCJTZXRXb3Jrc3BhY2VNZXNzYWdlIiwic2V0V29ya3NwYWNlIiwiRXhlY3V0ZUNvbW1hbmRNZXNzYWdlIiwiY29tbWFuZCIsImFyZ3MiLCJleGVjdXRlQ29tbWFuZCIsIkFwcGxpZWRFZGl0TWVzc2FnZSIsImFwcGxpZWRFZGl0IiwiUmVuYW1lRG9jdW1lbnRNZXNzYWdlIiwicmVuYW1lRG9jdW1lbnQiLCJyTCIsIm1lcmdlT2JqZWN0cyIsInoyIiwibm90RW1wdHkiLCJvYmoxIiwib2JqMiIsImV4Y2x1ZGVVbmRlZmluZWQiLCJleGNsdWRlVW5kZWZpbmVkVmFsdWVzIiwibWVyZ2VkT2JqZWN0cyIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJmaWx0ZXJlZEVudHJpZXMiLCJlbnRyaWVzIiwiZmlsdGVyIiwiXyIsInVuZGVmaW5lZCIsImZyb21FbnRyaWVzIiwiaXNFbXB0eVJhbmdlIiwicmFuZ2UiLCJzdGFydCIsInJvdyIsImVuZCIsImNvbHVtbiIsIm1lcmdlUmFuZ2VzIiwicmFuZ2VzIiwibGlzdCIsInNvcnQiLCJiIiwiY29tcGFyZVBvaW50cyIsIm5leHQiLCJsZW5ndGgiLCJjbXAiLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsImNvbnZlcnRUb1VyaSIsImZpbGVQYXRoIiwic3RhcnRzV2l0aCIsIlVSSSIsImZpbGUiLCJ0b1N0cmluZyIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm8iLCJnZXQiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiU2VydmljZU1hbmFnZXIiLCJfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJnZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2siLCJtZXNzYWdlIiwiY2FsbGJhY2siLCJzZXJ2aWNlcyIsInJlZHVjZSIsImFjYyIsIl9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX2tleSIsInNlcnZpY2VJbnN0YW5jZSIsInNlcnZpY2VDYXBhYmlsaXRpZXMiLCJhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzIiwic2VydmljZUluc3RhbmNlcyIsImZlYXR1cmUiLCJtZXRob2ROYW1lIiwiYXR0cnMiLCJQcm9taXNlIiwiYWxsIiwiZmlsdGVyQnlGZWF0dXJlIiwibWFwIiwic2VydmljZSIsImFwcGx5T3B0aW9uc1RvU2VydmljZXMiLCJmb3JFYWNoIiwic2V0T3B0aW9ucyIsImNsb3NlQWxsQ29ubmVjdGlvbnMiLCIkc2VydmljZXMiLCJfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lIiwiJGluaXRTZXJ2aWNlSW5zdGFuY2UiLCJjdHgiLCJ3b3Jrc3BhY2VVcmkiLCJpbmNsdWRlcyIsInR5cGUiLCJjbGFzc05hbWUiLCJtb2RlcyIsImluaXRpYWxpemF0aW9uT3B0aW9ucyIsIl9zZXJ2aWNlX29wdGlvbnMiLCJfcmVmIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwiZmluZFNlcnZpY2VzQnlNb2RlIiwiaW5pdGlhbGl6ZVNlcnZpY2UiLCJzZXJ2aWNlSW5pdFByb21pc2VzIiwiaWQiLCJ0aGVuIiwiaW5zdGFuY2UiLCJ2YWx1ZXMiLCJfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UiLCJhZGREb2N1bWVudCIsImRvY3VtZW50VmFsdWUiLCJyZXBsYWNlIiwiZG9jdW1lbnRJdGVtIiwidXJpIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJuZXdEb2N1bWVudFVyaSIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwiaG92ZXJQcm92aWRlciIsImNvbXBsZXRpb25Qcm92aWRlciIsIl9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciIsImRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyIiwiZGlhZ25vc3RpY1Byb3ZpZGVyIiwic2lnbmF0dXJlSGVscFByb3ZpZGVyIiwiZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciIsInNlbWFudGljVG9rZW5zUHJvdmlkZXIiLCJjb2RlQWN0aW9uUHJvdmlkZXIiLCJleGVjdXRlQ29tbWFuZFByb3ZpZGVyIiwic2VydmljZXNXaXRoTmFtZSIsImV4dGVuc2lvbnMiLCJzcGxpdCIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInJlZ2lzdGVyU2VydmVyIiwiY2xpZW50Q29uZmlnIiwic2VydmljZUZlYXR1cmVzIiwiX2ZlYXR1cmVzIiwiX2ZlYXR1cmVzMSIsIl9mZWF0dXJlczIiLCJfZmVhdHVyZXMzIiwiX2ZlYXR1cmVzNCIsIl9mZWF0dXJlczUiLCJfZmVhdHVyZXM2IiwiX2ZlYXR1cmVzNyIsIl9mZWF0dXJlczgiLCJfZmVhdHVyZXM5IiwiX2hvdmVyIiwiX2NvbXBsZXRpb24iLCJjb21wbGV0aW9uIiwiX2NvbXBsZXRpb25SZXNvbHZlIiwiY29tcGxldGlvblJlc29sdmUiLCJfZm9ybWF0IiwiX2RpYWdub3N0aWNzIiwiZGlhZ25vc3RpY3MiLCJfc2lnbmF0dXJlSGVscCIsIl9kb2N1bWVudEhpZ2hsaWdodCIsIl9zZW1hbnRpY1Rva2VucyIsInNlbWFudGljVG9rZW5zIiwiX2NvZGVBY3Rpb24iLCJjb2RlQWN0aW9uIiwiX2V4ZWN1dGVDb21tYW5kIiwiZG9WYWxpZGF0aW9uIiwic2VydmljZXNJbnN0YW5jZXMiLCJkb2N1bWVudFVyaXNMaXN0IiwiZG9jdW1lbnRzIiwicG9zdE1lc3NhZ2UiLCJmbGF0IiwicHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJkYXRhIiwiX21lc3NhZ2Vfc2Vzc2lvbklkIiwic2Vzc2lvbklEIiwiX21lc3NhZ2VfZG9jdW1lbnRVcmkiLCJjb21wbGV0aW9ucyIsImRvQ29tcGxldGUiLCJfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCIsImZpbmQiLCJkb1Jlc29sdmUiLCJzZXRWYWx1ZSIsImFwcGx5RGVsdGFzIiwiYmluZCIsImhpZ2hsaWdodHMiLCJjb2RlQWN0aW9ucyIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSIsInNlbmRBcHBsaWVkUmVzdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==