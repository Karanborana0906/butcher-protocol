import React from 'react';
import { useLocation } from 'react-router-dom';
import { ScanDashboard } from '../components/protocol/ScanDashboard';
import type { JobTarget } from '../data/mockJobs';

export const ProtocolScanPage: React.FC = () => {
  const location = useLocation();
  const selectedJob = (location.state as { selectedJob?: JobTarget })?.selectedJob || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2
            style={{
              margin: '0 0 4px 0',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            PROTOCOL SCAN // COMPATIBILITY DIAGNOSTICS
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            SCREENING MATRIX ESTIMATION // SCORES ARE STRICTLY INTERNAL COMPATIBILITY ESTIMATES
          </p>
        </div>
      </div>

      <ScanDashboard initialJob={selectedJob} />
    </div>
  );
};
