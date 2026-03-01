import { r as require_main } from "./base-service-xpXH-mnR.js";
import { n as checkValueAgainstRegexpArray } from "./webworker-s73G42bo.js";
import { t as CommonConverter } from "./common-converters-D_GGbc_h.js";
var import_main = require_main();
function filterDiagnostics(diagnostics, filterErrors) {
	return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
		if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main.DiagnosticSeverity.Warning;
		else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main.DiagnosticSeverity.Information;
		return el;
	});
}
export { filterDiagnostics as t };
