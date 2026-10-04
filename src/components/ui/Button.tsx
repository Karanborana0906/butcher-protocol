import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  disabled,
  className = '',
  style,
  ...props
}) => {
  // Base tactical button styling
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease-out',
    border: '1px solid transparent',
    position: 'relative',
    userSelect: 'none',
    opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '6px 12px',
      fontSize: '0.75rem',
      height: '32px',
    },
    md: {
      padding: '8px 18px',
      fontSize: '0.85rem',
      height: '40px',
    },
    lg: {
      padding: '12px 26px',
      fontSize: '0.95rem',
      height: '48px',
    },
  };

  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--signal-red)',
      color: '#FFFFFF',
      borderColor: 'var(--signal-red)',
      boxShadow: '0 0 15px rgba(225, 29, 56, 0.25)',
    },
    secondary: {
      backgroundColor: 'rgba(19, 19, 24, 0.6)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: 'rgba(225, 29, 56, 0.15)',
      color: 'var(--signal-red)',
      borderColor: 'var(--signal-red-dim)',
    },
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`tactical-btn ${className}`}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {isLoading && (
        <span
          style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      )}
      {!isLoading && icon && iconPosition === 'left' && <span style={{ display: 'flex' }}>{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span style={{ display: 'flex' }}>{icon}</span>}
    </button>
  );
};
