import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaClock,
  FaCompressAlt,
  FaExternalLinkAlt,
  FaFileAlt,
  FaImage,
  FaPaperPlane,
  FaBrain,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaTrash,
  FaMicrophone,
  FaPhoneSlash,
  FaStop,
} from 'react-icons/fa';
import ChatBubbleIcon from './ChatBubbleIcon';
import ChatMarkdown from './ChatMarkdown';
import ContactFormModal from './ContactFormModal';
import LoadingSpinner from './LoadingSpinner';
import { parseAssistantMessageTriggers } from '../lib/assistantMessageTriggers';
import {
  CHAT_IMAGE_UPLOAD_LIMITS,
  extractImageFilesFromClipboard,
  prepareChatImageFile,
} from '../lib/chatImageUpload';

export default function ChatPanel({
  orgColors,
  chatbotName,
  messages,
  loading,
  inputMessage,
  setInputMessage,
  onSendMessage,
  onNewChat,
  onClose,
  adminMode,
  showNewChat,
  isMobile,
  /** `grip` = drag lines (default); `mac-close` = red stoplight; `traffic-lights` = full macOS chrome (desktop). */
  collapseControl = 'grip',
  onWindowMinimize,
  onWindowFullscreen,
  inputRef,
  messagesEndRef,
  onInputFocus,
  onInputBlur,
  onMobileResizeStart,
  welcomeMessage,
  placeholder,
  inquiryModal,
  onOpenSessionHistory,
  sessionHistoryModal,
  outreachEmailModal,
  outreachLinkedInModal,
  emailSendMode,
  onEmailSendModeChange,
  emailDrafts,
  emailDraftsLoading,
  onRefreshEmailDrafts,
  onSelectEmailDraft,
  onDismissEmailDraft,
  onSaveProposedEmailDraft,
  onQuickPrompt,
  activityStatus,
  salesAgentModel,
  salesAgentModelGroups,
  onSalesAgentModelChange,
  salesAgentModelSaving,
  /** The assistant's effort ('' = model default) + the levels its model has: [{ value, label }]. */
  salesAgentEffort = '',
  salesAgentEffortOptions,
  /** Why effort can't be set right now (shown instead of the levels); '' when it can. */
  salesAgentEffortNote = '',
  /** Shown under the levels when a heavy level is picked. */
  salesAgentEffortWarning = '',
  onSalesAgentEffortChange,
  aiPrivacyNotice,
  showAiPrivacyNotice,
  onDismissAiPrivacyNotice,
  enableImageUpload = false,
  voiceEnabled = false,
  voiceState = 'idle',
  onStartVoice,
  onStopVoice,
  onStopGeneration,
  /** Sits inside the page (SiteChatWidget inline): no close button. */
  inline = false,
  /** Shown while inline: pop the chat out into the floating window. */
  onUndock,
  /** Shown in the floating window when it came from an inline chat: put it back in the page. */
  onDock,
  /** Optional "keep the chat on every page" switch: { label, checked, onChange(checked) }. */
  keepOnPages,
}) {
  const isStreaming = messages.some((message) => message.streaming);
  const streamingMessageId = messages.find((message) => message.streaming)?.id;
  const showLoadingSpinner = loading && !isStreaming;
  const isBusy = loading || isStreaming;
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const [savedDraftProposalIds, setSavedDraftProposalIds] = useState(() => new Set());
  const [savingDraftProposalId, setSavingDraftProposalId] = useState(null);
  const [draftProposalErrors, setDraftProposalErrors] = useState({});
  const draftsMenuRef = useRef(null);
  const agentMenuRef = useRef(null);
  const showDraftsMenu = Boolean(onRefreshEmailDrafts && onSelectEmailDraft);
  const showAgentMenu = Boolean(
    salesAgentModel && salesAgentModelGroups?.length && onSalesAgentModelChange,
  );
  const showDraftQuickActions = Boolean(onSaveProposedEmailDraft);
  const showProspectQuickActions = Boolean(onQuickPrompt);
  const composerInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const panelRef = useRef(null);
  const [pendingImages, setPendingImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const canSend = Boolean(inputMessage.trim() || pendingImages.length);

  const handleSaveProposedDraft = async (messageId, draftProposal) => {
    if (!onSaveProposedEmailDraft || savingDraftProposalId) return;
    setSavingDraftProposalId(messageId);
    setDraftProposalErrors((current) => ({ ...current, [messageId]: null }));
    try {
      await onSaveProposedEmailDraft(draftProposal);
      setSavedDraftProposalIds((current) => new Set(current).add(messageId));
    } catch (error) {
      setDraftProposalErrors((current) => ({
        ...current,
        [messageId]: error instanceof Error ? error.message : 'Failed to save draft',
      }));
    } finally {
      setSavingDraftProposalId(null);
    }
  };

  const handleSaveAllProposedDrafts = async (messageId, draftProposals) => {
    if (!onSaveProposedEmailDraft || savingDraftProposalId || !draftProposals?.length) return;
    setSavingDraftProposalId(messageId);
    setDraftProposalErrors((current) => ({ ...current, [messageId]: null }));
    try {
      for (const proposal of draftProposals) {
        await onSaveProposedEmailDraft(proposal);
      }
      setSavedDraftProposalIds((current) => new Set(current).add(messageId));
    } catch (error) {
      setDraftProposalErrors((current) => ({
        ...current,
        [messageId]: error instanceof Error ? error.message : 'Failed to save drafts',
      }));
    } finally {
      setSavingDraftProposalId(null);
    }
  };

  const adjustComposerHeight = useCallback(() => {
    const el = composerInputRef.current;
    if (!el) return;
    // Collapse first so scrollHeight reflects content, not the previous height.
    el.style.height = '0px';
    const maxPx = 160;
    const next = Math.min(Math.max(el.scrollHeight, 1), maxPx);
    el.style.height = `${next}px`;
  }, []);

  useEffect(() => {
    adjustComposerHeight();
  }, [inputMessage, adjustComposerHeight]);

  const addImageFiles = useCallback(async (files) => {
    if (!enableImageUpload || !files?.length) return [];
    setImageUploadError(null);
    setImageUploading(true);
    try {
      const next = [];
      const available = CHAT_IMAGE_UPLOAD_LIMITS.maxImages - pendingImages.length;
      for (const file of files) {
        if (next.length >= available) break;
        const prepared = await prepareChatImageFile(file);
        next.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          media_type: prepared.media_type,
          data: prepared.data,
          previewUrl: prepared.previewUrl,
        });
      }
      if (!next.length) return [];

      setPendingImages((current) =>
        [...current, ...next].slice(0, CHAT_IMAGE_UPLOAD_LIMITS.maxImages),
      );
      return next;
    } catch (error) {
      setImageUploadError(error instanceof Error ? error.message : 'Failed to add image');
      return [];
    } finally {
      setImageUploading(false);
    }
  }, [enableImageUpload, pendingImages.length]);

  const removePendingImage = useCallback((id) => {
    setPendingImages((current) => current.filter((image) => image.id !== id));
  }, []);

  const handleSend = useCallback(() => {
    if (!canSend || loading) return;
    const images = pendingImages.map(({ media_type, data }) => ({ media_type, data }));
    const imagePreviews = pendingImages.map((image) => image.previewUrl);
    onSendMessage(
      enableImageUpload && images.length
        ? { images, imagePreviews }
        : undefined,
    );
    setPendingImages([]);
    setImageUploadError(null);
  }, [canSend, enableImageUpload, loading, onSendMessage, pendingImages]);

  useEffect(() => {
    if (!enableImageUpload) return undefined;
    const onPaste = (event) => {
      const files = extractImageFilesFromClipboard(event.clipboardData);
      if (!files.length) return;
      event.preventDefault();
      void addImageFiles(files);
    };
    const panel = panelRef.current;
    panel?.addEventListener('paste', onPaste);
    return () => panel?.removeEventListener('paste', onPaste);
  }, [addImageFiles, enableImageUpload]);

  const extractDroppedImageFiles = useCallback((dataTransfer) => {
    if (!dataTransfer) return [];
    const fromList = Array.from(dataTransfer.files ?? []).filter((file) =>
      file.type.startsWith('image/'),
    );
    if (fromList.length) return fromList;
    return Array.from(dataTransfer.items ?? [])
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter(Boolean);
  }, []);

  const handlePanelDragEnter = useCallback(
    (event) => {
      if (!enableImageUpload) return;
      if (![...event.dataTransfer?.types ?? []].includes('Files')) return;
      event.preventDefault();
      setDragOver(true);
    },
    [enableImageUpload],
  );

  const handlePanelDragOver = useCallback(
    (event) => {
      if (!enableImageUpload) return;
      if (![...event.dataTransfer?.types ?? []].includes('Files')) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      setDragOver(true);
    },
    [enableImageUpload],
  );

  const handlePanelDragLeave = useCallback((event) => {
    if (!panelRef.current?.contains(event.relatedTarget)) {
      setDragOver(false);
    }
  }, []);

  const handlePanelDrop = useCallback(
    (event) => {
      if (!enableImageUpload) return;
      event.preventDefault();
      event.stopPropagation();
      setDragOver(false);
      const files = extractDroppedImageFiles(event.dataTransfer);
      if (!files.length) return;
      void addImageFiles(files);
    },
    [addImageFiles, enableImageUpload, extractDroppedImageFiles],
  );

  // Capture drops on the full draggable shell (resize handles, edges), not just the chat panel body.
  useEffect(() => {
    if (!enableImageUpload) return undefined;
    const panel = panelRef.current;
    const shell = panel?.closest('.scc-panel-shell');
    if (!shell) return undefined;

    const onShellDragOver = (event) => {
      handlePanelDragOver(event);
    };

    const onShellDrop = (event) => {
      handlePanelDrop(event);
    };

    shell.addEventListener('dragover', onShellDragOver, true);
    shell.addEventListener('drop', onShellDrop, true);
    return () => {
      shell.removeEventListener('dragover', onShellDragOver, true);
      shell.removeEventListener('drop', onShellDrop, true);
    };
  }, [enableImageUpload, handlePanelDragOver, handlePanelDrop]);

  useEffect(() => {
    if (!draftsOpen && !agentMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (draftsOpen && !draftsMenuRef.current?.contains(event.target)) {
        setDraftsOpen(false);
      }
      if (agentMenuOpen && !agentMenuRef.current?.contains(event.target)) {
        setAgentMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [agentMenuOpen, draftsOpen]);

  const toggleAgentMenu = (event) => {
    event.stopPropagation();
    setAgentMenuOpen((current) => !current);
  };

  const toggleDraftsMenu = (event) => {
    event.stopPropagation();
    const next = !draftsOpen;
    setDraftsOpen(next);
    if (next) onRefreshEmailDrafts?.();
  };

  const formatDraftWhen = (iso) => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div
      ref={panelRef}
      className={`scc-chat-panel${dragOver ? ' scc-chat-panel--drop-target' : ''}`}
      style={{ '--scc-fab-accent': orgColors.primary }}
      data-sales-desktop-hit=""
      onDragEnter={handlePanelDragEnter}
      onDragOver={handlePanelDragOver}
      onDragLeave={handlePanelDragLeave}
      onDrop={handlePanelDrop}
    >
      <div
        className={`scc-chat-panel__header chatbot-header-drag-handle${
          isMobile ? ' scc-chat-panel__header--mobile' : ''
        }${collapseControl === 'traffic-lights' ? ' scc-sales-workspace-panel__chrome' : ''}`}
        role="toolbar"
        aria-label={chatbotName || 'Assistant'}
        onTouchStart={onMobileResizeStart}
        onMouseDown={isMobile && onMobileResizeStart ? onMobileResizeStart : undefined}
        title={isMobile && onMobileResizeStart ? 'Drag to resize' : 'Drag to move'}
      >
        <div className="scc-chat-panel__header-main">
          {collapseControl === 'traffic-lights' ? (
            <div className="scc-sales-traffic-lights chatbot-header-no-drag">
              <button
                type="button"
                className="scc-traffic scc-traffic--close"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.();
                }}
                aria-label="Collapse assistant"
                title="Collapse"
              />
              {onWindowMinimize ? (
                <button
                  type="button"
                  className="scc-traffic scc-traffic--minimize"
                  onClick={(e) => {
                    e.stopPropagation();
                    onWindowMinimize();
                  }}
                  aria-label="Minimize to Dock"
                />
              ) : (
                <span className="scc-traffic scc-traffic--minimize scc-traffic--inactive" aria-hidden />
              )}
              {onWindowFullscreen ? (
                <button
                  type="button"
                  className="scc-traffic scc-traffic--maximize"
                  onClick={(e) => {
                    e.stopPropagation();
                    onWindowFullscreen();
                  }}
                  aria-label="Enter fullscreen"
                />
              ) : (
                <span className="scc-traffic scc-traffic--maximize scc-traffic--inactive" aria-hidden />
              )}
            </div>
          ) : collapseControl === 'mac-close' ? (
            <button
              type="button"
              className="scc-chat-panel__mac-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              aria-label="Collapse assistant"
              title="Collapse"
            />
          ) : collapseControl !== 'none' ? (
            <div className="scc-chat-panel__grip" aria-hidden>
              <span />
              <span />
            </div>
          ) : null}
          {emailSendMode && onEmailSendModeChange ? (
            <div
              className="scc-chat-panel__email-mode"
              role="group"
              aria-label="Outreach send mode"
            >
              <button
                type="button"
                className={`scc-chat-panel__email-mode-btn${
                  emailSendMode === 'review' ? ' scc-chat-panel__email-mode-btn--active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEmailSendModeChange('review');
                }}
                aria-pressed={emailSendMode === 'review'}
              >
                Review
              </button>
              <button
                type="button"
                className={`scc-chat-panel__email-mode-btn scc-chat-panel__email-mode-btn--auto${
                  emailSendMode === 'auto' ? ' scc-chat-panel__email-mode-btn--active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEmailSendModeChange('auto');
                }}
                aria-pressed={emailSendMode === 'auto'}
              >
                Auto
              </button>
            </div>
          ) : null}
        </div>
        <div className="scc-chat-panel__header-actions">
          {showAgentMenu ? (
            <div
              className="scc-chat-panel__agent"
              ref={agentMenuRef}
              style={{ '--scc-agent-accent': orgColors.primary ?? '#5DA399' }}
            >
              <button
                type="button"
                onClick={toggleAgentMenu}
                className={`scc-chat-panel__icon-btn scc-chat-panel__icon-btn--agent${
                  agentMenuOpen ? ' scc-chat-panel__icon-btn--agent-open' : ''
                }`}
                style={{ '--scc-agent-accent': orgColors.primary ?? '#5DA399' }}
                title="Switch agent model"
                aria-label="Switch agent model"
                aria-expanded={agentMenuOpen}
                aria-haspopup="menu"
                disabled={salesAgentModelSaving}
              >
                {salesAgentModelSaving ? (
                  <FaSpinner className="scc-chat-panel__header-icon animate-spin" aria-hidden />
                ) : (
                  <FaBrain className="scc-chat-panel__header-icon" />
                )}
              </button>
              {agentMenuOpen ? (
                <div className="scc-chat-panel__agent-menu" role="menu" aria-label="Agent models">
                  <div className="scc-chat-panel__agent-menu-header">
                    <span>Agent</span>
                    {salesAgentModelSaving ? (
                      <FaSpinner className="h-3 w-3 animate-spin" aria-hidden />
                    ) : null}
                  </div>
                  {onSalesAgentEffortChange && salesAgentEffortOptions?.length ? (
                    <div className="scc-chat-panel__agent-effort" role="group" aria-label="Effort">
                      <div className="scc-chat-panel__agent-group-label">Effort</div>
                      {salesAgentEffortNote ? (
                        <p className="scc-chat-panel__agent-effort-note">{salesAgentEffortNote}</p>
                      ) : (
                        <div className="scc-chat-panel__agent-effort-levels">
                          {salesAgentEffortOptions.map((option) => {
                            const isActive = option.value === salesAgentEffort;
                            return (
                              <button
                                key={option.value || 'default'}
                                type="button"
                                aria-pressed={isActive}
                                className={`scc-chat-panel__agent-effort-level${
                                  isActive ? ' scc-chat-panel__agent-effort-level--active' : ''
                                }`}
                                disabled={salesAgentModelSaving || isActive}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (!isActive) onSalesAgentEffortChange(option.value);
                                }}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {!salesAgentEffortNote && salesAgentEffortWarning ? (
                        <p className="scc-chat-panel__agent-effort-note">{salesAgentEffortWarning}</p>
                      ) : null}
                    </div>
                  ) : null}
                  {salesAgentModelGroups.map((group) => (
                    <div key={group.label} className="scc-chat-panel__agent-group" role="none">
                      <div className="scc-chat-panel__agent-group-label">{group.label}</div>
                      {group.options.map((option) => {
                        const isActive = option.value === salesAgentModel;
                        const isDisabled = Boolean(option.disabled);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isActive}
                            aria-disabled={isDisabled}
                            className={`scc-chat-panel__agent-item${
                              isActive ? ' scc-chat-panel__agent-item--active' : ''
                            }${isDisabled ? ' scc-chat-panel__agent-item--locked' : ''}`}
                            disabled={salesAgentModelSaving || isActive || isDisabled}
                            onClick={(event) => {
                              event.stopPropagation();
                              if (isActive || isDisabled) return;
                              onSalesAgentModelChange(option.value);
                              setAgentMenuOpen(false);
                            }}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {showDraftsMenu ? (
            <div className="scc-chat-panel__drafts" ref={draftsMenuRef}>
              <button
                type="button"
                onClick={toggleDraftsMenu}
                className={`scc-chat-panel__icon-btn scc-chat-panel__icon-btn--drafts${
                  draftsOpen ? ' scc-chat-panel__icon-btn--drafts-open' : ''
                }`}
                style={{ '--scc-history-accent': orgColors.secondary ?? '#F29F05' }}
                title="Outreach drafts"
                aria-label="Outreach drafts"
                aria-expanded={draftsOpen}
                aria-haspopup="menu"
              >
                <FaFileAlt className="scc-chat-panel__header-icon" />
                {emailDrafts?.length ? (
                  <span className="scc-chat-panel__drafts-badge" aria-hidden>
                    {emailDrafts.length > 9 ? '9+' : emailDrafts.length}
                  </span>
                ) : null}
              </button>
              {draftsOpen ? (
                <div className="scc-chat-panel__drafts-menu" role="menu" aria-label="Saved outreach drafts">
                  <div className="scc-chat-panel__drafts-menu-header">
                    <span>Drafts</span>
                    {emailDraftsLoading ? <FaSpinner className="h-3 w-3 animate-spin" aria-hidden /> : null}
                  </div>
                  {emailDraftsLoading && !emailDrafts?.length ? (
                    <p className="scc-chat-panel__drafts-empty">Loading drafts…</p>
                  ) : null}
                  {!emailDraftsLoading && !emailDrafts?.length ? (
                    <p className="scc-chat-panel__drafts-empty">No saved drafts yet.</p>
                  ) : null}
                  {(emailDrafts ?? []).map((draft) => (
                    <div key={draft.id} className="scc-chat-panel__drafts-item" role="none">
                      <button
                        type="button"
                        role="menuitem"
                        className="scc-chat-panel__drafts-item-main"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelectEmailDraft?.(draft);
                          setDraftsOpen(false);
                        }}
                      >
                        <span className="scc-chat-panel__drafts-company">
                          {draft.company_name || 'Unknown company'}
                        </span>
                        <span className="scc-chat-panel__drafts-subject">
                          {draft.channel === 'linkedin' ? `LinkedIn · ${draft.subject}` : draft.subject}
                        </span>
                        <span className="scc-chat-panel__drafts-when">{formatDraftWhen(draft.created_at)}</span>
                      </button>
                      {onDismissEmailDraft ? (
                        <button
                          type="button"
                          className="scc-chat-panel__drafts-dismiss"
                          aria-label={`Delete draft for ${draft.company_name || 'prospect'}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            onDismissEmailDraft(draft.id);
                          }}
                        >
                          <FaTrash className="h-3 w-3" aria-hidden />
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {onOpenSessionHistory ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSessionHistory();
              }}
              className="scc-chat-panel__icon-btn scc-chat-panel__icon-btn--history"
              style={{ '--scc-history-accent': orgColors.secondary ?? '#F29F05' }}
              title="Session history"
              aria-label="Session history"
            >
              <FaClock className="scc-chat-panel__header-icon" />
            </button>
          ) : null}
          {showNewChat && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNewChat();
              }}
              className="scc-chat-panel__icon-btn"
              title="Start new chat"
            >
              <FaPlus className="scc-chat-panel__header-icon" />
            </button>
          )}
          {onUndock ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUndock();
              }}
              className="scc-chat-panel__icon-btn"
              title="Open in a window and keep browsing"
              aria-label="Open the chat in a window"
            >
              <FaExternalLinkAlt className="scc-chat-panel__header-icon" />
            </button>
          ) : null}
          {onDock ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDock();
              }}
              className="scc-chat-panel__icon-btn"
              title="Put the chat back in the page"
              aria-label="Put the chat back in the page"
            >
              <FaCompressAlt className="scc-chat-panel__header-icon" />
            </button>
          ) : null}
          {!adminMode && !inline && collapseControl !== 'mac-close' && collapseControl !== 'traffic-lights' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="scc-chat-panel__icon-btn"
              aria-label="Close chat"
            >
              <FaTimes className="scc-chat-panel__header-icon" />
            </button>
          )}
        </div>
      </div>

      {keepOnPages ? (
        <label className="scc-chat-panel__keep">
          <input
            type="checkbox"
            checked={Boolean(keepOnPages.checked)}
            onChange={(e) => keepOnPages.onChange?.(e.target.checked)}
          />
          <span>{keepOnPages.label || 'Keep the chat on every page'}</span>
        </label>
      ) : null}

      <div
        className="scc-chat-panel__messages"
        onDragOver={handlePanelDragOver}
        onDrop={handlePanelDrop}
        onWheel={(e) => {
          const container = e.currentTarget;
          const canScrollUp = container.scrollTop > 0;
          const canScrollDown =
            container.scrollTop < container.scrollHeight - container.clientHeight;
          if ((canScrollUp && e.deltaY < 0) || (canScrollDown && e.deltaY > 0)) {
            e.stopPropagation();
          }
        }}
      >
        {showAiPrivacyNotice && aiPrivacyNotice ? (
          <div className="scc-chat-panel__ai-notice" role="note">
            <p className="scc-chat-panel__ai-notice-text">
              {aiPrivacyNotice.bodyBeforeLink}{' '}
              <a
                href={aiPrivacyNotice.linkHref}
                className="scc-chat-panel__ai-notice-link"
              >
                {aiPrivacyNotice.linkLabel}
              </a>
              .
            </p>
            <button
              type="button"
              className="scc-chat-panel__ai-notice-dismiss"
              onClick={onDismissAiPrivacyNotice}
              aria-label={aiPrivacyNotice.dismissAria}
            >
              <FaTimes className="h-3 w-3" aria-hidden />
            </button>
          </div>
        ) : null}
        {messages.length === 0 ? (
          <div className="scc-chat-panel__welcome">
            <ChatBubbleIcon className="scc-chat-panel__welcome-icon" />
            <p className="scc-chat-panel__welcome-title">Hi, I&apos;m {chatbotName}.</p>
            <p className="scc-chat-panel__welcome-body">{welcomeMessage}</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const triggerParse =
              message.role === 'assistant'
                ? parseAssistantMessageTriggers(message.content, {
                    streaming: Boolean(message.streaming),
                  })
                : {
                    displayContent: message.content,
                    draftProposal: null,
                    draftProposals: [],
                    prospectBatch: null,
                  };
            const draftProposals = triggerParse.draftProposals?.length
              ? triggerParse.draftProposals
              : triggerParse.draftProposal
                ? [triggerParse.draftProposal]
                : [];
            const messageId = message.id ?? `${message.role}-${index}`;
            const draftSaved = savedDraftProposalIds.has(messageId);
            const draftSaving = savingDraftProposalId === messageId;

            return (
            <div
              key={messageId}
              className={`scc-chat-panel__row scc-chat-panel__row--${message.role}`}
            >
              <div className={`scc-chat-panel__bubble scc-chat-panel__bubble--${message.role}`}>
                <div className="scc-chat-panel__bubble-text">
                  {message.role === 'assistant' ? (
                    <>
                      <ChatMarkdown content={triggerParse.displayContent} />
                      {draftProposals.length > 0 && !message.streaming ? (
                        <div className="scc-chat-panel__draft-proposals">
                          {draftProposals.map((draft) => (
                            <article
                              key={`${draft.prospectId}-${draft.subject}`}
                              className="scc-chat-panel__draft-card"
                            >
                              <p className="scc-chat-panel__draft-card-label">Proposed email</p>
                              <p className="scc-chat-panel__draft-card-subject">
                                <strong>Subject:</strong> {draft.subject}
                              </p>
                              <p className="scc-chat-panel__draft-card-body">{draft.body}</p>
                            </article>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {message.imagePreviews?.length ? (
                        <div className="scc-chat-panel__message-images">
                          {message.imagePreviews.map((src) => (
                            <img
                              key={src}
                              src={src}
                              alt="Attached screenshot"
                              className="scc-chat-panel__message-image"
                            />
                          ))}
                        </div>
                      ) : null}
                      {message.content ? <span>{message.content}</span> : null}
                    </>
                  )}
                  {message.streaming ? (
                    <span className="scc-chat-panel__streaming-tail">
                      {activityStatus && message.id === streamingMessageId ? (
                        <span className="scc-chat-panel__activity-status">{activityStatus}</span>
                      ) : null}
                      <span className="scc-chat-panel__cursor">▍</span>
                    </span>
                  ) : null}
                </div>
                {showProspectQuickActions && triggerParse.prospectBatch && !message.streaming ? (
                  <div className="scc-chat-panel__quick-actions">
                    <button
                      type="button"
                      className="scc-chat-panel__quick-action scc-chat-panel__quick-action--primary"
                      style={{ '--scc-agent-accent': orgColors.primary ?? '#5DA399' }}
                      disabled={loading}
                      onClick={() => {
                        const { city, market, prospectIds } = triggerParse.prospectBatch;
                        const place = city || market || 'the same market';
                        const exclude = prospectIds.join(', ');
                        onQuickPrompt(
                          `Find 3 more prospects in ${place} that could benefit from our services. Exclude these prospect ids already in CRM: ${exclude}. search_web → save_prospect for each → list all 3 with ids.`,
                        );
                      }}
                    >
                      Search 3 more
                    </button>
                    <button
                      type="button"
                      className="scc-chat-panel__quick-action"
                      disabled={loading}
                      onClick={() => {
                        const ids = triggerParse.prospectBatch.prospectIds.join(', ');
                        onQuickPrompt(
                          `Draft outreach emails for prospects from this batch (${ids}). For each with contact_email: get_prospect first, then propose tailored copy (review mode — use DRAFT_EMAIL_TRIGGER blocks). Start with the strongest fit; do one at a time unless I say batch.`,
                        );
                      }}
                    >
                      Draft emails
                    </button>
                  </div>
                ) : null}
                {showDraftQuickActions && draftProposals.length > 0 && !message.streaming ? (
                  <div className="scc-chat-panel__quick-actions">
                    <button
                      type="button"
                      className="scc-chat-panel__quick-action scc-chat-panel__quick-action--primary"
                      style={{ '--scc-history-accent': orgColors.secondary ?? '#F29F05' }}
                      disabled={draftSaved || draftSaving}
                      onClick={() =>
                        void (draftProposals.length > 1
                          ? handleSaveAllProposedDrafts(messageId, draftProposals)
                          : handleSaveProposedDraft(messageId, draftProposals[0]))
                      }
                    >
                      {draftSaving ? (
                        <>
                          <FaSpinner className="h-3 w-3 animate-spin" aria-hidden />
                          Saving…
                        </>
                      ) : draftSaved ? (
                        draftProposals.length > 1 ? 'Saved to drafts' : 'Saved to drafts'
                      ) : draftProposals.length > 1 ? (
                        'Add all to drafts'
                      ) : (
                        'Add to drafts'
                      )}
                    </button>
                    <button
                      type="button"
                      className="scc-chat-panel__quick-action"
                      disabled={draftSaving || loading}
                      onClick={() => {
                        const prompt =
                          'Try again. Rewrite the email with a different hook and a slightly shorter body (60–80 words). Keep the same offer and CTA.';
                        if (onQuickPrompt) onQuickPrompt(prompt);
                        else {
                          setInputMessage(prompt);
                          onSendMessage();
                        }
                      }}
                    >
                      Try again
                    </button>
                    <button
                      type="button"
                      className="scc-chat-panel__quick-action"
                      disabled={draftSaving || loading}
                      onClick={() => {
                        const prompt =
                          'Rewrite the email with a different angle (choose one): reservations flow, digital menu UX, or storytelling/photos. Keep it concise and specific.';
                        if (onQuickPrompt) onQuickPrompt(prompt);
                        else {
                          setInputMessage(prompt);
                          onSendMessage();
                        }
                      }}
                    >
                      Change angle
                    </button>
                    {draftProposalErrors[messageId] ? (
                      <p className="scc-chat-panel__draft-proposal-error">
                        {draftProposalErrors[messageId]}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                {message.timestamp && !message.streaming && (
                  <p className="scc-chat-panel__bubble-time">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
            );
          })
        )}

        {activityStatus && !isStreaming ? (
          <div className="scc-chat-panel__row scc-chat-panel__row--assistant">
            <div className="scc-chat-panel__bubble scc-chat-panel__bubble--assistant">
              <div className="scc-chat-panel__bubble-text">
                <span className="scc-chat-panel__activity-status">{activityStatus}</span>
              </div>
            </div>
          </div>
        ) : null}

        {showLoadingSpinner && (
          <div className="scc-chat-panel__row scc-chat-panel__row--assistant">
            <div className="scc-chat-panel__bubble scc-chat-panel__bubble--assistant scc-chat-panel__bubble--typing">
              <LoadingSpinner size="sm" color={orgColors.primary} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div
        ref={inputRef}
        className={`scc-chat-panel__composer${isMobile ? ' scc-chat-panel__composer--mobile' : ''}`}
      >
        {enableImageUpload && pendingImages.length ? (
          <div className="scc-chat-panel__attachment-strip">
            {pendingImages.map((image) => (
              <div key={image.id} className="scc-chat-panel__attachment">
                <img src={image.previewUrl} alt="" className="scc-chat-panel__attachment-thumb" />
                <button
                  type="button"
                  className="scc-chat-panel__attachment-remove"
                  aria-label="Remove image"
                  onClick={() => removePendingImage(image.id)}
                >
                  <FaTimes className="h-3 w-3" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        {imageUploadError ? (
          <p className="scc-chat-panel__attachment-error">{imageUploadError}</p>
        ) : null}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          tabIndex={-1}
          aria-hidden
          className="scc-chat-panel__file-input"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = '';
            void addImageFiles(files);
          }}
        />
        <div className="scc-chat-panel__composer-row">
          {enableImageUpload || voiceEnabled ? (
            <div className="scc-chat-panel__composer-tools">
              {enableImageUpload ? (
                <button
                  type="button"
                  className="scc-chat-panel__composer-icon-btn"
                  aria-label="Attach screenshot"
                  title="Attach image (or paste a screenshot with ⌘V)"
                  disabled={
                    loading || imageUploading || pendingImages.length >= CHAT_IMAGE_UPLOAD_LIMITS.maxImages
                  }
                  onClick={() => imageInputRef.current?.click()}
                >
                  {imageUploading ? (
                    <FaSpinner className="animate-spin" aria-hidden />
                  ) : (
                    <FaImage aria-hidden />
                  )}
                </button>
              ) : null}
              {voiceEnabled ? (
                <button
                  type="button"
                  className={`scc-chat-panel__composer-icon-btn${
                    voiceState === 'connected' ? ' scc-chat-panel__composer-icon-btn--active' : ''
                  }`}
                  onClick={() => {
                    if (voiceState === 'connected' || voiceState === 'connecting') onStopVoice?.();
                    else onStartVoice?.();
                  }}
                  aria-label={
                    voiceState === 'connected' || voiceState === 'connecting'
                      ? 'Hang up voice call'
                      : 'Start voice call'
                  }
                  title={
                    voiceState === 'connected' || voiceState === 'connecting' ? 'Hang up' : 'Voice call'
                  }
                >
                  {voiceState === 'connecting' ? (
                    <FaSpinner className="animate-spin" aria-hidden />
                  ) : voiceState === 'connected' ? (
                    <FaPhoneSlash aria-hidden />
                  ) : (
                    <FaMicrophone aria-hidden />
                  )}
                </button>
              ) : null}
            </div>
          ) : null}
          <textarea
            ref={composerInputRef}
            rows={1}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            disabled={loading}
            className="scc-chat-panel__input scc-chat-panel__input--composer"
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
          <button
            type="button"
            onClick={isBusy && onStopGeneration ? onStopGeneration : handleSend}
            disabled={isBusy ? !onStopGeneration : loading || !canSend}
            className="scc-chat-panel__send"
            aria-label={isBusy && onStopGeneration ? 'Stop generation' : 'Send message'}
            title={isBusy && onStopGeneration ? 'Stop' : 'Send'}
          >
            {isBusy && onStopGeneration ? (
              <FaStop className="h-3.5 w-3.5" aria-hidden />
            ) : loading ? (
              <FaSpinner className="animate-spin h-4 w-4" />
            ) : (
              <FaPaperPlane className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {inquiryModal ? (
        <ContactFormModal
          open={inquiryModal.open}
          draftMessage={inquiryModal.draftMessage}
          onClose={inquiryModal.onClose}
          onSubmit={inquiryModal.onSubmit}
          submitting={inquiryModal.submitting}
          error={inquiryModal.error}
          accent={orgColors.primary}
        />
      ) : null}

      {sessionHistoryModal}
      {outreachEmailModal}
      {outreachLinkedInModal}
    </div>
  );
}
