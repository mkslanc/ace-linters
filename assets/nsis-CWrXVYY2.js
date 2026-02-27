import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_nsis_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var NSISHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: "keyword.compiler.nsis",
				regex: /^\s*!(?:include|addincludedir|addplugindir|appendfile|assert|cd|delfile|echo|error|execute|packhdr|pragma|finalize|getdllversion|gettlbversion|system|tempfile|warning|verbose|define|undef|insertmacro|macro|macroend|makensis|searchparse|searchreplace|uninstfinalize)\b/,
				caseInsensitive: true
			},
			{
				token: "keyword.command.nsis",
				regex: /^\s*(?:Abort|AddBrandingImage|AddSize|AllowRootDirInstall|AllowSkipFiles|AutoCloseWindow|BGFont|BGGradient|BrandingText|BringToFront|Call|CallInstDLL|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|CreateDirectory|CreateFont|CreateShortCut|Delete|DeleteINISec|DeleteINIStr|DeleteRegKey|DeleteRegValue|DetailPrint|DetailsButtonText|DirText|DirVar|DirVerify|EnableWindow|EnumRegKey|EnumRegValue|Exch|Exec|ExecShell|ExecShellWait|ExecWait|ExpandEnvStrings|File|FileBufSize|FileClose|FileErrorText|FileOpen|FileRead|FileReadByte|FileReadUTF16LE|FileReadWord|FileWriteUTF16LE|FileSeek|FileWrite|FileWriteByte|FileWriteWord|FindClose|FindFirst|FindNext|FindWindow|FlushINI|GetCurInstType|GetCurrentAddress|GetDlgItem|GetDLLVersion|GetDLLVersionLocal|GetErrorLevel|GetFileTime|GetFileTimeLocal|GetFullPathName|GetFunctionAddress|GetInstDirError|GetKnownFolderPath|GetLabelAddress|GetTempFileName|GetWinVer|Goto|HideWindow|Icon|IfAbort|IfErrors|IfFileExists|IfRebootFlag|IfRtlLanguage|IfShellVarContextAll|IfSilent|InitPluginsDir|InstallButtonText|InstallColors|InstallDir|InstallDirRegKey|InstProgressFlags|InstType|InstTypeGetText|InstTypeSetText|Int64Cmp|Int64CmpU|Int64Fmt|IntCmp|IntCmpU|IntFmt|IntOp|IntPtrCmp|IntPtrCmpU|IntPtrOp|IsWindow|LangString|LicenseBkColor|LicenseData|LicenseForceSelection|LicenseLangString|LicenseText|LoadAndSetImage|LoadLanguageFile|LockWindow|LogSet|LogText|ManifestDPIAware|ManifestLongPathAware|ManifestMaxVersionTested|ManifestSupportedOS|MessageBox|MiscButtonText|Name|Nop|OutFile|Page|PageCallbacks|PEAddResource|PEDllCharacteristics|PERemoveResource|PESubsysVer|Pop|Push|Quit|ReadEnvStr|ReadINIStr|ReadRegDWORD|ReadRegStr|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|SectionGetFlags|SectionGetInstTypes|SectionGetSize|SectionGetText|SectionIn|SectionSetFlags|SectionSetInstTypes|SectionSetSize|SectionSetText|SendMessage|SetAutoClose|SetBrandingImage|SetCompress|SetCompressor|SetCompressorDictSize|SetCtlColors|SetCurInstType|SetDatablockOptimize|SetDateSave|SetDetailsPrint|SetDetailsView|SetErrorLevel|SetErrors|SetFileAttributes|SetFont|SetOutPath|SetOverwrite|SetRebootFlag|SetRegView|SetShellVarContext|SetSilent|ShowInstDetails|ShowUninstDetails|ShowWindow|SilentInstall|SilentUnInstall|Sleep|SpaceTexts|StrCmp|StrCmpS|StrCpy|StrLen|SubCaption|Unicode|UninstallButtonText|UninstallCaption|UninstallIcon|UninstallSubCaption|UninstallText|UninstPage|UnRegDLL|Var|VIAddVersionKey|VIFileVersion|VIProductVersion|WindowIcon|WriteINIStr|WriteRegBin|WriteRegDWORD|WriteRegExpandStr|WriteRegMultiStr|WriteRegNone|WriteRegStr|WriteUninstaller|XPStyle)\b/,
				caseInsensitive: true
			},
			{
				token: "keyword.control.nsis",
				regex: /^\s*!(?:ifdef|ifndef|if|ifmacrodef|ifmacrondef|else|endif)\b/,
				caseInsensitive: true
			},
			{
				token: "keyword.plugin.nsis",
				regex: /^\s*\w+::\w+/,
				caseInsensitive: true
			},
			{
				token: "keyword.operator.comparison.nsis",
				regex: /[!<>]?=|<>|<|>/
			},
			{
				token: "support.function.nsis",
				regex: /(?:\b|^\s*)(?:Function|FunctionEnd|Section|SectionEnd|SectionGroup|SectionGroupEnd|PageEx|PageExEnd)\b/,
				caseInsensitive: true
			},
			{
				token: "support.library.nsis",
				regex: /\${[\w\.:-]+}/
			},
			{
				token: "constant.nsis",
				regex: /\b(?:ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_HIDDEN|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HIDDEN|HKCC|HKCR(32|64)?|HKCU(32|64)?|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM(32|64)?|HKPD|HKU|IDABORT|IDCANCEL|IDD_DIR|IDD_INST|IDD_INSTFILES|IDD_LICENSE|IDD_SELCOM|IDD_UNINST|IDD_VERIFY|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|MB_YESNOCANCEL|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SW_HIDE|SW_SHOWDEFAULT|SW_SHOWMAXIMIZED|SW_SHOWMINIMIZED|SW_SHOWNORMAL|SYSTEM|TEMPORARY)\b/,
				caseInsensitive: true
			},
			{
				token: "constant.library.nsis",
				regex: /\${(?:AtLeastServicePack|AtLeastWin7|AtLeastWin8|AtLeastWin10|AtLeastWin95|AtLeastWin98|AtLeastWin2000|AtLeastWin2003|AtLeastWin2008|AtLeastWin2008R2|AtLeastWinME|AtLeastWinNT4|AtLeastWinVista|AtLeastWinXP|AtMostServicePack|AtMostWin7|AtMostWin8|AtMostWin10|AtMostWin95|AtMostWin98|AtMostWin2000|AtMostWin2003|AtMostWin2008|AtMostWin2008R2|AtMostWinME|AtMostWinNT4|AtMostWinVista|AtMostWinXP|IsDomainController|IsNT|IsServer|IsServicePack|IsWin7|IsWin8|IsWin10|IsWin95|IsWin98|IsWin2000|IsWin2003|IsWin2008|IsWin2008R2|IsWinME|IsWinNT4|IsWinVista|IsWinXP)}/
			},
			{
				token: "constant.language.boolean.true.nsis",
				regex: /\b(?:true|on)\b/
			},
			{
				token: "constant.language.boolean.false.nsis",
				regex: /\b(?:false|off)\b/
			},
			{
				token: "constant.language.option.nsis",
				regex: /(?:\b|^\s*)(?:(?:un\.)?components|(?:un\.)?custom|(?:un\.)?directory|(?:un\.)?instfiles|(?:un\.)?license|uninstConfirm|admin|all|amd64-unicode|auto|both|bottom|bzip2|current|force|hide|highest|ifdiff|ifnewer|lastused|leave|left|listonly|lzma|nevershow|none|normal|notset|right|show|silent|silentlog|textonly|top|try|user|Win10|Win7|Win8|WinVista|x86-(ansi|unicode)|zlib)\b/,
				caseInsensitive: true
			},
			{
				token: "constant.language.slash-option.nsis",
				regex: /\b\/(?:a|BRANDING|CENTER|COMPONENTSONLYONCUSTOM|CUSTOMSTRING=|date|e|ENABLECANCEL|FILESONLY|file|FINAL|GLOBAL|gray|ifempty|ifndef|ignorecase|IMGID=|ITALIC|LANG=|NOCUSTOM|noerrors|NONFATAL|nonfatal|oname=|o|REBOOTOK|redef|RESIZETOFIT|r|SHORT|SILENT|SOLID|STRIKE|TRIM|UNDERLINE|utcdate|windows|x)\b/,
				caseInsensitive: true
			},
			{
				token: "constant.numeric.nsis",
				regex: /\b(?:0(?:x|X)[0-9a-fA-F]+|[0-9]+(?:\.[0-9]+)?)\b/
			},
			{
				token: "entity.name.function.nsis",
				regex: /\$\([\w\.:-]+\)/
			},
			{
				token: "storage.type.function.nsis",
				regex: /\$\w+/
			},
			{
				token: "punctuation.definition.string.begin.nsis",
				regex: /`/,
				push: [
					{
						token: "punctuation.definition.string.end.nsis",
						regex: /`/,
						next: "pop"
					},
					{
						token: "constant.character.escape.nsis",
						regex: /\$\\./
					},
					{ defaultToken: "string.quoted.back.nsis" }
				]
			},
			{
				token: "punctuation.definition.string.begin.nsis",
				regex: /"/,
				push: [
					{
						token: "punctuation.definition.string.end.nsis",
						regex: /"/,
						next: "pop"
					},
					{
						token: "constant.character.escape.nsis",
						regex: /\$\\./
					},
					{ defaultToken: "string.quoted.double.nsis" }
				]
			},
			{
				token: "punctuation.definition.string.begin.nsis",
				regex: /'/,
				push: [
					{
						token: "punctuation.definition.string.end.nsis",
						regex: /'/,
						next: "pop"
					},
					{
						token: "constant.character.escape.nsis",
						regex: /\$\\./
					},
					{ defaultToken: "string.quoted.single.nsis" }
				]
			},
			{
				token: ["punctuation.definition.comment.nsis", "comment.line.nsis"],
				regex: /(;|#)(.*$)/
			},
			{
				token: "punctuation.definition.comment.nsis",
				regex: /\/\*/,
				push: [{
					token: "punctuation.definition.comment.nsis",
					regex: /\*\//,
					next: "pop"
				}, { defaultToken: "comment.block.nsis" }]
			},
			{
				token: "text",
				regex: /(?:!include|!insertmacro)\b/
			}
		] };
		this.normalizeRules();
	};
	NSISHighlightRules$1.metaData = {
		comment: "\n	todo: - highlight functions\n	",
		fileTypes: ["nsi", "nsh"],
		name: "NSIS",
		scopeName: "source.nsis"
	};
	oop$1.inherits(NSISHighlightRules$1, TextHighlightRules);
	exports.NSISHighlightRules = NSISHighlightRules$1;
}));
var require_nsis = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var NSISHighlightRules = require_nsis_highlight_rules().NSISHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = NSISHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = [";", "#"];
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/nsis";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_nsis();
