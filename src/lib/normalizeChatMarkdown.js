const THEMATIC_BREAK_LINE = /^[ \t]*[-*_]{3,}[ \t]*$/;
const PROSPECT_ID_LINE =
  /^(?:`)?id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?:`)?$/i;
const PROSPECT_TITLE_LINE =
  /^(?:#{1,6}\s+)?\*\*(?!To:|Subject:)[^*\n]+\*\*(?:\s*[⭐★]+)?\s*$|^#{1,6}\s+\S/;

/**
 * Tidy assistant markdown before render — collapse duplicate `---` separators and
 * excessive blank lines that stack with heading / paragraph margins.
 *
 * @param {string} content
 * @returns {string}
 */
export function normalizeChatMarkdown(content) {
  if (!content?.trim()) return content ?? '';

  let text = collapseThematicBreaks(content.replace(/\r\n/g, '\n'));

  // Prospect lists: swap hr separators for paragraph breaks; add air between entries.
  text = text.replace(/\n---\n+(?=#{1,6}\s)/gm, '\n\n');
  text = text.replace(/(`id=[^`]+`)\s*\n---\n/gi, '$1\n\n');
  text = text.replace(/(^|\n)(id=[0-9a-f-]{36})\s*\n---\n/gim, '$1$2\n\n');
  text = formatProspectContacts(text);
  text = formatProspectListSpacing(text);

  // Trim padding around any remaining hr.
  text = text.replace(/\n{2,}---\n{2,}/g, '\n---\n');
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/** Add paragraph breaks so prospect cards breathe (without affecting email To/Subject blocks). */
function formatProspectListSpacing(text) {
  const lines = text.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const prev = out.length ? out[out.length - 1].trim() : '';
    const prevIsProspectId = PROSPECT_ID_LINE.test(prev);
    const prevIsTitle = PROSPECT_TITLE_LINE.test(prev);
    const isProspectTitle = PROSPECT_TITLE_LINE.test(trimmed);
    const isProspectId = PROSPECT_ID_LINE.test(trimmed);
    const isHeading = /^#{1,6}\s/.test(trimmed);

    if (
      out.length &&
      out[out.length - 1].trim() !== '' &&
      (isProspectTitle || isHeading) &&
      (prevIsProspectId || PROSPECT_ID_LINE.test(prev))
    ) {
      out.push('');
    }

    if (out.length && out[out.length - 1].trim() !== '' && isProspectId && prev && !prevIsProspectId) {
      out.push('');
    }

    if (out.length && out[out.length - 1].trim() !== '' && !isProspectTitle && !isProspectId && prevIsTitle) {
      out.push('');
    }

    out.push(line);
  }

  return out.join('\n');
}

/** Pull contact chips onto their own line and normalize separators. */
function formatProspectContacts(text) {
  const lines = text.split('\n');
  const out = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      out.push(line);
      continue;
    }

    if (PROSPECT_TITLE_LINE.test(trimmed) || PROSPECT_ID_LINE.test(trimmed)) {
      out.push(wrapBareProspectId(line));
      continue;
    }

    const emailMarker = trimmed.search(/\s+📧\s+/);
    if (emailMarker > 0) {
      const desc = trimmed.slice(0, emailMarker).trim();
      const contact = formatContactLine(trimmed.slice(emailMarker).trim());
      if (desc) out.push(desc);
      if (desc && contact) out.push('');
      if (contact) out.push(contact);
      continue;
    }

    if (isProspectContactLine(trimmed)) {
      out.push(formatContactLine(trimmed));
      continue;
    }

    out.push(wrapBareProspectId(line));
  }

  return out.join('\n');
}

function isProspectContactLine(line) {
  return /^(?:📧|📸|No public email)/i.test(line.trim());
}

function formatContactLine(line) {
  return line
    .replace(/\s*\|\s*/g, ' · ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function wrapBareProspectId(line) {
  const trimmed = line.trim();
  if (/^id=[0-9a-f-]{36}$/i.test(trimmed)) {
    return `\`${trimmed}\``;
  }
  return line;
}

function collapseThematicBreaks(text) {
  const lines = text.split('\n');
  const out = [];
  let inBreakRun = false;

  for (const line of lines) {
    const isBreak = THEMATIC_BREAK_LINE.test(line);
    const isBlank = line.trim() === '';

    if (isBreak) {
      if (!inBreakRun) {
        out.push('---');
        inBreakRun = true;
      }
      continue;
    }

    if (isBlank && inBreakRun) {
      continue;
    }

    inBreakRun = false;
    out.push(line);
  }

  return out.join('\n');
}
