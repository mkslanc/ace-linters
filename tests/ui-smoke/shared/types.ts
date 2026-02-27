export interface UiTestFlags {
    isInit: boolean;
    modeChanged: boolean;
    globalOptionsChanged: boolean;
    optionsChanged: boolean;
    validateReceived: boolean;
    validateCount: number;
    diagnosticsCount: number;
    hasDiagnostics: boolean;
    formatResponseReceived: boolean;
    formatHasEdits: boolean;
    ready?: boolean;
}
