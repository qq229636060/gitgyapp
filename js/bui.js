/*!
 *  BUI 简介
 *
 *  v1.4.7  date: 2018-08-31
 *
 *  BUI 是一个开放式的UI交互框架, 有着丰富的组件, 可以自由定制交互,快速开发WebApp,微信,还可以通过第三方平台开发混合移动应用.
 *
 *  BUI 专注移动快速开发
 *  -----------------------------------------------------------
 *  BUI Team
 *  部门: 政企体验创新部
 *  产品经理: 区柏荣
 *  代码设计: 王伟深 杨俊标
 *  产品设计师: 邝德如 范菊 唐竹晗
 *  -----------------------------------------------------------
 *  BUI 反馈邮箱: wangwsh_bingosoft.net
 *
 *  Copyright (c) 2016-2018
 */
var libs = window.Zepto || window.jQuery;
window.router = {};
var bui = function (e, t) {
    var i = {};
    return i.debug = !0, i.hasRouter = !1, i.isWebapp, i.currentPlatform = "", i.log = !0, i.trace = !1, i["native"] = {}, i.config = {}, i.config.namespace = "bui", i.config.classNamePrefix = i.config.namespace + "-", i.config.version = "1.4.7", i.config.versionCode = 20180831, i.version = i.config.version, i.versionCode = i.config.versionCode, i.config.viewport = {
        zoom: !0,
        create: !0
    }, i.config.init = {
        auto: !0
    }, i.config.ready = {}, i.config.ajax = {}, i.config.back = {}, i.config.load = {}, i.config.getPageParams = {}, i.config.refresh = {}, i.config.run = {}, i.config.checkVersion = {}, i.config.dialog = {}, i.config.confirm = {}, i.config.alert = {}, i.config.hint = {}, i.config.prompt = {}, i.config.loading = {}, i.config.mask = {}, i.config.list = {}, i.config.listview = {}, i.config.scroll = {}, i.config.pullrefresh = {}, i.config.select = {}, i.config.sidebar = {}, i.config.slide = {}, i.config.actionsheet = {}, i.config.dropdown = {}, i.config.accordion = {}, i.config.stepbar = {}, i.config.rating = {}, i.config.number = {}, i.config.file = {}, i.config.fileselect = {}, i.config.upload = {}, i.config.download = {}, i.config.swipe = {}, i.config.router = {}, i.config.loader = {}, i
}(libs, window);
! function (e, t) {
    return e.prefix = function (t) {
        return e.config.classNamePrefix + t
    }, e.showLog = function (t, i) {
        i = i || "";
        var n = "";
        "object" == typeof t && "message" in t && "name" in t ? n = t.message + ":" + t.name + "&&stack:" + t.stack : "string" == typeof t && (n = t), e.log && console.error(i + " " + n), e.trace && console.trace && console.trace()
    }, e.guid = function (e) {
        function t() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    }, e.swipeDirection = function (e, t, i, n) {
        var a = t - e,
            o = n - i,
            r = Math.abs(a),
            l = Math.abs(o),
            s = 9,
            c = 3;
        return !(r < s && l < s) && (r / l > c ? a > 0 ? "swiperight" : "swipeleft" : o > 0 ? "swipedown" : "swipeup")
    }, e.obj = function (i, n) {
        var a;
        n = n || null;
        var o = e.hasRouter ? router.currentPage() || "body" : "body";
        return o = n || o, i && "object" == typeof i ? a = t(i) : ("string" == typeof i && (i.indexOf("#") > -1 || i.indexOf(".") > -1) || "body" == i ? a = t(i, o) : i && (a = t("[id='" + i + "']", o)), a)
    }, e.objId = function (e) {
        return "object" == typeof e ? t(e) : ("string" == typeof e && (e.indexOf("#") > -1 || e.indexOf(".") > -1) || "body" == e ? e = t(e) : e && (e = t("[id='" + e + "']")), e)
    }, e.selector = function (e) {
        return "undefined" == typeof e ? this : t(e, this)
    }, e.widget = function (e) {
        return e && e in this ? this[e] : this
    }, e.option = function (i, n) {
        if ("object" !== e["typeof"](i) && "undefined" == typeof n) return "string" == typeof i ? this.config[i] : this.config;
        if ("id" == i) return e.showLog("不允许修改控件的ID参数"), this;
        if (i && "object" === e["typeof"](i)) {
            var a = t.extend(this.config, i);
            return this.init(a)
        }
        if (this.config.hasOwnProperty(i)) {
            var o = {};
            o[i] = n;
            var a = t.extend(this.config, o);
            return this.init(a)
        }
        return this
    }, e
}(bui || {}, libs),
function (e, t) {
    e.emitter = function () {
        function t() {
            this.handle = Object.create(null)
        }
        return t.prototype.on = function (e, t, i) {
                return "function" == typeof t ? (i = t, t = this) : (i = i, t = t || this), t.handle = t.handle || {}, "undefined" == typeof t.handle[e] && (t.handle[e] = []), t.handle[e].push(i), t
            }, t.prototype.off = function (t, i, n) {
                return "function" == typeof i ? (n = i, i = this) : "function" == typeof n ? (n = n, i = i || this) : i = this, "undefined" === t ? i.handle = {} : "string" == typeof t && "function" == typeof n ? e.array.remove(n, i.handle[t]) : "string" == typeof t && (i.handle = {}, i.handle[t] = []), i
            }, t.prototype.one = function (e, t) {
                function i() {
                    t && t.apply(this, arguments), this.off(e, i)
                }
                return this.on(e, i), this
            }, t.prototype.trigger = function (e) {
                try {
                    if (this.handle[arguments[0]] instanceof Array) {
                        var t = this.handle[arguments[0]],
                            i = [].slice.apply(arguments);
                        i.shift();
                        for (var n = 0, a = t.length; n < a; n++) t[n] && t[n].apply(this.self || this, i)
                    }
                } catch (o) {}
                return this
            },
            function (e) {
                return new t
            }
    }();
    var i = bui.emitter();
    return e.on = i.on, e.off = i.off, e.trigger = i.trigger, e.one = i.one, e
}(bui || {}, libs),
function (e, t) {
    function i(t, i) {
        function n(t) {
            var n = 100,
                a = i || 750,
                o = document.head.parentNode,
                r = t ? t : (h / a * n).toFixed(2); 
            return c = r, e.config.viewport.zoom && (o.style.fontSize = c + "px"), e.trigger.call(e, "viewportinit"), this
        }

        function a(e) {
            return h
        }

        function o(e) {
            return p
        }

        function r(e) {
            return g
        }

        function l(e) {
            return v
        }

        function s(e) {
            return f
        }
        e.trigger.call(e, "viewportbefore");
        var c, u = document.querySelector("meta[name=viewport]"),
            d = "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no",
            f = window.devicePixelRatio,
            h = document.documentElement.clientWidth,
            p = document.documentElement.clientHeight,
            g = parseInt(h) * parseInt(f),
            v = parseInt(p) * parseInt(f);
        if (u) e.config.viewport.create && (u.content = d);
        else {
            var m = document.createElement("meta");
            m.name = "viewport", m.content = d;
            var b = document.head;
            e.config.viewport.create && b.appendChild(m), m = null
        }
        var w = [240, 320, 360, 375, 384, 412, 414, 435, 480, 512, 540, 768, 1024, 1536, 2048, 2732, 534, 854],
            y = [44.44, 59.26, 66.67, 69.44, 71.11, 76.3, 76.67, 80.56, 88.89, 94.81, 100, 70, 70, 70, 70, 70, 60, 60],
            x = e.array.index(document.documentElement.clientWidth, w);
        return x > -1 && "undefined" == typeof t ? c = y[x] : n(t), {
            width: a,
            height: o,
            fontSize: c,
            screenWidth: r,
            screenHeight: l,
            ratio: s,
            init: n
        }
    }
    return e.viewport = i, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.loader = function (i) {
        function n(e) {
            return e = e || {}, y = t.extend({}, y, e), this
        }

        function o(e) {
            if ("undefined" == typeof e) return O;
            if ("object" == typeof e && ("modules" in e || "baseUrl" in e)) O = t.extend(!0, {}, O, e), C = O.modules;
            else if ("object" == typeof e && "moduleName" in e) {
                var i = r(e);
                C[e.moduleName] = i || {}, O = t.extend(!0, {}, O, {
                    modules: C
                }), C = O.modules
            }
            return O
        }

        function r(e) {
            var i = {
                    moduleName: "",
                    template: "",
                    depend: [],
                    script: "",
                    style: [],
                    isDefined: !1,
                    isLoaded: !1,
                    callback: null,
                    exports: {},
                    dependExports: []
                },
                n = {};
            e.moduleName in C && (n = C[e.moduleName]);
            var a = t.extend(!0, {}, i, n, e);
            return a
        }

        function l(t, i, n) {
            try {
                var a = s(),
                    r = a.name
            } catch (l) {}
            var u = [],
                d = [];
            if ("undefined" == typeof t) return e.showLog("define第1个参数不能为空"), this;
            if ("function" == typeof t) n = t, t = r, i = [];
            else if ("object" === e["typeof"](t)) {
                var f = t;
                t = r, i = [], n = function () {
                    return f
                }
            } else "array" === e["typeof"](t) ? (n = i, i = t, t = r) : "function" == typeof i ? (t = t, n = i, i = []) : (t = t, i = i, n = n);
            var h = t in C ? C[t].script || a.src : a.src;
            if (y.trace && console.log("define", t), i.length)
                for (var p = 0; p < i.length; p++) {
                    var g = i[p];
                    g.indexOf(".css") > -1 ? g.indexOf("css!") > -1 ? d.push(g.substr(4)) : d.push(g) : (u.push(g), g in C || o({
                        moduleName: g
                    }))
                }
            if ("string" == typeof t && "function" == typeof n) {
                var v = function () {
                    var e = [c, C[r].exports, C[r]],
                        t = [];
                    u.length && u.forEach(function (e, i) {
                        t.push(C[e].exports)
                    });
                    var i = t.concat(e);
                    return n && n.apply(this, i)
                };
                o({
                    moduleName: t,
                    depend: u,
                    style: d,
                    script: h,
                    callback: v
                })
            } else e.showLog("define " + t + "模块的参数格式不对");
            return this
        }

        function s() {
            var e, i, n = window.location.href,
                o = [],
                r = document.currentScript;
            if (n.indexOf("#") > -1 ? o = n.split("#") : o.push(n), b = o[0].replace("/index.html", "") + "/", r) return e = r.src.replace(b, ""), i = r.getAttribute("name") || e.substr("0", e.indexOf(y.scriptSuffix)), {
                name: i,
                src: e
            };
            try {
                a()
            } catch (l) {
                var s = l.stack || l.sourceURL || l.stacktrace || "",
                    c = s.split(/[@ ]/g).pop(),
                    u = c.replace(/(:\d+)?:\d+$/i, ""),
                    u = u.replace(new RegExp(b, "g"), "");
                return r = t('script[src="' + u + '"]')[0], i = r ? r.getAttribute("name") : u.replace(y.scriptSuffix, ""), {
                    name: i,
                    src: u
                }
            }
        }

        function c(t, i) {
            y.trace && console.log("require", t);
            var n = {};
            if (t && "string" == typeof t && (t = [t]), i && "function" != typeof i) return e.showLog("require第2个参数格式为function", "bui.loader.require"), n;
            try {
                u(t, function () {
                    if (f(x)) {
                        var e = [];
                        t.forEach(function (n, a) {
                            d(n), e.push(C[n] && C[n].exports), a === t.length - 1 && i && i.apply(S, e || [])
                        })
                    }
                })
            } catch (a) {
                e.showLog(a, "bui.loader.require")
            }
            return this
        }

        function u(t, i) {
            function n(e, n) {
                var a = C[e];
                a && a.depend && a.depend.length && u(a.depend, i), a && (a.isDefined = !0), n == t.length - 1 && i && i.apply(a)
            }
            return t = t || [], C = O.modules, t.forEach(function (a, o) {
                var r = C[a];
                C[a] && C[a].style && C[a] && C[a].style.length && v(C[a].style), e.array.compare(a, x) || x.unshift(a), r && r.isLoaded ? o == t.length - 1 && (i && i.apply(r), x = []) : r && r.callback && !r.script ? n(a, o) : g(a, function () {
                    C[a] && C[a].style && C[a].style.length && v(C[a].style), n(a, o)
                }, function () {
                    o == t.length - 1 && (i && i.apply(null), x = [])
                })
            }), x
        }

        function d(t) {
            C = O.modules;
            var i = "string" == typeof t ? C[t] || {} : t,
                n = i.depend || [],
                a = null,
                o = [];
            i.dependExports = [];
            try {
                if (n.length)
                    for (var r = 0; r < n.length; r++) {
                        var l = n[r],
                            s = C[l];
                        s.isLoaded ? o[r] = s.exports : o[r] = d(s) || s.exports, s.exports = o[r], i.dependExports.push(o[r]), s.isLoaded = !0
                    }
                a = i.isLoaded ? i.exports : i.callback && i.callback.apply(i, o), i.exports = a || C[i.moduleName] && C[i.moduleName].exports, i.isLoaded = !0, y.trace && console.log("execute", i.moduleName)
            } catch (c) {
                e.showLog(c, "bui.loader.execute")
            }
            return a
        }

        function f(e) {
            var t = !0,
                i = e || [];
            if (C = O.modules, i.length) i.forEach(function (e, i) {
                C[e] && C[e].isDefined === !1 && (t = !1)
            });
            else
                for (var n in C) C[n] && C[n].isDefined === !1 && (t = !1);
            return t
        }

        function h(t) {
            var i = !0,
                n = [];
            if (C = O.modules, "string" == typeof t) {
                var a = t.indexOf(",") > -1;
                a ? n = t.split(",") : n.push(t)
            } else t && "array" === e["typeof"](t) && (n = t || []); if (n.length) n.forEach(function (e, t) {
                e in C || (i = !1), C[e] && C[e].isLoaded === !1 && (i = !1)
            });
            else
                for (var o in C) C[o] && C[o].isLoaded === !1 && (i = !1);
            return i
        }

        function p(t, i, n) {
            return "string" == typeof t ? t.indexOf(".css") > -1 ? (m(item), i && i(t)) : g(t, i, n) : t && "array" === e["typeof"](t) && t.forEach(function (e, a) {
                e.indexOf(".css") > -1 ? (m(e), a == t.length - 1 && i && i(t)) : a == t.length - 1 ? g(e, i, n) : g(e)
            }), this
        }

        function g(i, n, a) {
            var o, r = this;
            if (C = O.modules, "undefined" == typeof i || "" == i) return a && a.call(r, i), this;
            if (i in C) o = i, i = C[i].script || o + y.scriptSuffix;
            else {
                var l = i.indexOf(y.scriptSuffix);
                l > -1 ? (i = i, o = i.substr(0, l)) : (o = i, i += y.scriptSuffix)
            }
            var s = document.createElement("script") || {},
                c = y.cache ? "" : "?t=" + (new Date).getTime(),
                u = i.indexOf("http://") > -1 || i.indexOf("https://") > -1;
            s.type = "text/javascript", s.async = y.async, s.src = u ? i + c : O.baseUrl + i + c, s.setAttribute("name", o), s.onload = function () {
                y.trace && console.log("create", i), n && n(i)
            }, s.onerror = function (e) {
                y.trace && console.log("createError", i), a && a(i)
            };
            var d = e.array.index(i, k),
                f = t('script[name="' + o + '"]').length || t('script[src="' + i + '"]').length;
            return d > -1 || f ? n && n(i) : d < 0 && (document.body && document.body.appendChild(s), k.push(i)), s = null, this
        }

        function v(t) {
            var i, n = t.length;
            if ("array" === e["typeof"](t))
                for (i = 0; i < n; i++) {
                    var a = t[i];
                    m(a)
                } else m(t)
        }

        function m(t) {
            if ("string" != typeof t) return void e.showLog(t + "的格式不正确");
            var i = e.array.index(t, T);
            if (i < 0) {
                var n = document.createElement("link") || {};
                n.href = t + (y.cache ? "" : "?t=" + (new Date).getTime()), n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), document.head && document.head.appendChild(n), n = null, T.push(t)
            }
        }
        var b, w = {
                cache: !0,
                async: !1,
                trace: !1,
                scriptSuffix: ".js"
            },
            y = t.extend({}, w, e.config.loader, i),
            x = [],
            k = [],
            T = [],
            O = {
                baseUrl: "",
                modules: {}
            },
            C = {},
            S = {
                init: n,
                define: l,
                require: c,
                map: o,
                "import": p,
                checkLoad: h,
                checkDefine: f
            };
        return S
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.router = function (i) {
        function n(i) {
            if (i = t.extend(!0, {}, W, e.config.router, i), W = pe.config = i, e.hasRouter = !0, he = !0, "pages/main/main.html" === i.indexModule.template && "pages/main/main.js" === i.indexModule.script || (ue = loader.map(i.indexModule)), G && "effect" in i && ie.forEach(function (e, t) {
                e.effect = i.effect
            }), !i.id) return e.showLog("id 不能为空", "bui.router.init"), !1;
            if (z = e.objId(i.id), A = bui.mask({
                appendTo: z,
                opacity: 0,
                autoClose: !1
            }), H = e.loading({
                display: "block",
                width: 30,
                height: 30,
                opacity: 0
            }), V = window.viewport.width() || document.documentElement.clientWidth, q = i.height || window.viewport.height() || document.documentElement.clientHeight, B = z.children(".bui-router-main"), B.length) B.css({
                width: V,
                height: q
            });
            else {
                var n = O(i);
                z.html(n), B = z.children(".bui-router-main")
            }
            return J || o(i), N.call(this, "init", {
                target: z[0]
            }), this
        }

        function a() {
            var e = fe.get("hasCache", 0);
            Boolean(e) && W.reloadCache ? se.load() : r()
        }

        function o(t) {
            return e.isWebapp ? window.addEventListener("load", function () {
                a()
            }, !1) : e.on("pageready", function () {
                a()
            }), W.reloadCache && window.addEventListener("beforeunload", function (e) {
                se.save(), N.call(Y, "beforeunload", {
                    target: ie[ie.length - 1]
                })
            }), W.syncHistory && "pushState" in window.history && window.addEventListener("popstate", function (t) {
                var i = l(),
                    n = "" == i.pid ? W.indexModule.moduleName : i.pid,
                    a = h(n),
                    o = e.array.index(n, ie, "pid");
                o > -1 ? (f({
                    index: a,
                    param: i.param
                }), N.call(Y, "popstate", {
                    type: "back",
                    prevTarget: ie[a - 1],
                    target: ie[a]
                })) : (c({
                    url: n,
                    param: i.param
                }), N.call(Y, "popstate", {
                    type: "load",
                    prevTarget: ie[ie.length - 2],
                    target: ie[ie.length - 1]
                }))
            }), this
        }

        function r(t) {
            try {
                var i = l();
                if (i.pid) {
                    if (i.pid.indexOf("http://") > -1 || i.pid.indexOf("https://") > -1) return void c({
                        url: i.pid,
                        param: i.param,
                        iframe: !0
                    });
                    c({
                        url: i.pid,
                        param: i.param
                    })
                } else c({
                    url: W.indexModule.moduleName,
                    param: i.param || {}
                })
            } catch (n) {
                e.showLog(n, "bui.router.loadUrl")
            }
        }

        function l(e) {
            var t = window.location.hash || window.location.search,
                e = 0 != e,
                i = t && t.indexOf("?"),
                n = i > -1 ? t && t.substr(1, i - 1) : window.location.hash.substr(1),
                a = n && n.indexOf(".html"),
                o = a > -1 ? n.substr(0, a) : n,
                r = a > -1 ? n : n + ".html",
                l = {};
            if (i > -1)
                for (var s = t && t.substr(i + 1), c = s && s.split("&"), u = 0; u < c.length; u++) {
                    var d = e ? decodeURIComponent(c[u].split("=")[1]) : c[u].split("=")[1];
                    l[c[u].split("=")[0]] = d
                }
            return {
                pid: o,
                url: r,
                param: l
            }
        }

        function s(i) {
            var n = t.Deferred(),
                a = function (t, a) {
                    return p(t.url, function (n) {
                        var o = e.guid(),
                            r = d(t.url),
                            l = r.pid,
                            s = (S({
                                id: o,
                                content: n,
                                pid: l
                            }), []);
                        se.add(l, {
                            id: o,
                            pid: l,
                            template: n
                        }), s.push(l), t.style && "array" === e["typeof"](t.style) ? t.style.forEach(function (e, t) {
                            s.push(e)
                        }) : t.style && "string" === e["typeof"](t.style) && s.push(t.style), t.script && "array" === e["typeof"](t.script) ? t.script.forEach(function (e, t) {
                            s.push(e)
                        }) : t.script && "string" === e["typeof"](t.script) && s.push(t.script), loader["import"](s, function () {
                            N.call(pe, "preloadend", {
                                prevTarget: null,
                                target: null
                            }), a && a(i)
                        }, function () {
                            N.call(pe, "preloadend", {
                                prevTarget: null,
                                target: null
                            }), a && a(i)
                        })
                    }, function (i) {
                        e.showLog(t.url + "请求失败"), n.reject(t.url)
                    }), n.promise()
                };
            return i && "object" === e["typeof"](i) ? "url" in i && a(i, function () {
                n.resolve(i)
            }) : i && "array" === e["typeof"](i) && i.forEach(function (e, t) {
                var o = i.length - 1;
                t == o ? "url" in e && a(e, function () {
                    n.resolve(i)
                }) : "url" in e && a(e)
            }), n
        }

        function c(i) {
            function n() {
                var t = S({
                    id: O,
                    content: "",
                    pid: L
                });
                B && B.attr("data-main", O).append(t), s(function () {
                    p(D, function (t, i, n) {
                        var a = e.objId(O);
                        if (a.html(t), l(), r(), f(), W.cache) {
                            S({
                                id: O,
                                content: t,
                                pid: L
                            });
                            se.add(L, {
                                id: O,
                                pid: L,
                                template: t
                            })
                        }
                        ce.add(L, {
                            id: O,
                            pid: L,
                            param: x
                        })
                    }, function (e, t, i) {
                        o(D), N.call(pe, "loadfail", e, t, i)
                    })
                })
            }

            function a() {
                p(D, function (e, t, i) {
                    c(e);
                    W.cache && se.add(L, {
                        id: O,
                        pid: L,
                        template: e
                    }), l(), s(function () {
                        b.progress && H && H.hide()
                    }), r(), f(), ce.add(L, {
                        id: O,
                        pid: L,
                        param: x
                    })
                }, function (e, t, i) {
                    o(D), N.call(pe, "loadfail", e, t, i)
                })
            }

            function o(e) {
                A && A.hide(), b.progress && H && H.hide(), ne.removeLast(), w.reject(e)
            }

            function r() {
                Z || L in te ? (u({
                    pid: L
                }), re && s()) : (loader.checkLoad(L) ? u({
                    pid: L
                }) : loader.require(L, function (t) {
                    try {
                        b.firstAnimate && b.progress && H && H.hide(), te[L] = t || null, w.resolve(t)
                    } catch (i) {
                        e.showLog(i, "bui.router.load"), w.reject()
                    }
                }), b.callback && b.callback({
                    prevTarget: y,
                    target: P
                }), N.call(pe, "complete", {
                    prevTarget: y,
                    target: P
                }))
            }

            function l() {
                $ = e.objId(R.id);
                var t = $.find(".bui-page");
                t.length && W.autoInit && e.init({
                    id: t,
                    height: q
                })
            }

            function s(t) {
                k(), T(), $ = e.objId(O);
                try {
                    K || Z || b.replace || b.part ? (A && A.hide(), !b.firstAnimate && b.progress && H && H.hide(), t && t(), $.css("zIndex", 5)) : (X && X.hide(), _ && _.show(function () {
                        A && A.hide(), !b.firstAnimate && b.progress && H && H.hide(), t && t(), $.css("zIndex", 5)
                    }))
                } catch (i) {
                    e.showLog(i, "bui.router.doAnimate")
                }
            }

            function c(t) {
                var i = "";
                if (b.part) i = I({
                    content: t
                }), b.id ? E.html(i) : e.showLog("id 不能为空", "router.loadPart");
                else if (b.replace) {
                    var n = ne.getLast();
                    E = ie.length ? e.objId(n.id) : B, n.pid = L, n.url = D, n.param = x;
                    e.array.index(L, ie, "pid");
                    i = L in ae ? se.get(L, "template") : I({
                        content: t
                    }), E.html(i).attr("data-page", L)
                } else Z || (i = S({
                    id: O,
                    content: t,
                    pid: L
                }), B && B.attr("data-main", O).append(i));
                return i
            }

            function u(e) {
                var t = e || ne.getLast(),
                    i = de[t.pid] && de[t.pid] || {},
                    n = i.callback,
                    a = n && n.apply(i, i.dependExports) || i.exports;
                te[t.pid] = a || null, i.exports = a, Z = !1, K = !1, N.call(pe, "refresh", {
                    prevTarget: y,
                    target: t
                }), w.resolve(a)
            }

            function f() {
                var e = ie[ie.length - 2] || null,
                    t = ne.getLast();
                K && (N.call(pe, "firstload", {
                    prevTarget: e,
                    target: t
                }), K = !1), b.part ? N.call(pe, "loadpart", {
                    prevTarget: e,
                    target: t
                }) : N.call(pe, "load", {
                    prevTarget: e,
                    target: t
                })
            }

            function h(e) {
                var t = se.get(e.pid, "template");
                c(t), e.part ? (u(e), A && A.hide(), e.progress && H && H.hide()) : (l(), !Z && s(function () {
                    e.progress && H && H.hide()
                }), u(e), A && A.hide())
            }

            function g() {
                p(D, function (t, i, n) {
                    var a = e.objId(O);
                    a.html(t), r(), f(), W.cache && se.add(L, {
                        id: O,
                        pid: L,
                        template: t
                    }), A && A.hide(), b.progress && H && H.hide()
                }, function (e, t, i) {
                    o(D), N.call(pe, "loadfail", e, t, i)
                })
            }

            function v(e) {
                var t = C({
                    id: e.id,
                    pid: e.pid,
                    url: e.url,
                    param: e.param
                });
                B && B.attr("data-main", e.id).append(t), s(function () {
                    b.progress && H && H.hide()
                })
            }
            var m = {
                    id: "",
                    url: "",
                    param: {},
                    effect: "",
                    firstAnimate: W.firstAnimate,
                    progress: W.progress,
                    reload: W.reload,
                    replace: !1,
                    iframe: !1,
                    part: !1,
                    callback: null
                },
                b = t.extend(!0, {}, m, i),
                w = t.Deferred(),
                y = ne.getLast() || null,
                x = (ie[ie.length - 2] || null, b.param || {});
            b.id = (b.id && b.id.indexOf("#") > -1 ? b.id.substr(1) : b.id) || "";
            var O = b.replace ? y.id : b.id || e.guid(),
                E = e.objId(O);
            if (!b.url) return e.showLog("url 不能为空", "bui.router.load"), w.promise();
            if (b.url.indexOf("tel:") >= 0 || b.url.indexOf("mailto:") >= 0 || b.url.indexOf("sms:") >= 0) return e.unit.openExtral(b.url), w.promise();
            "undefined" == b.url && (b.url = "main"), A && A.show(), b.progress && H && H.show();
            var j = d(b.url),
                L = j.pid,
                D = b.iframe ? b.url : j.url,
                P = {
                    id: O,
                    pid: L,
                    url: D,
                    replace: b.replace,
                    param: x,
                    part: {},
                    effect: i.effect || W.effect
                };
            if (N.call(pe, "loadbefore", {
                prevTarget: y,
                target: P
            }), ie.length) {
                var F = ie.length - 1;
                ie[F].effect = b.effect
            }!Z && !b.part && !b.replace && ne.add(P), b.replace && ne.replace(P);
            var R = ne.getLast();
            if (b.part && (R.part[L] = {
                id: O,
                pid: L,
                url: D,
                param: x
            }, ie.splice(ie.length - 1, 1, R)), b.part || (le = P), L in ae) h({
                pid: L,
                progress: b.progress,
                part: b.part
            }), b.callback && b.callback({
                prevTarget: y,
                target: P
            }), N.call(pe, "complete", {
                prevTarget: y,
                target: P
            });
            else {
                if (b.iframe) return v({
                    id: O,
                    pid: L,
                    url: b.url,
                    param: x
                }), w.promise();
                if (b.part) return g(), w.promise();
                if (b.firstAnimate) return n(), w.promise();
                a()
            }
            return w.promise()
        }

        function u(e) {
            var i = {
                    id: "",
                    url: "",
                    param: {},
                    part: !0
                },
                n = t.extend(!0, {}, i, e),
                a = c(n);
            return a.promise()
        }

        function d(e) {
            var t = "",
                i = e;
            ue = loader.map(), de = ue.modules;
            var n = i.indexOf(W.pageSuffix);
            return n > -1 ? (t = i, i = t.substr(0, n), i in de || (i = y(t) || i)) : (i = i, t = de[i] && de[i].template || i + W.pageSuffix || ""), {
                pid: i,
                url: t
            }
        }

        function f(i) {
            var n = this,
                a = t.extend(!0, {
                    index: -1,
                    name: "",
                    callback: null
                }, i),
                o = parseInt(a.index),
                r = ie.length;
            if (o > 0) return void e.showLog("index 参数只能是负数", "bui.router.back");
            var l = ne.getLast(),
                s = r - 1;
            return N.call(pe, "backbefore", {
                prevTarget: null,
                target: l
            }), a.name && (o = h(a.name)), Math.abs(o) > s && (o = -s), r > 1 && Q && (o < -1 && T(o), Q = !1, i.effect && (X.option({
                effect: i.effect
            }), _.option({
                effect: i.effect
            })), X && X.show(), _ && _.hide(function () {
                function t() {
                    var e = {};
                    e = te[c] || {}, a.callback && a.callback.call(n, e, s), N.call(pe, "back", {
                        prevTarget: l,
                        target: s
                    }), le = s, Q = !0
                }
                var i = r + o;
                x(i), ne.removeNext(i), T();
                var s = k(),
                    c = s.pid;
                e.objId(s.id).css("zIndex", 5), t()
            })), this
        }

        function h(t) {
            var i, n = e.array.indexs(t, ie, "pid"),
                a = n.length;
            if (a) {
                var o = -(ie.length - n[a - 1] - 1);
                i = 0 == o ? -1 : o
            } else i = -1;
            return i
        }

        function p(i, n, a) {
            i ? t.ajax({
                url: i,
                dataType: "html",
                async: W.async,
                success: function (e, t, a) {
                    a.url = i, n && n(e, t, a), N.call(pe, "success", e, t, a)
                }, error: function (e, t, i) {
                    a && a(e, t, i), N.call(pe, "fail", e, t, i)
                }
            }) : e.showLog("url 不能为空", "bui.router.requestUrl")
        }

        function g() {
            Z = !0;
            var e = ie.length - 1,
                t = ie[e];
            return c({
                id: t.id,
                url: t.url,
                param: t.param
            }), this
        }

        function v(e) {
            return e = e || {}, c({
                url: e.url || "",
                param: e.param || {}, replace: !0
            }), this
        }

        function m() {
            var e = ne.getLast();
            return e.param
        }

        function b(t) {
            if ("undefined" == typeof t) return void e.showLog("必须传模块id才能获取参数,可以通过define的module参数获取");
            var i = ne.getLast(),
                n = null,
                a = t in i.part ? i.part[t] : {};
            return "param" in a && (n = a.param), n
        }

        function w(e) {
            var t;
            return e && (t = e in te), t
        }

        function y(t) {
            for (var i in de) try {
                var n = de[i].template || "";
                if (n === t) return i
            } catch (a) {
                e.showLog(a.message)
            }
        }

        function x(e) {
            B.children().each(function (i, n) {
                i >= e && t(n).remove()
            })
        }

        function k() {
            var t = ne.getLast(),
                i = t.id || "",
                n = t.effect || W.effect;
            return i && (_ = null, _ = e.toggle({
                id: document.getElementById(i),
                effect: ee[n].inRight || ""
            }), B && B.attr("data-main", i), N.call(pe, "pageshow", {
                target: t
            })), t
        }

        function T(t) {
            t = t || -1;
            var i = ie.length + t - 1,
                n = ie[i],
                a = n && n.id || "",
                o = n && n.effect || W.effect;
            return a && (X = null, X = e.toggle({
                id: document.getElementById(a),
                effect: ee[o].inLeft || ""
            })), N.call(pe, "pagehide", {
                target: n
            }), n
        }

        function O(e) {
            e = e || {};
            var t = "";
            return t += '<div class="bui-router-main" style="width:' + V + "px;height:" + q + 'px;">', t += "</div>"
        }

        function C(t) {
            var i = t.param ? e.setUrlParams(t.url, t.param) : t.url,
                n = "";
            return n += '<div id="' + t.id + '" class="bui-router-item" data-page="' + t.pid + '">', n += '<iframe class="bui-router-iframe" src="' + i + '"></iframe>', n += "</div>"
        }

        function S(e) {
            var t = "";
            return t += '<div id="' + e.id + '" class="bui-router-item" data-page="' + e.pid + '">', t += e.content || "", t += "</div>"
        }

        function I(e) {
            var t = "";
            return t += e.content
        }

        function E(t, i) {
            return G = !0, e.option.call(pe, t, i)
        }

        function j(t, i) {
            return e.on.apply(pe, arguments), this
        }

        function L(t, i) {
            return e.off.apply(pe, arguments), this
        }

        function N(t) {
            pe.self = this == window || this == pe ? null : this, e.trigger.apply(pe, arguments)
        }

        function D() {
            return le
        }

        function P(e) {
            var t = document.getElementById(le.id);
            return t
        }

        function F(e) {
            var i = document.getElementById(le.id) || document;
            return t(e, i)
        }

        function R(e) {
            return le.id
        }

        function M(i) {
            var n = ne.getLast(),
                a = e.objId(n.id),
                o = "object" == typeof i ? t(i) : a.find(".bui-page");
            return o.length && e.init({
                id: o,
                height: q
            }), this
        }
        var z, H, A, V, q, U = {
                id: "",
                progress: !1,
                syncHistory: !0,
                autoInit: !0,
                firstAnimate: !1,
                indexModule: {
                    moduleName: "main",
                    template: "pages/main/main.html",
                    script: "pages/main/main.js"
                },
                cache: !0,
                reloadCache: !1,
                reload: !1,
                height: 0,
                async: !0,
                effect: "push",
                hashPrefix: "#",
                scriptSuffix: ".js",
                pageSuffix: ".html"
            },
            W = t.extend({}, U, e.config.router, i),
            $ = null,
            Y = this,
            B = null,
            X = null,
            _ = null,
            J = !1,
            K = !0,
            Q = !0,
            Z = !1,
            G = !1,
            ee = {
                none: {
                    inRight: "showIn",
                    inLeft: "showIn"
                },
                fadein: {
                    inRight: "fadeIn",
                    inLeft: "fadeIn"
                },
                fadeinslide: {
                    inRight: "fadeInRight",
                    inLeft: "fadeInLeft"
                },
                slide: {
                    inRight: "slideInRight",
                    inLeft: "slideInLeft"
                },
                push: {
                    inRight: "pushInRight",
                    inLeft: "pushInLeft"
                },
                zoom: {
                    inRight: "zoomIn",
                    inLeft: "zoomIn"
                },
                cover: {
                    inRight: "coverInRight",
                    inLeft: "coverInLeft"
                },
                zoomslide: {
                    inRight: "zoomSlideInRight",
                    inLeft: "zoomSlideInLeft"
                }
            },
            te = {},
            ie = [],
            ne = {},
            ae = {},
            oe = {},
            re = !1,
            le = {},
            se = {},
            ce = {},
            ue = loader.map(W.indexModule),
            de = ue.modules,
            fe = e.storage({
                local: !1
            }),
            he = !1;
        ne.get = function () {
            return ie
        }, ne.add = function (t) {
            t = t || {};
            var i = window.location.origin + window.location.pathname + "#" + t.pid,
                n = e.setUrlParams(i, t.param);
            if (ie.push(t), !K) return W.syncHistory && "pushState" in window.history && window.history.pushState(t, null, n), ie
        }, ne.replace = function (t) {
            t = t || {};
            var i = ie.length - 1,
                n = window.location.origin + window.location.pathname + "#" + t.pid,
                a = e.setUrlParams(n, t.param);
            return i > -1 && (ie.splice(i, 1, t), W.syncHistory && "replaceState" in window.history && window.history.replaceState(t, null, a)), ie
        }, ne.getLast = function (e) {
            var t = ie.length - 1,
                i = ie[t] || {};
            return e ? i[e] : i
        }, ne.removeNext = function (t) {
            var i = ie.length - t;
            ie.splice(t, i);
            var n = ne.getLast(),
                a = window.location.origin + window.location.pathname + "#" + n.pid,
                o = e.setUrlParams(a, n.param);
            W.syncHistory && "replaceState" in window.history && window.history.replaceState(n.param, null, o)
        }, ne.removeLast = function () {
            var e = ie.length - 1;
            ne.removeNext(e)
        }, se.add = function (e, t) {
            return ae[e] = t || {}, ae[e]
        }, se.get = function (e, t) {
            if (t) {
                var i = ae[e] || {};
                return i[t]
            }
            return ae[e]
        }, se.save = function () {
            if (ie.length > 1) {
                var e = z.html();
                fe.set("cacheHtml", e), fe.set("cacheHistory", ie), fe.set("hasCache", "true")
            }
        }, se.load = function () {
            var t = fe.get("cacheHtml", 0),
                i = fe.get("cacheHistory", 0),
                n = [];
            if (i.length > 1) {
                z.html(t), B = z.children(".bui-router-main");
                try {
                    i.forEach(function (e, t) {
                        var i = "string" == typeof e ? JSON.parse(e) : e;
                        n.push(i)
                    });
                    var a = n[n.length - 1];
                    le = a, loader.require(a.pid, function (e) {
                        te[a.pid] = e || null
                    }), j("back", function (e) {
                        loader.require(e.target.pid, function (t) {
                            te[e.target.pid] = t || null
                        })
                    })
                } catch (o) {
                    e.showLog(o)
                }
                ie = n, k(), T(), K = !1, re = !0, se.clear()
            }
        }, se.clear = function () {
            fe.remove("cacheHistory"), fe.remove("cacheHtml"), fe.remove("hasCache")
        }, ce.add = function (e, t) {
            return oe[e] = t || {}, oe[e]
        }, ce.get = function (e, t) {
            if (t) {
                var i = oe[e] || {};
                return i[t]
            }
            return oe[e]
        };
        var pe = {
            init: n,
            option: E,
            data: {},
            on: j,
            off: L,
            load: c,
            loadPart: u,
            replace: v,
            refresh: g,
            back: f,
            isLoad: w,
            $: F,
            currentId: R,
            currentPage: P,
            currentModule: D,
            getPageParams: m,
            getPartParams: b,
            getHistory: ne.get,
            preload: s,
            initScroll: M,
            history: {
                get: ne.get,
                getLast: ne.getLast
            }
        };
        return pe
    }, e
}(bui || {}, libs),
function (ui, $) {
    return ui.objectToKeyString = function (e, t) {
        var i = "";
        for (var n in e) {
            var a = t ? encodeURIComponent(e[n]) : e[n];
            i += "&" + n + "=" + a
        }
        return i.substr(1)
    }, ui.keyStringToObject = function (e, t) {
        var i, n = {},
            a = [];
        try {
            for (a = e.split("&"), i = 0; i < a.length; i++) {
                var o = t ? decodeURIComponent(a[i].split("=")[1]) : a[i].split("=")[1];
                n[a[i].split("=")[0]] = o
            }
        } catch (r) {
            ui.showLog(r)
        }
        return n
    }, ui.setUrlParams = function (e, t, i) {
        var n, i = 0 != i,
            t = "object" == typeof t ? t : {},
            a = this.objectToKeyString(t, i);
        return n = "" == a ? e : e + "?" + a
    }, ui.getUrlParams = function (e) {
        var e = 0 != e,
            t = window.location.search,
            i = {};
        if (t.indexOf("?") > -1) {
            var n = t.substr(1);
            i = this.keyStringToObject(n, e)
        }
        return i
    }, ui.getUrlParam = function (e) {
        var t = window.location.search,
            i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
            n = t.substr(1).match(i);
        return null != n ? decodeURIComponent(n[2]) : null
    }, ui["typeof"] = function (e) {
        var t = Object.prototype.toString.call(e).slice(8, -1);
        return t = t.toLowerCase()
    }, ui.jsonToString = function (e) {
        function t(e) {
            function t(e, t) {
                var a = e[t];
                return a && "object" === ui["typeof"](a) ? e[t] = i(a) : a && "array" === ui["typeof"](a) ? e[t] = n(a) : e[t] = a, e[t]
            }
            var a;
            if ("object" === ui["typeof"](e)) {
                for (var o in e) e[o] = t(e, o);
                a = JSON.stringify(e)
            } else "array" === ui["typeof"](e) ? (e.forEach(function (i, n) {
                e[n] = t(e, n)
            }), a = JSON.stringify(e)) : a = e;
            return a
        }

        function i(e) {
            if (e && "object" === ui["typeof"](e)) {
                for (var t in e) {
                    var i = e[t];
                    "object" == typeof i && (e[t] = JSON.stringify(i))
                }
                return e
            }
        }

        function n(e) {
            if (e && "array" === ui["typeof"](e)) return e.forEach(function (t, i) {
                "object" == typeof t && (e[i] = JSON.stringify(t))
            }), e
        }
        var a;
        return a = "object" == typeof e ? t(e) : e
    }, ui.stringToJson = function (jsonStr) {
        function stringToObject(str) {
            var data, dataObj;
            try {
                if (data = eval(str), "array" === ui["typeof"](data)) data.forEach(function (e, t) {
                    data[t] = stringToObject(e)
                });
                else if ("object" === ui["typeof"](data))
                    for (var i in data) {
                        var item = data[i];
                        data[i] = stringToObject(item)
                    }
                dataObj = data
            } catch (e) {
                dataObj = str
            }
            return dataObj
        }
        var jsonObj;
        return jsonObj = jsonStr && stringToObject(jsonStr)
    }, ui.checkTargetInclude = function (e, t) {
        var i = t,
            n = [];
        if (i.indexOf(",") > -1) {
            n = i.split(",");
            var a, o = n.length;
            for (a = 0; a < o; a++) {
                var r = n[a];
                r.indexOf(".") > -1 && (n[a] = r.substr(1))
            }
        } else i.indexOf(".") > -1 ? n[0] = i.substr(1) : n[0] = i;
        var l, s = n.length;
        for (l = 0; l < s; l++)
            if ($(e).hasClass(n[l])) return !0;
        return !1
    }, ui
}(bui || {}, libs),
function (e, t) {
    return e.array = {}, e.array.index = e.inArray = function (t, i, n) {
        var i = i || [];
        if ("string" != typeof n) {
            var a = i.indexOf(t);
            return a
        }
        for (var o in i) try {
            var r = i[o] && i[o][n];
            if (r === t) return parseInt(o)
        } catch (l) {
            e.showLog(l.message, "bui.inArray")
        }
        return -1
    }, e.array.compare = e.compareArray = function (e, t, i) {
        var t = t || [];
        if ("string" != typeof i) {
            var n = t.indexOf(e);
            return n > -1
        }
        for (var a in t) try {
            var o = t[a] && t[a][i];
            if (o === e) return !0
        } catch (r) {}
        return !1
    }, e.array.remove = e.removeArray = function (e, t, i) {
        var n = t || [];
        return n.map(function (t, a) {
            try {
                var o = "string" == typeof i || "number" == typeof i ? t[i] : t;
                o === e && n.splice(a, 1)
            } catch (r) {}
        }), n
    }, e.array.filter = e.filterArray = function (e, t, i) {
        var n = [],
            t = t || [];
        if ("string" == typeof i)
            for (var a in t) try {
                var o = t[a] && t[a][i],
                    r = new RegExp(e);
                r.test(o) && n.push(t[a])
            } catch (l) {} else t.map(function (i, a, o) {
                var r = new RegExp(e);
                return r.test(i) && n.push(t[a]), i === e
            });
        return n
    }, e.array.indexs = e.indexArray = function (e, t, i) {
        var t = t || [],
            n = [];
        if ("string" == typeof i)
            for (var a in t) try {
                var o = t[a] && t[a][i];
                o === e && n.push(+a)
            } catch (r) {} else t.forEach(function (t, i, a) {
                t === e ? n.push(+i) : n
            });
        return n
    }, e.array.excess = e.excessArray = function (e, t, i) {
        var t = t || [],
            n = {},
            a = [];
        if ("string" == typeof i)
            for (var o in t) try {
                var r = t[o] && t[o][i];
                n[r] !== r && (n[r] = r, a.push(t[o]))
            } catch (l) {} else t.forEach(function (e, t, i) {
                n[e] !== e && (n[e] = e, a.push(e))
            });
        return a
    }, e.array.copy = e.copyArray = function (t, i, n) {
        var a = [];
        if (form = i || 0, n = n || t && t.length, !t || "array" === e["typeof"](t)) {
            t.forEach(function (e, t) {
                a.push(e)
            });
            var o = a.splice(i, n) || [];
            return o
        }
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.storage = function (t) {
        function i(t, i, n) {
            var a = 1 == r ? null : d.getItem(t),
                o = [],
                l = "",
                s = n ? i[n] : i;
            if (null === a) {
                o.push(i), l = JSON.stringify(o);
                try {
                    d.setItem(t, l)
                } catch (c) {
                    "QuotaExceededError" == c.name && console.log("超出本地存储限额！")
                }
            } else {
                var f = JSON.parse(a),
                    h = n ? e.array.compare(s, f, n) : e.array.compare(s, f);
                if (h) {
                    e.array.remove(s, f, n), f[u](i);
                    try {
                        l = JSON.stringify(f), d.setItem(t, l)
                    } catch (c) {
                        "QuotaExceededError" == c.name && console.log("超出本地存储限额！")
                    }
                } else {
                    f[u](i), f.length > r && 0 != r && f.pop();
                    try {
                        l = JSON.stringify(f), d.setItem(t, l)
                    } catch (c) {
                        "QuotaExceededError" == c.name && console.log("超出本地存储限额！")
                    }
                }
            }
            return this
        }

        function n(t, i, n) {
            var a, o = d.getItem(t) || "";
            try {
                a = o && JSON.parse(o)
            } catch (r) {
                a = o, e.showLog(r.name + ": " + r.message, "bui.storage.get")
            }
            if ("number" == typeof i && n) a = a && a[i] && a[i][n] || void 0;
            else if ("string" == typeof i) {
                var l = e.array.index(i, a, n);
                a = a && a[l]
            } else a = "number" == typeof i ? a && a[i] || void 0 : a;
            return a
        }

        function a(t, i, a) {
            if ("string" != typeof t) return void e.showLog("要删除的字段名只能是字符串", "bui.storage.remove");
            var o = n(t) || [];
            if ("number" == typeof i) {
                var r = "number" == typeof a ? a : r;
                o.splice(i, r);
                try {
                    var l = JSON.stringify(o) || "";
                    d.setItem(t, l)
                } catch (s) {
                    e.showLog(s.name + ": " + s.message, "bui.storage.remove")
                }
            } else if ("string" == typeof i) {
                var c = e.array.remove(i, o, a);
                try {
                    var l = JSON.stringify(c) || "";
                    d.setItem(t, l)
                } catch (s) {
                    e.showLog(s.name + ": " + s.message, "bui.storage.remove")
                }
            } else d.removeItem(t);
            return this
        }

        function o() {
            return d.clear(), this
        }
        var r, l, s, c = 1;
        "number" == typeof t || "string" == typeof t ? (r = 0 == parseInt(t) ? 0 : parseInt(t) || c, s = !0, l = !0) : "object" == typeof t ? (r = t && 0 == t.size ? 0 : t.size || c, s = !t || 0 != t.local, l = !t || 0 != t.reverse) : (r = c, s = !0, l = !0);
        var u = l ? "push" : "unshift",
            d = s ? localStorage : sessionStorage;
        return {
            get: n,
            set: i,
            remove: a,
            clear: o
        }
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.unit = {}, e.unit.remToPx = function (e) {
        var t = window.viewport && window.viewport.fontSize || 100,
            e = (parseFloat(e) * t).toFixed(2);
        return e
    }, e.unit.pxToRem = function (e) {
        var t = window.viewport && window.viewport.fontSize || 100,
            e = (parseFloat(e) / t).toFixed(2);
        return e
    }, e.unit.pxToRemZoom = function (e) {
        var t = 100,
            e = (parseFloat(e) / t).toFixed(2);
        return e
    }, e.unit.debounce = function (e, t, i) {
        var n;
        return function () {
            var a = i || this,
                o = arguments,
                r = function () {
                    n = null, e.apply(a, o)
                };
            clearTimeout(n), n = setTimeout(r, t)
        }
    }, e.unit.throttle = function (e, t, i) {
        t || (t = 250);
        var n, a;
        return function () {
            var o = i || this,
                r = +new Date,
                l = arguments;
            n && r < n + t ? (clearTimeout(a), a = setTimeout(function () {
                n = r, e.apply(o, l)
            }, t)) : (n = r, e.apply(o, l))
        }
    }, e.unit.startWithCss = function (e) {
        var t = new RegExp("^\\.|^#"),
            i = "string" == typeof e && t.test(e);
        return i
    }, e.unit.startWithId = function (e) {
        var t = new RegExp("^#"),
            i = "string" == typeof e && t.test(e);
        return i
    }, e.unit.startWithClass = function (e) {
        var t = new RegExp("^\\."),
            i = "string" == typeof e && t.test(e);
        return i
    }, e.unit.tel = function (t) {
        var i, t = String(t),
            n = "tel:",
            a = /(^1\d{10}$)|(^0\d{2,3}-?\d{7,8}$)/;
        return a.test(t) || 0 === t.indexOf("+") ? (0 == t.indexOf("+") && (n = "wtai://wp/mc;"), i = t, window.location.href = n + i, e) : e
    }, e.unit.sms = function (t, i) {
        var n = navigator.userAgent,
            a = /(iPhone|iPad|iOS)/i.test(n),
            o = a ? "&" : "?";
        return window.location.href = "sms:" + t + o + "body=" + i, e
    }, e.unit.mailto = function (t) {
        var t = "email" in t ? t : {};
        return "string" == typeof t.email && t.email.indexOf("@") > 0 ? window.location.href = "mailto:" + t.email + "?subject=" + (t.subject || "") + "&body=" + (t.body || "") + "&cc=" + (t.cc || "") : e.showLog(email + "格式不正确"), e
    }, e.unit.openExtral = function (t) {
        var i = [],
            n = "",
            t = String(t);
        if (t.indexOf("mailto:") >= 0)
            if (i = t.split("mailto:"), n = i[1], n.indexOf("?") > -1) {
                var a = n.split("?"),
                    o = e.keyStringToObject(a[1]);
                o.email = a[0], e.unit.mailto(o)
            } else e.unit.mailto({
                email: n
            });
        if (t.indexOf("tel:") >= 0 && (i = t.split("tel:"), n = parseInt(i[1]), e.unit.tel(n)), t.indexOf("sms:") >= 0)
            if (i = t.split("sms:"), n = i[1], t.indexOf("=") >= 0) {
                var r = t.split("="),
                    l = r[1];
                e.unit.sms(n, l)
            } else e.unit.sms(n);
        return e
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.platform = function () {
        function e(e) {
            return /Windows NT/i.test(c)
        }

        function t() {
            return /Macintosh/i.test(c)
        }

        function i(e) {
            return /(Android|Linux)/i.test(c)
        }

        function n(e) {
            return /(iPhone)/i.test(c)
        }

        function a(e) {
            var t = !1;
            return 3 == window.devicePixelRatio && 375 == document.documentElement.clientWidth && 812 == document.documentElement.clientHeight && (t = !0),
                t
        }

        function o(e) {
            return /(iPad)/i.test(c)
        }

        function r(e) {
            return /(iPhone|iPad|iOS)/i.test(c)
        }

        function l(e) {
            return /(micromessenger)/i.test(c)
        }

        function s(e) {
            return /(crosswalk)/i.test(c)
        }
        var c = navigator.userAgent;
        return {
            isAndroid: i,
            isIphone: n,
            isIpad: o,
            isIos: r,
            isWeiXin: l,
            isBingotouch: s,
            isMac: t,
            isIphoneX: a,
            isWindow: e
        }
    }(), e
}(bui || {}, libs),
function (e, t) {
    return e.checkVersion = function (i) {
        function n(e) {
            r(e)
        }

        function a() {
            e.platform.isIos() ? e.run({
                id: f,
                "native": h["native"]
            }) : e.run({
                id: d,
                "native": h["native"]
            })
        }

        function o(i) {
            g.on("click", function () {
                m < s ? (T(), k({
                    title: "新版本" + u,
                    content: c,
                    buttons: i.buttons,
                    width: i.width,
                    height: i.height,
                    mask: i.mask,
                    callback: function () {
                        var e = t(this).text().trim();
                        "立即下载" == e && a()
                    }
                })) : (O(), e.hint(y)), i.callback && i.callback.call(this)
            }), v = !0
        }

        function r(i) {
            e.ajax(i).done(function (n) {
                var r = n,
                    l = parseInt(r.minVersionCode);
                d = r.downloadUrl || "", f = r.iosDownloadUrl || "", c = r.remark || "检测到新版本" + u + ",是否立即下载", s = parseInt(r.versionCode), u = r.versionName, r.isForced ? (T(), m < l ? k({
                    title: i.title,
                    content: w,
                    width: i.width,
                    height: i.height,
                    mask: i.mask,
                    autoClose: !1,
                    buttons: [{
                        name: "立即下载",
                        className: "primary-reverse"
                    }],
                    callback: function () {
                        try {
                            a()
                        } catch (t) {
                            e.showLog(t)
                        }
                    }
                }) : m > l && m < s ? k({
                    title: i.title,
                    content: c,
                    buttons: i.buttons,
                    width: i.width,
                    height: i.height,
                    mask: i.mask,
                    callback: function () {
                        try {
                            var i = t(this).text().trim();
                            "立即下载" == i && a()
                        } catch (n) {
                            e.showLog(n)
                        }
                    }
                }) : (O(), e.hint(y))) : m < s ? T() : O(), h.onSuccess && h.onSuccess(r), !v && h.id && o(i)
            }).fail(function (t) {
                h.onFail && h.onFail(), i.tips.fail && e.hint(i.tips.fail)
            })
        }
        var l = {
            id: "",
            target: "i",
            title: "版本更新",
            tips: {
                nowVersion: "",
                minVersion: "您的版本太低,需要卸载安装最新版才能正常使用!",
                fail: "网络超时,请检测网络再次尝试"
            },
            currentVersion: "",
            currentVersionCode: "",
            width: 400,
            height: 260,
            mask: !0,
            url: "",
            data: {},
            "native": !0,
            method: "GET",
            buttons: [{
                name: "取消",
                className: ""
            }, {
                name: "立即下载",
                className: "primary-reverse"
            }],
            timeout: 2e4,
            callback: null,
            onSuccess: null,
            onFail: null
        };
        i = i || {};
        var s, c, u, d, f, h = t.extend(!0, l, e.config.checkVersion, i),
            p = '<span class="bui-badges"></span>',
            g = t(h.id),
            v = !1,
            m = parseInt(h.currentVersionCode || e.config.versionCode),
            b = h.currentVersion || e.config.version,
            w = h.tips.minVersion,
            y = h.tips.nowVersion || "您目前的版本" + b + ",已经是最新了 ^_^",
            x = h.target.indexOf("#") > -1 ? e.obj(h.target) : g ? g.find(h.target) : null,
            k = e.confirm;
        n(h);
        var T = function () {
                var e = x && x.find(".bui-badges").length;
                e || x && x.append(p)
            },
            O = function () {
                x && x.find(".bui-badges").remove()
            }
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.timer = function (i) {
        function n() {
            return d = h, f = !0, clearTimeout(p), this
        }

        function a() {
            return h = c ? s.times : 0, clearTimeout(p), g(), this
        }

        function o() {
            if (f && (h = d, f = !1), 0 == h) return h = 0, u && u.text(h), s.onEnd && s.onEnd.call(this), void clearTimeout(p);
            var e = h < 10 ? "0" + h : h;
            return u && u.text(e), s.onProcess && s.onProcess.call(this, h), h--, p = setTimeout(function () {
                o()
            }, s.interval), this
        }

        function r() {
            if (f && (h = d, f = !1), h == s.times) return s.onEnd && s.onEnd.call(this), h = s.times, u && u.text(h), void clearTimeout(p);
            var e = h < 10 ? "0" + h : h;
            return u && u.text(e), s.onProcess && s.onProcess.call(this, h), h++, p = setTimeout(function () {
                r()
            }, s.interval), this
        }
        var l = {
                interval: 1e3,
                target: null,
                reduce: !0,
                onEnd: null,
                onProcess: null,
                times: 10
            },
            s = t.extend({}, l, i),
            c = s.reduce,
            u = s.target ? e.obj(s.target) : null,
            d = 0,
            f = !1,
            h = c ? s.times : 0,
            p = null,
            g = c ? o : r;
        return {
            stop: function () {
                d = 0, h = c ? s.times : 0, clearTimeout(p)
            }, start: g,
            restart: a,
            pause: n
        }
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.animate = function (i) {
        function n(t) {
            return t.id ? (L = e.objId(t.id), L.css({
                "-webkit-transition": H,
                transition: H
            }), N = t.open3D, D = t.zoom, P = t.animates || [], R = F.config = t, this) : void e.showLog("animate id不能为空", "bui.animate")
        }

        function a(e) {
            var e = e,
                t = Math.abs(parseFloat(e));
            e = "string" == typeof e && e.indexOf("%") > -1 ? "-" + e : D ? -(t / 100) + "rem" : -t + "px";
            var i = "translateX(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function o(e) {
            var e = e,
                t = Math.abs(parseFloat(e));
            e = "string" == typeof e && e.indexOf("%") > -1 ? e : D ? t / 100 + "rem" : t + "px";
            var i = "translateX(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function r(e) {
            var e = e,
                t = Math.abs(parseFloat(e));
            e = "string" == typeof e && e.indexOf("%") > -1 ? "-" + e : D ? -(t / 100) + "rem" : -t + "px";
            var i = "translateY(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function l(e) {
            var e = e,
                t = Math.abs(parseFloat(e));
            e = "string" == typeof e && e.indexOf("%") > -1 ? e : D ? t / 100 + "rem" : t + "px";
            var i = "translateY(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function s(e) {
            var t = String(e),
                e = t.indexOf(",") > -1 ? t : e + ",1",
                i = "scale(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function c(e) {
            var e = String(e),
                t = "scaleX(" + e + ")";
            return P.push(t), M.push(t), this
        }

        function u(e) {
            var e = String(e),
                t = "scaleY(" + e + ")";
            return P.push(t), M.push(t), this
        }

        function d(e) {
            var t = String(e),
                e = t.indexOf("deg") > -1 ? t : t + "deg",
                i = "rotate(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function f(e) {
            var t = String(e),
                e = t.indexOf("deg") > -1 ? t : t + "deg",
                i = "rotateX(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function h(e) {
            var t = String(e),
                e = t.indexOf("deg") > -1 ? t : t + "deg",
                i = "rotateY(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function p(e) {
            var e, i = String(e),
                n = [];
            i.indexOf(",") > -1 ? (n = i.split(","), e = "", t.each(n, function (t, i) {
                t < 2 && (e += i.indexOf("deg") > -1 ? "," + i : "," + i + "deg")
            }), e = e.substr(1)) : e = i.indexOf("deg") > -1 ? i : i + "deg,0";
            var a = "skew(" + e + ")";
            return P.push(a), M.push(a), this
        }

        function g(e) {
            var t = String(e),
                e = t.indexOf("deg") > -1 ? t : t + "deg",
                i = "skewX(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function v(e) {
            var t = String(e),
                e = t.indexOf("deg") > -1 ? t : t + "deg",
                i = "skewY(" + e + ")";
            return P.push(i), M.push(i), this
        }

        function m(e) {
            var t = String(e);
            return L.css({
                "-webkit-transform-origin": t,
                "transform-origin": t
            }), this
        }

        function b(e, t) {
            var i = t || "ease-out";
            return H = "number" == typeof e ? "all " + e + "ms " + i : 0 == e || "none" == e ? "none" : 1 == e ? "all 300ms " + i : e || "all 300ms " + i, L.css({
                "-webkit-transition": H,
                transition: H
            }), this
        }

        function w() {
            return P = [], M = [], z = [], A = 0, this
        }

        function y(e) {
            return V && (b(), V = !1), L.css({
                "-webkit-transform": "",
                transform: ""
            }), "none" != H && L.one("webkitTransitionEnd", function () {
                e && e.call(F, this)
            }), w(), this
        }

        function x(e) {
            var t = N ? M.join("") + "translateZ(0)" : M.join("");
            try {
                z[A] = [], z[A].push(P.join("")), P = [], A++
            } catch (i) {}
            return L.css({
                "-webkit-transform": t,
                transform: t
            }), "none" != H ? L.one("webkitTransitionEnd", function () {
                e && e.call(F, this)
            }) : e && e.call(F, this), this
        }

        function k(e) {
            function t(e) {
                var o = e[n] || [],
                    r = e[n + 1] || [];
                i = N ? o.join("") + "translateZ(0)" : o.join(""), i = M.join("") + i.replace(/\(.*?\)/g, "(0)"), L.css({
                    "-webkit-transform": "",
                    transform: ""
                }), n++;
                try {
                    L.one("webkitTransitionEnd", function () {
                        return r && r.length ? void t(a) : (n = 0, void(historyCache = []))
                    })
                } catch (l) {}
            }
            var i, n = 0,
                a = z.reverse();
            return t(a), this
        }

        function T(e, t) {
            return L.css({
                "-webkit-transform": e,
                transform: e
            }), t && "none" != b && L.one("webkitTransitionEnd", function () {
                t.call(F, this)
            }), this
        }

        function O(e) {
            return e = parseFloat(e) || 100, N = !0, L.parent().css({
                perspective: e + "px"
            }), this
        }

        function C(e, t) {
            var i = {};
            return "object" == typeof e ? (i = e, t = "") : "string" == typeof e && (i[e] = t || ""), L.css(i), this
        }

        function S(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function I(t, i) {
            return e.option.call(F, t, i)
        }
        var E = {
            id: "",
            zoom: !0,
            open3D: !1,
            animates: []
        };
        if ("object" == typeof i && i.id) i = i || {};
        else {
            var j = i || "";
            i = {}, i.id = j
        }
        var L, N, D, P, F = {
                origin: m,
                transition: b,
                property: C,
                open3D: O,
                transform: T,
                start: x,
                stop: y,
                clear: w,
                left: a,
                right: o,
                up: r,
                down: l,
                scale: s,
                scaleX: c,
                scaleY: u,
                rotate: d,
                rotateX: f,
                rotateY: h,
                skew: p,
                skewX: g,
                skewY: v,
                reverse: k,
                widget: S,
                option: I,
                config: R,
                init: n
            },
            R = F.config = t.extend(!0, {}, E, i),
            M = [],
            z = [],
            H = "all 300ms ease-out";
        n(R);
        var A = 0,
            V = !1;
        return F
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.toggle = function (i) {
        function n(t) {
            if (t = t || b, w = !1, !t.id) return void e.showLog("toggle id不能为空", "bui.toggle");
            h = e.objId(t.id), b = m.config = t, v = h.attr("class") || "";
            var i = t.effect,
                n = t.inOrder ? e.array.index(i, y.hideInOrder) : e.array.index(i, y.hide),
                a = i && (e.array.index(i, y.show) > -1 ? e.array.index(i, y.show) : n);
            return T = !(h[0] && "none" == h[0].style.display || "none" == h.css("display")), a < 0 ? (g = y.show[0], p = t.inOrder ? y.hideInOrder[0] : y.hide[0], this) : (g = y.show[a], void(p = t.inOrder ? y.hideInOrder[a] : y.hide[a]))
        }

        function a() {
            return T
        }

        function o(t, i) {
            if (!w) return !(!x && !k) && (x = !1, "function" == typeof t ? (i = t, t = g || "") : t = t || g || "", g = t, h[0] && "none" == h[0].style.display && h.css("display", "block"), h.addClass("animated " + t), "showIn" == t || "showOut" == t ? (b.revert && h.removeClass("animated " + t), i && i.call(m, this), T = !0, x = !0) : h.one("webkitAnimationEnd", function () {
                try {
                    !T && h.css("display", "block"), b.revert && h.removeClass("animated " + t), i && i.call(m, this), T = !0, x = !0
                } catch (n) {
                    e.showLog(n, "toggle show method")
                }
            }), this)
        }

        function r(t, i) {
            if (!w && (x || k)) return k = !1, "function" == typeof t ? (i = t, t = p || "") : t = t || p || "", h.css("display", "block").addClass("animated " + t), p = t, "showIn" == t || "showOut" == t ? (h.css("display", "none"), b.revert && h.removeClass("animated " + t), i && i.call(m, this), T = !1, k = !0) : h.one("webkitAnimationEnd", function () {
                try {
                    h.css("display", "none"), b.revert && h.removeClass("animated " + t), i && i.call(m, this), T = !1, k = !0
                } catch (n) {
                    e.showLog(n, "toggle hide method")
                }
            }), this
        }

        function l() {
            return h.remove(), this
        }

        function s(e) {
            var e = 1 == e;
            h && (h.off(), e && h.remove()), w = !0
        }

        function c(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function u(t, i) {
            return e.option.call(m, t, i)
        }
        var d = {
            id: "",
            effect: "fadeIn",
            revert: !0,
            inOrder: !1
        };
        if ("string" == typeof i) {
            var f = i || "";
            i = {}, i.id = f
        }
        var h, p, g, v, m = {
                show: o,
                hide: r,
                remove: l,
                isShow: a,
                destroy: s,
                widget: c,
                option: u,
                config: b,
                init: n
            },
            b = m.config = t.extend(!0, {}, d, i),
            w = !1,
            y = {
                show: ["fadeIn", "fadeInLeft", "fadeInRight", "fadeInDown", "fadeInUp", "fadeInLeftBig", "fadeInRightBig", "fadeInUpBig", "fadeInDownBig", "zoomIn", "bounceIn", "rotateIn", "rollIn", "flipInX", "flipInY", "lightSpeedIn", "showIn", "slideInRight", "slideInLeft", "coverInLeft", "coverInRight", "zoomSlideInLeft", "zoomSlideInRight", "pushInLeft", "pushInRight"],
                hide: ["fadeOut", "fadeOutLeft", "fadeOutRight", "fadeOutUp", "fadeOutDown", "fadeOutLeftBig", "fadeOutRightBig", "fadeOutDownBig", "fadeOutUpBig", "zoomOut", "bounceOut", "rotateOut", "rollOut", "flipOutX", "flipOutY", "lightSpeedOut", "showOut", "slideOutRight", "slideOutLeft", "coverOutLeft", "coverOutRight", "zoomSlideOutLeft", "zoomSlideOutRight", "pushOutLeft", "pushOutRight"],
                hideInOrder: ["fadeOut", "fadeOutRight", "fadeOutLeft", "fadeOutDown", "fadeOutUp", "fadeOutRightBig", "fadeOutLeftBig", "fadeOutUpBig", "fadeOutDownBig", "zoomOut", "bounceOut", "rotateOut", "rollOut", "flipOutX", "flipOutY", "lightSpeedOut", "showOut", "slideOutLeft", "slideOutRight", "coverOutRight", "coverOutLeft", "zoomSlideOutRight", "zoomSlideOutLeft", "pushOutRight", "pushOutLeft"]
            },
            x = !0,
            k = !0,
            T = !1;
        return n(b), b.id && n(b), m
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.mask = function (i) {
        var n = [];
        return function (i) {
            function a(e) {
                L = !1;
                var i = t.extend(!0, O, e);
                return i.appendTo = i.appendTo || "body", C = t(i.appendTo), I = C.children(".bui-mask"), E = i.onlyOne || C.is("body"), O = T.config = i, y = C.css("position"), i.autoTrigger && l(i), this
            }

            function o(e) {
                var i = t.extend(!0, O, e),
                    a = function (e) {
                        var t = this;
                        if (E) {
                            var a = n[n.length - 1];
                            a && a.callback && a.callback.call(this, e)
                        } else i.callback && i.callback.call(t, e);
                        i.autoClose && f(), e.stopPropagation()
                    };
                I.on("click.bui", a), j = !0
            }

            function r(t) {
                var i = t,
                    n = i.background ? i.background : "rgba(0,0,0," + i.opacity + ")",
                    a = "";
                return a += '<div class="' + e.prefix("mask") + '" style="background:' + n + ";z-index:" + i.zIndex + '"></div>'
            }

            function l(e) {
                if (!L) {
                    var i = t.extend(!0, O, e),
                        n = r(i);
                    return I = C.children(".bui-mask"), E && c(i), I.length < 1 ? (C.append(n).css("position", "relative"), I = C.children(".bui-mask")) : I.css("display", "block"), x = !0, S = !0, w.call(this, "show"), j || o(i), this
                }
            }

            function s() {
                if (!L) return I = C.children(".bui-mask"), E ? (u(), n.length < 1 && I && I.length && (I && I.remove(), I = null, S = !1)) : (I && I.remove(), I = null, C.css("position", y || "static"), x = !1), j = !1, w.call(this, "hide"), this
            }

            function c(t) {
                e.array.compare(N, n, "id") || n.push({
                    id: N,
                    opacity: t.opacity,
                    callback: t.callback
                })
            }

            function u(e) {
                n.pop()
            }

            function d(e) {
                if (!L) {
                    var i = t.extend(!0, O, e);
                    return I = C.children(".bui-mask"), I && I.length ? (I.css("display", "block"), C.css("position", "relative"), x = !0, S = !0, E && c(i)) : l(i), w.call(this, "show"), this
                }
            }

            function f() {
                if (!L) return I = C.children(".bui-mask"), E ? (u(), n.length < 1 && I && I.length && (I.css("display", "none"), S = !1)) : (I.css("display", "none"), C.css("position", "relative"), x = !1), w.call(this, "hide"), this
            }

            function h() {
                return E ? S : x
            }

            function p(e) {
                s(), C && n.length < 1 && C.off("click.bui"), b("show"), b("hide"), L = !0
            }

            function g(t) {
                var i = {};
                return e.widget.call(i, t)
            }

            function v(t, i) {
                return e.option.call(T, t, i)
            }

            function m(t, i) {
                return e.on.apply(T, arguments), this
            }

            function b(t, i) {
                return e.off.apply(T, arguments), this
            }

            function w(t) {
                T.self = this == window || this == T ? null : this, e.trigger.apply(T, arguments)
            }
            var y, x, k = {
                    appendTo: "",
                    opacity: .6,
                    background: "",
                    zIndex: 100,
                    autoTrigger: !1,
                    onlyOne: !1,
                    autoClose: !1,
                    callback: null
                },
                T = {
                    handle: {},
                    on: m,
                    off: b,
                    add: l,
                    hide: f,
                    show: d,
                    isShow: h,
                    remove: s,
                    destroy: p,
                    widget: g,
                    option: v,
                    config: O,
                    init: a
                },
                O = T.config = t.extend(!0, {}, k, e.config.mask, i),
                C = (t("body"), null),
                S = !1,
                I = null,
                E = !1,
                j = !1,
                L = !1,
                N = e.guid();
            return a(O), T
        }
    }(), e
}(bui || {}, libs),
function (e, t) {
    return e.loading = function () {
        var i = [];
        return function (n) {
            function a(i) {
                P = !1;
                var n = t.extend(!0, E, i);
                n.appendTo = n.appendTo || "body", j = t(n.appendTo), L = e.guid(), N = j.children(".bui-loading"), E = I.config = n, n.autoTrigger && l(n);
                var a = n.callback;
                return n.callback = function () {
                    n.autoClose && d(), a && a.call(this)
                }, E.callback = n.callback, C = n.mask && e.mask(n), this
            }

            function o(e) {
                N = j.children(".bui-loading");
                var t = function (t) {
                    if (e.appendTo) e.callback && e.callback.call(this, t);
                    else {
                        var n = i[i.length - 1];
                        n && n.callback && n.callback.call(this, t)
                    }
                    t.stopPropagation()
                };
                return j.on("click.bui", ".bui-loading", t), D = !0, this
            }

            function r(t) {
                t = t || {};
                var i = t.text,
                    n = j.width(),
                    a = i && "block" == t.display ? parseInt(t.height) + 30 : parseInt(t.height),
                    o = -(n / 2),
                    r = -(a / 2),
                    l = "block" == t.display ? e.prefix("loading-block") : e.prefix("loading-inline"),
                    s = "";
                s += '<div id="' + L + '" class="' + e.prefix("loading") + " " + l + '" style="width:' + n + "px;height:" + a + "px;line-height:" + a + "px;margin-left:" + o + "px;margin-top:" + r + "px;" + (t.zIndex ? "z-index:" + t.zIndex : "") + '" >', t.onlyText || (s += '<div class="' + e.prefix("loading-cell") + '" style="width:' + parseFloat(t.width) + "px;height:" + parseFloat(t.height) + 'px;"></div>'), i && (s += '<div class="' + e.prefix("loading-text") + '">' + t.text + "</div>"), s += "</div>";
                var c = t && t.template ? t.template.call(this, t) : s;
                return c
            }

            function l(e) {
                if (!P) {
                    var i = t.extend(!0, E, e);
                    if (N = j.children(".bui-loading"), O = N.children(".bui-loading-cell"), N && N.hasClass("bui-loading-pause")) N && N.removeClass("bui-loading-pause"), k.call(this, "start");
                    else {
                        "" == i.appendTo && g(i), N.length && N.remove();
                        var n = r(i);
                        j.append(n), C && C.add(i), k.call(this, "show")
                    }
                    return i.timeout && (F && clearTimeout(F), F = setTimeout(function () {
                        d()
                    }, i.timeout)), D || o(i), this
                }
            }

            function s(e) {
                if (!P) {
                    T = N && N.children(".bui-loading-text");
                    var t;
                    return "undefined" == typeof e ? t = T && T.text() : (T && T.text(e), this)
                }
            }

            function c() {
                P || (O = N && N.children(".bui-loading-cell"), O && O.css("display", "inline-block"), N && N.removeClass("bui-loading-pause"))
            }

            function u() {
                P || (O = N && N.children(".bui-loading-cell"), O && O.css("display", "none"), N && N.addClass("bui-loading-pause"))
            }

            function d() {
                if (!P) return N = j.children(".bui-loading"), E.appendTo ? (N && N.remove(), N = null, C && C.remove()) : (v(), C && C.remove(), i.length < 1 && N && N.length && (N && N.remove(), N = null)), D = !1, k.call(this, "remove"), k.call(this, "hide"), this
            }

            function f() {
                if (!P) return N = j.children(".bui-loading"), N && N.length && (N.addClass("bui-loading-pause"), k.call(this, "pause")), this
            }

            function h(e) {
                if (!P) {
                    var i = t.extend(!0, E, e);
                    return N = j.children(".bui-loading"), N && N.length ? (s(i.text), N.css("display", "block"), C && C.show(), "" == i.appendTo && g(E), k.call(this, "show")) : l(i), E.timeout && (F && clearTimeout(F), F = setTimeout(function (e) {
                        p()
                    }, E.timeout)), this
                }
            }

            function p() {
                if (!P) return N = j.children(".bui-loading"), E.appendTo ? (N.css("display", "none"), C && C.hide()) : (v(), i.length < 1 && N && N.length && (N.css("display", "none"), C && C.hide())), k.call(this, "hide"), this
            }

            function g(t) {
                !e.array.compare(L, i, "id") && t.callback && i.push({
                    id: L,
                    callback: t.callback
                })
            }

            function v() {
                i.pop()
            }

            function m(e) {
                var e = 1 == e;
                d(), j && i.length < 1 && j.off("click.bui"), x("show"), x("hide"), x("start"), x("stop"), x("pause"), x("remove"), C && C.destroy(e), P = !0
            }

            function b(t) {
                var i = {
                    mask: C || {}
                };
                return e.widget.call(i, t)
            }

            function w(t, i) {
                return e.option.call(I, t, i)
            }

            function y(t, i) {
                return e.on.apply(I, arguments), this
            }

            function x(t, i) {
                return e.off.apply(I, arguments), this
            }

            function k(t) {
                I.self = this == window || this == I ? null : this, e.trigger.apply(I, arguments)
            }
            var T, O, C, S = {
                    appendTo: "",
                    width: 30,
                    height: 30,
                    text: "正在加载...",
                    onlyText: !1,
                    mask: !0,
                    zIndex: "",
                    autoTrigger: !1,
                    autoClose: !0,
                    timeout: 0,
                    opacity: 0,
                    display: "block",
                    template: null,
                    callback: null
                },
                I = {
                    handle: {},
                    on: y,
                    off: x,
                    start: l,
                    stop: d,
                    pause: f,
                    text: s,
                    showRing: c,
                    hideRing: u,
                    show: h,
                    hide: p,
                    destroy: m,
                    widget: b,
                    option: w,
                    config: E,
                    init: a
                },
                E = I.config = t.extend(!0, {}, S, e.config.loading, n),
                j = (t("body"), null),
                L = "",
                N = null,
                D = !1,
                P = !1,
                F = null;
            return a(E), I
        }
    }(), e
}(bui || {}, libs),
function (e, t) {
    return e.slide = function (i) {
        function n(i) {
            var n = t.extend(!0, ce, i);
            return n.id ? (R = e.obj(n.id), ce = se.config = n, X = n.direction, n.height = parseFloat(n.height), n.width = parseFloat(n.width), G = window.viewport.width() || document.documentElement.clientWidth, ee = window.viewport.height() || document.documentElement.clientHeight, M = 0 == n.menu.indexOf("#") ? e.obj(n.menu) : R.find(n.menu).eq(0), z = M.children(), H = R.find(n.children).eq(0), A = H.parent(), V = H.children(), a(n), r(), ie = n.autoplay, ie && g(), fe || (o(), ve = !0), de = de || n.index, parseInt(n.index) > 0 ? p(n.index, "none") : p(de, "none"), this) : void e.showLog("slide id不能为空", "bui.slide.init")
        }

        function a(e) {
            var t = R.parents(".bui-page"),
                i = (R.parents("main"), R[0] && R[0].offsetTop || 0),
                n = t.children(e.header),
                a = n[0] && n[0].offsetHeight || 0,
                o = t.children(e.footer),
                r = o[0] && o[0].offsetHeight || 0;
            K = ee - (a || 0) - (r || 0) - i, Q = 0 == e.height ? K : e.height;
            var l = "static" == M.parent().css("position") ? M.css("position") : M.parent().css("position");
            Z = R.find(e.menu).length ? "absolute" == l || "fixed" == l ? Q : Q - (M[0] && M[0].offsetHeight || 0) : Q, B = e.fullscreen ? ee : 0 == e.height ? Z : e.height, Y = e.fullscreen ? G : e.width || G, q = V.length, _ = "x" == X ? Y / ce.visibleNum : Y, J = "y" == X ? B / ce.visibleNum : B, te = "y" == ce.direction ? J * ce.scrollNum : _ * ce.scrollNum, W = Y * q / ce.visibleNum, $ = B * q / ce.visibleNum
        }

        function o() {
            var e = function (e) {
                var i = t(this).hasClass("active"),
                    n = t(this).index(),
                    a = t(this).attr("disabled"),
                    o = t(this).hasClass("disabled") || "" == a || "true" == a || "disabled" == a;
                i || o || (ce.animate ? p(n) : p(n, "none"), x(n), ie && g()), e.stopPropagation()
            };
            0 == ce.menu.indexOf("#") ? M.on("click.bui", "li", e) : R.on("click.bui", ce.menu + " li", e), R.on("click.bui", ce.prev, w), R.on("click.bui", ce.next, y);
            var i = ce.children + " " + ce.item;
            R.on("click.bui", i, function (e) {
                F.call(this, "click", e), ce.callback && ce.callback.call(this, e, se)
            }), T(), ce.swipe || k(), fe = !0
        }

        function r() {
            me = {
                x: {
                    swipeDir: "swipeleft",
                    swipeDir2: "swiperight",
                    width: te
                },
                y: {
                    swipeDir: "swipeup",
                    swipeDir2: "swipedown",
                    width: te
                }
            }, oe = {
                x: {
                    parentInitKey: "width",
                    parentInitValue: W,
                    boxCss: "display:-webkit-box;display:box;-webkit-box-align: start;-webkit-box-pack: center;width:100%;",
                    boxItemCSS: "-webkit-box-flex:1;box-flex:1;width:" + _ + "px;height:" + J + "px;"
                },
                y: {
                    parentInitKey: "height",
                    parentInitValue: $,
                    box: "display:-webkit-box;display:box;-webkit-box-align: start;-webkit-box-pack: center;width:100%;-webkit-box-orient: vertical;box-orient: vertical;",
                    boxItemCSS: "-webkit-box-flex:1;box-flex:1;width:" + _ + "px;height:" + J + "px;"
                }
            }, A[oe[X].parentInitKey](oe[X].parentInitValue);
            var e, i = V.length;
            for (e = 0; e < i; e++) re = Boolean(V.eq(e).attr("data-scroll")) || ce.scroll, oe[X].boxItemCSS = oe[X].boxItemCSS + (re ? "overflow:auto;" : "overflow:hidden;"), V[e].style.cssText = oe[X].boxItemCSS;
            try {
                H[0].style.cssText = oe[X].boxCss
            } catch (n) {
                console.log("请检查下children参数是否正确.", "bui.slide id:" + ce.id)
            }
            var a = "y" == X && ce.visibleNum > 1 ? Z / ce.visibleNum : Z,
                o = ce.zoom ? Q / 100 + "rem" : Q + "px",
                r = ce.zoom ? a / 100 + "rem" : a + "px";
            ce.zoom ? _ / 100 + "rem" : _ + "px";
            if (ce.fullscreen ? (t("main").css({
                position: "static"
            }), R.addClass("bui-slide-fullscreen").css({
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                "z-index": 10,
                overflow: "hidden",
                width: Y,
                height: ee
            }), V.addClass(ce.alignClassName || "bui-box-center").css("height", ee)) : (R.css({
                position: "relative",
                overflow: "hidden",
                width: Y,
                height: o
            }), V.addClass(ce.alignClassName).height(r)), ce.autoheight && R.addClass("bui-slide-autoheight"), ce.autopage) {
                var s = l(),
                    c = H.find(".active").index() + 1,
                    u = O(s, c);
                R.children(".bui-slide-head").remove(), R.append(u), z = R.find(ce.menu).eq(0).children()
            }
        }

        function l() {
            var e = V.length,
                t = e - ce.visibleNum,
                i = e % ce.scrollNum != 0 ? t + 1 : t / ce.scrollNum + 1;
            return i
        }

        function s(t) {
            var i = t.originalEvent && t.originalEvent.targetTouches || t.targetTouches,
                n = we ? i[0] : t;
            return ue.x1 = n.pageX, ue.y1 = n.pageY, ue.direction = "", ce.stopHandle && e.checkTargetInclude(t.target, ce.stopHandle) ? void(ke = !1) : (Ce = -de * te, Se = -de * te, i.length > 1 || t.scale && 1 !== t.scale ? void f("x" == X ? Ce : Se) : (ie && (v(), ie = !0), F.call(this, "touchstart", t, ue), ce.onStart && ce.onStart.call(this, t, ue, se), void(ke = !0)))
        }

        function c(i) {
            var n = i.originalEvent && i.originalEvent.targetTouches || i.targetTouches;
            if (n.length > 1 || i.scale && 1 !== i.scale) return void f("x" == X ? Ce : Se);
            if (ke) {
                var a = we ? n[0] : i;
                ue.x2 = a.pageX, ue.y2 = a.pageY, ue.direction || (ue.direction = e.swipeDirection(ue.x1, ue.x2, ue.y1, ue.y2)), "swipeleft" !== ue.direction && "swiperight" !== ue.direction || (i.preventDefault(), i.stopPropagation()), F.call(this, "touchmove", i, ue);
                try {
                    if ("y" == X && ce.scroll) {
                        var o = t(i.target).closest(".active"),
                            r = o[0].scrollTop || 0,
                            s = o[0].scrollHeight || 0,
                            c = o[0].offsetHeight || 0;
                        if ("swipedown" === ue.direction && r > 1) return void(Te = !1);
                        if ("swipeup" === ue.direction && s - r - c >= 2) return void(Te = !1)
                    }
                } catch (i) {}
                ne = ue.x2 - ue.x1, ae = ue.y2 - ue.y1, me.x.move = Ce + ne, me.x.absDelta = Math.abs(ne), me.y.move = Se + ae, me.y.absDelta = Math.abs(ae);
                var u = l();
                ue.direction !== me[X].swipeDir && ue.direction !== me[X].swipeDir2 || (ce.delay && me[X].absDelta > ce.distance && f(me[X].move, "none"), ce.delay || (ce.bufferEffect ? f(me[X].move, "none") : 0 == de && u > 1 && ("swipeleft" == ue.direction || "swipeup" == ue.direction) ? f(me[X].move, "none") : de == u - 1 && u > 1 && ("swiperight" == ue.direction || "swipedown" == ue.direction) ? f(me[X].move, "none") : de > 0 && de < u - 1 && u > 1 && f(me[X].move, "none"), i.preventDefault()), ce.onMove && ce.onMove.call(this, i, ue, se)), Te = !0
            }
        }

        function u(e) {
            F.call(this, "touchend", e, ue), Te && (ne = ue.x2 - ue.x1, ae = ue.y2 - ue.y1, me.x.delta = Ce, me.x.absDelta = Math.abs(ne), me.y.delta = Se, me.y.absDelta = Math.abs(ae), me[X].absDelta > ce.distance ? (d.call(this, ue, me), ce.onEnd && ce.onEnd.call(this, e, ue, se)) : me[X].absDelta < ce.distance && f(me[X].delta), ie && g(), "swipeleft" != ue.direction && "swiperight" != ue.direction || e.stopPropagation(), ye += ue.y2 - ue.y1, xe += ue.x2 - ue.x1, ue.lastX = xe, ue.lastY = ye, ue = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                direction: ""
            }, ke = !1, Te = !1)
        }

        function d(e, t) {
            de = H.children(".active").index();
            var n;
            if (e.direction == t[X].swipeDir) {
                var a = V.length,
                    o = a - ce.visibleNum,
                    r = a % ce.scrollNum != 0 ? o + 1 : o / ce.scrollNum + 1;
                if (de >= r - 1) n = de, t[X].delta = -n * t[X].width, f(t[X].delta), de = n, x(n), F.call(this, "last", n);
                else if (n = de + 1, t[X].delta = -n * t[X].width, f(t[X].delta), de = n, x(n), F.call(this, "next", n), i.autoload) C(de);
                else {
                    var l = V.eq(de);
                    F.call(l, "to", n)
                }
            } else if (e.direction == t[X].swipeDir2)
                if (de > 0)
                    if (n = de - 1, t[X].delta = -n * t[X].width, f(t[X].delta), de = n, x(n), F.call(this, "prev", n), i.autoload) C(de);
                    else {
                        var l = V.eq(de);
                        F.call(l, "to", n)
                    } else n = de, t[X].delta = -n * t[X].width, f(t[X].delta), de = n, x(n), F.call(this, "first", n)
        }

        function f(e, t) {
            var i = ce.transition,
                t = t || "all " + i + "ms",
                e = e || 0;
            switch (X) {
            case "x":
                h(e + "px", 0, t, A);
                break;
            case "y":
                h(0, e + "px", t, A)
            }
            return this
        }

        function h(e, t, i, n) {
            var a = t || 0;
            "y" == X && ce.zoom && String(t).indexOf("%") <= -1 && (a = parseInt(t) / 100 + "rem");
            var i, n = n || R,
                e = e || 0,
                o = e,
                r = String(e).indexOf("%") > -1 ? String(e) : o,
                l = String(t).indexOf("%") > -1 ? String(t) : a;
            i = "number" == typeof i ? "all " + i + "ms" : i || "all 300ms";
            try {
                n.css({
                    "-webkit-transition": i,
                    transition: i,
                    "-webkit-transform": "translate(" + r + "," + l + ")",
                    transform: "translate(" + r + "," + l + ")"
                }), n.one("webkitTransitionEnd", function () {
                    n.css({
                        "-webkit-transition": "none",
                        transition: "none"
                    })
                })
            } catch (s) {
                console.log(s.message)
            }
        }

        function p(e, n) {
            var a = 0;
            if ("string" == typeof e && e.indexOf(".html") > -1) {
                var o = [];
                z.each(function (i, n) {
                    var r = t(n).attr("href") || void 0;
                    o[i] = r, r == e && (a = i)
                })
            } else a = parseInt(e);
            var r = {
                    x: {
                        transform: -a * parseFloat(te)
                    },
                    y: {
                        transform: -a * parseFloat(te)
                    }
                },
                s = l();
            if (a >= s || a < 0) return !1;
            if (f(r[X].transform, n), de = a, x(a), ie && g(), i.autoload) C(de);
            else {
                var c = V.eq(de);
                F.call(c, "to", a)
            }
            return this
        }

        function g(e) {
            var e = e || ce.interval;
            v(), ie = !0;
            var t = de;
            U = setInterval(function (e) {
                var i = l();
                t >= 0 && t < i - 1 ? t += 1 : t = 0, p(t)
            }, e), F.call(this, "play")
        }

        function v(e) {
            if (U) try {
                window.clearInterval(U), ie = !1, F.call(this, "stop")
            } catch (t) {}
            return this
        }

        function m(e) {
            g(e)
        }

        function b() {
            return de
        }

        function w() {
            var e = de - 1;
            return F.call(this, "prev", e), p(e), this
        }

        function y() {
            var e = de + 1;
            return F.call(this, "next", e), p(e), this
        }

        function x(e) {
            e = e || 0, V.removeClass("active"), V.eq(e).addClass("active"), z.removeClass("active"), z.eq(e).addClass("active")
        }

        function k() {
            return R.off("touchstart", s).off("touchmove", c).off("touchend", u).off("touchcancel"), F.call(this, "lock"), this
        }

        function T(e) {
            return R.on("touchstart", s).on("touchmove", c).on("touchend", u).on("touchcancel", function () {
                f("x" == X ? Ce : Se)
            }), F.call(this, "unlock"), this
        }

        function O(e, t) {
            var i, n = "",
                t = t || 1;
            for (n += '<div class="bui-slide-head">', n += "<ul >", i = 1; i < Number(e) + 1; i++) n += "<li " + (i == t ? 'class="active"' : "") + ">" + i + "</li>";
            return n += "</ul >", n += "</div >"
        }

        function C(i) {
            var n = V.eq(i),
                a = z.eq(i),
                o = a.attr("href") || "";
            return e.array.compare(i, pe) ? (F.call(n, "to", i, "200"), !1) : void(ce.autoload && (o ? t.ajax({
                url: o,
                dataType: "html",
                async: ce.async,
                success: function (e, t) {
                    n.html(e), pe.push(i), F.call(n, "load", i, t), !ve && F.call(n, "to", i, t), ve = !1
                }, error: function (e, t) {
                    F.call(n, "loadfail", i, t)
                }
            }) : (!ve && F.call(n, "to", i), ve = !1)))
        }

        function S(t) {
            var i, n = e.guid(),
                t = t || 1,
                a = "";
            for (i = 0; i < t; i++) a += '<li id="' + n + '" style="-webkit-box-flex:1;box-flex:1;width:' + _ + "px;height:" + J + 'px;"></li>';
            H.append(a), V = H.children();
            var o = _ * V.length;
            q = V.length, A.width(o)
        }

        function I(i) {
            var n = {
                    id: null,
                    url: "",
                    preload: !1,
                    param: {},
                    success: null,
                    fail: null
                },
                a = t.extend(!0, {}, n, i),
                o = a.url || "",
                r = null,
                l = V.length ? de + 1 : 0;
            if (a.id) r = e.obj(a.id);
            else {
                var s = V.eq(l);
                s.length ? r = s : (S(), V = H.children(), r = V.eq(l))
            } if (o)
                if (de = l, ge[l] = a.param, o in he) {
                    var c = "cache";
                    e.array.compare(l, pe) || (pe.push(l), r.html(he[o]), a.success && a.success.call(r, he[o], c), F.call(r, "load", he[o], c)), a.preload || p(l)
                } else t.ajax({
                    url: o,
                    success: function (t, i) {
                        t ? (he[o] = t, e.array.compare(l, pe) || (pe.push(l), r.html(he[o]), a.success && a.success.call(r, he[o], i), F.call(r, "load", t, i)), a.preload || p(l)) : (a.fail && a.fail.call(r, t, i), F.call(r, "loadfail", t, i))
                    }, error: function (e, t) {
                        a.fail && a.fail.call(r, e, t), F.call(r, "loadfail", e, t)
                    }
                });
            return this
        }

        function E(e) {
            var e = "number" == typeof e ? e : de;
            return ge[e] || {}
        }

        function j(e) {
            var e = 1 == e;
            v(), M && (M.off("click.bui"), e && M.remove()), R && (R.off(), e && R.remove()), P("stop"), P("play"), P("first"), P("last"), P("to")
        }

        function L(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function N(t, i) {
            return e.option.call(se, t, i)
        }

        function D(t, i) {
            return e.on.apply(se, arguments), this
        }

        function P(t, i) {
            return e.off.apply(se, arguments), this
        }

        function F(t) {
            se.self = this == window || this == se ? null : this, e.trigger.apply(se, arguments)
        }
        var R, M, z, H, A, V, q, U, W, $, Y, B, X, _, J, K, Q, Z, G, ee, te, ie, ne, ae, oe, re, le = {
                id: "",
                menu: ".bui-slide-head ul",
                children: ".bui-slide-main ul",
                header: "header",
                footer: "footer",
                item: "li",
                prev: ".bui-slide-prev",
                next: ".bui-slide-next",
                alignClassName: "",
                stopHandle: "",
                width: 0,
                height: 0,
                zoom: !1,
                transition: 200,
                interval: 5e3,
                swipe: !0,
                animate: !0,
                delay: !1,
                bufferEffect: !1,
                visibleNum: 1,
                scrollNum: 1,
                distance: 80,
                direction: "x",
                autoplay: !1,
                autoheight: !1,
                scroll: !1,
                index: 0,
                fullscreen: !1,
                autopage: !1,
                autoload: !1,
                async: !0,
                callback: null,
                onStart: null,
                onMove: null,
                onEnd: null
            },
            se = {
                handle: {},
                on: D,
                off: P,
                to: p,
                load: I,
                getPageParams: E,
                getPages: l,
                prev: w,
                next: y,
                stop: v,
                start: m,
                lock: k,
                index: b,
                unlock: T,
                destroy: j,
                widget: L,
                option: N,
                config: ce,
                init: n
            },
            ce = se.config = t.extend(!0, {}, le, e.config.slide, i),
            ue = {},
            de = 0,
            fe = !1,
            he = {},
            pe = [],
            ge = [],
            ve = !1,
            me = {
                x: {},
                y: {}
            },
            be = /hp-tablet/gi.test(navigator.appVersion),
            we = "ontouchstart" in window && !be,
            X = "",
            ye = 0,
            xe = 0,
            ke = !1,
            Te = !1,
            ue = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                direction: ""
            };
        try {
            n(ce)
        } catch (Oe) {
            e.showLog(Oe)
        }
        var Ce, Se;
        return se
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.swipe = function () {
        var i = null,
            n = null;
        return function (a) {
            function o(n) {
                var a = t.extend(!0, K, n);
                return pe = !1, a.id ? (M = e.obj(a.id), V = a.width > 0 ? a.width : ke.clientWidth, q = a.height > 0 ? a.height : ke.clientHeight, z = M.children(a.handle), H = G ? M.children() : M, W = H.children(a.swipeleft), $ = H.children(a.swiperight), Y = H.children(a.swipeup), B = H.children(a.swipedown), X = parseFloat(a.movingDistance), A = X, s(), ee || (r(a), ee = !0), i && i.close(), de || E(), this) : void e.showLog("swipe id不能为空", "bui.swipe.init")
            }

            function r(e) {
                H.css({
                    width: V,
                    position: "relative",
                    overflow: "hidden"
                }), !G && H.css({
                    height: q
                }), z.css({
                    position: "relative",
                    "z-index": 10
                });
                try {
                    var t = W.attr("data-moving") || X,
                        i = $.attr("data-moving") || X,
                        n = Y.attr("data-moving") || X,
                        a = B.attr("data-moving") || X,
                        o = l(t),
                        r = l(i),
                        s = l(n),
                        c = l(a);
                    ie && W.css({
                        width: o
                    }), te && $.css({
                        width: r
                    }), ae && B.css({
                        height: s
                    }), ne && Y.css({
                        height: c
                    })
                } catch (u) {}
            }

            function l(e) {
                var t = K.zoom ? e / 100 + "rem" : e + "px";
                return t
            }

            function s() {
                "x" == Z ? (te = !!$.length, ie = !!W.length) : "y" == Z ? (ae = !!B.length, ne = !!Y.length) : "xy" == Z && (ae = !!B.length, ne = !!Y.length, ie = !!W.length, te = !!$.length)
            }

            function c(i) {
                var n = i.originalEvent && i.originalEvent.targetTouches || i.targetTouches;
                if (n.length > 1 || i.scale && 1 !== i.scale) return void(be = !1);
                if (K.stopHandle && e.checkTargetInclude(i.target, K.stopHandle)) return void(be = !1);
                var a = me ? n[0] : i;
                if (Q.id = K.id, Q.x1 = a.pageX, Q.y1 = a.pageY, Q.direction = "", U = t(i.target).closest(K.handle), R.call(this, "touchstart", i, Q), G && !ge) {
                    z = U, H = z.parent(), W = H.children(K.swipeleft), $ = H.children(K.swiperight), Y = H.children(K.swipeup), B = H.children(K.swipedown), s();
                    H.index();
                    r(K), (0 == K.height || "" == H[0].style.height) && H.height(U[0].offsetHeight)
                }
                if (Q.movingleft = parseInt(W.attr("data-moving") || X), Q.movingright = parseInt($.attr("data-moving") || X), Q.movingup = parseInt(Y.attr("data-moving") || X), Q.movingdown = parseInt(B.attr("data-moving") || X), U.length) {
                    var o = !1;
                    switch (Z) {
                    case "x":
                        o = !(!ie && !te);
                        break;
                    case "y":
                        o = !(!ne && !ae);
                        break;
                    case "xy":
                        o = !!(ie || te || ne || ae)
                    }
                }
                be = void 0 == o || 1 == o
            }

            function u(a) {
                var o = a.originalEvent && a.originalEvent.targetTouches || a.targetTouches;
                if (o.length > 1 || a.scale && 1 !== a.scale) return void k();
                var r = me ? o[0] : a;
                if (Q.x2 = r.pageX, Q.y2 = r.pageY, R.call(this, "touchmove", a, Q), i && a.stopPropagation(), be) {
                    Q.direction || (Q.direction = e.swipeDirection(Q.x1, Q.x2, Q.y1, Q.y2)), "swipeleft" !== Q.direction && "swiperight" !== Q.direction || a.preventDefault();
                    try {
                        if ("swipeup" === Q.direction || "swipedown" === Q.direction) {
                            var l = M[0].scrollTop || 0,
                                s = (M[0].scrollHeight || 0, U[0].scrollTop || 0),
                                c = (U[0].scrollHeight || 0, t(a.target)[0].scrollTop || 0),
                                u = a.target.offsetHeight || 0,
                                d = a.target.scrollHeight || 0,
                                p = !1,
                                g = !1;
                            0 == l && 0 == s && 0 == c && (p = !0), d - c - u <= 2 && (g = !0)
                        }
                    } catch (a) {}
                    var v = "swiperight" == Q.direction || "swipeleft" == Q.direction ? Q.x2 - Q.x1 : Q.y2 - Q.y1,
                        m = 0;
                    Q.deltax = ge ? Math.abs(v) : Math.abs(v) + ye, !te || "swiperight" != Q.direction || re || ge || n ? !p || !ae || "swipedown" != Q.direction || le || ge || n ? !ie || "swipeleft" != Q.direction || oe || ge || n ? !g || !ne || "swipeup" != Q.direction || se || ge || n ? "swipeleft" == Q.direction && re ? (A = Q.movingright, m = f(Q, Q.movingright), ue && j(-Q.deltax, 0, "none", n || $), ce && j(-m, 0, "none", z), R.call(this, "movingleft", a, Q), we = !0, a.stopPropagation()) : "swipeup" == Q.direction && le ? (A = Q.movingdown, m = f(Q, Q.movingdown), ue && j(0, -Q.deltax, "none", n || B), ce && j(0, -m, "none", z), R.call(this, "movingup", a, Q), we = !0, a.preventDefault(), a.stopPropagation()) : "swiperight" == Q.direction && oe ? (A = Q.movingleft, m = f(Q, Q.movingleft), ue && j(Q.deltax, 0, "none", n || W), ce && j(m, 0, "none", z), R.call(this, "movingright", a, Q), we = !0, a.stopPropagation()) : "swipedown" == Q.direction && se && (A = Q.movingup, m = f(Q, Q.movingleft), ue && j(0, Q.deltax, "none", n || Y), ce && j(0, m, "none", z), R.call(this, "movingdown", a, Q), we = !0, a.preventDefault(), a.stopPropagation()) : (A = Q.movingup, m = h(Q, Q.movingup), ue && j(0, m, "none", Y), ce && j(0, -Q.deltax, "none", z), R.call(this, "movingup", a, Q), we = !0, a.preventDefault(), a.stopPropagation()) : (A = Q.movingleft, m = h(Q, Q.movingleft), ue && j(m, 0, "none", W), ce && j(-Q.deltax, 0, "none", z), R.call(this, "movingleft", a, Q), we = !0, a.stopPropagation()) : (A = Q.movingdown, m = f(Q, Q.movingdown), ue && j(0, m, "none", B), ce && j(0, Q.deltax, "none", z), R.call(this, "movingdown", a, Q), we = !0, a.preventDefault(), a.stopPropagation()) : (A = Q.movingright, m = f(Q, Q.movingright), ue && j(m, 0, "none", $), ce && j(Q.deltax, 0, "none", z), R.call(this, "movingright", a, Q), we = !0, a.stopPropagation())
                }
            }

            function d(e) {
                if (R.call(this, "touchend", e, Q), we) {
                    var t = "swiperight" == Q.direction || "swipeleft" == Q.direction ? Math.abs(Q.x2 - Q.x1) : Math.abs(Q.y2 - Q.y1);
                    te && "swiperight" == Q.direction && t > K.distance && !re && !ge ? (g(), R.call(this, Q.direction, e, Q), R.call(this, "open", Q.direction)) : ie && "swipeleft" == Q.direction && t > K.distance && !oe && !ge ? (p(), R.call(this, Q.direction, e, Q), R.call(this, "open", Q.direction)) : ne && "swipeup" == Q.direction && t > K.distance && !se && !ge ? (v(), R.call(this, Q.direction, e, Q), R.call(this, "open", Q.direction)) : ae && "swipedown" == Q.direction && t > K.distance && !le && !ge ? (m(), R.call(this, Q.direction, e, Q), R.call(this, "open", Q.direction)) : ge && t < K.distance ? (ie && oe && p(), te && re && g(), ne && se && v(), ae && le && m(), R.call(this, Q.direction, e, Q), K.alwaysTrigger && R.call(this, "open", Q.direction)) : ge && t > K.distance ? (ie && oe && w(), te && re && b(), ne && se && y(), ae && le && x(), R.call(this, Q.direction, e, Q), R.call(this, "close", Q.direction)) : !ge && t < K.distance && (ie && !oe && w(), te && !re && b(), ne && !se && y(), ae && !le && x(), K.alwaysTrigger && R.call(this, "close", Q.direction), R.call(this, Q.direction, e, Q)), be = !1, we = !1, e.stopPropagation()
                }
            }

            function f(e, t) {
                var i = -t + e.deltax;
                return i = i > 0 ? 0 : i
            }

            function h(e, t) {
                var i = t - e.deltax;
                return i = i > t ? t : i
            }

            function p(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = e.target || W, e.handle = e.handle || z, i && i.close(), ge = !0, oe = !0, G && (i = J, n = W, ke.addEventListener("click", I, !0)), ue && j(0, 0, e.transition, e.target), ce && j(-A, 0, e.transition, e.handle)
            }

            function g(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = e.target || $, e.handle = e.handle || z, i && i.close(), ge = !0, re = !0, G && (i = J, n = $, ke.addEventListener("click", I, !0)), ue && j(0, 0, e.transition, e.target), ce && j(A, 0, e.transition, e.handle)
            }

            function v(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = e.target || Y, e.handle = e.handle || z, i && i.close(), ge = !0, se = !0, G && (i = J, n = Y, ke.addEventListener("click", I, !0)), ue && j(0, 0, e.transition, e.target), ce && j(0, -A, e.transition, e.handle)
            }

            function m(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = e.target || B, e.handle = e.handle || z, i && i.close(), ge = !0, le = !0, G && (i = J, n = B, ke.addEventListener("click", I, !0)), ue && j(0, 0, e.transition, e.target), ce && j(0, A, e.transition, e.handle)
            }

            function b(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = $, e.handle = he || z, ge = !1, re = !1, G && (i = null, n = null, fe = null, he = null, ke.removeEventListener("click", I, !0)), ue && j(-(A + 1), 0, e.transition, e.target), ce && j(ye, 0, e.transition, e.handle)
            }

            function w(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = W, e.handle = he || z, ge = !1, oe = !1, G && (i = null, n = null, fe = null, he = null, ke.removeEventListener("click", I, !0)), ue && j("101%", 0, e.transition, e.target), ce && j(-ye, 0, e.transition, e.handle)
            }

            function y(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = Y, e.handle = he || z, ge = !1, se = !1, G && (i = null, n = null, fe = null, he = null, ke.removeEventListener("click", I, !0)), ue && j(0, "100%", e.transition, e.target), ce && j(0, -ye, e.transition, e.handle)
            }

            function x(e) {
                e = e || {}, e.transition = e.transition || K.transition, e.target = B, e.handle = he || z, ge = !1, le = !1, G && (i = null, n = null, fe = null, he = null, ke.removeEventListener("click", I, !0)), ue && j(0, -A, e.transition, e.target), ce && j(0, ye, e.transition, e.handle)
            }

            function k() {
                re && b(), oe && w(), le && x(), se && y(), R.call(this, "close")
            }

            function T() {
                if (!pe) return k(), this
            }

            function O(e) {
                if (!pe) {
                    var t = e || {};
                    t.transition = t.transition || K.transition, t.index = t.index || 0;
                    var i, n = t.target;
                    switch (n) {
                    case "swiperight":
                        t.target = $.eq(t.index), i = t.target.parent().index(), t.handle = G ? M.children().eq(i).children(K.handle) : z, he = t.handle, fe = t.target, te && g(t);
                        break;
                    case "swipeleft":
                        t.target = W.eq(t.index), i = t.target.parent().index(), t.handle = G ? M.children().eq(i).children(K.handle) : z, he = t.handle, fe = t.target, ie && p(t);
                        break;
                    case "swipedown":
                        t.target = B.eq(t.index), i = t.target.parent().index(), t.handle = G ? M.children().eq(i).children(K.handle) : z, he = t.handle, fe = t.target, ae && m(t);
                        break;
                    case "swipeup":
                        t.target = Y.eq(t.index), i = t.target.parent().index(), t.handle = G ? M.children().eq(i).children(K.handle) : z, he = t.handle, fe = t.target, ne && v(t);
                        break;
                    default:
                        t.target = $.eq(t.index), i = t.target.parent().index(), t.handle = G ? M.children().eq(i).children(K.handle) : z, he = t.handle, fe = t.target, te && g(t)
                    }
                    return R.call(this, "open", n), this
                }
            }

            function C() {
                return i
            }

            function S() {
                return ge
            }

            function I(e) {
                var n = t(e.target),
                    a = n.closest(W).length || n.closest($).length || n.closest(Y).length || n.closest(B).length || e.target.className.indexOf("bui-mask") > -1 || e.target.className.indexOf("bui-click") > -1;
                i && (a || (i.close(), e.stopPropagation()))
            }

            function E() {
                M.on("touchstart", c).on("touchmove", u).on("touchend", d).on("touchcancel", function () {}), de = !0
            }

            function j(e, t, i, n) {
                var i, a = n || M,
                    e = e || 0,
                    t = t || 0,
                    o = K.zoom ? parseFloat(e) / 100 + "rem" : parseFloat(e) + "px",
                    r = K.zoom ? parseFloat(t) / 100 + "rem" : parseFloat(t) + "px",
                    l = String(e).indexOf("%") > -1 ? e : o,
                    s = String(t).indexOf("%") > -1 ? t : r;
                return i = "number" == typeof i ? "all " + i + "ms" : i || "all 300ms", a.css({
                    "-webkit-transition": i,
                    transition: i,
                    "-webkit-transform": "translate(" + l + "," + s + ")",
                    transform: "translate(" + l + "," + s + ")"
                }).one("webkitTransitionEnd", function () {
                    a.css({
                        "-webkit-transition": "none",
                        transition: "none"
                    })
                }), this
            }

            function L() {
                if (!pe) return M.off("touchmove", u).off("touchend", d).off("touchcancel", function () {}), R.call(this, "lock"), this
            }

            function N() {
                if (!pe) return M.on("touchmove", u).on("touchend", d).on("touchcancel", function () {}), R.call(this, "unlock"), this
            }

            function D(e) {
                var e = 1 == e;
                M && (M.off(), e && M.remove()), F("open"), F("close"), pe = !0
            }

            function P(t, i) {
                return e.on.apply(J, arguments), this
            }

            function F(t, i) {
                return e.off.apply(J, arguments), this
            }

            function R(t) {
                J.self = this == window || this == J ? null : this, e.trigger.apply(J, arguments)
            }
            var M, z, H, A, V, q, U, W, $, Y, B, X, _ = {
                    id: "",
                    handle: ".handle",
                    swiperight: ".swiperight",
                    swipeleft: ".swipeleft",
                    swipeup: ".swipeup",
                    swipedown: ".swipedown",
                    direction: "x",
                    stopHandle: "",
                    hasChild: !1,
                    handleMove: !0,
                    targetMove: !0,
                    alwaysTrigger: !1,
                    width: 0,
                    height: 0,
                    movingDistance: 280,
                    initDistance: 0,
                    zoom: !1,
                    distance: 80,
                    transition: 300
                },
                J = {
                    handle: {},
                    active: C,
                    isActive: S,
                    on: P,
                    off: F,
                    close: T,
                    open: O,
                    destroy: D,
                    lock: L,
                    unlock: N,
                    init: o
                },
                K = J.config = t.extend(!0, {}, _, e.config.swipe, a),
                Q = {},
                Z = K.direction,
                G = K.hasChild,
                ee = !1,
                te = !1,
                ie = !1,
                ne = !1,
                ae = !1,
                oe = !1,
                re = !1,
                le = !1,
                se = !1,
                ce = K.handleMove,
                ue = K.targetMove,
                de = !1,
                fe = null,
                he = null,
                pe = !1,
                ge = !1,
                ve = /hp-tablet/gi.test(navigator.appVersion),
                me = "ontouchstart" in window && !ve,
                be = !1,
                we = !1,
                Q = {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 0,
                    direction: "",
                    deltax: 0,
                    movingleft: 0,
                    movingright: 0,
                    movingup: 0,
                    movingdown: 0
                },
                ye = K.initDistance,
                xe = document,
                ke = xe.documentElement;
            o(K);
            return J
        }
    }(), e
}(bui || {}, libs),
function (e, t) {
    return e.sidebar = function (i) {
        function n(i) {
            var n = t.extend(!0, y, i);
            return y = w.config = n, n.trigger && (C = e.obj(n.trigger)), k = e.obj(n.handle), m = bui.swipe({
                id: n.id,
                handle: n.handle,
                movingDistance: n.width,
                swiperight: n.swiperight,
                swipeleft: n.swipeleft,
                direction: "x",
                hasChild: !1,
                width: 0,
                height: 0,
                handleMove: n.handleMove,
                zoom: n.zoom,
                distance: n.distance,
                transition: 300
            }), y.mask && (x = bui.mask({
                appendTo: n.handle,
                autoTrigger: !1,
                opacity: .01,
                callback: function () {
                    m.close()
                }
            })), O || (a(), n.height > 0 && e.obj(n.id).height(n.height)), this
        }

        function a() {
            var e = this;
            m.on("open", function (t) {
                C && C.addClass("active"), x && x.show(), k.css("overflow-y", "hidden"), T = !0, v.call(e, "open", t)
            }), m.on("close", function () {
                C && C.removeClass("active"), x && x.hide(), k.css("overflow-y", "auto"), T = !1, v.call(e, "close")
            }), C && C.on("click.bui", function () {
                if (!t(this).hasClass("disabled")) {
                    var e = t(this).attr("data-target") || "swiperight";
                    T ? r() : o({
                        target: e
                    })
                }
            }), O = !0
        }

        function o(e) {
            var t = e || {};
            return t.target = t.target || "swiperight", t.transition = t.transition || 300, m.open(t), this
        }

        function r() {
            return m.close(), this
        }

        function l() {
            return m.lock(), v.call(this, "lock"), this
        }

        function s(e) {
            return m.unlock(), v.call(this, "unlock"), this
        }

        function c() {
            return T
        }

        function u() {
            return m.active()
        }

        function d(e) {
            var e = 1 == e;
            C && C.off("click.bui"), g("open"), g("close"), x && x.destroy(e), m && m.destroy(e)
        }

        function f(t) {
            var i = {
                swipe: m,
                mask: x
            };
            return e.widget.call(i, t)
        }

        function h(t, i) {
            return e.option.call(w, t, i)
        }

        function p(t, i) {
            return e.on.apply(w, arguments), this
        }

        function g(t, i) {
            return e.off.apply(w, arguments), this
        }

        function v(t) {
            w.self = this == window || this == w ? null : this, e.trigger.apply(w, arguments)
        }
        var m, b = {
                id: "",
                trigger: "",
                handle: ".bui-page",
                swiperight: ".swiperight",
                swipeleft: ".swipeleft",
                handleMove: !0,
                mask: !0,
                width: 280,
                height: 0,
                zoom: !0,
                distance: 80
            },
            w = {
                handle: {},
                on: p,
                off: g,
                active: u,
                isActive: c,
                open: o,
                close: r,
                lock: l,
                unlock: s,
                destroy: d,
                widget: f,
                option: h,
                config: y,
                init: n
            },
            y = w.config = t.extend(!0, {}, b, e.config.sidebar, i),
            x = null,
            k = null,
            T = !1,
            O = !1,
            C = null;
        return n(y), w
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.listview = function (i) {
        function n(i) {
            var n = t.extend(!0, k, i);
            return k = x.config = n, b = e.obj(n.id), w = b.children(), w.length && a(n), T || o(n), this
        }

        function a(e) {
            e.height > 0 && b.height(e.height), e.data.length ? w.each(function (i, n) {
                var a = t(n),
                    o = a.attr("status"),
                    l = e.menuHeight > 0 ? e.menuHeight : n.offsetHeight;
                if (!o) {
                    var s = r(e);
                    a.append(s).attr("status", "1")
                }
                n.style.height || t(n).height(l)
            }) : w.each(function (i, n) {
                var a = e.menuHeight > 0 ? e.menuHeight : n.offsetHeight;
                n.style.height || t(n).height(a)
            })
        }

        function o(e) {
            var t = this,
                i = function (t) {
                    e.callback && e.callback.call(this, t, m)
                };
            b.on("click.bui", ".bui-listview-menu .bui-btn", i), m = bui.swipe({
                id: e.id,
                handle: e.handle,
                movingDistance: e.menuWidth,
                swiperight: e.swiperight,
                swipeleft: e.swipeleft,
                direction: "x",
                hasChild: !0,
                width: e.width,
                height: 0,
                zoom: k.zoom,
                distance: e.distance,
                transition: 300
            }), m.on("open", function (e) {
                O = !0, v.call(t, "open", e)
            }), m.on("close", function (e) {
                O = !1, v.call(t, "close", e)
            }), T = !0
        }

        function r(e) {
            var i = "",
                n = "right" == e.position ? e.swipeleft.substr(1) : e.swiperight.substr(1);
            return i += '<div class="bui-listview-menu ' + n + '">', t.each(e.data, function (e, t) {
                i += '    <div class="bui-btn ' + t.classname + '">' + t.text + "</div>"
            }), i += "</div>"
        }

        function l() {
            return m.active()
        }

        function s(e) {
            var t = e || {};
            return t.target = t.target || ("right" == k.position ? k.swipeleft.substr(1) : k.swiperight.substr(1)), t.transition = t.transition || 300, t.index = t.index || 0, m.open(t), this
        }

        function c() {
            return m.close(), this
        }

        function u() {
            return m.lock(), v.call(this, "lock"), this
        }

        function d(e) {
            return m.unlock(), v.call(this, "unlock"), this
        }

        function f(e) {
            var e = 1 == e;
            w && (w.off("click.bui"), w = null), b && (b.off("click.bui"), e && b.remove(), b = null), g("open"), g("close"), m && m.destroy(e), k = null, x = null
        }

        function h(t) {
            var i = {
                swipe: m
            };
            return e.widget.call(i, t)
        }

        function p(t, i) {
            return e.option.call(x, t, i)
        }

        function g(t, i) {
            return e.off.apply(x, arguments), this
        }

        function v(t) {
            x.self = this == window || this == x ? null : this, e.trigger.apply(x, arguments)
        }
        var m, b, w, y = {
                id: "",
                data: [],
                handle: ".bui-btn",
                swiperight: ".swiperight",
                swipeleft: ".swipeleft",
                position: "right",
                width: 0,
                height: 0,
                menuWidth: 160,
                menuHeight: 0,
                distance: 80,
                zoom: !1,
                callback: null
            },
            x = {
                active: l,
                lock: u,
                unlock: d,
                open: s,
                close: c,
                destroy: f,
                widget: h,
                option: p,
                config: k,
                init: n
            },
            k = x.config = t.extend(!0, {}, y, e.config.listview, i),
            T = !1,
            O = !1;
        return n(k), x
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.btn = function (i) {
        function n(t) {
            return "object" === e["typeof"](t) ? (d.id = t.id || "", d.handle = t.handle || "", d.progress = "progress" in t && t.progress, d.replace = "replace" in t && t.replace, d.timeout = t.timeout || 3e3) : "string" === e["typeof"](t) && (d.id = t || "", d.handle = "", d.progress = !1, d.replace = !1, d.timeout = 3e3), l = e.obj(d.id), u = d.handle, s = d.progress, c = d.replace, this
        }

        function a(i) {
            var i = i;
            r();
            var n = 0;
            l.on("click.bui", u, function (a) {
                var o = i || t(this).attr("href"),
                    r = t(this).attr("target"),
                    l = t(this).attr("disabled"),
                    u = t(this).hasClass("disabled") || "" == l || "true" == l || "disabled" == l,
                    f = {};
                if (o && !u && !(o && o.indexOf("javascript:") > -1)) {
                    if (o && o.indexOf("?") > -1) {
                        var h = o.split("?");
                        f = e.keyStringToObject(h[1]), o = h[0]
                    }
                    var p, g = t(this).attr("param") || "",
                        v = g && g.indexOf("{") > -1 && g.indexOf("}") > -1 ? JSON.parse(t(this).attr("param")) : {},
                        m = t.extend(!0, f, v),
                        b = t(this).attr("progress") ? "false" != t(this).attr("progress") : s;
                    b && (p = e.loading({
                        autoTrigger: !0,
                        display: "block",
                        width: 30,
                        height: 30,
                        opacity: 0,
                        timeout: d.timeout
                    }));
                    var w = +new Date;
                    if (w - n < 350) return !1;
                    n = w;
                    var y = {
                        url: o,
                        param: m,
                        replace: c
                    };
                    return "_blank" == r ? e.run({
                        id: o,
                        data: m
                    }) : e.load(y), !1
                }
            })
        }

        function o(i, n) {
            var n = n || {};
            r(), l.on("click.bui", u, function (a) {
                var o = this,
                    r = t(o).css("background"),
                    l = "none" == r ? "#fff" : r;
                n.appendTo = o, n.background = n.background || l, n.autoClose = 0 != n.autoClose, n.autoTrigger = 0 != n.autoTrigger;
                var s = e.loading(n);
                return i && i.call(o, s)
            })
        }

        function r() {
            return l.off("click.bui", u), this
        }
        var l, s, c, u, d = {};
        return n(i), {
            load: a,
            submit: o,
            off: r
        }
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.dialog = function (i) {
        function n(i) {
            var n = t.extend(!0, C, i);
            switch (n.appendTo = n.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), F = !1, x = n.effect, n.position) {
            case "top":
                S = "bui-dialog-top", x = n.effect || "fadeInDown";
                break;
            case "bottom":
                S = "bui-dialog-bottom", x = n.effect || "fadeInUp";
                break;
            case "left":
                S = "bui-dialog-left", x = n.effect || "fadeInLeft";
                break;
            case "right":
                S = "bui-dialog-right", x = n.effect || "fadeInRight";
                break;
            case "center":
                S = "bui-dialog-center", x = n.effect || j
            }
            n.fullscreen && (S = "bui-dialog-fullscreen", x = n.effect || j), n.render ? (n.id = e.guid(), d(n), w = e.objId(n.id)) : (w = e.obj(n.id), w.addClass(S)), I = w.width() > D ? D : w.width(), E = w.height() > P ? P : w.height(), w.css("display", "none"), y = e.toggle({
                id: n.id,
                effect: x
            });
            try {
                k = i.mask && e.mask({
                    opacity: i.opacity,
                    appendTo: w.parent(),
                    autoTrigger: !1,
                    onlyOne: !0,
                    autoClose: !1,
                    callback: function () {
                        i.onMask && i.onMask(), C.autoClose && (C.render ? c(u) : c())
                    }
                })
            } catch (a) {
                console.log(a)
            }
            return L && !C.render || f(), C = O.config = n, this
        }

        function a(e) {
            var i = "";
            return i += '<div id="' + e.id + '" class="bui-dialog ' + S + " " + e.className + '" style="display:block">', e.title && (i += '\t<div class="bui-dialog-head">' + e.title + "</div>"), i += '\t<div class="bui-dialog-main">', e.content && (i += e.content), i += "\t</div>", e.buttons && e.buttons.length && (i += '\t<div class="bui-dialog-foot bui-box">', t(e.buttons).each(function (e, t) {
                i += '\t\t<div class="bui-btn span1 ' + (t.className || "") + '" value="' + (t.value || "") + '">' + (t.name || t) + "</div>"
            }), i += "\t</div>"), e.close && (i += '   <div class="bui-dialog-close">' + (e.closeText ? e.closeText : '<i class="icon-close"></i>') + "</div>"), i += "</div>"
        }

        function o(t) {
            if (!s && !F) {
                w.css("display", "block");
                var i = w.attr("status") || 0;
                if (0 == i) {
                    I = C.width || I || w.width(), E = C.height || E || w.height();
                    var n = e.unit.pxToRemZoom(I),
                        a = e.unit.pxToRemZoom(E),
                        o = C.zoom ? n + "rem" : I + "px",
                        r = C.zoom ? a + "rem" : E + "px",
                        c = C.zoom ? "-" + a / 2 + "rem" : "-" + E / 2 + "px",
                        u = C.zoom ? "-" + n / 2 + "rem" : "-" + I / 2 + "px";
                    if ("center" != C.position || C.fullscreen || w.css({
                        width: o,
                        height: r,
                        top: "50%",
                        "margin-top": c,
                        left: "50%",
                        "margin-left": u,
                        right: "auto"
                    }), C.fullscreen || w.css({
                        width: o,
                        height: r
                    }), C.scroll) {
                        var d = w.children(".bui-dialog-head"),
                            h = w.children(".bui-dialog-foot"),
                            p = w.children(".bui-dialog-main"),
                            g = d.length ? d.height() : 0,
                            v = h.length ? h.height() : 0,
                            m = w.height() - g - v;
                        p.css({
                            height: m
                        })
                    }
                    w.attr("status", "1")
                }
                return k && k.show(), y.show(function (e) {
                    s = !0, t && t.call(O, y), l.call(this, "openafter", {
                        target: w[0]
                    })
                }), L || f(), l.call(this, "open", {
                    target: w[0]
                }), this
            }
        }

        function r(e, t) {
            "undefined" == typeof N[e] && (N[e] = []), N[e].push(t)
        }

        function l(e, t) {
            if (N[e] instanceof Array)
                for (var i = N[e], n = 0, a = i.length; n < a; n++) i[n](t)
        }

        function s(e) {
            return s
        }

        function c(t) {
            if (s && !F) {
                var t = t || C.onClose;
                try {
                    y.hide(function (e) {
                        s = !1, t && t.call(O, y)
                    }), k && k.hide(), l.call(this, "close", {
                        target: w[0]
                    })
                } catch (i) {
                    e.showLog(i, "bui.dialog.close")
                }
                return this
            }
        }

        function u() {
            try {
                w.remove(), l.call(this, "remove", {
                    target: null
                })
            } catch (t) {
                e.showLog(t, "bui.dialog.remove")
            }
            return this
        }

        function d(e) {
            var i = a(e);
            return t(e.appendTo).append(i), this
        }

        function f() {
            return w.on("click.bui", ".bui-dialog-close", function (e) {
                C.onClose && C.onClose.call(this, O), C.autoClose && (C.render ? c(u) : c()), e.stopPropagation()
            }), w.on("click.bui", ".bui-dialog-foot .bui-btn", function (e) {
                C.callback && C.callback.call(this, O), C.autoClose && (C.render ? c(u) : c()), e.stopPropagation()
            }), L = !0, this
        }

        function h(t) {
            return e.selector.call(w, t)
        }

        function p(e) {
            return T.title = "提示", T.content = "", T.close = !1, T.render = !0, T.autoClose = !0, T.mask = !0, T.buttons = ["确定"], C = t.extend(!0, T, e), n(C), l.call(this, "create", {
                target: null
            }), this
        }

        function g(e) {
            var e = 1 == e;
            w && (w.off("click.bui"), e && w.remove()), b("open"), b("close"), k && k.destroy(e), y && y.destroy(e), F = !0
        }

        function v(t) {
            var i = {
                toggle: y,
                mask: k
            };
            return e.widget.call(i, t)
        }

        function m(t, i) {
            return e.option.call(O, t, i)
        }

        function r(t, i) {
            return e.on.apply(O, arguments), this
        }

        function b(t, i) {
            return e.off.apply(O, arguments), this
        }

        function l(t) {
            O.self = this == window || this == O ? null : this, e.trigger.apply(O, arguments)
        }
        var w, y, x, k, T = {
                id: "",
                title: "",
                effect: "",
                content: "",
                className: "",
                appendTo: "",
                position: "center",
                fullscreen: !1,
                width: 0,
                height: 0,
                mask: !0,
                opacity: .6,
                render: !1,
                autoClose: !0,
                close: !0,
                scroll: !0,
                closeText: "",
                zoom: !1,
                buttons: [],
                onMask: null,
                onClose: null,
                callback: null
            },
            O = {
                selector: h,
                $: h,
                handle: {},
                on: r,
                off: b,
                open: o,
                close: c,
                isOpen: s,
                create: p,
                remove: u,
                destroy: g,
                widget: v,
                option: m,
                config: C,
                init: n
            },
            C = O.config = t.extend(!1, {}, T, e.config.dialog, i),
            S = "",
            I = "",
            E = "",
            j = "fadeInDown",
            s = !1,
            L = !1,
            N = {},
            D = window.viewport.width() || document.documentElement.clientWidth,
            P = window.viewport.height() || document.documentElement.clientHeight,
            F = !1;
        return C.id && n(C), O
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.alert = function (i, n) {
        var a = e.dialog(),
            o = {};
        o.className = "bui-alert", o.title = "提示", o.width = 400, o.height = 260, o.scroll = !0, o.position = "center", o.autoClose = !0, o.zoom = !0, o.buttons = [{
            name: "确定",
            className: "primary-reverse"
        }], o.callback = n || function () {};
        var r = t.extend(o, e.config.alert),
            l = "";
        try {
            l = "string" == typeof i && i.indexOf("<") > -1 && i.indexOf(">") > -1 ? "<xmp>" + i + "</xmp>" : !i || "object" !== e["typeof"](i) && "array" !== e["typeof"](i) ? i && "function" === e["typeof"](i) ? i.toString() : i : JSON.stringify(i), r.content = '<div class="bui-dialog-text bui-box-center" style="height:100%;">' + l + "</div>"
        } catch (s) {
            e.showLog(s, "bui.alert")
        }
        return a.create(r).open(), a
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.confirm = function (i, n) {
        var a = e.dialog(),
            o = {};
        o.className = "bui-confirm", o.title = "提示", o.width = 400, o.height = 260, o.scroll = !0, o.autoClose = !0, o.zoom = !0, o.position = "center", o.buttons = [{
            name: "取消",
            className: ""
        }, {
            name: "确定",
            className: "primary-reverse"
        }], o.callback = n || function () {};
        var r = {};
        return "object" == typeof i ? (i.content = '<div class="bui-dialog-text bui-box-center" style="height:100%;">' + i.content + "</div>", r = t.extend(o, e.config.confirm, i)) : (r = t.extend(o, e.config.confirm), r.content = '<div class="bui-dialog-text bui-box-center" style="height:100%;">' + i + "</div>", r.callback = n || function () {}), a.create(r).open(), a
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.prompt = function (i, n) {
        var a = e.dialog(),
            o = {};
        o.className = "bui-prompt", o.title = "", o.width = 400, o.height = 260, o.scroll = !0, o.autoClose = !1, o.zoom = !0, o.position = "center", o.buttons = [{
            name: "取消",
            className: ""
        }, {
            name: "确定",
            className: "primary-reverse"
        }], o.callback = n || function () {}, o.placeholder = "", o.row = 1, o.type = "text", o.value = "", o.onChange = null;
        var r = {},
            l = "",
            s = "";
        switch ("object" == typeof i ? (r = t.extend(o, e.config.prompt, i), l = r.content || "") : (r = t.extend(o, e.config.prompt), r.callback = n || function () {}, l = i || ""), r.type) {
        case "number":
            r.content = '<div class="bui-prompt-main bui-box-vertical"> <div class="bui-prompt-label">' + l + '</div> <div class="span1"> <input class="bui-prompt-text" placeholder="' + r.placeholder + '" type="' + r.type + '" value="' + r.value + '"/> </div> </div>';
            break;
        default:
            r.content = '<div class="bui-prompt-main bui-box-vertical"> <div class="bui-prompt-label">' + l + '</div> <div class="span1"> <textarea class="bui-prompt-text" placeholder="' + r.placeholder + '" rows="' + r.row + '" >' + r.value + "</textarea> </div> </div>"
        }
        return a.create(r).open(), t("#" + a.config.id).on("change", ".bui-prompt-text", function () {
            s = this.value, r.onChange && r.onChange.call(this, a)
        }), a.value = function (e) {
            return "undefined" == typeof e ? s : (t("#" + a.config.id).find(".bui-prompt-text").val(e), s = e)
        }, a.focus = function (e) {
            t("#" + a.config.id).find(".bui-prompt-text").focus()
        }, a
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.hint = function (i, n) {
        function a(i) {
            var n = t.extend(!0, T, i);
            return n.appendTo = n.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), y = e.guid(), S = "top" === n.position ? "fadeInDown" : "bottom" === n.position ? "fadeInUp" : n.effect, T = k.config = n, r(y, n.content, O, n.appendTo), ++O, C = e.objId(y), w = e.toggle({
                id: C,
                effect: S
            }), I = !0, w.show(), n.autoClose && (x && clearTimeout(x), x = setTimeout(function (e) {
                n.onClose && n.onClose.call(k), s()
            }, n.timeout)), E || o(n), this
        }

        function o(e) {
            C.on("click.bui", ".bui-hint-close", function (t) {
                s(), e.onClose && e.onClose.call(this, k)
            }), E = !0
        }

        function r(i, n, a, o) {
            var r, l = "11" + a,
                s = e.objId(o) || t("body");
            switch (T.position) {
            case "top":
                r = "bui-hint-top";
                break;
            case "bottom":
                r = "bui-hint-bottom";
                break;
            case "center":
                r = "bui-hint-center"
            }
            var c = T.background ? T.background : "rgba(0,0,0," + T.opacity + ")",
                u = '<div id="' + i + '" class="bui-hint ' + r + '" style="background:' + c + ";z-index:" + l + '">' + n + (T.autoClose ? "" : '<div class="bui-hint-close"><i class="icon-close"></i></div>') + "</div>";
            s.append(u), o && s.css("position", "relative")
        }

        function l() {
            return I
        }

        function s() {
            var e = this;
            return w && (I = !1, w.hide(function () {
                v.call(e, "hide", {
                    target: null
                }), w.remove(), w = null
            })), this
        }

        function c(e) {
            var t = this;
            return w && (I = !1, w.hide(function (i) {
                e && e.call(this, k), v.call(t, "hide", {
                    target: C[0]
                })
            })), this
        }

        function u(e) {
            var t = this;
            return w && (I = !0, w.show(function (i) {
                v.call(t, "show", {
                    target: C[0]
                }), e && e.call(this, k)
            })), this
        }

        function d(e) {
            var e = 1 == e;
            C.off("click.bui"), w && w.destroy(e), g("show"), g("hide")
        }

        function f(t) {
            var i = {
                toggle: w
            };
            return e.widget.call(i, t)
        }

        function h(t, i) {
            return e.option.call(k, t, i)
        }

        function p(t, i) {
            return e.on.apply(k, arguments), this
        }

        function g(t, i) {
            return e.off.apply(k, arguments), this
        }

        function v(t) {
            k.self = this == window || this == k ? null : this, e.trigger.apply(k, arguments)
        }
        var m = {
            appendTo: "",
            content: "",
            timeout: 2e3,
            autoClose: !0,
            opacity: .6,
            background: "",
            effect: "fadeInUp",
            position: "bottom",
            onClose: null
        };
        if ("number" == typeof i || "string" == typeof i) {
            var b = i || "";
            i = {}, i.content = b, i.onClose = n || null
        } else "object" == typeof i && i.content && (i = i);
        var w, y, x, k = {
                handle: {},
                on: p,
                off: g,
                remove: s,
                hide: c,
                show: u,
                isShow: l,
                destroy: d,
                widget: f,
                option: h,
                config: T,
                init: a
            },
            T = k.config = t.extend(!0, {}, m, e.config.hint, i),
            O = 0,
            C = null,
            S = "",
            I = !1,
            E = !1;
        return T.content && a(T), k
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.pullrefresh = function (i) {
        function n(i) {
            var n = t.extend(!0, H, i);
            return n.id ? (O = e.obj(n.id), H = z.config = n, C = O[0], S = O.children(P), I = O.children(F), E = O.children(R), L = a, j = n.refreshTips.end, D = e.loading({
                appendTo: S,
                width: 20,
                height: 20,
                autoClose: !1,
                text: j,
                onlyText: !0,
                display: "inline",
                autoTrigger: !1,
                mask: !1
            }), n.autoLoad && (q = !0, D.start({
                text: n.refreshTips.start,
                onlyText: !1
            }), L()), U || r(n), m(n.height), this) : void e.hint("pullrefresh id不能为空")
        }

        function a() {
            V = (new Date).getTime(), H.onRefresh && H.onRefresh.call(z), T.call(this, "refresh")
        }

        function o() {
            var e, t = (new Date).getTime(),
                i = t - V,
                n = 1e3,
                a = 60 * n,
                o = 60 * a,
                r = Math.floor(i / o),
                l = Math.floor(i / a);
            Math.floor(i / n);
            return e = r <= 0 && l <= 0 ? "刚刚更新" : r <= 0 && l > 0 ? l + "分钟前更新" : "上次更新时间:" + (r < 10 ? "0" + r : r) + ":" + (l < 10 ? "0" + l : l)
        }

        function r(e) {
            A || d(), U = !0
        }

        function l(i) {
            var n = i.originalEvent && i.originalEvent.targetTouches || i.targetTouches,
                a = Y ? n[0] : i;
            return K.x1 = a.pageX, K.y1 = a.pageY, K.direction = "", H.stopHandle && e.checkTargetInclude(i.target, H.stopHandle) ? void(_ = !1) : n.length > 1 || i.scale && 1 !== i.scale ? void(_ = !1) : (j = H.lastUpdated ? o() : H.refreshTips.end, T.call(this, "touchstart", i, K), void(_ = !(!(t(window).scrollTop() <= 0 && O.scrollTop() <= 0 && H.onRefresh) || q)))
        }

        function s(t) {
            var i = t.originalEvent && t.originalEvent.targetTouches || t.targetTouches;
            if (_) {
                if (i.length > 1 || t.scale && 1 !== t.scale) return void h();
                if (!_) return void h();
                var n = Y ? i[0] : t;
                K.x2 = n.pageX, K.y2 = n.pageY, K.direction || (K.direction = e.swipeDirection(K.x1, K.x2, K.y1, K.y2)), T.call(this, "touchmove", t, K), "swipeleft" !== K.direction && "swiperight" !== K.direction || t.preventDefault(), "swipedown" == K.direction ? (T.call(this, "movingdown", t, K), N = Math.abs(K.y2 - K.y1), h(N / 2, !1), N >= H.distance ? Q || (D.show({
                    text: H.refreshTips.release,
                    onlyText: !1
                }).pause(), Q = !0) : Z || (D.show({
                    text: j,
                    onlyText: !1
                }).pause(), Z = !0), J = !0, H.maxDistance > H.distance && N >= H.maxDistance && (D.show({
                    text: H.refreshTips.start,
                    onlyText: !1
                }).start(), q = !0, H.onRefresh && L(), J = !1, Q = !1, Z = !1, K = {}, B += K.y2 - K.y1, X += K.x2 - K.x1, K.lastX = X, K.lastY = B, K = {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 0,
                    direction: ""
                }, _ = !1, J = !1), t.preventDefault(), t.stopPropagation()) : "swipeup" == K.direction && (T.call(this, "movingup", t, K), J = !0)
            }
        }

        function c(e) {
            return T.call(this, "touchend", e, K), J ? ("swipedown" == K.direction ? (T.call(this, K.direction, e, K), N >= H.distance ? (h(H.distance / 2), D.show({
                text: H.refreshTips.start,
                onlyText: !1
            }).start(), q = !0, H.onRefresh && L()) : h(), e.stopPropagation(), Q = !1, Z = !1, K = {}) : "swipeup" == K.direction && T.call(this, K.direction, e, K), B += K.y2 - K.y1, X += K.x2 - K.x1, K.lastX = X, K.lastY = B, K = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                direction: ""
            }, _ = !1, void(J = !1)) : (K = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                direction: ""
            }, _ = !1, void(J = !1))
        }

        function u(e) {
            return A = !0, O.off("touchstart", l).off("touchmove", s).off("touchend", c).off("touchcancel", h), h(), e && e.call(this, z), T.call(this, "lock"), this
        }

        function d(e) {
            return A = !1, O.on("touchstart", l).on("touchmove", s).on("touchend", c).on("touchcancel", h), e && e.call(this, z), T.call(this, "unlock"), this
        }

        function f(e, t, i) {
            return W || (D.show({
                text: H.refreshTips.success,
                onlyText: !1
            }), h(e, t), I.one("webkitTransitionEnd", function () {
                D && D.hide(), W = !1, i && i.call(z)
            })), this
        }

        function h(e, t) {
            t = 0 != t, e = e || 0, q = !1;
            var i = t ? "all 300ms ease-out" : "none";
            return p(0, e + "px", i, I), E.length && p(0, e + "px", i, E), this
        }

        function p(e, t, i, n) {
            var i, n = n || O,
                e = e || 0,
                t = t || 0,
                a = e,
                o = t,
                r = String(e).indexOf("%") > -1 ? String(e) : a,
                l = String(t).indexOf("%") > -1 ? String(t) : o;
            i = "number" == typeof i ? "all " + i + "ms" : i || "all 300ms";
            try {
                n.css({
                    "-webkit-transition": i,
                    transition: i,
                    "-webkit-transform": "translate(" + r + "," + l + ")",
                    transform: "translate(" + r + "," + l + ")"
                }), n.one("webkitTransitionEnd", function () {
                    n.css({
                        "-webkit-transition": "none",
                        transition: "none"
                    })
                })
            } catch (s) {
                console.log(s.message)
            }
        }

        function g() {
            W = !0, h(), e.hint(H.refreshTips.fail), T.call(this, "fail")
        }

        function v() {
            h(H.distance / 2, !0), D.start({
                text: H.refreshTips.start,
                onlyText: !1
            }), H.onRefresh && L()
        }

        function m(e) {
            var t = O.parents(".bui-page"),
                i = (t.children("main"), C && C.offsetTop || 0),
                n = t.children(H.header),
                a = n.length > 1 ? n.eq(n.length - 1).height() : n.height(),
                o = t.children(H.footer),
                r = o.length > 1 ? o.eq(o.length - 1).height() : o.height(),
                l = window.viewport.height() - (a || 0) - (r || 0) - i,
                s = e ? parseFloat(e) : l;
            O.height(s)
        }

        function b(e) {
            var e = 1 == e;
            O && (O.off(), e && O.remove()), D && D.destroy(e), k("refresh"), k("movingdown"), k("swipedown")
        }

        function w(t) {
            var i = {
                loading: D
            };
            return e.widget.call(i, t)
        }

        function y(t, i) {
            return e.option.call(z, t, i)
        }

        function x(t, i) {
            return e.on.apply(z, arguments), this
        }

        function k(t, i) {
            return e.off.apply(z, arguments), this
        }

        function T(t) {
            z.self = this == window || this == z ? null : this, e.trigger.apply(z, arguments)
        }
        var O, C, S, I, E, j, L, N, D, P = "." + e.prefix("scroll-head"),
            F = "." + e.prefix("scroll-main"),
            R = "." + e.prefix("scroll-foot"),
            M = {
                id: "",
                stopHandle: "",
                childrenTop: P,
                childrenMain: F,
                header: ".bui-page header",
                footer: ".bui-page footer",
                distance: 90,
                maxDistance: 0,
                autoLoad: !0,
                lastUpdated: !1,
                height: 0,
                refreshTips: {
                    start: "刷新中..",
                    release: "松开刷新",
                    end: "下拉刷新",
                    fail: "刷新失败,请检查下网络再试试",
                    success: "刷新成功"
                },
                onRefresh: null
            },
            z = {
                handle: {},
                on: x,
                off: k,
                reverse: f,
                refresh: v,
                setHeight: m,
                fail: g,
                lock: u,
                unlock: d,
                destroy: b,
                widget: w,
                option: y,
                config: H,
                init: n
            },
            H = z.config = t.extend(!0, {}, M, e.config.pullrefresh, i),
            A = !1,
            V = (new Date).getTime(),
            q = !1,
            U = !1,
            W = !1,
            $ = /hp-tablet/gi.test(navigator.appVersion),
            Y = "ontouchstart" in window && !$,
            B = 0,
            X = 0,
            _ = !1,
            J = !1,
            K = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                direction: ""
            };
        n(H);
        var Q = !1,
            Z = !1;
        return z
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.scroll = function (i) {
        function n(i) {
            var n = t.extend(!0, X, i);
            if (D = t(window), !n.id) return void e.hint("scroll id不能为空");
            L = e.obj(n.id), ie = n.page, ne = n.pageSize, X = B.config = n, Z = !0, G = !0, ee = !1, te = !1, N = L[0], F = L.children(U), M = L.children(W), R = L.children($), M.css({
                position: "relative"
            }), A = e.loading({
                appendTo: R,
                width: 20,
                height: 20,
                autoClose: !1,
                text: n.scrollTips.start,
                display: "inline",
                autoTrigger: !1,
                mask: !1
            }), z = l, H = r, V ? V.init({
                id: n.id,
                onRefresh: z,
                distance: n.distance,
                maxDistance: n.maxDistance,
                lastUpdated: n.lastUpdated,
                height: n.height,
                refreshTips: n.refreshTips,
                autoLoad: n.autoRefresh
            }) : n.refresh && n.onRefresh ? (V = e.pullrefresh({
                id: n.id,
                onRefresh: z,
                distance: n.distance,
                stopHandle: n.stopHandle,
                maxDistance: n.maxDistance,
                lastUpdated: n.lastUpdated,
                header: n.header,
                footer: n.footer,
                height: n.height,
                refreshTips: n.refreshTips,
                autoLoad: n.autoRefresh
            }), V.lock(), K = !0) : m(n.height);
            try {
                H && H.call(B, ie, ne)
            } catch (o) {
                e.showLog(o, "bui.scroll.init")
            }
            return ae || a(n), this
        }

        function a(t) {
            L.on("scroll", e.unit.debounce(o, t.delayTime)), ae = !0
        }

        function o(e) {
            var t = e.target,
                i = t.scrollTop || 0;
            0 == i ? j.call(this, "scrolltop", e) : t.scrollTop + t.clientHeight >= (t && t.scrollHeight - X.endDistance) && X.onLoad && (X.page = B.config.page = ++ie, X.autoScroll && H && H.call(B, X.page, ne), j.call(this, "scrollbottom", e)), j.call(this, "scrollend", e), X.onScrolling && X.onScrolling.call(this, e, B)
        }

        function r(e, t) {
            return Q = !0, te = !1, G && !ee && (X.page = B.config.page = e, X.onLoad && A && A.start({
                text: X.scrollTips.start,
                onlyText: !1
            }), X.onLoad && X.onLoad.call(B, e, t)), K && X.refresh && V && V.unlock(), this
        }

        function l() {
            Q = !0, G = !0, ee = !1, Z = !0, te = !0, ie = _, ne = X.pageSize, oe = {}, A && A.start({
                text: X.scrollTips.end,
                onlyText: !0
            }), X.page = B.config.page = ie, j.call(this, "refresh", ie), X.onRefresh && X.onRefresh.call(B, ie, ne)
        }

        function s(t, i, n) {
            var n = 0 != n;
            return i && "array" == e["typeof"](i) ? (i = i, Q = !1, re && clearTimeout(re), void(re = setTimeout(function () {
                var e = parseInt(L.height()),
                    a = parseInt(L.find(X.childrenMain)[0] && L.find(X.childrenMain)[0].scrollHeight);
                if (n)
                    if (i && i.length > ne - 1) {
                        if (G = !0, ee = !1, Z = !1, A && A.start({
                            text: X.scrollTips.end,
                            onlyText: !0
                        }), a >= 10 && a < e && X.autoNext && X.onLoad) {
                            var o = ++ie;
                            H && H.call(B, o, ne)
                        }
                        j.call(this, "loadpage", i, ie)
                    } else {
                        G = !1, ee = !0;
                        var r = Z && i.length < 1 ? X.scrollTips.nodata : X.scrollTips.last;
                        A && A.start({
                            text: r,
                            onlyText: !0
                        }), j.call(this, "loadpage", i, ie), j.call(this, "lastpage", i, ie)
                    } else G = !1, ee = !0, A && A.stop();
                return oe[t] = i
            }, 10))) : (e.showLog("scroll 控件的updatePage 第2个参数,必须是一个数组,如果是list控件,检测field的data映射是否准确", "bui.scroll.updatePage"), void(i = []))
        }

        function c(e) {
            return V && V.reverse(), e && e.call(B, V), this
        }

        function u() {
            return te
        }

        function d(e) {
            return oe
        }

        function f(e) {
            oe = {}
        }

        function h(e, t) {
            return J = !0, K = !0, A.show({
                text: X.scrollTips.fail,
                onlyText: !0,
                callback: function (i) {
                    r(e, t)
                }
            }), V && V.lock(), this
        }

        function p(t, i) {
            var n, a, o = [];
            if (t && i)
                for (n in oe) {
                    var r = e.array.filter(t, oe[n], i);
                    if (r.length)
                        for (a in r) o.push(r[a])
                }
            return o
        }

        function g(e, t) {
            var e = e || 0;
            P = L.find(X.children).children(X.handle);
            var i = L.height(),
                n = parseFloat(P.height()),
                a = N.scrollHeight,
                o = n * parseInt(e) - n;
            return a > i && (N.scrollTop = o, j.call(this, "to", e), t && t.call(B, parseInt(e))), this
        }

        function v(e) {
            var i = 0;
            return i = "object" == typeof e ? t(e)[0].offsetTop : "string" == typeof e && e.indexOf("#") > -1 ? t(e)[0].offsetTop : parseInt(e) || 0, N.scrollTop = i, this
        }

        function m(e) {
            var t = L.parents(".bui-page"),
                i = (t.children("main"), N && N.offsetTop || 0),
                n = t.children(X.header),
                a = n.length > 1 ? n.eq(n.length - 1).height() : n.height(),
                o = t.children(X.footer),
                r = o.length > 1 ? o.eq(o.length - 1).height() : o.height(),
                l = window.viewport.height() - (a || 0) - (r || 0) - i,
                s = e ? parseFloat(e) : l;
            L.height(s)
        }

        function b() {
            return L.off("scroll", e.unit.debounce(o, X.delayTime)), j.call(this, "lock"), this
        }

        function w(t) {
            return L.on("scroll", e.unit.debounce(o, X.delayTime)), j.call(this, "unlock"), this
        }

        function y() {
            return g(1), V && V.refresh(), this
        }

        function x(e) {
            var e = e || ie;
            return ie = e, H && H.call(B, ie, ne), this
        }

        function k() {
            return H && H.call(B, ++ie, ne), this
        }

        function T() {
            return ie-- > 0 && H && H.call(B, ie--, ne), this
        }

        function O(e) {
            var e = 1 == e;
            L && (L.off("scroll"), e && L.remove()), V && V.destroy(e), A && A.destroy(e), E("loadpage"), E("lastpage"), E("scrolltop"), E("scrollbottom"), E("scrollend")
        }

        function C(t) {
            var i = {
                pullrefresh: V,
                loading: A
            };
            return e.widget.call(i, t)
        }

        function S(t, i) {
            return e.option.call(B, t, i)
        }

        function I(t, i) {
            return e.on.apply(B, arguments), this
        }

        function E(t, i) {
            return e.off.apply(B, arguments), this
        }

        function j(t) {
            B.self = this == window || this == B ? null : this, e.trigger.apply(B, arguments)
        }
        var L, N, D, P, F, R, M, z, H, A, V, q = "." + e.prefix("list"),
            U = "." + e.prefix("scroll-head"),
            W = "." + e.prefix("scroll-main"),
            $ = "." + e.prefix("scroll-foot"),
            Y = {
                id: "",
                childrenTop: U,
                childrenMain: W,
                childrenBottom: $,
                children: q,
                stopHandle: "",
                header: ".bui-page header",
                footer: ".bui-page footer",
                handle: "li",
                distance: 100,
                endDistance: 1,
                height: 0,
                page: 1,
                pageSize: 10,
                lastUpdated: !0,
                autoRefresh: !1,
                autoNext: !0,
                autoScroll: !0,
                refresh: !0,
                delayTime: 100,
                scrollTips: {
                    start: "努力加载中..",
                    end: "上拉加载更多",
                    nodata: "没有更多内容",
                    last: "没有更多内容",
                    fail: "点击重新加载"
                },
                refreshTips: {
                    start: "刷新中..",
                    release: "松开刷新",
                    end: "下拉刷新",
                    fail: "点击加载",
                    success: "刷新成功"
                },
                onScrolling: null,
                onRefresh: null,
                onLoad: null
            },
            B = {
                handle: {},
                on: I,
                off: E,
                reverse: c,
                updateCache: s,
                updatePage: s,
                getCache: d,
                clearCache: f,
                fail: h,
                filter: p,
                to: g,
                scrollTop: v,
                lock: b,
                unlock: w,
                refresh: y,
                load: x,
                nextPage: k,
                prevPage: T,
                setHeight: m,
                isRefresh: u,
                destroy: O,
                widget: C,
                option: S,
                config: X,
                init: n
            },
            X = B.config = t.extend(!0, {}, Y, e.config.scroll, i),
            _ = X.page,
            J = !1,
            K = !1,
            Q = !1,
            J = !1,
            Z = !0,
            G = !0,
            ee = !1,
            te = !1,
            ie = X.page,
            ne = X.pageSize,
            ae = !1,
            oe = {};
        n(X);
        var re;
        return B
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.list = function (i) {
        function n(i) {
            var n = t.extend(!0, O, i);
            b = e.obj(n.id), w = b.find(n.children), O = T.config = n, S = O.data;
            var r = 0 == O.refresh ? null : l;
            if (O.url) return x ? x.init({
                id: n.id,
                children: n.children,
                handle: n.handle,
                page: n.page,
                pageSize: n.pageSize,
                distance: n.distance,
                maxDistance: n.maxDistance,
                height: n.height,
                refresh: n.refresh,
                autoNext: n.autoNext,
                autoScroll: n.autoScroll,
                scrollTips: n.scrollTips,
                refreshTips: n.refreshTips,
                lastUpdated: n.lastUpdated,
                onRefresh: r,
                onLoad: o
            }) : x = bui.scroll({
                id: n.id,
                children: n.children,
                handle: n.handle,
                header: n.header,
                footer: n.footer,
                page: n.page,
                pageSize: n.pageSize,
                distance: n.distance,
                stopHandle: n.stopHandle,
                maxDistance: n.maxDistance,
                height: n.height,
                refresh: n.refresh,
                autoNext: n.autoNext,
                autoScroll: n.autoScroll,
                scrollTips: n.scrollTips,
                refreshTips: n.refreshTips,
                lastUpdated: n.lastUpdated,
                onRefresh: r,
                onLoad: o
            }), I || a(n), this
        }

        function a(e) {
            return e.callback && b.on("click", e.handle, function (t) {
                e.callback.call(this, t, T, x)
            }), I = !0, this
        }

        function o(n, a, o) {
            function l(e, t, i) {
                var n = (e - 1) * t;
                return n + t >= i.length ? i.slice(n, i.length) : i.slice(n, n + t)
            }

            function s(e, t, a) {
                var o, s;
                o = "string" == typeof e ? e && JSON.parse(e) || {} : e || {}, s = O && O.field && "" == O.field.data ? o || [] : r(O.field.data, o), O.localData && (s = l(n, O.pageSize, s));
                var d = i.template && i.template(s, o, n) || "";
                d && w && w[u](d);
                var f = x && x.isRefresh() || !1;
                m.call(c, "success", e, n, a);
                try {
                    f ? (O.onRefresh && O.onRefresh.call(T, x, o, a), m.call(c, "refresh", e, n, a), O.refresh && x.reverse()) : O.onLoad && O.onLoad.call(T, x, o, a), O.localData ? c && c.updatePage(n, s) : x && x.updatePage(n, s)
                } catch (h) {}
            }
            var c = this,
                u = o || O.commandLoad,
                d = [],
                f = [];
            return S = t.extend(!0, {}, E, O.data, S), O && O.field && O.field.page && O.field.page.indexOf(".") > -1 ? (d = O.field.page.split("."), S[d[0]] = S[d[0]] || {}, S[d[0]][d[1]] = n) : S[O.field.page] = n, O && O.field && O.field.size && O.field.size.indexOf(".") > -1 ? (f = O.field.size.split("."), S[f[0]] = S[f[0]] || {}, S[f[0]][f[1]] = a) : S[O.field.size] = a, O.page = T.config.page = n, O.data = S, O.localData ? void s(O.localData, 200) : (y = e.ajax(O).done(s).fail(function (e, t, i) {
                m.call(c, "fail", e, n, i), O.onFail && O.onFail.call(T, t, x, n, i), x && x.fail(n, a, e)
            }), this)
        }

        function r(e, t) {
            function i(e) {
                var t, n = e[a[o]],
                    r = a[o + 1];
                return t = "string" == typeof n ? JSON.parse(n) : n || [], r && r in t ? (o++, i(t)) : (o = 0, t)
            }
            var n, a = [];
            e && e.indexOf(".") > -1 ? a = e.split(".") : a.push(e);
            var o = 0;
            return n = i(t)
        }

        function l() {
            var e = C,
                t = O.pageSize;
            return m.call(this, "refreshbefore"), o(e, t, O.commandRefresh), this
        }

        function s() {
            return m.call(this, "refreshbefore"), x.refresh(), this
        }

        function c(i, n) {
            var a;
            if ("string" == typeof n) try {
                a = JSON.parse(n)
            } catch (o) {
                return void e.showLog("data 参数必须为对象", "bui.list.modifyData")
            } else a = n;
            return S = t.extend(!0, {}, E, a)
        }

        function u() {
            w.html("")
        }

        function d(e) {
            var e = 1 == e;
            b && (b.off("click.bui"), e && b.remove(), b = null), v("refreshbefore"), v("refresh"), v("success"), v("fail"), x && x.destroy(e)
        }

        function f(t) {
            var i = {
                scroll: x,
                ajax: y
            };
            return e.widget.call(i, t)
        }

        function h(t, i) {
            return "data" == t && "undefined" != typeof i ? c(t, i) : e.option.call(T, t, i)
        }

        function p(e) {
            return O = T.config = t.extend(!0, {}, T.config, e), S = O.data, this
        }

        function g(t, i) {
            return e.on.apply(T, arguments), this
        }

        function v(t, i) {
            return e.off.apply(T, arguments), this
        }

        function m(t) {
            T.self = this == window || this == T ? null : this, e.trigger.apply(T, arguments)
        }
        var b, w, y, x, k = {
                id: "",
                url: "",
                data: {},
                method: "GET",
                dataType: "json",
                headers: {},
                contentType: "",
                timeout: 2e4,
                field: {
                    page: "page",
                    size: "pageSize",
                    data: ""
                },
                scrollTips: {
                    start: "努力加载中..",
                    end: "上拉加载更多",
                    nodata: "没有更多内容",
                    last: "没有更多内容",
                    fail: "点击重新加载"
                },
                refreshTips: {
                    start: "刷新中..",
                    release: "松开刷新",
                    end: "下拉刷新",
                    fail: "点击加载",
                    success: "刷新成功"
                },
                lastUpdated: !1,
                page: 1,
                pageSize: 10,
                autoNext: !0,
                autoScroll: !0,
                "native": !0,
                refresh: !0,
                stopHandle: "",
                children: ".bui-list",
                handle: ".bui-btn",
                header: ".bui-page header",
                footer: ".bui-page footer",
                height: 0,
                commandRefresh: "html",
                commandLoad: "append",
                localData: null,
                template: null,
                onRefresh: null,
                onLoad: null,
                onFail: null,
                callback: null
            },
            T = {
                handle: {},
                on: g,
                off: v,
                empty: u,
                refresh: s,
                modify: p,
                destroy: d,
                widget: f,
                option: h,
                config: O,
                init: n
            },
            O = T.config = t.extend(!0, {}, k, e.config.list, i),
            C = O.page,
            S = {},
            I = !1,
            E = O.data;
        return n(O), T
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.searchbar = function (i) {
        function n(i) {
            var n = t.extend(!0, b, i);
            return f = e.obj(n.id), b = m.config = n, p = f.find("input"), f.find(n.handleRemove).length > 0 ? g : p.after('<i class="' + n.handleRemove.substr(1) + '"></i>'), g = f.find(n.handleRemove), g.hide(), w || a(n), this
        }

        function a(i) {
            return f.on("click.bui", i.handle, function (e) {
                document.activeElement.blur();
                var t = p.val();
                h = t, d.call(this, "search", t), i.callback && i.callback.call(this, m, t)
            }), f.on("click.bui", i.handleRemove, function () {
                document.activeElement.blur(), p.val("");
                var e = p.val();
                h = e, t(this).hide(), d.call(this, "remove", e), i.onRemove && i.onRemove.call(this, m, e)
            }), f.on("input", "input", e.unit.debounce(function () {
                var e = p.val();
                h = e, e ? g.show() : g.hide(), d.call(this, "input", e), i.onInput && i.onInput.call(this, m, e)
            }, i.delayTime)), w = !0, this
        }

        function o(e) {
            return e = e || h, d.call(this, "search", e), b.callback && b.callback.call(this, m, e), this
        }

        function r(e) {
            var e = 1 == e;
            f && (f.off(), e && f.remove()), u("search"), u("remove"), u("input")
        }

        function l(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function s(t, i) {
            return e.option.call(m, t, i)
        }

        function c(t, i) {
            return e.on.apply(m, arguments), this
        }

        function u(t, i) {
            return e.off.apply(m, arguments), this
        }

        function d(t) {
            m.self = this == window || this == m ? null : this, e.trigger.apply(m, arguments)
        }
        var f, h, p, g, v = {
                id: "",
                handle: ".icon-search,.btn-search",
                handleRemove: ".icon-remove",
                delayTime: 400,
                onInput: null,
                onRemove: null,
                callback: null
            },
            m = {
                handle: {},
                on: c,
                off: u,
                search: o,
                destroy: r,
                widget: l,
                option: s,
                config: b,
                init: n
            },
            b = m.config = t.extend(!0, {}, v, e.config.searchbar, i),
            w = !1;
        return n(b), m
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.select = function (i) {
        function n(i) {
            var n = t.extend(!0, F, i);
            if (n.appendTo = n.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), A = [], V = [], R = n.id ? e.obj(n.id).attr("id") : R, F = P.config = n, n.data.length) var o = c(n.data);
            if (n.popup)
                if (N) N.close(), I.find(".bui-dialog-main").html(o);
                else {
                    if (n.id) I = e.obj(n.id);
                    else {
                        var s = l();
                        t(n.appendTo).append(s), I = e.obj(R), I.find(".bui-dialog-main").html(o)
                    }
                    N = e.dialog({
                        id: R,
                        effect: n.effect,
                        mask: n.mask,
                        position: n.position,
                        autoClose: !1,
                        height: n.height,
                        width: n.width,
                        zoom: !1,
                        fullscreen: n.fullscreen,
                        onMask: function (e) {
                            d()
                        }
                    })
                } else {
                if (!n.id) return void e.hint("select id 必须有");
                I = e.obj(n.id), n.data.length && I.html(o)
            }
            return L = I.find(n.handle), n.data.length < 1 && a(), q || r(n), n.value && f(n.value), this
        }

        function a(e) {
            var i = [],
                n = [];
            return L.find("input").each(function (a, r) {
                var l = t(this);
                if (!(l.length < 1)) {
                    var s = l.val(),
                        c = l.attr("text"),
                        u = l.is(":checked");
                    F.data[a] = {}, F.data[a][z] = c, F.data[a][H] = s, i.push(s), n.push(c), u && o({
                        name: c,
                        value: s
                    }), e && e.call(this, a, r)
                }
            }), {
                value: i,
                text: n
            }
        }

        function o(e) {
            switch (F.type) {
            case "radio":
                A = [], V = [], A.push(e.name), V.push(e.value);
                break;
            case "select":
                A = [], V = [], A.push(e.name), V.push(e.value);
                break;
            case "checkbox":
                A.push(e.name), V.push(e.value)
            }
        }

        function r(i) {
            i.trigger && (S = e.obj(i.trigger), j = S.find(i.triggerChildren).length ? S.find(i.triggerChildren) : S, E = i.placeholder || t.trim(j.html()), i.placeholder && j.html(i.placeholder), S.on("click.bui", function (e) {
                t(this).hasClass("disabled") || u()
            }));
            var n = function (n) {
                    var a = t(n.target[n.target.length - 1]),
                        r = a.val(),
                        l = a.attr("text"),
                        s = "INPUT" !== n.srcElement.nodeName ? a.is(":checked") : !a.is(":checked");
                    s ? s && (i.toggle || "checkbox" == i.type) && (C.call(a, "uncheck", n), e.array.remove(l, A), e.array.remove(r, V), i.onChange && i.onChange.call(a, n)) : (C.call(a, "check", n), o({
                        name: l,
                        value: r
                    }), i.onChange && i.onChange.call(a, n)), f(V.join(",") || ""), h(A.join(",") || "")
                },
                a = function (e) {
                    var a = null;
                    e.srcElement = e.originalEvent && e.originalEvent.srcElement || e.srcElement, a = t(this).find("input"), e.target = [a[0]], n.call(a, e), i.popup && i.autoClose && d(), C.call(a, "select", e), e.stopPropagation()
                };
            I.on("click", i.handle, a);
            var r = function (e) {
                i.callback && i.callback.call(this, P), e.stopPropagation()
            };
            I.on("click.bui", i.callbackHandle, r), q = !0
        }

        function l(e) {
            var i = "";
            return F.popup && (i += '<div id="' + R + '" class="bui-dialog bui-dialog-select">', F.title && (i += '<div class="bui-dialog-head">' + F.title + "</div>"), i += '  <div class="bui-dialog-main">'), F.popup && (i += "  </div>", F.buttons.length > 0 && (i += '    <div class="bui-dialog-foot bui-box">', t.each(F.buttons, function (e, t) {
                i += '        <div class="span1">', i += '             <div class="bui-btn ' + (t.className || "") + '" value="' + (t.value || "") + '">' + (t.name || t) + "</div>", i += "        </div>"
            }), i += "    </div>"), i += "</div>"), i
        }

        function s(e) {
            var e = e || {},
                t = document.createElement("input");
            for (var i in e) "string" != typeof e[i] && "number" != typeof e[i] || t.setAttribute(i, e[i]);
            switch (F.type) {
            case "select":
                t.setAttribute("type", "radio"), t.setAttribute("class", F.className || "bui-choose");
                break;
            case "radio":
                t.setAttribute("type", "radio"), t.setAttribute("class", F.className || "bui-checkbox");
                break;
            case "checkbox":
                t.setAttribute("type", "checkbox"), t.setAttribute("class", F.className || "bui-checkbox");
                break;
            default:
                t.setAttribute("type", "checkbox")
            }
            return t
        }

        function c(i) {
            var n = M,
                a = "",
                o = "",
                r = F.template && F.template(i, F);
            return r ? o = r : t.each(i, function (i, a) {
                var r = "string" == typeof a ? a : a[z] || a || "",
                    l = a && a[H] ? a[H] || a : i,
                    c = {
                        name: n,
                        value: l,
                        text: r
                    };
                a = a && "object" === e["typeof"](a) ? a : {};
                var u = t.extend(!0, {}, a, c),
                    d = s(u).outerHTML;
                o += '    <div class="bui-btn bui-box bui-btn-line">', "left" == F.direction && (o += d), "center" == F.direction ? (o += '        <div class="span1" align="center">' + r + "</div>", o += d) : o += '        <div class="span1">' + r + "</div>", "right" == F.direction && (o += d), o += "    </div>"
            }), a += '    <div class="bui-list">', a += o, a += "    </div>"
        }

        function u(e) {
            return C.call(this, "showbefore"), F.popup && N ? !N.isOpen() && N.open(function () {
                e && e.call(P), C.call(this, "show")
            }) : (I.css("display", "block"), e && e.call(P), C.call(this, "show")), this
        }

        function d(e) {
            return C.call(this, "hidebefore"), F.popup && N ? N.isOpen() && N.close(function () {
                e && e.call(P), C.call(this, "hide")
            }) : (I.css("display", "none"), e && e.call(P), C.call(this, "hide")), this
        }

        function f(t) {
            if ("undefined" == typeof t) return V.join(",");
            L = I.find(F.handle);
            var i = [],
                n = [],
                a = [],
                o = [];
            String(t).indexOf(",") > -1 ? o = t.split(",") : t && o.push(t), F.data.forEach(function (t, r) {
                var l = t && "object" === e["typeof"](t) && t.hasOwnProperty(z) ? String(t[z]) : String(t),
                    s = t && "object" === e["typeof"](t) && t.hasOwnProperty(H) ? String(t[H]) : String(r),
                    c = L.eq(r).find("input");
                if ("" == t) return c.prop("checked", !1), A = [], void(V = []);
                var u = e.array.index(l, o),
                    d = e.array.index(s, o);
                d > -1 || u > -1 ? ("radio" != F.type && "select" != F.type || (n = [], a = []), n.push(l), a.push(s), i[r] = c, c.prop("checked", !0)) : c.prop("checked", !1)
            }), A = n.map(function (e, t) {
                return e
            }), V = a.map(function (e, t) {
                return e
            }), C.call(i[i.length - 1], "change", {
                target: i
            }), S && F.change && S.attr("value", a.join(",")), I.attr("value", a.join(","))
        }

        function h(e) {
            return "undefined" == typeof e ? A.join(",") : (S && F.change && (S.attr("text", e), j.html(e || E)), I.attr("text", e), this)
        }

        function p(e) {
            var t = [];
            return String(e).indexOf(",") > -1 ? t = e.split(",") : t.push(parseInt(e)), A = [], V = [], t.forEach(function (e, t) {
                F.data[e] && A.push(F.data[e][z] || F.data[e]), F.data[e] && V.push(F.data[e][H] || t)
            }), "checkbox" == F.type ? (h(A.join(",")), f(V.join(","))) : (h(A[0]), f(V[0])), this
        }

        function g() {
            if ("checkbox" == F.type) {
                var e = F.data.map(function (e, t) {
                    return t
                });
                p(e.join(","))
            } else p(0);
            return this
        }

        function v() {
            return A = [], V = [], L.find("input").prop("checked", null), f(""), h(""), C.call(this, "reset"), this
        }

        function m() {
            if ("checkbox" == F.type) {
                var t = A.map(function (e, t) {
                    return e
                });
                V.map(function (e, t) {
                    return e
                });
                A = [], V = [], F.data.forEach(function (i, n) {
                    var a = L.eq(n).find("input"),
                        o = e.array.index(i[z], t);
                    o > -1 ? a.prop("checked", null) : (a.prop("checked", !0), A.push(i[z]), V.push(i[H]))
                }), f(V.join(",") || ""), h(A.join(",") || "")
            } else v();
            return this
        }

        function b() {
            var e = S;
            return e && e.addClass("disabled"), this
        }

        function w() {
            var e = S;
            return e && e.removeClass("disabled"), this
        }

        function y(e) {
            var e = 1 == e;
            return I && (I.off(), e && I.remove()), S && (S.off("click.bui"), e && S.remove()), N && N.destroy(e), O("show"), O("hide"), O("change"), O("select"), O("check"), O("uncheck"), this
        }

        function x(t) {
            var i = {
                dialog: N || {}
            };
            return e.widget.call(i, t)
        }

        function k(t, i) {
            return e.option.call(P, t, i)
        }

        function T(t, i) {
            return e.on.apply(P, arguments), this
        }

        function O(t, i) {
            return e.off.apply(P, arguments), this
        }

        function C(t) {
            P.self = this == window || this == P ? null : this, e.trigger.apply(P, arguments)
        }
        var S, I, E, j, L, N, D = {
                id: "",
                trigger: "",
                triggerChildren: ".span1",
                handle: ".bui-list .bui-btn",
                className: "",
                name: "",
                appendTo: "",
                data: [],
                popup: !0,
                title: "",
                autoClose: !1,
                placeholder: "",
                field: {
                    name: "name",
                    value: "value"
                },
                height: 0,
                width: 0,
                mask: !0,
                change: !0,
                toggle: !1,
                effect: "fadeInUp",
                type: "radio",
                direction: "left",
                position: "bottom",
                fullscreen: !1,
                value: "",
                buttons: [],
                onChange: null,
                callbackHandle: ".bui-dialog-foot .bui-btn",
                callback: null
            },
            P = {
                handle: {},
                on: T,
                off: O,
                value: f,
                active: p,
                disabled: b,
                enabled: w,
                text: h,
                show: u,
                hide: d,
                selectAll: g,
                selectNone: v,
                unselect: m,
                destroy: y,
                widget: x,
                option: k,
                config: F,
                init: n
            },
            F = P.config = t.extend(!1, {}, D, e.config.select, i),
            R = e.guid(),
            M = F.name || e.guid(),
            z = F.field.name,
            H = F.field.value,
            A = [],
            V = [],
            q = !1;
        return n(F), P
    }, e
}(bui || {}, libs),
function (e) {
    "use strict";
    return e.dropdown = function (t) {
        function i(t) {
            var i = $.extend(!0, I, t);
            if (!i.id) return void e.showLog("dropdown id不能为空", "bui.dropdown.init");
            w = e.obj(i.id), I = S.config = i, y = w.children(i.handle), O = i.target ? w.find(i.target) : y.next(), k = i.relative, x = w.attr("position") || i.position;
            var o = w[0] && w[0].offsetLeft >= document.documentElement.clientWidth ? 0 : w[0] && w[0].offsetLeft,
                l = i.width ? "auto" : -o + "px",
                s = {
                    bottom: {
                        menuPosition: "bui-menu-bottom",
                        arrowPosition: "bui-arrow-up",
                        left: l
                    },
                    top: {
                        menuPosition: "bui-menu-top",
                        arrowPosition: "bui-arrow-down",
                        left: l
                    },
                    left: {
                        menuPosition: "bui-menu-left",
                        arrowPosition: "bui-arrow-right",
                        left: "auto"
                    },
                    right: {
                        menuPosition: "bui-menu-right",
                        arrowPosition: "bui-arrow-left",
                        left: "100%"
                    }
                };
            T = i.width > 0 ? i.width : k ? E : i.width, parseFloat(T) > 0 && O.width(T);
            var c = i.showArrow ? s[x].arrowPosition + " " + s[x].menuPosition : s[x].menuPosition;
            a(c, s[x].left);
            var u = O.find(i.targetHandle + ".active").eq(0),
                d = u.index();
            return d >= 0 && r(d), j || n(i), this
        }

        function n(e) {
            var t = function (e) {
                    if (!$(this).hasClass("disabled")) {
                        var t = $(this).hasClass("active");
                        u(), t ? s() : c(), e.stopPropagation()
                    }
                },
                i = function (t) {
                    var i = $(this).attr("value") || "",
                        n = $.trim($(this).text()),
                        a = void 0 != w.attr("change") ? w.attr("change") : e.change;
                    e.showActive && $(this).addClass("active").siblings().removeClass("active"), o.call(this, i), 1 == a && l.call(this, n), I.autoClose && s(), e.callback && e.callback.call(this, t), I.stopPropagation && t.stopPropagation()
                };
            y.on("click.bui", t), w.on("click.bui", e.targetHandle, i);
            var n = function (e) {
                u(), e.stopPropagation()
            };
            I.autoClose && $("body").off("click.bui").on("click.bui", ":not(.bui-dropdown)", n), j = !0
        }

        function a(e, t) {
            O.addClass(e), k && O.css({
                left: t
            })
        }

        function o(e) {
            if ("undefined" == typeof e) {
                var t = L || y.attr("value");
                return t
            }
            L = e, y.attr("value", e), I.change || b.call(this, "change", {
                target: y[0]
            })
        }

        function r(e) {
            e = parseInt(e);
            var t = O.find(I.targetHandle).eq(e);
            if (t.length > 0) {
                var i = $.trim(t.text()),
                    n = t.attr("value") || "";
                l(i), o(n), I.showActive && t.addClass("active").siblings().removeClass("active")
            }
            return this
        }

        function l(e) {
            if ("undefined" == typeof e) {
                var t = $.trim(y.text());
                return t
            }
            var i = y.children(I.handleChildren);
            return i ? i.text(e) : y.text(e), b.call(this, "change", {
                target: y[0]
            }), this
        }

        function s() {
            return y.removeClass("active"), O.css("display", "none"), b.call(this, "hide", {
                target: y[0]
            }), this
        }

        function c() {
            return y.addClass("active"), O.css("display", "block"), b.call(this, "show", {
                target: y[0]
            }), this
        }

        function u() {
            return $(".bui-dropdown > .bui-btn").removeClass("active"), $(".bui-dropdown > .bui-list").css("display", "none"), b.call(this, "hide", {
                target: y[0]
            }), this
        }

        function d() {
            var e = y;
            return e && e.addClass("disabled"), this
        }

        function f() {
            var e = y;
            return e && e.removeClass("disabled"), this
        }

        function h(e) {
            var e = 1 == e;
            w && (w.off("click.bui"), e && w.remove()), y && (y.off("click.bui"), e && y.remove()), $("body").off("click.bui"), m("show"), m("hide")
        }

        function p(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function g(t, i) {
            return e.option.call(S, t, i)
        }

        function v(t, i) {
            return e.on.apply(S, arguments), this
        }

        function m(t, i) {
            return e.off.apply(S, arguments), this
        }

        function b(t) {
            S.self = this == window || this == S ? null : this, e.trigger.apply(S, arguments)
        }
        var w, y, x, k, T, O, C = {
                id: "",
                handle: ".bui-btn",
                handleChildren: ".span1",
                target: "",
                targetHandle: ".bui-btn",
                position: "bottom",
                showArrow: !1,
                showActive: !0,
                autoClose: !0,
                stopPropagation: !1,
                width: 0,
                relative: !0,
                change: !0,
                callback: null
            },
            S = {
                handle: {},
                on: v,
                off: m,
                active: r,
                disabled: d,
                enabled: f,
                value: o,
                text: l,
                hide: s,
                show: c,
                hideAll: u,
                destroy: h,
                widget: p,
                option: g,
                config: I,
                init: i
            },
            I = S.config = $.extend(!0, {}, C, e.config.dropdown, t),
            E = document.documentElement.clientWidth,
            j = !1,
            L = "";
        return i(I), S
    }, e
}(bui || {}),
function (e, t) {
    "use strict";
    return e.accordion = function (i) {
        function n(i) {
            var n = t.extend(!0, I, i);
            return x = window.viewport.width() || document.documentElement.clientWidth, k = window.viewport.height() || document.documentElement.clientHeight, E = n.id.indexOf(".") > -1 ? t(n.id) : e.obj(n.id) || t("." + e.prefix("accordion")), I = S.config = n, T = n.handle.indexOf("#") > -1 ? e.obj(n.handle) : E.children(n.handle), O = n.target.indexOf("#") > -1 ? e.obj(n.target) : E.children(n.target), a(n), j || o(n), this
        }

        function a(e) {
            T.removeClass("active"), O.css("display", "none"), parseFloat(e.targetHeight) > 0 && O.height(e.targetHeight), parseFloat(e.height) > 0 && E.height(e.height)
        }

        function o(e) {
            var i = function (i) {
                t(this).hasClass("disabled") || t(this).attr("href") || (s.call(this, e), e.callback && e.callback.call(this, S), !t(this).attr("href") && i.stopPropagation())
            };
            e.handle.indexOf("#") > -1 ? T.on("click.bui", i) : E.off("click.bui").on("click.bui", e.handle, i), j = !0
        }

        function r(e) {
            var t;
            return t = "number" == typeof e ? T.eq(e) : T, t && t.addClass("disabled"), this
        }

        function l(e) {
            var t;
            return t = "number" == typeof e ? T.eq(e) : T, t && t.removeClass("disabled"), this
        }

        function s(i) {
            var n = t(this),
                a = n.hasClass("active"),
                o = (T.index(this), i.target.indexOf("#") > -1 ? e.obj(i.target) : n.next(i.target));
            i.single ? a ? (n.removeClass("active"), o.css("display", "none"), y.call(S, "hide", {
                target: n
            })) : (p(), n.addClass("active"), o.css("display", "block"), y.call(S, "show", {
                target: n
            })) : a ? (n.removeClass("active"), o.css("display", "none"), y.call(S, "hide", {
                target: n
            })) : (n.addClass("active"), o.css("display", "block"), y.call(S, "show", {
                target: n
            }))
        }

        function c(e) {
            var e = Number(e) || 0,
                t = T.eq(e).length ? T.eq(e) : T,
                i = O.eq(e).length ? O.eq(e) : t.next(I.target);
            return t.addClass("active"), i.css("display", "block"), y.call(this, "show", {
                target: T[e]
            }), this
        }

        function u(e) {
            var e = Number(e) || 0,
                t = T.eq(e).length ? T.eq(e) : T,
                i = O.eq(e).length ? O.eq(e) : t.next(I.target);
            return t.removeClass("active"), i.css("display", "none"), y.call(this, "hide", {
                target: T[e]
            }), this
        }

        function d() {
            return E.length > 1 ? E.each(function (e, t) {
                f(0, t)
            }) : f(0), y.call(this, "show", {
                target: T[0]
            }), this
        }

        function f(e, i) {
            var e = e || 0,
                n = i ? t(i) : E;
            n.children(I.handle).eq(e).addClass("active").next(I.target).css("display", "block")
        }

        function h() {
            return T.each(function (e, i) {
                t(i).addClass("active").next(I.target).css("display", "block")
            }), y.call(this, "showall", {
                target: T
            }), this
        }

        function p() {
            return T.each(function (e, i) {
                t(i).removeClass("active").next(I.target).css("display", "none")
            }), y.call(this, "hideall", {
                target: T
            }), this
        }

        function g(e) {
            var e = 1 == e;
            E && (E.off("click.bui"), e && E.remove()), w("hide"), w("show")
        }

        function v(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function m(t, i) {
            return e.option.call(S, t, i)
        }

        function b(t, i) {
            return e.on.apply(S, arguments), this
        }

        function w(t, i) {
            return e.off.apply(S, arguments), this
        }

        function y(t) {
            S.self = this == window || this == S ? null : this, e.trigger.apply(S, arguments)
        }
        var x, k, T, O, C = {
                id: "",
                handle: "dt",
                target: "dd",
                height: 0,
                targetHeight: 0,
                single: !1,
                callback: null
            },
            S = {
                handle: {},
                on: b,
                off: w,
                showFirst: d,
                showAll: h,
                hideAll: p,
                disabled: r,
                enabled: l,
                destroy: g,
                show: c,
                hide: u,
                widget: v,
                option: m,
                config: I,
                init: n
            },
            I = S.config = t.extend(!0, {}, C, e.config.accordion, i),
            E = null,
            j = !1;
        return n(I), S
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.rating = function (i) {
        function n(i) {
            var n = t.extend(!0, S, i);
            return n.id ? (w = e.obj(n.id), S = C.config = n, y = n.fullClassName, x = n.halfClassName, l(n), I || r(n), this) : void e.hint("rating id不能为空")
        }

        function a(t) {
            var i = (e.guid(), ""),
                n = 0,
                a = t.stars;
            for (n = 0; n < a; n++) i += '<div class="bui-rating-cell" ></div>';
            return i
        }

        function o(e) {
            var t, i = "",
                e = String(e) || String(k),
                n = 0,
                a = S.stars,
                o = [];
            o = e.indexOf(".") > -1 ? e.split(".") : [e, 0];
            var r = parseInt(o[0]);
            for (t = o[1] / 10 * 100 + "%", n = 0; n < a; n++) n < r && (i += '<div class="bui-rating-cell" ><div class="bui-rating-cell-full" style="width:100%;">&nbsp;</div></div>'), n == r && (i += '<div class="bui-rating-cell" ><div class="bui-rating-cell-full" style="width:' + t + ';">&nbsp;</div></div>'), n > r && (i += '<div class="bui-rating-cell" ><div class="bui-rating-cell-full" style="width:0;">&nbsp;</div></div>');
            return i
        }

        function r(e) {
            if (!e.disabled) {
                var i = String(e.value).indexOf(".") > -1 ? 1 : 0;
                w.on("click.bui", e.handle, function (n) {
                    var a = t(this).index(),
                        o = 0;
                    if (e.half) {
                        o = i % 2 == 0 ? a + .5 : a + 1
                    } else o = a + 1;
                    s(o), c(o), i++, e.callback && e.callback.call(this, C), n.stopPropagation()
                })
            }
            I = !0
        }

        function l(e) {
            if (e.render) {
                var t = a(e);
                w.html(t), T = w.children(e.handle)
            } else T = w.children(e.handle);
            c(e.value)
        }

        function s(e) {
            var i = [];
            e = String(e), S.half && e.indexOf(".") > -1 ? i = e.split(".") : i.push(e), T.removeClass(y).removeClass(x), T.each(function (e, n) {
                1 == i.length && e < i[0] ? t(n).addClass(y) : 2 == i.length && (e < i[0] && t(n).addClass(y), e == i[0] && t(n).addClass(x))
            })
        }

        function c(e) {
            return e ? (w.attr("value", e), s(e), k = e, b.call(this, "change", e)) : k = w.attr("value"), k
        }

        function u(e) {
            var t = o(e);
            w.attr("value", e).html(t), k = e
        }

        function d(e) {
            var e = 0 != e;
            return e ? (w.off("click.bui", S.handle), b.call(this, "disabled")) : f(), this
        }

        function f(e) {
            return S.disabled = !1, r(), b.call(this, "undisabled"), this
        }

        function h(e) {
            var e = 1 == e;
            w && (w.off("click.bui"), e && w.remove()), m("change")
        }

        function p(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function g(t, i) {
            return e.option.call(C, t, i)
        }

        function v(t, i) {
            return e.on.apply(C, arguments), this
        }

        function m(t, i) {
            return e.off.apply(C, arguments), this
        }

        function b(t) {
            C.self = this == window || this == C ? null : this, e.trigger.apply(C, arguments)
        }
        var w, y, x, k, T, O = {
                id: "",
                handle: ".bui-rating-cell",
                fullClassName: "bui-rating-cell-full",
                halfClassName: "bui-rating-cell-half",
                half: !1,
                stars: 5,
                value: 0,
                disabled: !1,
                render: !0,
                callback: null
            },
            C = {
                handle: {},
                on: v,
                off: m,
                disabled: d,
                show: u,
                value: c,
                destroy: h,
                widget: p,
                option: g,
                config: S,
                init: n
            },
            S = C.config = t.extend(!0, {}, O, e.config.rating, i),
            I = !1;
        return n(S), C
    }, e
}(bui || {}, libs),
function (e) {
    "use strict";
    return e.actionsheet = function (t) {
        function i(t) {
            var i = $.extend(!0, k, t);
            i.appendTo = i.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), m = e.obj(i.trigger), k = x.config = i, b = e.guid();
            var r = a(i.buttons);
            return $(i.appendTo).append(r), g = e.dialog({
                id: b,
                position: i.position,
                mask: i.mask,
                opacity: i.opacity,
                onMask: function (e) {
                    o()
                }
            }), w = g.selector(), v = w.find(i.handle), T || n(), this
        }

        function n() {
            var e = function (e) {
                    e.target = this, k.callback && k.callback.call(this, e, x), p.call(this, "click", e)
                },
                t = function (e) {
                    $(this).hasClass("disabled") || r.call(this)
                };
            w && w.on("click.bui", k.handle, e), m && m.on("click.bui", t), T = !0
        }

        function a(e) {
            var t = parseFloat(k.width),
                i = t > 0 ? "width:" + t + "px;left:50%;right:0;margin-left:-" + t / 2 + "px;" : "",
                n = "";
            return e && e.length && (n += '<div id="' + b + '" class="bui-actionsheet" style="' + i + '">', n += '    <ul class="bui-list round">', $.each(e, function (e, t) {
                n += '        <li class="bui-btn ' + (t.className || "") + '" value="' + (t.value || "") + '">' + (t.name || "") + "</li>"
            }), n += "    </ul>", k.cancelText ? n += '    <div class="bui-btn round" value="cancel">' + k.cancelText + "</div>" : "", n += "</div>"), n
        }

        function o(e) {
            var t = this;
            return p.call(t, "hidebefore", {
                target: w[0]
            }), g.isOpen() && g.close(function () {
                e && e.call(x), p.call(t, "hide", {
                    target: w[0]
                })
            }), this
        }

        function r(e) {
            var t = this;
            return p.call(t, "showbefore", {
                target: w[0]
            }), !g.isOpen() && g.open(function () {
                e && e.call(x), p.call(t, "show", {
                    target: w[0]
                })
            }), this
        }

        function l(e) {
            var t = m;
            return t && t.addClass("disabled"), this
        }

        function s() {
            var e = m;
            return e && e.removeClass("disabled"), this
        }

        function c(e) {
            var e = 1 == e;
            m && m.off("click.bui"), h("hide"), h("show"), g && g.destroy(e)
        }

        function u(t) {
            var i = {
                dialog: g
            };
            return e.widget.call(i, t)
        }

        function d(t, i) {
            return e.option.call(x, t, i)
        }

        function f(t, i) {
            return e.on.apply(x, arguments), this
        }

        function h(t, i) {
            return e.off.apply(x, arguments), this
        }

        function p(t) {
            x.self = this == window || this == x ? null : this, e.trigger.apply(x, arguments)
        }
        var g, v, m, b, w, y = {
                appendTo: "",
                trigger: "",
                handle: ".bui-btn",
                position: "bottom",
                width: 0,
                mask: !0,
                opacity: .6,
                buttons: [],
                cancelText: "取消",
                callback: null
            },
            x = {
                handle: {},
                on: f,
                off: h,
                disabled: l,
                enabled: s,
                hide: o,
                show: r,
                destroy: c,
                widget: u,
                option: d,
                config: k,
                init: i
            },
            k = x.config = $.extend(!1, {}, y, e.config.actionsheet, t),
            T = !1;
        return i(k), x
    }, e
}(bui || {}),
function (e, t) {
    return e.number = function (i) {
        function n(i) {
            var n = t.extend(!0, E, i);
            return L = !1, w = n.max, y = n.min, x = n.step, C = n.id ? e.obj(n.id) : t(".bui-number"), E = I.config = n, n.render && o(n), k = C.children(n.prev), T = C.children(n.next), O = C.children(n.input), j || r(n), n.disabled && O.attr("disabled", "disabled"), s(n.value), this
        }

        function a(e) {
            var t = "";
            return t += '    <div class="bui-number-prev"><i class="icon-minus"></i></div>', t += '    <input type="text" value="' + e.value + '"/>', t += '    <div class="bui-number-next"><i class="icon-plus"></i></div>'
        }

        function o(e) {
            var t = a(e);
            return C.html(t), this
        }

        function r(i) {
            return C.off("input", i.input).on("input", i.input, e.unit.debounce(function (e) {
                var n = isNaN(parseInt(t(this).val())) ? 0 : parseInt(t(this).val());
                /^[0-9]*$/i.test(n) && s.call(this, n), i.onInput && i.onInput.call(this, n), e.stopPropagation()
            }, 400)), C.off("click.bui", i.prev).on("click.bui", i.prev, function (e) {
                var n = t(this).parent().children(E.input);
                d.call(n, e), i.callback && i.callback.call(n, e, I), e.preventDefault(), e.stopPropagation()
            }), C.off("click.bui", i.next).on("click.bui", i.next, function (e) {
                var n = t(this).parent().children(E.input);
                f.call(n, e), i.callback && i.callback.call(n, e, I), e.preventDefault(), e.stopPropagation()
            }), j = !0, this
        }

        function l() {
            var e = this == I ? O : t(this),
                i = parseInt(e.val());
            return i
        }

        function s(e) {
            var i = this == I ? O : t(this);
            b.call(i, "change", e);
            var n = e || 0;
            return n > w && (n = w), n < y && (n = y), n && n >= y && n <= w && (n = n), i.val(parseInt(n)), this
        }

        function c(e) {
            var t = 0;
            return e ? (s.call(this, e), t = e) : t = l.call(this), t
        }

        function u(e) {
            var i = this == I ? O : t(this),
                e = 0 != e;
            return e ? i.attr("disabled", "disabled") : i.removeAttr("disabled"), this
        }

        function d() {
            var e = this == I ? O : t(this),
                i = e.val(),
                n = parseInt(i),
                a = n -= x;
            return s.call(this, a), b.call(e, "prev", a), this
        }

        function f() {
            var e = this == I ? O : t(this),
                i = e.val(),
                n = parseInt(i),
                a = n += x;
            return s.call(this, a), b.call(e, "next", a), this
        }

        function h(e) {
            var e = 1 == e;
            C && (C.off("click.bui"), C.off("input"), e && C.remove()), m("prev"), m("next"), m("change"), L = !0
        }

        function p(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function g(t, i) {
            return e.option.call(I, t, i)
        }

        function v(t, i) {
            return e.on.apply(I, arguments), this
        }

        function m(t, i) {
            return e.off.apply(I, arguments), this
        }

        function b(t) {
            I.self = this == window || this == I ? null : this, e.trigger.apply(I, arguments)
        }
        var w, y, x, k, T, O, C, S = {
                id: null,
                min: 0,
                max: 100,
                step: 1,
                value: 0,
                disabled: !1,
                render: !0,
                tips: !1,
                prev: ".bui-number-prev",
                input: "input",
                next: ".bui-number-next",
                onInput: null,
                callback: null
            },
            I = {
                handle: {},
                on: v,
                off: m,
                disabled: u,
                value: c,
                prev: d,
                next: f,
                destroy: h,
                widget: p,
                option: g,
                config: E,
                init: n
            },
            E = I.config = t.extend(!0, {}, S, e.config.number, i),
            j = !1,
            L = !1;
        return n(E), I
    }, e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.stepbar = function (i) {
        function n(i) {
            var n = t.extend(!0, w, i);
            if (!n.id) return void e.hint("stepbar id不能为空");
            g = e.obj(n.id), w = b.config = n;
            var r = a(n.data);
            return t(n.id).html(r), v = g.children(), y || o(n), this
        }

        function a(e) {
            var i = "";
            return t.each(e, function (e, t) {
                i += '<div class="bui-stepbar-cell">', i += '    <span class="bui-stepbar-dot"></span>', i += '    <div class="bui-stepbar-text">', t.title && (i += "        <h3>" + t.title + "</h3>"), t.subtitle && (i += '        <p class="bui-stepbar-time">' + t.subtitle + "</p>"), t.content && (i += '        <p class="bui-stepbar-desc">' + t.content + "</p>"), i += "    </div>", i += "</div>"
            }), i
        }

        function o(e) {
            var i = function (i) {
                if (e.click) {
                    var n = t(this).index();
                    r(n)
                }
                e.callback && e.callback.call(this, i, b)
            };
            return g.on("click.bui", e.handle, i), y = !0, this
        }

        function r(e) {
            if ("number" == typeof e) return e = e >= v.length - 1 ? v.length - 1 : e < 0 ? 0 : e, v.each(function (i, n) {
                i < e && t(n).removeClass("active").addClass("visited"), i == e && t(n).removeClass("visited").addClass("active"), i > e && t(n).removeClass("visited active")
            }), p.call(this, "change", e), e;
            var e = g.children(".active").index();
            return e
        }

        function l() {
            var e = r() + 1;
            return p.call(this, "next", e), r(e)
        }

        function s() {
            var e = r() - 1;
            return p.call(this, "prev", e), r(e)
        }

        function c(e) {
            var e = 1 == e;
            g && (g.off("click.bui"), e && g.remove()), h("next"), h("prev"), h("change")
        }

        function u(t) {
            var i = {};
            return e.widget.call(i, t)
        }

        function d(t, i) {
            return e.option.call(b, t, i)
        }

        function f(t, i) {
            return e.on.apply(b, arguments), this
        }

        function h(t, i) {
            return e.off.apply(b, arguments), this
        }

        function p(t) {
            b.self = this == window || this == b ? null : this, e.trigger.apply(b, arguments)
        }
        var g, v, m = {
                id: null,
                handle: ".bui-stepbar-cell",
                click: !0,
                data: [],
                callback: null
            },
            b = {
                handle: {},
                on: f,
                off: h,
                value: r,
                next: l,
                prev: s,
                destroy: c,
                widget: u,
                option: d,
                config: w,
                init: n
            },
            w = b.config = t.extend(!0, {}, m, e.config.stepbar, i),
            y = !1;
        return n(w), b
    }, e
}(bui || {}, libs);
var Picker = function (e) {
    function t(e) {
        return window.cancelAnimationFrame ? window.cancelAnimationFrame(e) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(e) : window.clearTimeout(e)
    }

    function i(e, t) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i].style;
            n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = t
        }
        return e
    }

    function n(e, t) {
        "string" != typeof t && (t += "ms");
        for (var i = 0; i < e.length; i++) {
            var n = e[i].style;
            n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = t
        }
        return e
    }

    function a(e, t) {
        var i, n, a, o;
        return "undefined" == typeof t && (t = "x"), a = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (n = a.transform || a.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(function (e) {
            return e.replace(",", ".")
        }).join(", ")), o = new WebKitCSSMatrix("none" === n ? "" : n)) : (o = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = o.toString().split(",")), "x" === t && (n = window.WebKitCSSMatrix ? o.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = window.WebKitCSSMatrix ? o.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
    }
    var o = this,
        r = {
            updateValuesOnTouchmove: !1,
            rotateEffect: !1,
            momentumRatio: 7,
            freeMode: !1
        };
    e = e || {};
    for (var l in r) "undefined" == typeof e[l] && (e[l] = r[l]);
    o.params = e, o.cols = [], o.initialized = !1;
    var s = function () {
        var e = navigator.userAgent,
            t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
            i = e.match(/(iPad).*OS\s([\d_]+)/),
            n = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            a = !i && e.match(/(iPhone\sOS)\s([\d_]+)/),
            o = i || n || a,
            r = !!t;
        return o || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !r
    }();
    return o.setValue = function (e, t) {
        var i = 0;
        if (0 === o.cols.length) return o.value = e, void o.updateValue(e);
        for (var n = 0; n < o.cols.length; n++) o.cols[n] && !o.cols[n].divider && (o.cols[n].setValue(e[i], t), i++)
    }, o.updateValue = function (e) {
        for (var t = e || [], i = [], n = 0; n < o.cols.length; n++) o.cols[n].divider || (t.push(o.cols[n].value), i.push(o.cols[n].displayValue));
        t.indexOf(void 0) >= 0 || (o.value = t, o.displayValue = i, o.params.onChange && o.params.onChange(o, o.value, o.displayValue))
    }, o.initPickerCol = function (e, r) {
        function l(e) {
            if (!k && !x) {
                var t = e.originalEvent || e;
                t.preventDefault(), x = !0, T = O = t.targetTouches[0].pageY, C = (new Date).getTime(), P = !0, I = j = a(p.wrapper[0], "y")
            }
        }

        function c(e) {
            if (x) {
                var r = e.originalEvent || e;
                r.preventDefault(), P = !1, O = r.targetTouches[0].pageY, k || (t(y), k = !0, I = j = a(p.wrapper[0], "y"), n(p.wrapper, "0ms")), r.preventDefault();
                var l = O - T;
                j = I + l, E = void 0, j < b && (j = b - Math.pow(b - j, .8), E = "min"), j > w && (j = w + Math.pow(j - w, .8), E = "max"), i(p.wrapper, "translate3d(0," + j + "px,0)"), p.updateItems(void 0, j, 0, o.params.updateValuesOnTouchmove),
                    N = j - L || j, D = (new Date).getTime(), L = j
            }
        }

        function u(e) {
            if (!x || !k) return void(x = k = !1);
            x = k = !1, n(p.wrapper, ""), E && ("min" === E ? i(p.wrapper, "translate3d(0," + b + "px,0)") : i(p.wrapper, "translate3d(0," + w + "px,0)")), S = (new Date).getTime();
            var t, a;
            S - C > 300 ? a = j : (t = Math.abs(N / (S - D)), a = j + N * o.params.momentumRatio), a = Math.max(Math.min(a, w), b);
            var r = -Math.floor((a - w) / v);
            o.params.freeMode || (a = -r * v + w), i(p.wrapper, "translate3d(0," + parseInt(a, 10) + "px,0)"), p.updateItems(r, a, "", !0), setTimeout(function () {
                P = !0
            }, 100)
        }

        function d(e) {
            if (P) {
                t(y);
                var i = $(this).attr("data-picker-value");
                p.setValue(i)
            }
        }
        var f = $(e),
            h = f.index(),
            p = o.cols[h];
        if (!p.divider) {
            p.container = f, p.wrapper = p.container.find(".picker-items-col-wrapper"), p.items = p.wrapper.find(".picker-item");
            var g, v, m, b, w;
            p.replaceValues = function (e, t, i) {
                p.destroyEvents(), p.values = e, p.displayValues = t;
                var n = o.columnHTML(p, !0);
                p.wrapper.html(n), p.items = p.wrapper.find(".picker-item"), p.calcSize(), p.setValue(i || p.values[0], 0, !0), p.initEvents()
            }, p.calcSize = function () {
                o.params.rotateEffect && (p.container.removeClass("picker-items-col-absolute"), p.width || (p.container[0].style.width = ""));
                var e, t;
                e = 0, t = p.container[0].offsetHeight, g = p.wrapper[0].offsetHeight, v = p.items[0].offsetHeight, m = v * p.items.length, b = t / 2 - m + v / 2, w = t / 2 - v / 2, p.width && (e = p.width, parseInt(e, 10) === e && (e += "px"), p.container[0].style.width = e), o.params.rotateEffect && (p.width || (p.items.each(function () {
                    var t = $(this);
                    t[0].style.width = "auto", e = Math.max(e, t[0].offsetWidth), t[0].style.width = ""
                }), p.container[0].style.width = e + 2 + "px"), p.container.addClass("picker-items-col-absolute"))
            }, p.calcSize(), i(p.wrapper, "translate3d(0," + w + "px,0)"), n(p.wrapper, "0ms");
            var y;
            p.setValue = function (e, t, a) {
                "undefined" == typeof t && (t = "");
                var o = p.wrapper.find('.picker-item[data-picker-value="' + e + '"]').index();
                "undefined" != typeof o && o !== -1 || (o = 0);
                var r = -o * v + w;
                i(p.wrapper, "translate3d(0," + r + "px,0)"), n(p.wrapper, t + "ms"), p.updateItems(o, r, t, a)
            }, p.updateItems = function (e, t, r, l) {
                "undefined" == typeof t && (t = a(p.wrapper[0], "y")), "undefined" == typeof e && (e = -Math.round((t - w) / v)), e < 0 && (e = 0), e >= p.items.length && (e = p.items.length - 1);
                var c = p.activeIndex;
                p.wrapper.find(".picker-selected").removeClass("picker-selected"), n(p.items, r);
                var u = p.items.eq(e).addClass("picker-selected");
                if (i(u, ""), o.params.rotateEffect) {
                    (t - (Math.floor((t - w) / v) * v + w)) / v;
                    p.items.each(function () {
                        var e = $(this),
                            n = e.index() * v,
                            a = w - t,
                            o = n - a,
                            r = o / v,
                            l = Math.ceil(p.height / v / 2) + 1,
                            c = -18 * r;
                        c > 180 && (c = 180), c < -180 && (c = -180), Math.abs(r) > l ? e.addClass("picker-item-far") : e.removeClass("picker-item-far"), i(e, "translate3d(0, " + (-t + w) + "px, " + (s ? -110 : 0) + "px) rotateX(" + c + "deg)")
                    })
                }(l || "undefined" == typeof l) && (p.value = u.attr("data-picker-value"), p.displayValue = p.displayValues ? p.displayValues[e] : p.value, c != e && (p.onChange && p.onChange(o, p.value, p.displayValue), o.updateValue()))
            }, r && p.updateItems(0, w, 0);
            var x, k, T, O, C, S, I, E, j, L, N, D, P = !0;
            p.initEvents = function (e) {
                var t = /hp-tablet/gi.test(navigator.appVersion),
                    i = "ontouchstart" in window && !t,
                    n = i ? "touchstart" : "mousedown",
                    a = i ? "touchmove" : "mousemove",
                    o = i ? "touchend" : "mouseup",
                    r = e ? "off" : "on";
                p.container[r](n, l), p.container[r](a, c), p.container[r](o, u), "mouseup" == o && document.documentElement.addEventListener("mouseleave", u, !1), p.items[r]("click", d)
            }, p.destroyEvents = function () {
                p.initEvents(!0)
            }, p.initEvents()
        }
    }, o.columnHTML = function (e, t) {
        var i = "",
            n = "";
        if (e.divider) n += '<div class="picker-items-col picker-items-col-divider ' + (e.textAlign ? "picker-items-col-" + e.textAlign : "") + " " + (e.cssClass || "") + '">' + e.content + "</div>";
        else {
            for (var a = 0; a < e.values.length; a++) i += '<div class="picker-item" data-picker-value="' + e.values[a] + '">' + (e.displayValues ? e.displayValues[a] : e.values[a]) + "</div>";
            n += '<div class="picker-items-col ' + (e.textAlign ? "picker-items-col-" + e.textAlign : "") + " " + (e.cssClass || "") + '"><div class="picker-items-col-wrapper">' + i + "</div></div>"
        }
        return t ? i : n
    }, o.layout = function () {
        var e, t = "",
            i = "";
        o.cols = [];
        var n = "";
        for (e = 0; e < o.params.cols.length; e++) {
            var a = o.params.cols[e];
            n += o.columnHTML(o.params.cols[e]), o.cols.push(a)
        }
        i = "picker-modal picker-columns " + (o.params.cssClass || "") + (o.params.rotateEffect ? " picker-3d" : ""), t = '<div class="' + i + '"><div class="picker-modal-inner picker-items">' + n + '<div class="picker-center-highlight"></div></div></div>', o.pickerHTML = t
    }, o.init = function () {
        o.initialized || (o.layout(), o.container = $(o.pickerHTML), o.container.addClass("picker-modal-inline"), $(o.params.container).html(o.container), o.container.find(".picker-items-col").each(function () {
            var e = !0;
            (!o.initialized && o.params.value || o.initialized && o.value) && (e = !1), o.initPickerCol(this, e)
        }), o.value ? o.setValue(o.value, 0) : o.params.value && o.setValue(o.params.value, 0)), o.initialized = !0
    }, o.init(), o
};
! function (e, t) {
    return e.picker = function (e) {
        return new Picker(e)
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.pickerdate = function () {
        function i(e) {
            if (e && e.constructor == Date) return e;
            if (e && "string" == typeof e) {
                if (e = e.replace(/-/gim, "/").replace(/^(\d+\/\d+?)($|\s)/, function (e, t) {
                    return t + "/1"
                }), e.indexOf("/") < 0) {
                    var t = new Date;
                    e = t.getFullYear() + "/" + t.getMonth() + "/" + t.getDate() + " " + e
                }
                return new Date(e)
            }
            return "number" == typeof e ? new Date(e) : new Date
        }

        function n(e, t) {
            var e, t, i = new Date;
            return i.getTime() < e.getTime() ? e : i.getTime() > t.getTime() ? t : i
        }

        function a(a) {
            function o(e) {
                var t = new Date("1970/1/1");
                return j.forEach(function (i, n) {
                    t["set" + i](e[C[i]].value - ("Month" == i ? 1 : 0))
                }), t
            }

            function r(e) {
                var t = i(e);
                return j.map(function (e, i) {
                    return t["get" + e]() + ("Month" == e ? 1 : 0)
                })
            }

            function l(e) {
                t(this).hasClass("disabled") || O && !O.isOpen() && O.open(function () {})
            }

            function s(t) {
                k.self = this == window || this == k ? null : this, e.trigger.apply(k, arguments)
            }
            var c, u = e.guid(),
                d = {
                    id: u,
                    height: 260,
                    popup: !0,
                    mask: !0,
                    position: "bottom",
                    appendTo: "",
                    rotateEffect: !1,
                    buttons: [{
                        name: "取消",
                        className: ""
                    }, {
                        name: "确定",
                        className: "primary-reverse"
                    }],
                    onMask: function () {
                        O && O.close()
                    }, callback: null
                },
                f = t.extend(!0, {}, d, a);
            f.appendTo = f.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), f.callback = function () {
                var e = a.callback && a.callback.call(this);
                1 != e && "undefined" != typeof e || ("取消" == t(this).text().trim() || "cancel" == t(this).text().trim() || "关闭" == t(this).text().trim() ? k.value(c) : c = k.value())
            };
            var h, p, g, v, m, b, w, y, x, k = this,
                T = function () {},
                O = null,
                C = {},
                S = ["FullYear", "Month", "Date"],
                I = ["Hours", "Minutes", "Seconds"],
                E = {
                    FullYear: "year",
                    Month: "month",
                    Date: "date",
                    Hours: "hour",
                    Minutes: "minute",
                    Seconds: "second"
                },
                j = [],
                L = !1;
            this.config = {}, this.option = function () {}, this.cols = function (e) {
                e = e || {};
                var t = [];
                return y = [], w = [], C = {}, j = [], S.forEach(function (i, n) {
                    "none" !== e[E[i]] && (j.push(i), t.push(i))
                }), I.forEach(function (t, i) {
                    "none" !== e[E[t]] && (j.push(t), y.push(t))
                }), t.forEach(function (t, i) {
                    C[t] = w.length, w.push(P[t](e[E[t]]))
                }), y.forEach(function (i, n) {
                    0 == n && 0 != t.length ? w.push(P.Space()) : w.push(P.Divider()), 0 == t.length && (w[0].content = ""), C[i] = w.length, w.push(P[i](e[E[i]]))
                }), k.picker && (k.picker.params.cols = w, k.picker.initialized = !1, k.picker.init()), L = !1, this
            }, this.id = function (e) {
                e && !v && (v = e)
            }, this.reset = function () {
                return k.picker && (k.picker.initialized = !1, k.picker.init()), this
            }, this.min = function (e) {
                return p = i(e || f.min || "1960/01/01 00:00:00"), this
            }, this.max = function (e) {
                return g = i(e || f.max || "2022/01/01 00:00:00"), this
            }, this.value = function (e) {
                if (e) {
                    var t = i(e),
                        n = r(t);
                    return k.picker.setValue(n, 0), this
                }
                return b(k.picker, k.value, k.displayValue)
            }, this.handle = function (t) {
                if (t && h !== t) {
                    var i = e.obj(h);
                    i && i.off("click", l), i = e.obj(t), i && i.on("click", l), l.hasOpen = !1, h = t
                }
                return this
            };
            var N = {
                y: function (e, t) {
                    return e.getFullYear().toString().slice(-t)
                }, M: function (e, t) {
                    var i = t > 1 ? "0" : "";
                    return (i + (e.getMonth() + 1)).slice(-2)
                }, d: function (e, t) {
                    var i = t > 1 ? "0" : "";
                    return (i + e.getDate()).slice(-2)
                }, h: function (e, t) {
                    var i = t > 1 ? "0" : "";
                    return (i + e.getHours()).slice(-2)
                }, m: function (e, t) {
                    var i = t > 1 ? "0" : "";
                    return (i + e.getMinutes()).slice(-2)
                }, s: function (e, t) {
                    var i = t > 1 ? "0" : "";
                    return (i + e.getSeconds()).slice(-2)
                }
            };
            this.formatValue = function (e) {
                return b = function (t, i, n) {
                    var a = o(t.cols);
                    return e.replace(/y+|M+|d+|h+|m+|s+/g, function (e) {
                        return N[e[0]](a, e.length)
                    })
                }, k.picker && k.picker.updateValue(), L = !1, this
            }, this.onChange = function (e) {
                return m = e || T, s.call(this, "change", x), this
            }, this.popup = function (i) {
                if (f.popup && !O) {
                    var n = '<div id="' + u + '" class="bui-dialog" >';
                    n += '<div class="bui-dialog-main"><div id="' + u + '-picker"></div></div>', f.buttons && f.buttons.length && (n += '<div class="bui-dialog-foot bui-box">', t.each(f.buttons, function (e, t) {
                        var i = "object" == typeof t && "className" in t ? " " + t.className : "",
                            a = "object" == typeof t && "name" in t ? t.name : t;
                        n += '<div class="span1"><div class="bui-btn' + i + '">' + a + "</div></div>"
                    }), n += "</div>"), n += "</div>";
                    t(f.appendTo).append(n);
                    v = e.obj(u + "-picker")
                }
                return this
            };
            var D = function (e, t, i) {
                    var n = o(e.cols),
                        a = p["get" + t](),
                        r = g["get" + t](),
                        l = n.getTime(),
                        s = p.getTime(),
                        c = g.getTime();
                    return l < s && n["get" + t]() < a ? ("Month" == t && (a += 1), void e.cols[C[t]].setValue(a)) : l > c && n["get" + t]() > r ? ("Month" == t && (r += 1), void e.cols[C[t]].setValue(r)) : void(i && (l < s || l > c) && e.cols[C[i]].onChange(e))
                },
                P = {};
            P.FullYear = function (e) {
                return e = e || {
                    values: function () {
                        for (var e = [], t = p.getFullYear(), i = g.getFullYear(), n = t; n <= i; n++) e.push(n);
                        return e
                    }()
                }, {
                    values: e.values,
                    displayValues: e.displayValues,
                    onChange: function (e, t, i) {
                        D(e, "FullYear", C.Month ? "Month" : "")
                    }
                }
            }, P.Month = function (e) {
                return e = e || {
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    displayValues: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                }, {
                    values: e.values,
                    displayValues: e.displayValues,
                    textAlign: "right",
                    onChange: function (e, t, i) {
                        for (var n = new Date(e.cols[C.FullYear].value, parseInt(e.cols[C.Month].value), 0).getDate(), a = [], o = 1; o <= n; o++) a.push(o);
                        var r = e.cols[C.Date];
                        r && r.replaceValues && r.replaceValues(a, null, r.value < n ? r.value : n), D(e, "Month", C.Date ? "Date" : "")
                    }
                }
            }, P.Date = function (e) {
                return e = e || {
                    values: function () {
                        var e = 31,
                            t = [];
                        do t.unshift(e); while (e--);
                        return t
                    }()
                }, {
                    values: e.values,
                    displayValues: e.displayValues,
                    onChange: function (e, t, i) {
                        D(e, "Date", C.Hours ? "Hours" : "")
                    }
                }
            }, P.Space = function () {
                return {
                    divider: !0,
                    content: "  "
                }
            }, P.Hours = function (e) {
                return e = e || function () {
                    for (var e = [], t = [], i = 0; i < 24; i++) e.push(i), t.push(("0" + i).slice(-2));
                    return {
                        values: e,
                        displayValues: t
                    }
                }(), {
                    values: e.values,
                    displayValues: e.displayValues,
                    onChange: function (e, t, i) {
                        D(e, "Hours", C.Minutes ? "Minutes" : "")
                    }
                }
            }, P.Divider = function () {
                return {
                    divider: !0,
                    textAlign: "center",
                    content: ":"
                }
            }, P.Minutes = function (e) {
                return e = e || function () {
                    for (var e = [], t = [], i = 0; i < 60; i++) e.push(i), t.push(("0" + i).slice(-2));
                    return {
                        values: e,
                        displayValues: t
                    }
                }(), {
                    values: e.values,
                    displayValues: e.displayValues,
                    onChange: function (e, t, i) {
                        D(e, "Minutes", C.Seconds ? "Seconds" : "")
                    }
                }
            }, P.Seconds = function (e) {
                return e = e || function () {
                    for (var e = [], t = [], i = 0; i < 60; i++) e.push(i), t.push(("0" + i).slice(-2));
                    return {
                        values: e,
                        displayValues: t
                    }
                }(), {
                    values: e.values,
                    displayValues: e.displayValues,
                    onChange: function (e, t, i) {
                        D(e, "Seconds")
                    }
                }
            }, k.min(f.min), k.max(f.max), k.cols(f.cols), k.onChange(f.onChange), k.formatValue(f.formatValue || "yyyy-MM-dd hh:mm:ss"), k.id(f.id), k.handle(f.handle), k.popup(f), k.picker = e.picker({
                container: v,
                rotateEffect: f.rotateEffect,
                value: r(f.value ? i(f.value) : n(p, g)),
                onChange: function (e, t, i) {
                    var n = b(e, t, i);
                    x != n && (x = n, m(n), s.call(this, "change", n))
                }, cols: w
            }), f.popup && !O && (O = e.dialog(f), O && O.on("open", function () {
                c = b(k.picker, k.value, k.displayValue), k.picker && (k.picker.initialized = !1, k.picker.init()), s.call(this, "show")
            }), O && O.on("close", function () {
                s.call(this, "hide")
            })), this.disabled = function () {
                var t = e.obj(h);
                return t && t.addClass("disabled"), this
            }, this.enabled = function () {
                var t = e.obj(h);
                return t && t.removeClass("disabled"), this
            }, this.destroy = function (e) {
                var e = 1 == e;
                this.off("show"), this.off("hide"), this.off("change"), O && O.destroy(e), k = null
            }, this.widget = function (t) {
                var i = {
                    dialog: O || {}
                };
                return e.widget.call(i, t)
            }, this.on = function (t, i) {
                return e.on.apply(k, arguments), this
            }, this.off = function (t, i) {
                return e.off.apply(k, arguments), this
            }
        }
        return function (e) {
            return new a(e)
        }
    }(), e
}(bui || {}, libs),
function (e, t) {
    "use strict";
    return e.levelselect = function (i) {
        function n(i) {
            var n = "";
            i.popup ? (n = u(i), N.append(n), j = bui.dialog({
                id: b,
                height: i.height,
                mask: i.mask,
                scroll: !1,
                autoClose: i.autoClose,
                fullscreen: i.fullscreen,
                position: i.position,
                effect: i.effect,
                onMask: i.onMask
            }), y = e.obj(b)) : (n = d(i), N.append(n), y = e.objId(b)), x = e.objId(w);
            var a = 0;
            for (a = 0; a < i.level; a++)! function (n) {
                I[n] = t(".select-level-val-" + n, y), S[n] = t(".select-level-" + n, x), i.trigger && (E[n] = t(i.trigger).eq(n)), C[n] = bui.select({
                    id: S[n],
                    type: "select",
                    direction: "right",
                    field: {
                        name: i.field.name
                    },
                    popup: !1,
                    data: [],
                    onChange: function () {}
                }), I[n].on("click", function () {
                    t(this).addClass("active").siblings().removeClass("active"), O.to(n)
                }), C[n] && C[n].on("change", function (a) {
                    i.log && console.log("change", n);
                    var o = C[n].value() || 0,
                        r = C[n].text();
                    T[n] = r;
                    var l = [],
                        s = [];
                    "string" == typeof i.field.data ? l = m[n][o][i.field.data] || m[n][o] : i.field.data && "array" === e["typeof"](i.field.data) && (i.field.data.forEach(function (e, t) {
                        s.push(m[n][o][i.field.data[t]])
                    }), l = s[0] || s[1] || s[2] || s[3] || s[4] || s[5]), m[n + 1] = l, C[n + 1] && C[n + 1].option("data", m[n + 1]), C[n + 2] && C[n + 2].option("data", [""]), S[n] && S[n].find(".bui-btn").removeClass("active"), t(this).parents(".bui-btn").addClass("active"), c(n), I[n] && I[n].text(r), I[n + 1] && I[n + 1].text(i.placeholder), I[n + 2] && I[n + 2].text(""), E[n].text(r), E[n + 1] && E[n + 1].text(i.placeholder), E[n + 2] && E[n + 2].text(""), a.ui = {
                        trigger: E[n],
                        selector: I[n],
                        index: n,
                        select: C[n],
                        data: m[n]
                    }, p.call(this, "change", a), i.popup && !j.isOpen() || (n == i.level - 1 ? (i.log && console.log("close"), i.autoClose && j.close()) : n % i.visibleNum == 1 && (i.log && console.log("next"), O.next()))
                })
            }(a);
            l(i), i.popup && j ? j.on("open", function (e) {
                k = i.popup ? i.height - y.find(".select-value").height() - y.children(".bui-dialog-head").height() : i.height, r(i)
            }) : r(i), I[0].text(i.placeholder), E[0].text(i.placeholder), m[0] = i.data, C[0].option("data", m[0]), i.value && s(i.value), D = !1
        }

        function a() {
            j && j.open(), p.call(this, "show")
        }

        function o() {
            j && j.close(), p.call(this, "hide")
        }

        function r(e) {
            O || (O = bui.slide({
                id: w,
                height: k,
                scroll: !0,
                visibleNum: e.visibleNum
            }).lock(), O.on("to", function (e) {
                var i = t(this).index();
                c(i)
            }))
        }

        function l(e) {}

        function s(t) {
            return "undefined" == typeof t ? T : void(t && "array" === e["typeof"](t) ? t.forEach(function (e, t) {
                C[t].value(e)
            }) : "string" == typeof t && C[0].value(t))
        }

        function c(e) {
            t(".select-value div", y).removeClass("active"), t(".select-value div", y).eq(e).addClass("active")
        }

        function u(e) {
            var t = "";
            return t += '<div id="' + b + '" class="bui-dialog bui-levelselect" style="display:none;">', t += '    <div class="bui-dialog-head">' + e.title + "</div>", t += '    <div class="bui-dialog-main">', t += d(e), t += "    </div>", t += '    <div class="bui-dialog-close"><i class="icon-close"></i></div>', t += "</div>"
        }

        function d(e) {
            var t = "",
                i = 0;
            if (e.popup || (t += '<div id="' + b + '" class="bui-levelselect" style="display:none;">'), e.showValue) {
                for (t += '    <div class="bui-box select-value">', i = 0; i < e.level; i++) t += '        <div class="select-level-val-' + i + '"></div>';
                t += "    </div>"
            }
            for (t += '<div id="' + w + '" class="bui-slide bui-levelselect-slide">', t += '    <div class="bui-slide-main">', t += "        <ul>", i = 0; i < e.level; i++) t += "            <li>", t += '                <div class="select-level-' + i + '"></div>', t += "            </li>";
            return t += "        </ul>", t += "    </div>", t += "</div>", e.popup || (t += "</div>"), t
        }

        function f(t, i) {
            return e.on.apply(L, arguments), this
        }

        function h(t, i) {
            return e.off.apply(L, arguments), this
        }

        function p(t) {
            L.self = this == window || this == L ? null : this, e.trigger.apply(L, arguments)
        }
        var g = {
                popup: !0,
                data: [],
                height: 300,
                appendTo: "",
                title: "所在地区",
                trigger: null,
                placeholder: "请选择",
                level: 3,
                visibleNum: 2,
                log: !1,
                mask: !0,
                autoClose: !0,
                fullscreen: !1,
                position: "bottom",
                effect: "fadeInUp",
                showValue: !0,
                onMask: null,
                value: [],
                field: {
                    name: "n",
                    data: ["c", "a"]
                }
            },
            v = t.extend(!0, {}, g, i),
            m = [],
            b = bui.guid(),
            w = b + "-slide",
            y = null,
            x = null,
            k = 0,
            T = [],
            O = null,
            C = [],
            S = [],
            I = [],
            E = [],
            j = null,
            L = {
                init: n,
                show: a,
                hide: o,
                value: s,
                on: f,
                off: h,
                trigger: p
            };
        i.appendTo = i.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body");
        var N = t(i.appendTo),
            D = !0;
        return n(v), L
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.ajax = function (i) {
        function n(e) {
            var i = function (t, i, n) {
                    var o;
                    if ("string" == typeof t && "json" == e.dataType) try {
                        o = JSON.parse(t)
                    } catch (r) {
                        o = t
                    } else o = t || {};
                    s && s(o, i, n), a.resolve(o, i, n)
                },
                n = function (t, i, n) {
                    var o;
                    if ("string" == typeof t && "json" == e.dataType) try {
                        o = JSON.parse(t)
                    } catch (r) {
                        o = t
                    } else o = t || {};
                    c && c(o, i, n), a.reject(o, i, n)
                };
            e.success = i, e.error = n;
            var r = e.type && e.type.toUpperCase();
            e.type = r || e.method.toUpperCase(), o = t.ajax(e)
        }
        var a = t.Deferred(),
            o = null,
            r = {
                data: {},
                method: "GET",
                dataType: "json",
                timeout: 6e4,
                headers: {},
                processData: !0,
                mimeType: "none",
                cache: !1,
                async: !0,
                needJsonString: !0,
                contentType: "",
                localData: null,
                "native": !0
            },
            l = t.extend(!0, {}, r, e.config.ajax, i),
            s = l.success,
            c = l.fail || l.error;
        if ("" === l.contentType && "GET" == l.method ? l.contentType = "text/html;charset=UTF-8" : "" === l.contentType && "POST" == l.method ? l.contentType = "application/x-www-form-urlencoded" : l.contentType = l.contentType, "application/json" == l.contentType && "object" === e["typeof"](l.data) && l.needJsonString) try {
            l.data = JSON.stringify(l.data)
        } catch (u) {
            l.data = l.data
        }
        if (!l.url) return e.showLog("url不能为空", "bui.ajax"), a;
        if (a.abort = function () {
            o && o.abort()
        }, l.localData) return s && s(l.localData, 200), a.resolve(l.localData, 200), a;
        if (l["native"] && e.isWebapp || !l["native"] && !e.isWebapp) n(l);
        else {
            if ("undefined" == typeof e["native"].ajax) return n(l), a;
            a = e["native"].ajax && e["native"].ajax(l) || a
        }
        return a
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.load = function (i) {
        var n, a = {
                url: "",
                param: {},
                reload: !1,
                replace: !1,
                "native": !0
            },
            o = t.extend(!0, {}, a, e.config.load, i),
            r = o.url;
        if (!o.url) return void e.showLog("url 不能为空!", "bui.load:web");
        if (r.indexOf("tel:") >= 0 || r.indexOf("mailto:") >= 0 || r.indexOf("sms:") >= 0) return void e.unit.openExtral(r);
        try {
            o.param = "string" == typeof o.param && JSON.parse(o.param) || o.param || {}
        } catch (l) {
            return void e.showLog("param 参数值必须是一个{}对象", "bui.load:web")
        }
        return document.activeElement.blur(), n = e.setUrlParams(o.url, o.param), o.reload && e.isWebapp ? void(window.location.href = n) : o.reload && !e.isWebapp ? void(e["native"].load && e["native"].load(o)) : !o.replace || "load" in window.router ? void("load" in window.router ? window.router.load && window.router.load(o) : o["native"] && e.isWebapp || !o["native"] && !e.isWebapp ? window.location.href = n : e["native"].load && e["native"].load(o)) : void window.location.replace(n)
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.getPageParams = function (i) {
        var n = t.Deferred(),
            a = {
                callback: null,
                "native": !0
            };
        i = i || {};
        var o = t.extend(!0, {}, a, e.config.getPageParams);
        if ("function" == typeof i ? o.callback = i : i && "object" === e["typeof"](i) && (o = t.extend(!0, {}, a, e.config.getPageParams, i)), "getPageParams" in window.router) {
            var r = window.router.getPageParams && window.router.getPageParams();
            o.callback && o.callback(r), n.resolve(r)
        } else if (o["native"] && e.isWebapp || !o["native"] && !e.isWebapp) {
            var l = e.getUrlParams();
            o.callback && o.callback(l), n.resolve(l)
        } else n = e["native"].getPageParams && e["native"].getPageParams(o) || n;
        return n
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.back = function (i) {
        function n() {
            if (a.index === -1 ? window.history.back() : window.history.go(a.index), u) try {
                clearTimeout(u)
            } catch (e) {}
            a.delay && a.callback ? u = setTimeout(function () {
                a.callback()
            }, 500) : a.callback && a.callback()
        }
        var a, o = {
            index: -1,
            name: "",
            delay: !0,
            "native": !0,
            callback: null
        };
        if ("function" == typeof i ? (o.callback = i, a = t.extend(!0, {}, o, e.config.back)) : a = i && "object" === e["typeof"](i) ? t.extend(!0, {}, o, e.config.back, i) : t.extend(!0, {}, o, e.config.back), "back" in window.router)
            if (window.router.config.syncHistory) {
                var r = router.getHistory(),
                    l = r.length - 1;
                if (a.name) {
                    var s = e.array.indexs(a.name, r, "pid"),
                        c = s.length;
                    c ? a.index = -(r.length - s[c - 1] - 1) : a.index = -1
                }
                Math.abs(a.index) > l && (a.index = -l), r.length > 1 && n()
            } else window.router.back && window.router.back(a);
        else a["native"] && e.isWebapp || !a["native"] && !e.isWebapp ? n() : e["native"].back && e["native"].back(a);
        var u
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.refresh = function (i) {
        var n = {
                "native": !0
            },
            a = t.extend(!0, {}, n, e.config.refresh, i);
        "refresh" in window.router ? window.router.refresh && window.router.refresh() : a["native"] && e.isWebapp || !a["native"] && !e.isWebapp ? window.location.reload(!0) : e["native"].refresh && e["native"].refresh()
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.run = function (i) {
        var n = {},
            a = {
                id: "",
                name: "",
                data: null,
                onFail: null,
                "native": !0
            };
        "string" == typeof i ? n.id = i : i && "object" === e["typeof"](i) && (n = t.extend(!0, {}, a, e.config.run, i));
        var o = String(n.id);
        if (n["native"] && e.isWebapp || !e.isWebapp && !n["native"]) {
            if (o.indexOf("http://") > -1 || o.indexOf("https://") > -1) {
                var r = e.setUrlParams(n.id, n.data);
                if (e.platform.isIos()) return void(window.location.href = r);
                var l = window.open("", "_blank") || window.open("", "_newtab");
                l.location.href = r
            }
        } else e["native"].run && e["native"].run(n)
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.fileselect = function (i) {
        function n(i) {
            var n = t.extend(!0, g, i);
            switch (g.appendTo = n.appendTo || (e.hasRouter ? router.currentPage() || "body" : "body"), n.mediaType) {
            case "allmedeia":
                x = "*";
                break;
            case "picture":
                x = "image/*";
                break;
            case "image":
                x = "image/*";
                break;
            case "video":
                x = "video/*";
                break;
            case "audio":
                x = "audio/*";
                break;
            default:
                x = n.mediaType
            }
            return w = [], y ? r() : h = e["native"].fileselect && e["native"].fileselect(i, {
                module: v
            }) || {}, this
        }

        function a(i) {
            m = null;
            var n = this,
                a = t.extend(!0, g, i);
            return b = a, y ? (i.from && f.attr("capture", i.from), f.off("change").on("change", function () {
                var t = this.files;
                if (t.length < 1) return void(a.onFail && a.onFail.call(n, t, w));
                t.length > 1 && e.showLog("一次只能选一张图片", "bui.fileselect:web"), m = t[0];
                try {
                    if (!e.array.compare(t[0].name, w, "name")) {
                        var i = {
                            name: t[0].name,
                            data: t[0],
                            type: t[0].type,
                            size: t[0].size
                        };
                        w.push(i)
                    }
                } catch (o) {
                    e.showLog(o, "bui.fileselect:web")
                }
                a.onSuccess && a.onSuccess.call(n, t, w)
            }), e.platform.isIos() && "function" == typeof FastClick ? f[0].dispatchEvent(new Event("click")) : f.trigger("click")) : h.add.bind(n)(a), this
        }

        function o(e) {
            function t(e) {
                var t = new FileReader;
                t.onloadend = function (t) {
                    var i = new Image,
                        a = !1,
                        o = b.width || 800,
                        r = b.quality || .8,
                        l = document.createElement("canvas"),
                        s = l.getContext("2d");
                    i.src = this.result, i.onload = function () {
                        if (!a) return l.width = o, l.height = o * (i.height / i.width), s.drawImage(i, 0, 0, l.width, l.height), i.src = l.toDataURL("image/jpeg", r), n && n.call(v, i.src, e), void(a = !0)
                    }
                }, t.readAsDataURL(e)
            }
            var e = e || {},
                i = e.data || m,
                n = e.onSuccess || function () {};
            e.onFail || function () {};
            if (y) try {
                t(i)
            } catch (a) {} else h.toBase64(e);
            return this
        }

        function r() {
            if (void 0 == f) {
                d = bui.guid();
                var e = g.from ? 'capture="' + g.from + '"' : "",
                    i = '<input type="file" accept="' + x + '" name="uploadFiles" id="' + d + '" ' + e + ' style="display:none"/>';
                t(g.appendTo).append(i), f = t("#" + d) || t('input[name="uploadFiles"]')
            }
        }

        function l(t, i) {
            var i = i || "name";
            if (!y) return w = h.remove(t, i);
            if ("string" == typeof t) {
                e.array.remove(t, w, i);
                var n = w.length ? w[w.length - 1].data : null;
                return m = n, w
            }
            return this
        }

        function s() {
            return w = [], m = null, y || h.clear(), w
        }

        function c() {
            return w = y ? w : h.data()
        }

        function u() {
            return m = y ? m : h.value()
        }
        var d, f, h, p = {
                "native": !0,
                appendTo: "",
                quality: .8,
                from: "camera",
                width: 800,
                height: 800,
                mediaType: "picture"
            },
            g = t.extend(!0, {}, p, e.config.fileselect, i),
            v = {
                add: a,
                remove: l,
                clear: s,
                value: u,
                data: c,
                toBase64: o,
                init: n
            },
            m = null,
            b = null,
            w = [],
            y = g["native"] && e.isWebapp || !g["native"] && !e.isWebapp,
            x = "*";
        return n(g), v
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.file = function (i) {
        function n(t) {
            return b = e.fileselect(t), g = a(t), v = o({
                root: !0,
                create: !0
            }), this
        }

        function a(i) {
            function n(e) {
                var t = "";
                try {
                    switch (e.code) {
                    case FileError.QUOTA_EXCEEDED_ERR:
                        t = "QUOTA_EXCEEDED_ERR";
                        break;
                    case FileError.NOT_FOUND_ERR:
                        t = "NOT_FOUND_ERR";
                        break;
                    case FileError.SECURITY_ERR:
                        t = "SECURITY_ERR";
                        break;
                    case FileError.INVALID_MODIFICATION_ERR:
                        t = "INVALID_MODIFICATION_ERR";
                        break;
                    case FileError.INVALID_STATE_ERR:
                        t = "INVALID_STATE_ERR";
                        break;
                    default:
                        t = "Unknown Error"
                    }
                } catch (e) {}
                var i = {
                    msg: t
                };
                a.reject(i)
            }
            var a = t.Deferred();
            return O ? (h = "bui.app", p = window, m = 1024 * parseInt(T.size) * 1024, window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem, navigator.webkitPersistentStorage && navigator.webkitPersistentStorage.requestQuota(m, function (e) {
                window.requestFileSystem(window.PERSISTENT, e, function (e) {
                    a.resolve(e)
                }, n)
            })) : w = e["native"].file && e["native"].file(i, {
                fileselect: b,
                module: k
            }) || {}, a
        }

        function o(e) {
            var i = {
                    folderName: h,
                    root: !1,
                    create: !1,
                    msg: "",
                    param: {
                        create: !1,
                        exclusive: !1
                    },
                    onSuccess: null,
                    onFail: null
                },
                n = t.extend({}, i, e),
                a = "";
            if (n.create ? (a = "创建 ", n.param.create = !0) : (a = "获取 ", n.param.create = !1), O) {
                var o = r(n.folderName);
                o = n.root ? o : h + "/" + o, g.done(function (e) {
                    e.root.getDirectory(o, n.param, function (t) {
                        n.onSuccess && n.onSuccess.call(k, t, e)
                    }, function (e) {
                        var t = {
                            msg: a + o + " 文件夹失败"
                        };
                        n.onFail && n.onFail.call(k, t)
                    })
                }).fail(function (e) {
                    var t = {
                        msg: "文件系统还没准备好."
                    };
                    n.onFail && n.onFail.call(k, t)
                })
            } else w.getFolder(n);
            return this
        }

        function r(e) {
            var t;
            return "." == e[0] || "/" == e[0] || " " == e[0] ? (t = e.slice(1), r(t)) : "." != e[0] && "/" != e[0] && " " != e[0] ? e : void 0
        }

        function l(e) {
            var t;
            return e && e.indexOf("/") > -1 ? t = e.slice(e.lastIndexOf("/") + 1, e.indexOf("?") > -1 ? e.indexOf("?") : void 0) : e
        }

        function s(e) {
            var i = {
                    fileName: "",
                    folderName: "",
                    root: !1,
                    create: !1,
                    param: {
                        create: !1,
                        exclusive: !1
                    },
                    onSuccess: null,
                    onFail: null
                },
                n = t.extend({}, i, e),
                a = "";
            if (n.create ? (a = "创建 ", n.param.create = !0) : (a = "获取 ", n.param.create = !1), !n.fileName || n.fileName.indexOf(".") < 0) return void(n.onFail && n.onFail());
            if (O) {
                var r = l(n.fileName);
                o({
                    root: n.root,
                    folderName: n.folderName,
                    create: !0,
                    onSuccess: function (e, t) {
                        var i = e.name == h ? e.name + "/" + r : h + "/" + e.name + "/" + r;
                        t.root.getFile(i, n.param, function (e) {
                            y = e, n.onSuccess && n.onSuccess.call(k, e, t)
                        }, function (e) {
                            var t = {
                                msg: a + r + " 文件失败"
                            };
                            n.onFail && n.onFail.call(k, t)
                        })
                    }, onFail: function (e) {
                        n.onFail && n.onFail(e)
                    }
                })
            } else w.getFile(n);
            return this
        }

        function c(e) {
            var i = t.extend(!0, {}, e);
            return O ? o({
                root: i.root,
                folderName: i.folderName,
                create: i.create,
                onSuccess: function (e, t) {
                    e.removeRecursively(function () {
                        i.onSuccess && i.onSuccess.call(k, e, t)
                    }, function (t) {
                        var n = {
                            msg: "删除 " + i.folderName + " 文件失败"
                        };
                        i.onFail && i.onFail.call(k, n, e)
                    })
                }, onFail: function (e) {
                    var t = {
                        msg: "删除 " + i.folderName + " 文件失败"
                    };
                    i.onFail && i.onFail.call(k, t)
                }
            }) : w.removeFolder(i), this
        }

        function u(e) {
            var i = t.extend(!0, {}, e);
            return O ? s({
                root: i.root,
                create: i.create,
                folderName: i.folderName,
                fileName: i.fileName,
                onSuccess: function (e, t) {
                    e.remove(function () {
                        i.onSuccess && i.onSuccess.call(k, e, t)
                    }, function (t) {
                        var n = {
                            msg: "删除 " + i.fileName + " 文件失败"
                        };
                        i.onFail && i.onFail.call(k, n, e)
                    })
                }, onFail: function (e) {
                    var t = {
                        msg: "删除 " + i.fileName + " 文件失败"
                    };
                    i.onFail && i.onFail.call(k, t)
                }
            }) : w.removeFile(i), this
        }

        function d(t) {
            var i = t || {};
            if (i.url) {
                l(i.url);
                return O ? e.showLog("web暂不支持open方法", "bui.file.open:web") : w.open(i), this
            }
        }

        function f(e) {
            return b.toBase64(e), this
        }
        var h, p, g, v, m, b, w, y, x = {
                size: 10,
                "native": !0
            },
            k = {
                getFolder: o,
                removeFolder: c,
                getFile: s,
                getFileName: l,
                removeFile: u,
                toBase64: f,
                open: d,
                init: n
            },
            T = k.config = t.extend(!0, {}, x, e.config.file, i),
            O = T["native"] && e.isWebapp || !T["native"] && !e.isWebapp;
        return n(T), k
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.upload = function (i) {
        function n(t) {
            return v = e.loading({
                display: "block",
                width: 30,
                height: 30,
                opacity: 0,
                callback: function () {
                    u()
                }
            }), m = e.fileselect({
                "native": t["native"],
                from: t.from,
                mediaType: t.mediaType
            }), E || (w = e["native"].upload && e["native"].upload(t, {
                loading: v,
                fileselect: m,
                module: C
            }) || {}), t.data ? (c(t), this) : this
        }

        function a(e) {
            var t = m.add.bind(C);
            return t(e), this
        }

        function o(e, t) {
            var i = s(),
                n = i.length;
            return n && m.remove(i[n - 1].name, t), this
        }

        function r() {
            return m.clear(), this
        }

        function l(e) {
            return m.toBase64(e), this
        }

        function s() {
            return m.data()
        }

        function c(e) {
            var i = t.extend(!0, {}, O, e);
            if (x = i.url, y = m.value(), S = i.showProgress, y) {
                if (S && v.show(), E) {
                    var n = i.data,
                        a = new FormData;
                    a.append(i.fileKey, y);
                    for (var o in n) a.append(o, n[o]);
                    i.data = a, d(i)
                } else w.start(i);
                return this
            }
        }

        function u(e) {
            return E ? (v && v.stop(), b && b.abort(), e && e.call(C, v, b)) : w.stop(e), this
        }

        function d(e) {
            var i = e.onSuccess,
                n = e.onFail;
            return b = t.ajax({
                url: x,
                type: e.method,
                data: e.data,
                cache: e.cache,
                headers: e.headers,
                contentType: e.contentType,
                processData: e.processData,
                timeout: e.timeout,
                xhr: function () {
                    var e = t.ajaxSettings.xhr();
                    if (f && e.upload) return e.upload.addEventListener("progress", f, !1), e
                }, success: function (e) {
                    p(), i && i.call(C, e)
                }, error: function (e, t) {
                    p(), n && n.call(C, e, t)
                }
            }), this
        }

        function f(e) {
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame, window.requestAnimationFrame(function () {
                if (e.lengthComputable) {
                    var t = Math.round(100 * e.loaded / e.total);
                    k = t.toString() + "%", t < 100 ? h(k) : p(), I && I.call(C, k)
                }
            })
        }

        function h(e) {
            return v && v.show({
                text: e
            }), this
        }

        function p() {
            return v && v.stop(), this
        }

        function g(t) {
            var i = {
                loading: v,
                fileselect: m,
                ajax: b
            };
            return e.widget.call(i, t)
        }
        var v, m, b, w, y, x, k, T = {
                url: "",
                data: null,
                headers: {},
                showProgress: !0,
                timeout: 6e4,
                "native": !0,
                contentType: !1,
                processData: !1,
                method: "POST",
                fileKey: "file",
                mediaType: "picture",
                from: "",
                onProgress: null,
                onSuccess: null,
                onFail: null
            },
            O = t.extend(!0, {}, T, e.config.upload, i),
            C = {
                init: n,
                add: a,
                remove: o,
                clear: r,
                data: s,
                start: c,
                stop: u,
                toBase64: l,
                widget: g
            },
            S = O.showProgress,
            I = O.onProgress,
            E = O["native"] && e.isWebapp || !O["native"] && !e.isWebapp;
        return n(O), C
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.download = function (i) {
        function n(t) {
            function i(e) {
                h.getFolder({
                    folderName: e.folderName,
                    create: !1,
                    onSuccess: function (e, t) {
                        m = e.fullPath
                    }, onFail: function (t) {
                        h.getFolder({
                            folderName: e.folderName,
                            create: !0,
                            onSuccess: function (e, t) {
                                m = e.fullPath
                            }, onFail: function (e) {
                                S && S(e)
                            }
                        })
                    }
                }), e.url && a(e)
            }
            return y = e.loading({
                display: "block",
                width: 30,
                height: 30,
                opacity: 0,
                callback: function () {
                    r()
                }
            }), h = e.file({
                "native": t["native"]
            }), O ? i(t) : p = e["native"].download && e["native"].download(t, {
                file: h,
                loading: y,
                module: k
            }) || {}, this
        }

        function a(e) {
            var i = t.extend(!0, {}, T, e);
            g = i.url, v = encodeURI(g), C = i.onProgress, i.showProgress && y.show({
                text: "0%"
            }), b = m + "/" + (e.fileName || h.getFileName(g)), O ? (i.cache = !1, i.contentType = !1, i.processData = !1, f = t.ajax({
                url: v,
                type: i.method,
                data: i.data,
                cache: i.cache,
                headers: i.headers,
                contentType: i.contentType,
                processData: i.processData,
                timeout: i.timeout,
                xhr: function () {
                    var e = t.ajaxSettings.xhr();
                    if (l && e) return e.addEventListener("progress", l, !1), e
                }, success: function (t) {
                    var n = e.fileName || h.getFileName(i.url);
                    h.getFile({
                        fileName: n,
                        folderName: i.folderName,
                        create: !0,
                        onSuccess: function (e, t) {
                            i.onSuccess && i.onSuccess.call(k, e.fullPath, t)
                        }
                    })
                }, fail: function (e) {
                    c(), i.onFail && i.onFail.call(k, e)
                }
            })) : p.start(i)
        }

        function o(e) {
            var i = t.extend(!0, {
                    autoDown: !0
                }, T, e),
                n = e.fileName || h.getFileName(i.url);
            h.getFile({
                fileName: n,
                folderName: i.folderName,
                onSuccess: function (e, t) {
                    i.onSuccess && i.onSuccess.call(k, e.fullPath, e, t)
                }, onFail: function (e) {
                    i.autoDown = a(i)
                }
            })
        }

        function r(e) {
            O ? (c(), f && f.abort()) : p.stop(), e && e.call(k, y, f)
        }

        function l(e) {
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame, window.requestAnimationFrame(function () {
                if (e.lengthComputable) {
                    var t = Math.round(100 * e.loaded / e.total);
                    w = t.toString() + "%", t < 100 ? s(w) : c(), C && C.call(k, w)
                }
            })
        }

        function s(e) {
            y && y.show({
                text: e
            })
        }

        function c() {
            y && y.stop()
        }

        function u(e) {
            return h.toBase64(e), this
        }

        function d(t) {
            var i = {
                loading: y,
                file: h,
                ajax: f
            };
            return e.widget.call(i, t)
        }
        var f, h, p, g, v, m, b, w, y, x = {
                url: "",
                data: {},
                headers: {},
                method: "GET",
                showProgress: !0,
                timeout: 6e4,
                fileName: "",
                folderName: "download",
                "native": !0,
                onProgress: null,
                onSuccess: null,
                onFail: null
            },
            k = {
                getFile: o,
                start: a,
                stop: r,
                toBase64: u,
                init: n,
                widget: d
            },
            T = k.config = t.extend(!0, {}, x, e.config.download, i),
            O = T["native"] && e.isWebapp || !T["native"] && !e.isWebapp,
            C = (T.showProgress, T.onProgress),
            S = T.onFail;
        return n(T), k
    }, e
}(bui || {}, libs),
function (e, t) {
    return e.currentPlatform = "webapp", e.ready = function (i) {
        e.isWebapp = "undefined" == typeof e.isWebapp ? e.debug : e.isWebapp;
        var n = t.Deferred();
        if (e.isWebapp) t(document).ready(function () {
            i && i(), e.trigger.call(e, "pageready"), n.resolve()
        });
        else {
            if ("undefined" == typeof e["native"].ready) return e.showLog("当前bui.js为webapp版本,不支持原生方法,请更换bui.js为对应平台版本"), n;
            n = e["native"].ready && e["native"].ready(i) || n
        }
        return n
    }, e
}(bui || {}, libs),
function (e, t) {
    e.init = function (i) {
            var n, a = {
                id: ".bui-page",
                height: 0,
                header: "header",
                main: "main",
                footer: "footer"
            };
            if ("object" == e["typeof"](i)) n = t.extend({}, a, e.config.init, i);
            else {
                var o = {};
                o.height = i, n = t.extend({}, a, o)
            }
            var r = n.height || document.documentElement.clientHeight;
            if (!(t(n.main).length < 1)) {
                try {
                    var l = t(n.id),
                        s = n.header.indexOf("#") > -1 ? e.obj(n.header)[0] : l.children(n.header)[0],
                        c = n.footer.indexOf("#") > -1 ? e.obj(n.footer)[0] : l.children(n.footer)[0],
                        u = n.main.indexOf("#") > -1 ? e.obj(n.main) : l.children(n.main),
                        d = s ? s.offsetHeight : 0,
                        f = c ? c.offsetHeight : 0,
                        h = r - d - f;
                    u.height(h)
                } catch (p) {
                    e.showLog(p, "bui.init")
                }
                return h
            }
        }, window.loader = e.loader(), e.define = loader.define,
        e.require = loader.require, e.map = loader.map, e["import"] = loader["import"], e.checkLoad = loader.checkLoad, e.checkDefine = loader.checkDefine, window.addEventListener ? window.addEventListener("load", function (t) {
            e.trigger.call(e, "onload")
        }, !1) : window.attachEvent("onload", function (t) {
            e.trigger.call(e, "onload")
        }), t(document).ready(function () {
            e.isWebapp = "undefined" == typeof e.isWebapp ? e.debug : e.isWebapp, e.trigger.call(e, "pagebefore"), e.platform.isWindow() || e.platform.isMac() ? window.viewport = e.viewport(60) : e.platform.isIpad() ? window.viewport = e.viewport(70) : window.viewport = e.viewport(), e.config.init.auto && e.init(), "function" == typeof FastClick && FastClick.attach(document.body), e.trigger.call(e, "pageinit")
        });
    try {
        var i = "hidden" in document ? "hidden" : "webkitHidden" in document ? "webkitHidden" : "",
            n = i.replace(/hidden/i, "visibilitychange"),
            a = function (t) {
                document[i] ? e.trigger.call(e, "pagehide", t) : e.trigger.call(e, "pageshow", t)
            };
        document.addEventListener(n, a)
    } catch (o) {}
    try {
        navigator.control.gesture(!1), navigator.control.longpressMenu(!1)
    } catch (o) {}
    return "function" == typeof define && "object" == typeof define.amd && define.amd ? define("bui", [libs], function () {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports.bui = e : window.bui = e, e
}(bui || {}, libs);