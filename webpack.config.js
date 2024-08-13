"use strict";
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
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
        cache: true,
        devtool: 'inline-source-map',
        entry: {
            default_services_demo: './packages/demo/webworker-lsp/demo.ts',
            webworker_demo: './packages/demo/webworker-json-rpc/demo.ts',
            websocket_demo: './packages/demo/websockets-lsp/client.ts',
            rust_demo: './packages/demo/rust-analyzer/demo.ts',
            multiprovider_demo: './packages/demo/multiprovider/demo.ts',
            pylsp_websocket_demo: './packages/demo/websockets-pylsp/client.ts',
            svelte_demo: './packages/demo/websockets-sls/client.ts',
            change_mode_demo: './packages/demo/webworker-change-mode/demo.ts',
            lsp_ai_demo: './packages/demo/websockets-lsp-ai/client.ts',
            file_api_websockets_demo: './packages/demo/file-api-websockets/client.ts',
        },
        mode: "production",
        module: {
            rules: [
                loader, {
                    test: /\.rs$/,
                    use: ['raw-loader']
                }
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
                        from: "packages/demo/*.html",
                        to: "[name][ext]"
                    }, {
                        from: "packages/demo/enable-threads.js",
                        to: "."
                    }, {
                        from: "packages/ace-linters/build",
                        to: "build"
                    }
                ]
            })
        ]
    };
};
