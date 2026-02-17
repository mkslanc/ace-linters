import { Buffer } from "buffer";
import Stream from "stream-browserify";
import { cspellVfsMap } from "./cspell-vfs.generated.js";

const vfsStats = {
  isFile: () => true,
  isDirectory: () => false,
  isSymbolicLink: () => false,
};

function normalizePath(pathLike) {
  if (pathLike === undefined || pathLike === null) return "";
  let value = `${pathLike}`;
  if (value.startsWith("file://")) {
    try {
      const url = new URL(value);
      value = decodeURIComponent(url.pathname || "");
      if (/^\/[A-Za-z]:\//.test(value)) {
        value = value.slice(1);
      }
    } catch {
      // ignore and keep original value
    }
  }
  return value.replace(/\\/g, "/");
}

function candidateKeys(pathLike) {
  const key = normalizePath(pathLike);
  if (!key) return [];
  return key === key.toLowerCase() ? [key] : [key, key.toLowerCase()];
}

function findEntry(pathLike) {
  for (const key of candidateKeys(pathLike)) {
    const value = cspellVfsMap.get(key);
    if (value !== undefined) return { key, value };
  }
  return undefined;
}

function decodeBase64(base64, encoding) {
  const bytes = Buffer.from(base64, "base64");
  if (!encoding) return bytes;
  return bytes.toString(encoding);
}

export function hasVfsFile(pathLike) {
  return !!findEntry(pathLike);
}

export function readVfsFileSync(pathLike, encoding) {
  const entry = findEntry(pathLike);
  if (!entry) return undefined;
  return decodeBase64(entry.value, encoding);
}

export async function readVfsFile(pathLike, encoding) {
  return readVfsFileSync(pathLike, encoding);
}

export function statVfsFile(pathLike) {
  const entry = findEntry(pathLike);
  if (!entry) return undefined;
  const size = Buffer.from(entry.value, "base64").byteLength;
  return { ...vfsStats, size };
}

export function createVfsReadStream(pathLike) {
  const content = readVfsFileSync(pathLike);
  if (!content) return undefined;
  const stream = new Stream.PassThrough();
  stream.end(content);
  return stream;
}

export function realpathVfs(pathLike) {
  const entry = findEntry(pathLike);
  return entry ? entry.key : `${pathLike ?? ""}`;
}
