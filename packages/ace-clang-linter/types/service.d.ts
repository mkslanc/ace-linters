import { ServiceOptionsWithErrorMessages } from "ace-linters/src/types/language-service";
import { Style } from "@wasm-fmt/clang-format";
export interface AceClangLinterOptions extends ServiceOptionsWithErrorMessages {
    formatOptions: {
        BasedOnStyle: Style;
    };
}
