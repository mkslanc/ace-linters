const ts = require("typescript");

function transformEnumProperties(sourceCode) {
    const printer = ts.createPrinter();
    sourceCode = sourceCode.replace(
        /(\[option:\s*string\]):\s*CompilerOptionsValue\s*\|\s*TsConfigSourceFile\s*\|\s*undefined;/, "$1: any");

    const sourceFile = ts.createSourceFile("source.ts", sourceCode, ts.ScriptTarget.ES2015, true);

    const allDeclarations = new Map();

    function collectAllDeclarations(node) {
        if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node)
            || ts.isEnumDeclaration(node)) {
            if (node.name) {
                allDeclarations.set(node.name.text, node);
            }
        }
        ts.forEachChild(node, collectAllDeclarations);
    }

    collectAllDeclarations(sourceFile);

    const targetNames = new Set([
        "CompilerOptions", "FormatCodeSettings", "EditorSettings"
    ]);
    const targetInterfaces = {};
    targetNames.forEach((name) => {
        if (allDeclarations.has(name)) {
            targetInterfaces[name] = allDeclarations.get(name);
        }
    });

    const basicTypes = new Set([
        "string", "number", "boolean", "any", "void", "null", "undefined", "unknown"
    ]);
    const usedTypes = new Set();
    const processedTypes = new Set();

    function processTypeNode(typeNode) {
        if (!typeNode) return;
        if (ts.isTypeReferenceNode(typeNode)) {
            const typeName = typeNode.typeName.getText();
            if (!basicTypes.has(typeName)) {
                if (allDeclarations.has(typeName)) {
                    usedTypes.add(typeName);
                    if (!processedTypes.has(typeName)) {
                        processedTypes.add(typeName);
                        const decl = allDeclarations.get(typeName);
                        processDeclaration(decl);
                    }
                }
            }
            if (typeNode.typeArguments) {
                typeNode.typeArguments.forEach((arg) => processTypeNode(arg));
            }
        }
        else if (ts.isUnionTypeNode(typeNode) || ts.isIntersectionTypeNode(typeNode)) {
            typeNode.types.forEach((subType) => processTypeNode(subType));
        }
        else if (ts.isArrayTypeNode(typeNode)) {
            processTypeNode(typeNode.elementType);
        }
        else if (ts.isParenthesizedTypeNode(typeNode)) {
            processTypeNode(typeNode.type);
        }
        else if (ts.isTypeLiteralNode(typeNode)) {
            typeNode.members.forEach((member) => {
                if (member.type) {
                    processTypeNode(member.type);
                }
            });
        }
    }

    function processDeclaration(decl) {
        if (ts.isInterfaceDeclaration(decl)) {
            decl.members.forEach((member) => {
                if (ts.isPropertySignature(member) || ts.isMethodSignature(member)) {
                    if (member.type) processTypeNode(member.type);
                }
                if (ts.isIndexSignatureDeclaration(member)) {
                    if (member.type) processTypeNode(member.type);
                }
            });
        }
        else if (ts.isTypeAliasDeclaration(decl)) {
            processTypeNode(decl.type);
        }
        else if (ts.isClassDeclaration(decl)) {
            decl.members.forEach((member) => {
                if (ts.isPropertyDeclaration(member) || ts.isMethodDeclaration(member)) {
                    if (member.type) processTypeNode(member.type);
                }
                if (ts.isIndexSignatureDeclaration(member)) {
                    if (member.type) processTypeNode(member.type);
                }
            });
        }
        else if (ts.isEnumDeclaration(decl)) {
        }
    }

    Object.values(targetInterfaces).forEach((decl) => {
        if (ts.isInterfaceDeclaration(decl)) {
            decl.members.forEach((member) => {
                if (member.type) processTypeNode(member.type);
            });
        }
    });

    let transformedCompilerOptionsDecl = null;
    if (targetInterfaces.CompilerOptions) {
        const coDecl = targetInterfaces.CompilerOptions;
        const newMembers = coDecl.members.map((member) => {
            if (ts.isPropertySignature(member) && member.type && ts.isTypeReferenceNode(member.type)) {
                const typeName = member.type.typeName.getText();
                if (allDeclarations.has(typeName)) {
                    const possibleEnum = allDeclarations.get(typeName);
                    if (ts.isEnumDeclaration(possibleEnum)) {
                        const unionTypes = possibleEnum.members.map((enumMember) => ts.factory.createLiteralTypeNode(
                            ts.factory.createStringLiteral(enumMember.name.getText().toLowerCase(), true)));
                        return ts.factory.updatePropertySignature(member, member.modifiers, member.name,
                            member.questionToken, ts.factory.createUnionTypeNode(unionTypes), member.initializer
                        );
                    }
                }
            }
            return member;
        });
        transformedCompilerOptionsDecl = ts.factory.updateInterfaceDeclaration(coDecl, coDecl.modifiers,
            ts.factory.createIdentifier("CompilerOptionsWithoutEnums"), coDecl.typeParameters, coDecl.heritageClauses,
            newMembers
        );
    }

    const finalNodesMap = new Map();

    if (transformedCompilerOptionsDecl) {
        finalNodesMap.set("CompilerOptionsWithoutEnums", transformedCompilerOptionsDecl);
    }
    targetNames.forEach((name) => {
        if (targetInterfaces[name]) {
            finalNodesMap.set(name, targetInterfaces[name]);
        }
    });
    usedTypes.forEach((typeName) => {
        if (!targetNames.has(typeName)) {
            if (allDeclarations.has(typeName)) {
                finalNodesMap.set(typeName, allDeclarations.get(typeName));
            }
        }
    });

    const finalNodes = Array.from(finalNodesMap.values());
    const newSourceFile = ts.factory.updateSourceFile(sourceFile, finalNodes);
    const finalText = printer.printFile(newSourceFile);

    return `declare namespace ts {\n${finalText}\n}`;
}

exports.transformEnumProperties = transformEnumProperties;
