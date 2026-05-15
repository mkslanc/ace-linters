import Stream from 'stream-browserify';
import {
  createVfsReadStream,
  hasVfsFile,
  readVfsFile,
  readVfsFileSync,
  realpathVfs,
  statVfsFile,
} from '../lib/cspell-vfs.js';
const unavailableError = (apiName) => new Error(`[ace-spell-check] ${apiName} is not available in browser builds.`);

const fakeStats = {
  isFile: () => false,
  isDirectory: () => false,
  isSymbolicLink: () => false,
};

export const constants = {};

export const promises = {
  async readFile(pathLike, options) {
    const encoding = typeof options === 'string' ? options : options?.encoding;
    const content = await readVfsFile(pathLike, encoding);
    if (content !== undefined) return content;
    throw unavailableError('fs.promises.readFile');
  },
  async writeFile() {
    throw unavailableError('fs.promises.writeFile');
  },
  async mkdir() {
    throw unavailableError('fs.promises.mkdir');
  },
  async readdir() {
    return [];
  },
  async stat(pathLike) {
    const stat = statVfsFile(pathLike);
    if (stat) return stat;
    throw unavailableError('fs.promises.stat');
  },
  async realpath(pathLike) {
    return realpathVfs(pathLike);
  },
};

export function existsSync(pathLike) {
  return hasVfsFile(pathLike);
}

export function readFileSync(pathLike, options) {
  const encoding = typeof options === 'string' ? options : options?.encoding;
  const content = readVfsFileSync(pathLike, encoding);
  if (content !== undefined) return content;
  throw unavailableError('fs.readFileSync');
}

export function writeFileSync() {
  throw unavailableError('fs.writeFileSync');
}

export function readdirSync() {
  return [];
}

export function statSync(_path, options) {
  const stat = statVfsFile(_path);
  if (stat) return stat;
  if (options && options.throwIfNoEntry === false) {
    return undefined;
  }
  return fakeStats;
}

export function realpathSync(pathLike) {
  return realpathVfs(pathLike);
}

export function toNamespacedPath(pathLike) {
  return realpathVfs(pathLike);
}

export function createWriteStream() {
  return new Stream.PassThrough();
}

export function createReadStream(pathLike) {
  return createVfsReadStream(pathLike) || new Stream.PassThrough();
}

export default {
  constants,
  promises,
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  realpathSync,
  toNamespacedPath,
  createWriteStream,
  createReadStream,
};
