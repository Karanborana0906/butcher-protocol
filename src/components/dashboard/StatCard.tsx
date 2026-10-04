import React from 'react';
import { Card } from '../ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  subvalue?: string;
  icon: React.ReactNode;
  variant?: 'red' | 'amber' | 'blue' | 'green';
  footerNote?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subvalue,
  icon,
  variant = 'red',
  footerNote,
  onClick,
}) => {
  const getAccentColor = () => {
    switch (variant) {
      case 'red':
        return 'var(--signal-red)';
      case 'amber':
        return 'var(--warning-amber)';
      case 'blue':
        return 'var(--intel-blue)';
      case 'green':
        return 'var(--success-green)';
    }
  };

  const accent = getAccentColor();

  return (
    <Card
      hasBrackets
      padding="md"
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top indicator bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: accent,
          opacity: 0.8,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(19, 19, 24, 0.9)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accent,
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.25rem',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--text-primary)',
          }}
        >
          {value}
        </span>
        {subvalue && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            {subvalue}
          </span>
        )}
      </div>

      {footerNote && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: accent }}>●</span>
          <span>{footerNote}</span>
        </div>
      )}
    </Card>
  );
};
