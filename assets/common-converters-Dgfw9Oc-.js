import { r as require_main } from "./base-service-DFS-lxq7.js";
import { t as checkValueAgainstRegexpArray } from "./webworker-V08nRDgr.js";
var AceRange = class AceRange {
	static getConstructor(editor) {
		if (!AceRange._instance && editor) AceRange._instance = editor.getSelectionRange().constructor;
		return AceRange._instance;
	}
};
var import_main = require_main();
let CommonConverter;
(function(_CommonConverter) {
	function normalizeRanges(completions) {
		return completions && completions.map((el) => {
			if (el["range"]) el["range"] = toRange(el["range"]);
			return el;
		});
	}
	_CommonConverter.normalizeRanges = normalizeRanges;
	function cleanHtml(html) {
		return html.replace(/<a\s/, "<a target='_blank' ");
	}
	_CommonConverter.cleanHtml = cleanHtml;
	function toRange(range) {
		if (!range || !range.start || !range.end) return;
		return AceRange.getConstructor().fromPoints(range.start, range.end);
	}
	_CommonConverter.toRange = toRange;
	function convertKind(kind) {
		switch (kind) {
			case "primitiveType":
			case "keyword": return import_main.CompletionItemKind.Keyword;
			case "variable":
			case "localVariable": return import_main.CompletionItemKind.Variable;
			case "memberVariable":
			case "memberGetAccessor":
			case "memberSetAccessor": return import_main.CompletionItemKind.Field;
			case "function":
			case "memberFunction":
			case "constructSignature":
			case "callSignature":
			case "indexSignature": return import_main.CompletionItemKind.Function;
			case "enum": return import_main.CompletionItemKind.Enum;
			case "module": return import_main.CompletionItemKind.Module;
			case "class": return import_main.CompletionItemKind.Class;
			case "interface": return import_main.CompletionItemKind.Interface;
			case "warning": return import_main.CompletionItemKind.File;
		}
		return import_main.CompletionItemKind.Property;
	}
	_CommonConverter.convertKind = convertKind;
	function excludeByErrorMessage(diagnostics, errorMessagesToIgnore, fieldName = "message") {
		if (!errorMessagesToIgnore) return diagnostics;
		return diagnostics.filter((el) => !checkValueAgainstRegexpArray(el[fieldName], errorMessagesToIgnore));
	}
	_CommonConverter.excludeByErrorMessage = excludeByErrorMessage;
})(CommonConverter || (CommonConverter = {}));
export { CommonConverter as t };
