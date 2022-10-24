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

        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        var offset = (this.x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((this.y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var screenPos = {
            row: row,
            column: col < 0 ? 0 : col
        };
        var description = await window["worker"].doHover(screenPos);
        if (!description) {
            this.hide();
            return;
        }
        var descriptionText = Array.isArray(description.contents) ? description.contents.join(" ")
            : description.contents.value;
        if (descriptionText === "") {
            this.hide();
            return;
        }
        if (this.descriptionText != descriptionText) {
            this.setText(descriptionText);
            this.width = this.getWidth();
            this.height = this.getHeight();
            this.descriptionText = descriptionText;
        }

        this.show(null, this.x, this.y);
    };

    this.onMouseMove = function (e) {
        this.x = e.clientX;
        this.y = e.clientY;
        if (this.isOpen) {
            this.lastT = e.timeStamp;
            this.setPosition(this.x, this.y);
        }
        if (!this.$timer) this.$timer = setTimeout(this.update, 100);
    };

    this.onMouseOut = function (e) {
        if (e && e.currentTarget.contains(e.relatedTarget)) return;
        this.hide();
        this.$timer = clearTimeout(this.$timer);
    };

    this.setPosition = function (x, y) {
        if (x + 10 + this.width > this.maxWidth) x = window.innerWidth - this.width - 10;
        if (y > window.innerHeight * 0.75 || y + 20 + this.height > this.maxHeight) y = y - this.height - 30;

        Tooltip.prototype.setPosition.call(this, x + 10, y + 20);
    };

    this.destroy = function () {
        this.onMouseOut();
        event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
        delete this.editor.descriptionTooltip;
    };

}).call(DescriptionTooltip.prototype);

exports.DescriptionTooltip = DescriptionTooltip;
