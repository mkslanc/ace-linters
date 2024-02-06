(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6002:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cs: () => (/* binding */ MessageType)
/* harmony export */ });
/* unused harmony exports BaseMessage, InitMessage, FormatMessage, CompleteMessage, ResolveCompletionMessage, HoverMessage, ValidateMessage, ChangeMessage, DeltasMessage, ChangeModeMessage, ChangeOptionsMessage, CloseDocumentMessage, DisposeMessage, GlobalOptionsMessage, ConfigureFeaturesMessage, SignatureHelpMessage, DocumentHighlightMessage */
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
class BaseMessage {
    constructor(sessionId){
        _define_property(this, "sessionId", void 0);
        this.sessionId = sessionId;
    }
}
class InitMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
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
class FormatMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value, format){
        super(sessionId);
        _define_property(this, "type", MessageType.format);
        _define_property(this, "value", void 0);
        _define_property(this, "format", void 0);
        this.value = value;
        this.format = format;
    }
}
class CompleteMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value){
        super(sessionId);
        _define_property(this, "type", MessageType.complete);
        _define_property(this, "value", void 0);
        this.value = value;
    }
}
class ResolveCompletionMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value){
        super(sessionId);
        _define_property(this, "type", MessageType.resolveCompletion);
        _define_property(this, "value", void 0);
        this.value = value;
    }
}
class HoverMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value){
        super(sessionId);
        _define_property(this, "type", MessageType.hover);
        _define_property(this, "value", void 0);
        this.value = value;
    }
}
class ValidateMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId){
        super(sessionId);
        _define_property(this, "type", MessageType.validate);
    }
}
class ChangeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value, version){
        super(sessionId);
        _define_property(this, "type", MessageType.change);
        _define_property(this, "value", void 0);
        _define_property(this, "version", void 0);
        this.value = value;
        this.version = version;
    }
}
class DeltasMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value, version){
        super(sessionId);
        _define_property(this, "type", MessageType.applyDelta);
        _define_property(this, "value", void 0);
        _define_property(this, "version", void 0);
        this.value = value;
        this.version = version;
    }
}
class ChangeModeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value, mode){
        super(sessionId);
        _define_property(this, "type", MessageType.changeMode);
        _define_property(this, "mode", void 0);
        _define_property(this, "value", void 0);
        this.value = value;
        this.mode = mode;
    }
}
class ChangeOptionsMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, options, merge = false){
        super(sessionId);
        _define_property(this, "type", MessageType.changeOptions);
        _define_property(this, "options", void 0);
        _define_property(this, "merge", void 0);
        this.options = options;
        this.merge = merge;
    }
}
class CloseDocumentMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId){
        super(sessionId);
        _define_property(this, "type", MessageType.closeDocument);
    }
}
class DisposeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
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
class SignatureHelpMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    constructor(sessionId, value){
        super(sessionId);
        _define_property(this, "type", MessageType.signatureHelp);
        _define_property(this, "value", void 0);
        this.value = value;
    }
}
class DocumentHighlightMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
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


/***/ }),

/***/ 6297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dw: () => (/* binding */ notEmpty),
/* harmony export */   PM: () => (/* binding */ mergeObjects)
/* harmony export */ });
/* unused harmony exports mergeRanges, checkValueAgainstRegexpArray */
function mergeObjects(obj1, obj2, excludeUndefined = false) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceManager: () => (/* binding */ ServiceManager)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6297);
/* harmony import */ var _message_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6002);
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
        let module;
        if ('type' in service) {
            if ([
                "socket",
                "webworker"
            ].includes(service.type)) {
                module = await service.module();
                service.serviceInstance = new module["LanguageClient"](service, ctx);
            } else throw "Unknown service type";
        } else {
            module = await service.module();
            service.serviceInstance = new module[service.className](service.modes);
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
        service.options = merge ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .mergeObjects */ .PM)(options, service.options) : options;
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
        return services.map((el)=>el.serviceInstance).filter(_utils__WEBPACK_IMPORTED_MODULE_1__/* .notEmpty */ .Dw);
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
                "type": _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.validate
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
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.format:
                    serviceInstances = this.filterByFeature(serviceInstances, "format");
                    if (serviceInstances.length > 0) {
                        //we will use only first service to format
                        postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
                    }
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.complete:
                    postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service)=>{
                        return {
                            completions: await service.doComplete(documentIdentifier, message.value),
                            service: service.serviceData.className
                        };
                    }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__/* .notEmpty */ .Dw);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.resolveCompletion:
                    var _this_filterByFeature_find;
                    let serviceName = message.value.service;
                    postMessage["value"] = await ((_this_filterByFeature_find = this.filterByFeature(serviceInstances, "completionResolve").find((service)=>{
                        if (service.serviceData.className === serviceName) {
                            return service;
                        }
                    })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value));
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.change:
                    serviceInstances.forEach((service)=>{
                        service.setValue(documentIdentifier, message.value);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.applyDelta:
                    serviceInstances.forEach((service)=>{
                        service.applyDeltas(documentIdentifier, message.value);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.hover:
                    postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "hover").map(async (service)=>{
                        return service.doHover(documentIdentifier, message.value);
                    }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__/* .notEmpty */ .Dw);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.validate:
                    postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.init:
                    var _this;
                    postMessage["value"] = (_this = await this.addDocument(documentIdentifier, message.value, message.mode, message.options)) === null || _this === void 0 ? void 0 : _this.map((el)=>el.serviceCapabilities);
                    await doValidation(documentIdentifier);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.changeMode:
                    var _this1;
                    postMessage["value"] = (_this1 = await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options)) === null || _this1 === void 0 ? void 0 : _this1.map((el)=>el.serviceCapabilities);
                    await doValidation(documentIdentifier);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.changeOptions:
                    serviceInstances.forEach((service)=>{
                        service.setOptions(sessionID, message.options);
                    });
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.closeDocument:
                    this.removeDocument(documentIdentifier);
                    await doValidation(documentIdentifier, serviceInstances);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.dispose:
                    await this.disposeAll();
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.globalOptions:
                    this.setGlobalOptions(message.serviceName, message.options, message.merge);
                    await provideValidationForServiceInstance(message.serviceName);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.configureFeatures:
                    this.configureFeatures(message.serviceName, message.options);
                    await provideValidationForServiceInstance(message.serviceName);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.signatureHelp:
                    postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "signatureHelp").map(async (service)=>{
                        return service.provideSignatureHelp(documentIdentifier, message.value);
                    }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__/* .notEmpty */ .Dw);
                    break;
                case _message_types__WEBPACK_IMPORTED_MODULE_0__/* .MessageType */ .Cs.documentHighlight:
                    let highlights = (await Promise.all(this.filterByFeature(serviceInstances, "documentHighlight").map(async (service)=>{
                        return service.findDocumentHighlights(documentIdentifier, message.value);
                    }))).filter(_utils__WEBPACK_IMPORTED_MODULE_1__/* .notEmpty */ .Dw);
                    postMessage["value"] = highlights.flat();
                    break;
            }
            ctx.postMessage(postMessage);
        });
    }
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});