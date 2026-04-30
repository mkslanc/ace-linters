import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_fold_mode } from "./fold_mode-D_StAfa6.js";
//#region node_modules/ace-code/src/mode/folding/mixed.js
var require_mixed = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var FoldMode = exports.FoldMode = function(defaultMode, subModes) {
		this.defaultMode = defaultMode;
		this.subModes = subModes;
	};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.$getMode = function(state) {
			if (typeof state != "string") state = state[0];
			for (var key in this.subModes) if (state.indexOf(key) === 0) return this.subModes[key];
			return null;
		};
		this.$tryMode = function(state, session, foldStyle, row) {
			var mode = this.$getMode(state);
			return mode ? mode.getFoldWidget(session, foldStyle, row) : "";
		};
		this.getFoldWidget = function(session, foldStyle, row) {
			return this.$tryMode(session.getState(row - 1), session, foldStyle, row) || this.$tryMode(session.getState(row), session, foldStyle, row) || this.defaultMode.getFoldWidget(session, foldStyle, row);
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var mode = this.$getMode(session.getState(row - 1));
			if (!mode || !mode.getFoldWidget(session, foldStyle, row)) mode = this.$getMode(session.getState(row));
			if (!mode || !mode.getFoldWidget(session, foldStyle, row)) mode = this.defaultMode;
			return mode.getFoldWidgetRange(session, foldStyle, row);
		};
	}).call(FoldMode.prototype);
}));
//#endregion
export { require_mixed as t };
