function ( f, m) {
  function y(a) {
    if (a) return a.replace(/^\s+|\s+$/g, "");
  }
  function x(a, h) {
    if (!a) return {};
    var b = "INFO" === h.logLevel;
    a.m && a.m.message && (a = a.m);
    var e = h.m || h.message || "";
    e =
      a.m && a.m.message
        ? e + a.m.message
        : a.m && a.m.target && a.m.target.tagName
        ? e + ("Error handler invoked by " + a.m.target.tagName + " tag")
        : a.m
        ? e + a.m
        : a.message
        ? e + a.message
        : e + "Unknown error";
    e = {
      m: e,
      name: a.name,
      type: a.type,
      csm: N + " " + (a.fromOnError ? "onerror" : "ueLogError"),
    };
    var k,
      l = 0;
    e.logLevel = h.logLevel || A;
    h.adb && (e.adb = h.adb);
    if ((k = h.attribution)) e.attribution = "" + k;
    if (!b) {
      e.pageURL =
        h.pageURL ||
        "" + (window.location ? window.location.href : "") ||
        "missing";
      e.f =
        a.f ||
        a.sourceURL ||
        a.fileName ||
        a.filename ||
        (a.m && a.m.target && a.m.target.src);
      e.l = a.l || a.line || a.lineno || a.lineNumber;
      e.c = a.c ? "" + a.c : a.c;
      e.s = [];
      e.t = f.ue.d();
      if ((b = a.stack || (a.err ? a.err.stack : "")) && b.split)
        for (
          e.csm += " stack", k = b.split("\n");
          l < k.length && e.s.length < F;

        )
          (b = k[l++]) && e.s.push(y(b));
      else {
        e.csm += " callee";
        var m = z(a.args || arguments, "callee");
        for (k = l = 0; m && l < F; ) {
          var w = G;
          m.skipTrace ||
            ((b = m.toString()) &&
              b.substr &&
              ((w = 0 === k ? 4 * G : w),
              (w = 1 == k ? 2 * G : w),
              e.s.push(b.substr(0, w)),
              k++));
          m = z(m, "caller");
          l++;
        }
      }
      if (!e.f && 0 < e.s.length && (l = e) && l.s) {
        var p;
        b = 0 < l.s.length ? l.s[0] : "";
        k = 1 < l.s.length ? l.s[1] : "";
        b && (p = b.match(v));
        (p && 3 == p.length) || !k || (p = k.match(O));
        p && 3 == p.length && ((l.f = p[1]), (l.l = p[2]));
      }
    }
    return e;
  }
  function z(a, f) {
    try {
      return a[f];
    } catch (b) {}
  }
  function B(a, h) {
    if (a) {
      for (
        var b = x(a, h),
          e = (window.ue_err ? window.ue_err.errorHandlers : null) || [],
          k = 0;
        k < e.length;
        k++
      )
        "function" == typeof e[k].handler && e[k].handler(b);
      f.ue.log(b, h.channel || K, { nb: 1 });
      f.ue_err.buffer && f.ue_err.buffer.push(b);
      "function" === typeof ue_err.elh && ue_err.elh(a, h);
      try {
        if (!a.fromOnError) {
          var l = m.console,
            q = m.JSON;
          e =
            "Error logged with the Track\x26Report JS errors API(http://tiny/1covqr6l8/wamazindeClieUserJava): ";
          if (l) {
            if (q && q.stringify)
              try {
                e += q.stringify(b);
              } catch (w) {
                e += "no info provided; converting to string failed";
              }
            else e += b.m;
            "function" === typeof l.error
              ? l.error(e, b)
              : "function" === typeof l.log && l.log(e, b);
          }
        }
      } catch (w) {}
    }
  }
  function C(a, h) {
    if (a && !(f.ue_err.ec > f.ue_err.mxe)) {
      f.ue_err.ter.push(a);
      h = h || {};
      var b = a.logLevel || h.logLevel;
      h.logLevel = b;
      h.attribution = a.attribution || h.attribution;
      (b && b !== A && b !== L && b !== D && b !== H) || f.ue_err.ec++;
      (b && b != A) || ue_err.ecf++;
      B(a, h);
    }
  }
  if (f.ue_err && (!f.ueLogError || f.ueLogError.isStub)) {
    var K = f.ue_err_chan || "jserr",
      A = "FATAL",
      L = "ERROR",
      D = "WARN",
      H = "DOWNGRADED",
      N = "v5",
      F = 20,
      G = 256,
      O = /\(?([^\s]*):(\d+):\d+\)?/,
      v = /.*@(.*):(\d*)/;
    B.skipTrace = 1;
    x.skipTrace = 1;
    C.skipTrace = 1;
    (function () {
      if (f.ue_err.erl) {
        var a = f.ue_err.erl.length,
          h;
        for (h = 0; h < a; h++) {
          var b = f.ue_err.erl[h];
          B(b.ex, b.info);
        }
        ue_err.erl = [];
      }
    })();
    f.ueLogError = C;
  }
}(ue_csm, window);
(function (f, m) {
  function y(r) {
    for (var a = {}, c, d, n = 0; n < r.length; n++)
      (d = r[n]),
        (d.r = d.r || b.rid),
        (d.s = d.s || f.ue_sid),
        (c = d.r + d.s + d.m),
        d.c && (a[c] || (a[c] = []), a[c].push(r[n]));
    return a;
  }
  function x(b) {
    for (var a = 1; a < arguments.length; a++) {
      var c = arguments[a];
      try {
        if (c.isSupported) return c.send(b);
      } catch (d) {}
    }
  }
  function z() {
    if (k.length && !b.paused) {
      for (var a = 0; a < q.length; a++) q[a]();
      b._flhs += 1;
      B();
      x(y(k.splice(0, k.length)), I, J, E);
    }
    p = P = 0;
  }
  function B() {
    G && C({ k: "chk", f: b._flhs, l: b._lpn, s: "full" }, "csm");
  }
  function C(a, t, c) {
    c = c || {};
    !f.ue_furl ||
      (0 === c.bf && b.isBF) ||
      ((a = {
        r: c.r || (b.paused ? void 0 : b.rid),
        s: c.s || (b.paused ? void 0 : f.ue_sid),
        m: c.m || f.ue_mid,
        mkt: c.mkt || f.ue_mkt,
        sn: c.sn || f.ue_sn,
        c: t,
        d: a,
        t: c.t || b.d(),
        cs: c.c && f.ue_qsl,
      }),
      (b._lpn[t] = (b._lpn[t] || 0) + 1),
      c.b
        ? x(y([a]), I, E)
        : c.nb
        ? x(y([a]), I, J, E)
        : c.img || R[t]
        ? x(y([a]), E)
        : c.ff
        ? (k.push(a), z())
        : c.n
        ? (k.push(a), 0 === Q ? z() : p || (p = m.setTimeout(z, Q)))
        : (k.push(a), P || (P = m.setTimeout(z, S))));
  }
  function K(a, b, c) {
    M++;
    M == F &&
      C(
        {
          m: "Max number of Forester Logs exceeded",
          f: "forester-client.js",
          logLevel: "ERROR",
        },
        m.ue_err_chan || "jserr"
      );
    (M < F || (c && c.il)) && C(a, b, c);
  }
  function A() {
    if (!w) {
      for (var a = 0; a < l.length; a++) l[a]();
      for (a = 0; a < q.length; a++) q[a]();
      b._flhs += 1;
      B();
      x(y(k.splice(0, k.length)), I, E);
      w = !0;
    }
  }
  function L(b) {
    var t = a(b);
    b.reqs &&
      ((t = { csmcount: { counter: O, t: 0, value: t.length } }),
      (t.csmcount.value += a(t).length),
      b.reqs.push(t),
      (t = a(b)));
    return t;
  }
  var D = {};
  (function () {
    function a(a) {
      return 10 > a ? "0" + a : a;
    }
    function b(a) {
      d.lastIndex = 0;
      return d.test(a)
        ? '"' +
            a.replace(d, function (a) {
              var b = e[a];
              return "string" === typeof b
                ? b
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + a + '"';
    }
    function c(a, d) {
      var e,
        t = n,
        g = d[a];
      g &&
        "object" === typeof g &&
        "function" === typeof g.toJSON &&
        (g = g.toJSON(a));
      "function" === typeof k && (g = k.call(d, a, g));
      switch (typeof g) {
        case "string":
          return b(g);
        case "number":
          return isFinite(g) ? String(g) : "null";
        case "boolean":
        case "null":
          return String(g);
        case "object":
          if (!g) return "null";
          n += f;
          var r = [];
          if ("[object Array]" === Object.prototype.toString.apply(g)) {
            d = g.length;
            for (a = 0; a < d; a += 1) r[a] = c(a, g) || "null";
            var h =
              0 === r.length
                ? "[]"
                : n
                ? "[\n" + n + r.join(",\n" + n) + "\n" + t + "]"
                : "[" + r.join(",") + "]";
            n = t;
            return h;
          }
          if (k && "object" === typeof k)
            for (d = k.length, a = 0; a < d; a += 1)
              "string" === typeof k[a] &&
                ((e = k[a]),
                (h = c(e, g)) && r.push(b(e) + (n ? ": " : ":") + h));
          else
            for (e in g)
              Object.prototype.hasOwnProperty.call(g, e) &&
                (h = c(e, g)) &&
                r.push(b(e) + (n ? ": " : ":") + h);
          h =
            0 === r.length
              ? "{}"
              : n
              ? "{\n" + n + r.join(",\n" + n) + "\n" + t + "}"
              : "{" + r.join(",") + "}";
          n = t;
          return h;
      }
    }
    "function" !== typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function (b) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              a(this.getUTCMonth() + 1) +
              "-" +
              a(this.getUTCDate()) +
              "T" +
              a(this.getUTCHours()) +
              ":" +
              a(this.getUTCMinutes()) +
              ":" +
              a(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function (a) {
            return this.valueOf();
          }));
    var d =
        /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      n,
      f,
      e = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      k;
    "function" !== typeof D.stringify &&
      (D.stringify = function (a, b, d) {
        var g;
        f = n = "";
        if ("number" === typeof d) for (g = 0; g < d; g += 1) f += " ";
        else "string" === typeof d && (f = d);
        if (
          (k = b) &&
          "function" !== typeof b &&
          ("object" !== typeof b || "number" !== typeof b.length)
        )
          throw Error("JSON.stringify");
        return c("", { "": a });
      });
  })();
  var H = (function () {
      function a(b, c) {
        if (null == b) return c.push("!n");
        if ("number" === typeof b) return c.push("!" + b);
        if ("string" === typeof b)
          return "\\" == b[b.length - 1]
            ? c.push("'" + b.replace(/'/g, "\\'") + "u005C'")
            : c.push("'" + b.replace(/'/g, "\\'") + "'");
        if ("boolean" === typeof b) return c.push(b ? "!t" : "!f");
        if (b instanceof Array) {
          c.push("*");
          for (var d = 0; d < b.length; d++) a(b[d], c);
          return c.push(")");
        }
        if ("object" == typeof b) {
          c.push("(");
          for (d in b) b.hasOwnProperty(d) && (c.push(d), a(b[d], c));
          return c.push(")");
        }
        return c.push("!n");
      }
      return {
        stringify: function (b) {
          var c = [];
          a(b, c);
          return c.join("");
        },
      };
    })(),
    N = f.ue_qsl || 2e3,
    F = 2e3,
    G = 1 === window.ue_ddq,
    O = "foresterPayloadSize",
    v = function () {},
    a = (m.JSON && m.JSON.stringify) || (D && D.stringify),
    h = H.stringify,
    b = f.ue || {};
  H = f.uet || v;
  (f.uet || v)("bb", "ue_frst_v2", { wb: 1 });
  var e = "//" + f.ue_furl + "/1/batch/1/OE/",
    k = [],
    l = [],
    q = [],
    w = !1,
    p,
    P,
    Q = void 0 === f.ue_hpfi ? 1e3 : f.ue_hpfi,
    S = void 0 === f.ue_lpfi ? 1e4 : f.ue_lpfi,
    R = { "scheduled-delivery": 1 },
    M = 0,
    J = (function () {
      function a() {
        if (m.XDomainRequest) {
          var a = new XDomainRequest();
          a.onerror = v;
          a.ontimeout = v;
          a.onprogress = v;
          a.onload = v;
          a.timeout = 0;
          return a;
        }
        if (m.XMLHttpRequest) {
          a = new XMLHttpRequest();
          if (!("withCredentials" in a)) throw "";
          return a;
        }
        if (m.ActiveXObject) {
          for (var b = 0; b < d.length && !a; b++)
            try {
              (a = new ActiveXObject(d[b])), (d = [d[b]]);
            } catch (T) {}
          return a;
        }
      }
      function h(a) {
        for (var c = [], d = a[0] || {}, e = 0; e < a.length; e++) {
          var h = {};
          h[a[e].c] = a[e].d;
          c.push(h);
        }
        return {
          rid: d.r || b.rid,
          sid: d.s || f.ue_sid,
          mid: d.m || f.ue_mid,
          mkt: d.mkt || f.ue_mkt,
          sn: d.sn || f.ue_sn,
          reqs: c,
        };
      }
      function c(b) {
        var c = h(b),
          d = a();
        if (!d) throw "";
        d.onerror = function () {
          for (var a = 0; a < b.length; a++) k.push(b[a]);
          J.isSupported = !1;
        };
        d.open("POST", e, !0);
        d.setRequestHeader && d.setRequestHeader("Content-type", "text/plain");
        c = L(c);
        d.send(c);
      }
      var d =
        "MSXML2.XMLHTTP.6.0 MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(
          " "
        );
      return {
        send: function (a) {
          for (var b in a) a.hasOwnProperty(b) && a[b].length && c(a[b]);
        },
        buildPOSTBodyLog: h,
        isSupported: !0,
      };
    })(),
    E = (function () {
      return {
        send: function (k) {
          for (var r in k)
            if (k.hasOwnProperty(r)) {
              for (var c = k[r], d = c, n = {}, g, l = 0; l < d.length; l++)
                (g = d[l].c), n[g] || (n[g] = []), n[g].push(d[l]);
              c = c[0] || {};
              d = c.sn || f.ue_sn;
              c =
                e +
                (c.m || f.ue_mid) +
                ":" +
                (c.s || f.ue_sid) +
                ":" +
                (c.r || b.rid) +
                (d ? ":" + d : "");
              d = [];
              g = c;
              l = [];
              var m = void 0;
              for (m in n)
                if (n.hasOwnProperty(m))
                  for (var u = 0; u < n[m].length; u++) {
                    var p = n[m][u],
                      q = encodeURIComponent((p.cs ? h : a)(p.d));
                    l.push({ l: q, t: p.t, p: 1, c: m, d: p.cs ? "c" : "j" });
                  }
              n = l;
              l = void 0;
              m = "$";
              for (p = 0; p < n.length; ) {
                u = n[p];
                l != u.c
                  ? ((g += m + u.c + "\x3d"), (m = "\x26"), (l = u.c))
                  : (g += ",");
                q = g;
                var w = u.d + ":",
                  v = u;
                g =
                  (v.l.match(".{1," + (N - g.length) + "}[^%]{0,2}") ||
                    [])[0] || "";
                v.l = v.l.substr(g.length);
                g = q + (w + g + ":" + u.t);
                if (u.l)
                  (g += ":" + u.p++ + "_"),
                    d.push(g),
                    (g = c),
                    (m = "$"),
                    (l = 0);
                else if ((p++, 1 != u.p))
                  for (g += ":" + u.p + "_" + u.p, q = 0; q < u.p - 1; q++)
                    d[d.length - q - 1] += u.p;
              }
              d.push(g);
              c = d;
              for (d = 0; d < c.length; d++) new Image().src = c[d];
            }
        },
        isSupported: !0,
      };
    })(),
    I = (function () {
      return {
        send: function (a) {
          for (var b in a)
            if (a.hasOwnProperty(b)) {
              var c = J.buildPOSTBodyLog(a[b]);
              c = L(c);
              if (!navigator.sendBeacon(e, c)) throw "";
            }
        },
        isSupported: !!navigator.sendBeacon,
      };
    })();
  b._fic = E;
  b._fac = J;
  b._fbc = I;
  b._flq = k;
  b.sid = b.sid || f.ue_sid;
  b.mid = b.mid || f.ue_mid;
  b.furl = b.furl || f.ue_furl;
  b.sn = b.sn || f.ue_sn;
  b._flhs = b._flhs || 0;
  b._lpn = b._lpn || {};
  try {
    m.amznJQ &&
      m.amznJQ.declareAvailable &&
      m.amznJQ.declareAvailable("forester-client"),
      m.P && m.P.register && m.P.register("forester-client", v);
  } catch (r) {
    f.ueLogError(r, { logLevel: "WARN" });
  }
  (function () {
    b.log &&
      b.log.isStub &&
      (b.log.replay(function (a, b, c) {
        var d = a[2] || {};
        d.t = b;
        d.r = c;
        d.n = 1;
        K(a[0], a[1], d);
      }),
      b.onunload.replay(function (a) {
        l.push(a[0]);
      }),
      b.onflush.replay(function (a) {
        q.push(a[0]);
      }));
  })();
  b.log = K;
  b.log.reset = function () {
    M = 0;
  };
  b.onunload = function (a) {
    l.push(a);
  };
  b.onflush = function (a) {
    q.push(a);
  };
  b.attach("beforeunload", A);
  b.attach("pagehide", A);
  H("ld", "ue_frst_v2", { wb: 1 });
})(ue_csm, window);
