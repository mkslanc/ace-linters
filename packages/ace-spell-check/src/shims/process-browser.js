const queue = [];
let draining = false;
const startTime = Date.now();

function runTimeout(fn) {
  return setTimeout(fn, 0);
}

function drainQueue() {
  if (draining) return;
  draining = true;
  while (queue.length) {
    const fn = queue.shift();
    try {
      fn();
    } catch (error) {
      runTimeout(() => {
        throw error;
      });
    }
  }
  draining = false;
}

function nextTick(fn, ...args) {
  queue.push(() => fn(...args));
  if (queue.length === 1 && !draining) {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(drainQueue);
    } else {
      runTimeout(drainQueue);
    }
  }
}

function notSupported(name) {
  throw new Error(`process.${name} is not supported in browser builds.`);
}

const processShim = {
  title: 'browser',
  browser: true,
  env: {},
  argv: [],
  version: '',
  versions: {},
  execPath: '/browser',
  execArgv: [],
  arch: 'browser',
  platform: 'browser',
  pid: 1,
  nextTick,
  cwd() {
    return '/';
  },
  chdir() {
    notSupported('chdir');
  },
  umask() {
    return 0;
  },
  hrtime(previousTimestamp) {
    const nowMs = (typeof performance !== 'undefined' && typeof performance.now === 'function')
      ? performance.now()
      : Date.now() - startTime;
    const seconds = Math.floor(nowMs / 1000);
    const nanoseconds = Math.floor((nowMs % 1000) * 1e6);
    if (!previousTimestamp) return [seconds, nanoseconds];
    const prevNs = previousTimestamp[0] * 1e9 + previousTimestamp[1];
    const currNs = seconds * 1e9 + nanoseconds;
    const diff = currNs - prevNs;
    return [Math.floor(diff / 1e9), diff % 1e9];
  },
  uptime() {
    return (Date.now() - startTime) / 1000;
  },
  emitWarning() {},
  on() {},
  addListener() {},
  once() {},
  off() {},
  removeListener() {},
  removeAllListeners() {},
  listeners() {
    return [];
  },
  binding(name) {
    notSupported(`binding(${name})`);
  },
};

export { processShim as process };
export default processShim;
