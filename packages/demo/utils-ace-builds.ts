import * as ace from "ace-builds";
ace.require("ace/ext/language_tools");
const event = ace.require("ace/lib/event");
const HashHandler = ace.require("ace/keyboard/hash_handler").HashHandler;
const keyUtil = ace.require("ace/lib/keys");
const theme = ace.require("ace/theme/textmate");
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

export function createEditorWithLSP(mode, i: number, languageProvider: LanguageProvider, width = "49%") {
    let el = document.createElement("div");
    let modeName = createModeNameText(el, mode.name);
    let closeButton = createCloseButton(el);
    let editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "container" + i);
    editorContainer.style.height = "300px";
    el.appendChild(editorContainer);
    el.style.width = width;
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
