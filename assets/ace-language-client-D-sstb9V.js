import { o as __toESM, t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { r as LanguageProvider } from "./utils-cKgy90LS.js";
import { j as notEmpty, k as mergeObjects, y as MessageType } from "./message-types-M_uv5dSK.js";
var ServiceManager = class ServiceManager {
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
var import_events = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var R = typeof Reflect === "object" ? Reflect : null;
	var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply$1(target, receiver, args) {
		return Function.prototype.apply.call(target, receiver, args);
	};
	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
	else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys$1(target) {
		return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
	};
	else ReflectOwnKeys = function ReflectOwnKeys$1(target) {
		return Object.getOwnPropertyNames(target);
	};
	function ProcessEmitWarning(warning) {
		if (console && console.warn) console.warn(warning);
	}
	var NumberIsNaN = Number.isNaN || function NumberIsNaN$1(value) {
		return value !== value;
	};
	function EventEmitter$1() {
		EventEmitter$1.init.call(this);
	}
	module.exports = EventEmitter$1;
	module.exports.once = once;
	EventEmitter$1.EventEmitter = EventEmitter$1;
	EventEmitter$1.prototype._events = void 0;
	EventEmitter$1.prototype._eventsCount = 0;
	EventEmitter$1.prototype._maxListeners = void 0;
	var defaultMaxListeners = 10;
	function checkListener(listener) {
		if (typeof listener !== "function") throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof listener);
	}
	Object.defineProperty(EventEmitter$1, "defaultMaxListeners", {
		enumerable: true,
		get: function() {
			return defaultMaxListeners;
		},
		set: function(arg) {
			if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + arg + ".");
			defaultMaxListeners = arg;
		}
	});
	EventEmitter$1.init = function() {
		if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
			this._events = Object.create(null);
			this._eventsCount = 0;
		}
		this._maxListeners = this._maxListeners || void 0;
	};
	EventEmitter$1.prototype.setMaxListeners = function setMaxListeners(n) {
		if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + n + ".");
		this._maxListeners = n;
		return this;
	};
	function _getMaxListeners(that) {
		if (that._maxListeners === void 0) return EventEmitter$1.defaultMaxListeners;
		return that._maxListeners;
	}
	EventEmitter$1.prototype.getMaxListeners = function getMaxListeners() {
		return _getMaxListeners(this);
	};
	EventEmitter$1.prototype.emit = function emit(type) {
		var args = [];
		for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
		var doError = type === "error";
		var events = this._events;
		if (events !== void 0) doError = doError && events.error === void 0;
		else if (!doError) return false;
		if (doError) {
			var er;
			if (args.length > 0) er = args[0];
			if (er instanceof Error) throw er;
			var err = /* @__PURE__ */ new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
			err.context = er;
			throw err;
		}
		var handler = events[type];
		if (handler === void 0) return false;
		if (typeof handler === "function") ReflectApply(handler, this, args);
		else {
			var len = handler.length;
			var listeners = arrayClone(handler, len);
			for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
		}
		return true;
	};
	function _addListener(target, type, listener, prepend) {
		var m;
		var events;
		var existing;
		checkListener(listener);
		events = target._events;
		if (events === void 0) {
			events = target._events = Object.create(null);
			target._eventsCount = 0;
		} else {
			if (events.newListener !== void 0) {
				target.emit("newListener", type, listener.listener ? listener.listener : listener);
				events = target._events;
			}
			existing = events[type];
		}
		if (existing === void 0) {
			existing = events[type] = listener;
			++target._eventsCount;
		} else {
			if (typeof existing === "function") existing = events[type] = prepend ? [listener, existing] : [existing, listener];
			else if (prepend) existing.unshift(listener);
			else existing.push(listener);
			m = _getMaxListeners(target);
			if (m > 0 && existing.length > m && !existing.warned) {
				existing.warned = true;
				var w = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
				w.name = "MaxListenersExceededWarning";
				w.emitter = target;
				w.type = type;
				w.count = existing.length;
				ProcessEmitWarning(w);
			}
		}
		return target;
	}
	EventEmitter$1.prototype.addListener = function addListener(type, listener) {
		return _addListener(this, type, listener, false);
	};
	EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;
	EventEmitter$1.prototype.prependListener = function prependListener(type, listener) {
		return _addListener(this, type, listener, true);
	};
	function onceWrapper() {
		if (!this.fired) {
			this.target.removeListener(this.type, this.wrapFn);
			this.fired = true;
			if (arguments.length === 0) return this.listener.call(this.target);
			return this.listener.apply(this.target, arguments);
		}
	}
	function _onceWrap(target, type, listener) {
		var state = {
			fired: false,
			wrapFn: void 0,
			target,
			type,
			listener
		};
		var wrapped = onceWrapper.bind(state);
		wrapped.listener = listener;
		state.wrapFn = wrapped;
		return wrapped;
	}
	EventEmitter$1.prototype.once = function once$1(type, listener) {
		checkListener(listener);
		this.on(type, _onceWrap(this, type, listener));
		return this;
	};
	EventEmitter$1.prototype.prependOnceListener = function prependOnceListener(type, listener) {
		checkListener(listener);
		this.prependListener(type, _onceWrap(this, type, listener));
		return this;
	};
	EventEmitter$1.prototype.removeListener = function removeListener(type, listener) {
		var list, events, position, i, originalListener;
		checkListener(listener);
		events = this._events;
		if (events === void 0) return this;
		list = events[type];
		if (list === void 0) return this;
		if (list === listener || list.listener === listener) if (--this._eventsCount === 0) this._events = Object.create(null);
		else {
			delete events[type];
			if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
		}
		else if (typeof list !== "function") {
			position = -1;
			for (i = list.length - 1; i >= 0; i--) if (list[i] === listener || list[i].listener === listener) {
				originalListener = list[i].listener;
				position = i;
				break;
			}
			if (position < 0) return this;
			if (position === 0) list.shift();
			else spliceOne(list, position);
			if (list.length === 1) events[type] = list[0];
			if (events.removeListener !== void 0) this.emit("removeListener", type, originalListener || listener);
		}
		return this;
	};
	EventEmitter$1.prototype.off = EventEmitter$1.prototype.removeListener;
	EventEmitter$1.prototype.removeAllListeners = function removeAllListeners(type) {
		var listeners, events = this._events, i;
		if (events === void 0) return this;
		if (events.removeListener === void 0) {
			if (arguments.length === 0) {
				this._events = Object.create(null);
				this._eventsCount = 0;
			} else if (events[type] !== void 0) if (--this._eventsCount === 0) this._events = Object.create(null);
			else delete events[type];
			return this;
		}
		if (arguments.length === 0) {
			var keys = Object.keys(events);
			var key;
			for (i = 0; i < keys.length; ++i) {
				key = keys[i];
				if (key === "removeListener") continue;
				this.removeAllListeners(key);
			}
			this.removeAllListeners("removeListener");
			this._events = Object.create(null);
			this._eventsCount = 0;
			return this;
		}
		listeners = events[type];
		if (typeof listeners === "function") this.removeListener(type, listeners);
		else if (listeners !== void 0) for (i = listeners.length - 1; i >= 0; i--) this.removeListener(type, listeners[i]);
		return this;
	};
	function _listeners(target, type, unwrap) {
		var events = target._events;
		if (events === void 0) return [];
		var evlistener = events[type];
		if (evlistener === void 0) return [];
		if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];
		return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}
	EventEmitter$1.prototype.listeners = function listeners(type) {
		return _listeners(this, type, true);
	};
	EventEmitter$1.prototype.rawListeners = function rawListeners(type) {
		return _listeners(this, type, false);
	};
	EventEmitter$1.listenerCount = function(emitter, type) {
		if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
		else return listenerCount.call(emitter, type);
	};
	EventEmitter$1.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
		var events = this._events;
		if (events !== void 0) {
			var evlistener = events[type];
			if (typeof evlistener === "function") return 1;
			else if (evlistener !== void 0) return evlistener.length;
		}
		return 0;
	}
	EventEmitter$1.prototype.eventNames = function eventNames() {
		return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};
	function arrayClone(arr, n) {
		var copy = new Array(n);
		for (var i = 0; i < n; ++i) copy[i] = arr[i];
		return copy;
	}
	function spliceOne(list, index) {
		for (; index + 1 < list.length; index++) list[index] = list[index + 1];
		list.pop();
	}
	function unwrapListeners(arr) {
		var ret = new Array(arr.length);
		for (var i = 0; i < ret.length; ++i) ret[i] = arr[i].listener || arr[i];
		return ret;
	}
	function once(emitter, name) {
		return new Promise(function(resolve, reject) {
			function errorListener(err) {
				emitter.removeListener(name, resolver);
				reject(err);
			}
			function resolver() {
				if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
				resolve([].slice.call(arguments));
			}
			eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
			if (name !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
		});
	}
	function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
		if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
	}
	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
		if (typeof emitter.on === "function") if (flags.once) emitter.once(name, listener);
		else emitter.on(name, listener);
		else if (typeof emitter.addEventListener === "function") emitter.addEventListener(name, function wrapListener(arg) {
			if (flags.once) emitter.removeEventListener(name, wrapListener);
			listener(arg);
		});
		else throw new TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof emitter);
	}
})))());
var MockWorker = class extends import_events.default {
	constructor(isProduction) {
		super();
		this.isProduction = isProduction;
	}
	onerror(ev) {}
	onmessage(ev) {}
	onmessageerror(ev) {}
	addEventListener(type, listener, options) {
		this.addListener(type, listener);
	}
	dispatchEvent(event) {
		return false;
	}
	postMessage(data, transfer) {
		if (this.isProduction) this.$emitter.emit("message", { data });
		else setTimeout(() => {
			this.$emitter.emit("message", { data });
		}, 0);
	}
	removeEventListener(type, listener, options) {
		this.removeListener(type, listener);
	}
	terminate() {}
	setEmitter(emitter) {
		this.$emitter = emitter;
	}
	removeAllListeners() {
		return super.removeAllListeners();
	}
};
var serviceManager, client;
var AceLanguageClient = class {
	static for(servers, options) {
		if (!serviceManager) {
			client = new MockWorker(true);
			let ctx = new MockWorker(true);
			client.setEmitter(ctx);
			ctx.setEmitter(client);
			serviceManager = new ServiceManager(ctx);
		}
		if (servers instanceof Array) servers.forEach((serverData, index) => {
			serviceManager.registerServer(serverData.serviceName ?? "server" + index, serverData);
		});
		else serviceManager.registerServer(servers.serviceName ?? "server", servers);
		return LanguageProvider.create(client, options);
	}
};
export { AceLanguageClient as t };
