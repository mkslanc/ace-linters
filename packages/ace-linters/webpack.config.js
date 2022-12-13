"use strict";
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
            provider: './language-provider.ts'
        },
        mode: "production",
        module: {
            rules: [
                loader, {
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
            path: __dirname + '/build',
            libraryTarget: 'commonjs2'
        },
        optimization: {
            minimize: false
        }
    };
};