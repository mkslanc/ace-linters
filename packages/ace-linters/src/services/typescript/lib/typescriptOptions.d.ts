//
// **NOTE**: Do not edit directly! This file is generated using `npm run generate-typescript-service`
//

declare namespace ts {
interface CompilerOptionsWithoutEnums {
    allowImportingTsExtensions?: boolean;
    allowJs?: boolean;
    allowArbitraryExtensions?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUmdGlobalAccess?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?: boolean;
    alwaysStrict?: boolean;
    baseUrl?: string;
    /** @deprecated */
    charset?: string;
    checkJs?: boolean;
    customConditions?: string[];
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    declarationDir?: string;
    disableSizeLimit?: boolean;
    disableSourceOfProjectReferenceRedirect?: boolean;
    disableSolutionSearching?: boolean;
    disableReferencedProjectLoad?: boolean;
    downlevelIteration?: boolean;
    emitBOM?: boolean;
    emitDecoratorMetadata?: boolean;
    exactOptionalPropertyTypes?: boolean;
    experimentalDecorators?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    ignoreDeprecations?: string;
    importHelpers?: boolean;
    /** @deprecated */
    importsNotUsedAsValues?: 'remove' | 'preserve' | 'error';
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    isolatedModules?: boolean;
    isolatedDeclarations?: boolean;
    jsx?: 'none' | 'preserve' | 'react' | 'reactnative' | 'reactjsx' | 'reactjsxdev';
    /** @deprecated */
    keyofStringsOnly?: boolean;
    lib?: string[];
    locale?: string;
    mapRoot?: string;
    maxNodeModuleJsDepth?: number;
    module?: 'none' | 'commonjs' | 'amd' | 'umd' | 'system' | 'es2015' | 'es2020' | 'es2022' | 'esnext' | 'node16' | 'nodenext' | 'preserve';
    moduleResolution?: 'classic' | 'nodejs' | 'node10' | 'node16' | 'nodenext' | 'bundler';
    moduleSuffixes?: string[];
    moduleDetection?: 'legacy' | 'auto' | 'force';
    newLine?: 'carriagereturnlinefeed' | 'linefeed';
    noEmit?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean;
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean;
    /** @deprecated */
    noStrictGenericChecks?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    /** @deprecated */
    noImplicitUseStrict?: boolean;
    noPropertyAccessFromIndexSignature?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    noLib?: boolean;
    noResolve?: boolean;
    noUncheckedIndexedAccess?: boolean;
    /** @deprecated */
    out?: string;
    outDir?: string;
    outFile?: string;
    paths?: MapLike<string[]>;
    preserveConstEnums?: boolean;
    noImplicitOverride?: boolean;
    preserveSymlinks?: boolean;
    /** @deprecated */
    preserveValueImports?: boolean;
    project?: string;
    reactNamespace?: string;
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    jsxImportSource?: string;
    composite?: boolean;
    incremental?: boolean;
    tsBuildInfoFile?: string;
    removeComments?: boolean;
    resolvePackageJsonExports?: boolean;
    resolvePackageJsonImports?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    strict?: boolean;
    strictFunctionTypes?: boolean;
    strictBindCallApply?: boolean;
    strictNullChecks?: boolean;
    strictPropertyInitialization?: boolean;
    strictBuiltinIteratorReturn?: boolean;
    stripInternal?: boolean;
    /** @deprecated */
    suppressExcessPropertyErrors?: boolean;
    /** @deprecated */
    suppressImplicitAnyIndexErrors?: boolean;
    target?: 'es3' | 'es5' | 'es2015' | 'es2016' | 'es2017' | 'es2018' | 'es2019' | 'es2020' | 'es2021' | 'es2022' | 'es2023' | 'esnext' | 'json' | 'latest';
    traceResolution?: boolean;
    useUnknownInCatchVariables?: boolean;
    noUncheckedSideEffectImports?: boolean;
    resolveJsonModule?: boolean;
    types?: string[];
    /** Paths used to compute primary types search locations */
    typeRoots?: string[];
    verbatimModuleSyntax?: boolean;
    esModuleInterop?: boolean;
    useDefineForClassFields?: boolean;
    [option: string]: any;
}
interface CompilerOptions {
    allowImportingTsExtensions?: boolean;
    allowJs?: boolean;
    allowArbitraryExtensions?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUmdGlobalAccess?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?: boolean;
    alwaysStrict?: boolean;
    baseUrl?: string;
    /** @deprecated */
    charset?: string;
    checkJs?: boolean;
    customConditions?: string[];
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    declarationDir?: string;
    disableSizeLimit?: boolean;
    disableSourceOfProjectReferenceRedirect?: boolean;
    disableSolutionSearching?: boolean;
    disableReferencedProjectLoad?: boolean;
    downlevelIteration?: boolean;
    emitBOM?: boolean;
    emitDecoratorMetadata?: boolean;
    exactOptionalPropertyTypes?: boolean;
    experimentalDecorators?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    ignoreDeprecations?: string;
    importHelpers?: boolean;
    /** @deprecated */
    importsNotUsedAsValues?: ImportsNotUsedAsValues;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    isolatedModules?: boolean;
    isolatedDeclarations?: boolean;
    jsx?: JsxEmit;
    /** @deprecated */
    keyofStringsOnly?: boolean;
    lib?: string[];
    locale?: string;
    mapRoot?: string;
    maxNodeModuleJsDepth?: number;
    module?: ModuleKind;
    moduleResolution?: ModuleResolutionKind;
    moduleSuffixes?: string[];
    moduleDetection?: ModuleDetectionKind;
    newLine?: NewLineKind;
    noEmit?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean;
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean;
    /** @deprecated */
    noStrictGenericChecks?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    /** @deprecated */
    noImplicitUseStrict?: boolean;
    noPropertyAccessFromIndexSignature?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    noLib?: boolean;
    noResolve?: boolean;
    noUncheckedIndexedAccess?: boolean;
    /** @deprecated */
    out?: string;
    outDir?: string;
    outFile?: string;
    paths?: MapLike<string[]>;
    preserveConstEnums?: boolean;
    noImplicitOverride?: boolean;
    preserveSymlinks?: boolean;
    /** @deprecated */
    preserveValueImports?: boolean;
    project?: string;
    reactNamespace?: string;
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    jsxImportSource?: string;
    composite?: boolean;
    incremental?: boolean;
    tsBuildInfoFile?: string;
    removeComments?: boolean;
    resolvePackageJsonExports?: boolean;
    resolvePackageJsonImports?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    strict?: boolean;
    strictFunctionTypes?: boolean;
    strictBindCallApply?: boolean;
    strictNullChecks?: boolean;
    strictPropertyInitialization?: boolean;
    strictBuiltinIteratorReturn?: boolean;
    stripInternal?: boolean;
    /** @deprecated */
    suppressExcessPropertyErrors?: boolean;
    /** @deprecated */
    suppressImplicitAnyIndexErrors?: boolean;
    target?: ScriptTarget;
    traceResolution?: boolean;
    useUnknownInCatchVariables?: boolean;
    noUncheckedSideEffectImports?: boolean;
    resolveJsonModule?: boolean;
    types?: string[];
    /** Paths used to compute primary types search locations */
    typeRoots?: string[];
    verbatimModuleSyntax?: boolean;
    esModuleInterop?: boolean;
    useDefineForClassFields?: boolean;
    [option: string]: any;
}
interface FormatCodeSettings extends EditorSettings {
    readonly insertSpaceAfterCommaDelimiter?: boolean;
    readonly insertSpaceAfterSemicolonInForStatements?: boolean;
    readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
    readonly insertSpaceAfterConstructor?: boolean;
    readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
    readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
    readonly insertSpaceAfterTypeAssertion?: boolean;
    readonly insertSpaceBeforeFunctionParenthesis?: boolean;
    readonly placeOpenBraceOnNewLineForFunctions?: boolean;
    readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
    readonly insertSpaceBeforeTypeAnnotation?: boolean;
    readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
    readonly semicolons?: SemicolonPreference;
    readonly indentSwitchCase?: boolean;
}
interface EditorSettings {
    baseIndentSize?: number;
    indentSize?: number;
    tabSize?: number;
    newLineCharacter?: string;
    convertTabsToSpaces?: boolean;
    indentStyle?: IndentStyle;
    trimTrailingWhitespace?: boolean;
}
/** @deprecated */
enum ImportsNotUsedAsValues {
    Remove = 0,
    Preserve = 1,
    Error = 2
}
enum JsxEmit {
    None = 0,
    Preserve = 1,
    React = 2,
    ReactNative = 3,
    ReactJSX = 4,
    ReactJSXDev = 5
}
enum ModuleKind {
    None = 0,
    CommonJS = 1,
    AMD = 2,
    UMD = 3,
    System = 4,
    ES2015 = 5,
    ES2020 = 6,
    ES2022 = 7,
    ESNext = 99,
    Node16 = 100,
    NodeNext = 199,
    Preserve = 200
}
enum ModuleResolutionKind {
    Classic = 1,
    /**
     * @deprecated
     * `NodeJs` was renamed to `Node10` to better reflect the version of Node that it targets.
     * Use the new name or consider switching to a modern module resolution target.
     */
    NodeJs = 2,
    Node10 = 2,
    Node16 = 3,
    NodeNext = 99,
    Bundler = 100
}
enum ModuleDetectionKind {
    /**
     * Files with imports, exports and/or import.meta are considered modules
     */
    Legacy = 1,
    /**
     * Legacy, but also files with jsx under react-jsx or react-jsxdev and esm mode files under moduleResolution: node16+
     */
    Auto = 2,
    /**
     * Consider all non-declaration files modules, regardless of present syntax
     */
    Force = 3
}
enum NewLineKind {
    CarriageReturnLineFeed = 0,
    LineFeed = 1
}
/**
 * Type of objects whose values are all of the same type.
 * The `in` and `for-in` operators can *not* be safely used,
 * since `Object.prototype` may be modified by outside code.
 */
interface MapLike<T> {
    [index: string]: T;
}
enum ScriptTarget {
    /** @deprecated */
    ES3 = 0,
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ES2022 = 9,
    ES2023 = 10,
    ESNext = 99,
    JSON = 100,
    Latest = 99
}
enum SemicolonPreference {
    Ignore = "ignore",
    Insert = "insert",
    Remove = "remove"
}
enum IndentStyle {
    None = 0,
    Block = 1,
    Smart = 2
}

}

 export = ts;