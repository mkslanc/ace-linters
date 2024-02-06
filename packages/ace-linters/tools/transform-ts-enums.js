const ts = require("typescript");

function transformEnumProperties(sourceCode) {
    const printer = ts.createPrinter();
    let enumValuesMap = new Map();

    const sourceFile = ts.createSourceFile("source.ts", sourceCode, ts.ScriptTarget.ES2015, true);
    const collectEnumsVisitor = (node) => {
        if (ts.isEnumDeclaration(node)) {
            const enumName = node.name.text;
            const values = node.members.map(member => `${member.name.getText().toLowerCase()}`);
            enumValuesMap.set(enumName, values);
        }
        ts.forEachChild(node, collectEnumsVisitor);
    };
    ts.forEachChild(sourceFile, collectEnumsVisitor);
    
    let compilerOptionsNode;
    const transformVisitor = (context) => (rootNode) => {
        function visit(node) {
            node = ts.visitEachChild(node, visit, context);
            if (node.name && node.name.text === "CompilerOptions") {
                compilerOptionsNode = node;
            }
            if (ts.isPropertySignature(node) && node.type && ts.isTypeReferenceNode(node.type)) {
                const typeName = node.type.typeName.getText();
                if (enumValuesMap.has(typeName)) {
                    const unionTypes = enumValuesMap.get(typeName).map(
                        value => ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(value, true)));
                    return ts.factory.updatePropertySignature(node, node.modifiers, node.name, node.questionToken,
                        ts.factory.createUnionTypeNode(unionTypes), node.initializer
                    );
                }
            }
            return node;
        }

        return ts.visitNode(rootNode, visit);
    };
    const result = ts.transform(sourceFile, [transformVisitor]);
    const transformedSourceFile = result.transformed[0];
    let compilerOptions = printer.printNode(ts.EmitHint.Unspecified, compilerOptionsNode, transformedSourceFile);
    compilerOptions = compilerOptions.replace("CompilerOptions", "CompilerOptionsWithoutEnums");
    return `declare namespace ts {
    ${compilerOptions}
}`;
}

exports.transformEnumProperties = transformEnumProperties;
