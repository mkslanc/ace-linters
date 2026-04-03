/** @typedef {import("eslint-scope").Scope} Scope */
/** @typedef {import("eslint-scope").ScopeManager} ScopeManager */
/** @typedef {any} ASTNode */

import {interpolate} from "./ast-utils";

/**
 * Convert found undeclared variables into ace annotations
 * @param {Scope} scope
 * @param {ScopeManager} scopeManager
 * @return {*[]}
 */
export function getAnnotations(scope, scopeManager) {
    const globalScope = scope;

    if (!globalScope) {
        return [];
    }

    return globalScope.through.map((ref) => {
        const identifier = ref.identifier;
        if (!identifier.loc) {
            return;
        }
        return {
            row: identifier.loc.start.line - 1,
            column: identifier.loc.start.column,
            text: interpolate("'{{name}}' is not defined.", identifier),
            type: "warning"
        };
    }).filter(Boolean);
}
