import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, Clock, Bookmark, Sparkles, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { Button } from '../ui/Button';
import type { JobTarget } from '../../data/mockJobs';

interface JobCardProps {
  job: JobTarget;
  onViewTarget: (job: JobTarget) => void;
  onToggleSave: (jobId: string) => void;
  onForgeResume?: (job: JobTarget) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewTarget,
  onToggleSave,
  onForgeResume,
}) => {
  const navigate = useNavigate();

  const handleForge = () => {
    if (onForgeResume) {
      onForgeResume(job);
    } else {
      navigate('/identity-forge', { state: { selectedJob: job } });
    }
  };

  return (
    <Card
      hasBrackets
      enableTilt
      variant="surface"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Target Acquired Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          paddingBottom: '10px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: job.priority === 'CRITICAL' ? 'var(--signal-red)' : 'var(--warning-amber)',
              borderRadius: '1px',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
            }}
          >
            TARGET ACQUIRED // {job.id}
          </span>
        </div>

        <Badge variant={job.priority} size="xs">
          {job.priority} PRIORITY
        </Badge>
      </div>

      {/* Main Content Layout with Match Ring */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: '0 0 4px 0',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </h3>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--signal-red)',
              letterSpacing: '0.04em',
              marginBottom: '10px',
            }}
          >
            {job.company}
          </div>

          {/* Metadata chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} color="var(--text-muted)" />
              {job.location}
            </span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={12} color="var(--text-muted)" />
              {job.workplaceType}
            </span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} color="var(--text-muted)" />
              {job.postedDate}
            </span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <ProgressRing
            percentage={job.matchPercentage}
            size={72}
            strokeWidth={5}
            sublabel="MATCH"
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
              letterSpacing: '0.05em',
            }}
          >
            COMPATIBILITY
          </span>
        </div>
      </div>

      {/* Brief Summary */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          margin: '0 0 16px 0',
          lineHeight: 1.45,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {job.description}
      </p>

      {/* SKILL MATRIX */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}
        >
          SKILL MATRIX
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {job.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                backgroundColor: 'rgba(31, 31, 38, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
                color: 'var(--text-primary)',
              }}
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                padding: '2px 4px',
              }}
            >
              +{job.skills.length - 5} MORE
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          icon={<Eye size={13} />}
          onClick={() => onViewTarget(job)}
        >
          VIEW TARGET
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles size={13} />}
          onClick={handleForge}
        >
          FORGE RESUME
        </Button>

        <button
          onClick={() => onToggleSave(job.id)}
          title={job.isSaved ? 'Target Saved' : 'Save Target'}
          aria-label={job.isSaved ? 'Saved target' : 'Save target'}
          style={{
            backgroundColor: job.isSaved ? 'rgba(225, 29, 56, 0.15)' : 'rgba(19, 19, 24, 0.6)',
            border: `1px solid ${job.isSaved ? 'var(--signal-red)' : 'var(--border-strong)'}`,
            color: job.isSaved ? 'var(--signal-red)' : 'var(--text-secondary)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            padding: '7px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          <Bookmark size={15} fill={job.isSaved ? 'var(--signal-red)' : 'none'} />
        </button>
      </div>
    </Card>
  );
};
