import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import {
    LanguageService,
    PhpServiceOptions,
} from "../../types/language-service";
import {filterDiagnostics} from "../../type-converters/lsp/lsp-converters";

import PhpParser, {Engine, Program} from "php-parser";
import {toDiagnostics} from "./php-converters";

export class PhpService
    extends BaseService<PhpServiceOptions>
    implements LanguageService {
    private parser: Engine;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true,
        },
    };

    constructor(mode: string) {
        super(mode);

        //@ts-ignore
        this.parser = new PhpParser({
            parser: {
                extractDoc: false,
                suppressErrors: true,
            },
            ast: {
                withPositions: false, //TODO: turn it on, when https://github.com/glayzzle/php-parser/issues/1185 would be fixed
                withSource: false,
            },
            lexer: {
                all_tokens: false,
                comment_tokens: false,
                mode_eval: false,
                asp_tags: false,
                short_tags: true, // allow `<?` if needed
            },
        });
    }

    async doValidation(
        document: lsp.TextDocumentIdentifier,
    ): Promise<lsp.Diagnostic[]> {
        let value = this.getDocumentValue(document.uri);
        if (!value) {
            return [];
        }

        const inline = !!this.getOption(document.uri, "inline");

        try {
            let result: Program;
            if (inline) {
                // parse in eval mode (no need to wrap with <?php ... ?>)
                result = this.parser.parseEval(value);
            } else {
                result = this.parser.parseCode(value, document.uri);
            }
            return filterDiagnostics(
                toDiagnostics(result?.errors ?? []),
                this.optionsToFilterDiagnostics,
            );
        } catch (e: any) {
            console.error(e);
            return [];
        }
    }
}
