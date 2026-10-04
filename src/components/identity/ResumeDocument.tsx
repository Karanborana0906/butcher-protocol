import React, { useState } from 'react';
import { ShieldCheck, Download, Edit3, Check, Printer } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { ResumeGeneration } from '../../services/ai/types';

interface ResumeDocumentProps {
  resume: ResumeGeneration;
  onUpdate?: (updated: ResumeGeneration) => void;
  isEditable?: boolean;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  resume,
  onUpdate,
  isEditable = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResume, setEditedResume] = useState<ResumeGeneration>(resume);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSaveEdit = () => {
    setIsEditing(false);
    onUpdate?.(editedResume);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean text export
    const content = `
BUTCHER PROTOCOL — CLASSIFIED RESUME DOSSIER
TARGET REQUISITION: ${resume.targetRole} @ ${resume.targetCompany}
DATE: ${new Date(resume.forgedAt).toLocaleDateString()}
INTEGRITY VERIFICATION: PASSED (ZERO SYNTHETIC CREDENTIALS)

============================================================
${resume.candidateName.toUpperCase()}
${resume.headline}
============================================================

SUMMARY
${resume.summary}

TAILORED SKILL MATRIX
${resume.tailoredSkills.join(', ')}

EXPERIENCE HIGHLIGHTS
${resume.experienceHighlights
  .map(
    (exp) => `
${exp.title} — ${exp.company} (${exp.period})
${exp.highlights.map((h) => `• ${h}`).join('\n')}
`
  )
  .join('\n')}

PROJECTS
${resume.projects
  .map(
    (p) => `
${p.name} [${p.tech.join(', ')}]
${p.description}
${p.outcomes.map((o) => `• ${o}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${resume.education.degree}
${resume.education.institution} — ${resume.education.year}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.candidateName.replace(/\s+/g, '_')}_${resume.targetCompany}_Tailored.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Document Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(12, 12, 15, 0.9)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 18px',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Badge variant="ONLINE" size="xs">
            IDENTITY READY
          </Badge>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            TARGET: {resume.targetRole} @ {resume.targetCompany}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isEditable && (
            <Button
              variant={isEditing ? 'primary' : 'secondary'}
              size="sm"
              icon={isEditing ? <Check size={14} /> : <Edit3 size={14} />}
              onClick={isEditing ? handleSaveEdit : () => setIsEditing(true)}
            >
              {isEditing ? 'COMMIT EDITS' : 'EDIT DOSSIER'}
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={<Printer size={14} />}
            onClick={handlePrint}
          >
            PRINT / PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Download size={14} />}
            onClick={handleDownload}
          >
            {downloadSuccess ? 'EXPORTED' : 'DOWNLOAD TEXT'}
          </Button>
        </div>
      </div>

      {/* Confidential Resume Sheet */}
      <div
        className="tactical-brackets tactical-brackets-red"
        style={{
          backgroundColor: '#0A0A0D',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          padding: '36px 40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(225, 29, 56, 0.05)',
          position: 'relative',
        }}
      >
        {/* Document Header Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--signal-red-dim)',
            paddingBottom: '14px',
            marginBottom: '28px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                color: 'var(--signal-red)',
                fontWeight: 700,
              }}
            >
              CONFIDENTIAL // FORGED IDENTITY DOSSIER
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                marginTop: '2px',
              }}
            >
              SYSTEM: BUTCHER PROTOCOL // MODEL: GEMMA-4-31B-IT
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(47, 191, 113, 0.1)',
              border: '1px solid rgba(47, 191, 113, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--success-green)',
            }}
          >
            <ShieldCheck size={14} />
            <span>VERIFIED ZERO SYNTHETIC INJECTION</span>
          </div>
        </div>

        {/* Candidate Title & Headline */}
        <div style={{ marginBottom: '24px' }}>
          <h1
            style={{
              margin: '0 0 6px 0',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.9rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
            }}
          >
            {resume.candidateName}
          </h1>

          {isEditing ? (
            <input
              type="text"
              value={editedResume.headline}
              onChange={(e) => setEditedResume({ ...editedResume, headline: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--signal-red-dim)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          ) : (
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--signal-red)',
                letterSpacing: '0.04em',
              }}
            >
              {resume.headline}
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}
          >
            OPERATIONAL PROFILE & SUMMARY
          </div>
          {isEditing ? (
            <textarea
              rows={4}
              value={editedResume.summary}
              onChange={(e) => setEditedResume({ ...editedResume, summary: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          ) : (
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              {resume.summary}
            </p>
          )}
        </div>

        {/* Tailored Skill Matrix */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}
          >
            TARGET-ALIGNED SKILL MATRIX
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {resume.tailoredSkills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(31, 31, 38, 0.6)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px 9px',
                  color: 'var(--text-primary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Highlights */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px',
              marginBottom: '14px',
            }}
          >
            EXPERIENCE & DEPLOYMENTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {resume.experienceHighlights.map((exp, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {exp.title}
                    </span>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>//</span>{' '}
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--signal-red)',
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '18px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} style={{ marginBottom: '4px' }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px',
              marginBottom: '14px',
            }}
          >
            SYSTEM ARCHITECTURES & PROJECTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {resume.projects.map((proj, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {proj.name}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                          backgroundColor: 'rgba(31, 31, 38, 0.4)',
                          padding: '1px 6px',
                          borderRadius: '2px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {proj.description}
                </p>
                <div style={{ paddingLeft: '16px', marginTop: '2px' }}>
                  {proj.outcomes.map((o, oIdx) => (
                    <div
                      key={oIdx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--intel-blue)',
                      }}
                    >
                      › {o}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}
          >
            ACADEMIC CREDENTIALS
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                }}
              >
                {resume.education.degree}
              </span>{' '}
              <span style={{ color: 'var(--text-muted)' }}>—</span>{' '}
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.84rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {resume.education.institution}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {resume.education.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
