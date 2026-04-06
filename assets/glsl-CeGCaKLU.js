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
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import "./doc_comment_highlight_rules-DaZtgjLZ.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import { t as require_c_cpp_highlight_rules } from "./c_cpp_highlight_rules-BJmeUa0L.js";
import { t as require_c_cpp } from "./c_cpp-4LE4_F16.js";
//#region node_modules/ace-code/src/mode/glsl_highlight_rules.js
var require_glsl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var c_cppHighlightRules = require_c_cpp_highlight_rules().c_cppHighlightRules;
	var glslHighlightRules = function() {
		var keywords = "attribute|const|uniform|varying|break|continue|do|for|while|if|else|in|out|inout|float|int|void|bool|true|false|lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|samplerCube|struct";
		var buildinConstants = "radians|degrees|sin|cos|tan|asin|acos|atan|pow|exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|faceforward|reflect|refract|matrixCompMult|lessThan|lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|texture2DProjLod|textureCube|textureCubeLod|gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|gl_DepthRangeParameters|gl_DepthRange|gl_Position|gl_PointSize|gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": keywords,
			"constant.language": buildinConstants
		}, "identifier");
		this.$rules = new c_cppHighlightRules().$rules;
		this.$rules.start.forEach(function(rule) {
			if (typeof rule.token == "function") rule.token = keywordMapper;
		});
	};
	oop.inherits(glslHighlightRules, c_cppHighlightRules);
	exports.glslHighlightRules = glslHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/glsl.js
var require_glsl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CMode = require_c_cpp().Mode;
	var glslHighlightRules = require_glsl_highlight_rules().glslHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = glslHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, CMode);
	(function() {
		this.$id = "ace/mode/glsl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_glsl();
