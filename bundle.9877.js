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
                /* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, InlineCompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, CloseConnectionMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage, GetSemanticTokensMessage, GetCodeActionsMessage, SetWorkspaceMessage, ExecuteCommandMessage, AppliedEditMessage, RenameDocumentMessage, SendRequestMessage, SendResponseMessage */ function _define_property(obj, key, value) {
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
                class InlineCompleteMessage extends BaseMessage {
                    constructor(documentIdentifier, callbackId, value){
                        super(documentIdentifier, callbackId);
                        _define_property(this, "type", MessageType.inlineComplete);
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
                class SendRequestMessage {
                    constructor(serviceName, callbackId, requestName, args){
                        _define_property(this, "callbackId", void 0);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "type", MessageType.sendRequest);
                        _define_property(this, "value", void 0);
                        _define_property(this, "args", void 0);
                        this.serviceName = serviceName;
                        this.callbackId = callbackId;
                        this.value = requestName;
                        this.args = args;
                    }
                }
                class SendResponseMessage {
                    constructor(serviceName, callbackId, args){
                        _define_property(this, "callbackId", void 0);
                        _define_property(this, "serviceName", void 0);
                        _define_property(this, "type", MessageType.sendResponse);
                        _define_property(this, "args", void 0);
                        this.serviceName = serviceName;
                        this.callbackId = callbackId;
                        this.args = args;
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
                    MessageType[MessageType["sendRequest"] = 24] = "sendRequest";
                    MessageType[MessageType["showDocument"] = 25] = "showDocument";
                    MessageType[MessageType["sendResponse"] = 26] = "sendResponse";
                    MessageType[MessageType["inlineComplete"] = 27] = "inlineComplete";
                })(MessageType || (MessageType = {}));
            /***/ },
            /***/ 7770: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_17696__)=>{
                /* harmony export */ __nested_webpack_require_17696__.d(__nested_webpack_exports__, {
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
        /******/ function __nested_webpack_require_22111__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_22111__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_22111__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_22111__.o(definition, key) && !__nested_webpack_require_22111__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_22111__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_22111__.r = (exports1)=>{
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
        __nested_webpack_require_22111__.r(__nested_webpack_exports__);
        /* harmony export */ __nested_webpack_require_22111__.d(__nested_webpack_exports__, {
            /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
        });
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_22111__(7770);
        /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22111__(2032);
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
                        case "inlineCompletion":
                            return capabilities.inlineCompletionProvider != undefined;
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
                var _features, _features1, _features2, _features3, _features4, _features5, _features6, _features7, _features8, _features9, _features10;
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
                var _inlineCompletion;
                (_inlineCompletion = (_features10 = features).inlineCompletion) !== null && _inlineCompletion !== void 0 ? _inlineCompletion : _features10.inlineCompletion = true;
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
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.inlineComplete:
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "inlineCompletion").map(async (service)=>{
                                return {
                                    completions: await service.doInlineComplete(documentIdentifier, message["value"]),
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
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.sendRequest:
                            var _this_$services_message_serviceName_serviceInstance2, _this_$services_message_serviceName2;
                            postMessage["value"] = (_this_$services_message_serviceName2 = this.$services[message.serviceName]) === null || _this_$services_message_serviceName2 === void 0 ? void 0 : (_this_$services_message_serviceName_serviceInstance2 = _this_$services_message_serviceName2.serviceInstance) === null || _this_$services_message_serviceName_serviceInstance2 === void 0 ? void 0 : _this_$services_message_serviceName_serviceInstance2.sendRequest(message.value, message.args);
                            break;
                        case _message_types__WEBPACK_IMPORTED_MODULE_0__ /* .MessageType */ .Go.sendResponse:
                            var _this_$services_message_serviceName_serviceInstance3, _this_$services_message_serviceName3;
                            postMessage["value"] = (_this_$services_message_serviceName3 = this.$services[message.serviceName]) === null || _this_$services_message_serviceName3 === void 0 ? void 0 : (_this_$services_message_serviceName_serviceInstance3 = _this_$services_message_serviceName3.serviceInstance) === null || _this_$services_message_serviceName_serviceInstance3 === void 0 ? void 0 : _this_$services_message_serviceName_serviceInstance3.sendResponse(message.callbackId, message.args);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NEJBQzlFLElBQUlnTixzREFBc0RDOzRCQUMxRDFCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQzBCLHVDQUF1QyxJQUFJLENBQUN4SCxTQUFTLENBQUN2QixRQUFRM0YsV0FBVyxDQUFDLE1BQU0sUUFBUTBPLHlDQUF5QyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUNELHVEQUF1REMscUNBQXFDeEksZUFBZSxNQUFNLFFBQVF1SSx5REFBeUQsS0FBSyxJQUFJLEtBQUssSUFBSUEscURBQXFEaE4sV0FBVyxDQUFDa0UsUUFBUXRJLEtBQUssRUFBRXNJLFFBQVExRSxJQUFJOzRCQUM1Yzt3QkFDSixLQUFLd0UsNENBQTJDLGdCQUFnQixJQUFJekksRUFBRSxDQUFDMkUsWUFBWTs0QkFDL0UsSUFBSWdOLHNEQUFzREM7NEJBQzFENUIsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDNEIsdUNBQXVDLElBQUksQ0FBQzFILFNBQVMsQ0FBQ3ZCLFFBQVEzRixXQUFXLENBQUMsTUFBTSxRQUFRNE8seUNBQXlDLEtBQUssSUFBSSxLQUFLLElBQUksQ0FBQ0QsdURBQXVEQyxxQ0FBcUMxSSxlQUFlLE1BQU0sUUFBUXlJLHlEQUF5RCxLQUFLLElBQUksS0FBSyxJQUFJQSxxREFBcURoTixZQUFZLENBQUNnRSxRQUFRN0gsVUFBVSxFQUFFNkgsUUFBUTFFLElBQUk7NEJBQ2xkO29CQUNSO29CQUNBcUcsSUFBSTBGLFdBQVcsQ0FBQ0E7Z0JBQ3BCO1lBQ0o7UUFDSjtRQUVBLE1BQU0sR0FBSSxPQUFPblEsMEJBQW1CQTtJQUNwQyxNQUFNLEdBQUc7QUFFVCIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9hY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIDIwMzI6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIEdvOiAoKSA9PiAoLyogYmluZGluZyAqLyBNZXNzYWdlVHlwZSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBCYXNlTWVzc2FnZSwgSW5pdE1lc3NhZ2UsIEZvcm1hdE1lc3NhZ2UsIENvbXBsZXRlTWVzc2FnZSwgSW5saW5lQ29tcGxldGVNZXNzYWdlLCBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UsIEhvdmVyTWVzc2FnZSwgVmFsaWRhdGVNZXNzYWdlLCBDaGFuZ2VNZXNzYWdlLCBEZWx0YXNNZXNzYWdlLCBDaGFuZ2VNb2RlTWVzc2FnZSwgQ2hhbmdlT3B0aW9uc01lc3NhZ2UsIENsb3NlRG9jdW1lbnRNZXNzYWdlLCBDbG9zZUNvbm5lY3Rpb25NZXNzYWdlLCBHbG9iYWxPcHRpb25zTWVzc2FnZSwgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlLCBTaWduYXR1cmVIZWxwTWVzc2FnZSwgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlLCBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UsIEdldENvZGVBY3Rpb25zTWVzc2FnZSwgU2V0V29ya3NwYWNlTWVzc2FnZSwgRXhlY3V0ZUNvbW1hbmRNZXNzYWdlLCBBcHBsaWVkRWRpdE1lc3NhZ2UsIFJlbmFtZURvY3VtZW50TWVzc2FnZSwgU2VuZFJlcXVlc3RNZXNzYWdlLCBTZW5kUmVzcG9uc2VNZXNzYWdlICovXG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5jbGFzcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlc3Npb25JZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiZG9jdW1lbnRVcmlcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBkb2N1bWVudElkZW50aWZpZXIuc2Vzc2lvbklkO1xuICAgICAgICB0aGlzLmRvY3VtZW50VXJpID0gZG9jdW1lbnRJZGVudGlmaWVyLmRvY3VtZW50VXJpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgIH1cbn1cbmNsYXNzIEluaXRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUsIG9wdGlvbnMpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5pbml0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBGb3JtYXRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmZvcm1hdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiZm9ybWF0XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxufVxuY2xhc3MgQ29tcGxldGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgSW5saW5lQ29tcGxldGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5pbmxpbmVDb21wbGV0ZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZXNvbHZlQ29tcGxldGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgSG92ZXJNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5ob3Zlcik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgVmFsaWRhdGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnZhbGlkYXRlKTtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIERlbHRhc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmFwcGx5RGVsdGEpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1vZGVNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VPcHRpb25zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2Upe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDbG9zZURvY3VtZW50TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jbG9zZURvY3VtZW50KTtcbiAgICB9XG59XG5jbGFzcyBDbG9zZUNvbm5lY3Rpb25NZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VDb25uZWN0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICB9XG59XG5jbGFzcyBHbG9iYWxPcHRpb25zTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2xvYmFsT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbmZpZ3VyZUZlYXR1cmVzKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG59XG5jbGFzcyBTaWduYXR1cmVIZWxwTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2lnbmF0dXJlSGVscCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRG9jdW1lbnRIaWdobGlnaHRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5kb2N1bWVudEhpZ2hsaWdodCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgR2V0U2VtYW50aWNUb2tlbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nZXRTZW1hbnRpY1Rva2Vucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgR2V0Q29kZUFjdGlvbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIGNvbnRleHQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nZXRDb2RlQWN0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY29udGV4dFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxufVxuY2xhc3MgU2V0V29ya3NwYWNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zZXRXb3Jrc3BhY2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEV4ZWN1dGVDb21tYW5kTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIGNhbGxiYWNrSWQsIGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZXhlY3V0ZUNvbW1hbmQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImFyZ3NcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29tbWFuZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBBcHBsaWVkRWRpdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBsaWVkRWRpdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBSZW5hbWVEb2N1bWVudE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlbmFtZURvY3VtZW50KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBTZW5kUmVxdWVzdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkLCByZXF1ZXN0TmFtZSwgYXJncyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zZW5kUmVxdWVzdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiYXJnc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSByZXF1ZXN0TmFtZTtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBTZW5kUmVzcG9uc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCwgYXJncyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zZW5kUmVzcG9uc2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiYXJnc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxufVxudmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uKE1lc3NhZ2VUeXBlKSB7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJpbml0XCJdID0gMF0gPSBcImluaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImZvcm1hdFwiXSA9IDFdID0gXCJmb3JtYXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbXBsZXRlXCJdID0gMl0gPSBcImNvbXBsZXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZXNvbHZlQ29tcGxldGlvblwiXSA9IDNdID0gXCJyZXNvbHZlQ29tcGxldGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlXCJdID0gNF0gPSBcImNoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaG92ZXJcIl0gPSA1XSA9IFwiaG92ZXJcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInZhbGlkYXRlXCJdID0gNl0gPSBcInZhbGlkYXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseURlbHRhXCJdID0gN10gPSBcImFwcGx5RGVsdGFcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU1vZGVcIl0gPSA4XSA9IFwiY2hhbmdlTW9kZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlT3B0aW9uc1wiXSA9IDldID0gXCJjaGFuZ2VPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjbG9zZURvY3VtZW50XCJdID0gMTBdID0gXCJjbG9zZURvY3VtZW50XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnbG9iYWxPcHRpb25zXCJdID0gMTFdID0gXCJnbG9iYWxPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb25maWd1cmVGZWF0dXJlc1wiXSA9IDEyXSA9IFwiY29uZmlndXJlRmVhdHVyZXNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNpZ25hdHVyZUhlbHBcIl0gPSAxM10gPSBcInNpZ25hdHVyZUhlbHBcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRvY3VtZW50SGlnaGxpZ2h0XCJdID0gMTRdID0gXCJkb2N1bWVudEhpZ2hsaWdodFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2xvc2VDb25uZWN0aW9uXCJdID0gMTVdID0gXCJjbG9zZUNvbm5lY3Rpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNhcGFiaWxpdGllc0NoYW5nZVwiXSA9IDE2XSA9IFwiY2FwYWJpbGl0aWVzQ2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnZXRTZW1hbnRpY1Rva2Vuc1wiXSA9IDE3XSA9IFwiZ2V0U2VtYW50aWNUb2tlbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdldENvZGVBY3Rpb25zXCJdID0gMThdID0gXCJnZXRDb2RlQWN0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZXhlY3V0ZUNvbW1hbmRcIl0gPSAxOV0gPSBcImV4ZWN1dGVDb21tYW5kXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseUVkaXRcIl0gPSAyMF0gPSBcImFwcGx5RWRpdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbGllZEVkaXRcIl0gPSAyMV0gPSBcImFwcGxpZWRFZGl0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzZXRXb3Jrc3BhY2VcIl0gPSAyMl0gPSBcInNldFdvcmtzcGFjZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVuYW1lRG9jdW1lbnRcIl0gPSAyM10gPSBcInJlbmFtZURvY3VtZW50XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzZW5kUmVxdWVzdFwiXSA9IDI0XSA9IFwic2VuZFJlcXVlc3RcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNob3dEb2N1bWVudFwiXSA9IDI1XSA9IFwic2hvd0RvY3VtZW50XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzZW5kUmVzcG9uc2VcIl0gPSAyNl0gPSBcInNlbmRSZXNwb25zZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaW5saW5lQ29tcGxldGVcIl0gPSAyN10gPSBcImlubGluZUNvbXBsZXRlXCI7XG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA3NzcwOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICByTDogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbWVyZ2VPYmplY3RzKSxcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgejI6ICgpID0+ICgvKiBiaW5kaW5nICovIG5vdEVtcHR5KVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIGlzRW1wdHlSYW5nZSwgbWVyZ2VSYW5nZXMsIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXksIGNvbnZlcnRUb1VyaSAqL1xuXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc0VtcHR5UmFuZ2UocmFuZ2UpIHtcbiAgICByZXR1cm4gcmFuZ2Uuc3RhcnQucm93ID09PSByYW5nZS5lbmQucm93ICYmIHJhbmdlLnN0YXJ0LmNvbHVtbiA9PT0gcmFuZ2UuZW5kLmNvbHVtbjtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIWlzRW1wdHlSYW5nZShyYW5nZSkgJiYgIWlzRW1wdHlSYW5nZShuZXh0KSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5lbmQpIDwgMCkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IG5leHQuZW5kLnJvdztcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBuZXh0LmVuZC5jb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIG5leHQgPSByYW5nZTtcbiAgICAgICAgaS0tO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVQb2ludHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnJvdyAtIHAyLnJvdyB8fCBwMS5jb2x1bW4gLSBwMi5jb2x1bW47XG59XG5mdW5jdGlvbiBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5KHZhbHVlLCByZWdleHBBcnJheSkge1xuICAgIGlmICghcmVnZXhwQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVnZXhwQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmVnZXhwQXJyYXlbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRUb1VyaShmaWxlUGF0aCkge1xuICAgIC8vYWxyZWFkeSBVUklcbiAgICBpZiAoZmlsZVBhdGguc3RhcnRzV2l0aChcImZpbGU6Ly8vXCIpKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIFVSSS5maWxlKGZpbGVQYXRoKS50b1N0cmluZygpO1xufVxuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlTWFuYWdlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZU1hbmFnZXIpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzc3MCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMjAzMik7XG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cblxuY2xhc3MgU2VydmljZU1hbmFnZXIge1xuICAgIGFzeW5jIGdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IGNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VydmljZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzZXJ2aWNlcykucmVkdWNlKChhY2MsIGtleSk9PntcbiAgICAgICAgICAgICAgICB2YXIgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19rZXk7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSAoKF9zZXJ2aWNlc19rZXkgPSBzZXJ2aWNlc1trZXldKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfa2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPSBfc2VydmljZXNfa2V5LnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlLnNlcnZpY2VDYXBhYmlsaXRpZXMpIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUsIG1ldGhvZE5hbWUsIGRvY3VtZW50SWRlbnRpZmllciwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhdHRycykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZVttZXRob2ROYW1lXShkb2N1bWVudElkZW50aWZpZXIsIC4uLmF0dHJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VbbWV0aG9kTmFtZV0oZG9jdW1lbnRJZGVudGlmaWVyLCBhdHRycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgfVxuICAgIGFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG9wdGlvbnMpIHtcbiAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgc2VydmljZS5zZXRPcHRpb25zKGRvY3VtZW50VXJpLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlQWxsQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuJHNlcnZpY2VzO1xuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIHZhciBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfc2VydmljZU5hbWU7XG4gICAgICAgICAgICBhd2FpdCAoKF9zZXJ2aWNlc19zZXJ2aWNlTmFtZSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuY2xvc2VDb25uZWN0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgsIHdvcmtzcGFjZVVyaSkge1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoJ3R5cGUnIGluIHNlcnZpY2UpIHtcbiAgICAgICAgICAgIGlmIChbXG4gICAgICAgICAgICAgICAgXCJzb2NrZXRcIixcbiAgICAgICAgICAgICAgICBcIndlYndvcmtlclwiXG4gICAgICAgICAgICBdLmluY2x1ZGVzKHNlcnZpY2UudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtcIkxhbmd1YWdlQ2xpZW50XCJdKHNlcnZpY2UsIGN0eCwgd29ya3NwYWNlVXJpKTtcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBcIlVua25vd24gc2VydmljZSB0eXBlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZS5vcHRpb25zIHx8IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfb3B0aW9ucywgX3JlZjtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoKF9yZWYgPSAoX3NlcnZpY2Vfb3B0aW9ucyA9IHNlcnZpY2Uub3B0aW9ucykgIT09IG51bGwgJiYgX3NlcnZpY2Vfb3B0aW9ucyAhPT0gdm9pZCAwID8gX3NlcnZpY2Vfb3B0aW9ucyA6IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDoge30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VEYXRhID0gc2VydmljZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgIH1cbiAgICBhc3luYyAkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNlcnZpY2VzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdID0gU2VydmljZU1hbmFnZXIuJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgdGhpcy5jdHgsIHRoaXMud29ya3NwYWNlVXJpKS50aGVuKChpbnN0YW5jZSk9PntcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTsgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEdsb2JhbE9wdGlvbnMoc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICBzZXJ2aWNlLm9wdGlvbnMgPSBtZXJnZSA/ICgwLF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm1lcmdlT2JqZWN0cyAqLyAuckwpKG9wdGlvbnMsIHNlcnZpY2Uub3B0aW9ucykgOiBvcHRpb25zO1xuICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoc2VydmljZS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlVXJpKSB7XG4gICAgICAgIHRoaXMud29ya3NwYWNlVXJpID0gd29ya3NwYWNlVXJpO1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuJHNlcnZpY2VzKS5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIChfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2Uuc2V0V29ya3NwYWNlKHRoaXMud29ya3NwYWNlVXJpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgZG9jdW1lbnRWYWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGUgfHwgIS9eYWNlXFwvbW9kZVxcLy8udGVzdChtb2RlKSkgcmV0dXJuO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKFwiYWNlL21vZGUvXCIsIFwiXCIpO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKC9nb2xhbmckLywgXCJnb1wiKTtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXJ2aWNlcykubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGxldCBkb2N1bWVudEl0ZW0gPSB7XG4gICAgICAgICAgICB1cmk6IGRvY3VtZW50SWRlbnRpZmllci51cmksXG4gICAgICAgICAgICB2ZXJzaW9uOiBkb2N1bWVudElkZW50aWZpZXIudmVyc2lvbixcbiAgICAgICAgICAgIGxhbmd1YWdlSWQ6IG1vZGUsXG4gICAgICAgICAgICB0ZXh0OiBkb2N1bWVudFZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc2VydmljZXMpLmZvckVhY2goKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlLmFkZERvY3VtZW50KGRvY3VtZW50SXRlbSkpO1xuICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV0gPSBtb2RlO1xuICAgICAgICByZXR1cm4gc2VydmljZXM7XG4gICAgfVxuICAgIGFzeW5jIHJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbmV3RG9jdW1lbnRVcmkpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudElkZW50aWZpZXIudXJpKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlcnZpY2VzLmZvckVhY2goKGVsKT0+ZWwucmVuYW1lRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBuZXdEb2N1bWVudFVyaSkpO1xuICAgICAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW25ld0RvY3VtZW50VXJpXSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50VXJpKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50VXJpXTtcbiAgICAgICAgaWYgKCFtb2RlKSByZXR1cm4gW107IC8vVE9ETzpcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5tYXAoKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGlmICghZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzO1xuICAgICAgICAgICAgc3dpdGNoKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJob3ZlclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmhvdmVyUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25SZXNvbHZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPSBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyKSA9PT0gbnVsbCB8fCBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIucmVzb2x2ZVByb3ZpZGVyKSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW5saW5lQ29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmlubGluZUNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZSB8fCBjYXBhYmlsaXRpZXMuZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGlhZ25vc3RpY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaWduYXR1cmVIZWxwXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2lnbmF0dXJlSGVscFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRIaWdobGlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbWFudGljVG9rZW5zXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2VtYW50aWNUb2tlbnNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvZGVBY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb2RlQWN0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJleGVjdXRlQ29tbWFuZFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmV4ZWN1dGVDb21tYW5kUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzV2l0aE5hbWUgPSB7fTtcbiAgICAgICAgT2JqZWN0LmVudHJpZXModGhpcy4kc2VydmljZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSk9PntcbiAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUubW9kZXMuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluY2x1ZGVzKG1vZGUpKSBzZXJ2aWNlc1dpdGhOYW1lW2tleV0gPSB0aGlzLiRzZXJ2aWNlc1trZXldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzV2l0aE5hbWU7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2VydmljZShuYW1lLCBzZXJ2aWNlKSB7XG4gICAgICAgIHNlcnZpY2UuaWQgPSBuYW1lO1xuICAgICAgICBzZXJ2aWNlLmZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShzZXJ2aWNlLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBzZXJ2aWNlO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZlcihuYW1lLCBjbGllbnRDb25maWcpIHtcbiAgICAgICAgY2xpZW50Q29uZmlnLmlkID0gbmFtZTtcbiAgICAgICAgY2xpZW50Q29uZmlnLmNsYXNzTmFtZSA9IFwiTGFuZ3VhZ2VDbGllbnRcIjtcbiAgICAgICAgY2xpZW50Q29uZmlnLmZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShjbGllbnRDb25maWcuZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXSA9IGNsaWVudENvbmZpZztcbiAgICB9XG4gICAgY29uZmlndXJlRmVhdHVyZXMobmFtZSwgZmVhdHVyZXMpIHtcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGZlYXR1cmVzKTtcbiAgICAgICAgaWYgKCF0aGlzLiRzZXJ2aWNlc1tuYW1lXSkgcmV0dXJuO1xuICAgICAgICB0aGlzLiRzZXJ2aWNlc1tuYW1lXS5mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICAgIH1cbiAgICBzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShzZXJ2aWNlRmVhdHVyZXMpIHtcbiAgICAgICAgdmFyIF9mZWF0dXJlcywgX2ZlYXR1cmVzMSwgX2ZlYXR1cmVzMiwgX2ZlYXR1cmVzMywgX2ZlYXR1cmVzNCwgX2ZlYXR1cmVzNSwgX2ZlYXR1cmVzNiwgX2ZlYXR1cmVzNywgX2ZlYXR1cmVzOCwgX2ZlYXR1cmVzOSwgX2ZlYXR1cmVzMTA7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICB2YXIgX3NlbWFudGljVG9rZW5zO1xuICAgICAgICAoX3NlbWFudGljVG9rZW5zID0gKF9mZWF0dXJlczcgPSBmZWF0dXJlcykuc2VtYW50aWNUb2tlbnMpICE9PSBudWxsICYmIF9zZW1hbnRpY1Rva2VucyAhPT0gdm9pZCAwID8gX3NlbWFudGljVG9rZW5zIDogX2ZlYXR1cmVzNy5zZW1hbnRpY1Rva2VucyA9IHRydWU7XG4gICAgICAgIHZhciBfY29kZUFjdGlvbjtcbiAgICAgICAgKF9jb2RlQWN0aW9uID0gKF9mZWF0dXJlczggPSBmZWF0dXJlcykuY29kZUFjdGlvbikgIT09IG51bGwgJiYgX2NvZGVBY3Rpb24gIT09IHZvaWQgMCA/IF9jb2RlQWN0aW9uIDogX2ZlYXR1cmVzOC5jb2RlQWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9leGVjdXRlQ29tbWFuZDtcbiAgICAgICAgKF9leGVjdXRlQ29tbWFuZCA9IChfZmVhdHVyZXM5ID0gZmVhdHVyZXMpLmV4ZWN1dGVDb21tYW5kKSAhPT0gbnVsbCAmJiBfZXhlY3V0ZUNvbW1hbmQgIT09IHZvaWQgMCA/IF9leGVjdXRlQ29tbWFuZCA6IF9mZWF0dXJlczkuZXhlY3V0ZUNvbW1hbmQgPSB0cnVlO1xuICAgICAgICB2YXIgX2lubGluZUNvbXBsZXRpb247XG4gICAgICAgIChfaW5saW5lQ29tcGxldGlvbiA9IChfZmVhdHVyZXMxMCA9IGZlYXR1cmVzKS5pbmxpbmVDb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfaW5saW5lQ29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2lubGluZUNvbXBsZXRpb24gOiBfZmVhdHVyZXMxMC5pbmxpbmVDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihjdHgpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlcnZpY2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VJbml0UHJvbWlzZXNcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlc3Npb25JRFRvTW9kZVwiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjdHhcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIndvcmtzcGFjZVVyaVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgbGV0IGRvVmFsaWRhdGlvbiA9IGFzeW5jIChkb2N1bWVudCwgc2VydmljZXNJbnN0YW5jZXMpPT57XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlc0luc3RhbmNlcyAhPT0gdm9pZCAwID8gc2VydmljZXNJbnN0YW5jZXMgOiBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgaXMgbGlzdCBvZiBkb2N1bWVudHMgbGlua2VkIHRvIHNlcnZpY2VzXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmlzTGlzdCA9IE9iamVjdC5rZXlzKHNlcnZpY2VzSW5zdGFuY2VzWzBdLmRvY3VtZW50cyk7XG4gICAgICAgICAgICBzZXJ2aWNlc0luc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VzSW5zdGFuY2VzLCBcImRpYWdub3N0aWNzXCIpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSBzZXJ2aWNlc0luc3RhbmNlcy5maWx0ZXIoKGVsKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzLmRpYWdub3N0aWNQcm92aWRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VzSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28udmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBkb2N1bWVudFVyaSBvZiBkb2N1bWVudFVyaXNMaXN0KXtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcbiAgICAgICAgICAgICAgICBsZXQgZGlhZ25vc3RpY3MgPSAoX3JlZiA9IGF3YWl0IFByb21pc2UuYWxsKHNlcnZpY2VzSW5zdGFuY2VzLm1hcCgoZWwpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5kb1ZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBkb2N1bWVudFVyaVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSkpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiBbXTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcImRvY3VtZW50VXJpXCJdID0gZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGRpYWdub3N0aWNzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UgPSBhc3luYyAoc2VydmljZU5hbWUpPT57XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcbiAgICAgICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbnN0YW5jZSA9IHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZSkgYXdhaXQgZG9WYWxpZGF0aW9uKHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgICAgIGN0eC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyAoZXYpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGV2LmRhdGE7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2Vfc2Vzc2lvbklkO1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRCA9IChfbWVzc2FnZV9zZXNzaW9uSWQgPSBtZXNzYWdlW1wic2Vzc2lvbklkXCJdKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9zZXNzaW9uSWQgIT09IHZvaWQgMCA/IF9tZXNzYWdlX3Nlc3Npb25JZCA6IFwiXCI7XG4gICAgICAgICAgICB2YXIgX21lc3NhZ2VfZG9jdW1lbnRVcmk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRVcmkgPSAoX21lc3NhZ2VfZG9jdW1lbnRVcmkgPSBtZXNzYWdlW1wiZG9jdW1lbnRVcmlcIl0pICE9PSBudWxsICYmIF9tZXNzYWdlX2RvY3VtZW50VXJpICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9kb2N1bWVudFVyaSA6IFwiXCI7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IG1lc3NhZ2VbXCJ2ZXJzaW9uXCJdO1xuICAgICAgICAgICAgbGV0IHBvc3RNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBtZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgICAgXCJzZXNzaW9uSWRcIjogc2Vzc2lvbklELFxuICAgICAgICAgICAgICAgIFwiY2FsbGJhY2tJZFwiOiBtZXNzYWdlW1wiY2FsbGJhY2tJZFwiXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudFVyaSk7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRJZGVudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgIHVyaTogZG9jdW1lbnRVcmksXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZm9ybWF0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2Ugd2lsbCB1c2Ugb25seSBmaXJzdCBzZXJ2aWNlIHRvIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZm9ybWF0KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9Db21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uaW5saW5lQ29tcGxldGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJpbmxpbmVDb21wbGV0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbnM6IGF3YWl0IHNlcnZpY2UuZG9JbmxpbmVDb21wbGV0ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28ucmVzb2x2ZUNvbXBsZXRpb246XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VOYW1lID0gbWVzc2FnZS52YWx1ZVtcInNlcnZpY2VcIl07XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCAoKF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb21wbGV0aW9uUmVzb2x2ZVwiKS5maW5kKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lID09PSBzZXJ2aWNlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kLmRvUmVzb2x2ZShtZXNzYWdlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNldFZhbHVlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uaG92ZXI6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJob3ZlclwiLCBcImRvSG92ZXJcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby52YWxpZGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmluaXQ6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuYWRkRG9jdW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZU1vZGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIHRoaXMuY2hhbmdlRG9jdW1lbnRNb2RlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2VPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNsb3NlRG9jdW1lbnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllciwgc2VydmljZUluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2xvc2VDb25uZWN0aW9uOlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQWxsQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nbG9iYWxPcHRpb25zOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE9wdGlvbnMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zLCBtZXNzYWdlLm1lcmdlKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY29uZmlndXJlRmVhdHVyZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlRmVhdHVyZXMobWVzc2FnZS5zZXJ2aWNlTmFtZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UobWVzc2FnZS5zZXJ2aWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2lnbmF0dXJlSGVscDpcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcInNpZ25hdHVyZUhlbHBcIiwgXCJwcm92aWRlU2lnbmF0dXJlSGVscFwiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmRvY3VtZW50SGlnaGxpZ2h0OlxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0cyA9IGF3YWl0IHRoaXMuYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBcImRvY3VtZW50SGlnaGxpZ2h0XCIsIFwiZmluZERvY3VtZW50SGlnaGxpZ2h0c1wiLCBkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gaGlnaGxpZ2h0cy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2V0U2VtYW50aWNUb2tlbnM6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcInNlbWFudGljVG9rZW5zXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0IHNlcnZpY2VJbnN0YW5jZXNbMF0uZ2V0U2VtYW50aWNUb2tlbnMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdldENvZGVBY3Rpb25zOlxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBtZXNzYWdlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IG1lc3NhZ2UuY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvZGVBY3Rpb25cIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlQWN0aW9uczogYXdhaXQgc2VydmljZS5nZXRDb2RlQWN0aW9ucyhkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmV4ZWN1dGVDb21tYW5kOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuZXhlY3V0ZUNvbW1hbmQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5hcHBsaWVkRWRpdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEuc2VuZEFwcGxpZWRSZXN1bHQobWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5jYWxsYmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5zZXRXb3Jrc3BhY2U6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0V29ya3NwYWNlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnJlbmFtZURvY3VtZW50OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2VuZFJlcXVlc3Q6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTI7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyID0gdGhpcy4kc2VydmljZXNbbWVzc2FnZS5zZXJ2aWNlTmFtZV0pID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTIgPSBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTIuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyLnNlbmRSZXF1ZXN0KG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2VuZFJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMywgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUzO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMyA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UzID0gX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUzLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMy5zZW5kUmVzcG9uc2UobWVzc2FnZS5jYWxsYmFja0lkLCBtZXNzYWdlLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZShwb3N0TWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbn0pOyJdLCJuYW1lcyI6WyJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImEiLCJpIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiR28iLCJNZXNzYWdlVHlwZSIsIl9kZWZpbmVfcHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQmFzZU1lc3NhZ2UiLCJjb25zdHJ1Y3RvciIsImRvY3VtZW50SWRlbnRpZmllciIsImNhbGxiYWNrSWQiLCJzZXNzaW9uSWQiLCJkb2N1bWVudFVyaSIsIkluaXRNZXNzYWdlIiwidmVyc2lvbiIsIm1vZGUiLCJvcHRpb25zIiwiaW5pdCIsIkZvcm1hdE1lc3NhZ2UiLCJmb3JtYXQiLCJDb21wbGV0ZU1lc3NhZ2UiLCJjb21wbGV0ZSIsIklubGluZUNvbXBsZXRlTWVzc2FnZSIsImlubGluZUNvbXBsZXRlIiwiUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlIiwicmVzb2x2ZUNvbXBsZXRpb24iLCJIb3Zlck1lc3NhZ2UiLCJob3ZlciIsIlZhbGlkYXRlTWVzc2FnZSIsInZhbGlkYXRlIiwiQ2hhbmdlTWVzc2FnZSIsImNoYW5nZSIsIkRlbHRhc01lc3NhZ2UiLCJhcHBseURlbHRhIiwiQ2hhbmdlTW9kZU1lc3NhZ2UiLCJjaGFuZ2VNb2RlIiwiQ2hhbmdlT3B0aW9uc01lc3NhZ2UiLCJtZXJnZSIsImNoYW5nZU9wdGlvbnMiLCJDbG9zZURvY3VtZW50TWVzc2FnZSIsImNsb3NlRG9jdW1lbnQiLCJDbG9zZUNvbm5lY3Rpb25NZXNzYWdlIiwiY2xvc2VDb25uZWN0aW9uIiwiR2xvYmFsT3B0aW9uc01lc3NhZ2UiLCJzZXJ2aWNlTmFtZSIsImdsb2JhbE9wdGlvbnMiLCJDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UiLCJjb25maWd1cmVGZWF0dXJlcyIsIlNpZ25hdHVyZUhlbHBNZXNzYWdlIiwic2lnbmF0dXJlSGVscCIsIkRvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSIsImRvY3VtZW50SGlnaGxpZ2h0IiwiR2V0U2VtYW50aWNUb2tlbnNNZXNzYWdlIiwiZ2V0U2VtYW50aWNUb2tlbnMiLCJHZXRDb2RlQWN0aW9uc01lc3NhZ2UiLCJjb250ZXh0IiwiZ2V0Q29kZUFjdGlvbnMiLCJTZXRXb3Jrc3BhY2VNZXNzYWdlIiwic2V0V29ya3NwYWNlIiwiRXhlY3V0ZUNvbW1hbmRNZXNzYWdlIiwiY29tbWFuZCIsImFyZ3MiLCJleGVjdXRlQ29tbWFuZCIsIkFwcGxpZWRFZGl0TWVzc2FnZSIsImFwcGxpZWRFZGl0IiwiUmVuYW1lRG9jdW1lbnRNZXNzYWdlIiwicmVuYW1lRG9jdW1lbnQiLCJTZW5kUmVxdWVzdE1lc3NhZ2UiLCJyZXF1ZXN0TmFtZSIsInNlbmRSZXF1ZXN0IiwiU2VuZFJlc3BvbnNlTWVzc2FnZSIsInNlbmRSZXNwb25zZSIsInJMIiwibWVyZ2VPYmplY3RzIiwiejIiLCJub3RFbXB0eSIsIm9iajEiLCJvYmoyIiwiZXhjbHVkZVVuZGVmaW5lZCIsImV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMiLCJtZXJnZWRPYmplY3RzIiwia2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImZpbHRlcmVkRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJfIiwidW5kZWZpbmVkIiwiZnJvbUVudHJpZXMiLCJpc0VtcHR5UmFuZ2UiLCJyYW5nZSIsInN0YXJ0Iiwicm93IiwiZW5kIiwiY29sdW1uIiwibWVyZ2VSYW5nZXMiLCJyYW5nZXMiLCJsaXN0Iiwic29ydCIsImIiLCJjb21wYXJlUG9pbnRzIiwibmV4dCIsImxlbmd0aCIsImNtcCIsInNwbGljZSIsInAxIiwicDIiLCJjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5IiwicmVnZXhwQXJyYXkiLCJ0ZXN0IiwiY29udmVydFRvVXJpIiwiZmlsZVBhdGgiLCJzdGFydHNXaXRoIiwiVVJJIiwiZmlsZSIsInRvU3RyaW5nIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJkZWZpbml0aW9uIiwibyIsImdldCIsInByb3AiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJTZXJ2aWNlTWFuYWdlciIsIl91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayIsIm1lc3NhZ2UiLCJjYWxsYmFjayIsInNlcnZpY2VzIiwicmVkdWNlIiwiYWNjIiwiX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UiLCJfc2VydmljZXNfa2V5Iiwic2VydmljZUluc3RhbmNlIiwic2VydmljZUNhcGFiaWxpdGllcyIsImFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMiLCJzZXJ2aWNlSW5zdGFuY2VzIiwiZmVhdHVyZSIsIm1ldGhvZE5hbWUiLCJhdHRycyIsIlByb21pc2UiLCJhbGwiLCJmaWx0ZXJCeUZlYXR1cmUiLCJtYXAiLCJzZXJ2aWNlIiwiYXBwbHlPcHRpb25zVG9TZXJ2aWNlcyIsImZvckVhY2giLCJzZXRPcHRpb25zIiwiY2xvc2VBbGxDb25uZWN0aW9ucyIsIiRzZXJ2aWNlcyIsIl9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UiLCJfc2VydmljZXNfc2VydmljZU5hbWUiLCIkaW5pdFNlcnZpY2VJbnN0YW5jZSIsImN0eCIsIndvcmtzcGFjZVVyaSIsImluY2x1ZGVzIiwidHlwZSIsImNsYXNzTmFtZSIsIm1vZGVzIiwiaW5pdGlhbGl6YXRpb25PcHRpb25zIiwiX3NlcnZpY2Vfb3B0aW9ucyIsIl9yZWYiLCJzZXRHbG9iYWxPcHRpb25zIiwic2VydmljZURhdGEiLCIkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUiLCJmaW5kU2VydmljZXNCeU1vZGUiLCJpbml0aWFsaXplU2VydmljZSIsInNlcnZpY2VJbml0UHJvbWlzZXMiLCJpZCIsInRoZW4iLCJpbnN0YW5jZSIsInZhbHVlcyIsIl9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZSIsImFkZERvY3VtZW50IiwiZG9jdW1lbnRWYWx1ZSIsInJlcGxhY2UiLCJkb2N1bWVudEl0ZW0iLCJ1cmkiLCJsYW5ndWFnZUlkIiwidGV4dCIsImVsIiwiJHNlc3Npb25JRFRvTW9kZSIsIm5ld0RvY3VtZW50VXJpIiwiZ2V0U2VydmljZXNJbnN0YW5jZXMiLCJjaGFuZ2VEb2N1bWVudE1vZGUiLCJyZW1vdmVEb2N1bWVudCIsImRvY3VtZW50IiwiZmVhdHVyZXMiLCJjYXBhYmlsaXRpZXMiLCJob3ZlclByb3ZpZGVyIiwiY29tcGxldGlvblByb3ZpZGVyIiwiX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIiLCJyZXNvbHZlUHJvdmlkZXIiLCJpbmxpbmVDb21wbGV0aW9uUHJvdmlkZXIiLCJkb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyIiwiZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIiLCJkaWFnbm9zdGljUHJvdmlkZXIiLCJzaWduYXR1cmVIZWxwUHJvdmlkZXIiLCJkb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyIiwic2VtYW50aWNUb2tlbnNQcm92aWRlciIsImNvZGVBY3Rpb25Qcm92aWRlciIsImV4ZWN1dGVDb21tYW5kUHJvdmlkZXIiLCJzZXJ2aWNlc1dpdGhOYW1lIiwiZXh0ZW5zaW9ucyIsInNwbGl0IiwicmVnaXN0ZXJTZXJ2aWNlIiwibmFtZSIsInNldERlZmF1bHRGZWF0dXJlc1N0YXRlIiwicmVnaXN0ZXJTZXJ2ZXIiLCJjbGllbnRDb25maWciLCJzZXJ2aWNlRmVhdHVyZXMiLCJfZmVhdHVyZXMiLCJfZmVhdHVyZXMxIiwiX2ZlYXR1cmVzMiIsIl9mZWF0dXJlczMiLCJfZmVhdHVyZXM0IiwiX2ZlYXR1cmVzNSIsIl9mZWF0dXJlczYiLCJfZmVhdHVyZXM3IiwiX2ZlYXR1cmVzOCIsIl9mZWF0dXJlczkiLCJfZmVhdHVyZXMxMCIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJfc2VtYW50aWNUb2tlbnMiLCJzZW1hbnRpY1Rva2VucyIsIl9jb2RlQWN0aW9uIiwiY29kZUFjdGlvbiIsIl9leGVjdXRlQ29tbWFuZCIsIl9pbmxpbmVDb21wbGV0aW9uIiwiaW5saW5lQ29tcGxldGlvbiIsImRvVmFsaWRhdGlvbiIsInNlcnZpY2VzSW5zdGFuY2VzIiwiZG9jdW1lbnRVcmlzTGlzdCIsImRvY3VtZW50cyIsInBvc3RNZXNzYWdlIiwiZmxhdCIsInByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsInNlc3Npb25JRCIsIl9tZXNzYWdlX2RvY3VtZW50VXJpIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiZG9JbmxpbmVDb21wbGV0ZSIsIl90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kIiwiZmluZCIsImRvUmVzb2x2ZSIsInNldFZhbHVlIiwiYXBwbHlEZWx0YXMiLCJiaW5kIiwiaGlnaGxpZ2h0cyIsImNvZGVBY3Rpb25zIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxIiwic2VuZEFwcGxpZWRSZXN1bHQiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMyIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMyJdLCJzb3VyY2VSb290IjoiIn0=