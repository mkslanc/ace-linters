import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
// node_modules/ace-code/src/lib/report_error.js
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
export { require_report_error as t };
