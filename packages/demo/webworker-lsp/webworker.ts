import {ServiceManager} from "ace-linters/build/service-manager";

let manager = new ServiceManager(self);
manager.registerService("html", {
    module: () => import("ace-linters/build/html-service"),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    module: () => import("ace-linters/build/css-service"),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    module: () => import("ace-linters/build/json-service"),
    className: "JsonService",
    modes: "json",
});
manager.registerService("json5", {
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
    module: () => import("ace-linters/build/lua-service"),
    className: "LuaService",
    modes: "lua",
});
manager.registerService("yaml", {
    module: () => import("ace-linters/build/yaml-service"),
    className: "YamlService",
    modes: "yaml",
});
manager.registerService("xml", {
    module: () => import("ace-linters/build/xml-service"),
    className: "XmlService",
    modes: "xml",
});
manager.registerService("php", {
    module: () => import("ace-linters/build/php-service"),
    className: "PhpService",
    modes: "php"
});
/*manager.registerService("javascript", {
    module: () => import("ace-linters/build/javascript-service"),
    className: "JavascriptService",
    modes: "javascript",
});*/
manager.registerService("python", {
    module: () => import("ace-linters/build/python-service"),
    className: "PythonService",
    modes: "python",
});
