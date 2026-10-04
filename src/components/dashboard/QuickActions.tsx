import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, FileText, ScanLine, Kanban, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickActionsProps {
  onScanTriggered?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onScanTriggered }) => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleScanClick = () => {
    setIsScanning(true);
    setScanMessage('SWEEPING FREQUENCIES...');
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('48 TARGETS RE-SYNCHRONIZED');
      onScanTriggered?.();
      setTimeout(() => setScanMessage(null), 3500);
    }, 1200);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--text-muted)',
          }}
        >
          TACTICAL QUICK ACTIONS
        </span>
        {scanMessage && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--signal-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={13} color="var(--success-green)" />
            {scanMessage}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        <Button
          variant="primary"
          icon={<Radar size={16} />}
          isLoading={isScanning}
          onClick={handleScanClick}
        >
          SCAN FOR JOBS
        </Button>

        <Button
          variant="secondary"
          icon={<FileText size={16} />}
          onClick={() => navigate('/identity-forge')}
        >
          FORGE RESUME
        </Button>

        <Button
          variant="secondary"
          icon={<ScanLine size={16} />}
          onClick={() => navigate('/protocol-scan')}
        >
          RUN PROTOCOL SCAN
        </Button>

        <Button
          variant="secondary"
          icon={<Kanban size={16} />}
          onClick={() => navigate('/operations')}
        >
          VIEW OPERATIONS
        </Button>
      </div>
    </div>
  );
};
