const EventEmitter = require("events");

export class MockWorker extends EventEmitter {
    $emitter: MockWorker;

    constructor() {
        super();
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
        setTimeout(() => {
            console.log(data);
            this.$emitter.emit("message", {data: data});
        }, 0);

    }

    removeEventListener(type, listener, options) {
    }

    terminate() {
    }

    setEmitter(emitter: MockWorker) {
        this.$emitter = emitter;
    }

}

