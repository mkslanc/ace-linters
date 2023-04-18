import {ServiceManager} from "ace-linters/build/service-manager";

let manager = new ServiceManager(self);
manager.registerService("html", {
    features: {signatureHelp: false},
    module: () => import("ace-linters/build/html-service"),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    features: {signatureHelp: false},
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    features: {signatureHelp: false},
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    features: {signatureHelp: false},
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    features: {signatureHelp: false, documentHighlight: false},
    module: () => import("ace-linters/build/json-service"),
    className: "JsonService",
    modes: "json",
});
manager.registerService("json5", {
    features: {signatureHelp: false, documentHighlight: false},
    module: () => import("ace-linters/build/json-service"),
    className: "JsonService",
    modes: "json5",
});
manager.registerService("typescript", {
    module: () => import("ace-linters/build/typescript-service"),
    className: "TypescriptService",
    modes: "typescript|tsx|javascript|jsx",
});
manager.registerService("lua", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/lua-service"),
    className: "LuaService",
    modes: "lua",
});
manager.registerService("yaml", {
    features: {signatureHelp: false, documentHighlight: false},
    module: () => import("ace-linters/build/yaml-service"),
    className: "YamlService",
    modes: "yaml",
});
manager.registerService("xml", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/xml-service"),
    className: "XmlService",
    modes: "xml",
});
manager.registerService("php", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/php-service"),
    className: "PhpService",
    modes: "php"
});
manager.registerService("javascript", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/javascript-service"),
    className: "JavascriptService",
    modes: "javascript",
});
manager.registerService("python", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/python-service"),
    className: "PythonService",
    modes: "python",
});
