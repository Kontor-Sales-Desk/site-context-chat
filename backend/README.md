# Site Context Chat 5.4.0: backend for the free website chat

The free website chat (npm package `site-context-chat`, the WordPress plugin "Site Context
Chat" and the embed kit) is only the part your visitors see. It needs this backend: a small
database and two functions on your own [Supabase](https://supabase.com) project. You own the
data and pay the AI provider directly, on your own key.

Already using **Kontor**? Skip this: your Kontor backend already runs the chat.

## What's in this zip

| Path | What it is |
| --- | --- |
| `schema.sql` | The database: four tables (sites, knowledge base, conversations, enquiries) and two lookup functions. Paste it into the SQL Editor. |
| `supabase/functions/site-chat/` | Answers your visitors and saves their enquiries |
| `supabase/functions/site-chat-admin/` | The chat admin: settings, knowledge base, conversations, enquiries |
| `supabase/config.toml` | Function settings for the Supabase CLI |
| `supabase/migrations/` | The same schema, for `supabase db push` |

## What you need

- A Supabase account (the free plan is enough to start)
- An AI key: [Anthropic](https://console.anthropic.com) (Claude, the default), or OpenAI or Z.ai
- A long random **admin secret**, 32 characters or more (let your password manager make one)
- The [Supabase CLI](https://supabase.com/docs/guides/cli), to deploy the two functions
- Optional, for enquiry emails: a [Resend](https://resend.com) key and the address that should get them

## 1. Create the Supabase project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Pick the region
   closest to your visitors and wait until it's **Active**.
2. Note down, from **Project Settings**:
   - **Project URL** (`https://xxxx.supabase.co`) and the **publishable key**
     (`sb_publishable_…`, or the legacy `anon` key): they go into the chat on your site
   - **Project ref** (General → Reference ID): for the CLI below

Never put the `service_role` / secret key in your website. The functions get it from
Supabase automatically.

## 2. Create the database

Dashboard → **SQL Editor** → **New query** → paste all of `schema.sql` → **Run**.

Check: **Table Editor** shows `site_chat_sites`, `site_chat_context`, `site_chat_conversations`
and `site_chat_inquiries`, and `site_chat_sites` has one row with `id = default`.

## 3. Add the secrets

Dashboard → **Edge Functions** → **Secrets**:

| Secret | Value | Needed |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Your Claude key (`sk-ant-…`) | Yes, for Claude models (the default) |
| `OPENAI_API_KEY` / `ZAI_API_KEY` | Your OpenAI or Z.ai key | Only if you pick one of their models |
| `SITE_CHAT_ADMIN_SECRET` | Your admin secret | Yes |
| `RESEND_API_KEY` | Resend key | For enquiry emails |
| `SITE_CHAT_NOTIFY_EMAIL` | Where enquiries are sent | For enquiry emails |
| `SITE_CHAT_FROM_EMAIL` | A sender verified in Resend | For enquiry emails |

Keep the admin secret safe: you sign in to the chat admin with it.

## 4. Deploy the two functions

In a terminal, from this folder (the one with `supabase/` in it):

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy site-chat
supabase functions deploy site-chat-admin
```

Using the CLI for the database too? `supabase db push` applies the same schema as step 2.

## 5. Connect your site

- **WordPress:** Settings → Site Context Chat → paste the Project URL and publishable key,
  Site ID `default`, turn the widget on, save.
- **Any HTML site:** the embed kit's README has the snippet; fill in the same three values.
- **JavaScript app:** `npm install site-context-chat` and pass the same values to the widget.

## 6. Teach it about your business

Open the chat admin (the WordPress admin page, or the package's admin panel), sign in with your
admin secret, and paste your knowledge base: services, prices, FAQs, opening hours, in plain
Markdown. The chat answers from it and offers to pass on an enquiry when it can't help.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| The chat doesn't answer | Check the AI key secret, and that both functions show as deployed |
| "Unauthorized" in the admin | The admin secret you typed doesn't match `SITE_CHAT_ADMIN_SECRET` |
| No enquiry emails | Set all three Resend secrets; the sender must be verified in Resend |
| "Site not found" | Run `schema.sql` again: it creates the `default` site row |
| CLI says "Invalid access token format" | Your Supabase CLI is older than your access token: update it (`brew upgrade supabase`, or `npx supabase@latest`) |

## Licence

MIT. Built from the Kontor source by TechLads: https://getkontor.eu/support-software
