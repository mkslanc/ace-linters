const processBrowser = require('../../../../node_modules/process/browser.js');

if (!processBrowser.execPath) processBrowser.execPath = '/browser';
if (!processBrowser.execArgv) processBrowser.execArgv = [];
if (!processBrowser.arch) processBrowser.arch = 'browser';
if (!processBrowser.platform) processBrowser.platform = 'browser';
if (!processBrowser.pid) processBrowser.pid = 1;
if (typeof processBrowser.emitWarning !== 'function') processBrowser.emitWarning = function () {};

module.exports = processBrowser;
