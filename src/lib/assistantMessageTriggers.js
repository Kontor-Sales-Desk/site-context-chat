import { parseDraftEmailTrigger } from './draftEmailTrigger';
import { parseProspectBatchTrigger } from './prospectBatchTrigger';
import { normalizeChatMarkdown } from './normalizeChatMarkdown';
import { sanitizeAssistantDisplay } from './sanitizeAssistantDisplay';

/**
 * Strip hidden trigger blocks and extract structured follow-up actions for the UI.
 *
 * @param {string} content
 * @param {{ streaming?: boolean }} [opts]
 */
export function parseAssistantMessageTriggers(content, opts = {}) {
  if (opts.streaming) {
    return {
      displayContent: normalizeChatMarkdown(sanitizeAssistantDisplay(content)),
      draftProposal: null,
      draftProposals: [],
      prospectBatch: null,
    };
  }

  const draftParse = parseDraftEmailTrigger(content);
  const batchParse = parseProspectBatchTrigger(draftParse.displayContent);

  return {
    displayContent: normalizeChatMarkdown(sanitizeAssistantDisplay(batchParse.displayContent)),
    draftProposal: draftParse.draftProposal,
    draftProposals: draftParse.draftProposals,
    prospectBatch: batchParse.prospectBatch,
  };
}
