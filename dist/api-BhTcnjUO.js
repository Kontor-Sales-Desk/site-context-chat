let y = "";
function S(t) {
  y = typeof t == "string" ? t.trim() : "";
}
function b() {
  return y;
}
function p() {
  return y ? { "x-acting-agent": y } : {};
}
async function w(t, n) {
  const { data: r, error: s } = await t.functions.invoke("site-chat", { body: n });
  if (s)
    throw s;
  return r;
}
async function g(t, n) {
  let r = (t == null ? void 0 : t.message) ?? n;
  try {
    if (t != null && t.context && typeof t.context.json == "function") {
      const s = await t.context.json();
      s != null && s.error && (r = String(s.error));
    }
  } catch {
  }
  return r;
}
async function C(t, n, r) {
  const { data: s, error: a } = await t.functions.invoke("site-chat-admin", {
    body: r,
    headers: {
      "x-admin-secret": n,
      ...p()
    }
  });
  if (a)
    throw new Error(await g(a, "Admin request failed"));
  return s;
}
async function l(t, n) {
  return w(t, { action: "config", siteId: n });
}
async function A(t, n, r) {
  return w(t, { action: "history", siteId: n, sessionId: r });
}
async function j(t, { siteId: n, sessionId: r, message: s, routeContext: a }) {
  return w(t, {
    action: "chat",
    siteId: n,
    sessionId: r,
    message: s,
    routeContext: a
  });
}
async function m(t, n) {
  const r = t.body.getReader(), s = new TextDecoder();
  let a = "";
  for (; ; ) {
    const { done: o, value: e } = await r.read();
    if (o) break;
    a += s.decode(e, { stream: !0 });
    const c = a.split(`

`);
    a = c.pop() ?? "";
    for (const h of c) {
      const u = h.split(`
`).find((f) => f.startsWith("data: "));
      if (!u) continue;
      const d = JSON.parse(u.slice(6));
      n(d);
    }
  }
}
async function q(t, n, { siteId: r, sessionId: s, message: a, routeContext: o, onDelta: e, onDone: c, onError: h }) {
  const u = await fetch(`${t}/functions/v1/site-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${n}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify({
      action: "chat",
      siteId: r,
      sessionId: s,
      message: a,
      routeContext: o,
      stream: !0
    })
  }), d = u.headers.get("content-type") ?? "";
  if (!u.ok) {
    const i = await u.json().catch(() => ({}));
    throw new Error((i == null ? void 0 : i.error) ?? `Chat request failed (${u.status})`);
  }
  if (!d.includes("text/event-stream")) {
    const i = await u.json();
    if (!(i != null && i.success))
      throw new Error((i == null ? void 0 : i.error) ?? "Chat request failed");
    i.response && (e == null || e(i.response)), c == null || c({ model: i.model });
    return;
  }
  let f = null;
  if (await m(u, (i) => {
    i.type === "text" && i.text ? e == null || e(i.text) : i.type === "done" ? c == null || c(i) : i.type === "error" && (f = new Error(i.error ?? "Stream error"), h == null || h(f));
  }), f)
    throw f;
}
async function x(t, n, { siteId: r, sessionId: s, contactFormData: a, routeContext: o }) {
  const e = await fetch(`${t}/functions/v1/site-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${n}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "submitInquiry",
      siteId: r,
      sessionId: s,
      contactFormData: a,
      routeContext: o
    })
  }), c = await e.json().catch(() => ({}));
  if (!e.ok || !(c != null && c.success))
    throw new Error((c == null ? void 0 : c.error) ?? `Inquiry failed (${e.status})`);
  return c;
}
async function I(t, n, { siteId: r, inquiry: s, routeContext: a }) {
  const o = await fetch(`${t}/functions/v1/site-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${n}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "submitShopInquiry",
      siteId: r,
      inquiry: s,
      routeContext: a
    })
  }), e = await o.json().catch(() => ({}));
  if (!o.ok || !(e != null && e.success))
    throw new Error((e == null ? void 0 : e.error) ?? `Inquiry failed (${o.status})`);
  return e;
}
async function $(t, n, { siteId: r, inquiry: s, routeContext: a }) {
  const o = await fetch(`${t}/functions/v1/site-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${n}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "submitContactInquiry",
      siteId: r,
      inquiry: s,
      routeContext: a
    })
  }), e = await o.json().catch(() => ({}));
  if (!o.ok || !(e != null && e.success))
    throw new Error((e == null ? void 0 : e.error) ?? `Inquiry failed (${o.status})`);
  return e;
}
export {
  p as a,
  l as b,
  C as c,
  S as d,
  q as e,
  A as f,
  b as g,
  x as h,
  w as i,
  $ as j,
  I as k,
  j as s
};
