import type { ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

export type AdminPanelProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  siteId?: string;
  className?: string;
  /** Host app area navigation (replaces default page title). */
  titleNav?: ReactNode;
  /**
   * Credential from the host (Kontor desk session token, or the Mac app's secret). When
   * given, the panel uses it as is and never stores a secret; without it, the panel
   * shows its own unlock form.
   */
  adminCredential?: string;
  /** Host's Supabase client (Kontor: keeps session activity / expiry handling). */
  supabaseClient?: SupabaseClient;
  /** Called when the host credential is refused (session ended). */
  onSignedOut?: () => void;
  /** Kontor sales desk link in the header (default '/admin/sales'); null hides it. */
  salesDeskHref?: string | null;
  /** TechLads sales assistant tab — replaces the OSS visitor preview tab */
  AssistantTab?: React.ComponentType<{
    supabase: SupabaseClient;
    supabaseUrl: string;
    supabaseAnonKey: string;
    adminSecret: string;
    siteId: string;
    site: Record<string, unknown>;
  }>;
};

export function AdminPanel(props: AdminPanelProps): JSX.Element;
