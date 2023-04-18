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
class SignatureHelpMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 12 /* signatureHelp */;
    this.value = value;
  }
}
class DocumentHighlightMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
  constructor(sessionId, value) {
    super(sessionId);
    this.type = 13 /* documentHighlight */;
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
  MessageType2[MessageType2["signatureHelp"] = 12] = "signatureHelp";
  MessageType2[MessageType2["documentHighlight"] = 13] = "documentHighlight";
  return MessageType2;
})(MessageType || {});

;// CONCATENATED MODULE: ./services/service-manager.ts


class ServiceManager {
  constructor(ctx) {
    this.$services = {};
    this.$sessionIDToMode = {};
    let doValidation = (document, serviceInstance) => {
      serviceInstance != null ? serviceInstance : serviceInstance = this.getServiceInstance(document.uri);
      if (!serviceInstance)
        return;
      let postMessage = {
        "type": MessageType.validate
      };
      let sessionIDList = Object.keys(serviceInstance.documents);
      for (let sessionID of sessionIDList) {
        serviceInstance.doValidation({ uri: sessionID }).then((result) => {
          postMessage["sessionId"] = sessionID;
          postMessage["value"] = result;
          ctx.postMessage(postMessage);
        });
      }
    };
    ctx.addEventListener("message", async (ev) => {
      var _a;
      let message = ev.data;
      let sessionID = (_a = message.sessionId) != null ? _a : "";
      let version = message.version;
      let postMessage = {
        "type": message.type,
        "sessionId": sessionID
      };
      let serviceInstance = this.getServiceInstance(sessionID);
      let documentIdentifier = {
        uri: sessionID,
        version
      };
      switch (message["type"]) {
        case MessageType.format:
          postMessage["value"] = serviceInstance == null ? void 0 : serviceInstance.format(documentIdentifier, message.value, message.format);
          break;
        case MessageType.complete:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.doComplete(documentIdentifier, message.value));
          break;
        case MessageType.resolveCompletion:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.doResolve(message.value));
          break;
        case MessageType.change:
          serviceInstance == null ? void 0 : serviceInstance.setValue(documentIdentifier, message.value);
          doValidation(documentIdentifier, serviceInstance);
          break;
        case MessageType.applyDelta:
          serviceInstance == null ? void 0 : serviceInstance.applyDeltas(documentIdentifier, message.value);
          doValidation(documentIdentifier, serviceInstance);
          break;
        case MessageType.hover:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.doHover(documentIdentifier, message.value));
          break;
        case MessageType.validate:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.doValidation(documentIdentifier));
          break;
        case MessageType.init:
          await this.addDocument(documentIdentifier, message.value, message.mode, message.options);
          doValidation(documentIdentifier);
          break;
        case MessageType.changeMode:
          await this.changeDocumentMode(documentIdentifier, message.value, message.mode, message.options);
          doValidation(documentIdentifier, serviceInstance);
          break;
        case MessageType.changeOptions:
          serviceInstance == null ? void 0 : serviceInstance.setOptions(sessionID, message.options);
          doValidation(documentIdentifier, serviceInstance);
          break;
        case MessageType.dispose:
          this.removeDocument(documentIdentifier);
          break;
        case MessageType.globalOptions:
          serviceInstance = this.$services[message.serviceName].serviceInstance;
          this.setGlobalOptions(message.serviceName, message.options, message.merge);
          if (serviceInstance)
            doValidation(void 0, serviceInstance);
          break;
        case MessageType.signatureHelp:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.provideSignatureHelp(documentIdentifier, message.value));
          break;
        case MessageType.documentHighlight:
          postMessage["value"] = await (serviceInstance == null ? void 0 : serviceInstance.findDocumentHighlights(documentIdentifier, message.value));
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
  }
  async $getServiceInstanceByMode(mode) {
    let service = this.findServiceByMode(mode);
    if (!service)
      return;
    if (!service.serviceInstance)
      await ServiceManager.$initServiceInstance(service);
    return service.serviceInstance;
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
    let serviceInstance = await this.$getServiceInstanceByMode(mode);
    if (!serviceInstance)
      return;
    let documentItem = {
      uri: documentIdentifier.uri,
      version: documentIdentifier.version,
      languageId: mode,
      text: documentValue
    };
    serviceInstance.addDocument(documentItem);
    this.$sessionIDToMode[documentIdentifier.uri] = mode;
  }
  async changeDocumentMode(documentIdentifier, value, mode, options) {
    this.removeDocument(documentIdentifier);
    await this.addDocument(documentIdentifier, value, mode, options);
  }
  removeDocument(document) {
    let service = this.getServiceInstance(document.uri);
    if (service) {
      service.removeDocument(document);
      delete this.$sessionIDToMode[document.uri];
    }
  }
  getServiceInstance(sessionID) {
    let mode = this.$sessionIDToMode[sessionID];
    let service = this.findServiceByMode(mode);
    if (!mode || !(service == null ? void 0 : service.serviceInstance))
      return;
    return service.serviceInstance;
  }
  findServiceByMode(mode) {
    return Object.values(this.$services).find((el) => {
      let extensions = el.modes.split("|");
      if (extensions.includes(mode))
        return el;
    });
  }
  registerService(name, service) {
    this.$services[name] = service;
  }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});