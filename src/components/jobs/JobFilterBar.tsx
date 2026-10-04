import React from 'react';
import { SearchBar } from '../ui/SearchBar';
import { Filter, ArrowUpDown } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  workplace: 'ALL' | 'Remote' | 'Hybrid' | 'On-site';
  minMatch: number;
  priority: 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM';
  sortBy: 'MATCH' | 'DATE' | 'PRIORITY';
}

interface JobFilterBarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  totalFiltered: number;
  totalAvailable?: number;
}

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  filters,
  onChange,
  totalFiltered,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: 'rgba(12, 12, 15, 0.7)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '16px',
        marginBottom: '24px',
      }}
    >
      {/* Top Search Bar */}
      <SearchBar
        value={filters.searchQuery}
        onChange={(val) => onChange({ searchQuery: val })}
        placeholder="SEARCH TARGETS BY ROLE TITLE, ENTITY, OR SKILL MATRIX (E.G. CUDA, PYTORCH)..."
        totalResults={totalFiltered}
      />

      {/* Filter and Sort Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginRight: '4px',
            }}
          >
            <Filter size={12} /> FILTERS:
          </span>

          {/* Workplace Selector */}
          {(['ALL', 'Remote', 'Hybrid', 'On-site'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onChange({ workplace: type })}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: filters.workplace === type ? 'var(--signal-red)' : 'var(--border-subtle)',
                backgroundColor: filters.workplace === type ? 'rgba(225, 29, 56, 0.15)' : 'var(--bg-surface)',
                color: filters.workplace === type ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {type === 'ALL' ? 'ALL LOCATIONS' : type.toUpperCase()}
            </button>
          ))}

          {/* Min Match Filter */}
          <select
            value={filters.minMatch}
            onChange={(e) => onChange({ minMatch: Number(e.target.value) })}
            aria-label="Filter by minimum match compatibility"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '6px 10px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value={0}>MATCH: ANY %</option>
            <option value={80}>MATCH: &gt;= 80%</option>
            <option value={90}>MATCH: &gt;= 90% (ELITE)</option>
          </select>
        </div>

        {/* Sort Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <ArrowUpDown size={12} /> SORT:
          </span>

          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            aria-label="Sort targets"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '6px 12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="MATCH">HIGHEST MATCH COMPATIBILITY</option>
            <option value="DATE">MOST RECENT DISCOVERY</option>
            <option value="PRIORITY">PRIORITY RANKING</option>
          </select>
        </div>
      </div>
    </div>
  );
};
