var LIB;
(() => {
	"use strict";
	var t = { 975: (t$1) => {
		function e$1(t$2) {
			if ("string" != typeof t$2) throw new TypeError("Path must be a string. Received " + JSON.stringify(t$2));
		}
		function r$1(t$2, e$2) {
			for (var r$2, n$2 = "", i$1 = 0, o$1 = -1, s$1 = 0, h$1 = 0; h$1 <= t$2.length; ++h$1) {
				if (h$1 < t$2.length) r$2 = t$2.charCodeAt(h$1);
				else {
					if (47 === r$2) break;
					r$2 = 47;
				}
				if (47 === r$2) {
					if (o$1 === h$1 - 1 || 1 === s$1);
					else if (o$1 !== h$1 - 1 && 2 === s$1) {
						if (n$2.length < 2 || 2 !== i$1 || 46 !== n$2.charCodeAt(n$2.length - 1) || 46 !== n$2.charCodeAt(n$2.length - 2)) {
							if (n$2.length > 2) {
								var a$1 = n$2.lastIndexOf("/");
								if (a$1 !== n$2.length - 1) {
									-1 === a$1 ? (n$2 = "", i$1 = 0) : i$1 = (n$2 = n$2.slice(0, a$1)).length - 1 - n$2.lastIndexOf("/"), o$1 = h$1, s$1 = 0;
									continue;
								}
							} else if (2 === n$2.length || 1 === n$2.length) {
								n$2 = "", i$1 = 0, o$1 = h$1, s$1 = 0;
								continue;
							}
						}
						e$2 && (n$2.length > 0 ? n$2 += "/.." : n$2 = "..", i$1 = 2);
					} else n$2.length > 0 ? n$2 += "/" + t$2.slice(o$1 + 1, h$1) : n$2 = t$2.slice(o$1 + 1, h$1), i$1 = h$1 - o$1 - 1;
					o$1 = h$1, s$1 = 0;
				} else 46 === r$2 && -1 !== s$1 ? ++s$1 : s$1 = -1;
			}
			return n$2;
		}
		var n$1 = {
			resolve: function() {
				for (var t$2, n$2 = "", i$1 = !1, o$1 = arguments.length - 1; o$1 >= -1 && !i$1; o$1--) {
					var s$1;
					o$1 >= 0 ? s$1 = arguments[o$1] : (void 0 === t$2 && (t$2 = process.cwd()), s$1 = t$2), e$1(s$1), 0 !== s$1.length && (n$2 = s$1 + "/" + n$2, i$1 = 47 === s$1.charCodeAt(0));
				}
				return n$2 = r$1(n$2, !i$1), i$1 ? n$2.length > 0 ? "/" + n$2 : "/" : n$2.length > 0 ? n$2 : ".";
			},
			normalize: function(t$2) {
				if (e$1(t$2), 0 === t$2.length) return ".";
				var n$2 = 47 === t$2.charCodeAt(0), i$1 = 47 === t$2.charCodeAt(t$2.length - 1);
				return 0 !== (t$2 = r$1(t$2, !n$2)).length || n$2 || (t$2 = "."), t$2.length > 0 && i$1 && (t$2 += "/"), n$2 ? "/" + t$2 : t$2;
			},
			isAbsolute: function(t$2) {
				return e$1(t$2), t$2.length > 0 && 47 === t$2.charCodeAt(0);
			},
			join: function() {
				if (0 === arguments.length) return ".";
				for (var t$2, r$2 = 0; r$2 < arguments.length; ++r$2) {
					var i$1 = arguments[r$2];
					e$1(i$1), i$1.length > 0 && (void 0 === t$2 ? t$2 = i$1 : t$2 += "/" + i$1);
				}
				return void 0 === t$2 ? "." : n$1.normalize(t$2);
			},
			relative: function(t$2, r$2) {
				if (e$1(t$2), e$1(r$2), t$2 === r$2) return "";
				if ((t$2 = n$1.resolve(t$2)) === (r$2 = n$1.resolve(r$2))) return "";
				for (var i$1 = 1; i$1 < t$2.length && 47 === t$2.charCodeAt(i$1); ++i$1);
				for (var o$1 = t$2.length, s$1 = o$1 - i$1, h$1 = 1; h$1 < r$2.length && 47 === r$2.charCodeAt(h$1); ++h$1);
				for (var a$1 = r$2.length - h$1, c$1 = s$1 < a$1 ? s$1 : a$1, f$1 = -1, u$1 = 0; u$1 <= c$1; ++u$1) {
					if (u$1 === c$1) {
						if (a$1 > c$1) {
							if (47 === r$2.charCodeAt(h$1 + u$1)) return r$2.slice(h$1 + u$1 + 1);
							if (0 === u$1) return r$2.slice(h$1 + u$1);
						} else s$1 > c$1 && (47 === t$2.charCodeAt(i$1 + u$1) ? f$1 = u$1 : 0 === u$1 && (f$1 = 0));
						break;
					}
					var l$1 = t$2.charCodeAt(i$1 + u$1);
					if (l$1 !== r$2.charCodeAt(h$1 + u$1)) break;
					47 === l$1 && (f$1 = u$1);
				}
				var g$1 = "";
				for (u$1 = i$1 + f$1 + 1; u$1 <= o$1; ++u$1) u$1 !== o$1 && 47 !== t$2.charCodeAt(u$1) || (0 === g$1.length ? g$1 += ".." : g$1 += "/..");
				return g$1.length > 0 ? g$1 + r$2.slice(h$1 + f$1) : (h$1 += f$1, 47 === r$2.charCodeAt(h$1) && ++h$1, r$2.slice(h$1));
			},
			_makeLong: function(t$2) {
				return t$2;
			},
			dirname: function(t$2) {
				if (e$1(t$2), 0 === t$2.length) return ".";
				for (var r$2 = t$2.charCodeAt(0), n$2 = 47 === r$2, i$1 = -1, o$1 = !0, s$1 = t$2.length - 1; s$1 >= 1; --s$1) if (47 === (r$2 = t$2.charCodeAt(s$1))) {
					if (!o$1) {
						i$1 = s$1;
						break;
					}
				} else o$1 = !1;
				return -1 === i$1 ? n$2 ? "/" : "." : n$2 && 1 === i$1 ? "//" : t$2.slice(0, i$1);
			},
			basename: function(t$2, r$2) {
				if (void 0 !== r$2 && "string" != typeof r$2) throw new TypeError("\"ext\" argument must be a string");
				e$1(t$2);
				var n$2, i$1 = 0, o$1 = -1, s$1 = !0;
				if (void 0 !== r$2 && r$2.length > 0 && r$2.length <= t$2.length) {
					if (r$2.length === t$2.length && r$2 === t$2) return "";
					var h$1 = r$2.length - 1, a$1 = -1;
					for (n$2 = t$2.length - 1; n$2 >= 0; --n$2) {
						var c$1 = t$2.charCodeAt(n$2);
						if (47 === c$1) {
							if (!s$1) {
								i$1 = n$2 + 1;
								break;
							}
						} else -1 === a$1 && (s$1 = !1, a$1 = n$2 + 1), h$1 >= 0 && (c$1 === r$2.charCodeAt(h$1) ? -1 == --h$1 && (o$1 = n$2) : (h$1 = -1, o$1 = a$1));
					}
					return i$1 === o$1 ? o$1 = a$1 : -1 === o$1 && (o$1 = t$2.length), t$2.slice(i$1, o$1);
				}
				for (n$2 = t$2.length - 1; n$2 >= 0; --n$2) if (47 === t$2.charCodeAt(n$2)) {
					if (!s$1) {
						i$1 = n$2 + 1;
						break;
					}
				} else -1 === o$1 && (s$1 = !1, o$1 = n$2 + 1);
				return -1 === o$1 ? "" : t$2.slice(i$1, o$1);
			},
			extname: function(t$2) {
				e$1(t$2);
				for (var r$2 = -1, n$2 = 0, i$1 = -1, o$1 = !0, s$1 = 0, h$1 = t$2.length - 1; h$1 >= 0; --h$1) {
					var a$1 = t$2.charCodeAt(h$1);
					if (47 !== a$1) -1 === i$1 && (o$1 = !1, i$1 = h$1 + 1), 46 === a$1 ? -1 === r$2 ? r$2 = h$1 : 1 !== s$1 && (s$1 = 1) : -1 !== r$2 && (s$1 = -1);
					else if (!o$1) {
						n$2 = h$1 + 1;
						break;
					}
				}
				return -1 === r$2 || -1 === i$1 || 0 === s$1 || 1 === s$1 && r$2 === i$1 - 1 && r$2 === n$2 + 1 ? "" : t$2.slice(r$2, i$1);
			},
			format: function(t$2) {
				if (null === t$2 || "object" != typeof t$2) throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof t$2);
				return function(t$3, e$2) {
					var r$2 = e$2.dir || e$2.root, n$2 = e$2.base || (e$2.name || "") + (e$2.ext || "");
					return r$2 ? r$2 === e$2.root ? r$2 + n$2 : r$2 + "/" + n$2 : n$2;
				}(0, t$2);
			},
			parse: function(t$2) {
				e$1(t$2);
				var r$2 = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (0 === t$2.length) return r$2;
				var n$2, i$1 = t$2.charCodeAt(0), o$1 = 47 === i$1;
				o$1 ? (r$2.root = "/", n$2 = 1) : n$2 = 0;
				for (var s$1 = -1, h$1 = 0, a$1 = -1, c$1 = !0, f$1 = t$2.length - 1, u$1 = 0; f$1 >= n$2; --f$1) if (47 !== (i$1 = t$2.charCodeAt(f$1))) -1 === a$1 && (c$1 = !1, a$1 = f$1 + 1), 46 === i$1 ? -1 === s$1 ? s$1 = f$1 : 1 !== u$1 && (u$1 = 1) : -1 !== s$1 && (u$1 = -1);
				else if (!c$1) {
					h$1 = f$1 + 1;
					break;
				}
				return -1 === s$1 || -1 === a$1 || 0 === u$1 || 1 === u$1 && s$1 === a$1 - 1 && s$1 === h$1 + 1 ? -1 !== a$1 && (r$2.base = r$2.name = 0 === h$1 && o$1 ? t$2.slice(1, a$1) : t$2.slice(h$1, a$1)) : (0 === h$1 && o$1 ? (r$2.name = t$2.slice(1, s$1), r$2.base = t$2.slice(1, a$1)) : (r$2.name = t$2.slice(h$1, s$1), r$2.base = t$2.slice(h$1, a$1)), r$2.ext = t$2.slice(s$1, a$1)), h$1 > 0 ? r$2.dir = t$2.slice(0, h$1 - 1) : o$1 && (r$2.dir = "/"), r$2;
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null
		};
		n$1.posix = n$1, t$1.exports = n$1;
	} }, e = {};
	function r(n$1) {
		var i$1 = e[n$1];
		if (void 0 !== i$1) return i$1.exports;
		var o$1 = e[n$1] = { exports: {} };
		return t[n$1](o$1, o$1.exports, r), o$1.exports;
	}
	r.d = (t$1, e$1) => {
		for (var n$1 in e$1) r.o(e$1, n$1) && !r.o(t$1, n$1) && Object.defineProperty(t$1, n$1, {
			enumerable: !0,
			get: e$1[n$1]
		});
	}, r.o = (t$1, e$1) => Object.prototype.hasOwnProperty.call(t$1, e$1), r.r = (t$1) => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t$1, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t$1, "__esModule", { value: !0 });
	};
	var n = {};
	let i;
	if (r.r(n), r.d(n, {
		URI: () => l,
		Utils: () => I
	}), "object" == typeof process) i = "win32" === process.platform;
	else if ("object" == typeof navigator) i = navigator.userAgent.indexOf("Windows") >= 0;
	const o = /^\w[\w\d+.-]*$/, s = /^\//, h = /^\/\//;
	function a(t$1, e$1) {
		if (!t$1.scheme && e$1) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t$1.authority}", path: "${t$1.path}", query: "${t$1.query}", fragment: "${t$1.fragment}"}`);
		if (t$1.scheme && !o.test(t$1.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (t$1.path) {
			if (t$1.authority) {
				if (!s.test(t$1.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (h.test(t$1.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	const c = "", f = "/", u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	class l {
		static isUri(t$1) {
			return t$1 instanceof l || !!t$1 && "string" == typeof t$1.authority && "string" == typeof t$1.fragment && "string" == typeof t$1.path && "string" == typeof t$1.query && "string" == typeof t$1.scheme && "string" == typeof t$1.fsPath && "function" == typeof t$1.with && "function" == typeof t$1.toString;
		}
		scheme;
		authority;
		path;
		query;
		fragment;
		constructor(t$1, e$1, r$1, n$1, i$1, o$1 = !1) {
			"object" == typeof t$1 ? (this.scheme = t$1.scheme || c, this.authority = t$1.authority || c, this.path = t$1.path || c, this.query = t$1.query || c, this.fragment = t$1.fragment || c) : (this.scheme = function(t$2, e$2) {
				return t$2 || e$2 ? t$2 : "file";
			}(t$1, o$1), this.authority = e$1 || c, this.path = function(t$2, e$2) {
				switch (t$2) {
					case "https":
					case "http":
					case "file": e$2 ? e$2[0] !== f && (e$2 = f + e$2) : e$2 = f;
				}
				return e$2;
			}(this.scheme, r$1 || c), this.query = n$1 || c, this.fragment = i$1 || c, a(this, o$1));
		}
		get fsPath() {
			return v(this, !1);
		}
		with(t$1) {
			if (!t$1) return this;
			let { scheme: e$1, authority: r$1, path: n$1, query: i$1, fragment: o$1 } = t$1;
			return void 0 === e$1 ? e$1 = this.scheme : null === e$1 && (e$1 = c), void 0 === r$1 ? r$1 = this.authority : null === r$1 && (r$1 = c), void 0 === n$1 ? n$1 = this.path : null === n$1 && (n$1 = c), void 0 === i$1 ? i$1 = this.query : null === i$1 && (i$1 = c), void 0 === o$1 ? o$1 = this.fragment : null === o$1 && (o$1 = c), e$1 === this.scheme && r$1 === this.authority && n$1 === this.path && i$1 === this.query && o$1 === this.fragment ? this : new d(e$1, r$1, n$1, i$1, o$1);
		}
		static parse(t$1, e$1 = !1) {
			const r$1 = u.exec(t$1);
			return r$1 ? new d(r$1[2] || c, w(r$1[4] || c), w(r$1[5] || c), w(r$1[7] || c), w(r$1[9] || c), e$1) : new d(c, c, c, c, c);
		}
		static file(t$1) {
			let e$1 = c;
			if (i && (t$1 = t$1.replace(/\\/g, f)), t$1[0] === f && t$1[1] === f) {
				const r$1 = t$1.indexOf(f, 2);
				-1 === r$1 ? (e$1 = t$1.substring(2), t$1 = f) : (e$1 = t$1.substring(2, r$1), t$1 = t$1.substring(r$1) || f);
			}
			return new d("file", e$1, t$1, c, c);
		}
		static from(t$1) {
			const e$1 = new d(t$1.scheme, t$1.authority, t$1.path, t$1.query, t$1.fragment);
			return a(e$1, !0), e$1;
		}
		toString(t$1 = !1) {
			return b(this, t$1);
		}
		toJSON() {
			return this;
		}
		static revive(t$1) {
			if (t$1) {
				if (t$1 instanceof l) return t$1;
				{
					const e$1 = new d(t$1);
					return e$1._formatted = t$1.external, e$1._fsPath = t$1._sep === g ? t$1.fsPath : null, e$1;
				}
			}
			return t$1;
		}
	}
	const g = i ? 1 : void 0;
	class d extends l {
		_formatted = null;
		_fsPath = null;
		get fsPath() {
			return this._fsPath || (this._fsPath = v(this, !1)), this._fsPath;
		}
		toString(t$1 = !1) {
			return t$1 ? b(this, !0) : (this._formatted || (this._formatted = b(this, !1)), this._formatted);
		}
		toJSON() {
			const t$1 = { $mid: 1 };
			return this._fsPath && (t$1.fsPath = this._fsPath, t$1._sep = g), this._formatted && (t$1.external = this._formatted), this.path && (t$1.path = this.path), this.scheme && (t$1.scheme = this.scheme), this.authority && (t$1.authority = this.authority), this.query && (t$1.query = this.query), this.fragment && (t$1.fragment = this.fragment), t$1;
		}
	}
	const p = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20"
	};
	function m(t$1, e$1, r$1) {
		let n$1, i$1 = -1;
		for (let o$1 = 0; o$1 < t$1.length; o$1++) {
			const s$1 = t$1.charCodeAt(o$1);
			if (s$1 >= 97 && s$1 <= 122 || s$1 >= 65 && s$1 <= 90 || s$1 >= 48 && s$1 <= 57 || 45 === s$1 || 46 === s$1 || 95 === s$1 || 126 === s$1 || e$1 && 47 === s$1 || r$1 && 91 === s$1 || r$1 && 93 === s$1 || r$1 && 58 === s$1) -1 !== i$1 && (n$1 += encodeURIComponent(t$1.substring(i$1, o$1)), i$1 = -1), void 0 !== n$1 && (n$1 += t$1.charAt(o$1));
			else {
				void 0 === n$1 && (n$1 = t$1.substr(0, o$1));
				const e$2 = p[s$1];
				void 0 !== e$2 ? (-1 !== i$1 && (n$1 += encodeURIComponent(t$1.substring(i$1, o$1)), i$1 = -1), n$1 += e$2) : -1 === i$1 && (i$1 = o$1);
			}
		}
		return -1 !== i$1 && (n$1 += encodeURIComponent(t$1.substring(i$1))), void 0 !== n$1 ? n$1 : t$1;
	}
	function y(t$1) {
		let e$1;
		for (let r$1 = 0; r$1 < t$1.length; r$1++) {
			const n$1 = t$1.charCodeAt(r$1);
			35 === n$1 || 63 === n$1 ? (void 0 === e$1 && (e$1 = t$1.substr(0, r$1)), e$1 += p[n$1]) : void 0 !== e$1 && (e$1 += t$1[r$1]);
		}
		return void 0 !== e$1 ? e$1 : t$1;
	}
	function v(t$1, e$1) {
		let r$1;
		return r$1 = t$1.authority && t$1.path.length > 1 && "file" === t$1.scheme ? `//${t$1.authority}${t$1.path}` : 47 === t$1.path.charCodeAt(0) && (t$1.path.charCodeAt(1) >= 65 && t$1.path.charCodeAt(1) <= 90 || t$1.path.charCodeAt(1) >= 97 && t$1.path.charCodeAt(1) <= 122) && 58 === t$1.path.charCodeAt(2) ? e$1 ? t$1.path.substr(1) : t$1.path[1].toLowerCase() + t$1.path.substr(2) : t$1.path, i && (r$1 = r$1.replace(/\//g, "\\")), r$1;
	}
	function b(t$1, e$1) {
		const r$1 = e$1 ? y : m;
		let n$1 = "", { scheme: i$1, authority: o$1, path: s$1, query: h$1, fragment: a$1 } = t$1;
		if (i$1 && (n$1 += i$1, n$1 += ":"), (o$1 || "file" === i$1) && (n$1 += f, n$1 += f), o$1) {
			let t$2 = o$1.indexOf("@");
			if (-1 !== t$2) {
				const e$2 = o$1.substr(0, t$2);
				o$1 = o$1.substr(t$2 + 1), t$2 = e$2.lastIndexOf(":"), -1 === t$2 ? n$1 += r$1(e$2, !1, !1) : (n$1 += r$1(e$2.substr(0, t$2), !1, !1), n$1 += ":", n$1 += r$1(e$2.substr(t$2 + 1), !1, !0)), n$1 += "@";
			}
			o$1 = o$1.toLowerCase(), t$2 = o$1.lastIndexOf(":"), -1 === t$2 ? n$1 += r$1(o$1, !1, !0) : (n$1 += r$1(o$1.substr(0, t$2), !1, !0), n$1 += o$1.substr(t$2));
		}
		if (s$1) {
			if (s$1.length >= 3 && 47 === s$1.charCodeAt(0) && 58 === s$1.charCodeAt(2)) {
				const t$2 = s$1.charCodeAt(1);
				t$2 >= 65 && t$2 <= 90 && (s$1 = `/${String.fromCharCode(t$2 + 32)}:${s$1.substr(3)}`);
			} else if (s$1.length >= 2 && 58 === s$1.charCodeAt(1)) {
				const t$2 = s$1.charCodeAt(0);
				t$2 >= 65 && t$2 <= 90 && (s$1 = `${String.fromCharCode(t$2 + 32)}:${s$1.substr(2)}`);
			}
			n$1 += r$1(s$1, !0, !1);
		}
		return h$1 && (n$1 += "?", n$1 += r$1(h$1, !1, !1)), a$1 && (n$1 += "#", n$1 += e$1 ? a$1 : m(a$1, !1, !1)), n$1;
	}
	function C(t$1) {
		try {
			return decodeURIComponent(t$1);
		} catch {
			return t$1.length > 3 ? t$1.substr(0, 3) + C(t$1.substr(3)) : t$1;
		}
	}
	const A = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function w(t$1) {
		return t$1.match(A) ? t$1.replace(A, ((t$2) => C(t$2))) : t$1;
	}
	var x = r(975);
	const P = x.posix || x, _ = "/";
	var I;
	(function(t$1) {
		t$1.joinPath = function(t$2, ...e$1) {
			return t$2.with({ path: P.join(t$2.path, ...e$1) });
		}, t$1.resolvePath = function(t$2, ...e$1) {
			let r$1 = t$2.path, n$1 = !1;
			r$1[0] !== _ && (r$1 = _ + r$1, n$1 = !0);
			let i$1 = P.resolve(r$1, ...e$1);
			return n$1 && i$1[0] === _ && !t$2.authority && (i$1 = i$1.substring(1)), t$2.with({ path: i$1 });
		}, t$1.dirname = function(t$2) {
			if (0 === t$2.path.length || t$2.path === _) return t$2;
			let e$1 = P.dirname(t$2.path);
			return 1 === e$1.length && 46 === e$1.charCodeAt(0) && (e$1 = ""), t$2.with({ path: e$1 });
		}, t$1.basename = function(t$2) {
			return P.basename(t$2.path);
		}, t$1.extname = function(t$2) {
			return P.extname(t$2.path);
		};
	})(I || (I = {})), LIB = n;
})();
const { URI, Utils } = LIB;
function mergeObjects(obj1, obj2, excludeUndefined = false) {
	if (!obj1) return obj2;
	if (!obj2) return obj1;
	if (excludeUndefined) {
		obj1 = excludeUndefinedValues(obj1);
		obj2 = excludeUndefinedValues(obj2);
	}
	const mergedObjects = {
		...obj2,
		...obj1
	};
	for (const key of Object.keys(mergedObjects)) if (obj1[key] && obj2[key]) {
		if (Array.isArray(obj1[key])) mergedObjects[key] = obj1[key].concat(obj2[key]);
		else if (Array.isArray(obj2[key])) mergedObjects[key] = obj2[key].concat(obj1[key]);
		else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
	}
	return mergedObjects;
}
function excludeUndefinedValues(obj) {
	const filteredEntries = Object.entries(obj).filter(([_, value]) => value !== void 0);
	return Object.fromEntries(filteredEntries);
}
function notEmpty(value) {
	return value !== null && value !== void 0;
}
function checkValueAgainstRegexpArray(value, regexpArray) {
	if (!regexpArray) return false;
	for (let i = 0; i < regexpArray.length; i++) if (regexpArray[i].test(value)) return true;
	return false;
}
let MessageType = /* @__PURE__ */ function(MessageType$1) {
	MessageType$1[MessageType$1["init"] = 0] = "init";
	MessageType$1[MessageType$1["format"] = 1] = "format";
	MessageType$1[MessageType$1["complete"] = 2] = "complete";
	MessageType$1[MessageType$1["resolveCompletion"] = 3] = "resolveCompletion";
	MessageType$1[MessageType$1["change"] = 4] = "change";
	MessageType$1[MessageType$1["hover"] = 5] = "hover";
	MessageType$1[MessageType$1["validate"] = 6] = "validate";
	MessageType$1[MessageType$1["applyDelta"] = 7] = "applyDelta";
	MessageType$1[MessageType$1["changeMode"] = 8] = "changeMode";
	MessageType$1[MessageType$1["changeOptions"] = 9] = "changeOptions";
	MessageType$1[MessageType$1["closeDocument"] = 10] = "closeDocument";
	MessageType$1[MessageType$1["globalOptions"] = 11] = "globalOptions";
	MessageType$1[MessageType$1["configureFeatures"] = 12] = "configureFeatures";
	MessageType$1[MessageType$1["signatureHelp"] = 13] = "signatureHelp";
	MessageType$1[MessageType$1["documentHighlight"] = 14] = "documentHighlight";
	MessageType$1[MessageType$1["closeConnection"] = 15] = "closeConnection";
	MessageType$1[MessageType$1["capabilitiesChange"] = 16] = "capabilitiesChange";
	MessageType$1[MessageType$1["getSemanticTokens"] = 17] = "getSemanticTokens";
	MessageType$1[MessageType$1["getCodeActions"] = 18] = "getCodeActions";
	MessageType$1[MessageType$1["executeCommand"] = 19] = "executeCommand";
	MessageType$1[MessageType$1["applyEdit"] = 20] = "applyEdit";
	MessageType$1[MessageType$1["appliedEdit"] = 21] = "appliedEdit";
	MessageType$1[MessageType$1["setWorkspace"] = 22] = "setWorkspace";
	MessageType$1[MessageType$1["renameDocument"] = 23] = "renameDocument";
	MessageType$1[MessageType$1["sendRequest"] = 24] = "sendRequest";
	MessageType$1[MessageType$1["showDocument"] = 25] = "showDocument";
	MessageType$1[MessageType$1["sendResponse"] = 26] = "sendResponse";
	MessageType$1[MessageType$1["inlineComplete"] = 27] = "inlineComplete";
	return MessageType$1;
}({});
var ServiceManager = class ServiceManager {
	constructor(ctx) {
		this.$services = {};
		this.serviceInitPromises = {};
		this.$sessionIDToMode = {};
		this.ctx = ctx;
		let doValidation = async (document, servicesInstances) => {
			servicesInstances ??= this.getServicesInstances(document.uri);
			if (servicesInstances.length === 0) return;
			let documentUrisList = Object.keys(servicesInstances[0].documents);
			servicesInstances = this.filterByFeature(servicesInstances, "diagnostics");
			servicesInstances = servicesInstances.filter((el) => {
				return el.serviceCapabilities.diagnosticProvider;
			});
			if (servicesInstances.length === 0) return;
			let postMessage = { "type": MessageType.validate };
			for (let documentUri of documentUrisList) {
				let diagnostics = await Promise.all(servicesInstances.map((el) => {
					return el.doValidation({ uri: documentUri });
				})) ?? [];
				postMessage["documentUri"] = documentUri;
				postMessage["value"] = diagnostics.flat();
				ctx.postMessage(postMessage);
			}
		};
		let provideValidationForServiceInstance = async (serviceName) => {
			let service = this.$services[serviceName];
			if (!service) return;
			var serviceInstance = service.serviceInstance;
			if (serviceInstance) await doValidation(void 0, [serviceInstance]);
		};
		ctx.addEventListener("message", async (ev) => {
			let message = ev.data;
			let sessionID = message["sessionId"] ?? "";
			let documentUri = message["documentUri"] ?? "";
			let version = message["version"];
			let postMessage = {
				"type": message.type,
				"sessionId": sessionID,
				"callbackId": message["callbackId"]
			};
			let serviceInstances = this.getServicesInstances(documentUri);
			let documentIdentifier = {
				uri: documentUri,
				version
			};
			switch (message.type) {
				case MessageType.format:
					serviceInstances = this.filterByFeature(serviceInstances, "format");
					if (serviceInstances.length > 0) postMessage["value"] = await serviceInstances[0].format(documentIdentifier, message.value, message.format);
					break;
				case MessageType.complete:
					postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "completion").map(async (service) => {
						return {
							completions: await service.doComplete(documentIdentifier, message["value"]),
							service: service.serviceData.className
						};
					}))).filter(notEmpty);
					break;
				case MessageType.inlineComplete:
					postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "inlineCompletion").map(async (service) => {
						return {
							completions: await service.doInlineComplete(documentIdentifier, message["value"]),
							service: service.serviceData.className
						};
					}))).filter(notEmpty);
					break;
				case MessageType.resolveCompletion:
					let serviceName = message.value["service"];
					postMessage["value"] = await this.filterByFeature(serviceInstances, "completionResolve").find((service) => {
						if (service.serviceData.className === serviceName) return service;
					})?.doResolve(message.value);
					break;
				case MessageType.change:
					serviceInstances.forEach((service) => {
						service.setValue(documentIdentifier, message["value"]);
					});
					await doValidation(documentIdentifier, serviceInstances);
					break;
				case MessageType.applyDelta:
					serviceInstances.forEach((service) => {
						service.applyDeltas(documentIdentifier, message["value"]);
					});
					await doValidation(documentIdentifier, serviceInstances);
					break;
				case MessageType.hover:
					postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "hover", "doHover", documentIdentifier, message.value);
					break;
				case MessageType.validate:
					postMessage["value"] = await doValidation(documentIdentifier, serviceInstances);
					break;
				case MessageType.init:
					postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.addDocument.bind(this));
					await doValidation(documentIdentifier);
					break;
				case MessageType.changeMode:
					postMessage["value"] = await this.getServicesCapabilitiesAfterCallback(documentIdentifier, message, this.changeDocumentMode.bind(this));
					await doValidation(documentIdentifier);
					break;
				case MessageType.changeOptions:
					this.applyOptionsToServices(serviceInstances, documentUri, message.options);
					await doValidation(documentIdentifier, serviceInstances);
					break;
				case MessageType.closeDocument:
					this.removeDocument(documentIdentifier);
					await doValidation(documentIdentifier, serviceInstances);
					break;
				case MessageType.closeConnection:
					await this.closeAllConnections();
					break;
				case MessageType.globalOptions:
					this.setGlobalOptions(message.serviceName, message.options, message.merge);
					await provideValidationForServiceInstance(message.serviceName);
					break;
				case MessageType.configureFeatures:
					this.configureFeatures(message.serviceName, message.options);
					await provideValidationForServiceInstance(message.serviceName);
					break;
				case MessageType.signatureHelp:
					postMessage["value"] = await this.aggregateFeatureResponses(serviceInstances, "signatureHelp", "provideSignatureHelp", documentIdentifier, message.value);
					break;
				case MessageType.documentHighlight:
					postMessage["value"] = (await this.aggregateFeatureResponses(serviceInstances, "documentHighlight", "findDocumentHighlights", documentIdentifier, message.value)).flat();
					break;
				case MessageType.getSemanticTokens:
					serviceInstances = this.filterByFeature(serviceInstances, "semanticTokens");
					if (serviceInstances.length > 0) postMessage["value"] = await serviceInstances[0].getSemanticTokens(documentIdentifier, message.value);
					break;
				case MessageType.getCodeActions:
					let value = message.value;
					let context = message.context;
					postMessage["value"] = (await Promise.all(this.filterByFeature(serviceInstances, "codeAction").map(async (service) => {
						return {
							codeActions: await service.getCodeActions(documentIdentifier, value, context),
							service: service.serviceName
						};
					}))).filter(notEmpty);
					break;
				case MessageType.executeCommand:
					postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.executeCommand(message.value, message.args);
					break;
				case MessageType.appliedEdit:
					postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendAppliedResult(message.value, message.callbackId);
					break;
				case MessageType.setWorkspace:
					this.setWorkspace(message.value);
					break;
				case MessageType.renameDocument:
					this.renameDocument(documentIdentifier, message.value);
					break;
				case MessageType.sendRequest:
					postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendRequest(message.value, message.args);
					break;
				case MessageType.sendResponse:
					postMessage["value"] = this.$services[message.serviceName]?.serviceInstance?.sendResponse(message.callbackId, message.args);
					break;
			}
			ctx.postMessage(postMessage);
		});
	}
	async getServicesCapabilitiesAfterCallback(documentIdentifier, message, callback) {
		let services = await callback(documentIdentifier, message.value, message.mode, message.options);
		if (services) return Object.keys(services).reduce((acc, key) => {
			acc[key] = services[key]?.serviceInstance?.serviceCapabilities || null;
			return acc;
		}, {});
	}
	async aggregateFeatureResponses(serviceInstances, feature, methodName, documentIdentifier, attrs) {
		return (await Promise.all(this.filterByFeature(serviceInstances, feature).map(async (service) => {
			if (Array.isArray(attrs)) return service[methodName](documentIdentifier, ...attrs);
			else return service[methodName](documentIdentifier, attrs);
		}))).filter(notEmpty);
	}
	applyOptionsToServices(serviceInstances, documentUri, options) {
		serviceInstances.forEach((service) => {
			service.setOptions(documentUri, options);
		});
	}
	async closeAllConnections() {
		var services = this.$services;
		for (let serviceName in services) await services[serviceName]?.serviceInstance?.closeConnection();
	}
	static async $initServiceInstance(service, ctx, workspaceUri) {
		let module;
		if ("type" in service) if (["socket", "webworker"].includes(service.type)) {
			module = await service.module();
			service.serviceInstance = new module["LanguageClient"](service, ctx, workspaceUri);
		} else throw "Unknown service type";
		else {
			module = await service.module();
			service.serviceInstance = new module[service.className](service.modes);
		}
		if (service.options || service.initializationOptions) service.serviceInstance.setGlobalOptions(service.options ?? service.initializationOptions ?? {});
		service.serviceInstance.serviceData = service;
		return service.serviceInstance;
	}
	async $getServicesInstancesByMode(mode) {
		let services = this.findServicesByMode(mode);
		if (Object.keys(services).length === 0) return [];
		for (let serviceName in services) await this.initializeService(serviceName);
		return services;
	}
	async initializeService(serviceName) {
		let service = this.$services[serviceName];
		if (!service.serviceInstance) {
			if (!this.serviceInitPromises[service.id]) this.serviceInitPromises[service.id] = ServiceManager.$initServiceInstance(service, this.ctx, this.workspaceUri).then((instance) => {
				service.serviceInstance = instance;
				service.serviceInstance.serviceName = serviceName;
				delete this.serviceInitPromises[service.id];
				return instance;
			});
			return this.serviceInitPromises[service.id];
		} else {
			if (!service.serviceInstance.serviceName) service.serviceInstance.serviceName = serviceName;
			return service.serviceInstance;
		}
	}
	setGlobalOptions(serviceName, options, merge = false) {
		let service = this.$services[serviceName];
		if (!service) return;
		service.options = merge ? mergeObjects(options, service.options) : options;
		if (service.serviceInstance) service.serviceInstance.setGlobalOptions(service.options);
	}
	setWorkspace(workspaceUri) {
		this.workspaceUri = workspaceUri;
		Object.values(this.$services).forEach((service) => {
			service.serviceInstance?.setWorkspace(this.workspaceUri);
		});
	}
	async addDocument(documentIdentifier, documentValue, mode, options) {
		if (!mode || !/^ace\/mode\//.test(mode)) return;
		mode = mode.replace("ace/mode/", "");
		mode = mode.replace(/golang$/, "go");
		let services = await this.$getServicesInstancesByMode(mode);
		if (Object.keys(services).length === 0) return;
		let documentItem = {
			uri: documentIdentifier.uri,
			version: documentIdentifier.version,
			languageId: mode,
			text: documentValue
		};
		Object.values(services).forEach((el) => el.serviceInstance.addDocument(documentItem));
		this.$sessionIDToMode[documentIdentifier.uri] = mode;
		return services;
	}
	async renameDocument(documentIdentifier, newDocumentUri) {
		let services = this.getServicesInstances(documentIdentifier.uri);
		if (services.length > 0) {
			services.forEach((el) => el.renameDocument(documentIdentifier, newDocumentUri));
			this.$sessionIDToMode[newDocumentUri] = this.$sessionIDToMode[documentIdentifier.uri];
			delete this.$sessionIDToMode[documentIdentifier.uri];
		}
	}
	async changeDocumentMode(documentIdentifier, value, mode, options) {
		this.removeDocument(documentIdentifier);
		return await this.addDocument(documentIdentifier, value, mode, options);
	}
	removeDocument(document) {
		let services = this.getServicesInstances(document.uri);
		if (services.length > 0) {
			services.forEach((el) => el.removeDocument(document));
			delete this.$sessionIDToMode[document.uri];
		}
	}
	getServicesInstances(documentUri) {
		let mode = this.$sessionIDToMode[documentUri];
		if (!mode) return [];
		let services = this.findServicesByMode(mode);
		return Object.values(services).map((el) => el.serviceInstance).filter(notEmpty);
	}
	findServicesByMode(mode) {
		let servicesWithName = {};
		Object.entries(this.$services).forEach(([key, value]) => {
			let extensions = value.modes.split("|").map((m) => m.trim());
			if (extensions.includes(mode) || extensions.includes("*")) servicesWithName[key] = this.$services[key];
		});
		return servicesWithName;
	}
	filterByFeature(serviceInstances, feature) {
		return serviceInstances.filter((el) => {
			if (!el.serviceData.features[feature]) return false;
			const capabilities = el.serviceCapabilities;
			switch (feature) {
				case "hover": return capabilities.hoverProvider == true;
				case "completion": return capabilities.completionProvider != void 0;
				case "completionResolve": return capabilities.completionProvider?.resolveProvider === true;
				case "inlineCompletion": return capabilities.inlineCompletionProvider != void 0;
				case "format": return capabilities.documentRangeFormattingProvider == true || capabilities.documentFormattingProvider == true;
				case "diagnostics": return capabilities.diagnosticProvider != void 0;
				case "signatureHelp": return capabilities.signatureHelpProvider != void 0;
				case "documentHighlight": return capabilities.documentHighlightProvider == true;
				case "semanticTokens": return capabilities.semanticTokensProvider != void 0;
				case "codeAction": return capabilities.codeActionProvider != void 0;
				case "executeCommand": return capabilities.executeCommandProvider != void 0;
			}
		});
	}
	registerService(name, service) {
		service.id = name;
		service.features = this.setDefaultFeaturesState(service.features);
		this.$services[name] = service;
	}
	registerServer(name, clientConfig) {
		clientConfig.id = name;
		clientConfig.className = "LanguageClient";
		clientConfig.features = this.setDefaultFeaturesState(clientConfig.features);
		this.$services[name] = clientConfig;
	}
	configureFeatures(name, features) {
		features = this.setDefaultFeaturesState(features);
		if (!this.$services[name]) return;
		this.$services[name].features = features;
	}
	setDefaultFeaturesState(serviceFeatures) {
		let features = serviceFeatures ?? {};
		features.hover ??= true;
		features.completion ??= true;
		features.completionResolve ??= true;
		features.format ??= true;
		features.diagnostics ??= true;
		features.signatureHelp ??= true;
		features.documentHighlight ??= true;
		features.semanticTokens ??= true;
		features.codeAction ??= true;
		features.executeCommand ??= true;
		features.inlineCompletion ??= true;
		return features;
	}
};
const cspellDictAssetFileByPackage = {
	"@cspell/dict-ada": "cspell-dict-ada.json",
	"@cspell/dict-al": "cspell-dict-al.json",
	"@cspell/dict-aws": "cspell-dict-aws.json",
	"@cspell/dict-companies": "cspell-dict-companies.json",
	"@cspell/dict-cpp": "cspell-dict-cpp.json",
	"@cspell/dict-cryptocurrencies": "cspell-dict-cryptocurrencies.json",
	"@cspell/dict-csharp": "cspell-dict-csharp.json",
	"@cspell/dict-css": "cspell-dict-css.json",
	"@cspell/dict-dart": "cspell-dict-dart.json",
	"@cspell/dict-data-science": "cspell-dict-data-science.json",
	"@cspell/dict-django": "cspell-dict-django.json",
	"@cspell/dict-docker": "cspell-dict-docker.json",
	"@cspell/dict-dotnet": "cspell-dict-dotnet.json",
	"@cspell/dict-elixir": "cspell-dict-elixir.json",
	"@cspell/dict-en_us": "cspell-dict-en_us.json",
	"@cspell/dict-en-gb-mit": "cspell-dict-en-gb-mit.json",
	"@cspell/dict-filetypes": "cspell-dict-filetypes.json",
	"@cspell/dict-flutter": "cspell-dict-flutter.json",
	"@cspell/dict-fonts": "cspell-dict-fonts.json",
	"@cspell/dict-fsharp": "cspell-dict-fsharp.json",
	"@cspell/dict-fullstack": "cspell-dict-fullstack.json",
	"@cspell/dict-gaming-terms": "cspell-dict-gaming-terms.json",
	"@cspell/dict-git": "cspell-dict-git.json",
	"@cspell/dict-golang": "cspell-dict-golang.json",
	"@cspell/dict-google": "cspell-dict-google.json",
	"@cspell/dict-haskell": "cspell-dict-haskell.json",
	"@cspell/dict-html": "cspell-dict-html.json",
	"@cspell/dict-html-symbol-entities": "cspell-dict-html-symbol-entities.json",
	"@cspell/dict-java": "cspell-dict-java.json",
	"@cspell/dict-julia": "cspell-dict-julia.json",
	"@cspell/dict-k8s": "cspell-dict-k8s.json",
	"@cspell/dict-kotlin": "cspell-dict-kotlin.json",
	"@cspell/dict-latex": "cspell-dict-latex.json",
	"@cspell/dict-lorem-ipsum": "cspell-dict-lorem-ipsum.json",
	"@cspell/dict-lua": "cspell-dict-lua.json",
	"@cspell/dict-makefile": "cspell-dict-makefile.json",
	"@cspell/dict-monkeyc": "cspell-dict-monkeyc.json",
	"@cspell/dict-node": "cspell-dict-node.json",
	"@cspell/dict-npm": "cspell-dict-npm.json",
	"@cspell/dict-php": "cspell-dict-php.json",
	"@cspell/dict-powershell": "cspell-dict-powershell.json",
	"@cspell/dict-public-licenses": "cspell-dict-public-licenses.json",
	"@cspell/dict-python": "cspell-dict-python.json",
	"@cspell/dict-r": "cspell-dict-r.json",
	"@cspell/dict-ruby": "cspell-dict-ruby.json",
	"@cspell/dict-rust": "cspell-dict-rust.json",
	"@cspell/dict-scala": "cspell-dict-scala.json",
	"@cspell/dict-shell": "cspell-dict-shell.json",
	"@cspell/dict-software-terms": "cspell-dict-software-terms.json",
	"@cspell/dict-sql": "cspell-dict-sql.json",
	"@cspell/dict-svelte": "cspell-dict-svelte.json",
	"@cspell/dict-swift": "cspell-dict-swift.json",
	"@cspell/dict-terraform": "cspell-dict-terraform.json",
	"@cspell/dict-typescript": "cspell-dict-typescript.json",
	"@cspell/dict-zig": "cspell-dict-zig.json"
};
const moduleUrl = import.meta.url;
const dictAssetUrlsByPackage = Object.fromEntries(Object.entries(cspellDictAssetFileByPackage).map(([packageName, fileName]) => [packageName, new URL(`./lib/dicts/${fileName}`, moduleUrl).href]));
const globalScope = typeof globalThis === "undefined" ? void 0 : globalThis;
if (globalScope) globalScope.__aceSpellCheckDictAssetUrls = {
	...globalScope.__aceSpellCheckDictAssetUrls || {},
	...dictAssetUrlsByPackage
};
let manager = new ServiceManager(self);
manager.registerService("html", {
	features: { signatureHelp: false },
	module: () => import("./html-service-CP3WCvqv.js"),
	className: "HtmlService",
	modes: "html"
});
manager.registerService("css", {
	features: { signatureHelp: false },
	module: () => import("./css-service-lHNhGWNL.js"),
	className: "CssService",
	modes: "css"
});
manager.registerService("less", {
	features: { signatureHelp: false },
	module: () => import("./css-service-lHNhGWNL.js"),
	className: "CssService",
	modes: "less"
});
manager.registerService("scss", {
	features: { signatureHelp: false },
	module: () => import("./css-service-lHNhGWNL.js"),
	className: "CssService",
	modes: "scss"
});
manager.registerService("json", {
	features: {
		signatureHelp: false,
		documentHighlight: false
	},
	module: () => import("./json-service-D26fQLay.js"),
	className: "JsonService",
	modes: "json"
});
manager.registerService("json5", {
	features: {
		signatureHelp: false,
		documentHighlight: false
	},
	module: () => import("./json-service-D26fQLay.js"),
	className: "JsonService",
	modes: "json5"
});
manager.registerService("typescript", {
	module: () => import("./typescript-service-DPMQ33bd.js"),
	className: "TypescriptService",
	modes: "typescript|tsx|javascript|jsx"
});
manager.registerService("lua", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./lua-service-BgMi2AAV.js"),
	className: "LuaService",
	modes: "lua"
});
manager.registerService("yaml", {
	features: {
		signatureHelp: false,
		documentHighlight: false
	},
	module: () => import("./yaml-service-DLupk5fP.js"),
	className: "YamlService",
	modes: "yaml"
});
manager.registerService("xml", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./xml-service-DVnVlWRp.js"),
	className: "XmlService",
	modes: "xml"
});
manager.registerService("php", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./php-service-CJzBJc1a.js"),
	className: "PhpService",
	modes: "php"
});
manager.registerService("javascript", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./javascript-service-DJQUYDwk.js"),
	className: "JavascriptService",
	modes: "javascript"
});
manager.registerService("python", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: true,
		hover: false,
		documentHighlight: false,
		signatureHelp: false
	},
	module: () => import("./python-service-ByhzdOqU.js"),
	className: "PythonService",
	modes: "python"
});
manager.registerService("mysql", {
	module: () => import("./mysql-service-C4p_crxn.js"),
	className: "MySQLService",
	modes: "mysql"
});
manager.registerService("ace-spell-check", {
	module: () => import("./ace-spell-check-CM-zaSu_.js"),
	className: "AceSpellCheck",
	modes: "*"
});
export { Utils as a, URI as i, checkValueAgainstRegexpArray as n, mergeObjects as r, cspellDictAssetFileByPackage as t };
