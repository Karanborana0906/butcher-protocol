import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge, type BadgeVariant } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INITIAL_OPERATIONS, type OperationCardItem, type OperationStatus } from '../../data/mockOperations';

const COLUMNS: { id: OperationStatus; title: string; variant: BadgeVariant }[] = [
  { id: 'SAVED', title: 'SAVED TARGETS', variant: 'SAVED' },
  { id: 'APPLIED', title: 'APPLICATIONS DISPATCHED', variant: 'APPLIED' },
  { id: 'INTERVIEW', title: 'TACTICAL INTERVIEWS', variant: 'INTERVIEW' },
  { id: 'OFFER', title: 'ACTIVE OFFERS', variant: 'OFFER' },
  { id: 'REJECTED', title: 'ARCHIVED / REJECTED', variant: 'REJECTED' },
];

export const KanbanBoard: React.FC = () => {
  const [operations, setOperations] = useState<OperationCardItem[]>(INITIAL_OPERATIONS);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const moveStatus = (opId: string, nextStatus: OperationStatus) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === opId ? { ...op, status: nextStatus } : op))
    );
    setStatusMessage(`OPERATION ${opId} MOVED TO ${nextStatus}`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const getNextStatus = (current: OperationStatus): OperationStatus | null => {
    switch (current) {
      case 'SAVED':
        return 'APPLIED';
      case 'APPLIED':
        return 'INTERVIEW';
      case 'INTERVIEW':
        return 'OFFER';
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(12, 12, 15, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            ACTIVE MISSIONS: {operations.length}
          </span>
          {statusMessage && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--signal-red)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={13} color="var(--success-green)" />
              {statusMessage}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="ONLINE" size="xs">
            LIVE KANBAN
          </Badge>
        </div>
      </div>

      {/* Kanban Columns Container (Horizontal Scroll on Mobile/Tablet) */}
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'minmax(280px, 320px)',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '16px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {COLUMNS.map((col) => {
          const colItems = operations.filter((op) => op.status === col.id);

          return (
            <div
              key={col.id}
              style={{
                backgroundColor: 'rgba(12, 12, 15, 0.85)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 220px)',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: '12px 14px',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: 'rgba(5, 5, 6, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {col.title}
                  </span>
                </div>

                <Badge variant={col.variant} size="xs">
                  {colItems.length}
                </Badge>
              </div>

              {/* Cards Container */}
              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  overflowY: 'auto',
                  flex: 1,
                }}
              >
                {colItems.length === 0 ? (
                  <div
                    style={{
                      padding: '24px 12px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      border: '1px dashed var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    NO ACTIVE OPERATIONS IN THIS STAGE
                  </div>
                ) : (
                  colItems.map((op) => {
                    const nextSt = getNextStatus(op.status);

                    return (
                      <Card
                        key={op.id}
                        padding="sm"
                        hasBrackets
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {/* Header ID & Score */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '6px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {op.id}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ProgressRing
                              percentage={op.matchScore}
                              size={28}
                              strokeWidth={3}
                              showLabel={false}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: 'var(--signal-red)',
                              }}
                            >
                              {op.matchScore}%
                            </span>
                          </div>
                        </div>

                        {/* Title & Company */}
                        <h4
                          style={{
                            margin: '0 0 4px 0',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1.25,
                          }}
                        >
                          {op.title}
                        </h4>

                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--signal-red)',
                            marginBottom: '8px',
                          }}
                        >
                          {op.company}
                        </div>

                        {/* Next Step / Notes */}
                        {op.nextStep && (
                          <div
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'var(--text-secondary)',
                              backgroundColor: 'rgba(5, 5, 6, 0.4)',
                              padding: '6px 8px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              marginBottom: '8px',
                            }}
                          >
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>NEXT: </span>
                            {op.nextStep}
                          </div>
                        )}

                        {/* Footer & Transition Button */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 'auto',
                            paddingTop: '6px',
                            borderTop: '1px solid var(--border-subtle)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Calendar size={11} />
                            {op.appliedDate || 'UNSENT'}
                          </span>

                          {nextSt && (
                            <button
                              onClick={() => moveStatus(op.id, nextSt)}
                              title={`Advance to ${nextSt}`}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'transparent',
                                border: '1px solid var(--border-strong)',
                                color: 'var(--text-secondary)',
                                padding: '3px 8px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--signal-red)';
                                e.currentTarget.style.color = 'var(--signal-red)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-strong)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                            >
                              <span>ADVANCE</span>
                              <ArrowRight size={11} />
                            </button>
                          )}
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
