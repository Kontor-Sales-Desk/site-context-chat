import React from 'react';
import { FaSync } from 'react-icons/fa';

export function AdminNavTabs({ active, onChange, tabs, ariaLabel = 'Admin sections' }) {
  return (
    <div className="scc-sales-nav" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`scc-sales-nav__tab${isActive ? ' scc-sales-nav__tab--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function AdminPanelToolbar({ filters, hint, actions }) {
  return (
    <div className="scc-sales-panel__toolbar">
      <div className="scc-sales-panel__toolbar-main">
        {filters}
        {hint ? <div className="scc-sales-panel__hint">{hint}</div> : null}
      </div>
      {actions ? <div className="scc-sales-panel__toolbar-actions">{actions}</div> : null}
    </div>
  );
}

export function AdminRefreshButton({ onClick, loading = false }) {
  return (
    <button
      type="button"
      className={`scc-sales-panel-icon-btn${loading ? ' scc-sales-panel-icon-btn--spin' : ''}`}
      onClick={onClick}
      disabled={loading}
      aria-label="Refresh"
      title="Refresh"
    >
      <FaSync className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}

export function AdminPanelAction({ children, onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`scc-sales-panel-action${className ? ` ${className}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function AdminPanelSelect({ value, onChange, children, className = '' }) {
  return (
    <div className={`scc-sales-panel__select-wrap${className ? ` ${className}` : ''}`}>
      <select className="scc-sales-panel__select" value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </div>
  );
}

const BADGE_TONES = {
  neutral: 'neutral',
  teal: 'teal',
  orange: 'orange',
  success: 'success',
  danger: 'danger',
  muted: 'muted',
};

export function AdminBadge({ label, tone = 'neutral' }) {
  const safeTone = BADGE_TONES[tone] ? tone : 'neutral';
  return <span className={`scc-sales-badge scc-sales-badge--${safeTone}`}>{label}</span>;
}

export function inquiryStatusBadge(status) {
  const value = String(status ?? 'new').toLowerCase();
  if (value === 'new') return { label: 'New', tone: 'orange' };
  if (value === 'read') return { label: 'Read', tone: 'teal' };
  if (value === 'archived') return { label: 'Archived', tone: 'muted' };
  return { label: value, tone: 'neutral' };
}
