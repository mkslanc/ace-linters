import type {AceRangeData} from "./types/language-service";

export function mergeObjects(obj1: any, obj2: any, excludeUndefined = false) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    if (excludeUndefined) {
        obj1 = excludeUndefinedValues(obj1);
        obj2 = excludeUndefinedValues(obj2);
    }

    const mergedObjects = {...obj2, ...obj1}; // Give priority to obj1 values by spreading obj2 first, then obj1

    for (const key of Object.keys(mergedObjects)) {
        if (obj1[key] && obj2[key]) {
            if (Array.isArray(obj1[key])) {
                mergedObjects[key] = obj1[key].concat(obj2[key]);
            } else if (Array.isArray(obj2[key])) {
                mergedObjects[key] = obj2[key].concat(obj1[key]);
            } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
            }
        }
    }

    return mergedObjects;
}

function excludeUndefinedValues<T extends object>(obj: T): Partial<T> {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== undefined);
    return Object.fromEntries(filteredEntries) as Partial<T>;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function isEmptyRange(range: AceRangeData): boolean {
    return (range.start.row === range.end.row && range.start.column === range.end.column);
}

//taken with small changes from ace-code
export function mergeRanges(ranges: AceRangeData[]): AceRangeData[] {
    var list = ranges;

    list = list.sort(function (a, b) {
        return comparePoints(a.start, b.start);
    });

    var next = list[0], range;
    for (var i = 1; i < list.length; i++) {
        range = next;
        next = list[i];
        var cmp = comparePoints(range.end, next.start);
        if (cmp < 0) continue;

        if (cmp == 0 && !isEmptyRange(range) && !isEmptyRange(next)) continue;

        if (comparePoints(range.end, next.end) < 0) {
            range.end.row = next.end.row;
            range.end.column = next.end.column;
        }

        list.splice(i, 1);
        next = range;
        i--;
    }

    return list;
}

function comparePoints(p1: {
    row: number,
    column: number
}, p2: {
    row: number,
    column: number
}) {
    return p1.row - p2.row || p1.column - p2.column;
}

export function checkValueAgainstRegexpArray(value: string, regexpArray?: RegExp[]) {
    if (!regexpArray) {
        return false;
    }
    for (let i = 0; i < regexpArray.length; i++) {
        if (regexpArray[i].test(value)) {
            return true;
        }
    }
    return false;
}

/**
 * Converts a given file path to a URI format. If the given file path is already a URI,
 * it normalizes and optionally resolves the path against a workspace URI.
 *
 * @param filePath - The file path to convert to a URI. Can be an absolute path or an existing file URI.
 * @param [joinWorkspaceURI] - Optional flag to determine if the converted URI should be joined with given URI
 * @param [workspaceUri] - The base workspace URI to resolve against if `resolveAgainstWorkspaceURI` is true. Required if resolution is needed.
 * @return {string} - The resulting URI
 */
export function convertToUri(
    filePath: string,
    joinWorkspaceURI = false,
    workspaceUri?: string
): string {
    const isFullUri = filePath.startsWith('file://');

    // Normalize slashes
    const normalized = filePath.replace(/\\/g, '/');

    if (isFullUri) {
        const decodedPath = decodeURIComponent(normalized.replace(/^file:\/\/\/?/, ''));
        if (joinWorkspaceURI && workspaceUri) {
            return joinUri(workspaceUri, decodedPath);
        }
        return normalized.startsWith('file:///') ? normalized : 'file:///' + normalized.slice(7);
    }

    if (joinWorkspaceURI && workspaceUri) {
        return joinUri(workspaceUri, normalized);
    }

    // Absolute file path to URI
    const fullPath = /^[a-zA-Z]:\//.test(normalized)
        ? '/' + normalized // Windows path needs leading slash
        : normalized;

    return 'file://' + encodeLspPath(fullPath);
}


function joinUri(baseUri: string, relativePath: string): string {
    if (!baseUri.startsWith('file://')) {
        throw new Error('workspaceUri must be a file:// URI');
    }

    const basePath = decodeURIComponent(baseUri.replace(/^file:\/\/\/?/, ''));
    const joinedPath = normalizePath(`${basePath}/${relativePath}`);
    return 'file://' + encodeLspPath(joinedPath.startsWith('/') ? joinedPath : '/' + joinedPath);
}

function normalizePath(path: string): string {
    return path
        .replace(/\\/g, '/')
        .replace(/\/{2,}/g, '/')
        .replace(/\/\.\//g, '/')
        .replace(/\/$/, '')
        .replace(/\/[^/]+\/\.\.\//g, '/');
}

function encodeLspPath(path: string): string {
    return path.split('/').map((segment, i) => {
        // Preserve "C:" or other drive letter in second segment
        if (i === 1 && /^[a-zA-Z]:$/.test(segment)) return segment;
        return encodeURIComponent(segment);
    }).join('/');
}