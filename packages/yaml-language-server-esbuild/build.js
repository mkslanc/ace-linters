import {fileURLToPath} from 'url';

import {build} from 'esbuild';

await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    external: [
        "jsonc-parser", "path-browserify", "prettier", "vscode-languageserver-textdocument"
    ],
    logLevel: 'info',
    outdir: './dist',
    sourcemap: true,
    format: 'esm',
    target: ['es2019'],
    plugins: [
        {
            name: 'alias',
            setup({
                      onResolve,
                      resolve
                  }) {
                onResolve({filter: /\/schemaSelectionHandlers$/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/schemaSelectionHandlers.ts', import.meta.url))
                }));
                onResolve({filter: /^ajv$/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/ajv.ts', import.meta.url))
                }));
                onResolve({filter: /^path$/}, () => ({
                    path: 'path-browserify',
                    external: true,
                    sideEffects: false
                }));
                onResolve({filter: /^prettier/}, ({path}) => ({
                    path: path === 'prettier' ? 'prettier/standalone.js' : `${path}.js`,
                    external: true,
                    sideEffects: false
                }));
                onResolve({filter: /vscode-nls/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/vscode-nls.ts', import.meta.url)),
                    sideEffects: false
                }));
                onResolve({filter: /\/umd\//}, ({
                                                    path,
                                                    ...options
                                                }) => resolve(path.replace(/\/umd\//, '/esm/'), options));
                onResolve({filter: /.*/}, () => ({sideEffects: false}));
            }
        }
    ]
});
