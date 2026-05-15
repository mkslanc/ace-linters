import {defineConfig} from 'vite';
import {resolve} from 'path';
import {suppressMetaWarningPlugin, umd2Plugin} from "../../tools/vite-helpers";

export default defineConfig({
    build: {
        outDir: "build",
        sourcemap: false,
        minify: false,
        lib: {
            entry: resolve(__dirname, "src/ace-dart-linter.ts"),
            name: "AceDartLinter",
            formats: ["umd"],
            fileName: () => "ace-dart-linter.js",
        },
        rollupOptions: {
            external: [/^ace-code/, /^ace-builds/],
            output: {
                exports: "named",
                globals: {
                    "ace-code": "ace",
                    "ace-builds": "ace",
                },
            },
        },
    },

    esbuild: {
        target: "es2019",
    },

    optimizeDeps: {
        exclude: ["@wasm-fmt/dart_fmt", "@wasm-fmt/dart_fmt/dart_fmt_web"],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    worker: {
        format: "es",
    },

    plugins: [suppressMetaWarningPlugin(), umd2Plugin()],
});
