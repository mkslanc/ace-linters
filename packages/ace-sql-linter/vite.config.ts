import {defineConfig, Plugin} from 'vite';
import {resolve} from 'path';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

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
        }
      }
    },
  };
}

const entries: Record<string, string> = {
  'mysql-service': resolve(__dirname, 'src/mysql-service.ts'),
  'pgsql-service': resolve(__dirname, 'src/pgsql-service.ts'),
  'flinksql-service': resolve(__dirname, 'src/flinksql-service.ts'),
  'hivesql-service': resolve(__dirname, 'src/hivesql-service.ts'),
  'impalasql-service': resolve(__dirname, 'src/impalasql-service.ts'),
  'sparksql-service': resolve(__dirname, 'src/sparksql-service.ts'),
  'trinosql-service': resolve(__dirname, 'src/trinosql-service.ts'),
};

export {entries};

const entryName = process.env.ENTRY || 'mysql-service';
const entry = entries[entryName];

if (!entry) {
  throw new Error(`Unknown entry: ${entryName}. Available: ${Object.keys(entries).join(', ')}`);
}

function toUmdIdentifier(name: string) {
  return name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());
}

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: false,
    emptyOutDir: false,
    lib: {
      entry,
      name: toUmdIdentifier(entryName),
      formats: ['umd'],
      fileName: () => `${entryName}.js`,
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

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  worker: {
    format: 'es',
  },

  plugins: [
    nodePolyfills(),
    umd2Plugin(),
  ],
});
