import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, CheckCircle2, RefreshCw, Cpu, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ResumeDocument } from './ResumeDocument';
import { tailorResumeTarget, getJobs } from '../../services/jobs/jobApi';
import type { ResumeGeneration } from '../../services/ai/types';
import { INITIAL_MOCK_JOBS, type JobTarget } from '../../data/mockJobs';

export type ForgeStep = 'DOCUMENT_SELECTED' | 'ANALYZING_TARGET' | 'FORGING_RESUME' | 'IDENTITY_READY';

interface ForgeWorkflowProps {
  initialJob?: JobTarget | null;
}

export const ForgeWorkflow: React.FC<ForgeWorkflowProps> = ({ initialJob }) => {
  const [availableJobs, setAvailableJobs] = useState<JobTarget[]>(
    initialJob ? [initialJob] : INITIAL_MOCK_JOBS
  );
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialJob ? initialJob.id : INITIAL_MOCK_JOBS[0].id
  );
  const [selectedBaseResume, setSelectedBaseResume] = useState<string>('RESUME-MASTER-AI-2026');
  const [currentStep, setCurrentStep] = useState<ForgeStep>('DOCUMENT_SELECTED');
  const [forgedResume, setForgedResume] = useState<ResumeGeneration | null>(null);
  const [isForging, setIsForging] = useState<boolean>(false);
  const [forgeError, setForgeError] = useState<string | null>(null);

  // Load real jobs from backend MongoDB
  useEffect(() => {
    let isMounted = true;
    getJobs({ limit: 50 })
      .then((res) => {
        if (!isMounted) return;
        if (res && res.jobs && res.jobs.length > 0) {
          const list = [...res.jobs];
          if (initialJob && !list.some((j) => j.id === initialJob.id)) {
            list.unshift(initialJob);
          }
          setAvailableJobs(list);
          if (!selectedJobId || !list.some((j) => j.id === selectedJobId)) {
            setSelectedJobId(initialJob ? initialJob.id : list[0].id);
          }
        }
      })
      .catch((err) => {
        console.warn('[FORGE WORKFLOW] Using fallback jobs:', err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, [initialJob, selectedJobId]);

  const selectedTarget =
    availableJobs.find((j) => j.id === selectedJobId) ||
    initialJob ||
    availableJobs[0] ||
    INITIAL_MOCK_JOBS[0];

  const handleStartForge = async () => {
    setIsForging(true);
    setForgeError(null);
    setCurrentStep('ANALYZING_TARGET');

    try {
      // Step 2: Target Intelligence Analysis
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCurrentStep('FORGING_RESUME');

      // Call real backend Gemma 4 31B IT resume tailoring endpoint
      const targetId = selectedTarget.id || (selectedTarget as any)._id;
      const result = await tailorResumeTarget(targetId);

      if (result && result.success && result.resume) {
        setForgedResume(result.resume);
        setCurrentStep('IDENTITY_READY');
      } else {
        throw new Error(result.error || 'Failed to synthesize tailored resume');
      }
    } catch (err: any) {
      console.error('[FORGE WORKFLOW ERROR] Tailoring failed:', err);
      setForgeError(err?.message || 'Error communicating with Gemma 4 tailored resume engine.');
      setCurrentStep('DOCUMENT_SELECTED');
    } finally {
      setIsForging(false);
    }
  };

  const stepsList: { key: ForgeStep; label: string; desc: string }[] = [
    { key: 'DOCUMENT_SELECTED', label: '1. DOCUMENT SELECTED', desc: 'Base profile & target locked' },
    { key: 'ANALYZING_TARGET', label: '2. ANALYZING TARGET', desc: 'Extracting requirement vectors' },
    { key: 'FORGING_RESUME', label: '3. FORGING RESUME', desc: 'Synthesizing verified credentials' },
    { key: 'IDENTITY_READY', label: '4. IDENTITY READY', desc: 'Tailored dossier ready for export' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Workflow Progress Tracker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          backgroundColor: 'rgba(12, 12, 15, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px',
        }}
      >
        {stepsList.map((st, idx) => {
          const isActive = currentStep === st.key;
          const isPassed =
            (currentStep === 'ANALYZING_TARGET' && idx === 0) ||
            (currentStep === 'FORGING_RESUME' && idx <= 1) ||
            (currentStep === 'IDENTITY_READY' && idx <= 2);

          return (
            <div
              key={st.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive
                  ? 'rgba(225, 29, 56, 0.12)'
                  : isPassed
                  ? 'rgba(47, 191, 113, 0.08)'
                  : 'rgba(19, 19, 24, 0.4)',
                border: '1px solid',
                borderColor: isActive
                  ? 'var(--signal-red)'
                  : isPassed
                  ? 'var(--success-green)'
                  : 'var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: isActive
                      ? 'var(--signal-red)'
                      : isPassed
                      ? 'var(--success-green)'
                      : 'var(--text-muted)',
                  }}
                >
                  {st.label}
                </span>
                {isPassed && <CheckCircle2 size={13} color="var(--success-green)" />}
                {isActive && isForging && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--signal-red)',
                      animation: 'pulseDot 1s infinite',
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                }}
              >
                {st.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Error Alert Banner */}
      {forgeError && (
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: 'rgba(225, 29, 56, 0.1)',
            border: '1px solid var(--signal-red)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AlertTriangle size={20} color="var(--signal-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--signal-red)',
                marginBottom: '4px',
              }}
            >
              FORGE ENGINE EXECUTION ERROR
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
              }}
            >
              {forgeError}
            </div>
          </div>
        </div>
      )}

      {/* Target & Document Selectors */}
      {currentStep !== 'IDENTITY_READY' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Base Document Selection Card */}
          <Card headerLabel="1. BASE CREDENTIAL SOURCE" padding="md">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '14px',
              }}
            >
              Select the verified baseline profile to tailor. The forge engine will reorder and emphasize genuine qualifications without synthesizing false credentials.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  id: 'RESUME-MASTER-AI-2026',
                  title: 'AI Systems & GPU Runtime Dossier',
                  details: 'Full stack: CUDA, PyTorch, vLLM, Distributed Systems (Verified 2026)',
                },
                {
                  id: 'RESUME-RESEARCH-2026',
                  title: 'Machine Learning Infrastructure & Research',
                  details: 'Focus: Multi-node scaling, Megatron-LM, FSDP benchmarks',
                },
              ].map((res) => (
                <div
                  key={res.id}
                  onClick={() => setSelectedBaseResume(res.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor:
                      selectedBaseResume === res.id ? 'rgba(225, 29, 56, 0.1)' : 'rgba(19, 19, 24, 0.6)',
                    border: '1px solid',
                    borderColor:
                      selectedBaseResume === res.id ? 'var(--signal-red)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <FileText
                    size={18}
                    color={selectedBaseResume === res.id ? 'var(--signal-red)' : 'var(--text-muted)'}
                    style={{ marginTop: '2px', flexShrink: 0 }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {res.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        marginTop: '3px',
                      }}
                    >
                      {res.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Target Job Selection Card */}
          <Card headerLabel="2. TARGET REQUISITION" padding="md">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '14px',
              }}
            >
              Choose which discovered target requisition you are tailoring against.
            </p>

            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              aria-label="Select target requisition"
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
                marginBottom: '14px',
              }}
            >
              {availableJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.id} — {j.title} ({j.company}) [{j.matchPercentage}% Match]
                </option>
              ))}
            </select>

            {/* Target preview summary */}
            <div
              style={{
                backgroundColor: 'rgba(5, 5, 6, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {selectedTarget.company}
                </span>
                <Badge variant={selectedTarget.priority} size="xs">
                  {selectedTarget.matchPercentage}% MATCH
                </Badge>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                {selectedTarget.location} // {selectedTarget.workplaceType} // {selectedTarget.salary}
              </div>

              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                }}
              >
                {selectedTarget.description}
              </p>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="primary"
                size="md"
                isLoading={isForging}
                icon={<Sparkles size={16} />}
                onClick={handleStartForge}
              >
                EXECUTE FORGE PIPELINE
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Forging Animation State */}
      {isForging && (
        <Card
          className="scanline-active signal-glow"
          padding="lg"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(12, 12, 15, 0.9)',
            border: '1px solid var(--signal-red)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <Cpu size={36} color="var(--signal-red)" />
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
              }}
            >
              {currentStep === 'ANALYZING_TARGET'
                ? 'ANALYZING TARGET REQUISITION WITH GEMMA 4 ARCHITECTURE...'
                : 'FORGING VERIFIED TAILORED RESUME DOSSIER...'}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              Zero fabrication policy active. Re-aligning genuine candidate experience with {selectedTarget.company} criteria.
            </p>
          </div>
        </Card>
      )}

      {/* Result: Tailored Resume Preview */}
      {currentStep === 'IDENTITY_READY' && forgedResume && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button
              variant="secondary"
              size="sm"
              icon={<RefreshCw size={13} />}
              onClick={handleStartForge}
            >
              RE-FORGE FOR TARGET
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep('DOCUMENT_SELECTED')}
            >
              SELECT ANOTHER TARGET
            </Button>
          </div>

          <ResumeDocument resume={forgedResume} onUpdate={(up) => setForgedResume(up)} />
        </div>
      )}
    </div>
  );
};
