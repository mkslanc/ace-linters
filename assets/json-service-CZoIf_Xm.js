import { E as init_main, S as SymbolKind, _ as MarkupKind, b as SelectionRange, c as CompletionItemKind, d as DiagnosticSeverity, g as Location, h as InsertTextFormat, m as FoldingRangeKind, n as TextDocument, s as CompletionItem, t as BaseService, u as Diagnostic, v as Position, w as TextEdit, y as Range } from "./base-service-DFS-lxq7.js";
import { i as Utils, r as URI } from "./webworker-V08nRDgr.js";
import { t } from "./browser-CVjBY2ny.js";
import "./common-converters-Dgfw9Oc-.js";
import { t as filterDiagnostics } from "./lsp-converters-B9Sduy3m.js";
function createScanner$1(text, ignoreTrivia = false) {
	const len = text.length;
	let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
	function scanHexDigits(count, exact) {
		let digits = 0;
		let value$1 = 0;
		while (digits < count || !exact) {
			let ch = text.charCodeAt(pos);
			if (ch >= 48 && ch <= 57) value$1 = value$1 * 16 + ch - 48;
			else if (ch >= 65 && ch <= 70) value$1 = value$1 * 16 + ch - 65 + 10;
			else if (ch >= 97 && ch <= 102) value$1 = value$1 * 16 + ch - 97 + 10;
			else break;
			pos++;
			digits++;
		}
		if (digits < count) value$1 = -1;
		return value$1;
	}
	function setPosition(newPosition) {
		pos = newPosition;
		value = "";
		tokenOffset = 0;
		token = 16;
		scanError = 0;
	}
	function scanNumber() {
		let start = pos;
		if (text.charCodeAt(pos) === 48) pos++;
		else {
			pos++;
			while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
		}
		if (pos < text.length && text.charCodeAt(pos) === 46) {
			pos++;
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
			} else {
				scanError = 3;
				return text.substring(start, pos);
			}
		}
		let end = pos;
		if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
			pos++;
			if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) pos++;
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) pos++;
				end = pos;
			} else scanError = 3;
		}
		return text.substring(start, end);
	}
	function scanString() {
		let result = "", start = pos;
		while (true) {
			if (pos >= len) {
				result += text.substring(start, pos);
				scanError = 2;
				break;
			}
			const ch = text.charCodeAt(pos);
			if (ch === 34) {
				result += text.substring(start, pos);
				pos++;
				break;
			}
			if (ch === 92) {
				result += text.substring(start, pos);
				pos++;
				if (pos >= len) {
					scanError = 2;
					break;
				}
				switch (text.charCodeAt(pos++)) {
					case 34:
						result += "\"";
						break;
					case 92:
						result += "\\";
						break;
					case 47:
						result += "/";
						break;
					case 98:
						result += "\b";
						break;
					case 102:
						result += "\f";
						break;
					case 110:
						result += "\n";
						break;
					case 114:
						result += "\r";
						break;
					case 116:
						result += "	";
						break;
					case 117:
						const ch3 = scanHexDigits(4, true);
						if (ch3 >= 0) result += String.fromCharCode(ch3);
						else scanError = 4;
						break;
					default: scanError = 5;
				}
				start = pos;
				continue;
			}
			if (ch >= 0 && ch <= 31) if (isLineBreak(ch)) {
				result += text.substring(start, pos);
				scanError = 2;
				break;
			} else scanError = 6;
			pos++;
		}
		return result;
	}
	function scanNext() {
		value = "";
		scanError = 0;
		tokenOffset = pos;
		lineStartOffset = lineNumber;
		prevTokenLineStartOffset = tokenLineStartOffset;
		if (pos >= len) {
			tokenOffset = len;
			return token = 17;
		}
		let code = text.charCodeAt(pos);
		if (isWhiteSpace(code)) {
			do {
				pos++;
				value += String.fromCharCode(code);
				code = text.charCodeAt(pos);
			} while (isWhiteSpace(code));
			return token = 15;
		}
		if (isLineBreak(code)) {
			pos++;
			value += String.fromCharCode(code);
			if (code === 13 && text.charCodeAt(pos) === 10) {
				pos++;
				value += "\n";
			}
			lineNumber++;
			tokenLineStartOffset = pos;
			return token = 14;
		}
		switch (code) {
			case 123:
				pos++;
				return token = 1;
			case 125:
				pos++;
				return token = 2;
			case 91:
				pos++;
				return token = 3;
			case 93:
				pos++;
				return token = 4;
			case 58:
				pos++;
				return token = 6;
			case 44:
				pos++;
				return token = 5;
			case 34:
				pos++;
				value = scanString();
				return token = 10;
			case 47:
				const start = pos - 1;
				if (text.charCodeAt(pos + 1) === 47) {
					pos += 2;
					while (pos < len) {
						if (isLineBreak(text.charCodeAt(pos))) break;
						pos++;
					}
					value = text.substring(start, pos);
					return token = 12;
				}
				if (text.charCodeAt(pos + 1) === 42) {
					pos += 2;
					const safeLength = len - 1;
					let commentClosed = false;
					while (pos < safeLength) {
						const ch = text.charCodeAt(pos);
						if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
							pos += 2;
							commentClosed = true;
							break;
						}
						pos++;
						if (isLineBreak(ch)) {
							if (ch === 13 && text.charCodeAt(pos) === 10) pos++;
							lineNumber++;
							tokenLineStartOffset = pos;
						}
					}
					if (!commentClosed) {
						pos++;
						scanError = 1;
					}
					value = text.substring(start, pos);
					return token = 13;
				}
				value += String.fromCharCode(code);
				pos++;
				return token = 16;
			case 45:
				value += String.fromCharCode(code);
				pos++;
				if (pos === len || !isDigit(text.charCodeAt(pos))) return token = 16;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				value += scanNumber();
				return token = 11;
			default:
				while (pos < len && isUnknownContentCharacter(code)) {
					pos++;
					code = text.charCodeAt(pos);
				}
				if (tokenOffset !== pos) {
					value = text.substring(tokenOffset, pos);
					switch (value) {
						case "true": return token = 8;
						case "false": return token = 9;
						case "null": return token = 7;
					}
					return token = 16;
				}
				value += String.fromCharCode(code);
				pos++;
				return token = 16;
		}
	}
	function isUnknownContentCharacter(code) {
		if (isWhiteSpace(code) || isLineBreak(code)) return false;
		switch (code) {
			case 125:
			case 93:
			case 123:
			case 91:
			case 34:
			case 58:
			case 44:
			case 47: return false;
		}
		return true;
	}
	function scanNextNonTrivia() {
		let result;
		do
			result = scanNext();
		while (result >= 12 && result <= 15);
		return result;
	}
	return {
		setPosition,
		getPosition: () => pos,
		scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
		getToken: () => token,
		getTokenValue: () => value,
		getTokenOffset: () => tokenOffset,
		getTokenLength: () => pos - tokenOffset,
		getTokenStartLine: () => lineStartOffset,
		getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
		getTokenError: () => scanError
	};
}
function isWhiteSpace(ch) {
	return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
	return ch === 10 || ch === 13;
}
function isDigit(ch) {
	return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes$1) {
	CharacterCodes$1[CharacterCodes$1["lineFeed"] = 10] = "lineFeed";
	CharacterCodes$1[CharacterCodes$1["carriageReturn"] = 13] = "carriageReturn";
	CharacterCodes$1[CharacterCodes$1["space"] = 32] = "space";
	CharacterCodes$1[CharacterCodes$1["_0"] = 48] = "_0";
	CharacterCodes$1[CharacterCodes$1["_1"] = 49] = "_1";
	CharacterCodes$1[CharacterCodes$1["_2"] = 50] = "_2";
	CharacterCodes$1[CharacterCodes$1["_3"] = 51] = "_3";
	CharacterCodes$1[CharacterCodes$1["_4"] = 52] = "_4";
	CharacterCodes$1[CharacterCodes$1["_5"] = 53] = "_5";
	CharacterCodes$1[CharacterCodes$1["_6"] = 54] = "_6";
	CharacterCodes$1[CharacterCodes$1["_7"] = 55] = "_7";
	CharacterCodes$1[CharacterCodes$1["_8"] = 56] = "_8";
	CharacterCodes$1[CharacterCodes$1["_9"] = 57] = "_9";
	CharacterCodes$1[CharacterCodes$1["a"] = 97] = "a";
	CharacterCodes$1[CharacterCodes$1["b"] = 98] = "b";
	CharacterCodes$1[CharacterCodes$1["c"] = 99] = "c";
	CharacterCodes$1[CharacterCodes$1["d"] = 100] = "d";
	CharacterCodes$1[CharacterCodes$1["e"] = 101] = "e";
	CharacterCodes$1[CharacterCodes$1["f"] = 102] = "f";
	CharacterCodes$1[CharacterCodes$1["g"] = 103] = "g";
	CharacterCodes$1[CharacterCodes$1["h"] = 104] = "h";
	CharacterCodes$1[CharacterCodes$1["i"] = 105] = "i";
	CharacterCodes$1[CharacterCodes$1["j"] = 106] = "j";
	CharacterCodes$1[CharacterCodes$1["k"] = 107] = "k";
	CharacterCodes$1[CharacterCodes$1["l"] = 108] = "l";
	CharacterCodes$1[CharacterCodes$1["m"] = 109] = "m";
	CharacterCodes$1[CharacterCodes$1["n"] = 110] = "n";
	CharacterCodes$1[CharacterCodes$1["o"] = 111] = "o";
	CharacterCodes$1[CharacterCodes$1["p"] = 112] = "p";
	CharacterCodes$1[CharacterCodes$1["q"] = 113] = "q";
	CharacterCodes$1[CharacterCodes$1["r"] = 114] = "r";
	CharacterCodes$1[CharacterCodes$1["s"] = 115] = "s";
	CharacterCodes$1[CharacterCodes$1["t"] = 116] = "t";
	CharacterCodes$1[CharacterCodes$1["u"] = 117] = "u";
	CharacterCodes$1[CharacterCodes$1["v"] = 118] = "v";
	CharacterCodes$1[CharacterCodes$1["w"] = 119] = "w";
	CharacterCodes$1[CharacterCodes$1["x"] = 120] = "x";
	CharacterCodes$1[CharacterCodes$1["y"] = 121] = "y";
	CharacterCodes$1[CharacterCodes$1["z"] = 122] = "z";
	CharacterCodes$1[CharacterCodes$1["A"] = 65] = "A";
	CharacterCodes$1[CharacterCodes$1["B"] = 66] = "B";
	CharacterCodes$1[CharacterCodes$1["C"] = 67] = "C";
	CharacterCodes$1[CharacterCodes$1["D"] = 68] = "D";
	CharacterCodes$1[CharacterCodes$1["E"] = 69] = "E";
	CharacterCodes$1[CharacterCodes$1["F"] = 70] = "F";
	CharacterCodes$1[CharacterCodes$1["G"] = 71] = "G";
	CharacterCodes$1[CharacterCodes$1["H"] = 72] = "H";
	CharacterCodes$1[CharacterCodes$1["I"] = 73] = "I";
	CharacterCodes$1[CharacterCodes$1["J"] = 74] = "J";
	CharacterCodes$1[CharacterCodes$1["K"] = 75] = "K";
	CharacterCodes$1[CharacterCodes$1["L"] = 76] = "L";
	CharacterCodes$1[CharacterCodes$1["M"] = 77] = "M";
	CharacterCodes$1[CharacterCodes$1["N"] = 78] = "N";
	CharacterCodes$1[CharacterCodes$1["O"] = 79] = "O";
	CharacterCodes$1[CharacterCodes$1["P"] = 80] = "P";
	CharacterCodes$1[CharacterCodes$1["Q"] = 81] = "Q";
	CharacterCodes$1[CharacterCodes$1["R"] = 82] = "R";
	CharacterCodes$1[CharacterCodes$1["S"] = 83] = "S";
	CharacterCodes$1[CharacterCodes$1["T"] = 84] = "T";
	CharacterCodes$1[CharacterCodes$1["U"] = 85] = "U";
	CharacterCodes$1[CharacterCodes$1["V"] = 86] = "V";
	CharacterCodes$1[CharacterCodes$1["W"] = 87] = "W";
	CharacterCodes$1[CharacterCodes$1["X"] = 88] = "X";
	CharacterCodes$1[CharacterCodes$1["Y"] = 89] = "Y";
	CharacterCodes$1[CharacterCodes$1["Z"] = 90] = "Z";
	CharacterCodes$1[CharacterCodes$1["asterisk"] = 42] = "asterisk";
	CharacterCodes$1[CharacterCodes$1["backslash"] = 92] = "backslash";
	CharacterCodes$1[CharacterCodes$1["closeBrace"] = 125] = "closeBrace";
	CharacterCodes$1[CharacterCodes$1["closeBracket"] = 93] = "closeBracket";
	CharacterCodes$1[CharacterCodes$1["colon"] = 58] = "colon";
	CharacterCodes$1[CharacterCodes$1["comma"] = 44] = "comma";
	CharacterCodes$1[CharacterCodes$1["dot"] = 46] = "dot";
	CharacterCodes$1[CharacterCodes$1["doubleQuote"] = 34] = "doubleQuote";
	CharacterCodes$1[CharacterCodes$1["minus"] = 45] = "minus";
	CharacterCodes$1[CharacterCodes$1["openBrace"] = 123] = "openBrace";
	CharacterCodes$1[CharacterCodes$1["openBracket"] = 91] = "openBracket";
	CharacterCodes$1[CharacterCodes$1["plus"] = 43] = "plus";
	CharacterCodes$1[CharacterCodes$1["slash"] = 47] = "slash";
	CharacterCodes$1[CharacterCodes$1["formFeed"] = 12] = "formFeed";
	CharacterCodes$1[CharacterCodes$1["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));
const cachedSpaces = new Array(20).fill(0).map((_, index) => {
	return " ".repeat(index);
});
const maxCachedValues = 200;
const cachedBreakLinesWithSpaces = {
	" ": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + " ".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + " ".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + " ".repeat(index);
		})
	},
	"	": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + "	".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + "	".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + "	".repeat(index);
		})
	}
};
const supportedEols = [
	"\n",
	"\r",
	"\r\n"
];
function format$2(documentText, range, options) {
	let initialIndentLevel;
	let formatText;
	let formatTextStart;
	let rangeStart;
	let rangeEnd;
	if (range) {
		rangeStart = range.offset;
		rangeEnd = rangeStart + range.length;
		formatTextStart = rangeStart;
		while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) formatTextStart--;
		let endOffset = rangeEnd;
		while (endOffset < documentText.length && !isEOL(documentText, endOffset)) endOffset++;
		formatText = documentText.substring(formatTextStart, endOffset);
		initialIndentLevel = computeIndentLevel(formatText, options);
	} else {
		formatText = documentText;
		initialIndentLevel = 0;
		formatTextStart = 0;
		rangeStart = 0;
		rangeEnd = documentText.length;
	}
	const eol = getEOL(options, documentText);
	const eolFastPathSupported = supportedEols.includes(eol);
	let numberLineBreaks = 0;
	let indentLevel = 0;
	let indentValue;
	if (options.insertSpaces) indentValue = cachedSpaces[options.tabSize || 4] ?? repeat(cachedSpaces[1], options.tabSize || 4);
	else indentValue = "	";
	const indentType = indentValue === "	" ? "	" : " ";
	let scanner = createScanner$1(formatText, false);
	let hasError = false;
	function newLinesAndIndent() {
		if (numberLineBreaks > 1) return repeat(eol, numberLineBreaks) + repeat(indentValue, initialIndentLevel + indentLevel);
		const amountOfSpaces = indentValue.length * (initialIndentLevel + indentLevel);
		if (!eolFastPathSupported || amountOfSpaces > cachedBreakLinesWithSpaces[indentType][eol].length) return eol + repeat(indentValue, initialIndentLevel + indentLevel);
		if (amountOfSpaces <= 0) return eol;
		return cachedBreakLinesWithSpaces[indentType][eol][amountOfSpaces];
	}
	function scanNext() {
		let token = scanner.scan();
		numberLineBreaks = 0;
		while (token === 15 || token === 14) {
			if (token === 14 && options.keepLines) numberLineBreaks += 1;
			else if (token === 14) numberLineBreaks = 1;
			token = scanner.scan();
		}
		hasError = token === 16 || scanner.getTokenError() !== 0;
		return token;
	}
	const editOperations = [];
	function addEdit(text, startOffset, endOffset) {
		if (!hasError && (!range || startOffset < rangeEnd && endOffset > rangeStart) && documentText.substring(startOffset, endOffset) !== text) editOperations.push({
			offset: startOffset,
			length: endOffset - startOffset,
			content: text
		});
	}
	let firstToken = scanNext();
	if (options.keepLines && numberLineBreaks > 0) addEdit(repeat(eol, numberLineBreaks), 0, 0);
	if (firstToken !== 17) {
		let firstTokenStart = scanner.getTokenOffset() + formatTextStart;
		addEdit(indentValue.length * initialIndentLevel < 20 && options.insertSpaces ? cachedSpaces[indentValue.length * initialIndentLevel] : repeat(indentValue, initialIndentLevel), formatTextStart, firstTokenStart);
	}
	while (firstToken !== 17) {
		let firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
		let secondToken = scanNext();
		let replaceContent = "";
		let needsLineBreak = false;
		while (numberLineBreaks === 0 && (secondToken === 12 || secondToken === 13)) {
			let commentTokenStart = scanner.getTokenOffset() + formatTextStart;
			addEdit(cachedSpaces[1], firstTokenEnd, commentTokenStart);
			firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
			needsLineBreak = secondToken === 12;
			replaceContent = needsLineBreak ? newLinesAndIndent() : "";
			secondToken = scanNext();
		}
		if (secondToken === 2) {
			if (firstToken !== 1) indentLevel--;
			if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 1) replaceContent = newLinesAndIndent();
			else if (options.keepLines) replaceContent = cachedSpaces[1];
		} else if (secondToken === 4) {
			if (firstToken !== 3) indentLevel--;
			if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 3) replaceContent = newLinesAndIndent();
			else if (options.keepLines) replaceContent = cachedSpaces[1];
		} else {
			switch (firstToken) {
				case 3:
				case 1:
					indentLevel++;
					if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) replaceContent = newLinesAndIndent();
					else replaceContent = cachedSpaces[1];
					break;
				case 5:
					if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) replaceContent = newLinesAndIndent();
					else replaceContent = cachedSpaces[1];
					break;
				case 12:
					replaceContent = newLinesAndIndent();
					break;
				case 13:
					if (numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (!needsLineBreak) replaceContent = cachedSpaces[1];
					break;
				case 6:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (!needsLineBreak) replaceContent = cachedSpaces[1];
					break;
				case 10:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if (secondToken === 6 && !needsLineBreak) replaceContent = "";
					break;
				case 7:
				case 8:
				case 9:
				case 11:
				case 2:
				case 4:
					if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
					else if ((secondToken === 12 || secondToken === 13) && !needsLineBreak) replaceContent = cachedSpaces[1];
					else if (secondToken !== 5 && secondToken !== 17) hasError = true;
					break;
				case 16:
					hasError = true;
					break;
			}
			if (numberLineBreaks > 0 && (secondToken === 12 || secondToken === 13)) replaceContent = newLinesAndIndent();
		}
		if (secondToken === 17) if (options.keepLines && numberLineBreaks > 0) replaceContent = newLinesAndIndent();
		else replaceContent = options.insertFinalNewline ? eol : "";
		const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
		addEdit(replaceContent, firstTokenEnd, secondTokenStart);
		firstToken = secondToken;
	}
	return editOperations;
}
function repeat(s, count) {
	let result = "";
	for (let i = 0; i < count; i++) result += s;
	return result;
}
function computeIndentLevel(content, options) {
	let i = 0;
	let nChars = 0;
	const tabSize = options.tabSize || 4;
	while (i < content.length) {
		let ch = content.charAt(i);
		if (ch === cachedSpaces[1]) nChars++;
		else if (ch === "	") nChars += tabSize;
		else break;
		i++;
	}
	return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
	for (let i = 0; i < text.length; i++) {
		const ch = text.charAt(i);
		if (ch === "\r") {
			if (i + 1 < text.length && text.charAt(i + 1) === "\n") return "\r\n";
			return "\r";
		} else if (ch === "\n") return "\n";
	}
	return options && options.eol || "\n";
}
function isEOL(text, offset) {
	return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
var ParseOptions;
(function(ParseOptions$1) {
	ParseOptions$1.DEFAULT = { allowTrailingComma: false };
})(ParseOptions || (ParseOptions = {}));
function parse$2(text, errors = [], options = ParseOptions.DEFAULT) {
	let currentProperty = null;
	let currentParent = [];
	const previousParents = [];
	function onValue(value) {
		if (Array.isArray(currentParent)) currentParent.push(value);
		else if (currentProperty !== null) currentParent[currentProperty] = value;
	}
	visit$1(text, {
		onObjectBegin: () => {
			const object = {};
			onValue(object);
			previousParents.push(currentParent);
			currentParent = object;
			currentProperty = null;
		},
		onObjectProperty: (name) => {
			currentProperty = name;
		},
		onObjectEnd: () => {
			currentParent = previousParents.pop();
		},
		onArrayBegin: () => {
			const array = [];
			onValue(array);
			previousParents.push(currentParent);
			currentParent = array;
			currentProperty = null;
		},
		onArrayEnd: () => {
			currentParent = previousParents.pop();
		},
		onLiteralValue: onValue,
		onError: (error, offset, length) => {
			errors.push({
				error,
				offset,
				length
			});
		}
	}, options);
	return currentParent[0];
}
function getNodePath$2(node) {
	if (!node.parent || !node.parent.children) return [];
	const path = getNodePath$2(node.parent);
	if (node.parent.type === "property") {
		const key = node.parent.children[0].value;
		path.push(key);
	} else if (node.parent.type === "array") {
		const index = node.parent.children.indexOf(node);
		if (index !== -1) path.push(index);
	}
	return path;
}
function getNodeValue$2(node) {
	switch (node.type) {
		case "array": return node.children.map(getNodeValue$2);
		case "object":
			const obj = Object.create(null);
			for (let prop of node.children) {
				const valueNode = prop.children[1];
				if (valueNode) obj[prop.children[0].value] = getNodeValue$2(valueNode);
			}
			return obj;
		case "null":
		case "string":
		case "number":
		case "boolean": return node.value;
		default: return;
	}
}
function contains$1(node, offset, includeRightBound = false) {
	return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
function findNodeAtOffset$1(node, offset, includeRightBound = false) {
	if (contains$1(node, offset, includeRightBound)) {
		const children = node.children;
		if (Array.isArray(children)) for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
			const item = findNodeAtOffset$1(children[i], offset, includeRightBound);
			if (item) return item;
		}
		return node;
	}
}
function visit$1(text, visitor, options = ParseOptions.DEFAULT) {
	const _scanner = createScanner$1(text, false);
	const _jsonPath = [];
	let suppressedCallbacks = 0;
	function toNoArgVisit(visitFunction) {
		return visitFunction ? () => suppressedCallbacks === 0 && visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
	}
	function toOneArgVisit(visitFunction) {
		return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
	}
	function toOneArgVisitWithPath(visitFunction) {
		return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
	}
	function toBeginVisit(visitFunction) {
		return visitFunction ? () => {
			if (suppressedCallbacks > 0) suppressedCallbacks++;
			else if (visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) === false) suppressedCallbacks = 1;
		} : () => true;
	}
	function toEndVisit(visitFunction) {
		return visitFunction ? () => {
			if (suppressedCallbacks > 0) suppressedCallbacks--;
			if (suppressedCallbacks === 0) visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
		} : () => true;
	}
	const onObjectBegin = toBeginVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toEndVisit(visitor.onObjectEnd), onArrayBegin = toBeginVisit(visitor.onArrayBegin), onArrayEnd = toEndVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
	const disallowComments = options && options.disallowComments;
	const allowTrailingComma = options && options.allowTrailingComma;
	function scanNext() {
		while (true) {
			const token = _scanner.scan();
			switch (_scanner.getTokenError()) {
				case 4:
					handleError(14);
					break;
				case 5:
					handleError(15);
					break;
				case 3:
					handleError(13);
					break;
				case 1:
					if (!disallowComments) handleError(11);
					break;
				case 2:
					handleError(12);
					break;
				case 6:
					handleError(16);
					break;
			}
			switch (token) {
				case 12:
				case 13:
					if (disallowComments) handleError(10);
					else onComment();
					break;
				case 16:
					handleError(1);
					break;
				case 15:
				case 14: break;
				default: return token;
			}
		}
	}
	function handleError(error, skipUntilAfter = [], skipUntil = []) {
		onError(error);
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token = _scanner.getToken();
			while (token !== 17) {
				if (skipUntilAfter.indexOf(token) !== -1) {
					scanNext();
					break;
				} else if (skipUntil.indexOf(token) !== -1) break;
				token = scanNext();
			}
		}
	}
	function parseString(isValue) {
		const value = _scanner.getTokenValue();
		if (isValue) onLiteralValue(value);
		else {
			onObjectProperty(value);
			_jsonPath.push(value);
		}
		scanNext();
		return true;
	}
	function parseLiteral() {
		switch (_scanner.getToken()) {
			case 11:
				const tokenValue = _scanner.getTokenValue();
				let value = Number(tokenValue);
				if (isNaN(value)) {
					handleError(2);
					value = 0;
				}
				onLiteralValue(value);
				break;
			case 7:
				onLiteralValue(null);
				break;
			case 8:
				onLiteralValue(true);
				break;
			case 9:
				onLiteralValue(false);
				break;
			default: return false;
		}
		scanNext();
		return true;
	}
	function parseProperty() {
		if (_scanner.getToken() !== 10) {
			handleError(3, [], [2, 5]);
			return false;
		}
		parseString(false);
		if (_scanner.getToken() === 6) {
			onSeparator(":");
			scanNext();
			if (!parseValue()) handleError(4, [], [2, 5]);
		} else handleError(5, [], [2, 5]);
		_jsonPath.pop();
		return true;
	}
	function parseObject() {
		onObjectBegin();
		scanNext();
		let needsComma = false;
		while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) handleError(4, [], []);
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 2 && allowTrailingComma) break;
			} else if (needsComma) handleError(6, [], []);
			if (!parseProperty()) handleError(4, [], [2, 5]);
			needsComma = true;
		}
		onObjectEnd();
		if (_scanner.getToken() !== 2) handleError(7, [2], []);
		else scanNext();
		return true;
	}
	function parseArray() {
		onArrayBegin();
		scanNext();
		let isFirstElement = true;
		let needsComma = false;
		while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) handleError(4, [], []);
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 4 && allowTrailingComma) break;
			} else if (needsComma) handleError(6, [], []);
			if (isFirstElement) {
				_jsonPath.push(0);
				isFirstElement = false;
			} else _jsonPath[_jsonPath.length - 1]++;
			if (!parseValue()) handleError(4, [], [4, 5]);
			needsComma = true;
		}
		onArrayEnd();
		if (!isFirstElement) _jsonPath.pop();
		if (_scanner.getToken() !== 4) handleError(8, [4], []);
		else scanNext();
		return true;
	}
	function parseValue() {
		switch (_scanner.getToken()) {
			case 3: return parseArray();
			case 1: return parseObject();
			case 10: return parseString(true);
			default: return parseLiteral();
		}
	}
	scanNext();
	if (_scanner.getToken() === 17) {
		if (options.allowEmptyContent) return true;
		handleError(4, [], []);
		return false;
	}
	if (!parseValue()) {
		handleError(4, [], []);
		return false;
	}
	if (_scanner.getToken() !== 17) handleError(9, [], []);
	return true;
}
const createScanner = createScanner$1;
var ScanError;
(function(ScanError$1) {
	ScanError$1[ScanError$1["None"] = 0] = "None";
	ScanError$1[ScanError$1["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
	ScanError$1[ScanError$1["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
	ScanError$1[ScanError$1["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
	ScanError$1[ScanError$1["InvalidUnicode"] = 4] = "InvalidUnicode";
	ScanError$1[ScanError$1["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
	ScanError$1[ScanError$1["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind$1) {
	SyntaxKind$1[SyntaxKind$1["OpenBraceToken"] = 1] = "OpenBraceToken";
	SyntaxKind$1[SyntaxKind$1["CloseBraceToken"] = 2] = "CloseBraceToken";
	SyntaxKind$1[SyntaxKind$1["OpenBracketToken"] = 3] = "OpenBracketToken";
	SyntaxKind$1[SyntaxKind$1["CloseBracketToken"] = 4] = "CloseBracketToken";
	SyntaxKind$1[SyntaxKind$1["CommaToken"] = 5] = "CommaToken";
	SyntaxKind$1[SyntaxKind$1["ColonToken"] = 6] = "ColonToken";
	SyntaxKind$1[SyntaxKind$1["NullKeyword"] = 7] = "NullKeyword";
	SyntaxKind$1[SyntaxKind$1["TrueKeyword"] = 8] = "TrueKeyword";
	SyntaxKind$1[SyntaxKind$1["FalseKeyword"] = 9] = "FalseKeyword";
	SyntaxKind$1[SyntaxKind$1["StringLiteral"] = 10] = "StringLiteral";
	SyntaxKind$1[SyntaxKind$1["NumericLiteral"] = 11] = "NumericLiteral";
	SyntaxKind$1[SyntaxKind$1["LineCommentTrivia"] = 12] = "LineCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["LineBreakTrivia"] = 14] = "LineBreakTrivia";
	SyntaxKind$1[SyntaxKind$1["Trivia"] = 15] = "Trivia";
	SyntaxKind$1[SyntaxKind$1["Unknown"] = 16] = "Unknown";
	SyntaxKind$1[SyntaxKind$1["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
const parse$1 = parse$2;
const findNodeAtOffset = findNodeAtOffset$1;
const getNodePath$1 = getNodePath$2;
const getNodeValue$1 = getNodeValue$2;
var ParseErrorCode;
(function(ParseErrorCode$1) {
	ParseErrorCode$1[ParseErrorCode$1["InvalidSymbol"] = 1] = "InvalidSymbol";
	ParseErrorCode$1[ParseErrorCode$1["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
	ParseErrorCode$1[ParseErrorCode$1["PropertyNameExpected"] = 3] = "PropertyNameExpected";
	ParseErrorCode$1[ParseErrorCode$1["ValueExpected"] = 4] = "ValueExpected";
	ParseErrorCode$1[ParseErrorCode$1["ColonExpected"] = 5] = "ColonExpected";
	ParseErrorCode$1[ParseErrorCode$1["CommaExpected"] = 6] = "CommaExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBraceExpected"] = 7] = "CloseBraceExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBracketExpected"] = 8] = "CloseBracketExpected";
	ParseErrorCode$1[ParseErrorCode$1["EndOfFileExpected"] = 9] = "EndOfFileExpected";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCommentToken"] = 10] = "InvalidCommentToken";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
	ParseErrorCode$1[ParseErrorCode$1["InvalidUnicode"] = 14] = "InvalidUnicode";
	ParseErrorCode$1[ParseErrorCode$1["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));
function format$1(documentText, range, options) {
	return format$2(documentText, range, options);
}
function equals(one, other) {
	if (one === other) return true;
	if (one === null || one === void 0 || other === null || other === void 0) return false;
	if (typeof one !== typeof other) return false;
	if (typeof one !== "object") return false;
	if (Array.isArray(one) !== Array.isArray(other)) return false;
	let i, key;
	if (Array.isArray(one)) {
		if (one.length !== other.length) return false;
		for (i = 0; i < one.length; i++) if (!equals(one[i], other[i])) return false;
	} else {
		const oneKeys = [];
		for (key in one) oneKeys.push(key);
		oneKeys.sort();
		const otherKeys = [];
		for (key in other) otherKeys.push(key);
		otherKeys.sort();
		if (!equals(oneKeys, otherKeys)) return false;
		for (i = 0; i < oneKeys.length; i++) if (!equals(one[oneKeys[i]], other[oneKeys[i]])) return false;
	}
	return true;
}
function isNumber(val) {
	return typeof val === "number";
}
function isDefined(val) {
	return typeof val !== "undefined";
}
function isBoolean(val) {
	return typeof val === "boolean";
}
function isString(val) {
	return typeof val === "string";
}
function isObject(val) {
	return typeof val === "object" && val !== null && !Array.isArray(val);
}
function startsWith(haystack, needle) {
	if (haystack.length < needle.length) return false;
	for (let i = 0; i < needle.length; i++) if (haystack[i] !== needle[i]) return false;
	return true;
}
function endsWith(haystack, needle) {
	const diff = haystack.length - needle.length;
	if (diff > 0) return haystack.lastIndexOf(needle) === diff;
	else if (diff === 0) return haystack === needle;
	else return false;
}
function extendedRegExp(pattern) {
	let flags = "";
	if (startsWith(pattern, "(?i)")) {
		pattern = pattern.substring(4);
		flags = "i";
	}
	try {
		return new RegExp(pattern, flags + "u");
	} catch (e) {
		try {
			return new RegExp(pattern, flags);
		} catch (e$1) {
			return;
		}
	}
}
function stringLength(str) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		count++;
		const code = str.charCodeAt(i);
		if (55296 <= code && code <= 56319) i++;
	}
	return count;
}
init_main();
var ErrorCode;
(function(ErrorCode$1) {
	ErrorCode$1[ErrorCode$1["Undefined"] = 0] = "Undefined";
	ErrorCode$1[ErrorCode$1["EnumValueMismatch"] = 1] = "EnumValueMismatch";
	ErrorCode$1[ErrorCode$1["Deprecated"] = 2] = "Deprecated";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
	ErrorCode$1[ErrorCode$1["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
	ErrorCode$1[ErrorCode$1["InvalidUnicode"] = 260] = "InvalidUnicode";
	ErrorCode$1[ErrorCode$1["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
	ErrorCode$1[ErrorCode$1["InvalidCharacter"] = 262] = "InvalidCharacter";
	ErrorCode$1[ErrorCode$1["PropertyExpected"] = 513] = "PropertyExpected";
	ErrorCode$1[ErrorCode$1["CommaExpected"] = 514] = "CommaExpected";
	ErrorCode$1[ErrorCode$1["ColonExpected"] = 515] = "ColonExpected";
	ErrorCode$1[ErrorCode$1["ValueExpected"] = 516] = "ValueExpected";
	ErrorCode$1[ErrorCode$1["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
	ErrorCode$1[ErrorCode$1["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
	ErrorCode$1[ErrorCode$1["TrailingComma"] = 519] = "TrailingComma";
	ErrorCode$1[ErrorCode$1["DuplicateKey"] = 520] = "DuplicateKey";
	ErrorCode$1[ErrorCode$1["CommentNotPermitted"] = 521] = "CommentNotPermitted";
	ErrorCode$1[ErrorCode$1["PropertyKeysMustBeDoublequoted"] = 528] = "PropertyKeysMustBeDoublequoted";
	ErrorCode$1[ErrorCode$1["SchemaResolveError"] = 768] = "SchemaResolveError";
	ErrorCode$1[ErrorCode$1["SchemaUnsupportedFeature"] = 769] = "SchemaUnsupportedFeature";
})(ErrorCode || (ErrorCode = {}));
var SchemaDraft;
(function(SchemaDraft$1) {
	SchemaDraft$1[SchemaDraft$1["v3"] = 3] = "v3";
	SchemaDraft$1[SchemaDraft$1["v4"] = 4] = "v4";
	SchemaDraft$1[SchemaDraft$1["v6"] = 6] = "v6";
	SchemaDraft$1[SchemaDraft$1["v7"] = 7] = "v7";
	SchemaDraft$1[SchemaDraft$1["v2019_09"] = 19] = "v2019_09";
	SchemaDraft$1[SchemaDraft$1["v2020_12"] = 20] = "v2020_12";
})(SchemaDraft || (SchemaDraft = {}));
var ClientCapabilities;
(function(ClientCapabilities$1) {
	ClientCapabilities$1.LATEST = { textDocument: { completion: { completionItem: {
		documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
		commitCharactersSupport: true,
		labelDetailsSupport: true
	} } } };
})(ClientCapabilities || (ClientCapabilities = {}));
const formats = {
	"color-hex": {
		errorMessage: t("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
		pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
	},
	"date-time": {
		errorMessage: t("String is not a RFC3339 date-time."),
		pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
	},
	"date": {
		errorMessage: t("String is not a RFC3339 date."),
		pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
	},
	"time": {
		errorMessage: t("String is not a RFC3339 time."),
		pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
	},
	"email": {
		errorMessage: t("String is not an e-mail address."),
		pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/
	},
	"hostname": {
		errorMessage: t("String is not a hostname."),
		pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i
	},
	"ipv4": {
		errorMessage: t("String is not an IPv4 address."),
		pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
	},
	"ipv6": {
		errorMessage: t("String is not an IPv6 address."),
		pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i
	}
};
var ASTNodeImpl = class {
	constructor(parent, offset, length = 0) {
		this.offset = offset;
		this.length = length;
		this.parent = parent;
	}
	get children() {
		return [];
	}
	toString() {
		return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
	}
};
var NullASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "null";
		this.value = null;
	}
};
var BooleanASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, boolValue, offset) {
		super(parent, offset);
		this.type = "boolean";
		this.value = boolValue;
	}
};
var ArrayASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "array";
		this.items = [];
	}
	get children() {
		return this.items;
	}
};
var NumberASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "number";
		this.isInteger = true;
		this.value = NaN;
	}
};
var StringASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset, length) {
		super(parent, offset, length);
		this.type = "string";
		this.value = "";
	}
};
var PropertyASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset, keyNode) {
		super(parent, offset);
		this.type = "property";
		this.colonOffset = -1;
		this.keyNode = keyNode;
	}
	get children() {
		return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
	}
};
var ObjectASTNodeImpl = class extends ASTNodeImpl {
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "object";
		this.properties = [];
	}
	get children() {
		return this.properties;
	}
};
function asSchema(schema) {
	if (isBoolean(schema)) return schema ? {} : { "not": {} };
	return schema;
}
var EnumMatch;
(function(EnumMatch$1) {
	EnumMatch$1[EnumMatch$1["Key"] = 0] = "Key";
	EnumMatch$1[EnumMatch$1["Enum"] = 1] = "Enum";
})(EnumMatch || (EnumMatch = {}));
const schemaDraftFromId = {
	"http://json-schema.org/draft-03/schema#": SchemaDraft.v3,
	"http://json-schema.org/draft-04/schema#": SchemaDraft.v4,
	"http://json-schema.org/draft-06/schema#": SchemaDraft.v6,
	"http://json-schema.org/draft-07/schema#": SchemaDraft.v7,
	"https://json-schema.org/draft/2019-09/schema": SchemaDraft.v2019_09,
	"https://json-schema.org/draft/2020-12/schema": SchemaDraft.v2020_12
};
var EvaluationContext = class {
	constructor(schemaDraft) {
		this.schemaDraft = schemaDraft;
	}
};
var SchemaCollector = class SchemaCollector {
	constructor(focusOffset = -1, exclude) {
		this.focusOffset = focusOffset;
		this.exclude = exclude;
		this.schemas = [];
	}
	add(schema) {
		this.schemas.push(schema);
	}
	merge(other) {
		Array.prototype.push.apply(this.schemas, other.schemas);
	}
	include(node) {
		return (this.focusOffset === -1 || contains(node, this.focusOffset)) && node !== this.exclude;
	}
	newSub() {
		return new SchemaCollector(-1, this.exclude);
	}
};
var NoOpSchemaCollector = class {
	constructor() {}
	get schemas() {
		return [];
	}
	add(_schema) {}
	merge(_other) {}
	include(_node) {
		return true;
	}
	newSub() {
		return this;
	}
};
NoOpSchemaCollector.instance = new NoOpSchemaCollector();
var ValidationResult = class {
	constructor() {
		this.problems = [];
		this.propertiesMatches = 0;
		this.processedProperties = /* @__PURE__ */ new Set();
		this.propertiesValueMatches = 0;
		this.primaryValueMatches = 0;
		this.enumValueMatch = false;
		this.enumValues = void 0;
	}
	hasProblems() {
		return !!this.problems.length;
	}
	merge(validationResult) {
		this.problems = this.problems.concat(validationResult.problems);
		this.propertiesMatches += validationResult.propertiesMatches;
		this.propertiesValueMatches += validationResult.propertiesValueMatches;
		this.mergeProcessedProperties(validationResult);
	}
	mergeEnumValues(validationResult) {
		if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) this.enumValues = this.enumValues.concat(validationResult.enumValues);
	}
	updateEnumMismatchProblemMessages() {
		if (!this.enumValueMatch && this.enumValues) {
			for (const error of this.problems) if (error.code === ErrorCode.EnumValueMismatch) error.message = t("Value is not accepted. Valid values: {0}.", this.enumValues.map((v) => JSON.stringify(v)).join(", "));
		}
	}
	mergePropertyMatch(propertyValidationResult) {
		this.problems = this.problems.concat(propertyValidationResult.problems);
		this.propertiesMatches++;
		if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) this.propertiesValueMatches++;
		if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) this.primaryValueMatches++;
	}
	mergeProcessedProperties(validationResult) {
		validationResult.processedProperties.forEach((p) => this.processedProperties.add(p));
	}
	compare(other) {
		const hasProblems = this.hasProblems();
		if (hasProblems !== other.hasProblems()) return hasProblems ? -1 : 1;
		if (this.enumValueMatch !== other.enumValueMatch) return other.enumValueMatch ? -1 : 1;
		if (this.primaryValueMatches !== other.primaryValueMatches) return this.primaryValueMatches - other.primaryValueMatches;
		if (this.propertiesValueMatches !== other.propertiesValueMatches) return this.propertiesValueMatches - other.propertiesValueMatches;
		return this.propertiesMatches - other.propertiesMatches;
	}
};
function newJSONDocument(root, diagnostics = [], comments = []) {
	return new JSONDocument(root, diagnostics, comments);
}
function getNodeValue(node) {
	return getNodeValue$1(node);
}
function getNodePath(node) {
	return getNodePath$1(node);
}
function contains(node, offset, includeRightBound = false) {
	return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
var JSONDocument = class {
	constructor(root, syntaxErrors = [], comments = []) {
		this.root = root;
		this.syntaxErrors = syntaxErrors;
		this.comments = comments;
	}
	getNodeFromOffset(offset, includeRightBound = false) {
		if (this.root) return findNodeAtOffset(this.root, offset, includeRightBound);
	}
	visit(visitor) {
		if (this.root) {
			const doVisit = (node) => {
				let ctn = visitor(node);
				const children = node.children;
				if (Array.isArray(children)) for (let i = 0; i < children.length && ctn; i++) ctn = doVisit(children[i]);
				return ctn;
			};
			doVisit(this.root);
		}
	}
	validate(textDocument, schema, severity = DiagnosticSeverity.Warning, schemaDraft) {
		if (this.root && schema) {
			const validationResult = new ValidationResult();
			validate(this.root, schema, validationResult, NoOpSchemaCollector.instance, new EvaluationContext(schemaDraft ?? getSchemaDraft(schema)));
			return validationResult.problems.map((p) => {
				const range = Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
				return Diagnostic.create(range, p.message, p.severity ?? severity, p.code);
			});
		}
	}
	getMatchingSchemas(schema, focusOffset = -1, exclude) {
		if (this.root && schema) {
			const matchingSchemas = new SchemaCollector(focusOffset, exclude);
			const context = new EvaluationContext(getSchemaDraft(schema));
			validate(this.root, schema, new ValidationResult(), matchingSchemas, context);
			return matchingSchemas.schemas;
		}
		return [];
	}
};
function getSchemaDraft(schema, fallBack = SchemaDraft.v2020_12) {
	let schemaId = schema.$schema;
	if (schemaId) return schemaDraftFromId[schemaId] ?? fallBack;
	return fallBack;
}
function validate(n, schema, validationResult, matchingSchemas, context) {
	if (!n || !matchingSchemas.include(n)) return;
	if (n.type === "property") return validate(n.valueNode, schema, validationResult, matchingSchemas, context);
	const node = n;
	_validateNode();
	switch (node.type) {
		case "object":
			_validateObjectNode(node);
			break;
		case "array":
			_validateArrayNode(node);
			break;
		case "string":
			_validateStringNode(node);
			break;
		case "number":
			_validateNumberNode(node);
			break;
	}
	matchingSchemas.add({
		node,
		schema
	});
	function _validateNode() {
		function matchesType(type) {
			return node.type === type || type === "integer" && node.type === "number" && node.isInteger;
		}
		if (Array.isArray(schema.type)) {
			if (!schema.type.some(matchesType)) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Incorrect type. Expected one of {0}.", schema.type.join(", "))
			});
		} else if (schema.type) {
			if (!matchesType(schema.type)) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Incorrect type. Expected \"{0}\".", schema.type)
			});
		}
		if (Array.isArray(schema.allOf)) for (const subSchemaRef of schema.allOf) {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, asSchema(subSchemaRef), subValidationResult, subMatchingSchemas, context);
			validationResult.merge(subValidationResult);
			matchingSchemas.merge(subMatchingSchemas);
		}
		const notSchema = asSchema(schema.not);
		if (notSchema) {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, notSchema, subValidationResult, subMatchingSchemas, context);
			if (!subValidationResult.hasProblems()) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				message: schema.errorMessage || t("Matches a schema that is not allowed.")
			});
			for (const ms of subMatchingSchemas.schemas) {
				ms.inverted = !ms.inverted;
				matchingSchemas.add(ms);
			}
		}
		const testAlternatives = (alternatives, maxOneMatch) => {
			const matches = [];
			let bestMatch = void 0;
			for (const subSchemaRef of alternatives) {
				const subSchema = asSchema(subSchemaRef);
				const subValidationResult = new ValidationResult();
				const subMatchingSchemas = matchingSchemas.newSub();
				validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
				if (!subValidationResult.hasProblems()) matches.push(subSchema);
				if (!bestMatch) bestMatch = {
					schema: subSchema,
					validationResult: subValidationResult,
					matchingSchemas: subMatchingSchemas
				};
				else if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
					bestMatch.matchingSchemas.merge(subMatchingSchemas);
					bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
					bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
					bestMatch.validationResult.mergeProcessedProperties(subValidationResult);
				} else {
					const compareResult = subValidationResult.compare(bestMatch.validationResult);
					if (compareResult > 0) bestMatch = {
						schema: subSchema,
						validationResult: subValidationResult,
						matchingSchemas: subMatchingSchemas
					};
					else if (compareResult === 0) {
						bestMatch.matchingSchemas.merge(subMatchingSchemas);
						bestMatch.validationResult.mergeEnumValues(subValidationResult);
					}
				}
			}
			if (matches.length > 1 && maxOneMatch) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: 1
				},
				message: t("Matches multiple schemas when only one must validate.")
			});
			if (bestMatch) {
				bestMatch.validationResult.updateEnumMismatchProblemMessages();
				validationResult.merge(bestMatch.validationResult);
				matchingSchemas.merge(bestMatch.matchingSchemas);
			}
			return matches.length;
		};
		if (Array.isArray(schema.anyOf)) testAlternatives(schema.anyOf, false);
		if (Array.isArray(schema.oneOf)) testAlternatives(schema.oneOf, true);
		const testBranch = (schema$1) => {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, asSchema(schema$1), subValidationResult, subMatchingSchemas, context);
			validationResult.merge(subValidationResult);
			matchingSchemas.merge(subMatchingSchemas);
		};
		const testCondition = (ifSchema$1, thenSchema, elseSchema) => {
			const subSchema = asSchema(ifSchema$1);
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
			matchingSchemas.merge(subMatchingSchemas);
			validationResult.mergeProcessedProperties(subValidationResult);
			if (!subValidationResult.hasProblems()) {
				if (thenSchema) testBranch(thenSchema);
			} else if (elseSchema) testBranch(elseSchema);
		};
		const ifSchema = asSchema(schema.if);
		if (ifSchema) testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
		if (Array.isArray(schema.enum)) {
			const val = getNodeValue(node);
			let enumValueMatch = false;
			for (const e of schema.enum) if (equals(val, e)) {
				enumValueMatch = true;
				break;
			}
			validationResult.enumValues = schema.enum;
			validationResult.enumValueMatch = enumValueMatch;
			if (!enumValueMatch) validationResult.problems.push({
				location: {
					offset: node.offset,
					length: node.length
				},
				code: ErrorCode.EnumValueMismatch,
				message: schema.errorMessage || t("Value is not accepted. Valid values: {0}.", schema.enum.map((v) => JSON.stringify(v)).join(", "))
			});
		}
		if (isDefined(schema.const)) {
			if (!equals(getNodeValue(node), schema.const)) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length
					},
					code: ErrorCode.EnumValueMismatch,
					message: schema.errorMessage || t("Value must be {0}.", JSON.stringify(schema.const))
				});
				validationResult.enumValueMatch = false;
			} else validationResult.enumValueMatch = true;
			validationResult.enumValues = [schema.const];
		}
		let deprecationMessage = schema.deprecationMessage;
		if (deprecationMessage || schema.deprecated) {
			deprecationMessage = deprecationMessage || t("Value is deprecated");
			let targetNode = node.parent?.type === "property" ? node.parent : node;
			validationResult.problems.push({
				location: {
					offset: targetNode.offset,
					length: targetNode.length
				},
				severity: DiagnosticSeverity.Warning,
				message: deprecationMessage,
				code: ErrorCode.Deprecated
			});
		}
	}
	function _validateNumberNode(node$1) {
		const val = node$1.value;
		function normalizeFloats(float) {
			const parts = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(float.toString());
			return parts && {
				value: Number(parts[1] + (parts[2] || "")),
				multiplier: (parts[2]?.length || 0) - (parseInt(parts[3]) || 0)
			};
		}
		if (isNumber(schema.multipleOf)) {
			let remainder = -1;
			if (Number.isInteger(schema.multipleOf)) remainder = val % schema.multipleOf;
			else {
				let normMultipleOf = normalizeFloats(schema.multipleOf);
				let normValue = normalizeFloats(val);
				if (normMultipleOf && normValue) {
					const multiplier = 10 ** Math.abs(normValue.multiplier - normMultipleOf.multiplier);
					if (normValue.multiplier < normMultipleOf.multiplier) normValue.value *= multiplier;
					else normMultipleOf.value *= multiplier;
					remainder = normValue.value % normMultipleOf.value;
				}
			}
			if (remainder !== 0) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Value is not divisible by {0}.", schema.multipleOf)
			});
		}
		function getExclusiveLimit(limit, exclusive) {
			if (isNumber(exclusive)) return exclusive;
			if (isBoolean(exclusive) && exclusive) return limit;
		}
		function getLimit(limit, exclusive) {
			if (!isBoolean(exclusive) || !exclusive) return limit;
		}
		const exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(exclusiveMinimum) && val <= exclusiveMinimum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is below the exclusive minimum of {0}.", exclusiveMinimum)
		});
		const exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(exclusiveMaximum) && val >= exclusiveMaximum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is above the exclusive maximum of {0}.", exclusiveMaximum)
		});
		const minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(minimum) && val < minimum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is below the minimum of {0}.", minimum)
		});
		const maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(maximum) && val > maximum) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Value is above the maximum of {0}.", maximum)
		});
	}
	function _validateStringNode(node$1) {
		if (isNumber(schema.minLength) && stringLength(node$1.value) < schema.minLength) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("String is shorter than the minimum length of {0}.", schema.minLength)
		});
		if (isNumber(schema.maxLength) && stringLength(node$1.value) > schema.maxLength) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("String is longer than the maximum length of {0}.", schema.maxLength)
		});
		if (isString(schema.pattern)) {
			if (!extendedRegExp(schema.pattern)?.test(node$1.value)) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.patternErrorMessage || schema.errorMessage || t("String does not match the pattern of \"{0}\".", schema.pattern)
			});
		}
		if (schema.format) switch (schema.format) {
			case "uri":
			case "uri-reference":
				{
					let errorMessage;
					if (!node$1.value) errorMessage = t("URI expected.");
					else {
						const match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node$1.value);
						if (!match) errorMessage = t("URI is expected.");
						else if (!match[2] && schema.format === "uri") errorMessage = t("URI with a scheme is expected.");
					}
					if (errorMessage) validationResult.problems.push({
						location: {
							offset: node$1.offset,
							length: node$1.length
						},
						message: schema.patternErrorMessage || schema.errorMessage || t("String is not a URI: {0}", errorMessage)
					});
				}
				break;
			case "color-hex":
			case "date-time":
			case "date":
			case "time":
			case "email":
			case "hostname":
			case "ipv4":
			case "ipv6":
				const format$3 = formats[schema.format];
				if (!node$1.value || !format$3.pattern.exec(node$1.value)) validationResult.problems.push({
					location: {
						offset: node$1.offset,
						length: node$1.length
					},
					message: schema.patternErrorMessage || schema.errorMessage || format$3.errorMessage
				});
			default:
		}
	}
	function _validateArrayNode(node$1) {
		let prefixItemsSchemas;
		let additionalItemSchema;
		if (context.schemaDraft >= SchemaDraft.v2020_12) {
			prefixItemsSchemas = schema.prefixItems;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : void 0;
		} else {
			prefixItemsSchemas = Array.isArray(schema.items) ? schema.items : void 0;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : schema.additionalItems;
		}
		let index = 0;
		if (prefixItemsSchemas !== void 0) {
			const max = Math.min(prefixItemsSchemas.length, node$1.items.length);
			for (; index < max; index++) {
				const subSchemaRef = prefixItemsSchemas[index];
				const subSchema = asSchema(subSchemaRef);
				const itemValidationResult = new ValidationResult();
				const item = node$1.items[index];
				if (item) {
					validate(item, subSchema, itemValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(itemValidationResult);
				}
				validationResult.processedProperties.add(String(index));
			}
		}
		if (additionalItemSchema !== void 0 && index < node$1.items.length) if (typeof additionalItemSchema === "boolean") {
			if (additionalItemSchema === false) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Array has too many items according to schema. Expected {0} or fewer.", index)
			});
			for (; index < node$1.items.length; index++) {
				validationResult.processedProperties.add(String(index));
				validationResult.propertiesValueMatches++;
			}
		} else for (; index < node$1.items.length; index++) {
			const itemValidationResult = new ValidationResult();
			validate(node$1.items[index], additionalItemSchema, itemValidationResult, matchingSchemas, context);
			validationResult.mergePropertyMatch(itemValidationResult);
			validationResult.processedProperties.add(String(index));
		}
		const containsSchema = asSchema(schema.contains);
		if (containsSchema) {
			let containsCount = 0;
			for (let index$1 = 0; index$1 < node$1.items.length; index$1++) {
				const item = node$1.items[index$1];
				const itemValidationResult = new ValidationResult();
				validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance, context);
				if (!itemValidationResult.hasProblems()) {
					containsCount++;
					if (context.schemaDraft >= SchemaDraft.v2020_12) validationResult.processedProperties.add(String(index$1));
				}
			}
			if (containsCount === 0 && !isNumber(schema.minContains)) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array does not contain required item.")
			});
			if (isNumber(schema.minContains) && containsCount < schema.minContains) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array has too few items that match the contains contraint. Expected {0} or more.", schema.minContains)
			});
			if (isNumber(schema.maxContains) && containsCount > schema.maxContains) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: schema.errorMessage || t("Array has too many items that match the contains contraint. Expected {0} or less.", schema.maxContains)
			});
		}
		const unevaluatedItems = schema.unevaluatedItems;
		if (unevaluatedItems !== void 0) for (let i = 0; i < node$1.items.length; i++) {
			if (!validationResult.processedProperties.has(String(i))) if (unevaluatedItems === false) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Item does not match any validation rule from the array.")
			});
			else {
				const itemValidationResult = new ValidationResult();
				validate(node$1.items[i], schema.unevaluatedItems, itemValidationResult, matchingSchemas, context);
				validationResult.mergePropertyMatch(itemValidationResult);
			}
			validationResult.processedProperties.add(String(i));
			validationResult.propertiesValueMatches++;
		}
		if (isNumber(schema.minItems) && node$1.items.length < schema.minItems) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Array has too few items. Expected {0} or more.", schema.minItems)
		});
		if (isNumber(schema.maxItems) && node$1.items.length > schema.maxItems) validationResult.problems.push({
			location: {
				offset: node$1.offset,
				length: node$1.length
			},
			message: t("Array has too many items. Expected {0} or fewer.", schema.maxItems)
		});
		if (schema.uniqueItems === true) {
			const values = getNodeValue(node$1);
			function hasDuplicates() {
				for (let i = 0; i < values.length - 1; i++) {
					const value = values[i];
					for (let j = i + 1; j < values.length; j++) if (equals(value, values[j])) return true;
				}
				return false;
			}
			if (hasDuplicates()) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Array has duplicate items.")
			});
		}
	}
	function _validateObjectNode(node$1) {
		const seenKeys = Object.create(null);
		const unprocessedProperties = /* @__PURE__ */ new Set();
		for (const propertyNode of node$1.properties) {
			const key = propertyNode.keyNode.value;
			seenKeys[key] = propertyNode.valueNode;
			unprocessedProperties.add(key);
		}
		if (Array.isArray(schema.required)) {
			for (const propertyName of schema.required) if (!seenKeys[propertyName]) {
				const keyNode = node$1.parent && node$1.parent.type === "property" && node$1.parent.keyNode;
				const location = keyNode ? {
					offset: keyNode.offset,
					length: keyNode.length
				} : {
					offset: node$1.offset,
					length: 1
				};
				validationResult.problems.push({
					location,
					message: t("Missing property \"{0}\".", propertyName)
				});
			}
		}
		const propertyProcessed = (prop) => {
			unprocessedProperties.delete(prop);
			validationResult.processedProperties.add(prop);
		};
		if (schema.properties) for (const propertyName of Object.keys(schema.properties)) {
			propertyProcessed(propertyName);
			const propertySchema = schema.properties[propertyName];
			const child = seenKeys[propertyName];
			if (child) if (isBoolean(propertySchema)) if (!propertySchema) {
				const propertyNode = child.parent;
				validationResult.problems.push({
					location: {
						offset: propertyNode.keyNode.offset,
						length: propertyNode.keyNode.length
					},
					message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
				});
			} else {
				validationResult.propertiesMatches++;
				validationResult.propertiesValueMatches++;
			}
			else {
				const propertyValidationResult = new ValidationResult();
				validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
				validationResult.mergePropertyMatch(propertyValidationResult);
			}
		}
		if (schema.patternProperties) for (const propertyPattern of Object.keys(schema.patternProperties)) {
			const regex = extendedRegExp(propertyPattern);
			if (regex) {
				const processed = [];
				for (const propertyName of unprocessedProperties) if (regex.test(propertyName)) {
					processed.push(propertyName);
					const child = seenKeys[propertyName];
					if (child) {
						const propertySchema = schema.patternProperties[propertyPattern];
						if (isBoolean(propertySchema)) if (!propertySchema) {
							const propertyNode = child.parent;
							validationResult.problems.push({
								location: {
									offset: propertyNode.keyNode.offset,
									length: propertyNode.keyNode.length
								},
								message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
							});
						} else {
							validationResult.propertiesMatches++;
							validationResult.propertiesValueMatches++;
						}
						else {
							const propertyValidationResult = new ValidationResult();
							validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
							validationResult.mergePropertyMatch(propertyValidationResult);
						}
					}
				}
				processed.forEach(propertyProcessed);
			}
		}
		const additionalProperties = schema.additionalProperties;
		if (additionalProperties !== void 0) for (const propertyName of unprocessedProperties) {
			propertyProcessed(propertyName);
			const child = seenKeys[propertyName];
			if (child) {
				if (additionalProperties === false) {
					const propertyNode = child.parent;
					validationResult.problems.push({
						location: {
							offset: propertyNode.keyNode.offset,
							length: propertyNode.keyNode.length
						},
						message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
					});
				} else if (additionalProperties !== true) {
					const propertyValidationResult = new ValidationResult();
					validate(child, additionalProperties, propertyValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(propertyValidationResult);
				}
			}
		}
		const unevaluatedProperties = schema.unevaluatedProperties;
		if (unevaluatedProperties !== void 0) {
			const processed = [];
			for (const propertyName of unprocessedProperties) if (!validationResult.processedProperties.has(propertyName)) {
				processed.push(propertyName);
				const child = seenKeys[propertyName];
				if (child) {
					if (unevaluatedProperties === false) {
						const propertyNode = child.parent;
						validationResult.problems.push({
							location: {
								offset: propertyNode.keyNode.offset,
								length: propertyNode.keyNode.length
							},
							message: schema.errorMessage || t("Property {0} is not allowed.", propertyName)
						});
					} else if (unevaluatedProperties !== true) {
						const propertyValidationResult = new ValidationResult();
						validate(child, unevaluatedProperties, propertyValidationResult, matchingSchemas, context);
						validationResult.mergePropertyMatch(propertyValidationResult);
					}
				}
			}
			processed.forEach(propertyProcessed);
		}
		if (isNumber(schema.maxProperties)) {
			if (node$1.properties.length > schema.maxProperties) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object has more properties than limit of {0}.", schema.maxProperties)
			});
		}
		if (isNumber(schema.minProperties)) {
			if (node$1.properties.length < schema.minProperties) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object has fewer properties than the required number of {0}", schema.minProperties)
			});
		}
		if (schema.dependentRequired) for (const key in schema.dependentRequired) {
			const prop = seenKeys[key];
			const propertyDeps = schema.dependentRequired[key];
			if (prop && Array.isArray(propertyDeps)) _validatePropertyDependencies(key, propertyDeps);
		}
		if (schema.dependentSchemas) for (const key in schema.dependentSchemas) {
			const prop = seenKeys[key];
			const propertyDeps = schema.dependentSchemas[key];
			if (prop && isObject(propertyDeps)) _validatePropertyDependencies(key, propertyDeps);
		}
		if (schema.dependencies) {
			for (const key in schema.dependencies) if (seenKeys[key]) _validatePropertyDependencies(key, schema.dependencies[key]);
		}
		const propertyNames = asSchema(schema.propertyNames);
		if (propertyNames) for (const f$1 of node$1.properties) {
			const key = f$1.keyNode;
			if (key) validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance, context);
		}
		function _validatePropertyDependencies(key, propertyDep) {
			if (Array.isArray(propertyDep)) for (const requiredProp of propertyDep) if (!seenKeys[requiredProp]) validationResult.problems.push({
				location: {
					offset: node$1.offset,
					length: node$1.length
				},
				message: t("Object is missing property {0} required by property {1}.", requiredProp, key)
			});
			else validationResult.propertiesValueMatches++;
			else {
				const propertySchema = asSchema(propertyDep);
				if (propertySchema) {
					const propertyValidationResult = new ValidationResult();
					validate(node$1, propertySchema, propertyValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(propertyValidationResult);
				}
			}
		}
	}
}
function parse(textDocument, config) {
	const problems = [];
	let lastProblemOffset = -1;
	const text = textDocument.getText();
	const scanner = createScanner(text, false);
	const commentRanges = config && config.collectComments ? [] : void 0;
	function _scanNext() {
		while (true) {
			const token = scanner.scan();
			_checkScanError();
			switch (token) {
				case 12:
				case 13:
					if (Array.isArray(commentRanges)) commentRanges.push(Range.create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
					break;
				case 15:
				case 14: break;
				default: return token;
			}
		}
	}
	function _errorAtRange(message, code, startOffset, endOffset, severity = DiagnosticSeverity.Error) {
		if (problems.length === 0 || startOffset !== lastProblemOffset) {
			const range = Range.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
			problems.push(Diagnostic.create(range, message, severity, code, textDocument.languageId));
			lastProblemOffset = startOffset;
		}
	}
	function _error(message, code, node = void 0, skipUntilAfter = [], skipUntil = []) {
		let start = scanner.getTokenOffset();
		let end = scanner.getTokenOffset() + scanner.getTokenLength();
		if (start === end && start > 0) {
			start--;
			while (start > 0 && /\s/.test(text.charAt(start))) start--;
			end = start + 1;
		}
		_errorAtRange(message, code, start, end);
		if (node) _finalize(node, false);
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token = scanner.getToken();
			while (token !== 17) {
				if (skipUntilAfter.indexOf(token) !== -1) {
					_scanNext();
					break;
				} else if (skipUntil.indexOf(token) !== -1) break;
				token = _scanNext();
			}
		}
		return node;
	}
	function _checkScanError() {
		switch (scanner.getTokenError()) {
			case 4:
				_error(t("Invalid unicode sequence in string."), ErrorCode.InvalidUnicode);
				return true;
			case 5:
				_error(t("Invalid escape character in string."), ErrorCode.InvalidEscapeCharacter);
				return true;
			case 3:
				_error(t("Unexpected end of number."), ErrorCode.UnexpectedEndOfNumber);
				return true;
			case 1:
				_error(t("Unexpected end of comment."), ErrorCode.UnexpectedEndOfComment);
				return true;
			case 2:
				_error(t("Unexpected end of string."), ErrorCode.UnexpectedEndOfString);
				return true;
			case 6:
				_error(t("Invalid characters in string. Control characters must be escaped."), ErrorCode.InvalidCharacter);
				return true;
		}
		return false;
	}
	function _finalize(node, scanNext) {
		node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
		if (scanNext) _scanNext();
		return node;
	}
	function _parseArray(parent) {
		if (scanner.getToken() !== 3) return;
		const node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
		_scanNext();
		let needsComma = false;
		while (scanner.getToken() !== 4 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) _error(t("Value expected"), ErrorCode.ValueExpected);
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 4) {
					if (needsComma) _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					continue;
				}
			} else if (needsComma) _error(t("Expected comma"), ErrorCode.CommaExpected);
			const item = _parseValue(node);
			if (!item) _error(t("Value expected"), ErrorCode.ValueExpected, void 0, [], [4, 5]);
			else node.items.push(item);
			needsComma = true;
		}
		if (scanner.getToken() !== 4) return _error(t("Expected comma or closing bracket"), ErrorCode.CommaOrCloseBacketExpected, node);
		return _finalize(node, true);
	}
	const keyPlaceholder = new StringASTNodeImpl(void 0, 0, 0);
	function _parseProperty(parent, keysSeen) {
		const node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset(), keyPlaceholder);
		let key = _parseString(node);
		if (!key) if (scanner.getToken() === 16) {
			_error(t("Property keys must be doublequoted"), ErrorCode.PropertyKeysMustBeDoublequoted);
			const keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
			keyNode.value = scanner.getTokenValue();
			key = keyNode;
			_scanNext();
		} else return;
		node.keyNode = key;
		if (key.value !== "//") {
			const seen = keysSeen[key.value];
			if (seen) {
				_errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, DiagnosticSeverity.Warning);
				if (isObject(seen)) _errorAtRange(t("Duplicate object key"), ErrorCode.DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, DiagnosticSeverity.Warning);
				keysSeen[key.value] = true;
			} else keysSeen[key.value] = node;
		}
		if (scanner.getToken() === 6) {
			node.colonOffset = scanner.getTokenOffset();
			_scanNext();
		} else {
			_error(t("Colon expected"), ErrorCode.ColonExpected);
			if (scanner.getToken() === 10 && textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
				node.length = key.length;
				return node;
			}
		}
		const value = _parseValue(node);
		if (!value) return _error(t("Value expected"), ErrorCode.ValueExpected, node, [], [2, 5]);
		node.valueNode = value;
		node.length = value.offset + value.length - node.offset;
		return node;
	}
	function _parseObject(parent) {
		if (scanner.getToken() !== 1) return;
		const node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
		const keysSeen = Object.create(null);
		_scanNext();
		let needsComma = false;
		while (scanner.getToken() !== 2 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) _error(t("Property expected"), ErrorCode.PropertyExpected);
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 2) {
					if (needsComma) _errorAtRange(t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					continue;
				}
			} else if (needsComma) _error(t("Expected comma"), ErrorCode.CommaExpected);
			const property = _parseProperty(node, keysSeen);
			if (!property) _error(t("Property expected"), ErrorCode.PropertyExpected, void 0, [], [2, 5]);
			else node.properties.push(property);
			needsComma = true;
		}
		if (scanner.getToken() !== 2) return _error(t("Expected comma or closing brace"), ErrorCode.CommaOrCloseBraceExpected, node);
		return _finalize(node, true);
	}
	function _parseString(parent) {
		if (scanner.getToken() !== 10) return;
		const node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
		node.value = scanner.getTokenValue();
		return _finalize(node, true);
	}
	function _parseNumber(parent) {
		if (scanner.getToken() !== 11) return;
		const node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
		if (scanner.getTokenError() === 0) {
			const tokenValue = scanner.getTokenValue();
			try {
				const numberValue = JSON.parse(tokenValue);
				if (!isNumber(numberValue)) return _error(t("Invalid number format."), ErrorCode.Undefined, node);
				node.value = numberValue;
			} catch (e) {
				return _error(t("Invalid number format."), ErrorCode.Undefined, node);
			}
			node.isInteger = tokenValue.indexOf(".") === -1;
		}
		return _finalize(node, true);
	}
	function _parseLiteral(parent) {
		switch (scanner.getToken()) {
			case 7: return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
			case 8: return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
			case 9: return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
			default: return;
		}
	}
	function _parseValue(parent) {
		return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
	}
	let _root = void 0;
	if (_scanNext() !== 17) {
		_root = _parseValue(_root);
		if (!_root) _error(t("Expected a JSON object, array or literal."), ErrorCode.Undefined);
		else if (scanner.getToken() !== 17) _error(t("End of file expected."), ErrorCode.Undefined);
	}
	return new JSONDocument(_root, problems, commentRanges);
}
function stringifyObject(obj, indent, stringifyLiteral) {
	if (obj !== null && typeof obj === "object") {
		const newIndent = indent + "	";
		if (Array.isArray(obj)) {
			if (obj.length === 0) return "[]";
			let result = "[\n";
			for (let i = 0; i < obj.length; i++) {
				result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
				if (i < obj.length - 1) result += ",";
				result += "\n";
			}
			result += indent + "]";
			return result;
		} else {
			const keys = Object.keys(obj);
			if (keys.length === 0) return "{}";
			let result = "{\n";
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				result += newIndent + JSON.stringify(key) + ": " + stringifyObject(obj[key], newIndent, stringifyLiteral);
				if (i < keys.length - 1) result += ",";
				result += "\n";
			}
			result += indent + "}";
			return result;
		}
	}
	return stringifyLiteral(obj);
}
var JSONCompletion = class {
	constructor(schemaService, contributions = [], promiseConstructor = Promise, clientCapabilities = {}) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promiseConstructor = promiseConstructor;
		this.clientCapabilities = clientCapabilities;
	}
	doResolve(item) {
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const resolveCompletion = this.contributions[i].resolveCompletion;
			if (resolveCompletion) {
				const resolver = resolveCompletion(item);
				if (resolver) return resolver;
			}
		}
		return this.promiseConstructor.resolve(item);
	}
	doComplete(document, position, doc) {
		const result = {
			items: [],
			isIncomplete: false
		};
		const text = document.getText();
		const offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		if (this.isInComment(document, node ? node.offset : 0, offset)) return Promise.resolve(result);
		if (node && offset === node.offset + node.length && offset > 0) {
			const ch = text[offset - 1];
			if (node.type === "object" && ch === "}" || node.type === "array" && ch === "]") node = node.parent;
		}
		const currentWord = this.getCurrentWord(document, offset);
		let overwriteRange;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) overwriteRange = Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
		else {
			let overwriteStart = offset - currentWord.length;
			if (overwriteStart > 0 && text[overwriteStart - 1] === "\"") overwriteStart--;
			overwriteRange = Range.create(document.positionAt(overwriteStart), position);
		}
		const proposed = /* @__PURE__ */ new Map();
		const collector = {
			add: (suggestion) => {
				let label = suggestion.label;
				const existing = proposed.get(label);
				if (!existing) {
					label = label.replace(/[\n]/g, "↵");
					if (label.length > 60) {
						const shortendedLabel = label.substr(0, 57).trim() + "...";
						if (!proposed.has(shortendedLabel)) label = shortendedLabel;
					}
					suggestion.textEdit = TextEdit.replace(overwriteRange, suggestion.insertText);
					suggestion.label = label;
					proposed.set(label, suggestion);
					result.items.push(suggestion);
				} else {
					if (!existing.documentation) existing.documentation = suggestion.documentation;
					if (!existing.detail) existing.detail = suggestion.detail;
					if (!existing.labelDetails) existing.labelDetails = suggestion.labelDetails;
				}
			},
			setAsIncomplete: () => {
				result.isIncomplete = true;
			},
			error: (message) => {
				console.error(message);
			},
			getNumberOfProposals: () => {
				return result.items.length;
			}
		};
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			const collectionPromises = [];
			let addValue = true;
			let currentKey = "";
			let currentProperty = void 0;
			if (node) {
				if (node.type === "string") {
					const parent = node.parent;
					if (parent && parent.type === "property" && parent.keyNode === node) {
						addValue = !parent.valueNode;
						currentProperty = parent;
						currentKey = text.substr(node.offset + 1, node.length - 2);
						if (parent) node = parent.parent;
					}
				}
			}
			if (node && node.type === "object") {
				if (node.offset === offset) return result;
				node.properties.forEach((p) => {
					if (!currentProperty || currentProperty !== p) proposed.set(p.keyNode.value, CompletionItem.create("__"));
				});
				let separatorAfter = "";
				if (addValue) separatorAfter = this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
				if (schema) this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector);
				else this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
				const location = getNodePath(node);
				this.contributions.forEach((contribution) => {
					const collectPromise = contribution.collectPropertyCompletions(document.uri, location, currentWord, addValue, separatorAfter === "", collector);
					if (collectPromise) collectionPromises.push(collectPromise);
				});
				if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== "\"") {
					collector.add({
						kind: CompletionItemKind.Property,
						label: this.getLabelForValue(currentWord),
						insertText: this.getInsertTextForProperty(currentWord, void 0, false, separatorAfter),
						insertTextFormat: InsertTextFormat.Snippet,
						documentation: ""
					});
					collector.setAsIncomplete();
				}
			}
			const types = {};
			if (schema) this.getValueCompletions(schema, doc, node, offset, document, collector, types);
			else this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
			if (this.contributions.length > 0) this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
			return this.promiseConstructor.all(collectionPromises).then(() => {
				if (collector.getNumberOfProposals() === 0) {
					let offsetForSeparator = offset;
					if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) offsetForSeparator = node.offset + node.length;
					const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
					this.addFillerValueCompletions(types, separatorAfter, collector);
				}
				return result;
			});
		});
	}
	getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector) {
		doc.getMatchingSchemas(schema.schema, node.offset).forEach((s) => {
			if (s.node === node && !s.inverted) {
				const schemaProperties = s.schema.properties;
				if (schemaProperties) Object.keys(schemaProperties).forEach((key) => {
					const propertySchema = schemaProperties[key];
					if (typeof propertySchema === "object" && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
						const proposal = {
							kind: CompletionItemKind.Property,
							label: key,
							insertText: this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
							insertTextFormat: InsertTextFormat.Snippet,
							filterText: this.getFilterTextForValue(key),
							documentation: this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || ""
						};
						if (propertySchema.completionDetail !== void 0) proposal.detail = propertySchema.completionDetail;
						if (propertySchema.suggestSortText !== void 0) proposal.sortText = propertySchema.suggestSortText;
						if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) proposal.command = {
							title: "Suggest",
							command: "editor.action.triggerSuggest"
						};
						collector.add(proposal);
					}
				});
				const schemaPropertyNames = s.schema.propertyNames;
				if (typeof schemaPropertyNames === "object" && !schemaPropertyNames.deprecationMessage && !schemaPropertyNames.doNotSuggest) {
					const propertyNameCompletionItem = (name, enumDescription = void 0) => {
						const proposal = {
							kind: CompletionItemKind.Property,
							label: name,
							insertText: this.getInsertTextForProperty(name, void 0, addValue, separatorAfter),
							insertTextFormat: InsertTextFormat.Snippet,
							filterText: this.getFilterTextForValue(name),
							documentation: enumDescription || this.fromMarkup(schemaPropertyNames.markdownDescription) || schemaPropertyNames.description || ""
						};
						if (schemaPropertyNames.completionDetail !== void 0) proposal.detail = schemaPropertyNames.completionDetail;
						if (schemaPropertyNames.suggestSortText !== void 0) proposal.sortText = schemaPropertyNames.suggestSortText;
						if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) proposal.command = {
							title: "Suggest",
							command: "editor.action.triggerSuggest"
						};
						collector.add(proposal);
					};
					if (schemaPropertyNames.enum) for (let i = 0; i < schemaPropertyNames.enum.length; i++) {
						let enumDescription = void 0;
						if (schemaPropertyNames.markdownEnumDescriptions && i < schemaPropertyNames.markdownEnumDescriptions.length) enumDescription = this.fromMarkup(schemaPropertyNames.markdownEnumDescriptions[i]);
						else if (schemaPropertyNames.enumDescriptions && i < schemaPropertyNames.enumDescriptions.length) enumDescription = schemaPropertyNames.enumDescriptions[i];
						propertyNameCompletionItem(schemaPropertyNames.enum[i], enumDescription);
					}
					if (schemaPropertyNames.const) propertyNameCompletionItem(schemaPropertyNames.const);
				}
			}
		});
	}
	getSchemaLessPropertyCompletions(doc, node, currentKey, collector) {
		const collectCompletionsForSimilarObject = (obj) => {
			obj.properties.forEach((p) => {
				const key = p.keyNode.value;
				collector.add({
					kind: CompletionItemKind.Property,
					label: key,
					insertText: this.getInsertTextForValue(key, ""),
					insertTextFormat: InsertTextFormat.Snippet,
					filterText: this.getFilterTextForValue(key),
					documentation: ""
				});
			});
		};
		if (node.parent) {
			if (node.parent.type === "property") {
				const parentKey = node.parent.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n !== node.parent && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "object") collectCompletionsForSimilarObject(n.valueNode);
					return true;
				});
			} else if (node.parent.type === "array") node.parent.items.forEach((n) => {
				if (n.type === "object" && n !== node) collectCompletionsForSimilarObject(n);
			});
		} else if (node.type === "object") collector.add({
			kind: CompletionItemKind.Property,
			label: "$schema",
			insertText: this.getInsertTextForProperty("$schema", void 0, true, ""),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "",
			filterText: this.getFilterTextForValue("$schema")
		});
	}
	getSchemaLessValueCompletions(doc, node, offset, document, collector) {
		let offsetForSeparator = offset;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			node = node.parent;
		}
		if (!node) {
			collector.add({
				kind: this.getSuggestionKind("object"),
				label: "Empty object",
				insertText: this.getInsertTextForValue({}, ""),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: ""
			});
			collector.add({
				kind: this.getSuggestionKind("array"),
				label: "Empty array",
				insertText: this.getInsertTextForValue([], ""),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: ""
			});
			return;
		}
		const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
		const collectSuggestionsForValues = (value) => {
			if (value.parent && !contains(value.parent, offset, true)) collector.add({
				kind: this.getSuggestionKind(value.type),
				label: this.getLabelTextForMatchingNode(value, document),
				insertText: this.getInsertTextForMatchingNode(value, document, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: ""
			});
			if (value.type === "boolean") this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
		};
		if (node.type === "property") {
			if (offset > (node.colonOffset || 0)) {
				const valueNode = node.valueNode;
				if (valueNode && (offset > valueNode.offset + valueNode.length || valueNode.type === "object" || valueNode.type === "array")) return;
				const parentKey = node.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode) collectSuggestionsForValues(n.valueNode);
					return true;
				});
				if (parentKey === "$schema" && node.parent && !node.parent.parent) this.addDollarSchemaCompletions(separatorAfter, collector);
			}
		}
		if (node.type === "array") if (node.parent && node.parent.type === "property") {
			const parentKey = node.parent.keyNode.value;
			doc.visit((n) => {
				if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "array") n.valueNode.items.forEach(collectSuggestionsForValues);
				return true;
			});
		} else node.items.forEach(collectSuggestionsForValues);
	}
	getValueCompletions(schema, doc, node, offset, document, collector, types) {
		let offsetForSeparator = offset;
		let parentKey = void 0;
		let valueNode = void 0;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			valueNode = node;
			node = node.parent;
		}
		if (!node) {
			this.addSchemaValueCompletions(schema.schema, "", collector, types);
			return;
		}
		if (node.type === "property" && offset > (node.colonOffset || 0)) {
			const valueNode$1 = node.valueNode;
			if (valueNode$1 && offset > valueNode$1.offset + valueNode$1.length) return;
			parentKey = node.keyNode.value;
			node = node.parent;
		}
		if (node && (parentKey !== void 0 || node.type === "array")) {
			const separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
			const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
			for (const s of matchingSchemas) if (s.node === node && !s.inverted && s.schema) {
				if (node.type === "array" && s.schema.items) {
					let c = collector;
					if (s.schema.uniqueItems) {
						const existingValues = /* @__PURE__ */ new Set();
						node.children.forEach((n) => {
							if (n.type !== "array" && n.type !== "object") existingValues.add(this.getLabelForValue(getNodeValue(n)));
						});
						c = {
							...collector,
							add(suggestion) {
								if (!existingValues.has(suggestion.label)) collector.add(suggestion);
							}
						};
					}
					if (Array.isArray(s.schema.items)) {
						const index = this.findItemAtOffset(node, document, offset);
						if (index < s.schema.items.length) this.addSchemaValueCompletions(s.schema.items[index], separatorAfter, c, types);
					} else this.addSchemaValueCompletions(s.schema.items, separatorAfter, c, types);
				}
				if (parentKey !== void 0) {
					let propertyMatched = false;
					if (s.schema.properties) {
						const propertySchema = s.schema.properties[parentKey];
						if (propertySchema) {
							propertyMatched = true;
							this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
						}
					}
					if (s.schema.patternProperties && !propertyMatched) {
						for (const pattern of Object.keys(s.schema.patternProperties)) if (extendedRegExp(pattern)?.test(parentKey)) {
							propertyMatched = true;
							const propertySchema = s.schema.patternProperties[pattern];
							this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
						}
					}
					if (s.schema.additionalProperties && !propertyMatched) {
						const propertySchema = s.schema.additionalProperties;
						this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
					}
				}
			}
			if (parentKey === "$schema" && !node.parent) this.addDollarSchemaCompletions(separatorAfter, collector);
			if (types["boolean"]) {
				this.addBooleanValueCompletion(true, separatorAfter, collector);
				this.addBooleanValueCompletion(false, separatorAfter, collector);
			}
			if (types["null"]) this.addNullValueCompletion(separatorAfter, collector);
		}
	}
	getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises) {
		if (!node) this.contributions.forEach((contribution) => {
			const collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
			if (collectPromise) collectionPromises.push(collectPromise);
		});
		else {
			if (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null") node = node.parent;
			if (node && node.type === "property" && offset > (node.colonOffset || 0)) {
				const parentKey = node.keyNode.value;
				const valueNode = node.valueNode;
				if ((!valueNode || offset <= valueNode.offset + valueNode.length) && node.parent) {
					const location = getNodePath(node.parent);
					this.contributions.forEach((contribution) => {
						const collectPromise = contribution.collectValueCompletions(document.uri, location, parentKey, collector);
						if (collectPromise) collectionPromises.push(collectPromise);
					});
				}
			}
		}
	}
	addSchemaValueCompletions(schema, separatorAfter, collector, types) {
		if (typeof schema === "object") {
			this.addEnumValueCompletions(schema, separatorAfter, collector);
			this.addDefaultValueCompletions(schema, separatorAfter, collector);
			this.collectTypes(schema, types);
			if (Array.isArray(schema.allOf)) schema.allOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			if (Array.isArray(schema.anyOf)) schema.anyOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			if (Array.isArray(schema.oneOf)) schema.oneOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
		}
	}
	addDefaultValueCompletions(schema, separatorAfter, collector, arrayDepth = 0) {
		let hasProposals = false;
		if (isDefined(schema.default)) {
			let type = schema.type;
			let value = schema.default;
			for (let i = arrayDepth; i > 0; i--) {
				value = [value];
				type = "array";
			}
			const completionItem = {
				kind: this.getSuggestionKind(type),
				label: this.getLabelForValue(value),
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet
			};
			if (this.doesSupportsLabelDetails()) completionItem.labelDetails = { description: t("Default value") };
			else completionItem.detail = t("Default value");
			collector.add(completionItem);
			hasProposals = true;
		}
		if (Array.isArray(schema.examples)) schema.examples.forEach((example) => {
			let type = schema.type;
			let value = example;
			for (let i = arrayDepth; i > 0; i--) {
				value = [value];
				type = "array";
			}
			collector.add({
				kind: this.getSuggestionKind(type),
				label: this.getLabelForValue(value),
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet
			});
			hasProposals = true;
		});
		if (Array.isArray(schema.defaultSnippets)) schema.defaultSnippets.forEach((s) => {
			let type = schema.type;
			let value = s.body;
			let label = s.label;
			let insertText;
			let filterText;
			if (isDefined(value)) {
				schema.type;
				for (let i = arrayDepth; i > 0; i--) value = [value];
				insertText = this.getInsertTextForSnippetValue(value, separatorAfter);
				filterText = this.getFilterTextForSnippetValue(value);
				label = label || this.getLabelForSnippetValue(value);
			} else if (typeof s.bodyText === "string") {
				let prefix = "", suffix = "", indent = "";
				for (let i = arrayDepth; i > 0; i--) {
					prefix = prefix + indent + "[\n";
					suffix = suffix + "\n" + indent + "]";
					indent += "	";
					type = "array";
				}
				insertText = prefix + indent + s.bodyText.split("\n").join("\n" + indent) + suffix + separatorAfter;
				label = label || insertText, filterText = insertText.replace(/[\n]/g, "");
			} else return;
			collector.add({
				kind: this.getSuggestionKind(type),
				label,
				documentation: this.fromMarkup(s.markdownDescription) || s.description,
				insertText,
				insertTextFormat: InsertTextFormat.Snippet,
				filterText
			});
			hasProposals = true;
		});
		if (!hasProposals && typeof schema.items === "object" && !Array.isArray(schema.items) && arrayDepth < 5) this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
	}
	addEnumValueCompletions(schema, separatorAfter, collector) {
		if (isDefined(schema.const)) collector.add({
			kind: this.getSuggestionKind(schema.type),
			label: this.getLabelForValue(schema.const),
			insertText: this.getInsertTextForValue(schema.const, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: this.fromMarkup(schema.markdownDescription) || schema.description
		});
		if (Array.isArray(schema.enum)) for (let i = 0, length = schema.enum.length; i < length; i++) {
			const enm = schema.enum[i];
			let documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
			if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
			else if (schema.enumDescriptions && i < schema.enumDescriptions.length) documentation = schema.enumDescriptions[i];
			collector.add({
				kind: this.getSuggestionKind(schema.type),
				label: this.getLabelForValue(enm),
				insertText: this.getInsertTextForValue(enm, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation
			});
		}
	}
	collectTypes(schema, types) {
		if (Array.isArray(schema.enum) || isDefined(schema.const)) return;
		const type = schema.type;
		if (Array.isArray(type)) type.forEach((t$1) => types[t$1] = true);
		else if (type) types[type] = true;
	}
	addFillerValueCompletions(types, separatorAfter, collector) {
		if (types["object"]) collector.add({
			kind: this.getSuggestionKind("object"),
			label: "{}",
			insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			detail: t("New object"),
			documentation: ""
		});
		if (types["array"]) collector.add({
			kind: this.getSuggestionKind("array"),
			label: "[]",
			insertText: this.getInsertTextForGuessedValue([], separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			detail: t("New array"),
			documentation: ""
		});
	}
	addBooleanValueCompletion(value, separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("boolean"),
			label: value ? "true" : "false",
			insertText: this.getInsertTextForValue(value, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: ""
		});
	}
	addNullValueCompletion(separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("null"),
			label: "null",
			insertText: "null" + separatorAfter,
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: ""
		});
	}
	addDollarSchemaCompletions(separatorAfter, collector) {
		this.schemaService.getRegisteredSchemaIds((schema) => schema === "http" || schema === "https").forEach((schemaId) => {
			if (schemaId.startsWith("http://json-schema.org/draft-")) schemaId = schemaId + "#";
			collector.add({
				kind: CompletionItemKind.Module,
				label: this.getLabelForValue(schemaId),
				filterText: this.getFilterTextForValue(schemaId),
				insertText: this.getInsertTextForValue(schemaId, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: ""
			});
		});
	}
	getLabelForValue(value) {
		return JSON.stringify(value);
	}
	getValueFromLabel(value) {
		return JSON.parse(value);
	}
	getFilterTextForValue(value) {
		return JSON.stringify(value);
	}
	getFilterTextForSnippetValue(value) {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getLabelForSnippetValue(value) {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getInsertTextForPlainText(text) {
		return text.replace(/[\\\$\}]/g, "\\$&");
	}
	getInsertTextForValue(value, separatorAfter) {
		const text = JSON.stringify(value, null, "	");
		if (text === "{}") return "{$1}" + separatorAfter;
		else if (text === "[]") return "[$1]" + separatorAfter;
		return this.getInsertTextForPlainText(text + separatorAfter);
	}
	getInsertTextForSnippetValue(value, separatorAfter) {
		const replacer = (value$1) => {
			if (typeof value$1 === "string") {
				if (value$1[0] === "^") return value$1.substr(1);
			}
			return JSON.stringify(value$1);
		};
		return stringifyObject(value, "", replacer) + separatorAfter;
	}
	getInsertTextForGuessedValue(value, separatorAfter) {
		switch (typeof value) {
			case "object":
				if (value === null) return "${1:null}" + separatorAfter;
				return this.getInsertTextForValue(value, separatorAfter);
			case "string":
				let snippetValue = JSON.stringify(value);
				snippetValue = snippetValue.substr(1, snippetValue.length - 2);
				snippetValue = this.getInsertTextForPlainText(snippetValue);
				return "\"${1:" + snippetValue + "}\"" + separatorAfter;
			case "number":
			case "boolean": return "${1:" + JSON.stringify(value) + "}" + separatorAfter;
		}
		return this.getInsertTextForValue(value, separatorAfter);
	}
	getSuggestionKind(type) {
		if (Array.isArray(type)) {
			const array = type;
			type = array.length > 0 ? array[0] : void 0;
		}
		if (!type) return CompletionItemKind.Value;
		switch (type) {
			case "string": return CompletionItemKind.Value;
			case "object": return CompletionItemKind.Module;
			case "property": return CompletionItemKind.Property;
			default: return CompletionItemKind.Value;
		}
	}
	getLabelTextForMatchingNode(node, document) {
		switch (node.type) {
			case "array": return "[]";
			case "object": return "{}";
			default: return document.getText().substr(node.offset, node.length);
		}
	}
	getInsertTextForMatchingNode(node, document, separatorAfter) {
		switch (node.type) {
			case "array": return this.getInsertTextForValue([], separatorAfter);
			case "object": return this.getInsertTextForValue({}, separatorAfter);
			default:
				const content = document.getText().substr(node.offset, node.length) + separatorAfter;
				return this.getInsertTextForPlainText(content);
		}
	}
	getInsertTextForProperty(key, propertySchema, addValue, separatorAfter) {
		const propertyText = this.getInsertTextForValue(key, "");
		if (!addValue) return propertyText;
		const resultText = propertyText + ": ";
		let value;
		let nValueProposals = 0;
		if (propertySchema) {
			if (Array.isArray(propertySchema.defaultSnippets)) {
				if (propertySchema.defaultSnippets.length === 1) {
					const body = propertySchema.defaultSnippets[0].body;
					if (isDefined(body)) value = this.getInsertTextForSnippetValue(body, "");
				}
				nValueProposals += propertySchema.defaultSnippets.length;
			}
			if (propertySchema.enum) {
				if (!value && propertySchema.enum.length === 1) value = this.getInsertTextForGuessedValue(propertySchema.enum[0], "");
				nValueProposals += propertySchema.enum.length;
			}
			if (isDefined(propertySchema.const)) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.const, "");
				nValueProposals++;
			}
			if (isDefined(propertySchema.default)) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.default, "");
				nValueProposals++;
			}
			if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
				if (!value) value = this.getInsertTextForGuessedValue(propertySchema.examples[0], "");
				nValueProposals += propertySchema.examples.length;
			}
			if (nValueProposals === 0) {
				let type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
				if (!type) {
					if (propertySchema.properties) type = "object";
					else if (propertySchema.items) type = "array";
				}
				switch (type) {
					case "boolean":
						value = "$1";
						break;
					case "string":
						value = "\"$1\"";
						break;
					case "object":
						value = "{$1}";
						break;
					case "array":
						value = "[$1]";
						break;
					case "number":
					case "integer":
						value = "${1:0}";
						break;
					case "null":
						value = "${1:null}";
						break;
					default: return propertyText;
				}
			}
		}
		if (!value || nValueProposals > 1) value = "$1";
		return resultText + value + separatorAfter;
	}
	getCurrentWord(document, offset) {
		let i = offset - 1;
		const text = document.getText();
		while (i >= 0 && " 	\n\r\v\":{[,]}".indexOf(text.charAt(i)) === -1) i--;
		return text.substring(i + 1, offset);
	}
	evaluateSeparatorAfter(document, offset) {
		const scanner = createScanner(document.getText(), true);
		scanner.setPosition(offset);
		switch (scanner.scan()) {
			case 5:
			case 2:
			case 4:
			case 17: return "";
			default: return ",";
		}
	}
	findItemAtOffset(node, document, offset) {
		const scanner = createScanner(document.getText(), true);
		const children = node.items;
		for (let i = children.length - 1; i >= 0; i--) {
			const child = children[i];
			if (offset > child.offset + child.length) {
				scanner.setPosition(child.offset + child.length);
				if (scanner.scan() === 5 && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) return i + 1;
				return i;
			} else if (offset >= child.offset) return i;
		}
		return 0;
	}
	isInComment(document, start, offset) {
		const scanner = createScanner(document.getText(), false);
		scanner.setPosition(start);
		let token = scanner.scan();
		while (token !== 17 && scanner.getTokenOffset() + scanner.getTokenLength() < offset) token = scanner.scan();
		return (token === 12 || token === 13) && scanner.getTokenOffset() <= offset;
	}
	fromMarkup(markupString) {
		if (markupString && this.doesSupportMarkdown()) return {
			kind: MarkupKind.Markdown,
			value: markupString
		};
	}
	doesSupportMarkdown() {
		if (!isDefined(this.supportsMarkdown)) {
			const documentationFormat = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
			this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
		}
		return this.supportsMarkdown;
	}
	doesSupportsCommitCharacters() {
		if (!isDefined(this.supportsCommitCharacters)) this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport;
		return this.supportsCommitCharacters;
	}
	doesSupportsLabelDetails() {
		if (!isDefined(this.labelDetailsSupport)) this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport;
		return this.labelDetailsSupport;
	}
};
var JSONHover = class {
	constructor(schemaService, contributions = [], promiseConstructor) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promise = promiseConstructor || Promise;
	}
	doHover(document, position, doc) {
		const offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset);
		if (!node || (node.type === "object" || node.type === "array") && offset > node.offset + 1 && offset < node.offset + node.length - 1) return this.promise.resolve(null);
		const hoverRangeNode = node;
		if (node.type === "string") {
			const parent = node.parent;
			if (parent && parent.type === "property" && parent.keyNode === node) {
				node = parent.valueNode;
				if (!node) return this.promise.resolve(null);
			}
		}
		const hoverRange = Range.create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
		const createHover = (contents) => {
			return {
				contents,
				range: hoverRange
			};
		};
		const location = getNodePath(node);
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const promise = this.contributions[i].getInfoContribution(document.uri, location);
			if (promise) return promise.then((htmlContent) => createHover(htmlContent));
		}
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			if (schema && node) {
				const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
				let title = void 0;
				let markdownDescription = void 0;
				let markdownEnumValueDescription = void 0, enumValue = void 0;
				matchingSchemas.every((s) => {
					if (s.node === node && !s.inverted && s.schema) {
						title = title || s.schema.title;
						markdownDescription = markdownDescription || s.schema.markdownDescription || toMarkdown(s.schema.description);
						if (s.schema.enum) {
							const idx = s.schema.enum.indexOf(getNodeValue(node));
							if (s.schema.markdownEnumDescriptions) markdownEnumValueDescription = s.schema.markdownEnumDescriptions[idx];
							else if (s.schema.enumDescriptions) markdownEnumValueDescription = toMarkdown(s.schema.enumDescriptions[idx]);
							if (markdownEnumValueDescription) {
								enumValue = s.schema.enum[idx];
								if (typeof enumValue !== "string") enumValue = JSON.stringify(enumValue);
							}
						}
					}
					return true;
				});
				let result = "";
				if (title) result = toMarkdown(title);
				if (markdownDescription) {
					if (result.length > 0) result += "\n\n";
					result += markdownDescription;
				}
				if (markdownEnumValueDescription) {
					if (result.length > 0) result += "\n\n";
					result += `\`${toMarkdownCodeBlock(enumValue)}\`: ${markdownEnumValueDescription}`;
				}
				return createHover([result]);
			}
			return null;
		});
	}
};
function toMarkdown(plain) {
	if (plain) return plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3").replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
}
function toMarkdownCodeBlock(content) {
	if (content.indexOf("`") !== -1) return "`` " + content + " ``";
	return content;
}
var JSONValidation = class {
	constructor(jsonSchemaService, promiseConstructor) {
		this.jsonSchemaService = jsonSchemaService;
		this.promise = promiseConstructor;
		this.validationEnabled = true;
	}
	configure(raw) {
		if (raw) {
			this.validationEnabled = raw.validate !== false;
			this.commentSeverity = raw.allowComments ? void 0 : DiagnosticSeverity.Error;
		}
	}
	doValidation(textDocument, jsonDocument, documentSettings, schema) {
		if (!this.validationEnabled) return this.promise.resolve([]);
		const diagnostics = [];
		const added = {};
		const addProblem = (problem) => {
			const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
			if (!added[signature]) {
				added[signature] = true;
				diagnostics.push(problem);
			}
		};
		const getDiagnostics = (schema$1) => {
			let trailingCommaSeverity = documentSettings?.trailingCommas ? toDiagnosticSeverity(documentSettings.trailingCommas) : DiagnosticSeverity.Error;
			let commentSeverity = documentSettings?.comments ? toDiagnosticSeverity(documentSettings.comments) : this.commentSeverity;
			let schemaValidation = documentSettings?.schemaValidation ? toDiagnosticSeverity(documentSettings.schemaValidation) : DiagnosticSeverity.Warning;
			let schemaRequest = documentSettings?.schemaRequest ? toDiagnosticSeverity(documentSettings.schemaRequest) : DiagnosticSeverity.Warning;
			if (schema$1) {
				const addSchemaProblem = (errorMessage, errorCode) => {
					if (jsonDocument.root && schemaRequest) {
						const astRoot = jsonDocument.root;
						const property = astRoot.type === "object" ? astRoot.properties[0] : void 0;
						if (property && property.keyNode.value === "$schema") {
							const node = property.valueNode || property;
							const range = Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						} else {
							const range = Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						}
					}
				};
				if (schema$1.errors.length) addSchemaProblem(schema$1.errors[0], ErrorCode.SchemaResolveError);
				else if (schemaValidation) {
					for (const warning of schema$1.warnings) addSchemaProblem(warning, ErrorCode.SchemaUnsupportedFeature);
					const semanticErrors = jsonDocument.validate(textDocument, schema$1.schema, schemaValidation, documentSettings?.schemaDraft);
					if (semanticErrors) semanticErrors.forEach(addProblem);
				}
				if (schemaAllowsComments(schema$1.schema)) commentSeverity = void 0;
				if (schemaAllowsTrailingCommas(schema$1.schema)) trailingCommaSeverity = void 0;
			}
			for (const p of jsonDocument.syntaxErrors) {
				if (p.code === ErrorCode.TrailingComma) {
					if (typeof trailingCommaSeverity !== "number") continue;
					p.severity = trailingCommaSeverity;
				}
				addProblem(p);
			}
			if (typeof commentSeverity === "number") {
				const message = t("Comments are not permitted in JSON.");
				jsonDocument.comments.forEach((c) => {
					addProblem(Diagnostic.create(c, message, commentSeverity, ErrorCode.CommentNotPermitted));
				});
			}
			return diagnostics;
		};
		if (schema) {
			const uri = schema.id || "schemaservice://untitled/" + idCounter$1++;
			return this.jsonSchemaService.registerExternalSchema({
				uri,
				schema
			}).getResolvedSchema().then((resolvedSchema) => {
				return getDiagnostics(resolvedSchema);
			});
		}
		return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then((schema$1) => {
			return getDiagnostics(schema$1);
		});
	}
	getLanguageStatus(textDocument, jsonDocument) {
		return { schemas: this.jsonSchemaService.getSchemaURIsForResource(textDocument.uri, jsonDocument) };
	}
};
let idCounter$1 = 0;
function schemaAllowsComments(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowComments)) return schemaRef.allowComments;
		if (schemaRef.allOf) for (const schema of schemaRef.allOf) {
			const allow = schemaAllowsComments(schema);
			if (isBoolean(allow)) return allow;
		}
	}
}
function schemaAllowsTrailingCommas(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowTrailingCommas)) return schemaRef.allowTrailingCommas;
		const deprSchemaRef = schemaRef;
		if (isBoolean(deprSchemaRef["allowsTrailingCommas"])) return deprSchemaRef["allowsTrailingCommas"];
		if (schemaRef.allOf) for (const schema of schemaRef.allOf) {
			const allow = schemaAllowsTrailingCommas(schema);
			if (isBoolean(allow)) return allow;
		}
	}
}
function toDiagnosticSeverity(severityLevel) {
	switch (severityLevel) {
		case "error": return DiagnosticSeverity.Error;
		case "warning": return DiagnosticSeverity.Warning;
		case "ignore": return;
	}
}
const Digit0 = 48;
const Digit9 = 57;
const A = 65;
const a = 97;
const f = 102;
function hexDigit(charCode) {
	if (charCode < Digit0) return 0;
	if (charCode <= Digit9) return charCode - Digit0;
	if (charCode < a) charCode += a - A;
	if (charCode >= a && charCode <= f) return charCode - a + 10;
	return 0;
}
function colorFromHex(text) {
	if (text[0] !== "#") return;
	switch (text.length) {
		case 4: return {
			red: hexDigit(text.charCodeAt(1)) * 17 / 255,
			green: hexDigit(text.charCodeAt(2)) * 17 / 255,
			blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
			alpha: 1
		};
		case 5: return {
			red: hexDigit(text.charCodeAt(1)) * 17 / 255,
			green: hexDigit(text.charCodeAt(2)) * 17 / 255,
			blue: hexDigit(text.charCodeAt(3)) * 17 / 255,
			alpha: hexDigit(text.charCodeAt(4)) * 17 / 255
		};
		case 7: return {
			red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
			green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
			blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
			alpha: 1
		};
		case 9: return {
			red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
			green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
			blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
			alpha: (hexDigit(text.charCodeAt(7)) * 16 + hexDigit(text.charCodeAt(8))) / 255
		};
	}
}
var JSONDocumentSymbols = class {
	constructor(schemaService) {
		this.schemaService = schemaService;
	}
	findDocumentSymbols(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
		const root = doc.root;
		if (!root) return [];
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document.uri;
		if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
			if (root.type === "array") {
				const result$1 = [];
				for (const item of root.items) if (item.type === "object") {
					for (const property of item.properties) if (property.keyNode.value === "key" && property.valueNode) {
						const location = Location.create(document.uri, getRange(document, item));
						result$1.push({
							name: getName(property.valueNode),
							kind: SymbolKind.Function,
							location
						});
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
							return result$1;
						}
					}
				}
				return result$1;
			}
		}
		const toVisit = [{
			node: root,
			containerName: ""
		}];
		let nextToVisit = 0;
		let limitExceeded = false;
		const result = [];
		const collectOutlineEntries = (node, containerName) => {
			if (node.type === "array") node.items.forEach((node$1) => {
				if (node$1) toVisit.push({
					node: node$1,
					containerName
				});
			});
			else if (node.type === "object") node.properties.forEach((property) => {
				const valueNode = property.valueNode;
				if (valueNode) if (limit > 0) {
					limit--;
					const location = Location.create(document.uri, getRange(document, property));
					const childContainerName = containerName ? containerName + "." + property.keyNode.value : property.keyNode.value;
					result.push({
						name: this.getKeyLabel(property),
						kind: this.getSymbolKind(valueNode.type),
						location,
						containerName
					});
					toVisit.push({
						node: valueNode,
						containerName: childContainerName
					});
				} else limitExceeded = true;
			});
		};
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.containerName);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
		return result;
	}
	findDocumentSymbols2(document, doc, context = { resultLimit: Number.MAX_VALUE }) {
		const root = doc.root;
		if (!root) return [];
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document.uri;
		if (resourceString === "vscode://defaultsettings/keybindings.json" || endsWith(resourceString.toLowerCase(), "/user/keybindings.json")) {
			if (root.type === "array") {
				const result$1 = [];
				for (const item of root.items) if (item.type === "object") {
					for (const property of item.properties) if (property.keyNode.value === "key" && property.valueNode) {
						const range = getRange(document, item);
						const selectionRange = getRange(document, property.keyNode);
						result$1.push({
							name: getName(property.valueNode),
							kind: SymbolKind.Function,
							range,
							selectionRange
						});
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
							return result$1;
						}
					}
				}
				return result$1;
			}
		}
		const result = [];
		const toVisit = [{
			node: root,
			result
		}];
		let nextToVisit = 0;
		let limitExceeded = false;
		const collectOutlineEntries = (node, result$1) => {
			if (node.type === "array") node.items.forEach((node$1, index) => {
				if (node$1) if (limit > 0) {
					limit--;
					const range = getRange(document, node$1);
					const selectionRange = range;
					const symbol = {
						name: String(index),
						kind: this.getSymbolKind(node$1.type),
						range,
						selectionRange,
						children: []
					};
					result$1.push(symbol);
					toVisit.push({
						result: symbol.children,
						node: node$1
					});
				} else limitExceeded = true;
			});
			else if (node.type === "object") node.properties.forEach((property) => {
				const valueNode = property.valueNode;
				if (valueNode) if (limit > 0) {
					limit--;
					const range = getRange(document, property);
					const selectionRange = getRange(document, property.keyNode);
					const children = [];
					const symbol = {
						name: this.getKeyLabel(property),
						kind: this.getSymbolKind(valueNode.type),
						range,
						selectionRange,
						children,
						detail: this.getDetail(valueNode)
					};
					result$1.push(symbol);
					toVisit.push({
						result: children,
						node: valueNode
					});
				} else limitExceeded = true;
			});
		};
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.result);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) context.onResultLimitExceeded(resourceString);
		return result;
	}
	getSymbolKind(nodeType) {
		switch (nodeType) {
			case "object": return SymbolKind.Module;
			case "string": return SymbolKind.String;
			case "number": return SymbolKind.Number;
			case "array": return SymbolKind.Array;
			case "boolean": return SymbolKind.Boolean;
			default: return SymbolKind.Variable;
		}
	}
	getKeyLabel(property) {
		let name = property.keyNode.value;
		if (name) name = name.replace(/[\n]/g, "↵");
		if (name && name.trim()) return name;
		return `"${name}"`;
	}
	getDetail(node) {
		if (!node) return;
		if (node.type === "boolean" || node.type === "number" || node.type === "null" || node.type === "string") return String(node.value);
		else if (node.type === "array") return node.children.length ? void 0 : "[]";
		else if (node.type === "object") return node.children.length ? void 0 : "{}";
	}
	findDocumentColors(document, doc, context) {
		return this.schemaService.getSchemaForResource(document.uri, doc).then((schema) => {
			const result = [];
			if (schema) {
				let limit = context && typeof context.resultLimit === "number" ? context.resultLimit : Number.MAX_VALUE;
				const matchingSchemas = doc.getMatchingSchemas(schema.schema);
				const visitedNode = {};
				for (const s of matchingSchemas) if (!s.inverted && s.schema && (s.schema.format === "color" || s.schema.format === "color-hex") && s.node && s.node.type === "string") {
					const nodeId = String(s.node.offset);
					if (!visitedNode[nodeId]) {
						const color = colorFromHex(getNodeValue(s.node));
						if (color) {
							const range = getRange(document, s.node);
							result.push({
								color,
								range
							});
						}
						visitedNode[nodeId] = true;
						limit--;
						if (limit <= 0) {
							if (context && context.onResultLimitExceeded) context.onResultLimitExceeded(document.uri);
							return result;
						}
					}
				}
			}
			return result;
		});
	}
	getColorPresentations(document, doc, color, range) {
		const result = [];
		const red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
		function toTwoDigitHex(n) {
			const r = n.toString(16);
			return r.length !== 2 ? "0" + r : r;
		}
		let label;
		if (color.alpha === 1) label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}`;
		else label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}${toTwoDigitHex(Math.round(color.alpha * 255))}`;
		result.push({
			label,
			textEdit: TextEdit.replace(range, JSON.stringify(label))
		});
		return result;
	}
};
function getRange(document, node) {
	return Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
}
function getName(node) {
	return getNodeValue(node) || t("<empty>");
}
const schemaContributions = {
	schemaAssociations: [],
	schemas: {
		"http://json-schema.org/draft-04/schema#": {
			"$schema": "http://json-schema.org/draft-04/schema#",
			"definitions": {
				"schemaArray": {
					"type": "array",
					"minItems": 1,
					"items": { "$ref": "#" }
				},
				"positiveInteger": {
					"type": "integer",
					"minimum": 0
				},
				"positiveIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }, { "default": 0 }] },
				"simpleTypes": {
					"type": "string",
					"enum": [
						"array",
						"boolean",
						"integer",
						"null",
						"number",
						"object",
						"string"
					]
				},
				"stringArray": {
					"type": "array",
					"items": { "type": "string" },
					"minItems": 1,
					"uniqueItems": true
				}
			},
			"type": "object",
			"properties": {
				"id": {
					"type": "string",
					"format": "uri"
				},
				"$schema": {
					"type": "string",
					"format": "uri"
				},
				"title": { "type": "string" },
				"description": { "type": "string" },
				"default": {},
				"multipleOf": {
					"type": "number",
					"minimum": 0,
					"exclusiveMinimum": true
				},
				"maximum": { "type": "number" },
				"exclusiveMaximum": {
					"type": "boolean",
					"default": false
				},
				"minimum": { "type": "number" },
				"exclusiveMinimum": {
					"type": "boolean",
					"default": false
				},
				"maxLength": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minLength": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"pattern": {
					"type": "string",
					"format": "regex"
				},
				"additionalItems": {
					"anyOf": [{ "type": "boolean" }, { "$ref": "#" }],
					"default": {}
				},
				"items": {
					"anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }],
					"default": {}
				},
				"maxItems": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minItems": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"uniqueItems": {
					"type": "boolean",
					"default": false
				},
				"maxProperties": { "allOf": [{ "$ref": "#/definitions/positiveInteger" }] },
				"minProperties": { "allOf": [{ "$ref": "#/definitions/positiveIntegerDefault0" }] },
				"required": { "allOf": [{ "$ref": "#/definitions/stringArray" }] },
				"additionalProperties": {
					"anyOf": [{ "type": "boolean" }, { "$ref": "#" }],
					"default": {}
				},
				"definitions": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"properties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"patternProperties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"dependencies": {
					"type": "object",
					"additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] }
				},
				"enum": {
					"type": "array",
					"minItems": 1,
					"uniqueItems": true
				},
				"type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, {
					"type": "array",
					"items": { "$ref": "#/definitions/simpleTypes" },
					"minItems": 1,
					"uniqueItems": true
				}] },
				"format": { "anyOf": [{
					"type": "string",
					"enum": [
						"date-time",
						"uri",
						"email",
						"hostname",
						"ipv4",
						"ipv6",
						"regex"
					]
				}, { "type": "string" }] },
				"allOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"anyOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"oneOf": { "allOf": [{ "$ref": "#/definitions/schemaArray" }] },
				"not": { "allOf": [{ "$ref": "#" }] }
			},
			"dependencies": {
				"exclusiveMaximum": ["maximum"],
				"exclusiveMinimum": ["minimum"]
			},
			"default": {}
		},
		"http://json-schema.org/draft-07/schema#": {
			"definitions": {
				"schemaArray": {
					"type": "array",
					"minItems": 1,
					"items": { "$ref": "#" }
				},
				"nonNegativeInteger": {
					"type": "integer",
					"minimum": 0
				},
				"nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] },
				"simpleTypes": { "enum": [
					"array",
					"boolean",
					"integer",
					"null",
					"number",
					"object",
					"string"
				] },
				"stringArray": {
					"type": "array",
					"items": { "type": "string" },
					"uniqueItems": true,
					"default": []
				}
			},
			"type": ["object", "boolean"],
			"properties": {
				"$id": {
					"type": "string",
					"format": "uri-reference"
				},
				"$schema": {
					"type": "string",
					"format": "uri"
				},
				"$ref": {
					"type": "string",
					"format": "uri-reference"
				},
				"$comment": { "type": "string" },
				"title": { "type": "string" },
				"description": { "type": "string" },
				"default": true,
				"readOnly": {
					"type": "boolean",
					"default": false
				},
				"examples": {
					"type": "array",
					"items": true
				},
				"multipleOf": {
					"type": "number",
					"exclusiveMinimum": 0
				},
				"maximum": { "type": "number" },
				"exclusiveMaximum": { "type": "number" },
				"minimum": { "type": "number" },
				"exclusiveMinimum": { "type": "number" },
				"maxLength": { "$ref": "#/definitions/nonNegativeInteger" },
				"minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"pattern": {
					"type": "string",
					"format": "regex"
				},
				"additionalItems": { "$ref": "#" },
				"items": {
					"anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }],
					"default": true
				},
				"maxItems": { "$ref": "#/definitions/nonNegativeInteger" },
				"minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"uniqueItems": {
					"type": "boolean",
					"default": false
				},
				"contains": { "$ref": "#" },
				"maxProperties": { "$ref": "#/definitions/nonNegativeInteger" },
				"minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
				"required": { "$ref": "#/definitions/stringArray" },
				"additionalProperties": { "$ref": "#" },
				"definitions": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"properties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"default": {}
				},
				"patternProperties": {
					"type": "object",
					"additionalProperties": { "$ref": "#" },
					"propertyNames": { "format": "regex" },
					"default": {}
				},
				"dependencies": {
					"type": "object",
					"additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] }
				},
				"propertyNames": { "$ref": "#" },
				"const": true,
				"enum": {
					"type": "array",
					"items": true,
					"minItems": 1,
					"uniqueItems": true
				},
				"type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, {
					"type": "array",
					"items": { "$ref": "#/definitions/simpleTypes" },
					"minItems": 1,
					"uniqueItems": true
				}] },
				"format": { "type": "string" },
				"contentMediaType": { "type": "string" },
				"contentEncoding": { "type": "string" },
				"if": { "$ref": "#" },
				"then": { "$ref": "#" },
				"else": { "$ref": "#" },
				"allOf": { "$ref": "#/definitions/schemaArray" },
				"anyOf": { "$ref": "#/definitions/schemaArray" },
				"oneOf": { "$ref": "#/definitions/schemaArray" },
				"not": { "$ref": "#" }
			},
			"default": true
		}
	}
};
const descriptions = {
	id: t("A unique identifier for the schema."),
	$schema: t("The schema to verify this document against."),
	title: t("A descriptive title of the schema."),
	description: t("A long description of the schema. Used in hover menus and suggestions."),
	default: t("A default value. Used by suggestions."),
	multipleOf: t("A number that should cleanly divide the current value (i.e. have no remainder)."),
	maximum: t("The maximum numerical value, inclusive by default."),
	exclusiveMaximum: t("Makes the maximum property exclusive."),
	minimum: t("The minimum numerical value, inclusive by default."),
	exclusiveMinimum: t("Makes the minimum property exclusive."),
	maxLength: t("The maximum length of a string."),
	minLength: t("The minimum length of a string."),
	pattern: t("A regular expression to match the string against. It is not implicitly anchored."),
	additionalItems: t("For arrays, only when items is set as an array. If items are a schema, this schema validates items after the ones specified by the items schema. If false, additional items will cause validation to fail."),
	items: t("For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
	maxItems: t("The maximum number of items that can be inside an array. Inclusive."),
	minItems: t("The minimum number of items that can be inside an array. Inclusive."),
	uniqueItems: t("If all of the items in the array must be unique. Defaults to false."),
	maxProperties: t("The maximum number of properties an object can have. Inclusive."),
	minProperties: t("The minimum number of properties an object can have. Inclusive."),
	required: t("An array of strings that lists the names of all properties required on this object."),
	additionalProperties: t("Either a schema or a boolean. If a schema, used to validate all properties not matched by 'properties', 'propertyNames', or 'patternProperties'. If false, any properties not defined by the adajacent keywords will cause this schema to fail."),
	definitions: t("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
	properties: t("A map of property names to schemas for each property."),
	patternProperties: t("A map of regular expressions on property names to schemas for matching properties."),
	dependencies: t("A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
	enum: t("The set of literal values that are valid."),
	type: t("Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
	format: t("Describes the format expected for the value. By default, not used for validation"),
	allOf: t("An array of schemas, all of which must match."),
	anyOf: t("An array of schemas, where at least one must match."),
	oneOf: t("An array of schemas, exactly one of which must match."),
	not: t("A schema which must not match."),
	$id: t("A unique identifier for the schema."),
	$ref: t("Reference a definition hosted on any location."),
	$comment: t("Comments from schema authors to readers or maintainers of the schema."),
	readOnly: t("Indicates that the value of the instance is managed exclusively by the owning authority."),
	examples: t("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
	contains: t("An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
	propertyNames: t("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
	const: t("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
	contentMediaType: t("Describes the media type of a string property."),
	contentEncoding: t("Describes the content encoding of a string property."),
	if: t("The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
	then: t("The \"then\" subschema is used for validation when the \"if\" subschema succeeds."),
	else: t("The \"else\" subschema is used for validation when the \"if\" subschema fails.")
};
for (const schemaName in schemaContributions.schemas) {
	const schema = schemaContributions.schemas[schemaName];
	for (const property in schema.properties) {
		let propertyObject = schema.properties[property];
		if (typeof propertyObject === "boolean") propertyObject = schema.properties[property] = {};
		const description = descriptions[property];
		if (description) propertyObject["description"] = description;
	}
}
function createRegex(glob, opts) {
	if (typeof glob !== "string") throw new TypeError("Expected a string");
	const str = String(glob);
	let reStr = "";
	const extended = opts ? !!opts.extended : false;
	const globstar = opts ? !!opts.globstar : false;
	let inGroup = false;
	const flags = opts && typeof opts.flags === "string" ? opts.flags : "";
	let c;
	for (let i = 0, len = str.length; i < len; i++) {
		c = str[i];
		switch (c) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				reStr += "\\" + c;
				break;
			case "?": if (extended) {
				reStr += ".";
				break;
			}
			case "[":
			case "]": if (extended) {
				reStr += c;
				break;
			}
			case "{": if (extended) {
				inGroup = true;
				reStr += "(";
				break;
			}
			case "}": if (extended) {
				inGroup = false;
				reStr += ")";
				break;
			}
			case ",":
				if (inGroup) {
					reStr += "|";
					break;
				}
				reStr += "\\" + c;
				break;
			case "*":
				const prevChar = str[i - 1];
				let starCount = 1;
				while (str[i + 1] === "*") {
					starCount++;
					i++;
				}
				const nextChar = str[i + 1];
				if (!globstar) reStr += ".*";
				else if (starCount > 1 && (prevChar === "/" || prevChar === void 0 || prevChar === "{" || prevChar === ",") && (nextChar === "/" || nextChar === void 0 || nextChar === "," || nextChar === "}")) {
					if (nextChar === "/") i++;
					else if (prevChar === "/" && reStr.endsWith("\\/")) reStr = reStr.substr(0, reStr.length - 2);
					reStr += "((?:[^/]*(?:/|$))*)";
				} else reStr += "([^/]*)";
				break;
			default: reStr += c;
		}
	}
	if (!flags || !~flags.indexOf("g")) reStr = "^" + reStr + "$";
	return new RegExp(reStr, flags);
}
const BANG = "!";
const PATH_SEP = "/";
var FilePatternAssociation = class {
	constructor(pattern, folderUri, uris) {
		this.folderUri = folderUri;
		this.uris = uris;
		this.globWrappers = [];
		try {
			for (let patternString of pattern) {
				const include = patternString[0] !== BANG;
				if (!include) patternString = patternString.substring(1);
				if (patternString.length > 0) {
					if (patternString[0] === PATH_SEP) patternString = patternString.substring(1);
					this.globWrappers.push({
						regexp: createRegex("**/" + patternString, {
							extended: true,
							globstar: true
						}),
						include
					});
				}
			}
			if (folderUri) {
				folderUri = normalizeResourceForMatching(folderUri);
				if (!folderUri.endsWith("/")) folderUri = folderUri + "/";
				this.folderUri = folderUri;
			}
		} catch (e) {
			this.globWrappers.length = 0;
			this.uris = [];
		}
	}
	matchesPattern(fileName) {
		if (this.folderUri && !fileName.startsWith(this.folderUri)) return false;
		let match = false;
		for (const { regexp, include } of this.globWrappers) if (regexp.test(fileName)) match = include;
		return match;
	}
	getURIs() {
		return this.uris;
	}
};
var SchemaHandle = class {
	constructor(service, uri, unresolvedSchemaContent) {
		this.service = service;
		this.uri = uri;
		this.dependencies = /* @__PURE__ */ new Set();
		this.anchors = void 0;
		if (unresolvedSchemaContent) this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
	}
	getUnresolvedSchema() {
		if (!this.unresolvedSchema) this.unresolvedSchema = this.service.loadSchema(this.uri);
		return this.unresolvedSchema;
	}
	getResolvedSchema() {
		if (!this.resolvedSchema) this.resolvedSchema = this.getUnresolvedSchema().then((unresolved) => {
			return this.service.resolveSchemaContent(unresolved, this);
		});
		return this.resolvedSchema;
	}
	clearSchema() {
		const hasChanges = !!this.unresolvedSchema;
		this.resolvedSchema = void 0;
		this.unresolvedSchema = void 0;
		this.dependencies.clear();
		this.anchors = void 0;
		return hasChanges;
	}
};
var UnresolvedSchema = class {
	constructor(schema, errors = []) {
		this.schema = schema;
		this.errors = errors;
	}
};
var ResolvedSchema = class {
	constructor(schema, errors = [], warnings = [], schemaDraft) {
		this.schema = schema;
		this.errors = errors;
		this.warnings = warnings;
		this.schemaDraft = schemaDraft;
	}
	getSection(path) {
		const schemaRef = this.getSectionRecursive(path, this.schema);
		if (schemaRef) return asSchema(schemaRef);
	}
	getSectionRecursive(path, schema) {
		if (!schema || typeof schema === "boolean" || path.length === 0) return schema;
		const next = path.shift();
		if (schema.properties && typeof schema.properties[next]) return this.getSectionRecursive(path, schema.properties[next]);
		else if (schema.patternProperties) {
			for (const pattern of Object.keys(schema.patternProperties)) if (extendedRegExp(pattern)?.test(next)) return this.getSectionRecursive(path, schema.patternProperties[pattern]);
		} else if (typeof schema.additionalProperties === "object") return this.getSectionRecursive(path, schema.additionalProperties);
		else if (next.match("[0-9]+")) {
			if (Array.isArray(schema.items)) {
				const index = parseInt(next, 10);
				if (!isNaN(index) && schema.items[index]) return this.getSectionRecursive(path, schema.items[index]);
			} else if (schema.items) return this.getSectionRecursive(path, schema.items);
		}
	}
};
var JSONSchemaService = class {
	constructor(requestService, contextService, promiseConstructor) {
		this.contextService = contextService;
		this.requestService = requestService;
		this.promiseConstructor = promiseConstructor || Promise;
		this.callOnDispose = [];
		this.contributionSchemas = {};
		this.contributionAssociations = [];
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
	}
	getRegisteredSchemaIds(filter) {
		return Object.keys(this.registeredSchemasIds).filter((id) => {
			const scheme = URI.parse(id).scheme;
			return scheme !== "schemaservice" && (!filter || filter(scheme));
		});
	}
	get promise() {
		return this.promiseConstructor;
	}
	dispose() {
		while (this.callOnDispose.length > 0) this.callOnDispose.pop()();
	}
	onResourceChange(uri) {
		this.cachedSchemaForResource = void 0;
		let hasChanges = false;
		uri = normalizeId(uri);
		const toWalk = [uri];
		const all = Object.keys(this.schemasById).map((key) => this.schemasById[key]);
		while (toWalk.length) {
			const curr = toWalk.pop();
			for (let i = 0; i < all.length; i++) {
				const handle = all[i];
				if (handle && (handle.uri === curr || handle.dependencies.has(curr))) {
					if (handle.uri !== curr) toWalk.push(handle.uri);
					if (handle.clearSchema()) hasChanges = true;
					all[i] = void 0;
				}
			}
		}
		return hasChanges;
	}
	setSchemaContributions(schemaContributions$1) {
		if (schemaContributions$1.schemas) {
			const schemas = schemaContributions$1.schemas;
			for (const id in schemas) {
				const normalizedId = normalizeId(id);
				this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
			}
		}
		if (Array.isArray(schemaContributions$1.schemaAssociations)) {
			const schemaAssociations = schemaContributions$1.schemaAssociations;
			for (let schemaAssociation of schemaAssociations) {
				const uris = schemaAssociation.uris.map(normalizeId);
				const association = this.addFilePatternAssociation(schemaAssociation.pattern, schemaAssociation.folderUri, uris);
				this.contributionAssociations.push(association);
			}
		}
	}
	addSchemaHandle(id, unresolvedSchemaContent) {
		const schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
		this.schemasById[id] = schemaHandle;
		return schemaHandle;
	}
	getOrAddSchemaHandle(id, unresolvedSchemaContent) {
		return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
	}
	addFilePatternAssociation(pattern, folderUri, uris) {
		const fpa = new FilePatternAssociation(pattern, folderUri, uris);
		this.filePatternAssociations.push(fpa);
		return fpa;
	}
	registerExternalSchema(config) {
		const id = normalizeId(config.uri);
		this.registeredSchemasIds[id] = true;
		this.cachedSchemaForResource = void 0;
		if (config.fileMatch && config.fileMatch.length) this.addFilePatternAssociation(config.fileMatch, config.folderUri, [id]);
		return config.schema ? this.addSchemaHandle(id, config.schema) : this.getOrAddSchemaHandle(id);
	}
	clearExternalSchemas() {
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
		this.cachedSchemaForResource = void 0;
		for (const id in this.contributionSchemas) {
			this.schemasById[id] = this.contributionSchemas[id];
			this.registeredSchemasIds[id] = true;
		}
		for (const contributionAssociation of this.contributionAssociations) this.filePatternAssociations.push(contributionAssociation);
	}
	getResolvedSchema(schemaId) {
		const id = normalizeId(schemaId);
		const schemaHandle = this.schemasById[id];
		if (schemaHandle) return schemaHandle.getResolvedSchema();
		return this.promise.resolve(void 0);
	}
	loadSchema(url) {
		if (!this.requestService) {
			const errorMessage = t("Unable to load schema from '{0}'. No schema request service available", toDisplayString(url));
			return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
		}
		if (url.startsWith("http://json-schema.org/")) url = "https" + url.substring(4);
		return this.requestService(url).then((content) => {
			if (!content) return new UnresolvedSchema({}, [t("Unable to load schema from '{0}': No content.", toDisplayString(url))]);
			const errors = [];
			if (content.charCodeAt(0) === 65279) {
				errors.push(t("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", toDisplayString(url)));
				content = content.trimStart();
			}
			let schemaContent = {};
			const jsonErrors = [];
			schemaContent = parse$1(content, jsonErrors);
			if (jsonErrors.length) errors.push(t("Unable to parse content from '{0}': Parse error at offset {1}.", toDisplayString(url), jsonErrors[0].offset));
			return new UnresolvedSchema(schemaContent, errors);
		}, (error) => {
			let errorMessage = error.toString();
			const errorSplit = error.toString().split("Error: ");
			if (errorSplit.length > 1) errorMessage = errorSplit[1];
			if (endsWith(errorMessage, ".")) errorMessage = errorMessage.substr(0, errorMessage.length - 1);
			return new UnresolvedSchema({}, [t("Unable to load schema from '{0}': {1}.", toDisplayString(url), errorMessage)]);
		});
	}
	resolveSchemaContent(schemaToResolve, handle) {
		const resolveErrors = schemaToResolve.errors.slice(0);
		const schema = schemaToResolve.schema;
		let schemaDraft = schema.$schema ? normalizeId(schema.$schema) : void 0;
		if (schemaDraft === "http://json-schema.org/draft-03/schema") return this.promise.resolve(new ResolvedSchema({}, [t("Draft-03 schemas are not supported.")], [], schemaDraft));
		let usesUnsupportedFeatures = /* @__PURE__ */ new Set();
		const contextService = this.contextService;
		const findSectionByJSONPointer = (schema$1, path) => {
			path = decodeURIComponent(path);
			let current = schema$1;
			if (path[0] === "/") path = path.substring(1);
			path.split("/").some((part) => {
				part = part.replace(/~1/g, "/").replace(/~0/g, "~");
				current = current[part];
				return !current;
			});
			return current;
		};
		const findSchemaById = (schema$1, handle$1, id) => {
			if (!handle$1.anchors) handle$1.anchors = collectAnchors(schema$1);
			return handle$1.anchors.get(id);
		};
		const merge = (target, section) => {
			for (const key in section) if (section.hasOwnProperty(key) && key !== "id" && key !== "$id") target[key] = section[key];
		};
		const mergeRef = (target, sourceRoot, sourceHandle, refSegment) => {
			let section;
			if (refSegment === void 0 || refSegment.length === 0) section = sourceRoot;
			else if (refSegment.charAt(0) === "/") section = findSectionByJSONPointer(sourceRoot, refSegment);
			else section = findSchemaById(sourceRoot, sourceHandle, refSegment);
			if (section) merge(target, section);
			else resolveErrors.push(t("$ref '{0}' in '{1}' can not be resolved.", refSegment || "", sourceHandle.uri));
		};
		const resolveExternalLink = (node, uri, refSegment, parentHandle) => {
			if (contextService && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/.*/.test(uri)) uri = contextService.resolveRelativePath(uri, parentHandle.uri);
			uri = normalizeId(uri);
			const referencedHandle = this.getOrAddSchemaHandle(uri);
			return referencedHandle.getUnresolvedSchema().then((unresolvedSchema) => {
				parentHandle.dependencies.add(uri);
				if (unresolvedSchema.errors.length) {
					const loc = refSegment ? uri + "#" + refSegment : uri;
					resolveErrors.push(t("Problems loading reference '{0}': {1}", loc, unresolvedSchema.errors[0]));
				}
				mergeRef(node, unresolvedSchema.schema, referencedHandle, refSegment);
				return resolveRefs(node, unresolvedSchema.schema, referencedHandle);
			});
		};
		const resolveRefs = (node, parentSchema, parentHandle) => {
			const openPromises = [];
			this.traverseNodes(node, (next) => {
				const seenRefs = /* @__PURE__ */ new Set();
				while (next.$ref) {
					const ref = next.$ref;
					const segments = ref.split("#", 2);
					delete next.$ref;
					if (segments[0].length > 0) {
						openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentHandle));
						return;
					} else if (!seenRefs.has(ref)) {
						const id = segments[1];
						mergeRef(next, parentSchema, parentHandle, id);
						seenRefs.add(ref);
					}
				}
				if (next.$recursiveRef) usesUnsupportedFeatures.add("$recursiveRef");
				if (next.$dynamicRef) usesUnsupportedFeatures.add("$dynamicRef");
			});
			return this.promise.all(openPromises);
		};
		const collectAnchors = (root) => {
			const result = /* @__PURE__ */ new Map();
			this.traverseNodes(root, (next) => {
				const id = next.$id || next.id;
				const anchor = isString(id) && id.charAt(0) === "#" ? id.substring(1) : next.$anchor;
				if (anchor) if (result.has(anchor)) resolveErrors.push(t("Duplicate anchor declaration: '{0}'", anchor));
				else result.set(anchor, next);
				if (next.$recursiveAnchor) usesUnsupportedFeatures.add("$recursiveAnchor");
				if (next.$dynamicAnchor) usesUnsupportedFeatures.add("$dynamicAnchor");
			});
			return result;
		};
		return resolveRefs(schema, schema, handle).then((_) => {
			let resolveWarnings = [];
			if (usesUnsupportedFeatures.size) resolveWarnings.push(t("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(usesUnsupportedFeatures.keys()).join(", ")));
			return new ResolvedSchema(schema, resolveErrors, resolveWarnings, schemaDraft);
		});
	}
	traverseNodes(root, handle) {
		if (!root || typeof root !== "object") return Promise.resolve(null);
		const seen = /* @__PURE__ */ new Set();
		const collectEntries = (...entries) => {
			for (const entry of entries) if (isObject(entry)) toWalk.push(entry);
		};
		const collectMapEntries = (...maps) => {
			for (const map of maps) if (isObject(map)) for (const k in map) {
				const entry = map[k];
				if (isObject(entry)) toWalk.push(entry);
			}
		};
		const collectArrayEntries = (...arrays) => {
			for (const array of arrays) if (Array.isArray(array)) {
				for (const entry of array) if (isObject(entry)) toWalk.push(entry);
			}
		};
		const collectEntryOrArrayEntries = (items) => {
			if (Array.isArray(items)) {
				for (const entry of items) if (isObject(entry)) toWalk.push(entry);
			} else if (isObject(items)) toWalk.push(items);
		};
		const toWalk = [root];
		let next = toWalk.pop();
		while (next) {
			if (!seen.has(next)) {
				seen.add(next);
				handle(next);
				collectEntries(next.additionalItems, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else, next.unevaluatedItems, next.unevaluatedProperties);
				collectMapEntries(next.definitions, next.$defs, next.properties, next.patternProperties, next.dependencies, next.dependentSchemas);
				collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.prefixItems);
				collectEntryOrArrayEntries(next.items);
			}
			next = toWalk.pop();
		}
	}
	getSchemaFromProperty(resource, document) {
		if (document.root?.type === "object") {
			for (const p of document.root.properties) if (p.keyNode.value === "$schema" && p.valueNode?.type === "string") {
				let schemaId = p.valueNode.value;
				if (this.contextService && !/^\w[\w\d+.-]*:/.test(schemaId)) schemaId = this.contextService.resolveRelativePath(schemaId, resource);
				return schemaId;
			}
		}
	}
	getAssociatedSchemas(resource) {
		const seen = Object.create(null);
		const schemas = [];
		const normalizedResource = normalizeResourceForMatching(resource);
		for (const entry of this.filePatternAssociations) if (entry.matchesPattern(normalizedResource)) {
			for (const schemaId of entry.getURIs()) if (!seen[schemaId]) {
				schemas.push(schemaId);
				seen[schemaId] = true;
			}
		}
		return schemas;
	}
	getSchemaURIsForResource(resource, document) {
		let schemeId = document && this.getSchemaFromProperty(resource, document);
		if (schemeId) return [schemeId];
		return this.getAssociatedSchemas(resource);
	}
	getSchemaForResource(resource, document) {
		if (document) {
			let schemeId = this.getSchemaFromProperty(resource, document);
			if (schemeId) {
				const id = normalizeId(schemeId);
				return this.getOrAddSchemaHandle(id).getResolvedSchema();
			}
		}
		if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) return this.cachedSchemaForResource.resolvedSchema;
		const schemas = this.getAssociatedSchemas(resource);
		const resolvedSchema = schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(void 0);
		this.cachedSchemaForResource = {
			resource,
			resolvedSchema
		};
		return resolvedSchema;
	}
	createCombinedSchema(resource, schemaIds) {
		if (schemaIds.length === 1) return this.getOrAddSchemaHandle(schemaIds[0]);
		else {
			const combinedSchemaId = "schemaservice://combinedSchema/" + encodeURIComponent(resource);
			const combinedSchema = { allOf: schemaIds.map((schemaId) => ({ $ref: schemaId })) };
			return this.addSchemaHandle(combinedSchemaId, combinedSchema);
		}
	}
	getMatchingSchemas(document, jsonDocument, schema) {
		if (schema) {
			const id = schema.id || "schemaservice://untitled/matchingSchemas/" + idCounter++;
			return this.addSchemaHandle(id, schema).getResolvedSchema().then((resolvedSchema) => {
				return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter((s) => !s.inverted);
			});
		}
		return this.getSchemaForResource(document.uri, jsonDocument).then((schema$1) => {
			if (schema$1) return jsonDocument.getMatchingSchemas(schema$1.schema).filter((s) => !s.inverted);
			return [];
		});
	}
};
let idCounter = 0;
function normalizeId(id) {
	try {
		return URI.parse(id).toString(true);
	} catch (e) {
		return id;
	}
}
function normalizeResourceForMatching(resource) {
	try {
		return URI.parse(resource).with({
			fragment: null,
			query: null
		}).toString(true);
	} catch (e) {
		return resource;
	}
}
function toDisplayString(url) {
	try {
		const uri = URI.parse(url);
		if (uri.scheme === "file") return uri.fsPath;
	} catch (e) {}
	return url;
}
function getFoldingRanges(document, context) {
	const ranges = [];
	const nestingLevels = [];
	const stack = [];
	let prevStart = -1;
	const scanner = createScanner(document.getText(), false);
	let token = scanner.scan();
	function addRange(range) {
		ranges.push(range);
		nestingLevels.push(stack.length);
	}
	while (token !== 17) {
		switch (token) {
			case 1:
			case 3: {
				const startLine = document.positionAt(scanner.getTokenOffset()).line;
				const range = {
					startLine,
					endLine: startLine,
					kind: token === 1 ? "object" : "array"
				};
				stack.push(range);
				break;
			}
			case 2:
			case 4: {
				const kind = token === 2 ? "object" : "array";
				if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
					const range = stack.pop();
					const line = document.positionAt(scanner.getTokenOffset()).line;
					if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
						range.endLine = line - 1;
						addRange(range);
						prevStart = range.startLine;
					}
				}
				break;
			}
			case 13: {
				const startLine = document.positionAt(scanner.getTokenOffset()).line;
				const endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
				if (scanner.getTokenError() === 1 && startLine + 1 < document.lineCount) scanner.setPosition(document.offsetAt(Position.create(startLine + 1, 0)));
				else if (startLine < endLine) {
					addRange({
						startLine,
						endLine,
						kind: FoldingRangeKind.Comment
					});
					prevStart = startLine;
				}
				break;
			}
			case 12: {
				const m = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
				if (m) {
					const line = document.positionAt(scanner.getTokenOffset()).line;
					if (m[1]) {
						const range = {
							startLine: line,
							endLine: line,
							kind: FoldingRangeKind.Region
						};
						stack.push(range);
					} else {
						let i = stack.length - 1;
						while (i >= 0 && stack[i].kind !== FoldingRangeKind.Region) i--;
						if (i >= 0) {
							const range = stack[i];
							stack.length = i;
							if (line > range.startLine && prevStart !== range.startLine) {
								range.endLine = line;
								addRange(range);
								prevStart = range.startLine;
							}
						}
					}
				}
				break;
			}
		}
		token = scanner.scan();
	}
	const rangeLimit = context && context.rangeLimit;
	if (typeof rangeLimit !== "number" || ranges.length <= rangeLimit) return ranges;
	if (context && context.onRangeLimitExceeded) context.onRangeLimitExceeded(document.uri);
	const counts = [];
	for (let level of nestingLevels) if (level < 30) counts[level] = (counts[level] || 0) + 1;
	let entries = 0;
	let maxLevel = 0;
	for (let i = 0; i < counts.length; i++) {
		const n = counts[i];
		if (n) {
			if (n + entries > rangeLimit) {
				maxLevel = i;
				break;
			}
			entries += n;
		}
	}
	const result = [];
	for (let i = 0; i < ranges.length; i++) {
		const level = nestingLevels[i];
		if (typeof level === "number") {
			if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) result.push(ranges[i]);
		}
	}
	return result;
}
function getSelectionRanges(document, positions, doc) {
	function getSelectionRange(position) {
		let offset = document.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		const result = [];
		while (node) {
			switch (node.type) {
				case "string":
				case "object":
				case "array":
					const cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
					if (cStart < cEnd && offset >= cStart && offset <= cEnd) result.push(newRange(cStart, cEnd));
					result.push(newRange(node.offset, node.offset + node.length));
					break;
				case "number":
				case "boolean":
				case "null":
				case "property":
					result.push(newRange(node.offset, node.offset + node.length));
					break;
			}
			if (node.type === "property" || node.parent && node.parent.type === "array") {
				const afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5);
				if (afterCommaOffset !== -1) result.push(newRange(node.offset, afterCommaOffset));
			}
			node = node.parent;
		}
		let current = void 0;
		for (let index = result.length - 1; index >= 0; index--) current = SelectionRange.create(result[index], current);
		if (!current) current = SelectionRange.create(Range.create(position, position));
		return current;
	}
	function newRange(start, end) {
		return Range.create(document.positionAt(start), document.positionAt(end));
	}
	const scanner = createScanner(document.getText(), true);
	function getOffsetAfterNextToken(offset, expectedToken) {
		scanner.setPosition(offset);
		if (scanner.scan() === expectedToken) return scanner.getTokenOffset() + scanner.getTokenLength();
		return -1;
	}
	return positions.map(getSelectionRange);
}
function format(documentToFormat, formattingOptions, formattingRange) {
	let range = void 0;
	if (formattingRange) {
		const offset = documentToFormat.offsetAt(formattingRange.start);
		range = {
			offset,
			length: documentToFormat.offsetAt(formattingRange.end) - offset
		};
	}
	const options = {
		tabSize: formattingOptions ? formattingOptions.tabSize : 4,
		insertSpaces: formattingOptions?.insertSpaces === true,
		insertFinalNewline: formattingOptions?.insertFinalNewline === true,
		eol: "\n",
		keepLines: formattingOptions?.keepLines === true
	};
	return format$1(documentToFormat.getText(), range, options).map((edit) => {
		return TextEdit.replace(Range.create(documentToFormat.positionAt(edit.offset), documentToFormat.positionAt(edit.offset + edit.length)), edit.content);
	});
}
var Container;
(function(Container$1) {
	Container$1[Container$1["Object"] = 0] = "Object";
	Container$1[Container$1["Array"] = 1] = "Array";
})(Container || (Container = {}));
var PropertyTree = class {
	constructor(propertyName, beginningLineNumber) {
		this.propertyName = propertyName ?? "";
		this.beginningLineNumber = beginningLineNumber;
		this.childrenProperties = [];
		this.lastProperty = false;
		this.noKeyName = false;
	}
	addChildProperty(childProperty) {
		childProperty.parent = this;
		if (this.childrenProperties.length > 0) {
			let insertionIndex = 0;
			if (childProperty.noKeyName) insertionIndex = this.childrenProperties.length;
			else insertionIndex = binarySearchOnPropertyArray(this.childrenProperties, childProperty, compareProperties);
			if (insertionIndex < 0) insertionIndex = insertionIndex * -1 - 1;
			this.childrenProperties.splice(insertionIndex, 0, childProperty);
		} else this.childrenProperties.push(childProperty);
		return childProperty;
	}
};
function compareProperties(propertyTree1, propertyTree2) {
	const propertyName1 = propertyTree1.propertyName.toLowerCase();
	const propertyName2 = propertyTree2.propertyName.toLowerCase();
	if (propertyName1 < propertyName2) return -1;
	else if (propertyName1 > propertyName2) return 1;
	return 0;
}
function binarySearchOnPropertyArray(propertyTreeArray, propertyTree, compare_fn) {
	const propertyName = propertyTree.propertyName.toLowerCase();
	const firstPropertyInArrayName = propertyTreeArray[0].propertyName.toLowerCase();
	const lastPropertyInArrayName = propertyTreeArray[propertyTreeArray.length - 1].propertyName.toLowerCase();
	if (propertyName < firstPropertyInArrayName) return 0;
	if (propertyName > lastPropertyInArrayName) return propertyTreeArray.length;
	let m = 0;
	let n = propertyTreeArray.length - 1;
	while (m <= n) {
		let k = n + m >> 1;
		let cmp = compare_fn(propertyTree, propertyTreeArray[k]);
		if (cmp > 0) m = k + 1;
		else if (cmp < 0) n = k - 1;
		else return k;
	}
	return -m - 1;
}
function sort(documentToSort, formattingOptions) {
	const options = {
		...formattingOptions,
		keepLines: false
	};
	const formattedJsonString = TextDocument.applyEdits(documentToSort, format(documentToSort, options, void 0));
	const formattedJsonDocument = TextDocument.create("test://test.json", "json", 0, formattedJsonString);
	const sortedJsonDocument = sortJsoncDocument(formattedJsonDocument, findJsoncPropertyTree(formattedJsonDocument));
	const edits = format(sortedJsonDocument, options, void 0);
	const sortedAndFormattedJsonDocument = TextDocument.applyEdits(sortedJsonDocument, edits);
	return [TextEdit.replace(Range.create(Position.create(0, 0), documentToSort.positionAt(documentToSort.getText().length)), sortedAndFormattedJsonDocument)];
}
function findJsoncPropertyTree(formattedDocument) {
	const scanner = createScanner(formattedDocument.getText(), false);
	let rootTree = new PropertyTree();
	let currentTree = rootTree;
	let currentProperty = rootTree;
	let lastProperty = rootTree;
	let token = void 0;
	let lastTokenLine = 0;
	let numberOfCharactersOnPreviousLines = 0;
	let lastNonTriviaNonCommentToken = void 0;
	let secondToLastNonTriviaNonCommentToken = void 0;
	let lineOfLastNonTriviaNonCommentToken = -1;
	let endIndexOfLastNonTriviaNonCommentToken = -1;
	let beginningLineNumber = 0;
	let endLineNumber = 0;
	let currentContainerStack = [];
	let updateLastPropertyEndLineNumber = false;
	let updateBeginningLineNumber = false;
	while ((token = scanner.scan()) !== 17) {
		if (updateLastPropertyEndLineNumber === true && token !== 14 && token !== 15 && token !== 12 && token !== 13 && currentProperty.endLineNumber === void 0) {
			let endLineNumber$1 = scanner.getTokenStartLine();
			if (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) lastProperty.endLineNumber = endLineNumber$1 - 1;
			else currentProperty.endLineNumber = endLineNumber$1 - 1;
			beginningLineNumber = endLineNumber$1;
			updateLastPropertyEndLineNumber = false;
		}
		if (updateBeginningLineNumber === true && token !== 14 && token !== 15 && token !== 12 && token !== 13) {
			beginningLineNumber = scanner.getTokenStartLine();
			updateBeginningLineNumber = false;
		}
		if (scanner.getTokenStartLine() !== lastTokenLine) {
			for (let i = lastTokenLine; i < scanner.getTokenStartLine(); i++) {
				const lengthOfLine = formattedDocument.getText(Range.create(Position.create(i, 0), Position.create(i + 1, 0))).length;
				numberOfCharactersOnPreviousLines = numberOfCharactersOnPreviousLines + lengthOfLine;
			}
			lastTokenLine = scanner.getTokenStartLine();
		}
		switch (token) {
			case 10:
				if (lastNonTriviaNonCommentToken === void 0 || lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 5 && currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				break;
			case 3:
				if (rootTree.beginningLineNumber === void 0) rootTree.beginningLineNumber = scanner.getTokenStartLine();
				if (currentContainerStack[currentContainerStack.length - 1] === Container.Object) currentTree = currentProperty;
				else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
					currentTree = currentProperty;
				}
				currentContainerStack.push(Container.Array);
				currentProperty.type = Container.Array;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			case 1:
				if (rootTree.beginningLineNumber === void 0) rootTree.beginningLineNumber = scanner.getTokenStartLine();
				else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				currentProperty.type = Container.Object;
				currentContainerStack.push(Container.Object);
				currentTree = currentProperty;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			case 4:
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (currentProperty.endLineNumber === void 0 && (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4)) {
					currentProperty.endLineNumber = endLineNumber - 1;
					currentProperty.lastProperty = true;
					currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
					currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = endLineNumber;
				beginningLineNumber = endLineNumber + 1;
				break;
			case 2:
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (lastNonTriviaNonCommentToken !== 1) {
					if (currentProperty.endLineNumber === void 0) {
						currentProperty.endLineNumber = endLineNumber - 1;
						currentProperty.lastProperty = true;
						currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
						currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					}
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = scanner.getTokenStartLine();
				beginningLineNumber = endLineNumber + 1;
				break;
			case 5:
				endLineNumber = scanner.getTokenStartLine();
				if (currentProperty.endLineNumber === void 0 && (currentContainerStack[currentContainerStack.length - 1] === Container.Object || currentContainerStack[currentContainerStack.length - 1] === Container.Array && (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4))) {
					currentProperty.endLineNumber = endLineNumber;
					currentProperty.commaIndex = scanner.getTokenOffset() - numberOfCharactersOnPreviousLines;
					currentProperty.commaLine = endLineNumber;
				}
				if (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4) {
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				beginningLineNumber = endLineNumber + 1;
				break;
			case 13:
				if (lastNonTriviaNonCommentToken === 5 && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine() && (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object)) {
					if (currentContainerStack[currentContainerStack.length - 1] === Container.Array && (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) || currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
						currentProperty.endLineNumber = void 0;
						updateLastPropertyEndLineNumber = true;
					}
				}
				if ((lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 3) && lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine()) updateBeginningLineNumber = true;
				break;
		}
		if (token !== 14 && token !== 13 && token !== 12 && token !== 15) {
			secondToLastNonTriviaNonCommentToken = lastNonTriviaNonCommentToken;
			lastNonTriviaNonCommentToken = token;
			lineOfLastNonTriviaNonCommentToken = scanner.getTokenStartLine();
			endIndexOfLastNonTriviaNonCommentToken = scanner.getTokenOffset() + scanner.getTokenLength() - numberOfCharactersOnPreviousLines;
		}
	}
	return rootTree;
}
function sortJsoncDocument(jsonDocument, propertyTree) {
	if (propertyTree.childrenProperties.length === 0) return jsonDocument;
	const sortedJsonDocument = TextDocument.create("test://test.json", "json", 0, jsonDocument.getText());
	const queueToSort = [];
	updateSortingQueue(queueToSort, propertyTree, propertyTree.beginningLineNumber);
	while (queueToSort.length > 0) {
		const dataToSort = queueToSort.shift();
		const propertyTreeArray = dataToSort.propertyTreeArray;
		let beginningLineNumber = dataToSort.beginningLineNumber;
		for (let i = 0; i < propertyTreeArray.length; i++) {
			const propertyTree$1 = propertyTreeArray[i];
			const range = Range.create(Position.create(propertyTree$1.beginningLineNumber, 0), Position.create(propertyTree$1.endLineNumber + 1, 0));
			const jsonContentToReplace = jsonDocument.getText(range);
			const jsonDocumentToReplace = TextDocument.create("test://test.json", "json", 0, jsonContentToReplace);
			if (propertyTree$1.lastProperty === true && i !== propertyTreeArray.length - 1) {
				const lineWhereToAddComma = propertyTree$1.lineWhereToAddComma - propertyTree$1.beginningLineNumber;
				const indexWhereToAddComma = propertyTree$1.indexWhereToAddComa;
				const edit$1 = {
					range: Range.create(Position.create(lineWhereToAddComma, indexWhereToAddComma), Position.create(lineWhereToAddComma, indexWhereToAddComma)),
					text: ","
				};
				TextDocument.update(jsonDocumentToReplace, [edit$1], 1);
			} else if (propertyTree$1.lastProperty === false && i === propertyTreeArray.length - 1) {
				const commaIndex = propertyTree$1.commaIndex;
				const lineWhereToRemoveComma = propertyTree$1.commaLine - propertyTree$1.beginningLineNumber;
				const edit$1 = {
					range: Range.create(Position.create(lineWhereToRemoveComma, commaIndex), Position.create(lineWhereToRemoveComma, commaIndex + 1)),
					text: ""
				};
				TextDocument.update(jsonDocumentToReplace, [edit$1], 1);
			}
			const length = propertyTree$1.endLineNumber - propertyTree$1.beginningLineNumber + 1;
			const edit = {
				range: Range.create(Position.create(beginningLineNumber, 0), Position.create(beginningLineNumber + length, 0)),
				text: jsonDocumentToReplace.getText()
			};
			TextDocument.update(sortedJsonDocument, [edit], 1);
			updateSortingQueue(queueToSort, propertyTree$1, beginningLineNumber);
			beginningLineNumber = beginningLineNumber + length;
		}
	}
	return sortedJsonDocument;
}
function sortProperties(properties) {
	properties.sort((a$1, b) => a$1.propertyName.localeCompare(b.propertyName));
}
function updateSortingQueue(queue, propertyTree, beginningLineNumber) {
	if (propertyTree.childrenProperties.length === 0) return;
	if (propertyTree.type === Container.Object) {
		let minimumBeginningLineNumber = Infinity;
		for (const childProperty of propertyTree.childrenProperties) if (childProperty.beginningLineNumber < minimumBeginningLineNumber) minimumBeginningLineNumber = childProperty.beginningLineNumber;
		const diff = minimumBeginningLineNumber - propertyTree.beginningLineNumber;
		beginningLineNumber = beginningLineNumber + diff;
		sortProperties(propertyTree.childrenProperties);
		queue.push(new SortingRange(beginningLineNumber, propertyTree.childrenProperties));
	} else if (propertyTree.type === Container.Array) updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber);
}
function updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber) {
	for (const subObject of propertyTree.childrenProperties) {
		if (subObject.type === Container.Object) {
			let minimumBeginningLineNumber = Infinity;
			for (const childProperty of subObject.childrenProperties) if (childProperty.beginningLineNumber < minimumBeginningLineNumber) minimumBeginningLineNumber = childProperty.beginningLineNumber;
			const diff = minimumBeginningLineNumber - subObject.beginningLineNumber;
			queue.push(new SortingRange(beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber + diff, subObject.childrenProperties));
		}
		if (subObject.type === Container.Array) updateSortingQueueForArrayProperties(queue, subObject, beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber);
	}
}
var SortingRange = class {
	constructor(beginningLineNumber, propertyTreeArray) {
		this.beginningLineNumber = beginningLineNumber;
		this.propertyTreeArray = propertyTreeArray;
	}
};
function findLinks(document, doc) {
	const links = [];
	doc.visit((node) => {
		if (node.type === "property" && node.keyNode.value === "$ref" && node.valueNode?.type === "string") {
			const path = node.valueNode.value;
			const targetNode = findTargetNode(doc, path);
			if (targetNode) {
				const targetPos = document.positionAt(targetNode.offset);
				links.push({
					target: `${document.uri}#${targetPos.line + 1},${targetPos.character + 1}`,
					range: createRange(document, node.valueNode)
				});
			}
		}
		return true;
	});
	return Promise.resolve(links);
}
function createRange(document, node) {
	return Range.create(document.positionAt(node.offset + 1), document.positionAt(node.offset + node.length - 1));
}
function findTargetNode(doc, path) {
	const tokens = parseJSONPointer(path);
	if (!tokens) return null;
	return findNode(tokens, doc.root);
}
function findNode(pointer, node) {
	if (!node) return null;
	if (pointer.length === 0) return node;
	const token = pointer.shift();
	if (node && node.type === "object") {
		const propertyNode = node.properties.find((propertyNode$1) => propertyNode$1.keyNode.value === token);
		if (!propertyNode) return null;
		return findNode(pointer, propertyNode.valueNode);
	} else if (node && node.type === "array") {
		if (token.match(/^(0|[1-9][0-9]*)$/)) {
			const index = Number.parseInt(token);
			const arrayItem = node.items[index];
			if (!arrayItem) return null;
			return findNode(pointer, arrayItem);
		}
	}
	return null;
}
function parseJSONPointer(path) {
	if (path === "#") return [];
	if (path[0] !== "#" || path[1] !== "/") return null;
	return path.substring(2).split(/\//).map(unescape);
}
function unescape(str) {
	return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
function getLanguageService(params) {
	const promise = params.promiseConstructor || Promise;
	const jsonSchemaService = new JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
	jsonSchemaService.setSchemaContributions(schemaContributions);
	const jsonCompletion = new JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
	const jsonHover = new JSONHover(jsonSchemaService, params.contributions, promise);
	const jsonDocumentSymbols = new JSONDocumentSymbols(jsonSchemaService);
	const jsonValidation = new JSONValidation(jsonSchemaService, promise);
	return {
		configure: (settings) => {
			jsonSchemaService.clearExternalSchemas();
			settings.schemas?.forEach(jsonSchemaService.registerExternalSchema.bind(jsonSchemaService));
			jsonValidation.configure(settings);
		},
		resetSchema: (uri) => jsonSchemaService.onResourceChange(uri),
		doValidation: jsonValidation.doValidation.bind(jsonValidation),
		getLanguageStatus: jsonValidation.getLanguageStatus.bind(jsonValidation),
		parseJSONDocument: (document) => parse(document, { collectComments: true }),
		newJSONDocument: (root, diagnostics, comments) => newJSONDocument(root, diagnostics, comments),
		getMatchingSchemas: jsonSchemaService.getMatchingSchemas.bind(jsonSchemaService),
		doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
		doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
		findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
		findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
		findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
		getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
		doHover: jsonHover.doHover.bind(jsonHover),
		getFoldingRanges,
		getSelectionRanges,
		findDefinition: () => Promise.resolve([]),
		findLinks,
		format: (document, range, options) => format(document, options, range),
		sort: (document, options) => sort(document, options)
	};
}
var JsonService = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.schemas = {};
		this.serviceCapabilities = {
			completionProvider: {
				triggerCharacters: ["\"", ":"],
				resolveProvider: true
			},
			diagnosticProvider: {
				interFileDependencies: true,
				workspaceDiagnostics: true
			},
			documentRangeFormattingProvider: true,
			documentFormattingProvider: true,
			hoverProvider: true
		};
		this.$service = getLanguageService({
			schemaRequestService: (uri) => {
				uri = uri.replace("file:///", "");
				let jsonSchema = this.schemas[uri];
				if (jsonSchema) return Promise.resolve(jsonSchema);
				if (typeof fetch !== "undefined" && /^https?:\/\//.test(uri)) return fetch(uri).then((response) => response.text());
				return Promise.reject(`Unable to load schema at ${uri}`);
			},
			workspaceContext: { resolveRelativePath: (relativePath, resource) => {
				const base = resource.substr(0, resource.lastIndexOf("/") + 1);
				return Utils.resolvePath(URI.parse(base), relativePath).toString();
			} }
		});
	}
	$getJsonSchemaUri(documentUri) {
		return this.getOption(documentUri, "schemaUri");
	}
	addDocument(document) {
		super.addDocument(document);
		this.$configureService(document.uri);
	}
	getSchemaOption(documentUri) {
		return this.getOption(documentUri ?? "", "schemas");
	}
	$configureService(documentUri) {
		let schemas = this.getSchemaOption(documentUri);
		let sessionIDs = documentUri ? [] : Object.keys(this.documents);
		schemas?.forEach((el) => {
			if (documentUri) {
				if (this.$getJsonSchemaUri(documentUri) == el.uri) {
					el.fileMatch ??= [];
					el.fileMatch.push(documentUri);
				}
			} else el.fileMatch = sessionIDs.filter((documentUri$1) => this.$getJsonSchemaUri(documentUri$1) == el.uri);
			let schema = el.schema ?? this.schemas[el.uri];
			if (schema) this.schemas[el.uri] = schema;
			this.$service.resetSchema(el.uri);
			el.schema = void 0;
		});
		this.$configureJsonService(schemas);
	}
	$configureJsonService(schemas) {
		this.$service.configure({
			schemas,
			allowComments: this.mode === "json5",
			validate: true
		});
	}
	removeDocument(document) {
		super.removeDocument(document);
		let schemas = this.getOption(document.uri, "schemas");
		schemas?.forEach((el) => {
			if (el.uri === this.$getJsonSchemaUri(document.uri)) el.fileMatch = el.fileMatch?.filter((pattern) => pattern != document.uri);
		});
		this.$configureJsonService(schemas);
	}
	setOptions(documentUri, options, merge = false) {
		super.setOptions(documentUri, options, merge);
		this.$configureService(documentUri);
	}
	setGlobalOptions(options) {
		super.setGlobalOptions(options);
		this.$configureService();
	}
	format(document, range, options) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return Promise.resolve([]);
		return Promise.resolve(this.$service.format(fullDocument, range, options));
	}
	async doHover(document, position) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return null;
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return this.$service.doHover(fullDocument, position, jsonDocument);
	}
	async doValidation(document) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return [];
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return filterDiagnostics(await this.$service.doValidation(fullDocument, jsonDocument, { trailingCommas: this.mode === "json5" ? "ignore" : "error" }), this.optionsToFilterDiagnostics);
	}
	async doComplete(document, position) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return null;
		let jsonDocument = this.$service.parseJSONDocument(fullDocument);
		return await this.$service.doComplete(fullDocument, position, jsonDocument);
	}
	async doResolve(item) {
		return this.$service.doResolve(item);
	}
};
export { JsonService };
