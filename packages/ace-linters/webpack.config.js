"use strict";
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isTest = argv.name === 'test';
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
            "ace-linters": './src/index.ts',
            "service-manager": './src/services/service-manager.ts',
            "html-service": './src/services/html/html-service.ts',
            "css-service": './src/services/css/css-service.ts',
            "json-service": './src/services/json/json-service.ts',
            "lua-service": './src/services/lua/lua-service.ts',
            "typescript-service": './src/services/typescript/typescript-service.ts',
            "yaml-service": './src/services/yaml/yaml-service.ts',
            "xml-service": './src/services/xml/xml-service.ts',
            "php-service": './src/services/php/php-service.ts',
            "ace-language-client": './src/ace-language-client.ts',
            "javascript-service": './src/services/javascript/javascript-service.ts',
            "python-service": {
                chunkLoading: "import-scripts",
                import: './src/services/python/python-service.ts'
            },
            "base-service": './src/services/base-service.ts',
        },
        externals: /ace-code|ace-builds/,
        module: {
            rules: [
                loader, {
                    test: /\.wasm$/,
                    type: "asset/inline",
                },
            ]
        },
        resolveLoader: {
            alias: {
                "ace-code/src/requirejs/text": __dirname + "/node_modules/text-loader"
            },
            modules: [
                "node_modules", __dirname + "/node_modules"
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: '[name].js',
            path: __dirname + (isTest ? "/tests/ui/dist/" : "") + '/build',
            publicPath: 'auto',
            library: {
                type: "umd2"
            }
        },
        optimization: {
            minimize: false
        },
        plugins: [
            new NodePolyfillPlugin()
        ]
    };
};
