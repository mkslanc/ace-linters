module.exports = {
    extension: ['ts'],
    reporter: 'spec',
    timeout: 5000,
    spec: 'tests/unit/*.tests.ts',
    require: "ts-node/register"
};