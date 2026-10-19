import { v as x } from "./index-BgMSoXFx.js";
function j() {
}
function N() {
}
const k = {};
function Z(n, t) {
  const i = k, u = typeof i.includeImageAlt == "boolean" ? i.includeImageAlt : !0, r = typeof i.includeHtml == "boolean" ? i.includeHtml : !0;
  return y(n, u, r);
}
function y(n, t, i) {
  if (w(n)) {
    if ("value" in n)
      return n.type === "html" && !i ? "" : n.value;
    if (t && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return p(n.children, t, i);
  }
  return Array.isArray(n) ? p(n, t, i) : "";
}
function p(n, t, i) {
  const u = [];
  let r = -1;
  for (; ++r < n.length; )
    u[r] = y(n[r], t, i);
  return u.join("");
}
function w(n) {
  return !!(n && typeof n == "object");
}
function d(n, t, i, u) {
  const r = n.length;
  let e = 0, o;
  if (t < 0 ? t = -t > r ? 0 : r + t : t = t > r ? r : t, i = i > 0 ? i : 0, u.length < 1e4)
    o = Array.from(u), o.unshift(t, i), n.splice(...o);
  else
    for (i && n.splice(t, i); e < u.length; )
      o = u.slice(e, e + 1e4), o.unshift(t, 0), n.splice(...o), e += 1e4, t += 1e4;
}
function B(n, t) {
  return n.length > 0 ? (d(n, n.length, 0, t), n) : t;
}
const g = {}.hasOwnProperty;
function D(n) {
  const t = {};
  let i = -1;
  for (; ++i < n.length; )
    b(t, n[i]);
  return t;
}
function b(n, t) {
  let i;
  for (i in t) {
    const r = (g.call(n, i) ? n[i] : void 0) || (n[i] = {}), e = t[i];
    let o;
    if (e)
      for (o in e) {
        g.call(r, o) || (r[o] = []);
        const l = e[o];
        m(
          // @ts-expect-error Looks like a list.
          r[o],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function m(n, t) {
  let i = -1;
  const u = [];
  for (; ++i < t.length; )
    (t[i].add === "after" ? n : u).push(t[i]);
  d(n, 0, 0, u);
}
function F(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const H = a(/[A-Za-z]/), O = a(/[\dA-Za-z]/), T = a(/[#-'*+\--9=?A-Z^-~]/);
function q(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const U = a(/\d/), W = a(/[\dA-Fa-f]/), Y = a(/[!-/:-@[-`{-~]/);
function P(n) {
  return n !== null && n < -2;
}
function S(n) {
  return n !== null && (n < 0 || n === 32);
}
function s(n) {
  return n === -2 || n === -1 || n === 32;
}
const C = a(new RegExp("\\p{P}|\\p{S}", "u")), I = a(/\s/);
function a(n) {
  return t;
  function t(i) {
    return i !== null && i > -1 && n.test(String.fromCharCode(i));
  }
}
function z(n, t, i, u) {
  const r = u ? u - 1 : Number.POSITIVE_INFINITY;
  let e = 0;
  return o;
  function o(c) {
    return s(c) ? (n.enter(i), l(c)) : t(c);
  }
  function l(c) {
    return s(c) && e++ < r ? (n.consume(c), l) : (n.exit(i), t(c));
  }
}
function _(n) {
  if (n === null || S(n) || I(n))
    return 1;
  if (C(n))
    return 2;
}
function $(n, t, i) {
  const u = [];
  let r = -1;
  for (; ++r < n.length; ) {
    const e = n[r].resolveAll;
    e && !u.includes(e) && (t = e(t, i), u.push(e));
  }
  return t;
}
const G = {
  partial: !0,
  tokenize: E
};
function E(n, t, i) {
  return u;
  function u(e) {
    return s(e) ? z(n, r, "linePrefix")(e) : r(e);
  }
  function r(e) {
    return e === null || P(e) ? t(e) : i(e);
  }
}
function J(n, t, i, u) {
  let r, e, o;
  typeof t == "function" && typeof i != "function" ? (e = void 0, o = t, r = i) : (e = t, o = i, r = u), x(n, e, l, r);
  function l(c, h) {
    const f = h[h.length - 1], A = f ? f.children.indexOf(c) : void 0;
    return o(c, A, f);
  }
}
export {
  C as a,
  O as b,
  _ as c,
  H as d,
  q as e,
  G as f,
  z as g,
  P as h,
  s as i,
  D as j,
  T as k,
  Y as l,
  S as m,
  F as n,
  j as o,
  B as p,
  W as q,
  $ as r,
  d as s,
  Z as t,
  I as u,
  J as v,
  U as w,
  N as x
};
