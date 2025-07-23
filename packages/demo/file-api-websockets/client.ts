import {AceLayout, Box, TabManager, Button, dom, AceTreeWrapper, FileSystemWeb, Pane, AceEditor, Tab} from "ace-layout";
import {addFormatCommand} from "../utils";
import {Ace} from "ace-code";
import {LanguageProvider, SessionLspConfig} from "ace-linters";

declare module "ace-code/src/edit_session" {

    interface EditSession {
        lspConfig?: SessionLspConfig
    }
}

let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker, {
    functionality: {semanticTokens: true},
    manualSessionControl: true,
});
addFormatCommand(languageProvider);

let fileTree: Box;
let editorBox: Box;

let base = new Box({
    vertical: false,
    0: fileTree = new Box({
        size: 200,
    }),
    1: editorBox = new Box({
        isMain: true,
        0: new Pane()
    })
});

new AceLayout(base);

// @ts-ignore
window["fileTreeWrapper"] = fileTree;
let fileSystem = new FileSystemWeb();
let aceTree = new AceTreeWrapper();
aceTree.render();

function renderFileTree() {
    let button = new Button({value: "Open Folder"});
    let buttonWrapper = ["div", {}, button.render()];
    let aceTreeWrapper = ["div", {style: "height: 100%"}, aceTree.element];
    button.element.addEventListener("click", openInfo);
    dom.buildDom(["div", {style: "height: 100%"}, buttonWrapper, aceTreeWrapper], fileTree.element);
}


base.render();
let onResize = function () {
    base.setBox(0, 0, window.innerWidth, window.innerHeight)
};
renderFileTree();
onResize();
document.body.appendChild(base.element);
window.onresize = onResize;

let tabManager = TabManager.getInstance({
    containers: {
        main: editorBox
    },
    fileSystem: fileSystem
});

tabManager.fileSystem?.on("openFile", (treeNode) => {
    let tab = tabManager.getTab(treeNode.path) as Tab<Ace.EditSession>;
    let path = treeNode.path.substring(treeNode.path.indexOf("/", 1));
    const editor = (tab.editor as AceEditor).editor;
    editor.session.lspConfig = {filePath: path, joinWorkspaceURI: true}
    languageProvider.registerEditor(editor); //, {filePath: path, joinWorkspaceURI: true}
    //languageProvider.setSessionFilePath(tab.session, {filePath: path, joinWorkspaceURI: true});  -> it's another
    // way to set path
});

tabManager.restoreFrom(localStorage);

async function openFolder() {
    let nodes = await fileSystem.open();
    setWorkspace();
    aceTree.updateTreeData(nodes);
    aceTree.element.addEventListener("item-click", (evt) => {
        if ("detail" in evt) {
            fileSystem.openFile(evt.detail);
        }
    });
}

function openInfo() {
    var popup = document.getElementById("info-popup");
    if (popup) {
        popup.style.display = "block";
        const okayBtn = document.getElementById("okayBtn");
        if (okayBtn) {
            okayBtn.onclick = function () {
                openFolder();
                if (popup) {
                    popup.style.display = "none";
                }
            };
        }

    }
}

function setWorkspace() {
    var popup = document.getElementById("workspace-popup");
    if (popup) {
        popup.style.display = "block";
    }
    var span = document.querySelector(".popup-content .close");
    if (span) {
        (span as HTMLElement).onclick = function () {
            if (popup) {
                popup.style.display = "none";
            }
        }
    }
    const confirmBtn = document.getElementById("confirmBtn");
    if (confirmBtn) {
        confirmBtn.onclick = function () {
            const filePathInput = document.getElementById("filePath");
            if (filePathInput) {
                var dirPath = (filePathInput as HTMLInputElement).value;
                alert("File path confirmed: " + dirPath);
                if (popup) {
                    popup.style.display = "none";
                }
                languageProvider.changeWorkspaceFolder(dirPath);
            }
        }
    }
}
