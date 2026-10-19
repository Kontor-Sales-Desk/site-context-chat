import { jsxs as h, jsx as t, Fragment as Je } from "react/jsx-runtime";
import It, { useId as Jt, useRef as H, useState as m, useEffect as T, useCallback as C, useMemo as it } from "react";
import { C as Yt, l as Gt, e as Zt, f as kt, b as Qt, u as en, w as Pt, m as St, i as Dt, D as tn, h as nn, j as At, k as an, p as sn } from "./draftEmailTrigger-BibUVXd9.js";
import { a as ht, b as He, c as jt, d as cn, e as rn, f as on, g as ln, h as un, i as dn, j as hn, k as pn, l as mn, m as fn, n as gn, C as _n, r as Mt } from "./index-2l4GG1XH.js";
import { b as bn, e as yn, h as vn } from "./api-BhTcnjUO.js";
const wn = "LAUNCH YOUR PROJECT", Nn = 38, xn = 6, Cn = 3.75, Wt = 7.75, $n = 0.32, ft = 100, Ct = ft / 2, En = Ct * (Cn / Wt), wt = En + $n / Wt * ft, Tn = `M ${Ct},${Ct - wt} a ${wt},${wt} 0 1,1 -0.01,0`, Ln = "75%";
function In() {
  const [a, s] = m(!1);
  return T(() => {
    const c = window.matchMedia("(prefers-reduced-motion: reduce)"), i = () => s(c.matches);
    return i(), c.addEventListener("change", i), () => c.removeEventListener("change", i);
  }, []), a;
}
function kn(a, s, c) {
  const [i, l] = m("");
  return T(() => {
    if (!a) {
      l("");
      return;
    }
    if (c) {
      l(s);
      return;
    }
    let p = 0;
    l("");
    const f = window.setInterval(() => {
      p += 1, l(s.slice(0, p)), p >= s.length && window.clearInterval(f);
    }, Nn);
    return () => window.clearInterval(f);
  }, [a, s, c]), i;
}
function Rt(a, s) {
  const c = (s == null ? void 0 : s.offsetWidth) ?? 0, i = (s == null ? void 0 : s.offsetHeight) ?? 0, l = Math.max(0, window.innerWidth - c), p = Math.max(0, window.innerHeight - i);
  return {
    x: Math.max(0, Math.min(l, a.x)),
    y: Math.max(0, Math.min(p, a.y))
  };
}
function Pn({
  onClick: a,
  accent: s = "#5DA399",
  label: c = "Open chat",
  orbitLabel: i = wn,
  iconSrc: l,
  fabVariant: p = "default",
  showOrbit: f,
  position: N,
  onPositionChange: b,
  draggable: E = !1,
  zIndex: g
}) {
  const y = Jt().replace(/:/g, ""), I = H(null), [K, z] = m(!1), [V, L] = m(!1), v = H(null), J = H(!1), se = In(), ce = f ?? (p === "default" && !l), ee = kn(K && !V && ce, i, se), te = K && !V && ce && ee.length < i.length ? `${ee}▍` : ee, O = E && N && b;
  T(() => {
    if (!O || !N) return;
    const k = () => {
      b(Rt(N, I.current));
    };
    return window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, [O, b, N]);
  const ne = (k) => {
    if (!O || k.button !== 0) return;
    v.current = {
      startX: k.clientX,
      startY: k.clientY,
      startLeft: N.x,
      startTop: N.y
    }, J.current = !1;
    const re = (F) => {
      if (!v.current) return;
      const $e = F.clientX - v.current.startX, U = F.clientY - v.current.startY;
      !J.current && Math.hypot($e, U) < xn || (J.current = !0, L(!0), b(
        Rt(
          {
            x: v.current.startLeft + $e,
            y: v.current.startTop + U
          },
          I.current
        )
      ));
    }, G = () => {
      v.current = null, L(!1), document.body.style.userSelect = "", document.body.style.cursor = "", document.removeEventListener("pointermove", re), document.removeEventListener("pointerup", G), document.removeEventListener("pointercancel", G);
    };
    document.body.style.userSelect = "none", document.addEventListener("pointermove", re), document.addEventListener("pointerup", G), document.addEventListener("pointercancel", G);
  }, fe = () => {
    if (J.current) {
      J.current = !1;
      return;
    }
    a == null || a();
  }, P = [
    "scc-chat-fab-wrap",
    O ? "scc-chat-fab-wrap--positioned" : "",
    O ? "scc-chat-fab-wrap--draggable" : "",
    V ? "scc-chat-fab-wrap--dragging" : ""
  ].filter(Boolean).join(" "), S = {
    "--scc-fab-accent": s,
    ...O ? { left: `${N.x}px`, top: `${N.y}px` } : {},
    ...g != null ? { zIndex: g } : {}
  };
  return /* @__PURE__ */ h(
    "div",
    {
      ref: I,
      className: P,
      style: S,
      "data-sales-desktop-hit": O ? "" : void 0,
      onPointerDown: O ? ne : void 0,
      onMouseEnter: () => z(!0),
      onMouseLeave: () => z(!1),
      onFocus: () => z(!0),
      onBlur: (k) => {
        k.currentTarget.contains(k.relatedTarget) || z(!1);
      },
      children: [
        ce ? /* @__PURE__ */ h(
          "svg",
          {
            className: `scc-chat-fab__orbit${K && !V ? " scc-chat-fab__orbit--visible" : ""}`,
            viewBox: `0 0 ${ft} ${ft}`,
            "aria-hidden": !0,
            children: [
              /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("path", { id: y, d: Tn, fill: "none" }) }),
              /* @__PURE__ */ t("text", { className: "scc-chat-fab__orbit-text", style: { "--scc-fab-accent": s }, children: /* @__PURE__ */ t("textPath", { href: `#${y}`, startOffset: Ln, side: "left", children: te }) })
            ]
          }
        ) : null,
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: fe,
            className: [
              "scc-chat-fab",
              l && p !== "pipeline" ? " scc-chat-fab--avatar" : "",
              p === "pipeline" ? " scc-chat-fab--pipeline" : ""
            ].join("").trim(),
            style: { "--scc-fab-accent": s },
            title: O ? `${c} — drag to move` : c,
            "aria-label": c,
            children: [
              p !== "pipeline" ? /* @__PURE__ */ t("span", { className: "scc-chat-fab__ring", "aria-hidden": !0 }) : null,
              !l && p !== "pipeline" ? /* @__PURE__ */ t("span", { className: "scc-chat-fab__glow", "aria-hidden": !0 }) : null,
              l ? /* @__PURE__ */ t(
                "img",
                {
                  src: l,
                  alt: "",
                  className: `scc-chat-fab__avatar${p === "pipeline" ? " scc-chat-fab__avatar--icon" : ""}`,
                  draggable: !1
                }
              ) : /* @__PURE__ */ t(Yt, { className: "scc-chat-fab__icon" })
            ]
          }
        )
      ]
    }
  );
}
const Sn = /^[ \t]*[-*_]{3,}[ \t]*$/, pt = /^(?:`)?id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?:`)?$/i, $t = /^(?:#{1,6}\s+)?\*\*(?!To:|Subject:)[^*\n]+\*\*(?:\s*[⭐★]+)?\s*$|^#{1,6}\s+\S/;
function Et(a) {
  if (!(a != null && a.trim())) return a ?? "";
  let s = Rn(a.replace(/\r\n/g, `
`));
  return s = s.replace(/\n---\n+(?=#{1,6}\s)/gm, `

`), s = s.replace(/(`id=[^`]+`)\s*\n---\n/gi, `$1

`), s = s.replace(/(^|\n)(id=[0-9a-f-]{36})\s*\n---\n/gim, `$1$2

`), s = An(s), s = Dn(s), s = s.replace(/\n{2,}---\n{2,}/g, `
---
`), s = s.replace(/\n{3,}/g, `

`), s.trim();
}
function Dn(a) {
  const s = a.split(`
`), c = [];
  for (let i = 0; i < s.length; i++) {
    const l = s[i], p = l.trim(), f = c.length ? c[c.length - 1].trim() : "", N = pt.test(f), b = $t.test(f), E = $t.test(p), g = pt.test(p), y = /^#{1,6}\s/.test(p);
    c.length && c[c.length - 1].trim() !== "" && (E || y) && (N || pt.test(f)) && c.push(""), c.length && c[c.length - 1].trim() !== "" && g && f && !N && c.push(""), c.length && c[c.length - 1].trim() !== "" && !E && !g && b && c.push(""), c.push(l);
  }
  return c.join(`
`);
}
function An(a) {
  const s = a.split(`
`), c = [];
  for (const i of s) {
    const l = i.trim();
    if (!l) {
      c.push(i);
      continue;
    }
    if ($t.test(l) || pt.test(l)) {
      c.push(Ft(i));
      continue;
    }
    const p = l.search(/\s+📧\s+/);
    if (p > 0) {
      const f = l.slice(0, p).trim(), N = Ht(l.slice(p).trim());
      f && c.push(f), f && N && c.push(""), N && c.push(N);
      continue;
    }
    if (Mn(l)) {
      c.push(Ht(l));
      continue;
    }
    c.push(Ft(i));
  }
  return c.join(`
`);
}
function Mn(a) {
  return /^(?:📧|📸|No public email)/i.test(a.trim());
}
function Ht(a) {
  return a.replace(/\s*\|\s*/g, " · ").replace(/\s{2,}/g, " ").trim();
}
function Ft(a) {
  const s = a.trim();
  return /^id=[0-9a-f-]{36}$/i.test(s) ? `\`${s}\`` : a;
}
function Rn(a) {
  const s = a.split(`
`), c = [];
  let i = !1;
  for (const l of s) {
    const p = Sn.test(l), f = l.trim() === "";
    if (p) {
      i || (c.push("---"), i = !0);
      continue;
    }
    f && i || (i = !1, c.push(l));
  }
  return c.join(`
`);
}
function Xt(a) {
  return It.Children.toArray(a).map((s) => {
    var c;
    return typeof s == "string" || typeof s == "number" ? String(s) : It.isValidElement(s) && ((c = s.props) == null ? void 0 : c.children) != null ? Xt(s.props.children) : "";
  }).join("");
}
function Hn(a) {
  const s = a.trim();
  return /^(?:📧|📸|No public email)/i.test(s);
}
function Fn({ children: a }) {
  const c = String(a ?? "").trim().match(/^id=([0-9a-f-]{36})$/i);
  if (!c)
    return /* @__PURE__ */ t("code", { className: "scc-chat-prospect-id", children: a });
  const i = c[1];
  return /* @__PURE__ */ t("code", { className: "scc-chat-prospect-id", title: `id=${i}`, children: `id=${i.slice(0, 8)}…` });
}
function zn({ content: a }) {
  const [s, c] = m(null), i = Et(a);
  return T(() => {
    if (!(i != null && i.trim())) {
      c(null);
      return;
    }
    let l = !1;
    return Promise.all([
      import("./index-B4dxDWLr.js"),
      import("./index-DkBnxtxA.js"),
      import("./index-DrAU9l91.js")
    ]).then(([{ default: p }, { default: f }, { default: N }]) => {
      l || c(
        /* @__PURE__ */ t(
          p,
          {
            remarkPlugins: [f, N],
            components: {
              a: ({ href: b, children: E }) => /* @__PURE__ */ t("a", { href: b, target: "_blank", rel: "noopener noreferrer", children: E }),
              p: ({ children: b }) => {
                const E = Xt(b);
                return Hn(E) ? /* @__PURE__ */ t("p", { className: "scc-chat-prospect-contact", children: b }) : /* @__PURE__ */ t("p", { children: b });
              },
              code: ({ className: b, children: E }) => {
                const g = String(E ?? "").trim();
                return /^id=[0-9a-f-]{36}$/i.test(g) ? /* @__PURE__ */ t(Fn, { children: E }) : /* @__PURE__ */ t("code", { className: b, children: E });
              }
            },
            children: i
          }
        )
      );
    }), () => {
      l = !0;
    };
  }, [i]), i != null && i.trim() ? s ? /* @__PURE__ */ t("div", { className: "scc-chat-panel__markdown", children: s }) : /* @__PURE__ */ t("span", { className: "scc-chat-panel__markdown", children: i }) : null;
}
function Bn({
  open: a,
  draftMessage: s,
  onClose: c,
  onSubmit: i,
  submitting: l,
  error: p,
  accent: f = "#5DA399"
}) {
  const [N, b] = m(""), [E, g] = m(""), [y, I] = m(""), [K, z] = m("");
  return T(() => {
    a && (z(s ?? ""), b(""), g(""), I(""));
  }, [a, s]), a ? /* @__PURE__ */ h("div", { className: "scc-inquiry-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "scc-inquiry-title", children: [
    /* @__PURE__ */ t("button", { type: "button", className: "scc-inquiry-modal__backdrop", onClick: c, "aria-label": "Close" }),
    /* @__PURE__ */ h("div", { className: "scc-inquiry-modal__card", style: { "--scc-fab-accent": f }, children: [
      /* @__PURE__ */ h("div", { className: "scc-inquiry-modal__header", children: [
        /* @__PURE__ */ h("div", { children: [
          /* @__PURE__ */ t("h4", { id: "scc-inquiry-title", className: "scc-inquiry-modal__title", children: "Send your inquiry" }),
          /* @__PURE__ */ t("p", { className: "scc-inquiry-modal__lead", children: "We'll pass this to the team. Review the message, add your details, and send." })
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "scc-chat-panel__icon-btn", onClick: c, "aria-label": "Close", children: /* @__PURE__ */ t(ht, { className: "h-3.5 w-3.5" }) })
      ] }),
      /* @__PURE__ */ h("form", { className: "scc-inquiry-modal__form", onSubmit: (L) => {
        L.preventDefault(), i({
          name: N.trim(),
          email: E.trim(),
          phone: y.trim(),
          message: K.trim()
        });
      }, children: [
        /* @__PURE__ */ h("div", { className: "scc-inquiry-modal__row", children: [
          /* @__PURE__ */ h("label", { className: "scc-inquiry-modal__field", children: [
            /* @__PURE__ */ t("span", { children: "Name" }),
            /* @__PURE__ */ t(
              "input",
              {
                className: "scc-chat-panel__input",
                type: "text",
                required: !0,
                value: N,
                onChange: (L) => b(L.target.value),
                autoComplete: "name"
              }
            )
          ] }),
          /* @__PURE__ */ h("label", { className: "scc-inquiry-modal__field", children: [
            /* @__PURE__ */ t("span", { children: "Email" }),
            /* @__PURE__ */ t(
              "input",
              {
                className: "scc-chat-panel__input",
                type: "email",
                required: !0,
                value: E,
                onChange: (L) => g(L.target.value),
                autoComplete: "email"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ h("label", { className: "scc-inquiry-modal__field", children: [
          /* @__PURE__ */ t("span", { children: "Phone (optional)" }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "scc-chat-panel__input",
              type: "tel",
              value: y,
              onChange: (L) => I(L.target.value),
              autoComplete: "tel"
            }
          )
        ] }),
        /* @__PURE__ */ h("label", { className: "scc-inquiry-modal__field", children: [
          /* @__PURE__ */ t("span", { children: "Message" }),
          /* @__PURE__ */ t(
            "textarea",
            {
              className: "scc-chat-panel__input scc-inquiry-modal__textarea",
              required: !0,
              rows: 5,
              value: K,
              onChange: (L) => z(L.target.value)
            }
          )
        ] }),
        p ? /* @__PURE__ */ t("p", { className: "scc-inquiry-modal__error", children: p }) : null,
        /* @__PURE__ */ h("div", { className: "scc-inquiry-modal__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "scc-inquiry-modal__cancel", onClick: c, disabled: l, children: "Cancel" }),
          /* @__PURE__ */ t("button", { type: "submit", className: "scc-inquiry-modal__submit", disabled: l, children: l ? /* @__PURE__ */ t(He, { className: "animate-spin h-4 w-4" }) : /* @__PURE__ */ h(Je, { children: [
            /* @__PURE__ */ t(jt, { className: "h-3.5 w-3.5" }),
            "Send inquiry"
          ] }) })
        ] })
      ] })
    ] })
  ] }) : null;
}
function qn({ size: a = "md", color: s = "#3B82F6" }) {
  const c = a === "sm" ? "1rem" : "1.5rem";
  return /* @__PURE__ */ t(
    "span",
    {
      className: "inline-block animate-spin rounded-full border-2 border-gray-200",
      style: {
        width: c,
        height: c,
        borderTopColor: s
      },
      "aria-hidden": "true"
    }
  );
}
const Yn = "PROSPECT_BATCH_TRIGGER", jn = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function zt(a) {
  return jn.test(String(a ?? "").trim());
}
function Wn(a) {
  if (!a || typeof a != "object") return [];
  const s = a.prospectIds ?? a.prospect_ids ?? a.ids;
  if (Array.isArray(s) && s.length)
    return s.map((i) => String(i).trim()).filter(zt);
  const c = a.prospects;
  return Array.isArray(c) && c.length ? c.map((i) => typeof i == "string" ? i.trim() : i && typeof i == "object" ? String(i.id ?? i.prospectId ?? i.prospect_id ?? "").trim() : "").filter(zt) : [];
}
function Xn(a) {
  const s = Gt(a, Yn);
  if (!s)
    return { displayContent: a, prospectBatch: null };
  let c = null;
  if (!s.orphan) {
    const l = Zt(s.jsonText), p = Wn(l);
    p.length > 0 && (c = {
      city: l != null && l.city ? String(l.city) : void 0,
      market: l != null && l.market ? String(l.market) : void 0,
      prospectIds: p
    });
  }
  return { displayContent: a.replace(s.strip, "").trim(), prospectBatch: c };
}
function On(a, s = {}) {
  if (s.streaming)
    return {
      displayContent: Et(kt(a)),
      draftProposal: null,
      draftProposals: [],
      prospectBatch: null
    };
  const c = Qt(a), i = Xn(c.displayContent);
  return {
    displayContent: Et(kt(i.displayContent)),
    draftProposal: c.draftProposal,
    draftProposals: c.draftProposals,
    prospectBatch: i.prospectBatch
  };
}
const Un = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]), Bt = 1568, mt = 4 * 1024 * 1024, Kn = 4;
function Tt(a) {
  return new Promise((s, c) => {
    const i = new FileReader();
    i.onload = () => s(String(i.result ?? "")), i.onerror = () => c(new Error("Failed to read image file")), i.readAsDataURL(a);
  });
}
function Vn(a) {
  const s = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(a);
  if (!s) throw new Error("Invalid image data");
  return { media_type: s[1], data: s[2] };
}
async function Jn(a) {
  const s = await Tt(a), c = new Image();
  return await new Promise((i, l) => {
    c.onload = i, c.onerror = () => l(new Error("Failed to decode image")), c.src = s;
  }), { image: c, dataUrl: s };
}
function qt(a, s, c) {
  return new Promise((i, l) => {
    a.toBlob(
      (p) => p ? i(p) : l(new Error("Failed to encode image")),
      s,
      c
    );
  });
}
async function Gn(a) {
  const { image: s } = await Jn(a), c = Math.max(s.naturalWidth, s.naturalHeight), i = a.type === "image/png" ? "image/png" : "image/jpeg", l = i === "image/jpeg" ? 0.88 : void 0;
  if (c <= Bt && a.size <= mt)
    return Tt(a);
  const p = Math.min(1, Bt / c), f = Math.max(1, Math.round(s.naturalWidth * p)), N = Math.max(1, Math.round(s.naturalHeight * p)), b = document.createElement("canvas");
  b.width = f, b.height = N;
  const E = b.getContext("2d");
  if (!E) throw new Error("Failed to prepare image");
  E.drawImage(s, 0, 0, f, N);
  let g = await qt(b, i, l);
  if (g.size > mt && i === "image/jpeg" && (g = await qt(b, i, 0.72)), g.size > mt)
    throw new Error("Image is too large after compression. Try a smaller screenshot.");
  return Tt(g);
}
async function Zn(a) {
  if (!Un.has(a.type))
    throw new Error("Use a PNG, JPEG, WebP, or GIF image.");
  const s = await Gn(a);
  return { ...Vn(s), previewUrl: s };
}
function Qn(a) {
  if (!(a != null && a.items)) return [];
  const s = [];
  for (const c of a.items)
    if (c.kind === "file" && c.type.startsWith("image/")) {
      const i = c.getAsFile();
      i && s.push(i);
    }
  return s;
}
const Nt = {
  maxImages: Kn,
  maxBytes: mt
};
function xt({
  orgColors: a,
  chatbotName: s,
  messages: c,
  loading: i,
  inputMessage: l,
  setInputMessage: p,
  onSendMessage: f,
  onNewChat: N,
  onClose: b,
  adminMode: E,
  showNewChat: g,
  isMobile: y,
  /** `grip` = drag lines (default); `mac-close` = red stoplight; `traffic-lights` = full macOS chrome (desktop). */
  collapseControl: I = "grip",
  onWindowMinimize: K,
  onWindowFullscreen: z,
  inputRef: V,
  messagesEndRef: L,
  onInputFocus: v,
  onInputBlur: J,
  onMobileResizeStart: se,
  welcomeMessage: ce,
  placeholder: ee,
  inquiryModal: B,
  onOpenSessionHistory: te,
  sessionHistoryModal: O,
  outreachEmailModal: ne,
  outreachLinkedInModal: fe,
  emailSendMode: P,
  onEmailSendModeChange: S,
  emailDrafts: k,
  emailDraftsLoading: re,
  onRefreshEmailDrafts: G,
  onSelectEmailDraft: F,
  onDismissEmailDraft: $e,
  onSaveProposedEmailDraft: U,
  onQuickPrompt: Q,
  activityStatus: q,
  salesAgentModel: ue,
  salesAgentModelGroups: ie,
  onSalesAgentModelChange: ge,
  salesAgentModelSaving: Z,
  /** The assistant's effort ('' = model default) + the levels its model has: [{ value, label }]. */
  salesAgentEffort: oe = "",
  salesAgentEffortOptions: A,
  /** Why effort can't be set right now (shown instead of the levels); '' when it can. */
  salesAgentEffortNote: M = "",
  /** Shown under the levels when a heavy level is picked. */
  salesAgentEffortWarning: _e = "",
  onSalesAgentEffortChange: Ie,
  aiPrivacyNotice: Ee,
  showAiPrivacyNotice: Fe,
  onDismissAiPrivacyNotice: o,
  enableImageUpload: d = !1,
  voiceEnabled: $ = !1,
  voiceState: x = "idle",
  onStartVoice: D,
  onStopVoice: Y,
  onStopGeneration: R,
  /** Sits inside the page (SiteChatWidget inline): no close button. */
  inline: ke = !1,
  /** Shown while inline: pop the chat out into the floating window. */
  onUndock: Pe,
  /** Shown in the floating window when it came from an inline chat: put it back in the page. */
  onDock: le,
  /** Optional "keep the chat on every page" switch: { label, checked, onChange(checked) }. */
  keepOnPages: w
}) {
  var ct;
  const ze = c.some((e) => e.streaming), Se = (ct = c.find((e) => e.streaming)) == null ? void 0 : ct.id, be = i && !ze, ae = i || ze, [ye, De] = m(!1), [ve, we] = m(!1), [ot, j] = m(() => /* @__PURE__ */ new Set()), [Xe, de] = m(null), [lt, Ne] = m({}), Te = H(null), Ae = H(null), Ge = !!(G && F), Be = !!(ue && (ie != null && ie.length) && ge), Oe = !!U, gt = !!Q, Ze = H(null), Le = H(null), Ue = H(null), [he, Me] = m([]), [Ke, W] = m(null), [pe, Qe] = m(!1), [et, xe] = m(!1), Re = !!(l.trim() || he.length), _t = async (e, n) => {
    if (!(!U || Xe)) {
      de(e), Ne((r) => ({ ...r, [e]: null }));
      try {
        await U(n), j((r) => new Set(r).add(e));
      } catch (r) {
        Ne((u) => ({
          ...u,
          [e]: r instanceof Error ? r.message : "Failed to save draft"
        }));
      } finally {
        de(null);
      }
    }
  }, bt = async (e, n) => {
    if (!(!U || Xe || !(n != null && n.length))) {
      de(e), Ne((r) => ({ ...r, [e]: null }));
      try {
        for (const r of n)
          await U(r);
        j((r) => new Set(r).add(e));
      } catch (r) {
        Ne((u) => ({
          ...u,
          [e]: r instanceof Error ? r.message : "Failed to save drafts"
        }));
      } finally {
        de(null);
      }
    }
  }, ut = C(() => {
    const e = Ze.current;
    if (!e) return;
    e.style.height = "0px";
    const r = Math.min(Math.max(e.scrollHeight, 1), 160);
    e.style.height = `${r}px`;
  }, []);
  T(() => {
    ut();
  }, [l, ut]);
  const qe = C(async (e) => {
    if (!d || !(e != null && e.length)) return [];
    W(null), Qe(!0);
    try {
      const n = [], r = Nt.maxImages - he.length;
      for (const u of e) {
        if (n.length >= r) break;
        const _ = await Zn(u);
        n.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          media_type: _.media_type,
          data: _.data,
          previewUrl: _.previewUrl
        });
      }
      return n.length ? (Me(
        (u) => [...u, ...n].slice(0, Nt.maxImages)
      ), n) : [];
    } catch (n) {
      return W(n instanceof Error ? n.message : "Failed to add image"), [];
    } finally {
      Qe(!1);
    }
  }, [d, he.length]), tt = C((e) => {
    Me((n) => n.filter((r) => r.id !== e));
  }, []), nt = C(() => {
    if (!Re || i) return;
    const e = he.map(({ media_type: r, data: u }) => ({ media_type: r, data: u })), n = he.map((r) => r.previewUrl);
    f(
      d && e.length ? { images: e, imagePreviews: n } : void 0
    ), Me([]), W(null);
  }, [Re, d, i, f, he]);
  T(() => {
    if (!d) return;
    const e = (r) => {
      const u = Qn(r.clipboardData);
      u.length && (r.preventDefault(), qe(u));
    }, n = Ue.current;
    return n == null || n.addEventListener("paste", e), () => n == null ? void 0 : n.removeEventListener("paste", e);
  }, [qe, d]);
  const dt = C((e) => {
    if (!e) return [];
    const n = Array.from(e.files ?? []).filter(
      (r) => r.type.startsWith("image/")
    );
    return n.length ? n : Array.from(e.items ?? []).filter((r) => r.kind === "file" && r.type.startsWith("image/")).map((r) => r.getAsFile()).filter(Boolean);
  }, []), yt = C(
    (e) => {
      var n;
      d && [...((n = e.dataTransfer) == null ? void 0 : n.types) ?? []].includes("Files") && (e.preventDefault(), xe(!0));
    },
    [d]
  ), Ce = C(
    (e) => {
      var n;
      d && [...((n = e.dataTransfer) == null ? void 0 : n.types) ?? []].includes("Files") && (e.preventDefault(), e.dataTransfer.dropEffect = "copy", xe(!0));
    },
    [d]
  ), Ye = C((e) => {
    var n;
    (n = Ue.current) != null && n.contains(e.relatedTarget) || xe(!1);
  }, []), Ve = C(
    (e) => {
      if (!d) return;
      e.preventDefault(), e.stopPropagation(), xe(!1);
      const n = dt(e.dataTransfer);
      n.length && qe(n);
    },
    [qe, d, dt]
  );
  T(() => {
    if (!d) return;
    const e = Ue.current, n = e == null ? void 0 : e.closest(".scc-panel-shell");
    if (!n) return;
    const r = (_) => {
      Ce(_);
    }, u = (_) => {
      Ve(_);
    };
    return n.addEventListener("dragover", r, !0), n.addEventListener("drop", u, !0), () => {
      n.removeEventListener("dragover", r, !0), n.removeEventListener("drop", u, !0);
    };
  }, [d, Ce, Ve]), T(() => {
    if (!ye && !ve) return;
    const e = (n) => {
      var r, u;
      ye && !((r = Te.current) != null && r.contains(n.target)) && De(!1), ve && !((u = Ae.current) != null && u.contains(n.target)) && we(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [ve, ye]);
  const at = (e) => {
    e.stopPropagation(), we((n) => !n);
  }, vt = (e) => {
    e.stopPropagation();
    const n = !ye;
    De(n), n && (G == null || G());
  }, st = (e) => {
    try {
      return new Date(e).toLocaleString(void 0, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return e;
    }
  };
  return /* @__PURE__ */ h(
    "div",
    {
      ref: Ue,
      className: `scc-chat-panel${et ? " scc-chat-panel--drop-target" : ""}`,
      style: { "--scc-fab-accent": a.primary },
      "data-sales-desktop-hit": "",
      onDragEnter: yt,
      onDragOver: Ce,
      onDragLeave: Ye,
      onDrop: Ve,
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: `scc-chat-panel__header chatbot-header-drag-handle${y ? " scc-chat-panel__header--mobile" : ""}${I === "traffic-lights" ? " scc-sales-workspace-panel__chrome" : ""}`,
            role: "toolbar",
            "aria-label": s || "Assistant",
            onTouchStart: se,
            onMouseDown: y && se ? se : void 0,
            title: y && se ? "Drag to resize" : "Drag to move",
            children: [
              /* @__PURE__ */ h("div", { className: "scc-chat-panel__header-main", children: [
                I === "traffic-lights" ? /* @__PURE__ */ h("div", { className: "scc-sales-traffic-lights chatbot-header-no-drag", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "scc-traffic scc-traffic--close",
                      onClick: (e) => {
                        e.stopPropagation(), b == null || b();
                      },
                      "aria-label": "Collapse assistant",
                      title: "Collapse"
                    }
                  ),
                  K ? /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "scc-traffic scc-traffic--minimize",
                      onClick: (e) => {
                        e.stopPropagation(), K();
                      },
                      "aria-label": "Minimize to Dock"
                    }
                  ) : /* @__PURE__ */ t("span", { className: "scc-traffic scc-traffic--minimize scc-traffic--inactive", "aria-hidden": !0 }),
                  z ? /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "scc-traffic scc-traffic--maximize",
                      onClick: (e) => {
                        e.stopPropagation(), z();
                      },
                      "aria-label": "Enter fullscreen"
                    }
                  ) : /* @__PURE__ */ t("span", { className: "scc-traffic scc-traffic--maximize scc-traffic--inactive", "aria-hidden": !0 })
                ] }) : I === "mac-close" ? /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    className: "scc-chat-panel__mac-close",
                    onClick: (e) => {
                      e.stopPropagation(), b == null || b();
                    },
                    "aria-label": "Collapse assistant",
                    title: "Collapse"
                  }
                ) : I !== "none" ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__grip", "aria-hidden": !0, children: [
                  /* @__PURE__ */ t("span", {}),
                  /* @__PURE__ */ t("span", {})
                ] }) : null,
                P && S ? /* @__PURE__ */ h(
                  "div",
                  {
                    className: "scc-chat-panel__email-mode",
                    role: "group",
                    "aria-label": "Outreach send mode",
                    children: [
                      /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          className: `scc-chat-panel__email-mode-btn${P === "review" ? " scc-chat-panel__email-mode-btn--active" : ""}`,
                          onClick: (e) => {
                            e.stopPropagation(), S("review");
                          },
                          "aria-pressed": P === "review",
                          children: "Review"
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          className: `scc-chat-panel__email-mode-btn scc-chat-panel__email-mode-btn--auto${P === "auto" ? " scc-chat-panel__email-mode-btn--active" : ""}`,
                          onClick: (e) => {
                            e.stopPropagation(), S("auto");
                          },
                          "aria-pressed": P === "auto",
                          children: "Auto"
                        }
                      )
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ h("div", { className: "scc-chat-panel__header-actions", children: [
                Be ? /* @__PURE__ */ h(
                  "div",
                  {
                    className: "scc-chat-panel__agent",
                    ref: Ae,
                    style: { "--scc-agent-accent": a.primary ?? "#5DA399" },
                    children: [
                      /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: at,
                          className: `scc-chat-panel__icon-btn scc-chat-panel__icon-btn--agent${ve ? " scc-chat-panel__icon-btn--agent-open" : ""}`,
                          style: { "--scc-agent-accent": a.primary ?? "#5DA399" },
                          title: "Switch agent model",
                          "aria-label": "Switch agent model",
                          "aria-expanded": ve,
                          "aria-haspopup": "menu",
                          disabled: Z,
                          children: Z ? /* @__PURE__ */ t(He, { className: "scc-chat-panel__header-icon animate-spin", "aria-hidden": !0 }) : /* @__PURE__ */ t(cn, { className: "scc-chat-panel__header-icon" })
                        }
                      ),
                      ve ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__agent-menu", role: "menu", "aria-label": "Agent models", children: [
                        /* @__PURE__ */ h("div", { className: "scc-chat-panel__agent-menu-header", children: [
                          /* @__PURE__ */ t("span", { children: "Agent" }),
                          Z ? /* @__PURE__ */ t(He, { className: "h-3 w-3 animate-spin", "aria-hidden": !0 }) : null
                        ] }),
                        Ie && (A != null && A.length) ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__agent-effort", role: "group", "aria-label": "Effort", children: [
                          /* @__PURE__ */ t("div", { className: "scc-chat-panel__agent-group-label", children: "Effort" }),
                          M ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__agent-effort-note", children: M }) : /* @__PURE__ */ t("div", { className: "scc-chat-panel__agent-effort-levels", children: A.map((e) => {
                            const n = e.value === oe;
                            return /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                "aria-pressed": n,
                                className: `scc-chat-panel__agent-effort-level${n ? " scc-chat-panel__agent-effort-level--active" : ""}`,
                                disabled: Z || n,
                                onClick: (r) => {
                                  r.stopPropagation(), n || Ie(e.value);
                                },
                                children: e.label
                              },
                              e.value || "default"
                            );
                          }) }),
                          !M && _e ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__agent-effort-note", children: _e }) : null
                        ] }) : null,
                        ie.map((e) => /* @__PURE__ */ h("div", { className: "scc-chat-panel__agent-group", role: "none", children: [
                          /* @__PURE__ */ t("div", { className: "scc-chat-panel__agent-group-label", children: e.label }),
                          e.options.map((n) => {
                            const r = n.value === ue, u = !!n.disabled;
                            return /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                role: "menuitemradio",
                                "aria-checked": r,
                                "aria-disabled": u,
                                className: `scc-chat-panel__agent-item${r ? " scc-chat-panel__agent-item--active" : ""}${u ? " scc-chat-panel__agent-item--locked" : ""}`,
                                disabled: Z || r || u,
                                onClick: (_) => {
                                  _.stopPropagation(), !(r || u) && (ge(n.value), we(!1));
                                },
                                children: n.label
                              },
                              n.value
                            );
                          })
                        ] }, e.label))
                      ] }) : null
                    ]
                  }
                ) : null,
                Ge ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__drafts", ref: Te, children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      onClick: vt,
                      className: `scc-chat-panel__icon-btn scc-chat-panel__icon-btn--drafts${ye ? " scc-chat-panel__icon-btn--drafts-open" : ""}`,
                      style: { "--scc-history-accent": a.secondary ?? "#F29F05" },
                      title: "Outreach drafts",
                      "aria-label": "Outreach drafts",
                      "aria-expanded": ye,
                      "aria-haspopup": "menu",
                      children: [
                        /* @__PURE__ */ t(rn, { className: "scc-chat-panel__header-icon" }),
                        k != null && k.length ? /* @__PURE__ */ t("span", { className: "scc-chat-panel__drafts-badge", "aria-hidden": !0, children: k.length > 9 ? "9+" : k.length }) : null
                      ]
                    }
                  ),
                  ye ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__drafts-menu", role: "menu", "aria-label": "Saved outreach drafts", children: [
                    /* @__PURE__ */ h("div", { className: "scc-chat-panel__drafts-menu-header", children: [
                      /* @__PURE__ */ t("span", { children: "Drafts" }),
                      re ? /* @__PURE__ */ t(He, { className: "h-3 w-3 animate-spin", "aria-hidden": !0 }) : null
                    ] }),
                    re && !(k != null && k.length) ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__drafts-empty", children: "Loading drafts…" }) : null,
                    !re && !(k != null && k.length) ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__drafts-empty", children: "No saved drafts yet." }) : null,
                    (k ?? []).map((e) => /* @__PURE__ */ h("div", { className: "scc-chat-panel__drafts-item", role: "none", children: [
                      /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          role: "menuitem",
                          className: "scc-chat-panel__drafts-item-main",
                          onClick: (n) => {
                            n.stopPropagation(), F == null || F(e), De(!1);
                          },
                          children: [
                            /* @__PURE__ */ t("span", { className: "scc-chat-panel__drafts-company", children: e.company_name || "Unknown company" }),
                            /* @__PURE__ */ t("span", { className: "scc-chat-panel__drafts-subject", children: e.channel === "linkedin" ? `LinkedIn · ${e.subject}` : e.subject }),
                            /* @__PURE__ */ t("span", { className: "scc-chat-panel__drafts-when", children: st(e.created_at) })
                          ]
                        }
                      ),
                      $e ? /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          className: "scc-chat-panel__drafts-dismiss",
                          "aria-label": `Delete draft for ${e.company_name || "prospect"}`,
                          onClick: (n) => {
                            n.stopPropagation(), $e(e.id);
                          },
                          children: /* @__PURE__ */ t(on, { className: "h-3 w-3", "aria-hidden": !0 })
                        }
                      ) : null
                    ] }, e.id))
                  ] }) : null
                ] }) : null,
                te ? /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation(), te();
                    },
                    className: "scc-chat-panel__icon-btn scc-chat-panel__icon-btn--history",
                    style: { "--scc-history-accent": a.secondary ?? "#F29F05" },
                    title: "Session history",
                    "aria-label": "Session history",
                    children: /* @__PURE__ */ t(ln, { className: "scc-chat-panel__header-icon" })
                  }
                ) : null,
                g && /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation(), N();
                    },
                    className: "scc-chat-panel__icon-btn",
                    title: "Start new chat",
                    children: /* @__PURE__ */ t(un, { className: "scc-chat-panel__header-icon" })
                  }
                ),
                Pe ? /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation(), Pe();
                    },
                    className: "scc-chat-panel__icon-btn",
                    title: "Open in a window and keep browsing",
                    "aria-label": "Open the chat in a window",
                    children: /* @__PURE__ */ t(dn, { className: "scc-chat-panel__header-icon" })
                  }
                ) : null,
                le ? /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation(), le();
                    },
                    className: "scc-chat-panel__icon-btn",
                    title: "Put the chat back in the page",
                    "aria-label": "Put the chat back in the page",
                    children: /* @__PURE__ */ t(hn, { className: "scc-chat-panel__header-icon" })
                  }
                ) : null,
                !E && !ke && I !== "mac-close" && I !== "traffic-lights" && /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation(), b();
                    },
                    className: "scc-chat-panel__icon-btn",
                    "aria-label": "Close chat",
                    children: /* @__PURE__ */ t(ht, { className: "scc-chat-panel__header-icon" })
                  }
                )
              ] })
            ]
          }
        ),
        w ? /* @__PURE__ */ h("label", { className: "scc-chat-panel__keep", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: !!w.checked,
              onChange: (e) => {
                var n;
                return (n = w.onChange) == null ? void 0 : n.call(w, e.target.checked);
              }
            }
          ),
          /* @__PURE__ */ t("span", { children: w.label || "Keep the chat on every page" })
        ] }) : null,
        /* @__PURE__ */ h(
          "div",
          {
            className: "scc-chat-panel__messages",
            onDragOver: Ce,
            onDrop: Ve,
            onWheel: (e) => {
              const n = e.currentTarget, r = n.scrollTop > 0, u = n.scrollTop < n.scrollHeight - n.clientHeight;
              (r && e.deltaY < 0 || u && e.deltaY > 0) && e.stopPropagation();
            },
            children: [
              Fe && Ee ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__ai-notice", role: "note", children: [
                /* @__PURE__ */ h("p", { className: "scc-chat-panel__ai-notice-text", children: [
                  Ee.bodyBeforeLink,
                  " ",
                  /* @__PURE__ */ t(
                    "a",
                    {
                      href: Ee.linkHref,
                      className: "scc-chat-panel__ai-notice-link",
                      children: Ee.linkLabel
                    }
                  ),
                  "."
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    className: "scc-chat-panel__ai-notice-dismiss",
                    onClick: o,
                    "aria-label": Ee.dismissAria,
                    children: /* @__PURE__ */ t(ht, { className: "h-3 w-3", "aria-hidden": !0 })
                  }
                )
              ] }) : null,
              c.length === 0 ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__welcome", children: [
                /* @__PURE__ */ t(Yt, { className: "scc-chat-panel__welcome-icon" }),
                /* @__PURE__ */ h("p", { className: "scc-chat-panel__welcome-title", children: [
                  "Hi, I'm ",
                  s,
                  "."
                ] }),
                /* @__PURE__ */ t("p", { className: "scc-chat-panel__welcome-body", children: ce })
              ] }) : c.map((e, n) => {
                var rt, Lt;
                const r = e.role === "assistant" ? On(e.content, {
                  streaming: !!e.streaming
                }) : {
                  displayContent: e.content,
                  draftProposal: null,
                  draftProposals: [],
                  prospectBatch: null
                }, u = (rt = r.draftProposals) != null && rt.length ? r.draftProposals : r.draftProposal ? [r.draftProposal] : [], _ = e.id ?? `${e.role}-${n}`, me = ot.has(_), je = Xe === _;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    className: `scc-chat-panel__row scc-chat-panel__row--${e.role}`,
                    children: /* @__PURE__ */ h("div", { className: `scc-chat-panel__bubble scc-chat-panel__bubble--${e.role}`, children: [
                      /* @__PURE__ */ h("div", { className: "scc-chat-panel__bubble-text", children: [
                        e.role === "assistant" ? /* @__PURE__ */ h(Je, { children: [
                          /* @__PURE__ */ t(zn, { content: r.displayContent }),
                          u.length > 0 && !e.streaming ? /* @__PURE__ */ t("div", { className: "scc-chat-panel__draft-proposals", children: u.map((X) => /* @__PURE__ */ h(
                            "article",
                            {
                              className: "scc-chat-panel__draft-card",
                              children: [
                                /* @__PURE__ */ t("p", { className: "scc-chat-panel__draft-card-label", children: "Proposed email" }),
                                /* @__PURE__ */ h("p", { className: "scc-chat-panel__draft-card-subject", children: [
                                  /* @__PURE__ */ t("strong", { children: "Subject:" }),
                                  " ",
                                  X.subject
                                ] }),
                                /* @__PURE__ */ t("p", { className: "scc-chat-panel__draft-card-body", children: X.body })
                              ]
                            },
                            `${X.prospectId}-${X.subject}`
                          )) }) : null
                        ] }) : /* @__PURE__ */ h(Je, { children: [
                          (Lt = e.imagePreviews) != null && Lt.length ? /* @__PURE__ */ t("div", { className: "scc-chat-panel__message-images", children: e.imagePreviews.map((X) => /* @__PURE__ */ t(
                            "img",
                            {
                              src: X,
                              alt: "Attached screenshot",
                              className: "scc-chat-panel__message-image"
                            },
                            X
                          )) }) : null,
                          e.content ? /* @__PURE__ */ t("span", { children: e.content }) : null
                        ] }),
                        e.streaming ? /* @__PURE__ */ h("span", { className: "scc-chat-panel__streaming-tail", children: [
                          q && e.id === Se ? /* @__PURE__ */ t("span", { className: "scc-chat-panel__activity-status", children: q }) : null,
                          /* @__PURE__ */ t("span", { className: "scc-chat-panel__cursor", children: "▍" })
                        ] }) : null
                      ] }),
                      gt && r.prospectBatch && !e.streaming ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__quick-actions", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            className: "scc-chat-panel__quick-action scc-chat-panel__quick-action--primary",
                            style: { "--scc-agent-accent": a.primary ?? "#5DA399" },
                            disabled: i,
                            onClick: () => {
                              const { city: X, market: Ot, prospectIds: Ut } = r.prospectBatch, Kt = X || Ot || "the same market", Vt = Ut.join(", ");
                              Q(
                                `Find 3 more prospects in ${Kt} that could benefit from our services. Exclude these prospect ids already in CRM: ${Vt}. search_web → save_prospect for each → list all 3 with ids.`
                              );
                            },
                            children: "Search 3 more"
                          }
                        ),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            className: "scc-chat-panel__quick-action",
                            disabled: i,
                            onClick: () => {
                              const X = r.prospectBatch.prospectIds.join(", ");
                              Q(
                                `Draft outreach emails for prospects from this batch (${X}). For each with contact_email: get_prospect first, then propose tailored copy (review mode — use DRAFT_EMAIL_TRIGGER blocks). Start with the strongest fit; do one at a time unless I say batch.`
                              );
                            },
                            children: "Draft emails"
                          }
                        )
                      ] }) : null,
                      Oe && u.length > 0 && !e.streaming ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__quick-actions", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            className: "scc-chat-panel__quick-action scc-chat-panel__quick-action--primary",
                            style: { "--scc-history-accent": a.secondary ?? "#F29F05" },
                            disabled: me || je,
                            onClick: () => void (u.length > 1 ? bt(_, u) : _t(_, u[0])),
                            children: je ? /* @__PURE__ */ h(Je, { children: [
                              /* @__PURE__ */ t(He, { className: "h-3 w-3 animate-spin", "aria-hidden": !0 }),
                              "Saving…"
                            ] }) : me ? (u.length > 1, "Saved to drafts") : u.length > 1 ? "Add all to drafts" : "Add to drafts"
                          }
                        ),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            className: "scc-chat-panel__quick-action",
                            disabled: je || i,
                            onClick: () => {
                              const X = "Try again. Rewrite the email with a different hook and a slightly shorter body (60–80 words). Keep the same offer and CTA.";
                              Q ? Q(X) : (p(X), f());
                            },
                            children: "Try again"
                          }
                        ),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            className: "scc-chat-panel__quick-action",
                            disabled: je || i,
                            onClick: () => {
                              const X = "Rewrite the email with a different angle (choose one): reservations flow, digital menu UX, or storytelling/photos. Keep it concise and specific.";
                              Q ? Q(X) : (p(X), f());
                            },
                            children: "Change angle"
                          }
                        ),
                        lt[_] ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__draft-proposal-error", children: lt[_] }) : null
                      ] }) : null,
                      e.timestamp && !e.streaming && /* @__PURE__ */ t("p", { className: "scc-chat-panel__bubble-time", children: e.timestamp.toLocaleTimeString() })
                    ] })
                  },
                  _
                );
              }),
              q && !ze ? /* @__PURE__ */ t("div", { className: "scc-chat-panel__row scc-chat-panel__row--assistant", children: /* @__PURE__ */ t("div", { className: "scc-chat-panel__bubble scc-chat-panel__bubble--assistant", children: /* @__PURE__ */ t("div", { className: "scc-chat-panel__bubble-text", children: /* @__PURE__ */ t("span", { className: "scc-chat-panel__activity-status", children: q }) }) }) }) : null,
              be && /* @__PURE__ */ t("div", { className: "scc-chat-panel__row scc-chat-panel__row--assistant", children: /* @__PURE__ */ t("div", { className: "scc-chat-panel__bubble scc-chat-panel__bubble--assistant scc-chat-panel__bubble--typing", children: /* @__PURE__ */ t(qn, { size: "sm", color: a.primary }) }) }),
              /* @__PURE__ */ t("div", { ref: L })
            ]
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            ref: V,
            className: `scc-chat-panel__composer${y ? " scc-chat-panel__composer--mobile" : ""}`,
            children: [
              d && he.length ? /* @__PURE__ */ t("div", { className: "scc-chat-panel__attachment-strip", children: he.map((e) => /* @__PURE__ */ h("div", { className: "scc-chat-panel__attachment", children: [
                /* @__PURE__ */ t("img", { src: e.previewUrl, alt: "", className: "scc-chat-panel__attachment-thumb" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    className: "scc-chat-panel__attachment-remove",
                    "aria-label": "Remove image",
                    onClick: () => tt(e.id),
                    children: /* @__PURE__ */ t(ht, { className: "h-3 w-3", "aria-hidden": !0 })
                  }
                )
              ] }, e.id)) }) : null,
              Ke ? /* @__PURE__ */ t("p", { className: "scc-chat-panel__attachment-error", children: Ke }) : null,
              /* @__PURE__ */ t(
                "input",
                {
                  ref: Le,
                  type: "file",
                  accept: "image/png,image/jpeg,image/webp,image/gif",
                  multiple: !0,
                  tabIndex: -1,
                  "aria-hidden": !0,
                  className: "scc-chat-panel__file-input",
                  onChange: (e) => {
                    const n = Array.from(e.target.files ?? []);
                    e.target.value = "", qe(n);
                  }
                }
              ),
              /* @__PURE__ */ h("div", { className: "scc-chat-panel__composer-row", children: [
                d || $ ? /* @__PURE__ */ h("div", { className: "scc-chat-panel__composer-tools", children: [
                  d ? /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: "scc-chat-panel__composer-icon-btn",
                      "aria-label": "Attach screenshot",
                      title: "Attach image (or paste a screenshot with ⌘V)",
                      disabled: i || pe || he.length >= Nt.maxImages,
                      onClick: () => {
                        var e;
                        return (e = Le.current) == null ? void 0 : e.click();
                      },
                      children: pe ? /* @__PURE__ */ t(He, { className: "animate-spin", "aria-hidden": !0 }) : /* @__PURE__ */ t(pn, { "aria-hidden": !0 })
                    }
                  ) : null,
                  $ ? /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      className: `scc-chat-panel__composer-icon-btn${x === "connected" ? " scc-chat-panel__composer-icon-btn--active" : ""}`,
                      onClick: () => {
                        x === "connected" || x === "connecting" ? Y == null || Y() : D == null || D();
                      },
                      "aria-label": x === "connected" || x === "connecting" ? "Hang up voice call" : "Start voice call",
                      title: x === "connected" || x === "connecting" ? "Hang up" : "Voice call",
                      children: x === "connecting" ? /* @__PURE__ */ t(He, { className: "animate-spin", "aria-hidden": !0 }) : x === "connected" ? /* @__PURE__ */ t(mn, { "aria-hidden": !0 }) : /* @__PURE__ */ t(fn, { "aria-hidden": !0 })
                    }
                  ) : null
                ] }) : null,
                /* @__PURE__ */ t(
                  "textarea",
                  {
                    ref: Ze,
                    rows: 1,
                    value: l,
                    onChange: (e) => p(e.target.value),
                    onKeyDown: (e) => {
                      e.key === "Enter" && !e.shiftKey && (e.preventDefault(), nt());
                    },
                    placeholder: ee,
                    disabled: i,
                    className: "scc-chat-panel__input scc-chat-panel__input--composer",
                    onFocus: v,
                    onBlur: J
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: ae && R ? R : nt,
                    disabled: ae ? !R : i || !Re,
                    className: "scc-chat-panel__send",
                    "aria-label": ae && R ? "Stop generation" : "Send message",
                    title: ae && R ? "Stop" : "Send",
                    children: ae && R ? /* @__PURE__ */ t(gn, { className: "h-3.5 w-3.5", "aria-hidden": !0 }) : i ? /* @__PURE__ */ t(He, { className: "animate-spin h-4 w-4" }) : /* @__PURE__ */ t(jt, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ]
          }
        ),
        B ? /* @__PURE__ */ t(
          Bn,
          {
            open: B.open,
            draftMessage: B.draftMessage,
            onClose: B.onClose,
            onSubmit: B.onSubmit,
            submitting: B.submitting,
            error: B.error,
            accent: a.primary
          }
        ) : null,
        O,
        ne,
        fe
      ]
    }
  );
}
const ea = ({
  position: a,
  size: s,
  onDragStop: c,
  onResizeStop: i,
  zIndexBase: l = 9999,
  fadeOnBackgroundScroll: p = !0,
  minWidth: f = 280,
  minHeight: N = 400,
  children: b
}) => {
  const E = H(null), [g, y] = m(!1), [I, K] = m(!1), [z, V] = m(null), L = H(null), v = H(null), [J, se] = m(!1), [ce, ee] = m(!1), B = H(null), te = H(!1), O = () => {
    if (a)
      return a;
    if (typeof window > "u")
      return { x: 0, y: 0 };
    const o = window.innerWidth, d = window.innerHeight, $ = s.width || 320, x = s.height || 653, D = o - $ - 24, Y = d - x - 24;
    return {
      x: Math.max(0, D),
      y: Math.max(0, Y)
    };
  }, [ne, fe] = m(O), [P, S] = m(s);
  T(() => {
    a && fe(a);
  }, [a]), T(() => {
    s && S(s);
  }, [s]);
  const k = C((o) => {
    var $;
    if (!o.target.closest(".chatbot-header-drag-handle") || o.target.closest(
      '.chatbot-header-no-drag, button, a, input, select, textarea, [role="tab"], [role="menu"]'
    ))
      return;
    o.preventDefault(), o.stopPropagation();
    const d = ($ = E.current) == null ? void 0 : $.getBoundingClientRect();
    d && (y(!0), L.current = {
      startX: o.clientX,
      startY: o.clientY,
      startLeft: d.left,
      startTop: d.top
    }, document.body.style.userSelect = "none", document.body.style.cursor = "grabbing");
  }, []), re = C((o) => {
    if (!g || !L.current) return;
    const d = o.clientX - L.current.startX, $ = o.clientY - L.current.startY, x = L.current.startLeft + d, D = L.current.startTop + $, Y = window.innerWidth - P.width, R = window.innerHeight - P.height;
    fe({
      x: Math.max(0, Math.min(Y, x)),
      y: Math.max(0, Math.min(R, D))
    });
  }, [g, P.width, P.height]), G = C(() => {
    g && (y(!1), document.body.style.userSelect = "", document.body.style.cursor = "", L.current && c && c(null, { x: ne.x, y: ne.y }), L.current = null);
  }, [g, ne, c]), F = C((o, d) => {
    var x;
    o.preventDefault(), o.stopPropagation();
    const $ = (x = E.current) == null ? void 0 : x.getBoundingClientRect();
    $ && (K(!0), V(d), v.current = {
      startX: o.clientX,
      startY: o.clientY,
      startWidth: $.width,
      startHeight: $.height,
      startLeft: $.left,
      startTop: $.top
    }, document.body.style.userSelect = "none");
  }, []), $e = (o) => {
    const d = String(o ?? "").toLowerCase();
    return {
      horizontal: d.includes("left") ? "left" : d.includes("right") ? "right" : null,
      vertical: d.includes("top") ? "top" : d.includes("bottom") ? "bottom" : null
    };
  }, U = C((o) => {
    if (!I || !v.current || !z) return;
    const d = o.clientX - v.current.startX, $ = o.clientY - v.current.startY;
    let x = v.current.startWidth, D = v.current.startHeight, Y = v.current.startLeft, R = v.current.startTop;
    const { horizontal: ke, vertical: Pe } = $e(z), le = ke === "right", w = ke === "left", ze = Pe === "bottom", Se = Pe === "top";
    le ? x = v.current.startWidth + d : w && (x = v.current.startWidth - d, Y = v.current.startLeft + d), ze ? D = v.current.startHeight + $ : Se && (D = v.current.startHeight - $, R = v.current.startTop + $);
    const be = window.innerWidth * 0.95, ae = window.innerHeight * 0.95;
    w && (x < f ? (Y = v.current.startLeft + (v.current.startWidth - f), x = f) : x > be && (Y = v.current.startLeft + (v.current.startWidth - be), x = be)), Se && (D < N ? (R = v.current.startTop + (v.current.startHeight - N), D = N) : D > ae && (R = v.current.startTop + (v.current.startHeight - ae), D = ae)), x = Math.max(f, Math.min(be, x)), D = Math.max(N, Math.min(ae, D)), S({ width: x, height: D }), fe({ x: Y, y: R });
  }, [I, z, f, N]), Q = C(() => {
    I && (K(!1), V(null), document.body.style.userSelect = "", v.current && i && i(null, z, { style: { width: `${P.width}px`, height: `${P.height}px` } }, {}, ne), v.current = null);
  }, [I, z, P, ne, i]);
  T(() => {
    if (g)
      return document.addEventListener("mousemove", re), document.addEventListener("mouseup", G), () => {
        document.removeEventListener("mousemove", re), document.removeEventListener("mouseup", G);
      };
  }, [g, re, G]), T(() => {
    if (I)
      return document.addEventListener("mousemove", U), document.addEventListener("mouseup", Q), () => {
        document.removeEventListener("mousemove", U), document.removeEventListener("mouseup", Q);
      };
  }, [I, U, Q]);
  const q = C(() => {
    ee(!0), se(!1), te.current = !1, B.current && (clearTimeout(B.current), B.current = null);
  }, []), ue = C(() => {
    p && (te.current = !0, se(!0), ee(!1), B.current && clearTimeout(B.current), B.current = setTimeout(() => {
      se(!1), ee(!0), te.current = !1;
    }, 300));
  }, [p]), ie = (o, d) => o != null && o.contains(d) ? !!(d.closest(".scc-chat-panel__messages") || d.closest(".scc-sales-workspace-panel__body") || d.closest(".scc-prospects__detail-scroll") || d.closest(".scc-admin-activity__list")) : !1, ge = C(
    (o) => {
      const d = E.current;
      if (d) {
        if (d.contains(o.target)) {
          q();
          const $ = d.querySelector(".scc-chat-panel__messages");
          if ($) {
            const x = $.scrollTop > 0, D = $.scrollTop < $.scrollHeight - $.clientHeight - 1, Y = o.deltaY < 0, R = o.deltaY > 0;
            (Y && x || R && D) && o.stopPropagation();
            return;
          }
          ie(d, o.target) && o.stopPropagation();
          return;
        }
        ue();
      }
    },
    [q, ue]
  ), Z = C(() => {
    q();
  }, [q]);
  T(() => {
    const o = E.current;
    if (!o) return;
    o.addEventListener("click", Z), o.addEventListener("mouseenter", Z);
    const d = o.querySelector(".scc-chat-panel__messages"), $ = () => {
      q();
    };
    if (d == null || d.addEventListener("scroll", $, { passive: !0 }), !p)
      return () => {
        o.removeEventListener("click", Z), o.removeEventListener("mouseenter", Z), d == null || d.removeEventListener("scroll", $);
      };
    o.addEventListener("wheel", ge, { passive: !1 });
    const x = (D) => {
      o.contains(D.target) || ue();
    };
    return document.addEventListener("wheel", x, { passive: !0 }), () => {
      o.removeEventListener("wheel", ge), o.removeEventListener("click", Z), o.removeEventListener("mouseenter", Z), document.removeEventListener("wheel", x), d == null || d.removeEventListener("scroll", $), B.current && clearTimeout(B.current);
    };
  }, [p, ge, Z, q, ue]);
  const oe = "absolute bg-transparent z-20", A = {
    backgroundColor: "transparent"
  }, M = 16, _e = 8, Ie = p && J ? 0.3 : 1, Ee = ce ? l + 1 : l, Fe = p && J ? "opacity 0.2s ease-out" : "opacity 0.3s ease-in, z-index 0s";
  return /* @__PURE__ */ h(
    "div",
    {
      ref: E,
      className: `scc-panel-shell fixed flex flex-col${p ? "" : " scc-panel-shell--no-scroll-fade"}`,
      style: {
        left: `${ne.x}px`,
        top: `${ne.y}px`,
        width: `${P.width}px`,
        height: `${P.height}px`,
        cursor: g ? "grabbing" : "default",
        opacity: Ie,
        zIndex: Ee,
        transition: Fe
      },
      onMouseDown: k,
      children: [
        b,
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} top-0 left-0 cursor-nwse-resize`,
            style: {
              ...A,
              zIndex: 25,
              width: `${M}px`,
              height: `${M}px`
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "top-left");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} top-0 right-0 cursor-nesw-resize`,
            style: {
              ...A,
              zIndex: 25,
              width: `${M}px`,
              height: `${M}px`
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "top-right");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} bottom-0 left-0 cursor-nesw-resize`,
            style: {
              ...A,
              zIndex: 25,
              width: `${M}px`,
              height: `${M}px`
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "bottom-left");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} bottom-0 right-0 cursor-nwse-resize`,
            style: {
              ...A,
              zIndex: 25,
              width: `${M}px`,
              height: `${M}px`
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "bottom-right");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} top-0 left-0 right-0 cursor-ns-resize`,
            style: {
              ...A,
              height: `${_e}px`,
              left: `${M}px`,
              right: `${M}px`,
              zIndex: 15
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "top");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} bottom-0 left-0 right-0 cursor-ns-resize`,
            style: {
              ...A,
              height: `${_e}px`,
              left: `${M}px`,
              right: `${M}px`,
              zIndex: 15
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "bottom");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} left-0 top-0 bottom-0 cursor-ew-resize`,
            style: {
              ...A,
              width: `${_e}px`,
              top: `${M}px`,
              bottom: `${M}px`,
              zIndex: 15
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "left");
            }
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: `${oe} right-0 top-0 bottom-0 cursor-ew-resize`,
            style: {
              ...A,
              width: `${_e}px`,
              top: `${M}px`,
              bottom: `${M}px`,
              zIndex: 15
            },
            onMouseDown: (o) => {
              o.stopPropagation(), F(o, "right");
            }
          }
        )
      ]
    }
  );
}, We = {
  primary: "#5DA399",
  primaryDark: "#0F766E",
  secondary: "#F29F05",
  accent: "#F29F05",
  welcomeMessage: _n,
  placeholder: "Type your message...",
  fabIconUrl: ""
};
function ra({
  adminMode: a = !1,
  routePath: s,
  /** When this element is on screen, the launcher FAB stays hidden (e.g. `#hero` on homepage). */
  hideFabWhenSelector: c,
  /** Point-of-collection notice for AI chat (body, privacy link, dismiss label). */
  aiPrivacyNotice: i,
  /** Timed hint near the FAB after cookie choice (session storage only). */
  proactiveNudge: l,
  /**
   * Render the chat inside its container (e.g. a contact page) instead of as a floating
   * launcher. Always open, no close button. Unlike adminMode it keeps the enabled check
   * and the AI privacy notice. An undock button turns it into the floating window.
   */
  inline: p = !1,
  /**
   * Optional "keep the chat on every page" switch, shown in the floating window:
   * { label, checked, onChange(checked) }. The host decides what to do with it
   * (e.g. load the chat on its other pages while checked).
   */
  keepOnPages: f
}) {
  var ct;
  const {
    supabase: N,
    supabaseUrl: b,
    supabaseAnonKey: E,
    siteId: g,
    sessionId: y,
    messages: I,
    initializeSession: K,
    startNewConversation: z,
    addMessage: V,
    updateMessageById: L,
    finishMessageById: v,
    loadHistory: J,
    isChatOpen: se,
    openChat: ce,
    closeChat: ee,
    openChatWithMessage: B,
    pendingChatMessage: te,
    takePendingChatMessage: O
  } = en(), [ne, fe] = m(p), P = p && ne, S = a || P || se, [k, re] = m(!!(f != null && f.checked)), G = C(() => {
    fe(!1), ce();
  }, [ce]), F = C(() => {
    ee(), fe(!0);
  }, [ee]), $e = C(
    (e) => {
      var n;
      re(e), (n = f == null ? void 0 : f.onChange) == null || n.call(f, e);
    },
    [f]
  ), [U, Q] = m(""), [q, ue] = m(!1), [ie, ge] = m(!1), [Z, oe] = m("AI Assistant"), [A, M] = m(We), [_e, Ie] = m(null), [Ee, Fe] = m(!1), [o, d] = m(""), [$, x] = m(!1), [D, Y] = m(null), [R, ke] = m(!1), [Pe, le] = m(!1), [w, ze] = m(!1), [Se, be] = m(null), [ae, ye] = m({ width: 320, height: 653 }), [De, ve] = m(null), [we, ot] = m(!1), [j, Xe] = m(() => {
    const e = typeof window < "u" ? window.innerHeight : 800;
    return { visualHeight: e, offsetTop: 0, layoutHeight: e, keyboardOpen: !1 };
  }), de = H(null), lt = H(null), Ne = H(null), Te = H(null), Ae = H(!1), Ge = H(!1), Be = H(null), Oe = H(!1), [gt, Ze] = m(!0), Le = it(() => !g || !y ? null : `site-context-chat-ai-notice-dismissed-${g}-${y}`, [g, y]);
  T(() => {
    !Le || a || typeof window > "u" || Ze(sessionStorage.getItem(Le) === "1");
  }, [a, Le]);
  const Ue = C(() => {
    Le && typeof window < "u" && sessionStorage.setItem(Le, "1"), Ze(!0);
  }, [Le]), he = !!(i && !a && !gt), Me = it(
    () => ({
      primary: A.primary ?? We.primary,
      primaryDark: A.primaryDark ?? We.primaryDark,
      secondary: A.secondary ?? We.secondary,
      accent: A.accent ?? We.accent
    }),
    [A]
  ), Ke = it(() => {
    var n;
    const e = s || (typeof window < "u" ? window.location.pathname : "/");
    if (typeof window < "u") {
      const r = ((n = window.location.hash) == null ? void 0 : n.toLowerCase()) ?? "", u = e.toLowerCase().replace(/\/$/, "") || "/";
      if ((u === "/" || /^\/(en|ro|es|de|el)$/.test(u)) && r === "#shop")
        return `${e.replace(/\/$/, "") || "/"}#shop`;
    }
    return e;
  }, [s]), W = j.keyboardOpen, pe = C(() => {
    const e = window.innerHeight, n = window.visualViewport;
    if (!n) {
      Ae.current = !1, Xe({
        visualHeight: e,
        offsetTop: 0,
        layoutHeight: e,
        keyboardOpen: !1
      });
      return;
    }
    const r = n.height, u = n.offsetTop || 0, _ = Math.max(0, e - r - u);
    Ae.current ? _ < 45 && (Ae.current = !1) : _ > 90 && (Ae.current = !0), Xe({
      visualHeight: r,
      offsetTop: u,
      layoutHeight: e,
      keyboardOpen: Ae.current
    });
  }, []), Qe = it(() => {
    if (!w) return null;
    const e = De || j.layoutHeight * 0.8;
    return W ? Math.min(e, j.visualHeight) : Math.min(e, j.layoutHeight * 0.95);
  }, [w, De, j, W]), et = it(() => {
    if (!w) return null;
    const e = W ? j.visualHeight : Qe ?? j.layoutHeight * 0.8;
    return { top: W ? j.offsetTop : Math.max(0, j.layoutHeight - e), height: e };
  }, [w, Qe, W, j]), xe = W ? j.visualHeight : j.layoutHeight, Re = C(() => {
    requestAnimationFrame(() => {
      var n, r;
      const e = (n = de.current) == null ? void 0 : n.closest(".scc-chat-panel__messages");
      e ? e.scrollTop = e.scrollHeight : (r = de.current) == null || r.scrollIntoView({ block: "end" });
    });
  }, []), _t = C(() => {
    pe(), Re();
  }, [pe, Re]), bt = C(() => {
    window.setTimeout(pe, 120);
  }, [pe]);
  T(() => {
    if (a || !c) {
      ke(!1);
      return;
    }
    let e, n = !1;
    const r = () => {
      if (n) return;
      const u = document.querySelector(c);
      if (!u) {
        ke(!1);
        return;
      }
      e = new IntersectionObserver(
        ([_]) => {
          ke(_.isIntersecting);
        },
        { threshold: 0 }
      ), e.observe(u);
    };
    if (r(), !document.querySelector(c)) {
      const u = window.setTimeout(r, 100);
      return () => {
        n = !0, window.clearTimeout(u), e == null || e.disconnect();
      };
    }
    return () => {
      n = !0, e == null || e.disconnect();
    };
  }, [a, c, s]), T(() => {
    const e = () => {
      const n = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      ze(n);
    };
    return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
  }, []), T(() => {
    if (!(w || !g))
      try {
        const e = localStorage.getItem(Pt(g));
        if (!e) return;
        const n = JSON.parse(e);
        n.position && be(n.position), n.size && ye(n.size);
      } catch {
      }
  }, [w, g]), T(() => {
    if (!(!w || !g))
      try {
        const e = localStorage.getItem(St(g));
        if (!e) return;
        const n = JSON.parse(e);
        n.height && ve(n.height);
      } catch {
      }
  }, [w, g]), T(() => {
    var n, r;
    if (!w || a) return;
    const e = () => {
      Te.current == null && (Te.current = window.requestAnimationFrame(() => {
        Te.current = null, pe();
      }));
    };
    return e(), window.addEventListener("resize", e), (n = window.visualViewport) == null || n.addEventListener("resize", e), (r = window.visualViewport) == null || r.addEventListener("scroll", e), () => {
      var u, _;
      Te.current != null && (window.cancelAnimationFrame(Te.current), Te.current = null), window.removeEventListener("resize", e), (u = window.visualViewport) == null || u.removeEventListener("resize", e), (_ = window.visualViewport) == null || _.removeEventListener("scroll", e);
    };
  }, [w, a, pe]), T(() => {
    if (!w || !S || a || P) return;
    const { style: e } = document.body, { style: n } = document.documentElement, r = e.overflow, u = n.overflow;
    return e.overflow = "hidden", n.overflow = "hidden", () => {
      e.overflow = r, n.overflow = u, pe();
    };
  }, [w, S, a, P, pe]), T(() => {
    !w || !S || !W || Re();
  }, [w, S, W, Re]), T(() => {
    let e = !1;
    return (async () => {
      try {
        const n = await bn(N, g);
        if (e) return;
        if (!(n != null && n.success)) {
          Ie((n == null ? void 0 : n.error) ?? "Failed to load chatbot config"), ge(!1);
          return;
        }
        const r = n.config;
        ge(!!r.enabled), oe(r.chatbot_name ?? "AI Assistant");
        const u = { ...We, ...r.appearance ?? {} };
        u.welcomeMessage = Mt(u.welcomeMessage), M(u), Ie(null);
      } catch (n) {
        e || (Ie(n.message ?? "Failed to load chatbot config"), ge(!1));
      }
    })(), () => {
      e = !0;
    };
  }, [g, N]), T(() => {
    if (!S) {
      Ge.current = !1;
      return;
    }
    !y && !Ge.current && (Ge.current = !0, K());
  }, [S, y, K]), T(() => {
    !S || !y || te || Be.current !== y && (Be.current = y, J(y).catch((e) => {
      console.error("Failed to hydrate chat history:", e);
    }));
  }, [S, y, J, te]), T(() => {
    if (a || !(l != null && l.enabled) || !l.consentReady) {
      le(!1);
      return;
    }
    if (S || I.length > 0 || R) {
      le(!1);
      return;
    }
    if (Dt()) {
      le(!1);
      return;
    }
    const e = l.delayMs ?? tn, n = nn(), r = e - (Date.now() - n), u = () => {
      S || I.length > 0 || R || Dt() || le(!0);
    };
    if (r <= 0) {
      u();
      return;
    }
    const _ = window.setTimeout(u, r);
    return () => window.clearTimeout(_);
  }, [
    a,
    l,
    S,
    I.length,
    R
  ]);
  const ut = C(() => {
    At(), le(!1), ce();
  }, [ce]), qe = C((e) => {
    e.preventDefault(), e.stopPropagation(), an(), le(!1);
  }, []);
  T(() => {
    if (de.current) {
      const e = de.current.closest(".scc-chat-panel__messages");
      e ? e.scrollTop = e.scrollHeight : de.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [I, q, S]);
  const tt = (e, n) => {
    if (!(w || !g))
      try {
        localStorage.setItem(
          Pt(g),
          JSON.stringify({ position: e ?? Se, size: n ?? ae })
        );
      } catch {
      }
  }, nt = C(
    (e) => {
      if (!(!w || !g))
        try {
          localStorage.setItem(St(g), JSON.stringify({ height: e }));
        } catch {
        }
    },
    [w, g]
  ), dt = (e, n) => {
    const r = { x: n.x, y: n.y };
    be(r), tt(r, null);
  }, yt = (e, n, r, u, _) => {
    const me = {
      width: parseInt(r.style.width, 10),
      height: parseInt(r.style.height, 10)
    };
    ye(me), _ ? (be(_), tt(_, me)) : tt(Se, me);
  }, Ce = C(
    (e) => {
      if (!we || !Ne.current) return;
      const r = (e.touches ? e.touches[0] : e).clientY - Ne.current.startY, u = Ne.current.startHeight - r, _ = xe * 0.3, me = xe * 0.95;
      ve(Math.max(_, Math.min(me, u)));
    },
    [we, xe]
  ), Ye = C(() => {
    we && (ot(!1), ve((e) => (e && nt(e), e)), document.body.style.userSelect = "", document.body.style.touchAction = "", Ne.current = null);
  }, [we, nt]), Ve = C(
    (e) => {
      if (!w || W) return;
      e.preventDefault(), e.stopPropagation();
      const n = e.touches ? e.touches[0] : e, r = De || xe * 0.8;
      ot(!0), Ne.current = { startY: n.clientY, startHeight: r }, document.body.style.userSelect = "none", document.body.style.touchAction = "none";
    },
    [w, W, De, xe]
  );
  T(() => {
    if (!(!w || !we))
      return document.addEventListener("touchmove", Ce, { passive: !1 }), document.addEventListener("touchend", Ye), document.addEventListener("mousemove", Ce), document.addEventListener("mouseup", Ye), () => {
        document.removeEventListener("touchmove", Ce), document.removeEventListener("touchend", Ye), document.removeEventListener("mousemove", Ce), document.removeEventListener("mouseup", Ye);
      };
  }, [w, we, Ce, Ye]);
  const at = C(
    async (e) => {
      At(), le(!1);
      const n = (typeof e == "string" ? e : U).trim();
      if (!n || q || !ie || !y) return;
      const r = `asst_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      Q(""), ue(!0), V({
        id: `user_${Date.now()}`,
        role: "user",
        content: n,
        timestamp: /* @__PURE__ */ new Date()
      }), V({
        id: r,
        role: "assistant",
        content: "",
        streaming: !0,
        timestamp: /* @__PURE__ */ new Date()
      });
      let u = "";
      try {
        await yn(b, E, {
          siteId: g,
          sessionId: y,
          message: n,
          routeContext: { pathname: Ke },
          onDelta: (je) => {
            u += je, ue(!1), L(r, (rt) => ({
              ...rt,
              content: rt.content + je
            }));
          }
        });
        const { displayContent: _, draftMessage: me } = sn(u);
        L(r, {
          content: _ || u,
          streaming: !1
        }), me && (d(me), Y(null), Fe(!0));
      } catch (_) {
        console.error("Chat error:", _), L(r, {
          content: "Sorry, something went wrong. Please try again.",
          streaming: !1
        });
      } finally {
        ue(!1), v(r);
      }
    },
    [
      U,
      q,
      ie,
      y,
      V,
      L,
      v,
      b,
      E,
      g,
      Ke
    ]
  );
  T(() => {
    if (!S) {
      Oe.current = !1;
      return;
    }
    if (!te || !y || !ie || q || Oe.current)
      return;
    let e = !1;
    return Oe.current = !0, (async () => {
      try {
        Be.current !== y && (await J(y), Be.current = y);
      } catch (r) {
        console.error("Failed to hydrate chat history before auto-send:", r), Be.current = y;
      }
      if (e) return;
      const n = O();
      n && await at(n), Oe.current = !1;
    })(), () => {
      e = !0;
    };
  }, [
    S,
    te,
    y,
    ie,
    q,
    J,
    O,
    at
  ]);
  const vt = async (e) => {
    if (y) {
      x(!0), Y(null);
      try {
        const n = await vn(b, E, {
          siteId: g,
          sessionId: y,
          contactFormData: e,
          routeContext: { pathname: Ke }
        });
        Fe(!1), V({
          id: `asst_${Date.now()}`,
          role: "assistant",
          content: n.response,
          timestamp: /* @__PURE__ */ new Date()
        });
      } catch (n) {
        Y(n.message ?? "Failed to send inquiry");
      } finally {
        x(!1);
      }
    }
  }, st = {
    orgColors: Me,
    chatbotName: Z,
    messages: I,
    loading: q,
    inputMessage: U,
    setInputMessage: Q,
    onSendMessage: at,
    onNewChat: z,
    onClose: ee,
    adminMode: a,
    showNewChat: !0,
    isMobile: w,
    inputRef: lt,
    messagesEndRef: de,
    welcomeMessage: Mt(A.welcomeMessage),
    placeholder: A.placeholder ?? We.placeholder,
    onMobileResizeStart: W ? void 0 : Ve,
    onInputFocus: _t,
    onInputBlur: bt,
    inquiryModal: {
      open: Ee,
      draftMessage: o,
      onClose: () => Fe(!1),
      onSubmit: vt,
      submitting: $,
      error: D
    },
    aiPrivacyNotice: i,
    showAiPrivacyNotice: he,
    onDismissAiPrivacyNotice: Ue,
    // inline: undock out of the page; once floating, a way back into it
    onUndock: P ? G : void 0,
    onDock: p && !P ? F : void 0,
    keepOnPages: f && !P ? { label: f.label, checked: k, onChange: $e } : void 0
  };
  return !a && !ie ? (_e && console.warn("Site chatbot disabled:", _e), null) : P ? /* @__PURE__ */ t("div", { className: "scc-panel-shell scc-panel-shell--inline", style: { "--scc-fab-accent": Me.primary }, children: /* @__PURE__ */ t(xt, { ...st, isMobile: !1, inline: !0 }) }) : /* @__PURE__ */ h(Je, { children: [
    p && /* @__PURE__ */ h("div", { className: "scc-inline-undocked", role: "status", children: [
      /* @__PURE__ */ t("p", { className: "scc-inline-undocked__text", children: "The chat is open in its own window, so you can keep browsing." }),
      /* @__PURE__ */ t("button", { type: "button", className: "scc-inline-undocked__button", onClick: F, children: "Bring it back here" })
    ] }),
    !S && !a && /* @__PURE__ */ h(
      "div",
      {
        className: `scc-chat-fab-anchor${R ? " scc-chat-fab-anchor--hidden" : ""}`,
        "aria-hidden": R,
        children: [
          Pe && (l != null && l.message) ? /* @__PURE__ */ h("div", { className: "scc-chat-proactive-nudge", role: "status", children: [
            /* @__PURE__ */ t("p", { className: "scc-chat-proactive-nudge__text", children: l.message }),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: "scc-chat-proactive-nudge__dismiss",
                "aria-label": l.dismissAria,
                onClick: qe,
                children: "×"
              }
            )
          ] }) : null,
          /* @__PURE__ */ t(
            Pn,
            {
              onClick: ut,
              accent: Me.secondary,
              iconSrc: ((ct = A.fabIconUrl) == null ? void 0 : ct.trim()) || void 0,
              nudgeActive: Pe
            }
          )
        ]
      }
    ),
    S && /* @__PURE__ */ t(Je, { children: !w && !a ? /* @__PURE__ */ t(
      ea,
      {
        position: Se,
        size: ae,
        onDragStop: dt,
        onResizeStop: yt,
        children: /* @__PURE__ */ t(xt, { ...st, isMobile: !1 })
      }
    ) : /* @__PURE__ */ t(
      "div",
      {
        className: `scc-panel-shell ${a ? "w-full h-full" : w ? `scc-panel-shell--mobile fixed left-0 right-0 w-full${W ? " scc-panel-shell--keyboard-open" : ""}` : "fixed bottom-6 right-6 w-80 h-[653px]"} z-[9999]`,
        style: {
          "--scc-fab-accent": Me.primary,
          ...w && !a && et ? {
            top: `${et.top}px`,
            bottom: "auto",
            height: `${et.height}px`,
            maxHeight: W ? `${j.visualHeight}px` : `${j.layoutHeight * 0.95}px`,
            minHeight: W ? void 0 : `${j.layoutHeight * 0.3}px`
          } : {}
        },
        children: /* @__PURE__ */ t(xt, { ...st })
      }
    ) })
  ] });
}
export {
  Pn as ChatFab,
  xt as ChatPanel,
  ra as ChatWidget,
  ea as DraggableChatbotWrapper,
  ra as SiteChatWidget
};
