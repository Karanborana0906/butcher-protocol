import React, { useState } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerLabel?: string;
  headerAction?: React.ReactNode;
  variant?: 'surface' | 'elevated' | 'glass';
  hasBrackets?: boolean;
  hasGlow?: boolean;
  enableTilt?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  headerLabel,
  headerAction,
  variant = 'surface',
  hasBrackets = false,
  hasGlow = false,
  enableTilt = false,
  padding = 'md',
  className = '',
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) {
      onMouseMove?.(e);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max ~4-5 deg tilt
    const tiltX = -((y - centerY) / centerY) * 4;
    const tiltY = ((x - centerX) / centerX) * 4;
    setTilt({ x: tiltX, y: tiltY });
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableTilt) {
      setTilt({ x: 0, y: 0 });
    }
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const getBg = () => {
    if (variant === 'elevated') return 'var(--bg-elevated)';
    if (variant === 'glass') return 'rgba(12, 12, 15, 0.75)';
    return 'var(--bg-surface)';
  };

  const paddingValues = {
    none: '0',
    sm: '12px',
    md: '20px',
    lg: '28px',
  };

  return (
    <div
      className={`tactical-card ${hasBrackets ? 'tactical-brackets' : ''} ${hasGlow ? 'signal-glow' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: getBg(),
        border: `1px solid ${isHovered ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-sm)',
        transition: enableTilt ? 'border-color 0.2s, box-shadow 0.2s' : 'all 0.2s ease-out',
        transform: enableTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-2px' : '0px'})`
          : isHovered
          ? 'translateY(-2px)'
          : 'none',
        boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.6)' : 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...props}
    >
      {headerLabel && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(5, 5, 6, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--signal-red)',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {headerLabel}
            </span>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div style={{ padding: paddingValues[padding], flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
