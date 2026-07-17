import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-C-hxENuj.js";
import { t as require_sh } from "./sh-BZoSFbaD.js";
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
