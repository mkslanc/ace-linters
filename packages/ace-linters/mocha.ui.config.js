module.exports = {
    extension: ['ts'],
    reporter: 'spec',
    timeout: 5000,
    spec: 'tests/ui/*.tests.ts',
    require: "ts-node/register"
};