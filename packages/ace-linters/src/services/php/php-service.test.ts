import {expect} from "chai";
import {DiagnosticSeverity, TextDocumentIdentifier, TextDocumentItem} from "vscode-languageserver-protocol";
import {PhpService} from "./php-service";

describe("PhpService", () => {
    type SnippetCase = {
        name: string;
        code: string;
        expectedErrors: number;
    };

    function addDocument(service: PhpService, uri: string, text: string): TextDocumentIdentifier {
        const document: TextDocumentItem = {
            uri,
            languageId: "php",
            version: 1,
            text,
        };
        service.addDocument(document);
        return {uri};
    }

    async function runSnippetCases(
        service: PhpService,
        snippets: SnippetCase[],
        testPrefix: string,
        inline = false,
    ) {
        for (let i = 0; i < snippets.length; i++) {
            const testCase = snippets[i];
            const uri = `file:///${testPrefix}-${i}.php`;
            const document = addDocument(service, uri, testCase.code);
            if (inline) {
                service.setOptions(uri, {inline: true});
            }
            const diagnostics = await service.doValidation(document);

            expect(
                diagnostics.length,
                `${testCase.name} should produce ${testCase.expectedErrors} errors`,
            ).to.equal(testCase.expectedErrors);
        }
    }

    it("returns empty diagnostics when document is missing", async () => {
        const service = new PhpService("php");
        const diagnostics = await service.doValidation({uri: "file:///missing.php"});
        expect(diagnostics).to.deep.equal([]);
    });

    it("validates a range of PHP snippets and reports syntax errors", async () => {
        const service = new PhpService("php");
        const snippets: SnippetCase[] = [
            {name: "valid php", code: "<?php echo 'ok';", expectedErrors: 0},
            {name: "missing semicolon at eof", code: "<?php echo 'ok'", expectedErrors: 0},
            {name: "html mixed with php", code: "<div><?php echo 'ok'; ?></div>", expectedErrors: 0},
            {name: "short open tag", code: "<? echo 'ok';", expectedErrors: 0},
            {name: "valid function", code: "<?php function a($x){ return $x + 1; }", expectedErrors: 0},
            {name: "null coalesce expression", code: "<?php $x = $a ?? 'd';", expectedErrors: 0},
            {name: "arrow function expression", code: "<?php $fn = fn($x) => $x + 1;", expectedErrors: 0},
            {name: "typed property", code: "<?php class A { public int $x = 1; }", expectedErrors: 0},
            {name: "match expression", code: "<?php $x = match(1){1 => 'a', default => 'b'};", expectedErrors: 0},
            {name: "numeric separator", code: "<?php $n = 1_000_000;", expectedErrors: 0},
            {name: "trait usage", code: "<?php trait T { function a(){} } class C { use T; }", expectedErrors: 0},
            {name: "declare strict types", code: "<?php declare(strict_types=1);", expectedErrors: 0},
            {name: "html and php blocks", code: "<h1>x</h1><?php echo 1; ?><p>y</p>", expectedErrors: 0},
            {name: "missing operand", code: "<?php $a = 1 + ;", expectedErrors: 1},
            {name: "double operator missing rhs", code: "<?php $a = 1 ** ;", expectedErrors: 1},
            {name: "bad assignment expression", code: "<?php $a = = 1;", expectedErrors: 2},
            {name: "unexpected comma in function call", code: "<?php foo(,1);", expectedErrors: 5},
            {name: "missing closing bracket", code: "<?php $a = [1,2;", expectedErrors: 1},
            {name: "missing endif in alternative syntax", code: "<?php if ($a): echo 1;", expectedErrors: 1},
            {name: "missing parenthesis in if", code: "<?php if (($a > 1) { echo 1; }", expectedErrors: 1},
            {name: "broken class method declaration", code: "<?php class A { public function x( { }", expectedErrors: 4},
            {name: "invalid namespace token", code: "<?php namespace 123\\Bad;", expectedErrors: 3},
            {name: "invalid foreach expression", code: "<?php foreach ($arr as => $v) { }", expectedErrors: 1},
            {name: "invalid ternary expression", code: "<?php $x = $a ? : ;", expectedErrors: 1},
            {name: "mismatched braces", code: "<?php function test() { if (true) { echo 1; }", expectedErrors: 1},
            {name: "switch without closing brace", code: "<?php switch($x){ case 1: echo 1;", expectedErrors: 1},
            {name: "unterminated string", code: "<?php echo \"broken;", expectedErrors: 1},
            {name: "include without semicolon at eof", code: "<?php include 'a.php'", expectedErrors: 0},
            {name: "missing array value currently tolerated", code: "<?php $a = [1, , 3];", expectedErrors: 0},
            {name: "unterminated comment currently tolerated", code: "<?php /* aaa", expectedErrors: 0},
        ];
        await runSnippetCases(service, snippets, "snippet");
    });

    it("validates inline snippets in eval mode across valid and invalid expressions", async () => {
        const service = new PhpService("php");
        const inlineSnippets: SnippetCase[] = [
            {name: "inline valid echo", code: "echo 1 + 2;", expectedErrors: 0},
            {name: "inline valid array literal", code: "$a = [1,2,3];", expectedErrors: 0},
            {name: "inline valid closure", code: "$f = function($x){ return $x; };", expectedErrors: 0},
            {name: "inline invalid operand", code: "echo (1 + );", expectedErrors: 2},
            {name: "inline invalid ternary", code: "$x = $a ? : ;", expectedErrors: 1},
            {name: "inline invalid foreach", code: "foreach ($arr as => $v) { }", expectedErrors: 1},
            {name: "inline broken function signature", code: "function a( { return 1; }", expectedErrors: 3},
            {name: "inline broken match expression", code: "$x = match(1){1 =>, default => 'b'};", expectedErrors: 9},
            {name: "inline unterminated string", code: "echo \"abc;", expectedErrors: 1},
            {name: "inline invalid static call", code: "A::();", expectedErrors: 3},
        ];
        await runSnippetCases(service, inlineSnippets, "inline-snippet", true);
    });

    it("produces parser diagnostics with expected metadata", async () => {
        const service = new PhpService("php");
        const document = addDocument(
            service,
            "file:///metadata.php",
            "<?php function test() { if (true) { echo 1; }",
        );

        const diagnostics = await service.doValidation(document);
        expect(diagnostics).to.have.lengthOf(1);
        expect(diagnostics[0].message).to.contain("expecting '}'");
        expect(diagnostics[0].source).to.equal("php-parser");
        expect(diagnostics[0].severity).to.equal(DiagnosticSeverity.Error);
        expect(diagnostics[0].range.start.line).to.equal(0);
    });

    it("uses inline mode when inline option is enabled", async () => {
        const service = new PhpService("php");
        const uri = "file:///inline.php";
        const parser = (service as any).parser;

        let parseEvalCalls = 0;
        let parseCodeCalls = 0;
        const originalParseEval = parser.parseEval;
        const originalParseCode = parser.parseCode;

        parser.parseEval = () => {
            parseEvalCalls += 1;
            return {errors: []};
        };
        parser.parseCode = () => {
            parseCodeCalls += 1;
            return {errors: []};
        };

        try {
            addDocument(service, uri, "echo (1 + );");
            service.setOptions(uri, {inline: true});
            await service.doValidation({uri});
        } finally {
            parser.parseEval = originalParseEval;
            parser.parseCode = originalParseCode;
        }

        expect(parseEvalCalls).to.equal(1);
        expect(parseCodeCalls).to.equal(0);
    });

    it("supports inline parsing for snippets without php tags", async () => {
        const service = new PhpService("php");
        const uri = "file:///inline-errors.php";
        addDocument(service, uri, "echo (1 + );");
        service.setOptions(uri, {inline: true});

        const diagnostics = await service.doValidation({uri});
        expect(diagnostics.length).to.be.greaterThan(0);
        expect(diagnostics[0].message).to.contain("unexpected ')'");
    });

    it("filters diagnostics by message regex options", async () => {
        const service = new PhpService("php");
        const uri = "file:///filter-ignore.php";
        addDocument(service, uri, "<?php function test() { if (true) { echo 1; }");
        service.setGlobalOptions({
            errorMessagesToIgnore: [/expecting '\}'/],
        });

        const diagnostics = await service.doValidation({uri});
        expect(diagnostics).to.deep.equal([]);
    });

    it("downgrades matching diagnostics to warning severity", async () => {
        const service = new PhpService("php");
        const uri = "file:///filter-warning.php";
        addDocument(service, uri, "<?php function test() { if (true) { echo 1; }");
        service.setGlobalOptions({
            errorMessagesToTreatAsWarning: [/expecting '\}'/],
        });

        const diagnostics = await service.doValidation({uri});
        expect(diagnostics).to.have.lengthOf(1);
        expect(diagnostics[0].severity).to.equal(DiagnosticSeverity.Warning);
    });

    it("returns empty diagnostics if parser throws unexpectedly", async () => {
        const service = new PhpService("php");
        const uri = "file:///throw.php";
        addDocument(service, uri, "<?php echo 'ok';");

        const parser = (service as any).parser;
        const originalParseCode = parser.parseCode;
        const originalConsoleError = console.error;
        let consoleErrorCalls = 0;
        parser.parseCode = () => {
            throw new Error("parser exploded");
        };
        console.error = () => {
            consoleErrorCalls += 1;
        };

        try {
            const diagnostics = await service.doValidation({uri});
            expect(diagnostics).to.deep.equal([]);
            expect(consoleErrorCalls).to.equal(1);
        } finally {
            parser.parseCode = originalParseCode;
            console.error = originalConsoleError;
        }
    });
});
