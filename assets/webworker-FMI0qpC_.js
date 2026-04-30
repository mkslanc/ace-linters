//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region packages/ace-spell-check/build/esm-dicts-resolver.js
var import_service_manager = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global));
	})(exports, function(exports$1) {
		Object.defineProperty(exports$1, Symbol.toStringTag, { value: "Module" });
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
			};
			for (const key of Object.keys(mergedObjects)) if (obj1[key] && obj2[key]) {
				if (Array.isArray(obj1[key])) mergedObjects[key] = obj1[key].concat(obj2[key]);
				else if (Array.isArray(obj2[key])) mergedObjects[key] = obj2[key].concat(obj1[key]);
				else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
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
		var MessageType = /* @__PURE__ */ function(MessageType) {
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
			return MessageType;
		}({});
		exports$1.ServiceManager = class ServiceManager {
			constructor(ctx) {
				this.$services = {};
				this.serviceInitPromises = {};
				this.$sessionIDToMode = {};
				this.ctx = ctx;
				let doValidation = async (document, servicesInstances) => {
					servicesInstances ??= this.getServicesInstances(document.uri);
					if (servicesInstances.length === 0) return;
					let documentUrisList = Object.keys(servicesInstances[0].documents);
					servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
					servicesInstances = servicesInstances.filter((el) => {
						return el.serviceCapabilities.diagnosticProvider;
					});
					if (servicesInstances.length === 0) return;
					let postMessage = { "type": MessageType.validate };
					for (let documentUri of documentUrisList) {
						let diagnostics = await Promise.all(servicesInstances.map((el) => {
							return el.doValidation({ uri: documentUri });
						})) ?? [];
						postMessage["documentUri"] = documentUri;
						postMessage["value"] = diagnostics.flat();
						ctx.postMessage(postMessage);
					}
				};
				let provideValidationForServiceInstance = async (serviceName) => {
					let service = this.$services[serviceName];
					if (!service) return;
					var serviceInstance = service.serviceInstance;
					if (serviceInstance) await doValidation(void 0, [serviceInstance]);
				};
				ctx.addEventListener("message", async (ev) => {
					let message = ev.data;
					let sessionID = message["sessionId"] ?? "";
					let documentUri = message["documentUri"] ?? "";
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
							if (serviceInstances.length > 0) postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
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
							postMessage["value"] = await this.filterByFeature(serviceInstances, "completionResolve").find((service) => {
								if (service.serviceData.className === serviceName) return service;
							})?.doResolve(message.value);
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
							postMessage["value"] = (await this.aggregateFeatureResponses(serviceInstances, "documentHighlight", "findDocumentHighlights", documentIdentifier, message.value)).flat();
							break;
						case MessageType.getSemanticTokens:
							serviceInstances = this.filterByFeature(serviceInstances, "semanticTokens");
							if (serviceInstances.length > 0) postMessage["value"] = await serviceInstances[0].getSemanticTokens(documentIdentifier, message.value);
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
							postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.executeCommand(message.value, message.args);
							break;
						case MessageType.appliedEdit:
							postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendAppliedResult(message.value, message.callbackId);
							break;
						case MessageType.setWorkspace:
							this.setWorkspace(message.value);
							break;
						case MessageType.renameDocument:
							this.renameDocument(documentIdentifier, message.value);
							break;
						case MessageType.sendRequest:
							postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendRequest(message.value, message.args);
							break;
						case MessageType.sendResponse:
							postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendResponse(message.callbackId, message.args);
							break;
					}
					ctx.postMessage(postMessage);
				});
			}
			async getServicesCapabilitiesAfterCallback(documentIdentifier, message, callback) {
				let services = await callback(documentIdentifier, message.value, message.mode, message.options);
				if (services) return Object.keys(services).reduce((acc, key) => {
					acc[key] = services[key]?.serviceInstance?.serviceCapabilities || null;
					return acc;
				}, {});
			}
			async aggregateFeatureResponses(serviceInstances, feature, methodName, documentIdentifier, attrs) {
				return (await Promise.all(this.filterByFeature(serviceInstances, feature).map(async (service) => {
					if (Array.isArray(attrs)) return service[methodName](documentIdentifier, ...attrs);
					else return service[methodName](documentIdentifier, attrs);
				}))).filter(notEmpty);
			}
			applyOptionsToServices(serviceInstances, documentUri, options) {
				serviceInstances.forEach((service) => {
					service.setOptions(documentUri, options);
				});
			}
			async closeAllConnections() {
				var services = this.$services;
				for (let serviceName in services) await services[serviceName]?.serviceInstance?.closeConnection();
			}
			static async $initServiceInstance(service, ctx, workspaceUri) {
				let module$1;
				if ("type" in service) if (["socket", "webworker"].includes(service.type)) {
					module$1 = await service.module();
					service.serviceInstance = new module$1["LanguageClient"](service, ctx, workspaceUri);
				} else throw "Unknown service type";
				else {
					module$1 = await service.module();
					service.serviceInstance = new module$1[service.className](service.modes);
				}
				if (service.options || service.initializationOptions) service.serviceInstance.setGlobalOptions(service.options ?? service.initializationOptions ?? {});
				service.serviceInstance.serviceData = service;
				return service.serviceInstance;
			}
			async $getServicesInstancesByMode(mode) {
				let services = this.findServicesByMode(mode);
				if (Object.keys(services).length === 0) return [];
				for (let serviceName in services) await this.initializeService(serviceName);
				return services;
			}
			async initializeService(serviceName) {
				let service = this.$services[serviceName];
				if (!service.serviceInstance) {
					if (!this.serviceInitPromises[service.id]) this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx, this.workspaceUri).then((instance) => {
						service.serviceInstance = instance;
						service.serviceInstance.serviceName = serviceName;
						delete this.serviceInitPromises[service.id];
						return instance;
					});
					return this.serviceInitPromises[service.id];
				} else {
					if (!service.serviceInstance.serviceName) service.serviceInstance.serviceName = serviceName;
					return service.serviceInstance;
				}
			}
			setGlobalOptions(serviceName, options, merge = false) {
				let service = this.$services[serviceName];
				if (!service) return;
				service.options = merge ? mergeObjects(options, service.options) : options;
				if (service.serviceInstance) service.serviceInstance.setGlobalOptions(service.options);
			}
			setWorkspace(workspaceUri) {
				this.workspaceUri = workspaceUri;
				Object.values(this.$services).forEach((service) => {
					service.serviceInstance?.setWorkspace(this.workspaceUri);
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
				if (!mode) return [];
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
				Object.entries(this.$services).forEach(([key, value]) => {
					let extensions = value.modes.split("|").map((m) => m.trim());
					if (extensions.includes(mode) || extensions.includes("*")) servicesWithName[key] = this.$services[key];
				});
				return servicesWithName;
			}
			filterByFeature(serviceInstances, feature) {
				return serviceInstances.filter((el) => {
					if (!el.serviceData.features[feature]) return false;
					const capabilities = el.serviceCapabilities;
					switch (feature) {
						case "hover": return capabilities.hoverProvider == true;
						case "completion": return capabilities.completionProvider != void 0;
						case "completionResolve": return capabilities.completionProvider?.resolveProvider === true;
						case "inlineCompletion": return capabilities.inlineCompletionProvider != void 0;
						case "format": return capabilities.documentRangeFormattingProvider == true || capabilities.documentFormattingProvider == true;
						case "diagnostics": return capabilities.diagnosticProvider != void 0;
						case "signatureHelp": return capabilities.signatureHelpProvider != void 0;
						case "documentHighlight": return capabilities.documentHighlightProvider == true;
						case "semanticTokens": return capabilities.semanticTokensProvider != void 0;
						case "codeAction": return capabilities.codeActionProvider != void 0;
						case "executeCommand": return capabilities.executeCommandProvider != void 0;
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
				if (!this.$services[name]) return;
				this.$services[name].features = features;
			}
			setDefaultFeaturesState(serviceFeatures) {
				let features = serviceFeatures ?? {};
				features.hover ??= true;
				features.completion ??= true;
				features.completionResolve ??= true;
				features.format ??= true;
				features.diagnostics ??= true;
				features.signatureHelp ??= true;
				features.documentHighlight ??= true;
				features.semanticTokens ??= true;
				features.codeAction ??= true;
				features.executeCommand ??= true;
				features.inlineCompletion ??= true;
				return features;
			}
		};
	});
})))();
const dictAssetUrlsByPackage = {
	"@cspell/dict-ada": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWFkYSIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWFkYS9kaWN0L2FkYS50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZpYjNKMENtRmljd3BoWW5OMGNtRmpkQXBoWTJObGNIUUtZV05qWlhOekNtRnNhV0Z6WldRS1lXeHNDbUZ1WkFwaGNuSmhlUXBoZEFwaVpXZHBiZ3BpYjJSNUNtTmhjMlVLWTI5dWMzUmhiblFLWkdWamJHRnlaUXBrWld4aGVRcGtaV3gwWVFwa2FXZHBkSE1LWkc4S1pXeHpaUXBsYkhOcFpncGxibVFLWlc1MGNua0taWGhqWlhCMGFXOXVDbVY0YVhRS1ptOXlDbVoxYm1OMGFXOXVDbWRsYm1WeWFXTUtaMjkwYndwcFpncHBiZ3BwYm5SbGNtWmhZMlVLYVhNS2JHbHRhWFJsWkFwc2IyOXdDbTF2WkFwdVpYY0tibTkwQ201MWJHd0tiMllLYjNJS2IzUm9aWEp6Q205MWRBcHZkbVZ5Y21sa2FXNW5DbkJoWTJ0aFoyVUtjSEpoWjIxaENuQnlhWFpoZEdVS2NISnZZMlZrZFhKbENuQnliM1JsWTNSbFpBcHlZV2x6WlFweVlXNW5aUXB5WldOdmNtUUtjbVZ0Q25KbGJtRnRaWE1LY21WeGRXVjFaUXB5WlhSMWNtNEtjbVYyWlhKelpRcHpaV3hsWTNRS2MyVndZWEpoZEdVS2MzVmlkSGx3WlFwemVXNWphSEp2Ym1sNlpXUUtkR0ZuWjJWa0NuUmhjMnNLZEdWeWJXbHVZWFJsQ25Sb1pXNEtkSGx3WlFwMWJuUnBiQXAxYzJVS2QyaGxiZ3AzYUdsc1pRcDNhWFJvQ25odmNnbz0iXV19", "" + import.meta.url).href,
	"@cspell/dict-al": new URL("" + new URL("cspell-dict-al-CHcu4YDi.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-aws": new URL("" + new URL("cspell-dict-aws-BTaFXHpF.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-companies": new URL("" + new URL("cspell-dict-companies-Btetxmvn.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-cpp": new URL("" + new URL("cspell-dict-cpp-DmYswhrl.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-cryptocurrencies": new URL("" + new URL("cspell-dict-cryptocurrencies-BxUJ1P3V.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-csharp": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWNzaGFycCIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWNzaGFycC9kaWN0L2NzaGFycC50eHQuZ3oiLCJINHNJQUFBQUFBQUFBejFUVzVLY01Bejg3MU5zVmI3M0FybU5zQVZvUjdhSUxETkRUcDhTczlrcTZHNWpJZXRsL1BvbzQyRFZ6ekRUOGZ2andYeDhGaHI4MGUxekhDb0IwRExDcVFTb1ZwQUtEZHhQNFY2bGI2Qng5UUo2a2dRV0dvekZUTEU0MHdQTFZPWEFjZ1dqSUIyalVKUWRaU2RIMmJrOHVMNTV6SWFpTkViaVRFT3JDWDNFRzUyazN6S2tUMFp4WGxHNVNDTkY1WldtUnJKMFJtWGxqU0xGVDVncFhZNFE2NmlHYW5OUlJyMDZOU2xnbFJXc2c1SG1hNkx6bHJiY1p3TzdtNE5QN2dGK1VUdVV3YS9DYjNmOE9sU0s1RmF3ZDZ5VWpsWlI3dFJTZEZLOXNNcUxLMVkxQ3F6bStUS1ZIYXRidzhhZFhRbzJEbXhxQ3lrMkM4UG1OZy9zbWF5c2tQWjlrblJJTHpvclEvck9MbEd0SUFza1BkaFhLdnhXblRTRlFRWWt1T0hMcEVPcGIwL3ppdXlPWnNsVVJ0eXdNMVYycUpVSDFQcUd4ckZiUmJNcXE3RGp6aW5CMXB2R2tZZDFmcUxuK2QyaVQxWDBlYS9lc2kzc3NPV0xTOEFPZGdwem1GZjI1WUxOZ0ozc0xwVnhrTk1ON1kyWitDMUdVZ2dwRG9vZGg5UFdDSWZMbVkwKzNJSkxjTVV4RjVXQ1A1UDlnak5WNjVwaXhYZERuUnY1WXlUYnlYQ082ZjJiQnNZOXE0Tkp1V0p3U2lZZGhzR2EwUThPak4wOE1PUnZsbUFFbFFlcFdra1prdVE1Y0NOODVnK3pOZklMNHlrNStFRTVka0hiblVXd044UXVBN0c3UFJFK0dlRVg0anI0Qmx0dmVsZmtSMlU2ZDMzbjNhTFovMStsMld0dTlVYWR0bnM5YUdYTWQ4aHpaR0FuNldTYzVEakZZNUxpTktrNFRTbEVHVS95bm5iUG5aM3gzUFBiSmF3Vi93QU56WDFWTUFRQUFBPT0iXV19", "" + import.meta.url).href,
	"@cspell/dict-css": new URL("" + new URL("cspell-dict-css-PTzVT1KX.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-dart": new URL("" + new URL("cspell-dict-dart-BIkrTka3.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-data-science": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWRhdGEtc2NpZW5jZSIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWRhdGEtc2NpZW5jZS9kaWN0L2RhdGEtc2NpZW5jZS1tb2RlbHMudHh0IiwiQ2lNZ1kzTndaV3hzTFhSdmIyeHpPaUJyWldWd0xXTmhjMlVnYm04dGMzQnNhWFFLQ2tKcFowSnBjbVFLUTI5a1pXeHNZVzFoQ2tOdlpHVnpkSEpoYkFwTlpYUmhiR3hoYldFSyJdLFsiL19fY3NwZWxsX3Zmcy9AY3NwZWxsL2RpY3QtZGF0YS1zY2llbmNlL2RpY3QvZGF0YS1zY2llbmNlLXRvb2xzLnR4dCIsIkNpTWdZM053Wld4c0xYUnZiMnh6T2lCclpXVndMV05oYzJVZ2JtOHRjM0JzYVhRS0NrUmhkR0ZpY21samEzTUtSR1ZsY0VWMllXd0tTR0ZrYjI5d0NreGhibWREYUdGcGJncE1ZVzVuUjNKaGNHZ0tVSGwwYjNKamFBcFRkR0YwWVFwelpXRmliM0p1Q2c9PSJdLFsiL19fY3NwZWxsX3Zmcy9AY3NwZWxsL2RpY3QtZGF0YS1zY2llbmNlL2RpY3QvZGF0YS1zY2llbmNlLnR4dCIsIkNpTWdZM053Wld4c0xYUnZiMnh6T2lCclpXVndMV05oYzJVZ2JtOHRjM0JzYVhRS0NpNWhjbUZ1WjJVS0xuUnZjR3NLTG5SeFpHMEtRVWxIUXdwQlVrbE5RUXBCYkdWNFlRcEJiSEJoQ2tGc2NHaGhSbTlzWkFwQmJuUm9jbTl3YVdOekNrRjFkRzlsYm1OdlpHVnlDa0pNVDA5TlRFMEtRa3hQVDAxU1RRcENhV2RUWTJsbGJtTmxDa0pwYm1GeWFYcGhkR2x2YmdwQ2IyOXJRMjl5Y0hWekNrSjFkSFJsY25kdmNuUm9Da05EVUVFS1EwbEdRVklLUTB0UVZBcERURVZXVWdwRFRsUkxDa05oWm1abENrTm9aV0o1YzJobGRncERiMjUyTVdRS1EyOXVkbTVrQ2tSQlRFd3RSUXBFUVV4TVJRcEVVMU5OQ2tSVFZrRkZDa1JoYUc5aGN3cEVZWFJoUm5KaGJXVUtSR0YwWVVaeVlXMWxjd3BFWVhSaGJHOWhaR1Z5Y3dwRlkyOXNhVzVuZFdsemRHbGpjd3BHVTBSUUNrWnNaWGhtYkc5M0NrZFFWRkVLU0dGa1lXMWhjbVFLU0c5bFptWmthVzVuQ2toNWNHVnlZM1ZpYjJsa2N3cExZV3h0WVc0S1RFRlVUUXBNVEUwS1RGTlVUUXBNYVc1bFlYSnBlbWx1WndwTlFWQkZDazFKVFVRS1RVbFRSQXBOVGtsVFZBcE5aWFJoZG1WeWMyVUtUVzlGYkdGNVpYSUtUWGhPWlhRS1RrUkRSd3BPVmt4QlRVSUtUbVYxY21Gc1lXNW5aV3h2Q2s1bGRYSnZMVk41YldKdmJHbGpDazU1Y1hWcGMzUUtUMGhNUXdwUFRrNVlDazkyWlhKbWFYUjBhVzVuQ2xCUFEwbEVDbEJ2YkhsaGF3cFNUVk5GQ2xOQlVrbE5RUXBUUVZKSlRVRllDbE5CVkVFS1UwbE5SQXBUU1ZORUNsTk1WVkpOQ2xOUFZFRUtVMUJOUkFwVFkyaDFjZ3BUZFdKc2FXNWxZWElLVkdsdGJRcFVkWFJsYkFwVmJtbEZkbUZzQ2xaTVRVOEtWMEZKUXdwWGFXUmxibVYwQ21GaWMzUnlZV04wYVhabENtRmpZM1VLWVdSaFozSmhaQXBoWkdGd2RHRjBhWFpsQ21Ga1pHTmthWFlLWVdSa1kyMTFiQXBoWkdSdGJRcGhiR2RpZHdwaGJHeG5ZWFJvWlhJS1lXeHNjbVZrZFdObENtRnRjMmR5WVdRS1lXNWhiSGx6WlFwaGJtOXVlVzFwZW1GMGFXOXVDbUZ3Y0d4NWJXRndDbUZ5WjIxaGVBcGhjbWR0YVc0S1lYSm5jR0Z5YzJVS1lYSm5jMjl5ZEFwaGMyRnljbUY1Q21GelpuSmxjUXBoYzI5bUNtRjBhVzhLWVhSdlpncGhkRzlzQ21GMWRHOWphSFZ1YXdwaGRYUnZaRzlqY3dwaGRYUnZaM0poWkFwaGRYUnZjbVZuY21WemMybHZiZ3BoZFhSdmNtVm5jbVZ6YzJsMlpRcGhkWFJ2ZEhWdVpYSUtZWFYwYjNSMWJtbHVad3BpWVdOcmIyWm1DbUpoY21nS1ltRjBZMmh1YjNKdENtSmhkR05vYzJsNlpRcGlabWxzYkFwaVpteHZZWFFLWW1saWRHVjRDbUpwWjJKcGNtUUtZbWx1WVhKcGVtVmtDbUpwYm1GeWFYcGxjZ3BpYjI5c2N3cGliM1IwYjIxckNtSnliM1JzYVdONUNtSjBlWEJsQ21KMVkydGxkR2w2WlhNS1luVnpZbmNLWTJGcGRBcGphR0YwWW05MGN3cGphR1ZqYTNCdmFXNTBhVzVuQ21OdFpITUtZMjFwYTJWb0NtTnVZbU1LWTI5bFpncGpiMmx1YjNJS1kyOXNZV0lLWTI5dWMzUmxlSEJ5Q21OdmJuWnZiSFYwYVc5dVlXd0tZMjl1ZG05c2RYUnBiMjVoYkd4NUNtTnZjR0VLWTI5eFlRcGpiM0p5ZDJsMGFBcGpiM1Z5YzJWeVlRcGpjSFZoWkdGdENtTjFZbXhoY3dwamRXUmhDbU4xYlcxaGVBcGpkVzF3Y205a0NtTjFiWE4xYlFwa1lYSnJaM0pwWkFwa1lYUmhjMlYwY3dwa1lYWnBibU5wQ21SbFlXeHNiMk5oZEdsdVp3cGtaV1Z3Wm5WemFXOXVDbVJsY1hWaGJuUnBlbUYwYVc5dUNtUmxjWFZoYm5ScGVtVUtaR2x6WTNKbGRHbDZhVzVuQ21SeWIzQnNaWFpsYkFwa2NtOXdibUVLWkhSNWNHVUtaSFI1Y0dWekNtVnBaMlZ1Q21WcGJuTjFiUXBsYkdsbUNtVnVaMkZuYVc1bmJtVnpjd3BsYm5kcGF3cGxlSEJzWVdsdVlXSnBiR2wwZVFwbVlYTjBZV2tLWm1GemRHUjBkd3BtWldWa1ptOXlkMkZ5WkFwbVptbHNiQXBtYVd4c2JtRUtabWxzZEdacGJIUUtabWx1WlhSMWJtVUtabWx1WlhSMWJtVmtDbVp5YjIxaGNuSmhlWE1LWjJGMGFXNW5jd3BuYkc5eWIzUUtaM0poYm5Wc1lYSnBkR2xsY3dwbmNtOTFibVJsWkc1bGMzTUthR1Y0WW1sdUNtaDVjR1Z5Y0dGeVlXMWxkR1Z5Y3dwb2VYQmxjbk5qWVd4bENtbGtaV3gwWVFwcFpIaHRZWGdLYVdSNGJXbHVDbWxzYjJNS2FXNWpiSFZ6YVhacGRIa0thVzVtY3dwcGJuUmxjbkJ5WlhSaFltbHNhWFI1Q21sdWRuTjBaQXBwYm5aMllYSUthWEZ5Q21semFXNEthWE51WVFwcGRHVnljbTkzY3dwcGRHVnlkRzl2YkhNS2FYUmxjblIxY0d4bGN3cHNZWGxsY21SeWIzQUtiR1ZoWkdWeVltOWhjbVFLYkdsdGFYUnJDbXhwYm1WdWIzTUtiR2x1YzNCaFkyVUtiRzluYVhRS2JHOW5hWFJ6Q214dlozQnliMklLYkc5bmNISnZZbk1LYkc5bmMyOW1kRzFoZUFwc2IyZHpkVzFsZUhBS2JXRjBhR05oYkFwdFpYTm9aM0pwWkFwdGFXTnliMkpoZEdOb0NtMXZaR1ZzYVc1bmNISmxiRzRLYm1OdmJITUtibVJoY25KaGVRcHVaR2x0Q201dmJpMXpkV0pzYVdObGJuTmhZbXhsQ201dmJteHBibVZoY214NUNtNXZkR2x0WlhOMFlXMXdjd3B1YjNSdVlRcHVjbTkzY3dwdWRXMWxiQXB1ZFcxd2VRcHVkVzVwY1hWbENtNTJZMk1LYjI1bFkyTnNDbTl3Wlc1cFlncHZjR1Z5WVhScGIyNWhiR2w2WVhScGIyNEtiM1YwYkdsbGNuTnJDbkJoWTIxaGJncHdZWEpoYkd4bGJHbDZZV0pzWlFwd1pYSmpaWEIwY205dUNuQmxjbU5vWVc1dVpXd0tjSEpsYkc0S2NISmxkSEpoYVc0S2NISmxkSEpoYVc1bFpBcHdjbTlpY3dwd2NtOWtkV04wQ25CeWRXNWxZV0pzWlFweVlXNWthVzUwQ25Ka2FYWUtjbVZwYm1sMGFXRnNhWHBoZEdsdmJncHlaV3gxQ25Kc2FHWUtjbTkzY0hSeUNuSnpjWEowQ25KemRHUUtjbk4xWWdwelpXRnlZMmh6YjNKMFpXUUtjMmxuYlc5cFpBcHphMmx3Y205M2N3cHphMnhsWVhKdUNuTnZablJ0WVhnS2MzQnRZWFJ5YVhnS2MzUnlhV1JsWkFwemRYQmxjbkJ2WkFwemQyRndZWGhsY3dwemQyRndiR1YyWld3S2MzbHVaWEpuYVhwcGJtY0tkR1Z5WVFwMFptbHljM1FLZEdscmRHOXJaVzRLZEdsdFpXWnlZVzFsQ25Sc1lYTjBDblJ0YVc0S2RHOXJaVzVwZW1WeWN3cDBiM0JyQ25SdmNtTm9jblZ1Q25SeVlXNXpabTl5YldGMGFYWmxDblJ5WVc1elptOXliV1Z5Y3dwMWJtTnZiblJwWjNWdmRYTUtkVzV6Y1hWbFpYcGxDblZ3YzJGdGNHeGxDblZ3YzJOaGJHbHVad3AxYzJWamIyeHpDbloxYkd0aGJncDNZWEp0ZFhCbFpBcDRZWGhwY3dwNGJHRnlaMlVLZVdGNGFYTUtlV2hoZEFwNmMyTnZjbVZ6Q2c9PSJdXX0=", "" + import.meta.url).href,
	"@cspell/dict-django": new URL("" + new URL("cspell-dict-django-DN2Qb2v8.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-docker": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWRvY2tlciIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWRvY2tlci9kaWN0L2RvY2tlci13b3Jkcy50eHQuZ3oiLCJINHNJQUFBQUFBQUFBMDJRd1pMaUlCaUU3LzBVVnUzWkY1Z2JKb3hKbVlRVVFYZm5pSUNSR29RVTRHak4wMCt0dU5aZS92NzY5SGMzZnExVVdveHo2eHlDUzIrclQyT1d0WkxKckh4WXA4WFpESkM2QnVGYmJQWnRWeE5lTllWMnJTakFwcUpqUjhRNzQzMXhCOEpiTWdoc3J0YnBuYzJvU05YUUdsVmZvMkxqQjJwVzdTaEhIZFNuaVU4NVdXZEFCOEUvUnRZT0FuUTRnUDRaMlVUeHpsbVBocEpPTkZWRHF4MDZzcUVkZXRJT2dyUUQ1V0RENHpIWU5ZWmppQ0ZoSktMQkdHS1cxcHNJdmg4d05iVHJNQWsyVHUxMklCMEU0VnNxSHJVS3N1a0pyejdGL2l1MDV4MzJFK1U0c0c3ZlUveG1mRmUzSERMT09QNHRXKzRkU3FxemdUcGZnb1k2aDV1SENyNUUwZEF5M3F5SHRsNURsd21LR1AvMXBNY1lCZTNzUTN5WjcvOUl2OUQ2R1NZcHVSaVl1MUU0eFhEQldlcmdyTSt3RnprYldKOU4vSklPVGg0VG5QWFhPNEozTXB1VUVSYmpYd2tURmlmektjUUxsdGVBOGVxUmxQUklXY2FNbE1PQ0xHZGtlekhobW5HelhvZGJ3ZzhnaEJPdVZ3SUFBQT09Il1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-dotnet": new URL("" + new URL("cspell-dict-dotnet-JlDwx_zu.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-elixir": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWVsaXhpciIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWVsaXhpci9kaWN0L2VsaXhpci50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDa0YwYjIwS1FtbDBjM1J5YVc1bkNrTm9ZWEpzYVhOMENrVnNhWGhwY2dwRmNteGhibWNLUm14dllYUUtTVzUwWldkbGNncE1hWE4wQ2sxaGNBcFFiM0owQ2xCeWIyTmxjM01LVkhWd2JHVUtYMTlEUVV4TVJWSmZYd3BmWDBSSlVsOWZDbDlmUlU1V1gxOEtYMTlHU1V4RlgxOEtYMTlOVDBSVlRFVmZYd3BoYkc1MWJRcGhiSEJvWVFwaGNtbDBlUXBoYzNOdll3cGhjM052WTNNS1ltTnllWEIwQ21KbGFHRjJhVzkxY2dwaVpXaGhkbWx2ZFhKekNtSnNZVzVyQ21ObGNuUm1hV3hsQ21Ob1lXNW5aWE5sZEFwamFHRnVaMlZ6WlhSekNtTm9ZWEprWVhSaENtTnVkSEpzQ21OdmJXSnBibUYwYjNJS1kyOXRZbWx1WVhSdmNuTUtZMjl1WTJGMENtTnZibVFLWTI5MlpYSmhiR3h6Q21SaGRHVjBhVzFsQ21SaGRHVjBhVzFsY3dwa1pXWUtaR1ZtWTJGc2JHSmhZMnNLWkdWbVpHVnNaV2RoZEdVS1pHVm1aWGhqWlhCMGFXOXVDbVJsWm1kMVlYSmtDbVJsWm1kMVlYSmtjQXBrWldacGJYQnNDbVJsWm0xaFkzSnZDbVJsWm0xaFkzSnZZMkZzYkdKaFkyc0taR1ZtYldGamNtOXdDbVJsWm0xdlpIVnNaUXBrWldadmNHRnhkV1VLWkdWbWIzWmxjbkpwWkdGaWJHVUtaR1ZtY0Fwa1pXWndjbTkwYjJOdmJBcGtaV1p6Y0dWakNtUmxabk4wY25WamRBcGtaV1owZVhCbENtUmxablI1Y0dWd0NtUmxjSE1LWkdWelkzSnBZbVYwWVdjS1pHVnpZM0pwWW1WMFlXZHpDbVJsYzNSeWRXTjBkWEpsQ21SblpYUjBaWGgwQ21ScFlXeDVlR2x5Q21ScFlXeDVlbVZ5Q21ScFoybDBDbVJ1WjJWMGRHVjRkQXBrYjJNS1pHOWpjd3BrYjJOMFpYTjBDbVZqZEc4S1pXeHBlR2x5WXdwbGRtRnNDbVYyWVd4ekNtVjRZMjkyWlhKaGJHeHpDbVpoYkhObENtZGxibk5sY25abGNncG5aVzV6WlhKMlpYSnpDbWRsZEhSbGVIUUtaM0poY0dnS2FHVmxlQXBvWlhod2JRcG9jM1J6Q21oMGRIQmpDbWx1WlhRS2FXNWxkSE1LYVc5a1lYUmhDbXRsZVdacGJHVUtiR1ZsZUFwc2IzZGxjZ3B0Wm1FS2JXWmhjd3B0YVhnS2JXNWxjMmxoQ20xdlpIVnNaV1J2WXdwdGIyUjFiR1ZrYjJOekNtMXZaSFZzWlhSaFp3cHRiMlIxYkdWMFlXZHpDbTF6WjJsa0NtMXpaM04wY2dwdVoyVjBkR1Y0ZEFwdWFXd0tibWxzYVdaNUNtNXZhRzl6ZEFwdWIyMWhkR05vQ201dmJtOWtaUXB2Y0dGeGRXVUtiM1psY25KcFpHRmliR1VLYjNabGNuTndaV01LYjNabGNuTndaV056Q25CdmMzUm5jbVY0Q25CeVpXeHZZV1FLY0hKbGJHOWhaSE1LY0hKcGJuUUtjSFZ1WTNRS2NYVmxjbmxoWW14bENuSmxZbUZ5Q25KbFoyVjRDbkpsY21GcGMyVUtjMlZzWm5OcFoyNWxaQXB6YUc5eWRHUnZZd3B6YjJKbGJHOTNDbk53WVdObENuTndaV05rYVdabUNuTndaV05rYVdabWN3cHpkSEoxWTNRS2MzUnlkV04wY3dwMGNuVmxDblI1Y0dVS2RIbHdaV1J2WXdwMGVYQmxaRzlqY3dwMGVYQmxjQXAwZVhCbGMzQmxZd3AwZVhCbGMzQmxZM01LZFc1a1pYSnpjR1ZqQ25WdVpHVnljM0JsWTNNS2RYQmpZWE5sQ25Wd2NHVnlDblZ6WldNS2QyOXlaQXA0WkdsbmFYUUsiXV19", "" + import.meta.url).href,
	"@cspell/dict-en_us": new URL("" + new URL("cspell-dict-en_us-DoLEvCu7.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-en-gb-mit": new URL("" + new URL("cspell-dict-en-gb-mit-iptyparl.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-filetypes": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWZpbGV0eXBlcyIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWZpbGV0eXBlcy9maWxldHlwZXMudHh0Lmd6IiwiSDRzSUFBQUFBQUFBQTAxVlM3TGNOZ3pjOXlsY2xiVVhTZXkzeUdWYy9Jc2FmaEFDa2poeitoU29lYytwbW00MElBNEZnaENKUDc0NXBsREtkK205OEQvZkhpSFFkMmM0Zkd2OU8xUEpBaGpqWUp6emRuRllQQllMekEyR3lWSGhsQ0pNa2RoSGhhRnNGNVVqME1oTllJam1vbXBham9FRmh0MkVZVktva05GaHBGZVkwMlVsaGpsVjZCdk9IQmxtMWdKcmJDakR3UnBXYkl0K21aSU5oenZ5cS9TVTI1ZnNoOXlhUm8rNWhPV3NDUVJXeDFXQzdWY1lHcVBhWUFmRHdSa0w1K0M4Z1lzSkx1WG00TXF1WUtVSlYvcCtqQUJYUFZ5UE1ZUzNZVGN5Q1Z4dmNWRk9jRVJ3R3FNbjNKaHd2RWt0Y0t6b0RZNXA5UDF0RGc0RGpobU9UemdodURuaG5xUEE1NmhRRXJPb0dvSXZCYjQ3eFNPTXRjaGI1dFQ2V0U1Vm12QmRGQk4rbUN0M2VQNjN3SXVIMTJ5Q1BYTHhDRDVMSCsvRWcyOEkrcXdMQWpFQ2Z5Qnd5VTNlazkvT2NGOWk1Ly9KM3I2Y3A5RnBaa0M0MWJNV3hNd2JZamtSR1pFM013aVJNK0pkamNqdlNrYWVpTHI3U1plWk5Ia2svMzZZUW1VS0RtbTFYc29SS1lzUkdka2VFbGc5MTJ2TmNxdTFxcFEvMDA5WlJyQ0dBMUpIR3NhWGdEUjZQNTlJNDJpeXFwbDRDMEdRdUdTdk00cXhHdFV4VDFKa2JOaE04eVZZTTFpbFlEUDhDS1ZnczR3dFpMZG95YmhJNWVtd2JkaUlzRW5GYW9sdFRtVFhHTmwxdkpQTXRTQzNqTnpVZHVUR1lrcEJabjNBSGJ2eEFic1oyTTJwTUl2ZUJmb3RSekJPc0lmMnlJM1h5dlk2c1ZOSTJDbGhaK3pzeUN2emNOaDV1N2QyMTI3RjJrMmxuNHZkNG9LZENUdFBoWmpFS0VZYWlqbWEyMUJjUDFFQ00wcDNENHR5R0ZUVUh3YlZQTUxLb0pyeDhPMDIvV3FvSHRWYlZOM3ArbzVNMU5BTzFPd1ZHWFZuMUFkcVJlMG5LdjJOU2o5UWRSMlZFaXBuMUNPamFzdTBmd250b0VkQ08xYWZkTHNISi9sVW1SSTYxWUorRmRBSHlJamJRRDZDUWdXRlVSWjlnRFpTL0ZENkNWb2JSZnI3QUZWUS9RQzFCT29lMUVWUmxTWklEeGJldEEySVRBVVJLNWFZSUJLRmVqcDJCSkg4OWRGK3VzUGg4K1JhSHdXTlRtRklEZ3ppUDBIc0ZTcFNCbkZWcGY5aFZoTG9PdzZyMEdyY1poMHdkQ1RRb2JFbjZDbGJiNkRuaFlGaEhnSERxSGoxZ1dFeDdNVHdFU1BzR0lGbEhFNk9FYnlFS1JoYlp1bmppYkV6UmtzWW4va09lbUl3QmpPR1lFakVPREFPKzhRNFdNQ3U1a2FIQ21id0J0Nk1EK050aXJGWWxYdDNNVzlyK2ZlNXljVlhwUWs5d05icmJUZkRnODhFdmlMNHlsSEFUNFpBekVoQitOUG1WNERrcUlpUTRpR1ZJSFZDZWkzUWNld2ZFRDRoUENFU0lWTWdUL284MTMvTCszczZHaFVqd2VPME9PM0s4amFyektkbG5HN2U0ZHZHWENRTXh0a3R6bDRFSjN0RlZabzRPU3NWeHNrMXQxeE53Y25xY1pDc1JnZnF2MlNKaWZNSXVNeUp5ejV3QlZzWGZWNjAxNE54VllPcmVseFY5WW1ydm5EMUdCZjloWXQrNGlLUGkzM0JOVE91cVpZeDlhU2V0bUN1c3M5c01ZdFJWTXdTTVlzV2NaYUNXVFRDaWlVbVpoR0ZlaktoelRlMXdKTzhFbU95eCtTaUVNeWpZRjBMZWl1OE11RjEzK0t2OXczKyt1eXBGMitLMEU0MXd5bkxGbXJBZnkyRDlSL1ZDQUFBIl1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-flutter": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWZsdXR0ZXIiLCJlbnRyaWVzIjpbWyIvX19jc3BlbGxfdmZzL0Bjc3BlbGwvZGljdC1mbHV0dGVyL2ZsdXR0ZXIudHh0Lmd6IiwiSDRzSUFBQUFBQUFBQTFWWFc3YnNJQXI5WnhSM3JmNitFK2paRUNVSkp5cGUwRlRWR1gwdnNNNmpmMlJiWlh3Z2U0UHduei9KT3BYeWQ0Z1UrKytmaTZqL1RXajBwOGxmNjRVSEFHSWZnRG1uRXpWQWFZRFppZ3pBUXlRRG5sYTh1UUZaZThGR1ZUSUJGajVhb2paSUZ5NjBqNFdVanpQZ1RRYllzZ3JuSjJBN0NtVjV0SVZtQjJ4Y2NlQldDRkNHTmV4MnlvZ0pOWjE4MHliUGdBYW9sWEJqdHplZ3FqenN4RTRMRHVXWUVuQm1scUdZTHNBNUpJa3FwZkViczdUbzdwS21MZFNYVldyMGVDUGpUd3A0WStHTWcyRERkUDJiNG9pb25hUU8yaERZZUNSM3gxWkU4bmgxZ2sxS3BnYWJhQ1l0WkFhYmpDSDF4TEsvNFRoWk0yeVRTNDdUSjZ5a2FBOGU2WVNFN1VhN2VFRENia1hTQlFsSG5hVkFTbEk3RjFKSSt6WmI5azlQU2xkRnZYN1FtcEpSajFtcERZUEVQVU5pVFlVNmpoTVMyOHNHVlVnMUYyNEVTWkpnbC93TkRQeFF4a2VESk5RaFNidEp3M3RKdEJtWEM1Sk12L3doM1VmZnBHdmRQdDBMQmtrcDgwaW9HWkpSb1RSRUlabVM5eTFKRVRWSWs3cHc3SEYyWDZBSlpOU1I2VTRCQ3JZalFNY01HUWNlaWhWeVRwdklzS0hZdlhPUk5pcU9Lbkp6YXpKYmhweXQ0R3pwSklWTVc1bHVUdndreUZSWHlId0IvNmZ2SEwrRU5jaGtpVm9PRjJheWEwaDMvODhSZzI5T2xFYUJURS8yUFRJZVRXeHdDamRreGhKYlpuTVgrQmRmeUNBSGdiS0grdkwvZ3JONXdFUi94VzAyck4wbnMxZU5aZzR1a0IvWklMOEtiNnMxb01RWktCOWsxRXdVaUcwQzFZMnlMeHdVcFNjUElPdWl3NENlcVdCOUcvUmJqUUNpNTFBczBnN1ljVHRtRUhIMzA1akJqaloyVjRPZGNxcXdjOFBDbno2QTIwSGFsVU1JZGg0YkQ5aUxUQTN2T1I3VXdpZkJ1VGZTQjZwZmpwMncyL1lhQkx1NWN3dTlZZHY1V0dERUxFYlBSRDBpY0xlNHA5MlUvRHl3bXczMU85anRvUnpibUtWWVVxSUdCM0t6VFZUZ3dFbytuVXJ4Ni9hdTM5Q0JQVTU0cEFob09KS0t1TEZaSzJvYzhraURLOEhCK3dyb28reVBhQzU2d1ZIUktha3VNQmtPY2FsNHhDalpQdndhRDNtZkY0NlFCbldYdjdIQjBXZWxLdnB5dEpaUnpJVWVjQ2loRSt6RXRyQ0hzYXVJSHc5T2JCL283WVhYaEpQd2Zxa0gvOG1ad3NrbjcyeWQ4UEt2ZUZUc2NJcnlKNXhpbzJFbGc5TktFQkZPdTk5ZzFQTDI1bmxqQWc5eUphekFhZVpSZ0ZmZ0wrZTZXbi8vOHJJaUIzQXBzd0pYeEx4YWMvTjFpMXpSZzlRbDNiSFJHTndPSDBLZDFHUUZsWDk1RERJZkw1dGZOVmZQWXFUSlVRZVB0VklZV0haMFdYa0JpL21DM2xxWWh1WDFTUUg5QTdHMTVySjgweGVNMFVscXhaWVgxUGd2VXkveStrRTF0dTg5UCt3UGl1K3B6b0l1YjcvdytpTUNQeTk0T0xNRDNhelN2bWJjQ2NkY2krNktsUjZpbDNlQ1VKakdlN1BSM1RIOWRCb1d4MHZnSFBVeUQyNk9kRGFQcE5pREpRLzRRRGttTnY2MTNlL09HdXR1ZG5DVG1sT054WHcvZTVFSGNFY0Q3aXJQRjN5c3RRdys3SzI5SCtaSE1zT0Qzbmlja3VIRGxoSi8yRUE5YU1ESDlMRDltRFo0ZjBYSjhNYXJhUGg0WjF4UnVIRERuQmt1ZW5WMWhsNDh5S2E2NHNCVjBBeUt6N2tTR3l3L1JPUVhmRW1vZENITXBKczQ5M3l0U01HRnRJTlRQb2hWZUJ0a1JtVzVwSEFYS0hJa0hGRFVhR3hRaG01UU1UMjRaWG1BUytWc1NwaWg1bVpRT2FrTXRPc0grWStsc01FS1gwOWJVTVdkdlBTMzJwMmd6akk0MDNPQklUT2RieGoxUzZOSGFkNjZ5RUdUbUtUSlVrRm8wcEkwY3hCSnVubVlGMDRoNXREc3JUek5YSmdUZHl6UVpuVzVhdy9PQncwRDJUNFNTRXBsZXBLUWZUK1VNMGlMaE9pQXhrUEdxVVN3U1BSRkdMR3RjTHY4RnNTaWhna2IxWWg4S2ZmLzhjWTd2azNLQzNvbWhXOHUvVkRwaHpEZmZCR2pKNlc1aXNUZkRCSGJaenFORWNSQzFxUU5MUENMRzJLVkQxMGVjWExnMkVVcmZQTkVyS3VFbTc1Skl2WmRxWWdOOUUyR0R2MFE0aGNmeEo3cDEzNW1aRzZaWXhOM24zK1FzTDFCek43eG9FZzFIWnRBeDA2cm5JYU9OcFptOTZpUHY3VHdsR0ZkQnZSVEdyblBvWE0yNk5maGhVY3ZtQ2dTZHkvNE9qMGdIWFNjUnRETHRNcHRHdlFxTjBHWEhFblRhN3RPQ2JxVVYyeTRLNjA3N0VvSjB4bS9mSmVaWFdtUnlkRTZoR2Q2TzZWREgzSjRCZFhudHFaYzF1Q2ZSa1g4YjNLNmxIcDV3YjhwaWhEMWM2R2JDaWhtbGdmNiswRDk4TXFmY1ZFL1hWSndqc1dwbGJEVThKelNSaWtoS0tYQzNZMW81bllNZnd0NHplUkRNdlZ4d3ZmT2xhSVNELzhxZFZRUFNhVlZXL2txUTdGWnhFWm9VSWlFU3NVUEJ1MHBNanVzZ2t6blZzRExHa3J3a3dJOWg4RzY0dzNWM3BBVUxGK29nejFKbVhjODZicVZWY2RZdnFMVXNIeDloZGNLdjZpNXdCa3p1NXRwNnViQkx2VEdOWTNWRnJDTEVld3lSdyswQ2xiZVRMVHlWbUFyOHFnQ1ZxTDB0MktrUVRzcmRybzZnbFVzNVMyaXY5OWczemlPNTQvRmQwbTFWQ3pKMUFIMmI2S3VWNFVydk95RmR3SWJ0SUVOSlJvMzA4TWhYelJPbFhtY1lIUEw3SDZhVzVHRWhjZkw4Y0FEYkg2VlhIWnpKb0ZWVnBqYjVhdVhGLzJKWUdEdmNhVWpUNFZCenlVUkRqSi92ZlM4NXhlTEk2QlZnMUMwdkl6eGM3d0MyaW5GNHdqR09ldG13Y0lGWjRmQjE1QUxQS01XN0Vhd0FuK3RKejNpSlVUYjlmWHJMUm91R1NxZEV4WWJIbDFEWjB2djkrN1ExNGRzTUdiamR1d3VJT01XZy9Id21JTHg0T01za1JCbjVneVRmOHY3NUhSaU93Z21oLzdBNUhoUVRIYXhLZmo2UVFhVC9Yem9jOFJWVEg3bnNkbVNsRGhQRGx4WGtwMXRQWTNkcnFKMU5udTFkS3EwcU0xbU43K3pkc0RVMHNSYnBiMEU5K1pnOXZjUzcwd0tjMHh0Y0tmYlNSSFhtYkF1NE1VMzNQVXJGdThhaGUrdG9ZeTNQZUtCZmZ1NjhNQ1JUakY0VURweHdPUEVFWFZubFBxbHdUTzlVODR6dlJQS2IxbCtKaVdiWlRpWURaNGhnazl1bm5pZklaN1BXczR4T2p4bDM0MEdQTHNZaDU5ZmE5Z25yUkw3Zjh1VjVoNU9FUUFBIl1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-fonts": new URL("" + new URL("cspell-dict-fonts-BSkkktju.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-fsharp": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWZzaGFycCIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWZzaGFycC9kaWN0L2ZzaGFycC50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDa0p5YjNkellXSnNaUXBFWVhSaGN3cE1aWGhvWld4d0NsTjBZWFJsVkhKaFkydGxjZ3BhYldGd0NscHpaWFFLWVdKemRISmhZM1FLWVcxaGNBcGhibVFLWVhKbFpncGhjbWwwYVdWekNtRnlhWFI1Q21GemNncGhjM05sYlFwaGMzTmxjblFLWVhSdmJXbGpDbUYwZEhKcFluTUtZbUZ6WlFwaVpXZHBiZ3BpWldoaGRtbHZkWElLWW14cGRBcGliM2hwZEhrS1luSmxZV3NLWW5seVpXWUtZbmx5WldaekNtTmhiR3hqYjI1MkNtTmhiR3gyYVhKMENtTmhjM1JqYkdGemN3cGpZM1J2Y2dwalkzVnpDbU5rWldOc0NtTmxibllLWTJobFkydGxaQXBqYkdGemN3cGpiMjF3YVd4aGJtUUtZMjl0Y0c5dVpXNTBDbU52Ym1RS1kyOXVjM1FLWTI5dWMzUnlZV2x1ZEFwamIyNXpkSEoxWTNSdmNncGpiMjUwYVc1MVpRcGpiMjUyQ21OdmNtVmpiSElLWTNCaGRHZ0tZM0JpYkdzS1kzQnZZbW9LWTNKbFpncGpkRzlyQ21OMGVIUUtaR1ZqY2dwa1pXWmhkV3gwQ21SbFptRjFiSFJ2Wmdwa1pXWnVDbVJsWm01ekNtUmxiR1ZuWVhSbENtUmxiV0Z1WjJ4bENtUmxiV0Z1WjJ4bFpBcGtaVzUyQ21SbGRIVndiR1VLWkdac2RBcGthWE5qY21sdENtUnZDbVJ2Ym1VS1pHOTNibU5oYzNRS1pHOTNiblJ2Q21Sd2NtbHVkR1lLWkhSeVpXVUtaV0ZuWlhJS1pXTnlaV1lLWldsdVptOEtaV3hwWmdwbGJITmxDbVZ1WkFwbGNXNXpDbVZ5WldZS1pYWmxiblFLWlhoalpYQjBhVzl1Q21WNGFYUmxjZ3BsZUc1akNtVjRkR1Z5YmdwbGVIUmxjbTVoYkFwbVlXbHNkMmwwYUFwbVlXbHNkMmwwYUdZS1ptRnNjMlVLWm1GemRHTmhiR3dLWm1SbFpncG1hVzVoYkd4NUNtWnBibVp2Q21acGVHVmtDbVpzWkhNS1ptOXlDbVp2Y21Gc2JBcG1jSEpwYm5SbUNtWndjbWx1ZEdadUNtWnlaV1lLWm5Oc2FXSUtabk52WW1wdGIyUmxiQXBtYzNCbFl3cG1jM2xoWTJNS1puVnVDbVoxYm1OMGFXOXVDbVoxYm1OMGIzSUtaMnh2WW1Gc0NtZHZkRzl6Q21sa1pXNTBjd3BwWkhoekNtbG1DbWxwYlhCc2N3cHBiSGhuWlc0S2FXMXdiSE1LYVc0S2FXNWpiSFZrWlFwcGJtaGxjbWwwQ21sdWFYUmliR3NLYVc1cGRHbGhiRVZzWlcxbGJuUUthVzVwZEc5aWFncHBibXhwYm1VS2FXNXlaV1lLYVc1emRISnpDbWx1ZEdWeVptRmpaUXBwYm5SbGNtNWhiQXBwYm5SbGNuQUthVzUwWmdwcGMybHVjM1FLYVhSbGNta0tiR0Z1WkFwc1lYcDVDbXhqYVdRS2JHUmhjbWNLYkdSbGJHVnRDbXhrWld4bGJXRUtiR1JtYkdRS2JHUm1iR1JoQ214a2JHVnVDbXhrYkc5akNteGtiRzlqWVFwc1pHNTFiR3dLYkdSdlltb0tiR1J6Wm14a0NteGtjMlpzWkdFS2JHUnpkSElLYkdSMGIydGxiZ3BzWlhRS2JHVjBjbVZqQ214bGVHSjFaZ3BzYVdSM1pBcHNiM0lLYkhCaGNtVnVDbXh6YkFwc2MzSUtiSGh2Y2dwdFlYQnBDbTFoZEdOb0NtMWtaV1lLYldWaGMzVnlaUXB0WldGemRYSmxZV0pzWlFwdFpXMWlDbTFsYldKbGNncHRaWFJvYjJRS2JXbHVabThLYldsdVptOXpDbTFwYm5OMENtMXBlR2x1Q20xdlpBcHRiMlJ5WldZS2JXOWtkV3dLYlc5a2RXeGxDbTF5WldZS2JYTmpiM0pzYVdJS2JYTndaV01LYlhWMFlXSnNaUXB0ZFhSaFlteGxjd3B1WVcxbGIyWUtibUZ0WlhOd1lXTmxDbTVoZEdsMlpXbHVkQXB1WVhScGRtVndkSElLYm1WMGMzUmhibVJoY21RS2JtVjNDbTVsZDFOMFlYUmxDbTVsZDJGeWNncHVaWGR2WW1vS2JtOW1jbUZ0WlhkdmNtc0tibTkwQ201dmRHeGhlbmtLYm05M1lYSnVDbTUxYkd3S2JuVnNiR0Z5ZVFwdWRXeHNibVZ6Y3dwdlltcGxZM1FLYjJZS2IzQmxiZ3B2Y2dwdmRYUm1hV3hsQ205MlpYSnlhV1JsQ25CaGNtRnNiR1ZzQ25CaGNtVnVjd3B3WkdWbUNuQnBZMnRzWlhJS2NHbHVabThLY0dsdVptOXpDbkJzYVdRS2NISnBiblJtQ25CeWFXNTBabTRLY0hKcGRtRjBaUXB3Y205alpYTnpDbkJ5YjNSbFkzUmxaQXB3ZFdKc2FXTUtjSFZ5WlFweGJXRnlhd3B5WldNS2NtVmpkWEp6YVhabENuSmxjSElLY21WeVlXbHpaUXB5WlhOamIzQmxDbkpsZEhWeWJncHlabWxsYkdRS2NtWnBibVp2Q25KbWNtVm1Dbk5pZVhSbENuTmpiM0psWmdwelpXRnNaV1FLYzJWc1pXTjBDbk5wWndwemJHOTBjMmxuQ25Od2NtbHVkR1lLYzNSaGRHbGpDbk4wWkdOaGJHd0tjM1JsYkdWdENuTjBabXhrQ25OMGJHOWpDbk4wYjJKcUNuTjBjblZqZEFwemRISjFZM1J6Q25OMGMyWnNaQXAwWVdOalpYTnpDblJoYVd4allXeHNDblJoYVd4allXeHNjd3AwWVhOMENuUmpZWFZuQ25SamNtVm1DblJrWldZS2RHaGxiZ3AwYUdselkyRnNiQXAwYVc1emRBcDBid3AwYjNCc1pYWmxiQXAwY0dWdWRncDBjbUZwZEFwMGNuVmxDblJ5ZVFwMGMzQmxZd3AwZFhCc1pXUUtkSFZ3YkdsdVp3cDBlV0Z3Y0FwMGVXRnlaM01LZEhsamIyNEtkSGxqYjI1ekNuUjVjQXAwZVhCaGNncDBlWEJoY25NS2RIbHdaUXAwZVhCbFkyaGxZMnNLZEhsd1pXTm9aV05yWldRS2RIbHdaV1JsWm05bUNuUjVjR1Z2WmdwMGVYQmxjSEp2ZG1sa1pYSnpDblI1ZG1GeUNuUjVkbUZ5Y3dwMVkyRnpaUXAxWTNKbFpncDFibUYwYVhabGFXNTBDblZ1YldGdVlXZGxaQXAxYm5CcFkydHNaUXAxYm5SaGFXNTBDblZ3WTJGemRBcDFjMlVLZG1Gc0NuWmhiSE1LZG1seWRBcDJhWEowZFdGc0NuWnZhV1FLZG05c1lYUnBiR1VLZG05d2RHbHZiZ3AyY21WbUNuWnpjR1ZqQ25kb1pXNEtkMmhwYkdVS2QybDBhQXA0Yld4a2IyTUtlV2xsYkdRSyJdXX0=", "" + import.meta.url).href,
	"@cspell/dict-fullstack": new URL("" + new URL("cspell-dict-fullstack-uBBqWNk-.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-gaming-terms": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWdhbWluZy10ZXJtcyIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWdhbWluZy10ZXJtcy9kaWN0L2dhbWUtZGV2ZWxvcG1lbnQudHh0IiwiQ2lNZ1kzTndaV3hzTFhSdmIyeHpPaUJyWldWd0xXTmhjMlVnYm04dGMzQnNhWFFLQ2pGRUNqSkVDak5FQ2tGRVFncEJUMVFLUVZCSkNrRlFTd3BCVWdwQlVsQUtRVkpRUkVGVkNrRlNVRkJWQ2tOUFVGQkJDa05VVWdwRVFWVUtSRzlHQ2tWdGMyTnlhWEIwWlc0S1JqSlFDa2RFVTJOeWFYQjBDa2RFVTJoaFpHVnlDa2RKQ2tkTVUwd0tSMmw2Ylc4S1IzSmhaR3hsQ2toRVVncElSRkpKQ2tsQlVBcEpUREpEVUZBS1RFOUVDa3hVVmdwTlFWVUtUVklLVFZORVJncE9ZWFpOWlhOb0NrOUVVZ3BTWldGc2RHbHRaUXBUUTBORUNsUmxlSFJHYVdWc1pBcFZTUXBWVUUwS1ZsSUtWbE41Ym1NS1YxbFRTVmRaUndwWFpXSkhUQXBZVWdwWVVrRlFTUXBoWVdKaUNtRmljMllLWVhOMFl3cGliR2wwQ21KdmIyd0tZbkIwWXdwaWRtVmpNZ3BpZG1Wak13cGlkbVZqTkFwallXeHNkZ3BqWldsc2FRcGpiR0Z0Y0dZS1kyeGhiWEJwQ21OMFpYZ0tZM1ZpWlcxaGNBcGpkV0psYldGd2N3cGxRMUJOQ21acGJtUnVDbVpzYjJGMENtWnNiMjl5YVFwbWIyNTBSR0YwWVFwbWNHOXpiVzlrQ21kVFpYSjJhV05sY3dwblpFVjRkR1Z1YzJsdmJncG5aRTVoZEdsMlpRcG5aRkpsYzI5MWNtTmxDbWRrVTJObGJtVUtaMlJUWTNKcGNIUUtaMlJUYUdGa1pYSUtaMlJUYUdGa1pYSkpibU1LWjJSelkzSnBjSFFLWjI5a2IzUUtaMjlrYjNSVGFHRnljQXBwYldkMWFRcHBiblFLYVhOaGJYQnNaWElLYVhOaGJYQnNaWEl5UkFwcGMyRnRjR3hsY2pKRVFYSnlZWGtLYVhOaGJYQnNaWEl6UkFwcGRtVmpNZ3BwZG1Wak13cHBkbVZqTkFwc1pYSndDbXhwWjJoMGJXRndDbXhwWjJoMGJXRndjR1ZrQ214cFoyaDBiV0Z3Y0dWeUNteHBaMmgwYldGd2N3cHNiMlFLYkc5a2N3cHNkM0p3Q20xaGRESUtiV0YwTXdwdFlYUTBDbTFoZEdobUNtMWhlR1lLYldsd1RXRndDbTFwY0UxaGNITUtiWFZzZEdsdFpYTm9DbTVwWTJsbWVRcHZZMk5zZFdSbENtOWpZMngxWkdWbENtOWpZMngxWkdWekNtOW5aM1p2Y21KcGMzTjBjZ3B2YmxKbFlXUjVDbkJ5WlcxMWJIUUtjSEpsYlhWc2RHbHdiSGtLY0hKcGJuUjBDbkIyY25SakNuSmhibVJtQ25KaGJtUm1iZ3B5WlhOd1lYZHVDbkpwWjJsa1FtOWtlUXB5YjNWdVpHa0tjMkZ0Y0d4bGNqSkVDbk5oYlhCc1pYSXlSRUZ5Y21GNUNuTmhiWEJzWlhJelJBcHpZVzF3YkdWeVEzVmlaUXB6WVcxd2JHVnlRM1ZpWlVGeWNtRjVDbk5wWjI1bUNuTnBaMjVwQ25OcmVXSnZlQXB6YkdWeWNBcHpjSEpwZEdWVGFHVmxkQXB6ZEdWNENuTjBjSEVLYzNWaWNHRnlkR2xqYkdVS2RISnBiV1Z6YUFwMGMyTnVDblZuZFdrS2RXbHVkQXAxYm1sMGVRcDFibWwwZVhCaFkydGhaMlVLZFc1eVpXRnNDblZ6WVcxd2JHVnlDblZ6WVcxd2JHVnlNa1FLZFhOaGJYQnNaWEl5UkVGeWNtRjVDblZ6WVcxd2JHVnlNMFFLZFhObGJYUnNDblYyWldNeUNuVjJaV016Q25WMlpXTTBDblpsWXpJS2RtVmpNd3AyWldNMENuWnZhV1FLZDJGelpBcDRabTl5YlFvPSJdLFsiL19fY3NwZWxsX3Zmcy9AY3NwZWxsL2RpY3QtZ2FtaW5nLXRlcm1zL2RpY3QvZ2FtaW5nLXRlcm1zLnR4dCIsIkNpTWdZM053Wld4c0xYUnZiMnh6T2lCclpXVndMV05oYzJVZ2JtOHRjM0JzYVhRS0NrRm5aM0p2Q2tGcGJXSnZkQXBDZFdabUNrTjFkSE5qWlc1bENrUkNUazhLUkdWaGRHaHRZWFJqYUFwRVpXSjFabVlLUkdWemNHRjNiZ3BFYVdkbllXSnNaUXBHWVdObGNtOXNiQXBIVEVoR0NrZGhiV1ZpWVhSMGJHVnpDa2hsWVdSemFHOTBDa2hsWVdSemFHOTBjd3BJYVhSd2IybHVkQXBJYVhSelkyRnVDa3BTVUVjS1RHVmhaR1Z5WW05aGNtUUtUVTFQVWxCSENrMVBRa0VLVFdGdVlRcE5ZWFJqYUcxaGEybHVad3BOYVc1bFkzSmhablFLVG1WeVpncE9iMjlpQ2xCbGNtMWhaR1ZoZEdnS1VtRm5aWEYxYVhRS1UyTnlkV0lLVTJsa1pYRjFaWE4wQ2xOdGRYSm1DbE53WldWa2NuVnVDbFJ5YVdOcmMyaHZkQXBVY25sb1lYSmtDbFZ1WW1GdUNsVnVjbUZ1YTJWa0NsVnVkR2x0Wlc5MWRBcFhZV3hzYUdGamF3cFhZV3hzYVc1bkNtSnZiM0FLYTI5dVlXMXBDZz09Il1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-git": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWdpdCIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWdpdC9kaWN0L2dpdC10ZXJtcy50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDa05JVEVRS1JVUkpWRTFUUndwSFNWUmZRVlZVU0U5U1gwbEVSVTVVQ21Ga1pBcGhiR3h2ZDJSbGJHVjBaV0p5WVc1amFBcGhiR3h2ZDJSbGJHVjBaWFJoWndwaGJHeHZkMjF2WkdsbWVYUmhad3BoYkd4dmQyNXZibUZ6WTJscENtRnNiRzkzZFc1aGJtNXZkR0YwWldRS1lXMEtZWEJ3Ykhsd1lYUmphQXBoZFhSdlkzSnNaZ3BpWVhKbENtSmhjMlZpY21GdVkyZ0tZbWx1Ylc5a1pRcGlhWE5sWTNRS1lteGhiV1VLWW5KaGJtTm9DbUoxYm1Sc1pRcGphR1ZqYTI5MWRBcGphR1Z5Y25rdGNHbGphd3BqYVhSdmIyd0tZMnhsWVc0S1kyeHZZMnRwWkFwamJHOXVaUXBqYjIxdGFYUUtZMjl0YldsMExXbHphQXBqYjIxdGFYUnBjMmdLWTI5dGJXbDBiWE5uQ21ONVozZHBiZ3BrWlc1NVkzSmxZWFJsWW5KaGJtTm9DbVJsYzJOeWFXSmxDbVJwWm1ZS1pXTm9iMkpoWTJzS1ptVjBZMmdLWm1sc1pXMXZaR1VLWm05eWJXRjBMWEJoZEdOb0NtWnpiVzl1YVhSdmNncG5Zd3BuYVhRS1oybDBhd3BuY21Wd0NtZDFhUXBvWld4d1pYSUthRzl2YXdwcFoyNXZjbVZqWVhObENtbHVhWFFLYVc1emRHRjNaV0lLYkc5bkNteHZaMkZzYkhKbFpuVndaR0YwWlhNS2JXVnlaMlVLYlhObkNtMXplWE1LYlhZS2JtVjNjbVYyQ201dmRHVnpDbTlzWkhKbGRncHZibVZzYVc1bENuQnlaV052YlcxcGRBcHdjbVZqYjIxd2IzTmxkVzVwWTI5a1pRcHdjbVZ3WVhKbENuQnliMnBsWTNSa1pYTmpDbkIxYkd3S2NIVnphQXB5WldKaGMyVUtjbVZ3YjNOcGRHOXllV1p2Y20xaGRIWmxjbk5wYjI0S2NtVnpaWFFLY21WMkNuSmxkbVZ5ZEFweWJRcHphRzl5ZEd4dlp3cHphRzkzQ25OMFlYTm9Dbk4wWVhSMWN3cHpkV0p0YjJSMWJHVUtkR0ZuQ25kaGRHTm9iV0Z1Q25kb1lYUmphR0Z1WjJWa0NnPT0iXV19", "" + import.meta.url).href,
	"@cspell/dict-golang": new URL("" + new URL("cspell-dict-golang-BqYFGQHl.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-google": new URL("" + new URL("cspell-dict-google-BaQ1muxA.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-haskell": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWhhc2tlbGwiLCJlbnRyaWVzIjpbWyIvX19jc3BlbGxfdmZzL0Bjc3BlbGwvZGljdC1oYXNrZWxsL2RpY3QvaGFza2VsbC50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZ6Q21OaGMyVUtZMnhoYzNNS1pHRjBZUXBrWldaaGRXeDBDbVJsY21sMmFXNW5DbVJ2Q21Wc2MyVUtabUZ0YVd4NUNtWnZjbUZzYkFwbWIzSmxhV2R1Q21ocFpHbHVad3BwWmdwcGJYQnZjblFLYVc0S2FXNW1hWGdLYVc1bWFYaHNDbWx1Wm1sNGNncHBibk4wWVc1alpRcHNaWFFLYldSdkNtMXZaSFZzWlFwdVpYZDBlWEJsQ205bUNuQnliMk1LY1hWaGJHbG1hV1ZrQ25KbFl3cDBhR1Z1Q25SNWNHVUtkVzVrWldacGJtVmtDbmRvWlhKbENnPT0iXV19", "" + import.meta.url).href,
	"@cspell/dict-html": new URL("" + new URL("cspell-dict-html-CKSgfv0t.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-html-symbol-entities": new URL("" + new URL("cspell-dict-html-symbol-entities-BDAig0br.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-java": new URL("" + new URL("cspell-dict-java-Bi39ylqo.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-julia": new URL("" + new URL("cspell-dict-julia-CttEmkC5.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-k8s": new URL("" + new URL("cspell-dict-k8s-CYKyVdBs.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-kotlin": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWtvdGxpbiIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LWtvdGxpbi9kaWN0L2tvdGxpbi50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZpYzNSeVlXTjBDbUZqZEhWaGJBcGhibTV2ZEdGMGFXOXVDbUZ6Q21KeVpXRnJDbUo1Q21OaGRHTm9DbU5zWVhOekNtTnZiWEJoYm1sdmJncGpiMjV6ZEFwamIyNXpkSEoxWTNSdmNncGpiMjUwYVc1MVpRcGpjbTl6YzJsdWJHbHVaUXBrWVhSaENtUmxiR1ZuWVhSbENtUnZDbVI1Ym1GdGFXTUtaV3h6WlFwbGJuVnRDbVY0Y0dWamRBcGxlSFJsY201aGJBcG1ZV3h6WlFwbWFXVnNaQXBtYVd4bENtWnBibUZzQ21acGJtRnNiSGtLWm05eUNtWjFiZ3BuWlhRS2FXWUthVzF3YjNKMENtbHVDbWx1Wm1sNENtbHVhWFFLYVc1c2FXNWxDbWx1Ym1WeUNtbHVkR1Z5Ym1Gc0NtbHpDbWwwQ214aGRHVnBibWwwQ201dmFXNXNhVzVsQ201MWJHd0tiMkpxWldOMENtOXdaVzRLYjNCbGNtRjBiM0lLYjNWMENtOTJaWEp5YVdSbENuQmhZMnRoWjJVS2NHRnlZVzBLY0hKcGRtRjBaUXB3Y205d1pYSjBlUXB3Y205MFpXTjBaV1FLY0hWaWJHbGpDbkpsWTJWcGRtVnlDbkpsYVdacFpXUUtjbVYwZFhKdUNuTmxZV3hsWkFwelpYUUtjMlYwY0dGeVlXMEtjM1Z3WlhJS2MzVnpjR1Z1WkFwMFlXbHNjbVZqQ25Sb2FYTUtkR2h5YjNjS2RISjFaUXAwY25rS2RIbHdaV0ZzYVdGekNuUjVjR1Z2WmdwMllXd0tkbUZzZFdVS2RtRnlZWEpuQ25kb1pXNEtkMmhsY21VS2QyaHBiR1VLIl1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-latex": new URL("" + new URL("cspell-dict-latex-D6L8yI-h.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-lorem-ipsum": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LWxvcmVtLWlwc3VtIiwiZW50cmllcyI6W1siL19fY3NwZWxsX3Zmcy9AY3NwZWxsL2RpY3QtbG9yZW0taXBzdW0vZGljdC9sb3JlbS50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZpQ21GakNtRmpZM1Z0YzJGdUNtRmpZM1Z6WVcxMWN3cGhZMk4xYzJGdWRHbDFiUXBoWkFwaFpHbHdhWE5qYVFwaFpHbHdhWE5qYVc1bkNtRmthWEJwYzJsamFXNW5DbUZsYm1WaGJncGhiR2xoY3dwaGJHbHhkV0VLWVd4cGNYVmhiUXBoYkdseGRXVjBDbUZzYVhGMWFXUUtZV3hwY1hWcGNBcGhiV1YwQ21GdWFXMEtZVzVwYldrS1lXNTBaUXBoY0dWeWFXRnRDbUZ3ZEdWdWRBcGhjbU5vYVhSbFkzUnZDbUZ5WTNVS1lYTndaWEpwYjNKbGN3cGhjM0JsY201aGRIVnlDbUZ6YzNWdFpXNWtZUXBoZEFwaGRIRjFaUXBoZFdOMGIzSUtZWFZuZFdVS1lYVjBDbUYxZEdVS1lYVjBaVzBLWW1WaGRHRmxDbUpwWW1WdVpIVnRDbUpzWVc1a2FYUUtZbXhoYm1ScGRHbHBjd3BqYVd4c2RXMEtZMnhoYzNNS1kyOXRiVzlrYVFwamIyMXRiMlJ2Q21OdmJtUnBiV1Z1ZEhWdENtTnZibWQxWlFwamIyNXpaV04wWlhSMWNncGpiMjV6WlhGMVlYUUtZMjl1YzJWeGRXRjBkWElLWTI5dWMyVnhkWFZ1ZEhWeUNtTnZiblZpYVdFS1kyOXVkbUZzYkdsekNtTnZjbkJ2Y21sekNtTnZjbkoxY0hScENtTnlZWE1LWTNWaWFXeHBZUXBqZFd4d1lRcGpkVzBLWTNWdGNYVmxDbU4xY0dsa1lYUmhkQXBqZFhCcFpHbDBZWFJsQ21OMWNtRmlhWFIxY2dwamRYSmhaUXBqZFhKemRYTUtaR0Z3YVdKMWN3cGtaV0pwZEdsekNtUmxiR1ZqZEhWekNtUmxiR1Z1YVhScENtUmxjMlZ5ZFc1MENtUnBZVzBLWkdsamRHRUtaR2xqZEhWdENtUnBZM1IxYlhOMENtUnBaMjVwYzNOcGJRcGthV2R1YVhOemFXMXZjd3BrYVhNS1pHbHpkR2x1WTNScGJ3cGtid3BrYjJ4dmNncGtiMnh2Y21VS1pHOXNiM0psYlFwa2IyeHZjbVZ0Y1hWbENtUnZiRzl5WlhNS1pHOXNiM0pwWW5WekNtUnZiRzl5ZFcwS1pHOXVaV01LWkhWamFXMTFjd3BrZFdrS1pIVnBjd3BsWVFwbFlYRjFaUXBsWVhKMWJRcGxabVpwWTJsMGRYSUtaV2RsYzNSaGN3cGxaMlYwQ21WcGRYTUtaV2wxYzIxdlpBcGxiR1ZwWm1WdVpBcGxiR1Z0Wlc1MGRXMEtaV3hwWjJWdVpHa0taV3hwZEFwbGJtbHRDbVZ2Y3dwbGNtRjBDbVZ5YjNNS1pYSnliM0lLWlhOelpRcGxjM1FLWlhRS1pYUnBZVzBLWlhVS1pYVnBjMjF2WkFwbGRXMEtaWFpsYm1sbGRBcGxlQXBsZUdObGNIUmxkWElLWlhoalpYQjBkWEpwQ21WNFpYSmphWFJoZEdsdmJncGxlR1Z5WTJsMFlYUnBiMjVsYlFwbGVIQmxaR2wwWVFwbGVIQnNhV05oWW04S1ptRmpaWEpsQ21aaFkybHNhWE1LWm1GamFXeHBjMmtLWm1GamFXeHBjMmx6Q21aaGJXVnpDbVpoZFdOcFluVnpDbVpsYkdsekNtWmxjbTFsYm5SMWJRcG1aWFZuYVdGMENtWnBibWxpZFhNS1puSnBibWRwYkd4aENtWjFaMkVLWm5WbmFXRjBDbVoxWjJsMENtWjFjMk5sQ21keVlYWnBaR0VLYUdGaWFYUmhiblFLYUdGaWFYUmhjM05sQ21oaFl3cG9ZVzFpZFhKblpXWnZibk1LYUdGdFluVnlaMlZtYjI1emRHbDJDbWhoYldKMWNtZGxkbTl1Y3dwb1lYSjFiUXBvWlc1a2NtVnlhWFFLYUdsakNtaHBiV1Z1WVdWdmN3cHBZV04xYkdsekNtbGtDbWxzYkc4S2FXeHNkVzBLYVcxd1pXUnBkQXBwYlhCbGNtUnBaWFFLYVc0S2FXNWpaWEIwYjNNS2FXNWphV1JwWkhWdWRBcHBibU5wWkhWdWRBcHBiblJsWjJWeUNtbHVkR1Z5WkhWdENtbHVkbVZ1ZEc5eVpRcHBjSE5oQ21sd2MyRnRDbWx3YzNWdENtbHlkWEpsQ21semRHVUthWFJoY1hWbENtbDFjbVVLYVhWemRHOEthblZ6ZEc4S2JHRmliM0psQ214aFltOXlhVzl6WVcwS2JHRmliM0pwY3dwc1lXSnZjblZ0Q214aFkybHVhV0VLYkdGamRYTUtiR0Z2Y21WbGRBcHNZWFZrWVc1MGFYVnRDbXhsWTNSMWN3cHNaVzhLYkdsaVpYSnZDbXhwWjNWc1lRcHNhWFJ2Y21FS2JHOWliM0owYVhNS2JHOXlaVzBLYkhWamRIVnpDbTFoWldObGJtRnpDbTFoWjI1aENtMWhaMjVoYlFwdFlXZHVhUXB0WVdkdWFYTUtiV0ZwYjNKbGN3cHRZV3hsYzNWaFpHRUtiV0Z6YzJFS2JXRjBkR2x6Q20xaGRYSnBjd3B0WVhocGJXVUtiV0Y0YVcxMWN3cHRaWFIxY3dwdGFRcHRhVzVwYlFwdGFXNXBiV0VLYldsdWRYTUtiVzlrYVFwdGIyeGxjM1JwWVdVS2JXOXNaWE4wYVdGekNtMXZiR1Z6ZEdsbENtMXZiR3hwY3dwdGIyeHNhWFFLYlc5c2JHbDBhV0VLYlc5dWRHVnpDbTF2Y21KcENtMTFjd3B1WVcwS2JtRnpZMlYwZFhJS2JtRjBiM0YxWlFwdVlYUjFjd3B1WldNS2JtVmpaWE56YVhSaGRHbGlkWE1LYm1WdGJ3cHVaWEYxWlFwdVpYTmphWFZ1ZEFwdVpYUjFjd3B1YVdKb0NtNXBhR2xzQ201cGMya0tibWx6YkFwdWIySnBjd3B1YjI0S2JtOXpkSEpoQ201dmMzUnlkV1FLYm05emRISjFiUXB1ZFd4c1lRcHVkV3hzWVcwS2JuVnRjWFZoYlFwdWRXNWpDbTlpWTJGbFkyRjBhUXB2WTJOaFpXTmhkQXB2WkdsdkNtOWthWFFLYjJabWFXTnBZUXB2Wm1acFkybHBjd3B2Ylc1cGN3cHZjSFJwYndwdmNtTnBDbTl5Ym1GeVpRcHdZWEpwWVhSMWNncHdZWEowZFhKcFpXNTBDbkJsYkd4bGJuUmxjM0YxWlFwd1pXNWhkR2xpZFhNS2NHVnlDbkJsY21abGNtVnVaR2x6Q25CbGNuTndhV05wWVhScGN3cHdhR0Z5WlhSeVlRcHdhR0Z6Wld4c2RYTUtjR3hoWTJWaGRBcHdiR0ZqWlhKaGRBcHdiR0YwWldFS2NHOXljbThLY0c5eWRHRUtjRzl5ZEhScGRHOXlDbkJ2YzNOcGJYVnpDbkJ2YzNWbGNtVUtjSEpoWlhObGJuUUtjSEpoWlhObGJuUnBkVzBLY0hKbGRHbDFiUXB3Y21sdGFYTUtjSEp2YVdSbGJuUUtjSEp2YVc0S2NISnZkbWxrWlc1MENuQjFiSFpwYm1GeUNuQjFjblZ6Q25GMVlXVUtjWFZoWlhKaGRBcHhkV0Z0Q25GMVlYTUtjWFZoYzJrS2NYVnBDbkYxYVdFS2NYVnBZblZ6WkdGdENuRjFhV1JsYlFweGRXbHpDbkYxYVhOeGRXRnRDbkYxYVhOeGRXVUtjWFZ2Q25GMWIyUUtjWFZ2Y3dweVlYUnBiMjVsQ25KbFkzVnpZVzVrWVdVS2NtVnBZMmxsYm1ScGN3cHlaVzBLY21Wd1pXeHNZWFFLY21Wd1pXeHNaVzVrZFhNS2NtVndjbVZvWlc1a1pYSnBkQXB5WlhCMVpHbGhibVJoWlFweVpYSjFiUXB5YUc5dVkzVnpDbkpwWkdsamRXeDFjd3B5YVhOMWN3cHlkWFJ5ZFcwS2MyRmxjR1VLYzJGbmFYUjBhWE1LYzJGd2FXVnVDbk5oY0dsbGJuUmxDbk5qWld4bGNtbHpjWFZsQ25ObFpBcHpaVzBLYzJWdGNHVnlDbk5sYm1WamRIVnpDbk5sY1hWcENuTnBiV2xzYVhGMVpRcHphVzUwQ25OcGRBcHpiMk5wYVhNS2MyOWphVzl6Y1hVS2MyOWtZV3hsY3dwemIyeHNhV05wZEhWa2FXNEtjMjlzZFhSaENuTjFiblFLYzNWelkybHdhWFFLYzNWemNHVnVaR2x6YzJVS2RHRmphWFJwQ25SbGJHeDFjd3AwWlcxd2IzSUtkR1Z0Y0c5eVlRcDBaVzF3YjNKbENuUmxiWEJ2Y21saWRYTUtkR1Z0Y0hWekNuUmxibVYwZFhJS2RHbHVZMmxrZFc1MENuUnZjbkYxWlc1MENuUnZjblJ2Y2dwMGIzUmhiUXAwY21semRHbHhkV1VLZEhWeWNHbHpDblZzYkdGdENuVnNiR0Z0WTI4S2RXeHNZVzFqYjNKd1pYSUtkV3gwY21salpYTUtkV3gwY21samFXVnpDblZ1WkdVS2RYSnVZUXAxZEFwMllYSnBkWE1LZG1Wb2FXTjFiR0VLZG1Wc0NuWmxiR2wwQ25abGJtVnVZWFJwY3dwMlpXNXBZVzBLZG1WeWFYUmhkR2x6Q25abGNtOEtkbVZ6ZEdsaWRXeDFiUXAyYVhSaFpRcDJhWFpoYlhWekNuWnBkbVZ5Y21FS2RtOXNkWEIwWVhNS2RtOXNkWEIwWVhSbENuWnZiSFZ3ZEdGMFpXMEtkbTlzZFhCMFlYUmxjd3AyYjJ4MWNIUmhkR2xpZFhNS2RtOXNkWEIwWVhSMWJRcDJiMngxZEhCaGRBcDJkV3h3ZFhSaGRHVUsiXV19", "" + import.meta.url).href,
	"@cspell/dict-lua": new URL("" + new URL("cspell-dict-lua-f9yD097M.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-makefile": new URL("" + new URL("cspell-dict-makefile-C8CJ2Uxl.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-monkeyc": new URL("" + new URL("cspell-dict-monkeyc-9yx0R7IA.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-node": new URL("" + new URL("cspell-dict-node-DzPVS5Mt.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-npm": new URL("" + new URL("cspell-dict-npm-CDx1FGs2.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-php": new URL("" + new URL("cspell-dict-php-DjQcwaf8.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-powershell": new URL("" + new URL("cspell-dict-powershell-mmkekZ7D.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-public-licenses": new URL("" + new URL("cspell-dict-public-licenses-BPXrVzM4.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-python": new URL("" + new URL("cspell-dict-python-DunV-pTr.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-r": new URL("" + new URL("cspell-dict-r-D1G0DDyQ.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-ruby": new URL("" + new URL("cspell-dict-ruby-rqNZ7xu-.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-rust": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LXJ1c3QiLCJlbnRyaWVzIjpbWyIvX19jc3BlbGxfdmZzL0Bjc3BlbGwvZGljdC1ydXN0L2RpY3QvY3JhdGVzLnR4dC5neiIsIkg0c0lBQUFBQUFBQUExVld5NjdrdUEzZDh5c2F5RnFMdVowZUlOa0ZTSUJaSkVBUXpONmdaZHBXV3hKMVNicGN2bDhmVUhiZDdsN1U0U0ZMcFFlZkJYLzVFclZSenNHWXMvNzl5MGJVUWtTbEw1V0R0cHdNNEIvUjBoUCtpYnIrQnh2ODYwSFYvaUNjU09DL3dtcndQM28veU9XdWxoWCtYSk9TQ0F2OEtSanAzN3dzcVM2QXZrczRhQVFrOVU5WVlnRmNVVmZBZXE1OEFMWW0vQVNVTVptZ25JQVNneDdZQUVYd2ZGQUVWQ1d4SVpZSlVNOGFRMXl4VnNxM3BqWjlNaUVzdDJLQ3lRQVBEWkhybkJiQTUxNWd4TGlaWHhGR1ZQcjlyekNtR25raWw5TkNGY1prYzhaRm5mamhZOGFOdnNKNEdwVTlicDJ3dUNPY0tVUXNxVEpFbElXSFFvWVRHa0o4YlJjanhIa0phWWE0Q3Z2Q0xvSjlRTXpZT2d5UlM4dGtCTEhnUmhBNXN3UTY1YVkwd2YyRVN6UVVKWEZGT1ZPWE5zd3NCYzJWUjNjV0trR1UrUFZ0UmpXSWtvd2tjWVVvckRxNm16N1pweis3eFVnS1JIMUFOQmFJSmpuQ2hKazJtRkN5UjNWQ1hRczI4SmNHY3ZkMUswbDYwRER1S2J0M2JyV3dFRXdKTXkrN1c5UGlXVE1sSWQ4K2tUcFhtTmlvUG01eHdyVFhTRENkTmNUTWxZQ210Mi9mZnZ0YnVPNUJ5VllTZUowOGlBTFZ4NUI1V2R6c2Z2TkhDOVlKNW94R2J6RG52UkRNOVFHekR2UTBRWmgzMjRYMEpUK2Q4S243elY5S1R2WkQyUzFsV0tnZndBV1daRyt3WkN5d1pCNDdLQmtzMG1KaVdESFA0QWsvQ2g4VlZvb2JyUFNFdFdDRWxRdkJ5bW9WblppMURtSGs2ZnpCcmdQWHZXQzE1T3ZPUm5MaDlWVmFxbDgyRlZ3SVVwM282ZUZKZFVvUkxjM09PRUtxYWdpZUI3M3VJUmtqZkUvekROODE2S253WGJrZU5CcHZWQ0hqeHptb29hVUlPWTBkTW1NUGRVNWpnY3dMWk5taFVJbXJ1Q2pZM3FENERSMkdaU2RWS0J3M3pCbktReDVRTVM4MENrSkZTdzhLM2pycTFBc2RhbnBDNVFLVkxjMG4xTDM0SjR4cFNkVTZ2Y3JrMmZtVlhwMm1hdVNCZDk2TFhwME81RHR3alRSRXlobTRVVFhLVk1qay9GVUxiTG45YWhwMDJxQ1hPVTFoem93R2ZIRG81YWpRM3I3OURnMWw4K3pMYk5CUWphQ2hyWlA3czVGRXF2YWpOcG9udmNOdzM3dVJMWUp0aGJiTzBGSU5UZmc3UmZ1Wlgwblh0dVhWd0pwUWp5aXBVN056dURwajR2cXl0RXhlK0UwNGhvSlIrTTE1SVZ0cDl6WGNyRitsOS9DT29SZnN6ZTFzdnZtZTg4UkhEYkdnYk5CTy9ncnZlNHBiZUpZTTd6c2JRUzh1aHlHdUdGZTh1YWRoWjFOU0V4QTB0RDJCNE1rVkpIcEg5RWNvQ0MzMEJMbW5pTGlUcExTZ0pCT0JLSUpvdjZucyt0NzlJSHYzWGt3RmMxZGk2R09rMCtGQm90N2Q1QnBIbHdpTnlwenk5ZHZYQ28wckZSUUZqZHhvMlZFbVVJcEM4UVNsOGlDQjZ4SWRoNnZKWDl6cjQ2WkM3VjQzN0pKN25HbTZEVWV5MVduQ1BQUTM2SXEvT2J3NWZBVk5TOFVjVnVZTk5KV1VVVUF6anFBRmMvYVpveHczc2pmUTkveUVxd1ovRHJXYTdPWENvUWRaUWZmUk1vR2VGZlRVVkdjR1F3R2owcm9IdktuMzVPMHNWY3lEcGcrM1ArMFFiR0NmQTl4NFMzeGh1TjE1S2ZkMHZaVCtzSnZ1ZFZHajZsRzZMTDBwR1pjTEJwcVNyNjBwWG5pbm5QRkJjbUhvcmUraVN2SklrY0NudEtmRkxjT3ZCZnl5Nmo1cWxEVDZUbkplRys4MWVUeUMwbEtvdXZ1NGZocVBOTmtLdTlBNzdKTGhGVDAvYWQvVEJBZm1iVW9DQjZvM24ydUsvNnlFMStBNGFPeHQwMlh2eXdlTmJVdTNDTUpzQ3NlYTRncEhxdGlTaTRrUGZjbis2dzhTanR6T1Rqd2tINm5CaC8rbitUOEdMcTdTcUFrQUFBPT0iXSxbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LXJ1c3QvZGljdC9ydXN0LnR4dC5neiIsIkg0c0lBQUFBQUFBQUF6V1N3VTZjTVF5RTcvTVVTRDF6S0NDRWVxTUZia0RGWG5wYjVVK2NYUXNuRG83ekw4dlRWMW5nNFBrbWtlSm9uT0RIV2V5TlJNNWRWZnF2czFlaWRoNURwN09xNTcwSk8zQ2JFbTR0NGpmN2JVMFR6emIxbnhydXlDaC82dU53M1BHS2V6TThWRHpVdWZGUW4yc2tQQTdCRSszd3BKWHdwSTYvd1p5RDNMOTl1MmRMZUtIOGgwVHdRZ1V2bzN1SUZDbzJKQm1idldDek4yeTBFRFpqUVZpNlc0aU9JTHlybWhGRU5DSjBoTjdKL0F0YmVzTkNjWjVhdUtZZFZTeXFna1hmc1JpRlY4UjlNRVRoMW82SXBTRnE3VDdWdVE1Q3RPQ0VSS2YybnphTmhrU2RqSVB3QnlFcGtnV3VJT2tFcXFPQW1uSDFMMGdGdlR0WlJiNjhRTDYrUXVZYUJGa2xJYXZOS3NHM3dYWWQvUE1hZkhrQnZyNEMzNEF6dURRQlYzQ05NaEp0dXh1NHo0dlp5U0RrRU5XR0VxSXBTcGpPNHg2RlJiaWphRUxSbFZCYWp5amRWcFRocytnZG1uTW4xd3h0emxxM1ZGZm9TbWFjQ0MxVWptaDZ5Rk1ZMzJHYThZcG1HcWY0eEZqUWhoSG1YekJxQmlNZlZtR2plenhwMGsvbTRpZU9oajdmdFpNbHdreWpHZDJEYzhRTTJOMjQ3amdmcHh2UjBVY2pRei9XQ05kWFZyZ1d3ZnkxY1Q5bjd4Ylk0Y2MyRzQwYmpEb2pGZjZnaEZGN3lEVHh0VHhZYUJpZE1FNXpYTmw4Qk1FaDlJTERub3h3MkxNUURzWk9VbkZra29RUGJ2Z1BVeWx5UFRFREFBQT0iXV19", "" + import.meta.url).href,
	"@cspell/dict-scala": new URL("" + new URL("cspell-dict-scala-FGJxFxMJ.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-shell": new URL("" + new URL("cspell-dict-shell-Cd7HNh8A.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-software-terms": new URL("" + new URL("cspell-dict-software-terms-DTN7SJem.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-sql": new URL("" + new URL("cspell-dict-sql-CjKEUwfO.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-svelte": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LXN2ZWx0ZSIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LXN2ZWx0ZS9kaWN0L3N2ZWx0ZS50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZqWTJWemN3cGhZMk5sYzNOcFltbHNhWFI1Q21GalkyVnpjMnRsZVFwaFkzUnBiMjRLWVdOMGFYWmxDbUZtZEdWeWRYQmtZWFJsQ21Gc2RBcGhibVFLWVc1cGJXRjBaUXBoY0drS1lYSmxDbUZ5YVdFS1lYTUtZWE56YVdkdWJXVnVkSE1LWVhOemIyTnBZWFJsWkFwaGRIUnlhV0oxZEdVS1lYUjBjbWxpZFhSbGN3cGhkWFJ2Wm05amRYTUtZWGRoYVhRS1ltVm1iM0psQ21KbFptOXlaWFZ3WkdGMFpRcGlaV2RwYmdwaWFXNWtDbUpzZFhJS1ltOWtlUXBqWVhCMGFXOXVDbU5zWVhOekNtTnNhV05yQ21Oc2FXVnVkQXBqYjIxdFpXNTBjd3BqYjIxd2FXeGxDbU52YlhCdmJtVnVkQXBqYjI1emRBcGpiMjUwWlc1MENtTnZiblJsZUhRS1kyOXVkSEp2YkFwamNtVmhkR1ZsZG1WdWRHUnBjM0JoZEdOb1pYSUtZM0psWVhSbGN3cGpjbVZoZEdsdVp3cGpjbTl6YzJaaFpHVUtZM1Z6ZEc5dENtUmhkR0VLWkdWaWRXY0taR1Z5YVhabFpBcGtaWE4wY205NUNtUnBjbVZqZEdsMlpYTUtaR2x6ZEhKaFkzUnBibWNLWkdsMkNtUnZZM01LWkhKaGR3cGxZV05vQ21WaGMybHVad3BsYkdWdFpXNTBDbVZzWlcxbGJuUnpDbVZzYzJVS1pYWmxiblJ1WVcxbENtVjJaVzUwY3dwbGVIQnZjblFLWlhod2NtVnpjMmx2Ym5NS1ptRmtaUXBtYkdsd0NtWnNlUXBtYmdwbWIzSnRZWFFLWm5KaFoyMWxiblFLWjJWMENtZGxkR0ZzYkdOdmJuUmxlSFJ6Q21kbGRHTnZiblJsZUhRS1oyVjBkR2x1WndwbmNtOTFjQXBuZEFwb1lYTUthR0Z6WTI5dWRHVjRkQXBvWVhabENtaGxZV1FLYUdsa1pHVnVDbWh5WldZS2FIUnRiQXBwWmdwcGJXY0thVzRLYVc1amIzSnlaV04wQ21sdWRHVnlZV04wYVhabENtbHVkbUZzYVdRS2EyVjVDbXhoWW1Wc0NteHBDbXgwQ20xaGNtdHpDbTFsWkdsaENtMXBjM0JzWVdObFpBcHRhWE56YVc1bkNtMXZaSFZzWlFwdGIzUnBiMjRLYlc5MWMyVUtibUZ0WlFwdVpYTjBaV1FLYm04S2JtOXVhVzUwWlhKaFkzUnBkbVVLYm05elkzSnZiR3dLYjI0S2IyNWtaWE4wY205NUNtOXViVzkxYm5RS2IzQjBhVzl1Y3dwdmRYUUtjR0Z5YzJVS2NHOXphWFJwZG1VS2NISmxabWw0Q25CeVpYQnliMk5sYzNNS2NISnZjQXB3Y205d1pYSjBlUXB3Y205d2N3cHlaV0ZqZEdsMlpRcHlaV0ZrWVdKc1pRcHlaV1IxYm1SaGJuUUtjbVZtWlhKbGJtTmxDbkpsWjJsemRHVnlDbkpsY1hWcGNtVmtDbkp2YkdVS2NtOXNaWE1LY25WdUNuTmpZV3hsQ25OamIzQmxDbk5qY21sd2RBcHpaV04wYVc5dUNuTmxiR1lLYzJWeWRtVnlDbk5sZEFwelpYUmpiMjUwWlhoMENuTnBaR1VLYzJsa1pXSmhjZ3B6Ykdsa1pRcHpiRzkwQ25Oc2IzUnpDbk53Y21sdVp3cHpkR0Z5ZEdWa0NuTjBZWFJsYldWdWRBcHpkRzl5WlFwemRHOXlaWE1LYzNSeWRXTjBkWEpsQ25OMGVXeGxDbk4xWW5OamNtbGlaUXB6ZFdKelkzSnBjSFJwYjI0S2MzVmljMlZqZEdsdmJncHpkbVZzZEdVS2MzWmxiSFJsYW5NS2MzWmxiSFJsYTJsMENuTjViblJoZUFwMFlXSnBibVJsZUFwMFlXZHpDblJsYlhCc1lYUmxDblJsZUhRS2RHaGxhWElLZEdocGN3cDBhV05yQ25ScGJXVUtkRzhLZEc5akNuUnlZVzV6YVhScGIyNEtkSGRsWlc1bFpBcDBlWEJsQ25Wc0NuVnVhMjV2ZDI0S2RYTmxDblpoYkhWbENuWmhiSFZsY3dwMlpYSnphVzl1Q25kaGJHc0tkMkZ5Ym1sdVozTUtkMlVLZDJsdVpHOTNDbmRwZEdnS2QzSnBkR0ZpYkdVSyJdXX0=", "" + import.meta.url).href,
	"@cspell/dict-swift": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LXN3aWZ0IiwiZW50cmllcyI6W1siL19fY3NwZWxsX3Zmcy9AY3NwZWxsL2RpY3Qtc3dpZnQvc3dpZnQudHh0Lmd6IiwiSDRzSUFBQUFBQUFBQTMxWXpYTGpPQTYrNHltbWFzOXoyRDN1TGJIVE02NU80cTQ0M1ZNMUZ4Wk1RakluRktnbUtUdnFwOThDS01seXBuY09KZ0dRTkVuOGZoVDg2eGViZXdyaDF4Smp5UC85NVkyby85VmlwbDg0L3ByNzRBdkFYUWdiekpUaGprZTRTd25IUjE4b1lYZ0kxQkVYdU12WnR5emtsMFNXSExFbHVNc2oyNTNNS3pIQlhZbWR0NDhSM1Q0NVNwN2JTWFFvTWRFSDJkZmVZVmtKQjVrVENMTnc5ekVHUXA2TzhEcjJCUGVERDhVemJINzdGQ0lXMkh6RGRKZGEyR0F1bnR2Vm9UWW41SlpnRTUwMm50dlBOR2JZUkM3MFhtQVRFMzJLQXpzc1ByS3l2eVhzVDk1bVpaN0llWVF0cG90bjJKS05EbytCS2tVSnR0VGdFTlpLbURYMHdQTmNwU2pCdzNzaGR1VDAvNm1qVFJoeW9iUytsbDdtUm5BOTJxZUJyUkIzS2NYTGFzUGZQdTg0OTJTTGJ2WTc1cE1TdS9zN25RNjcreTJKc1NicGV2THVmaitVUUFWMjl3ZHFCNXBYY0tIMjltQ0xWVC9US0Q5eXFnSFByU2dTUFZPcVlyM3NqZmp4Y1h1L3BlUFF0cFRtTzhEejRhN3ZnN2Q2dFNmMEl0bkVmaFJ6UHgrZWtMRWxCODgrYkNJR3l2YldwdnZEWTJ4ciswUTVZenVKOUtqNzQxOWtpei9UQnZZOThmMWhDL3RldHNFQVgxSXMwY1lBTDNqNWhtRWdlS0Vtek9vNGtKQXhDZEhBZ2JqYTcxQ1NkN1NRM0lwK1VoOUR0VXVWclpWMXVQaW1QS09jNGZsUWp3T3Y0b1ZjdnRVTlhpa3hwbkYxSlYzNGRmZFJLMS9aaS9NY0xBYThNY2kzNkIzODRmbXcvU3lkaTVjTVpoTXdTeGZaRGlrUjJ4SE0xamNOSmVMaTYzSE4xdWVTL0hFbzVNQThwQlNUL3FGNXd2Y3BxdFFMUHdvbnA2amllcmxwdThxOFVMT0pBeGR5MDQzTjFSQjEwV3dGdFdyWFkvSTVjaDM2KytMWDVNOGV3MExjbGFlWVJWNDIrZC8vTWFyaWVlNVhmdU40NFVjYzQxREFtTTMrOGV2VHN6Rmd6S2ZkNDBNbHZqNXZYbmY3S24zY1BWY3BoZ3VPR1l5eGtmUFFpZmNaSXpub1RNNFFENTJoN3dPRy9GRWFLR2RUVHNpcmdWelNZTXQxZ2M4djFNVWlRUlVUR0JPUGYxbHpUTjZKWnh1VDhHSmN0TWJHVHZPRk1abEtvV1RRV2hLMW1qeHlPVkgyUDhpWmZuWmNnMkZLdkRDZC9xSHpaY2NsYm9LdjBweXBPNGJ4bTg5cTcyT1VoQ0Y3MXMxZjR5cEN6TEZhOXpiRkx1Si9UbG5MdEhYYVdvUzNXV1FSMzRUTEl2MlpuNE94anF4MEFibmRkWDFNaGRMaHFwWHFPN0lPakIxeWlSMFlWeE95S24xTHVhUTQzZ3AzN0l2SDRIOFFHT2R6ZytlWXlPM1BsRUpFcDdJNVBENzh5WWVCYXQyYnZ4c1pPMjlmcUE5b2F4VXcxRFJrU3daRGJFUE1tajF5UVFsNVErOTZKUWVtOGUva1RKZ2N1SW5wNk4yQmt2Nng1L2FGTklSbFRaUGlEMkl3Sjh6VDFqV1BpZURKWjlsZ1N2ZUYzUFZ3S2VzTUtiMlNMWTN2K2xxbk5DbnNPWXdyV2E2MHQ3NUlKdHhnWDRZa2kvaEV5VmMxenZWekZ1Wk41RE94bDFQZWJ0dGhlcU1FcHB0TzkwR05yd2s1aXg3QWNPUUhkVE0xUGtlT1owcVNlOEZ3MWt5MUVOdllTWHJVb0hvWnVQaU9uckdqS3BDbEp1Q1AwU1NTWTB5SkwvYjRmYUFYS2tQU3RMTnZSRlo4cDhhTHliZWVNWVJ4UzQxblVSNllQdmt6RmhJaVNzeVFVMjEvU2JHblZFWXdpWExCbXJZMm04aE5URjIxYmFZT3VRaUtNUGtVTDhhejhWSTJHdFJSSDFwaXczcGtxY2V6QzExcERiMGF3Ym4zWUdRZmI2K3FsUjJmcUtERGdtQ3k1RVBEbW9tckRsTFZpamxpSmpCRnRZeEpmYktNUFQwa3pHS1ZnVE0ySkxWbXlsTlZzQlEvYzY3dWRTRjhlL1Q4Umc1UUoyS05BWFJqSmE5MnJLekVKczR3RWtOUTFJVWgvRWtwS2hGdGJmL3c1ZlJuWkFMc2UySjNXMXlyYkU0SXVFS2lnQmxRVWVqT1NYVXJvN0RSZWpGSDBkMG4xcC9yNE1pMnRyOGp1MEFKc096WTBUdTV3M0RNTnZtK0FKWWlmeVk3RCtVazE5UXVTeDhsZ0NVUWNFR25vbzB6K3FDcU9vWm8zMHllUXV4NG0xR1A4UjJPaWZBTmprTUxrdldjNHVwSzNzdlNTajc0Y3FJMDBlOTlvcXhPb1B3bmNkQVh5a01vVmJCcmF2L29PeThCVmMvaWcxeFlCeGJrY3h6QllnaDNlWUZnd2hLWmRzQ0VYSWpjTElrWFZpWVRXQ3oyQkZicnZMWWFaQlhoZmNGeUFodERYUEsxaldIb0dHenNqcDVsbWlTVWR6bUxYWVhHaXM3Q1REQlJLTStEanMrSlpLTHJjV00vSnQrZUNsaEJDaUR2QlhCVUhja0p2dHhTTmFMTWRvclBwMjdYZkVtVXhmWGRCTnVuZ2lDOWNwNjlNQnJ0L2t6Z3ZPb0kwK0p0VGhKeUFYZEZVMkx5RlN0VHNzV2tZVFBaYUZVeXdFVndPWjdVOVdDcUZITy93VkJkYU9LZnFEdkt1ZGJjWTR4dlF6L0xUQmFJT2pHU3RPUXZnRUltYlh3RHBLK09xYnRxZ0tiSENMSFRTZDhIR21UVzBBR2wrdHdpemJTMFNyT1VMZlk2OU41VDhsclo2SitoQVMzcHE4RVF5aW5Gb1QwSm5Ra2FIMnF6MjJvM3J4RmF2VXFJT2ZVMjR2UFErSlFMTkd1YzBjUWtQM21RMUc0ZHgwMktuVFl2ZUlHcFpqWURXMjNVUTFvcTBJWjR4RkFUM3lvT2hIUnd3bnpTcGhaWW9TaUIzeC9rdDhMcDEwVHRIWGpOUlkyWG1YTmE4ZzM0RHR2bG1sNlJ6TlFoRi9BTW5oV0NUdXc2S0QwN253VG1lbTc4TzZpblNqT1hjcjlHQWY2S1Jqd0hYOTk4U2trbjRFSmJBWkdZcDhFeUw3MkJhMXFzZUNhV2ZIekRLV1FYVVFUUFp3emV6WDkxeHVUMUtobDhsdG5rNEkxR05lNmJXT3ArbFA0U2t3TXAxQkNvS1NBdlVUMXFxSWZZWUk5V05LaklMRVM3RlBNM0dxRkR1OEdDWWN4bFRmL1VNaDNhL2FHMi8yZmNTL05HdDU4d1JMSmlKQmQyOFV6UURWS011VjJJK2I1TXVaQzd2bjFaSUJMN0lMOVpzeHkzMTBURFVXTkxDTlptVVJkSFhyWlowY3RPa2FYTUE4ZENvSlEwTlZWa3BVMUhCYlVRUnNYN2QzK3ZkblhnMDkraUp6Wk5wZ0l4VEFhTlBiRTI1S1NyK29oemFSRzNXcEJhTFI0OUp1eW9VSUkraXNzUTlERVhHOWw1ZFNQaHhKdjc2d1A0U3JZcERyM3kxL21KNnZTYUV4WTBCcmU0VEZnRlpuOGtBUTRKbG1kVG4ybHdzU1dtNUMzMHd6Rm9GOElSN1J1aytXdEFvZ29UWkc5NWxqbHlhMXB1Q1lrRTBVNWRoa1E5WVlGRTN3ZWZkTG9TZVNFVUVkUW5uSjdOU0pESzhBMTJTWlJqT01zSnBITEltOXZwWHBJNUx6SmJVT3ZVWmFpRk1LdUdJQk5oeUJIeS9QbENhNE1ZTU5QOFJzNG5sTU5sMzBraitzNnhrMlpJbGg1ampRZW9HQk5tQ0pOLzhyVWozenpmS2xkMVY5Ky9rQmN2eW9PWVFOdjVjNWt5OC9ld2ZQRVNVUVZiS0FLakpSMlZrN2R2MGpMb3pXRzZmNGxRb3VUeUVsMkVzbUROaWNvRUpRM1NqRkRPKzRNMlA0MTBEUWhwbm55dUVTMk01a01ZMko3SUNzUWQyRkVLOGpXcVBqdUduejFQQjY3T1B2VVA3MlFGR002ODhjeVVUQTBBa1FxdU5od3JQQy9ZdHVJVU42TmgvTW9YZFYwSGcrYm5UeWwydTVxL0J5M09GWTZmTWNHWmt0N29nb25Od1BMWlFRcVBtejhnaUZ4V1hPU1crOFBjLzFRcmd1N2hjaUlXVndoQ0pZTExTZXIweFljZ3lPZml5MG1idTlRTzlaVW8zT2VheFZmQzZmeFRYMzFqOUJTYzZaREhpWXppZ2twbStFRXB3djhBTy9jZHlwY1dBQUE9Il1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-terraform": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LXRlcnJhZm9ybSIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LXRlcnJhZm9ybS9kaWN0L3RlcnJhZm9ybS50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZpY3dwaFluTndZWFJvQ21Gc2JIUnlkV1VLWVc1NWRISjFaUXBoZFhSdmJXOTFiblFLWVhwMWNtVmhaQXBqYUdScGNncGphRzl0Y0FwamFIVnVhMnhwYzNRS1kybGtjbWh2YzNRS1kybGtjbTVsZEcxaGMyc0tZMmxrY25OMVltNWxkQXBqYVdSeWMzVmlibVYwY3dwamIyRnNaWE5qWlFwamIyRnNaWE5qWld4cGMzUUtZMjl0Y0dGamRBcGpiMjVqWVhRS1kzTjJaR1ZqYjJSbENtUnBjbTVoYldVS1pHbHpkR2x1WTNRS1pXeGxiV1Z1ZEFwbGJtUnpkMmwwYUFwbGNHaGxiV1Z5WVd4aGMyNTFiR3dLWm1sc1pRcG1hV3hsWW1GelpUWTBDbVpwYkdWaVlYTmxOalJ6YUdFeU5UWUtabWxzWldKaGMyVTJOSE5vWVRVeE1ncG1hV3hsWlhocGMzUnpDbVpwYkdWdFpEVUtabWxzWlhObGRBcG1hV3hsYzJoaE1RcG1hV3hsYzJoaE1qVTJDbVpwYkdWemFHRTFNVElLWm14aGRIUmxiZ3BtYjNKdFlYUUtabTl5YldGMFpHRjBaUXBtYjNKdFlYUnNhWE4wQ21sdVpHVnVkQXBwYm1SbGVBcHBjM05sYm5OcGRHbDJaUXBxYjJsdUNtcHpiMjVrWldOdlpHVUthbk52Ym1WdVkyOWtaUXByWlhsekNteGxibWQwYUFwc2FYTjBDbXh2Wndwc2IyOXJkWEFLYkc5M1pYSUtiV0Z3Q20xaGRHTm9hMlY1Y3dwdFlYZ0tiV1Z5WjJVS2JXbHVDbkJoY25ObGFXNTBDbkJoZEdobGVIQmhibVFLY0d4aGJuUnBiV1Z6ZEdGdGNBcHdiM2NLY21WblpYaGhiR3dLY21Wd2JHRmpaUXB5YzJGa1pXTnllWEIwQ25ObGRHbHVkR1Z5YzJWamRHbHZiZ3B6WlhSd2NtOWtkV04wQ25ObGRITjFZblJ5WVdOMENuTmxkSFZ1YVc5dUNuTm9ZVEVLYzJoaE1qVTJDbk5wWjI1MWJRcHpiR2xqWlFwemIzSjBDbk53YkdsMENuTjBZWEowYzNkcGRHZ0tjM1J5WTI5dWRHRnBibk1LYzNSeWNtVjJDbk4xWW5OMGNncDBaVzF3YkdGMFpXWnBiR1VLZEdWdGNHeGhkR1Z6ZEhKcGJtY0tkR1Z5Y21GbWIzSnRjbU1LZEdWNGRHUmxZMjlrWldKaGMyVTJOQXAwWlhoMFpXNWpiMlJsWW1GelpUWTBDblJtYkdsdWRBcDBabk5sWXdwMFpuTjBZWFJsQ25SbWRIQnNDblJtZG1GeWN3cDBhVzFsWVdSa0NuUnBiV1ZqYlhBS2RHbHRaWE4wWVcxd0NuUnBkR3hsQ25SdlltOXZiQXAwYjJ4cGMzUUtkRzl0WVhBS2RHOXVkVzFpWlhJS2RHOXpaWFFLZEc5emRISnBibWNLZEhKaGJuTndiM05sQ25SeWFXMXdjbVZtYVhnS2RISnBiWE53WVdObENuUnlhVzF6ZFdabWFYZ0tkWEJ3WlhJS2RYSnNaVzVqYjJSbENuVjFhV1FLZFhWcFpIWTFDblpoYkhWbGN3cDVZVzFzWkdWamIyUmxDbmxoYld4bGJtTnZaR1VLZW1sd2JXRndDZz09Il1dfQ==", "" + import.meta.url).href,
	"@cspell/dict-typescript": new URL("" + new URL("cspell-dict-typescript-1Sz31GMI.json", import.meta.url).href, "" + import.meta.url).href,
	"@cspell/dict-zig": new URL("data:application/json;base64,eyJwYWNrYWdlIjoiQGNzcGVsbC9kaWN0LXppZyIsImVudHJpZXMiOltbIi9fX2NzcGVsbF92ZnMvQGNzcGVsbC9kaWN0LXppZy9kaWN0L3ppZy50eHQiLCJDaU1nWTNOd1pXeHNMWFJ2YjJ4ek9pQnJaV1Z3TFdOaGMyVWdibTh0YzNCc2FYUUtDbUZrWkhKemNHRmpaUXBoYkdsbmJncGhiR3h2ZDNwbGNtOEtZVzVrQ21GdWVXVnljbTl5Q21GdWVXWnlZVzFsQ21GdWVXOXdZWEYxWlFwaGJubDBlWEJsQ21GemJRcGhjM2x1WXdwaGQyRnBkQXBpYjI5c0NtSnlaV0ZyQ21OZlkyaGhjZ3BqWDJsdWRBcGpYMnh2Ym1jS1kxOXNiMjVuWkc5MVlteGxDbU5mYkc5dVoyeHZibWNLWTE5emFHOXlkQXBqWDNWcGJuUUtZMTkxYkc5dVp3cGpYM1ZzYjI1bmJHOXVad3BqWDNWemFHOXlkQXBqWDNadmFXUUtZMkZzYkdOdmJuWUtZMkZ1WTJWc0NtTmhkR05vQ21OdmJYQjBhVzFsQ21OdmJYQjBhVzFsWDJac2IyRjBDbU52YlhCMGFXMWxYMmx1ZEFwamIyNXpkQXBqYjI1MGFXNTFaUXBrWldabGNncGtaV2x1YVhRS1pXeHpaUXBsYm5WdENtVnljbVJsWm1WeUNtVnljbTl5Q21WNGNHOXlkQXBsZUhSbGNtNEtaakV5T0FwbU1UWUtaak15Q21ZMk5BcG1PREFLWm1Gc2MyVUtabTRLWm05eUNtbGNaQ3NLYVdZS2FXNXNhVzVsQ21semFYcGxDbXhwWWlzS2JHbHVhM05sWTNScGIyNEtiWFZzZEdsb1lYTm9DbTVoYTJWa1kyTUtibTloYkdsaGN3cHViMmx1YkdsdVpRcHViM0psZEhWeWJncHViM04xYzNCbGJtUUtiblZzYkFwdmNHRnhkV1VLYjNJS2IzSmxiSE5sQ25CaFkydGxaQXB3Y205dGFYTmxDbkIxWWdweVpYTjFiV1VLY21WMGRYSnVDbk5sWTNScGIyNEtjM1JrWTJGc2JHTmpDbk4wY25WamRBcHpkWE53Wlc1a0NuTjNhWFJqYUFwMFpYTjBDblJvY21WaFpHeHZZMkZzQ25SeWRXVUtkSEo1Q25SNWNHVUtkVnhrS3dwMWJtUmxabWx1WldRS2RXNXBiMjRLZFc1eVpXRmphR0ZpYkdVS2RYTmxDblZ6YVc1bmJtRnRaWE53WVdObENuVnphWHBsQ25aaGNncDJiMmxrQ25admJHRjBhV3hsQ25kb2FXeGxDZz09Il1dfQ==", "" + import.meta.url).href
};
const globalScope = typeof globalThis === "undefined" ? void 0 : globalThis;
if (globalScope) globalScope.__aceSpellCheckDictAssetUrls = {
	...globalScope.__aceSpellCheckDictAssetUrls || {},
	...dictAssetUrlsByPackage
};
//#endregion
//#region packages/demo/webworker-change-mode/webworker.ts
let manager = new import_service_manager.ServiceManager(self);
manager.registerService("html", {
	features: { signatureHelp: false },
	module: () => import("./html-service-DRigKcvi.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "HtmlService",
	modes: "html"
});
manager.registerService("css", {
	features: { signatureHelp: false },
	module: () => import("./css-service-DWn_i70C.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "CssService",
	modes: "css"
});
manager.registerService("less", {
	features: { signatureHelp: false },
	module: () => import("./css-service-DWn_i70C.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "CssService",
	modes: "less"
});
manager.registerService("scss", {
	features: { signatureHelp: false },
	module: () => import("./css-service-DWn_i70C.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "CssService",
	modes: "scss"
});
manager.registerService("json", {
	features: {
		signatureHelp: false,
		documentHighlight: false
	},
	module: () => import("./json-service-D7O7AS8g.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "JsonService",
	modes: "json"
});
manager.registerService("typescript", {
	module: () => import("./typescript-service-CiCwIRDw.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "TypescriptService",
	modes: "typescript|tsx|javascript|jsx"
});
manager.registerService("lua", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./lua-service-CVJgRsFd.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "LuaService",
	modes: "lua"
});
manager.registerService("yaml", {
	features: {
		signatureHelp: false,
		documentHighlight: false
	},
	module: () => import("./yaml-service-BsVNTa-a.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "YamlService",
	modes: "yaml"
});
manager.registerService("xml", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./xml-service-BSByW-4Y.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "XmlService",
	modes: "xml"
});
manager.registerService("php", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./php-service-DmaNNXx1.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "PhpService",
	modes: "php"
});
manager.registerService("javascript", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./javascript-service-BjBIbLPi.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "JavascriptService",
	modes: "javascript"
});
manager.registerService("python", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: true,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./python-service-XcJCWAbA.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "PythonService",
	modes: "python"
});
manager.registerService("mysql", {
	module: () => import("./mysql-service-B2LFWn_5.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "MySQLService",
	modes: "mysql"
});
manager.registerService("ace-spell-check", {
	module: () => import("./ace-spell-check-BfRz1DWJ.js").then((m) => /* @__PURE__ */ __toESM(m.default)),
	className: "AceSpellCheck",
	modes: "*"
});
//#endregion
export { __require as n, __commonJSMin as t };
