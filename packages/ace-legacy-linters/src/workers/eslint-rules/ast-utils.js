/** @typedef {any} ASTNode */

const anyFunctionPattern =
    /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;
const anyLoopPattern = /^(?:DoWhile|For|ForIn|ForOf|While)Statement$/u;
const LOGICAL_ASSIGNMENT_OPERATORS = new Set(["&&=", "||=", "??="]);

/**
 * Checks whether a given node is a function node or not.
 * The following types are function nodes:
 *
 * - ArrowFunctionExpression
 * - FunctionDeclaration
 * - FunctionExpression
 * @param {any} node A node to check.
 * @returns {boolean} `true` if the node is a function node.
 */
export function isFunction(node) {
    return Boolean(node && anyFunctionPattern.test(node.type));
}

/**
 * Checks whether the given node is in a loop or not.
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node is in a loop.
 */
export function isInLoop(node) {
    for (
        let currentNode = node;
        currentNode && !isFunction(currentNode);
        currentNode = currentNode.parent
    ) {
        if (isLoop(currentNode)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks whether a given node is a loop node or not.
 * The following types are loop nodes:
 *
 * - DoWhileStatement
 * - ForInStatement
 * - ForOfStatement
 * - ForStatement
 * - WhileStatement
 * @param {ASTNode|null} node A node to check.
 * @returns {boolean} `true` if the node is a loop node.
 */
export function isLoop(node) {
    return Boolean(node && anyLoopPattern.test(node.type));
}

/**
 * Finds a function node from ancestors of a node.
 * @param {ASTNode} node A start node to find.
 * @returns {Node|null} A found function node.
 */
export function getUpperFunction(node) {
    for (
        let currentNode = node;
        currentNode;
        currentNode = currentNode.parent
    ) {
        if (anyFunctionPattern.test(currentNode.type)) {
            return currentNode;
        }
    }
    return null;
}

/**
 * Checks if the given operator is a logical assignment operator.
 * @param {string} operator The operator to check.
 * @returns {boolean} `true` if the operator is a logical assignment operator.
 */
export function isLogicalAssignmentOperator(operator) {
    return LOGICAL_ASSIGNMENT_OPERATORS.has(operator);
}
