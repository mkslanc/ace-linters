"use strict";
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
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
        cache: false,
        devtool: isProduction ? false : 'inline-source-map',
        entry: {
            "ace-linters": './index.ts',
            "service-manager": './services/service-manager.ts'
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
            publicPath: 'auto',
            library: {
                type: "umd2"
            }
        },
        optimization: {
            minimize: false //isProduction // runtimeChunk: 'single',
        }
    };
};
