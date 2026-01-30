import { r as require_main } from "./base-service-DFS-lxq7.js";
import { t as checkValueAgainstRegexpArray } from "./webworker-V08nRDgr.js";
import { t as CommonConverter } from "./common-converters-Dgfw9Oc-.js";
var import_main = require_main();
function filterDiagnostics(diagnostics, filterErrors) {
	return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
		if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main.DiagnosticSeverity.Warning;
		else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main.DiagnosticSeverity.Information;
		return el;
	});
}
export { filterDiagnostics as t };
