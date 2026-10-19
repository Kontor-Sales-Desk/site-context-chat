import { extractJsonArray, extractJsonObject, locateTriggerBlock, parseTriggerJson } from './triggerBlockUtils.js';
import { sanitizeAssistantDisplay } from './sanitizeAssistantDisplay.js';

const TAG = 'DRAFT_EMAIL_TRIGGER';
const BATCH_TAG = 'DRAFT_EMAIL_BATCH_TRIGGER';

/**
 * @typedef {{ prospectId: string, subject: string, body: string, to?: string }} DraftEmailProposal
 */

/**
 * @param {Record<string, unknown> | null} parsed
 * @returns {DraftEmailProposal | null}
 */
function normalizeDraftProposal(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  const prospectId = parsed.prospectId ?? parsed.prospect_id;
  if (!prospectId || !parsed.subject || !parsed.body) return null;
  return {
    prospectId: String(prospectId),
    subject: String(parsed.subject),
    body: String(parsed.body),
    to: parsed.to ? String(parsed.to) : undefined,
  };
}

/**
 * @param {string} jsonText
 * @returns {DraftEmailProposal[]}
 */
function parseDraftProposalsFromJsonText(jsonText) {
  const raw = String(jsonText ?? '').trim();
  if (!raw) return [];

  const arrayText = raw.startsWith('[') ? raw : extractJsonArray(raw);
  if (arrayText) {
    try {
      const parsed = JSON.parse(arrayText);
      if (Array.isArray(parsed)) {
        return parsed.map((row) => normalizeDraftProposal(row)).filter(Boolean);
      }
    } catch {
      /* fall through */
    }
  }

  /** @type {DraftEmailProposal[]} */
  const proposals = [];
  let cursor = 0;
  const normalized = raw.replace(/^\[?\s*/, '').replace(/\]?\s*$/, '');
  while (cursor < normalized.length) {
    const slice = normalized.slice(cursor);
    const jsonObj = extractJsonObject(slice);
    if (!jsonObj) break;
    const proposal = normalizeDraftProposal(parseTriggerJson(jsonObj));
    if (proposal) proposals.push(proposal);
    cursor += slice.indexOf(jsonObj) + jsonObj.length;
    const rest = normalized.slice(cursor).trimStart();
    if (rest.startsWith(',')) {
      cursor += normalized.slice(cursor).length - rest.length + 1;
      continue;
    }
    break;
  }
  if (proposals.length) return proposals;

  const single = normalizeDraftProposal(parseTriggerJson(raw));
  return single ? [single] : [];
}

/**
 * Salvage one or more draft objects leaked without trigger tags.
 *
 * @param {string} content
 * @returns {{ proposals: DraftEmailProposal[], strip: string }}
 */
function salvageTrailingDraftProposals(content) {
  const marker = /(?:\n|^)\s*(?:,\s*)?[\[{]?\s*"prospectId"\s*:/i;
  const match = content.match(marker);
  if (!match || match.index == null || match.index < 20) {
    return { proposals: [], strip: '' };
  }

  const tail = content.slice(match.index);
  const proposals = parseDraftProposalsFromJsonText(tail);
  if (!proposals.length) {
    return { proposals: [], strip: '' };
  }

  return {
    proposals,
    strip: content.slice(match.index),
  };
}

/**
 * @param {string} content
 * @param {string} tag
 */
function parseTaggedDraftBlock(content, tag) {
  const located = locateTriggerBlock(content, tag);
  if (!located) return null;

  const proposals = located.orphan ? [] : parseDraftProposalsFromJsonText(located.jsonText);
  return {
    proposals,
    strip: located.strip,
  };
}

/**
 * @param {string} content
 * @returns {{
 *   displayContent: string,
 *   draftProposal: DraftEmailProposal | null,
 *   draftProposals: DraftEmailProposal[],
 * }}
 */
export function parseDraftEmailTrigger(content) {
  let working = String(content ?? '');
  /** @type {DraftEmailProposal[]} */
  const proposals = [];
  const strips = [];

  for (const tag of [BATCH_TAG, TAG]) {
    const block = parseTaggedDraftBlock(working, tag);
    if (!block) continue;
    if (block.proposals.length) proposals.push(...block.proposals);
    strips.push(block.strip);
    working = working.replace(block.strip, '');
  }

  const salvaged = salvageTrailingDraftProposals(working);
  if (salvaged.proposals.length) {
    proposals.push(...salvaged.proposals);
    strips.push(salvaged.strip);
    working = working.replace(salvaged.strip, '');
  }

  const unique = [];
  const seen = new Set();
  for (const proposal of proposals) {
    const key = `${proposal.prospectId}:${proposal.subject}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(proposal);
  }

  const displayContent = sanitizeAssistantDisplay(working);

  return {
    displayContent,
    draftProposal: unique[0] ?? null,
    draftProposals: unique,
  };
}
