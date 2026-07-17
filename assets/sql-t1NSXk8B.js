import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
//#region node_modules/ace-code/src/mode/folding/sql.js
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
//#endregion
export { require_sql as t };
