import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChatbot } from '../context/ChatbotProvider';
import { CANONICAL_WELCOME_MESSAGE, resolveWelcomeMessage } from '../lib/appearanceDefaults';
import { fetchSiteConfig, streamChatMessage, submitChatInquiry } from '../lib/api';
import { parseContactFormTrigger } from '../lib/contactForm';
import {
  DEFAULT_NUDGE_DELAY_MS,
  ensureVisitStartedAt,
  isProactiveNudgeBlocked,
  markChatEngaged,
  markProactiveNudgeDismissed,
} from '../lib/proactiveNudgeSession';
import { mobileWidgetStorageKey, widgetStorageKey } from '../lib/session';
import ChatFab from './ChatFab';
import ChatPanel from './ChatPanel';
import DraggableChatbotWrapper from './DraggableChatbotWrapper.jsx';

/** TechLads wordmark: teal (lads) + orange (tech) — see src/app/components/Logo.tsx */
const DEFAULT_COLORS = {
  primary: '#5DA399',
  primaryDark: '#0F766E',
  secondary: '#F29F05',
  accent: '#F29F05',
  welcomeMessage: CANONICAL_WELCOME_MESSAGE,
  placeholder: 'Type your message...',
  fabIconUrl: '',
};

export default function SiteChatWidget({
  adminMode = false,
  routePath,
  /** When this element is on screen, the launcher FAB stays hidden (e.g. `#hero` on homepage). */
  hideFabWhenSelector,
  /** Point-of-collection notice for AI chat (body, privacy link, dismiss label). */
  aiPrivacyNotice,
  /** Timed hint near the FAB after cookie choice (session storage only). */
  proactiveNudge,
  /**
   * Render the chat inside its container (e.g. a contact page) instead of as a floating
   * launcher. Always open, no close button. Unlike adminMode it keeps the enabled check
   * and the AI privacy notice. An undock button turns it into the floating window.
   */
  inline = false,
  /**
   * Optional "keep the chat on every page" switch, shown in the floating window:
   * { label, checked, onChange(checked) }. The host decides what to do with it
   * (e.g. load the chat on its other pages while checked).
   */
  keepOnPages,
}) {
  const {
    supabase,
    supabaseUrl,
    supabaseAnonKey,
    siteId,
    sessionId,
    messages,
    initializeSession,
    startNewConversation,
    addMessage,
    updateMessageById,
    finishMessageById,
    loadHistory,
    isChatOpen,
    openChat,
    closeChat,
    openChatWithMessage,
    pendingChatMessage,
    takePendingChatMessage,
  } = useChatbot();

  // inline: the chat lives in its container until undocked into the floating window
  const [docked, setDocked] = useState(inline);
  const showInline = inline && docked;
  const isOpen = adminMode || showInline || isChatOpen;
  const [keepChecked, setKeepChecked] = useState(Boolean(keepOnPages?.checked));

  const handleUndock = useCallback(() => {
    setDocked(false);
    openChat();
  }, [openChat]);

  const handleDock = useCallback(() => {
    closeChat();
    setDocked(true);
  }, [closeChat]);

  const handleKeepChange = useCallback(
    (checked) => {
      setKeepChecked(checked);
      keepOnPages?.onChange?.(checked);
    },
    [keepOnPages],
  );
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [chatbotName, setChatbotName] = useState('AI Assistant');
  const [appearance, setAppearance] = useState(DEFAULT_COLORS);
  const [configError, setConfigError] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryDraft, setInquiryDraft] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState(null);
  const [fabHiddenByAnchor, setFabHiddenByAnchor] = useState(false);
  const [proactiveNudgeVisible, setProactiveNudgeVisible] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState(null);
  const [size, setSize] = useState({ width: 320, height: 653 });
  const [mobileHeight, setMobileHeight] = useState(null);
  const [isResizingMobile, setIsResizingMobile] = useState(false);
  const [viewportMetrics, setViewportMetrics] = useState(() => {
    const layoutHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    return { visualHeight: layoutHeight, offsetTop: 0, layoutHeight, keyboardOpen: false };
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const mobileResizeStartRef = useRef(null);
  const viewportRafRef = useRef(null);
  const keyboardOpenRef = useRef(false);
  const sessionInitializedRef = useRef(false);
  const historyLoadedSessionRef = useRef(null);
  const pendingSendStartedRef = useRef(false);
  const [aiNoticeDismissed, setAiNoticeDismissed] = useState(true);

  const aiNoticeStorageKey = useMemo(() => {
    if (!siteId || !sessionId) return null;
    return `site-context-chat-ai-notice-dismissed-${siteId}-${sessionId}`;
  }, [siteId, sessionId]);

  useEffect(() => {
    if (!aiNoticeStorageKey || adminMode || typeof window === 'undefined') return;
    setAiNoticeDismissed(sessionStorage.getItem(aiNoticeStorageKey) === '1');
  }, [adminMode, aiNoticeStorageKey]);

  const dismissAiPrivacyNotice = useCallback(() => {
    if (aiNoticeStorageKey && typeof window !== 'undefined') {
      sessionStorage.setItem(aiNoticeStorageKey, '1');
    }
    setAiNoticeDismissed(true);
  }, [aiNoticeStorageKey]);

  const showAiPrivacyNotice = Boolean(
    aiPrivacyNotice && !adminMode && !aiNoticeDismissed,
  );

  const orgColors = useMemo(
    () => ({
      primary: appearance.primary ?? DEFAULT_COLORS.primary,
      primaryDark: appearance.primaryDark ?? DEFAULT_COLORS.primaryDark,
      secondary: appearance.secondary ?? DEFAULT_COLORS.secondary,
      accent: appearance.accent ?? DEFAULT_COLORS.accent,
    }),
    [appearance],
  );

  const effectiveRoutePath = useMemo(() => {
    const base = routePath
      ? routePath
      : typeof window !== 'undefined'
        ? window.location.pathname
        : '/';
    if (typeof window !== 'undefined') {
      const hash = window.location.hash?.toLowerCase() ?? '';
      const pathNorm = base.toLowerCase().replace(/\/$/, '') || '/';
      const isHome = pathNorm === '/' || /^\/(en|ro|es|de|el)$/.test(pathNorm);
      if (isHome && hash === '#shop') {
        return `${base.replace(/\/$/, '') || '/'}#shop`;
      }
    }
    return base;
  }, [routePath]);

  const isKeyboardOpen = viewportMetrics.keyboardOpen;

  const syncViewportMetrics = useCallback(() => {
    const layoutHeight = window.innerHeight;
    const vv = window.visualViewport;

    if (!vv) {
      keyboardOpenRef.current = false;
      setViewportMetrics({
        visualHeight: layoutHeight,
        offsetTop: 0,
        layoutHeight,
        keyboardOpen: false,
      });
      return;
    }

    const visualHeight = vv.height;
    const offsetTop = vv.offsetTop || 0;
    const inset = Math.max(0, layoutHeight - visualHeight - offsetTop);

    if (keyboardOpenRef.current) {
      if (inset < 45) keyboardOpenRef.current = false;
    } else if (inset > 90) {
      keyboardOpenRef.current = true;
    }

    setViewportMetrics({
      visualHeight,
      offsetTop,
      layoutHeight,
      keyboardOpen: keyboardOpenRef.current,
    });
  }, []);

  const effectiveMobileHeight = useMemo(() => {
    if (!isMobile) return null;
    const preferred = mobileHeight || viewportMetrics.layoutHeight * 0.8;
    if (isKeyboardOpen) {
      return Math.min(preferred, viewportMetrics.visualHeight);
    }
    return Math.min(preferred, viewportMetrics.layoutHeight * 0.95);
  }, [isMobile, mobileHeight, viewportMetrics, isKeyboardOpen]);

  const mobileShellLayout = useMemo(() => {
    if (!isMobile) return null;
    const height = isKeyboardOpen
      ? viewportMetrics.visualHeight
      : (effectiveMobileHeight ?? viewportMetrics.layoutHeight * 0.8);
    const top = isKeyboardOpen
      ? viewportMetrics.offsetTop
      : Math.max(0, viewportMetrics.layoutHeight - height);
    return { top, height };
  }, [isMobile, effectiveMobileHeight, isKeyboardOpen, viewportMetrics]);

  const mobileResizeViewportHeight = isKeyboardOpen
    ? viewportMetrics.visualHeight
    : viewportMetrics.layoutHeight;

  const scrollMessagesToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      const container = messagesEndRef.current?.closest('.scc-chat-panel__messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      } else {
        messagesEndRef.current?.scrollIntoView({ block: 'end' });
      }
    });
  }, []);

  const handleInputFocus = useCallback(() => {
    syncViewportMetrics();
    scrollMessagesToEnd();
  }, [syncViewportMetrics, scrollMessagesToEnd]);

  const handleInputBlur = useCallback(() => {
    window.setTimeout(syncViewportMetrics, 120);
  }, [syncViewportMetrics]);

  useEffect(() => {
    if (adminMode || !hideFabWhenSelector) {
      setFabHiddenByAnchor(false);
      return undefined;
    }

    let observer;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const anchor = document.querySelector(hideFabWhenSelector);
      if (!anchor) {
        setFabHiddenByAnchor(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setFabHiddenByAnchor(entry.isIntersecting);
        },
        { threshold: 0 },
      );
      observer.observe(anchor);
    };

    attach();

    if (!document.querySelector(hideFabWhenSelector)) {
      const retry = window.setTimeout(attach, 100);
      return () => {
        cancelled = true;
        window.clearTimeout(retry);
        observer?.disconnect();
      };
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [adminMode, hideFabWhenSelector, routePath]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !siteId) return;
    try {
      const saved = localStorage.getItem(widgetStorageKey(siteId));
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (parsed.position) setPosition(parsed.position);
      if (parsed.size) setSize(parsed.size);
    } catch {
      // ignore
    }
  }, [isMobile, siteId]);

  useEffect(() => {
    if (!isMobile || !siteId) return;
    try {
      const saved = localStorage.getItem(mobileWidgetStorageKey(siteId));
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (parsed.height) setMobileHeight(parsed.height);
    } catch {
      // ignore
    }
  }, [isMobile, siteId]);

  useEffect(() => {
    if (!isMobile || adminMode) return;
    const scheduleViewportSync = () => {
      if (viewportRafRef.current != null) return;
      viewportRafRef.current = window.requestAnimationFrame(() => {
        viewportRafRef.current = null;
        syncViewportMetrics();
      });
    };
    scheduleViewportSync();
    window.addEventListener('resize', scheduleViewportSync);
    window.visualViewport?.addEventListener('resize', scheduleViewportSync);
    window.visualViewport?.addEventListener('scroll', scheduleViewportSync);
    return () => {
      if (viewportRafRef.current != null) {
        window.cancelAnimationFrame(viewportRafRef.current);
        viewportRafRef.current = null;
      }
      window.removeEventListener('resize', scheduleViewportSync);
      window.visualViewport?.removeEventListener('resize', scheduleViewportSync);
      window.visualViewport?.removeEventListener('scroll', scheduleViewportSync);
    };
  }, [isMobile, adminMode, syncViewportMetrics]);

  useEffect(() => {
    // the page stays scrollable when the chat sits inside it
    if (!isMobile || !isOpen || adminMode || showInline) return undefined;
    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevHtmlOverflow = htmlStyle.overflow;
    bodyStyle.overflow = 'hidden';
    htmlStyle.overflow = 'hidden';
    return () => {
      bodyStyle.overflow = prevBodyOverflow;
      htmlStyle.overflow = prevHtmlOverflow;
      syncViewportMetrics();
    };
  }, [isMobile, isOpen, adminMode, showInline, syncViewportMetrics]);

  useEffect(() => {
    if (!isMobile || !isOpen || !isKeyboardOpen) return;
    scrollMessagesToEnd();
  }, [isMobile, isOpen, isKeyboardOpen, scrollMessagesToEnd]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchSiteConfig(supabase, siteId);
        if (cancelled) return;
        if (!data?.success) {
          setConfigError(data?.error ?? 'Failed to load chatbot config');
          setEnabled(false);
          return;
        }
        const config = data.config;
        setEnabled(!!config.enabled);
        setChatbotName(config.chatbot_name ?? 'AI Assistant');
        const loadedAppearance = { ...DEFAULT_COLORS, ...(config.appearance ?? {}) };
        loadedAppearance.welcomeMessage = resolveWelcomeMessage(loadedAppearance.welcomeMessage);
        setAppearance(loadedAppearance);
        setConfigError(null);
      } catch (error) {
        if (!cancelled) {
          setConfigError(error.message ?? 'Failed to load chatbot config');
          setEnabled(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [siteId, supabase]);

  useEffect(() => {
    if (!isOpen) {
      sessionInitializedRef.current = false;
      return;
    }
    if (!sessionId && !sessionInitializedRef.current) {
      sessionInitializedRef.current = true;
      initializeSession();
    }
  }, [isOpen, sessionId, initializeSession]);

  useEffect(() => {
    if (!isOpen || !sessionId || pendingChatMessage) return;
    if (historyLoadedSessionRef.current === sessionId) return;

    historyLoadedSessionRef.current = sessionId;

    loadHistory(sessionId).catch((error) => {
      console.error('Failed to hydrate chat history:', error);
    });
  }, [isOpen, sessionId, loadHistory, pendingChatMessage]);

  useEffect(() => {
    if (adminMode || !proactiveNudge?.enabled || !proactiveNudge.consentReady) {
      setProactiveNudgeVisible(false);
      return undefined;
    }
    if (isOpen || messages.length > 0 || fabHiddenByAnchor) {
      setProactiveNudgeVisible(false);
      return undefined;
    }
    if (isProactiveNudgeBlocked()) {
      setProactiveNudgeVisible(false);
      return undefined;
    }

    const delayMs = proactiveNudge.delayMs ?? DEFAULT_NUDGE_DELAY_MS;
    const startedAt = ensureVisitStartedAt();
    const remaining = delayMs - (Date.now() - startedAt);

    const tryShow = () => {
      if (isOpen || messages.length > 0 || fabHiddenByAnchor || isProactiveNudgeBlocked()) {
        return;
      }
      setProactiveNudgeVisible(true);
    };

    if (remaining <= 0) {
      tryShow();
      return undefined;
    }

    const timer = window.setTimeout(tryShow, remaining);
    return () => window.clearTimeout(timer);
  }, [
    adminMode,
    proactiveNudge,
    isOpen,
    messages.length,
    fabHiddenByAnchor,
  ]);

  const handleFabOpen = useCallback(() => {
    markChatEngaged();
    setProactiveNudgeVisible(false);
    openChat();
  }, [openChat]);

  const handleProactiveNudgeDismiss = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    markProactiveNudgeDismissed();
    setProactiveNudgeVisible(false);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.closest('.scc-chat-panel__messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, loading, isOpen]);

  const saveWidgetState = (newPosition, newSize) => {
    if (isMobile || !siteId) return;
    try {
      localStorage.setItem(
        widgetStorageKey(siteId),
        JSON.stringify({ position: newPosition ?? position, size: newSize ?? size }),
      );
    } catch {
      // ignore
    }
  };

  const saveMobileHeight = useCallback(
    (height) => {
      if (!isMobile || !siteId) return;
      try {
        localStorage.setItem(mobileWidgetStorageKey(siteId), JSON.stringify({ height }));
      } catch {
        // ignore
      }
    },
    [isMobile, siteId],
  );

  const handleDragStop = (_e, point) => {
    const newPosition = { x: point.x, y: point.y };
    setPosition(newPosition);
    saveWidgetState(newPosition, null);
  };

  const handleResizeStop = (_e, _direction, ref, _delta, newPosition) => {
    const newSize = {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    };
    setSize(newSize);
    if (newPosition) {
      setPosition(newPosition);
      saveWidgetState(newPosition, newSize);
    } else {
      saveWidgetState(position, newSize);
    }
  };

  const handleMobileResizeMove = useCallback(
    (e) => {
      if (!isResizingMobile || !mobileResizeStartRef.current) return;
      const touch = e.touches ? e.touches[0] : e;
      const deltaY = touch.clientY - mobileResizeStartRef.current.startY;
      const newHeight = mobileResizeStartRef.current.startHeight - deltaY;
      const minHeight = mobileResizeViewportHeight * 0.3;
      const maxHeight = mobileResizeViewportHeight * 0.95;
      setMobileHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
    },
    [isResizingMobile, mobileResizeViewportHeight],
  );

  const handleMobileResizeEnd = useCallback(() => {
    if (!isResizingMobile) return;
    setIsResizingMobile(false);
    setMobileHeight((current) => {
      if (current) saveMobileHeight(current);
      return current;
    });
    document.body.style.userSelect = '';
    document.body.style.touchAction = '';
    mobileResizeStartRef.current = null;
  }, [isResizingMobile, saveMobileHeight]);

  const handleMobileResizeStart = useCallback(
    (e) => {
      if (!isMobile || isKeyboardOpen) return;
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches ? e.touches[0] : e;
      const currentHeight = mobileHeight || mobileResizeViewportHeight * 0.8;
      setIsResizingMobile(true);
      mobileResizeStartRef.current = { startY: touch.clientY, startHeight: currentHeight };
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none';
    },
    [isMobile, isKeyboardOpen, mobileHeight, mobileResizeViewportHeight],
  );

  useEffect(() => {
    if (!isMobile || !isResizingMobile) return;
    document.addEventListener('touchmove', handleMobileResizeMove, { passive: false });
    document.addEventListener('touchend', handleMobileResizeEnd);
    document.addEventListener('mousemove', handleMobileResizeMove);
    document.addEventListener('mouseup', handleMobileResizeEnd);
    return () => {
      document.removeEventListener('touchmove', handleMobileResizeMove);
      document.removeEventListener('touchend', handleMobileResizeEnd);
      document.removeEventListener('mousemove', handleMobileResizeMove);
      document.removeEventListener('mouseup', handleMobileResizeEnd);
    };
  }, [isMobile, isResizingMobile, handleMobileResizeMove, handleMobileResizeEnd]);

  const handleSendMessage = useCallback(
    async (messageOverride) => {
      markChatEngaged();
      setProactiveNudgeVisible(false);
      const currentMessage = (
        typeof messageOverride === 'string' ? messageOverride : inputMessage
      ).trim();
      if (!currentMessage || loading || !enabled || !sessionId) return;

      const assistantId = `asst_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      setInputMessage('');
      setLoading(true);

      addMessage({
        id: `user_${Date.now()}`,
        role: 'user',
        content: currentMessage,
        timestamp: new Date(),
      });

      addMessage({
        id: assistantId,
        role: 'assistant',
        content: '',
        streaming: true,
        timestamp: new Date(),
      });

      let accumulated = '';

      try {
        await streamChatMessage(supabaseUrl, supabaseAnonKey, {
          siteId,
          sessionId,
          message: currentMessage,
          routeContext: { pathname: effectiveRoutePath },
          onDelta: (text) => {
            accumulated += text;
            setLoading(false);
            updateMessageById(assistantId, (message) => ({
              ...message,
              content: message.content + text,
            }));
          },
        });

        const { displayContent, draftMessage } = parseContactFormTrigger(accumulated);
        updateMessageById(assistantId, {
          content: displayContent || accumulated,
          streaming: false,
        });

        if (draftMessage) {
          setInquiryDraft(draftMessage);
          setInquiryError(null);
          setInquiryOpen(true);
        }
      } catch (error) {
        console.error('Chat error:', error);
        updateMessageById(assistantId, {
          content: 'Sorry, something went wrong. Please try again.',
          streaming: false,
        });
      } finally {
        setLoading(false);
        finishMessageById(assistantId);
      }
    },
    [
      inputMessage,
      loading,
      enabled,
      sessionId,
      addMessage,
      updateMessageById,
      finishMessageById,
      supabaseUrl,
      supabaseAnonKey,
      siteId,
      effectiveRoutePath,
    ],
  );

  useEffect(() => {
    if (!isOpen) {
      pendingSendStartedRef.current = false;
      return;
    }
    if (!pendingChatMessage || !sessionId || !enabled || loading || pendingSendStartedRef.current) {
      return;
    }

    let cancelled = false;
    pendingSendStartedRef.current = true;

    (async () => {
      try {
        if (historyLoadedSessionRef.current !== sessionId) {
          await loadHistory(sessionId);
          historyLoadedSessionRef.current = sessionId;
        }
      } catch (error) {
        console.error('Failed to hydrate chat history before auto-send:', error);
        historyLoadedSessionRef.current = sessionId;
      }

      if (cancelled) return;

      const message = takePendingChatMessage();
      if (message) {
        await handleSendMessage(message);
      }
      pendingSendStartedRef.current = false;
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isOpen,
    pendingChatMessage,
    sessionId,
    enabled,
    loading,
    loadHistory,
    takePendingChatMessage,
    handleSendMessage,
  ]);

  const handleInquirySubmit = async (contactFormData) => {
    if (!sessionId) return;

    setInquirySubmitting(true);
    setInquiryError(null);

    try {
      const data = await submitChatInquiry(supabaseUrl, supabaseAnonKey, {
        siteId,
        sessionId,
        contactFormData,
        routeContext: { pathname: effectiveRoutePath },
      });

      setInquiryOpen(false);
      addMessage({
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      });
    } catch (error) {
      setInquiryError(error.message ?? 'Failed to send inquiry');
    } finally {
      setInquirySubmitting(false);
    }
  };

  const panelProps = {
    orgColors,
    chatbotName,
    messages,
    loading,
    inputMessage,
    setInputMessage,
    onSendMessage: handleSendMessage,
    onNewChat: startNewConversation,
    onClose: closeChat,
    adminMode,
    showNewChat: true,
    isMobile,
    inputRef,
    messagesEndRef,
    welcomeMessage: resolveWelcomeMessage(appearance.welcomeMessage),
    placeholder: appearance.placeholder ?? DEFAULT_COLORS.placeholder,
    onMobileResizeStart: isKeyboardOpen ? undefined : handleMobileResizeStart,
    onInputFocus: handleInputFocus,
    onInputBlur: handleInputBlur,
    inquiryModal: {
      open: inquiryOpen,
      draftMessage: inquiryDraft,
      onClose: () => setInquiryOpen(false),
      onSubmit: handleInquirySubmit,
      submitting: inquirySubmitting,
      error: inquiryError,
    },
    aiPrivacyNotice,
    showAiPrivacyNotice,
    onDismissAiPrivacyNotice: dismissAiPrivacyNotice,
    // inline: undock out of the page; once floating, a way back into it
    onUndock: showInline ? handleUndock : undefined,
    onDock: inline && !showInline ? handleDock : undefined,
    keepOnPages:
      keepOnPages && !showInline
        ? { label: keepOnPages.label, checked: keepChecked, onChange: handleKeepChange }
        : undefined,
  };

  if (!adminMode && !enabled) {
    if (configError) {
      console.warn('Site chatbot disabled:', configError);
    }
    return null;
  }

  if (showInline) {
    return (
      <div className="scc-panel-shell scc-panel-shell--inline" style={{ '--scc-fab-accent': orgColors.primary }}>
        <ChatPanel {...panelProps} isMobile={false} inline />
      </div>
    );
  }

  return (
    <>
      {inline && (
        <div className="scc-inline-undocked" role="status">
          <p className="scc-inline-undocked__text">The chat is open in its own window, so you can keep browsing.</p>
          <button type="button" className="scc-inline-undocked__button" onClick={handleDock}>
            Bring it back here
          </button>
        </div>
      )}

      {!isOpen && !adminMode && (
        <div
          className={`scc-chat-fab-anchor${
            fabHiddenByAnchor ? ' scc-chat-fab-anchor--hidden' : ''
          }`}
          aria-hidden={fabHiddenByAnchor}
        >
          {proactiveNudgeVisible && proactiveNudge?.message ? (
            <div className="scc-chat-proactive-nudge" role="status">
              <p className="scc-chat-proactive-nudge__text">{proactiveNudge.message}</p>
              <button
                type="button"
                className="scc-chat-proactive-nudge__dismiss"
                aria-label={proactiveNudge.dismissAria}
                onClick={handleProactiveNudgeDismiss}
              >
                ×
              </button>
            </div>
          ) : null}
          <ChatFab
            onClick={handleFabOpen}
            accent={orgColors.secondary}
            iconSrc={appearance.fabIconUrl?.trim() || undefined}
            nudgeActive={proactiveNudgeVisible}
          />
        </div>
      )}

      {isOpen && (
        <>
          {!isMobile && !adminMode ? (
            <DraggableChatbotWrapper
              position={position}
              size={size}
              onDragStop={handleDragStop}
              onResizeStop={handleResizeStop}
            >
              <ChatPanel {...panelProps} isMobile={false} />
            </DraggableChatbotWrapper>
          ) : (
            <div
              className={`scc-panel-shell ${
                adminMode
                  ? 'w-full h-full'
                  : isMobile
                    ? `scc-panel-shell--mobile fixed left-0 right-0 w-full${
                        isKeyboardOpen ? ' scc-panel-shell--keyboard-open' : ''
                      }`
                    : 'fixed bottom-6 right-6 w-80 h-[653px]'
              } z-[9999]`}
              style={{
                '--scc-fab-accent': orgColors.primary,
                ...(isMobile && !adminMode && mobileShellLayout
                  ? {
                      top: `${mobileShellLayout.top}px`,
                      bottom: 'auto',
                      height: `${mobileShellLayout.height}px`,
                      maxHeight: isKeyboardOpen
                        ? `${viewportMetrics.visualHeight}px`
                        : `${viewportMetrics.layoutHeight * 0.95}px`,
                      minHeight: isKeyboardOpen
                        ? undefined
                        : `${viewportMetrics.layoutHeight * 0.3}px`,
                    }
                  : {}),
              }}
            >
              <ChatPanel {...panelProps} />
            </div>
          )}
        </>
      )}
    </>
  );
}
