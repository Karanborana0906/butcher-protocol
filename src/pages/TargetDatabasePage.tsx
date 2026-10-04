import React, { useState } from 'react';
import { Eye, Sparkles, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { JobDetailModal } from '../components/jobs/JobDetailModal';
import { INITIAL_MOCK_JOBS, type JobTarget } from '../data/mockJobs';
import { useNavigate } from 'react-router-dom';

export const TargetDatabasePage: React.FC = () => {
  const navigate = useNavigate();
  const [savedTargets, setSavedTargets] = useState<JobTarget[]>(
    INITIAL_MOCK_JOBS.filter((j) => j.isSaved)
  );
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobTarget | null>(null);

  const filtered = savedTargets.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRemove = (id: string) => {
    setSavedTargets((prev) => prev.filter((j) => j.id !== id));
  };

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
            TARGET DATABASE // CLASSIFIED REPOSITORY
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            ENCRYPTED ARCHIVE OF SAVED TARGET OPPORTUNITIES AND ARCHIVED REQUISITIONS
          </p>
        </div>

        <Badge variant="ONLINE" size="xs">
          ENCRYPTED VAULT // {savedTargets.length} TARGETS
        </Badge>
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
        }}
      >
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH SAVED TARGET DATABASE..."
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
          }}
        />
      </div>

      {/* Target Table/List */}
      {filtered.length === 0 ? (
        <Card padding="lg" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              margin: '0 0 12px 0',
            }}
          >
            NO SAVED TARGETS FOUND IN ARCHIVE
          </p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/intel-feed')}>
            RECONNAISSANCE INTEL FEED
          </Button>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((job) => (
            <Card
              key={job.id}
              padding="md"
              hasBrackets
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '280px' }}>
                <ProgressRing percentage={job.matchPercentage} size={54} strokeWidth={4} />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {job.id}
                    </span>
                    <Badge variant={job.priority} size="xs">
                      {job.priority}
                    </Badge>
                  </div>
                  <h4
                    style={{
                      margin: '0 0 2px 0',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {job.title}
                  </h4>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      color: 'var(--signal-red)',
                    }}
                  >
                    {job.company} — {job.location} ({job.workplaceType})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Eye size={13} />}
                  onClick={() => setSelectedJob(job)}
                >
                  VIEW DOSSIER
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  icon={<Sparkles size={13} />}
                  onClick={() => navigate('/identity-forge', { state: { selectedJob: job } })}
                >
                  FORGE RESUME
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(job.id)}
                >
                  UNARCHIVE
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Target Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};
