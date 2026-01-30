import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_keys } from "./keys-B8CLTATX.js";
var require_hash_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var keyUtil = require_keys();
	var useragent = require_useragent();
	var KEY_MODS = keyUtil.KEY_MODS;
	var MultiHashHandler = class {
		constructor(config, platform) {
			this.$init(config, platform, false);
		}
		$init(config, platform, $singleCommand) {
			this.platform = platform || (useragent.isMac ? "mac" : "win");
			this.commands = {};
			this.commandKeyBinding = {};
			this.addCommands(config);
			this.$singleCommand = $singleCommand;
		}
		addCommand(command) {
			if (this.commands[command.name]) this.removeCommand(command);
			this.commands[command.name] = command;
			if (command.bindKey) this._buildKeyHash(command);
		}
		removeCommand(command, keepCommand) {
			var name = command && (typeof command === "string" ? command : command.name);
			command = this.commands[name];
			if (!keepCommand) delete this.commands[name];
			var ckb = this.commandKeyBinding;
			for (var keyId in ckb) {
				var cmdGroup = ckb[keyId];
				if (cmdGroup == command) delete ckb[keyId];
				else if (Array.isArray(cmdGroup)) {
					var i = cmdGroup.indexOf(command);
					if (i != -1) {
						cmdGroup.splice(i, 1);
						if (cmdGroup.length == 1) ckb[keyId] = cmdGroup[0];
					}
				}
			}
		}
		bindKey(key, command, position) {
			if (typeof key == "object" && key) {
				if (position == void 0) position = key.position;
				key = key[this.platform];
			}
			if (!key) return;
			if (typeof command == "function") return this.addCommand({
				exec: command,
				bindKey: key,
				name: command.name || key
			});
			key.split("|").forEach(function(keyPart) {
				var chain = "";
				if (keyPart.indexOf(" ") != -1) {
					var parts = keyPart.split(/\s+/);
					keyPart = parts.pop();
					parts.forEach(function(keyPart$1) {
						var binding$1 = this.parseKeys(keyPart$1);
						var id$1 = KEY_MODS[binding$1.hashId] + binding$1.key;
						chain += (chain ? " " : "") + id$1;
						this._addCommandToBinding(chain, "chainKeys");
					}, this);
					chain += " ";
				}
				var binding = this.parseKeys(keyPart);
				var id = KEY_MODS[binding.hashId] + binding.key;
				this._addCommandToBinding(chain + id, command, position);
			}, this);
		}
		_addCommandToBinding(keyId, command, position) {
			var ckb = this.commandKeyBinding, i;
			if (!command) delete ckb[keyId];
			else if (!ckb[keyId] || this.$singleCommand) ckb[keyId] = command;
			else {
				if (!Array.isArray(ckb[keyId])) ckb[keyId] = [ckb[keyId]];
				else if ((i = ckb[keyId].indexOf(command)) != -1) ckb[keyId].splice(i, 1);
				if (typeof position != "number") position = getPosition(command);
				var commands = ckb[keyId];
				for (i = 0; i < commands.length; i++) {
					var other = commands[i];
					if (getPosition(other) > position) break;
				}
				commands.splice(i, 0, command);
			}
		}
		addCommands(commands) {
			commands && Object.keys(commands).forEach(function(name) {
				var command = commands[name];
				if (!command) return;
				if (typeof command === "string") return this.bindKey(command, name);
				if (typeof command === "function") command = { exec: command };
				if (typeof command !== "object") return;
				if (!command.name) command.name = name;
				this.addCommand(command);
			}, this);
		}
		removeCommands(commands) {
			Object.keys(commands).forEach(function(name) {
				this.removeCommand(commands[name]);
			}, this);
		}
		bindKeys(keyList) {
			Object.keys(keyList).forEach(function(key) {
				this.bindKey(key, keyList[key]);
			}, this);
		}
		_buildKeyHash(command) {
			this.bindKey(command.bindKey, command);
		}
		parseKeys(keys) {
			var parts = keys.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(x) {
				return x;
			});
			var key = parts.pop();
			var keyCode = keyUtil[key];
			if (keyUtil.FUNCTION_KEYS[keyCode]) key = keyUtil.FUNCTION_KEYS[keyCode].toLowerCase();
			else if (!parts.length) return {
				key,
				hashId: -1
			};
			else if (parts.length == 1 && parts[0] == "shift") return {
				key: key.toUpperCase(),
				hashId: -1
			};
			var hashId = 0;
			for (var i = parts.length; i--;) {
				var modifier = keyUtil.KEY_MODS[parts[i]];
				if (modifier == null) {
					if (typeof console != "undefined") console.error("invalid modifier " + parts[i] + " in " + keys);
					return false;
				}
				hashId |= modifier;
			}
			return {
				key,
				hashId
			};
		}
		findKeyCommand(hashId, keyString) {
			var key = KEY_MODS[hashId] + keyString;
			return this.commandKeyBinding[key];
		}
		handleKeyboard(data, hashId, keyString, keyCode) {
			if (keyCode < 0) return;
			var key = KEY_MODS[hashId] + keyString;
			var command = this.commandKeyBinding[key];
			if (data.$keyChain) {
				data.$keyChain += " " + key;
				command = this.commandKeyBinding[data.$keyChain] || command;
			}
			if (command) {
				if (command == "chainKeys" || command[command.length - 1] == "chainKeys") {
					data.$keyChain = data.$keyChain || key;
					return { command: "null" };
				}
			}
			if (data.$keyChain) {
				if ((!hashId || hashId == 4) && keyString.length == 1) data.$keyChain = data.$keyChain.slice(0, -key.length - 1);
				else if (hashId == -1 || keyCode > 0) data.$keyChain = "";
			}
			return { command };
		}
		getStatusText(editor, data) {
			return data.$keyChain || "";
		}
	};
	function getPosition(command) {
		return typeof command == "object" && command.bindKey && command.bindKey.position || (command.isDefault ? -100 : 0);
	}
	var HashHandler = class extends MultiHashHandler {
		constructor(config, platform) {
			super(config, platform);
			this.$singleCommand = true;
		}
	};
	HashHandler.call = function(thisArg, config, platform) {
		MultiHashHandler.prototype.$init.call(thisArg, config, platform, true);
	};
	MultiHashHandler.call = function(thisArg, config, platform) {
		MultiHashHandler.prototype.$init.call(thisArg, config, platform, false);
	};
	exports.HashHandler = HashHandler;
	exports.MultiHashHandler = MultiHashHandler;
}));
export { require_hash_handler as t };
