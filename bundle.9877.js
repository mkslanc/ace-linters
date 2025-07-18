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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzRFLFFBQVF6SSxVQUFVLEVBQUV5SSxRQUFRdEYsSUFBSTs0QkFDbGQ7b0JBQ1I7b0JBQ0FpSCxJQUFJdUYsV0FBVyxDQUFDQTtnQkFDcEI7WUFDSjtRQUNKO1FBRUEsTUFBTSxHQUFJLE9BQU81USwwQkFBbUJBO0lBQ3BDLE1BQU0sR0FBRztBQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL3BhY2thZ2VzL2FjZS1saW50ZXJzL2J1aWxkL3NlcnZpY2UtbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgKCkgPT4ge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gMjAzMjpcbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgR286ICgpID0+ICgvKiBiaW5kaW5nICovIE1lc3NhZ2VUeXBlKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiB1bnVzZWQgaGFybW9ueSBleHBvcnRzIEJhc2VNZXNzYWdlLCBJbml0TWVzc2FnZSwgRm9ybWF0TWVzc2FnZSwgQ29tcGxldGVNZXNzYWdlLCBJbmxpbmVDb21wbGV0ZU1lc3NhZ2UsIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSwgSG92ZXJNZXNzYWdlLCBWYWxpZGF0ZU1lc3NhZ2UsIENoYW5nZU1lc3NhZ2UsIERlbHRhc01lc3NhZ2UsIENoYW5nZU1vZGVNZXNzYWdlLCBDaGFuZ2VPcHRpb25zTWVzc2FnZSwgQ2xvc2VEb2N1bWVudE1lc3NhZ2UsIENsb3NlQ29ubmVjdGlvbk1lc3NhZ2UsIEdsb2JhbE9wdGlvbnNNZXNzYWdlLCBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UsIFNpZ25hdHVyZUhlbHBNZXNzYWdlLCBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UsIEdldFNlbWFudGljVG9rZW5zTWVzc2FnZSwgR2V0Q29kZUFjdGlvbnNNZXNzYWdlLCBTZXRXb3Jrc3BhY2VNZXNzYWdlLCBFeGVjdXRlQ29tbWFuZE1lc3NhZ2UsIEFwcGxpZWRFZGl0TWVzc2FnZSwgUmVuYW1lRG9jdW1lbnRNZXNzYWdlLCBTZW5kUmVxdWVzdE1lc3NhZ2UsIFNlbmRSZXNwb25zZU1lc3NhZ2UgKi9cbmZ1bmN0aW9uIF9kZWZpbmVfcHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmNsYXNzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2Vzc2lvbklkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJkb2N1bWVudFVyaVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IGRvY3VtZW50SWRlbnRpZmllci5zZXNzaW9uSWQ7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRVcmkgPSBkb2N1bWVudElkZW50aWZpZXIuZG9jdW1lbnRVcmk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgfVxufVxuY2xhc3MgSW5pdE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmluaXQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIEZvcm1hdE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgZm9ybWF0KXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZm9ybWF0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJmb3JtYXRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG59XG5jbGFzcyBDb21wbGV0ZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNvbXBsZXRlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBJbmxpbmVDb21wbGV0ZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmlubGluZUNvbXBsZXRlKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBSZXNvbHZlQ29tcGxldGlvbk1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBIb3Zlck1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmhvdmVyKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBWYWxpZGF0ZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUudmFsaWRhdGUpO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbil7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgRGVsdGFzTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbHlEZWx0YSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTW9kZU1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgdmVyc2lvbiwgbW9kZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU1vZGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibW9kZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIENoYW5nZU9wdGlvbnNNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgb3B0aW9ucywgbWVyZ2UgPSBmYWxzZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwib3B0aW9uc1wiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwibWVyZ2VcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5tZXJnZSA9IG1lcmdlO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlRG9jdW1lbnRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmNsb3NlRG9jdW1lbnQpO1xuICAgIH1cbn1cbmNsYXNzIENsb3NlQ29ubmVjdGlvbk1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrSWQpe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jbG9zZUNvbm5lY3Rpb24pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY2FsbGJhY2tJZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xuICAgIH1cbn1cbmNsYXNzIEdsb2JhbE9wdGlvbnNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2Upe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nbG9iYWxPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29uZmlndXJlRmVhdHVyZXMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbn1cbmNsYXNzIFNpZ25hdHVyZUhlbHBNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5zaWduYXR1cmVIZWxwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRvY3VtZW50SGlnaGxpZ2h0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBHZXRTZW1hbnRpY1Rva2Vuc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdldFNlbWFudGljVG9rZW5zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBHZXRDb2RlQWN0aW9uc01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkLCB2YWx1ZSwgY29udGV4dCl7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50SWRlbnRpZmllciwgY2FsbGJhY2tJZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmdldENvZGVBY3Rpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjb250ZXh0XCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG59XG5jbGFzcyBTZXRXb3Jrc3BhY2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNldFdvcmtzcGFjZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgRXhlY3V0ZUNvbW1hbmRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgY2FsbGJhY2tJZCwgY29tbWFuZCwgYXJncyl7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJjYWxsYmFja0lkXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlTmFtZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5leGVjdXRlQ29tbWFuZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiYXJnc1wiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb21tYW5kO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cbn1cbmNsYXNzIEFwcGxpZWRFZGl0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmFwcGxpZWRFZGl0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFJlbmFtZURvY3VtZW50TWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudElkZW50aWZpZXIsIGNhbGxiYWNrSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnRJZGVudGlmaWVyLCBjYWxsYmFja0lkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUucmVuYW1lRG9jdW1lbnQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIFNlbmRSZXF1ZXN0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWUsIGNhbGxiYWNrSWQsIHJlcXVlc3ROYW1lLCBhcmdzKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNlbmRSZXF1ZXN0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJhcmdzXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJlcXVlc3ROYW1lO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cbn1cbmNsYXNzIFNlbmRSZXNwb25zZU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBjYWxsYmFja0lkLCBhcmdzKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcImNhbGxiYWNrSWRcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNlbmRSZXNwb25zZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJhcmdzXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24oTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImluaXRcIl0gPSAwXSA9IFwiaW5pdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZm9ybWF0XCJdID0gMV0gPSBcImZvcm1hdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY29tcGxldGVcIl0gPSAyXSA9IFwiY29tcGxldGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInJlc29sdmVDb21wbGV0aW9uXCJdID0gM10gPSBcInJlc29sdmVDb21wbGV0aW9uXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VcIl0gPSA0XSA9IFwiY2hhbmdlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJob3ZlclwiXSA9IDVdID0gXCJob3ZlclwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1widmFsaWRhdGVcIl0gPSA2XSA9IFwidmFsaWRhdGVcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RGVsdGFcIl0gPSA3XSA9IFwiYXBwbHlEZWx0YVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlTW9kZVwiXSA9IDhdID0gXCJjaGFuZ2VNb2RlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjaGFuZ2VPcHRpb25zXCJdID0gOV0gPSBcImNoYW5nZU9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNsb3NlRG9jdW1lbnRcIl0gPSAxMF0gPSBcImNsb3NlRG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdsb2JhbE9wdGlvbnNcIl0gPSAxMV0gPSBcImdsb2JhbE9wdGlvbnNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbmZpZ3VyZUZlYXR1cmVzXCJdID0gMTJdID0gXCJjb25maWd1cmVGZWF0dXJlc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2lnbmF0dXJlSGVscFwiXSA9IDEzXSA9IFwic2lnbmF0dXJlSGVscFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZG9jdW1lbnRIaWdobGlnaHRcIl0gPSAxNF0gPSBcImRvY3VtZW50SGlnaGxpZ2h0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjbG9zZUNvbm5lY3Rpb25cIl0gPSAxNV0gPSBcImNsb3NlQ29ubmVjdGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2FwYWJpbGl0aWVzQ2hhbmdlXCJdID0gMTZdID0gXCJjYXBhYmlsaXRpZXNDaGFuZ2VcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImdldFNlbWFudGljVG9rZW5zXCJdID0gMTddID0gXCJnZXRTZW1hbnRpY1Rva2Vuc1wiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiZ2V0Q29kZUFjdGlvbnNcIl0gPSAxOF0gPSBcImdldENvZGVBY3Rpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJleGVjdXRlQ29tbWFuZFwiXSA9IDE5XSA9IFwiZXhlY3V0ZUNvbW1hbmRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImFwcGx5RWRpdFwiXSA9IDIwXSA9IFwiYXBwbHlFZGl0XCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBsaWVkRWRpdFwiXSA9IDIxXSA9IFwiYXBwbGllZEVkaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNldFdvcmtzcGFjZVwiXSA9IDIyXSA9IFwic2V0V29ya3NwYWNlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZW5hbWVEb2N1bWVudFwiXSA9IDIzXSA9IFwicmVuYW1lRG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNlbmRSZXF1ZXN0XCJdID0gMjRdID0gXCJzZW5kUmVxdWVzdFwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wic2hvd0RvY3VtZW50XCJdID0gMjVdID0gXCJzaG93RG9jdW1lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNlbmRSZXNwb25zZVwiXSA9IDI2XSA9IFwic2VuZFJlc3BvbnNlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJpbmxpbmVDb21wbGV0ZVwiXSA9IDI3XSA9IFwiaW5saW5lQ29tcGxldGVcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDc3NzA6XG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIHJMOiAoKSA9PiAoLyogYmluZGluZyAqLyBtZXJnZU9iamVjdHMpLFxuLyogaGFybW9ueSBleHBvcnQgKi8gICB6MjogKCkgPT4gKC8qIGJpbmRpbmcgKi8gbm90RW1wdHkpXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIHVudXNlZCBoYXJtb255IGV4cG9ydHMgaXNFbXB0eVJhbmdlLCBtZXJnZVJhbmdlcywgY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSwgY29udmVydFRvVXJpICovXG5mdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgZXhjbHVkZVVuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgaWYgKCFvYmoxKSByZXR1cm4gb2JqMjtcbiAgICBpZiAoIW9iajIpIHJldHVybiBvYmoxO1xuICAgIGlmIChleGNsdWRlVW5kZWZpbmVkKSB7XG4gICAgICAgIG9iajEgPSBleGNsdWRlVW5kZWZpbmVkVmFsdWVzKG9iajEpO1xuICAgICAgICBvYmoyID0gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmoyKTtcbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gZXhjbHVkZVVuZGVmaW5lZFZhbHVlcyhvYmopIHtcbiAgICBjb25zdCBmaWx0ZXJlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSk9PnZhbHVlICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZmlsdGVyZWRFbnRyaWVzKTtcbn1cbmZ1bmN0aW9uIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc0VtcHR5UmFuZ2UocmFuZ2UpIHtcbiAgICByZXR1cm4gcmFuZ2Uuc3RhcnQucm93ID09PSByYW5nZS5lbmQucm93ICYmIHJhbmdlLnN0YXJ0LmNvbHVtbiA9PT0gcmFuZ2UuZW5kLmNvbHVtbjtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIWlzRW1wdHlSYW5nZShyYW5nZSkgJiYgIWlzRW1wdHlSYW5nZShuZXh0KSkgY29udGludWU7XG4gICAgICAgIGlmIChjb21wYXJlUG9pbnRzKHJhbmdlLmVuZCwgbmV4dC5lbmQpIDwgMCkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IG5leHQuZW5kLnJvdztcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBuZXh0LmVuZC5jb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIG5leHQgPSByYW5nZTtcbiAgICAgICAgaS0tO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVQb2ludHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnJvdyAtIHAyLnJvdyB8fCBwMS5jb2x1bW4gLSBwMi5jb2x1bW47XG59XG5mdW5jdGlvbiBjaGVja1ZhbHVlQWdhaW5zdFJlZ2V4cEFycmF5KHZhbHVlLCByZWdleHBBcnJheSkge1xuICAgIGlmICghcmVnZXhwQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVnZXhwQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmVnZXhwQXJyYXlbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGdpdmVuIGZpbGUgcGF0aCB0byBhIFVSSSBmb3JtYXQuIElmIHRoZSBnaXZlbiBmaWxlIHBhdGggaXMgYWxyZWFkeSBhIFVSSSxcbiAqIGl0IG5vcm1hbGl6ZXMgYW5kIG9wdGlvbmFsbHkgcmVzb2x2ZXMgdGhlIHBhdGggYWdhaW5zdCBhIHdvcmtzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIGZpbGVQYXRoIC0gVGhlIGZpbGUgcGF0aCB0byBjb252ZXJ0IHRvIGEgVVJJLiBDYW4gYmUgYW4gYWJzb2x1dGUgcGF0aCBvciBhbiBleGlzdGluZyBmaWxlIFVSSS5cbiAqIEBwYXJhbSBbam9pbldvcmtzcGFjZVVSSV0gLSBPcHRpb25hbCBmbGFnIHRvIGRldGVybWluZSBpZiB0aGUgY29udmVydGVkIFVSSSBzaG91bGQgYmUgam9pbmVkIHdpdGggZ2l2ZW4gVVJJXG4gKiBAcGFyYW0gW3dvcmtzcGFjZVVyaV0gLSBUaGUgYmFzZSB3b3Jrc3BhY2UgVVJJIHRvIHJlc29sdmUgYWdhaW5zdCBpZiBgam9pbldvcmtzcGFjZVVSSWAgaXMgdHJ1ZS4gUmVxdWlyZWQgaWYgcmVzb2x1dGlvbiBpcyBuZWVkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIHJlc3VsdGluZyBVUklcbiAqLyBmdW5jdGlvbiBjb252ZXJ0VG9VcmkoZmlsZVBhdGgsIGpvaW5Xb3Jrc3BhY2VVUkkgPSBmYWxzZSwgd29ya3NwYWNlVXJpKSB7XG4gICAgY29uc3QgaXNGdWxsVXJpID0gZmlsZVBhdGguc3RhcnRzV2l0aCgnZmlsZTovLycpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gZmlsZVBhdGgucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgbGV0IHVyaTtcbiAgICBpZiAoaXNGdWxsVXJpKSB7XG4gICAgICAgIHVyaSA9IFVSSS5wYXJzZShub3JtYWxpemVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gVVJJLmZpbGUobm9ybWFsaXplZFBhdGgpO1xuICAgIH1cbiAgICBpZiAoam9pbldvcmtzcGFjZVVSSSAmJiB3b3Jrc3BhY2VVcmkpIHtcbiAgICAgICAgaWYgKCF3b3Jrc3BhY2VVcmkuc3RhcnRzV2l0aCgnZmlsZTovLycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtzcGFjZVVyaSBtdXN0IGJlIGEgZmlsZTovLyBVUkknKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VVcmlQYXJzZWQgPSBVUkkucGFyc2Uod29ya3NwYWNlVXJpKTtcbiAgICAgICAgdXJpID0gVXRpbHMuam9pblBhdGgod29ya3NwYWNlVXJpUGFyc2VkLCB1cmkucGF0aCk7XG4gICAgfVxuICAgIHJldHVybiB1cmkudG9TdHJpbmcoKTtcbn1cblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKVxuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU2VydmljZU1hbmFnZXI6ICgpID0+ICgvKiBiaW5kaW5nICovIFNlcnZpY2VNYW5hZ2VyKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3NzApO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwMzIpO1xuZnVuY3Rpb24gX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbmNsYXNzIFNlcnZpY2VNYW5hZ2VyIHtcbiAgICBhc3luYyBnZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCBjYWxsYmFjayhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UubW9kZSwgbWVzc2FnZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2VydmljZXMpLnJlZHVjZSgoYWNjLCBrZXkpPT57XG4gICAgICAgICAgICAgICAgdmFyIF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlLCBfc2VydmljZXNfa2V5O1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gKChfc2VydmljZXNfa2V5ID0gc2VydmljZXNba2V5XSkgPT09IG51bGwgfHwgX3NlcnZpY2VzX2tleSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlID0gX3NlcnZpY2VzX2tleS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlc19rZXlfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlQ2FwYWJpbGl0aWVzKSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyhzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlLCBtZXRob2ROYW1lLCBkb2N1bWVudElkZW50aWZpZXIsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgZmVhdHVyZSkubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cnMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VbbWV0aG9kTmFtZV0oZG9jdW1lbnRJZGVudGlmaWVyLCAuLi5hdHRycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlW21ldGhvZE5hbWVdKGRvY3VtZW50SWRlbnRpZmllciwgYXR0cnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgIH1cbiAgICBhcHBseU9wdGlvbnNUb1NlcnZpY2VzKHNlcnZpY2VJbnN0YW5jZXMsIGRvY3VtZW50VXJpLCBvcHRpb25zKSB7XG4gICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgIHNlcnZpY2Uuc2V0T3B0aW9ucyhkb2N1bWVudFVyaSwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBjbG9zZUFsbENvbm5lY3Rpb25zKCkge1xuICAgICAgICB2YXIgc2VydmljZXMgPSB0aGlzLiRzZXJ2aWNlcztcbiAgICAgICAgZm9yKGxldCBzZXJ2aWNlTmFtZSBpbiBzZXJ2aWNlcyl7XG4gICAgICAgICAgICB2YXIgX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSwgX3NlcnZpY2VzX3NlcnZpY2VOYW1lO1xuICAgICAgICAgICAgYXdhaXQgKChfc2VydmljZXNfc2VydmljZU5hbWUgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV0pID09PSBudWxsIHx8IF9zZXJ2aWNlc19zZXJ2aWNlTmFtZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9zZXJ2aWNlc19zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPSBfc2VydmljZXNfc2VydmljZU5hbWUuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VydmljZXNfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLmNsb3NlQ29ubmVjdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMgJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSwgY3R4LCB3b3Jrc3BhY2VVcmkpIHtcbiAgICAgICAgbGV0IG1vZHVsZTtcbiAgICAgICAgaWYgKCd0eXBlJyBpbiBzZXJ2aWNlKSB7XG4gICAgICAgICAgICBpZiAoW1xuICAgICAgICAgICAgICAgIFwic29ja2V0XCIsXG4gICAgICAgICAgICAgICAgXCJ3ZWJ3b3JrZXJcIlxuICAgICAgICAgICAgXS5pbmNsdWRlcyhzZXJ2aWNlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSA9IG5ldyBtb2R1bGVbXCJMYW5ndWFnZUNsaWVudFwiXShzZXJ2aWNlLCBjdHgsIHdvcmtzcGFjZVVyaSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhyb3cgXCJVbmtub3duIHNlcnZpY2UgdHlwZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gbmV3IG1vZHVsZVtzZXJ2aWNlLmNsYXNzTmFtZV0oc2VydmljZS5tb2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZpY2Uub3B0aW9ucyB8fCBzZXJ2aWNlLmluaXRpYWxpemF0aW9uT3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF9zZXJ2aWNlX29wdGlvbnMsIF9yZWY7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKChfcmVmID0gKF9zZXJ2aWNlX29wdGlvbnMgPSBzZXJ2aWNlLm9wdGlvbnMpICE9PSBudWxsICYmIF9zZXJ2aWNlX29wdGlvbnMgIT09IHZvaWQgMCA/IF9zZXJ2aWNlX29wdGlvbnMgOiBzZXJ2aWNlLmluaXRpYWxpemF0aW9uT3B0aW9ucykgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IHt9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlRGF0YSA9IHNlcnZpY2U7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICB9XG4gICAgYXN5bmMgJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXJ2aWNlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBzZXJ2aWNlTmFtZSBpbiBzZXJ2aWNlcyl7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2VOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VydmljZXM7XG4gICAgfVxuICAgIGFzeW5jIGluaXRpYWxpemVTZXJ2aWNlKHNlcnZpY2VOYW1lKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUluaXRQcm9taXNlc1tzZXJ2aWNlLmlkXSA9IFNlcnZpY2VNYW5hZ2VyLiRpbml0U2VydmljZUluc3RhbmNlKHNlcnZpY2UsIHRoaXMuY3R4LCB0aGlzLndvcmtzcGFjZVVyaSkudGhlbigoaW5zdGFuY2UpPT57XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07IC8vIENsZWFuIHVwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VJbml0UHJvbWlzZXNbc2VydmljZS5pZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2Uuc2VydmljZUluc3RhbmNlLnNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2VydmljZU5hbWUgPSBzZXJ2aWNlTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxPcHRpb25zKHNlcnZpY2VOYW1lLCBvcHRpb25zLCBtZXJnZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gdGhpcy4kc2VydmljZXNbc2VydmljZU5hbWVdO1xuICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgc2VydmljZS5vcHRpb25zID0gbWVyZ2UgPyAoMCxfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5tZXJnZU9iamVjdHMgKi8gLnJMKShvcHRpb25zLCBzZXJ2aWNlLm9wdGlvbnMpIDogb3B0aW9ucztcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKHNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0V29ya3NwYWNlKHdvcmtzcGFjZVVyaSkge1xuICAgICAgICB0aGlzLndvcmtzcGFjZVVyaSA9IHdvcmtzcGFjZVVyaTtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLiRzZXJ2aWNlcykuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgIHZhciBfc2VydmljZV9zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgICAgICAoX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlID0gc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF9zZXJ2aWNlX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlLnNldFdvcmtzcGFjZSh0aGlzLndvcmtzcGFjZVVyaSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBhZGREb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIGRvY3VtZW50VmFsdWUsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFtb2RlIHx8ICEvXmFjZVxcL21vZGVcXC8vLnRlc3QobW9kZSkpIHJldHVybjtcbiAgICAgICAgbW9kZSA9IG1vZGUucmVwbGFjZShcImFjZS9tb2RlL1wiLCBcIlwiKTtcbiAgICAgICAgbW9kZSA9IG1vZGUucmVwbGFjZSgvZ29sYW5nJC8sIFwiZ29cIik7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IHRoaXMuJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VydmljZXMpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZG9jdW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgdXJpOiBkb2N1bWVudElkZW50aWZpZXIudXJpLFxuICAgICAgICAgICAgdmVyc2lvbjogZG9jdW1lbnRJZGVudGlmaWVyLnZlcnNpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUlkOiBtb2RlLFxuICAgICAgICAgICAgdGV4dDogZG9jdW1lbnRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICBPYmplY3QudmFsdWVzKHNlcnZpY2VzKS5mb3JFYWNoKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZS5hZGREb2N1bWVudChkb2N1bWVudEl0ZW0pKTtcbiAgICAgICAgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50SWRlbnRpZmllci51cmldID0gbW9kZTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgIH1cbiAgICBhc3luYyByZW5hbWVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG5ld0RvY3VtZW50VXJpKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnRJZGVudGlmaWVyLnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbmFtZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbmV3RG9jdW1lbnRVcmkpKTtcbiAgICAgICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtuZXdEb2N1bWVudFVyaV0gPSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnRJZGVudGlmaWVyLnVyaV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50SWRlbnRpZmllci51cmldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNoYW5nZURvY3VtZW50TW9kZShkb2N1bWVudElkZW50aWZpZXIsIHZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJlbW92ZURvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnQudXJpKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlcnZpY2VzLmZvckVhY2goKGVsKT0+ZWwucmVtb3ZlRG9jdW1lbnQoZG9jdW1lbnQpKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRzZXNzaW9uSURUb01vZGVbZG9jdW1lbnQudXJpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlc0luc3RhbmNlcyhkb2N1bWVudFVyaSkge1xuICAgICAgICBsZXQgbW9kZSA9IHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudFVyaV07XG4gICAgICAgIGlmICghbW9kZSkgcmV0dXJuIFtdOyAvL1RPRE86XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhzZXJ2aWNlcykubWFwKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZSkuZmlsdGVyKF91dGlsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fLyogLm5vdEVtcHR5ICovIC56Mik7XG4gICAgfVxuICAgIGZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBpZiAoIWVsLnNlcnZpY2VEYXRhLmZlYXR1cmVzW2ZlYXR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FwYWJpbGl0aWVzID0gZWwuc2VydmljZUNhcGFiaWxpdGllcztcbiAgICAgICAgICAgIHN3aXRjaChmZWF0dXJlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG92ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5ob3ZlclByb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5jb21wbGV0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0aW9uUmVzb2x2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyID0gY2FwYWJpbGl0aWVzLmNvbXBsZXRpb25Qcm92aWRlcikgPT09IG51bGwgfHwgX2NhcGFiaWxpdGllc19jb21wbGV0aW9uUHJvdmlkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyLnJlc29sdmVQcm92aWRlcikgPT09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlubGluZUNvbXBsZXRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5pbmxpbmVDb21wbGV0aW9uUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JtYXRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5kb2N1bWVudFJhbmdlRm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWUgfHwgY2FwYWJpbGl0aWVzLmRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyID09IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRpYWdub3N0aWNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZGlhZ25vc3RpY1Byb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwic2lnbmF0dXJlSGVscFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLnNpZ25hdHVyZUhlbHBQcm92aWRlciAhPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50SGlnaGxpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzZW1hbnRpY1Rva2Vuc1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLnNlbWFudGljVG9rZW5zUHJvdmlkZXIgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjb2RlQWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuY29kZUFjdGlvblByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXhlY3V0ZUNvbW1hbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5leGVjdXRlQ29tbWFuZFByb3ZpZGVyICE9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmRTZXJ2aWNlc0J5TW9kZShtb2RlKSB7XG4gICAgICAgIGxldCBzZXJ2aWNlc1dpdGhOYW1lID0ge307XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuJHNlcnZpY2VzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pPT57XG4gICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLm1vZGVzLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmNsdWRlcyhtb2RlKSkgc2VydmljZXNXaXRoTmFtZVtrZXldID0gdGhpcy4kc2VydmljZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlc1dpdGhOYW1lO1xuICAgIH1cbiAgICByZWdpc3RlclNlcnZpY2UobmFtZSwgc2VydmljZSkge1xuICAgICAgICBzZXJ2aWNlLmlkID0gbmFtZTtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2ZXIobmFtZSwgY2xpZW50Q29uZmlnKSB7XG4gICAgICAgIGNsaWVudENvbmZpZy5pZCA9IG5hbWU7XG4gICAgICAgIGNsaWVudENvbmZpZy5jbGFzc05hbWUgPSBcIkxhbmd1YWdlQ2xpZW50XCI7XG4gICAgICAgIGNsaWVudENvbmZpZy5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoY2xpZW50Q29uZmlnLmZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0gPSBjbGllbnRDb25maWc7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUZlYXR1cmVzKG5hbWUsIGZlYXR1cmVzKSB7XG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5zZXREZWZhdWx0RmVhdHVyZXNTdGF0ZShmZWF0dXJlcyk7XG4gICAgICAgIGlmICghdGhpcy4kc2VydmljZXNbbmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczYsIF9mZWF0dXJlczcsIF9mZWF0dXJlczgsIF9mZWF0dXJlczksIF9mZWF0dXJlczEwO1xuICAgICAgICBsZXQgZmVhdHVyZXMgPSBzZXJ2aWNlRmVhdHVyZXMgIT09IG51bGwgJiYgc2VydmljZUZlYXR1cmVzICE9PSB2b2lkIDAgPyBzZXJ2aWNlRmVhdHVyZXMgOiB7fTtcbiAgICAgICAgdmFyIF9ob3ZlcjtcbiAgICAgICAgKF9ob3ZlciA9IChfZmVhdHVyZXMgPSBmZWF0dXJlcykuaG92ZXIpICE9PSBudWxsICYmIF9ob3ZlciAhPT0gdm9pZCAwID8gX2hvdmVyIDogX2ZlYXR1cmVzLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9jb21wbGV0aW9uO1xuICAgICAgICAoX2NvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMSA9IGZlYXR1cmVzKS5jb21wbGV0aW9uKSAhPT0gbnVsbCAmJiBfY29tcGxldGlvbiAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb24gOiBfZmVhdHVyZXMxLmNvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb25SZXNvbHZlO1xuICAgICAgICAoX2NvbXBsZXRpb25SZXNvbHZlID0gKF9mZWF0dXJlczIgPSBmZWF0dXJlcykuY29tcGxldGlvblJlc29sdmUpICE9PSBudWxsICYmIF9jb21wbGV0aW9uUmVzb2x2ZSAhPT0gdm9pZCAwID8gX2NvbXBsZXRpb25SZXNvbHZlIDogX2ZlYXR1cmVzMi5jb21wbGV0aW9uUmVzb2x2ZSA9IHRydWU7XG4gICAgICAgIHZhciBfZm9ybWF0O1xuICAgICAgICAoX2Zvcm1hdCA9IChfZmVhdHVyZXMzID0gZmVhdHVyZXMpLmZvcm1hdCkgIT09IG51bGwgJiYgX2Zvcm1hdCAhPT0gdm9pZCAwID8gX2Zvcm1hdCA6IF9mZWF0dXJlczMuZm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWFnbm9zdGljcztcbiAgICAgICAgKF9kaWFnbm9zdGljcyA9IChfZmVhdHVyZXM0ID0gZmVhdHVyZXMpLmRpYWdub3N0aWNzKSAhPT0gbnVsbCAmJiBfZGlhZ25vc3RpY3MgIT09IHZvaWQgMCA/IF9kaWFnbm9zdGljcyA6IF9mZWF0dXJlczQuZGlhZ25vc3RpY3MgPSB0cnVlO1xuICAgICAgICB2YXIgX3NpZ25hdHVyZUhlbHA7XG4gICAgICAgIChfc2lnbmF0dXJlSGVscCA9IChfZmVhdHVyZXM1ID0gZmVhdHVyZXMpLnNpZ25hdHVyZUhlbHApICE9PSBudWxsICYmIF9zaWduYXR1cmVIZWxwICE9PSB2b2lkIDAgPyBfc2lnbmF0dXJlSGVscCA6IF9mZWF0dXJlczUuc2lnbmF0dXJlSGVscCA9IHRydWU7XG4gICAgICAgIHZhciBfZG9jdW1lbnRIaWdobGlnaHQ7XG4gICAgICAgIChfZG9jdW1lbnRIaWdobGlnaHQgPSAoX2ZlYXR1cmVzNiA9IGZlYXR1cmVzKS5kb2N1bWVudEhpZ2hsaWdodCkgIT09IG51bGwgJiYgX2RvY3VtZW50SGlnaGxpZ2h0ICE9PSB2b2lkIDAgPyBfZG9jdW1lbnRIaWdobGlnaHQgOiBfZmVhdHVyZXM2LmRvY3VtZW50SGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9zZW1hbnRpY1Rva2VucztcbiAgICAgICAgKF9zZW1hbnRpY1Rva2VucyA9IChfZmVhdHVyZXM3ID0gZmVhdHVyZXMpLnNlbWFudGljVG9rZW5zKSAhPT0gbnVsbCAmJiBfc2VtYW50aWNUb2tlbnMgIT09IHZvaWQgMCA/IF9zZW1hbnRpY1Rva2VucyA6IF9mZWF0dXJlczcuc2VtYW50aWNUb2tlbnMgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvZGVBY3Rpb247XG4gICAgICAgIChfY29kZUFjdGlvbiA9IChfZmVhdHVyZXM4ID0gZmVhdHVyZXMpLmNvZGVBY3Rpb24pICE9PSBudWxsICYmIF9jb2RlQWN0aW9uICE9PSB2b2lkIDAgPyBfY29kZUFjdGlvbiA6IF9mZWF0dXJlczguY29kZUFjdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfZXhlY3V0ZUNvbW1hbmQ7XG4gICAgICAgIChfZXhlY3V0ZUNvbW1hbmQgPSAoX2ZlYXR1cmVzOSA9IGZlYXR1cmVzKS5leGVjdXRlQ29tbWFuZCkgIT09IG51bGwgJiYgX2V4ZWN1dGVDb21tYW5kICE9PSB2b2lkIDAgPyBfZXhlY3V0ZUNvbW1hbmQgOiBfZmVhdHVyZXM5LmV4ZWN1dGVDb21tYW5kID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9pbmxpbmVDb21wbGV0aW9uO1xuICAgICAgICAoX2lubGluZUNvbXBsZXRpb24gPSAoX2ZlYXR1cmVzMTAgPSBmZWF0dXJlcykuaW5saW5lQ29tcGxldGlvbikgIT09IG51bGwgJiYgX2lubGluZUNvbXBsZXRpb24gIT09IHZvaWQgMCA/IF9pbmxpbmVDb21wbGV0aW9uIDogX2ZlYXR1cmVzMTAuaW5saW5lQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlcztcbiAgICB9XG4gICAgY29uc3RydWN0b3IoY3R4KXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXJ2aWNlc1wiLCB7fSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJzZXJ2aWNlSW5pdFByb21pc2VzXCIsIHt9KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIiRzZXNzaW9uSURUb01vZGVcIiwge30pO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiY3R4XCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ3b3Jrc3BhY2VVcmlcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIGxldCBkb1ZhbGlkYXRpb24gPSBhc3luYyAoZG9jdW1lbnQsIHNlcnZpY2VzSW5zdGFuY2VzKT0+e1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgIT09IG51bGwgJiYgc2VydmljZXNJbnN0YW5jZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VzSW5zdGFuY2VzIDogc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzIGlzIGxpc3Qgb2YgZG9jdW1lbnRzIGxpbmtlZCB0byBzZXJ2aWNlc1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50VXJpc0xpc3QgPSBPYmplY3Qua2V5cyhzZXJ2aWNlc0luc3RhbmNlc1swXS5kb2N1bWVudHMpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlc0luc3RhbmNlcywgXCJkaWFnbm9zdGljc1wiKTtcbiAgICAgICAgICAgIHNlcnZpY2VzSW5zdGFuY2VzID0gc2VydmljZXNJbnN0YW5jZXMuZmlsdGVyKChlbCk9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuc2VydmljZUNhcGFiaWxpdGllcy5kaWFnbm9zdGljUHJvdmlkZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlc0luc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnZhbGlkYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgZG9jdW1lbnRVcmkgb2YgZG9jdW1lbnRVcmlzTGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogZG9jdW1lbnRVcmlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogW107XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJkb2N1bWVudFVyaVwiXSA9IGRvY3VtZW50VXJpO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSW5zdGFuY2UgPSBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2UpIGF3YWl0IGRvVmFsaWRhdGlvbih1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgICAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2KT0+e1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBldi5kYXRhO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX3Nlc3Npb25JZDtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uSUQgPSAoX21lc3NhZ2Vfc2Vzc2lvbklkID0gbWVzc2FnZVtcInNlc3Npb25JZFwiXSkgIT09IG51bGwgJiYgX21lc3NhZ2Vfc2Vzc2lvbklkICE9PSB2b2lkIDAgPyBfbWVzc2FnZV9zZXNzaW9uSWQgOiBcIlwiO1xuICAgICAgICAgICAgdmFyIF9tZXNzYWdlX2RvY3VtZW50VXJpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50VXJpID0gKF9tZXNzYWdlX2RvY3VtZW50VXJpID0gbWVzc2FnZVtcImRvY3VtZW50VXJpXCJdKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9kb2N1bWVudFVyaSAhPT0gdm9pZCAwID8gX21lc3NhZ2VfZG9jdW1lbnRVcmkgOiBcIlwiO1xuICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBtZXNzYWdlW1widmVyc2lvblwiXTtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgICAgIFwic2Vzc2lvbklkXCI6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICAgICBcImNhbGxiYWNrSWRcIjogbWVzc2FnZVtcImNhbGxiYWNrSWRcIl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZ2V0U2VydmljZXNJbnN0YW5jZXMoZG9jdW1lbnRVcmkpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50SWRlbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IGRvY3VtZW50VXJpLFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmZvcm1hdDpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZSB0byBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmZvcm1hdChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmlubGluZUNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaW5saW5lQ29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvSW5saW5lQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlW1widmFsdWVcIl0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2Uuc2VydmljZURhdGEuY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihfdXRpbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXy8qIC5ub3RFbXB0eSAqLyAuejIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWVbXCJzZXJ2aWNlXCJdO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgKChfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblJlc29sdmVcIikuZmluZCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZSA9PT0gc2VydmljZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpID09PSBudWxsIHx8IF90aGlzX2ZpbHRlckJ5RmVhdHVyZV9maW5kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZC5kb1Jlc29sdmUobWVzc2FnZS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNoYW5nZTpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcy5mb3JFYWNoKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXRWYWx1ZShkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2VbXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5hcHBseURlbHRhOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmFwcGx5RGVsdGFzKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5hZ2dyZWdhdGVGZWF0dXJlUmVzcG9uc2VzKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIiwgXCJkb0hvdmVyXCIsIGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28udmFsaWRhdGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5pbml0OlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCB0aGlzLmFkZERvY3VtZW50LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jaGFuZ2VNb2RlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlc0NhcGFiaWxpdGllc0FmdGVyQ2FsbGJhY2soZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLCB0aGlzLmNoYW5nZURvY3VtZW50TW9kZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZG9WYWxpZGF0aW9uKGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uY2hhbmdlT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseU9wdGlvbnNUb1NlcnZpY2VzKHNlcnZpY2VJbnN0YW5jZXMsIGRvY3VtZW50VXJpLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5jbG9zZURvY3VtZW50OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNsb3NlQ29ubmVjdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFsbENvbm5lY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uZ2xvYmFsT3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxPcHRpb25zKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucywgbWVzc2FnZS5tZXJnZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmNvbmZpZ3VyZUZlYXR1cmVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUZlYXR1cmVzKG1lc3NhZ2Uuc2VydmljZU5hbWUsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlKG1lc3NhZ2Uuc2VydmljZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNpZ25hdHVyZUhlbHA6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJzaWduYXR1cmVIZWxwXCIsIFwicHJvdmlkZVNpZ25hdHVyZUhlbHBcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5kb2N1bWVudEhpZ2hsaWdodDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hsaWdodHMgPSBhd2FpdCB0aGlzLmFnZ3JlZ2F0ZUZlYXR1cmVSZXNwb25zZXMoc2VydmljZUluc3RhbmNlcywgXCJkb2N1bWVudEhpZ2hsaWdodFwiLCBcImZpbmREb2N1bWVudEhpZ2hsaWdodHNcIiwgZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGhpZ2hsaWdodHMuZmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLmdldFNlbWFudGljVG9rZW5zOlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJzZW1hbnRpY1Rva2Vuc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VJbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZSB3aWxsIHVzZSBvbmx5IGZpcnN0IHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBzZXJ2aWNlSW5zdGFuY2VzWzBdLmdldFNlbWFudGljVG9rZW5zKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5nZXRDb2RlQWN0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbWVzc2FnZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBtZXNzYWdlLmNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5maWx0ZXJCeUZlYXR1cmUoc2VydmljZUluc3RhbmNlcywgXCJjb2RlQWN0aW9uXCIpLm1hcChhc3luYyAoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZUFjdGlvbnM6IGF3YWl0IHNlcnZpY2UuZ2V0Q29kZUFjdGlvbnMoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZTogc2VydmljZS5zZXJ2aWNlTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIoX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18vKiAubm90RW1wdHkgKi8gLnoyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5leGVjdXRlQ29tbWFuZDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UgPSBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZS5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlLmV4ZWN1dGVDb21tYW5kKG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uYXBwbGllZEVkaXQ6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxLCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTE7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUxID0gdGhpcy4kc2VydmljZXNbbWVzc2FnZS5zZXJ2aWNlTmFtZV0pID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTEgPSBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTEuc2VydmljZUluc3RhbmNlKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UxLnNlbmRBcHBsaWVkUmVzdWx0KG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuY2FsbGJhY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgX21lc3NhZ2VfdHlwZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy8qIC5NZXNzYWdlVHlwZSAqLyAuR28uc2V0V29ya3NwYWNlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFdvcmtzcGFjZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLyogLk1lc3NhZ2VUeXBlICovIC5Hby5yZW5hbWVEb2N1bWVudDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5hbWVEb2N1bWVudChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNlbmRSZXF1ZXN0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMiwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMiA9IHRoaXMuJHNlcnZpY2VzW21lc3NhZ2Uuc2VydmljZU5hbWVdKSA9PT0gbnVsbCB8fCBfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZV9zZXJ2aWNlSW5zdGFuY2UyID0gX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUyLnNlcnZpY2VJbnN0YW5jZSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMi5zZW5kUmVxdWVzdChtZXNzYWdlLnZhbHVlLCBtZXNzYWdlLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIF9tZXNzYWdlX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18vKiAuTWVzc2FnZVR5cGUgKi8gLkdvLnNlbmRSZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMsIF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMztcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IChfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTMgPSB0aGlzLiRzZXJ2aWNlc1ttZXNzYWdlLnNlcnZpY2VOYW1lXSkgPT09IG51bGwgfHwgX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWUzID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMyA9IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMy5zZXJ2aWNlSW5zdGFuY2UpID09PSBudWxsIHx8IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMuc2VuZFJlc3BvbnNlKG1lc3NhZ2UuY2FsbGJhY2tJZCwgbWVzc2FnZS5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIkdvIiwiTWVzc2FnZVR5cGUiLCJfZGVmaW5lX3Byb3BlcnR5Iiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJkb2N1bWVudElkZW50aWZpZXIiLCJjYWxsYmFja0lkIiwic2Vzc2lvbklkIiwiZG9jdW1lbnRVcmkiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsImluaXQiLCJGb3JtYXRNZXNzYWdlIiwiZm9ybWF0IiwiQ29tcGxldGVNZXNzYWdlIiwiY29tcGxldGUiLCJJbmxpbmVDb21wbGV0ZU1lc3NhZ2UiLCJpbmxpbmVDb21wbGV0ZSIsIlJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSIsInJlc29sdmVDb21wbGV0aW9uIiwiSG92ZXJNZXNzYWdlIiwiaG92ZXIiLCJWYWxpZGF0ZU1lc3NhZ2UiLCJ2YWxpZGF0ZSIsIkNoYW5nZU1lc3NhZ2UiLCJjaGFuZ2UiLCJEZWx0YXNNZXNzYWdlIiwiYXBwbHlEZWx0YSIsIkNoYW5nZU1vZGVNZXNzYWdlIiwiY2hhbmdlTW9kZSIsIkNoYW5nZU9wdGlvbnNNZXNzYWdlIiwibWVyZ2UiLCJjaGFuZ2VPcHRpb25zIiwiQ2xvc2VEb2N1bWVudE1lc3NhZ2UiLCJjbG9zZURvY3VtZW50IiwiQ2xvc2VDb25uZWN0aW9uTWVzc2FnZSIsImNsb3NlQ29ubmVjdGlvbiIsIkdsb2JhbE9wdGlvbnNNZXNzYWdlIiwic2VydmljZU5hbWUiLCJnbG9iYWxPcHRpb25zIiwiQ29uZmlndXJlRmVhdHVyZXNNZXNzYWdlIiwiY29uZmlndXJlRmVhdHVyZXMiLCJTaWduYXR1cmVIZWxwTWVzc2FnZSIsInNpZ25hdHVyZUhlbHAiLCJEb2N1bWVudEhpZ2hsaWdodE1lc3NhZ2UiLCJkb2N1bWVudEhpZ2hsaWdodCIsIkdldFNlbWFudGljVG9rZW5zTWVzc2FnZSIsImdldFNlbWFudGljVG9rZW5zIiwiR2V0Q29kZUFjdGlvbnNNZXNzYWdlIiwiY29udGV4dCIsImdldENvZGVBY3Rpb25zIiwiU2V0V29ya3NwYWNlTWVzc2FnZSIsInNldFdvcmtzcGFjZSIsIkV4ZWN1dGVDb21tYW5kTWVzc2FnZSIsImNvbW1hbmQiLCJhcmdzIiwiZXhlY3V0ZUNvbW1hbmQiLCJBcHBsaWVkRWRpdE1lc3NhZ2UiLCJhcHBsaWVkRWRpdCIsIlJlbmFtZURvY3VtZW50TWVzc2FnZSIsInJlbmFtZURvY3VtZW50IiwiU2VuZFJlcXVlc3RNZXNzYWdlIiwicmVxdWVzdE5hbWUiLCJzZW5kUmVxdWVzdCIsIlNlbmRSZXNwb25zZU1lc3NhZ2UiLCJzZW5kUmVzcG9uc2UiLCJyTCIsIm1lcmdlT2JqZWN0cyIsInoyIiwibm90RW1wdHkiLCJvYmoxIiwib2JqMiIsImV4Y2x1ZGVVbmRlZmluZWQiLCJleGNsdWRlVW5kZWZpbmVkVmFsdWVzIiwibWVyZ2VkT2JqZWN0cyIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJmaWx0ZXJlZEVudHJpZXMiLCJlbnRyaWVzIiwiZmlsdGVyIiwiXyIsInVuZGVmaW5lZCIsImZyb21FbnRyaWVzIiwiaXNFbXB0eVJhbmdlIiwicmFuZ2UiLCJzdGFydCIsInJvdyIsImVuZCIsImNvbHVtbiIsIm1lcmdlUmFuZ2VzIiwicmFuZ2VzIiwibGlzdCIsInNvcnQiLCJiIiwiY29tcGFyZVBvaW50cyIsIm5leHQiLCJsZW5ndGgiLCJjbXAiLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsImNvbnZlcnRUb1VyaSIsImZpbGVQYXRoIiwiam9pbldvcmtzcGFjZVVSSSIsIndvcmtzcGFjZVVyaSIsImlzRnVsbFVyaSIsInN0YXJ0c1dpdGgiLCJub3JtYWxpemVkUGF0aCIsInJlcGxhY2UiLCJ1cmkiLCJVUkkiLCJwYXJzZSIsImZpbGUiLCJFcnJvciIsIndvcmtzcGFjZVVyaVBhcnNlZCIsIlV0aWxzIiwiam9pblBhdGgiLCJwYXRoIiwidG9TdHJpbmciLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJvIiwiZ2V0IiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIlNlcnZpY2VNYW5hZ2VyIiwiX3V0aWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfbWVzc2FnZV90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZ2V0U2VydmljZXNDYXBhYmlsaXRpZXNBZnRlckNhbGxiYWNrIiwibWVzc2FnZSIsImNhbGxiYWNrIiwic2VydmljZXMiLCJyZWR1Y2UiLCJhY2MiLCJfc2VydmljZXNfa2V5X3NlcnZpY2VJbnN0YW5jZSIsIl9zZXJ2aWNlc19rZXkiLCJzZXJ2aWNlSW5zdGFuY2UiLCJzZXJ2aWNlQ2FwYWJpbGl0aWVzIiwiYWdncmVnYXRlRmVhdHVyZVJlc3BvbnNlcyIsInNlcnZpY2VJbnN0YW5jZXMiLCJmZWF0dXJlIiwibWV0aG9kTmFtZSIsImF0dHJzIiwiUHJvbWlzZSIsImFsbCIsImZpbHRlckJ5RmVhdHVyZSIsIm1hcCIsInNlcnZpY2UiLCJhcHBseU9wdGlvbnNUb1NlcnZpY2VzIiwiZm9yRWFjaCIsInNldE9wdGlvbnMiLCJjbG9zZUFsbENvbm5lY3Rpb25zIiwiJHNlcnZpY2VzIiwiX3NlcnZpY2VzX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl9zZXJ2aWNlc19zZXJ2aWNlTmFtZSIsIiRpbml0U2VydmljZUluc3RhbmNlIiwiY3R4IiwiaW5jbHVkZXMiLCJ0eXBlIiwiY2xhc3NOYW1lIiwibW9kZXMiLCJpbml0aWFsaXphdGlvbk9wdGlvbnMiLCJfc2VydmljZV9vcHRpb25zIiwiX3JlZiIsInNldEdsb2JhbE9wdGlvbnMiLCJzZXJ2aWNlRGF0YSIsIiRnZXRTZXJ2aWNlc0luc3RhbmNlc0J5TW9kZSIsImZpbmRTZXJ2aWNlc0J5TW9kZSIsImluaXRpYWxpemVTZXJ2aWNlIiwic2VydmljZUluaXRQcm9taXNlcyIsImlkIiwidGhlbiIsImluc3RhbmNlIiwidmFsdWVzIiwiX3NlcnZpY2Vfc2VydmljZUluc3RhbmNlIiwiYWRkRG9jdW1lbnQiLCJkb2N1bWVudFZhbHVlIiwiZG9jdW1lbnRJdGVtIiwibGFuZ3VhZ2VJZCIsInRleHQiLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJuZXdEb2N1bWVudFVyaSIsImdldFNlcnZpY2VzSW5zdGFuY2VzIiwiY2hhbmdlRG9jdW1lbnRNb2RlIiwicmVtb3ZlRG9jdW1lbnQiLCJkb2N1bWVudCIsImZlYXR1cmVzIiwiY2FwYWJpbGl0aWVzIiwiaG92ZXJQcm92aWRlciIsImNvbXBsZXRpb25Qcm92aWRlciIsIl9jYXBhYmlsaXRpZXNfY29tcGxldGlvblByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiaW5saW5lQ29tcGxldGlvblByb3ZpZGVyIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdQcm92aWRlciIsImRvY3VtZW50Rm9ybWF0dGluZ1Byb3ZpZGVyIiwiZGlhZ25vc3RpY1Byb3ZpZGVyIiwic2lnbmF0dXJlSGVscFByb3ZpZGVyIiwiZG9jdW1lbnRIaWdobGlnaHRQcm92aWRlciIsInNlbWFudGljVG9rZW5zUHJvdmlkZXIiLCJjb2RlQWN0aW9uUHJvdmlkZXIiLCJleGVjdXRlQ29tbWFuZFByb3ZpZGVyIiwic2VydmljZXNXaXRoTmFtZSIsImV4dGVuc2lvbnMiLCJzcGxpdCIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInJlZ2lzdGVyU2VydmVyIiwiY2xpZW50Q29uZmlnIiwic2VydmljZUZlYXR1cmVzIiwiX2ZlYXR1cmVzIiwiX2ZlYXR1cmVzMSIsIl9mZWF0dXJlczIiLCJfZmVhdHVyZXMzIiwiX2ZlYXR1cmVzNCIsIl9mZWF0dXJlczUiLCJfZmVhdHVyZXM2IiwiX2ZlYXR1cmVzNyIsIl9mZWF0dXJlczgiLCJfZmVhdHVyZXM5IiwiX2ZlYXR1cmVzMTAiLCJfaG92ZXIiLCJfY29tcGxldGlvbiIsImNvbXBsZXRpb24iLCJfY29tcGxldGlvblJlc29sdmUiLCJjb21wbGV0aW9uUmVzb2x2ZSIsIl9mb3JtYXQiLCJfZGlhZ25vc3RpY3MiLCJkaWFnbm9zdGljcyIsIl9zaWduYXR1cmVIZWxwIiwiX2RvY3VtZW50SGlnaGxpZ2h0IiwiX3NlbWFudGljVG9rZW5zIiwic2VtYW50aWNUb2tlbnMiLCJfY29kZUFjdGlvbiIsImNvZGVBY3Rpb24iLCJfZXhlY3V0ZUNvbW1hbmQiLCJfaW5saW5lQ29tcGxldGlvbiIsImlubGluZUNvbXBsZXRpb24iLCJkb1ZhbGlkYXRpb24iLCJzZXJ2aWNlc0luc3RhbmNlcyIsImRvY3VtZW50VXJpc0xpc3QiLCJkb2N1bWVudHMiLCJwb3N0TWVzc2FnZSIsImZsYXQiLCJwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsImRhdGEiLCJfbWVzc2FnZV9zZXNzaW9uSWQiLCJzZXNzaW9uSUQiLCJfbWVzc2FnZV9kb2N1bWVudFVyaSIsImNvbXBsZXRpb25zIiwiZG9Db21wbGV0ZSIsImRvSW5saW5lQ29tcGxldGUiLCJfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCIsImZpbmQiLCJkb1Jlc29sdmUiLCJzZXRWYWx1ZSIsImFwcGx5RGVsdGFzIiwiYmluZCIsImhpZ2hsaWdodHMiLCJjb2RlQWN0aW9ucyIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lIiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMSIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMSIsInNlbmRBcHBsaWVkUmVzdWx0IiwiX3RoaXNfJHNlcnZpY2VzX21lc3NhZ2Vfc2VydmljZU5hbWVfc2VydmljZUluc3RhbmNlMiIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lMiIsIl90aGlzXyRzZXJ2aWNlc19tZXNzYWdlX3NlcnZpY2VOYW1lX3NlcnZpY2VJbnN0YW5jZTMiLCJfdGhpc18kc2VydmljZXNfbWVzc2FnZV9zZXJ2aWNlTmFtZTMiXSwic291cmNlUm9vdCI6IiJ9