(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ServiceManager": () => (/* binding */ ServiceManager)
});

;// CONCATENATED MODULE: ./utils.ts
function mergeObjects(obj1, obj2) {
  if (!obj1)
    return obj2;
  if (!obj2)
    return obj1;
  const mergedObjects = { ...obj2, ...obj1 };
  for (const key of Object.keys(mergedObjects)) {
    if (obj1[key] && obj2[key]) {
      if (Array.isArray(obj1[key])) {
        mergedObjects[key] = obj1[key].concat(obj2[key]);
      } else if (Array.isArray(obj2[key])) {
        mergedObjects[key] = obj2[key].concat(obj1[key]);
      } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
      }
    }
  }
  return mergedObjects;
}
function notEmpty(value) {
  return value !== null && value !== void 0;
}

;// CONCATENATED MODULE: ./message-types.ts
class BaseMessage {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }
}
class InitMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value, version, mode, options) {
    super(sessionId);
    this.type = 0 /* init */;
    this.version = version;
    this.options = options;
    this.mode = mode;
    this.value = value;
  }
}
class FormatMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value, format) {
    super(sessionId);
    this.type = 1 /* format */;
    this.value = value;
    this.format = format;
  }
}
class CompleteMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 2 /* complete */;
    this.value = value;
  }
}
class ResolveCompletionMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 3 /* resolveCompletion */;
    this.value = value;
  }
}
class HoverMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 5 /* hover */;
    this.value = value;
  }
}
class ValidateMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId) {
    super(sessionId);
    this.type = 6 /* validate */;
  }
}
class ChangeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value, version) {
    super(sessionId);
    this.type = 4 /* change */;
    this.value = value;
    this.version = version;
  }
}
class DeltasMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value, version) {
    super(sessionId);
    this.type = 7 /* applyDelta */;
    this.value = value;
    this.version = version;
  }
}
class ChangeModeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value, mode) {
    super(sessionId);
    this.type = 8 /* changeMode */;
    this.value = value;
    this.mode = mode;
  }
}
class ChangeOptionsMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, options, merge = false) {
    super(sessionId);
    this.type = 9 /* changeOptions */;
    this.options = options;
    this.merge = merge;
  }
}
class DisposeMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId) {
    super(sessionId);
    this.type = 10 /* dispose */;
  }
}
class GlobalOptionsMessage {
  constructor(serviceName, options, merge) {
    this.type = 11 /* globalOptions */;
    this.serviceName = serviceName;
    this.options = options;
    this.merge = merge;
  }
}
class ConfigureFeaturesMessage {
  constructor(serviceName, options) {
    this.type = 12 /* configureFeatures */;
    this.serviceName = serviceName;
    this.options = options;
  }
}
class SignatureHelpMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 13 /* signatureHelp */;
    this.value = value;
  }
}
class DocumentHighlightMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 14 /* documentHighlight */;
    this.value = value;
  }
}
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2[MessageType2["init"] = 0] = "init";
  MessageType2[MessageType2["format"] = 1] = "format";
  MessageType2[MessageType2["complete"] = 2] = "complete";
  MessageType2[MessageType2["resolveCompletion"] = 3] = "resolveCompletion";
  MessageType2[MessageType2["change"] = 4] = "change";
  MessageType2[MessageType2["hover"] = 5] = "hover";
  MessageType2[MessageType2["validate"] = 6] = "validate";
  MessageType2[MessageType2["applyDelta"] = 7] = "applyDelta";
  MessageType2[MessageType2["changeMode"] = 8] = "changeMode";
  MessageType2[MessageType2["changeOptions"] = 9] = "changeOptions";
  MessageType2[MessageType2["dispose"] = 10] = "dispose";
  MessageType2[MessageType2["globalOptions"] = 11] = "globalOptions";
  MessageType2[MessageType2["configureFeatures"] = 12] = "configureFeatures";
  MessageType2[MessageType2["signatureHelp"] = 13] = "signatureHelp";
  MessageType2[MessageType2["documentHighlight"] = 14] = "documentHighlight";
  return MessageType2;
})(MessageType || {});

;// CONCATENATED MODULE: ./services/service-manager.ts


class ServiceManager {
  constructor(ctx) {
    this.$services = {};
    this.$sessionIDToMode = {};
    let doValidation = async (document, servicesInstances) => {
      var _a;
      servicesInstances != null ? servicesInstances : servicesInstances = this.getServicesInstances(document.uri);
      if (servicesInstances.length === 0) {
        return;
      }
      let sessionIDList = Object.keys(servicesInstances[0].documents);
      servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
      let postMessage = {
        "type": MessageType.validate
      };
      for (let sessionID of sessionIDList) {
        let diagnostics = (_a = await Promise.all(servicesInstances.map((el) => {
          return el.doValidation({ uri: sessionID });
        }))) != null ? _a : [];
        postMessage["sessionId"] = sessionID;
        postMessage["value"] = diagnostics.flat();
        ctx.postMessage(postMessage);
      }
    };
    let provideValidationForServiceInstance = async (serviceName) => {
      var serviceInstance = this.$services[serviceName].serviceInstance;
      if (serviceInstance)
        await doValidation(void 0, [serviceInstance]);
    };
    ctx.addEventListener("message", async (ev) => {
      var _a, _b;
      let message = ev.data;
      let sessionID = (_a = message.sessionId) != null ? _a : "";
      let version = message.version;
      let postMessage = {
        "type": message.type,
        "sessionId": sessionID
      };
      let serviceInstances = this.getServicesInstances(sessionID);
      let documentIdentifier = {
        uri: sessionID,
        version
      };
      switch (message["type"]) {
        case MessageType.format:
          serviceInstances = this.filterByFeature(serviceInstances, "format");
          if (serviceInstances.length > 0) {
            postMessage["value"] = serviceInstances[0].format(documentIdentifier, message.value, message.format);
          }
          break;
        case MessageType.complete:
          postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service) => {
            return {
              completions: await service.doComplete(documentIdentifier, message.value),
              service: service.serviceData.className
            };
          }))).filter(notEmpty);
          break;
        case MessageType.resolveCompletion:
          let serviceName = message.value.service;
          postMessage["value"] = await ((_b = this.filterByFeature(serviceInstances, "completionResolve").find((service) => {
            if (service.serviceData.className === serviceName) {
              return service;
            }
          })) == null ? void 0 : _b.doResolve(message.value));
          break;
        case MessageType.change:
          serviceInstances.forEach((service) => {
            service.setValue(documentIdentifier, message.value);
          });
          await doValidation(documentIdentifier, serviceInstances);
          break;
        case MessageType.applyDelta:
          serviceInstances.forEach((service) => {
            service.applyDeltas(documentIdentifier, message.value);
          });
          await doValidation(documentIdentifier, serviceInstances);
          break;
        case MessageType.hover:
          postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "hover").map(async (service) => {
            return service.doHover(documentIdentifier, message.value);
          }))).filter(notEmpty);
          break;
        case MessageType.validate:
          postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
          break;
        case MessageType.init:
          await this.addDocument(documentIdentifier, message.value, message.mode, message.options);
          await doValidation(documentIdentifier);
          break;
        case MessageType.changeMode:
          await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options);
          await doValidation(documentIdentifier, serviceInstances);
          break;
        case MessageType.changeOptions:
          serviceInstances.forEach((service) => {
            service.setOptions(sessionID, message.options);
          });
          await doValidation(documentIdentifier, serviceInstances);
          break;
        case MessageType.dispose:
          this.removeDocument(documentIdentifier);
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
          postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "signatureHelp").map(async (service) => {
            return service.provideSignatureHelp(documentIdentifier, message.value);
          }))).filter(notEmpty);
          break;
        case MessageType.documentHighlight:
          let highlights = (await Promise.all(this.filterByFeature(serviceInstances, "documentHighlight").map(async (service) => {
            return service.findDocumentHighlights(documentIdentifier, message.value);
          }))).filter(notEmpty);
          postMessage["value"] = highlights.flat();
          break;
      }
      ctx.postMessage(postMessage);
    });
  }
  static async $initServiceInstance(service) {
    let module = await service.module();
    service.serviceInstance = new module[service.className](service.modes);
    if (service.options)
      service.serviceInstance.setGlobalOptions(service.options);
    service.serviceInstance.serviceData = service;
    return service.serviceInstance;
  }
  async $getServicesInstancesByMode(mode) {
    let services = this.findServicesByMode(mode);
    if (services.length === 0) {
      return [];
    }
    return Promise.all(services.map(async (service) => {
      if (!service.serviceInstance) {
        return await ServiceManager.$initServiceInstance(service);
      } else {
        return service.serviceInstance;
      }
    }));
  }
  setGlobalOptions(serviceName, options, merge = false) {
    let service = this.$services[serviceName];
    if (!service)
      return;
    service.options = merge ? mergeObjects(options, service.options) : options;
    if (service.serviceInstance) {
      service.serviceInstance.setGlobalOptions(service.options);
    }
  }
  async addDocument(documentIdentifier, documentValue, mode, options) {
    if (!mode || !/^ace\/mode\//.test(mode))
      return;
    mode = mode.replace("ace/mode/", "");
    let serviceInstances = await this.$getServicesInstancesByMode(mode);
    if (serviceInstances.length === 0)
      return;
    let documentItem = {
      uri: documentIdentifier.uri,
      version: documentIdentifier.version,
      languageId: mode,
      text: documentValue
    };
    serviceInstances.forEach((el) => el.addDocument(documentItem));
    this.$sessionIDToMode[documentIdentifier.uri] = mode;
  }
  async changeDocumentMode(documentIdentifier, value, mode, options) {
    this.removeDocument(documentIdentifier);
    await this.addDocument(documentIdentifier, value, mode, options);
  }
  removeDocument(document) {
    let services = this.getServicesInstances(document.uri);
    if (services.length > 0) {
      services.forEach((el) => el.removeDocument(document));
      delete this.$sessionIDToMode[document.uri];
    }
  }
  getServicesInstances(sessionID) {
    let mode = this.$sessionIDToMode[sessionID];
    if (!mode)
      return [];
    let services = this.findServicesByMode(mode);
    return services.map((el) => el.serviceInstance).filter(notEmpty);
  }
  filterByFeature(serviceInstances, feature) {
    return serviceInstances.filter((el) => el.serviceData.features[feature] === true);
  }
  findServicesByMode(mode) {
    return Object.values(this.$services).filter((el) => {
      let extensions = el.modes.split("|");
      if (extensions.includes(mode))
        return el;
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
    var _a, _b, _c, _d, _e, _f, _g;
    let features = serviceFeatures != null ? serviceFeatures : {};
    (_a = features.hover) != null ? _a : features.hover = true;
    (_b = features.completion) != null ? _b : features.completion = true;
    (_c = features.completionResolve) != null ? _c : features.completionResolve = true;
    (_d = features.format) != null ? _d : features.format = true;
    (_e = features.diagnostics) != null ? _e : features.diagnostics = true;
    (_f = features.signatureHelp) != null ? _f : features.signatureHelp = true;
    (_g = features.documentHighlight) != null ? _g : features.documentHighlight = true;
    return features;
  }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});