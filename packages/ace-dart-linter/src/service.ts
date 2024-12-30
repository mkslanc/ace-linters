import {ServiceOptionsWithErrorMessages} from "ace-linters/src/types/language-service";

export interface AceDartLinterOptions extends ServiceOptionsWithErrorMessages{
    formatOptions: {
        line_width?: number;
        line_ending?: "lf" | "crlf";
        language_version?: string;
    }
}