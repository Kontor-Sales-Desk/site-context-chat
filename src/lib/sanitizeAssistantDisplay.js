/** XML-style tool markup some models leak into visible assistant text. */
const TOOL_XML_RE = /<\/?(?:invoke|parameter|tool_call|function_call|antml:[a-z_]+)[^>]*>/gi;

/** Orphan trigger tags when the model drops JSON outside a proper block. */
const ORPHAN_TRIGGER_TAG_RE =
  /\[(?:\/)?(?:DRAFT_EMAIL(?:_BATCH)?_TRIGGER|PROSPECT_BATCH_TRIGGER)\]:?\s*/gi;

const TRAILING_DRAFT_JSON_RE = /(?:\n|^)\s*(?:,\s*)?[\[{]?\s*"prospectId"\s*:/i;

/**
 * Remove tool-call XML and stray trigger tag lines from assistant markdown.
 *
 * @param {string} content
 */
export function stripAssistantLeaks(content) {
  let text = String(content ?? '');
  text = text.replace(TOOL_XML_RE, '');
  text = text.replace(ORPHAN_TRIGGER_TAG_RE, '');
  return text.replace(/\n{3,}/g, '\n\n');
}

/**
 * Drop trailing raw JSON the model pasted instead of a [DRAFT_EMAIL_TRIGGER] block.
 *
 * @param {string} content
 */
export function stripTrailingDraftJson(content) {
  const text = String(content ?? '');
  const matches = [...text.matchAll(new RegExp(TRAILING_DRAFT_JSON_RE.source, 'gi'))];
  if (!matches.length) return text;

  const last = matches[matches.length - 1];
  if (last.index == null || last.index < 20) return text;

  const tail = text.slice(last.index);
  if (!/"subject"\s*:/i.test(tail) || !/"body"\s*:/i.test(tail)) return text;

  return text
    .slice(0, last.index)
    .trimEnd()
    .replace(/[,\s]+$/, '');
}

/**
 * @param {string} content
 */
export function sanitizeAssistantDisplay(content) {
  return stripTrailingDraftJson(stripAssistantLeaks(content)).trim();
}
