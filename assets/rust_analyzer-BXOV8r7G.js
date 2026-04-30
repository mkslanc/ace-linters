const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-BzrMdHxh.js","./chunk-Cu_MO8PN.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./chunk-Cu_MO8PN.js";
import "./modulepreload-polyfill-BHCAmPhR.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import "./keys-CNbBglaM.js";
import "./event-Crda3qyq.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./editor-ImsyhaOB.js";
import "./edit_session-DAgqly_m.js";
import "./tooltip-BuOUCQpw.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./hash_handler-DWXab_Mk.js";
import "./text-CIUeTHSc.js";
import "./virtual_renderer-CgL6zTGT.js";
import "./ace-Dxe3P65B.js";
import "./multi_select-Dohhryzh.js";
import "./fold_mode-D_StAfa6.js";
import "./error_marker-DpPZ5m3m.js";
import { a as __vitePreload, i as init_esm_resolver, n as createEditorWithLSP, o as init_preload_helper, t as addFormatCommand } from "./utils-zrJ4NpFi.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import "./language_tools-B8HNeNpe.js";
import { t as require_ace_language_client } from "./ace-language-client-BvGpS4Pn.js";
//#region packages/demo/docs-example/rust-example.js
var import_ace_language_client = require_ace_language_client();
init_esm_resolver();
init_preload_helper();
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
	"" + new URL("webworker-CKYpLZX6.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var mode = {
	name: "rust",
	mode: "ace/mode/rust",
	content: rustContent
};
var serverData = {
	module: () => __vitePreload(() => import("./language-client-BzrMdHxh.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "rust",
	type: "webworker",
	worker
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
createEditorWithLSP(mode, 0, languageProvider);
addFormatCommand(languageProvider);
//#endregion
