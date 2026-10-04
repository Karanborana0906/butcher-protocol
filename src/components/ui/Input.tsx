import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: error ? 'var(--signal-red)' : 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{label}</span>
            {hint && <span style={{ textTransform: 'none', color: 'var(--text-muted)' }}>{hint}</span>}
          </label>
        )}

        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
          {icon && (
            <div
              style={{
                position: 'absolute',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                color: error ? 'var(--signal-red)' : 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            >
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={className}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              border: `1px solid ${error ? 'var(--signal-red)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: icon ? '10px 14px 10px 38px' : '10px 14px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxShadow: error ? '0 0 10px rgba(225, 29, 56, 0.2)' : 'none',
              ...style,
            }}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = 'var(--signal-red-dim)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(225, 29, 56, 0.15)';
              }
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }
              props.onBlur?.(e);
            }}
            {...props}
          />
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'var(--signal-red)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span>[!]</span>
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
