export var typescriptContent = `
import {SomeTestClassName} from "../anotherFile";
import * as libFile from "../dir/file";

let test;
let chainable = new ChainableOne();
chainable.chainableTwo.addAlpha("test").setBeta();

libFile.data.setAlpha("").chainableTwo;

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
    this.name = "not ok";
  }
}
const g = new Greeter();
g.name = "also not ok";

`

export var typescriptContent1 = `
import * as lib from "./someLibDir/index";

//This created only to show that docs are dependent on each other
export class SomeTestClassName {

}

console.log(lib.Greeter);

`