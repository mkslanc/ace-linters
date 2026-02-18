import pathBrowserify from '../../../../node_modules/path-browserify/index.js';

type PatchedPath = typeof pathBrowserify & {
  win32: typeof pathBrowserify;
  posix: typeof pathBrowserify;
};

const patchedPath = pathBrowserify as PatchedPath;

// cspell's FileUrlBuilder always touches Path.win32.normalize for diagnostics.
patchedPath.win32 = patchedPath.win32 || pathBrowserify;
patchedPath.posix = patchedPath.posix || pathBrowserify;

export const {
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  dirname,
  basename,
  extname,
  format,
  parse,
  sep,
  delimiter,
  win32,
  posix,
} = patchedPath;

export default patchedPath;
