"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[80],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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


exports.l = DocCommentHighlightRules;


/***/ }),

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

/***/ 13782:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var FoldMode = exports.l = function() {};

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

/***/ 70080:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SqlServerHighlightRules = (__webpack_require__(86555)/* .SqlHighlightRules */ .W);
var SqlServerFoldMode = (__webpack_require__(13782)/* .FoldMode */ .l);

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

/***/ 86555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.W = SqlServerHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUJBQXVCO0FBQ3ZCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL3NxbHNlcnZlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NxbHNlcnZlci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NxbHNlcnZlcl9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLyoqIFxuICAgICAqIEluaGVyaXRpbmcgY3N0eWxlIGZvbGRpbmcgYmVjYXVzZSBpdCBoYW5kbGVzIHRoZSByZWdpb24gY29tbWVudCBmb2xkaW5nIFxuICAgICAqIGFuZCBzcGVjaWFsIGJsb2NrIGNvbW1lbnQgZm9sZGluZyBhcHByb3ByaWF0ZWx5LlxuICAgICAqIFxuICAgICAqIENzdHlsZSdzIGdldENvbW1lbnRSZWdpb25CbG9jaygpIGNvbnRhaW5zIHRoZSBzcWwgY29tbWVudCBjaGFyYWN0ZXJzICctLScgZm9yIGVuZCByZWdpb24gYmxvY2suXG4gICAgICovXG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFxcYkNBU0VcXGJ8XFxiQkVHSU5cXGIpfF5cXHMqKFxcL1xcKikvaTtcbiAgICAvLyB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gLyhcXGJFTkRcXGIpfF5bXFxzXFwqXSooXFwqXFwvKS9pO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8LS0pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSkgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHJldHVybiB0aGlzLmdldEJlZ2luRW5kQmxvY2soc2Vzc2lvbiwgcm93LCBpLCBtYXRjaFsxXSk7XG4gICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKSByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIikgcmV0dXJuO1xuICAgICAgICAvL1RPRE86IGFkZCBzdXBwb3J0IGZvciBlbmQgZm9sZGluZyBtYXJrZXJzXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtSYW5nZX0gZm9sZGluZyBibG9jayBmb3Igc2VxdWVuY2UgdGhhdCBzdGFydHMgd2l0aCAnQ0FTRScgb3IgJ0JFR0lOJyBhbmQgZW5kcyB3aXRoICdFTkQnXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoU2VxdWVuY2UgLSB0aGUgc2VxdWVuY2Ugb2YgY2hhcmF0ZXJzIHRoYXQgc3RhcnRlZCB0aGUgZm9sZCB3aWRnZXQsIHdoaWNoIHNob3VsZCByZW1haW4gdmlzaWJsZSB3aGVuIHRoZSBmb2xkIHdpZGdldCBpcyBmb2xkZWRcbiAgICAgKi9cbiAgICB0aGlzLmdldEJlZ2luRW5kQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbiwgbWF0Y2hTZXF1ZW5jZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSB7XG4gICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgIGNvbHVtbjogY29sdW1uICsgbWF0Y2hTZXF1ZW5jZS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBsaW5lO1xuICAgIFxuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB2YXIgcmUgPSAvKFxcYkNBU0VcXGJ8XFxiQkVHSU5cXGIpfChcXGJFTkRcXGIpL2k7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aCsrO1xuICAgICAgICAgICAgZWxzZSBkZXB0aC0tO1xuICAgIFxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0LnJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydC5yb3csIHN0YXJ0LmNvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFNxbFNlcnZlckhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc3Fsc2VydmVyX2hpZ2hsaWdodF9ydWxlc1wiKS5TcWxIaWdobGlnaHRSdWxlcztcbnZhciBTcWxTZXJ2ZXJGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvc3Fsc2VydmVyXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTcWxTZXJ2ZXJIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBTcWxTZXJ2ZXJGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUga2V5d29yZCBjb21wbGV0aW9ucyB1c2luZyBsaXN0IGNyZWF0ZWQgaW4gaGlnaGxpZ2h0IHJ1bGVzXG4gICAgICovXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gc2Vzc2lvbi4kbW9kZS4kaGlnaGxpZ2h0UnVsZXMuY29tcGxldGlvbnM7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc3Fsc2VydmVyXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvc3Fsc2VydmVyXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTcWxTZXJ2ZXJIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICAqIFRyYW5zYWN0LVNRTCBTeW50YXggQ29udmVudGlvbnM6IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzc1NjMuYXNweFxuICAgICAqIEdvYWw6IG1ha2UgdGhpcyBpbWl0YXRlIFNTTVMgKFNRTCBTZXJ2ZXIgTWFuYWdtZW50IFN0dWRpbylcbiAgICAgKi9cblxuICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODk3NzMuYXNweFxuICAgIHZhciBsb2dpY2FsT3BlcmF0b3JzID0gXCJBTEx8QU5EfEFOWXxCRVRXRUVOfEVYSVNUU3xJTnxMSUtFfE5PVHxPUnxTT01FXCI7XG4gICAgbG9naWNhbE9wZXJhdG9ycyArPSBcInxOVUxMfElTfEFQUExZfElOTkVSfE9VVEVSfExFRlR8UklHSFR8Sk9JTnxDUk9TU1wiOyAvL1NTTVMgY29sb3JzIHRoZXNlIGdyYXkgdG9vXG4gICAgLy9ub3RlOiBtYW51YWxseSByZW1vdmVkIExFRlQgYW5kIFJJR0hUIGZyb20gYnVpbHQgaW4gZnVuY3Rpb25zIGJlbG93IHRvIGNvbG9yIGl0IHNhbWUgd2F5IFNTTVMgZG9lc1xuICAgIFxuXG4gICAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSAoXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODc5NTcuYXNweCAqL1xuICAgICAgICBcIk9QRU5EQVRBU09VUkNFfE9QRU5RVUVSWXxPUEVOUk9XU0VUfE9QRU5YTUx8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTczNDU0LmFzcHggKi9cbiAgICAgICAgXCJBVkd8Q0hFQ0tTVU1fQUdHfENPVU5UfENPVU5UX0JJR3xHUk9VUElOR3xHUk9VUElOR19JRHxNQVh8TUlOfFNUREVWfFNUREVWUHxTVU18VkFSfFZBUlB8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg5Nzk4LmFzcHggKi9cbiAgICAgICAgXCJERU5TRV9SQU5LfE5USUxFfFJBTkt8Uk9XX05VTUJFUlwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3MzgyMy5hc3B4ICovXG4gICAgICAgIFwiQEBEQVRFRklSU1R8QEBEQlRTfEBATEFOR0lEfEBATEFOR1VBR0V8QEBMT0NLX1RJTUVPVVR8QEBNQVhfQ09OTkVDVElPTlN8QEBNQVhfUFJFQ0lTSU9OfEBATkVTVExFVkVMfEBAT1BUSU9OU3xAQFJFTVNFUlZFUnxAQFNFUlZFUk5BTUV8QEBTRVJWSUNFTkFNRXxAQFNQSUR8QEBURVhUU0laRXxAQFZFUlNJT058XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2hoMjMxMDc2LmFzcHggKi9cbiAgICAgICAgXCJDQVNUfENPTlZFUlR8UEFSU0V8VFJZX0NBU1R8VFJZX0NPTlZFUlR8VFJZX1BBUlNFXCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg2Mjg1LmFzcHggKi9cbiAgICAgICAgXCJAQENVUlNPUl9ST1dTfEBARkVUQ0hfU1RBVFVTfENVUlNPUl9TVEFUVVN8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg2NzI0LmFzcHggKi9cbiAgICAgICAgXCJAQERBVEVGSVJTVHxAQExBTkdVQUdFfENVUlJFTlRfVElNRVNUQU1QfERBVEVBRER8REFURURJRkZ8REFURUZST01QQVJUU3xEQVRFTkFNRXxEQVRFUEFSVHxEQVRFVElNRTJGUk9NUEFSVFN8REFURVRJTUVGUk9NUEFSVFN8REFURVRJTUVPRkZTRVRGUk9NUEFSVFN8REFZfEVPTU9OVEh8R0VUREFURXxHRVRVVENEQVRFfElTREFURXxNT05USHxTRVQgREFURUZJUlNUfFNFVCBEQVRFRk9STUFUfFNFVCBMQU5HVUFHRXxTTUFMTERBVEVUSU1FRlJPTVBBUlRTfFNQX0hFTFBMQU5HVUFHRXxTV0lUQ0hPRkZTRVR8U1lTREFURVRJTUV8U1lTREFURVRJTUVPRkZTRVR8U1lTVVRDREFURVRJTUV8VElNRUZST01QQVJUU3xUT0RBVEVUSU1FT0ZGU0VUfFlFQVJ8REFURVRSVU5DfFwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9oaDIxMzIyNi5hc3B4ICovXG4gICAgICAgIFwiQ0hPT1NFfElJRnxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzc1MTYuYXNweCAqL1xuICAgICAgICBcIkFCU3xBQ09TfEFTSU58QVRBTnxBVE4yfENFSUxJTkd8Q09TfENPVHxERUdSRUVTfEVYUHxGTE9PUnxMT0d8TE9HMTB8UEl8UE9XRVJ8UkFESUFOU3xSQU5EfFJPVU5EfFNJR058U0lOfFNRUlR8U1FVQVJFfFRBTnxcIiArXG4gICAgICAgIC8qIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODc4MTIuYXNweCAqL1xuICAgICAgICBcIkBAUFJPQ0lEfEFQUExPQ0tfTU9ERXxBUFBMT0NLX1RFU1R8QVBQX05BTUV8QVNTRU1CTFlQUk9QRVJUWXxDT0xVTU5QUk9QRVJUWXxDT0xfTEVOR1RIfENPTF9OQU1FfERBVEFCQVNFUFJPUEVSVFlFWHxEQVRBQkFTRV9QUklOQ0lQQUxfSUR8REJfSUR8REJfTkFNRXxGSUxFR1JPVVBQUk9QRVJUWXxGSUxFR1JPVVBfSUR8RklMRUdST1VQX05BTUV8RklMRVBST1BFUlRZfEZJTEVfSUR8RklMRV9JREVYfEZJTEVfTkFNRXxGVUxMVEVYVENBVEFMT0dQUk9QRVJUWXxGVUxMVEVYVFNFUlZJQ0VQUk9QRVJUWXxJTkRFWEtFWV9QUk9QRVJUWXxJTkRFWFBST1BFUlRZfElOREVYX0NPTHxPQkpFQ1RQUk9QRVJUWXxPQkpFQ1RQUk9QRVJUWUVYfE9CSkVDVF9ERUZJTklUSU9OfE9CSkVDVF9JRHxPQkpFQ1RfTkFNRXxPQkpFQ1RfU0NIRU1BX05BTUV8T1JJR0lOQUxfREJfTkFNRXxQQVJTRU5BTUV8U0NIRU1BX0lEfFNDSEVNQV9OQU1FfFNDT1BFX0lERU5USVRZfFNFUlZFUlBST1BFUlRZfFNUQVRTX0RBVEV8VFlQRVBST1BFUlRZfFRZUEVfSUR8VFlQRV9OQU1FfFwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4NjIzNi5hc3B4ICovXG4gICAgICAgIFwiQ0VSVEVOQ09ERUR8Q0VSVFBSSVZBVEVLRVl8Q1VSUkVOVF9VU0VSfERBVEFCQVNFX1BSSU5DSVBBTF9JRHxIQVNfUEVSTVNfQllfTkFNRXxJU19NRU1CRVJ8SVNfUk9MRU1FTUJFUnxJU19TUlZST0xFTUVNQkVSfE9SSUdJTkFMX0xPR0lOfFBFUk1JU1NJT05TfFBXRENPTVBBUkV8UFdERU5DUllQVHxTQ0hFTUFfSUR8U0NIRU1BX05BTUV8U0VTU0lPTl9VU0VSfFNVU0VSX0lEfFNVU0VSX05BTUV8U1VTRVJfU0lEfFNVU0VSX1NOQU1FfFNZUy5GTl9CVUlMVElOX1BFUk1JU1NJT05TfFNZUy5GTl9HRVRfQVVESVRfRklMRXxTWVMuRk5fTVlfUEVSTUlTU0lPTlN8U1lTVEVNX1VTRVJ8VVNFUl9JRHxVU0VSX05BTUV8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTgxOTg0LmFzcHggKi9cbiAgICAgICAgXCJBU0NJSXxDSEFSfENIQVJJTkRFWHxDT05DQVR8RElGRkVSRU5DRXxGT1JNQVR8TEVOfExPV0VSfExUUklNfE5DSEFSfFBBVElOREVYfFFVT1RFTkFNRXxSRVBMQUNFfFJFUExJQ0FURXxSRVZFUlNFfFJUUklNfFNPVU5ERVh8U1BBQ0V8U1RSfFNUVUZGfFNVQlNUUklOR3xVTklDT0RFfFVQUEVSfFwiICtcbiAgICAgICAgLyogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4Nzc4Ni5hc3B4ICovXG4gICAgICAgIFwiJFBBUlRJVElPTnxAQEVSUk9SfEBASURFTlRJVFl8QEBQQUNLX1JFQ0VJVkVEfEBAUk9XQ09VTlR8QEBUUkFOQ09VTlR8QklOQVJZX0NIRUNLU1VNfENIRUNLU1VNfENPTk5FQ1RJT05QUk9QRVJUWXxDT05URVhUX0lORk98Q1VSUkVOVF9SRVFVRVNUX0lEfEVSUk9SX0xJTkV8RVJST1JfTUVTU0FHRXxFUlJPUl9OVU1CRVJ8RVJST1JfUFJPQ0VEVVJFfEVSUk9SX1NFVkVSSVRZfEVSUk9SX1NUQVRFfEZPUk1BVE1FU1NBR0V8R0VUQU5TSU5VTEx8R0VUX0ZJTEVTVFJFQU1fVFJBTlNBQ1RJT05fQ09OVEVYVHxIT1NUX0lEfEhPU1RfTkFNRXxJU05VTEx8SVNOVU1FUklDfE1JTl9BQ1RJVkVfUk9XVkVSU0lPTnxORVdJRHxORVdTRVFVRU5USUFMSUR8Uk9XQ09VTlRfQklHfFhBQ1RfU1RBVEV8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTc3NTIwLmFzcHggKi9cbiAgICAgICAgXCJAQENPTk5FQ1RJT05TfEBAQ1BVX0JVU1l8QEBJRExFfEBASU9fQlVTWXxAQFBBQ0tFVF9FUlJPUlN8QEBQQUNLX1JFQ0VJVkVEfEBAUEFDS19TRU5UfEBAVElNRVRJQ0tTfEBAVE9UQUxfRVJST1JTfEBAVE9UQUxfUkVBRHxAQFRPVEFMX1dSSVRFfEZOX1ZJUlRVQUxGSUxFU1RBVFN8XCIgK1xuICAgICAgICAvKiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg4MzUzLmFzcHggKi9cbiAgICAgICAgXCJQQVRJTkRFWHxURVhUUFRSfFRFWFRWQUxJRHxcIiArXG4gICAgICAgIC8qIGxvZ2ljYWwgKi9cbiAgICAgICAgXCJHUkVBVEVTVHxMRUFTVHxcIiArXG4gICAgICAgIC8qIHRpbWUgc2VyaWVzIGZ1bmN0aW9ucyAqL1xuICAgICAgICBcIkdFTkVSQVRFX1NFUklFU3xEQVRFX0JVQ0tFVHxcIiArXG4gICAgICAgIC8qIEpTT04gZnVuY3Rpb25zICovXG4gICAgICAgIFwiSlNPTl9BUlJBWXxKU09OX09CSkVDVHxKU09OX1BBVEhfRVhJU1RTfElTSlNPTnxcIiArXG4gICAgICAgIC8qIHdpbmRvdyBmdW5jdGlvbnMgKi9cbiAgICAgICAgXCJGSVJTVF9WQUxVRXxMQVNUX1ZBTFVFfFwiICtcbiAgICAgICAgLyogb3RoZXIgKi9cbiAgICAgICAgXCJDT0FMRVNDRXxOVUxMSUZcIlxuICAgICk7XG4gICAgXG5cbiAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTg3NzUyLmFzcHhcbiAgICB2YXIgZGF0YVR5cGVzID0gKFwiQklHSU5UfEJJTkFSWXxCSVR8Q0hBUnxDVVJTT1J8REFURXxEQVRFVElNRXxEQVRFVElNRTJ8REFURVRJTUVPRkZTRVR8REVDSU1BTHxGTE9BVHxISUVSQVJDSFlJRHxJTUFHRXxJTlRFR0VSfElOVHxNT05FWXxOQ0hBUnxOVEVYVHxOVU1FUklDfE5WQVJDSEFSfFJFQUx8U01BTExEQVRFVElNRXxTTUFMTElOVHxTTUFMTE1PTkVZfFNRTF9WQVJJQU5UfFRBQkxFfFRFWFR8VElNRXxUSU1FU1RBTVB8VElOWUlOVHxVTklRVUVJREVOVElGSUVSfFZBUkJJTkFSWXxWQVJDSEFSfFhNTFwiKTtcbiAgICBcbiAgICBcbiAgICAvL2h0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzYwMDcuYXNweCAodGhlc2UgYXJlIGxvd2VyIGNhc2UhKVxuICAgIHZhciBidWlsdEluU3RvcmVkUHJvY2VkdXJlcyA9IFwic3BfYWRkZXh0ZW5kZWRwcm9jfHNwX2FkZGV4dGVuZGVkcHJvcGVydHl8c3BfYWRkbWVzc2FnZXxzcF9hZGR0eXBlfHNwX2FkZHVtcGRldmljZXxzcF9hZGRfZGF0YV9maWxlX3JlY292ZXJfc3VzcGVjdF9kYnxzcF9hZGRfbG9nX2ZpbGVfcmVjb3Zlcl9zdXNwZWN0X2RifHNwX2FsdGVybWVzc2FnZXxzcF9hdHRhY2hfZGJ8c3BfYXR0YWNoX3NpbmdsZV9maWxlX2RifHNwX2F1dG9zdGF0c3xzcF9iaW5kZWZhdWx0fHNwX2JpbmRydWxlfHNwX2JpbmRzZXNzaW9ufHNwX2NlcnRpZnlfcmVtb3ZhYmxlfHNwX2NsZWFuX2RiX2ZpbGVfZnJlZV9zcGFjZXxzcF9jbGVhbl9kYl9mcmVlX3NwYWNlfHNwX2NvbmZpZ3VyZXxzcF9jb250cm9sX3BsYW5fZ3VpZGV8c3BfY3JlYXRlc3RhdHN8c3BfY3JlYXRlX3BsYW5fZ3VpZGV8c3BfY3JlYXRlX3BsYW5fZ3VpZGVfZnJvbV9oYW5kbGV8c3BfY3JlYXRlX3JlbW92YWJsZXxzcF9jeWNsZV9lcnJvcmxvZ3xzcF9kYXRhdHlwZV9pbmZvfHNwX2RiY21wdGxldmVsfHNwX2RibW1vbml0b3JhZGRtb25pdG9yaW5nfHNwX2RibW1vbml0b3JjaGFuZ2VhbGVydHxzcF9kYm1tb25pdG9yY2hhbmdlbW9uaXRvcmluZ3xzcF9kYm1tb25pdG9yZHJvcGFsZXJ0fHNwX2RibW1vbml0b3Jkcm9wbW9uaXRvcmluZ3xzcF9kYm1tb25pdG9yaGVscGFsZXJ0fHNwX2RibW1vbml0b3JoZWxwbW9uaXRvcmluZ3xzcF9kYm1tb25pdG9ycmVzdWx0c3xzcF9kYl9pbmNyZWFzZWRfcGFydGl0aW9uc3xzcF9kZWxldGVfYmFja3VwaGlzdG9yeXxzcF9kZXBlbmRzfHNwX2Rlc2NyaWJlX2ZpcnN0X3Jlc3VsdF9zZXR8c3BfZGVzY3JpYmVfdW5kZWNsYXJlZF9wYXJhbWV0ZXJzfHNwX2RldGFjaF9kYnxzcF9kcm9wZGV2aWNlfHNwX2Ryb3BleHRlbmRlZHByb2N8c3BfZHJvcGV4dGVuZGVkcHJvcGVydHl8c3BfZHJvcG1lc3NhZ2V8c3BfZHJvcHR5cGV8c3BfZXhlY3V0ZXxzcF9leGVjdXRlc3FsfHNwX2dldGFwcGxvY2t8c3BfZ2V0YmluZHRva2VufHNwX2hlbHB8c3BfaGVscGNvbnN0cmFpbnR8c3BfaGVscGRifHNwX2hlbHBkZXZpY2V8c3BfaGVscGV4dGVuZGVkcHJvY3xzcF9oZWxwZmlsZXxzcF9oZWxwZmlsZWdyb3VwfHNwX2hlbHBpbmRleHxzcF9oZWxwbGFuZ3VhZ2V8c3BfaGVscHNlcnZlcnxzcF9oZWxwc29ydHxzcF9oZWxwc3RhdHN8c3BfaGVscHRleHR8c3BfaGVscHRyaWdnZXJ8c3BfaW5kZXhvcHRpb258c3BfaW52YWxpZGF0ZV90ZXh0cHRyfHNwX2xvY2t8c3BfbW9uaXRvcnxzcF9wcmVwYXJlfHNwX3ByZXBleGVjfHNwX3ByZXBleGVjcnBjfHNwX3Byb2NvcHRpb258c3BfcmVjb21waWxlfHNwX3JlZnJlc2h2aWV3fHNwX3JlbGVhc2VhcHBsb2NrfHNwX3JlbmFtZXxzcF9yZW5hbWVkYnxzcF9yZXNldHN0YXR1c3xzcF9zZXF1ZW5jZV9nZXRfcmFuZ2V8c3Bfc2VydmVyb3B0aW9ufHNwX3NldG5ldG5hbWV8c3Bfc2V0dHJpZ2dlcm9yZGVyfHNwX3NwYWNldXNlZHxzcF90YWJsZW9wdGlvbnxzcF91bmJpbmRlZmF1bHR8c3BfdW5iaW5kcnVsZXxzcF91bnByZXBhcmV8c3BfdXBkYXRlZXh0ZW5kZWRwcm9wZXJ0eXxzcF91cGRhdGVzdGF0c3xzcF92YWxpZG5hbWV8c3Bfd2hvfHN5cy5zcF9tZXJnZV94dHBfY2hlY2twb2ludF9maWxlc3xzeXMuc3BfeHRwX2JpbmRfZGJfcmVzb3VyY2VfcG9vbHxzeXMuc3BfeHRwX2NoZWNrcG9pbnRfZm9yY2VfZ2FyYmFnZV9jb2xsZWN0aW9ufHN5cy5zcF94dHBfY29udHJvbF9wcm9jX2V4ZWNfc3RhdHN8c3lzLnNwX3h0cF9jb250cm9sX3F1ZXJ5X2V4ZWNfc3RhdHN8c3lzLnNwX3h0cF91bmJpbmRfZGJfcmVzb3VyY2VfcG9vbFwiO1xuICAgIFxuICAgIFxuICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODk4MjIuYXNweFxuICAgIHZhciBrZXl3b3JkcyA9IFwiQUJTT0xVVEV8QUNUSU9OfEFEQXxBRER8QURNSU58QUZURVJ8QUdHUkVHQVRFfEFMSUFTfEFMTHxBTExPQ0FURXxBTFRFUnxBTkR8QU5ZfEFSRXxBUlJBWXxBU3xBU0N8QVNFTlNJVElWRXxBU1NFUlRJT058QVNZTU1FVFJJQ3xBVHxBVE9NSUN8QVVUSE9SSVpBVElPTnxCQUNLVVB8QkVGT1JFfEJFR0lOfEJFVFdFRU58QklUX0xFTkdUSHxCTE9CfEJPT0xFQU58Qk9USHxCUkVBRFRIfEJSRUFLfEJST1dTRXxCVUxLfEJZfENBTEx8Q0FMTEVEfENBUkRJTkFMSVRZfENBU0NBREV8Q0FTQ0FERUR8Q0FTRXxDQVRBTE9HfENIQVJBQ1RFUnxDSEFSQUNURVJfTEVOR1RIfENIQVJfTEVOR1RIfENIRUNLfENIRUNLUE9JTlR8Q0xBU1N8Q0xPQnxDTE9TRXxDTFVTVEVSRUR8Q09BTEVTQ0V8Q09MTEFURXxDT0xMQVRJT058Q09MTEVDVHxDT0xVTU58Q09NTUlUfENPTVBMRVRJT058Q09NUFVURXxDT05ESVRJT058Q09OTkVDVHxDT05ORUNUSU9OfENPTlNUUkFJTlR8Q09OU1RSQUlOVFN8Q09OU1RSVUNUT1J8Q09OVEFJTlN8Q09OVEFJTlNUQUJMRXxDT05USU5VRXxDT1JSfENPUlJFU1BPTkRJTkd8Q09WQVJfUE9QfENPVkFSX1NBTVB8Q1JFQVRFfENST1NTfENVQkV8Q1VNRV9ESVNUfENVUlJFTlR8Q1VSUkVOVF9DQVRBTE9HfENVUlJFTlRfREFURXxDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQfENVUlJFTlRfUEFUSHxDVVJSRU5UX1JPTEV8Q1VSUkVOVF9TQ0hFTUF8Q1VSUkVOVF9USU1FfENVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFfENZQ0xFfERBVEF8REFUQUJBU0V8REJDQ3xERUFMTE9DQVRFfERFQ3xERUNMQVJFfERFRkFVTFR8REVGRVJSQUJMRXxERUZFUlJFRHxERUxFVEV8REVOWXxERVBUSHxERVJFRnxERVNDfERFU0NSSUJFfERFU0NSSVBUT1J8REVTVFJPWXxERVNUUlVDVE9SfERFVEVSTUlOSVNUSUN8RElBR05PU1RJQ1N8RElDVElPTkFSWXxESVNDT05ORUNUfERJU0t8RElTVElOQ1R8RElTVFJJQlVURUR8RE9NQUlOfERPVUJMRXxEUk9QfERVTVB8RFlOQU1JQ3xFQUNIfEVMRU1FTlR8RUxTRXxFTkR8RU5ELUVYRUN8RVFVQUxTfEVSUkxWTHxFU0NBUEV8RVZFUll8RVhDRVBUfEVYQ0VQVElPTnxFWEVDfEVYRUNVVEV8RVhJU1RTfEVYSVR8RVhURVJOQUx8RVhUUkFDVHxGRVRDSHxGSUxFfEZJTExGQUNUT1J8RklMVEVSfEZJUlNUfEZPUnxGT1JFSUdOfEZPUlRSQU58Rk9VTkR8RlJFRXxGUkVFVEVYVHxGUkVFVEVYVFRBQkxFfEZST018RlVMTHxGVUxMVEVYVFRBQkxFfEZVTkNUSU9OfEZVU0lPTnxHRU5FUkFMfEdFVHxHTE9CQUx8R098R09UT3xHUkFOVHxHUk9VUHxIQVZJTkd8SE9MRHxIT0xETE9DS3xIT1NUfEhPVVJ8SURFTlRJVFl8SURFTlRJVFlDT0x8SURFTlRJVFlfSU5TRVJUfElGfElHTk9SRXxJTU1FRElBVEV8SU58SU5DTFVERXxJTkRFWHxJTkRJQ0FUT1J8SU5JVElBTElaRXxJTklUSUFMTFl8SU5ORVJ8SU5PVVR8SU5QVVR8SU5TRU5TSVRJVkV8SU5TRVJUfElOVEVHRVJ8SU5URVJTRUNUfElOVEVSU0VDVElPTnxJTlRFUlZBTHxJTlRPfElTfElTT0xBVElPTnxJVEVSQVRFfEpPSU58S0VZfEtJTEx8TEFOR1VBR0V8TEFSR0V8TEFTVHxMQVRFUkFMfExFQURJTkd8TEVTU3xMRVZFTHxMSUtFfExJS0VfUkVHRVh8TElNSVR8TElORU5PfExOfExPQUR8TE9DQUx8TE9DQUxUSU1FfExPQ0FMVElNRVNUQU1QfExPQ0FUT1J8TUFQfE1BVENIfE1FTUJFUnxNRVJHRXxNRVRIT0R8TUlOVVRFfE1PRHxNT0RJRklFU3xNT0RJRll8TU9EVUxFfE1VTFRJU0VUfE5BTUVTfE5BVElPTkFMfE5BVFVSQUx8TkNMT0J8TkVXfE5FWFR8Tk98Tk9DSEVDS3xOT05DTFVTVEVSRUR8Tk9ORXxOT1JNQUxJWkV8Tk9UfE5VTEx8TlVMTElGfE9CSkVDVHxPQ0NVUlJFTkNFU19SRUdFWHxPQ1RFVF9MRU5HVEh8T0Z8T0ZGfE9GRlNFVFN8T0xEfE9OfE9OTFl8T1BFTnxPUEVSQVRJT058T1BUSU9OfE9SfE9SREVSfE9SRElOQUxJVFl8T1VUfE9VVEVSfE9VVFBVVHxPVkVSfE9WRVJMQVBTfE9WRVJMQVl8UEFEfFBBUkFNRVRFUnxQQVJBTUVURVJTfFBBUlRJQUx8UEFSVElUSU9OfFBBU0NBTHxQQVRIfFBFUkNFTlR8UEVSQ0VOVElMRV9DT05UfFBFUkNFTlRJTEVfRElTQ3xQRVJDRU5UX1JBTkt8UElWT1R8UExBTnxQT1NJVElPTnxQT1NJVElPTl9SRUdFWHxQT1NURklYfFBSRUNJU0lPTnxQUkVGSVh8UFJFT1JERVJ8UFJFUEFSRXxQUkVTRVJWRXxQUklNQVJZfFBSSU5UfFBSSU9SfFBSSVZJTEVHRVN8UFJPQ3xQUk9DRURVUkV8UFVCTElDfFJBSVNFUlJPUnxSQU5HRXxSRUFEfFJFQURTfFJFQURURVhUfFJFQ09ORklHVVJFfFJFQ1VSU0lWRXxSRUZ8UkVGRVJFTkNFU3xSRUZFUkVOQ0lOR3xSRUdSX0FWR1h8UkVHUl9BVkdZfFJFR1JfQ09VTlR8UkVHUl9JTlRFUkNFUFR8UkVHUl9SMnxSRUdSX1NMT1BFfFJFR1JfU1hYfFJFR1JfU1hZfFJFR1JfU1lZfFJFTEFUSVZFfFJFTEVBU0V8UkVQTElDQVRJT058UkVTVE9SRXxSRVNUUklDVHxSRVNVTFR8UkVUVVJOfFJFVFVSTlN8UkVWRVJUfFJFVk9LRXxST0xFfFJPTExCQUNLfFJPTExVUHxST1VUSU5FfFJPV3xST1dDT1VOVHxST1dHVUlEQ09MfFJPV1N8UlVMRXxTQVZFfFNBVkVQT0lOVHxTQ0hFTUF8U0NPUEV8U0NST0xMfFNFQVJDSHxTRUNPTkR8U0VDVElPTnxTRUNVUklUWUFVRElUfFNFTEVDVHxTRU1BTlRJQ0tFWVBIUkFTRVRBQkxFfFNFTUFOVElDU0lNSUxBUklUWURFVEFJTFNUQUJMRXxTRU1BTlRJQ1NJTUlMQVJJVFlUQUJMRXxTRU5TSVRJVkV8U0VRVUVOQ0V8U0VTU0lPTnxTRVR8U0VUU3xTRVRVU0VSfFNIVVRET1dOfFNJTUlMQVJ8U0laRXxTT01FfFNQRUNJRklDfFNQRUNJRklDVFlQRXxTUUx8U1FMQ0F8U1FMQ09ERXxTUUxFUlJPUnxTUUxFWENFUFRJT058U1FMU1RBVEV8U1FMV0FSTklOR3xTVEFSVHxTVEFURXxTVEFURU1FTlR8U1RBVElDfFNUQVRJU1RJQ1N8U1REREVWX1BPUHxTVERERVZfU0FNUHxTVFJVQ1RVUkV8U1VCTVVMVElTRVR8U1VCU1RSSU5HX1JFR0VYfFNUUklOR19TUExJVHxTWU1NRVRSSUN8U1lTVEVNfFRBQkxFU0FNUExFfFRFTVBPUkFSWXxURVJNSU5BVEV8VEVYVFNJWkV8VEhBTnxUSEVOfFRJTUVaT05FX0hPVVJ8VElNRVpPTkVfTUlOVVRFfFRPfFRPUHxUUkFJTElOR3xUUkFOfFRSQU5TQUNUSU9OfFRSQU5TTEFURXxUUkFOU0xBVEVfUkVHRVh8VFJBTlNMQVRJT058VFJFQVR8VFJJR0dFUnxUUklNfFRSVU5DQVRFfFRTRVFVQUx8VUVTQ0FQRXxVTkRFUnxVTklPTnxVTklRVUV8VU5LTk9XTnxVTk5FU1R8VU5QSVZPVHxVUERBVEV8VVBEQVRFVEVYVHxVU0FHRXxVU0V8VVNFUnxVU0lOR3xWQUxVRXxWQUxVRVN8VkFSSUFCTEV8VkFSWUlOR3xWQVJfUE9QfFZBUl9TQU1QfFZJRVd8V0FJVEZPUnxXSEVOfFdIRU5FVkVSfFdIRVJFfFdISUxFfFdJRFRIX0JVQ0tFVHxXSU5ET1d8V0lUSHxXSVRISU58V0lUSElOIEdST1VQfFdJVEhPVVR8V09SS3xXUklURXxXUklURVRFWFR8WE1MQUdHfFhNTEFUVFJJQlVURVN8WE1MQklOQVJZfFhNTENBU1R8WE1MQ09NTUVOVHxYTUxDT05DQVR8WE1MRE9DVU1FTlR8WE1MRUxFTUVOVHxYTUxFWElTVFN8WE1MRk9SRVNUfFhNTElURVJBVEV8WE1MTkFNRVNQQUNFU3xYTUxQQVJTRXxYTUxQSXxYTUxRVUVSWXxYTUxTRVJJQUxJWkV8WE1MVEFCTEV8WE1MVEVYVHxYTUxWQUxJREFURXxaT05FXCI7XG4gICAgXG4gICAgXG4gICAgLy8gTWljcm9zb2Z0J3Mga2V5d29yZCBsaXN0IGlzIG1pc3NpbmcgYSBsb3Qgb2YgdGhpbmdzIHRoYXQgYXJlIGxvY2F0ZWQgb24gdmFyaW91cyBvdGhlciBwYWdlc1xuICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODczNzMuYXNweCwgaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4MTcxNC5hc3B4XG4gICAga2V5d29yZHMgKz0gXCJ8S0VFUElERU5USVRZfEtFRVBERUZBVUxUU3xJR05PUkVfQ09OU1RSQUlOVFN8SUdOT1JFX1RSSUdHRVJTfFhMT0NLfEZPUkNFU0NBTnxGT1JDRVNFRUt8SE9MRExPQ0t8Tk9MT0NLfE5PV0FJVHxQQUdMT0NLfFJFQURDT01NSVRURUR8UkVBRENPTU1JVFRFRExPQ0t8UkVBRFBBU1R8UkVBRFVOQ09NTUlUVEVEfFJFUEVBVEFCTEVSRUFEfFJPV0xPQ0t8U0VSSUFMSVpBQkxFfFNOQVBTSE9UfFNQQVRJQUxfV0lORE9XX01BWF9DRUxMU3xUQUJMT0NLfFRBQkxPQ0tYfFVQRExPQ0t8WExPQ0t8SUdOT1JFX05PTkNMVVNURVJFRF9DT0xVTU5TVE9SRV9JTkRFWHxFWFBBTkR8VklFV1N8RkFTVHxGT1JDRXxLRUVQfEtFRVBGSVhFRHxNQVhET1B8TUFYUkVDVVJTSU9OfE9QVElNSVpFfFBBUkFNRVRFUklaQVRJT058U0lNUExFfEZPUkNFRHxSRUNPTVBJTEV8Uk9CVVNUfFBMQU58U1BBVElBTF9XSU5ET1dfTUFYX0NFTExTfE5PRVhQQU5EfEhJTlRcIjtcbiAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zMTczODE1LmFzcHhcbiAgICBrZXl3b3JkcyArPSBcInxMT09QfEhBU0h8TUVSR0V8UkVNT1RFXCI7XG4gICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE3NTk3Ni5hc3B4XG4gICAga2V5d29yZHMgKz0gXCJ8VFJZfENBVENIfFRIUk9XXCI7XG4gICAgLy8gaGlnaGxpZ2h0ZWQgd29yZHMgaW4gU1NNUyB0aGF0IEknbSBub3QgZXZlbiBzdXJlIHdoZXJlIHRoZXkgY29tZSBmcm9tXG4gICAga2V5d29yZHMgKz0gXCJ8VFlQRVwiO1xuICAgIFxuICAgIFxuICAgIC8vcmVtb3ZlIHNwZWNpZmljIGJ1aWx0IGluIHR5cGVzIGZyb20ga2V5d29yZCBsaXN0XG4gICAga2V5d29yZHMgPSBrZXl3b3Jkcy5zcGxpdCgnfCcpO1xuICAgIGtleXdvcmRzID0ga2V5d29yZHMuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICByZXR1cm4gbG9naWNhbE9wZXJhdG9ycy5zcGxpdCgnfCcpLmluZGV4T2YodmFsdWUpID09PSAtMSAmJiBidWlsdGluRnVuY3Rpb25zLnNwbGl0KCd8JykuaW5kZXhPZih2YWx1ZSkgPT09IC0xICYmIGRhdGFUeXBlcy5zcGxpdCgnfCcpLmluZGV4T2YodmFsdWUpID09PSAtMTtcbiAgICB9KTtcbiAgICBrZXl3b3JkcyA9IGtleXdvcmRzLnNvcnQoKS5qb2luKCd8Jyk7XG4gICAgXG4gICAgXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGxvZ2ljYWxPcGVyYXRvcnMsXG4gICAgICAgIFwic3RvcmFnZS50eXBlXCI6IGRhdGFUeXBlcyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnMsXG4gICAgICAgIFwic3VwcG9ydC5zdG9yZWRwcm9jZWR1cmVcIjogYnVpbHRJblN0b3JlZFByb2NlZHVyZXMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3Jkc1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcbiAgICBcbiAgICBcbiAgICAvL2h0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxOTAzNTYuYXNweFxuICAgIHZhciBzZXRTdGF0ZW1lbnRzID0gXCJTRVQgQU5TSV9ERUZBVUxUU3xTRVQgQU5TSV9OVUxMU3xTRVQgQU5TSV9OVUxMX0RGTFRfT0ZGfFNFVCBBTlNJX05VTExfREZMVF9PTnxTRVQgQU5TSV9QQURESU5HfFNFVCBBTlNJX1dBUk5JTkdTfFNFVCBBUklUSEFCT1JUfFNFVCBBUklUSElHTk9SRXxTRVQgQ09OQ0FUX05VTExfWUlFTERTX05VTEx8U0VUIENVUlNPUl9DTE9TRV9PTl9DT01NSVR8U0VUIERBVEVGSVJTVHxTRVQgREFURUZPUk1BVHxTRVQgREVBRExPQ0tfUFJJT1JJVFl8U0VUIEZJUFNfRkxBR0dFUnxTRVQgRk1UT05MWXxTRVQgRk9SQ0VQTEFOfFNFVCBJREVOVElUWV9JTlNFUlR8U0VUIElNUExJQ0lUX1RSQU5TQUNUSU9OU3xTRVQgTEFOR1VBR0V8U0VUIExPQ0tfVElNRU9VVHxTRVQgTk9DT1VOVHxTRVQgTk9FWEVDfFNFVCBOVU1FUklDX1JPVU5EQUJPUlR8U0VUIE9GRlNFVFN8U0VUIFBBUlNFT05MWXxTRVQgUVVFUllfR09WRVJOT1JfQ09TVF9MSU1JVHxTRVQgUVVPVEVEX0lERU5USUZJRVJ8U0VUIFJFTU9URV9QUk9DX1RSQU5TQUNUSU9OU3xTRVQgUk9XQ09VTlR8U0VUIFNIT1dQTEFOX0FMTHxTRVQgU0hPV1BMQU5fVEVYVHxTRVQgU0hPV1BMQU5fWE1MfFNFVCBTVEFUSVNUSUNTIElPfFNFVCBTVEFUSVNUSUNTIFBST0ZJTEV8U0VUIFNUQVRJU1RJQ1MgVElNRXxTRVQgU1RBVElTVElDUyBYTUx8U0VUIFRFWFRTSVpFfFNFVCBYQUNUX0FCT1JUXCIuc3BsaXQoJ3wnKTtcbiAgICB2YXIgaXNvbGF0aW9uTGV2ZWxzID0gXCJSRUFEIFVOQ09NTUlUVEVEfFJFQUQgQ09NTUlUVEVEfFJFUEVBVEFCTEUgUkVBRHxTTkFQU0hPUHxTRVJJQUxJWkFCTEVcIi5zcGxpdCgnfCcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXNvbGF0aW9uTGV2ZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNldFN0YXRlbWVudHMucHVzaCgnU0VUIFRSQU5TQUNUSU9OIElTT0xBVElPTiBMRVZFTCAnICsgaXNvbGF0aW9uTGV2ZWxzW2ldKTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleDogXCInXCIsXG4gICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJycvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCInXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi0tLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgc3RhcnQ6IFwiL1xcXFwqXCIsXG4gICAgICAgICAgICBlbmQ6IFwiXFxcXCovXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXg6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleDogXCJAezAsMn1bYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYig/IV0pXCIgLy91cCB0byAyIEBzeW1ib2xzIGZvciBzb21lIGJ1aWx0IGluIGZ1bmN0aW9uc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jbGFzc1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiQEA/W2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICAvL2h0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxNzQ5ODYuYXNweFxuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCt8XFxcXC18XFxcXC98XFxcXC9cXFxcL3wlfDxAPnxAPnw8QHwmfFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fD18XFxcXCpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcKF1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcKV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiLHw7XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgfV0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIC8vYWRkIGVhY2ggc2V0IHN0YXRtZW50IGFzIHJlZ2V4IGF0IHRvcCBvZiBydWxlcyBzbyB0aGF0IHRoZXkgYXJlIHByb2Nlc3NlZCBmaXJzdCBiZWNhdXNlIHRoZXkgcmVxdWlyZSBtdWx0aXBsZSB3b3Jkc1xuICAgIC8vbm90ZTogdGhpcyBtYWtlcyB0aGUgc3RhdGVtZW50cyBub3QgbWF0Y2ggaWYgdGhleSBhcmUgbm90IHVwcGVyIGNhc2UuLiB3aGljaCBpcyBub3QgaWRlYWwgYnV0IEkgZG9uJ3Qga25vdyBvZiBhbiBlYXN5IHdheSB0byBmaXggdGhpc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0U3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLiRydWxlcy5zdGFydC51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRva2VuOiBcInNldC5zdGF0ZW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzZXRTdGF0ZW1lbnRzW2ldXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIiwgW0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIildKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG4gICAgXG4gICAgXG4gICAgLy9wcmVwYXJlIGN1c3RvbSBrZXl3b3JkIGNvbXBsZXRpb25zIHVzZWQgYnkgbW9kZSB0byBvdmVycmlkZSBkZWZhdWx0IGNvbXBsZXRvclxuICAgIC8vdGhpcyBhbGxvd3MgZm9yIGN1c3RvbSAnbWV0YScgYW5kIHByb3BlciBjYXNlIG9mIGNvbXBsZXRpb25zXG4gICAgdmFyIGNvbXBsZXRpb25zID0gW107XG4gICAgdmFyIGFkZENvbXBsZXRpb25zID0gZnVuY3Rpb24oYXJyLCBtZXRhKSB7XG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIGNvbXBsZXRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IHYsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgICAgICAgbWV0YTogbWV0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgYWRkQ29tcGxldGlvbnMoYnVpbHRJblN0b3JlZFByb2NlZHVyZXMuc3BsaXQoJ3wnKSwgJ3Byb2NlZHVyZScpO1xuICAgIGFkZENvbXBsZXRpb25zKGxvZ2ljYWxPcGVyYXRvcnMuc3BsaXQoJ3wnKSwgJ29wZXJhdG9yJyk7XG4gICAgYWRkQ29tcGxldGlvbnMoYnVpbHRpbkZ1bmN0aW9ucy5zcGxpdCgnfCcpLCAnZnVuY3Rpb24nKTtcbiAgICBhZGRDb21wbGV0aW9ucyhkYXRhVHlwZXMuc3BsaXQoJ3wnKSwgJ3R5cGUnKTtcbiAgICBhZGRDb21wbGV0aW9ucyhzZXRTdGF0ZW1lbnRzLCAnc3RhdGVtZW50Jyk7XG4gICAgYWRkQ29tcGxldGlvbnMoa2V5d29yZHMuc3BsaXQoJ3wnKSwgJ2tleXdvcmQnKTtcbiAgICBcbiAgICB0aGlzLmNvbXBsZXRpb25zID0gY29tcGxldGlvbnM7XG59O1xuXG5vb3AuaW5oZXJpdHMoU3FsU2VydmVySGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU3FsSGlnaGxpZ2h0UnVsZXMgPSBTcWxTZXJ2ZXJIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==