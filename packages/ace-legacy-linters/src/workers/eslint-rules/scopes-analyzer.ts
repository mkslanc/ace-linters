import {analyze, ScopeManager} from "eslint-scope";
import * as unusedVars from "./no-unused-vars";
import * as undef from "./no-undef";
import {Ace} from "ace-code";

export interface JsOptions {
    /**
     * Rule to disallow unused variables.
     * @default true
     */
    "no-unused-vars"?: boolean
    /**
     * Rule to disallow the use of undeclared variables
     * @default true
     */
    "no-undef"?: boolean
    /**
     * Indicate the mode the code should be parsed in. Can be one of "script", "commonjs", "module", or "unambiguous".
     * "unambiguous" will make @babel/parser attempt to guess, based on the presence of ES6 import or export statements.
     * Files with ES6 imports and exports are considered "module" and are otherwise "script".
     *
     * Use "commonjs" to parse code that is intended to be run in a CommonJS environment such as Node.js.
     * @default "unambiguous"
     */
    sourceType?: "script" | "commonjs" | "module" | "unambiguous",
    /**
     * to parse jsx or not
     * @default true
     */
    jsx?: boolean
}

export class ScopesAnalyzer {
    private options: JsOptions;
    scopeManager: ScopeManager;

    constructor(options: JsOptions) {
        this.options = options;
    }

    setOptions(options: JsOptions) {
        this.options = options;
    }

    analyze(program: any) {
        attachParents(program);
        var annotations: Ace.Annotation[] = [];

        this.scopeManager = analyze(program, {
            ecmaVersion: 2024,
            sourceType: program.sourceType,
            jsx: this.options.jsx,
        });
        var scope = this.getScope(this.scopeManager.scopes[0]);
        if (this.options["no-unused-vars"]) {
            if (this.scopeManager.scopes && this.scopeManager.scopes.length > 0) {
                annotations = [...annotations, ...unusedVars.getAnnotations(scope, this.scopeManager)];
            }
        }
        if (this.options["no-undef"]) {
            if (this.scopeManager.scopes && this.scopeManager.scopes.length > 0) {
                annotations = [...annotations, ...undef.getAnnotations(scope, this.scopeManager)];
            }
        }

        return annotations;
    }

    private getScope(currentNode) {
        if (!currentNode) {
            throw new TypeError("Missing required argument: node.");
        }
        const inner = currentNode.type !== "Program";

        for (let node = currentNode; node; node = node.parent) {
            const scope = this.scopeManager.acquire(node, inner);

            if (scope) {
                if (scope.type === "function-expression-name") {
                    return scope.childScopes[0];
                }

                return scope;
            }
        }

        return this.scopeManager.scopes[0];
    }

}

function attachParents(node: any, parent: any = null): void {
    if (!node || typeof node !== "object") {
        return;
    }

    Object.defineProperty(node, "parent", {
        value: parent,
        writable: true,
        configurable: true,
        enumerable: false,
    });

    for (const key of Object.keys(node)) {
        if (key === "parent") {
            continue;
        }

        const value = node[key];

        if (Array.isArray(value)) {
            for (const child of value) {
                if (child && typeof child === "object" && typeof child.type === "string") {
                    attachParents(child, node);
                }
            }
        } else if (value && typeof value === "object" && typeof value.type === "string") {
            attachParents(value, node);
        }
    }
}
