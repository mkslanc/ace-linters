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
            "ace-go-linter": {
                chunkLoading: "import-scripts",
                import: './src/ace-go-linter.ts'
            },
        },
        module: {
            rules: [
                loader, {
                    test: /\.wasm$/,
                    type: "asset/inline",
                },
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
