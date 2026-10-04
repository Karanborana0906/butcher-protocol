import React from 'react';

export type BadgeVariant =
  | 'CRITICAL'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW'
  | 'SAVED'
  | 'APPLIED'
  | 'INTERVIEW'
  | 'REJECTED'
  | 'OFFER'
  | 'DEVELOPMENT'
  | 'ONLINE'
  | 'DEFAULT';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'DEFAULT',
  children,
  size = 'sm',
  pulse = false,
  className = '',
  style,
}) => {
  const getColors = (v: BadgeVariant) => {
    switch (v) {
      case 'CRITICAL':
        return {
          bg: 'rgba(225, 29, 56, 0.12)',
          border: 'var(--signal-red)',
          text: 'var(--signal-red)',
          dot: 'var(--signal-red)',
        };
      case 'HIGH':
        return {
          bg: 'rgba(245, 165, 36, 0.12)',
          border: 'var(--warning-amber)',
          text: 'var(--warning-amber)',
          dot: 'var(--warning-amber)',
        };
      case 'MEDIUM':
        return {
          bg: 'rgba(76, 141, 255, 0.12)',
          border: 'rgba(76, 141, 255, 0.4)',
          text: 'var(--intel-blue)',
          dot: 'var(--intel-blue)',
        };
      case 'SAVED':
        return {
          bg: 'rgba(107, 107, 118, 0.15)',
          border: 'var(--border-strong)',
          text: 'var(--text-secondary)',
          dot: 'var(--text-muted)',
        };
      case 'APPLIED':
        return {
          bg: 'rgba(76, 141, 255, 0.12)',
          border: 'var(--intel-blue)',
          text: 'var(--intel-blue)',
          dot: 'var(--intel-blue)',
        };
      case 'INTERVIEW':
        return {
          bg: 'rgba(245, 165, 36, 0.12)',
          border: 'var(--warning-amber)',
          text: 'var(--warning-amber)',
          dot: 'var(--warning-amber)',
        };
      case 'REJECTED':
        return {
          bg: 'rgba(225, 29, 56, 0.08)',
          border: 'var(--signal-red-dim)',
          text: '#E06B7B',
          dot: '#E06B7B',
        };
      case 'OFFER':
        return {
          bg: 'rgba(47, 191, 113, 0.15)',
          border: 'var(--success-green)',
          text: 'var(--success-green)',
          dot: 'var(--success-green)',
        };
      case 'ONLINE':
        return {
          bg: 'rgba(47, 191, 113, 0.12)',
          border: 'rgba(47, 191, 113, 0.4)',
          text: 'var(--success-green)',
          dot: 'var(--success-green)',
        };
      case 'DEVELOPMENT':
        return {
          bg: 'rgba(31, 31, 38, 0.6)',
          border: 'var(--border-strong)',
          text: 'var(--text-muted)',
          dot: 'var(--text-muted)',
        };
      default:
        return {
          bg: 'rgba(31, 31, 38, 0.4)',
          border: 'var(--border-subtle)',
          text: 'var(--text-secondary)',
          dot: 'var(--text-muted)',
        };
    }
  };

  const colors = getColors(variant);

  const sizeStyles: Record<string, React.CSSProperties> = {
    xs: {
      padding: '2px 6px',
      fontSize: '0.65rem',
      gap: '4px',
    },
    sm: {
      padding: '3px 8px',
      fontSize: '0.72rem',
      gap: '5px',
    },
    md: {
      padding: '4px 10px',
      fontSize: '0.8rem',
      gap: '6px',
    },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        lineHeight: 1.2,
        userSelect: 'none',
        ...sizeStyles[size],
        ...style,
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: colors.dot,
          animation: pulse ? 'pulseDot 1.8s infinite ease-in-out' : 'none',
        }}
      />
      {children}
    </span>
  );
};
