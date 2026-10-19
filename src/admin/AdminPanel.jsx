import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CANONICAL_WELCOME_MESSAGE, resolveWelcomeMessage } from '../lib/appearanceDefaults';
import { invokeSiteChatAdmin } from '../lib/api';
import AdminActivity from './AdminActivity';

const DEFAULT_APPEARANCE = {
  primary: '#5DA399',
  primaryDark: '#0F766E',
  secondary: '#F29F05',
  accent: '#F29F05',
  welcomeMessage: CANONICAL_WELCOME_MESSAGE,
  placeholder: 'Type your message...',
  fabIconUrl: '',
};

const ADMIN_SECRET_KEY = 'site-context-chat-admin-secret';

// Same models as the desk's picker (adminApi.ts); each needs its provider's key as a
// Supabase secret (ANTHROPIC_API_KEY / OPENAI_API_KEY / ZAI_API_KEY).
const VISITOR_MODEL_GROUPS = [
  {
    label: 'Claude (Anthropic)',
    options: [
      { value: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5' },
      { value: 'claude-haiku-5-5', label: 'Claude Haiku 5.5' },
      { value: 'claude-opus-5-5', label: 'Claude Opus 5.5' },
      { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
      { value: 'claude-opus-4-8', label: 'Claude Opus 4.8' },
    ],
  },
  {
    label: 'OpenAI',
    options: [
      { value: 'gpt-6-sol', label: 'GPT-6 Sol' },
      { value: 'gpt-6-luna', label: 'GPT-6 Luna' },
      { value: 'gpt-4o', label: 'GPT-4o' },
      { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
    ],
  },
  {
    label: 'Z.ai (GLM)',
    options: [
      { value: 'glm-5.3', label: 'GLM 5.3' },
      { value: 'glm-5.3-flash', label: 'GLM 5.3 Flash' },
      { value: 'glm-4.7-flash', label: 'GLM 4.7 Flash (free)' },
      { value: 'glm-4.7', label: 'GLM 4.7' },
      { value: 'glm-5', label: 'GLM 5' },
      { value: 'glm-5-turbo', label: 'GLM 5 Turbo' },
    ],
  },
];
// Models taken out of the list → the one the backend now runs instead (models.ts), so a site
// saved on one shows (and saves) its replacement.
const RETIRED_VISITOR_MODELS = {
  'claude-haiku-4-5-20251001': 'claude-haiku-5-5',
  'glm-4.5-flash': 'glm-4.7-flash',
};
const KNOWN_VISITOR_MODELS = new Set(VISITOR_MODEL_GROUPS.flatMap((g) => g.options.map((o) => o.value)));

export default function AdminPanel({
  supabaseUrl,
  supabaseAnonKey,
  siteId = 'default',
  className,
  AssistantTab,
  titleNav,
  adminCredential,
  supabaseClient,
  onSignedOut,
  /** Link to the Kontor sales desk in the header; null hides it (standalone / WordPress). */
  salesDeskHref = '/admin/sales',
}) {
  const supabase = useMemo(
    () => supabaseClient ?? createClient(supabaseUrl, supabaseAnonKey),
    [supabaseClient, supabaseUrl, supabaseAnonKey],
  );

  // Host-provided credential (the Kontor desk's session or the Mac app's secret): used
  // as is, never stored here. Without one, the standalone unlock below (OSS use).
  const hostManaged = adminCredential !== undefined;
  const [adminSecret, setAdminSecret] = useState(hostManaged ? adminCredential : '');
  const [secretInput, setSecretInput] = useState('');

  useEffect(() => {
    if (hostManaged) {
      setAdminSecret(adminCredential);
      return;
    }
    const stored = window.localStorage.getItem(ADMIN_SECRET_KEY) ?? '';
    if (stored) {
      setAdminSecret(stored);
      setSecretInput(stored);
    }
  }, [hostManaged, adminCredential]);
  const [tab, setTab] = useState('settings');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState(null);

  const [site, setSite] = useState({
    enabled: true,
    chatbot_name: 'AI Assistant',
    business_name: '',
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system_prompt_extra: '',
    appearance: DEFAULT_APPEARANCE,
  });
  const [contextMarkdown, setContextMarkdown] = useState('');

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const loadConfig = useCallback(async () => {
    if (!adminSecret) return;
    setLoading(true);
    setError(null);
    try {
      const data = await invokeSiteChatAdmin(supabase, adminSecret, {
        action: 'get',
        siteId,
      });
      if (!data?.success) {
        throw new Error(data?.error ?? 'Failed to load config');
      }
      setSite({
        enabled: data.site.enabled,
        chatbot_name: data.site.chatbot_name,
        business_name: data.site.business_name,
        model: RETIRED_VISITOR_MODELS[data.site.model] ?? data.site.model,
        max_tokens: data.site.max_tokens,
        system_prompt_extra: data.site.system_prompt_extra ?? '',
        appearance: {
          ...DEFAULT_APPEARANCE,
          ...(data.site.appearance ?? {}),
          welcomeMessage: resolveWelcomeMessage(data.site.appearance?.welcomeMessage),
        },
      });
      setContextMarkdown(data.context?.context_markdown ?? '');
    } catch (err) {
      const message = err.message ?? 'Failed to load config';
      setError(message);
      if (/unauthorized|401|forbidden|signed out|sign in again/i.test(message)) {
        if (hostManaged) {
          onSignedOut?.();
        } else {
          window.localStorage.removeItem(ADMIN_SECRET_KEY);
          setAdminSecret('');
          setSecretInput('');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [adminSecret, siteId, supabase, hostManaged, onSignedOut]);

  useEffect(() => {
    if (adminSecret) {
      loadConfig();
    }
  }, [adminSecret, loadConfig]);

  const handleUnlock = (event) => {
    event.preventDefault();
    const trimmed = secretInput.trim();
    if (!trimmed) return;
    window.localStorage.setItem(ADMIN_SECRET_KEY, trimmed);
    setAdminSecret(trimmed);
  };

  const handleSave = async () => {
    if (!adminSecret) return;
    setLoading(true);
    setError(null);
    try {
      const data = await invokeSiteChatAdmin(supabase, adminSecret, {
        action: 'save',
        siteId,
        site,
        contextMarkdown,
      });
      if (!data?.success) {
        throw new Error(data?.error ?? 'Failed to save');
      }
      showNotice('Saved to Supabase.');
    } catch (err) {
      setError(err.message ?? 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleImportMarkdown = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setContextMarkdown(text);
    event.target.value = '';
  };

  const contextStats = useMemo(() => {
    const chars = contextMarkdown.length;
    const words = contextMarkdown.trim() ? contextMarkdown.trim().split(/\s+/).length : 0;
    return { chars, words };
  }, [contextMarkdown]);

  const mainTabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'context', label: 'Context' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'activity', label: 'Activity' },
    ...(AssistantTab ? [{ id: 'assistant', label: 'Assistant' }] : []),
  ];

  if (!adminSecret) {
    return (
      <div className={`scc-admin scc-admin-visitor ${className ?? ''}`}>
        <h1 className="scc-admin__title">Visitor Chat Agent — Admin</h1>
        <p className="scc-help">
          Enter your <code>SITE_CHAT_ADMIN_SECRET</code> (set in Supabase Edge Function secrets).
        </p>
        <form onSubmit={handleUnlock} className="scc-admin__row">
          <input
            className="scc-input scc-input--full"
            type="password"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            placeholder="Admin secret"
          />
          <button type="submit" className="scc-visitor-action">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`scc-admin scc-admin-visitor ${className ?? ''}`}>
      <header className="scc-visitor-header">
        <div>
          {titleNav ?? <h1 className="scc-admin__title">Visitor Chat Agent</h1>}
          <p className="scc-admin__lead">
            Site <code>{siteId}</code> — your AI keys stay in Supabase secrets, not here.
          </p>
          {salesDeskHref ? (
            <p className="scc-visitor-header__sales-link">
              Sales outreach &amp; pipeline:{' '}
              <a href={salesDeskHref} className="scc-visitor-link">
                {salesDeskHref}
              </a>
            </p>
          ) : null}
        </div>
        <button type="button" className="scc-visitor-action" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving…' : 'Save'}
        </button>
      </header>

      {notice && <div className="scc-admin__notice scc-visitor-notice">{notice}</div>}
      {error && <div className="scc-error">{error}</div>}

      <nav className="scc-visitor-nav scc-visitor-nav--main" role="tablist" aria-label="Admin sections">
        {mainTabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`scc-visitor-nav__tab${tab === id ? ' scc-visitor-nav__tab--active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="scc-admin__body">
        {tab === 'settings' && (
          <section className="scc-admin-section scc-visitor-section">
            <label className="scc-field scc-field--row">
              <span>Enabled</span>
              <input
                type="checkbox"
                checked={site.enabled}
                onChange={(e) => setSite((prev) => ({ ...prev, enabled: e.target.checked }))}
              />
            </label>
            <label className="scc-field">
              <span>Chatbot name</span>
              <input
                className="scc-input scc-input--full"
                value={site.chatbot_name}
                onChange={(e) => setSite((prev) => ({ ...prev, chatbot_name: e.target.value }))}
              />
            </label>
            <label className="scc-field">
              <span>Business name</span>
              <input
                className="scc-input scc-input--full"
                value={site.business_name}
                onChange={(e) => setSite((prev) => ({ ...prev, business_name: e.target.value }))}
              />
            </label>
            <label className="scc-field">
              <span>Model</span>
              <p className="scc-help" style={{ margin: 0 }}>
                {salesDeskHref ? (
                  <>
                    Only affects the public site chatbot — not the sales assistant (
                    <code>{salesDeskHref}</code>).
                  </>
                ) : (
                  'The model that answers your visitors. Its provider’s key must be set as a Supabase secret.'
                )}
              </p>
              <select
                className="scc-input scc-input--full"
                value={site.model}
                onChange={(e) => setSite((prev) => ({ ...prev, model: e.target.value }))}
              >
                {/* A model set elsewhere stays selectable, so Save never switches it silently. */}
                {site.model && !KNOWN_VISITOR_MODELS.has(site.model) ? (
                  <option value={site.model}>{site.model}</option>
                ) : null}
                {VISITOR_MODEL_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="scc-field">
              <span>Max tokens</span>
              <input
                className="scc-input scc-input--full"
                type="number"
                min={256}
                max={4096}
                value={site.max_tokens}
                onChange={(e) =>
                  setSite((prev) => ({ ...prev, max_tokens: Number(e.target.value) || 1024 }))
                }
              />
            </label>
          </section>
        )}

        {tab === 'context' && (
          <section className="scc-admin-section scc-visitor-section">
            <div className="scc-visitor-panel__toolbar">
              <span className="scc-visitor-panel__hint">
                {contextStats.words.toLocaleString()} words · {contextStats.chars.toLocaleString()} chars
              </span>
              <label className="scc-visitor-action scc-visitor-action--sm scc-file-btn">
                Import .md
                <input type="file" accept=".md,.markdown,.txt" hidden onChange={handleImportMarkdown} />
              </label>
            </div>
            <label className="scc-field">
              <span>Site context</span>
              <p className="scc-help" style={{ margin: 0 }}>
                Markdown knowledge base injected into every visitor chat.
              </p>
              <textarea
                className="scc-textarea scc-textarea--tall"
                value={contextMarkdown}
                onChange={(e) => setContextMarkdown(e.target.value)}
                spellCheck={false}
              />
            </label>
            <label className="scc-field">
              <span>Visitor extra instructions</span>
              <p className="scc-help" style={{ margin: 0 }}>
                System prompt add-on for tone, discovery flow, and handoff rules.
              </p>
              <textarea
                className="scc-textarea scc-textarea--tall"
                value={site.system_prompt_extra}
                onChange={(e) =>
                  setSite((prev) => ({ ...prev, system_prompt_extra: e.target.value }))
                }
                spellCheck={false}
              />
            </label>
          </section>
        )}

        {tab === 'appearance' && (
          <section className="scc-admin-section scc-visitor-section">
            {['primary', 'primaryDark', 'secondary', 'accent'].map((key) => (
              <label key={key} className="scc-field">
                <span>{key}</span>
                <input
                  className="scc-input scc-input--full"
                  type="color"
                  value={site.appearance[key] ?? '#000000'}
                  onChange={(e) =>
                    setSite((prev) => ({
                      ...prev,
                      appearance: { ...prev.appearance, [key]: e.target.value },
                    }))
                  }
                />
              </label>
            ))}
            <label className="scc-field">
              <span>Welcome message</span>
              <textarea
                className="scc-textarea"
                rows={3}
                value={site.appearance.welcomeMessage ?? ''}
                onChange={(e) =>
                  setSite((prev) => ({
                    ...prev,
                    appearance: { ...prev.appearance, welcomeMessage: e.target.value },
                  }))
                }
              />
            </label>
            <label className="scc-field">
              <span>Input placeholder</span>
              <input
                className="scc-input scc-input--full"
                value={site.appearance.placeholder ?? ''}
                onChange={(e) =>
                  setSite((prev) => ({
                    ...prev,
                    appearance: { ...prev.appearance, placeholder: e.target.value },
                  }))
                }
              />
            </label>
            <label className="scc-field">
              <span>FAB icon URL</span>
              <p className="scc-help" style={{ margin: 0 }}>
                Public image URL for the chat launcher. Leave empty for the default bubble icon.
              </p>
              <input
                className="scc-input scc-input--full"
                type="url"
                placeholder="https://…/chat-icon.png"
                value={site.appearance.fabIconUrl ?? ''}
                onChange={(e) =>
                  setSite((prev) => ({
                    ...prev,
                    appearance: { ...prev.appearance, fabIconUrl: e.target.value },
                  }))
                }
              />
              {site.appearance.fabIconUrl?.trim() ? (
                <span
                  className="scc-fab-icon-preview"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <img
                    src={site.appearance.fabIconUrl.trim()}
                    alt=""
                    width={40}
                    height={40}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '999px',
                      objectFit: 'cover',
                      border: '1px solid var(--scc-border, #e2e8f0)',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.35';
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  />
                  <button
                    type="button"
                    className="scc-visitor-action scc-visitor-action--sm"
                    onClick={() =>
                      setSite((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, fabIconUrl: '' },
                      }))
                    }
                  >
                    Clear
                  </button>
                </span>
              ) : null}
            </label>
          </section>
        )}

        {tab === 'activity' && (
          <AdminActivity
            supabase={supabase}
            adminSecret={adminSecret}
            siteId={siteId}
            showProspectActions={!!AssistantTab}
          />
        )}

        {tab === 'assistant' && AssistantTab ? (
          <AssistantTab
            supabase={supabase}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
            adminSecret={adminSecret}
            siteId={siteId}
            site={site}
          />
        ) : null}
      </div>
    </div>
  );
}
