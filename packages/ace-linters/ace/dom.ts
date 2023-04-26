//taken from ace-code

import {Range} from "./range";

export function importCssString(cssText, id, target?) {
    if (typeof document == "undefined") return;

    var container = target;
    if (!target || !target.getRootNode) {
        container = document;
    }
    else {
        container = target.getRootNode();
        if (!container || container == target) container = document;
    }

    var doc = container.ownerDocument || container;

    // If style is already imported return immediately.
    if (id && hasCssString(id, container)) return null;

    if (id) cssText += "\n/*# sourceURL=ace/css/" + id + " */";

    var style = createElement("style");
    style.appendChild(doc.createTextNode(cssText));
    if (id) style.id = id;

    if (container == doc) container = getDocumentHead(doc);
    container.insertBefore(style, container.firstChild);
}

//taken with small changes from ace-code
export function mergeRanges(ranges) {
    var list = ranges;

    list = list.sort(function (a, b) {
        return Range.comparePoints(a.start, b.start);
    });

    var next = list[0], range;
    for (var i = 1; i < list.length; i++) {
        range = next;
        next = list[i];
        var cmp = Range.comparePoints(range.end, next.start);
        if (cmp < 0) continue;

        if (cmp == 0 && !range.isEmpty() && !next.isEmpty()) continue;

        if (Range.comparePoints(range.end, next.end) < 0) {
            range.end.row = next.end.row;
            range.end.column = next.end.column;
        }

        list.splice(i, 1);
        next = range;
        i--;
    }

    return list;
}

function hasCssString(id, doc) {
    var index = 0, sheets;
    doc = doc || document;
    if ((sheets = doc.querySelectorAll("style"))) {
        while (index < sheets.length) {
            if (sheets[index++].id === id) {
                return true;
            }
        }
    }
}

function createElement(tag, ns?) {
    return document.createElementNS ? document.createElementNS(ns || "http://www.w3.org/1999/xhtml", tag)
        : document.createElement(tag);
}

function getDocumentHead(doc) {
    if (!doc) doc = document;
    return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
}
