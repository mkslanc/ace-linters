import {defineConfig, Plugin} from 'vite';
import {resolve} from 'path';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

function umd2Plugin(): Plugin {
  return {
    name: 'umd2-global-exports',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.code) {
          // Replace the UMD wrapper to export directly to global instead of namespace
          chunk.code = chunk.code.replace(
            /factory\((global\d*)\.[\w]+ = \{\}\)/g,
            'factory($1)'
          );
        }
      }
    },
  };
}

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
    nodePolyfills(),
    umd2Plugin(),
  ],
});
