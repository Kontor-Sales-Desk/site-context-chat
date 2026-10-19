import { jsx as _, jsxs as Z } from "react/jsx-runtime";
import { createContext as Q, useMemo as P, useState as T, useRef as $, useEffect as U, useCallback as d, useContext as z } from "react";
import { createClient as tt } from "@supabase/supabase-js";
import { f as et } from "./api-BhTcnjUO.js";
function B() {
  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}
function F(t) {
  if (typeof window > "u") return null;
  try {
    return window.localStorage.getItem(x(t));
  } catch {
    return null;
  }
}
function L(t, e) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(x(t), e);
    } catch {
    }
}
function nt(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.removeItem(x(t));
    } catch {
    }
}
function x(t) {
  return `site-context-chat-session-${t}`;
}
function Ct(t) {
  return `site-context-chat-widget-${t}`;
}
function Tt(t) {
  return `site-context-chat-widget-mobile-${t}`;
}
const N = "techlads-visit-started-at", Y = "techlads-chat-proactive-nudge-dismissed", K = "techlads-chat-engaged", yt = 45e3;
function _t() {
  if (typeof window > "u") return Date.now();
  const t = sessionStorage.getItem(N);
  if (t) {
    const n = Number.parseInt(t, 10);
    if (Number.isFinite(n)) return n;
  }
  const e = Date.now();
  return sessionStorage.setItem(N, String(e)), e;
}
function xt() {
  return typeof window > "u" ? !0 : sessionStorage.getItem(Y) === "1" || sessionStorage.getItem(K) === "1";
}
function Rt() {
  typeof window > "u" || sessionStorage.setItem(Y, "1");
}
function H() {
  typeof window > "u" || sessionStorage.setItem(K, "1");
}
const R = Q(null);
function Et({ supabaseUrl: t, supabaseAnonKey: e, siteId: n = "default", children: o }) {
  const r = P(
    () => tt(t, e),
    [t, e]
  ), [c, s] = T(null), [f, i] = T([]), [u, p] = T(!1), [w, C] = T(null), m = $(null), g = $(null);
  U(() => {
    s(F(n));
  }, [n]);
  const E = d(() => {
    H(), p(!0);
  }, []), b = d(() => p(!1), []), I = d((a) => {
    H();
    const l = typeof a == "string" ? a.trim() : "";
    m.current = l || null, C(l || null), p(!0);
  }, []), A = d(() => {
    const a = m.current;
    return m.current = null, C(null), a;
  }, []), D = d(() => {
    const a = F(n);
    if (a)
      return s(a), a;
    const l = B();
    return L(n, l), s(l), i([]), g.current = null, l;
  }, [n]), M = d(() => {
    const a = B();
    return L(n, a), s(a), i([]), g.current = null, a;
  }, [n]), k = d((a) => {
    i((l) => [...l, a]);
  }, []), G = d((a, l) => {
    i(
      (S) => S.map((h) => h.id !== a ? h : typeof l == "function" ? l(h) : { ...h, ...l })
    );
  }, []), O = d((a) => {
    i(
      (l) => l.map((S) => S.id === a ? { ...S, streaming: !1 } : S)
    );
  }, []), j = d((a) => {
    i(a);
  }, []), v = d(
    async (a) => {
      if (!a || g.current === a) return;
      const l = await et(r, n, a);
      if (!(l != null && l.success))
        throw new Error((l == null ? void 0 : l.error) ?? "Failed to load chat history");
      const S = (l.messages ?? []).map((h) => ({
        role: h.role,
        content: h.content,
        timestamp: h.createdAt ? new Date(h.createdAt) : /* @__PURE__ */ new Date()
      }));
      i(S), g.current = a;
    },
    [n, r]
  ), X = P(
    () => ({
      supabase: r,
      supabaseUrl: t,
      supabaseAnonKey: e,
      siteId: n,
      sessionId: c,
      messages: f,
      isChatOpen: u,
      openChat: E,
      openChatWithMessage: I,
      pendingChatMessage: w,
      takePendingChatMessage: A,
      closeChat: b,
      initializeSession: D,
      startNewConversation: M,
      addMessage: k,
      updateMessageById: G,
      finishMessageById: O,
      setConversationMessages: j,
      loadHistory: v,
      clearSession: () => {
        nt(n), s(null), i([]), g.current = null;
      }
    }),
    [
      r,
      t,
      e,
      n,
      c,
      f,
      u,
      E,
      I,
      w,
      A,
      b,
      D,
      M,
      k,
      G,
      O,
      j,
      v
    ]
  );
  return /* @__PURE__ */ _(R.Provider, { value: X, children: o });
}
function bt() {
  const t = z(R);
  if (!t)
    throw new Error("useChatbot must be used within ChatbotProvider");
  return t;
}
function It() {
  return z(R);
}
function At({ className: t, style: e }) {
  return /* @__PURE__ */ Z("svg", { className: t, style: e, viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: [
    /* @__PURE__ */ _(
      "path",
      {
        d: "M6.5 5.75h11a1.75 1.75 0 0 1 1.75 1.75v6.25a1.75 1.75 0 0 1-1.75 1.75H10l-3.75 3.25V7.5a1.75 1.75 0 0 1 1.75-1.75Z",
        stroke: "currentColor",
        strokeWidth: "1.35",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ _(
      "path",
      {
        d: "M8.25 9.25h7.5M8.25 12h4.5",
        stroke: "currentColor",
        strokeWidth: "1.35",
        strokeLinecap: "round"
      }
    )
  ] });
}
const J = /\[CONTACT_FORM_TRIGGER:([\s\S]*?)\]/;
function Dt(t) {
  const e = t.match(J);
  return e ? {
    displayContent: t.replace(J, "").trim(),
    draftMessage: e[1].trim()
  } : { displayContent: t, draftMessage: null };
}
function V(t) {
  const e = t.indexOf("{");
  if (e === -1) return null;
  let n = 0, o = !1, r = !1;
  for (let c = e; c < t.length; c++) {
    const s = t[c];
    if (o) {
      r ? r = !1 : s === "\\" ? r = !0 : s === '"' && (o = !1);
      continue;
    }
    if (s === '"') {
      o = !0;
      continue;
    }
    if (s === "{") n++;
    else if (s === "}" && (n--, n === 0))
      return t.slice(e, c + 1);
  }
  return null;
}
function st(t) {
  const e = t.indexOf("[");
  if (e === -1) return null;
  let n = 0, o = !1, r = !1;
  for (let c = e; c < t.length; c++) {
    const s = t[c];
    if (o) {
      r ? r = !1 : s === "\\" ? r = !0 : s === '"' && (o = !1);
      continue;
    }
    if (s === '"') {
      o = !0;
      continue;
    }
    if (s === "[") n++;
    else if (s === "]" && (n--, n === 0))
      return t.slice(e, c + 1);
  }
  return null;
}
function rt(t, e) {
  const n = new RegExp(
    `\\[${e}\\]:?\\s*([\\s\\S]*?)\\s*\\[\\/${e}\\]`,
    "i"
  ), o = new RegExp(`\\[${e}\\]:?\\s*`, "i"), r = new RegExp(`^\\s*\\[\\/${e}\\]`, "i"), c = t.match(n);
  if (c)
    return { jsonText: c[1].trim(), strip: c[0] };
  const s = t.match(o);
  if (!s || s.index == null) return null;
  const f = t.slice(s.index + s[0].length), i = V(f);
  if (!i)
    return {
      jsonText: f.trim(),
      strip: t.slice(s.index),
      orphan: !0
    };
  let u = t.slice(
    s.index,
    s.index + s[0].length + f.indexOf(i) + i.length
  );
  const p = t.slice(s.index + u.length).match(r);
  return p && (u += p[0]), { jsonText: i, strip: u };
}
function W(t) {
  var i, u, p, w, C;
  const e = String(t ?? "").trim();
  if (!e) return null;
  const n = [
    e,
    e.replace(/\r?\n/g, "\\n"),
    e.replace(/,\s*([\]}])/g, "$1")
  ];
  for (const m of n)
    try {
      const g = JSON.parse(m);
      if (g && typeof g == "object") return g;
    } catch {
    }
  const o = ((i = e.match(/"prospectId"\s*:\s*"([^"]+)"/i)) == null ? void 0 : i[1]) ?? ((u = e.match(/"prospect_id"\s*:\s*"([^"]+)"/i)) == null ? void 0 : u[1]), r = (p = e.match(/"subject"\s*:\s*"((?:[^"\\]|\\.)*)"/i)) == null ? void 0 : p[1], c = (w = e.match(/"body"\s*:\s*"((?:[^"\\]|\\.)*)"/is)) == null ? void 0 : w[1], s = (C = e.match(/"to"\s*:\s*"([^"]+)"/i)) == null ? void 0 : C[1];
  if (!o || !r || !c) return null;
  const f = (m) => String(m).replace(/\\n/g, `
`).replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  return {
    prospectId: o,
    subject: f(r),
    body: f(c),
    ...s ? { to: s } : {}
  };
}
const ot = /<\/?(?:invoke|parameter|tool_call|function_call|antml:[a-z_]+)[^>]*>/gi, it = /\[(?:\/)?(?:DRAFT_EMAIL(?:_BATCH)?_TRIGGER|PROSPECT_BATCH_TRIGGER)\]:?\s*/gi, ct = /(?:\n|^)\s*(?:,\s*)?[\[{]?\s*"prospectId"\s*:/i;
function at(t) {
  let e = String(t ?? "");
  return e = e.replace(ot, ""), e = e.replace(it, ""), e.replace(/\n{3,}/g, `

`);
}
function lt(t) {
  const e = String(t ?? ""), n = [...e.matchAll(new RegExp(ct.source, "gi"))];
  if (!n.length) return e;
  const o = n[n.length - 1];
  if (o.index == null || o.index < 20) return e;
  const r = e.slice(o.index);
  return !/"subject"\s*:/i.test(r) || !/"body"\s*:/i.test(r) ? e : e.slice(0, o.index).trimEnd().replace(/[,\s]+$/, "");
}
function ut(t) {
  return lt(at(t)).trim();
}
const ft = "DRAFT_EMAIL_TRIGGER", pt = "DRAFT_EMAIL_BATCH_TRIGGER";
function y(t) {
  if (!t || typeof t != "object") return null;
  const e = t.prospectId ?? t.prospect_id;
  return !e || !t.subject || !t.body ? null : {
    prospectId: String(e),
    subject: String(t.subject),
    body: String(t.body),
    to: t.to ? String(t.to) : void 0
  };
}
function q(t) {
  const e = String(t ?? "").trim();
  if (!e) return [];
  const n = e.startsWith("[") ? e : st(e);
  if (n)
    try {
      const f = JSON.parse(n);
      if (Array.isArray(f))
        return f.map((i) => y(i)).filter(Boolean);
    } catch {
    }
  const o = [];
  let r = 0;
  const c = e.replace(/^\[?\s*/, "").replace(/\]?\s*$/, "");
  for (; r < c.length; ) {
    const f = c.slice(r), i = V(f);
    if (!i) break;
    const u = y(W(i));
    u && o.push(u), r += f.indexOf(i) + i.length;
    const p = c.slice(r).trimStart();
    if (p.startsWith(",")) {
      r += c.slice(r).length - p.length + 1;
      continue;
    }
    break;
  }
  if (o.length) return o;
  const s = y(W(e));
  return s ? [s] : [];
}
function dt(t) {
  const e = /(?:\n|^)\s*(?:,\s*)?[\[{]?\s*"prospectId"\s*:/i, n = t.match(e);
  if (!n || n.index == null || n.index < 20)
    return { proposals: [], strip: "" };
  const o = t.slice(n.index), r = q(o);
  return r.length ? {
    proposals: r,
    strip: t.slice(n.index)
  } : { proposals: [], strip: "" };
}
function gt(t, e) {
  const n = rt(t, e);
  return n ? {
    proposals: n.orphan ? [] : q(n.jsonText),
    strip: n.strip
  } : null;
}
function Mt(t) {
  let e = String(t ?? "");
  const n = [], o = [];
  for (const i of [pt, ft]) {
    const u = gt(e, i);
    u && (u.proposals.length && n.push(...u.proposals), o.push(u.strip), e = e.replace(u.strip, ""));
  }
  const r = dt(e);
  r.proposals.length && (n.push(...r.proposals), o.push(r.strip), e = e.replace(r.strip, ""));
  const c = [], s = /* @__PURE__ */ new Set();
  for (const i of n) {
    const u = `${i.prospectId}:${i.subject}`;
    s.has(u) || (s.add(u), c.push(i));
  }
  return {
    displayContent: ut(e),
    draftProposal: c[0] ?? null,
    draftProposals: c
  };
}
export {
  At as C,
  yt as D,
  Et as a,
  Mt as b,
  B as c,
  It as d,
  W as e,
  ut as f,
  F as g,
  _t as h,
  xt as i,
  H as j,
  Rt as k,
  rt as l,
  Tt as m,
  Dt as p,
  L as s,
  bt as u,
  Ct as w
};
