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
/*manager.registerService("typescript", {
    module: () => import("ace-linters/build/typescript-service"),
    className: "TypescriptService",
    modes: "typescript|tsx|javascript|jsx",
});*/
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
/*manager.registerService("javascript", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/javascript-service"),
    className: "JavascriptService",
    modes: "javascript",
});*/
/*manager.registerService("python", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false, documentHighlight: false, signatureHelp: false},
    module: () => import("ace-linters/build/python-service"),
    className: "PythonService",
    modes: "python",
});*/
manager.registerServer("pythonls", {
    module: () => import("ace-linters/build/language-client"),
    modes: "python",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3030/python")
});

manager.registerServer("svelte", {
    module: () => import("ace-linters/build/language-client"),
    modes: "html",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3030/svelte")
});

manager.registerServer("astro", {
    module: () => import("ace-linters/build/language-client"),
    modes: "astro",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3030/astro"),
    initializationOptions: {
        typescript: {
            tsdk: "node_modules/typescript/lib", //path to typescript server
        }
    }
});

manager.registerServer("go", {
    module: () => import("ace-linters/build/language-client"),
    modes: "golang",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3030/go")
});
manager.registerServer("typescript", {
    module: () => import("ace-linters/build/language-client"),
    modes: "typescript",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3030/typescript")
});

manager.registerService("mysql", {
    module: () => import("ace-sql-linter/build/mysql-service"),
    className: "MySQLService",
    modes: "mysql",
});
