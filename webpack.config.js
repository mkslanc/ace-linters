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
            simple: './packages/demo/demo.ts'
        },
        mode: "production",
        module: {
            rules: [
                { // we need to use this deprecated in webpack5 loader due to https://github.com/webpack/webpack/issues/12719
                    test: /\.worker\.ts$/,
                    loader: 'worker-loader'
                }, loader, {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
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
            minimize: true
        },
        devServer: {
            compress: true,
            port: 9000,
            client: {
                overlay: false
            }
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "packages/demo/index.html",
                        to: "."
                    }
                ]
            })
        ]
    };
};