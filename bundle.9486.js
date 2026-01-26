(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9486],{

/***/ 71164:
/***/ ((module) => {

module.exports = `
.ace-cloud_editor .ace_gutter {
    background: #ffffff;
    color: #3a3a42;
}

.ace-cloud_editor .ace_tooltip-marker-error.ace_tooltip-marker {
    background-color: #d13212;
}
.ace-cloud_editor .ace_tooltip-marker-security.ace_tooltip-marker {
    background-color: #d13212;
}
.ace-cloud_editor .ace_tooltip-marker-warning.ace_tooltip-marker {
    background-color: #906806;
}

.ace-cloud_editor .ace_print-margin {
    width: 1px;
    background: #697077;
}

.ace-cloud_editor {
    background-color: #ffffff;
    color: #3a3a42;
}

.ace-cloud_editor .ace_cursor {
    color: #3a3a42;
}

.ace-cloud_editor .ace_marker-layer .ace_selection {
    background: #bfceff;
}

.ace-cloud_editor.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #ffffff;
    border-radius: 2px;
}

.ace-cloud_editor .ace_marker-layer .ace_step {
    background: #697077;
}

.ace-cloud_editor .ace_marker-layer .ace_bracket {
    margin: 0 0 0 -1px;
    border: 1px solid #697077;
}

.ace-cloud_editor .ace_gutter-cursor,
.ace-cloud_editor .ace_marker-layer .ace_active-line {
    box-sizing: border-box;
    border-top: 1px solid #9191ac;
    border-bottom: 1px solid #9191ac;
}

.ace-cloud_editor .ace_gutter-cursor {
    position: absolute;
    width: 100%;
}

.ace-cloud_editor .ace_marker-layer .ace_selected-word {
    border: 1px solid #bfceff;
}

.ace-cloud_editor .ace_fold {
    background-color: #0E45B4;
    border-color: #3a3a42;
}

.ace-cloud_editor .ace_keyword {
    color: #9749d1;
}

.ace-cloud_editor .ace_meta.ace_tag {
    color: #0E45B4;
}

.ace-cloud_editor .ace_constant {
    color: #A16101;
}

.ace-cloud_editor .ace_constant.ace_numeric {
    color: #A16101;
}

.ace-cloud_editor .ace_constant.ace_character.ace_escape {
    color: #BD1880;
}

.ace-cloud_editor .ace_support.ace_function {
    color: #A81700;
}

.ace-cloud_editor .ace_support.ace_class {
    color: #A16101;
}

.ace-cloud_editor .ace_storage {
    color: #9749d1;
}

.ace-cloud_editor .ace_invalid.ace_illegal {
    color: #ffffff;
    background-color: #0E45B4;
}

.ace-cloud_editor .ace_invalid.ace_deprecated {
    color: #ffffff;
    background-color: #A16101;
}

.ace-cloud_editor .ace_string {
    color: #207A7F;
}

.ace-cloud_editor .ace_string.ace_regexp {
    color: #207A7F;
}

.ace-cloud_editor .ace_comment,
.ace-cloud_editor .ace_ghost_text {
    color: #697077;
    opacity: 1;
}

.ace-cloud_editor .ace_variable {
    color: #0E45B4;
}

.ace-cloud_editor .ace_meta.ace_selector {
    color: #9749d1;
}

.ace-cloud_editor .ace_entity.ace_other.ace_attribute-name {
    color: #A16101;
}

.ace-cloud_editor .ace_entity.ace_name.ace_function {
    color: #A81700;
}

.ace-cloud_editor .ace_entity.ace_name.ace_tag {
    color: #0E45B4;
}

.ace-cloud_editor .ace_heading {
    color: #A81700;
}

.ace-cloud_editor .ace_xml-pe {
    color: #A16101;
}
.ace-cloud_editor .ace_doctype {
    color: #0E45B4;
}

.ace-cloud_editor .ace_tooltip {
    background-color: #ffffff;
    color: #3a3a42;
}

.ace-cloud_editor .ace_icon_svg.ace_error,
.ace-cloud_editor .ace_icon_svg.ace_error_fold {
    background-color: #d13212;
}
.ace-cloud_editor .ace_icon_svg.ace_security,
.ace-cloud_editor .ace_icon_svg.ace_security_fold {
    background-color: #d13212;
}
.ace-cloud_editor .ace_icon_svg.ace_warning,
.ace-cloud_editor .ace_icon_svg.ace_warning_fold {
    background-color: #906806;
}
.ace-cloud_editor .ace_icon_svg.ace_info {
    background-color: #0073bb;
}
.ace-cloud_editor .ace_icon_svg.ace_hint {
    background-color: #0073bb;
}
.ace-cloud_editor .ace_highlight-marker {
    background: none;
    border: #0E45B4 1px solid;
}
.ace-cloud_editor .ace_tooltip.ace_hover-tooltip:focus > div {
    outline: 1px solid #0073bb;
}
.ace-cloud_editor .ace_snippet-marker {
    background-color: #CED6E0;
    border: 0;
}

.ace-cloud_editor.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #f2f3f3;
    border: #0F68AE 1.5px solid;
}
.ace-cloud_editor.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid #16191f;
    background: #f2f3f3;
}
.ace-cloud_editor.ace_editor.ace_autocomplete .ace_completion-meta {
    color: #545b64;
    opacity: 1;
}
.ace-cloud_editor.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #0F68AE;
}
.ace-cloud_editor.ace_editor.ace_autocomplete {
    box-shadow: 0 1px 1px 0 #001c244d, 1px 1px 1px 0 #001c2426, -1px 1px 1px 0 #001c2426;
    line-height: 1.5;
    border: 1px solid #eaeded;
    background: #ffffff;
    color: #16191f;
}

`;

/***/ }),

/***/ 89486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.isDark = false;
exports.cssClass = "ace-cloud_editor";
exports.cssText = __webpack_require__(71164);
/**@internal */
exports.$showGutterCursorMarker = true;

var dom = __webpack_require__(71435);
dom.importCssString(exports.cssText, exports.cssClass, false);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk0ODYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDdE5BLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsNENBQStDO0FBQy9DO0FBQ0EsK0JBQStCOztBQUUvQixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3RoZW1lL2Nsb3VkX2VkaXRvci1jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvdGhlbWUvY2xvdWRfZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYFxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9ndXR0ZXIge1xuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgY29sb3I6ICMzYTNhNDI7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfdG9vbHRpcC1tYXJrZXItZXJyb3IuYWNlX3Rvb2x0aXAtbWFya2VyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDEzMjEyO1xufVxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV90b29sdGlwLW1hcmtlci1zZWN1cml0eS5hY2VfdG9vbHRpcC1tYXJrZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMTMyMTI7XG59XG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3Rvb2x0aXAtbWFya2VyLXdhcm5pbmcuYWNlX3Rvb2x0aXAtbWFya2VyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA2ODA2O1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3ByaW50LW1hcmdpbiB7XG4gICAgd2lkdGg6IDFweDtcbiAgICBiYWNrZ3JvdW5kOiAjNjk3MDc3O1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBjb2xvcjogIzNhM2E0Mjtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9jdXJzb3Ige1xuICAgIGNvbG9yOiAjM2EzYTQyO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX21hcmtlci1sYXllciAuYWNlX3NlbGVjdGlvbiB7XG4gICAgYmFja2dyb3VuZDogI2JmY2VmZjtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IuYWNlX211bHRpc2VsZWN0IC5hY2Vfc2VsZWN0aW9uLmFjZV9zdGFydCB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCAwcHggI2ZmZmZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfbWFya2VyLWxheWVyIC5hY2Vfc3RlcCB7XG4gICAgYmFja2dyb3VuZDogIzY5NzA3Nztcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9tYXJrZXItbGF5ZXIgLmFjZV9icmFja2V0IHtcbiAgICBtYXJnaW46IDAgMCAwIC0xcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzY5NzA3Nztcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9ndXR0ZXItY3Vyc29yLFxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9tYXJrZXItbGF5ZXIgLmFjZV9hY3RpdmUtbGluZSB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzkxOTFhYztcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzkxOTFhYztcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9ndXR0ZXItY3Vyc29yIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfbWFya2VyLWxheWVyIC5hY2Vfc2VsZWN0ZWQtd29yZCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JmY2VmZjtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9mb2xkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMEU0NUI0O1xuICAgIGJvcmRlci1jb2xvcjogIzNhM2E0Mjtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9rZXl3b3JkIHtcbiAgICBjb2xvcjogIzk3NDlkMTtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9tZXRhLmFjZV90YWcge1xuICAgIGNvbG9yOiAjMEU0NUI0O1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2NvbnN0YW50IHtcbiAgICBjb2xvcjogI0ExNjEwMTtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9jb25zdGFudC5hY2VfbnVtZXJpYyB7XG4gICAgY29sb3I6ICNBMTYxMDE7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfY29uc3RhbnQuYWNlX2NoYXJhY3Rlci5hY2VfZXNjYXBlIHtcbiAgICBjb2xvcjogI0JEMTg4MDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9zdXBwb3J0LmFjZV9mdW5jdGlvbiB7XG4gICAgY29sb3I6ICNBODE3MDA7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2Vfc3VwcG9ydC5hY2VfY2xhc3Mge1xuICAgIGNvbG9yOiAjQTE2MTAxO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3N0b3JhZ2Uge1xuICAgIGNvbG9yOiAjOTc0OWQxO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2ludmFsaWQuYWNlX2lsbGVnYWwge1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwRTQ1QjQ7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfaW52YWxpZC5hY2VfZGVwcmVjYXRlZCB7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ExNjEwMTtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9zdHJpbmcge1xuICAgIGNvbG9yOiAjMjA3QTdGO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3N0cmluZy5hY2VfcmVnZXhwIHtcbiAgICBjb2xvcjogIzIwN0E3Rjtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9jb21tZW50LFxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9naG9zdF90ZXh0IHtcbiAgICBjb2xvcjogIzY5NzA3NztcbiAgICBvcGFjaXR5OiAxO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3ZhcmlhYmxlIHtcbiAgICBjb2xvcjogIzBFNDVCNDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9tZXRhLmFjZV9zZWxlY3RvciB7XG4gICAgY29sb3I6ICM5NzQ5ZDE7XG59XG5cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfZW50aXR5LmFjZV9vdGhlci5hY2VfYXR0cmlidXRlLW5hbWUge1xuICAgIGNvbG9yOiAjQTE2MTAxO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2VudGl0eS5hY2VfbmFtZS5hY2VfZnVuY3Rpb24ge1xuICAgIGNvbG9yOiAjQTgxNzAwO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2VudGl0eS5hY2VfbmFtZS5hY2VfdGFnIHtcbiAgICBjb2xvcjogIzBFNDVCNDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9oZWFkaW5nIHtcbiAgICBjb2xvcjogI0E4MTcwMDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV94bWwtcGUge1xuICAgIGNvbG9yOiAjQTE2MTAxO1xufVxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9kb2N0eXBlIHtcbiAgICBjb2xvcjogIzBFNDVCNDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV90b29sdGlwIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIGNvbG9yOiAjM2EzYTQyO1xufVxuXG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2ljb25fc3ZnLmFjZV9lcnJvcixcbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfaWNvbl9zdmcuYWNlX2Vycm9yX2ZvbGQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMTMyMTI7XG59XG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2ljb25fc3ZnLmFjZV9zZWN1cml0eSxcbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfaWNvbl9zdmcuYWNlX3NlY3VyaXR5X2ZvbGQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMTMyMTI7XG59XG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2ljb25fc3ZnLmFjZV93YXJuaW5nLFxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9pY29uX3N2Zy5hY2Vfd2FybmluZ19mb2xkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA2ODA2O1xufVxuLmFjZS1jbG91ZF9lZGl0b3IgLmFjZV9pY29uX3N2Zy5hY2VfaW5mbyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzNiYjtcbn1cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfaWNvbl9zdmcuYWNlX2hpbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDczYmI7XG59XG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX2hpZ2hsaWdodC1tYXJrZXIge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgYm9yZGVyOiAjMEU0NUI0IDFweCBzb2xpZDtcbn1cbi5hY2UtY2xvdWRfZWRpdG9yIC5hY2VfdG9vbHRpcC5hY2VfaG92ZXItdG9vbHRpcDpmb2N1cyA+IGRpdiB7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkICMwMDczYmI7XG59XG4uYWNlLWNsb3VkX2VkaXRvciAuYWNlX3NuaXBwZXQtbWFya2VyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0VENkUwO1xuICAgIGJvcmRlcjogMDtcbn1cblxuLmFjZS1jbG91ZF9lZGl0b3IuYWNlX2VkaXRvci5hY2VfYXV0b2NvbXBsZXRlIC5hY2VfbWFya2VyLWxheWVyIC5hY2VfYWN0aXZlLWxpbmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYzZjM7XG4gICAgYm9yZGVyOiAjMEY2OEFFIDEuNXB4IHNvbGlkO1xufVxuLmFjZS1jbG91ZF9lZGl0b3IuYWNlX2VkaXRvci5hY2VfYXV0b2NvbXBsZXRlIC5hY2VfbGluZS1ob3ZlciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzE2MTkxZjtcbiAgICBiYWNrZ3JvdW5kOiAjZjJmM2YzO1xufVxuLmFjZS1jbG91ZF9lZGl0b3IuYWNlX2VkaXRvci5hY2VfYXV0b2NvbXBsZXRlIC5hY2VfY29tcGxldGlvbi1tZXRhIHtcbiAgICBjb2xvcjogIzU0NWI2NDtcbiAgICBvcGFjaXR5OiAxO1xufVxuLmFjZS1jbG91ZF9lZGl0b3IuYWNlX2VkaXRvci5hY2VfYXV0b2NvbXBsZXRlIC5hY2VfY29tcGxldGlvbi1oaWdobGlnaHR7XG4gICAgY29sb3I6ICMwRjY4QUU7XG59XG4uYWNlLWNsb3VkX2VkaXRvci5hY2VfZWRpdG9yLmFjZV9hdXRvY29tcGxldGUge1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDFweCAwICMwMDFjMjQ0ZCwgMXB4IDFweCAxcHggMCAjMDAxYzI0MjYsIC0xcHggMXB4IDFweCAwICMwMDFjMjQyNjtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVkZWQ7XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBjb2xvcjogIzE2MTkxZjtcbn1cblxuYDsiLCJleHBvcnRzLmlzRGFyayA9IGZhbHNlO1xuZXhwb3J0cy5jc3NDbGFzcyA9IFwiYWNlLWNsb3VkX2VkaXRvclwiO1xuZXhwb3J0cy5jc3NUZXh0ID0gcmVxdWlyZShcIi4vY2xvdWRfZWRpdG9yLWNzc1wiKTtcbi8qKkBpbnRlcm5hbCAqL1xuZXhwb3J0cy4kc2hvd0d1dHRlckN1cnNvck1hcmtlciA9IHRydWU7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoZXhwb3J0cy5jc3NUZXh0LCBleHBvcnRzLmNzc0NsYXNzLCBmYWxzZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=