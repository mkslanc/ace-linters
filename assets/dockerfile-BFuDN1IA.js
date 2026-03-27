import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-Ch1u_TpC.js";
import { t as require_sh } from "./sh-BN-OngWc.js";
//#region node_modules/ace-code/src/mode/dockerfile_highlight_rules.js
var require_dockerfile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var ShHighlightRules = require_sh_highlight_rules().ShHighlightRules;
	var DockerfileHighlightRules = function() {
		ShHighlightRules.call(this);
		var startRules = this.$rules.start;
		for (var i = 0; i < startRules.length; i++) if (startRules[i].token == "variable.language") {
			startRules.splice(i, 0, {
				token: "constant.language",
				regex: "(?:^(?:FROM|MAINTAINER|RUN|CMD|EXPOSE|ENV|ADD|ENTRYPOINT|VOLUME|USER|WORKDIR|ONBUILD|COPY|LABEL)\\b)",
				caseInsensitive: true
			});
			break;
		}
	};
	oop.inherits(DockerfileHighlightRules, ShHighlightRules);
	exports.DockerfileHighlightRules = DockerfileHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/dockerfile.js
var require_dockerfile = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var ShMode = require_sh().Mode;
	var DockerfileHighlightRules = require_dockerfile_highlight_rules().DockerfileHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		ShMode.call(this);
		this.HighlightRules = DockerfileHighlightRules;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, ShMode);
	(function() {
		this.$id = "ace/mode/dockerfile";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_dockerfile();
