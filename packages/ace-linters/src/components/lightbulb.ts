import * as lsp from "vscode-languageserver-protocol";
import {CodeActionsByService} from "../types/language-service";
import {AcePopup} from "../ace/acePopup";
import {Ace} from "ace-code";

interface ILightbulbWidget {
    codeActions: CodeActionsByService[];
    executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void;

    setExecuteActionCallback(callback: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void): void;

    setCodeActions(actions: CodeActionsByService[]): void;

    showLightbulb(): void;

    hideLightbulb(): void;

    dispose(): void;
}

export class LightbulbWidget implements ILightbulbWidget {
    codeActions: CodeActionsByService[];
    lightbulb: HTMLDivElement;
    popup: Ace.AcePopup;
    executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void;
    private editor: Ace.Editor;
    lightBulbWidth = 10;
    lightBulbHeight = 16;

    constructor(editor: Ace.Editor, executeActionCallback?: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void) {
        this.editor = editor;
        this.codeActions = [];
        this.executeActionCallback = executeActionCallback;
        //@ts-ignore
        this.popup = new AcePopup(editor.container || document.body || document.documentElement);
        this.popup.on("click", (e) => {
            const selectedRow = this.popup.getData(this.popup.getRow());
            this.executeAction(selectedRow["action"], selectedRow["serviceName"]);
            this.popup.hide();
            e.stop();
        });

        this.setEditorListeners(editor);

        this.createLightbulb();
    }

    setEditorListeners(editor: Ace.Editor) {
        editor.on("changeSelection", this.hideAll);
        editor.on("focus", this.hideAll);

        editor.renderer.on("afterRender", this.setPosition);
    }

    removeListeners() {
        this.editor.off("changeSelection", this.hideAll);
        this.editor.off("focus", this.hideAll);
        this.editor.session.off("changeScrollTop", this.setPosition);
        this.editor.session.off("changeScrollLeft", this.setPosition);
    }

    setExecuteActionCallback(callback: (action: (lsp.CodeAction | lsp.Command), serviceName: string) => void) {
        this.executeActionCallback = callback;
    }

    hideAll = () => {
        this.hideLightbulb();
        this.popup.hide();
    }

    createLightbulb() {
        this.lightbulb = document.createElement("div");
        this.lightbulb.id = "lightbulb";
        this.lightbulb.style.display = 'none';
        this.lightbulb.style.position = 'absolute';
        this.lightbulb.style.width = this.lightBulbWidth + 'px';
        this.lightbulb.style.height = this.lightBulbHeight + 'px';
        this.lightbulb.style.zIndex = "999";
        this.lightbulb.style.background = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmlld0JveD0iNi4yMTM2IDIuMjk4MSAxMi42OTI0IDE4LjYzMjgiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTSAxNi43ODEgNC4wOCBDIDE1LjQzMyAyLjc1MiAxMy42MiAyLjA5OCAxMS44MSAyLjM1MiBDIDguOTUyIDIuNzU0IDYuNjY4IDUuMjE0IDYuMjc4IDguMzA4IEMgNS45ODYgMTAuNjE2IDYuNjk2IDEyLjg0NSA4LjIyNyAxNC40MjQgQyA5LjE4NyAxNS40MTUgOS43MzkgMTYuNzgzIDkuNzM5IDE4LjE3NSBMIDE1LjM5NiAxOC4xODkgQyAxNS4zOTYgMTYuODc2IDE1LjkxMSAxNS40MTggMTYuODc1IDE0LjQzNSBDIDE4LjE2NSAxMy4xMTYgMTguOTA2IDExLjI0OSAxOC45MDYgOS4zMTQgQyAxOC45MDYgNy4zMTcgMTguMTMzIDUuNDEgMTYuNzgxIDQuMDggWiIgc3R5bGU9ImZpbGw6IHJnYigyNTIsIDE5NSwgODcpOyIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgLTEuNDIxMDg1NDcxNTIwMjAwNGUtMTQpIi8+DQogIDxyZWN0IHg9IjguMzgiIHk9IjIzMy42NzkiIHdpZHRoPSI0LjMxMyIgaGVpZ2h0PSIwLjAxMSIgc3R5bGU9ImZpbGw6IHJnYigyMTYsIDIxNiwgMjE2KTsgc3Ryb2tlOiByZ2IoMCwgMCwgMCk7IiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAtMSwgMi4wNzg5ODQxMDcxNjIxODUsIDI1Mi45MzUzNDM1OTU5NDE5NikiLz4NCiAgPHJlY3QgeD0iLTExLjY2NSIgeT0iLTIzLjU5NSIgd2lkdGg9IjMuMDk4IiBzdHlsZT0iZmlsbDogcmdiKDIxNiwgMjE2LCAyMTYpOyBzdHJva2U6IHJnYigwLCAwLCAwKTsiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTgxOTk5Mzk3Mjc3OSwgLTAuMDA2MDUyOTk5NzU3MjMwMjgxLCAwLCAxLjAwMDAxODAwMDYwMjcyMjIsIDIyLjcyOTA4NDk0NDQxNjMwNywgNDQuNDQ0NjczNDQ4NDU5MDg1KSIgaGVpZ2h0PSIwLjAxMSIvPg0KPC9zdmc+) no-repeat center center';
        this.lightbulb.style.cursor = 'pointer';
        this.lightbulb.setAttribute('role', 'button');
        this.lightbulb.setAttribute('aria-label', 'Show code actions');
        this.editor.container.appendChild(this.lightbulb);
        this.lightbulb.addEventListener('click', (event) => {
            this.showMenu(event.clientX, event.clientY);
        });
    }


    setCodeActions(actions: CodeActionsByService[]) {
        this.codeActions = actions;
    }

    private showMenu(x: number, y: number) {
        if (this.codeActions.length === 0) {
            return;
        }
        this.setDataToPopup();
        this.popup.show({top: y, left: x}, 12, false)
    }

    isEmpty() {
        if (this.codeActions.length === 0) {
            return true;
        }
        for (let actionsByService of this.codeActions) {
            if (actionsByService.codeActions && actionsByService.codeActions.length > 0) {
                return false;
            }
        }
        return true;
    }

    setDataToPopup() {
        let codeActions: Ace.Completion[] = [];
        this.codeActions.forEach(codeActionsByService => {
            codeActionsByService.codeActions?.forEach((action) => {
                    codeActions.push({
                        value: action.title,
                        //@ts-expect-error
                        serviceName: codeActionsByService.service,
                        action: action
                    })
                }
            )
        });
        this.popup.setData(codeActions, "");
    }

    executeAction(action: (lsp.CodeAction | lsp.Command), serviceName: string) {
        this.executeActionCallback && this.executeActionCallback(action, serviceName);
        this.hideLightbulb();
    }

    showLightbulb() {
        if (this.isEmpty()) {
            return;
        }
        this.setPosition();
        this.lightbulb.style.display = 'block';
    }

    hideLightbulb() {
        this.lightbulb.style.display = 'none';
    }

    calculatePosition(): { x: number, y: number } {
        const gutterCenter = Math.round(this.editor.renderer["gutterWidth"] / 2 - this.lightBulbWidth);
        const firstRow = this.editor.renderer.getFirstVisibleRow();
        const cursor = this.editor.getCursorPosition();
        const lineHeight = this.editor.renderer.lineHeight;
        return {
            x: gutterCenter,
            y: (cursor.row - firstRow) * lineHeight
        }
    }

    setPosition = () => {
        const position = this.calculatePosition();
        this.lightbulb.style.left = `${position.x}px`;
        this.lightbulb.style.top = `${position.y}px`;
    }


    dispose() {
        this.removeListeners();
        document.body.removeChild(this.lightbulb);
    }
}
