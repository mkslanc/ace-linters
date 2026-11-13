import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/folding/sql.js
var require_sql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_cstyle().FoldMode;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		/** 
		* Inheriting cstyle folding because it handles the region comment folding 
		* and special block comment folding appropriately.
		* 
		* Cstyle's getCommentRegionBlock() contains the sql comment characters '--' for end region block.
		*/
	}).call(FoldMode.prototype);
}));
export { require_sql as t };
