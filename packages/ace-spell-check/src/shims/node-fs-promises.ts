type AnyArgs = readonly unknown[];
import { readVfsFile, statVfsFile } from '../lib/cspell-vfs.js';

function unavailable(apiName: string): never {
  throw new Error(`[ace-spell-check] ${apiName} is not available in browser builds.`);
}

export async function readFile(pathLike: unknown, options?: { encoding?: string } | string): Promise<unknown> {
  const encoding = typeof options === 'string' ? options : options?.encoding;
  const content = await readVfsFile(pathLike, encoding);
  if (content !== undefined) return content;
  return unavailable('fs.promises.readFile');
}

export async function writeFile(..._args: AnyArgs): Promise<void> {
  return unavailable('fs.promises.writeFile');
}

export async function mkdir(..._args: AnyArgs): Promise<void> {
  return unavailable('fs.promises.mkdir');
}

export async function stat(pathLike: unknown): Promise<{ isFile: () => boolean; isDirectory: () => boolean }> {
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
