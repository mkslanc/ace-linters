import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';

function umd2Plugin(): Plugin {
  return {
    name: 'umd2-global-exports',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.code) {
          // Replace the UMD wrapper to export directly to global instead of namespace
          chunk.code = chunk.code.replace(
            /factory\(global\.[\w]+ = \{\}\)/g,
            'factory(global)'
          );
        }
      }
    },
  };
}

const entries: Record<string, string> = {
  'ace-linters': resolve(__dirname, 'src/index.ts'),
  'service-manager': resolve(__dirname, 'src/services/service-manager.ts'),
  'html-service': resolve(__dirname, 'src/services/html/html-service.ts'),
  'css-service': resolve(__dirname, 'src/services/css/css-service.ts'),
  'json-service': resolve(__dirname, 'src/services/json/json-service.ts'),
  'lua-service': resolve(__dirname, 'src/services/lua/lua-service.ts'),
  'typescript-service': resolve(__dirname, 'src/services/typescript/typescript-service.ts'),
  'yaml-service': resolve(__dirname, 'src/services/yaml/yaml-service.ts'),
  'xml-service': resolve(__dirname, 'src/services/xml/xml-service.ts'),
  'php-service': resolve(__dirname, 'src/services/php/php-service.ts'),
  'ace-language-client': resolve(__dirname, 'src/ace-language-client.ts'),
  'javascript-service': resolve(__dirname, 'src/services/javascript/javascript-service.ts'),
  'base-service': resolve(__dirname, 'src/services/base-service.ts'),
  'language-client': resolve(__dirname, 'src/services/language-client.ts'),
};

export { entries };

const entryName = process.env.ENTRY || 'ace-linters';
const entry = entries[entryName];

if (!entry) {
  throw new Error(`Unknown entry: ${entryName}. Available: ${Object.keys(entries).join(', ')}`);
}

const isProduction = process.env.NODE_ENV === 'production';

function toUmdIdentifier(name: string) {
  return name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());
}

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: isProduction ? false : 'inline',
    minify: false,
    emptyOutDir: false,
    lib: {
      entry,
      name: toUmdIdentifier(entryName),
      formats: ['umd'],
      fileName: () => `${entryName}.js`,
    },
    rollupOptions: {
      external: [/^ace-code/, /^ace-builds/],
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

  plugins: [
    commonjs({
      include: [/src\/services\/.*\/lib\/.*/],
    }),
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream', 'path', 'events'],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
    umd2Plugin(),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  worker: {
    format: 'es',
  },
});
