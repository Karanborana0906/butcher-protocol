import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Flame,
  ShieldCheck,
  Kanban,
  ArrowRight,
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { JobCard } from '../components/jobs/JobCard';
import { JobDetailModal } from '../components/jobs/JobDetailModal';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { INITIAL_MOCK_JOBS, type JobTarget } from '../data/mockJobs';
import { SYSTEM_TELEMETRY } from '../data/mockIntel';

export const CommandCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobTarget[]>(INITIAL_MOCK_JOBS);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobTarget | null>(null);

  const handleToggleSave = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  // High priority targets (>= 88% match)
  const highPriorityTargets = jobs.filter((j) => j.matchPercentage >= 88);
  // Recent discoveries (first 4 jobs)
  const recentIntelTargets = jobs.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 4 Core Intelligence Telemetry Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        <StatCard
          label="TARGETS ACQUIRED"
          value={SYSTEM_TELEMETRY.targetsAcquired}
          subvalue="+6 TODAY"
          variant="red"
          icon={<Target size={18} />}
          footerNote="Active reconnaissance on tech wire"
          onClick={() => navigate('/intel-feed')}
        />

        <StatCard
          label="HIGH MATCH TARGETS"
          value={SYSTEM_TELEMETRY.highMatchTargets}
          subvalue=">= 85% COMPATIBILITY"
          variant="amber"
          icon={<Flame size={18} />}
          footerNote="Deterministic match threshold passed"
          onClick={() => navigate('/intel-feed')}
        />

        <StatCard
          label="ATS READINESS"
          value={`${SYSTEM_TELEMETRY.atsReadinessEstimate}%`}
          subvalue="ESTIMATE"
          variant="green"
          icon={<ShieldCheck size={18} />}
          footerNote="INTERNAL COMPATIBILITY ESTIMATE"
          onClick={() => navigate('/protocol-scan')}
        />

        <StatCard
          label="ACTIVE OPERATIONS"
          value={SYSTEM_TELEMETRY.activeOperations}
          subvalue="2 INTERVIEWS"
          variant="blue"
          icon={<Kanban size={18} />}
          footerNote="Applications in pipeline"
          onClick={() => navigate('/operations')}
        />
      </div>

      {/* QUICK ACTIONS BAR */}
      <QuickActions
        onScanTriggered={() => {
          // Re-sort or simulate update
          setJobs((prev) => [...prev]);
        }}
      />

      {/* Main Grid: High Priority Targets & Live Reconnaissance */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left Column: High Priority Targets Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                HIGH PRIORITY TARGETS ({highPriorityTargets.length})
              </h2>
            </div>

            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowRight size={13} />}
              iconPosition="right"
              onClick={() => navigate('/intel-feed')}
            >
              VIEW ALL TARGETS
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {highPriorityTargets.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewTarget={(j) => setSelectedJobForModal(j)}
                onToggleSave={handleToggleSave}
                onForgeResume={(j) => navigate('/identity-forge', { state: { selectedJob: j } })}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Recent Discovered Intel Feed & Live Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'var(--intel-blue)',
                  borderRadius: '1px',
                }}
              />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                INTEL FEED DISCOVERIES
              </h2>
            </div>

            <Badge variant="ONLINE" size="xs">
              LIVE SIGNALS
            </Badge>
          </div>

          {/* Quick Recent Signals Feed */}
          <Card padding="none" headerLabel="RECENT SYSTEM SIGNALS">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SYSTEM_TELEMETRY.recentSignals.map((sig, idx) => (
                <div
                  key={sig.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom:
                      idx < SYSTEM_TELEMETRY.recentSignals.length - 1
                        ? '1px solid var(--border-subtle)'
                        : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    backgroundColor: idx % 2 === 0 ? 'rgba(5, 5, 6, 0.3)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {sig.title}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {sig.timestamp}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {sig.details}
                    </p>
                  </div>

                  <Badge variant={sig.priority} size="xs">
                    {sig.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Recent Discoveries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {recentIntelTargets.slice(2, 4).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewTarget={(j) => setSelectedJobForModal(j)}
                onToggleSave={handleToggleSave}
                onForgeResume={(j) => navigate('/identity-forge', { state: { selectedJob: j } })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Target Detail Modal */}
      <JobDetailModal
        job={selectedJobForModal}
        isOpen={Boolean(selectedJobForModal)}
        onClose={() => setSelectedJobForModal(null)}
      />
    </div>
  );
};
