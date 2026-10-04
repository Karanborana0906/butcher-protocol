import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Radio,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressRing } from '../components/ui/ProgressRing';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        position: 'relative',
        overflowX: 'hidden',
      }}
      className="bg-tactical-grid"
    >
      {/* Ambient Red Glow in Background */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(225, 29, 56, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Navigation Header */}
      <header
        style={{
          height: '70px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(5, 5, 6, 0.85)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(225, 29, 56, 0.15)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--signal-red)',
            }}
          >
            <Target size={18} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
              }}
            >
              BUTCHER PROTOCOL
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: 'var(--signal-red)',
              }}
            >
              AI-POWERED CAREER INTELLIGENCE SYSTEM
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Badge variant="ONLINE" size="sm" pulse>
            PROTOCOL ONLINE
          </Badge>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/login')}
          >
            OPERATOR LOGIN
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '80px 24px 60px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Model Readiness Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            backgroundColor: 'rgba(19, 19, 24, 0.9)',
            border: '1px solid var(--border-strong)',
            borderRadius: '20px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--signal-red)',
              boxShadow: '0 0 8px var(--signal-red)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
            }}
          >
            TARGET MODEL: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>gemma-4-31b-it</span> READY
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1.08,
            margin: '0 0 16px 0',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
          }}
        >
          BUTCHER PROTOCOL
        </h1>

        {/* Subtitle */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: 'var(--signal-red)',
            margin: '0 0 24px 0',
            textTransform: 'uppercase',
          }}
        >
          AI-POWERED CAREER INTELLIGENCE SYSTEM
        </h2>

        {/* Supporting text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 0 36px 0',
          }}
        >
          A career intelligence system that discovers opportunities, analyzes job requirements, helps tailor resumes, and tracks applications.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            INITIALIZE PROTOCOL
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<Radio size={18} />}
            onClick={() => navigate('/intel-feed')}
          >
            VIEW INTELLIGENCE
          </Button>
        </div>

        {/* Radar & Floating Intelligence Preview Card */}
        <div
          style={{
            marginTop: '64px',
            width: '100%',
            maxWidth: '1000px',
            position: 'relative',
          }}
        >
          <div
            className="tactical-brackets tactical-brackets-red"
            style={{
              backgroundColor: 'rgba(12, 12, 15, 0.95)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-sm)',
              padding: '28px',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(225, 29, 56, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {/* Live Signal Feed Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  SYSTEM RECONNAISSANCE
                </span>
                <Badge variant="ONLINE" size="xs">
                  48 TARGETS
                </Badge>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(5, 5, 6, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <ProgressRing percentage={96} size={64} strokeWidth={5} />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Apex Intelligence Labs
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--signal-red)',
                    }}
                  >
                    Staff AI Systems Engineer // CUDA & vLLM
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(5, 5, 6, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <ProgressRing percentage={92} size={64} strokeWidth={5} />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Vanguard Defense Systems
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--warning-amber)',
                    }}
                  >
                    Autonomous ML Pipeline Architect
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Directives List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                OPERATIONAL CAPABILITIES
              </div>

              {[
                {
                  title: 'TARGET RECONNAISSANCE',
                  desc: 'Continuous scanning of intelligence feeds filtered by exact technical stack requirements.',
                },
                {
                  title: 'ZERO-SYNTHESIS RESUME FORGE',
                  desc: 'Deterministic tailoring aligning genuine experience with zero fabricated credentials.',
                },
                {
                  title: 'PROTOCOL COMPATIBILITY SCAN',
                  desc: 'Internal applicant screening diagnostic matrix with keyword gap extraction.',
                },
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--signal-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {feat.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {feat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px 32px',
          backgroundColor: 'rgba(5, 5, 6, 0.95)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            BUTCHER PROTOCOL
          </span>
          <span style={{ color: 'var(--text-muted)' }}>//</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            PHASE 1 MVP // GEMMA 4 ARCHITECTURE READY
          </span>
        </div>

        <Badge variant="DEVELOPMENT" size="xs">
          DEVELOPMENT DATA // NO LIVE GEMINI CALLS
        </Badge>
      </footer>
    </div>
  );
};
