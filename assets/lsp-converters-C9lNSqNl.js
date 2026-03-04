import { r as require_main } from "./base-service-CiPG9cws.js";
import { n as checkValueAgainstRegexpArray } from "./webworker-meO_ZC8h.js";
import { t as CommonConverter } from "./common-converters-2Zc-bbK_.js";
var import_main = require_main();
function filterDiagnostics(diagnostics, filterErrors) {
	return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
		if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main.DiagnosticSeverity.Warning;
		else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main.DiagnosticSeverity.Information;
		return el;
	});
}
export { filterDiagnostics as t };
