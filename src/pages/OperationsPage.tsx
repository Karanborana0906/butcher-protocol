import React from 'react';
import { KanbanBoard } from '../components/operations/KanbanBoard';

export const OperationsPage: React.FC = () => {
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
            OPERATION STATUS // APPLICATION TRACKER
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            ACTIVE LIFECYCLE MANAGEMENT // STAGES: SAVED, APPLIED, INTERVIEW, OFFER, ARCHIVED
          </p>
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
};
