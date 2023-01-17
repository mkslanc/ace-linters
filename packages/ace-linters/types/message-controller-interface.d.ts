import {Ace} from "ace-code";
import {AceLinters} from "./language-service";
import {FormattingOptions} from "vscode-languageserver-protocol";

export interface IMessageController {
    init(sessionId: string, value: string, mode: string, options: any, initCallback: () => void, validationCallback: (annotations: Ace.Annotation[]) => void): void;

    doValidation(sessionId: string, callback?: (annotations: Ace.Annotation[]) => void)

    doComplete(sessionId: string, position: Ace.Point, callback?: (completionList: Ace.Completion[]) => void);

    doResolve(sessionId: string, completion: Ace.Completion, callback?: (completion: Ace.Completion) => void);

    format(sessionId: string, range: Ace.Range, format: FormattingOptions, callback?: (edits: AceLinters.TextEdit[]) => void);

    doHover(sessionId: string, position: Ace.Point, callback?: (hover: AceLinters.Tooltip) => void);

    change(sessionId: string, deltas: any[], value: string, docLength: number, callback?: () => void): void;

    changeMode(sessionId: string, value: string, mode: string, callback?: () => void);

    changeOptions(sessionId: string, options: AceLinters.ServiceOptions, callback?: () => void);

    dispose(sessionId: string, callback?: () => void): void;

    setGlobalOptions(serviceName: string, options: any, merge?: boolean): void;

}
