import {analyze, ScopeManager} from "eslint-scope";
import {getAnnotations} from "./no-unused-vars";
import {Ace} from "ace-code";

export interface JsOptions {
    /**
     * @default true
     */
    "no-unused-vars"?: boolean
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
            sourceType: "module"
        });
        if (this.options["no-unused-vars"]) {
            if (this.scopeManager.scopes && this.scopeManager.scopes.length > 0) {
                var scope = this.getScope(this.scopeManager.scopes[0]);
                annotations = [...getAnnotations(scope, this.scopeManager)];
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

    node.parent = parent;

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

