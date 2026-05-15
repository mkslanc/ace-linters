import type {InlineAutocomplete} from "ace-code/src/ext/inline_autocomplete";
import type {Ace} from "ace-code";
import type {CommandBarTooltip} from "ace-code/src/ext/command_bar";
import type {CompletionProvider} from "ace-code/src/autocomplete";
import {validateAcePrototypes} from "./inline-completer-adapter/prototype-validation";

export function createInlineCompleterAdapter(OriginalInlineAutocomplete: typeof InlineAutocomplete, OriginalCommandBarTooltip: typeof CommandBarTooltip, OriginalCompletionProvider: typeof CompletionProvider) {
    validateAcePrototypes(OriginalInlineAutocomplete, OriginalCommandBarTooltip, OriginalCompletionProvider);

    var destroyCompleter = function (e, editor: Ace.Editor) {
        editor.inlineCompleter && editor.inlineCompleter.destroy();
    };

    class InlineCompletionProvider extends OriginalCompletionProvider {
        gatherCompletions(editor, callback) {
            var session = editor.getSession();
            var pos = editor.getCursorPosition();

            var prefix = getCompletionPrefix(editor);

            var matches = [];
            this.completers = editor.inlineCompleters;
            var total = editor.inlineCompleters.length;
            editor.inlineCompleters.forEach(function (completer, i) {
                completer.getCompletions(editor, session, pos, prefix, function (err, results) {
                    if (completer.hideInlinePreview)
                        results = results.map((result) => {
                            return Object.assign(result, {hideInlinePreview: completer.hideInlinePreview});
                        });

                    if (!err && results)
                        matches = matches.concat(results);
                    // Fetch prefix again, because they may have changed by now
                    callback(null, {
                        prefix: getCompletionPrefix(editor),
                        matches: matches,
                        finished: (--total === 0)
                    });
                });
            });
            return true;
        }
    }

    class InlineCompleter extends OriginalInlineAutocomplete {
        getCompletionProvider(initialPosition) {
            if (!this.completionProvider)
                this.completionProvider = new InlineCompletionProvider(initialPosition);
            return this.completionProvider;
        }

        show(options) {
            this.activated = true;
            if (this.editor.inlineCompleter !== this) {
                if (this.editor.inlineCompleter) {
                    this.editor.inlineCompleter.detach();
                }
                this.editor.inlineCompleter = this;
            }
            // @ts-ignore
            this.editor.on("changeSelection", this.changeListener);
            this.editor.on("blur", this.blurListener);
            this.updateCompletions(options);
        }

        destroy() {
            this.detach();
            if (this.inlineRenderer)
                this.inlineRenderer.destroy();
            if (this.inlineTooltip)
                this.inlineTooltip.destroy();
            if (this.editor && this.editor.inlineCompleter == this) {
                // @ts-ignore
                this.editor.off("destroy", destroyCompleter);
                this.editor.inlineCompleter = null;
            }
            // @ts-ignore
            this.inlineTooltip = this.editor = this.inlineRenderer = null;
        }

        static for(editor) {
            if (editor.inlineCompleter instanceof InlineCompleter) {
                return editor.inlineCompleter;
            }


            if (editor.inlineCompleter) {
                editor.inlineCompleter.destroy();
                editor.inlineCompleter = null;
            }
            editor.inlineCompleter = new InlineCompleter(editor);
            editor.once("destroy", destroyCompleter);
            return editor.inlineCompleter;
        }

        getInlineTooltip() {
            if (!this.inlineTooltip) {
                this.inlineTooltip = InlineCompleter.createInlineTooltip(document.body || document.documentElement);
            }
            return this.inlineTooltip;
        }

        static createInlineTooltip(parentEl) {
            var inlineTooltip = new OriginalCommandBarTooltip(parentEl);
            inlineTooltip.registerCommand("Previous",
                // @ts-expect-error
                Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Previous"], {
                    enabled: true,
                    type: "button",
                    iconCssClass: "ace_arrow_rotated"
                })
            );
            inlineTooltip.registerCommand("Position", {
                enabled: false,
                getValue: function (editor) {
                    return editor ? [
                        editor.inlineCompleter.getIndex() + 1, editor.inlineCompleter.getLength()
                    ].join("/") : "";
                },
                type: "text",
                cssClass: "completion_position"
            });
            inlineTooltip.registerCommand("Next",
                // @ts-expect-error
                Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Next"], {
                    enabled: true,
                    type: "button",
                    iconCssClass: "ace_arrow"
                })
            );
            inlineTooltip.registerCommand("Accept",
                // @ts-expect-error
                Object.assign({}, OriginalInlineAutocomplete.prototype.commands["Accept"], {
                    enabled: function (editor) {
                        return !!editor && editor.inlineCompleter.getIndex() >= 0;
                    },
                    type: "button"
                })
            );
            inlineTooltip.registerCommand("ShowTooltip", {
                name: "Always Show Tooltip",
                exec: function () {
                    inlineTooltip.setAlwaysShow(!inlineTooltip.getAlwaysShow());
                },
                enabled: true,
                getValue: function () {
                    return inlineTooltip.getAlwaysShow();
                },
                type: "checkbox"
            });
            return inlineTooltip;
        };

        updateCompletions(options) {
            if (options && options.matches) {
                var pos = this.editor.getSelectionRange().start;
                this.base = this.editor.session.doc.createAnchor(pos.row, pos.column);
                this.base["$insertRight"] = true;
                this.completions = new FilteredList(options.matches);
                //@ts-expect-error TODO: potential wrong arguments
                return this.$open(this.editor, "");
            }

            if (this.base && this.completions) {
                //@ts-expect-error
                this.$updatePrefix();
            }

            var session = this.editor.getSession();
            var pos = this.editor.getCursorPosition();
            var prefix = getCompletionPrefix(this.editor);
            this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
            //@ts-expect-error
            this.base.$insertRight = true;

            // @ts-ignore
            var options = {
                exactMatch: true,
                ignoreCaption: true
            };
            this.getCompletionProvider({
                prefix,
                base: this.base,
                pos
                // @ts-ignore
            }).provideCompletions(this.editor, options,
                /**
                 * @this {InlineAutocomplete}
                 */
                function(err, completions, finished) {
                    var filtered = completions.filtered;
                    var prefix = getCompletionPrefix(this.editor);

                    if (finished) {
                        // No results
                        if (!filtered.length)
                            return this.detach();

                        // One result equals to the prefix
                        if (filtered.length == 1 && filtered[0].value == prefix && !filtered[0].snippet)
                            return this.detach();
                    }
                    this.completions = completions;
                    this.$open(this.editor, prefix);
                }.bind(this));
        }
    }

    OriginalInlineAutocomplete.prototype.commands["Previous"].exec = (editor) => {
        editor.inlineCompleter.goTo("prev");
    };
    OriginalInlineAutocomplete.prototype.commands["Next"].exec = (editor) => {
        editor.inlineCompleter.goTo("next");
    };
    OriginalInlineAutocomplete.prototype.commands["Accept"].exec = (editor) => {
        return editor.inlineCompleter.insertMatch();
    };
    OriginalInlineAutocomplete.prototype.commands["Close"].exec = (editor) => {
        editor.inlineCompleter.detach();
    };

    var doLiveAutocomplete = function (e) {
        var editor = e.editor;
        var hasCompleter = editor.inlineCompleter && editor.inlineCompleter.activated;

        // We don't want to autocomplete with no prefix
        if (e.command.name === "backspace") {
            if (hasCompleter && !getCompletionPrefix(editor))
                editor.inlineCompleter.detach();
        } else if (e.command.name === "insertstring" && !hasCompleter) {
            lastExecEvent = e;
            var delay = e.editor.$liveAutocompletionDelay;
            if (delay) {
                liveAutocompleteTimer.delay(delay);
            } else {
                showLiveAutocomplete(e);
            }
        }
    };

    var lastExecEvent;
    var liveAutocompleteTimer = new DelayedCall(function () {
        showLiveAutocomplete(lastExecEvent);
    }, 0);

    var showLiveAutocomplete = (e) => {
        var editor = e.editor;
        var prefix = getCompletionPrefix(editor);
        // Only autocomplete if there's a prefix that can be matched or previous char is trigger character
        var previousChar = e.args;
        var triggerAutocomplete = triggerAutocompleteFunc(editor, previousChar);
        if (prefix && prefix.length >= editor.$liveAutocompletionThreshold || triggerAutocomplete) {
            var completer = InlineCompleter.for(editor);
            // Set a flag for auto shown
            // completer.autoShown = true;
            completer.show({
                exactMatch: false,
                ignoreCaption: false
            });
        }
    };

    const validateAceInlineCompleterWithEditor = (
        editor
    ) => {
        // InlineAutocomplete instance: show(), activated state, destroy, etc.
        let completer: any;
        try {
            completer = InlineCompleter.for(editor);
            completer.show({});
            if (typeof completer.activated !== "boolean") throw new Error("activated property missing or not boolean");
            completer.destroy();
        } catch (e) {
            throw new Error(`InlineAutocomplete runtime validation failed: ${e.message}`);
        }

        // CompletionProvider: instantiate & basic usage
        try {
            const provider = new InlineCompletionProvider();
            if (typeof provider.gatherCompletions !== "function") throw new Error("gatherCompletions missing");
        } catch (e) {
            throw new Error(`CompletionProvider runtime validation failed: ${e.message}`);
        }
    }

    return {InlineCompleter, doLiveAutocomplete, validateAceInlineCompleterWithEditor};
}

function getCompletionPrefix(editor: Ace.Editor): string {
    var pos = editor.getCursorPosition();
    var line = editor.session.getLine(pos.row);
    var prefix;
    if (!editor.inlineCompleters) {
        return "";
    }
    editor.inlineCompleters.forEach(function (completer) {
        if (completer.identifierRegexps) {
            completer.identifierRegexps.forEach(function (identifierRegex) {
                if (!prefix && identifierRegex)
                    prefix = retrievePrecedingIdentifier(line, pos.column, identifierRegex);
            }.bind(this));
        }
    }.bind(this));
    return prefix || retrievePrecedingIdentifier(line, pos.column);
}

var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;

function retrievePrecedingIdentifier(text: string, pos: number, regex?: RegExp) {
    regex = regex || ID_REGEX;
    var buf: string[] = [];
    for (var i = pos - 1; i >= 0; i--) {
        if (regex.test(text[i]))
            buf.push(text[i]);
        else
            break;
    }
    return buf.reverse().join("");
}

function triggerAutocompleteFunc(editor, previousChar) {
    var previousChar = previousChar == null
        ? editor.session.getPrecedingCharacter()
        : previousChar;
    return editor.inlineCompleters.some((completer) => {
        if (completer.triggerCharacters && Array.isArray(completer.triggerCharacters)) {
            return completer.triggerCharacters.includes(previousChar);
        }
    });
}

class DelayedCall {
    timer: any;
    defaultTimeout: any;
    fcn: any;
    private callback: () => void;

    constructor(fcn, defaultTimeout) {
        this.timer = null;
        this.fcn = fcn;
        this.defaultTimeout = defaultTimeout;
        this.callback = () => {
            this.timer = null;
            this.fcn();
        };
    }

    schedule(timeout) {
        if (this.timer == null) {
            this.timer = setTimeout(this.callback, timeout || this.defaultTimeout);
        }
    }

    delay(timeout) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(this.callback, timeout || this.defaultTimeout);
    }

    call() {
        this.cancel();
        this.fcn();
    }

    cancel() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    isPending() {
        return this.timer;
    }
}

class FilteredList {
    all: any;
    filtered: any;
    filterText: string;
    exactMatch: boolean;
    ignoreCaption: boolean;

    constructor(array, filterText?: string) {
        this.all = array;
        this.filtered = array;
        this.filterText = filterText || "";
        this.exactMatch = false;
        this.ignoreCaption = false;
    }

    setFilter(str) {
        if (str.length > this.filterText && str.lastIndexOf(this.filterText, 0) === 0)
            var matches = this.filtered;
        else
            var matches = this.all;

        this.filterText = str;
        matches = this.filterCompletions(matches, this.filterText);
        matches = matches.sort(function(a, b) {
            return b.exactMatch - a.exactMatch || b.$score - a.$score
                || (a.caption || a.value).localeCompare(b.caption || b.value);
        });

        // make unique
        var prev = null;
        matches = matches.filter(function(item){
            var caption = item.snippet || item.caption || item.value;
            if (caption === prev) return false;
            prev = caption;
            return true;
        });

        this.filtered = matches;
    }

    filterCompletions(items, needle) {
        var results: any[] = [];
        var upper = needle.toUpperCase();
        var lower = needle.toLowerCase();
        loop: for (var i = 0, item; item = items[i]; i++) {
            if (item.skipFilter) {
                item.$score = item.score;
                results.push(item);
                continue;
            }
            var caption = (!this.ignoreCaption && item.caption) || item.value || item.snippet;
            if (!caption) continue;
            var lastIndex = -1;
            var matchMask = 0;
            var penalty = 0;
            var index, distance;

            if (this.exactMatch) {
                if (needle !== caption.substr(0, needle.length))
                    continue loop;
            } else {
                /**
                 * It is for situation then, for example, we find some like 'tab' in item.value="Check the table"
                 * and want to see "Check the TABle" but see "Check The tABle".
                 */
                var fullMatchIndex = caption.toLowerCase().indexOf(lower);
                if (fullMatchIndex > -1) {
                    penalty = fullMatchIndex;
                } else {
                    // caption char iteration is faster in Chrome but slower in Firefox, so lets use indexOf
                    for (var j = 0; j < needle.length; j++) {
                        // TODO add penalty on case mismatch
                        var i1 = caption.indexOf(lower[j], lastIndex + 1);
                        var i2 = caption.indexOf(upper[j], lastIndex + 1);
                        index = (i1 >= 0) ? ((i2 < 0 || i1 < i2) ? i1 : i2) : i2;
                        if (index < 0)
                            continue loop;
                        distance = index - lastIndex - 1;
                        if (distance > 0) {
                            // first char mismatch should be more sensitive
                            if (lastIndex === -1)
                                penalty += 10;
                            penalty += distance;
                            matchMask = matchMask | (1 << j);
                        }
                        lastIndex = index;
                    }
                }
            }
            item.matchMask = matchMask;
            item.exactMatch = penalty ? 0 : 1;
            item.$score = (item.score || 0) - penalty;
            results.push(item);
        }
        return results;
    }
}