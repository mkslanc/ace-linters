var typescriptContent = `

import { SomeTestClassName } from "../anotherFile";
import * as libFile from "../dir/file";

// Importing module from extraLibs
import * as chain from "lib-declaration";

// Demonstrating method chaining with the ChainableOne class from extraLibs
let chainable = new chain.ChainableOne();
chainable.chainableTwo.addAlpha("test").setBeta();
chainable.chainableTwo.addAlpha("example").setBeta(42).setGamma(true);

libFile.data.setAlpha("demo").chainableTwo.setGamma(false);

export class Greeter {
    readonly name: string = "world";
    doc: HTMLDocument;
    someTest: SomeTestClassName;

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }

    err() {
        this.name = "not ok"; // This should be treated as a warning due to readonly (error code 2540)
    }
}

const g = new Greeter();
g.name = "should trigger an error"; // Demonstrates TypeScript check for readonly properties

`;
var typescriptContent1 = `
import * as lib from "./someLibDir/index"; // Importing Greeter from index.ts

// Class to show cross-file type usage
export class SomeTestClassName {
    // Additional methods and properties could be defined here if needed
}

console.log(lib.Greeter);
`;
export { typescriptContent1 as n, typescriptContent as t };
