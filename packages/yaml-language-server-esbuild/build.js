import {fileURLToPath} from 'url';

import {build} from 'esbuild';
import {copyFile} from "fs";

await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    logLevel: 'info',
    outdir: './dist',
    format: 'esm',
    sourcemap: false,
    target: ['es2019'],
    plugins: [
        {
            name: 'alias',
            setup({
                      onResolve,
                      resolve
                  }) {
                onResolve({filter: /\/schemaSelectionHandlers$/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/schemaSelectionHandlers.js', import.meta.url))
                }));
                onResolve({filter: /^ajv$/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/ajv.js', import.meta.url))
                }));
                onResolve({filter: /^path$/}, () => ({
                    path: fileURLToPath(new URL('../../node_modules/path-browserify/index.js', import.meta.url)),
                    external: false,
                    sideEffects: false
                }));
                onResolve({filter: /^prettier/}, ({path}) => ({
                    path: path === 'prettier' ? fileURLToPath(new URL('../../node_modules/prettier/standalone.js', import.meta.url)) : fileURLToPath(new URL('../../node_modules/' + path + '.js', import.meta.url)), //path === 'prettier' ? 'prettier/standalone.js' : `${path}.js`,
                    external: false,
                    sideEffects: false
                }));
                onResolve({filter: /vscode-nls/}, () => ({
                    path: fileURLToPath(new URL('src/fillers/vscode-nls.js', import.meta.url)),
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

await copyFile(fileURLToPath(new URL("dist/index.js", import.meta.url)), fileURLToPath(new URL("../ace-linters/src/services/yaml/lib/index.js", import.meta.url)), (err) => {
    if (err) throw err;
});
await copyFile(fileURLToPath(new URL("src/index.ts", import.meta.url)), fileURLToPath(new URL("../ace-linters/src/services/yaml/lib/index.d.ts", import.meta.url)), (err) => {
    if (err) throw err;
});
