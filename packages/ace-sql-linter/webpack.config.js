"use strict";
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    let loader;
    loader = {
        test: /\.(t|j)sx?$/,
        use: {
            loader: 'swc-loader',
            options: {
                jsc: {
                    "target": "es2019"
                }
            }
        },
        exclude: /node_modules/
    };
    return {
        cache: false,
        devtool: isProduction ? false : 'inline-source-map',
        entry: {
            "mysql-service": './src/mysql-service.ts',
            "pgsql-service": './src/pgsql-service.ts',
            "flinksql-service": './src/flinksql-service.ts',
            "hivesql-service": './src/hivesql-service.ts',
            "impalasql-service": './src/impalasql-service.ts',
            "sparksql-service": './src/sparksql-service.ts',
            "trinosql-service": './src/trinosql-service.ts',
        },
        module: {
            rules: [
                loader
            ]
        },
        resolveLoader: {
            modules: [
                "node_modules", __dirname + "/node_modules"
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/build',
            publicPath: 'auto',
            library: {
                type: "umd2"
            },
            globalObject: 'this'
        },
        optimization: {
            minimize: false
        },
        plugins: [
            new NodePolyfillPlugin()
        ]
    };
};
