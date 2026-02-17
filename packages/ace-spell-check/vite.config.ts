import {defineConfig, Plugin} from 'vite';
import {resolve} from 'path';

function umd2Plugin(): Plugin {
  return {
    name: 'umd2-global-exports',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.code) {
          chunk.code = chunk.code.replace(
            /factory\((global\d*)\.[\w]+ = \{\}\)/g,
            'factory($1)'
          );
          chunk.code = chunk.code.replace(
            /process\.umask = function\(\) \{\s*return 0;\s*\};/g,
            `process.umask = function() {
		return 0;
	};
	if (!process.execPath) process.execPath = "/browser";
	if (!process.execArgv) process.execArgv = [];
	if (!process.arch) process.arch = "browser";
	if (!process.platform) process.platform = "browser";
	if (!process.pid) process.pid = 1;
	if (typeof process.emitWarning !== "function") process.emitWarning = function() {};`
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
      entry: resolve(__dirname, 'src/ace-spell-check.ts'),
      name: 'AceSpellCheck',
      formats: ['umd'],
      fileName: () => 'ace-spell-check.js',
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
    // exclude: ['@wasm-fmt/some-wasm-package'], // Uncomment if using WASM
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  worker: {
    format: 'es',
  },

  plugins: [
    umd2Plugin(),
  ],
});
