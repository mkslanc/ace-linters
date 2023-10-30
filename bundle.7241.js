"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7241],{

/***/ 37241:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var ASLHighlightRules = (__webpack_require__(28999)/* .ASLHighlightRules */ .M);
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function () {
    this.HighlightRules = ASLHighlightRules;
    this.foldingRules = new FoldMode();
        this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function () {
    this.$id = "ace/mode/asl";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 28999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

    var ASLHighlightRules = function() {
        var keywords = (
            "Default|DefinitionBlock|Device|Method|Else|ElseIf|For|Function|If|Include|Method|Return|" +
            "Scope|Switch|Case|While|Break|BreakPoint|Continue|NoOp|Wait|True|False|" +
            "AccessAs|Acquire|Alias|BankField|Buffer|Concatenate|ConcatenateResTemplate|" +
            "CondRefOf|Connection|CopyObject|CreateBitField|CreateByteField|CreateDWordField|" +
            "CreateField|CreateQWordField|CreateWordField|DataTableRegion|Debug|" +
            "DMA|DWordIO|DWordMemory|DWordSpace|EisaId|EISAID|EndDependentFn|Event|ExtendedIO|" +
            "ExtendedMemory|ExtendedSpace|External|Fatal|Field|FindSetLeftBit|FindSetRightBit|" +
            "FixedDMA|FixedIO|Fprintf|FromBCD|GpioInt|GpioIo|I2CSerialBusV2|IndexField|" +
            "Interrupt|IO|IRQ|IRQNoFlags|Load|LoadTable|Match|Memory32|Memory32Fixed|" +
            "Mid|Mutex|Name|Notify|Offset|ObjectType|OperationRegion|Package|PowerResource|Printf|" +
            "QWordIO|QWordMemory|QWordSpace|RawDataBuffer|Register|Release|Reset|ResourceTemplate|" +
            "Signal|SizeOf|Sleep|SPISerialBusV2|Stall|StartDependentFn|StartDependentFnNoPri|" +
            "Store|ThermalZone|Timer|ToBCD|ToBuffer|ToDecimalString|ToInteger|ToPLD|ToString|" +
            "ToUUID|UARTSerialBusV2|Unicode|Unload|VendorLong|VendorShort|WordBusNumber|WordIO|" +
            "WordSpace"
        );

        var keywordOperators = (
            "Add|And|Decrement|Divide|Increment|Index|LAnd|LEqual|LGreater|LGreaterEqual|" +
            "LLess|LLessEqual|LNot|LNotEqual|LOr|Mod|Multiply|NAnd|NOr|Not|Or|RefOf|Revision|" +
            "ShiftLeft|ShiftRight|Subtract|XOr|DerefOf"
        );

        var flags = (
            "AttribQuick|AttribSendReceive|AttribByte|AttribBytes|AttribRawBytes|" +
            "AttribRawProcessBytes|AttribWord|AttribBlock|AttribProcessCall|AttribBlockProcessCall|" +
            "AnyAcc|ByteAcc|WordAcc|DWordAcc|QWordAcc|BufferAcc|" +
            "AddressRangeMemory|AddressRangeReserved|AddressRangeNVS|AddressRangeACPI|" +
            "RegionSpaceKeyword|FFixedHW|PCC|" +
            "AddressingMode7Bit|AddressingMode10Bit|" +
            "DataBitsFive|DataBitsSix|DataBitsSeven|DataBitsEight|DataBitsNine|" +
            "BusMaster|NotBusMaster|" +
            "ClockPhaseFirst|ClockPhaseSecond|ClockPolarityLow|ClockPolarityHigh|" +
            "SubDecode|PosDecode|" +
            "BigEndianing|LittleEndian|" +
            "FlowControlNone|FlowControlXon|FlowControlHardware|" +
            "Edge|Level|ActiveHigh|ActiveLow|ActiveBoth|Decode16|Decode10|" +
            "IoRestrictionNone|IoRestrictionInputOnly|IoRestrictionOutputOnly|" +
            "IoRestrictionNoneAndPreserve|Lock|NoLock|MTR|MEQ|MLE|MLT|MGE|MGT|" +
            "MaxFixed|MaxNotFixed|Cacheable|WriteCombining|Prefetchable|NonCacheable|" +
            "MinFixed|MinNotFixed|" +
            "ParityTypeNone|ParityTypeSpace|ParityTypeMark|ParityTypeOdd|ParityTypeEven|" +
            "PullDefault|PullUp|PullDown|PullNone|PolarityHigh|PolarityLow|" +
            "ISAOnlyRanges|NonISAOnlyRanges|EntireRange|ReadWrite|ReadOnly|" +
            "UserDefRegionSpace|SystemIO|SystemMemory|PCI_Config|EmbeddedControl|" +
            "SMBus|SystemCMOS|PciBarTarget|IPMI|GeneralPurposeIO|GenericSerialBus|" +
            "ResourceConsumer|ResourceProducer|Serialized|NotSerialized|" +
            "Shared|Exclusive|SharedAndWake|ExclusiveAndWake|ControllerInitiated|DeviceInitiated|" +
            "StopBitsZero|StopBitsOne|StopBitsOnePlusHalf|StopBitsTwo|" +
            "Width8Bit|Width16Bit|Width32Bit|Width64Bit|Width128Bit|Width256Bit|" +
            "SparseTranslation|DenseTranslation|TypeTranslation|TypeStatic|" +
            "Preserve|WriteAsOnes|WriteAsZeros|Transfer8|Transfer16|Transfer8_16|" +
            "ThreeWireMode|FourWireMode"
        );

        var storageTypes = (
            "UnknownObj|IntObj|StrObj|BuffObj|PkgObj|FieldUnitObj|DeviceObj|" +
            "EventObj|MethodObj|MutexObj|OpRegionObj|PowerResObj|ProcessorObj|" +
            "ThermalZoneObj|BuffFieldObj|DDBHandleObj"
        );

        var builtinConstants = (
            "__FILE__|__PATH__|__LINE__|__DATE__|__IASL__"
        );

        var strNumbers = (
            "One|Ones|Zero"
        );

        var deprecated = (
            "Memory24|Processor"
        );

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.numeric": strNumbers,
            "keyword.operator": keywordOperators,
            "constant.language": builtinConstants,
            "storage.type": storageTypes,
            "constant.library": flags,
            "invalid.deprecated": deprecated
        }, "identifier");

        this.$rules = {
            "start" : [
                {
                    token : "comment",
                    regex : "\\/\\/.*$"
                },
                DocCommentHighlightRules.getStartRule("doc-start"),
                {
                    token : "comment", // multi line comment
                    regex : "\\/\\*",
                    next : "comment"
                },
                DocCommentHighlightRules.getStartRule("doc-start"),
                {
                    token : "comment", // ignored fields / comments
                    regex : "\\\[",
                    next : "ignoredfield"
                }, {
                    token : "variable",
                    regex : "\\Local[0-7]|\\Arg[0-6]"
                }, {
                    token : "keyword", // pre-compiler directives
                    regex : "#\\s*(?:define|elif|else|endif|error|if|ifdef|ifndef|include|includebuffer|line|pragma|undef|warning)\\b",
                    next  : "directive"
                }, {
                    token : "string", // single line
                    regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
                }, {
                    token : "constant.character", // single line
                    regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                }, {
                    token : "constant.numeric", // hex
                    regex : /0[xX][0-9a-fA-F]+\b/
                }, {
                    token : "constant.numeric",
                    regex : /[0-9]+\b/
                }, {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token : "keyword.operator",
                    regex : /[!\~\*\/%+-<>\^|=&]/
                }, {
                    token : "lparen",
                    regex : "[[({]"
                }, {
                    token : "rparen",
                    regex : "[\\])}]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }
            ],
            "comment" : [
                {
                    token : "comment", // closing comment
                    regex : "\\*\\/",
                    next : "start"
                }, {
                    defaultToken : "comment"
                }
            ],
            "ignoredfield" : [
                {
                    token : "comment", // closing ignored fields / comments
                    regex : "\\\]",
                    next : "start"
                }, {
                    defaultToken : "comment"
                }
            ],
            "directive" : [
                {
                    token : "constant.other.multiline",
                    regex : /\\/
                },
                {
                    token : "constant.other.multiline",
                    regex : /.*\\/
                },
                {
                    token : "constant.other",
                    regex : "\\s*<.+?>*s",
                    next : "start"
                },
                {
                    token : "constant.other", // single line
                    regex : '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]*s',
                    next : "start"
                },
                {
                    token : "constant.other", // single line
                    regex : "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
                    next : "start"
                },
                // "\" implies multiline, while "/" implies comment
                {
                    token : "constant.other",
                    regex : /[^\\\/]+/,
                    next : "start"
                }
            ]
        };

        this.embedRules(DocCommentHighlightRules, "doc-",
            [ DocCommentHighlightRules.getEndRule("start") ]);
    };

    oop.inherits(ASLHighlightRules, TextHighlightRules);

    exports.M = ASLHighlightRules;


/***/ }),

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
                defaultToken: "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2FzbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2FzbF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEFTTEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vYXNsX2hpZ2hsaWdodF9ydWxlc1wiKS5BU0xIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQVNMSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICAgICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9hc2xcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIHZhciBBU0xIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcIkRlZmF1bHR8RGVmaW5pdGlvbkJsb2NrfERldmljZXxNZXRob2R8RWxzZXxFbHNlSWZ8Rm9yfEZ1bmN0aW9ufElmfEluY2x1ZGV8TWV0aG9kfFJldHVybnxcIiArXG4gICAgICAgICAgICBcIlNjb3BlfFN3aXRjaHxDYXNlfFdoaWxlfEJyZWFrfEJyZWFrUG9pbnR8Q29udGludWV8Tm9PcHxXYWl0fFRydWV8RmFsc2V8XCIgK1xuICAgICAgICAgICAgXCJBY2Nlc3NBc3xBY3F1aXJlfEFsaWFzfEJhbmtGaWVsZHxCdWZmZXJ8Q29uY2F0ZW5hdGV8Q29uY2F0ZW5hdGVSZXNUZW1wbGF0ZXxcIiArXG4gICAgICAgICAgICBcIkNvbmRSZWZPZnxDb25uZWN0aW9ufENvcHlPYmplY3R8Q3JlYXRlQml0RmllbGR8Q3JlYXRlQnl0ZUZpZWxkfENyZWF0ZURXb3JkRmllbGR8XCIgK1xuICAgICAgICAgICAgXCJDcmVhdGVGaWVsZHxDcmVhdGVRV29yZEZpZWxkfENyZWF0ZVdvcmRGaWVsZHxEYXRhVGFibGVSZWdpb258RGVidWd8XCIgK1xuICAgICAgICAgICAgXCJETUF8RFdvcmRJT3xEV29yZE1lbW9yeXxEV29yZFNwYWNlfEVpc2FJZHxFSVNBSUR8RW5kRGVwZW5kZW50Rm58RXZlbnR8RXh0ZW5kZWRJT3xcIiArXG4gICAgICAgICAgICBcIkV4dGVuZGVkTWVtb3J5fEV4dGVuZGVkU3BhY2V8RXh0ZXJuYWx8RmF0YWx8RmllbGR8RmluZFNldExlZnRCaXR8RmluZFNldFJpZ2h0Qml0fFwiICtcbiAgICAgICAgICAgIFwiRml4ZWRETUF8Rml4ZWRJT3xGcHJpbnRmfEZyb21CQ0R8R3Bpb0ludHxHcGlvSW98STJDU2VyaWFsQnVzVjJ8SW5kZXhGaWVsZHxcIiArXG4gICAgICAgICAgICBcIkludGVycnVwdHxJT3xJUlF8SVJRTm9GbGFnc3xMb2FkfExvYWRUYWJsZXxNYXRjaHxNZW1vcnkzMnxNZW1vcnkzMkZpeGVkfFwiICtcbiAgICAgICAgICAgIFwiTWlkfE11dGV4fE5hbWV8Tm90aWZ5fE9mZnNldHxPYmplY3RUeXBlfE9wZXJhdGlvblJlZ2lvbnxQYWNrYWdlfFBvd2VyUmVzb3VyY2V8UHJpbnRmfFwiICtcbiAgICAgICAgICAgIFwiUVdvcmRJT3xRV29yZE1lbW9yeXxRV29yZFNwYWNlfFJhd0RhdGFCdWZmZXJ8UmVnaXN0ZXJ8UmVsZWFzZXxSZXNldHxSZXNvdXJjZVRlbXBsYXRlfFwiICtcbiAgICAgICAgICAgIFwiU2lnbmFsfFNpemVPZnxTbGVlcHxTUElTZXJpYWxCdXNWMnxTdGFsbHxTdGFydERlcGVuZGVudEZufFN0YXJ0RGVwZW5kZW50Rm5Ob1ByaXxcIiArXG4gICAgICAgICAgICBcIlN0b3JlfFRoZXJtYWxab25lfFRpbWVyfFRvQkNEfFRvQnVmZmVyfFRvRGVjaW1hbFN0cmluZ3xUb0ludGVnZXJ8VG9QTER8VG9TdHJpbmd8XCIgK1xuICAgICAgICAgICAgXCJUb1VVSUR8VUFSVFNlcmlhbEJ1c1YyfFVuaWNvZGV8VW5sb2FkfFZlbmRvckxvbmd8VmVuZG9yU2hvcnR8V29yZEJ1c051bWJlcnxXb3JkSU98XCIgK1xuICAgICAgICAgICAgXCJXb3JkU3BhY2VcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBrZXl3b3JkT3BlcmF0b3JzID0gKFxuICAgICAgICAgICAgXCJBZGR8QW5kfERlY3JlbWVudHxEaXZpZGV8SW5jcmVtZW50fEluZGV4fExBbmR8TEVxdWFsfExHcmVhdGVyfExHcmVhdGVyRXF1YWx8XCIgK1xuICAgICAgICAgICAgXCJMTGVzc3xMTGVzc0VxdWFsfExOb3R8TE5vdEVxdWFsfExPcnxNb2R8TXVsdGlwbHl8TkFuZHxOT3J8Tm90fE9yfFJlZk9mfFJldmlzaW9ufFwiICtcbiAgICAgICAgICAgIFwiU2hpZnRMZWZ0fFNoaWZ0UmlnaHR8U3VidHJhY3R8WE9yfERlcmVmT2ZcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBmbGFncyA9IChcbiAgICAgICAgICAgIFwiQXR0cmliUXVpY2t8QXR0cmliU2VuZFJlY2VpdmV8QXR0cmliQnl0ZXxBdHRyaWJCeXRlc3xBdHRyaWJSYXdCeXRlc3xcIiArXG4gICAgICAgICAgICBcIkF0dHJpYlJhd1Byb2Nlc3NCeXRlc3xBdHRyaWJXb3JkfEF0dHJpYkJsb2NrfEF0dHJpYlByb2Nlc3NDYWxsfEF0dHJpYkJsb2NrUHJvY2Vzc0NhbGx8XCIgK1xuICAgICAgICAgICAgXCJBbnlBY2N8Qnl0ZUFjY3xXb3JkQWNjfERXb3JkQWNjfFFXb3JkQWNjfEJ1ZmZlckFjY3xcIiArXG4gICAgICAgICAgICBcIkFkZHJlc3NSYW5nZU1lbW9yeXxBZGRyZXNzUmFuZ2VSZXNlcnZlZHxBZGRyZXNzUmFuZ2VOVlN8QWRkcmVzc1JhbmdlQUNQSXxcIiArXG4gICAgICAgICAgICBcIlJlZ2lvblNwYWNlS2V5d29yZHxGRml4ZWRIV3xQQ0N8XCIgK1xuICAgICAgICAgICAgXCJBZGRyZXNzaW5nTW9kZTdCaXR8QWRkcmVzc2luZ01vZGUxMEJpdHxcIiArXG4gICAgICAgICAgICBcIkRhdGFCaXRzRml2ZXxEYXRhQml0c1NpeHxEYXRhQml0c1NldmVufERhdGFCaXRzRWlnaHR8RGF0YUJpdHNOaW5lfFwiICtcbiAgICAgICAgICAgIFwiQnVzTWFzdGVyfE5vdEJ1c01hc3RlcnxcIiArXG4gICAgICAgICAgICBcIkNsb2NrUGhhc2VGaXJzdHxDbG9ja1BoYXNlU2Vjb25kfENsb2NrUG9sYXJpdHlMb3d8Q2xvY2tQb2xhcml0eUhpZ2h8XCIgK1xuICAgICAgICAgICAgXCJTdWJEZWNvZGV8UG9zRGVjb2RlfFwiICtcbiAgICAgICAgICAgIFwiQmlnRW5kaWFuaW5nfExpdHRsZUVuZGlhbnxcIiArXG4gICAgICAgICAgICBcIkZsb3dDb250cm9sTm9uZXxGbG93Q29udHJvbFhvbnxGbG93Q29udHJvbEhhcmR3YXJlfFwiICtcbiAgICAgICAgICAgIFwiRWRnZXxMZXZlbHxBY3RpdmVIaWdofEFjdGl2ZUxvd3xBY3RpdmVCb3RofERlY29kZTE2fERlY29kZTEwfFwiICtcbiAgICAgICAgICAgIFwiSW9SZXN0cmljdGlvbk5vbmV8SW9SZXN0cmljdGlvbklucHV0T25seXxJb1Jlc3RyaWN0aW9uT3V0cHV0T25seXxcIiArXG4gICAgICAgICAgICBcIklvUmVzdHJpY3Rpb25Ob25lQW5kUHJlc2VydmV8TG9ja3xOb0xvY2t8TVRSfE1FUXxNTEV8TUxUfE1HRXxNR1R8XCIgK1xuICAgICAgICAgICAgXCJNYXhGaXhlZHxNYXhOb3RGaXhlZHxDYWNoZWFibGV8V3JpdGVDb21iaW5pbmd8UHJlZmV0Y2hhYmxlfE5vbkNhY2hlYWJsZXxcIiArXG4gICAgICAgICAgICBcIk1pbkZpeGVkfE1pbk5vdEZpeGVkfFwiICtcbiAgICAgICAgICAgIFwiUGFyaXR5VHlwZU5vbmV8UGFyaXR5VHlwZVNwYWNlfFBhcml0eVR5cGVNYXJrfFBhcml0eVR5cGVPZGR8UGFyaXR5VHlwZUV2ZW58XCIgK1xuICAgICAgICAgICAgXCJQdWxsRGVmYXVsdHxQdWxsVXB8UHVsbERvd258UHVsbE5vbmV8UG9sYXJpdHlIaWdofFBvbGFyaXR5TG93fFwiICtcbiAgICAgICAgICAgIFwiSVNBT25seVJhbmdlc3xOb25JU0FPbmx5UmFuZ2VzfEVudGlyZVJhbmdlfFJlYWRXcml0ZXxSZWFkT25seXxcIiArXG4gICAgICAgICAgICBcIlVzZXJEZWZSZWdpb25TcGFjZXxTeXN0ZW1JT3xTeXN0ZW1NZW1vcnl8UENJX0NvbmZpZ3xFbWJlZGRlZENvbnRyb2x8XCIgK1xuICAgICAgICAgICAgXCJTTUJ1c3xTeXN0ZW1DTU9TfFBjaUJhclRhcmdldHxJUE1JfEdlbmVyYWxQdXJwb3NlSU98R2VuZXJpY1NlcmlhbEJ1c3xcIiArXG4gICAgICAgICAgICBcIlJlc291cmNlQ29uc3VtZXJ8UmVzb3VyY2VQcm9kdWNlcnxTZXJpYWxpemVkfE5vdFNlcmlhbGl6ZWR8XCIgK1xuICAgICAgICAgICAgXCJTaGFyZWR8RXhjbHVzaXZlfFNoYXJlZEFuZFdha2V8RXhjbHVzaXZlQW5kV2FrZXxDb250cm9sbGVySW5pdGlhdGVkfERldmljZUluaXRpYXRlZHxcIiArXG4gICAgICAgICAgICBcIlN0b3BCaXRzWmVyb3xTdG9wQml0c09uZXxTdG9wQml0c09uZVBsdXNIYWxmfFN0b3BCaXRzVHdvfFwiICtcbiAgICAgICAgICAgIFwiV2lkdGg4Qml0fFdpZHRoMTZCaXR8V2lkdGgzMkJpdHxXaWR0aDY0Qml0fFdpZHRoMTI4Qml0fFdpZHRoMjU2Qml0fFwiICtcbiAgICAgICAgICAgIFwiU3BhcnNlVHJhbnNsYXRpb258RGVuc2VUcmFuc2xhdGlvbnxUeXBlVHJhbnNsYXRpb258VHlwZVN0YXRpY3xcIiArXG4gICAgICAgICAgICBcIlByZXNlcnZlfFdyaXRlQXNPbmVzfFdyaXRlQXNaZXJvc3xUcmFuc2Zlcjh8VHJhbnNmZXIxNnxUcmFuc2ZlcjhfMTZ8XCIgK1xuICAgICAgICAgICAgXCJUaHJlZVdpcmVNb2RlfEZvdXJXaXJlTW9kZVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHN0b3JhZ2VUeXBlcyA9IChcbiAgICAgICAgICAgIFwiVW5rbm93bk9ianxJbnRPYmp8U3RyT2JqfEJ1ZmZPYmp8UGtnT2JqfEZpZWxkVW5pdE9ianxEZXZpY2VPYmp8XCIgK1xuICAgICAgICAgICAgXCJFdmVudE9ianxNZXRob2RPYmp8TXV0ZXhPYmp8T3BSZWdpb25PYmp8UG93ZXJSZXNPYmp8UHJvY2Vzc29yT2JqfFwiICtcbiAgICAgICAgICAgIFwiVGhlcm1hbFpvbmVPYmp8QnVmZkZpZWxkT2JqfEREQkhhbmRsZU9ialwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSAoXG4gICAgICAgICAgICBcIl9fRklMRV9ffF9fUEFUSF9ffF9fTElORV9ffF9fREFURV9ffF9fSUFTTF9fXCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgc3RyTnVtYmVycyA9IChcbiAgICAgICAgICAgIFwiT25lfE9uZXN8WmVyb1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGRlcHJlY2F0ZWQgPSAoXG4gICAgICAgICAgICBcIk1lbW9yeTI0fFByb2Nlc3NvclwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5udW1lcmljXCI6IHN0ck51bWJlcnMsXG4gICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3JcIjoga2V5d29yZE9wZXJhdG9ycyxcbiAgICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbHRpbkNvbnN0YW50cyxcbiAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCI6IHN0b3JhZ2VUeXBlcyxcbiAgICAgICAgICAgIFwiY29uc3RhbnQubGlicmFyeVwiOiBmbGFncyxcbiAgICAgICAgICAgIFwiaW52YWxpZC5kZXByZWNhdGVkXCI6IGRlcHJlY2F0ZWRcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBpZ25vcmVkIGZpZWxkcyAvIGNvbW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxbXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImlnbm9yZWRmaWVsZFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxMb2NhbFswLTddfFxcXFxBcmdbMC02XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBwcmUtY29tcGlsZXIgZGlyZWN0aXZlc1xuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiI1xcXFxzKig/OmRlZmluZXxlbGlmfGVsc2V8ZW5kaWZ8ZXJyb3J8aWZ8aWZkZWZ8aWZuZGVmfGluY2x1ZGV8aW5jbHVkZWJ1ZmZlcnxsaW5lfHByYWdtYXx1bmRlZnx3YXJuaW5nKVxcXFxiXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJkaXJlY3RpdmVcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogLzBbeFhdWzAtOWEtZkEtRl0rXFxiL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvWzAtOV0rXFxiL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvWyFcXH5cXCpcXC8lKy08PlxcXnw9Jl0vXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaWdub3JlZGZpZWxkXCIgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGlnbm9yZWQgZmllbGRzIC8gY29tbWVudHNcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXF1cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJkaXJlY3RpdmVcIiA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlci5tdWx0aWxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXC9cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyLm11bHRpbGluZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8uKlxcXFwvXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMqPC4rPz4qc1wiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdcXFxccypbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0qcycsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccypbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gXCJcXFwiIGltcGxpZXMgbXVsdGlsaW5lLCB3aGlsZSBcIi9cIiBpbXBsaWVzIGNvbW1lbnRcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9bXlxcXFxcXC9dKy8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgfTtcblxuICAgIG9vcC5pbmhlcml0cyhBU0xIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuQVNMSGlnaGxpZ2h0UnVsZXMgPSBBU0xIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvY1wiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqKD89XFxcXCopXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9