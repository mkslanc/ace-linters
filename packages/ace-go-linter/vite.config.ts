import {defineConfig} from 'vite';
import {resolve} from 'path';
import {suppressMetaWarningPlugin, umd2Plugin} from "../../tools/vite-helpers";

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/ace-go-linter.ts'),
      name: 'AceGoLinter',
      formats: ['umd'],
      fileName: () => 'ace-go-linter.js',
    },
    rollupOptions: {
      external: [
        /^ace-code/,
        /^ace-builds/,
      ],
      output: {
        exports: 'named',
        globals: {
          'ace-code': 'ace',
          'ace-builds': 'ace',
        },
      },
    },
  },

  esbuild: {
    target: 'es2019',
  },

  optimizeDeps: {
    exclude: ['@wasm-fmt/gofmt'],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  worker: {
    format: 'es',
  },

  plugins: [
    umd2Plugin(), suppressMetaWarningPlugin()
  ],
});
