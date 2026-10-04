import React from 'react';
import { Menu, Shield, Terminal } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface TopBarProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, onMenuToggle }) => {
  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'rgba(12, 12, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onMenuToggle}
          className="mobile-menu-btn"
          aria-label="Toggle navigation drawer"
          style={{
            background: 'transparent',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu size={18} />
        </button>

        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Model Identifier Marker */}
        <div
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            backgroundColor: 'rgba(31, 31, 38, 0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <Terminal size={12} color="var(--signal-red)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
            }}
          >
            GEMMA: <span style={{ color: 'var(--text-primary)' }}>gemma-4-31b-it</span>
          </span>
        </div>

        {/* Security Status */}
        <div className="desktop-only">
          <Badge variant="ONLINE" size="sm">
            OPERATIONAL
          </Badge>
        </div>

        {/* Operator Profile Chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px 4px 6px',
            backgroundColor: 'rgba(19, 19, 24, 0.8)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '2px',
              backgroundColor: 'rgba(225, 29, 56, 0.15)',
              border: '1px solid var(--signal-red-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--signal-red)',
            }}
          >
            <Shield size={14} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              K. BORANA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
              }}
            >
              DELTA-9
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
