// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function ee(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var te = ee.prototype = new b();
	te.constructor = ee, _(te, y.prototype), te.isPureReactComponent = !0;
	var ne = Array.isArray;
	function re() {}
	var x = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ie = Object.prototype.hasOwnProperty;
	function S(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function C(e, t) {
		return S(e.type, t, e.props);
	}
	function ae(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function oe(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var se = /\/+/g;
	function ce(e, t) {
		return typeof e == "object" && e && e.key != null ? oe("" + e.key) : t.toString(36);
	}
	function le(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(re, re) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ue(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ue(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ce(e, 0) : a, ne(o) ? (i = "", c != null && (i = c.replace(se, "$&/") + "/"), ue(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ae(o) && (o = C(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(se, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ne(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ce(a, u), c += ue(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ce(a, u++), c += ue(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ue(le(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function de(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ue(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function fe(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var pe = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function me(e) {
		var t = x.T, n = {};
		n.types = t === null ? null : t.types, x.T = n;
		try {
			var r = e(), i = x.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(re, pe);
		} catch (e) {
			pe(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), x.T = t;
		}
	}
	function he(e) {
		var t = x.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else me(he.bind(null, e));
	}
	var ge = {
		map: de,
		forEach: function(e, t, n) {
			de(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return de(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return de(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ae(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = ge, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = ee, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return x.H.useMemoCache(e);
		}
	}, e.addTransitionType = he, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ie.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return S(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ie.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return S(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ae, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: fe
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = me, e.unstable_useCacheRefresh = function() {
		return x.H.useCacheRefresh();
	}, e.use = function(e) {
		return x.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return x.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return x.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return x.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return x.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return x.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return x.H.useEffectEvent(e);
	}, e.useId = function() {
		return x.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return x.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return x.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return x.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return x.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return x.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return x.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return x.H.useRef(e);
	}, e.useState = function(e) {
		return x.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return x.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return x.H.useTransition();
	}, e.version = "19.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = T && e[T] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			Ee[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), Ee[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = ke, this.updater = n || De;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = ke, this.updater = n || De;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Me ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case he: return "Fragment";
				case w: return "Profiler";
				case ge: return "StrictMode";
				case be: return "Suspense";
				case xe: return "SuspenseList";
				case we: return "Activity";
				case Te: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case me: return "Portal";
				case ve: return e.displayName || "Context";
				case _e: return (e._context.displayName || "Context") + ".Consumer";
				case ye:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Se: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case Ce:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === he) return "<>";
			if (typeof e == "object" && e && e.$$typeof === Ce) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = E.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (Ne.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				D || (D = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return Ie[e] || (Ie[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: pe,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			ee(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === Ce && (e._payload.status === "fulfilled" ? ee(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function ee(e) {
			return typeof e == "object" && !!e && e.$$typeof === pe;
		}
		function te(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function ne(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), te("" + e.key)) : t.toString(36);
		}
		function re(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
					e.status === "pending" && (e.status = "fulfilled", e.value = t);
				}, function(t) {
					e.status === "pending" && (e.status = "rejected", e.reason = t);
				})), e.status) {
					case "fulfilled": return e.value;
					case "rejected": throw e.reason;
				}
			}
			throw e;
		}
		function x(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case pe:
					case me:
						s = !0;
						break;
					case Ce: return s = e._init, x(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + ne(s, 0) : i;
				return je(a) ? (n = "", c != null && (n = c.replace(Be, "$&/") + "/"), x(a, t, n, "", function(e) {
					return e;
				})) : a != null && (ee(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Be, "$&/") + "/") + c), i !== "" && s != null && ee(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", je(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + ne(i, l), s += x(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (ze || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ze = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + ne(i, l++), s += x(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return x(re(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function ie(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return x(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function S(e) {
			if (e._status === -1) {
				var t = null, n = null, r = e._ioInfo;
				r != null && (r.start = r.end = performance.now(), r.value = new Promise(function(e, r) {
					t = e, n = r;
				})), r = e._result;
				var i = r();
				if (i.then(function(n) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = n;
						var r = e._ioInfo;
						if (r != null) {
							r.end = performance.now();
							var a = n?.default;
							t(a), r.value.status = "fulfilled", r.value.value = a;
						}
						i.status === void 0 && (i.status = "fulfilled", i.value = n);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now(), r.value.then(c, c), n(t), r.value.status = "rejected", r.value.reason = t), i.status === void 0 && (i.status = "rejected", i.reason = t);
					}
				}), r = e._ioInfo, r != null) {
					var a = i.displayName;
					typeof a == "string" && (r.name = a);
				}
				e._status === -1 && (e._status = 0, e._result = i);
			}
			if (e._status === 1) return r = e._result, r === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", r), "default" in r || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", r), r.default;
			throw e._result;
		}
		function C() {
			var e = E.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function ae() {
			E.asyncTransitions--;
		}
		function oe(e) {
			var t = E.T, n = {};
			n.types = t === null ? null : t.types, n._updatedFibers = /* @__PURE__ */ new Set(), E.T = n;
			try {
				var r = e(), i = E.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (E.asyncTransitions++, r.then(ae, ae), r.then(c, Ve));
			} catch (e) {
				Ve(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), E.T = t;
			}
		}
		function se(e) {
			var t = E.T;
			if (t !== null) {
				var n = t.types;
				n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
			} else E.asyncTransitions === 0 && console.error("addTransitionType can only be called inside a `startTransition()` callback. It must be associated with a specific Transition."), oe(se.bind(null, e));
		}
		function ce(e) {
			if (Ue === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				Ue = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				Ue = function(e) {
					!1 === He && (He = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return Ue(e);
		}
		function le(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function ue(e, t) {
			t !== We - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), We = t;
		}
		function de(e, t, n) {
			var r = E.actQueue;
			if (r !== null) {
				if (r.length !== 0) try {
					fe(r), ce(function() {
						return de(e, t, n);
					});
					return;
				} catch (e) {
					E.thrownErrors.push(e);
				}
				else E.actQueue = null;
			}
			0 < E.thrownErrors.length ? (r = le(E.thrownErrors), E.thrownErrors.length = 0, n(r)) : t(e);
		}
		function fe(e) {
			if (!Ke) {
				Ke = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							E.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (E.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), E.thrownErrors.push(n);
				} finally {
					Ke = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var pe = Symbol.for("react.transitional.element"), me = Symbol.for("react.portal"), he = Symbol.for("react.fragment"), ge = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), _e = Symbol.for("react.consumer"), ve = Symbol.for("react.context"), ye = Symbol.for("react.forward_ref"), be = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), Se = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), we = Symbol.for("react.activity"), Te = Symbol.for("react.view_transition"), T = Symbol.iterator, Ee = {}, De = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, Oe = Object.assign, ke = {};
		Object.freeze(ke), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var Ae = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (Je in Ae) Ae.hasOwnProperty(Je) && n(Je, Ae[Je]);
		o.prototype = a.prototype, Ae = s.prototype = new o(), Ae.constructor = s, Oe(Ae, a.prototype), Ae.isPureReactComponent = !0;
		var je = Array.isArray, Me = Symbol.for("react.client.reference"), E = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, Ne = Object.prototype.hasOwnProperty, Pe = console.createTask ? console.createTask : function() {
			return null;
		};
		Ae = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var D, Fe, Ie = {}, Le = Ae.react_stack_bottom_frame.bind(Ae, m)(), Re = Pe(f(m)), ze = !1, Be = /\/+/g, Ve = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, He = !1, Ue = null, We = 0, Ge = !1, Ke = !1, qe = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : ce;
		Ae = Object.freeze({
			__proto__: null,
			c: function(e) {
				return C().useMemoCache(e);
			}
		});
		var Je = {
			map: ie,
			forEach: function(e, t, n) {
				ie(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return ie(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return ie(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!ee(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = we, e.Children = Je, e.Component = a, e.Fragment = he, e.Profiler = w, e.PureComponent = s, e.StrictMode = ge, e.Suspense = be, e.ViewTransition = Te, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, e.__COMPILER_RUNTIME = Ae, e.act = function(e) {
			var t = E.actQueue, n = We;
			We++;
			var r = E.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				E.thrownErrors.push(e);
			}
			if (0 < E.thrownErrors.length) throw ue(t, n), e = le(E.thrownErrors), E.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return qe(function() {
					i || Ge || (Ge = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (ue(t, n), n === 0) {
							try {
								fe(r), ce(function() {
									return de(i, e, a);
								});
							} catch (e) {
								E.thrownErrors.push(e);
							}
							if (0 < E.thrownErrors.length) {
								var o = le(E.thrownErrors);
								E.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						ue(t, n), 0 < E.thrownErrors.length && (e = le(E.thrownErrors), E.thrownErrors.length = 0), a(e);
					});
				} };
			}
			var s = a;
			if (ue(t, n), n === 0 && (fe(r), r.length !== 0 && qe(function() {
				i || Ge || (Ge = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), E.actQueue = null), 0 < E.thrownErrors.length) throw e = le(E.thrownErrors), E.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (E.actQueue = r, ce(function() {
					return de(s, e, t);
				})) : e(s);
			} };
		}, e.addTransitionType = se, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = E.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = Oe({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (Ne.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !Ne.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: ve,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: _e,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			var i;
			r = {};
			var a = null;
			if (t != null) for (i in Fe || !("__self" in t) || "key" in t || (Fe = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), a = "" + t.key), t) Ne.call(t, i) && i !== "key" && i !== "__self" && i !== "__source" && (r[i] = t[i]);
			var o = arguments.length - 2;
			if (o === 1) r.children = n;
			else if (1 < o) {
				for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
				Object.freeze && Object.freeze(s), r.children = s;
			}
			if (e && e.defaultProps) for (i in o = e.defaultProps, o) r[i] === void 0 && (r[i] = o[i]);
			return a && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), (i = 1e4 > E.recentlyCreatedOwnerStacks++) ? (s = Error.stackTraceLimit, Error.stackTraceLimit = 10, o = Error("react-stack-top-frame"), Error.stackTraceLimit = s) : o = Le, v(e, a, r, p(), o, i ? Pe(f(e)) : Re);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === Se ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: ye,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = ee, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: Ce,
				_payload: e,
				_init: S
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: Se,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = oe, e.unstable_useCacheRefresh = function() {
			return C().useCacheRefresh();
		}, e.use = function(e) {
			return C().use(e);
		}, e.useActionState = function(e, t, n) {
			return C().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return C().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = C();
			return e.$$typeof === _e && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return C().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return C().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return C().useEffectEvent(e);
		}, e.useId = function() {
			return C().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return C().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return C().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return C().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return C().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return C().useRef(e);
		}, e.useState = function(e) {
			return C().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return C().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return C().useTransition();
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? l() : u();
})), f = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function ee(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, te || (te = !0, C());
			else {
				var t = n(l);
				t !== null && se(ee, t.startTime - e);
			}
		}
	}
	var te = !1, ne = -1, re = 5, x = -1;
	function ie() {
		return g ? !0 : !(e.unstable_now() - x < re);
	}
	function S() {
		if (g = !1, te) {
			var t = e.unstable_now();
			x = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ne), ne = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ie());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && se(ee, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? C() : te = !1;
			}
		}
	}
	var C;
	if (typeof y == "function") C = function() {
		y(S);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), oe = ae.port2;
		ae.port1.onmessage = S, C = function() {
			oe.postMessage(null);
		};
	} else C = function() {
		_(S, 0);
	};
	function se(t, n) {
		ne = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ne), ne = -1) : h = !0, se(ee, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, te || (te = !0, C()))), r;
	}, e.unstable_shouldYield = ie, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), p = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (ee = !1, x) {
				var t = e.unstable_now();
				C = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, ne(ie), ie = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? ae() : x = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) {
				if (r(p) !== null) y = !0, x || (x = !0, ae());
				else {
					var t = r(m);
					t !== null && l(s, t.startTime - e);
				}
			}
		}
		function c() {
			return ee ? !0 : !(e.unstable_now() - C < S);
		}
		function l(t, n) {
			ie = te(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, ee = !1, te = typeof setTimeout == "function" ? setTimeout : null, ne = typeof clearTimeout == "function" ? clearTimeout : null, re = typeof setImmediate < "u" ? setImmediate : null, x = !1, ie = -1, S = 5, C = -1;
		if (typeof re == "function") var ae = function() {
			re(t);
		};
		else if (typeof MessageChannel < "u") {
			var oe = new MessageChannel(), se = oe.port2;
			oe.port1.onmessage = t, ae = function() {
				se.postMessage(null);
			};
		} else ae = function() {
			te(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			ee = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (ne(ie), ie = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, x || (x = !0, ae()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), m = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? f() : p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = d();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), g = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			if (i == null) i = null;
			else if (i === p) i = p;
			else {
				try {
					n(i);
					var a = !1;
				} catch {
					a = !0;
				}
				a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), i = "" + i;
			}
			return {
				$$typeof: u,
				key: i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function s() {
			var e = m.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var c = d(), l = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, u = Symbol.for("react.portal"), f = Symbol.for("react.recoverable"), p = Symbol.for("react.optimistic_key"), m = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, e.browser = function(e) {
			return {
				$$typeof: f,
				_reason: e
			};
		}, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = m.T, n = l.p;
			try {
				if (m.T = null, l.p = 2, e) return e();
			} finally {
				m.T = t, l.p = n, l.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", o(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, l.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t));
			}
			typeof e == "string" && l.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", o(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", o(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), s = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? l.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c
				}) : n === "script" && l.d.X(e, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + o(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = o(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), l.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
			})) : t ?? l.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				l.d.L(e, n, {
					crossOrigin: r,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					type: typeof t.type == "string" ? t.type : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
					referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
					imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
					imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
					media: typeof t.media == "string" ? t.media : void 0
				});
			}
		}, e.preloadModule = function(e, t) {
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), l.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
			})) : l.d.m(e));
		}, e.requestFormReset = function(e) {
			l.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return s().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return s().useHostTransitionStatus();
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = h()) : t.exports = g();
})), v = /* @__PURE__ */ o(((e) => {
	var t = m(), n = d(), r = _();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function p(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && p(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function h(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function g(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = h(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var ee = null, te = null;
	function ne(e, t, n) {
		return e === n || e === t && (ee = e, !0);
	}
	function re(e, t, n) {
		return e === n ? (te = e, !1) : e === t && (te !== null && (ee = e), !0);
	}
	function x(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function ie(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var S = Object.assign, C = Symbol.for("react.element"), ae = Symbol.for("react.transitional.element"), oe = Symbol.for("react.portal"), se = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), ue = Symbol.for("react.consumer"), de = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), he = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), _e = Symbol.for("react.legacy_hidden"), ve = Symbol.for("react.memo_cache_sentinel"), ye = Symbol.for("react.view_transition"), be = Symbol.for("react.recoverable"), xe = Symbol.iterator;
	function Se(e) {
		return typeof e != "object" || !e ? null : (e = xe && e[xe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var Ce = Symbol.for("react.client.reference");
	function we(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === Ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case se: return "Fragment";
			case le: return "Profiler";
			case ce: return "StrictMode";
			case pe: return "Suspense";
			case me: return "SuspenseList";
			case w: return "Activity";
			case ye: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case oe: return "Portal";
			case de: return e.displayName || "Context";
			case ue: return (e._context.displayName || "Context") + ".Consumer";
			case fe:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case he: return t = e.displayName || null, t === null ? we(e.type) || "Memo" : t;
			case ge:
				t = e._payload, e = e._init;
				try {
					return we(e(t));
				} catch {}
		}
		return null;
	}
	var Te = Array.isArray, T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ee = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, De = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Oe = [], ke = -1;
	function Ae(e) {
		return { current: e };
	}
	function je(e) {
		0 > ke || (e.current = Oe[ke], Oe[ke] = null, ke--);
	}
	function Me(e, t) {
		ke++, Oe[ke] = e.current, e.current = t;
	}
	var E = Ae(null), Ne = Ae(null), Pe = Ae(null), D = Ae(null);
	function Fe(e, t) {
		switch (Me(Pe, t), Me(Ne, e), Me(E, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Tp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Tp(t), e = Ep(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		je(E), Me(E, e);
	}
	function Ie() {
		je(E), je(Ne), je(Pe);
	}
	function Le(e) {
		var t = e.memoizedState;
		t !== null && (yh._currentValue = t.memoizedState, Me(D, e)), t = E.current;
		var n = Ep(t, e.type);
		t !== n && (Me(Ne, e), Me(E, n));
	}
	function Re(e) {
		Ne.current === e && (je(E), je(Ne)), D.current === e && (je(D), yh._currentValue = De);
	}
	var ze, Be;
	function Ve(e) {
		if (ze === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ze = t && t[1] || "", Be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ze + e + Be;
	}
	var He = !1;
	function Ue(e, t) {
		if (!e || He) return "";
		He = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			He = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ve(n) : "";
	}
	function We(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ve(e.type);
			case 16: return Ve("Lazy");
			case 13: return e.child !== t && t !== null ? Ve("Suspense Fallback") : Ve("Suspense");
			case 19: return Ve("SuspenseList");
			case 0:
			case 15: return Ue(e.type, !1);
			case 11: return Ue(e.type.render, !1);
			case 1: return Ue(e.type, !0);
			case 31: return Ve("Activity");
			case 30: return Ve("ViewTransition");
			default: return "";
		}
	}
	function Ge(e) {
		try {
			var t = "", n = null;
			do
				t += We(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ke = Object.prototype.hasOwnProperty, qe = t.unstable_scheduleCallback, Je = t.unstable_cancelCallback, Ye = t.unstable_shouldYield, Xe = t.unstable_requestPaint, Ze = t.unstable_now, Qe = t.unstable_getCurrentPriorityLevel, $e = t.unstable_ImmediatePriority, et = t.unstable_UserBlockingPriority, tt = t.unstable_NormalPriority, nt = t.unstable_LowPriority, rt = t.unstable_IdlePriority, it = t.log, at = t.unstable_setDisableYieldValue, ot = null, st = null;
	function ct(e) {
		if (typeof it == "function" && at(e), st && typeof st.setStrictMode == "function") try {
			st.setStrictMode(ot, e);
		} catch {}
	}
	var lt = Math.clz32 ? Math.clz32 : ft, ut = Math.log, dt = Math.LN2;
	function ft(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ut(e) / dt | 0) | 0;
	}
	var pt = 256, mt = 262144, ht = 4194304;
	function gt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function _t(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = gt(n))) : i = gt(o) : i = gt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = gt(n))) : i = gt(o)) : i = gt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function vt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function yt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - lt(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function bt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function xt() {
		var e = ht;
		return ht <<= 1, !(ht & 62914560) && (ht = 4194304), e;
	}
	function St(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ct(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function wt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - lt(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Tt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Tt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - lt(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Et(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - lt(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Dt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ot(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ot(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function kt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function At() {
		var e = Ee.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Fh(e.type)) : e;
	}
	function jt(e, t) {
		var n = Ee.p;
		try {
			return Ee.p = e, t();
		} finally {
			Ee.p = n;
		}
	}
	var Mt = Math.random().toString(36).slice(2), Nt = "__reactFiber$" + Mt, Pt = "__reactProps$" + Mt, Ft = "__reactContainer$" + Mt, It = "__reactEvents$" + Mt, Lt = "__reactListeners$" + Mt, Rt = "__reactHandles$" + Mt, zt = "__reactResources$" + Mt, Bt = "__reactMarker$" + Mt, Vt = "__reactLoad$" + Mt;
	function Ht(e) {
		delete e[Nt], delete e[Pt], delete e[Lt], delete e[Rt];
	}
	function Ut(e) {
		var t;
		if (t = e[Nt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ft] || n[Nt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Em(e); e !== null;) {
					if (n = e[Nt]) return n;
					e = Em(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Wt(e) {
		if (e = e[Nt] || e[Ft]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Gt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Kt(e) {
		var t = e[zt];
		return t ||= e[zt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function qt(e) {
		e[Bt] = !0;
	}
	function Jt(e) {
		e[Vt] = void 0;
	}
	var Yt = /* @__PURE__ */ new Set(), Xt = {};
	function Zt(e, t) {
		Qt(e, t), Qt(e + "Capture", t);
	}
	function Qt(e, t) {
		for (Xt[e] = t, e = 0; e < t.length; e++) Yt.add(t[e]);
	}
	var $t = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), en = {}, tn = {};
	function nn(e) {
		return Ke.call(tn, e) ? !0 : Ke.call(en, e) ? !1 : $t.test(e) ? tn[e] = !0 : (en[e] = !0, !1);
	}
	var rn = !1;
	function an() {
		var e = rn;
		return rn = !1, e;
	}
	function on(e, t, n) {
		if (nn(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function sn(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function cn(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function ln(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function un(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function dn(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function fn(e) {
		if (!e._valueTracker) {
			var t = un(e) ? "checked" : "value";
			e._valueTracker = dn(e, t, "" + e[t]);
		}
	}
	function pn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = un(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var mn = /[\n"\\]/g;
	function hn(e) {
		return e.replace(mn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function gn(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + ln(t)) : e.value !== "" + ln(t) && (e.value = "" + ln(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : vn(e, ln(n)) : o === "number" && e.value == t ? vn(e, ln(e.value)) : vn(e, ln(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + ln(s) : e.removeAttribute("name");
	}
	function _n(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				fn(e);
				return;
			}
			n = n == null ? "" : "" + ln(n), t = t == null ? n : "" + ln(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), fn(e);
	}
	function vn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function yn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + ln(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function bn(e, t, n) {
		t != null && (t = "" + ln(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + ln(n);
	}
	function xn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (Te(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = ln(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), fn(e);
	}
	function Sn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Cn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function wn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Cn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Tn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", rn = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (wn(e, a, r), rn = !0);
		} else for (var o in t) t.hasOwnProperty(o) && wn(e, o, t[o]);
	}
	function En(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Dn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), On = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function kn(e) {
		return On.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function An() {}
	var jn = null;
	function Mn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Nn = null, Pn = null;
	function Fn(e) {
		var t = Wt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Pt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (gn(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + hn("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Pt] || null;
								if (!a) throw Error(i(90));
								gn(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && pn(r);
					}
					break a;
				case "textarea":
					bn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && yn(e, !!n.multiple, t, !1);
			}
		}
	}
	var In = !1;
	function Ln(e, t, n) {
		if (In) return e(t, n);
		In = !0;
		try {
			return e(t);
		} finally {
			if (In = !1, (Nn !== null || Pn !== null) && (Qd(), Nn && (t = Nn, e = Pn, Pn = Nn = null, Fn(t), e))) for (t = 0; t < e.length; t++) Fn(e[t]);
		}
	}
	function Rn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Pt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var zn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Bn = !1;
	if (zn) try {
		var Vn = {};
		Object.defineProperty(Vn, "passive", { get: function() {
			Bn = !0;
		} }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
	} catch {
		Bn = !1;
	}
	var Hn = null, Un = null, Wn = null;
	function Gn() {
		if (Wn) return Wn;
		var e, t = Un, n = t.length, r, i = "value" in Hn ? Hn.value : Hn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Wn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Kn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function qn() {
		return !0;
	}
	function Jn() {
		return !1;
	}
	function Yn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? qn : Jn, this.isPropagationStopped = Jn, this;
		}
		return S(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = qn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = qn);
			},
			persist: function() {},
			isPersistent: qn
		}), t;
	}
	var Xn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Zn = Yn(Xn), Qn = S({}, Xn, {
		view: 0,
		detail: 0
	}), $n = Yn(Qn), er, tr, nr, rr = S({}, Qn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: mr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== nr && (nr && e.type === "mousemove" ? (er = e.screenX - nr.screenX, tr = e.screenY - nr.screenY) : tr = er = 0, nr = e), er);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : tr;
		}
	}), ir = Yn(rr), ar = Yn(S({}, rr, { dataTransfer: 0 })), or = Yn(S({}, Qn, { relatedTarget: 0 })), sr = Yn(S({}, Xn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), cr = Yn(S({}, Xn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), lr = Yn(S({}, Xn, { data: 0 })), ur = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, dr = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, fr = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function pr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = fr[e]) ? !!t[e] : !1;
	}
	function mr() {
		return pr;
	}
	var hr = Yn(S({}, Qn, {
		key: function(e) {
			if (e.key) {
				var t = ur[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Kn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dr[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: mr,
		charCode: function(e) {
			return e.type === "keypress" ? Kn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Kn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), gr = Yn(S({}, rr, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), _r = Yn(S({}, Xn, { submitter: 0 })), vr = Yn(S({}, Qn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: mr
	})), yr = Yn(S({}, Xn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), br = Yn(S({}, rr, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), xr = Yn(S({}, Xn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), Sr = [
		9,
		13,
		27,
		32
	], Cr = zn && "CompositionEvent" in window, wr = null;
	zn && "documentMode" in document && (wr = document.documentMode);
	var Tr = zn && "TextEvent" in window && !wr, Er = zn && (!Cr || wr && 8 < wr && 11 >= wr), Dr = " ", Or = !1;
	function kr(e, t) {
		switch (e) {
			case "keyup": return Sr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Ar(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var jr = !1;
	function Mr(e, t) {
		switch (e) {
			case "compositionend": return Ar(t);
			case "keypress": return t.which === 32 ? (Or = !0, Dr) : null;
			case "textInput": return e = t.data, e === Dr && Or ? null : e;
			default: return null;
		}
	}
	function Nr(e, t) {
		if (jr) return e === "compositionend" || !Cr && kr(e, t) ? (e = Gn(), Wn = Un = Hn = null, jr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Er && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Pr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Fr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Pr[e.type] : t === "textarea";
	}
	function Ir(e, t, n, r) {
		Nn ? Pn ? Pn.push(r) : Pn = [r] : Nn = r, t = cp(t, "onChange"), 0 < t.length && (n = new Zn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Lr = null, Rr = null;
	function zr(e) {
		tp(e, 0);
	}
	function Br(e) {
		if (pn(Gt(e))) return e;
	}
	function Vr(e, t) {
		if (e === "change") return t;
	}
	var Hr = !1;
	if (zn) {
		var Ur;
		if (zn) {
			var Wr = "oninput" in document;
			if (!Wr) {
				var Gr = document.createElement("div");
				Gr.setAttribute("oninput", "return;"), Wr = typeof Gr.oninput == "function";
			}
			Ur = Wr;
		} else Ur = !1;
		Hr = Ur && (!document.documentMode || 9 < document.documentMode);
	}
	function Kr() {
		Lr && (Lr.detachEvent("onpropertychange", qr), Rr = Lr = null);
	}
	function qr(e) {
		if (e.propertyName === "value" && Br(Rr)) {
			var t = [];
			Ir(t, Rr, e, Mn(e)), Ln(zr, t);
		}
	}
	function Jr(e, t, n) {
		e === "focusin" ? (Kr(), Lr = t, Rr = n, Lr.attachEvent("onpropertychange", qr)) : e === "focusout" && Kr();
	}
	function Yr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Br(Rr);
	}
	function Xr(e, t) {
		if (e === "click") return Br(t);
	}
	function Zr(e, t) {
		if (e === "input" || e === "change") return Br(t);
	}
	function Qr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var $r = typeof Object.is == "function" ? Object.is : Qr;
	function ei(e, t) {
		if ($r(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ke.call(t, i) || !$r(e[i], t[i])) return !1;
		}
		return !0;
	}
	function ti(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function ni(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function ri(e, t) {
		var n = ni(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = ni(n);
		}
	}
	function ii(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ii(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function ai(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = ti(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = ti(e.document);
		}
		return t;
	}
	function oi(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var si = zn && "documentMode" in document && 11 >= document.documentMode, ci = null, li = null, ui = null, di = !1;
	function fi(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		di || ci == null || ci !== ti(r) || (r = ci, "selectionStart" in r && oi(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ui && ei(ui, r) || (ui = r, r = cp(li, "onSelect"), 0 < r.length && (t = new Zn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = ci)));
	}
	function pi(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var mi = {
		animationend: pi("Animation", "AnimationEnd"),
		animationiteration: pi("Animation", "AnimationIteration"),
		animationstart: pi("Animation", "AnimationStart"),
		transitionrun: pi("Transition", "TransitionRun"),
		transitionstart: pi("Transition", "TransitionStart"),
		transitioncancel: pi("Transition", "TransitionCancel"),
		transitionend: pi("Transition", "TransitionEnd")
	}, hi = {}, gi = {};
	zn && (gi = document.createElement("div").style, "AnimationEvent" in window || (delete mi.animationend.animation, delete mi.animationiteration.animation, delete mi.animationstart.animation), "TransitionEvent" in window || delete mi.transitionend.transition);
	function _i(e) {
		if (hi[e]) return hi[e];
		if (!mi[e]) return e;
		var t = mi[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in gi) return hi[e] = t[n];
		return e;
	}
	var vi = _i("animationend"), yi = _i("animationiteration"), bi = _i("animationstart"), xi = _i("transitionrun"), Si = _i("transitionstart"), Ci = _i("transitioncancel"), wi = _i("transitionend"), Ti = /* @__PURE__ */ new Map(), Ei = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Ei.push("scrollEnd");
	function Di(e, t) {
		Ti.set(e, t), Zt(t, [e]);
	}
	var Oi = 0;
	function ki(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = Nd.identifierPrefix;
		var n = Oi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function Ai(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Vd;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function ji(e, t) {
		return e = Ai(e), t = Ai(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Mi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Ni = [], Pi = 0, Fi = 0;
	function Ii() {
		for (var e = Pi, t = Fi = Pi = 0; t < e;) {
			var n = Ni[t];
			Ni[t++] = null;
			var r = Ni[t];
			Ni[t++] = null;
			var i = Ni[t];
			Ni[t++] = null;
			var a = Ni[t];
			if (Ni[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Bi(n, i, a);
		}
	}
	function Li(e, t, n, r) {
		Ni[Pi++] = e, Ni[Pi++] = t, Ni[Pi++] = n, Ni[Pi++] = r, Fi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ri(e, t, n, r) {
		return Li(e, t, n, r), Vi(e);
	}
	function zi(e, t) {
		return Li(e, null, null, t), Vi(e);
	}
	function Bi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - lt(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Vi(e) {
		if (50 < Hd) throw Hd = 0, Ud = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Hi = {};
	function Ui(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Wi(e, t, n, r) {
		return new Ui(e, t, n, r);
	}
	function Gi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ki(e, t) {
		var n = e.alternate;
		return n === null ? (n = Wi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function qi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ji(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Gi(r) && (s = 1);
		else if (typeof r == "string") s = ah(e, n, E.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case w: return e = Wi(31, n, t, a), e.elementType = w, e.lanes = o, e;
			case se: return Yi(n.children, a, o, t);
			case ce:
				s = 8, a |= 24;
				break;
			case le: return e = Wi(12, n, t, a | 2), e.elementType = le, e.lanes = o, e;
			case pe: return e = Wi(13, n, t, a), e.elementType = pe, e.lanes = o, e;
			case me: return e = Wi(19, n, t, a), e.elementType = me, e.lanes = o, e;
			case _e:
			case ye: return e = a | 32, e = Wi(30, n, t, e), e.elementType = ye, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case de:
						s = 10;
						break a;
					case ue:
						s = 9;
						break a;
					case fe:
						s = 11;
						break a;
					case he:
						s = 14;
						break a;
					case ge:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Wi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Yi(e, t, n, r) {
		return e = Wi(7, e, r, t), e.lanes = n, e;
	}
	function Xi(e, t, n) {
		return e = Wi(6, e, null, t), e.lanes = n, e;
	}
	function Zi(e) {
		var t = Wi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Qi(e, t, n) {
		return t = Wi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var $i = /* @__PURE__ */ new WeakMap();
	function ea(e, t) {
		if (typeof e == "object" && e) {
			var n = $i.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ge(t)
			}, $i.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ge(t)
		};
	}
	var ta = [], na = 0, ra = null, ia = 0, aa = [], oa = 0, sa = null, ca = 1, la = "";
	function ua(e, t) {
		ta[na++] = ia, ta[na++] = ra, ra = e, ia = t;
	}
	function da(e, t, n) {
		aa[oa++] = ca, aa[oa++] = la, aa[oa++] = sa, sa = e;
		var r = ca;
		e = la;
		var i = 32 - lt(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - lt(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ca = 1 << 32 - lt(t) + i | n << i | r, la = a + e;
		} else ca = 1 << a | n << i | r, la = e;
	}
	function fa(e) {
		e.return !== null && (ua(e, 1), da(e, 1, 0));
	}
	function pa(e) {
		for (; e === ra;) ra = ta[--na], ta[na] = null, ia = ta[--na], ta[na] = null;
		for (; e === sa;) sa = aa[--oa], aa[oa] = null, la = aa[--oa], aa[oa] = null, ca = aa[--oa], aa[oa] = null;
	}
	function ma(e, t) {
		aa[oa++] = ca, aa[oa++] = la, aa[oa++] = sa, ca = t.id, la = t.overflow, sa = e;
	}
	var ha = null, ga = null, O = !1, _a = null, va = !1, ya = Error(i(519));
	function ba(e) {
		throw Ea(ea(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ya;
	}
	function xa(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Nt] = e, t[Pt] = r, n) {
			case "dialog":
				R("cancel", t), R("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				R("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < $f.length; n++) R($f[n], t);
				break;
			case "source":
				R("error", t);
				break;
			case "img":
			case "image":
			case "link":
				R("error", t), R("load", t);
				break;
			case "details":
				R("toggle", t);
				break;
			case "input":
				R("invalid", t), _n(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				R("invalid", t);
				break;
			case "textarea": R("invalid", t), xn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || mp(t.textContent, n) ? (r.popover != null && (R("beforetoggle", t), R("toggle", t)), r.onScroll != null && R("scroll", t), r.onScrollEnd != null && R("scrollend", t), r.onClick != null && (t.onclick = An), t = !0) : t = !1, t || ba(e, !0);
	}
	function Sa(e) {
		for (ha = e.return; ha;) switch (ha.tag) {
			case 5:
			case 31:
			case 13:
				va = !1;
				return;
			case 27:
			case 3:
				va = !0;
				return;
			default: ha = ha.return;
		}
	}
	function Ca(e) {
		if (e !== ha) return !1;
		if (!O) return Sa(e), O = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Op(e.type, e.memoizedProps)), n = !n), n && ga && ba(e), Sa(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ga = z(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ga = z(e);
		} else t === 27 ? (t = ga, Lp(e.type) ? (e = Tm, Tm = null, ga = e) : ga = t) : ga = ha ? wm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function wa() {
		ga = ha = null, O = !1;
	}
	function Ta() {
		var e = _a;
		return e !== null && (Ed === null ? Ed = e : Ed.push.apply(Ed, e), _a = null), e;
	}
	function Ea(e) {
		_a === null ? _a = [e] : _a.push(e);
	}
	var Da = Ae(null), Oa = null, ka = null;
	function Aa(e, t, n) {
		Me(Da, t._currentValue), t._currentValue = n;
	}
	function ja(e) {
		e._currentValue = Da.current, je(Da);
	}
	function Ma(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Na(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ma(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ma(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Ma(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Pa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					$r(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === D.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [yh] : e.push(yh));
			}
			a = a.return;
		}
		return e !== null && Na(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Fa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!$r(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ia(e) {
		Oa = e, ka = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function La(e) {
		return za(Oa, e);
	}
	function Ra(e, t) {
		return Oa === null && Ia(e), za(e, t);
	}
	function za(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ka === null) {
			if (e === null) throw Error(i(308));
			ka = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ka = ka.next = t;
		return n;
	}
	var Ba = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Va = t.unstable_scheduleCallback, Ha = t.unstable_NormalPriority, k = {
		$$typeof: de,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function A() {
		return {
			controller: new Ba(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ua(e) {
		e.refCount--, e.refCount === 0 && Va(Ha, function() {
			e.controller.abort();
		});
	}
	function Wa(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ga = null;
	function Ka(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var qa = null, Ja = 0, Ya = 0, Xa = null;
	function Za(e, t) {
		if (qa === null) {
			var n = qa = [];
			Ja = 0, Ya = Jf(), Xa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Ja++, t.then(Qa, Qa), t;
	}
	function Qa() {
		if (--Ja === 0 && (Ga = null, qa !== null)) {
			Xa !== null && (Xa.status = "fulfilled");
			var e = qa;
			qa = null, Ya = 0, Xa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function $a(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var eo = T.S;
	T.S = function(e, t) {
		if (kd = Ze(), typeof t == "object" && t && typeof t.then == "function" && Za(e, t), Ga !== null) for (var n = Pf; n !== null;) Wa(n, Ga), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = Pf; r !== null;) Wa(r, n), r = r.next;
			if (Ya !== 0) {
				r = Ga, r === null && (r = Ga = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		eo !== null && eo(e, t);
	};
	var j = Ae(null);
	function to() {
		var e = j.current;
		return e === null ? pd.pooledCache : e;
	}
	function no(e, t) {
		t === null ? Me(j, j.current) : Me(j, t.pool);
	}
	function ro() {
		var e = to();
		return e === null ? null : {
			parent: k._currentValue,
			pool: e
		};
	}
	var io = Error(i(460)), ao = Error(i(474)), oo = Error(i(542)), so = { then: function() {} };
	function co(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function lo(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(An, An), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, mo(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(An, An);
				else {
					if (e = pd, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, mo(e), e;
				}
				throw fo = t, io;
		}
	}
	function uo(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (fo = e, io) : e;
		}
	}
	var fo = null;
	function po() {
		if (fo === null) throw Error(i(459));
		var e = fo;
		return fo = null, e;
	}
	function mo(e) {
		if (e === io || e === oo) throw Error(i(483));
	}
	var ho = null, go = 0;
	function _o(e) {
		var t = go;
		return go += 1, ho === null && (ho = []), lo(ho, e, t);
	}
	function vo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function yo(e, t) {
		throw t.$$typeof === C ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function bo(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ki(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Xi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === se ? (e = d(e, t, n.props.children, r, n.key), vo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ge && uo(i) === t.type) ? (t = a(t, n.props), vo(t, n), t.return = e, t) : (t = Ji(n.type, n.key, n.props, null, e.mode, r), vo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Qi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Yi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Xi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case ae: return n = Ji(t.type, t.key, t.props, null, e.mode, n), vo(n, t), n.return = e, n;
					case oe: return t = Qi(t, e.mode, n), t.return = e, t;
					case ge: return t = uo(t), f(e, t, n);
				}
				if (Te(t) || Se(t)) return t = Yi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, _o(t), n);
				if (t.$$typeof === de) return f(e, Ra(e, t), n);
				yo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case ae: return n.key === i ? l(e, t, n, r) : null;
					case oe: return n.key === i ? u(e, t, n, r) : null;
					case ge: return n = uo(n), p(e, t, n, r);
				}
				if (Te(n) || Se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, _o(n), r);
				if (n.$$typeof === de) return p(e, t, Ra(e, n), r);
				yo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case ae: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case oe: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ge: return r = uo(r), m(e, t, n, r, i);
				}
				if (Te(r) || Se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, _o(r), i);
				if (r.$$typeof === de) return m(e, t, n, Ra(t, r), i);
				yo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), O && ua(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return O && ua(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), O && ua(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), O && ua(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return O && ua(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), O && ua(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === se && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case ae:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === se) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), vo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ge && uo(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), vo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === se ? (c = Yi(o.props.children, e.mode, c, o.key), vo(c, o), c.return = e, e = c) : (c = Ji(o.type, o.key, o.props, null, e.mode, c), vo(c, o), c.return = e, e = c);
						}
						return s(e);
					case oe:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Qi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ge: return o = uo(o), _(e, r, o, c);
				}
				if (Te(o)) return h(e, r, o, c);
				if (Se(o)) {
					if (l = Se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, _o(o), c);
				if (o.$$typeof === de) return _(e, r, Ra(e, o), c);
				yo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Xi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				go = 0;
				var i = _(e, t, n, r);
				return ho = null, i;
			} catch (t) {
				if (t === io || t === oo) throw t;
				var a = Wi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var xo = bo(!0), So = bo(!1), Co = !1;
	function wo(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function To(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Eo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Do(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, fd & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Vi(e), Bi(e, null, n), t;
		}
		return Li(e, r, t, n), Vi(e);
	}
	function Oo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Et(e, n);
		}
	}
	function ko(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ao = !1;
	function jo() {
		if (Ao) {
			var e = Xa;
			if (e !== null) throw e;
		}
	}
	function Mo(e, t, n, r) {
		Ao = !1;
		var i = e.updateQueue;
		Co = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (F & f) === f : (r & f) === f) {
					f !== 0 && f === Ya && (Ao = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = S({}, d, f);
								break a;
							case 2: Co = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), bd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function No(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Po(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) No(n[e], t);
	}
	var Fo = Ae(null), Io = Ae(0);
	function Lo(e, t) {
		e = vd, Me(Io, e), Me(Fo, t), vd = e | t.baseLanes;
	}
	function Ro() {
		Me(Io, vd), Me(Fo, Fo.current);
	}
	function zo() {
		vd = Io.current, je(Fo), je(Io);
	}
	var Bo = Ae(null), Vo = null;
	function Ho(e) {
		var t = e.alternate;
		Me(qo, qo.current & 1), Me(Bo, e), Vo === null && (t === null || Fo.current !== null || t.memoizedState !== null) && (Vo = e);
	}
	function Uo(e) {
		Me(qo, qo.current), Me(Bo, e), Vo === null && (Vo = e);
	}
	function Wo(e) {
		e.tag === 22 ? (Me(qo, qo.current), Me(Bo, e), Vo === null && (Vo = e)) : Go();
	}
	function Go() {
		Me(qo, qo.current), Me(Bo, Bo.current);
	}
	function Ko(e) {
		je(Bo), Vo === e && (Vo = null), je(qo);
	}
	var qo = Ae(0);
	function Jo(e, t) {
		Me(Bo, Bo.current), Me(qo, t);
	}
	function Yo(e) {
		je(qo), je(Bo), Vo === e && (Vo = null);
	}
	function Xo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || xm(n) || Sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Zo = 0, M = null, Qo = null, $o = null, es = !1, ts = !1, ns = !1, rs = 0, is = 0, as = null, os = 0;
	function ss() {
		throw Error(i(321));
	}
	function cs(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!$r(e[n], t[n])) return !1;
		return !0;
	}
	function ls(e, t, n, r, i, a) {
		return Zo = a, M = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Ec : Dc, ns = !1, a = n(r, i), ns = !1, ts && (a = ds(t, n, r, i)), us(e), a;
	}
	function us(e) {
		T.H = Tc;
		var t = Qo !== null && Qo.next !== null;
		if (Zo = 0, $o = Qo = M = null, es = !1, is = 0, as = null, t) throw Error(i(300));
		e === null || Wc || (e = e.dependencies, e !== null && Fa(e) && (Wc = !0));
	}
	function ds(e, t, n, r) {
		M = e;
		var a = 0;
		do {
			if (ts && (as = null), is = 0, ts = !1, 25 <= a) throw Error(i(301));
			if (a += 1, $o = Qo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			T.H = Oc, o = t(n, r);
		} while (ts);
		return o;
	}
	function fs() {
		var e = T.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ys(t) : t, e = e.useState()[0], (Qo === null ? null : Qo.memoizedState) !== e && (M.flags |= 1024), t;
	}
	function ps() {
		var e = rs !== 0;
		return rs = 0, e;
	}
	function ms(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function hs(e) {
		if (es) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			es = !1;
		}
		Zo = 0, $o = Qo = M = null, ts = !1, is = rs = 0, as = null;
	}
	function gs() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return $o === null ? M.memoizedState = $o = e : $o = $o.next = e, $o;
	}
	function _s() {
		if (Qo === null) {
			var e = M.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Qo.next;
		var t = $o === null ? M.memoizedState : $o.next;
		if (t !== null) $o = t, Qo = e;
		else {
			if (e === null) throw M.alternate === null ? Error(i(467)) : Error(i(310));
			Qo = e, e = {
				memoizedState: Qo.memoizedState,
				baseState: Qo.baseState,
				baseQueue: Qo.baseQueue,
				queue: Qo.queue,
				next: null
			}, $o === null ? M.memoizedState = $o = e : $o = $o.next = e;
		}
		return $o;
	}
	function vs() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ys(e) {
		var t = is;
		return is += 1, as === null && (as = []), e = lo(as, e, t), t = M, ($o === null ? t.memoizedState : $o.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Ec : Dc), e;
	}
	function bs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ys(e);
			if (e.$$typeof === be) return;
			if (e.$$typeof === de) return La(e);
		}
		throw Error(i(438, String(e)));
	}
	function xs(e) {
		var t = null, n = M.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = M.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = vs(), M.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ve;
		return t.index++, n;
	}
	function Ss(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Cs(e) {
		return ws(_s(), Qo, e);
	}
	function ws(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Zo & f) === f : (F & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ya && (d = !0);
					else if ((Zo & p) === p) {
						u = u.next, p === Ya && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, M.lanes |= p, bd |= p;
					f = u.action, ns && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, M.lanes |= f, bd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !$r(o, e.memoizedState) && (Wc = !0, d && (n = Xa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ts(e) {
		var t = _s(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			$r(o, t.memoizedState) || (Wc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Es(e, t, n) {
		var r = M, a = _s(), o = O;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !$r((Qo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Wc = !0), a = a.queue, Zs(ks.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || $o !== null && !!($o.memoizedState.tag & 1), Ks(e ? 9 : 8, { destroy: void 0 }, Os.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, pd === null) throw Error(i(349));
			o || Zo & 127 || Ds(r, t, n);
		}
		return n;
	}
	function Ds(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = M.updateQueue, t === null ? (t = vs(), M.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Os(e, t, n, r) {
		t.value = n, t.getSnapshot = r, As(t) && js(e);
	}
	function ks(e, t, n) {
		return n(function() {
			As(t) && js(e);
		});
	}
	function As(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !$r(e, n);
		} catch {
			return !0;
		}
	}
	function js(e) {
		var t = zi(e, 2);
		t !== null && qd(t, e, 2);
	}
	function Ms(e) {
		var t = gs();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ns) {
				ct(!0);
				try {
					n();
				} finally {
					ct(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ss,
			lastRenderedState: e
		}, t;
	}
	function Ns(e, t, n, r) {
		return e.baseState = n, ws(e, Qo, typeof r == "function" ? r : Ss);
	}
	function Ps(e, t, n, r, a) {
		if (Sc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			T.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Fs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Fs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = T.T, o = {};
			o.types = a === null ? null : a.types, T.T = o;
			try {
				var s = n(i, r), c = T.S;
				c !== null && c(o, s), Is(e, t, s);
			} catch (n) {
				Rs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), T.T = a;
			}
		} else try {
			a = n(i, r), Is(e, t, a);
		} catch (n) {
			Rs(e, t, n);
		}
	}
	function Is(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ls(e, t, n);
		}, function(n) {
			return Rs(e, t, n);
		}) : Ls(e, t, n);
	}
	function Ls(e, t, n) {
		t.status = "fulfilled", t.value = n, zs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Fs(e, n)));
	}
	function Rs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, zs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function zs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Bs(e, t) {
		return t;
	}
	function Vs(e, t) {
		if (O) {
			var n = pd.formState;
			if (n !== null) {
				a: {
					var r = M;
					if (O) {
						if (ga) {
							b: {
								for (var i = ga, a = va; i.nodeType !== 8;) if (!a || (i = wm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								ga = wm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ba(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = gs(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Bs,
			lastRenderedState: t
		}, n.queue = r, n = yc.bind(null, M, r), r.dispatch = n, r = Ms(!1), a = xc.bind(null, M, !1, r.queue), r = gs(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ps.bind(null, M, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Hs(e) {
		return Us(_s(), Qo, e);
	}
	function Us(e, t, n) {
		if (t = ws(e, t, Bs)[0], e = Cs(Ss)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ys(t);
		} catch (e) {
			throw e === io ? oo : e;
		}
		else r = t;
		t = _s();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (M.flags |= 2048, Ks(9, { destroy: void 0 }, Ws.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ws(e, t) {
		e.action = t;
	}
	function Gs(e) {
		var t = _s(), n = Qo;
		if (n !== null) return Us(t, n, e);
		_s(), t = t.memoizedState, n = _s();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Ks(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = M.updateQueue, t === null && (t = vs(), M.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function qs() {
		return _s().memoizedState;
	}
	function Js(e, t, n, r) {
		var i = gs();
		M.flags |= e, i.memoizedState = Ks(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ys(e, t, n, r) {
		var i = _s();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Qo !== null && r !== null && cs(r, Qo.memoizedState.deps) ? i.memoizedState = Ks(t, a, n, r) : (M.flags |= e, i.memoizedState = Ks(1 | t, a, n, r));
	}
	function Xs(e, t) {
		Js(8390656, 8, e, t);
	}
	function Zs(e, t) {
		Ys(2048, 8, e, t);
	}
	function Qs(e) {
		M.flags |= 4;
		var t = M.updateQueue;
		if (t === null) t = vs(), M.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function $s(e) {
		var t = _s().memoizedState;
		return Qs({
			ref: t,
			nextImpl: e
		}), function() {
			if (fd & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ec(e, t) {
		return Ys(4, 2, e, t);
	}
	function tc(e, t) {
		return Ys(4, 4, e, t);
	}
	function nc(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function rc(e, t, n) {
		n = n == null ? null : n.concat([e]), Ys(4, 4, nc.bind(null, t, e), n);
	}
	function ic() {}
	function ac(e, t) {
		var n = _s();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && cs(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function oc(e, t) {
		var n = _s();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && cs(t, r[1])) return r[0];
		if (r = e(), ns) {
			ct(!0);
			try {
				e();
			} finally {
				ct(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function sc(e, t, n) {
		return n === void 0 || Zo & 1073741824 && !(F & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Gd(), M.lanes |= e, bd |= e, n);
	}
	function cc(e, t, n, r) {
		return $r(n, t) ? n : Fo.current === null ? !(Zo & 106) || Zo & 1073741824 && !(F & 261930) ? (Wc = !0, e.memoizedState = n) : (e = Gd(), M.lanes |= e, bd |= e, t) : (e = sc(e, n, r), $r(e, t) || (Wc = !0), e);
	}
	function lc(e, t, n, r, i) {
		var a = Ee.p;
		Ee.p = a !== 0 && 8 > a ? a : 8;
		var o = T.T, s = {};
		s.types = o === null ? null : o.types, T.T = s, xc(e, !1, t, n);
		try {
			var c = i(), l = T.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? bc(e, t, $a(c, r), Wd(e)) : bc(e, t, r, Wd(e));
		} catch (n) {
			bc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Wd());
		} finally {
			Ee.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o;
		}
	}
	function uc() {}
	function dc(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = fc(e).queue;
		lc(e, a, t, De, n === null ? uc : function() {
			return pc(e), n(r);
		});
	}
	function fc(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: De,
			baseState: De,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ss,
				lastRenderedState: De
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ss,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function pc(e) {
		var t = fc(e);
		t.next === null && (t = e.alternate.memoizedState), bc(e, t.next.queue, {}, Wd());
	}
	function mc() {
		return La(yh);
	}
	function hc() {
		return _s().memoizedState;
	}
	function gc() {
		return _s().memoizedState;
	}
	function _c(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Wd();
					e = Eo(n);
					var r = Do(t, e, n);
					r !== null && (qd(r, t, n), Oo(r, t, n)), t = { cache: A() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function vc(e, t, n) {
		var r = Wd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Sc(e) ? Cc(t, n) : (n = Ri(e, t, n, r), n !== null && (qd(n, e, r), wc(n, t, r)));
	}
	function yc(e, t, n) {
		bc(e, t, n, Wd());
	}
	function bc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Sc(e)) Cc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, $r(s, o)) return Li(e, t, i, 0), pd === null && Ii(), !1;
			} catch {}
			if (n = Ri(e, t, i, r), n !== null) return qd(n, e, r), wc(n, t, r), !0;
		}
		return !1;
	}
	function xc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Jf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Sc(e)) {
			if (t) throw Error(i(479));
		} else t = Ri(e, n, r, 2), t !== null && qd(t, e, 2);
	}
	function Sc(e) {
		var t = e.alternate;
		return e === M || t !== null && t === M;
	}
	function Cc(e, t) {
		ts = es = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function wc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Et(e, n);
		}
	}
	var Tc = {
		readContext: La,
		use: bs,
		useCallback: ss,
		useContext: ss,
		useEffect: ss,
		useImperativeHandle: ss,
		useLayoutEffect: ss,
		useInsertionEffect: ss,
		useMemo: ss,
		useReducer: ss,
		useRef: ss,
		useState: ss,
		useDebugValue: ss,
		useDeferredValue: ss,
		useTransition: ss,
		useSyncExternalStore: ss,
		useId: ss,
		useHostTransitionStatus: ss,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: ss,
		useMemoCache: ss,
		useCacheRefresh: ss,
		useEffectEvent: ss
	}, Ec = {
		readContext: La,
		use: bs,
		useCallback: function(e, t) {
			return gs().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: La,
		useEffect: Xs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Js(4194308, 4, nc.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Js(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Js(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = gs();
			t = t === void 0 ? null : t;
			var r = e();
			if (ns) {
				ct(!0);
				try {
					e();
				} finally {
					ct(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = gs();
			if (n !== void 0) {
				var i = n(t);
				if (ns) {
					ct(!0);
					try {
						n(t);
					} finally {
						ct(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = vc.bind(null, M, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = gs();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ms(e);
			var t = e.queue, n = yc.bind(null, M, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ic,
		useDeferredValue: function(e, t) {
			return sc(gs(), e, t);
		},
		useTransition: function() {
			var e = Ms(!1);
			return e = lc.bind(null, M, e.queue, !0, !1), gs().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = M, a = gs();
			if (O) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), pd === null) throw Error(i(349));
				F & 127 || Ds(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Xs(ks.bind(null, r, o, e), [e]), r.flags |= 2048, Ks(9, { destroy: void 0 }, Os.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = gs(), t = pd.identifierPrefix;
			if (O) {
				var n = la, r = ca;
				n = (r & ~(1 << 32 - lt(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = rs++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = os++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: mc,
		useFormState: Vs,
		useActionState: Vs,
		useOptimistic: function(e) {
			var t = gs();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = xc.bind(null, M, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: xs,
		useCacheRefresh: function() {
			return gs().memoizedState = _c.bind(null, M);
		},
		useEffectEvent: function(e) {
			var t = gs(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (fd & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Dc = {
		readContext: La,
		use: bs,
		useCallback: ac,
		useContext: La,
		useEffect: Zs,
		useImperativeHandle: rc,
		useInsertionEffect: ec,
		useLayoutEffect: tc,
		useMemo: oc,
		useReducer: Cs,
		useRef: qs,
		useState: function() {
			return Cs(Ss);
		},
		useDebugValue: ic,
		useDeferredValue: function(e, t) {
			return cc(_s(), Qo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Cs(Ss)[0], t = _s().memoizedState;
			return [typeof e == "boolean" ? e : ys(e), t];
		},
		useSyncExternalStore: Es,
		useId: hc,
		useHostTransitionStatus: mc,
		useFormState: Hs,
		useActionState: Hs,
		useOptimistic: function(e, t) {
			return Ns(_s(), Qo, e, t);
		},
		useMemoCache: xs,
		useCacheRefresh: gc,
		useEffectEvent: $s
	}, Oc = {
		readContext: La,
		use: bs,
		useCallback: ac,
		useContext: La,
		useEffect: Zs,
		useImperativeHandle: rc,
		useInsertionEffect: ec,
		useLayoutEffect: tc,
		useMemo: oc,
		useReducer: Ts,
		useRef: qs,
		useState: function() {
			return Ts(Ss);
		},
		useDebugValue: ic,
		useDeferredValue: function(e, t) {
			var n = _s();
			return Qo === null ? sc(n, e, t) : cc(n, Qo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ts(Ss)[0], t = _s().memoizedState;
			return [typeof e == "boolean" ? e : ys(e), t];
		},
		useSyncExternalStore: Es,
		useId: hc,
		useHostTransitionStatus: mc,
		useFormState: Gs,
		useActionState: Gs,
		useOptimistic: function(e, t) {
			var n = _s();
			return Qo === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ns(n, Qo, e, t);
		},
		useMemoCache: xs,
		useCacheRefresh: gc,
		useEffectEvent: $s
	};
	function kc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : S({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ac = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Wd(), i = Eo(r);
			i.payload = t, n != null && (i.callback = n), t = Do(e, i, r), t !== null && (qd(t, e, r), Oo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Wd(), i = Eo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Do(e, i, r), t !== null && (qd(t, e, r), Oo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Wd(), r = Eo(n);
			r.tag = 2, t != null && (r.callback = t), t = Do(e, r, n), t !== null && (qd(t, e, n), Oo(t, e, n));
		}
	};
	function jc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !ei(n, r) || !ei(i, a) : !0;
	}
	function Mc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ac.enqueueReplaceState(t, t.state, null);
	}
	function Nc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = S({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Pc(e) {
		Mi(e);
	}
	function Fc(e) {
		console.error(e);
	}
	function Ic(e) {
		Mi(e);
	}
	function Lc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Rc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function zc(e, t, n) {
		return n = Eo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Lc(e, t);
		}, n;
	}
	function Bc(e) {
		return e = Eo(e), e.tag = 3, e;
	}
	function Vc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Rc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Rc(t, n, r), typeof i != "function" && (L === null ? L = /* @__PURE__ */ new Set([this]) : L.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Hc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Pa(t, n, a, !0), n = Bo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Vo === null ? of() : n.alternate === null && yd === 0 && (yd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === so ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Of(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === so ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Of(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Of(e, r, a), of(), !1;
		}
		if (O) return t = Bo.current, t === null ? (r !== ya && (t = Error(i(423), { cause: r }), Ea(ea(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ea(r, n), a = zc(e.stateNode, r, a), ko(e, a), yd !== 4 && (yd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ya && (e = Error(i(422), { cause: r }), Ea(ea(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ea(o, n), Td === null ? Td = [o] : Td.push(o), yd !== 4 && (yd = 2), t === null) return !0;
		r = ea(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = zc(n.stateNode, r, e), ko(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (L === null || !L.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Bc(a), Vc(a, e, n, r), ko(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Uc = Error(i(461)), Wc = !1;
	function Gc(e, t, n, r) {
		t.child = e === null ? So(t, null, n, r) : xo(t, e.child, n, r);
	}
	function Kc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ia(t), r = ls(e, t, n, o, a, i), s = ps(), e !== null && !Wc ? (ms(e, t, i), bl(e, t, i)) : (O && s && fa(t), t.flags |= 1, Gc(e, t, r, i), t.child);
	}
	function qc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Gi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Jc(e, t, a, r, i)) : (e = Ji(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !xl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? ei : n, n(o, r) && e.ref === t.ref) return bl(e, t, i);
		}
		return t.flags |= 1, e = Ki(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Jc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (ei(a, r) && e.ref === t.ref) {
				if (Wc = !1, t.pendingProps = r = a, xl(e, i)) e.flags & 131072 && (Wc = !0);
				else return t.lanes = e.lanes, bl(e, t, i);
			}
		}
		return nl(e, t, n, r, i);
	}
	function Yc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Zc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && no(t, a === null ? null : a.cachePool), a === null ? Ro() : Lo(t, a), Wo(t);
			else return r = t.lanes = 536870912, Zc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && no(t, null), Ro(), Go()) : (no(t, a.cachePool), Lo(t, a), Go(), t.memoizedState = null);
		return Gc(e, t, i, n), t.child;
	}
	function Xc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Zc(e, t, n, r, i) {
		var a = to();
		return a = a === null ? null : {
			parent: k._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && no(t, null), Ro(), Wo(t), e !== null && Pa(e, t, r, !0), t.childLanes = i, null;
	}
	function Qc(e, t) {
		return t = dl({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function $c(e, t, n) {
		return xo(t, e.child, null, n), e = Qc(t, t.pendingProps), e.flags |= 2, Ko(t), t.memoizedState = null, e;
	}
	function el(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (O) {
				if (r.mode === "hidden") return e = Qc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Xc(null, e);
				if (Uo(t), (e = ga) ? (e = bm(e, va), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: sa === null ? null : {
						id: ca,
						overflow: la
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Zi(e), n.return = t, t.child = n, ha = t, ga = null)) : e = null, e === null) throw ba(t);
				return t.lanes = 536870912, null;
			}
			return Qc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Uo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = $c(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Wc || Pa(e, t, n, !1), a = (n & e.childLanes) !== 0, Wc || a) {
				if (Fo.current === null) {
					if (r = pd, r !== null && (s = Dt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, zi(e, s), qd(r, e, s), Uc;
					of();
				}
				t = $c(e, t, n);
			} else e = o.treeContext, ga = wm(s.nextSibling), ha = t, O = !0, _a = null, va = !1, e !== null && ma(t, e), t = Qc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ki(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function tl(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function nl(e, t, n, r, i) {
		return Ia(t), n = ls(e, t, n, r, void 0, i), r = ps(), e !== null && !Wc ? (ms(e, t, i), bl(e, t, i)) : (O && r && fa(t), t.flags |= 1, Gc(e, t, n, i), t.child);
	}
	function rl(e, t, n, r, i, a) {
		return Ia(t), t.updateQueue = null, n = ds(t, r, n, i), us(e), r = ps(), e !== null && !Wc ? (ms(e, t, a), bl(e, t, a)) : (O && r && fa(t), t.flags |= 1, Gc(e, t, n, a), t.child);
	}
	function il(e, t, n, r, i) {
		if (Ia(t), t.stateNode === null) {
			var a = Hi, o = n.contextType;
			typeof o == "object" && o && (a = La(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ac, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, wo(t), o = n.contextType, a.context = typeof o == "object" && o ? La(o) : Hi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (kc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ac.enqueueReplaceState(a, a.state, null), Mo(t, r, a, i), jo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Nc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Hi, typeof u == "object" && u && (o = La(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Mc(t, a, r, o), Co = !1;
			var f = t.memoizedState;
			a.state = f, Mo(t, r, a, i), jo(), l = t.memoizedState, s || f !== l || Co ? (typeof d == "function" && (kc(t, n, d, r), l = t.memoizedState), (c = Co || jc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, To(e, t), o = t.memoizedProps, u = Nc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Hi, typeof l == "object" && l && (c = La(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Mc(t, a, r, c), Co = !1, f = t.memoizedState, a.state = f, Mo(t, r, a, i), jo();
			var p = t.memoizedState;
			o !== d || f !== p || Co || e !== null && e.dependencies !== null && Fa(e.dependencies) ? (typeof s == "function" && (kc(t, n, s, r), p = t.memoizedState), (u = Co || jc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Fa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, tl(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = xo(t, e.child, null, i), t.child = xo(t, null, n, i)) : Gc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = bl(e, t, i), e;
	}
	function al(e, t, n, r) {
		return wa(), t.flags |= 256, Gc(e, t, n, r), t.child;
	}
	var ol = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function sl(e) {
		return {
			baseLanes: e,
			cachePool: ro()
		};
	}
	function cl(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Cd), e;
	}
	function ll(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(qo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (O) {
				if (i ? Ho(t) : Go(), (e = ga) ? (e = bm(e, va), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: sa === null ? null : {
						id: ca,
						overflow: la
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Zi(e), n.return = t, t.child = n, ha = t, ga = null)) : e = null, e === null) throw ba(t);
				return t.lanes = Sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Go(), i = t.mode, a = dl({
				mode: "hidden",
				children: a
			}, i), r = Yi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = sl(n), r.childLanes = cl(e, o, n), t.memoizedState = ol, Xc(null, r)) : (Ho(t), ul(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return pl(e, t, a, o, r, c, s, n);
		}
		return i ? (Go(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ki(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Yi(i, a, n, null), i.flags |= 2) : i = Ki(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Xc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = sl(n) : (a = i.cachePool, a === null ? a = ro() : (s = k._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = cl(e, o, n), t.memoizedState = ol, Xc(e.child, r)) : (Ho(t), n = e.child, e = n.sibling, n = Ki(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function ul(e, t) {
		return t = dl({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function dl(e, t) {
		return e = Wi(22, e, null, t), e.lanes = 0, e;
	}
	function fl(e, t, n) {
		return xo(t, e.child, null, n), e = ul(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function pl(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Ho(t), t.flags &= -257, fl(e, t, c)) : t.memoizedState === null ? (Go(), o = a.fallback, s = t.mode, a = dl({
			mode: "visible",
			children: a.children
		}, s), o = Yi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, xo(t, e.child, null, c), a = t.child, a.memoizedState = sl(c), a.childLanes = cl(e, r, c), t.memoizedState = ol, Xc(null, a)) : (Go(), t.child = e.child, t.flags |= 128, null);
		if (Ho(t), Sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, Ea({
				value: a,
				source: null,
				stack: null
			})), fl(e, t, c);
		}
		if (Wc || Pa(e, t, c, !1), r = (c & e.childLanes) !== 0, Wc || r) {
			if (Fo.current !== null) return fl(e, t, c);
			if (r = pd, r !== null && (a = Dt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, zi(e, a), qd(r, e, a), Uc;
			return xm(o) || of(), fl(e, t, c);
		}
		return xm(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, ga = wm(o.nextSibling), ha = t, O = !0, _a = null, va = !1, e !== null && ma(t, e), t = ul(t, a.children), t.flags |= 134221824, t);
	}
	function ml(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ma(e.return, t, n);
	}
	function hl(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Xo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function gl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function _l(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function vl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = qo.current;
		if (t.flags & 128) return Jo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Jo(t, o), i === "backwards" && e !== null ? (_l(e), Gc(e, t, r, n), _l(e)) : Gc(e, t, r, n), r = O ? ia : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && ml(e, n, t);
			else if (e.tag === 19) ml(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = hl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, _l(t)), gl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Xo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				gl(t, !0, n, null, a, r);
				break;
			case "together":
				gl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = hl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), gl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function yl(e, t, n) {
		var r = t.pendingProps;
		return Aa(t, t.type, r.value), Gc(e, t, r.children, n), t.child;
	}
	function bl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), bd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Pa(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ki(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ki(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function xl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Fa(e)));
	}
	function Sl(e, t, n) {
		switch (t.tag) {
			case 3:
				Fe(t, t.stateNode.containerInfo), Aa(t, k, e.memoizedState.cache), wa();
				break;
			case 27:
			case 5:
				Le(t);
				break;
			case 4:
				Fe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Aa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Uo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Ho(t), t.flags |= 128, null;
					r = Pa(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? ll(e, t, n) : (Ho(t), e = bl(e, t, n), e === null ? null : e.sibling);
				}
				Ho(t);
				break;
			case 19:
				if (t.flags & 128) return vl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Pa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return vl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Jo(t, qo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Yc(e, t, n, t.pendingProps);
			case 24: Aa(t, k, e.memoizedState.cache);
		}
		return bl(e, t, n);
	}
	function Cl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Wc = !0;
			else {
				if (!xl(e, n) && !(t.flags & 128)) return Wc = !1, Sl(e, t, n);
				Wc = !!(e.flags & 131072);
			}
		} else Wc = !1, O && t.flags & 1048576 && da(t, ia, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = uo(t.elementType), t.type = e, typeof e == "function") Gi(e) ? (r = Nc(e, r), t.tag = 1, t = il(null, t, e, r, n)) : (t.tag = 0, t = nl(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === fe) {
								t.tag = 11, t = Kc(null, t, e, r, n);
								break a;
							}
							if (a === he) {
								t.tag = 14, t = qc(null, t, e, r, n);
								break a;
							}
							if (a === de) {
								t.tag = 10, t.type = e, t = yl(null, t, n);
								break a;
							}
						}
						throw t = we(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return nl(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Nc(r, t.pendingProps), il(e, t, r, a, n);
			case 3:
				a: {
					if (Fe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, To(e, t), Mo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Aa(t, k, r), r !== o.cache && Na(t, [k], n, !0), jo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = al(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = ea(Error(i(424)), t), Ea(a), t = al(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (ga = wm(e.firstChild), ha = t, O = !0, _a = null, va = !0, n = So(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (wa(), r === a) {
							t = bl(e, t, n);
							break a;
						}
						Gc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return tl(e, t), e === null ? (n = B(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : O || (t.stateNode = Dp(t.type, t.pendingProps, Pe.current, t)) : t.memoizedState = B(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Le(t), e === null && O && (r = t.stateNode = km(t.type, t.pendingProps, Pe.current), ha = t, va = !0, a = ga, Lp(t.type) ? (Tm = a, ga = wm(r.firstChild)) : ga = a), Gc(e, t, t.pendingProps.children, n), tl(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && O && ((a = r = ga) && (r = vm(r, t.type, t.pendingProps, va), r === null ? a = !1 : (t.stateNode = r, ha = t, ga = wm(r.firstChild), va = !1, a = !0)), a || ba(t)), Le(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Op(a, o) ? r = null : s !== null && Op(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ls(e, t, fs, null, null, n), yh._currentValue = a), tl(e, t), Gc(e, t, r, n), t.child;
			case 6: return e === null && O && ((e = n = ga) && (n = ym(n, t.pendingProps, va), n === null ? e = !1 : (t.stateNode = n, ha = t, ga = null, e = !0)), e || ba(t)), null;
			case 13: return ll(e, t, n);
			case 4: return Fe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = xo(t, null, r, n) : Gc(e, t, r, n), t.child;
			case 11: return Kc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, tl(e, t), Gc(e, t, r, n), t.child;
			case 8: return Gc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Gc(e, t, t.pendingProps.children, n), t.child;
			case 10: return yl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Ia(t), a = La(a), r = r(a), t.flags |= 1, Gc(e, t, r, n), t.child;
			case 14: return qc(e, t, t.type, t.pendingProps, n);
			case 15: return Jc(e, t, t.type, t.pendingProps, n);
			case 19: return vl(e, t, n);
			case 31: return el(e, t, n);
			case 22: return Yc(e, t, n, t.pendingProps);
			case 24: return Ia(t), r = La(k), e === null ? (a = to(), a === null && (a = pd, o = A(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, wo(t), Aa(t, k, a)) : ((e.lanes & n) !== 0 && (To(e, t), Mo(t, null, null, n), jo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Aa(t, k, r), r !== a.cache && Na(t, [k], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Aa(t, k, r))), Gc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : O && fa(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : tl(e, t), Gc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function wl(e) {
		e.flags |= 4;
	}
	function Tl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? oh(t, r) : oh(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (nf()) e.flags |= 8192;
				else throw fo = so, ao;
			}
		} else e.flags &= -16777217;
	}
	function El(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !sh(t)) {
			if (nf()) e.flags |= 8192;
			else throw fo = so, ao;
		}
	}
	function Dl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : xt(), e.lanes |= t, wd |= t);
	}
	function Ol(e, t) {
		if (!O) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function N(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function kl(e, t, n) {
		var r = t.pendingProps;
		switch (pa(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return N(t), null;
			case 1: return N(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ja(k), Ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ca(t) ? wl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ta())), N(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (wl(t), o === null ? (N(t), Tl(t, a, null, r, n)) : (N(t), El(t, o))) : o ? o === e.memoizedState ? (N(t), t.flags &= -16777217) : (wl(t), N(t), El(t, o)) : (e = e.memoizedProps, e !== r && wl(t), N(t), Tl(t, a, e, r, n)), null;
			case 27:
				if (Re(t), n = Pe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && wl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return N(t), t.subtreeFlags &= -33554433, null;
					}
					e = E.current, Ca(t) ? xa(t, e) : (e = km(a, r, n), t.stateNode = e, wl(t));
				}
				return N(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Re(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && wl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return N(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = E.current, Ca(t)) xa(t, o);
					else {
						var s = wp(Pe.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Nt] = t, o[Pt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (_p(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && wl(t);
					}
				}
				return N(t), t.subtreeFlags &= -33554433, Tl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && wl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Pe.current, Ca(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ha, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Nt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || mp(e.nodeValue, n)), e || ba(t, !0);
					} else e = wp(e).createTextNode(r), e[Nt] = t, t.stateNode = e;
				}
				return N(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ca(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Nt] = t;
						} else wa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						N(t), e = !1;
					} else n = Ta(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Ko(t), t) : (Ko(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return N(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ca(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Nt] = t;
						} else wa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						N(t), a = !1;
					} else a = Ta(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Ko(t), t) : (Ko(t), null);
				}
				return Ko(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Dl(t, t.updateQueue), N(t), null);
			case 4: return Ie(), e === null && ip(t.stateNode.containerInfo), t.flags |= 67108864, N(t), null;
			case 10: return ja(t.type), N(t), null;
			case 19:
				if (Yo(t), r = t.memoizedState, r === null) return N(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Ol(r, !1);
					else {
						if (yd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Xo(e), o !== null) {
								for (t.flags |= 128, Ol(r, !1), e = o.updateQueue, t.updateQueue = e, Dl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) qi(n, e), n = n.sibling;
								return Jo(t, qo.current & 1 | 2), O && ua(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ze() > Ad && (t.flags |= 128, a = !0, Ol(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Xo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Dl(t, e), Ol(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !O) return N(t), null;
						} else 2 * Ze() - r.renderingStartTime > Ad && n !== 536870912 && (t.flags |= 128, a = !0, Ol(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ze(), e.sibling = null, o = qo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || O ? Jo(t, o) : (n = o, Me(Bo, t), Me(qo, n), Vo === null && (Vo = t)), O && ua(t, r.treeForkCount), e;
				}
				return N(t), null;
			case 22:
			case 23: return Ko(t), zo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (N(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : N(t), n = t.updateQueue, n !== null && Dl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && je(j), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ja(k), N(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, N(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function Al(e, t) {
		switch (pa(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ja(k), Ie(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Re(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Ko(t), t.alternate === null) throw Error(i(340));
					wa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Ko(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					wa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Yo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Ie(), null;
			case 10: return ja(t.type), null;
			case 22:
			case 23: return Ko(t), zo(), e !== null && je(j), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ja(k), null;
			case 25: return null;
			default: return null;
		}
	}
	function jl(e, t) {
		switch (pa(t), t.tag) {
			case 3:
				ja(k), Ie();
				break;
			case 26:
			case 27:
			case 5:
				Re(t);
				break;
			case 4:
				Ie();
				break;
			case 31:
				t.memoizedState !== null && Ko(t);
				break;
			case 13:
				Ko(t);
				break;
			case 19:
				Yo(t);
				break;
			case 10:
				ja(t.type);
				break;
			case 22:
			case 23:
				Ko(t), zo(), e !== null && je(j);
				break;
			case 24: ja(k);
		}
	}
	function Ml(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Df(t, t.return, e);
		}
	}
	function Nl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Df(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Df(t, t.return, e);
		}
	}
	function Pl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Po(t, n);
			} catch (t) {
				Df(e, e.return, t);
			}
		}
	}
	function Fl(e, t, n) {
		n.props = Nc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Df(e, t, n);
		}
	}
	function Il(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = ki(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Yp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Xp(e);
							p(e.child, !1, pm, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Df(e, t, n);
		}
	}
	function Ll(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Df(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Df(e, t, n);
			}
			else n.current = null;
		}
	}
	function Rl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) hm(e.stateNode, t[n]);
	}
	function zl(e) {
		for (var t = e.return; t !== null && (Hl(t) && hm(e.stateNode, t.stateNode), !Vl(t));) t = t.return;
	}
	function Bl(e) {
		for (var t = e.return; t !== null && (Hl(t) && gm(e.stateNode, t.stateNode), !Vl(t));) t = t.return;
	}
	function Vl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Hl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Ul(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Df(e, e.return, t);
		}
	}
	function Wl(e, t, n) {
		try {
			var r = e.stateNode;
			yp(r, e.type, n, t), r[Pt] = t;
		} catch (t) {
			Df(e, e.return, t);
		}
	}
	function Gl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Lp(e.type) || e.tag === 4;
	}
	function Kl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Gl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Lp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function ql(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = An)), Rl(e, r), rn = !0;
		else if (i !== 4 && (i === 27 && (Rl(e, r), r = null, Lp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (ql(e, t, n, r), e = e.sibling; e !== null;) ql(e, t, n, r), e = e.sibling;
	}
	function Jl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Rl(e, r), rn = !0;
		else if (i !== 4 && (i === 27 && (Rl(e, r), r = null, Lp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Jl(e, t, n, r), e = e.sibling; e !== null;) Jl(e, t, n, r), e = e.sibling;
	}
	function Yl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			_p(t, r, n), t[Nt] = e, t[Pt] = n;
		} catch (t) {
			Df(e, e.return, t);
		}
	}
	var Xl = !1, Zl = null;
	function Ql(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Xl = !0);
	}
	var $l = null;
	function eu() {
		var e = $l;
		return $l = null, e;
	}
	var tu = 0;
	function nu(e, t, n, r, i) {
		return tu = 0, ru(e.child, t, n, r, i);
	}
	function ru(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Up(o);
					r.push(s), s.view && (a = !0);
				} else a || Up(o).view && (a = !0);
				Xl = !0, Bp(o, tu === 0 ? t : t + "_" + tu, n), tu++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || ru(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function iu(e, t) {
		for (; e !== null;) e.tag === 5 ? Vp(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || iu(e.child, t), e = e.sibling;
	}
	function au(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (au(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = ji(t.default, t.share), t !== "none" && (nu(e, n, t, null, !1) || iu(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function ou(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = ki(r, n), a = ji(r.default, n.paired ? r.share : r.enter);
			a === "none" ? au(e) : nu(e, i, a, null, !1) ? (au(e), n.paired || t || Kd(e, r.onEnter)) : iu(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) ou(e, t), e = e.sibling;
		else au(e);
	}
	function su(e) {
		if (Zl !== null && Zl.size !== 0) {
			var t = Zl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = ji(n.default, n.share);
								if (a !== "none" && (nu(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Kd(e, n.onShare)) : iu(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					su(e);
				}
				e = e.sibling;
			}
		}
	}
	function cu(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = ki(t, e.stateNode), r = Zl === null ? void 0 : Zl.get(n), i = ji(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (nu(e, n, i, null, !1) ? r === void 0 ? Kd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Zl.delete(n), Kd(e, t.onShare)) : iu(e.child, !1)), Zl !== null && su(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) cu(e), e = e.sibling;
		else Zl !== null && su(e);
	}
	function lu(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = ki(t, e.stateNode);
				t = ji(t.default, t.update), e.flags &= -5, t !== "none" && nu(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && lu(e);
			e = e.sibling;
		}
	}
	function uu(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, iu(e.child, !1));
				}
				uu(e);
			}
			e = e.sibling;
		}
	}
	function du(e) {
		if (e.tag === 30) e.stateNode.paired = null, iu(e.child, !1), uu(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) du(e), e = e.sibling;
		else uu(e);
	}
	function fu(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? iu(e.child, !1) : e.subtreeFlags & 33554432 && fu(e), e = e.sibling;
	}
	function pu(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && tu < a.length) {
					var l = a[tu], u = Up(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Bp(c, tu === 0 ? n : n + "_" + tu, i), s && e.flags & 4 || ($l === null && ($l = []), $l.push(c, tu === 0 ? r : r + "_" + tu, t.memoizedProps)), tu++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : pu(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function mu(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = ki(n, r), a = ji(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(Wp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				tu = 0, i = pu(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Kd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && mu(e, t);
			e = e.sibling;
		}
	}
	var hu = !1, gu = !1, _u = !1, vu = !1, yu = typeof WeakSet == "function" ? WeakSet : Set, bu = null, xu = !1, Su = !1, Cu = !1, wu = !1;
	function Tu(e, t, n) {
		if (e = e.containerInfo, Sp = Oh, e = ai(e), oi(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (Cp = {
			focusedElem: e,
			selectionRange: r
		}, Oh = !1, n = (n & 335544064) === n, bu = t, t = n ? 9270 : 1024; bu !== null;) {
			if (e = bu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && cu(r[a]);
			if (e.alternate === null && e.flags & 2) n && Ql(e), Eu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && cu(r), Eu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Ql(e), Eu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, bu = r) : (n && lu(e), Eu(n));
			}
		}
		Zl = null;
	}
	function Eu(e) {
		for (; bu !== null;) {
			var t = bu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Nc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Df(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) _m(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								_m(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = ki(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = ji(a.default, a.update), a !== "none" && nu(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, bu = r;
				break;
			}
			bu = t.return;
		}
	}
	function Du(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				qu(e, n), r & 4 && Ml(5, n);
				break;
			case 1:
				if (qu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Df(n, n.return, e);
					}
					else {
						var i = Nc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Df(n, n.return, e);
						}
					}
				}
				r & 64 && Pl(n), r & 512 && Il(n, n.return);
				break;
			case 3:
				if (qu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Po(e, t);
					} catch (e) {
						Df(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Yl(n);
			case 26:
			case 5:
				qu(e, n), t === null && r & 4 && Ul(n), r & 512 && Il(n, n.return);
				break;
			case 12:
				qu(e, n);
				break;
			case 31:
				qu(e, n), r & 4 && Iu(e, n);
				break;
			case 13:
				qu(e, n), r & 4 && Lu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = jf.bind(null, n), Cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || hu, !r) {
					var a = t !== null && t.memoizedState !== null || gu;
					t = hu, i = gu, hu = r, (gu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Yu(e, n, r)) : qu(e, n), hu = t, gu = i;
				}
				break;
			case 30:
				qu(e, n), r & 512 && Il(n, n.return);
				break;
			case 7: r & 512 && Il(n, n.return);
			default: qu(e, n);
		}
	}
	function Ou(e, t) {
		for (e = e.child; e !== null;) ku(e, t), e = e.sibling;
	}
	function ku(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					Df(e, e.return, t);
				}
				Au(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, rn = !0;
				} catch (t) {
					Df(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? zp(s, !0) : zp(e.stateNode, !1);
				} catch (t) {
					Df(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && Ou(e, t);
				break;
			default: Ou(e, t);
		}
	}
	function Au(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						ku(n, r);
						break a;
					case 22:
						n.memoizedState === null && Au(n, r);
						break a;
					default: Au(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function ju(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, ju(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Mu = null, Nu = !1;
	function Pu(e, t, n) {
		for (n = n.child; n !== null;) Fu(e, t, n), n = n.sibling;
	}
	function Fu(e, t, n) {
		if (st && typeof st.onCommitFiberUnmount == "function") try {
			st.onCommitFiberUnmount(ot, n);
		} catch {}
		switch (n.tag) {
			case 26:
				gu || Ll(n, t), Pu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !gu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				gu || Ll(n, t), Bl(n);
				var r = Mu, i = Nu;
				Lp(n.type) && (Mu = n.stateNode, Nu = !1), Pu(e, t, n), Am(n.stateNode, n.type, n.memoizedProps), Mu = r, Nu = i;
				break;
			case 5: gu || Ll(n, t), Bl(n);
			case 6:
				if (n.tag === 6 && Bl(n), r = Mu, i = Nu, Mu = null, Pu(e, t, n), Mu = r, Nu = i, Mu !== null) {
					if (Nu) try {
						(Mu.nodeType === 9 ? Mu.body : Mu.nodeName === "HTML" ? Mu.ownerDocument.body : Mu).removeChild(n.stateNode), rn = !0;
					} catch (e) {
						Df(n, t, e);
					}
					else try {
						Mu.removeChild(n.stateNode), rn = !0;
					} catch (e) {
						Df(n, t, e);
					}
				}
				break;
			case 18:
				Mu !== null && (Nu ? (e = Mu, Rp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), eg(e)) : Rp(Mu, n.stateNode));
				break;
			case 4:
				r = Mu, i = Nu, Mu = n.stateNode.containerInfo, Nu = !0, Pu(e, t, n), Mu = r, Nu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Nl(2, n, t), gu || Nl(4, n, t), Pu(e, t, n);
				break;
			case 1:
				gu || (Ll(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Fl(n, t, r)), Pu(e, t, n);
				break;
			case 21:
				Pu(e, t, n);
				break;
			case 22:
				gu = (r = gu) || n.memoizedState !== null, Pu(e, t, n), gu = r;
				break;
			case 30:
				Ll(n, t), Pu(e, t, n);
				break;
			case 7:
				gu || Ll(n, t), Pu(e, t, n);
				break;
			default: Pu(e, t, n);
		}
	}
	function Iu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				eg(e);
			} catch (e) {
				Df(t, t.return, e);
			}
		}
	}
	function Lu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			eg(e);
		} catch (e) {
			Df(t, t.return, e);
		}
	}
	function Ru(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new yu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new yu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function zu(e, t) {
		var n = Ru(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Mf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Bu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Lp(l.type)) {
							Mu = l.stateNode, Nu = !1;
							break a;
						}
						break;
					case 5:
						Mu = l.stateNode, Nu = !1;
						break a;
					case 3:
					case 4:
						Mu = l.stateNode.containerInfo, Nu = !0;
						break a;
				}
				l = l.return;
			}
			if (Mu === null) throw Error(i(160));
			Fu(s, c, o), Mu = null, Nu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Hu(t, e, n), t = t.sibling;
	}
	var Vu = null;
	function Hu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Bu(t, e, n), Uu(e), a & 4 && (Nl(3, e, e.return), Ml(3, e), Nl(5, e, e.return));
				break;
			case 1:
				Bu(t, e, n), Uu(e), a & 512 && (gu || r === null || Ll(r, r.return)), a & 64 && hu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Vu, Bu(t, e, n), Uu(e), a & 512 && (gu || r === null || Ll(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (hu) e.stateNode = Dp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Bt] || r[Nt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), _p(r, t, n), r[Nt] = e, qt(r), t = r;
												break a;
											case "link":
												if (o = rh("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), _p(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = rh("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), _p(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Nt] = e, qt(r), t = r;
									}
									e.stateNode = t;
								}
							} else hu || ih(o, e.type, e.stateNode);
						} else e.stateNode = Qm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Wl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || gu || t.parentNode.removeChild(t)) : a.count--, n === null ? hu || ih(o, e.type, e.stateNode) : Qm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Bu(t, e, n), Uu(e), a & 512 && (gu || r === null || Ll(r, r.return)), r !== null && a & 4 && Wl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = _u, _u = !1, Bu(t, e, n), _u = o, Uu(e), a & 512 && (gu || r === null || Ll(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						Sn(t, ""), rn = !0;
					} catch (t) {
						Df(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Wl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (vu = !0);
				break;
			case 6:
				if (Bu(t, e, n), Uu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, rn = !0;
					} catch (t) {
						Df(e, e.return, t);
					}
				}
				break;
			case 3:
				if (rn = !1, nh = null, o = Vu, Vu = Pm(t.containerInfo), Bu(t, e, n), Vu = o, Uu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					eg(t.containerInfo);
				} catch (t) {
					Df(e, e.return, t);
				}
				vu && (vu = !1, Wu(e)), rn = !1;
				break;
			case 4:
				a = _u, _u = hu, r = an(), o = Vu, Vu = Pm(e.stateNode.containerInfo), Bu(t, e, n), Uu(e), Vu = o, rn && Su && (Cu = !0), rn = r, _u = a;
				break;
			case 12:
				Bu(t, e, n), Uu(e);
				break;
			case 31:
				Bu(t, e, n), Uu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, zu(e, t)));
				break;
			case 13:
				Bu(t, e, n), Uu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (Od = Ze()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, zu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = hu, l = gu, u = _u;
				hu = c || o, _u = u || o, gu = l || s, Bu(t, e, n), gu = l, _u = u, hu = c, Uu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || hu || gu || (t = s || gu, n = hu, r = gu, hu = o || hu, gu = t, Ju(e, 2), hu = n, gu = r), !o && _u || Ou(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, zu(e, n))));
				break;
			case 19:
				Bu(t, e, n), Uu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, zu(e, t)));
				break;
			case 30:
				a & 512 && (gu || r === null || Ll(r, r.return)), a = an(), o = Su, s = (n & 335544064) === n, c = e.memoizedProps, Su = s && ji(c.default, c.update) !== "none", Bu(t, e, n), Uu(e), s && r !== null && rn && (e.flags |= 4), Su = o, rn = a;
				break;
			case 21: break;
			case 7: a & 512 && (gu || r === null || Ll(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Bu(t, e, n), Uu(e);
		}
	}
	function Uu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Gl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Hl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Vl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Jl(e, Kl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (Sn(l, ""), n.flags &= -33), Jl(e, Kl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						ql(e, Kl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Df(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Wu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Wu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Oh = !0, t.reset(), Oh = !1), e = e.sibling;
		}
	}
	function Gu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Ku(t, e), t = t.sibling;
		else mu(t, !1);
	}
	function Ku(e, t) {
		var n = e.alternate;
		if (n === null) ou(e, !1);
		else switch (e.tag) {
			case 3:
				if (wu = xu = !1, eu(), Gu(t, e), !xu && !Cu) {
					if (e = $l, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Vp(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), wu = !0;
				}
				$l = null;
				break;
			case 5:
				Gu(t, e);
				break;
			case 4:
				r = xu, xu = !1, Gu(t, e), xu && (Cu = !0), xu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Gu(t, e) : ou(e, !1));
				break;
			case 30:
				r = xu, i = eu(), xu = !1, Gu(t, e), xu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = ki(a, o), o = ki(n.memoizedProps, o);
				var s = ji(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, tu = 0, t = pu(e, n, t, o, s, a, !0), tu !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Kd(e, e.memoizedProps.onUpdate), $l = i) : i !== null && (i.push.apply(i, $l), $l = i), xu = e.flags & 32 ? !0 : r;
				break;
			default: Gu(t, e);
		}
	}
	function qu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Du(e, t.alternate, t), t = t.sibling;
	}
	function Ju(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Nl(4, n, n.return), Ju(n, r);
					break;
				case 1:
					Ll(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && Fl(n, n.return, i), Ju(n, r);
					break;
				case 27: r & 2 && Am(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Ll(n, n.return), n.tag !== 5 && n.tag !== 27 || Bl(n), Ju(n, r);
					break;
				case 6:
					Bl(n);
					break;
				case 26:
					Ll(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || gu || i.parentNode.removeChild(i), Ju(n, r);
					break;
				case 22:
					n.memoizedState === null && Ju(n, r);
					break;
				case 30:
					Ll(n, n.return), Ju(n, r);
					break;
				case 7: Ll(n, n.return);
				default: Ju(n, r);
			}
			e = e.sibling;
		}
	}
	function Yu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Yu(i, a, n), Ml(4, a);
					break;
				case 1:
					if (Yu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Df(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) No(l[i], c);
						} catch (e) {
							Df(r, r.return, e);
						}
					}
					s && o & 64 && Pl(a), Il(a, a.return);
					break;
				case 27: n & 2 && Yl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || zl(a), Yu(i, a, n), s && r === null && o & 4 && Ul(a), Il(a, a.return);
					break;
				case 6:
					zl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || hu || ih(Pm(c.ownerDocument), a.type, c), Yu(i, a, n), s && r === null && o & 4 && Ul(a), Il(a, a.return);
					break;
				case 12:
					Yu(i, a, n);
					break;
				case 31:
					Yu(i, a, n), s && o & 4 && Iu(i, a);
					break;
				case 13:
					Yu(i, a, n), s && o & 4 && Lu(i, a);
					break;
				case 22:
					a.memoizedState === null && Yu(i, a, n), Il(a, a.return);
					break;
				case 30:
					Yu(i, a, n), Il(a, a.return);
					break;
				case 7: Il(a, a.return);
				default: Yu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Xu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ua(n));
	}
	function Zu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ua(e));
	}
	function Qu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) $u(e, t, n, r), t = t.sibling;
		else i && fu(t);
	}
	function $u(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && du(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Qu(e, t, n, r), a & 2048 && Ml(9, t);
				break;
			case 1:
				Qu(e, t, n, r);
				break;
			case 3:
				Qu(e, t, n, r), i && wu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ua(a)));
				break;
			case 12:
				if (a & 2048) {
					Qu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Df(t, t.return, e);
					}
				} else Qu(e, t, n, r);
				break;
			case 31:
				Qu(e, t, n, r);
				break;
			case 13:
				Qu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && du(t), o._visibility & 2 ? Qu(e, t, n, r) : (o._visibility |= 2, ed(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && du(s), o._visibility & 2 ? Qu(e, t, n, r) : td(e, t)), a & 2048 && Xu(s, t);
				break;
			case 24:
				Qu(e, t, n, r), a & 2048 && Zu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (iu(a.child, !0), iu(t.child, !0))), Qu(e, t, n, r);
				break;
			default: Qu(e, t, n, r);
		}
	}
	function ed(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					ed(a, o, s, c, i), Ml(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, ed(a, o, s, c, i)) : u._visibility & 2 ? ed(a, o, s, c, i) : td(a, o), i && l & 2048 && Xu(o.alternate, o);
					break;
				case 24:
					ed(a, o, s, c, i), i && l & 2048 && Zu(o.alternate, o);
					break;
				default: ed(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function td(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					td(n, r), i & 2048 && Xu(r.alternate, r);
					break;
				case 24:
					td(n, r), i & 2048 && Zu(r.alternate, r);
					break;
				default: td(n, r);
			}
			t = t.sibling;
		}
	}
	var nd = 8192;
	function rd(e, t, n) {
		if (e.subtreeFlags & nd) for (e = e.child; e !== null;) id(e, t, n), e = e.sibling;
	}
	function id(e, t, n) {
		switch (e.tag) {
			case 26:
				rd(e, t, n), e.flags & nd && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && lh(n, e)) : uh(n, Vu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				rd(e, t, n), e.flags & nd && (e = e.stateNode, (t & 335544128) === t && lh(n, e));
				break;
			case 3:
			case 4:
				var r = Vu;
				Vu = Pm(e.stateNode.containerInfo), rd(e, t, n), Vu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = nd, nd = 16777216, rd(e, t, n), nd = r) : rd(e, t, n));
				break;
			case 30:
				if ((e.flags & nd) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Zl === null && (Zl = /* @__PURE__ */ new Map()), Zl.set(r, i);
				}
				rd(e, t, n);
				break;
			default: rd(e, t, n);
		}
	}
	function ad(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function od(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				bu = r, ld(r, e);
			}
			ad(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) sd(e), e = e.sibling;
	}
	function sd(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				od(e), e.flags & 2048 && Nl(9, e, e.return);
				break;
			case 3:
				od(e);
				break;
			case 12:
				od(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, cd(e)) : od(e);
				break;
			default: od(e);
		}
	}
	function cd(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				bu = r, ld(r, e);
			}
			ad(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Nl(8, t, t.return), cd(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, cd(t));
					break;
				default: cd(t);
			}
			e = e.sibling;
		}
	}
	function ld(e, t) {
		for (; bu !== null;) {
			var n = bu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Nl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ua(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, bu = r;
			else a: for (n = e; bu !== null;) {
				r = bu;
				var i = r.sibling, a = r.return;
				if (ju(r), r === n) {
					bu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, bu = i;
					break a;
				}
				bu = a;
			}
		}
	}
	var ud = {
		getCacheForType: function(e) {
			var t = La(k), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return La(k).controller.signal;
		}
	}, dd = typeof WeakMap == "function" ? WeakMap : Map, fd = 0, pd = null, P = null, F = 0, md = 0, I = null, hd = !1, gd = !1, _d = !1, vd = 0, yd = 0, bd = 0, xd = 0, Sd = 0, Cd = 0, wd = 0, Td = null, Ed = null, Dd = !1, Od = 0, kd = 0, Ad = Infinity, jd = null, L = null, Md = 0, Nd = null, Pd = null, Fd = 0, Id = 0, Ld = null, Rd = null, zd = null, Bd = null, Vd = null, Hd = 0, Ud = null;
	function Wd() {
		return fd & 2 && F !== 0 ? F & -F : T.T === null ? At() : Jf();
	}
	function Gd() {
		if (Cd === 0) {
			if (!(F & 536870912) || O) {
				var e = mt;
				mt <<= 1, !(mt & 3932160) && (mt = 262144), Cd = e;
			} else Cd = 536870912;
		}
		return e = Bo.current, e !== null && (e.flags |= 32), Cd;
	}
	function Kd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Yp(ki(e.memoizedProps, n))), Bd === null && (Bd = []), Bd.push(t.bind(null, r));
		}
	}
	function qd(e, t, n) {
		(e === pd && (md === 2 || md === 9) || e.cancelPendingCommit !== null) && (ef(e, 0), Zd(e, F, Cd, !1)), Ct(e, n), fd & 2 && e === pd || (e === pd && (!(fd & 2) && (xd |= n), yd === 4 && Zd(e, F, Cd, !1)), Bf(e));
	}
	function Jd(e, t, n) {
		if (fd & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || vt(e, t), a = r ? lf(e, t) : sf(e, t, !0), o = r;
		do {
			if (a === 0) {
				gd && !r && Zd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Xd(n)) a = sf(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Td;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (ef(c, s).flags |= 256), s = sf(c, s, !1), s !== 2 && s !== 6) {
								if (_d && !l) {
									c.errorRecoveryDisabledLanes |= o, xd |= o, a = 4;
									break a;
								}
								o = Ed, Ed = a, o !== null && (Ed === null ? Ed = o : Ed.push.apply(Ed, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					ef(e, 0), Zd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Zd(r, t, Cd, !hd);
							break a;
						case 2:
							Ed = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Od + 300 - Ze(), 10 < a)) {
						if (Zd(r, t, Cd, !hd), _t(r, 0, !0) !== 0) break a;
						Fd = t, r.timeoutHandle = jp(Yd.bind(null, r, n, Ed, jd, Dd, t, Cd, xd, wd, hd, o, "Throttled", -0, 0), a);
						break a;
					}
					Yd(r, n, Ed, jd, Dd, t, Cd, xd, wd, hd, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Bf(e);
	}
	function Yd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: An
		}, Zl = null, id(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = mh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? Od - Ze() : (a & 4194048) === a ? kd - Ze() : 0, m = fh(d, m), m !== null) ? (Fd = a, e.cancelPendingCommit = m(gf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Zd(e, a, o, !l)) : gf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Xd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!$r(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Zd(e, t, n, r) {
		t = yt(e, t), t &= ~Sd, t &= ~xd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - lt(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Tt(e, n, t);
	}
	function Qd() {
		return fd & 6 ? !0 : (Vf(0, !1), !1);
	}
	function $d() {
		if (P !== null) {
			if (md === 0) var e = P.return;
			else e = P, ka = Oa = null, hs(e), ho = null, go = 0, e = P;
			for (; e !== null;) jl(e.alternate, e), e = e.return;
			P = null;
		}
	}
	function ef(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, Mp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Fd = 0, $d(), pd = e, P = n = Ki(e.current, null), F = t, md = 0, I = null, hd = !1, gd = vt(e, t), _d = !1, wd = Cd = Sd = xd = bd = yd = 0, Ed = Td = null, Dd = !1, vd = yt(e, t), Ii(), n;
	}
	function tf(e, t) {
		M = null, T.H = Tc, t === io || t === oo ? (t = po(), md = 3) : t === ao ? (t = po(), md = 4) : md = t === Uc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, I = t, P === null && (yd = 1, Lc(e, ea(t, e.current)));
	}
	function nf() {
		var e = Bo.current;
		return e === null ? !0 : (F & 4194048) === F ? Vo === null : (F & 62914560) === F || F & 536870912 ? e === Vo : !1;
	}
	function rf() {
		var e = T.H;
		return T.H = Tc, e === null ? Tc : e;
	}
	function af() {
		var e = T.A;
		return T.A = ud, e;
	}
	function of() {
		yd = 4, hd || (F & 4194048) !== F && Bo.current !== null || (gd = !0), !(bd & 134217727) && !(xd & 134217727) || pd === null || Zd(pd, F, Cd, !1);
	}
	function sf(e, t, n) {
		var r = fd;
		fd |= 2;
		var i = rf(), a = af();
		(pd !== e || F !== t) && (jd = null, ef(e, t)), t = !1;
		var o = yd;
		a: do
			try {
				if (md !== 0 && P !== null) {
					var s = P, c = I;
					switch (md) {
						case 8:
							$d(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Bo.current === null && (t = !0);
							var l = md;
							if (md = 0, I = null, pf(e, s, c, l), n && gd) {
								o = 0;
								break a;
							}
							break;
						default: l = md, md = 0, I = null, pf(e, s, c, l);
					}
				}
				cf(), o = yd;
				break;
			} catch (t) {
				tf(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ka = Oa = null, fd = r, T.H = i, T.A = a, P === null && (pd = null, F = 0, Ii()), o;
	}
	function cf() {
		for (; P !== null;) df(P);
	}
	function lf(e, t) {
		var n = fd;
		fd |= 2;
		var r = rf(), a = af();
		pd !== e || F !== t ? (jd = null, Ad = Ze() + 500, ef(e, t)) : gd = vt(e, t);
		a: do
			try {
				if (md !== 0 && P !== null) {
					t = P;
					var o = I;
					b: switch (md) {
						case 1:
							md = 0, I = null, pf(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (co(o)) {
								md = 0, I = null, ff(t);
								break;
							}
							t = function() {
								md !== 2 && md !== 9 || pd !== e || (md = 7), Bf(e);
							}, o.then(t, t);
							break a;
						case 3:
							md = 7;
							break a;
						case 4:
							md = 5;
							break a;
						case 7:
							co(o) ? (md = 0, I = null, ff(t)) : (md = 0, I = null, pf(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (P.tag) {
								case 26: s = P.memoizedState;
								case 5:
								case 27:
									var c = P;
									if (s ? sh(s) : c.stateNode.complete) {
										md = 0, I = null;
										var l = c.sibling;
										if (l !== null) P = l;
										else {
											var u = c.return;
											u === null ? P = null : (P = u, mf(u));
										}
										break b;
									}
							}
							md = 0, I = null, pf(e, t, o, 5);
							break;
						case 6:
							md = 0, I = null, pf(e, t, o, 6);
							break;
						case 8:
							$d(), yd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				uf();
				break;
			} catch (t) {
				tf(e, t);
			}
		while (1);
		return ka = Oa = null, T.H = r, T.A = a, fd = n, P === null ? (pd = null, F = 0, Ii(), yd) : 0;
	}
	function uf() {
		for (; P !== null && !Ye();) df(P);
	}
	function df(e) {
		var t = Cl(e.alternate, e, vd);
		e.memoizedProps = e.pendingProps, t === null ? mf(e) : P = t;
	}
	function ff(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = rl(n, t, t.pendingProps, t.type, void 0, F);
				break;
			case 11:
				t = rl(n, t, t.pendingProps, t.type.render, t.ref, F);
				break;
			case 5:
				hs(t);
				var r = t;
				r === ha && (O ? (Sa(r), r.tag === 5 && r.stateNode != null && (ga = r.stateNode)) : (Sa(r), O = !0));
			default: jl(n, t), t = P = qi(t, vd), t = Cl(n, t, vd);
		}
		e.memoizedProps = e.pendingProps, t === null ? mf(e) : P = t;
	}
	function pf(e, t, n, r) {
		ka = Oa = null, hs(t), ho = null, go = 0;
		var i = t.return;
		try {
			if (Hc(e, i, t, n, F)) {
				yd = 1, Lc(e, ea(n, e.current)), P = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw P = i, t;
			yd = 1, Lc(e, ea(n, e.current)), P = null;
			return;
		}
		t.flags & 32768 ? (O || r === 1 ? e = !0 : gd || F & 536870912 ? e = !1 : (hd = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Bo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), hf(t, e)) : mf(t);
	}
	function mf(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				hf(t, hd);
				return;
			}
			e = t.return;
			var n = kl(t.alternate, t, vd);
			if (n !== null) {
				P = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				P = t;
				return;
			}
			P = t = e;
		} while (t !== null);
		yd === 0 && (yd = 5);
	}
	function hf(e, t) {
		do {
			var n = Al(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, P = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				P = e;
				return;
			}
			P = e = n;
		} while (e !== null);
		yd = 6, P = null;
	}
	function gf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			wf();
		while (Md !== 0);
		if (fd & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === pd && (P = pd = null, F = 0), Pd = t, Nd = e, Fd = n, Ld = a, Rd = r, _f(e, t, n, s, c, l, f);
		}
	}
	function _f(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Id = s, s |= Fi, wt(e, n, s, r, i, a), Bd = null, (n & 335544064) === n ? (Vd = Ka(e), r = 10262) : (Vd = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Nf(tt, function() {
			return Tf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Xl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = T.T, T.T = null, i = Ee.p, Ee.p = 2, a = fd, fd |= 4;
			try {
				Tu(e, t, n);
			} finally {
				fd = a, Ee.p = i, T.T = r;
			}
		}
		Md = 1, Xl ? zd = qp(o, e.containerInfo, Vd, bf, xf, yf, Sf, Tf, vf, null, null) : (bf(), xf(), Sf());
	}
	function vf(e) {
		if (Md !== 0) {
			var t = Nd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function yf() {
		Md === 3 && (Md = 0, Ku(Pd, Nd), Md = 4);
	}
	function bf() {
		if (Md === 1) {
			Md = 0;
			var e = Nd, t = Pd, n = Fd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = T.T, T.T = null;
				var i = Ee.p;
				Ee.p = 2;
				var a = fd;
				fd |= 4;
				try {
					Su = Cu = !1, Hu(t, e, n), n = Cp;
					var o = ai(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && ii(s.ownerDocument.documentElement, s)) {
						if (c !== null && oi(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = ri(s, h), v = ri(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					Oh = !!Sp, Cp = Sp = null;
				} finally {
					fd = a, Ee.p = i, T.T = r;
				}
			}
			e.current = t, Md = 2;
		}
	}
	function xf() {
		if (Md === 2) {
			Md = 0;
			var e = Nd, t = Pd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = T.T, T.T = null;
				var r = Ee.p;
				Ee.p = 2;
				var i = fd;
				fd |= 4;
				try {
					Du(e, t.alternate, t);
				} finally {
					fd = i, Ee.p = r, T.T = n;
				}
			}
			Md = 3;
		}
	}
	function Sf() {
		if (Md === 4 || Md === 3) {
			Md = 0;
			var e = zd;
			zd = null, Xe();
			var t = Nd, n = Pd, r = Fd, i = Rd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? Md = 5 : (Md = 0, Pd = Nd = null, Cf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (L = null), kt(r), n = n.stateNode, st && typeof st.onCommitFiberRoot == "function") try {
				st.onCommitFiberRoot(ot, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = T.T, a = Ee.p, Ee.p = 2, T.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					T.T = n, Ee.p = a;
				}
			}
			if (i = Bd, o = Vd, Vd = null, i !== null && (Bd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Fd & 3 && wf(), Bf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ud ? Hd++ : (Hd = 0, Ud = t) : (Hd = 0, Ud = null), Vf(0, !1);
		}
	}
	function Cf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ua(t)));
	}
	function wf() {
		return zd !== null && (zd.skipTransition(), zd = null), bf(), xf(), Sf(), Tf();
	}
	function Tf() {
		if (Md !== 5) return !1;
		var e = Nd, t = Id;
		Id = 0;
		var n = kt(Fd), r = T.T, a = Ee.p;
		try {
			Ee.p = 32 > n ? 32 : n, T.T = null, n = Ld, Ld = null;
			var o = Nd, s = Fd;
			if (Md = 0, Pd = Nd = null, Fd = 0, fd & 6) throw Error(i(331));
			var c = fd;
			if (fd |= 4, sd(o.current), $u(o, o.current, s, n), fd = c, Vf(0, !1), st && typeof st.onPostCommitFiberRoot == "function") try {
				st.onPostCommitFiberRoot(ot, o);
			} catch {}
			return !0;
		} finally {
			Ee.p = a, T.T = r, Cf(e, t);
		}
	}
	function Ef(e, t, n) {
		t = ea(n, t), t = zc(e.stateNode, t, 2), e = Do(e, t, 2), e !== null && (Ct(e, 2), Bf(e));
	}
	function Df(e, t, n) {
		if (e.tag === 3) Ef(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Ef(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (L === null || !L.has(r))) {
					e = ea(n, e), n = Bc(2), r = Do(t, n, 2), r !== null && (Vc(n, r, t, e), Ct(r, 2), Bf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Of(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new dd();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (_d = !0, i.add(n), e = kf.bind(null, e, t, n), t.then(e, e));
	}
	function kf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, pd === e && (F & n) === n && (yd === 4 || yd === 3 && (F & 62914560) === F && 300 > Ze() - Od ? fd & 2 ? Sd |= n : ef(e, 0) : Sd |= n, wd === F && (wd = 0)), Bf(e);
	}
	function Af(e, t) {
		t === 0 && (t = xt()), e = zi(e, t), e !== null && (Ct(e, t), Bf(e));
	}
	function jf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Af(e, n);
	}
	function Mf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Af(e, n);
	}
	function Nf(e, t) {
		return qe(e, t);
	}
	var Pf = null, Ff = null, If = !1, Lf = !1, Rf = !1, zf = 0;
	function Bf(e) {
		e !== Ff && e.next === null && (Ff === null ? Pf = Ff = e : Ff = Ff.next = e), Lf = !0, If || (If = !0, qf());
	}
	function Vf(e, t) {
		if (!Rf && Lf) {
			Rf = !0;
			do
				for (var n = !1, r = Pf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - lt(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Kf(r, a));
						} else a = F, a = _t(r, r === pd ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || vt(r, a) || (n = !0, Kf(r, a));
					}
					r = r.next;
				}
			while (n);
			Rf = !1;
		}
	}
	function Hf() {
		Uf();
	}
	function Uf() {
		Lf = If = !1;
		var e = 0;
		zf !== 0 && Ap() && (e = zf);
		for (var t = Ze(), n = null, r = Pf; r !== null;) {
			var i = r.next, a = Wf(r, t);
			a === 0 ? (r.next = null, n === null ? Pf = i : n.next = i, i === null && (Ff = n)) : (n = r, (e !== 0 || a & 3) && (Lf = !0)), r = i;
		}
		Md !== 0 && Md !== 5 || Vf(e, !1), zf !== 0 && (zf = 0);
	}
	function Wf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - lt(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = bt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = pd, n = F, n = _t(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (md === 2 || md === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || vt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Je(r), kt(n)) {
				case 2:
				case 8:
					n = et;
					break;
				case 32:
					n = tt;
					break;
				case 268435456:
					n = rt;
					break;
				default: n = tt;
			}
			return r = Gf.bind(null, e), n = qe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Gf(e, t) {
		if (Md !== 0 && Md !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (wf() && e.callbackNode !== n) return null;
		var r = F;
		return r = _t(e, e === pd ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Jd(e, r, t), Wf(e, Ze()), e.callbackNode != null && e.callbackNode === n ? Gf.bind(null, e) : null);
	}
	function Kf(e, t) {
		if (wf()) return null;
		Jd(e, t, !0);
	}
	function qf() {
		Fp(function() {
			fd & 6 ? qe($e, Hf) : Uf();
		});
	}
	function Jf() {
		if (zf === 0) {
			var e = Ya;
			e === 0 && (e = pt, pt <<= 1, !(pt & 261888) && (pt = 256)), zf = e;
		}
		return zf;
	}
	function Yf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : kn(e);
	}
	function Xf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Yf((i[Pt] || null).action), o = r.submitter;
			o && (t = (t = o[Pt] || null) ? Yf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Zn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (zf !== 0) {
								var e = new FormData(i, o);
								dc(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), dc(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Zf = 0; Zf < Ei.length; Zf++) {
		var Qf = Ei[Zf];
		Di(Qf.toLowerCase(), "on" + (Qf[0].toUpperCase() + Qf.slice(1)));
	}
	Di(vi, "onAnimationEnd"), Di(yi, "onAnimationIteration"), Di(bi, "onAnimationStart"), Di("dblclick", "onDoubleClick"), Di("focusin", "onFocus"), Di("focusout", "onBlur"), Di(xi, "onTransitionRun"), Di(Si, "onTransitionStart"), Di(Ci, "onTransitionCancel"), Di(wi, "onTransitionEnd"), Qt("onMouseEnter", ["mouseout", "mouseover"]), Qt("onMouseLeave", ["mouseout", "mouseover"]), Qt("onPointerEnter", ["pointerout", "pointerover"]), Qt("onPointerLeave", ["pointerout", "pointerover"]), Zt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Zt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Zt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Zt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Zt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Zt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var $f = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ep = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($f));
	function tp(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Mi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Mi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function R(e, t) {
		var n = t[It];
		n === void 0 && (n = t[It] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (ap(t, e, 2, !1), n.add(r));
	}
	function np(e, t, n) {
		var r = 0;
		t && (r |= 4), ap(n, e, r, t);
	}
	var rp = "_reactListening" + Math.random().toString(36).slice(2);
	function ip(e) {
		if (!e[rp]) {
			e[rp] = !0, Yt.forEach(function(t) {
				t !== "selectionchange" && (ep.has(t) || np(t, !1, e), np(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[rp] || (t[rp] = !0, np("selectionchange", !1, t));
		}
	}
	function ap(e, t, n, r) {
		switch (Fh(t)) {
			case 2:
				var i = kh;
				break;
			case 8:
				i = Ah;
				break;
			default: i = jh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Bn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function op(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Ut(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Ln(function() {
			var r = a, i = Mn(n), s = [];
			a: {
				var c = Ti.get(e);
				if (c !== void 0) {
					var l = Zn, u = e;
					switch (e) {
						case "keypress": if (Kn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = hr;
							break;
						case "focusin":
							u = "focus", l = or;
							break;
						case "focusout":
							u = "blur", l = or;
							break;
						case "beforeblur":
						case "afterblur":
							l = or;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = ir;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = ar;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = vr;
							break;
						case vi:
						case yi:
						case bi:
							l = sr;
							break;
						case wi:
							l = yr;
							break;
						case "scroll":
						case "scrollend":
							l = $n;
							break;
						case "wheel":
							l = br;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = cr;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = gr;
							break;
						case "submit":
							l = _r;
							break;
						case "toggle":
						case "beforetoggle": l = xr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Rn(m, p), g != null && d.push(sp(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== jn && (u = n.relatedTarget || n.fromElement) && (Ut(u) || u[Ft])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ut(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = ir, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = gr, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Gt(c), h = l == null ? u : Gt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Ut(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? ie(c, l, lp) : null, c !== null && up(s, u, c, d, !1), l !== null && f !== null && up(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Gt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Vr;
					else if (Fr(c)) {
						if (Hr) _ = Zr;
						else {
							_ = Yr;
							var v = Jr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && En(r.elementType) && (_ = Vr) : _ = Xr;
					if (_ &&= _(e, r)) {
						Ir(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Gt(r) : window, e) {
					case "focusin":
						(Fr(v) || v.contentEditable === "true") && (ci = v, li = r, ui = null);
						break;
					case "focusout":
						ui = li = ci = null;
						break;
					case "mousedown":
						di = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						di = !1, fi(s, n, i);
						break;
					case "selectionchange": if (si) break;
					case "keydown":
					case "keyup": fi(s, n, i);
				}
				var y;
				if (Cr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else jr ? kr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (Er && n.locale !== "ko" && (jr || b !== "onCompositionStart" ? b === "onCompositionEnd" && jr && (y = Gn()) : (Hn = i, Un = "value" in Hn ? Hn.value : Hn.textContent, jr = !0)), v = cp(r, b), 0 < v.length && (b = new lr(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = Ar(n), y !== null && (b.data = y)))), (y = Tr ? Mr(e, n) : Nr(e, n)) && (b = cp(r, "onBeforeInput"), 0 < b.length && (v = new lr("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Xf(s, e, r, n, i);
			}
			tp(s, t);
		});
	}
	function sp(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function cp(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Rn(e, n), i != null && r.unshift(sp(e, i, a)), i = Rn(e, t), i != null && r.push(sp(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function lp(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function up(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Rn(n, a), l != null && o.unshift(sp(n, l, c))) : i || (l = Rn(n, a), l != null && o.push(sp(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var dp = /\r\n?/g, fp = /\u0000|\uFFFD/g;
	function pp(e) {
		return (typeof e == "string" ? e : "" + e).replace(dp, "\n").replace(fp, "");
	}
	function mp(e, t) {
		return t = pp(t), pp(e) === t;
	}
	function hp(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || Sn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && Sn(e, "" + r);
				else return;
				break;
			case "className":
				sn(e, "class", r);
				break;
			case "tabIndex":
				sn(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				sn(e, n, r);
				break;
			case "style":
				Tn(e, r, o);
				return;
			case "data": if (t !== "object") {
				sn(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = kn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && hp(e, t, "name", a.name, a, null), hp(e, t, "formEncType", a.formEncType, a, null), hp(e, t, "formMethod", a.formMethod, a, null), hp(e, t, "formTarget", a.formTarget, a, null)) : (hp(e, t, "encType", a.encType, a, null), hp(e, t, "method", a.method, a, null), hp(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = kn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = An);
				return;
			case "onScroll":
				r != null && R("scroll", e);
				return;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = kn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				R("beforetoggle", e), R("toggle", e), on(e, "popover", r);
				break;
			case "xlinkActuate":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				cn(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				cn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				cn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				cn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				on(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = Dn.get(n) || n, on(e, n, r);
			else return;
		}
		rn = !0;
	}
	function gp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Tn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") Sn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") Sn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && R("scroll", e);
				return;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = An);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Xt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[Pt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					rn = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : on(e, n, r);
				}
				return;
		}
		rn = !0;
	}
	function _p(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				R("error", e), R("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: hp(e, t, o, s, n, null);
					}
				}
				a && hp(e, t, "srcSet", n.srcSet, n, null), r && hp(e, t, "src", n.src, n, null);
				return;
			case "input":
				R("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: hp(e, t, r, d, n, null);
					}
				}
				_n(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in R("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: hp(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && yn(e, !!r, n, !0) : yn(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in R("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: hp(e, t, s, c, n, null);
				}
				xn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: hp(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				R("beforetoggle", e), R("toggle", e), R("cancel", e), R("close", e);
				break;
			case "iframe":
			case "object":
				R("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < $f.length; r++) R($f[r], e);
				break;
			case "image":
				R("error", e), R("load", e);
				break;
			case "details":
				R("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": R("error", e), R("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: hp(e, t, u, r, n, null);
				}
				return;
			default: if (En(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && gp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && hp(e, t, c, r, n, null));
	}
	var vp = {};
	function yp(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || hp(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (rn = !0), o = m;
							break;
						case "name":
							m !== f && (rn = !0), a = m;
							break;
						case "checked":
							m !== f && (rn = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (rn = !0), d = m;
							break;
						case "value":
							m !== f && (rn = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (rn = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && hp(e, t, p, m, r, f);
					}
				}
				gn(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || hp(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (rn = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (rn = !0), c = o;
						break;
					case "multiple": o !== l && (rn = !0), s = o;
					default: o !== l && hp(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? yn(e, !!n, n ? [] : "", !1) : yn(e, !!n, t, !0)) : yn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: hp(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (rn = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (rn = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && hp(e, t, s, a, r, o);
				}
				bn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: hp(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (rn = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: hp(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && hp(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: hp(e, t, u, p, r, m);
				}
				return;
			default: if (En(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && gp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || gp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && hp(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || hp(e, t, f, p, r, m);
	}
	function bp(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function xp() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && bp(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && bp(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Sp = null, Cp = null;
	function wp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Tp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Ep(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Dp(e, t, n, r) {
		return n = wp(n).createElement(e), n[Nt] = r, n[Pt] = t, _p(n, e, t), qt(n), n;
	}
	function Op(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var kp = null;
	function Ap() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== kp && (kp = e, !0) : (kp = null, !1);
	}
	var jp = typeof setTimeout == "function" ? setTimeout : void 0, Mp = typeof clearTimeout == "function" ? clearTimeout : void 0, Np = typeof Promise == "function" ? Promise : void 0, Pp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : jp, Fp = typeof queueMicrotask == "function" ? queueMicrotask : Np === void 0 ? jp : function(e) {
		return Np.resolve(null).then(e).catch(Ip);
	};
	function Ip(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Lp(e) {
		return e === "head";
	}
	function Rp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), eg(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") jm(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, jm(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Bt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && jm(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		eg(t);
	}
	function zp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Bp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Vp(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Hp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Up(e) {
		return Hp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function Wp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Hp(t, n, e);
	}
	function Gp(e) {
		return e.documentElement.clientHeight;
	}
	function Kp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function qp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Gp(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += ch(f), u > dh) {
									s.length = o;
									break;
								}
								f = new Promise(Kp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Jp(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Jp.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : S({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Jp.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Jp.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Yp(e) {
		return {
			name: e,
			group: new Jp("group", e),
			imagePair: new Jp("image-pair", e),
			old: new Jp("old", e),
			new: new Jp("new", e)
		};
	}
	function Xp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Xp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (tm(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = $p(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), p(this._fragmentFiber.child, !1, Zp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Zp(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Xp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = tm(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = $p(i.optionsOrUseCapture), p(this._fragmentFiber.child, !1, Qp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Qp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function $p(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function em(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function tm(e, t, n, r) {
		if (e.length === 0) return -1;
		r = em(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && em(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Xp.prototype.dispatchEvent = function(e) {
		var t = h(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, $p(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, $p(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Xp.prototype.focus = function(e) {
		p(this._fragmentFiber.child, !0, nm, e, void 0, void 0);
	};
	function nm(e, t) {
		return e.tag !== 6 && (e = b(e), Dm(e, t));
	}
	Xp.prototype.focusLast = function(e) {
		var t = [];
		p(this._fragmentFiber.child, !0, rm, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !nm(t[n], e); n--);
	};
	function rm(e, t) {
		return t.push(e), !1;
	}
	Xp.prototype.blur = function() {
		var e = h(this._fragmentFiber);
		e !== null && (e = b(e), e = wp(e).activeElement, e !== null && p(this._fragmentFiber.child, !1, im, e, void 0, void 0));
	};
	function im(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Xp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), p(this._fragmentFiber.child, !1, am, e, void 0, void 0);
	};
	function am(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Xp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), p(this._fragmentFiber.child, !1, om, e, void 0, void 0);
			for (var n = t = 0; n < sm.length; n++) {
				var r = sm[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : sm[t++] = r;
			}
			sm.length = t;
		}
	};
	function om(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var sm = [], cm = !1;
	function lm(e, t, n) {
		sm.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), cm || (cm = !0, Om(function() {
			cm = !1;
			var e = sm;
			sm = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Xp.prototype.getClientRects = function() {
		var e = [];
		return p(this._fragmentFiber.child, !1, um, e, void 0, void 0), e;
	};
	function um(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Xp.prototype.getRootNode = function(e) {
		var t = h(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Xp.prototype.compareDocumentPosition = function(e) {
		var t = h(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		p(this._fragmentFiber.child, !1, rm, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, g(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = g(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || dm(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function dm(e, t, n, r, i) {
		var a = Ut(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = h(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = ie(n, a, x), t === null ? t = !1 : (p(t, !0, ne, a, n), a = ee, ee = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = ie(r, a, x), t === null ? t = !1 : (p(t, !0, re, a, r), a = ee, te = ee = null, t = a !== null)), t) : !1;
	}
	function fm(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Xp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		p(this._fragmentFiber.child, !1, rm, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || h(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), fm(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), fm(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function pm(e, t) {
		return e = b(e), mm(e, t), !1;
	}
	function mm(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function hm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, $p(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < sm.length; i++) {
				var a = sm[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (sm[r++] = a);
			}
			sm.length = r, n.observe(e);
		}), mm(e, t));
	}
	function gm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, $p(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? lm(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function _m(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					_m(n), Ht(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function vm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Bt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = wm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function ym(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = wm(e.nextSibling), e === null)) return null;
		return e;
	}
	function bm(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = wm(e.nextSibling), e === null)) return null;
		return e;
	}
	function xm(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function Sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function Cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function wm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var Tm = null;
	function z(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return wm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Em(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function Dm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function Om(e) {
		Pp(function() {
			Pp(function(t) {
				return e(t);
			});
		});
	}
	function km(e, t, n) {
		switch (t = wp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function Am(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && hp(e, t, r, null, vp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === An && (e.onclick = null), Ht(e);
	}
	function jm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Ht(e);
	}
	var Mm = /* @__PURE__ */ new Map(), Nm = /* @__PURE__ */ new Set();
	function Pm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Fm = Ee.d;
	Ee.d = {
		f: Im,
		r: Lm,
		D: Bm,
		C: Vm,
		L: Hm,
		m: Um,
		X: Gm,
		S: Wm,
		M: Km
	};
	function Im() {
		var e = Fm.f(), t = Qd();
		return e || t;
	}
	function Lm(e) {
		var t = Wt(e);
		t !== null && t.tag === 5 && t.type === "form" ? pc(t) : Fm.r(e);
	}
	var Rm = typeof document > "u" ? null : document;
	function zm(e, t, n) {
		var r = Rm;
		if (r && typeof t == "string" && t) {
			var i = hn(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Nm.has(i) || (Nm.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), _p(t, "link", e), qt(t), r.head.appendChild(t)));
		}
	}
	function Bm(e) {
		Fm.D(e), zm("dns-prefetch", e, null);
	}
	function Vm(e, t) {
		Fm.C(e, t), zm("preconnect", e, t);
	}
	function Hm(e, t, n) {
		Fm.L(e, t, n);
		var r = Rm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + hn(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + hn(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + hn(n.imageSizes) + "\"]")) : i += "[href=\"" + hn(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = V(e);
					break;
				case "script": a = Xm(e);
			}
			if (!(Mm.has(a) || (e = S({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Mm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(qm(a)) || t === "script" && r.querySelector(Zm(a))))) {
				var o = r.createElement("link");
				_p(o, "link", e), t === "style" && (o[Vt] = !0, o.onload = o.onerror = function() {
					Jt(o);
				}), qt(o), r.head.appendChild(o);
			}
		}
	}
	function Um(e, t) {
		Fm.m(e, t);
		var n = Rm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + hn(r) + "\"][href=\"" + hn(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Xm(e);
			}
			if (!Mm.has(a) && (e = S({
				rel: "modulepreload",
				href: e
			}, t), Mm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Zm(a))) return;
				}
				r = n.createElement("link"), _p(r, "link", e), qt(r), n.head.appendChild(r);
			}
		}
	}
	function Wm(e, t, n) {
		Fm.S(e, t, n);
		var r = Rm;
		if (r && e) {
			var i = Kt(r).hoistableStyles, a = V(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(qm(a))) s.loading = 5;
				else {
					e = S({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Mm.get(a)) && eh(e, n);
					var c = o = r.createElement("link");
					qt(c), _p(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, $m(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Gm(e, t) {
		Fm.X(e, t);
		var n = Rm;
		if (n && e) {
			var r = Kt(n).hoistableScripts, i = Xm(e), a = r.get(i);
			a || (a = n.querySelector(Zm(i)), a || (e = S({
				src: e,
				async: !0
			}, t), (t = Mm.get(i)) && th(e, t), a = n.createElement("script"), qt(a), _p(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Km(e, t) {
		Fm.M(e, t);
		var n = Rm;
		if (n && e) {
			var r = Kt(n).hoistableScripts, i = Xm(e), a = r.get(i);
			a || (a = n.querySelector(Zm(i)), a || (e = S({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Mm.get(i)) && th(e, t), a = n.createElement("script"), qt(a), _p(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function B(e, t, n, r) {
		var a = (a = Pe.current) ? Pm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = V(n.href), t = Kt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = V(n.href);
					var o = Kt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(qm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = Mm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Mm.set(e, o)), Ym(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Xm(n), t = Kt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function V(e) {
		return "href=\"" + hn(e) + "\"";
	}
	function qm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Jm(e) {
		return S({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Ym(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Vt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Vt] = !0, t.onload = t.onerror = Jt.bind(null, t), _p(t, "link", n), qt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Xm(e) {
		return "[src=\"" + hn(e) + "\"]";
	}
	function Zm(e) {
		return "script[async]" + e;
	}
	function Qm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + hn(n.href) + "\"]");
				if (r) return t.instance = r, qt(r), r;
				var a = S({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), qt(r), _p(r, "style", a), $m(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = V(n.href);
				var o = e.querySelector(qm(a));
				if (o) return t.state.loading |= 4, t.instance = o, qt(o), o;
				r = Jm(n), (a = Mm.get(a)) && eh(r, a), o = (e.ownerDocument || e).createElement("link"), qt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), _p(o, "link", r), t.state.loading |= 4, $m(o, n.precedence, e), t.instance = o;
			case "script": return o = Xm(n.src), (a = e.querySelector(Zm(o))) ? (t.instance = a, qt(a), a) : (r = n, (a = Mm.get(o)) && (r = S({}, n), th(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), qt(a), _p(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, $m(r, n.precedence, e));
		return t.instance;
	}
	function $m(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function eh(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function th(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var nh = null;
	function rh(e, t, n) {
		if (nh === null) {
			var r = /* @__PURE__ */ new Map(), i = nh = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = nh, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Bt] || a[Nt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function ih(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function ah(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function oh(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function sh(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function ch(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function lh(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += ch(t), e.suspenseyImages.push(t)), e = hh.bind(e), t.decode().then(e, e));
	}
	function uh(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = V(r.href), a = t.querySelector(qm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = mh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, qt(a);
					return;
				}
				a = t.ownerDocument || t, r = Jm(r), (i = Mm.get(i)) && eh(r, i), a = a.createElement("link"), qt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), _p(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = mh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var dh = 0;
	function fh(e, t) {
		return e.stylesheets && e.count === 0 && _h(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && _h(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && dh === 0 && (dh = 62500 * xp());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && _h(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > dh ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function ph(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) _h(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function mh() {
		this.count--, ph(this);
	}
	function hh() {
		this.imgCount--, ph(this);
	}
	var gh = null;
	function _h(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, gh = /* @__PURE__ */ new Map(), t.forEach(vh, e), gh = null, mh.call(e));
	}
	function vh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = gh.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), gh.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = mh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var yh = {
		$$typeof: de,
		Provider: null,
		Consumer: null,
		_currentValue: De,
		_currentValue2: De,
		_threadCount: 0
	};
	function bh(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = St(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = St(0), this.hiddenUpdates = St(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function xh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new bh(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Wi(3, null, null, t), e.current = a, a.stateNode = e, t = A(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, wo(a), e;
	}
	function Sh(e) {
		return e ? (e = Hi, e) : Hi;
	}
	function Ch(e, t, n, r, i, a) {
		i = Sh(i), r.context === null ? r.context = i : r.pendingContext = i, r = Eo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Do(e, r, t), n !== null && (qd(n, e, t), Oo(n, e, t));
	}
	function wh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Th(e, t) {
		wh(e, t), (e = e.alternate) && wh(e, t);
	}
	function Eh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = zi(e, 67108864);
			t !== null && qd(t, e, 67108864), Th(e, 67108864);
		}
	}
	function Dh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Wd();
			t = Ot(t);
			var n = zi(e, t);
			n !== null && qd(n, e, t), Th(e, t);
		}
	}
	var Oh = !0;
	function kh(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = Ee.p;
		try {
			Ee.p = 2, jh(e, t, n, r);
		} finally {
			Ee.p = a, T.T = i;
		}
	}
	function Ah(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = Ee.p;
		try {
			Ee.p = 8, jh(e, t, n, r);
		} finally {
			Ee.p = a, T.T = i;
		}
	}
	function jh(e, t, n, r) {
		if (Oh) {
			var i = Mh(r);
			if (i === null) op(e, t, r, Nh, n), Wh(e, r);
			else if (Kh(i, e, t, n, r)) r.stopPropagation();
			else if (Wh(e, r), t & 4 && -1 < Uh.indexOf(e)) {
				for (; i !== null;) {
					var a = Wt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = gt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - lt(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Bf(a), !(fd & 6) && (Ad = Ze() + 500, Vf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = zi(a, 2), s !== null && qd(s, a, 2), Qd(), Th(a, 2);
					}
					if (a = Mh(r), a === null && op(e, t, r, Nh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else op(e, t, r, null, n);
		}
	}
	function Mh(e) {
		return e = Mn(e), Ph(e);
	}
	var Nh = null;
	function Ph(e) {
		if (Nh = null, e = Ut(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Nh = e, null;
	}
	function Fh(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Qe()) {
				case $e: return 2;
				case et: return 8;
				case tt:
				case nt: return 32;
				case rt: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Ih = !1, Lh = null, Rh = null, zh = null, Bh = /* @__PURE__ */ new Map(), Vh = /* @__PURE__ */ new Map(), Hh = [], Uh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Wh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Lh = null;
				break;
			case "dragenter":
			case "dragleave":
				Rh = null;
				break;
			case "mouseover":
			case "mouseout":
				zh = null;
				break;
			case "pointerover":
			case "pointerout":
				Bh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Vh.delete(t.pointerId);
		}
	}
	function Gh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Wt(t), t !== null && Eh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Kh(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Lh = Gh(Lh, e, t, n, r, i), !0;
			case "dragenter": return Rh = Gh(Rh, e, t, n, r, i), !0;
			case "mouseover": return zh = Gh(zh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Bh.set(a, Gh(Bh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Vh.set(a, Gh(Vh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function qh(e) {
		var t = Ut(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, jt(e.priority, function() {
							Dh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, jt(e.priority, function() {
							Dh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Jh(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Mh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				jn = r, n.target.dispatchEvent(r), jn = null;
			} else return t = Wt(n), t !== null && Eh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Yh(e, t, n) {
		Jh(e) && n.delete(t);
	}
	function Xh() {
		Ih = !1, Lh !== null && Jh(Lh) && (Lh = null), Rh !== null && Jh(Rh) && (Rh = null), zh !== null && Jh(zh) && (zh = null), Bh.forEach(Yh), Vh.forEach(Yh);
	}
	function Zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Ih || (Ih = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Xh)));
	}
	var Qh = null;
	function $h(e) {
		Qh !== e && (Qh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Qh === e && (Qh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Ph(r || n) === null) continue;
					break;
				}
				var a = Wt(n);
				a !== null && (e.splice(t, 3), t -= 3, dc(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function eg(e) {
		function t(t) {
			return Zh(t, e);
		}
		Lh !== null && Zh(Lh, e), Rh !== null && Zh(Rh, e), zh !== null && Zh(zh, e), Bh.forEach(t), Vh.forEach(t);
		for (var n = 0; n < Hh.length; n++) {
			var r = Hh[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Hh.length && (n = Hh[0], n.blockedOn === null);) qh(n), n.blockedOn === null && Hh.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Pt] || null;
			if (typeof a == "function") o || $h(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Pt] || null) s = o.formAction;
					else if (Ph(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), $h(n);
			}
		}
	}
	function tg() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function ng(e) {
		this._internalRoot = e;
	}
	rg.prototype.render = ng.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		Ch(n, Wd(), e, t, null, null);
	}, rg.prototype.unmount = ng.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			Ch(e.current, 2, null, e, null, null), Qd(), t[Ft] = null;
		}
	};
	function rg(e) {
		this._internalRoot = e;
	}
	rg.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = At();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Hh.length && t !== 0 && t < Hh[n].priority; n++);
			Hh.splice(n, 0, e), n === 0 && qh(e);
		}
	};
	var ig = n.version;
	if (ig !== "19.3.1") throw Error(i(527, ig, "19.3.1"));
	Ee.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var ag = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: T,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var og = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!og.isDisabled && og.supportsFiber) try {
			ot = og.inject(ag), st = og;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Pc, s = Fc, c = Ic;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = xh(e, 1, !1, null, null, n, r, null, o, s, c, tg), e[Ft] = t.current, ip(e), new ng(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = Pc, c = Fc, l = Ic, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = xh(e, 1, !0, t, n ?? null, r, o, u, s, c, l, tg), t.context = Sh(null), n = t.current, r = Wd(), r = Ot(r), o = Eo(r), o.callback = null, Do(n, o, r), n = r, t.current.lanes = n, Ct(t, n), Bf(t), e[Ft] = t.current, ip(e), new rg(t);
	}, e.version = "19.3.1";
})), y = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Km(e) ? e.slice() : z({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = Km(e) ? e.slice() : z({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], Km(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = Km(e) ? e.slice() : z({}, e);
			return n + 1 === t.length ? (Km(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function l() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function u() {}
		function f() {}
		function p(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function h(e, t, n, r) {
			return new Br(e, t, n, r);
		}
		function g(e, t) {
			e.context === Lv && (Yp(e.current, 2, t, e, null, null), uu());
		}
		function v(e, t) {
			if (Rv !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Vu(), zr(e.current, t, n), uu();
			}
		}
		function y(e) {
			Rv = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function ee(e) {
			for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
			for (; t.return;) t = t.return;
			return t.tag === 3 ? e : null;
		}
		function te(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function ne(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function re(e) {
			if (ee(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function x(e) {
			var t = e.alternate;
			if (!t) {
				if (t = ee(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return re(i), e;
						if (a === r) return re(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function ie(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = ie(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function S(e, t, n, r, i) {
			C(e.child, !1, t, n, r, i);
		}
		function C(e, t, n, r, i, a) {
			for (; e !== null;) {
				if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && C(e.child, t, n, r, i, a)) return !0;
				e = e.sibling;
			}
			return !1;
		}
		function ae(e) {
			for (e = e.return; e !== null;) {
				if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
				e = e.return;
			}
			return null;
		}
		function oe(e) {
			var t = !1;
			for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
			return t;
		}
		function se(e) {
			var t = [null, null], n = ae(e);
			return n === null || ce(t, e, n.child, { foundSelf: !1 }), t;
		}
		function ce(e, t, n, r) {
			for (; n !== null;) {
				if (n === t) r.foundSelf = !0;
				else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
					if (r.foundSelf) return e[1] = n, !0;
					e[0] = n;
				} else if ((n.tag !== 22 || n.memoizedState === null) && ce(e, t, n.child, r)) return !0;
				n = n.sibling;
			}
			return !1;
		}
		function le(e) {
			switch (e.tag) {
				case 5:
				case 27:
				case 6: return e.stateNode;
				case 3: return e.stateNode.containerInfo;
				default: throw Error("Expected to find a host node. This is a bug in React.");
			}
		}
		function ue(e, t, n) {
			return e === n || e === t && (wm = e, !0);
		}
		function de(e, t, n) {
			return e === n ? (Tm = e, !1) : e === t && (Tm !== null && (wm = e), !0);
		}
		function fe(e) {
			if (e === null) return null;
			do
				e = e === null ? null : e.return;
			while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
			return e || null;
		}
		function pe(e, t, n) {
			for (var r = 0, i = e; i; i = n(i)) r++;
			i = 0;
			for (var a = t; a; a = n(a)) i++;
			for (; 0 < r - i;) e = n(e), r--;
			for (; 0 < i - r;) t = n(t), i--;
			for (; r--;) {
				if (e === t || t !== null && e === t.alternate) return e;
				e = n(e), t = n(t);
			}
			return null;
		}
		function me(e) {
			return typeof e != "object" || !e ? null : (e = Wm && e[Wm] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function he(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Gm ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case km: return "Fragment";
				case jm: return "Profiler";
				case Am: return "StrictMode";
				case Fm: return "Suspense";
				case Im: return "SuspenseList";
				case zm: return "Activity";
				case Hm: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case Om: return "Portal";
				case Nm: return e.displayName || "Context";
				case Mm: return (e._context.displayName || "Context") + ".Consumer";
				case Pm:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Lm: return t = e.displayName || null, t === null ? he(e.type) || "Memo" : t;
				case Rm:
					t = e._payload, e = e._init;
					try {
						return he(e(t));
					} catch {}
			}
			return null;
		}
		function ge(e) {
			return typeof e.tag == "number" ? w(e) : typeof e.name == "string" ? e.name : null;
		}
		function w(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return he(t);
				case 8: return t === Am ? "StrictMode" : "Mode";
				case 22:
					if (e.return !== null) return w(e.return);
					break;
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 30: return "ViewTransition";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return w(e.return);
			}
			return null;
		}
		function _e(e) {
			return { current: e };
		}
		function ve(e, t) {
			0 > Xm ? console.error("Unexpected pop.") : (t !== Ym[Xm] && console.error("Unexpected Fiber popped."), e.current = Jm[Xm], Jm[Xm] = null, Ym[Xm] = null, Xm--);
		}
		function ye(e, t, n) {
			Xm++, Jm[Xm] = e.current, Ym[Xm] = n, e.current = t;
		}
		function be(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function xe(e, t) {
			ye($m, t, e), ye(Qm, e, e), ye(Zm, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Jd(t) : _T;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Jd(t), t = Yd(t, n);
				else switch (n) {
					case "svg":
						t = vT;
						break;
					case "math":
						t = yT;
						break;
					default: t = _T;
				}
			}
			n = n.toLowerCase(), n = on(null, n), n = {
				context: t,
				ancestorInfo: n
			}, ve(Zm, e), ye(Zm, n, e);
		}
		function Se(e) {
			ve(Zm, e), ve(Qm, e), ve($m, e);
		}
		function Ce() {
			return be(Zm.current);
		}
		function we(e) {
			var t = e.memoizedState;
			t !== null && ($T._currentValue = t.memoizedState, ye(eh, e, e)), t = be(Zm.current);
			var n = e.type, r = Yd(t.context, n);
			n = on(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (ye(Qm, e, e), ye(Zm, r, e));
		}
		function Te(e) {
			Qm.current === e && (ve(Zm, e), ve(Qm, e)), eh.current === e && (ve(eh, e), $T._currentValue = QT);
		}
		function T() {}
		function Ee() {
			if (th === 0) {
				nh = console.log, rh = console.info, ih = console.warn, ah = console.error, oh = console.group, sh = console.groupCollapsed, ch = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: T,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			th++;
		}
		function De() {
			if (th--, th === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: z({}, e, { value: nh }),
					info: z({}, e, { value: rh }),
					warn: z({}, e, { value: ih }),
					error: z({}, e, { value: ah }),
					group: z({}, e, { value: oh }),
					groupCollapsed: z({}, e, { value: sh }),
					groupEnd: z({}, e, { value: ch })
				});
			}
			0 > th && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function Oe(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function ke(e) {
			if (lh === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				lh = t && t[1] || "", uh = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + lh + e + uh;
		}
		function Ae(e, t) {
			if (!e || dh) return "";
			var n = fh.get(e);
			if (n !== void 0) return n;
			dh = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = B.H, B.H = null, Ee();
			try {
				var i = { DetermineComponentFrameRoot: function() {
					try {
						if (t) {
							var n = function() {
								throw Error();
							};
							if (Object.defineProperty(n.prototype, "props", { set: function() {
								throw Error();
							} }), typeof Reflect == "object" && Reflect.construct) {
								try {
									Reflect.construct(n, []);
								} catch (e) {
									var r = e;
								}
								Reflect.construct(e, [], n);
							} else {
								try {
									n.call();
								} catch (e) {
									r = e;
								}
								n = !1;
								try {
									var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
									Object.defineProperty(e.prototype, "props", {
										configurable: !0,
										set: function() {
											throw Error();
										}
									}), n = !0, new e();
								} finally {
									n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
								}
							}
						} else {
							try {
								throw Error();
							} catch (e) {
								r = e;
							}
							(n = e()) && typeof n.catch == "function" && n.catch(function() {});
						}
					} catch (e) {
						if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
					}
					return [null, null];
				} };
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && fh.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				dh = !1, B.H = r, De(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? ke(l) : "", typeof e == "function" && fh.set(e, l), l;
		}
		function je(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return ke(e.type);
				case 16: return ke("Lazy");
				case 13: return e.child !== t && t !== null ? ke("Suspense Fallback") : ke("Suspense");
				case 19: return ke("SuspenseList");
				case 0:
				case 15: return Ae(e.type, !1);
				case 11: return Ae(e.type.render, !1);
				case 1: return Ae(e.type, !0);
				case 31: return ke("Activity");
				case 30: return ke("ViewTransition");
				default: return "";
			}
		}
		function Me(e) {
			try {
				var t = "", n = null;
				do {
					t += je(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = Oe(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = ke(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function E(e) {
			return (e = e ? e.displayName || e.name : "") ? ke(e) : "";
		}
		function Ne() {
			if (ph === null) return null;
			var e = ph._debugOwner;
			return e == null ? null : ge(e);
		}
		function Pe() {
			if (ph === null) return "";
			var e = ph;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += ke(e.type);
						break;
					case 13:
						t += ke("Suspense");
						break;
					case 19:
						t += ke("SuspenseList");
						break;
					case 31:
						t += ke("Activity");
						break;
					case 30:
						t += ke("ViewTransition");
						break;
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += E(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += E(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = Oe(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + Oe(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function D(e, t, n, r, i, a, o) {
			var s = ph;
			Fe(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				Fe(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function Fe(e) {
			B.getCurrentStack = e === null ? null : Pe, mh = !1, ph = e;
		}
		function Ie(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Le(e) {
			try {
				return Re(e), !1;
			} catch {
				return !0;
			}
		}
		function Re(e) {
			return "" + e;
		}
		function ze(e, t) {
			if (Le(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ie(e)), Re(e);
		}
		function Be(e, t) {
			if (Le(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ie(e)), Re(e);
		}
		function Ve(e) {
			if (Le(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Ie(e)), Re(e);
		}
		function He(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				kh = t.inject(e), Ah = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Ue(e) {
			if (typeof Dh == "function" && Oh(e), Ah && typeof Ah.setStrictMode == "function") try {
				Ah.setStrictMode(kh, e);
			} catch (e) {
				jh || (jh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function We(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Ph(e) / Fh | 0) | 0;
		}
		function Ge(e) {
			var t = e & 42;
			if (t !== 0) return t;
			switch (e & -e) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return e & -e;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return e & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return e & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function Ke(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ge(n))) : i = Ge(o) : i = Ge(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ge(n))) : i = Ge(o)) : i = Ge(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function qe(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Je(e, t) {
			t & 8 && (t |= t & 32);
			var n = e.entangledLanes;
			if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
				var r = 31 - Nh(n), i = 1 << r;
				t |= e[r], n &= ~i;
			}
			return t;
		}
		function Ye(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return t + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return t + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Xe() {
			var e = Rh;
			return Rh <<= 1, !(Rh & 62914560) && (Rh = 4194304), e;
		}
		function Ze(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Qe(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function $e(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Nh(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && et(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function et(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Nh(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function tt(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Nh(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function nt(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : rt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function rt(e) {
			switch (e) {
				case 2:
					e = 1;
					break;
				case 8:
					e = 4;
					break;
				case 32:
					e = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					e = 128;
					break;
				case 268435456:
					e = 134217728;
					break;
				default: e = 0;
			}
			return e;
		}
		function it(e, t, n) {
			if (Mh) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Nh(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function at(e, t) {
			if (Mh) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Nh(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function ot(e) {
			return e &= -e, zh !== 0 && zh < e ? Bh !== 0 && Bh < e ? e & 134217727 ? Vh : Hh : Bh : zh;
		}
		function st() {
			var e = V.p;
			return e === 0 ? (e = window.event, e === void 0 ? Vh : om(e.type)) : e;
		}
		function ct(e, t) {
			var n = V.p;
			try {
				return V.p = e, t();
			} finally {
				V.p = n;
			}
		}
		function lt(e) {
			delete e[Wh], delete e[Gh], delete e[Jh], delete e[Yh];
		}
		function ut(e) {
			var t;
			if (t = e[Wh]) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Kh] || n[Wh]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = cp(e); e !== null;) {
						if (n = e[Wh]) return n;
						e = cp(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function dt(e) {
			if (e = e[Wh] || e[Kh]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function ft(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function pt(e) {
			var t = e[Xh];
			return t ||= e[Xh] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function mt(e) {
			e[Zh] = !0;
		}
		function ht(e) {
			e[Qh] = void 0;
		}
		function gt(e, t) {
			_t(e, t), _t(e + "Capture", t);
		}
		function _t(e, t) {
			eg[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), eg[e] = t;
			var n = e.toLowerCase();
			for (tg[n] = e, e === "onDoubleClick" && (tg.ondblclick = e), e = 0; e < t.length; e++) $h.add(t[e]);
		}
		function vt(e, t) {
			ng[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function yt(e) {
			return hh.call(ag, e) ? !0 : hh.call(ig, e) ? !1 : rg.test(e) ? ag[e] = !0 : (ig[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function bt() {
			var e = og;
			return og = !1, e;
		}
		function xt(e, t, n) {
			if (yt(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = t.toLowerCase() === "nonce" ? e.nonce : e.getAttribute(t), e === "" && !0 === n || (ze(n, t), e === "" + n ? n : e);
			}
		}
		function St(e, t, n) {
			if (yt(t)) {
				if (n === null) e.removeAttribute(t);
				else {
					switch (typeof n) {
						case "undefined":
						case "function":
						case "symbol":
							e.removeAttribute(t);
							return;
						case "boolean":
							var r = t.toLowerCase().slice(0, 5);
							if (r !== "data-" && r !== "aria-") {
								e.removeAttribute(t);
								return;
							}
					}
					ze(n, t), e.setAttribute(t, n);
				}
			}
		}
		function Ct(e, t, n) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(t);
						return;
				}
				ze(n, t), e.setAttribute(t, n);
			}
		}
		function wt(e, t, n, r) {
			if (r === null) e.removeAttribute(n);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(n);
						return;
				}
				ze(r, n), e.setAttributeNS(t, n, r);
			}
		}
		function Tt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Ve(e), e;
				default: return "";
			}
		}
		function Et(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function Dt(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Ve(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Ve(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function Ot(e) {
			if (!e._valueTracker) {
				var t = Et(e) ? "checked" : "value";
				e._valueTracker = Dt(e, t, "" + e[t]);
			}
		}
		function kt(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = Et(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
		}
		function At(e) {
			return e.replace(sg, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function jt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || lg || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ne() || "A component", t.type), lg = !0), t.value === void 0 || t.defaultValue === void 0 || cg || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ne() || "A component", t.type), cg = !0);
		}
		function Mt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (ze(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Tt(t)) : e.value !== "" + Tt(t) && (e.value = "" + Tt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Pt(e, Tt(n)) : o === "number" && e.value == t ? Pt(e, Tt(e.value)) : Pt(e, Tt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (ze(s, "name"), e.name = "" + Tt(s)) : e.removeAttribute("name");
		}
		function Nt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (ze(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					Ot(e);
					return;
				}
				n = n == null ? "" : "" + Tt(n), t = t == null ? n : "" + Tt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (ze(o, "name"), e.name = o), Ot(e);
		}
		function Pt(e, t) {
			e.defaultValue !== "" + t && (e.defaultValue = "" + t);
		}
		function Ft(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Sm.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || dg || (dg = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || fg || (fg = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || ug || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ug = !0);
		}
		function It() {
			var e = Ne();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function Lt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + Tt(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Rt(e, t) {
			for (e = 0; e < mg.length; e++) {
				var n = mg[e];
				if (t[n] != null) {
					var r = Km(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, It()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, It());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || pg || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), pg = !0);
		}
		function zt(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || hg || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", Ne() || "A component"), hg = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function Bt(e, t, n) {
			t != null && (t = "" + Tt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Tt(n);
		}
		function Vt(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Km(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = Tt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ot(e);
		}
		function Ht(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Ht(e.children[0], t) : e;
		}
		function Ut(e) {
			return "  " + "  ".repeat(e);
		}
		function Wt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Gt(e) {
			return "- " + "  ".repeat(e);
		}
		function Kt(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function qt(e, t) {
			return gg.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Jt(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return Wt(n) + qt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), Wt(n) + qt(e, r) + "\n" + Gt(n) + qt(t, r) + "\n";
			}
			return Ut(n) + qt(e, r) + "\n";
		}
		function Yt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function Xt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Km(e)) return "[...]";
					if (e.$$typeof === Dm) return (t = he(e.type)) ? "<" + t + ">" : "<...>";
					var n = Yt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = Xt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Zt(e, t) {
			return typeof e != "string" || gg.test(e) ? "{" + Xt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Qt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Zt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function $t(e, t, n) {
			var r = "", i = z({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = Xt(e[a], o);
				t.hasOwnProperty(a) ? (o = Xt(t[a], o), r += Wt(n) + a + ": " + s + "\n", r += Gt(n) + a + ": " + o + "\n") : r += Wt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = Xt(i[c], 120 - 2 * n - c.length - 2), r += Gt(n) + c + ": " + e + "\n");
			return r;
		}
		function en(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Qt(e, t, Ut(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Zt(l, s);
						s = Zt(c, s), typeof l == "object" && l && typeof c == "object" && c && Yt(l) === "Object" && Yt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Ut(r + 1) + o + "={{\n" + $t(l, c, r + 2) + Ut(r + 1) + "}}\n" : (i += Wt(r + 1) + o + "=" + u + "\n", i += Gt(r + 1) + o + "=" + s + "\n");
					} else i += Ut(r + 1) + o + "=" + Zt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Gt(r + 1) + e + "=" + Zt(n[e], t) + "\n";
					}
				}), i = i === "" ? Ut(r) + "<" + e + ">\n" : Ut(r) + "<" + e + "\n" + i + Ut(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Jt(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Jt("" + t, null, r + 1) : i + Jt("" + t, void 0, r + 1)), i;
		}
		function tn(e, t) {
			var n = Kt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += tn(e, t), e = e.sibling;
				return n;
			}
			return Ut(t) + "<" + n + ">\n";
		}
		function nn(e, t) {
			var n = Ht(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Ut(t) + "...\n" + nn(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Ut(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Jt(i, e.serverProps, t), t++;
			else if (a = Kt(e.fiber), a !== null) {
				if (e.serverProps === void 0) {
					r = t;
					var o = 120 - 2 * r - a.length - 2, s = "";
					for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
						var c = Zt(i[l], 15);
						if (o -= l.length + c.length + 2, 0 > o) {
							s += " ...";
							break;
						}
						s += " " + l + "=" + c;
					}
					r = Ut(r) + "<" + a + s + ">\n", t++;
				} else e.serverProps === null ? (r = Qt(a, i, Wt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = en(a, i, e.serverProps, t), t++);
			}
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += nn(o, t), a++) : l += tn(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Ut(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Gt(t) + qt(a, 120 - 2 * t) + "\n") : l + Qt(a.type, a.props, Gt(t));
			return n + r + l;
		}
		function rn(e) {
			try {
				return "\n\n" + nn(e, 0);
			} catch {
				return "";
			}
		}
		function an(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : rn(i).replaceAll(/^[+-]/gm, ">");
		}
		function on(e, t) {
			var n = z({}, e || xg), r = { tag: t };
			return vg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), yg.indexOf(t) !== -1 && (n.pTagInButtonScope = null), _g.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function sn(e, t, n) {
			switch (t) {
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return bg.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "input": return t !== "select";
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function cn(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function ln(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function un(e, t) {
			t ||= xg;
			var n = t.current;
			if (t = (n = sn(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : cn(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, Sg[t]) return !1;
			Sg[t] = !0;
			var i = (t = ph) ? ln(t.return, r) : null, a = t !== null && i !== null ? an(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || D(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function dn(e, t, n) {
			if (n || sn("#text", t, !1)) return !0;
			if (n = "#text|" + t, Sg[n]) return !1;
			Sg[n] = !0;
			var r = (n = ph) ? ln(n, t) : null;
			return n = n !== null && r !== null ? an(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function fn(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function pn(e) {
			return e.replace(Og, function(e, t) {
				return t.toUpperCase();
			});
		}
		function mn(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Ag.hasOwnProperty(t) && Ag[t] || (Ag[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, pn(t.replace(Dg, "ms-")))) : Eg.test(t) ? Ag.hasOwnProperty(t) && Ag[t] || (Ag[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !kg.test(n) || jg.hasOwnProperty(n) && jg[n] || (jg[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(kg, ""))), typeof n == "number" && (isNaN(n) ? Mg || (Mg = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Ng || (Ng = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Pg.has(t) ? t === "float" ? e.cssFloat = n : (Be(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function hn(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = Cg[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = Cg[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = Cg[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "", og = !0);
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && (mn(e, f, l), og = !0);
			} else for (r in t) t.hasOwnProperty(r) && mn(e, r, t[r]);
		}
		function gn(e) {
			if (e.indexOf("-") === -1) return !1;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		function _n(e) {
			return Lg.get(e) || e;
		}
		function vn(e, t) {
			if (hh.call(Bg, t) && Bg[t]) return !0;
			if (Hg.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = zg.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Bg[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Bg[t] = !0;
			}
			if (Vg.test(t)) {
				if (e = t.toLowerCase(), e = zg.hasOwnProperty(e) ? e : null, e == null) return Bg[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Bg[t] = !0);
			}
			return !0;
		}
		function yn(e, t) {
			var n = [], r;
			for (r in t) vn(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function bn(e, t, n, r) {
			if (hh.call(Wg, t) && Wg[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Wg[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Wg[t] = !0;
				if (Gg.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Wg[t] = !0;
			} else if (Gg.test(t)) return Kg.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Wg[t] = !0;
			if (qg.test(t) || Jg.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Wg[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Wg[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Wg[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Wg[t] = !0;
			if (Rg.hasOwnProperty(i)) {
				if (i = Rg[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Wg[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Wg[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "credentialless":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" || (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Wg[t] = !0);
				}
				case "function":
				case "symbol": return Wg[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
						case "allowFullScreen":
						case "async":
						case "autoPlay":
						case "controls":
						case "credentialless":
						case "default":
						case "defer":
						case "disabled":
						case "disablePictureInPicture":
						case "disableRemotePlayback":
						case "formNoValidate":
						case "hidden":
						case "loop":
						case "noModule":
						case "noValidate":
						case "open":
						case "playsInline":
						case "readOnly":
						case "required":
						case "reversed":
						case "scoped":
						case "seamless":
						case "itemScope":
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Wg[t] = !0;
				}
			}
			return !0;
		}
		function xn(e, t, n) {
			var r = [], i;
			for (i in t) bn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function Sn(e) {
			return Yg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function Cn() {}
		function wn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function Tn(e) {
			var t = dt(e);
			if (t && (e = t.stateNode)) {
				var n = e[Gh] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (Mt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (ze(t, "name"), n = n.querySelectorAll("input[name=\"" + At("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Gh] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									Mt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && kt(r);
						}
						break a;
					case "textarea":
						Bt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && Lt(e, !!n.multiple, t, !1);
				}
			}
		}
		function En(e, t, n) {
			if ($g) return e(t, n);
			$g = !0;
			try {
				return e(t);
			} finally {
				if ($g = !1, (Zg !== null || Qg !== null) && (uu(), Zg && (t = Zg, e = Qg, Qg = Zg = null, Tn(t), e))) for (t = 0; t < e.length; t++) Tn(e[t]);
			}
		}
		function Dn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Gh] || null;
			if (r === null) return null;
			n = r[t];
			a: switch (t) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
					break a;
				default: e = !1;
			}
			if (e) return null;
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function On() {
			if (a_) return a_;
			var e, t = i_, n = t.length, r, i = "value" in r_ ? r_.value : r_.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return a_ = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function kn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function An() {
			return !0;
		}
		function jn() {
			return !1;
		}
		function Mn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? An : jn, this.isPropagationStopped = jn, this;
			}
			return z(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = An);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = An);
				},
				persist: function() {},
				isPersistent: An
			}), t;
		}
		function Nn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = C_[e]) ? !!t[e] : !1;
		}
		function Pn() {
			return Nn;
		}
		function Fn(e, t) {
			switch (e) {
				case "keyup": return j_.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== M_;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function In(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function Ln(e, t) {
			switch (e) {
				case "compositionend": return In(t);
				case "keypress": return t.which === L_ ? (z_ = !0, R_) : null;
				case "textInput": return e = t.data, e === R_ && z_ ? null : e;
				default: return null;
			}
		}
		function Rn(e, t) {
			if (B_) return e === "compositionend" || !N_ && Fn(e, t) ? (e = On(), a_ = i_ = r_ = null, B_ = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return I_ && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function zn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!V_[e.type] : t === "textarea";
		}
		function Bn(e) {
			if (!e_) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function Vn(e, t, n, r) {
			Zg ? Qg ? Qg.push(r) : Qg = [r] : Zg = r, t = bd(t, "onChange"), 0 < t.length && (n = new s_("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Hn(e) {
			md(e, 0);
		}
		function Un(e) {
			if (kt(ft(e))) return e;
		}
		function Wn(e, t) {
			if (e === "change") return t;
		}
		function Gn() {
			H_ && (H_.detachEvent("onpropertychange", Kn), U_ = H_ = null);
		}
		function Kn(e) {
			if (e.propertyName === "value" && Un(U_)) {
				var t = [];
				Vn(t, U_, e, wn(e)), En(Hn, t);
			}
		}
		function qn(e, t, n) {
			e === "focusin" ? (Gn(), H_ = t, U_ = n, H_.attachEvent("onpropertychange", Kn)) : e === "focusout" && Gn();
		}
		function Jn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Un(U_);
		}
		function Yn(e, t) {
			if (e === "click") return Un(t);
		}
		function Xn(e, t) {
			if (e === "input" || e === "change") return Un(t);
		}
		function Zn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Qn(e, t) {
			if (G_(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!hh.call(t, i) || !G_(e[i], t[i])) return !1;
			}
			return !0;
		}
		function $n(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function er(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function tr(e, t) {
			var n = er(e);
			e = 0;
			for (var r; n;) {
				if (n.nodeType === 3) {
					if (r = e + n.textContent.length, e <= t && r >= t) return {
						node: n,
						offset: t - e
					};
					e = r;
				}
				a: {
					for (; n;) {
						if (n.nextSibling) {
							n = n.nextSibling;
							break a;
						}
						n = n.parentNode;
					}
					n = void 0;
				}
				n = er(n);
			}
		}
		function nr(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function rr(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = $n(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = $n(e.document);
			}
			return t;
		}
		function ir(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function ar(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			X_ || q_ == null || q_ !== $n(r) || (r = q_, "selectionStart" in r && ir(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Y_ && Qn(Y_, r) || (Y_ = r, r = bd(J_, "onSelect"), 0 < r.length && (t = new s_("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = q_)));
		}
		function or(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function sr(e) {
			if (Q_[e]) return Q_[e];
			if (!Z_[e]) return e;
			var t = Z_[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in $_) return Q_[e] = t[n];
			return e;
		}
		function cr(e, t) {
			sv.set(e, t), gt(t, [e]);
		}
		function lr(e, t) {
			if (e.name != null && e.name !== "auto") return e.name;
			if (t.autoName !== null) return t.autoName;
			e = iw.identifierPrefix;
			var n = lv++;
			return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
		}
		function ur(e) {
			if (e == null || typeof e == "string") return e;
			var t = null, n = pw;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e[n[r]];
				if (i != null) {
					if (i === "none") return "none";
					t = t == null ? i : t + (" " + i);
				}
			}
			return t ?? e.default;
		}
		function dr(e, t) {
			return e = ur(e), t = ur(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
		}
		function fr(e) {
			for (var t = gv, n = 0; n < e.length && n < bv; n++) {
				var r = e[n];
				if (typeof r == "object" && r) {
					if (Km(r) && r.length === 2 && typeof r[0] == "string") {
						if (t !== gv && t !== yv) return _v;
						t = yv;
					} else return _v;
				} else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== gv && t !== vv || typeof r == "bigint") return _v;
					t = vv;
				}
			}
			return t;
		}
		function pr(e, t, n, r) {
			if (!ArrayBuffer.isView(e)) {
				var i = 0, a;
				for (a in e) if (hh.call(e, a) && a[0] !== "_" && (i++, hr(a, e[a], t, n, r), i >= bv)) {
					t.push([r + "\xA0\xA0".repeat(n) + "Only " + bv + " properties are shown. React will not log more properties of this object.", ""]);
					break;
				}
			}
		}
		function mr(e) {
			return "$$typeof" in e && hh.call(e, "$$typeof") ? e.$$typeof : void 0;
		}
		function hr(e, t, n, r, i) {
			switch (typeof t) {
				case "object":
					if (t === null) {
						t = "null";
						break;
					}
					if (mr(t) === Dm) {
						var a = he(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && hr("key", o, n, r + 1, i), e = !1, o = 0, t) if (o++, l === "children" ? t.children != null && (!Km(t.children) || 0 < t.children.length) && (e = !0) : hh.call(t, l) && l[0] !== "_" && hr(l, t[l], n, r + 1, i), o >= bv) break;
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), ArrayBuffer.isView(t)) {
						t = t.length, t = typeof t == "number" ? a + "(" + t + ")" : a;
						break;
					}
					if (a === "Array") {
						if (l = t.length > bv, o = fr(t), o === vv || o === gv) {
							t = JSON.stringify(l ? t.slice(0, bv).concat("…") : t);
							break;
						}
						if (o === yv) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length && e < bv; e++) a = t[e], hr(a[0], a[1], n, r + 1, i);
							l && hr(bv.toString(), "…", n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, hr(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, hr(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && pr(t, n, r + 1, i);
					return;
				case "function":
					t = t.name, t = t === "" || typeof t != "string" ? "() => {}" : t + "() {}";
					break;
				case "string":
					t = t === hv ? "…" : JSON.stringify(1024 <= t.length ? t.slice(0, 1023) + "…" : t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function gr(e, t, n, r) {
			var i = !0, a = 0;
			for (s in e) {
				if (a > bv) {
					n.push(["Previous object has more than " + bv + " properties. React will not attempt to diff objects with too many properties.", ""]), i = !1;
					break;
				}
				s in t || (n.push([xv + "\xA0\xA0".repeat(r) + s, "…"]), i = !1), a++;
			}
			for (var o in a = 0, t) {
				if (a > bv) {
					n.push(["Next object has more than " + bv + " properties. React will not attempt to diff objects with too many properties.", ""]), i = !1;
					break;
				}
				if (o in e) {
					var s = e[o], c = t[o];
					if (s !== c) {
						if (r === 0 && o === "children") {
							i = "\xA0\xA0".repeat(r) + o, n.push([xv + i, "…"], [Sv + i, "…"]), i = !1;
							continue;
						}
						if (!(3 <= r)) {
							if (typeof s == "object" && typeof c == "object" && s !== null && c !== null && mr(s) === mr(c)) {
								if (mr(c) === Dm) {
									if (s.type === c.type && s.key === c.key) {
										s = he(c.type) || "…", i = "\xA0\xA0".repeat(r) + o, s = "<" + s + " … />", n.push([xv + i, s], [Sv + i, s]), i = !1;
										continue;
									}
								} else {
									var l = Object.prototype.toString.call(s), u = Object.prototype.toString.call(c);
									if (l === u && (u === "[object Object]" || u === "[object Array]")) {
										l = [Cv + "\xA0\xA0".repeat(r) + o, u === "[object Array]" ? "Array" : ""], n.push(l), u = n.length, gr(s, c, n, r + 1) ? u === n.length && (l[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
										continue;
									}
								}
							} else if (typeof s == "function" && typeof c == "function" && s.name === c.name && s.length === c.length && (l = Function.prototype.toString.call(s), u = Function.prototype.toString.call(c), l === u)) {
								s = c.name === "" ? "() => {}" : c.name + "() {}", n.push([Cv + "\xA0\xA0".repeat(r) + o, s + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						hr(o, s, n, r, xv), hr(o, c, n, r, Sv), i = !1;
					}
				} else n.push([Sv + "\xA0\xA0".repeat(r) + o, "…"]), i = !1;
				a++;
			}
			return i;
		}
		function _r(e) {
			U = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function vr(e, t, n, r) {
			wv && (Ov.start = t, Ov.end = n, Dv.color = "warning", Dv.tooltipText = r, Dv.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Ov)) : performance.measure(r, Ov), performance.clearMeasures(r));
		}
		function yr(e, t, n) {
			vr(e, t, n, "Reconnect");
		}
		function br(e, t, n, r, i) {
			var a = w(e);
			if (a !== null && wv) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				s = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				r = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [kv], l = gr(o.memoizedProps, l, c, 0), 1 < c.length ? (l && !Ev && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Ev = !0, c[0] = jv, Dv.color = "warning", Dv.tooltipText = Av) : (Dv.color = s, Dv.tooltipText = a), Dv.properties = c, Ov.start = t, Ov.end = n, e = "​" + a, r == null ? performance.measure(e, Ov) : r.run(performance.measure.bind(performance, e, Ov)), performance.clearMeasures(e)) : r == null ? console.timeStamp(a, t, n, Tv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Tv, void 0, s))) : r == null ? console.timeStamp(a, t, n, Tv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Tv, void 0, s));
			}
		}
		function xr(e, t, n, r) {
			if (wv) {
				var i = w(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && hr("key", e.key, o, 0, ""), e.memoizedProps !== null && pr(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: Tv,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, i = "​" + i, a ? a.run(performance.measure.bind(performance, i, e)) : performance.measure(i, e), performance.clearMeasures(i);
				}
			}
		}
		function Sr(e, t, n, r, i) {
			if (i !== null) {
				if (wv) {
					var a = w(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && hr("key", e.key, r, 0, ""), e.memoizedProps !== null && pr(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: Tv,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, e = e._debugTask, n = "​" + a, e ? e.run(performance.measure.bind(performance, n, t)) : performance.measure(n, t), performance.clearMeasures(n);
					}
				}
			} else a = w(e), a !== null && wv && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, Tv, void 0, i)) : console.timeStamp(a, t, n, Tv, void 0, i));
		}
		function Cr(e, t, n, r) {
			!wv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, U, H, n)) : console.timeStamp("Prewarm", e, t, U, H, n));
		}
		function wr(e, t, n, r) {
			!wv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, U, H, n)) : console.timeStamp("Suspended", e, t, U, H, n));
		}
		function Tr(e, t, n, r) {
			!wv || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, U, H, "error")) : console.timeStamp("Errored", e, t, U, H, "error"));
		}
		function Er(e, t, n, r) {
			!wv || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, U, H, "secondary-light")) : console.timeStamp(n, e, t, U, H, "secondary-light"));
		}
		function Dr(e, t, n, r, i) {
			if (wv && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: U,
						trackGroup: H,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e), performance.clearMeasures("Errored");
			}
		}
		function Or(e, t, n, r, i) {
			n === null ? !wv || t <= e || (i ? i.run(console.timeStamp.bind(console, r ? "Commit Interrupted View Transition" : "Commit", e, t, U, H, r ? "error" : "secondary-dark")) : console.timeStamp(r ? "Commit Interrupted View Transition" : "Commit", e, t, U, H, r ? "error" : "secondary-dark")) : Dr(e, t, n, !1, i);
		}
		function kr(e, t, n) {
			!wv || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, U, H, "secondary-dark")) : console.timeStamp("Animating", e, t, U, H, "secondary-dark"));
		}
		function Ar() {
			for (var e = Fv, t = Iv = Fv = 0; t < e;) {
				var n = Pv[t];
				Pv[t++] = null;
				var r = Pv[t];
				Pv[t++] = null;
				var i = Pv[t];
				Pv[t++] = null;
				var a = Pv[t];
				if (Pv[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && Pr(n, i, a);
			}
		}
		function jr(e, t, n, r) {
			Pv[Fv++] = e, Pv[Fv++] = t, Pv[Fv++] = n, Pv[Fv++] = r, Iv |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function Mr(e, t, n, r) {
			return jr(e, t, n, r), Fr(e);
		}
		function Nr(e, t) {
			return jr(e, null, null, t), Fr(e);
		}
		function Pr(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Mv || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Nh(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function Fr(e) {
			if (vw > _w) throw Cw = vw = 0, ww = yw = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Cw > Sw && (Cw = 0, ww = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && $u(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && $u(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function Ir(e) {
			if (Rv === null) return e;
			var t = Rv(e);
			return t === void 0 ? e : t.current;
		}
		function Lr(e, t) {
			if (Rv === null) return !1;
			var n = Rv, r = e.elementType;
			t = t.type;
			var i = !1, a = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (i = !0);
					break;
				case 0:
					(typeof t == "function" || a === Rm) && (i = !0);
					break;
				case 11:
					(a === Pm || a === Rm) && (i = !0);
					break;
				case 14:
				case 15:
					(a === Lm || a === Rm) && (i = !0);
					break;
				default: return !1;
			}
			return !!(i && (e = n(r), e !== void 0 && e === n(t)));
		}
		function Rr(e) {
			Rv !== null && typeof WeakSet == "function" && (zv === null && (zv = /* @__PURE__ */ new WeakSet()), zv.add(e));
		}
		function zr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag, c = r.type, l = r.elementType, u = null;
				switch (r = null, s) {
					case 0:
					case 1:
						u = c;
						break;
					case 15:
						u = c, r = l;
						break;
					case 14:
						r = l;
						break;
					case 11: u = c.render, r = l;
				}
				if (Rv === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var d = Rv;
				if (c = l = !1, u !== null && (u = d(u), u !== void 0 && (n.has(u) ? c = !0 : t.has(u) && (s === 1 ? c = !0 : l = !0))), c || r === null || (s = d(r), s !== void 0 && n.has(s) ? c = !0 : typeof r == "object" && r.$$typeof === Rm && (s = r._payload, s._status === 1 && (s = d(s._result.default), s !== void 0 && n.has(s) && (c = !0)))), zv !== null && (zv.has(e) || i !== null && zv.has(i)) && (c = !0), c && (e._debugNeedsRemount = !0), (c || l) && (i = Nr(e, 2), i !== null && au(i, e, 2)), a === null || c || zr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function Br(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Wv || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Vr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Hr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = h(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
				case 14:
				case 1:
				case 11: n.type = Ir(e.type);
			}
			return n;
		}
		function Ur(e, t) {
			e.flags &= 1206910978;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Wr(e, t, n, r, i, a) {
			var o = 0, s = Ir(e);
			if (typeof s == "function") Vr(s) && (o = 1);
			else if (typeof s == "string") o = Ce(), o = Pp(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (s) {
				case zm: return t = h(31, n, t, i), t.elementType = zm, t.lanes = a, t;
				case km: return Kr(n.children, i, a, t);
				case Am:
					o = 8, i |= Vv, i |= Hv;
					break;
				case jm: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | G), t.elementType = jm, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Fm: return t = h(13, n, t, i), t.elementType = Fm, t.lanes = a, t;
				case Im: return t = h(19, n, t, i), t.elementType = Im, t.lanes = a, t;
				case Bm:
				case Hm: return e = i | Uv, t = h(30, n, t, e), t.elementType = Hm, t.lanes = a, t.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}, t;
				default:
					if (typeof s == "object" && s) switch (s.$$typeof) {
						case Nm:
							o = 10;
							break a;
						case Mm:
							o = 9;
							break a;
						case Pm:
							o = 11;
							break a;
						case Lm:
							o = 14;
							break a;
						case Rm:
							o = 16, s = null;
							break a;
					}
					n = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (n += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? s = "null" : Km(e) ? s = "array" : e !== void 0 && e.$$typeof === Dm ? (s = "<" + (he(e.type) || "Unknown") + " />", n = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, (o = r ? ge(r) : null) && (n += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (s + "." + n)), s = null;
			}
			return t = h(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function Gr(e, t, n) {
			return t = Wr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Kr(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function qr(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Jr(e) {
			var t = h(18, null, null, W);
			return t.stateNode = e, t;
		}
		function Yr(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Xr(e, t) {
			if (typeof e == "object" && e) {
				var n = Gv.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: Me(t)
				}, Gv.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: Me(t)
			};
		}
		function Zr(e, t) {
			ri(), Kv[qv++] = Yv, Kv[qv++] = Jv, Jv = e, Yv = t;
		}
		function Qr(e, t, n) {
			ri(), Xv[Zv++] = $v, Xv[Zv++] = ey, Xv[Zv++] = Qv, Qv = e;
			var r = $v;
			e = ey;
			var i = 32 - Nh(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Nh(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, $v = 1 << 32 - Nh(t) + i | n << i | r, ey = a + e;
			} else $v = 1 << a | n << i | r, ey = e;
		}
		function $r(e) {
			ri(), e.return !== null && (Zr(e, 1), Qr(e, 1, 0));
		}
		function ei(e) {
			for (; e === Jv;) Jv = Kv[--qv], Kv[qv] = null, Yv = Kv[--qv], Kv[qv] = null;
			for (; e === Qv;) Qv = Xv[--Zv], Xv[Zv] = null, ey = Xv[--Zv], Xv[Zv] = null, $v = Xv[--Zv], Xv[Zv] = null;
		}
		function ti() {
			return ri(), Qv === null ? null : {
				id: $v,
				overflow: ey
			};
		}
		function ni(e, t) {
			ri(), Xv[Zv++] = $v, Xv[Zv++] = ey, Xv[Zv++] = Qv, $v = t.id, ey = t.overflow, Qv = e;
		}
		function ri() {
			K || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function ii(e, t) {
			if (e.return === null) {
				if (iy === null) iy = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (iy.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					iy.distanceFromLeaf > t && (iy.distanceFromLeaf = t);
				}
				return iy;
			}
			var n = ii(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function ai() {
			K && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function oi(e, t) {
			ry || (e = ii(e, 0), e.serverProps = null, t !== null && (t = ap(t), e.serverTail.push(t)));
		}
		function si(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = iy;
			throw r !== null && (iy = null, n = rn(r)), pi(Xr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), sy;
		}
		function ci(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Wh] = e, t[Gh] = r, Cd(n, r), n) {
				case "dialog":
					I("cancel", t), I("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					I("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < zw.length; n++) I(zw[n], t);
					break;
				case "source":
					I("error", t);
					break;
				case "img":
				case "image":
				case "link":
					I("error", t), I("load", t);
					break;
				case "details":
					I("toggle", t);
					break;
				case "input":
					vt("input", r), I("invalid", t), jt(t, r), Nt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					Ft(t, r);
					break;
				case "select":
					vt("select", r), I("invalid", t), Rt(t, r);
					break;
				case "textarea": vt("textarea", r), I("invalid", t), zt(t, r), Vt(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && (I("beforetoggle", t), I("toggle", t)), r.onScroll != null && I("scroll", t), r.onScrollEnd != null && I("scrollend", t), r.onClick != null && (t.onclick = Cn), t = !0) : t = !1, t || si(e, !0);
		}
		function li(e) {
			for (ty = e.return; ty;) switch (ty.tag) {
				case 5:
				case 31:
				case 13:
					oy = !1;
					return;
				case 27:
				case 3:
					oy = !0;
					return;
				default: ty = ty.return;
			}
		}
		function ui(e) {
			if (e !== ty) return !1;
			if (!K) return li(e), K = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Qd(e.type, e.memoizedProps)), n = !n), n && ny) {
				for (n = ny; n;) {
					var r = ii(e, 0), i = ap(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? sp(n) : ip(n.nextSibling);
				}
				si(e);
			}
			if (li(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ny = sp(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ny = sp(e);
			} else t === 27 ? (t = ny, uf(e.type) ? (e = FT, FT = null, ny = e) : ny = t) : ny = ty ? ip(e.stateNode.nextSibling) : null;
			return !0;
		}
		function di() {
			ny = ty = null, ry = K = !1;
		}
		function fi() {
			var e = ay;
			return e !== null && (LC === null ? LC = e : LC.push.apply(LC, e), ay = null), e;
		}
		function pi(e) {
			ay === null ? ay = [e] : ay.push(e);
		}
		function mi() {
			var e = iy;
			if (e !== null) {
				iy = null;
				for (var t = rn(e); 0 < e.children.length;) e = e.children[0];
				D(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function hi() {
			fy = dy = null, py = !1;
		}
		function gi(e, t, n) {
			ye(cy, t._currentValue, e), t._currentValue = n, ye(ly, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== uy && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = uy;
		}
		function _i(e, t) {
			e._currentValue = cy.current;
			var n = ly.current;
			ve(ly, t), e._currentRenderer = n, ve(cy, t);
		}
		function vi(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function yi(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), vi(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), vi(o, n, e), o = null;
				} else i.tag === 13 && i.memoizedState !== null && i.memoizedState.dehydrated === null ? (i.lanes |= n, o = i.alternate, o !== null && (o.lanes |= n), vi(i.return, n, e), o = i.child, o = o === null ? null : o.sibling) : o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function bi(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						G_(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === eh.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [$T] : e.push($T));
				}
				i = i.return;
			}
			return e !== null && yi(t, e, n, r), t.flags |= 262144, e !== null;
		}
		function xi(e) {
			for (e = e.firstContext; e !== null;) {
				if (!G_(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function Si(e) {
			dy = e, fy = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function Ci(e) {
			return py && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), Ti(dy, e);
		}
		function wi(e, t) {
			return dy === null && Si(e), Ti(e, t);
		}
		function Ti(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, fy === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				fy = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else fy = fy.next = t;
			return n;
		}
		function Ei() {
			return {
				controller: new my(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function Di(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function Oi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && hy(gy, function() {
				e.controller.abort();
			});
		}
		function ki(e, t) {
			if (e.pendingLanes & 4194048) {
				var n = e.transitionTypes;
				for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
					var r = t[e];
					n.indexOf(r) === -1 && n.push(r);
				}
			}
		}
		function Ai(e) {
			var t = e.transitionTypes;
			return e.transitionTypes = null, t;
		}
		function ji(e, t, n) {
			e & 127 ? 0 > Ny && (Ny = yy(), Py = by(t), Iy = t, n != null && (Ly = w(n)), (fC & (rC | iC)) !== nC && (jy = !0, Fy = xy), e = tf(), t = ef(), e !== By || t !== zy ? By = -1.1 : t !== null && (Fy = xy), Ry = e, zy = t) : e & 4194048 && 0 > Wy && (Wy = yy(), Ky = by(t), qy = t, n != null && (Jy = w(n)), 0 > Uy) && (e = tf(), t = ef(), (e !== Zy || t !== Xy) && (Zy = -1.1), Yy = e, Xy = t);
		}
		function Mi(e) {
			if (0 > Ny) {
				Ny = yy(), Py = e._debugTask == null ? null : e._debugTask, (fC & (rC | iC)) !== nC && (Fy = xy);
				var t = tf(), n = ef();
				t !== By || n !== zy ? By = -1.1 : n !== null && (Fy = xy), Ry = t, zy = n;
			}
			0 > Wy && (Wy = yy(), Ky = e._debugTask == null ? null : e._debugTask, 0 > Uy) && (e = tf(), t = ef(), (e !== Zy || t !== Xy) && (Zy = -1.1), Yy = e, Xy = t);
		}
		function Ni() {
			var e = Oy;
			return Oy = 0, e;
		}
		function Pi(e) {
			var t = Oy;
			return Oy = e, t;
		}
		function Fi(e) {
			var t = Oy;
			return Oy += e, t;
		}
		function Ii() {
			J = q = -1.1;
		}
		function Li() {
			var e = q;
			return q = -1.1, e;
		}
		function Ri(e) {
			0 <= e && (q = e);
		}
		function zi() {
			var e = ky;
			return ky = -0, e;
		}
		function Bi(e) {
			0 <= e && (ky = e);
		}
		function Vi() {
			var e = Ay;
			return Ay = null, e;
		}
		function Hi() {
			var e = jy;
			return jy = !1, e;
		}
		function Ui(e) {
			Dy = yy(), 0 > e.actualStartTime && (e.actualStartTime = Dy);
		}
		function Wi(e) {
			if (0 <= Dy) {
				var t = yy() - Dy;
				e.actualDuration += t, e.selfBaseDuration = t, Dy = -1;
			}
		}
		function Gi(e) {
			if (0 <= Dy) {
				var t = yy() - Dy;
				e.actualDuration += t, Dy = -1;
			}
		}
		function Ki() {
			if (0 <= Dy) {
				var e = yy(), t = e - Dy;
				Dy = -1, Oy += t, ky += t, J = e;
			}
		}
		function qi(e) {
			Ay === null && (Ay = []), Ay.push(e), Ey === null && (Ey = []), Ey.push(e);
		}
		function Ji() {
			Dy = yy(), 0 > q && (q = Dy);
		}
		function Yi(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Xi(e, t) {
			if (sb === null) {
				var n = sb = [];
				cb = 0, lb = fd(), ub = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return cb++, t.then(Zi, Zi), t;
		}
		function Zi() {
			if (--cb === 0 && (-1 < Wy || (Uy = -1.1), vy = null, sb !== null)) {
				ub !== null && (ub.status = "fulfilled");
				var e = sb;
				sb = null, lb = 0, ub = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Qi(e, t) {
			var n = [], r = {
				status: "pending",
				value: null,
				reason: null,
				then: function(e) {
					n.push(e);
				}
			};
			return e.then(function() {
				r.status = "fulfilled", r.value = t;
				for (var e = 0; e < n.length; e++) (0, n[e])(t);
			}, function(e) {
				for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
			}), r;
		}
		function $i() {
			var e = fb.current;
			return e === null ? pC.pooledCache : e;
		}
		function ea(e, t) {
			t === null ? ye(fb, fb.current, e) : ye(fb, t.pool, e);
		}
		function ta() {
			var e = $i();
			return e === null ? null : {
				parent: _y._currentValue,
				pool: e
			};
		}
		function na() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function ra(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function ia(e, t, n, r) {
			B.actQueue !== null && (B.didUsePromise = !0);
			var i = e.thenables;
			if (n = i[n], n === void 0 ? i.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(Cn, Cn), t = n), t._debugInfo === void 0) {
				e = performance.now(), i = t.displayName;
				var a = {
					name: typeof i == "string" ? i : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: a }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					a.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw r = t.reason, sa(r), r === void 0 && !("reason" in t) ? Error("A rejected Promise was passed to React without a `reason` property. React threw a generic error from where the Promise was used to assist in identifying the problematic Promise. Make sure that instrumented Promises correctly set the `reason` property when setting `status` to `'rejected'`.") : r;
				default:
					if (typeof t.status == "string") t.then(Cn, Cn);
					else {
						if (e = pC, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
						e = t, e.status = "pending", e.then(function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "fulfilled", n.value = e;
							}
						}, function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "rejected", n.reason = e;
							}
						});
					}
					switch (t.status) {
						case "fulfilled": return t.value;
						case "rejected": throw r = t.reason, sa(r), r;
					}
					throw Yb = t, Xb = !0, Jb || r === null || r.alternate !== null || (Kb = r, qb = Error("This library called use() to suspend in a previous render but did not call use() when it finished. This indicates an incorrect use of use(). Learn more: https://react.dev/warnings/conditional-use-of-use")), Hb;
			}
		}
		function aa(e) {
			try {
				return Vb(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Yb = e, Xb = !0, Hb) : e;
			}
		}
		function oa() {
			if (Yb === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Yb;
			return Yb = null, Xb = !1, e;
		}
		function sa(e) {
			if (e === Hb || e === Wb) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function ca(e, t) {
			return e === t ? !0 : e.tag !== t.tag || e.type !== t.type || e.key !== t.key || e.index !== t.index || e.tag === 3 && e.stateNode !== t.stateNode || e.return === null || t.return === null ? !1 : ca(e.return, t.return);
		}
		function la(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function ua() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function da(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key" && a !== "ref") {
					t === null && (t = Gr(e, n.mode, 0), t._debugInfo = Y, t.return = n), D(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key`, `ref`, and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function fa(e) {
			var t = Qb;
			return Qb += 1, Zb === null && (Zb = na()), ia(Zb, e, t, null);
		}
		function pa(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function ma(e, t) {
			throw t.$$typeof === Em ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function ha(e, t) {
			var n = ua();
			n === null ? ma(e, t) : n.run(ma.bind(null, e, t));
		}
		function ga(e, t) {
			var n = w(e) || "Component";
			nx[n] || (nx[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function O(e, t) {
			var n = ua();
			n === null ? ga(e, t) : n.run(ga.bind(null, e, t));
		}
		function _a(e, t) {
			var n = w(e) || "Component";
			rx[n] || (rx[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function va(e, t) {
			var n = ua();
			n === null ? _a(e, t) : n.run(_a.bind(null, e, t));
		}
		function ya(e) {
			function t(t, n) {
				if (e) {
					var r = t.deletions;
					r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
				}
			}
			function n(n, r) {
				if (!e) return null;
				for (; r !== null;) t(n, r), r = r.sibling;
				return null;
			}
			function r(e) {
				for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
				return t;
			}
			function i(e, t) {
				return e = Hr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 134217730), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = qr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === km ? (t = u(e, t, n.props.children, r, n.key), pa(t, n), da(n, t, e), t) : t !== null && (t.elementType === a || Lr(t, n) || typeof a == "object" && a && a.$$typeof === Rm && aa(a) === t.type) ? (t = i(t, n.props), pa(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = Gr(n, e.mode, r), pa(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Yr(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Kr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = qr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Dm: return n = Gr(t, e.mode, n), pa(n, t), n.return = e, e = la(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case Om: return t = Yr(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Rm:
							var r = la(t._debugInfo);
							return t = aa(t), e = d(e, t, n), Y = r, e;
					}
					if (Km(t) || me(t)) return n = Kr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = la(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = la(t._debugInfo), e = d(e, fa(t), n), Y = r, e;
					if (t.$$typeof === Nm) return d(e, wi(e, t), n);
					ha(e, t);
				}
				return typeof t == "function" && O(e, t), typeof t == "symbol" && va(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Dm: return n.key === i ? (i = la(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case Om: return n.key === i ? l(e, t, n, r) : null;
						case Rm: return i = la(n._debugInfo), n = aa(n), e = p(e, t, n, r), Y = i, e;
					}
					if (Km(n) || me(n)) return i === null ? (i = la(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = la(n._debugInfo), e = p(e, t, fa(n), r), Y = i, e;
					if (n.$$typeof === Nm) return p(e, t, wi(e, n), r);
					ha(e, n);
				}
				return typeof n == "function" && O(e, n), typeof n == "symbol" && va(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Dm: return n = e.get(r.key === null ? n : r.key) || null, e = la(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case Om: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Rm:
							var a = la(r._debugInfo);
							return r = aa(r), t = m(e, t, n, r, i), Y = a, t;
					}
					if (Km(r) || me(r)) return n = e.get(n) || null, e = la(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = la(r._debugInfo), t = m(e, t, n, fa(r), i), Y = a, t;
					if (r.$$typeof === Nm) return m(e, t, n, wi(t, r), i);
					ha(t, r);
				}
				return typeof r == "function" && O(t, r), typeof r == "symbol" && va(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Dm:
					case Om:
						f(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						D(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Rm: n = aa(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, f = null, h = o, _ = o = 0, v = null; h !== null && _ < s.length; _++) {
					h.index > _ ? (v = h, h = null) : v = h.sibling;
					var y = p(i, h, s[_], c);
					if (y === null) {
						h === null && (h = v);
						break;
					}
					l = g(i, y, s[_], l), e && h && y.alternate === null && t(i, h), o = a(y, o, _), f === null ? u = y : f.sibling = y, f = y, h = v;
				}
				if (_ === s.length) return n(i, h), K && Zr(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), f === null ? u = h : f.sibling = h, f = h);
					return K && Zr(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && (y = v.alternate, y !== null && h.delete(y.key === null ? _ : y.key)), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), K && Zr(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, f = o, h = o = 0, _ = null, v = null, y = s.next(); f !== null && !y.done; h++, y = s.next()) {
					f.index > h ? (_ = f, f = null) : _ = f.sibling;
					var b = p(i, f, y.value, c);
					if (b === null) {
						f === null && (f = _);
						break;
					}
					v = g(i, b, y.value, v), e && f && b.alternate === null && t(i, f), o = a(b, o, h), u === null ? l = b : u.sibling = b, u = b, f = _;
				}
				if (y.done) return n(i, f), K && Zr(i, h), l;
				if (f === null) {
					for (; !y.done; h++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, h), u === null ? l = f : u.sibling = f, u = f);
					return K && Zr(i, h), l;
				}
				for (f = r(f); !y.done; h++, y = s.next()) _ = m(f, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && (y = _.alternate, y !== null && f.delete(y.key === null ? h : y.key)), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), K && Zr(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === km && a.key === null && a.props.ref === void 0 && (da(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Dm:
							var c = la(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === km) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), pa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, da(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || Lr(r, a) || typeof l == "object" && l && l.$$typeof === Rm && aa(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), pa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								a.type === km ? (s = Kr(a.props.children, e.mode, s, a.key), pa(s, a), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, da(a, s, e), e = s) : (s = Gr(a, e.mode, s), pa(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case Om:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) {
										if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
											n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								s = Yr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Rm: return c = la(a._debugInfo), a = aa(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Km(a)) return _(e, r, a, s);
					if (me(a)) {
						if (c = a, a = me(c), typeof a != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						return l = a.call(c), l === c ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(l) !== "[object Generator]") && (ex || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), ex = !0) : c.entries !== a || $b || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), $b = !0), v(e, r, l, s);
					}
					if (typeof a.then == "function") return c = la(a._debugInfo), e = y(e, r, fa(a), s), Y = c, e;
					if (a.$$typeof === Nm) return y(e, r, wi(e, a), s);
					ha(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = qr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && O(e, a), typeof a == "symbol" && va(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Qb = 0;
					var a = y(e, t, n, r);
					return Zb = null, a;
				} catch (t) {
					if (t === Hb || t === Wb) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function ba(e, t) {
			var n = Km(e);
			return e = !n && typeof me(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function xa(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function Sa(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function Ca(e) {
			return {
				lane: e,
				tag: ox,
				payload: null,
				callback: null,
				next: null
			};
		}
		function wa(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, fx === r && !dx) {
				var i = w(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), dx = !0;
			}
			return (fC & rC) === nC ? (jr(e, r, t, n), Fr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Fr(e), Pr(e, null, n), t);
		}
		function Ta(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
			}
		}
		function Ea(e, t) {
			var n = e.updateQueue, r = e.alternate;
			if (r !== null && (r = r.updateQueue, n === r)) {
				var i = null, a = null;
				if (n = n.firstBaseUpdate, n !== null) {
					do {
						var o = {
							lane: n.lane,
							tag: n.tag,
							payload: n.payload,
							callback: null,
							next: null
						};
						a === null ? i = a = o : a = a.next = o, n = n.next;
					} while (n !== null);
					a === null ? i = a = t : a = a.next = t;
				} else i = a = t;
				n = {
					baseState: r.baseState,
					firstBaseUpdate: i,
					lastBaseUpdate: a,
					shared: r.shared,
					callbacks: r.callbacks
				}, e.updateQueue = n;
			} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
		}
		function Da() {
			if (px) {
				var e = ub;
				if (e !== null) throw e;
			}
		}
		function Oa(e, t, n, r) {
			px = !1;
			var i = e.updateQueue;
			ux = !1, fx = i.shared;
			var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
			if (s !== null) {
				i.shared.pending = null;
				var c = s, l = c.next;
				c.next = null, o === null ? a = l : o.next = l, o = c;
				var u = e.alternate;
				u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
			}
			if (a !== null) {
				var d = i.baseState;
				o = 0, u = l = c = null, s = a;
				do {
					var f = s.lane & -536870913, p = f !== s.lane;
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === lb && (px = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case sx:
									if (m = m.payload, typeof m == "function") {
										py = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Vv) {
											Ue(!0);
											try {
												m.call(g, d, h);
											} finally {
												Ue(!1);
											}
										}
										py = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case lx: f.flags = f.flags & -65537 | 128;
								case ox:
									if (_ = m.payload, typeof _ == "function") {
										if (py = !0, m = _.call(g, d, h), f.mode & Vv) {
											Ue(!0);
											try {
												_.call(g, d, h);
											} finally {
												Ue(!1);
											}
										}
										py = !1;
									} else m = _;
									if (m == null) break a;
									d = z({}, d, m);
									break a;
								case cx: ux = !0;
							}
						}
						f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
					} else p = {
						lane: f,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
					if (s = s.next, s === null) {
						if (s = i.shared.pending, s === null) break;
						p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
					}
				} while (1);
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), jC |= o, e.lanes = o, e.memoizedState = d;
			}
			fx = null;
		}
		function ka(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function Aa(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) ka(n[e], t);
		}
		function ja(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ka(n[e], t);
		}
		function Ma(e, t) {
			var n = kC;
			ye(hx, n, e), ye(mx, t, e), kC = n | t.baseLanes;
		}
		function Na(e) {
			ye(hx, kC, e), ye(mx, mx.current, e);
		}
		function Pa(e) {
			kC = hx.current, ve(mx, e), ve(hx, e);
		}
		function Fa(e) {
			var t = e.alternate;
			ye(bx, bx.current & vx, e), ye(gx, e, e), _x === null && (t === null || mx.current !== null || t.memoizedState !== null) && (_x = e);
		}
		function Ia(e) {
			ye(bx, bx.current, e), ye(gx, e, e), _x === null && (_x = e);
		}
		function La(e) {
			e.tag === 22 ? (ye(bx, bx.current, e), ye(gx, e, e), _x === null && (_x = e)) : Ra(e);
		}
		function Ra(e) {
			ye(bx, bx.current, e), ye(gx, gx.current, e);
		}
		function za(e) {
			ve(gx, e), _x === e && (_x = null), ve(bx, e);
		}
		function Ba(e, t) {
			ye(gx, gx.current, e), ye(bx, t, e);
		}
		function Va(e) {
			ve(bx, e), ve(gx, e), _x === e && (_x = null);
		}
		function Ha(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || R(n) || np(n))) return t;
				} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
					if (t.flags & 128) return t;
				} else if (t.child !== null) {
					t.child.return = t, t = t.child;
					continue;
				}
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return null;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
			return null;
		}
		function k() {
			var e = Z;
			Hx === null ? Hx = [e] : Hx.push(e);
		}
		function A() {
			var e = Z;
			if (Hx !== null && (Ux++, Hx[Ux] !== e)) {
				var t = w(X);
				if (!Dx.has(t) && (Dx.add(t), Hx !== null)) {
					for (var n = "", r = 0; r <= Ux; r++) {
						var i = Hx[r], a = r === Ux ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function Ua(e) {
			e == null || Km(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function Wa() {
			var e = w(X);
			Ax.has(e) || (Ax.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function Ga() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function Ka(e, t) {
			if (Wx) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!G_(e[n], t[n])) return !1;
			return !0;
		}
		function qa(e, t, n, r, i, a) {
			jx = a, X = t, Hx = e === null ? null : e._debugHookTypes, Ux = -1, Wx = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = w(X), kx.has(a) || (kx.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e !== null && e.memoizedState !== null ? Jx : Hx === null ? Kx : qx, Ix = a = (t.mode & Vv) !== W;
			var o = Tb(n, r, i);
			if (Ix = !1, Fx && (o = Ya(t, n, r, i)), a) {
				Ue(!0);
				try {
					o = Ya(t, n, r, i);
				} finally {
					Ue(!1);
				}
			}
			return Ja(e, t), o;
		}
		function Ja(e, t) {
			t._debugHookTypes = Hx, t.dependencies === null ? zx !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: zx
			}) : t.dependencies._debugThenableState = zx;
			var n = zx;
			if (Kb !== null && ca(Kb, t) && (n !== null || qb === null || Jb || (Jb = !0, console.error(qb)), qb = Kb = null), B.H = Gx, n = Mx !== null && Mx.next !== null, jx = 0, Hx = Z = Nx = Mx = X = null, Ux = -1, e !== null && (e.flags & 1206910976) != (t.flags & 1206910976) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Px = !1, Rx = 0, zx = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || mS || (e = e.dependencies, e !== null && xi(e) && (mS = !0)), Xb ? (Xb = !1, e = !0) : e = !1, e && (t = w(t) || "Unknown", Ox.has(t) || kx.has(t) || (Ox.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Ya(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Fx && (zx = null), Rx = 0, Fx = !1, i >= Vx) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Wx = !1, Nx = Mx = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Ux = -1, B.H = Yx, a = Tb(t, n, r);
			} while (Fx);
			return a;
		}
		function Xa() {
			var e = B.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? no(t) : t, e = e.useState()[0], (Mx === null ? null : Mx.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Za() {
			var e = Lx !== 0;
			return Lx = 0, e;
		}
		function Qa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Hv) === W ? t.flags & -2053 : t.flags & -805308421, e.lanes &= ~n;
		}
		function $a(e) {
			if (Px) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Px = !1;
			}
			jx = 0, Hx = Nx = Mx = X = null, Ux = -1, Z = null, Fx = !1, Rx = Lx = 0, zx = null;
		}
		function eo() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Nx === null ? X.memoizedState = Nx = e : Nx = Nx.next = e, Nx;
		}
		function j() {
			if (Mx === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = Mx.next;
			var t = Nx === null ? X.memoizedState : Nx.next;
			if (t !== null) Nx = t, Mx = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				Mx = e, e = {
					memoizedState: Mx.memoizedState,
					baseState: Mx.baseState,
					baseQueue: Mx.baseQueue,
					queue: Mx.queue,
					next: null
				}, Nx === null ? X.memoizedState = Nx = e : Nx = Nx.next = e;
			}
			return Nx;
		}
		function to() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function no(e) {
			var t = Rx;
			return Rx += 1, zx === null && (zx = na()), e = ia(zx, e, t, X), t = X, (Nx === null ? t.memoizedState : Nx.next) === null && (t = t.alternate, B.H = t !== null && t.memoizedState !== null ? Jx : Kx), e;
		}
		function ro(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return no(e);
				if (e.$$typeof === Um) return;
				if (e.$$typeof === Nm) return Ci(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function io(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
				r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
					data: r.data.map(function(e) {
						return e.slice();
					}),
					index: 0
				})));
			}
			if (t ??= {
				data: [],
				index: 0
			}, n === null && (n = to(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Wx) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Vm;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function ao(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function oo(e, t, n) {
			var r = eo();
			if (n !== void 0) {
				var i = n(t);
				if (Ix) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ms.bind(null, X, e), [r.memoizedState, e];
		}
		function so(e) {
			return co(j(), Mx, e);
		}
		function co(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (jx & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === lb && (u = !0);
						else if ((jx & f) === f) {
							l = l.next, f === lb && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, jC |= f;
						d = l.action, Ix && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, jC |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !G_(a, e.memoizedState) && (mS = !0, u && (n = ub, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function lo(e) {
			var t = j(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				G_(a, t.memoizedState) || (mS = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function uo(e, t, n) {
			var r = X, i = eo();
			if (K) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				Ex || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			} else {
				if (a = t(), Ex || (n = t(), G_(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0)), pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || po(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, Bo(ho.bind(null, r, n, e), [e]), r.flags |= 2048, Io(Sx | Tx, { destroy: void 0 }, mo.bind(null, r, n, a, t), null), a;
		}
		function fo(e, t, n) {
			var r = X, i = j(), a = K;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !Ex) {
				var o = t();
				G_(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			}
			if ((o = !G_((Mx || i).memoizedState, n)) && (i.memoizedState = n, mS = !0), i = i.queue, zo(2048, Tx, ho.bind(null, r, i, e), [e]), e = i.getSnapshot !== t || o || Nx !== null && (Nx.memoizedState.tag & Sx) !== xx, Io(e ? Sx | Tx : Tx, { destroy: void 0 }, mo.bind(null, r, i, n, t), null), e) {
				if (r.flags |= 2048, pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || jx & 127 || po(r, t, n);
			}
			return n;
		}
		function po(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = to(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function mo(e, t, n, r) {
			t.value = n, t.getSnapshot = r, go(t) && _o(e);
		}
		function ho(e, t, n) {
			return n(function() {
				go(t) && (ji(2, "updateSyncExternalStore()", e), _o(e));
			});
		}
		function go(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !G_(e, n);
			} catch {
				return !0;
			}
		}
		function _o(e) {
			var t = Nr(e, 2);
			t !== null && au(t, e, 2);
		}
		function vo(e) {
			var t = eo();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Ix) {
					Ue(!0);
					try {
						n();
					} finally {
						Ue(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ao,
				lastRenderedState: e
			}, t;
		}
		function yo(e) {
			e = vo(e);
			var t = e.queue, n = hs.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function bo(e) {
			var t = eo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = _s.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function xo(e, t) {
			return So(j(), Mx, e, t);
		}
		function So(e, t, n, r) {
			return e.baseState = n, co(e, Mx, typeof r == "function" ? r : ao);
		}
		function Co(e, t) {
			var n = j();
			return Mx === null ? (n.baseState = e, [e, n.queue.dispatch]) : So(n, Mx, e, t);
		}
		function wo(e, t, n, r, i) {
			if (vs(e)) throw Error("Cannot update action state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				B.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, To(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function To(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = B.T, o = {};
				o.types = a === null ? null : a.types, o._updatedFibers = /* @__PURE__ */ new Set(), B.T = o;
				try {
					var s = n(i, r), c = B.S;
					c !== null && c(o, s), Eo(e, t, s);
				} catch (n) {
					Oo(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), B.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), Eo(e, t, o);
			} catch (n) {
				Oo(e, t, n);
			}
		}
		function Eo(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (B.asyncTransitions++, n.then(ns, ns), n.then(function(n) {
				Do(e, t, n);
			}, function(n) {
				return Oo(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : Do(e, t, n);
		}
		function Do(e, t, n) {
			t.status = "fulfilled", t.value = n, ko(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, To(e, n)));
		}
		function Oo(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, ko(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function ko(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function Ao(e, t) {
			return t;
		}
		function jo(e, t) {
			if (K) {
				var n = pC.formState;
				if (n !== null) {
					a: {
						var r = X;
						if (K) {
							if (ny) {
								b: {
									for (var i = ny, a = oy; i.nodeType !== 8;) if (!a || (i = ip(i.nextSibling), i === null)) {
										i = null;
										break b;
									}
									a = i.data, i = a === pT || a === mT ? i : null;
								}
								if (i) {
									ny = ip(i.nextSibling), r = i.data === pT;
									break a;
								}
							}
							si(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = eo(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ao,
				lastRenderedState: t
			}, n.queue = r, n = hs.bind(null, X, r), r.dispatch = n, r = vo(!1), a = _s.bind(null, X, !1, r.queue), r = eo(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = wo.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function Mo(e) {
			return No(j(), Mx, e);
		}
		function No(e, t, n) {
			if (t = co(e, t, Ao)[0], e = so(ao)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = no(t);
			} catch (e) {
				throw e === Hb ? Wb : e;
			}
			else r = t;
			t = j();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, Io(Sx | Tx, { destroy: void 0 }, Po.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function Po(e, t) {
			e.action = t;
		}
		function Fo(e) {
			var t = j(), n = Mx;
			if (n !== null) return No(t, n, e);
			j(), t = t.memoizedState, n = j();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function Io(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = to(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function Lo(e) {
			var t = eo();
			return e = { current: e }, t.memoizedState = e;
		}
		function Ro(e, t, n, r) {
			var i = eo();
			X.flags |= e, i.memoizedState = Io(Sx | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function zo(e, t, n, r) {
			var i = j();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Mx !== null && r !== null && Ka(r, Mx.memoizedState.deps) ? i.memoizedState = Io(t, a, n, r) : (X.flags |= e, i.memoizedState = Io(Sx | t, a, n, r));
		}
		function Bo(e, t) {
			(X.mode & Hv) === W ? Ro(8390656, Tx, e, t) : Ro(545261568, Tx, e, t);
		}
		function Vo(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = to(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function Ho(e) {
			var t = eo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function Uo(e) {
			var t = j().memoizedState;
			return Vo({
				ref: t,
				nextImpl: e
			}), function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function Wo(e, t) {
			var n = 4194308;
			return (X.mode & Hv) !== W && (n |= 268435456), Ro(n, wx, e, t);
		}
		function Go(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function Ko(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Hv) !== W && (r |= 268435456), Ro(r, wx, Go.bind(null, t, e), n);
		}
		function qo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), zo(4, wx, Go.bind(null, t, e), n);
		}
		function Jo(e, t) {
			return eo().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Yo(e, t) {
			var n = j();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && Ka(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Xo(e, t) {
			var n = eo();
			t = t === void 0 ? null : t;
			var r = e();
			if (Ix) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Zo(e, t) {
			var n = j();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && Ka(t, r[1])) return r[0];
			if (r = e(), Ix) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function M(e, t) {
			return es(eo(), e, t);
		}
		function Qo(e, t) {
			return ts(j(), Mx.memoizedState, e, t);
		}
		function $o(e, t) {
			var n = j();
			return Mx === null ? es(n, e, t) : ts(n, Mx.memoizedState, e, t);
		}
		function es(e, t, n) {
			return n === void 0 || jx & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = ru(), X.lanes |= e, jC |= e, n);
		}
		function ts(e, t, n, r) {
			return G_(n, t) ? n : mx.current === null ? !(jx & 106) || jx & 1073741824 && !($ & 261930) ? (mS = !0, e.memoizedState = n) : (e = ru(), X.lanes |= e, jC |= e, t) : (e = es(e, n, r), G_(e, t) || (mS = !0), e);
		}
		function ns() {
			B.asyncTransitions--;
		}
		function rs(e, t, n, r, i) {
			var a = V.p;
			V.p = a !== 0 && a < Bh ? a : Bh;
			var o = B.T, s = {};
			s.types = o === null ? null : o.types, s._updatedFibers = /* @__PURE__ */ new Set(), B.T = s, _s(e, !1, t, n);
			try {
				var c = i(), l = B.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					B.asyncTransitions++, c.then(ns, ns);
					var u = Qi(c, r);
					gs(e, t, u, nu(e));
				} else gs(e, t, r, nu(e));
			} catch (n) {
				gs(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, nu(e));
			} finally {
				V.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), B.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function is(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = as(e).queue;
			Mi(e), rs(e, i, t, QT, n === null ? u : function() {
				return os(e), n(r);
			});
		}
		function as(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: QT,
				baseState: QT,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: ao,
					lastRenderedState: QT
				},
				next: null
			};
			var n = {};
			return t.next = {
				memoizedState: n,
				baseState: n,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: ao,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function os(e) {
			B.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = as(e);
			t.next === null && (t = e.alternate.memoizedState), gs(e, t.next.queue, {}, nu(e));
		}
		function ss() {
			var e = vo(!1);
			return e = rs.bind(null, X, e.queue, !0, !1), eo().memoizedState = e, [!1, e];
		}
		function cs() {
			var e = so(ao)[0], t = j().memoizedState;
			return [typeof e == "boolean" ? e : no(e), t];
		}
		function ls() {
			var e = lo(ao)[0], t = j().memoizedState;
			return [typeof e == "boolean" ? e : no(e), t];
		}
		function us() {
			return Ci($T);
		}
		function ds() {
			var e = eo(), t = pC.identifierPrefix;
			if (K) {
				var n = ey, r = $v;
				n = (r & ~(1 << 32 - Nh(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Lx++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Bx++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function fs() {
			return eo().memoizedState = ps.bind(null, X);
		}
		function ps(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = nu(n), i = Ca(r), a = wa(n, i, r);
						a !== null && (ji(r, "refresh()", e), au(a, n, r), Ta(a, n, r)), e = Ei(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function ms(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = nu(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			vs(e) ? ys(t, i) : (i = Mr(e, t, i, r), i !== null && (ji(r, "dispatch()", e), au(i, e, r), bs(i, t, r)));
		}
		function hs(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = nu(e), gs(e, t, n, r) && ji(r, "setState()", e);
		}
		function gs(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (vs(e)) ys(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = B.H;
					B.H = Zx;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, G_(c, s)) return jr(e, t, i, 0), pC === null && Ar(), !1;
					} catch {} finally {
						B.H = o;
					}
				}
				if (n = Mr(e, t, i, r), n !== null) return au(n, e, r), bs(n, t, r), !0;
			}
			return !1;
		}
		function _s(e, t, n, r) {
			if (B.T === null && lb === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: fd(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, vs(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = Mr(e, n, r, 2), t !== null && (ji(2, "setOptimistic()", e), au(t, e, 2));
		}
		function vs(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function ys(e, t) {
			Fx = Px = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function bs(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
			}
		}
		function xs(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				lS.has(t) || (lS.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Ss(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Vv) {
				Ue(!0);
				try {
					a = n(r, i);
				} finally {
					Ue(!1);
				}
			}
			a === void 0 && (t = he(t) || "Component", aS.has(t) || (aS.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : z({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Cs(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Vv) {
					Ue(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Ue(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", he(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Qn(n, r) || !Qn(i, a) : !0;
		}
		function ws(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = w(e) || "Component", eS.has(e) || (eS.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), uS.enqueueReplaceState(t, t.state, null));
		}
		function Ts(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = z({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function Es(e) {
			mv(e), console.warn("%s\n\n%s\n", dS ? "An error occurred in the <" + dS + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function Ds(e) {
			var t = dS ? "The above error occurred in the <" + dS + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((fS || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, eE + " " + e[0], tE, rE + r + rE, nE) : e.splice(0, 0, eE, tE, rE + r + rE, nE), e.unshift(console), r = iE.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function Os(e) {
			mv(e);
		}
		function ks(e, t) {
			try {
				dS = t.source ? w(t.source) : null, fS = null;
				var n = t.value;
				if (B.actQueue !== null) B.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function As(e, t, n) {
			try {
				dS = n.source ? w(n.source) : null, fS = w(t);
				var r = e.onCaughtError;
				r(n.value, {
					componentStack: n.stack,
					errorBoundary: t.tag === 1 ? t.stateNode : null
				});
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function js(e, t, n) {
			return n = Ca(n), n.tag = lx, n.payload = { element: null }, n.callback = function() {
				D(t.source, ks, e, t);
			}, n;
		}
		function Ms(e) {
			return e = Ca(e), e.tag = lx, e;
		}
		function Ns(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					Rr(n), D(r.source, As, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				Rr(n), D(r.source, As, t, n, r), typeof i != "function" && (KC === null ? KC = /* @__PURE__ */ new Set([this]) : KC.add(this)), Nb(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", w(n) || "Unknown");
			});
		}
		function Ps(e, t, n, r, i) {
			if (n.flags |= 32768, Mh && ed(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && bi(t, n, i, !0), K && (ry = !0), n = gx.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13:
						case 19: return _x === null ? yu() : n.alternate === null && AC === aC && (AC = cC), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Gb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Gb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Gu(e, r, i), yu(), !1;
			}
			if (K) return ry = !0, t = gx.current, t === null ? (r !== sy && pi(Xr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Xr(r, n), i = js(e.stateNode, r, i), Ea(e, i), AC !== lC && (AC = sC)) : (t.tag === 19 && console.error("SuspenseList should never catch while hydrating. This is a bug in React."), !(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== sy && pi(Xr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Xr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (IC === null ? IC = [a] : IC.push(a), AC !== lC && (AC = sC), t === null) return !0;
			r = Xr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = js(n.stateNode, r, e), Ea(n, e), !1;
					case 1:
						if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (KC === null || !KC.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = Ms(i), Ns(i, e, n, r), Ea(n, i), !1;
						break;
					case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function Fs(e, t, n, r) {
			t.child = e === null ? ax(t, null, n, r) : ix(t, e.child, n, r);
		}
		function Is(e, t, n, r, i) {
			n = n.render;
			var a = Ir(n);
			if (a !== n && (n = a, e !== null && (mS = !0)), a = t.ref, "ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return Si(t), r = qa(e, t, n, o, a, i), s = Za(), e !== null && !mS ? (Qa(e, t, i), uc(e, t, i)) : (K && s && $r(t), t.flags |= 1, Fs(e, t, r, i), t.child);
		}
		function Ls(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Vr(a) && a.defaultProps === void 0 && n.compare === null ? (n = Ir(a), t.tag = 15, t.type = n, Xs(t, a), Rs(e, t, n, r, i)) : (e = Wr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !dc(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Qn : n, n(o, r) && e.ref === t.ref) return uc(e, t, i);
			}
			return t.flags |= 1, e = Hr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function Rs(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Qn(a, r) && e.ref === t.ref && t.type === e.type) {
					if (mS = !1, t.pendingProps = r = a, dc(e, i)) e.flags & 131072 && (mS = !0);
					else return t.lanes = e.lanes, uc(e, t, i);
				}
			}
			return Ks(e, t, n, r, i);
		}
		function zs(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Mv,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return Vs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && ea(t, a === null ? null : a.cachePool), a === null ? Na(t) : Ma(t, a), La(t);
				else return r = t.lanes = 536870912, Vs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && ea(t, null), Na(t), Ra(t)) : (ea(t, a.cachePool), Ma(t, a), Ra(t), t.memoizedState = null);
			return Fs(e, t, i, n), t.child;
		}
		function Bs(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Mv,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function Vs(e, t, n, r, i) {
			var a = $i();
			return a = a === null ? null : {
				parent: _y._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && ea(t, null), Na(t), La(t), e !== null && bi(e, t, r, !0), t.childLanes = i, null;
		}
		function Hs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = tc({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function Us(e, t, n) {
			return ix(t, e.child, null, n), e = Hs(t, t.pendingProps), e.flags |= 2, za(t), t.memoizedState = null, e;
		}
		function Ws(e, t, n) {
			var r = t.pendingProps, i = !!(t.flags & 128);
			if (t.flags &= -129, e === null) {
				if (K) {
					if (r.mode === "hidden") return e = Hs(t, r), t.lanes = 536870912, e.memoizedState = {
						baseLanes: 0,
						cachePool: null
					}, Bs(null, e);
					if (Ia(t), (e = ny) ? (n = tp(e, oy), n = n !== null && n.data === rT ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: ti(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Jr(n), r.return = t, t.child = r, ty = t, ny = null)) : n = null, n === null) throw oi(t, e), si(t);
					return t.lanes = 536870912, null;
				}
				return Hs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (Ia(t), i) {
					if (t.flags & 256) t.flags &= -257, t = Us(e, t, n);
					else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
					else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				} else if (ai(), n & 536870912 && vu(t), mS || bi(e, t, n, !1), i = (n & e.childLanes) !== 0, mS || i) {
					if (mx.current === null) {
						if (r = pC, r !== null && (o = nt(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, Nr(e, o), au(r, e, o), pS;
						yu();
					}
					t = Us(e, t, n);
				} else e = a.treeContext, ny = ip(o.nextSibling), ty = t, K = !0, ay = null, ry = !1, iy = null, oy = !1, e !== null && ni(t, e), t = Hs(t, r), t.flags |= 134221824;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && vu(t), e = Hr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function Gs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function Ks(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = he(n) || "Unknown";
				hS[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), hS[a] = !0);
			}
			return t.mode & Vv && pb.recordLegacyContextWarning(t, null), e === null && (Xs(t, t.type), n.contextTypes && (a = he(n) || "Unknown", _S[a] || (_S[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), Si(t), n = qa(e, t, n, r, void 0, i), r = Za(), e !== null && !mS ? (Qa(e, t, i), uc(e, t, i)) : (K && r && $r(t), t.flags |= 1, Fs(e, t, n, i), t.child);
		}
		function qs(e, t, n, r, i, a) {
			return Si(t), Ux = -1, Wx = e !== null && e.type !== t.type, t.updateQueue = null, n = Ya(t, r, n, i), Ja(e, t), r = Za(), e !== null && !mS ? (Qa(e, t, a), uc(e, t, a)) : (K && r && $r(t), t.flags |= 1, Fs(e, t, n, a), t.child);
		}
		function Js(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = pC, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = Ms(c), Ns(c, o, t, Xr(a, t)), Ea(t, c);
			}
			if (Si(t), t.stateNode === null) {
				if (o = Lv, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Nm) && !cS.has(n) && (cS.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Mm ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", he(n) || "Component", c)), typeof a == "object" && a && (o = Ci(a)), a = new n(r, o), t.mode & Vv) {
					Ue(!0);
					try {
						a = new n(r, o);
					} finally {
						Ue(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = uS, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = $x, typeof n.getDerivedStateFromProps == "function" && o === null && (o = he(n) || "Component", tS.has(o) || (tS.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = he(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						rS.has(a) || (rS.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = he(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !sS.has(n) && (sS.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !oS.has(n) && (oS.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", he(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || nS.has(n) || (nS.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", he(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || Km(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, xa(t), o = n.contextType, a.context = typeof o == "object" && o ? Ci(o) : Lv, a.state === r && (o = he(n) || "Component", iS.has(o) || (iS.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Vv && pb.recordLegacyContextWarning(t, a), pb.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ss(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", w(t) || "Component"), uS.enqueueReplaceState(a, a.state, null)), Oa(t, r, a, i), Da(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Hv) !== W && (t.flags |= 268435456), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = Ts(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Lv, typeof l == "object" && l && (o = Ci(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && ws(t, a, r, o), ux = !1;
				var p = t.memoizedState;
				a.state = p, Oa(t, r, a, i), Da(), f = t.memoizedState, d || p !== f || ux ? (typeof u == "function" && (Ss(t, n, u, r), f = t.memoizedState), (c = ux || Cs(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Hv) !== W && (t.flags |= 268435456)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Hv) !== W && (t.flags |= 268435456), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Hv) !== W && (t.flags |= 268435456), a = !1);
			} else {
				a = t.stateNode, Sa(e, t), o = t.memoizedProps, l = Ts(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Lv, typeof f == "object" && f && (c = Ci(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && ws(t, a, r, c), ux = !1, p = t.memoizedState, a.state = p, Oa(t, r, a, i), Da();
				var m = t.memoizedState;
				o !== u || p !== m || ux || e !== null && e.dependencies !== null && xi(e.dependencies) ? (typeof d == "function" && (Ss(t, n, d, r), m = t.memoizedState), (l = ux || Cs(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && xi(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, Gs(e, t), o = !!(t.flags & 128), c || o) {
				if (c = t.stateNode, Fe(t), o && typeof n.getDerivedStateFromError != "function") n = null, Dy = -1;
				else if (n = Db(c), t.mode & Vv) {
					Ue(!0);
					try {
						Db(c);
					} finally {
						Ue(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = ix(t, e.child, null, i), t.child = ix(t, null, n, i)) : Fs(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = uc(e, t, i);
			return i = t.stateNode, a && i.props !== r && (yS || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", w(t) || "a component"), yS = !0), e;
		}
		function Ys(e, t, n, r) {
			return di(), t.flags |= 256, Fs(e, t, n, r), t.child;
		}
		function Xs(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = he(t) || "Unknown", vS[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), vS[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = he(t) || "Unknown", gS[t] || (console.error("%s: Function components do not support contextType.", t), gS[t] = !0));
		}
		function Zs(e) {
			return {
				baseLanes: e,
				cachePool: ta()
			};
		}
		function Qs(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= PC), e;
		}
		function $s(e, t, n) {
			var r = t.pendingProps;
			o(t) && (t.flags |= 128);
			var i = !1, a = !!(t.flags & 128), s;
			if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (bx.current & yx) !== 0), s && (i = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
				if (K) {
					if (i ? Fa(t) : Ra(t), (e = ny) ? (n = tp(e, oy), n = n !== null && n.data !== rT ? n : null, n !== null && (s = {
						dehydrated: n,
						treeContext: ti(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = s, s = Jr(n), s.return = t, t.child = s, ty = t, ny = null)) : n = null, n === null) throw oi(t, e), si(t);
					return t.lanes = np(n) ? 32 : 536870912, null;
				}
				return a = r.children, r = r.fallback, i ? (Ra(t), i = t.mode, a = tc({
					mode: "hidden",
					children: a
				}, i), r = Kr(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Zs(n), r.childLanes = Qs(e, s, n), t.memoizedState = CS, Bs(null, r)) : (Fa(t), ec(t, a));
			}
			var c = e.memoizedState;
			if (c !== null) {
				var l = c.dehydrated;
				if (l !== null) return rc(e, t, a, s, r, l, c, n);
			}
			return i ? (Ra(t), i = r.fallback, a = t.mode, c = e.child, l = c.sibling, r = Hr(c, {
				mode: "hidden",
				children: r.children
			}), r.subtreeFlags = c.subtreeFlags & 1206910976, l === null ? (i = Kr(i, a, n, null), i.flags |= 2) : i = Hr(l, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Bs(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Zs(n) : (a = i.cachePool, a === null ? a = ta() : (c = _y._currentValue, a = a.parent === c ? a : {
				parent: c,
				pool: c
			}), i = {
				baseLanes: i.baseLanes | n,
				cachePool: a
			}), r.memoizedState = i, r.childLanes = Qs(e, s, n), t.memoizedState = CS, Bs(e.child, r)) : (c !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && vu(t), Fa(t), n = e.child, e = n.sibling, n = Hr(n, {
				mode: "visible",
				children: r.children
			}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function ec(e, t) {
			return t = tc({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function tc(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function nc(e, t, n) {
			return ix(t, e.child, null, n), e = ec(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function rc(e, t, n, r, i, a, o, s) {
			if (n) {
				if (t.flags & 256) return Fa(t), t.flags &= -257, nc(e, t, s);
				if (t.memoizedState !== null) return Ra(t), t.child = e.child, t.flags |= 128, null;
				Ra(t);
				var c = i.fallback, l = t.mode, u = tc({
					mode: "visible",
					children: i.children
				}, l);
				return c = Kr(c, l, s, null), c.flags |= 2, u.return = t, c.return = t, u.sibling = c, t.child = u, ix(t, e.child, null, s), c = t.child, c.memoizedState = Zs(s), c.childLanes = Qs(e, r, s), t.memoizedState = CS, Bs(null, c);
			}
			if (Fa(t), ai(), s & 536870912 && vu(t), np(a)) {
				if (r = a.nextSibling && a.nextSibling.dataset, r) {
					c = r.dgst;
					var d = r.msg;
					l = r.stck, u = r.cstck;
				}
				return a = d, o = c, i = l, r = u, c = o, l = a, u = i, i = r, c !== Cb && (r = Error(l || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), r.stack = u || "", r.digest = c, c = i === void 0 ? null : i, l = {
					value: r,
					source: null,
					stack: c
				}, typeof c == "string" && Gv.set(r, l), pi(l)), nc(e, t, s);
			}
			if (mS || bi(e, t, s, !1), r = (s & e.childLanes) !== 0, mS || r) {
				if (mx.current !== null) return nc(e, t, s);
				if (r = pC, r !== null && (c = nt(r, s), c !== 0 && c !== o.retryLane)) throw o.retryLane = c, Nr(e, c), au(r, e, c), pS;
				return R(a) || yu(), nc(e, t, s);
			}
			return R(a) ? (t.flags |= 192, t.child = e.child, null) : (e = o.treeContext, ny = ip(a.nextSibling), ty = t, K = !0, ay = null, ry = !1, iy = null, oy = !1, e !== null && ni(t, e), t = ec(t, i.children), t.flags |= 134221824, t);
		}
		function ic(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), vi(e.return, t, n);
		}
		function ac(e) {
			for (var t = null; e !== null;) {
				var n = e.alternate;
				n !== null && Ha(n) === null && (t = e), e = e.sibling;
			}
			return t;
		}
		function oc(e, t, n, r, i, a) {
			var o = e.memoizedState;
			o === null ? e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: i,
				treeForkCount: a
			} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
		}
		function sc(e) {
			var t = e.child;
			for (e.child = null; t !== null;) {
				var n = t.sibling;
				t.sibling = e.child, e.child = t, t = n;
			}
		}
		function cc(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = bx.current;
			if (t.flags & 128) return Ba(t, s), null;
			if ((r = (s & yx) !== 0) ? (s = s & vx | yx, t.flags |= 128) : s &= vx, Ba(t, s), s = i ?? "null", i != null && i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !bS[s]) {
				if (bS[s] = !0, typeof i == "string") switch (i.toLowerCase()) {
					case "together":
					case "forwards":
					case "backwards":
					case "independent":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
						break;
					case "forward":
					case "backward":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
						break;
					default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
				}
				else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			s = a ?? "null", xS[s] || a == null || (a !== "visible" && a !== "collapsed" && a !== "hidden" ? (xS[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i != null && i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (xS[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" (default) or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i == null || i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) {
				if (Km(o)) {
					for (s = 0; s < o.length; s++) if (!ba(o[s], s)) break a;
				} else if (s = me(o), typeof s == "function") {
					if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
						if (!ba(c.value, l)) break a;
						l++;
					}
				} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			}
			if (i === "backwards" && e !== null ? (sc(e), Fs(e, t, o, n), sc(e)) : Fs(e, t, o, n), K ? (ri(), o = Yv) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && ic(e, n, t);
				else if (e.tag === 19) ic(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			switch (i) {
				case "backwards":
					n = ac(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, sc(t)), oc(t, !0, i, null, a, o);
					break;
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && Ha(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					oc(t, !0, n, null, a, o);
					break;
				case "together":
					oc(t, !1, null, null, void 0, o);
					break;
				case "independent":
					t.memoizedState = null;
					break;
				default: n = ac(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), oc(t, !1, i, n, a, o);
			}
			return t.child;
		}
		function lc(e, t, n) {
			var r = t.type, i = t.pendingProps, a = i.value;
			return "value" in i || wS || (wS = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), gi(t, r, a), Fs(e, t, i.children, n), t.child;
		}
		function uc(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), Dy = -1, jC |= t.lanes, (n & t.childLanes) === 0) {
				if (e !== null) {
					if (bi(e, t, n, !1), (n & t.childLanes) === 0) return null;
				} else return null;
			}
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Hr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Hr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function dc(e, t) {
			return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && xi(e)));
		}
		function fc(e, t, n) {
			switch (t.tag) {
				case 3:
					xe(t, t.stateNode.containerInfo), gi(t, _y, e.memoizedState.cache), di();
					break;
				case 27:
				case 5:
					we(t);
					break;
				case 4:
					xe(t, t.stateNode.containerInfo);
					break;
				case 10:
					gi(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, Ia(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) {
						if (r.dehydrated !== null) return Fa(t), t.flags |= 128, null;
						r = bi(e, t, n, !1);
						var i = t.child.childLanes;
						return r || (n & i) !== 0 ? $s(e, t, n) : (Fa(t), e = uc(e, t, n), e === null ? null : e.sibling);
					}
					Fa(t);
					break;
				case 19:
					if (t.flags & 128) return cc(e, t, n);
					if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (bi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return cc(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ba(t, bx.current), r) break;
					return null;
				case 22: return t.lanes = 0, zs(e, t, n, t.pendingProps);
				case 24: gi(t, _y, e.memoizedState.cache);
			}
			return uc(e, t, n);
		}
		function pc(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Wr(Ir(t.elementType), t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 134217730, n;
			}
			if (e !== null) {
				if (e.memoizedProps !== t.pendingProps || t.type !== e.type) mS = !0;
				else {
					if (!dc(e, n) && !(t.flags & 128)) return mS = !1, fc(e, t, n);
					mS = !!(e.flags & 131072);
				}
			} else mS = !1, (r = K) && (ri(), r = !!(t.flags & 1048576)), r && (r = t.index, ri(), Qr(t, Yv, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = aa(t.elementType), e = Ir(e), t.type = e, typeof e == "function") Vr(e) ? (r = Ts(e, r), t.tag = 1, t = Js(null, t, e, r, n)) : (t.tag = 0, Xs(t, e), t = Ks(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Pm) {
								t.tag = 11, t = Is(null, t, e, r, n);
								break a;
							}
							if (i === Lm) {
								t.tag = 14, t = Ls(null, t, e, r, n);
								break a;
							}
							if (i === Nm) {
								t.tag = 10, t.type = e, t = lc(null, t, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Rm && (t = " Did you wrap a component in React.lazy() more than once?"), n = he(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return Ks(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = Ts(r, t.pendingProps), Js(e, t, r, i, n);
				case 3:
					a: {
						if (xe(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, Sa(e, t), Oa(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, gi(t, _y, r), r !== a.cache && yi(t, [_y], n, !0), Da(), r = o.element, a.isDehydrated) {
							if (a = {
								element: r,
								isDehydrated: !1,
								cache: o.cache
							}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
								t = Ys(e, t, r, n);
								break a;
							}
							if (r !== i) {
								i = Xr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), pi(i), t = Ys(e, t, r, n);
								break a;
							}
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (ny = ip(e.firstChild), ty = t, K = !0, ay = null, ry = !1, iy = null, oy = !0, n = ax(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
						} else {
							if (di(), r === i) {
								t = uc(e, t, n);
								break a;
							}
							Fs(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return Gs(e, t), e === null ? (n = bp(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : K || (t.stateNode = Xd(t.type, t.pendingProps, be($m.current), t)) : t.memoizedState = bp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return we(t), e === null && K && (r = be($m.current), i = Ce(), r = t.stateNode = mp(t.type, t.pendingProps, r, i, !1), ry || (i = Ud(r, t.type, t.pendingProps, i), i !== null && (ii(t, 0).serverProps = i)), ty = t, oy = !0, i = ny, uf(t.type) ? (FT = i, ny = ip(r.firstChild)) : ny = i), Fs(e, t, t.pendingProps.children, n), Gs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && K && (a = Ce(), r = un(t.type, a.ancestorInfo), i = ny, (o = !i) || (o = $f(i, t.type, t.pendingProps, oy), o === null ? a = !1 : (t.stateNode = o, ry || (a = Ud(o, t.type, t.pendingProps, a), a !== null && (ii(t, 0).serverProps = a)), ty = t, ny = ip(o.firstChild), oy = !1, a = !0), o = !a), o && (r && oi(t, i), si(t))), we(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Qd(i, a) ? r = null : o !== null && Qd(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = qa(e, t, Xa, null, null, n), $T._currentValue = i), Gs(e, t), Fs(e, t, r, n), t.child;
				case 6: return e === null && K && (n = t.pendingProps, e = Ce(), r = e.ancestorInfo.current, n = r == null || dn(n, r.tag, e.ancestorInfo.implicitRootScope), e = ny, (r = !e) || (r = ep(e, t.pendingProps, oy), r === null ? r = !1 : (t.stateNode = r, ty = t, ny = null, r = !0), r = !r), r && (n && oi(t, e), si(t))), null;
				case 13: return $s(e, t, n);
				case 4: return xe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ix(t, null, r, n) : Fs(e, t, r, n), t.child;
				case 11: return Is(e, t, t.type, t.pendingProps, n);
				case 7: return r = t.pendingProps, Gs(e, t), Fs(e, t, r, n), t.child;
				case 8: return Fs(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, Fs(e, t, t.pendingProps.children, n), t.child;
				case 10: return lc(e, t, n);
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Si(t), i = Ci(i), r = Tb(r, i, void 0), t.flags |= 1, Fs(e, t, r, n), t.child;
				case 14: return Ls(e, t, t.type, t.pendingProps, n);
				case 15: return Rs(e, t, t.type, t.pendingProps, n);
				case 19: return cc(e, t, n);
				case 31: return Ws(e, t, n);
				case 22: return zs(e, t, n, t.pendingProps);
				case 24: return Si(t), r = Ci(_y), e === null ? (i = $i(), i === null && (i = pC, a = Ei(), i.pooledCache = a, Di(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, xa(t), gi(t, _y, i)) : ((e.lanes & n) !== 0 && (Sa(e, t), Oa(t, null, null, n), Da()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, gi(t, _y, r), r !== i.cache && yi(t, [_y], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), gi(t, _y, r))), Fs(e, t, t.pendingProps.children, n), t.child;
				case 30: return t.stateNode === null && (t.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : K && $r(t), r.className !== void 0 && (i = typeof r.className == "string" ? JSON.stringify(r.className) : "{...}", SS[i] || (SS[i] = !0, console.error("<ViewTransition> doesn't accept a \"className\" prop. It has been renamed to \"default\".\n-   <ViewTransition className=%s>\n+   <ViewTransition default=%s>", i, i))), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Gs(e, t), Fs(e, t, r.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function mc(e) {
			e.flags |= 4;
		}
		function hc(e, t, n, r, i) {
			var a;
			if ((a = (e.mode & Uv) !== W) && (a = n === null ? Fp(t, r) : Fp(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
				if (e.flags |= 16777216, (i & 335544128) === i) {
					if (e.stateNode.complete) e.flags |= 8192;
					else if (hu()) e.flags |= 8192;
					else throw Yb = Gb, Ub;
				}
			} else e.flags &= -16777217;
		}
		function gc(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & BT) !== IT) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Ip(t)) {
				if (hu()) e.flags |= 8192;
				else throw Yb = Gb, Ub;
			}
		}
		function _c(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Xe(), e.lanes |= t, FC |= t);
		}
		function vc(e, t) {
			if (!K) switch (e.tailMode) {
				case "visible": break;
				case "collapsed":
					for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
					r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
					break;
				default:
					for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
					n === null ? e.tail = null : n.sibling = null;
			}
		}
		function yc(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) {
				if ((e.mode & G) !== W) {
					for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 1206910976, r |= a.flags & 1206910976, i += a.treeBaseDuration, a = a.sibling;
					e.treeBaseDuration = i;
				} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
			} else if ((e.mode & G) !== W) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function bc(e, t, n) {
			var r = t.pendingProps;
			switch (ei(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return yc(t), null;
				case 1: return yc(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), _i(_y, t), Se(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ui(t) ? (mi(), mc(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, fi())), yc(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (mc(t), a === null ? (yc(t), hc(t, i, null, r, n)) : (yc(t), gc(t, a))) : a ? a === e.memoizedState ? (yc(t), t.flags &= -16777217) : (mc(t), yc(t), gc(t, a)) : (e = e.memoizedProps, e !== r && mc(t), yc(t), hc(t, i, e, r, n)), null;
				case 27:
					if (Te(t), n = be($m.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && mc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return yc(t), t.subtreeFlags &= -33554433, null;
						}
						e = Ce(), ui(t) ? ci(t, e) : (e = mp(i, r, n, e, !0), t.stateNode = e, mc(t));
					}
					return yc(t), t.subtreeFlags &= -33554433, null;
				case 5:
					if (Te(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && mc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return yc(t), t.subtreeFlags &= -33554433, null;
						}
						var o = Ce();
						if (ui(t)) ci(t, o);
						else {
							switch (a = be($m.current), un(i, o.ancestorInfo), o = o.context, a = qd(a), o) {
								case vT:
									a = a.createElementNS(Ig, i);
									break;
								case yT:
									a = a.createElementNS(Fg, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Ig, i);
										break;
									case "math":
										a = a.createElementNS(Fg, i);
										break;
									case "script":
										a = a.createElement("div"), ST || Zd(r) || (console.error("Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client. Consider using template tag instead (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)."), ST = !0), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || hh.call(CT, i) || (CT[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Wh] = t, a[Gh] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Nd(a, i, r), i) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
							r && mc(t);
						}
					}
					return yc(t), t.subtreeFlags &= -33554433, hc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && mc(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = be($m.current), n = Ce(), ui(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !ry, r = null, a = ty, a !== null) switch (a.tag) {
								case 3:
									i && (i = op(e, n, r), i !== null && (ii(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = op(e, n, r), i !== null && (ii(t, 0).serverProps = i));
							}
							e[Wh] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || si(t, !0);
						} else i = n.ancestorInfo.current, i != null && dn(r, i.tag, n.ancestorInfo.implicitRootScope), e = qd(e).createTextNode(r), e[Wh] = t, t.stateNode = e;
					}
					return yc(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = ui(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Wh] = t, yc(t), (t.mode & G) !== W && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else mi(), di(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, yc(t), (t.mode & G) !== W && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = fi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (za(t), t) : (za(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return yc(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = ui(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Wh] = t, yc(t), (t.mode & G) !== W && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else mi(), di(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, yc(t), (t.mode & G) !== W && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = fi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (za(t), t) : (za(t), null);
					}
					return za(t), t.flags & 128 ? (t.lanes = n, (t.mode & G) !== W && Yi(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), _c(t, t.updateQueue), yc(t), (t.mode & G) !== W && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return Se(t), e === null && gd(t.stateNode.containerInfo), t.flags |= 67108864, yc(t), null;
				case 10: return _i(t.type, t), yc(t), null;
				case 19:
					if (Va(t), r = t.memoizedState, r === null) return yc(t), null;
					if (i = !!(t.flags & 128), a = r.rendering, a === null) {
						if (i) vc(r, !1);
						else {
							if (AC !== aC || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
								if (a = Ha(e), a !== null) {
									for (t.flags |= 128, vc(r, !1), e = a.updateQueue, t.updateQueue = e, _c(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Ur(n, e), n = n.sibling;
									return Ba(t, bx.current & vx | yx), K && Zr(t, r.treeForkCount), t.child;
								}
								e = e.sibling;
							}
							r.tail !== null && bh() > HC && (t.flags |= 128, i = !0, vc(r, !1), t.lanes = 4194304);
						}
					} else {
						if (!i) {
							if (e = Ha(a), e !== null) {
								if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, _c(t, e), vc(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !a.alternate && !K) return yc(t), null;
							} else 2 * bh() - r.renderingStartTime > HC && n !== 536870912 && (t.flags |= 128, i = !0, vc(r, !1), t.lanes = 4194304);
						}
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					if (r.tail !== null) {
						e = r.tail;
						a: {
							for (n = e; n !== null;) {
								if (n.alternate !== null) {
									n = !1;
									break a;
								}
								n = n.sibling;
							}
							n = !0;
						}
						return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = bh(), e.sibling = null, a = bx.current, a = i ? a & vx | yx : a & vx, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || K ? Ba(t, a) : (n = a, ye(gx, t, t), ye(bx, n, t), _x === null && (_x = t)), K && Zr(t, r.treeForkCount), e;
					}
					return yc(t), null;
				case 22:
				case 23: return za(t), Pa(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (yc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yc(t), n = t.updateQueue, n !== null && _c(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ve(fb, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), _i(_y, t), yc(t), null;
				case 25: return null;
				case 30: return t.flags |= 33554432, yc(t), null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function xc(e, t) {
			switch (ei(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Yi(t), t) : null;
				case 3: return _i(_y, t), Se(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return Te(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (za(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						di();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Yi(t), t) : null;
				case 13:
					if (za(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						di();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Yi(t), t) : null;
				case 19: return Va(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
				case 4: return Se(t), null;
				case 10: return _i(t.type, t), null;
				case 22:
				case 23: return za(t), Pa(t), e !== null && ve(fb, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Yi(t), t) : null;
				case 24: return _i(_y, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Sc(e, t) {
			switch (ei(t), t.tag) {
				case 3:
					_i(_y, t), Se(t);
					break;
				case 26:
				case 27:
				case 5:
					Te(t);
					break;
				case 4:
					Se(t);
					break;
				case 31:
					t.memoizedState !== null && za(t);
					break;
				case 13:
					za(t);
					break;
				case 19:
					Va(t);
					break;
				case 10:
					_i(t.type, t);
					break;
				case 22:
				case 23:
					za(t), Pa(t), e !== null && ve(fb, t);
					break;
				case 24: _i(_y, t);
			}
		}
		function Cc(e) {
			return (e.mode & G) !== W;
		}
		function wc(e, t) {
			Cc(e) ? (Ji(), Ec(t, e), Ki()) : Ec(t, e);
		}
		function Tc(e, t, n) {
			Cc(e) ? (Ji(), Dc(n, e, t), Ki()) : Dc(n, e, t);
		}
		function Ec(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & Cx) !== xx && (Tw = !0), r = D(t, Lb, n), (e & Cx) !== xx && (Tw = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & wx) === 0 ? (n.tag & Cx) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, D(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Wu(t, t.return, e);
			}
		}
		function Dc(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & Cx) !== xx && (Tw = !0), i = t, D(i, zb, i, n, s), (e & Cx) !== xx && (Tw = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Wu(t, t.return, e);
			}
		}
		function Oc(e, t) {
			Cc(e) ? (Ji(), Ec(t, e), Ki()) : Ec(t, e);
		}
		function kc(e, t, n) {
			Cc(e) ? (Ji(), Dc(n, e, t), Ki()) : Dc(n, e, t);
		}
		function Ac(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || yS || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
				try {
					D(e, ja, t, n);
				} catch (t) {
					Wu(e, e.return, t);
				}
			}
		}
		function jc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function Mc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || yS || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
			try {
				var i = Ts(e.type, n), a = D(e, jc, t, i, r);
				n = TS, a !== void 0 || n.has(e.type) || (n.add(e.type), D(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", w(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Wu(e, e.return, t);
			}
		}
		function Nc(e, t, n) {
			n.props = Ts(e.type, e.memoizedProps), n.state = e.memoizedState, Cc(e) ? (Ji(), D(e, Fb, e, t, n), Ki()) : D(e, Fb, e, t, n);
		}
		function Pc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						var r = lr(e.memoizedProps, n);
						(n.ref === null || n.ref.name !== r) && (n.ref = Mf(r)), n = n.ref;
						break;
					case 7:
						e.stateNode === null && (n = new Nf(e), S(e, Jf, n), e.stateNode = n), n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") {
					if (Cc(e)) try {
						Ji(), e.refCleanup = t(n);
					} finally {
						Ki();
					}
					else e.refCleanup = t(n);
				} else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", w(e)), t.current = n;
			}
		}
		function Fc(e, t) {
			try {
				D(e, Pc, e);
			} catch (n) {
				Wu(e, t, n);
			}
		}
		function Ic(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) {
				if (typeof r == "function") try {
					if (Cc(e)) try {
						Ji(), D(e, r);
					} finally {
						Ki(e);
					}
					else D(e, r);
				} catch (n) {
					Wu(e, t, n);
				} finally {
					e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
				}
				else if (typeof n == "function") try {
					if (Cc(e)) try {
						Ji(), D(e, n, null);
					} finally {
						Ki(e);
					}
					else D(e, n, null);
				} catch (n) {
					Wu(e, t, n);
				}
				else n.current = null;
			}
		}
		function Lc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", ab && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function Rc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", ab && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function zc(e, t) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) Xf(e.stateNode, t[n]);
		}
		function Bc(e) {
			for (var t = e.return; t !== null && (Uc(t) && Xf(e.stateNode, t.stateNode), !Hc(t));) t = t.return;
		}
		function Vc(e) {
			for (var t = e.return; t !== null && (Uc(t) && Zf(e.stateNode, t.stateNode), !Hc(t));) t = t.return;
		}
		function Hc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 27;
		}
		function Uc(e) {
			return e && e.tag === 7 && e.stateNode !== null;
		}
		function Wc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				D(e, rf, r, t, n, e);
			} catch (t) {
				Wu(e, e.return, t);
			}
		}
		function Gc(e, t, n) {
			try {
				D(e, of, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Wu(e, e.return, t);
			}
		}
		function Kc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && uf(e.type) || e.tag === 4;
		}
		function qc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || Kc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && uf(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function Jc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? (lf(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t)) : (lf(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), i = n._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Cn)), zc(e, r), og = !0;
			else if (i !== 4 && (i === 27 && (zc(e, r), r = null, uf(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Jc(e, t, n, r), e = e.sibling; e !== null;) Jc(e, t, n, r), e = e.sibling;
		}
		function Yc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), zc(e, r), og = !0;
			else if (i !== 4 && (i === 27 && (zc(e, r), r = null, uf(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Yc(e, t, n, r), e = e.sibling; e !== null;) Yc(e, t, n, r), e = e.sibling;
		}
		function Xc(e) {
			for (var t, n = e.return; n !== null;) {
				if (Kc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			n = null;
			for (var r = e.return; r !== null;) {
				if (Uc(r)) {
					var i = r.stateNode;
					n === null ? n = [i] : n.push(i);
				}
				if (Hc(r)) break;
				r = r.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, r = qc(e), Yc(e, r, t, n);
					break;
				case 5:
					r = t.stateNode, t.flags & 32 && (sf(r), t.flags &= -33), t = qc(e), Yc(e, t, r, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, r = qc(e), Jc(e, r, t, n);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function Zc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				D(e, hp, e.type, n, t, e);
			} catch (t) {
				Wu(e, e.return, t);
			}
		}
		function Qc(e) {
			(e.tag === 30 || e.subtreeFlags & 33554432) && (ES = !0);
		}
		function $c() {
			var e = OS;
			return OS = null, e;
		}
		function el(e, t, n, r, i) {
			return kS = 0, (t = tl(e.child, t, n, r, i)) && e._debugTask != null && nb === null && (nb = e._debugTask), t;
		}
		function tl(e, t, n, r, i) {
			for (var a = !1; e !== null;) {
				if (e.tag === 5) {
					var o = e.stateNode;
					if (r !== null) {
						var s = Tf(o);
						r.push(s), s.view && (a = !0);
					} else a || Tf(o).view && (a = !0);
					ES = !0, Sf(o, kS === 0 ? t : t + "_" + kS, n), kS++;
				} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || tl(e.child, t, n, r, i) && (a = !0);
				e = e.sibling;
			}
			return a;
		}
		function nl(e, t) {
			for (; e !== null;) e.tag === 5 ? Cf(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || nl(e.child, t), e = e.sibling;
		}
		function rl(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if ((e.tag !== 22 || e.memoizedState === null) && (rl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
					var t = e.memoizedProps;
					if (t.name == null || t.name === "auto") throw Error("Found a pair with an auto name. This is a bug in React.");
					var n = t.name;
					t = dr(t.default, t.share), t !== "none" && (el(e, n, t, null, !1) || nl(e.child, !1));
				}
				e = e.sibling;
			}
		}
		function il(e, t) {
			if (e.tag === 30) {
				var n = e.stateNode, r = e.memoizedProps, i = lr(r, n), a = dr(r.default, n.paired ? r.share : r.enter);
				a === "none" ? rl(e) : el(e, i, a, null, !1) ? (rl(e), n.paired || t || iu(e, r.onEnter)) : nl(e.child, !1);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) il(e, t), e = e.sibling;
			else rl(e);
		}
		function al(e) {
			if (DS !== null && DS.size !== 0) {
				var t = DS;
				if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
					if (e.tag !== 22 || e.memoizedState === null) {
						if (e.tag === 30 && e.flags & 18874368) {
							var n = e.memoizedProps, r = n.name;
							if (r != null && r !== "auto") {
								var i = t.get(r);
								if (i !== void 0) {
									var a = dr(n.default, n.share);
									if (a !== "none" && (el(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, iu(e, n.onShare)) : nl(e.child, !1)), t.delete(r), t.size === 0) break;
								}
							}
						}
						al(e);
					}
					e = e.sibling;
				}
			}
		}
		function ol(e) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = lr(t, e.stateNode), r = DS === null ? void 0 : DS.get(n), i = dr(t.default, r === void 0 ? t.exit : t.share);
				i !== "none" && (el(e, n, i, null, !1) ? r === void 0 ? iu(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, DS.delete(n), iu(e, t.onShare)) : nl(e.child, !1)), DS !== null && al(e);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) ol(e), e = e.sibling;
			else DS !== null && al(e);
		}
		function sl(e) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var t = e.memoizedProps, n = lr(t, e.stateNode);
					t = dr(t.default, t.update), e.flags &= -5, t !== "none" && el(e, n, t, e.memoizedState = [], !1);
				} else e.subtreeFlags & 33554432 && sl(e);
				e = e.sibling;
			}
		}
		function cl(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var t = e.stateNode;
						t.paired !== null && (t.paired = null, nl(e.child, !1));
					}
					cl(e);
				}
				e = e.sibling;
			}
		}
		function ll(e) {
			if (e.tag === 30) e.stateNode.paired = null, nl(e.child, !1), cl(e);
			else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) ll(e), e = e.sibling;
			else cl(e);
		}
		function ul(e) {
			for (e = e.child; e !== null;) e.tag === 30 ? nl(e.child, !1) : e.subtreeFlags & 33554432 && ul(e), e = e.sibling;
		}
		function dl(e, t, n, r, i, a, o) {
			for (var s = !1; t !== null;) {
				if (t.tag === 5) {
					var c = t.stateNode;
					if (a !== null && kS < a.length) {
						var l = a[kS], u = Tf(c);
						(l.view || u.view) && (s = !0);
						var d;
						if (d = !(e.flags & 4)) {
							if (u.clip) d = !0;
							else {
								d = l.rect;
								var f = u.rect;
								d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
							}
						}
						d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
					} else e.flags |= 32;
					e.flags & 4 && Sf(c, kS === 0 ? n : n + "_" + kS, i), s && e.flags & 4 || (OS === null && (OS = []), OS.push(c, kS === 0 ? r : r + "_" + kS, t.memoizedProps)), kS++;
				} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : dl(e, t.child, n, r, i, a, o) && (s = !0));
				t = t.sibling;
			}
			return s;
		}
		function fl(e, t) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var n = e.memoizedProps, r = e.stateNode, i = lr(n, r), a = dr(n.default, n.update);
					if (t) {
						r = r.clones;
						var o = r === null ? null : r.map(Ef);
					} else o = e.memoizedState, e.memoizedState = null;
					r = e;
					var s = e.child, c = i;
					kS = 0, a = dl(r, s, c, i, a, o, !1), e.flags & 4 && a && (t || iu(e, n.onUpdate));
				} else e.subtreeFlags & 33554432 && fl(e, t);
				e = e.sibling;
			}
		}
		function pl(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				if (n !== void 0) {
					if (n !== e && n !== e.alternate && !jS[t]) {
						jS[t] = !0;
						var r = JSON.stringify(t);
						D(e, function() {
							console.error("There are two <ViewTransition name=%s> components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.", r);
						}), D(n, function() {
							console.error("The existing <ViewTransition name=%s> duplicate has this stack trace.", r);
						});
					}
				} else AS.set(t, e);
			}
		}
		function ml(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				n === void 0 || n !== e && n !== e.alternate || AS.delete(t);
			}
		}
		function hl(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && !(t.flags & 256);
		}
		function gl(e, t, n) {
			if (e = e.containerInfo, bT = gE, e = rr(e), ir(e)) {
				if ("selectionStart" in e) var r = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					r = (r = e.ownerDocument) && r.defaultView || window;
					var i = r.getSelection && r.getSelection();
					if (i && i.rangeCount !== 0) {
						r = i.anchorNode;
						var a = i.anchorOffset, o = i.focusNode;
						i = i.focusOffset;
						try {
							r.nodeType, o.nodeType;
						} catch {
							r = null;
							break a;
						}
						var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
						b: for (;;) {
							for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
							for (;;) {
								if (f === e) break b;
								if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
								f = p, p = f.parentNode;
							}
							f = m;
						}
						r = c === -1 || l === -1 ? null : {
							start: c,
							end: l
						};
					} else r = null;
				}
				r ||= {
					start: 0,
					end: 0
				};
			} else r = null;
			for (xT = {
				focusedElem: e,
				selectionRange: r
			}, gE = !1, n = (n & 335544064) === n, BS = t, t = n ? 9270 : 1024; BS !== null;) {
				if (e = BS, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && ol(r[a]);
				if (e.alternate === null && e.flags & 2) n && Qc(e), _l(n);
				else {
					if (e.tag === 22) {
						if (r = e.alternate, e.memoizedState !== null) {
							r !== null && r.memoizedState === null && n && ol(r), _l(n);
							continue;
						}
						if (r !== null && r.memoizedState !== null) {
							n && Qc(e), _l(n);
							continue;
						}
					}
					r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, BS = r) : (n && sl(e), _l(n));
				}
			}
			DS = null;
		}
		function _l(e) {
			for (; BS !== null;) {
				var t = BS, n = t, r = e, i = n.alternate, a = n.flags;
				switch (n.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						a & 1024 && i !== null && Mc(n, i);
						break;
					case 3:
						if (a & 1024) {
							if (r = n.stateNode.containerInfo, n = r.nodeType, n === 9) Qf(r);
							else if (n === 1) switch (r.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									Qf(r);
									break;
								default: r.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					case 30:
						r && i !== null && (r = i, i = n, n = lr(r.memoizedProps, r.stateNode), i = i.memoizedProps, i = dr(i.default, i.update), i !== "none" && el(r, n, i, r.memoizedState = [], !0));
						break;
					default: if (a & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (r = t.sibling, r !== null) {
					r.return = t.return, BS = r;
					break;
				}
				BS = t.return;
			}
		}
		function vl(e, t, n) {
			var r = Li(), i = zi(), a = Vi(), o = Hi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Pl(e, n), s & 4 && wc(n, wx | Sx);
					break;
				case 1:
					if (Pl(e, n), s & 4) {
						if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Cc(n) ? (Ji(), D(n, kb, n, e), Ki()) : D(n, kb, n, e);
						else {
							var c = Ts(n.type, t.memoizedProps);
							t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Cc(n) ? (Ji(), D(n, jb, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Ki()) : D(n, jb, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
						}
					}
					s & 64 && Ac(n), s & 512 && Fc(n, n.return);
					break;
				case 3:
					if (t = Ni(), Pl(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							D(n, ja, s, c);
						} catch (e) {
							Wu(n, n.return, e);
						}
					}
					e.effectDuration += Pi(t);
					break;
				case 27: t === null && s & 4 && Zc(n);
				case 26:
				case 5:
					if (Pl(e, n), t === null) {
						if (s & 4) Wc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								D(n, af, c, e, t, n);
							} catch (e) {
								Wu(n, n.return, e);
							}
						}
					}
					s & 512 && Fc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = Ni(), Pl(e, n), e = n.stateNode, e.effectDuration += Fi(s);
						try {
							D(n, Lc, n, t, wy, e.effectDuration);
						} catch (e) {
							Wu(n, n.return, e);
						}
					} else Pl(e, n);
					break;
				case 31:
					Pl(e, n), s & 4 && Tl(e, n);
					break;
				case 13:
					Pl(e, n), s & 4 && El(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Ju.bind(null, n), rp(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || FS, !s) {
						var l = t !== null && t.memoizedState !== null || IS;
						t = FS, c = IS, FS = s, (IS = l) && !c ? (s = PS, n.subtreeFlags & 8772 && (s |= NS), Rl(e, n, s), (n.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && yr(n, q, J)) : Pl(e, n), FS = t, IS = c;
					}
					break;
				case 30:
					s & 18874368 && pl(n), Pl(e, n), s & 512 && Fc(n, n.return);
					break;
				case 7: s & 512 && Fc(n, n.return);
				default: Pl(e, n);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && ((jy || .05 < ky) && Sr(n, q, J, ky, Ay), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (hl(n.return.alternate, n.return) || vr(n, q, J, "Mount"))), Ri(r), Bi(i), Ay = a, jy = o;
		}
		function yl(e, t) {
			for (e = e.child; e !== null;) bl(e, t), e = e.sibling;
		}
		function bl(e, t) {
			switch (e.tag) {
				case 5:
				case 26:
					try {
						var n = e.stateNode;
						t ? D(e, gf, n) : D(e, yf, e.stateNode, e.memoizedProps);
					} catch (t) {
						Wu(e, e.return, t);
					}
					xl(e, t);
					break;
				case 6:
					try {
						var r = e.stateNode;
						t ? D(e, _f, r) : D(e, bf, r, e.memoizedProps), og = !0;
					} catch (t) {
						Wu(e, e.return, t);
					}
					break;
				case 18:
					try {
						var i = e.stateNode;
						t ? D(e, hf, i) : D(e, vf, e.stateNode);
					} catch (t) {
						Wu(e, e.return, t);
					}
					break;
				case 22:
				case 23:
					e.memoizedState === null && yl(e, t);
					break;
				default: yl(e, t);
			}
		}
		function xl(e, t) {
			if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
				a: {
					var n = e, r = t;
					switch (n.tag) {
						case 4:
							bl(n, r);
							break a;
						case 22:
							n.memoizedState === null && xl(n, r);
							break a;
						default: xl(n, r);
					}
				}
				e = e.sibling;
			}
		}
		function Sl(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, Sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && lt(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function Cl(e, t, n) {
			for (n = n.child; n !== null;) wl(e, t, n), n = n.sibling;
		}
		function wl(e, t, n) {
			if (Ah && typeof Ah.onCommitFiberUnmount == "function") try {
				Ah.onCommitFiberUnmount(kh, n);
			} catch (e) {
				jh || (jh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = Li(), i = zi(), a = Vi(), o = Hi();
			switch (n.tag) {
				case 26:
					IS || Ic(n, t), Cl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !IS && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					IS || Ic(n, t), Vc(n);
					var s = qS, c = JS;
					uf(n.type) && (qS = n.stateNode, JS = !1), Cl(e, t, n), D(n, gp, n.stateNode, n.type, n.memoizedProps), qS = s, JS = c;
					break;
				case 5: IS || Ic(n, t), Vc(n);
				case 6:
					if (n.tag === 6 && Vc(n), s = qS, c = JS, qS = null, Cl(e, t, n), qS = s, JS = c, qS !== null) {
						if (JS) try {
							D(n, ff, qS, n.stateNode), og = !0;
						} catch (e) {
							Wu(n, t, e);
						}
						else try {
							D(n, df, qS, n.stateNode), og = !0;
						} catch (e) {
							Wu(n, t, e);
						}
					}
					break;
				case 18:
					qS !== null && (JS ? (e = qS, pf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), gm(e)) : pf(qS, n.stateNode));
					break;
				case 4:
					s = qS, c = JS, qS = n.stateNode.containerInfo, JS = !0, Cl(e, t, n), qS = s, JS = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Dc(Cx, n, t), IS || Tc(n, t, wx), Cl(e, t, n);
					break;
				case 1:
					IS || (Ic(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && Nc(n, t, s)), Cl(e, t, n);
					break;
				case 21:
					Cl(e, t, n);
					break;
				case 22:
					IS = (s = IS) || n.memoizedState !== null, Cl(e, t, n), IS = s;
					break;
				case 30:
					n.flags & 18874368 && ml(n), Ic(n, t), Cl(e, t, n);
					break;
				case 7:
					IS || Ic(n, t), Cl(e, t, n);
					break;
				default: Cl(e, t, n);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(n, q, J, ky, Ay), Ri(r), Bi(i), Ay = a, jy = o;
		}
		function Tl(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					D(t, up, e);
				} catch (e) {
					Wu(t, t.return, e);
				}
			}
		}
		function El(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				D(t, dp, e);
			} catch (e) {
				Wu(t, t.return, e);
			}
		}
		function Dl(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new zS()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new zS()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Ol(e, t) {
			var n = Dl(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Mh) {
						if (VS !== null && HS !== null) ed(HS, VS);
						else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					}
					var r = Yu.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function N(e, t, n) {
			var r = t.deletions;
			if (r !== null) for (var i = 0; i < r.length; i++) {
				var a = e, o = t, s = r[i], c = Li(), l = o;
				a: for (; l !== null;) {
					switch (l.tag) {
						case 27:
							if (uf(l.type)) {
								qS = l.stateNode, JS = !1;
								break a;
							}
							break;
						case 5:
							qS = l.stateNode, JS = !1;
							break a;
						case 3:
						case 4:
							qS = l.stateNode.containerInfo, JS = !0;
							break a;
					}
					l = l.return;
				}
				if (qS === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				wl(a, o, s), qS = null, JS = !1, (s.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && vr(s, q, J, "Unmount"), Ri(c), a = s, o = a.alternate, o !== null && (o.return = null), a.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) kl(t, e, n), t = t.sibling;
		}
		function kl(e, t, n) {
			var r = Li(), i = zi(), a = Vi(), o = Hi(), s = e.alternate, c = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					if (c & 4 && (s = e.updateQueue, s = s === null ? null : s.events, s !== null)) for (var l = 0; l < s.length; l++) {
						var u = s[l];
						u.ref.impl = u.nextImpl;
					}
					N(t, e, n), Al(e), c & 4 && (Dc(Cx | Sx, e, e.return), Ec(Cx | Sx, e), Tc(e, e.return, wx | Sx));
					break;
				case 1:
					N(t, e, n), Al(e), c & 512 && (IS || s === null || Ic(s, s.return)), c & 64 && FS && (t = e.updateQueue, t !== null && (n = t.callbacks, n !== null && (c = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = c === null ? n : c.concat(n))));
					break;
				case 26:
					if (l = YS, N(t, e, n), Al(e), c & 512 && (IS || s === null || Ic(s, s.return)), c & 4) {
						if (c = s === null ? null : s.memoizedState, n = e.memoizedState, s === null) {
							if (n === null) {
								if (e.stateNode === null) {
									if (FS) e.stateNode = Xd(e.type, e.memoizedProps, t.containerInfo, e);
									else {
										a: {
											t = e.type, n = e.memoizedProps, c = l.ownerDocument || l;
											b: switch (t) {
												case "title":
													s = c.getElementsByTagName("title")[0], (!s || s[Zh] || s[Wh] || s.namespaceURI === Ig || s.hasAttribute("itemprop")) && (s = c.createElement(t), c.head.insertBefore(s, c.querySelector("head > title"))), Nd(s, t, n), s[Wh] = e, mt(s), t = s;
													break a;
												case "link":
													if (l = Mp("link", "href", c).get(t + (n.href || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), Nd(s, t, n), c.head.appendChild(s);
													break;
												case "meta":
													if (l = Mp("meta", "content", c).get(t + (n.content || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], ze(n.content, "content"), s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), Nd(s, t, n), c.head.appendChild(s);
													break;
												default: throw Error("getNodesForType encountered a type it did not expect: \"" + t + "\". This is a bug in React.");
											}
											s[Wh] = e, mt(s), t = s;
										}
										e.stateNode = t;
									}
								} else FS || Np(l, e.type, e.stateNode);
							} else e.stateNode = Op(l, n, e.memoizedProps);
						} else c === n ? n === null && e.stateNode !== null && Gc(e, e.memoizedProps, s.memoizedProps) : (c === null ? (t = s.stateNode, t === null || IS || t.parentNode.removeChild(t)) : c.count--, n === null ? FS || Np(l, e.type, e.stateNode) : Op(l, n, e.memoizedProps));
					}
					break;
				case 27:
					N(t, e, n), Al(e), c & 512 && (IS || s === null || Ic(s, s.return)), s !== null && c & 4 && Gc(e, e.memoizedProps, s.memoizedProps);
					break;
				case 5:
					if (l = LS, LS = !1, N(t, e, n), LS = l, Al(e), c & 512 && (IS || s === null || Ic(s, s.return)), e.flags & 32) {
						t = e.stateNode;
						try {
							D(e, sf, t), og = !0;
						} catch (t) {
							Wu(e, e.return, t);
						}
					}
					c & 4 && e.stateNode != null && (t = e.memoizedProps, Gc(e, t, s === null ? t : s.memoizedProps)), c & 1024 && (RS = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (N(t, e, n), Al(e), c & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						t = e.memoizedProps, n = s === null ? t : s.memoizedProps, c = e.stateNode;
						try {
							D(e, cf, c, n, t), og = !0;
						} catch (t) {
							Wu(e, e.return, t);
						}
					}
					break;
				case 3:
					if (l = Ni(), og = !1, GT = null, u = YS, YS = vp(t.containerInfo), N(t, e, n), YS = u, Al(e), c & 4 && s !== null && s.memoizedState.isDehydrated) try {
						D(e, lp, t.containerInfo);
					} catch (t) {
						Wu(e, e.return, t);
					}
					RS && (RS = !1, jl(e)), t.effectDuration += Pi(l), og = !1;
					break;
				case 4:
					c = LS, LS = FS, s = bt(), l = YS, YS = vp(e.stateNode.containerInfo), N(t, e, n), Al(e), YS = l, og && WS && (GS = !0), og = s, LS = c;
					break;
				case 12:
					c = Ni(), N(t, e, n), Al(e), e.stateNode.effectDuration += Fi(c);
					break;
				case 31:
					N(t, e, n), Al(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ol(e, t)));
					break;
				case 13:
					N(t, e, n), Al(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (zC = bh()), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ol(e, t)));
					break;
				case 22:
					l = e.memoizedState !== null, u = s !== null && s.memoizedState !== null;
					var d = FS, f = IS, p = LS;
					FS = d || l, LS = p || l, IS = f || u, N(t, e, n), IS = f, LS = p, FS = d, u && !l && !d && !f && (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && yr(e, q, J), Al(e), c & 8192 && (t = e.stateNode, t._visibility = l ? t._visibility & ~Mv : t._visibility | Mv, !l || s === null || u || FS || IS || (t = PS, n = u || IS, s = FS, u = IS, FS = l || FS, IS = n, Il(e, t), (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && vr(e, q, J, "Disconnect"), FS = s, IS = u), !l && LS || yl(e, l)), c & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Ol(e, n))));
					break;
				case 19:
					N(t, e, n), Al(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ol(e, t)));
					break;
				case 30:
					c & 512 && (IS || s === null || Ic(s, s.return)), c = bt(), l = WS, u = (n & 335544064) === n, d = e.memoizedProps, WS = u && dr(d.default, d.update) !== "none", N(t, e, n), Al(e), u && s !== null && og && (e.flags |= 4), WS = l, og = c;
					break;
				case 21: break;
				case 7: c & 512 && (IS || s === null || Ic(s, s.return)), s && s.stateNode !== null && (s.stateNode._fragmentFiber = e);
				default: N(t, e, n), Al(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && ((jy || .05 < ky) && Sr(e, q, J, ky, Ay), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (hl(e.return.alternate, e.return) || vr(e, q, J, "Mount"))), Ri(r), Bi(i), Ay = a, jy = o;
		}
		function Al(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					D(e, Xc, e);
				} catch (t) {
					Wu(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function jl(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				jl(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gE = !0, t.reset(), gE = !1), e = e.sibling;
			}
		}
		function Ml(e, t) {
			if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Nl(t, e), t = t.sibling;
			else fl(t, !1);
		}
		function Nl(e, t) {
			var n = e.alternate;
			if (n === null) il(e, !1);
			else switch (e.tag) {
				case 3:
					if (KS = US = !1, $c(), Ml(t, e), !US && !GS) {
						if (e = OS, e !== null) for (var r = 0; r < e.length; r += 3) {
							n = e[r];
							var i = e[r + 1];
							Cf(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
								opacity: [0, 0],
								pointerEvents: ["none", "none"]
							}, {
								duration: 0,
								fill: "forwards",
								pseudoElement: "::view-transition-group(" + i + ")"
							});
						}
						e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(root)"
						}), e.animate({
							width: [0, 0],
							height: [0, 0]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition"
						})), KS = !0;
					}
					OS = null;
					break;
				case 5:
					Ml(t, e);
					break;
				case 4:
					r = US, US = !1, Ml(t, e), US && (GS = !0), US = r;
					break;
				case 22:
					e.memoizedState === null && (n.memoizedState === null ? Ml(t, e) : il(e, !1));
					break;
				case 30:
					r = US, i = $c(), US = !1, Ml(t, e), US && (e.flags |= 4);
					var a = e.memoizedProps, o = e.stateNode;
					t = lr(a, o), o = lr(n.memoizedProps, o);
					var s = dr(a.default, a.update);
					s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, kS = 0, t = dl(e, n, t, o, s, a, !0), kS !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (iu(e, e.memoizedProps.onUpdate), OS = i) : i !== null && (i.push.apply(i, OS), OS = i), US = e.flags & 32 ? !0 : r;
					break;
				default: Ml(t, e);
			}
		}
		function Pl(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) vl(e, t.alternate, t), t = t.sibling;
		}
		function Fl(e, t) {
			var n = Li(), r = zi(), i = Vi(), a = Hi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Tc(e, e.return, wx), Il(e, t);
					break;
				case 1:
					Ic(e, e.return);
					var o = e.stateNode;
					typeof o.componentWillUnmount == "function" && Nc(e, e.return, o), Il(e, t);
					break;
				case 27: (t & PS) !== MS && D(e, gp, e.stateNode, e.type, e.memoizedProps);
				case 5:
					Ic(e, e.return), e.tag !== 5 && e.tag !== 27 || Vc(e), Il(e, t);
					break;
				case 6:
					Vc(e);
					break;
				case 26:
					Ic(e, e.return), o = e.stateNode, e.memoizedState !== null || o === null || IS || o.parentNode.removeChild(o), Il(e, t);
					break;
				case 22:
					e.memoizedState === null && Il(e, t);
					break;
				case 30:
					e.flags & 18874368 && ml(e), Ic(e, e.return), Il(e, t);
					break;
				case 7: Ic(e, e.return);
				default: Il(e, t);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(e, q, J, ky, Ay), Ri(n), Bi(r), Ay = i, jy = a;
		}
		function Il(e, t) {
			for (e = e.child; e !== null;) Fl(e, t), e = e.sibling;
		}
		function Ll(e, t, n, r) {
			var i = Li(), a = zi(), o = Vi(), s = Hi(), c = n.flags, l = (r & NS) !== MS;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Rl(e, n, r), wc(n, wx);
					break;
				case 1:
					if (Rl(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && D(n, kb, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							D(n, Aa, t, e);
						} catch (e) {
							Wu(n, n.return, e);
						}
					}
					l && c & 64 && Ac(n), Fc(n, n.return);
					break;
				case 27: (r & PS) !== MS && Zc(n);
				case 5:
					n.tag !== 5 && n.tag !== 27 || Bc(n), Rl(e, n, r), l && t === null && c & 4 && Wc(n), Fc(n, n.return);
					break;
				case 6:
					Bc(n);
					break;
				case 26:
					var u = n.stateNode;
					n.memoizedState !== null || u === null || FS || Np(vp(u.ownerDocument), n.type, u), Rl(e, n, r), l && t === null && c & 4 && Wc(n), Fc(n, n.return);
					break;
				case 12:
					if (l && c & 4) {
						c = Ni(), Rl(e, n, r), l = n.stateNode, l.effectDuration += Fi(c);
						try {
							D(n, Lc, n, t, wy, l.effectDuration);
						} catch (e) {
							Wu(n, n.return, e);
						}
					} else Rl(e, n, r);
					break;
				case 31:
					Rl(e, n, r), l && c & 4 && Tl(e, n);
					break;
				case 13:
					Rl(e, n, r), l && c & 4 && El(e, n);
					break;
				case 22:
					n.memoizedState === null && Rl(e, n, r), Fc(n, n.return);
					break;
				case 30:
					Rl(e, n, r), c & 18874368 && pl(n), Fc(n, n.return);
					break;
				case 7: Fc(n, n.return);
				default: Rl(e, n, r);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(n, q, J, ky, Ay), Ri(i), Bi(a), Ay = o, jy = s;
		}
		function Rl(e, t, n) {
			for (n = t.subtreeFlags & 8772 ? n : n & ~NS, t = t.child; t !== null;) Ll(e, t.alternate, t, n), t = t.sibling;
		}
		function zl(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && Di(e), n != null && Oi(n));
		}
		function Bl(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Di(t), e != null && Oi(e));
		}
		function Vl(e, t, n, r, i) {
			var a = (n & 335544064) === n;
			if (t.subtreeFlags & (a ? 10262 : 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) a = t.sibling, Hl(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			else a && ul(t);
		}
		function Hl(e, t, n, r, i) {
			var a = Li(), o = zi(), s = Vi(), c = Hi(), l = Ev, u = (n & 335544064) === n;
			u && t.alternate === null && t.return !== null && t.return.alternate !== null && ll(t);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & G) !== W && 0 < t.actualStartTime && t.flags & 1 && br(t, t.actualStartTime, i, XS, n), Vl(e, t, n, r, i), d & 2048 && Oc(t, Tx | Sx);
					break;
				case 1:
					(t.mode & G) !== W && 0 < t.actualStartTime && (t.flags & 128 ? xr(t, t.actualStartTime, i, []) : t.flags & 1 && br(t, t.actualStartTime, i, XS, n)), Vl(e, t, n, r, i);
					break;
				case 3:
					var f = Ni(), p = XS;
					XS = t.alternate !== null && t.alternate.memoizedState.isDehydrated && !(t.flags & 256), Vl(e, t, n, r, i), XS = p, u && KS && (n = e.containerInfo, n = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, n.style.viewTransitionName === "root" && (n.style.viewTransitionName = ""), n = n.ownerDocument.documentElement, n !== null && n.style.viewTransitionName === "none" && (n.style.viewTransitionName = "")), d & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (Di(r), n != null && Oi(n))), e.passiveEffectDuration += Pi(f);
					break;
				case 12:
					if (d & 2048) {
						d = Ni(), Vl(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += Fi(d);
						try {
							D(t, Rc, t, t.alternate, wy, e.passiveEffectDuration);
						} catch (e) {
							Wu(t, t.return, e);
						}
					} else Vl(e, t, n, r, i);
					break;
				case 31:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f !== null && u === null ? (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && xr(t, t.actualStartTime, i, f)) : XS = !0) : XS = !1, Vl(e, t, n, r, i), XS = d;
					break;
				case 13:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f === null || f.dehydrated === null || u !== null && u.dehydrated !== null ? XS = !1 : (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && xr(t, t.actualStartTime, i, f)) : XS = !0), Vl(e, t, n, r, i), XS = d;
					break;
				case 23: break;
				case 22:
					p = t.stateNode, f = t.alternate, t.memoizedState === null ? (u && f !== null && f.memoizedState !== null && ll(t), p._visibility & Nv ? Vl(e, t, n, r, i) : (p._visibility |= Nv, Ul(e, t, n, r, !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & G) === W || XS || (e = t.actualStartTime, 0 <= e && .05 < i - e && yr(t, e, i), 0 <= q && 0 <= J && .05 < J - q && yr(t, q, J)))) : (u && f !== null && f.memoizedState === null && ll(f), p._visibility & Nv ? Vl(e, t, n, r, i) : Gl(e, t, n, r, i)), d & 2048 && zl(f, t);
					break;
				case 24:
					Vl(e, t, n, r, i), d & 2048 && Bl(t.alternate, t);
					break;
				case 30:
					u && (d = t.alternate, d !== null && (nl(d.child, !0), nl(t.child, !0))), Vl(e, t, n, r, i);
					break;
				default: Vl(e, t, n, r, i);
			}
			(t.mode & G) !== W && ((e = !XS && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && vr(t, n, i, "Mount")), 0 <= q && 0 <= J && ((jy || .05 < ky) && Sr(t, q, J, ky, Ay), e && .05 < J - q && vr(t, q, J, "Mount"))), Ri(a), Bi(o), Ay = s, jy = c, Ev = l;
		}
		function Ul(e, t, n, r, i, a) {
			for (i &&= !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Wl(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Wl(e, t, n, r, i, a) {
			var o = Li(), s = zi(), c = Vi(), l = Hi(), u = Ev;
			i && (t.mode & G) !== W && 0 < t.actualStartTime && t.flags & 1 && br(t, t.actualStartTime, a, XS, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Ul(e, t, n, r, i, a), Oc(t, Tx);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= Nv, Ul(e, t, n, r, i, a)) : f._visibility & Nv ? Ul(e, t, n, r, i, a) : Gl(e, t, n, r, a), i && d & 2048 && zl(t.alternate, t);
					break;
				case 24:
					Ul(e, t, n, r, i, a), i && d & 2048 && Bl(t.alternate, t);
					break;
				default: Ul(e, t, n, r, i, a);
			}
			(t.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(t, q, J, ky, Ay), Ri(o), Bi(s), Ay = c, jy = l, Ev = u;
		}
		function Gl(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Ev;
				(a.mode & G) !== W && 0 < a.actualStartTime && a.flags & 1 && br(a, a.actualStartTime, l, XS, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Gl(o, a, s, c, l), d & 2048 && zl(a.alternate, a);
						break;
					case 24:
						Gl(o, a, s, c, l), d & 2048 && Bl(a.alternate, a);
						break;
					default: Gl(o, a, s, c, l);
				}
				Ev = u, a = t;
			}
		}
		function Kl(e, t, n) {
			if (e.subtreeFlags & ZS) for (e = e.child; e !== null;) ql(e, t, n), e = e.sibling;
		}
		function ql(e, t, n) {
			switch (e.tag) {
				case 26:
					Kl(e, t, n), e.flags & ZS && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Rp(n, e)) : zp(n, YS, e.memoizedState, e.memoizedProps));
					break;
				case 5:
					Kl(e, t, n), e.flags & ZS && (e = e.stateNode, (t & 335544128) === t && Rp(n, e));
					break;
				case 3:
				case 4:
					var r = YS;
					YS = vp(e.stateNode.containerInfo), Kl(e, t, n), YS = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = ZS, ZS = 16777216, Kl(e, t, n), ZS = r) : Kl(e, t, n));
					break;
				case 30:
					if ((e.flags & ZS) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
						var i = e.stateNode;
						i.paired = null, DS === null && (DS = /* @__PURE__ */ new Map()), DS.set(r, i);
					}
					Kl(e, t, n);
					break;
				default: Kl(e, t, n);
			}
		}
		function Jl(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Yl(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = Li();
					BS = r, $l(r, e), (r.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && vr(r, q, J, "Unmount"), Ri(i);
				}
				Jl(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Xl(e), e = e.sibling;
		}
		function Xl(e) {
			var t = Li(), n = zi(), r = Vi(), i = Hi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Yl(e), e.flags & 2048 && kc(e, e.return, Tx | Sx);
					break;
				case 3:
					var a = Ni();
					Yl(e), e.stateNode.passiveEffectDuration += Pi(a);
					break;
				case 12:
					a = Ni(), Yl(e), e.stateNode.passiveEffectDuration += Fi(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & Nv && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~Nv, Zl(e), (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && vr(e, q, J, "Disconnect")) : Yl(e);
					break;
				default: Yl(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(e, q, J, ky, Ay), Ri(t), Bi(n), jy = i, Ay = r;
		}
		function Zl(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = Li();
					BS = r, $l(r, e), (r.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && vr(r, q, J, "Unmount"), Ri(i);
				}
				Jl(e);
			}
			for (e = e.child; e !== null;) Ql(e), e = e.sibling;
		}
		function Ql(e) {
			var t = Li(), n = zi(), r = Vi(), i = Hi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					kc(e, e.return, Tx), Zl(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & Nv && (a._visibility &= ~Nv, Zl(e));
					break;
				default: Zl(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(e, q, J, ky, Ay), Ri(t), Bi(n), jy = i, Ay = r;
		}
		function $l(e, t) {
			for (; BS !== null;) {
				var n = BS, r = n, i = t, a = Li(), o = zi(), s = Vi(), c = Hi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						kc(r, i, Tx);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && Di(i));
						break;
					case 24: Oi(r.memoizedState.cache);
				}
				if ((r.mode & G) !== W && 0 <= q && 0 <= J && (jy || .05 < ky) && Sr(r, q, J, ky, Ay), Ri(a), Bi(o), jy = c, Ay = s, r = n.child, r !== null) r.return = n, BS = r;
				else a: for (n = e; BS !== null;) {
					if (r = BS, a = r.sibling, o = r.return, Sl(r), r === n) {
						BS = null;
						break a;
					}
					if (a !== null) {
						a.return = o, BS = a;
						break a;
					}
					BS = o;
				}
			}
		}
		function eu() {
			eC.forEach(function(e) {
				return e();
			});
		}
		function tu() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || B.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function nu(e) {
			if ((fC & rC) !== nC && $ !== 0) return $ & -$;
			var t = B.T;
			return t === null ? (e = st(), e === zh && (Kb = null), e) : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), Kb !== null && st() === zh && (Kb = null), fd());
		}
		function ru() {
			if (PC === 0) {
				if (!($ & 536870912) || K) {
					var e = Lh;
					Lh <<= 1, !(Lh & 3932160) && (Lh = 262144), PC = e;
				} else PC = 536870912;
			}
			return e = gx.current, e !== null && (e.flags |= 32), PC;
		}
		function iu(e, t) {
			if (t != null) {
				var n = e.stateNode, r = n.ref;
				r === null && (r = n.ref = Mf(lr(e.memoizedProps, n))), fw === null && (fw = []), fw.push(t.bind(null, r));
			}
		}
		function au(e, t, n) {
			if (Tw && console.error("useInsertionEffect must not schedule updates."), bw && (xw = !0), (e === pC && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) && (pu(e, 0), lu(e, $, PC, !1)), Qe(e, n), (fC & rC) !== nC && e === pC) {
				if (mh) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && w(Q) || "Unknown", kw.has(e) || (kw.add(e), t = w(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: Ow ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Mh && it(e, t, n), nd(t), e === pC && ((fC & rC) === nC && (MC |= n), AC === lC && lu(e, $, PC, !1)), rd(e);
		}
		function ou(e, t, n) {
			if ((fC & (rC | iC)) !== nC) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = bh();
				switch (rb) {
					case _C:
					case gC:
						var a = ib;
						wv && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, Tv, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, Tv, void 0, "primary-light"));
						break;
					case CC:
						a = ib, wv && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, Tv, void 0, "primary-light")) : console.timeStamp("Action", a, i, Tv, void 0, "primary-light"));
						break;
					default: wv && (r = i - ib, 3 > r || console.timeStamp("Blocked", ib, i, Tv, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && !(t & 127) && (t & e.expiredLanes) === 0 || qe(e, t)) ? Su(e, t) : bu(e, t, !0);
			var o = n;
			do {
				if (a === aC) {
					DC && !n && lu(e, t, 0, !1), t = wC, ib = yy(), rb = t;
					break;
				}
				if (r = bh(), i = e.current.alternate, o && !cu(i)) _r(t), i = Cy, a = r, !wv || a <= i || (GC ? GC.run(console.timeStamp.bind(console, "Teared Render", i, a, U, H, "error")) : console.timeStamp("Teared Render", i, a, U, H, "error")), fu(t, r), a = bu(e, t, !1), o = !1;
				else {
					if (a === sC) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							_r(t), Tr(Cy, r, t, GC), fu(t, r), t = s;
							a: {
								r = e, a = o, o = IC;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (pu(r, s).flags |= 256), s = bu(r, s, !1), s !== sC && s !== uC) {
									if (OC && !c) {
										r.errorRecoveryDisabledLanes |= a, MC |= a, a = lC;
										break a;
									}
									r = LC, LC = o, r !== null && (LC === null ? LC = r : LC.push.apply(LC, r));
								}
								a = s;
							}
							if (o = !1, a !== sC) continue;
							r = bh();
						}
					}
					if (a === oC) {
						_r(t), Tr(Cy, r, t, GC), fu(t, r), pu(e, 0), lu(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case aC:
							case oC: throw Error("Root did not complete. This is a bug in React.");
							case lC: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
							case uC:
								_r(t), Cr(Cy, r, t, GC), fu(t, r), i = t, i & 127 ? Vy = r : i & 4194048 && (Qy = r), lu(n, t, PC, !EC);
								break a;
							case sC:
								LC = null;
								break;
							case cC:
							case dC: break;
							default: throw Error("Unknown root exit status.");
						}
						if (B.actQueue !== null) Au(n, i, t, LC, WC, RC, PC, MC, FC, EC, a, null, null, Cy, r);
						else {
							if ((t & 62914560) === t && (o = zC + VC - bh(), 10 < o)) {
								if (lu(n, t, PC, !EC), Ke(n, 0, !0) !== 0) break a;
								ow = t, n.timeoutHandle = ET(su.bind(null, n, i, LC, WC, RC, t, PC, MC, FC, EC, a, "Throttled", Cy, r), o);
								break a;
							}
							su(n, i, LC, WC, RC, t, PC, MC, FC, EC, a, null, Cy, r);
						}
					}
					break;
				}
			} while (1);
			rd(e);
		}
		function su(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = OT;
			var m = t.subtreeFlags, h = (a & 335544064) === a, g = null;
			(h || m & 8192 || (m & 16785408) == 16785408) && (g = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Cn
			}, DS = null, ql(t, a, g), h && (m = g, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = Hp.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? zC - bh() : (a & 4194048) === a ? BC - bh() : 0, m = Bp(g, m), m !== null) ? (ow = a, e.cancelPendingCommit = m(Au.bind(null, e, t, a, n, r, i, o, s, c, l, u, g, g.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < g.count ? 0 < g.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : g.imgCount === 1 ? "Suspended on an Image" : 0 < g.imgCount ? "Suspended on Images" : null, f, p)), lu(e, a, o, !l)) : Au(e, t, a, n, r, i, o, s, c, l, u, g, d, f, p);
		}
		function cu(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!G_(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
				if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
				else {
					if (t === e) break;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) return !0;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
			}
			return !0;
		}
		function lu(e, t, n, r) {
			t = Je(e, t), t &= ~NC, t &= ~MC, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Nh(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && et(e, n, t);
		}
		function uu() {
			return (fC & (rC | iC)) !== nC || (id(0, !1), !1);
		}
		function du() {
			if (Q !== null) {
				if (wC === mC) var e = Q.return;
				else e = Q, hi(), $a(e), Zb = null, Qb = 0, e = Q;
				for (; e !== null;) Sc(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function fu(e, t) {
			e & 127 && (My = t), e & 4194048 && (Hy = t), e & 62914560 && ($y = t), e & 2080374784 && (eb = t);
		}
		function pu(e, t) {
			wv && (console.timeStamp("Blocking Track", .003, .003, "Blocking", H, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", H, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", H, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", H, "primary-light"));
			var n = Cy;
			if (Cy = yy(), $ !== 0 && 0 < n) {
				if (_r($), AC === cC || AC === lC) Cr(n, Cy, t, GC);
				else {
					var r = Cy, i = GC;
					if (wv && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, U, H, a)) : console.timeStamp(o, n, r, U, H, a);
					}
				}
				fu($, Cy);
			}
			if (n = GC, GC = null, t & 127) {
				GC = Py, i = 0 <= Ny && Ny < My ? My : Ny, r = 0 <= Ry && Ry < My ? My : Ry, a = 0 <= r ? r : 0 <= i ? i : Cy, 0 <= Vy ? (_r(2), wr(Vy, a, t, n)) : tb & 127 && (_r(2), kr(My, a, nb)), n = i;
				var s = r, c = zy, l = 0 < By, u = Fy === xy, d = Fy === Sy;
				if (i = Cy, r = Py, a = Iy, o = Ly, wv) {
					if (U = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, U, H, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, U, H, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: U,
							trackGroup: H,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n), performance.clearMeasures(u));
				}
				Ny = -1.1, Fy = 0, Ly = Iy = null, Vy = -1.1, By = Ry, Ry = -1.1, My = yy();
			}
			return t & 4194048 && (GC = Ky, i = 0 <= Uy && Uy < Hy ? Hy : Uy, n = 0 <= Wy && Wy < Hy ? Hy : Wy, r = 0 <= Yy && Yy < Hy ? Hy : Yy, a = 0 <= r ? r : 0 <= n ? n : Cy, 0 <= Qy ? (_r(256), wr(Qy, a, t, GC)) : tb & 4194048 && (_r(256), kr(Hy, a, nb)), d = r, s = Xy, c = 0 < Zy, l = Gy === Sy, a = Cy, r = Ky, o = qy, u = Jy, wv && (U = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, U, H, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, U, H, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, U, H, "primary-dark")) : console.timeStamp("Action", i, n, U, H, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: U,
					trackGroup: H,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n), performance.clearMeasures(i))), Wy = Uy = -1.1, Gy = 0, Qy = -1.1, Zy = Yy, Yy = -1.1, Hy = yy()), t & 62914560 && tb & 62914560 && (_r(4194304), kr($y, Cy, nb)), t & 2080374784 && tb & 2080374784 && (_r(268435456), kr(eb, Cy, nb)), n = e.timeoutHandle, n !== OT && (e.timeoutHandle = OT, DT(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ow = 0, du(), pC = e, Q = n = Hr(e.current, null), $ = t, wC = mC, TC = null, EC = !1, DC = qe(e, t), OC = !1, AC = aC, FC = PC = NC = MC = jC = 0, LC = IC = null, RC = !1, kC = Je(e, t), Ar(), e = fv(), 1e3 < e - uv && (B.recentlyCreatedOwnerStacks = 0, uv = e), pb.discardPendingWarnings(), n;
		}
		function mu(e, t) {
			X = null, B.H = Gx, B.getCurrentStack = null, mh = !1, ph = null, t === Hb || t === Wb ? (t = oa(), wC = _C) : t === Ub ? (t = oa(), wC = vC) : wC = t === pS ? SC : typeof t == "object" && t && typeof t.then == "function" ? bC : hC, TC = t;
			var n = Q;
			n === null ? (AC = oC, ks(e, Xr(t, e.current))) : n.mode & G && Wi(n);
		}
		function hu() {
			var e = gx.current;
			return e === null ? !0 : ($ & 4194048) === $ ? _x === null : ($ & 62914560) === $ || $ & 536870912 ? e === _x : !1;
		}
		function gu() {
			var e = B.H;
			return B.H = Gx, e === null ? Gx : e;
		}
		function _u() {
			var e = B.A;
			return B.A = QS, e;
		}
		function vu(e) {
			GC === null && (GC = e._debugTask == null ? null : e._debugTask);
		}
		function yu() {
			AC = lC, EC || ($ & 4194048) !== $ && gx.current !== null || (DC = !0), !(jC & 134217727) && !(MC & 134217727) || pC === null || lu(pC, $, PC, !1);
		}
		function bu(e, t, n) {
			var r = fC;
			fC |= rC;
			var i = gu(), a = _u();
			if (pC !== e || $ !== t) {
				if (Mh) {
					var o = e.memoizedUpdaters;
					0 < o.size && (ed(e, $), o.clear()), at(e, t);
				}
				WC = null, pu(e, t);
			}
			t = !1, o = AC;
			a: do
				try {
					if (wC !== mC && Q !== null) {
						var s = Q, c = TC;
						switch (wC) {
							case SC:
								du(), o = uC;
								break a;
							case _C:
							case gC:
							case CC:
							case bC:
								gx.current === null && (t = !0);
								var l = wC;
								if (wC = mC, TC = null, Du(e, s, c, l), n && DC) {
									o = aC;
									break a;
								}
								break;
							default: l = wC, wC = mC, TC = null, Du(e, s, c, l);
						}
					}
					xu(), o = AC;
					break;
				} catch (t) {
					mu(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, hi(), fC = r, B.H = i, B.A = a, Q === null && (pC = null, $ = 0, Ar()), o;
		}
		function xu() {
			for (; Q !== null;) wu(Q);
		}
		function Su(e, t) {
			var n = fC;
			fC |= rC;
			var r = gu(), i = _u();
			if (pC !== e || $ !== t) {
				if (Mh) {
					var a = e.memoizedUpdaters;
					0 < a.size && (ed(e, $), a.clear()), at(e, t);
				}
				WC = null, HC = bh() + UC, pu(e, t);
			} else DC = qe(e, t);
			a: do
				try {
					if (wC !== mC && Q !== null) b: switch (t = Q, a = TC, wC) {
						case hC:
							wC = mC, TC = null, Du(e, t, a, hC);
							break;
						case gC:
						case CC:
							if (ra(a)) {
								wC = mC, TC = null, Tu(t);
								break;
							}
							t = function() {
								wC !== gC && wC !== CC || pC !== e || (wC = xC), rd(e);
							}, a.then(t, t);
							break a;
						case _C:
							wC = xC;
							break a;
						case vC:
							wC = yC;
							break a;
						case xC:
							ra(a) ? (wC = mC, TC = null, Tu(t)) : (wC = mC, TC = null, Du(e, t, a, xC));
							break;
						case yC:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Ip(o) : s.stateNode.complete) {
										wC = mC, TC = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, Ou(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							wC = mC, TC = null, Du(e, t, a, yC);
							break;
						case bC:
							wC = mC, TC = null, Du(e, t, a, bC);
							break;
						case SC:
							du(), AC = uC;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					B.actQueue === null ? Cu() : xu();
					break;
				} catch (t) {
					mu(e, t);
				}
			while (1);
			return hi(), B.H = r, B.A = i, fC = n, Q === null ? (pC = null, $ = 0, Ar(), AC) : aC;
		}
		function Cu() {
			for (; Q !== null && !vh();) wu(Q);
		}
		function wu(e) {
			var t = e.alternate;
			(e.mode & G) === W ? t = D(e, pc, t, e, kC) : (Ui(e), t = D(e, pc, t, e, kC), Wi(e)), e.memoizedProps = e.pendingProps, t === null ? Ou(e) : Q = t;
		}
		function Tu(e) {
			var t = D(e, Eu, e);
			e.memoizedProps = e.pendingProps, t === null ? Ou(e) : Q = t;
		}
		function Eu(e) {
			var t = e.alternate, n = (e.mode & G) !== W;
			switch (n && Ui(e), e.tag) {
				case 15:
				case 0:
					t = qs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = qs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5:
					$a(e);
					var r = e;
					r === ty && (K ? (li(r), r.tag === 5 && r.stateNode != null && (ny = r.stateNode)) : (li(r), K = !0));
				default: Sc(t, e), e = Q = Ur(e, kC), t = pc(t, e, kC);
			}
			return n && Wi(e), t;
		}
		function Du(e, t, n, r) {
			hi(), $a(t), Zb = null, Qb = 0;
			var i = t.return;
			try {
				if (Ps(e, i, t, n, $)) {
					AC = oC, ks(e, Xr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				AC = oC, ks(e, Xr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (K || r === hC ? e = !0 : DC || $ & 536870912 ? e = !1 : (EC = e = !0, (r === gC || r === CC || r === _C || r === bC) && (r = gx.current, r !== null && r.tag === 13 && (r.flags |= 16384))), ku(t, e)) : Ou(t);
		}
		function Ou(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					ku(t, EC);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Ui(t), n = D(t, bc, n, t, kC), (t.mode & G) !== W && Gi(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			AC === aC && (AC = dC);
		}
		function ku(e, t) {
			do {
				var n = xc(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & G) !== W) {
					Gi(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			AC = uC, Q = null;
		}
		function Au(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
			e.cancelPendingCommit = null;
			do
				Vu();
			while (rw !== ZC);
			if (pb.flushLegacyContextWarning(), pb.flushPendingUnsafeLifecycleWarnings(), (fC & (rC | iC)) !== nC) throw Error("Should not already be working.");
			if (_r(n), u === sC) Tr(p, m, n, GC);
			else if (r !== null) {
				if (l = t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && !!(t.flags & 256), a = GC, wv && !(m <= p)) {
					u = [];
					for (var h = 0; h < r.length; h++) {
						var g = r[h].value;
						u.push(["Recoverable Error", typeof g == "object" && g && typeof g.message == "string" ? String(g.message) : String(g)]);
					}
					p = {
						start: p,
						end: m,
						detail: { devtools: {
							color: "primary-dark",
							track: U,
							trackGroup: H,
							tooltipText: l ? "Hydration Failed" : "Recovered after Error",
							properties: u
						} }
					}, a ? a.run(performance.measure.bind(performance, "Recovered", p)) : performance.measure("Recovered", p), performance.clearMeasures("Recovered");
				}
			} else a = GC, !wv || m <= p || (l = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", u = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", a ? a.run(console.timeStamp.bind(console, u, p, m, U, H, l)) : console.timeStamp(u, p, m, U, H, l));
			if (t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				e === pC && (Q = pC = null, $ = 0), aw = t, iw = e, ow = n, lw = i, uw = r, cw = m, mw = f, hw = qC, gw = null, ju(e, t, n, o, s, c, d, f, m);
			}
		}
		function ju(e, t, n, r, i, a, o, s, c) {
			var l = t.lanes | t.childLanes;
			if (sw = l, l |= Iv, $e(e, n, l, r, i, a), fw = null, (n & 335544064) === n ? (pw = Ai(e), r = 10262) : (pw = null, r = 10256), t.actualDuration !== 0 || (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, td(wh, function() {
				return TT = window.event, hw === qC && (hw = YC), Hu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), Ey = null, wy = yy(), s !== null && Er(c, wy, s, GC), ES = !1, s = !!(t.flags & 13878), t.subtreeFlags & 13878 || s) {
				s = B.T, B.T = null, c = V.p, V.p = zh, r = fC, fC |= iC;
				try {
					gl(e, t, n);
				} finally {
					fC = r, V.p = c, B.T = s;
				}
			}
			rw = QC, ES ? (tb |= n, nb = null, dw = Af(o, e.containerInfo, pw, Iu, Lu, Fu, Ru, Hu, Mu, Nu, Pu.bind(null, n))) : (Iu(), Lu(), Ru());
		}
		function Mu(e) {
			if (rw !== ZC) {
				var t = iw.onRecoverableError;
				t(e, zu(null));
			}
		}
		function Nu(e) {
			Ty = yy(), Or(mw === null ? cw : wy, Ty, Ey, hw === JC, GC), mw = gw = e;
		}
		function Pu(e) {
			if ((tb & e) !== 0) {
				var t = nb;
				tb &= ~e, nb = null, e & 4194048 && !($ & 4194048) && !(ow & 4194048) && (_r(256), kr(Hy, bh(), t)), e & 62914560 && !($ & 62914560) && !(ow & 62914560) && (_r(4194304), kr($y, bh(), t)), e & 2080374784 && !($ & 2080374784) && !(ow & 2080374784) && (_r(268435456), kr(eb, bh(), t));
			}
		}
		function Fu() {
			rw === ew && (rw = ZC, Nl(aw, iw), rw = tw);
		}
		function Iu() {
			if (rw === QC) {
				rw = ZC;
				var e = iw, t = aw, n = ow, r = !!(t.flags & 13878);
				if (t.subtreeFlags & 13878 || r) {
					r = B.T, B.T = null;
					var i = V.p;
					V.p = zh;
					var a = fC;
					fC |= iC;
					try {
						VS = n, HS = e, WS = GS = !1, Ii(), kl(t, e, n), HS = VS = null, n = xT;
						var o = rr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && nr(s.ownerDocument.documentElement, s)) {
							if (c !== null && ir(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = tr(s, h), v = tr(s, g);
										if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
											var y = d.createRange();
											y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
										}
									}
								}
							}
							for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
								element: p,
								left: p.scrollLeft,
								top: p.scrollTop
							});
							for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
								var b = d[s];
								b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
							}
						}
						gE = !!bT, xT = bT = null;
					} finally {
						fC = a, V.p = i, B.T = r;
					}
				}
				e.current = t, rw = $C;
			}
		}
		function Lu() {
			if (rw === $C) {
				rw = ZC;
				var e = gw;
				if (e !== null) {
					wy = yy();
					var t = Ty, n = wy;
					!wv || n <= t || (nb ? nb.run(console.timeStamp.bind(console, e, t, n, U, H, "secondary-light")) : console.timeStamp(e, t, n, U, H, "secondary-light"));
				}
				e = iw, t = aw, n = ow;
				var r = !!(t.flags & 8772);
				if (t.subtreeFlags & 8772 || r) {
					r = B.T, B.T = null;
					var i = V.p;
					V.p = zh;
					var a = fC;
					fC |= iC;
					try {
						VS = n, HS = e, Ii(), vl(e, t.alternate, t), HS = VS = null;
					} finally {
						fC = a, V.p = i, B.T = r;
					}
				}
				e = cw, t = mw, Ty = yy(), Or(t === null ? e : wy, Ty, Ey, hw === JC, GC), rw = ew;
			}
		}
		function Ru() {
			if (rw === tw || rw === ew) {
				if (rw === tw) {
					var e = Ty;
					Ty = yy();
					var t = Ty, n = hw === JC;
					!wv || t <= e || (nb ? nb.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, U, H, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, U, H, n ? " error" : "secondary-light")), hw !== JC && (hw = XC);
				}
				rw = ZC, e = dw, dw = null, yh(), t = iw;
				var r = aw;
				n = ow;
				var i = uw, a = (n & 335544064) === n ? 10262 : 10256;
				(a = r.actualDuration !== 0 || (r.subtreeFlags & a) !== 0 || (r.flags & a) !== 0) ? rw = nw : (rw = ZC, aw = iw = null, Bu(t, t.pendingLanes), Cw = 0, ww = null);
				var o = t.pendingLanes;
				if (o === 0 && (KC = null), a || Qu(t), o = ot(n), r = r.stateNode, Ah && typeof Ah.onCommitFiberRoot == "function") try {
					var s = (r.current.flags & 128) == 128;
					switch (o) {
						case zh:
							var c = Sh;
							break;
						case Bh:
							c = Ch;
							break;
						case Vh:
							c = wh;
							break;
						case Hh:
							c = Eh;
							break;
						default: c = wh;
					}
					Ah.onCommitFiberRoot(kh, r, c, s);
				} catch (e) {
					jh || (jh = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Mh && t.memoizedUpdaters.clear(), eu(), i !== null) {
					s = B.T, c = V.p, V.p = zh, B.T = null;
					try {
						var l = t.onRecoverableError;
						for (r = 0; r < i.length; r++) {
							var u = i[r], d = zu(u.stack);
							D(u.source, l, u.value, d);
						}
					} finally {
						B.T = s, V.p = c;
					}
				}
				if (l = fw, u = pw, pw = null, l !== null && (fw = null, u === null && (u = []), e !== null)) for (d = 0; d < l.length; d++) i = (0, l[d])(u), i !== void 0 && e.finished.finally(i);
				ow & 3 && Vu(), rd(t), o = t.pendingLanes, n & 261930 && o & 42 ? (ob = !0, t === yw ? vw++ : (vw = 0, yw = t)) : (vw = 0, yw = null), a || fu(n, Ty), id(0, !1);
			}
		}
		function zu(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Bu(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Oi(t)));
		}
		function Vu() {
			return dw !== null && (dw.skipTransition(), Ew || (Ew = !0, console.warn("A flushSync update cancelled a View Transition because it was called while the View Transition was still preparing. To preserve the synchronous semantics, React had to skip the View Transition. If you can, try to avoid flushSync() in a scenario that's likely to interfere.")), dw = null, hw = JC), Iu(), Lu(), Ru(), Hu();
		}
		function Hu() {
			if (rw !== nw) return !1;
			var e = iw, t = sw;
			sw = 0;
			var n = ot(ow), r = Vh === 0 || Vh > n ? Vh : n;
			n = B.T;
			var i = V.p;
			try {
				V.p = r, B.T = null;
				var a = lw;
				lw = null, r = iw;
				var o = ow;
				if (rw = ZC, aw = iw = null, ow = 0, (fC & (rC | iC)) !== nC) throw Error("Cannot flush passive effects while already rendering.");
				_r(o), bw = !0, xw = !1;
				var s = 0;
				if (Ey = null, s = bh(), hw === XC) kr(Ty, s, nb);
				else {
					var c = Ty, l = s, u = hw === YC;
					!wv || l <= c || (GC ? GC.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, U, H, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, U, H, "secondary-light"));
				}
				c = fC, fC |= iC;
				var d = r.current;
				Ii(), Xl(d);
				var f = r.current;
				d = cw, Ii(), Hl(r, f, o, a, d), Qu(r), fC = c;
				var p = bh();
				if (f = s, d = GC, Ey === null ? !wv || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, U, H, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, U, H, "secondary-dark")) : Dr(f, p, Ey, !0, d), fu(o, p), id(0, !1), xw ? r === ww ? Cw++ : (Cw = 0, ww = r) : Cw = 0, xw = bw = !1, Ah && typeof Ah.onPostCommitFiberRoot == "function") try {
					Ah.onPostCommitFiberRoot(kh, r);
				} catch (e) {
					jh || (jh = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				V.p = i, B.T = n, Bu(e, t);
			}
		}
		function Uu(e, t, n) {
			t = Xr(n, t), qi(t), t = js(e.stateNode, t, 2), e = wa(e, t, 2), e !== null && (Qe(e, 2), rd(e));
		}
		function Wu(e, t, n) {
			if (Tw = !1, e.tag === 3) Uu(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Uu(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (KC === null || !KC.has(r))) {
							e = Xr(n, e), qi(e), n = Ms(2), r = wa(t, n, 2), r !== null && (Ns(n, r, t, e), Qe(r, 2), rd(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Gu(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new tC();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (OC = !0, i.add(n), r = Ku.bind(null, e, t, n), Mh && ed(e, n), t.then(r, r));
		}
		function Ku(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > Ny && (My = Ny = yy(), Py = by("Promise Resolved"), Fy = Sy) : n & 4194048 && 0 > Wy && (Hy = Wy = yy(), Ky = by("Promise Resolved"), Gy = Sy), tu() && B.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), pC === e && ($ & n) === n && ((AC === lC || AC === cC && ($ & 62914560) === $ && bh() - zC < VC) && (fC & rC) === nC ? pu(e, 0) : NC |= n, FC === $ && (FC = 0)), rd(e);
		}
		function qu(e, t) {
			t === 0 && (t = Xe()), e = Nr(e, t), e !== null && (Qe(e, t), rd(e));
		}
		function Ju(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), qu(e, n);
		}
		function Yu(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), qu(e, n);
		}
		function Xu(e, t, n) {
			if (t.subtreeFlags & 134225920) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Am;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 134225920 ? D(i, Zu, r, i) : i.subtreeFlags & 134217728 && D(i, Xu, r, i, a)) : i.flags & 134217728 ? a && D(i, Zu, r, i) : Xu(r, i, a), t = t.sibling;
			}
		}
		function Zu(e, t) {
			Ue(!0);
			try {
				Fl(t, MS), Ql(t), Ll(e, t.alternate, t, MS), Wl(e, t, 0, null, !1, 0);
			} finally {
				Ue(!1);
			}
		}
		function Qu(e) {
			var t = !0;
			e.current.mode & (Vv | Hv) || (t = !1), Xu(e, e.current, t);
		}
		function $u(e) {
			if ((fC & rC) === nC) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = w(e) || "ReactComponent", Dw !== null) {
						if (Dw.has(t)) return;
						Dw.add(t);
					} else Dw = /* @__PURE__ */ new Set([t]);
					D(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function ed(e, t) {
			Mh && e.memoizedUpdaters.forEach(function(n) {
				it(e, n, t);
			});
		}
		function td(e, t) {
			var n = B.actQueue;
			return n === null ? gh(e, t) : (n.push(t), Aw);
		}
		function nd(e) {
			tu() && B.actQueue === null && D(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", w(e));
			});
		}
		function rd(e) {
			e !== Mw && e.next === null && (Mw === null ? jw = Mw = e : Mw = Mw.next = e), Fw = !0, B.actQueue === null ? Nw || (Nw = !0, dd()) : Pw || (Pw = !0, dd());
		}
		function id(e, t) {
			if (!Iw && Fw) {
				Iw = !0;
				do
					for (var n = !1, r = jw; r !== null;) {
						if (!t) {
							if (e !== 0) {
								var i = r.pendingLanes;
								if (i === 0) var a = 0;
								else {
									var o = r.suspendedLanes, s = r.pingedLanes;
									a = (1 << 31 - Nh(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
								}
								a !== 0 && (n = !0, ld(r, a));
							} else a = $, a = Ke(r, r === pC ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== OT), !(a & 3) || qe(r, a) || (n = !0, ld(r, a));
						}
						r = r.next;
					}
				while (n);
				Iw = !1;
			}
		}
		function ad() {
			TT = window.event, od();
		}
		function od() {
			Fw = Pw = Nw = !1;
			var e = 0;
			Lw !== 0 && $d() && (e = Lw);
			for (var t = bh(), n = null, r = jw; r !== null;) {
				var i = r.next, a = sd(r, t);
				a === 0 ? (r.next = null, n === null ? jw = i : n.next = i, i === null && (Mw = n)) : (n = r, (e !== 0 || a & 3) && (Fw = !0)), r = i;
			}
			rw !== ZC && rw !== nw || id(e, !1), Lw !== 0 && (Lw = 0);
		}
		function sd(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Nh(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ye(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = pC, n = $, n = Ke(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r = e.callbackNode, n === 0 || e === t && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) return r !== null && ud(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || qe(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || B.actQueue !== null && r !== Rw) ud(r);
				else return t;
				switch (ot(n)) {
					case zh:
					case Bh:
						n = Ch;
						break;
					case Vh:
						n = wh;
						break;
					case Hh:
						n = Eh;
						break;
					default: n = wh;
				}
				return r = cd.bind(null, e), B.actQueue === null ? n = gh(n, r) : (B.actQueue.push(r), n = Rw), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && ud(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function cd(e, t) {
			if (ob = ab = !1, TT = window.event, rw !== ZC && rw !== nw) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (hw === qC && (hw = YC), Vu() && e.callbackNode !== n) return null;
			var r = $;
			return r = Ke(e, e === pC ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r === 0 ? null : (ou(e, r, t), sd(e, bh()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
		}
		function ld(e, t) {
			if (Vu()) return null;
			ab = ob, ob = !1, ou(e, t, !0);
		}
		function ud(e) {
			e !== Rw && e !== null && _h(e);
		}
		function dd() {
			B.actQueue !== null && B.actQueue.push(function() {
				return od(), null;
			}), jT(function() {
				(fC & (rC | iC)) === nC ? od() : gh(Sh, ad);
			});
		}
		function fd() {
			if (Lw === 0) {
				var e = lb;
				e === 0 && (e = Ih, Ih <<= 1, !(Ih & 261888) && (Ih = 256)), Lw = e;
			}
			return Lw;
		}
		function pd(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (ze(e, "action"), Sn(e));
		}
		function P(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = pd((i[Gh] || null).action), o = r.submitter;
				o && (t = (t = o[Gh] || null) ? pd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new s_("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (Lw !== 0) {
									var e = new FormData(i, o), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), is(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), is(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function F(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				mv(e);
			}
			e.currentTarget = null;
		}
		function md(e, t) {
			t = !!(t & 4);
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? F(a, s, l) : D(c, F, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? F(a, s, l) : D(c, F, a, s, l), i = c;
					}
				}
			}
		}
		function I(e, t) {
			Bw.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[qh];
			n === void 0 && (n = t[qh] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (_d(t, e, 2, !1), n.add(r));
		}
		function hd(e, t, n) {
			Bw.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), _d(n, e, r, t);
		}
		function gd(e) {
			if (!e[Vw]) {
				e[Vw] = !0, $h.forEach(function(t) {
					t !== "selectionchange" && (Bw.has(t) || hd(t, !1, e), hd(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[Vw] || (t[Vw] = !0, hd("selectionchange", !1, t));
			}
		}
		function _d(e, t, n, r) {
			switch (om(t)) {
				case zh:
					var i = tm;
					break;
				case Bh:
					i = nm;
					break;
				default: i = rm;
			}
			n = i.bind(null, t, n, e), i = void 0, !t_ || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function vd(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = ut(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			En(function() {
				var r = a, i = wn(n), o = [];
				a: {
					var s = sv.get(e);
					if (s !== void 0) {
						var c = s_, l = e;
						switch (e) {
							case "keypress": if (kn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = w_;
								break;
							case "focusin":
								l = "focus", c = g_;
								break;
							case "focusout":
								l = "blur", c = g_;
								break;
							case "beforeblur":
							case "afterblur":
								c = g_;
								break;
							case "click": if (n.button === 2) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								c = m_;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = h_;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = D_;
								break;
							case ev:
							case tv:
							case nv:
								c = __;
								break;
							case ov:
								c = O_;
								break;
							case "scroll":
							case "scrollend":
								c = l_;
								break;
							case "wheel":
								c = k_;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = v_;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = T_;
								break;
							case "submit":
								c = E_;
								break;
							case "toggle":
							case "beforetoggle": c = A_;
						}
						var u = !!(t & 4), d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = Dn(p, f), h != null && u.push(yd(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (c = e === "mouseover" || e === "pointerover", s = e === "mouseout" || e === "pointerout", c && n !== Xg && (l = n.relatedTarget || n.fromElement) && (ut(l) || l[Kh])) break a;
						(s || c) && (l = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, s ? (c = n.relatedTarget || n.toElement, s = r, c = c ? ut(c) : null, c !== null && (d = ee(c), u = c.tag, c !== d || u !== 5 && u !== 27 && u !== 6) && (c = null)) : (s = null, c = r), s !== c && (u = m_, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = T_, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = s == null ? l : ft(s), m = c == null ? l : ft(c), l = new u(h, p + "leave", s, n, i), l.target = d, l.relatedTarget = m, h = null, ut(i) === r && (u = new u(f, p + "enter", c, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, u = s && c ? pe(s, c, xd) : null, s !== null && Sd(o, l, s, u, !1), c !== null && d !== null && Sd(o, d, c, u, !0)));
					}
					a: {
						if (s = r ? ft(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = Wn;
						else if (zn(s)) {
							if (W_) g = Xn;
							else {
								g = Jn;
								var _ = qn;
							}
						} else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && gn(r.elementType) && (g = Wn) : g = Yn;
						if (g &&= g(e, r)) {
							Vn(o, g, n, i);
							break a;
						}
						_ && _(e, s, r);
					}
					switch (_ = r ? ft(r) : window, e) {
						case "focusin":
							(zn(_) || _.contentEditable === "true") && (q_ = _, J_ = r, Y_ = null);
							break;
						case "focusout":
							Y_ = J_ = q_ = null;
							break;
						case "mousedown":
							X_ = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							X_ = !1, ar(o, n, i);
							break;
						case "selectionchange": if (K_) break;
						case "keydown":
						case "keyup": ar(o, n, i);
					}
					var v;
					if (N_) b: {
						switch (e) {
							case "compositionstart":
								var y = "onCompositionStart";
								break b;
							case "compositionend":
								y = "onCompositionEnd";
								break b;
							case "compositionupdate":
								y = "onCompositionUpdate";
								break b;
						}
						y = void 0;
					}
					else B_ ? Fn(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === M_ && (y = "onCompositionStart");
					y && (I_ && n.locale !== "ko" && (B_ || y !== "onCompositionStart" ? y === "onCompositionEnd" && B_ && (v = On()) : (r_ = i, i_ = "value" in r_ ? r_.value : r_.textContent, B_ = !0)), _ = bd(r, y), 0 < _.length && (y = new y_(y, e, null, n, i), o.push({
						event: y,
						listeners: _
					}), v ? y.data = v : (v = In(n), v !== null && (y.data = v)))), (v = F_ ? Ln(e, n) : Rn(e, n)) && (y = bd(r, "onBeforeInput"), 0 < y.length && (_ = new b_("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: _,
						listeners: y
					}), _.data = v)), P(o, e, r, n, i);
				}
				md(o, t);
			});
		}
		function yd(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function bd(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Dn(e, n), i != null && r.unshift(yd(e, i, a)), i = Dn(e, t), i != null && r.push(yd(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function xd(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function Sd(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Dn(n, a), l != null && o.unshift(yd(n, l, c))) : i || (l = Dn(n, a), l != null && o.push(yd(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function Cd(e, t) {
			yn(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Ug || (Ug = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: eg,
				possibleRegistrationNames: tg
			};
			gn(e) || typeof t.is == "string" || xn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function wd(e, t, n, r) {
			t !== n && (n = Ad(n), Ad(t) !== n && (r[e] = t));
		}
		function Td(e) {
			return !!(e.getAttribute("vt-share") || e.getAttribute("vt-exit") || e.getAttribute("vt-enter") || e.getAttribute("vt-update"));
		}
		function Ed(e) {
			if (!Td(e)) return !1;
			var t = e.getAttribute("vt-name");
			return e = e.style["view-transition-name"], t ? t === e : e.startsWith("_T_");
		}
		function Dd(e, t, n) {
			t.forEach(function(t) {
				t === "style" ? e.getAttribute(t) !== "" && (t = e.style, (t.length === 1 && t[0] === "view-transition-name" || t.length === 2 && t[0] === "view-transition-class" && t[1] === "view-transition-name") && Ed(e) || (n.style = Id(e))) : n[Fd(t)] = e.getAttribute(t);
			});
		}
		function Od(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function kd(e, t) {
			return e = e.namespaceURI === Fg || e.namespaceURI === Ig ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function Ad(e) {
			return Le(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Ie(e)), Re(e)), (typeof e == "string" ? e : "" + e).replace(Xw, "\n").replace(Zw, "");
		}
		function jd(e, t) {
			return t = Ad(t), Ad(e) === t;
		}
		function L(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					if (typeof r == "string") dn(r, t, !1), t === "body" || t === "textarea" && r === "" || fn(e, r);
					else if (typeof r == "number" || typeof r == "bigint") dn("" + r, t, !1), t !== "body" && fn(e, "" + r);
					else return;
					break;
				case "className":
					Ct(e, "class", r);
					break;
				case "tabIndex":
					Ct(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Ct(e, n, r);
					break;
				case "style":
					hn(e, r, a);
					return;
				case "data": if (t !== "object") {
					Ct(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					ze(r, n), r = Sn(r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || qw || (qw = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || Kw || (Kw = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || Ww ? t !== "button" || i.type == null || i.type === "submit" || Ww ? typeof r == "function" && (i.name == null || Gw || (Gw = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || qw || (qw = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || Kw || (Kw = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (Ww = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (Ww = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					}
					if (typeof a == "function" && (n === "formAction" ? (t !== "input" && L(e, t, "name", i.name, i, null), L(e, t, "formEncType", i.formEncType, i, null), L(e, t, "formMethod", i.formMethod, i, null), L(e, t, "formTarget", i.formTarget, i, null)) : (L(e, t, "encType", i.encType, i, null), L(e, t, "method", i.method, i, null), L(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					ze(r, n), r = Sn(r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && Od(n, r), e.onclick = Cn);
					return;
				case "onScroll":
					r != null && (typeof r != "function" && Od(n, r), I("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Od(n, r), I("scrollend", e));
					return;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							a?.__html !== n && (e.innerHTML = n);
						}
					}
					break;
				case "multiple":
					e.multiple = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "muted":
					e.muted = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
						e.removeAttribute("xlink:href");
						break;
					}
					ze(r, n), n = Sn(r), e.setAttributeNS(Qw, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (ze(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || Yw[n] || (Yw[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "credentialless":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
					break;
				case "capture":
				case "download":
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (ze(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (ze(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (ze(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					I("beforetoggle", e), I("toggle", e), St(e, "popover", r);
					break;
				case "xlinkActuate":
					wt(e, Qw, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					wt(e, Qw, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					wt(e, Qw, "xlink:role", r);
					break;
				case "xlinkShow":
					wt(e, Qw, "xlink:show", r);
					break;
				case "xlinkTitle":
					wt(e, Qw, "xlink:title", r);
					break;
				case "xlinkType":
					wt(e, Qw, "xlink:type", r);
					break;
				case "xmlBase":
					wt(e, $w, "xml:base", r);
					break;
				case "xmlLang":
					wt(e, $w, "xml:lang", r);
					break;
				case "xmlSpace":
					wt(e, $w, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), St(e, "is", r);
					break;
				case "innerText":
				case "textContent": return;
				case "popoverTarget": Jw || typeof r != "object" || !r || (Jw = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = _n(n), St(e, n, r);
				else {
					eg.hasOwnProperty(n) && r != null && typeof r != "function" && Od(n, r);
					return;
				}
			}
			og = !0;
		}
		function Md(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					hn(e, r, a);
					return;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							a?.__html !== n && (e.innerHTML = n);
						}
					}
					break;
				case "children":
					if (typeof r == "string") fn(e, r);
					else if (typeof r == "number" || typeof r == "bigint") fn(e, "" + r);
					else return;
					break;
				case "onScroll":
					r != null && (typeof r != "function" && Od(n, r), I("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Od(n, r), I("scrollend", e));
					return;
				case "onClick":
					r != null && (typeof r != "function" && Od(n, r), e.onclick = Cn);
					return;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": return;
				case "innerText":
				case "textContent": return;
				default:
					if (eg.hasOwnProperty(n)) r != null && typeof r != "function" && Od(n, r);
					else a: {
						if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), a = n.slice(2, i ? n.length - 7 : void 0), t = e[Gh] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(a, t, i), typeof r == "function")) {
							typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(a, r, i);
							break a;
						}
						og = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : St(e, n, r);
					}
					return;
			}
			og = !0;
		}
		function Nd(e, t, n) {
			switch (Cd(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					I("error", e), I("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: L(e, t, a, o, n, null);
						}
					}
					i && L(e, t, "srcSet", n.srcSet, n, null), r && L(e, t, "src", n.src, n, null);
					return;
				case "input":
					vt("input", n), I("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: L(e, t, r, u, n, null);
						}
					}
					jt(e, n), Nt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in vt("select", n), I("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: L(e, t, i, s, n, null);
					}
					Rt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && Lt(e, !!r, n, !0) : Lt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in vt("textarea", n), I("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: L(e, t, o, s, n, null);
					}
					zt(e, n), Vt(e, r, i, a);
					return;
				case "option":
					for (c in Ft(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: L(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					I("beforetoggle", e), I("toggle", e), I("cancel", e), I("close", e);
					break;
				case "iframe":
				case "object":
					I("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < zw.length; r++) I(zw[r], e);
					break;
				case "image":
					I("error", e), I("load", e);
					break;
				case "details":
					I("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": I("error", e), I("load", e);
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: L(e, t, l, r, n, null);
					}
					return;
				default: if (gn(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Md(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && L(e, t, s, r, n, null));
		}
		function Pd(e, t, n, r) {
			switch (Cd(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || L(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								p !== d && (og = !0), a = p;
								break;
							case "name":
								p !== d && (og = !0), i = p;
								break;
							case "checked":
								p !== d && (og = !0), l = p;
								break;
							case "defaultChecked":
								p !== d && (og = !0), u = p;
								break;
							case "value":
								p !== d && (og = !0), o = p;
								break;
							case "defaultValue":
								p !== d && (og = !0), s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && L(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || Uw || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Uw = !0), !t || r || Hw || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Hw = !0), Mt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || L(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							a !== c && (og = !0), f = a;
							break;
						case "defaultValue":
							a !== c && (og = !0), s = a;
							break;
						case "multiple": a !== c && (og = !0), o = a;
						default: a !== c && L(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? Lt(e, !!t, t ? [] : "", !1) : Lt(e, !!t, r, !0)) : Lt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: L(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							i !== a && (og = !0), f = i;
							break;
						case "defaultValue":
							i !== a && (og = !0), p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && L(e, t, o, i, r, a);
					}
					Bt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: L(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							f !== p && (og = !0), e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: L(e, t, c, f, r, p);
					}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && L(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: L(e, t, l, f, r, p);
					}
					return;
				default: if (gn(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Md(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Md(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && L(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || L(e, t, d, f, r, p);
		}
		function Fd(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Id(e) {
			for (var t = {}, n = e.style, r = 0; r < n.length; r++) {
				var i = n[r];
				i === "view-transition-name" && Ed(e) || (t[i] = n.getPropertyValue(i));
			}
			return t;
		}
		function Ld(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Be(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Pg.has(a) ? (Be(o, a), r += i + a.replace(wg, "-$1").toLowerCase().replace(Tg, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(wg, "-$1").toLowerCase().replace(Tg, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = Ad(r), t = Ad(t), t === r || t[t.length - 1] === ";" && Td(e) || (n.style = Id(e)));
			}
		}
		function Rd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (ze(r, t), e === "" + r) return;
			}
			wd(t, e, r, a);
		}
		function zd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			wd(t, e, r, a);
		}
		function Bd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (ze(r, n), e === "" + r) return;
			}
			wd(t, e, r, a);
		}
		function Vd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (ze(r, t), e === "" + r)) return;
			}
			wd(t, e, r, a);
		}
		function Hd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (ze(r, t), n = Sn("" + r), e === n) return;
			}
			wd(t, e, r, a);
		}
		function Ud(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				case "vt-name":
				case "vt-update":
				case "vt-enter":
				case "vt-exit":
				case "vt-share":
				case "vt-parent-enter":
				case "vt-parent-exit": break;
				default: a.add(o[s].name);
			}
			if (gn(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (eg.hasOwnProperty(c)) typeof l != "function" && Od(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || wd("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = kd(e, l), wd(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Ld(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = xt(e, "class", l), wd("className", o, l, i);
								continue;
							default: r.context === _T && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = xt(e, c, l), wd(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (eg.hasOwnProperty(l)) typeof c != "function" && Od(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || wd("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = kd(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Rd(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Rd(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Ld(e, c, i);
						continue;
					case "multiple":
						a.delete(l), wd(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), wd(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), wd(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), wd(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Hd(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						}
						if (o === tT) {
							a.delete(l.toLowerCase()), wd(l, "function", c, i);
							continue;
						}
						Hd(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Hd(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Bd(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Bd(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Bd(e, l, l, c, a, i);
						continue;
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "credentialless":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
						zd(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (ze(c, o), s === "" + c) break a;
							}
							wd(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (ze(c, o), s === "" + c)) break a;
							}
							wd(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Vd(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Vd(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Rd(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Rd(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Rd(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Rd(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Rd(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Rd(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Rd(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Rd(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Rd(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Rd(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || Yw[l] || (Yw[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), zd(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = _n(l), o = !1, r.context === _T && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Rg.hasOwnProperty(u) && Rg[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, yt(d)) {
							if (u.hasAttribute(d)) u = d.toLowerCase() === "nonce" ? u.nonce : u.getAttribute(d), ze(s, d), s = u === "" + s ? s : u;
							else {
								switch (typeof s) {
									case "function":
									case "symbol": break a;
									case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
								}
								s = s === void 0 ? void 0 : null;
							}
						} else s = void 0;
						o || wd(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && Dd(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Wd(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Gd(e) {
			switch (e) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function Kd() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Gd(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Gd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function qd(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Jd(e) {
			switch (e) {
				case Ig: return vT;
				case Fg: return yT;
				default: return _T;
			}
		}
		function Yd(e, t) {
			if (e === _T) switch (t) {
				case "svg": return vT;
				case "math": return yT;
				default: return _T;
			}
			return e === vT && t === "foreignObject" ? _T : e;
		}
		function Xd(e, t, n, r) {
			return n = qd(n).createElement(e), n[Wh] = r, n[Gh] = t, Nd(n, e, t), mt(n), n;
		}
		function Zd(e) {
			if (e = e.type, typeof e != "string" || e === "" || (e = e.toLowerCase(), e === "module" || e === "importmap" || e === "speculationrules")) return !1;
			switch (e) {
				case "application/ecmascript":
				case "application/javascript":
				case "application/x-ecmascript":
				case "application/x-javascript":
				case "text/ecmascript":
				case "text/javascript":
				case "text/javascript1.0":
				case "text/javascript1.1":
				case "text/javascript1.2":
				case "text/javascript1.3":
				case "text/javascript1.4":
				case "text/javascript1.5":
				case "text/jscript":
				case "text/livescript":
				case "text/x-ecmascript":
				case "text/x-javascript": return !1;
			}
			return !0;
		}
		function Qd(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function $d() {
			var e = window.event;
			return e && e.type === "popstate" ? e !== wT && (wT = e, !0) : (wT = null, !1);
		}
		function ef() {
			var e = window.event;
			return e && e !== TT ? e.type : null;
		}
		function tf() {
			var e = window.event;
			return e && e !== TT ? e.timeStamp : -1.1;
		}
		function nf(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function rf(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function af() {}
		function of(e, t, n, r) {
			Pd(e, t, n, r), e[Gh] = r;
		}
		function sf(e) {
			fn(e, "");
		}
		function cf(e, t, n) {
			e.nodeValue = n;
		}
		function lf(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Gh] || null;
				if (t !== null) {
					var n = dt(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, D(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, D(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function uf(e) {
			return e === "head";
		}
		function df(e, t) {
			e.removeChild(t);
		}
		function ff(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function pf(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) {
					if (n = i.data, n === oT || n === iT) {
						if (r === 0) {
							e.removeChild(i), gm(t);
							return;
						}
						r--;
					} else if (n === aT || n === sT || n === cT || n === lT || n === rT) r++;
					else if (n === uT) _p(e.ownerDocument.documentElement);
					else if (n === fT) {
						n = e.ownerDocument.head, _p(n);
						for (var a = n.firstChild; a;) {
							var o = a.nextSibling, s = a.nodeName;
							a[Zh] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
						}
					} else n === dT && _p(e.ownerDocument.body);
				}
				n = i;
			} while (n);
			gm(t);
		}
		function mf(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
					if (n = r.data, n === oT) {
						if (e === 0) break;
						e--;
					} else n !== aT && n !== sT && n !== cT && n !== lT || e++;
				}
				n = r;
			} while (n);
		}
		function hf(e) {
			mf(e, !0);
		}
		function gf(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function _f(e) {
			e.nodeValue = "";
		}
		function vf(e) {
			mf(e, !1);
		}
		function yf(e, t) {
			t = t[gT], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function bf(e, t) {
			e.nodeValue = t;
		}
		function xf(e) {
			for (var t = e.firstChild; t != null;) {
				if (t.nodeType === 1 && getComputedStyle(t).display === "block") {
					D(dt(t) || dt(e), function(e, t) {
						console.error("You're about to start a <ViewTransition> around a display: inline element <%s>, which itself has a display: block element <%s> inside it. This might trigger a bug in Safari which causes the View Transition to be skipped with a duplicate name error.\nhttps://bugs.webkit.org/show_bug.cgi?id=290923", e.toLocaleLowerCase(), t.toLocaleLowerCase());
					}, e.tagName, t.tagName);
					break;
				}
				if (t.firstChild != null) t = t.firstChild;
				else {
					if (t === e) break;
					for (; t.nextSibling == null && t.parentNode != null && t.parentNode !== e;) t = t.parentNode;
					t = t.nextSibling;
				}
			}
		}
		function Sf(e, t, n) {
			if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
				if (t = e.getClientRects(), t.length === 1) var r = 1;
				else for (var i = r = 0; i < t.length; i++) {
					var a = t[i];
					0 < a.width && 0 < a.height && r++;
				}
				r === 1 ? (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom) : xf(e);
			}
		}
		function Cf(e, t) {
			e = e.style, t = t[gT];
			var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
			e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
		}
		function wf(e, t, n) {
			return n = n.ownerDocument.defaultView, {
				rect: e,
				abs: t.position === "absolute" || t.position === "fixed",
				clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
				view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
			};
		}
		function Tf(e) {
			return wf(e.getBoundingClientRect(), getComputedStyle(e), e);
		}
		function Ef(e) {
			var t = e.getBoundingClientRect();
			t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
			var n = getComputedStyle(e);
			return wf(t, n, e);
		}
		function Df(e, t) {
			if (typeof e == "object" && e) switch (e.name) {
				case "TimeoutError": return Error("A ViewTransition timed out because a Navigation stalled. This can happen if a Navigation is blocked on React itself. Such as if it's resolved inside useEffect. This can be solved by moving the resolution to useLayoutEffect.", { cause: e });
				case "AbortError": return t ? null : Error("A ViewTransition was aborted early. This might be because you have other View Transition libraries on the page and only one can run at a time. To avoid this, use only React's built-in <ViewTransition> to coordinate.", { cause: e });
				case "InvalidStateError": if (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") return null;
			}
			return e;
		}
		function Of(e) {
			return e.documentElement.clientHeight;
		}
		function kf(e) {
			this.addEventListener("load", e), this.addEventListener("error", e);
		}
		function Af(e, t, n, r, i, a, o, s, c, l, u) {
			var d = t.nodeType === 9 ? t : t.ownerDocument;
			try {
				var f = d.startViewTransition({
					update: function() {
						var t = d.defaultView, n = t.navigation && t.navigation.transition, o = d.fonts.status;
						r();
						var s = [];
						if (o === "loaded" && (Of(d), d.fonts.status === "loading" && s.push(d.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, f = 0; f < c.length; f++) {
							var p = c[f];
							if (!p.complete) {
								var m = p.getBoundingClientRect();
								if (0 < m.bottom && 0 < m.right && m.top < t.innerHeight && m.left < t.innerWidth) {
									if (u += Lp(p), u > YT) {
										s.length = o;
										break;
									}
									p = new Promise(kf.bind(p)), s.push(p);
								}
							}
						}
						if (0 < s.length) return l(0 < o ? s.length > o ? "Waiting on Fonts and Images" : "Waiting on Fonts" : "Waiting on Images"), t = Promise.race([Promise.all(s), new Promise(function(e) {
							return setTimeout(e, MT);
						})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
						if (i(), n) return n.finished.then(a, a);
						a();
					},
					types: n
				});
				d.__reactViewTransition = f;
				var p = [];
				return f.ready.then(function() {
					for (var e = d.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
						var n = e[t], r = n.effect, i = r.pseudoElement;
						if (i != null && i.startsWith("::view-transition")) {
							p.push(n), n = r.getKeyframes();
							for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
								var l = n[c], u = l.width;
								if (i === void 0) i = u;
								else if (i !== u) {
									s = !1;
									break;
								}
								if (u = l.height, a === void 0) a = u;
								else if (a !== u) {
									s = !1;
									break;
								}
								delete l.width, delete l.height, l.transform === "none" && delete l.transform;
							}
							s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
						}
					}
					o();
				}, function(e) {
					d.__reactViewTransition === f && (d.__reactViewTransition = null);
					try {
						e = Df(e, !1), e !== null && c(e);
					} finally {
						r(), i(), o(), u();
					}
				}), f.finished.finally(function() {
					for (var e = 0; e < p.length; e++) p[e].cancel();
					d.__reactViewTransition === f && (d.__reactViewTransition = null), u(), s();
				}), f;
			} catch {
				return r(), i(), u(), o(), null;
			}
		}
		function jf(e, t) {
			this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
		}
		function Mf(e) {
			return {
				name: e,
				group: new jf("group", e),
				imagePair: new jf("image-pair", e),
				old: new jf("old", e),
				new: new jf("new", e)
			};
		}
		function Nf(e) {
			this._fragmentFiber = e, this._observers = this._eventListeners = null;
		}
		function Pf(e, t, n, r) {
			return le(e).addEventListener(t, n, r), !1;
		}
		function Ff(e, t, n, r) {
			return le(e).removeEventListener(t, n, r), !1;
		}
		function If(e) {
			return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
				capture: e.capture,
				passive: e.passive
			} : e;
		}
		function Lf(e) {
			return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
		}
		function Rf(e, t, n, r) {
			if (e.length === 0) return -1;
			r = Lf(r);
			for (var i = 0; i < e.length; i++) {
				var a = e[i];
				if (a.type === t && a.listener === n && Lf(a.optionsOrUseCapture) === r) return i;
			}
			return -1;
		}
		function zf(e, t) {
			return e.tag !== 6 && (e = le(e), fp(e, t));
		}
		function Bf(e, t) {
			return t.push(e), !1;
		}
		function Vf(e, t) {
			return e.tag !== 6 && (e = le(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
		}
		function Hf(e, t) {
			return e.tag === 6 || (e = le(e), t.observe(e)), !1;
		}
		function Uf(e, t) {
			return e.tag === 6 || (e = le(e), t.unobserve(e)), !1;
		}
		function Wf(e, t, n) {
			NT.push({
				fragmentInstance: e,
				observer: t,
				instance: n
			}), PT || (PT = !0, pp(function() {
				PT = !1;
				var e = NT;
				NT = [];
				for (var t = 0; t < e.length; t++) {
					var n = e[t];
					n.observer.unobserve(n.instance);
				}
			}));
		}
		function Gf(e, t) {
			if (e.tag === 6) {
				e = e.stateNode;
				var n = e.ownerDocument.createRange();
				n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
			} else e = le(e), t.push.apply(t, e.getClientRects());
			return !1;
		}
		function Kf(e, t, n, r, i) {
			var a = ut(i);
			if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
				if (n = !!a) a: {
					for (; a !== null;) {
						if (a.tag === 7 && (a === t || a.alternate === t)) {
							n = !0;
							break a;
						}
						a = a.return;
					}
					n = !1;
				}
				return n;
			}
			if (e & Node.DOCUMENT_POSITION_CONTAINS) {
				if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
				a: {
					for (a = t, t = ae(t); a !== null;) {
						if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
							a = !0;
							break a;
						}
						a = a.return;
					}
					a = !1;
				}
				return a;
			}
			return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = pe(n, a, fe), t === null ? t = !1 : (C(t, !0, ue, a, n), a = wm, wm = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = pe(r, a, fe), t === null ? t = !1 : (C(t, !0, de, a, r), a = wm, Tm = wm = null, t = a !== null)), t) : !1;
		}
		function qf(e, t) {
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
		}
		function Jf(e, t) {
			return e = le(e), Yf(e, t), !1;
		}
		function Yf(e, t) {
			e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
		}
		function Xf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.addEventListener(i.type, i.attachedListener, If(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				for (var r = 0, i = 0; i < NT.length; i++) {
					var a = NT[i];
					(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (NT[r++] = a);
				}
				NT.length = r, n.observe(e);
			}), Yf(e, t));
		}
		function Zf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.removeEventListener(i.type, i.attachedListener, If(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				typeof n.rootMargin == "string" ? Wf(t, n, e) : n.unobserve(e);
			}), e.reactFragments != null && e.reactFragments.delete(t));
		}
		function Qf(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						Qf(n), lt(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function $f(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) {
					if (t === "input" && e.type === "hidden") {
						ze(i.name, "name");
						var a = i.name == null ? null : "" + i.name;
						if (i.type === "hidden" && e.getAttribute("name") === a) return e;
					} else return e;
				} else if (!e[Zh]) switch (t) {
					case "meta":
						if (!e.hasAttribute("itemprop")) break;
						return e;
					case "link":
						if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
						return e;
					case "style":
						if (e.hasAttribute("data-precedence")) break;
						return e;
					case "script":
						if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
						return e;
					default: return e;
				}
				if (e = ip(e.nextSibling), e === null) break;
			}
			return null;
		}
		function ep(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = ip(e.nextSibling), e === null)) return null;
			return e;
		}
		function tp(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = ip(e.nextSibling), e === null)) return null;
			return e;
		}
		function R(e) {
			return e.data === sT || e.data === cT;
		}
		function np(e) {
			return e.data === lT || e.data === sT && e.ownerDocument.readyState !== hT;
		}
		function rp(e, t) {
			var n = e.ownerDocument;
			if (e.data === cT) e._reactRetry = t;
			else if (e.data !== sT || n.readyState !== hT) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function ip(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === aT || t === lT || t === sT || t === cT || t === rT || t === pT || t === mT) break;
					if (t === oT || t === iT) return null;
				}
			}
			return e;
		}
		function ap(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Fd(a.name)] = a.name.toLowerCase() === "style" ? Id(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === rT ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function op(e, t, n) {
			return n === null || !0 !== n[nT] ? (e.nodeValue === t ? e = null : (t = Ad(t), e = Ad(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function sp(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === oT || n === iT) {
						if (t === 0) return ip(e.nextSibling);
						t--;
					} else n !== aT && n !== lT && n !== sT && n !== cT && n !== rT || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function cp(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === aT || n === lT || n === sT || n === cT || n === rT) {
						if (t === 0) return e;
						t--;
					} else n !== oT && n !== iT || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function lp(e) {
			gm(e);
		}
		function up(e) {
			gm(e);
		}
		function dp(e) {
			gm(e);
		}
		function fp(e, t) {
			function n() {
				r = !0;
			}
			if (e.ownerDocument.activeElement === e) return !0;
			var r = !1;
			try {
				e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
			} finally {
				e.ownerDocument.removeEventListener("focus", n, !0);
			}
			return r;
		}
		function pp(e) {
			AT(function() {
				AT(function(t) {
					return e(t);
				});
			});
		}
		function mp(e, t, n, r, i) {
			switch (i && un(e, r.ancestorInfo), t = qd(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function hp(e, t, n, r) {
			if (!n[Kh] && dt(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Nd(n, e, t), n[Wh] = r, n[Gh] = t;
		}
		function gp(e, t, n) {
			for (var r in n) {
				var i = n[r];
				n.hasOwnProperty(r) && i != null && L(e, t, r, null, eT, i);
			}
			n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Cn && (e.onclick = null), lt(e);
		}
		function _p(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			lt(e);
		}
		function vp(e) {
			if (typeof e.getRootNode == "function") {
				var t = e.getRootNode();
				if (t.nodeType === 9 || t.nodeType === 11) return t;
			}
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function yp(e, t, n) {
			var r = WT;
			if (r && typeof t == "string" && t) {
				var i = At(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), HT.has(i) || (HT.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Nd(t, "link", e), mt(t), r.head.appendChild(t)));
			}
		}
		function bp(e, t, n, r) {
			var i = (i = $m.current) ? vp(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Sp(n.href), t = pt(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = Sp(n.href);
						var a = pt(i).hoistableStyles, o = a.get(e);
						if (o || (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: IT,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Cp(e))) ? a._p || (o.instance = a, o.state.loading = LT | BT) : (a = VT.get(e), a || (a = {
							rel: "preload",
							as: "style",
							href: n.href,
							crossOrigin: n.crossOrigin,
							integrity: n.integrity,
							media: n.media,
							hrefLang: n.hrefLang,
							referrerPolicy: n.referrerPolicy
						}, VT.set(e, a)), Tp(i, e, a, o.state))), t && r === null) throw n = "\n\n  - " + xp(t) + "\n  + " + xp(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + xp(t) + "\n  + " + xp(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Ep(n), t = pt(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function xp(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : hh.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : hh.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : hh.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function Sp(e) {
			return "href=\"" + At(e) + "\"";
		}
		function Cp(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function wp(e) {
			return z({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Tp(e, t, n, r) {
			if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
				if (!0 !== t[Qh]) {
					r.loading = LT;
					return;
				}
			} else t = e.createElement("link"), t[Qh] = !0, t.onload = t.onerror = ht.bind(null, t), Nd(t, "link", n), mt(t), e.head.appendChild(t);
			r.preload = t, t.addEventListener("load", function() {
				return r.loading |= LT;
			}), t.addEventListener("error", function() {
				return r.loading |= RT;
			});
		}
		function Ep(e) {
			return "[src=\"" + At(e) + "\"]";
		}
		function Dp(e) {
			return "script[async]" + e;
		}
		function Op(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + At(n.href) + "\"]");
					if (r) return t.instance = r, mt(r), r;
					var i = z({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), mt(r), Nd(r, "style", i), kp(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = Sp(n.href);
					var a = e.querySelector(Cp(i));
					if (a) return t.state.loading |= BT, t.instance = a, mt(a), a;
					r = wp(n), (i = VT.get(i)) && Ap(r, i), a = (e.ownerDocument || e).createElement("link"), mt(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Nd(a, "link", r), t.state.loading |= BT, kp(a, n.precedence, e), t.instance = a;
				case "script": return a = Ep(n.src), (i = e.querySelector(Dp(a))) ? (t.instance = i, mt(i), i) : (r = n, (i = VT.get(a)) && (r = z({}, n), jp(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), mt(i), Nd(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & BT) === IT && (r = t.instance, t.state.loading |= BT, kp(r, n.precedence, e));
			return t.instance;
		}
		function kp(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Ap(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function jp(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Mp(e, t, n) {
			if (GT === null) {
				var r = /* @__PURE__ */ new Map(), i = GT = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = GT, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Zh] || a[Wh] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Ig) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Np(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Pp(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === vT || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Wd(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Fp(e, t) {
			return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
		}
		function Ip(e) {
			return e.type !== "stylesheet" || (e.state.loading & zT) !== IT;
		}
		function Lp(e) {
			return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
		}
		function Rp(e, t) {
			typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Lp(t), e.suspenseyImages.push(t)), e = Up.bind(e), t.decode().then(e, e));
		}
		function zp(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & BT) === IT) {
				if (n.instance === null) {
					var i = Sp(r.href), a = t.querySelector(Cp(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Hp.bind(e), t.then(e, e)), n.state.loading |= BT, n.instance = a, mt(a);
						return;
					}
					a = t.ownerDocument || t, r = wp(r), (i = VT.get(i)) && Ap(r, i), a = a.createElement("link"), mt(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Nd(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & zT) === IT && (e.count++, n = Hp.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Bp(e, t) {
			return e.stylesheets && e.count === 0 && Wp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Wp(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, KT + t);
				0 < e.imgBytes && YT === 0 && (YT = 125 * Kd() * JT);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Wp(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > YT ? 50 : qT) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Vp(e) {
			if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
				if (e.stylesheets) Wp(e, e.stylesheets);
				else if (e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}
		}
		function Hp() {
			this.count--, Vp(this);
		}
		function Up() {
			this.imgCount--, Vp(this);
		}
		function Wp(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, ZT = /* @__PURE__ */ new Map(), t.forEach(Gp, e), ZT = null, Hp.call(e));
		}
		function Gp(e, t) {
			if (!(t.state.loading & BT)) {
				var n = ZT.get(e);
				if (n) var r = n.get(XT);
				else {
					n = /* @__PURE__ */ new Map(), ZT.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(XT, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(XT, i), n.set(o, i), this.count++, r = Hp.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= BT;
			}
		}
		function Kp(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = OT, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function qp(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Kp(e, t, n, o, c, l, u, d, s), t = Bv, !0 === a && (t |= Vv | Hv), t |= G, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = Ei(), Di(t), e.pooledCache = t, Di(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, xa(a), e;
		}
		function Jp(e) {
			return e ? (e = Lv, e) : Lv;
		}
		function Yp(e, t, n, r, i, a) {
			if (Ah && typeof Ah.onScheduleFiberRoot == "function") try {
				Ah.onScheduleFiberRoot(kh, r, n);
			} catch (e) {
				jh || (jh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Jp(i), r.context === null ? r.context = i : r.pendingContext = i, mh && ph !== null && !aE && (aE = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", w(ph) || "Unknown")), r = Ca(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = wa(e, r, t), n !== null && (ji(t, "root.render()", null), au(n, e, t), Ta(n, e, t));
		}
		function Xp(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function Zp(e, t) {
			Xp(e, t), (e = e.alternate) && Xp(e, t);
		}
		function Qp(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Nr(e, 67108864);
				t !== null && au(t, e, 67108864), Zp(e, 67108864);
			}
		}
		function $p(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = nu(e);
				t = rt(t);
				var n = Nr(e, t);
				n !== null && au(n, e, t), Zp(e, t);
			}
		}
		function em() {
			return ph;
		}
		function tm(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = V.p;
			try {
				V.p = zh, rm(e, t, n, r);
			} finally {
				V.p = a, B.T = i;
			}
		}
		function nm(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = V.p;
			try {
				V.p = Bh, rm(e, t, n, r);
			} finally {
				V.p = a, B.T = i;
			}
		}
		function rm(e, t, n, r) {
			if (gE) {
				var i = im(r);
				if (i === null) vd(e, t, r, _E, n), sm(e, r);
				else if (lm(i, e, t, n, r)) r.stopPropagation();
				else if (sm(e, r), t & 4 && -1 < TE.indexOf(e)) {
					for (; i !== null;) {
						var a = dt(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Ge(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Nh(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										rd(a), (fC & (rC | iC)) === nC && (HC = bh() + UC, id(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = Nr(a, 2), s !== null && au(s, a, 2), uu(), Zp(a, 2);
						}
						if (a = im(r), a === null && vd(e, t, r, _E, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else vd(e, t, r, null, n);
			}
		}
		function im(e) {
			return e = wn(e), am(e);
		}
		function am(e) {
			if (_E = null, e = ut(e), e !== null) {
				var t = ee(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = ne(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return _E = e, null;
		}
		function om(e) {
			switch (e) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "fullscreenerror":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart": return zh;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "resize":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave": return Bh;
				case "message": switch (xh()) {
					case Sh: return zh;
					case Ch: return Bh;
					case wh:
					case Th: return Vh;
					case Eh: return Hh;
					default: return Vh;
				}
				default: return Vh;
			}
		}
		function sm(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					yE = null;
					break;
				case "dragenter":
				case "dragleave":
					bE = null;
					break;
				case "mouseover":
				case "mouseout":
					xE = null;
					break;
				case "pointerover":
				case "pointerout":
					SE.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": CE.delete(t.pointerId);
			}
		}
		function cm(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = dt(t), t !== null && Qp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function lm(e, t, n, r, i) {
			switch (t) {
				case "focusin": return yE = cm(yE, e, t, n, r, i), !0;
				case "dragenter": return bE = cm(bE, e, t, n, r, i), !0;
				case "mouseover": return xE = cm(xE, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return SE.set(a, cm(SE.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, CE.set(a, cm(CE.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function um(e) {
			var t = ut(e.target);
			if (t !== null) {
				var n = ee(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, ct(e.priority, function() {
								$p(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = ne(n), t !== null) {
							e.blockedOn = t, ct(e.priority, function() {
								$p(n);
							});
							return;
						}
					} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
						e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
						return;
					}
				}
			}
			e.blockedOn = null;
		}
		function dm(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = im(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Xg !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Xg = i, n.target.dispatchEvent(r), Xg === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Xg = null;
				} else return t = dt(n), t !== null && Qp(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function fm(e, t, n) {
			dm(e) && n.delete(t);
		}
		function pm() {
			vE = !1, yE !== null && dm(yE) && (yE = null), bE !== null && dm(bE) && (bE = null), xE !== null && dm(xE) && (xE = null), SE.forEach(fm), CE.forEach(fm);
		}
		function mm(e, t) {
			e.blockedOn === t && (e.blockedOn = null, vE || (vE = !0, xm.unstable_scheduleCallback(xm.unstable_NormalPriority, pm)));
		}
		function hm(e) {
			EE !== e && (EE = e, xm.unstable_scheduleCallback(xm.unstable_NormalPriority, function() {
				EE === e && (EE = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (am(r || n) === null) continue;
						break;
					}
					var a = dt(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), is(a, n, r, i));
				}
			}));
		}
		function gm(e) {
			function t(t) {
				return mm(t, e);
			}
			yE !== null && mm(yE, e), bE !== null && mm(bE, e), xE !== null && mm(xE, e), SE.forEach(t), CE.forEach(t);
			for (var n = 0; n < wE.length; n++) {
				var r = wE[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < wE.length && (n = wE[0], n.blockedOn === null);) um(n), n.blockedOn === null && wE.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Gh] || null;
				if (typeof a == "function") o || hm(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Gh] || null) s = o.formAction;
						else if (am(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), hm(n);
				}
			}
		}
		function _m() {
			function e(e) {
				e.canIntercept && e.info === "react-transition" && e.intercept({
					handler: function() {
						return new Promise(function(e) {
							return i = e;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function t() {
				i !== null && (i(), i = null), r || setTimeout(n, 20);
			}
			function n() {
				if (!r && !navigation.transition) {
					var e = navigation.currentEntry;
					e && e.url != null && navigation.navigate(e.url, {
						state: e.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if (typeof navigation == "object") {
				var r = !1, i = null;
				return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
					r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
				};
			}
		}
		function vm(e) {
			this._internalRoot = e;
		}
		function ym(e) {
			this._internalRoot = e;
		}
		function bm(e) {
			e[Kh] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var xm = m(), Sm = d(), Cm = _(), wm = null, Tm = null, z = Object.assign, Em = Symbol.for("react.element"), Dm = Symbol.for("react.transitional.element"), Om = Symbol.for("react.portal"), km = Symbol.for("react.fragment"), Am = Symbol.for("react.strict_mode"), jm = Symbol.for("react.profiler"), Mm = Symbol.for("react.consumer"), Nm = Symbol.for("react.context"), Pm = Symbol.for("react.forward_ref"), Fm = Symbol.for("react.suspense"), Im = Symbol.for("react.suspense_list"), Lm = Symbol.for("react.memo"), Rm = Symbol.for("react.lazy"), zm = Symbol.for("react.activity"), Bm = Symbol.for("react.legacy_hidden"), Vm = Symbol.for("react.memo_cache_sentinel"), Hm = Symbol.for("react.view_transition"), Um = Symbol.for("react.recoverable"), Wm = Symbol.iterator, Gm = Symbol.for("react.client.reference"), Km = Array.isArray, B = Sm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = Cm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, qm = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Jm = [], Ym = [], Xm = -1, Zm = _e(null), Qm = _e(null), $m = _e(null), eh = _e(null), th = 0, nh, rh, ih, ah, oh, sh, ch;
		T.__reactDisabledLog = !0;
		var lh, uh, dh = !1, fh = new (typeof WeakMap == "function" ? WeakMap : Map)(), ph = null, mh = !1, hh = Object.prototype.hasOwnProperty, gh = xm.unstable_scheduleCallback, _h = xm.unstable_cancelCallback, vh = xm.unstable_shouldYield, yh = xm.unstable_requestPaint, bh = xm.unstable_now, xh = xm.unstable_getCurrentPriorityLevel, Sh = xm.unstable_ImmediatePriority, Ch = xm.unstable_UserBlockingPriority, wh = xm.unstable_NormalPriority, Th = xm.unstable_LowPriority, Eh = xm.unstable_IdlePriority, Dh = xm.log, Oh = xm.unstable_setDisableYieldValue, kh = null, Ah = null, jh = !1, Mh = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Nh = Math.clz32 ? Math.clz32 : We, Ph = Math.log, Fh = Math.LN2, Ih = 256, Lh = 262144, Rh = 4194304, zh = 2, Bh = 8, Vh = 32, Hh = 268435456, Uh = Math.random().toString(36).slice(2), Wh = "__reactFiber$" + Uh, Gh = "__reactProps$" + Uh, Kh = "__reactContainer$" + Uh, qh = "__reactEvents$" + Uh, Jh = "__reactListeners$" + Uh, Yh = "__reactHandles$" + Uh, Xh = "__reactResources$" + Uh, Zh = "__reactMarker$" + Uh, Qh = "__reactLoad$" + Uh, $h = /* @__PURE__ */ new Set(), eg = {}, tg = {}, ng = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, rg = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), ig = {}, ag = {}, og = !1, sg = /[\n"\\]/g, cg = !1, lg = !1, ug = !1, dg = !1, fg = !1, pg = !1, mg = ["value", "defaultValue"], hg = !1, gg = /["'&<>\n\t]|^\s|\s$/, _g = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), vg = "applet caption html table td th marquee object select template foreignObject desc title".split(" "), yg = vg.concat(["button"]), bg = "dd dt li option optgroup p rp rt".split(" "), xg = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, Sg = {}, Cg = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlock: "borderBlockEndColor borderBlockEndStyle borderBlockEndWidth borderBlockStartColor borderBlockStartStyle borderBlockStartWidth".split(" "),
			borderBlockColor: ["borderBlockEndColor", "borderBlockStartColor"],
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBlockStyle: ["borderBlockEndStyle", "borderBlockStartStyle"],
			borderBlockWidth: ["borderBlockEndWidth", "borderBlockStartWidth"],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInline: "borderInlineEndColor borderInlineEndStyle borderInlineEndWidth borderInlineStartColor borderInlineStartStyle borderInlineStartWidth".split(" "),
			borderInlineColor: ["borderInlineEndColor", "borderInlineStartColor"],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderInlineStyle: ["borderInlineEndStyle", "borderInlineStartStyle"],
			borderInlineWidth: ["borderInlineEndWidth", "borderInlineStartWidth"],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			colorAdjust: ["printColorAdjust"],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			containIntrinsicSize: ["containIntrinsicHeight", "containIntrinsicWidth"],
			container: ["containerName", "containerType"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontSynthesis: [
				"fontSynthesisPosition",
				"fontSynthesisSmallCaps",
				"fontSynthesisStyle",
				"fontSynthesisWeight"
			],
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			inset: [
				"bottom",
				"left",
				"right",
				"top"
			],
			insetBlock: ["insetBlockEnd", "insetBlockStart"],
			insetInline: ["insetInlineEnd", "insetInlineStart"],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marginBlock: ["marginBlockEnd", "marginBlockStart"],
			marginInline: ["marginInlineEnd", "marginInlineStart"],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			offset: [
				"offsetAnchor",
				"offsetDistance",
				"offsetPath",
				"offsetPosition",
				"offsetRotate"
			],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			overscrollBehavior: ["overscrollBehaviorX", "overscrollBehaviorY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			paddingBlock: ["paddingBlockEnd", "paddingBlockStart"],
			paddingInline: ["paddingInlineEnd", "paddingInlineStart"],
			pageBreakAfter: ["breakAfter"],
			pageBreakBefore: ["breakBefore"],
			pageBreakInside: ["breakInside"],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			scrollMargin: [
				"scrollMarginBottom",
				"scrollMarginLeft",
				"scrollMarginRight",
				"scrollMarginTop"
			],
			scrollMarginBlock: ["scrollMarginBlockEnd", "scrollMarginBlockStart"],
			scrollMarginInline: ["scrollMarginInlineEnd", "scrollMarginInlineStart"],
			scrollPadding: [
				"scrollPaddingBottom",
				"scrollPaddingLeft",
				"scrollPaddingRight",
				"scrollPaddingTop"
			],
			scrollPaddingBlock: ["scrollPaddingBlockEnd", "scrollPaddingBlockStart"],
			scrollPaddingInline: ["scrollPaddingInlineEnd", "scrollPaddingInlineStart"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle",
				"textDecorationThickness"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			textWrap: ["textWrapMode", "textWrapStyle"],
			transition: [
				"transitionBehavior",
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			verticalAlign: [
				"alignmentBaseline",
				"baselineShift",
				"baselineSource"
			],
			whiteSpace: ["textWrapMode", "whiteSpaceCollapse"],
			wordWrap: ["overflowWrap"]
		}, wg = /([A-Z])/g, Tg = /^ms-/, Eg = /^(?:webkit|moz|o)[A-Z]/, Dg = /^-ms-/, Og = /-(.)/g, kg = /;\s*$/, Ag = {}, jg = {}, Mg = !1, Ng = !1, Pg = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Fg = "http://www.w3.org/1998/Math/MathML", Ig = "http://www.w3.org/2000/svg", Lg = /* @__PURE__ */ new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["maskType", "mask-type"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"]
		]), Rg = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			credentialless: "credentialless",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			masktype: "maskType",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, zg = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Bg = {}, Vg = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hg = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ug = !1, Wg = {}, Gg = /^on./, Kg = /^on[^A-Z]/, qg = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jg = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Yg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Xg = null, Zg = null, Qg = null, $g = !1, e_ = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, t_ = !1;
		if (e_) try {
			var n_ = {};
			Object.defineProperty(n_, "passive", { get: function() {
				t_ = !0;
			} }), window.addEventListener("test", n_, n_), window.removeEventListener("test", n_, n_);
		} catch {
			t_ = !1;
		}
		var r_ = null, i_ = null, a_ = null, o_ = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, s_ = Mn(o_), c_ = z({}, o_, {
			view: 0,
			detail: 0
		}), l_ = Mn(c_), u_, d_, f_, p_ = z({}, c_, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: Pn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== f_ && (f_ && e.type === "mousemove" ? (u_ = e.screenX - f_.screenX, d_ = e.screenY - f_.screenY) : d_ = u_ = 0, f_ = e), u_);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : d_;
			}
		}), m_ = Mn(p_), h_ = Mn(z({}, p_, { dataTransfer: 0 })), g_ = Mn(z({}, c_, { relatedTarget: 0 })), __ = Mn(z({}, o_, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), v_ = Mn(z({}, o_, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), y_ = Mn(z({}, o_, { data: 0 })), b_ = y_, x_ = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		}, S_ = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		}, C_ = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, w_ = Mn(z({}, c_, {
			key: function(e) {
				if (e.key) {
					var t = x_[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = kn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? S_[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: Pn,
			charCode: function(e) {
				return e.type === "keypress" ? kn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? kn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), T_ = Mn(z({}, p_, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		})), E_ = Mn(z({}, o_, { submitter: 0 })), D_ = Mn(z({}, c_, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: Pn
		})), O_ = Mn(z({}, o_, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), k_ = Mn(z({}, p_, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), A_ = Mn(z({}, o_, {
			newState: 0,
			oldState: 0,
			source: 0
		})), j_ = [
			9,
			13,
			27,
			32
		], M_ = 229, N_ = e_ && "CompositionEvent" in window, P_ = null;
		e_ && "documentMode" in document && (P_ = document.documentMode);
		var F_ = e_ && "TextEvent" in window && !P_, I_ = e_ && (!N_ || P_ && 8 < P_ && 11 >= P_), L_ = 32, R_ = String.fromCharCode(L_), z_ = !1, B_ = !1, V_ = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0
		}, H_ = null, U_ = null, W_ = !1;
		e_ && (W_ = Bn("input") && (!document.documentMode || 9 < document.documentMode));
		var G_ = typeof Object.is == "function" ? Object.is : Zn, K_ = e_ && "documentMode" in document && 11 >= document.documentMode, q_ = null, J_ = null, Y_ = null, X_ = !1, Z_ = {
			animationend: or("Animation", "AnimationEnd"),
			animationiteration: or("Animation", "AnimationIteration"),
			animationstart: or("Animation", "AnimationStart"),
			transitionrun: or("Transition", "TransitionRun"),
			transitionstart: or("Transition", "TransitionStart"),
			transitioncancel: or("Transition", "TransitionCancel"),
			transitionend: or("Transition", "TransitionEnd")
		}, Q_ = {}, $_ = {};
		e_ && ($_ = document.createElement("div").style, "AnimationEvent" in window || (delete Z_.animationend.animation, delete Z_.animationiteration.animation, delete Z_.animationstart.animation), "TransitionEvent" in window || delete Z_.transitionend.transition);
		var ev = sr("animationend"), tv = sr("animationiteration"), nv = sr("animationstart"), rv = sr("transitionrun"), iv = sr("transitionstart"), av = sr("transitioncancel"), ov = sr("transitionend"), sv = /* @__PURE__ */ new Map(), cv = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		cv.push("scrollEnd");
		var lv = 0, uv = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var dv = performance, fv = function() {
			return dv.now();
		};
		else {
			var pv = Date;
			fv = function() {
				return pv.now();
			};
		}
		var mv = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, hv = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", gv = 0, _v = 1, vv = 2, yv = 3, bv = 100, xv = "-\xA0", Sv = "+\xA0", Cv = " \xA0", wv = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Tv = "Components ⚛", H = "Scheduler ⚛", U = "Blocking", Ev = !1, Dv = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: Tv
		}, Ov = {
			start: -0,
			end: -0,
			detail: { devtools: Dv }
		}, kv = ["Changed Props", ""], Av = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", jv = ["Changed Props", Av], Mv = 1, Nv = 2, Pv = [], Fv = 0, Iv = 0, Lv = {};
		Object.freeze(Lv);
		var Rv = null, zv = null, W = 0, Bv = 1, G = 2, Vv = 8, Hv = 16, Uv = 32, Wv = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Wv = !0;
		}
		var Gv = /* @__PURE__ */ new WeakMap(), Kv = [], qv = 0, Jv = null, Yv = 0, Xv = [], Zv = 0, Qv = null, $v = 1, ey = "", ty = null, ny = null, K = !1, ry = !1, iy = null, ay = null, oy = !1, sy = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), cy = _e(null), ly = _e(null), uy = {}, dy = null, fy = null, py = !1, my = typeof AbortController < "u" ? AbortController : function() {
			var e = [], t = this.signal = {
				aborted: !1,
				addEventListener: function(t, n) {
					e.push(n);
				}
			};
			this.abort = function() {
				t.aborted = !0, e.forEach(function(e) {
					return e();
				});
			};
		}, hy = xm.unstable_scheduleCallback, gy = xm.unstable_NormalPriority, _y = {
			$$typeof: Nm,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, vy = null, yy = xm.unstable_now, by = console.createTask ? console.createTask : function() {
			return null;
		}, xy = 1, Sy = 2, Cy = -0, wy = -0, Ty = -0, Ey = null, Dy = -1.1, Oy = -0, ky = -0, q = -1.1, J = -1.1, Ay = null, jy = !1, My = -0, Ny = -1.1, Py = null, Fy = 0, Iy = null, Ly = null, Ry = -1.1, zy = null, By = -1.1, Vy = -1.1, Hy = -0, Uy = -1.1, Wy = -1.1, Gy = 0, Ky = null, qy = null, Jy = null, Yy = -1.1, Xy = null, Zy = -1.1, Qy = -1.1, $y = -0, eb = -0, tb = 0, nb = null, rb = 0, ib = -1.1, ab = !1, ob = !1, sb = null, cb = 0, lb = 0, ub = null, db = B.S;
		B.S = function(e, t) {
			if (BC = bh(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > Uy && 0 > Wy) {
					Uy = yy();
					var n = tf(), r = ef();
					(n !== Zy || r !== Xy) && (Zy = -1.1), Yy = n, Xy = r;
				}
				Xi(e, t);
			}
			if (vy !== null) for (n = jw; n !== null;) ki(n, vy), n = n.next;
			if (n = e.types, n !== null) {
				for (r = jw; r !== null;) ki(r, n), r = r.next;
				if (lb !== 0) {
					r = vy, r === null && (r = vy = []);
					for (var i = 0; i < n.length; i++) {
						var a = n[i];
						r.indexOf(a) === -1 && r.push(a);
					}
				}
			}
			db !== null && db(e, t);
		};
		var fb = _e(null), pb = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, mb = [], hb = [], gb = [], _b = [], vb = [], yb = [], bb = /* @__PURE__ */ new Set();
		pb.recordUnsafeLifecycleWarnings = function(e, t) {
			bb.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && mb.push(e), e.mode & Vv && typeof t.UNSAFE_componentWillMount == "function" && hb.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && gb.push(e), e.mode & Vv && typeof t.UNSAFE_componentWillReceiveProps == "function" && _b.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && vb.push(e), e.mode & Vv && typeof t.UNSAFE_componentWillUpdate == "function" && yb.push(e));
		}, pb.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < mb.length && (mb.forEach(function(t) {
				e.add(w(t) || "Component"), bb.add(t.type);
			}), mb = []);
			var t = /* @__PURE__ */ new Set();
			0 < hb.length && (hb.forEach(function(e) {
				t.add(w(e) || "Component"), bb.add(e.type);
			}), hb = []);
			var n = /* @__PURE__ */ new Set();
			0 < gb.length && (gb.forEach(function(e) {
				n.add(w(e) || "Component"), bb.add(e.type);
			}), gb = []);
			var r = /* @__PURE__ */ new Set();
			0 < _b.length && (_b.forEach(function(e) {
				r.add(w(e) || "Component"), bb.add(e.type);
			}), _b = []);
			var i = /* @__PURE__ */ new Set();
			0 < vb.length && (vb.forEach(function(e) {
				i.add(w(e) || "Component"), bb.add(e.type);
			}), vb = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < yb.length && (yb.forEach(function(e) {
				a.add(w(e) || "Component"), bb.add(e.type);
			}), yb = []), 0 < t.size) {
				var o = p(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = p(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = p(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = p(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = p(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = p(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var xb = /* @__PURE__ */ new Map(), Sb = /* @__PURE__ */ new Set();
		pb.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Vv && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !Sb.has(e.type) && (r = xb.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], xb.set(n, r)), r.push(e));
		}, pb.flushLegacyContextWarning = function() {
			xb.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(w(e) || "Component"), Sb.add(e.type);
					});
					var r = p(n);
					D(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, pb.discardPendingWarnings = function() {
			mb = [], hb = [], gb = [], _b = [], vb = [], yb = [], xb = /* @__PURE__ */ new Map();
		};
		var Cb = "", wb = { react_stack_bottom_frame: function(e, t, n) {
			var r = mh;
			mh = !0;
			try {
				return e(t, n);
			} finally {
				mh = r;
			}
		} }, Tb = wb.react_stack_bottom_frame.bind(wb), Eb = { react_stack_bottom_frame: function(e) {
			var t = mh;
			mh = !0;
			try {
				return e.render();
			} finally {
				mh = t;
			}
		} }, Db = Eb.react_stack_bottom_frame.bind(Eb), Ob = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Wu(e, e.return, t);
			}
		} }, kb = Ob.react_stack_bottom_frame.bind(Ob), Ab = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Wu(e, e.return, t);
			}
		} }, jb = Ab.react_stack_bottom_frame.bind(Ab), Mb = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Nb = Mb.react_stack_bottom_frame.bind(Mb), Pb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Wu(e, t, n);
			}
		} }, Fb = Pb.react_stack_bottom_frame.bind(Pb), Ib = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Lb = Ib.react_stack_bottom_frame.bind(Ib), Rb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Wu(e, t, n);
			}
		} }, zb = Rb.react_stack_bottom_frame.bind(Rb), Bb = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Vb = Bb.react_stack_bottom_frame.bind(Bb), Hb = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Ub = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), Wb = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Gb = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Kb = null, qb = null, Jb = !1, Yb = null, Xb = !1, Zb = null, Qb = 0, Y = null, $b, ex = $b = !1, tx = {}, nx = {}, rx = {};
		f = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = w(e), i = r || "null";
				if (!tx[i]) {
					tx[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = w(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = w(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), D(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var ix = ya(!0), ax = ya(!1), ox = 0, sx = 1, cx = 2, lx = 3, ux = !1, dx = !1, fx = null, px = !1, mx = _e(null), hx = _e(0), gx = _e(null), _x = null, vx = 1, yx = 2, bx = _e(0), xx = 0, Sx = 1, Cx = 2, wx = 4, Tx = 8, Ex, Dx = /* @__PURE__ */ new Set(), Ox = /* @__PURE__ */ new Set(), kx = /* @__PURE__ */ new Set(), Ax = /* @__PURE__ */ new Set(), jx = 0, X = null, Mx = null, Nx = null, Px = !1, Fx = !1, Ix = !1, Lx = 0, Rx = 0, zx = null, Bx = 0, Vx = 25, Z = null, Hx = null, Ux = -1, Wx = !1, Gx = {
			readContext: Ci,
			use: ro,
			useCallback: Ga,
			useContext: Ga,
			useEffect: Ga,
			useImperativeHandle: Ga,
			useLayoutEffect: Ga,
			useInsertionEffect: Ga,
			useMemo: Ga,
			useReducer: Ga,
			useRef: Ga,
			useState: Ga,
			useDebugValue: Ga,
			useDeferredValue: Ga,
			useTransition: Ga,
			useSyncExternalStore: Ga,
			useId: Ga,
			useHostTransitionStatus: Ga,
			useFormState: Ga,
			useActionState: Ga,
			useOptimistic: Ga,
			useMemoCache: Ga,
			useCacheRefresh: Ga,
			useEffectEvent: Ga
		}, Kx = null, qx = null, Jx = null, Yx = null, Xx = null, Zx = null, Qx = null;
		Kx = {
			readContext: function(e) {
				return Ci(e);
			},
			use: ro,
			useCallback: function(e, t) {
				return Z = "useCallback", k(), Ua(t), Jo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", k(), Ci(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", k(), Ua(t), Bo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", k(), Ua(n), Ko(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", k(), Ua(t), Ro(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", k(), Ua(t), Wo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", k(), Ua(t);
				var n = B.H;
				B.H = Xx;
				try {
					return Xo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", k();
				var r = B.H;
				B.H = Xx;
				try {
					return oo(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", k(), Lo(e);
			},
			useState: function(e) {
				Z = "useState", k();
				var t = B.H;
				B.H = Xx;
				try {
					return yo(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", k();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", k(), M(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", k(), ss();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", k(), uo(e, t, n);
			},
			useId: function() {
				return Z = "useId", k(), ds();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", k(), Wa(), jo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", k(), jo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", k(), bo(e);
			},
			useHostTransitionStatus: us,
			useMemoCache: io,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", k(), fs();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", k(), Ho(e);
			}
		}, qx = {
			readContext: function(e) {
				return Ci(e);
			},
			use: ro,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), Jo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), Ci(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", A(), Bo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), Ko(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", A(), Ro(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), Wo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = B.H;
				B.H = Xx;
				try {
					return Xo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = B.H;
				B.H = Xx;
				try {
					return oo(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", A(), Lo(e);
			},
			useState: function(e) {
				Z = "useState", A();
				var t = B.H;
				B.H = Xx;
				try {
					return yo(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), M(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), ss();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), uo(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), ds();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", A(), jo(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", A(), Wa(), jo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", A(), bo(e);
			},
			useHostTransitionStatus: us,
			useMemoCache: io,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), fs();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), Ho(e);
			}
		}, Jx = {
			readContext: function(e) {
				return Ci(e);
			},
			use: ro,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), Yo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), Ci(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", A(), zo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), qo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", A(), zo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), zo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = B.H;
				B.H = Zx;
				try {
					return Zo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = B.H;
				B.H = Zx;
				try {
					return so(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", A(), j().memoizedState;
			},
			useState: function() {
				Z = "useState", A();
				var e = B.H;
				B.H = Zx;
				try {
					return so(ao);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), Qo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), cs();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), fo(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), j().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", A(), Wa(), Mo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", A(), Mo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", A(), xo(e, t);
			},
			useHostTransitionStatus: us,
			useMemoCache: io,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), Uo(e);
			}
		}, Yx = {
			readContext: function(e) {
				return Ci(e);
			},
			use: ro,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), Yo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), Ci(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", A(), zo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), qo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", A(), zo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), zo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = B.H;
				B.H = Qx;
				try {
					return Zo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = B.H;
				B.H = Qx;
				try {
					return lo(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", A(), j().memoizedState;
			},
			useState: function() {
				Z = "useState", A();
				var e = B.H;
				B.H = Qx;
				try {
					return lo(ao);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), $o(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), ls();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), fo(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), j().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", A(), Wa(), Fo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", A(), Fo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", A(), Co(e, t);
			},
			useHostTransitionStatus: us,
			useMemoCache: io,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), Uo(e);
			}
		}, Xx = {
			readContext: function(e) {
				return l(), Ci(e);
			},
			use: function(e) {
				return c(), ro(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), k(), Jo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), k(), Ci(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), k(), Bo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), k(), Ko(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), k(), Ro(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), k(), Wo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), k();
				var n = B.H;
				B.H = Xx;
				try {
					return Xo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), k();
				var r = B.H;
				B.H = Xx;
				try {
					return oo(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), k(), Lo(e);
			},
			useState: function(e) {
				Z = "useState", c(), k();
				var t = B.H;
				B.H = Xx;
				try {
					return yo(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), k();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), k(), M(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), k(), ss();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), k(), uo(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), k(), ds();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), k(), jo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), k(), jo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), k(), bo(e);
			},
			useMemoCache: function(e) {
				return c(), io(e);
			},
			useHostTransitionStatus: us,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", k(), fs();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), k(), Ho(e);
			}
		}, Zx = {
			readContext: function(e) {
				return l(), Ci(e);
			},
			use: function(e) {
				return c(), ro(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), A(), Yo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), A(), Ci(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), A(), zo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), A(), qo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), A(), zo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), A(), zo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), A();
				var n = B.H;
				B.H = Zx;
				try {
					return Zo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), A();
				var r = B.H;
				B.H = Zx;
				try {
					return so(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), A(), j().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), A();
				var e = B.H;
				B.H = Zx;
				try {
					return so(ao);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), A(), Qo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), A(), cs();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), A(), fo(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), A(), j().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), A(), Mo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), A(), Mo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), A(), xo(e, t);
			},
			useMemoCache: function(e) {
				return c(), io(e);
			},
			useHostTransitionStatus: us,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), A(), Uo(e);
			}
		}, Qx = {
			readContext: function(e) {
				return l(), Ci(e);
			},
			use: function(e) {
				return c(), ro(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), A(), Yo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), A(), Ci(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), A(), zo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), A(), qo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), A(), zo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), A(), zo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), A();
				var n = B.H;
				B.H = Zx;
				try {
					return Zo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), A();
				var r = B.H;
				B.H = Zx;
				try {
					return lo(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), A(), j().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), A();
				var e = B.H;
				B.H = Zx;
				try {
					return lo(ao);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), A(), $o(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), A(), ls();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), A(), fo(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), A(), j().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), A(), Fo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), A(), Fo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), A(), Co(e, t);
			},
			useMemoCache: function(e) {
				return c(), io(e);
			},
			useHostTransitionStatus: us,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), A(), Uo(e);
			}
		};
		var $x = {}, eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set();
		Object.freeze($x);
		var uS = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = nu(e), i = Ca(r);
				i.payload = t, n != null && (xs(n), i.callback = n), t = wa(e, i, r), t !== null && (ji(r, "this.setState()", e), au(t, e, r), Ta(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = nu(e), i = Ca(r);
				i.tag = sx, i.payload = t, n != null && (xs(n), i.callback = n), t = wa(e, i, r), t !== null && (ji(r, "this.replaceState()", e), au(t, e, r), Ta(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = nu(e), r = Ca(n);
				r.tag = cx, t != null && (xs(t), r.callback = t), t = wa(e, r, n), t !== null && (ji(n, "this.forceUpdate()", e), au(t, e, n), Ta(t, e, n));
			}
		}, dS = null, fS = null, pS = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), mS = !1, hS = {}, gS = {}, _S = {}, vS = {}, yS = !1, bS = {}, xS = {}, SS = {}, CS = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, wS = !1, TS = null;
		TS = /* @__PURE__ */ new Set();
		var ES = !1, DS = null, OS = null, kS = 0, AS = /* @__PURE__ */ new Map(), jS = {}, MS = 0, NS = 1, PS = 2, FS = !1, IS = !1, LS = !1, RS = !1, zS = typeof WeakSet == "function" ? WeakSet : Set, BS = null, VS = null, HS = null, US = !1, WS = !1, GS = !1, KS = !1, qS = null, JS = !1, YS = null, XS = !1, ZS = 8192, QS = {
			getCacheForType: function(e) {
				var t = Ci(_y), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return Ci(_y).controller.signal;
			},
			getOwner: function() {
				return ph;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var $S = Symbol.for;
			$S("selector.component"), $S("selector.has_pseudo_class"), $S("selector.role"), $S("selector.test_id"), $S("selector.text");
		}
		var eC = [], tC = typeof WeakMap == "function" ? WeakMap : Map, nC = 0, rC = 2, iC = 4, aC = 0, oC = 1, sC = 2, cC = 3, lC = 4, uC = 6, dC = 5, fC = nC, pC = null, Q = null, $ = 0, mC = 0, hC = 1, gC = 2, _C = 3, vC = 4, yC = 5, bC = 6, xC = 7, SC = 8, CC = 9, wC = mC, TC = null, EC = !1, DC = !1, OC = !1, kC = 0, AC = aC, jC = 0, MC = 0, NC = 0, PC = 0, FC = 0, IC = null, LC = null, RC = !1, zC = 0, BC = 0, VC = 300, HC = Infinity, UC = 500, WC = null, GC = null, KC = null, qC = 0, JC = 1, YC = 2, XC = 3, ZC = 0, QC = 1, $C = 2, ew = 3, tw = 4, nw = 5, rw = 0, iw = null, aw = null, ow = 0, sw = 0, cw = -0, lw = null, uw = null, dw = null, fw = null, pw = null, mw = null, hw = qC, gw = null, _w = 50, vw = 0, yw = null, bw = !1, xw = !1, Sw = 50, Cw = 0, ww = null, Tw = !1, Ew = !1, Dw = null, Ow = !1, kw = /* @__PURE__ */ new Set(), Aw = {}, jw = null, Mw = null, Nw = !1, Pw = !1, Fw = !1, Iw = !1, Lw = 0, Rw = {};
		(function() {
			for (var e = 0; e < cv.length; e++) {
				var t = cv[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), cr(n, "on" + t);
			}
			cr(ev, "onAnimationEnd"), cr(tv, "onAnimationIteration"), cr(nv, "onAnimationStart"), cr("dblclick", "onDoubleClick"), cr("focusin", "onFocus"), cr("focusout", "onBlur"), cr(rv, "onTransitionRun"), cr(iv, "onTransitionStart"), cr(av, "onTransitionCancel"), cr(ov, "onTransitionEnd");
		})(), _t("onMouseEnter", ["mouseout", "mouseover"]), _t("onMouseLeave", ["mouseout", "mouseover"]), _t("onPointerEnter", ["pointerout", "pointerover"]), _t("onPointerLeave", ["pointerout", "pointerover"]), gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), gt("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var zw = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zw)), Vw = "_reactListening" + Math.random().toString(36).slice(2), Hw = !1, Uw = !1, Ww = !1, Gw = !1, Kw = !1, qw = !1, Jw = !1, Yw = {}, Xw = /\r\n?/g, Zw = /\u0000|\uFFFD/g, Qw = "http://www.w3.org/1999/xlink", $w = "http://www.w3.org/XML/1998/namespace", eT = {}, tT = "javascript:throw new Error('React form unexpectedly submitted.')", nT = "suppressHydrationWarning", rT = "&", iT = "/&", aT = "$", oT = "/$", sT = "$?", cT = "$~", lT = "$!", uT = "html", dT = "body", fT = "head", pT = "F!", mT = "F", hT = "loading", gT = "style", _T = 0, vT = 1, yT = 2, bT = null, xT = null, ST = !1, CT = {
			dialog: !0,
			webview: !0
		}, wT = null, TT = void 0, ET = typeof setTimeout == "function" ? setTimeout : void 0, DT = typeof clearTimeout == "function" ? clearTimeout : void 0, OT = -1, kT = typeof Promise == "function" ? Promise : void 0, AT = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ET, jT = typeof queueMicrotask == "function" ? queueMicrotask : kT === void 0 ? ET : function(e) {
			return kT.resolve(null).then(e).catch(nf);
		}, MT = 500;
		jf.prototype.animate = function(e, t) {
			return t = typeof t == "number" ? { duration: t } : z({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
		}, jf.prototype.getAnimations = function() {
			for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
				var a = n[i].effect;
				a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
			}
			return r;
		}, jf.prototype.getComputedStyle = function() {
			return getComputedStyle(this._scope, this._selector);
		}, Nf.prototype.addEventListener = function(e, t, n) {
			var r = null, i = null;
			if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
				this._eventListeners === null && (this._eventListeners = []);
				var a = this._eventListeners;
				if (Rf(a, e, t, n) === -1) {
					var o = this, s = t;
					n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
						o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
					}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = If(n), a.push({
						type: e,
						listener: t,
						optionsOrUseCapture: n,
						attachedListener: s,
						cleanup: i
					}), S(this._fragmentFiber, Pf, e, s, r);
				}
				this._eventListeners = a;
			}
		}, Nf.prototype.removeEventListener = function(e, t, n) {
			var r = this._eventListeners;
			if (r !== null && (t = Rf(r, e, t, n), t !== -1)) {
				var i = r[t];
				n = i.attachedListener;
				var a = i.cleanup;
				i = If(i.optionsOrUseCapture), S(this._fragmentFiber, Ff, e, n, i), r.splice(t, 1), a !== null && a();
			}
		}, Nf.prototype.dispatchEvent = function(e) {
			var t = ae(this._fragmentFiber);
			if (t === null) return !0;
			t = le(t);
			var n = this._eventListeners;
			if (n !== null && 0 < n.length || !e.bubbles) {
				var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
				if (n) for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.addEventListener(a.type, a.attachedListener, If(a.optionsOrUseCapture));
				}
				if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, If(a.optionsOrUseCapture));
				return t.removeChild(r), e;
			}
			return t.dispatchEvent(e);
		}, Nf.prototype.focus = function(e) {
			C(this._fragmentFiber.child, !0, zf, e, void 0, void 0);
		}, Nf.prototype.focusLast = function(e) {
			var t = [];
			C(this._fragmentFiber.child, !0, Bf, t, void 0, void 0);
			for (var n = t.length - 1; 0 <= n && !zf(t[n], e); n--);
		}, Nf.prototype.blur = function() {
			var e = ae(this._fragmentFiber);
			e !== null && (e = le(e), e = qd(e).activeElement, e !== null && S(this._fragmentFiber, Vf, e));
		}, Nf.prototype.observeUsing = function(e) {
			var t = !1, n = !1;
			S(this._fragmentFiber, function(e) {
				if (e.tag === 6) t = !0;
				else return n = !0;
				return !1;
			}), t && !n && console.error("observeUsing() was called on a FragmentInstance with only text children. Observers do not work on text nodes."), this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), S(this._fragmentFiber, Hf, e);
		}, Nf.prototype.unobserveUsing = function(e) {
			var t = this._observers;
			if (t !== null && t.has(e)) {
				t.delete(e), S(this._fragmentFiber, Uf, e);
				for (var n = t = 0; n < NT.length; n++) {
					var r = NT[n];
					r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : NT[t++] = r;
				}
				NT.length = t;
			} else console.error("You are calling unobserveUsing() with an observer that is not being observed with this fragment instance. First attach the observer with observeUsing()");
		};
		var NT = [], PT = !1;
		Nf.prototype.getClientRects = function() {
			var e = [];
			return S(this._fragmentFiber, Gf, e), e;
		}, Nf.prototype.getRootNode = function(e) {
			var t = ae(this._fragmentFiber);
			return t === null ? this : le(t).getRootNode(e);
		}, Nf.prototype.compareDocumentPosition = function(e) {
			var t = ae(this._fragmentFiber);
			if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
			var n = [];
			S(this._fragmentFiber, Bf, n);
			var r = le(t);
			if (n.length === 0) {
				if (t = r, oe(this._fragmentFiber)) {
					a: {
						for (n = this._fragmentFiber.return; n !== null;) {
							if (n.tag === 4) {
								n = n.stateNode.containerInfo;
								break a;
							}
							if (n.tag === 3 || n.tag === 5 || n.tag === 27) break;
							n = n.return;
						}
						n = null;
					}
					n != null && (t = n);
				}
				n = this._fragmentFiber;
				var i = r = t.compareDocumentPosition(e);
				return t === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = se(n)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = le(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
			}
			t = le(n[0]), i = le(n[n.length - 1]);
			var a = oe(this._fragmentFiber) ? t.parentElement : r;
			if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
			r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
			var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
			return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Kf(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}, Nf.prototype.scrollIntoView = function(e) {
			if (typeof e == "object") throw Error("FragmentInstance.scrollIntoView() does not support scrollIntoViewOptions. Use the alignToTop boolean instead.");
			var t = [];
			S(this._fragmentFiber, Bf, t);
			var n = !1 !== e;
			if (t.length === 0) {
				var r = se(this._fragmentFiber);
				if (r = n ? r[1] || r[0] || ae(this._fragmentFiber) : r[0] || r[1], r === null) return;
				if (r.tag === 6) {
					e = le(r), qf(e, n);
					return;
				}
				if (r = le(r), r.nodeType !== 9) {
					if (r.nodeType === 11) {
						n = "host" in r ? r.host : null, n === null ? console.warn("You are attempting to scroll a FragmentInstance that is only mounted inside a detached DocumentFragment. No scroll was performed.") : n.scrollIntoView(e);
						return;
					}
					r.scrollIntoView(e);
				}
			}
			for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
				var i = t[r];
				i.tag === 6 ? (i = le(i), qf(i, n)) : le(i).scrollIntoView(e), r += n ? -1 : 1;
			}
		};
		var FT = null, IT = 0, LT = 1, RT = 2, zT = 3, BT = 4, VT = /* @__PURE__ */ new Map(), HT = /* @__PURE__ */ new Set(), UT = V.d;
		V.d = {
			f: function() {
				var e = UT.f(), t = uu();
				return e || t;
			},
			r: function(e) {
				var t = dt(e);
				t !== null && t.tag === 5 && t.type === "form" ? os(t) : UT.r(e);
			},
			D: function(e) {
				UT.D(e), yp("dns-prefetch", e, null);
			},
			C: function(e, t) {
				UT.C(e, t), yp("preconnect", e, t);
			},
			L: function(e, t, n) {
				UT.L(e, t, n);
				var r = WT;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + At(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + At(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + At(n.imageSizes) + "\"]")) : i += "[href=\"" + At(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = Sp(e);
							break;
						case "script": a = Ep(e);
					}
					if (!(VT.has(a) || (e = z({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), VT.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Cp(a)) || t === "script" && r.querySelector(Dp(a))))) {
						var o = r.createElement("link");
						Nd(o, "link", e), t === "style" && (o[Qh] = !0, o.onload = o.onerror = function() {
							ht(o);
						}), mt(o), r.head.appendChild(o);
					}
				}
			},
			m: function(e, t) {
				UT.m(e, t);
				var n = WT;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + At(r) + "\"][href=\"" + At(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Ep(e);
					}
					if (!VT.has(a) && (e = z({
						rel: "modulepreload",
						href: e
					}, t), VT.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Dp(a))) return;
						}
						r = n.createElement("link"), Nd(r, "link", e), mt(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				UT.X(e, t);
				var n = WT;
				if (n && e) {
					var r = pt(n).hoistableScripts, i = Ep(e), a = r.get(i);
					a || (a = n.querySelector(Dp(i)), a || (e = z({
						src: e,
						async: !0
					}, t), (t = VT.get(i)) && jp(e, t), a = n.createElement("script"), mt(a), Nd(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				UT.S(e, t, n);
				var r = WT;
				if (r && e) {
					var i = pt(r).hoistableStyles, a = Sp(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: IT,
							preload: null
						};
						if (o = r.querySelector(Cp(a))) s.loading = LT | BT;
						else {
							e = z({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = VT.get(a)) && Ap(e, n);
							var c = o = r.createElement("link");
							mt(c), Nd(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= LT;
							}), c.addEventListener("error", function() {
								s.loading |= RT;
							}), s.loading |= BT, kp(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				UT.M(e, t);
				var n = WT;
				if (n && e) {
					var r = pt(n).hoistableScripts, i = Ep(e), a = r.get(i);
					a || (a = n.querySelector(Dp(i)), a || (e = z({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = VT.get(i)) && jp(e, t), a = n.createElement("script"), mt(a), Nd(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var WT = typeof document > "u" ? null : document, GT = null, KT = 6e4, qT = 800, JT = 500, YT = 0, XT = null, ZT = null, QT = qm, $T = {
			$$typeof: Nm,
			Provider: null,
			Consumer: null,
			_currentValue: QT,
			_currentValue2: QT,
			_threadCount: 0
		}, eE = "%c%s%c", tE = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", nE = "", rE = " ", iE = Function.prototype.bind, aE = !1, oE = null, sE = null, cE = null, lE = null, uE = null, dE = null, fE = null, pE = null, mE = null, hE = null;
		oE = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = z({}, e.memoizedProps), i = Nr(e, 2), i !== null && au(i, e, 2));
		}, sE = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = z({}, e.memoizedProps), r = Nr(e, 2), r !== null && au(r, e, 2));
		}, cE = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = z({}, e.memoizedProps), i = Nr(e, 2), i !== null && au(i, e, 2));
		}, lE = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Nr(e, 2), t !== null && au(t, e, 2);
		}, uE = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Nr(e, 2), t !== null && au(t, e, 2);
		}, dE = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Nr(e, 2), t !== null && au(t, e, 2);
		}, fE = function(e) {
			var t = Nr(e, 2);
			t !== null && au(t, e, 2);
		}, pE = function(e) {
			var t = Xe(), n = Nr(e, t);
			n !== null && au(n, e, t);
		}, mE = function(e) {
			s = e;
		}, hE = function(e) {
			o = e;
		};
		var gE = !0, _E = null, vE = !1, yE = null, bE = null, xE = null, SE = /* @__PURE__ */ new Map(), CE = /* @__PURE__ */ new Map(), wE = [], TE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), EE = null;
		if (ym.prototype.render = vm.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			Yp(r, nu(r), n, t, null, null);
		}, ym.prototype.unmount = vm.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(fC & (rC | iC)) !== nC && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Yp(e.current, 2, null, e, null, null), uu(), t[Kh] = null;
			}
		}, ym.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = st();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < wE.length && t !== 0 && t < wE[n].priority; n++);
				wE.splice(n, 0, e), n === 0 && um(e);
			}
		}, (function() {
			var e = Sm.version;
			if (e !== "19.3.1") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.3.1\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), V.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = x(t), e = e === null ? null : ie(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.3.1",
				rendererPackageName: "react-dom",
				currentDispatcherRef: B,
				reconcilerVersion: "19.3.1"
			};
			return e.overrideHookState = oE, e.overrideHookStateDeletePath = sE, e.overrideHookStateRenamePath = cE, e.overrideProps = lE, e.overridePropsDeletePath = uE, e.overridePropsRenamePath = dE, e.scheduleUpdate = fE, e.scheduleRetry = pE, e.setErrorHandler = mE, e.setSuspenseHandler = hE, e.scheduleRefresh = v, e.scheduleRoot = g, e.setRefreshHandler = y, e.getCurrentFiber = em, He(e);
		})() && e_ && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var DE = window.location.protocol;
			/^(https?|file):$/.test(DE) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (DE === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			bm(e);
			var n = !1, r = "", i = Es, a = Ds, o = Os;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Dm && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = qp(e, 1, !1, null, null, n, r, null, i, a, o, _m), e[Kh] = t.current, gd(e), new vm(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			bm(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = Es, o = Ds, s = Os, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = qp(e, 1, !0, t, n ?? null, r, i, c, a, o, s, _m), t.context = Jp(null), n = t.current, r = nu(n), r = rt(r), i = Ca(r), i.callback = null, wa(n, i, r), ji(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Qe(t, n), rd(t), e[Kh] = t.current, gd(e), new ym(t);
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), b = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = v()) : t.exports = y();
})), ee = /* @__PURE__ */ c(d(), 1), te = b(), ne = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), re = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === oe ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case re: return "Suspense";
				case x: return "SuspenseList";
				case C: return "Activity";
				case ae: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case te: return e.displayName || "Context";
				case ee: return (e._context.displayName || "Context") + ".Consumer";
				case ne:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ie: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case S:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === S) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = se.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (ce.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				de || (de = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return fe[e] || (fe[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) {
				if (o) {
					if (le(f)) {
						for (o = 0; o < f.length; o++) p(f[o]);
						Object.freeze && Object.freeze(f);
					} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				} else p(f);
			}
			if (ce.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", he[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), he[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === S && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = d(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), ae = Symbol.for("react.view_transition"), oe = Symbol.for("react.client.reference"), se = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = Object.prototype.hasOwnProperty, le = Array.isArray, ue = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var de, fe = {}, pe = h.react_stack_bottom_frame.bind(h, o)(), me = ue(i(o)), he = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > se.recentlyCreatedOwnerStacks++;
			if (r) {
				var a = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = a;
			} else o = pe;
			return f(e, t, n, !1, o, r ? ue(i(e)) : me);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > se.recentlyCreatedOwnerStacks++;
			if (r) {
				var a = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = a;
			} else o = pe;
			return f(e, t, n, !0, o, r ? ue(i(e)) : me);
		};
	})();
})), x = (/* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? ne() : re();
})))(), ie = "ABCDEFG", S = (e, t) => t.invariants?.find((t) => t.id === e)?.name || e, C = (e) => JSON.parse(JSON.stringify(e));
function ae({ graph: e, title: t }) {
	let n = new Map(e.nodes.map((e, t) => [e.id, e]));
	return /* @__PURE__ */ (0, x.jsxs)("svg", {
		className: "mini-graph",
		viewBox: "0 0 220 120",
		role: "img",
		"aria-label": t,
		children: [e.edges.map((e, t) => {
			let r = n.get(e.source), i = n.get(e.target);
			return r && i ? /* @__PURE__ */ (0, x.jsx)("line", {
				x1: r.x,
				y1: r.y,
				x2: i.x,
				y2: i.y
			}, t) : null;
		}), e.nodes.map((e) => /* @__PURE__ */ (0, x.jsxs)("g", { children: [/* @__PURE__ */ (0, x.jsx)("circle", {
			cx: e.x,
			cy: e.y,
			r: "10"
		}), /* @__PURE__ */ (0, x.jsx)("text", {
			x: e.x,
			y: e.y + 4,
			children: e.id
		})] }, e.id))]
	});
}
function oe({ state: e, emit: t }) {
	let [n, r] = (0, ee.useState)("select"), [i, a] = (0, ee.useState)(null), [o, s] = (0, ee.useState)(null), c = (0, ee.useRef)(null), l = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		return {
			x: Math.max(24, Math.min(576, (e.clientX - t.left) * 600 / t.width)),
			y: Math.max(24, Math.min(336, (e.clientY - t.top) * 360 / t.height))
		};
	}, u = (r) => {
		n === "edge" ? o ? (o !== r && !e.edges.some((e) => e.source === o && e.target === r || e.source === r && e.target === o) && t({
			...e,
			edges: [...e.edges, {
				source: o,
				target: r
			}]
		}, "graph_changed"), s(null)) : s(r) : n === "delete" ? t({
			...e,
			nodes: e.nodes.filter((e) => e.id !== r),
			edges: e.edges.filter((e) => e.source !== r && e.target !== r)
		}, "graph_changed") : a(r);
	};
	return /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsxs)("div", {
		className: "toolbar",
		children: [
			/* @__PURE__ */ (0, x.jsx)("button", {
				className: n === "select" ? "active" : "",
				onClick: () => r("select"),
				children: "↖ Select"
			}),
			/* @__PURE__ */ (0, x.jsx)("button", {
				className: n === "vertex" ? "active" : "",
				onClick: () => r("vertex"),
				children: "＋ Vertex"
			}),
			/* @__PURE__ */ (0, x.jsx)("button", {
				className: n === "edge" ? "active" : "",
				onClick: () => r("edge"),
				children: "╱ Edge"
			}),
			/* @__PURE__ */ (0, x.jsx)("button", {
				className: n === "delete" ? "active" : "",
				onClick: () => r("delete"),
				children: "⌫ Delete"
			}),
			/* @__PURE__ */ (0, x.jsx)("span", {}),
			/* @__PURE__ */ (0, x.jsx)("button", {
				onClick: () => t({
					...e,
					nodes: e.nodes.map((e, t) => ({
						id: e.id,
						x: 110 + t % 4 * 130,
						y: 90 + Math.floor(t / 4) * 155
					}))
				}, "graph_changed"),
				children: "Layout"
			})
		]
	}), /* @__PURE__ */ (0, x.jsxs)("svg", {
		className: "canvas",
		viewBox: "0 0 600 360",
		onClick: (r) => {
			if (r.target !== r.currentTarget || n !== "vertex" || e.nodes.length >= 7) return;
			let i = l(r);
			t({
				...e,
				nodes: [...e.nodes, {
					id: ie[e.nodes.length],
					...i
				}]
			}, "graph_changed");
		},
		onPointerMove: (n) => {
			if (c.current) {
				let r = l(n);
				t({
					...e,
					nodes: e.nodes.map((e) => e.id === c.current ? {
						...e,
						...r
					} : e)
				});
			}
		},
		onPointerUp: () => c.current = null,
		role: "img",
		"aria-label": "Interactive graph editor",
		children: [
			e.nodes.length === 0 && /* @__PURE__ */ (0, x.jsx)("text", {
				className: "empty",
				x: "300",
				y: "180",
				children: "Click Vertex, then the canvas to begin"
			}),
			e.edges.map((r, i) => {
				let a = e.nodes.find((e) => e.id === r.source), o = e.nodes.find((e) => e.id === r.target);
				return a && o ? /* @__PURE__ */ (0, x.jsx)("line", {
					className: "edge",
					x1: a.x,
					y1: a.y,
					x2: o.x,
					y2: o.y,
					onClick: (r) => {
						r.stopPropagation(), n === "delete" && t({
							...e,
							edges: e.edges.filter((e, t) => t !== i)
						}, "graph_changed");
					}
				}, i) : null;
			}),
			e.nodes.map((e) => /* @__PURE__ */ (0, x.jsxs)("g", {
				className: "node",
				onClick: (t) => {
					t.stopPropagation(), u(e.id);
				},
				onPointerDown: (t) => {
					n === "select" && (c.current = e.id, t.currentTarget.setPointerCapture(t.pointerId));
				},
				children: [/* @__PURE__ */ (0, x.jsx)("circle", {
					cx: e.x,
					cy: e.y,
					r: "17",
					className: i === e.id ? "selected" : ""
				}), /* @__PURE__ */ (0, x.jsx)("text", {
					x: e.x,
					y: e.y + 5,
					children: e.id
				})]
			}, e.id))
		]
	})] });
}
function se({ bridge: e }) {
	let [t, n] = (0, ee.useState)(e.data.state), [r, i] = (0, ee.useState)([]);
	(0, ee.useEffect)(() => n(e.data.state), [e.data.state]);
	let a = e.data.analysis, o = (r, a = "graph_changed") => {
		i((e) => [...e, C(t)].slice(-20)), n(r), e.setStateValue("state", r), e.setTriggerValue("event", { type: a });
	}, s = (t) => e.setTriggerValue("event", { type: t }), c = (e) => o({
		...t,
		selectedInvariants: t.selectedInvariants.includes(e) ? t.selectedInvariants.filter((t) => t !== e) : [...t.selectedInvariants, e]
	}, "selected_invariants_changed");
	return /* @__PURE__ */ (0, x.jsxs)("main", {
		className: "workspace",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("section", {
				className: "hero",
				children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsxs)("h1", { children: ["Identify My Graph ", /* @__PURE__ */ (0, x.jsx)("span", { children: "ⓘ" })] }), /* @__PURE__ */ (0, x.jsx)("p", { children: "How little information is enough to uniquely identify your graph?" })] }), /* @__PURE__ */ (0, x.jsx)("aside", { children: "Draw a graph, select invariants, and see how many non-isomorphic graphs match. Discover the minimum set of invariants needed to identify it." })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("section", {
				className: "top-grid",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("article", {
						className: "card editor",
						children: [
							/* @__PURE__ */ (0, x.jsx)("h2", { children: "Graph Editor" }),
							/* @__PURE__ */ (0, x.jsx)(oe, {
								state: t,
								emit: o
							}),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "action-row",
								children: [
									/* @__PURE__ */ (0, x.jsx)("button", {
										onClick: () => {
											if (r.length) {
												let e = r[r.length - 1];
												i(r.slice(0, -1)), o(e, "graph_changed");
											}
										},
										disabled: !r.length,
										children: "↶ Undo"
									}),
									/* @__PURE__ */ (0, x.jsx)("button", {
										onClick: () => s("clear_graph"),
										children: "Clear"
									}),
									/* @__PURE__ */ (0, x.jsx)("button", {
										onClick: () => s("load_example"),
										children: "Load example"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("article", {
						className: "card",
						children: [
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "heading",
								children: [/* @__PURE__ */ (0, x.jsxs)("h2", { children: ["Invariants ", /* @__PURE__ */ (0, x.jsx)("span", { children: "ⓘ" })] }), /* @__PURE__ */ (0, x.jsx)("button", {
									onClick: () => o({
										...t,
										selectedInvariants: a.invariants.map((e) => e.id)
									}, "selected_invariants_changed"),
									children: "Select all"
								})]
							}),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "invariants",
								children: (a.invariants || []).map((e) => /* @__PURE__ */ (0, x.jsxs)("label", { children: [
									/* @__PURE__ */ (0, x.jsx)("input", {
										type: "checkbox",
										checked: t.selectedInvariants.includes(e.id),
										onChange: () => c(e.id),
										disabled: !a.ready
									}),
									/* @__PURE__ */ (0, x.jsx)("b", { children: e.name }),
									/* @__PURE__ */ (0, x.jsx)("span", { children: e.value })
								] }, e.id))
							}),
							/* @__PURE__ */ (0, x.jsx)("small", { children: "Exact characteristic-polynomial coefficients are used for spectral comparisons." })
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("article", {
						className: "card identification",
						children: [/* @__PURE__ */ (0, x.jsxs)("div", {
							className: "heading",
							children: [/* @__PURE__ */ (0, x.jsxs)("h2", { children: ["Identification ", /* @__PURE__ */ (0, x.jsx)("span", { children: "ⓘ" })] }), /* @__PURE__ */ (0, x.jsxs)("em", { children: ["n = ", a.order ?? 0] })]
						}), a.ready ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "metric",
								children: [
									/* @__PURE__ */ (0, x.jsx)("strong", { children: a.count }),
									/* @__PURE__ */ (0, x.jsx)("b", { children: a.count === 1 ? "candidate remains" : "candidates remain" }),
									/* @__PURE__ */ (0, x.jsxs)("span", { children: [
										"out of ",
										a.domainSize,
										" non-isomorphic graphs"
									] })
								]
							}),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "bar",
								children: /* @__PURE__ */ (0, x.jsx)("i", { style: { width: `${a.eliminated || 0}%` } })
							}),
							/* @__PURE__ */ (0, x.jsxs)("small", { children: [a.eliminated || 0, "% eliminated"] }),
							a.unique ? /* @__PURE__ */ (0, x.jsx)("div", {
								className: "success",
								children: "✓ Your graph is identified within the stated finite domain."
							}) : /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("div", {
								className: "danger",
								children: "ⓘ Your current fingerprint does not uniquely identify the graph."
							}), a.best && /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "recommend",
								children: [
									/* @__PURE__ */ (0, x.jsx)("small", { children: "✦ Best next invariant" }),
									/* @__PURE__ */ (0, x.jsx)("h3", { children: S(a.best.id, a) }),
									/* @__PURE__ */ (0, x.jsxs)("p", { children: [
										a.count,
										" → ",
										a.best.remaining,
										" candidates"
									] }),
									/* @__PURE__ */ (0, x.jsxs)("button", {
										onClick: () => s("apply_recommended_invariant"),
										children: ["＋ Add ", S(a.best.id, a)]
									})
								]
							})] }),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "minimum",
								children: [
									/* @__PURE__ */ (0, x.jsx)("b", { children: "♜ Minimum identifying set" }),
									/* @__PURE__ */ (0, x.jsx)("button", {
										onClick: () => s("compute_minimum_identifying_set"),
										children: "Compute"
									}),
									a.minimum?.length > 0 && /* @__PURE__ */ (0, x.jsx)("p", { children: a.minimum[0].map((e) => /* @__PURE__ */ (0, x.jsx)("mark", { children: S(e, a) }, e)) })
								]
							})
						] }) : /* @__PURE__ */ (0, x.jsx)("div", {
							className: "neutral",
							children: a.message
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("section", {
				className: "bottom-grid",
				children: [/* @__PURE__ */ (0, x.jsxs)("article", {
					className: "card fingerprint",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "heading",
						children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "Current Fingerprint" }), /* @__PURE__ */ (0, x.jsx)("button", {
							onClick: () => navigator.clipboard?.writeText(a.graph6 || ""),
							children: "▣ Copy"
						})]
					}), a.ready ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
						/* @__PURE__ */ (0, x.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, x.jsx)("dt", { children: "Order (n)" }),
							/* @__PURE__ */ (0, x.jsx)("dd", { children: a.order }),
							/* @__PURE__ */ (0, x.jsx)("dt", { children: "Size (m)" }),
							/* @__PURE__ */ (0, x.jsx)("dd", { children: a.size }),
							/* @__PURE__ */ (0, x.jsx)("dt", { children: "Degree sequence" }),
							/* @__PURE__ */ (0, x.jsx)("dd", { children: a.degreeSequence }),
							/* @__PURE__ */ (0, x.jsx)("dt", { children: "Triangle count" }),
							/* @__PURE__ */ (0, x.jsx)("dd", { children: a.triangleCount })
						] }),
						/* @__PURE__ */ (0, x.jsx)("small", { children: "Graph6 encoding" }),
						/* @__PURE__ */ (0, x.jsx)("code", { children: a.graph6 })
					] }) : /* @__PURE__ */ (0, x.jsx)("p", { children: a.message })]
				}), /* @__PURE__ */ (0, x.jsxs)("article", {
					className: "card gallery",
					children: [/* @__PURE__ */ (0, x.jsxs)("h2", { children: ["Candidate Graphs ", /* @__PURE__ */ (0, x.jsx)("small", { children: a.count ? `(${a.count} non-isomorphic graphs)` : "" })] }), a.ready ? /* @__PURE__ */ (0, x.jsxs)("div", {
						className: "cards",
						children: [/* @__PURE__ */ (0, x.jsxs)("div", {
							className: "candidate yours",
							children: [
								/* @__PURE__ */ (0, x.jsx)("b", { children: "Your Graph (G)" }),
								/* @__PURE__ */ (0, x.jsx)(ae, {
									graph: t,
									title: "Your graph"
								}),
								/* @__PURE__ */ (0, x.jsxs)("small", { children: [
									"n = ",
									a.order,
									" · m = ",
									a.size
								] })
							]
						}), (a.candidates || []).map((e, t) => /* @__PURE__ */ (0, x.jsxs)("div", {
							className: "candidate",
							children: [
								/* @__PURE__ */ (0, x.jsxs)("b", { children: ["Candidate #", t + 1] }),
								/* @__PURE__ */ (0, x.jsx)(ae, {
									graph: e,
									title: `Candidate ${t + 1}`
								}),
								/* @__PURE__ */ (0, x.jsxs)("small", { children: [
									"n = ",
									e.order,
									" · m = ",
									e.size
								] }),
								/* @__PURE__ */ (0, x.jsx)("code", { children: e.graph6 })
							]
						}, e.graph6))]
					}) : /* @__PURE__ */ (0, x.jsx)("div", {
						className: "neutral",
						children: "Candidate graphs will appear here when identification can begin."
					})]
				})]
			}),
			/* @__PURE__ */ (0, x.jsx)("footer", { children: "Finite Graph Atlas comparison domain: connected simple graphs with 1–7 vertices." })
		]
	});
}
var ce = /* @__PURE__ */ new WeakMap();
function le(e) {
	let t = ce.get(e.parentElement);
	t || (t = (0, te.createRoot)(e.parentElement), ce.set(e.parentElement, t)), t.render(/* @__PURE__ */ (0, x.jsx)(se, { bridge: e }));
}
export { le as default };
