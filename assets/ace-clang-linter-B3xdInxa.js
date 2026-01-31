import { t as BaseService } from "./base-service-mjbaMWZI.js";
import { n as mergeObjects } from "./webworker-Dp8mZl3h.js";
async function load(module) {
	if (typeof Response === "function" && module instanceof Response) {
		if ("compileStreaming" in WebAssembly) try {
			return await WebAssembly.compileStreaming(module);
		} catch (e) {
			if (module.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.compileStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
			else throw e;
		}
		return module.arrayBuffer();
	}
	return module;
}
let wasm;
async function initAsync(input) {
	if (wasm !== void 0) return wasm;
	if (typeof input === "undefined") input = new URL("" + new URL("clang-format-CUFXfBDo.wasm", import.meta.url).href, "" + import.meta.url);
	if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) input = fetch(input);
	wasm = await load(await input).then((wasm$1) => Module({ wasm: wasm$1 }));
	assert_init = () => {};
}
function assert_init() {
	throw new Error("uninit");
}
function unwrap(result) {
	const { error, content } = result;
	if (error) throw Error(content);
	return content;
}
function format(content, filename = "<stdin>", style = "LLVM") {
	assert_init();
	return unwrap(wasm.format(content, filename, style));
}
var Module = async function(moduleArg = {}) {
	var moduleRtn;
	var Module$1 = moduleArg, readyPromiseResolve;
	var readyPromise = new Promise((resolve, reject) => {
		readyPromiseResolve = resolve;
	});
	var out = (...args) => console.log(...args);
	var err = (...args) => console.error(...args);
	function ready() {
		readyPromiseResolve(Module$1);
		run();
	}
	function abort(what) {
		throw what;
	}
	var HEAP8, HEAP16, HEAP32, HEAPU8, HEAPU16, HEAPU32, HEAPF32, HEAPF64, HEAP64, HEAPU64, wasmMemory;
	function updateMemoryViews() {
		var b = wasmMemory.buffer;
		HEAP8 = new Int8Array(b);
		HEAP16 = new Int16Array(b);
		HEAPU8 = new Uint8Array(b);
		HEAPU16 = new Uint16Array(b);
		HEAP32 = new Int32Array(b);
		HEAPU32 = new Uint32Array(b);
		HEAPF32 = new Float32Array(b);
		HEAPF64 = new Float64Array(b);
		HEAP64 = new BigInt64Array(b);
		HEAPU64 = new BigUint64Array(b);
	}
	function initMemory() {
		if (Module$1["wasmMemory"]) wasmMemory = Module$1["wasmMemory"];
		else {
			var INITIAL_MEMORY = Module$1["INITIAL_MEMORY"] || 16777216;
			wasmMemory = new WebAssembly.Memory({
				initial: INITIAL_MEMORY / 65536,
				maximum: 32768
			});
		}
		updateMemoryViews();
	}
	initMemory();
	var wasmTable;
	var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
	var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
	class ExceptionInfo {
		constructor(excPtr) {
			this.excPtr = excPtr;
			this.ptr = excPtr - 24;
		}
		set_type(type) {
			HEAPU32[this.ptr + 4 >> 2] = type;
		}
		get_type() {
			return HEAPU32[this.ptr + 4 >> 2];
		}
		set_destructor(destructor) {
			HEAPU32[this.ptr + 8 >> 2] = destructor;
		}
		get_destructor() {
			return HEAPU32[this.ptr + 8 >> 2];
		}
		set_caught(caught) {
			caught = caught ? 1 : 0;
			HEAP8[this.ptr + 12] = caught;
		}
		get_caught() {
			return HEAP8[this.ptr + 12] != 0;
		}
		set_rethrown(rethrown) {
			rethrown = rethrown ? 1 : 0;
			HEAP8[this.ptr + 13] = rethrown;
		}
		get_rethrown() {
			return HEAP8[this.ptr + 13] != 0;
		}
		init(type, destructor) {
			this.set_adjusted_ptr(0);
			this.set_type(type);
			this.set_destructor(destructor);
		}
		set_adjusted_ptr(adjustedPtr) {
			HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
		}
		get_adjusted_ptr() {
			return HEAPU32[this.ptr + 16 >> 2];
		}
	}
	var exceptionLast = 0;
	var uncaughtExceptionCount = 0;
	var ___cxa_throw = (ptr, type, destructor) => {
		new ExceptionInfo(ptr).init(type, destructor);
		exceptionLast = ptr;
		uncaughtExceptionCount++;
		throw exceptionLast;
	};
	var ___syscall_chdir = (path) => {};
	var ___syscall_faccessat = (dirfd, path, amode, flags) => {};
	var ___syscall_fstat64 = (fd, buf) => {};
	var ___syscall_getcwd = (buf, size) => {};
	var ___syscall_getdents64 = (fd, dirp, count) => {};
	var ___syscall_lstat64 = (path, buf) => {};
	var ___syscall_newfstatat = (dirfd, path, buf, flags) => {};
	var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
	var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
		var endIdx = idx + maxBytesToRead;
		var endPtr = idx;
		while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
		if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
		var str = "";
		while (idx < endPtr) {
			var u0 = heapOrArray[idx++];
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0);
				continue;
			}
			var u1 = heapOrArray[idx++] & 63;
			if ((u0 & 224) == 192) {
				str += String.fromCharCode((u0 & 31) << 6 | u1);
				continue;
			}
			var u2 = heapOrArray[idx++] & 63;
			if ((u0 & 240) == 224) u0 = (u0 & 15) << 12 | u1 << 6 | u2;
			else u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
			if (u0 < 65536) str += String.fromCharCode(u0);
			else {
				var ch = u0 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
			}
		}
		return str;
	};
	var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
	var SYSCALLS = {
		varargs: void 0,
		getStr(ptr) {
			return UTF8ToString(ptr);
		}
	};
	function ___syscall_openat(dirfd, path, flags, varargs) {
		SYSCALLS.varargs = varargs;
	}
	var ___syscall_readlinkat = (dirfd, path, buf, bufsize) => {};
	var ___syscall_stat64 = (path, buf) => {};
	var ___syscall_statfs64 = (path, size, buf) => {};
	var ___syscall_unlinkat = (dirfd, path, flags) => {};
	var __abort_js = () => abort("");
	var structRegistrations = {};
	var runDestructors = (destructors) => {
		while (destructors.length) {
			var ptr = destructors.pop();
			destructors.pop()(ptr);
		}
	};
	function readPointer(pointer) {
		return this["fromWireType"](HEAPU32[pointer >> 2]);
	}
	var awaitingDependencies = {};
	var registeredTypes = {};
	var typeDependencies = {};
	var InternalError = class InternalError$1 extends Error {
		constructor(message) {
			super(message);
			this.name = "InternalError";
		}
	};
	var throwInternalError = (message) => {
		throw new InternalError(message);
	};
	var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
		myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
		function onComplete(typeConverters$1) {
			var myTypeConverters = getTypeConverters(typeConverters$1);
			if (myTypeConverters.length !== myTypes.length) throwInternalError("Mismatched type converter count");
			for (var i = 0; i < myTypes.length; ++i) registerType(myTypes[i], myTypeConverters[i]);
		}
		var typeConverters = new Array(dependentTypes.length);
		var unregisteredTypes = [];
		var registered = 0;
		dependentTypes.forEach((dt, i) => {
			if (registeredTypes.hasOwnProperty(dt)) typeConverters[i] = registeredTypes[dt];
			else {
				unregisteredTypes.push(dt);
				if (!awaitingDependencies.hasOwnProperty(dt)) awaitingDependencies[dt] = [];
				awaitingDependencies[dt].push(() => {
					typeConverters[i] = registeredTypes[dt];
					++registered;
					if (registered === unregisteredTypes.length) onComplete(typeConverters);
				});
			}
		});
		if (0 === unregisteredTypes.length) onComplete(typeConverters);
	};
	var __embind_finalize_value_object = (structType) => {
		var reg = structRegistrations[structType];
		delete structRegistrations[structType];
		var rawConstructor = reg.rawConstructor;
		var rawDestructor = reg.rawDestructor;
		var fieldRecords = reg.fields;
		var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
		whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes$1) => {
			var fields = {};
			fieldRecords.forEach((field, i) => {
				var fieldName = field.fieldName;
				var getterReturnType = fieldTypes$1[i];
				var optional = fieldTypes$1[i].optional;
				var getter = field.getter;
				var getterContext = field.getterContext;
				var setterArgumentType = fieldTypes$1[i + fieldRecords.length];
				var setter = field.setter;
				var setterContext = field.setterContext;
				fields[fieldName] = {
					read: (ptr) => getterReturnType["fromWireType"](getter(getterContext, ptr)),
					write: (ptr, o) => {
						var destructors = [];
						setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
						runDestructors(destructors);
					},
					optional
				};
			});
			return [{
				name: reg.name,
				fromWireType: (ptr) => {
					var rv = {};
					for (var i in fields) rv[i] = fields[i].read(ptr);
					rawDestructor(ptr);
					return rv;
				},
				toWireType: (destructors, o) => {
					for (var fieldName in fields) if (!(fieldName in o) && !fields[fieldName].optional) throw new TypeError(`Missing field: "${fieldName}"`);
					var ptr = rawConstructor();
					for (fieldName in fields) fields[fieldName].write(ptr, o[fieldName]);
					if (destructors !== null) destructors.push(rawDestructor, ptr);
					return ptr;
				},
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: readPointer,
				destructorFunction: rawDestructor
			}];
		});
	};
	var embind_init_charCodes = () => {
		var codes = new Array(256);
		for (var i = 0; i < 256; ++i) codes[i] = String.fromCharCode(i);
		embind_charCodes = codes;
	};
	var embind_charCodes;
	var readLatin1String = (ptr) => {
		var ret = "";
		var c = ptr;
		while (HEAPU8[c]) ret += embind_charCodes[HEAPU8[c++]];
		return ret;
	};
	var BindingError = class BindingError$1 extends Error {
		constructor(message) {
			super(message);
			this.name = "BindingError";
		}
	};
	var throwBindingError = (message) => {
		throw new BindingError(message);
	};
	function sharedRegisterType(rawType, registeredInstance, options = {}) {
		var name = registeredInstance.name;
		if (!rawType) throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
		if (registeredTypes.hasOwnProperty(rawType)) if (options.ignoreDuplicateRegistrations) return;
		else throwBindingError(`Cannot register type '${name}' twice`);
		registeredTypes[rawType] = registeredInstance;
		delete typeDependencies[rawType];
		if (awaitingDependencies.hasOwnProperty(rawType)) {
			var callbacks = awaitingDependencies[rawType];
			delete awaitingDependencies[rawType];
			callbacks.forEach((cb) => cb());
		}
	}
	function registerType(rawType, registeredInstance, options = {}) {
		return sharedRegisterType(rawType, registeredInstance, options);
	}
	var integerReadValueFromPointer = (name, width, signed) => {
		switch (width) {
			case 1: return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
			case 2: return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
			case 4: return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
			case 8: return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
			default: throw new TypeError(`invalid integer width (${width}): ${name}`);
		}
	};
	var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
		name = readLatin1String(name);
		const isUnsignedType = minRange === 0n;
		let fromWireType = (value) => value;
		if (isUnsignedType) {
			const bitSize = size * 8;
			fromWireType = (value) => BigInt.asUintN(bitSize, value);
			maxRange = fromWireType(maxRange);
		}
		registerType(primitiveType, {
			name,
			fromWireType,
			toWireType: (destructors, value) => {
				if (typeof value == "number") value = BigInt(value);
				return value;
			},
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType),
			destructorFunction: null
		});
	};
	var GenericWireTypeSize = 8;
	var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
		name = readLatin1String(name);
		registerType(rawType, {
			name,
			fromWireType: function(wt) {
				return !!wt;
			},
			toWireType: function(destructors, o) {
				return o ? trueValue : falseValue;
			},
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: function(pointer) {
				return this["fromWireType"](HEAPU8[pointer]);
			},
			destructorFunction: null
		});
	};
	var shallowCopyInternalPointer = (o) => ({
		count: o.count,
		deleteScheduled: o.deleteScheduled,
		preservePointerOnDelete: o.preservePointerOnDelete,
		ptr: o.ptr,
		ptrType: o.ptrType,
		smartPtr: o.smartPtr,
		smartPtrType: o.smartPtrType
	});
	var throwInstanceAlreadyDeleted = (obj) => {
		function getInstanceTypeName(handle) {
			return handle.$$.ptrType.registeredClass.name;
		}
		throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
	};
	var finalizationRegistry = false;
	var detachFinalizer = (handle) => {};
	var runDestructor = ($$) => {
		if ($$.smartPtr) $$.smartPtrType.rawDestructor($$.smartPtr);
		else $$.ptrType.registeredClass.rawDestructor($$.ptr);
	};
	var releaseClassHandle = ($$) => {
		$$.count.value -= 1;
		if (0 === $$.count.value) runDestructor($$);
	};
	var attachFinalizer = (handle) => {
		if ("undefined" === typeof FinalizationRegistry) {
			attachFinalizer = (handle$1) => handle$1;
			return handle;
		}
		finalizationRegistry = new FinalizationRegistry((info) => {
			releaseClassHandle(info.$$);
		});
		attachFinalizer = (handle$1) => {
			var $$ = handle$1.$$;
			if (!!$$.smartPtr) {
				var info = { $$ };
				finalizationRegistry.register(handle$1, info, handle$1);
			}
			return handle$1;
		};
		detachFinalizer = (handle$1) => finalizationRegistry.unregister(handle$1);
		return attachFinalizer(handle);
	};
	var deletionQueue = [];
	var flushPendingDeletes = () => {
		while (deletionQueue.length) {
			var obj = deletionQueue.pop();
			obj.$$.deleteScheduled = false;
			obj["delete"]();
		}
	};
	var delayFunction;
	var init_ClassHandle = () => {
		let proto = ClassHandle.prototype;
		Object.assign(proto, {
			isAliasOf(other) {
				if (!(this instanceof ClassHandle)) return false;
				if (!(other instanceof ClassHandle)) return false;
				var leftClass = this.$$.ptrType.registeredClass;
				var left = this.$$.ptr;
				other.$$ = other.$$;
				var rightClass = other.$$.ptrType.registeredClass;
				var right = other.$$.ptr;
				while (leftClass.baseClass) {
					left = leftClass.upcast(left);
					leftClass = leftClass.baseClass;
				}
				while (rightClass.baseClass) {
					right = rightClass.upcast(right);
					rightClass = rightClass.baseClass;
				}
				return leftClass === rightClass && left === right;
			},
			clone() {
				if (!this.$$.ptr) throwInstanceAlreadyDeleted(this);
				if (this.$$.preservePointerOnDelete) {
					this.$$.count.value += 1;
					return this;
				} else {
					var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
					clone.$$.count.value += 1;
					clone.$$.deleteScheduled = false;
					return clone;
				}
			},
			delete() {
				if (!this.$$.ptr) throwInstanceAlreadyDeleted(this);
				if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) throwBindingError("Object already scheduled for deletion");
				detachFinalizer(this);
				releaseClassHandle(this.$$);
				if (!this.$$.preservePointerOnDelete) {
					this.$$.smartPtr = void 0;
					this.$$.ptr = void 0;
				}
			},
			isDeleted() {
				return !this.$$.ptr;
			},
			deleteLater() {
				if (!this.$$.ptr) throwInstanceAlreadyDeleted(this);
				if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) throwBindingError("Object already scheduled for deletion");
				deletionQueue.push(this);
				if (deletionQueue.length === 1 && delayFunction) delayFunction(flushPendingDeletes);
				this.$$.deleteScheduled = true;
				return this;
			}
		});
		const symbolDispose = Symbol.dispose;
		if (symbolDispose) proto[symbolDispose] = proto["delete"];
	};
	function ClassHandle() {}
	var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
	var registeredPointers = {};
	var ensureOverloadTable = (proto, methodName, humanName) => {
		if (void 0 === proto[methodName].overloadTable) {
			var prevFunc = proto[methodName];
			proto[methodName] = function(...args) {
				if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
				return proto[methodName].overloadTable[args.length].apply(this, args);
			};
			proto[methodName].overloadTable = [];
			proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
		}
	};
	var exposePublicSymbol = (name, value, numArguments) => {
		if (Module$1.hasOwnProperty(name)) {
			if (void 0 === numArguments || void 0 !== Module$1[name].overloadTable && void 0 !== Module$1[name].overloadTable[numArguments]) throwBindingError(`Cannot register public name '${name}' twice`);
			ensureOverloadTable(Module$1, name, name);
			if (Module$1[name].overloadTable.hasOwnProperty(numArguments)) throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
			Module$1[name].overloadTable[numArguments] = value;
		} else {
			Module$1[name] = value;
			Module$1[name].argCount = numArguments;
		}
	};
	var char_0 = 48;
	var char_9 = 57;
	var makeLegalFunctionName = (name) => {
		name = name.replace(/[^a-zA-Z0-9_]/g, "$");
		var f = name.charCodeAt(0);
		if (f >= char_0 && f <= char_9) return `_${name}`;
		return name;
	};
	function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
		this.name = name;
		this.constructor = constructor;
		this.instancePrototype = instancePrototype;
		this.rawDestructor = rawDestructor;
		this.baseClass = baseClass;
		this.getActualType = getActualType;
		this.upcast = upcast;
		this.downcast = downcast;
		this.pureVirtualFunctions = [];
	}
	var upcastPointer = (ptr, ptrClass, desiredClass) => {
		while (ptrClass !== desiredClass) {
			if (!ptrClass.upcast) throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
			ptr = ptrClass.upcast(ptr);
			ptrClass = ptrClass.baseClass;
		}
		return ptr;
	};
	var embindRepr = (v) => {
		if (v === null) return "null";
		var t = typeof v;
		if (t === "object" || t === "array" || t === "function") return v.toString();
		else return "" + v;
	};
	function constNoSmartPtrRawPointerToWireType(destructors, handle) {
		if (handle === null) {
			if (this.isReference) throwBindingError(`null is not a valid ${this.name}`);
			return 0;
		}
		if (!handle.$$) throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
		if (!handle.$$.ptr) throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var handleClass = handle.$$.ptrType.registeredClass;
		return upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
	}
	function genericPointerToWireType(destructors, handle) {
		var ptr;
		if (handle === null) {
			if (this.isReference) throwBindingError(`null is not a valid ${this.name}`);
			if (this.isSmartPointer) {
				ptr = this.rawConstructor();
				if (destructors !== null) destructors.push(this.rawDestructor, ptr);
				return ptr;
			} else return 0;
		}
		if (!handle || !handle.$$) throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
		if (!handle.$$.ptr) throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
		if (!this.isConst && handle.$$.ptrType.isConst) throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
		var handleClass = handle.$$.ptrType.registeredClass;
		ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
		if (this.isSmartPointer) {
			if (void 0 === handle.$$.smartPtr) throwBindingError("Passing raw pointer to smart pointer is illegal");
			switch (this.sharingPolicy) {
				case 0:
					if (handle.$$.smartPtrType === this) ptr = handle.$$.smartPtr;
					else throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
					break;
				case 1:
					ptr = handle.$$.smartPtr;
					break;
				case 2:
					if (handle.$$.smartPtrType === this) ptr = handle.$$.smartPtr;
					else {
						var clonedHandle = handle["clone"]();
						ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
						if (destructors !== null) destructors.push(this.rawDestructor, ptr);
					}
					break;
				default: throwBindingError("Unsupporting sharing policy");
			}
		}
		return ptr;
	}
	function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
		if (handle === null) {
			if (this.isReference) throwBindingError(`null is not a valid ${this.name}`);
			return 0;
		}
		if (!handle.$$) throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
		if (!handle.$$.ptr) throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
		if (handle.$$.ptrType.isConst) throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
		var handleClass = handle.$$.ptrType.registeredClass;
		return upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
	}
	var downcastPointer = (ptr, ptrClass, desiredClass) => {
		if (ptrClass === desiredClass) return ptr;
		if (void 0 === desiredClass.baseClass) return null;
		var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
		if (rv === null) return null;
		return desiredClass.downcast(rv);
	};
	var registeredInstances = {};
	var getBasestPointer = (class_, ptr) => {
		if (ptr === void 0) throwBindingError("ptr should not be undefined");
		while (class_.baseClass) {
			ptr = class_.upcast(ptr);
			class_ = class_.baseClass;
		}
		return ptr;
	};
	var getInheritedInstance = (class_, ptr) => {
		ptr = getBasestPointer(class_, ptr);
		return registeredInstances[ptr];
	};
	var makeClassHandle = (prototype, record) => {
		if (!record.ptrType || !record.ptr) throwInternalError("makeClassHandle requires ptr and ptrType");
		if (!!record.smartPtrType !== !!record.smartPtr) throwInternalError("Both smartPtrType and smartPtr must be specified");
		record.count = { value: 1 };
		return attachFinalizer(Object.create(prototype, { $$: {
			value: record,
			writable: true
		} }));
	};
	function RegisteredPointer_fromWireType(ptr) {
		var rawPointer = this.getPointee(ptr);
		if (!rawPointer) {
			this.destructor(ptr);
			return null;
		}
		var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
		if (void 0 !== registeredInstance) if (0 === registeredInstance.$$.count.value) {
			registeredInstance.$$.ptr = rawPointer;
			registeredInstance.$$.smartPtr = ptr;
			return registeredInstance["clone"]();
		} else {
			var rv = registeredInstance["clone"]();
			this.destructor(ptr);
			return rv;
		}
		function makeDefaultHandle() {
			if (this.isSmartPointer) return makeClassHandle(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: rawPointer,
				smartPtrType: this,
				smartPtr: ptr
			});
			else return makeClassHandle(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr
			});
		}
		var registeredPointerRecord = registeredPointers[this.registeredClass.getActualType(rawPointer)];
		if (!registeredPointerRecord) return makeDefaultHandle.call(this);
		var toType;
		if (this.isConst) toType = registeredPointerRecord.constPointerType;
		else toType = registeredPointerRecord.pointerType;
		var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
		if (dp === null) return makeDefaultHandle.call(this);
		if (this.isSmartPointer) return makeClassHandle(toType.registeredClass.instancePrototype, {
			ptrType: toType,
			ptr: dp,
			smartPtrType: this,
			smartPtr: ptr
		});
		else return makeClassHandle(toType.registeredClass.instancePrototype, {
			ptrType: toType,
			ptr: dp
		});
	}
	var init_RegisteredPointer = () => {
		Object.assign(RegisteredPointer.prototype, {
			getPointee(ptr) {
				if (this.rawGetPointee) ptr = this.rawGetPointee(ptr);
				return ptr;
			},
			destructor(ptr) {
				this.rawDestructor?.(ptr);
			},
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: readPointer,
			fromWireType: RegisteredPointer_fromWireType
		});
	};
	function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
		this.name = name;
		this.registeredClass = registeredClass;
		this.isReference = isReference;
		this.isConst = isConst;
		this.isSmartPointer = isSmartPointer;
		this.pointeeType = pointeeType;
		this.sharingPolicy = sharingPolicy;
		this.rawGetPointee = rawGetPointee;
		this.rawConstructor = rawConstructor;
		this.rawShare = rawShare;
		this.rawDestructor = rawDestructor;
		if (!isSmartPointer && registeredClass.baseClass === void 0) if (isConst) {
			this["toWireType"] = constNoSmartPtrRawPointerToWireType;
			this.destructorFunction = null;
		} else {
			this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
			this.destructorFunction = null;
		}
		else this["toWireType"] = genericPointerToWireType;
	}
	var replacePublicSymbol = (name, value, numArguments) => {
		if (!Module$1.hasOwnProperty(name)) throwInternalError("Replacing nonexistent public symbol");
		if (void 0 !== Module$1[name].overloadTable && void 0 !== numArguments) Module$1[name].overloadTable[numArguments] = value;
		else {
			Module$1[name] = value;
			Module$1[name].argCount = numArguments;
		}
	};
	var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
		signature = readLatin1String(signature);
		function makeDynCaller() {
			return getWasmTableEntry(rawFunction);
		}
		var fp = makeDynCaller();
		if (typeof fp != "function") throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
		return fp;
	};
	class UnboundTypeError extends Error {}
	var getTypeName = (type) => {
		var ptr = ___getTypeName(type);
		var rv = readLatin1String(ptr);
		_free(ptr);
		return rv;
	};
	var throwUnboundTypeError = (message, types) => {
		var unboundTypes = [];
		var seen = {};
		function visit(type) {
			if (seen[type]) return;
			if (registeredTypes[type]) return;
			if (typeDependencies[type]) {
				typeDependencies[type].forEach(visit);
				return;
			}
			unboundTypes.push(type);
			seen[type] = true;
		}
		types.forEach(visit);
		throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
	};
	var __embind_register_class = (rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) => {
		name = readLatin1String(name);
		getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
		upcast &&= embind__requireFunction(upcastSignature, upcast);
		downcast &&= embind__requireFunction(downcastSignature, downcast);
		rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
		var legalFunctionName = makeLegalFunctionName(name);
		exposePublicSymbol(legalFunctionName, function() {
			throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [baseClassRawType]);
		});
		whenDependentTypesAreResolved([
			rawType,
			rawPointerType,
			rawConstPointerType
		], baseClassRawType ? [baseClassRawType] : [], (base) => {
			base = base[0];
			var baseClass;
			var basePrototype;
			if (baseClassRawType) {
				baseClass = base.registeredClass;
				basePrototype = baseClass.instancePrototype;
			} else basePrototype = ClassHandle.prototype;
			var constructor = createNamedFunction(name, function(...args) {
				if (Object.getPrototypeOf(this) !== instancePrototype) throw new BindingError(`Use 'new' to construct ${name}`);
				if (void 0 === registeredClass.constructor_body) throw new BindingError(`${name} has no accessible constructor`);
				var body = registeredClass.constructor_body[args.length];
				if (void 0 === body) throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
				return body.apply(this, args);
			});
			var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
			constructor.prototype = instancePrototype;
			var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
			if (registeredClass.baseClass) {
				registeredClass.baseClass.__derivedClasses ??= [];
				registeredClass.baseClass.__derivedClasses.push(registeredClass);
			}
			var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
			var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
			var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
			registeredPointers[rawType] = {
				pointerType: pointerConverter,
				constPointerType: constPointerConverter
			};
			replacePublicSymbol(legalFunctionName, constructor);
			return [
				referenceConverter,
				pointerConverter,
				constPointerConverter
			];
		});
	};
	var heap32VectorToArray = (count, firstElement) => {
		var array = [];
		for (var i = 0; i < count; i++) array.push(HEAPU32[firstElement + i * 4 >> 2]);
		return array;
	};
	function usesDestructorStack(argTypes) {
		for (var i = 1; i < argTypes.length; ++i) if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) return true;
		return false;
	}
	function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
		var argCount = argTypes.length;
		if (argCount < 2) throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var isClassMethodFunc = argTypes[1] !== null && classType !== null;
		var needsDestructorStack = usesDestructorStack(argTypes);
		var returns = argTypes[0].name !== "void";
		var expectedArgCount = argCount - 2;
		var argsWired = new Array(expectedArgCount);
		var invokerFuncArgs = [];
		var destructors = [];
		var invokerFn = function(...args) {
			destructors.length = 0;
			var thisWired;
			invokerFuncArgs.length = isClassMethodFunc ? 2 : 1;
			invokerFuncArgs[0] = cppTargetFunc;
			if (isClassMethodFunc) {
				thisWired = argTypes[1]["toWireType"](destructors, this);
				invokerFuncArgs[1] = thisWired;
			}
			for (var i = 0; i < expectedArgCount; ++i) {
				argsWired[i] = argTypes[i + 2]["toWireType"](destructors, args[i]);
				invokerFuncArgs.push(argsWired[i]);
			}
			var rv = cppInvokerFunc(...invokerFuncArgs);
			function onDone(rv$1) {
				if (needsDestructorStack) runDestructors(destructors);
				else for (var i$1 = isClassMethodFunc ? 1 : 2; i$1 < argTypes.length; i$1++) {
					var param = i$1 === 1 ? thisWired : argsWired[i$1 - 2];
					if (argTypes[i$1].destructorFunction !== null) argTypes[i$1].destructorFunction(param);
				}
				if (returns) return argTypes[0]["fromWireType"](rv$1);
			}
			return onDone(rv);
		};
		return createNamedFunction(humanName, invokerFn);
	}
	var __embind_register_class_constructor = (rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) => {
		var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
		invoker = embind__requireFunction(invokerSignature, invoker);
		whenDependentTypesAreResolved([], [rawClassType], (classType) => {
			classType = classType[0];
			var humanName = `constructor ${classType.name}`;
			if (void 0 === classType.registeredClass.constructor_body) classType.registeredClass.constructor_body = [];
			if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			classType.registeredClass.constructor_body[argCount - 1] = () => {
				throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
			};
			whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
				argTypes.splice(1, 0, null);
				classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
				return [];
			});
			return [];
		});
	};
	var getFunctionName = (signature) => {
		signature = signature.trim();
		const argsIndex = signature.indexOf("(");
		if (argsIndex === -1) return signature;
		return signature.slice(0, argsIndex);
	};
	var __embind_register_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync, isNonnullReturn) => {
		var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
		methodName = readLatin1String(methodName);
		methodName = getFunctionName(methodName);
		rawInvoker = embind__requireFunction(invokerSignature, rawInvoker, isAsync);
		whenDependentTypesAreResolved([], [rawClassType], (classType) => {
			classType = classType[0];
			var humanName = `${classType.name}.${methodName}`;
			if (methodName.startsWith("@@")) methodName = Symbol[methodName.substring(2)];
			if (isPureVirtual) classType.registeredClass.pureVirtualFunctions.push(methodName);
			function unboundTypesHandler() {
				throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
			}
			var proto = classType.registeredClass.instancePrototype;
			var method = proto[methodName];
			if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
				unboundTypesHandler.argCount = argCount - 2;
				unboundTypesHandler.className = classType.name;
				proto[methodName] = unboundTypesHandler;
			} else {
				ensureOverloadTable(proto, methodName, humanName);
				proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
			}
			whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
				var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
				if (void 0 === proto[methodName].overloadTable) {
					memberFunction.argCount = argCount - 2;
					proto[methodName] = memberFunction;
				} else proto[methodName].overloadTable[argCount - 2] = memberFunction;
				return [];
			});
			return [];
		});
	};
	var emval_freelist = [];
	var emval_handles = [
		0,
		1,
		,
		1,
		null,
		1,
		true,
		1,
		false,
		1
	];
	var __emval_decref = (handle) => {
		if (handle > 9 && 0 === --emval_handles[handle + 1]) {
			emval_handles[handle] = void 0;
			emval_freelist.push(handle);
		}
	};
	var Emval = {
		toValue: (handle) => {
			if (!handle) throwBindingError(`Cannot use deleted val. handle = ${handle}`);
			return emval_handles[handle];
		},
		toHandle: (value) => {
			switch (value) {
				case void 0: return 2;
				case null: return 4;
				case true: return 6;
				case false: return 8;
				default: {
					const handle = emval_freelist.pop() || emval_handles.length;
					emval_handles[handle] = value;
					emval_handles[handle + 1] = 1;
					return handle;
				}
			}
		}
	};
	var EmValType = {
		name: "emscripten::val",
		fromWireType: (handle) => {
			var rv = Emval.toValue(handle);
			__emval_decref(handle);
			return rv;
		},
		toWireType: (destructors, value) => Emval.toHandle(value),
		argPackAdvance: GenericWireTypeSize,
		readValueFromPointer: readPointer,
		destructorFunction: null
	};
	var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
	var floatReadValueFromPointer = (name, width) => {
		switch (width) {
			case 4: return function(pointer) {
				return this["fromWireType"](HEAPF32[pointer >> 2]);
			};
			case 8: return function(pointer) {
				return this["fromWireType"](HEAPF64[pointer >> 3]);
			};
			default: throw new TypeError(`invalid float width (${width}): ${name}`);
		}
	};
	var __embind_register_float = (rawType, name, size) => {
		name = readLatin1String(name);
		registerType(rawType, {
			name,
			fromWireType: (value) => value,
			toWireType: (destructors, value) => value,
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: floatReadValueFromPointer(name, size),
			destructorFunction: null
		});
	};
	var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
		var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
		name = readLatin1String(name);
		name = getFunctionName(name);
		rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
		exposePublicSymbol(name, function() {
			throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
		}, argCount - 1);
		whenDependentTypesAreResolved([], argTypes, (argTypes$1) => {
			var invokerArgsArray = [argTypes$1[0], null].concat(argTypes$1.slice(1));
			replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
			return [];
		});
	};
	var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
		name = readLatin1String(name);
		const isUnsignedType = minRange === 0;
		let fromWireType = (value) => value;
		if (isUnsignedType) {
			var bitshift = 32 - 8 * size;
			fromWireType = (value) => value << bitshift >>> bitshift;
			maxRange = fromWireType(maxRange);
		}
		registerType(primitiveType, {
			name,
			fromWireType,
			toWireType: (destructors, value) => value,
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0),
			destructorFunction: null
		});
	};
	var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
		var TA = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array,
			BigInt64Array,
			BigUint64Array
		][dataTypeIndex];
		function decodeMemoryView(handle) {
			var size = HEAPU32[handle >> 2];
			var data = HEAPU32[handle + 4 >> 2];
			return new TA(HEAP8.buffer, data, size);
		}
		name = readLatin1String(name);
		registerType(rawType, {
			name,
			fromWireType: decodeMemoryView,
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: decodeMemoryView
		}, { ignoreDuplicateRegistrations: true });
	};
	var EmValOptionalType = Object.assign({ optional: true }, EmValType);
	var __embind_register_optional = (rawOptionalType, rawType) => {
		registerType(rawOptionalType, EmValOptionalType);
	};
	var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
		if (!(maxBytesToWrite > 0)) return 0;
		var startIdx = outIdx;
		var endIdx = outIdx + maxBytesToWrite - 1;
		for (var i = 0; i < str.length; ++i) {
			var u = str.charCodeAt(i);
			if (u >= 55296 && u <= 57343) {
				var u1 = str.charCodeAt(++i);
				u = 65536 + ((u & 1023) << 10) | u1 & 1023;
			}
			if (u <= 127) {
				if (outIdx >= endIdx) break;
				heap[outIdx++] = u;
			} else if (u <= 2047) {
				if (outIdx + 1 >= endIdx) break;
				heap[outIdx++] = 192 | u >> 6;
				heap[outIdx++] = 128 | u & 63;
			} else if (u <= 65535) {
				if (outIdx + 2 >= endIdx) break;
				heap[outIdx++] = 224 | u >> 12;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
			} else {
				if (outIdx + 3 >= endIdx) break;
				heap[outIdx++] = 240 | u >> 18;
				heap[outIdx++] = 128 | u >> 12 & 63;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
			}
		}
		heap[outIdx] = 0;
		return outIdx - startIdx;
	};
	var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
	var lengthBytesUTF8 = (str) => {
		var len = 0;
		for (var i = 0; i < str.length; ++i) {
			var c = str.charCodeAt(i);
			if (c <= 127) len++;
			else if (c <= 2047) len += 2;
			else if (c >= 55296 && c <= 57343) {
				len += 4;
				++i;
			} else len += 3;
		}
		return len;
	};
	var __embind_register_std_string = (rawType, name) => {
		name = readLatin1String(name);
		var stdStringIsUTF8 = true;
		registerType(rawType, {
			name,
			fromWireType(value) {
				var length = HEAPU32[value >> 2];
				var payload = value + 4;
				var str;
				if (stdStringIsUTF8) {
					var decodeStartPtr = payload;
					for (var i = 0; i <= length; ++i) {
						var currentBytePtr = payload + i;
						if (i == length || HEAPU8[currentBytePtr] == 0) {
							var maxRead = currentBytePtr - decodeStartPtr;
							var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
							if (str === void 0) str = stringSegment;
							else {
								str += String.fromCharCode(0);
								str += stringSegment;
							}
							decodeStartPtr = currentBytePtr + 1;
						}
					}
				} else {
					var a = new Array(length);
					for (var i = 0; i < length; ++i) a[i] = String.fromCharCode(HEAPU8[payload + i]);
					str = a.join("");
				}
				_free(value);
				return str;
			},
			toWireType(destructors, value) {
				if (value instanceof ArrayBuffer) value = new Uint8Array(value);
				var length;
				var valueIsOfTypeString = typeof value == "string";
				if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) throwBindingError("Cannot pass non-string to std::string");
				if (stdStringIsUTF8 && valueIsOfTypeString) length = lengthBytesUTF8(value);
				else length = value.length;
				var base = _malloc(4 + length + 1);
				var ptr = base + 4;
				HEAPU32[base >> 2] = length;
				if (valueIsOfTypeString) if (stdStringIsUTF8) stringToUTF8(value, ptr, length + 1);
				else for (var i = 0; i < length; ++i) {
					var charCode = value.charCodeAt(i);
					if (charCode > 255) {
						_free(base);
						throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
					}
					HEAPU8[ptr + i] = charCode;
				}
				else HEAPU8.set(value, ptr);
				if (destructors !== null) destructors.push(_free, base);
				return base;
			},
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: readPointer,
			destructorFunction(ptr) {
				_free(ptr);
			}
		});
	};
	var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
	var UTF16ToString = (ptr, maxBytesToRead) => {
		var idx = ptr >> 1;
		var maxIdx = idx + maxBytesToRead / 2;
		var endIdx = idx;
		while (!(endIdx >= maxIdx) && HEAPU16[endIdx]) ++endIdx;
		if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
		var str = "";
		for (var i = idx; !(i >= maxIdx); ++i) {
			var codeUnit = HEAPU16[i];
			if (codeUnit == 0) break;
			str += String.fromCharCode(codeUnit);
		}
		return str;
	};
	var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
		maxBytesToWrite ??= 2147483647;
		if (maxBytesToWrite < 2) return 0;
		maxBytesToWrite -= 2;
		var startPtr = outPtr;
		var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
		for (var i = 0; i < numCharsToWrite; ++i) {
			var codeUnit = str.charCodeAt(i);
			HEAP16[outPtr >> 1] = codeUnit;
			outPtr += 2;
		}
		HEAP16[outPtr >> 1] = 0;
		return outPtr - startPtr;
	};
	var lengthBytesUTF16 = (str) => str.length * 2;
	var UTF32ToString = (ptr, maxBytesToRead) => {
		var i = 0;
		var str = "";
		while (!(i >= maxBytesToRead / 4)) {
			var utf32 = HEAP32[ptr + i * 4 >> 2];
			if (utf32 == 0) break;
			++i;
			if (utf32 >= 65536) {
				var ch = utf32 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
			} else str += String.fromCharCode(utf32);
		}
		return str;
	};
	var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
		maxBytesToWrite ??= 2147483647;
		if (maxBytesToWrite < 4) return 0;
		var startPtr = outPtr;
		var endPtr = startPtr + maxBytesToWrite - 4;
		for (var i = 0; i < str.length; ++i) {
			var codeUnit = str.charCodeAt(i);
			if (codeUnit >= 55296 && codeUnit <= 57343) {
				var trailSurrogate = str.charCodeAt(++i);
				codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
			}
			HEAP32[outPtr >> 2] = codeUnit;
			outPtr += 4;
			if (outPtr + 4 > endPtr) break;
		}
		HEAP32[outPtr >> 2] = 0;
		return outPtr - startPtr;
	};
	var lengthBytesUTF32 = (str) => {
		var len = 0;
		for (var i = 0; i < str.length; ++i) {
			var codeUnit = str.charCodeAt(i);
			if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
			len += 4;
		}
		return len;
	};
	var __embind_register_std_wstring = (rawType, charSize, name) => {
		name = readLatin1String(name);
		var decodeString, encodeString, readCharAt, lengthBytesUTF;
		if (charSize === 2) {
			decodeString = UTF16ToString;
			encodeString = stringToUTF16;
			lengthBytesUTF = lengthBytesUTF16;
			readCharAt = (pointer) => HEAPU16[pointer >> 1];
		} else if (charSize === 4) {
			decodeString = UTF32ToString;
			encodeString = stringToUTF32;
			lengthBytesUTF = lengthBytesUTF32;
			readCharAt = (pointer) => HEAPU32[pointer >> 2];
		}
		registerType(rawType, {
			name,
			fromWireType: (value) => {
				var length = HEAPU32[value >> 2];
				var str;
				var decodeStartPtr = value + 4;
				for (var i = 0; i <= length; ++i) {
					var currentBytePtr = value + 4 + i * charSize;
					if (i == length || readCharAt(currentBytePtr) == 0) {
						var maxReadBytes = currentBytePtr - decodeStartPtr;
						var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
						if (str === void 0) str = stringSegment;
						else {
							str += String.fromCharCode(0);
							str += stringSegment;
						}
						decodeStartPtr = currentBytePtr + charSize;
					}
				}
				_free(value);
				return str;
			},
			toWireType: (destructors, value) => {
				if (!(typeof value == "string")) throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
				var length = lengthBytesUTF(value);
				var ptr = _malloc(4 + length + charSize);
				HEAPU32[ptr >> 2] = length / charSize;
				encodeString(value, ptr + 4, length + charSize);
				if (destructors !== null) destructors.push(_free, ptr);
				return ptr;
			},
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: readPointer,
			destructorFunction(ptr) {
				_free(ptr);
			}
		});
	};
	var __embind_register_value_object = (rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) => {
		structRegistrations[rawType] = {
			name: readLatin1String(name),
			rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
			rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
			fields: []
		};
	};
	var __embind_register_value_object_field = (structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
		structRegistrations[structType].fields.push({
			fieldName: readLatin1String(fieldName),
			getterReturnType,
			getter: embind__requireFunction(getterSignature, getter),
			getterContext,
			setterArgumentType,
			setter: embind__requireFunction(setterSignature, setter),
			setterContext
		});
	};
	var __embind_register_void = (rawType, name) => {
		name = readLatin1String(name);
		registerType(rawType, {
			isVoid: true,
			name,
			argPackAdvance: 0,
			fromWireType: () => void 0,
			toWireType: (destructors, o) => void 0
		});
	};
	var __emscripten_runtime_keepalive_clear = () => {};
	var requireRegisteredType = (rawType, humanName) => {
		var impl = registeredTypes[rawType];
		if (void 0 === impl) throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
		return impl;
	};
	var __emval_take_value = (type, arg) => {
		type = requireRegisteredType(type, "_emval_take_value");
		var v = type["readValueFromPointer"](arg);
		return Emval.toHandle(v);
	};
	var INT53_MAX = 9007199254740992;
	var INT53_MIN = -9007199254740992;
	var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
	function __gmtime_js(time, tmPtr) {
		time = bigintToI53Checked(time);
		var date = /* @__PURE__ */ new Date(time * 1e3);
		HEAP32[tmPtr >> 2] = date.getUTCSeconds();
		HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
		HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
		HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
		HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
		HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
		HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
		var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
		var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
		HEAP32[tmPtr + 28 >> 2] = yday;
	}
	var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	var MONTH_DAYS_LEAP_CUMULATIVE = [
		0,
		31,
		60,
		91,
		121,
		152,
		182,
		213,
		244,
		274,
		305,
		335
	];
	var MONTH_DAYS_REGULAR_CUMULATIVE = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	var ydayFromDate = (date) => {
		return (isLeapYear(date.getFullYear()) ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE)[date.getMonth()] + date.getDate() - 1;
	};
	function __localtime_js(time, tmPtr) {
		time = bigintToI53Checked(time);
		var date = /* @__PURE__ */ new Date(time * 1e3);
		HEAP32[tmPtr >> 2] = date.getSeconds();
		HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
		HEAP32[tmPtr + 8 >> 2] = date.getHours();
		HEAP32[tmPtr + 12 >> 2] = date.getDate();
		HEAP32[tmPtr + 16 >> 2] = date.getMonth();
		HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
		HEAP32[tmPtr + 24 >> 2] = date.getDay();
		var yday = ydayFromDate(date) | 0;
		HEAP32[tmPtr + 28 >> 2] = yday;
		HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
		var start = new Date(date.getFullYear(), 0, 1);
		var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
		var winterOffset = start.getTimezoneOffset();
		var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
		HEAP32[tmPtr + 32 >> 2] = dst;
	}
	function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
		offset = bigintToI53Checked(offset);
		return -52;
	}
	function __munmap_js(addr, len, prot, flags, fd, offset) {
		offset = bigintToI53Checked(offset);
	}
	var timers = {};
	var callUserCallback = (func) => func();
	var _emscripten_get_now = () => performance.now();
	var __setitimer_js = (which, timeout_ms) => {
		if (timers[which]) {
			clearTimeout(timers[which].id);
			delete timers[which];
		}
		if (!timeout_ms) return 0;
		timers[which] = {
			id: setTimeout(() => {
				delete timers[which];
				callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
			}, timeout_ms),
			timeout_ms
		};
		return 0;
	};
	var __tzset_js = (timezone, daylight, std_name, dst_name) => {
		var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		var winter = new Date(currentYear, 0, 1);
		var summer = new Date(currentYear, 6, 1);
		var winterOffset = winter.getTimezoneOffset();
		var summerOffset = summer.getTimezoneOffset();
		var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
		HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
		HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
		var extractZone = (timezoneOffset) => {
			var sign = timezoneOffset >= 0 ? "-" : "+";
			var absOffset = Math.abs(timezoneOffset);
			return `UTC${sign}${String(Math.floor(absOffset / 60)).padStart(2, "0")}${String(absOffset % 60).padStart(2, "0")}`;
		};
		var winterName = extractZone(winterOffset);
		var summerName = extractZone(summerOffset);
		if (summerOffset < winterOffset) {
			stringToUTF8(winterName, std_name, 17);
			stringToUTF8(summerName, dst_name, 17);
		} else {
			stringToUTF8(winterName, dst_name, 17);
			stringToUTF8(summerName, std_name, 17);
		}
	};
	var _emscripten_date_now = () => Date.now();
	var getHeapMax = () => 2147483648;
	var _emscripten_get_heap_max = () => getHeapMax();
	var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
	var growMemory = (size) => {
		var pages = (size - wasmMemory.buffer.byteLength + 65535) / 65536 | 0;
		try {
			wasmMemory.grow(pages);
			updateMemoryViews();
			return 1;
		} catch (e) {}
	};
	var _emscripten_resize_heap = (requestedSize) => {
		var oldSize = HEAPU8.length;
		requestedSize >>>= 0;
		var maxHeapSize = getHeapMax();
		if (requestedSize > maxHeapSize) return false;
		for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
			var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
			overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
			if (growMemory(Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536)))) return true;
		}
		return false;
	};
	var ENV = {};
	var getExecutableName = () => "./this.program";
	var getEnvStrings = () => {
		if (!getEnvStrings.strings) {
			var env = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
				_: getExecutableName()
			};
			for (var x in ENV) if (ENV[x] === void 0) delete env[x];
			else env[x] = ENV[x];
			var strings = [];
			for (var x in env) strings.push(`${x}=${env[x]}`);
			getEnvStrings.strings = strings;
		}
		return getEnvStrings.strings;
	};
	var _environ_get = (__environ, environ_buf) => {
		var bufSize = 0;
		var envp = 0;
		for (var string of getEnvStrings()) {
			var ptr = environ_buf + bufSize;
			HEAPU32[__environ + envp >> 2] = ptr;
			bufSize += stringToUTF8(string, ptr, Infinity) + 1;
			envp += 4;
		}
		return 0;
	};
	var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
		var strings = getEnvStrings();
		HEAPU32[penviron_count >> 2] = strings.length;
		var bufSize = 0;
		for (var string of strings) bufSize += lengthBytesUTF8(string) + 1;
		HEAPU32[penviron_buf_size >> 2] = bufSize;
		return 0;
	};
	var _proc_exit = (code) => {
		throw `exit(${code})`;
	};
	var _exit = _proc_exit;
	var _fd_close = (fd) => 52;
	var _fd_fdstat_get = (fd, pbuf) => {
		var rightsBase = 0;
		var rightsInheriting = 0;
		var flags = 0;
		var type = 2;
		if (fd == 0) rightsBase = 2;
		else if (fd == 1 || fd == 2) rightsBase = 64;
		flags = 1;
		HEAP8[pbuf] = type;
		HEAP16[pbuf + 2 >> 1] = flags;
		HEAP64[pbuf + 8 >> 3] = BigInt(rightsBase);
		HEAP64[pbuf + 16 >> 3] = BigInt(rightsInheriting);
		return 0;
	};
	function _fd_pread(fd, iov, iovcnt, offset, pnum) {
		offset = bigintToI53Checked(offset);
		return 52;
	}
	var _fd_read = (fd, iov, iovcnt, pnum) => 52;
	function _fd_seek(fd, offset, whence, newOffset) {
		offset = bigintToI53Checked(offset);
		return 70;
	}
	var printCharBuffers = [
		null,
		[],
		[]
	];
	var printChar = (stream, curr) => {
		var buffer = printCharBuffers[stream];
		if (curr === 0 || curr === 10) {
			(stream === 1 ? out : err)(UTF8ArrayToString(buffer));
			buffer.length = 0;
		} else buffer.push(curr);
	};
	var _fd_write = (fd, iov, iovcnt, pnum) => {
		var num = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAPU32[iov >> 2];
			var len = HEAPU32[iov + 4 >> 2];
			iov += 8;
			for (var j = 0; j < len; j++) printChar(fd, HEAPU8[ptr + j]);
			num += len;
		}
		HEAPU32[pnum >> 2] = num;
		return 0;
	};
	embind_init_charCodes();
	init_ClassHandle();
	init_RegisteredPointer();
	var wasmImports = {
		x: ___call_sighandler,
		k: ___cxa_throw,
		P: ___syscall_chdir,
		Q: ___syscall_faccessat,
		N: ___syscall_fstat64,
		J: ___syscall_getcwd,
		v: ___syscall_getdents64,
		K: ___syscall_lstat64,
		L: ___syscall_newfstatat,
		A: ___syscall_openat,
		u: ___syscall_readlinkat,
		M: ___syscall_stat64,
		r: ___syscall_statfs64,
		t: ___syscall_unlinkat,
		R: __abort_js,
		V: __embind_finalize_value_object,
		j: __embind_register_bigint,
		Z: __embind_register_bool,
		q: __embind_register_class,
		m: __embind_register_class_constructor,
		e: __embind_register_class_function,
		X: __embind_register_emval,
		i: __embind_register_float,
		d: __embind_register_function,
		c: __embind_register_integer,
		b: __embind_register_memory_view,
		B: __embind_register_optional,
		Y: __embind_register_std_string,
		f: __embind_register_std_wstring,
		$: __embind_register_value_object,
		g: __embind_register_value_object_field,
		_: __embind_register_void,
		y: __emscripten_runtime_keepalive_clear,
		l: __emval_take_value,
		E: __gmtime_js,
		F: __localtime_js,
		C: __mmap_js,
		D: __munmap_js,
		s: __setitimer_js,
		G: __tzset_js,
		O: _emscripten_date_now,
		o: _emscripten_get_heap_max,
		n: _emscripten_resize_heap,
		T: _environ_get,
		U: _environ_sizes_get,
		W: _exit,
		h: _fd_close,
		I: _fd_fdstat_get,
		z: _fd_pread,
		w: _fd_read,
		H: _fd_seek,
		p: _fd_write,
		a: wasmMemory,
		S: _proc_exit
	};
	function assignWasmExports(wasmExports) {
		_free = wasmExports["ca"];
		_malloc = wasmExports["da"];
		_main = wasmExports["ea"];
		___getTypeName = wasmExports["fa"];
		__emscripten_timeout = wasmExports["ga"];
	}
	var _free, _malloc, _main, ___getTypeName, __emscripten_timeout;
	function run() {
		_main();
	}
	function initRuntime(wasmExports) {
		wasmExports["aa"]();
	}
	var imports = { a: wasmImports };
	if (Module$1["noExitRuntime"]) Module$1["noExitRuntime"];
	WebAssembly.instantiate(Module$1["wasm"], imports).then((output) => {
		var wasmExports = (output.instance || output).exports;
		assignWasmExports(wasmExports);
		wasmTable = wasmExports["ba"];
		initRuntime(wasmExports);
		ready();
	});
	moduleRtn = readyPromise;
	return moduleRtn;
};
function toTextEdits(input, range) {
	return [{
		range,
		newText: input
	}];
}
var AceClangLinter = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.inited = false;
		this.serviceCapabilities = {
			documentFormattingProvider: true,
			rangeFormattingProvider: true
		};
		this.$defaultFormatOptions = {
			BasedOnStyle: "Chromium",
			IndentWidth: 4,
			ColumnLimit: 80
		};
	}
	getFormattingOptions(options) {
		this.$defaultFormatOptions.IndentWidth = options.tabSize;
		return JSON.stringify(mergeObjects(this.globalOptions?.formatOptions, this.$defaultFormatOptions));
	}
	async init() {
		await initAsync();
		this.inited = true;
	}
	async format(document, range, options) {
		if (!this.inited) await this.init();
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return Promise.resolve([]);
		const text = fullDocument.getText(range);
		try {
			const output = format(text, document.uri, this.getFormattingOptions(options));
			return Promise.resolve(toTextEdits(output, range));
		} catch (e) {
			console.log(e);
			return Promise.resolve([]);
		}
	}
};
export { AceClangLinter };
