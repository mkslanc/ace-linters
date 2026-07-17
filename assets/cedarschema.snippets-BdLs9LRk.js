import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
//#region node_modules/ace-code/src/snippets/cedarschema.snippets.js
var require_cedarschema_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `snippet namespace
\tnamespace \${1:Namespace} {
\t    \${0}
\t}
snippet entity
\tentity \${1:EntityName} {
\t    \${0}
\t};
snippet entity_in
\tentity \${1:EntityName} in [\${2:Parent}] {
\t    \${0}
\t};
snippet action
\taction "\${1:actionName}" appliesTo {
\t    principal: [\${2:Principal}],
\t    resource: [\${3:Resource}],
\t    context: {\${0}}
\t};
snippet action_in
\taction "\${1:actionName}" in [\${2:ParentAction}] appliesTo {
\t    principal: [\${3:Principal}],
\t    resource: [\${4:Resource}],
\t    context: {\${0}}
\t};
snippet type
\ttype \${1:TypeName} = {
\t    \${0}
\t};
`;
}));
//#endregion
export default require_cedarschema_snippets();
export { require_cedarschema_snippets as t };
