import {ServiceManager} from "ace-linters/service-manager";

let manager = new ServiceManager(self);

manager.registerService("typescript", {
    features: {diagnostics: false},
    module: () => import("ace-linters/build/typescript-service"),
    className: "TypescriptService",
    modes: "javascript",
});

manager.registerService("javascript", {
    features: {completion: false, completionResolve: false, diagnostics: true, format: false, hover: false},
    module: () => import("ace-linters/build/javascript-service"),
    className: "JavascriptService",
    modes: "javascript",
});
