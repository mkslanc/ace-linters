"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4875],{

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

/***/ 54875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var OcamlHighlightRules = (__webpack_require__(91808)/* .OcamlHighlightRules */ .W);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = OcamlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
    
    this.$outdent   = new MatchingBraceOutdent();
};
oop.inherits(Mode, TextMode);

var indenter = /(?:[({[=:]|[-=]>|\b(?:else|try|with))\s*$/;

(function() {

    this.toggleCommentLines = function(state, doc, startRow, endRow) {
        var i, line;
        var outdent = true;
        var re = /^\s*\(\*(.*)\*\)/;

        for (i=startRow; i<= endRow; i++) {
            if (!re.test(doc.getLine(i))) {
                outdent = false;
                break;
            }
        }

        var range = new Range(0, 0, 0, 0);
        for (i=startRow; i<= endRow; i++) {
            line = doc.getLine(i);
            range.start.row  = i;
            range.end.row    = i;
            range.end.column = line.length;

            doc.replace(range, outdent ? line.match(re)[1] : "(*" + line + "*)");
        }
    };

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;

        if (!(tokens.length && tokens[tokens.length - 1].type === 'comment') &&
            state === 'start' && indenter.test(line))
            indent += tab;
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/ocaml";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 91808:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var OcamlHighlightRules = function() {

    var keywords = (
        "and|as|assert|begin|class|constraint|do|done|downto|else|end|"  +
        "exception|external|for|fun|function|functor|if|in|include|"     +
        "inherit|initializer|lazy|let|match|method|module|mutable|new|"  +
        "object|of|open|or|private|rec|sig|struct|then|to|try|type|val|" +
        "virtual|when|while|with"
    );

    var builtinConstants = ("true|false");

    var builtinFunctions = (
        "abs|abs_big_int|abs_float|abs_num|abstract_tag|accept|access|acos|add|" +
        "add_available_units|add_big_int|add_buffer|add_channel|add_char|" +
        "add_initializer|add_int_big_int|add_interfaces|add_num|add_string|" +
        "add_substitute|add_substring|alarm|allocated_bytes|allow_only|" +
        "allow_unsafe_modules|always|append|appname_get|appname_set|" +
        "approx_num_exp|approx_num_fix|arg|argv|arith_status|array|" +
        "array1_of_genarray|array2_of_genarray|array3_of_genarray|asin|asr|" +
        "assoc|assq|at_exit|atan|atan2|auto_synchronize|background|basename|" +
        "beginning_of_input|big_int_of_int|big_int_of_num|big_int_of_string|bind|" +
        "bind_class|bind_tag|bits|bits_of_float|black|blit|blit_image|blue|bool|" +
        "bool_of_string|bounded_full_split|bounded_split|bounded_split_delim|" +
        "bprintf|break|broadcast|bscanf|button_down|c_layout|capitalize|cardinal|" +
        "cardinal|catch|catch_break|ceil|ceiling_num|channel|char|char_of_int|" +
        "chdir|check|check_suffix|chmod|choose|chop_extension|chop_suffix|chown|" +
        "chown|chr|chroot|classify_float|clear|clear_available_units|" +
        "clear_close_on_exec|clear_graph|clear_nonblock|clear_parser|" +
        "close|close|closeTk|close_box|close_graph|close_in|close_in_noerr|" +
        "close_out|close_out_noerr|close_process|close_process|" +
        "close_process_full|close_process_in|close_process_out|close_subwindow|" +
        "close_tag|close_tbox|closedir|closedir|closure_tag|code|combine|" +
        "combine|combine|command|compact|compare|compare_big_int|compare_num|" +
        "complex32|complex64|concat|conj|connect|contains|contains_from|contents|" +
        "copy|cos|cosh|count|count|counters|create|create_alarm|create_image|" +
        "create_matrix|create_matrix|create_matrix|create_object|" +
        "create_object_and_run_initializers|create_object_opt|create_process|" +
        "create_process|create_process_env|create_process_env|create_table|" +
        "current|current_dir_name|current_point|current_x|current_y|curveto|" +
        "custom_tag|cyan|data_size|decr|decr_num|default_available_units|delay|" +
        "delete_alarm|descr_of_in_channel|descr_of_out_channel|destroy|diff|dim|" +
        "dim1|dim2|dim3|dims|dirname|display_mode|div|div_big_int|div_num|" +
        "double_array_tag|double_tag|draw_arc|draw_char|draw_circle|draw_ellipse|" +
        "draw_image|draw_poly|draw_poly_line|draw_rect|draw_segments|draw_string|" +
        "dummy_pos|dummy_table|dump_image|dup|dup2|elements|empty|end_of_input|" +
        "environment|eprintf|epsilon_float|eq_big_int|eq_num|equal|err_formatter|" +
        "error_message|escaped|establish_server|executable_name|execv|execve|execvp|" +
        "execvpe|exists|exists2|exit|exp|failwith|fast_sort|fchmod|fchown|field|" +
        "file|file_exists|fill|fill_arc|fill_circle|fill_ellipse|fill_poly|fill_rect|" +
        "filter|final_tag|finalise|find|find_all|first_chars|firstkey|flatten|" +
        "float|float32|float64|float_of_big_int|float_of_bits|float_of_int|" +
        "float_of_num|float_of_string|floor|floor_num|flush|flush_all|flush_input|" +
        "flush_str_formatter|fold|fold_left|fold_left2|fold_right|fold_right2|" +
        "for_all|for_all2|force|force_newline|force_val|foreground|fork|" +
        "format_of_string|formatter_of_buffer|formatter_of_out_channel|" +
        "fortran_layout|forward_tag|fprintf|frexp|from|from_channel|from_file|" +
        "from_file_bin|from_function|from_string|fscanf|fst|fstat|ftruncate|" +
        "full_init|full_major|full_split|gcd_big_int|ge_big_int|ge_num|" +
        "genarray_of_array1|genarray_of_array2|genarray_of_array3|get|" +
        "get_all_formatter_output_functions|get_approx_printing|get_copy|" +
        "get_ellipsis_text|get_error_when_null_denominator|get_floating_precision|" +
        "get_formatter_output_functions|get_formatter_tag_functions|get_image|" +
        "get_margin|get_mark_tags|get_max_boxes|get_max_indent|get_method|" +
        "get_method_label|get_normalize_ratio|get_normalize_ratio_when_printing|" +
        "get_print_tags|get_state|get_variable|getcwd|getegid|getegid|getenv|" +
        "getenv|getenv|geteuid|geteuid|getgid|getgid|getgrgid|getgrgid|getgrnam|" +
        "getgrnam|getgroups|gethostbyaddr|gethostbyname|gethostname|getitimer|" +
        "getlogin|getpeername|getpid|getppid|getprotobyname|getprotobynumber|" +
        "getpwnam|getpwuid|getservbyname|getservbyport|getsockname|getsockopt|" +
        "getsockopt_float|getsockopt_int|getsockopt_optint|gettimeofday|getuid|" +
        "global_replace|global_substitute|gmtime|green|grid|group_beginning|" +
        "group_end|gt_big_int|gt_num|guard|handle_unix_error|hash|hash_param|" +
        "hd|header_size|i|id|ignore|in_channel_length|in_channel_of_descr|incr|" +
        "incr_num|index|index_from|inet_addr_any|inet_addr_of_string|infinity|" +
        "infix_tag|init|init_class|input|input_binary_int|input_byte|input_char|" +
        "input_line|input_value|int|int16_signed|int16_unsigned|int32|int64|" +
        "int8_signed|int8_unsigned|int_of_big_int|int_of_char|int_of_float|" +
        "int_of_num|int_of_string|integer_num|inter|interactive|inv|invalid_arg|" +
        "is_block|is_empty|is_implicit|is_int|is_int_big_int|is_integer_num|" +
        "is_relative|iter|iter2|iteri|join|junk|key_pressed|kill|kind|kprintf|" +
        "kscanf|land|last_chars|layout|lazy_from_fun|lazy_from_val|lazy_is_val|" +
        "lazy_tag|ldexp|le_big_int|le_num|length|lexeme|lexeme_char|lexeme_end|" +
        "lexeme_end_p|lexeme_start|lexeme_start_p|lineto|link|list|listen|lnot|" +
        "loadfile|loadfile_private|localtime|lock|lockf|log|log10|logand|lognot|" +
        "logor|logxor|lor|lower_window|lowercase|lseek|lsl|lsr|lstat|lt_big_int|" +
        "lt_num|lxor|magenta|magic|mainLoop|major|major_slice|make|make_formatter|" +
        "make_image|make_lexer|make_matrix|make_self_init|map|map2|map_file|mapi|" +
        "marshal|match_beginning|match_end|matched_group|matched_string|max|" +
        "max_array_length|max_big_int|max_elt|max_float|max_int|max_num|" +
        "max_string_length|mem|mem_assoc|mem_assq|memq|merge|min|min_big_int|" +
        "min_elt|min_float|min_int|min_num|minor|minus_big_int|minus_num|" +
        "minus_one|mkdir|mkfifo|mktime|mod|mod_big_int|mod_float|mod_num|modf|" +
        "mouse_pos|moveto|mul|mult_big_int|mult_int_big_int|mult_num|nan|narrow|" +
        "nat_of_num|nativeint|neg|neg_infinity|new_block|new_channel|new_method|" +
        "new_variable|next|nextkey|nice|nice|no_scan_tag|norm|norm2|not|npeek|" +
        "nth|nth_dim|num_digits_big_int|num_dims|num_of_big_int|num_of_int|" +
        "num_of_nat|num_of_ratio|num_of_string|O|obj|object_tag|ocaml_version|" +
        "of_array|of_channel|of_float|of_int|of_int32|of_list|of_nativeint|" +
        "of_string|one|openTk|open_box|open_connection|open_graph|open_hbox|" +
        "open_hovbox|open_hvbox|open_in|open_in_bin|open_in_gen|open_out|" +
        "open_out_bin|open_out_gen|open_process|open_process_full|open_process_in|" +
        "open_process_out|open_subwindow|open_tag|open_tbox|open_temp_file|" +
        "open_vbox|opendbm|opendir|openfile|or|os_type|out_channel_length|" +
        "out_channel_of_descr|output|output_binary_int|output_buffer|output_byte|" +
        "output_char|output_string|output_value|over_max_boxes|pack|params|" +
        "parent_dir_name|parse|parse_argv|partition|pause|peek|pipe|pixels|" +
        "place|plot|plots|point_color|polar|poll|pop|pos_in|pos_out|pow|" +
        "power_big_int_positive_big_int|power_big_int_positive_int|" +
        "power_int_positive_big_int|power_int_positive_int|power_num|" +
        "pp_close_box|pp_close_tag|pp_close_tbox|pp_force_newline|" +
        "pp_get_all_formatter_output_functions|pp_get_ellipsis_text|" +
        "pp_get_formatter_output_functions|pp_get_formatter_tag_functions|" +
        "pp_get_margin|pp_get_mark_tags|pp_get_max_boxes|pp_get_max_indent|" +
        "pp_get_print_tags|pp_open_box|pp_open_hbox|pp_open_hovbox|pp_open_hvbox|" +
        "pp_open_tag|pp_open_tbox|pp_open_vbox|pp_over_max_boxes|pp_print_as|" +
        "pp_print_bool|pp_print_break|pp_print_char|pp_print_cut|pp_print_float|" +
        "pp_print_flush|pp_print_if_newline|pp_print_int|pp_print_newline|" +
        "pp_print_space|pp_print_string|pp_print_tab|pp_print_tbreak|" +
        "pp_set_all_formatter_output_functions|pp_set_ellipsis_text|" +
        "pp_set_formatter_out_channel|pp_set_formatter_output_functions|" +
        "pp_set_formatter_tag_functions|pp_set_margin|pp_set_mark_tags|" +
        "pp_set_max_boxes|pp_set_max_indent|pp_set_print_tags|pp_set_tab|" +
        "pp_set_tags|pred|pred_big_int|pred_num|prerr_char|prerr_endline|" +
        "prerr_float|prerr_int|prerr_newline|prerr_string|print|print_as|" +
        "print_bool|print_break|print_char|print_cut|print_endline|print_float|" +
        "print_flush|print_if_newline|print_int|print_newline|print_space|" +
        "print_stat|print_string|print_tab|print_tbreak|printf|prohibit|" +
        "public_method_label|push|putenv|quo_num|quomod_big_int|quote|raise|" +
        "raise_window|ratio_of_num|rcontains_from|read|read_float|read_int|" +
        "read_key|read_line|readdir|readdir|readlink|really_input|receive|recv|" +
        "recvfrom|red|ref|regexp|regexp_case_fold|regexp_string|" +
        "regexp_string_case_fold|register|register_exception|rem|remember_mode|" +
        "remove|remove_assoc|remove_assq|rename|replace|replace_first|" +
        "replace_matched|repr|reset|reshape|reshape_1|reshape_2|reshape_3|rev|" +
        "rev_append|rev_map|rev_map2|rewinddir|rgb|rhs_end|rhs_end_pos|rhs_start|" +
        "rhs_start_pos|rindex|rindex_from|rlineto|rmdir|rmoveto|round_num|" +
        "run_initializers|run_initializers_opt|scanf|search_backward|" +
        "search_forward|seek_in|seek_out|select|self|self_init|send|sendto|set|" +
        "set_all_formatter_output_functions|set_approx_printing|" +
        "set_binary_mode_in|set_binary_mode_out|set_close_on_exec|" +
        "set_close_on_exec|set_color|set_ellipsis_text|" +
        "set_error_when_null_denominator|set_field|set_floating_precision|" +
        "set_font|set_formatter_out_channel|set_formatter_output_functions|" +
        "set_formatter_tag_functions|set_line_width|set_margin|set_mark_tags|" +
        "set_max_boxes|set_max_indent|set_method|set_nonblock|set_nonblock|" +
        "set_normalize_ratio|set_normalize_ratio_when_printing|set_print_tags|" +
        "set_signal|set_state|set_tab|set_tag|set_tags|set_text_size|" +
        "set_window_title|setgid|setgid|setitimer|setitimer|setsid|setsid|" +
        "setsockopt|setsockopt|setsockopt_float|setsockopt_float|setsockopt_int|" +
        "setsockopt_int|setsockopt_optint|setsockopt_optint|setuid|setuid|" +
        "shift_left|shift_left|shift_left|shift_right|shift_right|shift_right|" +
        "shift_right_logical|shift_right_logical|shift_right_logical|show_buckets|" +
        "shutdown|shutdown|shutdown_connection|shutdown_connection|sigabrt|" +
        "sigalrm|sigchld|sigcont|sigfpe|sighup|sigill|sigint|sigkill|sign_big_int|" +
        "sign_num|signal|signal|sigpending|sigpending|sigpipe|sigprocmask|" +
        "sigprocmask|sigprof|sigquit|sigsegv|sigstop|sigsuspend|sigsuspend|" +
        "sigterm|sigtstp|sigttin|sigttou|sigusr1|sigusr2|sigvtalrm|sin|singleton|" +
        "sinh|size|size|size_x|size_y|sleep|sleep|sleep|slice_left|slice_left|" +
        "slice_left_1|slice_left_2|slice_right|slice_right|slice_right_1|" +
        "slice_right_2|snd|socket|socket|socket|socketpair|socketpair|sort|sound|" +
        "split|split_delim|sprintf|sprintf|sqrt|sqrt|sqrt_big_int|square_big_int|" +
        "square_num|sscanf|stable_sort|stable_sort|stable_sort|stable_sort|stable_sort|" +
        "stable_sort|stat|stat|stat|stat|stat|stats|stats|std_formatter|stdbuf|" +
        "stderr|stderr|stderr|stdib|stdin|stdin|stdin|stdout|stdout|stdout|" +
        "str_formatter|string|string_after|string_before|string_match|" +
        "string_of_big_int|string_of_bool|string_of_float|string_of_format|" +
        "string_of_inet_addr|string_of_inet_addr|string_of_int|string_of_num|" +
        "string_partial_match|string_tag|sub|sub|sub_big_int|sub_left|sub_num|" +
        "sub_right|subset|subset|substitute_first|substring|succ|succ|" +
        "succ|succ|succ_big_int|succ_num|symbol_end|symbol_end_pos|symbol_start|" +
        "symbol_start_pos|symlink|symlink|sync|synchronize|system|system|system|" +
        "tag|take|tan|tanh|tcdrain|tcdrain|tcflow|tcflow|tcflush|tcflush|" +
        "tcgetattr|tcgetattr|tcsendbreak|tcsendbreak|tcsetattr|tcsetattr|" +
        "temp_file|text_size|time|time|time|timed_read|timed_write|times|times|" +
        "tl|tl|tl|to_buffer|to_channel|to_float|to_hex|to_int|to_int32|to_list|" +
        "to_list|to_list|to_nativeint|to_string|to_string|to_string|to_string|" +
        "to_string|top|top|total_size|transfer|transp|truncate|truncate|truncate|" +
        "truncate|truncate|truncate|try_lock|umask|umask|uncapitalize|uncapitalize|" +
        "uncapitalize|union|union|unit_big_int|unlink|unlink|unlock|unmarshal|" +
        "unsafe_blit|unsafe_fill|unsafe_get|unsafe_get|unsafe_set|unsafe_set|" +
        "update|uppercase|uppercase|uppercase|uppercase|usage|utimes|utimes|wait|" +
        "wait|wait|wait|wait_next_event|wait_pid|wait_read|wait_signal|" +
        "wait_timed_read|wait_timed_write|wait_write|waitpid|white|" +
        "widen|window_id|word_size|wrap|wrap_abort|write|yellow|yield|zero|zero_big_int|" +

        "Arg|Arith_status|Array|Array1|Array2|Array3|ArrayLabels|Big_int|Bigarray|" +
        "Buffer|Callback|CamlinternalOO|Char|Complex|Condition|Dbm|Digest|Dynlink|" +
        "Event|Filename|Format|Gc|Genarray|Genlex|Graphics|GraphicsX11|Hashtbl|" +
        "Int32|Int64|LargeFile|Lazy|Lexing|List|ListLabels|Make|Map|Marshal|" +
        "MoreLabels|Mutex|Nativeint|Num|Obj|Oo|Parsing|Pervasives|Printexc|" +
        "Printf|Queue|Random|Scanf|Scanning|Set|Sort|Stack|State|StdLabels|Str|" +
        "Stream|String|StringLabels|Sys|Thread|ThreadUnix|Tk|Unix|UnixLabels|Weak"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "constant.language": builtinConstants,
        "support.function": builtinFunctions
    }, "identifier");

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : '\\(\\*.*?\\*\\)\\s*?$'
            },
            {
                token : "comment",
                regex : '\\(\\*.*',
                next : "comment"
            },
            {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            },
            {
                token : "string", // single char
                regex : "'.'"
            },
            {
                token : "string", // " string
                regex : '"',
                next  : "qstring"
            },
            {
                token : "constant.numeric", // imaginary
                regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
            },
            {
                token : "constant.numeric", // float
                regex : floatNumber
            },
            {
                token : "constant.numeric", // integer
                regex : integer + "\\b"
            },
            {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            },
            {
                token : "keyword.operator",
                regex : "\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|="
            },
            {
                token : "paren.lparen",
                regex : "[[({]"
            },
            {
                token : "paren.rparen",
                regex : "[\\])}]"
            },
            {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\)",
                next : "start"
            },
            {
                defaultToken : "comment"
            }
        ],

        "qstring" : [
            {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
};

oop.inherits(OcamlHighlightRules, TextHighlightRules);

exports.W = OcamlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ4NzUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSxvREFBb0QseUJBQXlCOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCOzs7Ozs7OztBQ3BDZjs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQywwQkFBMEIseURBQXNEO0FBQ2hGLDJCQUEyQixpREFBd0Q7QUFDbkYsWUFBWSwyQ0FBeUI7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjs7QUFFdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLFlBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2hFQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL29jYW1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvb2NhbWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgT2NhbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL29jYW1sX2hpZ2hsaWdodF9ydWxlc1wiKS5PY2FtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gT2NhbWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIFxuICAgIHRoaXMuJG91dGRlbnQgICA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbnZhciBpbmRlbnRlciA9IC8oPzpbKHtbPTpdfFstPV0+fFxcYig/OmVsc2V8dHJ5fHdpdGgpKVxccyokLztcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy50b2dnbGVDb21tZW50TGluZXMgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCBzdGFydFJvdywgZW5kUm93KSB7XG4gICAgICAgIHZhciBpLCBsaW5lO1xuICAgICAgICB2YXIgb3V0ZGVudCA9IHRydWU7XG4gICAgICAgIHZhciByZSA9IC9eXFxzKlxcKFxcKiguKilcXCpcXCkvO1xuXG4gICAgICAgIGZvciAoaT1zdGFydFJvdzsgaTw9IGVuZFJvdzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXJlLnRlc3QoZG9jLmdldExpbmUoaSkpKSB7XG4gICAgICAgICAgICAgICAgb3V0ZGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJhbmdlID0gbmV3IFJhbmdlKDAsIDAsIDAsIDApO1xuICAgICAgICBmb3IgKGk9c3RhcnRSb3c7IGk8PSBlbmRSb3c7IGkrKykge1xuICAgICAgICAgICAgbGluZSA9IGRvYy5nZXRMaW5lKGkpO1xuICAgICAgICAgICAgcmFuZ2Uuc3RhcnQucm93ICA9IGk7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ICAgID0gaTtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBsaW5lLmxlbmd0aDtcblxuICAgICAgICAgICAgZG9jLnJlcGxhY2UocmFuZ2UsIG91dGRlbnQgPyBsaW5lLm1hdGNoKHJlKVsxXSA6IFwiKCpcIiArIGxpbmUgKyBcIiopXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcblxuICAgICAgICBpZiAoISh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0udHlwZSA9PT0gJ2NvbW1lbnQnKSAmJlxuICAgICAgICAgICAgc3RhdGUgPT09ICdzdGFydCcgJiYgaW5kZW50ZXIudGVzdChsaW5lKSlcbiAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9vY2FtbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIE9jYW1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJhbmR8YXN8YXNzZXJ0fGJlZ2lufGNsYXNzfGNvbnN0cmFpbnR8ZG98ZG9uZXxkb3dudG98ZWxzZXxlbmR8XCIgICtcbiAgICAgICAgXCJleGNlcHRpb258ZXh0ZXJuYWx8Zm9yfGZ1bnxmdW5jdGlvbnxmdW5jdG9yfGlmfGlufGluY2x1ZGV8XCIgICAgICtcbiAgICAgICAgXCJpbmhlcml0fGluaXRpYWxpemVyfGxhenl8bGV0fG1hdGNofG1ldGhvZHxtb2R1bGV8bXV0YWJsZXxuZXd8XCIgICtcbiAgICAgICAgXCJvYmplY3R8b2Z8b3Blbnxvcnxwcml2YXRlfHJlY3xzaWd8c3RydWN0fHRoZW58dG98dHJ5fHR5cGV8dmFsfFwiICtcbiAgICAgICAgXCJ2aXJ0dWFsfHdoZW58d2hpbGV8d2l0aFwiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFwidHJ1ZXxmYWxzZVwiKTtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImFic3xhYnNfYmlnX2ludHxhYnNfZmxvYXR8YWJzX251bXxhYnN0cmFjdF90YWd8YWNjZXB0fGFjY2Vzc3xhY29zfGFkZHxcIiArXG4gICAgICAgIFwiYWRkX2F2YWlsYWJsZV91bml0c3xhZGRfYmlnX2ludHxhZGRfYnVmZmVyfGFkZF9jaGFubmVsfGFkZF9jaGFyfFwiICtcbiAgICAgICAgXCJhZGRfaW5pdGlhbGl6ZXJ8YWRkX2ludF9iaWdfaW50fGFkZF9pbnRlcmZhY2VzfGFkZF9udW18YWRkX3N0cmluZ3xcIiArXG4gICAgICAgIFwiYWRkX3N1YnN0aXR1dGV8YWRkX3N1YnN0cmluZ3xhbGFybXxhbGxvY2F0ZWRfYnl0ZXN8YWxsb3dfb25seXxcIiArXG4gICAgICAgIFwiYWxsb3dfdW5zYWZlX21vZHVsZXN8YWx3YXlzfGFwcGVuZHxhcHBuYW1lX2dldHxhcHBuYW1lX3NldHxcIiArXG4gICAgICAgIFwiYXBwcm94X251bV9leHB8YXBwcm94X251bV9maXh8YXJnfGFyZ3Z8YXJpdGhfc3RhdHVzfGFycmF5fFwiICtcbiAgICAgICAgXCJhcnJheTFfb2ZfZ2VuYXJyYXl8YXJyYXkyX29mX2dlbmFycmF5fGFycmF5M19vZl9nZW5hcnJheXxhc2lufGFzcnxcIiArXG4gICAgICAgIFwiYXNzb2N8YXNzcXxhdF9leGl0fGF0YW58YXRhbjJ8YXV0b19zeW5jaHJvbml6ZXxiYWNrZ3JvdW5kfGJhc2VuYW1lfFwiICtcbiAgICAgICAgXCJiZWdpbm5pbmdfb2ZfaW5wdXR8YmlnX2ludF9vZl9pbnR8YmlnX2ludF9vZl9udW18YmlnX2ludF9vZl9zdHJpbmd8YmluZHxcIiArXG4gICAgICAgIFwiYmluZF9jbGFzc3xiaW5kX3RhZ3xiaXRzfGJpdHNfb2ZfZmxvYXR8YmxhY2t8YmxpdHxibGl0X2ltYWdlfGJsdWV8Ym9vbHxcIiArXG4gICAgICAgIFwiYm9vbF9vZl9zdHJpbmd8Ym91bmRlZF9mdWxsX3NwbGl0fGJvdW5kZWRfc3BsaXR8Ym91bmRlZF9zcGxpdF9kZWxpbXxcIiArXG4gICAgICAgIFwiYnByaW50ZnxicmVha3xicm9hZGNhc3R8YnNjYW5mfGJ1dHRvbl9kb3dufGNfbGF5b3V0fGNhcGl0YWxpemV8Y2FyZGluYWx8XCIgK1xuICAgICAgICBcImNhcmRpbmFsfGNhdGNofGNhdGNoX2JyZWFrfGNlaWx8Y2VpbGluZ19udW18Y2hhbm5lbHxjaGFyfGNoYXJfb2ZfaW50fFwiICtcbiAgICAgICAgXCJjaGRpcnxjaGVja3xjaGVja19zdWZmaXh8Y2htb2R8Y2hvb3NlfGNob3BfZXh0ZW5zaW9ufGNob3Bfc3VmZml4fGNob3dufFwiICtcbiAgICAgICAgXCJjaG93bnxjaHJ8Y2hyb290fGNsYXNzaWZ5X2Zsb2F0fGNsZWFyfGNsZWFyX2F2YWlsYWJsZV91bml0c3xcIiArXG4gICAgICAgIFwiY2xlYXJfY2xvc2Vfb25fZXhlY3xjbGVhcl9ncmFwaHxjbGVhcl9ub25ibG9ja3xjbGVhcl9wYXJzZXJ8XCIgK1xuICAgICAgICBcImNsb3NlfGNsb3NlfGNsb3NlVGt8Y2xvc2VfYm94fGNsb3NlX2dyYXBofGNsb3NlX2lufGNsb3NlX2luX25vZXJyfFwiICtcbiAgICAgICAgXCJjbG9zZV9vdXR8Y2xvc2Vfb3V0X25vZXJyfGNsb3NlX3Byb2Nlc3N8Y2xvc2VfcHJvY2Vzc3xcIiArXG4gICAgICAgIFwiY2xvc2VfcHJvY2Vzc19mdWxsfGNsb3NlX3Byb2Nlc3NfaW58Y2xvc2VfcHJvY2Vzc19vdXR8Y2xvc2Vfc3Vid2luZG93fFwiICtcbiAgICAgICAgXCJjbG9zZV90YWd8Y2xvc2VfdGJveHxjbG9zZWRpcnxjbG9zZWRpcnxjbG9zdXJlX3RhZ3xjb2RlfGNvbWJpbmV8XCIgK1xuICAgICAgICBcImNvbWJpbmV8Y29tYmluZXxjb21tYW5kfGNvbXBhY3R8Y29tcGFyZXxjb21wYXJlX2JpZ19pbnR8Y29tcGFyZV9udW18XCIgK1xuICAgICAgICBcImNvbXBsZXgzMnxjb21wbGV4NjR8Y29uY2F0fGNvbmp8Y29ubmVjdHxjb250YWluc3xjb250YWluc19mcm9tfGNvbnRlbnRzfFwiICtcbiAgICAgICAgXCJjb3B5fGNvc3xjb3NofGNvdW50fGNvdW50fGNvdW50ZXJzfGNyZWF0ZXxjcmVhdGVfYWxhcm18Y3JlYXRlX2ltYWdlfFwiICtcbiAgICAgICAgXCJjcmVhdGVfbWF0cml4fGNyZWF0ZV9tYXRyaXh8Y3JlYXRlX21hdHJpeHxjcmVhdGVfb2JqZWN0fFwiICtcbiAgICAgICAgXCJjcmVhdGVfb2JqZWN0X2FuZF9ydW5faW5pdGlhbGl6ZXJzfGNyZWF0ZV9vYmplY3Rfb3B0fGNyZWF0ZV9wcm9jZXNzfFwiICtcbiAgICAgICAgXCJjcmVhdGVfcHJvY2Vzc3xjcmVhdGVfcHJvY2Vzc19lbnZ8Y3JlYXRlX3Byb2Nlc3NfZW52fGNyZWF0ZV90YWJsZXxcIiArXG4gICAgICAgIFwiY3VycmVudHxjdXJyZW50X2Rpcl9uYW1lfGN1cnJlbnRfcG9pbnR8Y3VycmVudF94fGN1cnJlbnRfeXxjdXJ2ZXRvfFwiICtcbiAgICAgICAgXCJjdXN0b21fdGFnfGN5YW58ZGF0YV9zaXplfGRlY3J8ZGVjcl9udW18ZGVmYXVsdF9hdmFpbGFibGVfdW5pdHN8ZGVsYXl8XCIgK1xuICAgICAgICBcImRlbGV0ZV9hbGFybXxkZXNjcl9vZl9pbl9jaGFubmVsfGRlc2NyX29mX291dF9jaGFubmVsfGRlc3Ryb3l8ZGlmZnxkaW18XCIgK1xuICAgICAgICBcImRpbTF8ZGltMnxkaW0zfGRpbXN8ZGlybmFtZXxkaXNwbGF5X21vZGV8ZGl2fGRpdl9iaWdfaW50fGRpdl9udW18XCIgK1xuICAgICAgICBcImRvdWJsZV9hcnJheV90YWd8ZG91YmxlX3RhZ3xkcmF3X2FyY3xkcmF3X2NoYXJ8ZHJhd19jaXJjbGV8ZHJhd19lbGxpcHNlfFwiICtcbiAgICAgICAgXCJkcmF3X2ltYWdlfGRyYXdfcG9seXxkcmF3X3BvbHlfbGluZXxkcmF3X3JlY3R8ZHJhd19zZWdtZW50c3xkcmF3X3N0cmluZ3xcIiArXG4gICAgICAgIFwiZHVtbXlfcG9zfGR1bW15X3RhYmxlfGR1bXBfaW1hZ2V8ZHVwfGR1cDJ8ZWxlbWVudHN8ZW1wdHl8ZW5kX29mX2lucHV0fFwiICtcbiAgICAgICAgXCJlbnZpcm9ubWVudHxlcHJpbnRmfGVwc2lsb25fZmxvYXR8ZXFfYmlnX2ludHxlcV9udW18ZXF1YWx8ZXJyX2Zvcm1hdHRlcnxcIiArXG4gICAgICAgIFwiZXJyb3JfbWVzc2FnZXxlc2NhcGVkfGVzdGFibGlzaF9zZXJ2ZXJ8ZXhlY3V0YWJsZV9uYW1lfGV4ZWN2fGV4ZWN2ZXxleGVjdnB8XCIgK1xuICAgICAgICBcImV4ZWN2cGV8ZXhpc3RzfGV4aXN0czJ8ZXhpdHxleHB8ZmFpbHdpdGh8ZmFzdF9zb3J0fGZjaG1vZHxmY2hvd258ZmllbGR8XCIgK1xuICAgICAgICBcImZpbGV8ZmlsZV9leGlzdHN8ZmlsbHxmaWxsX2FyY3xmaWxsX2NpcmNsZXxmaWxsX2VsbGlwc2V8ZmlsbF9wb2x5fGZpbGxfcmVjdHxcIiArXG4gICAgICAgIFwiZmlsdGVyfGZpbmFsX3RhZ3xmaW5hbGlzZXxmaW5kfGZpbmRfYWxsfGZpcnN0X2NoYXJzfGZpcnN0a2V5fGZsYXR0ZW58XCIgK1xuICAgICAgICBcImZsb2F0fGZsb2F0MzJ8ZmxvYXQ2NHxmbG9hdF9vZl9iaWdfaW50fGZsb2F0X29mX2JpdHN8ZmxvYXRfb2ZfaW50fFwiICtcbiAgICAgICAgXCJmbG9hdF9vZl9udW18ZmxvYXRfb2Zfc3RyaW5nfGZsb29yfGZsb29yX251bXxmbHVzaHxmbHVzaF9hbGx8Zmx1c2hfaW5wdXR8XCIgK1xuICAgICAgICBcImZsdXNoX3N0cl9mb3JtYXR0ZXJ8Zm9sZHxmb2xkX2xlZnR8Zm9sZF9sZWZ0Mnxmb2xkX3JpZ2h0fGZvbGRfcmlnaHQyfFwiICtcbiAgICAgICAgXCJmb3JfYWxsfGZvcl9hbGwyfGZvcmNlfGZvcmNlX25ld2xpbmV8Zm9yY2VfdmFsfGZvcmVncm91bmR8Zm9ya3xcIiArXG4gICAgICAgIFwiZm9ybWF0X29mX3N0cmluZ3xmb3JtYXR0ZXJfb2ZfYnVmZmVyfGZvcm1hdHRlcl9vZl9vdXRfY2hhbm5lbHxcIiArXG4gICAgICAgIFwiZm9ydHJhbl9sYXlvdXR8Zm9yd2FyZF90YWd8ZnByaW50ZnxmcmV4cHxmcm9tfGZyb21fY2hhbm5lbHxmcm9tX2ZpbGV8XCIgK1xuICAgICAgICBcImZyb21fZmlsZV9iaW58ZnJvbV9mdW5jdGlvbnxmcm9tX3N0cmluZ3xmc2NhbmZ8ZnN0fGZzdGF0fGZ0cnVuY2F0ZXxcIiArXG4gICAgICAgIFwiZnVsbF9pbml0fGZ1bGxfbWFqb3J8ZnVsbF9zcGxpdHxnY2RfYmlnX2ludHxnZV9iaWdfaW50fGdlX251bXxcIiArXG4gICAgICAgIFwiZ2VuYXJyYXlfb2ZfYXJyYXkxfGdlbmFycmF5X29mX2FycmF5MnxnZW5hcnJheV9vZl9hcnJheTN8Z2V0fFwiICtcbiAgICAgICAgXCJnZXRfYWxsX2Zvcm1hdHRlcl9vdXRwdXRfZnVuY3Rpb25zfGdldF9hcHByb3hfcHJpbnRpbmd8Z2V0X2NvcHl8XCIgK1xuICAgICAgICBcImdldF9lbGxpcHNpc190ZXh0fGdldF9lcnJvcl93aGVuX251bGxfZGVub21pbmF0b3J8Z2V0X2Zsb2F0aW5nX3ByZWNpc2lvbnxcIiArXG4gICAgICAgIFwiZ2V0X2Zvcm1hdHRlcl9vdXRwdXRfZnVuY3Rpb25zfGdldF9mb3JtYXR0ZXJfdGFnX2Z1bmN0aW9uc3xnZXRfaW1hZ2V8XCIgK1xuICAgICAgICBcImdldF9tYXJnaW58Z2V0X21hcmtfdGFnc3xnZXRfbWF4X2JveGVzfGdldF9tYXhfaW5kZW50fGdldF9tZXRob2R8XCIgK1xuICAgICAgICBcImdldF9tZXRob2RfbGFiZWx8Z2V0X25vcm1hbGl6ZV9yYXRpb3xnZXRfbm9ybWFsaXplX3JhdGlvX3doZW5fcHJpbnRpbmd8XCIgK1xuICAgICAgICBcImdldF9wcmludF90YWdzfGdldF9zdGF0ZXxnZXRfdmFyaWFibGV8Z2V0Y3dkfGdldGVnaWR8Z2V0ZWdpZHxnZXRlbnZ8XCIgK1xuICAgICAgICBcImdldGVudnxnZXRlbnZ8Z2V0ZXVpZHxnZXRldWlkfGdldGdpZHxnZXRnaWR8Z2V0Z3JnaWR8Z2V0Z3JnaWR8Z2V0Z3JuYW18XCIgK1xuICAgICAgICBcImdldGdybmFtfGdldGdyb3Vwc3xnZXRob3N0YnlhZGRyfGdldGhvc3RieW5hbWV8Z2V0aG9zdG5hbWV8Z2V0aXRpbWVyfFwiICtcbiAgICAgICAgXCJnZXRsb2dpbnxnZXRwZWVybmFtZXxnZXRwaWR8Z2V0cHBpZHxnZXRwcm90b2J5bmFtZXxnZXRwcm90b2J5bnVtYmVyfFwiICtcbiAgICAgICAgXCJnZXRwd25hbXxnZXRwd3VpZHxnZXRzZXJ2YnluYW1lfGdldHNlcnZieXBvcnR8Z2V0c29ja25hbWV8Z2V0c29ja29wdHxcIiArXG4gICAgICAgIFwiZ2V0c29ja29wdF9mbG9hdHxnZXRzb2Nrb3B0X2ludHxnZXRzb2Nrb3B0X29wdGludHxnZXR0aW1lb2ZkYXl8Z2V0dWlkfFwiICtcbiAgICAgICAgXCJnbG9iYWxfcmVwbGFjZXxnbG9iYWxfc3Vic3RpdHV0ZXxnbXRpbWV8Z3JlZW58Z3JpZHxncm91cF9iZWdpbm5pbmd8XCIgK1xuICAgICAgICBcImdyb3VwX2VuZHxndF9iaWdfaW50fGd0X251bXxndWFyZHxoYW5kbGVfdW5peF9lcnJvcnxoYXNofGhhc2hfcGFyYW18XCIgK1xuICAgICAgICBcImhkfGhlYWRlcl9zaXplfGl8aWR8aWdub3JlfGluX2NoYW5uZWxfbGVuZ3RofGluX2NoYW5uZWxfb2ZfZGVzY3J8aW5jcnxcIiArXG4gICAgICAgIFwiaW5jcl9udW18aW5kZXh8aW5kZXhfZnJvbXxpbmV0X2FkZHJfYW55fGluZXRfYWRkcl9vZl9zdHJpbmd8aW5maW5pdHl8XCIgK1xuICAgICAgICBcImluZml4X3RhZ3xpbml0fGluaXRfY2xhc3N8aW5wdXR8aW5wdXRfYmluYXJ5X2ludHxpbnB1dF9ieXRlfGlucHV0X2NoYXJ8XCIgK1xuICAgICAgICBcImlucHV0X2xpbmV8aW5wdXRfdmFsdWV8aW50fGludDE2X3NpZ25lZHxpbnQxNl91bnNpZ25lZHxpbnQzMnxpbnQ2NHxcIiArXG4gICAgICAgIFwiaW50OF9zaWduZWR8aW50OF91bnNpZ25lZHxpbnRfb2ZfYmlnX2ludHxpbnRfb2ZfY2hhcnxpbnRfb2ZfZmxvYXR8XCIgK1xuICAgICAgICBcImludF9vZl9udW18aW50X29mX3N0cmluZ3xpbnRlZ2VyX251bXxpbnRlcnxpbnRlcmFjdGl2ZXxpbnZ8aW52YWxpZF9hcmd8XCIgK1xuICAgICAgICBcImlzX2Jsb2NrfGlzX2VtcHR5fGlzX2ltcGxpY2l0fGlzX2ludHxpc19pbnRfYmlnX2ludHxpc19pbnRlZ2VyX251bXxcIiArXG4gICAgICAgIFwiaXNfcmVsYXRpdmV8aXRlcnxpdGVyMnxpdGVyaXxqb2lufGp1bmt8a2V5X3ByZXNzZWR8a2lsbHxraW5kfGtwcmludGZ8XCIgK1xuICAgICAgICBcImtzY2FuZnxsYW5kfGxhc3RfY2hhcnN8bGF5b3V0fGxhenlfZnJvbV9mdW58bGF6eV9mcm9tX3ZhbHxsYXp5X2lzX3ZhbHxcIiArXG4gICAgICAgIFwibGF6eV90YWd8bGRleHB8bGVfYmlnX2ludHxsZV9udW18bGVuZ3RofGxleGVtZXxsZXhlbWVfY2hhcnxsZXhlbWVfZW5kfFwiICtcbiAgICAgICAgXCJsZXhlbWVfZW5kX3B8bGV4ZW1lX3N0YXJ0fGxleGVtZV9zdGFydF9wfGxpbmV0b3xsaW5rfGxpc3R8bGlzdGVufGxub3R8XCIgK1xuICAgICAgICBcImxvYWRmaWxlfGxvYWRmaWxlX3ByaXZhdGV8bG9jYWx0aW1lfGxvY2t8bG9ja2Z8bG9nfGxvZzEwfGxvZ2FuZHxsb2dub3R8XCIgK1xuICAgICAgICBcImxvZ29yfGxvZ3hvcnxsb3J8bG93ZXJfd2luZG93fGxvd2VyY2FzZXxsc2Vla3xsc2x8bHNyfGxzdGF0fGx0X2JpZ19pbnR8XCIgK1xuICAgICAgICBcImx0X251bXxseG9yfG1hZ2VudGF8bWFnaWN8bWFpbkxvb3B8bWFqb3J8bWFqb3Jfc2xpY2V8bWFrZXxtYWtlX2Zvcm1hdHRlcnxcIiArXG4gICAgICAgIFwibWFrZV9pbWFnZXxtYWtlX2xleGVyfG1ha2VfbWF0cml4fG1ha2Vfc2VsZl9pbml0fG1hcHxtYXAyfG1hcF9maWxlfG1hcGl8XCIgK1xuICAgICAgICBcIm1hcnNoYWx8bWF0Y2hfYmVnaW5uaW5nfG1hdGNoX2VuZHxtYXRjaGVkX2dyb3VwfG1hdGNoZWRfc3RyaW5nfG1heHxcIiArXG4gICAgICAgIFwibWF4X2FycmF5X2xlbmd0aHxtYXhfYmlnX2ludHxtYXhfZWx0fG1heF9mbG9hdHxtYXhfaW50fG1heF9udW18XCIgK1xuICAgICAgICBcIm1heF9zdHJpbmdfbGVuZ3RofG1lbXxtZW1fYXNzb2N8bWVtX2Fzc3F8bWVtcXxtZXJnZXxtaW58bWluX2JpZ19pbnR8XCIgK1xuICAgICAgICBcIm1pbl9lbHR8bWluX2Zsb2F0fG1pbl9pbnR8bWluX251bXxtaW5vcnxtaW51c19iaWdfaW50fG1pbnVzX251bXxcIiArXG4gICAgICAgIFwibWludXNfb25lfG1rZGlyfG1rZmlmb3xta3RpbWV8bW9kfG1vZF9iaWdfaW50fG1vZF9mbG9hdHxtb2RfbnVtfG1vZGZ8XCIgK1xuICAgICAgICBcIm1vdXNlX3Bvc3xtb3ZldG98bXVsfG11bHRfYmlnX2ludHxtdWx0X2ludF9iaWdfaW50fG11bHRfbnVtfG5hbnxuYXJyb3d8XCIgK1xuICAgICAgICBcIm5hdF9vZl9udW18bmF0aXZlaW50fG5lZ3xuZWdfaW5maW5pdHl8bmV3X2Jsb2NrfG5ld19jaGFubmVsfG5ld19tZXRob2R8XCIgK1xuICAgICAgICBcIm5ld192YXJpYWJsZXxuZXh0fG5leHRrZXl8bmljZXxuaWNlfG5vX3NjYW5fdGFnfG5vcm18bm9ybTJ8bm90fG5wZWVrfFwiICtcbiAgICAgICAgXCJudGh8bnRoX2RpbXxudW1fZGlnaXRzX2JpZ19pbnR8bnVtX2RpbXN8bnVtX29mX2JpZ19pbnR8bnVtX29mX2ludHxcIiArXG4gICAgICAgIFwibnVtX29mX25hdHxudW1fb2ZfcmF0aW98bnVtX29mX3N0cmluZ3xPfG9ianxvYmplY3RfdGFnfG9jYW1sX3ZlcnNpb258XCIgK1xuICAgICAgICBcIm9mX2FycmF5fG9mX2NoYW5uZWx8b2ZfZmxvYXR8b2ZfaW50fG9mX2ludDMyfG9mX2xpc3R8b2ZfbmF0aXZlaW50fFwiICtcbiAgICAgICAgXCJvZl9zdHJpbmd8b25lfG9wZW5Ua3xvcGVuX2JveHxvcGVuX2Nvbm5lY3Rpb258b3Blbl9ncmFwaHxvcGVuX2hib3h8XCIgK1xuICAgICAgICBcIm9wZW5faG92Ym94fG9wZW5faHZib3h8b3Blbl9pbnxvcGVuX2luX2JpbnxvcGVuX2luX2dlbnxvcGVuX291dHxcIiArXG4gICAgICAgIFwib3Blbl9vdXRfYmlufG9wZW5fb3V0X2dlbnxvcGVuX3Byb2Nlc3N8b3Blbl9wcm9jZXNzX2Z1bGx8b3Blbl9wcm9jZXNzX2lufFwiICtcbiAgICAgICAgXCJvcGVuX3Byb2Nlc3Nfb3V0fG9wZW5fc3Vid2luZG93fG9wZW5fdGFnfG9wZW5fdGJveHxvcGVuX3RlbXBfZmlsZXxcIiArXG4gICAgICAgIFwib3Blbl92Ym94fG9wZW5kYm18b3BlbmRpcnxvcGVuZmlsZXxvcnxvc190eXBlfG91dF9jaGFubmVsX2xlbmd0aHxcIiArXG4gICAgICAgIFwib3V0X2NoYW5uZWxfb2ZfZGVzY3J8b3V0cHV0fG91dHB1dF9iaW5hcnlfaW50fG91dHB1dF9idWZmZXJ8b3V0cHV0X2J5dGV8XCIgK1xuICAgICAgICBcIm91dHB1dF9jaGFyfG91dHB1dF9zdHJpbmd8b3V0cHV0X3ZhbHVlfG92ZXJfbWF4X2JveGVzfHBhY2t8cGFyYW1zfFwiICtcbiAgICAgICAgXCJwYXJlbnRfZGlyX25hbWV8cGFyc2V8cGFyc2VfYXJndnxwYXJ0aXRpb258cGF1c2V8cGVla3xwaXBlfHBpeGVsc3xcIiArXG4gICAgICAgIFwicGxhY2V8cGxvdHxwbG90c3xwb2ludF9jb2xvcnxwb2xhcnxwb2xsfHBvcHxwb3NfaW58cG9zX291dHxwb3d8XCIgK1xuICAgICAgICBcInBvd2VyX2JpZ19pbnRfcG9zaXRpdmVfYmlnX2ludHxwb3dlcl9iaWdfaW50X3Bvc2l0aXZlX2ludHxcIiArXG4gICAgICAgIFwicG93ZXJfaW50X3Bvc2l0aXZlX2JpZ19pbnR8cG93ZXJfaW50X3Bvc2l0aXZlX2ludHxwb3dlcl9udW18XCIgK1xuICAgICAgICBcInBwX2Nsb3NlX2JveHxwcF9jbG9zZV90YWd8cHBfY2xvc2VfdGJveHxwcF9mb3JjZV9uZXdsaW5lfFwiICtcbiAgICAgICAgXCJwcF9nZXRfYWxsX2Zvcm1hdHRlcl9vdXRwdXRfZnVuY3Rpb25zfHBwX2dldF9lbGxpcHNpc190ZXh0fFwiICtcbiAgICAgICAgXCJwcF9nZXRfZm9ybWF0dGVyX291dHB1dF9mdW5jdGlvbnN8cHBfZ2V0X2Zvcm1hdHRlcl90YWdfZnVuY3Rpb25zfFwiICtcbiAgICAgICAgXCJwcF9nZXRfbWFyZ2lufHBwX2dldF9tYXJrX3RhZ3N8cHBfZ2V0X21heF9ib3hlc3xwcF9nZXRfbWF4X2luZGVudHxcIiArXG4gICAgICAgIFwicHBfZ2V0X3ByaW50X3RhZ3N8cHBfb3Blbl9ib3h8cHBfb3Blbl9oYm94fHBwX29wZW5faG92Ym94fHBwX29wZW5faHZib3h8XCIgK1xuICAgICAgICBcInBwX29wZW5fdGFnfHBwX29wZW5fdGJveHxwcF9vcGVuX3Zib3h8cHBfb3Zlcl9tYXhfYm94ZXN8cHBfcHJpbnRfYXN8XCIgK1xuICAgICAgICBcInBwX3ByaW50X2Jvb2x8cHBfcHJpbnRfYnJlYWt8cHBfcHJpbnRfY2hhcnxwcF9wcmludF9jdXR8cHBfcHJpbnRfZmxvYXR8XCIgK1xuICAgICAgICBcInBwX3ByaW50X2ZsdXNofHBwX3ByaW50X2lmX25ld2xpbmV8cHBfcHJpbnRfaW50fHBwX3ByaW50X25ld2xpbmV8XCIgK1xuICAgICAgICBcInBwX3ByaW50X3NwYWNlfHBwX3ByaW50X3N0cmluZ3xwcF9wcmludF90YWJ8cHBfcHJpbnRfdGJyZWFrfFwiICtcbiAgICAgICAgXCJwcF9zZXRfYWxsX2Zvcm1hdHRlcl9vdXRwdXRfZnVuY3Rpb25zfHBwX3NldF9lbGxpcHNpc190ZXh0fFwiICtcbiAgICAgICAgXCJwcF9zZXRfZm9ybWF0dGVyX291dF9jaGFubmVsfHBwX3NldF9mb3JtYXR0ZXJfb3V0cHV0X2Z1bmN0aW9uc3xcIiArXG4gICAgICAgIFwicHBfc2V0X2Zvcm1hdHRlcl90YWdfZnVuY3Rpb25zfHBwX3NldF9tYXJnaW58cHBfc2V0X21hcmtfdGFnc3xcIiArXG4gICAgICAgIFwicHBfc2V0X21heF9ib3hlc3xwcF9zZXRfbWF4X2luZGVudHxwcF9zZXRfcHJpbnRfdGFnc3xwcF9zZXRfdGFifFwiICtcbiAgICAgICAgXCJwcF9zZXRfdGFnc3xwcmVkfHByZWRfYmlnX2ludHxwcmVkX251bXxwcmVycl9jaGFyfHByZXJyX2VuZGxpbmV8XCIgK1xuICAgICAgICBcInByZXJyX2Zsb2F0fHByZXJyX2ludHxwcmVycl9uZXdsaW5lfHByZXJyX3N0cmluZ3xwcmludHxwcmludF9hc3xcIiArXG4gICAgICAgIFwicHJpbnRfYm9vbHxwcmludF9icmVha3xwcmludF9jaGFyfHByaW50X2N1dHxwcmludF9lbmRsaW5lfHByaW50X2Zsb2F0fFwiICtcbiAgICAgICAgXCJwcmludF9mbHVzaHxwcmludF9pZl9uZXdsaW5lfHByaW50X2ludHxwcmludF9uZXdsaW5lfHByaW50X3NwYWNlfFwiICtcbiAgICAgICAgXCJwcmludF9zdGF0fHByaW50X3N0cmluZ3xwcmludF90YWJ8cHJpbnRfdGJyZWFrfHByaW50Znxwcm9oaWJpdHxcIiArXG4gICAgICAgIFwicHVibGljX21ldGhvZF9sYWJlbHxwdXNofHB1dGVudnxxdW9fbnVtfHF1b21vZF9iaWdfaW50fHF1b3RlfHJhaXNlfFwiICtcbiAgICAgICAgXCJyYWlzZV93aW5kb3d8cmF0aW9fb2ZfbnVtfHJjb250YWluc19mcm9tfHJlYWR8cmVhZF9mbG9hdHxyZWFkX2ludHxcIiArXG4gICAgICAgIFwicmVhZF9rZXl8cmVhZF9saW5lfHJlYWRkaXJ8cmVhZGRpcnxyZWFkbGlua3xyZWFsbHlfaW5wdXR8cmVjZWl2ZXxyZWN2fFwiICtcbiAgICAgICAgXCJyZWN2ZnJvbXxyZWR8cmVmfHJlZ2V4cHxyZWdleHBfY2FzZV9mb2xkfHJlZ2V4cF9zdHJpbmd8XCIgK1xuICAgICAgICBcInJlZ2V4cF9zdHJpbmdfY2FzZV9mb2xkfHJlZ2lzdGVyfHJlZ2lzdGVyX2V4Y2VwdGlvbnxyZW18cmVtZW1iZXJfbW9kZXxcIiArXG4gICAgICAgIFwicmVtb3ZlfHJlbW92ZV9hc3NvY3xyZW1vdmVfYXNzcXxyZW5hbWV8cmVwbGFjZXxyZXBsYWNlX2ZpcnN0fFwiICtcbiAgICAgICAgXCJyZXBsYWNlX21hdGNoZWR8cmVwcnxyZXNldHxyZXNoYXBlfHJlc2hhcGVfMXxyZXNoYXBlXzJ8cmVzaGFwZV8zfHJldnxcIiArXG4gICAgICAgIFwicmV2X2FwcGVuZHxyZXZfbWFwfHJldl9tYXAyfHJld2luZGRpcnxyZ2J8cmhzX2VuZHxyaHNfZW5kX3Bvc3xyaHNfc3RhcnR8XCIgK1xuICAgICAgICBcInJoc19zdGFydF9wb3N8cmluZGV4fHJpbmRleF9mcm9tfHJsaW5ldG98cm1kaXJ8cm1vdmV0b3xyb3VuZF9udW18XCIgK1xuICAgICAgICBcInJ1bl9pbml0aWFsaXplcnN8cnVuX2luaXRpYWxpemVyc19vcHR8c2NhbmZ8c2VhcmNoX2JhY2t3YXJkfFwiICtcbiAgICAgICAgXCJzZWFyY2hfZm9yd2FyZHxzZWVrX2lufHNlZWtfb3V0fHNlbGVjdHxzZWxmfHNlbGZfaW5pdHxzZW5kfHNlbmR0b3xzZXR8XCIgK1xuICAgICAgICBcInNldF9hbGxfZm9ybWF0dGVyX291dHB1dF9mdW5jdGlvbnN8c2V0X2FwcHJveF9wcmludGluZ3xcIiArXG4gICAgICAgIFwic2V0X2JpbmFyeV9tb2RlX2lufHNldF9iaW5hcnlfbW9kZV9vdXR8c2V0X2Nsb3NlX29uX2V4ZWN8XCIgK1xuICAgICAgICBcInNldF9jbG9zZV9vbl9leGVjfHNldF9jb2xvcnxzZXRfZWxsaXBzaXNfdGV4dHxcIiArXG4gICAgICAgIFwic2V0X2Vycm9yX3doZW5fbnVsbF9kZW5vbWluYXRvcnxzZXRfZmllbGR8c2V0X2Zsb2F0aW5nX3ByZWNpc2lvbnxcIiArXG4gICAgICAgIFwic2V0X2ZvbnR8c2V0X2Zvcm1hdHRlcl9vdXRfY2hhbm5lbHxzZXRfZm9ybWF0dGVyX291dHB1dF9mdW5jdGlvbnN8XCIgK1xuICAgICAgICBcInNldF9mb3JtYXR0ZXJfdGFnX2Z1bmN0aW9uc3xzZXRfbGluZV93aWR0aHxzZXRfbWFyZ2lufHNldF9tYXJrX3RhZ3N8XCIgK1xuICAgICAgICBcInNldF9tYXhfYm94ZXN8c2V0X21heF9pbmRlbnR8c2V0X21ldGhvZHxzZXRfbm9uYmxvY2t8c2V0X25vbmJsb2NrfFwiICtcbiAgICAgICAgXCJzZXRfbm9ybWFsaXplX3JhdGlvfHNldF9ub3JtYWxpemVfcmF0aW9fd2hlbl9wcmludGluZ3xzZXRfcHJpbnRfdGFnc3xcIiArXG4gICAgICAgIFwic2V0X3NpZ25hbHxzZXRfc3RhdGV8c2V0X3RhYnxzZXRfdGFnfHNldF90YWdzfHNldF90ZXh0X3NpemV8XCIgK1xuICAgICAgICBcInNldF93aW5kb3dfdGl0bGV8c2V0Z2lkfHNldGdpZHxzZXRpdGltZXJ8c2V0aXRpbWVyfHNldHNpZHxzZXRzaWR8XCIgK1xuICAgICAgICBcInNldHNvY2tvcHR8c2V0c29ja29wdHxzZXRzb2Nrb3B0X2Zsb2F0fHNldHNvY2tvcHRfZmxvYXR8c2V0c29ja29wdF9pbnR8XCIgK1xuICAgICAgICBcInNldHNvY2tvcHRfaW50fHNldHNvY2tvcHRfb3B0aW50fHNldHNvY2tvcHRfb3B0aW50fHNldHVpZHxzZXR1aWR8XCIgK1xuICAgICAgICBcInNoaWZ0X2xlZnR8c2hpZnRfbGVmdHxzaGlmdF9sZWZ0fHNoaWZ0X3JpZ2h0fHNoaWZ0X3JpZ2h0fHNoaWZ0X3JpZ2h0fFwiICtcbiAgICAgICAgXCJzaGlmdF9yaWdodF9sb2dpY2FsfHNoaWZ0X3JpZ2h0X2xvZ2ljYWx8c2hpZnRfcmlnaHRfbG9naWNhbHxzaG93X2J1Y2tldHN8XCIgK1xuICAgICAgICBcInNodXRkb3dufHNodXRkb3dufHNodXRkb3duX2Nvbm5lY3Rpb258c2h1dGRvd25fY29ubmVjdGlvbnxzaWdhYnJ0fFwiICtcbiAgICAgICAgXCJzaWdhbHJtfHNpZ2NobGR8c2lnY29udHxzaWdmcGV8c2lnaHVwfHNpZ2lsbHxzaWdpbnR8c2lna2lsbHxzaWduX2JpZ19pbnR8XCIgK1xuICAgICAgICBcInNpZ25fbnVtfHNpZ25hbHxzaWduYWx8c2lncGVuZGluZ3xzaWdwZW5kaW5nfHNpZ3BpcGV8c2lncHJvY21hc2t8XCIgK1xuICAgICAgICBcInNpZ3Byb2NtYXNrfHNpZ3Byb2Z8c2lncXVpdHxzaWdzZWd2fHNpZ3N0b3B8c2lnc3VzcGVuZHxzaWdzdXNwZW5kfFwiICtcbiAgICAgICAgXCJzaWd0ZXJtfHNpZ3RzdHB8c2lndHRpbnxzaWd0dG91fHNpZ3VzcjF8c2lndXNyMnxzaWd2dGFscm18c2lufHNpbmdsZXRvbnxcIiArXG4gICAgICAgIFwic2luaHxzaXplfHNpemV8c2l6ZV94fHNpemVfeXxzbGVlcHxzbGVlcHxzbGVlcHxzbGljZV9sZWZ0fHNsaWNlX2xlZnR8XCIgK1xuICAgICAgICBcInNsaWNlX2xlZnRfMXxzbGljZV9sZWZ0XzJ8c2xpY2VfcmlnaHR8c2xpY2VfcmlnaHR8c2xpY2VfcmlnaHRfMXxcIiArXG4gICAgICAgIFwic2xpY2VfcmlnaHRfMnxzbmR8c29ja2V0fHNvY2tldHxzb2NrZXR8c29ja2V0cGFpcnxzb2NrZXRwYWlyfHNvcnR8c291bmR8XCIgK1xuICAgICAgICBcInNwbGl0fHNwbGl0X2RlbGltfHNwcmludGZ8c3ByaW50ZnxzcXJ0fHNxcnR8c3FydF9iaWdfaW50fHNxdWFyZV9iaWdfaW50fFwiICtcbiAgICAgICAgXCJzcXVhcmVfbnVtfHNzY2FuZnxzdGFibGVfc29ydHxzdGFibGVfc29ydHxzdGFibGVfc29ydHxzdGFibGVfc29ydHxzdGFibGVfc29ydHxcIiArXG4gICAgICAgIFwic3RhYmxlX3NvcnR8c3RhdHxzdGF0fHN0YXR8c3RhdHxzdGF0fHN0YXRzfHN0YXRzfHN0ZF9mb3JtYXR0ZXJ8c3RkYnVmfFwiICtcbiAgICAgICAgXCJzdGRlcnJ8c3RkZXJyfHN0ZGVycnxzdGRpYnxzdGRpbnxzdGRpbnxzdGRpbnxzdGRvdXR8c3Rkb3V0fHN0ZG91dHxcIiArXG4gICAgICAgIFwic3RyX2Zvcm1hdHRlcnxzdHJpbmd8c3RyaW5nX2FmdGVyfHN0cmluZ19iZWZvcmV8c3RyaW5nX21hdGNofFwiICtcbiAgICAgICAgXCJzdHJpbmdfb2ZfYmlnX2ludHxzdHJpbmdfb2ZfYm9vbHxzdHJpbmdfb2ZfZmxvYXR8c3RyaW5nX29mX2Zvcm1hdHxcIiArXG4gICAgICAgIFwic3RyaW5nX29mX2luZXRfYWRkcnxzdHJpbmdfb2ZfaW5ldF9hZGRyfHN0cmluZ19vZl9pbnR8c3RyaW5nX29mX251bXxcIiArXG4gICAgICAgIFwic3RyaW5nX3BhcnRpYWxfbWF0Y2h8c3RyaW5nX3RhZ3xzdWJ8c3VifHN1Yl9iaWdfaW50fHN1Yl9sZWZ0fHN1Yl9udW18XCIgK1xuICAgICAgICBcInN1Yl9yaWdodHxzdWJzZXR8c3Vic2V0fHN1YnN0aXR1dGVfZmlyc3R8c3Vic3RyaW5nfHN1Y2N8c3VjY3xcIiArXG4gICAgICAgIFwic3VjY3xzdWNjfHN1Y2NfYmlnX2ludHxzdWNjX251bXxzeW1ib2xfZW5kfHN5bWJvbF9lbmRfcG9zfHN5bWJvbF9zdGFydHxcIiArXG4gICAgICAgIFwic3ltYm9sX3N0YXJ0X3Bvc3xzeW1saW5rfHN5bWxpbmt8c3luY3xzeW5jaHJvbml6ZXxzeXN0ZW18c3lzdGVtfHN5c3RlbXxcIiArXG4gICAgICAgIFwidGFnfHRha2V8dGFufHRhbmh8dGNkcmFpbnx0Y2RyYWlufHRjZmxvd3x0Y2Zsb3d8dGNmbHVzaHx0Y2ZsdXNofFwiICtcbiAgICAgICAgXCJ0Y2dldGF0dHJ8dGNnZXRhdHRyfHRjc2VuZGJyZWFrfHRjc2VuZGJyZWFrfHRjc2V0YXR0cnx0Y3NldGF0dHJ8XCIgK1xuICAgICAgICBcInRlbXBfZmlsZXx0ZXh0X3NpemV8dGltZXx0aW1lfHRpbWV8dGltZWRfcmVhZHx0aW1lZF93cml0ZXx0aW1lc3x0aW1lc3xcIiArXG4gICAgICAgIFwidGx8dGx8dGx8dG9fYnVmZmVyfHRvX2NoYW5uZWx8dG9fZmxvYXR8dG9faGV4fHRvX2ludHx0b19pbnQzMnx0b19saXN0fFwiICtcbiAgICAgICAgXCJ0b19saXN0fHRvX2xpc3R8dG9fbmF0aXZlaW50fHRvX3N0cmluZ3x0b19zdHJpbmd8dG9fc3RyaW5nfHRvX3N0cmluZ3xcIiArXG4gICAgICAgIFwidG9fc3RyaW5nfHRvcHx0b3B8dG90YWxfc2l6ZXx0cmFuc2Zlcnx0cmFuc3B8dHJ1bmNhdGV8dHJ1bmNhdGV8dHJ1bmNhdGV8XCIgK1xuICAgICAgICBcInRydW5jYXRlfHRydW5jYXRlfHRydW5jYXRlfHRyeV9sb2NrfHVtYXNrfHVtYXNrfHVuY2FwaXRhbGl6ZXx1bmNhcGl0YWxpemV8XCIgK1xuICAgICAgICBcInVuY2FwaXRhbGl6ZXx1bmlvbnx1bmlvbnx1bml0X2JpZ19pbnR8dW5saW5rfHVubGlua3x1bmxvY2t8dW5tYXJzaGFsfFwiICtcbiAgICAgICAgXCJ1bnNhZmVfYmxpdHx1bnNhZmVfZmlsbHx1bnNhZmVfZ2V0fHVuc2FmZV9nZXR8dW5zYWZlX3NldHx1bnNhZmVfc2V0fFwiICtcbiAgICAgICAgXCJ1cGRhdGV8dXBwZXJjYXNlfHVwcGVyY2FzZXx1cHBlcmNhc2V8dXBwZXJjYXNlfHVzYWdlfHV0aW1lc3x1dGltZXN8d2FpdHxcIiArXG4gICAgICAgIFwid2FpdHx3YWl0fHdhaXR8d2FpdF9uZXh0X2V2ZW50fHdhaXRfcGlkfHdhaXRfcmVhZHx3YWl0X3NpZ25hbHxcIiArXG4gICAgICAgIFwid2FpdF90aW1lZF9yZWFkfHdhaXRfdGltZWRfd3JpdGV8d2FpdF93cml0ZXx3YWl0cGlkfHdoaXRlfFwiICtcbiAgICAgICAgXCJ3aWRlbnx3aW5kb3dfaWR8d29yZF9zaXplfHdyYXB8d3JhcF9hYm9ydHx3cml0ZXx5ZWxsb3d8eWllbGR8emVyb3x6ZXJvX2JpZ19pbnR8XCIgK1xuXG4gICAgICAgIFwiQXJnfEFyaXRoX3N0YXR1c3xBcnJheXxBcnJheTF8QXJyYXkyfEFycmF5M3xBcnJheUxhYmVsc3xCaWdfaW50fEJpZ2FycmF5fFwiICtcbiAgICAgICAgXCJCdWZmZXJ8Q2FsbGJhY2t8Q2FtbGludGVybmFsT098Q2hhcnxDb21wbGV4fENvbmRpdGlvbnxEYm18RGlnZXN0fER5bmxpbmt8XCIgK1xuICAgICAgICBcIkV2ZW50fEZpbGVuYW1lfEZvcm1hdHxHY3xHZW5hcnJheXxHZW5sZXh8R3JhcGhpY3N8R3JhcGhpY3NYMTF8SGFzaHRibHxcIiArXG4gICAgICAgIFwiSW50MzJ8SW50NjR8TGFyZ2VGaWxlfExhenl8TGV4aW5nfExpc3R8TGlzdExhYmVsc3xNYWtlfE1hcHxNYXJzaGFsfFwiICtcbiAgICAgICAgXCJNb3JlTGFiZWxzfE11dGV4fE5hdGl2ZWludHxOdW18T2JqfE9vfFBhcnNpbmd8UGVydmFzaXZlc3xQcmludGV4Y3xcIiArXG4gICAgICAgIFwiUHJpbnRmfFF1ZXVlfFJhbmRvbXxTY2FuZnxTY2FubmluZ3xTZXR8U29ydHxTdGFja3xTdGF0ZXxTdGRMYWJlbHN8U3RyfFwiICtcbiAgICAgICAgXCJTdHJlYW18U3RyaW5nfFN0cmluZ0xhYmVsc3xTeXN8VGhyZWFkfFRocmVhZFVuaXh8VGt8VW5peHxVbml4TGFiZWxzfFdlYWtcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9uc1xuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHZhciBkZWNpbWFsSW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIHZhciBvY3RJbnRlZ2VyID0gXCIoPzowW29PXT9bMC03XSspXCI7XG4gICAgdmFyIGhleEludGVnZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgdmFyIGJpbkludGVnZXIgPSBcIig/OjBbYkJdWzAxXSspXCI7XG4gICAgdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcInxcIiArIG9jdEludGVnZXIgKyBcInxcIiArIGhleEludGVnZXIgKyBcInxcIiArIGJpbkludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBleHBvbmVudCA9IFwiKD86W2VFXVsrLV0/XFxcXGQrKVwiO1xuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyAgaW50UGFydCArIFwiKVwiICsgZXhwb25lbnQgKyBcIilcIjtcbiAgICB2YXIgZmxvYXROdW1iZXIgPSBcIig/OlwiICsgZXhwb25lbnRGbG9hdCArIFwifFwiICsgcG9pbnRGbG9hdCArIFwiKVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1xcXFwoXFxcXCouKj9cXFxcKlxcXFwpXFxcXHMqPyQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXFxcXChcXFxcKi4qJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgY2hhclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInLidcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGltYWdpbmFyeVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpcIiArIGZsb2F0TnVtYmVyICsgXCJ8XFxcXGQrKVtqSl1cXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBmbG9hdE51bWJlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbnRlZ2VyXG4gICAgICAgICAgICAgICAgcmVnZXggOiBpbnRlZ2VyICsgXCJcXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK1xcXFwufFxcXFwtXFxcXC58XFxcXCpcXFxcLnxcXFxcL1xcXFwufCN8Ozt8XFxcXCt8XFxcXC18XFxcXCp8XFxcXCpcXFxcKlxcXFwvfFxcXFwvXFxcXC98JXw8PHw+PnwmfFxcXFx8fFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fDwtfD1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKE9jYW1sSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuT2NhbWxIaWdobGlnaHRSdWxlcyA9IE9jYW1sSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=