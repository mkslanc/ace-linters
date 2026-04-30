import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-FZywQ7yo.js";
import { t as require_sh } from "./sh-CT5FGlUg.js";
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
