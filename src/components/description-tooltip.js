"use strict";

var oop = require("ace-code/src/lib/oop");
var event = require("ace-code/src/lib/event");
var {Range} = require("ace-code/src/range");
var {Tooltip} = require("ace-code/src/tooltip");

function DescriptionTooltip(editor) {
    if (editor.descriptionTooltip) return;
    Tooltip.call(this, editor.container);
    editor.descriptionTooltip = this;
    this.editor = editor;

    this.update = this.update.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
    event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
}

oop.inherits(DescriptionTooltip, Tooltip);

(function () {
    this.token = {};
    this.range = new Range();

    this.update = async function () {
        this.$timer = null;

        var r = this.editor.renderer;
        if (this.lastT - (r.timeStamp || 0) > 1000) {
            r.rect = null;
            r.timeStamp = this.lastT;
            this.maxHeight = window.innerHeight;
            this.maxWidth = window.innerWidth;
        }
        var pos = r.pixelToScreenCoordinates(this.x, this.y);
        var row = pos.row;
        var col = pos.column;

        var screenPos = {
            row: row,
            column: col < 0 ? 0 : col
        };

        var description = await window["provider"].doHover(screenPos);
        if (!description) {
            this.hide();
            return;
        }
        var descriptionText = description.text;

        if (descriptionText === "") {
            this.hide();
            return;
        }
        if (this.descriptionText != descriptionText) {
            this.setHtml(descriptionText);
            this.width = this.getWidth();
            this.height = this.getHeight();
            this.descriptionText = descriptionText;
        }

        var session = this.editor.session;
        var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
        var token = session.getTokenAt(docPos.row, docPos.column + 1);
        console.log(`Row: ${docPos.row}  Column: ${docPos.column + 1}`);
        var pos = this.editor.renderer.textToScreenCoordinates(description.range?.start.row + 1 ?? docPos.row, description.range?.start.column ?? token.start);
        console.log(pos);
        console.log(token.start);
        this.show(null, pos.pageX, pos.pageY);
    };

    this.onMouseMove = function (e) {
        this.x = e.clientX;
        this.y = e.clientY;
        if (this.isOpen) {
            this.lastT = e.timeStamp;
            //this.setPosition(this.x, this.y);
        }
        if (!this.$timer) this.$timer = setTimeout(this.update, 10);
    };

    this.onMouseOut = function (e) {
        if (e && e.currentTarget.contains(e.relatedTarget)) return;
        this.hide();
        this.$timer = clearTimeout(this.$timer);
    };

    this.setPosition = function (x, y) {
        Tooltip.prototype.setPosition.call(this, x, y);
    };

    this.destroy = function () {
        this.onMouseOut();
        event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
        delete this.editor.descriptionTooltip;
    };

}).call(DescriptionTooltip.prototype);

exports.DescriptionTooltip = DescriptionTooltip;
