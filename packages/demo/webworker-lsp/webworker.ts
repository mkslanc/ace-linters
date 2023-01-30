import {ServiceManager} from "ace-linters/services/service-manager";

let manager = new ServiceManager(self);
manager.registerService("html", {
    module: () => import("ace-linters/services/html/html-service"),
    className: "HtmlService",
    modes: "html"
});
manager.registerService("css", {
    module: () => import("ace-linters/services/css/css-service"),
    className: "CssService",
    modes: "css"
});
manager.registerService("less", {
    module: () => import("ace-linters/services/css/css-service"),
    className: "CssService",
    modes: "less"
});
manager.registerService("scss", {
    module: () => import("ace-linters/services/css/css-service"),
    className: "CssService",
    modes: "scss"
});
manager.registerService("json", {
    module: () => import("ace-linters/services/json/json-service"),
    className: "JsonService",
    modes: "json",
});
manager.registerService("json5", {
    module: () => import("ace-linters/services/json/json-service"),
    className: "JsonService",
    modes: "json5",
});
manager.registerService("typescript", {
    module: () => import("ace-linters/services/typescript/typescript-service"),
    className: "TypescriptService",
    modes: "typescript|javascript|tsx|jsx",
});
manager.registerService("lua", {
    module: () => import("ace-linters/services/lua/lua-service"),
    className: "LuaService",
    modes: "lua",
});
manager.registerService("yaml", {
    module: () => import("ace-linters/services/yaml/yaml-service"),
    className: "YamlService",
    modes: "yaml",
});
manager.registerService("xml", {
    module: () => import("ace-linters/services/xml/xml-service"),
    className: "XmlService",
    modes: "xml",
});
