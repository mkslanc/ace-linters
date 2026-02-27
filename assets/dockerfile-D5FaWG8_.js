import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-H6mwzxLp.js";
import { t as require_sh } from "./sh-C2pyZDOS.js";
var require_dockerfile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var ShHighlightRules = require_sh_highlight_rules().ShHighlightRules;
	var DockerfileHighlightRules$1 = function() {
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
	oop$1.inherits(DockerfileHighlightRules$1, ShHighlightRules);
	exports.DockerfileHighlightRules = DockerfileHighlightRules$1;
}));
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
export default require_dockerfile();
