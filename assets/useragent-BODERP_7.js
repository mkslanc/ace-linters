import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_useragent = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.OS = {
		LINUX: "LINUX",
		MAC: "MAC",
		WINDOWS: "WINDOWS"
	};
	exports.getOS = function() {
		if (exports.isMac) return exports.OS.MAC;
		else if (exports.isLinux) return exports.OS.LINUX;
		else return exports.OS.WINDOWS;
	};
	var _navigator = typeof navigator == "object" ? navigator : {};
	var os = (/mac|win|linux/i.exec(_navigator.platform) || ["other"])[0].toLowerCase();
	var ua = _navigator.userAgent || "";
	var appName = _navigator.appName || "";
	exports.isWin = os == "win";
	exports.isMac = os == "mac";
	exports.isLinux = os == "linux";
	exports.isIE = appName == "Microsoft Internet Explorer" || appName.indexOf("MSAppHost") >= 0 ? parseFloat((ua.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]);
	exports.isOldIE = exports.isIE && exports.isIE < 9;
	exports.isGecko = exports.isMozilla = ua.match(/ Gecko\/\d+/);
	exports.isOpera = typeof opera == "object" && Object.prototype.toString.call(window["opera"]) == "[object Opera]";
	exports.isWebKit = parseFloat(ua.split("WebKit/")[1]) || void 0;
	exports.isChrome = parseFloat(ua.split(" Chrome/")[1]) || void 0;
	exports.isSafari = parseFloat(ua.split(" Safari/")[1]) && !exports.isChrome || void 0;
	exports.isEdge = parseFloat(ua.split(" Edge/")[1]) || void 0;
	exports.isAIR = ua.indexOf("AdobeAIR") >= 0;
	exports.isAndroid = ua.indexOf("Android") >= 0;
	exports.isChromeOS = ua.indexOf(" CrOS ") >= 0;
	exports.isIOS = /iPad|iPhone|iPod/.test(ua) && !window["MSStream"];
	if (exports.isIOS) exports.isMac = true;
	exports.isMobile = exports.isIOS || exports.isAndroid;
}));
export { require_useragent as t };
