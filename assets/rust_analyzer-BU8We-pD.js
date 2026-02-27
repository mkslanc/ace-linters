const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-CIrflWtH.js","./message-types-M_uv5dSK.js","./chunk-iA-Slpst.js"])))=>i.map(i=>d[i]);
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-cKgy90LS.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import "./autocomplete-CHTKiwQ7.js";
import "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import { t as AceLanguageClient } from "./ace-language-client-D-sstb9V.js";
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
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-EnsQdI4a.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var mode = {
	name: "rust",
	mode: "ace/mode/rust",
	content: rustContent
};
var serverData = {
	module: () => __vitePreload(() => import("./language-client-CIrflWtH.js"), __vite__mapDeps([0,1,2]), import.meta.url),
	modes: "rust",
	type: "webworker",
	worker
};
var languageProvider = AceLanguageClient.for(serverData);
createEditorWithLSP(mode, 0, languageProvider);
addFormatCommand(languageProvider);
