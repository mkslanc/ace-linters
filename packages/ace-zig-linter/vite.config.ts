import {defineConfig} from 'vite';
import {resolve} from 'path';
import {suppressMetaWarningPlugin, umd2Plugin} from "../../tools/vite-helpers";

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/ace-zig-linter.ts'),
      name: 'AceZigLinter',
      formats: ['umd'],
      fileName: () => 'ace-zig-linter.js',
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

  // Handle WASM files
  optimizeDeps: {
    exclude: ['@wasm-fmt/zig_fmt'],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // Worker configuration
  worker: {
    format: 'es',
  },

  plugins: [
    umd2Plugin(), suppressMetaWarningPlugin()
  ],
});
