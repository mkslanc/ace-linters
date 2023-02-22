function format(message, args) {
    return args.length === 0 ? message : message.replace(/{(\d+)}/g, (match, rest) => {
        const [index] = rest;
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

function localize(key, message, ...args) {
    return format(message, args);
}

export function loadMessageBundle() {
    return localize;
}

export function config() {
    return loadMessageBundle;
}
