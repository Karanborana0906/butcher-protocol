import React, { useEffect, useState } from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
  colorScheme?: 'tier' | 'signal' | 'success' | 'amber';
  animate?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 76,
  strokeWidth = 5,
  showLabel = true,
  label,
  sublabel,
  colorScheme = 'tier',
  animate = true,
}) => {
  const [currentPercent, setCurrentPercent] = useState(animate ? 0 : percentage);

  useEffect(() => {
    if (!animate) {
      setCurrentPercent(percentage);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentPercent(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage, animate]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  const getColor = () => {
    if (colorScheme === 'signal') return 'var(--signal-red)';
    if (colorScheme === 'success') return 'var(--success-green)';
    if (colorScheme === 'amber') return 'var(--warning-amber)';

    // Dynamic tiering based on match score
    if (percentage >= 85) return 'var(--signal-red)';
    if (percentage >= 75) return 'var(--warning-amber)';
    if (percentage >= 60) return 'var(--intel-blue)';
    return 'var(--text-muted)';
  };

  const strokeColor = getColor();

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border-strong)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>

      {showLabel && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: size > 90 ? '1.5rem' : '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {label ? label : `${percentage}%`}
          </span>
          {sublabel && (
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginTop: '3px',
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
