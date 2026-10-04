import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Lock, Mail, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('operator@butcherprotocol.intel');
  const [password, setPassword] = useState('••••••••••••');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      nextErrors.email = 'OPERATOR IDENTIFIER OR EMAIL REQUIRED';
    } else if (!email.includes('@')) {
      nextErrors.email = 'INVALID OPERATOR EMAIL FORMAT';
    }
    if (!password.trim()) {
      nextErrors.password = 'SECURITY PASSPHRASE REQUIRED';
    } else if (password.length < 6) {
      nextErrors.password = 'PASSPHRASE MUST BE AT LEAST 6 CHARACTERS';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSessionSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 1100);
  };

  const handleCreateIdentity = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
      className="bg-tactical-grid"
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(225, 29, 56, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 2 }}>
        {/* Header Icon & Brand */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              backgroundColor: 'rgba(225, 29, 56, 0.15)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--signal-red)',
              marginBottom: '16px',
            }}
          >
            <Target size={24} />
          </div>

          <h1
            style={{
              margin: '0 0 6px 0',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            BUTCHER PROTOCOL
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              color: 'var(--signal-red)',
            }}
          >
            INITIALIZE OPERATOR SESSION
          </div>
        </div>

        {/* Login Panel */}
        <Card
          hasBrackets
          padding="lg"
          style={{
            backgroundColor: 'rgba(12, 12, 15, 0.95)',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(225, 29, 56, 0.08)',
          }}
        >
          {sessionSuccess ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle2 size={40} color="var(--success-green)" style={{ margin: '0 auto 12px' }} />
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  margin: '0 0 6px',
                }}
              >
                SESSION INITIALIZED
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                Routing to Command Center...
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Input
                label="OPERATOR IDENTIFIER / EMAIL"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<Mail size={15} />}
                placeholder="operator@protocol.intel"
                autoComplete="email"
              />

              <Input
                label="SECURITY PASSPHRASE"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<Lock size={15} />}
                placeholder="••••••••••••"
                autoComplete="current-password"
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                }}
              >
                <Badge variant="ONLINE" size="xs">
                  AUTH MATRIX ACTIVE
                </Badge>
                <span style={{ color: 'var(--text-muted)' }}>PHASE 1 MOCK AUTH</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  INITIALIZE SESSION
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  icon={<UserPlus size={16} />}
                  onClick={handleCreateIdentity}
                >
                  CREATE IDENTITY
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Return to Landing Page */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← RETURN TO INTELLIGENCE OVERVIEW
          </button>
        </div>
      </div>
    </div>
  );
};
