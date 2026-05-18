import {expect} from "chai";
import * as ace from "ace-code";
import "ace-code/src/test/mockdom";
import {createTextMarkerAdapter} from "../../src/ace/text_markers";

describe("text marker adapter", () => {
    it("installs text marker support from an editor instance", () => {
        const editor = ace.edit(document.createElement("div"), {
            value: "const value = 1;",
            mode: "ace/mode/javascript"
        });
        const adapter = createTextMarkerAdapter();

        adapter.enableTextMarkers(editor);

        expect(editor.session.addTextMarker).to.be.a("function");
        expect(editor.session.removeTextMarker).to.be.a("function");
        expect(editor.session.getTextMarkers).to.be.a("function");
        expect(editor["$textMarkersAfterRender"]).to.be.a("function");

        const markerId = editor.session.addTextMarker!(
            {
                start: {row: 0, column: 6},
                end: {row: 0, column: 11}
            },
            "ace_test_marker"
        );

        expect(editor.session.getTextMarkers!()[markerId].className).to.equal("ace_test_marker");

        editor.session.removeTextMarker!(markerId);
        expect(editor.session.getTextMarkers!()[markerId]).to.be.undefined;

        adapter.disableTextMarkers(editor);
        expect(editor["$textMarkersAfterRender"]).to.be.undefined;

        editor.destroy();
    });

    it("removes only classes added by text markers", () => {
        const editor = ace.edit(document.createElement("div"), {
            value: "value",
            mode: "ace/mode/javascript"
        });
        const adapter = createTextMarkerAdapter();
        adapter.enableTextMarkers(editor);

        const textLayer = editor.renderer["$textLayer"];
        const lineElement = document.createElement("div");
        const tokenElement = document.createElement("span");
        tokenElement.className = "ace_variable";
        tokenElement.textContent = "value";
        lineElement.appendChild(tokenElement);
        textLayer.element.appendChild(lineElement);
        textLayer.$lines = {
            cells: [{row: 0, element: lineElement}]
        };

        textLayer.$processRegularMarker(
            tokenElement,
            lineElement,
            {
                beforeSelection: 0,
                selectionLength: 5,
                afterSelection: 0
            },
            {
                range: {
                    start: {row: 0, column: 0},
                    end: {row: 0, column: 5}
                },
                id: 1,
                className: "ace_variable ace_highlight_unnecessary"
            },
            0,
            0,
            5
        );

        expect(tokenElement.classList.contains("ace_variable")).to.equal(true);
        expect(tokenElement.classList.contains("ace_highlight_unnecessary")).to.equal(true);

        textLayer.$removeClass("ace_variable ace_highlight_unnecessary");

        expect(tokenElement.classList.contains("ace_variable")).to.equal(true);
        expect(tokenElement.classList.contains("ace_highlight_unnecessary")).to.equal(false);

        adapter.disableTextMarkers(editor);
        editor.destroy();
    });
});
