import * as ace from "ace-code";
import "ace-code/src/ext/language_tools";


import * as theme from "ace-code/src/theme/textmate";
import {LanguageProvider} from "ace-linters";

export function createCloseButton(el) {
    let closeButton = document.createElement("span");
    closeButton.innerText = "\u00D7";
    closeButton.style.cursor = "pointer";
    el.appendChild(closeButton);
    return closeButton;
}

export function createModeNameText(el, name) {
    let modeName = document.createElement("p");
    modeName.innerText = name;
    modeName.style.margin = "0";
    modeName.style.paddingRight = "10px";
    modeName.style.float = "left";
    el.appendChild(modeName);
    return modeName;
}

export function createEditorWithLSP(mode, i: number, languageProvider: LanguageProvider) {
    let el = document.createElement("div");
    let modeName = createModeNameText(el, mode.name);
    let closeButton = createCloseButton(el);
    let editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "container" + i);
    editorContainer.style.height = "300px";
    el.appendChild(editorContainer);
    el.style.width = "49%";
    el.style.float = "left";
    document.body.appendChild(el);

    let editor = ace.edit("container" + i);
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
    });
    editor.setTheme(theme);
    editor.setOptions({"customScrollbar": true})
    editor.session.setValue(mode.content);
    editor.session.setMode(new mode.mode());
    
    languageProvider.registerEditor(editor);

    let options = mode.options ?? {};
    languageProvider.setSessionOptions(editor.session, options);

    closeButton.onclick = () => {
        editor.destroy();
        editor.container.remove();
        modeName.remove();
        closeButton.remove();
    }
}
