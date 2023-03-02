import {ServiceManager} from "ace-linters/build/service-manager";

let manager = new ServiceManager(self);

manager.registerService("typescript", {
    module: () => import("ace-linters/build/typescript-service"),
    className: "TypescriptService",
    modes: "javascript",
});

manager.registerService("javascript", {
    module: () => import("ace-linters/build/javascript-service"),
    className: "JavascriptService",
    modes: "javascript",
});
