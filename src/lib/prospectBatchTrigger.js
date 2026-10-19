import { locateTriggerBlock, parseTriggerJson } from './triggerBlockUtils.js';

const TAG = 'PROSPECT_BATCH_TRIGGER';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value) {
  return UUID_RE.test(String(value ?? '').trim());
}

/** Normalize prospect id list from canonical or legacy agent JSON shapes. */
function normalizeProspectIds(parsed) {
  if (!parsed || typeof parsed !== 'object') return [];

  const flat = parsed.prospectIds ?? parsed.prospect_ids ?? parsed.ids;
  if (Array.isArray(flat) && flat.length) {
    return flat.map((id) => String(id).trim()).filter(isUuid);
  }

  const rows = parsed.prospects;
  if (Array.isArray(rows) && rows.length) {
    return rows
      .map((row) => {
        if (typeof row === 'string') return row.trim();
        if (row && typeof row === 'object') {
          return String(row.id ?? row.prospectId ?? row.prospect_id ?? '').trim();
        }
        return '';
      })
      .filter(isUuid);
  }

  return [];
}

/**
 * @param {string} content
 * @returns {{
 *   displayContent: string,
 *   prospectBatch: { city?: string, market?: string, prospectIds: string[] } | null,
 * }}
 */
export function parseProspectBatchTrigger(content) {
  const located = locateTriggerBlock(content, TAG);
  if (!located) {
    return { displayContent: content, prospectBatch: null };
  }

  let prospectBatch = null;
  if (!located.orphan) {
    const parsed = parseTriggerJson(located.jsonText);
    const prospectIds = normalizeProspectIds(parsed);
    if (prospectIds.length > 0) {
      prospectBatch = {
        city: parsed?.city ? String(parsed.city) : undefined,
        market: parsed?.market ? String(parsed.market) : undefined,
        prospectIds,
      };
    }
  }

  const displayContent = content.replace(located.strip, '').trim();
  return { displayContent, prospectBatch };
}
