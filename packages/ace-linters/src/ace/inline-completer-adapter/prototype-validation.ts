export function validateAcePrototypes(InlineAutocomplete,
                                      CommandBarTooltip,
                                      CompletionProvider,) {
    const proto = InlineAutocomplete.prototype;
    const required = [
        "detach",
        "destroy",
        "show",
        "getCompletionProvider",
        "getInlineTooltip"
    ];
    for (const method of required) {
        if (typeof proto[method] !== "function") {
            throw new Error(`InlineAutocomplete.prototype missing method: ${method}`);
        }
    }

    const cbProto = CommandBarTooltip.prototype;
    ["registerCommand", "setAlwaysShow", "getAlwaysShow"].forEach(method => {
        if (typeof cbProto[method] !== "function") {
            throw new Error(`CommandBarTooltip.prototype missing method: ${method}`);
        }
    });

    if (typeof CompletionProvider.prototype.gatherCompletions !== "function") {
        throw new Error("CompletionProvider.prototype missing method: gatherCompletions");
    }
}