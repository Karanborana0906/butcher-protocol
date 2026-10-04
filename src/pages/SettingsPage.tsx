import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Shield, Cpu, Key, CheckCircle2 } from 'lucide-react';
import { GEMMA_MODEL_IDENTIFIER } from '../services/ai/prompts';

export const SettingsPage: React.FC = () => {
  const [telemetryActive, setTelemetryActive] = useState(true);
  const [integrityEnforced, setIntegrityEnforced] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            SYSTEM SETTINGS // ARCHITECTURE CONFIGURATION
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            AI SERVICE BOUNDARIES // GEMMA 4 31B IT MODEL CONFIGURATION // PHASE 1
          </p>
        </div>

        {savedSuccess && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--success-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={14} />
            PARAMETERS SYNCHRONIZED
          </span>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* GEMMA 4 MODEL ARCHITECTURE SPECIFICATION */}
        <Card headerLabel="1. TARGET AI INFERENCE MODEL" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(225, 29, 56, 0.15)',
                  border: '1px solid var(--signal-red)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--signal-red)',
                }}
              >
                <Cpu size={20} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  Gemma 4 31B IT
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--signal-red)',
                    display: 'block',
                  }}
                >
                  IDENTIFIER: {GEMMA_MODEL_IDENTIFIER}
                </span>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              Planned model architecture for Phase 3 via Gemini API. Model handles structured requirement extraction, keyword gap analysis, and tailored resume rewriting.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(5, 5, 6, 0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Target Parameter Size:</span>
                <span style={{ color: 'var(--text-primary)' }}>31 Billion (Instruct Tuned)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Inference Output:</span>
                <span style={{ color: 'var(--success-green)' }}>Strict JSON Schema</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Deterministic Scoring:</span>
                <span style={{ color: 'var(--intel-blue)' }}>Application Logic Managed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* SECURITY & ISOLATION BOUNDARY */}
        <Card headerLabel="2. SECURITY & BOUNDARY ISOLATION" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={18} color="var(--warning-amber)" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                API KEY EXCLUSION DIRECTIVE
              </span>
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <code style={{ color: 'var(--signal-red)', fontFamily: 'var(--font-mono)' }}>GEMINI_API_KEY</code> is isolated on server-only routes. Browser client modules never receive or bundle this credential.
            </p>

            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(47, 191, 113, 0.08)',
                border: '1px solid rgba(47, 191, 113, 0.3)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--success-green)',
              }}
            >
              <Shield size={16} />
              <span>SERVER-ONLY GUARD ACTIVE // CLIENT ISOLATED</span>
            </div>
          </div>
        </Card>

        {/* TELEMETRY & ETHICAL PROTOCOLS */}
        <Card headerLabel="3. ETHICAL PROTOCOLS & TELEMETRY" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                  }}
                >
                  ZERO FABRICATION ENFORCEMENT
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Reject generation of unearned degrees or fake employers
                </span>
              </div>
              <input
                type="checkbox"
                checked={integrityEnforced}
                onChange={(e) => setIntegrityEnforced(e.target.checked)}
                style={{ accentColor: 'var(--signal-red)', cursor: 'pointer', transform: 'scale(1.2)' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                  }}
                >
                  RECONNAISSANCE TELEMETRY
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Continuous signal synchronization with intel feeds
                </span>
              </div>
              <input
                type="checkbox"
                checked={telemetryActive}
                onChange={(e) => setTelemetryActive(e.target.checked)}
                style={{ accentColor: 'var(--signal-red)', cursor: 'pointer', transform: 'scale(1.2)' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                  }}
                >
                  INTERNAL ATS ESTIMATE BADGE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Enforce disclaimer on all compatibility estimates
                </span>
              </div>
              <Badge variant="ONLINE" size="xs">
                MANDATORY
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
        <Button variant="primary" size="md" onClick={handleSave}>
          APPLY CONFIGURATION
        </Button>
      </div>
    </div>
  );
};
