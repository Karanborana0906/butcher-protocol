import React, { useState } from 'react';
import {
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { aiClient } from '../../services/ai/aiClient';
import type { ATSAnalysis } from '../../services/ai/types';
import { INITIAL_MOCK_JOBS, type JobTarget } from '../../data/mockJobs';
import { useNavigate } from 'react-router-dom';

interface ScanDashboardProps {
  initialJob?: JobTarget | null;
}

export const ScanDashboard: React.FC<ScanDashboardProps> = ({ initialJob }) => {
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialJob ? initialJob.id : INITIAL_MOCK_JOBS[0].id
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ATSAnalysis | null>({
    atsReadiness: 84, // Internal compatibility estimate
    keywordCoverage: 89,
    skillMatch: 82,
    matchedSkills: [
      'Python',
      'PyTorch',
      'Distributed Systems',
      'Docker',
      'CUDA',
      'Kubernetes',
      'Linux Internals',
      'Model Evaluation',
    ],
    missingSkills: ['SQL', 'Scikit-learn', 'TensorRT-LLM', 'Ray Core'],
    recommendations: [
      'Highlight genuine relevant projects: Explicitly document multi-GPU training benchmarks in Project Hyperion.',
      'Detail data pipeline architectures: Clarify telemetry database querying to address SQL screening criteria.',
      'Improve keyword density: Seamlessly integrate latency SLA metrics into work experience summaries without keyword stuffing.',
    ],
    diagnosticNotes: [
      {
        category: 'PASSED',
        message: 'Primary technical stack (Python, PyTorch, Distributed Systems) strongly aligned with target requisitions.',
      },
      {
        category: 'OPTIMIZATION',
        message: 'Resume includes strong metrics, but could explicitly mention orchestration frameworks like Ray.',
      },
      {
        category: 'CRITICAL',
        message: 'Target mentions database query optimization; add genuine SQL profiling experience if applicable.',
      },
    ],
    disclaimer: 'INTERNAL COMPATIBILITY ESTIMATE',
    timestamp: new Date().toISOString(),
  });

  const selectedTarget = INITIAL_MOCK_JOBS.find((j) => j.id === selectedJobId) || INITIAL_MOCK_JOBS[0];

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      const res = await aiClient.analyzeATS({
        resumeId: 'RESUME-MASTER-AI-2026',
        jobId: selectedTarget.id,
        jobDescription: selectedTarget.description,
      });
      setScanResult(res);
    } catch {
      // Keep previous
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Target Selector & Scanner Launcher Header */}
      <Card
        padding="md"
        headerLabel="SCAN TARGET SELECTION // PROTOCOL MATRIX"
        headerAction={
          <Badge variant="ONLINE" size="xs">
            MATRIX READY
          </Badge>
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <label
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              ACTIVE TARGET REQUISITION
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              aria-label="Select target for protocol scan"
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {INITIAL_MOCK_JOBS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.id} — {j.title} ({j.company}) [{j.matchPercentage}% Compatibility]
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <Button
              variant="primary"
              size="md"
              icon={<ScanLine size={16} />}
              isLoading={isScanning}
              onClick={handleRunScan}
            >
              EXECUTE PROTOCOL SCAN
            </Button>
          </div>
        </div>
      </Card>

      {/* Scanning Active Overlay */}
      {isScanning && (
        <Card
          className="scanline-active signal-glow"
          padding="lg"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(12, 12, 15, 0.9)',
            border: '1px solid var(--signal-red)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <ScanLine size={36} color="var(--signal-red)" />
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
              }}
            >
              RUNNING DIAGNOSTIC PROTOCOL SCAN...
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              Extracting keyword distribution, skill matrices, and qualification vectors against {selectedTarget.company}.
            </p>
          </div>
        </Card>
      )}

      {/* Main Diagnostic Dashboard */}
      {!isScanning && scanResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top 3 Score Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Primary ATS Readiness Card */}
            <Card
              hasBrackets
              padding="md"
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'rgba(12, 12, 15, 0.85)',
                border: '1px solid var(--signal-red-dim)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--signal-red)',
                    }}
                  >
                    ATS READINESS
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    INTERNAL COMPATIBILITY ESTIMATE
                  </div>
                </div>
                <Badge variant="CRITICAL" size="xs">
                  ESTIMATE
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <ProgressRing
                  percentage={scanResult.atsReadiness}
                  size={92}
                  strokeWidth={7}
                  colorScheme="signal"
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    High Screening Probability
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                    }}
                  >
                    Dossier contains 84% estimated structural alignment with applicant screening filters.
                  </p>
                </div>
              </div>
            </Card>

            {/* Keyword Coverage Card */}
            <Card padding="md">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                  }}
                >
                  KEYWORD COVERAGE
                </span>
                <Badge variant="ONLINE" size="xs">
                  DENSE
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <ProgressRing
                  percentage={scanResult.keywordCoverage}
                  size={92}
                  strokeWidth={7}
                  colorScheme="success"
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    89% Keyword Alignment
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                    }}
                  >
                    Core systems architecture vocabulary correctly mirrors requisition wording.
                  </p>
                </div>
              </div>
            </Card>

            {/* Skill Match Card */}
            <Card padding="md">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                  }}
                >
                  SKILL MATCH
                </span>
                <Badge variant="HIGH" size="xs">
                  STRONG
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <ProgressRing
                  percentage={scanResult.skillMatch}
                  size={92}
                  strokeWidth={7}
                  colorScheme="amber"
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    82% Direct Skill Overlap
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                    }}
                  >
                    8 of 10 primary competencies verified in candidate profile.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Diagnostic Panels Grid: Matched Skills vs Missing Skills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Matched Skills Panel */}
            <Card headerLabel="VERIFIED MATCHED SKILLS" padding="md">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {scanResult.matchedSkills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(47, 191, 113, 0.1)',
                      border: '1px solid rgba(47, 191, 113, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--success-green)',
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Missing Skills Panel */}
            <Card headerLabel="MISSING SKILLS & QUALIFICATION GAPS" padding="md">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {scanResult.missingSkills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(245, 165, 36, 0.1)',
                      border: '1px solid rgba(245, 165, 36, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--warning-amber)',
                    }}
                  >
                    <AlertTriangle size={13} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '8px',
                }}
              >
                Note: Address gaps only by highlighting genuine experience; do NOT invent skills you do not have.
              </div>
            </Card>
          </div>

          {/* Tactical Recommendations & Diagnostic Notes */}
          <Card headerLabel="OPTIMIZATION RECOMMENDATIONS & DIAGNOSTIC AUDIT" padding="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {scanResult.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      backgroundColor: 'rgba(19, 19, 24, 0.5)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Sparkles size={15} color="var(--signal-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.86rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {rec}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  SYSTEM DIAGNOSTIC LOGS
                </span>
                {scanResult.diagnosticNotes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      padding: '6px 10px',
                      borderRadius: '2px',
                      backgroundColor:
                        note.category === 'CRITICAL'
                          ? 'rgba(225, 29, 56, 0.08)'
                          : note.category === 'OPTIMIZATION'
                          ? 'rgba(245, 165, 36, 0.08)'
                          : 'rgba(47, 191, 113, 0.08)',
                      borderLeft: `3px solid ${
                        note.category === 'CRITICAL'
                          ? 'var(--signal-red)'
                          : note.category === 'OPTIMIZATION'
                          ? 'var(--warning-amber)'
                          : 'var(--success-green)'
                      }`,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color:
                          note.category === 'CRITICAL'
                            ? 'var(--signal-red)'
                            : note.category === 'OPTIMIZATION'
                            ? 'var(--warning-amber)'
                            : 'var(--success-green)',
                      }}
                    >
                      [{note.category}]
                    </span>
                    <span>{note.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Transition to Forge */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                STATUS: READY TO FORGE DOSSIER FOR {selectedTarget.company.toUpperCase()}
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
                onClick={() => navigate('/identity-forge', { state: { selectedJob: selectedTarget } })}
              >
                PROCEED TO IDENTITY FORGE
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
