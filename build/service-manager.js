(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
})(this, (function(exports2) {
  "use strict";
  function mergeObjects(obj1, obj2, excludeUndefined = false) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    if (excludeUndefined) {
      obj1 = excludeUndefinedValues(obj1);
      obj2 = excludeUndefinedValues(obj2);
    }
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
  function excludeUndefinedValues(obj) {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== void 0);
    return Object.fromEntries(filteredEntries);
  }
  function notEmpty(value) {
    return value !== null && value !== void 0;
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
    MessageType2[MessageType2["closeDocument"] = 10] = "closeDocument";
    MessageType2[MessageType2["globalOptions"] = 11] = "globalOptions";
    MessageType2[MessageType2["configureFeatures"] = 12] = "configureFeatures";
    MessageType2[MessageType2["signatureHelp"] = 13] = "signatureHelp";
    MessageType2[MessageType2["documentHighlight"] = 14] = "documentHighlight";
    MessageType2[MessageType2["closeConnection"] = 15] = "closeConnection";
    MessageType2[MessageType2["capabilitiesChange"] = 16] = "capabilitiesChange";
    MessageType2[MessageType2["getSemanticTokens"] = 17] = "getSemanticTokens";
    MessageType2[MessageType2["getCodeActions"] = 18] = "getCodeActions";
    MessageType2[MessageType2["executeCommand"] = 19] = "executeCommand";
    MessageType2[MessageType2["applyEdit"] = 20] = "applyEdit";
    MessageType2[MessageType2["appliedEdit"] = 21] = "appliedEdit";
    MessageType2[MessageType2["setWorkspace"] = 22] = "setWorkspace";
    MessageType2[MessageType2["renameDocument"] = 23] = "renameDocument";
    MessageType2[MessageType2["sendRequest"] = 24] = "sendRequest";
    MessageType2[MessageType2["showDocument"] = 25] = "showDocument";
    MessageType2[MessageType2["sendResponse"] = 26] = "sendResponse";
    MessageType2[MessageType2["inlineComplete"] = 27] = "inlineComplete";
    return MessageType2;
  })(MessageType || {});
  class ServiceManager {
    constructor(ctx) {
      this.$services = {};
      this.serviceInitPromises = {};
      this.$sessionIDToMode = {};
      this.ctx = ctx;
      let doValidation = async (document, servicesInstances) => {
        var _a;
        servicesInstances != null ? servicesInstances : servicesInstances = this.getServicesInstances(document.uri);
        if (servicesInstances.length === 0) {
          return;
        }
        let documentUrisList = Object.keys(servicesInstances[0].documents);
        servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
        servicesInstances = servicesInstances.filter((el) => {
          return el.serviceCapabilities.diagnosticProvider;
        });
        if (servicesInstances.length === 0) {
          return;
        }
        let postMessage = {
          "type": MessageType.validate
        };
        for (let documentUri of documentUrisList) {
          let diagnostics = (_a = await Promise.all(servicesInstances.map((el) => {
            return el.doValidation({ uri: documentUri });
          }))) != null ? _a : [];
          postMessage["documentUri"] = documentUri;
          postMessage["value"] = diagnostics.flat();
          ctx.postMessage(postMessage);
        }
      };
      let provideValidationForServiceInstance = async (serviceName) => {
        let service = this.$services[serviceName];
        if (!service)
          return;
        var serviceInstance = service.serviceInstance;
        if (serviceInstance)
          await doValidation(void 0, [serviceInstance]);
      };
      ctx.addEventListener("message", async (ev) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        let message = ev.data;
        let sessionID = (_a = message["sessionId"]) != null ? _a : "";
        let documentUri = (_b = message["documentUri"]) != null ? _b : "";
        let version = message["version"];
        let postMessage = {
          "type": message.type,
          "sessionId": sessionID,
          "callbackId": message["callbackId"]
        };
        let serviceInstances = this.getServicesInstances(documentUri);
        let documentIdentifier = {
          uri: documentUri,
          version
        };
        switch (message.type) {
          case MessageType.format:
            serviceInstances = this.filterByFeature(serviceInstances, "format");
            if (serviceInstances.length > 0) {
              postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
            }
            break;
          case MessageType.complete:
            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service) => {
              return {
                completions: await service.doComplete(documentIdentifier, message["value"]),
                service: service.serviceData.className
              };
            }))).filter(notEmpty);
            break;
          case MessageType.inlineComplete:
            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "inlineCompletion").map(async (service) => {
              return {
                completions: await service.doInlineComplete(documentIdentifier, message["value"]),
                service: service.serviceData.className
              };
            }))).filter(notEmpty);
            break;
          case MessageType.resolveCompletion:
            let serviceName = message.value["service"];
            postMessage["value"] = await ((_c = this.filterByFeature(serviceInstances, "completionResolve").find((service) => {
              if (service.serviceData.className === serviceName) {
                return service;
              }
            })) == null ? void 0 : _c.doResolve(message.value));
            break;
          case MessageType.change:
            serviceInstances.forEach((service) => {
              service.setValue(documentIdentifier, message["value"]);
            });
            await doValidation(documentIdentifier, serviceInstances);
            break;
          case MessageType.applyDelta:
            serviceInstances.forEach((service) => {
              service.applyDeltas(documentIdentifier, message["value"]);
            });
            await doValidation(documentIdentifier, serviceInstances);
            break;
          case MessageType.hover:
            postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "hover", "doHover", documentIdentifier, message.value);
            break;
          case MessageType.validate:
            postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
            break;
          case MessageType.init:
            postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.addDocument.bind(this));
            await doValidation(documentIdentifier);
            break;
          case MessageType.changeMode:
            postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.changeDocumentMode.bind(this));
            await doValidation(documentIdentifier);
            break;
          case MessageType.changeOptions:
            this.applyOptionsToServices(serviceInstances, documentUri, message.options);
            await doValidation(documentIdentifier, serviceInstances);
            break;
          case MessageType.closeDocument:
            this.removeDocument(documentIdentifier);
            await doValidation(documentIdentifier, serviceInstances);
            break;
          case MessageType.closeConnection:
            await this.closeAllConnections();
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
            postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "signatureHelp", "provideSignatureHelp", documentIdentifier, message.value);
            break;
          case MessageType.documentHighlight:
            let highlights = await this.aggregateFeatureResponses(serviceInstances, "documentHighlight", "findDocumentHighlights", documentIdentifier, message.value);
            postMessage["value"] = highlights.flat();
            break;
          case MessageType.getSemanticTokens:
            serviceInstances = this.filterByFeature(serviceInstances, "semanticTokens");
            if (serviceInstances.length > 0) {
              postMessage["value"] = await serviceInstances[0].getSemanticTokens(documentIdentifier, message.value);
            }
            break;
          case MessageType.getCodeActions:
            let value = message.value;
            let context = message.context;
            postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "codeAction").map(async (service) => {
              return {
                codeActions: await service.getCodeActions(documentIdentifier, value, context),
                service: service.serviceName
              };
            }))).filter(notEmpty);
            break;
          case MessageType.executeCommand:
            postMessage["value"] = (_e = (_d = this.$services[message.serviceName]) == null ? void 0 : _d.serviceInstance) == null ? void 0 : _e.executeCommand(message.value, message.args);
            break;
          case MessageType.appliedEdit:
            postMessage["value"] = (_g = (_f = this.$services[message.serviceName]) == null ? void 0 : _f.serviceInstance) == null ? void 0 : _g.sendAppliedResult(message.value, message.callbackId);
            break;
          case MessageType.setWorkspace:
            this.setWorkspace(message.value);
            break;
          case MessageType.renameDocument:
            this.renameDocument(documentIdentifier, message.value);
            break;
          case MessageType.sendRequest:
            postMessage["value"] = (_i = (_h = this.$services[message.serviceName]) == null ? void 0 : _h.serviceInstance) == null ? void 0 : _i.sendRequest(message.value, message.args);
            break;
          case MessageType.sendResponse:
            postMessage["value"] = (_k = (_j = this.$services[message.serviceName]) == null ? void 0 : _j.serviceInstance) == null ? void 0 : _k.sendResponse(message.callbackId, message.args);
            break;
        }
        ctx.postMessage(postMessage);
      });
    }
    async getServicesCapabilitiesAfterCallback(documentIdentifier, message, callback) {
      let services = await callback(documentIdentifier, message.value, message.mode, message.options);
      if (services) {
        return Object.keys(services).reduce((acc, key) => {
          var _a, _b;
          acc[key] = ((_b = (_a = services[key]) == null ? void 0 : _a.serviceInstance) == null ? void 0 : _b.serviceCapabilities) || null;
          return acc;
        }, {});
      }
    }
    async aggregateFeatureResponses(serviceInstances, feature, methodName, documentIdentifier, attrs) {
      return (await Promise.all(this.filterByFeature(serviceInstances, feature).map(async (service) => {
        if (Array.isArray(attrs)) {
          return service[methodName](documentIdentifier, ...attrs);
        } else {
          return service[methodName](documentIdentifier, attrs);
        }
      }))).filter(notEmpty);
    }
    applyOptionsToServices(serviceInstances, documentUri, options) {
      serviceInstances.forEach((service) => {
        service.setOptions(documentUri, options);
      });
    }
    async closeAllConnections() {
      var _a, _b;
      var services = this.$services;
      for (let serviceName in services) {
        await ((_b = (_a = services[serviceName]) == null ? void 0 : _a.serviceInstance) == null ? void 0 : _b.closeConnection());
      }
    }
    static async $initServiceInstance(service, ctx, workspaceUri) {
      var _a, _b;
      let module2;
      if ("type" in service) {
        if (["socket", "webworker"].includes(service.type)) {
          module2 = await service.module();
          service.serviceInstance = new module2["LanguageClient"](service, ctx, workspaceUri);
        } else
          throw "Unknown service type";
      } else {
        module2 = await service.module();
        service.serviceInstance = new module2[service.className](service.modes);
      }
      if (service.options || service.initializationOptions) {
        service.serviceInstance.setGlobalOptions((_b = (_a = service.options) != null ? _a : service.initializationOptions) != null ? _b : {});
      }
      service.serviceInstance.serviceData = service;
      return service.serviceInstance;
    }
    async $getServicesInstancesByMode(mode) {
      let services = this.findServicesByMode(mode);
      if (Object.keys(services).length === 0) {
        return [];
      }
      for (let serviceName in services) {
        await this.initializeService(serviceName);
      }
      return services;
    }
    async initializeService(serviceName) {
      let service = this.$services[serviceName];
      if (!service.serviceInstance) {
        if (!this.serviceInitPromises[service.id]) {
          this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx, this.workspaceUri).then((instance) => {
            service.serviceInstance = instance;
            service.serviceInstance.serviceName = serviceName;
            delete this.serviceInitPromises[service.id];
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
      if (!service)
        return;
      service.options = merge ? mergeObjects(options, service.options) : options;
      if (service.serviceInstance) {
        service.serviceInstance.setGlobalOptions(service.options);
      }
    }
    setWorkspace(workspaceUri) {
      this.workspaceUri = workspaceUri;
      Object.values(this.$services).forEach((service) => {
        var _a;
        (_a = service.serviceInstance) == null ? void 0 : _a.setWorkspace(this.workspaceUri);
      });
    }
    async addDocument(documentIdentifier, documentValue, mode, options) {
      if (!mode || !/^ace\/mode\//.test(mode))
        return;
      mode = mode.replace("ace/mode/", "");
      mode = mode.replace(/golang$/, "go");
      let services = await this.$getServicesInstancesByMode(mode);
      if (Object.keys(services).length === 0)
        return;
      let documentItem = {
        uri: documentIdentifier.uri,
        version: documentIdentifier.version,
        languageId: mode,
        text: documentValue
      };
      Object.values(services).forEach((el) => el.serviceInstance.addDocument(documentItem));
      this.$sessionIDToMode[documentIdentifier.uri] = mode;
      return services;
    }
    async renameDocument(documentIdentifier, newDocumentUri) {
      let services = this.getServicesInstances(documentIdentifier.uri);
      if (services.length > 0) {
        services.forEach((el) => el.renameDocument(documentIdentifier, newDocumentUri));
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
        services.forEach((el) => el.removeDocument(document));
        delete this.$sessionIDToMode[document.uri];
      }
    }
    getServicesInstances(documentUri) {
      let mode = this.$sessionIDToMode[documentUri];
      if (!mode)
        return [];
      let services = this.findServicesByMode(mode);
      return Object.values(services).map((el) => el.serviceInstance).filter(notEmpty);
    }
    /**
     * Finds and returns services that are compatible with the specified mode.
     *
     * @param {string} mode - The mode for which services should be found.
     * @return {Object} An object where the keys are service names and the values are either `ServiceConfig` or `LanguageClientConfig` for the services that match the specified mode.
     */
    findServicesByMode(mode) {
      let servicesWithName = {};
      Object.entries(this.$services).forEach(
        ([key, value]) => {
          let extensions = value.modes.split("|").map((m) => m.trim());
          if (extensions.includes(mode) || extensions.includes("*"))
            servicesWithName[key] = this.$services[key];
        }
      );
      return servicesWithName;
    }
    filterByFeature(serviceInstances, feature) {
      return serviceInstances.filter((el) => {
        var _a;
        if (!el.serviceData.features[feature]) {
          return false;
        }
        const capabilities = el.serviceCapabilities;
        switch (feature) {
          case "hover":
            return capabilities.hoverProvider == true;
          case "completion":
            return capabilities.completionProvider != void 0;
          case "completionResolve":
            return ((_a = capabilities.completionProvider) == null ? void 0 : _a.resolveProvider) === true;
          case "inlineCompletion":
            return capabilities.inlineCompletionProvider != void 0;
          case "format":
            return capabilities.documentRangeFormattingProvider == true || capabilities.documentFormattingProvider == true;
          case "diagnostics":
            return capabilities.diagnosticProvider != void 0;
          case "signatureHelp":
            return capabilities.signatureHelpProvider != void 0;
          case "documentHighlight":
            return capabilities.documentHighlightProvider == true;
          case "semanticTokens":
            return capabilities.semanticTokensProvider != void 0;
          case "codeAction":
            return capabilities.codeActionProvider != void 0;
          case "executeCommand":
            return capabilities.executeCommandProvider != void 0;
        }
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
      if (!this.$services[name])
        return;
      this.$services[name].features = features;
    }
    setDefaultFeaturesState(serviceFeatures) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      let features = serviceFeatures != null ? serviceFeatures : {};
      (_a = features.hover) != null ? _a : features.hover = true;
      (_b = features.completion) != null ? _b : features.completion = true;
      (_c = features.completionResolve) != null ? _c : features.completionResolve = true;
      (_d = features.format) != null ? _d : features.format = true;
      (_e = features.diagnostics) != null ? _e : features.diagnostics = true;
      (_f = features.signatureHelp) != null ? _f : features.signatureHelp = true;
      (_g = features.documentHighlight) != null ? _g : features.documentHighlight = true;
      (_h = features.semanticTokens) != null ? _h : features.semanticTokens = true;
      (_i = features.codeAction) != null ? _i : features.codeAction = true;
      (_j = features.executeCommand) != null ? _j : features.executeCommand = true;
      (_k = features.inlineCompletion) != null ? _k : features.inlineCompletion = true;
      return features;
    }
  }
  exports2.ServiceManager = ServiceManager;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
