import {expect} from "chai";
import {DiagnosticSeverity, TextDocumentItem} from "vscode-languageserver-protocol";
import {XmlService} from "./xml-service";

describe("XmlService", () => {
    function addXmlDocument(service: XmlService, uri: string, text: string) {
        const document: TextDocumentItem = {
            uri,
            languageId: "xml",
            version: 1,
            text,
        };
        service.addDocument(document);
        return {uri};
    }

    function namespaceDiagnostics(diagnostics: any[]) {
        return diagnostics.filter((d) => d.message.includes("Namespace prefix"));
    }

    it("returns empty diagnostics when document is missing", async () => {
        const service = new XmlService("xml");
        const diagnostics = await service.doValidation({uri: "file:///missing.xml"});
        expect(diagnostics).to.deep.equal([]);
    });

    it("reports missing namespace prefix for element namespaced tag", async () => {
        const service = new XmlService("xml");
        const document = addXmlDocument(service, "file:///missing-prefix.xml", "<abc:root/>");
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(1);
        expect(nsDiagnostics[0].message).to.equal("Namespace prefix 'abc' is not declared");
        expect(nsDiagnostics[0].severity).to.equal(DiagnosticSeverity.Error);
    });

    it("does not report missing namespace when prefix is declared", async () => {
        const service = new XmlService("xml");
        const document = addXmlDocument(
            service,
            "file:///declared-prefix.xml",
            '<abc:root xmlns:abc="urn:test"><abc:child/></abc:root>',
        );
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(0);
    });

    it("does not report missing namespace for built-in xml prefix", async () => {
        const service = new XmlService("xml");
        const document = addXmlDocument(service, "file:///xml-prefix.xml", "<xml:root/>");
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(0);
    });

    it("reports missing namespace prefix for nested element and not for declared sibling", async () => {
        const service = new XmlService("xml");
        const document = addXmlDocument(
            service,
            "file:///nested-prefix.xml",
            '<root xmlns:ok="urn:ok"><ok:child/><bad:child/></root>',
        );
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(1);
        expect(nsDiagnostics[0].message).to.equal("Namespace prefix 'bad' is not declared");
    });

    it("can downgrade missing-namespace diagnostics to warning", async () => {
        const service = new XmlService("xml");
        const uri = "file:///warning-prefix.xml";
        service.setGlobalOptions({
            errorMessagesToTreatAsWarning: [/Namespace prefix '.*' is not declared/],
        });
        const document = addXmlDocument(service, uri, "<missing:root/>");
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(1);
        expect(nsDiagnostics[0].severity).to.equal(DiagnosticSeverity.Warning);
    });

    it("can ignore missing-namespace diagnostics by message filter", async () => {
        const service = new XmlService("xml");
        const uri = "file:///ignored-prefix.xml";
        service.setGlobalOptions({
            errorMessagesToIgnore: [/Namespace prefix '.*' is not declared/],
        });
        const document = addXmlDocument(service, uri, "<missing:root/>");
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(0);
    });

    it("shouldn't break with empty or consistent only from whitespaces document", async () => {
        const service = new XmlService("xml");
        const uri = "file:///whitespaces.xml";
        const document = addXmlDocument(service, uri, "                         \n\n         ");
        const diagnostics = await service.doValidation(document);
        const nsDiagnostics = namespaceDiagnostics(diagnostics);

        expect(nsDiagnostics).to.have.lengthOf(0);
    });
});
