import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, RefreshCw, AlertTriangle, Cpu } from 'lucide-react';
import { JobCard } from '../components/jobs/JobCard';
import { JobDetailModal } from '../components/jobs/JobDetailModal';
import { JobFilterBar, type FilterState } from '../components/jobs/JobFilterBar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getJobs, syncJobs } from '../services/jobs/jobApi';
import type { JobTarget } from '../data/mockJobs';

export const IntelFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobTarget[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobTarget | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    workplace: 'ALL',
    minMatch: 0,
    priority: 'ALL',
    sortBy: 'MATCH',
  });

  const loadJobs = useCallback(async (currentFilters: FilterState) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getJobs({
        searchQuery: currentFilters.searchQuery,
        workplace: currentFilters.workplace,
        minMatch: currentFilters.minMatch,
        priority: currentFilters.priority,
        sortBy: currentFilters.sortBy,
        limit: 50,
      });

      if (response && response.jobs) {
        setJobs(response.jobs);
        setTotalJobs(response.total);
      } else {
        setJobs([]);
        setTotalJobs(0);
      }
    } catch (err: any) {
      console.error('[INTEL FEED ERROR] Failed to fetch backend jobs:', err?.message);
      setError('COMM LINK OFFLINE // UNABLE TO RETRIEVE TARGETS FROM BACKEND DATABASE');
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch real jobs when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      loadJobs(filters);
    }, 250);
    return () => clearTimeout(timer);
  }, [filters, loadJobs]);

  // Sync fresh opportunities from Himalayas external source
  const handleRefreshSignals = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      await syncJobs(20);
      await loadJobs(filters);
    } catch (err: any) {
      console.error('[INTEL FEED ERROR] Job sync failed:', err?.message);
      setError('RECONNAISSANCE SWEEP FAILED // EXTERNAL INGESTION TIMED OUT');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleSave = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(225, 29, 56, 0.15)',
              border: '1px solid var(--signal-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--signal-red)',
            }}
          >
            <Radio size={16} />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              DISCOVERED TARGET OPPORTUNITIES
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
              }}
            >
              REAL-TIME RECONNAISSANCE MATRIX // {jobs.length} OF {totalJobs} TARGETS RETRIEVED FROM DATABASE
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="ONLINE" size="xs">
            MONGODB SYNCED
          </Badge>

          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw size={13} />}
            isLoading={isSyncing}
            onClick={handleRefreshSignals}
          >
            REFRESH SIGNALS
          </Button>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <JobFilterBar
        filters={filters}
        onChange={(up) => setFilters((prev) => ({ ...prev, ...up }))}
        totalFiltered={jobs.length}
        totalAvailable={totalJobs}
      />

      {/* Loading State */}
      {isLoading && (
        <Card
          className="scanline-active signal-glow"
          padding="lg"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(12, 12, 15, 0.9)',
            border: '1px solid var(--border-strong)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Cpu size={32} color="var(--signal-red)" />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              INTERROGATING BACKEND DATABASE // RETRIEVING LIVE REQUISITIONS...
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              Querying MongoDB cluster via REST API
            </span>
          </div>
        </Card>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <Card
          padding="lg"
          hasBrackets
          style={{
            backgroundColor: 'rgba(225, 29, 56, 0.08)',
            border: '1px solid var(--signal-red)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={36} color="var(--signal-red)" />
            <div>
              <h3
                style={{
                  margin: '0 0 6px 0',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--signal-red)',
                }}
              >
                {error}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Verify that the backend Express server is running on http://localhost:5000.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={<RefreshCw size={13} />}
              onClick={() => loadJobs(filters)}
            >
              RETRY CONNECTION
            </Button>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && jobs.length === 0 && (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'rgba(12, 12, 15, 0.5)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              margin: '0 0 12px 0',
            }}
          >
            NO TARGET REQUISITIONS MATCHED THE CURRENT CRITERIA IN MONGODB
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setFilters({
                searchQuery: '',
                workplace: 'ALL',
                minMatch: 0,
                priority: 'ALL',
                sortBy: 'MATCH',
              })
            }
          >
            RESET ALL FILTERS
          </Button>
        </div>
      )}

      {/* Real Jobs Grid */}
      {!isLoading && !error && jobs.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}
        >
          {jobs.map((job) => (
            <JobCard
              key={job.id || (job as any)._id}
              job={job}
              onViewTarget={(j) => setSelectedJobForModal(j)}
              onToggleSave={handleToggleSave}
              onForgeResume={(j) => navigate('/identity-forge', { state: { selectedJob: j } })}
            />
          ))}
        </div>
      )}

      {/* Target Detail Modal */}
      <JobDetailModal
        job={selectedJobForModal}
        isOpen={Boolean(selectedJobForModal)}
        onClose={() => setSelectedJobForModal(null)}
        onJobAnalyzed={(jobId, score) => {
          setJobs((prev) =>
            prev.map((j) => (j.id === jobId || (j as any)._id === jobId ? { ...j, matchPercentage: score } : j))
          );
          if (selectedJobForModal && (selectedJobForModal.id === jobId || (selectedJobForModal as any)._id === jobId)) {
            setSelectedJobForModal((prev) => (prev ? { ...prev, matchPercentage: score } : null));
          }
        }}
      />
    </div>
  );
};

export default IntelFeedPage;
