export var typescriptContent = `
class Greeter {
  readonly name: string = "world";
  doc: HTMLDocument;
 
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