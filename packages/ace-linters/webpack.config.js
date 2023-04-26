"use strict";
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    let loader;
    loader = {
        test: /\.(t|j)sx?$/,
        use: {
            loader: 'esbuild-loader',
            options: {
                target: "es2019"
            }
        },
        exclude: /node_modules/
    };
    return {
        cache: false,
        devtool: isProduction ? false : 'inline-source-map',
        entry: {
            "ace-linters": './index.ts',
            "service-manager": './services/service-manager.ts',
            "html-service": './services/html/html-service.ts',
            "css-service": './services/css/css-service.ts',
            "json-service": './services/json/json-service.ts',
            "lua-service": './services/lua/lua-service.ts',
            "typescript-service": './services/typescript/typescript-service.ts',
            "yaml-service": './services/yaml/yaml-service.ts',
            "xml-service": './services/xml/xml-service.ts',
            "php-service": './services/php/php-service.ts',
            "ace-language-client": './ace-language-client.ts',
            "javascript-service": './services/javascript/javascript-service.ts',
            "python-service": {
                chunkLoading: "import-scripts",
                import: './services/python/python-service.ts'
            }
        },
        externals: /ace-code/,
        module: {
            rules: [
                loader, {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },{
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
            path: __dirname + '/build',
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
