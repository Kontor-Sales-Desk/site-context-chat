import type { CSSProperties } from 'react';

export type SiteChatAiPrivacyNotice = {
  bodyBeforeLink: string;
  linkLabel: string;
  linkHref: string;
  dismissAria: string;
};

export type SiteChatProactiveNudge = {
  enabled: boolean;
  consentReady: boolean;
  delayMs?: number;
  message: string;
  dismissAria: string;
};

export type SiteChatWidgetProps = {
  adminMode?: boolean;
  routePath?: string;
  /** Hide the launcher FAB while this element is visible (e.g. `#hero`). */
  hideFabWhenSelector?: string;
  /** Dismissable per-session AI / privacy notice shown inside the chat panel. */
  aiPrivacyNotice?: SiteChatAiPrivacyNotice;
  /** Optional timed hint near the FAB after cookie choice (session storage only). */
  proactiveNudge?: SiteChatProactiveNudge;
  /** Render inside the container (always open, no close button), with an undock button to float it. */
  inline?: boolean;
  /** "Keep the chat on every page" switch shown in the floating window; the host acts on it. */
  keepOnPages?: SiteChatKeepOnPages;
};

export type SiteChatKeepOnPages = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function SiteChatWidget(props: SiteChatWidgetProps): JSX.Element;
export const ChatWidget: typeof SiteChatWidget;
export function DraggableChatbotWrapper(props: Record<string, unknown>): JSX.Element;
export function ChatPanel(props: Record<string, unknown>): JSX.Element;
export function ChatFab(props: {
  onClick: () => void;
  accent?: string;
  label?: string;
  iconSrc?: string;
  nudgeActive?: boolean;
  fabVariant?: 'default' | 'pipeline';
  showOrbit?: boolean;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  draggable?: boolean;
  zIndex?: number;
}): JSX.Element;
