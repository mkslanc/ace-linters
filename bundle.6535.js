"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6535],{

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

/***/ 96535:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var NginxHighlightRules = (__webpack_require__(66084)/* .NginxHighlightRules */ ._);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function () {
    TextMode.call(this);
    this.HighlightRules = NginxHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};

oop.inherits(Mode, TextMode);


(function () {
    this.lineCommentStart = "#";

    this.$id = "ace/mode/nginx";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 66084:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var NginxHighlightRules = function () {
    var keywords = "include|index|absolute_redirect|aio|output_buffers|directio|sendfile|aio_write|alias|root|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|default_type|disable_symlinks|directio_alignment|error_page|etag|if_modified_since|ignore_invalid_headers|internal|keepalive_requests|keepalive_disable|keepalive_timeout|limit_except|large_client_header_buffers|limit_rate|limit_rate_after|lingering_close|lingering_time|lingering_timeout|listen|log_not_found|log_subrequest|max_ranges|merge_slashes|msie_padding|msie_refresh|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|output_buffers|port_in_redirect|postpone_output|read_ahead|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|satisfy|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|subrequest_output_buffer_size|tcp_nodelay|tcp_nopush|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|variables_hash_bucket_size|variables_hash_max_size|accept_mutex|accept_mutex_delay|debug_connection|error_log|daemon|debug_points|env|load_module|lock_file|master_process|multi_accept|pcre_jit|pid|ssl_engine|thread_pool|timer_resolution|use|user|worker_aio_requests|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_shutdown_timeout|working_directory|allow|deny|add_before_body|add_after_body|addition_types|api|status_zone|auth_basic|auth_basic_user_file|auth_jwt|auth_jwt|auth_jwt_claim_set|auth_jwt_header_set|auth_jwt_key_file|auth_jwt_key_request|auth_jwt_leeway|auth_request|auth_request_set|autoindex|autoindex_exact_size|autoindex_format|autoindex_localtime|ancient_browser|ancient_browser_value|modern_browser|modern_browser_value|charset|charset_map|charset_types|override_charset|source_charset|create_full_put_path|dav_access|dav_methods|min_delete_depth|empty_gif|f4f|f4f_buffer_size|fastcgi_bind|fastcgi_buffer_size|fastcgi_buffering|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_background_update|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_age|fastcgi_cache_lock_timeout|fastcgi_cache_max_range_offset|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_revalidate|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_catch_stderr|fastcgi_connect_timeout|fastcgi_force_ranges|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_limit_rate|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_next_upstream_timeout|fastcgi_next_upstream_tries|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_pass_request_body|fastcgi_pass_request_headers|fastcgi_read_timeout|fastcgi_request_buffering|fastcgi_send_lowat|fastcgi_send_timeout|fastcgi_socket_keepalive|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geoip_country|geoip_city|geoip_org|geoip_proxy|geoip_proxy_recursive|grpc_bind|grpc_buffer_size|grpc_connect_timeout|grpc_hide_header|grpc_ignore_headers|grpc_intercept_errors|grpc_next_upstream|grpc_next_upstream_timeout|grpc_next_upstream_tries|grpc_pass|grpc_pass_header|grpc_read_timeout|grpc_send_timeout|grpc_set_header|grpc_socket_keepalive|grpc_ssl_certificate|grpc_ssl_certificate_key|grpc_ssl_ciphers|grpc_ssl_crl|grpc_ssl_name|grpc_ssl_password_file|grpc_ssl_protocols|grpc_ssl_server_name|grpc_ssl_session_reuse|grpc_ssl_trusted_certificate|grpc_ssl_verify|grpc_ssl_verify_depth|gunzip|gunzip_buffers|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_types|gzip_vary|gzip_static|add_header|add_trailer|expires|hlshls_buffers|hls_forward_args|hls_fragment|hls_mp4_buffer_size|hls_mp4_max_buffer_size|image_filter|image_filter_buffer|image_filter_interlace|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|image_filter_webp_quality|js_content|js_include|js_set|keyval|keyval_zone|limit_conn|limit_conn_log_level|limit_conn_status|limit_conn_zone|limit_zone|limit_req|limit_req_log_level|limit_req_status|limit_req_zone|access_log|log_format|open_log_file_cache|map_hash_bucket_size|map_hash_max_size|memcached_bind|memcached_buffer_size|memcached_connect_timeout|memcached_force_ranges|memcached_gzip_flag|memcached_next_upstream|memcached_next_upstream_timeout|memcached_next_upstream_tries|memcached_pass|memcached_read_timeout|memcached_send_timeout|memcached_socket_keepalive|mirror|mirror_request_body|mp4|mp4_buffer_size|mp4_max_buffer_size|mp4_limit_rate|mp4_limit_rate_after|perl_modules|perl_require|perl_set|proxy_bind|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_background_update|proxy_cache_bypass|proxy_cache_convert_head|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_age|proxy_cache_lock_timeout|proxy_cache_max_range_offset|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_purge|proxy_cache_revalidate|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_force_ranges|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_limit_rate|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_next_upstream_timeout|proxy_next_upstream_tries|proxy_no_cache|proxy_pass|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_socket_keepalive|proxy_ssl_certificate|proxy_ssl_certificate_key|proxy_ssl_ciphers|proxy_ssl_crl|proxy_ssl_name|proxy_ssl_password_file|proxy_ssl_protocols|proxy_ssl_server_name|proxy_ssl_session_reuse|proxy_ssl_trusted_certificate|proxy_ssl_verify|proxy_ssl_verify_depth|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|random_index|set_real_ip_from|real_ip_header|real_ip_recursive|referer_hash_bucket_size|referer_hash_max_size|valid_referers|break|return|rewrite_log|set|uninitialized_variable_warn|scgi_bind|scgi_buffer_size|scgi_buffering|scgi_buffers|scgi_busy_buffers_size|scgi_cache|scgi_cache_background_update|scgi_cache_key|scgi_cache_lock|scgi_cache_lock_age|scgi_cache_lock_timeout|scgi_cache_max_range_offset|scgi_cache_methods|scgi_cache_min_uses|scgi_cache_path|scgi_cache_purge|scgi_cache_revalidate|scgi_cache_use_stale|scgi_cache_valid|scgi_connect_timeout|scgi_force_ranges|scgi_hide_header|scgi_ignore_client_abort|scgi_ignore_headers|scgi_intercept_errors|scgi_limit_rate|scgi_max_temp_file_size|scgi_next_upstream|scgi_next_upstream_timeout|scgi_next_upstream_tries|scgi_no_cache|scgi_param|scgi_pass|scgi_pass_header|scgi_pass_request_body|scgi_pass_request_headers|scgi_read_timeout|scgi_request_buffering|scgi_send_timeout|scgi_socket_keepalive|scgi_store|scgi_store_access|scgi_temp_file_write_size|scgi_temp_path|secure_link|secure_link_md5|secure_link_secret|session_log|session_log_format|session_log_zone|slice|spdy_chunk_size|spdy_headers_comp|ssi|ssi_last_modified|ssi_min_file_chunk|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_buffer_size|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_early_data|ssl_ecdh_curve|ssl_password_file|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_ticket_key|ssl_session_tickets|ssl_session_timeout|ssl_stapling|ssl_stapling_file|ssl_stapling_responder|ssl_stapling_verify|ssl_trusted_certificate|ssl_verify_client|ssl_verify_depth|status|status_format|status_zone|stub_status|sub_filter|sub_filter_last_modified|sub_filter_once|sub_filter_types|server|zone|state|hash|ip_hash|keepalive|keepalive_requests|keepalive_timeout|ntlm|least_conn|least_time|queue|random|sticky|sticky_cookie_insert|upstream_conf|health_check|userid|userid_domain|userid_expires|userid_mark|userid_name|userid_p3p|userid_path|userid_service|uwsgi_bind|uwsgi_buffer_size|uwsgi_buffering|uwsgi_buffers|uwsgi_busy_buffers_size|uwsgi_cache|uwsgi_cache_background_update|uwsgi_cache_bypass|uwsgi_cache_key|uwsgi_cache_lock|uwsgi_cache_lock_age|uwsgi_cache_lock_timeout|uwsgi_cache_max_range_offset|uwsgi_cache_methods|uwsgi_cache_min_uses|uwsgi_cache_path|uwsgi_cache_purge|uwsgi_cache_revalidate|uwsgi_cache_use_stale|uwsgi_cache_valid|uwsgi_connect_timeout|uwsgi_force_ranges|uwsgi_hide_header|uwsgi_ignore_client_abort|uwsgi_ignore_headers|uwsgi_intercept_errors|uwsgi_limit_rate|uwsgi_max_temp_file_size|uwsgi_modifier1|uwsgi_modifier2|uwsgi_next_upstream|uwsgi_next_upstream_timeout|uwsgi_next_upstream_tries|uwsgi_no_cache|uwsgi_param|uwsgi_pass|uwsgi_pass_header|uwsgi_pass_request_body|uwsgi_pass_request_headers|uwsgi_read_timeout|uwsgi_request_buffering|uwsgi_send_timeout|uwsgi_socket_keepalive|uwsgi_ssl_certificate|uwsgi_ssl_certificate_key|uwsgi_ssl_ciphers|uwsgi_ssl_crl|uwsgi_ssl_name|uwsgi_ssl_password_file|uwsgi_ssl_protocols|uwsgi_ssl_server_name|uwsgi_ssl_session_reuse|uwsgi_ssl_trusted_certificate|uwsgi_ssl_verify|uwsgi_ssl_verify_depth|uwsgi_store|uwsgi_store_access|uwsgi_temp_file_write_size|uwsgi_temp_path|http2_body_preread_size|http2_chunk_size|http2_idle_timeout|http2_max_concurrent_pushes|http2_max_concurrent_streams|http2_max_field_size|http2_max_header_size|http2_max_requests|http2_push|http2_push_preload|http2_recv_buffer_size|http2_recv_timeout|xml_entities|xslt_last_modified|xslt_param|xslt_string_param|xslt_stylesheet|xslt_types|listen|protocol|resolver|resolver_timeout|timeout|auth_http|auth_http_header|auth_http_pass_client_cert|auth_http_timeout|proxy_buffer|proxy_pass_error_message|proxy_timeout|xclient|starttls|imap_auth|imap_capabilities|imap_client_buffer|pop3_auth|pop3_capabilities|smtp_auth|smtp_capabilities|smtp_client_buffer|smtp_greeting_delay|preread_buffer_size|preread_timeout|proxy_protocol_timeout|js_access|js_filter|js_preread|proxy_download_rate|proxy_requests|proxy_responses|proxy_upload_rate|ssl_handshake_timeout|ssl_preread|health_check_timeout|zone_sync|zone_sync_buffers|zone_sync_connect_retry_interval|zone_sync_connect_timeout|zone_sync_interval|zone_sync_recv_buffer_size|zone_sync_server|zone_sync_ssl|zone_sync_ssl_certificate|zone_sync_ssl_certificate_key|zone_sync_ssl_ciphers|zone_sync_ssl_crl|zone_sync_ssl_name|zone_sync_ssl_password_file|zone_sync_ssl_protocols|zone_sync_ssl_server_name|zone_sync_ssl_trusted_certificate|zone_sync_ssl_verify_depth|zone_sync_timeout|google_perftools_profiles|proxy|perl";

    this.$rules = {
        "start": [{
            token: ["storage.type", "text", "string.regexp", "paren.lparen"],
            regex: "\\b(location)(\\s+)([\\^]?~[\\*]?\\s+.*?)({)"
        }, {
            token: ["storage.type", "text", "text", "paren.lparen"],
            regex: "\\b(location|match|upstream)(\\s+)(.*?)({)"
        }, {
            token: ["storage.type", "text", "string", "text", "variable", "text", "paren.lparen"],
            regex: '\\b(split_clients|map)(\\s+)(\\".*\\")(\\s+)(\\$[\\w_]+)(\\s*)({)'
        }, {
            token: ["storage.type", "text", "paren.lparen"],
            regex: "\\b(http|events|server|mail|stream)(\\s*)({)"
        }, {
            token: ["storage.type", "text", "variable", "text", "variable", "text", "paren.lparen"],
            regex: '\\b(geo|map)(\\s+)(\\$[\\w_]+)?(\\s*)(\\$[\\w_]+)(\\s*)({)'
        }, {
            token: "paren.rparen",
            regex: "(})"
        }, {
            token: "paren.lparen",
            regex: "({)"
        }, {
            token: ["storage.type", "text", "paren.lparen"],
            regex: "\\b(if)(\\s+)(\\()",
            push: [{
                token: "paren.rparen",
                regex: "\\)|$",
                next: "pop"
            }, {
                include: "lexical"
            }]
        }, {
            token: "keyword",
            regex: "\\b(" + keywords + ")\\b",
            push: [{
                token: "punctuation",
                regex: ";",
                next: "pop"
            }, {
                include: "lexical"
            }]
        }, {
            token: ["keyword", "text", "string.regexp", "text", "punctuation"],
            regex: "\\b(rewrite)(\\s)(\\S*)(\\s.*)(;)"
        }, {
            include: "lexical"
        }, {
            include: "comments"
        }],
        comments: [{
            token: "comment",
            regex: '#.*$'
        }],
        lexical: [{
            token: "string",
            regex: "'",
            push: [{
                token: "string",
                regex: "'",
                next: "pop"
            }, {
                include: "variables"
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: '"',
            push: [{
                token: "string",
                regex: '"',
                next: "pop"
            }, {
                include: "variables"
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string.regexp",
            regex: /[!]?[~][*]?\s+.*(?=\))/
        }, {
            token: "string.regexp",
            regex: /[\^]\S*(?=;$)/
        }, {
            token: "string.regexp",
            regex: /[\^]\S*(?=;|\s|$)/
        }, {
            token: "keyword.operator",
            regex: "\\B(\\+|\\-|\\*|\\=|!=)\\B"
        }, {
            token: "constant.language",
            regex: "\\b(true|false|on|off|all|any|main|always)\\b"
        }, {
            token: "text",
            regex: "\\s+"
        }, {
            include: "variables"
        }
        ],
        variables: [{
            token: "variable",
            regex: "\\$[\\w_]+"
        }, {
            token: "variable.language",
            regex: "\\b(GET|POST|HEAD)\\b"
        }]
    };
    this.normalizeRules();
};


oop.inherits(NginxHighlightRules, TextHighlightRules);

exports._ = NginxHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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K0I7QUFDL0IsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL25naW54LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbmdpbnhfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBOZ2lueEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbmdpbnhfaGlnaGxpZ2h0X3J1bGVzXCIpLk5naW54SGlnaGxpZ2h0UnVsZXM7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgVGV4dE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTmdpbnhIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xuXG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbmdpbnhcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgTmdpbnhIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5d29yZHMgPSBcImluY2x1ZGV8aW5kZXh8YWJzb2x1dGVfcmVkaXJlY3R8YWlvfG91dHB1dF9idWZmZXJzfGRpcmVjdGlvfHNlbmRmaWxlfGFpb193cml0ZXxhbGlhc3xyb290fGNodW5rZWRfdHJhbnNmZXJfZW5jb2Rpbmd8Y2xpZW50X2JvZHlfYnVmZmVyX3NpemV8Y2xpZW50X2JvZHlfaW5fZmlsZV9vbmx5fGNsaWVudF9ib2R5X2luX3NpbmdsZV9idWZmZXJ8Y2xpZW50X2JvZHlfdGVtcF9wYXRofGNsaWVudF9ib2R5X3RpbWVvdXR8Y2xpZW50X2hlYWRlcl9idWZmZXJfc2l6ZXxjbGllbnRfaGVhZGVyX3RpbWVvdXR8Y2xpZW50X21heF9ib2R5X3NpemV8Y29ubmVjdGlvbl9wb29sX3NpemV8ZGVmYXVsdF90eXBlfGRpc2FibGVfc3ltbGlua3N8ZGlyZWN0aW9fYWxpZ25tZW50fGVycm9yX3BhZ2V8ZXRhZ3xpZl9tb2RpZmllZF9zaW5jZXxpZ25vcmVfaW52YWxpZF9oZWFkZXJzfGludGVybmFsfGtlZXBhbGl2ZV9yZXF1ZXN0c3xrZWVwYWxpdmVfZGlzYWJsZXxrZWVwYWxpdmVfdGltZW91dHxsaW1pdF9leGNlcHR8bGFyZ2VfY2xpZW50X2hlYWRlcl9idWZmZXJzfGxpbWl0X3JhdGV8bGltaXRfcmF0ZV9hZnRlcnxsaW5nZXJpbmdfY2xvc2V8bGluZ2VyaW5nX3RpbWV8bGluZ2VyaW5nX3RpbWVvdXR8bGlzdGVufGxvZ19ub3RfZm91bmR8bG9nX3N1YnJlcXVlc3R8bWF4X3Jhbmdlc3xtZXJnZV9zbGFzaGVzfG1zaWVfcGFkZGluZ3xtc2llX3JlZnJlc2h8b3Blbl9maWxlX2NhY2hlfG9wZW5fZmlsZV9jYWNoZV9lcnJvcnN8b3Blbl9maWxlX2NhY2hlX21pbl91c2VzfG9wZW5fZmlsZV9jYWNoZV92YWxpZHxvdXRwdXRfYnVmZmVyc3xwb3J0X2luX3JlZGlyZWN0fHBvc3Rwb25lX291dHB1dHxyZWFkX2FoZWFkfHJlY3Vyc2l2ZV9lcnJvcl9wYWdlc3xyZXF1ZXN0X3Bvb2xfc2l6ZXxyZXNldF90aW1lZG91dF9jb25uZWN0aW9ufHJlc29sdmVyfHJlc29sdmVyX3RpbWVvdXR8c2F0aXNmeXxzZW5kX2xvd2F0fHNlbmRfdGltZW91dHxzZW5kZmlsZXxzZW5kZmlsZV9tYXhfY2h1bmt8c2VydmVyX25hbWV8c2VydmVyX25hbWVfaW5fcmVkaXJlY3R8c2VydmVyX25hbWVzX2hhc2hfYnVja2V0X3NpemV8c2VydmVyX25hbWVzX2hhc2hfbWF4X3NpemV8c2VydmVyX3Rva2Vuc3xzdWJyZXF1ZXN0X291dHB1dF9idWZmZXJfc2l6ZXx0Y3Bfbm9kZWxheXx0Y3Bfbm9wdXNofHRyeV9maWxlc3x0eXBlc3x0eXBlc19oYXNoX2J1Y2tldF9zaXplfHR5cGVzX2hhc2hfbWF4X3NpemV8dW5kZXJzY29yZXNfaW5faGVhZGVyc3x2YXJpYWJsZXNfaGFzaF9idWNrZXRfc2l6ZXx2YXJpYWJsZXNfaGFzaF9tYXhfc2l6ZXxhY2NlcHRfbXV0ZXh8YWNjZXB0X211dGV4X2RlbGF5fGRlYnVnX2Nvbm5lY3Rpb258ZXJyb3JfbG9nfGRhZW1vbnxkZWJ1Z19wb2ludHN8ZW52fGxvYWRfbW9kdWxlfGxvY2tfZmlsZXxtYXN0ZXJfcHJvY2Vzc3xtdWx0aV9hY2NlcHR8cGNyZV9qaXR8cGlkfHNzbF9lbmdpbmV8dGhyZWFkX3Bvb2x8dGltZXJfcmVzb2x1dGlvbnx1c2V8dXNlcnx3b3JrZXJfYWlvX3JlcXVlc3RzfHdvcmtlcl9jb25uZWN0aW9uc3x3b3JrZXJfY3B1X2FmZmluaXR5fHdvcmtlcl9wcmlvcml0eXx3b3JrZXJfcHJvY2Vzc2VzfHdvcmtlcl9ybGltaXRfY29yZXx3b3JrZXJfcmxpbWl0X25vZmlsZXx3b3JrZXJfc2h1dGRvd25fdGltZW91dHx3b3JraW5nX2RpcmVjdG9yeXxhbGxvd3xkZW55fGFkZF9iZWZvcmVfYm9keXxhZGRfYWZ0ZXJfYm9keXxhZGRpdGlvbl90eXBlc3xhcGl8c3RhdHVzX3pvbmV8YXV0aF9iYXNpY3xhdXRoX2Jhc2ljX3VzZXJfZmlsZXxhdXRoX2p3dHxhdXRoX2p3dHxhdXRoX2p3dF9jbGFpbV9zZXR8YXV0aF9qd3RfaGVhZGVyX3NldHxhdXRoX2p3dF9rZXlfZmlsZXxhdXRoX2p3dF9rZXlfcmVxdWVzdHxhdXRoX2p3dF9sZWV3YXl8YXV0aF9yZXF1ZXN0fGF1dGhfcmVxdWVzdF9zZXR8YXV0b2luZGV4fGF1dG9pbmRleF9leGFjdF9zaXplfGF1dG9pbmRleF9mb3JtYXR8YXV0b2luZGV4X2xvY2FsdGltZXxhbmNpZW50X2Jyb3dzZXJ8YW5jaWVudF9icm93c2VyX3ZhbHVlfG1vZGVybl9icm93c2VyfG1vZGVybl9icm93c2VyX3ZhbHVlfGNoYXJzZXR8Y2hhcnNldF9tYXB8Y2hhcnNldF90eXBlc3xvdmVycmlkZV9jaGFyc2V0fHNvdXJjZV9jaGFyc2V0fGNyZWF0ZV9mdWxsX3B1dF9wYXRofGRhdl9hY2Nlc3N8ZGF2X21ldGhvZHN8bWluX2RlbGV0ZV9kZXB0aHxlbXB0eV9naWZ8ZjRmfGY0Zl9idWZmZXJfc2l6ZXxmYXN0Y2dpX2JpbmR8ZmFzdGNnaV9idWZmZXJfc2l6ZXxmYXN0Y2dpX2J1ZmZlcmluZ3xmYXN0Y2dpX2J1ZmZlcnN8ZmFzdGNnaV9idXN5X2J1ZmZlcnNfc2l6ZXxmYXN0Y2dpX2NhY2hlfGZhc3RjZ2lfY2FjaGVfYmFja2dyb3VuZF91cGRhdGV8ZmFzdGNnaV9jYWNoZV9ieXBhc3N8ZmFzdGNnaV9jYWNoZV9rZXl8ZmFzdGNnaV9jYWNoZV9sb2NrfGZhc3RjZ2lfY2FjaGVfbG9ja19hZ2V8ZmFzdGNnaV9jYWNoZV9sb2NrX3RpbWVvdXR8ZmFzdGNnaV9jYWNoZV9tYXhfcmFuZ2Vfb2Zmc2V0fGZhc3RjZ2lfY2FjaGVfbWV0aG9kc3xmYXN0Y2dpX2NhY2hlX21pbl91c2VzfGZhc3RjZ2lfY2FjaGVfbWluX3VzZXN8ZmFzdGNnaV9jYWNoZV9wYXRofGZhc3RjZ2lfY2FjaGVfcHVyZ2V8ZmFzdGNnaV9jYWNoZV9yZXZhbGlkYXRlfGZhc3RjZ2lfY2FjaGVfdXNlX3N0YWxlfGZhc3RjZ2lfY2FjaGVfdmFsaWR8ZmFzdGNnaV9jYXRjaF9zdGRlcnJ8ZmFzdGNnaV9jb25uZWN0X3RpbWVvdXR8ZmFzdGNnaV9mb3JjZV9yYW5nZXN8ZmFzdGNnaV9oaWRlX2hlYWRlcnxmYXN0Y2dpX2lnbm9yZV9jbGllbnRfYWJvcnR8ZmFzdGNnaV9pZ25vcmVfaGVhZGVyc3xmYXN0Y2dpX2luZGV4fGZhc3RjZ2lfaW50ZXJjZXB0X2Vycm9yc3xmYXN0Y2dpX2tlZXBfY29ubnxmYXN0Y2dpX2xpbWl0X3JhdGV8ZmFzdGNnaV9tYXhfdGVtcF9maWxlX3NpemV8ZmFzdGNnaV9uZXh0X3Vwc3RyZWFtfGZhc3RjZ2lfbmV4dF91cHN0cmVhbV90aW1lb3V0fGZhc3RjZ2lfbmV4dF91cHN0cmVhbV90cmllc3xmYXN0Y2dpX25vX2NhY2hlfGZhc3RjZ2lfcGFyYW18ZmFzdGNnaV9wYXNzfGZhc3RjZ2lfcGFzc19oZWFkZXJ8ZmFzdGNnaV9wYXNzX3JlcXVlc3RfYm9keXxmYXN0Y2dpX3Bhc3NfcmVxdWVzdF9oZWFkZXJzfGZhc3RjZ2lfcmVhZF90aW1lb3V0fGZhc3RjZ2lfcmVxdWVzdF9idWZmZXJpbmd8ZmFzdGNnaV9zZW5kX2xvd2F0fGZhc3RjZ2lfc2VuZF90aW1lb3V0fGZhc3RjZ2lfc29ja2V0X2tlZXBhbGl2ZXxmYXN0Y2dpX3NwbGl0X3BhdGhfaW5mb3xmYXN0Y2dpX3N0b3JlfGZhc3RjZ2lfc3RvcmVfYWNjZXNzfGZhc3RjZ2lfdGVtcF9maWxlX3dyaXRlX3NpemV8ZmFzdGNnaV90ZW1wX3BhdGh8Zmx2fGdlb2lwX2NvdW50cnl8Z2VvaXBfY2l0eXxnZW9pcF9vcmd8Z2VvaXBfcHJveHl8Z2VvaXBfcHJveHlfcmVjdXJzaXZlfGdycGNfYmluZHxncnBjX2J1ZmZlcl9zaXplfGdycGNfY29ubmVjdF90aW1lb3V0fGdycGNfaGlkZV9oZWFkZXJ8Z3JwY19pZ25vcmVfaGVhZGVyc3xncnBjX2ludGVyY2VwdF9lcnJvcnN8Z3JwY19uZXh0X3Vwc3RyZWFtfGdycGNfbmV4dF91cHN0cmVhbV90aW1lb3V0fGdycGNfbmV4dF91cHN0cmVhbV90cmllc3xncnBjX3Bhc3N8Z3JwY19wYXNzX2hlYWRlcnxncnBjX3JlYWRfdGltZW91dHxncnBjX3NlbmRfdGltZW91dHxncnBjX3NldF9oZWFkZXJ8Z3JwY19zb2NrZXRfa2VlcGFsaXZlfGdycGNfc3NsX2NlcnRpZmljYXRlfGdycGNfc3NsX2NlcnRpZmljYXRlX2tleXxncnBjX3NzbF9jaXBoZXJzfGdycGNfc3NsX2NybHxncnBjX3NzbF9uYW1lfGdycGNfc3NsX3Bhc3N3b3JkX2ZpbGV8Z3JwY19zc2xfcHJvdG9jb2xzfGdycGNfc3NsX3NlcnZlcl9uYW1lfGdycGNfc3NsX3Nlc3Npb25fcmV1c2V8Z3JwY19zc2xfdHJ1c3RlZF9jZXJ0aWZpY2F0ZXxncnBjX3NzbF92ZXJpZnl8Z3JwY19zc2xfdmVyaWZ5X2RlcHRofGd1bnppcHxndW56aXBfYnVmZmVyc3xnemlwfGd6aXBfYnVmZmVyc3xnemlwX2NvbXBfbGV2ZWx8Z3ppcF9kaXNhYmxlfGd6aXBfaHR0cF92ZXJzaW9ufGd6aXBfbWluX2xlbmd0aHxnemlwX3Byb3hpZWR8Z3ppcF90eXBlc3xnemlwX3Zhcnl8Z3ppcF9zdGF0aWN8YWRkX2hlYWRlcnxhZGRfdHJhaWxlcnxleHBpcmVzfGhsc2hsc19idWZmZXJzfGhsc19mb3J3YXJkX2FyZ3N8aGxzX2ZyYWdtZW50fGhsc19tcDRfYnVmZmVyX3NpemV8aGxzX21wNF9tYXhfYnVmZmVyX3NpemV8aW1hZ2VfZmlsdGVyfGltYWdlX2ZpbHRlcl9idWZmZXJ8aW1hZ2VfZmlsdGVyX2ludGVybGFjZXxpbWFnZV9maWx0ZXJfanBlZ19xdWFsaXR5fGltYWdlX2ZpbHRlcl9zaGFycGVufGltYWdlX2ZpbHRlcl90cmFuc3BhcmVuY3l8aW1hZ2VfZmlsdGVyX3dlYnBfcXVhbGl0eXxqc19jb250ZW50fGpzX2luY2x1ZGV8anNfc2V0fGtleXZhbHxrZXl2YWxfem9uZXxsaW1pdF9jb25ufGxpbWl0X2Nvbm5fbG9nX2xldmVsfGxpbWl0X2Nvbm5fc3RhdHVzfGxpbWl0X2Nvbm5fem9uZXxsaW1pdF96b25lfGxpbWl0X3JlcXxsaW1pdF9yZXFfbG9nX2xldmVsfGxpbWl0X3JlcV9zdGF0dXN8bGltaXRfcmVxX3pvbmV8YWNjZXNzX2xvZ3xsb2dfZm9ybWF0fG9wZW5fbG9nX2ZpbGVfY2FjaGV8bWFwX2hhc2hfYnVja2V0X3NpemV8bWFwX2hhc2hfbWF4X3NpemV8bWVtY2FjaGVkX2JpbmR8bWVtY2FjaGVkX2J1ZmZlcl9zaXplfG1lbWNhY2hlZF9jb25uZWN0X3RpbWVvdXR8bWVtY2FjaGVkX2ZvcmNlX3Jhbmdlc3xtZW1jYWNoZWRfZ3ppcF9mbGFnfG1lbWNhY2hlZF9uZXh0X3Vwc3RyZWFtfG1lbWNhY2hlZF9uZXh0X3Vwc3RyZWFtX3RpbWVvdXR8bWVtY2FjaGVkX25leHRfdXBzdHJlYW1fdHJpZXN8bWVtY2FjaGVkX3Bhc3N8bWVtY2FjaGVkX3JlYWRfdGltZW91dHxtZW1jYWNoZWRfc2VuZF90aW1lb3V0fG1lbWNhY2hlZF9zb2NrZXRfa2VlcGFsaXZlfG1pcnJvcnxtaXJyb3JfcmVxdWVzdF9ib2R5fG1wNHxtcDRfYnVmZmVyX3NpemV8bXA0X21heF9idWZmZXJfc2l6ZXxtcDRfbGltaXRfcmF0ZXxtcDRfbGltaXRfcmF0ZV9hZnRlcnxwZXJsX21vZHVsZXN8cGVybF9yZXF1aXJlfHBlcmxfc2V0fHByb3h5X2JpbmR8cHJveHlfYnVmZmVyX3NpemV8cHJveHlfYnVmZmVyaW5nfHByb3h5X2J1ZmZlcnN8cHJveHlfYnVzeV9idWZmZXJzX3NpemV8cHJveHlfY2FjaGV8cHJveHlfY2FjaGVfYmFja2dyb3VuZF91cGRhdGV8cHJveHlfY2FjaGVfYnlwYXNzfHByb3h5X2NhY2hlX2NvbnZlcnRfaGVhZHxwcm94eV9jYWNoZV9rZXl8cHJveHlfY2FjaGVfbG9ja3xwcm94eV9jYWNoZV9sb2NrX2FnZXxwcm94eV9jYWNoZV9sb2NrX3RpbWVvdXR8cHJveHlfY2FjaGVfbWF4X3JhbmdlX29mZnNldHxwcm94eV9jYWNoZV9tZXRob2RzfHByb3h5X2NhY2hlX21pbl91c2VzfHByb3h5X2NhY2hlX3BhdGh8cHJveHlfY2FjaGVfcHVyZ2V8cHJveHlfY2FjaGVfcmV2YWxpZGF0ZXxwcm94eV9jYWNoZV91c2Vfc3RhbGV8cHJveHlfY2FjaGVfdmFsaWR8cHJveHlfY29ubmVjdF90aW1lb3V0fHByb3h5X2Nvb2tpZV9kb21haW58cHJveHlfY29va2llX3BhdGh8cHJveHlfZm9yY2VfcmFuZ2VzfHByb3h5X2hlYWRlcnNfaGFzaF9idWNrZXRfc2l6ZXxwcm94eV9oZWFkZXJzX2hhc2hfbWF4X3NpemV8cHJveHlfaGlkZV9oZWFkZXJ8cHJveHlfaHR0cF92ZXJzaW9ufHByb3h5X2lnbm9yZV9jbGllbnRfYWJvcnR8cHJveHlfaWdub3JlX2hlYWRlcnN8cHJveHlfaW50ZXJjZXB0X2Vycm9yc3xwcm94eV9saW1pdF9yYXRlfHByb3h5X21heF90ZW1wX2ZpbGVfc2l6ZXxwcm94eV9tZXRob2R8cHJveHlfbmV4dF91cHN0cmVhbXxwcm94eV9uZXh0X3Vwc3RyZWFtX3RpbWVvdXR8cHJveHlfbmV4dF91cHN0cmVhbV90cmllc3xwcm94eV9ub19jYWNoZXxwcm94eV9wYXNzfHByb3h5X3Bhc3NfaGVhZGVyfHByb3h5X3Bhc3NfcmVxdWVzdF9ib2R5fHByb3h5X3Bhc3NfcmVxdWVzdF9oZWFkZXJzfHByb3h5X3JlYWRfdGltZW91dHxwcm94eV9yZWRpcmVjdHxwcm94eV9zZW5kX2xvd2F0fHByb3h5X3NlbmRfdGltZW91dHxwcm94eV9zZXRfYm9keXxwcm94eV9zZXRfaGVhZGVyfHByb3h5X3NvY2tldF9rZWVwYWxpdmV8cHJveHlfc3NsX2NlcnRpZmljYXRlfHByb3h5X3NzbF9jZXJ0aWZpY2F0ZV9rZXl8cHJveHlfc3NsX2NpcGhlcnN8cHJveHlfc3NsX2NybHxwcm94eV9zc2xfbmFtZXxwcm94eV9zc2xfcGFzc3dvcmRfZmlsZXxwcm94eV9zc2xfcHJvdG9jb2xzfHByb3h5X3NzbF9zZXJ2ZXJfbmFtZXxwcm94eV9zc2xfc2Vzc2lvbl9yZXVzZXxwcm94eV9zc2xfdHJ1c3RlZF9jZXJ0aWZpY2F0ZXxwcm94eV9zc2xfdmVyaWZ5fHByb3h5X3NzbF92ZXJpZnlfZGVwdGh8cHJveHlfc3RvcmV8cHJveHlfc3RvcmVfYWNjZXNzfHByb3h5X3RlbXBfZmlsZV93cml0ZV9zaXplfHByb3h5X3RlbXBfcGF0aHxyYW5kb21faW5kZXh8c2V0X3JlYWxfaXBfZnJvbXxyZWFsX2lwX2hlYWRlcnxyZWFsX2lwX3JlY3Vyc2l2ZXxyZWZlcmVyX2hhc2hfYnVja2V0X3NpemV8cmVmZXJlcl9oYXNoX21heF9zaXplfHZhbGlkX3JlZmVyZXJzfGJyZWFrfHJldHVybnxyZXdyaXRlX2xvZ3xzZXR8dW5pbml0aWFsaXplZF92YXJpYWJsZV93YXJufHNjZ2lfYmluZHxzY2dpX2J1ZmZlcl9zaXplfHNjZ2lfYnVmZmVyaW5nfHNjZ2lfYnVmZmVyc3xzY2dpX2J1c3lfYnVmZmVyc19zaXplfHNjZ2lfY2FjaGV8c2NnaV9jYWNoZV9iYWNrZ3JvdW5kX3VwZGF0ZXxzY2dpX2NhY2hlX2tleXxzY2dpX2NhY2hlX2xvY2t8c2NnaV9jYWNoZV9sb2NrX2FnZXxzY2dpX2NhY2hlX2xvY2tfdGltZW91dHxzY2dpX2NhY2hlX21heF9yYW5nZV9vZmZzZXR8c2NnaV9jYWNoZV9tZXRob2RzfHNjZ2lfY2FjaGVfbWluX3VzZXN8c2NnaV9jYWNoZV9wYXRofHNjZ2lfY2FjaGVfcHVyZ2V8c2NnaV9jYWNoZV9yZXZhbGlkYXRlfHNjZ2lfY2FjaGVfdXNlX3N0YWxlfHNjZ2lfY2FjaGVfdmFsaWR8c2NnaV9jb25uZWN0X3RpbWVvdXR8c2NnaV9mb3JjZV9yYW5nZXN8c2NnaV9oaWRlX2hlYWRlcnxzY2dpX2lnbm9yZV9jbGllbnRfYWJvcnR8c2NnaV9pZ25vcmVfaGVhZGVyc3xzY2dpX2ludGVyY2VwdF9lcnJvcnN8c2NnaV9saW1pdF9yYXRlfHNjZ2lfbWF4X3RlbXBfZmlsZV9zaXplfHNjZ2lfbmV4dF91cHN0cmVhbXxzY2dpX25leHRfdXBzdHJlYW1fdGltZW91dHxzY2dpX25leHRfdXBzdHJlYW1fdHJpZXN8c2NnaV9ub19jYWNoZXxzY2dpX3BhcmFtfHNjZ2lfcGFzc3xzY2dpX3Bhc3NfaGVhZGVyfHNjZ2lfcGFzc19yZXF1ZXN0X2JvZHl8c2NnaV9wYXNzX3JlcXVlc3RfaGVhZGVyc3xzY2dpX3JlYWRfdGltZW91dHxzY2dpX3JlcXVlc3RfYnVmZmVyaW5nfHNjZ2lfc2VuZF90aW1lb3V0fHNjZ2lfc29ja2V0X2tlZXBhbGl2ZXxzY2dpX3N0b3JlfHNjZ2lfc3RvcmVfYWNjZXNzfHNjZ2lfdGVtcF9maWxlX3dyaXRlX3NpemV8c2NnaV90ZW1wX3BhdGh8c2VjdXJlX2xpbmt8c2VjdXJlX2xpbmtfbWQ1fHNlY3VyZV9saW5rX3NlY3JldHxzZXNzaW9uX2xvZ3xzZXNzaW9uX2xvZ19mb3JtYXR8c2Vzc2lvbl9sb2dfem9uZXxzbGljZXxzcGR5X2NodW5rX3NpemV8c3BkeV9oZWFkZXJzX2NvbXB8c3NpfHNzaV9sYXN0X21vZGlmaWVkfHNzaV9taW5fZmlsZV9jaHVua3xzc2lfc2lsZW50X2Vycm9yc3xzc2lfdHlwZXN8c3NpX3ZhbHVlX2xlbmd0aHxzc2x8c3NsX2J1ZmZlcl9zaXplfHNzbF9jZXJ0aWZpY2F0ZXxzc2xfY2VydGlmaWNhdGVfa2V5fHNzbF9jaXBoZXJzfHNzbF9jbGllbnRfY2VydGlmaWNhdGV8c3NsX2NybHxzc2xfZGhwYXJhbXxzc2xfZWFybHlfZGF0YXxzc2xfZWNkaF9jdXJ2ZXxzc2xfcGFzc3dvcmRfZmlsZXxzc2xfcHJlZmVyX3NlcnZlcl9jaXBoZXJzfHNzbF9wcm90b2NvbHN8c3NsX3Nlc3Npb25fY2FjaGV8c3NsX3Nlc3Npb25fdGlja2V0X2tleXxzc2xfc2Vzc2lvbl90aWNrZXRzfHNzbF9zZXNzaW9uX3RpbWVvdXR8c3NsX3N0YXBsaW5nfHNzbF9zdGFwbGluZ19maWxlfHNzbF9zdGFwbGluZ19yZXNwb25kZXJ8c3NsX3N0YXBsaW5nX3ZlcmlmeXxzc2xfdHJ1c3RlZF9jZXJ0aWZpY2F0ZXxzc2xfdmVyaWZ5X2NsaWVudHxzc2xfdmVyaWZ5X2RlcHRofHN0YXR1c3xzdGF0dXNfZm9ybWF0fHN0YXR1c196b25lfHN0dWJfc3RhdHVzfHN1Yl9maWx0ZXJ8c3ViX2ZpbHRlcl9sYXN0X21vZGlmaWVkfHN1Yl9maWx0ZXJfb25jZXxzdWJfZmlsdGVyX3R5cGVzfHNlcnZlcnx6b25lfHN0YXRlfGhhc2h8aXBfaGFzaHxrZWVwYWxpdmV8a2VlcGFsaXZlX3JlcXVlc3RzfGtlZXBhbGl2ZV90aW1lb3V0fG50bG18bGVhc3RfY29ubnxsZWFzdF90aW1lfHF1ZXVlfHJhbmRvbXxzdGlja3l8c3RpY2t5X2Nvb2tpZV9pbnNlcnR8dXBzdHJlYW1fY29uZnxoZWFsdGhfY2hlY2t8dXNlcmlkfHVzZXJpZF9kb21haW58dXNlcmlkX2V4cGlyZXN8dXNlcmlkX21hcmt8dXNlcmlkX25hbWV8dXNlcmlkX3AzcHx1c2VyaWRfcGF0aHx1c2VyaWRfc2VydmljZXx1d3NnaV9iaW5kfHV3c2dpX2J1ZmZlcl9zaXplfHV3c2dpX2J1ZmZlcmluZ3x1d3NnaV9idWZmZXJzfHV3c2dpX2J1c3lfYnVmZmVyc19zaXplfHV3c2dpX2NhY2hlfHV3c2dpX2NhY2hlX2JhY2tncm91bmRfdXBkYXRlfHV3c2dpX2NhY2hlX2J5cGFzc3x1d3NnaV9jYWNoZV9rZXl8dXdzZ2lfY2FjaGVfbG9ja3x1d3NnaV9jYWNoZV9sb2NrX2FnZXx1d3NnaV9jYWNoZV9sb2NrX3RpbWVvdXR8dXdzZ2lfY2FjaGVfbWF4X3JhbmdlX29mZnNldHx1d3NnaV9jYWNoZV9tZXRob2RzfHV3c2dpX2NhY2hlX21pbl91c2VzfHV3c2dpX2NhY2hlX3BhdGh8dXdzZ2lfY2FjaGVfcHVyZ2V8dXdzZ2lfY2FjaGVfcmV2YWxpZGF0ZXx1d3NnaV9jYWNoZV91c2Vfc3RhbGV8dXdzZ2lfY2FjaGVfdmFsaWR8dXdzZ2lfY29ubmVjdF90aW1lb3V0fHV3c2dpX2ZvcmNlX3Jhbmdlc3x1d3NnaV9oaWRlX2hlYWRlcnx1d3NnaV9pZ25vcmVfY2xpZW50X2Fib3J0fHV3c2dpX2lnbm9yZV9oZWFkZXJzfHV3c2dpX2ludGVyY2VwdF9lcnJvcnN8dXdzZ2lfbGltaXRfcmF0ZXx1d3NnaV9tYXhfdGVtcF9maWxlX3NpemV8dXdzZ2lfbW9kaWZpZXIxfHV3c2dpX21vZGlmaWVyMnx1d3NnaV9uZXh0X3Vwc3RyZWFtfHV3c2dpX25leHRfdXBzdHJlYW1fdGltZW91dHx1d3NnaV9uZXh0X3Vwc3RyZWFtX3RyaWVzfHV3c2dpX25vX2NhY2hlfHV3c2dpX3BhcmFtfHV3c2dpX3Bhc3N8dXdzZ2lfcGFzc19oZWFkZXJ8dXdzZ2lfcGFzc19yZXF1ZXN0X2JvZHl8dXdzZ2lfcGFzc19yZXF1ZXN0X2hlYWRlcnN8dXdzZ2lfcmVhZF90aW1lb3V0fHV3c2dpX3JlcXVlc3RfYnVmZmVyaW5nfHV3c2dpX3NlbmRfdGltZW91dHx1d3NnaV9zb2NrZXRfa2VlcGFsaXZlfHV3c2dpX3NzbF9jZXJ0aWZpY2F0ZXx1d3NnaV9zc2xfY2VydGlmaWNhdGVfa2V5fHV3c2dpX3NzbF9jaXBoZXJzfHV3c2dpX3NzbF9jcmx8dXdzZ2lfc3NsX25hbWV8dXdzZ2lfc3NsX3Bhc3N3b3JkX2ZpbGV8dXdzZ2lfc3NsX3Byb3RvY29sc3x1d3NnaV9zc2xfc2VydmVyX25hbWV8dXdzZ2lfc3NsX3Nlc3Npb25fcmV1c2V8dXdzZ2lfc3NsX3RydXN0ZWRfY2VydGlmaWNhdGV8dXdzZ2lfc3NsX3ZlcmlmeXx1d3NnaV9zc2xfdmVyaWZ5X2RlcHRofHV3c2dpX3N0b3JlfHV3c2dpX3N0b3JlX2FjY2Vzc3x1d3NnaV90ZW1wX2ZpbGVfd3JpdGVfc2l6ZXx1d3NnaV90ZW1wX3BhdGh8aHR0cDJfYm9keV9wcmVyZWFkX3NpemV8aHR0cDJfY2h1bmtfc2l6ZXxodHRwMl9pZGxlX3RpbWVvdXR8aHR0cDJfbWF4X2NvbmN1cnJlbnRfcHVzaGVzfGh0dHAyX21heF9jb25jdXJyZW50X3N0cmVhbXN8aHR0cDJfbWF4X2ZpZWxkX3NpemV8aHR0cDJfbWF4X2hlYWRlcl9zaXplfGh0dHAyX21heF9yZXF1ZXN0c3xodHRwMl9wdXNofGh0dHAyX3B1c2hfcHJlbG9hZHxodHRwMl9yZWN2X2J1ZmZlcl9zaXplfGh0dHAyX3JlY3ZfdGltZW91dHx4bWxfZW50aXRpZXN8eHNsdF9sYXN0X21vZGlmaWVkfHhzbHRfcGFyYW18eHNsdF9zdHJpbmdfcGFyYW18eHNsdF9zdHlsZXNoZWV0fHhzbHRfdHlwZXN8bGlzdGVufHByb3RvY29sfHJlc29sdmVyfHJlc29sdmVyX3RpbWVvdXR8dGltZW91dHxhdXRoX2h0dHB8YXV0aF9odHRwX2hlYWRlcnxhdXRoX2h0dHBfcGFzc19jbGllbnRfY2VydHxhdXRoX2h0dHBfdGltZW91dHxwcm94eV9idWZmZXJ8cHJveHlfcGFzc19lcnJvcl9tZXNzYWdlfHByb3h5X3RpbWVvdXR8eGNsaWVudHxzdGFydHRsc3xpbWFwX2F1dGh8aW1hcF9jYXBhYmlsaXRpZXN8aW1hcF9jbGllbnRfYnVmZmVyfHBvcDNfYXV0aHxwb3AzX2NhcGFiaWxpdGllc3xzbXRwX2F1dGh8c210cF9jYXBhYmlsaXRpZXN8c210cF9jbGllbnRfYnVmZmVyfHNtdHBfZ3JlZXRpbmdfZGVsYXl8cHJlcmVhZF9idWZmZXJfc2l6ZXxwcmVyZWFkX3RpbWVvdXR8cHJveHlfcHJvdG9jb2xfdGltZW91dHxqc19hY2Nlc3N8anNfZmlsdGVyfGpzX3ByZXJlYWR8cHJveHlfZG93bmxvYWRfcmF0ZXxwcm94eV9yZXF1ZXN0c3xwcm94eV9yZXNwb25zZXN8cHJveHlfdXBsb2FkX3JhdGV8c3NsX2hhbmRzaGFrZV90aW1lb3V0fHNzbF9wcmVyZWFkfGhlYWx0aF9jaGVja190aW1lb3V0fHpvbmVfc3luY3x6b25lX3N5bmNfYnVmZmVyc3x6b25lX3N5bmNfY29ubmVjdF9yZXRyeV9pbnRlcnZhbHx6b25lX3N5bmNfY29ubmVjdF90aW1lb3V0fHpvbmVfc3luY19pbnRlcnZhbHx6b25lX3N5bmNfcmVjdl9idWZmZXJfc2l6ZXx6b25lX3N5bmNfc2VydmVyfHpvbmVfc3luY19zc2x8em9uZV9zeW5jX3NzbF9jZXJ0aWZpY2F0ZXx6b25lX3N5bmNfc3NsX2NlcnRpZmljYXRlX2tleXx6b25lX3N5bmNfc3NsX2NpcGhlcnN8em9uZV9zeW5jX3NzbF9jcmx8em9uZV9zeW5jX3NzbF9uYW1lfHpvbmVfc3luY19zc2xfcGFzc3dvcmRfZmlsZXx6b25lX3N5bmNfc3NsX3Byb3RvY29sc3x6b25lX3N5bmNfc3NsX3NlcnZlcl9uYW1lfHpvbmVfc3luY19zc2xfdHJ1c3RlZF9jZXJ0aWZpY2F0ZXx6b25lX3N5bmNfc3NsX3ZlcmlmeV9kZXB0aHx6b25lX3N5bmNfdGltZW91dHxnb29nbGVfcGVyZnRvb2xzX3Byb2ZpbGVzfHByb3h5fHBlcmxcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1wic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInN0cmluZy5yZWdleHBcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYihsb2NhdGlvbikoXFxcXHMrKShbXFxcXF5dP35bXFxcXCpdP1xcXFxzKy4qPykoeylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInRleHRcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYihsb2NhdGlvbnxtYXRjaHx1cHN0cmVhbSkoXFxcXHMrKSguKj8pKHspXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInN0b3JhZ2UudHlwZVwiLCBcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwidmFyaWFibGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXg6ICdcXFxcYihzcGxpdF9jbGllbnRzfG1hcCkoXFxcXHMrKShcXFxcXCIuKlxcXFxcIikoXFxcXHMrKShcXFxcJFtcXFxcd19dKykoXFxcXHMqKSh7KSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInN0b3JhZ2UudHlwZVwiLCBcInRleHRcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYihodHRwfGV2ZW50c3xzZXJ2ZXJ8bWFpbHxzdHJlYW0pKFxcXFxzKikoeylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInZhcmlhYmxlXCIsIFwidGV4dFwiLCBcInZhcmlhYmxlXCIsIFwidGV4dFwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoZ2VvfG1hcCkoXFxcXHMrKShcXFxcJFtcXFxcd19dKyk/KFxcXFxzKikoXFxcXCRbXFxcXHdfXSspKFxcXFxzKikoeyknXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKH0pXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCIoeylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKGlmKShcXFxccyspKFxcXFwoKVwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcKXwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibGV4aWNhbFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYihcIiArIGtleXdvcmRzICsgXCIpXFxcXGJcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCI7XCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibGV4aWNhbFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJzdHJpbmcucmVnZXhwXCIsIFwidGV4dFwiLCBcInB1bmN0dWF0aW9uXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIocmV3cml0ZSkoXFxcXHMpKFxcXFxTKikoXFxcXHMuKikoOylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImxleGljYWxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImNvbW1lbnRzXCJcbiAgICAgICAgfV0sXG4gICAgICAgIGNvbW1lbnRzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6ICcjLiokJ1xuICAgICAgICB9XSxcbiAgICAgICAgbGV4aWNhbDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCInXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwidmFyaWFibGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInZhcmlhYmxlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICByZWdleDogL1shXT9bfl1bKl0/XFxzKy4qKD89XFwpKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bXFxeXVxcUyooPz07JCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvW1xcXl1cXFMqKD89O3xcXHN8JCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxCKFxcXFwrfFxcXFwtfFxcXFwqfFxcXFw9fCE9KVxcXFxCXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKHRydWV8ZmFsc2V8b258b2ZmfGFsbHxhbnl8bWFpbnxhbHdheXMpXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInZhcmlhYmxlc1wiXG4gICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgdmFyaWFibGVzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwkW1xcXFx3X10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKEdFVHxQT1NUfEhFQUQpXFxcXGJcIlxuICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuXG5vb3AuaW5oZXJpdHMoTmdpbnhIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5OZ2lueEhpZ2hsaWdodFJ1bGVzID0gTmdpbnhIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==