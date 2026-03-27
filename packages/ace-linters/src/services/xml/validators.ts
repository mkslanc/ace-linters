import {ValidationIssue} from "@xml-tools/validation";

export function namespaceValidator(element): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    const declared = element.namespaces ?? {};

    function checkPrefix(prefix: string, node) {
        if (!prefix) return;
        if (prefix === "xml") return;

        if (!declared[prefix]) {
            issues.push({
                msg: `Namespace prefix '${prefix}' is not declared`,
                node,
                position: node.position,
                severity: "error",
            });
        }
    }

    if (element.ns) {
        checkPrefix(element.ns, element);
    }

    return issues;
}