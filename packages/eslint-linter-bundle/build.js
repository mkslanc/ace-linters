import {fileURLToPath} from 'url';
import {build} from 'esbuild';
import {copyFile} from "fs";

await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    logLevel: 'info',
    outdir: './dist',
    sourcemap: false,
    format: 'esm',
    target: ['es2019'],
    plugins: [
        {
            name: 'alias',
            setup({
                      onResolve,
                      resolve
                  }) {
                onResolve({filter: /^path$/}, () => ({
                    path: fileURLToPath(new URL('../../node_modules/path-browserify/index.js', import.meta.url)),
                    external: false,
                    sideEffects: false
                }));
            }
        }
    ]
});

await copyFile(fileURLToPath(new URL("dist/index.js", import.meta.url)), fileURLToPath(new URL("../ace-linters/src/services/javascript/lib/index.js", import.meta.url)), (err) => {
    if (err) throw err;
});
