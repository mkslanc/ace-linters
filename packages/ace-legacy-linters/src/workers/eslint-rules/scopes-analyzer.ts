import {analyze, Scope, ScopeManager} from "eslint-scope";
import * as unusedVars from "./no-unused-vars";
import * as undef from "./no-undef";
import {Ace} from "ace-code";
import globalsData from "globals";

type GlobalSetting = "readonly" | "writable" | "off" | boolean | null;
type EnvName =
    | "amd"
    | "applescript"
    | "atomtest"
    | "browser"
    | "builtin"
    | "commonjs"
    | "couch"
    | "devtools"
    | "embertest"
    | "greasemonkey"
    | "jasmine"
    | "jest"
    | "jquery"
    | "meteor"
    | "mocha"
    | "mongo"
    | "nashorn"
    | "node"
    | "nodeBuiltin"
    | "phantomjs"
    | "protractor"
    | "prototypejs"
    | "qunit"
    | "rhino"
    | "serviceworker"
    | "shared-node-browser"
    | "shelljs"
    | "webextensions"
    | "worker"
    | "wsh"
    | "yui";

interface JsParserOptions {
    ecmaFeatures?: {
        globalReturn?: boolean
        impliedStrict?: boolean
        jsx?: boolean
        experimentalObjectRestSpread?: boolean
    }
    allowImportExportEverywhere?: boolean
    allowAwaitOutsideFunction?: boolean
}

const DEFAULT_GLOBALS: Record<string, GlobalSetting> = {
    ...globalsData.browser,
    ...globalsData.node,
    ...globalsData.amd,
    ...globalsData.mocha,
    ...globalsData.es2015,
    ...globalsData.builtin,
};

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
    /**
     * ECMAScript version to use for scope analysis.
     * @default 2022
     */
    ecmaVersion?: number
    /**
     * Parser options aligned with JavascriptServiceOptions.languageOptions.parserOptions.
     */
    parserOptions?: JsParserOptions
    /**
     * Additional globals to declare.
     */
    globals?: Record<string, GlobalSetting>
    /**
     * Environment globals to enable.
     */
    env?: Partial<Record<EnvName, boolean>>
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
            ignoreEval: true,
            nodejsScope: !!this.options.parserOptions?.ecmaFeatures?.globalReturn,
            impliedStrict: !!this.options.parserOptions?.ecmaFeatures?.impliedStrict,
            ecmaVersion: this.options.ecmaVersion || 2022,
            sourceType: this.options.sourceType === "commonjs" ? "commonjs" : program.sourceType,
            jsx: isJsxEnabled(this.options),
        });

        this.finalize();

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

    finalize() {
        const globalScope = this.scopeManager.scopes[0];
        const globals = resolveGlobalsFromOptions(this.options);

        addDeclaredGlobals(this.scopeManager, globals);
        markExportedVariables(globalScope, {});
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

/**
 * Ensures that variables representing built-in properties of the Global Object,
 * and any globals declared in worker options are present in the global scope.
 * @param {ScopeManager} scopeManager Scope manager.
 * @param {Object|undefined} configGlobals The globals declared in configuration
 * @returns {void}
 */
function addDeclaredGlobals(
    scopeManager: ScopeManager,
    configGlobals: Object | undefined = Object.create(null),
) {
    const finalGlobals = { __proto__: null, ...configGlobals };

    const names = Object.keys(finalGlobals).filter(
        name => finalGlobals[name] !== "off",
    );

    scopeManager.addGlobals(names);

    const globalScope = scopeManager.scopes[0];

    for (const name of names) {
        const variable = globalScope.set.get(name);

        // @ts-ignore
        variable.eslintImplicitGlobalSetting = configGlobals[name];
        // @ts-ignore
        variable.eslintExplicitGlobal = false;
        // @ts-ignore
        variable.eslintExplicitGlobalComments = undefined;
        // @ts-ignore
        variable.writeable = finalGlobals[name] === "writable";
    }
}

function resolveGlobalsFromOptions(options: JsOptions): Record<string, GlobalSetting> {
    const resolvedGlobals: Record<string, GlobalSetting> = {
        ...DEFAULT_GLOBALS,
    };
    const env = {
        ...options.env,
    };

    for (const [envName, enabled] of Object.entries(env)) {
        if (!enabled) {
            continue;
        }

        const globalsForEnv = globalsData[envName as keyof typeof globalsData];

        if (!globalsForEnv || typeof globalsForEnv !== "object") {
            continue;
        }

        Object.assign(resolvedGlobals, globalsForEnv);
    }

    if (options.sourceType === "commonjs") {
        Object.assign(resolvedGlobals, globalsData.commonjs);
    }

    if (options.globals) {
        Object.assign(resolvedGlobals, options.globals);
    }

    return resolvedGlobals;
}

function isJsxEnabled(options: JsOptions) {
    return options.jsx ?? options.parserOptions?.ecmaFeatures?.jsx ?? true;
}

/**
 * Sets the given variable names as exported so they won't be triggered by
 * the `no-unused-vars` rule.
 * @param {Scope} globalScope The global scope to define exports in.
 * @param {Record<string,string>} variables An object whose keys are the variable
 *      names to export.
 * @returns {void}
 */
function markExportedVariables(globalScope: Scope, variables: Record<string, string>) {
    Object.keys(variables).forEach(name => {
        const variable = globalScope.set.get(name);

        if (variable) {
            // @ts-ignore
            variable.eslintUsed = true;
            // @ts-ignore
            variable.eslintExported = true;
        }
    });
}

