import {defineConfig} from 'vite';
import {resolve} from 'path';
import {suppressMetaWarningPlugin, umd2Plugin} from "../../tools/vite-helpers";

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/ace-clang-linter.ts"),
      name: "AceClangLinter",
      formats: ["umd"],
      fileName: () => "ace-clang-linter.js",
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
    exclude: ["@wasm-fmt/clang-format"],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  worker: {
    format: "es",
  },

  plugins: [umd2Plugin(), suppressMetaWarningPlugin()],
});
