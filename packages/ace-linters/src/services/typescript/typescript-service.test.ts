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

    function addUnusedDocument(service: TypescriptService): TextDocumentIdentifier {
        return addDocument(
            service,
            "file:///unused.ts",
            [
                "export function greet(name: string, unusedParameter: string) {",
                "    const unusedLocal = 1;",
                "    return name;",
                "}",
            ].join("\n"),
        );
    }

    function diagnosticFor(diagnostics: any[], name: string) {
        const diagnostic = diagnostics.find((item) => item.message.includes(`'${name}'`));
        expect(diagnostic, `diagnostic for ${name}`).to.not.equal(undefined);
        return diagnostic;
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

    it("returns unused locals and parameters as hidden tagged suggestions by default", async () => {
        const service = new TypescriptService("typescript");
        const document = addUnusedDocument(service);

        const diagnostics = await service.doValidation(document);
        const unusedParameter = diagnosticFor(diagnostics, "unusedParameter");
        const unusedLocal = diagnosticFor(diagnostics, "unusedLocal");

        expect(unusedParameter.data?.ignore).to.equal(true);
        expect(unusedLocal.data?.ignore).to.equal(true);
        expect(unusedParameter.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
        expect(unusedLocal.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
    });

    it("reports unused locals as visible diagnostics when noUnusedLocals is enabled", async () => {
        const service = new TypescriptService("typescript");
        service.setGlobalOptions({compilerOptions: {noUnusedLocals: true}});
        const document = addUnusedDocument(service);

        const diagnostics = await service.doValidation(document);
        const unusedParameter = diagnosticFor(diagnostics, "unusedParameter");
        const unusedLocal = diagnosticFor(diagnostics, "unusedLocal");

        expect(unusedLocal.data?.ignore).to.equal(undefined);
        expect(unusedParameter.data?.ignore).to.equal(true);
        expect(unusedLocal.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
        expect(unusedParameter.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
    });

    it("reports unused parameters as visible diagnostics when noUnusedParameters is enabled", async () => {
        const service = new TypescriptService("typescript");
        service.setGlobalOptions({compilerOptions: {noUnusedParameters: true}});
        const document = addUnusedDocument(service);

        const diagnostics = await service.doValidation(document);
        const unusedParameter = diagnosticFor(diagnostics, "unusedParameter");
        const unusedLocal = diagnosticFor(diagnostics, "unusedLocal");

        expect(unusedParameter.data?.ignore).to.equal(undefined);
        expect(unusedLocal.data?.ignore).to.equal(true);
        expect(unusedParameter.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
        expect(unusedLocal.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
    });

    it("reports both unused locals and parameters as visible diagnostics when both noUnused options are enabled", async () => {
        const service = new TypescriptService("typescript");
        service.setGlobalOptions({compilerOptions: {noUnusedLocals: true, noUnusedParameters: true}});
        const document = addUnusedDocument(service);

        const diagnostics = await service.doValidation(document);
        const unusedParameter = diagnosticFor(diagnostics, "unusedParameter");
        const unusedLocal = diagnosticFor(diagnostics, "unusedLocal");

        expect(unusedParameter.data?.ignore).to.equal(undefined);
        expect(unusedLocal.data?.ignore).to.equal(undefined);
        expect(unusedParameter.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
        expect(unusedLocal.tags?.includes(DiagnosticTag.Unnecessary)).to.equal(true);
    });

    it("returns deprecated usages as hidden tagged suggestions", async () => {
        const service = new TypescriptService("typescript");
        const document = addDocument(
            service,
            "file:///deprecated.ts",
            [
                "/** @deprecated use replacement instead */",
                "export function legacy() {}",
                "legacy();",
            ].join("\n"),
        );

        const diagnostics = await service.doValidation(document);
        const deprecated = diagnostics.find((diagnostic) => diagnostic.tags?.includes(DiagnosticTag.Deprecated));

        expect(deprecated).to.not.equal(undefined);
        expect(deprecated!.data?.ignore).to.equal(true);
    });
});
