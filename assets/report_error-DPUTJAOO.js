import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
//#region node_modules/ace-code/src/lib/report_error.js
var require_report_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.reportError = function reportError(msg, data) {
		var e = new Error(msg);
		e["data"] = data;
		if (typeof console == "object" && console.error) console.error(e);
		setTimeout(function() {
			throw e;
		});
	};
}));
//#endregion
export { require_report_error as t };
