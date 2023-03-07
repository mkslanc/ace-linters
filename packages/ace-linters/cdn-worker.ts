import type {AceLinters} from "./types";

function $workerBlob(script) {
    return new Blob([script.toString()], {"type": "application/javascript"});
}

export function createWorker(cdnUrl, includeLinters?: { [name in AceLinters.SupportedServices]: boolean }) {
    if (typeof Worker == "undefined") return {
        postMessage: function () {
        },
        terminate: function () {
        }
    };
    
    var blob = $workerBlob(generateLintersImport(cdnUrl, includeLinters));
    var URL = window.URL || window.webkitURL;
    var blobURL = URL.createObjectURL(blob);
    // calling URL.revokeObjectURL before worker is terminated breaks it on IE Edge
    return new Worker(blobURL);
}

function generateLintersImport(cdnUrl, includeLinters?: { [name in AceLinters.SupportedServices]?: boolean }) {
    const jsonService = `manager.registerService("json", {
        module: () => {
            importScripts("${cdnUrl}/json-service.js");
            return {JsonService};
        },
        className: "JsonService",
        modes: "json|json5"
    });`;
    const htmlService = `manager.registerService("html", {
        module: () => {
            importScripts("${cdnUrl}/html-service.js");
            return {HtmlService};
        },
        className: "HtmlService",
        modes: "html"
    });`;
    const cssService = `manager.registerService("css", {
        module: () => {
            importScripts("${cdnUrl}/css-service.js");
            return {CssService};
        },
        className: "CssService",
        modes: "css"
    });`;
    const lessService = `manager.registerService("less", {
        module: () => {
            importScripts("${cdnUrl}/css-service.js");
            return {CssService};
        },
        className: "CssService",
        modes: "less"
    });`;
    const scssService = `manager.registerService("scss", {
        module: () => {
            importScripts("${cdnUrl}/css-service.js");
            return {CssService};
        },
        className: "CssService",
        modes: "scss"
    });`;
    const typeScriptService = `manager.registerService("typescript", {
        module: () => {
            importScripts("${cdnUrl}/typescript-service.js");
            return {TypescriptService};
        },
        className: "TypescriptService",
        modes: "typescript|tsx",
    });`;
    const luaService = `manager.registerService("lua", {
        module: () => {
            importScripts("${cdnUrl}/lua-service.js");
            return {LuaService};
        },
        className: "LuaService",
        modes: "lua",
    });`;
    const yamlService = `manager.registerService("yaml", {
        module: () => {
            importScripts("${cdnUrl}/yaml-service.js");
            return {YamlService};
        },
        className: "YamlService",
        modes: "yaml",
    });`;
    const xmlService = `manager.registerService("xml", {
        module: () => {
            importScripts("${cdnUrl}/xml-service.js");
            return {XmlService};
        },
        className: "XmlService",
        modes: "xml",
    });`;
    const phpService = `manager.registerService("php", {
        module: () => {
            importScripts("${cdnUrl}/xml-service.js");
            return {PhpService};
        },
        className: "PhpService",
        modes: "php"
    });`;
    const javascriptService = `manager.registerService("javascript", {
        module: () => {
            importScripts("${cdnUrl}/javascript-service.js");
            return {JavascriptService};
        },
        className: "JavascriptService",
        modes: "javascript",
    });`;

    if (!includeLinters) {
        return `!function () {
    importScripts("${cdnUrl}/service-manager.js");
    let manager = new ServiceManager(self);
    ${[jsonService, htmlService, cssService, lessService, scssService, typeScriptService, luaService, yamlService, xmlService, phpService, javascriptService].join("\n")}
}()`;
    }
    let services: Array<string> = [];
    Object.entries(includeLinters).forEach(([key, value]) => {
        if (value) {
            switch (key as AceLinters.SupportedServices) {
                case "javascript":
                    services.push(javascriptService);
                    break;
                case "css":
                    services.push(cssService);
                    break;
                case "html":
                    services.push(htmlService);
                    break;
                case "json":
                    services.push(jsonService);
                    break;
                case "less":
                    services.push(lessService);
                    break;
                case "lua":
                    services.push(luaService);
                    break;
                case "typescript":
                    services.push(typeScriptService);
                    break;
                case "php":
                    services.push(phpService);
                    break;
                case "scss":
                    services.push(scssService);
                    break;
                case "xml":
                    services.push(xmlService);
                    break;
                case "yaml":
                    services.push(yamlService);
                    break;
            }
        }
    });
    return `!function () {
    importScripts("${cdnUrl}/service-manager.js");
    let manager = new ServiceManager(self);
    ${services.join("\n")}
}()`;
}

