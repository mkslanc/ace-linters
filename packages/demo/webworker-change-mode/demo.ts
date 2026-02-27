import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {typescriptContent} from "../docs-example/typescript-example";
import {jsonContent} from "../docs-example/json-example";
import {json5Content} from "../docs-example/json5-example";
import {htmlContent} from "../docs-example/html-example";
import {cssContent} from "../docs-example/css-example";
import {lessContent} from "../docs-example/less-example";
import {scssContent} from "../docs-example/scss-example";
import {pythonContent} from "../docs-example/python-example";
import {jsContent} from "../docs-example/javascript-example";
import {tsxContent} from "../docs-example/tsx-example";
import {luaContent} from "../docs-example/lua-example";
import {yamlContent} from "../docs-example/yaml-example";
import {xmlContent} from "../docs-example/xml-example";
import {phpContent} from "../docs-example/php-example";
import {mysqlContent} from "../docs-example/mysql-example";
import {textContent} from "../docs-example/text-example";
import * as theme from "ace-code/src/theme/textmate";
import {LanguageProvider} from "ace-linters";
import * as ace from "ace-code";
import {addFormatCommand} from "../utils";
import {AceSpellCheckOptions} from "ace-spell-check/build/ace-spell-check";

let modes = [
  { name: "text", mode: "ace/mode/text", content: textContent },
  {
    name: "typescript",
    mode: "ace/mode/typescript",
    content: typescriptContent,
  },
  { name: "json", mode: "ace/mode/json", content: jsonContent },
  { name: "json5", mode: "ace/mode/json5", content: json5Content },
  { name: "html", mode: "ace/mode/html", content: htmlContent },
  { name: "css", mode: "ace/mode/css", content: cssContent },
  { name: "less", mode: "ace/mode/less", content: lessContent },
  { name: "scss", mode: "ace/mode/scss", content: scssContent },
  { name: "python", mode: "ace/mode/python", content: pythonContent },
  { name: "javascript", mode: "ace/mode/javascript", content: jsContent },
  { name: "tsx", mode: "ace/mode/tsx", content: tsxContent },
  { name: "lua", mode: "ace/mode/lua", content: luaContent },
  { name: "yaml", mode: "ace/mode/yaml", content: yamlContent },
  { name: "xml", mode: "ace/mode/xml", content: xmlContent },
  { name: "php", mode: "ace/mode/php", content: phpContent },
  { name: "mysql", mode: "ace/mode/mysql", content: mysqlContent },

  { name: "swift", mode: "ace/mode/swift", content: 'print("Hello, Swift")\n' },
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url), {type: 'module'});
let languageProvider = LanguageProvider.create(worker);

let el = document.getElementById("ace_modes");
if (el && "value" in el) {
  el.onchange = function () {
    let mode = modes.find(x => x.name == el["value"]);
    if (mode) {
      editor.setValue(mode.content ?? "", -1);
      editor.session.setMode(mode.mode);
    }
  }
  for (var i = 0; i < modes.length; i++) {
    let option = document.createElement("option");
    option.value = modes[i].name;
    option.innerText = modes[i].name;
    el.appendChild(option);
  }
}


let editorEl = document.createElement("div");
let editorContainer = document.createElement("div");
editorContainer.setAttribute("id", "container");
editorContainer.style.height = "300px";
editorEl.appendChild(editorContainer);
editorEl.style.width = "100%";
editorEl.style.float = "left";

const wrapper = document.getElementById("wrapper");
wrapper?.appendChild(editorEl);

let currentMode = modes[0];

let editor = ace.edit("container", {
  mode: currentMode.mode,
  value: currentMode.content,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  theme: theme,
  customScrollbar: true,
});

languageProvider.registerEditor(editor);

addFormatCommand(languageProvider);
