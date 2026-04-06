import {Mirror} from "../mirror";
import {Ace} from "ace-code";
import {DocumentCstNode, parse} from "@xml-tools/parser";
import {buildAst} from "@xml-tools/ast";
import {checkConstraints} from "@xml-tools/constraints";
import {AttributeValidator, ElementValidator, validate} from "@xml-tools/validation";
import {namespaceValidator} from "ace-linters/src/services/xml/validators";
import {MinDocument} from "../min-document";

export class XmlWorker extends Mirror {
    parser;

    constructor(sender) {
        super(sender);

        this.setTimeout(500);
    }

    onUpdate() {
        var value = this.doc.getValue();
        var errors: Ace.Annotation[] = [];

        if (!/^\s*$/s.test(value)) {
            try {
                const {cst, tokenVector, lexErrors, parseErrors} = parse(
                    value
                );
                const xmlDoc = buildAst(cst as DocumentCstNode, tokenVector);
                const constraintsIssues = checkConstraints(xmlDoc as any);

                const elementValidators: ElementValidator[] = [namespaceValidator];
                const attributeValidators: AttributeValidator[] = [];

                const customIssues = validate({
                    doc: xmlDoc,
                    validators: {
                        element: elementValidators,
                        attribute: attributeValidators,
                    },
                });

                errors = [
                    ...lexingErrorsToDiagnostic(
                        lexErrors,
                        this.doc,
                    ),
                    ...parsingErrorsToDiagnostic(
                        parseErrors,
                        this.doc,
                    ),
                    ...issuesToDiagnostic(
                        constraintsIssues,
                        this.doc,
                    ),
                    ...issuesToDiagnostic(
                        customIssues,
                        this.doc,
                    ),
                ];
            } catch (e) {
                console.error(e);
            }
        }

        this.sender.emit("error", errors);
    }
}

export function lexingErrorsToDiagnostic(errors: any[], document: MinDocument): Ace.Annotation[] {
    return errors.map((el) => {
        var position = document.indexToPosition(el.offset);

        return {
            text: el.message,
            row: position.row,
            column: position.column,
            type: el.severity ?? "error",
        };
    });
}

export function parsingErrorsToDiagnostic(errors: any[], document: MinDocument): Ace.Annotation[] {
    return errors.map((el) => {
        var position = document.indexToPosition(el.token.startOffset);
        return {
            text: el.message,
            row: position.row,
            column: position.column,
            type: el.severity ?? "error",
        };
    });
}

export function issuesToDiagnostic(errors: any[], document: MinDocument): Ace.Annotation[] {
    return errors.map((el) => {
        var position = document.indexToPosition(el.position.startOffset);

        return {
            text: el.msg,
            row: position.row,
            column: position.column,
            type: el.severity ?? "error",
        };
    });
}