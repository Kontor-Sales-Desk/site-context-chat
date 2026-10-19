/** Session storage for proactive chat hint timing (essential — not analytics). */
export const VISIT_STARTED_KEY = 'techlads-visit-started-at';
export const NUDGE_DISMISSED_KEY = 'techlads-chat-proactive-nudge-dismissed';
export const CHAT_ENGAGED_KEY = 'techlads-chat-engaged';

export const DEFAULT_NUDGE_DELAY_MS = 45_000;

export function ensureVisitStartedAt() {
  if (typeof window === 'undefined') return Date.now();
  const existing = sessionStorage.getItem(VISIT_STARTED_KEY);
  if (existing) {
    const parsed = Number.parseInt(existing, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  const now = Date.now();
  sessionStorage.setItem(VISIT_STARTED_KEY, String(now));
  return now;
}

export function isProactiveNudgeBlocked() {
  if (typeof window === 'undefined') return true;
  return (
    sessionStorage.getItem(NUDGE_DISMISSED_KEY) === '1' ||
    sessionStorage.getItem(CHAT_ENGAGED_KEY) === '1'
  );
}

export function markProactiveNudgeDismissed() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(NUDGE_DISMISSED_KEY, '1');
}

export function markChatEngaged() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(CHAT_ENGAGED_KEY, '1');
}
