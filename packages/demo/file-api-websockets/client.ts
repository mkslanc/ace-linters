import {AceLayout, Box, TabManager, Button, dom, AceTreeWrapper, FileSystemWeb, Pane, AceEditor, Tab} from "ace-layout";
import {addFormatCommand} from "../utils";
import {Ace} from "ace-code";
import {LanguageProvider} from "ace-linters";

let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker, {functionality: {semanticTokens: true}});
languageProvider.requireFilePath = true;
addFormatCommand(languageProvider);

let fileTree: Box;
let editorBox: Box;

//document.body.innerHTML = "";
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
window["fileTreeWrapper"] = fileTree;
let fileSystem = new FileSystemWeb();
let aceTree = new AceTreeWrapper();

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

    languageProvider.registerEditor((tab.editor as AceEditor).editor);
    let path = treeNode.path.substring(treeNode.path.indexOf("/", 1));
    languageProvider.setSessionFilePath(tab.session, `${languageProvider.workspaceUri || ""}${path}`);
});

tabManager.restoreFrom(localStorage);

async function openFolder() {
    let nodes = await fileSystem.open();
    setWorkspace();
    aceTree.updateTreeData(nodes);
    aceTree.element.addEventListener("item-click", (evt: CustomEvent) => {
        fileSystem.openFile(evt.detail);
    });
}

function openInfo() {
    var popup = document.getElementById("info-popup");
    popup.style.display = "block";
    document.getElementById("okayBtn").onclick = function () {
        openFolder();
        popup.style.display = "none";
    };
}

function setWorkspace() {
    var popup = document.getElementById("workspace-popup");
    popup.style.display = "block";
    var span = document.querySelector(".popup-content .close");
    span.onclick = function() {
        popup.style.display = "none";
    }
    document.getElementById("confirmBtn").onclick = function() {
        var dirPath = document.getElementById("filePath").value;
        alert("File path confirmed: " + dirPath);
        popup.style.display = "none";
        languageProvider.changeWorkspaceFolder(dirPath);
    }
}
