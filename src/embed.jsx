/**
 * Browser script-tag embed for static sites (no host React app required).
 *
 * Usage:
 *   <script>
 *     window.SiteContextChatConfig = {
 *       supabaseUrl: 'https://xxx.supabase.co',
 *       supabaseAnonKey: 'eyJ...',
 *       siteId: 'default',
 *     };
 *   </script>
 *   <script src="site-context-chat-embed.js"></script>
 *
 * Or data attributes on the script tag (no defer/async — or set Config before load):
 *   <script
 *     src="site-context-chat-embed.js"
 *     data-supabase-url="..."
 *     data-supabase-anon-key="..."
 *     data-site-id="default"
 *   ></script>
 *
 * Programmatic:
 *   window.SiteContextChat.mount({ ... })
 *   window.SiteContextChat.unmount()
 *
 * Inline (e.g. a contact page): the chat fills a container instead of floating, with an
 * undock button that pops it out into the floating window:
 *   window.SiteContextChat.mount({ container: '#chat', inline: true,
 *     keepOnPages: { label, checked, onChange(checked) } })
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatbotProvider } from './context/ChatbotProvider';
import SiteChatWidget from './chatbot/SiteChatWidget';
import './embedUtilities.css';
import './styles.css';

const ROOT_ID = 'site-context-chat-root';
const GLOBAL_KEY = 'SiteContextChat';
const CONFIG_KEY = 'SiteContextChatConfig';

let root = null;
let hostEl = null;

function findEmbedScript() {
  if (typeof document === 'undefined') return null;
  const current = document.currentScript;
  if (current && current.tagName === 'SCRIPT') return current;
  const scripts = document.querySelectorAll('script[src*="site-context-chat-embed"]');
  return scripts.length ? scripts[scripts.length - 1] : null;
}

function readDataConfig(script) {
  if (!script) return {};
  const ds = script.dataset || {};
  return {
    supabaseUrl: ds.supabaseUrl || undefined,
    supabaseAnonKey: ds.supabaseAnonKey || undefined,
    siteId: ds.siteId || undefined,
    container: ds.container || undefined,
    hideFabWhenSelector: ds.hideFabWhenSelector || undefined,
    autoMount: ds.autoMount !== 'false',
  };
}

function mergeConfig(overrides = {}) {
  const fromWindow =
    typeof window !== 'undefined' && window[CONFIG_KEY] && typeof window[CONFIG_KEY] === 'object'
      ? window[CONFIG_KEY]
      : {};
  const fromScript = readDataConfig(findEmbedScript());
  return {
    siteId: 'default',
    autoMount: true,
    ...fromScript,
    ...fromWindow,
    ...overrides,
  };
}

function ensureHost(container) {
  if (typeof document === 'undefined') return null;
  if (container) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) {
      console.error('[SiteContextChat] container not found:', container);
      return null;
    }
    return el;
  }
  let el = document.getElementById(ROOT_ID);
  if (!el) {
    el = document.createElement('div');
    el.id = ROOT_ID;
    document.body.appendChild(el);
  }
  return el;
}

function EmbedApp({
  supabaseUrl,
  supabaseAnonKey,
  siteId,
  routePath,
  hideFabWhenSelector,
  aiPrivacyNotice,
  proactiveNudge,
  inline,
  keepOnPages,
}) {
  const path =
    typeof routePath === 'string' && routePath
      ? routePath
      : typeof window !== 'undefined'
        ? window.location.pathname
        : '/';

  return (
    <ChatbotProvider supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} siteId={siteId}>
      <SiteChatWidget
        routePath={path}
        hideFabWhenSelector={hideFabWhenSelector}
        aiPrivacyNotice={aiPrivacyNotice}
        proactiveNudge={proactiveNudge}
        inline={inline}
        keepOnPages={keepOnPages}
      />
    </ChatbotProvider>
  );
}

function mount(overrides = {}) {
  const config = mergeConfig(overrides);
  const { supabaseUrl, supabaseAnonKey, siteId = 'default' } = config;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '[SiteContextChat] Missing supabaseUrl / supabaseAnonKey. Set window.SiteContextChatConfig or data-* attributes.',
    );
    return null;
  }

  if (typeof document === 'undefined') return null;

  const host = ensureHost(config.container);
  if (!host) return null;

  if (root) {
    root.unmount();
    root = null;
  }

  hostEl = host;
  root = createRoot(host);
  root.render(
    <EmbedApp
      supabaseUrl={supabaseUrl}
      supabaseAnonKey={supabaseAnonKey}
      siteId={siteId}
      routePath={config.routePath}
      hideFabWhenSelector={config.hideFabWhenSelector}
      aiPrivacyNotice={config.aiPrivacyNotice}
      proactiveNudge={config.proactiveNudge}
      inline={config.inline === true}
      keepOnPages={config.keepOnPages}
    />,
  );

  return api;
}

function unmount() {
  if (root) {
    root.unmount();
    root = null;
  }
  if (hostEl && hostEl.id === ROOT_ID && hostEl.parentNode) {
    hostEl.parentNode.removeChild(hostEl);
  }
  hostEl = null;
}

const api = {
  mount,
  unmount,
  version: '3.0.0',
};

function autoMountIfConfigured() {
  const config = mergeConfig();
  if (config.autoMount === false || config.manual === true) return;
  if (!config.supabaseUrl || !config.supabaseAnonKey) return;

  const run = () => mount();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}

if (typeof window !== 'undefined') {
  const previous = window[GLOBAL_KEY];
  window[GLOBAL_KEY] = previous && typeof previous === 'object' ? { ...previous, ...api } : api;
  autoMountIfConfigured();
}

export { mount, unmount, api as SiteContextChat };
