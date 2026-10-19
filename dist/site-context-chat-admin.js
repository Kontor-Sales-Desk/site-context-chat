import { jsxs as s, jsx as e, Fragment as J } from "react/jsx-runtime";
import { useState as m, useCallback as P, useEffect as U, useMemo as z } from "react";
import { createClient as H } from "@supabase/supabase-js";
import { F as ee, C as ae, r as ce } from "./index-2l4GG1XH.js";
import { c as E } from "./api-BhTcnjUO.js";
function q(l) {
  if (!l) return "—";
  try {
    return new Date(l).toLocaleString();
  } catch {
    return String(l);
  }
}
function se(l, o = 120) {
  const d = String(l ?? "").trim();
  return d.length <= o ? d : `${d.slice(0, o - 1)}…`;
}
function Y(l) {
  const o = String(l ?? "");
  return o.length <= 16 ? o : `${o.slice(0, 10)}…${o.slice(-4)}`;
}
function te({ status: l }) {
  return /* @__PURE__ */ e("span", { className: `scc-visitor-badge scc-visitor-badge--${l}`, children: l });
}
function le({
  supabase: l,
  adminSecret: o,
  siteId: d,
  initialSessionId: S = null,
  onSessionConsumed: f,
  showProspectActions: O = !1
}) {
  const [p, w] = m("conversations"), [N, b] = m(!1), [y, u] = m(null), [v, k] = m([]), [A, M] = m(null), [g, $] = m([]), [R, x] = m(!1), [F, G] = m([]), [I, C] = m(null), i = P(async () => {
    b(!0), u(null);
    try {
      const c = await E(l, o, {
        action: "conversations",
        siteId: d,
        limit: 100
      });
      if (!(c != null && c.success)) throw new Error((c == null ? void 0 : c.error) ?? "Failed to load conversations");
      k(c.sessions ?? []);
    } catch (c) {
      u(c.message ?? "Failed to load conversations");
    } finally {
      b(!1);
    }
  }, [o, d, l]), h = P(async () => {
    b(!0), u(null);
    try {
      const c = await E(l, o, {
        action: "inquiries",
        siteId: d,
        limit: 100
      });
      if (!(c != null && c.success)) throw new Error((c == null ? void 0 : c.error) ?? "Failed to load inquiries");
      G(c.inquiries ?? []);
    } catch (c) {
      u(c.message ?? "Failed to load inquiries");
    } finally {
      b(!1);
    }
  }, [o, d, l]), _ = P(
    async (c) => {
      if (c) {
        M(c), x(!0), u(null);
        try {
          const r = await E(l, o, {
            action: "conversation",
            siteId: d,
            sessionId: c
          });
          if (!(r != null && r.success)) throw new Error((r == null ? void 0 : r.error) ?? "Failed to load conversation");
          $(r.messages ?? []);
        } catch (r) {
          u(r.message ?? "Failed to load conversation"), $([]);
        } finally {
          x(!1);
        }
      }
    },
    [o, d, l]
  );
  U(() => {
    p === "conversations" ? i() : h();
  }, [p, i, h]), U(() => {
    S && (w("conversations"), _(S), f == null || f());
  }, [S, _, f]);
  const L = (c) => {
    w("conversations"), _(c);
  }, V = async (c) => {
    C(c), u(null);
    try {
      const r = await E(l, o, {
        action: "prospectFromInquiry",
        siteId: d,
        inquiryId: c
      });
      if (!(r != null && r.success)) throw new Error((r == null ? void 0 : r.error) ?? "Failed to create prospect");
    } catch (r) {
      u(r.message ?? "Failed to create prospect");
    } finally {
      C(null);
    }
  };
  return /* @__PURE__ */ s("section", { className: "scc-admin-section scc-visitor-panel", children: [
    /* @__PURE__ */ s("div", { className: "scc-visitor-panel__toolbar", children: [
      /* @__PURE__ */ s("nav", { className: "scc-visitor-nav", role: "tablist", "aria-label": "Activity", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": p === "conversations",
            className: `scc-visitor-nav__tab${p === "conversations" ? " scc-visitor-nav__tab--active" : ""}`,
            onClick: () => w("conversations"),
            children: "Conversations"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": p === "inquiries",
            className: `scc-visitor-nav__tab${p === "inquiries" ? " scc-visitor-nav__tab--active" : ""}`,
            onClick: () => w("inquiries"),
            children: "Inquiries"
          }
        )
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `scc-visitor-icon-btn${N ? " scc-visitor-icon-btn--spin" : ""}`,
          onClick: () => p === "conversations" ? i() : h(),
          disabled: N,
          "aria-label": "Refresh",
          title: "Refresh",
          children: /* @__PURE__ */ e(ee, { "aria-hidden": !0 })
        }
      )
    ] }),
    y ? /* @__PURE__ */ e("p", { className: "scc-error", children: y }) : null,
    p === "conversations" ? /* @__PURE__ */ s("div", { className: "scc-admin-activity__split", children: [
      /* @__PURE__ */ e("div", { className: "scc-admin-activity__list", children: v.length === 0 && !N ? /* @__PURE__ */ e("p", { className: "scc-help", children: "No conversations yet." }) : v.map((c) => /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: `scc-admin-activity__item ${A === c.session_id ? "scc-admin-activity__item--active" : ""}`,
          onClick: () => _(c.session_id),
          children: [
            /* @__PURE__ */ e("span", { className: "scc-admin-activity__item-preview", children: se(c.preview) || "(no user message)" }),
            /* @__PURE__ */ s("span", { className: "scc-admin-activity__item-meta", children: [
              q(c.last_at),
              " · ",
              c.user_message_count ?? 0,
              " visitor msg",
              c.last_route_path ? ` · ${c.last_route_path}` : ""
            ] }),
            /* @__PURE__ */ e("span", { className: "scc-admin-activity__item-id", children: Y(c.session_id) })
          ]
        },
        c.session_id
      )) }),
      /* @__PURE__ */ e("div", { className: "scc-admin-activity__detail scc-visitor-detail", children: A ? /* @__PURE__ */ s(J, { children: [
        /* @__PURE__ */ e("header", { className: "scc-visitor-detail__header", children: /* @__PURE__ */ s("p", { className: "scc-admin-activity__detail-id", children: [
          "Session ",
          /* @__PURE__ */ e("code", { children: A })
        ] }) }),
        /* @__PURE__ */ e("div", { className: "scc-visitor-detail__scroll", children: R ? /* @__PURE__ */ e("p", { className: "scc-help", children: "Loading thread…" }) : g.length === 0 ? /* @__PURE__ */ e("p", { className: "scc-help", children: "No messages in this session." }) : /* @__PURE__ */ e("div", { className: "scc-admin-activity__thread", children: g.map((c, r) => /* @__PURE__ */ s(
          "div",
          {
            className: `scc-admin-activity__bubble scc-admin-activity__bubble--${c.role}`,
            children: [
              /* @__PURE__ */ s("p", { className: "scc-admin-activity__bubble-label", children: [
                c.role === "user" ? "Visitor" : "Assistant",
                c.createdAt ? ` · ${q(c.createdAt)}` : ""
              ] }),
              /* @__PURE__ */ e("p", { className: "scc-admin-activity__bubble-text", children: c.content })
            ]
          },
          `${c.messageSequence ?? r}-${c.role}`
        )) }) })
      ] }) : /* @__PURE__ */ e("p", { className: "scc-help scc-visitor-detail__empty", children: "Select a conversation to read the full thread." }) })
    ] }) : /* @__PURE__ */ e("div", { className: "scc-admin-activity__inquiries", children: F.length === 0 && !N ? /* @__PURE__ */ e("p", { className: "scc-help", children: "No inquiry forms submitted yet." }) : F.map((c) => /* @__PURE__ */ s("article", { className: "scc-admin-activity__inquiry", children: [
      /* @__PURE__ */ s("header", { className: "scc-admin-activity__inquiry-head", children: [
        /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ e("strong", { children: c.contact_name }),
          /* @__PURE__ */ s("span", { className: "scc-admin-activity__inquiry-contact", children: [
            c.contact_email,
            c.contact_phone ? ` · ${c.contact_phone}` : ""
          ] })
        ] }),
        /* @__PURE__ */ e(te, { status: c.status })
      ] }),
      /* @__PURE__ */ e("p", { className: "scc-admin-activity__inquiry-message", children: c.message }),
      /* @__PURE__ */ s("footer", { className: "scc-admin-activity__inquiry-foot", children: [
        /* @__PURE__ */ e("span", { className: "scc-meta", children: q(c.created_at) }),
        c.route_path ? /* @__PURE__ */ s("span", { className: "scc-meta", children: [
          "Page: ",
          c.route_path
        ] }) : null,
        c.session_id && c.source !== "shop" ? /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "scc-visitor-link",
            onClick: () => L(c.session_id),
            children: [
              "View chat (",
              Y(c.session_id),
              ")"
            ]
          }
        ) : null,
        O ? /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "scc-visitor-action scc-visitor-action--sm",
            disabled: I === c.id,
            onClick: () => V(c.id),
            children: I === c.id ? "Adding…" : "Add to pipeline"
          }
        ) : null
      ] })
    ] }, c.id)) })
  ] });
}
const Z = {
  primary: "#5DA399",
  primaryDark: "#0F766E",
  secondary: "#F29F05",
  accent: "#F29F05",
  welcomeMessage: ae,
  placeholder: "Type your message...",
  fabIconUrl: ""
}, B = "site-context-chat-admin-secret", K = [
  {
    label: "Claude (Anthropic)",
    options: [
      { value: "claude-sonnet-5-5", label: "Claude Sonnet 5.5" },
      { value: "claude-haiku-5-5", label: "Claude Haiku 5.5" },
      { value: "claude-opus-5-5", label: "Claude Opus 5.5" },
      { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
      { value: "claude-opus-4-8", label: "Claude Opus 4.8" }
    ]
  },
  {
    label: "OpenAI",
    options: [
      { value: "gpt-6-sol", label: "GPT-6 Sol" },
      { value: "gpt-6-luna", label: "GPT-6 Luna" },
      { value: "gpt-4o", label: "GPT-4o" },
      { value: "gpt-4o-mini", label: "GPT-4o mini" }
    ]
  },
  {
    label: "Z.ai (GLM)",
    options: [
      { value: "glm-5.3", label: "GLM 5.3" },
      { value: "glm-5.3-flash", label: "GLM 5.3 Flash" },
      { value: "glm-4.7-flash", label: "GLM 4.7 Flash (free)" },
      { value: "glm-4.7", label: "GLM 4.7" },
      { value: "glm-5", label: "GLM 5" },
      { value: "glm-5-turbo", label: "GLM 5 Turbo" }
    ]
  }
], ne = {
  "claude-haiku-4-5-20251001": "claude-haiku-5-5",
  "glm-4.5-flash": "glm-4.7-flash"
}, ie = new Set(K.flatMap((l) => l.options.map((o) => o.value)));
function ue({
  supabaseUrl: l,
  supabaseAnonKey: o,
  siteId: d = "default",
  className: S,
  AssistantTab: f,
  titleNav: O,
  adminCredential: p,
  supabaseClient: w,
  onSignedOut: N,
  /** Link to the Kontor sales desk in the header; null hides it (standalone / WordPress). */
  salesDeskHref: b = "/admin/sales"
}) {
  var j;
  const y = z(
    () => w ?? H(l, o),
    [w, l, o]
  ), u = p !== void 0, [v, k] = m(u ? p : ""), [A, M] = m("");
  U(() => {
    if (u) {
      k(p);
      return;
    }
    const a = window.localStorage.getItem(B) ?? "";
    a && (k(a), M(a));
  }, [u, p]);
  const [g, $] = m("settings"), [R, x] = m(!1), [F, G] = m(null), [I, C] = m(null), [i, h] = m({
    enabled: !0,
    chatbot_name: "AI Assistant",
    business_name: "",
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system_prompt_extra: "",
    appearance: Z
  }), [_, L] = m(""), V = (a) => {
    G(a), window.setTimeout(() => G(null), 2500);
  }, D = P(async () => {
    var a, t;
    if (v) {
      x(!0), C(null);
      try {
        const n = await E(y, v, {
          action: "get",
          siteId: d
        });
        if (!(n != null && n.success))
          throw new Error((n == null ? void 0 : n.error) ?? "Failed to load config");
        h({
          enabled: n.site.enabled,
          chatbot_name: n.site.chatbot_name,
          business_name: n.site.business_name,
          model: ne[n.site.model] ?? n.site.model,
          max_tokens: n.site.max_tokens,
          system_prompt_extra: n.site.system_prompt_extra ?? "",
          appearance: {
            ...Z,
            ...n.site.appearance ?? {},
            welcomeMessage: ce((a = n.site.appearance) == null ? void 0 : a.welcomeMessage)
          }
        }), L(((t = n.context) == null ? void 0 : t.context_markdown) ?? "");
      } catch (n) {
        const T = n.message ?? "Failed to load config";
        C(T), /unauthorized|401|forbidden|signed out|sign in again/i.test(T) && (u ? N == null || N() : (window.localStorage.removeItem(B), k(""), M("")));
      } finally {
        x(!1);
      }
    }
  }, [v, d, y, u, N]);
  U(() => {
    v && D();
  }, [v, D]);
  const c = (a) => {
    a.preventDefault();
    const t = A.trim();
    t && (window.localStorage.setItem(B, t), k(t));
  }, r = async () => {
    if (v) {
      x(!0), C(null);
      try {
        const a = await E(y, v, {
          action: "save",
          siteId: d,
          site: i,
          contextMarkdown: _
        });
        if (!(a != null && a.success))
          throw new Error((a == null ? void 0 : a.error) ?? "Failed to save");
        V("Saved to Supabase.");
      } catch (a) {
        C(a.message ?? "Failed to save");
      } finally {
        x(!1);
      }
    }
  }, Q = async (a) => {
    var T;
    const t = (T = a.target.files) == null ? void 0 : T[0];
    if (!t) return;
    const n = await t.text();
    L(n), a.target.value = "";
  }, W = z(() => {
    const a = _.length, t = _.trim() ? _.trim().split(/\s+/).length : 0;
    return { chars: a, words: t };
  }, [_]), X = [
    { id: "settings", label: "Settings" },
    { id: "context", label: "Context" },
    { id: "appearance", label: "Appearance" },
    { id: "activity", label: "Activity" },
    ...f ? [{ id: "assistant", label: "Assistant" }] : []
  ];
  return v ? /* @__PURE__ */ s("div", { className: `scc-admin scc-admin-visitor ${S ?? ""}`, children: [
    /* @__PURE__ */ s("header", { className: "scc-visitor-header", children: [
      /* @__PURE__ */ s("div", { children: [
        O ?? /* @__PURE__ */ e("h1", { className: "scc-admin__title", children: "Visitor Chat Agent" }),
        /* @__PURE__ */ s("p", { className: "scc-admin__lead", children: [
          "Site ",
          /* @__PURE__ */ e("code", { children: d }),
          " — your AI keys stay in Supabase secrets, not here."
        ] }),
        b ? /* @__PURE__ */ s("p", { className: "scc-visitor-header__sales-link", children: [
          "Sales outreach & pipeline:",
          " ",
          /* @__PURE__ */ e("a", { href: b, className: "scc-visitor-link", children: b })
        ] }) : null
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "scc-visitor-action", onClick: r, disabled: R, children: R ? "Saving…" : "Save" })
    ] }),
    F && /* @__PURE__ */ e("div", { className: "scc-admin__notice scc-visitor-notice", children: F }),
    I && /* @__PURE__ */ e("div", { className: "scc-error", children: I }),
    /* @__PURE__ */ e("nav", { className: "scc-visitor-nav scc-visitor-nav--main", role: "tablist", "aria-label": "Admin sections", children: X.map(({ id: a, label: t }) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": g === a,
        className: `scc-visitor-nav__tab${g === a ? " scc-visitor-nav__tab--active" : ""}`,
        onClick: () => $(a),
        children: t
      },
      a
    )) }),
    /* @__PURE__ */ s("div", { className: "scc-admin__body", children: [
      g === "settings" && /* @__PURE__ */ s("section", { className: "scc-admin-section scc-visitor-section", children: [
        /* @__PURE__ */ s("label", { className: "scc-field scc-field--row", children: [
          /* @__PURE__ */ e("span", { children: "Enabled" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: i.enabled,
              onChange: (a) => h((t) => ({ ...t, enabled: a.target.checked }))
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Chatbot name" }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              value: i.chatbot_name,
              onChange: (a) => h((t) => ({ ...t, chatbot_name: a.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Business name" }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              value: i.business_name,
              onChange: (a) => h((t) => ({ ...t, business_name: a.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Model" }),
          /* @__PURE__ */ e("p", { className: "scc-help", style: { margin: 0 }, children: b ? /* @__PURE__ */ s(J, { children: [
            "Only affects the public site chatbot — not the sales assistant (",
            /* @__PURE__ */ e("code", { children: b }),
            ")."
          ] }) : "The model that answers your visitors. Its provider’s key must be set as a Supabase secret." }),
          /* @__PURE__ */ s(
            "select",
            {
              className: "scc-input scc-input--full",
              value: i.model,
              onChange: (a) => h((t) => ({ ...t, model: a.target.value })),
              children: [
                i.model && !ie.has(i.model) ? /* @__PURE__ */ e("option", { value: i.model, children: i.model }) : null,
                K.map((a) => /* @__PURE__ */ e("optgroup", { label: a.label, children: a.options.map((t) => /* @__PURE__ */ e("option", { value: t.value, children: t.label }, t.value)) }, a.label))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Max tokens" }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              type: "number",
              min: 256,
              max: 4096,
              value: i.max_tokens,
              onChange: (a) => h((t) => ({ ...t, max_tokens: Number(a.target.value) || 1024 }))
            }
          )
        ] })
      ] }),
      g === "context" && /* @__PURE__ */ s("section", { className: "scc-admin-section scc-visitor-section", children: [
        /* @__PURE__ */ s("div", { className: "scc-visitor-panel__toolbar", children: [
          /* @__PURE__ */ s("span", { className: "scc-visitor-panel__hint", children: [
            W.words.toLocaleString(),
            " words · ",
            W.chars.toLocaleString(),
            " chars"
          ] }),
          /* @__PURE__ */ s("label", { className: "scc-visitor-action scc-visitor-action--sm scc-file-btn", children: [
            "Import .md",
            /* @__PURE__ */ e("input", { type: "file", accept: ".md,.markdown,.txt", hidden: !0, onChange: Q })
          ] })
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Site context" }),
          /* @__PURE__ */ e("p", { className: "scc-help", style: { margin: 0 }, children: "Markdown knowledge base injected into every visitor chat." }),
          /* @__PURE__ */ e(
            "textarea",
            {
              className: "scc-textarea scc-textarea--tall",
              value: _,
              onChange: (a) => L(a.target.value),
              spellCheck: !1
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Visitor extra instructions" }),
          /* @__PURE__ */ e("p", { className: "scc-help", style: { margin: 0 }, children: "System prompt add-on for tone, discovery flow, and handoff rules." }),
          /* @__PURE__ */ e(
            "textarea",
            {
              className: "scc-textarea scc-textarea--tall",
              value: i.system_prompt_extra,
              onChange: (a) => h((t) => ({ ...t, system_prompt_extra: a.target.value })),
              spellCheck: !1
            }
          )
        ] })
      ] }),
      g === "appearance" && /* @__PURE__ */ s("section", { className: "scc-admin-section scc-visitor-section", children: [
        ["primary", "primaryDark", "secondary", "accent"].map((a) => /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: a }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              type: "color",
              value: i.appearance[a] ?? "#000000",
              onChange: (t) => h((n) => ({
                ...n,
                appearance: { ...n.appearance, [a]: t.target.value }
              }))
            }
          )
        ] }, a)),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Welcome message" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              className: "scc-textarea",
              rows: 3,
              value: i.appearance.welcomeMessage ?? "",
              onChange: (a) => h((t) => ({
                ...t,
                appearance: { ...t.appearance, welcomeMessage: a.target.value }
              }))
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "Input placeholder" }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              value: i.appearance.placeholder ?? "",
              onChange: (a) => h((t) => ({
                ...t,
                appearance: { ...t.appearance, placeholder: a.target.value }
              }))
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "scc-field", children: [
          /* @__PURE__ */ e("span", { children: "FAB icon URL" }),
          /* @__PURE__ */ e("p", { className: "scc-help", style: { margin: 0 }, children: "Public image URL for the chat launcher. Leave empty for the default bubble icon." }),
          /* @__PURE__ */ e(
            "input",
            {
              className: "scc-input scc-input--full",
              type: "url",
              placeholder: "https://…/chat-icon.png",
              value: i.appearance.fabIconUrl ?? "",
              onChange: (a) => h((t) => ({
                ...t,
                appearance: { ...t.appearance, fabIconUrl: a.target.value }
              }))
            }
          ),
          (j = i.appearance.fabIconUrl) != null && j.trim() ? /* @__PURE__ */ s(
            "span",
            {
              className: "scc-fab-icon-preview",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "0.5rem"
              },
              children: [
                /* @__PURE__ */ e(
                  "img",
                  {
                    src: i.appearance.fabIconUrl.trim(),
                    alt: "",
                    width: 40,
                    height: 40,
                    style: {
                      width: 40,
                      height: 40,
                      borderRadius: "999px",
                      objectFit: "cover",
                      border: "1px solid var(--scc-border, #e2e8f0)"
                    },
                    onError: (a) => {
                      a.currentTarget.style.opacity = "0.35";
                    },
                    onLoad: (a) => {
                      a.currentTarget.style.opacity = "1";
                    }
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "scc-visitor-action scc-visitor-action--sm",
                    onClick: () => h((a) => ({
                      ...a,
                      appearance: { ...a.appearance, fabIconUrl: "" }
                    })),
                    children: "Clear"
                  }
                )
              ]
            }
          ) : null
        ] })
      ] }),
      g === "activity" && /* @__PURE__ */ e(
        le,
        {
          supabase: y,
          adminSecret: v,
          siteId: d,
          showProspectActions: !!f
        }
      ),
      g === "assistant" && f ? /* @__PURE__ */ e(
        f,
        {
          supabase: y,
          supabaseUrl: l,
          supabaseAnonKey: o,
          adminSecret: v,
          siteId: d,
          site: i
        }
      ) : null
    ] })
  ] }) : /* @__PURE__ */ s("div", { className: `scc-admin scc-admin-visitor ${S ?? ""}`, children: [
    /* @__PURE__ */ e("h1", { className: "scc-admin__title", children: "Visitor Chat Agent — Admin" }),
    /* @__PURE__ */ s("p", { className: "scc-help", children: [
      "Enter your ",
      /* @__PURE__ */ e("code", { children: "SITE_CHAT_ADMIN_SECRET" }),
      " (set in Supabase Edge Function secrets)."
    ] }),
    /* @__PURE__ */ s("form", { onSubmit: c, className: "scc-admin__row", children: [
      /* @__PURE__ */ e(
        "input",
        {
          className: "scc-input scc-input--full",
          type: "password",
          value: A,
          onChange: (a) => M(a.target.value),
          placeholder: "Admin secret"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", className: "scc-visitor-action", children: "Unlock" })
    ] })
  ] });
}
export {
  ue as AdminPanel
};
