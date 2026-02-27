import { r as require_main } from "./base-service-_JuBsmr7.js";
import { n as checkValueAgainstRegexpArray } from "./webworker-CRQsmYck.js";
import { t as CommonConverter } from "./common-converters-COWoFEXt.js";
var import_main = require_main();
function filterDiagnostics(diagnostics, filterErrors) {
	return CommonConverter.excludeByErrorMessage(diagnostics, filterErrors.errorMessagesToIgnore).map((el) => {
		if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsWarning)) el.severity = import_main.DiagnosticSeverity.Warning;
		else if (checkValueAgainstRegexpArray(el.message, filterErrors.errorMessagesToTreatAsInfo)) el.severity = import_main.DiagnosticSeverity.Information;
		return el;
	});
}
export { filterDiagnostics as t };
