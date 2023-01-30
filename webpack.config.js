"use strict";
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    let loader;
    loader = {
        test: /\.(t|j)sx?$/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        },
        exclude: /node_modules/
    };
    return {
        cache: true,
        devtool: 'source-map',
        entry: {
            default_services_demo: './packages/demo/webworker-lsp/demo.ts',
            webworker_demo: './packages/demo/webworker-json-rpc/demo.ts',
            websocket_demo: './packages/demo/websockets-lsp/client.ts',
            rust_demo: './packages/demo/rust-analyzer/demo.ts',
        },
        mode: "production",
        module: {
            rules: [
                loader, {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }, {
                    test: /\.rs$/,
                    use: ['raw-loader']
                }
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
            filename: 'bundle.[name].js',
            path: __dirname + '/build'
        },
        optimization: {
            minimize: false
        },
        devServer: {
            compress: true,
            port: 9000,
            client: {
                overlay: false
            },
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin'
            },
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "packages/demo/index.html",
                        to: "."
                    }, {
                        from: "packages/demo/webworker.html",
                        to: "."
                    }, {
                        from: "packages/demo/websocket.html",
                        to: "."
                    }, {
                        from: "packages/demo/default_services.html",
                        to: "."
                    }, {
                        from: "packages/demo/rust_analyzer.html",
                        to: "."
                    }, {
                        from: "packages/demo/enable-threads.js",
                        to: "."
                    }
                ]
            })
        ]
    };
};
