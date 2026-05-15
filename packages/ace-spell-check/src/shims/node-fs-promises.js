import { readVfsFile, statVfsFile } from '../lib/cspell-vfs.js';

function unavailable(apiName) {
  throw new Error(`[ace-spell-check] ${apiName} is not available in browser builds.`);
}

export async function readFile(pathLike, options) {
  const encoding = typeof options === 'string' ? options : options?.encoding;
  const content = await readVfsFile(pathLike, encoding);
  if (content !== undefined) return content;
  return unavailable('fs.promises.readFile');
}

export async function writeFile(..._args) {
  return unavailable('fs.promises.writeFile');
}

export async function mkdir(..._args) {
  return unavailable('fs.promises.mkdir');
}

export async function stat(pathLike) {
  const stat = statVfsFile(pathLike);
  if (stat) return stat;
  return unavailable('fs.promises.stat');
}

const fsPromises = {
  readFile,
  writeFile,
  mkdir,
  stat,
};

export default fsPromises;
