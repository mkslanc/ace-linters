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
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
var require_asl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ASLHighlightRules$1 = function() {
		var keywords = "Default|DefinitionBlock|Device|Method|Else|ElseIf|For|Function|If|Include|Method|Return|Scope|Switch|Case|While|Break|BreakPoint|Continue|NoOp|Wait|True|False|AccessAs|Acquire|Alias|BankField|Buffer|Concatenate|ConcatenateResTemplate|CondRefOf|Connection|CopyObject|CreateBitField|CreateByteField|CreateDWordField|CreateField|CreateQWordField|CreateWordField|DataTableRegion|Debug|DMA|DWordIO|DWordMemory|DWordSpace|EisaId|EISAID|EndDependentFn|Event|ExtendedIO|ExtendedMemory|ExtendedSpace|External|Fatal|Field|FindSetLeftBit|FindSetRightBit|FixedDMA|FixedIO|Fprintf|FromBCD|GpioInt|GpioIo|I2CSerialBusV2|IndexField|Interrupt|IO|IRQ|IRQNoFlags|Load|LoadTable|Match|Memory32|Memory32Fixed|Mid|Mutex|Name|Notify|Offset|ObjectType|OperationRegion|Package|PowerResource|Printf|QWordIO|QWordMemory|QWordSpace|RawDataBuffer|Register|Release|Reset|ResourceTemplate|Signal|SizeOf|Sleep|SPISerialBusV2|Stall|StartDependentFn|StartDependentFnNoPri|Store|ThermalZone|Timer|ToBCD|ToBuffer|ToDecimalString|ToInteger|ToPLD|ToString|ToUUID|UARTSerialBusV2|Unicode|Unload|VendorLong|VendorShort|WordBusNumber|WordIO|WordSpace";
		var keywordOperators = "Add|And|Decrement|Divide|Increment|Index|LAnd|LEqual|LGreater|LGreaterEqual|LLess|LLessEqual|LNot|LNotEqual|LOr|Mod|Multiply|NAnd|NOr|Not|Or|RefOf|Revision|ShiftLeft|ShiftRight|Subtract|XOr|DerefOf";
		var flags = "AttribQuick|AttribSendReceive|AttribByte|AttribBytes|AttribRawBytes|AttribRawProcessBytes|AttribWord|AttribBlock|AttribProcessCall|AttribBlockProcessCall|AnyAcc|ByteAcc|WordAcc|DWordAcc|QWordAcc|BufferAcc|AddressRangeMemory|AddressRangeReserved|AddressRangeNVS|AddressRangeACPI|RegionSpaceKeyword|FFixedHW|PCC|AddressingMode7Bit|AddressingMode10Bit|DataBitsFive|DataBitsSix|DataBitsSeven|DataBitsEight|DataBitsNine|BusMaster|NotBusMaster|ClockPhaseFirst|ClockPhaseSecond|ClockPolarityLow|ClockPolarityHigh|SubDecode|PosDecode|BigEndianing|LittleEndian|FlowControlNone|FlowControlXon|FlowControlHardware|Edge|Level|ActiveHigh|ActiveLow|ActiveBoth|Decode16|Decode10|IoRestrictionNone|IoRestrictionInputOnly|IoRestrictionOutputOnly|IoRestrictionNoneAndPreserve|Lock|NoLock|MTR|MEQ|MLE|MLT|MGE|MGT|MaxFixed|MaxNotFixed|Cacheable|WriteCombining|Prefetchable|NonCacheable|MinFixed|MinNotFixed|ParityTypeNone|ParityTypeSpace|ParityTypeMark|ParityTypeOdd|ParityTypeEven|PullDefault|PullUp|PullDown|PullNone|PolarityHigh|PolarityLow|ISAOnlyRanges|NonISAOnlyRanges|EntireRange|ReadWrite|ReadOnly|UserDefRegionSpace|SystemIO|SystemMemory|PCI_Config|EmbeddedControl|SMBus|SystemCMOS|PciBarTarget|IPMI|GeneralPurposeIO|GenericSerialBus|ResourceConsumer|ResourceProducer|Serialized|NotSerialized|Shared|Exclusive|SharedAndWake|ExclusiveAndWake|ControllerInitiated|DeviceInitiated|StopBitsZero|StopBitsOne|StopBitsOnePlusHalf|StopBitsTwo|Width8Bit|Width16Bit|Width32Bit|Width64Bit|Width128Bit|Width256Bit|SparseTranslation|DenseTranslation|TypeTranslation|TypeStatic|Preserve|WriteAsOnes|WriteAsZeros|Transfer8|Transfer16|Transfer8_16|ThreeWireMode|FourWireMode";
		var storageTypes = "UnknownObj|IntObj|StrObj|BuffObj|PkgObj|FieldUnitObj|DeviceObj|EventObj|MethodObj|MutexObj|OpRegionObj|PowerResObj|ProcessorObj|ThermalZoneObj|BuffFieldObj|DDBHandleObj";
		var builtinConstants = "__FILE__|__PATH__|__LINE__|__DATE__|__IASL__";
		var strNumbers = "One|Ones|Zero";
		var deprecated = "Memory24|Processor";
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
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\[",
					next: "ignoredfield"
				},
				{
					token: "variable",
					regex: "\\Local[0-7]|\\Arg[0-6]"
				},
				{
					token: "keyword",
					regex: "#\\s*(?:define|elif|else|endif|error|if|ifdef|ifndef|include|includebuffer|line|pragma|undef|warning)\\b",
					next: "directive"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "constant.character",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "constant.numeric",
					regex: /0[xX][0-9a-fA-F]+\b/
				},
				{
					token: "constant.numeric",
					regex: /[0-9]+\b/
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: /[!\~\*\/%+-<>\^|=&]/
				},
				{
					token: "lparen",
					regex: "[[({]"
				},
				{
					token: "rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"ignoredfield": [{
				token: "comment",
				regex: "\\]",
				next: "start"
			}, { defaultToken: "comment" }],
			"directive": [
				{
					token: "constant.other.multiline",
					regex: /\\/
				},
				{
					token: "constant.other.multiline",
					regex: /.*\\/
				},
				{
					token: "constant.other",
					regex: "\\s*<.+?>*s",
					next: "start"
				},
				{
					token: "constant.other",
					regex: "\\s*[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]*s",
					next: "start"
				},
				{
					token: "constant.other",
					regex: "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
					next: "start"
				},
				{
					token: "constant.other",
					regex: /[^\\\/]+/,
					next: "start"
				}
			]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop$1.inherits(ASLHighlightRules$1, TextHighlightRules);
	exports.ASLHighlightRules = ASLHighlightRules$1;
}));
var require_asl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ASLHighlightRules = require_asl_highlight_rules().ASLHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = ASLHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/asl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_asl();
