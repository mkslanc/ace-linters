(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5031],{

/***/ 5031:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();
    else { var i, a; }
})(this, ()=>{
    return /******/ (()=>{
        /******/ "use strict";
        /******/ // The require scope
        /******/ var __nested_webpack_require_490__ = {};
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_490__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_490__.o(definition, key) && !__nested_webpack_require_490__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_490__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_490__.r = (exports1)=>{
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
        // ESM COMPAT FLAG
        __nested_webpack_require_490__.r(__nested_webpack_exports__);
        // EXPORTS
        __nested_webpack_require_490__.d(__nested_webpack_exports__, {
            ServiceManager: ()=>/* binding */ ServiceManager
        });
        ; // CONCATENATED MODULE: ./src/utils.ts
        function mergeObjects(obj1, obj2) {
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
        ; // CONCATENATED MODULE: ./src/message-types.ts
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
        class DisposeMessage extends /* unused pure expression or super */ (null && 0) {
            constructor(sessionId){
                super(sessionId);
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
            MessageType[MessageType["dispose"] = 10] = "dispose";
            MessageType[MessageType["globalOptions"] = 11] = "globalOptions";
            MessageType[MessageType["configureFeatures"] = 12] = "configureFeatures";
            MessageType[MessageType["signatureHelp"] = 13] = "signatureHelp";
            MessageType[MessageType["documentHighlight"] = 14] = "documentHighlight";
        })(MessageType || (MessageType = {}));
        ; // CONCATENATED MODULE: ./src/services/service-manager.ts
        function service_manager_define_property(obj, key, value) {
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
            static async $initServiceInstance(service) {
                let module1 = await service.module();
                service.serviceInstance = new module1[service.className](service.modes);
                if (service.options) service.serviceInstance.setGlobalOptions(service.options);
                service.serviceInstance.serviceData = service;
                return service.serviceInstance;
            }
            async $getServicesInstancesByMode(mode) {
                let services = this.findServicesByMode(mode);
                if (services.length === 0) {
                    return [];
                }
                return Promise.all(services.map(async (service)=>{
                    if (!service.serviceInstance) {
                        return await ServiceManager.$initServiceInstance(service);
                    } else {
                        return service.serviceInstance;
                    }
                }));
            }
            setGlobalOptions(serviceName, options, merge = false) {
                let service = this.$services[serviceName];
                if (!service) return;
                service.options = merge ? mergeObjects(options, service.options) : options;
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
                return services.map((el)=>el.serviceInstance).filter(notEmpty);
            }
            filterByFeature(serviceInstances, feature) {
                return serviceInstances.filter((el)=>el.serviceData.features[feature] === true);
            }
            findServicesByMode(mode) {
                return Object.values(this.$services).filter((el)=>{
                    let extensions = el.modes.split('|');
                    if (extensions.includes(mode)) return el;
                });
            }
            registerService(name, service) {
                service.features = this.setDefaultFeaturesState(service.features);
                this.$services[name] = service;
            }
            configureFeatures(name, features) {
                features = this.setDefaultFeaturesState(features);
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
                service_manager_define_property(this, "$services", {});
                service_manager_define_property(this, "$sessionIDToMode", {});
                let doValidation = async (document, servicesInstances)=>{
                    servicesInstances !== null && servicesInstances !== void 0 ? servicesInstances : servicesInstances = this.getServicesInstances(document.uri);
                    if (servicesInstances.length === 0) {
                        return;
                    }
                    //this is list of documents linked to services
                    let sessionIDList = Object.keys(servicesInstances[0].documents);
                    servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
                    let postMessage = {
                        "type": MessageType.validate
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
                    var serviceInstance = this.$services[serviceName].serviceInstance;
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
                        case MessageType.format:
                            serviceInstances = this.filterByFeature(serviceInstances, "format");
                            if (serviceInstances.length > 0) {
                                //we will use only first service to format
                                postMessage["value"] = serviceInstances[0].format(documentIdentifier, message.value, message.format);
                            }
                            break;
                        case MessageType.complete:
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service)=>{
                                return {
                                    completions: await service.doComplete(documentIdentifier, message.value),
                                    service: service.serviceData.className
                                };
                            }))).filter(notEmpty);
                            break;
                        case MessageType.resolveCompletion:
                            var _this_filterByFeature_find;
                            let serviceName = message.value.service;
                            postMessage["value"] = await ((_this_filterByFeature_find = this.filterByFeature(serviceInstances, "completionResolve").find((service)=>{
                                if (service.serviceData.className === serviceName) {
                                    return service;
                                }
                            })) === null || _this_filterByFeature_find === void 0 ? void 0 : _this_filterByFeature_find.doResolve(message.value));
                            break;
                        case MessageType.change:
                            serviceInstances.forEach((service)=>{
                                service.setValue(documentIdentifier, message.value);
                            });
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.applyDelta:
                            serviceInstances.forEach((service)=>{
                                service.applyDeltas(documentIdentifier, message.value);
                            });
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.hover:
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "hover").map(async (service)=>{
                                return service.doHover(documentIdentifier, message.value);
                            }))).filter(notEmpty);
                            break;
                        case MessageType.validate:
                            postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.init:
                            var _this;
                            postMessage["value"] = (_this = await this.addDocument(documentIdentifier, message.value, message.mode, message.options)) === null || _this === void 0 ? void 0 : _this.map((el)=>el.serviceCapabilities);
                            await doValidation(documentIdentifier);
                            break;
                        case MessageType.changeMode:
                            var _this1;
                            postMessage["value"] = (_this1 = await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options)) === null || _this1 === void 0 ? void 0 : _this1.map((el)=>el.serviceCapabilities);
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.changeOptions:
                            serviceInstances.forEach((service)=>{
                                service.setOptions(sessionID, message.options);
                            });
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.dispose:
                            this.removeDocument(documentIdentifier);
                            await doValidation(documentIdentifier, serviceInstances);
                            break;
                        case MessageType.globalOptions:
                            this.setGlobalOptions(message.serviceName, message.options, message.merge);
                            await provideValidationForServiceInstance(message.serviceName);
                            break;
                        case MessageType.configureFeatures:
                            this.configureFeatures(message.serviceName, message.options);
                            await provideValidationForServiceInstance(message.serviceName);
                            break;
                        case MessageType.signatureHelp:
                            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "signatureHelp").map(async (service)=>{
                                return service.provideSignatureHelp(documentIdentifier, message.value);
                            }))).filter(notEmpty);
                            break;
                        case MessageType.documentHighlight:
                            let highlights = (await Promise.all(this.filterByFeature(serviceInstances, "documentHighlight").map(async (service)=>{
                                return service.findDocumentHighlights(documentIdentifier, message.value);
                            }))).filter(notEmpty);
                            postMessage["value"] = highlights.flat();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3ZHLE9BQU9BLFFBQVF3RixzQkFBc0IsQ0FBQzFFLG9CQUFvQndELFFBQVFwSixLQUFLOzRCQUMzRSxHQUFFLEVBQUc0RyxNQUFNLENBQUNqRzs0QkFDWm1JLFdBQVcsQ0FBQyxRQUFRLEdBQUd1QixXQUFXckIsSUFBSTs0QkFDdEM7b0JBQ1I7b0JBQ0FQLElBQUlLLFdBQVcsQ0FBQ0E7Z0JBQ3BCO1lBQ0o7UUFDSjtRQUVBLE1BQU0sR0FBSSxPQUFPN0ksMEJBQW1CQTtJQUNwQyxNQUFNLEdBQUc7QUFFVCIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9wYWNrYWdlcy9hY2UtbGludGVycy9idWlsZC9zZXJ2aWNlLW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBzY29wZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBFU00gQ09NUEFUIEZMQUdcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcblxuLy8gRVhQT1JUU1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbiAgU2VydmljZU1hbmFnZXI6ICgpID0+ICgvKiBiaW5kaW5nICovIFNlcnZpY2VNYW5hZ2VyKVxufSk7XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy91dGlscy50c1xuZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG9iajEsIG9iajIpIHtcbiAgICBpZiAoIW9iajEpIHJldHVybiBvYmoyO1xuICAgIGlmICghb2JqMikgcmV0dXJuIG9iajE7XG4gICAgY29uc3QgbWVyZ2VkT2JqZWN0cyA9IHtcbiAgICAgICAgLi4ub2JqMixcbiAgICAgICAgLi4ub2JqMVxuICAgIH07IC8vIEdpdmUgcHJpb3JpdHkgdG8gb2JqMSB2YWx1ZXMgYnkgc3ByZWFkaW5nIG9iajIgZmlyc3QsIHRoZW4gb2JqMVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1lcmdlZE9iamVjdHMpKXtcbiAgICAgICAgaWYgKG9iajFba2V5XSAmJiBvYmoyW2tleV0pIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iajFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBvYmoxW2tleV0uY29uY2F0KG9iajJba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqMltrZXldKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IG9iajJba2V5XS5jb25jYXQob2JqMVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iajFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajJba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBtZXJnZU9iamVjdHMob2JqMVtrZXldLCBvYmoyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzO1xufVxuZnVuY3Rpb24gbm90RW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbi8vdGFrZW4gd2l0aCBzbWFsbCBjaGFuZ2VzIGZyb20gYWNlLWNvZGVcbmZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHJhbmdlcykge1xuICAgIHZhciBsaXN0ID0gcmFuZ2VzO1xuICAgIGxpc3QgPSBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnN0YXJ0LCBiLnN0YXJ0KTtcbiAgICB9KTtcbiAgICB2YXIgbmV4dCA9IGxpc3RbMF0sIHJhbmdlO1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmFuZ2UgPSBuZXh0O1xuICAgICAgICBuZXh0ID0gbGlzdFtpXTtcbiAgICAgICAgdmFyIGNtcCA9IGNvbXBhcmVQb2ludHMocmFuZ2UuZW5kLCBuZXh0LnN0YXJ0KTtcbiAgICAgICAgaWYgKGNtcCA8IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY21wID09IDAgJiYgIXJhbmdlLmlzRW1wdHkoKSAmJiAhbmV4dC5pc0VtcHR5KCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY29tcGFyZVBvaW50cyhyYW5nZS5lbmQsIG5leHQuZW5kKSA8IDApIHtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5yb3cgPSBuZXh0LmVuZC5yb3c7XG4gICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbmV4dC5lbmQuY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICBuZXh0ID0gcmFuZ2U7XG4gICAgICAgIGktLTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG59XG5mdW5jdGlvbiBjb21wYXJlUG9pbnRzKHAxLCBwMikge1xuICAgIHJldHVybiBwMS5yb3cgLSBwMi5yb3cgfHwgcDEuY29sdW1uIC0gcDIuY29sdW1uO1xufVxuZnVuY3Rpb24gY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSh2YWx1ZSwgcmVnZXhwQXJyYXkpIHtcbiAgICBpZiAoIXJlZ2V4cEFycmF5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ2V4cEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYgKHJlZ2V4cEFycmF5W2ldLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9tZXNzYWdlLXR5cGVzLnRzXG5mdW5jdGlvbiBfZGVmaW5lX3Byb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5jbGFzcyBCYXNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlc3Npb25JZFwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICB9XG59XG5jbGFzcyBJbml0TWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24sIG1vZGUsIG9wdGlvbnMpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5pbml0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1vZGVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2ZXJzaW9uXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBGb3JtYXRNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSwgZm9ybWF0KXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuZm9ybWF0KTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJmb3JtYXRcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG59XG5jbGFzcyBDb21wbGV0ZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29tcGxldGUpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5yZXNvbHZlQ29tcGxldGlvbik7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuY2xhc3MgSG92ZXJNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmhvdmVyKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZhbHVlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBWYWxpZGF0ZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS52YWxpZGF0ZSk7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUsIHZlcnNpb24pe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2UpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInZlcnNpb25cIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbn1cbmNsYXNzIERlbHRhc01lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCB2ZXJzaW9uKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuYXBwbHlEZWx0YSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmVyc2lvblwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlTW9kZU1lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIHZhbHVlLCBtb2RlKXtcbiAgICAgICAgc3VwZXIoc2Vzc2lvbklkKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY2hhbmdlTW9kZSk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtb2RlXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgfVxufVxuY2xhc3MgQ2hhbmdlT3B0aW9uc01lc3NhZ2UgZXh0ZW5kcyAoLyogdW51c2VkIHB1cmUgZXhwcmVzc2lvbiBvciBzdXBlciAqLyBudWxsICYmIChCYXNlTWVzc2FnZSkpIHtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uSWQsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2Upe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5jaGFuZ2VPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm1lcmdlXCIsIHZvaWQgMCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBEaXNwb3NlTWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLmRpc3Bvc2UpO1xuICAgIH1cbn1cbmNsYXNzIEdsb2JhbE9wdGlvbnNNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlTmFtZSwgb3B0aW9ucywgbWVyZ2Upe1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5nbG9iYWxPcHRpb25zKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInNlcnZpY2VOYW1lXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJvcHRpb25zXCIsIHZvaWQgMCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJtZXJnZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubWVyZ2UgPSBtZXJnZTtcbiAgICB9XG59XG5jbGFzcyBDb25maWd1cmVGZWF0dXJlc01lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VOYW1lLCBvcHRpb25zKXtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcInR5cGVcIiwgTWVzc2FnZVR5cGUuY29uZmlndXJlRmVhdHVyZXMpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwic2VydmljZU5hbWVcIiwgdm9pZCAwKTtcbiAgICAgICAgX2RlZmluZV9wcm9wZXJ0eSh0aGlzLCBcIm9wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbn1cbmNsYXNzIFNpZ25hdHVyZUhlbHBNZXNzYWdlIGV4dGVuZHMgKC8qIHVudXNlZCBwdXJlIGV4cHJlc3Npb24gb3Igc3VwZXIgKi8gbnVsbCAmJiAoQmFzZU1lc3NhZ2UpKSB7XG4gICAgY29uc3RydWN0b3Ioc2Vzc2lvbklkLCB2YWx1ZSl7XG4gICAgICAgIHN1cGVyKHNlc3Npb25JZCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ0eXBlXCIsIE1lc3NhZ2VUeXBlLnNpZ25hdHVyZUhlbHApO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidmFsdWVcIiwgdm9pZCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmNsYXNzIERvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSBleHRlbmRzICgvKiB1bnVzZWQgcHVyZSBleHByZXNzaW9uIG9yIHN1cGVyICovIG51bGwgJiYgKEJhc2VNZXNzYWdlKSkge1xuICAgIGNvbnN0cnVjdG9yKHNlc3Npb25JZCwgdmFsdWUpe1xuICAgICAgICBzdXBlcihzZXNzaW9uSWQpO1xuICAgICAgICBfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwidHlwZVwiLCBNZXNzYWdlVHlwZS5kb2N1bWVudEhpZ2hsaWdodCk7XG4gICAgICAgIF9kZWZpbmVfcHJvcGVydHkodGhpcywgXCJ2YWx1ZVwiLCB2b2lkIDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxudmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uKE1lc3NhZ2VUeXBlKSB7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJpbml0XCJdID0gMF0gPSBcImluaXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImZvcm1hdFwiXSA9IDFdID0gXCJmb3JtYXRcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNvbXBsZXRlXCJdID0gMl0gPSBcImNvbXBsZXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJyZXNvbHZlQ29tcGxldGlvblwiXSA9IDNdID0gXCJyZXNvbHZlQ29tcGxldGlvblwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlXCJdID0gNF0gPSBcImNoYW5nZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiaG92ZXJcIl0gPSA1XSA9IFwiaG92ZXJcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInZhbGlkYXRlXCJdID0gNl0gPSBcInZhbGlkYXRlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJhcHBseURlbHRhXCJdID0gN10gPSBcImFwcGx5RGVsdGFcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImNoYW5nZU1vZGVcIl0gPSA4XSA9IFwiY2hhbmdlTW9kZVwiO1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiY2hhbmdlT3B0aW9uc1wiXSA9IDldID0gXCJjaGFuZ2VPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJkaXNwb3NlXCJdID0gMTBdID0gXCJkaXNwb3NlXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJnbG9iYWxPcHRpb25zXCJdID0gMTFdID0gXCJnbG9iYWxPcHRpb25zXCI7XG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJjb25maWd1cmVGZWF0dXJlc1wiXSA9IDEyXSA9IFwiY29uZmlndXJlRmVhdHVyZXNcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcInNpZ25hdHVyZUhlbHBcIl0gPSAxM10gPSBcInNpZ25hdHVyZUhlbHBcIjtcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcImRvY3VtZW50SGlnaGxpZ2h0XCJdID0gMTRdID0gXCJkb2N1bWVudEhpZ2hsaWdodFwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcblxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3NlcnZpY2VzL3NlcnZpY2UtbWFuYWdlci50c1xuZnVuY3Rpb24gc2VydmljZV9tYW5hZ2VyX2RlZmluZV9wcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbmNsYXNzIFNlcnZpY2VNYW5hZ2VyIHtcbiAgICBzdGF0aWMgYXN5bmMgJGluaXRTZXJ2aWNlSW5zdGFuY2Uoc2VydmljZSkge1xuICAgICAgICBsZXQgbW9kdWxlID0gYXdhaXQgc2VydmljZS5tb2R1bGUoKTtcbiAgICAgICAgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2UgPSBuZXcgbW9kdWxlW3NlcnZpY2UuY2xhc3NOYW1lXShzZXJ2aWNlLm1vZGVzKTtcbiAgICAgICAgaWYgKHNlcnZpY2Uub3B0aW9ucykgc2VydmljZS5zZXJ2aWNlSW5zdGFuY2Uuc2V0R2xvYmFsT3B0aW9ucyhzZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXJ2aWNlRGF0YSA9IHNlcnZpY2U7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZTtcbiAgICB9XG4gICAgYXN5bmMgJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gdGhpcy5maW5kU2VydmljZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc2VydmljZXMubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBTZXJ2aWNlTWFuYWdlci4kaW5pdFNlcnZpY2VJbnN0YW5jZShzZXJ2aWNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc2VydmljZUluc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHNldEdsb2JhbE9wdGlvbnMoc2VydmljZU5hbWUsIG9wdGlvbnMsIG1lcmdlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSB0aGlzLiRzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XG4gICAgICAgIGlmICghc2VydmljZSkgcmV0dXJuO1xuICAgICAgICBzZXJ2aWNlLm9wdGlvbnMgPSBtZXJnZSA/IG1lcmdlT2JqZWN0cyhvcHRpb25zLCBzZXJ2aWNlLm9wdGlvbnMpIDogb3B0aW9ucztcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VydmljZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNlcnZpY2VJbnN0YW5jZS5zZXRHbG9iYWxPcHRpb25zKHNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgYWRkRG9jdW1lbnQoZG9jdW1lbnRJZGVudGlmaWVyLCBkb2N1bWVudFZhbHVlLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghbW9kZSB8fCAhL15hY2VcXC9tb2RlXFwvLy50ZXN0KG1vZGUpKSByZXR1cm47XG4gICAgICAgIG1vZGUgPSBtb2RlLnJlcGxhY2UoXCJhY2UvbW9kZS9cIiwgXCJcIik7XG4gICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gYXdhaXQgdGhpcy4kZ2V0U2VydmljZXNJbnN0YW5jZXNCeU1vZGUobW9kZSk7XG4gICAgICAgIGlmIChzZXJ2aWNlSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBsZXQgZG9jdW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgdXJpOiBkb2N1bWVudElkZW50aWZpZXIudXJpLFxuICAgICAgICAgICAgdmVyc2lvbjogZG9jdW1lbnRJZGVudGlmaWVyLnZlcnNpb24sXG4gICAgICAgICAgICBsYW5ndWFnZUlkOiBtb2RlLFxuICAgICAgICAgICAgdGV4dDogZG9jdW1lbnRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICBzZXJ2aWNlSW5zdGFuY2VzLmZvckVhY2goKGVsKT0+ZWwuYWRkRG9jdW1lbnQoZG9jdW1lbnRJdGVtKSk7XG4gICAgICAgIHRoaXMuJHNlc3Npb25JRFRvTW9kZVtkb2N1bWVudElkZW50aWZpZXIudXJpXSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSW5zdGFuY2VzO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VEb2N1bWVudE1vZGUoZG9jdW1lbnRJZGVudGlmaWVyLCB2YWx1ZSwgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgdmFsdWUsIG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVEb2N1bWVudChkb2N1bWVudCkge1xuICAgICAgICBsZXQgc2VydmljZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKChlbCk9PmVsLnJlbW92ZURvY3VtZW50KGRvY3VtZW50KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW2RvY3VtZW50LnVyaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VydmljZXNJbnN0YW5jZXMoc2Vzc2lvbklEKSB7XG4gICAgICAgIGxldCBtb2RlID0gdGhpcy4kc2Vzc2lvbklEVG9Nb2RlW3Nlc3Npb25JRF07XG4gICAgICAgIGlmICghbW9kZSkgcmV0dXJuIFtdOyAvL1RPRE86XG4gICAgICAgIGxldCBzZXJ2aWNlcyA9IHRoaXMuZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpO1xuICAgICAgICByZXR1cm4gc2VydmljZXMubWFwKChlbCk9PmVsLnNlcnZpY2VJbnN0YW5jZSkuZmlsdGVyKG5vdEVtcHR5KTtcbiAgICB9XG4gICAgZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIGZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJbnN0YW5jZXMuZmlsdGVyKChlbCk9PmVsLnNlcnZpY2VEYXRhLmZlYXR1cmVzW2ZlYXR1cmVdID09PSB0cnVlKTtcbiAgICB9XG4gICAgZmluZFNlcnZpY2VzQnlNb2RlKG1vZGUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy4kc2VydmljZXMpLmZpbHRlcigoZWwpPT57XG4gICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IGVsLm1vZGVzLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmNsdWRlcyhtb2RlKSkgcmV0dXJuIGVsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVnaXN0ZXJTZXJ2aWNlKG5hbWUsIHNlcnZpY2UpIHtcbiAgICAgICAgc2VydmljZS5mZWF0dXJlcyA9IHRoaXMuc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZS5mZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuJHNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcbiAgICB9XG4gICAgY29uZmlndXJlRmVhdHVyZXMobmFtZSwgZmVhdHVyZXMpIHtcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLnNldERlZmF1bHRGZWF0dXJlc1N0YXRlKGZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy4kc2VydmljZXNbbmFtZV0uZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICB9XG4gICAgc2V0RGVmYXVsdEZlYXR1cmVzU3RhdGUoc2VydmljZUZlYXR1cmVzKSB7XG4gICAgICAgIHZhciBfZmVhdHVyZXMsIF9mZWF0dXJlczEsIF9mZWF0dXJlczIsIF9mZWF0dXJlczMsIF9mZWF0dXJlczQsIF9mZWF0dXJlczUsIF9mZWF0dXJlczY7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHNlcnZpY2VGZWF0dXJlcyAhPT0gbnVsbCAmJiBzZXJ2aWNlRmVhdHVyZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VGZWF0dXJlcyA6IHt9O1xuICAgICAgICB2YXIgX2hvdmVyO1xuICAgICAgICAoX2hvdmVyID0gKF9mZWF0dXJlcyA9IGZlYXR1cmVzKS5ob3ZlcikgIT09IG51bGwgJiYgX2hvdmVyICE9PSB2b2lkIDAgPyBfaG92ZXIgOiBfZmVhdHVyZXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB2YXIgX2NvbXBsZXRpb247XG4gICAgICAgIChfY29tcGxldGlvbiA9IChfZmVhdHVyZXMxID0gZmVhdHVyZXMpLmNvbXBsZXRpb24pICE9PSBudWxsICYmIF9jb21wbGV0aW9uICE9PSB2b2lkIDAgPyBfY29tcGxldGlvbiA6IF9mZWF0dXJlczEuY29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBfY29tcGxldGlvblJlc29sdmU7XG4gICAgICAgIChfY29tcGxldGlvblJlc29sdmUgPSAoX2ZlYXR1cmVzMiA9IGZlYXR1cmVzKS5jb21wbGV0aW9uUmVzb2x2ZSkgIT09IG51bGwgJiYgX2NvbXBsZXRpb25SZXNvbHZlICE9PSB2b2lkIDAgPyBfY29tcGxldGlvblJlc29sdmUgOiBfZmVhdHVyZXMyLmNvbXBsZXRpb25SZXNvbHZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9mb3JtYXQ7XG4gICAgICAgIChfZm9ybWF0ID0gKF9mZWF0dXJlczMgPSBmZWF0dXJlcykuZm9ybWF0KSAhPT0gbnVsbCAmJiBfZm9ybWF0ICE9PSB2b2lkIDAgPyBfZm9ybWF0IDogX2ZlYXR1cmVzMy5mb3JtYXQgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpYWdub3N0aWNzO1xuICAgICAgICAoX2RpYWdub3N0aWNzID0gKF9mZWF0dXJlczQgPSBmZWF0dXJlcykuZGlhZ25vc3RpY3MpICE9PSBudWxsICYmIF9kaWFnbm9zdGljcyAhPT0gdm9pZCAwID8gX2RpYWdub3N0aWNzIDogX2ZlYXR1cmVzNC5kaWFnbm9zdGljcyA9IHRydWU7XG4gICAgICAgIHZhciBfc2lnbmF0dXJlSGVscDtcbiAgICAgICAgKF9zaWduYXR1cmVIZWxwID0gKF9mZWF0dXJlczUgPSBmZWF0dXJlcykuc2lnbmF0dXJlSGVscCkgIT09IG51bGwgJiYgX3NpZ25hdHVyZUhlbHAgIT09IHZvaWQgMCA/IF9zaWduYXR1cmVIZWxwIDogX2ZlYXR1cmVzNS5zaWduYXR1cmVIZWxwID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kb2N1bWVudEhpZ2hsaWdodDtcbiAgICAgICAgKF9kb2N1bWVudEhpZ2hsaWdodCA9IChfZmVhdHVyZXM2ID0gZmVhdHVyZXMpLmRvY3VtZW50SGlnaGxpZ2h0KSAhPT0gbnVsbCAmJiBfZG9jdW1lbnRIaWdobGlnaHQgIT09IHZvaWQgMCA/IF9kb2N1bWVudEhpZ2hsaWdodCA6IF9mZWF0dXJlczYuZG9jdW1lbnRIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGN0eCl7XG4gICAgICAgIHNlcnZpY2VfbWFuYWdlcl9kZWZpbmVfcHJvcGVydHkodGhpcywgXCIkc2VydmljZXNcIiwge30pO1xuICAgICAgICBzZXJ2aWNlX21hbmFnZXJfZGVmaW5lX3Byb3BlcnR5KHRoaXMsIFwiJHNlc3Npb25JRFRvTW9kZVwiLCB7fSk7XG4gICAgICAgIGxldCBkb1ZhbGlkYXRpb24gPSBhc3luYyAoZG9jdW1lbnQsIHNlcnZpY2VzSW5zdGFuY2VzKT0+e1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgIT09IG51bGwgJiYgc2VydmljZXNJbnN0YW5jZXMgIT09IHZvaWQgMCA/IHNlcnZpY2VzSW5zdGFuY2VzIDogc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmdldFNlcnZpY2VzSW5zdGFuY2VzKGRvY3VtZW50LnVyaSk7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNJbnN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzIGlzIGxpc3Qgb2YgZG9jdW1lbnRzIGxpbmtlZCB0byBzZXJ2aWNlc1xuICAgICAgICAgICAgbGV0IHNlc3Npb25JRExpc3QgPSBPYmplY3Qua2V5cyhzZXJ2aWNlc0luc3RhbmNlc1swXS5kb2N1bWVudHMpO1xuICAgICAgICAgICAgc2VydmljZXNJbnN0YW5jZXMgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlc0luc3RhbmNlcywgXCJkaWFnbm9zdGljc1wiKTtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogTWVzc2FnZVR5cGUudmFsaWRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBzZXNzaW9uSUQgb2Ygc2Vzc2lvbklETGlzdCl7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgICAgICAgICAgbGV0IGRpYWdub3N0aWNzID0gKF9yZWYgPSBhd2FpdCBQcm9taXNlLmFsbChzZXJ2aWNlc0luc3RhbmNlcy5tYXAoKGVsKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZG9WYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogc2Vzc2lvbklEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IFtdO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1wic2Vzc2lvbklkXCJdID0gc2Vzc2lvbklEO1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBkaWFnbm9zdGljcy5mbGF0KCk7XG4gICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHBvc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3ZpZGVWYWxpZGF0aW9uRm9yU2VydmljZUluc3RhbmNlID0gYXN5bmMgKHNlcnZpY2VOYW1lKT0+e1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJbnN0YW5jZSA9IHRoaXMuJHNlcnZpY2VzW3NlcnZpY2VOYW1lXS5zZXJ2aWNlSW5zdGFuY2U7XG4gICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlKSBhd2FpdCBkb1ZhbGlkYXRpb24odW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFzeW5jIChldik9PntcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXYuZGF0YTtcbiAgICAgICAgICAgIHZhciBfbWVzc2FnZV9zZXNzaW9uSWQ7XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbklEID0gKF9tZXNzYWdlX3Nlc3Npb25JZCA9IG1lc3NhZ2Uuc2Vzc2lvbklkKSAhPT0gbnVsbCAmJiBfbWVzc2FnZV9zZXNzaW9uSWQgIT09IHZvaWQgMCA/IF9tZXNzYWdlX3Nlc3Npb25JZCA6IFwiXCI7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IG1lc3NhZ2UudmVyc2lvbjtcbiAgICAgICAgICAgIGxldCBwb3N0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogbWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgICAgIFwic2Vzc2lvbklkXCI6IHNlc3Npb25JRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSW5zdGFuY2VzID0gdGhpcy5nZXRTZXJ2aWNlc0luc3RhbmNlcyhzZXNzaW9uSUQpO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50SWRlbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoKG1lc3NhZ2VbXCJ0eXBlXCJdKXtcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmZvcm1hdDpcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZUluc3RhbmNlcyA9IHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZUluc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dlIHdpbGwgdXNlIG9ubHkgZmlyc3Qgc2VydmljZSB0byBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBzZXJ2aWNlSW5zdGFuY2VzWzBdLmZvcm1hdChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUsIG1lc3NhZ2UuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmNvbXBsZXRlOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiY29tcGxldGlvblwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zOiBhd2FpdCBzZXJ2aWNlLmRvQ29tcGxldGUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLnNlcnZpY2VEYXRhLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpKS5maWx0ZXIobm90RW1wdHkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLnJlc29sdmVDb21wbGV0aW9uOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlTmFtZSA9IG1lc3NhZ2UudmFsdWUuc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VbXCJ2YWx1ZVwiXSA9IGF3YWl0ICgoX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQgPSB0aGlzLmZpbHRlckJ5RmVhdHVyZShzZXJ2aWNlSW5zdGFuY2VzLCBcImNvbXBsZXRpb25SZXNvbHZlXCIpLmZpbmQoKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5zZXJ2aWNlRGF0YS5jbGFzc05hbWUgPT09IHNlcnZpY2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXNfZmlsdGVyQnlGZWF0dXJlX2ZpbmQuZG9SZXNvbHZlKG1lc3NhZ2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5jaGFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0VmFsdWUoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmFwcGx5RGVsdGE6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuYXBwbHlEZWx0YXMoZG9jdW1lbnRJZGVudGlmaWVyLCBtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmhvdmVyOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiaG92ZXJcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZG9Ib3Zlcihkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihub3RFbXB0eSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUudmFsaWRhdGU6XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5pbml0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXM7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSAoX3RoaXMgPSBhd2FpdCB0aGlzLmFkZERvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpKSA9PT0gbnVsbCB8fCBfdGhpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMubWFwKChlbCk9PmVsLnNlcnZpY2VDYXBhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5jaGFuZ2VNb2RlOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMxO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKF90aGlzMSA9IGF3YWl0IHRoaXMuY2hhbmdlRG9jdW1lbnRNb2RlKGRvY3VtZW50SWRlbnRpZmllciwgbWVzc2FnZS52YWx1ZSwgbWVzc2FnZS5tb2RlLCBtZXNzYWdlLm9wdGlvbnMpKSA9PT0gbnVsbCB8fCBfdGhpczEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzMS5tYXAoKGVsKT0+ZWwuc2VydmljZUNhcGFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmNoYW5nZU9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2VJbnN0YW5jZXMuZm9yRWFjaCgoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2V0T3B0aW9ucyhzZXNzaW9uSUQsIG1lc3NhZ2Uub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBkb1ZhbGlkYXRpb24oZG9jdW1lbnRJZGVudGlmaWVyLCBzZXJ2aWNlSW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5kaXNwb3NlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50KGRvY3VtZW50SWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRvVmFsaWRhdGlvbihkb2N1bWVudElkZW50aWZpZXIsIHNlcnZpY2VJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLmdsb2JhbE9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R2xvYmFsT3B0aW9ucyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMsIG1lc3NhZ2UubWVyZ2UpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5jb25maWd1cmVGZWF0dXJlczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmVGZWF0dXJlcyhtZXNzYWdlLnNlcnZpY2VOYW1lLCBtZXNzYWdlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlVmFsaWRhdGlvbkZvclNlcnZpY2VJbnN0YW5jZShtZXNzYWdlLnNlcnZpY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5zaWduYXR1cmVIZWxwOlxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZVtcInZhbHVlXCJdID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwic2lnbmF0dXJlSGVscFwiKS5tYXAoYXN5bmMgKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5wcm92aWRlU2lnbmF0dXJlSGVscChkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihub3RFbXB0eSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuZG9jdW1lbnRIaWdobGlnaHQ6XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdobGlnaHRzID0gKGF3YWl0IFByb21pc2UuYWxsKHRoaXMuZmlsdGVyQnlGZWF0dXJlKHNlcnZpY2VJbnN0YW5jZXMsIFwiZG9jdW1lbnRIaWdobGlnaHRcIikubWFwKGFzeW5jIChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZmluZERvY3VtZW50SGlnaGxpZ2h0cyhkb2N1bWVudElkZW50aWZpZXIsIG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KSkpLmZpbHRlcihub3RFbXB0eSk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlW1widmFsdWVcIl0gPSBoaWdobGlnaHRzLmZsYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UocG9zdE1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTsiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJhIiwiaSIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiZGVmaW5pdGlvbiIsImtleSIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJvYmoiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJfX3dlYnBhY2tfZXhwb3J0c19fIiwiU2VydmljZU1hbmFnZXIiLCJtZXJnZU9iamVjdHMiLCJvYmoxIiwib2JqMiIsIm1lcmdlZE9iamVjdHMiLCJrZXlzIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0Iiwibm90RW1wdHkiLCJ1bmRlZmluZWQiLCJtZXJnZVJhbmdlcyIsInJhbmdlcyIsImxpc3QiLCJzb3J0IiwiYiIsImNvbXBhcmVQb2ludHMiLCJzdGFydCIsIm5leHQiLCJyYW5nZSIsImxlbmd0aCIsImNtcCIsImVuZCIsImlzRW1wdHkiLCJyb3ciLCJjb2x1bW4iLCJzcGxpY2UiLCJwMSIsInAyIiwiY2hlY2tWYWx1ZUFnYWluc3RSZWdleHBBcnJheSIsInJlZ2V4cEFycmF5IiwidGVzdCIsIl9kZWZpbmVfcHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIkJhc2VNZXNzYWdlIiwiY29uc3RydWN0b3IiLCJzZXNzaW9uSWQiLCJJbml0TWVzc2FnZSIsInZlcnNpb24iLCJtb2RlIiwib3B0aW9ucyIsIk1lc3NhZ2VUeXBlIiwiaW5pdCIsIkZvcm1hdE1lc3NhZ2UiLCJmb3JtYXQiLCJDb21wbGV0ZU1lc3NhZ2UiLCJjb21wbGV0ZSIsIlJlc29sdmVDb21wbGV0aW9uTWVzc2FnZSIsInJlc29sdmVDb21wbGV0aW9uIiwiSG92ZXJNZXNzYWdlIiwiaG92ZXIiLCJWYWxpZGF0ZU1lc3NhZ2UiLCJ2YWxpZGF0ZSIsIkNoYW5nZU1lc3NhZ2UiLCJjaGFuZ2UiLCJEZWx0YXNNZXNzYWdlIiwiYXBwbHlEZWx0YSIsIkNoYW5nZU1vZGVNZXNzYWdlIiwiY2hhbmdlTW9kZSIsIkNoYW5nZU9wdGlvbnNNZXNzYWdlIiwibWVyZ2UiLCJjaGFuZ2VPcHRpb25zIiwiRGlzcG9zZU1lc3NhZ2UiLCJkaXNwb3NlIiwiR2xvYmFsT3B0aW9uc01lc3NhZ2UiLCJzZXJ2aWNlTmFtZSIsImdsb2JhbE9wdGlvbnMiLCJDb25maWd1cmVGZWF0dXJlc01lc3NhZ2UiLCJjb25maWd1cmVGZWF0dXJlcyIsIlNpZ25hdHVyZUhlbHBNZXNzYWdlIiwic2lnbmF0dXJlSGVscCIsIkRvY3VtZW50SGlnaGxpZ2h0TWVzc2FnZSIsImRvY3VtZW50SGlnaGxpZ2h0Iiwic2VydmljZV9tYW5hZ2VyX2RlZmluZV9wcm9wZXJ0eSIsIiRpbml0U2VydmljZUluc3RhbmNlIiwic2VydmljZSIsInNlcnZpY2VJbnN0YW5jZSIsImNsYXNzTmFtZSIsIm1vZGVzIiwic2V0R2xvYmFsT3B0aW9ucyIsInNlcnZpY2VEYXRhIiwiJGdldFNlcnZpY2VzSW5zdGFuY2VzQnlNb2RlIiwic2VydmljZXMiLCJmaW5kU2VydmljZXNCeU1vZGUiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiJHNlcnZpY2VzIiwiYWRkRG9jdW1lbnQiLCJkb2N1bWVudElkZW50aWZpZXIiLCJkb2N1bWVudFZhbHVlIiwicmVwbGFjZSIsInNlcnZpY2VJbnN0YW5jZXMiLCJkb2N1bWVudEl0ZW0iLCJ1cmkiLCJsYW5ndWFnZUlkIiwidGV4dCIsImZvckVhY2giLCJlbCIsIiRzZXNzaW9uSURUb01vZGUiLCJjaGFuZ2VEb2N1bWVudE1vZGUiLCJyZW1vdmVEb2N1bWVudCIsImRvY3VtZW50IiwiZ2V0U2VydmljZXNJbnN0YW5jZXMiLCJzZXNzaW9uSUQiLCJmaWx0ZXIiLCJmaWx0ZXJCeUZlYXR1cmUiLCJmZWF0dXJlIiwiZmVhdHVyZXMiLCJ2YWx1ZXMiLCJleHRlbnNpb25zIiwic3BsaXQiLCJpbmNsdWRlcyIsInJlZ2lzdGVyU2VydmljZSIsIm5hbWUiLCJzZXREZWZhdWx0RmVhdHVyZXNTdGF0ZSIsInNlcnZpY2VGZWF0dXJlcyIsIl9mZWF0dXJlcyIsIl9mZWF0dXJlczEiLCJfZmVhdHVyZXMyIiwiX2ZlYXR1cmVzMyIsIl9mZWF0dXJlczQiLCJfZmVhdHVyZXM1IiwiX2ZlYXR1cmVzNiIsIl9ob3ZlciIsIl9jb21wbGV0aW9uIiwiY29tcGxldGlvbiIsIl9jb21wbGV0aW9uUmVzb2x2ZSIsImNvbXBsZXRpb25SZXNvbHZlIiwiX2Zvcm1hdCIsIl9kaWFnbm9zdGljcyIsImRpYWdub3N0aWNzIiwiX3NpZ25hdHVyZUhlbHAiLCJfZG9jdW1lbnRIaWdobGlnaHQiLCJjdHgiLCJkb1ZhbGlkYXRpb24iLCJzZXJ2aWNlc0luc3RhbmNlcyIsInNlc3Npb25JRExpc3QiLCJkb2N1bWVudHMiLCJwb3N0TWVzc2FnZSIsIl9yZWYiLCJmbGF0IiwicHJvdmlkZVZhbGlkYXRpb25Gb3JTZXJ2aWNlSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJtZXNzYWdlIiwiZGF0YSIsIl9tZXNzYWdlX3Nlc3Npb25JZCIsInR5cGUiLCJjb21wbGV0aW9ucyIsImRvQ29tcGxldGUiLCJfdGhpc19maWx0ZXJCeUZlYXR1cmVfZmluZCIsImZpbmQiLCJkb1Jlc29sdmUiLCJzZXRWYWx1ZSIsImFwcGx5RGVsdGFzIiwiZG9Ib3ZlciIsIl90aGlzIiwic2VydmljZUNhcGFiaWxpdGllcyIsIl90aGlzMSIsInNldE9wdGlvbnMiLCJwcm92aWRlU2lnbmF0dXJlSGVscCIsImhpZ2hsaWdodHMiLCJmaW5kRG9jdW1lbnRIaWdobGlnaHRzIl0sInNvdXJjZVJvb3QiOiIifQ==