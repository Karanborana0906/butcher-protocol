import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { Button } from '../ui/Button';
import {
  MapPin,
  Globe,
  DollarSign,
  Clock,
  Sparkles,
  ScanLine,
  CheckCircle2,
  ExternalLink,
  Cpu,
  AlertTriangle,
} from 'lucide-react';
import type { JobTarget } from '../../data/mockJobs';
import { analyzeJobTarget, type JobAnalysisResult } from '../../services/jobs/jobApi';

interface JobDetailModalProps {
  job: JobTarget | null;
  isOpen: boolean;
  onClose: () => void;
  onJobAnalyzed?: (jobId: string, matchScore: number) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onJobAnalyzed,
}) => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Reset analysis cache when opening a different job
  useEffect(() => {
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsAnalyzing(false);
  }, [job?.id]);

  if (!job) return null;

  const currentScore = analysisResult ? analysisResult.matchScore : job.matchPercentage;
  const isScored = analysisResult !== null || job.matchPercentage > 0;

  const handleAnalyzeJob = async () => {
    if (!job) return;
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const targetId = job.id || (job as any)._id;
      const res = await analyzeJobTarget(targetId);

      if (res && res.success && res.analysis) {
        setAnalysisResult(res.analysis);
        if (onJobAnalyzed) {
          onJobAnalyzed(targetId, res.analysis.matchScore);
        }
      } else {
        setAnalysisError(res.error || 'Failed to analyze target requisition.');
      }
    } catch (err: any) {
      console.error('[ANALYSIS ERROR] Job analysis failed:', err);
      setAnalysisError(err?.message || 'Error communicating with Gemma 4 analysis core.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`CLASSIFIED DOSSIER // ${job.id}`}
      subtitle={`TARGET ENTITY: ${job.company.toUpperCase()}`}
      maxWidth="760px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Summary */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            backgroundColor: 'rgba(5, 5, 6, 0.4)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Badge variant={job.priority} size="xs">
                {job.priority} PRIORITY
              </Badge>
              <Badge variant="DEFAULT" size="xs">
                {job.source}
              </Badge>
              {analysisResult && (
                <Badge variant="CRITICAL" size="xs">
                  GEMMA 4 31B IT
                </Badge>
              )}
            </div>

            <h2
              style={{
                margin: '0 0 6px 0',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              {job.title}
            </h2>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                marginTop: '10px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="var(--signal-red)" />
                {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={13} color="var(--intel-blue)" />
                {job.workplaceType}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign size={13} color="var(--success-green)" />
                {job.salary}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} color="var(--text-muted)" />
                {job.postedDate}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProgressRing
              percentage={currentScore}
              size={82}
              strokeWidth={6}
              sublabel="MATCH"
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: analysisResult ? 'var(--signal-red)' : 'var(--text-muted)',
                marginTop: '6px',
                letterSpacing: '0.06em',
                fontWeight: analysisResult ? 700 : 400,
              }}
            >
              {analysisResult
                ? 'AI ANALYSIS'
                : isScored
                ? 'DETERMINISTIC'
                : 'UNSCORED'}
            </span>
          </div>
        </div>

        {/* Loading State during Gemma Inference */}
        {isAnalyzing && (
          <div
            className="scanline-active signal-glow"
            style={{
              padding: '16px',
              textAlign: 'center',
              backgroundColor: 'rgba(225, 29, 56, 0.08)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Cpu size={24} color="var(--signal-red)" />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              INTERROGATING TARGET REQUISITION // GEMMA 4 31B IT INFERENCE IN PROGRESS...
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
              }}
            >
              Analyzing candidate profile against requisition requirements via Gemini API
            </span>
          </div>
        )}

        {/* Error Display */}
        {analysisError && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(225, 29, 56, 0.1)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <AlertTriangle size={18} color="var(--signal-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--signal-red)',
                  marginBottom: '2px',
                }}
              >
                AI ANALYSIS ERROR
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {analysisError}
              </div>
            </div>
          </div>
        )}

        {/* Real Gemma 4 31B IT Career Intelligence Dossier */}
        {analysisResult && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: 'rgba(225, 29, 56, 0.05)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(225, 29, 56, 0.2)',
                paddingBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} color="var(--signal-red)" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}
                >
                  GEMMA 4 31B IT // CAREER INTELLIGENCE DOSSIER
                </span>
              </div>
              <Badge variant="CRITICAL" size="xs">
                AI ANALYSIS COMPLETE
              </Badge>
            </div>

            {/* AI Summary */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                TARGET ASSESSMENT SUMMARY
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {analysisResult.summary}
              </p>
            </div>

            {/* Matched Skills */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--success-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '6px',
                }}
              >
                <CheckCircle2 size={12} />
                MATCHED SKILLS ({analysisResult.matchedSkills.length})
              </span>
              {analysisResult.matchedSkills.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysisResult.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        backgroundColor: 'rgba(0, 230, 153, 0.1)',
                        border: '1px solid var(--success-green)',
                        color: 'var(--success-green)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '2px 8px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  No overlapping candidate competencies found in profile.
                </span>
              )}
            </div>

            {/* Missing Skills */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--warning-amber)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '6px',
                }}
              >
                <AlertTriangle size={12} />
                REQUISITION SKILL GAPS ({analysisResult.missingSkills.length})
              </span>
              {analysisResult.missingSkills.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {analysisResult.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        backgroundColor: 'rgba(255, 179, 0, 0.1)',
                        border: '1px solid var(--warning-amber)',
                        color: 'var(--warning-amber)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '2px 8px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  All required requisition skills verified in candidate profile.
                </span>
              )}
            </div>

            {/* Tactical Recommendation */}
            <div
              style={{
                backgroundColor: 'rgba(5, 5, 6, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--signal-red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                TACTICAL RECOMMENDATION
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.84rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}
              >
                {analysisResult.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Operational Overview */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '8px',
            }}
          >
            TARGET SUMMARY
          </h4>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {job.description}
          </p>
        </div>

        {/* Key Requisition Requirements */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '10px',
            }}
          >
            CRITICAL REQUISITION REQUIREMENTS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {job.requirements.map((req, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.84rem',
                  color: 'var(--text-primary)',
                  backgroundColor: 'rgba(19, 19, 24, 0.4)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <CheckCircle2 size={15} color="var(--signal-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL MATRIX */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '8px',
            }}
          >
            EXTRACTED SKILL MATRIX
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {job.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(31, 31, 38, 0.7)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  color: 'var(--text-primary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <Button
            variant="ghost"
            onClick={onClose}
          >
            DISMISS
          </Button>

          <Button
            variant="secondary"
            icon={<ScanLine size={15} />}
            isLoading={isAnalyzing}
            onClick={handleAnalyzeJob}
          >
            {isAnalyzing ? 'ANALYZING TARGET...' : 'ANALYZE TARGET (GEMMA 4)'}
          </Button>

          {job.applicationUrl && (
            <Button
              variant="secondary"
              icon={<ExternalLink size={14} />}
              onClick={() => window.open(job.applicationUrl, '_blank', 'noopener,noreferrer')}
            >
              APPLY ON SOURCE
            </Button>
          )}

          <Button
            variant="primary"
            icon={<Sparkles size={15} />}
            onClick={() => {
              onClose();
              navigate('/identity-forge', { state: { selectedJob: job } });
            }}
          >
            INITIALIZE FORGE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

