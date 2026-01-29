import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import {nodePolyfills} from "vite-plugin-node-polyfills";

// Plugin to handle .rs files as raw text (replaces webpack raw-loader)
function rawLoader(extensions: string[]): Plugin {
  return {
    name: 'vite-plugin-raw-loader',
    transform(_code, id) {
      const ext = extensions.find((e) => id.endsWith(e));
      if (ext) {
        const content = readFileSync(id, 'utf-8');
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: null,
        };
      }
    },
  };
}

// Plugin to redirect root to demo index
function devServerRedirect(): Plugin {
  return {
    name: 'vite-plugin-dev-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          res.writeHead(302, { Location: '/packages/demo/index.html' });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: false,

  build: {
    sourcemap: 'inline',
    minify: false,
    outDir: 'build',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'packages/demo/index.html'),
        default_services: resolve(__dirname, 'packages/demo/default_services.html'),
        webworker: resolve(__dirname, 'packages/demo/webworker.html'),
        websocket: resolve(__dirname, 'packages/demo/websocket.html'),
        rust_analyzer: resolve(__dirname, 'packages/demo/rust_analyzer.html'),
        multiprovider: resolve(__dirname, 'packages/demo/multiprovider.html'),
        svelte: resolve(__dirname, 'packages/demo/svelte.html'),
        change_mode: resolve(__dirname, 'packages/demo/change_mode.html'),
        'lsp-ai': resolve(__dirname, 'packages/demo/lsp-ai.html'),
        'file-api-websockets': resolve(__dirname, 'packages/demo/file-api-websockets.html'),
        'pylsp-websocket': resolve(__dirname, 'packages/demo/pylsp-websocket.html'),
        copilot: resolve(__dirname, 'packages/demo/copilot.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  esbuild: {
    target: 'es2019',
  },

  server: {
    port: 9000,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  preview: {
    port: 9000,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  worker: {
    format: 'es',
  },

  plugins: [
    devServerRedirect(),
    rawLoader(['.rs']),
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream', 'path', 'events'],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'packages/demo/enable-threads.js',
          dest: '.',
        },
        {
          src: 'packages/ace-linters/build/*',
          dest: 'build',
        },
      ],
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: [
      // Map ace-linters/src/* to actual source files
      { find: /^ace-linters\/src\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-linters/src/$1.ts') },
      // Map ace-linters/build/* to source for dev mode - explicit mappings due to non-uniform paths
      { find: /^ace-linters\/build\/service-manager(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/service-manager.ts') },
      { find: /^ace-linters\/build\/html-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/html/html-service.ts') },
      { find: /^ace-linters\/build\/css-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/css/css-service.ts') },
      { find: /^ace-linters\/build\/json-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/json/json-service.ts') },
      { find: /^ace-linters\/build\/lua-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/lua/lua-service.ts') },
      { find: /^ace-linters\/build\/typescript-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/typescript/typescript-service.ts') },
      { find: /^ace-linters\/build\/yaml-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/yaml/yaml-service.ts') },
      { find: /^ace-linters\/build\/xml-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/xml/xml-service.ts') },
      { find: /^ace-linters\/build\/php-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/php/php-service.ts') },
      { find: /^ace-linters\/build\/javascript-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/javascript/javascript-service.ts') },
      { find: /^ace-linters\/build\/base-service(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/base-service.ts') },
      { find: /^ace-linters\/build\/language-client(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/services/language-client.ts') },
      { find: /^ace-linters\/build\/ace-language-client(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/ace-language-client.ts') },
      { find: /^ace-linters\/build\/ace-linters(\.js)?$/, replacement: resolve(__dirname, 'packages/ace-linters/src/index.ts') },
      // Map ace-linters main entry
      { find: 'ace-linters', replacement: resolve(__dirname, 'packages/ace-linters/src/index.ts') },
      // Map other workspace linter packages to source for dev
      { find: /^ace-zig-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-zig-linter/src/$1.ts') },
      { find: /^ace-lua-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-lua-linter/src/$1.ts') },
      { find: /^ace-clang-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-clang-linter/src/$1.ts') },
      { find: /^ace-dart-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-dart-linter/src/$1.ts') },
      { find: /^ace-go-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-go-linter/src/$1.ts') },
      { find: /^ace-sql-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-sql-linter/src/$1.ts') },
      { find: /^ace-python-ruff-linter\/build\/(.*)$/, replacement: resolve(__dirname, 'packages/ace-python-ruff-linter/src/$1.ts') },
    ],
  },

  optimizeDeps: {
    include: ['ace-code', 'ace-layout'],
    exclude: [
      '@wasm-fmt/zig_fmt',
      '@wasm-fmt/clang-format',
      '@wasm-fmt/dart_fmt',
      '@wasm-fmt/gofmt',
      '@wasm-fmt/lua_fmt',
      '@astral-sh/ruff-wasm-web',
    ],
  },
});
