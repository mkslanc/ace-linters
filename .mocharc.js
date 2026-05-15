process.env.TS_NODE_PROJECT = "tests/ui-smoke/tsconfig.json";

module.exports = {
    extension: ["ts"],
    reporter: "spec",
    timeout: 15000,
    spec: "tests/ui-smoke/*.tests.ts",
    require: "ts-node/register/transpile-only"
};
