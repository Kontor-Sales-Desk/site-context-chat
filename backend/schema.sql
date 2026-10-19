-- Site Context Chat 5.4.0: database for the free website chat.
-- Run once in the Supabase SQL Editor (or `supabase db push` with the migrations/ copy).
-- Built from the chat migrations in the Kontor source; safe to run again.

-- ── 20250610000000_site_context_chat.sql ──
-- site-context-chat: schema for markdown-backed site chatbot

CREATE TABLE IF NOT EXISTS site_chat_sites (
  id text PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT true,
  chatbot_name text NOT NULL DEFAULT 'AI Assistant',
  business_name text NOT NULL DEFAULT '',
  appearance jsonb NOT NULL DEFAULT '{
    "primary": "#5DA399",
    "primaryDark": "#0F766E",
    "secondary": "#F29F05",
    "accent": "#F29F05",
    "welcomeMessage": "Hi! How can I help you today?",
    "placeholder": "Type your message..."
  }'::jsonb,
  model text NOT NULL DEFAULT 'claude-sonnet-4-20250514',
  max_tokens integer NOT NULL DEFAULT 1024,
  system_prompt_extra text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_chat_context (
  site_id text PRIMARY KEY REFERENCES site_chat_sites(id) ON DELETE CASCADE,
  context_markdown text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id text NOT NULL REFERENCES site_chat_sites(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  message_sequence integer NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  route_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_chat_conversations_unique_sequence UNIQUE (site_id, session_id, message_sequence)
);

CREATE INDEX IF NOT EXISTS idx_site_chat_conversations_session
  ON site_chat_conversations (site_id, session_id, message_sequence);

CREATE OR REPLACE FUNCTION get_site_chat_history(
  p_site_id text,
  p_session_id text,
  p_limit integer DEFAULT 40
)
RETURNS TABLE (
  role text,
  content text,
  message_sequence integer,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT recent.role, recent.content, recent.message_sequence, recent.created_at
  FROM (
    SELECT c.role, c.content, c.message_sequence, c.created_at
    FROM site_chat_conversations c
    WHERE c.site_id = p_site_id
      AND c.session_id = p_session_id
    ORDER BY c.message_sequence DESC
    LIMIT GREATEST(p_limit, 1)
  ) recent
  ORDER BY recent.message_sequence ASC;
$$;

CREATE OR REPLACE FUNCTION get_site_chat_user_message_count(
  p_site_id text,
  p_session_id text
)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM site_chat_conversations
  WHERE site_id = p_site_id
    AND session_id = p_session_id
    AND role = 'user';
$$;

CREATE OR REPLACE FUNCTION touch_site_chat_site_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS site_chat_sites_updated_at ON site_chat_sites;
CREATE TRIGGER site_chat_sites_updated_at
  BEFORE UPDATE ON site_chat_sites
  FOR EACH ROW
  EXECUTE FUNCTION touch_site_chat_site_updated_at();

DROP TRIGGER IF EXISTS site_chat_context_updated_at ON site_chat_context;
CREATE TRIGGER site_chat_context_updated_at
  BEFORE UPDATE ON site_chat_context
  FOR EACH ROW
  EXECUTE FUNCTION touch_site_chat_site_updated_at();

ALTER TABLE site_chat_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_chat_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_chat_conversations ENABLE ROW LEVEL SECURITY;

-- Public can read enabled site metadata (no markdown context).
DROP POLICY IF EXISTS site_chat_sites_public_read ON site_chat_sites;
CREATE POLICY site_chat_sites_public_read
  ON site_chat_sites FOR SELECT
  USING (enabled = true);

-- Edge functions use service role; no public write policies by default.
REVOKE ALL ON site_chat_context FROM anon, authenticated;
REVOKE ALL ON site_chat_conversations FROM anon, authenticated;

GRANT SELECT ON site_chat_sites TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_site_chat_history(text, text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION get_site_chat_user_message_count(text, text) TO service_role;

INSERT INTO site_chat_sites (id, chatbot_name, business_name)
VALUES ('default', 'AI Assistant', '')
ON CONFLICT (id) DO NOTHING;

INSERT INTO site_chat_context (site_id, context_markdown)
VALUES ('default', '')
ON CONFLICT (site_id) DO NOTHING;

-- ── 20250610120000_site_chat_inquiries.sql ──
-- Inquiries submitted via the site chatbot contact form

CREATE TABLE IF NOT EXISTS site_chat_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id text NOT NULL REFERENCES site_chat_sites(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL DEFAULT '',
  message text NOT NULL,
  route_path text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_chat_inquiries_site_created
  ON site_chat_inquiries (site_id, created_at DESC);

ALTER TABLE site_chat_inquiries ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON site_chat_inquiries FROM anon, authenticated;

-- ── 20250610220000_update_welcome_message.sql ──
-- Replace legacy welcome copy with discovery/handoff messaging
UPDATE site_chat_sites
SET
  appearance = jsonb_set(
    appearance,
    '{welcomeMessage}',
    to_jsonb(
      'Tell me what you''re working on — I''ll gather the details and pass them to our team.'::text
    )
  ),
  updated_at = now()
WHERE appearance->>'welcomeMessage' IN (
  'Hi! How can I help you today?',
  'Hi — ask me about our services, projects, or how we work.',
  'Ask me about our services, projects, or how we work.',
  'How can I help you today?'
);

-- ── 20250610230000_list_chat_sessions.sql ──
-- Admin: list chat sessions with summary metadata
CREATE OR REPLACE FUNCTION list_site_chat_sessions(
  p_site_id text,
  p_limit integer DEFAULT 100
)
RETURNS TABLE (
  session_id text,
  message_count bigint,
  user_message_count bigint,
  started_at timestamptz,
  last_at timestamptz,
  last_route_path text,
  preview text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.session_id,
    COUNT(*)::bigint AS message_count,
    COUNT(*) FILTER (WHERE c.role = 'user')::bigint AS user_message_count,
    MIN(c.created_at) AS started_at,
    MAX(c.created_at) AS last_at,
    (ARRAY_AGG(c.route_path ORDER BY c.message_sequence DESC))[1] AS last_route_path,
    (
      SELECT u.content
      FROM site_chat_conversations u
      WHERE u.site_id = p_site_id
        AND u.session_id = c.session_id
        AND u.role = 'user'
      ORDER BY u.message_sequence ASC
      LIMIT 1
    ) AS preview
  FROM site_chat_conversations c
  WHERE c.site_id = p_site_id
  GROUP BY c.session_id
  ORDER BY MAX(c.created_at) DESC
  LIMIT GREATEST(p_limit, 1);
$$;

REVOKE ALL ON FUNCTION list_site_chat_sessions(text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION list_site_chat_sessions(text, integer) TO service_role;

-- ── 20250617120000_shop_product_inquiries.sql ──
-- Shop product page inquiries (same table + admin as chat widget inquiries)

ALTER TABLE site_chat_inquiries
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'chat'
    CHECK (source IN ('chat', 'shop')),
  ADD COLUMN IF NOT EXISTS product_id text,
  ADD COLUMN IF NOT EXISTS intent text,
  ADD COLUMN IF NOT EXISTS site_url text;

ALTER TABLE site_chat_inquiries
  ALTER COLUMN contact_name DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_site_chat_inquiries_shop
  ON site_chat_inquiries (site_id, source, created_at DESC);

-- ── 20250617200000_shop_context_markdown.sql ──
-- Separate shop knowledge base for visitor chat (injected on /shop routes or shop queries)

ALTER TABLE site_chat_context
  ADD COLUMN IF NOT EXISTS shop_context_markdown text NOT NULL DEFAULT '';

-- ── 20250617220000_contact_page_inquiries.sql ──
-- Contact section form inquiries (same table + admin as chat widget inquiries)

ALTER TABLE site_chat_inquiries
  DROP CONSTRAINT IF EXISTS site_chat_inquiries_source_check;

ALTER TABLE site_chat_inquiries
  ADD CONSTRAINT site_chat_inquiries_source_check
  CHECK (source IN ('chat', 'shop', 'contact'));

-- ── current default model ──
ALTER TABLE site_chat_sites ALTER COLUMN model SET DEFAULT 'claude-sonnet-4-6';
UPDATE site_chat_sites SET model = 'claude-sonnet-4-6' WHERE model LIKE 'claude-sonnet-4-2025%' OR model LIKE 'claude-3-%';
