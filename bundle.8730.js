"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8730],{

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.c = DocCommentHighlightRules;


/***/ }),

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
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

/***/ 63654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var FoldMode = exports.Z = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {
    /** 
     * Inheriting cstyle folding because it handles the region comment folding 
     * and special block comment folding appropriately.
     * 
     * Cstyle's getCommentRegionBlock() contains the sql comment characters '--' for end region block.
     */
    
    this.foldingStartMarker = /(\bCASE\b|\bBEGIN\b)|^\s*(\/\*)/i;
    // this.foldingStopMarker = /(\bEND\b)|^[\s\*]*(\*\/)/i;
    this.startRegionRe = /^\s*(\/\*|--)#?region\b/;
    
    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
    
        if (this.startRegionRe.test(line)) return this.getCommentRegionBlock(session, line, row);
    
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;
            if (match[1]) return this.getBeginEndBlock(session, row, i, match[1]);
    
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                }
                else if (foldStyle != "all") range = null;
            }
    
            return range;
        }
    
        if (foldStyle === "markbegin") return;
        //TODO: add support for end folding markers
        return;
    };
    
    /**
     * @returns {Range} folding block for sequence that starts with 'CASE' or 'BEGIN' and ends with 'END'
     * @param {string} matchSequence - the sequence of charaters that started the fold widget, which should remain visible when the fold widget is folded
     */
    this.getBeginEndBlock = function(session, row, column, matchSequence) {
        var start = {
            row: row,
            column: column + matchSequence.length
        };
        var maxRow = session.getLength();
        var line;
    
        var depth = 1;
        var re = /(\bCASE\b|\bBEGIN\b)|(\bEND\b)/i;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth++;
            else depth--;
    
            if (!depth) break;
        }
        var endRow = row;
        if (endRow > start.row) {
            return new Range(start.row, start.column, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 63612:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var SqlServerHighlightRules = (__webpack_require__(12593)/* .SqlHighlightRules */ .Q);
var SqlServerFoldMode = (__webpack_require__(63654)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = SqlServerHighlightRules;
    this.foldingRules = new SqlServerFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = {start: "/*", end: "*/"};
    
    /**
     * Override keyword completions using list created in highlight rules
     */
    this.getCompletions = function(state, session, pos, prefix) {
        return session.$mode.$highlightRules.completions;
    };
    
    this.$id = "ace/mode/sqlserver";
    this.snippetFileId = "ace/snippets/sqlserver";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 12593:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var SqlServerHighlightRules = function() {
    /**
     * Transact-SQL Syntax Conventions: https://msdn.microsoft.com/en-us/library/ms177563.aspx
     * Goal: make this imitate SSMS (SQL Server Managment Studio)
     */

    // https://msdn.microsoft.com/en-us/library/ms189773.aspx
    var logicalOperators = "ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|SOME";
    logicalOperators += "|NULL|IS|APPLY|INNER|OUTER|LEFT|RIGHT|JOIN|CROSS"; //SSMS colors these gray too
    //note: manually removed LEFT and RIGHT from built in functions below to color it same way SSMS does
    

    var builtinFunctions = (
        /* https://msdn.microsoft.com/en-us/library/ms187957.aspx */
        "OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|" +
        /* https://msdn.microsoft.com/en-us/library/ms173454.aspx */
        "AVG|CHECKSUM_AGG|COUNT|COUNT_BIG|GROUPING|GROUPING_ID|MAX|MIN|STDEV|STDEVP|SUM|VAR|VARP|" +
        /* https://msdn.microsoft.com/en-us/library/ms189798.aspx */
        "DENSE_RANK|NTILE|RANK|ROW_NUMBER" +
        /* https://msdn.microsoft.com/en-us/library/ms173823.aspx */
        "@@DATEFIRST|@@DBTS|@@LANGID|@@LANGUAGE|@@LOCK_TIMEOUT|@@MAX_CONNECTIONS|@@MAX_PRECISION|@@NESTLEVEL|@@OPTIONS|@@REMSERVER|@@SERVERNAME|@@SERVICENAME|@@SPID|@@TEXTSIZE|@@VERSION|" +
        /* https://msdn.microsoft.com/en-us/library/hh231076.aspx */
        "CAST|CONVERT|PARSE|TRY_CAST|TRY_CONVERT|TRY_PARSE" +
        /* https://msdn.microsoft.com/en-us/library/ms186285.aspx */
        "@@CURSOR_ROWS|@@FETCH_STATUS|CURSOR_STATUS|" +
        /* https://msdn.microsoft.com/en-us/library/ms186724.aspx */
        "@@DATEFIRST|@@LANGUAGE|CURRENT_TIMESTAMP|DATEADD|DATEDIFF|DATEFROMPARTS|DATENAME|DATEPART|DATETIME2FROMPARTS|DATETIMEFROMPARTS|DATETIMEOFFSETFROMPARTS|DAY|EOMONTH|GETDATE|GETUTCDATE|ISDATE|MONTH|SET DATEFIRST|SET DATEFORMAT|SET LANGUAGE|SMALLDATETIMEFROMPARTS|SP_HELPLANGUAGE|SWITCHOFFSET|SYSDATETIME|SYSDATETIMEOFFSET|SYSUTCDATETIME|TIMEFROMPARTS|TODATETIMEOFFSET|YEAR|DATETRUNC|" +
        /* https://msdn.microsoft.com/en-us/library/hh213226.aspx */
        "CHOOSE|IIF|" +
        /* https://msdn.microsoft.com/en-us/library/ms177516.aspx */
        "ABS|ACOS|ASIN|ATAN|ATN2|CEILING|COS|COT|DEGREES|EXP|FLOOR|LOG|LOG10|PI|POWER|RADIANS|RAND|ROUND|SIGN|SIN|SQRT|SQUARE|TAN|" +
        /* https://msdn.microsoft.com/en-us/library/ms187812.aspx */
        "@@PROCID|APPLOCK_MODE|APPLOCK_TEST|APP_NAME|ASSEMBLYPROPERTY|COLUMNPROPERTY|COL_LENGTH|COL_NAME|DATABASEPROPERTYEX|DATABASE_PRINCIPAL_ID|DB_ID|DB_NAME|FILEGROUPPROPERTY|FILEGROUP_ID|FILEGROUP_NAME|FILEPROPERTY|FILE_ID|FILE_IDEX|FILE_NAME|FULLTEXTCATALOGPROPERTY|FULLTEXTSERVICEPROPERTY|INDEXKEY_PROPERTY|INDEXPROPERTY|INDEX_COL|OBJECTPROPERTY|OBJECTPROPERTYEX|OBJECT_DEFINITION|OBJECT_ID|OBJECT_NAME|OBJECT_SCHEMA_NAME|ORIGINAL_DB_NAME|PARSENAME|SCHEMA_ID|SCHEMA_NAME|SCOPE_IDENTITY|SERVERPROPERTY|STATS_DATE|TYPEPROPERTY|TYPE_ID|TYPE_NAME|" +
        /* https://msdn.microsoft.com/en-us/library/ms186236.aspx */
        "CERTENCODED|CERTPRIVATEKEY|CURRENT_USER|DATABASE_PRINCIPAL_ID|HAS_PERMS_BY_NAME|IS_MEMBER|IS_ROLEMEMBER|IS_SRVROLEMEMBER|ORIGINAL_LOGIN|PERMISSIONS|PWDCOMPARE|PWDENCRYPT|SCHEMA_ID|SCHEMA_NAME|SESSION_USER|SUSER_ID|SUSER_NAME|SUSER_SID|SUSER_SNAME|SYS.FN_BUILTIN_PERMISSIONS|SYS.FN_GET_AUDIT_FILE|SYS.FN_MY_PERMISSIONS|SYSTEM_USER|USER_ID|USER_NAME|" +
        /* https://msdn.microsoft.com/en-us/library/ms181984.aspx */
        "ASCII|CHAR|CHARINDEX|CONCAT|DIFFERENCE|FORMAT|LEN|LOWER|LTRIM|NCHAR|PATINDEX|QUOTENAME|REPLACE|REPLICATE|REVERSE|RTRIM|SOUNDEX|SPACE|STR|STUFF|SUBSTRING|UNICODE|UPPER|" +
        /* https://msdn.microsoft.com/en-us/library/ms187786.aspx */
        "$PARTITION|@@ERROR|@@IDENTITY|@@PACK_RECEIVED|@@ROWCOUNT|@@TRANCOUNT|BINARY_CHECKSUM|CHECKSUM|CONNECTIONPROPERTY|CONTEXT_INFO|CURRENT_REQUEST_ID|ERROR_LINE|ERROR_MESSAGE|ERROR_NUMBER|ERROR_PROCEDURE|ERROR_SEVERITY|ERROR_STATE|FORMATMESSAGE|GETANSINULL|GET_FILESTREAM_TRANSACTION_CONTEXT|HOST_ID|HOST_NAME|ISNULL|ISNUMERIC|MIN_ACTIVE_ROWVERSION|NEWID|NEWSEQUENTIALID|ROWCOUNT_BIG|XACT_STATE|" +
        /* https://msdn.microsoft.com/en-us/library/ms177520.aspx */
        "@@CONNECTIONS|@@CPU_BUSY|@@IDLE|@@IO_BUSY|@@PACKET_ERRORS|@@PACK_RECEIVED|@@PACK_SENT|@@TIMETICKS|@@TOTAL_ERRORS|@@TOTAL_READ|@@TOTAL_WRITE|FN_VIRTUALFILESTATS|" +
        /* https://msdn.microsoft.com/en-us/library/ms188353.aspx */
        "PATINDEX|TEXTPTR|TEXTVALID|" +
        /* logical */
        "GREATEST|LEAST|" +
        /* time series functions */
        "GENERATE_SERIES|DATE_BUCKET|" +
        /* JSON functions */
        "JSON_ARRAY|JSON_OBJECT|JSON_PATH_EXISTS|ISJSON|" +
        /* window functions */
        "FIRST_VALUE|LAST_VALUE|" +
        /* other */
        "COALESCE|NULLIF"
    );
    

    // https://msdn.microsoft.com/en-us/library/ms187752.aspx
    var dataTypes = ("BIGINT|BINARY|BIT|CHAR|CURSOR|DATE|DATETIME|DATETIME2|DATETIMEOFFSET|DECIMAL|FLOAT|HIERARCHYID|IMAGE|INTEGER|INT|MONEY|NCHAR|NTEXT|NUMERIC|NVARCHAR|REAL|SMALLDATETIME|SMALLINT|SMALLMONEY|SQL_VARIANT|TABLE|TEXT|TIME|TIMESTAMP|TINYINT|UNIQUEIDENTIFIER|VARBINARY|VARCHAR|XML");
    
    
    //https://msdn.microsoft.com/en-us/library/ms176007.aspx (these are lower case!)
    var builtInStoredProcedures = "sp_addextendedproc|sp_addextendedproperty|sp_addmessage|sp_addtype|sp_addumpdevice|sp_add_data_file_recover_suspect_db|sp_add_log_file_recover_suspect_db|sp_altermessage|sp_attach_db|sp_attach_single_file_db|sp_autostats|sp_bindefault|sp_bindrule|sp_bindsession|sp_certify_removable|sp_clean_db_file_free_space|sp_clean_db_free_space|sp_configure|sp_control_plan_guide|sp_createstats|sp_create_plan_guide|sp_create_plan_guide_from_handle|sp_create_removable|sp_cycle_errorlog|sp_datatype_info|sp_dbcmptlevel|sp_dbmmonitoraddmonitoring|sp_dbmmonitorchangealert|sp_dbmmonitorchangemonitoring|sp_dbmmonitordropalert|sp_dbmmonitordropmonitoring|sp_dbmmonitorhelpalert|sp_dbmmonitorhelpmonitoring|sp_dbmmonitorresults|sp_db_increased_partitions|sp_delete_backuphistory|sp_depends|sp_describe_first_result_set|sp_describe_undeclared_parameters|sp_detach_db|sp_dropdevice|sp_dropextendedproc|sp_dropextendedproperty|sp_dropmessage|sp_droptype|sp_execute|sp_executesql|sp_getapplock|sp_getbindtoken|sp_help|sp_helpconstraint|sp_helpdb|sp_helpdevice|sp_helpextendedproc|sp_helpfile|sp_helpfilegroup|sp_helpindex|sp_helplanguage|sp_helpserver|sp_helpsort|sp_helpstats|sp_helptext|sp_helptrigger|sp_indexoption|sp_invalidate_textptr|sp_lock|sp_monitor|sp_prepare|sp_prepexec|sp_prepexecrpc|sp_procoption|sp_recompile|sp_refreshview|sp_releaseapplock|sp_rename|sp_renamedb|sp_resetstatus|sp_sequence_get_range|sp_serveroption|sp_setnetname|sp_settriggerorder|sp_spaceused|sp_tableoption|sp_unbindefault|sp_unbindrule|sp_unprepare|sp_updateextendedproperty|sp_updatestats|sp_validname|sp_who|sys.sp_merge_xtp_checkpoint_files|sys.sp_xtp_bind_db_resource_pool|sys.sp_xtp_checkpoint_force_garbage_collection|sys.sp_xtp_control_proc_exec_stats|sys.sp_xtp_control_query_exec_stats|sys.sp_xtp_unbind_db_resource_pool";
    
    
    // https://msdn.microsoft.com/en-us/library/ms189822.aspx
    var keywords = "ABSOLUTE|ACTION|ADA|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASENSITIVE|ASSERTION|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BACKUP|BEFORE|BEGIN|BETWEEN|BIT_LENGTH|BLOB|BOOLEAN|BOTH|BREADTH|BREAK|BROWSE|BULK|BY|CALL|CALLED|CARDINALITY|CASCADE|CASCADED|CASE|CATALOG|CHARACTER|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CHECKPOINT|CLASS|CLOB|CLOSE|CLUSTERED|COALESCE|COLLATE|COLLATION|COLLECT|COLUMN|COMMIT|COMPLETION|COMPUTE|CONDITION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONSTRUCTOR|CONTAINS|CONTAINSTABLE|CONTINUE|CORR|CORRESPONDING|COVAR_POP|COVAR_SAMP|CREATE|CROSS|CUBE|CUME_DIST|CURRENT|CURRENT_CATALOG|CURRENT_DATE|CURRENT_DEFAULT_TRANSFORM_GROUP|CURRENT_PATH|CURRENT_ROLE|CURRENT_SCHEMA|CURRENT_TIME|CURRENT_TRANSFORM_GROUP_FOR_TYPE|CYCLE|DATA|DATABASE|DBCC|DEALLOCATE|DEC|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DENY|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DIAGNOSTICS|DICTIONARY|DISCONNECT|DISK|DISTINCT|DISTRIBUTED|DOMAIN|DOUBLE|DROP|DUMP|DYNAMIC|EACH|ELEMENT|ELSE|END|END-EXEC|EQUALS|ERRLVL|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXIT|EXTERNAL|EXTRACT|FETCH|FILE|FILLFACTOR|FILTER|FIRST|FOR|FOREIGN|FORTRAN|FOUND|FREE|FREETEXT|FREETEXTTABLE|FROM|FULL|FULLTEXTTABLE|FUNCTION|FUSION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|HOLD|HOLDLOCK|HOST|HOUR|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IGNORE|IMMEDIATE|IN|INCLUDE|INDEX|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INTEGER|INTERSECT|INTERSECTION|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|KILL|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LESS|LEVEL|LIKE|LIKE_REGEX|LIMIT|LINENO|LN|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MEMBER|MERGE|METHOD|MINUTE|MOD|MODIFIES|MODIFY|MODULE|MULTISET|NAMES|NATIONAL|NATURAL|NCLOB|NEW|NEXT|NO|NOCHECK|NONCLUSTERED|NONE|NORMALIZE|NOT|NULL|NULLIF|OBJECT|OCCURRENCES_REGEX|OCTET_LENGTH|OF|OFF|OFFSETS|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|OVER|OVERLAPS|OVERLAY|PAD|PARAMETER|PARAMETERS|PARTIAL|PARTITION|PASCAL|PATH|PERCENT|PERCENTILE_CONT|PERCENTILE_DISC|PERCENT_RANK|PIVOT|PLAN|POSITION|POSITION_REGEX|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRINT|PRIOR|PRIVILEGES|PROC|PROCEDURE|PUBLIC|RAISERROR|RANGE|READ|READS|READTEXT|RECONFIGURE|RECURSIVE|REF|REFERENCES|REFERENCING|REGR_AVGX|REGR_AVGY|REGR_COUNT|REGR_INTERCEPT|REGR_R2|REGR_SLOPE|REGR_SXX|REGR_SXY|REGR_SYY|RELATIVE|RELEASE|REPLICATION|RESTORE|RESTRICT|RESULT|RETURN|RETURNS|REVERT|REVOKE|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWCOUNT|ROWGUIDCOL|ROWS|RULE|SAVE|SAVEPOINT|SCHEMA|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SECURITYAUDIT|SELECT|SEMANTICKEYPHRASETABLE|SEMANTICSIMILARITYDETAILSTABLE|SEMANTICSIMILARITYTABLE|SENSITIVE|SEQUENCE|SESSION|SET|SETS|SETUSER|SHUTDOWN|SIMILAR|SIZE|SOME|SPECIFIC|SPECIFICTYPE|SQL|SQLCA|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STATISTICS|STDDEV_POP|STDDEV_SAMP|STRUCTURE|SUBMULTISET|SUBSTRING_REGEX|STRING_SPLIT|SYMMETRIC|SYSTEM|TABLESAMPLE|TEMPORARY|TERMINATE|TEXTSIZE|THAN|THEN|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TOP|TRAILING|TRAN|TRANSACTION|TRANSLATE|TRANSLATE_REGEX|TRANSLATION|TREAT|TRIGGER|TRIM|TRUNCATE|TSEQUAL|UESCAPE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARIABLE|VARYING|VAR_POP|VAR_SAMP|VIEW|WAITFOR|WHEN|WHENEVER|WHERE|WHILE|WIDTH_BUCKET|WINDOW|WITH|WITHIN|WITHIN GROUP|WITHOUT|WORK|WRITE|WRITETEXT|XMLAGG|XMLATTRIBUTES|XMLBINARY|XMLCAST|XMLCOMMENT|XMLCONCAT|XMLDOCUMENT|XMLELEMENT|XMLEXISTS|XMLFOREST|XMLITERATE|XMLNAMESPACES|XMLPARSE|XMLPI|XMLQUERY|XMLSERIALIZE|XMLTABLE|XMLTEXT|XMLVALIDATE|ZONE";
    
    
    // Microsoft's keyword list is missing a lot of things that are located on various other pages
    // https://msdn.microsoft.com/en-us/library/ms187373.aspx, https://msdn.microsoft.com/en-us/library/ms181714.aspx
    keywords += "|KEEPIDENTITY|KEEPDEFAULTS|IGNORE_CONSTRAINTS|IGNORE_TRIGGERS|XLOCK|FORCESCAN|FORCESEEK|HOLDLOCK|NOLOCK|NOWAIT|PAGLOCK|READCOMMITTED|READCOMMITTEDLOCK|READPAST|READUNCOMMITTED|REPEATABLEREAD|ROWLOCK|SERIALIZABLE|SNAPSHOT|SPATIAL_WINDOW_MAX_CELLS|TABLOCK|TABLOCKX|UPDLOCK|XLOCK|IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX|EXPAND|VIEWS|FAST|FORCE|KEEP|KEEPFIXED|MAXDOP|MAXRECURSION|OPTIMIZE|PARAMETERIZATION|SIMPLE|FORCED|RECOMPILE|ROBUST|PLAN|SPATIAL_WINDOW_MAX_CELLS|NOEXPAND|HINT";
    // https://msdn.microsoft.com/en-us/library/ms173815.aspx
    keywords += "|LOOP|HASH|MERGE|REMOTE";
    // https://msdn.microsoft.com/en-us/library/ms175976.aspx
    keywords += "|TRY|CATCH|THROW";
    // highlighted words in SSMS that I'm not even sure where they come from
    keywords += "|TYPE";
    
    
    //remove specific built in types from keyword list
    keywords = keywords.split('|');
    keywords = keywords.filter(function(value, index, self) {
        return logicalOperators.split('|').indexOf(value) === -1 && builtinFunctions.split('|').indexOf(value) === -1 && dataTypes.split('|').indexOf(value) === -1;
    });
    keywords = keywords.sort().join('|');
    
    
    var keywordMapper = this.createKeywordMapper({
        "constant.language": logicalOperators,
        "storage.type": dataTypes,
        "support.function": builtinFunctions,
        "support.storedprocedure": builtInStoredProcedures,
        "keyword": keywords
    }, "identifier", true);
    
    
    //https://msdn.microsoft.com/en-us/library/ms190356.aspx
    var setStatements = "SET ANSI_DEFAULTS|SET ANSI_NULLS|SET ANSI_NULL_DFLT_OFF|SET ANSI_NULL_DFLT_ON|SET ANSI_PADDING|SET ANSI_WARNINGS|SET ARITHABORT|SET ARITHIGNORE|SET CONCAT_NULL_YIELDS_NULL|SET CURSOR_CLOSE_ON_COMMIT|SET DATEFIRST|SET DATEFORMAT|SET DEADLOCK_PRIORITY|SET FIPS_FLAGGER|SET FMTONLY|SET FORCEPLAN|SET IDENTITY_INSERT|SET IMPLICIT_TRANSACTIONS|SET LANGUAGE|SET LOCK_TIMEOUT|SET NOCOUNT|SET NOEXEC|SET NUMERIC_ROUNDABORT|SET OFFSETS|SET PARSEONLY|SET QUERY_GOVERNOR_COST_LIMIT|SET QUOTED_IDENTIFIER|SET REMOTE_PROC_TRANSACTIONS|SET ROWCOUNT|SET SHOWPLAN_ALL|SET SHOWPLAN_TEXT|SET SHOWPLAN_XML|SET STATISTICS IO|SET STATISTICS PROFILE|SET STATISTICS TIME|SET STATISTICS XML|SET TEXTSIZE|SET XACT_ABORT".split('|');
    var isolationLevels = "READ UNCOMMITTED|READ COMMITTED|REPEATABLE READ|SNAPSHOP|SERIALIZABLE".split('|');
    for (var i = 0; i < isolationLevels.length; i++) {
        setStatements.push('SET TRANSACTION ISOLATION LEVEL ' + isolationLevels[i]);
    }
    
    
    this.$rules = {
        start: [{
            token: "string.start",
            regex: "'",
            next: [{
                token: "constant.language.escape",
                regex: /''/
            }, {
                token: "string.end",
                next: "start",
                regex: "'"
            }, {
                defaultToken: "string"
            }]
        },
        DocCommentHighlightRules.getStartRule("doc-start"), {
            token: "comment",
            regex: "--.*$"
        }, {
            token: "comment",
            start: "/\\*",
            end: "\\*/"
        }, {
            token: "constant.numeric", // float
            regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token: keywordMapper,
            regex: "@{0,2}[a-zA-Z_$][a-zA-Z0-9_$]*\\b(?!])" //up to 2 @symbols for some built in functions
        }, {
            token: "constant.class",
            regex: "@@?[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            //https://msdn.microsoft.com/en-us/library/ms174986.aspx
            token: "keyword.operator",
            regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=|\\*"
        }, {
            token: "paren.lparen",
            regex: "[\\(]"
        }, {
            token: "paren.rparen",
            regex: "[\\)]"
        }, {
            token: "punctuation",
            regex: ",|;"
        }, {
            token: "text",
            regex: "\\s+"
        }],
        comment: [
        DocCommentHighlightRules.getTagRule(), {
            token: "comment",
            regex: "\\*\\/",
            next: "start"
        }, {
            defaultToken: "comment",
            caseInsensitive: true
        }]
    };
    
    //add each set statment as regex at top of rules so that they are processed first because they require multiple words
    //note: this makes the statements not match if they are not upper case.. which is not ideal but I don't know of an easy way to fix this
    for (var i = 0; i < setStatements.length; i++) {
        this.$rules.start.unshift({
            token: "set.statement",
            regex: setStatements[i]
        });
    }
    
    this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
    this.normalizeRules();
    
    
    //prepare custom keyword completions used by mode to override default completor
    //this allows for custom 'meta' and proper case of completions
    var completions = [];
    var addCompletions = function(arr, meta) {
        arr.forEach(function(v) {
            completions.push({
                name: v,
                value: v,
                score: 0,
                meta: meta
            });
        });
    };
    addCompletions(builtInStoredProcedures.split('|'), 'procedure');
    addCompletions(logicalOperators.split('|'), 'operator');
    addCompletions(builtinFunctions.split('|'), 'function');
    addCompletions(dataTypes.split('|'), 'type');
    addCompletions(setStatements, 'statement');
    addCompletions(keywords.split('|'), 'keyword');
    
    this.completions = completions;
};

oop.inherits(SqlServerHighlightRules, TextHighlightRules);

exports.Q = SqlServerHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvc3Fsc2VydmVyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc3Fsc2VydmVyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc3Fsc2VydmVyX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2MuYm9keVwiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4OiAvXFwvXFwqXFwqKD8hXFwvKS8sXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xuXG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICAvKiogXG4gICAgICogSW5oZXJpdGluZyBjc3R5bGUgZm9sZGluZyBiZWNhdXNlIGl0IGhhbmRsZXMgdGhlIHJlZ2lvbiBjb21tZW50IGZvbGRpbmcgXG4gICAgICogYW5kIHNwZWNpYWwgYmxvY2sgY29tbWVudCBmb2xkaW5nIGFwcHJvcHJpYXRlbHkuXG4gICAgICogXG4gICAgICogQ3N0eWxlJ3MgZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKCkgY29udGFpbnMgdGhlIHNxbCBjb21tZW50IGNoYXJhY3RlcnMgJy0tJyBmb3IgZW5kIHJlZ2lvbiBibG9jay5cbiAgICAgKi9cbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oXFxiQ0FTRVxcYnxcXGJCRUdJTlxcYil8XlxccyooXFwvXFwqKS9pO1xuICAgIC8vIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvKFxcYkVORFxcYil8XltcXHNcXCpdKihcXCpcXC8pL2k7XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnwtLSkjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKSByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkgcmV0dXJuIHRoaXMuZ2V0QmVnaW5FbmRCbG9jayhzZXNzaW9uLCByb3csIGksIG1hdGNoWzFdKTtcbiAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKSByZXR1cm47XG4gICAgICAgIC8vVE9ETzogYWRkIHN1cHBvcnQgZm9yIGVuZCBmb2xkaW5nIG1hcmtlcnNcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1JhbmdlfSBmb2xkaW5nIGJsb2NrIGZvciBzZXF1ZW5jZSB0aGF0IHN0YXJ0cyB3aXRoICdDQVNFJyBvciAnQkVHSU4nIGFuZCBlbmRzIHdpdGggJ0VORCdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hTZXF1ZW5jZSAtIHRoZSBzZXF1ZW5jZSBvZiBjaGFyYXRlcnMgdGhhdCBzdGFydGVkIHRoZSBmb2xkIHdpZGdldCwgd2hpY2ggc2hvdWxkIHJlbWFpbiB2aXNpYmxlIHdoZW4gdGhlIGZvbGQgd2lkZ2V0IGlzIGZvbGRlZFxuICAgICAqL1xuICAgIHRoaXMuZ2V0QmVnaW5FbmRCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uLCBtYXRjaFNlcXVlbmNlKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHtcbiAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4gKyBtYXRjaFNlcXVlbmNlLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIGxpbmU7XG4gICAgXG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHZhciByZSA9IC8oXFxiQ0FTRVxcYnxcXGJCRUdJTlxcYil8KFxcYkVORFxcYikvaTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoKys7XG4gICAgICAgICAgICBlbHNlIGRlcHRoLS07XG4gICAgXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnQucm93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0LnJvdywgc3RhcnQuY29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU3FsU2VydmVySGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zcWxzZXJ2ZXJfaGlnaGxpZ2h0X3J1bGVzXCIpLlNxbEhpZ2hsaWdodFJ1bGVzO1xudmFyIFNxbFNlcnZlckZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9zcWxzZXJ2ZXJcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNxbFNlcnZlckhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IFNxbFNlcnZlckZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCItLVwiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBrZXl3b3JkIGNvbXBsZXRpb25zIHVzaW5nIGxpc3QgY3JlYXRlZCBpbiBoaWdobGlnaHQgcnVsZXNcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uLiRtb2RlLiRoaWdobGlnaHRSdWxlcy5jb21wbGV0aW9ucztcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zcWxzZXJ2ZXJcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9zcWxzZXJ2ZXJcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFNxbFNlcnZlckhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogVHJhbnNhY3QtU1FMIFN5bnRheCBDb252ZW50aW9uczogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3NzU2My5hc3B4XG4gICAgICogR29hbDogbWFrZSB0aGlzIGltaXRhdGUgU1NNUyAoU1FMIFNlcnZlciBNYW5hZ21lbnQgU3R1ZGlvKVxuICAgICAqL1xuXG4gICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4OTc3My5hc3B4XG4gICAgdmFyIGxvZ2ljYWxPcGVyYXRvcnMgPSBcIkFMTHxBTkR8QU5ZfEJFVFdFRU58RVhJU1RTfElOfExJS0V8Tk9UfE9SfFNPTUVcIjtcbiAgICBsb2dpY2FsT3BlcmF0b3JzICs9IFwifE5VTEx8SVN8QVBQTFl8SU5ORVJ8T1VURVJ8TEVGVHxSSUdIVHxKT0lOfENST1NTXCI7IC8vU1NNUyBjb2xvcnMgdGhlc2UgZ3JheSB0b29cbiAgICAvL25vdGU6IG1hbnVhbGx5IHJlbW92ZWQgTEVGVCBhbmQgUklHSFQgZnJvbSBidWlsdCBpbiBmdW5jdGlvbnMgYmVsb3cgdG8gY29sb3IgaXQgc2FtZSB3YXkgU1NNUyBkb2VzXG4gICAgXG5cbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4Nzk1Ny5hc3B4ICovXG4gICAgICAgIFwiT1BFTkRBVEFTT1VSQ0V8T1BFTlFVRVJZfE9QRU5ST1dTRVR8T1BFTlhNTHxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzM0NTQuYXNweCAqL1xuICAgICAgICBcIkFWR3xDSEVDS1NVTV9BR0d8Q09VTlR8Q09VTlRfQklHfEdST1VQSU5HfEdST1VQSU5HX0lEfE1BWHxNSU58U1RERVZ8U1RERVZQfFNVTXxWQVJ8VkFSUHxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODk3OTguYXNweCAqL1xuICAgICAgICBcIkRFTlNFX1JBTkt8TlRJTEV8UkFOS3xST1dfTlVNQkVSXCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTczODIzLmFzcHggKi9cbiAgICAgICAgXCJAQERBVEVGSVJTVHxAQERCVFN8QEBMQU5HSUR8QEBMQU5HVUFHRXxAQExPQ0tfVElNRU9VVHxAQE1BWF9DT05ORUNUSU9OU3xAQE1BWF9QUkVDSVNJT058QEBORVNUTEVWRUx8QEBPUFRJT05TfEBAUkVNU0VSVkVSfEBAU0VSVkVSTkFNRXxAQFNFUlZJQ0VOQU1FfEBAU1BJRHxAQFRFWFRTSVpFfEBAVkVSU0lPTnxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGgyMzEwNzYuYXNweCAqL1xuICAgICAgICBcIkNBU1R8Q09OVkVSVHxQQVJTRXxUUllfQ0FTVHxUUllfQ09OVkVSVHxUUllfUEFSU0VcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODYyODUuYXNweCAqL1xuICAgICAgICBcIkBAQ1VSU09SX1JPV1N8QEBGRVRDSF9TVEFUVVN8Q1VSU09SX1NUQVRVU3xcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODY3MjQuYXNweCAqL1xuICAgICAgICBcIkBAREFURUZJUlNUfEBATEFOR1VBR0V8Q1VSUkVOVF9USU1FU1RBTVB8REFURUFERHxEQVRFRElGRnxEQVRFRlJPTVBBUlRTfERBVEVOQU1FfERBVEVQQVJUfERBVEVUSU1FMkZST01QQVJUU3xEQVRFVElNRUZST01QQVJUU3xEQVRFVElNRU9GRlNFVEZST01QQVJUU3xEQVl8RU9NT05USHxHRVREQVRFfEdFVFVUQ0RBVEV8SVNEQVRFfE1PTlRIfFNFVCBEQVRFRklSU1R8U0VUIERBVEVGT1JNQVR8U0VUIExBTkdVQUdFfFNNQUxMREFURVRJTUVGUk9NUEFSVFN8U1BfSEVMUExBTkdVQUdFfFNXSVRDSE9GRlNFVHxTWVNEQVRFVElNRXxTWVNEQVRFVElNRU9GRlNFVHxTWVNVVENEQVRFVElNRXxUSU1FRlJPTVBBUlRTfFRPREFURVRJTUVPRkZTRVR8WUVBUnxEQVRFVFJVTkN8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2hoMjEzMjI2LmFzcHggKi9cbiAgICAgICAgXCJDSE9PU0V8SUlGfFwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3NzUxNi5hc3B4ICovXG4gICAgICAgIFwiQUJTfEFDT1N8QVNJTnxBVEFOfEFUTjJ8Q0VJTElOR3xDT1N8Q09UfERFR1JFRVN8RVhQfEZMT09SfExPR3xMT0cxMHxQSXxQT1dFUnxSQURJQU5TfFJBTkR8Uk9VTkR8U0lHTnxTSU58U1FSVHxTUVVBUkV8VEFOfFwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4NzgxMi5hc3B4ICovXG4gICAgICAgIFwiQEBQUk9DSUR8QVBQTE9DS19NT0RFfEFQUExPQ0tfVEVTVHxBUFBfTkFNRXxBU1NFTUJMWVBST1BFUlRZfENPTFVNTlBST1BFUlRZfENPTF9MRU5HVEh8Q09MX05BTUV8REFUQUJBU0VQUk9QRVJUWUVYfERBVEFCQVNFX1BSSU5DSVBBTF9JRHxEQl9JRHxEQl9OQU1FfEZJTEVHUk9VUFBST1BFUlRZfEZJTEVHUk9VUF9JRHxGSUxFR1JPVVBfTkFNRXxGSUxFUFJPUEVSVFl8RklMRV9JRHxGSUxFX0lERVh8RklMRV9OQU1FfEZVTExURVhUQ0FUQUxPR1BST1BFUlRZfEZVTExURVhUU0VSVklDRVBST1BFUlRZfElOREVYS0VZX1BST1BFUlRZfElOREVYUFJPUEVSVFl8SU5ERVhfQ09MfE9CSkVDVFBST1BFUlRZfE9CSkVDVFBST1BFUlRZRVh8T0JKRUNUX0RFRklOSVRJT058T0JKRUNUX0lEfE9CSkVDVF9OQU1FfE9CSkVDVF9TQ0hFTUFfTkFNRXxPUklHSU5BTF9EQl9OQU1FfFBBUlNFTkFNRXxTQ0hFTUFfSUR8U0NIRU1BX05BTUV8U0NPUEVfSURFTlRJVFl8U0VSVkVSUFJPUEVSVFl8U1RBVFNfREFURXxUWVBFUFJPUEVSVFl8VFlQRV9JRHxUWVBFX05BTUV8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg2MjM2LmFzcHggKi9cbiAgICAgICAgXCJDRVJURU5DT0RFRHxDRVJUUFJJVkFURUtFWXxDVVJSRU5UX1VTRVJ8REFUQUJBU0VfUFJJTkNJUEFMX0lEfEhBU19QRVJNU19CWV9OQU1FfElTX01FTUJFUnxJU19ST0xFTUVNQkVSfElTX1NSVlJPTEVNRU1CRVJ8T1JJR0lOQUxfTE9HSU58UEVSTUlTU0lPTlN8UFdEQ09NUEFSRXxQV0RFTkNSWVBUfFNDSEVNQV9JRHxTQ0hFTUFfTkFNRXxTRVNTSU9OX1VTRVJ8U1VTRVJfSUR8U1VTRVJfTkFNRXxTVVNFUl9TSUR8U1VTRVJfU05BTUV8U1lTLkZOX0JVSUxUSU5fUEVSTUlTU0lPTlN8U1lTLkZOX0dFVF9BVURJVF9GSUxFfFNZUy5GTl9NWV9QRVJNSVNTSU9OU3xTWVNURU1fVVNFUnxVU0VSX0lEfFVTRVJfTkFNRXxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODE5ODQuYXNweCAqL1xuICAgICAgICBcIkFTQ0lJfENIQVJ8Q0hBUklOREVYfENPTkNBVHxESUZGRVJFTkNFfEZPUk1BVHxMRU58TE9XRVJ8TFRSSU18TkNIQVJ8UEFUSU5ERVh8UVVPVEVOQU1FfFJFUExBQ0V8UkVQTElDQVRFfFJFVkVSU0V8UlRSSU18U09VTkRFWHxTUEFDRXxTVFJ8U1RVRkZ8U1VCU1RSSU5HfFVOSUNPREV8VVBQRVJ8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg3Nzg2LmFzcHggKi9cbiAgICAgICAgXCIkUEFSVElUSU9OfEBARVJST1J8QEBJREVOVElUWXxAQFBBQ0tfUkVDRUlWRUR8QEBST1dDT1VOVHxAQFRSQU5DT1VOVHxCSU5BUllfQ0hFQ0tTVU18Q0hFQ0tTVU18Q09OTkVDVElPTlBST1BFUlRZfENPTlRFWFRfSU5GT3xDVVJSRU5UX1JFUVVFU1RfSUR8RVJST1JfTElORXxFUlJPUl9NRVNTQUdFfEVSUk9SX05VTUJFUnxFUlJPUl9QUk9DRURVUkV8RVJST1JfU0VWRVJJVFl8RVJST1JfU1RBVEV8Rk9STUFUTUVTU0FHRXxHRVRBTlNJTlVMTHxHRVRfRklMRVNUUkVBTV9UUkFOU0FDVElPTl9DT05URVhUfEhPU1RfSUR8SE9TVF9OQU1FfElTTlVMTHxJU05VTUVSSUN8TUlOX0FDVElWRV9ST1dWRVJTSU9OfE5FV0lEfE5FV1NFUVVFTlRJQUxJRHxST1dDT1VOVF9CSUd8WEFDVF9TVEFURXxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzc1MjAuYXNweCAqL1xuICAgICAgICBcIkBAQ09OTkVDVElPTlN8QEBDUFVfQlVTWXxAQElETEV8QEBJT19CVVNZfEBAUEFDS0VUX0VSUk9SU3xAQFBBQ0tfUkVDRUlWRUR8QEBQQUNLX1NFTlR8QEBUSU1FVElDS1N8QEBUT1RBTF9FUlJPUlN8QEBUT1RBTF9SRUFEfEBAVE9UQUxfV1JJVEV8Rk5fVklSVFVBTEZJTEVTVEFUU3xcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODgzNTMuYXNweCAqL1xuICAgICAgICBcIlBBVElOREVYfFRFWFRQVFJ8VEVYVFZBTElEfFwiICtcbiAgICAgICAgLyogbG9naWNhbCAqL1xuICAgICAgICBcIkdSRUFURVNUfExFQVNUfFwiICtcbiAgICAgICAgLyogdGltZSBzZXJpZXMgZnVuY3Rpb25zICovXG4gICAgICAgIFwiR0VORVJBVEVfU0VSSUVTfERBVEVfQlVDS0VUfFwiICtcbiAgICAgICAgLyogSlNPTiBmdW5jdGlvbnMgKi9cbiAgICAgICAgXCJKU09OX0FSUkFZfEpTT05fT0JKRUNUfEpTT05fUEFUSF9FWElTVFN8SVNKU09OfFwiICtcbiAgICAgICAgLyogd2luZG93IGZ1bmN0aW9ucyAqL1xuICAgICAgICBcIkZJUlNUX1ZBTFVFfExBU1RfVkFMVUV8XCIgK1xuICAgICAgICAvKiBvdGhlciAqL1xuICAgICAgICBcIkNPQUxFU0NFfE5VTExJRlwiXG4gICAgKTtcbiAgICBcblxuICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODc3NTIuYXNweFxuICAgIHZhciBkYXRhVHlwZXMgPSAoXCJCSUdJTlR8QklOQVJZfEJJVHxDSEFSfENVUlNPUnxEQVRFfERBVEVUSU1FfERBVEVUSU1FMnxEQVRFVElNRU9GRlNFVHxERUNJTUFMfEZMT0FUfEhJRVJBUkNIWUlEfElNQUdFfElOVEVHRVJ8SU5UfE1PTkVZfE5DSEFSfE5URVhUfE5VTUVSSUN8TlZBUkNIQVJ8UkVBTHxTTUFMTERBVEVUSU1FfFNNQUxMSU5UfFNNQUxMTU9ORVl8U1FMX1ZBUklBTlR8VEFCTEV8VEVYVHxUSU1FfFRJTUVTVEFNUHxUSU5ZSU5UfFVOSVFVRUlERU5USUZJRVJ8VkFSQklOQVJZfFZBUkNIQVJ8WE1MXCIpO1xuICAgIFxuICAgIFxuICAgIC8vaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3NjAwNy5hc3B4ICh0aGVzZSBhcmUgbG93ZXIgY2FzZSEpXG4gICAgdmFyIGJ1aWx0SW5TdG9yZWRQcm9jZWR1cmVzID0gXCJzcF9hZGRleHRlbmRlZHByb2N8c3BfYWRkZXh0ZW5kZWRwcm9wZXJ0eXxzcF9hZGRtZXNzYWdlfHNwX2FkZHR5cGV8c3BfYWRkdW1wZGV2aWNlfHNwX2FkZF9kYXRhX2ZpbGVfcmVjb3Zlcl9zdXNwZWN0X2RifHNwX2FkZF9sb2dfZmlsZV9yZWNvdmVyX3N1c3BlY3RfZGJ8c3BfYWx0ZXJtZXNzYWdlfHNwX2F0dGFjaF9kYnxzcF9hdHRhY2hfc2luZ2xlX2ZpbGVfZGJ8c3BfYXV0b3N0YXRzfHNwX2JpbmRlZmF1bHR8c3BfYmluZHJ1bGV8c3BfYmluZHNlc3Npb258c3BfY2VydGlmeV9yZW1vdmFibGV8c3BfY2xlYW5fZGJfZmlsZV9mcmVlX3NwYWNlfHNwX2NsZWFuX2RiX2ZyZWVfc3BhY2V8c3BfY29uZmlndXJlfHNwX2NvbnRyb2xfcGxhbl9ndWlkZXxzcF9jcmVhdGVzdGF0c3xzcF9jcmVhdGVfcGxhbl9ndWlkZXxzcF9jcmVhdGVfcGxhbl9ndWlkZV9mcm9tX2hhbmRsZXxzcF9jcmVhdGVfcmVtb3ZhYmxlfHNwX2N5Y2xlX2Vycm9ybG9nfHNwX2RhdGF0eXBlX2luZm98c3BfZGJjbXB0bGV2ZWx8c3BfZGJtbW9uaXRvcmFkZG1vbml0b3Jpbmd8c3BfZGJtbW9uaXRvcmNoYW5nZWFsZXJ0fHNwX2RibW1vbml0b3JjaGFuZ2Vtb25pdG9yaW5nfHNwX2RibW1vbml0b3Jkcm9wYWxlcnR8c3BfZGJtbW9uaXRvcmRyb3Btb25pdG9yaW5nfHNwX2RibW1vbml0b3JoZWxwYWxlcnR8c3BfZGJtbW9uaXRvcmhlbHBtb25pdG9yaW5nfHNwX2RibW1vbml0b3JyZXN1bHRzfHNwX2RiX2luY3JlYXNlZF9wYXJ0aXRpb25zfHNwX2RlbGV0ZV9iYWNrdXBoaXN0b3J5fHNwX2RlcGVuZHN8c3BfZGVzY3JpYmVfZmlyc3RfcmVzdWx0X3NldHxzcF9kZXNjcmliZV91bmRlY2xhcmVkX3BhcmFtZXRlcnN8c3BfZGV0YWNoX2RifHNwX2Ryb3BkZXZpY2V8c3BfZHJvcGV4dGVuZGVkcHJvY3xzcF9kcm9wZXh0ZW5kZWRwcm9wZXJ0eXxzcF9kcm9wbWVzc2FnZXxzcF9kcm9wdHlwZXxzcF9leGVjdXRlfHNwX2V4ZWN1dGVzcWx8c3BfZ2V0YXBwbG9ja3xzcF9nZXRiaW5kdG9rZW58c3BfaGVscHxzcF9oZWxwY29uc3RyYWludHxzcF9oZWxwZGJ8c3BfaGVscGRldmljZXxzcF9oZWxwZXh0ZW5kZWRwcm9jfHNwX2hlbHBmaWxlfHNwX2hlbHBmaWxlZ3JvdXB8c3BfaGVscGluZGV4fHNwX2hlbHBsYW5ndWFnZXxzcF9oZWxwc2VydmVyfHNwX2hlbHBzb3J0fHNwX2hlbHBzdGF0c3xzcF9oZWxwdGV4dHxzcF9oZWxwdHJpZ2dlcnxzcF9pbmRleG9wdGlvbnxzcF9pbnZhbGlkYXRlX3RleHRwdHJ8c3BfbG9ja3xzcF9tb25pdG9yfHNwX3ByZXBhcmV8c3BfcHJlcGV4ZWN8c3BfcHJlcGV4ZWNycGN8c3BfcHJvY29wdGlvbnxzcF9yZWNvbXBpbGV8c3BfcmVmcmVzaHZpZXd8c3BfcmVsZWFzZWFwcGxvY2t8c3BfcmVuYW1lfHNwX3JlbmFtZWRifHNwX3Jlc2V0c3RhdHVzfHNwX3NlcXVlbmNlX2dldF9yYW5nZXxzcF9zZXJ2ZXJvcHRpb258c3Bfc2V0bmV0bmFtZXxzcF9zZXR0cmlnZ2Vyb3JkZXJ8c3Bfc3BhY2V1c2VkfHNwX3RhYmxlb3B0aW9ufHNwX3VuYmluZGVmYXVsdHxzcF91bmJpbmRydWxlfHNwX3VucHJlcGFyZXxzcF91cGRhdGVleHRlbmRlZHByb3BlcnR5fHNwX3VwZGF0ZXN0YXRzfHNwX3ZhbGlkbmFtZXxzcF93aG98c3lzLnNwX21lcmdlX3h0cF9jaGVja3BvaW50X2ZpbGVzfHN5cy5zcF94dHBfYmluZF9kYl9yZXNvdXJjZV9wb29sfHN5cy5zcF94dHBfY2hlY2twb2ludF9mb3JjZV9nYXJiYWdlX2NvbGxlY3Rpb258c3lzLnNwX3h0cF9jb250cm9sX3Byb2NfZXhlY19zdGF0c3xzeXMuc3BfeHRwX2NvbnRyb2xfcXVlcnlfZXhlY19zdGF0c3xzeXMuc3BfeHRwX3VuYmluZF9kYl9yZXNvdXJjZV9wb29sXCI7XG4gICAgXG4gICAgXG4gICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4OTgyMi5hc3B4XG4gICAgdmFyIGtleXdvcmRzID0gXCJBQlNPTFVURXxBQ1RJT058QURBfEFERHxBRE1JTnxBRlRFUnxBR0dSRUdBVEV8QUxJQVN8QUxMfEFMTE9DQVRFfEFMVEVSfEFORHxBTll8QVJFfEFSUkFZfEFTfEFTQ3xBU0VOU0lUSVZFfEFTU0VSVElPTnxBU1lNTUVUUklDfEFUfEFUT01JQ3xBVVRIT1JJWkFUSU9OfEJBQ0tVUHxCRUZPUkV8QkVHSU58QkVUV0VFTnxCSVRfTEVOR1RIfEJMT0J8Qk9PTEVBTnxCT1RIfEJSRUFEVEh8QlJFQUt8QlJPV1NFfEJVTEt8Qll8Q0FMTHxDQUxMRUR8Q0FSRElOQUxJVFl8Q0FTQ0FERXxDQVNDQURFRHxDQVNFfENBVEFMT0d8Q0hBUkFDVEVSfENIQVJBQ1RFUl9MRU5HVEh8Q0hBUl9MRU5HVEh8Q0hFQ0t8Q0hFQ0tQT0lOVHxDTEFTU3xDTE9CfENMT1NFfENMVVNURVJFRHxDT0FMRVNDRXxDT0xMQVRFfENPTExBVElPTnxDT0xMRUNUfENPTFVNTnxDT01NSVR8Q09NUExFVElPTnxDT01QVVRFfENPTkRJVElPTnxDT05ORUNUfENPTk5FQ1RJT058Q09OU1RSQUlOVHxDT05TVFJBSU5UU3xDT05TVFJVQ1RPUnxDT05UQUlOU3xDT05UQUlOU1RBQkxFfENPTlRJTlVFfENPUlJ8Q09SUkVTUE9ORElOR3xDT1ZBUl9QT1B8Q09WQVJfU0FNUHxDUkVBVEV8Q1JPU1N8Q1VCRXxDVU1FX0RJU1R8Q1VSUkVOVHxDVVJSRU5UX0NBVEFMT0d8Q1VSUkVOVF9EQVRFfENVUlJFTlRfREVGQVVMVF9UUkFOU0ZPUk1fR1JPVVB8Q1VSUkVOVF9QQVRIfENVUlJFTlRfUk9MRXxDVVJSRU5UX1NDSEVNQXxDVVJSRU5UX1RJTUV8Q1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEV8Q1lDTEV8REFUQXxEQVRBQkFTRXxEQkNDfERFQUxMT0NBVEV8REVDfERFQ0xBUkV8REVGQVVMVHxERUZFUlJBQkxFfERFRkVSUkVEfERFTEVURXxERU5ZfERFUFRIfERFUkVGfERFU0N8REVTQ1JJQkV8REVTQ1JJUFRPUnxERVNUUk9ZfERFU1RSVUNUT1J8REVURVJNSU5JU1RJQ3xESUFHTk9TVElDU3xESUNUSU9OQVJZfERJU0NPTk5FQ1R8RElTS3xESVNUSU5DVHxESVNUUklCVVRFRHxET01BSU58RE9VQkxFfERST1B8RFVNUHxEWU5BTUlDfEVBQ0h8RUxFTUVOVHxFTFNFfEVORHxFTkQtRVhFQ3xFUVVBTFN8RVJSTFZMfEVTQ0FQRXxFVkVSWXxFWENFUFR8RVhDRVBUSU9OfEVYRUN8RVhFQ1VURXxFWElTVFN8RVhJVHxFWFRFUk5BTHxFWFRSQUNUfEZFVENIfEZJTEV8RklMTEZBQ1RPUnxGSUxURVJ8RklSU1R8Rk9SfEZPUkVJR058Rk9SVFJBTnxGT1VORHxGUkVFfEZSRUVURVhUfEZSRUVURVhUVEFCTEV8RlJPTXxGVUxMfEZVTExURVhUVEFCTEV8RlVOQ1RJT058RlVTSU9OfEdFTkVSQUx8R0VUfEdMT0JBTHxHT3xHT1RPfEdSQU5UfEdST1VQfEhBVklOR3xIT0xEfEhPTERMT0NLfEhPU1R8SE9VUnxJREVOVElUWXxJREVOVElUWUNPTHxJREVOVElUWV9JTlNFUlR8SUZ8SUdOT1JFfElNTUVESUFURXxJTnxJTkNMVURFfElOREVYfElORElDQVRPUnxJTklUSUFMSVpFfElOSVRJQUxMWXxJTk5FUnxJTk9VVHxJTlBVVHxJTlNFTlNJVElWRXxJTlNFUlR8SU5URUdFUnxJTlRFUlNFQ1R8SU5URVJTRUNUSU9OfElOVEVSVkFMfElOVE98SVN8SVNPTEFUSU9OfElURVJBVEV8Sk9JTnxLRVl8S0lMTHxMQU5HVUFHRXxMQVJHRXxMQVNUfExBVEVSQUx8TEVBRElOR3xMRVNTfExFVkVMfExJS0V8TElLRV9SRUdFWHxMSU1JVHxMSU5FTk98TE58TE9BRHxMT0NBTHxMT0NBTFRJTUV8TE9DQUxUSU1FU1RBTVB8TE9DQVRPUnxNQVB8TUFUQ0h8TUVNQkVSfE1FUkdFfE1FVEhPRHxNSU5VVEV8TU9EfE1PRElGSUVTfE1PRElGWXxNT0RVTEV8TVVMVElTRVR8TkFNRVN8TkFUSU9OQUx8TkFUVVJBTHxOQ0xPQnxORVd8TkVYVHxOT3xOT0NIRUNLfE5PTkNMVVNURVJFRHxOT05FfE5PUk1BTElaRXxOT1R8TlVMTHxOVUxMSUZ8T0JKRUNUfE9DQ1VSUkVOQ0VTX1JFR0VYfE9DVEVUX0xFTkdUSHxPRnxPRkZ8T0ZGU0VUU3xPTER8T058T05MWXxPUEVOfE9QRVJBVElPTnxPUFRJT058T1J8T1JERVJ8T1JESU5BTElUWXxPVVR8T1VURVJ8T1VUUFVUfE9WRVJ8T1ZFUkxBUFN8T1ZFUkxBWXxQQUR8UEFSQU1FVEVSfFBBUkFNRVRFUlN8UEFSVElBTHxQQVJUSVRJT058UEFTQ0FMfFBBVEh8UEVSQ0VOVHxQRVJDRU5USUxFX0NPTlR8UEVSQ0VOVElMRV9ESVNDfFBFUkNFTlRfUkFOS3xQSVZPVHxQTEFOfFBPU0lUSU9OfFBPU0lUSU9OX1JFR0VYfFBPU1RGSVh8UFJFQ0lTSU9OfFBSRUZJWHxQUkVPUkRFUnxQUkVQQVJFfFBSRVNFUlZFfFBSSU1BUll8UFJJTlR8UFJJT1J8UFJJVklMRUdFU3xQUk9DfFBST0NFRFVSRXxQVUJMSUN8UkFJU0VSUk9SfFJBTkdFfFJFQUR8UkVBRFN8UkVBRFRFWFR8UkVDT05GSUdVUkV8UkVDVVJTSVZFfFJFRnxSRUZFUkVOQ0VTfFJFRkVSRU5DSU5HfFJFR1JfQVZHWHxSRUdSX0FWR1l8UkVHUl9DT1VOVHxSRUdSX0lOVEVSQ0VQVHxSRUdSX1IyfFJFR1JfU0xPUEV8UkVHUl9TWFh8UkVHUl9TWFl8UkVHUl9TWVl8UkVMQVRJVkV8UkVMRUFTRXxSRVBMSUNBVElPTnxSRVNUT1JFfFJFU1RSSUNUfFJFU1VMVHxSRVRVUk58UkVUVVJOU3xSRVZFUlR8UkVWT0tFfFJPTEV8Uk9MTEJBQ0t8Uk9MTFVQfFJPVVRJTkV8Uk9XfFJPV0NPVU5UfFJPV0dVSURDT0x8Uk9XU3xSVUxFfFNBVkV8U0FWRVBPSU5UfFNDSEVNQXxTQ09QRXxTQ1JPTEx8U0VBUkNIfFNFQ09ORHxTRUNUSU9OfFNFQ1VSSVRZQVVESVR8U0VMRUNUfFNFTUFOVElDS0VZUEhSQVNFVEFCTEV8U0VNQU5USUNTSU1JTEFSSVRZREVUQUlMU1RBQkxFfFNFTUFOVElDU0lNSUxBUklUWVRBQkxFfFNFTlNJVElWRXxTRVFVRU5DRXxTRVNTSU9OfFNFVHxTRVRTfFNFVFVTRVJ8U0hVVERPV058U0lNSUxBUnxTSVpFfFNPTUV8U1BFQ0lGSUN8U1BFQ0lGSUNUWVBFfFNRTHxTUUxDQXxTUUxDT0RFfFNRTEVSUk9SfFNRTEVYQ0VQVElPTnxTUUxTVEFURXxTUUxXQVJOSU5HfFNUQVJUfFNUQVRFfFNUQVRFTUVOVHxTVEFUSUN8U1RBVElTVElDU3xTVERERVZfUE9QfFNURERFVl9TQU1QfFNUUlVDVFVSRXxTVUJNVUxUSVNFVHxTVUJTVFJJTkdfUkVHRVh8U1RSSU5HX1NQTElUfFNZTU1FVFJJQ3xTWVNURU18VEFCTEVTQU1QTEV8VEVNUE9SQVJZfFRFUk1JTkFURXxURVhUU0laRXxUSEFOfFRIRU58VElNRVpPTkVfSE9VUnxUSU1FWk9ORV9NSU5VVEV8VE98VE9QfFRSQUlMSU5HfFRSQU58VFJBTlNBQ1RJT058VFJBTlNMQVRFfFRSQU5TTEFURV9SRUdFWHxUUkFOU0xBVElPTnxUUkVBVHxUUklHR0VSfFRSSU18VFJVTkNBVEV8VFNFUVVBTHxVRVNDQVBFfFVOREVSfFVOSU9OfFVOSVFVRXxVTktOT1dOfFVOTkVTVHxVTlBJVk9UfFVQREFURXxVUERBVEVURVhUfFVTQUdFfFVTRXxVU0VSfFVTSU5HfFZBTFVFfFZBTFVFU3xWQVJJQUJMRXxWQVJZSU5HfFZBUl9QT1B8VkFSX1NBTVB8VklFV3xXQUlURk9SfFdIRU58V0hFTkVWRVJ8V0hFUkV8V0hJTEV8V0lEVEhfQlVDS0VUfFdJTkRPV3xXSVRIfFdJVEhJTnxXSVRISU4gR1JPVVB8V0lUSE9VVHxXT1JLfFdSSVRFfFdSSVRFVEVYVHxYTUxBR0d8WE1MQVRUUklCVVRFU3xYTUxCSU5BUll8WE1MQ0FTVHxYTUxDT01NRU5UfFhNTENPTkNBVHxYTUxET0NVTUVOVHxYTUxFTEVNRU5UfFhNTEVYSVNUU3xYTUxGT1JFU1R8WE1MSVRFUkFURXxYTUxOQU1FU1BBQ0VTfFhNTFBBUlNFfFhNTFBJfFhNTFFVRVJZfFhNTFNFUklBTElaRXxYTUxUQUJMRXxYTUxURVhUfFhNTFZBTElEQVRFfFpPTkVcIjtcbiAgICBcbiAgICBcbiAgICAvLyBNaWNyb3NvZnQncyBrZXl3b3JkIGxpc3QgaXMgbWlzc2luZyBhIGxvdCBvZiB0aGluZ3MgdGhhdCBhcmUgbG9jYXRlZCBvbiB2YXJpb3VzIG90aGVyIHBhZ2VzXG4gICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4NzM3My5hc3B4LCBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTgxNzE0LmFzcHhcbiAgICBrZXl3b3JkcyArPSBcInxLRUVQSURFTlRJVFl8S0VFUERFRkFVTFRTfElHTk9SRV9DT05TVFJBSU5UU3xJR05PUkVfVFJJR0dFUlN8WExPQ0t8Rk9SQ0VTQ0FOfEZPUkNFU0VFS3xIT0xETE9DS3xOT0xPQ0t8Tk9XQUlUfFBBR0xPQ0t8UkVBRENPTU1JVFRFRHxSRUFEQ09NTUlUVEVETE9DS3xSRUFEUEFTVHxSRUFEVU5DT01NSVRURUR8UkVQRUFUQUJMRVJFQUR8Uk9XTE9DS3xTRVJJQUxJWkFCTEV8U05BUFNIT1R8U1BBVElBTF9XSU5ET1dfTUFYX0NFTExTfFRBQkxPQ0t8VEFCTE9DS1h8VVBETE9DS3xYTE9DS3xJR05PUkVfTk9OQ0xVU1RFUkVEX0NPTFVNTlNUT1JFX0lOREVYfEVYUEFORHxWSUVXU3xGQVNUfEZPUkNFfEtFRVB8S0VFUEZJWEVEfE1BWERPUHxNQVhSRUNVUlNJT058T1BUSU1JWkV8UEFSQU1FVEVSSVpBVElPTnxTSU1QTEV8Rk9SQ0VEfFJFQ09NUElMRXxST0JVU1R8UExBTnxTUEFUSUFMX1dJTkRPV19NQVhfQ0VMTFN8Tk9FWFBBTkR8SElOVFwiO1xuICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzM4MTUuYXNweFxuICAgIGtleXdvcmRzICs9IFwifExPT1B8SEFTSHxNRVJHRXxSRU1PVEVcIjtcbiAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTc1OTc2LmFzcHhcbiAgICBrZXl3b3JkcyArPSBcInxUUll8Q0FUQ0h8VEhST1dcIjtcbiAgICAvLyBoaWdobGlnaHRlZCB3b3JkcyBpbiBTU01TIHRoYXQgSSdtIG5vdCBldmVuIHN1cmUgd2hlcmUgdGhleSBjb21lIGZyb21cbiAgICBrZXl3b3JkcyArPSBcInxUWVBFXCI7XG4gICAgXG4gICAgXG4gICAgLy9yZW1vdmUgc3BlY2lmaWMgYnVpbHQgaW4gdHlwZXMgZnJvbSBrZXl3b3JkIGxpc3RcbiAgICBrZXl3b3JkcyA9IGtleXdvcmRzLnNwbGl0KCd8Jyk7XG4gICAga2V5d29yZHMgPSBrZXl3b3Jkcy5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgIHJldHVybiBsb2dpY2FsT3BlcmF0b3JzLnNwbGl0KCd8JykuaW5kZXhPZih2YWx1ZSkgPT09IC0xICYmIGJ1aWx0aW5GdW5jdGlvbnMuc3BsaXQoJ3wnKS5pbmRleE9mKHZhbHVlKSA9PT0gLTEgJiYgZGF0YVR5cGVzLnNwbGl0KCd8JykuaW5kZXhPZih2YWx1ZSkgPT09IC0xO1xuICAgIH0pO1xuICAgIGtleXdvcmRzID0ga2V5d29yZHMuc29ydCgpLmpvaW4oJ3wnKTtcbiAgICBcbiAgICBcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogbG9naWNhbE9wZXJhdG9ycyxcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjogZGF0YVR5cGVzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJzdXBwb3J0LnN0b3JlZHByb2NlZHVyZVwiOiBidWlsdEluU3RvcmVkUHJvY2VkdXJlcyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIsIHRydWUpO1xuICAgIFxuICAgIFxuICAgIC8vaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE5MDM1Ni5hc3B4XG4gICAgdmFyIHNldFN0YXRlbWVudHMgPSBcIlNFVCBBTlNJX0RFRkFVTFRTfFNFVCBBTlNJX05VTExTfFNFVCBBTlNJX05VTExfREZMVF9PRkZ8U0VUIEFOU0lfTlVMTF9ERkxUX09OfFNFVCBBTlNJX1BBRERJTkd8U0VUIEFOU0lfV0FSTklOR1N8U0VUIEFSSVRIQUJPUlR8U0VUIEFSSVRISUdOT1JFfFNFVCBDT05DQVRfTlVMTF9ZSUVMRFNfTlVMTHxTRVQgQ1VSU09SX0NMT1NFX09OX0NPTU1JVHxTRVQgREFURUZJUlNUfFNFVCBEQVRFRk9STUFUfFNFVCBERUFETE9DS19QUklPUklUWXxTRVQgRklQU19GTEFHR0VSfFNFVCBGTVRPTkxZfFNFVCBGT1JDRVBMQU58U0VUIElERU5USVRZX0lOU0VSVHxTRVQgSU1QTElDSVRfVFJBTlNBQ1RJT05TfFNFVCBMQU5HVUFHRXxTRVQgTE9DS19USU1FT1VUfFNFVCBOT0NPVU5UfFNFVCBOT0VYRUN8U0VUIE5VTUVSSUNfUk9VTkRBQk9SVHxTRVQgT0ZGU0VUU3xTRVQgUEFSU0VPTkxZfFNFVCBRVUVSWV9HT1ZFUk5PUl9DT1NUX0xJTUlUfFNFVCBRVU9URURfSURFTlRJRklFUnxTRVQgUkVNT1RFX1BST0NfVFJBTlNBQ1RJT05TfFNFVCBST1dDT1VOVHxTRVQgU0hPV1BMQU5fQUxMfFNFVCBTSE9XUExBTl9URVhUfFNFVCBTSE9XUExBTl9YTUx8U0VUIFNUQVRJU1RJQ1MgSU98U0VUIFNUQVRJU1RJQ1MgUFJPRklMRXxTRVQgU1RBVElTVElDUyBUSU1FfFNFVCBTVEFUSVNUSUNTIFhNTHxTRVQgVEVYVFNJWkV8U0VUIFhBQ1RfQUJPUlRcIi5zcGxpdCgnfCcpO1xuICAgIHZhciBpc29sYXRpb25MZXZlbHMgPSBcIlJFQUQgVU5DT01NSVRURUR8UkVBRCBDT01NSVRURUR8UkVQRUFUQUJMRSBSRUFEfFNOQVBTSE9QfFNFUklBTElaQUJMRVwiLnNwbGl0KCd8Jyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpc29sYXRpb25MZXZlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2V0U3RhdGVtZW50cy5wdXNoKCdTRVQgVFJBTlNBQ1RJT04gSVNPTEFUSU9OIExFVkVMICcgKyBpc29sYXRpb25MZXZlbHNbaV0pO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIidcIixcbiAgICAgICAgICAgIG5leHQ6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8nJy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIidcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiLS0uKiRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBzdGFydDogXCIvXFxcXCpcIixcbiAgICAgICAgICAgIGVuZDogXCJcXFxcKi9cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4OiBcIkB7MCwyfVthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiKD8hXSlcIiAvL3VwIHRvIDIgQHN5bWJvbHMgZm9yIHNvbWUgYnVpbHQgaW4gZnVuY3Rpb25zXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNsYXNzXCIsXG4gICAgICAgICAgICByZWdleDogXCJAQD9bYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3NDk4Ni5hc3B4XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcK3xcXFxcLXxcXFxcL3xcXFxcL1xcXFwvfCV8PEA+fEA+fDxAfCZ8XFxcXF58fnw8fD58PD18PT58PT18IT18PD58PXxcXFxcKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFwoXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFwpXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCIsfDtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICB9XSxcbiAgICAgICAgY29tbWVudDogW1xuICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XVxuICAgIH07XG4gICAgXG4gICAgLy9hZGQgZWFjaCBzZXQgc3RhdG1lbnQgYXMgcmVnZXggYXQgdG9wIG9mIHJ1bGVzIHNvIHRoYXQgdGhleSBhcmUgcHJvY2Vzc2VkIGZpcnN0IGJlY2F1c2UgdGhleSByZXF1aXJlIG11bHRpcGxlIHdvcmRzXG4gICAgLy9ub3RlOiB0aGlzIG1ha2VzIHRoZSBzdGF0ZW1lbnRzIG5vdCBtYXRjaCBpZiB0aGV5IGFyZSBub3QgdXBwZXIgY2FzZS4uIHdoaWNoIGlzIG5vdCBpZGVhbCBidXQgSSBkb24ndCBrbm93IG9mIGFuIGVhc3kgd2F5IHRvIGZpeCB0aGlzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRTdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuJHJ1bGVzLnN0YXJ0LnVuc2hpZnQoe1xuICAgICAgICAgICAgdG9rZW46IFwic2V0LnN0YXRlbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6IHNldFN0YXRlbWVudHNbaV1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLCBbRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKV0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbiAgICBcbiAgICBcbiAgICAvL3ByZXBhcmUgY3VzdG9tIGtleXdvcmQgY29tcGxldGlvbnMgdXNlZCBieSBtb2RlIHRvIG92ZXJyaWRlIGRlZmF1bHQgY29tcGxldG9yXG4gICAgLy90aGlzIGFsbG93cyBmb3IgY3VzdG9tICdtZXRhJyBhbmQgcHJvcGVyIGNhc2Ugb2YgY29tcGxldGlvbnNcbiAgICB2YXIgY29tcGxldGlvbnMgPSBbXTtcbiAgICB2YXIgYWRkQ29tcGxldGlvbnMgPSBmdW5jdGlvbihhcnIsIG1ldGEpIHtcbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgY29tcGxldGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogdixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICAgICAgICBtZXRhOiBtZXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhZGRDb21wbGV0aW9ucyhidWlsdEluU3RvcmVkUHJvY2VkdXJlcy5zcGxpdCgnfCcpLCAncHJvY2VkdXJlJyk7XG4gICAgYWRkQ29tcGxldGlvbnMobG9naWNhbE9wZXJhdG9ycy5zcGxpdCgnfCcpLCAnb3BlcmF0b3InKTtcbiAgICBhZGRDb21wbGV0aW9ucyhidWlsdGluRnVuY3Rpb25zLnNwbGl0KCd8JyksICdmdW5jdGlvbicpO1xuICAgIGFkZENvbXBsZXRpb25zKGRhdGFUeXBlcy5zcGxpdCgnfCcpLCAndHlwZScpO1xuICAgIGFkZENvbXBsZXRpb25zKHNldFN0YXRlbWVudHMsICdzdGF0ZW1lbnQnKTtcbiAgICBhZGRDb21wbGV0aW9ucyhrZXl3b3Jkcy5zcGxpdCgnfCcpLCAna2V5d29yZCcpO1xuICAgIFxuICAgIHRoaXMuY29tcGxldGlvbnMgPSBjb21wbGV0aW9ucztcbn07XG5cbm9vcC5pbmhlcml0cyhTcWxTZXJ2ZXJIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TcWxIaWdobGlnaHRSdWxlcyA9IFNxbFNlcnZlckhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9