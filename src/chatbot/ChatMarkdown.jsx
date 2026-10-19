import React, { useEffect, useState } from 'react';
import { normalizeChatMarkdown } from '../lib/normalizeChatMarkdown';

function getPlainText(children) {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (React.isValidElement(child) && child.props?.children != null) {
        return getPlainText(child.props.children);
      }
      return '';
    })
    .join('');
}

function isProspectContactParagraph(text) {
  const trimmed = text.trim();
  return /^(?:📧|📸|No public email)/i.test(trimmed);
}

function ProspectIdBadge({ children }) {
  const text = String(children ?? '').trim();
  const match = text.match(/^id=([0-9a-f-]{36})$/i);
  if (!match) {
    return <code className="scc-chat-prospect-id">{children}</code>;
  }

  const fullId = match[1];
  return (
    <code className="scc-chat-prospect-id" title={`id=${fullId}`}>
      {`id=${fullId.slice(0, 8)}…`}
    </code>
  );
}

export default function ChatMarkdown({ content }) {
  const [rendered, setRendered] = useState(null);
  const markdown = normalizeChatMarkdown(content);

  useEffect(() => {
    if (!markdown?.trim()) {
      setRendered(null);
      return undefined;
    }

    let cancelled = false;

    Promise.all([
      import('react-markdown'),
      import('remark-gfm'),
      import('remark-breaks'),
    ]).then(([{ default: ReactMarkdown }, { default: remarkGfm }, { default: remarkBreaks }]) => {
      if (cancelled) return;

      setRendered(
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            p: ({ children }) => {
              const text = getPlainText(children);
              if (isProspectContactParagraph(text)) {
                return <p className="scc-chat-prospect-contact">{children}</p>;
              }
              return <p>{children}</p>;
            },
            code: ({ className, children }) => {
              const text = String(children ?? '').trim();
              if (/^id=[0-9a-f-]{36}$/i.test(text)) {
                return <ProspectIdBadge>{children}</ProspectIdBadge>;
              }
              return <code className={className}>{children}</code>;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>,
      );
    });

    return () => {
      cancelled = true;
    };
  }, [markdown]);

  if (!markdown?.trim()) return null;
  if (!rendered) return <span className="scc-chat-panel__markdown">{markdown}</span>;
  return <div className="scc-chat-panel__markdown">{rendered}</div>;
}
