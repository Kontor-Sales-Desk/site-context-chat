import type { ReactNode, CSSProperties } from 'react';

export type SiteChatAppearance = {
  primary?: string;
  primaryDark?: string;
  secondary?: string;
  accent?: string;
  welcomeMessage?: string;
  placeholder?: string;
  /** Public image URL for the visitor chat FAB. Empty/absent → default bubble icon. */
  fabIconUrl?: string;
};

export type ChatbotProviderProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  siteId?: string;
  children: ReactNode;
};

export type ChatbotContextValue = {
  openChat: () => void;
  openChatWithMessage: (message: string) => void;
  closeChat: () => void;
  isChatOpen: boolean;
  pendingChatMessage: string | null;
  takePendingChatMessage: () => string | null;
  [key: string]: unknown;
};

export function ChatbotProvider(props: ChatbotProviderProps): JSX.Element;
export function useChatbot(): ChatbotContextValue;
export function useChatbotOptional(): ChatbotContextValue | null;
export function ChatBubbleIcon(props: { className?: string; style?: CSSProperties }): JSX.Element;
export function invokeSiteChatAdmin(
  supabase: import('@supabase/supabase-js').SupabaseClient,
  adminSecret: string,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>>;
export function invokeSiteChat(
  supabase: import('@supabase/supabase-js').SupabaseClient,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>>;
export function setActingAgentId(id: string): void;
export function getActingAgentId(): string;
export function actingAgentHeaders(): Record<string, string>;
export function fetchSiteConfig(
  supabase: import('@supabase/supabase-js').SupabaseClient,
  siteId: string,
): Promise<Record<string, unknown>>;
export function fetchChatHistory(
  supabase: import('@supabase/supabase-js').SupabaseClient,
  siteId: string,
  sessionId: string,
): Promise<Record<string, unknown>>;
export function sendChatMessage(
  supabaseUrl: string,
  supabaseAnonKey: string,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>>;
export function streamChatMessage(
  supabaseUrl: string,
  supabaseAnonKey: string,
  payload: Record<string, unknown> & {
    onDelta?: (text: string) => void;
  },
): Promise<void>;
export function submitChatInquiry(
  supabaseUrl: string,
  supabaseAnonKey: string,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>>;
export function submitShopProductInquiry(
  supabaseUrl: string,
  supabaseAnonKey: string,
  payload: {
    siteId: string;
    inquiry: {
      email: string;
      name?: string;
      siteUrl?: string;
      message?: string;
      productId: string;
      intent: string;
    };
    routeContext?: { pathname?: string } | null;
  },
): Promise<Record<string, unknown>>;
export function submitContactPageInquiry(
  supabaseUrl: string,
  supabaseAnonKey: string,
  payload: {
    siteId: string;
    inquiry: {
      name: string;
      email: string;
      message: string;
    };
    routeContext?: { pathname?: string } | null;
  },
): Promise<Record<string, unknown>>;
export function parseContactFormTrigger(content: string): {
  displayContent: string;
  draftMessage: string | null;
};
export function createSessionId(): string;
export function getStoredSessionId(siteId: string): string | null;
export function storeSessionId(siteId: string, sessionId: string): void;
