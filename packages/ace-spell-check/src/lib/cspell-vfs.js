import { Buffer } from "buffer";
import Stream from "stream-browserify";
import { cspellVfsEntries } from "./cspell-vfs.generated.js";

const cspellVfsMap = new Map(cspellVfsEntries);
const loadedVfsPackages = new Set();

const vfsStats = {
  isFile: () => true,
  isDirectory: () => false,
  isSymbolicLink: () => false,
};

for (const [entryPath] of cspellVfsEntries) {
  const packageName = packageNameFromVfsPath(entryPath);
  if (packageName) {
    loadedVfsPackages.add(packageName);
  }
}

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
  value = value.replace(/\\/g, "/");
  const drivePrefixedVfs = value.match(/^[A-Za-z]:\/(__cspell_vfs\/.*)$/);
  if (drivePrefixedVfs) {
    value = `/${drivePrefixedVfs[1]}`;
  }
  if (value.startsWith("/__cspell_vfs/")) {
    try {
      value = decodeURIComponent(value);
    } catch {
      // ignore and keep original value
    }
  }
  return value;
}

function cspellVfsUrlToLocalPath(pathLike) {
  if (pathLike === undefined || pathLike === null) return undefined;
  const value = `${pathLike}`;
  if (!value.startsWith("cspell-vfs://")) return undefined;
  try {
    const url = new URL(value);
    const host = decodeURIComponent(url.host || "");
    const pathname = decodeURIComponent(url.pathname || "");
    const slashPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const suffix = host ? `/${host}${slashPath}` : slashPath;
    return normalizePath(`/__cspell_vfs${suffix}`);
  } catch {
    return undefined;
  }
}

function candidateKeys(pathLike) {
  const key = normalizePath(pathLike);
  if (!key) return [];
  const fromCspellVfs = cspellVfsUrlToLocalPath(pathLike);
  const keys = new Set();
  keys.add(key);
  if (fromCspellVfs) {
    keys.add(fromCspellVfs);
  }
  for (const candidate of Array.from(keys)) {
    const lower = candidate.toLowerCase();
    if (lower !== candidate) {
      keys.add(lower);
    }
  }
  return Array.from(keys);
}

export function packageNameFromVfsPath(pathLike) {
  const localFromCspellVfs = cspellVfsUrlToLocalPath(pathLike);
  if (localFromCspellVfs) {
    const localMatch = localFromCspellVfs.match(/^\/__cspell_vfs\/((?:@[^/]+\/)?[^/]+)\//);
    if (localMatch) {
      return localMatch[1];
    }
  }
  const key = normalizePath(pathLike);
  const cspellVfsMatch = key.match(/^cspell-vfs:\/\/\/((?:@[^/]+\/)?[^/]+)\//);
  if (cspellVfsMatch) {
    return cspellVfsMatch[1];
  }
  const localVfsMatch = key.match(/^\/__cspell_vfs\/((?:@[^/]+\/)?[^/]+)\//);
  return localVfsMatch ? localVfsMatch[1] : undefined;
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

export function isVfsPackageLoaded(packageName) {
  return loadedVfsPackages.has(packageName);
}

export function markVfsPackageLoaded(packageName) {
  if (!packageName) return;
  loadedVfsPackages.add(packageName);
}

export function registerVfsEntries(entries) {
  if (!Array.isArray(entries)) return 0;

  let added = 0;
  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const key = normalizePath(entry[0]);
    const value = entry[1];
    if (!key || typeof value !== "string") continue;
    if (!cspellVfsMap.has(key)) {
      added += 1;
    }
    cspellVfsMap.set(key, value);
    const packageName = packageNameFromVfsPath(key);
    if (packageName) {
      loadedVfsPackages.add(packageName);
    }
  }
  return added;
}
