import {expect} from "chai";
import {DiagnosticTag, TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {TypescriptService} from "./typescript-service";

describe("TypescriptService", () => {
    function addDocument(service: TypescriptService, uri: string, text: string, languageId = "typescript"): TextDocumentIdentifier {
        const document: TextDocumentItem = {
            uri,
            languageId,
            version: 1,
            text,
        };
        service.addDocument(document);
        return {uri};
    }

    it("returns semantic tokens for TypeScript identifiers", async () => {
        const service = new TypescriptService("typescript");
        const uri = "file:///semantic-tokens.ts";
        const text = [
            "class Widget {",
            "    render(count: number) {",
            "        const label = count.toString();",
            "        return label;",
            "    }",
            "}",
        ].join("\n");
        const document = addDocument(service, uri, text);

        const tokens = await service.getSemanticTokens(document, {
            start: {line: 0, character: 0},
            end: {line: 5, character: 1},
        });

        expect(tokens).to.not.equal(null);
        expect(tokens!.data.length).to.be.greaterThan(0);
        expect(tokens!.data.length % 5).to.equal(0);

        const tokenTypeIndexes = new Set<number>();
        for (let i = 3; i < tokens!.data.length; i += 5) {
            tokenTypeIndexes.add(tokens!.data[i]);
        }

        const legend = service.serviceCapabilities.semanticTokensProvider!.legend;
        expect(tokenTypeIndexes.has(legend.tokenTypes.indexOf("class"))).to.equal(true);
        expect(tokenTypeIndexes.has(legend.tokenTypes.indexOf("method"))).to.equal(true);
        expect(tokenTypeIndexes.has(legend.tokenTypes.indexOf("parameter"))).to.equal(true);
        expect(tokenTypeIndexes.has(legend.tokenTypes.indexOf("variable"))).to.equal(true);
    });

    it("reports unused locals and parameters by default", async () => {
        const service = new TypescriptService("typescript");
        const document = addDocument(
            service,
            "file:///unused.ts",
            [
                "export function greet(name: string, unusedParameter: string) {",
                "    const unusedLocal = 1;",
                "    return name;",
                "}",
            ].join("\n"),
        );

        const diagnostics = await service.doValidation(document);
        const messages = diagnostics.map((diagnostic) => diagnostic.message);

        expect(messages.some((message) => message.includes("'unusedParameter' is declared but its value is never read"))).to.equal(true);
        expect(messages.some((message) => message.includes("'unusedLocal' is declared but its value is never read"))).to.equal(true);
        expect(diagnostics.every((diagnostic) => !diagnostic.data?.ignore)).to.equal(true);
        expect(diagnostics.every((diagnostic) => diagnostic.tags?.includes(DiagnosticTag.Unnecessary))).to.equal(true);
    });
});
