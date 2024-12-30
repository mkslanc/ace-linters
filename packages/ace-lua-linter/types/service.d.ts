import { ServiceOptionsWithErrorMessages } from "ace-linters/src/types/language-service";
import { Config } from "@wasm-fmt/lua_fmt";
export interface AceLuaLinterOptions extends ServiceOptionsWithErrorMessages {
    formatOptions: Config;
}
