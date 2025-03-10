import {ServiceStruct, SupportedServices} from "./types/language-service";

type IncludeLinters = Partial<{ [name in SupportedServices]: boolean | undefined }> | boolean;

function createWorkerBlob(cdnUrl: string, services: ServiceStruct[]) {
    return new Blob([`
        importScripts("${cdnUrl}/service-manager.js");
        const manager = new ServiceManager(self);

        ${services.map(service => `
            manager.registerService("${service.name}", {
                module: () => {
                    importScripts("${service.cdnUrl ?? cdnUrl}/${service.script}");
                    return {${service.className}};
                },
                className: "${service.className}",
                modes: "${service.modes}"
            });
        `).join('\n')}
    `], {type: "application/javascript"});
}

export function createWorker(services: {
    services: ServiceStruct[],
    serviceManagerCdn: string
}, includeLinters?: IncludeLinters): Worker
export function createWorker(cdnUrl: string, includeLinters?: IncludeLinters): Worker
export function createWorker(source: string | {
    services: ServiceStruct[],
    serviceManagerCdn: string
}, includeLinters?: IncludeLinters) {
    if (includeLinters === undefined) {// if `includeLinters` is not defined, set it to true
        includeLinters = true;
    }

    if (typeof Worker == "undefined") return {
        postMessage: function () {
        },
        terminate: function () {
        }
    };

    let blob: Blob;
    if (typeof source === "string") {
        const allServices = getServices(includeLinters);
        blob = createWorkerBlob(source, allServices);
    } else {
        const allServices = [...source.services, ...getServices(includeLinters)];
        const cdnUrl = source.serviceManagerCdn;
        blob = createWorkerBlob(cdnUrl, allServices);
    }

    var URL = window.URL || window.webkitURL;
    var blobURL = URL.createObjectURL(blob);
    // calling URL.revokeObjectURL before worker is terminated breaks it on IE Edge
    return new Worker(blobURL);
}

export function getServices(includeLinters?: IncludeLinters): ServiceStruct[] {
    const allServices = [
        {
            name: "json",
            script: "json-service.js",
            className: "JsonService",
            modes: "json|json5",
        },
        {
            name: "html",
            script: "html-service.js",
            className: "HtmlService",
            modes: "html",
        },
        {
            name: "css",
            script: "css-service.js",
            className: "CssService",
            modes: "css",
        },
        {
            name: "less",
            script: "css-service.js",
            className: "CssService",
            modes: "less",
        },
        {
            name: "scss",
            script: "css-service.js",
            className: "CssService",
            modes: "scss",
        },
        {
            name: "typescript",
            script: "typescript-service.js",
            className: "TypescriptService",
            modes: "typescript|tsx|javascript|jsx",
        },
        {
            name: "lua",
            script: "lua-service.js",
            className: "LuaService",
            modes: "lua",
        },
        {
            name: "yaml",
            script: "yaml-service.js",
            className: "YamlService",
            modes: "yaml",
        },
        {
            name: "xml",
            script: "xml-service.js",
            className: "XmlService",
            modes: "xml",
        },
        {
            name: "php",
            script: "php-service.js",
            className: "PhpService",
            modes: "php",
        },
        {
            name: "eslint",
            script: "javascript-service.js",
            className: "JavascriptService",
            modes: "javascript",
        },
        {
            name: "python",
            script: "python-service.js",
            className: "PythonService",
            modes: "python",
            cdnUrl: "https://www.unpkg.com/ace-python-ruff-linter/build"
        }
    ];

    if (includeLinters === true || includeLinters === undefined) {
        return allServices;
    } else if (includeLinters === false) {
        return [];
    }

    if (includeLinters.javascript) { // left for backward compatibility
        includeLinters.eslint = includeLinters.javascript;
        delete includeLinters.javascript;
    }

    return allServices.filter(service => {
        return includeLinters[service.name]
    });
}
