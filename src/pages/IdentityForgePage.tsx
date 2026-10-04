import React from 'react';
import { useLocation } from 'react-router-dom';
import { ForgeWorkflow } from '../components/identity/ForgeWorkflow';
import type { JobTarget } from '../data/mockJobs';

export const IdentityForgePage: React.FC = () => {
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
            IDENTITY FORGE // TAILORED RESUME GENERATION
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            AI ARCHITECTURE BOUNDARY: GEMMA 4 31B IT // ZERO FABRICATION PROTOCOL ENFORCED
          </p>
        </div>
      </div>

      <ForgeWorkflow initialJob={selectedJob} />
    </div>
  );
};
