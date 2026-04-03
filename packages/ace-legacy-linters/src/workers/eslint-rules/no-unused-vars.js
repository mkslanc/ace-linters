/** @typedef {import("eslint-scope").Variable} Variable */
/** @typedef {import("eslint-scope").Reference} Reference */
/** @typedef {import("eslint-scope").Scope} Scope */
/** @typedef {import("eslint-scope").ScopeManager} ScopeManager */
/** @typedef {any} ASTNode */
import * as astUtils from "./ast-utils";

const STATEMENT_TYPE = /(?:Statement|Declaration)$/u;

/**
 * Gets an array of variables without read references.
 * @param {Scope} scope an eslint-scope Scope object.
 * @param {Variable[]} unusedVars an array that saving result.
 * @param {ScopeManager} scopeManager
 * @returns {Variable[]} unused variables of the scope and descendant scopes.
 * @private
 */
function collectUnusedVariables(scope, unusedVars, scopeManager) {
    const variables = scope.variables;
    const childScopes = scope.childScopes;
    let i, l;

    // if (scope.type !== "global" || config.vars === "all") {
    for (i = 0, l = variables.length; i < l; ++i) {
        const variable = variables[i];

        // skip a variable of class itself name in the class scope
        //@ts-expect-error
        if (scope.type === "class" && scope.block.id === variable.identifiers[0]) {
            continue;
        }

        // skip function expression names
        if (scope.functionExpressionScope) {
            continue;
        }

        // skip implicit "arguments" variable
        if (scope.type === "function" && variable.name === "arguments" && variable.identifiers.length === 0) {
            continue;
        }

        // explicit global variables don't have definitions.
        const def = variable.defs[0];

        if (def) {
            const type = def.type;

            if (type === "Parameter") {
                // skip any setter argument
                //@ts-expect-error
                if ((def.node.parent.type === "Property" || def.node.parent.type === "MethodDefinition") && def.node.parent.kind === "set") {
                    continue;
                }

                // if "args" option is "after-used", skip used variables
                //@ts-expect-error
                if (astUtils.isFunction(def.name.parent) && !isAfterLastUsedArg(variable, scopeManager)) {
                    continue;
                }
            }
        }

        if (!isUsedVariable(variable) && !isExported(variable) && !hasRestSpreadSibling(variable)) {
            unusedVars.push(variable);
        }
    }
    // }

    for (i = 0, l = childScopes.length; i < l; ++i) {
        collectUnusedVariables(childScopes[i], unusedVars, scopeManager);
    }

    return unusedVars;
}

/**
 * Checks whether the given variable is after the last used parameter.
 * @param {Variable} variable The variable to check.
 * @param {ScopeManager} scopeManager
 * @returns {boolean} `true` if the variable is defined after the last
 * used parameter.
 */
function isAfterLastUsedArg(variable, scopeManager) {
    const def = variable.defs[0];
    const params = scopeManager.getDeclaredVariables(def.node);
    const posteriorParams = params.slice(params.indexOf(variable) + 1);

    // If any used parameters occur after this parameter, do not report.
    return !posteriorParams.some(v => v.references.length > 0 /*|| v.eslintUsed*/);
}

/**
 * Determines if the variable is used.
 * @param {Variable} variable The variable to check.
 * @returns {boolean} True if the variable is used
 * @private
 */
function isUsedVariable(variable) {
    const functionNodes = getFunctionDefinitions(variable);
    const isFunctionDefinition = functionNodes.length > 0;

    let rhsNode = null;

    return variable.references.some(ref => {
        if (isForInOfRef(ref)) {
            return true;
        }

        const forItself = isReadForItself(ref, rhsNode);

        rhsNode = getRhsNode(ref, rhsNode);

        return (isReadRef(ref) && !forItself && !(isFunctionDefinition && isSelfReference(ref, functionNodes)));
    });
}

/**
 * Gets a list of function definitions for a specified variable.
 * @param {Variable} variable eslint-scope variable object.
 * @returns {ASTNode[]} Function nodes.
 * @private
 */
function getFunctionDefinitions(variable) {
    const functionDefinitions = [];

    variable.defs.forEach(def => {
        const {
            type,
            node
        } = def;

        // FunctionDeclarations
        if (type === "FunctionName") {
            functionDefinitions.push(node);
        }

        // FunctionExpressions
        if (type === "Variable" && node.init && (node.init.type === "FunctionExpression" || node.init.type
            === "ArrowFunctionExpression")) {
            functionDefinitions.push(node.init);
        }
    });
    return functionDefinitions;
}

/**
 * Determine if an identifier is used either in for-in or for-of loops.
 * @param {Reference} ref The reference to check.
 * @returns {boolean} whether reference is used in the for-in loops
 * @private
 */
function isForInOfRef(ref) {
    //@ts-expect-error
    let target = ref.identifier.parent;

    // "for (var ...) { return; }"
    if (target.type === "VariableDeclarator") {
        target = target.parent.parent;
    }

    if (target.type !== "ForInStatement" && target.type !== "ForOfStatement") {
        return false;
    }

    // "for (...) { return; }"
    if (target.body.type === "BlockStatement") {
        target = target.body.body[0];

        // "for (...) return;"
    }
    else {
        target = target.body;
    }

    // For empty loop body
    if (!target) {
        return false;
    }

    return target.type === "ReturnStatement";
}

/**
 * Checks whether a given reference is a read to update itself or not.
 * @param {Reference} ref A reference to check.
 * @param {ASTNode} rhsNode The RHS node of the previous assignment.
 * @returns {boolean} The reference is a read to update itself.
 * @private
 */
function isReadForItself(ref, rhsNode) {
    const id = ref.identifier;
    //@ts-expect-error
    const parent = id.parent;

    return (ref.isRead() && // self update. e.g. `a += 1`, `a++`
        ((parent.type === "AssignmentExpression" && parent.left === id && isUnusedExpression(parent)
                && !astUtils.isLogicalAssignmentOperator(parent.operator)) || (parent.type === "UpdateExpression"
                && isUnusedExpression(parent)) || // in RHS of an assignment for itself. e.g. `a = a + 1`
            (rhsNode && isInside(id, rhsNode) && !isInsideOfStorableFunction(id, rhsNode))));
}

/**
 * If a given reference is left-hand side of an assignment, this gets
 * the right-hand side node of the assignment.
 *
 * In the following cases, this returns null.
 *
 * - The reference is not the LHS of an assignment expression.
 * - The reference is inside of a loop.
 * - The reference is inside of a function scope which is different from
 *   the declaration.
 * @param {Reference} ref A reference to check.
 * @param {ASTNode} prevRhsNode The previous RHS node.
 * @returns {ASTNode|null} The RHS node or null.
 * @private
 */
function getRhsNode(ref, prevRhsNode) {
    const id = ref.identifier;
    //@ts-expect-error
    const parent = id.parent;
    const refScope = ref.from.variableScope;
    //@ts-expect-error
    const varScope = ref.resolved.scope.variableScope;
    const canBeUsedLater = refScope !== varScope || astUtils.isInLoop(id);

    /*
     * Inherits the previous node if this reference is in the node.
     * This is for `a = a + a`-like code.
     */
    if (prevRhsNode && isInside(id, prevRhsNode)) {
        return prevRhsNode;
    }

    if (parent.type === "AssignmentExpression" && isUnusedExpression(parent) && id === parent.left && !canBeUsedLater) {
        return parent.right;
    }
    return null;
}

/**
 * Determines if a reference is a read operation.
 * @param {Reference} ref An eslint-scope Reference
 * @returns {boolean} whether the given reference represents a read operation
 * @private
 */
function isReadRef(ref) {
    return ref.isRead();
}

/**
 * Determine if an identifier is referencing an enclosing function name.
 * @param {Reference} ref The reference to check.
 * @param {ASTNode[]} nodes The candidate function nodes.
 * @returns {boolean} True if it's a self-reference, false if not.
 * @private
 */
function isSelfReference(ref, nodes) {
    let scope = ref.from;

    while (scope) {
        if (nodes.includes(scope.block)) {
            return true;
        }
        //@ts-expect-error
        scope = scope.upper;
    }

    return false;
}

/**
 * Checks whether a given node is unused expression or not.
 * @param {ASTNode} node The node itself
 * @returns {boolean} The node is an unused expression.
 * @private
 */
function isUnusedExpression(node) {
    const parent = node.parent;

    if (parent.type === "ExpressionStatement") {
        return true;
    }

    if (parent.type === "SequenceExpression") {
        const isLastExpression = parent.expressions.at(-1) === node;

        if (!isLastExpression) {
            return true;
        }
        return isUnusedExpression(parent);
    }

    return false;
}

/**
 * Checks the position of given nodes.
 * @param {ASTNode} inner A node which is expected as inside.
 * @param {ASTNode} outer A node which is expected as outside.
 * @returns {boolean} `true` if the `inner` node exists in the `outer` node.
 * @private
 */
function isInside(inner, outer) {
    return (inner.range[0] >= outer.range[0] && inner.range[1] <= outer.range[1]);
}

/**
 * Checks whether a given Identifier node exists inside of a function node which can be used later.
 *
 * "can be used later" means:
 * - the function is assigned to a variable.
 * - the function is bound to a property and the object can be used later.
 * - the function is bound as an argument of a function call.
 *
 * If a reference exists in a function which can be used later, the reference is read when the function is called.
 * @param {ASTNode} id An Identifier node to check.
 * @param {ASTNode} rhsNode The RHS node of the previous assignment.
 * @returns {boolean | null} `true` if the `id` node exists inside of a function node which can be used later.
 * @private
 */
function isInsideOfStorableFunction(id, rhsNode) {
    const funcNode = astUtils.getUpperFunction(id);

    return (funcNode && isInside(funcNode, rhsNode) && isStorableFunction(funcNode, rhsNode));
}

/**
 * Checks whether a given function node is stored to somewhere or not.
 * If the function node is stored, the function can be used later.
 * @param {ASTNode} funcNode A function node to check.
 * @param {ASTNode} rhsNode The RHS node of the previous assignment.
 * @returns {boolean} `true` if under the following conditions:
 *      - the funcNode is assigned to a variable.
 *      - the funcNode is bound as an argument of a function call.
 *      - the function is bound to a property and the object satisfies above conditions.
 * @private
 */
function isStorableFunction(funcNode, rhsNode) {
    let node = funcNode;
    let parent = funcNode.parent;

    while (parent && isInside(parent, rhsNode)) {
        switch (parent.type) {
            case "SequenceExpression":
                if (parent.expressions.at(-1) !== node) {
                    return false;
                }
                break;

            case "CallExpression":
            case "NewExpression":
                return parent.callee !== node;

            case "AssignmentExpression":
            case "TaggedTemplateExpression":
            case "YieldExpression":
                return true;

            default:
                if (STATEMENT_TYPE.test(parent.type)) {
                    /*
                     * If it encountered statements, this is a complex pattern.
                     * Since analyzing complex patterns is hard, this returns `true` to avoid false positive.
                     */
                    return true;
                }
        }

        node = parent;
        parent = parent.parent;
    }

    return false;
}

/**
 * Determines if a given variable is being exported from a module.
 * @param {Variable} variable eslint-scope variable object.
 * @returns {boolean} True if the variable is exported, false if not.
 * @private
 */
function isExported(variable) {
    const definition = variable.defs[0];

    if (definition) {
        let node = definition.node;

        if (node.type === "VariableDeclarator") {
            //@ts-expect-error
            node = node.parent;
        }
        else if (definition.type === "Parameter") {
            return false;
        }
        //@ts-expect-error
        return node.parent.type.indexOf("Export") === 0;
    }
    return false;
}

/**
 * Determines if a variable has a sibling rest property
 * @param {Variable} variable eslint-scope variable object.
 * @returns {boolean} True if the variable has a sibling rest property, false if not.
 * @private
 */
function hasRestSpreadSibling(variable) {
    return false;
}

/**
 * Generate the warning message about the variable being
 * assigned and unused, including the ignore pattern if configured.
 * @param {Variable} unusedVar eslint-scope variable object.
 * @returns {any} The message data to be used with this unused variable.
 */
function getAssignedMessageData(unusedVar) {
    const def = unusedVar.defs && unusedVar.defs[0];
    let additionalMessageData = "";

    if (def) {
        const [variableDescription, pattern] = getVariableDescription(defToVariableType(def));

        if (pattern && variableDescription) {
            additionalMessageData = `. Allowed unused ${variableDescription} must match ${pattern}`;
        }
    }

    return {
        varName: unusedVar.name,
        action: "assigned a value",
        additional: additionalMessageData
    };
}

/**
 * Gets a given variable's description and configured ignore pattern
 * based on the provided variableType
 * @param {any} variableType a simple name for the types of variables that this rule supports
 * @throws {Error} (Unreachable)
 * @returns {[string | undefined, string | undefined]} the given variable's description and
 * ignore pattern
 */
function getVariableDescription(variableType) {
    let pattern;
    let variableDescription;

    switch (variableType) {
        case "array-destructure":
            variableDescription = "elements of array destructuring";
            break;

        case "catch-clause":
            variableDescription = "caught errors";
            break;

        case "parameter":
            variableDescription = "args";
            break;

        case "variable":
            variableDescription = "vars";
            break;

        default:
            throw new Error(`Unexpected variable type: ${variableType}`);
    }

    return [variableDescription, pattern];
}

/**
 * Determines what variable type a def is.
 * @param  {Object} def the declaration to check
 * @returns {any} a simple name for the types of variables that this rule supports
 */
function defToVariableType(def) {
    switch (def.type) {
        case "CatchClause":
            return "catch-clause";
        case "Parameter":
            return "parameter";

        default:
            return "variable";
    }
}

/**
 * Generates the message data about the variable being defined and unused,
 * including the ignore pattern if configured.
 * @param {Variable} unusedVar eslint-scope variable object.
 * @returns {any} The message data to be used with this unused variable.
 */
function getDefinedMessageData(unusedVar) {
    const def = unusedVar.defs && unusedVar.defs[0];
    let additionalMessageData = "";

    if (def) {
        const [variableDescription, pattern] = getVariableDescription(defToVariableType(def));

        if (pattern && variableDescription) {
            additionalMessageData = `. Allowed unused ${variableDescription} must match ${pattern}`;
        }
    }

    return {
        varName: unusedVar.name,
        action: "defined",
        additional: additionalMessageData
    };
}

function toUnusedVarAnnotation(unusedVar) {
    const node = unusedVar.identifiers?.[0];

    if (!node?.loc?.start) {
        return null;
    }

    const data = unusedVar.references.some((ref) => ref.isWrite()) ? getAssignedMessageData(unusedVar)
        : getDefinedMessageData(unusedVar);

    return {
        row: node.loc.start.line - 1,
        column: node.loc.start.column,
        text: interpolate(UNUSED_VAR_MESSAGE, data),
        type: "warning"
    };
}

const UNUSED_VAR_MESSAGE = "'{{varName}}' is {{action}} but never used{{additional}}.";

function interpolate(text, data) {
    return text.replace(/\{\{([^{}]+)\}\}/g, (_, name) => {
        name = name.trim();
        return name in data ? String(data[name]) : `{{${name}}}`;
    });
}

/**
 * Convert found unused variables into ace annotations
 * @param {Scope} scope
 * @param {ScopeManager} scopeManager
 * @return {*[]}
 */
export function getAnnotations(scope, scopeManager) {
    var unusedVars = collectUnusedVariables(scope, [], scopeManager);
    var annotations = [];

    for (let i = 0, l = unusedVars.length; i < l; ++i) {
        const unusedVar = unusedVars[i];

        // Report the first declaration.
        if (unusedVar.defs.length > 0) {
            // report last write reference, https://github.com/eslint/eslint/issues/14324
            const writeReferences = unusedVar.references.filter(
                ref => ref.isWrite() && ref.from.variableScope === unusedVar.scope.variableScope);

            let referenceToReport;

            if (writeReferences.length > 0) {
                referenceToReport = writeReferences.at(-1);
            }

            var transpiled = toUnusedVarAnnotation(unusedVar);
            if (transpiled) {
                annotations.push(toUnusedVarAnnotation(unusedVar));
            }
        }
    }

    return annotations;
}
