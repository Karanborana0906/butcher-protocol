import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  GraduationCap,
  Link as LinkIcon,
  Save,
  CheckCircle2,
  Shield,
  X,
} from 'lucide-react';
import { INITIAL_USER_PROFILE, type UserCareerProfile } from '../data/mockProfile';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserCareerProfile>(INITIAL_USER_PROFILE);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleRemoveSkill = (cat: keyof UserCareerProfile['skills'], skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [cat]: prev.skills[cat].filter((s) => s !== skillToRemove),
      },
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
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
            OPERATOR CAREER INTELLIGENCE DOSSIER
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            VERIFIED BASELINE DATA // USED BY DETERMINISTIC SCORING & RESUME FORGING
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isSaved && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--success-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <CheckCircle2 size={14} />
              PROFILE DOSSIER SAVED
            </span>
          )}

          <Button
            variant="primary"
            size="sm"
            icon={<Save size={14} />}
            onClick={handleSave}
          >
            COMMIT CHANGES
          </Button>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* PERSONAL SECTION */}
        <Card headerLabel="1. PERSONAL IDENTIFIER" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(225, 29, 56, 0.15)',
                  border: '1px solid var(--signal-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--signal-red)',
                }}
              >
                <Shield size={22} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: 'block',
                  }}
                >
                  {profile.personal.fullName}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--signal-red)',
                  }}
                >
                  {profile.personal.securityBadge} // {profile.personal.clearanceStatus}
                </span>
              </div>
            </div>

            <Input
              label="FULL NAME"
              value={profile.personal.fullName}
              onChange={(e) =>
                setProfile({ ...profile, personal: { ...profile.personal, fullName: e.target.value } })
              }
            />

            <Input
              label="COMMUNICATION EMAIL"
              type="email"
              value={profile.personal.email}
              onChange={(e) =>
                setProfile({ ...profile, personal: { ...profile.personal, email: e.target.value } })
              }
            />

            <Input
              label="PRIMARY LOCATION"
              value={profile.personal.location}
              onChange={(e) =>
                setProfile({ ...profile, personal: { ...profile.personal, location: e.target.value } })
              }
            />

            <div>
              <label
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                OPERATIONAL BIO / EXECUTIVE SUMMARY
              </label>
              <textarea
                rows={3}
                value={profile.personal.bio}
                onChange={(e) =>
                  setProfile({ ...profile, personal: { ...profile.personal, bio: e.target.value } })
                }
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </Card>

        {/* EDUCATION SECTION */}
        <Card headerLabel="2. ACADEMIC CREDENTIALS" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <GraduationCap size={18} color="var(--intel-blue)" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                VERIFIED HIGHER EDUCATION
              </span>
            </div>

            <Input
              label="DEGREE & MAJOR"
              value={profile.education.degree}
              onChange={(e) =>
                setProfile({ ...profile, education: { ...profile.education, degree: e.target.value } })
              }
            />

            <Input
              label="INSTITUTION / UNIVERSITY"
              value={profile.education.college}
              onChange={(e) =>
                setProfile({ ...profile, education: { ...profile.education, college: e.target.value } })
              }
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="GRADUATION YEAR"
                value={profile.education.graduationYear}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, graduationYear: e.target.value },
                  })
                }
              />

              <Input
                label="ACADEMIC HONORS / GPA"
                value={profile.education.gpa}
                onChange={(e) =>
                  setProfile({ ...profile, education: { ...profile.education, gpa: e.target.value } })
                }
              />
            </div>
          </div>
        </Card>

        {/* CAREER TARGETS */}
        <Card headerLabel="3. TACTICAL CAREER TARGETS" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                DESIRED ROLES
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {profile.careerTargets.desiredRoles.map((role, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      backgroundColor: 'rgba(31, 31, 38, 0.6)',
                      border: '1px solid var(--border-strong)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  WORKPLACE PREFERENCE
                </label>
                <select
                  value={profile.careerTargets.remotePreference}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      careerTargets: {
                        ...profile.careerTargets,
                        remotePreference: e.target.value as UserCareerProfile['careerTargets']['remotePreference'],
                      },
                    })
                  }
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                >
                  <option value="Remote">REMOTE FIRST</option>
                  <option value="Hybrid">HYBRID</option>
                  <option value="Flexible">FLEXIBLE</option>
                  <option value="On-site">ON-SITE</option>
                </select>
              </div>

              <Input
                label="MINIMUM TARGET COMP"
                value={profile.careerTargets.minimumCompensation}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    careerTargets: { ...profile.careerTargets, minimumCompensation: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </Card>

        {/* EXTERNAL VERIFIED LINKS */}
        <Card headerLabel="4. EXTERNAL VERIFIED LINKS" padding="md" hasBrackets>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="GITHUB REPOSITORY / CODE PROFILE"
              value={profile.links.github}
              icon={<LinkIcon size={14} />}
              onChange={(e) =>
                setProfile({ ...profile, links: { ...profile.links, github: e.target.value } })
              }
            />

            <Input
              label="LINKEDIN INTELLIGENCE DOSSIER"
              value={profile.links.linkedin}
              icon={<LinkIcon size={14} />}
              onChange={(e) =>
                setProfile({ ...profile, links: { ...profile.links, linkedin: e.target.value } })
              }
            />

            <Input
              label="SYSTEM PORTFOLIO / TECHNICAL BLOG"
              value={profile.links.portfolio}
              icon={<LinkIcon size={14} />}
              onChange={(e) =>
                setProfile({ ...profile, links: { ...profile.links, portfolio: e.target.value } })
              }
            />
          </div>
        </Card>
      </div>

      {/* SKILLS SECTION (Full Width) */}
      <Card headerLabel="5. TECHNICAL COMPETENCIES // SKILL MATRIX" padding="md" hasBrackets>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Programming Languages */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '10px',
              }}
            >
              PROGRAMMING & SYSTEMS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills.programming.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    backgroundColor: 'rgba(19, 19, 24, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {s}
                  <X
                    size={11}
                    style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                    onClick={() => handleRemoveSkill('programming', s)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* AI/ML Stack */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--warning-amber)',
                marginBottom: '10px',
              }}
            >
              AI / ML / INFERENCE RUNTIMES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills.aiml.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    backgroundColor: 'rgba(19, 19, 24, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {s}
                  <X
                    size={11}
                    style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                    onClick={() => handleRemoveSkill('aiml', s)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Data Infrastructure */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--intel-blue)',
                marginBottom: '10px',
              }}
            >
              DATA & STORAGE LAYERS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills.data.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    backgroundColor: 'rgba(19, 19, 24, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {s}
                  <X
                    size={11}
                    style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                    onClick={() => handleRemoveSkill('data', s)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Infrastructure & Tools */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--success-green)',
                marginBottom: '10px',
              }}
            >
              INFRASTRUCTURE & ORCHESTRATION
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills.tools.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    backgroundColor: 'rgba(19, 19, 24, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {s}
                  <X
                    size={11}
                    style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                    onClick={() => handleRemoveSkill('tools', s)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
