const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-DoZGfaDK.js","./chunk-BLiWRsM1.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./chunk-BLiWRsM1.js";
import { a as __vitePreload, i as init_esm_resolver, n as createEditorWithLSP, o as init_preload_helper, t as addFormatCommand } from "./utils-D49U00ka.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import "./lang-B3gWVpaj.js";
import "./keys-BcZo005C.js";
import "./event-Dotkamqq.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./editor-IG7gAR87.js";
import "./edit_session-BlcJnX8K.js";
import "./tooltip-CZS68mop.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./hash_handler-qEoapM91.js";
import "./text-N_UsxJUz.js";
import "./virtual_renderer-CFYU0u0C.js";
import "./ace-CwaQ19rM.js";
import "./multi_select-NPpC6jeg.js";
import "./fold_mode-DLWDk-fx.js";
import "./error_marker-CM8od4Mk.js";
import "./snippets-WSFIKT-5.js";
import "./autocomplete-DNfsPPz_.js";
import "./language_tools-D17FoDJM.js";
import { t as require_ace_language_client } from "./ace-language-client-CYa1OSPS.js";
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
	module: () => __vitePreload(() => import("./language-client-DoZGfaDK.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "rust",
	type: "webworker",
	worker
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
createEditorWithLSP(mode, 0, languageProvider);
addFormatCommand(languageProvider);
//#endregion
