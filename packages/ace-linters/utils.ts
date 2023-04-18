export function mergeObjects(obj1, obj2) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;

    const mergedObjects = { ...obj2, ...obj1 }; // Give priority to obj1 values by spreading obj2 first, then obj1

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

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
