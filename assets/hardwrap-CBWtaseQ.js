import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
var require_hardwrap = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	function hardWrap(editor, options) {
		var max = options.column || editor.getOption("printMarginColumn");
		var allowMerge = options.allowMerge != false;
		var row = Math.min(options.startRow, options.endRow);
		var endRow = Math.max(options.startRow, options.endRow);
		var session = editor.session;
		while (row <= endRow) {
			var line = session.getLine(row);
			if (line.length > max) {
				var space = findSpace(line, max, 5);
				if (space) {
					var indentation = /^\s*/.exec(line)[0];
					session.replace(new Range(row, space.start, row, space.end), "\n" + indentation);
				}
				endRow++;
			} else if (allowMerge && /\S/.test(line) && row != endRow) {
				var nextLine = session.getLine(row + 1);
				if (nextLine && /\S/.test(nextLine)) {
					var trimmedLine = line.replace(/\s+$/, "");
					var trimmedNextLine = nextLine.replace(/^\s+/, "");
					var mergedLine = trimmedLine + " " + trimmedNextLine;
					var space = findSpace(mergedLine, max, 5);
					if (space && space.start > trimmedLine.length || mergedLine.length < max) {
						var replaceRange = new Range(row, trimmedLine.length, row + 1, nextLine.length - trimmedNextLine.length);
						session.replace(replaceRange, " ");
						row--;
						endRow--;
					} else if (trimmedLine.length < line.length) session.remove(new Range(row, trimmedLine.length, row, line.length));
				}
			}
			row++;
		}
		function findSpace(line$1, max$1, min) {
			if (line$1.length < max$1) return;
			var before = line$1.slice(0, max$1);
			var after = line$1.slice(max$1);
			var spaceAfter = /^(?:(\s+)|(\S+)(\s+))/.exec(after);
			var spaceBefore = /(?:(\s+)|(\s+)(\S+))$/.exec(before);
			var start = 0;
			var end = 0;
			if (spaceBefore && !spaceBefore[2]) {
				start = max$1 - spaceBefore[1].length;
				end = max$1;
			}
			if (spaceAfter && !spaceAfter[2]) {
				if (!start) start = max$1;
				end = max$1 + spaceAfter[1].length;
			}
			if (start) return {
				start,
				end
			};
			if (spaceBefore && spaceBefore[2] && spaceBefore.index > min) return {
				start: spaceBefore.index,
				end: spaceBefore.index + spaceBefore[2].length
			};
			if (spaceAfter && spaceAfter[2]) {
				start = max$1 + spaceAfter[2].length;
				return {
					start,
					end: start + spaceAfter[3].length
				};
			}
		}
	}
	function wrapAfterInput(e) {
		if (e.command.name == "insertstring" && /\S/.test(e.args)) {
			var editor = e.editor;
			var cursor = editor.selection.cursor;
			if (cursor.column <= editor.renderer.$printMarginColumn) return;
			var lastDelta = editor.session.$undoManager.$lastDelta;
			hardWrap(editor, {
				startRow: cursor.row,
				endRow: cursor.row,
				allowMerge: false
			});
			if (lastDelta != editor.session.$undoManager.$lastDelta) editor.session.markUndoGroup();
		}
	}
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", { hardWrap: {
		set: function(val) {
			if (val) this.commands.on("afterExec", wrapAfterInput);
			else this.commands.off("afterExec", wrapAfterInput);
		},
		value: false
	} });
	exports.hardWrap = hardWrap;
}));
export default require_hardwrap();
export { require_hardwrap as t };
