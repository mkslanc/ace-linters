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
                /**
 * Converts a given file path to a URI format. If the given file path is already a URI,
 * it normalizes and optionally resolves the path against a workspace URI.
 *
 * @param filePath - The file path to convert to a URI. Can be an absolute path or an existing file URI.
 * @param [joinWorkspaceURI] - Optional flag to determine if the converted URI should be joined with given URI
 * @param [workspaceUri] - The base workspace URI to resolve against if `joinWorkspaceURI` is true. Required if resolution is needed.
 * @return {string} - The resulting URI
 */ function convertToUri(filePath, joinWorkspaceURI = false, workspaceUri) {
                    const isFullUri = filePath.startsWith('file://');
                    const normalizedPath = filePath.replace(/\\/g, "/");
                    let uri;
                    if (isFullUri) {
                        uri = URI.parse(normalizedPath);
                    } else {
                        uri = URI.file(normalizedPath);
                    }
                    if (joinWorkspaceURI && workspaceUri) {
                        if (!workspaceUri.startsWith('file://')) {
                            throw new Error('workspaceUri must be a file:// URI');
                        }
                        const workspaceUriParsed = URI.parse(workspaceUri);
                        uri = Utils.joinPath(workspaceUriParsed, uri.path);
                    }
                    return uri.toString();
                }
            /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __nested_webpack_require_23327__(moduleId) {
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
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __nested_webpack_require_23327__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_23327__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_23327__.o(definition, key) && !__nested_webpack_require_23327__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_23327__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_23327__.r = (exports1)=>{
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
        __nested_webpack_require_23327__.r(__nested_webpack_exports__);
        /* harmony export */ __nested_webpack_require_23327__.d(__nested_webpack_exports__, {
            /* harmony export */ ServiceManager: ()=>/* binding */ ServiceManager
        });
        /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_23327__(7770);
        /* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23327__(2032);
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
                    let extensions = value.modes.split('|').map((m)=>m.trim());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUQsS0FBSyxJQUFJLEtBQUssSUFBSUEscURBQXFEM04sWUFBWSxDQUFDNEUsUUFBUXpJLFVBQVUsRUFBRXlJLFFBQVF0RixJQUFJOzRCQUNsZDtvQkFDUjtvQkFDQWlILElBQUl5RixXQUFXLENBQUNBO2dCQUNwQjtZQUNKO1FBQ0o7UUFFQSxNQUFNLEdBQUksT0FBTzlRLDBCQUFtQkE7SUFDcEMsTUFBTSxHQUFHO0FBRVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vcGFja2FnZXMvYWNlLWxpbnRlcnMvYnVpbGQvc2VydmljZS1tYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gLyoqKioqKi8gKCgpID0+IHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyAyMDMyOlxuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBHbzogKCkgPT4gKC8qIGJpbmRpbmcgKi8gTWVzc2FnZVR5cGUpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgQmFzZU1lc3NhZ2UsIEluaXRNZXNzYWdlLCBGb3JtYXRNZXNzYWdlLCBDb21wbGV0ZU1lc3NhZ2UsIElubGluZUNvbXBsZXRlTWVzc2FnZSwgUmVzb2x2ZUNvbXBsZXRpb25NZXNzYWdlLCBIb3Zlck1lc3NhZ2UsIFZhbGlkYXRlTWVzc2FnZSwgQ2hhbmdlTWVzc2FnZSwgRGVsdGFzTWVzc2FnZSwgQ2hhbmdlTW9kZU1lc3NhZ2UsIENoYW5nZU9wdGlvbnNNZXNzYWdlLCBDbG9zZURvY3VtZW50TWVzc2FnZSwgQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSwgR2xvYmFsT3B0aW9uc01lc3NhZ2UsIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSwgU2lnbmF0dXJlSGVscE1lc3NhZ2UsIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSwgR2V0U2VtYW50aWNUb2tlbnNNZXNzYWdlLCBHZXRDb2RlQWN0aW9uc01lc3NhZ2UsIFNldFdvcmtzcGFjZU1lc3NhZ2UsIEV4ZWN1dGVDb21tYW5kTWVzc2FnZSwgQXBwbGllZEVkaXRNZXNzYWdlLCBSZW5hbWVEb2N1bWVudE1lc3NhZ2UsIFNlbmRSZXF1ZXN0TWVzc2FnZSwgU2VuZFJlc3BvbnNlTWVzc2FnZSAqL1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuY2xhc3MgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXNzaW9uSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImRvY3VtZW50VXJpXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklkID0gZG9jdW1lbnRJZGVudGlmaWVyLnNlc3Npb25JZDtcbiAgICAgICAgdGhpcy5kb2N1bWVudFVyaSA9IGRvY3VtZW50SWRlbnRpZmllci5kb2N1bWVudFVyaTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICB9XG59XG5jbGFzcyBJbml0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uLCBtb2RlLCBvcHRpb25zKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaW5pdCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRm9ybWF0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCBmb3JtYXQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5mb3JtYXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImZvcm1hdFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cbn1cbmNsYXNzIENvbXBsZXRlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29tcGxldGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIElubGluZUNvbXBsZXRlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaW5saW5lQ29tcGxldGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUucmVzb2x2ZUNvbXBsZXRpb24pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEhvdmVyTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuaG92ZXIpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFZhbGlkYXRlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS52YWxpZGF0ZSk7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBEZWx0YXNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5hcHBseURlbHRhKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG59XG5jbGFzcyBDaGFuZ2VNb2RlTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uLCBtb2RlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlTW9kZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlT3B0aW9uc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlT3B0aW9ucyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1lcmdlID0gbWVyZ2U7XG4gICAgfVxufVxuY2xhc3MgQ2xvc2VEb2N1bWVudE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2xvc2VEb2N1bWVudCk7XG4gICAgfVxufVxuY2xhc3MgQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2tJZCl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNsb3NlQ29ubmVjdGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgfVxufVxuY2xhc3MgR2xvYmFsT3B0aW9uc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENvbmZpZ3VyZUZlYXR1cmVzTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIG9wdGlvbnMpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlcyk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxufVxuY2xhc3MgU2lnbmF0dXJlSGVscE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNpZ25hdHVyZUhlbHApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZG9jdW1lbnRIaWdobGlnaHQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEdldFNlbWFudGljVG9rZW5zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2V0U2VtYW50aWNUb2tlbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEdldENvZGVBY3Rpb25zTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZ2V0Q29kZUFjdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNvbnRleHRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbn1cbmNsYXNzIFNldFdvcmtzcGFjZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2V0V29ya3NwYWNlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBFeGVjdXRlQ29tbWFuZE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkLCBjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmV4ZWN1dGVDb21tYW5kKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJhcmdzXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxufVxuY2xhc3MgQXBwbGllZEVkaXRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgc2VydmljZU5hbWUsIGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbGllZEVkaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgUmVuYW1lRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZW5hbWVEb2N1bWVudCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgU2VuZFJlcXVlc3RNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCwgcmVxdWVzdE5hbWUsIGFyZ3Mpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2VuZFJlcXVlc3QpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImFyZ3NcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLnZhbHVlID0gcmVxdWVzdE5hbWU7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxufVxuY2xhc3MgU2VuZFJlc3BvbnNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIGNhbGxiYWNrSWQsIGFyZ3Mpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuc2VuZFJlc3BvbnNlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImFyZ3NcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cbn1cbnZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbihNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaW5pdFwiXSA9IDBdID0gXCJpbml0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJmb3JtYXRcIl0gPSAxXSA9IFwiZm9ybWF0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb21wbGV0ZVwiXSA9IDJdID0gXCJjb21wbGV0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wicmVzb2x2ZUNvbXBsZXRpb25cIl0gPSAzXSA9IFwicmVzb2x2ZUNvbXBsZXRpb25cIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZVwiXSA9IDRdID0gXCJjaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImhvdmVyXCJdID0gNV0gPSBcImhvdmVyXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJ2YWxpZGF0ZVwiXSA9IDZdID0gXCJ2YWxpZGF0ZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlEZWx0YVwiXSA9IDddID0gXCJhcHBseURlbHRhXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VNb2RlXCJdID0gOF0gPSBcImNoYW5nZU1vZGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU9wdGlvbnNcIl0gPSA5XSA9IFwiY2hhbmdlT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2xvc2VEb2N1bWVudFwiXSA9IDEwXSA9IFwiY2xvc2VEb2N1bWVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2xvYmFsT3B0aW9uc1wiXSA9IDExXSA9IFwiZ2xvYmFsT3B0aW9uc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29uZmlndXJlRmVhdHVyZXNcIl0gPSAxMl0gPSBcImNvbmZpZ3VyZUZlYXR1cmVzXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzaWduYXR1cmVIZWxwXCJdID0gMTNdID0gXCJzaWduYXR1cmVIZWxwXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkb2N1bWVudEhpZ2hsaWdodFwiXSA9IDE0XSA9IFwiZG9jdW1lbnRIaWdobGlnaHRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlQ29ubmVjdGlvblwiXSA9IDE1XSA9IFwiY2xvc2VDb25uZWN0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjYXBhYmlsaXRpZXNDaGFuZ2VcIl0gPSAxNl0gPSBcImNhcGFiaWxpdGllc0NoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2V0U2VtYW50aWNUb2tlbnNcIl0gPSAxN10gPSBcImdldFNlbWFudGljVG9rZW5zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnZXRDb2RlQWN0aW9uc1wiXSA9IDE4XSA9IFwiZ2V0Q29kZUFjdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImV4ZWN1dGVDb21tYW5kXCJdID0gMTldID0gXCJleGVjdXRlQ29tbWFuZFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiYXBwbHlFZGl0XCJdID0gMjBdID0gXCJhcHBseUVkaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGxpZWRFZGl0XCJdID0gMjFdID0gXCJhcHBsaWVkRWRpdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2V0V29ya3NwYWNlXCJdID0gMjJdID0gXCJzZXRXb3Jrc3BhY2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlbmFtZURvY3VtZW50XCJdID0gMjNdID0gXCJyZW5hbWVEb2N1bWVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2VuZFJlcXVlc3RcIl0gPSAyNF0gPSBcInNlbmRSZXF1ZXN0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJzaG93RG9jdW1lbnRcIl0gPSAyNV0gPSBcInNob3dEb2N1bWVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2VuZFJlc3BvbnNlXCJdID0gMjZdID0gXCJzZW5kUmVzcG9uc2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImlubGluZUNvbXBsZXRlXCJdID0gMjddID0gXCJpbmxpbmVDb21wbGV0ZVwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gNzc3MDpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgckw6ICgpID0+ICgvKiBiaW5kaW5nICovIG1lcmdlT2JqZWN0cyksXG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIHoyOiAoKSA9PiAoLyogYmluZGluZyAqLyBub3RFbXB0eSlcbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogdW51c2VkIGhhcm1vbnkgZXhwb3J0cyBpc0VtcHR5UmFuZ2UsIG1lcmdlUmFuZ2VzLCBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5LCBjb252ZXJ0VG9VcmkgKi9cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvYmoxLCBvYmoyLCBleGNsdWRlVW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICBpZiAoIW9iajEpIHJldHVybiBvYmoyO1xuICAgIGlmICghb2JqMikgcmV0dXJuIG9iajE7XG4gICAgaWYgKGV4Y2x1ZGVVbmRlZmluZWQpIHtcbiAgICAgICAgb2JqMSA9IGV4Y2x1ZGVVbmRlZmluZWRWYWx1ZXMob2JqMSk7XG4gICAgICAgIG9iajIgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajIpO1xuICAgIH1cbiAgICBjb25zdCBtZXJnZWRPYmplY3RzID0ge1xuICAgICAgICAuLi5vYmoyLFxuICAgICAgICAuLi5vYmoxXG4gICAgfTsgLy8gR2l2ZSBwcmlvcml0eSB0byBvYmoxIHZhbHVlcyBieSBzcHJlYWRpbmcgb2JqMiBmaXJzdCwgdGhlbiBvYmoxXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWVyZ2VkT2JqZWN0cykpe1xuICAgICAgICBpZiAob2JqMVtrZXldICYmIG9iajJba2V5XSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqMVtrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajFba2V5XS5jb25jYXQob2JqMltrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoyW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkT2JqZWN0c1trZXldID0gb2JqMltrZXldLmNvbmNhdChvYmoxW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqMVtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqMltrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG1lcmdlT2JqZWN0cyhvYmoxW2tleV0sIG9iajJba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZE9iamVjdHM7XG59XG5mdW5jdGlvbiBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iaikge1xuICAgIGNvbnN0IGZpbHRlcmVkRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaikuZmlsdGVyKChbXywgdmFsdWVdKT0+dmFsdWUgIT09IHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhmaWx0ZXJlZEVudHJpZXMpO1xufVxuZnVuY3Rpb24gbm90RW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzRW1wdHlSYW5nZShyYW5nZSkge1xuICAgIHJldHVybiByYW5nZS5zdGFydC5yb3cgPT09IHJhbmdlLmVuZC5yb3cgJiYgcmFuZ2Uuc3RhcnQuY29sdW1uID09PSByYW5nZS5lbmQuY29sdW1uO1xufVxuLy90YWtlbiB3aXRoIHNtYWxsIGNoYW5nZXMgZnJvbSBhY2UtY29kZVxuZnVuY3Rpb24gbWVyZ2VSYW5nZXMocmFuZ2VzKSB7XG4gICAgdmFyIGxpc3QgPSByYW5nZXM7XG4gICAgbGlzdCA9IGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlUG9pbnRzKGEuc3RhcnQsIGIuc3RhcnQpO1xuICAgIH0pO1xuICAgIHZhciBuZXh0ID0gbGlzdFswXSwgcmFuZ2U7XG4gICAgZm9yKHZhciBpID0gMTsgaSA8IGxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICByYW5nZSA9IG5leHQ7XG4gICAgICAgIG5leHQgPSBsaXN0W2ldO1xuICAgICAgICB2YXIgY21wID0gY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuc3RhcnQpO1xuICAgICAgICBpZiAoY21wIDwgMCkgY29udGludWU7XG4gICAgICAgIGlmIChjbXAgPT0gMCAmJiAhaXNFbXB0eVJhbmdlKHJhbmdlKSAmJiAhaXNFbXB0eVJhbmdlKG5leHQpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LmVuZCkgPCAwKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gbmV4dC5lbmQucm93O1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IG5leHQuZW5kLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgbmV4dCA9IHJhbmdlO1xuICAgICAgICBpLS07XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuZnVuY3Rpb24gY29tcGFyZVBvaW50cyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEucm93IC0gcDIucm93IHx8IHAxLmNvbHVtbiAtIHAyLmNvbHVtbjtcbn1cbmZ1bmN0aW9uIGNoZWNrVmFsdWVBZ2FpbnN0UmVnZXhwQXJyYXkodmFsdWUsIHJlZ2V4cEFycmF5KSB7XG4gICAgaWYgKCFyZWdleHBBcnJheSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWdleHBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChyZWdleHBBcnJheVtpXS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgZ2l2ZW4gZmlsZSBwYXRoIHRvIGEgVVJJIGZvcm1hdC4gSWYgdGhlIGdpdmVuIGZpbGUgcGF0aCBpcyBhbHJlYWR5IGEgVVJJLFxuICogaXQgbm9ybWFsaXplcyBhbmQgb3B0aW9uYWxseSByZXNvbHZlcyB0aGUgcGF0aCBhZ2FpbnN0IGEgd29ya3NwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGggLSBUaGUgZmlsZSBwYXRoIHRvIGNvbnZlcnQgdG8gYSBVUkkuIENhbiBiZSBhbiBhYnNvbHV0ZSBwYXRoIG9yIGFuIGV4aXN0aW5nIGZpbGUgVVJJLlxuICogQHBhcmFtIFtqb2luV29ya3NwYWNlVVJJXSAtIE9wdGlvbmFsIGZsYWcgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb252ZXJ0ZWQgVVJJIHNob3VsZCBiZSBqb2luZWQgd2l0aCBnaXZlbiBVUklcbiAqIEBwYXJhbSBbd29ya3NwYWNlVXJpXSAtIFRoZSBiYXNlIHdvcmtzcGFjZSBVUkkgdG8gcmVzb2x2ZSBhZ2FpbnN0IGlmIGBqb2luV29ya3NwYWNlVVJJYCBpcyB0cnVlLiBSZXF1aXJlZCBpZiByZXNvbHV0aW9uIGlzIG5lZWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgcmVzdWx0aW5nIFVSSVxuICovIGZ1bmN0aW9uIGNvbnZlcnRUb1VyaShmaWxlUGF0aCwgam9pbldvcmtzcGFjZVVSSSA9IGZhbHNlLCB3b3Jrc3BhY2VVcmkpIHtcbiAgICBjb25zdCBpc0Z1bGxVcmkgPSBmaWxlUGF0aC5zdGFydHNXaXRoKCdmaWxlOi8vJyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBmaWxlUGF0aC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcbiAgICBsZXQgdXJpO1xuICAgIGlmIChpc0Z1bGxVcmkpIHtcbiAgICAgICAgdXJpID0gVVJJLnBhcnNlKG5vcm1hbGl6ZWRQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSBVUkkuZmlsZShub3JtYWxpemVkUGF0aCk7XG4gICAgfVxuICAgIGlmIChqb2luV29ya3NwYWNlVVJJICYmIHdvcmtzcGFjZVVyaSkge1xuICAgICAgICBpZiAoIXdvcmtzcGFjZVVyaS5zdGFydHNXaXRoKCdmaWxlOi8vJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignd29ya3NwYWNlVXJpIG11c3QgYmUgYSBmaWxlOi8vIFVSSScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZVVyaVBhcnNlZCA9IFVSSS5wYXJzZSh3b3Jrc3BhY2VVcmkpO1xuICAgICAgICB1cmkgPSBVdGlscy5qb2luUGF0aCh3b3Jrc3BhY2VVcmlQYXJzZWQsIHVyaS5wYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaS50b1N0cmluZygpO1xufVxuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTZXJ2aWNlTWFuYWdlcjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gU2VydmljZU1hbmFnZXIpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzc3MCk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMjAzMik7XG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cblxuY2xhc3MgU2VydmljZU1hbmFnZXIge1xuICAgIGFzeW5jIGdldFNlcnZpY2VzQ2FwYWJpbGl0aWVzQWZ0ZXJDYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IGNhbGxiYWNrKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VydmljZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzZXJ2aWNlcykucmVkdWNlKChhY2MsIGtleSk9PntcbiAgICAgICAgICAgICAgICB2YXIgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UsIF9zZXJ2aWNlc19rZXk7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSAoKF9zZXJ2aWNlc19rZXkgPSBzZXJ2aWNlc1trZXldKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfa2V5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPSBfc2VydmljZXNfa2V5LnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX2tleV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlLnNlcnZpY2VDYXBhYmlsaXRpZXMpIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBhZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUsIG1ldGhvZE5hbWUsIGRvY3VtZW50SWRlbnRpZmllciwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhdHRycykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZVttZXRob2ROYW1lXShkb2N1bWVudElkZW50aWZpZXIsIC4uLmF0dHJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VbbWV0aG9kTmFtZV0oZG9jdW1lbnRJZGVudGlmaWVyLCBhdHRycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgfVxuICAgIGFwcGx5T3B0aW9uc1RvU2VydmljZXMoc2VydmljZUluc3RhbmNlcywgZG9jdW1lbnRVcmksIG9wdGlvbnMpIHtcbiAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgc2VydmljZS5zZXRPcHRpb25zKGRvY3VtZW50VXJpLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlQWxsQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlcyA9IHRoaXMuJHNlcnZpY2VzO1xuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIHZhciBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfc2VydmljZU5hbWU7XG4gICAgICAgICAgICBhd2FpdCAoKF9zZXJ2aWNlc19zZXJ2aWNlTmFtZSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UuY2xvc2VDb25uZWN0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyAkaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlLCBjdHgsIHdvcmtzcGFjZVVyaSkge1xuICAgICAgICBsZXQgbW9kdWxlO1xuICAgICAgICBpZiAoJ3R5cGUnIGluIHNlcnZpY2UpIHtcbiAgICAgICAgICAgIGlmIChbXG4gICAgICAgICAgICAgICAgXCJzb2NrZXRcIixcbiAgICAgICAgICAgICAgICBcIndlYndvcmtlclwiXG4gICAgICAgICAgICBdLmluY2x1ZGVzKHNlcnZpY2UudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtcIkxhbmd1YWdlQ2xpZW50XCJdKHNlcnZpY2UsIGN0eCwgd29ya3NwYWNlVXJpKTtcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBcIlVua25vd24gc2VydmljZSB0eXBlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBzZXJ2aWNlLm1vZHVsZSgpO1xuICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmljZS5vcHRpb25zIHx8IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2Vfb3B0aW9ucywgX3JlZjtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoKF9yZWYgPSAoX3NlcnZpY2Vfb3B0aW9ucyA9IHNlcnZpY2Uub3B0aW9ucykgIT09IG51bGwgJiYgX3NlcnZpY2Vfb3B0aW9ucyAhPT0gdm9pZCAwID8gX3NlcnZpY2Vfb3B0aW9ucyA6IHNlcnZpY2UuaW5pdGlhbGl6YXRpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDoge30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VEYXRhID0gc2VydmljZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgIH1cbiAgICBhc3luYyAkZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNlcnZpY2VzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHNlcnZpY2VOYW1lIGluIHNlcnZpY2VzKXtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICB9XG4gICAgYXN5bmMgaW5pdGlhbGl6ZVNlcnZpY2Uoc2VydmljZU5hbWUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSW5pdFByb21pc2VzW3NlcnZpY2UuaWRdID0gU2VydmljZU1hbmFnZXIuJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgdGhpcy5jdHgsIHRoaXMud29ya3NwYWNlVXJpKS50aGVuKChpbnN0YW5jZSk9PntcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTsgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEdsb2JhbE9wdGlvbnMoc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICBzZXJ2aWNlLm9wdGlvbnMgPSBtZXJnZSA/ICgwLF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm1lcmdlT2JqZWN0cyAqLyAuckwpKG9wdGlvbnMsIHNlcnZpY2Uub3B0aW9ucykgOiBvcHRpb25zO1xuICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNldEdsb2JhbE9wdGlvbnMoc2VydmljZS5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlVXJpKSB7XG4gICAgICAgIHRoaXMud29ya3NwYWNlVXJpID0gd29ya3NwYWNlVXJpO1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuJHNlcnZpY2VzKS5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIChfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2Uuc2V0V29ya3NwYWNlKHRoaXMud29ya3NwYWNlVXJpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgZG9jdW1lbnRWYWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGUgfHwgIS9eYWNlXFwvbW9kZVxcLy8udGVzdChtb2RlKSkgcmV0dXJuO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKFwiYWNlL21vZGUvXCIsIFwiXCIpO1xuICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKC9nb2xhbmckLywgXCJnb1wiKTtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXJ2aWNlcykubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGxldCBkb2N1bWVudEl0ZW0gPSB7XG4gICAgICAgICAgICB1cmk6IGRvY3VtZW50SWRlbnRpZmllci51cmksXG4gICAgICAgICAgICB2ZXJzaW9uOiBkb2N1bWVudElkZW50aWZpZXIudmVyc2lvbixcbiAgICAgICAgICAgIGxhbmd1YWdlSWQ6IG1vZGUsXG4gICAgICAgICAgICB0ZXh0OiBkb2N1bWVudFZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc2VydmljZXMpLmZvckVhY2goKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlLmFkZERvY3VtZW50KGRvY3VtZW50SXRlbSkpO1xuICAgICAgICB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV0gPSBtb2RlO1xuICAgICAgICByZXR1cm4gc2VydmljZXM7XG4gICAgfVxuICAgIGFzeW5jIHJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbmV3RG9jdW1lbnRVcmkpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudElkZW50aWZpZXIudXJpKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlcnZpY2VzLmZvckVhY2goKGVsKT0+ZWwucmVuYW1lRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBuZXdEb2N1bWVudFVyaSkpO1xuICAgICAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW25ld0RvY3VtZW50VXJpXSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudC51cmkpO1xuICAgICAgICBpZiAoc2VydmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaCgoZWwpPT5lbC5yZW1vdmVEb2N1bWVudChkb2N1bWVudCkpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudC51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50VXJpKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50VXJpXTtcbiAgICAgICAgaWYgKCFtb2RlKSByZXR1cm4gW107IC8vVE9ETzpcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5tYXAoKGVsKT0+ZWwuc2VydmljZUluc3RhbmNlKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgIGlmICghZWwuc2VydmljZURhdGEuZmVhdHVyZXNbZmVhdHVyZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBlbC5zZXJ2aWNlQ2FwYWJpbGl0aWVzO1xuICAgICAgICAgICAgc3dpdGNoKGZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJob3ZlclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmhvdmVyUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25SZXNvbHZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPSBjYXBhYmlsaXRpZXMuY29tcGxldGlvblByb3ZpZGVyKSA9PT0gbnVsbCB8fCBfY2FwYWJpbGl0aWVzX2NvbXBsZXRpb25Qcm92aWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIucmVzb2x2ZVByb3ZpZGVyKSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW5saW5lQ29tcGxldGlvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmlubGluZUNvbXBsZXRpb25Qcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZSB8fCBjYXBhYmlsaXRpZXMuZG9jdW1lbnRGb3JtYXR0aW5nUHJvdmlkZXIgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGlhZ25vc3RpY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaWduYXR1cmVIZWxwXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2lnbmF0dXJlSGVscFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRIaWdobGlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudEhpZ2hsaWdodFByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbWFudGljVG9rZW5zXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuc2VtYW50aWNUb2tlbnNQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvZGVBY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb2RlQWN0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJleGVjdXRlQ29tbWFuZFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmV4ZWN1dGVDb21tYW5kUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzV2l0aE5hbWUgPSB7fTtcbiAgICAgICAgT2JqZWN0LmVudHJpZXModGhpcy4kc2VydmljZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSk9PntcbiAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUubW9kZXMuc3BsaXQoJ3wnKS5tYXAoKG0pPT5tLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmNsdWRlcyhtb2RlKSkgc2VydmljZXNXaXRoTmFtZVtrZXldID0gdGhpcy4kc2VydmljZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlc1dpdGhOYW1lO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczYsIF9mZWF0dXJlczcsIF9mZWF0dXJlczgsIF9mZWF0dXJlczksIF9mZWF0dXJlczEwO1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zZW1hbnRpY1Rva2VucztcbiAgICAgICAgKF9zZW1hbnRpY1Rva2VucyA9IChfZmVhdHVyZXM3ID0gZmVhdHVyZXMpLnNlbWFudGljVG9rZW5zKSAhPT0gbnVsbCAmJiBfc2VtYW50aWNUb2tlbnMgIT09IHZvaWQgMCA/IF9zZW1hbnRpY1Rva2VucyA6IF9mZWF0dXJlczcuc2VtYW50aWNUb2tlbnMgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvZGVBY3Rpb247XG4gICAgICAgIChfY29kZUFjdGlvbiA9IChfZmVhdHVyZXM4ID0gZmVhdHVyZXMpLmNvZGVBY3Rpb24pICE9PSBudWxsICYmIF9jb2RlQWN0aW9uICE9PSB2b2lkIDAgPyBfY29kZUFjdGlvbiA6IF9mZWF0dXJlczguY29kZUFjdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfZXhlY3V0ZUNvbW1hbmQ7XG4gICAgICAgIChfZXhlY3V0ZUNvbW1hbmQgPSAoX2ZlYXR1cmVzOSA9IGZlYXR1cmVzKS5leGVjdXRlQ29tbWFuZCkgIT09IG51bGwgJiYgX2V4ZWN1dGVDb21tYW5kICE9PSB2b2lkIDAgPyBfZXhlY3V0ZUNvbW1hbmQgOiBfZmVhdHVyZXM5LmV4ZWN1dGVDb21tYW5kID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9pbmxpbmVDb21wbGV0aW9uO1xuICAgICAgICAoX2lubGluZUNvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMTAgPSBmZWF0dXJlcykuaW5saW5lQ29tcGxldGlvbikgIT09IG51bGwgJiYgX2lubGluZUNvbXBsZXRpb24gIT09IHZvaWQgMCA/IF9pbmxpbmVDb21wbGV0aW9uIDogX2ZlYXR1cmVzMTAuaW5saW5lQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlcztcbiAgICB9XG4gICAgY29uc3RydWN0b3IoY3R4KXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXJ2aWNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlSW5pdFByb21pc2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXNzaW9uSURUb01vZGVcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY3R4XCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ3b3Jrc3BhY2VVcmlcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIGxldCBkb1ZhbGlkYXRpb24gPSBhc3luYyAoZG9jdW1lbnQsIHNlcnZpY2VzSW5zdGFuY2VzKT0+e1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgIT09IG51bGwgJiYgc2VydmljZXNJbnN0YW5jZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VzSW5zdGFuY2VzIDogc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzIGlzIGxpc3Qgb2YgZG9jdW1lbnRzIGxpbmtlZCB0byBzZXJ2aWNlc1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50VXJpc0xpc3QgPSBPYmplY3Qua2V5cyhzZXJ2aWNlc0luc3RhbmNlc1swXS5kb2N1bWVudHMpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlc0luc3RhbmNlcywgXCJkaWFnbm9zdGljc1wiKTtcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzID0gc2VydmljZXNJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuc2VydmljZUNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnZhbGlkYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgZG9jdW1lbnRVcmkgb2YgZG9jdW1lbnRVcmlzTGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogZG9jdW1lbnRVcmlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogW107XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJkb2N1bWVudFVyaVwiXSA9IGRvY3VtZW50VXJpO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZVtcInNlc3Npb25JZFwiXSkgIT09IG51bGwgJiYgX21lc3NhZ2Vfc2Vzc2lvbklkICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9zZXNzaW9uSWQgOiBcIlwiO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX2RvY3VtZW50VXJpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50VXJpID0gKF9tZXNzYWdlX2RvY3VtZW50VXJpID0gbWVzc2FnZVtcImRvY3VtZW50VXJpXCJdKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9kb2N1bWVudFVyaSAhPT0gdm9pZCAwID8gX21lc3NhZ2VfZG9jdW1lbnRVcmkgOiBcIlwiO1xuICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBtZXNzYWdlW1widmVyc2lvblwiXTtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgICAgIFwic2Vzc2lvbklkXCI6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICAgICBcImNhbGxiYWNrSWRcIjogbWVzc2FnZVtcImNhbGxiYWNrSWRcIl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnRVcmkpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50SWRlbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IGRvY3VtZW50VXJpLFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmZvcm1hdDpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZSB0byBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmZvcm1hdChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmlubGluZUNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaW5saW5lQ29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvSW5saW5lQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWVbXCJzZXJ2aWNlXCJdO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgKChfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblJlc29sdmVcIikuZmluZCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpID09PSBudWxsIHx8IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZC5kb1Jlc29sdmUobWVzc2FnZS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXRWYWx1ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5hcHBseURlbHRhOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmFwcGx5RGVsdGFzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5hZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIiwgXCJkb0hvdmVyXCIsIGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28udmFsaWRhdGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5pbml0OlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCB0aGlzLmFkZERvY3VtZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2VNb2RlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCB0aGlzLmNoYW5nZURvY3VtZW50TW9kZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseU9wdGlvbnNUb1NlcnZpY2VzKHNlcnZpY2VJbnN0YW5jZXMsIGRvY3VtZW50VXJpLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jbG9zZURvY3VtZW50OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNsb3NlQ29ubmVjdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFsbENvbm5lY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2xvYmFsT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxPcHRpb25zKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucywgbWVzc2FnZS5tZXJnZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNvbmZpZ3VyZUZlYXR1cmVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUZlYXR1cmVzKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNpZ25hdHVyZUhlbHA6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJzaWduYXR1cmVIZWxwXCIsIFwicHJvdmlkZVNpZ25hdHVyZUhlbHBcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiLCBcImZpbmREb2N1bWVudEhpZ2hsaWdodHNcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGhpZ2hsaWdodHMuZmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdldFNlbWFudGljVG9rZW5zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJzZW1hbnRpY1Rva2Vuc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmdldFNlbWFudGljVG9rZW5zKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nZXRDb2RlQWN0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbWVzc2FnZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBtZXNzYWdlLmNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb2RlQWN0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZUFjdGlvbnM6IGF3YWl0IHNlcnZpY2UuZ2V0Q29kZUFjdGlvbnMoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5leGVjdXRlQ29tbWFuZDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPSBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLmV4ZWN1dGVDb21tYW5kKG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uYXBwbGllZEVkaXQ6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTE7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxID0gdGhpcy4kc2VydmljZXNbbWVzc2FnZS5zZXJ2aWNlTmFtZV0pID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEgPSBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxLnNlbmRBcHBsaWVkUmVzdWx0KG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuY2FsbGJhY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2V0V29ya3NwYWNlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFdvcmtzcGFjZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5yZW5hbWVEb2N1bWVudDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5hbWVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNlbmRSZXF1ZXN0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMiwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMiA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyID0gX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMi5zZW5kUmVxdWVzdChtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNlbmRSZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMztcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTMgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUzID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMyA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMy5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMuc2VuZFJlc3BvbnNlKG1lc3NhZ2UuY2FsbGJhY2tJZCwgbWVzc2FnZS5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkdvIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJkb2N1bWVudElkZW50aWZpZXIiLCJjYWxsYmFja0lkIiwic2Vzc2lvbklkIiwiZG9jdW1lbnRVcmkiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJJbmxpbmVDb21wbGV0ZU1lc3NhZ2UiLCJpbmxpbmVDb21wbGV0ZSIsIlJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSIsInJlc29sdmVDb21wbGV0aW9uIiwiSG92ZXJNZXNzYWdlIiwiaG92ZXIiLCJWYWxpZGF0ZU1lc3NhZ2UiLCJ2YWxpZGF0ZSIsIkNoYW5nZU1lc3NhZ2UiLCJjaGFuZ2UiLCJEZWx0YXNNZXNzYWdlIiwiYXBwbHlEZWx0YSIsIkNoYW5nZU1vZGVNZXNzYWdlIiwiY2hhbmdlTW9kZSIsIkNoYW5nZU9wdGlvbnNNZXNzYWdlIiwibWVyZ2UiLCJjaGFuZ2VPcHRpb25zIiwiQ2xvc2VEb2N1bWVudE1lc3NhZ2UiLCJjbG9zZURvY3VtZW50IiwiQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSIsImNsb3NlQ29ubmVjdGlvbiIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkdldFNlbWFudGljVG9rZW5zTWVzc2FnZSIsImdldFNlbWFudGljVG9rZW5zIiwiR2V0Q29kZUFjdGlvbnNNZXNzYWdlIiwiY29udGV4dCIsImdldENvZGVBY3Rpb25zIiwiU2V0V29ya3NwYWNlTWVzc2FnZSIsInNldFdvcmtzcGFjZSIsIkV4ZWN1dGVDb21tYW5kTWVzc2FnZSIsImNvbW1hbmQiLCJhcmdzIiwiZXhlY3V0ZUNvbW1hbmQiLCJBcHBsaWVkRWRpdE1lc3NhZ2UiLCJhcHBsaWVkRWRpdCIsIlJlbmFtZURvY3VtZW50TWVzc2FnZSIsInJlbmFtZURvY3VtZW50IiwiU2VuZFJlcXVlc3RNZXNzYWdlIiwicmVxdWVzdE5hbWUiLCJzZW5kUmVxdWVzdCIsIlNlbmRSZXNwb25zZU1lc3NhZ2UiLCJzZW5kUmVzcG9uc2UiLCJyTCIsIm1lcmdlT2JqZWN0cyIsInoyIiwibm90RW1wdHkiLCJvYmoxIiwib2JqMiIsImV4Y2x1ZGVVbmRlZmluZWQiLCJleGNsdWRlVW5kZWZpbmVkVmFsdWVzIiwibWVyZ2VkT2JqZWN0cyIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJmaWx0ZXJlZEVudHJpZXMiLCJlbnRyaWVzIiwiZmlsdGVyIiwiXyIsInVuZGVmaW5lZCIsImZyb21FbnRyaWVzIiwiaXNFbXB0eVJhbmdlIiwicmFuZ2UiLCJzdGFydCIsInJvdyIsImVuZCIsImNvbHVtbiIsIm1lcmdlUmFuZ2VzIiwicmFuZ2VzIiwibGlzdCIsInNvcnQiLCJiIiwiY29tcGFyZVBvaW50cyIsIm5leHQiLCJsZW5ndGgiLCJjbXAiLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsImNvbnZlcnRUb1VyaSIsImZpbGVQYXRoIiwiam9pbldvcmtzcGFjZVVSSSIsIndvcmtzcGFjZVVyaSIsImlzRnVsbFVyaSIsInN0YXJ0c1dpdGgiLCJub3JtYWxpemVkUGF0aCIsInJlcGxhY2UiLCJ1cmkiLCJVUkkiLCJwYXJzZSIsImZpbGUiLCJFcnJvciIsIndvcmtzcGFjZVVyaVBhcnNlZCIsIlV0aWxzIiwiam9pblBhdGgiLCJwYXRoIiwidG9TdHJpbmciLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJvIiwiZ2V0IiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIlNlcnZpY2VNYW5hZ2VyIiwiX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrIiwibWVzc2FnZSIsImNhbGxiYWNrIiwic2VydmljZXMiLCJyZWR1Y2UiLCJhY2MiLCJfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSIsIl9zZXJ2aWNlc19rZXkiLCJzZXJ2aWNlSW5zdGFuY2UiLCJzZXJ2aWNlQ2FwYWJpbGl0aWVzIiwiYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyIsInNlcnZpY2VJbnN0YW5jZXMiLCJmZWF0dXJlIiwibWV0aG9kTmFtZSIsImF0dHJzIiwiUHJvbWlzZSIsImFsbCIsImZpbHRlckJ5RmVhdHVyZSIsIm1hcCIsInNlcnZpY2UiLCJhcHBseU9wdGlvbnNUb1NlcnZpY2VzIiwiZm9yRWFjaCIsInNldE9wdGlvbnMiLCJjbG9zZUFsbENvbm5lY3Rpb25zIiwiJHNlcnZpY2VzIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl9zZXJ2aWNlc19zZXJ2aWNlTmFtZSIsIiRpbml0U2VydmljZUluc3RhbmNlIiwiY3R4IiwiaW5jbHVkZXMiLCJ0eXBlIiwiY2xhc3NOYW1lIiwibW9kZXMiLCJpbml0aWFsaXphdGlvbk9wdGlvbnMiLCJfc2VydmljZV9vcHRpb25zIiwiX3JlZiIsInNldEdsb2JhbE9wdGlvbnMiLCJzZXJ2aWNlRGF0YSIsIiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZSIsImZpbmRTZXJ2aWNlc0J5TW9kZSIsImluaXRpYWxpemVTZXJ2aWNlIiwic2VydmljZUluaXRQcm9taXNlcyIsImlkIiwidGhlbiIsImluc3RhbmNlIiwidmFsdWVzIiwiX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlIiwiYWRkRG9jdW1lbnQiLCJkb2N1bWVudFZhbHVlIiwiZG9jdW1lbnRJdGVtIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJuZXdEb2N1bWVudFVyaSIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwiaG92ZXJQcm92aWRlciIsImNvbXBsZXRpb25Qcm92aWRlciIsIl9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiaW5saW5lQ29tcGxldGlvblByb3ZpZGVyIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciIsImRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyIiwiZGlhZ25vc3RpY1Byb3ZpZGVyIiwic2lnbmF0dXJlSGVscFByb3ZpZGVyIiwiZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciIsInNlbWFudGljVG9rZW5zUHJvdmlkZXIiLCJjb2RlQWN0aW9uUHJvdmlkZXIiLCJleGVjdXRlQ29tbWFuZFByb3ZpZGVyIiwic2VydmljZXNXaXRoTmFtZSIsImV4dGVuc2lvbnMiLCJzcGxpdCIsIm0iLCJ0cmltIiwicmVnaXN0ZXJTZXJ2aWNlIiwibmFtZSIsInNldERlZmF1bHRGZWF0dXJlc1N0YXRlIiwicmVnaXN0ZXJTZXJ2ZXIiLCJjbGllbnRDb25maWciLCJzZXJ2aWNlRmVhdHVyZXMiLCJfZmVhdHVyZXMiLCJfZmVhdHVyZXMxIiwiX2ZlYXR1cmVzMiIsIl9mZWF0dXJlczMiLCJfZmVhdHVyZXM0IiwiX2ZlYXR1cmVzNSIsIl9mZWF0dXJlczYiLCJfZmVhdHVyZXM3IiwiX2ZlYXR1cmVzOCIsIl9mZWF0dXJlczkiLCJfZmVhdHVyZXMxMCIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJfc2VtYW50aWNUb2tlbnMiLCJzZW1hbnRpY1Rva2VucyIsIl9jb2RlQWN0aW9uIiwiY29kZUFjdGlvbiIsIl9leGVjdXRlQ29tbWFuZCIsIl9pbmxpbmVDb21wbGV0aW9uIiwiaW5saW5lQ29tcGxldGlvbiIsImRvVmFsaWRhdGlvbiIsInNlcnZpY2VzSW5zdGFuY2VzIiwiZG9jdW1lbnRVcmlzTGlzdCIsImRvY3VtZW50cyIsInBvc3RNZXNzYWdlIiwiZmxhdCIsInByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsInNlc3Npb25JRCIsIl9tZXNzYWdlX2RvY3VtZW50VXJpIiwiY29tcGxldGlvbnMiLCJkb0NvbXBsZXRlIiwiZG9JbmxpbmVDb21wbGV0ZSIsIl90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kIiwiZmluZCIsImRvUmVzb2x2ZSIsInNldFZhbHVlIiwiYXBwbHlEZWx0YXMiLCJiaW5kIiwiaGlnaGxpZ2h0cyIsImNvZGVBY3Rpb25zIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxIiwic2VuZEFwcGxpZWRSZXN1bHQiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMyIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMyJdLCJzb3VyY2VSb290IjoiIn0=