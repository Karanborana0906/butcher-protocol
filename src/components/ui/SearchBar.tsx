import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'SEARCH TARGETS BY ROLE, SKILL, OR ENTITY...',
  onClear,
  totalResults,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        transition: 'border-color 0.2s',
      }}
    >
      <div
        style={{
          paddingLeft: '14px',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      >
        <Search size={16} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          padding: '12px 14px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.82rem',
          letterSpacing: '0.04em',
          outline: 'none',
        }}
      />

      {totalResults !== undefined && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            padding: '2px 8px',
            backgroundColor: 'rgba(31, 31, 38, 0.5)',
            borderRadius: '2px',
            marginRight: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          {totalResults} {totalResults === 1 ? 'TARGET' : 'TARGETS'}
        </div>
      )}

      {value && (
        <button
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          aria-label="Clear search"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
