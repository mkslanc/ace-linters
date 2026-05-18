import type {Ace} from "ace-code";

type TextMarkerRange = {
    start: { row: number; column: number };
    end: { row: number; column: number };
};

export type TextMarker = {
    range: TextMarkerRange;
    id: number;
    className: string;
    type?: string;
};

type SelectionSegment = {
    beforeSelection: number;
    selectionLength: number;
    afterSelection: number;
};

type TextLayerLike = {
    element?: HTMLElement;
    session: Ace.EditSession;
    dom: {
        createTextNode(text: string, root?: HTMLElement): Text;
        createFragment(root?: HTMLElement): DocumentFragment;
        createElement(tagName: string): HTMLElement;
    };
    $lines: {
        cells: { row: number; element: HTMLElement }[];
    };
    TAB_CHAR: string;
    SPACE_CHAR: string;
};

type TextLayerWithMarkers = TextLayerLike & typeof textMarkerMixin;

type TextMarkerSession = Ace.EditSession & {
    $textMarkerId?: number;
    $textMarkers?: TextMarker[];
    $scheduleForRemove?: Set<string>;
    addTextMarker?: (range: TextMarkerRange, className: string, type?: string) => number;
    removeTextMarker?: (markerId: number) => void;
    getTextMarkers?: () => TextMarker[];
};

type TextMarkerEditor = Ace.Editor & {
    $textMarkersAfterRender?: (e: unknown, renderer: Ace.VirtualRenderer) => void;
};

function stringRepeat(text: string, count: number): string {
    return new Array(count + 1).join(text);
}

function getClassNames(className: string): string[] {
    return className.split(/\s+/).filter(Boolean);
}

function addClassNames(element: HTMLElement, className: string) {
    const addedClasses: Set<string> = element["$aceLspTextMarkerAddedClasses"] || new Set();
    getClassNames(className).forEach((singleClassName) => {
        if (!element.classList.contains(singleClassName)) {
            element.classList.add(singleClassName);
            addedClasses.add(singleClassName);
        }
    });
    if (addedClasses.size > 0) {
        element["$aceLspTextMarkerAddedClasses"] = addedClasses;
        element.setAttribute("data-ace-lsp-text-marker", "true");
    }
}

function removeClassNames(element: HTMLElement, className: string) {
    const addedClasses: Set<string> | undefined = element["$aceLspTextMarkerAddedClasses"];
    if (!addedClasses) {
        return;
    }
    getClassNames(className).forEach((singleClassName) => {
        if (addedClasses.has(singleClassName)) {
            element.classList.remove(singleClassName);
            addedClasses.delete(singleClassName);
        }
    });
    if (addedClasses.size === 0) {
        delete element["$aceLspTextMarkerAddedClasses"];
        element.removeAttribute("data-ace-lsp-text-marker");
    }
}

export const textMarkerMixin = {
    $removeClass(this: TextLayerLike, className: string) {
        if (!this.element || !className) return;
        var selectedElements = this.element.querySelectorAll("[data-ace-lsp-text-marker]");
        for (let i = 0; i < selectedElements.length; i++) {
            var element = selectedElements[i] as HTMLElement & { charCount?: number };
            removeClassNames(element, className);

            if (element.hasAttribute("data-whitespace")) {
                var originalWhitespace = element.getAttribute("data-whitespace") || "";
                var textNode = this.dom.createTextNode(originalWhitespace, this.element) as Text & { charCount?: number };
                textNode["charCount"] = element["charCount"];
                element.parentNode?.replaceChild(textNode, element);
            }
        }
    },

    $applyTextMarkers(this: TextLayerLike) {
        const textLayer = this as TextLayerWithMarkers;
        const session = this.session as TextMarkerSession;
        if (session.$scheduleForRemove) {
            session.$scheduleForRemove.forEach((className) => {
                textLayer.$removeClass(className);
            });

            session.$scheduleForRemove = new Set();
        }

        var textMarkers = session.getTextMarkers ? session.getTextMarkers() : [];

        if (textMarkers.length === 0) {
            return;
        }

        var classNameGroups = new Set<string>();
        textMarkers.forEach((marker) => {
            if (marker) {
                classNameGroups.add(marker.className);
            }
        });

        classNameGroups.forEach((className) => {
            textLayer.$removeClass(className);
        });

        textMarkers.forEach((marker) => {
            if (!marker) {
                return;
            }
            for (let row = marker.range.start.row; row <= marker.range.end.row; row++) {
                var cell = this.$lines.cells.find((el) => el.row === row);

                if (cell) {
                    textLayer.$modifyDomForMarkers(cell.element, row, marker);
                }
            }
        });
    },

    $modifyDomForMarkers(this: TextLayerLike, lineElement: HTMLElement, row: number, marker: TextMarker) {
        var lineLength = this.session.getLine(row).length;
        let startCol = row > marker.range.start.row ? 0 : marker.range.start.column;
        let endCol = row < marker.range.end.row ? lineLength : marker.range.end.column;
        if (startCol === endCol) {
            return;
        }

        var lineElements: ChildNode[] | HTMLElement[] = [];
        if (lineElement.classList.contains("ace_line_group")) {
            lineElements = Array.from(lineElement.childNodes);
        }
        else {
            lineElements = [lineElement];
        }

        var currentColumn = 0;
        lineElements.forEach((lineElement) => {
            var childNodes = Array.from(lineElement.childNodes);
            for (let i = 0; i < childNodes.length; i++) {
                let subChildNodes = [childNodes[i]];
                let parentNode: ChildNode = lineElement;
                if (childNodes[i].childNodes && childNodes[i].childNodes.length > 0) {
                    subChildNodes = Array.from(childNodes[i].childNodes);
                    parentNode = childNodes[i];
                }
                for (let j = 0; j < subChildNodes.length; j++) {
                    var node = subChildNodes[j] as ChildNode & { charCount?: number };
                    var nodeText = node.textContent || "";
                    const nodeParent = node.parentNode as (Node & { charCount?: number }) | null;
                    if (nodeParent?.["charCount"]) {
                        node["charCount"] = nodeParent["charCount"];
                    }
                    var contentLength = node["charCount"] || nodeText.length;
                    var nodeStart = currentColumn;
                    var nodeEnd = currentColumn + contentLength;

                    if (node["charCount"] === 0 || contentLength === 0) {
                        continue;
                    }

                    if (nodeStart < endCol && nodeEnd > startCol) {
                        var beforeSelection = Math.max(0, startCol - nodeStart);
                        var afterSelection = Math.max(0, nodeEnd - endCol);
                        var selectionLength = contentLength - beforeSelection - afterSelection;

                        if (marker.type === "invisible") {
                            (this as TextLayerWithMarkers).$processInvisibleMarker(node, parentNode, {
                                beforeSelection,
                                selectionLength,
                                afterSelection
                            }, marker);
                        }
                        else {
                            (this as TextLayerWithMarkers).$processRegularMarker(node, parentNode, {
                                beforeSelection,
                                selectionLength,
                                afterSelection
                            }, marker, nodeStart, startCol, endCol);
                        }
                    }
                    currentColumn = nodeEnd;
                }
            }
        });
    },

    $processInvisibleMarker(this: TextLayerLike, node: ChildNode & { charCount?: number }, parentNode: ChildNode, selectionSegment: SelectionSegment, marker: TextMarker) {
        var nodeText = node.textContent || "";
        if (node.nodeType === 3) {
            var fragment = this.dom.createFragment(this.element);

            if (selectionSegment.beforeSelection > 0) {
                fragment.appendChild(
                    this.dom.createTextNode(nodeText.substring(0, selectionSegment.beforeSelection), this.element));
            }

            if (selectionSegment.selectionLength > 0) {
                var selectedText = selectionSegment.beforeSelection === 0 && selectionSegment.afterSelection === 0
                    ? nodeText : nodeText.substring(
                        selectionSegment.beforeSelection,
                        selectionSegment.beforeSelection + selectionSegment.selectionLength
                    );

                var segments = selectedText.match(/\s+|[^\s]+/g) || [];

                for (let k = 0; k < segments.length; k++) {
                    var segment = segments[k];
                    let span: HTMLElement;
                    if (/^\s+$/.test(segment)) {
                        span = this.dom.createElement("span");
                        addClassNames(span, marker.className);
                        var symbol = node["charCount"] ? this.TAB_CHAR : this.SPACE_CHAR;
                        span.textContent = stringRepeat(symbol, segment.length);
                        span.setAttribute("data-whitespace", segment);
                    }
                    else {
                        span = this.dom.createElement("span");
                        span.textContent = segment;
                    }
                    if (node["charCount"] && segments.length === 1) {
                        span["charCount"] = node["charCount"];
                    }
                    fragment.appendChild(span);
                }
            }

            if (selectionSegment.afterSelection > 0) {
                fragment.appendChild(this.dom.createTextNode(
                    nodeText.substring(selectionSegment.beforeSelection + selectionSegment.selectionLength),
                    this.element
                ));
            }

            parentNode.replaceChild(fragment, node);
        }
    },

    $processRegularMarker(this: TextLayerLike, node: ChildNode & { charCount?: number }, parentNode: ChildNode, selectionSegment: SelectionSegment, marker: TextMarker, nodeStart: number, startCol: number, endCol: number) {
        var nodeText = node.textContent || "";
        if (node.nodeType === 3) {
            if (selectionSegment.beforeSelection > 0 || selectionSegment.afterSelection > 0) {
                var fragment = this.dom.createFragment(this.element);

                if (selectionSegment.beforeSelection > 0) {
                    fragment.appendChild(
                        this.dom.createTextNode(nodeText.substring(0, selectionSegment.beforeSelection), this.element));
                }

                if (selectionSegment.selectionLength > 0) {
                    var selectedSpan = this.dom.createElement("span");
                    addClassNames(selectedSpan, marker.className);
                    selectedSpan.textContent = nodeText.substring(
                        selectionSegment.beforeSelection,
                        selectionSegment.beforeSelection + selectionSegment.selectionLength
                    );
                    fragment.appendChild(selectedSpan);
                }

                if (selectionSegment.afterSelection > 0) {
                    fragment.appendChild(this.dom.createTextNode(
                        nodeText.substring(selectionSegment.beforeSelection + selectionSegment.selectionLength),
                        this.element
                    ));
                }

                parentNode.replaceChild(fragment, node);
            }
            else {
                var selectedSpan = this.dom.createElement("span");
                addClassNames(selectedSpan, marker.className);
                selectedSpan.textContent = nodeText;
                selectedSpan["charCount"] = node["charCount"];
                parentNode.replaceChild(selectedSpan, node);
            }
        }
        else if (node.nodeType === 1) {
            const element = node as HTMLElement;
            if (nodeStart >= startCol && nodeStart + (nodeText.length || 0) <= endCol) {
                addClassNames(element, marker.className);
            }
            else {
                if (selectionSegment.beforeSelection > 0 || selectionSegment.afterSelection > 0) {
                    var nodeClasses = element.className;
                    var fragment = this.dom.createFragment(this.element);

                    if (selectionSegment.beforeSelection > 0) {
                        var beforeSpan = this.dom.createElement("span");
                        beforeSpan.className = nodeClasses;
                        beforeSpan.textContent = nodeText.substring(0, selectionSegment.beforeSelection);
                        fragment.appendChild(beforeSpan);
                    }

                    if (selectionSegment.selectionLength > 0) {
                        var selectedSpan = this.dom.createElement("span");
                        selectedSpan.className = nodeClasses;
                        addClassNames(selectedSpan, marker.className);
                        selectedSpan.textContent = nodeText.substring(
                            selectionSegment.beforeSelection,
                            selectionSegment.beforeSelection + selectionSegment.selectionLength
                        );
                        fragment.appendChild(selectedSpan);
                    }

                    if (selectionSegment.afterSelection > 0) {
                        var afterSpan = this.dom.createElement("span");
                        afterSpan.className = nodeClasses;
                        afterSpan.textContent = nodeText.substring(selectionSegment.beforeSelection + selectionSegment.selectionLength);
                        fragment.appendChild(afterSpan);
                    }

                    parentNode.replaceChild(fragment, node);
                }
            }
        }
    }
};

export const editSessionTextMarkerMixin = {
    addTextMarker(this: TextMarkerSession, range: TextMarkerRange, className: string, type?: string): number {
        this.$textMarkerId = this.$textMarkerId || 0;
        this.$textMarkerId++;
        var marker = {
            range: range,
            id: this.$textMarkerId,
            className: className,
            type: type
        };
        if (!this.$textMarkers) {
            this.$textMarkers = [];
        }
        this.$textMarkers[marker.id] = marker;
        return marker.id;
    },

    removeTextMarker(this: TextMarkerSession, markerId: number) {
        if (!this.$textMarkers) {
            return;
        }

        var marker = this.$textMarkers[markerId];
        if (!marker) {
            return;
        }
        if (!this.$scheduleForRemove) {
            this.$scheduleForRemove = new Set();
        }
        this.$scheduleForRemove.add(marker.className);
        delete this.$textMarkers[markerId];
    },

    getTextMarkers(this: TextMarkerSession): TextMarker[] {
        return this.$textMarkers || [];
    }
};

function patchPrototype(target: object | undefined, mixin: object, flagName: string) {
    if (!target) {
        return;
    }
    const prototype = Object.getPrototypeOf(target);
    if (!prototype || prototype[flagName]) {
        return;
    }
    Object.assign(prototype, mixin);
    prototype[flagName] = true;
}

export function createTextMarkerAdapter() {
    const onAfterRender = (_e: unknown, renderer: Ace.VirtualRenderer) => {
        const textLayer = renderer["$textLayer"] as TextLayerLike & {
            $applyTextMarkers?: () => void;
        };
        textLayer?.$applyTextMarkers?.();
    };

    function installTextMarkerSupport(editor: Ace.Editor) {
        patchPrototype(editor.renderer?.["$textLayer"], textMarkerMixin, "$aceLintersTextMarkerMixin");
        patchPrototype(editor.session, editSessionTextMarkerMixin, "$aceLintersTextMarkerSessionMixin");
    }

    function enableTextMarkers(editor: TextMarkerEditor) {
        installTextMarkerSupport(editor);
        if (!editor.$textMarkersAfterRender) {
            editor.$textMarkersAfterRender = onAfterRender;
            editor.renderer.on("afterRender", editor.$textMarkersAfterRender);
        }
    }

    function disableTextMarkers(editor: TextMarkerEditor) {
        if (editor.$textMarkersAfterRender) {
            editor.renderer.off("afterRender", editor.$textMarkersAfterRender);
            delete editor.$textMarkersAfterRender;
        }
    }

    return {
        enableTextMarkers,
        disableTextMarkers
    };
}
