import EventEmitter from "events";
export declare class MockWorker extends EventEmitter implements Worker {
    $emitter: MockWorker;
    isProduction?: boolean;
    constructor(isProduction?: boolean);
    onerror(ev: any): void;
    onmessage(ev: any): void;
    onmessageerror(ev: any): void;
    addEventListener(type: any, listener: any, options: any): void;
    dispatchEvent(event: any): boolean;
    postMessage(data: any, transfer: any): void;
    removeEventListener(type: any, listener: any, options: any): void;
    terminate(): void;
    setEmitter(emitter: MockWorker): void;
}
