import EventEmitter from "events";

export class MockWorker extends EventEmitter implements Worker {
    $emitter: MockWorker;
    isProduction?: boolean;

    constructor(isProduction?: boolean) {
        super();
        this.isProduction = isProduction;
    }

    onerror(ev) {
    }

    onmessage(ev) {
    }

    onmessageerror(ev) {
    }

    addEventListener(type, listener, options) {
        this.addListener(type, listener);
    }

    dispatchEvent(event) {
        return false;
    }

    postMessage(data, transfer) {
        if (this.isProduction) {
            this.$emitter.emit("message", {data: data});
        } else {
            setTimeout(() => {
                this.$emitter.emit("message", {data: data});
            }, 0);
        }
    }

    removeEventListener(type, listener, options) {
        this.removeListener(type, listener);
    }

    terminate() {
    }

    setEmitter(emitter: MockWorker) {
        this.$emitter = emitter;
    }

}

