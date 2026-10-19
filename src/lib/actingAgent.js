// Client-side acting-agent singleton for multi-agent attribution.
//
// Set once at login (and on switch-agent / logout) by the app; read here when
// building admin request headers so the `x-acting-agent` header rides alongside
// `x-admin-secret` WITHOUT threading an agentId param through every call site.
// This is the single lever that keeps the transport change small.

let actingAgentId = '';

/** Set the active agent id for the session (empty string clears it). */
export function setActingAgentId(id) {
  actingAgentId = typeof id === 'string' ? id.trim() : '';
}

/** Current acting agent id, or '' when none. */
export function getActingAgentId() {
  return actingAgentId;
}

/**
 * Header map to spread into admin requests. Empty when no agent is active, so
 * unattributed requests send no header at all.
 */
export function actingAgentHeaders() {
  return actingAgentId ? { 'x-acting-agent': actingAgentId } : {};
}
