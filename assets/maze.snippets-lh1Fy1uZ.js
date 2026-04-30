import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
//#region node_modules/ace-code/src/snippets/maze.snippets.js
var require_maze_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `snippet >
description assignment
scope maze
	-> \${1}= \${2}

snippet >
description if
scope maze
	-> IF \${2:**} THEN %\${3:L} ELSE %\${4:R}
`;
}));
//#endregion
export default require_maze_snippets();
export { require_maze_snippets as t };
