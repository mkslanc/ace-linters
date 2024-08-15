"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9042],{

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

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 39042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RakuHighlightRules = (__webpack_require__(31413)/* .RakuHighlightRules */ .z);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = RakuHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new CStyleFoldMode({start: "^=(begin)\\b", end: "^=(end)\\b"});
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";
    this.blockComment = [
        {start: "=begin", end: "=end", lineStartOnly: true},
        {start: "=item", end: "=end", lineStartOnly: true}
    ];


    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/raku";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 31413:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var RakuHighlightRules = function() {

    var keywords = (
        "my|our|class|role|grammar|is|does|sub|method|submethod|try|" +
        "default|when|if|elsif|else|unless|with|orwith|without|for|given|proceed|" +
        "succeed|loop|while|until|repeat|module|use|need|import|require|unit|" +
        "constant|enum|multi|return|has|token|rule|make|made|proto|state|augment|" +
        "but|anon|supersede|let|subset|gather|returns|return-rw|temp|" +
        "BEGIN|CHECK|INIT|END|CLOSE|ENTER|LEAVE|KEEP|UNDO|PRE|POST|FIRST|NEXT|LAST|CATCH|CONTROL|QUIT|DOC"
    );

    var types = (
        "Any|Array|Associative|AST|atomicint|Attribute|Backtrace|Backtrace::Frame|" +
        "Bag|Baggy|BagHash|Blob|Block|Bool|Buf|Callable|CallFrame|Cancellation|" +
        "Capture|Channel|Code|compiler|Complex|ComplexStr|Cool|CurrentThreadScheduler|" +
        "Cursor|Date|Dateish|DateTime|Distro|Duration|Encoding|Exception|Failure|"+
        "FatRat|Grammar|Hash|HyperWhatever|Instant|Int|IntStr|IO|IO::ArgFiles|"+
        "IO::CatHandle|IO::Handle|IO::Notification|IO::Path|IO::Path::Cygwin|"+
        "IO::Path::QNX|IO::Path::Unix|IO::Path::Win32|IO::Pipe|IO::Socket|"+
        "IO::Socket::Async|IO::Socket::INET|IO::Spec|IO::Spec::Cygwin|IO::Spec::QNX|"+
        "IO::Spec::Unix|IO::Spec::Win32|IO::Special|Iterable|Iterator|Junction|Kernel|"+
        "Label|List|Lock|Lock::Async|Macro|Map|Match|Metamodel::AttributeContainer|"+
        "Metamodel::C3MRO|Metamodel::ClassHOW|Metamodel::EnumHOW|Metamodel::Finalization|"+
        "Metamodel::MethodContainer|Metamodel::MROBasedMethodDispatch|Metamodel::MultipleInheritance|"+
        "Metamodel::Naming|Metamodel::Primitives|Metamodel::PrivateMethodContainer|"+
        "Metamodel::RoleContainer|Metamodel::Trusting|Method|Mix|MixHash|Mixy|Mu|"+
        "NFC|NFD|NFKC|NFKD|Nil|Num|Numeric|NumStr|ObjAt|Order|Pair|Parameter|Perl|"+
        "Pod::Block|Pod::Block::Code|Pod::Block::Comment|Pod::Block::Declarator|"+
        "Pod::Block::Named|Pod::Block::Para|Pod::Block::Table|Pod::Heading|Pod::Item|"+
        "Positional|PositionalBindFailover|Proc|Proc::Async|Promise|Proxy|PseudoStash|"+
        "Raku|QuantHash|Range|Rat|Rational|RatStr|Real|Regex|Routine|Scalar|Scheduler|"+
        "Semaphore|Seq|Set|SetHash|Setty|Signature|Slip|Stash|Str|StrDistance|Stringy|"+
        "Sub|Submethod|Supplier|Supplier::Preserving|Supply|Systemic|Tap|Telemetry|"+
        "Telemetry::Instrument::Thread|Telemetry::Instrument::Usage|Telemetry::Period|"+
        "Telemetry::Sampler|Thread|ThreadPoolScheduler|UInt|Uni|utf8|Variable|Version|"+
        "VM|Whatever|WhateverCode|WrapHandle|int|uint|num|str|"+
        "int8|int16|int32|int64|uint8|uint16|uint32|uint64|long|longlong|num32|num64|size_t|bool|CArray|Pointer|"+
		"Backtrace|Backtrace::Frame|Exception|Failure|X::AdHoc|X::Anon::Augment|X::Anon::Multi|"+
		"X::Assignment::RO|X::Attribute::NoPackage|X::Attribute::Package|X::Attribute::Undeclared|"+
		"X::Augment::NoSuchType|X::Bind|X::Bind::NativeType|X::Bind::Slice|X::Caller::NotDynamic|"+
		"X::Channel::ReceiveOnClosed|X::Channel::SendOnClosed|X::Comp|X::Composition::NotComposable|"+
		"X::Constructor::Positional|X::ControlFlow|X::ControlFlow::Return|X::DateTime::TimezoneClash|"+
		"X::Declaration::Scope|X::Declaration::Scope::Multi|X::Does::TypeObject|X::Eval::NoSuchLang|"+
		"X::Export::NameClash|X::IO|X::IO::Chdir|X::IO::Chmod|X::IO::Copy|X::IO::Cwd|X::IO::Dir|"+
		"X::IO::DoesNotExist|X::IO::Link|X::IO::Mkdir|X::IO::Move|X::IO::Rename|X::IO::Rmdir|X::IO::Symlink|"+
		"X::IO::Unlink|X::Inheritance::NotComposed|X::Inheritance::Unsupported|X::Method::InvalidQualifier|"+
		"X::Method::NotFound|X::Method::Private::Permission|X::Method::Private::Unqualified|"+
		"X::Mixin::NotComposable|X::NYI|X::NoDispatcher|X::Numeric::Real|X::OS|X::Obsolete|X::OutOfRange|"+
		"X::Package::Stubbed|X::Parameter::Default|X::Parameter::MultipleTypeConstraints|"+
		"X::Parameter::Placeholder|X::Parameter::Twigil|X::Parameter::WrongOrder|X::Phaser::Multiple|"+
		"X::Phaser::PrePost|X::Placeholder::Block|X::Placeholder::Mainline|X::Pod|X::Proc::Async|"+
		"X::Proc::Async::AlreadyStarted|X::Proc::Async::CharsOrBytes|X::Proc::Async::MustBeStarted|"+
		"X::Proc::Async::OpenForWriting|X::Proc::Async::TapBeforeSpawn|X::Proc::Unsuccessful|"+
		"X::Promise::CauseOnlyValidOnBroken|X::Promise::Vowed|X::Redeclaration|X::Role::Initialization|"+
		"X::Seq::Consumed|X::Sequence::Deduction|X::Signature::NameClash|X::Signature::Placeholder|"+
		"X::Str::Numeric|X::StubCode|X::Syntax|X::Syntax::Augment::WithoutMonkeyTyping|"+
		"X::Syntax::Comment::Embedded|X::Syntax::Confused|X::Syntax::InfixInTermPosition|"+
		"X::Syntax::Malformed|X::Syntax::Missing|X::Syntax::NegatedPair|X::Syntax::NoSelf|"+
		"X::Syntax::Number::RadixOutOfRange|X::Syntax::P5|X::Syntax::Regex::Adverb|"+
		"X::Syntax::Regex::SolitaryQuantifier|X::Syntax::Reserved|X::Syntax::Self::WithoutObject|"+
		"X::Syntax::Signature::InvocantMarker|X::Syntax::Term::MissingInitializer|X::Syntax::UnlessElse|"+
		"X::Syntax::Variable::Match|X::Syntax::Variable::Numeric|X::Syntax::Variable::Twigil|X::Temporal|"+
		"X::Temporal::InvalidFormat|X::TypeCheck|X::TypeCheck::Assignment|X::TypeCheck::Binding|"+
		"X::TypeCheck::Return|X::TypeCheck::Splice|X::Undeclared"
		);

    var builtinFunctions = (
        "abs|abs2rel|absolute|accept|ACCEPTS|accessed|acos|acosec|acosech|acosh|"+
        "acotan|acotanh|acquire|act|action|actions|add|add_attribute|add_enum_value|"+
        "add_fallback|add_method|add_parent|add_private_method|add_role|add_trustee|"+
        "adverb|after|all|allocate|allof|allowed|alternative-names|annotations|antipair|"+
        "antipairs|any|anyof|app_lifetime|append|arch|archname|args|arity|asec|asech|"+
        "asin|asinh|ASSIGN-KEY|ASSIGN-POS|assuming|ast|at|atan|atan2|atanh|AT-KEY|"+
        "atomic-assign|atomic-dec-fetch|atomic-fetch|atomic-fetch-add|atomic-fetch-dec|"+
        "atomic-fetch-inc|atomic-fetch-sub|atomic-inc-fetch|AT-POS|attributes|auth|await|"+
        "backtrace|Bag|BagHash|base|basename|base-repeating|batch|BIND-KEY|BIND-POS|"+
        "bind-stderr|bind-stdin|bind-stdout|bind-udp|bits|bless|block|bool-only|"+
        "bounds|break|Bridge|broken|BUILD|build-date|bytes|cache|callframe|calling-package|"+
        "CALL-ME|callsame|callwith|can|cancel|candidates|cando|canonpath|caps|caption|"+
        "Capture|cas|catdir|categorize|categorize-list|catfile|catpath|cause|ceiling|"+
        "cglobal|changed|Channel|chars|chdir|child|child-name|child-typename|chmod|chomp|"+
        "chop|chr|chrs|chunks|cis|classify|classify-list|cleanup|clone|close|closed|"+
        "close-stdin|code|codes|collate|column|comb|combinations|command|comment|"+
        "compiler|Complex|compose|compose_type|composer|condition|config|configure_destroy|"+
        "configure_type_checking|conj|connect|constraints|construct|contains|contents|copy|"+
        "cos|cosec|cosech|cosh|cotan|cotanh|count|count-only|cpu-cores|cpu-usage|CREATE|"+
        "create_type|cross|cue|curdir|curupdir|d|Date|DateTime|day|daycount|day-of-month|"+
        "day-of-week|day-of-year|days-in-month|declaration|decode|decoder|deepmap|"+
        "defined|DEFINITE|delayed|DELETE-KEY|DELETE-POS|denominator|desc|DESTROY|destroyers|"+
        "devnull|did-you-mean|die|dir|dirname|dir-sep|DISTROnames|do|done|duckmap|dynamic|"+
        "e|eager|earlier|elems|emit|enclosing|encode|encoder|encoding|end|ends-with|enum_from_value|"+
        "enum_value_list|enum_values|enums|eof|EVAL|EVALFILE|exception|excludes-max|excludes-min|"+
        "EXISTS-KEY|EXISTS-POS|exit|exitcode|exp|expected|explicitly-manage|expmod|extension|f|"+
        "fail|fc|feature|file|filename|find_method|find_method_qualified|finish|first|flat|flatmap|"+
        "flip|floor|flush|fmt|format|formatter|freeze|from|from-list|from-loop|from-posix|full|"+
        "full-barrier|get|get_value|getc|gist|got|grab|grabpairs|grep|handle|handled|handles|"+
        "hardware|has_accessor|head|headers|hh-mm-ss|hidden|hides|hour|how|hyper|id|illegal|"+
        "im|in|indent|index|indices|indir|infinite|infix|install_method_cache|"+
        "Instant|instead|int-bounds|interval|in-timezone|invalid-str|invert|invocant|IO|"+
        "IO::Notification.watch-path|is_trusted|is_type|isa|is-absolute|is-hidden|is-initial-thread|"+
        "is-int|is-lazy|is-leap-year|isNaN|is-prime|is-relative|is-routine|is-setting|is-win|item|"+
        "iterator|join|keep|kept|KERNELnames|key|keyof|keys|kill|kv|kxxv|l|lang|last|lastcall|later|"+
        "lazy|lc|leading|level|line|lines|link|listen|live|local|lock|log|log10|lookup|lsb|"+
        "MAIN|match|max|maxpairs|merge|message|method_table|methods|migrate|min|minmax|"+
        "minpairs|minute|misplaced|Mix|MixHash|mkdir|mode|modified|month|move|mro|msb|multiness|"+
        "name|named|named_names|narrow|nativecast|native-descriptor|nativesizeof|new|new_type|"+
        "new-from-daycount|new-from-pairs|next|nextcallee|next-handle|nextsame|nextwith|NFC|NFD|"+
        "NFKC|NFKD|nl-in|nl-out|nodemap|none|norm|not|note|now|nude|numerator|Numeric|of|"+
        "offset|offset-in-hours|offset-in-minutes|old|on-close|one|on-switch|open|opened|"+
        "operation|optional|ord|ords|orig|os-error|osname|out-buffer|pack|package|package-kind|"+
        "package-name|packages|pair|pairs|pairup|parameter|params|parent|parent-name|parents|parse|"+
        "parse-base|parsefile|parse-names|parts|path|path-sep|payload|peer-host|peer-port|periods|"+
        "perl|permutations|phaser|pick|pickpairs|pid|placeholder|plus|polar|poll|polymod|pop|pos|"+
        "positional|posix|postfix|postmatch|precomp-ext|precomp-target|pred|prefix|prematch|prepend|"+
        "print|printf|print-nl|print-to|private|private_method_table|proc|produce|Promise|prompt|"+
        "protect|pull-one|push|push-all|push-at-least|push-exactly|push-until-lazy|put|"+
        "qualifier-type|quit|r|race|radix|raku|rand|range|raw|re|read|readchars|readonly|"+
        "ready|Real|reallocate|reals|reason|rebless|receive|recv|redispatcher|redo|reduce|"+
        "rel2abs|relative|release|rename|repeated|replacement|report|reserved|resolve|"+
        "restore|result|resume|rethrow|reverse|right|rindex|rmdir|roles_to_compose|"+
        "rolish|roll|rootdir|roots|rotate|rotor|round|roundrobin|routine-type|run|rwx|s|"+
        "samecase|samemark|samewith|say|schedule-on|scheduler|scope|sec|sech|second|seek|"+
        "self|send|Set|set_hidden|set_name|set_package|set_rw|set_value|SetHash|"+
        "set-instruments|setup_finalization|shape|share|shell|shift|sibling|sigil|"+
        "sign|signal|signals|signature|sin|sinh|sink|sink-all|skip|skip-at-least|"+
        "skip-at-least-pull-one|skip-one|sleep|sleep-timer|sleep-until|Slip|slurp|"+
        "slurp-rest|slurpy|snap|snapper|so|socket-host|socket-port|sort|source|"+
        "source-package|spawn|SPEC|splice|split|splitdir|splitpath|sprintf|spurt|"+
        "sqrt|squish|srand|stable|start|started|starts-with|status|stderr|stdout|"+
        "sub_signature|subbuf|subbuf-rw|subname|subparse|subst|subst-mutate|"+
        "substr|substr-eq|substr-rw|succ|sum|Supply|symlink|t|tail|take|take-rw|"+
        "tan|tanh|tap|target|target-name|tc|tclc|tell|then|throttle|throw|timezone|"+
        "tmpdir|to|today|toggle|to-posix|total|trailing|trans|tree|trim|trim-leading|"+
        "trim-trailing|truncate|truncated-to|trusts|try_acquire|trying|twigil|type|"+
        "type_captures|typename|uc|udp|uncaught_handler|unimatch|uniname|uninames|"+
        "uniparse|uniprop|uniprops|unique|unival|univals|unlink|unlock|unpack|unpolar|"+
        "unshift|unwrap|updir|USAGE|utc|val|value|values|VAR|variable|verbose-config|"+
        "version|VMnames|volume|vow|w|wait|warn|watch|watch-path|week|weekday-of-month|"+
        "week-number|week-year|WHAT|WHERE|WHEREFORE|WHICH|WHO|whole-second|WHY|"+
        "wordcase|words|workaround|wrap|write|write-to|yada|year|yield|yyyy-mm-dd|"+
        "z|zip|zip-latest|"+
        "plan|done-testing|bail-out|todo|skip|skip-rest|diag|subtest|pass|flunk|ok|"+
        "nok|cmp-ok|is-deeply|isnt|is-approx|like|unlike|use-ok|isa-ok|does-ok|"+
        "can-ok|dies-ok|lives-ok|eval-dies-ok|eval-lives-ok|throws-like|fails-like|"+
		"rw|required|native|repr|export|symbol"
	);
	var constants_ascii = ("pi|Inf|tau|time");
	
	var ops_txt = ("eq|ne|gt|lt|le|ge|div|gcd|lcm|leg|cmp|ff|fff|"+
		"x|before|after|Z|X|and|or|andthen|notandthen|orelse|xor"
	);

	var keywordMapper = this.createKeywordMapper({
		"keyword": keywords,
		"storage.type" : types,
		"constant.language": constants_ascii,
		"support.function": builtinFunctions,
		"keyword.operator": ops_txt
	}, "identifier");

	// regexp must not have capturing parentheses. Use (?:) instead.
	// regexps are ordered -> the first match is used
	
	var moduleName = "[a-zA-Z_][a-zA-Z_0-9:-]*\\b";
	
	// Common rules used in the start block and in qqstrings and in qq-heredocs for interpolation
	
	// Numbers - Hexadecimal
	var hex = {	token : "constant.numeric", regex : "0x[0-9a-fA-F]+\\b" };
	// Numbers - Num & Rat
	var num_rat = { token : "constant.numeric", regex : "[+-.]?\\d[\\d_]*(?:(?:\\.\\d[\\d_]*)?(?:[eE][+-]?\\d[\\d_]*)?)?i?\\b" };
	// Booleans
	var booleans = { token : "constant.language.boolean", regex : "(?:True|False)\\b" };
	// Versions
	var versions = { token : "constant.other", regex : "v[0-9](?:\\.[a-zA-Z0-9*])*\\b" };
	// Keywords
	var lang_keywords = { token : keywordMapper, regex : "[a-zA-Z][\\:a-zA-Z0-9_-]*\\b" };
	// Variables - also matches $_ and $1 $2 (regex match) etc.
	var variables = { token : "variable.language", regex : "[$@%&][?*!.]?[a-zA-Z0-9_-]+\\b" };
	// Special variables - matches $ $/ $! and @$/
	var vars_special = { token: "variable.language", regex : "\\$[/|!]?|@\\$/" };
	// Operators characters
	var ops_char = { token : "keyword.operator", regex : "=|<|>|\\+|\\*|-|/|~|%|\\?|!|\\^|\\.|\\:|\\,|"+
	"»|«|\\||\\&|⚛|∘" };
	// Unicode Constants
	var constants_unicode = { token : "constant.language", regex : "𝑒|π|τ|∞" };
	// qstrings
	var qstrings = { token : "string.quoted.single", regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']" };
	// Word Quoting
	var word_quoting = { token : "string.quoted.single", regex : "[<](?:[a-zA-Z0-9 ])*[>]"};
	//Regexp
	var regexp = {
				token : "string.regexp",
				regex : "[m|rx]?[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)" };
	
	
	this.$rules = {
		"start" : [
			{
				token : "comment.block", // Embedded Comments - Parentheses
				regex : "#[`|=]\\(.*\\)"
			}, {
				token : "comment.block", // Embedded Comments - Brackets
				regex : "#[`|=]\\[.*\\]"
			}, {
				token : "comment.doc", // Multiline Comments
				regex : "^=(?:begin)\\b",
				next : "block_comment"
			}, {
				token : "string.unquoted", // q Heredocs
				regex : "q[x|w]?\\:to/END/;",
				next : "qheredoc"
			}, {
				token : "string.unquoted", // qq Heredocs
				regex : "qq[x|w]?\\:to/END/;",
				next : "qqheredoc"
			},
			regexp,
			qstrings
			, {
				token : "string.quoted.double", // Double Quoted String
				regex : '"',
				next : "qqstring"
			},
			word_quoting
			, {
				token: ["keyword", "text", "variable.module"], // use - Module Names, Pragmas, etc.
				regex: "(use)(\\s+)((?:"+moduleName+"\\.?)*)"
			},
			hex,
			num_rat,
			booleans,
			versions,
			lang_keywords,
			variables,
			vars_special,
			ops_char,
			constants_unicode
			, {
				token : "comment", // Sigle Line Comments
				regex : "#.*$"
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
		"qqstring" : [
			{
				token : "constant.language.escape",
				regex : '\\\\(?:[nrtef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'
			}, 
			variables,
			vars_special
			, {
				token : "lparen",
				regex : "{",
				next : "qqinterpolation"
			}, {
				token : "string.quoted.double", 
				regex : '"', 
				next : "start"
			}, {
				defaultToken : "string.quoted.double"
			}
		],
		"qqinterpolation" : [
			hex,
			num_rat,
			booleans,
			versions,
			lang_keywords,
			variables,
			vars_special,
			ops_char,
			constants_unicode,
			qstrings,
			regexp,
			
			{
				token: "rparen",
				regex: "}",
				next : "qqstring"
			}
		],
		"block_comment": [
			{
				token: "comment.doc",
				regex: "^=end +[a-zA-Z_0-9]*",
				next: "start"
			},
			{
				defaultToken: "comment.doc"
			}
		],
		"qheredoc": [
			{
				token: "string.unquoted",
				regex: "END$",
				next: "start"
			}, {
				defaultToken: "string.unquoted"
			}
		],
		"qqheredoc": [
			variables,
			vars_special,
			{
				token : "lparen",
				regex : "{",
				next : "qqheredocinterpolation"
			}, {
				token: "string.unquoted",
				regex: "END$",
				next: "start"
			}, {
				defaultToken: "string.unquoted"
			}
		],
		"qqheredocinterpolation" : [
			hex,
			num_rat,
			booleans,
			versions,
			lang_keywords,
			variables,
			vars_special,
			ops_char,
			constants_unicode,
			qstrings,
			regexp,
			{
				token: "rparen",
				regex: "}",
				next : "qqheredoc"
			}
		]
	};
};

oop.inherits(RakuHighlightRules, TextHighlightRules);

exports.z = RakuHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsK0JBQStCO0FBQy9CO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxpQkFBaUI7QUFDakIsSUFBSTtBQUNKO0FBQ0EsbUJBQW1CO0FBQ25CLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxJQUFJLGNBQWMsSUFBSTtBQUM5RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Jha3UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yYWt1X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUmFrdUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcmFrdV9oaWdobGlnaHRfcnVsZXNcIikuUmFrdUhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSYWt1SGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoe3N0YXJ0OiBcIl49KGJlZ2luKVxcXFxiXCIsIGVuZDogXCJePShlbmQpXFxcXGJcIn0pO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSBbXG4gICAgICAgIHtzdGFydDogXCI9YmVnaW5cIiwgZW5kOiBcIj1lbmRcIiwgbGluZVN0YXJ0T25seTogdHJ1ZX0sXG4gICAgICAgIHtzdGFydDogXCI9aXRlbVwiLCBlbmQ6IFwiPWVuZFwiLCBsaW5lU3RhcnRPbmx5OiB0cnVlfVxuICAgIF07XG5cblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFs6XVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Jha3VcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBSYWt1SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJteXxvdXJ8Y2xhc3N8cm9sZXxncmFtbWFyfGlzfGRvZXN8c3VifG1ldGhvZHxzdWJtZXRob2R8dHJ5fFwiICtcbiAgICAgICAgXCJkZWZhdWx0fHdoZW58aWZ8ZWxzaWZ8ZWxzZXx1bmxlc3N8d2l0aHxvcndpdGh8d2l0aG91dHxmb3J8Z2l2ZW58cHJvY2VlZHxcIiArXG4gICAgICAgIFwic3VjY2VlZHxsb29wfHdoaWxlfHVudGlsfHJlcGVhdHxtb2R1bGV8dXNlfG5lZWR8aW1wb3J0fHJlcXVpcmV8dW5pdHxcIiArXG4gICAgICAgIFwiY29uc3RhbnR8ZW51bXxtdWx0aXxyZXR1cm58aGFzfHRva2VufHJ1bGV8bWFrZXxtYWRlfHByb3RvfHN0YXRlfGF1Z21lbnR8XCIgK1xuICAgICAgICBcImJ1dHxhbm9ufHN1cGVyc2VkZXxsZXR8c3Vic2V0fGdhdGhlcnxyZXR1cm5zfHJldHVybi1yd3x0ZW1wfFwiICtcbiAgICAgICAgXCJCRUdJTnxDSEVDS3xJTklUfEVORHxDTE9TRXxFTlRFUnxMRUFWRXxLRUVQfFVORE98UFJFfFBPU1R8RklSU1R8TkVYVHxMQVNUfENBVENIfENPTlRST0x8UVVJVHxET0NcIlxuICAgICk7XG5cbiAgICB2YXIgdHlwZXMgPSAoXG4gICAgICAgIFwiQW55fEFycmF5fEFzc29jaWF0aXZlfEFTVHxhdG9taWNpbnR8QXR0cmlidXRlfEJhY2t0cmFjZXxCYWNrdHJhY2U6OkZyYW1lfFwiICtcbiAgICAgICAgXCJCYWd8QmFnZ3l8QmFnSGFzaHxCbG9ifEJsb2NrfEJvb2x8QnVmfENhbGxhYmxlfENhbGxGcmFtZXxDYW5jZWxsYXRpb258XCIgK1xuICAgICAgICBcIkNhcHR1cmV8Q2hhbm5lbHxDb2RlfGNvbXBpbGVyfENvbXBsZXh8Q29tcGxleFN0cnxDb29sfEN1cnJlbnRUaHJlYWRTY2hlZHVsZXJ8XCIgK1xuICAgICAgICBcIkN1cnNvcnxEYXRlfERhdGVpc2h8RGF0ZVRpbWV8RGlzdHJvfER1cmF0aW9ufEVuY29kaW5nfEV4Y2VwdGlvbnxGYWlsdXJlfFwiK1xuICAgICAgICBcIkZhdFJhdHxHcmFtbWFyfEhhc2h8SHlwZXJXaGF0ZXZlcnxJbnN0YW50fEludHxJbnRTdHJ8SU98SU86OkFyZ0ZpbGVzfFwiK1xuICAgICAgICBcIklPOjpDYXRIYW5kbGV8SU86OkhhbmRsZXxJTzo6Tm90aWZpY2F0aW9ufElPOjpQYXRofElPOjpQYXRoOjpDeWd3aW58XCIrXG4gICAgICAgIFwiSU86OlBhdGg6OlFOWHxJTzo6UGF0aDo6VW5peHxJTzo6UGF0aDo6V2luMzJ8SU86OlBpcGV8SU86OlNvY2tldHxcIitcbiAgICAgICAgXCJJTzo6U29ja2V0OjpBc3luY3xJTzo6U29ja2V0OjpJTkVUfElPOjpTcGVjfElPOjpTcGVjOjpDeWd3aW58SU86OlNwZWM6OlFOWHxcIitcbiAgICAgICAgXCJJTzo6U3BlYzo6VW5peHxJTzo6U3BlYzo6V2luMzJ8SU86OlNwZWNpYWx8SXRlcmFibGV8SXRlcmF0b3J8SnVuY3Rpb258S2VybmVsfFwiK1xuICAgICAgICBcIkxhYmVsfExpc3R8TG9ja3xMb2NrOjpBc3luY3xNYWNyb3xNYXB8TWF0Y2h8TWV0YW1vZGVsOjpBdHRyaWJ1dGVDb250YWluZXJ8XCIrXG4gICAgICAgIFwiTWV0YW1vZGVsOjpDM01ST3xNZXRhbW9kZWw6OkNsYXNzSE9XfE1ldGFtb2RlbDo6RW51bUhPV3xNZXRhbW9kZWw6OkZpbmFsaXphdGlvbnxcIitcbiAgICAgICAgXCJNZXRhbW9kZWw6Ok1ldGhvZENvbnRhaW5lcnxNZXRhbW9kZWw6Ok1ST0Jhc2VkTWV0aG9kRGlzcGF0Y2h8TWV0YW1vZGVsOjpNdWx0aXBsZUluaGVyaXRhbmNlfFwiK1xuICAgICAgICBcIk1ldGFtb2RlbDo6TmFtaW5nfE1ldGFtb2RlbDo6UHJpbWl0aXZlc3xNZXRhbW9kZWw6OlByaXZhdGVNZXRob2RDb250YWluZXJ8XCIrXG4gICAgICAgIFwiTWV0YW1vZGVsOjpSb2xlQ29udGFpbmVyfE1ldGFtb2RlbDo6VHJ1c3Rpbmd8TWV0aG9kfE1peHxNaXhIYXNofE1peHl8TXV8XCIrXG4gICAgICAgIFwiTkZDfE5GRHxORktDfE5GS0R8TmlsfE51bXxOdW1lcmljfE51bVN0cnxPYmpBdHxPcmRlcnxQYWlyfFBhcmFtZXRlcnxQZXJsfFwiK1xuICAgICAgICBcIlBvZDo6QmxvY2t8UG9kOjpCbG9jazo6Q29kZXxQb2Q6OkJsb2NrOjpDb21tZW50fFBvZDo6QmxvY2s6OkRlY2xhcmF0b3J8XCIrXG4gICAgICAgIFwiUG9kOjpCbG9jazo6TmFtZWR8UG9kOjpCbG9jazo6UGFyYXxQb2Q6OkJsb2NrOjpUYWJsZXxQb2Q6OkhlYWRpbmd8UG9kOjpJdGVtfFwiK1xuICAgICAgICBcIlBvc2l0aW9uYWx8UG9zaXRpb25hbEJpbmRGYWlsb3ZlcnxQcm9jfFByb2M6OkFzeW5jfFByb21pc2V8UHJveHl8UHNldWRvU3Rhc2h8XCIrXG4gICAgICAgIFwiUmFrdXxRdWFudEhhc2h8UmFuZ2V8UmF0fFJhdGlvbmFsfFJhdFN0cnxSZWFsfFJlZ2V4fFJvdXRpbmV8U2NhbGFyfFNjaGVkdWxlcnxcIitcbiAgICAgICAgXCJTZW1hcGhvcmV8U2VxfFNldHxTZXRIYXNofFNldHR5fFNpZ25hdHVyZXxTbGlwfFN0YXNofFN0cnxTdHJEaXN0YW5jZXxTdHJpbmd5fFwiK1xuICAgICAgICBcIlN1YnxTdWJtZXRob2R8U3VwcGxpZXJ8U3VwcGxpZXI6OlByZXNlcnZpbmd8U3VwcGx5fFN5c3RlbWljfFRhcHxUZWxlbWV0cnl8XCIrXG4gICAgICAgIFwiVGVsZW1ldHJ5OjpJbnN0cnVtZW50OjpUaHJlYWR8VGVsZW1ldHJ5OjpJbnN0cnVtZW50OjpVc2FnZXxUZWxlbWV0cnk6OlBlcmlvZHxcIitcbiAgICAgICAgXCJUZWxlbWV0cnk6OlNhbXBsZXJ8VGhyZWFkfFRocmVhZFBvb2xTY2hlZHVsZXJ8VUludHxVbml8dXRmOHxWYXJpYWJsZXxWZXJzaW9ufFwiK1xuICAgICAgICBcIlZNfFdoYXRldmVyfFdoYXRldmVyQ29kZXxXcmFwSGFuZGxlfGludHx1aW50fG51bXxzdHJ8XCIrXG4gICAgICAgIFwiaW50OHxpbnQxNnxpbnQzMnxpbnQ2NHx1aW50OHx1aW50MTZ8dWludDMyfHVpbnQ2NHxsb25nfGxvbmdsb25nfG51bTMyfG51bTY0fHNpemVfdHxib29sfENBcnJheXxQb2ludGVyfFwiK1xuXHRcdFwiQmFja3RyYWNlfEJhY2t0cmFjZTo6RnJhbWV8RXhjZXB0aW9ufEZhaWx1cmV8WDo6QWRIb2N8WDo6QW5vbjo6QXVnbWVudHxYOjpBbm9uOjpNdWx0aXxcIitcblx0XHRcIlg6OkFzc2lnbm1lbnQ6OlJPfFg6OkF0dHJpYnV0ZTo6Tm9QYWNrYWdlfFg6OkF0dHJpYnV0ZTo6UGFja2FnZXxYOjpBdHRyaWJ1dGU6OlVuZGVjbGFyZWR8XCIrXG5cdFx0XCJYOjpBdWdtZW50OjpOb1N1Y2hUeXBlfFg6OkJpbmR8WDo6QmluZDo6TmF0aXZlVHlwZXxYOjpCaW5kOjpTbGljZXxYOjpDYWxsZXI6Ok5vdER5bmFtaWN8XCIrXG5cdFx0XCJYOjpDaGFubmVsOjpSZWNlaXZlT25DbG9zZWR8WDo6Q2hhbm5lbDo6U2VuZE9uQ2xvc2VkfFg6OkNvbXB8WDo6Q29tcG9zaXRpb246Ok5vdENvbXBvc2FibGV8XCIrXG5cdFx0XCJYOjpDb25zdHJ1Y3Rvcjo6UG9zaXRpb25hbHxYOjpDb250cm9sRmxvd3xYOjpDb250cm9sRmxvdzo6UmV0dXJufFg6OkRhdGVUaW1lOjpUaW1lem9uZUNsYXNofFwiK1xuXHRcdFwiWDo6RGVjbGFyYXRpb246OlNjb3BlfFg6OkRlY2xhcmF0aW9uOjpTY29wZTo6TXVsdGl8WDo6RG9lczo6VHlwZU9iamVjdHxYOjpFdmFsOjpOb1N1Y2hMYW5nfFwiK1xuXHRcdFwiWDo6RXhwb3J0OjpOYW1lQ2xhc2h8WDo6SU98WDo6SU86OkNoZGlyfFg6OklPOjpDaG1vZHxYOjpJTzo6Q29weXxYOjpJTzo6Q3dkfFg6OklPOjpEaXJ8XCIrXG5cdFx0XCJYOjpJTzo6RG9lc05vdEV4aXN0fFg6OklPOjpMaW5rfFg6OklPOjpNa2RpcnxYOjpJTzo6TW92ZXxYOjpJTzo6UmVuYW1lfFg6OklPOjpSbWRpcnxYOjpJTzo6U3ltbGlua3xcIitcblx0XHRcIlg6OklPOjpVbmxpbmt8WDo6SW5oZXJpdGFuY2U6Ok5vdENvbXBvc2VkfFg6OkluaGVyaXRhbmNlOjpVbnN1cHBvcnRlZHxYOjpNZXRob2Q6OkludmFsaWRRdWFsaWZpZXJ8XCIrXG5cdFx0XCJYOjpNZXRob2Q6Ok5vdEZvdW5kfFg6Ok1ldGhvZDo6UHJpdmF0ZTo6UGVybWlzc2lvbnxYOjpNZXRob2Q6OlByaXZhdGU6OlVucXVhbGlmaWVkfFwiK1xuXHRcdFwiWDo6TWl4aW46Ok5vdENvbXBvc2FibGV8WDo6TllJfFg6Ok5vRGlzcGF0Y2hlcnxYOjpOdW1lcmljOjpSZWFsfFg6Ok9TfFg6Ok9ic29sZXRlfFg6Ok91dE9mUmFuZ2V8XCIrXG5cdFx0XCJYOjpQYWNrYWdlOjpTdHViYmVkfFg6OlBhcmFtZXRlcjo6RGVmYXVsdHxYOjpQYXJhbWV0ZXI6Ok11bHRpcGxlVHlwZUNvbnN0cmFpbnRzfFwiK1xuXHRcdFwiWDo6UGFyYW1ldGVyOjpQbGFjZWhvbGRlcnxYOjpQYXJhbWV0ZXI6OlR3aWdpbHxYOjpQYXJhbWV0ZXI6Oldyb25nT3JkZXJ8WDo6UGhhc2VyOjpNdWx0aXBsZXxcIitcblx0XHRcIlg6OlBoYXNlcjo6UHJlUG9zdHxYOjpQbGFjZWhvbGRlcjo6QmxvY2t8WDo6UGxhY2Vob2xkZXI6Ok1haW5saW5lfFg6OlBvZHxYOjpQcm9jOjpBc3luY3xcIitcblx0XHRcIlg6OlByb2M6OkFzeW5jOjpBbHJlYWR5U3RhcnRlZHxYOjpQcm9jOjpBc3luYzo6Q2hhcnNPckJ5dGVzfFg6OlByb2M6OkFzeW5jOjpNdXN0QmVTdGFydGVkfFwiK1xuXHRcdFwiWDo6UHJvYzo6QXN5bmM6Ok9wZW5Gb3JXcml0aW5nfFg6OlByb2M6OkFzeW5jOjpUYXBCZWZvcmVTcGF3bnxYOjpQcm9jOjpVbnN1Y2Nlc3NmdWx8XCIrXG5cdFx0XCJYOjpQcm9taXNlOjpDYXVzZU9ubHlWYWxpZE9uQnJva2VufFg6OlByb21pc2U6OlZvd2VkfFg6OlJlZGVjbGFyYXRpb258WDo6Um9sZTo6SW5pdGlhbGl6YXRpb258XCIrXG5cdFx0XCJYOjpTZXE6OkNvbnN1bWVkfFg6OlNlcXVlbmNlOjpEZWR1Y3Rpb258WDo6U2lnbmF0dXJlOjpOYW1lQ2xhc2h8WDo6U2lnbmF0dXJlOjpQbGFjZWhvbGRlcnxcIitcblx0XHRcIlg6OlN0cjo6TnVtZXJpY3xYOjpTdHViQ29kZXxYOjpTeW50YXh8WDo6U3ludGF4OjpBdWdtZW50OjpXaXRob3V0TW9ua2V5VHlwaW5nfFwiK1xuXHRcdFwiWDo6U3ludGF4OjpDb21tZW50OjpFbWJlZGRlZHxYOjpTeW50YXg6OkNvbmZ1c2VkfFg6OlN5bnRheDo6SW5maXhJblRlcm1Qb3NpdGlvbnxcIitcblx0XHRcIlg6OlN5bnRheDo6TWFsZm9ybWVkfFg6OlN5bnRheDo6TWlzc2luZ3xYOjpTeW50YXg6Ok5lZ2F0ZWRQYWlyfFg6OlN5bnRheDo6Tm9TZWxmfFwiK1xuXHRcdFwiWDo6U3ludGF4OjpOdW1iZXI6OlJhZGl4T3V0T2ZSYW5nZXxYOjpTeW50YXg6OlA1fFg6OlN5bnRheDo6UmVnZXg6OkFkdmVyYnxcIitcblx0XHRcIlg6OlN5bnRheDo6UmVnZXg6OlNvbGl0YXJ5UXVhbnRpZmllcnxYOjpTeW50YXg6OlJlc2VydmVkfFg6OlN5bnRheDo6U2VsZjo6V2l0aG91dE9iamVjdHxcIitcblx0XHRcIlg6OlN5bnRheDo6U2lnbmF0dXJlOjpJbnZvY2FudE1hcmtlcnxYOjpTeW50YXg6OlRlcm06Ok1pc3NpbmdJbml0aWFsaXplcnxYOjpTeW50YXg6OlVubGVzc0Vsc2V8XCIrXG5cdFx0XCJYOjpTeW50YXg6OlZhcmlhYmxlOjpNYXRjaHxYOjpTeW50YXg6OlZhcmlhYmxlOjpOdW1lcmljfFg6OlN5bnRheDo6VmFyaWFibGU6OlR3aWdpbHxYOjpUZW1wb3JhbHxcIitcblx0XHRcIlg6OlRlbXBvcmFsOjpJbnZhbGlkRm9ybWF0fFg6OlR5cGVDaGVja3xYOjpUeXBlQ2hlY2s6OkFzc2lnbm1lbnR8WDo6VHlwZUNoZWNrOjpCaW5kaW5nfFwiK1xuXHRcdFwiWDo6VHlwZUNoZWNrOjpSZXR1cm58WDo6VHlwZUNoZWNrOjpTcGxpY2V8WDo6VW5kZWNsYXJlZFwiXG5cdFx0KTtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImFic3xhYnMycmVsfGFic29sdXRlfGFjY2VwdHxBQ0NFUFRTfGFjY2Vzc2VkfGFjb3N8YWNvc2VjfGFjb3NlY2h8YWNvc2h8XCIrXG4gICAgICAgIFwiYWNvdGFufGFjb3Rhbmh8YWNxdWlyZXxhY3R8YWN0aW9ufGFjdGlvbnN8YWRkfGFkZF9hdHRyaWJ1dGV8YWRkX2VudW1fdmFsdWV8XCIrXG4gICAgICAgIFwiYWRkX2ZhbGxiYWNrfGFkZF9tZXRob2R8YWRkX3BhcmVudHxhZGRfcHJpdmF0ZV9tZXRob2R8YWRkX3JvbGV8YWRkX3RydXN0ZWV8XCIrXG4gICAgICAgIFwiYWR2ZXJifGFmdGVyfGFsbHxhbGxvY2F0ZXxhbGxvZnxhbGxvd2VkfGFsdGVybmF0aXZlLW5hbWVzfGFubm90YXRpb25zfGFudGlwYWlyfFwiK1xuICAgICAgICBcImFudGlwYWlyc3xhbnl8YW55b2Z8YXBwX2xpZmV0aW1lfGFwcGVuZHxhcmNofGFyY2huYW1lfGFyZ3N8YXJpdHl8YXNlY3xhc2VjaHxcIitcbiAgICAgICAgXCJhc2lufGFzaW5ofEFTU0lHTi1LRVl8QVNTSUdOLVBPU3xhc3N1bWluZ3xhc3R8YXR8YXRhbnxhdGFuMnxhdGFuaHxBVC1LRVl8XCIrXG4gICAgICAgIFwiYXRvbWljLWFzc2lnbnxhdG9taWMtZGVjLWZldGNofGF0b21pYy1mZXRjaHxhdG9taWMtZmV0Y2gtYWRkfGF0b21pYy1mZXRjaC1kZWN8XCIrXG4gICAgICAgIFwiYXRvbWljLWZldGNoLWluY3xhdG9taWMtZmV0Y2gtc3VifGF0b21pYy1pbmMtZmV0Y2h8QVQtUE9TfGF0dHJpYnV0ZXN8YXV0aHxhd2FpdHxcIitcbiAgICAgICAgXCJiYWNrdHJhY2V8QmFnfEJhZ0hhc2h8YmFzZXxiYXNlbmFtZXxiYXNlLXJlcGVhdGluZ3xiYXRjaHxCSU5ELUtFWXxCSU5ELVBPU3xcIitcbiAgICAgICAgXCJiaW5kLXN0ZGVycnxiaW5kLXN0ZGlufGJpbmQtc3Rkb3V0fGJpbmQtdWRwfGJpdHN8Ymxlc3N8YmxvY2t8Ym9vbC1vbmx5fFwiK1xuICAgICAgICBcImJvdW5kc3xicmVha3xCcmlkZ2V8YnJva2VufEJVSUxEfGJ1aWxkLWRhdGV8Ynl0ZXN8Y2FjaGV8Y2FsbGZyYW1lfGNhbGxpbmctcGFja2FnZXxcIitcbiAgICAgICAgXCJDQUxMLU1FfGNhbGxzYW1lfGNhbGx3aXRofGNhbnxjYW5jZWx8Y2FuZGlkYXRlc3xjYW5kb3xjYW5vbnBhdGh8Y2Fwc3xjYXB0aW9ufFwiK1xuICAgICAgICBcIkNhcHR1cmV8Y2FzfGNhdGRpcnxjYXRlZ29yaXplfGNhdGVnb3JpemUtbGlzdHxjYXRmaWxlfGNhdHBhdGh8Y2F1c2V8Y2VpbGluZ3xcIitcbiAgICAgICAgXCJjZ2xvYmFsfGNoYW5nZWR8Q2hhbm5lbHxjaGFyc3xjaGRpcnxjaGlsZHxjaGlsZC1uYW1lfGNoaWxkLXR5cGVuYW1lfGNobW9kfGNob21wfFwiK1xuICAgICAgICBcImNob3B8Y2hyfGNocnN8Y2h1bmtzfGNpc3xjbGFzc2lmeXxjbGFzc2lmeS1saXN0fGNsZWFudXB8Y2xvbmV8Y2xvc2V8Y2xvc2VkfFwiK1xuICAgICAgICBcImNsb3NlLXN0ZGlufGNvZGV8Y29kZXN8Y29sbGF0ZXxjb2x1bW58Y29tYnxjb21iaW5hdGlvbnN8Y29tbWFuZHxjb21tZW50fFwiK1xuICAgICAgICBcImNvbXBpbGVyfENvbXBsZXh8Y29tcG9zZXxjb21wb3NlX3R5cGV8Y29tcG9zZXJ8Y29uZGl0aW9ufGNvbmZpZ3xjb25maWd1cmVfZGVzdHJveXxcIitcbiAgICAgICAgXCJjb25maWd1cmVfdHlwZV9jaGVja2luZ3xjb25qfGNvbm5lY3R8Y29uc3RyYWludHN8Y29uc3RydWN0fGNvbnRhaW5zfGNvbnRlbnRzfGNvcHl8XCIrXG4gICAgICAgIFwiY29zfGNvc2VjfGNvc2VjaHxjb3NofGNvdGFufGNvdGFuaHxjb3VudHxjb3VudC1vbmx5fGNwdS1jb3Jlc3xjcHUtdXNhZ2V8Q1JFQVRFfFwiK1xuICAgICAgICBcImNyZWF0ZV90eXBlfGNyb3NzfGN1ZXxjdXJkaXJ8Y3VydXBkaXJ8ZHxEYXRlfERhdGVUaW1lfGRheXxkYXljb3VudHxkYXktb2YtbW9udGh8XCIrXG4gICAgICAgIFwiZGF5LW9mLXdlZWt8ZGF5LW9mLXllYXJ8ZGF5cy1pbi1tb250aHxkZWNsYXJhdGlvbnxkZWNvZGV8ZGVjb2RlcnxkZWVwbWFwfFwiK1xuICAgICAgICBcImRlZmluZWR8REVGSU5JVEV8ZGVsYXllZHxERUxFVEUtS0VZfERFTEVURS1QT1N8ZGVub21pbmF0b3J8ZGVzY3xERVNUUk9ZfGRlc3Ryb3llcnN8XCIrXG4gICAgICAgIFwiZGV2bnVsbHxkaWQteW91LW1lYW58ZGllfGRpcnxkaXJuYW1lfGRpci1zZXB8RElTVFJPbmFtZXN8ZG98ZG9uZXxkdWNrbWFwfGR5bmFtaWN8XCIrXG4gICAgICAgIFwiZXxlYWdlcnxlYXJsaWVyfGVsZW1zfGVtaXR8ZW5jbG9zaW5nfGVuY29kZXxlbmNvZGVyfGVuY29kaW5nfGVuZHxlbmRzLXdpdGh8ZW51bV9mcm9tX3ZhbHVlfFwiK1xuICAgICAgICBcImVudW1fdmFsdWVfbGlzdHxlbnVtX3ZhbHVlc3xlbnVtc3xlb2Z8RVZBTHxFVkFMRklMRXxleGNlcHRpb258ZXhjbHVkZXMtbWF4fGV4Y2x1ZGVzLW1pbnxcIitcbiAgICAgICAgXCJFWElTVFMtS0VZfEVYSVNUUy1QT1N8ZXhpdHxleGl0Y29kZXxleHB8ZXhwZWN0ZWR8ZXhwbGljaXRseS1tYW5hZ2V8ZXhwbW9kfGV4dGVuc2lvbnxmfFwiK1xuICAgICAgICBcImZhaWx8ZmN8ZmVhdHVyZXxmaWxlfGZpbGVuYW1lfGZpbmRfbWV0aG9kfGZpbmRfbWV0aG9kX3F1YWxpZmllZHxmaW5pc2h8Zmlyc3R8ZmxhdHxmbGF0bWFwfFwiK1xuICAgICAgICBcImZsaXB8Zmxvb3J8Zmx1c2h8Zm10fGZvcm1hdHxmb3JtYXR0ZXJ8ZnJlZXplfGZyb218ZnJvbS1saXN0fGZyb20tbG9vcHxmcm9tLXBvc2l4fGZ1bGx8XCIrXG4gICAgICAgIFwiZnVsbC1iYXJyaWVyfGdldHxnZXRfdmFsdWV8Z2V0Y3xnaXN0fGdvdHxncmFifGdyYWJwYWlyc3xncmVwfGhhbmRsZXxoYW5kbGVkfGhhbmRsZXN8XCIrXG4gICAgICAgIFwiaGFyZHdhcmV8aGFzX2FjY2Vzc29yfGhlYWR8aGVhZGVyc3xoaC1tbS1zc3xoaWRkZW58aGlkZXN8aG91cnxob3d8aHlwZXJ8aWR8aWxsZWdhbHxcIitcbiAgICAgICAgXCJpbXxpbnxpbmRlbnR8aW5kZXh8aW5kaWNlc3xpbmRpcnxpbmZpbml0ZXxpbmZpeHxpbnN0YWxsX21ldGhvZF9jYWNoZXxcIitcbiAgICAgICAgXCJJbnN0YW50fGluc3RlYWR8aW50LWJvdW5kc3xpbnRlcnZhbHxpbi10aW1lem9uZXxpbnZhbGlkLXN0cnxpbnZlcnR8aW52b2NhbnR8SU98XCIrXG4gICAgICAgIFwiSU86Ok5vdGlmaWNhdGlvbi53YXRjaC1wYXRofGlzX3RydXN0ZWR8aXNfdHlwZXxpc2F8aXMtYWJzb2x1dGV8aXMtaGlkZGVufGlzLWluaXRpYWwtdGhyZWFkfFwiK1xuICAgICAgICBcImlzLWludHxpcy1sYXp5fGlzLWxlYXAteWVhcnxpc05hTnxpcy1wcmltZXxpcy1yZWxhdGl2ZXxpcy1yb3V0aW5lfGlzLXNldHRpbmd8aXMtd2lufGl0ZW18XCIrXG4gICAgICAgIFwiaXRlcmF0b3J8am9pbnxrZWVwfGtlcHR8S0VSTkVMbmFtZXN8a2V5fGtleW9mfGtleXN8a2lsbHxrdnxreHh2fGx8bGFuZ3xsYXN0fGxhc3RjYWxsfGxhdGVyfFwiK1xuICAgICAgICBcImxhenl8bGN8bGVhZGluZ3xsZXZlbHxsaW5lfGxpbmVzfGxpbmt8bGlzdGVufGxpdmV8bG9jYWx8bG9ja3xsb2d8bG9nMTB8bG9va3VwfGxzYnxcIitcbiAgICAgICAgXCJNQUlOfG1hdGNofG1heHxtYXhwYWlyc3xtZXJnZXxtZXNzYWdlfG1ldGhvZF90YWJsZXxtZXRob2RzfG1pZ3JhdGV8bWlufG1pbm1heHxcIitcbiAgICAgICAgXCJtaW5wYWlyc3xtaW51dGV8bWlzcGxhY2VkfE1peHxNaXhIYXNofG1rZGlyfG1vZGV8bW9kaWZpZWR8bW9udGh8bW92ZXxtcm98bXNifG11bHRpbmVzc3xcIitcbiAgICAgICAgXCJuYW1lfG5hbWVkfG5hbWVkX25hbWVzfG5hcnJvd3xuYXRpdmVjYXN0fG5hdGl2ZS1kZXNjcmlwdG9yfG5hdGl2ZXNpemVvZnxuZXd8bmV3X3R5cGV8XCIrXG4gICAgICAgIFwibmV3LWZyb20tZGF5Y291bnR8bmV3LWZyb20tcGFpcnN8bmV4dHxuZXh0Y2FsbGVlfG5leHQtaGFuZGxlfG5leHRzYW1lfG5leHR3aXRofE5GQ3xORkR8XCIrXG4gICAgICAgIFwiTkZLQ3xORktEfG5sLWlufG5sLW91dHxub2RlbWFwfG5vbmV8bm9ybXxub3R8bm90ZXxub3d8bnVkZXxudW1lcmF0b3J8TnVtZXJpY3xvZnxcIitcbiAgICAgICAgXCJvZmZzZXR8b2Zmc2V0LWluLWhvdXJzfG9mZnNldC1pbi1taW51dGVzfG9sZHxvbi1jbG9zZXxvbmV8b24tc3dpdGNofG9wZW58b3BlbmVkfFwiK1xuICAgICAgICBcIm9wZXJhdGlvbnxvcHRpb25hbHxvcmR8b3Jkc3xvcmlnfG9zLWVycm9yfG9zbmFtZXxvdXQtYnVmZmVyfHBhY2t8cGFja2FnZXxwYWNrYWdlLWtpbmR8XCIrXG4gICAgICAgIFwicGFja2FnZS1uYW1lfHBhY2thZ2VzfHBhaXJ8cGFpcnN8cGFpcnVwfHBhcmFtZXRlcnxwYXJhbXN8cGFyZW50fHBhcmVudC1uYW1lfHBhcmVudHN8cGFyc2V8XCIrXG4gICAgICAgIFwicGFyc2UtYmFzZXxwYXJzZWZpbGV8cGFyc2UtbmFtZXN8cGFydHN8cGF0aHxwYXRoLXNlcHxwYXlsb2FkfHBlZXItaG9zdHxwZWVyLXBvcnR8cGVyaW9kc3xcIitcbiAgICAgICAgXCJwZXJsfHBlcm11dGF0aW9uc3xwaGFzZXJ8cGlja3xwaWNrcGFpcnN8cGlkfHBsYWNlaG9sZGVyfHBsdXN8cG9sYXJ8cG9sbHxwb2x5bW9kfHBvcHxwb3N8XCIrXG4gICAgICAgIFwicG9zaXRpb25hbHxwb3NpeHxwb3N0Zml4fHBvc3RtYXRjaHxwcmVjb21wLWV4dHxwcmVjb21wLXRhcmdldHxwcmVkfHByZWZpeHxwcmVtYXRjaHxwcmVwZW5kfFwiK1xuICAgICAgICBcInByaW50fHByaW50ZnxwcmludC1ubHxwcmludC10b3xwcml2YXRlfHByaXZhdGVfbWV0aG9kX3RhYmxlfHByb2N8cHJvZHVjZXxQcm9taXNlfHByb21wdHxcIitcbiAgICAgICAgXCJwcm90ZWN0fHB1bGwtb25lfHB1c2h8cHVzaC1hbGx8cHVzaC1hdC1sZWFzdHxwdXNoLWV4YWN0bHl8cHVzaC11bnRpbC1sYXp5fHB1dHxcIitcbiAgICAgICAgXCJxdWFsaWZpZXItdHlwZXxxdWl0fHJ8cmFjZXxyYWRpeHxyYWt1fHJhbmR8cmFuZ2V8cmF3fHJlfHJlYWR8cmVhZGNoYXJzfHJlYWRvbmx5fFwiK1xuICAgICAgICBcInJlYWR5fFJlYWx8cmVhbGxvY2F0ZXxyZWFsc3xyZWFzb258cmVibGVzc3xyZWNlaXZlfHJlY3Z8cmVkaXNwYXRjaGVyfHJlZG98cmVkdWNlfFwiK1xuICAgICAgICBcInJlbDJhYnN8cmVsYXRpdmV8cmVsZWFzZXxyZW5hbWV8cmVwZWF0ZWR8cmVwbGFjZW1lbnR8cmVwb3J0fHJlc2VydmVkfHJlc29sdmV8XCIrXG4gICAgICAgIFwicmVzdG9yZXxyZXN1bHR8cmVzdW1lfHJldGhyb3d8cmV2ZXJzZXxyaWdodHxyaW5kZXh8cm1kaXJ8cm9sZXNfdG9fY29tcG9zZXxcIitcbiAgICAgICAgXCJyb2xpc2h8cm9sbHxyb290ZGlyfHJvb3RzfHJvdGF0ZXxyb3Rvcnxyb3VuZHxyb3VuZHJvYmlufHJvdXRpbmUtdHlwZXxydW58cnd4fHN8XCIrXG4gICAgICAgIFwic2FtZWNhc2V8c2FtZW1hcmt8c2FtZXdpdGh8c2F5fHNjaGVkdWxlLW9ufHNjaGVkdWxlcnxzY29wZXxzZWN8c2VjaHxzZWNvbmR8c2Vla3xcIitcbiAgICAgICAgXCJzZWxmfHNlbmR8U2V0fHNldF9oaWRkZW58c2V0X25hbWV8c2V0X3BhY2thZ2V8c2V0X3J3fHNldF92YWx1ZXxTZXRIYXNofFwiK1xuICAgICAgICBcInNldC1pbnN0cnVtZW50c3xzZXR1cF9maW5hbGl6YXRpb258c2hhcGV8c2hhcmV8c2hlbGx8c2hpZnR8c2libGluZ3xzaWdpbHxcIitcbiAgICAgICAgXCJzaWdufHNpZ25hbHxzaWduYWxzfHNpZ25hdHVyZXxzaW58c2luaHxzaW5rfHNpbmstYWxsfHNraXB8c2tpcC1hdC1sZWFzdHxcIitcbiAgICAgICAgXCJza2lwLWF0LWxlYXN0LXB1bGwtb25lfHNraXAtb25lfHNsZWVwfHNsZWVwLXRpbWVyfHNsZWVwLXVudGlsfFNsaXB8c2x1cnB8XCIrXG4gICAgICAgIFwic2x1cnAtcmVzdHxzbHVycHl8c25hcHxzbmFwcGVyfHNvfHNvY2tldC1ob3N0fHNvY2tldC1wb3J0fHNvcnR8c291cmNlfFwiK1xuICAgICAgICBcInNvdXJjZS1wYWNrYWdlfHNwYXdufFNQRUN8c3BsaWNlfHNwbGl0fHNwbGl0ZGlyfHNwbGl0cGF0aHxzcHJpbnRmfHNwdXJ0fFwiK1xuICAgICAgICBcInNxcnR8c3F1aXNofHNyYW5kfHN0YWJsZXxzdGFydHxzdGFydGVkfHN0YXJ0cy13aXRofHN0YXR1c3xzdGRlcnJ8c3Rkb3V0fFwiK1xuICAgICAgICBcInN1Yl9zaWduYXR1cmV8c3ViYnVmfHN1YmJ1Zi1yd3xzdWJuYW1lfHN1YnBhcnNlfHN1YnN0fHN1YnN0LW11dGF0ZXxcIitcbiAgICAgICAgXCJzdWJzdHJ8c3Vic3RyLWVxfHN1YnN0ci1yd3xzdWNjfHN1bXxTdXBwbHl8c3ltbGlua3x0fHRhaWx8dGFrZXx0YWtlLXJ3fFwiK1xuICAgICAgICBcInRhbnx0YW5ofHRhcHx0YXJnZXR8dGFyZ2V0LW5hbWV8dGN8dGNsY3x0ZWxsfHRoZW58dGhyb3R0bGV8dGhyb3d8dGltZXpvbmV8XCIrXG4gICAgICAgIFwidG1wZGlyfHRvfHRvZGF5fHRvZ2dsZXx0by1wb3NpeHx0b3RhbHx0cmFpbGluZ3x0cmFuc3x0cmVlfHRyaW18dHJpbS1sZWFkaW5nfFwiK1xuICAgICAgICBcInRyaW0tdHJhaWxpbmd8dHJ1bmNhdGV8dHJ1bmNhdGVkLXRvfHRydXN0c3x0cnlfYWNxdWlyZXx0cnlpbmd8dHdpZ2lsfHR5cGV8XCIrXG4gICAgICAgIFwidHlwZV9jYXB0dXJlc3x0eXBlbmFtZXx1Y3x1ZHB8dW5jYXVnaHRfaGFuZGxlcnx1bmltYXRjaHx1bmluYW1lfHVuaW5hbWVzfFwiK1xuICAgICAgICBcInVuaXBhcnNlfHVuaXByb3B8dW5pcHJvcHN8dW5pcXVlfHVuaXZhbHx1bml2YWxzfHVubGlua3x1bmxvY2t8dW5wYWNrfHVucG9sYXJ8XCIrXG4gICAgICAgIFwidW5zaGlmdHx1bndyYXB8dXBkaXJ8VVNBR0V8dXRjfHZhbHx2YWx1ZXx2YWx1ZXN8VkFSfHZhcmlhYmxlfHZlcmJvc2UtY29uZmlnfFwiK1xuICAgICAgICBcInZlcnNpb258Vk1uYW1lc3x2b2x1bWV8dm93fHd8d2FpdHx3YXJufHdhdGNofHdhdGNoLXBhdGh8d2Vla3x3ZWVrZGF5LW9mLW1vbnRofFwiK1xuICAgICAgICBcIndlZWstbnVtYmVyfHdlZWsteWVhcnxXSEFUfFdIRVJFfFdIRVJFRk9SRXxXSElDSHxXSE98d2hvbGUtc2Vjb25kfFdIWXxcIitcbiAgICAgICAgXCJ3b3JkY2FzZXx3b3Jkc3x3b3JrYXJvdW5kfHdyYXB8d3JpdGV8d3JpdGUtdG98eWFkYXx5ZWFyfHlpZWxkfHl5eXktbW0tZGR8XCIrXG4gICAgICAgIFwienx6aXB8emlwLWxhdGVzdHxcIitcbiAgICAgICAgXCJwbGFufGRvbmUtdGVzdGluZ3xiYWlsLW91dHx0b2RvfHNraXB8c2tpcC1yZXN0fGRpYWd8c3VidGVzdHxwYXNzfGZsdW5rfG9rfFwiK1xuICAgICAgICBcIm5va3xjbXAtb2t8aXMtZGVlcGx5fGlzbnR8aXMtYXBwcm94fGxpa2V8dW5saWtlfHVzZS1va3xpc2Etb2t8ZG9lcy1va3xcIitcbiAgICAgICAgXCJjYW4tb2t8ZGllcy1va3xsaXZlcy1va3xldmFsLWRpZXMtb2t8ZXZhbC1saXZlcy1va3x0aHJvd3MtbGlrZXxmYWlscy1saWtlfFwiK1xuXHRcdFwicnd8cmVxdWlyZWR8bmF0aXZlfHJlcHJ8ZXhwb3J0fHN5bWJvbFwiXG5cdCk7XG5cdHZhciBjb25zdGFudHNfYXNjaWkgPSAoXCJwaXxJbmZ8dGF1fHRpbWVcIik7XG5cdFxuXHR2YXIgb3BzX3R4dCA9IChcImVxfG5lfGd0fGx0fGxlfGdlfGRpdnxnY2R8bGNtfGxlZ3xjbXB8ZmZ8ZmZmfFwiK1xuXHRcdFwieHxiZWZvcmV8YWZ0ZXJ8WnxYfGFuZHxvcnxhbmR0aGVufG5vdGFuZHRoZW58b3JlbHNlfHhvclwiXG5cdCk7XG5cblx0dmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuXHRcdFwia2V5d29yZFwiOiBrZXl3b3Jkcyxcblx0XHRcInN0b3JhZ2UudHlwZVwiIDogdHlwZXMsXG5cdFx0XCJjb25zdGFudC5sYW5ndWFnZVwiOiBjb25zdGFudHNfYXNjaWksXG5cdFx0XCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnMsXG5cdFx0XCJrZXl3b3JkLm9wZXJhdG9yXCI6IG9wc190eHRcblx0fSwgXCJpZGVudGlmaWVyXCIpO1xuXG5cdC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cblx0Ly8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXHRcblx0dmFyIG1vZHVsZU5hbWUgPSBcIlthLXpBLVpfXVthLXpBLVpfMC05Oi1dKlxcXFxiXCI7XG5cdFxuXHQvLyBDb21tb24gcnVsZXMgdXNlZCBpbiB0aGUgc3RhcnQgYmxvY2sgYW5kIGluIHFxc3RyaW5ncyBhbmQgaW4gcXEtaGVyZWRvY3MgZm9yIGludGVycG9sYXRpb25cblx0XG5cdC8vIE51bWJlcnMgLSBIZXhhZGVjaW1hbFxuXHR2YXIgaGV4ID0ge1x0dG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgcmVnZXggOiBcIjB4WzAtOWEtZkEtRl0rXFxcXGJcIiB9O1xuXHQvLyBOdW1iZXJzIC0gTnVtICYgUmF0XG5cdHZhciBudW1fcmF0ID0geyB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCByZWdleCA6IFwiWystLl0/XFxcXGRbXFxcXGRfXSooPzooPzpcXFxcLlxcXFxkW1xcXFxkX10qKT8oPzpbZUVdWystXT9cXFxcZFtcXFxcZF9dKik/KT9pP1xcXFxiXCIgfTtcblx0Ly8gQm9vbGVhbnNcblx0dmFyIGJvb2xlYW5zID0geyB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLCByZWdleCA6IFwiKD86VHJ1ZXxGYWxzZSlcXFxcYlwiIH07XG5cdC8vIFZlcnNpb25zXG5cdHZhciB2ZXJzaW9ucyA9IHsgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyXCIsIHJlZ2V4IDogXCJ2WzAtOV0oPzpcXFxcLlthLXpBLVowLTkqXSkqXFxcXGJcIiB9O1xuXHQvLyBLZXl3b3Jkc1xuXHR2YXIgbGFuZ19rZXl3b3JkcyA9IHsgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLCByZWdleCA6IFwiW2EtekEtWl1bXFxcXDphLXpBLVowLTlfLV0qXFxcXGJcIiB9O1xuXHQvLyBWYXJpYWJsZXMgLSBhbHNvIG1hdGNoZXMgJF8gYW5kICQxICQyIChyZWdleCBtYXRjaCkgZXRjLlxuXHR2YXIgdmFyaWFibGVzID0geyB0b2tlbiA6IFwidmFyaWFibGUubGFuZ3VhZ2VcIiwgcmVnZXggOiBcIlskQCUmXVs/KiEuXT9bYS16QS1aMC05Xy1dK1xcXFxiXCIgfTtcblx0Ly8gU3BlY2lhbCB2YXJpYWJsZXMgLSBtYXRjaGVzICQgJC8gJCEgYW5kIEAkL1xuXHR2YXIgdmFyc19zcGVjaWFsID0geyB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLCByZWdleCA6IFwiXFxcXCRbL3whXT98QFxcXFwkL1wiIH07XG5cdC8vIE9wZXJhdG9ycyBjaGFyYWN0ZXJzXG5cdHZhciBvcHNfY2hhciA9IHsgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIiwgcmVnZXggOiBcIj18PHw+fFxcXFwrfFxcXFwqfC18L3x+fCV8XFxcXD98IXxcXFxcXnxcXFxcLnxcXFxcOnxcXFxcLHxcIitcblx0XCLCu3zCq3xcXFxcfHxcXFxcJnzimpt84oiYXCIgfTtcblx0Ly8gVW5pY29kZSBDb25zdGFudHNcblx0dmFyIGNvbnN0YW50c191bmljb2RlID0geyB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2VcIiwgcmVnZXggOiBcIvCdkZJ8z4B8z4R84oieXCIgfTtcblx0Ly8gcXN0cmluZ3Ncblx0dmFyIHFzdHJpbmdzID0geyB0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5zaW5nbGVcIiwgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiIH07XG5cdC8vIFdvcmQgUXVvdGluZ1xuXHR2YXIgd29yZF9xdW90aW5nID0geyB0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5zaW5nbGVcIiwgcmVnZXggOiBcIls8XSg/OlthLXpBLVowLTkgXSkqWz5dXCJ9O1xuXHQvL1JlZ2V4cFxuXHR2YXIgcmVnZXhwID0ge1xuXHRcdFx0XHR0b2tlbiA6IFwic3RyaW5nLnJlZ2V4cFwiLFxuXHRcdFx0XHRyZWdleCA6IFwiW218cnhdP1svXSg/Oig/OlxcXFxbKD86XFxcXFxcXFxdfFteXFxcXF1dKStcXFxcXSl8KD86XFxcXFxcXFwvfFteXFxcXF0vXSkpKlsvXVxcXFx3KlxcXFxzKig/PVspLiw7XXwkKVwiIH07XG5cdFxuXHRcblx0dGhpcy4kcnVsZXMgPSB7XG5cdFx0XCJzdGFydFwiIDogW1xuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA6IFwiY29tbWVudC5ibG9ja1wiLCAvLyBFbWJlZGRlZCBDb21tZW50cyAtIFBhcmVudGhlc2VzXG5cdFx0XHRcdHJlZ2V4IDogXCIjW2B8PV1cXFxcKC4qXFxcXClcIlxuXHRcdFx0fSwge1xuXHRcdFx0XHR0b2tlbiA6IFwiY29tbWVudC5ibG9ja1wiLCAvLyBFbWJlZGRlZCBDb21tZW50cyAtIEJyYWNrZXRzXG5cdFx0XHRcdHJlZ2V4IDogXCIjW2B8PV1cXFxcWy4qXFxcXF1cIlxuXHRcdFx0fSwge1xuXHRcdFx0XHR0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gTXVsdGlsaW5lIENvbW1lbnRzXG5cdFx0XHRcdHJlZ2V4IDogXCJePSg/OmJlZ2luKVxcXFxiXCIsXG5cdFx0XHRcdG5leHQgOiBcImJsb2NrX2NvbW1lbnRcIlxuXHRcdFx0fSwge1xuXHRcdFx0XHR0b2tlbiA6IFwic3RyaW5nLnVucXVvdGVkXCIsIC8vIHEgSGVyZWRvY3Ncblx0XHRcdFx0cmVnZXggOiBcInFbeHx3XT9cXFxcOnRvL0VORC87XCIsXG5cdFx0XHRcdG5leHQgOiBcInFoZXJlZG9jXCJcblx0XHRcdH0sIHtcblx0XHRcdFx0dG9rZW4gOiBcInN0cmluZy51bnF1b3RlZFwiLCAvLyBxcSBIZXJlZG9jc1xuXHRcdFx0XHRyZWdleCA6IFwicXFbeHx3XT9cXFxcOnRvL0VORC87XCIsXG5cdFx0XHRcdG5leHQgOiBcInFxaGVyZWRvY1wiXG5cdFx0XHR9LFxuXHRcdFx0cmVnZXhwLFxuXHRcdFx0cXN0cmluZ3Ncblx0XHRcdCwge1xuXHRcdFx0XHR0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5kb3VibGVcIiwgLy8gRG91YmxlIFF1b3RlZCBTdHJpbmdcblx0XHRcdFx0cmVnZXggOiAnXCInLFxuXHRcdFx0XHRuZXh0IDogXCJxcXN0cmluZ1wiXG5cdFx0XHR9LFxuXHRcdFx0d29yZF9xdW90aW5nXG5cdFx0XHQsIHtcblx0XHRcdFx0dG9rZW46IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwidmFyaWFibGUubW9kdWxlXCJdLCAvLyB1c2UgLSBNb2R1bGUgTmFtZXMsIFByYWdtYXMsIGV0Yy5cblx0XHRcdFx0cmVnZXg6IFwiKHVzZSkoXFxcXHMrKSgoPzpcIittb2R1bGVOYW1lK1wiXFxcXC4/KSopXCJcblx0XHRcdH0sXG5cdFx0XHRoZXgsXG5cdFx0XHRudW1fcmF0LFxuXHRcdFx0Ym9vbGVhbnMsXG5cdFx0XHR2ZXJzaW9ucyxcblx0XHRcdGxhbmdfa2V5d29yZHMsXG5cdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHR2YXJzX3NwZWNpYWwsXG5cdFx0XHRvcHNfY2hhcixcblx0XHRcdGNvbnN0YW50c191bmljb2RlXG5cdFx0XHQsIHtcblx0XHRcdFx0dG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gU2lnbGUgTGluZSBDb21tZW50c1xuXHRcdFx0XHRyZWdleCA6IFwiIy4qJFwiXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHRva2VuIDogXCJscGFyZW5cIixcblx0XHRcdFx0cmVnZXggOiBcIltbKHtdXCJcblx0XHRcdH0sIHtcblx0XHRcdFx0dG9rZW4gOiBcInJwYXJlblwiLFxuXHRcdFx0XHRyZWdleCA6IFwiW1xcXFxdKX1dXCJcblx0XHRcdH0sIHtcblx0XHRcdFx0dG9rZW4gOiBcInRleHRcIixcblx0XHRcdFx0cmVnZXggOiBcIlxcXFxzK1wiXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRcInFxc3RyaW5nXCIgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcblx0XHRcdFx0cmVnZXggOiAnXFxcXFxcXFwoPzpbbnJ0ZWZcXFxcXFxcXFwiJF18WzAtN117MSwzfXx4WzAtOUEtRmEtZl17MSwyfSknXG5cdFx0XHR9LCBcblx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdHZhcnNfc3BlY2lhbFxuXHRcdFx0LCB7XG5cdFx0XHRcdHRva2VuIDogXCJscGFyZW5cIixcblx0XHRcdFx0cmVnZXggOiBcIntcIixcblx0XHRcdFx0bmV4dCA6IFwicXFpbnRlcnBvbGF0aW9uXCJcblx0XHRcdH0sIHtcblx0XHRcdFx0dG9rZW4gOiBcInN0cmluZy5xdW90ZWQuZG91YmxlXCIsIFxuXHRcdFx0XHRyZWdleCA6ICdcIicsIFxuXHRcdFx0XHRuZXh0IDogXCJzdGFydFwiXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nLnF1b3RlZC5kb3VibGVcIlxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0XCJxcWludGVycG9sYXRpb25cIiA6IFtcblx0XHRcdGhleCxcblx0XHRcdG51bV9yYXQsXG5cdFx0XHRib29sZWFucyxcblx0XHRcdHZlcnNpb25zLFxuXHRcdFx0bGFuZ19rZXl3b3Jkcyxcblx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdHZhcnNfc3BlY2lhbCxcblx0XHRcdG9wc19jaGFyLFxuXHRcdFx0Y29uc3RhbnRzX3VuaWNvZGUsXG5cdFx0XHRxc3RyaW5ncyxcblx0XHRcdHJlZ2V4cCxcblx0XHRcdFxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbjogXCJycGFyZW5cIixcblx0XHRcdFx0cmVnZXg6IFwifVwiLFxuXHRcdFx0XHRuZXh0IDogXCJxcXN0cmluZ1wiXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRcImJsb2NrX2NvbW1lbnRcIjogW1xuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbjogXCJjb21tZW50LmRvY1wiLFxuXHRcdFx0XHRyZWdleDogXCJePWVuZCArW2EtekEtWl8wLTldKlwiLFxuXHRcdFx0XHRuZXh0OiBcInN0YXJ0XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvY1wiXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRcInFoZXJlZG9jXCI6IFtcblx0XHRcdHtcblx0XHRcdFx0dG9rZW46IFwic3RyaW5nLnVucXVvdGVkXCIsXG5cdFx0XHRcdHJlZ2V4OiBcIkVORCRcIixcblx0XHRcdFx0bmV4dDogXCJzdGFydFwiXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGRlZmF1bHRUb2tlbjogXCJzdHJpbmcudW5xdW90ZWRcIlxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0XCJxcWhlcmVkb2NcIjogW1xuXHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0dmFyc19zcGVjaWFsLFxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA6IFwibHBhcmVuXCIsXG5cdFx0XHRcdHJlZ2V4IDogXCJ7XCIsXG5cdFx0XHRcdG5leHQgOiBcInFxaGVyZWRvY2ludGVycG9sYXRpb25cIlxuXHRcdFx0fSwge1xuXHRcdFx0XHR0b2tlbjogXCJzdHJpbmcudW5xdW90ZWRcIixcblx0XHRcdFx0cmVnZXg6IFwiRU5EJFwiLFxuXHRcdFx0XHRuZXh0OiBcInN0YXJ0XCJcblx0XHRcdH0sIHtcblx0XHRcdFx0ZGVmYXVsdFRva2VuOiBcInN0cmluZy51bnF1b3RlZFwiXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRcInFxaGVyZWRvY2ludGVycG9sYXRpb25cIiA6IFtcblx0XHRcdGhleCxcblx0XHRcdG51bV9yYXQsXG5cdFx0XHRib29sZWFucyxcblx0XHRcdHZlcnNpb25zLFxuXHRcdFx0bGFuZ19rZXl3b3Jkcyxcblx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdHZhcnNfc3BlY2lhbCxcblx0XHRcdG9wc19jaGFyLFxuXHRcdFx0Y29uc3RhbnRzX3VuaWNvZGUsXG5cdFx0XHRxc3RyaW5ncyxcblx0XHRcdHJlZ2V4cCxcblx0XHRcdHtcblx0XHRcdFx0dG9rZW46IFwicnBhcmVuXCIsXG5cdFx0XHRcdHJlZ2V4OiBcIn1cIixcblx0XHRcdFx0bmV4dCA6IFwicXFoZXJlZG9jXCJcblx0XHRcdH1cblx0XHRdXG5cdH07XG59O1xuXG5vb3AuaW5oZXJpdHMoUmFrdUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlJha3VIaWdobGlnaHRSdWxlcyA9IFJha3VIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==