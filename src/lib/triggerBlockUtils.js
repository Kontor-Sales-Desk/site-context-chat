/** Pull the first balanced `{…}` object from a string (handles nested arrays/objects). */
export function extractJsonObject(text) {
  const start = text.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === '\\') escape = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }
  return null;
}

/** Pull the first balanced `[…]` array from a string. */
export function extractJsonArray(text) {
  const start = text.indexOf('[');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === '\\') escape = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }
  return null;
}

/**
 * Find a tagged trigger block and its JSON payload.
 * Accepts optional colon after the opening tag and a missing closing tag.
 *
 * @param {string} content
 * @param {string} tagName e.g. DRAFT_EMAIL_TRIGGER
 */
export function locateTriggerBlock(content, tagName) {
  const closedRe = new RegExp(
    `\\[${tagName}\\]:?\\s*([\\s\\S]*?)\\s*\\[\\/${tagName}\\]`,
    'i',
  );
  const openRe = new RegExp(`\\[${tagName}\\]:?\\s*`, 'i');
  const closeOnlyRe = new RegExp(`^\\s*\\[\\/${tagName}\\]`, 'i');

  const closed = content.match(closedRe);
  if (closed) {
    return { jsonText: closed[1].trim(), strip: closed[0] };
  }

  const openMatch = content.match(openRe);
  if (!openMatch || openMatch.index == null) return null;

  const afterOpen = content.slice(openMatch.index + openMatch[0].length);
  const jsonText = extractJsonObject(afterOpen);
  if (!jsonText) {
    return {
      jsonText: afterOpen.trim(),
      strip: content.slice(openMatch.index),
      orphan: true,
    };
  }

  let strip = content.slice(
    openMatch.index,
    openMatch.index + openMatch[0].length + afterOpen.indexOf(jsonText) + jsonText.length,
  );
  const trailing = content.slice(openMatch.index + strip.length).match(closeOnlyRe);
  if (trailing) {
    strip += trailing[0];
  }

  return { jsonText, strip };
}

/**
 * Parse trigger JSON — strict first, then common LLM fixes, then regex field salvage.
 *
 * @param {string} jsonText
 * @returns {Record<string, unknown> | null}
 */
export function parseTriggerJson(jsonText) {
  const raw = String(jsonText ?? '').trim();
  if (!raw) return null;

  const attempts = [
    raw,
    raw.replace(/\r?\n/g, '\\n'),
    raw.replace(/,\s*([\]}])/g, '$1'),
  ];

  for (const candidate of attempts) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {
      /* try next */
    }
  }

  const prospectId =
    raw.match(/"prospectId"\s*:\s*"([^"]+)"/i)?.[1] ??
    raw.match(/"prospect_id"\s*:\s*"([^"]+)"/i)?.[1];
  const subject = raw.match(/"subject"\s*:\s*"((?:[^"\\]|\\.)*)"/i)?.[1];
  const body = raw.match(/"body"\s*:\s*"((?:[^"\\]|\\.)*)"/is)?.[1];
  const to = raw.match(/"to"\s*:\s*"([^"]+)"/i)?.[1];

  if (!prospectId || !subject || !body) return null;

  const unescape = (value) =>
    String(value)
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');

  return {
    prospectId,
    subject: unescape(subject),
    body: unescape(body),
    ...(to ? { to } : {}),
  };
}
