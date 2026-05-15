const path = require("path");

process.env.TS_NODE_PROJECT = path.join(__dirname, "tsconfig.json");

module.exports = {
    extension: ["ts"],
    reporter: "spec",
    timeout: 15000,
    spec: "tests/**/*.tests.ts",
    require: "ts-node/register/transpile-only"
};
