export var typescriptContent = `
class Greeter {
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
//This created only to show that docs are dependent on each other
class SomeTestClassName {

}
`