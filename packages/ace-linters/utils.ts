export function mergeObjects(obj1, obj2) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    const mergedObjects = {};
    for (const key of [...Object.keys(obj1), ...Object.keys(obj2)]) {
        if (obj1[key] && obj2[key]) {
            if (Array.isArray(obj1[key])) {
                mergedObjects[key] = obj1[key].concat(obj2[key]);
            } else {
                mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
            }
        } else {
            mergedObjects[key] = obj1[key] ?? obj2[key];
        }
    }
    return mergedObjects;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
