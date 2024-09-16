import * as ace from "ace-code";
import "ace-code/src/ext/language_tools";
import event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import keyUtil from "ace-code/src/lib/keys";
import * as theme from "ace-code/src/theme/textmate";
import type {LanguageProvider} from "ace-linters";

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
    modeName.id = "titleId";
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

    let editor = ace.edit("container" + i, {
        mode: mode.mode,
        value: mode.content,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        theme: theme,
        customScrollbar: true
    });
    
    languageProvider.registerEditor(editor);

    let options = mode.options ?? {};
    languageProvider.setSessionOptions(editor.session, options);
    
    
    /**
     * Sets the file path for the current editor session.
     * This allows the language provider to associate the editor session with a specific file path,
     * which can be useful for features like code formatting, diagnostics, and other language-specific functionality.
     */
    if (mode.filePath) {
        languageProvider.setSessionFilePath(editor.session, mode.filePath);
    }

    closeButton.onclick = () => {
        languageProvider.closeDocument(editor.session);
        editor.destroy();
        editor.container.remove();
        modeName.remove();
        closeButton.remove();
    }
    return editor;
}

export function addFormatCommand(languageProvider: LanguageProvider) {
    let menuKb = new HashHandler([
        {
            bindKey: "Ctrl-Shift-B",
            name: "format",
            exec: function () {
                languageProvider.format();
            }
        }
    ]);
    event.addCommandKeyListener(window, function (e, hashId, keyCode) {
        let keyString = keyUtil.keyCodeToString(keyCode);
        let command = menuKb.findKeyCommand(hashId, keyString);
        if (command) {
            command.exec();
            e.preventDefault();
        }
    });
}
