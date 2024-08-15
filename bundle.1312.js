"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1312],{

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 31312:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var NSISHighlightRules = (__webpack_require__(32971)/* .NSISHighlightRules */ .J);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = NSISHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = [";", "#"];
    this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/nsis";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 32971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var NSISHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "keyword.compiler.nsis",
            regex: /^\s*!(?:include|addincludedir|addplugindir|appendfile|assert|cd|delfile|echo|error|execute|packhdr|pragma|finalize|getdllversion|gettlbversion|system|tempfile|warning|verbose|define|undef|insertmacro|macro|macroend|makensis|searchparse|searchreplace|uninstfinalize)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.command.nsis",
            regex: /^\s*(?:Abort|AddBrandingImage|AddSize|AllowRootDirInstall|AllowSkipFiles|AutoCloseWindow|BGFont|BGGradient|BrandingText|BringToFront|Call|CallInstDLL|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|CreateDirectory|CreateFont|CreateShortCut|Delete|DeleteINISec|DeleteINIStr|DeleteRegKey|DeleteRegValue|DetailPrint|DetailsButtonText|DirText|DirVar|DirVerify|EnableWindow|EnumRegKey|EnumRegValue|Exch|Exec|ExecShell|ExecShellWait|ExecWait|ExpandEnvStrings|File|FileBufSize|FileClose|FileErrorText|FileOpen|FileRead|FileReadByte|FileReadUTF16LE|FileReadWord|FileWriteUTF16LE|FileSeek|FileWrite|FileWriteByte|FileWriteWord|FindClose|FindFirst|FindNext|FindWindow|FlushINI|GetCurInstType|GetCurrentAddress|GetDlgItem|GetDLLVersion|GetDLLVersionLocal|GetErrorLevel|GetFileTime|GetFileTimeLocal|GetFullPathName|GetFunctionAddress|GetInstDirError|GetKnownFolderPath|GetLabelAddress|GetTempFileName|GetWinVer|Goto|HideWindow|Icon|IfAbort|IfErrors|IfFileExists|IfRebootFlag|IfRtlLanguage|IfShellVarContextAll|IfSilent|InitPluginsDir|InstallButtonText|InstallColors|InstallDir|InstallDirRegKey|InstProgressFlags|InstType|InstTypeGetText|InstTypeSetText|Int64Cmp|Int64CmpU|Int64Fmt|IntCmp|IntCmpU|IntFmt|IntOp|IntPtrCmp|IntPtrCmpU|IntPtrOp|IsWindow|LangString|LicenseBkColor|LicenseData|LicenseForceSelection|LicenseLangString|LicenseText|LoadAndSetImage|LoadLanguageFile|LockWindow|LogSet|LogText|ManifestDPIAware|ManifestLongPathAware|ManifestMaxVersionTested|ManifestSupportedOS|MessageBox|MiscButtonText|Name|Nop|OutFile|Page|PageCallbacks|PEAddResource|PEDllCharacteristics|PERemoveResource|PESubsysVer|Pop|Push|Quit|ReadEnvStr|ReadINIStr|ReadRegDWORD|ReadRegStr|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|SectionGetFlags|SectionGetInstTypes|SectionGetSize|SectionGetText|SectionIn|SectionSetFlags|SectionSetInstTypes|SectionSetSize|SectionSetText|SendMessage|SetAutoClose|SetBrandingImage|SetCompress|SetCompressor|SetCompressorDictSize|SetCtlColors|SetCurInstType|SetDatablockOptimize|SetDateSave|SetDetailsPrint|SetDetailsView|SetErrorLevel|SetErrors|SetFileAttributes|SetFont|SetOutPath|SetOverwrite|SetRebootFlag|SetRegView|SetShellVarContext|SetSilent|ShowInstDetails|ShowUninstDetails|ShowWindow|SilentInstall|SilentUnInstall|Sleep|SpaceTexts|StrCmp|StrCmpS|StrCpy|StrLen|SubCaption|Unicode|UninstallButtonText|UninstallCaption|UninstallIcon|UninstallSubCaption|UninstallText|UninstPage|UnRegDLL|Var|VIAddVersionKey|VIFileVersion|VIProductVersion|WindowIcon|WriteINIStr|WriteRegBin|WriteRegDWORD|WriteRegExpandStr|WriteRegMultiStr|WriteRegNone|WriteRegStr|WriteUninstaller|XPStyle)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.nsis",
            regex: /^\s*!(?:ifdef|ifndef|if|ifmacrodef|ifmacrondef|else|endif)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.plugin.nsis",
            regex: /^\s*\w+::\w+/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.comparison.nsis",
            regex: /[!<>]?=|<>|<|>/
        }, {
            token: "support.function.nsis",
            regex: /(?:\b|^\s*)(?:Function|FunctionEnd|Section|SectionEnd|SectionGroup|SectionGroupEnd|PageEx|PageExEnd)\b/,
            caseInsensitive: true
        }, {
            token: "support.library.nsis",
            regex: /\${[\w\.:-]+}/
        }, {
            token: "constant.nsis",
            regex: /\b(?:ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_HIDDEN|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HIDDEN|HKCC|HKCR(32|64)?|HKCU(32|64)?|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM(32|64)?|HKPD|HKU|IDABORT|IDCANCEL|IDD_DIR|IDD_INST|IDD_INSTFILES|IDD_LICENSE|IDD_SELCOM|IDD_UNINST|IDD_VERIFY|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|MB_YESNOCANCEL|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SW_HIDE|SW_SHOWDEFAULT|SW_SHOWMAXIMIZED|SW_SHOWMINIMIZED|SW_SHOWNORMAL|SYSTEM|TEMPORARY)\b/,
            caseInsensitive: true
        }, {
            token: "constant.library.nsis",
            regex: /\${(?:AtLeastServicePack|AtLeastWin7|AtLeastWin8|AtLeastWin10|AtLeastWin95|AtLeastWin98|AtLeastWin2000|AtLeastWin2003|AtLeastWin2008|AtLeastWin2008R2|AtLeastWinME|AtLeastWinNT4|AtLeastWinVista|AtLeastWinXP|AtMostServicePack|AtMostWin7|AtMostWin8|AtMostWin10|AtMostWin95|AtMostWin98|AtMostWin2000|AtMostWin2003|AtMostWin2008|AtMostWin2008R2|AtMostWinME|AtMostWinNT4|AtMostWinVista|AtMostWinXP|IsDomainController|IsNT|IsServer|IsServicePack|IsWin7|IsWin8|IsWin10|IsWin95|IsWin98|IsWin2000|IsWin2003|IsWin2008|IsWin2008R2|IsWinME|IsWinNT4|IsWinVista|IsWinXP)}/
        }, {
            token: "constant.language.boolean.true.nsis",
            regex: /\b(?:true|on)\b/
        }, {
            token: "constant.language.boolean.false.nsis",
            regex: /\b(?:false|off)\b/
        }, {
            token: "constant.language.option.nsis",
            regex: /(?:\b|^\s*)(?:(?:un\.)?components|(?:un\.)?custom|(?:un\.)?directory|(?:un\.)?instfiles|(?:un\.)?license|uninstConfirm|admin|all|amd64-unicode|auto|both|bottom|bzip2|current|force|hide|highest|ifdiff|ifnewer|lastused|leave|left|listonly|lzma|nevershow|none|normal|notset|right|show|silent|silentlog|textonly|top|try|user|Win10|Win7|Win8|WinVista|x86-(ansi|unicode)|zlib)\b/,
            caseInsensitive: true
        }, {
            token: "constant.language.slash-option.nsis",
            regex: /\b\/(?:a|BRANDING|CENTER|COMPONENTSONLYONCUSTOM|CUSTOMSTRING=|date|e|ENABLECANCEL|FILESONLY|file|FINAL|GLOBAL|gray|ifempty|ifndef|ignorecase|IMGID=|ITALIC|LANG=|NOCUSTOM|noerrors|NONFATAL|nonfatal|oname=|o|REBOOTOK|redef|RESIZETOFIT|r|SHORT|SILENT|SOLID|STRIKE|TRIM|UNDERLINE|utcdate|windows|x)\b/,
            caseInsensitive: true
        }, {
            token: "constant.numeric.nsis",
            regex: /\b(?:0(?:x|X)[0-9a-fA-F]+|[0-9]+(?:\.[0-9]+)?)\b/
        }, {
            token: "entity.name.function.nsis",
            regex: /\$\([\w\.:-]+\)/
        }, {
            token: "storage.type.function.nsis",
            regex: /\$\w+/
        }, {
            token: "punctuation.definition.string.begin.nsis",
            regex: /`/,
            push: [{
                token: "punctuation.definition.string.end.nsis",
                regex: /`/,
                next: "pop"
            }, {
                token: "constant.character.escape.nsis",
                regex: /\$\\./
            }, {
                defaultToken: "string.quoted.back.nsis"
            }]
        }, {
            token: "punctuation.definition.string.begin.nsis",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.nsis",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.nsis",
                regex: /\$\\./
            }, {
                defaultToken: "string.quoted.double.nsis"
            }]
        }, {
            token: "punctuation.definition.string.begin.nsis",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.nsis",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.nsis",
                regex: /\$\\./
            }, {
                defaultToken: "string.quoted.single.nsis"
            }]
        }, {
            token: [
                "punctuation.definition.comment.nsis",
                "comment.line.nsis"
            ],
            regex: /(;|#)(.*$)/
        }, {
            token: "punctuation.definition.comment.nsis",
            regex: /\/\*/,
            push: [{
                token: "punctuation.definition.comment.nsis",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.nsis"
            }]
        }, {
            token: "text",
            regex: /(?:!include|!insertmacro)\b/
        }]
    };
    
    this.normalizeRules();
};

NSISHighlightRules.metaData = {
    comment: "\n\ttodo: - highlight functions\n\t",
    fileTypes: ["nsi", "nsh"],
    name: "NSIS",
    scopeName: "source.nsis"
};


oop.inherits(NSISHighlightRules, TextHighlightRules);

exports.J = NSISHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEzMTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDOUpEO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx5QkFBeUIsd0RBQW9EO0FBQzdFLGVBQWUsOENBQW9DOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0IseUJBQXlCO0FBQ3pCO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ3hCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixVQUFVO0FBQ2pDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUIseWlCQUF5aUI7QUFDaGtCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbnNpcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL25zaXNfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBOU0lTSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9uc2lzX2hpZ2hsaWdodF9ydWxlc1wiKS5OU0lTSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTlNJU0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gW1wiO1wiLCBcIiNcIl07XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9uc2lzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTlNJU0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29tcGlsZXIubnNpc1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKiEoPzppbmNsdWRlfGFkZGluY2x1ZGVkaXJ8YWRkcGx1Z2luZGlyfGFwcGVuZGZpbGV8YXNzZXJ0fGNkfGRlbGZpbGV8ZWNob3xlcnJvcnxleGVjdXRlfHBhY2toZHJ8cHJhZ21hfGZpbmFsaXplfGdldGRsbHZlcnNpb258Z2V0dGxidmVyc2lvbnxzeXN0ZW18dGVtcGZpbGV8d2FybmluZ3x2ZXJib3NlfGRlZmluZXx1bmRlZnxpbnNlcnRtYWNyb3xtYWNyb3xtYWNyb2VuZHxtYWtlbnNpc3xzZWFyY2hwYXJzZXxzZWFyY2hyZXBsYWNlfHVuaW5zdGZpbmFsaXplKVxcYi8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb21tYW5kLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyooPzpBYm9ydHxBZGRCcmFuZGluZ0ltYWdlfEFkZFNpemV8QWxsb3dSb290RGlySW5zdGFsbHxBbGxvd1NraXBGaWxlc3xBdXRvQ2xvc2VXaW5kb3d8QkdGb250fEJHR3JhZGllbnR8QnJhbmRpbmdUZXh0fEJyaW5nVG9Gcm9udHxDYWxsfENhbGxJbnN0RExMfENhcHRpb258Q2hhbmdlVUl8Q2hlY2tCaXRtYXB8Q2xlYXJFcnJvcnN8Q29tcGxldGVkVGV4dHxDb21wb25lbnRUZXh0fENvcHlGaWxlc3xDUkNDaGVja3xDcmVhdGVEaXJlY3Rvcnl8Q3JlYXRlRm9udHxDcmVhdGVTaG9ydEN1dHxEZWxldGV8RGVsZXRlSU5JU2VjfERlbGV0ZUlOSVN0cnxEZWxldGVSZWdLZXl8RGVsZXRlUmVnVmFsdWV8RGV0YWlsUHJpbnR8RGV0YWlsc0J1dHRvblRleHR8RGlyVGV4dHxEaXJWYXJ8RGlyVmVyaWZ5fEVuYWJsZVdpbmRvd3xFbnVtUmVnS2V5fEVudW1SZWdWYWx1ZXxFeGNofEV4ZWN8RXhlY1NoZWxsfEV4ZWNTaGVsbFdhaXR8RXhlY1dhaXR8RXhwYW5kRW52U3RyaW5nc3xGaWxlfEZpbGVCdWZTaXplfEZpbGVDbG9zZXxGaWxlRXJyb3JUZXh0fEZpbGVPcGVufEZpbGVSZWFkfEZpbGVSZWFkQnl0ZXxGaWxlUmVhZFVURjE2TEV8RmlsZVJlYWRXb3JkfEZpbGVXcml0ZVVURjE2TEV8RmlsZVNlZWt8RmlsZVdyaXRlfEZpbGVXcml0ZUJ5dGV8RmlsZVdyaXRlV29yZHxGaW5kQ2xvc2V8RmluZEZpcnN0fEZpbmROZXh0fEZpbmRXaW5kb3d8Rmx1c2hJTkl8R2V0Q3VySW5zdFR5cGV8R2V0Q3VycmVudEFkZHJlc3N8R2V0RGxnSXRlbXxHZXRETExWZXJzaW9ufEdldERMTFZlcnNpb25Mb2NhbHxHZXRFcnJvckxldmVsfEdldEZpbGVUaW1lfEdldEZpbGVUaW1lTG9jYWx8R2V0RnVsbFBhdGhOYW1lfEdldEZ1bmN0aW9uQWRkcmVzc3xHZXRJbnN0RGlyRXJyb3J8R2V0S25vd25Gb2xkZXJQYXRofEdldExhYmVsQWRkcmVzc3xHZXRUZW1wRmlsZU5hbWV8R2V0V2luVmVyfEdvdG98SGlkZVdpbmRvd3xJY29ufElmQWJvcnR8SWZFcnJvcnN8SWZGaWxlRXhpc3RzfElmUmVib290RmxhZ3xJZlJ0bExhbmd1YWdlfElmU2hlbGxWYXJDb250ZXh0QWxsfElmU2lsZW50fEluaXRQbHVnaW5zRGlyfEluc3RhbGxCdXR0b25UZXh0fEluc3RhbGxDb2xvcnN8SW5zdGFsbERpcnxJbnN0YWxsRGlyUmVnS2V5fEluc3RQcm9ncmVzc0ZsYWdzfEluc3RUeXBlfEluc3RUeXBlR2V0VGV4dHxJbnN0VHlwZVNldFRleHR8SW50NjRDbXB8SW50NjRDbXBVfEludDY0Rm10fEludENtcHxJbnRDbXBVfEludEZtdHxJbnRPcHxJbnRQdHJDbXB8SW50UHRyQ21wVXxJbnRQdHJPcHxJc1dpbmRvd3xMYW5nU3RyaW5nfExpY2Vuc2VCa0NvbG9yfExpY2Vuc2VEYXRhfExpY2Vuc2VGb3JjZVNlbGVjdGlvbnxMaWNlbnNlTGFuZ1N0cmluZ3xMaWNlbnNlVGV4dHxMb2FkQW5kU2V0SW1hZ2V8TG9hZExhbmd1YWdlRmlsZXxMb2NrV2luZG93fExvZ1NldHxMb2dUZXh0fE1hbmlmZXN0RFBJQXdhcmV8TWFuaWZlc3RMb25nUGF0aEF3YXJlfE1hbmlmZXN0TWF4VmVyc2lvblRlc3RlZHxNYW5pZmVzdFN1cHBvcnRlZE9TfE1lc3NhZ2VCb3h8TWlzY0J1dHRvblRleHR8TmFtZXxOb3B8T3V0RmlsZXxQYWdlfFBhZ2VDYWxsYmFja3N8UEVBZGRSZXNvdXJjZXxQRURsbENoYXJhY3RlcmlzdGljc3xQRVJlbW92ZVJlc291cmNlfFBFU3Vic3lzVmVyfFBvcHxQdXNofFF1aXR8UmVhZEVudlN0cnxSZWFkSU5JU3RyfFJlYWRSZWdEV09SRHxSZWFkUmVnU3RyfFJlYm9vdHxSZWdETEx8UmVuYW1lfFJlcXVlc3RFeGVjdXRpb25MZXZlbHxSZXNlcnZlRmlsZXxSZXR1cm58Uk1EaXJ8U2VhcmNoUGF0aHxTZWN0aW9uR2V0RmxhZ3N8U2VjdGlvbkdldEluc3RUeXBlc3xTZWN0aW9uR2V0U2l6ZXxTZWN0aW9uR2V0VGV4dHxTZWN0aW9uSW58U2VjdGlvblNldEZsYWdzfFNlY3Rpb25TZXRJbnN0VHlwZXN8U2VjdGlvblNldFNpemV8U2VjdGlvblNldFRleHR8U2VuZE1lc3NhZ2V8U2V0QXV0b0Nsb3NlfFNldEJyYW5kaW5nSW1hZ2V8U2V0Q29tcHJlc3N8U2V0Q29tcHJlc3NvcnxTZXRDb21wcmVzc29yRGljdFNpemV8U2V0Q3RsQ29sb3JzfFNldEN1ckluc3RUeXBlfFNldERhdGFibG9ja09wdGltaXplfFNldERhdGVTYXZlfFNldERldGFpbHNQcmludHxTZXREZXRhaWxzVmlld3xTZXRFcnJvckxldmVsfFNldEVycm9yc3xTZXRGaWxlQXR0cmlidXRlc3xTZXRGb250fFNldE91dFBhdGh8U2V0T3ZlcndyaXRlfFNldFJlYm9vdEZsYWd8U2V0UmVnVmlld3xTZXRTaGVsbFZhckNvbnRleHR8U2V0U2lsZW50fFNob3dJbnN0RGV0YWlsc3xTaG93VW5pbnN0RGV0YWlsc3xTaG93V2luZG93fFNpbGVudEluc3RhbGx8U2lsZW50VW5JbnN0YWxsfFNsZWVwfFNwYWNlVGV4dHN8U3RyQ21wfFN0ckNtcFN8U3RyQ3B5fFN0ckxlbnxTdWJDYXB0aW9ufFVuaWNvZGV8VW5pbnN0YWxsQnV0dG9uVGV4dHxVbmluc3RhbGxDYXB0aW9ufFVuaW5zdGFsbEljb258VW5pbnN0YWxsU3ViQ2FwdGlvbnxVbmluc3RhbGxUZXh0fFVuaW5zdFBhZ2V8VW5SZWdETEx8VmFyfFZJQWRkVmVyc2lvbktleXxWSUZpbGVWZXJzaW9ufFZJUHJvZHVjdFZlcnNpb258V2luZG93SWNvbnxXcml0ZUlOSVN0cnxXcml0ZVJlZ0JpbnxXcml0ZVJlZ0RXT1JEfFdyaXRlUmVnRXhwYW5kU3RyfFdyaXRlUmVnTXVsdGlTdHJ8V3JpdGVSZWdOb25lfFdyaXRlUmVnU3RyfFdyaXRlVW5pbnN0YWxsZXJ8WFBTdHlsZSlcXGIvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL15cXHMqISg/OmlmZGVmfGlmbmRlZnxpZnxpZm1hY3JvZGVmfGlmbWFjcm9uZGVmfGVsc2V8ZW5kaWYpXFxiLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLnBsdWdpbi5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL15cXHMqXFx3Kzo6XFx3Ky8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5jb21wYXJpc29uLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWyE8Pl0/PXw8Pnw8fD4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQuZnVuY3Rpb24ubnNpc1wiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzpcXGJ8XlxccyopKD86RnVuY3Rpb258RnVuY3Rpb25FbmR8U2VjdGlvbnxTZWN0aW9uRW5kfFNlY3Rpb25Hcm91cHxTZWN0aW9uR3JvdXBFbmR8UGFnZUV4fFBhZ2VFeEVuZClcXGIvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQubGlicmFyeS5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJHtbXFx3XFwuOi1dK30vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86QVJDSElWRXxGSUxFX0FUVFJJQlVURV9BUkNISVZFfEZJTEVfQVRUUklCVVRFX0hJRERFTnxGSUxFX0FUVFJJQlVURV9OT1JNQUx8RklMRV9BVFRSSUJVVEVfT0ZGTElORXxGSUxFX0FUVFJJQlVURV9SRUFET05MWXxGSUxFX0FUVFJJQlVURV9TWVNURU18RklMRV9BVFRSSUJVVEVfVEVNUE9SQVJZfEhJRERFTnxIS0NDfEhLQ1IoMzJ8NjQpP3xIS0NVKDMyfDY0KT98SEtERHxIS0VZX0NMQVNTRVNfUk9PVHxIS0VZX0NVUlJFTlRfQ09ORklHfEhLRVlfQ1VSUkVOVF9VU0VSfEhLRVlfRFlOX0RBVEF8SEtFWV9MT0NBTF9NQUNISU5FfEhLRVlfUEVSRk9STUFOQ0VfREFUQXxIS0VZX1VTRVJTfEhLTE0oMzJ8NjQpP3xIS1BEfEhLVXxJREFCT1JUfElEQ0FOQ0VMfElERF9ESVJ8SUREX0lOU1R8SUREX0lOU1RGSUxFU3xJRERfTElDRU5TRXxJRERfU0VMQ09NfElERF9VTklOU1R8SUREX1ZFUklGWXxJRElHTk9SRXxJRE5PfElET0t8SURSRVRSWXxJRFlFU3xNQl9BQk9SVFJFVFJZSUdOT1JFfE1CX0RFRkJVVFRPTjF8TUJfREVGQlVUVE9OMnxNQl9ERUZCVVRUT04zfE1CX0RFRkJVVFRPTjR8TUJfSUNPTkVYQ0xBTUFUSU9OfE1CX0lDT05JTkZPUk1BVElPTnxNQl9JQ09OUVVFU1RJT058TUJfSUNPTlNUT1B8TUJfT0t8TUJfT0tDQU5DRUx8TUJfUkVUUllDQU5DRUx8TUJfUklHSFR8TUJfUlRMUkVBRElOR3xNQl9TRVRGT1JFR1JPVU5EfE1CX1RPUE1PU1R8TUJfVVNFUklDT058TUJfWUVTTk98TUJfWUVTTk9DQU5DRUx8Tk9STUFMfE9GRkxJTkV8UkVBRE9OTFl8U0hDVFh8U0hFTExfQ09OVEVYVHxTV19ISURFfFNXX1NIT1dERUZBVUxUfFNXX1NIT1dNQVhJTUlaRUR8U1dfU0hPV01JTklNSVpFRHxTV19TSE9XTk9STUFMfFNZU1RFTXxURU1QT1JBUlkpXFxiLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5saWJyYXJ5Lm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwkeyg/OkF0TGVhc3RTZXJ2aWNlUGFja3xBdExlYXN0V2luN3xBdExlYXN0V2luOHxBdExlYXN0V2luMTB8QXRMZWFzdFdpbjk1fEF0TGVhc3RXaW45OHxBdExlYXN0V2luMjAwMHxBdExlYXN0V2luMjAwM3xBdExlYXN0V2luMjAwOHxBdExlYXN0V2luMjAwOFIyfEF0TGVhc3RXaW5NRXxBdExlYXN0V2luTlQ0fEF0TGVhc3RXaW5WaXN0YXxBdExlYXN0V2luWFB8QXRNb3N0U2VydmljZVBhY2t8QXRNb3N0V2luN3xBdE1vc3RXaW44fEF0TW9zdFdpbjEwfEF0TW9zdFdpbjk1fEF0TW9zdFdpbjk4fEF0TW9zdFdpbjIwMDB8QXRNb3N0V2luMjAwM3xBdE1vc3RXaW4yMDA4fEF0TW9zdFdpbjIwMDhSMnxBdE1vc3RXaW5NRXxBdE1vc3RXaW5OVDR8QXRNb3N0V2luVmlzdGF8QXRNb3N0V2luWFB8SXNEb21haW5Db250cm9sbGVyfElzTlR8SXNTZXJ2ZXJ8SXNTZXJ2aWNlUGFja3xJc1dpbjd8SXNXaW44fElzV2luMTB8SXNXaW45NXxJc1dpbjk4fElzV2luMjAwMHxJc1dpbjIwMDN8SXNXaW4yMDA4fElzV2luMjAwOFIyfElzV2luTUV8SXNXaW5OVDR8SXNXaW5WaXN0YXxJc1dpblhQKX0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW4udHJ1ZS5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OnRydWV8b24pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuLmZhbHNlLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86ZmFsc2V8b2ZmKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2Uub3B0aW9uLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86XFxifF5cXHMqKSg/Oig/OnVuXFwuKT9jb21wb25lbnRzfCg/OnVuXFwuKT9jdXN0b218KD86dW5cXC4pP2RpcmVjdG9yeXwoPzp1blxcLik/aW5zdGZpbGVzfCg/OnVuXFwuKT9saWNlbnNlfHVuaW5zdENvbmZpcm18YWRtaW58YWxsfGFtZDY0LXVuaWNvZGV8YXV0b3xib3RofGJvdHRvbXxiemlwMnxjdXJyZW50fGZvcmNlfGhpZGV8aGlnaGVzdHxpZmRpZmZ8aWZuZXdlcnxsYXN0dXNlZHxsZWF2ZXxsZWZ0fGxpc3Rvbmx5fGx6bWF8bmV2ZXJzaG93fG5vbmV8bm9ybWFsfG5vdHNldHxyaWdodHxzaG93fHNpbGVudHxzaWxlbnRsb2d8dGV4dG9ubHl8dG9wfHRyeXx1c2VyfFdpbjEwfFdpbjd8V2luOHxXaW5WaXN0YXx4ODYtKGFuc2l8dW5pY29kZSl8emxpYilcXGIvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLnNsYXNoLW9wdGlvbi5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYlxcLyg/OmF8QlJBTkRJTkd8Q0VOVEVSfENPTVBPTkVOVFNPTkxZT05DVVNUT018Q1VTVE9NU1RSSU5HPXxkYXRlfGV8RU5BQkxFQ0FOQ0VMfEZJTEVTT05MWXxmaWxlfEZJTkFMfEdMT0JBTHxncmF5fGlmZW1wdHl8aWZuZGVmfGlnbm9yZWNhc2V8SU1HSUQ9fElUQUxJQ3xMQU5HPXxOT0NVU1RPTXxub2Vycm9yc3xOT05GQVRBTHxub25mYXRhbHxvbmFtZT18b3xSRUJPT1RPS3xyZWRlZnxSRVNJWkVUT0ZJVHxyfFNIT1JUfFNJTEVOVHxTT0xJRHxTVFJJS0V8VFJJTXxVTkRFUkxJTkV8dXRjZGF0ZXx3aW5kb3dzfHgpXFxiLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86MCg/Onh8WClbMC05YS1mQS1GXSt8WzAtOV0rKD86XFwuWzAtOV0rKT8pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJFxcKFtcXHdcXC46LV0rXFwpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24ubnNpc1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCRcXHcrL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL2AvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQubnNpc1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvYC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUubnNpc1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwkXFxcXC4vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuYmFjay5uc2lzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQubnNpc1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLm5zaXNcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcJFxcXFwuL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5uc2lzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLm5zaXNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5uc2lzXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8nLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5uc2lzXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCRcXFxcLi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5zaW5nbGUubnNpc1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50Lm5zaXNcIixcbiAgICAgICAgICAgICAgICBcImNvbW1lbnQubGluZS5uc2lzXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyg7fCMpKC4qJCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5uc2lzXCIsXG4gICAgICAgICAgICByZWdleDogL1xcL1xcKi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5uc2lzXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCpcXC8vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9jay5uc2lzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86IWluY2x1ZGV8IWluc2VydG1hY3JvKVxcYi9cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbk5TSVNIaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHtcbiAgICBjb21tZW50OiBcIlxcblxcdHRvZG86IC0gaGlnaGxpZ2h0IGZ1bmN0aW9uc1xcblxcdFwiLFxuICAgIGZpbGVUeXBlczogW1wibnNpXCIsIFwibnNoXCJdLFxuICAgIG5hbWU6IFwiTlNJU1wiLFxuICAgIHNjb3BlTmFtZTogXCJzb3VyY2UubnNpc1wiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhOU0lTSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTlNJU0hpZ2hsaWdodFJ1bGVzID0gTlNJU0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9