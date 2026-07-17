const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-w80P8oSG.js","./modulepreload-polyfill-DxDZhch-.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./modulepreload-polyfill-DxDZhch-.js";
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-B-ki7ewn.js";
import { t as require_ace_language_client } from "./ace-language-client-DZXtePH9.js";
//#region packages/demo/docs-example/rust-example.js
init_preload_helper();
init_esm_resolver();
var import_ace_language_client = require_ace_language_client();
var rustContent = `
use std::ops::Range;

fn gav(x: i32, y: i32) -> i64 {
    (x - y) * (x + y)
}

fn main() {
    let num = 5;
    let a = vec![1, 2, 3];
    let b = Some(2);
    let c = None;
    let d = Range { start: 1, end: num };
    let e = 1..num;
    let f = "sssss".to_string();
    for a in d {
        for b in e {
            let c = gav(gav(a, b), a);
            assert_eq!(gav(a, b), a * a - b * b);
        }
    }
    let f = d
        .reduce(|a, b| {
            println!("{}", a);
            a * b
        })
        .unwrap();
}
`;
//#endregion
//#region packages/demo/rust-analyzer/demo.ts
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-BxFZKHVk.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var mode = {
	name: "rust",
	mode: "ace/mode/rust",
	content: rustContent
};
var serverData = {
	module: () => __vitePreload(() => import("./language-client-w80P8oSG.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "rust",
	type: "webworker",
	worker
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
createEditorWithLSP(mode, 0, languageProvider);
addFormatCommand(languageProvider);
//#endregion
