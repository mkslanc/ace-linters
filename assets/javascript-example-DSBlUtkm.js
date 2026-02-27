var jsContent = `
class Point { 
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

nonDefinedVar
`;
export { jsContent as t };
